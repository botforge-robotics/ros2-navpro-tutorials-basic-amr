#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 15 Solution
Package: nexus_amr_basics
Task:    m04_l20_02_solution_controller_tuner.py (alias: controller_tuner)
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from nav_msgs.msg import Path
from geometry_msgs.msg import Twist


class ControllerTunerMonitor(Node):

    def __init__(self):
        super().__init__('controller_tuner_monitor')

        self.path_points_count = 0
        self.cmd_linear_x = 0.0
        self.cmd_angular_z = 0.0

        # Step 1: Subscribe to global plan
        self.plan_sub = self.create_subscription(
            Path,
            '/plan',
            self.plan_callback,
            10
        )

        # Step 2: Subscribe to local controller output
        self.cmd_sub = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_vel_callback,
            10
        )

        self.timer = self.create_timer(1.0, self.report_tracking_metrics)
        self.get_logger().info('ControllerTunerMonitor active on /plan and /cmd_vel.')

    def plan_callback(self, msg: Path):
        # Step 3: Record plan size
        self.path_points_count = len(msg.poses)

    def cmd_vel_callback(self, msg: Twist):
        self.cmd_linear_x = msg.linear.x
        self.cmd_angular_z = msg.angular.z

    def report_tracking_metrics(self):
        # Step 4: Emit telemetry
        self.get_logger().info(
            f'[NAV2 CONTROLLER] Plan Size: {self.path_points_count:3d} poses | '
            f'Cmd Linear: {self.cmd_linear_x:4.2f} m/s | Angular: {self.cmd_angular_z:5.2f} rad/s'
        )


def main(args=None):
    rclpy.init(args=args)
    node = ControllerTunerMonitor()

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
