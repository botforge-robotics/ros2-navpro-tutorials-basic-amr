# Lesson 01: Linux Fundamentals for Robotics Engineers

> **Focus:** Essential Linux Terminal Commands, Filesystem Hierarchy, File Permissions & Process Management  
> **Course Track:** NavPro Learning Hub - Level 1 &bull; Zero-to-Autonomous AMR Engineer  
> **Target Environment:** Ubuntu 24.04 LTS (Noble Numbat) / Containerized Docker / Raspberry Pi & Jetson

---

## 1. Overview & Learning Objectives

Robotics software runs on Linux (Ubuntu LTS). Before diving into robotics middleware in Lesson 02, you must master the fundamental command-line workflows: navigating directories, inspecting files, granting executable permissions to scripts, and managing background processes.

![Robotics Software Stack](../../web/assets/images/robotics_software_stack.svg)

By the end of this lesson, you will:
* **Navigate the Linux filesystem** and understand where user files, system packages, and logs reside.
* **Master daily command-line utilities** (`cd`, `ls`, `mkdir -p`, `cp`, `rm`, `grep`) in an unbroken hands-on workflow.
* **Understand file permission strings** and use `chmod +x` to make shell scripts directly executable.
* **Inspect and cleanly terminate background processes** (`top`, `kill`, `killall`).
* **Configure `~/.bashrc`** with productivity shell shortcuts (`alias`) and automated environment variables.
* **Use Terminator** to split and orchestrate multi-terminal workflows on a single screen.

---

## 2. The Linux Filesystem: What You Need to Know

In Linux, all files, hardware devices, and network sockets are organized into a single unified tree originating at root (`/`):

![Linux Filesystem Hierarchy](../../web/assets/images/linux_filesystem_tree.svg)

### Key Directory Guide for Roboticists

<div class="info-grid">
  <div class="info-card">
    <h4>📁 <code>~/</code> (/home/student/)</h4>
    <p>Your personal user workspace. You have full read, write, and execute permissions here without requiring <code>sudo</code>.</p>
  </div>
  <div class="info-card">
    <h4>⚙️ <code>/opt/</code></h4>
    <p>Where system-level robotics packages and pre-compiled software stacks reside (e.g. <code>/opt/ros/jazzy/</code>).</p>
  </div>
  <div class="info-card">
    <h4>🌐 <code>/etc/</code></h4>
    <p>System-wide configuration files (networking, hosts, user groups, and APT package repositories).</p>
  </div>
  <div class="info-card">
    <h4>📊 <code>/var/log/</code></h4>
    <p>System service logs, boot diagnostics, and runtime error traces.</p>
  </div>
  <div class="info-card">
    <h4>🔌 <code>/dev/</code></h4>
    <p>Device nodes representing hardware peripherals (USB LiDARs <code>/dev/ttyUSB0</code> and microcontrollers).</p>
  </div>
</div>

---

## 3. Hands-On Practical: Building a Robotics Workspace

Follow this continuous hands-on workflow in your terminal. Every single command builds directly upon the folders and files created in the preceding step, ensuring zero *"file not found"* errors.

### 3.0 Step 0: How to Open the Terminal & Switch to Home Directory

Before executing any commands, you need an open terminal window:

