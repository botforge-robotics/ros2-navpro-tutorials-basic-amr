#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 2
REFERENCE SOLUTION: Custom Odometry Kinematics & Dynamic TF2 Broadcaster
Package: navpro_description
"""

import math
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist, TransformStamped
from nav_msgs.msg import Odometry
from tf2_ros import TransformBroadcaster, StaticTransformBroadcaster
import tf_transformations


class SolutionCustomOdometryTf(Node):
    """
    Reference solution for Day 2 Task.
    Students can refer to this implementation for forward kinematics and TF broadcasting.
    """

    def __init__(self):
        super().__init__('custom_odometry_tf_solution')
        self.get_logger().info('Initializing SolutionCustomOdometryTf...')

        # Broadcasters
        self.tf_broadcaster = TransformBroadcaster(self)
        self.static_tf_broadcaster = StaticTransformBroadcaster(self)

        # 1. Static Transform: base_footprint -> imu_link
        static_tf = TransformStamped()
        static_tf.header.stamp = self.get_clock().now().to_msg()
        static_tf.header.frame_id = 'base_footprint'
        static_tf.child_frame_id = 'imu_link'
        static_tf.transform.translation.x = 0.05
        static_tf.transform.translation.y = 0.0
        static_tf.transform.translation.z = 0.10
        static_tf.transform.rotation.w = 1.0
        self.static_tf_broadcaster.sendTransform(static_tf)

        # 2. Subscriptions and Publishers
        self.cmd_sub = self.create_subscription(Twist, '/cmd_vel', self.on_cmd_vel, 10)
        self.odom_pub = self.create_publisher(Odometry, '/odom_custom', 10)

        # State estimation variables
        self.x = 0.0
        self.y = 0.0
        self.theta = 0.0
        self.vx = 0.0
        self.wz = 0.0
        self.last_time = self.get_clock().now()

        # 20 Hz loop
        self.timer = self.create_timer(0.05, self.update_kinematics)

    def on_cmd_vel(self, msg: Twist):
        self.vx = msg.linear.x
        self.wz = msg.angular.z

    def update_kinematics(self):
        now = self.get_clock().now()
        dt = (now - self.last_time).nanoseconds / 1e9
        self.last_time = now

        # Integrate differential drive equations
        self.x += self.vx * math.cos(self.theta) * dt
        self.y += self.vx * math.sin(self.theta) * dt
        self.theta += self.wz * dt

        # Convert orientation to quaternion
        quat = tf_transformations.quaternion_from_euler(0.0, 0.0, self.theta)

        # Broadcast Dynamic TF: odom -> base_footprint
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
        self.tf_broadcaster.sendTransform(tf_msg)

        # Publish Odometry Message on /odom_custom
        odom_msg = Odometry()
        odom_msg.header.stamp = now.to_msg()
        odom_msg.header.frame_id = 'odom'
        odom_msg.child_frame_id = 'base_footprint'
        odom_msg.pose.pose.position.x = self.x
        odom_msg.pose.pose.position.y = self.y
        odom_msg.pose.pose.orientation.x = quat[0]
        odom_msg.pose.pose.orientation.y = quat[1]
        odom_msg.pose.pose.orientation.z = quat[2]
        odom_msg.pose.pose.orientation.w = quat[3]
        odom_msg.twist.twist.linear.x = self.vx
        odom_msg.twist.twist.angular.z = self.wz
        self.odom_pub.publish(odom_msg)


def main(args=None):
    rclpy.init(args=args)
    node = SolutionCustomOdometryTf()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
