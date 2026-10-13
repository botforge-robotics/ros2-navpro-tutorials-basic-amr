#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 3 Autonomous Navigation
Package: navpro_navigation
Node:    nav2_commander_explained.py
================================================================================

WHAT THIS NODE DOES:
--------------------
Demonstrates programmatic autonomous navigation using the Nav2 Simple Commander
Python API (`nav2_simple_commander.robot_navigator.BasicNavigator`).
It executes a complete autonomous inspection mission:
1. Initializes AMCL localization pose at the warehouse origin (0, 0, yaw=0).
2. Waits for all Nav2 managed lifecycle nodes to reach the `active` state.
3. Commands the robot to an inspection waypoint (x=2.0m, y=1.0m, yaw=1.57 rad).
4. Monitors non-blocking navigation execution:
   - Polls remaining distance to goal.
   - Polls estimated time of arrival (ETA).
   - Enforces an autonomous timeout failsafe.
5. Handles mission result status (SUCCEEDED, CANCELED, or FAILED).

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Action-Based Navigation: Under the hood, `goToPose` dispatches a ROS 2 Action Goal
   to the Nav2 Behavior Tree Navigator (`NavigateToPose`).
2. Lifecycle State Management: Nav2 nodes are managed by lifecycle state machines
   (Unconfigured -> Inactive -> Active -> Finalized). The commander waits until all
   nodes (BT Navigator, Planner Server, Controller Server, Costmaps) are fully Active.
3. Non-Blocking Feedback Loop: Rather than freezing execution, `isTaskComplete()`
   allows concurrent tasks (telemetry logging, collision monitoring, timeout checks).
================================================================================
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_pose_stamped(navigator: BasicNavigator, x: float, y: float, yaw: float) -> PoseStamped:
    """
    Constructs a timestamped 2D Pose target in the global 'map' coordinate frame.

    Parameters:
        navigator (BasicNavigator): Active navigator instance used to fetch the clock timestamp.
        x (float): Target X position in meters.
        y (float): Target Y position in meters.
        yaw (float): Target heading in radians (counter-clockwise from +X).

    Returns:
        PoseStamped: Fully populated geometry_msgs/msg/PoseStamped message.
    """
    pose = PoseStamped()
    # In autonomous navigation, global goals are ALWAYS defined in the 'map' frame
    pose.header.frame_id = 'map'
    pose.header.stamp = navigator.get_clock().now().to_msg()

    # Cartesian translation
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.position.z = 0.0  # Planar mobile robot constraint

    # Convert Euler yaw angle to 3D unit quaternion
    pose.pose.orientation.x = 0.0
    pose.pose.orientation.y = 0.0
    pose.pose.orientation.z = math.sin(yaw / 2.0)
    pose.pose.orientation.w = math.cos(yaw / 2.0)
    return pose


def main():
    """
    Executes the autonomous navigation mission.
    """
    # 1. Initialize ROS 2 client communications
    rclpy.init()

    # 2. Instantiate the Nav2 Simple Commander interface
    navigator = BasicNavigator()
    navigator.get_logger().info('Initializing Nav2 Simple Commander API...')

    # --------------------------------------------------------------------------
    # STEP 1: INITIALIZE POSE FOR AMCL LOCALIZATION
    # --------------------------------------------------------------------------
    # AMCL (Adaptive Monte Carlo Localization) requires an initial belief pose
    # to seed its particle filter distribution across the occupancy grid map.
    initial_pose = create_pose_stamped(navigator, x=0.0, y=0.0, yaw=0.0)
    navigator.setInitialPose(initial_pose)

    # --------------------------------------------------------------------------
    # STEP 2: WAIT FOR NAV2 SYSTEM READINESS
    # --------------------------------------------------------------------------
    # Nav2 uses ROS 2 Managed Nodes. Before dispatching goals, all servers must
    # transition to the 'active' state.
    navigator.get_logger().info('Waiting for Nav2 lifecycle servers (Planner, Controller, Recoveries)...')
    navigator.waitUntilNav2Active()
    navigator.get_logger().info('Nav2 is fully active and ready to accept navigation goals!')

    # --------------------------------------------------------------------------
    # STEP 3: DISPATCH NAVIGATION GOAL ASYNCHRONOUSLY
    # --------------------------------------------------------------------------
    # Target inspection pose: x=2.0m, y=1.0m, facing North (+Y, yaw=pi/2 = 1.57 rad)
    goal_pose = create_pose_stamped(navigator, x=2.0, y=1.0, yaw=1.57)
    navigator.get_logger().info(
        f'Dispatched goal setpoint -> X: {goal_pose.pose.position.x:.2f} m, '
        f'Y: {goal_pose.pose.position.y:.2f} m'
    )

    # goToPose sends the goal to the Nav2 Action Server without blocking this thread
    navigator.goToPose(goal_pose)

    # --------------------------------------------------------------------------
    # STEP 4: NON-BLOCKING EXECUTION MONITORING WITH FEEDBACK
    # --------------------------------------------------------------------------
    start_time = time.time()
    while not navigator.isTaskComplete():
        # Retrieve live feedback from the Nav2 action server
        feedback = navigator.getFeedback()
        if feedback:
            dist = feedback.distance_remaining
            eta = feedback.estimated_time_remaining
            navigator.get_logger().info(
                f'Navigating... Remaining Distance: {dist:.2f} m | Estimated Time: {eta.sec} s'
            )

        # Safety watchdog: abort if navigation takes longer than 60 seconds
        if time.time() - start_time > 60.0:
            navigator.get_logger().warn('Goal exceeded safety timeout (60s)! Canceling navigation...')
            navigator.cancelTask()
            break

        # Sleep briefly between feedback polling cycles
        time.sleep(1.0)

    # --------------------------------------------------------------------------
    # STEP 5: EVALUATE FINAL NAVIGATION RESULT
    # --------------------------------------------------------------------------
    result = navigator.getResult()
    if result == TaskResult.SUCCEEDED:
        navigator.get_logger().info('MISSION ACCOMPLISHED: Target inspection waypoint reached!')
    elif result == TaskResult.CANCELED:
        navigator.get_logger().warn('MISSION TERMINATED: Goal was canceled.')
    elif result == TaskResult.FAILED:
        navigator.get_logger().error('MISSION FAILED: Controller or planner failed to find valid path.')

    # Clean shutdown of ROS 2 context
    rclpy.shutdown()


if __name__ == '__main__':
    main()
