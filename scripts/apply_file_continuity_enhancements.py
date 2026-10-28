import json

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    data = json.load(f)

for l in data['lessons']:
    num = l.get('num', l.get('id'))
    html = l['html_content']

    if num == 14:
        old_lidar = '''<p>
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
</div>'''

        new_lidar = '''<p>
  Create the modular 2D LiDAR sub-xacro file: <code class="inline-code">~/ros2_ws/src/nexus_amr_description/urdf/lidar.xacro</code>. The LiDAR scanner link <code class="inline-code">laser_frame</code> is mounted at <code class="inline-code">xyz="0.08 0 0.16"</code> atop the chassis:
</p>

<div class="code-container" data-language="xml">
<div class="code-header"><span class="code-lang-tag">xml (lidar.xacro)</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-xml">&lt;?xml version="1.0"?&gt;
&lt;robot xmlns:xacro="http://www.ros.org/wiki/xacro"&gt;

  &lt;link name="laser_frame"&gt;
    &lt;visual&gt;
      &lt;origin xyz="0 0 0" rpy="0 0 0" /&gt;
      &lt;geometry&gt;&lt;cylinder radius="0.04" length="0.04" /&gt;&lt;/geometry&gt;
      &lt;material name="orange" /&gt;
    &lt;/visual&gt;
    &lt;collision&gt;
      &lt;origin xyz="0 0 0" rpy="0 0 0" /&gt;
      &lt;geometry&gt;&lt;cylinder radius="0.04" length="0.04" /&gt;&lt;/geometry&gt;
    &lt;/collision&gt;
    &lt;xacro:cylinder_inertia m="0.15" r="0.04" h="0.04" /&gt;
  &lt;/link&gt;

  &lt;joint name="laser_joint" type="fixed"&gt;
    &lt;parent link="base_link" /&gt;
    &lt;child link="laser_frame" /&gt;
    &lt;origin xyz="0.08 0 0.16" rpy="0 0 0" /&gt;
  &lt;/joint&gt;

&lt;/robot&gt;
</code></pre>
</div>'''
        if old_lidar in html:
            html = html.replace(old_lidar, new_lidar)
            print("Updated Lesson 14 lidar.xacro file creation instructions!")

    elif num == 16:
        old_l16_lidar = '<p>Open <code class="inline-code">urdf/lidar.xacro</code>:</p>'
        new_l16_lidar = '<p>Open the existing LiDAR sensor file created in Lesson 14: <code class="inline-code">~/ros2_ws/src/nexus_amr_description/urdf/lidar.xacro</code> and add the Gazebo ray sensor plugin before the closing <code class="inline-code">&lt;/robot&gt;</code> tag:</p>'
        if old_l16_lidar in html:
            html = html.replace(old_l16_lidar, new_l16_lidar)
            print("Updated Lesson 16 lidar.xacro continuity instruction!")

        old_l16_cam = '<p>To provide visual perception for obstacle classification and AI vision workloads, our AMR mounts a forward-facing RGB depth camera.'
        new_l16_cam = '<p>To provide visual perception for obstacle classification and AI vision workloads, open the existing camera sensor file authored in Lesson 14: <code class="inline-code">~/ros2_ws/src/nexus_amr_description/urdf/camera.xacro</code> and append the Gazebo camera sensor plugin before the closing <code class="inline-code">&lt;/robot&gt;</code> tag:'
        if old_l16_cam in html:
            html = html.replace(old_l16_cam, new_l16_cam)
            print("Updated Lesson 16 camera.xacro continuity instruction!")

    elif num == 17:
        old_l17_world = '<p>Open <code class="inline-code">worlds/warehouse_obstacle_world.world</code>:</p>'
        new_l17_world = '<p>Create your custom simulation world at <code class="inline-code">~/ros2_ws/src/nexus_amr_gazebo/worlds/warehouse_obstacle_world.world</code> (or open it to add boundary walls and obstacle models):</p>'
        if old_l17_world in html:
            html = html.replace(old_l17_world, new_l17_world)
            print("Updated Lesson 17 warehouse_obstacle_world.world creation instruction!")

    l['html_content'] = html

with open(json_path, 'w') as f:
    json.dump(data, f, indent=2)

print("Done updating file creation & continuity instructions!")
