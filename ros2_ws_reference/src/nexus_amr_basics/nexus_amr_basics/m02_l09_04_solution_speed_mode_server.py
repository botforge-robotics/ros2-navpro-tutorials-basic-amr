#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 09 Solution
Package: nexus_amr_basics
Task:    m02_l09_04_solution_speed_mode_server.py (alias: speed_mode_server)
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from nexus_amr_interfaces.srv import SetSpeedMode


class SpeedModeServiceServer(Node):

    def __init__(self):
        super().__init__('speed_mode_server')

        self.current_scale = 0.7
        self.active_mode = 'NORMAL'

        # Step 1: Create custom service server
        self.srv = self.create_service(
            SetSpeedMode,
            '/amr/set_speed_mode',
            self.handle_speed_mode
        )

        self.get_logger().info('SpeedModeServiceServer ready on /amr/set_speed_mode.')

    def handle_speed_mode(self, request, response):
        mode = request.mode_name.upper().strip()

        # Step 2: Validate mode and calculate speed scale
        if mode == 'TURBO':
            scale = 1.0
        elif mode == 'NORMAL':
            scale = 0.7
        elif mode == 'ECO':
            scale = 0.35
        elif mode == 'CUSTOM':
            scale = max(0.1, min(1.0, float(request.custom_scale)))
        else:
            response.success = False
            response.effective_scale = self.current_scale
            response.message = f"Invalid mode '{mode}'. Allowed: TURBO, NORMAL, ECO, CUSTOM"
            self.get_logger().warn(f'[REJECTED] {response.message}')
            return response

        # Step 3: Populate response
        self.current_scale = scale
        self.active_mode = mode

        response.success = True
        response.effective_scale = float(scale)
        response.message = f"Speed mode '{mode}' applied successfully (scale: {scale * 100:.0f}%)."

        # Step 4: Log and return
        self.get_logger().info(f'[SPEED MODE] {response.message}')
        return response


def main(args=None):
    rclpy.init(args=args)
    node = SpeedModeServiceServer()

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
