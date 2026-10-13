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
        chmod +x /home/student/Desktop/*.desktop 2>/dev/null || true
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

    echo "[Entrypoint] Starting in-browser VS Code editor on port 8443..."
    code-server --auth none --bind-addr 0.0.0.0:8443 /home/student/ros2_ws &

    # Symlink reset_workspace script to /usr/local/bin so it is globally available
    if [ -f "/opt/navpro_level1/scripts/reset_workspace.sh" ]; then
        sudo ln -sf /opt/navpro_level1/scripts/reset_workspace.sh /usr/local/bin/reset_workspace 2>/dev/null || true
    elif [ -f "/home/student/scripts/reset_workspace.sh" ]; then
        sudo ln -sf /home/student/scripts/reset_workspace.sh /usr/local/bin/reset_workspace 2>/dev/null || true
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
    echo "  - Web Code Editor (VS Code):  http://localhost:8443/?folder=/home/student/ros2_ws"
    echo "=================================================================="
fi

# Keep container alive if running as background service
if [ "$#" -gt 0 ] && [ "$1" != "bash" ]; then
    exec "$@"
else
    exec tail -f /dev/null
fi
