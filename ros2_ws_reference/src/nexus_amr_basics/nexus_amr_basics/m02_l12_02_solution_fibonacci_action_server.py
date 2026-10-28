#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 11 Solution
Package: nexus_amr_basics
Task:    m02_l12_02_solution_fibonacci_action_server.py (alias: solution_navigate_action)
================================================================================
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from nexus_amr_interfaces.action import NavigateDistance


class NavigateDistanceSolutionServer(Node):
    """
    Reference Solution: AMR Linear Navigation Action Server
    """

    def __init__(self):
        super().__init__('navigate_distance_server')

        self._action_server = ActionServer(
            self,
            NavigateDistance,
            '/navigate_distance',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )

        self.get_logger().info('NavigateDistanceSolutionServer active on /navigate_distance.')

    def goal_callback(self, goal_request):
        if goal_request.target_distance_m <= 0.0 or goal_request.max_speed_mps <= 0.0:
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        target = goal_handle.request.target_distance_m
        speed = min(2.0, max(0.1, goal_handle.request.max_speed_mps))

        feedback_msg = NavigateDistance.Feedback()
        distance_travelled = 0.0
        dt = 0.1

        while distance_travelled < target:
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                result = NavigateDistance.Result()
                result.reached_target = False
                result.actual_distance_travelled_m = float(round(distance_travelled, 3))
                result.status_message = 'Navigation preempted by cancel request.'
                return result

            step = speed * dt
            distance_travelled = min(target, distance_travelled + step)

            feedback_msg.distance_remaining_m = float(round(target - distance_travelled, 3))
            feedback_msg.current_speed_mps = float(round(speed, 2))
            feedback_msg.percent_complete = float(round((distance_travelled / target) * 100.0, 1))

            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info(
                f'[TRAVERSAL FEEDBACK] Progress: {feedback_msg.percent_complete:5.1f}% | Rem: {feedback_msg.distance_remaining_m:5.2f} m'
            )

            time.sleep(dt)

        goal_handle.succeed()
        result = NavigateDistance.Result()
        result.reached_target = True
        result.actual_distance_travelled_m = float(round(distance_travelled, 3))
        result.status_message = f'Target distance of {target:.2f} m reached.'
        return result


def main(args=None):
    rclpy.init(args=args)
    node = NavigateDistanceSolutionServer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
