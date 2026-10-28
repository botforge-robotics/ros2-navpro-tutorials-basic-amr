#!/usr/bin/env python3
import json
import os
import re

repo_dir = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr'
json_path = os.path.join(repo_dir, 'lms/src/data/lessonsData.json')

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 1. Lesson 03 HTML Content Construction
l03_objectives_card = """<section class="lesson-section">
<div class="learning-objectives-card">
  <div class="learning-objectives-header">
    <div class="objectives-icon-badge">
      <span style="font-size: 1.15rem; line-height: 1;">🎯</span>
    </div>
    <div class="objectives-title-group">
      <h3 class="objectives-main-title">Learning Objectives &amp; Core Outcomes</h3>
      <span class="objectives-subtitle">By the end of this lesson, you will be able to:</span>
    </div>
    <span class="objectives-count-badge">7 CORE OUTCOMES</span>
  </div>
  <ul class="learning-objectives-list">
    <li class="learning-objective-item">
      <span class="objective-num-badge">1</span>
      <span class="objective-text">Launch and interact with simulated robotic nodes using <code class="inline-code">ros2 run</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">2</span>
      <span class="objective-text">Inspect active nodes in the computation graph using <code class="inline-code">ros2 node list</code> and <code class="inline-code">ros2 node info</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">3</span>
      <span class="objective-text">Monitor data streams using <code class="inline-code">ros2 topic list</code>, <code class="inline-code">ros2 topic echo</code>, and <code class="inline-code">ros2 topic hz</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">4</span>
      <span class="objective-text">Deconstruct interface definitions with <code class="inline-code">ros2 topic type</code> and <code class="inline-code">ros2 interface show</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">5</span>
      <span class="objective-text">Manually steer the robot by injecting velocity commands with <code class="inline-code">ros2 topic pub</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">6</span>
      <span class="objective-text">Visualize the live peer-to-peer DDS computational graph with <code class="inline-code">rqt_graph</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">7</span>
      <span class="objective-text">Perform runtime parameter tuning, dynamic pen configuration, and emergency braking.</span>
    </li>
  </ul>
</div>
</section>"""