* **In the Browser Desktop (noVNC / TigerVNC):** Click the **Terminal** (or **Terminator**) icon on the desktop dock/panel, or press the universal shortcut <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>.
* **In the Cloud VS Code IDE (Code Server):** Press <kbd>Ctrl</kbd> + <kbd>`</kbd> (Backtick) or select **Terminal &rarr; New Terminal** from the top menu bar.

> [!IMPORTANT]
> **Crucial First Step: Switch to Your Home Directory (`cd ~`)**  
> In containerized robotics environments, new terminals often launch inside the pre-configured ROS 2 workspace folder (`/home/student/ros2_ws`).  
> **Before running the Linux fundamentals commands below, return to your user home directory root (`/home/student`) by entering:**
> ```bash
> cd ~
> ```
> Run `pwd` to confirm your terminal prompt displays `/home/student`, then proceed with the exercises below!

---

### 3.1 Step 1: Navigating & Inspecting Your Workspace

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">pwd</span>
      <span class="cmd-title">Print Current Working Directory</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>pwd</code></span>
  </div>
  <p class="cmd-desc">Prints the absolute filesystem path of the directory you are currently working in. Useful to orient yourself before creating or modifying files.</p>
```bash
pwd
# Output: /home/student
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">ls -lah</span>
      <span class="cmd-title">List Files with Detailed Permissions &amp; Sizes</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>ls [options] [path]</code></span>
  </div>
  <p class="cmd-desc">Lists directory contents. Flag <code>-l</code> uses long format with permissions and owners, <code>-a</code> reveals hidden files (<code>.bashrc</code>), and <code>-h</code> formats file sizes in human-readable units (KB, MB).</p>
```bash
ls -lah
# Displays: permissions, owner, size, and filenames including .bashrc
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">cd</span>
      <span class="cmd-title">Change Working Directory</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>cd &lt;target_directory&gt;</code></span>
  </div>
  <p class="cmd-desc">Changes your active shell location. Use <code>cd ~</code> to return to your home directory, <code>cd ..</code> to step up one level, and <code>cd -</code> to toggle back to the previous directory.</p>
```bash
# Ensure you are at your user home directory root
cd ~
pwd
# Output: /home/student
```
</div>

---

### 3.2 Step 2: Creating a Structured Robotics Workspace &amp; Files

Let's build a clean robotics project folder `~/robotics_lab` with dedicated subdirectories for configurations (`config`), scripts (`scripts`), and runtime logs (`logs`).

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">mkdir -p</span>
      <span class="cmd-title">Create Nested Directory Trees</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>mkdir -p &lt;dir_1&gt; [dir_2] ...</code></span>
  </div>
  <p class="cmd-desc">Creates new directories. The <code>-p</code> (parents) flag creates any missing parent directories automatically in a single command without throwing errors if they already exist.</p>
```bash
mkdir -p ~/robotics_lab/config ~/robotics_lab/scripts ~/robotics_lab/logs

# Verify the three subdirectories exist:
ls -la ~/robotics_lab
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">echo &gt; &gt;&gt;</span>
      <span class="cmd-title">Create &amp; Append Configuration Files</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>echo "text" &gt; file</code> (create/overwrite) | <code>echo "text" &gt;&gt; file</code> (append)</span>
  </div>
  <p class="cmd-desc">Emits text strings. The <code>&gt;</code> redirection operator writes output to a file (creating it or overwriting existing content), while <code>&gt;&gt;</code> appends new lines to the end of an existing file.</p>
```bash
echo "robot_model: navpro_mini" > ~/robotics_lab/config/robot_params.yaml
echo "max_linear_velocity: 0.5" >> ~/robotics_lab/config/robot_params.yaml
echo "lidar_topic: /scan" >> ~/robotics_lab/config/robot_params.yaml

# Inspect the written configuration:
cat ~/robotics_lab/config/robot_params.yaml
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">touch</span>
      <span class="cmd-title">Create Empty Placeholder Files</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>touch &lt;file_path&gt;</code></span>
  </div>
  <p class="cmd-desc">Creates an empty 0-byte file if it does not already exist, or updates the file's last-modified timestamp without altering its contents.</p>
```bash
touch ~/robotics_lab/scripts/diagnostics.sh
echo "Pre-flight test initialization completed at $(date)" > ~/robotics_lab/logs/boot_temp.log

# Verify both files now exist on disk:
ls -l ~/robotics_lab/scripts/ ~/robotics_lab/logs/
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">cp / cp -r</span>
      <span class="cmd-title">Copy Files &amp; Recursive Directories</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>cp [options] &lt;source&gt; &lt;destination&gt;</code></span>
  </div>
  <p class="cmd-desc">Copies files or folders to a target location. Use flag <code>-r</code> (recursive) to copy an entire directory and all nested files within it.</p>
