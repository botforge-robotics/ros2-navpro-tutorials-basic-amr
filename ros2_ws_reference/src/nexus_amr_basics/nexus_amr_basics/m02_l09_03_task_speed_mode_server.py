#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 09 Task
Package: nexus_amr_basics
Task:    m02_l09_03_task_speed_mode_server.py (alias: task_speed_mode_server)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to implement an AMR Speed Governor Service Server utilizing our
custom interface: `nexus_amr_interfaces/srv/SetSpeedMode.srv`.

INTERFACE SCHEMA:
-----------------
string mode_name          # "TURBO", "NORMAL", "ECO", or "CUSTOM"
float32 custom_scale      # Used if mode_name == "CUSTOM" (0.1 to 1.0)
---
bool success
string message
float32 effective_scale

OBJECTIVES:
-----------
1. Import `SetSpeedMode` from `nexus_amr_interfaces.srv`.
2. TODO 1: Create a Service Server on '/amr/set_speed_mode' with callback `handle_speed_mode`.
3. TODO 2: In `handle_speed_mode`, parse `request.mode_name`:
   - "TURBO"  -> scale = 1.0
   - "NORMAL" -> scale = 0.7
   - "ECO"    -> scale = 0.35
   - "CUSTOM" -> scale = clamp(request.custom_scale, 0.1, 1.0)
4. TODO 3: Populate `response.success = True`, `response.effective_scale = scale`,
   and `response.message = f"Applied speed mode: {mode_name} ({scale * 100:.0f}%)"`.
5. TODO 4: Return response and log service execution.
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

        # ======================================================================
        # TODO 1: Create service on '/amr/set_speed_mode'
        # - Hint: Call self.create_service() specifying the service interface class, service endpoint name, and request callback.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.get_logger().info('SpeedModeServiceServer ready on /amr/set_speed_mode.')

    def handle_speed_mode(self, request, response):
        mode = request.mode_name.upper().strip()

        # ======================================================================
        # TODO 2: Evaluate mode and compute scale
        # - Map standard modes (TURBO, NORMAL, ECO) to appropriate scale fractions.
        # - For CUSTOM mode, clamp request.custom_scale to a valid range [0.1, 1.0].
        # - Handle invalid modes by setting response.success to False and returning early.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 3: Set response fields
        # - Assign success boolean, computed scale float, and confirmation message to response attributes.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Log transition and return response
        # ======================================================================
        # ---> YOUR CODE HERE <---
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
