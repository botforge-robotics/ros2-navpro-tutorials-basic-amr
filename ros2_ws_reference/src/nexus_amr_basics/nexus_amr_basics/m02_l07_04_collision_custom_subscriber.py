#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 07
Package: nexus_amr_basics
Node:    CollisionCustomSubscriber
================================================================================

WHAT THIS NODE DOES:
--------------------
Demonstrates subscribing to a custom ROS 2 interface (`nexus_amr_interfaces/msg/UltrasonicRange`)
in a Python subscriber node.
Parses header, distance, and triggers emergency action on obstacle detection.
"""

import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.msg import UltrasonicRange


class CollisionCustomSubscriber(Node):

    def __init__(self):
        super().__init__('collision_custom_subscriber')

        self.subscription = self.create_subscription(
            UltrasonicRange,
            '/sensor/ultrasonic_range',
            self.telemetry_callback,
            10
        )

        self.get_logger().info(
            'CollisionCustomSubscriber active. Listening to "/sensor/ultrasonic_range"...'
        )

    def telemetry_callback(self, msg: UltrasonicRange):
        stamp_sec = msg.header.stamp.sec
        stamp_nanosec = msg.header.stamp.nanosec

        if msg.obstacle_detected:
            self.get_logger().error(
                f'EMERGENCY STOP TRIGGERED: Frame [{msg.header.frame_id}] detected obstacle at {msg.distance_m:.2f} m!'
            )
        else:
            self.get_logger().info(
                f'NOMINAL OPERATION: Frame [{msg.header.frame_id}] clear path at {msg.distance_m:.2f} m (Stamp: {stamp_sec}.{stamp_nanosec:09d})'
            )


def main(args=None):
    rclpy.init(args=args)
    node = CollisionCustomSubscriber()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
