#!/usr/bin/env python3
"""
Comprehensive Curriculum Enrichment Script:
1. Injects Robotics Flight Operations Mission Briefing & Story Description before every code block and student challenge.
2. Injects Core Code Deep Dive & Operational Breakdown after every code block and reference solution.
3. Enriches Python code comments inside lessonsData.json for Lessons 05, 06, 07, 08, 09, 10, 11, 12, 15, 16, 19, 20, 21, 22.
"""

import json
import re
import os

LESSONS_JSON_PATH = 'ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'

def make_mission_briefing(title, context, why_arch, objective, icon="🎯"):
    return f"""
<div class="alert alert-info alert-briefing">
  <div class="alert-icon">{icon}</div>
  <div class="alert-content">
    <div class="alert-title">Robotics Flight Operations Mission Briefing: {title}</div>
    <div class="alert-body">
      <strong>Physical AMR Context &amp; Operational Challenge:</strong><br>
      {context}
      <br><br>
      <strong>Architectural Role &amp; Why This Mechanism:</strong><br>
      {why_arch}
      <br><br>
      <strong>Flight Objective &amp; Behavioral Outcome:</strong><br>
      {objective}
    </div>
  </div>
</div>
"""

def make_code_breakdown(title, intro, items):
    items_html = "\n".join([
        f'    <li class="code-breakdown-item"><strong>{item[0]}:</strong> {item[1]}</li>'
        for item in items
    ])
    return f"""
<div class="code-breakdown-card">
  <h4 class="code-breakdown-title">🔬 Core Code Deep Dive &amp; Operational Breakdown: {title}</h4>
  <p class="code-breakdown-intro">{intro}</p>
  <ul class="code-breakdown-list">
{items_html}
  </ul>
</div>
"""

