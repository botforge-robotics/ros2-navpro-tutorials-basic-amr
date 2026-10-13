#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Beginner Task 1 Reference Solution
Package: navpro_basics
Task:    solution_custom_pubsub.py
================================================================================
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class BeginnerPubSubSolution(Node):
    """
    Reference Solution: Beginner Publisher & Subscriber
    """

    def __init__(self):
        super().__init__('beginner_pubsub_solution')
        self.get_logger().info('Initializing BeginnerPubSubSolution...')

        self.count = 0

        # 1. Create Publisher
        self.publisher_ = self.create_publisher(String, '/chatter', 10)

        # 2. Create Timer (1.0 Hz)
        self.timer_ = self.create_timer(1.0, self.timer_callback)

        # 3. Create Subscription
        self.subscription_ = self.create_subscription(
            String,
            '/chatter',
            self.listener_callback,
            10
        )

    def timer_callback(self):
        self.count += 1
        msg = String()
        msg.data = f'Robot ping: {self.count}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')

    def listener_callback(self, msg: String):
        self.get_logger().info(f'Received ping: "{msg.data}"')


def main(args=None):
    rclpy.init(args=args)
    node = BeginnerPubSubSolution()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
