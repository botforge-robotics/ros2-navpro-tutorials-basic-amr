#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 1 Student Task
Package: navpro_basics
Task:    task_teleop_speed_limiter.py
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a safety-critical teleoperation supervisor node
that intercepts raw user commands, scales them based on power mode and battery
charge, and outputs safe velocity setpoints to the robot's motor controllers.

OBJECTIVES:
-----------
1. Declare parameters:
   - 'speed_scale_factor' (float, default: 0.8)
   - 'low_battery_threshold' (float, default: 20.0)
2. Create Publisher on topic `/cmd_vel` (`geometry_msgs/msg/Twist`, queue: 10).
3. Create Subscribers:
   - Topic `/input/cmd_vel` (`geometry_msgs/msg/Twist`, callback: `self.on_cmd_vel`)
   - Topic `/battery_voltage` (`std_msgs/msg/Float32`, callback: `self.on_battery`)
4. Create Service Server on `/set_speed_mode` (`std_srvs/srv/SetBool`).
5. In `on_battery`:
   - Cache battery percentage and print a warning if below threshold.
6. In `on_cmd_vel`:
   - Calculate effective speed multiplier:
     - Turbo mode (True) -> 1.0
     - Eco mode (False)  -> self.scale_factor
     - If battery < low_battery_threshold: reduce speed by another 50% (x 0.5)
   - Scale linear.x, linear.y, angular.z and publish to `/cmd_vel`.
7. In `handle_speed_mode`:
   - Toggle turbo mode state based on request.data and return success message.
================================================================================
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32
from std_srvs.srv import SetBool


class TeleopSpeedLimiter(Node):
    """
    Student Task Node: Supervised Teleoperation Velocity Scaler.
    """

    def __init__(self):
        super().__init__('teleop_speed_limiter')
        self.get_logger().info('Initializing TeleopSpeedLimiter student task node...')

        # ----------------------------------------------------------------------
        # TODO 1: Declare ROS 2 Parameters
        # ----------------------------------------------------------------------
        # Declare 'speed_scale_factor' (default 0.8) and 'low_battery_threshold' (default 20.0)
        # Store their resolved values into self.scale_factor and self.low_bat_thresh
        # HINT: self.declare_parameter('name', default_value)
        #       self.get_parameter('name').value
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        self.scale_factor = 0.8
        self.low_bat_thresh = 20.0

        # Internal operational states
        self.current_battery_pct = 100.0  # Assumes full battery until telemetry arrives
        self.turbo_mode = False           # Defaults to eco mode for safety

        # ----------------------------------------------------------------------
        # TODO 2: Create Velocity Publisher
        # ----------------------------------------------------------------------
        # Topic: '/cmd_vel' | Message Type: Twist | QoS History Depth: 10
        # HINT: self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        # self.cmd_vel_pub = ...

        # ----------------------------------------------------------------------
        # TODO 3: Create Topic Subscriptions
        # ----------------------------------------------------------------------
        # 1. '/input/cmd_vel' (Twist) -> triggers self.on_cmd_vel
        # 2. '/battery_voltage' (Float32) -> triggers self.on_battery
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        # self.cmd_vel_sub = ...
        # self.battery_sub = ...

        # ----------------------------------------------------------------------
        # TODO 4: Create Service Server
        # ----------------------------------------------------------------------
        # Service: '/set_speed_mode' (SetBool) -> handled by self.handle_speed_mode
        # HINT: self.create_service(SetBool, '/set_speed_mode', self.handle_speed_mode)
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        # self.speed_mode_srv = ...

    def on_battery(self, msg: Float32):
        """
        TODO 5: Battery Telemetry Callback
        ----------------------------------
        - Store msg.data into self.current_battery_pct
        - If self.current_battery_pct < self.low_bat_thresh:
          log a warning: self.get_logger().warn(...)
        """
        # TODO: STUDENT CODE HERE
        pass

    def on_cmd_vel(self, msg: Twist):
        """
        TODO 6: Velocity Command Interception & Scaling Callback
        --------------------------------------------------------
        1. Base multiplier: 1.0 if self.turbo_mode else self.scale_factor
        2. If self.current_battery_pct < self.low_bat_thresh:
           cut multiplier in half (multiplier *= 0.5)
        3. Create new Twist message:
           out_msg.linear.x = msg.linear.x * multiplier
           out_msg.angular.z = msg.angular.z * multiplier
        4. Publish to self.cmd_vel_pub
        """
        # TODO: STUDENT CODE HERE
        pass

    def handle_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        """
        TODO 7: Speed Mode Service Handler
        -----------------------------------
        - Set self.turbo_mode = request.data
        - response.success = True
        - response.message = "Turbo enabled" or "Eco enabled"
        - Return response
        """
        # TODO: STUDENT CODE HERE
        return response


def main(args=None):
    """
    Standard ROS 2 Python entry point.
    """
    rclpy.init(args=args)
    node = TeleopSpeedLimiter()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping TeleopSpeedLimiter...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
