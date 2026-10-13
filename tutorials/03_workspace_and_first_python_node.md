# Lesson 03: ROS 2 Workspace & HelloWorld in Python

> **Focus:** Python-Only Robotics Engineering Workflow  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

In this lesson, you will master the foundational workflow of all ROS 2 Python development:
1. Understand the core terminologies: Nodes, Computational Graphs, and DDS Client Libraries (`rclpy`).
2. Demystify the ROS 2 workspace architecture: **Underlay** vs. **Overlay**, and the four workspace folders (`src/`, `build/`, `install/`, `log/`).
3. Master `colcon build` and learn why the `--symlink-install` flag is a game-changer for Python developers.
4. Write, explain line-by-line, build, and execute a production-grade Object-Oriented ROS 2 Python node.
5. Complete an interactive student challenge to modify node logging and timer frequency.

---

## 2. Core Terminologies: How ROS 2 Thinks

Before writing code, let's establish the mental model of ROS 2:

![ROS 2 Computational Graph & DDS Bus](../assets/images/ros2_graph_dds_bus.svg)

* **Node:** An independent software process dedicated to a single robotic task (e.g., read LiDAR data, compute kinematics, plan paths, stream video). A robotic system consists of tens or hundreds of interconnected nodes.
* **Graph:** The network of active nodes and the communication pathways connecting them.
* **Client Library (`rclpy`):** The Python API wrapper around the native ROS 2 C implementation (`rcl`). It provides classes for nodes, publishers, subscribers, services, and executors.
* **DDS (Data Distribution Service):** The underlying peer-to-peer messaging protocol handling data serialization, transport, and discovery without requiring a central coordinator.

---

## 3. The ROS 2 Workspace Architecture

A **Workspace** is a dedicated directory on your filesystem where you develop, build, and install custom ROS 2 packages.

```
ros2_ws/
├── src/        <-- SOURCE CODE: Your custom packages, git repos, and python scripts
├── build/      <-- BUILD CACHE: Intermediate compilation artifacts (managed by colcon)
├── install/    <-- RUNTIME OVERLAY: Where binaries, libraries, and launch scripts live
└── log/        <-- BUILD LOGS: stdout/stderr reports from colcon build operations
```

### 3.1 Underlays vs. Overlays
ROS 2 uses an **overlay** mechanism to isolate system software from project software:
* **The Underlay:** The core operating system installation (`/opt/ros/jazzy`). It contains system-level ROS 2 tools, standard message definitions, and Nav2 binaries.
* **The Overlay:** Your custom development workspace (`~/ros2_ws`). When you source `~/ros2_ws/install/setup.bash`, your workspace *overlays* the underlay, allowing you to use your custom packages or override system packages without breaking the operating system.

![ROS 2 Overlay vs Underlay Architecture](../assets/images/ros2_overlay_underlay.svg)

---

## 4. Step-by-Step: Creating a Workspace & First Python Node

Follow these steps directly in your terminal.

### Step 4.1: Initialize the Workspace Directory
```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build
```

Verify that the workspace directories were created:
```bash
ls ~/ros2_ws
# Output: build  install  log  src
```

