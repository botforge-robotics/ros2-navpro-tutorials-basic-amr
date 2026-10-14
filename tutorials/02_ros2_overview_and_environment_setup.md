# Lesson 02: ROS 2 Overview & Environment Setup

> **Focus:** Python-Only Robotics Engineering Workflow  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** Ubuntu 24.04 LTS / Docker Container with ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Welcome to the foundation of modern robotics software engineering. This tutorial introduces **Robot Operating System 2 (ROS 2)**, the global standard for building commercial autonomous robots.

By the end of this lesson, you will:
1. Understand the core architectural differences between ROS 1 and ROS 2 (DDS middleware vs. Master node).
2. Learn the release lifecycle and why **ROS 2 Jazzy Jalisco** on Ubuntu 24.04 is the industry benchmark.
3. Install and configure a complete ROS 2 development workstation (Native Ubuntu or Containerized Docker).
4. Configure multi-terminal development tooling with **Terminator** and **VS Code**.
5. Set up automatic shell environment sourcing and productivity aliases.

---

## 2. Hardware and Software Prerequisites

| Component | Specification | Purpose |
|---|---|---|
| **Operating System** | Ubuntu 24.04 LTS (Noble Numbat) or Docker | Base OS supporting ROS 2 Jazzy |
| **Processor** | x86_64 or ARM64 (e.g. Jetson Orin, Raspberry Pi 5) | Host compute |
| **RAM** | Minimum 8 GB (16 GB recommended for Gazebo sim) | Colcon builds and simulation |
| **ROS 2 Distro** | **ROS 2 Jazzy Jalisco** (LTS until May 2027) | Robotics middleware |
| **Python** | Python 3.12+ | Primary programming language |
| **Editor** | Visual Studio Code (or Web code-server) | Code development & debugging |
| **Terminal** | Terminator or tmux | Multi-pane ROS 2 CLI monitoring |

---

## 3. Robotics Fundamentals & ROS 2 Architecture

### 3.1 What is a Robot? & The Three Core Ingredients

> **Definition:** A **robot** is a machine capable of carrying out a complex series of actions automatically, especially one programmable by a computer.

![AMR Anatomy Cutaway](assets/images/robot_anatomy_ingredients.png)

Every autonomous robot—from an industrial mobile robot moving warehouse boxes to an interstellar rover—relies on **three fundamental ingredients**:

