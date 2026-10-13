#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 2 Reference Solution
Package: navpro_description
Node:    solution_custom_odometry_tf.py
================================================================================

WHAT THIS REFERENCE SOLUTION DEMONSTRATES:
------------------------------------------
1. Dual Broadcaster Architecture:
   - Dynamic Broadcaster: Streams continuous `odom` -> `base_footprint` transforms.
   - Static Broadcaster: Streams latched `base_footprint` -> `imu_link` transform.
2. Differential Drive Dead Reckoning:
   - Takes velocity setpoints or wheel speeds and integrates planar pose (x, y, theta).
   - Generates 3D orientation quaternion using Euler yaw.
3. Standard Odometry Topic Publishing:
   - Publishes `nav_msgs/msg/Odometry` with matching headers, timestamps, pose,
     and twist covariances.
================================================================================
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
    Demonstrates forward kinematics, TF2 dynamic broadcasting, and Odometry publication.
    """

    def __init__(self):
        super().__init__('custom_odometry_tf_solution')
        self.get_logger().info('Initializing SolutionCustomOdometryTf reference node...')

        # ----------------------------------------------------------------------
        # 1. INITIALIZE TF2 BROADCASTERS
        # ----------------------------------------------------------------------
        self.tf_broadcaster = TransformBroadcaster(self)
        self.static_tf_broadcaster = StaticTransformBroadcaster(self)

        # ----------------------------------------------------------------------
        # 2. BROADCAST STATIC TRANSFORM (base_footprint -> imu_link)
        # ----------------------------------------------------------------------
        # IMU is rigidly bolted 5cm forward and 10cm above the ground chassis footprint.
        static_tf = TransformStamped()
        static_tf.header.stamp = self.get_clock().now().to_msg()
        static_tf.header.frame_id = 'base_footprint'
        static_tf.child_frame_id = 'imu_link'

        # Fixed physical mounting translation (meters)
        static_tf.transform.translation.x = 0.05
        static_tf.transform.translation.y = 0.0
        static_tf.transform.translation.z = 0.10

        # Identity orientation (aligned with robot body)
        static_tf.transform.rotation.x = 0.0
        static_tf.transform.rotation.y = 0.0
        static_tf.transform.rotation.z = 0.0
        static_tf.transform.rotation.w = 1.0

        self.static_tf_broadcaster.sendTransform(static_tf)
        self.get_logger().info('Static TF published: base_footprint -> imu_link')

        # ----------------------------------------------------------------------
        # 3. TOPIC SUBSCRIPTION AND PUBLISHER
        # ----------------------------------------------------------------------
        # Subscribes to input velocity commands on /cmd_vel
        self.cmd_sub = self.create_subscription(Twist, '/cmd_vel', self.on_cmd_vel, 10)

        # Publishes standard odometry message on /odom_custom
        self.odom_pub = self.create_publisher(Odometry, '/odom_custom', 10)

        # State estimation variables
        self.x = 0.0       # X position in meters
        self.y = 0.0       # Y position in meters
        self.theta = 0.0   # Heading angle in radians
        self.vx = 0.0      # Forward linear velocity in m/s
        self.wz = 0.0      # Angular velocity in rad/s

        self.last_time = self.get_clock().now()

        # ----------------------------------------------------------------------
        # 4. 20 HZ KINEMATICS INTEGRATION LOOP
        # ----------------------------------------------------------------------
        self.timer = self.create_timer(0.05, self.update_kinematics)
        self.get_logger().info('SolutionCustomOdometryTf active. Broadcasting /odom_custom and TF at 20 Hz.')

    def on_cmd_vel(self, msg: Twist):
        """
        Extracts current translational and angular velocities from the /cmd_vel stream.
        """
        self.vx = msg.linear.x
        self.wz = msg.angular.z

    def update_kinematics(self):
        """
        Performs discrete Euler numerical integration of kinematics,
        broadcasts dynamic TF, and publishes Odometry message.
        """
        now = self.get_clock().now()
        dt = (now - self.last_time).nanoseconds / 1e9
        self.last_time = now

        # Prevent numerical instability on abnormal time deltas
        if dt <= 0.0 or dt > 0.5:
            return

        # ----------------------------------------------------------------------
        # STEP A: POSE INTEGRATION
        # ----------------------------------------------------------------------
        # Project linear speed along current orientation
        self.x += self.vx * math.cos(self.theta) * dt
        self.y += self.vx * math.sin(self.theta) * dt
        self.theta += self.wz * dt

        # Normalize heading to [-pi, pi]
        self.theta = math.atan2(math.sin(self.theta), math.cos(self.theta))

        # ----------------------------------------------------------------------
        # STEP B: ORIENTATION CONVERSION (EULER TO QUATERNION)
        # ----------------------------------------------------------------------
        quat = tf_transformations.quaternion_from_euler(0.0, 0.0, self.theta)

        # ----------------------------------------------------------------------
        # STEP C: BROADCAST DYNAMIC TF (odom -> base_footprint)
        # ----------------------------------------------------------------------
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

        # ----------------------------------------------------------------------
        # STEP D: PUBLISH ODOMETRY MESSAGE
        # ----------------------------------------------------------------------
        odom_msg = Odometry()
        odom_msg.header.stamp = now.to_msg()
        odom_msg.header.frame_id = 'odom'
        odom_msg.child_frame_id = 'base_footprint'

        # Pose in odometry frame
        odom_msg.pose.pose.position.x = self.x
        odom_msg.pose.pose.position.y = self.y
        odom_msg.pose.pose.position.z = 0.0

        odom_msg.pose.pose.orientation.x = quat[0]
        odom_msg.pose.pose.orientation.y = quat[1]
        odom_msg.pose.pose.orientation.z = quat[2]
        odom_msg.pose.pose.orientation.w = quat[3]

        # Twist in robot chassis local frame
        odom_msg.twist.twist.linear.x = self.vx
        odom_msg.twist.twist.linear.y = 0.0
        odom_msg.twist.twist.angular.z = self.wz

        self.odom_pub.publish(odom_msg)


def main(args=None):
    """
    Node lifecycle entry point.
    """
    rclpy.init(args=args)
    node = SolutionCustomOdometryTf()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping SolutionCustomOdometryTf...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
