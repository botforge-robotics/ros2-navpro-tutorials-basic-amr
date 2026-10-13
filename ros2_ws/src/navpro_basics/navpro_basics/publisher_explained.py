#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1
Explanation: Standard Velocity Publisher Node
"""
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist


class SimpleVelocityPublisher(Node):

    def __init__(self):
        super().__init__('simple_velocity_publisher')
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        self.timer = self.create_timer(0.1, self.timer_callback) # 10 Hz
        self.count = 0
        self.get_logger().info('Velocity publisher node has started.')

    def timer_callback(self):
        msg = Twist()
        msg.linear.x = 0.2    # 0.2 m/s forward
        msg.angular.z = 0.1   # 0.1 rad/s curve
        self.publisher_.publish(msg)
        self.count += 1
        if self.count % 20 == 0:
            self.get_logger().info(f'Published /cmd_vel: v={msg.linear.x}, w={msg.angular.z}')


def main(args=None):
    rclpy.init(args=args)
    node = SimpleVelocityPublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
