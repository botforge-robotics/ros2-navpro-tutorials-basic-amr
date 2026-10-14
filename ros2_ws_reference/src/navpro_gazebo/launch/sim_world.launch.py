#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_gazebo
Launch:  sim_world.launch.py
================================================================================

WHAT THIS LAUNCH FILE DOES:
---------------------------
Orchestrates a complete 3D dynamic physics simulation environment in Gazebo:
1. `gzserver`: Starts the headless Gazebo ODE physics engine with a warehouse world.
2. `gzclient`: Starts the graphical 3D visualization window (optional via `gui:=true`).
3. `rsp.launch.py`: Starts Robot State Publisher to parse the URDF/Xacro robot model.
4. `spawn_entity.py`: Injects the AMR model into the physics engine at coordinates (0, 0, 0.05).

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Server-Client Simulation Architecture:
   - `gzserver` computes rigid body dynamics, friction, collisions, and sensor raytracing.
   - `gzclient` connects via sockets to render OpenGL graphics. In CI/CD pipelines,
     `gui:=false` allows running headless simulations with zero display overhead.
2. Dynamic Entity Spawning:
   - Rather than hardcoding the robot in the SDF world file, ROS 2 dynamically
     reads `/robot_description` and spawns the model via a ROS service call.
3. Simulation Time (`use_sim_time:=true`):
   - Synchronizes all ROS 2 nodes to the Gazebo physics simulation clock (`/clock`)
     so physics time dilation or lag does not corrupt odometry or trajectory planners.
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
    Constructs the complete Gazebo world simulation and robot spawning pipeline.
    """
    # --------------------------------------------------------------------------
    # 1. RESOLVE PACKAGES AND ASSET PATHS
    # --------------------------------------------------------------------------
    pkg_gazebo = get_package_share_directory('navpro_gazebo')
    pkg_description = get_package_share_directory('navpro_description')
    pkg_gazebo_ros = get_package_share_directory('gazebo_ros')

    # Path to the warehouse environment world file containing racks, aisles, and obstacles
    default_world = os.path.join(pkg_gazebo, 'worlds', 'warehouse_obstacle_world.world')

    # --------------------------------------------------------------------------
    # 2. DECLARE CONFIGURABLE LAUNCH ARGUMENTS
    # --------------------------------------------------------------------------
    world_arg = DeclareLaunchArgument(
        'world',
        default_value=default_world,
        description='Absolute path to the Gazebo world file (.world)'
    )

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='true',
        description='Synchronize node clocks with /clock published by Gazebo simulation'
    )

    gui_arg = DeclareLaunchArgument(
        'gui',
        default_value='true',
        description='Set to true to launch Gazebo 3D GUI client; set false for headless execution'
    )

    # --------------------------------------------------------------------------
    # 3. LAUNCH GAZEBO PHYSICS SERVER (gzserver)
    # --------------------------------------------------------------------------
    gzserver = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(pkg_gazebo_ros, 'launch', 'gzserver.launch.py')),
        launch_arguments={
            'world': LaunchConfiguration('world'),
            'verbose': 'true'
        }.items()
    )

    # --------------------------------------------------------------------------
    # 4. LAUNCH GAZEBO GUI CLIENT (gzclient)
    # --------------------------------------------------------------------------
    # Only spawned if gui argument is set to true
    gzclient = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(pkg_gazebo_ros, 'launch', 'gzclient.launch.py')),
        launch_arguments={'verbose': 'true'}.items()
    )

    # --------------------------------------------------------------------------
    # 5. INCLUDE ROBOT STATE PUBLISHER (RSP)
    # --------------------------------------------------------------------------
    rsp_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(pkg_description, 'launch', 'rsp.launch.py')),
        launch_arguments={'use_sim_time': LaunchConfiguration('use_sim_time')}.items()
    )

    # --------------------------------------------------------------------------
    # 6. SPAWN ROBOT ENTITY IN SIMULATION
    # --------------------------------------------------------------------------
    # Calls gazebo_ros spawn service, reading URDF from 'robot_description' topic
    # and placing the robot at (x=0, y=0, z=0.05m) to prevent ground penetration.
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
