#!/bin/bash
set -e

# Student environment starts clean without automatic ROS sourcing
# Students learn to source /opt/ros/jazzy/setup.bash and their workspace in Lessons 02 & 03

# Launch VNC server and web services if running in daemon/service mode
if [ "$START_SERVICES" = "true" ]; then
    # Ensure hostname resolves locally to prevent TigerVNC hostname lookup failure
    sudo sh -c 'echo "127.0.0.1 $(hostname)" >> /etc/hosts' 2>/dev/null || true

    # Clean up any stale lock files from previous runs
    vncserver -kill :1 2>/dev/null || rm -rf /tmp/.X1-lock /tmp/.X11-unix/X1 2>/dev/null || true

    echo "[Entrypoint] Starting TigerVNC server on :1 (Display port 5901, Passwordless)..."
    vncserver :1 -geometry 1920x1080 -depth 24 -localhost no -SecurityTypes None --I-KNOW-THIS-IS-INSECURE

    # Start bidirectional X11 clipboard synchronization
    DISPLAY=:1 vncconfig -nowin &
    DISPLAY=:1 autocutsel -fork >/dev/null 2>&1 &
    DISPLAY=:1 autocutsel -selection PRIMARY -fork >/dev/null 2>&1 &

    # Hide unneeded desktop icons (File System root, Trash, Removable drives)
    mkdir -p /home/student/.config/xfce4/xfconf/xfce-perchannel-xml /home/student/Desktop
    xfconf-query -c xfce4-desktop -p /desktop-icons/file-icons/show-filesystem -n -t bool -s false 2>/dev/null || true
    xfconf-query -c xfce4-desktop -p /desktop-icons/file-icons/show-trash -n -t bool -s false 2>/dev/null || true
    xfconf-query -c xfce4-desktop -p /desktop-icons/file-icons/show-removable -n -t bool -s false 2>/dev/null || true

    # Create essential robotics desktop launchers for students if missing
    if [ ! -f "/home/student/Desktop/Terminal.desktop" ]; then
        cat << 'EOF' > /home/student/Desktop/Terminal.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=Terminal
Comment=Open ROS 2 Command Line Terminal
Exec=xfce4-terminal --working-directory=/home/student
Icon=utilities-terminal
Terminal=false
StartupNotify=true
EOF
        cat << 'EOF' > /home/student/Desktop/Terminator.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=Terminator
Comment=ROS 2 Multi-Tab Split Terminal (Ctrl+Shift+O / Ctrl+Shift+E)
Exec=terminator
Icon=terminator
Terminal=false
StartupNotify=true
EOF
        cat << 'EOF' > /home/student/Desktop/RViz2.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=RViz2 Visualizer
Comment=ROS 2 3D Sensor & Robot Visualizer
Exec=bash -c "source /opt/ros/jazzy/setup.bash && rviz2"
Icon=utilities-system-monitor
Terminal=false
StartupNotify=true
EOF
        cat << 'EOF' > /home/student/Desktop/Gazebo_Sim.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=Gazebo Simulator
Comment=Gazebo Harmonic 3D Robot Physics Simulation
Exec=bash -c "source /opt/ros/jazzy/setup.bash && gz sim -v 4"
Icon=applications-games
Terminal=false
StartupNotify=true
EOF
        cat << 'EOF' > /home/student/Desktop/ROS2_Workspace.desktop
[Desktop Entry]
Version=1.0
Type=Link
Name=ROS 2 Workspace
Comment=Open student ros2_ws directory
URL=file:///home/student/ros2_ws
Icon=folder
EOF
        cat << 'EOF' > /home/student/Desktop/ROS2_Reference_Code.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=ROS 2 Reference Code