l03_body = """<section class="lesson-section">
<h2 id="1-overview-learning-objectives">1. Overview &amp; Learning Objectives</h2>
<p>Before writing code from scratch, professional robotics engineers first master live runtime introspection tools. In this lesson, you will interact with <strong>Turtlesim</strong>—the canonical robotics simulation sandbox built into ROS 2—and drive a simulated robot purely from the terminal while introspecting its underlying computational graph.</p>
</section>

<section class="lesson-section">
<h2 id="2-launching-turtlesim-the-simulation-playground">2. Launching Turtlesim: The Simulation Playground</h2>
<p>Turtlesim provides a visual 2D simulation canvas representing a differential-drive robot (<code class="inline-code">/turtle1</code>). It exposes topics for velocity control, pose telemetry, color sensor feeds, and services for resets and pen drawing.</p>
<p>Open your first terminal (or Terminator top split) and launch the simulation canvas node:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 run turtlesim turtlesim_node</code></pre>
</div>
<p>A blue graphic window will appear displaying a small turtle sitting at the center of a coordinate grid $(x=5.54, y=5.54, \theta=0.0)$.</p>
<p>Open a second terminal (or Terminator bottom split) and launch the keyboard teleoperation node:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 run turtlesim turtle_teleop_key</code></pre>
</div>
<p>With the second terminal focused, press the arrow keys. You will see the turtle drive, turn, and draw an ink trail across the canvas.</p>

<div id="turtlesim-teleop-flow-root"></div>
</section>

<section class="lesson-section">
<h2 id="3-core-concept-1-node-introspection-ros2-node">3. Core Concept 1: Node Introspection (<code class="inline-code">ros2 node</code>)</h2>
<p>In ROS 2, every distinct robotic software function (perception, planning, motor control) runs as an isolated process called a <strong>Node</strong>.</p>
<p>Open a third terminal and query all currently active nodes:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 node list</code></pre>
</div>
<p><strong>Output:</strong></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">/teleop_turtle
/turtlesim</code></pre>
</div>
<p>To inspect everything a node produces, consumes, or exposes, use <code class="inline-code">ros2 node info</code>:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 node info /turtlesim</code></pre>
</div>
<p><strong>Output Breakdown:</strong></p>
<div class="code-container" data-language="yaml">
<div class="code-header"><span class="code-lang-tag">yaml</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-yaml">/turtlesim
  Subscribers:
    /turtle1/cmd_vel: geometry_msgs/msg/Twist    &lt;-- Receives velocity commands
  Publishers:
    /parameter_events: rcl_interfaces/msg/ParameterEvent
    /rosout: rcl_interfaces/msg/Log
    /turtle1/color_sensor: turtlesim/msg/Color  &lt;-- Emits background color under turtle
    /turtle1/pose: turtlesim/msg/Pose          &lt;-- Emits (x, y, theta, linear_velocity)
  Service Servers:
    /clear: std_srvs/srv/Empty                  &lt;-- Clears screen ink trails
    /reset: std_srvs/srv/Empty                  &lt;-- Resets turtle to origin
    /spawn: turtlesim/srv/Spawn                &lt;-- Spawns a second turtle
    /turtle1/set_pen: turtlesim/srv/SetPen      &lt;-- Changes ink color &amp; thickness</code></pre>
</div>

<div class="alert-callout alert-tip">
<div class="alert-icon"></div>
<div class="alert-body"><strong>Production Takeaway:</strong> Whenever an autonomous robot fails to respond to movement commands, your first diagnostic step in production is running <code class="inline-code">ros2 node list</code> and <code class="inline-code">ros2 node info &lt;node&gt;</code> to confirm the motor driver node is alive and subscribing to the correct topic.</div>
</div>
</section>

<section class="lesson-section">
<h2 id="4-core-concept-2-topic-introspection-ros2-topic">4. Core Concept 2: Topic Introspection (<code class="inline-code">ros2 topic</code>)</h2>
<p>Nodes do not talk directly to one another. Instead, they publish and subscribe to named message buses called <strong>Topics</strong>.</p>

<h3 id="41-listing-topics">4.1 Listing Topics</h3>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic list</code></pre>
</div>
<p>To see both the topic names and their message data types simultaneously, add the <code class="inline-code">-t</code> flag:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic list -t</code></pre>
</div>
<p><strong>Output:</strong></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">/parameter_events [rcl_interfaces/msg/ParameterEvent]
/rosout [rcl_interfaces/msg/Log]
/turtle1/cmd_vel [geometry_msgs/msg/Twist]
/turtle1/color_sensor [turtlesim/msg/Color]
/turtle1/pose [turtlesim/msg/Pose]</code></pre>
</div>

<h3 id="42-echoing-live-data-ros2-topic-echo">4.2 Echoing Live Data (<code class="inline-code">ros2 topic echo</code>)</h3>
<p>To listen in real-time to the pose updates emitted by the simulated robot, run:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic echo /turtle1/pose</code></pre>
</div>
<p>Now drive the turtle using the teleop keys. You will see coordinates stream in real time:</p>
<div class="code-container" data-language="yaml">
<div class="code-header"><span class="code-lang-tag">yaml</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-yaml">x: 5.820444583892822
y: 5.544444561004639
theta: 0.0
linear_velocity: 0.0
angular_velocity: 0.0
---</code></pre>
</div>

<h3 id="43-measuring-topic-publishing-frequency-ros2-topic-hz">4.3 Measuring Topic Publishing Frequency (<code class="inline-code">ros2 topic hz</code>)</h3>
<p>Robotics control loops require deterministic frequencies. You can audit how frequently a sensor is publishing:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic hz /turtle1/pose</code></pre>
</div>
<p><strong>Output:</strong></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">average rate: 62.503
	min: 0.015s max: 0.017s std dev: 0.00049s window: 64</code></pre>
</div>
<p><em>Turtlesim publishes pose updates at ~62.5 Hz.</em></p>
</section>

<section class="lesson-section">
<h2 id="5-core-concept-3-topic-interface-types-ros2-interface">5. Core Concept 3: Topic Interface Types (<code class="inline-code">ros2 interface</code>)</h2>
<p>Every topic requires a strictly typed contract defined in ROS 2 IDL (Interface Definition Language).</p>
<p>Notice that <code class="inline-code">/turtle1/cmd_vel</code> uses the type <code class="inline-code">geometry_msgs/msg/Twist</code>. What fields does that message actually contain?</p>
<p>Query the interface definition directly:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 interface show geometry_msgs/msg/Twist</code></pre>
</div>
<p><strong>Output:</strong></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text"># This expresses velocity in free space broken into its linear and angular parts.

Vector3  linear
	float64 x
	float64 y
	float64 z
Vector3  angular
	float64 x
	float64 y
	float64 z</code></pre>
</div>
<p>For a ground robot (differential drive AMR or Turtle), <code class="inline-code">linear.x</code> moves forward/backward, and <code class="inline-code">angular.z</code> steers left/right.</p>
</section>

<section class="lesson-section">
<h2 id="6-moving-the-robot-hands-on-via-cli-ros2-topic-pub">6. Moving the Robot Hands-On via CLI (<code class="inline-code">ros2 topic pub</code>)</h2>
<p>You do not need a teleop node or a Python script to command a robot. You can inject messages directly onto any topic using <code class="inline-code">ros2 topic pub</code>.</p>

<h3 id="61-move-forward-once-once">6.1 Move Forward Once (<code class="inline-code">--once</code>)</h3>
<p>Command the robot to move forward at $2.0\\text{ m/s}$ for one single timestep:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}"</code></pre>
</div>
<p>Notice the turtle surges forward and then comes to a stop.</p>

<h3 id="62-drive-in-a-continuous-circle-r-10">6.2 Drive in a Continuous Circle (<code class="inline-code">-r 10</code>)</h3>
<p>To command the robot to drive in a continuous circle, publish velocity commands at a steady rate of $10\\text{ Hz}$ (<code class="inline-code">-r 10</code>):</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic pub -r 10 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"</code></pre>
</div>
<p>The turtle will drive in a circular loop, drawing an ink circle. Press <kbd>Ctrl + C</kbd> in the terminal to stop publishing.</p>
</section>

<section class="lesson-section">
<h2 id="7-visualizing-the-computational-graph-rqt_graph">7. Visualizing the Computational Graph (<code class="inline-code">rqt_graph</code>)</h2>
<p>ROS 2 includes an interactive GUI graph visualizer. In a new terminal, launch <code class="inline-code">rqt_graph</code>:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">rqt_graph</code></pre>
</div>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">   [ /teleop_turtle ] --------(/turtle1/cmd_vel)--------&gt; [ /turtlesim ]</code></pre>
</div>
<ul>
<li><strong>Ovals</strong> represent active <strong>Nodes</strong>.</li>
<li><strong>Rectangles / Arrows</strong> represent active <strong>Topics</strong> routing data between publishers and subscribers.</li>
<li>If a node is not connected to a topic arrow, it indicates an interface mismatch or topic name typo.</li>
</ul>
</section>

<section class="lesson-section">
<h2 id="8-summary-comparison-table-of-essential-cli-tools">8. Summary Comparison Table of Essential CLI Tools</h2>
<div class="table-responsive"><table>
<thead>
<tr>
<th>Command</th>
<th>Purpose</th>
<th>Production Use Case</th>
</tr>
</thead>
<tbody>
<tr>
<td><code class="inline-code">ros2 run &lt;pkg&gt; &lt;executable&gt;</code></td>
<td>Launches a specific executable node from a package</td>
<td>Starting drivers, simulators, or single test scripts</td>
</tr>
<tr>
<td><code class="inline-code">ros2 node list</code></td>
<td>Lists all active nodes across the network</td>
<td>Auditing if all expected subsystem nodes are alive</td>
</tr>
<tr>
<td><code class="inline-code">ros2 node info &lt;node&gt;</code></td>
<td>Details subscribers, publishers, services, and actions</td>
<td>Verifying interface names and endpoint wiring</td>
</tr>
<tr>
<td><code class="inline-code">ros2 topic list -t</code></td>
<td>Lists all active topics with their message types</td>
<td>Discovering sensor and telemetry buses</td>
</tr>
<tr>
<td><code class="inline-code">ros2 topic echo &lt;topic&gt;</code></td>
<td>Prints incoming message payloads to the console</td>
<td>Live debugging of sensor values or trajectory points</td>
</tr>
<tr>
<td><code class="inline-code">ros2 topic hz &lt;topic&gt;</code></td>
<td>Measures publish rate in Hertz</td>
<td>Verifying camera / LiDAR sensor update rates</td>
</tr>
<tr>
<td><code class="inline-code">ros2 interface show &lt;type&gt;</code></td>
<td>Shows message fields and structural types</td>
<td>Inspecting data format before writing Python code</td>
</tr>
<tr>
<td><code class="inline-code">ros2 topic pub &lt;topic&gt; &lt;type&gt; &lt;yaml&gt;</code></td>
<td>Injects messages onto a topic from the CLI</td>
<td>Testing actuators or emergency stop commands</td>
</tr>
</tbody>
</table></div>
</section>

<section class="lesson-section">
<h2 id="9-hands-on-student-challenge-turtlesim-operations">9. Hands-On Student Lab: The Turtlesim Operations Mission</h2>

<div class="alert alert-info">
  <div class="alert-icon">🎯</div>
  <div class="alert-content">
    <div class="alert-title">Robotics Flight Operations Mission Briefing</div>
    <div class="alert-body">
      As an autonomous robotics software engineer, you rarely touch physical buttons on a robot. Instead, you orchestrate sensors, motors, and runtime graphs entirely through the command-line interface.
      <br><br>
      In this comprehensive student lab, you will apply the complete suite of ROS 2 CLI tools (<strong>ros2 run</strong>, <strong>ros2 node</strong>, <strong>ros2 topic</strong>, <strong>ros2 service</strong>, and <strong>ros2 param</strong>) across 2 focused flight phases: environment calibration &amp; parameters, and continuous velocity streaming &amp; telemetry auditing!
    </div>
  </div>
</div>

<h3 id="phase-1-environment-calibration">Phase 1: Environment Calibration &amp; Dynamic Reconfiguration</h3>
<p>Professional robotics testbeds allow engineers to adjust simulation parameters on the fly without recompiling or restarting nodes. First, calibrate your simulation canvas and robot pen:</p>

<ol>
<li>Launch Turtlesim in your desktop simulation window (if not already running):</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 run turtlesim turtlesim_node</code></pre>
</div>

<ol start="2">
<li>In your terminal, list all parameters exposed by the <code class="inline-code">/turtlesim</code> node:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 param list /turtlesim</code></pre>
</div>

<ol start="3">
<li>Switch the canvas from default blue to a professional <strong>Night-Ops Dark Navy</strong> theme (<code class="inline-code">#0f172a</code> &rarr; RGB: 15, 23, 42):</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 param set /turtlesim background_r 15
ros2 param set /turtlesim background_g 23
ros2 param set /turtlesim background_b 42</code></pre>
</div>

<ol start="4">
<li>Parameters update internal state, but Turtlesim requires a background clear request to re-render. Invoke the <code class="inline-code">/clear</code> service:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 service call /clear std_srvs/srv/Empty</code></pre>
</div>
<p>Observe the simulation canvas instantly transform into a sleek dark background!</p>

<ol start="5">
<li>Reconfigure <code class="inline-code">turtle1</code>'s pen to draw high-visibility neon electric cyan ink with a crisp <strong>4 px</strong> line width:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 service call /turtle1/set_pen turtlesim/srv/SetPen "{r: 56, g: 189, b: 248, width: 4, 'off': 0}"</code></pre>
</div>

<hr class="divider">

<h3 id="phase-2-velocity-reality-check">Phase 2: The Velocity Reality Check &amp; Continuous Streaming</h3>

<div class="alert alert-warning">
  <div class="alert-icon">⚠️</div>
  <div class="alert-content">
    <div class="alert-title">Robotics Engineering Principle: Velocity Rates vs. Discrete Targets</div>
    <div class="alert-body">
      A common misconception is assuming publishing a single <code class="inline-code">Twist</code> command with <code class="inline-code">angular.z = 1.5708</code> will make a robot turn exactly 90 degrees. <strong>It will not!</strong>
      <br><br>
      A <code class="inline-code">geometry_msgs/msg/Twist</code> represents <strong>instantaneous velocities</strong> (linear speed in <strong>m/s</strong> and rotational velocity in <strong>rad/s</strong>). Without closed-loop feedback controllers (which calculate continuous time integrals and stop the motors based on real-time <code class="inline-code">/turtle1/pose</code> feedback—which you will program in Python in Lesson 05), open-loop commands drift and overshoot.
    </div>
  </div>
</div>

<p>Now, test continuous publishing and deterministic frequency auditing:</p>

<ol>
<li>Open a terminal and stream continuous velocity commands at a deterministic <strong>10 Hz</strong> rate (<code class="inline-code">-r 10</code>) to drive the turtle in an unbroken patrol circle:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic pub -r 10 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0}, angular: {z: 1.2}}"</code></pre>
</div>

<ol start="2">
<li>In a second terminal, audit the real-time stream rate to verify clock determinism:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic hz /turtle1/cmd_vel</code></pre>
</div>
<p>Verify that the output displays an average rate of <strong>~10.0 Hz</strong>.</p>

<ol start="3">
<li>Sample the live odometry pose coordinates emitted by the robot:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic echo --once /turtle1/pose</code></pre>
</div>

<ol start="4">
<li>Execute emergency braking by publishing an empty zero velocity Twist vector:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{}"</code></pre>
</div>

<div class="alert alert-tip" style="margin-top: 1.5rem;">
  <div class="alert-icon">🏆</div>
  <div class="alert-content">
    <div class="alert-title">Mission Complete: Key Competencies Mastered</div>
    <div class="alert-body">
      Congratulations! You have verified the essential CLI command families that make up daily ROS 2 engineering practice:
      <ul>
        <li><strong>Node Control:</strong> Inspected active graph participants (<code class="inline-code">ros2 node list/info</code>).</li>
        <li><strong>Topic Telemetry:</strong> Listened to sensor streams and validated frequency clocks (<code class="inline-code">ros2 topic echo/hz</code>).</li>
        <li><strong>Actuator Commands:</strong> Broadcast streaming velocity vectors (<code class="inline-code">ros2 topic pub -r 10</code>) and executed emergency braking (<code class="inline-code">Twist "{}"</code>).</li>
        <li><strong>Service Invocations:</strong> Called discrete request-response triggers (<code class="inline-code">/set_pen</code>, <code class="inline-code">/clear</code>).</li>
        <li><strong>Dynamic Parameters:</strong> Reconfigured node parameters on the fly without restarting (<code class="inline-code">ros2 param set</code>).</li>
      </ul>
      You are now prepared to progress to Lesson 04 to architect your first <strong>ROS 2 Workspace</strong> and build production packages!
    </div>
  </div>
</div>
</section>"""

