#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 05 Reference Solution
Package: nexus_amr_basics
Node:    m01_l05_07_solution_turtle_square.py (alias: square_turtle, solution_turtle_square)
================================================================================

MISSION OVERVIEW:
-----------------
Reference solution for the Lesson 05 hands-on student challenge:
Commands Turtlesim to drive in a continuous, autonomous square patrol path.

Topics Used:
- Output: `/turtle1/cmd_vel` (`geometry_msgs/msg/Twist`) at 10 Hz

Kinematic Sequence:
- Leg 1: Drive Straight (linear.x = 2.0 m/s) for 2.0s
- Turn 1: 90° CCW Turn (angular.z = 1.5708 rad/s) for 1.0s
- Leg 2, Turn 2, Leg 3, Turn 3, Leg 4, Turn 4 -> Loops indefinitely
================================================================================
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist


class TurtleSquareController(Node):
    """
    Autonomous Square Motion Controller for Turtlesim.
    """

    STATE_FORWARD = 0
    STATE_TURN = 1

    def __init__(self):
        super().__init__('turtle_square_controller')
        self.get_logger().info('Initializing TurtleSquareController...')

        # 1. Create Publisher for velocity commands
        self.cmd_vel_pub = self.create_publisher(Twist, '/turtle1/cmd_vel', 10)

        # 2. Controller State & Timing Parameters
        self.state = self.STATE_FORWARD
        self.state_elapsed_time = 0.0

        # Motion Durations (seconds)
        self.forward_duration = 2.0  # Drive forward for 2.0s
        self.turn_duration = 1.0     # Turn 90° for 1.0s

        # Velocities
        self.linear_speed = 2.0      # 2.0 m/s
        self.angular_speed = 1.5708  # pi / 2 rad/s = 90 deg/sec

        # 3. Create 10 Hz Control Loop Timer
        self.timer_period = 0.1      # 100 ms (10 Hz)
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        self.side_count = 0
        self.get_logger().info('TurtleSquareController running! Driving side 1 of square...')

    def timer_callback(self):
        """
        10 Hz control loop: updates timer, executes state machine transitions,
        and publishes Twist velocity commands.
        """
        self.state_elapsed_time += self.timer_period
        cmd = Twist()

        if self.state == self.STATE_FORWARD:
            # Drive straight
            cmd.linear.x = self.linear_speed
            cmd.angular.z = 0.0

            if self.state_elapsed_time >= self.forward_duration:
                self.side_count += 1
                self.get_logger().info(f'Side {self.side_count} complete. Initiating 90° left turn...')
                self.state = self.STATE_TURN
                self.state_elapsed_time = 0.0

        elif self.state == self.STATE_TURN:
            # Turn 90 degrees CCW
            cmd.linear.x = 0.0
            cmd.angular.z = self.angular_speed

            if self.state_elapsed_time >= self.turn_duration:
                self.get_logger().info('Turn complete. Resuming straight drive...')
                self.state = self.STATE_FORWARD
                self.state_elapsed_time = 0.0

        # Publish the computed velocity to Turtlesim
        self.cmd_vel_pub.publish(cmd)


def main(args=None):
    rclpy.init(args=args)
    node = TurtleSquareController()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('Stopping turtle controller (Ctrl+C received)...')
    finally:
        # Emergency stop: publish zero velocity command so the turtle halts
        stop_cmd = Twist()
        stop_cmd.linear.x = 0.0
        stop_cmd.angular.z = 0.0
        node.cmd_vel_pub.publish(stop_cmd)
        node.get_logger().info('Zero-velocity halt published. Shutting down node.')
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
