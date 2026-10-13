#!/bin/bash
# =============================================================================
# NavPro Learning Hub - Level 1 Workspace Reset Script
# Restores all student task files to clean boilerplate with # TODO blocks
# and clears colcon build artifacts so students start fresh.
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WS_DIR="${1:-/home/student/ros2_ws}"
if [ ! -d "$WS_DIR" ] && [ -d "$SCRIPT_DIR/../ros2_ws" ]; then
    WS_DIR="$SCRIPT_DIR/../ros2_ws"
fi

echo "=================================================================="
echo "  [NavPro Reset] Resetting Level 1 Student Workspace to Fresh State"
echo "=================================================================="

# 1. Clean colcon build/install/log directories
if [ -d "$WS_DIR/build" ] || [ -d "$WS_DIR/install" ] || [ -d "$WS_DIR/log" ]; then
    echo "-> Removing existing build, install, and log folders..."
    rm -rf "$WS_DIR/build" "$WS_DIR/install" "$WS_DIR/log"
fi

# 2. Re-create / overwrite Day 1 Task: task_teleop_speed_limiter.py
cat << 'EOF' > "$WS_DIR/src/navpro_basics/navpro_basics/task_teleop_speed_limiter.py"
#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1 Student Task
Teleop Speed Limiter & Battery Supervisor Node

TODO Instructions:
1. Declare parameters: 'speed_scale_factor' (0.8) and 'low_battery_threshold' (20.0).
2. Subscribe to '/input/cmd_vel' (geometry_msgs/Twist) and '/battery_voltage' (std_msgs/Float32).
3. Scale velocity and publish to '/cmd_vel'. If battery < threshold, halve speed.
4. Expose Service '/set_speed_mode' (std_srvs/SetBool) to toggle turbo (1.0) / eco (0.5).
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32
from std_srvs.srv import SetBool


class TeleopSpeedLimiter(Node):

    def __init__(self):
        super().__init__('teleop_speed_limiter')
        self.get_logger().info('Initializing TeleopSpeedLimiter task node...')

        # TODO 1: Declare parameters 'speed_scale_factor' (default 0.8) and 'low_battery_threshold' (default 20.0)
        # Store them in self.scale_factor and self.low_bat_thresh
        # TODO: FILL IN CODE HERE
        self.scale_factor = 0.8
        self.low_bat_thresh = 20.0

        self.current_battery_pct = 100.0
        self.turbo_mode = False

        # TODO 2: Create publisher to '/cmd_vel' (Twist)
        # TODO: FILL IN CODE HERE
        # self.cmd_vel_pub = ...

        # TODO 3: Create subscriptions to '/input/cmd_vel' (Twist) and '/battery_voltage' (Float32)
        # TODO: FILL IN CODE HERE
        # self.cmd_vel_sub = ...
        # self.battery_sub = ...

        # TODO 4: Create service server for '/set_speed_mode' (SetBool)
        # TODO: FILL IN CODE HERE
        # self.speed_mode_srv = ...

    def on_battery(self, msg: Float32):
        # TODO 5: Store battery voltage and warn if below low_bat_thresh
        # TODO: FILL IN CODE HERE
        pass

    def on_cmd_vel(self, msg: Twist):
        # TODO 6: Calculate effective scale factor (turbo=1.0, low_battery=*0.5) and publish scaled Twist
        # TODO: FILL IN CODE HERE
        pass

    def handle_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        # TODO 7: Enable turbo if request.data is True, otherwise eco mode
        # TODO: FILL IN CODE HERE
        return response


def main(args=None):
    rclpy.init(args=args)
    node = TeleopSpeedLimiter()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
EOF

# 3. Re-create / overwrite Day 2 Task: task_custom_odometry_tf.py
cat << 'EOF' > "$WS_DIR/src/navpro_description/navpro_description/task_custom_odometry_tf.py"
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
EOF

# 4. Re-create / overwrite Day 3 Task: task_multi_waypoint_patrol.py
cat << 'EOF' > "$WS_DIR/src/navpro_navigation/navpro_navigation/task_multi_waypoint_patrol.py"
#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 3 Student Task
Autonomous Multi-Waypoint Inspection Patrol with Nav2 Simple Commander

TODO Instructions:
1. Initialize BasicNavigator and waitUntilNav2Active().
2. Define sequential waypoints (A, B, C) in the map frame.
3. For each waypoint: command robot using navigator.goToPose(), monitor remaining distance, enforce timeout.
4. Return and dock at Home pose (0, 0, 0).
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_goal_pose(navigator: BasicNavigator, x: float, y: float, yaw: float) -> PoseStamped:
    pose = PoseStamped()
    pose.header.frame_id = 'map'
    pose.header.stamp = navigator.get_clock().now().to_msg()
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.orientation.z = math.sin(yaw / 2.0)
    pose.pose.orientation.w = math.cos(yaw / 2.0)
    return pose


def main():
    rclpy.init()

    # TODO 1: Initialize navigator and wait for Nav2 to activate
    navigator = BasicNavigator()
    # TODO: FILL IN CODE HERE

    waypoints = [
        (1.5, 0.5, 0.0, "Checkpoint Alpha"),
        (2.0, 2.0, 1.57, "Checkpoint Bravo"),
        (0.5, 1.8, 3.14, "Checkpoint Charlie"),
    ]

    # TODO 2: Loop through waypoints, call goToPose(), loop while not isTaskComplete(), check timeout
    # TODO: FILL IN CODE HERE

    # TODO 3: Navigate back to Home Pose (0, 0, 0)
    # TODO: FILL IN CODE HERE

    rclpy.shutdown()


if __name__ == '__main__':
    main()
EOF

# 5. Re-create / overwrite Project 3.2 Task: task_opencv_inspection.py
cat << 'EOF' > "$WS_DIR/src/navpro_vision/navpro_vision/task_opencv_inspection.py"
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
EOF

chmod +x "$WS_DIR/src/navpro_basics/navpro_basics/"*.py
chmod +x "$WS_DIR/src/navpro_description/navpro_description/"*.py
chmod +x "$WS_DIR/src/navpro_navigation/navpro_navigation/"*.py
chmod +x "$WS_DIR/src/navpro_vision/navpro_vision/"*.py

# 6. Reset Web Platform Progress State (legacy fallback)
if [ -d "$SCRIPT_DIR/../web" ]; then
    echo "-> Resetting web progress state in $SCRIPT_DIR/../web..."
    RESET_TIME=$(date +%s)
    echo "{\"last_reset\": $RESET_TIME, \"completed_lessons\": []}" > "$SCRIPT_DIR/../web/progress_state.json" 2>/dev/null || true
fi

echo "=================================================================="
echo "  [SUCCESS] Level 1 Workspace and Web Progress have been reset!"
echo "  Students can now run: colcon build --symlink-install"
echo "=================================================================="
