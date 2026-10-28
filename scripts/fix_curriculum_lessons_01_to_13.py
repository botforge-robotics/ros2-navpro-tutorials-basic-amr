#!/usr/bin/env python3
"""
Comprehensive Curriculum Fix Script for Lessons 01 to 13:
Ensures seamless beginner progression, correct file paths, matching node names,
working setup.py registration guides, and 100% executable CLI commands.
"""

import json
import re

LESSONS_JSON = 'ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'

with open(LESSONS_JSON, 'r', encoding='utf-8') as f:
    data = json.load(f)

# ==============================================================================
# LESSON 01 FIXES
# ==============================================================================
l1 = [l for l in data['lessons'] if l['id'] == 'lesson_01'][0]
c1 = l1['html_content']

old_l1_run = """chmod +x ~/ros2_ws_reference/scripts/m01_l01_task_env_setup.sh
~/ros2_ws_reference/scripts/m01_l01_task_env_setup.sh"""

new_l1_run = """mkdir -p ~/ros2_ws/scripts
cp ~/ros2_ws_reference/scripts/m01_l01_task_env_setup.sh ~/ros2_ws/scripts/
chmod +x ~/ros2_ws/scripts/m01_l01_task_env_setup.sh
~/ros2_ws/scripts/m01_l01_task_env_setup.sh"""

c1 = c1.replace(old_l1_run, new_l1_run)
c1 = c1.replace('Open <code class="inline-code">~/ros2_ws_reference/scripts/m01_l01_task_env_setup.sh</code> or copy it to your student workspace <code class="inline-code">~/ros2_ws/scripts/m01_l01_task_env_setup.sh</code>:',
                'Copy the starter script to your student workspace <code class="inline-code">~/ros2_ws/scripts/</code>, grant execute permissions, and run:')

l1['html_content'] = c1
print("Updated Lesson 01.")

# ==============================================================================
# LESSON 02 FIXES
# ==============================================================================
l2 = [l for l in data['lessons'] if l['id'] == 'lesson_02'][0]
c2 = l2['html_content']

old_l2_run = """chmod +x ~/ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh
source /opt/ros/jazzy/setup.bash
~/ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh"""

new_l2_run = """mkdir -p ~/ros2_ws/scripts
cp ~/ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh ~/ros2_ws/scripts/
chmod +x ~/ros2_ws/scripts/m01_l02_task_domain_isolation.sh
source /opt/ros/jazzy/setup.bash
~/ros2_ws/scripts/m01_l02_task_domain_isolation.sh"""

c2 = c2.replace(old_l2_run, new_l2_run)
c2 = c2.replace('Open <code class="inline-code">~/ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh</code> or copy it to your student workspace <code class="inline-code">~/ros2_ws/scripts/m01_l02_task_domain_isolation.sh</code>:',
                'Copy the starter script to your student workspace <code class="inline-code">~/ros2_ws/scripts/</code>, grant execute permissions, and run:')

l2['html_content'] = c2
print("Updated Lesson 02.")

# ==============================================================================
# LESSON 04 FIXES
# ==============================================================================
l4 = [l for l in data['lessons'] if l['id'] == 'lesson_04'][0]
c4 = l4['html_content']

old_rosdep = """cd ~/ros2_ws
rosdep install --from-paths src --ignore-src -y"""

new_rosdep = """cd ~/ros2_ws
rosdep update
rosdep install --from-paths src --ignore-src -y"""

c4 = c4.replace(old_rosdep, new_rosdep)
l4['html_content'] = c4
print("Updated Lesson 04.")

# ==============================================================================
# LESSON 05 FIXES
# ==============================================================================
l5 = [l for l in data['lessons'] if l['id'] == 'lesson_05'][0]
c5 = l5['html_content']

old_l5_sec8_2 = """<h3 id="82-verification-steps--expected-terminal-output">8.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Run your node or test command and observe the output:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># Terminal 1: Launch Turtlesim Simulator
ros2 run turtlesim turtlesim_node

# Terminal 2: Run Square Controller
ros2 run nexus_amr_basics square_turtle

# Terminal 3: Introspect Command Stream
ros2 topic echo /turtle1/cmd_vel</code></pre>
</div>"""

