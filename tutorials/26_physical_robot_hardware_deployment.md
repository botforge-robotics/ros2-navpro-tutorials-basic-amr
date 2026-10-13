# Lesson 26: Physical Robot Hardware Deployment (Sim-to-Real)

> **Focus:** Embedded Hardware Bringup, Micro-ROS/Serial Drivers, AMCL Relocalization & Physical AMR Deployment  
> **Course Track:** NavPro Learning Hub - Level 1 (Physical Hardware Capstone)  
> **Target Environment:** Physical NavPro Mini AMR Hardware  

---

## 1. Overview & Learning Objectives

Simulation is the testing ground; physical hardware is the real world. In the physical realm, you face real motor back-EMF, wheel slippage on dusty floors, Wi-Fi latency, battery depletion, and sensor reflections.

Because ROS 2 isolates hardware drivers behind standardized interfaces (`/cmd_vel`, `/odom`, `/scan`, `/imu/data`), **the exact same navigation script you wrote for Gazebo in Lesson 25 runs on the physical robot with ZERO code changes!**

By the end of this capstone lesson, you will:
1. Understand the Sim-to-Real architectural mapping from Gazebo plugins to physical hardware drivers.
2. Establish a wireless DDS connection between your workstation PC and the onboard robot SBC (Single Board Computer).
3. Bring up the physical 2D LiDAR sensor driver on `/dev/ttyUSB0`.
4. Establish Micro-ROS / Serial communication with the ESP32 motor controller.
5. Perform **AMCL Global Relocalization** using the 2D Pose Estimate tool in RViz2.
6. Execute an autonomous multi-waypoint patrol mission on the physical NavPro robot.

---

## 2. Sim-to-Real Architecture Mapping

Notice how the software interfaces remain 100% identical:

![Sim-to-Real Hardware Deployment Architecture](../../web/assets/images/sim_to_real_pipeline.svg)

---

## 3. Step-by-Step: Hardware Bringup Procedure

### Step 3.1: Network Setup & SSH Connection
1. Power on the NavPro robot.
2. Ensure both your workstation laptop and the robot are connected to the same dedicated 5GHz Wi-Fi router.
3. Identify the robot IP address (e.g. `192.168.1.50`).
4. SSH into the robot's onboard compute:
   ```bash
   ssh navpro@192.168.1.50
   # Password: navpro
   ```
5. Ensure both your laptop and the robot share the exact same `ROS_DOMAIN_ID`:
   ```bash
   export ROS_DOMAIN_ID=1
   ```

---

### Step 3.2: Launch Physical Hardware Drivers (Onboard Robot)
On the robot SBC, launch the hardware layer:

```bash
# 1. Bring up LiDAR Driver (RPLiDAR on /dev/ttyUSB0)
ros2 launch rplidar_ros rplidar_a1_launch.py

# 2. In a second terminal, start Micro-ROS Agent connecting to ESP32 motor board:
ros2 run micro_ros_agent micro_ros_agent serial --dev /dev/ttyUSB1 -b 115200

# 3. Start Robot State Publisher:
ros2 launch navpro_description rsp.launch.py
```

---

### Step 3.3: Verify Real Hardware Streams (From Your Laptop)
On your laptop (without SSH), verify that the topics are visible across the wireless network:

```bash
# 1. Verify LiDAR points are streaming
ros2 topic hz /scan
# Average rate: 10.02 Hz

# 2. Verify physical wheel odometry
ros2 topic echo /odom --once

# 3. Perform a low-speed teleop safety test (0.1 m/s)
ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.1}, angular: {z: 0.0}}"
```

---

## 4. AMCL Relocalization on the Physical Floor

1. On your laptop, launch the navigation stack with the facility map:
   ```bash
   ros2 launch navpro_navigation navigation.launch.py map:=/path/to/warehouse_map.yaml
   ```
2. Open RViz2 on your laptop.
3. Click the **2D Pose Estimate** button in the top toolbar.
4. Click and drag on the map at the robot's approximate physical location on the floor.
5. In RViz2, observe the green Particle Cloud (`/particlecloud`).
6. Drive the robot forward and turn slightly using teleop: as LiDAR beams hit the real walls, the particle cloud will snap together tightly, indicating high localization confidence!

---

## 5. Executing Autonomous Missions on Real Hardware

With the physical robot localized, run your autonomous patrol script from Lesson 25:

```bash
ros2 run navpro_navigation task_multi_waypoint_patrol
```

Watch the physical NavPro robot navigate around real warehouse racks, dodge unexpected obstacles, and autonomously return to the charging station!

---

## 6. Graduation & Course Completion

Congratulations! You have completed the **NavPro Level 1 Course**: from raw DDS communications and OOP Python nodes to kinematics, 3D modeling, Gazebo physics simulation, sensor fusion, 2D SLAM, Nav2 path planning, and physical hardware deployment.

You are now ready to progress to **Level 2: Enterprise Robotics Architect & AI Agent Integration**!

Please take a moment to submit your thoughts, star rating, and favorite modules in the **Workshop Experience & Student Feedback Form** below. Your feedback goes directly to your instructor to help enhance upcoming robotics courses!
