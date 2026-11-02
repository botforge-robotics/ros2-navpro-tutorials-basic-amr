#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 07 Student Challenge
Package: nexus_amr_basics
Task:    m02_l07_task_speed_mode_server.py (alias: task_speed_mode_server)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Autonomous Mobile Robots (AMRs) in smart warehouses operate across distinct zones:
- 'TURBO'  -> 1.00 (100% velocity: 1.5 m/s, high-clearance express transit corridors)
- 'NORMAL' -> 0.70 (70% velocity: 1.0 m/s, standard production inventory aisles)
- 'ECO'    -> 0.35 (35% velocity: 0.5 m/s, high-density human picking areas)
- 'CUSTOM' -> User-defined scale clamped safely between [0.10, 1.00]

Your mission is to construct an authoritative ROS 2 Service Server that receives
zone speed configuration requests from the Fleet Management System (FMS),
validates the requested mode against robot motor capabilities, updates internal
speed limits, and returns a verified confirmation receipt.

INTERFACE SPECIFICATION (`nexus_amr_interfaces/srv/SetSpeedMode.srv`):
-------------------------------------------------------------------
Request:
    string mode_name          # "TURBO", "NORMAL", "ECO", or "CUSTOM"
    float32 custom_scale      # Used if mode_name == "CUSTOM" (0.10 to 1.00)
---
Response:
    bool success              # True if mode accepted; False if invalid
    string message            # Diagnostic execution status
    float32 effective_scale   # Active velocity scale applied to actuators
================================================================================
"""

import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import SetSpeedMode


class SpeedModeServerTask(Node):
    """
    Student Starter Template: AMR Operational Speed Mode Service Server
    """

    def __init__(self):
        # Step 1: Initialize the node name
        super().__init__('speed_mode_server')

        # Internal speed state machine: defaults to 70% NORMAL operation
        self.current_scale = 0.70
        self.active_mode = 'NORMAL'

        # ======================================================================
        # TODO 1: Create the ROS 2 Service Server
        # - Interface Type:    SetSpeedMode (from nexus_amr_interfaces.srv)
        # - Service Endpoint:  '/amr/set_speed_mode'
        # - Callback Method:   self.handle_speed_mode
        #
        # Hint: Use self.create_service(InterfaceType, 'service_name', callback)
        # ======================================================================
        self.srv = None  # ---> REPLACE WITH YOUR CODE HERE <---

        self.get_logger().info(
            f'SpeedModeServerTask initialized in {self.active_mode} mode ({self.current_scale * 100:.0f}%). '
            'Awaiting /amr/set_speed_mode requests...'
        )

    def handle_speed_mode(self, request, response):
        """
        Callback executed whenever a client calls '/amr/set_speed_mode'.
        Arguments:
        - request: Contains request.mode_name and request.custom_scale
        - response: The SetSpeedMode.Response object to populate and return
        """
        # Step 2: Sanitize the incoming mode string (strip whitespace, uppercase)
        mode = request.mode_name.upper().strip()

        # ======================================================================
        # TODO 2: Validate Mode & Calculate Operational Velocity Scale
        #
        # Requirements:
        # 1. If mode == 'TURBO':  set scale = 1.00
        # 2. If mode == 'NORMAL': set scale = 0.70
        # 3. If mode == 'ECO':    set scale = 0.35
        # 4. If mode == 'CUSTOM':
        #    Clamp request.custom_scale safely between 0.10 (min) and 1.00 (max)
        #    Hint: max(0.10, min(1.00, float(request.custom_scale)))
        # 5. If mode is unrecognized (e.g. 'HYPERSPEED'):
        #    - Set response.success = False
        #    - Set response.effective_scale = self.current_scale (unchanged)
        #    - Set response.message = f"Invalid mode '{mode}'. Permitted: TURBO, NORMAL, ECO, CUSTOM"
        #    - Log a warning via self.get_logger().warn(...)
        #    - Return response immediately!
        # ======================================================================
        scale = None  # ---> YOUR MODE EVALUATION LOGIC HERE <---

        # ======================================================================
        # TODO 3: Update Internal Node State
        # - Save the validated scale to self.current_scale
        # - Save the validated mode to self.active_mode
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Populate Response Fields & Log Operational Confirmation
        # - Set response.success = True
        # - Set response.effective_scale = float(scale)
        # - Set response.message = f"Speed mode '{mode}' applied successfully (scale: {scale * 100:.0f}%)."
        # - Log an info message via self.get_logger().info(...)
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # In ROS 2 service callbacks, ALWAYS return the response object!
        return response


def main(args=None):
    rclpy.init(args=args)
    node = SpeedModeServerTask()

    try:
        # Spin keeps the node alive to service client requests
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        # Clean teardown
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
