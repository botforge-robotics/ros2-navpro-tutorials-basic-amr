#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1 Student Task
Teleop Speed Limiter & Battery Supervisor Node

TODO Instructions:
1. Declare parameters: 'speed_scale_factor' (0.8) and 'low_battery_threshold' (20.0).
2. Subscribe to '/input/cmd_vel' (geometry_msgs/Twist) and '/battery_voltage' (std_msgs/Float32).
3. Scale velocity and publish to '/cmd_vel'. If battery < threshold, halve speed.
4. Expose Service '/set_speed_mode' (std_srvs/SetBool) to toggle turbo (1.0) / eco (0.5).
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32
from std_srvs.srv import SetBool


class TeleopSpeedLimiter(Node):

    def __init__(self):
        super().__init__('teleop_speed_limiter')
        self.get_logger().info('Initializing TeleopSpeedLimiter task node...')

        # TODO 1: Declare parameters 'speed_scale_factor' (default 0.8) and 'low_battery_threshold' (default 20.0)
        # Store them in self.scale_factor and self.low_bat_thresh
        # TODO: FILL IN CODE HERE
        self.scale_factor = 0.8
        self.low_bat_thresh = 20.0

        self.current_battery_pct = 100.0
        self.turbo_mode = False

        # TODO 2: Create publisher to '/cmd_vel' (Twist)
        # TODO: FILL IN CODE HERE
        # self.cmd_vel_pub = ...

        # TODO 3: Create subscriptions to '/input/cmd_vel' (Twist) and '/battery_voltage' (Float32)
        # TODO: FILL IN CODE HERE
        # self.cmd_vel_sub = ...
        # self.battery_sub = ...

        # TODO 4: Create service server for '/set_speed_mode' (SetBool)
        # TODO: FILL IN CODE HERE
        # self.speed_mode_srv = ...

    def on_battery(self, msg: Float32):
        # TODO 5: Store battery voltage and warn if below low_bat_thresh
        # TODO: FILL IN CODE HERE
        pass

    def on_cmd_vel(self, msg: Twist):
        # TODO 6: Calculate effective scale factor (turbo=1.0, low_battery=*0.5) and publish scaled Twist
        # TODO: FILL IN CODE HERE
        pass

    def handle_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        # TODO 7: Enable turbo if request.data is True, otherwise eco mode
        # TODO: FILL IN CODE HERE
        return response


def main(args=None):
    rclpy.init(args=args)
    node = TeleopSpeedLimiter()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
