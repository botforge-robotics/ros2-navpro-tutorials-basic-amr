#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1
Explanation: Velocity & Laser Scan Subscriber Node
"""
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan


class RobotSensorsSubscriber(Node):

    def __init__(self):
        super().__init__('robot_sensors_subscriber')
        # Subscribe to velocity
        self.cmd_sub = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_callback,
            10
        )
        # Subscribe to LiDAR scan
        self.scan_sub = self.create_subscription(
            LaserScan,
            '/scan',
            self.scan_callback,
            10
        )
        self.get_logger().info('Sensors subscriber listening to /cmd_vel and /scan...')

    def cmd_callback(self, msg: Twist):
        self.get_logger().info(f'Received /cmd_vel -> Linear: {msg.linear.x:.2f}, Angular: {msg.angular.z:.2f}', throttle_duration_sec=1.0)

    def scan_callback(self, msg: LaserScan):
        if len(msg.ranges) > 0:
            front_distance = msg.ranges[len(msg.ranges) // 2]
            self.get_logger().info(f'LiDAR Front Distance: {front_distance:.2f} m', throttle_duration_sec=1.0)


def main(args=None):
    rclpy.init(args=args)
    node = RobotSensorsSubscriber()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
