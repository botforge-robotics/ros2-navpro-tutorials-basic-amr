#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 4 / Lesson 23 Task
# Script:  m04_l23_task_hardware_check.sh
# Purpose: Pre-Flight Physical Robot Hardware (Sim-to-Real) Readiness Check
# ==============================================================================
#
# MISSION TARGETS:
# ----------------
# 1. TODO 1: Verify presence of physical USB serial devices (/dev/ttyUSB* or /dev/ttyACM*).
# 2. TODO 2: Check micro-ROS agent or motor driver communication daemon status.
# 3. TODO 3: Verify hardware LiDAR driver topic (/scan) is emitting scan data.
# 4. TODO 4: Print a color-coded Sim-to-Real Deployment Clearance Certificate.
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Nexus AMR Sim-to-Real Physical Hardware Sanity Check${NC}"
echo -e "${BLUE}======================================================${NC}"

# ==============================================================================
# TODO 1: Detect USB Serial Controllers (Motor board, LiDAR)
# - Hint: Query the /dev directory for connected USB-to-UART or ACM serial communication ports.
# ==============================================================================
echo -e "\n[Step 1/4: Scanning Physical Serial Buses]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Check micro-ROS or Driver Agent Process
# - Hint: Use 'pgrep' to search running process names for the micro-ROS agent daemon.
# ==============================================================================
echo -e "\n[Step 2/4: Checking Embedded Driver Agent]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Verify /scan Sensor Stream
# - Hint: Use 'ros2 topic hz' with a short window to verify the LiDAR sensor message frequency.
# ==============================================================================
echo -e "\n[Step 3/4: Inspecting Sensor Telemetry Stream]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Output Deployment Clearance Report
# ==============================================================================
echo -e "\n[Step 4/4: Sim-to-Real Readiness Report]"
# ---> YOUR CODE HERE <---

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Physical Hardware Inspection Completed!              ${NC}"
echo -e "${BLUE}======================================================${NC}"
