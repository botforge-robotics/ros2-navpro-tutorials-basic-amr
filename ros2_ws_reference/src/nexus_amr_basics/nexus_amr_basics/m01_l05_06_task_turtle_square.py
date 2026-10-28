#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 05 Student Task
Package: nexus_amr_basics
Node:    m01_l05_06_task_turtle_square.py (alias: task_turtle_square)
================================================================================

MISSION OVERVIEW:
-----------------
In this hands-on challenge, you will implement an autonomous motion controller
for Turtlesim that commands the turtle to drive in a continuous, repeatable SQUARE!

Because you already understand ROS 2 interface types (specifically `geometry_msgs/msg/Twist`),
you will publish velocity setpoints to `/turtle1/cmd_vel` at 10 Hz.

GEOMETRY & KINEMATICS FOR A SQUARE:
-----------------------------------
A square consists of 4 straight edges and 4 ninety-degree turns:
1. DRIVE STRAIGHT:
   - linear.x = 2.0 m/s
   - angular.z = 0.0 rad/s
   - Duration = 2.0 seconds (distance traveled = 4.0 meters)
2. TURN 90 DEGREES LEFT:
   - linear.x = 0.0 m/s
   - angular.z = 1.5708 rad/s (π / 2 radians ≈ 90° per second)
   - Duration = 1.0 second (angle turned = 90°)
3. Repeat continuously across all 4 sides!

YOUR TASKS (LOOK FOR THE TODO TAGS):
------------------------------------
- TODO 1: Initialize the publisher on topic `/turtle1/cmd_vel` with type `Twist`.
- TODO 2: Create a periodic 10 Hz timer (period = 0.1s) calling `self.timer_callback`.
- TODO 3: Implement the two-state motion logic in `timer_callback`.
- TODO 4: Publish the constructed `Twist` message to `/turtle1/cmd_vel`.
================================================================================
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist


class TurtleSquareController(Node):
    """
    Student Task Node: Commands Turtlesim in an autonomous square path.
    """

    # State Machine Constants
    STATE_FORWARD = 0
    STATE_TURN = 1

    def __init__(self):
        super().__init__('turtle_square_controller')
        self.get_logger().info('Initializing TurtleSquareController...')

        # ----------------------------------------------------------------------
        # TODO 1: Initialize the Velocity Command Publisher
        #
        # Algorithmic Goal:
        #   Register a publisher endpoint on the robot motion topic so this node
        #   can stream velocity setpoints to Turtlesim.
        #
        # Specifications & Hints:
        #   - Message Type: Twist (from geometry_msgs.msg)
        #   - Topic Name: '/turtle1/cmd_vel'
        #   - QoS Queue Depth: 10 (ROS 2 Default QoS Profile)
        # ----------------------------------------------------------------------
        # >>> TODO: Assign self.cmd_vel_pub using create_publisher <<<
        self.cmd_vel_pub = None

        # Controller Timing & State tracking
        self.state = self.STATE_FORWARD
        self.state_elapsed_time = 0.0

        # Duration parameters (in seconds)
        self.forward_duration = 2.0  # seconds to drive forward
        self.turn_duration = 1.0     # seconds to turn 90 degrees

        # Velocities
        self.linear_speed = 2.0      # m/s forward speed
        self.angular_speed = 1.5708  # rad/s (pi / 2 = 90 deg/sec)

        # ----------------------------------------------------------------------
        # TODO 2: Create a periodic 10 Hz timer (dt = 0.1s)
        #
        # Algorithmic Goal:
        #   Periodic execution is essential for real-time robotic state machines.
        #   Register an asynchronous timer that invokes the control loop callback
        #   every 100 milliseconds without blocking the executor thread.
        #
        # Specifications & Hints:
        #   - Period: self.timer_period (0.100 seconds)
        #   - Callback: self.timer_callback
        # ----------------------------------------------------------------------
        self.timer_period = 0.1  # seconds (10 Hz)
        # >>> TODO: Assign self.timer using create_timer <<<
        self.timer = None

        self.get_logger().info('TurtleSquareController initialized. Waiting for student implementation...')

    def timer_callback(self):
        """
        Executed every 0.1 seconds (10 Hz).
        Updates state elapsed time, transitions state when duration is met,
        and publishes the corresponding velocity command to /turtle1/cmd_vel.
        """
        # Increment elapsed time in current state
        self.state_elapsed_time += self.timer_period

        # Instantiate a new empty Twist velocity message
        cmd = Twist()

        # ----------------------------------------------------------------------
        # TODO 3: Implement Two-State Finite State Machine (FSM) Logic
        #
        # ALGORITHMIC PSEUDOCODE:
        #   IF robot is currently in FORWARD state:
        #       1. Set forward linear velocity to the configured forward speed setpoint.
        #       2. Ensure angular steering velocity is set to zero (straight path).
        #       3. Check if accumulated state time has reached the forward duration:
        #          - Log that straight edge traversal is complete.
        #          - Switch state to the TURN state.
        #          - Reset state elapsed time accumulator back to 0.0.
        #
        #   ELSE IF robot is currently in TURN state:
        #       1. Ensure linear velocity is zero (in-place pivot).
        #       2. Set angular steering velocity to the configured turning speed setpoint.
        #       3. Check if accumulated state time has reached the turn duration:
        #          - Log that 90-degree turn is complete.
        #          - Switch state back to the FORWARD state.
        #          - Reset state elapsed time accumulator back to 0.0.
        #
        # CONCEPTUAL HINTS:
        #   - Compare state with: self.STATE_FORWARD and self.STATE_TURN
        #   - Update fields on the cmd object: linear.x and angular.z
        #   - Check elapsed time against: self.forward_duration and self.turn_duration
        #   - Use velocity constants: self.linear_speed and self.angular_speed
        #   - Log progress with: self.get_logger().info(...)
        # ----------------------------------------------------------------------
        # >>> TODO: WRITE YOUR STATE MACHINE CODE HERE <<<


        # ----------------------------------------------------------------------
        # TODO 4: Publish the velocity command
        #
        # ALGORITHMIC PSEUDOCODE:
        #   Verify that the publisher endpoint is initialized.
        #   If valid, publish the configured cmd message over DDS.
        #
        # HINT:
        #   Invoke the publish method on your publisher endpoint passing cmd.
        # ----------------------------------------------------------------------
        # >>> TODO: PUBLISH cmd HERE <<<


def main(args=None):
    rclpy.init(args=args)
    node = TurtleSquareController()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping turtle safely...')
    finally:
        # Publish a zero-velocity emergency stop so turtle doesn't keep moving
        if node.cmd_vel_pub is not None:
            stop_msg = Twist()
            stop_msg.linear.x = 0.0
            stop_msg.angular.z = 0.0
            node.cmd_vel_pub.publish(stop_msg)
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
