#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 2 Coordinate Transforms
Package: navpro_description
Node:    tf_broadcaster_explained.py
================================================================================

WHAT THIS NODE DOES:
--------------------
This is an educational reference implementation demonstrating ROS 2 TF2
Transform Broadcasting. It broadcasts two fundamental types of transforms:
1. Dynamic Transform (`odom` -> `base_footprint`):
   Broadcast continuously at 20 Hz as the simulated robot moves through space.
2. Static Transform (`base_footprint` -> `aux_payload_frame`):
   Broadcast once on `/tf_static` representing a rigid, unmoving physical mount.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. The TF2 Coordinate Tree: Every link and frame in robotics must connect to a
   single acyclic tree. ROS 2 maintains transform trees so spatial points can
   be mapped between sensors, robot chassis, odometry, and global maps.
2. Euler Yaw to Quaternion Conversion:
   While humans think in Euler angles (roll, pitch, yaw in degrees or radians),
   3D graphics and robotics use 4-element unit quaternions (x, y, z, w) to avoid
   gimbal lock and mathematical singularities during 3D rotations.
3. Numerical Dead-Reckoning Integration:
   Given forward speed `v` and rotational speed `w`, position updates over `dt`:
     x(t + dt) = x(t) + v * cos(theta) * dt
     y(t + dt) = y(t) + v * sin(theta) * dt
     theta(t + dt) = theta(t) + w * dt
4. Static vs Dynamic Broadcasters:
   - `StaticTransformBroadcaster` sends latched messages over `/tf_static` once.
   - `TransformBroadcaster` sends time-varying transforms over `/tf` continuously.
================================================================================
"""

import math
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import TransformStamped
from tf2_ros import TransformBroadcaster, StaticTransformBroadcaster
import tf_transformations


class TfBroadcasterExplained(Node):
    """
    Simulates a circular odometry path and broadcasts:
    1. Dynamic transform: odom -> base_footprint (moving over time)
    2. Static transform: base_footprint -> aux_payload_frame (fixed rigid offset)
    """

    def __init__(self):
        super().__init__('tf_broadcaster_explained')

        # ----------------------------------------------------------------------
        # 1. INITIALIZE TF2 BROADCASTERS
        # ----------------------------------------------------------------------
        # TransformBroadcaster: publishes dynamic time-stamped transforms to /tf
        self.tf_broadcaster = TransformBroadcaster(self)

        # StaticTransformBroadcaster: publishes rigid fixed transforms to /tf_static (latched QoS)
        self.static_tf_broadcaster = StaticTransformBroadcaster(self)

        # Broadcast the fixed static sensor frame once at initialization
        self.broadcast_static_transforms()

        # ----------------------------------------------------------------------
        # 2. STATE VARIABLES FOR ODOMETRY INTEGRATION
        # ----------------------------------------------------------------------
        self.x = 0.0              # Current X position in odometry frame (meters)
        self.y = 0.0              # Current Y position in odometry frame (meters)
        self.theta = 0.0          # Current heading / yaw angle (radians)
        self.linear_speed = 0.3   # Constant forward velocity setpoint (0.3 m/s)
        self.angular_speed = 0.2  # Constant rotational velocity setpoint (0.2 rad/s)

        # Timestamp for computing discrete time elapsed (dt)
        self.last_time = self.get_clock().now()

        # ----------------------------------------------------------------------
        # 3. HIGH-RATE BROADCAST LOOP (20 Hz)
        # ----------------------------------------------------------------------
        # Navigation planners (Nav2, AMCL) require fresh transforms at >= 20 Hz
        # Period = 0.05 s -> 1.0 / 0.05 = 20 Hz
        self.timer = self.create_timer(0.05, self.broadcast_dynamic_tf)
        self.get_logger().info('TF2 Broadcaster Explained Node active. Broadcasting odom->base_footprint at 20 Hz.')

    def broadcast_static_transforms(self):
        """
        Broadcasts a fixed spatial transform between base_footprint and a payload sensor.
        This transform never changes while the robot operates.
        """
        static_tf = TransformStamped()

        # Timestamp and Frame IDs
        # frame_id = Parent coordinate frame
        # child_frame_id = Child coordinate frame being located relative to the parent
        static_tf.header.stamp = self.get_clock().now().to_msg()
        static_tf.header.frame_id = 'base_footprint'
        static_tf.child_frame_id = 'aux_payload_frame'

        # Translation vector: Sensor is mounted 12cm forward (+X) and 25cm above (+Z) base
        static_tf.transform.translation.x = 0.12
        static_tf.transform.translation.y = 0.0
        static_tf.transform.translation.z = 0.25

        # Rotation: Identity Quaternion (no rotation, sensor aligned with robot axis)
        static_tf.transform.rotation.x = 0.0
        static_tf.transform.rotation.y = 0.0
        static_tf.transform.rotation.z = 0.0
        static_tf.transform.rotation.w = 1.0

        # Send to /tf_static topic (latched: late joining nodes receive it automatically)
        self.static_tf_broadcaster.sendTransform(static_tf)
        self.get_logger().info('Broadcasted static transform: base_footprint -> aux_payload_frame')

    def broadcast_dynamic_tf(self):
        """
        Simulates kinematic motion, integrates dead-reckoning pose, and
        broadcasts the dynamic transform from the 'odom' frame to 'base_footprint'.
        """
        now = self.get_clock().now()
        # Compute discrete time step dt in seconds
        dt = (now - self.last_time).nanoseconds / 1e9
        self.last_time = now

        # Guard against zero or corrupted time intervals
        if dt <= 0.0 or dt > 0.5:
            return

        # ----------------------------------------------------------------------
        # DIFFERENTIAL DRIVE FORWARD KINEMATICS INTEGRATION:
        # ----------------------------------------------------------------------
        # Update 2D Cartesian coordinates using current heading angle
        self.x += self.linear_speed * math.cos(self.theta) * dt
        self.y += self.linear_speed * math.sin(self.theta) * dt
        self.theta += self.angular_speed * dt

        # Wrap angle theta within [-pi, pi] to prevent numeric drift
        self.theta = math.atan2(math.sin(self.theta), math.cos(self.theta))

        # ----------------------------------------------------------------------
        # EULER TO QUATERNION CONVERSION:
        # ----------------------------------------------------------------------
        # Roll = 0.0, Pitch = 0.0 (ground robot), Yaw = self.theta
        # Returns a 4-tuple [x, y, z, w]
        quat = tf_transformations.quaternion_from_euler(0.0, 0.0, self.theta)

        # ----------------------------------------------------------------------
        # ASSEMBLE TRANSFORMSTAMPED MESSAGE:
        # ----------------------------------------------------------------------
        tf_msg = TransformStamped()
        tf_msg.header.stamp = now.to_msg()
        tf_msg.header.frame_id = 'odom'              # Parent reference frame
        tf_msg.child_frame_id = 'base_footprint'     # Moving robot chassis frame

        # Position (3D translation in meters)
        tf_msg.transform.translation.x = self.x
        tf_msg.transform.translation.y = self.y
        tf_msg.transform.translation.z = 0.0

        # Orientation (3D rotation unit quaternion)
        tf_msg.transform.rotation.x = quat[0]
        tf_msg.transform.rotation.y = quat[1]
        tf_msg.transform.rotation.z = quat[2]
        tf_msg.transform.rotation.w = quat[3]

        # Publish the transform to the /tf topic
        self.tf_broadcaster.sendTransform(tf_msg)


def main(args=None):
    """
    Node execution lifecycle.
    """
    rclpy.init(args=args)
    node = TfBroadcasterExplained()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping TF broadcaster...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
