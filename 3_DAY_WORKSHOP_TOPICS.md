# 🤖 3-Day Autonomous Mobile Robot (AMR) Engineering Workshop
## Complete Curriculum & Technical Topics Breakdown
**Course Track:** Level 1 • Zero-to-Autonomous AMR Engineer  
**Robotics Framework:** ROS 2 Jazzy Jalisco (Python-First Workflow)  
**Target OS & Stack:** Ubuntu 24.04 LTS (Containerized Docker) • VS Code IDE • noVNC GUI  
**Reference Robot:** *Nexus AMR* (Differential-Drive Industrial Warehouse Robot)

---

## 📋 Executive Overview & Pedagogical Roadmap

This intensive, 3-day production robotics workshop transforms software engineers, roboticists, and university students into autonomous robotics practitioners. The curriculum moves methodically from the Linux kernel and distributed DDS communications to kinematic 3D modeling, Gazebo physics simulation, LiDAR-based SLAM, and the Nav2 autonomous navigation stack.

```
DAY 1: ROS 2 Foundations & Core Middleware (Lessons 01 – 08)
├── Linux Systems & Multi-Terminal Mastery (Terminator, ~/.bashrc, permissions)
├── ROS 2 Architecture & DDS Peer-to-Peer Communication Model
├── Computational Graph Introspection with CLI Tools & Turtlesim
├── Package Architecture, colcon build Chaining, and Environment Overlays
├── Communication I: Publishers, Subscribers & Quality of Service (QoS)
├── Communication II: Service Servers & Asynchronous Clients in Python
├── Runtime Management: Python Launch System, Namespaces & Remappings
└── Communication III: Action Servers, Preemption & Goal Feedback Loops

DAY 2: 3D Robot Modeling & Physics Simulation (Lessons 09 – 12)
├── Kinematic Tree Modeling: URDF Links, Joints (Continuous, Revolute, Fixed)
├── Parametric Modular Modeling with Xacro (Macros, Inertials, Collisions)
├── RViz2 Visualizer & TF2 Coordinate Frames (REP-103, REP-105 Standards)
├── Gazebo Physics Simulation & Differential Drive Sensor Plugins
└── Industrial Warehouse World Design (SDF Shelving, Barriers & Lighting)

DAY 3: Autonomous SLAM & Nav2 Navigation (Lessons 13 – 16)
├── 2D LiDAR SLAM Mapping with SLAM Toolbox (Scan Matching & Loop Closures)
├── Nav2 Stack Architecture & Layered 2D Costmaps (Static, Obstacle, Inflation)
├── Global Path Planners (Smac/NavFn) & Local Trajectory Controllers (DWB/RPP)
└── Autonomous Warehouse Inspection Patrol with Nav2 Simple Commander SDK

BONUS TRACK: Advanced Masterclasses & Production Electives (Lessons 17 – 22)
├── Dynamic Parameters, Descriptors & YAML Configuration Management
├── Industrial Logging Framework & VS Code Developer Environment
├── Custom IDL Interfaces: .msg, .srv, and .action CMake Generation
├── Deterministic Dataset Recording & Playback with ROS 2 Bags (MCAP)
├── Complete ROS 2 Command-Line Interface (CLI) Inspection Matrix
└── Behavior Trees (BT), Recovery Behaviors & Lifecycle State Machines
```

---

## 🗓️ High-Level Schedule Matrix

| Day | Theme | Lessons Covered | Core Hands-On Milestone |
| :--- | :--- | :--- | :--- |
| **Day 1** | **ROS 2 Foundations & Core Middleware** | Lessons 01 – 08 | Build, compile, and orchestrate a multi-node sensor monitoring and teleoperation speed-governor stack using Topics, Services, Actions, and Launch files. |
| **Day 2** | **3D Robot Modeling & Physics Simulation** | Lessons 09 – 12 | Write a modular Xacro URDF model for the Nexus AMR, visualize its kinematic TF tree in RViz2, and simulate its physics and LiDAR sensors in Gazebo. |
| **Day 3** | **Autonomous SLAM & Nav2 Navigation** | Lessons 13 – 16 | Map an industrial warehouse using SLAM Toolbox, configure layered 2D costmaps, tune local trajectory critics, and execute a multi-checkpoint autonomous patrol mission via Python. |
| **Bonus** | **Production Electives & Masterclasses** | Lessons 17 – 22 | Custom IDL message compilation, MCAP ROS bags, parameter safety descriptors, industrial logging, CLI introspection, and Nav2 lifecycle state machines. |

---

# 📅 DAY 1: ROS 2 Foundations & Core Middleware

### Pedagogical Goal:
Master the Linux terminal environment, understand ROS 2 peer-to-peer DDS middleware architecture, build and compile Python packages with `colcon`, implement all three core communication mechanisms (Pub/Sub, Services, Actions), and manage multi-node execution with Python launch files.

---

### Lesson 01: Linux Fundamentals for Robotics Engineers
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Essential Linux Terminal Commands, Filesystem Hierarchy, POSIX File Permissions & Process Management.
* **Key Topics Covered:**
  - **The Linux Filesystem for Roboticists:** Root `/`, `/opt/ros/jazzy/` system installations, user workspace `/home/student/`, system configurations `/etc/`, hardware devices `/dev/ttyUSB*` / `/dev/video*`, and kernel logs `/var/log/`.
  - **Robotics File Operations:** Seamless navigation with `cd`, `ls -la`, directory tree creation with `mkdir -p ~/ros2_ws/src`, file duplication with `cp`, and safe removal with `rm -rf`.
  - **File Permissions & Execution:** POSIX permission triplets (`rwxr-xr-x`), hexadecimal masks (`chmod 755`), and granting execution rights to Python/Bash entrypoints using `chmod +x`.
  - **Process Management & Background Daemons:** Monitoring system utilization with `top` and `htop`, inspecting ROS 2 background jobs with `ps aux | grep ros`, terminating frozen simulation processes with `kill -9` and `killall -9 gzserver rviz2`.
  - **Shell Environment Automation (`~/.bashrc`):** Chaining ROS 2 underlay sourcing (`source /opt/ros/jazzy/setup.bash`), creating productivity aliases (`cb="colcon build --symlink-install"`, `sros="source install/setup.bash"`), and setting `ROS_DOMAIN_ID`.
  - **Multi-Pane Terminal Workflows (Terminator):** Splitting screens horizontally (`Ctrl+Shift+O`) and vertically (`Ctrl+Shift+E`), broadcasting keystrokes across multiple terminal panes (`Alt+A`), zooming into active logs (`Ctrl+Shift+X`), and pane navigation (`Alt+Arrows`).