Comment=Browse ROS 2 Reference Packages & Solutions
Exec=thunar /home/student/ros2_ws_reference
Icon=folder-documents
Terminal=false
StartupNotify=true
EOF
        chmod +x /home/student/Desktop/*.desktop 2>/dev/null || true
        chown -R student:student /home/student/Desktop 2>/dev/null || true
    fi

    # Symlink ros2_ws_reference into student home space so VS Code and shell see it
    if [ -d "/opt/navpro_level1/ros2_ws_reference" ]; then
        ln -sfn /opt/navpro_level1/ros2_ws_reference /home/student/ros2_ws_reference
        chown -h student:student /home/student/ros2_ws_reference 2>/dev/null || true
    fi

    # Ensure nexus_amr_interfaces is built and installed into /opt/ros/jazzy underlay
    if [ ! -d "/opt/ros/jazzy/share/nexus_amr_interfaces" ] && [ -d "/opt/navpro_level1/ros2_ws_reference/src/nexus_amr_interfaces" ]; then
        echo "[Entrypoint] Pre-compiling nexus_amr_interfaces into /opt/ros/jazzy underlay..."
        BUILD_TMP=$(mktemp -d)
        cp -r /opt/navpro_level1/ros2_ws_reference/src/nexus_amr_interfaces "$BUILD_TMP/"
        (cd "$BUILD_TMP" && sudo -E bash -c '. /opt/ros/jazzy/setup.bash && colcon build --merge-install --install-base /opt/ros/jazzy' >/dev/null 2>&1) || true
        sudo rm -rf "$BUILD_TMP"
    fi


    # Initialize rosdep sources cache if absent so rosdep install works out-of-the-box
    if [ ! -d "/home/student/.ros/rosdep/sources.cache" ]; then
        echo "[Entrypoint] Initializing rosdep sources cache..."
        su - student -c "rosdep update >/dev/null 2>&1" || true
    fi

    # Patch noVNC ui.js to enable auto-sync from browser clipboard to VNC
    python3 -c '
path = "/usr/share/novnc/app/ui.js"
try:
    with open(path, "r") as f:
        c = f.read()
    if "Auto-sync clipboard" not in c and "addClipboardHandlers() {" in c:
        target = "addClipboardHandlers() {"
        replacement = target + """
        window.addEventListener(\x27focus\x27, async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.readText && UI.rfb) {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                        UI.rfb.clipboardPasteFrom(text);
                        const b = document.getElementById(\x27noVNC_clipboard_text\x27);
                        if (b) b.value = text;
                    }
                }
            } catch(e) {}
        });
        window.addEventListener(\x27paste\x27, (e) => {
            try {
                const text = e.clipboardData ? e.clipboardData.getData(\x27text/plain\x27) : null;
                if (text && UI.rfb) {
                    UI.rfb.clipboardPasteFrom(text);
                    const b = document.getElementById(\x27noVNC_clipboard_text\x27);
                    if (b) b.value = text;
                }
            } catch(e) {}
        });"""
        with open(path, "w") as f:
            f.write(c.replace(target, replacement))
except Exception:
    pass
' 2>/dev/null || true

    echo "[Entrypoint] Starting noVNC web proxy on port 6080..."
    websockify --web /usr/share/novnc/ 6080 localhost:5901 &

    # Configure and auto-launch Terminator multi-split terminal on desktop
    mkdir -p /home/student/.config/terminator
    if [ ! -f "/home/student/.config/terminator/config" ]; then
        cat << 'EOF' > /home/student/.config/terminator/config
[global_config]
  suppress_multiple_term_dialog = True
  title_font = DejaVu Sans 10
  title_use_system_font = False
  borderless = False
[keybindings]
  split_horiz = <Primary><Shift>o
  split_vert = <Primary><Shift>e
  close_term = <Primary><Shift>w
  toggle_zoom = <Primary><Shift>x
  broadcast_all = <Alt>a
  broadcast_off = <Alt>o
[profiles]
  [[default]]
    background_color = "#0a0f1d"
    cursor_color = "#38bdf8"
    cursor_shape = block
    cursor_blink = True
    font = DejaVu Sans Mono 11
    foreground_color = "#f8fafc"
    palette = "#0a0f1d:#ef4444:#22c55e:#eab308:#3b82f6:#a855f7:#06b6d4:#cbd5e1:#64748b:#f87171:#4ade80:#fde047:#60a5fa:#c084fc:#22d3ee:#ffffff"
    scrollback_infinite = True
    show_titlebar = True
    use_system_font = False
[layouts]
  [[default]]
    [[[window0]]]
      type = Window
      parent = ""
      size = 1200, 750
    [[[child1]]]
      type = Terminal
      parent = window0
      profile = default
[plugins]
EOF
        chown -R student:student /home/student/.config/terminator 2>/dev/null || true
    fi
    DISPLAY=:1 terminator --maximise &

    # Ensure code-server default workspace folder is /home/student
    mkdir -p /home/student/.local/share/code-server
    cat << 'EOF' > /home/student/.local/share/code-server/coder.json
{
  "query": {
    "folder": "/home/student"
  }
}
EOF

    # Configure VS Code automation tasks and ROS 2 Python extraPaths
    mkdir -p /home/student/.vscode /home/student/ros2_ws/.vscode
    cat << 'EOF' > /home/student/.vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "colcon: build (symlink-install)",
      "type": "shell",
      "command": "cd ~/ros2_ws && colcon build --symlink-install",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": [],
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "colcon: build selected package",
      "type": "shell",
      "command": "cd ~/ros2_ws && colcon build --symlink-install --packages-select ${input:packageName}",
      "problemMatcher": [],
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "colcon: clean build artifacts",
      "type": "shell",
      "command": "cd ~/ros2_ws && rm -rf build install log",
      "problemMatcher": [],
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ],
  "inputs": [
    {
      "id": "packageName",
      "type": "promptString",
      "description": "Enter ROS 2 package name to build (e.g. nexus_amr_basics):",
      "default": "nexus_amr_basics"
    }
  ]
}
EOF

    cat << 'EOF' > /home/student/.vscode/settings.json
{
  "python.defaultInterpreterPath": "/usr/bin/python3",
  "python.autoComplete.extraPaths": [
    "/opt/ros/jazzy/lib/python3.12/site-packages",
    "${workspaceFolder}/ros2_ws/install/nexus_amr_basics/lib/python3.12/site-packages"
  ],
  "python.analysis.extraPaths": [
    "/opt/ros/jazzy/lib/python3.12/site-packages",
    "${workspaceFolder}/ros2_ws/install/nexus_amr_basics/lib/python3.12/site-packages"
  ],
  "python.analysis.autoSearchPaths": true,
  "python.analysis.diagnosticMode": "openFilesOnly",
  "editor.tabCompletion": "on",
  "editor.formatOnSave": true
}
EOF
    cp /home/student/.vscode/tasks.json /home/student/ros2_ws/.vscode/tasks.json 2>/dev/null || true
    cp /home/student/.vscode/settings.json /home/student/ros2_ws/.vscode/settings.json 2>/dev/null || true
    mkdir -p /home/student/.local/share/code-server/User
    cp /home/student/.vscode/tasks.json /home/student/.local/share/code-server/User/tasks.json 2>/dev/null || true
    cp /home/student/.vscode/settings.json /home/student/.local/share/code-server/User/settings.json 2>/dev/null || true
    chown -R student:student /home/student/.vscode /home/student/ros2_ws/.vscode /home/student/.local/share/code-server 2>/dev/null || true

    echo "[Entrypoint] Starting in-browser VS Code editor on port 8443..."
    code-server --auth none --bind-addr 0.0.0.0:8443 /home/student &

    # Launch in-browser Web Terminal (ttyd) on port 7681
    if which ttyd >/dev/null 2>&1; then
        echo "[Entrypoint] Starting in-browser Web Terminal on port 7681..."
        ttyd -p 7681 -w /home/student -W -t titleFixed="ROS 2 Terminal" -t fontSize=15 -t cursorBlink=true -t theme='{"background": "#0a0f1d"}' /bin/bash &
    fi

    # Symlink reset_workspace script to /usr/local/bin so it is globally available
    if [ -f "/opt/navpro_level1/scripts/reset_workspace.sh" ]; then
        sudo ln -sf /opt/navpro_level1/scripts/reset_workspace.sh /usr/local/bin/reset_workspace 2>/dev/null || true
    elif [ -f "/home/student/scripts/reset_workspace.sh" ]; then
        sudo ln -sf /home/student/scripts/reset_workspace.sh /usr/local/bin/reset_workspace 2>/dev/null || true
    fi

    # Ensure rqt_graph and ros2 global wrappers exist so commands never fail with 'command not found'
    if [ ! -f "/usr/local/bin/rqt_graph" ]; then
        sudo bash -c 'cat << "EOF" > /usr/local/bin/rqt_graph
#!/bin/bash
if [ -z "$AMENT_PREFIX_PATH" ] && [ -f "/opt/ros/jazzy/setup.bash" ]; then
    source /opt/ros/jazzy/setup.bash
fi
exec /opt/ros/jazzy/bin/rqt_graph "$@"
EOF
chmod +x /usr/local/bin/rqt_graph' 2>/dev/null || true
    fi

    if [ ! -f "/usr/local/bin/ros2" ]; then
        sudo bash -c 'cat << "EOF" > /usr/local/bin/ros2
#!/bin/bash
if [ -z "$AMENT_PREFIX_PATH" ] && [ -f "/opt/ros/jazzy/setup.bash" ]; then
    source /opt/ros/jazzy/setup.bash
fi
exec /opt/ros/jazzy/bin/ros2 "$@"
EOF
chmod +x /usr/local/bin/ros2' 2>/dev/null || true
    fi

    # Launch Level 1 / Basic AMR Learning Hub web portal on port 8000
    if [ -f "/opt/navpro_level1/scripts/lms_server.py" ]; then
        echo "[Entrypoint] Starting NavPro LMS Server with Clipboard API on port 8000..."
        python3 /opt/navpro_level1/scripts/lms_server.py --port 8000 --directory /opt/navpro_level1/lms/dist &
    elif [ -d "/opt/navpro_level1/lms/dist" ]; then
        echo "[Entrypoint] Starting NavPro Web Server on port 8000..."
        python3 -m http.server 8000 --directory /opt/navpro_level1/lms/dist &
    elif [ -d "/opt/navpro_level1/web" ]; then
        echo "[Entrypoint] Starting NavPro Web Server on port 8000..."
        python3 -m http.server 8000 --directory /opt/navpro_level1/web &
    elif [ -d "/home/student/navpro_level1/lms/dist" ]; then
        echo "[Entrypoint] Starting NavPro Web Server on port 8000..."
        python3 -m http.server 8000 --directory /home/student/navpro_level1/lms/dist &
    elif [ -d "/home/student/navpro_level1/web" ]; then
        echo "[Entrypoint] Starting NavPro Web Server on port 8000..."
        python3 -m http.server 8000 --directory /home/student/navpro_level1/web &
    elif [ -d "/home/student/ros-navpro-tutorials-basic-amr/lms/dist" ]; then
        echo "[Entrypoint] Starting NavPro Web Server on port 8000..."
        python3 -m http.server 8000 --directory /home/student/ros-navpro-tutorials-basic-amr/lms/dist &
    elif [ -d "/home/student/navpro_learning_hub/level1/web" ]; then
        echo "[Entrypoint] Starting NavPro Web Server on port 8000..."
        python3 -m http.server 8000 --directory /home/student/navpro_learning_hub/level1/web &
    fi

    echo "=================================================================="
    echo "  🚀 NavPro Learning Hub Environment is Ready!"
    echo "  - Learning Web Platform:      http://localhost:8000"
    echo "  - Desktop GUI (noVNC):        http://localhost:6080/vnc.html?autoconnect=true&resize=remote (Passwordless)"
    echo "  - Web Code Editor (VS Code):  http://localhost:8443/?folder=/home/student"
    echo "  - Dedicated Web Terminal:     http://localhost:7681"
    echo "=================================================================="
fi

# Keep container alive if running as background service
if [ "$#" -gt 0 ] && [ "$1" != "bash" ]; then
    exec "$@"
else
    exec tail -f /dev/null
fi
