# Lesson 14: TF2 Spatial Coordinate Transformations in Python

> **Focus:** Coordinate Frames, REP-105 Standards, Euler-to-Quaternion Math & TF Broadcasters/Listeners  
> **Course Track:** NavPro Learning Hub - Level 1 (Lecture 08 & Day 2)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

A robot has many sensors mounted at different locations and orientations: a 2D LiDAR 15cm above the floor, a depth camera angled downward at 15 degrees, and two drive wheels in contact with the ground. When the LiDAR detects an obstacle 2 meters away, the path planner needs to know: **Where is this obstacle relative to the center of the robot chassis, and where is it in the global warehouse map?**

The **TF2 (Transform 2)** library tracks coordinate frames over time and allows seamless spatial transformations across kinematic chains.

By the end of this lesson, you will:
1. Understand the robotics standard **REP-105** frame hierarchy (`map -> odom -> base_footprint -> base_link -> laser_frame`).
2. Master 3D spatial rotation mathematics: Euler Angles (Roll, Pitch, Yaw) vs. Quaternions ($x, y, z, w$).
3. Write a Python **Static Transform Broadcaster** for fixed physical sensor mounts.
4. Write a Python **Dynamic Transform Broadcaster** to track real-time robot odometry.
5. Write a Python **Transform Listener** using `Buffer.lookup_transform()`.
6. Inspect and debug transform trees using `view_frames`, `tf2_echo`, and RViz2.

---

## 2. Standard Frame Hierarchy: REP-105

ROS standard `REP-105` defines four primary coordinate frames for all mobile robots:

![REP-105 Robot Spatial TF2 Transform Tree](../assets/images/tf2_tree_pipeline.svg)

---

## 3. Spatial Math: Euler Angles vs. Quaternions

Humans think in **Euler Angles**:
* **Roll ($\phi$):** Rotation around X axis (tilting side-to-side).
* **Pitch ($\theta$):** Rotation around Y axis (tilting up and down).
* **Yaw ($\psi$):** Rotation around Z axis (heading/steering direction on the 2D floor).

### Why Robots Use Quaternions:
Euler angles suffer from **Gimbal Lock** (loss of one degree of freedom when pitch reaches $\pm 90^\circ$). Computers and ROS 2 use **Quaternions**—four-dimensional unit vectors:
$$\mathbf{q} = (x, y, z, w)$$

For planar mobile robots moving purely on a flat warehouse floor ($Roll = 0, Pitch = 0, Yaw = \theta$):
$$x = 0.0, \quad y = 0.0, \quad z = \sin(\theta / 2), \quad w = \cos(\theta / 2)$$

---

## 4. Step-by-Step: Writing a Static Transform Broadcaster

Static transforms represent rigid attachments that never move relative to the robot chassis (e.g. the LiDAR sensor bracket).