# ---------------------------------------------------------------------------
# LESSON 11
# ---------------------------------------------------------------------------
def enrich_lesson_11(html):
    # 1. Custom Interface Publisher
    target_pub_pre = '<p>Now write the custom publisher node: <code class="inline-code">src/navpro_basics/navpro_basics/ultrasonic_custom_publisher.py</code>:</p>'
    briefing_pub = make_mission_briefing(
        title="Custom Interface Proximity Telemetry Publisher",
        context="Standard ROS 2 messages like Float32 are generic scalars with zero metadata: a receiving node cannot determine which physical sensor produced the reading, whether the measurement is valid, or what spatial coordinate frame it references. In industrial robotics, proximity messages must include sensor identifiers, minimum/maximum operational ranges, and timestamped variance.",
        why_arch="Creating a dedicated interface package (e.g. <code>navpro_interfaces/msg/UltrasonicRange.msg</code>) allows roboticists to define strongly-typed domain data models. The ROS 2 IDL compiler (<code>rosidl_default_generators</code>) automatically generates high-performance C++ and Python data structures that serialize efficiently over DDS.",
        objective="Construct a Python node that imports the compiled <code>UltrasonicRange</code> message from <code>navpro_interfaces.msg</code>, populates header timestamps, sensor frame IDs, and simulated distance readings, and broadcasts telemetry at 1 Hz.",
        icon="📦"
    )
    if target_pub_pre in html and 'Mission Briefing: Custom Interface Proximity Telemetry Publisher' not in html:
        html = html.replace(target_pub_pre, briefing_pub + '\n' + target_pub_pre)

    breakdown_pub = make_code_breakdown(
        title="Custom Message Publisher Mechanics",
        intro="Dissecting how custom interface messages are imported and populated in Python:",
        items=[
            ("Custom Module Import", "<code>from navpro_interfaces.msg import UltrasonicRange</code> imports the Python module generated during the workspace build. If the package was not built with <code>colcon build</code>, this import raises an <code>ImportError</code>."),
            ("Field Population & Schema Conformance", "Custom message fields (e.g. <code>msg.sensor_id = 'front_center'</code>, <code>msg.distance_m = ...</code>) are populated directly as Python attributes. The rclpy bindings validate primitive types during assignment."),
            ("Header Timestamping", "In standard robotics messages, including an <code>std_msgs/Header</code> with <code>self.get_clock().now().to_msg()</code> ensures that sensor data can be precisely synchronized with coordinate frame transforms in TF2.")
        ]
    )
    pattern_pub_end = r'(Publishes custom UltrasonicRange\.msg data at 1 Hz.*?</code></pre>\s*</div>)'
    m = re.search(pattern_pub_end, html, re.DOTALL)
    if m and 'Custom Message Publisher Mechanics' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_pub)

    # 2. Student Challenge: Custom Status Telemetry Publisher
    target_task_pre = '<h3 id="81-starter-template">'
    briefing_task = make_mission_briefing(
        title="Autonomous Mobile Robot Status Heartbeat Telemetry Challenge",
        context="In an automated fulfillment center, a central Fleet Management Server (FMS) must track the health of dozens of mobile robots in real-time. Emitting separate topics for battery level, current zone, speed multiplier, and hardware error codes creates network overhead and race conditions on the dashboard.",
        why_arch="Bundling interrelated telemetry into a single atomic composite message (<code>RobotStatus.msg</code>) guarantees that all diagnostic fields correspond to the exact same temporal snapshot. Downstream supervisors receive a coherent, synchronized vehicle status on every packet.",
        objective="Implement the <code>StatusPublisher</code> node using <code>navpro_interfaces/msg/RobotStatus</code>. Publish vehicle state-of-charge, operational speed multiplier, and active mode at 1.0 Hz, ensuring all diagnostic attributes are accurately mapped.",
        icon="📊"
    )
    if target_task_pre in html and 'Mission Briefing: Autonomous Mobile Robot Status Heartbeat' not in html:
        html = html.replace(target_task_pre, briefing_task + '\n' + target_task_pre)

    breakdown_task_sol = make_code_breakdown(
        title="StatusPublisher Solution Breakdown",
        intro="Key architectural takeaways from the Custom Telemetry Publisher solution:",
        items=[
            ("Atomic Diagnostic Heartbeats", "Bundling battery percentage, operational speed mode, and error flags into a single message avoids temporal skew across dashboard monitors."),
            ("Type Consistency & Zero-Copy Efficiency", "Custom interfaces compiled via <code>ament_cmake_ros</code> leverage CDR serialization, allowing efficient zero-copy IPC when nodes are composited into a single process container.")
        ]
    )
    pattern_task_sol_end = r'(m02_l07_02_solution_status_publisher\.py.*?</code></pre>\s*</div>\s*</div>\s*</details>)'
    m = re.search(pattern_task_sol_end, html, re.DOTALL)
    if m and 'StatusPublisher Solution Breakdown' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_task_sol)

    return html