new_l5_sec8_2 = """<h3 id="82-verification-steps--expected-terminal-output">8.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Follow these steps to copy the starter template, register the executable in your package, compile, and execute:</p>

<ol class="step-guide-list">
  <li><strong>Step 1: Copy Starter Template to Your Package:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m01_l05_06_task_turtle_square.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/</code></pre>
    </div>
  </li>
  <li><strong>Step 2: Register in setup.py:</strong>
    <p>Open <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/setup.py</code> and add the entrypoint inside <code class="inline-code">'console_scripts'</code>:</p>
    <div class="code-container" data-language="python">
      <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-python">            'square_turtle = nexus_amr_basics.m01_l05_06_task_turtle_square:main',</code></pre>
    </div>
  </li>
  <li><strong>Step 3: Compile with Symlink Install &amp; Source:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
    </div>
  </li>
  <li><strong>Step 4: Launch Simulation &amp; Test Square Patrol:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Terminal 1: Launch Turtlesim Simulator
ros2 run turtlesim turtlesim_node

# Terminal 2: Run Square Controller
ros2 run nexus_amr_basics square_turtle

# Terminal 3: Introspect Command Stream
ros2 topic echo /turtle1/cmd_vel</code></pre>
    </div>
  </li>
</ol>"""

if old_l5_sec8_2 in c5:
    c5 = c5.replace(old_l5_sec8_2, new_l5_sec8_2)
    print("Updated Lesson 05 Section 8.2.")
else:
    c5 = re.sub(r'<h3 id="82-verification-steps.*?# Terminal 2: Run Square Controller.*?ros2 topic echo /turtle1/cmd_vel</code></pre>\s*</div>',
                new_l5_sec8_2, c5, flags=re.DOTALL)
    print("Updated Lesson 05 Section 8.2 via regex.")

l5['html_content'] = c5

# ==============================================================================
# LESSON 06 FIXES
# ==============================================================================
l6 = [l for l in data['lessons'] if l['id'] == 'lesson_06'][0]
c6 = l6['html_content']

c6 = c6.replace('ros2 run nexus_amr_basics logging_node --ros-args --log-level debug',
                'ros2 run nexus_amr_basics logger_levels --ros-args --log-level debug')
c6 = c6.replace('ros2 run nexus_amr_basics logging_node --ros-args --log-level warn',
                'ros2 run nexus_amr_basics logger_levels --ros-args --log-level warn')

old_l6_sec7_2 = """<h3 id="72-verification-steps--expected-terminal-output">7.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Run your node or test command and observe the output:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># Run with all levels visible:
ros2 run nexus_amr_basics task_battery_logger

# Run filtering out INFO logs (watch only WARN, ERROR, FATAL):
ros2 run nexus_amr_basics task_battery_logger --ros-args --log-level warn</code></pre>
</div>"""

new_l6_sec7_2 = """<h3 id="72-verification-steps--expected-terminal-output">7.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Copy the starter script into your student package, register in <code class="inline-code">setup.py</code>, build, and test:</p>

<ol class="step-guide-list">
  <li><strong>Step 1: Copy Starter Script to Package:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m01_l06_03_task_battery_monitor_logger.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/</code></pre>
    </div>
  </li>
  <li><strong>Step 2: Register in setup.py:</strong>
    <p>In <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/setup.py</code>, append to <code class="inline-code">'console_scripts'</code>:</p>
    <div class="code-container" data-language="python">
      <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-python">            'task_battery_logger = nexus_amr_basics.m01_l06_03_task_battery_monitor_logger:main',</code></pre>
    </div>
  </li>
  <li><strong>Step 3: Build &amp; Source:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
    </div>
  </li>
  <li><strong>Step 4: Execute &amp; Verify Logging Thresholds:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Run with all levels visible:
ros2 run nexus_amr_basics task_battery_logger

# Run filtering out INFO logs (watch only WARN, ERROR, FATAL):
ros2 run nexus_amr_basics task_battery_logger --ros-args --log-level warn</code></pre>
    </div>
  </li>
</ol>"""