Create file `static_broadcaster.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 14
Static Transform Broadcaster: Publishes fixed LiDAR sensor offset from base_link.
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import TransformStamped
from tf2_ros import StaticTransformBroadcaster


class StaticFramePublisher(Node):

    def __init__(self):
        super().__init__('static_frame_publisher')
        self.broadcaster_ = StaticTransformBroadcaster(self)

        tf_msg = TransformStamped()
        tf_msg.header.stamp = self.get_clock().now().to_msg()
        tf_msg.header.frame_id = 'base_link'        # Parent frame
        tf_msg.child_frame_id = 'laser_frame'       # Child frame

        # Physical mount offset: 8cm forward (+X), 16cm up (+Z)
        tf_msg.transform.translation.x = 0.08
        tf_msg.transform.translation.y = 0.0
        tf_msg.transform.translation.z = 0.16

        # Zero rotation (facing forward)
        tf_msg.transform.rotation.x = 0.0
        tf_msg.transform.rotation.y = 0.0
        tf_msg.transform.rotation.z = 0.0
        tf_msg.transform.rotation.w = 1.0

        # Broadcast static transform
        self.broadcaster_.sendTransform(tf_msg)
        self.get_logger().info('Broadcasted static transform: base_link -> laser_frame')


def main():
    rclpy.init()
    node = StaticFramePublisher()
    try:
        rclpy.spin(node)
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: Static Transform Broadcaster
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `StaticTransformBroadcaster(self)` | Broadcast permanent, unmoving physical linkages. | Publishes to the latched `/tf_static` topic using `TRANSIENT_LOCAL` durability QoS. Late-joining nodes (like RViz or SLAM) receive the entire static transform tree upon connection without re-requesting. |
| `tf_msg.header.frame_id = 'base_link'`<br>`tf_msg.child_frame_id = 'laser_frame'` | Define parent-child spatial hierarchy. | TF requires an acyclic tree structure. `frame_id` is the reference origin (robot chassis center); `child_frame_id` is the sensor payload frame located relative to that origin. |
| `tf_msg.transform.translation.x = 0.08`<br>`tf_msg.transform.translation.z = 0.16` | Rigid physical bracket offset in 3D space. | Encodes the real CAD measurement: the sensor aperture is 8cm forward and 16cm above the robot's ground center. |
| `rotation = (0, 0, 0, 1.0)` | Identity quaternion (no orientation offset). | $(x=0, y=0, z=0, w=1)$ represents zero rotation (facing directly along the $+X$ axis of the parent frame). |

---


## 5. Step-by-Step: Writing a Dynamic Transform Broadcaster

Dynamic transforms update continuously as the robot moves through the world (e.g. `odom -> base_footprint`).

Create file `dynamic_broadcaster.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 14
Dynamic Transform Broadcaster: Integrates forward motion and broadcasts odom -> base_footprint at 20Hz.
"""

import math
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import TransformStamped
from tf2_ros import TransformBroadcaster


class DynamicOdometryBroadcaster(Node):

    def __init__(self):
        super().__init__('dynamic_odometry_broadcaster')
        self.broadcaster_ = TransformBroadcaster(self)

        # Robot planar pose state
        self.x = 0.0
        self.y = 0.0
        self.yaw = 0.0
        self.linear_velocity = 0.2    # m/s forward
        self.angular_velocity = 0.1   # rad/s turning

        self.last_time = self.get_clock().now()
        # 20 Hz broadcast loop (0.05s)
        self.timer_ = self.create_timer(0.05, self.broadcast_odometry_transform)

    def broadcast_odometry_transform(self):
        current_time = self.get_clock().now()
        dt = (current_time - self.last_time).nanoseconds / 1e9
        self.last_time = current_time

        # Numerical integration of differential drive motion
        self.x += self.linear_velocity * math.cos(self.yaw) * dt
        self.y += self.linear_velocity * math.sin(self.yaw) * dt
        self.yaw += self.angular_velocity * dt

        tf_msg = TransformStamped()
        tf_msg.header.stamp = current_time.to_msg()
        tf_msg.header.frame_id = 'odom'
        tf_msg.child_frame_id = 'base_footprint'

        tf_msg.transform.translation.x = self.x
        tf_msg.transform.translation.y = self.y
        tf_msg.transform.translation.z = 0.0

        # Planar quaternion from yaw
        tf_msg.transform.rotation.x = 0.0
        tf_msg.transform.rotation.y = 0.0
        tf_msg.transform.rotation.z = math.sin(self.yaw / 2.0)
        tf_msg.transform.rotation.w = math.cos(self.yaw / 2.0)

        self.broadcaster_.sendTransform(tf_msg)


def main():
    rclpy.init()
    node = DynamicOdometryBroadcaster()
    try:
        rclpy.spin(node)
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: Dynamic Odometry Broadcaster
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `TransformBroadcaster(self)` | Broadcast continuously moving spatial relationships. | Publishes to the volatile `/tf` topic at high frequency (20 Hz) using standard `KEEP_LAST` QoS. |
| `dt = (current_time - self.last_time).nanoseconds / 1e9` | Discrete time delta calculation. | Numerical integration requires measuring real elapsed wall-clock or simulation time $\Delta t$. Nanoseconds divided by $10^9$ yields floating-point seconds. |
| `self.x += v * cos(yaw) * dt`<br>`self.y += v * sin(yaw) * dt`<br>`self.yaw += w * dt` | **Differential Drive Dead-Reckoning Integration**. | Resolves the chassis forward speed $v$ along the current orientation vector $(\cos\psi, \sin\psi)$ to accumulate 2D planar position over time. |
| `math.sin(self.yaw / 2.0)`<br>`math.cos(self.yaw / 2.0)` | Planar Euler-to-Quaternion formula. | For pure planar rotation around Z ($Roll=0, Pitch=0$), the 4-element unit quaternion simplifies directly to $z = \sin(\psi/2)$ and $w = \cos(\psi/2)$, with $x=y=0$. This is computationally fast and avoids external library overhead. |
| `self.broadcaster_.sendTransform(tf_msg)` | Inject updated transform into TF tree. | Publishes to `/tf`. Downstream nodes (AMCL, Nav2 local costmaps) cache these transforms in ring buffers to look up historical positions at any microsecond timestamp. |

---


## 6. Step-by-Step: Writing a Transform Listener

A Transform Listener queries the transform buffer to compute coordinates across multi-hop frames:

```python
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from tf2_ros import Buffer, TransformListener
from tf2_ros import LookupException, ConnectivityException, ExtrapolationException


class TransformQueryNode(Node):

    def __init__(self):
        super().__init__('transform_query_node')
        self.tf_buffer = Buffer()
        self.tf_listener = TransformListener(self.tf_buffer, self)
        self.timer = self.create_timer(1.0, self.query_pose)

    def query_pose(self):
        try:
            # Query the position of laser_frame relative to the global odom origin
            # Target frame: 'odom', Source frame: 'laser_frame', Time: Time(0) = latest available
            t = self.tf_buffer.lookup_transform(
                'odom',
                'laser_frame',
                rclpy.time.Time()
            )
            pos = t.transform.translation
            self.get_logger().info(f'LiDAR in Odom frame -> x={pos.x:.2f}, y={pos.y:.2f}, z={pos.z:.2f}')
        except (LookupException, ConnectivityException, ExtrapolationException) as e:
            self.get_logger().warn(f'Could not transform odom to laser_frame: {e}')
```

---

## 7. Inspection & Visual Debugging Tools

```bash
# 1. Echo live transform translation and quaternion values in terminal
ros2 run tf2_ros tf2_echo odom laser_frame

# 2. Generate a visual PDF tree diagram of all active frames
ros2 run tf2_tools view_frames
# Generates: frames.pdf
evince frames.pdf  # View PDF in Ubuntu

# 3. Monitor in RViz2:
# In RViz2, add the "TF" display plugin and check "Show Arrows" and "Show Names"
```

---

## 8. Hands-on Student Challenge

**Task:**
1. In `static_broadcaster.py`, add a second static transform: `base_link` -> `camera_link` (offset: $x=0.15, y=0.0, z=0.25$, facing forward).
2. Run both the static broadcaster and the dynamic odometry broadcaster.
3. Use `ros2 run tf2_ros tf2_echo odom camera_link` to verify that the listener automatically resolves the multi-hop transformation: `odom -> base_footprint -> base_link -> camera_link`!
