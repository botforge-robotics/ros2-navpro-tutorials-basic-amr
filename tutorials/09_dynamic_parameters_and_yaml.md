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

## 3. Step-by-Step: Declaring Parameters in Python

Let's build a parameter-driven node with validation.

Create file `parameter_controller.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 09
Dynamic Parameters: Declares, validates, and responds to runtime configuration changes.
"""

import rclpy
from rclpy.node import Node
from rcl_interfaces.msg import ParameterDescriptor, ParameterType, SetParametersResult


class ParameterizedController(Node):

    def __init__(self):
        super().__init__('parameterized_controller')

        # -------------------------------------------------------------
        # 1. Parameter Declaration with Descriptors
        # -------------------------------------------------------------
        # String parameter
        robot_id_desc = ParameterDescriptor(
            description='Unique factory serial identifier of the AMR',
            type=ParameterType.PARAMETER_STRING
        )
        self.declare_parameter('robot_id', 'navpro-mini-42', robot_id_desc)

        # Float parameter with logical limits
        max_speed_desc = ParameterDescriptor(
            description='Maximum allowable linear speed in meters/second',
            type=ParameterType.PARAMETER_DOUBLE
        )
        self.declare_parameter('max_linear_speed', 0.5, max_speed_desc)

        # Boolean parameter
        safety_brake_desc = ParameterDescriptor(
            description='Enforce ultrasonic proximity safety brake',
            type=ParameterType.PARAMETER_BOOL
        )
        self.declare_parameter('enable_proximity_brake', True, safety_brake_desc)

        # -------------------------------------------------------------
        # 2. Retrieve Initial Values
        # -------------------------------------------------------------
        self.robot_id = self.get_parameter('robot_id').value
        self.max_speed = self.get_parameter('max_linear_speed').value
        self.brake_enabled = self.get_parameter('enable_proximity_brake').value

        self.get_logger().info(
            f'Loaded Params | ID: {self.robot_id} | MaxSpeed: {self.max_speed} m/s | Brake: {self.brake_enabled}'
        )

        # -------------------------------------------------------------
        # 3. Register Dynamic Parameter Change Callback
        # -------------------------------------------------------------
        self.add_on_set_parameters_callback(self.parameter_validation_callback)

    def parameter_validation_callback(self, params):
        """
        Executed automatically whenever a user runs `ros2 param set`.
        Allows the node to validate constraints and REJECT invalid values!
        """
        for param in params:
            if param.name == 'max_linear_speed':
                # Enforce physical safety constraint: speed must be between 0.05 and 1.5 m/s
                if param.value <= 0.0 or param.value > 1.5:
                    self.get_logger().error(f'Rejected invalid speed: {param.value}. Must be in range (0.0, 1.5]!')
                    return SetParametersResult(
                        successful=False,
                        reason="max_linear_speed must be between 0.01 and 1.5 m/s"
                    )
                self.max_speed = param.value
                self.get_logger().info(f'UPDATED max_linear_speed to: {self.max_speed} m/s')

            elif param.name == 'enable_proximity_brake':
                self.brake_enabled = param.value
                self.get_logger().warn(f'UPDATED enable_proximity_brake to: {self.brake_enabled}')

        return SetParametersResult(successful=True, reason="Parameters applied successfully")


def main():
    rclpy.init()
    node = ParameterizedController()
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
