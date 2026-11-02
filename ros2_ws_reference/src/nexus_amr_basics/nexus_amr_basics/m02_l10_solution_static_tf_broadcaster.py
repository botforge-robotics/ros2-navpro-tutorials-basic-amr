#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 10 Solution
Package: nexus_amr_basics
Task:    m03_l15_02_solution_static_tf_broadcaster.py (alias: static_tf_broadcaster)
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from geometry_msgs.msg import TransformStamped
from tf2_ros.static_transform_broadcaster import StaticTransformBroadcaster


class StaticTfBroadcasterNode(Node):

    def __init__(self):
        super().__init__('static_tf_broadcaster_node')

        # Step 1: Initialize broadcaster
        self.tf_broadcaster = StaticTransformBroadcaster(self)

        # Broadcast transforms
        self.broadcast_laser_transform()

    def broadcast_laser_transform(self):
        # Step 2: Populate header and frames
        t = TransformStamped()
        t.header.stamp = self.get_clock().now().to_msg()
        t.header.frame_id = 'base_link'
        t.child_frame_id = 'laser_frame'

        # Step 3: Populate physical translation (20cm forward, 15cm elevated)
        t.transform.translation.x = 0.20
        t.transform.translation.y = 0.0
        t.transform.translation.z = 0.15

        # Rotation: identity quaternion (aligned with base_link)
        t.transform.rotation.x = 0.0
        t.transform.rotation.y = 0.0
        t.transform.rotation.z = 0.0
        t.transform.rotation.w = 1.0

        # Step 4: Broadcast transform
        self.tf_broadcaster.sendTransform(t)
        self.get_logger().info('Broadcasted static TF frame: base_link -> laser_frame [x=0.20, z=0.15]')


def main(args=None):
    rclpy.init(args=args)
    node = StaticTfBroadcasterNode()

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