```bash
# 1. Create a safety backup copy of the robot config file
cp ~/robotics_lab/config/robot_params.yaml ~/robotics_lab/config/robot_params_backup.yaml

# 2. Copy the entire scripts directory recursively (-r)
cp -r ~/robotics_lab/scripts ~/robotics_lab/scripts_backup

# Verify both backup copies exist:
ls -l ~/robotics_lab/config/
ls -la ~/robotics_lab/scripts_backup/
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">mv</span>
      <span class="cmd-title">Move or Rename Files &amp; Directories</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>mv &lt;source&gt; &lt;destination&gt;</code></span>
  </div>
  <p class="cmd-desc">Moves files or folders to a new directory path, or renames them in place when the source and destination reside within the same parent folder.</p>
```bash
# 1. Rename diagnostics.sh to sensor_diagnostics.sh in place
mv ~/robotics_lab/scripts/diagnostics.sh ~/robotics_lab/scripts/sensor_diagnostics.sh

# 2. Move the backup config into the logs directory for archiving
mv ~/robotics_lab/config/robot_params_backup.yaml ~/robotics_lab/logs/archived_params.yaml

# Verify updates:
ls -l ~/robotics_lab/scripts/
ls -l ~/robotics_lab/logs/
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">rm / rm -rf</span>
      <span class="cmd-title">Safe File &amp; Directory Cleanup</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>rm [options] &lt;target_path&gt;</code></span>
  </div>
  <p class="cmd-desc">Deletes files or directories permanently. Flag <code>-r</code> enables recursive directory deletion, and <code>-f</code> (force) suppresses confirmation prompts and ignores non-existent files.</p>
```bash
# 1. Remove the temporary test log file
rm ~/robotics_lab/logs/boot_temp.log

# 2. Recursively force delete the scripts_backup directory
rm -rf ~/robotics_lab/scripts_backup

# Confirm clean workspace structure:
ls -la ~/robotics_lab/
```
</div>

---

### 3.3 Step 3: Inspecting, Reading &amp; Searching Files

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">cat</span>
      <span class="cmd-title">Display Full File Contents</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>cat &lt;file_path&gt;</code></span>
  </div>
  <p class="cmd-desc">Concatenates and streams the entire contents of a file directly to standard output. Best suited for short configuration files and scripts.</p>
```bash
cat ~/robotics_lab/config/robot_params.yaml

# Output:
# robot_model: navpro_mini
# max_linear_velocity: 0.5
# lidar_topic: /scan
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">head / tail</span>
      <span class="cmd-title">Inspect Top or Bottom Lines of Files</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>head -n &lt;N&gt; &lt;file&gt;</code> | <code>tail -f &lt;file&gt;</code></span>
  </div>
  <p class="cmd-desc"><code>head</code> prints the first $N$ lines of a file; <code>tail</code> prints the last $N$ lines. Flag <code>-f</code> with <code>tail</code> follows live logs in real-time as background daemons write new data.</p>
```bash
# View the first 5 lines of network hosts
head -n 5 /etc/hosts

# Output displays: 127.0.0.1 localhost, ::1 ip6-localhost...
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">grep -rn</span>
      <span class="cmd-title">Search Text Patterns Across Files &amp; Folders</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>grep [options] "&lt;pattern&gt;" &lt;path&gt;</code></span>
  </div>
  <p class="cmd-desc">Searches text lines matching a query. Flag <code>-r</code> searches recursively through directories, and <code>-n</code> displays the exact line number of each match.</p>
```bash
# Search recursively for "navpro" inside our robotics lab workspace
grep -rn "navpro" ~/robotics_lab/

# Output:
# /home/student/robotics_lab/config/robot_params.yaml:1:robot_model: navpro_mini
# /home/student/robotics_lab/logs/archived_params.yaml:1:robot_model: navpro_mini
```
</div>

---

## 4. File Permissions: Making Shell Scripts Executable

When you create a script in Linux, it is created without execution permissions by default. Attempting to run it directly triggers:
```text
bash: ./diagnostics.sh: Permission denied
```

### 4.1 Understanding the Permission String

