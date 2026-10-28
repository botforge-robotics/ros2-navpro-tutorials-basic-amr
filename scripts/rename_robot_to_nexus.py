import os
import json
import re

ROOT_DIR = "/home/chaitu/Projects/navpro_learning_hub"
REF_WS = os.path.join(ROOT_DIR, "ros2-navpro-tutorials-basic-amr/ros2_ws_reference")
LMS_DIR = os.path.join(ROOT_DIR, "ros2-navpro-tutorials-basic-amr/lms")

# ==============================================================================
# 1. RENAME & UPDATE ROS 2 CODE PACKAGES IN ros2_ws_reference
# ==============================================================================
# 1.1 Rename navpro_robot.urdf.xacro -> nexus_robot.urdf.xacro
old_urdf = os.path.join(REF_WS, "src/navpro_description/urdf/navpro_robot.urdf.xacro")
new_urdf = os.path.join(REF_WS, "src/navpro_description/urdf/nexus_robot.urdf.xacro")

if os.path.exists(old_urdf):
    os.rename(old_urdf, new_urdf)
    print("Renamed navpro_robot.urdf.xacro -> nexus_robot.urdf.xacro")

# Update nexus_robot.urdf.xacro content
if os.path.exists(new_urdf):
    with open(new_urdf, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace('name="navpro_mini"', 'name="nexus_mini"')
    c = c.replace('name="navpro_cyan"', 'name="nexus_cyan"')
    with open(new_urdf, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated nexus_robot.urdf.xacro")

# 1.2 Update rsp.launch.py
rsp_launch = os.path.join(REF_WS, "src/navpro_description/launch/rsp.launch.py")
if os.path.exists(rsp_launch):
    with open(rsp_launch, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("navpro_robot.urdf.xacro", "nexus_robot.urdf.xacro")
    with open(rsp_launch, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated rsp.launch.py")

# 1.3 Update lidar.xacro
lidar_xacro = os.path.join(REF_WS, "src/navpro_description/urdf/lidar.xacro")
if os.path.exists(lidar_xacro):
    with open(lidar_xacro, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("navpro_laser_controller", "nexus_laser_controller")
    with open(lidar_xacro, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated lidar.xacro")

# 1.4 Update camera.xacro
camera_xacro = os.path.join(REF_WS, "src/navpro_description/urdf/camera.xacro")
if os.path.exists(camera_xacro):
    with open(camera_xacro, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("navpro_camera_controller", "nexus_camera_controller")
    with open(camera_xacro, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated camera.xacro")

# 1.5 Update gazebo_plugins.xacro
plugins_xacro = os.path.join(REF_WS, "src/navpro_description/urdf/gazebo_plugins.xacro")
if os.path.exists(plugins_xacro):
    with open(plugins_xacro, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("navpro_diff_drive", "nexus_diff_drive")
    with open(plugins_xacro, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated gazebo_plugins.xacro")

# 1.6 Update sim_world.launch.py
sim_launch = os.path.join(REF_WS, "src/navpro_gazebo/launch/sim_world.launch.py")
if os.path.exists(sim_launch):
    with open(sim_launch, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("spawn_navpro_robot", "spawn_nexus_robot")
    c = c.replace("'-entity', 'navpro_mini'", "'-entity', 'nexus_mini'")
    with open(sim_launch, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated sim_world.launch.py")

# ==============================================================================
# 2. UPDATE UrdfViewer3D.jsx
# ==============================================================================
viewer_path = os.path.join(LMS_DIR, "src/components/UrdfViewer3D.jsx")
if os.path.exists(viewer_path):
    with open(viewer_path, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("NavPro Mini AMR", "Nexus AMR")
    c = c.replace("NavPro Mini", "Nexus AMR")
    c = c.replace("navpro_mini", "nexus_mini")
    with open(viewer_path, "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated UrdfViewer3D.jsx")

# ==============================================================================
# 3. UPDATE lessonsData.json (Lessons 14 through 23 ONLY)
# ==============================================================================
json_path = os.path.join(LMS_DIR, "src/data/lessonsData.json")
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Verify lessons 0-12 are preserved
with open(json_path + ".bak_l14_23", "r", encoding="utf-8") as f_bak:
    bak_data = json.load(f_bak)

for i in range(13):
    assert data["lessons"][i]["html_content"] == bak_data["lessons"][i]["html_content"], f"Lesson {i+1} mismatch!"

# Process lessons 13 through 22 (Lesson 14 through 23)
for idx in range(13, len(data["lessons"])):
    l = data["lessons"][idx]
    c = l["html_content"]

    c = c.replace("navpro_robot.urdf.xacro", "nexus_robot.urdf.xacro")
    c = c.replace("NavPro Mini AMR", "Nexus AMR")
    c = c.replace("NavPro Mini", "Nexus AMR")
    c = c.replace("navpro_mini", "nexus_mini")
    c = c.replace("navpro_cyan", "nexus_cyan")
    c = c.replace("navpro_laser_controller", "nexus_laser_controller")
    c = c.replace("navpro_camera_controller", "nexus_camera_controller")
    c = c.replace("navpro_diff_drive", "nexus_diff_drive")
    c = c.replace("spawn_navpro_robot", "spawn_nexus_robot")

    l["html_content"] = c

    # Also check focus or snapshot
    if "focus" in l:
        l["focus"] = l["focus"].replace("navpro_mini", "nexus_mini").replace("NavPro Mini", "Nexus AMR")

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Updated lessonsData.json for Lessons 14 through 23.")
