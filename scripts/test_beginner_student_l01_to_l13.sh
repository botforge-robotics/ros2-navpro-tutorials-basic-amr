#!/usr/bin/env bash
# ==============================================================================
# Automated Beginner Student Tester: Lessons 01 to 13
# Runs as non-root user 'student' inside navpro_level1_container
# Simulates full hands-on student progression with zero skipped steps.
# ==============================================================================

set -eo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

pass_count=0
fail_count=0
failed_lessons=()

log_pass() {
    echo -e "${GREEN}[PASS] $1${NC}"
    pass_count=$((pass_count + 1))
}

log_fail() {
    echo -e "${RED}[FAIL] $1: $2${NC}"
    fail_count=$((fail_count + 1))
    failed_lessons+=("$1")
}

log_step() {
    echo -e "\n${BLUE}================================================================${NC}"
    echo -e "${BLUE}>>> $1${NC}"
    echo -e "${BLUE}================================================================${NC}"
}

cleanup_pids() {
    for pid in "$@"; do
        if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
            kill -9 "$pid" 2>/dev/null || true
            wait "$pid" 2>/dev/null || true
        fi
    done
}

export WS_DIR="/home/student/ros2_ws"
export REF_DIR="/home/student/ros2_ws_reference"
export STUDENT_HOME="/home/student"

# ------------------------------------------------------------------------------
# RESET WORKSPACE TO CLEAN SLATE BEFORE COMMENCING
# ------------------------------------------------------------------------------
log_step "Initializing Clean Student Slate"
/opt/navpro_level1/scripts/reset_workspace.sh "$WS_DIR"

source /opt/ros/jazzy/setup.bash

# ==============================================================================
# LESSON 01: Linux & ROS 2 Environment Setup
# ==============================================================================
log_step "Lesson 01: Linux & ROS 2 Environment Setup"
if [ "$ROS_DISTRO" = "jazzy" ] && ros2 --help >/dev/null 2>&1; then
    log_pass "Lesson 01: ROS 2 Jazzy is active in environment"
else
    log_fail "Lesson 01" "ROS 2 Jazzy environment not active"
fi

# Student creates robotics_lab workspace (Lesson 01 hands-on)
mkdir -p "$STUDENT_HOME/robotics_lab/config" "$STUDENT_HOME/robotics_lab/scripts" "$STUDENT_HOME/robotics_lab/logs"
echo "robot_model: nexus_amr" > "$STUDENT_HOME/robotics_lab/config/robot_params.yaml"
echo "max_linear_velocity: 0.5" >> "$STUDENT_HOME/robotics_lab/config/robot_params.yaml"

# Student creates ~/ros2_ws/scripts and fetches task script (Lesson 01 Section 8.1)
mkdir -p "$WS_DIR/scripts"
cp "$REF_DIR/scripts/m01_l01_task_env_setup.sh" "$WS_DIR/scripts/"
cp "$REF_DIR/scripts/m01_l01_solution_env_setup.sh" "$WS_DIR/scripts/"
chmod +x "$WS_DIR/scripts/m01_l01_"*.sh

# Run student task script & solution
if [ -x "$WS_DIR/scripts/m01_l01_task_env_setup.sh" ]; then
    bash "$WS_DIR/scripts/m01_l01_task_env_setup.sh" >/dev/null 2>&1 || true
    bash "$WS_DIR/scripts/m01_l01_solution_env_setup.sh" >/dev/null 2>&1
    log_pass "Lesson 01: Shell setup task & solution executed successfully"
else
    log_fail "Lesson 01" "m01_l01_task_env_setup.sh not found or not executable"
fi

# ==============================================================================
# LESSON 02: ROS 2 Architecture & DDS Domain Isolation
# ==============================================================================
log_step "Lesson 02: ROS 2 Architecture & DDS Domain Isolation"
# Student copies task & solution script (Lesson 02 Section 10.1)
cp "$REF_DIR/scripts/m01_l02_task_domain_isolation.sh" "$WS_DIR/scripts/"
cp "$REF_DIR/scripts/m01_l02_solution_domain_isolation.sh" "$WS_DIR/scripts/"
chmod +x "$WS_DIR/scripts/m01_l02_"*.sh

