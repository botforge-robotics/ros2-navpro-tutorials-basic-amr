# Lesson 10: Runtime Management & Python Launch Files

> **Focus:** Python Launch System, Multi-Node Orchestration, Namespaces & Remappings  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapter 12.2 & Project 2.2)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

An autonomous robot rarely runs a single node. A standard AMR simultaneously executes hardware drivers, odometry estimators, SLAM filters, costmap generators, and safety watchdogs. Starting each node manually across 15 separate terminals is error-prone.

ROS 2 provides a programmatic **Python Launch System** to orchestrate multi-node lifecycles, inject YAML parameters, pass CLI arguments, and resolve topic name collisions.

By the end of this lesson, you will:
1. Understand the Python launch API: `LaunchDescription`, `Node`, `DeclareLaunchArgument`, and `LaunchConfiguration`.
2. Master **Topic Remappings** to rewire node inputs and outputs without modifying source code.
3. Use **Namespaces** to prevent topic collisions when deploying multiple robots.
4. Compose nested launch systems using `IncludeLaunchDescription`.
5. Complete **Project 2.2**: Build a unified multi-node robotics supervisor launch script.

---

## 2. The Python Launch Architecture

In ROS 1, launch files were written in XML (`.launch`). ROS 2 introduces pure **Python Launch Files** (`.launch.py`), allowing dynamic conditionals, loop constructs, and Python logic.

![ROS 2 Python Launch System Architecture](../assets/images/ros2_launch_architecture.svg)

---

## 3. Step-by-Step: Writing a Python Launch File

Let's build a modular launch file that brings up our teleop safety controller with configurable arguments and YAML loading.

Create file `src/navpro_basics/launch/teleop_supervisor.launch.py`:

```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 10
Launch Script: teleop_supervisor.launch.py
Demonstrates arguments, YAML loading, namespaces, and topic remappings.
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, LogInfo
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    """Entry point function required by all ROS 2 launch files."""

    # 1. Locate the package share directory where installed files reside
    pkg_share = get_package_share_directory('navpro_basics')
    default_config_path = os.path.join(pkg_share, 'config', 'teleop_params.yaml')

    # 2. Declare Launch Arguments (Configurable from the command line)
    config_file_arg = DeclareLaunchArgument(
        'config_file',
        default_value=default_config_path,
        description='Full path to YAML configuration file'
    )

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Use simulation (Gazebo) clock if true'
    )

    robot_namespace_arg = DeclareLaunchArgument(
        'robot_ns',
        default_value='',
        description='Top-level namespace for multi-robot isolation'
    )

    # 3. Define Node Actions to Launch
    speed_limiter_node = Node(
        package='navpro_basics',
        executable='task_teleop_speed_limiter',
        name='teleop_speed_limiter',
        namespace=LaunchConfiguration('robot_ns'),
        output='screen',
        emulate_tty=True,
        parameters=[
            LaunchConfiguration('config_file'),
            {'use_sim_time': LaunchConfiguration('use_sim_time')}
        ],
        # Remappings allow you to reconnect topic names dynamically!
        remappings=[
            # ('old_topic_name', 'new_topic_name')
            ('/input/cmd_vel', '/teleop/cmd_vel'),
        ]
    )

    # 4. Assemble and return the complete LaunchDescription
    return LaunchDescription([
        config_file_arg,
        use_sim_time_arg,
        robot_namespace_arg,
        LogInfo(msg=['Launching NavPro Teleop Supervisor with params: ', LaunchConfiguration('config_file')]),
        speed_limiter_node,
    ])
```

---

## 4. Key Launch Actions & Syntax Breakdown

| Launch Component | Function | Code Example |
|---|---|---|
| `get_package_share_directory('pkg')` | Locates the installation path where YAMLs and URDFs were copied | `os.path.join(pkg_dir, 'config', 'my.yaml')` |
| `DeclareLaunchArgument` | Exposes a CLI parameter with description and default value | `DeclareLaunchArgument('max_speed', default_value='1.0')` |
| `LaunchConfiguration` | Evaluates the argument substitution at runtime | `parameters=[{'speed': LaunchConfiguration('max_speed')}]` |
| `remappings=[(from, to)]` | Dynamically redirects a topic name without changing code | `remappings=[('/cmd_vel', '/navpro/cmd_vel')]` |
| `namespace='amr_1'` | Prefixes all nodes, topics, and services with a namespace | `/amr_1/cmd_vel`, `/amr_1/scan` |
| `output='screen'` | Forwards stdout/stderr directly to terminal with color coding | `output='screen', emulate_tty=True` |

---

## 5. Composition: Including Other Launch Files

In advanced systems, top-level launch files include sub-launch files using `IncludeLaunchDescription`:

```python
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource

# Include robot state publisher from navpro_description
rsp_launch = IncludeLaunchDescription(
    PythonLaunchDescriptionSource(
        os.path.join(get_package_share_directory('navpro_description'), 'launch', 'rsp.launch.py')
    ),
    launch_arguments={'use_sim_time': 'true'}.items()
)
```

---

## 6. Execution & CLI Overrides

Run your launch file:
```bash
ros2 launch navpro_basics teleop_supervisor.launch.py
```

### Passing Command-Line Overrides:
You can override any declared argument on the command line:

```bash
# 1. Override use_sim_time
ros2 launch navpro_basics teleop_supervisor.launch.py use_sim_time:=true

# 2. Deploy with a specific robot namespace for multi-robot isolation!
ros2 launch navpro_basics teleop_supervisor.launch.py robot_ns:=robot_alpha

# In a separate terminal, observe the namespace effect:
ros2 node list
# /robot_alpha/teleop_speed_limiter

ros2 topic list
# /robot_alpha/cmd_vel
# /robot_alpha/teleop/cmd_vel
```

---

## 7. Project 2.2: Multi-Node Supervisory Launch System

### Project Objective:
Build `navpro_system_bringup.launch.py` that launches:
1. `navpro_basics/publisher_explained` (remapped to `/teleop/cmd_vel`)
2. `navpro_basics/task_teleop_speed_limiter`
3. `navpro_basics/subscriber_explained` (listening to `/cmd_vel`)
4. An argument `enable_teleop_publisher` (default: `true`). Use `IfCondition` to only launch the teleop publisher if the flag is true!
