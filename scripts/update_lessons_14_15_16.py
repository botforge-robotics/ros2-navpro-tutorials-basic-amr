import json
import os
import re

DATA_PATH = "ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json"
BAK_PATH = "ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json.bak_l14_23"

with open(DATA_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

with open(BAK_PATH, "r", encoding="utf-8") as f_bak:
    bak_data = json.load(f_bak)
lessons = data["lessons"]

# ==============================================================================
# 1. UPDATE LESSON 14: 3D Robot Modeling with URDF & Xacro
# ==============================================================================
l14 = lessons[13]
assert l14["id"] == "lesson_14"

# Subtopics for Lesson 14
l14["subtopics"] = [
    {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
    {"id": "2-urdf-anatomy-links-vs-joints", "title": "2. URDF Anatomy: Links vs. Joints"},
    {"id": "3-step-by-step-amr-urdf-construction", "title": "3. Step-by-Step Hands-on Build: Authoring navpro_robot.urdf.xacro"},
    {"id": "4-inertia-tensor-mathematics", "title": "4. Inertia Tensor Mathematics & Interactive Tool"},
    {"id": "5-alternative-cad-workflow-fusion-360-to-urdf", "title": "5. Alternative CAD Workflow: Exporting from Autodesk Fusion 360 to ROS 2 URDF"},
    {"id": "6-hands-on-student-challenge", "title": "6. Hands-on Student Challenge: Parametric Ultrasonic Sonar Sensor Macro & AMR Integration"}
]

# Section 3 content for Lesson 14: Step-by-Step Hands-on Build
sec3_html = """<h2 id="3-step-by-step-amr-urdf-construction">3. Step-by-Step Hands-on Build: Authoring navpro_robot.urdf.xacro</h2>
<p>
  Instead of treating the robot model as a black box or relying on pre-packaged reference assets, every professional robotics engineer must understand how to construct a robot kinematic tree from the ground up. In this section, you will write the complete <code class="inline-code">navpro_robot.urdf.xacro</code> model inside your workspace step-by-step.
</p>

<div class="alert alert-info">
  <div class="alert-title">📁 Workspace File Location</div>
  <p>Create or open the robot description file in your development workspace:</p>
  <pre style="margin: 0.35rem 0 0 0; background: rgba(0,0,0,0.3); padding: 0.5rem 0.8rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem;">~/ros2_ws/src/navpro_description/urdf/navpro_robot.urdf.xacro</pre>
</div>

<h3 id="31-package-header-constants-materials">3.1 Step 1: XML Preamble, Parametric Constants &amp; Materials</h3>
<p>
  Open the file and declare the XML header, the root <code class="inline-code">&lt;robot&gt;</code> tag with the Xacro namespace (<code class="inline-code">xmlns:xacro="http://www.ros.org/wiki/xacro"</code>), and define the core physical dimensions as parametric variables.
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (navpro_robot.urdf.xacro)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">&lt;?xml version="1.0"?&gt;
&lt;robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="navpro_mini"&gt;

  &lt;!-- ========================================== --&gt;
  &lt;!-- CONSTANTS &amp; ROBOT DIMENSIONAL PROPERTIES   --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;!-- Chassis Box: 40cm length x 30cm width x 14cm height, 8kg mass --&gt;
  &lt;xacro:property name="chassis_length" value="0.40" /&gt;
  &lt;xacro:property name="chassis_width" value="0.30" /&gt;
  &lt;xacro:property name="chassis_height" value="0.14" /&gt;
  &lt;xacro:property name="chassis_mass" value="8.0" /&gt;

  &lt;!-- Actuated Drive Wheels: 6cm radius, 3.5cm width, 32cm track gauge --&gt;
  &lt;xacro:property name="wheel_radius" value="0.06" /&gt;
  &lt;xacro:property name="wheel_width" value="0.035" /&gt;
  &lt;xacro:property name="wheel_separation" value="0.32" /&gt;
  &lt;xacro:property name="wheel_mass" value="0.8" /&gt;

  &lt;!-- Passive Support Casters: 3cm radius spherical balls --&gt;
  &lt;xacro:property name="caster_radius" value="0.03" /&gt;
  &lt;xacro:property name="caster_mass" value="0.3" /&gt;

  &lt;!-- ========================================== --&gt;
  &lt;!-- MATERIAL COLOR DEFINITIONS                 --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;material name="navpro_cyan"&gt;
    &lt;color rgba="0.0 0.75 0.9 1.0" /&gt;
  &lt;/material&gt;

  &lt;material name="dark_gray"&gt;
    &lt;color rgba="0.2 0.2 0.2 1.0" /&gt;
  &lt;/material&gt;

  &lt;material name="black"&gt;
    &lt;color rgba="0.05 0.05 0.05 1.0" /&gt;
  &lt;/material&gt;

  &lt;material name="orange"&gt;
    &lt;color rgba="1.0 0.45 0.0 1.0" /&gt;
  &lt;/material&gt;
</code></pre>
</div>

<div class="alert-callout alert-tip"><div class="alert-icon"></div><div class="alert-body"><strong>Why Parametric Variables?</strong> In real robotics engineering, physical dimensions frequently change during hardware prototyping. If you change your wheel radius from 6 cm to 7 cm, updating <code class="inline-code">wheel_radius</code> once automatically propagates the change to wheel cylinder geometries, axle joint origins, and caster height offsets throughout the entire model!</div></div>

<h3 id="32-reusable-inertial-macros">3.2 Step 2: Reusable Physics Inertia Macros</h3>
<p>
  Gazebo physics engines (ODE, Bullet) require precise 3x3 inertia tensors. Writing out inertia values manually leads to typos and numerical errors that cause simulated robots to bounce or spin uncontrollably. We encapsulate primitive formulas into reusable Xacro macros:
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (navpro_robot.urdf.xacro)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">  &lt;!-- ========================================== --&gt;
  &lt;!-- REUSABLE INERTIAL MACROS                   --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;xacro:macro name="box_inertia" params="m w h d"&gt;
    &lt;inertial&gt;
      &lt;origin xyz="0 0 0" rpy="0 0 0"/&gt;
      &lt;mass value="${m}"/&gt;
      &lt;inertia ixx="${(m/12) * (h*h + d*d)}" ixy="0.0" ixz="0.0"
               iyy="${(m/12) * (w*w + d*d)}" iyz="0.0"
               izz="${(m/12) * (w*w + h*h)}"/&gt;
    &lt;/inertial&gt;
  &lt;/xacro:macro&gt;

  &lt;xacro:macro name="cylinder_inertia" params="m r h"&gt;
    &lt;inertial&gt;
      &lt;origin xyz="0 0 0" rpy="0 0 0" /&gt;
      &lt;mass value="${m}"/&gt;
      &lt;inertia ixx="${(m/12) * (3*r*r + h*h)}" ixy="0" ixz="0"
               iyy="${(m/12) * (3*r*r + h*h)}" iyz="0"
               izz="${(m/2) * (r*r)}"/&gt;
    &lt;/inertial&gt;
  &lt;/xacro:macro&gt;

  &lt;xacro:macro name="sphere_inertia" params="m r"&gt;
    &lt;inertial&gt;
      &lt;origin xyz="0 0 0" rpy="0 0 0" /&gt;
      &lt;mass value="${m}"/&gt;
      &lt;inertia ixx="${(2/5) * m * (r*r)}" ixy="0.0" ixz="0.0"
               iyy="${(2/5) * m * (r*r)}" iyz="0.0"
               izz="${(2/5) * m * (r*r)}"/&gt;
    &lt;/inertial&gt;
  &lt;/xacro:macro&gt;
</code></pre>
</div>

<h3 id="33-root-reference-link-base-footprint">3.3 Step 3: Root Reference Link (base_footprint) &amp; Chassis Offset Joint</h3>
<p>
  Every ROS 2 mobile robot must have a 2D ground projection link named <code class="inline-code">base_footprint</code>. It has no visual geometry or mass, and rests flat on the floor at $Z = 0.0 m$. We connect it to <code class="inline-code">base_link</code> via a fixed joint, elevating the chassis body by the wheel radius ($0.06 m$):
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (navpro_robot.urdf.xacro)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">  &lt;!-- ========================================== --&gt;
  &lt;!-- BASE FOOTPRINT (Ground Datum Reference)   --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;link name="base_footprint" /&gt;

  &lt;joint name="base_footprint_joint" type="fixed"&gt;
    &lt;parent link="base_footprint" /&gt;
    &lt;child link="base_link" /&gt;
    &lt;origin xyz="0 0 ${wheel_radius}" rpy="0 0 0" /&gt;
  &lt;/joint&gt;
</code></pre>
</div>

<h3 id="34-main-chassis-body-base-link">3.4 Step 4: Main Chassis Body (base_link)</h3>
<p>
  The <code class="inline-code">base_link</code> is the structural core of the robot. We define its visual box, collision geometry (identical box for contact physics), and invoke our <code class="inline-code">&lt;xacro:box_inertia&gt;</code> macro. Notice the origin is offset upward by <code class="inline-code">${chassis_height/2}</code> ($0.07 m$) so that the bottom of the chassis rests on the drive axle plane:
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (navpro_robot.urdf.xacro)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">  &lt;!-- ========================================== --&gt;
  &lt;!-- BASE LINK (Main Chassis Body)              --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;link name="base_link"&gt;
    &lt;visual&gt;
      &lt;origin xyz="0 0 ${chassis_height/2}" rpy="0 0 0" /&gt;
      &lt;geometry&gt;
        &lt;box size="${chassis_length} ${chassis_width} ${chassis_height}" /&gt;
      &lt;/geometry&gt;
      &lt;material name="navpro_cyan" /&gt;
    &lt;/visual&gt;
    &lt;collision&gt;
      &lt;origin xyz="0 0 ${chassis_height/2}" rpy="0 0 0" /&gt;
      &lt;geometry&gt;
        &lt;box size="${chassis_length} ${chassis_width} ${chassis_height}" /&gt;
      &lt;/geometry&gt;
    &lt;/collision&gt;
    &lt;xacro:box_inertia m="${chassis_mass}" w="${chassis_width}" h="${chassis_height}" d="${chassis_length}" /&gt;
  &lt;/link&gt;

  &lt;gazebo reference="base_link"&gt;
    &lt;material&gt;Gazebo/Turquoise&lt;/material&gt;
  &lt;/gazebo&gt;
</code></pre>
</div>

<h3 id="35-dual-differential-drive-wheels">3.5 Step 5: Actuated Differential Drive Wheels</h3>
<p>
  The left and right drive wheels provide propulsion and steering. They require:
</p>
<ul>
  <li><strong>Continuous Joint:</strong> Unrestricted $360^\circ$ continuous rotation without joint limits.</li>
  <li><strong>Rotation Axis:</strong> <code class="inline-code">&lt;axis xyz="0 1 0"/&gt;</code> so rotation occurs around the $Y$ (pitch/lateral) axle.</li>
  <li><strong>Cylinder Mesh Orientation:</strong> In URDF, cylinders default to lying along the $Z$ axis. Rotating by $+90^\circ$ ($1.570796 rad$) around $X$ aligns the cylinder along the $Y$ axle.</li>
  <li><strong>Friction Parameters:</strong> <code class="inline-code">&lt;mu1&gt;1.2&lt;/mu1&gt;</code> and <code class="inline-code">&lt;mu2&gt;1.2&lt;/mu2&gt;</code> provide high tire traction to prevent wheel slipping.</li>
</ul>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (navpro_robot.urdf.xacro)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">  &lt;!-- ========================================== --&gt;
  &lt;!-- LEFT DRIVE WHEEL (Port Side, +Y)           --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;link name="left_wheel_link"&gt;
    &lt;visual&gt;
      &lt;origin xyz="0 0 0" rpy="1.570796 0 0" /&gt;
      &lt;geometry&gt;
        &lt;cylinder radius="${wheel_radius}" length="${wheel_width}" /&gt;
      &lt;/geometry&gt;
      &lt;material name="black" /&gt;
    &lt;/visual&gt;
    &lt;collision&gt;
      &lt;origin xyz="0 0 0" rpy="1.570796 0 0" /&gt;
      &lt;geometry&gt;
        &lt;cylinder radius="${wheel_radius}" length="${wheel_width}" /&gt;
      &lt;/geometry&gt;
    &lt;/collision&gt;
    &lt;xacro:cylinder_inertia m="${wheel_mass}" r="${wheel_radius}" h="${wheel_width}" /&gt;
  &lt;/link&gt;

  &lt;joint name="left_wheel_joint" type="continuous"&gt;
    &lt;parent link="base_link" /&gt;
    &lt;child link="left_wheel_link" /&gt;
    &lt;origin xyz="0 ${wheel_separation/2} 0" rpy="0 0 0" /&gt;
    &lt;axis xyz="0 1 0" /&gt;
  &lt;/joint&gt;

  &lt;gazebo reference="left_wheel_link"&gt;
    &lt;material&gt;Gazebo/FlatBlack&lt;/material&gt;
    &lt;mu1&gt;1.2&lt;/mu1&gt;
    &lt;mu2&gt;1.2&lt;/mu2&gt;
  &lt;/gazebo&gt;

  &lt;!-- ========================================== --&gt;
  &lt;!-- RIGHT DRIVE WHEEL (Starboard Side, -Y)     --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;link name="right_wheel_link"&gt;
    &lt;visual&gt;
      &lt;origin xyz="0 0 0" rpy="1.570796 0 0" /&gt;
      &lt;geometry&gt;
        &lt;cylinder radius="${wheel_radius}" length="${wheel_width}" /&gt;
      &lt;/geometry&gt;
      &lt;material name="black" /&gt;
    &lt;/visual&gt;
    &lt;collision&gt;
      &lt;origin xyz="0 0 0" rpy="1.570796 0 0" /&gt;
      &lt;geometry&gt;
        &lt;cylinder radius="${wheel_radius}" length="${wheel_width}" /&gt;
      &lt;/geometry&gt;
    &lt;/collision&gt;
    &lt;xacro:cylinder_inertia m="${wheel_mass}" r="${wheel_radius}" h="${wheel_width}" /&gt;
  &lt;/link&gt;

  &lt;joint name="right_wheel_joint" type="continuous"&gt;
    &lt;parent link="base_link" /&gt;
    &lt;child link="right_wheel_link" /&gt;
    &lt;origin xyz="0 ${-wheel_separation/2} 0" rpy="0 0 0" /&gt;
    &lt;axis xyz="0 1 0" /&gt;
  &lt;/joint&gt;

  &lt;gazebo reference="right_wheel_link"&gt;
    &lt;material&gt;Gazebo/FlatBlack&lt;/material&gt;
    &lt;mu1&gt;1.2&lt;/mu1&gt;
    &lt;mu2&gt;1.2&lt;/mu2&gt;
  &lt;/gazebo&gt;
</code></pre>
</div>

<h3 id="36-passive-support-casters">3.6 Step 6: Dual Passive Support Casters</h3>
<p>
  A differential drive robot requires auxiliary contact points to prevent pitching forward or backward. We mount two passive spherical casters (front and rear). Notice the vertical offset: <code class="inline-code">${-wheel_radius + caster_radius}</code> ($ -0.06 + 0.03 = -0.03 m$) ensures the bottom of the $0.03 m$ radius ball exactly touches the floor at $Z = -0.06 m$ relative to <code class="inline-code">base_link</code>. Low friction (<code class="inline-code">&lt;mu1&gt;0.001&lt;/mu1&gt;</code>) allows frictionless multi-directional sliding:
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (navpro_robot.urdf.xacro)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">  &lt;!-- ========================================== --&gt;
  &lt;!-- FRONT CASTER (X = +0.14m)                  --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;link name="front_caster_link"&gt;
    &lt;visual&gt;
      &lt;geometry&gt;&lt;sphere radius="${caster_radius}" /&gt;&lt;/geometry&gt;
      &lt;material name="dark_gray" /&gt;
    &lt;/visual&gt;
    &lt;collision&gt;
      &lt;geometry&gt;&lt;sphere radius="${caster_radius}" /&gt;&lt;/geometry&gt;
    &lt;/collision&gt;
    &lt;xacro:sphere_inertia m="${caster_mass}" r="${caster_radius}" /&gt;
  &lt;/link&gt;

  &lt;joint name="front_caster_joint" type="fixed"&gt;
    &lt;parent link="base_link" /&gt;
    &lt;child link="front_caster_link" /&gt;
    &lt;origin xyz="0.14 0 ${-wheel_radius + caster_radius}" rpy="0 0 0" /&gt;
  &lt;/joint&gt;

  &lt;gazebo reference="front_caster_link"&gt;
    &lt;material&gt;Gazebo/Grey&lt;/material&gt;
    &lt;mu1&gt;0.001&lt;/mu1&gt;
    &lt;mu2&gt;0.001&lt;/mu2&gt;
  &lt;/gazebo&gt;

  &lt;!-- ========================================== --&gt;
  &lt;!-- REAR CASTER (X = -0.14m)                   --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;link name="rear_caster_link"&gt;
    &lt;visual&gt;
      &lt;geometry&gt;&lt;sphere radius="${caster_radius}" /&gt;&lt;/geometry&gt;
      &lt;material name="dark_gray" /&gt;
    &lt;/visual&gt;
    &lt;collision&gt;
      &lt;geometry&gt;&lt;sphere radius="${caster_radius}" /&gt;&lt;/geometry&gt;
    &lt;/collision&gt;
    &lt;xacro:sphere_inertia m="${caster_mass}" r="${caster_radius}" /&gt;
  &lt;/link&gt;

  &lt;joint name="rear_caster_joint" type="fixed"&gt;
    &lt;parent link="base_link" /&gt;
    &lt;child link="rear_caster_link" /&gt;
    &lt;origin xyz="-0.14 0 ${-wheel_radius + caster_radius}" rpy="0 0 0" /&gt;
  &lt;/joint&gt;

  &lt;gazebo reference="rear_caster_link"&gt;
    &lt;material&gt;Gazebo/Grey&lt;/material&gt;
    &lt;mu1&gt;0.001&lt;/mu1&gt;
    &lt;mu2&gt;0.001&lt;/mu2&gt;
  &lt;/gazebo&gt;
</code></pre>
</div>

<h3 id="37-sensor-mounts-lidar-and-camera">3.7 Step 7: Modular Sensor Mounts (LiDAR &amp; Camera)</h3>
<p>
  To keep your code modular, sensor definitions are organized into standalone sub-xacro files (<code class="inline-code">lidar.xacro</code> and <code class="inline-code">camera.xacro</code>). In <code class="inline-code">navpro_robot.urdf.xacro</code>, include them near the top of the file:
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (Sensor Includes)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">  &lt;!-- ========================================== --&gt;
  &lt;!-- SENSOR SUB-XACRO INCLUDES                  --&gt;
  &lt;!-- ========================================== --&gt;
  &lt;xacro:include filename="$(find navpro_description)/urdf/lidar.xacro" /&gt;
  &lt;xacro:include filename="$(find navpro_description)/urdf/camera.xacro" /&gt;
&lt;/robot&gt;
</code></pre>
</div>

<p>
  Inside <code class="inline-code">lidar.xacro</code>, the 2D LiDAR scanner link <code class="inline-code">laser_frame</code> is mounted at <code class="inline-code">xyz="0.08 0 0.16"</code> atop the chassis:
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (lidar.xacro snippet)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">&lt;link name="laser_frame"&gt;
  &lt;visual&gt;
    &lt;geometry&gt;&lt;cylinder radius="0.04" length="0.04" /&gt;&lt;/geometry&gt;
    &lt;material name="orange" /&gt;
  &lt;/visual&gt;
  &lt;collision&gt;
    &lt;geometry&gt;&lt;cylinder radius="0.04" length="0.04" /&gt;&lt;/geometry&gt;
  &lt;/collision&gt;
  &lt;xacro:cylinder_inertia m="0.15" r="0.04" h="0.04" /&gt;
&lt;/link&gt;

&lt;joint name="laser_joint" type="fixed"&gt;
  &lt;parent link="base_link" /&gt;
  &lt;child link="laser_frame" /&gt;
  &lt;origin xyz="0.08 0 0.16" rpy="0 0 0" /&gt;
&lt;/joint&gt;
</code></pre>
</div>

<h3 id="38-compiling-validating-urdf">3.8 Step 8: Compiling &amp; Kinematic Tree Validation with ROS 2 CLI</h3>
<p>
  Once you have written your URDF/Xacro files, never test them in a heavy simulator directly. Use the fast command-line validation tools:
</p>

<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># 1. Expand Xacro macros into pure URDF XML in /tmp
xacro ~/ros2_ws/src/navpro_description/urdf/navpro_robot.urdf.xacro &gt; /tmp/navpro.urdf

# 2. Check XML syntax and kinematic tree consistency
check_urdf /tmp/navpro.urdf
</code></pre>
</div>

<p><strong>Expected Terminal Output:</strong></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text (Terminal Verification)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">robot name is: navpro_mini
---------- Successfully Parsed XML ---------------
root Link: base_footprint has 1 child(ren)
    child(1):  base_link
        child(1):  front_caster_link
        child(2):  left_wheel_link
        child(3):  rear_caster_link
        child(4):  right_wheel_link
        child(5):  laser_frame
        child(6):  camera_link
            child(1):  camera_optical_link
</code></pre>
</div>

<div class="alert alert-success">
  <div class="alert-title">📊 Visualizing the Kinematic Graph as a PDF</div>
  <p>To inspect your robot tree graphically, run:</p>
  <pre style="margin: 0.35rem 0 0 0; background: rgba(0,0,0,0.3); padding: 0.5rem 0.8rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem;">urdf_to_graphiz /tmp/navpro.urdf &amp;&amp; evince navpro_mini.pdf</pre>
  <p style="margin-top: 0.35rem; font-size: 0.82rem;">This generates a clean directed acyclic tree graph showing all parent links, joints, and child frames!</p>
</div>
<hr class="divider">
"""

# Section 5 content for Lesson 14: Alternative CAD Workflow (Fusion 360)
sec5_html = """<h2 id="5-alternative-cad-workflow-fusion-360-to-urdf">5. Alternative CAD Workflow: Exporting from Autodesk Fusion 360 to ROS 2 URDF</h2>
<p>
  While writing URDF and Xacro manually (as you just did in Section 3) gives you complete, fine-grained control over kinematics, joint limits, and minimal XML structure, industrial robotics teams often employ mechanical engineers who design complex physical robot bodies in 3D CAD suites like <strong>Autodesk Fusion 360</strong>, <strong>SolidWorks</strong>, or <strong>PTC Creo</strong>.
</p>
<p>
  When working alongside mechanical teams, instead of recreating custom curved geometries manually, you can export CAD assemblies into a ROS 2 URDF package using community export tools.
</p>

<div class="alert alert-tip">
  <div class="alert-title">🔗 Official Fusion 360 to ROS 2 URDF Exporter</div>
  <p>The industry-standard open-source exporter for ROS 2 is maintained at:</p>
  <ul>
    <li><a href="https://github.com/dvalenciar/fusion2urdf-ros2" target="_blank" rel="noopener noreferrer"><strong>GitHub: dvalenciar/fusion2urdf-ros2</strong></a> (ROS 2 Humble / Jazzy compatible)</li>
    <li><a href="https://github.com/syuntoku14/fusion2urdf" target="_blank" rel="noopener noreferrer">Original Fusion2URDF by syuntoku14</a></li>
  </ul>
</div>

<h3 id="51-fusion-360-modeling-rules-for-clean-urdf-export">5.1 Fusion 360 Modeling Rules for Clean URDF Export</h3>
<p>
  If you choose to design a custom robot in Fusion 360, adhere strictly to these 5 modeling rules:
</p>
<ol>
  <li><strong>Ground the Base Link:</strong> Create a single rigid root component named <code class="inline-code">base_link</code> with its origin placed at the geometric axle center of your robot.</li>
  <li><strong>Component Hierarchy:</strong> Convert every body that moves independently into its own Fusion 360 Component (e.g., <code class="inline-code">left_wheel</code>, <code class="inline-code">right_wheel</code>, <code class="inline-code">caster_ball</code>).</li>
  <li><strong>Joint Alignment:</strong>
    <ul>
      <li>Use <strong>Revolute Joints</strong> for drive wheels and align the rotational axis with the wheel axle (+Y in ROS REP 103).</li>
      <li>Use <strong>Rigid Joints</strong> for sensors (<code class="inline-code">laser_frame</code>, <code class="inline-code">camera_link</code>).</li>
    </ul>
  </li>
  <li><strong>Coordinate Orientation (REP 103 Standard):</strong> Align your Fusion 360 root axes so that <strong>+X is forward (towards the front bumper)</strong>, <strong>+Y is to the port/left</strong>, and <strong>+Z is upward</strong>.</li>
  <li><strong>Mesh Generation &amp; Collision Decimation:</strong> The plugin automatically exports STL / DAE visual meshes into your package's <code class="inline-code">meshes/</code> directory. Always replace heavy CAD meshes in the <code class="inline-code">&lt;collision&gt;</code> tags with lightweight geometric primitives (<code class="inline-code">box</code>, <code class="inline-code">cylinder</code>) to prevent simulation slowdowns.</li>
</ol>
<hr class="divider">
"""

# Now assemble Lesson 14 html_content
content_l14 = bak_data["lessons"][13]["html_content"]
# Split by h2
sections_l14 = re.split(r'(?=<h2\s+id=)', content_l14)
# sections_l14[0] is h1 and note
# sections_l14[1] is Section 1 (Overview)
# sections_l14[2] is Section 2 (URDF Anatomy)
# sections_l14[3] was Section 3 (Link Definition) -> replace with sec3_html
# sections_l14[4] is Section 4 (Inertia Tensor Mathematics)
# sections_l14[5] was Section 5 (Converting Xacro in Launch) -> remove/merge
# sections_l14[6] was Section 5 (CAD Modeling Fusion 360) -> replace with sec5_html
# sections_l14[7] is Section 6 (Hands-on Student Challenge)

new_l14_content = sections_l14[0] + sections_l14[1] + sections_l14[2] + sec3_html + sections_l14[4] + sec5_html + sections_l14[7]
l14["html_content"] = new_l14_content
print("Lesson 14 updated successfully. Total length:", len(l14["html_content"]))

# ==============================================================================
# 2. UPDATE LESSON 15: RViz2 Visualization & Kinematic TF Inspection
# ==============================================================================
l15 = lessons[14]
assert l15["id"] == "lesson_15"

# Subtopics for Lesson 15
l15["subtopics"] = [
    {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
    {"id": "2-rviz2-vs-gazebo-the-essential-distinction", "title": "2. RViz2 vs. Gazebo: The Essential Distinction"},
    {"id": "3-the-rgb-xyz-rule", "title": "3. The RGB = XYZ Rule & Spatial Coordinate Conventions (REP 103)"},
    {"id": "4-key-rviz2-displays-plugins", "title": "4. Key RViz2 Displays & Plugins"},
    {"id": "5-the-critical-fixed-frame-rule", "title": "5. The Critical \"Fixed Frame\" Rule"},
    {"id": "6-building-the-launch-pipeline", "title": "6. Building the Launch Pipeline: rsp.launch.py & display.launch.py"},
    {"id": "7-hands-on-student-challenge", "title": "7. Hands-on Student Challenge: Interactive Kinematic Inspection & Sensor TF Broadcaster"}
]

# Section 6 content for Lesson 15: Building the Launch Pipeline
sec6_l15_html = """<h2 id="6-building-the-launch-pipeline">6. Building the Launch Pipeline: rsp.launch.py &amp; display.launch.py</h2>
<p>
  Having authored your robot model in Lesson 14, you cannot simply open RViz2 and expect the robot to appear automatically. RViz2 requires two critical runtime streams:
</p>
<ol>
  <li><strong>The Robot Model (<code class="inline-code">/robot_description</code> topic):</strong> The raw URDF XML string parsed from your Xacro file.</li>
  <li><strong>The Kinematic Transform Tree (<code class="inline-code">/tf</code> and <code class="inline-code">/tf_static</code>):</strong> Broadcast by the <code class="inline-code">robot_state_publisher</code> node from the URDF kinematics and active joint angles.</li>
</ol>
<p>
  To achieve this cleanly, professional ROS 2 systems create a modular two-stage launch pipeline:
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 1.25rem 0;">
  <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem 1.2rem;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 700; color: #06b6d4;">Stage 1: rsp.launch.py (Headless Publisher)</h4>
    <p style="margin: 0; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
      Processes <code class="inline-code">navpro_robot.urdf.xacro</code> at launch time using shell substitution and starts <code class="inline-code">robot_state_publisher</code>. Headless and reusable across simulation, SLAM, and real robot bringup.
    </p>
  </div>

  <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem 1.2rem;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 700; color: #10b981;">Stage 2: display.launch.py (Interactive Viewer)</h4>
    <p style="margin: 0; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
      Includes <code class="inline-code">rsp.launch.py</code>, launches <code class="inline-code">joint_state_publisher_gui</code> (providing GUI sliders to manually rotate wheels), and opens <code class="inline-code">rviz2</code> with a preset profile.
    </p>
  </div>
</div>

<h3 id="61-authoring-rsp-launch-py">6.1 Step 1: Writing <code class="inline-code">rsp.launch.py</code></h3>
<p>
  Create <code class="inline-code">~/ros2_ws/src/navpro_description/launch/rsp.launch.py</code>:
</p>

<div class="code-container" data-language="python">
<div class="code-header"><span class="code-lang-tag">python (rsp.launch.py)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-python">import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration, Command
from launch_ros.actions import Node
from launch_ros.parameter_descriptions import ParameterValue


def generate_launch_description():
    # 1. Resolve Xacro file path in installed share directory
    pkg_share = get_package_share_directory('navpro_description')
    xacro_file = os.path.join(pkg_share, 'urdf', 'navpro_robot.urdf.xacro')

    # 2. Declare use_sim_time argument (synchronizes TF with Gazebo clock when true)
    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Synchronize node clock with /clock published by Gazebo simulation'
    )

    # 3. Dynamic Xacro expansion via Command substitution
    # ParameterValue ensures the output string is treated as a single parameter value
    robot_description_content = ParameterValue(
        Command(['xacro ', xacro_file]),
        value_type=str
    )

    # 4. Robot State Publisher Node
    # Publishes /robot_description (latched) and broadcasts transforms on /tf
    robot_state_publisher_node = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        name='robot_state_publisher',
        output='screen',
        parameters=[{
            'robot_description': robot_description_content,
            'use_sim_time': LaunchConfiguration('use_sim_time')
        }]
    )

    return LaunchDescription([
        use_sim_time_arg,
        robot_state_publisher_node
    ])
</code></pre>
</div>

<div class="alert-callout alert-important"><div class="alert-icon"></div><div class="alert-body"><strong>Understanding <code class="inline-code">ParameterValue(Command(...))</code>:</strong> In ROS 2, launch configurations run asynchronously. Wrapping <code class="inline-code">Command(['xacro ', xacro_file])</code> inside <code class="inline-code">ParameterValue(..., value_type=str)</code> tells ROS 2 to execute the <code class="inline-code">xacro</code> executable in the background at launch time, grab its XML stdout stream, and deliver it directly to the node's <code class="inline-code">robot_description</code> parameter without generating temporary files on disk.</div></div>

<h3 id="62-authoring-display-launch-py">6.2 Step 2: Writing <code class="inline-code">display.launch.py</code></h3>
<p>
  Create <code class="inline-code">~/ros2_ws/src/navpro_description/launch/display.launch.py</code>:
</p>

<div class="code-container" data-language="python">
<div class="code-header"><span class="code-lang-tag">python (display.launch.py)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-python">import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    pkg_share = get_package_share_directory('navpro_description')
    rsp_launch_path = os.path.join(pkg_share, 'launch', 'rsp.launch.py')
    rviz_config_path = os.path.join(pkg_share, 'rviz', 'robot_model.rviz')

    use_sim_time_arg = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Use simulation (Gazebo) clock if true'
    )

    # 1. Include rsp.launch.py to compile Xacro and start robot_state_publisher
    rsp_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(rsp_launch_path),
        launch_arguments={'use_sim_time': LaunchConfiguration('use_sim_time')}.items()
    )

    # 2. Interactive Joint State Publisher GUI
    # Discovers non-fixed joints in /robot_description (left_wheel_joint, right_wheel_joint)
    # and opens a GUI window with sliders to manually publish angles to /joint_states
    joint_state_publisher_gui_node = Node(
        package='joint_state_publisher_gui',
        executable='joint_state_publisher_gui',
        name='joint_state_publisher_gui',
        output='screen'
    )

    # 3. Launch RViz2 pre-loaded with the preset display configuration
    rviz2_node = Node(
        package='rviz2',
        executable='rviz2',
        name='rviz2',
        output='screen',
        arguments=['-d', rviz_config_path]
    )

    return LaunchDescription([
        use_sim_time_arg,
        rsp_launch,
        joint_state_publisher_gui_node,
        rviz2_node
    ])
</code></pre>
</div>

<h3 id="63-configuring-saving-rviz2-profile">6.3 Step 3: Configuring &amp; Saving Your Custom RViz2 Profile</h3>
<p>
  When you open RViz2 for the first time, the display canvas is black. Follow this procedure to configure and save your permanent display profile:
</p>
<ol>
  <li>Launch the display pipeline:
    <div class="code-container" data-language="bash">
    <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
    <pre><code class="language-bash">ros2 launch navpro_description display.launch.py</code></pre>
    </div>
  </li>
  <li><strong>Set Global Fixed Frame:</strong> In the left <em>Displays</em> panel under <strong>Global Options</strong>, click <strong>Fixed Frame</strong> and select <code class="inline-code">base_footprint</code>.</li>
  <li><strong>Add Grid:</strong> Click <strong>Add</strong> at the bottom of the Displays panel, select <strong>Grid</strong>, and set Cell Size to <code class="inline-code">0.5 m</code>.</li>
  <li><strong>Add RobotModel:</strong> Click <strong>Add</strong>, select <strong>RobotModel</strong>. Expand its properties, locate <strong>Description Topic</strong>, and ensure it is set to <code class="inline-code">/robot_description</code>. Your cyan NavPro chassis and wheels will appear immediately!</li>
  <li><strong>Add TF:</strong> Click <strong>Add</strong>, select <strong>TF</strong>. Set <strong>Marker Scale</strong> to <code class="inline-code">0.3</code> to see crisp coordinate trihedrons floating at every link origin.</li>
  <li><strong>Save Configuration:</strong> Go to the RViz2 top menu: <strong>File &rarr; Save Config As</strong>, navigate to <code class="inline-code">~/ros2_ws/src/navpro_description/rviz/robot_model.rviz</code> and click <strong>Save</strong>.</li>
</ol>
<hr class="divider">
"""

# Update Lesson 15 html_content
content_l15 = bak_data["lessons"][14]["html_content"]
sections_l15 = re.split(r'(?=<h2\s+id=)', content_l15)
# sections_l15[0]: Header
# sections_l15[1]: Section 1
# sections_l15[2]: Section 2
# sections_l15[3]: Section 3 (REP 103)
# sections_l15[4]: Section 4 (Displays)
# sections_l15[5]: Section 5 (Fixed Frame)
# sections_l15[6]: Section 6 (Preset Configurations) -> replace with sec6_l15_html
# sections_l15[7]: Section 7 (Challenge)

new_l15_content = (
    sections_l15[0] +
    sections_l15[1] +
    sections_l15[2] +
    sections_l15[3] +
    sections_l15[4] +
    sections_l15[5] +
    sec6_l15_html +
    sections_l15[7]
)
l15["html_content"] = new_l15_content
print("Lesson 15 updated successfully. Total length:", len(l15["html_content"]))

# ==============================================================================
# 3. UPDATE LESSON 16: Fix Duplicate '5' in Subtopics & Content
# ==============================================================================
l16 = lessons[15]
assert l16["id"] == "lesson_16"

l16["subtopics"] = [
    {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
    {"id": "2-gazebo-architecture", "title": "2. Gazebo Architecture"},
    {"id": "3-the-differential-drive-controller-plugin", "title": "3. The Differential Drive Controller Plugin"},
    {"id": "4-the-2d-lidar-ray-sensor-plugin", "title": "4. The 2D LiDAR Ray Sensor Plugin"},
    {"id": "5-the-rgb-camera-sensor-plugin", "title": "5. The RGB Camera Sensor Plugin (libgazebo_ros_camera.so)"},
    {"id": "6-spawning-the-robot-into-gazebo", "title": "6. Spawning the Robot into Gazebo"},
    {"id": "7-execution-verification", "title": "7. Execution & Verification"},
    {"id": "8-hands-on-student-challenge", "title": "8. Hands-on Student Challenge: Differential Drive Odometer & Kinematic Tracking Validator"}
]

# Fix the duplicate 5 heading in HTML content of Lesson 16
c16 = l16["html_content"]
c16 = c16.replace('<h2 id="5-spawning-the-robot-into-gazebo">5. Spawning the Robot into Gazebo</h2>',
                  '<h2 id="6-spawning-the-robot-into-gazebo">6. Spawning the Robot into Gazebo</h2>')
c16 = c16.replace('<h2 id="6-execution-verification">6. Execution &amp; Verification</h2>',
                  '<h2 id="7-execution-verification">7. Execution &amp; Verification</h2>')
c16 = c16.replace('<h2 id="7-hands-on-student-challenge">7. Hands-on Student Challenge',
                  '<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge')

l16["html_content"] = c16
print("Lesson 16 updated successfully.")

# ==============================================================================
# 4. VERIFY LESSONS 1-13 INTEGRITY & WRITE BACK
# ==============================================================================
# Check lessons 0 through 12
with open("ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json.bak_l14_23", "r", encoding="utf-8") as f_bak:
    bak_data = json.load(f_bak)

for i in range(13):
    assert data["lessons"][i]["html_content"] == bak_data["lessons"][i]["html_content"], f"Lesson {i+1} altered!"

with open(DATA_PATH, "w", encoding="utf-8") as f_out:
    json.dump(data, f_out, indent=2, ensure_ascii=False)

print("SUCCESS: lessonsData.json written safely with verified boundaries!")
