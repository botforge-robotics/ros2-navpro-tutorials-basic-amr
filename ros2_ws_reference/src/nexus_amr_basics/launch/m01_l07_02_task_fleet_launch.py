#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 07 Task
Package: nexus_amr_basics
Launch:  m02_l09_02_task_fleet_launch.py
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a production-ready Python Launch file that brings up
the COMPLETE Autonomous Mobile Robot (AMR) core subsystem.

You will integrate everything you have built across Modules 1 & 2:
1. Ultrasonic Sensor Publisher (Lesson 05 - Topics / Pub)
2. Collision Proximity Monitor (Lesson 05 - Topics / Sub)
3. Emergency Stop Service Server (Lesson 07 - Services)
4. Parameterized Controller Node (Lesson 08 - Parameters & YAML)

OBJECTIVES:
-----------
TODO 1: Declare a launch argument 'robot_namespace' (default: 'amr_alpha').
TODO 2: Declare a launch argument 'config_file' pointing to 'config/teleop_params.yaml'.
TODO 3: Instantiate Node 'ultrasonic_publisher' under the robot namespace.
TODO 4: Instantiate Node 'collision_monitor' under the robot namespace.
TODO 5: Instantiate Node 'emergency_stop_server' under the robot namespace.
TODO 6: Instantiate Node 'parameterized_controller' using executable 'param_node_explained',
        injecting YAML parameters from 'config_file' under the robot namespace.
TODO 7: Assemble and return a LaunchDescription object containing all arguments and nodes.
================================================================================
"""

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, LogInfo
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_share = get_package_share_directory('nexus_amr_basics')
    default_config = os.path.join(pkg_share, 'config', 'teleop_params.yaml')
    if not os.path.exists(default_config):
        source_config = os.path.expanduser('~/ros2_ws/src/nexus_amr_basics/config/teleop_params.yaml')
        if os.path.exists(source_config):
            default_config = source_config

    # ==========================================================================
    # TODO 1: Declare Launch Argument 'robot_namespace' (default: 'amr_alpha')
    # ==========================================================================
    # ---> YOUR CODE HERE <---
    namespace_arg = DeclareLaunchArgument(
        'robot_namespace',
        default_value='amr_alpha',
        description='Robot top-level namespace'
    )

    # ==========================================================================
    # TODO 2: Declare Launch Argument 'config_file' (default: default_config)
    # ==========================================================================
    # ---> YOUR CODE HERE <---
    config_arg = DeclareLaunchArgument(
        'config_file',
        default_value=default_config,
        description='Path to YAML parameters configuration'
    )

    robot_ns = LaunchConfiguration('robot_namespace')
    config_file = LaunchConfiguration('config_file')

    # ==========================================================================
    # TODO 3: Add Ultrasonic Sensor Publisher Node (From Lesson 05)
    # - package: 'nexus_amr_basics'
    # - executable: 'ultrasonic_publisher'
    # - name: 'ultrasonic_publisher'
    # - namespace: robot_ns
    # - output: 'screen'
    # ==========================================================================
    # ---> YOUR CODE HERE <---

    # ==========================================================================
    # TODO 4: Add Collision Monitor Subscriber Node (From Lesson 05)
    # - package: 'nexus_amr_basics'
    # - executable: 'collision_monitor'
    # - name: 'collision_monitor'
    # - namespace: robot_ns
    # - output: 'screen'
    # ==========================================================================
    # ---> YOUR CODE HERE <---

    # ==========================================================================
    # TODO 5: Add Emergency Stop Service Server Node (From Lesson 07)
    # - package: 'nexus_amr_basics'
    # - executable: 'emergency_stop_server'
    # - name: 'emergency_stop_server'
    # - namespace: robot_ns
    # - output: 'screen'
    # ==========================================================================
    # ---> YOUR CODE HERE <---

    # ==========================================================================
    # TODO 6: Add Parameterized Controller Node (From Lesson 08)
    # - package: 'nexus_amr_basics'
    # - executable: 'param_node_explained'
    # - name: 'parameterized_controller'
    # - namespace: robot_ns
    # - parameters: [config_file]
    # - output: 'screen'
    # ==========================================================================
    # ---> YOUR CODE HERE <---

    # ==========================================================================
    # TODO 7: Assemble and Return LaunchDescription
    # ==========================================================================
    # ---> YOUR CODE HERE <---
    return LaunchDescription([
        namespace_arg,
        config_arg,
        LogInfo(msg=['Launching Full AMR Stack for robot: ', robot_ns]),
        # Add your 4 nodes here!
    ])
