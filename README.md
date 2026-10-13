# NavPro Learning Hub - Level 1: Zero-to-Autonomous AMR Engineer

Welcome to **Level 1** of the NavPro Robotics Workshop! This hands-on curriculum is designed for software engineers, students, and roboticists who want to master **ROS 2 Jazzy** (Python-focused) from absolute fundamentals through Linux engineering, kinematics, 3D modeling, Gazebo physics simulation, SLAM, Nav2 autonomous navigation, and physical AMR hardware deployment.

> 🚀 **Interactive Web Portal:** You can also browse this entire curriculum with live interactive simulators (Differential Drive Kinematics, DDS Particle Streamer, Costmap Explorer, Behavior Tree Runner) in the **[NavPro Interactive Web Hub](../web/index.html)**!

---

## 📚 Complete Step-by-Step Curriculum & Tutorial Guide (26 Lessons)

Each lesson below features a comprehensive breakdown: theory, architectural diagrams, step-by-step terminal commands, line-by-line code explanation tables, configuration guides (`package.xml`, `setup.py`), CLI debugging workflows, and hands-on exercises:

| Lesson | Topic & Pedagogical Scope                                                                                                                                                          | Markdown Guide                                                             | Interactive Web Page                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| **01** | **Linux Fundamentals for Robotics Engineers** (CLI navigation, workspace hierarchy, executable permissions `chmod +x`, process cleanup `killall`, `~/.bashrc` aliases, Terminator) | [Lesson 01 Guide](tutorials/01_linux_fundamentals_for_robotics.md)         | [Interactive Web Page](../web/lessons/lesson_01.html) |
| **02** | **ROS 2 Overview & Environment Setup** (History, DDS vs ROS 1, Terminator, VS Code, Docker)                                                                                        | [Lesson 02 Guide](tutorials/02_ros2_overview_and_environment_setup.md)     | [Interactive Web Page](../web/lessons/lesson_02.html) |
| **03** | **Workspace Architecture & First Python Node** (`colcon build --symlink-install`, Underlay/Overlay, OOP Node)                                                                      | [Lesson 03 Guide](tutorials/03_workspace_and_first_python_node.md)         | [Interactive Web Page](../web/lessons/lesson_03.html) |
| **04** | **Package Architecture & Configuration** (`package.xml`, `setup.py`, `setup.cfg`, `resource/` markers)                                                                             | [Lesson 04 Guide](tutorials/04_package_architecture_and_configuration.md)  | [Interactive Web Page](../web/lessons/lesson_04.html) |
| **05** | **Communication I: Publishers, Subscribers & QoS** (Topics, Timers, Callbacks, QoS Compatibility, Project 1)                                                                       | [Lesson 05 Guide](tutorials/05_publishers_subscribers_and_qos.md)          | [Interactive Web Page](../web/lessons/lesson_05.html) |
| **06** | **VS Code Tooling & ROS 2 Logging** (`.vscode/tasks.json`, `.vscode/settings.json`, Log Levels `DEBUG` to `FATAL`)                                                                 | [Lesson 06 Guide](tutorials/06_vscode_debugging_and_ros2_logging.md)       | [Interactive Web Page](../web/lessons/lesson_06.html) |
| **07** | **Interface Types & Custom Messages** (`std_msgs`, `geometry_msgs`, custom `.msg`, `.srv`, `.action` compilation)                                                                  | [Lesson 07 Guide](tutorials/07_interfaces_and_custom_messages.md)          | [Interactive Web Page](../web/lessons/lesson_07.html) |
| **08** | **Communication II: Service Servers & Clients** (Request/Response, Asynchronous `call_async`, Deadlock prevention)                                                                 | [Lesson 08 Guide](tutorials/08_services_server_client_python.md)           | [Interactive Web Page](../web/lessons/lesson_08.html) |
| **09** | **Dynamic Parameters & YAML Configuration** (`declare_parameter`, validation callbacks, YAML parameter files)                                                                      | [Lesson 09 Guide](tutorials/09_dynamic_parameters_and_yaml.md)             | [Interactive Web Page](../web/lessons/lesson_09.html) |
| **10** | **Runtime Management & Launch Files** (Python launch API, Arguments, Substitutions, Remappings, Project 2)                                                                         | [Lesson 10 Guide](tutorials/10_launch_files_and_runtime_management.md)     | [Interactive Web Page](../web/lessons/lesson_10.html) |
| **11** | **Communication III: Action Servers & Clients** (Goal-Feedback-Result pattern, preemption, progress streaming)                                                                     | [Lesson 11 Guide](tutorials/11_ros2_actions_server_and_client.md)          | [Interactive Web Page](../web/lessons/lesson_11.html) |
| **12** | **Data Recording & Playback with ROS Bags** (MCAP vs SQLite3 storage, topic filtering, Python `rosbag2_py` API)                                                                    | [Lesson 12 Guide](tutorials/12_ros2_bag_recording_and_playback.md)         | [Interactive Web Page](../web/lessons/lesson_12.html) |
| **13** | **Complete ROS 2 CLI Command Mastery** (`ros2 node`, `topic`, `service`, `param`, `action`, `doctor`, `daemon`)                                                                    | [Lesson 13 Guide](tutorials/13_ros2_cli_command_mastery.md)                | [Interactive Web Page](../web/lessons/lesson_13.html) |
| **14** | **TF2 Coordinate Transformations in Python** (REP-105 standard, Euler/Quaternion math, Static/Dynamic Broadcasters)                                                                | [Lesson 14 Guide](tutorials/14_tf2_coordinate_transformations_python.md)   | [Interactive Web Page](../web/lessons/lesson_14.html) |
| **15** | **Distributed ROS 2 & DDS Networking** (`ROS_DOMAIN_ID` port math, FastDDS vs CycloneDDS, Discovery Server)                                                                        | [Lesson 15 Guide](tutorials/15_distributed_ros2_and_dds_networking.md)     | [Interactive Web Page](../web/lessons/lesson_15.html) |
| **16** | **Project 3: Computer Vision & OpenCV Integration** (`cv_bridge`, camera feed, Canny edge detection service)                                                                       | [Lesson 16 Guide](tutorials/16_project_opencv_ros2_vision.md)              | [Interactive Web Page](../web/lessons/lesson_16.html) |
| **17** | **3D Robot Modeling with URDF & Xacro** (Kinematic joints, visual/collision geometry, inertia calculation macros)                                                                  | [Lesson 17 Guide](tutorials/17_3d_modeling_urdf_xacro.md)                  | [Interactive Web Page](../web/lessons/lesson_17.html) |
| **18** | **RViz2 Visualization & Kinematic TF Inspection** (RGB=XYZ axes rule, Fixed Frame resolution, joint sliders)                                                                       | [Lesson 18 Guide](tutorials/18_rviz2_visualization_tf_inspection.md)       | [Interactive Web Page](../web/lessons/lesson_18.html) |
| **19** | **Gazebo Physics Simulation & Sensor Plugins** (ODE engine, Differential Drive plugin, 2D LiDAR ray sensor, IMU)                                                                   | [Lesson 19 Guide](tutorials/19_gazebo_physics_and_sensor_plugins.md)       | [Interactive Web Page](../web/lessons/lesson_19.html) |
| **20** | **Building Simulation Worlds in Gazebo** (SDF world modeling, boundary walls, storage racks, static obstacles)                                                                     | [Lesson 20 Guide](tutorials/20_building_simulation_worlds.md)              | [Interactive Web Page](../web/lessons/lesson_20.html) |
| **21** | **2D LiDAR SLAM Mapping with SLAM Toolbox** (Online asynchronous SLAM, pose graphs, loop closures, map saving)                                                                     | [Lesson 21 Guide](tutorials/21_2d_slam_mapping_slam_toolbox.md)            | [Interactive Web Page](../web/lessons/lesson_21.html) |
| **22** | **Nav2 Stack Architecture & Costmap 2D** (Static, Obstacle, Inflation layers, footprint, cost scaling math)                                                                        | [Lesson 22 Guide](tutorials/22_nav2_architecture_and_costmaps.md)          | [Interactive Web Page](../web/lessons/lesson_22.html) |
| **23** | **Nav2 Path Planners & Local Controller Tuning** (NavFn/Smac Global Planner vs DWB/RPP Local Controller, critics tuning)                                                           | [Lesson 23 Guide](tutorials/23_nav2_planners_controllers_tuning.md)        | [Interactive Web Page](../web/lessons/lesson_23.html) |
| **24** | **Behavior Trees, Recovery Behaviors & Lifecycle** (BT Navigator, BackUp/Spin/Wait recoveries, Lifecycle Manager)                                                                  | [Lesson 24 Guide](tutorials/24_nav2_behavior_trees_and_recoveries.md)      | [Interactive Web Page](../web/lessons/lesson_24.html) |
| **25** | **Autonomous Patrol with Nav2 Simple Commander** (`BasicNavigator` Python SDK, `goToPose`, multi-waypoint loop)                                                                    | [Lesson 25 Guide](tutorials/25_autonomous_patrol_nav2_simple_commander.md) | [Interactive Web Page](../web/lessons/lesson_25.html) |
| **26** | **Physical Robot Hardware Deployment (Sim-to-Real)** (SSH bringup, Micro-ROS/serial motors, RPLidar, AMCL relocalization)                                                          | [Lesson 26 Guide](tutorials/26_physical_robot_hardware_deployment.md)      | [Interactive Web Page](../web/lessons/lesson_26.html) |

