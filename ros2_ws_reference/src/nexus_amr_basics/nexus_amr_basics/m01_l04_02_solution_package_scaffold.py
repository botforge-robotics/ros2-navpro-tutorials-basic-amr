#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 04 Solution
Package: nexus_amr_basics
Task:    m01_l04_02_solution_package_scaffold.py (alias: amr_heartbeat)
================================================================================
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException


class AMRHeartbeatNode(Node):

    def __init__(self):
        super().__init__('amr_heartbeat_node')

        # Step 1: Initialize sequence counter & start timestamp
        self.seq_id = 0
        self.start_time = time.time()

        # Step 2: Create 2.0 Hz timer
        self.timer_period = 0.5
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        self.get_logger().info('AMRHeartbeatNode initialized and broadcasting at 2.0 Hz.')

    def timer_callback(self):
        self.seq_id += 1
        uptime = time.time() - self.start_time
        self.get_logger().info(
            f'[HEARTBEAT #{self.seq_id:04d}] Subsystem nominal | Uptime: {uptime:5.1f}s'
        )


def main(args=None):
    rclpy.init(args=args)
    node = AMRHeartbeatNode()

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