Running `ls -l` outputs a 10-character permission string:

```text
-rwxr-xr-x 1 student student 1420 Oct 13 10:00 diagnostics.sh
 │├──┘├──┘└── Others permissions (Read, Execute)
 ││   └── Group permissions (Read, Execute)
 │└── User (Owner) permissions: Read (r), Write (w), Execute (x)
 └── File type: '-' = regular file, 'd' = directory
```

Each triplet represents:
* **`r` (Read = 4):** View file contents.
* **`w` (Write = 2):** Modify or delete file.
* **`x` (Execute = 1):** Execute the file as a program.

### 4.2 Hands-On Exercise: Creating &amp; Running an Executable Script

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">chmod +x</span>
      <span class="cmd-title">Grant Executable Permission to Shell Script</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>chmod +x &lt;script_file&gt;</code> | <code>chmod 755 &lt;script_file&gt;</code></span>
  </div>
  <p class="cmd-desc">Modifies file access permissions. Flag <code>+x</code> grants execution rights so the operating system can run the script directly as an independent program.</p>
```bash
# Step 1: Create a real diagnostic script inside ~/robotics_lab/scripts/
cat << 'EOF' > ~/robotics_lab/scripts/system_check.sh
#!/bin/bash
echo "=========================================="
echo "      ROBOT SUBSYSTEM PRE-FLIGHT CHECK    "
echo "=========================================="
echo "Timestamp:    $(date)"
echo "Kernel:       $(uname -r)"
echo "Architecture: $(uname -m)"
echo "Free Memory:  $(free -h | awk '/^Mem:/ {print $4}')"
echo "All host subsystems operating normally!"
echo "=========================================="
EOF

# Step 2: Try running the script directly (triggers Permission denied)
~/robotics_lab/scripts/system_check.sh

# Step 3: Grant executable permission (+x)
chmod +x ~/robotics_lab/scripts/system_check.sh

# Step 4: Run the script successfully!
~/robotics_lab/scripts/system_check.sh
```
</div>

---

## 5. Process Management &amp; Background Jobs

Robotics systems run multiple programs simultaneously (LiDAR driver, SLAM, motor controllers). You must know how to inspect resource usage, start background jobs, and terminate stalled processes.

### 5.1 Monitoring Running Processes

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">sleep &amp; / ps aux</span>
      <span class="cmd-title">Launch Background Jobs &amp; Inspect Processes</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>&lt;cmd&gt; &amp;</code> | <code>ps aux | grep &lt;name&gt;</code></span>
  </div>
  <p class="cmd-desc">Appending <code>&amp;</code> to any command runs it as a background job, freeing your terminal immediately. <code>ps aux</code> lists all running processes with user, PID, CPU, memory, and command path.</p>
```bash
# 1. Start a harmless sleep process in the background using the '&' operator
sleep 300 &
# Output: [1] 42109

# 2. Filter active processes to find our background sleep job:
ps aux | grep sleep
```
</div>

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">top</span>
      <span class="cmd-title">Interactive System Resource Task Manager</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>top</code> (press 'q' to exit)</span>
  </div>
  <p class="cmd-desc">Interactive real-time process viewer displaying total CPU usage, memory utilization, and active process states sorted by resource consumption.</p>
```bash
top
# Displays live PID table, memory load, and CPU %. Press 'q' to exit.
```
</div>

### 5.2 Terminating Processes Cleanly

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">kill / killall</span>
      <span class="cmd-title">Terminate Background Processes Cleanly</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>kill &lt;PID&gt;</code> | <code>kill -9 &lt;PID&gt;</code> | <code>killall &lt;name&gt;</code></span>
  </div>
  <p class="cmd-desc">Sends POSIX termination signals. Standard <code>kill</code> sends SIGTERM (graceful shutdown); <code>kill -9</code> sends SIGKILL (forced instant halt); <code>killall</code> terminates all processes matching a binary name.</p>
```bash
# 1. Terminate all running sleep test processes cleanly
killall sleep

# 2. Verify the process has terminated (returns only grep itself):
ps aux | grep sleep
```
</div>