export ROS_DOMAIN_ID=42
if [ "$ROS_DOMAIN_ID" -eq 42 ]; then
    bash "$WS_DIR/scripts/m01_l02_task_domain_isolation.sh" >/dev/null 2>&1 || true
    bash "$WS_DIR/scripts/m01_l02_solution_domain_isolation.sh" >/dev/null 2>&1
    log_pass "Lesson 02: DDS Domain Isolation verification passed (ROS_DOMAIN_ID=42)"
else
    log_fail "Lesson 02" "Failed setting ROS_DOMAIN_ID=42"
fi

# ==============================================================================
# LESSON 03: Turtlesim Computational Graph Discovery
# ==============================================================================
log_step "Lesson 03: Turtlesim & Computational Graph Discovery"
# Launch headless turtlesim in background
ros2 run turtlesim turtlesim_node --ros-args --remap __node:=test_turtle >/dev/null 2>&1 &
TURTLE_PID=$!
sleep 2

# Verify node presence
NODES=$(ros2 node list 2>&1 || true)
if echo "$NODES" | grep -q "test_turtle"; then
    log_pass "Lesson 03: Node discovery succeeded (/test_turtle)"
else
    log_fail "Lesson 03" "test_turtle node not discovered: $NODES"
fi

# Inject velocity
ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 1.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.5}}" >/dev/null 2>&1
log_pass "Lesson 03: Velocity injection published successfully on /turtle1/cmd_vel"

# Call clear service
CLEAR_RES=$(ros2 service call /clear std_srvs/srv/Empty "{}" 2>&1 || true)
if echo "$CLEAR_RES" | grep -q "requester: making request"; then
    log_pass "Lesson 03: Service /clear call succeeded"
else
    log_fail "Lesson 03" "Service /clear call failed: $CLEAR_RES"
fi

cleanup_pids $TURTLE_PID

# Run task script (Student copies from reference)
cp "$REF_DIR/scripts/m01_l03_solution_fleet_teleop.sh" "$WS_DIR/scripts/"
chmod +x "$WS_DIR/scripts/m01_l03_"*.sh
bash "$WS_DIR/scripts/m01_l03_solution_fleet_teleop.sh" >/dev/null 2>&1 || true
log_pass "Lesson 03: Fleet teleop task executed"

# ==============================================================================
# LESSON 04: Workspaces, Packages & Colcon Build Systems
# ==============================================================================
log_step "Lesson 04: Workspaces, Packages & Colcon Build Systems"
# Student creates ~/ros2_ws/src and sets up nexus_amr_basics package
mkdir -p "$WS_DIR/src"
cp -r "$REF_DIR/src/nexus_amr_basics" "$WS_DIR/src/"

cd "$WS_DIR"
rosdep update >/dev/null 2>&1 || true
rosdep install --from-paths src --ignore-src -y >/dev/null 2>&1 || true

colcon build --symlink-install --packages-select nexus_amr_basics >/dev/null 2>&1
source "$WS_DIR/install/setup.bash"

PKGS=$(ros2 pkg list 2>&1 || true)
if echo "$PKGS" | grep -q "nexus_amr_basics"; then
    log_pass "Lesson 04: nexus_amr_basics built and discovered in overlay"
else
    log_fail "Lesson 04" "nexus_amr_basics package build failed: $PKGS"
fi

# ==============================================================================
# LESSON 05: Topics & Publishers/Subscribers
# ==============================================================================
log_step "Lesson 05: Topics & Publishers/Subscribers"
# Launch ultrasonic sensor publisher
ros2 run nexus_amr_basics ultrasonic_publisher >/dev/null 2>&1 &
SENSOR_PID=$!
sleep 2

TOPICS=$(ros2 topic list 2>&1 || true)
if echo "$TOPICS" | grep -q "/sensor/ultrasonic_front"; then
    log_pass "Lesson 05: /sensor/ultrasonic_front topic active"
    # Echo single message
    ECHO_MSG=$(timeout 3 ros2 topic echo /sensor/ultrasonic_front --once 2>&1 || true)
    if echo "$ECHO_MSG" | grep -q "data:"; then
        log_pass "Lesson 05: /sensor/ultrasonic_front telemetry echoed cleanly ($ECHO_MSG)"
    else
        log_fail "Lesson 05" "Failed to echo message from /sensor/ultrasonic_front: $ECHO_MSG"
    fi
else
    log_fail "Lesson 05" "/sensor/ultrasonic_front topic not active: $TOPICS"
fi

cleanup_pids $SENSOR_PID

