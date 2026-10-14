#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_description
Launch:  display.launch.py
================================================================================

WHAT THIS LAUNCH FILE DOES:
---------------------------
Orchestrates a 3-part visualization stack to inspect the AMR 3D URDF model in RViz2:
1. `rsp.launch.py`: Expands Xacro into URDF and runs Robot State Publisher.
2. `joint_state_publisher_gui`: Provides a GUI window with interactive sliders
   allowing users to manually rotate robot wheels and joints.
3. `rviz2`: Launches the 3D robotics visualizer with a pre-configured display profile.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Launch File Composition: Using `IncludeLaunchDescription` to include and
   re-use modular launch files (`rsp.launch.py`) across different pipelines.
2. Kinematic Verification: Testing coordinate frame offsets, joint limits,
   and visual meshes before running physical or simulated dynamics.
3. Preserved RViz Configurations: Loading an existing `.rviz` configuration file
   with pre-selected Grid, RobotModel, and TF display plugins.
================================================================================
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    """
    Constructs the display visualization launch pipeline.
    """
    # --------------------------------------------------------------------------
    # 1. RESOLVE CONFIGURATION PATHS
    # --------------------------------------------------------------------------
    pkg_share = get_package_share_directory('navpro_description')
    rsp_launch_path = os.path.join(pkg_share, 'launch', 'rsp.launch.py')
    rviz_config_path = os.path.join(pkg_share, 'rviz', 'robot_model.rviz')

    # Declare simulation time argument
    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Use simulation (Gazebo) clock if true'
    )

    # --------------------------------------------------------------------------
    # 2. INCLUDE ROBOT STATE PUBLISHER SUB-LAUNCH
    # --------------------------------------------------------------------------
    # Calls rsp.launch.py and forwards the use_sim_time argument down to it.
    rsp_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(rsp_launch_path),
        launch_arguments={'use_sim_time': LaunchConfiguration('use_sim_time')}.items()
    )

    # --------------------------------------------------------------------------
    # 3. INTERACTIVE JOINT STATE PUBLISHER GUI
    # --------------------------------------------------------------------------
    # Populates `/joint_states` topics from interactive GUI slider widgets,
    # enabling manual wheel rotation without needing physics simulation running.
    joint_state_publisher_gui_node = Node(
        package='joint_state_publisher_gui',
        executable='joint_state_publisher_gui',
        name='joint_state_publisher_gui',
        output='screen'
    )

    # --------------------------------------------------------------------------
    # 4. RVIZ2 3D VISUALIZER
    # --------------------------------------------------------------------------
    # Launches RViz2 with the customized robot_model.rviz configuration file
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
