#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 3 Reference Solution
Package: navpro_navigation
Node:    solution_multi_waypoint_patrol.py
================================================================================

WHAT THIS REFERENCE SOLUTION DEMONSTRATES:
------------------------------------------
A production-grade autonomous warehouse patrol mission using the Nav2 Simple
Commander Python API.

KEY ARCHITECTURAL ELEMENTS:
---------------------------
1. Lifecycle Synchronization:
   - Blocks cleanly with `waitUntilNav2Active()` to ensure costmaps, footprint
     publishers, trajectory planners, and motor controllers are responsive.
2. Sequential Patrol State Machine:
   - Traverses a structured list of inspection waypoints.
   - Dispatches each pose asynchronously via `goToPose()`.
   - Polls distance remaining and time elapsed.
   - Enforces a 45-second timeout watchdog per station.
3. Autonomous Recovery / Abort Logic:
   - Detects failures or cancellations and aborts gracefully instead of hanging.
4. Auto-Return to Charging Dock:
   - Automatically navigates back to base coordinate (0, 0, 0) upon completing
     all inspection stops.
================================================================================
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_goal_pose(navigator: BasicNavigator, x: float, y: float, yaw: float) -> PoseStamped:
    """
    Constructs a timestamped PoseStamped message in the global 'map' frame.

    Parameters:
        navigator: Active BasicNavigator instance.
        x: Target X position (meters).
        y: Target Y position (meters).
        yaw: Target heading angle (radians).

    Returns:
        PoseStamped: Target coordinate setpoint for the Nav2 planner.
    """
    pose = PoseStamped()
    pose.header.frame_id = 'map'
    pose.header.stamp = navigator.get_clock().now().to_msg()
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.position.z = 0.0

    # Convert Euler yaw to quaternion
    pose.pose.orientation.x = 0.0
    pose.pose.orientation.y = 0.0
    pose.pose.orientation.z = math.sin(yaw / 2.0)
    pose.pose.orientation.w = math.cos(yaw / 2.0)
    return pose


def main():
    """
    Executes the multi-station warehouse patrol routine.
    """
    rclpy.init()

    # --------------------------------------------------------------------------
    # 1. INITIALIZE NAVIGATOR & VERIFY LIFECYCLE STATE
    # --------------------------------------------------------------------------
    navigator = BasicNavigator()
    navigator.get_logger().info('Waiting for Nav2 lifecycle nodes to become active...')
    navigator.waitUntilNav2Active()
    navigator.get_logger().info('Nav2 is active! Commencing autonomous warehouse patrol.')

    # --------------------------------------------------------------------------
    # 2. DEFINED CHECKPOINT PATROL ROUTE
    # --------------------------------------------------------------------------
    # (Station Label, X position, Y position, Yaw orientation)
    waypoints = [
        ("Station Alpha", 1.5, 0.5, 0.0),
        ("Storage Bay Bravo", 2.0, 2.0, 1.57),
        ("Inspection Point Charlie", 0.5, 1.8, 3.14),
    ]

    # --------------------------------------------------------------------------
    # 3. WAYPOINT PATROL ITERATION LOOP
    # --------------------------------------------------------------------------
    for name, x, y, yaw in waypoints:
        goal_pose = create_goal_pose(navigator, x, y, yaw)
        navigator.get_logger().info(f'Navigating to {name} at ({x:.2f}, {y:.2f})...')

        # Send action goal to Nav2 Behavior Tree Navigator
        navigator.goToPose(goal_pose)

        # Monitor execution progress with non-blocking feedback
        start_time = time.time()
        while not navigator.isTaskComplete():
            feedback = navigator.getFeedback()
            if feedback:
                dist = feedback.distance_remaining
                navigator.get_logger().info(f'[{name}] Remaining distance: {dist:.2f} m')

            # Per-waypoint safety timeout watchdog (45 seconds)
            if time.time() - start_time > 45.0:
                navigator.get_logger().warn(f'Navigation to {name} timed out! Canceling...')
                navigator.cancelTask()
                break

            time.sleep(1.0)

        # Check navigation outcome
        result = navigator.getResult()
        if result == TaskResult.SUCCEEDED:
            navigator.get_logger().info(f'Successfully reached {name}! Performing inspection scan...')
            time.sleep(2.0)  # Pause for inspection sensor sweep
        else:
            navigator.get_logger().error(f'Failed to reach {name} (Result: {result}). Aborting patrol!')
            break

    # --------------------------------------------------------------------------
    # 4. RETURN TO CHARGING DOCK
    # --------------------------------------------------------------------------
    navigator.get_logger().info('Patrol mission completed! Returning to Docking Station...')
    dock_pose = create_goal_pose(navigator, 0.0, 0.0, 0.0)
    navigator.goToPose(dock_pose)

    while not navigator.isTaskComplete():
        time.sleep(1.0)

    if navigator.getResult() == TaskResult.SUCCEEDED:
        navigator.get_logger().info('Safely docked at home charging station. Mission complete!')

    rclpy.shutdown()


if __name__ == '__main__':
    main()
