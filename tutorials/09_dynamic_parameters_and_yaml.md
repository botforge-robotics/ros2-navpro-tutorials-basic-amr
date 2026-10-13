# Lesson 09: Communication Mechanism III: Dynamic Parameters & YAML Configuration

> **Focus:** Node Parameters, Validation Callbacks (`SetParametersResult`) & YAML Files  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapter 11.2)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Hardcoding numeric thresholds, robot dimensions, or PID gains in Python scripts is an anti-pattern. In ROS 2, **Parameters** allow configuration values to be injected into nodes at startup (via YAML files or launch arguments) and dynamically modified at runtime without stopping the process.

By the end of this lesson, you will:
1. Understand how ROS 2 parameters are scoped per-node (eliminating the centralized ROS 1 parameter server).
2. Declare typed parameters with `ParameterDescriptor` metadata and range constraints.
3. Implement dynamic runtime parameter validation using `add_on_set_parameters_callback` and `SetParametersResult`.
4. Structure industry-standard `.yaml` configuration files and load them at launch.
5. Use CLI tools (`ros2 param list`, `get`, `set`, `dump`) to tune live running robots.

---

## 2. ROS 1 vs. ROS 2 Parameter Architecture

![ROS 1 vs. ROS 2 Parameter Architecture](../assets/images/ros1_vs_ros2_params.svg)

---

---

## 3. Building a Parameterized Node (Python) - Step-by-Step

We begin with `m02_l09_01_minimal_param_node.py`. It declares a parameter named `'my_parameter'` with default value `'world'` and logs it periodically.

```python
#!/usr/bin/env python3
"""
NavPro Robotics: MinimalParam
Demonstrates parameter declaration, runtime query, and dynamic reconfiguration.
"""

import rclpy
from rclpy.node import Node


class MinimalParam(Node):

    def __init__(self):
        super().__init__('minimal_param_node')

        # 1. Declare parameter 'my_parameter' with default value 'world'
        # The data type (string) is automatically inferred from the default value
        self.declare_parameter('my_parameter', 'world')

        # 2. Create timer running every 1.0 second
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.get_logger().info('MinimalParam node initialized.')

    def timer_callback(self):
        # 3. Retrieve the current value of the parameter dynamically
        my_param = self.get_parameter('my_parameter').get_parameter_value().string_value

        self.get_logger().info(f'Hello {my_param}!')


def main(args=None):
    rclpy.init(args=args)
    node = MinimalParam()
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
| `self.declare_parameter('my_parameter', 'world')` | Enforce parameter registration and schema. | In ROS 2, nodes must declare parameters before accessing them. This enforces type safety and prevents arbitrary misconfigurations. |
| `self.get_parameter('my_parameter').get_parameter_value().string_value` | Read live parameter value from node storage. | `get_parameter()` returns a `Parameter` object. Calling `get_parameter_value().string_value` unpacks the typed string representation. |
| `ros2 param set /minimal_param_node my_parameter earth` | Modify parameter value dynamically from outside process. | DDS dispatches parameter change events without requiring process restarts. Next time `timer_callback` runs, it immediately logs `Hello earth!`. |

---

## 4. Parameter Descriptors & Dynamic Validation (Robotics Safety)

In robotics systems, you often need to attach formal descriptions and reject invalid values (e.g. negative speeds) using `add_on_set_parameters_callback`:

```python
from rcl_interfaces.msg import ParameterDescriptor, ParameterType, SetParametersResult

class ParameterizedSafetyNode(Node):
    def __init__(self):
        super().__init__('parameterized_safety_node')

        # Formal descriptor for documentation
        desc = ParameterDescriptor(description='Maximum allowable linear speed (m/s)')
        self.declare_parameter('max_speed', 0.5, desc)

        # Register validation callback
        self.add_on_set_parameters_callback(self.validate_params)

    def validate_params(self, params):
        for param in params:
            if param.name == 'max_speed':
                if param.value <= 0.0 or param.value > 2.0:
                    self.get_logger().error(f'Rejected invalid speed: {param.value}')
                    return SetParametersResult(successful=False, reason="Speed must be in (0.0, 2.0]")
        return SetParametersResult(successful=True, reason="Valid parameters")
```

---


## 4. Organizing Configuration with YAML Files

In production, robots load parameter hierarchies from YAML files rather than setting them one-by-one.

### Structure of ROS 2 YAML Files:
```yaml
# Package: navpro_basics
# File: config/teleop_params.yaml

parameterized_controller:        # MUST match the node name registered in super().__init__()
  ros__parameters:               # Note the double underscore!
    robot_id: "navpro-wh-01"
    max_linear_speed: 0.75
    enable_proximity_brake: true
```

### Loading YAML via the CLI:
```bash
ros2 run navpro_basics param_node_explained --ros-args --params-file src/navpro_basics/config/teleop_params.yaml
```

---

## 5. Parameter Inspection with the CLI

With the node running in Terminal 1, open Terminal 2:

```bash
# 1. List all parameters exposed by all running nodes
ros2 param list

# 2. Get current value of a parameter
ros2 param get /parameterized_controller max_linear_speed
# Integer: 0.5

# 3. Dynamically modify a parameter at runtime
ros2 param set /parameterized_controller max_linear_speed 1.2
# Set parameter successful

# 4. Verify parameter validation rejects out-of-bounds values!
ros2 param set /parameterized_controller max_linear_speed 99.0
# Setting parameter failed: max_linear_speed must be between 0.01 and 1.5 m/s

# 5. Dump all live parameters of a node to a YAML file
ros2 param dump /parameterized_controller
```

---

## 6. Hands-on Student Challenge

**Task:**
1. In your controller node, add an integer parameter `'control_frequency_hz'` (default = `20`).
2. In the validation callback, verify that `'control_frequency_hz'` is between `1` and `100` Hz.
3. Write a timer that uses `1.0 / self.control_frequency_hz` as its period.
4. Test changing the frequency from the CLI using `ros2 param set`.
