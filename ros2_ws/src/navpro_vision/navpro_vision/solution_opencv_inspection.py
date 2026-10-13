#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Project 3.2 Reference Solution
Package: navpro_vision
Node:    solution_opencv_inspection.py
================================================================================

WHAT THIS REFERENCE SOLUTION DEMONSTRATES:
------------------------------------------
1. Industrial Image Pipeline with OpenCV and ROS 2:
   - Receives video frames over ROS 2 DDS.
   - Decodes network image byte streams into NumPy array matrices.
   - Performs grayscale conversion and multi-threshold Canny edge detection.
   - Calculates external contours representing physical cargo boundaries.
2. Perception-as-a-Service:
   - Exposes a standard `/vision/inspect_target` (`std_srvs/srv/Trigger`) service.
   - When called by an autonomous patrol commander, the node reports the exact
     number of parcels/features detected in the camera's visual field.
================================================================================
"""

import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from std_srvs.srv import Trigger
from cv_bridge import CvBridge, CvBridgeError


class SolutionOpencvInspection(Node):
    """
    Reference solution for Project 3.2: OpenCV Optical Inspection.
    """

    def __init__(self):
        super().__init__('solution_opencv_inspection')
        self.get_logger().info('Initializing SolutionOpencvInspection reference node...')

        # ----------------------------------------------------------------------
        # 1. INITIALIZE CV_BRIDGE & INTERNAL STATE
        # ----------------------------------------------------------------------
        # CvBridge handles format conversions between ROS 2 sensor_msgs/Image and OpenCV BGR matrices
        self.bridge = CvBridge()
        self.latest_cv_image = None
        self.contour_count = 0

        # ----------------------------------------------------------------------
        # 2. TOPIC INTERFACES & SERVICE SERVERS
        # ----------------------------------------------------------------------
        # Video feed subscriber from camera driver or simulator
        self.image_sub = self.create_subscription(
            Image,
            '/camera/image_raw',
            self.on_image,
            10
        )

        # Output publisher for processed edge detection map
        self.edges_pub = self.create_publisher(
            Image,
            '/camera/image_edges',
            10
        )

        # Trigger service to report inspection results to navigation commander
        self.inspect_srv = self.create_service(
            Trigger,
            '/vision/inspect_target',
            self.on_inspect
        )

        self.get_logger().info('SolutionOpencvInspection active and listening on /camera/image_raw.')

    def on_image(self, msg: Image):
        """
        Receives ROS Image, converts to OpenCV format, processes edges, and publishes result.
        """
        # STEP A: Safely convert ROS 2 Image message to OpenCV BGR8 NumPy matrix
        try:
            cv_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')
            self.latest_cv_image = cv_image
        except CvBridgeError as e:
            self.get_logger().error(f'CvBridge error during image conversion: {e}')
            return

        # STEP B: Convert 3-channel color to 1-channel grayscale
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)

        # STEP C: Canny Edge Detection with thresholds (50 = weak edge, 150 = strong edge)
        edges = cv2.Canny(gray, 50, 150)

        # STEP D: Extract topological contours from binary edge map
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        self.contour_count = len(contours)

        # STEP E: Convert OpenCV binary edge matrix back to ROS Image (encoding='mono8')
        out_msg = self.bridge.cv2_to_imgmsg(edges, encoding='mono8')
        # Preserve original camera frame timestamp and optical coordinate frame
        out_msg.header = msg.header

        # Broadcast edge map to ROS 2 network
        self.edges_pub.publish(out_msg)

    def on_inspect(self, request: Trigger.Request, response: Trigger.Response):
        """
        Service callback returning optical inspection findings.
        """
        response.success = True
        response.message = f"Inspection complete: {self.contour_count} objects detected in camera frame."
        self.get_logger().info(f'[Service Call] {response.message}')
        return response


def main(args=None):
    """
    Node lifecycle entry point.
    """
    rclpy.init(args=args)
    node = SolutionOpencvInspection()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping SolutionOpencvInspection...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
