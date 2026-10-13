# Lesson 21: 2D LiDAR SLAM Mapping with SLAM Toolbox

> **Focus:** 2D Occupancy Grid Mapping, Pose Graph Optimization, Loop Closure & Map Serialization  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Before an autonomous mobile robot can plan collision-free paths, it requires a topological model of its operating space. **SLAM (Simultaneous Localization and Mapping)** solves the "chicken-or-egg" problem: the robot must construct a map while simultaneously using that partial map to estimate its own position.

In ROS 2, **SLAM Toolbox** is the industry-standard mapping engine, replacing legacy ROS 1 Gmapping and Cartographer.

By the end of this lesson, you will:
1. Understand the core principles of Graph-Based LiDAR SLAM: scan matching, pose graphs, and loop closures.
2. Configure `slam_toolbox.yaml` for online asynchronous mapping.
3. Drive the simulated NavPro robot to map a 10m x 10m warehouse environment.
4. Trigger a **Loop Closure** to mathematically eliminate accumulated odometry drift.
5. Export and serialize the generated map into `.yaml` and `.pgm` assets using `nav2_map_server`.

---

## 2. Graph SLAM Architecture

![Graph SLAM Architecture & Loop Closure](../assets/images/graph_slam_pipeline.svg)

* **Front-End (Scan Matcher):** Correlates incoming LiDAR beams with previous scans to compute local incremental movements.
* **Back-End (Graph Optimizer):** Builds a network of historical robot poses. When the robot re-enters a previously visited location (**Loop Closure**), a Ceres non-linear solver distributes error across the graph to snap the map straight.

---

## 3. Deep Dive: `config/slam_toolbox.yaml`

Open [`config/slam_toolbox.yaml`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_navigation/config/slam_toolbox.yaml):

```yaml
slam_toolbox:
  ros__parameters:
    # Solver Parameters
    solver_plugin: solver_plugins::CeresSolver
    ceres_linear_solver: SPARSE_NORMAL_CHOLESKY
    
    # Coordinate Frames
    odom_frame: odom
    map_frame: map
    base_frame: base_footprint
    scan_topic: /scan
    mode: mapping

    # Map Resolution & Range
    resolution: 0.05                  # 5 centimeters per pixel
    max_laser_range: 12.0             # Discard LiDAR reflections beyond 12m
    minimum_time_interval: 0.2        # Don't add nodes faster than 5 Hz
    minimum_travel_distance: 0.2      # Add new pose graph node every 20cm
    minimum_travel_heading: 0.2       # Add new pose graph node every ~11 degrees

    # Loop Closure Tuning
    do_loop_closing: true             # Enable automatic loop closure
    loop_search_maximum_distance: 3.0 # Search within 3.0m radius for known features
    loop_match_minimum_chain_size: 10
```

---

## 4. Step-by-Step Mapping Workflow

### Step 4.1: Launch Simulation
Terminal 1:
```bash
ros2 launch navpro_gazebo sim_world.launch.py
```

### Step 4.2: Launch SLAM Toolbox
Terminal 2:
```bash
ros2 launch navpro_navigation slam.launch.py
```
*RViz2 will open, showing the initial 2D occupancy grid growing in real time.*

### Step 4.3: Drive the Robot
Terminal 3:
```bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard
```
*Drive the robot slowly (0.2 m/s) through all warehouse aisles. Ensure you complete full loops back to the starting point to trigger loop closures!*

---

## 5. Saving the Map

Once all warehouse walls and obstacles are sharply defined, serialize the map:

```bash
mkdir -p ~/ros2_ws/src/navpro_navigation/maps
cd ~/ros2_ws/src/navpro_navigation/maps

# Save map as warehouse_map.yaml and warehouse_map.pgm
ros2 run nav2_map_server map_saver_cli -f warehouse_map
```

### 5.1 Understanding the Map Output Files:
1. **`warehouse_map.pgm`:** A Portable Graymap image where each pixel represents a cell:
   - Pixel value `254` (White): Free navigable space.
   - Pixel value `0` (Black): Occupied obstacle (wall, rack).
   - Pixel value `205` (Gray): Unknown unexplored space.
2. **`warehouse_map.yaml`:**
   ```yaml
   image: warehouse_map.pgm
   resolution: 0.050000        # 0.05 meters (5cm) per pixel
   origin: [-5.0, -5.0, 0.0]   # Lower-left corner coordinates (x, y, yaw) in world frame
   negate: 0
   occupied_thresh: 0.65
   free_thresh: 0.196
   ```

---

## 6. Hands-on Student Challenge

**Task:**
1. Open the saved `warehouse_map.pgm` in an image viewer.
2. Verify that straight walls in Gazebo appear as crisp, non-blurred straight lines in the map.
3. If walls appear doubled or curved, review Section 3: reduce `resolution` or drive the robot more smoothly to allow the scan matcher to converge!
