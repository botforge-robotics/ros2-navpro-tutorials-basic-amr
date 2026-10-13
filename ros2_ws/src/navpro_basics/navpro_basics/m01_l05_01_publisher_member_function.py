#!/usr/bin/env python3
"""
================================================================================
Official ROS 2 Jazzy Tutorial: Writing a simple publisher and subscriber (Python)
Reference: https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/
           Writing-A-Simple-Py-Publisher-And-Subscriber.html
Node: MinimalPublisher (talker)
================================================================================

WHAT THIS NODE DOES:
--------------------
This is the canonical official ROS 2 beginner tutorial publisher node.
It inherits from rclpy.node.Node, initializes a publisher on topic 'topic'
using standard string messages (std_msgs/msg/String), and periodically publishes
'Hello World: <count>' every 0.5 seconds (2 Hz).
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalPublisher(Node):
    """
    Official ROS 2 Minimal Publisher Node.
    """

    def __init__(self):
        # 1. Initialize base class with node name 'minimal_publisher'
        super().__init__('minimal_publisher')

        # 2. Create Publisher:
        # - Message type: String from std_msgs.msg
        # - Topic name: 'topic'
        # - QoS queue depth: 10
        self.publisher_ = self.create_publisher(String, 'topic', 10)

        # 3. Create a periodic timer running every 0.5 seconds (2 Hz)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

        # 4. Initialize counter variable
        self.i = 0
        self.get_logger().info('MinimalPublisher node initialized. Publishing to "topic" at 2 Hz...')

    def timer_callback(self):
        """
        Executed automatically every 0.5 seconds by the ROS 2 executor.
        Constructs a String message and publishes it to the DDS topic.
        """
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1


def main(args=None):
    # Initialize the ROS 2 Python client library
    rclpy.init(args=args)

    # Instantiate the node
    minimal_publisher = MinimalPublisher()

    # Spin the node so the timer callbacks can be processed
    try:
        rclpy.spin(minimal_publisher)
    except KeyboardInterrupt:
        pass
    finally:
        # Destroy the node explicitly and shutdown rclpy
        minimal_publisher.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
