# Lesson 16: Project 3.2: Computer Vision & OpenCV Integration with ROS 2

> **Focus:** Python Computer Vision Pipeline, `cv_bridge` Conversion & Vision Service Processing  
> **Course Track:** NavPro Learning Hub - Level 1 (Project 3.2 - Python Only)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Visual perception is essential for modern autonomous mobile robots: identifying QR barcodes on warehouse shelving, detecting pallet drop zones, and tracking human workers.

ROS 2 streams images using the standard message type `sensor_msgs/msg/Image`. However, computer vision libraries like **OpenCV** manipulate images as standard NumPy multidimensional arrays. The official ROS package **`cv_bridge`** bridges this gap.

By the end of this capstone lesson, you will:
1. Understand image serialization in ROS 2: encoding types (`bgr8`, `rgb8`, `mono8`).
2. Use `cv_bridge.CvBridge` to convert between `sensor_msgs/msg/Image` and OpenCV NumPy matrices.
3. Build a Python **Camera Streamer Node** generating simulated color test video.
4. Build a Python **Vision Processing Service Node** executing Canny Edge Detection and contour extraction.
5. Inspect live image topics using `rqt_image_view` and RViz2.

---

## 2. The `cv_bridge` Conversion Architecture

![OpenCV cv_bridge Conversion Pipeline](../assets/images/opencv_cv_bridge_pipeline.svg)

### Install Prerequisites:
```bash
sudo apt install -y ros-jazzy-cv-bridge ros-jazzy-image-transport python3-opencv rqt-image-view
```

---

## 3. Step-by-Step: Camera Streamer Node (`camera_publisher.py`)

This node simulates an onboard mobile robot camera publishing 640x480 video frames at 15 Hz.

Create file `camera_publisher.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 16
Camera Streamer: Generates simulated moving geometric patterns and publishes sensor_msgs/Image.
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

        # Create Publisher on /camera/image_raw
        self.pub_ = self.create_publisher(Image, '/camera/image_raw', 10)
        self.bridge_ = CvBridge()

        # 15 Hz stream timer
        self.timer_ = self.create_timer(1.0 / 15.0, self.stream_frame)
        self.tick_ = 0

        self.get_logger().info('Simulated Camera Publisher active on /camera/image_raw (15 Hz).')

    def stream_frame(self):
        self.tick_ += 1

        # 1. Create a 640x480 dark slate canvas (NumPy array)
        frame = np.full((480, 640, 3), 32, dtype=np.uint8)

        # 2. Draw moving target circle simulating a warehouse pallet target
        center_x = int(320 + 180 * math.sin(self.tick_ * 0.08))
        center_y = int(240 + 80 * math.cos(self.tick_ * 0.08))

        # Outer bounding box
        cv2.rectangle(frame, (center_x - 50, center_y - 50), (center_x + 50, center_y + 50), (0, 200, 255), 3)
        # Inner target circle
        cv2.circle(frame, (center_x, center_y), 25, (0, 255, 120), -1)

        # Draw HUD Telemetry text overlay
        cv2.putText(frame, f"NAVPRO OPTICAL FEED | FRAME #{self.tick_}", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (220, 220, 220), 2)

        # 3. Convert OpenCV NumPy array to ROS 2 Image message
        msg = self.bridge_.cv2_to_imgmsg(frame, encoding='bgr8')
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'camera_optical_link'

        # 4. Publish message
        self.pub_.publish(msg)


def main():
    rclpy.init()
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
```

---

## 4. Step-by-Step: Vision Processing Node with Service (`vision_service_node.py`)

This node subscribes to `/camera/image_raw`, performs Canny edge detection, and exposes a ROS 2 Service `/vision/capture_target` that counts how many edges/contours exist in the current scene!

