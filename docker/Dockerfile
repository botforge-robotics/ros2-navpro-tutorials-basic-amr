# NavPro Learning Hub - Level 1 Docker Environment
# Ubuntu 24.04 + ROS 2 Jazzy Desktop + Gazebo Sim (Harmonic) + Nav2 + noVNC (Web GUI) + code-server (Browser VS Code)
FROM osrf/ros:jazzy-desktop

ENV DEBIAN_FRONTEND=noninteractive
ENV SHELL=/bin/bash
ENV ROS_DISTRO=jazzy

# Install GUI, noVNC, web tools, Gazebo Harmonic, TurtleBot3, and Nav2 packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    python3-pip \
    python3-colcon-common-extensions \
    python3-rosdep \
    ros-jazzy-navigation2 \
    ros-jazzy-nav2-bringup \
    ros-jazzy-slam-toolbox \
    ros-jazzy-robot-state-publisher \
    ros-jazzy-joint-state-publisher \
    ros-jazzy-joint-state-publisher-gui \
    ros-jazzy-xacro \
    ros-jazzy-teleop-twist-keyboard \
    ros-jazzy-tf-transformations \
    ros-jazzy-cv-bridge \
    ros-jazzy-image-transport \
    ros-jazzy-rosbag2-storage-mcap \
    ros-jazzy-ros-gz \
    ros-jazzy-ros-gz-sim \
    ros-jazzy-ros-gz-bridge \
    ros-jazzy-ros-gz-image \
    ros-jazzy-turtlebot3 \
    ros-jazzy-turtlebot3-gazebo \
    ros-jazzy-turtlebot3-simulations \
    ros-jazzy-rqt-graph \
    ros-jazzy-rqt-image-view \
    python3-transforms3d \
    python3-numpy \
    python3-scipy \
    python3-matplotlib \
    xfce4 \
    xfce4-terminal \
    terminator \
    dbus-x11 \
    tigervnc-standalone-server \
    tigervnc-tools \
    novnc \
    websockify \
    autocutsel \
    xclip \
    supervisor \
    net-tools \
    nano \
    sudo && \
    ln -sf /usr/share/novnc/vnc.html /usr/share/novnc/index.html && \
    rm -rf /var/lib/apt/lists/*

# Install code-server and Python extension for IntelliSense
RUN curl -fsSL https://code-server.dev/install.sh | sh && \
    code-server --install-extension ms-python.python 2>/dev/null || true

# Install Python helper packages
RUN pip3 install --break-system-packages --ignore-installed --no-cache-dir \
    pytest \
    requests

# Configure student user (remove default Ubuntu 24.04 'ubuntu' user with UID 1000 first)
ARG USERNAME=student
ARG USER_UID=1000
ARG USER_GID=1000

RUN touch /var/mail/ubuntu 2>/dev/null || true && \
    userdel -r ubuntu 2>/dev/null || true && \
    groupdel ubuntu 2>/dev/null || true && \
    groupadd --gid $USER_GID $USERNAME && \
    useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/bash && \
    echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Setup VNC and desktop configuration with bidirectional clipboard sync
USER $USERNAME
WORKDIR /home/$USERNAME

RUN mkdir -p /home/$USERNAME/.vnc && \
    echo "securitytypes=None" > /home/$USERNAME/.vnc/config && \
    printf '#!/bin/bash\nunset SESSION_MANAGER\nunset DBUS_SESSION_BUS_ADDRESS\nexport XDG_CURRENT_DESKTOP=XFCE\n[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources\nvncconfig -nowin &\nautocutsel -fork\nautocutsel -selection PRIMARY -fork\nexec startxfce4\n' > /home/$USERNAME/.vnc/xstartup && \
    chmod +x /home/$USERNAME/.vnc/xstartup

# Configure baseline student environment (clean slate - student manually sources ROS 2 in Lesson 02 & 03)
RUN echo "export TURTLEBOT3_MODEL=waffle" >> /home/$USERNAME/.bashrc

# Copy entrypoint script and set up global environment
USER root
COPY docker/ros_entrypoint.sh /ros_entrypoint.sh
RUN chmod +x /ros_entrypoint.sh

USER $USERNAME
WORKDIR /home/$USERNAME

EXPOSE 8000 6080 8443

ENTRYPOINT ["/ros_entrypoint.sh"]
CMD ["bash"]
