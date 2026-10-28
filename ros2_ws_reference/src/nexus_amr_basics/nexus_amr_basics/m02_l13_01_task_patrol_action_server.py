#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 13 Task
Package: nexus_amr_basics
Task:    m02_l13_01_task_patrol_action_server.py (alias: task_patrol_action)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct an Autonomous Multi-Waypoint Patrol Action Server
utilizing our custom compiled action interface: `nexus_amr_interfaces/action/Patrol.action`.

OBJECTIVES:
-----------
1. Import `Patrol` from `nexus_amr_interfaces.action`.
2. TODO 1: Initialize ActionServer on 'patrol' action with `self.execute_patrol`.
3. TODO 2: In `execute_patrol`, iterate through `goal_handle.request.waypoints`:
   - Compute Euclidean distance to target waypoint.
   - Loop progress simulation (e.g., 3 steps per waypoint).
4. TODO 3: Publish `Patrol.Feedback` with:
   - current_waypoint_index
   - distance_to_target
   - estimated_time_remaining
5. TODO 4: Populate `Patrol.Result` (success=True, completed_loops, total_distance),
   mark `goal_handle.succeed()`, and return result.
================================================================================
"""

import time
import math
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer
from rclpy.executors import ExternalShutdownException
from nexus_amr_interfaces.action import Patrol


class PatrolActionServer(Node):

    def __init__(self):
        super().__init__('patrol_action_server')

        # ======================================================================
        # TODO 1: Initialize ActionServer on 'patrol'
        # - Hint: Call ActionServer(self, Patrol, 'patrol', self.execute_patrol) to register the action server.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.get_logger().info('PatrolActionServer ready and awaiting multi-waypoint patrol goals.')

    def execute_patrol(self, goal_handle):
        waypoints = goal_handle.request.waypoints
        loop_count = goal_handle.request.loop_count
        self.get_logger().info(f'Starting patrol: {len(waypoints)} waypoints x {loop_count} loops.')

        feedback = Patrol.Feedback()
        total_dist = 0.0

        # ======================================================================
        # TODO 2: Iterate through waypoints and simulate navigation
        # - Hint: Loop through loops and waypoints. Handle cancellation requests promptly via goal_handle.is_cancel_requested.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 3: Publish feedback during transit
        # - Hint: Populate waypoint index and remaining distance on the feedback object, and publish with goal_handle.publish_feedback().
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Finalize Result and succeed
        # - Hint: Mark goal as succeeded via goal_handle.succeed(), set success and total metrics on the result object, and return it.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        return Patrol.Result()


def main(args=None):
    rclpy.init(args=args)
    node = PatrolActionServer()

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