* **Hands-on Student Lab:**
  - *Autonomous Mobile Robot Workspace Initializer & Diagnostics Script (`m01_l01_solution_env_setup.sh`):* Write a robust Bash script that creates the workspace directory structure, verifies execution permissions, validates environment variables, and tests terminal logging colors.

---

### Lesson 02: ROS 2 Overview & Environment Setup
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Python-Only Robotics Engineering Workflow, ROS 1 vs ROS 2 DDS Architecture, Containerized Tooling.
* **Key Topics Covered:**
  - **Why ROS 2? The Industrial Revolution in Robotics:** Limitations of ROS 1 (single-point-of-failure `roscore` master, lack of real-time guarantees, unencrypted TCP/UDP sockets).
  - **The DDS (Data Distribution Service) Foundation:** Decentralized peer-to-peer discovery, Object Management Group (OMG) standards, zero single point of failure, RTPS wire protocol.
  - **Containerized Robotics Engineering Environment:** Utilizing Docker for consistent simulation and code execution across Windows, Mac, and Linux without native host pollution.
  - **Triple-Interface Access:**
    - *LMS Interactive Learning Hub* (Port 8000) for interactive tutorials and quizzes.
    - *Ubuntu Desktop GUI via noVNC* (Port 6080) for RViz2, Gazebo, and GUI visualization.
    - *In-Browser Cloud VS Code Server* (Port 8443) for real-time Python development.
  - **ROS 2 Release Timeline & Support Lifecycle:** Rolling distribution vs Long-Term Support (LTS) releases (Jazzy Jalisco on Ubuntu 24.04 LTS, Iron Irwini, Humble Hawksbill).
  - **Verification Smoke Test:** Launching the classic C++ talker/listener pair via CLI (`ros2 run demo_nodes_cpp talker` & `listener`) to verify host network bridging and DDS participant discovery.
* **Hands-on Student Lab:**
  - *Multi-Robot Domain Isolation & RMW Environment Configuration:* Configure `ROS_DOMAIN_ID=42` and `RMW_IMPLEMENTATION=rmw_fastrtps_cpp` in the shell to ensure clean message isolation and prevent cross-talk during multi-student workshop exercises.

---

### Lesson 03: Turtlesim Simulation & Essential ROS 2 CLI Tools
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Hands-On CLI Introspection, Graph Visualization & Controlling Simulated Mobile Robots.
* **Key Topics Covered:**
  - **The Turtlesim Simulation Playground:** Launching the simulation node (`ros2 run turtlesim turtlesim_node`) and manual teleoperation (`ros2 run turtlesim turtle_teleop_key`).
  - **Computational Graph Visualization (`rqt_graph`):** Dynamic introspection of active node endpoints, publisher-subscriber edges, and topic boundaries.
  - **Core Concept 1 — Node Introspection (`ros2 node`):**
    - Listing active nodes: `ros2 node list`
    - Deep-diving node publishers, subscribers, services, and actions: `ros2 node info /turtlesim`
  - **Core Concept 2 — Topic Introspection (`ros2 topic`):**
    - Listing active buses: `ros2 topic list -t`
    - Inspecting live data frequency and bandwidth: `ros2 topic hz /turtle1/pose` and `ros2 topic bw`
    - Streaming live messages to terminal stdout: `ros2 topic echo /turtle1/pose`
  - **Core Concept 3 — Topic Interface Types (`ros2 interface`):**
    - Inspecting standard message definitions: `ros2 interface show geometry_msgs/msg/Twist`
    - Understanding linear velocity (`x, y, z` in m/s) and angular velocity (`roll, pitch, yaw` in rad/s).
  - **Moving the Robot via Command Line (`ros2 topic pub`):**
    - Publishing one-shot Twist messages: `ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0}}"`
    - Publishing continuous rate-based velocity commands: `ros2 topic pub -r 10 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 1.0}, angular: {z: 1.0}}"`
* **Hands-on Student Lab:**
  - *Turtlesim Operations Mission:* Query node publishers, inspect topic definitions, and publish exact kinematic velocity vectors via CLI to drive the turtle in circular and square geometric trajectories.

---

### Lesson 04: ROS 2 Workspace & Package Architecture Deep Dive
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Workspace Anatomy, Underlays vs Overlays Chaining, and `ament_python` Package Scaffolding.
* **Key Topics Covered:**
  - **Workspace Anatomy:** The 4 critical directories of a ROS 2 workspace:
    - `src/`: Human-authored source packages.
    - `build/`: Intermediate compilation cache and object files.
    - `install/`: Sourced binaries, scripts, libraries, and launch files.
    - `log/`: Structured runtime compilation logs and error traces.
  - **The Environment Chaining Model (Underlay vs. Overlay):**
    - Underlay: `/opt/ros/jazzy/setup.bash` (system-wide dependencies).
    - Overlay: `~/ros2_ws/install/setup.bash` (local workspace packages shadowing underlay packages).
  - **Deterministic Compilation with Colcon:**
    - `colcon build --symlink-install` (symlinks Python files so source edits run immediately without re-compilation).
    - Scoped compilation: `colcon build --packages-select <package_name>`.
  - **What Makes a Directory a ROS 2 Python Package?**
    - `package.xml`: XML manifest declaring package metadata, maintainer, licenses, and dependencies (`<depend>`, `<exec_depend>`).
    - `setup.py`: Setuptools Python build recipe declaring entry points (`console_scripts`), package data files, and install paths.
    - `setup.cfg`: Installation target prefix (`script-dir=$base/lib/<pkg>`, `install-scripts=$base/lib/<pkg>`).
    - `resource/<package_name>`: Index marker file for `ament_index`.
  - **Package Creation via CLI:**
    - Executing `ros2 pkg create --build-type ament_python --license Apache-2.0 --dependencies rclpy geometry_msgs <pkg_name>`.
  - **Dependency Management with `rosdep`:**
    - Updating database: `rosdep update`
    - Resolving and installing missing system packages: `rosdep install -i --from-path src --rosdistro jazzy -y`.
