# NavPro Learning Hub - Level 1: Zero-to-Autonomous AMR Engineer

Welcome to **Level 1** of the NavPro Robotics Workshop! This hands-on curriculum is designed for software engineers, students, and roboticists who want to master **ROS 2 Jazzy** (Python-focused) from absolute fundamentals through Linux engineering, kinematics, 3D modeling, Gazebo physics simulation, SLAM, Nav2 autonomous navigation, and physical AMR hardware deployment.

---

## 🚀 Quickstart for Students (Clone, Install Docker & Run)

Follow these step-by-step instructions to get the complete ROS 2 robotics environment running on your laptop in minutes with zero dual-booting required.

### 1. Prerequisites: Install Docker & Docker Compose

#### 🐧 On Linux (Ubuntu 22.04 / 24.04 / Debian)
Open a terminal and run the official Docker setup:
```bash
# 1. Install Docker Engine using official convenience script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. Add your current user to the docker group (avoids needing 'sudo')
sudo usermod -aG docker $USER
newgrp docker

# 3. Verify Docker and Docker Compose installation
docker --version
docker compose version
```

#### 🪟 On Windows (Windows 10 / 11)
1. **Enable Hardware Virtualization**:
   - Ensure Virtualization is enabled in your BIOS/UEFI (check Task Manager -> Performance -> CPU -> "Virtualization: Enabled").
2. **Install WSL 2**:
   - Open PowerShell as Administrator and run:
     ```powershell
     wsl --install
     ```
   - Restart your computer if prompted.
3. **Install Docker Desktop**:
   - Download and install **[Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)**.
   - During installation, ensure the **"Use WSL 2 instead of Hyper-V"** option is checked.
   - Start Docker Desktop and ensure the whale icon is running in the system tray.
   - Open PowerShell or Windows Terminal to verify:
     ```powershell
     docker --version
     docker compose version
     ```

---

### 2. Clone the Repository

Clone the repository and enter the project directory:

```bash
git clone https://github.com/botforge-robotics/ros2-navpro-tutorials-basic-amr.git
cd ros2-navpro-tutorials-basic-amr
```

---

### 3. Build & Run with Docker Compose

Launch the complete containerized robotics stack:

```bash
# Build the container image and start in the background
docker compose up --build -d
```
*(On subsequent runs, simply run `docker compose up -d`)*

---

### 4. Access In-Browser Student Environments

Once the container is running, open your web browser to access:

