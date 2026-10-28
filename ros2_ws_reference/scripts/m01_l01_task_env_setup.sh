#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 01 Task
# Script:  m01_l01_task_env_setup.sh
# Purpose: Autonomous Mobile Robot Workspace Initializer & Diagnostic Check
# ==============================================================================
#
# MISSION TARGETS:
# ----------------
# 1. TODO 1: Create robotics workspace directory tree ($HOME/nexus_ws/{src,logs,config}).
# 2. TODO 2: Generate sensor hardware configuration file ($HOME/nexus_ws/config/robot_sensors.txt).
# 3. TODO 3: Verify primary LiDAR sensor configuration using grep.
# 4. TODO 4: Inspect workspace directory and permissions using pwd and ls -la.
# ==============================================================================

set -e

# Terminal color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Nexus AMR Workspace Initializer & Diagnostics      ${NC}"
echo -e "${BLUE}======================================================${NC}"

# Target workspace paths
WS_DIR="${HOME}/nexus_ws"
CONFIG_FILE="${WS_DIR}/config/robot_sensors.txt"

# ==============================================================================
# TODO 1: Create the workspace directories:
#         - "${WS_DIR}/src"
#         - "${WS_DIR}/logs"
#         - "${WS_DIR}/config"
# - Hint: Use `mkdir -p` with directory paths to ensure parent directories are created.
# ==============================================================================
echo -e "\n[Step 1/4: Creating Robotics Workspace Directory Tree]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Generate the sensor configuration file at "${CONFIG_FILE}".
#         Write the following entries:
#         - lidar_front: active
#         - depth_camera: active
#         - wheel_encoders: active
#         - imu_sensor: active
# - Hint: Use the `>` redirection operator to initialize the file with the first
#   entry, and `>>` to append subsequent entries without overwriting.
# ==============================================================================
echo -e "\n[Step 2/4: Generating Sensor Hardware Configuration File]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Search for "lidar_front: active" inside "${CONFIG_FILE}".
#         Verify the primary safety sensor is configured.
# - Hint: Use `grep` with the search pattern and target file path. You can test
#   matching via `grep -q` in an if-condition, or run `grep "lidar_front"` directly.
# ==============================================================================
echo -e "\n[Step 3/4: Verifying Primary Safety Sensor via grep]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Inspect the workspace and display file permissions.
#         - Print the current working directory path.
#         - List all files and permissions in "${WS_DIR}/config".
# - Hint: Use `pwd` to display the active working directory, and `ls -la` to
#   inspect file ownership, permissions, and sizes.
# ==============================================================================
echo -e "\n[Step 4/4: Workspace Permissions & Inspection]"
# ---> YOUR CODE HERE <---


echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Workspace Setup Complete: READY FOR ROBOTICS!        ${NC}"
echo -e "${BLUE}======================================================${NC}"
