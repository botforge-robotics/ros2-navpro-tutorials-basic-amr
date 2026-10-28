#!/usr/bin/env python3
import json

json_path = './ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update lesson 14
l14 = data['lessons'][13]
assert l14['id'] == 'lesson_14'
html14 = l14['html_content']

# Replace the starter template MISSION TARGETS
old_starter_mission = """3. TODO 3: Define virtual optical coordinate frame &lt;link name="camera_optical_link"&gt;
           and fixed joint &lt;joint name="camera_optical_joint" type="fixed"&gt;
           applying the REP 103 optical rotation: rpy="-1.570796 0 -1.570796".
4. TODO 4: Define Gazebo camera sensor tag (&lt;gazebo reference="camera_link"&gt;)
           with plugin libgazebo_ros_camera.so publishing to /camera/image_raw."""

new_starter_mission = """3. TODO 3: Define Gazebo camera sensor tag (&lt;gazebo reference="camera_link"&gt;)
           with plugin libgazebo_ros_camera.so publishing to /camera/image_raw (frame_name: camera_link)."""

html14 = html14.replace(old_starter_mission, new_starter_mission)

# Replace the starter template TODO 3 and TODO 4 blocks
old_todo_block = """  &lt;!-- =======================================================================
  TODO 3: REP 103 Optical Frame &amp; Joint (camera_optical_link)
  ======================================================================== --&gt;
  &lt;!-- TODO 3: Define camera_optical_link and fixed joint with rpy="-1.570796 0 -1.570796". --&gt;

  &lt;!-- =======================================================================
  TODO 4: Gazebo Camera Sensor &amp; Plugin Simulation Block
  ======================================================================== --&gt;
  &lt;!-- TODO 4: Configure Gazebo camera sensor with libgazebo_ros_camera.so plugin. --&gt;"""

new_todo_block = """  &lt;!-- =======================================================================
  TODO 3: Gazebo Camera Sensor &amp; Plugin Simulation Block
  ======================================================================== --&gt;
  &lt;!-- TODO 3: Configure Gazebo camera sensor with libgazebo_ros_camera.so plugin (frame_name: camera_link). --&gt;"""

html14 = html14.replace(old_todo_block, new_todo_block)

l14['html_content'] = html14

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("lessonsData.json second pass completed!")
