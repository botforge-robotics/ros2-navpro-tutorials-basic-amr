#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_basics
Node:    subscriber_explained.py
================================================================================

WHAT THIS NODE DOES:
--------------------
This is an educational reference implementation of a multi-topic ROS 2 Subscriber.
It listens asynchronously to two distinct data streams simultaneously:
1. `/cmd_vel` (`geometry_msgs/msg/Twist`): Robot velocity commands.
2. `/scan` (`sensor_msgs/msg/LaserScan`): 2D LiDAR planar laser range data.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Event-Driven Callbacks: In ROS 2, subscribers register callback functions
   that are invoked automatically by the executor whenever fresh data arrives.
2. Multi-Topic Subscription: A single node can subscribe to multiple topics
   with distinct data types and callback handlers without multi-threading bugs.
3. Throttled Logging: Preventing terminal spam by using `throttle_duration_sec`
   in ROS 2 logger calls when receiving high-rate data (e.g. 20 Hz scans).
4. LaserScan Array Parsing: Accessing ranges array elements, checking array bounds,
   and extracting the front-facing distance reading.
================================================================================
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan


class RobotSensorsSubscriber(Node):
    """
    Subscribes to `/cmd_vel` motion commands and `/scan` LiDAR range measurements,
    processing and reporting telemetry in real time.
    """

    def __init__(self):
        # Name this node 'robot_sensors_subscriber' on the ROS 2 graph
        super().__init__('robot_sensors_subscriber')

        # ----------------------------------------------------------------------
        # 1. CREATE SUBSCRIPTION: VELOCITY COMMANDS
        # ----------------------------------------------------------------------
        # create_subscription(MessageType, TopicName, CallbackFunction, QoS_Depth)
        # - When a Twist message is published by teleop or a planner,
        #   the executor dispatches it to `self.cmd_callback`.
        # - Queue depth 10 buffers bursts of velocity updates.
        self.cmd_sub = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_callback,
            10
        )

        # ----------------------------------------------------------------------
        # 2. CREATE SUBSCRIPTION: 2D LIDAR LASER SCAN
        # ----------------------------------------------------------------------
        # - sensor_msgs.msg.LaserScan contains an array of floating-point distance
        #   measurements (`ranges`) sampled across 360 degrees.
        # - Whenever a new laser scan frame is ready, `self.scan_callback` runs.
        self.scan_sub = self.create_subscription(
            LaserScan,
            '/scan',
            self.scan_callback,
            10
        )

        self.get_logger().info('Sensors subscriber active! Listening to /cmd_vel and /scan...')

    def cmd_callback(self, msg: Twist):
        """
        Callback triggered whenever a new velocity command arrives on /cmd_vel.

        Parameters:
            msg (Twist): Incoming velocity command containing linear and angular components.
        """
        # throttle_duration_sec=1.0 ensures this log statement outputs at most once
        # per second, even if velocity messages arrive at 50 Hz.
        self.get_logger().info(
            f'Received /cmd_vel -> Linear: {msg.linear.x:.2f} m/s | Angular: {msg.angular.z:.2f} rad/s',
            throttle_duration_sec=1.0
        )

    def scan_callback(self, msg: LaserScan):
        """
        Callback triggered whenever a new LaserScan message arrives on /scan.

        Parameters:
            msg (LaserScan): 360-degree range array with angle_min, angle_max, angle_increment, etc.
        """
        # Defensive programming: verify that the scan array is not empty
        if len(msg.ranges) > 0:
            # In standard ROS 2 LiDAR configurations:
            # - Index 0 is typically the rear or right flank depending on mounting.
            # - Index len(ranges) // 2 is typically the center forward-facing beam (0 radians).
            center_index = len(msg.ranges) // 2
            front_distance = msg.ranges[center_index]

            # In LiDAR data, out-of-range readings can be inf or nan.
            # Only report if it's a valid finite measurement.
            if msg.range_min <= front_distance <= msg.range_max:
                self.get_logger().info(
                    f'LiDAR Front Distance: {front_distance:.2f} m (beam index {center_index})',
                    throttle_duration_sec=1.0
                )
            else:
                self.get_logger().info(
                    'LiDAR Front beam: No obstacle within sensor range',
                    throttle_duration_sec=1.0
                )


def main(args=None):
    """
    Node lifecycle management.
    """
    rclpy.init(args=args)
    node = RobotSensorsSubscriber()
    try:
        # spin() blocks while keeping the event loop alive to process incoming callbacks
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping subscriber...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