* **Hands-on Student Lab:**
  - *Package Scaffolding Drill (`task_package_scaffold.py`):* Scaffold the foundation package `nexus_amr_basics`, configure its `package.xml` and `setup.py`, create entry point console scripts, build with symlinks, and verify execution via `ros2 run`.

---

### Lesson 05: Communication Mechanism I: Publishers, Subscribers & Quality of Service (QoS)
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Object-Oriented ROS 2 Python Nodes, Distance Sensor Simulation, Event Callbacks & QoS Policies.
* **Key Topics Covered:**
  - **Topic Communication Paradigm:** Asynchronous, many-to-many unidirectional data streams over DDS channels.
  - **Object-Oriented Node Architecture in Python (`rclpy.node.Node`):**
    - `super().__init__('node_name')`
    - Constructor-driven initialization vs procedural scripting.
    - Wall timers (`self.create_timer(timer_period, self.timer_callback)`).
  - **Authoring a Sensor Publisher Node:**
    - Instantiating publishers: `self.create_publisher(SensorMsgType, '/topic_name', qos_profile)`.
    - Populating standard telemetry data (`sensor_msgs/msg/Range`, `sensor_msgs/msg/LaserScan`).
    - Publishing data periodically: `self.publisher_.publish(msg)`.
  - **Authoring a Safety Monitor Subscriber Node:**
    - Instantiating subscriptions: `self.create_subscription(MsgType, '/topic', self.listener_callback, qos_profile)`.
    - Event-driven callback execution: reading message fields, applying collision threshold logic (< 0.35m), and publishing emergency halt commands.
  - **Spinning & Execution Flow:**
    - `rclpy.init()`, `rclpy.spin(node)`, `node.destroy_node()`, `rclpy.shutdown()`.
  - **Quality of Service (QoS) Deep Dive:**
    - **Reliability:** `RELIABLE` (TCP-like guaranteed delivery, used for E-stops and state changes) vs `BEST_EFFORT` (UDP-like, loss-tolerant, used for high-frequency LiDAR and cameras).
    - **Durability:** `VOLATILE` (no historical retention) vs `TRANSIENT_LOCAL` (latches last message for late-joining subscribers, critical for robot models and maps).
    - **History & Depth:** `KEEP_LAST` with depth buffer vs `KEEP_ALL`.
* **Hands-on Student Lab:**
  - *AMR Teleop Velocity Scaler & Safety Guard (`task_teleop_speed_limiter.py`):* Write a safety node that subscribes to raw teleoperation inputs (`/cmd_vel_in`), intercepts velocity vectors, applies dynamic acceleration clamps and max speed limits, and republishes safe commands to `/cmd_vel_out`.

---

### Lesson 06: Communication Mechanism II: Service Servers & Clients in Python
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Synchronous & Asynchronous Request-Reply (RPC), Emergency Stop Services, Decision Matrices.
* **Key Topics Covered:**
  - **The RPC Service Paradigm:** Synchronous/asynchronous bidirectional client-server transaction (1-to-1).
  - **Architectural Decision Matrix:**
    | Communication Pattern | Mechanism | Use Case in Robotics | Example |
    | :--- | :--- | :--- | :--- |
    | Continuous Telemetry | **Topics** | Unidirectional continuous sensor streams | 50 Hz LiDAR `/scan`, 100 Hz Wheel Odometry `/odom` |
    | Instantaneous State Change | **Services** | Quick, deterministic request-reply transactions | Trigger Emergency Stop, Reset Odometry, Calibration |
    | Long-Running Preemptible Task | **Actions** | Goal-directed execution with feedback & cancel | Navigate to Waypoint, Dock to Charger, Lift Pallet |
  - **Authoring an Emergency Stop Service Server in Python:**
    - Defining service callbacks: `def trigger_estop_callback(self, request, response)`.
    - Setting response variables (`response.success = True`, `response.message = "E-STOP ENGAGED"`).
    - Registering server: `self.create_service(Trigger, '/nexus_amr/emergency_stop', self.trigger_estop_callback)`.
  - **Testing Services via CLI:**
    - Listing active services: `ros2 service list`
    - Calling service from command line: `ros2 service call /nexus_amr/emergency_stop std_srvs/srv/Trigger "{}"`.
  - **Building an Asynchronous Python Service Client:**
    - Creating client: `self.client = self.create_client(Trigger, '/nexus_amr/emergency_stop')`.
    - Waiting for server availability: `while not self.client.wait_for_service(timeout_sec=1.0): self.get_logger().info(...)`.
    - Sending asynchronous requests: `self.future = self.client.call_async(request)`.
    - Handling non-blocking responses using `future.add_done_callback()`.
* **Hands-on Student Lab:**
  - *Speed Mode & Industrial Zone Governor Service (`task_speed_mode_server.py`):* Create a service server that receives operational zone strings (`"WAREHOUSE_AISLE"`, `"SHARED_HUMAN_ZONE"`, `"HIGH_SPEED_TRANSIT"`) and dynamically recalculates the robot's allowable linear speed limits.

---

### Lesson 07: Runtime Management & Python Launch Files
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** The ROS 2 Python Launch System, Multi-Node Subsystem Orchestration, Launch Arguments, Namespaces & Remappings.
* **Key Topics Covered:**
  - **Why Programmatic Python Launch Files?** Moving beyond static XML/YAML to programmatic execution logic, environment conditional branches, and modular includes.
  - **The Core Launch Architecture:**
    - Importing `launch` and `launch_ros`.
    - Entrypoint convention: `def generate_launch_description(): return LaunchDescription([...])`.
  - **Orchestrating Nodes with `launch_ros.actions.Node`:**
    - `package='nexus_amr_basics'`
    - `executable='speed_governor_node'`
    - `name='custom_node_name'`
    - `output='screen'` (capturing stdout/stderr to console).
    - `emulate_tty=True` (preserving ANSI terminal color codes).
  - **Dynamic Launch Arguments (`DeclareLaunchArgument` & `LaunchConfiguration`):**
    - Declaring configurable parameters: `DeclareLaunchArgument('max_speed', default_value='0.5', description='...')`.
    - Evaluating configurations at runtime.
  - **Robotic Topic Remapping (`remappings`):**
    - Connecting generic drivers to standardized robot pipelines: `remappings=[('/cmd_vel', '/nexus_amr/cmd_vel_safe')]`.
  - **Multi-Robot Fleet Namespaces (`namespace`):**
    - Scoping node and topic names to prevent collisions: `namespace='robot_1'` producing `/robot_1/cmd_vel` and `/robot_1/odom`.
  - **Nesting & Including Child Launch Files:**
    - `IncludeLaunchDescription(PythonLaunchDescriptionSource(...))`.