if old_l6_sec7_2 in c6:
    c6 = c6.replace(old_l6_sec7_2, new_l6_sec7_2)
    print("Updated Lesson 06 Section 7.2.")
else:
    c6 = re.sub(r'<h3 id="72-verification-steps.*?# Run with all levels visible:.*?task_battery_logger --ros-args --log-level warn</code></pre>\s*</div>',
                new_l6_sec7_2, c6, flags=re.DOTALL)
    print("Updated Lesson 06 Section 7.2 via regex.")

l6['html_content'] = c6
print("Updated Lesson 06.")

# ==============================================================================
# LESSON 07 FIXES
# ==============================================================================
l7 = [l for l in data['lessons'] if l['id'] == 'lesson_07'][0]
c7 = l7['html_content']

hw_note = """<div class="alert alert-info">
  <div class="alert-title">🔌 Authoritative Hardware Interface Layer</div>
  <p>The AMR emergency safety brake and zone speed governor services utilize our robot's dedicated interface definitions (<code class="inline-code">TriggerEmergencyStop.srv</code> and <code class="inline-code">SetSpeedMode.srv</code>) provided by <code class="inline-code">nexus_amr_interfaces</code>. This package is pre-installed in the robot's system underlay (<code class="inline-code">/opt/ros/jazzy</code>). In Lesson 11, you will learn how to design, write, and compile custom IDL packages with CMake from scratch!</p>
</div>"""

if 'Authoritative Hardware Interface Layer' not in c7:
    c7 = c7.replace('1. Overview &amp; Learning Objectives</h2>', '1. Overview &amp; Learning Objectives</h2>\n' + hw_note)

old_l7_sec8_2 = """<h3 id="82-verification-steps--expected-terminal-output">8.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Launch your server node in Terminal 1 and test zone dispatch service calls from Terminal 2:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># Terminal 1: Run your Speed Mode Service Server
ros2 run nexus_amr_basics task_speed_mode_server"""

new_l7_sec8_2 = """<h3 id="82-verification-steps--expected-terminal-output">8.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Copy the starter script, register in <code class="inline-code">setup.py</code>, build, and test:</p>

<ol class="step-guide-list">
  <li><strong>Step 1: Copy Starter Script to Package:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l07_task_speed_mode_server.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/</code></pre>
    </div>
  </li>
  <li><strong>Step 2: Register in setup.py:</strong>
    <p>In <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/setup.py</code>, append to <code class="inline-code">'console_scripts'</code>:</p>
    <div class="code-container" data-language="python">
      <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-python">            'task_speed_mode_server = nexus_amr_basics.m02_l07_task_speed_mode_server:main',</code></pre>
    </div>
  </li>
  <li><strong>Step 3: Build &amp; Source:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
    </div>
  </li>
  <li><strong>Step 4: Launch Server &amp; Dispatch Service Calls:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Terminal 1: Run your Speed Mode Service Server
ros2 run nexus_amr_basics task_speed_mode_server"""

if old_l7_sec8_2 in c7:
    c7 = c7.replace(old_l7_sec8_2, new_l7_sec8_2)
    c7 = c7.replace('ros2 service call /amr/set_speed_mode nexus_amr_interfaces/srv/SetSpeedMode "{mode_name: \'HYPERSPEED\'}"</code></pre>\n</div>',
                    'ros2 service call /amr/set_speed_mode nexus_amr_interfaces/srv/SetSpeedMode "{mode_name: \'HYPERSPEED\'}"</code></pre>\n</div>\n</li>\n</ol>')
    print("Updated Lesson 07 Section 8.2.")

l7['html_content'] = c7
print("Updated Lesson 07.")

# ==============================================================================
# LESSON 08 FIXES
# ==============================================================================
l8 = [l for l in data['lessons'] if l['id'] == 'lesson_08'][0]
c8 = l8['html_content']

old_l8_yaml = """<h3 id="loading-yaml-via-the-cli">Loading YAML via the CLI:</h3>
<p><div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 run nexus_amr_basics param_node_explained --ros-args --params-file src/nexus_amr_basics/config/teleop_params.yaml
</code></pre>
</div>
</p>"""

