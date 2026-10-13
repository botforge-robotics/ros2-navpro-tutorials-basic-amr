#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 2
Launch File: display.launch.py
Visualizes the robot in RViz2 with joint sliders to verify URDF kinematics.
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_share = get_package_share_directory('navpro_description')
    rsp_launch_path = os.path.join(pkg_share, 'launch', 'rsp.launch.py')
    rviz_config_path = os.path.join(pkg_share, 'rviz', 'robot_model.rviz')

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Use simulation (Gazebo) clock if true'
    )

    # 1. Include Robot State Publisher
    rsp_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(rsp_launch_path),
        launch_arguments={'use_sim_time': LaunchConfiguration('use_sim_time')}.items()
    )

    # 2. Joint State Publisher GUI
    joint_state_publisher_gui_node = Node(
        package='joint_state_publisher_gui',
        executable='joint_state_publisher_gui',
        name='joint_state_publisher_gui',
        output='screen'
    )

    # 3. RViz2 Visualizer
    rviz2_node = Node(
        package='rviz2',
        executable='rviz2',
        name='rviz2',
        output='screen',
        arguments=['-d', rviz_config_path]
    )

    return LaunchDescription([
        use_sim_time_arg,
        rsp_launch,
        joint_state_publisher_gui_node,
        rviz2_node
    ])
