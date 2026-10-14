#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 2 / Lesson 08 Task
Package: navpro_basics
Task:    m02_l08_task_service_calculator.py (alias: task_service_calculator)
================================================================================

EXERCISE OVERVIEW:
------------------
Your goal is to build your very first ROS 2 Service Server using the standard
`example_interfaces/srv/AddTwoInts` interface.

OBJECTIVES:
-----------
1. Initialize node with name 'service_calculator_task'.
2. Create Service on 'calculate_sum' using interface `AddTwoInts`.
3. In the callback `compute_sum(self, request, response)`:
   - Compute the sum: response.sum = request.a + request.b
   - Log: f'Computing {request.a} + {request.b} = {response.sum}'
   - Return response
4. Test your running service with the ROS 2 CLI:
   $ ros2 service call /calculate_sum example_interfaces/srv/AddTwoInts "{a: 15, b: 27}"
================================================================================
"""

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class ServiceCalculatorNode(Node):
    """
    Student Starter Template: Beginner Service Server
    """

    def __init__(self):
        super().__init__('service_calculator_task')
        self.get_logger().info('Initializing ServiceCalculatorNode...')

        # ----------------------------------------------------------------------
        # TODO 1: Create a Service Server on 'calculate_sum'
        # Interface Type:    AddTwoInts
        # Service Name:      'calculate_sum'
        # Callback Function: self.compute_sum
        # Hint: self.srv = self.create_service(AddTwoInts, 'calculate_sum', self.compute_sum)
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        self.srv = None

    def compute_sum(self, request, response):
        """
        TODO 2: Service Request Callback
        --------------------------------
        1. Calculate: response.sum = request.a + request.b
        2. Log calculation: self.get_logger().info(...)
        3. Return response
        """
        # TODO: STUDENT CODE HERE
        return response


def main(args=None):
    rclpy.init(args=args)
    node = ServiceCalculatorNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
