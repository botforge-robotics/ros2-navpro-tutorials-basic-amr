#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 09 Solution
Package: nexus_amr_basics
Launch:  m02_l09_03_solution_fleet_launch.py
================================================================================

COMPLETE SOLUTION:
------------------
Launches the full AMR core subsystem:
1. Ultrasonic Sensor Publisher (Lesson 05 - Pub)
2. Collision Monitor (Lesson 05 - Sub)
3. Emergency Stop Service Server (Lesson 07 - Service)
4. Parameterized Controller Node with YAML Parameter Loading (Lesson 08 - Params)
All running under an isolated robot namespace.
================================================================================
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, LogInfo
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_share = get_package_share_directory('nexus_amr_basics')
    default_config = os.path.join(pkg_share, 'config', 'teleop_params.yaml')
    if not os.path.exists(default_config):
        source_config = os.path.expanduser('~/ros2_ws/src/nexus_amr_basics/config/teleop_params.yaml')
        if os.path.exists(source_config):
            default_config = source_config

    namespace_arg = DeclareLaunchArgument(
        'robot_namespace',
        default_value='amr_alpha',
        description='Robot top-level namespace'
    )

    config_arg = DeclareLaunchArgument(
        'config_file',
        default_value=default_config,
        description='Path to YAML parameters configuration'
    )

    robot_ns = LaunchConfiguration('robot_namespace')
    config_file = LaunchConfiguration('config_file')

    # Node 1: Ultrasonic Sensor Publisher (Lesson 05)
    ultrasonic_node = Node(
        package='nexus_amr_basics',
        executable='ultrasonic_publisher',
        name='ultrasonic_publisher',
        namespace=robot_ns,
        output='screen'
    )

    # Node 2: Collision Monitor Subscriber (Lesson 05)
    collision_node = Node(
        package='nexus_amr_basics',
        executable='collision_monitor',
        name='collision_monitor',
        namespace=robot_ns,
        output='screen'
    )

    # Node 3: Emergency Stop Service Server (Lesson 07)
    estop_node = Node(
        package='nexus_amr_basics',
        executable='emergency_stop_server',
        name='emergency_stop_server',
        namespace=robot_ns,
        output='screen'
    )

    # Node 4: Parameterized Controller Node with YAML Parameters (Lesson 08)
    param_node = Node(
        package='nexus_amr_basics',
        executable='param_node_explained',
        name='parameterized_controller',
        namespace=robot_ns,
        parameters=[config_file],
        output='screen'
    )

    return LaunchDescription([
        namespace_arg,
        config_arg,
        LogInfo(msg=['[Launch] Starting Full AMR Stack for robot: ', robot_ns]),
        ultrasonic_node,
        collision_node,
        estop_node,
        param_node
    ])