new_l8_yaml = """<h3 id="loading-yaml-via-the-cli">Loading YAML via the CLI:</h3>
<p>Create the config directory and parameters YAML file, copy the reference node, build, and run:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># 1. Create config directory and write YAML parameters
mkdir -p ~/ros2_ws/src/nexus_amr_basics/config
cat << 'PARAM_EOF' > ~/ros2_ws/src/nexus_amr_basics/config/teleop_params.yaml
parameterized_controller:
  ros__parameters:
    robot_id: "nexus-wh-01"
    max_linear_speed: 0.75
    enable_proximity_brake: true
PARAM_EOF

# 2. Copy explained parameter node into package
cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l09_02_param_node_explained.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/

# 3. Build package and run with YAML configuration:
cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash
ros2 run nexus_amr_basics param_node_explained --ros-args --params-file src/nexus_amr_basics/config/teleop_params.yaml
</code></pre>
</div>"""

if old_l8_yaml in c8:
    c8 = c8.replace(old_l8_yaml, new_l8_yaml)
    print("Updated Lesson 08 Section 4 YAML loading.")

old_l8_sec6_2 = """<h3 id="62-verification-steps--expected-terminal-output">6.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Run your node or test command and observe the output:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># Terminal 1: Run Dynamic Safety Params Node
ros2 run nexus_amr_basics dynamic_safety_params"""

new_l8_sec6_2 = """<h3 id="62-verification-steps--expected-terminal-output">6.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Copy the task template, register in <code class="inline-code">setup.py</code>, build, and test parameter updates:</p>

<ol class="step-guide-list">
  <li><strong>Step 1: Copy Starter Script to Package:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l10_01_task_dynamic_safety_params.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/</code></pre>
    </div>
  </li>
  <li><strong>Step 2: Register in setup.py:</strong>
    <p>In <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/setup.py</code>, append to <code class="inline-code">'console_scripts'</code>:</p>
    <div class="code-container" data-language="python">
      <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-python">            'dynamic_safety_params = nexus_amr_basics.m02_l10_01_task_dynamic_safety_params:main',</code></pre>
    </div>
  </li>
  <li><strong>Step 3: Build &amp; Source:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
    </div>
  </li>
  <li><strong>Step 4: Launch Dynamic Safety Node &amp; Test Parameters:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Terminal 1: Run Dynamic Safety Params Node
ros2 run nexus_amr_basics dynamic_safety_params"""

if old_l8_sec6_2 in c8:
    c8 = c8.replace(old_l8_sec6_2, new_l8_sec6_2)
    c8 = c8.replace('ros2 param set /dynamic_safety_params_node max_linear_velocity 5.0</code></pre>\n</div>',
                    'ros2 param set /dynamic_safety_params_node max_linear_velocity 5.0</code></pre>\n</div>\n</li>\n</ol>')
    print("Updated Lesson 08 Section 6.2.")

l8['html_content'] = c8
print("Updated Lesson 08.")

# ==============================================================================
# LESSON 09 FIXES
# ==============================================================================
l9 = [l for l in data['lessons'] if l['id'] == 'lesson_09'][0]
c9 = l9['html_content']

old_l9_step = """3. Step-by-Step: Writing a Python Launch File</h2>"""
new_l9_step = """3. Step-by-Step: Writing a Python Launch File</h2>
<p>Create the launch directory inside your package and copy <code class="inline-code">teleop_supervisor.launch.py</code>:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">mkdir -p ~/ros2_ws/src/nexus_amr_basics/launch
cp ~/ros2_ws_reference/src/nexus_amr_basics/launch/teleop_supervisor.launch.py ~/ros2_ws/src/nexus_amr_basics/launch/</code></pre>
</div>"""

if 'mkdir -p ~/ros2_ws/src/nexus_amr_basics/launch' not in c9:
    c9 = c9.replace(old_l9_step, new_l9_step)

