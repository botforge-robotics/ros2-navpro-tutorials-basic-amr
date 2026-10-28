#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 17 Task
# Script:  m03_l17_task_spawn_warehouse_obstacle.sh
# Purpose: Gazebo Warehouse Simulation Entity Spawning & Verification
# ==============================================================================
#
# MISSION TARGETS:
# ----------------
# 1. TODO 1: Verify Gazebo simulation environment is responding.
# 2. TODO 2: Spawn an obstacle barrier at coordinates (x=2.0, y=0.5, z=0.25).
# 3. TODO 3: Sample the /scan topic to verify the LiDAR detects the new obstacle.
# 4. TODO 4: Display confirmation diagnostics.
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Gazebo Warehouse Entity Spawner & Sensor Test       ${NC}"
echo -e "${BLUE}======================================================${NC}"

# ==============================================================================
# TODO 1: Check if /scan or Gazebo clock is active
# - Hint: Use 'ros2 topic list' and check for the presence of the sensor or clock topics.
# ==============================================================================
echo -e "\n[Step 1/4: Checking Simulation Environment]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Spawn cylindrical obstacle entity
# - Hint: Use 'ros2 run ros_gz_sim create' specifying target world, entity name, and 3D spawn coordinates (-x, -y, -z).
# ==============================================================================
echo -e "\n[Step 2/4: Spawning Obstacle Entity in Warehouse]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Sample /scan topic
# - Hint: Use 'ros2 topic echo --once' piped into 'head' to sample initial range readings without streaming continuously.
# ==============================================================================
echo -e "\n[Step 3/4: Validating Sensor Reflection on Obstacle]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Display Confirmation
# ==============================================================================
echo -e "\n[Step 4/4: Obstacle Spawner Verification]"
# ---> YOUR CODE HERE <---

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Obstacle Spawning Completed!                         ${NC}"
echo -e "${BLUE}======================================================${NC}"
