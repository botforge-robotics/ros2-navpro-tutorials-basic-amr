#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 08 Solution
Package: nexus_amr_basics
Launch:  m02_l08_02_solution_fleet_launch.py (alias: solution_fleet_launch)
================================================================================
"""

from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    # Step 1: Declare namespace launch argument
    robot_namespace_arg = DeclareLaunchArgument(
        'robot_namespace',
        default_value='amr_alpha',
        description='Top-level namespace for the multi-robot fleet'
    )
    robot_namespace = LaunchConfiguration('robot_namespace')

    # Step 2: Configure Heartbeat node
    heartbeat_node = Node(
        package='nexus_amr_basics',
        executable='amr_heartbeat',
        name='heartbeat_supervisor',
        namespace=robot_namespace,
        output='screen',
        emulate_tty=True
    )

    # Step 3: Configure Battery Monitor node
    battery_node = Node(
        package='nexus_amr_basics',
        executable='solution_battery_logger',
        name='battery_monitor',
        namespace=robot_namespace,
        output='screen',
        emulate_tty=True
    )

    # Step 4: Return configured LaunchDescription
    return LaunchDescription([
        robot_namespace_arg,
        heartbeat_node,
        battery_node,
    ])
