#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 02 Solution
# Script:  m01_l02_solution_domain_isolation.sh
# Purpose: Multi-Robot ROS 2 Domain Isolation & RMW Configuration (Complete)
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  ROS 2 Multi-Robot Network Isolation Configurator    ${NC}"
echo -e "${BLUE}======================================================${NC}"

# Step 1: Set ROS_DOMAIN_ID
echo -e "\n[Step 1/4: Setting Isolated Domain ID]"
export ROS_DOMAIN_ID=42
echo -e "${GREEN}[DONE]${NC} Set ROS_DOMAIN_ID=${GREEN}$ROS_DOMAIN_ID${NC}"

# Step 2: Restrict discovery to localhost
echo -e "\n[Step 2/4: Restricting Discovery Range to Localhost]"
export ROS_AUTOMATIC_DISCOVERY_RANGE=LOCALHOST
echo -e "${GREEN}[DONE]${NC} Set ROS_AUTOMATIC_DISCOVERY_RANGE=${GREEN}$ROS_AUTOMATIC_DISCOVERY_RANGE${NC}"

# Step 3: Specify RMW Implementation
echo -e "\n[Step 3/4: Selecting RMW Implementation]"
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
echo -e "${GREEN}[DONE]${NC} Set RMW_IMPLEMENTATION=${GREEN}$RMW_IMPLEMENTATION${NC}"

# Step 4: Verify and Print Active Configuration
echo -e "\n[Step 4/4: Active Environment Report]"
echo -e "  - ROS_DISTRO:                   ${GREEN}${ROS_DISTRO:-jazzy}${NC}"
echo -e "  - ROS_DOMAIN_ID:                ${GREEN}$ROS_DOMAIN_ID${NC}"
echo -e "  - ROS_AUTOMATIC_DISCOVERY_RANGE:${GREEN}$ROS_AUTOMATIC_DISCOVERY_RANGE${NC}"
echo -e "  - RMW_IMPLEMENTATION:           ${GREEN}$RMW_IMPLEMENTATION${NC}"

PKG_COUNT=$(ros2 pkg list 2>/dev/null | wc -l || echo "0")
echo -e "  - Available ROS Packages:       ${GREEN}${PKG_COUNT} packages detected${NC}"

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Isolation Configuration Applied Successfully!        ${NC}"
echo -e "${BLUE}======================================================${NC}"
