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

# ==============================================================================
# TODO 1: Create the workspace directories:
#         - "${WS_DIR}/src"
#         - "${WS_DIR}/logs"
#         - "${WS_DIR}/config"
# - Hint: Use `mkdir -p` with directory paths to ensure parent directories are created.
# ==============================================================================
echo -e "\n[Step 1/1: Creating Robotics Workspace Directory Tree]"
# ---> YOUR CODE HERE <---

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Workspace Setup Complete: READY FOR ROBOTICS!        ${NC}"
echo -e "${BLUE}======================================================${NC}"
