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

# Remove obsolete packages if present
rm -rf "$WS_DIR/src/navpro_vision" "$WS_DIR/src/navpro_description/navpro_description/task_custom_odometry_tf.py" 2>/dev/null || true

# 2. Re-create / overwrite Module 1 / Lesson 05 Task 1: m01_l05_task_custom_pubsub.py
cat << 'EOF' > "$WS_DIR/src/navpro_basics/navpro_basics/m01_l05_task_custom_pubsub.py"
#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 1 / Lesson 05 Task 1
Package: navpro_basics
Task:    m01_l05_task_custom_pubsub.py (alias: task_custom_pubsub)
================================================================================

EXERCISE OVERVIEW:
------------------
Your goal is to build your very first ROS 2 Publisher and Subscriber node
using the standard ROS 2 `std_msgs/msg/String` message type.
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class BeginnerPubSubNode(Node):
    """
    Student Starter Template: Beginner Publisher & Subscriber
    """

    def __init__(self):
        super().__init__('beginner_pubsub_task')
        self.get_logger().info('Initializing BeginnerPubSubNode...')

        # Internal message counter
        self.count = 0

        # TODO 1: Create a Publisher on topic '/chatter'
        # Message Type: String
        # Queue Depth:  10
        # Hint: self.publisher_ = self.create_publisher(String, '/chatter', 10)
        self.publisher_ = None

        # TODO 2: Create a periodic 1.0 second timer
        # Callback: self.timer_callback
        # Hint: self.timer_ = self.create_timer(1.0, self.timer_callback)
        self.timer_ = None

        # TODO 3: Create a Subscription to topic '/chatter'
        # Message Type: String
        # Callback:     self.listener_callback
        # Queue Depth:  10
        # Hint: self.subscription_ = self.create_subscription(
        #           String, '/chatter', self.listener_callback, 10)
        self.subscription_ = None

    def timer_callback(self):
        # TODO 4: Timer Publishing Callback
        # 1. Increment self.count by 1
        # 2. Create String(), assign msg.data = f'Robot ping: {self.count}'
        # 3. Publish message: self.publisher_.publish(msg)
        # 4. Log to console: self.get_logger().info(f'Publishing: "{msg.data}"')
        pass

    def listener_callback(self, msg: String):
        # TODO 5: Subscription Listener Callback
        # 1. Log incoming message to console:
        #    self.get_logger().info(f'Received ping: "{msg.data}"')
        pass


def main(args=None):
    rclpy.init(args=args)
    node = BeginnerPubSubNode()
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