---

## 6. Shell Automation with `~/.bashrc`

Every time you launch a new terminal, Linux reads and executes `~/.bashrc`. You can define custom shortcut aliases to streamline daily terminal operations:

<div class="cmd-card">
  <div class="cmd-header">
    <div class="cmd-header-left">
      <span class="cmd-badge">alias / source</span>
      <span class="cmd-title">Shell Shortcuts &amp; Automated Sourcing</span>
    </div>
    <span class="cmd-syntax">Syntax: <code>alias &lt;key&gt;='&lt;command&gt;'</code> | <code>source &lt;file&gt;</code></span>
  </div>
  <p class="cmd-desc">Defines persistent shortcuts in <code>~/.bashrc</code>. The <code>source</code> command reloads the configuration in the active terminal immediately without restarting the shell.</p>
```bash
# 1. Append productivity shortcuts to ~/.bashrc:
echo 'alias ll="ls -lah"' >> ~/.bashrc
echo 'alias c="clear"' >> ~/.bashrc
echo 'alias lab="cd ~/robotics_lab"' >> ~/.bashrc
echo 'alias myip="hostname -I | awk '\''{print \$1}'\''"' >> ~/.bashrc

# 2. Reload bash configuration in current active terminal:
source ~/.bashrc

# 3. Test your custom shortcut:
lab
pwd
# Output: /home/student/robotics_lab
```
</div>

> [!NOTE]
> In **Lesson 02**, we will add your ROS 2 underlay paths (`/opt/ros/jazzy/setup.bash`) to this file so every terminal is automatically primed for robotics programming!

---

## 7. Multi-Pane Terminal Workflows (Terminator)

Robotics workflows often require 3–4 terminal windows running concurrently (simulation, sensors, visualization, commands). **Terminator** allows splitting your screen into a clean multi-terminal grid:

![Terminator Multi-Pane Layout](../../web/assets/images/terminator_layout.svg)

| Shortcut | Function | Purpose in Robotics |
|---|---|---|
| `Ctrl + Shift + O` | **Split Horizontally** | Creates top and bottom terminal panes |
| `Ctrl + Shift + E` | **Split Vertically** | Creates left and right terminal panes |
| `Alt + Arrow Keys` | **Navigate Active Panes** | Switch focus quickly without touching mouse |
| `Ctrl + Shift + X` | **Maximize / Restore Active Pane** | Zoom in on a busy node log |
| `Ctrl + Shift + W` | **Close Current Pane** | Safely exit an active terminal session |
| `Alt + A` | **Broadcast Keystrokes to All Panes** | Send identical commands across multiple panes |
| `Alt + O` | **Disable Broadcast Mode** | Return to independent pane control |

---

## 8. 💡 Pro-Tips &amp; Hardware Reference

> [!TIP] Connecting Physical USB Sensors (Microcontrollers & LiDARs)
> If plugging in an external USB microcontroller (ESP32, Arduino) or LiDAR produces `Permission denied: /dev/ttyUSB0`, grant your user serial permissions once:
> ```bash
> sudo usermod -a -G dialout $USER
> ```
> Then log out and log back in (or run `newgrp dialout`).

> [!TIP] Searching Bash Command History
> Press `Ctrl + R` in any terminal and start typing a previous command (e.g. `system_check`) to search and auto-complete your command history without retyping.

---

## 9. Summary &amp; Next Steps

You now have a solid command of Linux engineering fundamentals:
* **Navigated the filesystem hierarchy** and inspected essential system paths.
* **Created and managed files** in an organized robotics project workspace.
* **Created shell scripts and granted execution rights** using `chmod +x`.
* **Managed background processes** and monitored resource consumption with `top` and `killall`.
* **Configured productivity aliases** in `~/.bashrc`.

In **[Lesson 02](02_ros2_overview_and_environment_setup.md)**, we build on these Linux foundations to install our robotics stack: exploring ROS 2 Jazzy architecture, the peer-to-peer DDS middleware, and containerized Docker setup!