# ---------------------------------------------------------------------------
# LESSON 12
# ---------------------------------------------------------------------------
def enrich_lesson_12(html):
    # 1. Offline Bag Reader Python script
    target_bag_pre = '<p>You can write Python scripts to parse bags for post-mission telemetry analytics (e.g., maximum speed, total distance traveled):</p>'
    briefing_bag = make_mission_briefing(
        title="Offline Flight Telemetry Extraction &amp; Mission Analytics",
        context="When an Autonomous Mobile Robot experiences an unexpected collision, a wheel slippage incident, or a localization divergence, engineers cannot debug the live robot on the warehouse floor. Like the 'black box' flight data recorder on an aircraft, every sensor reading, velocity command, and coordinate transform is recorded to disk for forensic post-incident analysis.",
        why_arch="The <code>rosbag2_py</code> Python API enables direct programmatic access to recorded rosbag files (SQLite3 or MCAP). Instead of playing back bags in real-time, offline Python scripts iterate through gigabytes of recorded telemetry at native disk speeds to calculate KPIs, verify odometry drift, or generate automated safety audit reports.",
        objective="Construct a Python script using <code>rosbag2_py</code> that opens a recorded mission rosbag, deserializes <code>geometry_msgs/msg/Twist</code> and <code>nav_msgs/msg/Odometry</code> messages, and computes total distance traveled and maximum velocity achieved.",
        icon="📼"
    )
    if target_bag_pre in html and 'Mission Briefing: Offline Flight Telemetry Extraction' not in html:
        html = html.replace(target_bag_pre, briefing_bag + '\n' + target_bag_pre)

    breakdown_bag = make_code_breakdown(
        title="rosbag2_py Reader Mechanics",
        intro="How programmatic rosbag inspection operates in Python:",
        items=[
            ("SequentialReader Allocation", "<code>reader = rosbag2_py.SequentialReader()</code> initializes the C++ underlying bag parser, configured with <code>StorageOptions(uri=bag_path, storage_id='sqlite3')</code>."),
            ("Type Introspection & Deserialization", "Messages inside the bag are stored as serialized CDR binary blobs. Calling <code>deserialize_message(data, Twist)</code> deserializes the raw bytes into a Python object using the type's C-introspection support."),
            ("High-Throughput Analytics", "Because playback is decoupled from wall-clock time, post-mission analysis scripts can process a 30-minute warehouse mission in less than 2 seconds.")
        ]
    )
    pattern_bag_end = r'(Offline Bag Reader: Iterates through recorded messages.*?</code></pre>\s*</div>)'
    m = re.search(pattern_bag_end, html, re.DOTALL)
    if m and 'rosbag2_py Reader Mechanics' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_bag)

    # 2. Student Challenge: Rosbag Automation
    target_task_pre = '<h3 id="71-starter-template">'
    briefing_task = make_mission_briefing(
        title="Automated Flight Recording &amp; Fleet Telemetry Audit",
        context="In enterprise AMR operations, logging must occur automatically during deployment runs without manual terminal intervention. Automation scripts initiate scoped recordings when an autonomous mission begins, capture critical topics, and compress the resulting bag archive for cloud upload upon docking.",
        why_arch="Using shell automation or Python supervisor wrappers around <code>ros2 bag record</code> ensures that topic filters, maximum file splits, and storage formats (MCAP) are consistently configured across hundreds of deployed robots.",
        objective="Complete <code>m02_l12_task_bag_recorder.sh</code> to automate rosbag recording of <code>/cmd_vel</code>, <code>/odom</code>, and <code>/scan</code>, verify file creation, and validate bag metadata integrity.",
        icon="🎯"
    )
    if target_task_pre in html and 'Mission Briefing: Automated Flight Recording' not in html:
        html = html.replace(target_task_pre, briefing_task + '\n' + target_task_pre)

    return html

