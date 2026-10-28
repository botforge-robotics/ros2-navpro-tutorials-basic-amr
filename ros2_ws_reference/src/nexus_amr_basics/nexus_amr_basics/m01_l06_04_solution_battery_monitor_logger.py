#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 06
Package: nexus_amr_basics
Node:    SolutionBatteryMonitorLogger (solution_battery_logger)
================================================================================

WHAT THIS SOLUTION DEMONSTRATES:
--------------------------------
1. Clean industrial logging hierarchy across multiple severity levels.
2. Throttled logging (throttle_duration_sec=1.5 and 2.0) preventing console flooding
   inside a fast 10 Hz timer loop.
3. One-shot logging (once=True) for critical threshold alerts without spam.
4. Clean termination on FATAL hardware shutdown events.

HOW TO RUN:
-----------
# Run with all levels visible:
ros2 run nexus_amr_basics solution_battery_logger

# Run filtering out INFO logs (watch only WARN, ERROR, FATAL):
ros2 run nexus_amr_basics solution_battery_logger --ros-args --log-level warn
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
        self.discharge_rate = 1.0   # 1.0% discharge per loop tick for clear visual progression

        # 10 Hz timer (dt = 0.1s)
        self.timer_period = 0.1
        self.timer = self.create_timer(self.timer_period, self.monitor_callback)

        self.get_logger().info('BatteryMonitorLogger supervisor initialized at 10 Hz.')

    def monitor_callback(self):
        # Simulate discharge
        self.battery_pct = max(0.0, self.battery_pct - self.discharge_rate)

        # 1. Healthy State (> 20%): Throttled INFO heartbeat every 1.5 seconds
        if self.battery_pct > 20.0:
            self.get_logger().info(
                f'Battery Status: {self.battery_pct:5.1f}% [HEALTHY] | Power draw: 4.2A',
                throttle_duration_sec=1.5
            )

        # 2. Low Battery Warning (10% < pct <= 20%): Throttled WARN every 2.0 seconds
        elif 10.0 < self.battery_pct <= 20.0:
            self.get_logger().warn(
                f'Battery Low: {self.battery_pct:5.1f}%! Rerouting to home base station.',
                throttle_duration_sec=2.0
            )

        # 3. Critical Battery Alert (0% < pct <= 10%): One-shot ERROR message
        elif 0.0 < self.battery_pct <= 10.0:
            self.get_logger().error(
                f'CRITICAL BATTERY: {self.battery_pct:5.1f}%! Aborting current mission immediately.',
                once=True
            )

        # 4. Depleted Battery (0%): FATAL emergency halt and shutdown
        else:
            self.get_logger().fatal(
                'BATTERY DEPLETED (0.0%): SYSTEM HARDWARE EMERGENCY HALT! Actuation disabled.'
            )
            self.timer.cancel()


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