* **Hands-on Student Lab:**
  - *AMR Multi-Node Fleet Bringup Launch File (`task_fleet_launch.py`):* Write a master Python launch file that spawns the teleop supervisor, the emergency stop service, and multiple simulated distance sensors with configurable namespaces and remapped topics.

---

### Lesson 08: Communication Mechanism III: Action Servers & Clients in Python
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Long-Running Preemptible Behaviors, Goal-Feedback-Result State Machine, Charging Station Docking.
* **Key Topics Covered:**
  - **The ROS 2 Action Architecture:** Why services fail for long-running robotics tasks (blocking calls, no progress telemetry, inability to cancel).
  - **The 3-Part Action Interface (`.action`):**
    - Goal: Desired target state (e.g. `float64 distance_meters`).
    - Result: Final outcome once finished (e.g. `bool success`, `float64 final_distance`).
    - Feedback: Periodic progress streaming during execution (e.g. `float64 current_distance`, `float64 time_elapsed`).
  - **The Action State Machine:**
    - Goal Request -> Goal Accepted/Rejected -> Executing -> Feedback Stream -> Succeeded/Aborted/Canceled.
  - **Building an Action Server in Python (`rclpy.action.ActionServer`):**
    - Accepting/rejecting goal handles: `def goal_callback(self, goal_request)`.
    - Handling cancellation requests: `def cancel_callback(self, goal_handle)`.
    - Executing long-running loops: publishing periodic feedback via `goal_handle.publish_feedback(feedback_msg)`.
    - Completing execution: `goal_handle.succeed()` and returning result.
  - **Building an Action Client in Python (`rclpy.action.ActionClient`):**
    - Sending goal: `self.action_client.send_goal_async(goal_msg, feedback_callback=self.feedback_callback)`.
    - Handling asynchronous results via futures.
* **Hands-on Student Lab:**
  - *AMR Charging Dock Action Server (`task_navigate_distance_server.py`):* Implement an action server that accepts a target distance in meters, simulates precision motor stepping with rate-controlled feedback, checks for obstacle preemption, and returns success upon dock contact.

---

# 📅 DAY 2: 3D Robot Modeling & Physics Simulation

### Pedagogical Goal:
Master mechanical robot description formats (URDF and Xacro), verify multi-body kinematic trees in RViz2 under standard coordinate conventions (REP-103, REP-105), configure physics and sensor plugins (LiDAR, IMU, Differential Drive) in Gazebo, and construct industrial warehouse simulation worlds.

---

### Lesson 09: 3D Robot Modeling with URDF & Xacro
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Kinematic Robot Topologies, URDF Syntax, Xacro Parametric Macros & Inertial Physics Properties.
* **Key Topics Covered:**
  - **Kinematic Topologies in Robotics:** Understanding links (rigid bodies) and joints (kinematic constraints connecting links).
  - **Joint Classification:**
    - `continuous`: Infinite rotation along axis (wheels, drive rollers).
    - `revolute`: Rotation with angular lower and upper limits (steering, robot arms).
    - `prismatic`: Linear translation along axis (scissor lifts, forks).
    - `fixed`: Rigid attachment without motion (sensors, brackets, chassis frame).
  - **The Anatomy of a URDF Link:**
    - `<visual>`: Geometry (box, cylinder, sphere, or custom `.stl`/`.dae` mesh), materials, and colors for GUI visualization.
    - `<collision>`: Simplified geometric primitives used by the ODE physics engine to calculate contact boundaries.
    - `<inertial>`: Mass (kg), center of mass origin (`xyz`), and 3x3 rotational inertia matrix (`ixx, ixy, ixz, iyy, iyz, izz`).
  - **Why Xacro (XML Macros)?** Overcoming raw URDF verbosity:
    - Reusable components: declaring wheel macros with parametric radius, width, and mass.
    - Mathematical expressions: `${pi / 2}`, `${wheel_radius * 2}`.
    - Properties & Constants: `<xacro:property name="chassis_mass" value="15.0" />`.
    - Modular file organization (`nexus_amr.urdf.xacro`, `lidar.xacro`, `camera.xacro`, `materials.xacro`).
  - **Standard Mobile Robot Topologies:** Defining `base_footprint` (ground projection), `base_link` (chassis center), `left_wheel`, `right_wheel`, and `caster_wheel`.
* **Hands-on Student Lab:**
  - *Adding Sensor Payloads to the Nexus AMR (`task_camera_sensor.xacro`):* Author a modular Xacro macro that attaches a 2D LiDAR mount and a forward-facing RGB-D depth camera to the Nexus AMR chassis, calculating exact joint transformation offsets and inertia tensors.

---

### Lesson 10: RViz2 Visualization & Kinematic TF Inspection
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** RViz2 Visualizer Configuration, Fixed Frames, Joint State Publishing & TF2 Coordinate Frames.
* **Key Topics Covered:**
  - **The RViz2 Philosophy:** A pure sensor and state visualizer (NOT a physics simulator; does not compute gravity, collisions, or dynamics).
  - **Coordinate Frame Standards (REP-103):**
    - Red Axis = **X** (Forward)
    - Green Axis = **Y** (Left)
    - Blue Axis = **Z** (Up)
    - Right-hand coordinate rule: Thumb = X, Index = Y, Middle = Z.
  - **Mobile Robot Coordinate Tree Standards (REP-105):**
    - `map` -> `odom` -> `base_footprint` -> `base_link` -> `laser_frame` / `camera_link`.
  - **Essential Display Plugins in RViz2:**
    - `RobotModel`: Renders URDF/Xacro 3D meshes.
    - `TF`: Visualizes all active coordinate frames and their relational trees.
    - `LaserScan`: Renders 2D distance points color-coded by intensity or distance.
    - `Odometry`: Visualizes velocity vectors and historical position trails.
  - **Fixed Frame Resolution:** Why RViz2 turns red when the Fixed Frame is mismatched (resolving transforms relative to `base_link` or `odom`).
  - **Kinematic Inspection Tools:**
    - `joint_state_publisher_gui`: Interactive GUI sliders to articulate robot wheels and joints.
    - `robot_state_publisher`: Reading joint angles and computing 3D Cartesian transforms across the TF tree.
    - Generating PDF transform tree graphs: `ros2 run tf2_tools view_frames`.
