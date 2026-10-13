#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Project 3.2
REFERENCE SOLUTION: Computer Vision Optical Inspection with OpenCV & cv_bridge
Package: navpro_vision
"""

import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from std_srvs.srv import Trigger
from cv_bridge import CvBridge, CvBridgeError


class SolutionOpencvInspection(Node):

    def __init__(self):
        super().__init__('solution_opencv_inspection')
        self.get_logger().info('Initializing SolutionOpencvInspection node...')

        # 1. Initialize CvBridge
        self.bridge = CvBridge()
        self.latest_cv_image = None
        self.contour_count = 0

        # 2. Subscriptions, Publishers, and Services
        self.image_sub = self.create_subscription(Image, '/camera/image_raw', self.on_image, 10)
        self.edges_pub = self.create_publisher(Image, '/camera/image_edges', 10)
        self.inspect_srv = self.create_service(Trigger, '/vision/inspect_target', self.on_inspect)

    def on_image(self, msg: Image):
        # 3. Convert ROS -> OpenCV
        try:
            cv_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')
            self.latest_cv_image = cv_image
        except CvBridgeError as e:
            self.get_logger().error(f'CvBridge error: {e}')
            return

        # 4. Process with OpenCV
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        self.contour_count = len(contours)

        # 5. Convert OpenCV -> ROS and Publish
        out_msg = self.bridge.cv2_to_imgmsg(edges, encoding='mono8')
        out_msg.header = msg.header
        self.edges_pub.publish(out_msg)

    def on_inspect(self, request: Trigger.Request, response: Trigger.Response):
        # 6. Service Response
        response.success = True
        response.message = f"Inspection complete: {self.contour_count} objects detected."
        return response


def main(args=None):
    rclpy.init(args=args)
    node = SolutionOpencvInspection()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
