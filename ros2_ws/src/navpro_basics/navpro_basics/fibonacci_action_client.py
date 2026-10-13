#!/usr/bin/env python3
"""
================================================================================
Official ROS 2 Jazzy Tutorial: Writing an action server and client (Python)
Reference: https://docs.ros.org/en/jazzy/Tutorials/Intermediate/
           Writing-an-action-server-client/Python.html
Node: FibonacciActionClient
================================================================================

WHAT THIS NODE DOES:
--------------------
This is the canonical official ROS 2 tutorial action client node.
It connects to the 'fibonacci' action server, submits a goal with order=10,
listens for real-time progress feedback, and logs the final completed result.
"""

import sys
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node

try:
    from action_tutorials_interfaces.action import Fibonacci
except ImportError:
    from navpro_interfaces.action import Fibonacci


class FibonacciActionClient(Node):
    """
    Official ROS 2 Fibonacci Action Client Node.
    """

    def __init__(self):
        super().__init__('fibonacci_action_client')

        # Create Action Client:
        # - Node: self
        # - Action Type: Fibonacci
        # - Action Name: 'fibonacci'
        self._action_client = ActionClient(self, Fibonacci, 'fibonacci')

    def send_goal(self, order):
        """
        Sends an asynchronous goal request to the server with feedback callback.
        """
        self.get_logger().info('Waiting for action server to start...')
        self._action_client.wait_for_server()

        goal_msg = Fibonacci.Goal()
        goal_msg.order = order

        self.get_logger().info(f'Sending goal request for Fibonacci order {order}...')

        # Send goal with registered feedback callback
        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        """
        Invoked when the action server accepts or rejects our goal.
        """
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().warn('Goal was rejected by server :(')
            return

        self.get_logger().info('Goal accepted! Awaiting result...')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def feedback_callback(self, feedback_msg):
        """
        Invoked whenever the action server broadcasts a feedback message.
        """
        feedback = feedback_msg.feedback
        self.get_logger().info(f'Received feedback sequence: {feedback.partial_sequence}')

    def get_result_callback(self, future):
        """
        Invoked when the action server finishes execution and delivers result.
        """
        result = future.result().result
        self.get_logger().info(f'Final Result: {result.sequence}')
        rclpy.shutdown()


def main(args=None):
    rclpy.init(args=args)

    order = int(sys.argv[1]) if len(sys.argv) > 1 else 10
    action_client = FibonacciActionClient()
    action_client.send_goal(order)

    rclpy.spin(action_client)


if __name__ == '__main__':
    main()
