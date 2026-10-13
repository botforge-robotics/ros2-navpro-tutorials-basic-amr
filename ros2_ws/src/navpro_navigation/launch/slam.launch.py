#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 3
Launch File: slam.launch.py
Launches SLAM Toolbox for online 2D mapping and loop closure.
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_nav = get_package_share_directory('navpro_navigation')
    pkg_desc = get_package_share_directory('navpro_description')

    default_slam_params = os.path.join(pkg_nav, 'config', 'slam_toolbox.yaml')
    default_rviz_config = os.path.join(pkg_desc, 'rviz', 'robot_model.rviz')

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='true',
        description='Use simulation (Gazebo) clock'
    )

    slam_params_arg = DeclareLaunchArgument(
        'slam_params_file',
        default_value=default_slam_params,
        description='Path to SLAM Toolbox configuration file'
    )

    # SLAM Toolbox Node
    slam_node = Node(
        package='slam_toolbox',
        executable='async_slam_toolbox_node',
        name='slam_toolbox',
        output='screen',
        parameters=[
            LaunchConfiguration('slam_params_file'),
            {'use_sim_time': LaunchConfiguration('use_sim_time')}
        ]
    )

    # RViz2 Node
    rviz_node = Node(
        package='rviz2',
        executable='rviz2',
        name='rviz2_slam',
        output='screen',
        arguments=['-d', default_rviz_config]
    )

    return LaunchDescription([
        use_sim_time_arg,
        slam_params_arg,
        slam_node,
        rviz_node
    ])
