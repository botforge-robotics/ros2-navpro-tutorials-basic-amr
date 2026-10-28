#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 4 / Lesson 20 Task
Package: nexus_amr_basics
Task:    m04_l20_01_task_controller_tuner.py (alias: task_controller_tuner)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a Trajectory Tracking Error & Velocity Governor
Monitor to inspect how well the Nav2 DWB / RPP controller follows planned paths.

OBJECTIVES:
-----------
1. TODO 1: Subscribe to `/plan` (nav_msgs/msg/Path) from global planner.
2. TODO 2: Subscribe to `/cmd_vel` (geometry_msgs/msg/Twist) from local controller.
3. TODO 3: In `plan_callback`, record total planned waypoints and final goal position.
4. TODO 4: In 2 Hz evaluation loop, log tracking metrics: commanded speed vs path complexity.
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from nav_msgs.msg import Path
from geometry_msgs.msg import Twist


class ControllerTunerMonitor(Node):

    def __init__(self):
        super().__init__('controller_tuner_monitor')

        self.path_points_count = 0
        self.cmd_linear_x = 0.0
        self.cmd_angular_z = 0.0

        # ======================================================================
        # TODO 1: Subscribe to '/plan' (Path)
        # - Hint: Call self.create_subscription() for Path messages on '/plan'.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 2: Subscribe to '/cmd_vel' (Twist)
        # - Hint: Call self.create_subscription() for Twist messages on '/cmd_vel'.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.timer = self.create_timer(1.0, self.report_tracking_metrics)
        self.get_logger().info('ControllerTunerMonitor active on /plan and /cmd_vel...')

    def plan_callback(self, msg: Path):
        # ======================================================================
        # TODO 3: Record number of poses in the global plan
        # - Hint: Count the number of waypoint poses in msg.poses and store in self.path_points_count.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass

    def cmd_vel_callback(self, msg: Twist):
        self.cmd_linear_x = msg.linear.x
        self.cmd_angular_z = msg.angular.z

    def report_tracking_metrics(self):
        # ======================================================================
        # TODO 4: Log tracking telemetry
        # - Hint: Format and emit an informational log with current plan length, linear speed, and angular yaw rate.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


def main(args=None):
    rclpy.init(args=args)
    node = ControllerTunerMonitor()

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
