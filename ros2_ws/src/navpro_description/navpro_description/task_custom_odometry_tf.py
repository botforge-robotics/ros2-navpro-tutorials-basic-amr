#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 2 Student Task
Forward Kinematics Odometry & TF2 Dynamic Broadcaster

TODO Instructions:
1. Receive left and right wheel angular speeds from '/wheel_speeds' (geometry_msgs/Vector3).
2. Calculate linear velocity (v) and angular velocity (w) using wheel radius R=0.05m and track width L=0.28m.
3. Numerically integrate pose (x, y, theta).
4. Broadcast dynamic transform odom -> base_footprint.
5. Publish nav_msgs/Odometry topic on '/odom'.
"""

import math
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Vector3, TransformStamped, Quaternion
from nav_msgs.msg import Odometry
import tf2_ros


def yaw_to_quaternion(yaw: float) -> Quaternion:
    q = Quaternion()
    q.x = 0.0
    q.y = 0.0
    q.z = math.sin(yaw / 2.0)
    q.w = math.cos(yaw / 2.0)
    return q


class CustomOdometryNode(Node):

    def __init__(self):
        super().__init__('custom_odometry_node')
        self.WHEEL_RADIUS = 0.05
        self.TRACK_WIDTH = 0.28

        self.x = 0.0
        self.y = 0.0
        self.theta = 0.0

        self.v_linear = 0.0
        self.v_angular = 0.0
        self.last_time = self.get_clock().now()

        # TODO 1: Initialize tf2_ros.TransformBroadcaster(self) and '/odom' publisher
        # TODO: FILL IN CODE HERE

        # TODO 2: Subscribe to '/wheel_speeds' (Vector3)
        # TODO: FILL IN CODE HERE

        self.timer = self.create_timer(0.05, self.update_and_publish)

    def on_wheel_speeds(self, msg: Vector3):
        # TODO 3: Compute forward kinematics from msg.x (left) and msg.y (right)
        # TODO: FILL IN CODE HERE
        pass

    def update_and_publish(self):
        current_time = self.get_clock().now()
        dt = (current_time - self.last_time).nanoseconds / 1e9
        if dt <= 0.0 or dt > 0.5:
            self.last_time = current_time
            return

        # TODO 4: Integrate pose: x += v * cos(theta)*dt, y += v * sin(theta)*dt, theta += w*dt
        # TODO: FILL IN CODE HERE

        # TODO 5: Broadcast TransformStamped (odom -> base_footprint)
        # TODO: FILL IN CODE HERE

        # TODO 6: Publish Odometry message on self.odom_pub
        # TODO: FILL IN CODE HERE

        self.last_time = current_time


def main(args=None):
    rclpy.init(args=args)
    node = CustomOdometryNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