### Step 4.2: Create a Pure Python Package
Use `ros2 pkg create` to scaffold a package. Specify `--build-type ament_python`:

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python --node-name hello_node navpro_hello_py
```

Let's inspect the generated directory layout:
```bash
tree navpro_hello_py/
```
*Output:*
```
navpro_hello_py/
├── navpro_hello_py/
│   ├── __init__.py
│   └── hello_node.py
├── package.xml
├── resource/
│   └── navpro_hello_py
├── setup.cfg
└── setup.py
```

---

## 5. Writing the Python Node: Code & Line-by-Line Breakdown

Open `~/ros2_ws/src/navpro_hello_py/navpro_hello_py/hello_node.py` in your code editor and update it to the production Object-Oriented structure below:

```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 03: First ROS 2 Python Node
Demonstrates the Object-Oriented rclpy Node architecture with periodic timers and logging.
"""

import rclpy
from rclpy.node import Node


class HelloWorldNode(Node):
    """
    Inherits from rclpy.node.Node.
    Every ROS 2 Python component should be written as a class.
    """

    def __init__(self):
        # Initialize parent Node with node name 'navpro_hello_node'
        super().__init__('navpro_hello_node')

        # Internal state variable
        self.counter_ = 0

        # Log initial startup message
        self.get_logger().info('Hello World! NavPro ROS 2 Python Node has booted.')

        # Create a periodic timer running at 1.0 Hz (every 1.0 second)
        # Parameters: (period_in_seconds, callback_function)
        self.timer_ = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        """Executed automatically every 1.0 second by the ROS 2 executor."""
        self.counter_ += 1
        self.get_logger().info(f'[Heartbeat #{self.counter_}] NavPro AMR is alive and operational.')


def main(args=None):
    # 1. Initialize ROS 2 DDS communications
    rclpy.init(args=args)

    # 2. Instantiate our custom node class
    node = HelloWorldNode()

    # 3. Spin the node: keeps the process alive and processes timer callbacks
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().warn('Keyboard interrupt detected! Shutting down gracefully...')
    finally:
        # 4. Clean up resources and destroy the node
        node.destroy_node()
        # 5. Shutdown the ROS 2 middleware
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

### 5.1 Comprehensive Line-by-Line Code Breakdown

| Code Line | Purpose & Explanation |
|---|---|
| `#!/usr/bin/env python3` | **Shebang:** Tells the Linux OS to execute this script using the active Python 3 interpreter. |
| `import rclpy` | Imports the core ROS 2 Python client library, providing initialization, spinning, and shutdown methods. |
| `from rclpy.node import Node` | Imports the base `Node` class. In ROS 2, nodes encapsulate all communication capabilities. |
| `class HelloWorldNode(Node):` | Defines our custom class inheriting from `Node`. This Object-Oriented design is the industry standard for encapsulation and state management. |
| `super().__init__('navpro_hello_node')` | Calls the parent constructor to register the node in the ROS graph under the unique name `'navpro_hello_node'`. |
| `self.get_logger().info(...)` | Uses the node's managed logger. Unlike plain `print()`, `get_logger()` prefixes timestamps, node names, and supports severity levels and redirection to `/rosout`. |
| `self.create_timer(1.0, callback)` | Registers a periodic hardware timer. The ROS 2 executor triggers `callback` every 1.0 second without blocking the thread. |
| `rclpy.init(args=args)` | Initializes the ROS 2 communications context and parses any ROS command-line arguments (e.g. remappings). Must be called once before instantiating nodes. |
| `rclpy.spin(node)` | Enters the event loop. Blocks the main thread and yields CPU execution to handle incoming timer ticks, subscriber messages, and service requests. |
| `node.destroy_node()` | Explicitly frees internal DDS handles, publishers, and timers. |
| `rclpy.shutdown()` | Shuts down the DDS middleware context cleanly before the Python process exits. |

---

## 6. Building and Symlink Installation

To make the node executable by ROS 2, we build the workspace using `colcon`.

### 6.1 The Power of `--symlink-install`
```bash
cd ~/ros2_ws
colcon build --symlink-install
```

> [!TIP]
> **Why `--symlink-install` is Essential for Python Developers:**  
> By default, `colcon build` copies your `.py` source files from `src/` into `install/`. If you modify a Python script, you would have to run `colcon build` again before changes take effect.  
> With `--symlink-install`, `colcon` creates a symbolic link (symlink) from `install/` directly pointing back to your source file in `src/`. **You can edit Python code and run it immediately without rebuilding!**

---

## 7. Execution & Verification

Open a new terminal (or Terminator split pane) and run:

```bash
# 1. Source the workspace overlay
source ~/ros2_ws/install/setup.bash

# 2. Run your new node
ros2 run navpro_hello_py hello_node
```

### Expected Output:
```
[INFO] [1718204921.120485] [navpro_hello_node]: Hello World! NavPro ROS 2 Python Node has booted.
[INFO] [1718204922.121304] [navpro_hello_node]: [Heartbeat #1] NavPro AMR is alive and operational.
[INFO] [1718204923.121541] [navpro_hello_node]: [Heartbeat #2] NavPro AMR is alive and operational.
[INFO] [1718204924.121702] [navpro_hello_node]: [Heartbeat #3] NavPro AMR is alive and operational.
```

In a second terminal, inspect the active node:
```bash
ros2 node list
# /navpro_hello_node

ros2 node info /navpro_hello_node
```

---

## 8. Hands-on Student Challenge

**Task:**
Modify `hello_node.py` to:
1. Increase the timer frequency from `1.0 Hz` to `5.0 Hz` (period = `0.2` seconds).
2. Add a simulated battery percentage that starts at `100.0%` and decreases by `0.5%` on every timer tick.
3. Log a warning with `self.get_logger().warn(...)` when the simulated battery drops below `20.0%`.

```python
# TODO: FILL IN CODE HERE inside hello_node.py
# 1. Change create_timer period to 0.2
# 2. self.battery = 100.0
# 3. Inside callback: self.battery -= 0.5
# 4. Check if self.battery < 20.0, use self.get_logger().warn(...)
```

Save your changes and re-run with `ros2 run navpro_hello_py hello_node`—notice how `--symlink-install` reflected your changes instantly!
