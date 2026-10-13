#!/bin/bash
set -e

# Source ROS 2 system installation
source "/opt/ros/jazzy/setup.bash"

# Source workspace if compiled
if [ -f "/home/student/ros2_ws/install/setup.bash" ]; then
    source "/home/student/ros2_ws/install/setup.bash"
fi

# Launch VNC server and web services if running in daemon/service mode
if [ "$START_SERVICES" = "true" ]; then
    # Ensure hostname resolves locally to prevent TigerVNC hostname lookup failure
    sudo sh -c 'echo "127.0.0.1 $(hostname)" >> /etc/hosts' 2>/dev/null || true

    # Clean up any stale lock files from previous runs
    vncserver -kill :1 2>/dev/null || rm -rf /tmp/.X1-lock /tmp/.X11-unix/X1 2>/dev/null || true

    echo "[Entrypoint] Starting TigerVNC server on :1 (Display port 5901, Passwordless)..."
    vncserver :1 -geometry 1920x1080 -depth 24 -localhost no -SecurityTypes None

    echo "[Entrypoint] Starting noVNC web proxy on port 6080..."
    websockify --web /usr/share/novnc/ 6080 localhost:5901 &

    echo "[Entrypoint] Starting in-browser VS Code editor on port 8443..."
    code-server --auth none --bind-addr 0.0.0.0:8443 /home/student/ros2_ws &

    # Launch Level 1 / Basic AMR Learning Hub web portal on port 8000
    if [ -d "/home/student/navpro_level1/lms/dist" ]; then
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
