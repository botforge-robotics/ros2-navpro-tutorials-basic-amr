# Lesson 22: Nav2 Stack Architecture & Costmap 2D Configuration

> **Focus:** Navigation2 Server Architecture, Costmap 2D Layers, Inflation Math & Safety Buffers  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Now that we have a static map and filtered odometry, we introduce **Nav2 (Navigation 2)**—the production-grade autonomous path planning and execution system for mobile robots.

Nav2 does not rely on a monolithic node; it employs a modular, server-based architecture orchestrated by **Behavior Trees**.

By the end of this lesson, you will:
1. Understand the core Nav2 architecture: Planner Server, Controller Server, BT Navigator, and Behavior Server.
2. Master **Costmap 2D**: how robots model navigable and non-navigable space.
3. Configure the three standard Costmap layers: **Static Layer**, **Obstacle Layer**, and **Inflation Layer**.
4. Understand the mathematical formula governing obstacle inflation and safety zones.
5. Define robot footprints to prevent clipping corners in narrow warehouse aisles.

---

## 2. The Nav2 Server Architecture

![Nav2 Server Architecture](../assets/images/nav2_server_architecture.svg)

---

## 3. Costmap 2D: Layered Representation

A Costmap represents space as an occupancy grid where each cell is assigned a cost between `0` (Completely Free) and `254` (Lethal Obstacle):

![Nav2 Costmap 2D Inflation Layers](../assets/images/costmap_inflation_layers.svg)

---

## 4. Inflation Layer Mathematics: The Safety Buffer

The **Inflation Layer** prevents robots from skimming too close to walls. It assigns costs according to distance from the nearest lethal obstacle:

$$\text{cost} = \exp\left(-\text{cost\_scaling\_factor} \times (\text{distance} - \text{robot\_radius})\right) \times 253$$

* `robot_radius`: Radius of the circular robot footprint (e.g. `0.25m`).
* `inflation_radius`: Outer boundary of the safety zone (e.g. `0.55m`). Outside this distance, cost is `0`.
* `cost_scaling_factor`: Exponential decay rate (e.g. `3.0`). Higher values drop the cost faster, encouraging paths closer to obstacles. Lower values force the robot to stay strictly centered in aisles.

---

## 5. Global vs. Local Costmap Configuration

Open [`config/nav2_params.yaml`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_navigation/config/nav2_params.yaml):

### 5.1 Global Costmap:
Used by the Global Planner to compute complete long-range paths across the whole building:
```yaml
global_costmap:
  global_costmap:
    ros__parameters:
      global_frame: map
      robot_base_frame: base_footprint
      robot_radius: 0.25
      resolution: 0.05
      track_unknown_space: true
      plugins: ["static_layer", "obstacle_layer", "inflation_layer"]
```

### 5.2 Local Costmap:
A small, high-frequency **rolling window** (e.g. 3m x 3m centered on the robot) used by the local controller to dodge walking humans and moving forklifts:
```yaml
local_costmap:
  local_costmap:
    ros__parameters:
      global_frame: odom
      robot_base_frame: base_footprint
      rolling_window: true    # Moves with the robot!
      width: 3
      height: 3
      resolution: 0.05
      plugins: ["obstacle_layer", "inflation_layer"]
```

---

## 6. Hands-on Student Challenge

**Task:**
1. Open [`nav2_params.yaml`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_navigation/config/nav2_params.yaml).
2. Locate `local_costmap -> inflation_layer -> cost_scaling_factor`.
3. Change `cost_scaling_factor` from `3.0` to `5.0`.
4. Observe in RViz2 how the cost gradient bands around obstacles become narrower, allowing the AMR to pass through tighter doorways!
