#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_navigation
Launch:  slam.launch.py (2D SLAM Toolbox Mapping)
================================================================================

WHAT THIS LAUNCH FILE DOES:
---------------------------
Launches `slam_toolbox` in asynchronous online mapping mode alongside RViz2
to generate real-time 2D Occupancy Grid Maps of the environment.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Simultaneous Localization and Mapping (SLAM):
   - The robot builds an unknown environment map while simultaneously calculating
     its location inside that map using LiDAR scans (`/scan`) and odometry (`/odom`).
2. Scan Matching & Pose Graph Optimization:
   - `async_slam_toolbox_node` processes laser scans into a graph of interconnected
     poses and scan matches, periodically computing loop closures when the robot
     re-visits previously explored regions.
3. Decoupled Asynchronous Processing:
   - "Async" means scan matching and pose graph updates run on background threads,
     preventing laser dropouts or robot control stutter even when the graph grows large.
4. Visualization in RViz2:
   - RViz subscribes to `/map` to display obstacles, open floor space, and unexplored areas.
================================================================================
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    """
    Assembles the SLAM Toolbox mapping and RViz2 visualization pipeline.
    """
    # --------------------------------------------------------------------------
    # 1. RESOLVE CONFIGURATION PATHS
    # --------------------------------------------------------------------------
    pkg_nav = get_package_share_directory('navpro_navigation')
    pkg_desc = get_package_share_directory('navpro_description')

    # Path to YAML containing SLAM parameters (scan buffer size, resolution, search space)
    default_slam_params = os.path.join(pkg_nav, 'config', 'slam_toolbox.yaml')
    # Pre-configured RViz display profile
    default_rviz_config = os.path.join(pkg_desc, 'rviz', 'robot_model.rviz')

    # --------------------------------------------------------------------------
    # 2. DECLARE LAUNCH ARGUMENTS
    # --------------------------------------------------------------------------
    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='true',
        description='Synchronize node clock with /clock published by Gazebo simulation'
    )

    slam_params_arg = DeclareLaunchArgument(
        'slam_params_file',
        default_value=default_slam_params,
        description='Absolute path to SLAM Toolbox configuration YAML file'
    )

    # --------------------------------------------------------------------------
    # 3. SLAM TOOLBOX NODE ACTION
    # --------------------------------------------------------------------------
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

    # --------------------------------------------------------------------------
    # 4. RVIZ2 VISUALIZER NODE ACTION
    # --------------------------------------------------------------------------
    rviz_node = Node(
        package='rviz2',
        executable='rviz2',
        name='rviz2_slam',
        output='screen',
        arguments=['-d', default_rviz_config],
        parameters=[{'use_sim_time': LaunchConfiguration('use_sim_time')}]
    )

    return LaunchDescription([
        use_sim_time_arg,
        slam_params_arg,
        slam_node,
        rviz_node
    ])
