#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 08
Package: nexus_amr_basics
Launch:  m02_l09_01_amr_subsystem.launch.py (alias: teleop_supervisor.launch.py)
================================================================================

WHAT THIS LAUNCH FILE DOES:
---------------------------
Orchestrates the core AMR subsystem by launching:
1. The Parameterized Controller node (`param_node_explained`) created in Lesson 08,
   injecting YAML configuration parameters from `teleop_params.yaml`.
2. The Emergency Stop Service Server (`emergency_stop_server`) created in Lesson 07.
3. Exposes configurable runtime arguments for `robot_namespace` and `config_file`.
================================================================================
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, LogInfo
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    """
    Mandatory entry point for ROS 2 Python launch files.
    Returns a LaunchDescription defining the execution pipeline.
    """
    # --------------------------------------------------------------------------
    # 1. RESOLVE CONFIGURATION PATHS VIA AMENT INDEX
    # --------------------------------------------------------------------------
    pkg_share = get_package_share_directory('nexus_amr_basics')
    default_config_path = os.path.join(pkg_share, 'config', 'teleop_params.yaml')
    if not os.path.exists(default_config_path):
        source_config = os.path.expanduser('~/ros2_ws/src/nexus_amr_basics/config/teleop_params.yaml')
        if os.path.exists(source_config):
            default_config_path = source_config

    # --------------------------------------------------------------------------
    # 2. DECLARE RECONFIGURABLE LAUNCH ARGUMENTS
    # --------------------------------------------------------------------------
    config_file_arg = DeclareLaunchArgument(
        'config_file',
        default_value=default_config_path,
        description='Absolute path to the YAML parameters file (from Lesson 08)'
    )

    namespace_arg = DeclareLaunchArgument(
        'robot_namespace',
        default_value='nexus_amr',
        description='Top-level namespace for multi-robot isolation'
    )

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Synchronize clock with Gazebo simulator /clock'
    )

    # --------------------------------------------------------------------------
    # 3. LAUNCH ACTION 1: PARAMETERIZED CONTROLLER NODE (From Lesson 08)
    # --------------------------------------------------------------------------
    param_controller_node = Node(
        package='nexus_amr_basics',
        executable='param_node_explained',
        name='parameterized_controller',
        namespace=LaunchConfiguration('robot_namespace'),
        output='screen',
        emulate_tty=True,
        parameters=[
            LaunchConfiguration('config_file'),
            {'use_sim_time': LaunchConfiguration('use_sim_time')}
        ],
        remappings=[
            ('/cmd_vel', 'cmd_vel_filtered'),
        ]
    )

    # --------------------------------------------------------------------------
    # 4. LAUNCH ACTION 2: EMERGENCY STOP SAFETY SERVICE SERVER (From Lesson 07)
    # --------------------------------------------------------------------------
    estop_server_node = Node(
        package='nexus_amr_basics',
        executable='emergency_stop_server',
        name='emergency_stop_server',
        namespace=LaunchConfiguration('robot_namespace'),
        output='screen',
        emulate_tty=True,
        parameters=[
            {'use_sim_time': LaunchConfiguration('use_sim_time')}
        ]
    )

    # --------------------------------------------------------------------------
    # 5. ASSEMBLE LAUNCH DESCRIPTION PIPELINE
    # --------------------------------------------------------------------------
    return LaunchDescription([
        config_file_arg,
        namespace_arg,
        use_sim_time_arg,
        LogInfo(msg=['[Launch] Starting AMR Subsystem under namespace: ', LaunchConfiguration('robot_namespace')]),
        LogInfo(msg=['[Launch] Injecting parameters from: ', LaunchConfiguration('config_file')]),
        param_controller_node,
        estop_server_node
    ])
