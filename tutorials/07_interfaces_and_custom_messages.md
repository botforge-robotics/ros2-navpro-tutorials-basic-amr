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

## 4. Creating Custom ROS 2 Interfaces - Step-by-Step

We build a dedicated CMake package (`navpro_interfaces`) containing custom message, service, and action definitions.

### Step 4.1: Create the Interface Package
```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_cmake navpro_interfaces
cd navpro_interfaces
mkdir -p msg srv action
```

### Step 4.2: Define Custom Message 1: `msg/Num.msg`
The simplest possible custom message contains a single primitive integer:
```text
int64 num
```

### Step 4.3: Define Custom Message 2: `msg/Sphere.msg` (Composed Message)
Interfaces can also import types from other ROS packages (e.g. `geometry_msgs`):
```text
geometry_msgs/Point center
float64 radius
```

### Step 4.4: Define Custom Service: `srv/AddThreeInts.srv`
In `.srv` files, three dashes `---` separate the **Request** from the **Response**:
```text
int64 a
int64 b
int64 c
---
int64 sum
```

### Step 4.5: Define Custom Action: `action/Fibonacci.action`
In `.action` files, three dashes `---` separate **Goal**, **Result**, and **Feedback**:
```text
int32 order
---
int32[] sequence
---
int32[] partial_sequence
```

---

## 5. Configuring `package.xml` & `CMakeLists.txt`

### 5.1 `package.xml` Configuration
Add the IDL code generation dependencies:

```xml
<?xml version="1.0"?>
<package format="3">
  <name>navpro_interfaces</name>
  <version>1.0.0</version>
  <description>Custom ROS 2 message, service, and action interfaces</description>
  <maintainer email="student@navpro.io">Student Engineer</maintainer>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_cmake</buildtool_depend>

  <!-- Required for IDL code generation -->
  <buildtool_depend>rosidl_default_generators</buildtool_depend>
  <exec_depend>rosidl_default_runtime</exec_depend>
  <member_of_group>rosidl_interface_packages</member_of_group>

  <!-- Dependencies for field types used in custom messages -->
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

find_package(ament_cmake REQUIRED)
find_package(rosidl_default_generators REQUIRED)
find_package(geometry_msgs REQUIRED)

# Generate language bindings for all custom IDL definitions
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/Num.msg"
  "msg/Sphere.msg"
  "msg/RobotStatus.msg"
  "srv/AddThreeInts.srv"
  "srv/SetSpeedMode.srv"
  "action/Fibonacci.action"
  "action/Patrol.action"
  DEPENDENCIES geometry_msgs
)

ament_package()
```

---

## 6. Building & Verifying Custom Interfaces with CLI

Build the interface package in your workspace:
```bash
cd ~/ros2_ws
colcon build --packages-select navpro_interfaces
source install/setup.bash
```

Use the `ros2 interface show` CLI command to verify that your custom types were compiled successfully:

```bash
# 1. View Num message definition
ros2 interface show navpro_interfaces/msg/Num
# Output:
# int64 num

# 2. View Sphere message definition
ros2 interface show navpro_interfaces/msg/Sphere
# Output:
# geometry_msgs/Point center
# float64 radius

# 3. View AddThreeInts service definition
ros2 interface show navpro_interfaces/srv/AddThreeInts
# Output:
# int64 a
# int64 b
# int64 c
# ---
# int64 sum

# 4. View Fibonacci action definition
ros2 interface show navpro_interfaces/action/Fibonacci
```

---

## 7. Using Custom Interfaces in Python Nodes

Now, any Python node in your workspace can import and use your custom types cleanly:

```python
#!/usr/bin/env python3
"""
Publishes custom Num.msg data at 1 Hz
"""
import rclpy
from rclpy.node import Node
from navpro_interfaces.msg import Num


class MinimalCustomPublisher(Node):

    def __init__(self):
        super().__init__('minimal_custom_publisher')
        self.publisher_ = self.create_publisher(Num, 'custom_num_topic', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.count = 0

    def timer_callback(self):
        msg = Num()
        msg.num = self.count
        self.publisher_.publish(msg)
        self.get_logger().info(f'Published custom Num: {msg.num}')
        self.count += 1


def main(args=None):
    rclpy.init(args=args)
    node = MinimalCustomPublisher()
    try:
        rclpy.spin(node)
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

