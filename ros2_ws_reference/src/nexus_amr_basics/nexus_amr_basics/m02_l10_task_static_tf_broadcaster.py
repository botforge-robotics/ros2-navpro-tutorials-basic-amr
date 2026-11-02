#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 10 Task
Package: nexus_amr_basics
Task:    m03_l15_01_task_static_tf_broadcaster.py (alias: task_static_tf)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to broadcast a static coordinate frame transform for the AMR's
primary 2D LiDAR (`laser_frame`) relative to the robot chassis (`base_link`).

OBJECTIVES:
-----------
1. TODO 1: Initialize `StaticTransformBroadcaster(self)` in node constructor.
2. TODO 2: Create a `TransformStamped` message:
   - header.stamp = self.get_clock().now().to_msg()
   - header.frame_id = 'base_link'
   - child_frame_id = 'laser_frame'
3. TODO 3: Set translation coordinates:
   - x = 0.20 m, y = 0.0 m, z = 0.15 m
   - rotation: identity quaternion (x=0, y=0, z=0, w=1.0)
4. TODO 4: Broadcast transform using `self.tf_broadcaster.sendTransform(t)`.
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

        # ======================================================================
        # TODO 1: Initialize StaticTransformBroadcaster
        # - Hint: Instantiate StaticTransformBroadcaster passing self.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.broadcast_laser_transform()

    def broadcast_laser_transform(self):
        # ======================================================================
        # TODO 2: Populate TransformStamped headers
        # - Hint: Create TransformStamped instance, assign current node clock time to
        #   header.stamp, set parent frame to 'base_link', and child frame to 'laser_frame'.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 3: Populate Translation and Rotation
        # - Hint: Set translation vector coordinates (x=0.20, y=0.0, z=0.15) and identity quaternion orientation (w=1.0).
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Send static transform and log
        # - Hint: Transmit the static transform via sendTransform() on your broadcaster and log a confirmation message.
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


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
