#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Project 3.2
Vision Service: Performs Canny edge detection and exposes a trigger service to count contours.
Package: navpro_vision
"""

import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from std_srvs.srv import Trigger
from cv_bridge import CvBridge, CvBridgeError


class VisionProcessorNode(Node):

    def __init__(self):
        super().__init__('vision_processor_node')

        self.bridge_ = CvBridge()
        self.latest_cv_image = None
        self.detected_contour_count = 0

        # Subscriber
        self.sub_ = self.create_subscription(
            Image,
            '/camera/image_raw',
            self.image_callback,
            10
        )

        # Publisher for processed edge detection output
        self.processed_pub_ = self.create_publisher(Image, '/camera/image_edges', 10)

        # Service Server
        self.srv_ = self.create_service(
            Trigger,
            '/vision/inspect_target',
            self.handle_inspect_service
        )

        self.get_logger().info('Vision Processor Node active on /camera/image_raw.')

    def image_callback(self, msg: Image):
        try:
            cv_image = self.bridge_.imgmsg_to_cv2(msg, desired_encoding='bgr8')
            self.latest_cv_image = cv_image
        except CvBridgeError as e:
            self.get_logger().error(f'CvBridge conversion error: {e}')
            return

        # Grayscale -> Gaussian Blur -> Canny Edge Detection
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blurred, 50, 150)

        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        self.detected_contour_count = len(contours)

        out_msg = self.bridge_.cv2_to_imgmsg(edges, encoding='mono8')
        out_msg.header = msg.header
        self.processed_pub_.publish(out_msg)

    def handle_inspect_service(self, request: Trigger.Request, response: Trigger.Response) -> Trigger.Response:
        if self.latest_cv_image is None:
            response.success = False
            response.message = "No camera frames received yet."
            return response

        response.success = True
        response.message = f"Optical Inspection Complete: Identified {self.detected_contour_count} distinct objects/edges."
        self.get_logger().info(f'Inspection Service triggered -> {response.message}')
        return response


def main(args=None):
    rclpy.init(args=args)
    node = VisionProcessorNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
