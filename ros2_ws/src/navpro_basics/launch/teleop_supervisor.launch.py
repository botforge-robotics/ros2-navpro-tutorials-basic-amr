#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_basics
Launch:  teleop_supervisor.launch.py
================================================================================

WHAT THIS LAUNCH FILE DOES:
---------------------------
Launches the `teleop_speed_limiter` node with external YAML parameter loading,
configurable command-line launch arguments, and topic remappings.

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Declarative Process Orchestration: Instead of manually executing 5 different
   `ros2 run` commands in separate terminals, a single launch file starts the
   entire node graph in coordinated order.
2. Launch Arguments (`DeclareLaunchArgument`): Exposes parameterized knobs
   (like YAML file paths or `use_sim_time`) that can be overridden from CLI:
   `ros2 launch navpro_basics teleop_supervisor.launch.py config_file:=/custom/path.yaml`
3. Launch Configurations (`LaunchConfiguration`): Dynamic runtime variables
   evaluated lazily when ROS 2 processes the launch description.
4. Parameter Injection: Passing structured YAML dictionary files directly to nodes.
5. Topic Remapping: Decoupling code from fixed topic names by redirecting
   `/input/cmd_vel` to `/teleop/cmd_vel` at the graph architecture level.
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
    Must return a LaunchDescription object containing all actions to execute.
    """
    # --------------------------------------------------------------------------
    # 1. RESOLVE FILE PATHS VIA AMENT INDEX
    # --------------------------------------------------------------------------
    # In ROS 2, packages are installed into the 'install/' directory.
    # get_package_share_directory resolves the absolute path to this package's share dir.
    pkg_share = get_package_share_directory('navpro_basics')
    default_config_path = os.path.join(pkg_share, 'config', 'teleop_params.yaml')

    # --------------------------------------------------------------------------
    # 2. DECLARE RECONFIGURABLE LAUNCH ARGUMENTS
    # --------------------------------------------------------------------------
    # Allows users to pass custom values at launch time:
    # Example: ros2 launch navpro_basics teleop_supervisor.launch.py use_sim_time:=true
    config_file_arg = DeclareLaunchArgument(
        'config_file',
        default_value=default_config_path,
        description='Absolute path to the YAML parameters file'
    )

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Synchronize node clock with /clock published by Gazebo simulator'
    )

    # --------------------------------------------------------------------------
    # 3. DEFINE NODE LAUNCH ACTION
    # --------------------------------------------------------------------------
    # Node action specifies the executable to spawn, output streaming, parameters, and remappings.
    speed_limiter_node = Node(
        package='navpro_basics',                          # Package name containing the executable
        executable='task_teleop_speed_limiter',            # Registered executable entrypoint
        name='teleop_speed_limiter',                      # Node name on the ROS 2 graph
        output='screen',                                  # Pipe node stdout/stderr directly to terminal
        emulate_tty=True,                                 # Preserve colorized logging formatting
        parameters=[
            LaunchConfiguration('config_file'),           # Load parameter key-values from external YAML
            {'use_sim_time': LaunchConfiguration('use_sim_time')}  # Override clock mode dynamically
        ],
        remappings=[
            # Topic Remapping: (original_node_topic, new_system_topic)
            # Re-routes the node's internal subscription '/input/cmd_vel' to the system topic '/teleop/cmd_vel'
            ('/input/cmd_vel', '/teleop/cmd_vel'),
        ]
    )

    # --------------------------------------------------------------------------
    # 4. ASSEMBLE LAUNCH DESCRIPTION PIPELINE
    # --------------------------------------------------------------------------
    return LaunchDescription([
        config_file_arg,
        use_sim_time_arg,
        LogInfo(msg=['Launching NavPro Teleop Supervisor with params from: ', LaunchConfiguration('config_file')]),
        speed_limiter_node
    ])
