#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 06
Package: nexus_amr_basics
Node:    LoggerLevelsDemo (logger_levels)
================================================================================

WHAT THIS NODE DOES:
--------------------
Demonstrates the five ROS 2 industrial logging severity levels:
1. DEBUG  (10) -> Detailed low-level diagnostics (encoder ticks, math values)
2. INFO   (20) -> Standard operational milestones (default ROS 2 level)
3. WARN   (30) -> Recoverable anomalies / warnings (low battery, high temperature)
4. ERROR  (40) -> Component failures (sensor disconnected, goal aborted)
5. FATAL  (50) -> Catastrophic safety events (hardware E-Stop, emergency halt)

HOW TO RUN:
-----------
# 1. Run with default level (INFO and above):
ros2 run nexus_amr_basics logger_levels

# 2. Run with DEBUG level enabled:
ros2 run nexus_amr_basics logger_levels --ros-args --log-level debug

# 3. Run with WARN level only (suppresses INFO and DEBUG):
ros2 run nexus_amr_basics logger_levels --ros-args --log-level warn
================================================================================
"""

import rclpy
from rclpy.node import Node


class LoggerLevelsDemo(Node):
    """
    Demonstrates all 5 severity levels of the ROS 2 logging framework.
    """

    def __init__(self):
        super().__init__('logger_levels_demo')

        # 1. Log initialization milestone at INFO
        self.get_logger().info('LoggerLevelsDemo node initialized.')

        # 2. Create a periodic 1 Hz timer to demonstrate logging in an event loop
        self.step_count = 0
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        self.step_count += 1
        self.get_logger().info(f'--- Cycle #{self.step_count} Telemetry Check ---')

        # 1. DEBUG (Severity 10)
        # Suppressed by default! Visible only with '--ros-args --log-level debug'
        raw_encoder_ticks = 4096 + (self.step_count * 12)
        bus_voltage = 24.12
        self.get_logger().debug(
            f'[DEBUG] Raw encoder: {raw_encoder_ticks} ticks, Bus voltage: {bus_voltage:.2f}V'
        )

        # 2. INFO (Severity 20)
        # Default level. Printed in white/cyan in standard terminal
        current_waypoint = f'Station_B{self.step_count % 3 + 1}'
        self.get_logger().info(
            f'[INFO] Navigating toward destination: {current_waypoint}'
        )

        # 3. WARN (Severity 30)
        # Printed in Yellow. Indicates non-critical anomaly
        if self.step_count % 3 == 0:
            simulated_wifi_dbm = -78
            self.get_logger().warn(
                f'[WARN] Weak WiFi RSSI signal ({simulated_wifi_dbm} dBm). Roaming to backup AP.'
            )

        # 4. ERROR (Severity 40)
        # Printed in Red. Indicates subsystem failure
        if self.step_count % 5 == 0:
            self.get_logger().error(
                '[ERROR] Front 2D LiDAR frame dropped: checksum mismatch on /dev/ttyUSB0!'
            )

        # 5. FATAL (Severity 50)
        # Bold/Highlighted Red. Indicates system halt condition
        if self.step_count >= 10:
            self.get_logger().fatal(
                '[FATAL] HARDWARE SAFETY INTERLOCK ENGAGED: EMERGENCY RELAY TRIPPED!'
            )
            self.timer.cancel()
            self.get_logger().info('Timer stopped following FATAL event simulation.')


from rclpy.executors import ExternalShutdownException


def main(args=None):
    rclpy.init(args=args)
    node = LoggerLevelsDemo()

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
