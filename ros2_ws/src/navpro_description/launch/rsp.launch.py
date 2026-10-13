#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_description
Launch:  rsp.launch.py (Robot State Publisher)
================================================================================

WHAT THIS LAUNCH FILE DOES:
---------------------------
Processes a modular Xacro (XML Macro) 3D robot model into raw URDF XML and starts
the standard ROS 2 `robot_state_publisher` node.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Robot Model Pipeline:
   - Xacro file (`navpro_robot.urdf.xacro`) defines geometric links, collision
     hulls, inertial tensors, and kinematic joints with reusable macros.
   - The `xacro` command-line tool expands these macros into standard URDF XML.
2. ParameterValue Command Substitution:
   - Uses `launch_ros.parameter_descriptions.ParameterValue(Command(['xacro ', xacro_file]), value_type=str)`
     to dynamically execute the Xacro parser at launch time without creating
     temporary intermediate files on disk.
3. `/robot_description` Topic:
   - `robot_state_publisher` reads this URDF string and publishes it on the
     latched `/robot_description` topic for RViz2, Gazebo, and MoveIt2.
4. Kinematic Tree Broadcasting:
   - Reads joint angles from `/joint_states` and continuously broadcasts
     all static and dynamic internal frame transforms across the TF tree
     (e.g., `base_link` -> `laser_link`, `base_link` -> `camera_link`).
================================================================================
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration, Command
from launch_ros.actions import Node
from launch_ros.parameter_descriptions import ParameterValue


def generate_launch_description():
    """
    Assembles the launch graph for Robot State Publisher.
    """
    # --------------------------------------------------------------------------
    # 1. RESOLVE XACRO MODEL PATH
    # --------------------------------------------------------------------------
    pkg_share = get_package_share_directory('navpro_description')
    xacro_file = os.path.join(pkg_share, 'urdf', 'navpro_robot.urdf.xacro')

    # --------------------------------------------------------------------------
    # 2. DECLARE SIMULATION TIME ARGUMENT
    # --------------------------------------------------------------------------
    # When running against Gazebo, use_sim_time must be True so TF timestamps
    # align with Gazebo's simulated physics world clock.
    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Synchronize node clock with /clock published by Gazebo simulation'
    )

    # --------------------------------------------------------------------------
    # 3. CONVERT XACRO TO URDF VIA SHELL COMMAND SUBSTITUTION
    # --------------------------------------------------------------------------
    # ParameterValue ensures the string output of the xacro command is passed
    # as a single continuous string parameter named 'robot_description'.
    robot_description_content = ParameterValue(
        Command(['xacro ', xacro_file]),
        value_type=str
    )

    # --------------------------------------------------------------------------
    # 4. ROBOT STATE PUBLISHER NODE ACTION
    # --------------------------------------------------------------------------
    robot_state_publisher_node = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        name='robot_state_publisher',
        output='screen',
        parameters=[{
            'robot_description': robot_description_content,
            'use_sim_time': LaunchConfiguration('use_sim_time')
        }]
    )

    return LaunchDescription([
        use_sim_time_arg,
        robot_state_publisher_node
    ])
