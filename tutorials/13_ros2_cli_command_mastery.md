# Lesson 13: Complete ROS 2 Command-Line Interface (CLI) Mastery

> **Focus:** Full CLI Tooling Reference, Inspection Workflows & Production Troubleshooting  
> **Course Track:** NavPro Learning Hub - Level 1 (Lecture 05)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

The ROS 2 Command-Line Interface (`ros2`) is an engineer's Swiss Army knife for introspecting, testing, and debugging distributed robotics networks.

By the end of this lesson, you will:
1. Master all 10 core CLI command groups: `node`, `topic`, `service`, `param`, `action`, `interface`, `bag`, `pkg`, `doctor`, and `daemon`.
2. Diagnose and resolve real-world robotics anomalies (dropped messages, QoS mismatches, phantom nodes).
3. Use `ros2 doctor` to audit your network, middleware, and operating system health.
4. Execute complex message injection and debugging directly from the terminal without writing one-off scripts.

---

## 2. Master CLI Reference Matrix

![ROS 2 CLI Command Ecosystem](../assets/images/ros2_cli_ecosystem.svg)

---

## 3. Comprehensive Command Groups

### 3.1 Node Introspection (`ros2 node`)
```bash
# List all active nodes in the current ROS_DOMAIN_ID
ros2 node list

# Inspect all publishers, subscribers, services, and actions associated with a specific node
ros2 node info /teleop_speed_limiter
```

### 3.2 Topic Introspection & Injection (`ros2 topic`)
```bash
# List all active topics with their interface message types
ros2 topic list -t

# Inspect topic endpoints, subscriber count, and active QoS profiles
ros2 topic info /cmd_vel --verbose

# Echo live messages flowing through topic (prints formatted JSON/YAML to terminal)
ros2 topic echo /cmd_vel

# Measure exact publishing frequency in Hertz (Hz)
ros2 topic hz /cmd_vel

# Measure network bandwidth utilization (KB/s)
ros2 topic bw /cmd_vel

# Manually publish a single message from the terminal
ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.2}, angular: {z: 0.0}}"

# Continuously publish at 10 Hz
ros2 topic pub -r 10 /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.1}, angular: {z: 0.05}}"
```

### 3.3 Service Introspection & Invocation (`ros2 service`)
```bash
# List all active service endpoints
ros2 service list -t

# Identify the .srv interface type used by a service
ros2 service type /robot/set_autonomous_mode

# Call a service with parameters directly from terminal
ros2 service call /robot/set_autonomous_mode std_srvs/srv/SetBool "{data: true}"

# Find all active services using a specific interface
ros2 service find std_srvs/srv/Trigger
```

### 3.4 Dynamic Parameters (`ros2 param`)
```bash
# List all parameters declared across all active nodes
ros2 param list

# Query current parameter value
ros2 param get /parameterized_controller max_linear_speed

# Dynamically modify a parameter at runtime
ros2 param set /parameterized_controller max_linear_speed 0.85

# Export live parameters of a node to a YAML backup file
ros2 param dump /parameterized_controller > backup_params.yaml

# Load parameters from a YAML file into a running node
ros2 param load /parameterized_controller backup_params.yaml
```

### 3.5 Action Introspection (`ros2 action`)
```bash
# List all active action servers
ros2 action list -t

# Inspect action server and client count
ros2 action info /patrol_robot

# Send an action goal from terminal and display real-time feedback
ros2 action send_goal /patrol_robot navpro_interfaces/action/Patrol "{loop_count: 2}" --feedback
```

### 3.6 Interface Definitions (`ros2 interface`)
```bash
# Display the exact fields and comments of any message or service definition
ros2 interface show geometry_msgs/msg/Twist

# Output a template JSON payload for testing
ros2 interface proto geometry_msgs/msg/Twist

# List all interfaces provided by a package
ros2 interface package navpro_interfaces
```

---

## 4. Advanced Debugging & Recovery Tools

### 4.1 System Auditing with `ros2 doctor`
`ros2 doctor` scans your network interfaces, environment variables, DDS configuration, and computational graph for anomalies:

```bash
# Run quick health audit
ros2 doctor

# Generate comprehensive markdown diagnostic report
ros2 doctor --report
```
*Detects: Unmatched topic publishers with no subscribers, missing environment variables, conflicting DDS settings, and network MTU issues.*

### 4.2 Resetting the ROS 2 Daemon (`ros2 daemon`)
ROS 2 runs a background caching daemon to accelerate CLI queries. If you kill terminals forcefully, old "ghost" nodes may linger in `ros2 node list`.

```bash
# Check daemon status
ros2 daemon status

# Restart the discovery cache daemon
ros2 daemon stop
ros2 daemon start
```

---

## 5. Real-World Troubleshooting Guide

### Issue 1: `ros2 topic echo` displays nothing, but node is running
1. Run `ros2 topic info /topic_name --verbose`.
2. Check if Publisher and Subscriber have **QoS Mismatch** (e.g. Publisher is `BEST_EFFORT`, but subscriber requested `RELIABLE`).
3. Check if nodes are on different `ROS_DOMAIN_ID`s: `echo $ROS_DOMAIN_ID`.

### Issue 2: `Package not found` after building
1. Did you run `source install/setup.bash` in the current terminal?
2. Did you create the empty marker file inside `resource/<package_name>`?
3. Check `setup.py` `data_files` to ensure the resource directory was registered.

---

## 6. Hands-on Student Challenge

**Task:**
Without looking at any source code:
1. Start `sim_world.launch.py` from `navpro_gazebo`.
2. Use CLI commands to find the exact message type of `/scan`.
3. Measure the publishing rate (Hz) of `/scan`.
4. Publish a `/cmd_vel` message that commands the robot to rotate in place at `0.5 rad/s`.
5. Verify in Gazebo that the robot turns!