# ---------------------------------------------------------------------------
# LESSON 15
# ---------------------------------------------------------------------------
def enrich_lesson_15(html):
    target_tf_pre = '<h3 id="71-starter-template">'
    briefing_tf = make_mission_briefing(
        title="Kinematic Coordinate Frame Broadcaster for Sensor Offsets",
        context="An Autonomous Mobile Robot does not perceive the world from its geometric center (`base_link`). Its LiDAR may be mounted 15 cm forward and 25 cm above ground; its ultrasonic sensors may be angled 15 degrees outward on the front bumper. If sensor data is not geometrically transformed into the vehicle's reference frame, obstacle avoidance algorithms will misjudge clearance by tens of centimeters!",
        why_arch="ROS 2 uses the <strong>TF2 Transform Library</strong> to maintain a dynamic 3D tree of coordinate frames according to REP 103 conventions (X-forward, Y-left, Z-up). For rigidly mounted sensors, a <strong>Static Transform Broadcaster</strong> publishes the translation vector $(x, y, z)$ and orientation quaternion $(q_x, q_y, q_z, q_w)$ once with high-frequency caching, ensuring zero spatial drift.",
        objective="Construct the <code>StaticTFBroadcaster</code> node. Define the physical 3D offset between <code>base_link</code> and <code>laser_frame</code>, convert Roll-Pitch-Yaw angles into a normalized orientation quaternion, and broadcast the transform via <code>tf2_ros.StaticTransformBroadcaster</code>.",
        icon="📐"
    )
    if target_tf_pre in html and 'Mission Briefing: Kinematic Coordinate Frame Broadcaster' not in html:
        html = html.replace(target_tf_pre, briefing_tf + '\n' + target_tf_pre)

    breakdown_tf_sol = make_code_breakdown(
        title="StaticTFBroadcaster Solution Breakdown",
        intro="Key spatial kinematic mechanics of the Static TF Broadcaster:",
        items=[
            ("REP 103 Standard Alignment", "ROS coordinate conventions mandate that $X$ points forward, $Y$ points left, and $Z$ points upward. Sensor offsets must follow this frame orientation to ensure point clouds project correctly in RViz2."),
            ("Euler to Quaternion Conversion", "Orientation in 3D space is represented using 4-element quaternions $(x, y, z, w)$ to prevent gimbal lock. The helper function computes the quaternion from Euler angles $(\\text{roll}, \\text{pitch}, \\text{yaw})$."),
            ("Static Latching & Zero CPU Overhead", "Unlike dynamic transforms (odometry) that stream at 50 Hz, <code>StaticTransformBroadcaster</code> publishes to <code>/tf_static</code> with a <code>TRANSIENT_LOCAL</code> QoS profile. It sends the message once and DDS latches it for any node that joins later.")
        ]
    )
    pattern_tf_sol_end = r'(m03_l15_02_solution_static_tf_broadcaster\.py.*?</code></pre>\s*</div>\s*</div>\s*</details>)'
    m = re.search(pattern_tf_sol_end, html, re.DOTALL)
    if m and 'StaticTFBroadcaster Solution Breakdown' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_tf_sol)

    return html

# ---------------------------------------------------------------------------
# LESSON 16
# ---------------------------------------------------------------------------
def enrich_lesson_16(html):
    target_odom_pre = '<h3 id="71-starter-template">'
    briefing_odom = make_mission_briefing(
        title="Differential Drive Odometer &amp; Kinematic Tracking Validator",
        context="Differential drive AMRs steer by varying the relative speeds of their left and right wheels. As the robot traverses a factory floor, onboard optical wheel encoders report rotational displacement. To maintain an accurate estimate of where the robot is located relative to its starting dock (`odom` frame), dead-reckoning equations integrate these encoder pulses over time.",
        why_arch="The <code>nav_msgs/msg/Odometry</code> interface packages both the robot's 2D/3D pose $(x, y, \\theta)$ and its instantaneous linear and angular twist velocities $(v_x, v_y, \\omega_z)$, alongside 36-element covariance matrices that quantify measurement uncertainty. Downstream SLAM and EKF sensor fusion algorithms rely directly on this telemetry.",
        objective="Implement the <code>DiffDriveTelemetry</code> node. In a 20 Hz control loop, apply forward Euler kinematic integration to compute displacement from wheel velocities, construct the <code>Odometry</code> message, and broadcast the dynamic TF transform from <code>odom</code> to <code>base_link</code>.",
        icon="🚜"
    )
    if target_odom_pre in html and 'Mission Briefing: Differential Drive Odometer' not in html:
        html = html.replace(target_odom_pre, briefing_odom + '\n' + target_odom_pre)

    breakdown_odom_sol = make_code_breakdown(
        title="Differential Drive Odometry Solution Breakdown",
        intro="Kinematic integration mechanics in the Differential Drive Odometer:",
        items=[
            ("Forward Kinematics Integration", "For linear velocity $v$ and angular velocity $\\omega$ over time $\\Delta t$: $\\Delta x = v \\cos(\\theta) \\Delta t$, $\\Delta y = v \\sin(\\theta) \\Delta t$, $\\Delta \\theta = \\omega \\Delta t$. The node accumulates these increments on every tick."),
            ("Coordinate Frame Dual Delivery", "The node publishes both the <code>nav_msgs/Odometry</code> data topic for numerical analysis and the dynamic coordinate transform over <code>/tf</code> (parent: <code>odom</code>, child: <code>base_footprint</code>), enabling visual tracking in RViz2."),
            ("Covariance Matrix Conditioning", "Real sensors suffer from wheel slip and mechanical tolerances. Setting diagonal covariance values ($0.001$ for position, $0.001$ for yaw) informs downstream Kalman filters of the sensor's measurement certainty.")
        ]
    )
    pattern_odom_sol_end = r'(m03_l16_02_solution_diff_drive_telemetry\.py.*?</code></pre>\s*</div>\s*</div>\s*</details>)'
    m = re.search(pattern_odom_sol_end, html, re.DOTALL)
    if m and 'Differential Drive Odometry Solution Breakdown' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_odom_sol)

    return html

