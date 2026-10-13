#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Beginner Task 2 Reference Solution
Package: navpro_basics
Task:    solution_service_calculator.py
================================================================================
"""

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class ServiceCalculatorSolution(Node):
    """
    Reference Solution: Beginner Service Server
    """

    def __init__(self):
        super().__init__('service_calculator_solution')
        self.get_logger().info('Initializing ServiceCalculatorSolution...')

        self.srv = self.create_service(
            AddTwoInts,
            'calculate_sum',
            self.compute_sum
        )

    def compute_sum(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Computing {request.a} + {request.b} = {response.sum}')
        return response


def main(args=None):
    rclpy.init(args=args)
    node = ServiceCalculatorSolution()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