* **Hands-on Student Lab:**
  - *RViz2 Display Configuration & Dynamic TF Broadcaster (`task_custom_odometry_tf.py`):* Launch RViz2, configure a professional AMR dashboard layout, articulate the Nexus AMR joints, and write a Python node broadcasting dynamic wheel rotation transforms.

---

### Lesson 11: Gazebo Physics Simulation & Sensor Plugins
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Real-Time Physics Engines (ODE), Contact Dynamics, Differential Drive Plugins & Simulated Sensor Bridges.
* **Key Topics Covered:**
  - **Physics Simulation vs State Visualization:** Understanding the Open Dynamics Engine (ODE), mass, gravity ($9.81 \, m/s^2$), surface friction ($k_e, k_p, \mu$), and restitution.
  - **Gazebo Architecture & Communication:**
    - Gazebo Server (`gzserver`): Runs headless physics calculation loop at 1000 Hz.
    - Gazebo Client (`gzclient`): OpenGL/Vulkan 3D graphic rendering window.
  - **The ROS-Gazebo Bridge:** Translating between Gazebo internal transport messages and standard ROS 2 DDS topics.
  - **Integrating the Differential Drive Plugin (`libgazebo_ros_diff_drive.so`):**
    - Configuring `<left_joint>` and `<right_joint>`.
    - Setting wheel separation, diameter, and max torque.
    - Subscribing to `/cmd_vel` and converting linear/angular velocity into wheel angular velocity ($\omega_L, \omega_R$).
    - Computing wheel odometry and broadcasting the `odom -> base_footprint` TF transform.
  - **Integrating Simulated Sensor Plugins:**
    - **2D LiDAR Sensor Plugin (`libgazebo_ros_ray_sensor.so`):** Raycasting 360-degree laser beams, adding Gaussian noise, and publishing `sensor_msgs/msg/LaserScan` to `/scan`.
    - **IMU Plugin (`libgazebo_ros_imu_sensor.so`):** Simulating 6-axis linear acceleration and angular velocity publishing to `/imu/data`.
* **Hands-on Student Lab:**
  - *Spawning & Driving Nexus AMR in Gazebo (`task_diff_drive_telemetry.py`):* Spawn the Nexus AMR URDF model into Gazebo, apply physics friction properties to the drive wheels, verify the `/scan` and `/odom` topic outputs, and drive the robot around obstacles using keyboard teleop.

---

### Lesson 12: Building Custom Simulation Worlds in Gazebo
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Simulation Description Format (SDF), Industrial Facility Design, Lighting & Obstacle Placement.
* **Key Topics Covered:**
  - **The SDF (Simulation Description Format) Standard:** How Gazebo defines environments, ground planes, gravity, atmospheric pressure, and static objects.
  - **Constructing an Industrial Logistics Facility:**
    - Ground plane definition with realistic warehouse concrete friction coefficients.
    - Boundary containment walls to prevent robot runaways.
    - Storage racks, industrial shelving, and pallet bays.
    - Cylindrical pillars and static test obstacles.
  - **Lighting & Material Textures:** Adding ambient, diffuse, and directional sunlight rays for camera sensor realism.
  - **World File Organization:** Saving and structuring `.world` files in the package `nexus_amr_gazebo/worlds/`.
  - **Automated Spawning Pipelines:**
    - Writing launch files that start Gazebo, load the custom warehouse world, and execute the `spawn_entity.py` service node with initial coordinates `(x: 0.0, y: 0.0, yaw: 0.0)`.
* **Hands-on Student Lab:**
  - *Industrial Warehouse Facility Construction:* Build a customized warehouse floor plan (`warehouse_obstacle_world.world`) containing loading docks, pallet rows, and narrow aisles to prepare for Day 3 SLAM mapping and navigation.

---

# 📅 DAY 3: Autonomous SLAM & Nav2 Navigation

### Pedagogical Goal:
Implement 2D Simultaneous Localization and Mapping (SLAM) with SLAM Toolbox, configure layered 2D costmaps, tune trajectory generation algorithms, and write mission-level Python patrol scripts using the Nav2 Simple Commander SDK.

---

### Lesson 13: 2D LiDAR SLAM Mapping with SLAM Toolbox
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Simultaneous Localization & Mapping, Scan Matching, Pose Graphs, Loop Closures & Map Serialization.
* **Key Topics Covered:**
  - **The Core SLAM Dilemma:** "To build a map, the robot needs its location; to determine its location, the robot needs a map."
  - **Why SLAM Toolbox over Gmapping/Cartographer?**
    - Native ROS 2 lifecycle integration.
    - Online asynchronous processing (never drops laser scans even during heavy compute).
    - Lifelong mapping capabilities (merging multiple sessions, localized map manipulation).
  - **Laser Scan Matching & Odometry Fusion:** Using scan registration algorithms to align consecutive LiDAR point sets and correct wheel slip drift.
  - **Pose Graph Optimization & Loop Closure Detection:**
    - Nodes = historical robot poses.
    - Edges = spatial transform constraints.
    - Loop closure: recognizing a previously visited landmark, snapping the graph into consistency, and eliminating accumulated odometric drift.
  - **The Occupancy Grid Data Model (`nav_msgs/msg/OccupancyGrid`):**
    - Value `-1`: Unknown space.
    - Value `0`: Free space (traversable).
    - Value `100`: Lethal obstacle (occupied).
    - Resolution: Grid cell size (e.g. $0.05 \, m = 5 \, cm$ per pixel).
  - **Saving Maps to Disk via CLI:**
    - Executing `ros2 run nav2_map_server map_saver_cli -f ~/ros2_ws/src/nexus_amr_navigation/maps/warehouse_map`.
    - Inspecting generated files: `warehouse_map.yaml` (metadata) and `warehouse_map.pgm` (greyscale image).
