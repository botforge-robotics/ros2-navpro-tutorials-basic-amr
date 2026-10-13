#!/usr/bin/env python3
"""
================================================================================
Official ROS 2 Jazzy Tutorial: Writing a simple service and client (Python)
Reference: https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/
           Writing-A-Simple-Py-Service-And-Client.html
Node: MinimalClientAsync (add_two_ints client)
================================================================================

WHAT THIS NODE DOES:
--------------------
This is the canonical official ROS 2 beginner tutorial service client node.
It uses `example_interfaces/srv/AddTwoInts`, connects to the 'add_two_ints'
service, sends two integer arguments, waits asynchronously for the result,
and logs the returned sum.
"""

import sys
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class MinimalClientAsync(Node):
    """
    Official ROS 2 Minimal Service Client Node.
    """

    def __init__(self):
        super().__init__('minimal_client_async')

        # 1. Create client:
        # - Service type: AddTwoInts
        # - Service name: 'add_two_ints'
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')

        # 2. Wait until the service is active on the network
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service "add_two_ints" not available, waiting again...')

        # 3. Create request object
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        """
        Populates request fields and sends the request asynchronously.
        """
        self.req.a = a
        self.req.b = b
        return self.cli.call_async(self.req)


def main():
    rclpy.init()

    # Parse command line arguments or use defaults (2, 3)
    a = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    b = int(sys.argv[2]) if len(sys.argv) > 2 else 3

    minimal_client = MinimalClientAsync()
    future = minimal_client.send_request(a, b)

    # Wait until the future completes
    rclpy.spin_until_future_complete(minimal_client, future)

    response = future.result()
    minimal_client.get_logger().info(
        f'Result of add_two_ints: {a} + {b} = {response.sum}'
    )

    minimal_client.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
