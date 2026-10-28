#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 04 Task
Package: nexus_amr_basics
Task:    m01_l04_01_task_package_scaffold.py (alias: task_package_scaffold)
================================================================================

EXERCISE OVERVIEW:
------------------
Your goal is to build and package your first object-oriented ROS 2 Python node
within the `nexus_amr_basics` package structure. The node acts as an AMR Subsystem
Heartbeat Beacon, periodically announcing robot operational health.

OBJECTIVES:
-----------
1. Inherit from `rclpy.node.Node` and initialize with name 'amr_heartbeat_node'.
2. TODO 1: Initialize heartbeat sequence counter `self.seq_id = 0` and node start time.
3. TODO 2: Create a 2.0 Hz wall timer (period = 0.5 seconds).
4. TODO 3: In `timer_callback`, increment sequence ID and emit a formatted INFO log:
   "[HEARTBEAT #{seq_id}] Subsystem nominal | Uptime: {uptime:.1f}s"
5. Register this script as an entry point console_script in `setup.py`.
================================================================================
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException


class AMRHeartbeatNode(Node):

    def __init__(self):
        super().__init__('amr_heartbeat_node')

        # ======================================================================
        # TODO 1: Initialize state variables
        # - Initialize a sequence ID counter starting at zero
        # - Record the initial startup timestamp with time.time()
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 2: Create a 2.0 Hz timer (period = 0.5 seconds)
        # - Hint: Call self.create_timer() specifying the timer period (in seconds) and the callback method.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.get_logger().info('AMRHeartbeatNode initialized and broadcasting at 2.0 Hz.')

    def timer_callback(self):
        # ======================================================================
        # TODO 3: Increment sequence counter and log heartbeat status
        # - Increment the sequence counter
        # - Calculate elapsed uptime since start
        # - Format and emit an informational heartbeat log via self.get_logger().info()
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


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
