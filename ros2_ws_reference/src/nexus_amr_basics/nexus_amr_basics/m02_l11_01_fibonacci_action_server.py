#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 11
Package: nexus_amr_basics
Node:    NavigateDistanceActionServer (navigate_distance_server)
Action:  /navigate_distance (nexus_amr_interfaces/action/NavigateDistance)
================================================================================

WHAT THIS NODE DOES:
--------------------
This node implements an Autonomous Mobile Robot (AMR) Linear Traversal Action Server.
It allows navigation clients to dispatch goals requesting the robot to traverse a
specified distance at a given speed.

Throughout execution:
- It runs a high-frequency control loop (10 Hz).
- It calculates distance traveled, remaining distance, and completion percentage.
- It streams real-time feedback over DDS.
- It supports goal cancellation: if a safety operator cancels the goal, it halts
  smoothly and transitions to CANCELLED state.
- Upon reaching the target, it transitions to SUCCEEDED and returns the final metrics.
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from nexus_amr_interfaces.action import NavigateDistance


class NavigateDistanceActionServer(Node):
    """
    AMR Linear Navigation Action Server Node.
    """

    def __init__(self):
        super().__init__('navigate_distance_server')

        # Create ROS 2 Action Server
        self._action_server = ActionServer(
            self,
            NavigateDistance,
            '/navigate_distance',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )

        self.get_logger().info(
            'NavigateDistanceActionServer initialized. Ready to accept navigation goals on "/navigate_distance"...'
        )

    def goal_callback(self, goal_request):
        """
        Validates incoming goal parameters before accepting.
        """
        if goal_request.target_distance_m <= 0.0:
            self.get_logger().warn(
                f'Rejecting goal: target_distance_m ({goal_request.target_distance_m}) must be positive!'
            )
            return GoalResponse.REJECT

        if goal_request.max_speed_mps <= 0.0 or goal_request.max_speed_mps > 2.0:
            self.get_logger().warn(
                f'Rejecting goal: max_speed_mps ({goal_request.max_speed_mps}) exceeds AMR physical safety limits (0.1 to 2.0 m/s)!'
            )
            return GoalResponse.REJECT

        self.get_logger().info(
            f'Goal accepted: Traverse {goal_request.target_distance_m:.2f} m at {goal_request.max_speed_mps:.2f} m/s.'
        )
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        """
        Handles client-requested preemption / cancellation.
        """
        self.get_logger().warn('Received request to cancel active navigation goal!')
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        """
        Executes long-running traversal with continuous feedback streaming.
        """
        target = goal_handle.request.target_distance_m
        speed = goal_handle.request.max_speed_mps

        self.get_logger().info(f'Starting traversal: Target = {target:.2f} m, Speed = {speed:.2f} m/s')

        feedback_msg = NavigateDistance.Feedback()
        distance_travelled = 0.0
        dt = 0.1  # 10 Hz loop

        while distance_travelled < target:
            # Check if client requested cancellation
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().warn('Navigation goal successfully CANCELLED by client.')
                result = NavigateDistance.Result()
                result.reached_target = False
                result.actual_distance_travelled_m = float(round(distance_travelled, 3))
                result.status_message = 'Goal cancelled before target was reached.'
                return result

            # Increment simulated motion
            step = speed * dt
            distance_travelled = min(target, distance_travelled + step)

            # Populate and stream feedback
            feedback_msg.distance_remaining_m = float(round(target - distance_travelled, 3))
            feedback_msg.current_speed_mps = float(round(speed, 2))
            feedback_msg.percent_complete = float(round((distance_travelled / target) * 100.0, 1))

            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info(
                f'Progress: {feedback_msg.percent_complete:5.1f}% | Remaining: {feedback_msg.distance_remaining_m:5.2f} m'
            )

            time.sleep(dt)

        # Mark goal as succeeded
        goal_handle.succeed()

        result = NavigateDistance.Result()
        result.reached_target = True
        result.actual_distance_travelled_m = float(round(distance_travelled, 3))
        result.status_message = f'Traversed {distance_travelled:.2f} meters successfully.'

        self.get_logger().info(f'Goal SUCCEEDED: {result.status_message}')
        return result


def main(args=None):
    rclpy.init(args=args)
    node = NavigateDistanceActionServer()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
