#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Day 3 Student Task
Package: nexus_amr_navigation
Task:    task_multi_waypoint_patrol.py
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to program an autonomous inspection patrol route for the AMR
using the Nav2 Simple Commander API. The robot must visit a sequence of three
warehouse stations, inspect each location, and return autonomously to home station.

PATROL WAYPOINTS (map frame):
-----------------------------
1. Checkpoint Alpha   : x=1.5m, y=0.5m, yaw=0.0 rad
2. Checkpoint Bravo   : x=2.0m, y=2.0m, yaw=1.57 rad (90 deg)
3. Checkpoint Charlie : x=0.5m, y=1.8m, yaw=3.14 rad (180 deg)
4. Home Base Station     : x=0.0m, y=0.0m, yaw=0.0 rad

OBJECTIVES:
-----------
1. Initialize BasicNavigator and ensure all Nav2 nodes are active.
2. Iterate through each checkpoint:
   - Command robot using `navigator.goToPose(goal_pose)`.
   - Poll feedback while `not navigator.isTaskComplete()`.
   - Implement a per-checkpoint timeout (e.g., 45 seconds).
   - If reached, log success and pause 2 seconds for sensor inspection.
3. Once all stations are visited, dispatch a final goal to return to (0, 0, 0).
================================================================================
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_goal_pose(navigator: BasicNavigator, x: float, y: float, yaw: float) -> PoseStamped:
    """
    Helper function: Creates a stamped pose in the 'map' frame.
    """
    pose = PoseStamped()
    pose.header.frame_id = 'map'
    pose.header.stamp = navigator.get_clock().now().to_msg()
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.position.z = 0.0
    # Planar quaternion from yaw
    pose.pose.orientation.z = math.sin(yaw / 2.0)
    pose.pose.orientation.w = math.cos(yaw / 2.0)
    return pose


def main():
    """
    Student Task: Multi-Waypoint Autonomous Patrol Loop.
    """
    rclpy.init()

    # --------------------------------------------------------------------------
    # TODO 1: Initialize Navigator and Wait for Nav2 Lifecycle
    # --------------------------------------------------------------------------
    # - Hint: Instantiate BasicNavigator() and wait for Nav2 lifecycle startup using navigator.waitUntilNav2Active().
    # --------------------------------------------------------------------------
    navigator = BasicNavigator()
    # TODO: STUDENT CODE HERE

    waypoints = [
        (2.0, 1.0, 0.0, "Staging Area Entrance"),
        (4.5, -2.0, 1.57, "Storage Rack Aisle B"),
        (1.0, -3.5, 3.14, "Inspection Bay"),
    ]

    # --------------------------------------------------------------------------
    # TODO 2: Loop Through Waypoints and Monitor Autonomous Execution
    # --------------------------------------------------------------------------
    # - Hint: Convert each waypoint tuple into a PoseStamped using create_goal_pose(). Dispatch navigation via goToPose(), monitor execution until task completes, and verify TaskResult.SUCCEEDED.
    # --------------------------------------------------------------------------
    # TODO: STUDENT CODE HERE

    # --------------------------------------------------------------------------
    # TODO 3: Return to Home Station (x=0.0, y=0.0, yaw=0.0)
    # --------------------------------------------------------------------------
    # - Hint: Create a final goal at home coordinates (0.0, 0.0, 0.0) and dispatch navigator.goToPose(home_goal) to return to base.
    # --------------------------------------------------------------------------
    # TODO: STUDENT CODE HERE

    rclpy.shutdown()


if __name__ == '__main__':
    main()
