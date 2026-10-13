#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_vision
Node:    camera_streamer.py
================================================================================

WHAT THIS NODE DOES:
--------------------
Generates a synthetic camera image stream using OpenCV and NumPy, converts it
into a ROS 2 `sensor_msgs/msg/Image`, and broadcasts it to `/camera/image_raw` at 15 Hz.
Simulates a camera looking at moving warehouse pallets with telemetry HUD overlays.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. OpenCV Image Generation:
   - Creating 3-channel BGR image canvases with NumPy arrays: `np.full((H, W, 3), ...)`.
   - Drawing dynamic primitives (`cv2.rectangle`, `cv2.circle`, `cv2.putText`).
2. ROS 2 - OpenCV Bridge (`cv_bridge`):
   - Bridges the gap between ROS 2 serialization (`sensor_msgs/Image`) and
     OpenCV's raw NumPy array representation.
   - `cv2_to_imgmsg(frame, encoding='bgr8')` packages pixel data into ROS 2 packets.
3. Optical Coordinate Frame Metadata:
   - Stamps the message header with `camera_optical_link` and current ROS clock time.
================================================================================
"""

import math
import numpy as np
import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge


class SimulatedCameraPublisher(Node):
    """
    Synthesizes and broadcasts a camera feed to `/camera/image_raw`.
    """

    def __init__(self):
        super().__init__('camera_publisher')

        # ----------------------------------------------------------------------
        # 1. PUBLISHER AND CV_BRIDGE INITIALIZATION
        # ----------------------------------------------------------------------
        # Publishes standard uncompressed image frames
        self.pub_ = self.create_publisher(Image, '/camera/image_raw', 10)

        # CvBridge instance handles high-performance zero-copy memory conversions
        self.bridge_ = CvBridge()

        # Camera streaming timer running at 15 Hz (period = 1/15 = ~0.067s)
        self.timer_ = self.create_timer(1.0 / 15.0, self.stream_frame)
        self.tick_ = 0

        self.get_logger().info('Simulated Camera Publisher active on /camera/image_raw (15 Hz).')

    def stream_frame(self):
        """
        Synthesizes a 640x480 video frame and publishes it as a ROS 2 Image.
        """
        self.tick_ += 1

        # ----------------------------------------------------------------------
        # STEP 1: CREATE BACKGROUND CANVAS (640x480 BGR)
        # ----------------------------------------------------------------------
        # Create dark slate gray canvas (Height=480, Width=640, Channels=3)
        frame = np.full((480, 640, 3), 35, dtype=np.uint8)

        # ----------------------------------------------------------------------
        # STEP 2: RENDER DYNAMIC GEOMETRIC TARGETS
        # ----------------------------------------------------------------------
        # Simulate moving cargo/pallet using harmonic sinusoidal motion
        center_x = int(320 + 160 * math.sin(self.tick_ * 0.08))
        center_y = int(240 + 70 * math.cos(self.tick_ * 0.08))

        # Outer target bounding rectangle (amber color: B=0, G=200, R=255)
        cv2.rectangle(
            frame,
            (center_x - 50, center_y - 50),
            (center_x + 50, center_y + 50),
            (0, 200, 255),
            3
        )

        # Inner circular target (neon green: B=0, G=255, R=120)
        cv2.circle(frame, (center_x, center_y), 24, (0, 255, 120), -1)

        # Telemetry HUD text overlay
        cv2.putText(
            frame,
            f"NAVPRO OPTICAL FEED | FRAME #{self.tick_}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (220, 220, 220),
            2
        )

        # ----------------------------------------------------------------------
        # STEP 3: CONVERT OPENCV NUMPY ARRAY TO ROS 2 IMAGE MESSAGE
        # ----------------------------------------------------------------------
        # cv2_to_imgmsg takes the BGR numpy array and generates sensor_msgs/Image
        msg = self.bridge_.cv2_to_imgmsg(frame, encoding='bgr8')

        # Populate header timestamp and optical frame ID
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'camera_optical_link'

        # Publish frame over DDS
        self.pub_.publish(msg)


def main(args=None):
    """
    Node lifecycle entry point.
    """
    rclpy.init(args=args)
    node = SimulatedCameraPublisher()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Shutting down camera streamer...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
