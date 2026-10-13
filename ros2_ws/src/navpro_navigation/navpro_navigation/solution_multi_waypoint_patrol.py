#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 3
REFERENCE SOLUTION: Multi-Waypoint Autonomous Patrol Loop with Nav2 Simple Commander
Package: navpro_navigation
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_goal_pose(navigator: BasicNavigator, x: float, y: float, yaw: float) -> PoseStamped:
    """Helper to create a timestamped PoseStamped message in the 'map' frame."""
    pose = PoseStamped()
    pose.header.frame_id = 'map'
    pose.header.stamp = navigator.get_clock().now().to_msg()
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.position.z = 0.0

    pose.pose.orientation.x = 0.0
    pose.pose.orientation.y = 0.0
    pose.pose.orientation.z = math.sin(yaw / 2.0)
    pose.pose.orientation.w = math.cos(yaw / 2.0)
    return pose


def main():
    rclpy.init()

    # 1. Initialize navigator and wait for Nav2 to activate
    navigator = BasicNavigator()
    navigator.get_logger().info('Waiting for Nav2 lifecycle nodes to become active...')
    navigator.waitUntilNav2Active()
    navigator.get_logger().info('Nav2 is active! Commencing autonomous warehouse patrol.')

    # 2. Checkpoints list
    waypoints = [
        ("Station Alpha", 1.5, 0.5, 0.0),
        ("Storage Bay Bravo", 2.0, 2.0, 1.57),
        ("Inspection Point Charlie", 0.5, 1.8, 3.14),
    ]

    # 3. Patrol Loop
    for name, x, y, yaw in waypoints:
        goal_pose = create_goal_pose(navigator, x, y, yaw)
        navigator.get_logger().info(f'Navigating to {name} at ({x}, {y})...')
        navigator.goToPose(goal_pose)

        start_time = time.time()
        while not navigator.isTaskComplete():
            feedback = navigator.getFeedback()
            if feedback:
                dist = feedback.distance_remaining
                navigator.get_logger().info(f'[{name}] Remaining distance: {dist:.2f} m')

            # Per-waypoint safety timeout (45 seconds)
            if time.time() - start_time > 45.0:
                navigator.get_logger().warn(f'Navigation to {name} timed out! Canceling...')
                navigator.cancelTask()
                break

            time.sleep(1.0)

        result = navigator.getResult()
        if result == TaskResult.SUCCEEDED:
            navigator.get_logger().info(f'Successfully reached {name}! Performing inspection scan...')
            time.sleep(2.0)
        else:
            navigator.get_logger().error(f'Failed to reach {name}. Aborting patrol!')
            break

    # 4. Return to Dock
    navigator.get_logger().info('Patrol mission completed! Returning to Docking Station...')
    dock_pose = create_goal_pose(navigator, 0.0, 0.0, 0.0)
    navigator.goToPose(dock_pose)
    while not navigator.isTaskComplete():
        time.sleep(1.0)

    if navigator.getResult() == TaskResult.SUCCEEDED:
        navigator.get_logger().info('Safely docked at home charging station.')

    rclpy.shutdown()


if __name__ == '__main__':
    main()
