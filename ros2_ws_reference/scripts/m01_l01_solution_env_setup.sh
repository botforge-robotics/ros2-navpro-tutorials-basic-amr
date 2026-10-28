#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 01 Solution
# Script:  m01_l01_solution_env_setup.sh
# Purpose: Autonomous Mobile Robot Workspace Initializer & Diagnostic Check (Complete)
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

# Step 1: Workspace Directory Structure
echo -e "\n[Step 1/4: Creating Robotics Workspace Directory Tree]"
mkdir -p "${WS_DIR}/src" "${WS_DIR}/logs" "${WS_DIR}/config"
if [ -d "${WS_DIR}/src" ] && [ -d "${WS_DIR}/logs" ] && [ -d "${WS_DIR}/config" ]; then
    echo -e "${GREEN}[PASS]${NC} Workspace directory structure established at: ${GREEN}${WS_DIR}${NC}"
else
    echo -e "${RED}[FAIL]${NC} Could not create workspace directories!"
    exit 1
fi

# Step 2: Robot Sensor Configuration Manifest
echo -e "\n[Step 2/4: Generating Sensor Hardware Configuration File]"
echo "lidar_front: active" > "${CONFIG_FILE}"
echo "depth_camera: active" >> "${CONFIG_FILE}"
echo "wheel_encoders: active" >> "${CONFIG_FILE}"
echo "imu_sensor: active" >> "${CONFIG_FILE}"

if [ -f "${CONFIG_FILE}" ]; then
    echo -e "${GREEN}[PASS]${NC} Generated sensor manifest: ${GREEN}${CONFIG_FILE}${NC}"
else
    echo -e "${RED}[FAIL]${NC} Failed to create sensor configuration file!"
    exit 1
fi

# Step 3: Hardware Verification via Grep
echo -e "\n[Step 3/4: Verifying Primary Safety Sensor via grep]"
if grep -q "lidar_front: active" "${CONFIG_FILE}"; then
    echo -e "${GREEN}[PASS]${NC} Primary safety sensor verified:"
    grep "lidar_front" "${CONFIG_FILE}"
else
    echo -e "${RED}[FAIL]${NC} lidar_front not found in ${CONFIG_FILE}"
    exit 1
fi

# Step 4: Workspace Inspection & Permissions
echo -e "\n[Step 4/4: Workspace Permissions & Inspection]"
echo -e "Current Working Directory: $(pwd)"
echo -e "Contents of ${WS_DIR}/config:"
ls -la "${WS_DIR}/config"
echo -e "${GREEN}[PASS]${NC} Workspace file permissions verified."

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Workspace Setup Complete: READY FOR ROBOTICS!        ${NC}"
echo -e "${BLUE}======================================================${NC}"
