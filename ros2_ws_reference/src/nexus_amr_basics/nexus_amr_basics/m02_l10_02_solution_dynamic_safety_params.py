#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 10 Solution
Package: nexus_amr_basics
Task:    m02_l10_02_solution_dynamic_safety_params.py (alias: dynamic_safety_params)
================================================================================
"""

import rclpy
from rclpy.node import Node
from rcl_interfaces.msg import SetParametersResult
from rclpy.executors import ExternalShutdownException


class DynamicSafetyParamsNode(Node):

    def __init__(self):
        super().__init__('dynamic_safety_params_node')

        # Step 1: Declare parameters
        self.declare_parameter('max_linear_velocity', 0.5)
        self.declare_parameter('safety_stop_distance', 0.4)
        self.declare_parameter('robot_name', 'Nexus AMR_AMR')

        # Step 2: Register validation callback
        self.add_on_set_parameters_callback(self.param_change_callback)

        self.timer = self.create_timer(1.0, self.timer_callback)
        self.get_logger().info('DynamicSafetyParamsNode started with dynamic validation callback.')

    def param_change_callback(self, params):
        result = SetParametersResult()
        result.successful = True
        result.reason = 'Parameters updated successfully.'

        # Step 3: Validate incoming parameters
        for param in params:
            if param.name == 'max_linear_velocity':
                val = float(param.value)
                if not (0.1 <= val <= 2.0):
                    result.successful = False
                    result.reason = (
                        f"Validation Error: max_linear_velocity ({val:.2f} m/s) "
                        f"exceeds safe limits [0.1, 2.0] m/s!"
                    )
                    self.get_logger().error(result.reason)
                    return result
            elif param.name == 'safety_stop_distance':
                val = float(param.value)
                if not (0.2 <= val <= 1.5):
                    result.successful = False
                    result.reason = (
                        f"Validation Error: safety_stop_distance ({val:.2f} m) "
                        f"must be in range [0.2, 1.5] m!"
                    )
                    self.get_logger().error(result.reason)
                    return result

        self.get_logger().info(f'[PARAM CHANGE ACCEPTED] {result.reason}')
        return result

    def timer_callback(self):
        # Step 4: Query active parameters and log
        max_v = self.get_parameter('max_linear_velocity').value
        stop_d = self.get_parameter('safety_stop_distance').value
        name = self.get_parameter('robot_name').value

        self.get_logger().info(
            f'[GOVERNOR STATUS] Robot: {name} | Max Vel: {max_v:.2f} m/s | Stop Dist: {stop_d:.2f} m'
        )


def main(args=None):
    rclpy.init(args=args)
    node = DynamicSafetyParamsNode()

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
