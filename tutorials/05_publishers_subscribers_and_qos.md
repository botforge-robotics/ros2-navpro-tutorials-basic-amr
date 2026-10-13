# Lesson 05: Communication Mechanism I: Publishers, Subscribers & QoS

> **Focus:** Asynchronous Topic Communication, Quality of Service (QoS) & Python Implementation  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapters 5.2, 8.2 & Project 1.2)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

The **Publish-Subscribe (Pub/Sub)** pattern is the primary asynchronous communication backbone of ROS 2. Nodes communicate via named buses called **Topics** without needing to know which specific nodes are producing or consuming the data.

By the end of this lesson, you will:
1. Understand the anonymous, asynchronous nature of ROS 2 Topics.
2. Build an object-oriented Python **Publisher** sending velocity setpoints (`geometry_msgs/msg/Twist`).
3. Build an object-oriented Python **Subscriber** processing incoming sensor data with custom callbacks.
4. Master **Quality of Service (QoS)** policies: Reliability, Durability, and History.
5. Prevent the #1 common ROS 2 networking bug: **QoS Incompatibility**.
6. Build **Project 1.2**: An autonomous differential drive velocity supervisor and obstacle filter.

---

## 2. Topic Communication Architecture

In ROS 2, topics are unidirectional, many-to-many data streams:

![ROS 2 Publish-Subscribe Computational Graph](../assets/images/ros2_pubsub_pipeline.svg)

* **Publishers:** Produce structured messages and push them onto a topic.
* **Subscribers:** Register interest in a topic and invoke a designated callback function whenever a new message arrives.
* **Anonymous & Decoupled:** A publisher does not know or care how many subscribers exist, or even if any exist at all.

---

## 3. Deep Dive: Quality of Service (QoS) Policies

Unlike ROS 1 (which used TCP/UDP sockets with hardcoded parameters), ROS 2 allows developers to fine-tune network transport behavior per topic using DDS **QoS Profiles**.

| QoS Policy | Setting | Behavior & Characteristics |
|---|---|---|
| **Reliability** | `RELIABLE` | Guarantees message delivery via packet ACKs and retransmissions. Ideal for commands and state flags. |
| **Reliability** | `BEST_EFFORT` | Fire-and-forget. Drops lost packets immediately without retransmission. Lowest latency for high-rate sensors (LiDAR, Cameras). |
| **Durability** | `VOLATILE` | Default. Late-joining subscribers only receive messages published after connection. |
| **Durability** | `TRANSIENT_LOCAL` | Publisher retains the last $N$ messages in memory. Late subscribers receive recent history upon connection. |
| **History** | `KEEP_LAST` | Retains up to $N$ messages in the queue (depth configurable). Oldest messages dropped when full. |
| **History** | `KEEP_ALL` | Buffers all incoming messages until consumed. Risk of out-of-memory if subscribers process slowly. |

### 3.1 The QoS Compatibility Rule
> [!WARNING]
> **A subscriber's QoS requirements must be LESS restrictive than or equal to the publisher's QoS offering.**  
> If a publisher offers `BEST_EFFORT`, but a subscriber requests `RELIABLE`, **DDS will reject the connection and NO DATA will be received!**

| Publisher Offers | Subscriber Requests | Compatible? | Result |
|---|---|---|---|
| `RELIABLE` | `RELIABLE` | ✅ YES | Reliable delivery with ACKs |
| `RELIABLE` | `BEST_EFFORT` | ✅ YES | Subscriber tolerates drops, Publisher guarantees delivery |
| `BEST_EFFORT` | `BEST_EFFORT` | ✅ YES | Fast best-effort streaming (ideal for LiDAR / Cameras) |
| `BEST_EFFORT` | `RELIABLE` | ❌ **NO** | **SILENT FAILURE: No messages delivered!** |

---

## 4. Step-by-Step: Writing a Velocity Publisher in Python

Let's write a node that periodically publishes `geometry_msgs/msg/Twist` commands to drive the robot.

Create file `publisher_node.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 05
Topic Publisher: Generates smooth velocity setpoints for differential drive robots.
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy


class VelocityPublisher(Node):

    def __init__(self):
        super().__init__('velocity_publisher_node')

        # 1. Define custom QoS profile for motion control (Reliable, keep last 10)
        qos_profile = QoSProfile(
            reliability=ReliabilityPolicy.RELIABLE,
            history=HistoryPolicy.KEEP_LAST,
            depth=10
        )

        # 2. Create Publisher: topic='/cmd_vel', type=Twist
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', qos_profile)

        # 3. Create timer loop running at 10 Hz (period = 0.1s)
        self.timer_ = self.create_timer(0.1, self.publish_velocity)
        self.tick_count_ = 0

        self.get_logger().info('Velocity Publisher initialized. Broadcasting on /cmd_vel at 10Hz.')

    def publish_velocity(self):
        msg = Twist()
        # Linear velocity (forward/backward) along X axis (m/s)
        msg.linear.x = 0.35
        msg.linear.y = 0.0
        msg.linear.z = 0.0

        # Angular velocity (rotation/yaw) around Z axis (rad/s)
        msg.angular.x = 0.0
        msg.angular.y = 0.0
        msg.angular.z = 0.15

        self.publisher_.publish(msg)
        self.tick_count_ += 1

        # Log every 20 ticks (every 2 seconds) to avoid spamming terminal
        if self.tick_count_ % 20 == 0:
            self.get_logger().info(
                f'Published /cmd_vel -> Linear: {msg.linear.x:.2f} m/s, Angular: {msg.angular.z:.2f} rad/s'
            )


def main(args=None):
    rclpy.init(args=args)
    node = VelocityPublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().warn('Stopping velocity publisher...')
    finally:
        # Publish zero velocity before exiting to stop physical motors!
        stop_msg = Twist()
        node.publisher_.publish(stop_msg)
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

## 5. Step-by-Step: Writing a Velocity Subscriber in Python

Now let's build the consumer node that receives `/cmd_vel` messages and simulates motor actuation.

Create file `subscriber_node.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 05
Topic Subscriber: Consumes velocity commands and computes wheel drive velocities.
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy


