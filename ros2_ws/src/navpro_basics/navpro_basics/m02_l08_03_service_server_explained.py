#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_basics
Node:    service_server_explained.py
================================================================================

WHAT THIS NODE DOES:
--------------------
This is an educational reference implementation of ROS 2 Service Servers and
Dynamic Parameters combined into a single managed node.
It provides two remote procedure call (RPC) services:
1. `/robot/set_autonomous_mode` (`std_srvs/srv/SetBool`):
   Allows a client to enable or disable autonomous navigation mode with feedback.
2. `/robot/get_status` (`std_srvs/srv/Trigger`):
   Returns a diagnostic telemetry snapshot of the robot state upon request.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Request-Response Synchrony: Unlike Topics (unidirectional continuous streaming),
   Services are bidirectional and synchronous. A client sends a request and
   awaits a structured response from the server.
2. Service Callback Signature: Service callbacks must always accept TWO arguments:
   `callback(request, response)` and MUST return the modified `response` object.
3. Node Parameter Declarations: Declaring parameters with default values at startup
   so external YAML configuration files or CLI tools can tune node settings.
4. Parameter Change Callbacks: Using `add_on_set_parameters_callback` to intercept,
   validate, and dynamically adopt parameter changes at runtime without restart.
================================================================================
"""

import rclpy
from rclpy.node import Node
from std_srvs.srv import SetBool, Trigger
from rcl_interfaces.msg import SetParametersResult


class ManagedRobotServiceNode(Node):
    """
    Demonstrates ROS 2 Service Servers and dynamic runtime parameter configuration.
    """

    def __init__(self):
        super().__init__('managed_robot_service_node')

        # ----------------------------------------------------------------------
        # 1. DECLARE AND RETRIEVE ROS 2 PARAMETERS
        # ----------------------------------------------------------------------
        # Parameters allow external configuration of node behavior without recompiling.
        # declare_parameter(parameter_name, default_value)
        self.declare_parameter('robot_name', 'NavPro-Mini')
        self.declare_parameter('max_speed', 0.5)           # meters per second
        self.declare_parameter('safety_margin', 0.35)      # meters

        # Read the initial parameter values configured at launch or defaults
        self.robot_name = self.get_parameter('robot_name').value
        self.max_speed = self.get_parameter('max_speed').value
        self.safety_margin = self.get_parameter('safety_margin').value

        # Register callback for dynamic parameter updates (e.g., via `ros2 param set`)
        # This function will be triggered whenever an external user or node changes a parameter.
        self.add_on_set_parameters_callback(self.on_param_change)

        # ----------------------------------------------------------------------
        # 2. CREATE SERVICE SERVERS
        # ----------------------------------------------------------------------
        # create_service(ServiceType, ServiceName, CallbackFunction)
        # Service 1: SetBool (Request: bool data; Response: bool success, string message)
        self.toggle_srv = self.create_service(
            SetBool,
            '/robot/set_autonomous_mode',
            self.handle_set_mode
        )

        # Service 2: Trigger (Request: empty; Response: bool success, string message)
        self.status_srv = self.create_service(
            Trigger,
            '/robot/get_status',
            self.handle_get_status
        )

        # Internal operational state variable
        self.autonomous_active = False

        self.get_logger().info(
            f'Managed Service Node ready for {self.robot_name} | '
            f'MaxSpeed: {self.max_speed} m/s | Margin: {self.safety_margin} m'
        )
        self.get_logger().info('Services: /robot/set_autonomous_mode, /robot/get_status')

    def on_param_change(self, params):
        """
        Validation hook invoked whenever parameters are modified at runtime.
        Returns SetParametersResult indicating whether to accept or reject the update.
        """
        for p in params:
            if p.name == 'max_speed':
                # Enforce safety guard: speed cannot be negative or exceed 2.0 m/s
                if p.value < 0.0 or p.value > 2.0:
                    self.get_logger().warn(f'Rejected invalid max_speed: {p.value}. Must be in [0.0, 2.0].')
                    return SetParametersResult(successful=False, reason="Speed outside safe limits")
                self.max_speed = p.value
                self.get_logger().info(f'Parameter max_speed updated dynamically to: {self.max_speed} m/s')

            elif p.name == 'safety_margin':
                if p.value < 0.1:
                    return SetParametersResult(successful=False, reason="Safety margin too small (< 0.1m)")
                self.safety_margin = p.value
                self.get_logger().info(f'Parameter safety_margin updated to: {self.safety_margin} m')

        return SetParametersResult(successful=True, reason="Parameters updated successfully")

    def handle_set_mode(self, request: SetBool.Request, response: SetBool.Response):
        """
        Service callback for /robot/set_autonomous_mode.
        Accepts request.data (True = enable, False = disable).
        Populates response.success and response.message, then returns the response.
        """
        # Adopt the requested boolean state
        self.autonomous_active = request.data

        # Build response payload
        response.success = True
        state_str = "ENABLED" if self.autonomous_active else "DISABLED"
        response.message = f"Autonomous navigation mode has been {state_str} for {self.robot_name}."

        self.get_logger().info(f'[Service Call] {response.message}')
        return response

    def handle_get_status(self, request: Trigger.Request, response: Trigger.Response):
        """
        Service callback for /robot/get_status.
        Trigger takes an empty request and returns state telemetry string.
        """
        response.success = True
        response.message = (
            f"Robot: {self.robot_name} | "
            f"Autonomous: {'ACTIVE' if self.autonomous_active else 'STANDBY'} | "
            f"MaxSpeed: {self.max_speed} m/s | "
            f"SafetyMargin: {self.safety_margin} m"
        )
        self.get_logger().info(f'[Status Request] Returning: {response.message}')
        return response


def main(args=None):
    """
    Standard node execution loop.
    """
    rclpy.init(args=args)
    node = ManagedRobotServiceNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping service node...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
