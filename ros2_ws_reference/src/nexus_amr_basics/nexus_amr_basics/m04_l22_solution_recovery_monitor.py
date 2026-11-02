#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 4 / Lesson 21 Solution
Package: nexus_amr_basics
Task:    m04_l21_02_solution_recovery_monitor.py (alias: recovery_monitor)
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException


class Nav2RecoverySupervisor(Node):

    def __init__(self):
        super().__init__('nav2_recovery_supervisor')

        # Step 1: Initialize states
        self.state = 'NAVIGATING'
        self.tick_count = 0

        # Step 2: 1.0 Hz periodic state execution
        self.timer = self.create_timer(1.0, self.step_lifecycle)
        self.get_logger().info('Nav2RecoverySupervisor active in state: NAVIGATING.')

    def step_lifecycle(self):
        self.tick_count += 1

        # Step 3 & 4: Manage Recovery State Machine
        if self.tick_count == 3:
            self.state = 'RECOVERY_SPIN'
            self.get_logger().warn(
                '[NAV2 RECOVERY TRIGGER] Local planner stuck! Initiating 360-degree clearing spin...'
            )
        elif self.tick_count == 5:
            self.state = 'RECOVERY_BACKUP'
            self.get_logger().warn(
                '[NAV2 RECOVERY TRIGGER] Path obstructed! Initiating 0.3m reverse backup maneuver...'
            )
        elif self.tick_count == 7:
            self.state = 'RECOVERY_WAIT'
            self.get_logger().warn(
                '[NAV2 RECOVERY TRIGGER] Still unresolvable. Entering 3.0s sensor clearance pause...'
            )
        elif self.tick_count >= 9:
            self.state = 'NAVIGATING'
            self.tick_count = 0
            self.get_logger().info(
                '[NAV2 RECOVERY RESOLVED] Waypoint path clear! Resuming primary navigation.'
            )
        else:
            self.get_logger().info(
                f'[NAV2 BT STATE: {self.state}] Mission execution nominal | Tick: {self.tick_count}'
            )


def main(args=None):
    rclpy.init(args=args)
    node = Nav2RecoverySupervisor()

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