1. **Perception (The Robot's Eyes & Ears):** How the robot senses the world around it.
   - *Simple Role:* Just like humans use eyes and ears to look and listen, the robot uses sensors to see where it is, detect obstacles, and measure distances to walls.
   - *Hardware Examples:* 📷 Cameras (seeing), 🔴 LiDAR (measuring distances with lasers), 🧭 GPS and Compass (direction and location).
   - *System Output:* Sends distance and camera sensor data (`/scan`, `/camera/image_raw`).
2. **Decision Making (The Robot's Brain):** How the robot thinks and plans what to do next.
   - *Simple Role:* It takes the sensor data and makes smart choices—from simple reactions like stopping when something gets too close, to complex decisions like reading a building map and finding the shortest route to a room.
   - *Everyday Examples:* 🛑 Stop immediately if a person walks in front • 🗺️ Read the room map • 📍 Plan the smoothest path to the destination.
   - *System Output:* Sends movement speed and direction commands (`/cmd_vel`).
3. **Action (The Robot's Muscles):** How the robot physically moves and changes the real world.
   - *Simple Role:* It takes the brain's decision and powers physical hardware to do real work.
   - *Mechanisms:* ⚙️ Spinning drive wheels to roll forward, 🦾 Moving a robotic arm to pick up objects, or 🔊 Speaking audio alerts to people through a speaker.
   - *System Output:* Physical motion and work in the physical world.

---

### 3.2 The Story of a Robotics Developer: Why We Need a Standard

One pretty common story in robotics development is this:

#### 🎬 Step 1: The Dream: Autonomous Medicine Delivery Robot
![Step 1: The Dream: Autonomous Medicine Delivery Robot](assets/images/story_step1_dream.jpg)

> **Someday, a student/engineer starts a new cool robotics project: She wants to build an Autonomous Medicine Delivery Robot** to transport medicine across hospital corridors and deliver supplies safely to patient beds.  
> Soon, she discovers that it’s not that simple: robotics is hard to learn, and developing good software takes immense time.

---

#### 🎬 Step 2: The Plumbing Trap: LiDAR, Cameras, Motors & Sockets
![Step 2: The Plumbing Trap: LiDAR, Cameras, Motors & Sockets](assets/images/story_step2_plumbing.jpg)

> **All her time is consumed by low-level plumbing:**  
> - How to get raw distance data from the LiDAR?
> - How to read images from the camera?
> - How to control the electric drive motors?
> - And how to make all these separate programs communicate and synchronize with each other?  
> 
> *Without realizing it, all her time is killed writing device drivers and IPC sockets instead of autonomous medicine delivery.*

---

#### 🎬 Step 3: Goal Abandoned: Just an RC Car
![Step 3: Goal Abandoned: Just an RC Car](assets/images/story_step3_burnout.jpg)

> **The project deadline arrives (often a 2–3 year PhD timeframe). No real progress was made on autonomous navigation.**  
> So much time was killed trying to write communication plumbing that the main project goal—an autonomous medicine delivery robot—was completely abandoned. All she managed to make in the end was get the motors to move using a hacked remote control (a glorified RC car). Soon the project is abandoned, and the prototype sits dormant in the lab.

---

#### 🎬 Step 4: Another Guy Starts: The Food Delivery Robot Loop
![Step 4: Another Guy Starts: The Food Delivery Robot Loop](assets/images/story_step4_cycle.jpg)

> **A few weeks later, another guy wants to develop a Food Delivery Robot.**  
> He thinks: *What if I find some existing code I can directly use?* He finds her project on the Internet where she worked on controlling motors and getting LiDAR data.  
> But because her code was written without any standard framework, it is completely hardcoded, undocumented, and non-reusable for his robot.  
> **So, he has to start writing everything from scratch all over again!**

---

> [!WARNING]
> **The Core Problem in Robotics Development:**  
> *"And so on, and so forth. Many people who work in robot software development don’t actually develop robotics applications (such as medicine delivery or food delivery). They spend years building custom motor drivers and low-level frameworks that end up non-reusable, unsupported, not known, and quickly forgotten.*  
> 
> *This situation often happens for people doing a PhD, with a 2–3 years time frame for the project.*  
> 
> ***This is one of the main factors slowing down robotics research and development — and ROS was created specifically to solve this problem!***"

---

### 3.3 The ROS Goal: Stop Reinventing the Wheel!

A universal standard so you can focus on building your application instead of reinventing infrastructure.

![Stop Reinventing the Wheel](assets/images/reinventing_wheel_cartoon.jpg)

> [!IMPORTANT]
> **THE ROS MISSION:**  
> *"The ROS goal is to provide a standard for robotics software development, that you can use on any robot. Whether you are programming a mobile robot, robotic arm, drone, boat, vending machine… etc.*  
> *This standard allows you to **focus on the key features of your application**, using an existing battle-tested foundation, instead of trying to do everything yourself."*

#### The Three Critical Dilemmas Addressed by the ROS Standard:
1. **Hardware Chaos & Noise:** Robots operate in physical environments with messy friction, optical reflections, shifting lighting, and mechanical back-divisibility. Standardized message schemas (`/scan`, `/odom`) isolate physical sensor quirks from your code.
2. **The "Square Wheel" Trap:** Instead of spending 80% of budgets writing custom serial sockets and device drivers, use battle-tested open-source packages.
3. **The Modular Middleware Solution:** Decoupled peer-to-peer nodes communicate via industrial DDS with zero single point of failure.

---

### 3.4 What is ROS? The Windows OS Metaphor

![The Operating System Metaphor: Windows vs ROS](assets/images/ros_metaphor_pc_vs_robot.jpg)

> **The Operating System Metaphor: Windows for PC ➔ ROS for Robots**  
> 
> Think about how your personal computer works: When you open **Chrome**, **Microsoft Word**, or **Blender**, you never have to write custom device drivers to talk to your mouse, keyboard, or printer. The operating system handles all the hardware communication behind the scenes through standardized interfaces.  
> 
> **ROS does the exact same thing for robots:** Instead of writing low-level code for every motor and camera, your high-level navigation, computer vision, and AI programs talk directly to ROS. If you switch from an expensive industrial laser scanner to a budget sensor, you don't rewrite your navigation software—ROS takes care of the hardware translation!

---

### 3.4.1 The Core Reality: A Framework, Not a Bare-Metal OS

![ROS 2 Framework on Top of Host Operating Systems](assets/images/ros_framework_os_layers.jpg)

> [!IMPORTANT]
> **"Robot Operating System, despite its name, is not an operating system; rather, it’s a framework that works on top of an existing operating system."**  
> ⭐ **Ubuntu Linux** is the official Tier-1, best-supported, and industry-standard operating system for robotics engineering.

---

### 3.5 The 4 Foundational Pillars of ROS

| Pillar | What It Provides | Real-World Robotics Impact |
|:---|:---|:---|
| **1. The Plumbing (Middleware)** | Anonymous, distributed message-passing (Topics, Services, Actions) running over industrial DDS (Data Distribution Service). | Decouples software processes completely. A camera node doesn't care who is watching; it simply publishes `/camera/image_raw`. You can add an obstacle detector or a web dashboard without modifying a single line of camera code. |
| **2. The Tools** | Developer introspection & simulation: **RViz2** (3D sensor visualization), **Gazebo** (physics simulation), **ros2 bag** (record & replay flight telemetry), and **rqt_graph**. | Inspect the robot's brain in real time without guessing. Test navigation algorithms in simulated physics worlds before risking collisions on thousand-dollar physical hardware. |
| **3. The Capabilities** | Production-ready algorithms for 2D/3D SLAM mapping (`slam_toolbox`), path planning (`Nav2`), kinematics (`TF2`), and computer vision (`cv_bridge`). | You don't need a PhD in computational geometry to make a robot navigate from Point A to Point B. You wire Nav2 into your sensors and focus on your business mission. |
| **4. The Ecosystem** | Massive global community backed by Open Robotics and industry consortiums (ROS-Industrial). | Hardware vendors (SICK, Velodyne, Intel RealSense, ODrive) publish verified ROS 2 drivers out of the box under permissive Apache 2.0 open-source licenses. |

---

### 3.6 The Motion Flow Explanation: The Robot as a Living Organism

To intuitively understand how ROS 2 operates at runtime, visualize the AMR not as a collection of scripts, but as a **living biological organism** where information flows through four dynamic stages:

![ROS 2 Motion Architecture & Data Flow](assets/images/ros2_motion_architecture.svg)

#### 🎬 Motion Flow Stage Breakdown:
```text
[ 1. SENSES (Perception) ]  ---> ( /scan, /image_raw )
             |
             v
[ 2. NERVES (The DDS Highway) ] (Zero Bottleneck, Sub-ms Multicast)
             |
             +---> [ 3. BRAIN (Cognition & SLAM/Nav2) ]
             |                    |
             |                    v ( /cmd_vel )
             +<-------------------+
             |
             v
[ 4. MUSCLES (Actuation & Motors) ] ---> Physical Wheel Motion
```

1. **Stage 1: Senses (Sensory Perception / Telemetry Input)**
   - The robot's eyes and ears: The **LiDAR Node** continuously spins at 10 Hz, emitting 360 laser distance measurements bundled into a `sensor_msgs/msg/LaserScan` packet.
   - The **Camera Node** captures 30 FPS video frames as `sensor_msgs/msg/Image`.
   - The **IMU Node** streams high-frequency angular velocity and linear acceleration (100 Hz).
   - *In Motion:* Data packets pulse outward from the hardware sensors directly onto the local data bus.

2. **Stage 2: Nerves (The DDS Communication Highway)**
   - The central nervous system: Instead of routing messages through a centralized master bottleneck (as ROS 1 did), ROS 2 utilizes **DDS (Data Distribution Service)**.
   - Nodes discover each other automatically via peer-to-peer UDP multicast.
   - *In Motion:* Messages travel along high-speed virtual conduits. On a single robot computer, data moves through **zero-copy shared memory** (nanoseconds); across wireless fleet networks, DDS handles packet serialization and retransmission deterministically.

3. **Stage 3: Brain (Cognitive Planning & State Estimation)**
   - The cognitive cortex: The **SLAM Node (`slam_toolbox`)** consumes `/scan` and wheel odometry, performing scan-matching against the global map to calculate the robot's exact coordinates $(x, y, \theta)$.
   - The **Nav2 Controller (`controller_server`)** projects global obstacles onto a rolling costmap, evaluates dozens of candidate velocity trajectories with DWB critics, and chooses the optimal speed curve.
   - *In Motion:* The brain synthesizes incoming sensory pulses and outputs forward/angular velocity setpoints as `geometry_msgs/msg/Twist` on topic `/cmd_vel`.

4. **Stage 4: Muscles (Actuation & Motor Control)**
   - The physical limbs: The **Differential Drive Controller Node** subscribes to `/cmd_vel`. It solves differential kinematics:
     $$v_{\text{left}} = \frac{v_x - \omega_z \cdot \frac{L}{2}}{R}, \quad v_{\text{right}} = \frac{v_x + \omega_z \cdot \frac{L}{2}}{R}$$
   - Sends target RPM setpoints to the motor controller boards over CAN or USB.
   - *In Motion:* The wheels rotate, the AMR advances forward across the warehouse floor, and new wheel encoder ticks flow back to the nervous system, completing the closed-loop perception-action cycle!

---

### 3.7 ROS 1 vs. ROS 2: The Architectural Paradigm Shift & Unified RCL C Core

#### Eliminating Language Inconsistencies: The Unified C Core (`rcl`)
In **ROS 1**, `roscpp` and `rospy` were two completely independent codebases written from scratch. Features added to C++ were often missing in Python, multithreading worked differently, and bugs fixed in one language lingered in the other for years.

In **ROS 2**, Open Robotics solved this by building a unified C core: `rcl` (ROS Client Library) and `rcutils`. Both `rclcpp` (C++) and `rclpy` (Python) are thin, lightweight wrappers on top of the exact same C codebase.

```text
       [ rclcpp (C++ API) ]        [ rclpy (Python 3 API) ]
                 \                          /
                  ▼  thin wrapper bindings ▼
             [ rcl (Unified Common ROS Client C Core) + rcutils ]
                                    │
                         ▼ standard abstraction ▼
             [ rmw (ROS MiddleWare Interface) ---> FastDDS / CycloneDDS ]
```

> **Result:** 100% behavioral parity, identical threading models, and synchronized updates across Python and C++!

| Architectural Dimension | ROS 1 (Legacy) | ROS 2 (Modern Industrial Standard) |
|:---|:---|:---|
| **Discovery Mechanism** | Centralized `roscore` master registry. | **Peer-to-Peer DDS**: Decentralized automatic discovery. |
| **Fault Tolerance** | **Single Point of Failure**: If `roscore` crashes, all nodes lose connection. | **Fault-Tolerant**: No master node exists. If any single node crashes, all other nodes continue communicating. |
| **Language Libraries (C++ vs Python)** | **High Inconsistency**: Separate codebases (`roscpp` vs `rospy`) with feature disparities. | **100% Unified**: Thin wrappers (`rclcpp`/`rclpy`) over shared C core (`rcl`). |
| **Network Reliability** | TCP/UDP without delivery guarantees over lossy Wi-Fi. | **Configurable QoS (Quality of Service)**: Best Effort (sensors) vs. Reliable (commands). |
| **Multi-Robot Fleets** | Complex hacks (multimaster_fkie, bridging). | **Native Isolation**: `ROS_DOMAIN_ID=0..101` partitions robots cleanly on the same LAN. |
| **Real-Time Capability** | No real-time support. | **Real-Time Deterministic**: Compatible with RTOS and Linux PREEMPT_RT kernels. |
| **Programming Core** | Python 2.7 / legacy C++03. | **Modern Python 3.12+** / Modern C++17. |

---

## 4. ROS 2 Release Timeline

ROS 2 releases are named alphabetically after adjectives and marine/amphibian species:

| Release Name | Target Ubuntu | Release Date | End of Life (EOL) | Industry Status |
|---|---|---|---|---|
| Foxy Fitzroy | Ubuntu 20.04 LTS | June 2020 | May 2023 | End of Life |
| Galactic Geochelone | Ubuntu 20.04 LTS | May 2021 | Nov 2022 | End of Life |
| Humble Hawksbill | Ubuntu 22.04 LTS | May 2022 | May 2027 | Mature LTS |
| Iron Irwini | Ubuntu 22.04 LTS | May 2023 | Nov 2024 | End of Life |
| **Jazzy Jalisco** | **Ubuntu 24.04 LTS** | **May 2024** | **May 2029** | **Primary Recommended LTS (Workshop Standard)** |

> [!IMPORTANT]
> **ROS 2 Jazzy Jalisco** on **Ubuntu 24.04 LTS (Noble Numbat)** represents the state-of-the-art long-term support release, featuring Python 3.12, native MCAP bag storage, enhanced FastDDS / CycloneDDS middleware, and the latest Nav2 autonomous navigation framework.

---

## 5. Step-by-Step Installation on Ubuntu 24.04 LTS

If installing natively on Ubuntu 24.04, follow these exact verified steps:

### Step 5.1: Configure Locale (UTF-8 Verification)
> [!SYNTAX]
> **Command Syntax:** `locale` &nbsp;|&nbsp; `sudo locale-gen <locale>` &nbsp;|&nbsp; `sudo update-locale <vars>`  
> **Description:** ROS 2 requires an explicit UTF-8 locale environment to process character encoding in ROS message strings, logs, and telemetry packets.

**Hands-On Practical Command:**
```bash
locale  # Verify output contains UTF-8

sudo apt update && sudo apt install -y locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
```

---

### Step 5.2: Enable Ubuntu Universe Repository
> [!SYNTAX]
> **Command Syntax:** `sudo add-apt-repository <repo_name>`  
> **Description:** Enables the Ubuntu Universe repository, which provides community-maintained open-source packages and build tools.

**Hands-On Practical Command:**
```bash
sudo apt install -y software-properties-common
sudo add-apt-repository universe
```

---

### Step 5.3: Add ROS 2 GPG Key & APT Source
> [!SYNTAX]
> **Command Syntax:** `curl -sSL <key_url> -o <keyring_path>` &nbsp;|&nbsp; `tee /etc/apt/sources.list.d/<list>`  
> **Description:** Downloads OpenPGP archive keys into `/usr/share/keyrings` and adds the Open Robotics package repository to your APT sources list for cryptographically verified package installations.

**Hands-On Practical Command:**
```bash
sudo apt update && sudo apt install -y curl gnupg lsb-release

# Download ROS archive key
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Add ROS 2 repository to sources list
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

---

### Step 5.4: Install ROS 2 Jazzy Desktop & Build Tools
> [!SYNTAX]
> **Command Syntax:** `sudo apt install -y ros-jazzy-desktop python3-colcon-common-extensions`  
> **Description:** Installs the core ROS 2 libraries, RViz2 visualization, Gazebo integration packages, Python 3 bindings, and the Colcon build tool.

**Hands-On Practical Command:**
```bash
sudo apt update
sudo apt install -y ros-jazzy-desktop

# Install Colcon build system, rosdep, and python dependencies
sudo apt install -y python3-colcon-common-extensions python3-rosdep python3-pip python3-argcomplete
```

---

### Step 5.5: Initialize Rosdep
> [!SYNTAX]
> **Command Syntax:** `sudo rosdep init` &nbsp;|&nbsp; `rosdep update`  
> **Description:** Initializes the package dependency index. `rosdep` queries the global ROS package index to resolve and install OS system dependencies (apt libraries, C++ headers, Python packages) required by ROS 2 nodes.

**Hands-On Practical Command:**
```bash
sudo rosdep init
rosdep update
```

---

## 6. How to Open &amp; Use the Desktop GUI (noVNC &bull; Port 6080)

Because your NavPro Learning Hub container is already running, a full Ubuntu 24.04 XFCE desktop environment is available directly inside your web browser. This desktop is where you run graphical robotics software like Gazebo Harmonic 3D simulations, RViz2 sensor visualizers, and multi-pane terminals.

### 6.1 Accessing the Desktop GUI
You can open the Ubuntu desktop at any time using either method:
* **One-Click Navbar Link:** Click the **`🖥️ Desktop GUI`** button in the top navigation bar of this platform.
* **Direct Browser URL:** Navigate to:  
  [`http://localhost:6080/vnc.html?autoconnect=true&resize=remote`](http://localhost:6080/vnc.html?autoconnect=true&resize=remote)

> [!NOTE]
> **Passwordless Instant Connect:**  
> The VNC server is pre-configured with passwordless authentication. The browser tab connects immediately without prompting for a password.

### 6.2 Pre-Configured Robotics Desktop Launchers
On your desktop screen, you will find clean, dedicated application launchers tailored specifically for your coursework:
* **Terminal:** Launches the pre-configured ROS 2 command terminal directly inside `/home/student`.
* **RViz2 Visualizer:** Opens the 3D robot visualization tool with the ROS 2 Jazzy environment loaded.
* **Gazebo Simulator:** Launches the Gazebo Harmonic physics engine ready to simulate your AMRs.
* **ROS 2 Workspace:** Instant shortcut opening your active `~/ros2_ws` project folder.

### 6.3 noVNC Controls &amp; Productivity Tips
* **Remote Auto-Resize:** The desktop automatically matches your browser window dimensions (`resize=remote`).
* **Clipboard Sync:** Click the small slide-out chevron menu on the left edge of the noVNC screen to open the noVNC Control Bar &rarr; select the **Clipboard** tool to copy-paste text between your host OS and the container.
* **Fullscreen Mode:** Click the Fullscreen icon in the noVNC slide-out menu or press <kbd>F11</kbd> in your browser for a distraction-free native desktop experience.

---

## 7. How to Open &amp; Use In-Browser VS Code IDE (Port 8443)

You do not need to install local IDEs or extensions. A full Visual Studio Code IDE (code-server) is running inside your container, accessible from any browser tab.

### 7.1 Accessing the VS Code Editor
* **One-Click Navbar Link:** Click the **`💻 VS Code`** button in the top navigation bar.
* **Direct Browser URL:** Navigate to:  
  [`http://localhost:8443/?folder=/home/student`](http://localhost:8443/?folder=/home/student)

> [!NOTE]
> **Pre-Authenticated User Home Workspace:**  
> No password or sign-in is required. The editor opens directly rooted inside `/home/student` so you can manage your files, view your terminal, and immediately see your `~/ros2_ws` directory as soon as you create it in **Lesson 03**!

### 7.2 Key In-Browser VS Code Features
1. **Pre-Installed Robotics Extensions:** Python IntelliSense, ROS tooling, XML (for URDF/Xacro), and YAML highlighting are pre-configured.
2. **Integrated Terminal:** Press <kbd>Ctrl</kbd> + <kbd>`</kbd> (Backtick) or select **Terminal &rarr; New Terminal** to open a bash shell in `/home/student`.
3. **Real-Time Code Persistence:** Any code files you edit or save in this browser window are stored directly on disk and preserved across container restarts.

---

## 8. How to Open &amp; Use the Terminal (Desktop, Hotkeys, Terminator &amp; Host CLI)

Robotics engineers spend most of their time in the Linux terminal: compiling packages, echoing topics, and monitoring nodes. You have four convenient ways to open and use the terminal in your environment:

### Method 1: Desktop Terminal Icon &amp; Universal Hotkey (Inside VNC)
* **Desktop Launcher:** Double-click the **Terminal** icon on the desktop.
* **Universal Hotkey:** In the noVNC desktop window, press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>.
* **Prompt Location:** Launches directly in your home directory `/home/student`.

### Method 2: Multi-Pane Workflow with Terminator
Robotics workflows require monitoring 3 to 4 nodes at once (e.g. simulation, teleop control, sensor topics, and node logs). **Terminator** lets you split your screen into multiple independent terminal tiles:
* **Launch Terminator:** Open the terminal and run `terminator &` (or find it in the XFCE Applications menu).
* **Split Horizontally:** Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> to split the current pane top and bottom.
* **Split Vertically:** Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> to split the current pane left and right.
* **Navigate Panes:** Press <kbd>Alt</kbd> + <kbd>Arrow Keys</kbd> to jump between tiles without touching the mouse.
* **Close Pane:** Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>W</kbd>.

### Method 3: Integrated Terminal inside VS Code
* Press <kbd>Ctrl</kbd> + <kbd>`</kbd> (Backtick) inside the in-browser VS Code tab (`:8443`).
* Perfect for quick `colcon build` commands while editing Python node files.

### Method 4: Terminal Access Directly from Host Shell
You can also enter the container directly from your local computer's native shell (Ubuntu terminal, macOS terminal, or Windows PowerShell):
```bash
docker exec -it navpro_level1_container bash
```

---

### 8.5 Sourcing the ROS 2 Installation (Underlay) &amp; Shell Automation

When you open a brand new terminal, the system does not load ROS 2 into your shell environment by default. If you try running `ros2` immediately:
```text
bash: ros2: command not found
```

To tell Linux where the ROS 2 binaries, libraries, and Python packages reside, you must **source the ROS 2 system setup file**:

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">source /opt/ros/...</span>
      <span class="cmd-title">Source ROS 2 Jazzy Underlay &amp; Automate with ~/.bashrc</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>source /opt/ros/jazzy/setup.bash</code></span>
  </div>
  <p class="cmd-desc">Populates your shell's <code>PATH</code>, <code>AMENT_PREFIX_PATH</code>, and <code>PYTHONPATH</code> with the ROS 2 Jazzy distribution.</p>
```bash
# Step 1: Source the ROS 2 installation manually in your current terminal:
source /opt/ros/jazzy/setup.bash

# Step 2: Verify that ROS 2 CLI commands are now active:
ros2 --help

# Step 3: Add sourcing permanently to your ~/.bashrc so every future terminal is automated:
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
```
</div>

> [!NOTE]
> **What about custom workspace sourcing?**  
> Sourcing custom project packages (`source ~/ros2_ws/install/setup.bash`) is called the **workspace overlay**. In **Lesson 03**, you will create, build, and source your own custom robotics workspace from scratch!

---

## 9. Verification & "Hello World" Smoke Test

Run the built-in ROS 2 talker and listener demo nodes to verify that DDS peer discovery is operational.

> [!TIP]
> Ensure ROS 2 is sourced in your active terminal before running these commands:  
> `source /opt/ros/jazzy/setup.bash` (or open a new terminal if you already added it to `~/.bashrc` in Section 8.5).

### Step 9.1: Launch Talker Node
> [!SYNTAX]
> **Command Syntax:** `ros2 run <package_name> <executable_name>`  
> **Description:** Executes a compiled ROS 2 executable from an installed package. Starts the node process and begins publishing on DDS topics.

**Hands-On Practical Command (Terminal 1):**
```bash
# 1. Ensure ROS 2 is sourced in this terminal:
source /opt/ros/jazzy/setup.bash

# 2. Start the talker publisher node:
ros2 run demo_nodes_py talker
```
*Expected Terminal Output:*
```text
[INFO] [talker]: Publishing: "Hello World: 1"
[INFO] [talker]: Publishing: "Hello World: 2"
[INFO] [talker]: Publishing: "Hello World: 3"
```

---

### Step 9.2: Launch Listener Node
> [!SYNTAX]
> **Command Syntax:** `ros2 run <package_name> <executable_name>`  
> **Description:** Runs the subscriber node which dynamically discovers `/talker` over local DDS multicast and prints received messages.

**Hands-On Practical Command (Terminal 2):**
```bash
# 1. In a second terminal pane (e.g. Terminator Ctrl+Shift+O), ensure ROS 2 is sourced:
source /opt/ros/jazzy/setup.bash

# 2. Start the listener subscriber node:
ros2 run demo_nodes_py listener
```
*Expected Terminal Output:*
```text
[INFO] [listener]: I heard: [Hello World: 1]
[INFO] [listener]: I heard: [Hello World: 2]
[INFO] [listener]: I heard: [Hello World: 3]
```

---

### Step 9.3: Inspect Active Nodes & Echo Topics
> [!SYNTAX]
> **Command Syntax:** `ros2 node list` &nbsp;|&nbsp; `ros2 topic list` &nbsp;|&nbsp; `ros2 topic echo <topic_name>`  
> **Description:** Queries the DDS peer discovery bus to inspect live running nodes, active message topics, and echo real-time data packets in the terminal.

**Hands-On Practical Command:**
```bash
ros2 node list
# Displays: /talker, /listener

ros2 topic list
# Displays: /chatter, /parameter_events, /rosout

ros2 topic echo /chatter
```
*Expected Terminal Output:*
```text
data: 'Hello World: 4'
---
data: 'Hello World: 5'
---
```

---

## 10. Summary & Next Steps

You now have a fully operational, industry-grade ROS 2 Jazzy workstation. In **Lesson 03**, we will build our first custom ROS 2 workspace from scratch and write an object-oriented Python node with timers and logging!
