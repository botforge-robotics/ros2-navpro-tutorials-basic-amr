#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 03 Task
# Script:  m01_l03_task_fleet_teleop.sh
# Purpose: Turtlesim Multi-Turtle Escort CLI Automation Script
# ==============================================================================
#
# PREREQUISITE:
# -------------
# Ensure Turtlesim is running in another terminal / GUI:
#   ros2 run turtlesim turtlesim_node
#
# MISSION TARGETS:
# ----------------
# 1. TODO 1: Call /spawn service to spawn 'turtle2' at x=2.0, y=2.0, theta=0.0
# 2. TODO 2: Call /turtle2/set_pen service to set red pen (r=255, g=0, b=0, width=3)
# 3. TODO 3: Publish 10 Hz continuous velocity commands to /turtle1/cmd_vel (linear.x=2.0, angular.z=1.5)
# 4. TODO 4: Verify active topics with `ros2 topic list` and sample pose from `/turtle1/pose`
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Turtlesim Multi-Turtle Fleet Orchestration Script   ${NC}"
echo -e "${BLUE}======================================================${NC}"

# ==============================================================================
# TODO 1: Call /spawn service to spawn 'turtle2'
# - Hint: Use 'ros2 service call' specifying the /spawn endpoint, service type, and YAML arguments for coordinates and robot name.
# ==============================================================================
echo -e "\n[Step 1/4: Spawning turtle2]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Call /turtle2/set_pen service
# - Hint: Use 'ros2 service call' to the robot's /set_pen service passing RGB color channels, line width, and off flag in YAML.
# ==============================================================================
echo -e "\n[Step 2/4: Configuring turtle2 Pen Style]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Publish one-shot test burst to /turtle1/cmd_vel
# - Hint: Use 'ros2 topic pub --once' with target topic, Twist message type, and linear/angular velocity YAML structure.
# ==============================================================================
echo -e "\n[Step 3/4: Dispatching Velocity Command to turtle1]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Inspect active topics and echo turtle1 pose once
# - Hint: Use 'ros2 topic list' to verify graph connectivity, and sample a single message using 'ros2 topic echo' with the --once flag.
# ==============================================================================
echo -e "\n[Step 4/4: Telemetry & Graph Verification]"
# ---> YOUR CODE HERE <---


echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Fleet Orchestration Completed!                       ${NC}"
echo -e "${BLUE}======================================================${NC}"
