#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 05
Package: nexus_amr_basics
Node:    CollisionSafetySubscriber (listener / collision_monitor_node)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Acts as an onboard Autonomous Mobile Robot (AMR) Collision Safety Monitor.
Industrial safety directives (ISO 3691-4) require continuous evaluation of
proximity sensor telemetry to prevent collisions with humans or infrastructure.

This node subscribes to '/sensor/ultrasonic_front' carrying sensor_msgs/msg/Range.
Upon receiving distance readings asynchronously via event-driven DDS callbacks:
- If distance < 0.50 m: Triggers high-priority safety alert (Emergency Deceleration).
- Else: Confirms nominal path clearance and authorizes continued transit.
================================================================================
"""

import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range


class CollisionSafetySubscriber(Node):
    """
    AMR Collision Safety Supervisor Node.
    Monitors ultrasonic proximity telemetry and enforces safety buffer.
    """

    def __init__(self):
        # Step 1: Initialize base Node with unique name 'collision_monitor_node'
        super().__init__('collision_monitor_node')

        # Step 2: Establish the physical safety threshold in meters
        # Obstacles closer than 50 cm trigger protective safety measures.
        self.safety_threshold_m = 0.50

        # Step 3: Create DDS Subscription with compatible Default QoS
        # - Range: Expected message schema (sensor_msgs/msg/Range)
        # - '/sensor/ultrasonic_front': Target topic
        # - self.distance_callback: Bound method called when new packet arrives
        # - 10: QoS History depth (Uses Default QoS: RELIABLE + VOLATILE, matching the publisher)
        self.subscription = self.create_subscription(
            Range,
            '/sensor/ultrasonic_front',
            self.distance_callback,
            10
        )

        self.get_logger().info(
            f'CollisionSafetySubscriber initialized. Monitoring "/sensor/ultrasonic_front" (Threshold: {self.safety_threshold_m} m)...'
        )

    def distance_callback(self, msg: Range):
        """
        Invoked asynchronously by the ROS 2 executor whenever a distance measurement
        packet arrives at the DDS DataReader socket.
        """
        # Extract distance in meters from the Range message field
        distance = msg.range

        # Evaluate physical safety invariant
        if distance < self.safety_threshold_m:
            # Critical hazard: obstacle within safety envelope!
            self.get_logger().error(
                f'ALERT: Obstacle detected at {distance:.2f} m! Distance < {self.safety_threshold_m} m -> TRIGGERING EMERGENCY BRAKE!'
            )
        else:
            # Nominal path clearance: safe for autonomous locomotion
            self.get_logger().info(
                f'STATUS: Distance {distance:.2f} m >= {self.safety_threshold_m} m -> Nominal path clearance confirmed.'
            )


def main(args=None):
    # Initialize ROS 2 communications
    rclpy.init(args=args)

    # Instantiate the subscriber node
    node = CollisionSafetySubscriber()

    try:
        # Blocks in single-threaded event loop waiting for incoming DDS messages
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        # Clean teardown: unregister subscription endpoint from network graph
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
