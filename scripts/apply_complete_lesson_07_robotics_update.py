#!/usr/bin/env python3
"""
Comprehensive update for Lesson 07:
1. Fix Section 4.2 and Section 7 to use authentic Emergency Stop Safety Service commands
   (no more arithmetic 41+59=100, minimal_service, a/b/sum).
2. Fix Section 8 to use m02_l07_task_speed_mode_server.py and m02_l07_solution_speed_mode_server.py
   (no more calculator references, node name: speed_mode_server, clean robotics variables).
"""

import json
import html
import re

LESSONS_JSON_PATH = 'ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'

def escape_code(code_str):
    return html.escape(code_str)

def main():
    with open(LESSONS_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    l7 = [x for x in data['lessons'] if x['id'] == 'lesson_07'][0]

    # Subtopics
    l7['subtopics'] = [
        {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
        {"id": "2-decision-matrix-topics-vs-services-vs-actions", "title": "2. Decision Matrix: Topics vs Services vs Actions"},
        {"id": "3-building-the-emergency-stop-safety-service-server", "title": "3. Building the Emergency Stop Safety Service Server in Python"},
        {"id": "4-configuring-setuppy-building-testing-server-with-cli", "title": "4. Configuring setup.py, Building & Testing the Service Server with ROS 2 CLI"},
        {"id": "5-the-critical-singlethreadedexecutor-deadlock-bug", "title": "5. The Critical SingleThreadedExecutor Deadlock Bug"},
        {"id": "6-building-an-asynchronous-emergency-stop-client", "title": "6. Building an Asynchronous Emergency Stop Client in Python"},
        {"id": "7-verification-with-the-ros-2-cli", "title": "7. Verification with the ROS 2 CLI"},
        {"id": "8-hands-on-student-challenge", "title": "8. Hands-on Student Challenge: AMR Operational Speed Mode & Zone Governor Service Server"}
    ]

    c = l7['html_content']

    # Read task starter and solution code
    with open('ros2-navpro-tutorials-basic-amr/ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_task_speed_mode_server.py') as f:
        task_code = f.read()

    with open('ros2-navpro-tutorials-basic-amr/ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_solution_speed_mode_server.py') as f:
        solution_code = f.read()

    task_code_escaped = escape_code(task_code)
    solution_code_escaped = escape_code(solution_code)

    # 1. Fix Section 4.2 CLI commands if needed
    sec4_2_old = """# 1. Verify the service is listed
ros2 service list | grep emergency_stop

# 2. Check the service interface type
ros2 service type /navpro/emergency_stop

# 3. Call the service directly from terminal!
ros2 service call /navpro/emergency_stop std_srvs/srv/SetBool "{data: true}"</code></pre>
</div>
<p>You will see the server respond with <code class="inline-code">response: std_srvs.srv.SetBool_Response(success=True, message='AMR Emergency Stop Activated')</code>."""

    sec4_2_new = """# 1. Verify the service is listed
ros2 service list | grep emergency_stop

# 2. Check the service interface type
ros2 service type /robot/emergency_stop

# 3. Call the service directly from terminal!
ros2 service call /robot/emergency_stop navpro_interfaces/srv/TriggerEmergencyStop "{emergency_stop_requested: true, reason: 'Benchtop safety sensor trip'}"</code></pre>
</div>
<p>You will see the server respond with <code class="inline-code">response: navpro_interfaces.srv.TriggerEmergencyStop_Response(success=True, status_message='Emergency stop ENGAGED: Power to motor drivers cut.', stop_timestamp=1729017234.120)</code>."""

    if sec4_2_old in c:
        c = c.replace(sec4_2_old, sec4_2_new)
        print("Updated Section 4.2 to use /robot/emergency_stop & TriggerEmergencyStop.")

    # 2. Replace Section 7 & Section 8 completely with pristine robotics content
    # Find start of Section 7
    s7_idx = c.find('<h2 id="7-verification-with-the-ros-2-cli">')
    if s7_idx == -1:
        s7_idx = c.find('7. Verification with the ROS 2 CLI')
        s7_idx = c.rfind('<h2', 0, s7_idx)

    new_sec7_and_8 = f"""<h2 id="7-verification-with-the-ros-2-cli">7. Verification with the ROS 2 CLI</h2>
<p>Deploy and introspect the paired emergency stop safety system across multiple terminal consoles:</p>

<p><strong>Terminal 1: Start the Emergency Stop Safety Service Server</strong></p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 run navpro_basics emergency_stop_server
# Expected Output:
# [INFO] [emergency_stop_server]: EmergencyStopServer initialized. Ready to receive safety commands on "/robot/emergency_stop"...
</code></pre>
</div>

<p><strong>Terminal 2: Run the Asynchronous Emergency Stop Client</strong></p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">ros2 run navpro_basics emergency_stop_client "Obstacle detected within 0.35m critical safety envelope"
# Expected Output:
# [INFO] [emergency_stop_client]: Dispatching Emergency Stop Request: stop=True, reason='Obstacle detected within 0.35m critical safety envelope'
# [INFO] [emergency_stop_client]: SAFETY RESPONSE RECEIVED:
# [INFO] [emergency_stop_client]:   Success: True
# [INFO] [emergency_stop_client]:   Status: Emergency stop ENGAGED: Power to motor drivers cut.
# [INFO] [emergency_stop_client]:   Time: 1729017234.120 s
</code></pre>
</div>

<p><strong>Terminal 3: Trigger and Introspect the Safety Service Directly from the CLI</strong></p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># 1. List all active services
ros2 service list | grep emergency_stop

# 2. Inspect the service interface type
ros2 service type /robot/emergency_stop
# Output: navpro_interfaces/srv/TriggerEmergencyStop

# 3. Call the service manually with strongly-typed arguments:
ros2 service call /robot/emergency_stop navpro_interfaces/srv/TriggerEmergencyStop "{{emergency_stop_requested: true, reason: 'Manual operator E-Stop button pressed'}}"
# Output:
# requester: making request: navpro_interfaces.srv.TriggerEmergencyStop_Request(emergency_stop_requested=True, reason='Manual operator E-Stop button pressed')
#
# response:
# navpro_interfaces.srv.TriggerEmergencyStop_Response(success=True, status_message='Emergency stop ENGAGED: Power to motor drivers cut.', stop_timestamp=1729017234.120)
</code></pre>
</div>

<hr class="divider">

<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge: Autonomous Mobile Robot Operational Speed Mode &amp; Zone Governor Service Server</h2>
<p>In automated warehouse fulfillment centers, Autonomous Mobile Robots (AMRs) operate across distinct speed zones to balance high-throughput cargo transfer with worker safety. Your mission is to implement a robust, defensive ROS 2 Service Server that receives zone dispatch commands from the Fleet Management System (FMS), validates speed envelopes, updates motor speed limits, and returns verified receipts using the custom <code class="inline-code">navpro_interfaces/srv/SetSpeedMode</code> interface.</p>

<div class="alert alert-info alert-briefing">
  <div class="alert-icon">🚀</div>
  <div class="alert-content">
    <div class="alert-title">Robotics Flight Operations Mission Briefing: AMR Operational Speed Mode &amp; Zone Dispatch Server</div>
    <div class="alert-body">
      <strong>Physical AMR Context &amp; Operational Challenge:</strong><br>
      Autonomous Mobile Robots operating in dynamic logistics centers must adapt their kinetic parameters across different facility sectors. Driving at full speed (<strong>TURBO: 1.00 scale / 1.5 m/s</strong>) down an active pallet transfer corridor maximizes warehouse throughput. However, entering congested cross-docking intersections or shared human picking aisles mandates strict deceleration to <strong>ECO: 0.35 scale / 0.5 m/s</strong> to comply with industrial safety guidelines (ISO 3691-4).
      <br><br>
      <strong>Architectural Role &amp; Why This Mechanism:</strong><br>
      Instead of hardcoding fixed speeds in path planners, a centralized Fleet Management System (FMS) commands speed mode updates as the AMR crosses geo-fenced RFID tags or optical floor codes. A <strong>ROS 2 Service</strong> implements this exact deterministic Request-Response RPC transaction. The server acts as an authoritative governor: it defensively checks incoming mode codes, verifies custom scale bounds against physical motor curves, updates internal velocity limits, and returns a verified receipt.
      <br><br>
      <strong>Flight Objective &amp; Behavioral Outcome:</strong><br>
      You will construct the <code>SpeedModeServerTask</code> node (node identity: <code>'speed_mode_server'</code>). When a fleet manager calls <code>/amr/set_speed_mode</code> with <code>navpro_interfaces/srv/SetSpeedMode</code>, your server validates the command against vehicle dynamics limits, updates the active drive scale, and replies with confirmed execution parameters.
    </div>
  </div>
</div>

<div class="alert alert-tip">
  <div class="alert-title">🎯 Mission Requirements</div>
  <ol>
    <li><strong>TODO 1:</strong> Initialize a Service Server on endpoint <code class="inline-code">/amr/set_speed_mode</code> using interface <code class="inline-code">navpro_interfaces/srv/SetSpeedMode</code> with callback <code class="inline-code">self.handle_speed_mode</code>.</li>
    <li><strong>TODO 2:</strong> In <code class="inline-code">handle_speed_mode(self, request, response)</code>, sanitize the incoming string with <code class="inline-code">mode = request.mode_name.upper().strip()</code> and evaluate standard modes:
      <ul>
        <li><code class="inline-code">'TURBO'</code> &rarr; set <code class="inline-code">scale = 1.00</code> (100% velocity: 1.5 m/s, high-speed arterial corridor)</li>
        <li><code class="inline-code">'NORMAL'</code> &rarr; set <code class="inline-code">scale = 0.70</code> (70% velocity: 1.0 m/s, standard production inventory aisles)</li>
        <li><code class="inline-code">'ECO'</code> &rarr; set <code class="inline-code">scale = 0.35</code> (35% velocity: 0.5 m/s, high-pedestrian picking zones)</li>
      </ul>
    </li>
    <li><strong>TODO 3:</strong> For <code class="inline-code">'CUSTOM'</code> mode, clamp <code class="inline-code">request.custom_scale</code> safely within <code class="inline-code">[0.10, 1.00]</code> using <code class="inline-code">max(0.10, min(1.00, float(request.custom_scale)))</code>.</li>
    <li><strong>TODO 4:</strong> If an unrecognized mode is received (e.g. <code class="inline-code">'HYPERSPEED'</code>), reject defensively: set <code class="inline-code">response.success = False</code>, keep <code class="inline-code">response.effective_scale = self.current_scale</code>, populate an informative error message, log a warning, and return early.</li>
    <li><strong>TODO 5:</strong> When valid, latch <code class="inline-code">self.current_scale = scale</code> and <code class="inline-code">self.active_mode = mode</code>, set <code class="inline-code">response.success = True</code>, <code class="inline-code">response.effective_scale = float(scale)</code>, populate confirmation status, log execution, and return the response.</li>
  </ol>
</div>

<h3 id="81-starter-template">8.1 Starter Template: <code class="inline-code">m02_l07_task_speed_mode_server.py</code></h3>
<p>Open <code class="inline-code">~/ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_task_speed_mode_server.py</code> or copy it to your student workspace <code class="inline-code">~/ros2_ws/src/navpro_basics/navpro_basics/m02_l07_task_speed_mode_server.py</code>:</p>

<div class="code-container" data-language="python">
<div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-python">{task_code_escaped}</code></pre>
</div>

<h3 id="82-verification-steps">8.2 Verification Steps &amp; Expected Terminal Output</h3>
<p>Launch your server node in Terminal 1 and test zone dispatch service calls from Terminal 2:</p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash"># Terminal 1: Run your Speed Mode Service Server
ros2 run navpro_basics task_speed_mode_server

# Terminal 2: Call the service from CLI - Request TURBO mode (express corridor)
ros2 service call /amr/set_speed_mode navpro_interfaces/srv/SetSpeedMode "{{mode_name: 'TURBO'}}"

# Terminal 2: Request ECO mode (high-pedestrian picking aisle)
ros2 service call /amr/set_speed_mode navpro_interfaces/srv/SetSpeedMode "{{mode_name: 'ECO'}}"

# Terminal 2: Request CUSTOM scale (55% speed)
ros2 service call /amr/set_speed_mode navpro_interfaces/srv/SetSpeedMode "{{mode_name: 'CUSTOM', custom_scale: 0.55}}"

# Terminal 2: Test defensive error handling with invalid mode
ros2 service call /amr/set_speed_mode navpro_interfaces/srv/SetSpeedMode "{{mode_name: 'HYPERSPEED'}}"</code></pre>
</div>

<p><em>Expected Terminal Output (Server - Terminal 1):</em></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">[INFO] [speed_mode_server]: SpeedModeServerTask initialized in NORMAL mode (70%). Awaiting /amr/set_speed_mode requests...
[INFO] [speed_mode_server]: [SPEED MODE] Speed mode 'TURBO' applied successfully (scale: 100%).
[INFO] [speed_mode_server]: [SPEED MODE] Speed mode 'ECO' applied successfully (scale: 35%).
[INFO] [speed_mode_server]: [SPEED MODE] Speed mode 'CUSTOM' applied successfully (scale: 55%).
[WARN] [speed_mode_server]: [REJECTED] Invalid mode 'HYPERSPEED'. Permitted: TURBO, NORMAL, ECO, CUSTOM</code></pre>
</div>

<p><em>Expected Terminal Output (Client - Terminal 2 Response Receipt):</em></p>
<div class="code-container" data-language="text">
<div class="code-header"><span class="code-lang-tag">text</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-text">requester: making request: navpro_interfaces.srv.SetSpeedMode_Request(mode_name='TURBO', custom_scale=0.0)

response:
navpro_interfaces.srv.SetSpeedMode_Response(success=True, message="Speed mode 'TURBO' applied successfully (scale: 100%).", effective_scale=1.0)</code></pre>
</div>

<details class="reference-solution-dropdown">
  <summary class="solution-summary-btn">
    <span>🔍 View Reference Solution (<code class="inline-code">m02_l07_solution_speed_mode_server.py</code>)</span>
  </summary>
  <div class="solution-body">
    <p>Reference file: <code class="inline-code">ros2_ws_reference/src/navpro_basics/navpro_basics/m02_l07_solution_speed_mode_server.py</code></p>
    <div class="code-container" data-language="python">
      <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-python">{solution_code_escaped}</code></pre>
    </div>

    <div class="code-breakdown-card">
      <h4 class="code-breakdown-title">🔬 Core Code Deep Dive &amp; Operational Breakdown: SpeedModeSolutionServer Architecture</h4>
      <p class="code-breakdown-intro">Key architectural takeaways from the Speed Mode &amp; Service Governor Solution:</p>
      <ul class="code-breakdown-list">
        <li class="code-breakdown-item"><strong>Defensive Parameter Sanitization:</strong> Physical actuators must never receive unvalidated parameters. The callback normalizes the string with <code>mode = request.mode_name.upper().strip()</code> and checks against permitted modes, gracefully rejecting unknown strings with <code>response.success = False</code> without crashing the node.</li>
        <li class="code-breakdown-item"><strong>State Persistence across Service Invocations:</strong> The active speed factor is saved into <code>self.current_scale</code> and <code>self.active_mode</code>. Subsequent trajectory planner nodes or velocity limiter subscribers can query this state to cap <code>/cmd_vel</code> outputs.</li>
        <li class="code-breakdown-item"><strong>Deterministic Response Contract:</strong> Every code path in the service callback returns the <code>response</code> object. Omitting the return statement causes a runtime DDS timeout exception in the requesting client.</li>
      </ul>
    </div>
  </div>
</details>
"""

    c = c[:s7_idx] + new_sec7_and_8 + '\n'
    l7['html_content'] = c
    print("Replaced Section 7 & 8 in Lesson 07 successfully!")

    with open(LESSONS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Saved lessonsData.json successfully!")

if __name__ == '__main__':
    main()
