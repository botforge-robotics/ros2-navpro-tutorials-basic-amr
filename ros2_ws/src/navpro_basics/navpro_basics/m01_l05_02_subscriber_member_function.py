#!/usr/bin/env python3
"""
================================================================================
Official ROS 2 Jazzy Tutorial: Writing a simple publisher and subscriber (Python)
Reference: https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/
           Writing-A-Simple-Py-Publisher-And-Subscriber.html
Node: MinimalSubscriber (listener)
================================================================================

WHAT THIS NODE DOES:
--------------------
This is the canonical official ROS 2 beginner tutorial subscriber node.
It inherits from rclpy.node.Node, registers a subscription on topic 'topic'
using standard string messages (std_msgs/msg/String), and defines a callback
method that logs 'I heard: "<message>"' whenever a message arrives.
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalSubscriber(Node):
    """
    Official ROS 2 Minimal Subscriber Node.
    """

    def __init__(self):
        # 1. Initialize base class with node name 'minimal_subscriber'
        super().__init__('minimal_subscriber')

        # 2. Create Subscription:
        # - Message type: String from std_msgs.msg
        # - Topic name: 'topic' (must match publisher's topic name)
        # - Callback function: self.listener_callback
        # - QoS queue depth: 10
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10
        )
        self.subscription  # Prevent unused variable warning from linter

        self.get_logger().info('MinimalSubscriber node initialized. Listening to "topic"...')

    def listener_callback(self, msg):
        """
        Executed automatically whenever a new String message arrives on 'topic'.
        """
        self.get_logger().info(f'I heard: "{msg.data}"')


def main(args=None):
    # Initialize the ROS 2 Python client library
    rclpy.init(args=args)

    # Instantiate the node
    minimal_subscriber = MinimalSubscriber()

    # Spin the node so subscription callbacks are executed as messages arrive
    try:
        rclpy.spin(minimal_subscriber)
    except KeyboardInterrupt:
        pass
    finally:
        # Destroy the node explicitly and shutdown rclpy
        minimal_subscriber.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
