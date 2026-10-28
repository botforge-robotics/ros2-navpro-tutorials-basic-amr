#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 16 Task
Package: nexus_amr_basics
Task:    m03_l16_01_task_diff_drive_telemetry.py (alias: task_diff_drive)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a Differential Drive Odometer & Kinematic Tracking
Validator node to verify wheel odometry emitted by the Gazebo diff-drive plugin.

OBJECTIVES:
-----------
1. TODO 1: Subscribe to `/odom` (nav_msgs/msg/Odometry) to receive measured velocity.
2. TODO 2: Subscribe to `/cmd_vel` (geometry_msgs/msg/Twist) to capture target velocity.
3. TODO 3: In `odom_callback`, store measured linear.x and pose coordinates.
4. TODO 4: In 2 Hz evaluation loop, compute velocity slip/error:
   `error = abs(cmd_linear_x - measured_linear_x)` and log diagnostics.
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry


class DiffDriveTelemetryValidator(Node):

    def __init__(self):
        super().__init__('diff_drive_telemetry_validator')

        self.target_linear_x = 0.0
        self.measured_linear_x = 0.0
        self.current_x = 0.0
        self.current_y = 0.0

        # ======================================================================
        # TODO 1: Subscribe to '/odom' (Odometry)
        # - Hint: Call self.create_subscription() for Odometry messages from '/odom'.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 2: Subscribe to '/cmd_vel' (Twist)
        # - Hint: Call self.create_subscription() for Twist messages from '/cmd_vel'.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.timer = self.create_timer(0.5, self.evaluate_tracking)
        self.get_logger().info('DiffDriveTelemetryValidator listening to /odom and /cmd_vel...')

    def cmd_vel_callback(self, msg: Twist):
        # Cache commanded linear velocity
        self.target_linear_x = msg.linear.x

    def odom_callback(self, msg: Odometry):
        # ======================================================================
        # TODO 3: Extract measured linear velocity and position
        # - Hint: Extract measured linear.x from msg.twist.twist and extract 2D position (x, y) from msg.pose.pose.position.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass

    def evaluate_tracking(self):
        # ======================================================================
        # TODO 4: Compute tracking delta and log diagnostics
        # - Hint: Calculate the absolute difference between commanded and measured velocity, then log the tracking telemetry and position.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


def main(args=None):
    rclpy.init(args=args)
    node = DiffDriveTelemetryValidator()

    try:
        rclpy.spin(node)
    except (KeyboardInterrupt, ExternalShutdownException):
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