* **Hands-on Student Lab:**
  - *Full Warehouse Mapping Run:* Drive the Nexus AMR throughout the custom Gazebo warehouse, inspect live scan matching in RViz2, detect loop closures, and serialize a crisp occupancy grid map.

---

### Lesson 14: Nav2 Stack Architecture & Costmap 2D Configuration
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** The Nav2 Navigation Architecture, Layered 2D Costmaps, Robot Footprint & Cost Inflation Math.
* **Key Topics Covered:**
  - **The Nav2 Software Stack Overview:** The industry-standard modular navigation framework: Planners, Controllers, Recoveries, Smoothers, and Behavior Tree Navigators.
  - **The 2D Costmap Philosophy:** Transforming raw geometric maps and sensor points into 2D continuous obstacle risk representations ($0 - 255$).
  - **The Multi-Layered Costmap Pipeline:**
    - **Static Layer:** Reads the immutable pre-built occupancy map (`warehouse_map.yaml`).
    - **Obstacle / Voxel Layer:** Ingests live streaming 2D LiDAR points (`/scan`) to mark and clear dynamic obstacles (moving pallets, humans) using raytracing.
    - **Inflation Layer:** The safety buffer surrounding obstacles to guarantee physical robot clearance.
  - **Costmap Inflation Mathematics:**
    $$cost = 253 \cdot \exp\left( - \text{cost\_scaling\_factor} \cdot (\text{distance} - \text{inscribed\_radius}) \right)$$
    - **Lethal Obstacle (254):** Center of an obstacle.
    - **Inscribed Radius (253):** Robot footprint intersects obstacle (collision guaranteed).
    - **Decay Area (1 – 252):** Exponential risk zone where the planner tries to avoid driving.
    - **Free Space (0):** Safe for travel.
  - **Robot Footprint Specification:**
    - Circular approximation: `robot_radius: 0.22`.
    - Exact polygon footprint: `footprint: "[[0.25, 0.20], [0.25, -0.20], [-0.25, -0.20], [-0.25, 0.20]]"`.
  - **Global Costmap vs. Local Costmap:**
    - *Global Costmap:* Encompasses entire warehouse facility, low update rate (1 Hz), used for complete path planning.
    - *Local Costmap:* Rolling window centered on the robot ($3m \times 3m$), high update rate (10 Hz), used for dynamic collision avoidance.
* **Hands-on Student Lab:**
  - *Costmap Tuning & Safety Clearance Auditor (`task_costmap_validator.py`):* Configure `nav2_params.yaml`, tune the inflation radius and cost scaling factors, and write a verification node checking safe clearance from obstacles.

---

### Lesson 15: Nav2 Path Planners & Local Controller Tuning
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Global Path Planners (Smac/NavFn), Local Trajectory Rollouts (DWB), Critic Scoring Functions & Pure Pursuit.
* **Key Topics Covered:**
  - **The Two-Tier Navigation Paradigm:**
    - *Global Planner (Macro):* Computes topological shortest/safest path from start to goal ignoring real-time dynamics.
    - *Local Controller (Micro):* Computes millisecond-level velocity vectors (`/cmd_vel`) adhering to kinematic constraints and avoiding dynamic obstacles.
  - **Global Path Planners in Nav2:**
    - **NavFn Planner:** Classic Dijkstra and A* grid search algorithms.
    - **Smac Planner 2D:** Highly optimized A* implementation with heading awareness.
  - **The DWB (Dynamic Window Approach) Local Controller:**
    - Sampling search space: evaluating linear velocities ($v$) and angular velocities ($\omega$).
    - Forward trajectory rollout over time horizon ($sim\_time = 1.7 \, s$).
  - **Critic Scoring Functions Matrix:**
    $$Total\_Score = \sum (weight_i \cdot critic_i)$$
    - `BaseObstacle`: Penalizes trajectories passing near obstacles.
    - `PathAlign`: Rewards trajectories aligned with global path coordinates.
    - `GoalAlign`: Rewards trajectories pointing toward local goal vectors.
    - `PathDist` / `GoalDist`: Distance metrics.
    - `RotateToGoal`: Smoothly pivots robot to match final waypoint yaw orientation.
  - **Alternative: Regulated Pure Pursuit (RPP):**
    - Geometric path-following algorithm designed for industrial AMRs.
    - Enforces curvature regulation, adaptive lookahead distances, and deceleration near obstacles.
* **Hands-on Student Lab:**
  - *Trajectory Tracking & Critic Tuning Drill (`task_controller_tuner.py`):* Benchmark the DWB local planner against Regulated Pure Pursuit, tune critic weights to eliminate path oscillation in narrow aisles, and verify smooth docking decelerations.

---

### Lesson 16: Autonomous Navigation Scripting with Nav2 Simple Commander
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Capstone Autonomous Mission, Nav2 Simple Commander Python SDK, Multi-Checkpoint Warehouse Patrol.
* **Key Topics Covered:**
  - **The Nav2 Simple Commander Python SDK:** Moving beyond low-level Action Client boilerplate to a clean, production-grade Python API (`nav2_simple_commander.robot_navigator.BasicNavigator`).
  - **Lifecycle Management in Code:**
    - `navigator.waitUntilNav2Active()` (automatically synchronizes with lifecycle manager until all planners, controllers, and costmaps are in the `ACTIVE` state).
  - **Core Navigation Methods:**
    - `navigator.setInitialPose(initial_pose)`: Initializing AMCL Monte Carlo localization filter.
    - `navigator.goToPose(target_pose)`: Non-blocking single-goal navigation.
    - `navigator.followWaypoints(pose_list)`: Executing sequential multi-stop patrol routes.
  - **Mission Monitoring & Exception Handling:**
    - Querying progress: `navigator.isTaskComplete()`.
    - Polling real-time telemetry: `feedback = navigator.getFeedback()` (`distance_remaining`, `navigation_time`, `number_of_recoveries`).
    - Inspecting outcomes: `result = navigator.getResult()` (`TaskResult.SUCCEEDED`, `TaskResult.CANCELED`, `TaskResult.FAILED`).
  - **Multi-Checkpoint Logistics Logic:** Adding dwell timers at loading docks, simulating pallet loading/unloading, and returning to charging base.
