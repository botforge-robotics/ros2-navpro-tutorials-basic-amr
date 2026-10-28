#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 11 Task
Package: nexus_amr_basics
Launch:  m02_l11_01_task_fleet_launch.py (alias: task_fleet_launch)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct an orchestration Python Launch file to deploy a
namespaced autonomous AMR subsystem containing the heartbeat and battery
supervisor nodes.

OBJECTIVES:
-----------
1. TODO 1: Declare a launch argument 'robot_namespace' (default: 'amr_alpha').
2. TODO 2: Instantiate Node 'heartbeat_node' using executable 'amr_heartbeat'
   under the declared namespace.
3. TODO 3: Instantiate Node 'battery_logger_node' using executable 'solution_battery_logger'
   under the declared namespace.
4. TODO 4: Return a LaunchDescription object containing the argument and nodes.
================================================================================
"""

from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    # ==========================================================================
    # TODO 1: Declare Launch Argument 'robot_namespace' with default 'amr_alpha'
    # - Hint: Instantiate DeclareLaunchArgument specifying argument name and default value.
    # ==========================================================================
    # ---> YOUR CODE HERE <---
    robot_namespace = LaunchConfiguration('robot_namespace')

    # ==========================================================================
    # TODO 2: Create Heartbeat Node
    # - package: 'nexus_amr_basics'
    # - executable: 'amr_heartbeat'
    # - namespace: robot_namespace
    # - output: 'screen'
    # ==========================================================================
    # ---> YOUR CODE HERE <---

    # ==========================================================================
    # TODO 3: Create Battery Supervisor Node
    # - package: 'nexus_amr_basics'
    # - executable: 'solution_battery_logger'
    # - namespace: robot_namespace
    # - output: 'screen'
    # ==========================================================================
    # ---> YOUR CODE HERE <---

    # ==========================================================================
    # TODO 4: Assemble LaunchDescription
    # ==========================================================================
    # ---> YOUR CODE HERE <---
    return LaunchDescription([])
