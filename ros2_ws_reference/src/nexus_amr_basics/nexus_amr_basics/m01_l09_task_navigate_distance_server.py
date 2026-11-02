#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 09 Task
Package: nexus_amr_basics
Task:    m02_l12_01_task_fibonacci_action_server.py (alias: task_navigate_action)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct an Autonomous Mobile Robot (AMR) Linear Traversal
Action Server utilizing the custom interface `nexus_amr_interfaces/action/NavigateDistance`.

OBJECTIVES:
-----------
1. Import `NavigateDistance` from `nexus_amr_interfaces.action`.
2. TODO 1: Initialize ActionServer on '/navigate_distance' with `self.execute_callback`.
3. TODO 2: In `execute_callback(self, goal_handle)`:
   - Extract `target = goal_handle.request.target_distance_m` and `speed = goal_handle.request.max_speed_mps`.
   - Instantiate feedback object: `feedback_msg = NavigateDistance.Feedback()`.
4. TODO 3: In a while loop advancing distance by `speed * dt`:
   - Check if `goal_handle.is_cancel_requested`. If so, call `goal_handle.canceled()` and return early.
   - Calculate `feedback_msg.distance_remaining_m = target - distance_travelled`.
   - Calculate `feedback_msg.percent_complete = (distance_travelled / target) * 100.0`.
   - Publish feedback: `goal_handle.publish_feedback(feedback_msg)`.
   - Sleep for `dt = 0.1` seconds.
5. TODO 4: Once target is achieved:
   - Call `goal_handle.succeed()`.
   - Populate `result = NavigateDistance.Result()` with `reached_target = True`,
     `actual_distance_travelled_m = distance_travelled`, `status_message = "Target reached."`.
   - Return result.
================================================================================
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from nexus_amr_interfaces.action import NavigateDistance


class NavigateDistanceTaskServer(Node):
    """
    Student Starter Template: AMR Linear Navigation Action Server
    """

    def __init__(self):
        super().__init__('navigate_distance_server')

        # ======================================================================
        # TODO 1: Create ActionServer on '/navigate_distance'
        # - Action Type: NavigateDistance
        # - Action Name: '/navigate_distance'
        # - Callback: self.execute_callback
        # ======================================================================
        # Hint: Call ActionServer(self, NavigateDistance, '/navigate_distance', self.execute_callback).
        self._action_server = None

        self.get_logger().info('NavigateDistanceTaskServer initialized and awaiting goals...')

    def execute_callback(self, goal_handle):
        target = goal_handle.request.target_distance_m
        speed = goal_handle.request.max_speed_mps
        self.get_logger().info(f'Executing traversal: Target={target:.2f} m, Speed={speed:.2f} m/s')

        # ======================================================================
        # TODO 2: Instantiate feedback message and initialize state
        # - Hint: Instantiate NavigateDistance.Feedback() and initialize distance_travelled and time step variables.
        # ======================================================================
        # TODO: Initialize feedback and motion tracking variables

        # ======================================================================
        # TODO 3: Control loop while distance_travelled < target:
        # - Hint: Check for cancellation via goal_handle.is_cancel_requested.
        # - Advance distance_travelled by speed * dt, update feedback fields, stream via goal_handle.publish_feedback(), and sleep dt.
        # ======================================================================
        # TODO: Implement traversal loop

        # ======================================================================
        # TODO 4: Complete goal, mark succeeded, and return result:
        # - Hint: Call goal_handle.succeed() and return a populated NavigateDistance.Result instance.
        # ======================================================================
        # TODO: Return result object

        return NavigateDistance.Result()


def main(args=None):
    rclpy.init(args=args)
    node = NavigateDistanceTaskServer()
    try:
        rclpy.spin(node)
    except (KeyboardInterrupt, rclpy.executors.ExternalShutdownException):
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
