#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 13 Solution
Package: nexus_amr_basics
Task:    m02_l13_02_solution_patrol_action_server.py (alias: patrol_action_server)
================================================================================
"""

import time
import math
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer
from rclpy.executors import ExternalShutdownException
from nexus_amr_interfaces.action import Patrol


class PatrolActionServer(Node):

    def __init__(self):
        super().__init__('patrol_action_server')

        # Step 1: Initialize Action Server
        self._action_server = ActionServer(
            self,
            Patrol,
            'patrol',
            self.execute_patrol
        )
        self.get_logger().info('PatrolActionServer ready and awaiting multi-waypoint patrol goals.')

    def execute_patrol(self, goal_handle):
        waypoints = goal_handle.request.waypoints
        loop_count = goal_handle.request.loop_count
        self.get_logger().info(f'Starting patrol: {len(waypoints)} waypoints x {loop_count} loops.')

        feedback = Patrol.Feedback()
        total_dist = 0.0
        current_x = 0.0
        current_y = 0.0

        # Step 2 & 3: Iterate through patrol loops and waypoints with feedback
        for loop_idx in range(loop_count):
            self.get_logger().info(f'Starting patrol cycle #{loop_idx + 1}/{loop_count}')
            for wp_idx, wp in enumerate(waypoints):
                if goal_handle.is_cancel_requested:
                    goal_handle.canceled()
                    self.get_logger().warn('Patrol mission canceled by client.')
                    return Patrol.Result()

                # Calculate segment distance
                segment_dist = math.hypot(wp.x - current_x, wp.y - current_y)
                total_dist += segment_dist
                current_x = wp.x
                current_y = wp.y

                # Stream feedback
                feedback.current_waypoint_index = wp_idx + 1
                feedback.distance_to_target = float(segment_dist)
                feedback.estimated_time_remaining = float((len(waypoints) - wp_idx) * 1.5)

                self.get_logger().info(
                    f'Navigating to WP #{wp_idx + 1}: ({wp.x:.2f}, {wp.y:.2f}) | '
                    f'Dist: {segment_dist:.2f}m | Loop: {loop_idx + 1}/{loop_count}'
                )
                goal_handle.publish_feedback(feedback)
                time.sleep(0.5)

        # Step 4: Finalize Result
        goal_handle.succeed()
        result = Patrol.Result()
        result.success = True
        result.completed_loops = loop_count
        result.total_distance_traveled = float(total_dist)
        result.final_report = (
            f"Successfully navigated {len(waypoints)} checkpoints over {loop_count} loops. "
            f"Total distance: {total_dist:.2f} meters."
        )
        self.get_logger().info(f'[PATROL COMPLETE] {result.final_report}')
        return result


def main(args=None):
    rclpy.init(args=args)
    node = PatrolActionServer()

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
