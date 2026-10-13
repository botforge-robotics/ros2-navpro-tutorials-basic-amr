#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 3 Student Task
Package: navpro_navigation
Task:    task_multi_waypoint_patrol.py
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to program an autonomous inspection patrol route for the AMR
using the Nav2 Simple Commander API. The robot must visit a sequence of three
warehouse stations, inspect each location, and return autonomously to home dock.

PATROL WAYPOINTS (map frame):
-----------------------------
1. Checkpoint Alpha   : x=1.5m, y=0.5m, yaw=0.0 rad
2. Checkpoint Bravo   : x=2.0m, y=2.0m, yaw=1.57 rad (90 deg)
3. Checkpoint Charlie : x=0.5m, y=1.8m, yaw=3.14 rad (180 deg)
4. Home Base Dock     : x=0.0m, y=0.0m, yaw=0.0 rad

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
    # 1. Instantiate navigator = BasicNavigator()
    # 2. Call navigator.waitUntilNav2Active()
    # --------------------------------------------------------------------------
    navigator = BasicNavigator()
    # TODO: STUDENT CODE HERE

    waypoints = [
        (1.5, 0.5, 0.0, "Checkpoint Alpha"),
        (2.0, 2.0, 1.57, "Checkpoint Bravo"),
        (0.5, 1.8, 3.14, "Checkpoint Charlie"),
    ]

    # --------------------------------------------------------------------------
    # TODO 2: Loop Through Waypoints and Monitor Autonomous Execution
    # --------------------------------------------------------------------------
    # For each waypoint in waypoints:
    # 1. goal = create_goal_pose(navigator, x, y, yaw)
    # 2. navigator.goToPose(goal)
    # 3. while not navigator.isTaskComplete():
    #      feedback = navigator.getFeedback()
    #      time.sleep(1.0)
    # 4. Check if navigator.getResult() == TaskResult.SUCCEEDED
    # --------------------------------------------------------------------------
    # TODO: STUDENT CODE HERE

    # --------------------------------------------------------------------------
    # TODO 3: Return to Home Dock (x=0.0, y=0.0, yaw=0.0)
    # --------------------------------------------------------------------------
    # 1. dock_goal = create_goal_pose(navigator, 0.0, 0.0, 0.0)
    # 2. navigator.goToPose(dock_goal)
    # 3. Wait until complete
    # --------------------------------------------------------------------------
    # TODO: STUDENT CODE HERE

    rclpy.shutdown()


if __name__ == '__main__':
    main()
