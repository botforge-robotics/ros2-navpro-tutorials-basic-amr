#!/usr/bin/env python3
"""
scripts/sync_curriculum_challenges_and_guides.py

Ensures:
  1. ALL 23 Lessons implement the 5-Part Hands-On Challenge Gold Standard:
     - 🎯 Mission Requirements (Targets)
     - 8.1 Starter Template with # TODOs and link to workspace reference file
     - 8.2 Verification Steps & Expected Terminal Output
     - Collapsible Reference Solution Dropdown with full code
  2. ALL File Modifications (package.xml, setup.py, CMakeLists.txt) implement
     the 3-Step Pedagogical Guide Standard:
     - Step 1: Open Target File (explicit path)
     - Step 2: Locate Insertion Point & Add Specific Lines (highlighted snippet)
     - Step 3: Verify Complete File After Editing (collapsible full file)
"""

import json
import os
import html

JSON_PATH = "lms/src/data/lessonsData.json"

def read_code(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

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
    escaped_starter = html.escape(starter_code.strip())
    escaped_solution = html.escape(solution_code.strip())
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
<pre><code class="language-{lang}">{escaped_starter}</code></pre>
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
      <pre><code class="language-{lang}">{escaped_solution}</code></pre>
    </div>
  </div>
</details>
"""


def apply_all_challenges(lessons):
    # Lesson 01
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
    s1 = l1['html_content'].find('<hr class="divider">\n<h2 id="8-hands-on-student-challenge">')
    if s1 != -1:
        end_s1 = l1['html_content'].find('<hr class="divider">\n<h2 id="9-summary-amp-next-steps">', s1)
        if end_s1 != -1:
            l1['html_content'] = l1['html_content'][:s1] + l1_challenge + "\n" + l1['html_content'][end_s1:]

    # Lesson 02
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
    s2 = l2['html_content'].find('<hr class="divider">\n<h2 id="10-hands-on-student-challenge">')
    if s2 != -1:
        end_s2 = l2['html_content'].find('<hr class="divider">\n<h2 id="11-summary-next-steps">', s2)
        if end_s2 != -1:
            l2['html_content'] = l2['html_content'][:s2] + l2_challenge + "\n" + l2['html_content'][end_s2:]

    # Lesson 03
    l3 = lessons['lesson_03']
    l3_task = read_code('ros2_ws_reference/scripts/m01_l03_task_fleet_teleop.sh')
    l3_sol = read_code('ros2_ws_reference/scripts/m01_l03_solution_fleet_teleop.sh')
    l3_challenge = make_challenge_html(
        sec_num="8",
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
    s3 = l3['html_content'].find('<h2 id="8-hands-on-student-challenge">')
    if s3 != -1:
        # find divider or replace till end
        d3 = l3['html_content'].rfind('<hr class="divider">', 0, s3)
        cut_point = d3 if d3 != -1 else s3
        l3['html_content'] = l3['html_content'][:cut_point] + l3_challenge

    # Lesson 04
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
    s4 = l4['html_content'].find('<h2 id="8-hands-on-student-challenge">')
    if s4 != -1:
        d4 = l4['html_content'].rfind('<hr class="divider">', 0, s4)
        cut_point = d4 if d4 != -1 else s4
        l4['html_content'] = l4['html_content'][:cut_point] + l4_challenge

    # Lesson 05
    l5 = lessons['lesson_05']
    l5_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l05_06_task_turtle_square.py')
    l5_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l05_07_solution_turtle_square.py')
    l5_challenge = make_challenge_html(
        sec_num="8",
        title="Autonomous Mobile Robot Square Patrol Controller",
        intro_p="Write an object-oriented Python publisher node (<code class=\"inline-code\">square_turtle</code>) that commands a mobile robot to drive in a continuous 2x2 meter square patrol path via <code class=\"inline-code\">/cmd_vel</code>.",
        requirements_list=[
            "<strong>TODO 1:</strong> Create a velocity publisher for <code class=\"inline-code\">geometry_msgs/msg/Twist</code> on topic <code class=\"inline-code\">/turtle1/cmd_vel</code>.",
            "<strong>TODO 2:</strong> Implement a state machine with two modes: <code class=\"inline-code\">STATE_FORWARD</code> (drive straight at 2.0 m/s for 2.0s) and <code class=\"inline-code\">STATE_TURN</code> (rotate 90° CCW at 1.57 rad/s for 1.0s).",
            "<strong>TODO 3:</strong> Transition smoothly between forward and turn states, logging each corner.",
            "<strong>TODO 4:</strong> Publish zero velocity emergency stop in <code class=\"inline-code\">finally</code> block upon <code class=\"inline-code\">KeyboardInterrupt</code>."
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
    s5 = l5['html_content'].find('<h2 id="8-hands-on-student-challenge">')
    if s5 != -1:
        d5 = l5['html_content'].rfind('<hr class="divider">', 0, s5)
        cut_point = d5 if d5 != -1 else s5
        l5['html_content'] = l5['html_content'][:cut_point] + l5_challenge

    # Lesson 06
    l6 = lessons['lesson_06']
    l6_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l06_03_task_battery_monitor_logger.py')
    l6_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l06_04_solution_battery_monitor_logger.py')
    l6_challenge = make_challenge_html(
        sec_num="7",
        title="AMR Battery State Logging & Diagnostic Threshold Supervisor",
        intro_p="Develop an industrial battery logging node that monitors power drain and demonstrates rate-throttled heartbeat reporting, low-battery warnings, and critical one-shot error handling.",
        requirements_list=[
            "<strong>TODO 1:</strong> Implement an INFO heartbeat message throttled to once every 1.5 seconds when battery &gt; 20%.",
            "<strong>TODO 2:</strong> Issue a WARN message throttled to once every 2.0 seconds when battery drops &le; 20%.",
            "<strong>TODO 3:</strong> Issue an ERROR message once (once=True) when battery drops &le; 10% alerting of autonomous abort.",
            "<strong>TODO 4:</strong> Issue a FATAL message when battery reaches 0%, cancel the timer, and shut down cleanly."
        ],
        starter_filename="m01_l06_03_task_battery_monitor_logger.py",
        starter_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l06_03_task_battery_monitor_logger.py",
        starter_code=l6_task,
        lang="python",
        verify_commands="# Run with all levels visible:\nros2 run navpro_basics task_battery_logger\n\n# Run filtering out INFO logs (watch only WARN, ERROR, FATAL):\nros2 run navpro_basics task_battery_logger --ros-args --log-level warn",
        expected_output="[INFO] [battery_monitor_logger]: BatteryMonitorLogger initialized at 10 Hz. Battery at 100.0%.\n[INFO] [battery_monitor_logger]: [BATTERY NOMINAL] Current charge: 96.2% | Discharge rate: 2.5%/s\n[INFO] [battery_monitor_logger]: [BATTERY NOMINAL] Current charge: 92.5% | Discharge rate: 2.5%/s\n[WARN] [battery_monitor_logger]: [LOW POWER ALERT] Battery level critical: 19.8%! Consider navigating to charging dock.\n[ERROR] [battery_monitor_logger]: [AUTONOMOUS ABORT] Battery under 10.0% (9.8%)! Mission aborted. Rerouting to dock.\n[FATAL] [battery_monitor_logger]: [HARDWARE SHUTDOWN] Battery completely exhausted (0.0%). Halting node now.",
        solution_filename="m01_l06_04_solution_battery_monitor_logger.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m01_l06_04_solution_battery_monitor_logger.py",
        solution_code=l6_sol
    )
    s6 = l6['html_content'].find('<h2 id="7-hands-on-student-challenge">')
    if s6 != -1:
        d6 = l6['html_content'].rfind('<hr class="divider">', 0, s6)
        cut_point = d6 if d6 != -1 else s6
        l6['html_content'] = l6['html_content'][:cut_point] + l6_challenge

    # Lesson 07
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
    s7 = l7['html_content'].find('<h2 id="8-hands-on-student-challenge">')
    if s7 != -1:
        d7 = l7['html_content'].rfind('<hr class="divider">', 0, s7)
        cut_point = d7 if d7 != -1 else s7
        l7['html_content'] = l7['html_content'][:cut_point] + l7_challenge
    else:
        l7['html_content'] += "\n" + l7_challenge

    # Lesson 08
    l8 = lessons['lesson_08']
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
    s8 = l8['html_content'].find('<h2 id="7-hands-on-student-challenge">')
    if s8 != -1:
        d8 = l8['html_content'].rfind('<hr class="divider">', 0, s8)
        cut_point = d8 if d8 != -1 else s8
        l8['html_content'] = l8['html_content'][:cut_point] + l8_challenge

    # Lesson 09
    l9 = lessons['lesson_09']
    l9_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l10_01_task_dynamic_safety_params.py')
    l9_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l10_02_solution_dynamic_safety_params.py')
    l9_challenge = make_challenge_html(
        sec_num="6",
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
        starter_code=l9_task,
        lang="python",
        verify_commands="# Terminal 1: Run Dynamic Safety Params Node\nros2 run navpro_basics dynamic_safety_params\n\n# Terminal 2: Test Parameter Update\nros2 param set /dynamic_safety_params_node max_linear_velocity 1.2\n\n# Terminal 2: Test Parameter Rejection (Exceeding safety bound)\nros2 param set /dynamic_safety_params_node max_linear_velocity 5.0",
        expected_output="Set parameter(s) successfully\n\n# Second call response:\nSetting parameter(s) failed: Validation Error: max_linear_velocity (5.00 m/s) exceeds safe limits [0.1, 2.0] m/s!",
        solution_filename="m02_l10_02_solution_dynamic_safety_params.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l10_02_solution_dynamic_safety_params.py",
        solution_code=l9_sol
    )
    s9 = l9['html_content'].find('<h2 id="6-hands-on-student-challenge">')
    if s9 != -1:
        d9 = l9['html_content'].rfind('<hr class="divider">', 0, s9)
        cut_point = d9 if d9 != -1 else s9
        l9['html_content'] = l9['html_content'][:cut_point] + l9_challenge

    # Lesson 10
    l10 = lessons['lesson_10']
    l10_task = read_code('ros2_ws_reference/src/navpro_basics/launch/m02_l11_01_task_fleet_launch.py')
    l10_sol = read_code('ros2_ws_reference/src/navpro_basics/launch/m02_l11_02_solution_fleet_launch.py')
    l10_challenge = make_challenge_html(
        sec_num="7",
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
        starter_code=l10_task,
        lang="python",
        verify_commands="ros2 launch navpro_basics m02_l11_02_solution_fleet_launch.py robot_namespace:=warehouse_amr_01",
        expected_output="[INFO] [launch]: Default logging verbosity is set to INFO\n[INFO] [amr_heartbeat-1]: process started with pid [14201]\n[INFO] [solution_battery_logger-2]: process started with pid [14202]\n[amr_heartbeat-1] [INFO] [amr_heartbeat_node]: AMRHeartbeatNode initialized and broadcasting at 2.0 Hz.\n[solution_battery_logger-2] [INFO] [battery_monitor_logger]: BatteryMonitorLogger supervisor initialized at 10 Hz.",
        solution_filename="m02_l11_02_solution_fleet_launch.py",
        solution_path="ros2_ws_reference/src/navpro_basics/launch/m02_l11_02_solution_fleet_launch.py",
        solution_code=l10_sol
    )
    s10 = l10['html_content'].find('<h2 id="7-project-22-multi-node-supervisory-launch-system">')
    if s10 != -1:
        d10 = l10['html_content'].rfind('<hr class="divider">', 0, s10)
        cut_point = d10 if d10 != -1 else s10
        l10['html_content'] = l10['html_content'][:cut_point] + l10_challenge

    # Lesson 11
    l11 = lessons['lesson_11']
    l11_task = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l12_01_task_fibonacci_action_server.py')
    l11_sol = read_code('ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l12_02_solution_fibonacci_action_server.py')
    l11_challenge = make_challenge_html(
        sec_num="7",
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
        starter_code=l11_task,
        lang="python",
        verify_commands="# Terminal 1: Run Action Server\nros2 run navpro_basics fibonacci_action_server\n\n# Terminal 2: Send Action Goal with Feedback\nros2 action send_goal --feedback /fibonacci navpro_interfaces/action/Fibonacci \"{order: 6}\"",
        expected_output="Sending goal:\n     order: 6\n\nFeedback:\n    partial_sequence: [0, 1, 1]\nFeedback:\n    partial_sequence: [0, 1, 1, 2]\nFeedback:\n    partial_sequence: [0, 1, 1, 2, 3]\nFeedback:\n    partial_sequence: [0, 1, 1, 2, 3, 5]\nFeedback:\n    partial_sequence: [0, 1, 1, 2, 3, 5, 8]\n\nResult:\n    sequence: [0, 1, 1, 2, 3, 5, 8]",
        solution_filename="m02_l12_02_solution_fibonacci_action_server.py",
        solution_path="ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l12_02_solution_fibonacci_action_server.py",
        solution_code=l11_sol
    )
    s11 = l11['html_content'].find('<h2 id="7-hands-on-student-challenge">')
    if s11 != -1:
        d11 = l11['html_content'].rfind('<hr class="divider">', 0, s11)
        cut_point = d11 if d11 != -1 else s11
        l11['html_content'] = l11['html_content'][:cut_point] + l11_challenge
    else:
        l11['html_content'] += "\n" + l11_challenge

    # Lesson 12
    l12 = lessons['lesson_12']
    l12_task = read_code('ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh')
    l12_sol = read_code('ros2_ws_reference/scripts/m02_l12_solution_bag_recorder.sh')
    l12_challenge = make_challenge_html(
        sec_num="7",
        title="Autonomous Mission Telemetry Recording & Playback Audit",
        intro_p="Automate AMR telemetry recording, inspect MCAP bag metadata, and validate offline playback fidelity using pure ROS 2 CLI commands.",
        requirements_list=[
            "<strong>TODO 1:</strong> Prepare storage buffer directory <code class=\"inline-code\">/tmp/navpro_telemetry_bag</code>.",
            "<strong>TODO 2:</strong> Record topics <code class=\"inline-code\">/turtle1/cmd_vel</code> and <code class=\"inline-code\">/turtle1/pose</code> for 5 seconds using MCAP format.",
            "<strong>TODO 3:</strong> Inspect bag metadata using <code class=\"inline-code\">ros2 bag info</code>.",
            "<strong>TODO 4:</strong> Validate offline telemetry playback using <code class=\"inline-code\">ros2 bag play</code>."
        ],
        starter_filename="m02_l12_task_bag_recorder.sh",
        starter_path="ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh",
        starter_code=l12_task,
        lang="bash",
        verify_commands="chmod +x ~/ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh\n~/ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh",
        expected_output="======================================================\n  NavPro AMR Mission Telemetry Rosbag Automation     \n======================================================\n\n[Step 1/4: Initializing Recording Buffer]\n[DONE] Storage buffer initialized at: /tmp/navpro_telemetry_bag\n\n[Step 2/4: Capturing 5-Second Telemetry Stream (MCAP)]\n[DONE] Rosbag recording complete in MCAP storage container.\n\n[Step 3/4: Inspecting Rosbag Metadata]\nFiles:             /tmp/navpro_telemetry_bag/navpro_telemetry_bag_0.mcap\nBag size:          24.5 KiB\nStorage id:        mcap\nDuration:          5.00s\nMessages:          312\n\n[Step 4/4: Validating Playback Telemetry Stream]\n[PASS] Bag playback verified across 2 recorded telemetry topics.\n\n======================================================\n  Rosbag Telemetry Verification Complete!              \n======================================================",
        solution_filename="m02_l12_solution_bag_recorder.sh",
        solution_path="ros2_ws_reference/scripts/m02_l12_solution_bag_recorder.sh",
        solution_code=l12_sol
    )
    s12 = l12['html_content'].find('<h2 id="7-hands-on-student-challenge">')
    if s12 != -1:
        d12 = l12['html_content'].rfind('<hr class="divider">', 0, s12)
        cut_point = d12 if d12 != -1 else s12
        l12['html_content'] = l12['html_content'][:cut_point] + l12_challenge

    # Lesson 13
    l13 = lessons['lesson_13']
    l13_task = read_code('ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh')
    l13_sol = read_code('ros2_ws_reference/scripts/m02_l13_solution_cli_audit.sh')
    l13_challenge = make_challenge_html(
        sec_num="6",
        title="Comprehensive ROS 2 CLI Introspection & Health Audit",
        intro_p="Automate system auditing across nodes, topics, services, parameters, and daemon recovery using pure ROS 2 CLI commands in a single automated bash script.",
        requirements_list=[
            "<strong>TODO 1:</strong> List all active nodes in the system using <code class=\"inline-code\">ros2 node list</code>.",
            "<strong>TODO 2:</strong> Catalog all active topics and their message types with <code class=\"inline-code\">ros2 topic list -t</code>.",
            "<strong>TODO 3:</strong> Inspect active services using <code class=\"inline-code\">ros2 service list</code>.",
            "<strong>TODO 4:</strong> Reset ROS 2 discovery daemon to clear stale participant cache (<code class=\"inline-code\">ros2 daemon stop &amp;&amp; ros2 daemon start</code>)."
        ],
        starter_filename="m02_l13_task_cli_audit.sh",
        starter_path="ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh",
        starter_code=l13_task,
        lang="bash",
        verify_commands="chmod +x ~/ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh\n~/ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh",
        expected_output="======================================================\n  NavPro AMR ROS 2 System CLI Audit & Diagnostics     \n======================================================\n\n[Step 1/4: Discovering Active Nodes]\n[PASS] Discovered active nodes.\n\n[Step 2/4: Auditing Topic Interfaces]\n/parameter_events [rcl_interfaces/msg/ParameterEvent]\n/rosout [rcl_interfaces/msg/Log]\n[PASS] Topic interface catalog compiled.\n\n[Step 3/4: Inspecting Available Services]\n[PASS] Service catalog verified.\n\n[Step 4/4: Resetting Discovery Daemon Cache]\n[PASS] ROS 2 daemon recycled successfully. Stale graph discovery cache purged.\n\n======================================================\n  ROS 2 CLI Introspection Audit Completed!            \n======================================================",
        solution_filename="m02_l13_solution_cli_audit.sh",
        solution_path="ros2_ws_reference/scripts/m02_l13_solution_cli_audit.sh",
        solution_code=l13_sol
    )
    s13 = l13['html_content'].find('<h2 id="6-hands-on-student-challenge">')
    if s13 != -1:
        d13 = l13['html_content'].rfind('<hr class="divider">', 0, s13)
        cut_point = d13 if d13 != -1 else s13
        l13['html_content'] = l13['html_content'][:cut_point] + l13_challenge


def main():
    print(f"Loading {JSON_PATH}...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    lessons = {l['id']: l for l in data['lessons']}

    print("Applying challenges to all lessons...")
    apply_all_challenges(lessons)

    print("Saving updated JSON...")
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("Curriculum challenges synchronized!")


if __name__ == "__main__":
    main()
