#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1
Launch File: teleop_supervisor.launch.py
Launches the teleop_speed_limiter node with configurable parameters and YAML loading.
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, LogInfo
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_share = get_package_share_directory('navpro_basics')
    default_config_path = os.path.join(pkg_share, 'config', 'teleop_params.yaml')

    # Declare arguments
    config_file_arg = DeclareLaunchArgument(
        'config_file',
        default_value=default_config_path,
        description='Path to the YAML parameters file'
    )

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Use simulation (Gazebo) clock if true'
    )

    # Node action
    speed_limiter_node = Node(
        package='navpro_basics',
        executable='task_teleop_speed_limiter',
        name='teleop_speed_limiter',
        output='screen',
        parameters=[
            LaunchConfiguration('config_file'),
            {'use_sim_time': LaunchConfiguration('use_sim_time')}
        ],
        remappings=[
            ('/input/cmd_vel', '/teleop/cmd_vel'),
        ]
    )

    return LaunchDescription([
        config_file_arg,
        use_sim_time_arg,
        LogInfo(msg=['Launching NavPro Teleop Supervisor with params: ', LaunchConfiguration('config_file')]),
        speed_limiter_node
    ])
