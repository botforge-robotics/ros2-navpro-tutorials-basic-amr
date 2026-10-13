#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1
REFERENCE SOLUTION: Teleop Velocity Scaler & Battery Monitor Node
Package: navpro_basics
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32
from std_srvs.srv import SetBool


class SolutionTeleopSpeedLimiter(Node):
    """
    Complete reference solution for Day 1 Task.
    Students can refer to this implementation if they encounter challenges.
    """

    def __init__(self):
        super().__init__('teleop_speed_limiter')
        self.get_logger().info('Initializing SolutionTeleopSpeedLimiter reference node...')

        # 1. Parameter Declarations
        self.declare_parameter('speed_scale_factor', 0.8)
        self.declare_parameter('low_battery_threshold', 20.0)
        self.scale_factor = self.get_parameter('speed_scale_factor').value
        self.low_bat_thresh = self.get_parameter('low_battery_threshold').value

        # Internal state
        self.current_battery_pct = 100.0
        self.turbo_mode = False

        # 2. Publishers and Subscribers
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.cmd_vel_sub = self.create_subscription(Twist, '/input/cmd_vel', self.on_cmd_vel, 10)
        self.battery_sub = self.create_subscription(Float32, '/battery_voltage', self.on_battery, 10)

        # 3. Service Server
        self.mode_service = self.create_service(SetBool, '/set_speed_mode', self.on_set_speed_mode)

        self.get_logger().info('SolutionTeleopSpeedLimiter active and ready.')

    def on_battery(self, msg: Float32):
        self.current_battery_pct = msg.data
        if self.current_battery_pct < self.low_bat_thresh:
            self.get_logger().warn(
                f'LOW BATTERY WARNING: {self.current_battery_pct:.1f}% below threshold {self.low_bat_thresh:.1f}%!'
            )

    def on_cmd_vel(self, msg: Twist):
        # Determine base multiplier
        multiplier = 1.0 if self.turbo_mode else self.scale_factor

        # Safety override: halve speed if low battery
        if self.current_battery_pct < self.low_bat_thresh:
            multiplier *= 0.5

        # Publish scaled velocity
        out_msg = Twist()
        out_msg.linear.x = msg.linear.x * multiplier
        out_msg.linear.y = msg.linear.y * multiplier
        out_msg.angular.z = msg.angular.z * multiplier
        self.cmd_vel_pub.publish(out_msg)

    def on_set_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        self.turbo_mode = request.data
        response.success = True
        mode_str = "TURBO (100% power)" if self.turbo_mode else f"ECO ({self.scale_factor * 100:.0f}% power)"
        response.message = f"Speed mode successfully set to: {mode_str}"
        self.get_logger().info(response.message)
        return response


def main(args=None):
    rclpy.init(args=args)
    node = SolutionTeleopSpeedLimiter()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
