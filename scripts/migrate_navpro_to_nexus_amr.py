#!/usr/bin/env python3
import os
import sys
import shutil
import json
import re

ROOT_DIR = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr"
REF_WS = os.path.join(ROOT_DIR, "ros2_ws_reference")
LMS_DIR = os.path.join(ROOT_DIR, "lms")

print(">>> Starting Migration: Removing 'NavPro' -> 'Nexus AMR' across repository...")

# ==============================================================================
# 1. RENAME PACKAGES AND FOLDERS IN ros2_ws_reference/src
# ==============================================================================
src_dir = os.path.join(REF_WS, "src")

# 1.1 navpro_basics -> nexus_amr_basics
p_basics_old = os.path.join(src_dir, "navpro_basics")
p_basics_new = os.path.join(src_dir, "nexus_amr_basics")
if os.path.exists(p_basics_old):
    os.rename(p_basics_old, p_basics_new)
    print("Renamed package dir: navpro_basics -> nexus_amr_basics")

inner_basics_old = os.path.join(p_basics_new, "navpro_basics")
inner_basics_new = os.path.join(p_basics_new, "nexus_amr_basics")
if os.path.exists(inner_basics_old):
    os.rename(inner_basics_old, inner_basics_new)
    print("Renamed inner module: navpro_basics -> nexus_amr_basics")

res_basics_old = os.path.join(p_basics_new, "resource/navpro_basics")
res_basics_new = os.path.join(p_basics_new, "resource/nexus_amr_basics")
if os.path.exists(res_basics_old):
    os.rename(res_basics_old, res_basics_new)
    print("Renamed resource: navpro_basics -> nexus_amr_basics")

# 1.2 navpro_description -> nexus_amr_description
p_desc_old = os.path.join(src_dir, "navpro_description")
p_desc_new = os.path.join(src_dir, "nexus_amr_description")
if os.path.exists(p_desc_old):
    os.rename(p_desc_old, p_desc_new)
    print("Renamed package dir: navpro_description -> nexus_amr_description")

inner_desc_old = os.path.join(p_desc_new, "navpro_description")
inner_desc_new = os.path.join(p_desc_new, "nexus_amr_description")
if os.path.exists(inner_desc_old):
    os.rename(inner_desc_old, inner_desc_new)
    print("Renamed inner module: navpro_description -> nexus_amr_description")

res_desc_old = os.path.join(p_desc_new, "resource/navpro_description")
res_desc_new = os.path.join(p_desc_new, "resource/nexus_amr_description")
if os.path.exists(res_desc_old):
    os.rename(res_desc_old, res_desc_new)
    print("Renamed resource: navpro_description -> nexus_amr_description")

# 1.3 navpro_gazebo -> nexus_amr_gazebo
p_gaz_old = os.path.join(src_dir, "navpro_gazebo")
p_gaz_new = os.path.join(src_dir, "nexus_amr_gazebo")
if os.path.exists(p_gaz_old):
    os.rename(p_gaz_old, p_gaz_new)
    print("Renamed package dir: navpro_gazebo -> nexus_amr_gazebo")

inner_gaz_old = os.path.join(p_gaz_new, "navpro_gazebo")
inner_gaz_new = os.path.join(p_gaz_new, "nexus_amr_gazebo")
if os.path.exists(inner_gaz_old):
    os.rename(inner_gaz_old, inner_gaz_new)
    print("Renamed inner module: navpro_gazebo -> nexus_amr_gazebo")

res_gaz_old = os.path.join(p_gaz_new, "resource/navpro_gazebo")
res_gaz_new = os.path.join(p_gaz_new, "resource/nexus_amr_gazebo")
if os.path.exists(res_gaz_old):
    os.rename(res_gaz_old, res_gaz_new)
    print("Renamed resource: navpro_gazebo -> nexus_amr_gazebo")

# 1.4 navpro_interfaces -> nexus_amr_interfaces
p_ifaces_old = os.path.join(src_dir, "navpro_interfaces")
p_ifaces_new = os.path.join(src_dir, "nexus_amr_interfaces")
if os.path.exists(p_ifaces_old):
    os.rename(p_ifaces_old, p_ifaces_new)
    print("Renamed package dir: navpro_interfaces -> nexus_amr_interfaces")

# 1.5 navpro_navigation -> nexus_amr_navigation
p_nav_old = os.path.join(src_dir, "navpro_navigation")
p_nav_new = os.path.join(src_dir, "nexus_amr_navigation")
if os.path.exists(p_nav_old):
    os.rename(p_nav_old, p_nav_new)
    print("Renamed package dir: navpro_navigation -> nexus_amr_navigation")

