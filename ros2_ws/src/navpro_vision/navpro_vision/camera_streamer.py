#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Project 3.2
Camera Streamer: Generates simulated moving geometric patterns and publishes sensor_msgs/Image.
Package: navpro_vision
"""

import math
import numpy as np
import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge


class SimulatedCameraPublisher(Node):

    def __init__(self):
        super().__init__('camera_publisher')

        self.pub_ = self.create_publisher(Image, '/camera/image_raw', 10)
        self.bridge_ = CvBridge()
        self.timer_ = self.create_timer(1.0 / 15.0, self.stream_frame)
        self.tick_ = 0

        self.get_logger().info('Simulated Camera Publisher active on /camera/image_raw (15 Hz).')

    def stream_frame(self):
        self.tick_ += 1

        # 1. Create a 640x480 dark slate canvas
        frame = np.full((480, 640, 3), 35, dtype=np.uint8)

        # 2. Draw moving target circle simulating a warehouse pallet
        center_x = int(320 + 160 * math.sin(self.tick_ * 0.08))
        center_y = int(240 + 70 * math.cos(self.tick_ * 0.08))

        # Outer bounding box
        cv2.rectangle(frame, (center_x - 50, center_y - 50), (center_x + 50, center_y + 50), (0, 200, 255), 3)
        # Inner target circle
        cv2.circle(frame, (center_x, center_y), 24, (0, 255, 120), -1)

        # HUD Telemetry overlay
        cv2.putText(frame, f"NAVPRO OPTICAL FEED | FRAME #{self.tick_}", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (220, 220, 220), 2)

        # 3. Convert OpenCV NumPy array to ROS 2 Image message
        msg = self.bridge_.cv2_to_imgmsg(frame, encoding='bgr8')
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'camera_optical_link'

        self.pub_.publish(msg)


def main(args=None):
    rclpy.init(args=args)
    node = SimulatedCameraPublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
