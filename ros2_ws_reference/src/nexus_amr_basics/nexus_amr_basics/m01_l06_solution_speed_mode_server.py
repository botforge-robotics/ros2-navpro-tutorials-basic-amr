#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 06 Reference Solution
Package: nexus_amr_basics
Task:    m02_l07_solution_speed_mode_server.py (alias: solution_speed_mode_server)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Reference Solution: AMR Operational Speed Mode & Zone Dispatch Service Server.
Autonomous Mobile Robots (AMRs) in smart warehouses operate across distinct zones:
- 'TURBO'  -> 1.00 (100% velocity: 1.5 m/s, high-clearance express transit corridors)
- 'NORMAL' -> 0.70 (70% velocity: 1.0 m/s, standard production inventory aisles)
- 'ECO'    -> 0.35 (35% velocity: 0.5 m/s, high-density human picking areas)
- 'CUSTOM' -> User-defined scale clamped safely between [0.10, 1.00]

This server validates incoming requests defensively and replies with confirmed scale.
================================================================================
"""

import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import SetSpeedMode


class SpeedModeSolutionServer(Node):
    """
    Reference Solution: AMR Speed Mode Configuration Server
    """

    def __init__(self):
        # Step 1: Initialize node identity in computational graph
        super().__init__('speed_mode_server')

        # Internal state machine: defaults to 70% normal operation
        self.current_scale = 0.70
        self.active_mode = 'NORMAL'

        # Step 2: Create Service Server on '/amr/set_speed_mode'
        # - Interface: SetSpeedMode (custom .srv with request and response fields)
        # - Service Endpoint: '/amr/set_speed_mode'
        # - Callback: self.handle_speed_mode
        self.srv = self.create_service(
            SetSpeedMode,
            '/amr/set_speed_mode',
            self.handle_speed_mode
        )

        self.get_logger().info(
            f'SpeedModeSolutionServer active on /amr/set_speed_mode. Default: {self.active_mode} ({self.current_scale * 100:.0f}%).'
        )

    def handle_speed_mode(self, request, response):
        """
        Processes zone dispatch requests and adjusts vehicle speed governors.
        """
        # Step 3: Sanitize incoming mode string
        mode = request.mode_name.upper().strip()

        # Step 4: Evaluate requested mode against permitted envelopes
        if mode == 'TURBO':
            scale = 1.00
        elif mode == 'NORMAL':
            scale = 0.70
        elif mode == 'ECO':
            scale = 0.35
        elif mode == 'CUSTOM':
            # Defensively clamp custom scale between 10% and 100%
            scale = max(0.10, min(1.00, float(request.custom_scale)))
        else:
            # Reject invalid mode without crashing the node
            response.success = False
            response.effective_scale = self.current_scale
            response.message = f"Invalid mode '{mode}'. Permitted: TURBO, NORMAL, ECO, CUSTOM"
            self.get_logger().warn(f'[REJECTED] {response.message}')
            return response

        # Step 5: Latch validated speed state
        self.current_scale = scale
        self.active_mode = mode

        # Step 6: Formulate confirmed response
        response.success = True
        response.effective_scale = float(scale)
        response.message = f"Speed mode '{mode}' applied successfully (scale: {scale * 100:.0f}%)."

        self.get_logger().info(f'[SPEED MODE] {response.message}')
        return response


def main(args=None):
    rclpy.init(args=args)
    node = SpeedModeSolutionServer()
    try:
        # Blocks in SingleThreadedExecutor event loop, servicing RPC calls
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        # Clean teardown
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