---

## 💻 Student Assignments vs. Reference Solutions in Workspace

Every assignment has two corresponding files in the workspace:

1. **`task_*.py`**: The student starter template containing `# TODO: FILL IN CODE HERE` blocks for hands-on practice.
2. **`solution_*.py`**: The complete, verified reference solution for instructors or students seeking guidance.

| Project / Exercise                       | Student Task Template (To Fill In)                                                                                                 | Reference Solution                                                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Day 1: Teleop Velocity Scaler**        | [`navpro_basics/task_teleop_speed_limiter.py`](ros2_ws/src/navpro_basics/navpro_basics/task_teleop_speed_limiter.py)               | [`navpro_basics/solution_teleop_speed_limiter.py`](ros2_ws/src/navpro_basics/navpro_basics/solution_teleop_speed_limiter.py)               |
| **Day 2: Forward Kinematics TF2**        | [`navpro_description/task_custom_odometry_tf.py`](ros2_ws/src/navpro_description/navpro_description/task_custom_odometry_tf.py)    | [`navpro_description/solution_custom_odometry_tf.py`](ros2_ws/src/navpro_description/navpro_description/solution_custom_odometry_tf.py)    |
| **Day 3: Nav2 Patrol Mission**           | [`navpro_navigation/task_multi_waypoint_patrol.py`](ros2_ws/src/navpro_navigation/navpro_navigation/task_multi_waypoint_patrol.py) | [`navpro_navigation/solution_multi_waypoint_patrol.py`](ros2_ws/src/navpro_navigation/navpro_navigation/solution_multi_waypoint_patrol.py) |
| **Project 3: OpenCV Optical Inspection** | [`navpro_vision/task_opencv_inspection.py`](ros2_ws/src/navpro_vision/navpro_vision/task_opencv_inspection.py)                     | [`navpro_vision/solution_opencv_inspection.py`](ros2_ws/src/navpro_vision/navpro_vision/solution_opencv_inspection.py)                     |

