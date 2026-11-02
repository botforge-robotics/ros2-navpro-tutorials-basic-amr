#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 12 Solution
Package: nexus_amr_basics
Task:    m03_l16_02_solution_diff_drive_telemetry.py (alias: diff_drive_telemetry)
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

        # Step 1: Subscribe to odometry
        self.odom_sub = self.create_subscription(
            Odometry,
            '/odom',
            self.odom_callback,
            10
        )

        # Step 2: Subscribe to velocity commands
        self.cmd_sub = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_vel_callback,
            10
        )

        self.timer = self.create_timer(0.5, self.evaluate_tracking)
        self.get_logger().info('DiffDriveTelemetryValidator active on /odom and /cmd_vel.')

    def cmd_vel_callback(self, msg: Twist):
        self.target_linear_x = msg.linear.x

    def odom_callback(self, msg: Odometry):
        # Step 3: Extract physical metrics
        self.measured_linear_x = msg.twist.twist.linear.x
        self.current_x = msg.pose.pose.position.x
        self.current_y = msg.pose.pose.position.y

    def evaluate_tracking(self):
        # Step 4: Compute tracking error
        delta = abs(self.target_linear_x - self.measured_linear_x)
        self.get_logger().info(
            f'[ODOM CHECK] Cmd: {self.target_linear_x:4.2f} m/s | Meas: {self.measured_linear_x:4.2f} m/s | '
            f'Slip/Error: {delta:5.3f} | Pos: ({self.current_x:5.2f}, {self.current_y:5.2f})'
        )


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