# ---------------------------------------------------------------------------
# LESSON 19
# ---------------------------------------------------------------------------
def enrich_lesson_19(html):
    target_costmap_pre = '<h3 id="61-starter-template">'
    briefing_costmap = make_mission_briefing(
        title="Nav2 Costmap 2D Safety Buffer &amp; Inflation Validator",
        context="In autonomous warehouse navigation, treating a mobile robot as a dimensionless mathematical point causes severe collisions: while the robot's center point might clear an aisle corner, its chassis corners or cargo overhang will clip racking pillars! Costmaps solve this by expanding obstacles into artificial danger zones.",
        why_arch="The <strong>Nav2 Costmap 2D</strong> stack layers sensory data into a 2D occupancy grid: Static Layer (walls), Obstacle Layer (dynamic objects from LiDAR), and the <strong>Inflation Layer</strong>. The inflation layer inflates lethal obstacles ($254$) outward through an Inscribed Radius ($253$) and an exponential cost decay ($252 \\rightarrow 1$) to establish safe navigational margins.",
        objective="Construct the <code>CostmapValidator</code> node. Sample local costmap grid cells around the AMR's footprint, evaluate cell cost values against safety clearance thresholds, and emit diagnostic warnings when obstacles encroach within the robot's safety buffer.",
        icon="🗺️"
    )
    if target_costmap_pre in html and 'Mission Briefing: Nav2 Costmap 2D Safety Buffer' not in html:
        html = html.replace(target_costmap_pre, briefing_costmap + '\n' + target_costmap_pre)

    breakdown_costmap_sol = make_code_breakdown(
        title="CostmapValidator Solution Breakdown",
        intro="Operational principles of Costmap 2D inflation auditing:",
        items=[
            ("Inflation Layer Mathematics", "Cost decays exponentially: $\\text{cost} = 253 \\cdot e^{-\\alpha \\cdot (d - r_{\\text{inscribed}})}$. Cells with cost $\\ge 253$ represent lethal robot footprint collisions."),
            ("Safety Clearance Auditing", "The validator inspects cost values along the vehicle's projected travel corridor. If costs exceed clearance thresholds ($> 128$), it flags an imminent slowdown to prevent emergency stops."),
            ("Real-Time Footprint Expansion", "When transporting oversized payloads, updating the costmap <code>footprint</code> parameter dynamically expands the lethal inflation boundary to protect the payload edges.")
        ]
    )
    pattern_costmap_sol_end = r'(m04_l19_02_solution_costmap_validator\.py.*?</code></pre>\s*</div>\s*</div>\s*</details>)'
    m = re.search(pattern_costmap_sol_end, html, re.DOTALL)
    if m and 'CostmapValidator Solution Breakdown' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_costmap_sol)

    return html

