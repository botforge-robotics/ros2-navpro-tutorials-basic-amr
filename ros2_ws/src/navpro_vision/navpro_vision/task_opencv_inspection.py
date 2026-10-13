#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Project 3.2 Student Task
Package: navpro_vision
Task:    task_opencv_inspection.py
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to build an optical quality-inspection node for the mobile robot
using ROS 2 and OpenCV. The AMR will navigate in front of a pallet, capture camera
frames, run edge detection, and count how many objects/packages are on the pallet.

OBJECTIVES:
-----------
1. Initialize `CvBridge()` to bridge ROS 2 images and OpenCV NumPy arrays.
2. Create:
   - Subscription on `/camera/image_raw` (`sensor_msgs/msg/Image`) -> `self.on_image`
   - Publisher on `/camera/image_edges` (`sensor_msgs/msg/Image`, queue: 10)
   - Service Server on `/vision/inspect_target` (`std_srvs/srv/Trigger`) -> `self.on_inspect`
3. In `on_image(self, msg)`:
   - Convert `msg` to OpenCV BGR using `self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')`.
   - Convert BGR to Grayscale using `cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)`.
   - Compute Canny edges: `cv2.Canny(gray, 50, 150)`.
   - Count contours: `cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)`.
   - Convert edge map to ROS Image (`mono8`) and publish to `/camera/image_edges`.
4. In `on_inspect(self, request, response)`:
   - Set `response.success = True`
   - Set `response.message = f"Inspection complete: {self.contour_count} objects detected."`
   - Return response.
================================================================================
"""

import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from std_srvs.srv import Trigger
from cv_bridge import CvBridge, CvBridgeError


class TaskOpencvInspection(Node):
    """
    Student Task Node: OpenCV Optical Inspection.
    """

    def __init__(self):
        super().__init__('task_opencv_inspection')
        self.get_logger().info('Initializing TaskOpencvInspection student node...')

        # ----------------------------------------------------------------------
        # TODO 1: Initialize CvBridge instance and internal states
        # ----------------------------------------------------------------------
        self.bridge = CvBridge()
        self.latest_cv_image = None
        self.contour_count = 0

        # ----------------------------------------------------------------------
        # TODO 2: Create Subscription, Publisher, and Service
        # ----------------------------------------------------------------------
        # 1. Subscriber to '/camera/image_raw' (Image) -> self.on_image
        # 2. Publisher to '/camera/image_edges' (Image)
        # 3. Service Server to '/vision/inspect_target' (Trigger) -> self.on_inspect
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        # self.image_sub = ...
        # self.edges_pub = ...
        # self.inspect_srv = ...

    def on_image(self, msg: Image):
        """
        TODO 3, 4, 5: Image Processing Callback
        ---------------------------------------
        - Step 3: cv_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')
        - Step 4: gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
                  edges = cv2.Canny(gray, 50, 150)
                  contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                  self.contour_count = len(contours)
        - Step 5: out_msg = self.bridge.cv2_to_imgmsg(edges, encoding='mono8')
                  out_msg.header = msg.header
                  self.edges_pub.publish(out_msg)
        """
        # TODO: STUDENT CODE HERE
        pass

    def on_inspect(self, request: Trigger.Request, response: Trigger.Response):
        """
        TODO 6: Inspection Trigger Service Handler
        ------------------------------------------
        - Populate response.success and response.message with contour_count.
        - Return response.
        """
        # TODO: STUDENT CODE HERE
        return response


def main(args=None):
    """
    Node lifecycle entry point.
    """
    rclpy.init(args=args)
    node = TaskOpencvInspection()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Stopping inspection node...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
