#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 2 Student Task
Package: navpro_description
Task:    task_custom_odometry_tf.py
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to write a complete Odometry and Coordinate Transformation node
that takes raw encoder wheel velocities, computes differential drive forward
kinematics, integrates the 2D robot pose over time, and publishes both:
1. Dynamic TF transform (`odom` -> `base_footprint`)
2. Standard ROS 2 odometry topic `/odom` (`nav_msgs/msg/Odometry`)

PHYSICAL ROBOT CONSTANTS:
-------------------------
- Wheel Radius (R): 0.05 meters (50 mm)
- Track Width / Wheel Separation (L): 0.28 meters (280 mm)

FORWARD KINEMATICS EQUATIONS:
-----------------------------
Given left wheel angular speed w_L (rad/s) and right wheel angular speed w_R (rad/s):
  Linear velocity:  v = R * (w_R + w_L) / 2.0  (meters/second)
  Angular velocity: w = R * (w_R - w_L) / L    (radians/second)

DEAD-RECKONING POSE INTEGRATION:
--------------------------------
Given elapsed time dt (seconds):
  delta_x     = v * cos(theta) * dt
  delta_y     = v * sin(theta) * dt
  delta_theta = w * dt
================================================================================
"""

import math
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Vector3, TransformStamped, Quaternion
from nav_msgs.msg import Odometry
import tf2_ros


def yaw_to_quaternion(yaw: float) -> Quaternion:
    """
    Helper function: converts a 2D planar heading angle (yaw) into a
    geometry_msgs/msg/Quaternion without requiring external C-extensions.
    For pure planar yaw rotations:
      q.x = 0.0
      q.y = 0.0
      q.z = sin(yaw / 2.0)
      q.w = cos(yaw / 2.0)
    """
    q = Quaternion()
    q.x = 0.0
    q.y = 0.0
    q.z = math.sin(yaw / 2.0)
    q.w = math.cos(yaw / 2.0)
    return q


class CustomOdometryNode(Node):
    """
    Student Task Node: Differential Drive Odometry Integrator & TF Broadcaster.
    """

    def __init__(self):
        super().__init__('custom_odometry_node')
        self.get_logger().info('Initializing CustomOdometryNode student task...')

        # Physical mobile robot dimensions
        self.WHEEL_RADIUS = 0.05   # meters
        self.TRACK_WIDTH = 0.28    # meters

        # Accumulated robot pose in the 'odom' world reference frame
        self.x = 0.0
        self.y = 0.0
        self.theta = 0.0

        # Current estimated velocities
        self.v_linear = 0.0
        self.v_angular = 0.0
        self.last_time = self.get_clock().now()

        # ----------------------------------------------------------------------
        # TODO 1: Initialize TF2 TransformBroadcaster and /odom Publisher
        # ----------------------------------------------------------------------
        # - Broadcaster: tf2_ros.TransformBroadcaster(self)
        # - Publisher: topic='/odom', message_type=Odometry, queue_depth=10
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        # self.tf_broadcaster = ...
        # self.odom_pub = ...

        # ----------------------------------------------------------------------
        # TODO 2: Subscribe to /wheel_speeds topic
        # ----------------------------------------------------------------------
        # - Topic: '/wheel_speeds' | Message Type: Vector3
        # - Callback: self.on_wheel_speeds
        # - In Vector3: msg.x = left wheel rad/s, msg.y = right wheel rad/s
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        # self.wheel_sub = ...

        # Integration & publishing timer (20 Hz = 0.05s period)
        self.timer = self.create_timer(0.05, self.update_and_publish)

    def on_wheel_speeds(self, msg: Vector3):
        """
        TODO 3: Compute Differential Drive Forward Kinematics
        -----------------------------------------------------
        w_left  = msg.x  (rad/s)
        w_right = msg.y  (rad/s)

        Compute:
          self.v_linear  = self.WHEEL_RADIUS * (w_right + w_left) / 2.0
          self.v_angular = self.WHEEL_RADIUS * (w_right - w_left) / self.TRACK_WIDTH
        """
        # TODO: STUDENT CODE HERE
        pass

    def update_and_publish(self):
        """
        Periodic integration timer callback.
        Computes dt, integrates pose, and broadcasts TF + /odom.
        """
        current_time = self.get_clock().now()
        dt = (current_time - self.last_time).nanoseconds / 1e9
        if dt <= 0.0 or dt > 0.5:
            self.last_time = current_time
            return

        # ----------------------------------------------------------------------
        # TODO 4: Integrate Pose (Dead Reckoning)
        # ----------------------------------------------------------------------
        # self.x += self.v_linear * math.cos(self.theta) * dt
        # self.y += self.v_linear * math.sin(self.theta) * dt
        # self.theta += self.v_angular * dt
        # TODO: STUDENT CODE HERE

        # ----------------------------------------------------------------------
        # TODO 5: Broadcast Dynamic TF (odom -> base_footprint)
        # ----------------------------------------------------------------------
        # Create TransformStamped message, set header.stamp, frame_id='odom',
        # child_frame_id='base_footprint', translation (x, y, 0), and rotation (from yaw_to_quaternion).
        # Broadcast using self.tf_broadcaster.sendTransform(tf_msg)
        # TODO: STUDENT CODE HERE

        # ----------------------------------------------------------------------
        # TODO 6: Publish Odometry Message on /odom
        # ----------------------------------------------------------------------
        # Populate nav_msgs/Odometry message with pose (position + orientation)
        # and twist (linear.x + angular.z).
        # Publish using self.odom_pub.publish(odom_msg)
        # TODO: STUDENT CODE HERE

        self.last_time = current_time


def main(args=None):
    """
    Node execution lifecycle.
    """
    rclpy.init(args=args)
    node = CustomOdometryNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping CustomOdometryNode...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