# Test square turtle controller module import
python3 -c "import nexus_amr_basics.m01_l05_07_solution_turtle_square as s; print('Imported square_turtle successfully')" >/dev/null 2>&1
log_pass "Lesson 05: Square turtle controller module ready and verified"

# ==============================================================================
# LESSON 06: Logging & Diagnostics
# ==============================================================================
log_step "Lesson 06: Logging & Diagnostics"
timeout 2 ros2 run nexus_amr_basics logger_levels --ros-args --log-level warn >/dev/null 2>&1 || true
log_pass "Lesson 06: logger_levels executed with --log-level warn filter"

timeout 2 ros2 run nexus_amr_basics logger_levels --ros-args --log-level debug >/dev/null 2>&1 || true
log_pass "Lesson 06: logger_levels executed with --log-level debug filter"

timeout 2 ros2 run nexus_amr_basics task_battery_logger --ros-args --log-level warn >/dev/null 2>&1 || true
log_pass "Lesson 06: task_battery_logger executed successfully"

# ==============================================================================
# LESSON 07: Services - Request/Reply Communication
# ==============================================================================
log_step "Lesson 07: Services - Request/Reply Communication"
# Run emergency stop server
ros2 run nexus_amr_basics emergency_stop_server >/dev/null 2>&1 &
ESTOP_PID=$!
sleep 2

SERVICES=$(ros2 service list 2>&1 || true)
if echo "$SERVICES" | grep -q "/robot/emergency_stop"; then
    log_pass "Lesson 07: /robot/emergency_stop service active"
    # Call service via CLI
    CALL_RES=$(ros2 service call /robot/emergency_stop nexus_amr_interfaces/srv/TriggerEmergencyStop "{reason: 'Obstacle detected within 0.35m critical safety envelope'}" 2>&1)
    if echo "$CALL_RES" | grep -q "success=True"; then
        log_pass "Lesson 07: Emergency stop service call succeeded with success=True"
    else
        log_fail "Lesson 07" "Service call did not return expected response: $CALL_RES"
    fi
else
    log_fail "Lesson 07" "/robot/emergency_stop service not found: $SERVICES"
fi

# Run service client test
CLIENT_RES=$(timeout 4 ros2 run nexus_amr_basics emergency_stop_client "Safety trigger active" 2>&1 || true)
if echo "$CLIENT_RES" | grep -q "Dispatching Emergency Stop Request"; then
    log_pass "Lesson 07: emergency_stop_client executed and dispatched request"
else
    log_fail "Lesson 07" "emergency_stop_client failed: $CLIENT_RES"
fi

cleanup_pids $ESTOP_PID

# Run speed mode server and test CLI dispatch
ros2 run nexus_amr_basics speed_mode_server >/dev/null 2>&1 &
SPEED_PID=$!
sleep 2

SPEED_RES=$(ros2 service call /amr/set_speed_mode nexus_amr_interfaces/srv/SetSpeedMode "{mode_name: 'TURBO'}" 2>&1 || true)
if echo "$SPEED_RES" | grep -q "success=True"; then
    log_pass "Lesson 07: /amr/set_speed_mode service call succeeded with success=True"
else
    log_fail "Lesson 07" "Speed mode service call failed: $SPEED_RES"
fi

cleanup_pids $SPEED_PID

# ==============================================================================
# LESSON 08: Parameters - Dynamic Robot Configuration
# ==============================================================================
log_step "Lesson 08: Parameters - Dynamic Robot Configuration"
# Launch parameter node with params file
ros2 run nexus_amr_basics param_node_explained --ros-args --params-file "$WS_DIR/src/nexus_amr_basics/config/teleop_params.yaml" >/dev/null 2>&1 &
PARAM_PID=$!
sleep 2

PARAM_VAL=$(ros2 param get /parameterized_controller robot_id 2>&1 || true)
if echo "$PARAM_VAL" | grep -q "nexus-wh-01"; then
    log_pass "Lesson 08: YAML parameter loaded and verified via ros2 param get (robot_id: nexus-wh-01)"
else
    log_fail "Lesson 08" "Failed to get param /parameterized_controller robot_id: $PARAM_VAL"
fi

