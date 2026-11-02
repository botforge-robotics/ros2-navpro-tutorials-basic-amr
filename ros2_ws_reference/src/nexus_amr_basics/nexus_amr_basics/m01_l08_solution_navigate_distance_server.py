#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 08 Solution
Package: nexus_amr_basics
Task:    m02_l12_02_solution_fibonacci_action_server.py (alias: solution_navigate_action)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Reference Solution: AMR Linear Traversal Navigation Action Server.
Handles long-running distance navigation goals with continuous feedback streaming
and preemption/cancelation support using `nexus_amr_interfaces/action/NavigateDistance`.

3-Part Action Lifecycle Implemented:
1. Goal Validation: Rejects non-positive distances or speeds.
2. Cancelation Audit: Honors client abort commands instantly during execution.
3. Iterative Feedback: Streams progress percentage and distance remaining at 10 Hz.
================================================================================
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from nexus_amr_interfaces.action import NavigateDistance


class NavigateDistanceSolutionServer(Node):
    """
    Reference Solution: AMR Linear Navigation Action Server
    """

    def __init__(self):
        super().__init__('navigate_distance_server')

        # Initialize the Action Server with 3 lifecycle callbacks
        self._action_server = ActionServer(
            self,
            NavigateDistance,
            '/navigate_distance',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )

        self.get_logger().info('NavigateDistanceSolutionServer active on /navigate_distance.')

    def goal_callback(self, goal_request):
        """
        Step 1: Goal Acceptance Policy.
        Validates target parameters before allocating execution resources.
        """
        if goal_request.target_distance_m <= 0.0 or goal_request.max_speed_mps <= 0.0:
            self.get_logger().warn(
                f'Rejecting goal: target_distance={goal_request.target_distance_m}, speed={goal_request.max_speed_mps}'
            )
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        """
        Step 2: Preemption & Cancelation Policy.
        Allows clients or fleet supervisors to abort the navigation traversal midway.
        """
        self.get_logger().warn('Received client request to CANCEL active navigation traversal.')
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        """
        Step 3: Execution Loop.
        Iteratively simulates motion, streams feedback, audits cancelation, and returns result.
        """
        target = goal_handle.request.target_distance_m
        speed = min(2.0, max(0.1, goal_handle.request.max_speed_mps))

        feedback_msg = NavigateDistance.Feedback()
        distance_travelled = 0.0
        dt = 0.1  # 10 Hz feedback loop

        while distance_travelled < target:
            # Check for client cancelation request
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                result = NavigateDistance.Result()
                result.reached_target = False
                result.actual_distance_travelled_m = float(round(distance_travelled, 3))
                result.status_message = 'Navigation preempted by cancel request.'
                self.get_logger().warn(f'[ABORTED] {result.status_message}')
                return result

            # Simulate incremental linear travel step
            step = speed * dt
            distance_travelled = min(target, distance_travelled + step)

            # Populate feedback telemetry
            feedback_msg.distance_remaining_m = float(round(target - distance_travelled, 3))
            feedback_msg.current_speed_mps = float(round(speed, 2))
            feedback_msg.percent_complete = float(round((distance_travelled / target) * 100.0, 1))

            # Stream feedback packet over DDS
            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info(
                f'[TRAVERSAL FEEDBACK] Progress: {feedback_msg.percent_complete:5.1f}% | Rem: {feedback_msg.distance_remaining_m:5.2f} m'
            )

            time.sleep(dt)

        # Transition goal state machine to STATUS_SUCCEEDED
        goal_handle.succeed()

        # Return terminal result payload
        result = NavigateDistance.Result()
        result.reached_target = True
        result.actual_distance_travelled_m = float(round(distance_travelled, 3))
        result.status_message = f'Target distance of {target:.2f} m reached successfully.'
        self.get_logger().info(f'[SUCCEEDED] {result.status_message}')
        return result


def main(args=None):
    rclpy.init(args=args)
    node = NavigateDistanceSolutionServer()
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
