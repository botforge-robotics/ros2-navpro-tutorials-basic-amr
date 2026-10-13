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
> **Description:** Enables the official Ubuntu Universe repository, which provides community-maintained open-source packages and build tools.

**Hands-On Practical Command:**
```bash
sudo apt install -y software-properties-common
sudo add-apt-repository universe
```

---

### Step 5.3: Add Official ROS 2 GPG Key & APT Source
> [!SYNTAX]
> **Command Syntax:** `curl -sSL <key_url> -o <keyring_path>` &nbsp;|&nbsp; `tee /etc/apt/sources.list.d/<list>`  
> **Description:** Downloads OpenPGP archive keys into `/usr/share/keyrings` and adds the official Open Robotics package repository to your APT sources list for cryptographically verified package installations.

**Hands-On Practical Command:**
```bash
sudo apt update && sudo apt install -y curl gnupg lsb-release

# Download official ROS archive key
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

## 6. Docker Containerized Setup (Zero-Friction Option)

For students on Windows, macOS, or clean Linux installations, the **NavPro Learning Hub** provides a fully pre-configured Docker image containing ROS 2 Jazzy, Gazebo Sim (Harmonic), Nav2, an in-browser Ubuntu 24.04 desktop GUI (**noVNC**), and an in-browser VS Code editor (**code-server**).

### Step 6.0: Prerequisites — Installing Docker

Before building the container, ensure Docker Engine and Docker Compose are installed on your host system.

#### A. Installing Docker on Windows (WSL 2 Backend)
1. **Enable Hardware Virtualization:** Ensure Virtualization (VT-x / AMD-V) is enabled in your PC's BIOS/UEFI settings.
2. **Install WSL 2 (Windows Subsystem for Linux):** Open PowerShell as Administrator and execute:
   ```powershell
   wsl --install
   ```
   Restart your computer if prompted by Windows.
3. **Download & Install Docker Desktop:**
   - Download the official installer from [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/).
   - During setup, verify the option **"Use WSL 2 instead of Hyper-V"** is checked.
   - Launch Docker Desktop, navigate to **Settings &rarr; Resources &rarr; WSL Integration**, and ensure your Ubuntu/WSL distro is toggled on.
   - Test in PowerShell or Command Prompt:
     ```powershell
     docker --version
     docker compose version
     ```

#### B. Installing Docker on Linux (Ubuntu 22.04 / 24.04 LTS)
1. **Remove conflicting legacy packages:**
   ```bash
   for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove -y $pkg; done
   ```
2. **Set up Docker's official APT repository:**
   ```bash
   sudo apt update
   sudo apt install -y ca-certificates curl gnupg
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$UBUNTU_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```
3. **Install Docker Engine & Compose plugin:**
   ```bash
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```
4. **Configure Non-Root User Permissions (Post-Install):**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```
5. **Verify installation:**
   ```bash
   docker run --rm hello-world
   docker compose version
   ```

