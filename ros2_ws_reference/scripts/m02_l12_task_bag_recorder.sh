#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 12
# Script:  m02_l12_task_bag_recorder.sh
# Purpose: Autonomous Mission Telemetry Recording & Playback Audit (Student Task)
# ==============================================================================
#
# YOUR MISSION:
# -------------
# Fill in the TODO blocks below to automate recording AMR telemetry,
# inspecting bag metadata, and validating offline playback fidelity.
#
# OBJECTIVES:
# -----------
# 1. TODO 1: Create a temporary output directory: /tmp/nexus_amr_telemetry_bag
# 2. TODO 2: Record topics /turtle1/cmd_vel and /turtle1/pose for 5 seconds using MCAP format
# 3. TODO 3: Inspect metadata of recorded bag with `ros2 bag info`
# 4. TODO 4: Verify playback stream with `ros2 bag play` in offline mode
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Nexus AMR Mission Telemetry Rosbag Automation     ${NC}"
echo -e "${BLUE}======================================================${NC}"

BAG_DIR="/tmp/nexus_amr_telemetry_bag"

# ==============================================================================
# TODO 1: Clean up old bag directory if it exists and prepare workspace
# - Hint: Remove any existing bag directory at "$BAG_DIR" to avoid collision errors before recording.
# ==============================================================================
echo -e "\n[Step 1/4: Initializing Recording Buffer]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Record telemetry stream to MCAP format for 5 seconds
# - Hint: Use 'ros2 bag record' with -o for output path, -s mcap for storage format, specifying target topics, wrapped in 'timeout 5'.
# ==============================================================================
echo -e "\n[Step 2/4: Capturing 5-Second Telemetry Stream (MCAP)]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Extract and print Rosbag Metadata Summary
# - Hint: Use 'ros2 bag info' passing the target bag directory path to print recording metrics.
# ==============================================================================
echo -e "\n[Step 3/4: Inspecting Rosbag Metadata]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Verify bag playback
# - Hint: Use 'ros2 bag play' with --duration to test offline playback of recorded topics.
# ==============================================================================
echo -e "\n[Step 4/4: Validating Playback Telemetry Stream]"
# ---> YOUR CODE HERE <---

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Rosbag Telemetry Verification Complete!              ${NC}"
echo -e "${BLUE}======================================================${NC}"
