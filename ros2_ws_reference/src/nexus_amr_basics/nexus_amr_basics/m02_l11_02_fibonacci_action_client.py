#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 11
Package: nexus_amr_basics
Node:    NavigateDistanceActionClient (navigate_distance_client)
Action:  /navigate_distance (nexus_amr_interfaces/action/NavigateDistance)
================================================================================

WHAT THIS NODE DOES:
--------------------
Demonstrates writing an asynchronous Action Client in Python.
It connects to '/navigate_distance', dispatches a motion goal (e.g. 3.0 m at 0.5 m/s),
registers a real-time feedback callback that renders progress, and awaits the
final action result without stalling the ROS 2 executor.
"""

import sys
import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from nexus_amr_interfaces.action import NavigateDistance


class NavigateDistanceActionClient(Node):
    """
    AMR Linear Navigation Action Client Node.
    """

    def __init__(self):
        super().__init__('navigate_distance_client')

        # Create ROS 2 Action Client
        self._action_client = ActionClient(
            self,
            NavigateDistance,
            '/navigate_distance'
        )

        self.get_logger().info('NavigateDistanceActionClient initialized.')

    def send_goal(self, distance: float, speed: float):
        """
        Dispatches navigation goal asynchronously.
        """
        goal_msg = NavigateDistance.Goal()
        goal_msg.target_distance_m = float(distance)
        goal_msg.max_speed_mps = float(speed)

        self.get_logger().info(
            f'Waiting for "/navigate_distance" action server to become available...'
        )
        self._action_client.wait_for_server()

        self.get_logger().info(
            f'Dispatching goal: Target = {distance:.2f} m @ {speed:.2f} m/s'
        )

        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        """
        Invoked when the action server accepts or rejects the goal.
        """
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().error('Goal REJECTED by action server!')
            return

        self.get_logger().info('Goal ACCEPTED by action server. Awaiting execution...')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def feedback_callback(self, feedback_msg):
        """
        Invoked whenever the action server streams feedback.
        """
        feedback = feedback_msg.feedback
        self.get_logger().info(
            f'[FEEDBACK] Completed: {feedback.percent_complete:5.1f}% | '
            f'Remaining: {feedback.distance_remaining_m:5.2f} m | '
            f'Speed: {feedback.current_speed_mps:.2f} m/s'
        )

    def get_result_callback(self, future):
        """
        Invoked when the action completes or aborts.
        """
        result = future.result().result
        self.get_logger().info(
            f'[RESULT] Succeeded: {result.reached_target} | '
            f'Distance: {result.actual_distance_travelled_m:.2f} m | '
            f'Status: "{result.status_message}"'
        )
        rclpy.shutdown()


def main(args=None):
    rclpy.init(args=args)
    client = NavigateDistanceActionClient()

    dist = float(sys.argv[1]) if len(sys.argv) > 1 else 2.5
    speed = float(sys.argv[2]) if len(sys.argv) > 2 else 0.5

    client.send_goal(dist, speed)

    try:
        rclpy.spin(client)
    except (KeyboardInterrupt, SystemExit):
        pass


if __name__ == '__main__':
    main()
