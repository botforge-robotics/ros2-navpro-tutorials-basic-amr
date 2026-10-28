#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 07
Package: nexus_amr_basics
Node:    UltrasonicCustomPublisher
================================================================================

WHAT THIS NODE DOES:
--------------------
Demonstrates using a custom ROS 2 interface (`nexus_amr_interfaces/msg/UltrasonicRange`)
in a Python publisher node.
Publishes calibrated obstacle telemetry with timestamped header and safety flags.
"""

import math
import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.msg import UltrasonicRange


class UltrasonicCustomPublisher(Node):

    def __init__(self):
        super().__init__('ultrasonic_custom_publisher')

        # Create publisher using custom message interface
        self.publisher_ = self.create_publisher(
            UltrasonicRange,
            '/sensor/ultrasonic_range',
            10
        )

        self.timer_period = 0.1  # 10 Hz
        self.timer = self.create_timer(self.timer_period, self.publish_telemetry)
        self.step = 0

        self.get_logger().info(
            'UltrasonicCustomPublisher active. Publishing UltrasonicRange to "/sensor/ultrasonic_range" at 10 Hz...'
        )

    def publish_telemetry(self):
        msg = UltrasonicRange()

        # 1. Populate Standard Header
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'ultrasonic_front_link'

        # 2. Transducer specifications
        msg.min_range_m = 0.05
        msg.max_range_m = 3.00

        # 3. Dynamic distance simulation (smooth sinusoidal approach/retreat)
        t = self.step * self.timer_period
        simulated_dist = 1.4 + 1.1 * math.sin(0.4 * t)
        msg.distance_m = float(round(simulated_dist, 3))

        # 4. Computed obstacle safety detection
        msg.obstacle_detected = bool(msg.distance_m <= 0.45)

        self.publisher_.publish(msg)

        status_str = "DANGER: OBSTACLE" if msg.obstacle_detected else "CLEAR"
        self.get_logger().info(
            f'[{msg.header.frame_id}] Dist: {msg.distance_m:5.2f} m | Detected: {msg.obstacle_detected} [{status_str}]'
        )

        self.step += 1


def main(args=None):
    rclpy.init(args=args)
    node = UltrasonicCustomPublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
