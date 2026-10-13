#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_vision
Node:    vision_processor_node.py
================================================================================

WHAT THIS NODE DOES:
--------------------
Demonstrates an industrial computer vision processing pipeline in ROS 2:
1. Subscribes to raw camera image stream (`/camera/image_raw`).
2. Converts ROS 2 `sensor_msgs/Image` to OpenCV NumPy array using `cv_bridge`.
3. Processes frame with OpenCV:
   - Grayscale conversion (`cv2.cvtColor`).
   - Gaussian blur noise reduction (`cv2.GaussianBlur`).
   - Canny multi-stage edge detection (`cv2.Canny`).
   - Contour extraction (`cv2.findContours`).
4. Re-publishes edge-detected binary image to `/camera/image_edges`.
5. Exposes a Trigger service (`/vision/inspect_target`) returning the count of
   detected objects/contours.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Image Conversion Safety: Handling `CvBridgeError` gracefully so corrupt image
   packets do not crash the node.
2. Filtering & Edge Detection Pipeline:
   - Why Gaussian blur is applied: Canny uses first-derivative gradients, which are
     sensitive to sensor noise; blur eliminates high-frequency speckle noise.
   - Dual-threshold hysteresis in Canny (50 low threshold, 150 high threshold)
     detects true edges while filtering weak noise.
3. Combining Vision and Services: Exposing perception results via services enables
   navigation nodes to trigger visual inspection only when the AMR reaches a station.
================================================================================
"""

import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from std_srvs.srv import Trigger
from cv_bridge import CvBridge, CvBridgeError


class VisionProcessorNode(Node):
    """
    Subscribes to raw camera images, executes OpenCV filtering and contour analysis,
    publishes edge maps, and provides an optical inspection trigger service.
    """

    def __init__(self):
        super().__init__('vision_processor_node')

        # ----------------------------------------------------------------------
        # 1. INITIALIZE STATE & CV_BRIDGE
        # ----------------------------------------------------------------------
        self.bridge_ = CvBridge()
        self.latest_cv_image = None
        self.detected_contour_count = 0

        # ----------------------------------------------------------------------
        # 2. SUBSCRIBER: RAW CAMERA FEED
        # ----------------------------------------------------------------------
        self.sub_ = self.create_subscription(
            Image,
            '/camera/image_raw',
            self.image_callback,
            10
        )

        # ----------------------------------------------------------------------
        # 3. PUBLISHER: PROCESSED EDGES
        # ----------------------------------------------------------------------
        self.processed_pub_ = self.create_publisher(
            Image,
            '/camera/image_edges',
            10
        )

        # ----------------------------------------------------------------------
        # 4. SERVICE SERVER: OPTICAL INSPECTION TRIGGER
        # ----------------------------------------------------------------------
        self.srv_ = self.create_service(
            Trigger,
            '/vision/inspect_target',
            self.handle_inspect_service
        )

        self.get_logger().info('Vision Processor Node active! Listening on /camera/image_raw...')

    def image_callback(self, msg: Image):
        """
        Processes every incoming camera frame with OpenCV.
        """
        # STEP A: Safely convert ROS Image to OpenCV BGR8 NumPy matrix
        try:
            cv_image = self.bridge_.imgmsg_to_cv2(msg, desired_encoding='bgr8')
            self.latest_cv_image = cv_image
        except CvBridgeError as e:
            self.get_logger().error(f'CvBridge conversion failed: {e}')
            return

        # STEP B: Pre-processing: Convert BGR to Grayscale
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)

        # STEP C: Noise reduction: Gaussian Blur with 5x5 kernel
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)

        # STEP D: Canny Edge Detection (hysteresis thresholds: 50, 150)
        edges = cv2.Canny(blurred, 50, 150)

        # STEP E: Find external contours from edge contours
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        self.detected_contour_count = len(contours)

        # STEP F: Convert processed single-channel 8-bit image back to ROS 2 Image
        out_msg = self.bridge_.cv2_to_imgmsg(edges, encoding='mono8')
        out_msg.header = msg.header  # Preserve timestamp and frame_id

        # Publish edge map for visualization in RViz2 or rqt_image_view
        self.processed_pub_.publish(out_msg)

    def handle_inspect_service(self, request: Trigger.Request, response: Trigger.Response) -> Trigger.Response:
        """
        Trigger service handler: returns the count of objects detected in the latest frame.
        """
        if self.latest_cv_image is None:
            response.success = False
            response.message = "Inspection failed: No camera frames received yet."
            return response

        response.success = True
        response.message = f"Optical Inspection Complete: Identified {self.detected_contour_count} distinct objects/edges."
        self.get_logger().info(f'[Inspection Service] {response.message}')
        return response


def main(args=None):
    """
    Node lifecycle entry point.
    """
    rclpy.init(args=args)
    node = VisionProcessorNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping vision processor...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