Create file `vision_service_node.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 16
Vision Service: Performs Canny edge detection and exposes a trigger service to count contours.
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

        # 1. Subscriber to raw camera feed
        self.sub_ = self.create_subscription(
            Image,
            '/camera/image_raw',
            self.image_callback,
            10
        )

        # 2. Publisher for processed edge detection output
        self.processed_pub_ = self.create_publisher(Image, '/camera/image_edges', 10)

        # 3. Service Server: Returns inspection analytics on demand
        self.srv_ = self.create_service(
            Trigger,
            '/vision/inspect_target',
            self.handle_inspect_service
        )

        self.get_logger().info('Vision Processor Node active. Listening on /camera/image_raw.')

    def image_callback(self, msg: Image):
        """Processes incoming camera frames in real time."""
        try:
            # Convert ROS 2 Image to OpenCV BGR matrix
            cv_image = self.bridge_.imgmsg_to_cv2(msg, desired_encoding='bgr8')
            self.latest_cv_image = cv_image
        except CvBridgeError as e:
            self.get_logger().error(f'CvBridge conversion error: {e}')
            return

        # 1. Convert to Grayscale
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)

        # 2. Apply Gaussian Blur to filter sensor noise
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)

        # 3. Canny Edge Detection (Thresholds 50 to 150)
        edges = cv2.Canny(blurred, 50, 150)

        # 4. Find Contours
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        self.detected_contour_count = len(contours)

        # 5. Convert edge detection back to ROS Image message and publish
        out_msg = self.bridge_.cv2_to_imgmsg(edges, encoding='mono8')
        out_msg.header = msg.header
        self.processed_pub_.publish(out_msg)

    def handle_inspect_service(self, request: Trigger.Request, response: Trigger.Response) -> Trigger.Response:
        """Service callback returning the current optical inspection outcome."""
        if self.latest_cv_image is None:
            response.success = False
            response.message = "No camera frames received yet."
            return response

        response.success = True
        response.message = f"Optical Inspection Complete: Identified {self.detected_contour_count} distinct objects/edges."
        self.get_logger().info(f'Inspection Service triggered -> {response.message}')
        return response


def main():
    rclpy.init()
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
```

### Core Logic Breakdown: What We Are Trying to Achieve & Why
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `cv_image = self.bridge_.imgmsg_to_cv2(msg, desired_encoding='bgr8')` | Convert ROS 2 serialized image bytes to an OpenCV NumPy matrix. | ROS 2 transmits images as flat byte buffers with metadata (step, width, height, encoding). `cv_bridge` parses the header and reconstructs a NumPy array shape `(H, W, 3)` with BGR channel ordering. |
| `try ... except CvBridgeError as e:` | Defensive programming against corrupt camera packets. | High-speed network feeds can drop packets or deliver corrupted frames. Catching `CvBridgeError` prevents perception pipeline crashes, allowing subsequent frames to process cleanly. |
| `gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)` | Dimensionality reduction for intensity processing. | Reduces 3 color channels ($B, G, R$) down to a single 8-bit luminance channel ($0..255$). Color is irrelevant for structural edge boundaries, and grayscale processing is $3\times$ faster. |
| `blurred = cv2.GaussianBlur(gray, (5, 5), 0)` | High-frequency noise suppression. | Edge detectors use mathematical spatial gradients (derivatives). Sensor pixel noise produces extreme localized gradients; Gaussian blur smooths speckle noise before gradient calculation. |
| `edges = cv2.Canny(blurred, 50, 150)` | Multi-stage edge detection with hysteresis. | Computes gradient magnitude and direction. Pixels with gradient $> 150$ are preserved as strong edges; pixels $< 50$ are suppressed. Pixels between $50$ and $150$ are kept only if connected to a strong edge. |
| `contours, _ = cv2.findContours(...)` | Topological feature extraction. | Groups connected boundary pixels into vector polygon contours. `RETR_EXTERNAL` isolates outer object perimeters while ignoring internal texture patterns. |
| `out_msg = self.bridge_.cv2_to_imgmsg(edges, encoding='mono8')` | Repackage binary edge map into ROS 2 network format. | Converts the single-channel 8-bit NumPy array back into `sensor_msgs/msg/Image` so tools like `rqt_image_view` or RViz2 can visualize real-time edge maps over DDS. |

---


## 5. Verification & Visualizing in `rqt_image_view`

In Terminal 1:
```bash
python3 camera_publisher.py
```

In Terminal 2:
```bash
python3 vision_service_node.py
```

In Terminal 3, view the raw and processed feeds:
```bash
# Launch RQT Image View GUI
rqt_image_view
```
*In the dropdown menu, select `/camera/image_raw` to see the simulated color moving target, and `/camera/image_edges` to view real-time Canny edge extraction!*

In Terminal 4, call the vision inspection service:
```bash
ros2 service call /vision/inspect_target std_srvs/srv/Trigger
```
*Expected Output:*
```
response:
std_srvs.srv.Trigger_Response(
  success=True,
  message='Optical Inspection Complete: Identified 2 distinct objects/edges.'
)
```

---

## 6. Hands-on Student Challenge

**Task:**
1. In `vision_service_node.py`, add color filtering using `cv2.inRange()` in HSV color space to isolate yellow targets.
2. Calculate the centroid coordinates $(c_x, c_y)$ of the largest contour using OpenCV image moments:
   $$c_x = \frac{M_{10}}{M_{00}}, \quad c_y = \frac{M_{01}}{M_{00}}$$
3. Include the detected target centroid $(c_x, c_y)$ in the service response message!
