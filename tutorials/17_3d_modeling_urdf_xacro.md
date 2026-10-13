# Lesson 17: 3D Robot Modeling with URDF & Xacro

> **Focus:** Kinematic Tree Modeling, XML Macros (Xacro), Inertia Tensors & Visual/Collision Geometry  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Before a robot can navigate, plan paths, or simulate physics in Gazebo, ROS 2 must understand its physical structure: chassis dimensions, wheel locations, center of mass, sensor mount positions, and joint limits.

This kinematic and physical representation is defined using **URDF (Unified Robot Description Format)** and **Xacro (XML Macros)**.

By the end of this lesson, you will:
1. Understand the hierarchy of Links and Joints in a differential drive robot.
2. Differentiate between Visual, Collision, and Inertial geometry tags.
3. Calculate physical 3D Inertia Tensors ($I_{xx}, I_{yy}, I_{zz}$) for boxes, cylinders, and spheres.
4. Use Xacro macros (`<xacro:macro>`) and properties (`<xacro:property>`) to eliminate code duplication.
5. Convert Xacro files to clean URDF strings at launch time using the `xacro` command substitution.

---

## 2. URDF Anatomy: Links vs. Joints

A robot model is represented as a directed acyclic tree of **Links** connected by **Joints**:

![URDF Kinematic Tree and Joint Hierarchy](../../web/assets/images/urdf_kinematic_tree.svg)

* **Links:** The physical rigid bodies of the robot (chassis, wheels, lidar).
* **Joints:** The kinematic relationships between parent and child links:
  * `fixed`: No motion allowed (e.g., lidar mounted to chassis).
  * `continuous`: Continuous 360-degree rotation (e.g., differential drive wheels).
  * `revolute`: Limited angular rotation with lower/upper limits (e.g., robotic arm joints).
  * `prismatic`: Linear sliding motion along an axis (e.g., forklift mast).

---

## 3. Link Definition: Visual, Collision, and Inertial

Every physical link must contain three sub-elements:

```xml
<link name="base_link">
  <!-- 1. Visual: What the operator sees in RViz (mesh or basic shape) -->
  <visual>
    <origin xyz="0 0 0.07" rpy="0 0 0" />
    <geometry>
      <box size="0.40 0.30 0.14" />
    </geometry>
    <material name="cyan"><color rgba="0.0 0.75 0.9 1.0" /></material>
  </visual>

  <!-- 2. Collision: Simplified geometry used by ODE physics engine for contact checks -->
  <collision>
    <origin xyz="0 0 0.07" rpy="0 0 0" />
    <geometry>
      <box size="0.40 0.30 0.14" />
    </geometry>
  </collision>

  <!-- 3. Inertial: Mass and moment of inertia for realistic dynamics in Gazebo -->
  <inertial>
    <origin xyz="0 0 0.07" rpy="0 0 0" />
    <mass value="8.0" />
    <inertia ixx="0.073" ixy="0" ixz="0" iyy="0.120" iyz="0" izz="0.167" />
  </inertial>
</link>
```

> [!IMPORTANT]
> **Keep Collision Geometry Simple:** Never use high-poly visual CAD meshes for `<collision>`. Use primitive shapes (`box`, `cylinder`, `sphere`) to keep Gazebo physics calculations running at 1000 Hz real-time factor!

---

## 4. Inertia Tensor Mathematics

Gazebo physics simulators require the 3x3 Moment of Inertia Matrix:
$$\mathbf{I} = \begin{bmatrix} I_{xx} & I_{xy} & I_{xz} \\ I_{yx} & I_{yy} & I_{yz} \\ I_{zx} & I_{zy} & I_{zz} \end{bmatrix}$$

For symmetrical bodies, cross products ($I_{xy}, I_{xz}, I_{yz}$) are zero:
* **Solid Box (mass $m$, width $w$, height $h$, depth $d$):**
  $$I_{xx} = \frac{m}{12}(h^2 + d^2), \quad I_{yy} = \frac{m}{12}(w^2 + d^2), \quad I_{zz} = \frac{m}{12}(w^2 + h^2)$$
* **Solid Cylinder (mass $m$, radius $r$, length $h$ along Z):**
  $$I_{xx} = I_{yy} = \frac{m}{12}(3r^2 + h^2), \quad I_{zz} = \frac{m}{2}r^2$$
* **Solid Sphere (mass $m$, radius $r$):**
  $$I_{xx} = I_{yy} = I_{zz} = \frac{2}{5}m r^2$$

In Xacro, we encapsulate these formulas into reusable macros:
```xml
<xacro:macro name="cylinder_inertia" params="m r h">
  <inertial>
    <mass value="${m}" />
    <inertia ixx="${(m/12)*(3*r*r + h*h)}" ixy="0" ixz="0"
             iyy="${(m/12)*(3*r*r + h*h)}" iyz="0"
             izz="${(m/2)*(r*r)}" />
  </inertial>
</xacro:macro>
```

---

## 5. Converting Xacro at Runtime in Launch Files

Instead of generating static `.urdf` files on disk, ROS 2 processes Xacro dynamically inside `rsp.launch.py`:

```python
from launch.substitutions import Command
from launch_ros.parameter_descriptions import ParameterValue

robot_description_content = ParameterValue(
    Command(['xacro ', xacro_file_path]),
    value_type=str
)

robot_state_publisher_node = Node(
    package='robot_state_publisher',
    executable='robot_state_publisher',
    parameters=[{'robot_description': robot_description_content}]
)
```

---

## 6. Hands-on Student Challenge

**Task:**
1. Open [`navpro_robot.urdf.xacro`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_description/urdf/navpro_robot.urdf.xacro).
2. Inspect the wheel joint definitions: verify that the axis of rotation for continuous joints is set to `<axis xyz="0 1 0"/>` (rotating around the Y-axis).
3. Test processing the Xacro file directly from terminal:
   ```bash
   xacro $(ros2 pkg prefix --share navpro_description)/urdf/navpro_robot.urdf.xacro > /tmp/test_robot.urdf
   check_urdf /tmp/test_robot.urdf
   ```
4. Verify that `check_urdf` outputs: `robot name is: navpro_mini` with 0 syntax errors!
