#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 10 Task
Package: nexus_amr_basics
Task:    m02_l10_01_task_dynamic_safety_params.py (alias: task_dynamic_safety_params)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a runtime safety governor node using ROS 2 Dynamic
Parameters with validation callbacks.

OBJECTIVES:
-----------
1. TODO 1: Declare the following node parameters in __init__:
   - 'max_linear_velocity' (float, default: 0.5 m/s)
   - 'safety_stop_distance' (float, default: 0.4 m)
   - 'robot_name' (string, default: 'Nexus AMR_AMR')
2. TODO 2: Register a parameter change validation callback using:
   `self.add_on_set_parameters_callback(self.param_change_callback)`
3. TODO 3: In `param_change_callback`:
   - Enforce constraints:
     * max_linear_velocity must be in range [0.1, 2.0] m/s
     * safety_stop_distance must be in range [0.2, 1.5] m
   - If values violate limits, set `result.successful = False` and reject change.
4. TODO 4: In 1.0 Hz timer, read parameter values and log current configuration.
================================================================================
"""

import rclpy
from rclpy.node import Node
from rcl_interfaces.msg import SetParametersResult
from rclpy.executors import ExternalShutdownException


class DynamicSafetyParamsNode(Node):

    def __init__(self):
        super().__init__('dynamic_safety_params_node')

        # ======================================================================
        # TODO 1: Declare parameters with defaults
        # - Declare parameters with default values: 'max_linear_velocity' (0.5), 'safety_stop_distance' (0.4), and 'robot_name' ('Nexus AMR_AMR').
        # - Hint: Use self.declare_parameter(name, default_value).
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 2: Register dynamic parameter validation callback
        # - Hint: Register the parameter listener method using self.add_on_set_parameters_callback().
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.timer = self.create_timer(1.0, self.timer_callback)
        self.get_logger().info('DynamicSafetyParamsNode started with dynamic validation callback.')

    def param_change_callback(self, params):
        result = SetParametersResult()
        result.successful = True
        result.reason = 'Parameters updated successfully.'

        # ======================================================================
        # TODO 3: Validate incoming parameter changes
        # - Hint: Iterate through incoming Parameter objects. Reject changes if
        #   'max_linear_velocity' is outside [0.1, 2.0] m/s or 'safety_stop_distance'
        #   is outside [0.2, 1.5] m by setting result.successful = False with a reason.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        return result

    def timer_callback(self):
        # ======================================================================
        # TODO 4: Read and log current parameters
        # - Read parameters using self.get_parameter(name).value and log an informational status summary.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


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
