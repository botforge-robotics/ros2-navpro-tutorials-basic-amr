#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 4 (Bonus) / Lesson 22 Task
Package: nexus_amr_basics
Task:    m04_l21_01_task_recovery_monitor.py (alias: task_recovery_monitor)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a Behavior Tree & Recovery Behavior Supervisor node
that simulates and monitors Nav2 recovery pipelines (Spin, BackUp, Wait).

OBJECTIVES:
-----------
1. TODO 1: Initialize states: 'NAVIGATING', 'RECOVERY_SPIN', 'RECOVERY_BACKUP', 'RECOVERY_WAIT'.
2. TODO 2: Create a 1.0 Hz timer that executes state transitions when simulated
   stuck conditions occur (e.g., after 5 ticks of navigation).
3. TODO 3: In `step_lifecycle`, cycle through Recovery Behaviors in correct priority:
   NAVIGATING -> RECOVERY_SPIN -> RECOVERY_BACKUP -> RECOVERY_WAIT -> ABORT.
4. TODO 4: Log colorized state transitions and emit recovery warnings.
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException


class Nav2RecoverySupervisor(Node):

    def __init__(self):
        super().__init__('nav2_recovery_supervisor')

        # ======================================================================
        # TODO 1: Initialize lifecycle and recovery states
        # - Hint: Initialize an initial state string attribute and a tick counter integer.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.timer = self.create_timer(1.0, self.step_lifecycle)
        self.get_logger().info('Nav2RecoverySupervisor initialized in state: NAVIGATING.')

    def step_lifecycle(self):
        # ======================================================================
        # TODO 2 & 3: Advance state machine
        # - Hint: Increment the tick counter. Advance the state sequentially through the standard recovery sequence (NAVIGATING -> RECOVERY_SPIN -> RECOVERY_BACKUP -> RECOVERY_WAIT -> NAVIGATING).
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Log state transition
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


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