inner_nav_old = os.path.join(p_nav_new, "navpro_navigation")
inner_nav_new = os.path.join(p_nav_new, "nexus_amr_navigation")
if os.path.exists(inner_nav_old):
    os.rename(inner_nav_old, inner_nav_new)
    print("Renamed inner module: navpro_navigation -> nexus_amr_navigation")

res_nav_old = os.path.join(p_nav_new, "resource/navpro_navigation")
res_nav_new = os.path.join(p_nav_new, "resource/nexus_amr_navigation")
if os.path.exists(res_nav_old):
    os.rename(res_nav_old, res_nav_new)
    print("Renamed resource: navpro_navigation -> nexus_amr_navigation")

# ==============================================================================
# 2. UPDATE URDF FILES IN nexus_amr_description/urdf
# ==============================================================================
urdf_dir = os.path.join(p_desc_new, "urdf")

# 2.1 Rename nexus_robot.urdf.xacro -> nexus_amr.urdf.xacro
old_robot_xacro = os.path.join(urdf_dir, "nexus_robot.urdf.xacro")
new_amr_xacro = os.path.join(urdf_dir, "nexus_amr.urdf.xacro")
if os.path.exists(old_robot_xacro):
    os.rename(old_robot_xacro, new_amr_xacro)
    print("Renamed URDF: nexus_robot.urdf.xacro -> nexus_amr.urdf.xacro")

# Remove deprecated sonar files
sonar_task = os.path.join(urdf_dir, "m03_l14_task_sonar_sensor.xacro")
sonar_sol = os.path.join(urdf_dir, "m03_l14_solution_sonar_sensor.xacro")
if os.path.exists(sonar_task):
    os.remove(sonar_task)
    print("Removed deprecated sonar task file.")
if os.path.exists(sonar_sol):
    os.remove(sonar_sol)
    print("Removed deprecated sonar solution file.")

# 2.2 Create m03_l14_task_camera_sensor.xacro (Student Challenge Starter)
camera_task = os.path.join(urdf_dir, "m03_l14_task_camera_sensor.xacro")
with open(camera_task, "w", encoding="utf-8") as f:
    f.write('''<?xml version="1.0"?>
<!--
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 14 Task
Package: nexus_amr_description
File:    m03_l14_task_camera_sensor.xacro (alias: camera.xacro)
================================================================================

MISSION TARGETS:
1. TODO 1: Define physical optical camera link <link name="camera_link"> with
           box geometry (size: 0.025m x 0.09m x 0.025m) and box_inertia macro.
2. TODO 2: Define fixed joint <joint name="camera_joint" type="fixed"> mounting
           camera_link to base_link at xyz="0.20 0.0 0.08" with rpy="0 0 0".
3. TODO 3: Define virtual optical coordinate frame <link name="camera_optical_link">
           and fixed joint <joint name="camera_optical_joint" type="fixed">
           applying the REP 103 optical rotation: rpy="-1.570796 0 -1.570796".
4. TODO 4: Define Gazebo camera sensor tag (<gazebo reference="camera_link">)
           with plugin libgazebo_ros_camera.so publishing to /camera/image_raw.
================================================================================
-->
<robot xmlns:xacro="http://www.ros.org/wiki/xacro">

  <!-- =======================================================================
  TODO 1: Physical Camera Body Link (camera_link)
  ======================================================================== -->
  <!-- TODO 1: Define <link name="camera_link"> with visual/collision box (0.025 0.09 0.025) and box_inertia. -->

  <!-- =======================================================================
  TODO 2: Mount Camera to Chassis (camera_joint)
  ======================================================================== -->
  <!-- TODO 2: Define fixed joint connecting base_link to camera_link at (0.20, 0.0, 0.08). -->

  <!-- =======================================================================
  TODO 3: REP 103 Optical Frame & Joint (camera_optical_link)
  ======================================================================== -->
  <!-- TODO 3: Define camera_optical_link and fixed joint with rpy="-1.570796 0 -1.570796". -->

  <!-- =======================================================================
  TODO 4: Gazebo Camera Sensor & Plugin Simulation Block
  ======================================================================== -->
  <!-- TODO 4: Configure Gazebo camera sensor with libgazebo_ros_camera.so plugin. -->

</robot>
''')
print("Created m03_l14_task_camera_sensor.xacro")

