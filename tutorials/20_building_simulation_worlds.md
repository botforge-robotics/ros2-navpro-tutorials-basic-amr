# Lesson 20: Building Custom Simulation Worlds in Gazebo

> **Focus:** SDF World Architecture, Physics Solver Tuning, Warehouse Modeling & Environment Assets  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Empty simulation worlds (an infinite flat plane with no features) are useless for testing navigation algorithms: LiDAR lasers find no objects to bounce off, and SLAM cannot extract geometric scan-matching features.

In this lesson, you will learn how to design, build, and configure rich 3D simulation environments using the **SDF (Simulation Description Format)** format.

By the end of this lesson, you will:
1. Understand the structural anatomy of an SDF `.world` file.
2. Tune the ODE physics solver (`max_step_size`, `real_time_update_rate`, `contact_surface_layer`) for stability.
3. Construct physical warehouse enclosures: outer perimeter walls, storage aisles, and charging docks.
4. Set default GUI user camera viewport coordinates to eliminate manual mouse panning at launch.
5. Load custom simulation environments dynamically using launch arguments.

---

## 2. Anatomy of an SDF World File

A `.world` file contains physics parameters, environmental lighting, and static models:

```xml
<?xml version="1.0" ?>
<sdf version="1.6">
  <world name="warehouse_obstacle_world">

    <!-- 1. Physics Engine Configuration -->
    <physics name="default_physics" default="0" type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1.0</real_time_factor>
      <real_time_update_rate>1000.0</real_time_update_rate>
    </physics>

    <!-- 2. Environmental Lighting & Floor -->
    <include><uri>model://sun</uri></include>
    <include><uri>model://ground_plane</uri></include>

    <!-- 3. Static Physical Structures (Walls & Racks) -->
    <model name="warehouse_wall_north">
      <static>true</static>
      <!-- Model definitions ... -->
    </model>

    <!-- 4. Default GUI Camera Angle -->
    <gui fullscreen='0'>
      <camera name='user_camera'>
        <pose>0.0 -7.5 7.0 0 0.8 1.57</pose>
        <view_controller>orbit</view_controller>
      </camera>
    </gui>

  </world>
</sdf>
```

---

## 3. Physics Solver Tuning for Robotics

| Parameter | Recommended Value | Purpose & Impact |
|---|---|---|
| `<type>` | `ode` | Open Dynamics Engine. Industry standard for rigid body mobile robot simulation. |
| `<max_step_size>` | `0.001` (1 millisecond) | Integration time step. Smaller values increase simulation accuracy but require more CPU. |
| `<real_time_update_rate>` | `1000.0` | Number of solver steps per wall-clock second. With step size 0.001, this yields 100% real-time speed. |
| `<sor>` | `1.3` | Successive Over-Relaxation parameter (1.0 to 1.4) to stabilize joint contact forces. |

---

## 4. Constructing Warehouse Elements

Open [`worlds/warehouse_obstacle_world.world`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_gazebo/worlds/warehouse_obstacle_world.world):

### 4.1 Boundary Walls (10m x 10m Warehouse)
Setting `<static>true</static>` tells the physics engine that the object is fixed to the world frame and cannot be moved by robot collisions:

```xml
<model name="wall_north">
  <static>true</static>
  <pose>0 5.0 1.0 0 0 0</pose>
  <link name="link">
    <collision name="collision">
      <geometry><box><size>10.2 0.2 2.0</size></box></geometry>
    </collision>
    <visual name="visual">
      <geometry><box><size>10.2 0.2 2.0</size></box></geometry>
      <material><ambient>0.7 0.7 0.7 1</ambient><diffuse>0.8 0.8 0.8 1</diffuse></material>
    </visual>
  </link>
</model>
```

### 4.2 Storage Racks & Pallet Aisles
```xml
<model name="storage_rack_a">
  <static>true</static>
  <pose>-2.5 1.8 0.75 0 0 0</pose>
  <link name="link">
    <collision name="collision">
      <geometry><box><size>3.0 0.8 1.5</size></box></geometry>
    </collision>
    <visual name="visual">
      <geometry><box><size>3.0 0.8 1.5</size></box></geometry>
      <material><ambient>0.2 0.4 0.8 1</ambient><diffuse>0.2 0.5 0.9 1</diffuse></material>
    </visual>
  </link>
</model>
```

---

## 5. Viewport Camera Positioning

You can preset the initial perspective of the Gazebo 3D camera so you don't have to reposition it every time:

```xml
<gui fullscreen='0'>
  <camera name='user_camera'>
    <!-- <pose> X Y Z Roll Pitch Yaw </pose> -->
    <pose>0.0 -7.5 7.0 0 0.8 1.57</pose>
    <view_controller>orbit</view_controller>
  </camera>
</gui>
```

---

## 6. Hands-on Student Challenge

**Task:**
1. Open [`warehouse_obstacle_world.world`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_gazebo/worlds/warehouse_obstacle_world.world).
2. Add a new cylindrical obstacle named `inspection_target_pillar` at coordinates $(x = -2.0, y = 0.0, z = 0.5)$ with radius `0.2m` and height `1.0m`.
3. Set its material color to Red (`<diffuse>1.0 0.1 0.1 1</diffuse>`).
4. Re-launch `ros2 launch navpro_gazebo sim_world.launch.py` and verify your new pillar appears in the simulation!