#### Official Reference Documentation Links
| Resource | URL & Official Guide | Description |
|---|---|---|
| **Docker Desktop for Windows** | [Install Docker Desktop on Windows](https://docs.docker.com/desktop/setup/install/windows-install/) | Official installation walkthrough for Windows 10/11 with WSL 2 backend |
| **Microsoft WSL 2 Setup** | [How to install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install) | Microsoft documentation for setting up the WSL 2 Linux kernel |
| **Docker Engine for Ubuntu** | [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) | Official APT repository setup guide for Ubuntu 22.04 & 24.04 LTS |
| **Docker Linux Post-Install** | [Linux Post-installation Steps](https://docs.docker.com/engine/install/linux-postinstall/) | Managing Docker as a non-root user and systemd auto-start |
| **Docker Compose Docs** | [Overview of Docker Compose](https://docs.docker.com/compose/) | Reference guide for compose syntax and CLI commands |

---

### Step 6.1: Build & Launch the Complete Stack with One Command
> [!SYNTAX]
> **Command Syntax:** `docker compose up [options]`  
> **Description:** Builds and starts containerized services defined in `docker-compose.yml`. Flag `--build` compiles images from the local Dockerfile; `-d` runs containers detached in the background.

**One-Command Stack Launch (Level 1 Repository):**
```bash
# Navigate to the Level 1 repository directory
cd /home/chaitu/Projects/navpro_learning_hub/level1

# Launch the entire ecosystem (Web Portal, Desktop GUI, and VS Code) in one command:
docker compose up --build -d
```

Verify that the Level 1 container is active and running:
```bash
docker ps --filter "name=navpro_level1_container"
```
*Expected Terminal Output:*
```text
CONTAINER ID   IMAGE                          STATUS         PORTS
a1b2c3d4e5f6   navpro-level1-ros2-sim:latest  Up 2 minutes   0.0.0.0:8000->8000/tcp, 0.0.0.0:6080->6080/tcp, 0.0.0.0:8443->8443/tcp
```

---

### Step 6.2: One-Click Launch via Top Navigation Status Bar

You do not need to memorize URLs. Notice the **quick-launch buttons on the top status bar / header** of this web portal:

| Status Bar Button | Destination URL | Purpose & Environment |
|---|---|---|
| **`🖥️ Desktop GUI`** | `http://localhost:6080/vnc.html?autoconnect=true&resize=remote` | Opens full Ubuntu 24.04 XFCE desktop with Gazebo, RViz2, and Terminator. |
| **`💻 VS Code`** | `http://localhost:8443/?folder=/home/student/ros2_ws` | Opens in-browser VS Code editor directly rooted in your ROS 2 workspace. |

> [!IMPORTANT]
> **Authentication & Credentials:**  
> * **noVNC Desktop GUI:** **No password required (Passwordless Instant Connect)**. When the browser tab opens, it connects automatically to your Ubuntu desktop.  
> * **In-Browser VS Code IDE:** **No password required** (pre-authenticated). It opens directly into `/home/student/ros2_ws`.

---

### Step 6.3: Command-Line Terminal Access inside Container
> [!SYNTAX]
> **Command Syntax:** `docker exec -it <container_name> <shell_binary>`  
> **Description:** Opens an interactive terminal session inside a running container. Flag `-i` keeps stdin open, and `-t` allocates a terminal TTY buffer.

**Hands-On Practical Command:**
```bash
docker exec -it navpro_level1_container bash
```

Inside the container shell, all ROS 2 Jazzy paths and workspace tools are auto-sourced:
```bash
# Verify environment inside container:
ros2 pkg list | grep turtlebot3
gz sim --version
```
*Expected Terminal Output:*
```text
turtlebot3_description
turtlebot3_navigation2
Gazebo Sim, version 8.6.0
```

---

### Step 6.4: Stopping the Container
```bash
cd /home/chaitu/Projects/navpro_learning_hub/level1/docker
docker compose down
```

---

## 7. Productivity Development Tooling

Robotics programming requires running multiple nodes, echoing topics, and monitoring logs simultaneously.

### 7.1 Multi-Terminal Manager: Terminator
Install Terminator for easy terminal window splitting:

```bash
sudo apt install -y terminator
```

**Essential Terminator Shortcuts:**
- `Ctrl + Shift + O`: Split pane **horizontally** (top and bottom).
- `Ctrl + Shift + E`: Split pane **vertically** (left and right).
- `Alt + Arrow Keys`: Navigate between active split panes.
- `Ctrl + Shift + W`: Close active pane.
- `F11`: Toggle fullscreen.

![Terminator Multi-Pane Terminal Layout](../../web/assets/images/terminator_layout.svg)

### 7.2 Visual Studio Code Configuration
Launch VS Code in your workspace:
```bash
code .
```

Recommended Extensions for ROS 2 Python:
1. **Python** (`ms-python.python`): IntelliSense, linting, syntax highlighting.
2. **ROS** (`ms-iot.vscode-ros`): ROS 2 environment discovery, build task runners.
3. **XML** (`redhat.vscode-xml`): Autocompletion and syntax validation for `package.xml` and URDF/Xacro files.
4. **Even Better TOML** / **YAML**: Syntax highlighting for parameter and configuration files.

---

## 8. Shell Environment Sourcing & Productive Aliases

By default, every new bash terminal needs to know where ROS 2 is installed. Adding the setup script to `~/.bashrc` automates this.

Edit your `~/.bashrc` file:
```bash
nano ~/.bashrc
```

Append the following lines to the bottom of the file:
```bash
# -------------------------------------------------------------
# NavPro ROS 2 Environment Setup & Aliases
# -------------------------------------------------------------
source /opt/ros/jazzy/setup.bash

# Ensure local workspace overlay is sourced if present
if [ -f "$HOME/ros2_ws/install/setup.bash" ]; then
    source "$HOME/ros2_ws/install/setup.bash"
fi

# Set isolated DDS domain ID (Change per student to avoid network crosstalk)
export ROS_DOMAIN_ID=1

# Productivity Shortcuts
alias sb='source ~/.bashrc && echo "Environment sourced!"'
alias cb='colcon build --symlink-install'
alias cbp='colcon build --symlink-install --packages-select'
alias killros='killall -9 gzserver gzclient robot_state_publisher 2>/dev/null'
```

Save and reload the environment:
```bash
source ~/.bashrc
```

---

## 9. Verification & "Hello World" Smoke Test

Run the built-in ROS 2 talker and listener demo nodes to verify that DDS peer discovery is operational.

### Step 9.1: Launch Talker Node
> [!SYNTAX]
> **Command Syntax:** `ros2 run <package_name> <executable_name>`  
> **Description:** Executes a compiled ROS 2 executable from an installed package. Starts the node process and begins publishing on DDS topics.

**Hands-On Practical Command (Terminal 1):**
```bash
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
