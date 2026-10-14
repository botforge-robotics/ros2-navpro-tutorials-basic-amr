#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_navigation
Launch:  navigation.launch.py (Nav2 Full Bringup)
================================================================================

WHAT THIS LAUNCH FILE DOES:
---------------------------
Launches the complete Nav2 Navigation Stack configured for the NavPro AMR.
It delegates to `nav2_bringup/launch/bringup_launch.py` while injecting our
custom warehouse map, costmap parameters, and planner/controller plugins.

NAV2 SUBSYSTEMS ACTIVATED:
--------------------------
1. Map Server (`nav2_map_server`):
   Loads 2D occupancy grid map (`warehouse_map.yaml` + `.pgm`) and serves it.
2. AMCL (`nav2_amcl`):
   Adaptive Monte Carlo Localization particle filter tracking robot pose.
3. Global Costmap & Global Planner (`nav2_planner`):
   Computes collision-free A* / Dijkstra paths across the global warehouse map.
4. Local Costmap & Controller (`nav2_controller`):
   Tracks the global trajectory at 20 Hz using DWB / MPPI local obstacle avoidance.
5. Behavior Tree Navigator (`nav2_bt_navigator`):
   Executes behavior trees coordinating navigation, recoveries, and goal checks.
6. Recovery Server (`nav2_recoveries`):
   Executes recovery behaviors (spin, backup, wait) if the AMR gets stuck.
================================================================================
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration


def generate_launch_description():
    """
    Assembles the complete Nav2 stack bringup pipeline.
    """
    # --------------------------------------------------------------------------
    # 1. RESOLVE CONFIGURATION PATHS
    # --------------------------------------------------------------------------
    pkg_nav = get_package_share_directory('navpro_navigation')
    pkg_nav2_bringup = get_package_share_directory('nav2_bringup')

    # Default paths for map metadata and Nav2 configuration YAML
    default_map = os.path.join(pkg_nav, 'maps', 'warehouse_map.yaml')
    default_params = os.path.join(pkg_nav, 'config', 'nav2_params.yaml')

    # --------------------------------------------------------------------------
    # 2. DECLARE CONFIGURABLE LAUNCH ARGUMENTS
    # --------------------------------------------------------------------------
    map_arg = DeclareLaunchArgument(
        'map',
        default_value=default_map,
        description='Absolute path to the occupancy grid map YAML file'
    )

    params_file_arg = DeclareLaunchArgument(
        'params_file',
        default_value=default_params,
        description='Absolute path to the Nav2 parameters YAML configuration file'
    )

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='true',
        description='Synchronize node clocks with /clock published by Gazebo simulation'
    )

    autostart_arg = DeclareLaunchArgument(
        'autostart',
        default_value='true',
        description='Automatically transition Nav2 lifecycle nodes to Active on startup'
    )

    # --------------------------------------------------------------------------
    # 3. INCLUDE NAV2 BRINGUP LAUNCH
    # --------------------------------------------------------------------------
    # Forward configured parameters to the standard Nav2 bringup package
    nav2_bringup_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(pkg_nav2_bringup, 'launch', 'bringup_launch.py')),
        launch_arguments={
            'map': LaunchConfiguration('map'),
            'use_sim_time': LaunchConfiguration('use_sim_time'),
            'params_file': LaunchConfiguration('params_file'),
            'autostart': LaunchConfiguration('autostart'),
        }.items()
    )

    return LaunchDescription([
        map_arg,
        params_file_arg,
        use_sim_time_arg,
        autostart_arg,
        nav2_bringup_launch
    ])
