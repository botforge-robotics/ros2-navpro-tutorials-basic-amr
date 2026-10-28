#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 07 Task
Package: nexus_amr_basics
Task:    m02_l07_01_task_status_publisher.py (alias: task_status_publisher)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a telemetry publisher utilizing our custom
compiled IDL interface: `nexus_amr_interfaces/msg/RobotStatus.msg`.

OBJECTIVES:
-----------
1. Import `RobotStatus` from `nexus_amr_interfaces.msg`.
2. TODO 1: Create a publisher for `RobotStatus` on topic `/robot/status` (QoS depth = 10).
3. TODO 2: Create a 1.0 Hz timer (period = 1.0s) triggering `self.publish_status`.
4. TODO 3: In `publish_status`, populate all fields:
   - robot_id: 'NAVPRO_AMR_01'
   - battery_percentage: starting at 100.0, decrementing by 0.2 each second
   - is_charging: False
   - emergency_stop_active: False
   - position.x, position.y, position.z: odometry coordinates
   - linear_velocity: 0.35 m/s, angular_velocity: 0.05 rad/s
5. TODO 4: Publish the telemetry packet and log a formatted status report.
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
        self.waypoint_count = 0
        self.pos_x = 0.0
        self.pos_y = 0.0

        # ======================================================================
        # TODO 1: Create publisher on topic '/robot/status' using RobotStatus msg
        # - Hint: Call self.create_publisher() with the custom RobotStatus message type, topic string, and queue depth.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 2: Create 1.0 Hz timer (period = 1.0s) calling self.publish_status
        # - Hint: Call self.create_timer() with 1.0s period and self.publish_status callback.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.get_logger().info('RobotStatusPublisher initialized on topic /robot/status at 1.0 Hz.')

    def publish_status(self):
        # Simulate slight movement and battery consumption
        self.battery_level = max(5.0, self.battery_level - 0.2)
        self.pos_x += 0.15
        self.pos_y += 0.05

        # ======================================================================
        # TODO 3: Construct and populate RobotStatus message
        # - Instantiate RobotStatus() and populate its metadata, battery percentage, charging state, Point position (x, y), and velocities.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Publish message and log summary
        # - Call publish() on your status publisher handle, and log a formatted status telemetry string.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


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
