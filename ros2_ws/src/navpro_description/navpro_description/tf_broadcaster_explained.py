#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 2
Explanation: Dynamic and Static TF2 Broadcasting
Demonstrates mathematical transforms, quaternions, and TF coordinate frames.
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
    2. Static transform: base_footprint -> aux_sensor_frame (fixed offset)
    """

    def __init__(self):
        super().__init__('tf_broadcaster_explained')

        # TF Broadcasters
        self.tf_broadcaster = TransformBroadcaster(self)
        self.static_tf_broadcaster = StaticTransformBroadcaster(self)

        # Broadcast static transform once at startup
        self.broadcast_static_transforms()

        # State variables for dynamic odometry simulation
        self.x = 0.0
        self.y = 0.0
        self.theta = 0.0
        self.linear_speed = 0.3   # m/s
        self.angular_speed = 0.2  # rad/s

        self.last_time = self.get_clock().now()

        # Dynamic TF broadcast loop at 20 Hz
        self.timer = self.create_timer(0.05, self.broadcast_dynamic_tf)
        self.get_logger().info('TF2 Broadcaster Explained Node active.')

    def broadcast_static_transforms(self):
        """Broadcasts a static transform from base_footprint to an auxiliary payload sensor."""
        static_tf = TransformStamped()
        static_tf.header.stamp = self.get_clock().now().to_msg()
        static_tf.header.frame_id = 'base_footprint'
        static_tf.child_frame_id = 'aux_payload_frame'

        static_tf.transform.translation.x = 0.12
        static_tf.transform.translation.y = 0.0
        static_tf.transform.translation.z = 0.25

        # No rotation (identity quaternion)
        static_tf.transform.rotation.x = 0.0
        static_tf.transform.rotation.y = 0.0
        static_tf.transform.rotation.z = 0.0
        static_tf.transform.rotation.w = 1.0

        self.static_tf_broadcaster.sendTransform(static_tf)
        self.get_logger().info('Broadcasted static transform: base_footprint -> aux_payload_frame')

    def broadcast_dynamic_tf(self):
        """Integrates kinematics and broadcasts odom -> base_footprint transform."""
        now = self.get_clock().now()
        dt = (now - self.last_time).nanoseconds / 1e9
        self.last_time = now

        # Integrate differential drive position: x, y, theta
        self.x += self.linear_speed * math.cos(self.theta) * dt
        self.y += self.linear_speed * math.sin(self.theta) * dt
        self.theta += self.angular_speed * dt

        # Convert Euler yaw (theta) to Quaternion (x, y, z, w)
        quat = tf_transformations.quaternion_from_euler(0.0, 0.0, self.theta)

        # Assemble TransformStamped message
        tf_msg = TransformStamped()
        tf_msg.header.stamp = now.to_msg()
        tf_msg.header.frame_id = 'odom'
        tf_msg.child_frame_id = 'base_footprint'

        tf_msg.transform.translation.x = self.x
        tf_msg.transform.translation.y = self.y
        tf_msg.transform.translation.z = 0.0

        tf_msg.transform.rotation.x = quat[0]
        tf_msg.transform.rotation.y = quat[1]
        tf_msg.transform.rotation.z = quat[2]
        tf_msg.transform.rotation.w = quat[3]

        # Send transform
        self.tf_broadcaster.sendTransform(tf_msg)


def main(args=None):
    rclpy.init(args=args)
    node = TfBroadcasterExplained()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