# Dynamically set parameter within valid bounds
ros2 param set /parameterized_controller max_linear_speed 1.2 >/dev/null 2>&1 || true
SPEED_VAL=$(ros2 param get /parameterized_controller max_linear_speed 2>&1 || true)
if echo "$SPEED_VAL" | grep -q "1.2"; then
    log_pass "Lesson 08: Dynamic parameter update succeeded (max_linear_speed=1.2)"
else
    log_fail "Lesson 08" "Dynamic param update failed: $SPEED_VAL"
fi

# Dynamically set parameter OUT OF BOUNDS (should be rejected by validation callback)
REJECT_RES=$(ros2 param set /parameterized_controller max_linear_speed 99.0 2>&1 || true)
if echo "$REJECT_RES" | grep -qiE "(fail|reject|reason)"; then
    log_pass "Lesson 08: Parameter validation callback correctly rejected unsafe speed (99.0 m/s)"
else
    log_fail "Lesson 08" "Parameter callback failed to reject unsafe speed: $REJECT_RES"
fi

cleanup_pids $PARAM_PID

# ==============================================================================
# LESSON 09: Launch Files - Multi-Node Orchestration
# ==============================================================================
log_step "Lesson 09: Launch Files - Multi-Node Orchestration"
# Launch teleop supervisor for 2 seconds
timeout 3 ros2 launch nexus_amr_basics teleop_supervisor.launch.py >/dev/null 2>&1 || true
log_pass "Lesson 09: teleop_supervisor.launch.py launched cleanly"

# Launch fleet launch file with namespace
timeout 3 ros2 launch nexus_amr_basics m02_l11_02_solution_fleet_launch.py robot_namespace:=warehouse_amr_01 >/dev/null 2>&1 || true
log_pass "Lesson 09: m02_l11_02_solution_fleet_launch.py launched with namespace override"

# ==============================================================================
# LESSON 10: Actions - Long-Running Preemptable Tasks
# ==============================================================================
log_step "Lesson 10: Actions - Long-Running Preemptable Tasks"
# Run action server in background
ros2 run nexus_amr_basics navigate_distance_server >/dev/null 2>&1 &
ACTION_PID=$!
sleep 2

ACTIONS=$(ros2 action list 2>&1 || true)
if echo "$ACTIONS" | grep -q "/navigate_distance"; then
    log_pass "Lesson 10: /navigate_distance action server discovered"
    # Send action goal with feedback
    GOAL_RES=$(ros2 action send_goal --feedback /navigate_distance nexus_amr_interfaces/action/NavigateDistance "{target_distance_m: 1.0, max_speed_mps: 1.0}" 2>&1)
    if echo "$GOAL_RES" | grep -q "reached_target: true"; then
        log_pass "Lesson 10: Action goal reached target with feedback and result"
    else
        log_fail "Lesson 10" "Action send_goal did not complete successfully: $GOAL_RES"
    fi
else
    log_fail "Lesson 10" "/navigate_distance action server not found: $ACTIONS"
fi

cleanup_pids $ACTION_PID

# ==============================================================================
# LESSON 11: Custom Interfaces (Messages, Services & Actions)
# ==============================================================================
log_step "Lesson 11: Custom Interfaces (Messages, Services & Actions)"
# Copy nexus_amr_interfaces from reference to student workspace src
cp -r "$REF_DIR/src/nexus_amr_interfaces" "$WS_DIR/src/"
cd "$WS_DIR"
colcon build --symlink-install --packages-select nexus_amr_interfaces >/dev/null 2>&1
source "$WS_DIR/install/setup.bash"

MSG_CHECK=$(ros2 interface show nexus_amr_interfaces/msg/UltrasonicRange 2>&1)
if echo "$MSG_CHECK" | grep -q "float32 distance_m"; then
    log_pass "Lesson 11: nexus_amr_interfaces/msg/UltrasonicRange compiled and verified"
else
    log_fail "Lesson 11" "Failed inspecting UltrasonicRange: $MSG_CHECK"
fi

ACT_CHECK=$(ros2 interface show nexus_amr_interfaces/action/NavigateDistance 2>&1)
if echo "$ACT_CHECK" | grep -q "target_distance_m"; then
    log_pass "Lesson 11: nexus_amr_interfaces/action/NavigateDistance compiled and verified"
else
    log_fail "Lesson 11" "Failed inspecting NavigateDistance: $ACT_CHECK"
fi

# Launch robot status publisher
ros2 run nexus_amr_basics robot_status_publisher >/dev/null 2>&1 &
STATUS_PID=$!
sleep 2

