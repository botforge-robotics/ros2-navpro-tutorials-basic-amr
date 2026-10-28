import json

with open('lms/src/data/lessonsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# -----------------------------------------------------------------------------
# LESSON 07
# -----------------------------------------------------------------------------
def process_lesson_07(lesson):
    c = lesson['html_content']

    srv_note = '''
<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Best Practice: Discovering &amp; Inspecting Service Interfaces Before Writing Code</strong><br>
    Before implementing a ROS 2 Service Server or Client, always inspect the service definition (<code class="inline-code">.srv</code>) to understand both the <strong>Request</strong> and <strong>Response</strong> contracts:
    <br><br>
    <strong>1. Discover available service interfaces using <code class="inline-code">ros2 interface list</code> or <code class="inline-code">package</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Search for emergency or stop service types:
ros2 interface list | grep srv | grep -i emergency

# Or list all service interfaces defined in our AMR workspace package:
ros2 interface package nexus_amr_interfaces</code></pre>
    </div>
    <strong>2. Inspect the exact Request and Response fields using <code class="inline-code">ros2 interface show</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">ros2 interface show nexus_amr_interfaces/srv/TriggerEmergencyStop</code></pre>
    </div>
    <strong>Expected Output &amp; The Three Hyphens (<code class="inline-code">---</code>) Delimiter:</strong>
    <div class="code-container terminal-window" data-language="plaintext" style="margin: 0.6rem 0;">
      <div class="terminal-header">
        <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        <span class="terminal-title">Terminal &mdash; ros2 interface show nexus_amr_interfaces/srv/TriggerEmergencyStop</span>
      </div>
      <pre><code class="language-plaintext"># Request (Input payload sent by the Client)
bool emergency_stop_requested
string reason
---
# Response (Output payload populated and returned by the Server)
bool success
string status_message
float32 stop_timestamp</code></pre>
    </div>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><strong>Top Half (Request):</strong> Accessed on the <code class="inline-code">request</code> argument in your callback (<code class="inline-code">request.emergency_stop_requested</code>, <code class="inline-code">request.reason</code>).</li>
      <li><strong>Bottom Half (Response):</strong> Assigned on the <code class="inline-code">response</code> object that your callback returns (<code class="inline-code">response.success</code>, <code class="inline-code">response.status_message</code>, <code class="inline-code">response.stop_timestamp</code>).</li>
      <li><strong>Essential CLI Verification Tools:</strong> Check active services with <code class="inline-code">ros2 service list</code>, verify interface types with <code class="inline-code">ros2 service type &lt;service&gt;</code>, and test your server directly from terminal using <code class="inline-code">ros2 service call</code> without writing a client first!</li>
    </ul>
  </div>
</div>
'''
    target_srv_p = '<p>Create your safety service server script at <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/emergency_stop_server.py</code>:'
    if target_srv_p in c and 'Best Practice: Discovering &amp; Inspecting Service Interfaces Before Writing Code' not in c:
        c = c.replace(target_srv_p, srv_note + '\n' + target_srv_p)
        print("Lesson 07: Added Service Interface Discovery Note.")

    lesson['html_content'] = c


# -----------------------------------------------------------------------------
# LESSON 10
# -----------------------------------------------------------------------------
def process_lesson_10(lesson):
    c = lesson['html_content']

    act_note = '''
<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Best Practice: Discovering &amp; Inspecting Action Interfaces Before Writing Code</strong><br>
    Actions represent complex, long-running behaviors. An action definition (<code class="inline-code">.action</code>) has three distinct sections separated by two sets of three hyphens (<code class="inline-code">---</code>). Always inspect this contract before writing server or client code:
    <br><br>
    <strong>1. Discover available action interfaces using <code class="inline-code">ros2 interface list</code> or <code class="inline-code">package</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Search for distance or navigation action types:
ros2 interface list | grep action | grep -i distance

# Or list all actions defined in our AMR workspace package:
ros2 interface package nexus_amr_interfaces</code></pre>
    </div>
    <strong>2. Inspect the Goal, Result, and Feedback schemas using <code class="inline-code">ros2 interface show</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">ros2 interface show nexus_amr_interfaces/action/NavigateDistance</code></pre>
    </div>
    <strong>Expected Output &amp; Tri-Partite Action Contract:</strong>
    <div class="code-container terminal-window" data-language="plaintext" style="margin: 0.6rem 0;">
      <div class="terminal-header">
        <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        <span class="terminal-title">Terminal &mdash; ros2 interface show nexus_amr_interfaces/action/NavigateDistance</span>
      </div>
      <pre><code class="language-plaintext"># Section 1: Goal (Client target parameters)
float32 target_distance_m
float32 max_speed_mps
---
# Section 2: Result (Final outcome upon completion or cancellation)
bool reached_target
float32 actual_distance_travelled_m
string status_message
---
# Section 3: Feedback (Periodic progress updates streamed during execution)
float32 distance_remaining_m
float32 current_speed_mps
float32 percent_complete</code></pre>
    </div>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><strong>Goal:</strong> Read via <code class="inline-code">goal_handle.request.target_distance_m</code> and <code class="inline-code">goal_handle.request.max_speed_mps</code>.</li>
      <li><strong>Feedback:</strong> Streamed back to client using <code class="inline-code">feedback_msg = NavigateDistance.Feedback()</code> and <code class="inline-code">goal_handle.publish_feedback(feedback_msg)</code>.</li>
      <li><strong>Result:</strong> Returned upon goal completion via <code class="inline-code">result = NavigateDistance.Result()</code>, marked via <code class="inline-code">goal_handle.succeed()</code>, and returned.</li>
      <li><strong>Essential CLI Verification Tools:</strong> Check active action servers with <code class="inline-code">ros2 action list</code>, inspect client/server endpoints with <code class="inline-code">ros2 action info &lt;action&gt;</code>, and test server execution directly using <code class="inline-code">ros2 action send_goal &lt;name&gt; &lt;type&gt; "&lt;yaml&gt;" --feedback</code>!</li>
    </ul>
  </div>
</div>
'''
    target_act_p = '<p>Create your action server at <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/navigate_distance_server.py</code>:'
    if target_act_p in c and 'Best Practice: Discovering &amp; Inspecting Action Interfaces Before Writing Code' not in c:
        c = c.replace(target_act_p, act_note + '\n' + target_act_p)
        print("Lesson 10: Added Action Interface Discovery Note.")

    lesson['html_content'] = c


for lesson in data['lessons']:
    if lesson.get('id') == 'lesson_07':
        process_lesson_07(lesson)
    elif lesson.get('id') == 'lesson_10':
        process_lesson_10(lesson)

with open('lms/src/data/lessonsData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved Lesson 07 & Lesson 10 notes to lessonsData.json!")