* **Hands-on Student Lab:**
  - *Autonomous Multi-Checkpoint Warehouse Patrol Mission (`task_multi_waypoint_patrol.py`):* Write a complete autonomous warehouse mission script in Python that initializes the Nexus AMR at loading dock 1, patrols 4 inspection checkpoints while logging distances, avoids dynamic obstacles, and returns to home base upon completion.

---

# 🌟 BONUS TRACK: Advanced Masterclasses & Production Electives

### Pedagogical Goal:
Explore production robotics engineering topics: dynamic parameter servers, industrial logging, custom IDL interface generation, MCAP datasets with ROS Bags, comprehensive CLI tooling, and Behavior Tree lifecycle state machines.

---

### Lesson 17: Dynamic Parameters & YAML Configuration
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Parameter Architecture, Parameter Descriptors, Runtime Validation Callbacks & Dynamic Reconfiguration.
* **Key Topics Covered:**
  - ROS 1 Parameter Server vs. Decentralized ROS 2 Node Parameters.
  - Declaring parameters with types, default values, and safety boundaries (`ParameterDescriptor`).
  - Read-time type safety and parameter validation callbacks (`add_on_set_parameters_callback`).
  - Organizing external configuration files (`teleop_params.yaml`).
  - Loading parameter files via Python launch files.
  - Real-time parameter introspection via CLI (`ros2 param list`, `ros2 param get`, `ros2 param set`).
  - Graphical dynamic tuning using `rqt_reconfigure`.
* **Hands-on Student Lab:**
  - *Dynamic Safety Parameter Validator (`task_dynamic_safety_params.py`):* Implement a node that rejects out-of-bounds velocity and acceleration parameters at runtime, preventing operator errors.

---

### Lesson 18: VS Code IDE Tooling & ROS 2 Logging Framework
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Modern Developer Workflows, `tasks.json` Integration & Industrial Logging Severity Levels.
* **Key Topics Covered:**
  - Configuring VS Code for ROS 2 Python: IntelliSense, path autocomplete, Python interpreters, and environment variable bindings.
  - Automating build workflows with `.vscode/tasks.json` (`colcon build`, `source`, `clean`).
  - The 5 Logging Severity Levels:
    - `DEBUG`: Granular internal math (disabled in production).
    - `INFO`: Normal operational progress milestones.
    - `WARN`: Recoverable anomalies (e.g. low battery, non-critical sensor packet drop).
    - `ERROR`: Subsystem failures (e.g. motor stall, localized trajectory plan failure).
    - `FATAL`: Unrecoverable safety stops (e.g. LiDAR offline, emergency stop button pressed).
  - Throttled logging (`self.get_logger().info_throttle(5.0, ...)`), skip-first, and one-shot logging.
  - Configuring log severity filters at runtime via CLI and launch files.
* **Hands-on Student Lab:**
  - *AMR Battery State Logging & Diagnostic Threshold Supervisor (`task_battery_monitor_logger.py`):* Build a battery health logging node that throttles normal telemetry and triggers escalations from `WARN` to `FATAL` as voltage drops below critical thresholds.

---

### Lesson 19: ROS 2 Interfaces & Custom Messages, Services & Actions
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Interface Definition Language (IDL), `.msg`, `.srv`, `.action` Syntax & CMake Interface Packages.
* **Key Topics Covered:**
  - Why standardization matters: using standard interfaces (`geometry_msgs`, `sensor_msgs`, `nav_msgs`, `std_srvs`).
  - **The Custom Interface Golden Rule:** Never define custom interfaces in the same package as Python node code; always dedicate a pure CMake interface package (`nexus_amr_interfaces`).
  - Defining custom messages (`UltrasonicRange.msg`, `RobotStatus.msg`).
  - Defining custom services (`SetSpeedMode.srv`, `TriggerEmergencyStop.srv`).
  - Defining custom actions (`NavigateDistance.action`, `Patrol.action`).
  - Configuring `CMakeLists.txt` (`rosidl_default_generators`, `rosidl_generate_interfaces`) and `package.xml`.
  - Compiling and verifying custom interfaces via CLI: `ros2 interface show nexus_amr_interfaces/msg/RobotStatus`.
  - Importing and using custom interfaces in Python nodes.
* **Hands-on Student Lab:**
  - *Custom Robot Telemetry Publisher (`task_status_publisher.py`):* Define, compile, and publish a custom `RobotStatus` message containing battery voltage, CPU temperature, E-stop state, and active navigation mission name.

---

### Lesson 20: Data Recording & Playback with ROS 2 Bags
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Deterministic Robotic Datasets, MCAP vs SQLite3 Storage Plugins, Playback & Python `rosbag2_py` Reader.
* **Key Topics Covered:**
  - Why ROS Bags are indispensable: recording real-world hardware telemetry once, reproducing algorithms in the lab indefinitely.
  - Storage Backend Comparison: Legacy `sqlite3` vs modern high-performance `MCAP` format.
  - Recording data via CLI:
    - Recording all topics: `ros2 bag record -a -s mcap`.
    - Recording filtered subsets: `ros2 bag record /scan /odom /cmd_vel -o mission_patrol_bag`.
  - Inspecting bag metadata: `ros2 bag info mission_patrol_bag`.
  - Simulating the physical robot offline via playback: `ros2 bag play mission_patrol_bag --rate 1.0`.
  - Looping playback, pausing, and stepping through sensor frames.
  - Offline programmatic Python analysis: Reading bags using the `rosbag2_py` API and computing odometry drift.
* **Hands-on Student Lab:**
  - *Autonomous Mission Telemetry Recording & Playback Audit:* Record a full warehouse navigation run, inspect its message counts and serialization rates, and replay the dataset to simulate the physical robot offline.

---