| Service | Access URL | Credentials / Notes |
| :--- | :--- | :--- |
| **🎓 Interactive Learning Hub (LMS)** | [http://localhost:8000](http://localhost:8000) | Step-by-step tutorials, interactive quizzes, progress tracking & instructor LAN sync |
| **🖥️ Ubuntu Desktop & Simulation (noVNC)** | [http://localhost:6080/vnc.html](http://localhost:6080/vnc.html) | Password: `password` — Run Gazebo simulation, RViz2, Terminator, and ROS 2 GUI tools |
| **💻 In-Browser VS Code IDE** | [http://localhost:8443](http://localhost:8443) | Direct access to workspace `/home/student/ros2_ws` with Python and ROS 2 extensions |

---

### 5. Helpful Commands for Students

```bash
# View live container logs
docker compose logs -f

# Open a bash shell inside the running container
docker compose exec navpro_level1 bash

# Stop the container when finished
docker compose down

# Reset student task files to clean starter boilerplate anytime
./scripts/reset_workspace.sh
```

---

## 📚 Complete Step-by-Step Curriculum (26 Lessons)

Each lesson below features a comprehensive breakdown: theory, architectural diagrams, step-by-step terminal commands, line-by-line code explanation tables, configuration guides (`package.xml`, `setup.py`), CLI debugging workflows, and hands-on exercises:

| Lesson | Topic & Pedagogical Scope | Markdown Guide |
| :---: | :--- | :---: |
| **01** | **Linux Fundamentals for Robotics Engineers** (CLI navigation, workspace hierarchy, executable permissions `chmod +x`, process cleanup `killall`, `~/.bashrc` aliases, Terminator) | [Lesson 01 Guide](tutorials/01_linux_fundamentals_for_robotics.md) |
| **02** | **ROS 2 Overview & Environment Setup** (History, DDS vs ROS 1, Terminator, VS Code, Docker) | [Lesson 02 Guide](tutorials/02_ros2_overview_and_environment_setup.md) |
| **03** | **Workspace Architecture & First Python Node** (`colcon build --symlink-install`, Underlay/Overlay, OOP Node) | [Lesson 03 Guide](tutorials/03_workspace_and_first_python_node.md) |
| **04** | **Package Architecture & Configuration** (`package.xml`, `setup.py`, `setup.cfg`, `resource/` markers) | [Lesson 04 Guide](tutorials/04_package_architecture_and_configuration.md) |
| **05** | **Communication I: Publishers, Subscribers & QoS** (Topics, Timers, Callbacks, QoS Compatibility, Project 1) | [Lesson 05 Guide](tutorials/05_publishers_subscribers_and_qos.md) |
| **06** | **VS Code Tooling & ROS 2 Logging** (`.vscode/tasks.json`, `.vscode/settings.json`, Log Levels `DEBUG` to `FATAL`) | [Lesson 06 Guide](tutorials/06_vscode_debugging_and_ros2_logging.md) |
| **07** | **Interface Types & Custom Messages** (`std_msgs`, `geometry_msgs`, custom `.msg`, `.srv`, `.action` compilation) | [Lesson 07 Guide](tutorials/07_interfaces_and_custom_messages.md) |
| **08** | **Communication II: Service Servers & Clients** (Request/Response, Asynchronous `call_async`, Deadlock prevention) | [Lesson 08 Guide](tutorials/08_services_server_client_python.md) |
| **09** | **Dynamic Parameters & YAML Configuration** (`declare_parameter`, validation callbacks, YAML parameter files) | [Lesson 09 Guide](tutorials/09_dynamic_parameters_and_yaml.md) |
| **10** | **Runtime Management & Launch Files** (Python launch API, Arguments, Substitutions, Remappings, Project 2) | [Lesson 10 Guide](tutorials/10_launch_files_and_runtime_management.md) |
| **11** | **Communication III: Action Servers & Clients** (Goal-Feedback-Result pattern, preemption, progress streaming) | [Lesson 11 Guide](tutorials/11_ros2_actions_server_and_client.md) |
| **12** | **Data Recording & Playback with ROS Bags** (MCAP vs SQLite3 storage, topic filtering, Python `rosbag2_py` API) | [Lesson 12 Guide](tutorials/12_ros2_bag_recording_and_playback.md) |
| **13** | **Complete ROS 2 CLI Command Mastery** (`ros2 node`, `topic`, `service`, `param`, `action`, `doctor`, `daemon`) | [Lesson 13 Guide](tutorials/13_ros2_cli_command_mastery.md) |
| **14** | **TF2 Coordinate Transformations in Python** (REP-105 standard, Euler/Quaternion math, Static/Dynamic Broadcasters) | [Lesson 14 Guide](tutorials/14_tf2_coordinate_transformations_python.md) |
| **15** | **Distributed ROS 2 & DDS Networking** (`ROS_DOMAIN_ID` port math, FastDDS vs CycloneDDS, Discovery Server) | [Lesson 15 Guide](tutorials/15_distributed_ros2_and_dds_networking.md) |
| **16** | **Project 3: Computer Vision & OpenCV Integration** (`cv_bridge`, camera feed, Canny edge detection service) | [Lesson 16 Guide](tutorials/16_project_opencv_ros2_vision.md) |
| **17** | **3D Robot Modeling with URDF & Xacro** (Kinematic joints, visual/collision geometry, inertia calculation macros) | [Lesson 17 Guide](tutorials/17_3d_modeling_urdf_xacro.md) |
| **18** | **RViz2 Visualization & Kinematic TF Inspection** (RGB=XYZ axes rule, Fixed Frame resolution, joint sliders) | [Lesson 18 Guide](tutorials/18_rviz2_visualization_tf_inspection.md) |
| **19** | **Gazebo Physics Simulation & Sensor Plugins** (ODE engine, Differential Drive plugin, 2D LiDAR ray sensor, IMU) | [Lesson 19 Guide](tutorials/19_gazebo_physics_and_sensor_plugins.md) |
| **20** | **Building Simulation Worlds in Gazebo** (SDF world modeling, boundary walls, storage racks, static obstacles) | [Lesson 20 Guide](tutorials/20_building_simulation_worlds.md) |
| **21** | **2D LiDAR SLAM Mapping with SLAM Toolbox** (Online asynchronous SLAM, pose graphs, loop closures, map saving) | [Lesson 21 Guide](tutorials/21_2d_slam_mapping_slam_toolbox.md) |
| **22** | **Nav2 Stack Architecture & Costmap 2D** (Static, Obstacle, Inflation layers, footprint, cost scaling math) | [Lesson 22 Guide](tutorials/22_nav2_architecture_and_costmaps.md) |
| **23** | **Nav2 Path Planners & Local Controller Tuning** (NavFn/Smac Global Planner vs DWB/RPP Local Controller, critics tuning) | [Lesson 23 Guide](tutorials/23_nav2_planners_controllers_tuning.md) |
| **24** | **Behavior Trees, Recovery Behaviors & Lifecycle** (BT Navigator, BackUp/Spin/Wait recoveries, Lifecycle Manager) | [Lesson 24 Guide](tutorials/24_nav2_behavior_trees_and_recoveries.md) |
| **25** | **Autonomous Patrol with Nav2 Simple Commander** (`BasicNavigator` Python SDK, `goToPose`, multi-waypoint loop) | [Lesson 25 Guide](tutorials/25_autonomous_patrol_nav2_simple_commander.md) |
| **26** | **Physical Robot Hardware Deployment (Sim-to-Real)** (SSH bringup, Micro-ROS/serial motors, RPLidar, AMCL relocalization) | [Lesson 26 Guide](tutorials/26_physical_robot_hardware_deployment.md) |

---

## 💻 Student Assignments vs. Reference Solutions

Every assignment has two corresponding files in the workspace:

1. **`task_*.py`**: The student starter template containing `# TODO: FILL IN CODE HERE` blocks for hands-on practice.
2. **`solution_*.py`**: The complete, verified reference solution for guidance.

| Project / Exercise | Student Task Template (To Fill In) | Reference Solution |
| :--- | :--- | :--- |
| **Day 1: Teleop Velocity Scaler** | [`navpro_basics/task_teleop_speed_limiter.py`](ros2_ws/src/navpro_basics/navpro_basics/task_teleop_speed_limiter.py) | [`navpro_basics/solution_teleop_speed_limiter.py`](ros2_ws/src/navpro_basics/navpro_basics/solution_teleop_speed_limiter.py) |
| **Day 2: Forward Kinematics TF2** | [`navpro_description/task_custom_odometry_tf.py`](ros2_ws/src/navpro_description/navpro_description/task_custom_odometry_tf.py) | [`navpro_description/solution_custom_odometry_tf.py`](ros2_ws/src/navpro_description/navpro_description/solution_custom_odometry_tf.py) |
| **Day 3: Nav2 Patrol Mission** | [`navpro_navigation/task_multi_waypoint_patrol.py`](ros2_ws/src/navpro_navigation/navpro_navigation/task_multi_waypoint_patrol.py) | [`navpro_navigation/solution_multi_waypoint_patrol.py`](ros2_ws/src/navpro_navigation/navpro_navigation/solution_multi_waypoint_patrol.py) |
| **Project 3: OpenCV Optical Inspection** | [`navpro_vision/task_opencv_inspection.py`](ros2_ws/src/navpro_vision/navpro_vision/task_opencv_inspection.py) | [`navpro_vision/solution_opencv_inspection.py`](ros2_ws/src/navpro_vision/navpro_vision/solution_opencv_inspection.py) |
