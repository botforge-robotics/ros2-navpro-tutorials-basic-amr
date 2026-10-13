#!/usr/bin/env python3
"""
================================================================================
Official ROS 2 Jazzy Tutorial: Writing a simple service and client (Python)
Reference: https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/
           Writing-A-Simple-Py-Service-And-Client.html
Node: MinimalService (add_two_ints server)
================================================================================

WHAT THIS NODE DOES:
--------------------
This is the canonical official ROS 2 beginner tutorial service server node.
It uses the standard interface `example_interfaces/srv/AddTwoInts` which has:
  int64 a
  int64 b
  ---
  int64 sum
The node creates a service named 'add_two_ints', computes the sum of the two
integers provided by any calling client, and returns the result.
"""

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class MinimalService(Node):
    """
    Official ROS 2 Minimal Service Server Node.
    """

    def __init__(self):
        # 1. Initialize base class with node name 'minimal_service'
        super().__init__('minimal_service')

        # 2. Create Service:
        # - Service type: AddTwoInts from example_interfaces.srv
        # - Service name: 'add_two_ints'
        # - Callback function: self.add_two_ints_callback
        self.srv = self.create_service(
            AddTwoInts,
            'add_two_ints',
            self.add_two_ints_callback
        )

        self.get_logger().info('MinimalService ready. Waiting for requests on "add_two_ints"...')

    def add_two_ints_callback(self, request, response):
        """
        Executed automatically when a client sends a request.
        Parameters:
            request: Contains request.a and request.b (integers)
            response: Response object where response.sum must be populated
        Returns:
            The modified response object
        """
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request: a={request.a}, b={request.b}')
        self.get_logger().info(f'Returning response: [{response.sum}]')
        return response


def main():
    rclpy.init()

    minimal_service = MinimalService()

    try:
        rclpy.spin(minimal_service)
    except KeyboardInterrupt:
        pass
    finally:
        minimal_service.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
