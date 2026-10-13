# Lesson 15: RViz2 Visualization & Kinematic TF Inspection

> **Focus:** 3D Visualization Plugins, Fixed Frames, Display Configurations & Kinematic Sliders  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

**RViz2 (ROS 2 3D Visualizer)** is the primary window into the mind of your robot. Unlike a physics simulator (which simulates friction, gravity, and collisions in a simulated world), RViz2 visualizes **what the robot's onboard algorithms believe is happening** (sensor clouds, transform trees, planned paths, costmap obstacles).

By the end of this lesson, you will:
1. Understand the difference between physics simulation (Gazebo) and sensor visualization (RViz2).
2. Configure core visualization displays: Grid, RobotModel, TF, LaserScan, and Odometry.
3. Master the rule of **RGB = XYZ** coordinate axes.
4. Understand the **Fixed Frame** setting and resolve the common "No transform from [X] to [Y]" error.
5. Save, version-control, and launch custom `.rviz` configuration presets.

---

## 2. RViz2 vs. Gazebo: The Essential Distinction

| Gazebo Simulator | RViz2 Visualizer |
|---|---|
| Simulates the physical universe | Visualizes the robot's internal software state |
| Models motor torque, friction, and slip | Shows sensor telemetry (LiDAR points, images) |
| Simulates gravity and rigid-body collisions | Displays costmaps, planned paths, and TF frames |
| Answers: *"What is the ground-truth physical state?"* | Answers: *"What does the robot software stack perceive?"* |

---

## 3. The RGB = XYZ Rule

In all ROS 2 visual tools (RViz2, Gazebo, Blender), coordinate frame axes follow the universal color standard:

$$\mathbf{R} = \mathbf{X} \quad (\text{Red: Forward / Longitudinal})$$
$$\mathbf{G} = \mathbf{Y} \quad (\text{Green: Left / Lateral})$$
$$\mathbf{B} = \mathbf{Z} \quad (\text{Blue: Up / Vertical})$$

![ROS 2 RGB=XYZ Coordinate Axes](../assets/images/rviz_coordinate_axes.svg)

---

## 4. Key RViz2 Displays & Plugins

| Display Plugin | Topic / Source | Purpose |
|---|---|---|
| **Grid** | N/A | Ground plane reference grid (1m x 1m cells). |
| **RobotModel** | `/robot_description` | Renders the 3D visual geometry from URDF with joint angles. |
| **TF** | `/tf`, `/tf_static` | Displays 3D axes and frame names for all coordinate links. |
| **LaserScan** | `/scan` | Renders 2D LiDAR range points as color-coded dots. |
| **Odometry** | `/odom` | Displays robot linear velocity vectors and trajectory paths. |
| **Map** | `/map` | Renders 2D SLAM occupancy grid (White=Free, Black=Wall, Gray=Unknown). |
| **Path** | `/plan` | Renders Nav2 global planned trajectories as colored ribbons. |

---

## 5. The Critical "Fixed Frame" Rule

At the top of the RViz2 Displays panel is the **Global Options -> Fixed Frame** property:
* When inspecting a static robot model on a test bench: Set Fixed Frame to **`base_footprint`**.
* When visualizing wheel odometry: Set Fixed Frame to **`odom`**.
* When navigating inside a warehouse map: Set Fixed Frame to **`map`**.

> [!WARNING]
> **The #1 RViz2 Error: "No transform from [laser_frame] to [map]"**  
> If your Fixed Frame is set to `map`, but neither SLAM nor AMCL is currently running, RViz2 has no way to calculate the transform between `map` and `odom`. All displays will turn RED and report an error.  
> **Solution:** Change the Fixed Frame back to `odom` or `base_footprint`!

---

## 6. Launching RViz2 with Preset Configurations

Launch the pre-configured model viewer in `navpro_description`:

```bash
ros2 launch navpro_description display.launch.py
```

This launch file automatically:
1. Runs `rsp.launch.py` to parse `navpro_robot.urdf.xacro`.
2. Starts `joint_state_publisher_gui` with interactive sliders to turn the wheels.
3. Opens RViz2 pre-loaded with `rviz/robot_model.rviz`.

---

## 7. Hands-on Student Challenge

**Task:**
1. Run `ros2 launch navpro_description display.launch.py`.
2. In the `Joint State Publisher GUI` window, move the sliders for `left_wheel_joint` and `right_wheel_joint`.
3. Verify in RViz2 that the wheels rotate in real time.
4. Add the `TF` display plugin in the left panel. Check "Show Names" to see `base_footprint`, `base_link`, `laser_frame`, and `imu_link`.
