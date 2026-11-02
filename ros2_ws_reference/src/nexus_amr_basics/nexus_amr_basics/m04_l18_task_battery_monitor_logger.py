#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 06
Package: nexus_amr_basics
Node:    TaskBatteryMonitorLogger (task_battery_logger)
================================================================================

STUDENT CHALLENGE SPECIFICATION:
--------------------------------
You are developing the onboard power telemetry supervisor for an Autonomous
Mobile Robot (AMR). The node runs a 10 Hz control loop (dt = 0.1s).
The battery percentage begins at 100.0% and discharges by 0.25% per tick.

YOUR OBJECTIVES (Look for TODO markers below):
---------------------------------------------
1. TODO 1: Implement an INFO heartbeat message throttled to once every 1.5 seconds
           when the battery is healthy (> 20.0%).
2. TODO 2: When battery drops <= 20.0%, issue a WARN message throttled to once
           every 2.0 seconds alerting of low power.
3. TODO 3: When battery drops <= 10.0%, issue an ERROR message ONCE (once=True)
           commanding an immediate autonomous abort & reroute to home station.
4. TODO 4: When battery reaches 0.0%, issue a FATAL message, cancel the timer,
           and shut down the node.

HOW TO RUN YOUR CODE:
---------------------
ros2 run nexus_amr_basics task_battery_logger

TESTING WITH LOG LEVELS:
------------------------
# Normal run:
ros2 run nexus_amr_basics task_battery_logger

# Suppress INFO (watch only warnings, errors, and fatal):
ros2 run nexus_amr_basics task_battery_logger --ros-args --log-level warn
================================================================================
"""

import rclpy
from rclpy.node import Node


class BatteryMonitorLogger(Node):
    """
    Supervises robot battery state and demonstrates severity filtering & throttling.
    """

    def __init__(self):
        super().__init__('battery_monitor_logger')

        self.battery_pct = 100.0   # Initial state of charge (100%)
        self.discharge_rate = 0.5   # 0.5% discharge per loop tick for simulation speed

        # 10 Hz timer (dt = 0.1s)
        self.timer_period = 0.1
        self.timer = self.create_timer(self.timer_period, self.monitor_callback)

        self.get_logger().info('BatteryMonitorLogger supervisor initialized at 10 Hz.')

    def monitor_callback(self):
        # Simulate discharge
        self.battery_pct = max(0.0, self.battery_pct - self.discharge_rate)

        # ======================================================================
        # TODO 1: Log an INFO heartbeat message showing the current battery %
        # - Condition: battery_pct > 20.0
        # - Must use: throttle_duration_sec=1.5 so it does NOT flood the console!
        # ======================================================================
        # Hint: Check battery_pct > 20.0 and emit an info log using self.get_logger().info() with throttle_duration_sec=1.5 to rate-limit console output.
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 2: Log a WARN message when battery is low
        # - Condition: 10.0 < battery_pct <= 20.0
        # - Must use: throttle_duration_sec=2.0
        # ======================================================================
        # Hint: Check the battery range (10.0 < battery_pct <= 20.0) and log a warning via self.get_logger().warn() with throttle_duration_sec=2.0.
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 3: Log an ERROR message ONCE when battery enters critical zone
        # - Condition: 0.0 < battery_pct <= 10.0
        # - Must use: once=True so it prints exactly once when threshold is crossed!
        # ======================================================================
        # Hint: Check the critical range (0.0 < battery_pct <= 10.0) and emit an error log via self.get_logger().error() setting once=True to trigger exactly once.
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Log a FATAL message when battery is completely exhausted
        # - Condition: self.battery_pct <= 0.0
        # - Log a fatal emergency message
        # - Cancel the timer: self.timer.cancel()
        # ======================================================================
        # Hint: Check battery_pct <= 0.0, emit a fatal log with self.get_logger().fatal(), and stop the timer with self.timer.cancel().
        # ---> YOUR CODE HERE <---


from rclpy.executors import ExternalShutdownException


def main(args=None):
    rclpy.init(args=args)
    node = BatteryMonitorLogger()

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
