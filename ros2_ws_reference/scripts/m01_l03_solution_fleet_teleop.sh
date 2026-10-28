#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 03 Solution
# Script:  m01_l03_solution_fleet_teleop.sh
# Purpose: Turtlesim Multi-Turtle Escort CLI Automation Script (Complete)
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Turtlesim Multi-Turtle Fleet Orchestration Script   ${NC}"
echo -e "${BLUE}======================================================${NC}"

# Step 1: Spawn turtle2
echo -e "\n[Step 1/4: Spawning turtle2 at (x=2.0, y=2.0)]"
ros2 service call /spawn turtlesim/srv/Spawn "{x: 2.0, y: 2.0, theta: 0.0, name: 'turtle2'}" || true

# Step 2: Configure pen on turtle2
echo -e "\n[Step 2/4: Configuring turtle2 Pen Style (Red, Width=3)]"
ros2 service call /turtle2/set_pen turtlesim/srv/SetPen "{r: 255, g: 0, b: 0, width: 3, off: 0}" || true

# Step 3: Publish velocity burst to turtle1
echo -e "\n[Step 3/4: Dispatching Velocity Command to turtle1 (vx=2.0, wz=1.5)]"
ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0}, angular: {z: 1.5}}"

# Step 4: Verify topics and sample pose
echo -e "\n[Step 4/4: Telemetry & Graph Verification]"
echo "Active Topics:"
ros2 topic list | grep -E "turtle1|turtle2"

echo -e "\nSampling /turtle1/pose (one frame):"
ros2 topic echo --once /turtle1/pose

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Fleet Orchestration Completed Successfully!          ${NC}"
echo -e "${BLUE}======================================================${NC}"
