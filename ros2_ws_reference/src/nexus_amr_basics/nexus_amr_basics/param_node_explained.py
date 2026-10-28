#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 08
Package: nexus_amr_basics
Node:    param_node_explained.py (alias: m02_l08_02_param_node_explained)
================================================================================

WHAT THIS NODE DOES:
--------------------
This is an educational reference implementation demonstrating ROS 2 Parameter
Descriptors, strict parameter validation, and atomic parameter updates at runtime.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Parameter Descriptors: Documenting parameters directly inside the node so
   running `ros2 param describe <node> <param>` prints human-readable descriptions
   and type hints to developers.
2. Parameter Types: Strictly enforcing types (Integer, Double, String) to avoid
   runtime type casting exceptions in control loops.
3. Guardrails & Rejection: Dynamically rejecting invalid parameter values
   (e.g., negative frequencies or dangerous braking distances) before they
   compromise robot safety.
4. Periodic Heartbeat Diagnostics: Reporting parameter-controlled state in a
   timed non-blocking loop.
================================================================================
"""

import rclpy
from rclpy.executors import ExternalShutdownException
from rclpy.node import Node
from rcl_interfaces.msg import ParameterDescriptor, ParameterType, SetParametersResult


class ParamExplainedNode(Node):
    """
    Demonstrates parameter declaration, validation, and dynamic updates
    via the on_set_parameters callback.
    """

    def __init__(self):
        super().__init__('parameterized_controller')

        # ----------------------------------------------------------------------
        # 1. PARAMETER DECLARATIONS WITH FORMAL DESCRIPTORS
        # ----------------------------------------------------------------------
        # Parameter 1: Simple string parameter identifying the AMR unit
        self.declare_parameter(
            'robot_id',
            'nexus-wh-01',
            ParameterDescriptor(description='Unique serial ID or fleet designation of the mobile robot')
        )

        # Parameter 2: Maximum linear velocity limit (m/s)
        self.declare_parameter(
            'max_linear_speed',
            0.75,
            ParameterDescriptor(description='Maximum allowable linear velocity in meters/second (0.1 to 2.0)')
        )

        # Parameter 3: Proximity brake safety flag
        self.declare_parameter(
            'enable_proximity_brake',
            True,
            ParameterDescriptor(description='Safety interlock enabling automatic proximity braking')
        )

        # Parameter 4: Integer control loop frequency in Hertz
        self.declare_parameter(
            'control_rate_hz',
            20,
            ParameterDescriptor(description='Control loop execution frequency in Hertz (bounded 1 to 100)')
        )

        # Parameter 5: Float obstacle proximity threshold in meters
        self.declare_parameter(
            'obstacle_distance_threshold',
            0.45,
            ParameterDescriptor(description='Minimum allowed safety distance (meters) before emergency stop engages')
        )

        # ----------------------------------------------------------------------
        # 2. CACHING VALUES INTO LOCAL MEMBER VARIABLES
        # ----------------------------------------------------------------------
        self.robot_id = self.get_parameter('robot_id').value
        self.max_linear_speed = self.get_parameter('max_linear_speed').value
        self.enable_proximity_brake = self.get_parameter('enable_proximity_brake').value
        self.rate_hz = self.get_parameter('control_rate_hz').value
        self.obstacle_thresh = self.get_parameter('obstacle_distance_threshold').value

        # ----------------------------------------------------------------------
        # 3. REGISTER DYNAMIC PARAMETER CHANGE CALLBACK
        # ----------------------------------------------------------------------
        self.add_on_set_parameters_callback(self.parameter_update_callback)

        self.get_logger().info(
            f"Param Node Initialized | ID: '{self.robot_id}' | Max Speed: {self.max_linear_speed} m/s | "
            f"Brake: {self.enable_proximity_brake} | Rate: {self.rate_hz} Hz"
        )

        # ----------------------------------------------------------------------
        # 4. CREATE TIMER LOOP USING CONFIGURED RATE
        # ----------------------------------------------------------------------
        # Timer period = 1.0 / rate_hz (seconds)
        self.timer = self.create_timer(1.0 / self.rate_hz, self.loop_callback)
        self.loop_ticks = 0

    def parameter_update_callback(self, params):
        """
        Validates incoming parameter change requests before accepting them into the node state.

        Parameters:
            params (List[Parameter]): The batch of parameters being modified.

        Returns:
            SetParametersResult: Indicates success=True/False and explains rejection reasons.
        """
        for param in params:
            # Validate control_rate_hz
            if param.name == 'control_rate_hz':
                if param.type_ != ParameterType.PARAMETER_INTEGER or param.value < 1 or param.value > 100:
                    self.get_logger().error(f"Rejected invalid control_rate_hz: {param.value}. Must be integer [1..100].")
                    return SetParametersResult(
                        successful=False,
                        reason="control_rate_hz must be an integer between 1 and 100"
                    )
                self.rate_hz = param.value
                self.get_logger().info(f"Dynamically updated control_rate_hz to {self.rate_hz} Hz")

            # Validate obstacle_distance_threshold
            elif param.name == 'obstacle_distance_threshold':
                # Enforce physical sensor limit: cannot brake on < 0.05m
                if param.value <= 0.05:
                    self.get_logger().error(f"Rejected unsafe obstacle threshold: {param.value} m.")
                    return SetParametersResult(
                        successful=False,
                        reason="obstacle_distance_threshold must be strictly greater than 0.05m"
                    )
                self.obstacle_thresh = float(param.value)
                self.get_logger().info(f"Dynamically updated obstacle_distance_threshold to {self.obstacle_thresh:.2f} m")

            # Validate max_linear_speed
            elif param.name == 'max_linear_speed':
                if float(param.value) <= 0.0 or float(param.value) > 2.0:
                    self.get_logger().error(f"Rejected invalid max_linear_speed: {param.value}. Must be in range (0.0, 2.0].")
                    return SetParametersResult(
                        successful=False,
                        reason="max_linear_speed must be between 0.0 and 2.0 m/s"
                    )
                self.max_linear_speed = float(param.value)
                self.get_logger().info(f"Dynamically updated max_linear_speed to {self.max_linear_speed:.2f} m/s")

            # Validate enable_proximity_brake
            elif param.name == 'enable_proximity_brake':
                self.enable_proximity_brake = bool(param.value)
                self.get_logger().info(f"Dynamically updated enable_proximity_brake to {self.enable_proximity_brake}")

            # Validate robot_id
            elif param.name == 'robot_id':
                if len(str(param.value).strip()) == 0:
                    return SetParametersResult(successful=False, reason="robot_id cannot be empty")
                self.robot_id = str(param.value)
                self.get_logger().info(f"Dynamically updated robot_id to '{self.robot_id}'")

        return SetParametersResult(successful=True, reason="All requested parameters updated successfully")

    def loop_callback(self):
        """
        Periodic operational callback executed at self.rate_hz.
        Prints a diagnostic heartbeat every 5 seconds.
        """
        self.loop_ticks += 1
        # Log every 5 seconds: rate_hz * 5 ticks
        if self.loop_ticks % (self.rate_hz * 5) == 0:
            self.get_logger().info(
                f"[Heartbeat] Fleet Unit: {self.robot_id} | Safety Margin: {self.obstacle_thresh:.2f} m | "
                f"Active Rate: {self.rate_hz} Hz"
            )


def main(args=None):
    """
    Node entry point.
    """
    rclpy.init(args=args)
    node = ParamExplainedNode()
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
