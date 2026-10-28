#!/bin/bash
# =============================================================================
# Nexus AMR Learning Hub - Student Environment Reset Script
# Deletes student-created workspaces (ros2_ws, roboticslab, robotics_lab)
# and clears ROS 2 daemon, logs, and build artifacts so students start fresh.
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STUDENT_HOME="${STUDENT_HOME:-/home/student}"

echo "=================================================================="
echo "  [Nexus AMR Reset] Resetting Student Workspace to Fresh State"
echo "=================================================================="

# 1. Stop any active user ROS 2 nodes, daemons, or simulators
echo "-> Stopping active ROS 2 background daemons and processes..."
pkill -u "$(whoami)" -f "(ros2 run|ros2 launch|turtlesim_node|gz sim|rviz2)" 2>/dev/null || true
pkill -u "$(whoami)" -x "ros2" 2>/dev/null || true

# 2. Delete student-created lab folder (created in Lesson 01)
echo "-> Deleting student-created lab directories (roboticslab, robotics_lab)..."
rm -rf "$STUDENT_HOME/roboticslab" "$STUDENT_HOME/robotics_lab" "$HOME/roboticslab" "$HOME/robotics_lab" "$STUDENT_HOME/nexus_ws" "$HOME/nexus_ws" 2>/dev/null || true

# 3. Delete student-created ROS 2 workspace (created in Lesson 04)
echo "-> Deleting student-created ROS 2 workspace (~/ros2_ws)..."
TARGET_WS_DIRS=("$STUDENT_HOME/ros2_ws" "$HOME/ros2_ws" "$SCRIPT_DIR/../ros2_ws")

for WS in "${TARGET_WS_DIRS[@]}"; do
    if [ -d "$WS" ]; then
        # Remove all contents (including hidden files)
        rm -rf "$WS"/* "$WS"/.[!.]* "$WS"/..?* 2>/dev/null || true
        # Attempt to remove the directory itself (succeeds if not a mounted volume)
        rmdir "$WS" 2>/dev/null || rm -rf "$WS" 2>/dev/null || true
    fi
done

# 4. Clean temporary rosbag recordings, ros logs, and build leftovers
echo "-> Purging ROS 2 logs and temporary build caches..."
rm -rf "$STUDENT_HOME/.ros/log" "$HOME/.ros/log" /tmp/test_bag /tmp/rosbag* 2>/dev/null || true

# 5. Reset Web Platform Progress State if applicable
if [ -d "$SCRIPT_DIR/../web" ]; then
    RESET_TIME=$(date +%s)
    echo "{\"last_reset\": $RESET_TIME, \"completed_lessons\": []}" > "$SCRIPT_DIR/../web/progress_state.json" 2>/dev/null || true
fi

echo "=================================================================="
echo "  [SUCCESS] Student environment has been completely reset!"
echo "  - Deleted: ~/ros2_ws"
echo "  - Deleted: ~/roboticslab / ~/robotics_lab"
echo "  Students will create ~/roboticslab in Lesson 01 and ~/ros2_ws in Lesson 04."
echo "=================================================================="
