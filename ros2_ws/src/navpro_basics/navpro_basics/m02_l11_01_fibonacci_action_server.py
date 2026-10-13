#!/usr/bin/env python3
"""
================================================================================
Official ROS 2 Jazzy Tutorial: Writing an action server and client (Python)
Reference: https://docs.ros.org/en/jazzy/Tutorials/Intermediate/
           Writing-an-action-server-client/Python.html
Node: FibonacciActionServer
================================================================================

WHAT THIS NODE DOES:
--------------------
This is the canonical official ROS 2 tutorial action server node.
It implements the Fibonacci action:
  Goal:     int32 order
  Result:   int32[] sequence
  Feedback: int32[] partial_sequence

The server calculates the Fibonacci sequence up to the requested order,
publishes periodic feedback showing progress at each step, and returns
the complete computed sequence when finished.
"""

import time
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node

try:
    from action_tutorials_interfaces.action import Fibonacci
except ImportError:
    from navpro_interfaces.action import Fibonacci


class FibonacciActionServer(Node):
    """
    Official ROS 2 Fibonacci Action Server Node.
    """

    def __init__(self):
        super().__init__('fibonacci_action_server')

        # Create Action Server:
        # - Node: self
        # - Action Type: Fibonacci
        # - Action Name: 'fibonacci'
        # - Execute Callback: self.execute_callback
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback
        )
        self.get_logger().info('Fibonacci Action Server initialized and waiting for goals...')

    def execute_callback(self, goal_handle):
        """
        Executed in a separate thread when a goal is received and accepted.
        Computes Fibonacci sequence while streaming feedback.
        """
        self.get_logger().info(f'Executing goal for order: {goal_handle.request.order}...')

        feedback_msg = Fibonacci.Feedback()
        feedback_msg.partial_sequence = [0, 1]

        # Calculate Fibonacci sequence one step at a time
        for i in range(1, goal_handle.request.order):
            # Check if the client requested to cancel the action
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().info('Goal canceled by client request!')
                result = Fibonacci.Result()
                result.sequence = feedback_msg.partial_sequence
                return result

            # Compute next number
            next_num = feedback_msg.partial_sequence[i] + feedback_msg.partial_sequence[i - 1]
            feedback_msg.partial_sequence.append(next_num)

            # Publish partial progress feedback
            self.get_logger().info(f'Feedback: {feedback_msg.partial_sequence}')
            goal_handle.publish_feedback(feedback_msg)

            # Delay 1 second to simulate long-running robotic task
            time.sleep(1.0)

        # Mark goal as successfully completed
        goal_handle.succeed()

        result = Fibonacci.Result()
        result.sequence = feedback_msg.partial_sequence
        self.get_logger().info(f'Returning result sequence: {result.sequence}')
        return result


def main(args=None):
    rclpy.init(args=args)
    fibonacci_action_server = FibonacciActionServer()
    try:
        rclpy.spin(fibonacci_action_server)
    except KeyboardInterrupt:
        pass
    finally:
        fibonacci_action_server.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
