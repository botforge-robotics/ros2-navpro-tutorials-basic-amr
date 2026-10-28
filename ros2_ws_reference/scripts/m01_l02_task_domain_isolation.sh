#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 02 Task
# Script:  m01_l02_task_domain_isolation.sh
# Purpose: Multi-Robot ROS 2 Domain Isolation & RMW Configuration
# ==============================================================================
#
# MISSION TARGETS:
# ----------------
# 1. TODO 1: Set ROS_DOMAIN_ID to 42 to prevent crosstalk with other robots.
# 2. TODO 2: Restrict DDS discovery to LOCALHOST to avoid Wi-Fi broadcast storms.
# 3. TODO 3: Configure the default RMW implementation (e.g. rmw_fastrtps_cpp or rmw_cyclonedds_cpp).
# 4. TODO 4: Display the active configuration and verify environment with `ros2 doctor --report`.
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  ROS 2 Multi-Robot Network Isolation Configurator    ${NC}"
echo -e "${BLUE}======================================================${NC}"

# ==============================================================================
# TODO 1: Set ROS_DOMAIN_ID to 42
# - Hint: Use 'export' to assign your designated robot domain ID to the ROS_DOMAIN_ID variable.
# ==============================================================================
echo -e "\n[Step 1/4: Setting Isolated Domain ID]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Restrict discovery to localhost
# - Hint: Use 'export' to set ROS_AUTOMATIC_DISCOVERY_RANGE to LOCALHOST, preventing multicast packet leaks.
# ==============================================================================
echo -e "\n[Step 2/4: Restricting Discovery Range to Localhost]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Specify RMW Implementation
# - Hint: Use 'export' to declare the middleware backend using the RMW_IMPLEMENTATION variable.
# ==============================================================================
echo -e "\n[Step 3/4: Selecting RMW Implementation]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Verify and Print Active Configuration
# - Echo $ROS_DOMAIN_ID, $ROS_AUTOMATIC_DISCOVERY_RANGE, $RMW_IMPLEMENTATION
# - Hint: Echo each exported variable and pipe 'ros2 pkg list' into 'wc -l' to count detected packages.
# ==============================================================================
echo -e "\n[Step 4/4: Active Environment Report]"
# ---> YOUR CODE HERE <---


echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Isolation Configuration Applied Successfully!        ${NC}"
echo -e "${BLUE}======================================================${NC}"