# ---------------------------------------------------------------------------
# LESSON 20
# ---------------------------------------------------------------------------
def enrich_lesson_20(html):
    target_tuner_pre = '<h3 id="61-starter-template">'
    briefing_tuner = make_mission_briefing(
        title="Trajectory Tracking Error &amp; Dynamic Velocity Governor",
        context="Nav2 separates autonomous navigation into two decoupled tiers: the Global Path Planner computes an optimal route across the static map (e.g. NavFn or SmacPlanner), while the Local Controller (e.g. DWB or Regulated Pure Pursuit) drives wheel actuators along that path at 20 Hz while dodging dynamic obstacles.",
        why_arch="If a robot encounters a tight 90-degree corner or sudden cross-track deviation, maintaining full speed causes wheel slip, controller oscillation, or wall scraping. A dynamic velocity governor calculates instantaneous curvature and cross-track tracking error, automatically throttling linear velocity on sharp bends.",
        objective="Implement the <code>ControllerTuner</code> node. Subscribe to the global path and robot odometry, calculate cross-track tracking error and heading deviation, and dynamically compute safe velocity scale limits to prevent corner skidding.",
        icon="🎯"
    )
    if target_tuner_pre in html and 'Mission Briefing: Trajectory Tracking Error' not in html:
        html = html.replace(target_tuner_pre, briefing_tuner + '\n' + target_tuner_pre)

    breakdown_tuner_sol = make_code_breakdown(
        title="ControllerTuner Solution Breakdown",
        intro="Key algorithmic concepts of the Velocity Governor solution:",
        items=[
            ("Cross-Track Error (CTE) Calculation", "Computes perpendicular Euclidean distance from the robot's current pose to the nearest segment of the planned global trajectory spline."),
            ("Curvature-Regulated Velocity Scaling", "Following Regulated Pure Pursuit principles: on sharp bends (high curvature $\\kappa$), maximum permissible speed is clamped via $v_{\\text{max}} = \\min(v_{\\text{nominal}}, \\sqrt{a_{\\text{lateral}} / \\kappa})$ to prevent skidding."),
            ("Closed-Loop Feedback Regulation", "Dynamic scaling factors are published to supervisory topics or velocity multiplexers (<code>twist_mux</code>) to guarantee smooth, oscillation-free trajectory tracking.")
        ]
    )
    pattern_tuner_sol_end = r'(m04_l20_02_solution_controller_tuner\.py.*?</code></pre>\s*</div>\s*</div>\s*</details>)'
    m = re.search(pattern_tuner_sol_end, html, re.DOTALL)
    if m and 'ControllerTuner Solution Breakdown' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_tuner_sol)

    return html

# ---------------------------------------------------------------------------
# LESSON 21
# ---------------------------------------------------------------------------
def enrich_lesson_21(html):
    target_recov_pre = '<h3 id="61-starter-template">'
    briefing_recov = make_mission_briefing(
        title="Nav2 Behavior Tree &amp; Recovery Behavior Supervisor",
        context="In an active warehouse, paths get blocked: workers leave carts in aisles, roll doors close unexpectedly, or GPS/localization drifts. A naive robot would simply give up and halt. A commercial AMR must execute systematic recovery behaviors: clear costmaps to remove phantom obstacles, spin 360 degrees to relocalize, or back up 0.5 meters to find clear space.",
        why_arch="Nav2 orchestrates navigation using <strong>Behavior Trees (BTs)</strong> rather than brittle finite state machines. Behavior Tree control nodes (Fallbacks, Sequences, Reactive Sequences) tick condition and action nodes periodically. If navigation fails, a Fallback node automatically escalates through a recovery pipeline without requiring custom state code.",
        objective="Construct the <code>RecoveryMonitor</code> node. Track Nav2 Behavior Tree execution ticks, identify path planning stalls, detect when recovery actions (Clear Costmap, Spin, Back Up) trigger, and verify that managed lifecycle nodes remain in the ACTIVE operational state.",
        icon="🌳"
    )
    if target_recov_pre in html and 'Mission Briefing: Nav2 Behavior Tree' not in html:
        html = html.replace(target_recov_pre, briefing_recov + '\n' + target_recov_pre)

    breakdown_recov_sol = make_code_breakdown(
        title="RecoveryMonitor Solution Breakdown",
        intro="Key takeaways from Nav2 Behavior Tree & Recovery supervision:",
        items=[
            ("BT Execution Semantics", "Behavior Trees execute by ticking root nodes at regular intervals (10 Hz). Control nodes evaluate child statuses: <code>SUCCESS</code>, <code>FAILURE</code>, or <code>RUNNING</code>."),
            ("Recovery Pipeline Escalation", "When the path planner returns <code>FAILURE</code>, the BT Fallback node triggers recovery actions in ordered sequence: 1) Clear entire local costmap; 2) Spin in place 45 degrees; 3) Back up 0.5 meters. If all fail, the mission aborts safely."),
            ("Managed Lifecycle Node Auditing", "Nav2 nodes inherit from <code>rclcpp_lifecycle::LifecycleNode</code>. If an unexpected fault occurs, the node transitions to <code>UNCONFIGURED</code> or <code>ERROR</code>, which the supervisor detects via lifecycle query services.")
        ]
    )
    pattern_recov_sol_end = r'(m04_l21_02_solution_recovery_monitor\.py.*?</code></pre>\s*</div>\s*</div>\s*</details>)'
    m = re.search(pattern_recov_sol_end, html, re.DOTALL)
    if m and 'RecoveryMonitor Solution Breakdown' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_recov_sol)

    return html