l03_full_html = l03_objectives_card + "\n\n" + l03_body

# 2. Lesson 04 HTML Content Construction
l04_objectives_card = """<section class="lesson-section">
<div class="learning-objectives-card">
  <div class="learning-objectives-header">
    <div class="objectives-icon-badge">
      <span style="font-size: 1.15rem; line-height: 1;">🎯</span>
    </div>
    <div class="objectives-title-group">
      <h3 class="objectives-main-title">Learning Objectives &amp; Core Outcomes</h3>
      <span class="objectives-subtitle">By the end of this lesson, you will be able to:</span>
    </div>
    <span class="objectives-count-badge">7 CORE OUTCOMES</span>
  </div>
  <ul class="learning-objectives-list">
    <li class="learning-objective-item">
      <span class="objective-num-badge">1</span>
      <span class="objective-text">Understand the four core workspace directories: <code class="inline-code">src/</code>, <code class="inline-code">build/</code>, <code class="inline-code">install/</code>, and <code class="inline-code">log/</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">2</span>
      <span class="objective-text">Master the difference between the <strong>Underlay</strong> (<code class="inline-code">/opt/ros/jazzy</code>) and your development <strong>Overlay</strong> (<code class="inline-code">~/ros2_ws</code>).</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">3</span>
      <span class="objective-text">Build workspaces using <code class="inline-code">colcon build</code> and source them correctly.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">4</span>
      <span class="objective-text">Understand package anatomy (<code class="inline-code">package.xml</code>, <code class="inline-code">setup.py</code>, <code class="inline-code">setup.cfg</code>, <code class="inline-code">resource/</code>).</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">5</span>
      <span class="objective-text">Use package introspection CLI commands (<code class="inline-code">ros2 pkg list</code>, <code class="inline-code">ros2 pkg prefix</code>, <code class="inline-code">ros2 pkg xml</code>).</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">6</span>
      <span class="objective-text">Resolve workspace dependencies automatically using <code class="inline-code">rosdep install --from-paths src --ignore-src -y</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">7</span>
      <span class="objective-text">Scaffold, build, and verify a ROS 2 Python package using <code class="inline-code">ros2 pkg create</code>.</span>
    </li>
  </ul>
</div>
</section>"""

