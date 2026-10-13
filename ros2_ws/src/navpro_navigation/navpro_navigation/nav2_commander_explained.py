#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 3
Explanation: Nav2 Simple Commander API
Package: navpro_navigation
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_pose_stamped(navigator: BasicNavigator, x: float, y: float, yaw: float) -> PoseStamped:
    """Helper to create a timestamped 2D Pose in the 'map' coordinate frame."""
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
    navigator = BasicNavigator()

    navigator.get_logger().info('Initializing Nav2 Simple Commander...')

    # 1. Set initial pose for AMCL localization (origin of warehouse)
    initial_pose = create_pose_stamped(navigator, x=0.0, y=0.0, yaw=0.0)
    navigator.setInitialPose(initial_pose)

    navigator.get_logger().info('Waiting for Nav2 lifecycle nodes to become active...')
    navigator.waitUntilNav2Active()
    navigator.get_logger().info('Nav2 is active and ready for navigation missions!')

    # 2. Define navigation inspection goal
    goal_pose = create_pose_stamped(navigator, x=2.0, y=1.0, yaw=1.57)
    navigator.get_logger().info(f'Navigating to goal: x={goal_pose.pose.position.x}, y={goal_pose.pose.position.y}')

    # Send goal asynchronously
    navigator.goToPose(goal_pose)

    # 3. Monitor execution in non-blocking loop
    start_time = time.time()
    while not navigator.isTaskComplete():
        feedback = navigator.getFeedback()
        if feedback:
            dist = feedback.distance_remaining
            eta = feedback.estimated_time_remaining
            navigator.get_logger().info(
                f'Distance remaining: {dist:.2f} m | Estimated time: {eta.sec} s'
            )

        # Timeout guard (60 seconds)
        if time.time() - start_time > 60.0:
            navigator.get_logger().warn('Goal timed out! Canceling navigation...')
            navigator.cancelTask()
            break

        time.sleep(1.0)

    # 4. Check final result
    result = navigator.getResult()
    if result == TaskResult.SUCCEEDED:
        navigator.get_logger().info('Goal reached successfully!')
    elif result == TaskResult.CANCELED:
        navigator.get_logger().warn('Goal was canceled.')
    elif result == TaskResult.FAILED:
        navigator.get_logger().error('Goal navigation failed.')

    rclpy.shutdown()


if __name__ == '__main__':
    main()
