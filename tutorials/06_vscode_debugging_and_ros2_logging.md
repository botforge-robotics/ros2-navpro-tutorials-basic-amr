# Lesson 06: VS Code IDE Tooling & ROS 2 Logging Framework

> **Focus:** Productivity Configuration (`tasks.json`, `settings.json`) & Industrial Logging  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapters 7, 8.4 & 9)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Writing robust robotics software requires fast feedback loops: one-key compilation, IntelliSense autocompletion for ROS message types, and contextual logging that doesn't spam your terminal.

By the end of this lesson, you will:
1. Configure VS Code with `.vscode/tasks.json` to trigger `colcon build` with `Ctrl + Shift + B`.
2. Configure `.vscode/settings.json` so Python language servers resolve ROS 2 packages (`rclpy`, `geometry_msgs`).
3. Master the ROS 2 Logging Framework: understand why standard `print()` is forbidden in production robotics.
4. Use all five logging severity levels: `DEBUG`, `INFO`, `WARN`, `ERROR`, and `FATAL`.
5. Implement throttled logging (`throttle_duration_sec`) and one-shot logging to avoid CPU and terminal bloat.

---

## 2. VS Code IDE Configuration for ROS 2 Python

To enable code autocompletion and one-click build tasks in VS Code, create a `.vscode` folder in your workspace root (`~/ros2_ws/.vscode/`).

### 2.1 Workspace Settings (`.vscode/settings.json`)
This file points the Python analyzer to both the core ROS 2 underlay and your workspace install overlay:

```json
{
  "python.autoComplete.extraPaths": [
    "/opt/ros/jazzy/lib/python3.12/site-packages",
    "${workspaceFolder}/install/navpro_basics/lib/python3.12/site-packages",
    "${workspaceFolder}/install/navpro_description/lib/python3.12/site-packages",
    "${workspaceFolder}/install/navpro_navigation/lib/python3.12/site-packages"
  ],
  "python.analysis.extraPaths": [
    "/opt/ros/jazzy/lib/python3.12/site-packages",
    "${workspaceFolder}/install/navpro_basics/lib/python3.12/site-packages",
    "${workspaceFolder}/install/navpro_description/lib/python3.12/site-packages",
    "${workspaceFolder}/install/navpro_navigation/lib/python3.12/site-packages"
  ],
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "files.associations": {
    "*.xacro": "xml",
    "*.urdf": "xml"
  }
}
```

### 2.2 Colcon Build Tasks (`.vscode/tasks.json`)
Allows you to press `Ctrl + Shift + B` inside VS Code to instantly build your workspace:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "colcon: build (symlink-install)",
      "type": "shell",
      "command": "colcon build --symlink-install",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": [],
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "colcon: clean build artifacts",
      "type": "shell",
      "command": "rm -rf build install log",
      "problemMatcher": []
    }
  ]
}
```

---

## 3. The ROS 2 Logging Framework

### 3.1 Why `print()` is Forbidden in Production
In Python scripts, developers often use `print("Robot moving")`. In production robotics, this creates critical problems:
1. **No Timestamp:** You cannot tell when an event occurred during a post-mortem crash analysis.
2. **No Node Source:** In a multi-node system with 50 nodes running, `print()` outputs are mixed together with no way to identify which node printed what.
3. **No Centralized Aggregation:** `print()` writes to stdout. ROS 2 logger writes to the `/rosout` topic, enabling remote telemetry dashboards and fleet servers to monitor errors across a factory floor.
4. **No Severity Filtering:** You cannot disable high-frequency debug prints in production without modifying source code.

---

## 4. The Five Logging Severity Levels

```
                     LOGGING SEVERITY HIERARCHY
                     
   [DEBUG]  --> Granular diagnostic data (raw sensor values, loop ticks)
      |
   [INFO]   --> Normal operational state changes (arrived at waypoint)
      |
   [WARN]   --> Recoverable anomalies (battery < 20%, low WiFi signal)
      |
   [ERROR]  --> Component failures (laser sensor timeout, planner abort)
      |
   [FATAL]  --> Critical emergency (hardware estop triggered, motor burned)
```

### 4.1 Python Implementation Example

```python
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node


class LoggingMasteryNode(Node):

    def __init__(self):
        super().__init__('logging_mastery_node')

        # 1. Standard Info Log
        self.get_logger().info('NavPro AMR Diagnostic System Initialized.')

        # 2. Debug Log (Visible only if log level is set to DEBUG)
        raw_encoder_ticks = 4096
        self.get_logger().debug(f'Encoder calibration register: 0x{raw_encoder_ticks:04X}')

        # 3. Warning Log (Colorized Yellow in terminal)
        battery_pct = 18.5
        if battery_pct < 20.0:
            self.get_logger().warn(f'Battery level low: {battery_pct:.1f}% remaining!')

        # 4. Error Log (Colorized Red in terminal)
        sensor_connected = False
        if not sensor_connected:
            self.get_logger().error('LiDAR communication timeout on /dev/ttyUSB0!')

        # 5. Fatal Log (Colorized Bold Red / Highlighted)
        emergency_circuit_broken = True
        if emergency_circuit_broken:
            self.get_logger().fatal('HARDWARE SAFETY INTERLOCK BROKEN: SYSTEM HALTED!')


def main():
    rclpy.init()
    node = LoggingMasteryNode()
    rclpy.spin_once(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

## 5. Throttled & One-Shot Logging

High-frequency control loops (e.g. 50 Hz motor loops) should not print every iteration, as doing so floods terminal buffers and consumes significant CPU.

### 5.1 Throttling by Duration:
```python
def control_loop(self):
    # Logs at most once every 2.0 seconds, regardless of how often this loop runs!
    self.get_logger().info(
        f'Robot pose: x={self.x:.2f}, y={self.y:.2f}',
        throttle_duration_sec=2.0
    )
```

### 5.2 One-Shot Logging:
```python
def on_network_connect(self):
    # Prints exactly once during the entire lifetime of the node
    self.get_logger().info('DDS discovery handshake completed with Fleet Server.', once=True)
```

---

## 6. Runtime Log Level Configuration

You can change the logging verbosity level of any node from the command line without recompiling code:

```bash
# Launch node with DEBUG messages enabled:
ros2 run navpro_basics logging_node --ros-args --log-level debug

# Launch node displaying only WARNINGS and higher (suppressing INFO):
ros2 run navpro_basics logging_node --ros-args --log-level warn
```

---

## 7. Hands-on Student Challenge

**Task:**
1. Open `.vscode/tasks.json` in your workspace and test building using the shortcut `Ctrl + Shift + B`.
2. Write a Python script `log_demo.py` that runs a 20 Hz timer (period = 0.05s).
3. Use `throttle_duration_sec=1.5` to log a heartbeat message every 1.5 seconds.
4. Verify that running with `--ros-args --log-level warn` suppresses the heartbeat log.