# 3. Re-create / overwrite Module 2 / Lesson 08 Task: m02_l08_task_service_calculator.py
cat << 'EOF' > "$WS_DIR/src/navpro_basics/navpro_basics/m02_l08_task_service_calculator.py"
#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 2 / Lesson 08 Task
Package: navpro_basics
Task:    m02_l08_task_service_calculator.py (alias: task_service_calculator)
================================================================================
"""

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class ServiceCalculatorNode(Node):
    """
    Student Starter Template: Beginner Service Server
    """

    def __init__(self):
        super().__init__('service_calculator_task')
        self.get_logger().info('Initializing ServiceCalculatorNode...')

        # TODO 1: Create a Service Server on 'calculate_sum'
        # Interface Type:    AddTwoInts
        # Service Name:      'calculate_sum'
        # Callback Function: self.compute_sum
        # Hint: self.srv = self.create_service(AddTwoInts, 'calculate_sum', self.compute_sum)
        self.srv = None

    def compute_sum(self, request, response):
        # TODO 2: Service Request Callback
        # 1. Calculate: response.sum = request.a + request.b
        # 2. Log calculation: self.get_logger().info(...)
        # 3. Return response
        return response


def main(args=None):
    rclpy.init(args=args)
    node = ServiceCalculatorNode()
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

# 4. Re-create / overwrite Module 1 / Lesson 05 Capstone Task: m01_l05_task_teleop_speed_limiter.py
cat << 'EOF' > "$WS_DIR/src/navpro_basics/navpro_basics/m01_l05_task_teleop_speed_limiter.py"
#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Module 1 / Lesson 05 Capstone
Teleop Speed Limiter & Battery Supervisor Node
Task: m01_l05_task_teleop_speed_limiter.py (alias: task_teleop_speed_limiter)

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
        self.scale_factor = 0.8
        self.low_bat_thresh = 20.0

        self.current_battery_pct = 100.0
        self.turbo_mode = False

        # TODO 2: Create publisher to '/cmd_vel' (Twist)
        # self.cmd_vel_pub = ...

        # TODO 3: Create subscriptions to '/input/cmd_vel' (Twist) and '/battery_voltage' (Float32)
        # self.cmd_vel_sub = ...
        # self.battery_sub = ...

        # TODO 4: Create service server for '/set_speed_mode' (SetBool)
        # self.speed_mode_srv = ...

    def on_battery(self, msg: Float32):
        # TODO 5: Store battery voltage and warn if below low_bat_thresh
        pass

    def on_cmd_vel(self, msg: Twist):
        # TODO 6: Calculate effective scale factor (turbo=1.0, low_battery=*0.5) and publish scaled Twist
        pass

    def handle_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        # TODO 7: Enable turbo if request.data is True, otherwise eco mode
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

# 5. Re-create / overwrite Module 4 / Lesson 22 Task: m04_l22_02_task_multi_waypoint_patrol.py
cat << 'EOF' > "$WS_DIR/src/navpro_navigation/navpro_navigation/m04_l22_02_task_multi_waypoint_patrol.py"
#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Module 4 / Lesson 22 Task
Nav2 Multi-Waypoint Patrol Mission Planner
Task: m04_l22_02_task_multi_waypoint_patrol.py (alias: task_multi_waypoint_patrol)

TODO Instructions:
1. Initialize BasicNavigator from nav2_simple_commander.robot_navigator.
2. Define a list of patrol waypoints (geometry_msgs/PoseStamped).
3. Command the robot using navigator.followWaypoints(waypoints).
4. Monitor navigation feedback and log distance/time remaining.
"""

import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


class MultiWaypointPatrolTask(Node):

    def __init__(self):
        super().__init__('task_multi_waypoint_patrol')
        self.get_logger().info('Initializing Nav2 Waypoint Patrol Task...')

        # TODO 1: Instantiate BasicNavigator
        # self.navigator = BasicNavigator()

    def create_pose(self, x: float, y: float, yaw: float) -> PoseStamped:
        """Helper to create PoseStamped messages with correct frame_id and timestamp."""
        pose = PoseStamped()
        pose.header.frame_id = 'map'
        pose.header.stamp = self.get_clock().now().to_msg()
        pose.pose.position.x = x
        pose.pose.position.y = y
        import math
        pose.pose.orientation.z = math.sin(yaw / 2.0)
        pose.pose.orientation.w = math.cos(yaw / 2.0)
        return pose

    def run_patrol(self):
        # TODO 2: Define at least 3 warehouse patrol waypoints
        waypoints = []

        self.get_logger().info(f'Starting patrol across {len(waypoints)} waypoints...')
        # TODO 3: Dispatch navigation goal using followWaypoints
        # TODO 4: Loop while not isTaskComplete(), logging navigation feedback
        self.get_logger().info('Patrol mission completed!')


def main(args=None):
    rclpy.init(args=args)
    node = MultiWaypointPatrolTask()
    try:
        node.run_patrol()
    except KeyboardInterrupt:
        node.get_logger().warn('Patrol mission cancelled by user.')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
EOF

# Ensure all scripts are executable
chmod +x "$WS_DIR/src/navpro_basics/navpro_basics/"*.py 2>/dev/null || true
chmod +x "$WS_DIR/src/navpro_navigation/navpro_navigation/"*.py 2>/dev/null || true

# Reset Web Platform Progress State (legacy fallback)
if [ -d "$SCRIPT_DIR/../web" ]; then
    echo "-> Resetting web progress state in $SCRIPT_DIR/../web..."
    RESET_TIME=$(date +%s)
    echo "{\"last_reset\": $RESET_TIME, \"completed_lessons\": []}" > "$SCRIPT_DIR/../web/progress_state.json" 2>/dev/null || true
fi

echo "=================================================================="
echo "  [SUCCESS] Level 1 Workspace has been reset to clean boilerplate!"
echo "  Files are sorted in module & lesson order (m01_, m02_, m04_)."
echo "  Students can now source ROS 2 and build: colcon build --symlink-install"
echo "=================================================================="