old_l9_sec7_2 = """<h3 id="72-verification-steps--expected-terminal-output">7.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Run your node or test command and observe the output:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 launch nexus_amr_basics m02_l11_02_solution_fleet_launch.py robot_namespace:=warehouse_amr_01</code></pre>
</div>"""

new_l9_sec7_2 = """<h3 id="72-verification-steps--expected-terminal-output">7.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Copy the solution fleet launch file into your package launch folder, compile, and run:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># 1. Copy fleet launch file to student workspace
cp ~/ros2_ws_reference/src/nexus_amr_basics/launch/m02_l11_02_solution_fleet_launch.py ~/ros2_ws/src/nexus_amr_basics/launch/

# 2. Build and launch with namespace override
cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash
ros2 launch nexus_amr_basics m02_l11_02_solution_fleet_launch.py robot_namespace:=warehouse_amr_01</code></pre>
</div>"""

c9 = c9.replace(old_l9_sec7_2, new_l9_sec7_2)
l9['html_content'] = c9
print("Updated Lesson 09.")

# ==============================================================================
# LESSON 10 FIXES
# ==============================================================================
l10 = [l for l in data['lessons'] if l['id'] == 'lesson_10'][0]
c10 = l10['html_content']

old_l10_cli = """# 1. List active action servers
ros2 action list
# Output: /fibonacci

# 2. Inspect action type
ros2 action info /fibonacci

# 3. Send goal directly from the command line with live feedback streaming!
ros2 action send_goal /fibonacci action_tutorials_interfaces/action/NavigateDistance "{order: 6}" --feedback"""

new_l10_cli = """# 1. List active action servers
ros2 action list
# Output: /navigate_distance

# 2. Inspect action type
ros2 action info /navigate_distance
# Output: nexus_amr_interfaces/action/NavigateDistance

# 3. Send goal directly from the command line with live feedback streaming!
ros2 action send_goal /navigate_distance nexus_amr_interfaces/action/NavigateDistance "{target_distance_m: 5.0, max_speed_mps: 1.0}" --feedback"""

c10 = c10.replace(old_l10_cli, new_l10_cli)

old_l10_sec7_2 = """# Terminal 1: Run Action Server
ros2 run nexus_amr_basics navigate_distance_server

# Terminal 2: Send Action Goal with Feedback
ros2 action send_goal --feedback /fibonacci nexus_amr_interfaces/action/NavigateDistance "{order: 6}\""""

new_l10_sec7_2 = """# Step 1: Copy Action Server to Package and Build
cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l12_02_solution_navigate_distance_server.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/
cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash

# Terminal 1: Run Action Server
ros2 run nexus_amr_basics navigate_distance_server

# Terminal 2: Send Action Goal with Live Feedback Streaming
ros2 action send_goal --feedback /navigate_distance nexus_amr_interfaces/action/NavigateDistance "{target_distance_m: 2.0, max_speed_mps: 1.0}\""""

c10 = c10.replace(old_l10_sec7_2, new_l10_sec7_2)

old_l10_output = """Sending goal:
     order: 6

Feedback:
    partial_sequence: [0, 1, 1]
Feedback:
    partial_sequence: [0, 1, 1, 2]
Feedback:
    partial_sequence: [0, 1, 1, 2, 3]
Feedback:
    partial_sequence: [0, 1, 1, 2, 3, 5]
Feedback:
    partial_sequence: [0, 1, 1, 2, 3, 5, 8]

Result:
    sequence: [0, 1, 1, 2, 3, 5, 8]"""

new_l10_output = """Sending goal:
     target_distance_m: 2.0
     max_speed_mps: 1.0

Feedback:
    distance_remaining_m: 1.90
    current_speed_mps: 1.00
    percent_complete: 5.0
Feedback:
    distance_remaining_m: 1.00
    current_speed_mps: 1.00
    percent_complete: 50.0
Feedback:
    distance_remaining_m: 0.00
    current_speed_mps: 1.00
    percent_complete: 100.0

Result:
    reached_target: true
    actual_distance_travelled_m: 2.0
    status_message: Target distance of 2.00 m reached successfully."""