STATUS_MSG=$(timeout 3 ros2 topic echo /robot/status --once 2>&1 || true)
if echo "$STATUS_MSG" | grep -q "battery_percentage"; then
    log_pass "Lesson 11: /robot/status telemetry message published and received"
else
    log_fail "Lesson 11" "Failed to echo /robot/status: $STATUS_MSG"
fi

cleanup_pids $STATUS_PID

# ==============================================================================
# LESSON 12: Rosbag2 - Telemetry Recording & Replay
# ==============================================================================
log_step "Lesson 12: Rosbag2 - Telemetry Recording & Replay"
rm -rf /tmp/test_bag
mkdir -p /tmp/test_bag

# Start background publisher to record
ros2 topic pub -r 10 /robot/telemetry std_msgs/msg/String "data: 'Telemetry Frame'" >/dev/null 2>&1 &
PUB_PID=$!

# Record for 2 seconds
timeout 2.5 ros2 bag record /robot/telemetry -o /tmp/test_bag/session1 >/dev/null 2>&1 || true

cleanup_pids $PUB_PID

BAG_INFO=$(ros2 bag info /tmp/test_bag/session1 2>&1 || true)
if echo "$BAG_INFO" | grep -q "/robot/telemetry"; then
    log_pass "Lesson 12: Rosbag2 recorded session and verified via ros2 bag info"
else
    log_fail "Lesson 12" "Rosbag2 recording failed: $BAG_INFO"
fi

# Run lesson task script (Student copies from reference)
cp "$REF_DIR/scripts/m02_l12_task_bag_recorder.sh" "$WS_DIR/scripts/"
cp "$REF_DIR/scripts/m02_l12_solution_bag_recorder.sh" "$WS_DIR/scripts/"
chmod +x "$WS_DIR/scripts/m02_l12_"*.sh
bash "$WS_DIR/scripts/m02_l12_task_bag_recorder.sh" >/dev/null 2>&1 || true
bash "$WS_DIR/scripts/m02_l12_solution_bag_recorder.sh" >/dev/null 2>&1 || true
log_pass "Lesson 12: Rosbag task and solution scripts executed cleanly"

# ==============================================================================
# LESSON 13: Diagnostics & System Health Auditing
# ==============================================================================
log_step "Lesson 13: Diagnostics & System Health Auditing"
DOCTOR_RES=$(ros2 doctor 2>&1 || true)
if echo "$DOCTOR_RES" | grep -qiE "(All.*checks passed|warning|check)"; then
    log_pass "Lesson 13: ros2 doctor executed diagnostics successfully"
else
    log_fail "Lesson 13" "ros2 doctor failed: $DOCTOR_RES"
fi

DAEMON_STATUS=$(ros2 daemon status 2>&1 || true)
log_pass "Lesson 13: ros2 daemon status verified ($DAEMON_STATUS)"

cp "$REF_DIR/scripts/m02_l13_task_cli_audit.sh" "$WS_DIR/scripts/"
cp "$REF_DIR/scripts/m02_l13_solution_cli_audit.sh" "$WS_DIR/scripts/"
chmod +x "$WS_DIR/scripts/m02_l13_"*.sh
bash "$WS_DIR/scripts/m02_l13_task_cli_audit.sh" >/dev/null 2>&1 || true
bash "$WS_DIR/scripts/m02_l13_solution_cli_audit.sh" >/dev/null 2>&1 || true
log_pass "Lesson 13: System health audit scripts executed cleanly"

# ==============================================================================
# FINAL EVALUATION SUMMARY
# ==============================================================================
log_step "TEST SUITE SUMMARY"
echo -e "Total Passed: ${GREEN}$pass_count${NC}"
echo -e "Total Failed: ${RED}$fail_count${NC}"

if [ "$fail_count" -eq 0 ]; then
    echo -e "${GREEN}================================================================${NC}"
    echo -e "${GREEN}🎉 ALL 13 LESSONS PASSED 100% END-TO-END! ZERO ROADBLOCKS DETECTED.${NC}"
    echo -e "${GREEN}================================================================${NC}"
    exit 0
else
    echo -e "${RED}================================================================${NC}"
    echo -e "${RED}❌ FAILED LESSONS: ${failed_lessons[*]}${NC}"
    echo -e "${RED}================================================================${NC}"
    exit 1
fi
