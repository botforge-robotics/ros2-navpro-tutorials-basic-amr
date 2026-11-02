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

# Step 1: Workspace Directory Structure
echo -e "\n[Step 1/1: Creating Robotics Workspace Directory Tree]"
mkdir -p "${WS_DIR}/src" "${WS_DIR}/logs" "${WS_DIR}/config"
if [ -d "${WS_DIR}/src" ] && [ -d "${WS_DIR}/logs" ] && [ -d "${WS_DIR}/config" ]; then
    echo -e "${GREEN}[PASS]${NC} Workspace directory structure established at: ${GREEN}${WS_DIR}${NC}"
else
    echo -e "${RED}[FAIL]${NC} Could not create workspace directories!"
    exit 1
fi

echo -e "\n${BLUE}======================================================${NC}"
echo -e "${GREEN}  Workspace Setup Complete: READY FOR ROBOTICS!        ${NC}"
echo -e "${BLUE}======================================================${NC}"