# 2.3 Create m03_l14_solution_camera_sensor.xacro (Student Challenge Solution)
camera_sol = os.path.join(urdf_dir, "m03_l14_solution_camera_sensor.xacro")
camera_sol_content = '''<?xml version="1.0"?>
<!--
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 14 Solution
Package: nexus_amr_description
File:    m03_l14_solution_camera_sensor.xacro
================================================================================
-->
<robot xmlns:xacro="http://www.ros.org/wiki/xacro">

  <!-- =======================================================================
  STEP 1: Physical Optical Camera Link
  ======================================================================== -->
  <link name="camera_link">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0" />
      <geometry>
        <box size="0.025 0.09 0.025" />
      </geometry>
      <material name="orange">
        <color rgba="1.0 0.45 0.0 1.0" />
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0" rpy="0 0 0" />
      <geometry>
        <box size="0.025 0.09 0.025" />
      </geometry>
    </collision>
    <xacro:box_inertia m="0.08" w="0.09" h="0.025" d="0.025" />
  </link>

  <!-- =======================================================================
  STEP 2: Mount Camera to Front Bumper of base_link
  ======================================================================== -->
  <joint name="camera_joint" type="fixed">
    <parent link="base_link" />
    <child link="camera_link" />
    <origin xyz="0.20 0.0 0.08" rpy="0 0 0" />
  </joint>

  <!-- =======================================================================
  STEP 3: ROS REP 103 Optical Standard Coordinate Frame
  Z forward (out lens), X right, Y down
  ======================================================================== -->
  <link name="camera_optical_link" />

  <joint name="camera_optical_joint" type="fixed">
    <parent link="camera_link" />
    <child link="camera_optical_link" />
    <origin xyz="0 0 0" rpy="-1.570796 0 -1.570796" />
  </joint>

  <!-- =======================================================================
  STEP 4: Gazebo Camera Sensor & Plugin Simulation Block
  ======================================================================== -->
  <gazebo reference="camera_link">
    <material>Gazebo/Orange</material>
    <sensor name="nexus_rgb_camera" type="camera">
      <pose>0 0 0 0 0 0</pose>
      <visualize>true</visualize>
      <update_rate>30.0</update_rate>
      <camera name="front_camera">
        <horizontal_fov>1.085595</horizontal_fov>
        <image>
          <width>640</width>
          <height>480</height>
          <format>R8G8B8</format>
        </image>
        <clip>
          <near>0.05</near>
          <far>8.0</far>
        </clip>
      </camera>
      <plugin name="nexus_camera_controller" filename="libgazebo_ros_camera.so">
        <ros>
          <namespace>/</namespace>
          <remapping>image_raw:=camera/image_raw</remapping>
          <remapping>camera_info:=camera/camera_info</remapping>
        </ros>
        <frame_name>camera_optical_link</frame_name>
      </plugin>
    </sensor>
  </gazebo>

</robot>
'''
with open(camera_sol, "w", encoding="utf-8") as f:
    f.write(camera_sol_content)
print("Created m03_l14_solution_camera_sensor.xacro")

# Update camera.xacro with matching clean content
camera_xacro_path = os.path.join(urdf_dir, "camera.xacro")
with open(camera_xacro_path, "w", encoding="utf-8") as f:
    f.write(camera_sol_content)
print("Updated camera.xacro")

