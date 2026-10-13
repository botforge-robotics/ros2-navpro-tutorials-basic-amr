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

## 3. What is ROS 2?

**ROS 2** is not a traditional operating system like Linux or Windows. It is a **meta-operating system**—a modular software framework and middleware suite providing:
- **Hardware Abstraction:** Drivers for LiDARs, depth cameras, IMUs, motor controllers.
- **Inter-Process Communication (IPC):** Standardized message passing between isolated processes (Nodes).
- **Package Management:** Modular build, dependency, and release tooling via `colcon` and `rosdep`.
- **Ecosystem Libraries:** Advanced algorithms for 2D/3D SLAM (`slam_toolbox`), path planning (`Nav2`), perception (`OpenCV`), and kinematics (`TF2`).

### 3.1 ROS 1 vs. ROS 2: The Architectural Paradigm Shift

![ROS 1 vs ROS 2 DDS Architectural Comparison](../../web/assets/images/ros1_vs_ros2_dds.svg)

Key evolutions in ROS 2:
1. **No Master Node (`roscore` eliminated):** In ROS 1, if `roscore` crashed, the entire robot halted. In ROS 2, nodes automatically discover each other over the local network via peer-to-peer **DDS (Data Distribution Service)** discovery.
2. **Industrial Quality of Service (QoS):** Customize delivery guarantees per topic (e.g., Best Effort for high-rate sensor streams vs. Reliable for safety commands).
3. **Native Multi-Robot Networking:** Robots on the same network communicate seamlessly using isolated `ROS_DOMAIN_ID` channels.
4. **Modern Python 3 Standard:** Pure Python 3 architecture with asynchronous execution (`asyncio` and `rclpy.executors`).

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
  [`http://localhost:8443/?folder=/home/student/ros2_ws`](http://localhost:8443/?folder=/home/student/ros2_ws)

> [!NOTE]
> **Pre-Authenticated Workspace:**  
> No password or sign-in is required. The editor opens directly rooted inside `/home/student/ros2_ws` so you can immediately inspect robot packages, launch files, and Python scripts.

### 7.2 Key In-Browser VS Code Features
1. **Pre-Installed Robotics Extensions:** Python IntelliSense, ROS tooling, XML (for URDF/Xacro), and YAML highlighting are pre-configured.
2. **Integrated Terminal:** Press <kbd>Ctrl</kbd> + <kbd>`</kbd> (Backtick) or select **Terminal &rarr; New Terminal** to open a bash shell already located in `~/ros2_ws`.
3. **Real-Time Code Persistence:** Any code files you edit or save in this browser window are stored directly in your workspace on disk and preserved across container restarts.

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
