#!/usr/bin/env python3
import json
import os
import html

# Helper to read code file and escape HTML
def read_code(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    return html.escape(content)

def make_challenge_html(
    sec_num,
    title,
    intro_p,
    requirements_list,
    starter_filename,
    starter_path,
    starter_code,
    lang,
    verify_commands,
    expected_output,
    solution_filename,
    solution_path,
    solution_code
):
    reqs_html = "\n".join([f"    <li>{r}</li>" for r in requirements_list])
    
    return f"""<hr class="divider">
<h2 id="{sec_num}-hands-on-student-challenge">{sec_num}. Hands-on Student Challenge: {title}</h2>
<p>{intro_p}</p>

<div class="alert alert-tip">
  <div class="alert-title">🎯 Mission Requirements</div>
  <ol>
{reqs_html}
  </ol>
</div>

<h3 id="{sec_num}1-starter-template">{sec_num}.1 Starter Template: <code class="inline-code">{starter_filename}</code></h3>
<p>Open <code class="inline-code">~/{starter_path}</code> or copy it to your student workspace <code class="inline-code">~/ros2_ws/{starter_path.split('/', 1)[-1]}</code>:</p>

<div class="code-container" data-language="{lang}">
<div class="code-header"><span class="code-lang-tag">{lang}</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-{lang}">{starter_code}</code></pre>
</div>

<h3 id="{sec_num}2-verification-steps">{sec_num}.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Run your node or test command and observe the output:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">{verify_commands}</code></pre>
</div>

<p><em>Expected Terminal Output:</em></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">{expected_output}</code></pre>
</div>

<details class="reference-solution-dropdown">
  <summary class="solution-summary-btn">
    <span>🔍 View Reference Solution (<code class="inline-code">{solution_filename}</code>)</span>
  </summary>
  <div class="solution-body">
    <p>Reference file: <code class="inline-code">{solution_path}</code></p>
    <div class="code-container" data-language="{lang}">
      <div class="code-header"><span class="code-lang-tag">{lang}</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-{lang}">{solution_code}</code></pre>
    </div>
  </div>
</details>
"""

def main():
    json_path = 'lms/src/data/lessonsData.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    lessons = {l['id']: l for l in data['lessons']}

    # --------------------------------------------------------------------------
    # Lesson 01
    # --------------------------------------------------------------------------
    l1 = lessons['lesson_01']
    l1_task = read_code('ros2_ws_reference/scripts/m01_l01_task_env_setup.sh')
    l1_sol = read_code('ros2_ws_reference/scripts/m01_l01_solution_env_setup.sh')
    l1_challenge = make_challenge_html(
        sec_num="8",
        title="Autonomous Pre-Flight System Diagnostic Health Check",
        intro_p="Before launching an Autonomous Mobile Robot into production, roboticists must verify operating system permissions, serial bus access, ROS environment variables, and storage capacity.",
        requirements_list=[
            "<strong>TODO 1:</strong> Verify user group membership for serial hardware access (<code class=\"inline-code\">dialout</code>).",
            "<strong>TODO 2:</strong> Verify that the <code class=\"inline-code\">ROS_DISTRO</code> environment variable is set to <code class=\"inline-code\">jazzy</code>.",
            "<strong>TODO 3:</strong> Audit available disk space in root filesystem (require at least 5 GB for rosbags).",
            "<strong>TODO 4:</strong> Check Python 3 installation and display diagnostic pass/fail report."
        ],
        starter_filename="m01_l01_task_env_setup.sh",
        starter_path="ros2_ws_reference/scripts/m01_l01_task_env_setup.sh",
        starter_code=l1_task,
        lang="bash",
        verify_commands="chmod +x ~/ros2_ws_reference/scripts/m01_l01_task_env_setup.sh\n~/ros2_ws_reference/scripts/m01_l01_task_env_setup.sh",
        expected_output="======================================================\n  NavPro AMR Pre-Flight Linux Diagnostic Health Check \n======================================================\n\n[Check 1/4: Hardware Serial Access Permissions]\n[PASS] User 'student' belongs to 'dialout' group (Hardware serial access granted).\n\n[Check 2/4: ROS 2 Distribution Environment]\n[PASS] Active ROS 2 distribution: jazzy\n\n[Check 3/4: Workspace Storage Headroom]\n[PASS] Available root storage: 420 GB (Meets >= 5 GB requirement for rosbags).\n\n[Check 4/4: Python 3 Runtime]\n[PASS] Python 3 detected: Python 3.12.3\n\n======================================================\n  Pre-Flight Diagnostics Complete: READY FOR ROBOTICS! \n======================================================",
        solution_filename="m01_l01_solution_env_setup.sh",
        solution_path="ros2_ws_reference/scripts/m01_l01_solution_env_setup.sh",
        solution_code=l1_sol
    )
    # Insert before Section 9
    split_pos = l1['html_content'].find('<hr class="divider">\n<h2 id="9-summary-amp-next-steps">')
    if split_pos != -1:
        l1['html_content'] = l1['html_content'][:split_pos] + l1_challenge + "\n" + l1['html_content'][split_pos:]

    # --------------------------------------------------------------------------
    # Lesson 02
    # --------------------------------------------------------------------------
    l2 = lessons['lesson_02']
    l2_task = read_code('ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh')
    l2_sol = read_code('ros2_ws_reference/scripts/m01_l02_solution_domain_isolation.sh')
    l2_challenge = make_challenge_html(
        sec_num="10",
        title="Multi-Robot Domain Isolation & RMW Environment Configuration",
        intro_p="When multiple AMRs operate on the same local area network or WiFi subnet, node discovery packets can cause severe cross-talk and collision. You will write an automated environment isolation script.",
        requirements_list=[
            "<strong>TODO 1:</strong> Set <code class=\"inline-code\">ROS_DOMAIN_ID=42</code> to isolate this AMR from the default domain 0.",
            "<strong>TODO 2:</strong> Restrict discovery traffic using <code class=\"inline-code\">ROS_AUTOMATIC_DISCOVERY_RANGE=LOCALHOST</code> to eliminate WiFi broadcast saturation.",
            "<strong>TODO 3:</strong> Configure the active RMW middleware implementation (<code class=\"inline-code\">rmw_fastrtps_cpp</code>).",
            "<strong>TODO 4:</strong> Print a formatted environment audit and verify active package discovery."
        ],
        starter_filename="m01_l02_task_domain_isolation.sh",
        starter_path="ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh",
        starter_code=l2_task,
        lang="bash",
        verify_commands="chmod +x ~/ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh\nsource /opt/ros/jazzy/setup.bash\n~/ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh",
        expected_output="======================================================\n  ROS 2 Multi-Robot Network Isolation Configurator    \n======================================================\n\n[Step 1/4: Setting Isolated Domain ID]\n[DONE] Set ROS_DOMAIN_ID=42\n\n[Step 2/4: Restricting Discovery Range to Localhost]\n[DONE] Set ROS_AUTOMATIC_DISCOVERY_RANGE=LOCALHOST\n\n[Step 3/4: Selecting RMW Implementation]\n[DONE] Set RMW_IMPLEMENTATION=rmw_fastrtps_cpp\n\n[Step 4/4: Active Environment Report]\n  - ROS_DISTRO:                   jazzy\n  - ROS_DOMAIN_ID:                42\n  - ROS_AUTOMATIC_DISCOVERY_RANGE:LOCALHOST\n  - RMW_IMPLEMENTATION:           rmw_fastrtps_cpp\n  - Available ROS Packages:       408 packages detected\n\n======================================================\n  Isolation Configuration Applied Successfully!        \n======================================================",
        solution_filename="m01_l02_solution_domain_isolation.sh",
        solution_path="ros2_ws_reference/scripts/m01_l02_solution_domain_isolation.sh",
        solution_code=l2_sol
    )
    split_pos = l2['html_content'].find('<hr class="divider">\n<h2 id="10-summary-next-steps">')
    if split_pos != -1:
        l2['html_content'] = l2['html_content'][:split_pos] + l2_challenge + "\n" + l2['html_content'][split_pos:].replace('10. Summary &amp; Next Steps', '11. Summary &amp; Next Steps').replace('id="10-summary-next-steps"', 'id="11-summary-next-steps"')

    # --------------------------------------------------------------------------
    # Lesson 03
    # --------------------------------------------------------------------------
    l3 = lessons['lesson_03']
    l3_task = read_code('ros2_ws_reference/scripts/m01_l03_task_fleet_teleop.sh')
    l3_sol = read_code('ros2_ws_reference/scripts/m01_l03_solution_fleet_teleop.sh')
    l3_challenge = make_challenge_html(
        sec_num="9",
        title="Multi-Turtle Escort Fleet CLI Automation Script",
        intro_p="Orchestrate a multi-turtle convoy entirely through ROS 2 CLI commands in a single automated bash script.",
        requirements_list=[
            "<strong>TODO 1:</strong> Call <code class=\"inline-code\">/spawn</code> service to create <code class=\"inline-code\">turtle2</code> at (x=2.0, y=2.0, theta=0.0).",
            "<strong>TODO 2:</strong> Call <code class=\"inline-code\">/turtle2/set_pen</code> service to set a red pen with line thickness 3.",
            "<strong>TODO 3:</strong> Publish a test velocity burst to <code class=\"inline-code\">/turtle1/cmd_vel</code> (<code class=\"inline-code\">linear.x: 2.0</code>, <code class=\"inline-code\">angular.z: 1.5</code>).",
            "<strong>TODO 4:</strong> Query active topics and sample a live coordinate frame from <code class=\"inline-code\">/turtle1/pose</code> using <code class=\"inline-code\">--once</code>."
        ],
        starter_filename="m01_l03_task_fleet_teleop.sh",
        starter_path="ros2_ws_reference/scripts/m01_l03_task_fleet_teleop.sh",
        starter_code=l3_task,
        lang="bash",
        verify_commands="# Terminal 1: Run Turtlesim GUI\nros2 run turtlesim turtlesim_node\n\n# Terminal 2: Run your automation script\nchmod +x ~/ros2_ws_reference/scripts/m01_l03_task_fleet_teleop.sh\n~/ros2_ws_reference/scripts/m01_l03_task_fleet_teleop.sh",
        expected_output="======================================================\n  Turtlesim Multi-Turtle Fleet Orchestration Script   \n======================================================\n\n[Step 1/4: Spawning turtle2 at (x=2.0, y=2.0)]\nrequester: making request: turtlesim.srv.Spawn_Request(x=2.0, y=2.0, theta=0.0, name='turtle2')\nresponse:\nturtlesim.srv.Spawn_Response(name='turtle2')\n\n[Step 2/4: Configuring turtle2 Pen Style (Red, Width=3)]\nresponse:\nturtlesim.srv.SetPen_Response()\n\n[Step 3/4: Dispatching Velocity Command to turtle1 (vx=2.0, wz=1.5)]\npublisher: beginning loop\npublishing #1: geometry_msgs.msg.Twist(linear=geometry_msgs.msg.Vector3(x=2.0, y=0.0, z=0.0), angular=geometry_msgs.msg.Vector3(x=0.0, y=0.0, z=1.5))\n\n[Step 4/4: Telemetry & Graph Verification]\nActive Topics:\n/turtle1/cmd_vel\n/turtle1/pose\n/turtle2/cmd_vel\n/turtle2/pose\n\nSampling /turtle1/pose (one frame):\nx: 5.544445\ny: 5.544445\ntheta: 0.0\nlinear_velocity: 0.0\nangular_velocity: 0.0\n---\n\n======================================================\n  Fleet Orchestration Completed Successfully!          \n======================================================",
        solution_filename="m01_l03_solution_fleet_teleop.sh",
        solution_path="ros2_ws_reference/scripts/m01_l03_solution_fleet_teleop.sh",
        solution_code=l3_sol
    )
    split_pos = l3['html_content'].find('<div class="alert alert-tip" style="margin-top: 1.5rem;">\n  <div class="alert-icon">🏆</div>')
    if split_pos != -1:
        l3['html_content'] = l3['html_content'][:split_pos] + l3_challenge + "\n" + l3['html_content'][split_pos:]

    # --------------------------------------------------------------------------
    # Lesson 04
    # --------------------------------------------------------------------------
    l4 = lessons['lesson_04']
    l4_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l04_01_task_package_scaffold.py')
    l4_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l04_02_solution_package_scaffold.py')
    l4_challenge = make_challenge_html(
        sec_num="8",
        title="AMR Subsystem Heartbeat Beacon Node",
        intro_p="Inside your core <code class=\"inline-code\">navpro_basics</code> package, build an object-oriented Python node that periodically announces system uptime and heartbeat sequence number.",
        requirements_list=[
            "<strong>TODO 1:</strong> Initialize state variables <code class=\"inline-code\">self.seq_id = 0</code> and <code class=\"inline-code\">self.start_time = time.time()</code>.",
            "<strong>TODO 2:</strong> Create a 2.0 Hz timer (<code class=\"inline-code\">timer_period = 0.5s</code>).",
            "<strong>TODO 3:</strong> In <code class=\"inline-code\">timer_callback</code>, increment sequence ID and log a formatted <code class=\"inline-code\">INFO</code> heartbeat string: <code class=\"inline-code\">[HEARTBEAT #0001] Subsystem nominal | Uptime: 0.5s</code>.",
            "<strong>TODO 4:</strong> Register entry point in <code class=\"inline-code\">setup.py</code>, build with <code class=\"inline-code\">colcon build --symlink-install</code>, and verify with <code class=\"inline-code\">ros2 run navpro_basics amr_heartbeat</code>."
        ],
        starter_filename="m01_l04_01_task_package_scaffold.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l04_01_task_package_scaffold.py",
        starter_code=l4_task,
        lang="python",
        verify_commands="# Build package\ncd ~/ros2_ws\ncolcon build --packages-select navpro_basics --symlink-install\nsource install/setup.bash\n\n# Run Heartbeat Node\nros2 run navpro_basics amr_heartbeat",
        expected_output="[INFO] [1792004870.607443684] [amr_heartbeat_node]: AMRHeartbeatNode initialized and broadcasting at 2.0 Hz.\n[INFO] [1792004871.099826322] [amr_heartbeat_node]: [HEARTBEAT #0001] Subsystem nominal | Uptime:   0.5s\n[INFO] [1792004871.599949050] [amr_heartbeat_node]: [HEARTBEAT #0002] Subsystem nominal | Uptime:   1.0s\n[INFO] [1792004872.100004432] [amr_heartbeat_node]: [HEARTBEAT #0003] Subsystem nominal | Uptime:   1.5s\n[INFO] [1792004872.599956475] [amr_heartbeat_node]: [HEARTBEAT #0004] Subsystem nominal | Uptime:   2.0s",
        solution_filename="m01_l04_02_solution_package_scaffold.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l04_02_solution_package_scaffold.py",
        solution_code=l4_sol
    )
    split_pos = l4['html_content'].find('<em>Verify that the prefix matches <code class="inline-code">~/ros2_ws/install/navpro_basics</code>.</em></p>')
    if split_pos != -1:
        end_pos = split_pos + len('<em>Verify that the prefix matches <code class="inline-code">~/ros2_ws/install/navpro_basics</code>.</em></p>')
        l4['html_content'] = l4['html_content'][:end_pos] + "\n" + l4_challenge

    # --------------------------------------------------------------------------
    # Lesson 07
    # --------------------------------------------------------------------------
    l7 = lessons['lesson_07']
    l7_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_01_task_status_publisher.py')
    l7_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_02_solution_status_publisher.py')
    l7_challenge = make_challenge_html(
        sec_num="8",
        title="Custom RobotStatus Telemetry Publisher",
        intro_p="Integrate the compiled <code class=\"inline-code\">navpro_interfaces/msg/RobotStatus.msg</code> interface into a production telemetry node that streams real-time battery, pose, and status.",
        requirements_list=[
            "<strong>TODO 1:</strong> Create a publisher for <code class=\"inline-code\">RobotStatus</code> on topic <code class=\"inline-code\">/robot/status</code> (QoS depth = 10).",
            "<strong>TODO 2:</strong> Create a 1.0 Hz periodic timer (<code class=\"inline-code\">period = 1.0s</code>).",
            "<strong>TODO 3:</strong> Populate <code class=\"inline-code\">RobotStatus</code> fields: <code class=\"inline-code\">robot_id='NAVPRO_AMR_01'</code>, <code class=\"inline-code\">battery_percentage</code>, <code class=\"inline-code\">position (Point)</code>, <code class=\"inline-code\">linear_velocity</code>, and <code class=\"inline-code\">angular_velocity</code>.",
            "<strong>TODO 4:</strong> Publish the message and log formatted status report, then verify with <code class=\"inline-code\">ros2 topic echo /robot/status</code>."
        ],
        starter_filename="m02_l07_01_task_status_publisher.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_01_task_status_publisher.py",
        starter_code=l7_task,
        lang="python",
        verify_commands="# Terminal 1: Run Status Publisher\nros2 run navpro_basics robot_status_publisher\n\n# Terminal 2: Echo custom message\nros2 topic echo /robot/status",
        expected_output="[INFO] [1792005281.473226474] [robot_status_publisher]: RobotStatusPublisher initialized on topic /robot/status at 1.0 Hz.\n[INFO] [1792005282.465804739] [robot_status_publisher]: [STATUS PUB] AMR: NAVPRO_AMR_01 | Bat:  99.8% | Pos: ( 0.15,  0.05) | Vel: 0.35 m/s\n[INFO] [1792005283.465804739] [robot_status_publisher]: [STATUS PUB] AMR: NAVPRO_AMR_01 | Bat:  99.6% | Pos: ( 0.30,  0.10) | Vel: 0.35 m/s",
        solution_filename="m02_l07_02_solution_status_publisher.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_02_solution_status_publisher.py",
        solution_code=l7_sol
    )
    sec8_pos = l7['html_content'].find('<h2 id="8-hands-on-student-challenge">8. Hands-On Student Challenge</h2>')
    if sec8_pos != -1:
        l7['html_content'] = l7['html_content'][:sec8_pos] + l7_challenge

    # --------------------------------------------------------------------------
    # Lesson 08
    # --------------------------------------------------------------------------
    # Lesson 07 (Services)
    # --------------------------------------------------------------------------
    l8 = lessons['lesson_07']
    l8_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_task_speed_mode_server.py')
    l8_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_solution_speed_mode_server.py')
    l8_challenge = make_challenge_html(
        sec_num="8",
        title="Autonomous Mobile Robot Operational Speed Mode & Zone Governor Service Server",
        intro_p="Build and test an authoritative ROS 2 Service Server that receives zone dispatch requests from Fleet Management, validates speed envelopes, and applies kinetic scale factors using <code class=\"inline-code\">navpro_interfaces/srv/SetSpeedMode</code>.",
        requirements_list=[
            "<strong>TODO 1:</strong> Initialize a Service Server on endpoint <code class=\"inline-code\">/amr/set_speed_mode</code> using interface <code class=\"inline-code\">SetSpeedMode</code>.",
            "<strong>TODO 2:</strong> In callback <code class=\"inline-code\">handle_speed_mode(request, response)</code>, validate modes ('TURBO': 1.0, 'NORMAL': 0.70, 'ECO': 0.35, 'CUSTOM': clamp 0.1-1.0).",
            "<strong>TODO 3:</strong> Defensively reject unrecognized modes with <code class=\"inline-code\">response.success = False</code> and warning log.",
            "<strong>TODO 4:</strong> Latch validated mode to <code class=\"inline-code\">self.current_scale</code> and <code class=\"inline-code\">self.active_mode</code>, populate <code class=\"inline-code\">response.effective_scale</code>, and return response."
        ],
        starter_filename="m02_l07_task_speed_mode_server.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_task_speed_mode_server.py",
        starter_code=l8_task,
        lang="python",
        verify_commands="# Terminal 1: Run Service Server\nros2 run navpro_basics task_speed_mode_server\n\n# Terminal 2: Call the Service\nros2 service call /amr/set_speed_mode navpro_interfaces/srv/SetSpeedMode \"{mode_name: 'TURBO'}\"",
        expected_output="requester: making request: navpro_interfaces.srv.SetSpeedMode_Request(mode_name='TURBO', custom_scale=0.0)\n\nresponse:\nnavpro_interfaces.srv.SetSpeedMode_Response(success=True, message=\"Speed mode 'TURBO' applied successfully (scale: 100%).\", effective_scale=1.0)",
        solution_filename="m02_l07_solution_speed_mode_server.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_solution_speed_mode_server.py",
        solution_code=l8_sol
    )
    sec7_pos = l8['html_content'].find('<h2 id="7-student-hands-on-tasks-assignments">7. Student Hands-On Tasks &amp; Assignments</h2>')
    if sec7_pos != -1:
        l8['html_content'] = l8['html_content'][:sec7_pos] + l8_challenge

    # --------------------------------------------------------------------------
    # Lesson 09
    # --------------------------------------------------------------------------
    l9 = lessons['lesson_09']
    l9_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l09_03_task_speed_mode_server.py')
    l9_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l09_04_solution_speed_mode_server.py')
    l9_challenge = make_challenge_html(
        sec_num="9",
        title="Dynamic Speed Governor Service Server",
        intro_p="Implement an AMR Speed Governor Service Server utilizing our custom interface: <code class=\"inline-code\">navpro_interfaces/srv/SetSpeedMode.srv</code>.",
        requirements_list=[
            "<strong>TODO 1:</strong> Create a Service Server on <code class=\"inline-code\">/amr/set_speed_mode</code> with callback <code class=\"inline-code\">handle_speed_mode</code>.",
            "<strong>TODO 2:</strong> In <code class=\"inline-code\">handle_speed_mode</code>, evaluate <code class=\"inline-code\">request.mode_name</code>: TURBO (1.0), NORMAL (0.7), ECO (0.35), or CUSTOM (<code class=\"inline-code\">request.custom_scale</code>).",
            "<strong>TODO 3:</strong> Clamp custom scale within safe limits [0.1, 1.0], populate <code class=\"inline-code\">response.success = True</code>, and set <code class=\"inline-code\">response.effective_scale</code>.",
            "<strong>TODO 4:</strong> Reject invalid mode names with <code class=\"inline-code\">response.success = False</code> and test via <code class=\"inline-code\">ros2 service call</code>."
        ],
        starter_filename="m02_l09_03_task_speed_mode_server.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l09_03_task_speed_mode_server.py",
        starter_code=l9_task,
        lang="python",
        verify_commands="# Terminal 1: Run Speed Mode Service Server\nros2 run navpro_basics speed_mode_server\n\n# Terminal 2: Test Service with 'TURBO' mode\nros2 service call /amr/set_speed_mode navpro_interfaces/srv/SetSpeedMode \"{mode_name: 'TURBO'}\"",
        expected_output="requester: making request: navpro_interfaces.srv.SetSpeedMode_Request(mode_name='TURBO', custom_scale=0.0)\n\nresponse:\nnavpro_interfaces.srv.SetSpeedMode_Response(success=True, message=\"Speed mode 'TURBO' applied successfully (scale: 100%).\", effective_scale=1.0)",
        solution_filename="m02_l09_04_solution_speed_mode_server.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l09_04_solution_speed_mode_server.py",
        solution_code=l9_sol
    )
    sec9_pos = l9['html_content'].find('<h2 id="9-hands-on-student-challenge">9. Hands-On Student Challenge</h2>')
    if sec9_pos != -1:
        l9['html_content'] = l9['html_content'][:sec9_pos] + l9_challenge

    # --------------------------------------------------------------------------
    # Lesson 10
    # --------------------------------------------------------------------------
    l10 = lessons['lesson_10']
    l10_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l10_01_task_dynamic_safety_params.py')
    l10_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l10_02_solution_dynamic_safety_params.py')
    l10_challenge = make_challenge_html(
        sec_num="7",
        title="Velocity Safety Limiter with Dynamic Parameter Validation",
        intro_p="Build a runtime safety governor that declares dynamic parameters and enforces safety bounds using <code class=\"inline-code\">add_on_set_parameters_callback</code>.",
        requirements_list=[
            "<strong>TODO 1:</strong> Declare parameters: <code class=\"inline-code\">max_linear_velocity</code> (0.5), <code class=\"inline-code\">safety_stop_distance</code> (0.4), and <code class=\"inline-code\">robot_name</code> ('NavPro_AMR').",
            "<strong>TODO 2:</strong> Register validation callback with <code class=\"inline-code\">self.add_on_set_parameters_callback(self.param_change_callback)</code>.",
            "<strong>TODO 3:</strong> Enforce constraints: <code class=\"inline-code\">0.1 &le; max_linear_velocity &le; 2.0</code> m/s, rejecting any modifications exceeding thresholds with descriptive error reason.",
            "<strong>TODO 4:</strong> In 1.0 Hz timer, read parameter values and verify dynamic reconfiguration via <code class=\"inline-code\">ros2 param set</code>."
        ],
        starter_filename="m02_l10_01_task_dynamic_safety_params.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l10_01_task_dynamic_safety_params.py",
        starter_code=l10_task,
        lang="python",
        verify_commands="# Terminal 1: Run Dynamic Safety Params Node\nros2 run navpro_basics dynamic_safety_params\n\n# Terminal 2: Test Parameter Update\nros2 param set /dynamic_safety_params_node max_linear_velocity 1.2\n\n# Terminal 2: Test Parameter Rejection (Exceeding safety bound)\nros2 param set /dynamic_safety_params_node max_linear_velocity 5.0",
        expected_output="Set parameter(s) successfully\n\n# Second call response:\nSetting parameter(s) failed: Validation Error: max_linear_velocity (5.00 m/s) exceeds safe limits [0.1, 2.0] m/s!",
        solution_filename="m02_l10_02_solution_dynamic_safety_params.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l10_02_solution_dynamic_safety_params.py",
        solution_code=l10_sol
    )
    sec7_pos = l10['html_content'].find('<h2 id="7-hands-on-student-challenge">7. Hands-on Student Challenge</h2>')
    if sec7_pos != -1:
        l10['html_content'] = l10['html_content'][:sec7_pos] + l10_challenge

    # --------------------------------------------------------------------------
    # Lesson 11
    # --------------------------------------------------------------------------
    l11 = lessons['lesson_11']
    l11_task = read_code('ros2_ws_reference/src/navpro_basics/launch/m02_l11_01_task_fleet_launch.py')
    l11_sol = read_code('ros2_ws_reference/src/navpro_basics/launch/m02_l11_02_solution_fleet_launch.py')
    l11_challenge = make_challenge_html(
        sec_num="6",
        title="Namespaced Multi-Robot Fleet Launch Orchestrator",
        intro_p="Construct an industrial orchestration launch file that declares configurable launch arguments and deploys multiple namespaced AMR subsystem nodes.",
        requirements_list=[
            "<strong>TODO 1:</strong> Declare launch argument <code class=\"inline-code\">robot_namespace</code> with default value <code class=\"inline-code\">amr_alpha</code>.",
            "<strong>TODO 2:</strong> Define <code class=\"inline-code\">Node</code> action for <code class=\"inline-code\">amr_heartbeat</code> within the declared namespace.",
            "<strong>TODO 3:</strong> Define <code class=\"inline-code\">Node</code> action for <code class=\"inline-code\">solution_battery_logger</code> within the declared namespace.",
            "<strong>TODO 4:</strong> Assemble and return <code class=\"inline-code\">LaunchDescription</code>, then launch with custom namespace override."
        ],
        starter_filename="m02_l11_01_task_fleet_launch.py",
        starter_path="ros2_ws_reference/src/navpro_basics/launch/m02_l11_01_task_fleet_launch.py",
        starter_code=l11_task,
        lang="python",
        verify_commands="ros2 launch navpro_basics m02_l11_02_solution_fleet_launch.py robot_namespace:=warehouse_amr_01",
        expected_output="[INFO] [launch]: Default logging verbosity is set to INFO\n[INFO] [amr_heartbeat-1]: process started with pid [14201]\n[INFO] [solution_battery_logger-2]: process started with pid [14202]\n[amr_heartbeat-1] [INFO] [amr_heartbeat_node]: AMRHeartbeatNode initialized and broadcasting at 2.0 Hz.\n[solution_battery_logger-2] [INFO] [battery_monitor_logger]: BatteryMonitorLogger supervisor initialized at 10 Hz.",
        solution_filename="m02_l11_02_solution_fleet_launch.py",
        solution_path="ros2_ws_reference/src/navpro_basics/launch/m02_l11_02_solution_fleet_launch.py",
        solution_code=l11_sol
    )
    sec6_pos = l11['html_content'].find('<h2 id="6-hands-on-student-challenge">')
    if sec6_pos == -1:
        sec6_pos = l11['html_content'].find('<h3 id="project-objective">Project Objective:</h3>')
    if sec6_pos != -1:
        # cut from heading before project objective or at sec6_pos
        h2_pos = l11['html_content'].rfind('<h2', 0, sec6_pos)
        if h2_pos != -1:
            l11['html_content'] = l11['html_content'][:h2_pos] + l11_challenge
        else:
            l11['html_content'] = l11['html_content'][:sec6_pos] + l11_challenge

    # --------------------------------------------------------------------------
    # Lesson 12
    # --------------------------------------------------------------------------
    l12 = lessons['lesson_12']
    l12_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l12_01_task_fibonacci_action_server.py')
    l12_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l12_02_solution_fibonacci_action_server.py')
    l12_challenge = make_challenge_html(
        sec_num="6",
        title="Long-Running Fibonacci Action Server with Feedback",
        intro_p="Implement an Action Server utilizing the <code class=\"inline-code\">Fibonacci</code> action interface, streaming feedback at progressive steps and returning the final result.",
        requirements_list=[
            "<strong>TODO 1:</strong> Initialize <code class=\"inline-code\">ActionServer</code> with <code class=\"inline-code\">Fibonacci</code> action type and callback <code class=\"inline-code\">execute_callback</code>.",
            "<strong>TODO 2:</strong> In <code class=\"inline-code\">execute_callback</code>, initialize sequence <code class=\"inline-code\">[0, 1]</code> and instantiate <code class=\"inline-code\">Fibonacci.Feedback()</code>.",
            "<strong>TODO 3:</strong> Loop up to requested order, check <code class=\"inline-code\">goal_handle.is_cancel_requested</code>, append next element, and stream feedback via <code class=\"inline-code\">publish_feedback()</code>.",
            "<strong>TODO 4:</strong> Mark <code class=\"inline-code\">goal_handle.succeed()</code>, return <code class=\"inline-code\">result</code>, and test via <code class=\"inline-code\">ros2 action send_goal --feedback</code>."
        ],
        starter_filename="m02_l12_01_task_fibonacci_action_server.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l12_01_task_fibonacci_action_server.py",
        starter_code=l12_task,
        lang="python",
        verify_commands="# Terminal 1: Run Action Server\nros2 run navpro_basics fibonacci_action_server\n\n# Terminal 2: Send Action Goal with Feedback\nros2 action send_goal --feedback /fibonacci navpro_interfaces/action/Fibonacci \"{order: 6}\"",
        expected_output="Sending goal:\n     order: 6\n\nFeedback:\n    partial_sequence: [0, 1, 1]\nFeedback:\n    partial_sequence: [0, 1, 1, 2]\nFeedback:\n    partial_sequence: [0, 1, 1, 2, 3]\nFeedback:\n    partial_sequence: [0, 1, 1, 2, 3, 5]\nFeedback:\n    partial_sequence: [0, 1, 1, 2, 3, 5, 8]\n\nResult:\n    sequence: [0, 1, 1, 2, 3, 5, 8]",
        solution_filename="m02_l12_02_solution_fibonacci_action_server.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l12_02_solution_fibonacci_action_server.py",
        solution_code=l12_sol
    )
    sec6_pos = l12['html_content'].find('<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge</h2>')
    if sec6_pos != -1:
        l12['html_content'] = l12['html_content'][:sec6_pos] + l12_challenge

    # --------------------------------------------------------------------------
    # Lesson 13
    # --------------------------------------------------------------------------
    l13 = lessons['lesson_13']
    l13_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l13_01_task_patrol_action_server.py')
    l13_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l13_02_solution_patrol_action_server.py')
    l13_challenge = make_challenge_html(
        sec_num="8",
        title="Multi-Waypoint Autonomous Patrol Action Server",
        intro_p="Construct an Autonomous Multi-Waypoint Patrol Action Server utilizing our custom compiled action interface: <code class=\"inline-code\">navpro_interfaces/action/Patrol.action</code>.",
        requirements_list=[
            "<strong>TODO 1:</strong> Initialize <code class=\"inline-code\">ActionServer</code> with <code class=\"inline-code\">Patrol</code> interface on action name <code class=\"inline-code\">patrol</code>.",
            "<strong>TODO 2:</strong> Iterate through requested <code class=\"inline-code\">waypoints</code> and execute navigation loop simulation.",
            "<strong>TODO 3:</strong> Stream <code class=\"inline-code\">Patrol.Feedback</code> with <code class=\"inline-code\">current_waypoint_index</code>, <code class=\"inline-code\">distance_to_target</code>, and <code class=\"inline-code\">estimated_time_remaining</code>.",
            "<strong>TODO 4:</strong> Populate <code class=\"inline-code\">Patrol.Result</code> (<code class=\"inline-code\">success=True</code>, <code class=\"inline-code\">completed_loops</code>, <code class=\"inline-code\">total_distance_traveled</code>), succeed goal, and test via CLI."
        ],
        starter_filename="m02_l13_01_task_patrol_action_server.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l13_01_task_patrol_action_server.py",
        starter_code=l13_task,
        lang="python",
        verify_commands="# Terminal 1: Run Patrol Action Server\nros2 run navpro_basics patrol_action_server\n\n# Terminal 2: Send Patrol Goal with 2 Waypoints\nros2 action send_goal --feedback /patrol navpro_interfaces/action/Patrol \"{waypoints: [{x: 1.0, y: 0.5, z: 0.0}, {x: 2.5, y: 2.0, z: 0.0}], loop_count: 1}\"",
        expected_output="Sending goal:\n     waypoints: [geometry_msgs.msg.Point(x=1.0, y=0.5, z=0.0), geometry_msgs.msg.Point(x=2.5, y=2.0, z=0.0)], loop_count: 1\n\nFeedback:\n    current_waypoint_index: 1\n    distance_to_target: 1.118\n    estimated_time_remaining: 3.0\n\nResult:\n    success: true\n    completed_loops: 1\n    total_distance_traveled: 3.238\n    final_report: 'Successfully navigated 2 checkpoints over 1 loops.'",
        solution_filename="m02_l13_02_solution_patrol_action_server.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l13_02_solution_patrol_action_server.py",
        solution_code=l13_sol
    )
    sec8_pos = l13['html_content'].find('<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge</h2>')
    if sec8_pos != -1:
        l13['html_content'] = l13['html_content'][:sec8_pos] + l13_challenge

    # --------------------------------------------------------------------------
    # Lesson 14
    # --------------------------------------------------------------------------
    l14 = lessons['lesson_14']
    l14_task = read_code('ros2_ws_reference/src/navpro_description/urdf/m03_l14_task_sonar_sensor.xacro')
    l14_sol = read_code('ros2_ws_reference/src/navpro_description/urdf/m03_l14_solution_sonar_sensor.xacro')
    l14_challenge = make_challenge_html(
        sec_num="6",
        title="Parametric Ultrasonic Sonar Sensor Macro",
        intro_p="Design a reusable Xacro sensor macro representing an ultrasonic distance rangefinder mounted to the AMR chassis.",
        requirements_list=[
            "<strong>TODO 1:</strong> Define xacro macro <code class=\"inline-code\">&lt;xacro:macro name=\"sonar_sensor\" params=\"prefix parent *origin\"&gt;</code>.",
            "<strong>TODO 2:</strong> Construct <code class=\"inline-code\">&lt;link name=\"${prefix}_link\"&gt;</code> with cylinder geometry (radius=0.015, length=0.02) and inertial values.",
            "<strong>TODO 3:</strong> Construct <code class=\"inline-code\">&lt;joint name=\"${prefix}_joint\" type=\"fixed\"&gt;</code> attaching to <code class=\"inline-code\">${parent}</code>.",
            "<strong>TODO 4:</strong> Configure Gazebo ray/range sensor simulation element with 2.0m max distance range."
        ],
        starter_filename="m03_l14_task_sonar_sensor.xacro",
        starter_path="ros2_ws_reference/src/navpro_description/urdf/m03_l14_task_sonar_sensor.xacro",
        starter_code=l14_task,
        lang="xml",
        verify_commands="# Check Xacro Expansion\ncd ~/ros2_ws/src/navpro_description/urdf\nxacro m03_l14_solution_sonar_sensor.xacro",
        expected_output="<?xml version=\"1.0\" ?>\n<robot name=\"navpro_amr\">\n  <link name=\"sonar_front_link\">\n    <visual>\n      <geometry>\n        <cylinder length=\"0.02\" radius=\"0.015\"/>\n      </geometry>\n    </visual>\n  </link>\n</robot>",
        solution_filename="m03_l14_solution_sonar_sensor.xacro",
        solution_path="ros2_ws_reference/src/navpro_description/urdf/m03_l14_solution_sonar_sensor.xacro",
        solution_code=l14_sol
    )
    sec6_pos = l14['html_content'].find('<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge</h2>')
    if sec6_pos != -1:
        l14['html_content'] = l14['html_content'][:sec6_pos] + l14_challenge

    # --------------------------------------------------------------------------
    # Lesson 15
    # --------------------------------------------------------------------------
    l15 = lessons['lesson_15']
    l15_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l15_01_task_static_tf_broadcaster.py')
    l15_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l15_02_solution_static_tf_broadcaster.py')
    l15_challenge = make_challenge_html(
        sec_num="7",
        title="Static Coordinate Frame Broadcaster for Sensor Offsets",
        intro_p="Broadcast a static coordinate frame transform for the AMR's primary 2D LiDAR (<code class=\"inline-code\">laser_frame</code>) relative to the robot chassis (<code class=\"inline-code\">base_link</code>).",
        requirements_list=[
            "<strong>TODO 1:</strong> Initialize <code class=\"inline-code\">StaticTransformBroadcaster(self)</code> in node constructor.",
            "<strong>TODO 2:</strong> Populate <code class=\"inline-code\">TransformStamped</code> with <code class=\"inline-code\">frame_id='base_link'</code> and <code class=\"inline-code\">child_frame_id='laser_frame'</code>.",
            "<strong>TODO 3:</strong> Configure physical offsets (x=0.20m forward, z=0.15m height) with unit orientation quaternion.",
            "<strong>TODO 4:</strong> Broadcast transform and inspect active tree with <code class=\"inline-code\">ros2 run tf2_ros tf2_echo base_link laser_frame</code>."
        ],
        starter_filename="m03_l15_01_task_static_tf_broadcaster.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l15_01_task_static_tf_broadcaster.py",
        starter_code=l15_task,
        lang="python",
        verify_commands="# Terminal 1: Run Static Broadcaster\nros2 run navpro_basics static_tf_broadcaster\n\n# Terminal 2: Query TF Translation\nros2 run tf2_ros tf2_echo base_link laser_frame",
        expected_output="[INFO] [static_tf_broadcaster_node]: Broadcasted static TF frame: base_link -> laser_frame [x=0.20, z=0.15]\n\n# tf2_echo output:\nAt time 1792005400.123456789\n- Translation: [0.200, 0.000, 0.150]\n- Rotation: in Quaternion [0.000, 0.000, 0.000, 1.000]",
        solution_filename="m03_l15_02_solution_static_tf_broadcaster.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l15_02_solution_static_tf_broadcaster.py",
        solution_code=l15_sol
    )
    sec7_pos = l15['html_content'].find('<h2 id="7-hands-on-student-challenge">7. Hands-on Student Challenge</h2>')
    if sec7_pos != -1:
        l15['html_content'] = l15['html_content'][:sec7_pos] + l15_challenge

    # --------------------------------------------------------------------------
    # Lesson 16
    # --------------------------------------------------------------------------
    l16 = lessons['lesson_16']
    l16_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l16_01_task_diff_drive_telemetry.py')
    l16_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l16_02_solution_diff_drive_telemetry.py')
    l16_challenge = make_challenge_html(
        sec_num="7",
        title="Differential Drive Odometer & Kinematic Tracking Validator",
        intro_p="Construct an odometry validator node to verify wheel odometry emitted by Gazebo's differential drive simulation plugin against commanded velocity inputs.",
        requirements_list=[
            "<strong>TODO 1:</strong> Subscribe to <code class=\"inline-code\">/odom</code> (<code class=\"inline-code\">nav_msgs/msg/Odometry</code>) to capture physical velocity.",
            "<strong>TODO 2:</strong> Subscribe to <code class=\"inline-code\">/cmd_vel</code> (<code class=\"inline-code\">geometry_msgs/msg/Twist</code>) to capture commanded velocity.",
            "<strong>TODO 3:</strong> In <code class=\"inline-code\">odom_callback</code>, store linear speed and live position.",
            "<strong>TODO 4:</strong> In 2 Hz loop, compute slip delta <code class=\"inline-code\">abs(cmd_vel - odom_vel)</code> and log diagnostics."
        ],
        starter_filename="m03_l16_01_task_diff_drive_telemetry.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l16_01_task_diff_drive_telemetry.py",
        starter_code=l16_task,
        lang="python",
        verify_commands="ros2 run navpro_basics diff_drive_telemetry",
        expected_output="[INFO] [1792005420.100] [diff_drive_telemetry_validator]: DiffDriveTelemetryValidator active on /odom and /cmd_vel.\n[INFO] [1792005420.600] [diff_drive_telemetry_validator]: [ODOM CHECK] Cmd: 0.30 m/s | Meas: 0.29 m/s | Slip/Error: 0.008 | Pos: ( 1.25,  0.42)",
        solution_filename="m03_l16_02_solution_diff_drive_telemetry.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l16_02_solution_diff_drive_telemetry.py",
        solution_code=l16_sol
    )
    sec7_pos = l16['html_content'].find('<h2 id="7-hands-on-student-challenge">7. Hands-on Student Challenge</h2>')
    if sec7_pos != -1:
        l16['html_content'] = l16['html_content'][:sec7_pos] + l16_challenge

    # --------------------------------------------------------------------------
    # Lesson 17
    # --------------------------------------------------------------------------
    l17 = lessons['lesson_17']
    l17_task = read_code('ros2_ws_reference/scripts/m03_l17_task_spawn_warehouse_obstacle.sh')
    l17_sol = read_code('ros2_ws_reference/scripts/m03_l17_solution_spawn_warehouse_obstacle.sh')
    l17_challenge = make_challenge_html(
        sec_num="6",
        title="Warehouse Obstacle Spawner & Sensor Reflection Verification",
        intro_p="Automate the dynamic injection of warehouse obstacle entities into the Gazebo simulation world and verify sensor reflection.",
        requirements_list=[
            "<strong>TODO 1:</strong> Verify Gazebo simulation environment readiness by checking active topic status.",
            "<strong>TODO 2:</strong> Spawn a cylindrical obstacle barrel entity at coordinates (x=2.0, y=0.5, z=0.25).",
            "<strong>TODO 3:</strong> Sample the <code class=\"inline-code\">/scan</code> topic to verify the LiDAR sensor detects the spawned object.",
            "<strong>TODO 4:</strong> Emit execution verification report."
        ],
        starter_filename="m03_l17_task_spawn_warehouse_obstacle.sh",
        starter_path="ros2_ws_reference/scripts/m03_l17_task_spawn_warehouse_obstacle.sh",
        starter_code=l17_task,
        lang="bash",
        verify_commands="chmod +x ~/ros2_ws_reference/scripts/m03_l17_task_spawn_warehouse_obstacle.sh\n~/ros2_ws_reference/scripts/m03_l17_task_spawn_warehouse_obstacle.sh",
        expected_output="======================================================\n  Gazebo Warehouse Entity Spawner & Sensor Test       \n======================================================\n\n[Step 1/4: Checking Simulation Environment]\n[PASS] Gazebo simulation node and LiDAR /scan topic detected.\n\n[Step 2/4: Spawning Obstacle Entity in Warehouse]\n[DONE] Obstacle 'obstacle_barrel' dispatched to coordinates (x=2.0, y=0.5, z=0.25).\n\n[Step 3/4: Validating Sensor Reflection on Obstacle]\naverage rate: 10.021\n\n[Step 4/4: Obstacle Spawner Verification]\n[PASS] Warehouse environment entity successfully deployed and observable.\n\n======================================================\n  Obstacle Spawning Completed Successfully!           \n======================================================",
        solution_filename="m03_l17_solution_spawn_warehouse_obstacle.sh",
        solution_path="ros2_ws_reference/scripts/m03_l17_solution_spawn_warehouse_obstacle.sh",
        solution_code=l17_sol
    )
    sec6_pos = l17['html_content'].find('<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge</h2>')
    if sec6_pos != -1:
        l17['html_content'] = l17['html_content'][:sec6_pos] + l17_challenge

    # --------------------------------------------------------------------------
    # Lesson 18
    # --------------------------------------------------------------------------
    l18 = lessons['lesson_18']
    l18_task = read_code('ros2_ws_reference/scripts/m04_l18_task_slam_mapping.sh')
    l18_sol = read_code('ros2_ws_reference/scripts/m04_l18_solution_slam_mapping.sh')
    l18_challenge = make_challenge_html(
        sec_num="6",
        title="Online SLAM Mapping & Map Serialization Automation",
        intro_p="Automate SLAM Toolbox occupancy grid verification and call the map serialization service to save warehouse map artifacts (.yaml and .pgm).",
        requirements_list=[
            "<strong>TODO 1:</strong> Verify the <code class=\"inline-code\">/map</code> topic is broadcasting active OccupancyGrid data.",
            "<strong>TODO 2:</strong> Ensure destination directory <code class=\"inline-code\">~/ros2_ws/maps</code> exists.",
            "<strong>TODO 3:</strong> Call SLAM Toolbox <code class=\"inline-code\">save_map</code> service to serialize map.",
            "<strong>TODO 4:</strong> Validate that <code class=\"inline-code\">warehouse_online_map.yaml</code> and <code class=\"inline-code\">.pgm</code> are successfully created."
        ],
        starter_filename="m04_l18_task_slam_mapping.sh",
        starter_path="ros2_ws_reference/scripts/m04_l18_task_slam_mapping.sh",
        starter_code=l18_task,
        lang="bash",
        verify_commands="chmod +x ~/ros2_ws_reference/scripts/m04_l18_task_slam_mapping.sh\n~/ros2_ws_reference/scripts/m04_l18_task_slam_mapping.sh my_warehouse_map",
        expected_output="======================================================\n  SLAM Toolbox Mapping & Map Serialization Script     \n======================================================\n\n[Step 1/4: Checking /map Topic]\n[PASS] /map topic is broadcasting active OccupancyGrid data.\n\n[Step 2/4: Preparing Destination Directory: /home/student/ros2_ws/maps]\n[DONE] Target directory ready: /home/student/ros2_ws/maps\n\n[Step 3/4: Invoking SLAM Map Saver Service]\nresponse: slam_toolbox.srv.SaveMap_Response(result=0)\n\n[Step 4/4: Validating Map Artifacts]\n[PASS] Map artifacts successfully serialized:\n-rw-r--r-- 1 student student 1.2M Oct 15 00:30 my_warehouse_map.pgm\n-rw-r--r-- 1 student student  180 Oct 15 00:30 my_warehouse_map.yaml\n\n======================================================\n  SLAM Mapping Task Completed Successfully!            \n======================================================",
        solution_filename="m04_l18_solution_slam_mapping.sh",
        solution_path="ros2_ws_reference/scripts/m04_l18_solution_slam_mapping.sh",
        solution_code=l18_sol
    )
    sec6_pos = l18['html_content'].find('<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge</h2>')
    if sec6_pos != -1:
        l18['html_content'] = l18['html_content'][:sec6_pos] + l18_challenge

    # --------------------------------------------------------------------------
    # Lesson 19
    # --------------------------------------------------------------------------
    l19 = lessons['lesson_19']
    l19_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l19_01_task_costmap_validator.py')
    l19_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l19_02_solution_costmap_validator.py')
    l19_challenge = make_challenge_html(
        sec_num="6",
        title="Real-Time Costmap Inflation & Clearance Auditor",
        intro_p="Construct a Costmap 2D Safety & Inflation Validator node that subscribes to <code class=\"inline-code\">/global_costmap/costmap</code> and audits free space vs inflation buffer.",
        requirements_list=[
            "<strong>TODO 1:</strong> Subscribe to <code class=\"inline-code\">/global_costmap/costmap</code> (<code class=\"inline-code\">nav_msgs/msg/OccupancyGrid</code>).",
            "<strong>TODO 2:</strong> In callback, extract grid dimensions (<code class=\"inline-code\">width</code>, <code class=\"inline-code\">height</code>, <code class=\"inline-code\">resolution</code>).",
            "<strong>TODO 3:</strong> Count cell classifications (free=0, lethal &ge; 100, inflation buffer in between).",
            "<strong>TODO 4:</strong> Log safety metrics and obstacle clearance percentages."
        ],
        starter_filename="m04_l19_01_task_costmap_validator.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l19_01_task_costmap_validator.py",
        starter_code=l19_task,
        lang="python",
        verify_commands="ros2 run navpro_basics costmap_validator",
        expected_output="[INFO] [costmap_validator_node]: CostmapValidatorNode listening to /global_costmap/costmap...\n[INFO] [costmap_validator_node]: [COSTMAP AUDIT] Grid: 300x300 (0.050m/cell) | Free: 84.2% | Lethal: 3.1% (2790 cells) | Inflation Buffer: 11420 cells",
        solution_filename="m04_l19_02_solution_costmap_validator.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l19_02_solution_costmap_validator.py",
        solution_code=l19_sol
    )
    sec6_pos = l19['html_content'].find('<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge</h2>')
    if sec6_pos != -1:
        l19['html_content'] = l19['html_content'][:sec6_pos] + l19_challenge

    # --------------------------------------------------------------------------
    # Lesson 20
    # --------------------------------------------------------------------------
    l20 = lessons['lesson_20']
    l20_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l20_01_task_controller_tuner.py')
    l20_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l20_02_solution_controller_tuner.py')
    l20_challenge = make_challenge_html(
        sec_num="6",
        title="Trajectory Tracking Error & Velocity Governor Monitor",
        intro_p="Construct a Trajectory Tracking Error & Velocity Governor Monitor to inspect how well the Nav2 DWB / RPP controller follows planned paths.",
        requirements_list=[
            "<strong>TODO 1:</strong> Subscribe to <code class=\"inline-code\">/plan</code> (<code class=\"inline-code\">nav_msgs/msg/Path</code>) from global planner.",
            "<strong>TODO 2:</strong> Subscribe to <code class=\"inline-code\">/cmd_vel</code> (<code class=\"inline-code\">geometry_msgs/msg/Twist</code>) from local controller.",
            "<strong>TODO 3:</strong> In <code class=\"inline-code\">plan_callback</code>, record total planned poses.",
            "<strong>TODO 4:</strong> In 1.0 Hz evaluation timer, log tracking metrics: commanded speed vs path complexity."
        ],
        starter_filename="m04_l20_01_task_controller_tuner.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l20_01_task_controller_tuner.py",
        starter_code=l20_task,
        lang="python",
        verify_commands="ros2 run navpro_basics controller_tuner",
        expected_output="[INFO] [controller_tuner_monitor]: ControllerTunerMonitor active on /plan and /cmd_vel.\n[INFO] [controller_tuner_monitor]: [NAV2 CONTROLLER] Plan Size:  48 poses | Cmd Linear: 0.45 m/s | Angular: -0.12 rad/s",
        solution_filename="m04_l20_02_solution_controller_tuner.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l20_02_solution_controller_tuner.py",
        solution_code=l20_sol
    )
    sec6_pos = l20['html_content'].find('<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge</h2>')
    if sec6_pos != -1:
        l20['html_content'] = l20['html_content'][:sec6_pos] + l20_challenge

    # --------------------------------------------------------------------------
    # Lesson 21
    # --------------------------------------------------------------------------
    l21 = lessons['lesson_21']
    l21_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l21_01_task_recovery_monitor.py')
    l21_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l21_02_solution_recovery_monitor.py')
    l21_challenge = make_challenge_html(
        sec_num="6",
        title="Nav2 Recovery Behavior Supervisor & Lifecycle State Machine",
        intro_p="Construct a Behavior Tree & Recovery Behavior Supervisor node that monitors and manages Nav2 recovery pipelines (Spin, BackUp, Wait).",
        requirements_list=[
            "<strong>TODO 1:</strong> Initialize lifecycle states: <code class=\"inline-code\">NAVIGATING</code>, <code class=\"inline-code\">RECOVERY_SPIN</code>, <code class=\"inline-code\">RECOVERY_BACKUP</code>, <code class=\"inline-code\">RECOVERY_WAIT</code>.",
            "<strong>TODO 2:</strong> Create a 1.0 Hz timer that simulates obstacle encounters and recovery activations.",
            "<strong>TODO 3:</strong> Advance state machine through recovery levels in correct operational order.",
            "<strong>TODO 4:</strong> Log recovery events and emit warnings."
        ],
        starter_filename="m04_l21_01_task_recovery_monitor.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l21_01_task_recovery_monitor.py",
        starter_code=l21_task,
        lang="python",
        verify_commands="ros2 run navpro_basics recovery_monitor",
        expected_output="[INFO] [nav2_recovery_supervisor]: Nav2RecoverySupervisor active in state: NAVIGATING.\n[INFO] [nav2_recovery_supervisor]: [NAV2 BT STATE: NAVIGATING] Mission execution nominal | Tick: 1\n[WARN] [nav2_recovery_supervisor]: [NAV2 RECOVERY TRIGGER] Local planner stuck! Initiating 360-degree clearing spin...\n[WARN] [nav2_recovery_supervisor]: [NAV2 RECOVERY TRIGGER] Path obstructed! Initiating 0.3m reverse backup maneuver...\n[INFO] [nav2_recovery_supervisor]: [NAV2 RECOVERY RESOLVED] Waypoint path clear! Resuming primary navigation.",
        solution_filename="m04_l21_02_solution_recovery_monitor.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m04_l21_02_solution_recovery_monitor.py",
        solution_code=l21_sol
    )
    sec6_pos = l21['html_content'].find('<h2 id="6-hands-on-student-challenge">6. Hands-on Student Challenge</h2>')
    if sec6_pos != -1:
        l21['html_content'] = l21['html_content'][:sec6_pos] + l21_challenge

    # --------------------------------------------------------------------------
    # Lesson 05
    # --------------------------------------------------------------------------
    l5 = lessons['lesson_05']
    l5_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l05_06_task_turtle_square.py')
    l5_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l05_07_solution_turtle_square.py')
    l5_challenge = make_challenge_html(
        sec_num="8",
        title="Autonomous Turtlesim Square Patrol Controller",
        intro_p="Build an autonomous velocity controller node that commands Turtlesim to trace a continuous, repeatable square path using an object-oriented state machine.",
        requirements_list=[
            "<strong>TODO 1:</strong> Create a publisher for <code class=\"inline-code\">geometry_msgs/msg/Twist</code> on topic <code class=\"inline-code\">/turtle1/cmd_vel</code> (queue depth 10).",
            "<strong>TODO 2:</strong> Create a 10 Hz control timer (<code class=\"inline-code\">timer_period = 0.1s</code>).",
            "<strong>TODO 3:</strong> Implement state machine transitions: State 0 (Drive straight: 2.0 m/s for 2.0s), State 1 (Turn 90° left: 1.5708 rad/s for 1.0s).",
            "<strong>TODO 4:</strong> Publish velocity setpoints to Turtlesim, log segment completions, and safely brake on emergency stop."
        ],
        starter_filename="m01_l05_06_task_turtle_square.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l05_06_task_turtle_square.py",
        starter_code=l5_task,
        lang="python",
        verify_commands="# Terminal 1: Launch Turtlesim Simulator\nros2 run turtlesim turtlesim_node\n\n# Terminal 2: Run Square Controller\nros2 run navpro_basics square_turtle\n\n# Terminal 3: Introspect Command Stream\nros2 topic echo /turtle1/cmd_vel",
        expected_output="[INFO] [turtle_square_controller]: Initializing TurtleSquareController...\n[INFO] [turtle_square_controller]: State FORWARD: driving edge #1...\n[INFO] [turtle_square_controller]: State TURN: rotating 90 degrees left...\n[INFO] [turtle_square_controller]: State FORWARD: driving edge #2...",
        solution_filename="m01_l05_07_solution_turtle_square.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l05_07_solution_turtle_square.py",
        solution_code=l5_sol
    )
    sec8_pos = l5['html_content'].find('<h2 id="8-hands-on-student-challenge">8. Hands-On Student Challenge')
    if sec8_pos != -1:
        l5['html_content'] = l5['html_content'][:sec8_pos] + l5_challenge

    # --------------------------------------------------------------------------
    # Lesson 22
    # --------------------------------------------------------------------------
    l22 = lessons['lesson_22']
    l22_task = read_code('ros2_ws_reference/src/navpro_navigation/navpro_navigation/m04_l22_02_task_multi_waypoint_patrol.py')
    l22_sol = read_code('ros2_ws_reference/src/navpro_navigation/navpro_navigation/m04_l22_03_solution_multi_waypoint_patrol.py')
    l22_challenge = make_challenge_html(
        sec_num="6",
        title="Autonomous Multi-Checkpoint Inspection Patrol with Simple Commander",
        intro_p="Program an autonomous inspection patrol route for the AMR using the Nav2 Simple Commander API. The robot must visit a sequence of three warehouse stations and return autonomously to the home station.",
        requirements_list=[
            "<strong>TODO 1:</strong> Initialize <code class=\"inline-code\">BasicNavigator()</code> and wait for Nav2 to reach the active state (<code class=\"inline-code\">navigator.waitUntilNav2Active()</code>).",
            "<strong>TODO 2:</strong> Iterate through checkpoints Alpha, Bravo, Charlie and dispatch target poses using <code class=\"inline-code\">navigator.goToPose(goal_pose)</code>.",
            "<strong>TODO 3:</strong> Poll navigation feedback while <code class=\"inline-code\">not navigator.isTaskComplete()</code> and evaluate per-waypoint timeout.",
            "<strong>TODO 4:</strong> Check <code class=\"inline-code\">navigator.getResult()</code> for <code class=\"inline-code\">TaskResult.SUCCEEDED</code>, pause 2.0s for simulated payload inspection, and dispatch final return to home station goal."
        ],
        starter_filename="m04_l22_02_task_multi_waypoint_patrol.py",
        starter_path="ros2_ws_reference/src/nexus_amr_navigation/nexus_amr_navigation/m04_l22_02_task_multi_waypoint_patrol.py",
        starter_code=l22_task,
        lang="python",
        verify_commands="# Terminal 1: Launch Gazebo Simulation & Nav2 Stack\nros2 launch nexus_amr_navigation navigation.launch.py\n\n# Terminal 2: Run Multi-Waypoint Patrol Mission\nros2 run nexus_amr_navigation task_multi_waypoint_patrol",
        expected_output="[INFO] [multi_waypoint_patrol]: Nav2 is active! Dispatched 3 inspection checkpoints.\n[INFO] [multi_waypoint_patrol]: Navigating to Checkpoint 1: Alpha (1.50, 0.50)...\n[INFO] [multi_waypoint_patrol]: Distance remaining: 1.12 m...\n[INFO] [multi_waypoint_patrol]: Checkpoint Alpha reached! Inspecting sensors (2s)...\n[INFO] [multi_waypoint_patrol]: Checkpoint Bravo reached! Inspecting sensors (2s)...\n[INFO] [multi_waypoint_patrol]: All checkpoints visited. Returning to Home Station (0, 0)...\n[INFO] [multi_waypoint_patrol]: PATROL MISSION ACCOMPLISHED! Arrived at Home Station successfully.",
        solution_filename="m04_l22_03_solution_multi_waypoint_patrol.py",
        solution_path="ros2_ws_reference/src/navpro_navigation/navpro_navigation/m04_l22_03_solution_multi_waypoint_patrol.py",
        solution_code=l22_sol
    )
    sec6_pos = l22['html_content'].find('<h2 id="6-student-hands-on-task-reference-solution">6. Student Hands-On Task &amp; Reference Solution</h2>')
    if sec6_pos != -1:
        l22['html_content'] = l22['html_content'][:sec6_pos] + l22_challenge

    # --------------------------------------------------------------------------
    # Lesson 23
    # --------------------------------------------------------------------------
    l23 = lessons['lesson_23']
    l23_task = read_code('ros2_ws_reference/scripts/m04_l23_task_hardware_check.sh')
    l23_sol = read_code('ros2_ws_reference/scripts/m04_l23_solution_hardware_check.sh')
    l23_challenge = make_challenge_html(
        sec_num="6",
        title="Sim-to-Real Pre-Flight Hardware Clearance Audit",
        intro_p="Execute a rigorous physical hardware readiness sanity check verifying microcontroller serial bus connectivity, micro-ROS agent status, and sensor streaming before field deployment.",
        requirements_list=[
            "<strong>TODO 1:</strong> Scan physical serial bus connections (<code class=\"inline-code\">/dev/ttyUSB*</code>, <code class=\"inline-code\">/dev/ttyACM*</code>).",
            "<strong>TODO 2:</strong> Check micro-ROS or hardware motor driver communication daemon status.",
            "<strong>TODO 3:</strong> Query hardware LiDAR sensor topic (<code class=\"inline-code\">/scan</code>) for active pulses.",
            "<strong>TODO 4:</strong> Print a color-coded Sim-to-Real Deployment Clearance Certificate."
        ],
        starter_filename="m04_l23_task_hardware_check.sh",
        starter_path="ros2_ws_reference/scripts/m04_l23_task_hardware_check.sh",
        starter_code=l23_task,
        lang="bash",
        verify_commands="chmod +x ~/ros2_ws_reference/scripts/m04_l23_task_hardware_check.sh\n~/ros2_ws_reference/scripts/m04_l23_task_hardware_check.sh",
        expected_output="======================================================\n  NavPro AMR Sim-to-Real Physical Hardware Sanity Check\n======================================================\n\n[Step 1/4: Scanning Physical Serial Buses]\n[PASS] Physical serial controller(s) detected: /dev/ttyUSB0 /dev/ttyACM0\n\n[Step 2/4: Checking Embedded Driver Agent]\n[PASS] micro-ROS agent daemon is actively managing serial bridge.\n\n[Step 3/4: Inspecting Sensor Telemetry Stream]\n[PASS] /scan sensor topic is active.\n\n[Step 4/4: Sim-to-Real Readiness Report]\n  - Linux Dialout Group:  [OK]\n  - Network Isolation:    [OK - Domain 42]\n  - Real-Time Controller: [CONFIGURED]\n  - Emergency Stop Logic: [VERIFIED]\n\n======================================================\n  Physical Hardware Inspection Completed: READY!       \n======================================================",
        solution_filename="m04_l23_solution_hardware_check.sh",
        solution_path="ros2_ws_reference/scripts/m04_l23_solution_hardware_check.sh",
        solution_code=l23_sol
    )
    sec6_pos = l23['html_content'].find('<h2 id="6-graduation-course-completion">6. Graduation &amp; Course Completion</h2>')
    if sec6_pos != -1:
        # Renumber Graduation to Section 7
        l23['html_content'] = l23['html_content'][:sec6_pos] + l23_challenge + "\n<hr class=\"divider\">\n<h2 id=\"7-graduation-course-completion\">7. Graduation &amp; Course Completion</h2>" + l23['html_content'][sec6_pos + len('<h2 id="6-graduation-course-completion">6. Graduation &amp; Course Completion</h2>'):]

    # Save back to json
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("Successfully updated all lessons in lessonsData.json!")

if __name__ == '__main__':
    main()
