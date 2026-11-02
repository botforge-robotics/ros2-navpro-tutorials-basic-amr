#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 13 Task
# Script:  m04_l18_task_slam_mapping.sh
# Purpose: SLAM Toolbox Online Mapping & Map Serialization Automation
# ==============================================================================
#
# MISSION TARGETS:
# ----------------
# 1. TODO 1: Verify the /map topic is broadcasting active OccupancyGrid data.
# 2. TODO 2: Query /map topic metadata with `ros2 topic info /map`.
# 3. TODO 3: Call SLAM Toolbox save_map service to serialize the active occupancy grid.
# 4. TODO 4: Verify the generated map files (.yaml and .pgm) exist and print file sizes.
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

MAP_NAME="${1:-warehouse_online_map}"
OUTPUT_DIR="${HOME}/ros2_ws/maps"

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  SLAM Toolbox Mapping & Map Serialization Script     ${NC}"
echo -e "${BLUE}======================================================${NC}"

# ==============================================================================
# TODO 1: Verify /map topic exists
# - Hint: Use 'ros2 topic list' and check for the presence of the '/map' topic.
# ==============================================================================
echo -e "\n[Step 1/4: Checking /map Topic]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Ensure output maps directory exists
# - Hint: Use 'mkdir -p' to ensure the map storage destination directory exists.
# ==============================================================================
echo -e "\n[Step 2/4: Preparing Destination Directory: $OUTPUT_DIR]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Call SLAM Toolbox save_map service
# - Hint: Use 'ros2 service call' to invoke the /slam_toolbox/save_map service passing the desired map file prefix in YAML format.
# ==============================================================================
echo -e "\n[Step 3/4: Invoking SLAM Map Saver Service]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Verify and list output map artifacts
# - Hint: Inspect the output map files using 'ls -lh' with the map name wildcard pattern.
# ==============================================================================
echo -e "\n[Step 4/4: Validating Map Artifacts]"
# ---> YOUR CODE HERE <---

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  SLAM Mapping Task Completed Successfully!            ${NC}"
echo -e "${BLUE}======================================================${NC}"