class MotorControllerSubscriber(Node):

    def __init__(self):
        super().__init__('motor_controller_subscriber')

        # Differential drive robot geometry constants
        self.WHEEL_RADIUS = 0.06       # meters
        self.WHEEL_SEPARATION = 0.32   # meters

        # Subscriber QoS profile (must match or be less strict than publisher)
        qos_profile = QoSProfile(
            reliability=ReliabilityPolicy.RELIABLE,
            history=HistoryPolicy.KEEP_LAST,
            depth=10
        )

        # Create Subscription: topic='/cmd_vel', type=Twist, callback=self.cmd_vel_callback
        self.subscription_ = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_vel_callback,
            qos_profile
        )

        self.get_logger().info('Motor Controller Subscriber active. Listening on /cmd_vel.')

    def cmd_vel_callback(self, msg: Twist):
        """Executed automatically whenever a new Twist message arrives on /cmd_vel."""
        v = msg.linear.x      # Forward linear velocity (m/s)
        w = msg.angular.z     # Rotational angular velocity (rad/s)

        # Compute individual left and right wheel velocities using inverse kinematics
        # v_left  = v - (w * L / 2)
        # v_right = v + (w * L / 2)
        v_left = v - (w * self.WHEEL_SEPARATION / 2.0)
        v_right = v + (w * self.WHEEL_SEPARATION / 2.0)

        # Convert linear wheel speed to rotational wheel angular speed: omega = v / R
        omega_left = v_left / self.WHEEL_RADIUS
        omega_right = v_right / self.WHEEL_RADIUS

        self.get_logger().info(
            f'Received (v={v:.2f}, w={w:.2f}) -> Wheel RPM: Left={omega_left:.1f} rad/s, Right={omega_right:.1f} rad/s'
        )


def main(args=None):
    rclpy.init(args=args)
    node = MotorControllerSubscriber()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

## 6. Verification with the ROS 2 Command Line Interface (CLI)

Open two Terminator panes and run the nodes:

**Pane 1:**
```bash
ros2 run navpro_basics publisher_explained
```

**Pane 2:**
```bash
ros2 run navpro_basics subscriber_explained
```

In a third pane, inspect the live DDS topic communication:

```bash
# 1. List all active topics
ros2 topic list

# 2. Inspect topic type and publisher/subscriber count
ros2 topic info /cmd_vel

# 3. Echo live messages passing through the DDS bus
ros2 topic echo /cmd_vel

# 4. Measure message publishing frequency (Hz)
ros2 topic hz /cmd_vel

# 5. Measure network bandwidth consumed by topic
ros2 topic bw /cmd_vel

# 6. Manually publish a one-shot velocity command from terminal
ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.5}, angular: {z: 0.0}}"
```

---

## 7. Project 1.2: Dual Publisher & Subscriber Safety Supervisor

### Project Objective:
Write a node named `safety_supervisor` that bridges raw teleoperation input and physical motor execution.

**Requirements:**
1. Subscribe to `/teleop/cmd_vel` (`geometry_msgs/msg/Twist`).
2. Subscribe to `/obstacle_distance` (`std_msgs/msg/Float32`).
3. If `/obstacle_distance` is `< 0.4` meters:
   - Immediately override `linear.x` to `0.0` (emergency stop).
   - Log a warning: `EMERGENCY BRAKE ENGAGED! Obstacle too close.`
4. Otherwise:
   - Scale `linear.x` and `angular.z` by safety scale factor `0.85`.
5. Publish the safe velocity command to `/cmd_vel`.

```python
# Project 1.2 Boilerplate Starter Code
class SafetySupervisor(Node):
    def __init__(self):
        super().__init__('safety_supervisor')
        
        # TODO 1: Create publisher on '/cmd_vel' (Twist)
        # TODO: FILL IN CODE HERE
        
        # TODO 2: Create subscriber on '/teleop/cmd_vel' (Twist)
        # TODO: FILL IN CODE HERE
        
        # TODO 3: Create subscriber on '/obstacle_distance' (Float32)
        # TODO: FILL IN CODE HERE
        
        self.obstacle_distance = 10.0  # meters
        
    def on_obstacle_scan(self, msg):
        # TODO 4: Update self.obstacle_distance
        # TODO: FILL IN CODE HERE
        pass
        
    def on_teleop_cmd(self, msg):
        # TODO 5: If obstacle_distance < 0.4: zero out linear.x
        # TODO 6: Else: scale velocities by 0.85 and publish
        # TODO: FILL IN CODE HERE
        pass
```