l04_body = """<section class="lesson-section">
<h2 id="1-overview-learning-objectives">1. Overview &amp; Learning Objectives</h2>
<p>Now that you have seen active nodes, topics, and simulation in action, you are ready to build software. In ROS 2, code cannot exist as loose, standalone Python scripts. All production robotics nodes, launch files, parameter configurations, and URDF models must be developed inside a <strong>Workspace</strong> and organized within <strong>Packages</strong>.</p>
</section>

<section class="lesson-section">
<h2 id="2-the-ros-2-workspace-architecture">2. The ROS 2 Workspace Architecture</h2>
<p>A <strong>Workspace</strong> is a dedicated directory on your filesystem where you write, compile, and install custom ROS 2 software. All ROS 2 workspaces follow a strict four-directory hierarchy:</p>

<p><img src="assets/images/ros2_workspace_tree.svg" alt="ROS 2 Workspace Hierarchy" class="lesson-image" loading="lazy" /></p>

<h3 id="key-directory-guide-for-ros2-workspaces">Key Directory Guide for ROS 2 Workspaces</h3>
<div class="info-grid">
  <div class="info-card">
    <div class="card-icon">📁</div>
    <h4><code>src/</code> (Source Code)</h4>
    <p>This is the <strong>only directory you write code in</strong>. You clone git repositories, scaffold packages, and edit Python and C++ source files here.</p>
  </div>
  <div class="info-card">
    <div class="card-icon">⚙️</div>
    <h4><code>build/</code> (Build Artifacts)</h4>
    <p>Created automatically by <code>colcon</code>. Stores intermediate build caches, object files, and build configuration files. Never edit files in this folder manually.</p>
  </div>
  <div class="info-card">
    <div class="card-icon">🚀</div>
    <h4><code>install/</code> (Installed Runtime)</h4>
    <p>Where <code>colcon</code> places executable scripts, shared libraries, installed launch files, and the critical <code>setup.bash</code> sourcing script. ROS 2 executes programs directly from here.</p>
  </div>
  <div class="info-card">
    <div class="card-icon">📊</div>
    <h4><code>log/</code> (Logging &amp; Diagnostics)</h4>
    <p>Contains timestamped execution logs of every <code>colcon build</code> run, invaluable for diagnosing failed builds and missing dependencies.</p>
  </div>
</div>
</section>

<section class="lesson-section">
<h2 id="3-underlays-vs-overlays-the-environment-chaining-model">3. Underlays vs. Overlays: The Environment Chaining Model</h2>
<p>ROS 2 uses an <strong>overlay</strong> mechanism to protect operating system software from custom project changes:</p>

<p><img src="assets/images/ros2_overlay_underlay.svg" alt="ROS 2 Overlay vs Underlay Architecture" class="lesson-image" loading="lazy" /></p>

<ul>
<li><strong>The Underlay (<code class="inline-code">/opt/ros/jazzy</code>):</strong> The system-level ROS 2 installation. Contains core tools (<code class="inline-code">ros2</code>, <code class="inline-code">rclpy</code>), standard message definitions (<code class="inline-code">geometry_msgs</code>), and pre-compiled robotics stacks (Nav2).</li>
<li><strong>The Overlay (<code class="inline-code">~/ros2_ws</code>):</strong> Your private development workspace. When you source <code class="inline-code">~/ros2_ws/install/setup.bash</code>, your workspace <em>overlays</em> on top of the underlay. If you create a custom package with the same name as a system package, your overlay version takes precedence without modifying or breaking <code class="inline-code">/opt/ros/jazzy</code>.</li>
</ul>
</section>

<section class="lesson-section">
<h2 id="4-initializing-building-a-workspace">4. Initializing &amp; Building a Workspace</h2>
<p>Follow these steps directly in your terminal to create and build your first workspace:</p>

<h3 id="step-41-create-the-workspace-directory">Step 4.1: Create the Workspace Directory</h3>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">mkdir -p ~/ros2_ws/src
cd ~/ros2_ws</code></pre>
</div>

<h3 id="step-42-build-the-empty-workspace-with-colcon">Step 4.2: Build the Empty Workspace with <code class="inline-code">colcon</code></h3>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">colcon build</code></pre>
</div>
<p>Verify the generated folders:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ls -F ~/ros2_ws
# Output: build/  install/  log/  src/</code></pre>
</div>

<h3 id="step-43-sourcing-the-overlay-environment">Step 4.3: Sourcing the Overlay Environment</h3>
<p>To make any package built inside <code class="inline-code">~/ros2_ws</code> visible to your current terminal session:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">source ~/ros2_ws/install/setup.bash</code></pre>
</div>

<div class="alert-callout alert-tip">
<div class="alert-icon"></div>
<div class="alert-body"><strong>Automatic Sourcing:</strong> To ensure every new terminal automatically has access to your workspace overlay, append the source command to your <code class="inline-code">~/.bashrc</code>:<br><code class="inline-code">echo "source ~/ros2_ws/install/setup.bash" &gt;&gt; ~/.bashrc</code></div>
</div>
</section>

<section class="lesson-section">
<h2 id="5-what-makes-a-folder-a-ros-2-package">5. What Makes a Folder a ROS 2 Package?</h2>
<p>A <strong>Package</strong> is the fundamental atomic unit of software distribution and compilation in ROS 2. A package contains nodes, libraries, configuration files, and launch scripts.</p>
<p>There are two primary build types for ROS 2 packages:</p>
<ol>
<li><strong><code class="inline-code">ament_python</code>:</strong> For pure Python nodes, scripts, and launch files.</li>
<li><strong><code class="inline-code">ament_cmake</code>:</strong> For C++ nodes, hardware drivers, and custom interface definitions (<code class="inline-code">.msg</code>, <code class="inline-code">.srv</code>, <code class="inline-code">.action</code>).</li>
</ol>

<h3 id="anatomy-of-an-ament_python-package">Anatomy of an <code class="inline-code">ament_python</code> Package</h3>
<p><img src="assets/images/ros2_package_tree.svg" alt="ROS 2 Python Package Anatomy" class="lesson-image" loading="lazy" /></p>

<h3 id="key-package-components-guide">Key Package File Anatomy Guide</h3>
<div class="info-grid">
  <div class="info-card">
    <div class="card-icon">📋</div>
    <h4><code>package.xml</code></h4>
    <p>The package manifest schema (Format 3). Declares package metadata, licensing, and build/runtime dependencies (<code class="inline-code">&lt;depend&gt;</code>) parsed by colcon and rosdep.</p>
  </div>
  <div class="info-card">
    <div class="card-icon">⚙️</div>
    <h4><code>setup.py</code> &amp; <code>setup.cfg</code></h4>
    <p>Python install rules. Maps executable CLI commands to python functions in <code class="inline-code">entry_points={'console_scripts'}</code> for <code class="inline-code">ros2 run</code>.</p>
  </div>
  <div class="info-card">
    <div class="card-icon">🔍</div>
    <h4><code>resource/</code></h4>
    <p>Contains an empty marker file named after the package. Registers with the Ament Index so tools like <code class="inline-code">ros2 pkg list</code> can discover it.</p>
  </div>
  <div class="info-card">
    <div class="card-icon">🐍</div>
    <h4><code>&lt;pkg_name&gt;/</code></h4>
    <p>The inner Python module directory containing <code class="inline-code">__init__.py</code> and your actual node classes inheriting from <code class="inline-code">rclpy.node.Node</code>.</p>
  </div>
  <div class="info-card">
    <div class="card-icon">🚀</div>
    <h4><code>launch/</code> &amp; <code>config/</code></h4>
    <p>Orchestration folders for Python launch scripts (<code class="inline-code">.launch.py</code>) and YAML parameter files, installed via <code class="inline-code">data_files</code> in <code class="inline-code">setup.py</code>.</p>
  </div>
</div>
</section>

<section class="lesson-section">
<h2 id="6-package-introspection-cli-commands">6. Package Introspection CLI Commands</h2>
<p>ROS 2 provides dedicated tools to query installed packages:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># List all discovered ROS 2 packages in the environment
ros2 pkg list

# Find the exact install directory of a package
ros2 pkg prefix turtlesim

# Display the package.xml metadata of any package
ros2 pkg xml turtlesim</code></pre>
</div>
</section>

<section class="lesson-section">
<h2 id="7-resolving-package-dependencies-with-rosdep">7. Resolving Package Dependencies with <code>rosdep</code></h2>
<p>Robotics systems often depend on dozens of system libraries (like OpenCV, SDL, or mathematical solvers). ROS 2 includes <strong><code class="inline-code">rosdep</code></strong>, an automated dependency resolver that parses <code class="inline-code">&lt;depend&gt;</code> tags across all packages in <code class="inline-code">src/</code> and installs missing Ubuntu apt packages.</p>

<h3 id="the-standard-workspace-rosdep-command">The Standard Workspace rosdep Command</h3>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">cd ~/ros2_ws
rosdep install --from-paths src --ignore-src -y</code></pre>
</div>

<h3 id="flag-by-flag-command-breakdown">Flag-by-Flag Command Breakdown:</h3>
<ul>
<li><code class="inline-code">--from-paths src</code>: Recursively inspects every <code class="inline-code">package.xml</code> inside the <code class="inline-code">src/</code> tree.</li>
<li><code class="inline-code">--ignore-src</code>: Do not attempt to install dependencies from Ubuntu apt if they already exist as source packages inside <code class="inline-code">src/</code>.</li>
<li><code class="inline-code">-y</code>: Automatically answers "Yes" to all system package installation prompts.</li>
</ul>
</section>

<section class="lesson-section">
<h2 id="8-create-ros-package-python">8. Create ROS 2 Package (Python)</h2>
<p>In this guided walkthrough, you will practice creating our core <code class="inline-code">navpro_basics</code> package using <code class="inline-code">ros2 pkg create</code>, verify its generated file structure, check dependencies with <code class="inline-code">rosdep</code>, and compile it into the overlay workspace.</p>

<ol>
<li>Navigate to your workspace source directory:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">cd ~/ros2_ws/src</code></pre>
</div>

<ol start="2">
<li>Create the <code class="inline-code">navpro_basics</code> package with required dependencies:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 pkg create --build-type ament_python navpro_basics --dependencies rclpy geometry_msgs std_msgs --description "NavPro Robotics Core Basics Package"</code></pre>
</div>

<ol start="3">
<li>Inspect the generated package directory structure:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ls -la navpro_basics/</code></pre>
</div>

<ol start="4">
<li>Run <code class="inline-code">rosdep</code> from workspace root to verify all dependencies are satisfied:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">cd ~/ros2_ws
rosdep install --from-paths src --ignore-src -y</code></pre>
</div>

<ol start="5">
<li>Build the package with <code class="inline-code">colcon</code>:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">cd ~/ros2_ws
colcon build --packages-select navpro_basics</code></pre>
</div>

<ol start="6">
<li>Sourcing the workspace and verifying package discovery:</li>
</ol>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">source install/setup.bash
ros2 pkg prefix navpro_basics</code></pre>
</div>
<p><em>Verify that the prefix matches <code class="inline-code">~/ros2_ws/install/navpro_basics</code>.</em></p>
</section>"""

