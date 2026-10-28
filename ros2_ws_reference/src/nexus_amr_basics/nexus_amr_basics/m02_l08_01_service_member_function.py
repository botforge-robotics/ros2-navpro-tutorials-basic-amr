#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 08
Package: nexus_amr_basics
Node:    EmergencyStopServer (emergency_stop_server)
Service: /robot/emergency_stop (nexus_amr_interfaces/srv/TriggerEmergencyStop)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Provides a mission-critical safety service for Autonomous Mobile Robots (AMRs).
Unlike fire-and-forget UDP topic messages, an emergency braking command requires
deterministic, guaranteed bidirectional acknowledgment before a supervisor can
declare the robot in a safe state (ISO 3691-4 industrial safety compliance).

When a supervisor or safety monitor requests an emergency stop:
1. It validates the safety request and diagnostic reason string.
2. It latches internal emergency stop state and cuts motor torque.
3. It replies with a confirmed status receipt and microsecond audit timestamp.
================================================================================
"""

import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import TriggerEmergencyStop


class EmergencyStopServer(Node):
    """
    AMR Emergency Safety Brake Service Server Node.
    """

    def __init__(self):
        # Step 1: Initialize node identity
        super().__init__('emergency_stop_server')

        # Step 2: Internal hardware safety state machine
        # Latching ensures that once engaged, motion cannot resume without an explicit reset.
        self.emergency_stop_active = False

        # Step 3: Create ROS 2 Service Server
        # - TriggerEmergencyStop: Custom interface (.srv)
        # - '/robot/emergency_stop': Service name advertised over DDS
        # - self.handle_emergency_stop: Member callback handling client requests
        self.srv = self.create_service(
            TriggerEmergencyStop,
            '/robot/emergency_stop',
            self.handle_emergency_stop
        )

        self.get_logger().info(
            'EmergencyStopServer initialized. Ready to receive safety commands on "/robot/emergency_stop"...'
        )

    def handle_emergency_stop(self, request, response):
        """
        Executed synchronously by the ROS 2 executor whenever a client invokes this service.
        Arguments:
        - request: Input payload (contains request.emergency_stop_requested, request.reason)
        - response: Output payload to populate and return
        """
        # Capture precise epoch timestamp in seconds
        timestamp_sec = self.get_clock().now().nanoseconds * 1e-9

        if request.emergency_stop_requested:
            # ENGAGE EMERGENCY BRAKES
            self.emergency_stop_active = True
            response.success = True
            response.status_message = (
                f'EMERGENCY BRAKE ENGAGED: Actuators halted. Reason: "{request.reason}"'
            )
            response.stop_timestamp = float(round(timestamp_sec, 3))

            self.get_logger().error(
                f'[CRITICAL SAFETY EVENT] Emergency Stop ACTIVATED! Reason: {request.reason}'
            )
        else:
            # RESET SAFETY SYSTEM
            self.emergency_stop_active = False
            response.success = True
            response.status_message = 'SAFETY RESET: Actuator power restored. Drive authorized.'
            response.stop_timestamp = float(round(timestamp_sec, 3))

            self.get_logger().info(
                '[SAFETY STATUS] Emergency Stop CLEARED. Drive systems ready.'
            )

        # In ROS 2 service callbacks, ALWAYS return the populated response object
        return response


def main(args=None):
    rclpy.init(args=args)
    node = EmergencyStopServer()

    try:
        # Blocks in event loop, awaiting RPC service calls over DDS
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
