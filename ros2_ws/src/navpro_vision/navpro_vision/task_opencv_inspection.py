#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Project 3.2 Student Task
Optical Inspection with OpenCV & cv_bridge
"""

import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from std_srvs.srv import Trigger
from cv_bridge import CvBridge, CvBridgeError


class TaskOpencvInspection(Node):

    def __init__(self):
        super().__init__('task_opencv_inspection')
        self.get_logger().info('Initializing TaskOpencvInspection node...')

        # TODO 1: Initialize CvBridge instance
        # TODO: FILL IN CODE HERE
        self.bridge = CvBridge()
        self.latest_cv_image = None
        self.contour_count = 0

        # TODO 2: Create Subscription, Publisher, and Service
        # TODO: FILL IN CODE HERE

    def on_image(self, msg: Image):
        # TODO 3: Convert ROS Image -> OpenCV BGR Image
        # TODO 4: Process Image with OpenCV (grayscale, Canny edges, contours)
        # TODO 5: Convert edges -> ROS Image and Publish
        # TODO: FILL IN CODE HERE
        pass

    def on_inspect(self, request: Trigger.Request, response: Trigger.Response):
        # TODO 6: Handle Inspection Service Request
        # TODO: FILL IN CODE HERE
        return response


def main(args=None):
    rclpy.init(args=args)
    node = TaskOpencvInspection()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