l04_full_html = l04_objectives_card + "\n\n" + l04_body

# Update data['lessons'][2] (Lesson 03)
l03 = data['lessons'][2]
l03['title'] = "Lesson 03: Turtlesim Simulation & Essential ROS 2 CLI Tools"
l03['focus'] = "Hands-On CLI Introspection, Graph Inspection & Moving Simulated Robots"
l03['filename'] = "03_turtlesim_and_cli_mastery.md"
l03['slug'] = "03_turtlesim_and_cli_mastery"
l03['snapshot'] = [
    ["Nodes in Action", "Use ros2 run to launch nodes and ros2 node list/info to inspect active endpoints."],
    ["Topic Introspection", "Echo live streams with ros2 topic echo and audit sensor rates with ros2 topic hz."],
    ["Direct Actuation via CLI", "Inject velocity commands to drive simulated robots using ros2 topic pub."]
]
l03['quizzes'] = [
    {
        "id": "q_l1_03_1",
        "prompt": "Which ROS 2 CLI command is used to inspect all publishers, subscribers, services, and actions associated with a running node?",
        "options": ["ros2 topic list", "ros2 node info <node_name>", "ros2 doctor --report", "ros2 pkg xml"],
        "correct": 1,
        "explanation": "ros2 node info <node_name> provides complete introspection into a node's active subscriptions, publishers, service servers, and action clients/servers."
    },
    {
        "id": "q_l1_03_2",
        "prompt": "In the geometry_msgs/msg/Twist interface, which field controls the forward and backward linear velocity of a ground robot?",
        "options": ["linear.y", "linear.z", "linear.x", "angular.x"],
        "correct": 2,
        "explanation": "In ROS 2 spatial conventions, linear.x represents forward/reverse surge velocity along the robot's longitudinal axis."
    }
]
l03['has_quiz'] = True
l03['html_content'] = l03_full_html

