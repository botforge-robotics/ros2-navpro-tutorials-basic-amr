#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 06
Package: nexus_amr_basics
Node:    ThrottledLoggingNode (throttled_logger)
================================================================================

WHAT THIS NODE DOES:
--------------------
Demonstrates two essential ROS 2 industrial logging features:
1. Throttled Logging (throttle_duration_sec):
   Limits log output to at most once per specified duration (e.g. 2.0 seconds),
   even inside a fast 20 Hz loop! Prevents terminal flooding and saves CPU.
2. One-Shot Logging (once=True):
   Ensures a message is logged exactly ONCE during the entire lifecycle of the
   node. Ideal for initial network discovery, calibration, or static config.

HOW TO RUN:
-----------
ros2 run nexus_amr_basics throttled_logger
================================================================================
"""

import rclpy
from rclpy.node import Node


class ThrottledLoggingNode(Node):
    """
    Demonstrates throttling high-frequency loops and one-shot logging in rclpy.
    """

    def __init__(self):
        super().__init__('throttled_logging_node')

        # Fast 20 Hz loop (period = 0.05 seconds)
        # Without throttling, this would print 20 messages per second!
        self.loop_hz = 20.0
        self.timer_period = 1.0 / self.loop_hz
        self.ticks = 0
        self.simulated_odometry_x = 0.0

        self.timer = self.create_timer(self.timer_period, self.fast_control_loop)
        self.get_logger().info('ThrottledLoggingNode started at 20 Hz (dt=0.05s).')

    def fast_control_loop(self):
        self.ticks += 1
        self.simulated_odometry_x += 0.01

        # ----------------------------------------------------------------------
        # 1. ONE-SHOT LOGGING (once=True)
        # ----------------------------------------------------------------------
        # Despite running every 50ms, this will execute exactly ONCE!
        self.get_logger().info(
            'Odometry pipeline synchronized with wheel encoders (Calibration OK).',
            once=True
        )

        # ----------------------------------------------------------------------
        # 2. THROTTLED LOGGING (throttle_duration_sec=2.0)
        # ----------------------------------------------------------------------
        # Logs at most once every 2.0 seconds (every ~40 ticks),
        # suppressing the other 39 loop iterations automatically!
        self.get_logger().info(
            f'[20 Hz Loop] Ticks: {self.ticks:05d} | Simulated X Pose: {self.simulated_odometry_x:.2f} m',
            throttle_duration_sec=2.0
        )

        # ----------------------------------------------------------------------
        # 3. THROTTLED WARNING
        # ----------------------------------------------------------------------
        # Throttled warnings can also be duration-limited
        if self.simulated_odometry_x > 2.0:
            self.get_logger().warn(
                f'Robot approaching virtual boundary limit (X={self.simulated_odometry_x:.2f}m).',
                throttle_duration_sec=3.0
            )


from rclpy.executors import ExternalShutdownException


def main(args=None):
    rclpy.init(args=args)
    node = ThrottledLoggingNode()

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
