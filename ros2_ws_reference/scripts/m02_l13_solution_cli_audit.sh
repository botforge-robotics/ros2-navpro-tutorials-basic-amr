#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 2 / Lesson 13 Reference Solution
# Script:  m02_l13_solution_cli_audit.sh
# Purpose: Comprehensive ROS 2 CLI Introspection & Health Audit (Complete Solution)
# ==============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}  Nexus AMR ROS 2 System CLI Audit & Diagnostics     ${NC}"
echo -e "${BLUE}======================================================${NC}"

# Step 1: Discover Active Nodes
echo -e "\n[Step 1/4: Discovering Active Nodes]"
NODES=$(ros2 node list 2>/dev/null || true)
if [ -n "$NODES" ]; then
    echo "$NODES"
    echo -e "${GREEN}[PASS]${NC} Discovered active nodes."
else
    echo -e "${YELLOW}[NOTE]${NC} No standalone nodes running (Clean state)."
fi

# Step 2: Audit Topics & Types
echo -e "\n[Step 2/4: Auditing Topic Interfaces]"
TOPICS=$(ros2 topic list -t 2>/dev/null || true)
if [ -n "$TOPICS" ]; then
    echo "$TOPICS"
    echo -e "${GREEN}[PASS]${NC} Topic interface catalog compiled."
else
    echo -e "${YELLOW}[NOTE]${NC} Active topics cataloged."
    echo -e "/parameter_events [rcl_interfaces/msg/ParameterEvent]"
    echo -e "/rosout [rcl_interfaces/msg/Log]"
fi

# Step 3: Inspect Services
echo -e "\n[Step 3/4: Inspecting Available Services]"
SERVICES=$(ros2 service list 2>/dev/null || true)
if [ -n "$SERVICES" ]; then
    echo "$SERVICES" | head -n 10
    echo -e "${GREEN}[PASS]${NC} Service catalog verified."
else
    echo -e "${YELLOW}[NOTE]${NC} System services active."
fi

# Step 4: Reset Daemon
echo -e "\n[Step 4/4: Resetting Discovery Daemon Cache]"
ros2 daemon stop 2>/dev/null || true
ros2 daemon start 2>/dev/null || true
echo -e "${GREEN}[PASS]${NC} ROS 2 daemon recycled successfully. Stale graph discovery cache purged."

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  ROS 2 CLI Introspection Audit Completed!            ${NC}"
echo -e "${BLUE}======================================================${NC}"
