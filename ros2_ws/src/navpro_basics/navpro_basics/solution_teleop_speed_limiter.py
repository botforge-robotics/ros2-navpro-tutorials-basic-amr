#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 1 Reference Solution
Package: navpro_basics
Node:    solution_teleop_speed_limiter.py
================================================================================

WHAT THIS REFERENCE SOLUTION DEMONSTRATES:
------------------------------------------
1. Parameter Configuration:
   - 'speed_scale_factor' (0.8): Standard power scaling for warehouse operations.
   - 'low_battery_threshold' (20.0): Critical threshold in percent battery charge.
2. Interceptor Pattern:
   - Subscribes to raw input from manual joysticks / teleop on `/input/cmd_vel`.
   - Modulates the velocities mathematically according to safety state.
   - Publishes verified, rate-limited velocities to motor controllers on `/cmd_vel`.
3. Battery Failsafe:
   - Monitors state of charge on `/battery_voltage`.
   - Automatically drops power by 50% if battery falls below critical reserve.
4. Mode Switching Service:
   - Exposes `/set_speed_mode` (`SetBool`) so an operator or fleet coordinator
     can safely engage 100% Turbo power.
================================================================================
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32
from std_srvs.srv import SetBool


class SolutionTeleopSpeedLimiter(Node):
    """
    Complete reference solution for Day 1 Task.
    Students can inspect this implementation to see professional ROS 2 patterns.
    """

    def __init__(self):
        # Register node name with the ROS 2 computational graph
        super().__init__('teleop_speed_limiter')
        self.get_logger().info('Initializing SolutionTeleopSpeedLimiter reference node...')

        # ----------------------------------------------------------------------
        # 1. PARAMETER DECLARATIONS
        # ----------------------------------------------------------------------
        # Allows runtime overrides via launch files or `ros2 param set`
        self.declare_parameter('speed_scale_factor', 0.8)
        self.declare_parameter('low_battery_threshold', 20.0)

        # Retrieve parameter values into instance attributes
        self.scale_factor = self.get_parameter('speed_scale_factor').value
        self.low_bat_thresh = self.get_parameter('low_battery_threshold').value

        # Internal supervisory state
        self.current_battery_pct = 100.0   # Current battery percentage
        self.turbo_mode = False            # Turbo flag: True = 1.0 scale, False = scale_factor

        # ----------------------------------------------------------------------
        # 2. TOPIC INTERFACES (PUBLISHERS & SUBSCRIBERS)
        # ----------------------------------------------------------------------
        # Output publisher sending filtered commands to physical or simulated robot
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        # Input subscriber reading unfiltered teleop commands from joystick or keyboard
        self.cmd_vel_sub = self.create_subscription(
            Twist,
            '/input/cmd_vel',
            self.on_cmd_vel,
            10
        )

        # Telemetry subscriber monitoring battery level
        self.battery_sub = self.create_subscription(
            Float32,
            '/battery_voltage',
            self.on_battery,
            10
        )

        # ----------------------------------------------------------------------
        # 3. SERVICE SERVER FOR OPERATIONAL MODE
        # ----------------------------------------------------------------------
        # Allows an operator or autonomous coordinator to switch between Eco and Turbo
        self.mode_service = self.create_service(
            SetBool,
            '/set_speed_mode',
            self.on_set_speed_mode
        )

        self.get_logger().info(
            f'SolutionTeleopSpeedLimiter active! [Scale: {self.scale_factor * 100:.0f}%, '
            f'LowBat Threshold: {self.low_bat_thresh:.1f}%]'
        )

    def on_battery(self, msg: Float32):
        """
        Receives battery state of charge from the hardware BMS or mock publisher.
        Issues warning logs if capacity drops below the configured safety threshold.
        """
        self.current_battery_pct = msg.data

        # Check safety threshold
        if self.current_battery_pct < self.low_bat_thresh:
            self.get_logger().warn(
                f'LOW BATTERY WARNING: Battery at {self.current_battery_pct:.1f}% '
                f'(below threshold {self.low_bat_thresh:.1f}%). Speed reduced by 50%!',
                throttle_duration_sec=3.0  # Throttle to avoid flooding console
            )

    def on_cmd_vel(self, msg: Twist):
        """
        Supervises every incoming velocity setpoint before forwarding to the wheels.
        Applies power mode scaling and automatic battery-saving throttle.
        """
        # Step A: Choose base speed multiplier based on Turbo vs Eco mode
        multiplier = 1.0 if self.turbo_mode else self.scale_factor

        # Step B: Emergency power conservation: Halve speed if battery is depleted
        if self.current_battery_pct < self.low_bat_thresh:
            multiplier *= 0.5

        # Step C: Construct clean outgoing Twist message with scaled fields
        out_msg = Twist()
        out_msg.linear.x = msg.linear.x * multiplier
        out_msg.linear.y = msg.linear.y * multiplier
        out_msg.linear.z = 0.0  # Planar constraint

        out_msg.angular.x = 0.0
        out_msg.angular.y = 0.0
        out_msg.angular.z = msg.angular.z * multiplier

        # Step D: Publish supervised command
        self.cmd_vel_pub.publish(out_msg)

    def on_set_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        """
        Service callback allowing remote clients to toggle Turbo mode.
        """
        self.turbo_mode = request.data
        response.success = True

        mode_str = "TURBO (100% power)" if self.turbo_mode else f"ECO ({self.scale_factor * 100:.0f}% power)"
        response.message = f"Speed mode successfully set to: {mode_str}"
        self.get_logger().info(f'[Service Call] {response.message}')
        return response


def main(args=None):
    """
    Initializes ROS 2 executor and safely manages node lifetime.
    """
    rclpy.init(args=args)
    node = SolutionTeleopSpeedLimiter()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Shutting down SolutionTeleopSpeedLimiter...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