# Update data['lessons'][3] (Lesson 04)
l04 = data['lessons'][3]
l04['title'] = "Lesson 04: ROS 2 Workspace & Package Architecture Deep Dive"
l04['focus'] = "Workspace Anatomy, Overlay Sourcing & ament_python Package Creation"
l04['filename'] = "04_ros2_workspace_and_package_architecture.md"
l04['slug'] = "04_ros2_workspace_and_package_architecture"
l04['snapshot'] = [
    ["4 Workspace Directories", "src/ contains editable source code; build/, install/, and log/ are generated by colcon."],
    ["Underlay vs Overlay", "System binaries reside in /opt/ros/jazzy; your overlay in ~/ros2_ws extends them without OS risk."],
    ["Ament Package Anatomy", "Packages require package.xml for dependencies, setup.py for entry points, and resource/ marker."]
]
l04['quizzes'] = [
    {
        "id": "q_l1_04_1",
        "prompt": "Why must you source install/setup.bash after building a workspace with colcon?",
        "options": [
            "It formats the hard drive cache",
            "It overlays your custom workspace packages onto the system environment so ROS 2 can find your nodes",
            "It downloads Debian dependencies from Ubuntu repositories",
            "It shuts down the background roscore daemon"
        ],
        "correct": 1,
        "explanation": "Sourcing install/setup.bash updates your shell's environment variables (AMENT_PREFIX_PATH, PATH, PYTHONPATH) to discover the newly built packages in your overlay."
    },
    {
        "id": "q_l1_04_2",
        "prompt": "Which section of setup.py maps an executable CLI command to a Python module entry function?",
        "options": ["data_files", "packages", "console_scripts inside entry_points", "install_requires"],
        "correct": 2,
        "explanation": "entry_points={'console_scripts': ['node_name = pkg.module:main']} registers the binary name that ros2 run executes."
    }
]
l04['has_quiz'] = True
l04['html_content'] = l04_full_html

# Update data['modules'][0]['lessons']
data['modules'][0]['lessons'] = [
    {"id": "lesson_01", "num_str": "01", "title": "Linux Fundamentals for Robotics Engineers"},
    {"id": "lesson_02", "num_str": "02", "title": "ROS 2 Overview & Environment Setup"},
    {"id": "lesson_03", "num_str": "03", "title": "Lesson 03: Turtlesim Simulation & Essential ROS 2 CLI Tools"},
    {"id": "lesson_04", "num_str": "04", "title": "Lesson 04: ROS 2 Workspace & Package Architecture Deep Dive"},
    {"id": "lesson_05", "num_str": "05", "title": "Communication Mechanism I: Publishers, Subscribers & QoS"},
    {"id": "lesson_06", "num_str": "06", "title": "VS Code IDE Tooling & ROS 2 Logging Framework"}
]

# Write back to lessonsData.json
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Successfully reverted Lesson 03 (Turtlesim & CLI) and Lesson 04 (Workspace & Packages)!")