# Update nexus_amr.urdf.xacro
if os.path.exists(new_amr_xacro):
    with open(new_amr_xacro, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace('name="nexus_mini"', 'name="nexus_amr"')
    c = c.replace('$(find navpro_description)', '$(find nexus_amr_description)')
    with open(new_amr_xacro, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated nexus_amr.urdf.xacro")

# ==============================================================================
# 3. TEXT REPLACEMENTS IN ALL REFERENCE PACKAGES & SCRIPTS
# ==============================================================================
REPLACE_PAIRS = [
    ("navpro_basics", "nexus_amr_basics"),
    ("navpro_description", "nexus_amr_description"),
    ("navpro_gazebo", "nexus_amr_gazebo"),
    ("navpro_interfaces", "nexus_amr_interfaces"),
    ("navpro_navigation", "nexus_amr_navigation"),
    ("nexus_robot.urdf.xacro", "nexus_amr.urdf.xacro"),
    ("navpro_robot.urdf.xacro", "nexus_amr.urdf.xacro"),
    ("navpro_mini", "nexus_amr"),
    ("nexus_mini", "nexus_amr"),
    ("navpro_amr", "nexus_amr"),
    ("navpro_telemetry_bag", "nexus_amr_telemetry_bag"),
    ("navpro_ws", "nexus_ws"),
    ("NavPro Academy", "Nexus AMR Academy"),
    ("NavPro Engineer", "Nexus AMR Engineer"),
    ("NavPro Learning Hub", "Nexus AMR Learning Hub"),
    ("NavPro", "Nexus AMR"),
]

def replace_in_dir(directory):
    for root, dirs, files in os.walk(directory):
        for fname in files:
            ext = os.path.splitext(fname)[1]
            if ext in ['.py', '.xml', '.txt', '.cfg', '.yaml', '.xacro', '.world', '.sh', '.json', '.jsx', '.html', '.css', '.md']:
                fpath = os.path.join(root, fname)
                try:
                    with open(fpath, "r", encoding="utf-8") as f:
                        text = f.read()
                    orig_text = text
                    for old_val, new_val in REPLACE_PAIRS:
                        text = text.replace(old_val, new_val)
                    if text != orig_text:
                        with open(fpath, "w", encoding="utf-8") as f:
                            f.write(text)
                        # print(f"  Replaced in: {fname}")
                except Exception as e:
                    print(f"  Error processing {fpath}: {e}")

print(">>> Replacing terms in ros2_ws_reference...")
replace_in_dir(REF_WS)

print(">>> Replacing terms in scripts/reset_workspace.sh...")
reset_sh = os.path.join(ROOT_DIR, "scripts/reset_workspace.sh")
if os.path.exists(reset_sh):
    with open(reset_sh, "r", encoding="utf-8") as f:
        c = f.read()
    for old_val, new_val in REPLACE_PAIRS:
        c = c.replace(old_val, new_val)
    with open(reset_sh, "w", encoding="utf-8") as f:
        f.write(c)

print(">>> Replacing terms in LMS source components...")
replace_in_dir(os.path.join(LMS_DIR, "src"))
replace_in_dir(os.path.join(LMS_DIR, "index.html"))

# ==============================================================================
# 4. UPDATE lessonsData.json WITH EXACT LESSON 14 CURRICULUM CONTENT
# ==============================================================================
json_path = os.path.join(LMS_DIR, "src/data/lessonsData.json")
with open(json_path, "r", encoding="utf-8") as f:
    lms_data = json.load(f)

# Global term replacement across all lessons
for l in lms_data["lessons"]:
    c = l["html_content"]
    for old_val, new_val in REPLACE_PAIRS:
        c = c.replace(old_val, new_val)
    l["html_content"] = c
    if "focus" in l:
        for old_val, new_val in REPLACE_PAIRS:
            l["focus"] = l["focus"].replace(old_val, new_val)
    if "snapshot" in l:
        if isinstance(l["snapshot"], str):
            for old_val, new_val in REPLACE_PAIRS:
                l["snapshot"] = l["snapshot"].replace(old_val, new_val)
        elif isinstance(l["snapshot"], list):
            new_list = []
            for item in l["snapshot"]:
                if isinstance(item, str):
                    for old_val, new_val in REPLACE_PAIRS:
                        item = item.replace(old_val, new_val)
                new_list.append(item)
            l["snapshot"] = new_list

print("Global replacement completed across all lessonsData.json.")

# Detailed update for Lesson 14 (index 13)
l14 = lms_data["lessons"][13]
content14 = l14["html_content"]

# 4.1 Update Section 2: URDF Anatomy and Architecture Specs Card
# Remove sonar references, match exact physical robot dimensions
old_specs_card_match = re.search(r'<div class="architecture-specs-card".*?</div>\s*</div>\s*</div>', content14, re.DOTALL)
new_specs_card = '''<div class="architecture-specs-card" style="margin: 1.5rem 0 2rem 0; border: 1px solid var(--border-color); border-radius: 14px; background: var(--bg-card); overflow: hidden; box-shadow: var(--shadow-sm);">
  <div style="padding: 1rem 1.6rem 1.5rem 1.6rem;">
    <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0.5rem 0 0.85rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <span>📐</span> Nexus AMR Physical Kinematic Structure &amp; Coordinate Hierarchy
    </h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #06b6d4;">base_footprint</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Ground Datum (Z = 0.0 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Zero-thickness reference plane at the floor contact patch directly beneath the axle center. Used by Nav2 for 2D footprint projection and obstacle costmap inflation.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #06b6d4;">base_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Chassis Center (Z = +0.06 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          The primary 3D structural body (40 × 30 × 14 cm, 8.0 kg). Elevated 0.06m above floor. Root parent for drive wheel continuous joints and perception sensor mounts.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #10b981;">left / right_wheel_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Actuated Drive (r = 0.06 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Dual independent drive wheels (32 cm track gauge separation, Y = ±0.16m, mass 0.8kg). Continuous revolute joints driven by motor velocity controllers for differential drive steering.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #94a3b8;">front / rear_caster_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Passive Support (r = 0.03 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Dual spherical low-friction support casters (offset at X = ±0.14m, Z = +0.03m relative to base_footprint, mass 0.3kg) maintaining 3-point static balance and preventing chassis pitching.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #f59e0b;">laser_frame</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">2D Planar LiDAR (X = +0.08 m, Z = +0.22 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Top-mounted planar LiDAR scanning 360° laser range beams on <code class="inline-code">/scan</code> at 10Hz. Crucial for SLAM Toolbox mapping (L18) and Nav2 local costmaps (L19).
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #8b5cf6;">camera_link &amp; camera_optical_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Student Challenge Sensor</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Forward-facing RGB depth camera mounted on front bumper (X = +0.20 m, Z = +0.08 m) with standard REP 103 optical transform. Authored by the student in Section 6!
        </p>
      </div>
    </div>

    <div style="background: rgba(6, 182, 212, 0.08); border-left: 4px solid #06b6d4; border-radius: 8px; padding: 0.9rem 1.25rem;">
      <h5 style="margin: 0 0 0.4rem 0; font-size: 0.92rem; font-weight: 700; color: #06b6d4; display: flex; align-items: center; gap: 0.4rem;">
        <span>🔄</span> End-to-End Curriculum Flow: How This URDF Drives the Rest of Your Course
      </h5>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-primary); line-height: 1.6;">
        The robot model you build in this lesson is <strong>not a temporary exercise</strong>&mdash;it is the foundational physical digital twin that carries across the entire robotics pipeline:
      </p>
      <ul style="margin: 0.5rem 0 0 1.25rem; padding: 0; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6;">
        <li><strong>Lesson 15 (RViz2)</strong> loads this URDF, tests <code class="inline-code">robot_state_publisher</code>, and verifies all kinematic coordinate frames.</li>
        <li><strong>Lesson 16 (Gazebo)</strong> adds physics inertia, wheel friction, and simulation plugins to this model so it drives and casts laser rays.</li>
        <li><strong>Lesson 17 &amp; 18 (Simulation &amp; SLAM)</strong> spawns this AMR into a custom warehouse world to map the building with <code class="inline-code">slam_toolbox</code>.</li>
        <li><strong>Lessons 19&ndash;21 (Nav2 Stack)</strong> uses this robot's footprint to configure safety costmaps, trajectory planners, and recovery behaviors.</li>
        <li><strong>Lesson 22 (Autonomous Mission)</strong> commands this robot to patrol the warehouse autonomously using Python Nav2 Simple Commander!</li>
      </ul>
    </div>
  </div>
</div>'''

if old_specs_card_match:
    content14 = content14[:old_specs_card_match.start()] + new_specs_card + content14[old_specs_card_match.end():]
    print("Replaced architecture specs card in Lesson 14.")

# 4.2 Update Section 3: Title and file references
content14 = content14.replace(
    '3. Step-by-Step Hands-on Build: Authoring nexus_robot.urdf.xacro',
    '3. Step-by-Step Hands-on Build: Authoring nexus_amr.urdf.xacro'
)

# 4.3 Replace Section 6 (Hands-on Student Challenge) from Sonar to Camera Sensor
s6_pos = content14.find('<h2 id="6-hands-on-student-challenge">')
if s6_pos != -1:
    new_section_6 = '''<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge: Modular Optical Camera Sensor Macro (<code>camera.xacro</code>)</h2>
<p>
  Having designed the core differential drive chassis, drive wheels, casters, and top LiDAR puck in <code class="inline-code">nexus_amr.urdf.xacro</code>, your engineering task is to build the modular optical camera sensor macro (<code class="inline-code">camera.xacro</code>) and attach it to the front bumper of the Nexus AMR.
</p>

<div class="alert alert-tip">
  <div class="alert-title">🎯 Mission Requirements</div>
  <ol>
    <li><strong>TODO 1: Physical Camera Body Link:</strong> Define <code class="inline-code">&lt;link name="camera_link"&gt;</code> with box geometry (<code class="inline-code">size="0.025 0.09 0.025"</code>), orange visual material, matching collision box, and calculate its inertia using <code class="inline-code">&lt;xacro:box_inertia m="0.08" w="0.09" h="0.025" d="0.025" /&gt;</code>.</li>
    <li><strong>TODO 2: Chassis Mount Joint:</strong> Define a fixed joint <code class="inline-code">&lt;joint name="camera_joint" type="fixed"&gt;</code> attaching <code class="inline-code">camera_link</code> to <code class="inline-code">base_link</code> positioned at the front bumper (<code class="inline-code">xyz="0.20 0.0 0.08"</code>, <code class="inline-code">rpy="0 0 0"</code>).</li>
    <li><strong>TODO 3: REP 103 Optical Standard Frame:</strong> Define virtual link <code class="inline-code">&lt;link name="camera_optical_link" /&gt;</code> and fixed joint <code class="inline-code">&lt;joint name="camera_optical_joint" type="fixed"&gt;</code> with standard optical frame rotation (<code class="inline-code">rpy="-1.570796 0 -1.570796"</code>) so computer vision algorithms (OpenCV, Isaac ROS) receive coordinates with Z forward, X right, and Y down.</li>
    <li><strong>TODO 4: Gazebo Camera Plugin:</strong> Configure Gazebo camera sensor simulation block (<code class="inline-code">&lt;gazebo reference="camera_link"&gt;</code>) activating <code class="inline-code">libgazebo_ros_camera.so</code> streaming RGB images to <code class="inline-code">/camera/image_raw</code> and calibration metadata to <code class="inline-code">/camera/camera_info</code> at 30 FPS.</li>
  </ol>
</div>

<h3 id="61-starter-template">6.1 Starter Template: <code class="inline-code">m03_l14_task_camera_sensor.xacro</code></h3>
<p>Open <code class="inline-code">~/ros2_ws_reference/src/nexus_amr_description/urdf/m03_l14_task_camera_sensor.xacro</code> or edit <code class="inline-code">~/ros2_ws/src/nexus_amr_description/urdf/camera.xacro</code> in your student workspace:</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (Starter Template)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">&lt;?xml version="1.0"?&gt;
&lt;!--
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 14 Task
Package: nexus_amr_description
File:    m03_l14_task_camera_sensor.xacro (alias: camera.xacro)
================================================================================

MISSION TARGETS:
1. TODO 1: Define physical optical camera link &lt;link name="camera_link"&gt; with
           box geometry (size: 0.025m x 0.09m x 0.025m) and box_inertia macro.
2. TODO 2: Define fixed joint &lt;joint name="camera_joint" type="fixed"&gt; mounting
           camera_link to base_link at xyz="0.20 0.0 0.08" with rpy="0 0 0".
3. TODO 3: Define virtual optical coordinate frame &lt;link name="camera_optical_link"&gt;
           and fixed joint &lt;joint name="camera_optical_joint" type="fixed"&gt;
           applying the REP 103 optical rotation: rpy="-1.570796 0 -1.570796".
4. TODO 4: Define Gazebo camera sensor tag (&lt;gazebo reference="camera_link"&gt;)
           with plugin libgazebo_ros_camera.so publishing to /camera/image_raw.
================================================================================
--&gt;
&lt;robot xmlns:xacro="http://www.ros.org/wiki/xacro"&gt;

  &lt;!-- =======================================================================
  TODO 1: Physical Camera Body Link (camera_link)
  ======================================================================== --&gt;
  &lt;!-- TODO 1: Define &lt;link name="camera_link"&gt; with visual/collision box (0.025 0.09 0.025) and box_inertia. --&gt;

  &lt;!-- =======================================================================
  TODO 2: Mount Camera to Chassis (camera_joint)
  ======================================================================== --&gt;
  &lt;!-- TODO 2: Define fixed joint connecting base_link to camera_link at (0.20, 0.0, 0.08). --&gt;

  &lt;!-- =======================================================================
  TODO 3: REP 103 Optical Frame &amp; Joint (camera_optical_link)
  ======================================================================== --&gt;
  &lt;!-- TODO 3: Define camera_optical_link and fixed joint with rpy="-1.570796 0 -1.570796". --&gt;

  &lt;!-- =======================================================================
  TODO 4: Gazebo Camera Sensor &amp; Plugin Simulation Block
  ======================================================================== --&gt;
  &lt;!-- TODO 4: Configure Gazebo camera sensor with libgazebo_ros_camera.so plugin. --&gt;

&lt;/robot&gt;
</code></pre>
</div>

<div class="alert alert-info alert-briefing">
  <div class="alert-icon">🤖</div>
  <div class="alert-content">
    <div class="alert-title">Robotics Flight Operations Mission Briefing: Nexus AMR Forward Optical Camera Integration</div>
    <div class="alert-body">
      <strong>Physical AMR Context &amp; Operational Challenge:</strong><br>
      While 2D LiDAR scans horizontally across the facility to locate structural walls and pallet stacks, it cannot perceive floor debris, overhanging table edges, or visual QR barcodes. Autonomous Mobile Robots mount front optical depth cameras to provide real-time RGB video streams and point-cloud 3D obstacle avoidance directly along their direction of travel.
      <br><br>
      <strong>Architectural Role &amp; REP 103 Optical Convention:</strong><br>
      Robotic body kinematics adhere to ROS REP 103 (+X forward, +Y left, +Z up). However, standard computer vision libraries (OpenCV, PCL, PyTorch) follow the optical camera standard (+Z along the optical boresight axis pointing forward through the lens, +X to the right, +Y pointing down across the pixel grid). We resolve this coordinate mismatch by defining a fixed zero-mass virtual frame <code class="inline-code">camera_optical_link</code> rotated by <code class="inline-code">rpy="-1.570796 0 -1.570796"</code> relative to the physical mount!
      <br><br>
      <strong>Flight Objective &amp; Behavioral Outcome:</strong><br>
      Author <code class="inline-code">camera.xacro</code>, connect it into <code class="inline-code">nexus_amr.urdf.xacro</code>, and verify with <code class="inline-code">xacro</code> and <code class="inline-code">check_urdf</code> that both <code class="inline-code">camera_link</code> and <code class="inline-code">camera_optical_link</code> appear cleanly in the kinematic robot tree.
    </div>
  </div>
</div>

<h3 id="62-verification-steps">6.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Compile and inspect your complete robot description including the camera sensor:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># 1. Expand full Xacro tree into temporary URDF XML
xacro ~/ros2_ws/src/nexus_amr_description/urdf/nexus_amr.urdf.xacro &gt; /tmp/nexus_amr.urdf

# 2. Verify kinematic tree and joint relationships
check_urdf /tmp/nexus_amr.urdf
</code></pre>
</div>

<p><em>Expected Terminal Output:</em></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text (Terminal Verification)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">robot name is: nexus_amr
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

<details class="reference-solution-dropdown">
  <summary class="solution-summary-btn">
    <span>🔍 View Reference Solution (<code class="inline-code">m03_l14_solution_camera_sensor.xacro</code>)</span>
  </summary>
  <div class="solution-body">
    <p>Reference file: <code class="inline-code">ros2_ws_reference/src/nexus_amr_description/urdf/m03_l14_solution_camera_sensor.xacro</code></p>
    <div class="code-container" data-language="xml">
      <div class="code-header"><span class="code-lang-tag">xml</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-xml">&lt;?xml version="1.0"?&gt;
&lt;!--
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 14 Solution
Package: nexus_amr_description
File:    m03_l14_solution_camera_sensor.xacro
================================================================================
--&gt;
&lt;robot xmlns:xacro="http://www.ros.org/wiki/xacro"&gt;

  &lt;!-- Step 1: Physical Camera Link --&gt;
  &lt;link name="camera_link"&gt;
    &lt;visual&gt;
      &lt;origin xyz="0 0 0" rpy="0 0 0" /&gt;
      &lt;geometry&gt;
        &lt;box size="0.025 0.09 0.025" /&gt;
      &lt;/geometry&gt;
      &lt;material name="orange"&gt;
        &lt;color rgba="1.0 0.45 0.0 1.0" /&gt;
      &lt;/material&gt;
    &lt;/visual&gt;
    &lt;collision&gt;
      &lt;origin xyz="0 0 0" rpy="0 0 0" /&gt;
      &lt;geometry&gt;
        &lt;box size="0.025 0.09 0.025" /&gt;
      &lt;/geometry&gt;
    &lt;/collision&gt;
    &lt;xacro:box_inertia m="0.08" w="0.09" h="0.025" d="0.025" /&gt;
  &lt;/link&gt;

  &lt;!-- Step 2: Mount Camera to Front Bumper of base_link --&gt;
  &lt;joint name="camera_joint" type="fixed"&gt;
    &lt;parent link="base_link" /&gt;
    &lt;child link="camera_link" /&gt;
    &lt;origin xyz="0.20 0.0 0.08" rpy="0 0 0" /&gt;
  &lt;/joint&gt;

  &lt;!-- Step 3: REP 103 Optical Standard Coordinate Frame --&gt;
  &lt;link name="camera_optical_link" /&gt;

  &lt;joint name="camera_optical_joint" type="fixed"&gt;
    &lt;parent link="camera_link" /&gt;
    &lt;child link="camera_optical_link" /&gt;
    &lt;origin xyz="0 0 0" rpy="-1.570796 0 -1.570796" /&gt;
  &lt;/joint&gt;

  &lt;!-- Step 4: Gazebo Camera Plugin --&gt;
  &lt;gazebo reference="camera_link"&gt;
    &lt;material&gt;Gazebo/Orange&lt;/material&gt;
    &lt;sensor name="nexus_rgb_camera" type="camera"&gt;
      &lt;pose&gt;0 0 0 0 0 0&lt;/pose&gt;
      &lt;visualize&gt;true&lt;/visualize&gt;
      &lt;update_rate&gt;30.0&lt;/update_rate&gt;
      &lt;camera name="front_camera"&gt;
        &lt;horizontal_fov&gt;1.085595&lt;/horizontal_fov&gt;
        &lt;image&gt;
          &lt;width&gt;640&lt;/width&gt;
          &lt;height&gt;480&lt;/height&gt;
          &lt;format&gt;R8G8B8&lt;/format&gt;
        &lt;/image&gt;
        &lt;clip&gt;
          &lt;near&gt;0.05&lt;/near&gt;
          &lt;far&gt;8.0&lt;/far&gt;
        &lt;/clip&gt;
      &lt;/camera&gt;
      &lt;plugin name="nexus_camera_controller" filename="libgazebo_ros_camera.so"&gt;
        &lt;ros&gt;
          &lt;namespace&gt;/&lt;/namespace&gt;
          &lt;remapping&gt;image_raw:=camera/image_raw&lt;/remapping&gt;
          &lt;remapping&gt;camera_info:=camera/camera_info&lt;/remapping&gt;
        &lt;/ros&gt;
        &lt;frame_name&gt;camera_optical_link&lt;/frame_name&gt;
      &lt;/plugin&gt;
    &lt;/sensor&gt;
  &lt;/gazebo&gt;

&lt;/robot&gt;
</code></pre>
    </div>
  </div>
</details>

<div class="code-breakdown-card">
  <h4 class="code-breakdown-title">🔬 Core Code Deep Dive &amp; Operational Breakdown: Modular Camera Sensor Solution Breakdown</h4>
  <p class="code-breakdown-intro">Key kinematic and geometric mechanics of the RGB camera sensor macro:</p>
  <ul class="code-breakdown-list">
    <li class="code-breakdown-item"><strong>REP 103 Optical Rotation Transformation:</strong> A fixed joint rotation of <code class="inline-code">rpy="-1.570796 0 -1.570796"</code> (-90° roll around X followed by -90° yaw around Z) translates standard robot body coordinates (+X forward, +Y left, +Z up) into the optical standard (+Z out lens, +X right, +Y down), ensuring camera image pixels align perfectly with computer vision coordinates.</li>
    <li class="code-breakdown-item"><strong>Lightweight Hull Inertia:</strong> Encapsulates a small rectangular optical enclosure (0.025 × 0.09 × 0.025 m, mass 0.08 kg) calculated via <code class="inline-code">&lt;xacro:box_inertia&gt;</code>, preserving the robot's physical mass and center of gravity balance in Gazebo.</li>
    <li class="code-breakdown-item"><strong>Gazebo ROS Camera Plugin Integration:</strong> Dynamically loads <code class="inline-code">libgazebo_ros_camera.so</code>, creating simulated image streams on <code class="inline-code">/camera/image_raw</code> and calibration matrices on <code class="inline-code">/camera/camera_info</code> linked directly to <code class="inline-code">camera_optical_link</code>.</li>
  </ul>
</div>

<div class="asset-handoff-card" style="margin: 1.75rem 0 1rem 0; padding: 1.15rem 1.4rem; border-radius: 10px; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.25); border-left: 4px solid #10b981;">
  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
    <span style="font-size: 1.1rem;">📦</span>
    <strong style="font-size: 0.95rem; color: #10b981; text-transform: uppercase; letter-spacing: 0.04em;">Asset Handoff &amp; Next Lesson Pipeline Bridge</strong>
  </div>
  <p style="margin: 0 0 0.65rem 0; font-size: 0.88rem; color: var(--text-primary); line-height: 1.6;">
    You have now authored and verified the complete kinematic model of the Nexus AMR, including its modular camera sensor. This URDF file defines the exact dimensions, wheel separation, and sensor mount positions that will be visualized in RViz2 and simulated in Gazebo.
  </p>
  <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 0.82rem; font-family: var(--font-mono);">
    <span style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: 5px; color: var(--text-primary);">
      📁 <strong>Produced Artifact:</strong> <code>ros2_ws_reference/src/nexus_amr_description/urdf/nexus_amr.urdf.xacro</code>
    </span>
    <span style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: 5px; color: var(--text-primary);">
      ➡️ <strong>Ingested By:</strong> Lesson 15 (RViz2 Visualization &amp; Kinematic TF Inspection)
    </span>
  </div>
</div>
'''
    content14 = content14[:s6_pos] + new_section_6
    print("Replaced Section 6 with Camera Sensor Challenge in Lesson 14.")

l14["html_content"] = content14

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(lms_data, f, indent=2, ensure_ascii=False)

print("Saved updated lessonsData.json.")
print(">>> Migration completed successfully!")
