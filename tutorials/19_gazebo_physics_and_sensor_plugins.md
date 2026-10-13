# Lesson 19: Gazebo Physics Simulation & Sensor Plugins

> **Focus:** Physics Engine Simulation, Differential Drive Plugins, 2D LiDAR Ray Sensors & IMU  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Testing navigation code on physical hardware carries real risks: collision damage, battery discharge, and hardware downtime. Physics simulation in **Gazebo** allows robotics developers to test autonomous algorithms in safe, repeatable, photorealistic environments.

By the end of this lesson, you will:
1. Understand Gazebo architecture: the backend physics server (`gzserver`) vs. frontend visual renderer (`gzclient`).
2. Configure the **Gazebo Differential Drive Plugin** (`libgazebo_ros_diff_drive.so`) to translate `/cmd_vel` into simulated motor torques and wheel odometry.
3. Configure the **Gazebo 2D LiDAR Ray Sensor Plugin** (`libgazebo_ros_ray_sensor.so`) with realistic Gaussian noise.
4. Configure the **Gazebo IMU Plugin** (`libgazebo_ros_imu_sensor.so`) for orientation and acceleration data.
5. Spawn the robot into the simulation world using the `spawn_entity.py` service.

---

## 2. Gazebo Architecture

![Gazebo Simulation Pipeline Architecture](../assets/images/gazebo_sim_architecture.svg)

---

## 3. The Differential Drive Controller Plugin

Open [`urdf/gazebo_plugins.xacro`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_description/urdf/gazebo_plugins.xacro):

```xml
<gazebo>
  <plugin name="navpro_diff_drive" filename="libgazebo_ros_diff_drive.so">
    <!-- Remappings to connect with standard ROS 2 topics -->
    <ros>
      <namespace>/</namespace>
      <remapping>cmd_vel:=cmd_vel</remapping>
      <remapping>odom:=odom</remapping>
    </ros>

    <!-- Physical Wheel Joints from URDF -->
    <left_joint>left_wheel_joint</left_joint>
    <right_joint>right_wheel_joint</right_joint>

    <!-- Kinematics Constants -->
    <wheel_separation>0.32</wheel_separation>
    <wheel_diameter>0.12</wheel_diameter>

    <!-- Motor Torque Limits -->
    <max_wheel_torque>20.0</max_wheel_torque>
    <max_wheel_acceleration>1.5</max_wheel_acceleration>

    <!-- Output Topics & TF Broadcast -->
    <publish_odom>true</publish_odom>
    <publish_odom_tf>true</publish_odom_tf>
    <publish_wheel_tf>true</publish_wheel_tf>

    <odometry_frame>odom</odometry_frame>
    <robot_base_frame>base_footprint</robot_base_frame>
    <update_rate>50.0</update_rate>
  </plugin>
</gazebo>
```

### Key Parameters:
* `<wheel_separation>`: Distance between left and right wheel contact patches (0.32m). If this value is incorrect in the plugin, turning commands will produce inaccurate angular velocities.
* `<wheel_diameter>`: Diameter of the drive wheels (0.12m). Drives linear speed calculation.
* `<publish_odom_tf>`: When set to `true`, the plugin broadcasts the dynamic `odom -> base_footprint` transform automatically.

---

## 4. The 2D LiDAR Ray Sensor Plugin

Open [`urdf/lidar.xacro`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_description/urdf/lidar.xacro):

```xml
<gazebo reference="laser_frame">
  <sensor name="laser_sensor" type="ray">
    <pose>0 0 0 0 0 0</pose>
    <visualize>false</visualize>
    <update_rate>10.0</update_rate>
    <ray>
      <scan>
        <horizontal>
          <samples>360</samples>
          <resolution>1</resolution>
          <min_angle>-3.14159265</min_angle>
          <max_angle>3.14159265</max_angle>
        </horizontal>
      </scan>
      <range>
        <min>0.15</min>
        <max>12.0</max>
        <resolution>0.01</resolution>
      </range>
      <noise>
        <type>gaussian</type>
        <mean>0.0</mean>
        <stddev>0.01</stddev> <!-- 1cm simulated measurement noise -->
      </noise>
    </ray>
    <plugin name="navpro_laser_controller" filename="libgazebo_ros_ray_sensor.so">
      <ros>
        <argument>~/out:=scan</argument>
      </ros>
      <output_type>sensor_msgs/LaserScan</output_type>
      <frame_name>laser_frame</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

---

## 5. Spawning the Robot into Gazebo

In [`launch/sim_world.launch.py`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_gazebo/launch/sim_world.launch.py), the `spawn_entity.py` script queries the `/robot_description` topic and injects the model into the running physics world:

```python
spawn_robot = Node(
    package='gazebo_ros',
    executable='spawn_entity.py',
    name='spawn_navpro_robot',
    output='screen',
    arguments=[
        '-topic', 'robot_description',
        '-entity', 'navpro_mini',
        '-x', '0.0',
        '-y', '0.0',
        '-z', '0.05'
    ]
)
```

---

## 6. Execution & Verification

Launch the complete simulation:
```bash
ros2 launch navpro_gazebo sim_world.launch.py
```

In a second terminal, verify that sensor streams are active:

```bash
# 1. Check LiDAR scanning at 10 Hz
ros2 topic hz /scan

# 2. Check wheel odometry streaming at 50 Hz
ros2 topic hz /odom

# 3. Check IMU acceleration streaming at 50 Hz
ros2 topic hz /imu/data

# 4. Drive the robot forward in simulation!
ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.3}, angular: {z: 0.0}}"
```

---

## 7. Hands-on Student Challenge

**Task:**
1. Start teleoperation control:
   ```bash
   ros2 run teleop_twist_keyboard teleop_twist_keyboard
   ```
2. Drive the robot around the warehouse obstacles in Gazebo.
3. Open a second terminal and echo `/scan`. Observe how range values decrease as you approach warehouse storage racks!
