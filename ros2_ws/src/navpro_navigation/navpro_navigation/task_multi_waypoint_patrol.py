#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 3 Student Task
Autonomous Multi-Waypoint Inspection Patrol with Nav2 Simple Commander

TODO Instructions:
1. Initialize BasicNavigator and waitUntilNav2Active().
2. Define sequential waypoints (A, B, C) in the map frame.
3. For each waypoint: command robot using navigator.goToPose(), monitor remaining distance, enforce timeout.
4. Return and dock at Home pose (0, 0, 0).
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_goal_pose(navigator: BasicNavigator, x: float, y: float, yaw: float) -> PoseStamped:
    pose = PoseStamped()
    pose.header.frame_id = 'map'
    pose.header.stamp = navigator.get_clock().now().to_msg()
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.orientation.z = math.sin(yaw / 2.0)
    pose.pose.orientation.w = math.cos(yaw / 2.0)
    return pose


def main():
    rclpy.init()

    # TODO 1: Initialize navigator and wait for Nav2 to activate
    navigator = BasicNavigator()
    # TODO: FILL IN CODE HERE

    waypoints = [
        (1.5, 0.5, 0.0, "Checkpoint Alpha"),
        (2.0, 2.0, 1.57, "Checkpoint Bravo"),
        (0.5, 1.8, 3.14, "Checkpoint Charlie"),
    ]

    # TODO 2: Loop through waypoints, call goToPose(), loop while not isTaskComplete(), check timeout
    # TODO: FILL IN CODE HERE

    # TODO 3: Navigate back to Home Pose (0, 0, 0)
    # TODO: FILL IN CODE HERE

    rclpy.shutdown()


if __name__ == '__main__':
    main()