---

## 🤖 Companion Mock Data Simulator

When working on student assignments, students do not need physical hardware or heavy Gazebo instances to test their code. Launch the companion simulator node:

```bash
ros2 run navpro_basics mock_telemetry_provider
```

- **Simulates:** `/battery_voltage` (Float32), `/battery_status` (BatteryState), `/obstacle_distance` (Float32), `/wheel_speeds` (Vector3).
- **Hosts:** `/set_speed_mode` (SetBool) and `/emergency_stop_reset` (Trigger) services.

To test camera vision tasks:

```bash
ros2 run navpro_vision camera_streamer
```

- **Simulates:** Real-time 15 Hz 640x480 color optical stream on `/camera/image_raw`.

---

## 🛠️ Zero-Friction Containerized Environment

Students can run the entire environment in their browser without dual-booting Linux:

```bash
cd docker
docker compose up --build -d
```

- **In-Browser Ubuntu Desktop & Simulation (noVNC):** `http://localhost:6080/vnc.html` (Password: `password`)
- **In-Browser VS Code IDE (code-server):** `http://localhost:8443`

### Resetting to Clean Starter Code Anytime:

```bash
./scripts/reset_workspace.sh
```

Restores all student task files to clean boilerplate with structured `# TODO` comments and clears transient build artifacts.
