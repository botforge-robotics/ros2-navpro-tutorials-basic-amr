#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 4 (Bonus) / Lesson 19 Solution
Package: nexus_amr_basics
Task:    m02_l07_02_solution_status_publisher.py (alias: robot_status_publisher)
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from nexus_amr_interfaces.msg import RobotStatus
from geometry_msgs.msg import Point


class RobotStatusPublisher(Node):

    def __init__(self):
        super().__init__('robot_status_publisher')

        self.battery_level = 100.0
        self.pos_x = 0.0
        self.pos_y = 0.0

        # Step 1: Create publisher for custom interface
        self.status_pub = self.create_publisher(RobotStatus, '/robot/status', 10)

        # Step 2: 1.0 Hz periodic timer
        self.timer_period = 1.0
        self.timer = self.create_timer(self.timer_period, self.publish_status)

        self.get_logger().info('RobotStatusPublisher initialized on topic /robot/status at 1.0 Hz.')

    def publish_status(self):
        self.battery_level = max(5.0, self.battery_level - 0.2)
        self.pos_x += 0.15
        self.pos_y += 0.05

        # Step 3: Populate custom message fields
        msg = RobotStatus()
        msg.robot_id = 'NAVPRO_AMR_01'
        msg.battery_percentage = float(self.battery_level)
        msg.is_charging = False
        msg.emergency_stop_active = False

        pt = Point()
        pt.x = float(self.pos_x)
        pt.y = float(self.pos_y)
        pt.z = 0.0
        msg.position = pt

        msg.linear_velocity = 0.35
        msg.angular_velocity = 0.05

        # Step 4: Publish and log
        self.status_pub.publish(msg)
        self.get_logger().info(
            f'[STATUS PUB] AMR: {msg.robot_id} | Bat: {msg.battery_percentage:5.1f}% | '
            f'Pos: ({msg.position.x:5.2f}, {msg.position.y:5.2f}) | Vel: {msg.linear_velocity:.2f} m/s'
        )


def main(args=None):
    rclpy.init(args=args)
    node = RobotStatusPublisher()

    try:
        rclpy.spin(node)
    except (KeyboardInterrupt, ExternalShutdownException):
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
