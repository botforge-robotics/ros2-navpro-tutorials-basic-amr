#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_basics
Node:    param_node_explained.py
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
from rclpy.node import Node
from rcl_interfaces.msg import ParameterDescriptor, ParameterType, SetParametersResult


class ParamExplainedNode(Node):
    """
    Demonstrates parameter declaration, validation, and dynamic updates
    via the on_set_parameters callback.
    """

    def __init__(self):
        super().__init__('param_explained_node')

        # ----------------------------------------------------------------------
        # 1. PARAMETER DECLARATIONS WITH FORMAL DESCRIPTORS
        # ----------------------------------------------------------------------
        # Parameter 1: Simple string parameter identifying the AMR unit
        self.declare_parameter(
            'robot_id',
            'navpro_01',
            ParameterDescriptor(description='Unique serial ID or fleet designation of the mobile robot')
        )

        # Parameter 2: Integer control loop frequency in Hertz
        self.declare_parameter(
            'control_rate_hz',
            20,
            ParameterDescriptor(description='Control loop execution frequency in Hertz (bounded 1 to 100)')
        )

        # Parameter 3: Float obstacle proximity threshold in meters
        self.declare_parameter(
            'obstacle_distance_threshold',
            0.45,
            ParameterDescriptor(description='Minimum allowed safety distance (meters) before emergency stop engages')
        )

        # ----------------------------------------------------------------------
        # 2. CACHING VALUES INTO LOCAL MEMBER VARIABLES
        # ----------------------------------------------------------------------
        self.robot_id = self.get_parameter('robot_id').value
        self.rate_hz = self.get_parameter('control_rate_hz').value
        self.obstacle_thresh = self.get_parameter('obstacle_distance_threshold').value

        # ----------------------------------------------------------------------
        # 3. REGISTER DYNAMIC PARAMETER CHANGE CALLBACK
        # ----------------------------------------------------------------------
        # Whenever an external process (e.g. `ros2 param set /param_explained_node control_rate_hz 50`)
        # attempts to update parameters, ROS 2 invokes this callback BEFORE applying changes.
        self.add_on_set_parameters_callback(self.parameter_update_callback)

        self.get_logger().info(
            f"Param Node Initialized | ID: '{self.robot_id}' | Loop Rate: {self.rate_hz} Hz | "
            f"Brake Threshold: {self.obstacle_thresh:.2f} m"
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
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Terminating param node...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