c10 = c10.replace(old_l10_output, new_l10_output)
l10['html_content'] = c10
print("Updated Lesson 10.")

# ==============================================================================
# LESSON 11 FIXES
# ==============================================================================
l11 = [l for l in data['lessons'] if l['id'] == 'lesson_11'][0]
c11 = l11['html_content']

old_l11_sec6 = """# 1. View Num message definition
ros2 interface show nexus_amr_interfaces/msg/Num
# Output:
# std_msgs/Header header\\nfloat32 distance_m\\nfloat32 min_range_m\\nfloat32 max_range_m\\nbool obstacle_detected"""

new_l11_sec6 = """# 1. View UltrasonicRange message definition
ros2 interface show nexus_amr_interfaces/msg/UltrasonicRange
# Output:
# std_msgs/Header header
# float32 distance_m
# float32 min_range_m
# float32 max_range_m
# bool obstacle_detected

# 2. View RobotStatus telemetry message definition
ros2 interface show nexus_amr_interfaces/msg/RobotStatus"""

c11 = c11.replace(old_l11_sec6, new_l11_sec6)

c11 = c11.replace('from nexus_amr_interfaces.msg import Num', 'from nexus_amr_interfaces.msg import UltrasonicRange')
c11 = c11.replace('self.publisher_ = self.create_publisher(Num,', 'self.publisher_ = self.create_publisher(UltrasonicRange,')
c11 = c11.replace('msg = Num()', 'msg = UltrasonicRange()')

old_l11_sec8_2 = """<h3 id="82-verification-steps--expected-terminal-output">8.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Run your node or test command and observe the output:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># Terminal 1: Run Status Publisher
ros2 run nexus_amr_basics robot_status_publisher

# Terminal 2: Echo custom message
ros2 topic echo /robot/status</code></pre>
</div>"""

new_l11_sec8_2 = """<h3 id="82-verification-steps--expected-terminal-output">8.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Copy the starter script, register in <code class="inline-code">setup.py</code>, build, and test:</p>

<ol class="step-guide-list">
  <li><strong>Step 1: Copy Starter Script to Package:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l07_01_task_status_publisher.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/</code></pre>
    </div>
  </li>
  <li><strong>Step 2: Register in setup.py:</strong>
    <p>In <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/setup.py</code>, append to <code class="inline-code">'console_scripts'</code>:</p>
    <div class="code-container" data-language="python">
      <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-python">            'robot_status_publisher = nexus_amr_basics.m02_l07_01_task_status_publisher:main',</code></pre>
    </div>
  </li>
  <li><strong>Step 3: Build &amp; Source:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
    </div>
  </li>
  <li><strong>Step 4: Launch Status Publisher &amp; Echo Telemetry:</strong>
    <div class="code-container" data-language="bash">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Terminal 1: Run Status Publisher
ros2 run nexus_amr_basics robot_status_publisher

# Terminal 2: Echo custom message
ros2 topic echo /robot/status</code></pre>
    </div>
  </li>
</ol>"""

c11 = c11.replace(old_l11_sec8_2, new_l11_sec8_2)
l11['html_content'] = c11
print("Updated Lesson 11.")

# ==============================================================================
# LESSON 12 & 13 FIXES
# ==============================================================================
l12 = [l for l in data['lessons'] if l['id'] == 'lesson_12'][0]
c12 = l12['html_content']
c12 = c12.replace('chmod +x ~/ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh\n~/ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh',
                  'mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m02_l12_task_bag_recorder.sh\n~/ros2_ws/scripts/m02_l12_task_bag_recorder.sh')
l12['html_content'] = c12
print("Updated Lesson 12.")

l13 = [l for l in data['lessons'] if l['id'] == 'lesson_13'][0]
c13 = l13['html_content']
c13 = c13.replace('chmod +x ~/ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh\n~/ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh',
                  'mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m02_l13_task_cli_audit.sh\n~/ros2_ws/scripts/m02_l13_task_cli_audit.sh')
l13['html_content'] = c13
print("Updated Lesson 13.")

with open(LESSONS_JSON, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved updated lessonsData.json successfully!")
