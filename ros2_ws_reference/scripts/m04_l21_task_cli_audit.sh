#!/usr/bin/env bash
# ==============================================================================
# Nexus AMR Learning Hub - Level 1: Module 4 (Bonus) / Lesson 21
# Script:  m02_l13_task_cli_audit.sh
# Purpose: Comprehensive ROS 2 CLI Introspection & Health Audit (Student Task)
# ==============================================================================
#
# YOUR MISSION:
# -------------
# Automate system auditing across nodes, topics, services, parameters, and
# daemon recovery using pure ROS 2 CLI commands.
#
# OBJECTIVES:
# -----------
# 1. TODO 1: List all active nodes in the system (ros2 node list)
# 2. TODO 2: List all active topics with their message types (ros2 topic list -t)
# 3. TODO 3: Inspect active service endpoints (ros2 service list)
# 4. TODO 4: Execute a daemon restart (ros2 daemon stop && ros2 daemon start)
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

# ==============================================================================
# TODO 1: Audit active nodes
# - Hint: Use 'ros2 node list' to query all discoverable nodes currently registered on the DDS domain.
# ==============================================================================
echo -e "\n[Step 1/4: Discovering Active Nodes]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 2: Audit active topics and types
# - Hint: Use 'ros2 topic list' with the -t flag to print topic names alongside their message interface types.
# ==============================================================================
echo -e "\n[Step 2/4: Auditing Topic Interfaces]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 3: Audit active services
# - Hint: Use 'ros2 service list' to enumerate all active service servers.
# ==============================================================================
echo -e "\n[Step 3/4: Inspecting Available Services]"
# ---> YOUR CODE HERE <---


# ==============================================================================
# TODO 4: Reset ROS 2 Daemon to clear stale discovery cache
# - Hint: Invoke 'ros2 daemon' with stop and start subcommands to clear any stale discovery cache entries.
# ==============================================================================
echo -e "\n[Step 4/4: Resetting Discovery Daemon Cache]"
# ---> YOUR CODE HERE <---

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  ROS 2 CLI Introspection Audit Completed!            ${NC}"
echo -e "${BLUE}======================================================${NC}"