# ---------------------------------------------------------------------------
# LESSON 22
# ---------------------------------------------------------------------------
def enrich_lesson_22(html):
    # 1. Section 4: Complete Autonomous Patrol Script Walkthrough
    target_nav2_pre = '<h2 id="4-complete-autonomous-patrol-script-walkthrough">4. Complete Autonomous Patrol Script Walkthrough</h2>'
    briefing_nav2 = make_mission_briefing(
        title="Autonomous Mission Orchestration with Nav2 Simple Commander",
        context="In commercial AMR deployments, operators do not click navigation goals in RViz2. Mobile robots receive automated dispatch orders from Warehouse Management Systems (WMS): 'Depart charging dock, navigate to Staging Area A, pause for pallet loading, traverse to Drop-off Dock 3, return to home base'.",
        why_arch="The <strong>Nav2 Simple Commander API</strong> (<code>BasicNavigator</code>) provides a clean, asynchronous Python mission scripting interface over the entire Nav2 action stack. It abstracts goal dispatch (<code>goToPose</code>, <code>followWaypoints</code>), task preemption, battery docking, and recovery watchdog monitors into an elegant imperative API.",
        objective="Construct an autonomous warehouse patrol mission in Python using <code>BasicNavigator</code>. Initialize pose estimates, dispatch sequential navigation waypoints, audit transit progress in a non-blocking loop, handle recovery timeouts, and dock cleanly upon mission completion.",
        icon="🗺️"
    )
    if target_nav2_pre in html and 'Mission Briefing: Autonomous Mission Orchestration' not in html:
        html = html.replace(target_nav2_pre, target_nav2_pre + '\n' + briefing_nav2)

    breakdown_nav2 = make_code_breakdown(
        title="BasicNavigator Patrol Script Mechanics",
        intro="Key methods of the Nav2 Python Mission Scripting API:",
        items=[
            ("Lifecycle Initialization", "<code>navigator.waitUntilNav2Active()</code> blocks until all Nav2 managed lifecycle nodes (planner, controller, BT navigator, costmaps) transition to the <code>ACTIVE</code> state."),
            ("Asynchronous Trajectory Dispatch", "<code>navigator.goToPose(goal_pose)</code> submits the navigation action goal asynchronously, allowing the Python script to run continuous watchdog checks during transit."),
            ("Watchdog & Timeout Supervision", "In <code>while not navigator.isTaskComplete():</code>, tracking elapsed time and checking <code>navigator.getFeedback()</code> detects robot stalls or path blockages before hardware damage occurs."),
            ("Mission Result Audit", "<code>result = navigator.getResult()</code> evaluates whether the robot reached the destination (<code>TaskResult.SUCCEEDED</code>), canceled, or failed, allowing immediate fallback to recovery behaviors.")
        ]
    )
    pattern_nav2_end = r'(Autonomous Multi-Waypoint Warehouse Patrol Script.*?</code></pre>\s*</div>)'
    m = re.search(pattern_nav2_end, html, re.DOTALL)
    if m and 'BasicNavigator Patrol Script Mechanics' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_nav2)

    # 2. Section 6: Student Challenge: Multi-Waypoint Patrol Mission
    target_task_pre = '<h3 id="61-starter-template">'
    briefing_task = make_mission_briefing(
        title="Multi-Checkpoint Autonomous Warehouse Patrol Mission Challenge",
        context="Warehouse inspection AMRs must navigate complex multi-stop routes: inspect fire extinguishers at Checkpoint 1, check freezer temperature at Checkpoint 2, verify shelf stock at Checkpoint 3, and return to charging station. If an aisle is blocked, the robot must not loop indefinitely; it must timeout cleanly and report the blockage.",
        why_arch="Using <code>BasicNavigator.followWaypoints(poses)</code> dispatches an entire route to Nav2 in a single action goal. The Nav2 waypoint follower handles sequential pose transitions, pause intervals, and task execution at each station.",
        objective="Complete <code>m04_l22_02_task_multi_waypoint_patrol.py</code> to assemble 3 patrol waypoints, configure feedback monitoring with a 60-second transit watchdog, and execute an autonomous inspection tour with docking return.",
        icon="🏁"
    )
    if target_task_pre in html and 'Mission Briefing: Multi-Checkpoint Autonomous Warehouse' not in html:
        html = html.replace(target_task_pre, briefing_task + '\n' + target_task_pre)

    breakdown_task_sol = make_code_breakdown(
        title="Multi-Waypoint Patrol Solution Breakdown",
        intro="Key mechanics of the Multi-Waypoint Patrol solution:",
        items=[
            ("Multi-Pose Waypoint List Generation", "Constructs a sequence of <code>PoseStamped</code> goals with position $(x, y)$ and orientation quaternion $(\\text{yaw})$, representing the target coordinates in the <code>map</code> frame."),
            ("Watchdog Timer Protection", "The loop computes <code>elapsed_time = time.time() - start_time</code>. If elapsed time exceeds 60 seconds without completing the leg, the script calls <code>navigator.cancelTask()</code> to prevent battery exhaustion."),
            ("Docking Return Sequence", "Upon successfully visiting all inspection checkpoints, the script commands a final trajectory back to the origin dock pose $(0.0, 0.0, 0.0)$, verifying completion before shutting down.")
        ]
    )
    pattern_task_sol_end = r'(m04_l22_03_solution_multi_waypoint_patrol\.py.*?</code></pre>\s*</div>\s*</div>\s*</details>)'
    m = re.search(pattern_task_sol_end, html, re.DOTALL)
    if m and 'Multi-Waypoint Patrol Solution Breakdown' not in html:
        matched = m.group(1)
        html = html.replace(matched, matched + '\n' + breakdown_task_sol)

    return html

def main():
    print("Loading lessonsData.json...")
    with open(LESSONS_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for lesson in data['lessons']:
        lid = lesson['id']
        content = lesson.get('html_content', '')
        old_len = len(content)

        if lid == 'lesson_11':
            content = enrich_lesson_11(content)
        elif lid == 'lesson_12':
            content = enrich_lesson_12(content)
        elif lid == 'lesson_15':
            content = enrich_lesson_15(content)
        elif lid == 'lesson_16':
            content = enrich_lesson_16(content)
        elif lid == 'lesson_19':
            content = enrich_lesson_19(content)
        elif lid == 'lesson_20':
            content = enrich_lesson_20(content)
        elif lid == 'lesson_21':
            content = enrich_lesson_21(content)
        elif lid == 'lesson_22':
            content = enrich_lesson_22(content)

        lesson['html_content'] = content
        if len(content) != old_len:
            print(f"Updated {lid}: {old_len} -> {len(content)} bytes (+{len(content) - old_len})")

    print("Saving updated lessonsData.json...")
    with open(LESSONS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Successfully enriched curriculum!")

if __name__ == '__main__':
    main()
