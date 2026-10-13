#!/usr/bin/env python3
"""
================================================================================
Official ROS 2 Jazzy Tutorial: Using parameters in a class (Python)
Reference: https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/
           Using-Parameters-In-A-Class-Python.html
Node: MinimalParam (parameter demonstration)
================================================================================

WHAT THIS NODE DOES:
--------------------
This is the canonical official ROS 2 beginner tutorial parameter node.
It declares a parameter named 'my_parameter' with default value 'world',
periodically inspects its value in a 1-second timer loop, and logs 'Hello <value>!'.
Students can change this value dynamically using:
  $ ros2 param set /minimal_param_node my_parameter earth
"""

import rclpy
from rclpy.node import Node


class MinimalParam(Node):
    """
    Official ROS 2 Minimal Parameter Node.
    """

    def __init__(self):
        super().__init__('minimal_param_node')

        # 1. Declare parameter with default string value 'world'
        self.declare_parameter('my_parameter', 'world')

        # 2. Create timer running every 1.0 second
        self.timer = self.create_timer(1.0, self.timer_callback)

        self.get_logger().info('MinimalParam node initialized. Try: ros2 param set /minimal_param_node my_parameter <val>')

    def timer_callback(self):
        """
        Retrieves the current value of 'my_parameter' and logs a greeting.
        """
        my_param = self.get_parameter('my_parameter').get_parameter_value().string_value
        self.get_logger().info(f'Hello {my_param}!')


def main(args=None):
    rclpy.init(args=args)
    node = MinimalParam()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