### Lesson 21: Complete ROS 2 Command-Line Interface (CLI) Mastery
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Full CLI Tooling Reference, System Health Audits & Production Troubleshooting Playbook.
* **Key Topics Covered:**
  - The Unified ROS 2 CLI Hierarchy: `ros2 <verb> <subverb>`.
  - Master CLI matrix:
    - `ros2 node` (`list`, `info`)
    - `ros2 topic` (`list`, `echo`, `hz`, `bw`, `pub`, `type`, `find`)
    - `ros2 service` (`list`, `type`, `find`, `call`)
    - `ros2 param` (`list`, `get`, `set`, `dump`, `load`)
    - `ros2 action` (`list`, `info`, `send_goal`)
    - `ros2 interface` (`show`, `list`, `package`, `packages`)
    - `ros2 bag` (`record`, `info`, `play`)
    - `ros2 pkg` (`create`, `list`, `prefix`, `xml`)
    - `ros2 daemon` (`status`, `start`, `stop`)
    - `ros2 doctor` (System health audit, network interface checks, DDS connectivity).
  - Common production error diagnostics: RMW mismatch, network firewall blockages, non-sourcing overlays, missing console scripts.
* **Hands-on Student Lab:**
  - *Comprehensive ROS 2 CLI Introspection & Health Audit:* Conduct an exhaustive health check on a running multi-node robotics stack, identify dead nodes, trace dropped topics, and resolve parameter mismatches entirely via terminal CLI commands.

---

### Lesson 22: Behavior Trees, Recovery Behaviors & Lifecycle Management
* **Duration:** 45 – 60 min
* **Pedagogical Focus:** Behavior Trees (BT) vs Finite State Machines (FSM), Nav2 Recovery Plugins, Managed Node Lifecycle State Machine.
* **Key Topics Covered:**
  - **Why Behavior Trees Over Finite State Machines?** Modularity, reactive execution, composability, and hierarchical task decomposition without state combinatorial explosion.
  - **Behavior Tree Node Types:**
    - *Action Nodes:* Perform work (e.g. ComputePathToPose, FollowPath).
    - *Condition Nodes:* Query states (e.g. IsStuck, IsBatteryLow).
    - *Control Nodes:* Control execution flow (`Sequence` = AND, `Fallback` = OR / Selector, `RoundRobin`).
    - *Decorator Nodes:* Modify child behavior (`Inverter`, `Retry`, `RateController`).
  - **The Nav2 Recovery Pipeline:**
    - Detecting failure: local controller unable to track trajectory.
    - Recovery sub-tree execution: `ClearEntireCostmap` -> `Spin (360°)` -> `BackUp (0.3m)` -> `Wait (5s)`.
  - **The ROS 2 Managed Node Lifecycle State Machine:**
    - Primary States: `Unconfigured`, `Inactive`, `Active`, `Finalized`.
    - Transitions: `configure()`, `activate()`, `deactivate()`, `cleanup()`, `shutdown()`.
    - Safety guarantee: Sensor drivers and motor controllers never execute in an unverified or half-configured state.
  - **Inspecting & Triggering Lifecycle States with the CLI:**
    - `ros2 lifecycle list`
    - `ros2 lifecycle get /controller_server`
    - `ros2 lifecycle set /controller_server activate`.
* **Hands-on Student Lab:**
  - *Nav2 Recovery Behavior Supervisor & Lifecycle State Machine (`task_recovery_monitor.py`):* Write a supervisor node that tracks Nav2 lifecycle state transitions, intercepts navigation failure events, and triggers custom obstacle clearance recoveries.

---

## 🛠️ Software Stack & Repository Architecture

All code developed throughout the 3-day workshop is structured into standard production ROS 2 packages inside `~/ros2_ws/src/`:

```
ros2_ws/src/
├── nexus_amr_basics/          # [Day 1] Pub/Sub, Services, Actions, Launch files & Safety monitors
│   ├── launch/                # Multi-node bringup launch files
│   ├── nexus_amr_basics/      # Python source nodes
│   ├── package.xml            # Package manifest declaring rclpy dependencies
│   └── setup.py               # Entrypoints (speed_governor, estop_server, action_dock)
│
├── nexus_amr_description/     # [Day 2] Kinematic robot modeling & visualization
│   ├── urdf/                  # Xacro macros, chassis, wheels, caster, sensors
│   ├── meshes/                # 3D STL visual meshes (base_link, wheels, lidar)
│   ├── rviz/                  # Saved RViz2 display configurations (.rviz)
│   └── launch/                # display.launch.py & rsp.launch.py (Robot State Publisher)
│
├── nexus_amr_gazebo/          # [Day 2] Physics simulation & world design
│   ├── worlds/                # warehouse_obstacle_world.world & house.world
│   ├── models/                # Custom warehouse shelving & obstacle SDF models
│   └── launch/                # sim_world.launch.py (spawns Gazebo + robot entity)
│
├── nexus_amr_navigation/      # [Day 3] SLAM mapping & Nav2 autonomous navigation
│   ├── config/                # nav2_params.yaml & slam_toolbox.yaml
│   ├── maps/                  # warehouse_map.yaml & warehouse_map.pgm
│   ├── launch/                # slam.launch.py & navigation.launch.py
│   └── nexus_amr_navigation/  # Python Simple Commander autonomous patrol scripts
│
└── nexus_amr_interfaces/      # [Bonus] Custom IDL message, service & action definitions
    ├── msg/                   # UltrasonicRange.msg, RobotStatus.msg
    ├── srv/                   # TriggerEmergencyStop.srv, SetSpeedMode.srv
    ├── action/                # NavigateDistance.action, Patrol.action
    ├── CMakeLists.txt         # rosidl_generate_interfaces configuration
    └── package.xml            # Build & execution dependencies
```

---

## 🎯 Final Capstone Outcome & Student Deliverables

By the conclusion of Day 3, every student will have:
1. Built a fully functional ROS 2 Python robotics workspace from scratch.
2. Implemented event-driven safety supervisors and emergency RPC services.
3. Authored an accurate 3D kinematics model (URDF/Xacro) adhering to REP-103 and REP-105 standards.
4. Simulated physics, dynamics, and LiDAR/IMU sensor plugins inside Gazebo.
5. Constructed an industrial warehouse occupancy grid map using SLAM Toolbox.
6. Configured global planners, local trajectory critics, and 2D costmaps in Nav2.
7. Written an autonomous warehouse patrol mission using Python that commands the Nexus AMR to autonomously inspect multiple checkpoints, avoid dynamic obstacles, and safely return to its charging station.
