#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 08
Package: nexus_amr_basics
Node:    EmergencyStopClient (emergency_stop_client)
Service: /robot/emergency_stop (nexus_amr_interfaces/srv/TriggerEmergencyStop)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Demonstrates an asynchronous, non-blocking ROS 2 Service Client.
In real-time robotics, making a synchronous blocking service call (client.call())
inside a timer callback or subscriber callback causes an executor deadlock:
the thread freezes waiting for the response, which prevents the executor from
processing incoming sensor data or servicing other callbacks!

This client uses call_async() to dispatch the emergency stop request non-blockingly,
yielding control back to the event loop via Python Futures.
================================================================================
"""

import sys
import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import TriggerEmergencyStop


class EmergencyStopClient(Node):
    """
    AMR Emergency Safety Brake Service Client Node.
    """

    def __init__(self):
        super().__init__('emergency_stop_client')

        # Step 1: Create Service Client for '/robot/emergency_stop'
        self.client = self.create_client(
            TriggerEmergencyStop,
            '/robot/emergency_stop'
        )

        # Step 2: Liveness verification with timeout
        # Polls DDS discovery every 1.0s to confirm server node is alive
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service "/robot/emergency_stop" not available, waiting...')

        self.get_logger().info('EmergencyStopClient connected to safety service.')

    def send_emergency_stop_request(self, stop_requested: bool, reason: str):
        """
        Dispatches a non-blocking asynchronous service request.
        Returns a rclpy.task.Future object.
        """
        # Step 3: Instantiate and populate strongly-typed request struct
        request = TriggerEmergencyStop.Request()
        request.emergency_stop_requested = stop_requested
        request.reason = reason

        self.get_logger().info(
            f'Dispatching Emergency Stop Request: stop={stop_requested}, reason="{reason}"'
        )

        # Step 4: Asynchronous dispatch over DDS (returns immediately)
        self.future = self.client.call_async(request)
        return self.future


def main(args=None):
    rclpy.init(args=args)
    client_node = EmergencyStopClient()

    # Determine reason from CLI arguments or use standard default
    stop_reason = "Obstacle detected within 0.35m critical safety envelope"
    if len(sys.argv) > 1:
        stop_reason = " ".join(sys.argv[1:])

    # Dispatch asynchronous request
    future = client_node.send_emergency_stop_request(True, stop_reason)

    # Step 5: Spin the executor until the response future completes
    rclpy.spin_until_future_complete(client_node, future)

    # Step 6: Validate result
    if future.result() is not None:
        response = future.result()
        client_node.get_logger().info(
            f'SAFETY RESPONSE RECEIVED: '
            f'Success: {response.success} | '
            f'Status: {response.status_message} | '
            f'Time: {response.stop_timestamp:.3f} s'
        )
    else:
        client_node.get_logger().error(f'Service call failed: {future.exception()}')

    client_node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
