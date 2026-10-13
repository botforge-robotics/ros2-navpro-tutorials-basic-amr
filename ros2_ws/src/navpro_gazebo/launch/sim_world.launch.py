#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 2 & 3
Launch File: sim_world.launch.py
Launches Gazebo simulation environment and spawns the NavPro AMR.
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, IncludeLaunchDescription, AppendEnvironmentVariable
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_gazebo = get_package_share_directory('navpro_gazebo')
    pkg_description = get_package_share_directory('navpro_description')
    pkg_gazebo_ros = get_package_share_directory('gazebo_ros')

    default_world = os.path.join(pkg_gazebo, 'worlds', 'warehouse_obstacle_world.world')

    # Declare arguments
    world_arg = DeclareLaunchArgument(
        'world',
        default_value=default_world,
        description='Path to the Gazebo world file'
    )

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='true',
        description='Use simulation clock'
    )

    gui_arg = DeclareLaunchArgument(
        'gui',
        default_value='true',
        description='Launch Gazebo GUI client'
    )

    # 1. Gazebo Server
    gzserver = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(pkg_gazebo_ros, 'launch', 'gzserver.launch.py')),
        launch_arguments={
            'world': LaunchConfiguration('world'),
            'verbose': 'true'
        }.items()
    )

    # 2. Gazebo Client (GUI)
    gzclient = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(pkg_gazebo_ros, 'launch', 'gzclient.launch.py')),
        launch_arguments={'verbose': 'true'}.items()
    )

    # 3. Robot State Publisher (RSP)
    rsp_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(pkg_description, 'launch', 'rsp.launch.py')),
        launch_arguments={'use_sim_time': LaunchConfiguration('use_sim_time')}.items()
    )

    # 4. Spawn Robot Entity in Gazebo
    spawn_robot = Node(
        package='gazebo_ros',
        executable='spawn_entity.py',
        name='spawn_navpro_robot',
        output='screen',
        arguments=[
            '-topic', 'robot_description',
            '-entity', 'navpro_mini',
            '-x', '0.0',
            '-y', '0.0',
            '-z', '0.05'
        ]
    )

    return LaunchDescription([
        world_arg,
        use_sim_time_arg,
        gui_arg,
        gzserver,
        gzclient,
        rsp_launch,
        spawn_robot
    ])
