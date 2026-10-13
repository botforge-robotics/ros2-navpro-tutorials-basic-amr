# Lesson 07: ROS 2 Interfaces & Custom Messages/Services

> **Focus:** Interface Architecture, Standard Message Libraries & Building Custom `.msg`, `.srv`, `.action` Packages  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapters 10 & 13)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

In ROS 2, nodes achieve language-agnostic interoperability because they communicate using strictly typed **Interfaces**. An interface defined once in an IDL (Interface Definition Language) file is automatically compiled into native Python classes and C++ structs.

By the end of this lesson, you will:
1. Understand the hierarchy of standard ROS 2 message libraries (`std_msgs`, `geometry_msgs`, `sensor_msgs`, `nav_msgs`).
2. Learn the golden architectural rule: **Why interface packages must use `ament_cmake` even when consuming them in pure Python**.
3. Create custom message (`.msg`), service (`.srv`), and action (`.action`) definitions.
4. Configure `CMakeLists.txt` with `rosidl_generate_interfaces` and `package.xml`.
5. Import and instantiate custom interfaces in a production Python node.

---

## 2. Standard ROS 2 Interface Libraries

Before creating custom messages, always verify if a standardized ROS message already exists:

| Library | Key Interface Types | Primary Use Case |
|---|---|---|
| **`std_msgs`** | `Bool`, `Float32`, `Int32`, `String`, `Header` | Primitive data types and timestamps. |
| **`geometry_msgs`** | `Point`, `Quaternion`, `Pose`, `PoseStamped`, `Twist` | 2D/3D spatial coordinates, orientations, velocities. |
| **`sensor_msgs`** | `LaserScan`, `Image`, `Imu`, `BatteryState`, `JointState` | Raw sensor telemetry from cameras, LiDARs, IMUs. |
| **`nav_msgs`** | `Odometry`, `OccupancyGrid`, `Path` | SLAM 2D occupancy grid maps, robot odometry, paths. |

---

## 3. The Custom Interface Architecture Rule

> [!IMPORTANT]
> **ROS 2 Custom Interfaces Must Be Built Using `ament_cmake`:**  
> The ROS 2 IDL generator (`rosidl`) compiles `.msg` and `.srv` files into C, C++, and Python bindings. The IDL generator plugins require CMake.  
> Therefore, industry best practice is to create a dedicated interface package (e.g., `navpro_interfaces`) built with `ament_cmake`. Your Python packages (`navpro_basics`, `navpro_navigation`) simply add `<depend>navpro_interfaces</depend>` to their `package.xml` and import the generated classes cleanly.

![Interface IDL Pipeline](../assets/images/interface_idl_pipeline.svg)

---

## 4. Step-by-Step: Creating the `navpro_interfaces` Package

### Step 4.1: Create the CMake Package
```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_cmake navpro_interfaces
```

Create interface subdirectories:
```bash
mkdir -p navpro_interfaces/msg
mkdir -p navpro_interfaces/srv
mkdir -p navpro_interfaces/action
```

### Step 4.2: Define Custom Message (`msg/RobotStatus.msg`)
Create `navpro_interfaces/msg/RobotStatus.msg`:
```
# Header contains timestamp and coordinate frame ID
std_msgs/Header header

# Identity and operational metrics
string robot_id
float32 battery_percentage
float32 internal_temperature_celsius
bool is_docked
bool emergency_stop_latched

# Operating mode constants
uint8 MODE_MANUAL_TELEOP = 0
uint8 MODE_AUTONOMOUS_NAV = 1
uint8 MODE_CHARGING = 2
uint8 active_mode
```

### Step 4.3: Define Custom Service (`srv/SetSpeedMode.srv`)
In `.srv` files, three dashes `---` separate the **Request** from the **Response**.

Create `navpro_interfaces/srv/SetSpeedMode.srv`:
```
# Request
string speed_mode       # e.g., "ECO", "STANDARD", "TURBO"
float32 custom_multiplier
---
# Response
bool success
string message
float32 effective_max_linear_speed
```

### Step 4.4: Define Custom Action (`action/Patrol.action`)
In `.action` files, three dashes `---` separate **Goal**, **Result**, and **Feedback**.

Create `navpro_interfaces/action/Patrol.action`:
```
# Goal
geometry_msgs/PoseStamped[] waypoints
uint32 loop_count
---
# Result
bool success
uint32 completed_waypoints
float32 total_distance_traveled
---
# Feedback
uint32 current_waypoint_index
float32 distance_to_next_waypoint
float32 battery_remaining_pct
```

---

## 5. Configuring `package.xml` & `CMakeLists.txt`

### 5.1 `package.xml` Configuration
Add the IDL generator and runtime dependencies:

```xml
<?xml version="1.0"?>
<package format="3">
  <name>navpro_interfaces</name>
  <version>1.0.0</version>
  <description>Custom ROS 2 message, service, and action interfaces for NavPro AMR</description>
  <maintainer email="engineer@navpro.io">NavPro Robotics</maintainer>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_cmake</buildtool_depend>

  <!-- Required for IDL code generation -->
  <buildtool_depend>rosidl_default_generators</buildtool_depend>
  <exec_depend>rosidl_default_runtime</exec_depend>
  <member_of_group>rosidl_interface_packages</member_of_group>

  <!-- Dependencies for field types used in custom messages -->
  <depend>std_msgs</depend>
  <depend>geometry_msgs</depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
```

### 5.2 `CMakeLists.txt` Configuration
```cmake
cmake_minimum_required(VERSION 3.8)
project(navpro_interfaces)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(rosidl_default_generators REQUIRED)
find_package(std_msgs REQUIRED)
find_package(geometry_msgs REQUIRED)

# Generate language bindings for all custom IDL definitions
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/RobotStatus.msg"
  "srv/SetSpeedMode.srv"
  "action/Patrol.action"
  DEPENDENCIES std_msgs geometry_msgs
)

ament_package()
```

---

## 6. Building & Verifying Interfaces with CLI

Build the interface package:
```bash
cd ~/ros2_ws
colcon build --packages-select navpro_interfaces
source install/setup.bash
```

Use `ros2 interface` CLI commands to inspect generated types:

```bash
# 1. View structure of our custom message
ros2 interface show navpro_interfaces/msg/RobotStatus

# 2. View structure of our custom service
ros2 interface show navpro_interfaces/srv/SetSpeedMode

# 3. View structure of our custom action
ros2 interface show navpro_interfaces/action/Patrol
```

---

## 7. Using Custom Interfaces in a Python Node

Now, any Python node in your workspace can import and publish this message type:

```python
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from navpro_interfaces.msg import RobotStatus


class StatusBroadcasterNode(Node):

    def __init__(self):
        super().__init__('status_broadcaster_node')
        self.pub_ = self.create_publisher(RobotStatus, '/navpro/status', 10)
        self.timer_ = self.create_timer(1.0, self.publish_status)

    def publish_status(self):
        msg = RobotStatus()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'base_footprint'
        msg.robot_id = 'NAVPRO-AMR-402'
        msg.battery_percentage = 94.2
        msg.internal_temperature_celsius = 38.5
        msg.is_docked = False
        msg.emergency_stop_latched = False
        msg.active_mode = RobotStatus.MODE_AUTONOMOUS_NAV

        self.pub_.publish(msg)
        self.get_logger().info(f'Published Status: {msg.robot_id} | Batt: {msg.battery_percentage}%')


def main():
    rclpy.init()
    node = StatusBroadcasterNode()
    try:
        rclpy.spin(node)
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```
