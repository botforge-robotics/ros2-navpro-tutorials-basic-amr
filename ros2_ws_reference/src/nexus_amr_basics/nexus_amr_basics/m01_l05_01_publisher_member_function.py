#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 05
Package: nexus_amr_basics
Node:    UltrasonicSensorPublisher (talker / ultrasonic_sensor_node)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Simulates an Autonomous Mobile Robot (AMR) front ultrasonic proximity rangefinder.
In warehouse logistics, floor hazards (pallet corners, low-profile obstacles)
frequently sit below the 20 cm horizontal scanning plane of 2D LiDARs.
Ultrasonic sonar transducers mounted on the lower bumper emit high-frequency
acoustic pulses to detect obstacles directly in the wheel path.

This node publishes simulated sonar range telemetry to topic:
    Topic: '/sensor/ultrasonic_front'
    Type:  sensor_msgs/msg/Range
    Rate:  10 Hz (every 100 ms)

A smooth sinusoidal waveform simulates an obstacle approaching and receding:
    distance(t) = 1.5 + 1.2 * sin(0.5 * t)  -> ranges from 0.30 m to 2.70 m.
================================================================================
"""

import math
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range


class UltrasonicSensorPublisher(Node):
    """
    Ultrasonic Rangefinder Sensor Publisher Node.
    Broadcasts Range measurements periodically over the DDS middleware.
    """

    def __init__(self):
        # Step 1: Initialize base Node with unique name 'ultrasonic_sensor_node'
        # This identifier registers the node in the ROS 2 computational graph.
        super().__init__('ultrasonic_sensor_node')

        # Step 2: Create a Publisher endpoint with Quality of Service (QoS)
        # Parameters:
        #   - Range: The ROS 2 sensor message schema (sensor_msgs/msg/Range)
        #   - '/sensor/ultrasonic_front': The DDS topic name
        #   - 10: QoS Profile configuration.
        #     Passing an integer (10) tells ROS 2 to use the DEFAULT QoS Profile:
        #       * Reliability: RELIABLE (guarantees packet delivery via ACKs)
        #       * Durability:  VOLATILE (messages are not saved for late joiners)
        #       * History:     KEEP_LAST with Depth=10 (buffers up to 10 samples)
        #     (Shorthand for: QoSProfile(depth=10, reliability=RELIABLE, durability=VOLATILE))
        self.publisher_ = self.create_publisher(Range, '/sensor/ultrasonic_front', 10)

        # Step 3: Configure a non-blocking software timer running at 10 Hz
        # 10 Hz = 0.100s period. Non-blocking timers allow rclpy to execute
        # other callbacks concurrently without freezing the thread.
        self.timer_period = 0.1  # seconds
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        # Step 4: Internal telemetry state tracking
        self.step_count = 0
        self.get_logger().info(
            'UltrasonicSensorPublisher initialized. Broadcasting Range telemetry to "/sensor/ultrasonic_front" at 10 Hz...'
        )

    def timer_callback(self):
        """
        Invoked periodically at 10 Hz by the ROS 2 SingleThreadedExecutor.
        Computes the current sensor reading, encapsulates it into Range, and publishes.
        """
        # Calculate simulation time elapsed
        time_elapsed = self.step_count * self.timer_period

        # Compute smooth sinusoidal distance profile between 0.30 m and 2.70 m
        distance = 1.5 + 1.2 * math.sin(0.5 * time_elapsed)

        # Instantiate strongly-typed ROS 2 sensor message
        msg = Range()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'ultrasound_front_link'
        msg.radiation_type = Range.ULTRASOUND
        msg.field_of_view = 0.5236  # ~30 degrees beam spread in radians
        msg.min_range = 0.02        # 2 cm minimum transducer range
        msg.max_range = 3.0         # 3.0 m maximum transducer range
        msg.range = round(distance, 2)

        # Serialize and broadcast over DDS transport
        self.publisher_.publish(msg)

        # Log operational warnings if obstacle enters critical safety buffer (< 0.50 m)
        if distance < 0.50:
            self.get_logger().warn(
                f'Ultrasonic range: {msg.range:.2f} m -> [OBSTACLE WITHIN SAFETY BUFFER!]'
            )
        else:
            self.get_logger().info(
                f'Ultrasonic range: {msg.range:.2f} m -> [PATH CLEAR]'
            )

        self.step_count += 1


def main(args=None):
    # Initialize the rclpy client library and underlying DDS transport layer
    rclpy.init(args=args)

    # Instantiate the node
    node = UltrasonicSensorPublisher()

    try:
        # Enter the event loop; blocks here dispatching timer callbacks
        rclpy.spin(node)
    except KeyboardInterrupt:
        # Graceful exit on Ctrl+C from terminal
        pass
    finally:
        # Destroy the node and unregister publisher from the DDS domain
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
