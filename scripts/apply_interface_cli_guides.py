import json
import re

def update_lesson_07(data):
    for lesson in data['lessons']:
        if lesson.get('id') == 'lesson_07':
            content = lesson['html_content']
            
            # Find insertion point before Section 3: Building the Emergency Stop
            # Current Section 3 header:
            # <h2 id="3-building-the-emergency-stop-safety-service-server">3. Building the Emergency Stop Safety Service Server in Python</h2>
            
            section_3_text = r'''<hr class="divider">
<h2 id="3-inspecting-service-interfaces-cli-tools">3. Inspecting Service Interfaces &amp; Essential Service CLI Tools</h2>
<p>In production robotics development, <strong>you must never write a service server or client blindly</strong>. Before writing code, you need to know the exact data structure of the request and response. ROS 2 provides a powerful suite of CLI tools to discover available service interfaces and inspect their schemas.</p>

<h3 id="31-discovering-available-services-and-interfaces">3.1 Discovering Available Service Interfaces</h3>
<p>You can discover all service types installed on your system or query a specific package:</p>

<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash"># List all service (.srv) interfaces available across your ROS 2 underlay &amp; overlay:
ros2 interface list | grep srv

# Query all interfaces provided by standard packages:
ros2 interface package std_srvs
ros2 interface package example_interfaces

# Query custom interfaces provided by our AMR workspace:
ros2 interface package nexus_amr_interfaces</code></pre>
</div>

<h3 id="32-inspecting-service-definitions-ros2-interface-show">3.2 Inspecting Service Definitions (<code class="inline-code">ros2 interface show</code>)</h3>
<p>To inspect the exact fields of a service interface, use <code class="inline-code">ros2 interface show &lt;package&gt;/srv/&lt;ServiceName&gt;</code>. Let's inspect our custom emergency stop service:</p>

<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">ros2 interface show nexus_amr_interfaces/srv/TriggerEmergencyStop</code></pre>
</div>

<p><strong>Expected Terminal Output:</strong></p>
<div class="code-container terminal-window" data-language="plaintext">
  <div class="terminal-header">
    <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="terminal-title">Terminal &mdash; Service Interface Structure</span>
  </div>
  <pre><code class="language-plaintext"># Request (Sent by Client to initiate action)
bool emergency_stop_requested
string reason
---
# Response (Returned by Server upon execution)
bool success
string status_message
float32 stop_timestamp</code></pre>
</div>

<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Understanding the Three Hyphens (<code>---</code>) Delimiter:</strong><br>
    Every ROS 2 <code class="inline-code">.srv</code> definition is strictly divided into two halves by three hyphens (<code class="inline-code">---</code>):<br><br>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><strong>Top Half (Request):</strong> What the client sends to the server. In Python, these fields become attributes of the <code class="inline-code">request</code> object: <code class="inline-code">request.emergency_stop_requested</code> (<code class="inline-code">bool</code>) and <code class="inline-code">request.reason</code> (<code class="inline-code">str</code>).</li>
      <li><strong>Bottom Half (Response):</strong> What the server's callback must populate and return. In Python, these fields are assigned on the <code class="inline-code">response</code> object: <code class="inline-code">response.success</code> (<code class="inline-code">bool</code>), <code class="inline-code">response.status_message</code> (<code class="inline-code">str</code>), and <code class="inline-code">response.stop_timestamp</code> (<code class="inline-code">float</code>).</li>
    </ul>
  </div>
</div>

<p>Let's also inspect standard service types used throughout the ROS 2 ecosystem:</p>
<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash"># Standard boolean toggle service:
ros2 interface show example_interfaces/srv/SetBool

# Standard parameterless trigger service:
ros2 interface show std_srvs/srv/Trigger

# Standard arithmetic service:
ros2 interface show example_interfaces/srv/AddTwoInts</code></pre>
</div>

<h3 id="33-essential-service-cli-commands">3.3 Essential Service CLI Developer Cheat Sheet</h3>
<p>Keep these CLI tools handy whenever creating, testing, or debugging service servers and clients:</p>

<div style="overflow-x: auto; margin: 1.5rem 0;">
  <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
    <thead>
      <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
        <th style="padding: 0.6rem 0.8rem;">Command</th>
        <th style="padding: 0.6rem 0.8rem;">Purpose</th>
        <th style="padding: 0.6rem 0.8rem;">When to Use</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 interface show &lt;type&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Displays the Request and Response fields of a <code class="inline-code">.srv</code> interface</td>
        <td style="padding: 0.6rem 0.8rem;"><strong>Before writing code</strong> to verify exact field names and types</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 interface package &lt;pkg&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Lists all interfaces packaged inside a ROS 2 package</td>
        <td style="padding: 0.6rem 0.8rem;">Discovering available services in installed packages</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 service list</code></td>
        <td style="padding: 0.6rem 0.8rem;">Lists all active service endpoints currently advertised on the DDS bus</td>
        <td style="padding: 0.6rem 0.8rem;">Checking if your server node has successfully advertised its service</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 service type &lt;service&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Returns the interface type implemented by an active service</td>
        <td style="padding: 0.6rem 0.8rem;">Verifying the type contract of an existing service before calling it</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 service find &lt;type&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Finds all active services advertising a specific interface type</td>
        <td style="padding: 0.6rem 0.8rem;">Locating specific service providers in a multi-robot fleet</td>
      </tr>
      <tr>
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 service call &lt;srv&gt; &lt;type&gt; "&lt;yaml&gt;"</code></td>
        <td style="padding: 0.6rem 0.8rem;">Dispatches a synchronous service request from the terminal</td>
        <td style="padding: 0.6rem 0.8rem;">Testing your server immediately after building, before writing client code</td>
      </tr>
    </tbody>
  </table>
</div>
'''

            # Replace headers to renumber sections 3..8 to 4..9
            target_hdr = '<h2 id="3-building-the-emergency-stop-safety-service-server">3. Building the Emergency Stop Safety Service Server in Python</h2>'
            if target_hdr in content:
                content = content.replace(target_hdr, section_3_text + '\n<hr class="divider">\n<h2 id="4-building-the-emergency-stop-safety-service-server">4. Building the Emergency Stop Safety Service Server in Python</h2>')
                content = content.replace('<h2 id="4-configuring-setuppy-building-testing-server-with-cli">4. Configuring setup.py, Building & Testing the Service Server with ROS 2 CLI</h2>',
                                          '<h2 id="5-configuring-setuppy-building-testing-server-with-cli">5. Configuring setup.py, Building & Testing the Service Server with ROS 2 CLI</h2>')
                content = content.replace('<h2 id="5-the-critical-singlethreadedexecutor-deadlock-bug">5. The Critical SingleThreadedExecutor Deadlock Bug</h2>',
                                          '<h2 id="6-the-critical-singlethreadedexecutor-deadlock-bug">6. The Critical SingleThreadedExecutor Deadlock Bug</h2>')
                content = content.replace('<h2 id="6-building-an-asynchronous-emergency-stop-client">6. Building an Asynchronous Emergency Stop Client in Python</h2>',
                                          '<h2 id="7-building-an-asynchronous-emergency-stop-client">7. Building an Asynchronous Emergency Stop Client in Python</h2>')
                content = content.replace('<h2 id="7-verification-with-the-ros-2-cli">7. Verification with the ROS 2 CLI</h2>',
                                          '<h2 id="8-verification-with-the-ros-2-cli">8. Verification with the ROS 2 CLI</h2>')
                content = content.replace('<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge: AMR Operational Speed Mode & Zone Governor Service Server</h2>',
                                          '<h2 id="9-hands-on-student-challenge">9. Hands-on Student Challenge: AMR Operational Speed Mode & Zone Governor Service Server</h2>')
                
                lesson['html_content'] = content
                
                # Update subtopics
                lesson['subtopics'] = [
                    {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
                    {"id": "2-decision-matrix-topics-vs-services-vs-actions", "title": "2. Decision Matrix: Topics vs Services vs Actions"},
                    {"id": "3-inspecting-service-interfaces-cli-tools", "title": "3. Inspecting Service Interfaces & Essential Service CLI Tools"},
                    {"id": "4-building-the-emergency-stop-safety-service-server", "title": "4. Building the Emergency Stop Safety Service Server in Python"},
                    {"id": "5-configuring-setuppy-building-testing-server-with-cli", "title": "5. Configuring setup.py, Building & Testing the Service Server with ROS 2 CLI"},
                    {"id": "6-the-critical-singlethreadedexecutor-deadlock-bug", "title": "6. The Critical SingleThreadedExecutor Deadlock Bug"},
                    {"id": "7-building-an-asynchronous-emergency-stop-client", "title": "7. Building an Asynchronous Emergency Stop Client in Python"},
                    {"id": "8-verification-with-the-ros-2-cli", "title": "8. Verification with the ROS 2 CLI"},
                    {"id": "9-hands-on-student-challenge", "title": "9. Hands-on Student Challenge: AMR Operational Speed Mode & Zone Governor Service Server"}
                ]
                print("Lesson 07 updated successfully!")
            else:
                print("Could not find Lesson 07 target header!")

def update_lesson_05(data):
    for lesson in data['lessons']:
        if lesson.get('id') == 'lesson_05':
            content = lesson['html_content']
            
            section_3_text = r'''<hr class="divider">
<h2 id="3-inspecting-topic-interfaces-cli-tools">3. Inspecting Topic Message Interfaces &amp; Essential Topic CLI Tools</h2>
<p>Before writing a Publisher or Subscriber in Python, you must understand the <strong>data schema</strong> of the messages flowing across the DDS network. Unlike loosely-typed web protocols, ROS 2 topics strictly enforce typed message structures defined in <code class="inline-code">.msg</code> files.</p>

<h3 id="31-discovering-available-topic-messages">3.1 Discovering Available Message Interfaces</h3>
<p>To see which message types are available on your system, use the <code class="inline-code">ros2 interface</code> tool:</p>

<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash"># List all message (.msg) types installed in your ROS 2 environment:
ros2 interface list | grep msg

# View all messages provided by the standard sensor package:
ros2 interface package sensor_msgs

# View messages for geometry and kinematics:
ros2 interface package geometry_msgs</code></pre>
</div>

<h3 id="32-inspecting-message-definitions-ros2-interface-show">3.2 Inspecting Message Definitions (<code class="inline-code">ros2 interface show</code>)</h3>
<p>In this lesson, our ultrasonic rangefinder node will publish distance measurements using <code class="inline-code">sensor_msgs/msg/Range</code>. Let's inspect its exact definition:</p>

<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">ros2 interface show sensor_msgs/msg/Range</code></pre>
</div>

<p><strong>Expected Terminal Output:</strong></p>
<div class="code-container terminal-window" data-language="plaintext">
  <div class="terminal-header">
    <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="terminal-title">Terminal &mdash; sensor_msgs/msg/Range Definition</span>
  </div>
  <pre><code class="language-plaintext">std_msgs/Header header
    builtin_interfaces/Time stamp
        int32 sec
        uint32 nanosec
    string frame_id
uint8 ULTRASOUND=0
uint8 INFRARED=1
uint8 radiation_type
float32 field_of_view
float32 min_range
float32 max_range
float32 range
float32 variance</code></pre>
</div>

<div class="code-breakdown-card" style="margin: 1.5rem 0;">
  <h4 class="code-breakdown-title">🔬 Data Structure Breakdown: sensor_msgs/msg/Range</h4>
  <p class="code-breakdown-intro">How the fields map directly to Python object attributes when constructing messages:</p>
  <ul class="code-breakdown-list">
    <li class="code-breakdown-item"><strong>Header Metadata (<code>header.stamp</code>, <code>header.frame_id</code>):</strong> Standard ROS 2 timestamp and TF coordinate frame name (e.g. <code>"ultrasound_front_link"</code>).</li>
    <li class="code-breakdown-item"><strong>Radiation Enum (<code>radiation_type</code>):</strong> An 8-bit unsigned integer. Constants are declared in the message: <code>Range.ULTRASOUND = 0</code> and <code>Range.INFRARED = 1</code>.</li>
    <li class="code-breakdown-item"><strong>Sensor Bounds (<code>min_range</code>, <code>max_range</code>):</strong> Physical operating limits of the sonar transducer in meters (e.g., <code>0.02</code> to <code>2.0</code> m).</li>
    <li class="code-breakdown-item"><strong>Active Distance (<code>range</code>):</strong> The live obstacle distance measured in meters. This is the primary value your subscriber will monitor.</li>
  </ul>
</div>

<p>Notice how straightforward the Python instantiation is once you know the schema:</p>
<div class="code-container" data-language="python">
  <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-python">from sensor_msgs.msg import Range

msg = Range()
msg.header.stamp = self.get_clock().now().to_msg()
msg.header.frame_id = 'ultrasound_front_link'
msg.radiation_type = Range.ULTRASOUND
msg.field_of_view = 0.5236  # ~30 degrees in radians
msg.min_range = 0.02
msg.max_range = 2.0
msg.range = 0.65            # 65 cm to detected obstacle</code></pre>
</div>

<h3 id="33-essential-topic-cli-commands">3.3 Essential Topic CLI Developer Cheat Sheet</h3>
<p>Keep these CLI tools handy when developing and verifying publishers and subscribers:</p>

<div style="overflow-x: auto; margin: 1.5rem 0;">
  <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
    <thead>
      <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
        <th style="padding: 0.6rem 0.8rem;">Command</th>
        <th style="padding: 0.6rem 0.8rem;">Purpose</th>
        <th style="padding: 0.6rem 0.8rem;">When to Use</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 interface show &lt;type&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Displays the fields, datatypes, and constants of a <code class="inline-code">.msg</code> interface</td>
        <td style="padding: 0.6rem 0.8rem;"><strong>Before writing code</strong> to verify exact field names and types</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 interface package &lt;pkg&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Lists all message interfaces in a package</td>
        <td style="padding: 0.6rem 0.8rem;">Discovering supported telemetry formats</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 topic list</code></td>
        <td style="padding: 0.6rem 0.8rem;">Lists all active topics currently advertised on the DDS bus</td>
        <td style="padding: 0.6rem 0.8rem;">Verifying your publisher node successfully created the topic</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 topic type &lt;topic&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Shows the message type published on a topic</td>
        <td style="padding: 0.6rem 0.8rem;">Identifying what message class to import for your subscriber</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 topic info &lt;topic&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Displays publisher count, subscriber count, and active QoS profiles</td>
        <td style="padding: 0.6rem 0.8rem;">Diagnosing connection mismatches or missing subscribers</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 topic echo &lt;topic&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Prints live message data streaming over the topic to your console</td>
        <td style="padding: 0.6rem 0.8rem;">Verifying telemetry output before writing subscriber logic</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 topic hz &lt;topic&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Measures the average publishing rate in Hertz (messages/sec)</td>
        <td style="padding: 0.6rem 0.8rem;">Ensuring sensor timers publish at expected frequencies</td>
      </tr>
      <tr>
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 topic pub &lt;topic&gt; &lt;type&gt; "&lt;yaml&gt;"</code></td>
        <td style="padding: 0.6rem 0.8rem;">Publishes mock messages directly from the command line</td>
        <td style="padding: 0.6rem 0.8rem;">Testing your subscriber node before real sensors or publishers are online</td>
      </tr>
    </tbody>
  </table>
</div>
'''
            target_hdr = '<h2 id="3-writing-the-ultrasonic-sensor-publisher-node">3. Writing the Ultrasonic Sensor Rangefinder Publisher Node</h2>'
            if target_hdr in content:
                content = content.replace(target_hdr, section_3_text + '\n<hr class="divider">\n<h2 id="4-writing-the-ultrasonic-sensor-publisher-node">4. Writing the Ultrasonic Sensor Rangefinder Publisher Node</h2>')
                content = content.replace('<h2 id="4-configuring-setuppy-building-testing-publisher">4. Configuring setup.py, Building & Testing the Publisher</h2>',
                                          '<h2 id="5-configuring-setuppy-building-testing-publisher">5. Configuring setup.py, Building & Testing the Publisher</h2>')
                content = content.replace('<h2 id="5-writing-the-subscriber-node">5. Writing the Collision Safety Monitor Subscriber Node</h2>',
                                          '<h2 id="6-writing-the-subscriber-node">6. Writing the Collision Safety Monitor Subscriber Node</h2>')
                content = content.replace('<h2 id="6-developer-superpower-symlink-install">6. Developer Superpower: The --symlink-install Build Mode</h2>',
                                          '<h2 id="7-developer-superpower-symlink-install">7. Developer Superpower: The --symlink-install Build Mode</h2>')
                content = content.replace('<h2 id="7-quality-of-service-qos-deep-dive">7. Quality of Service (QoS) Deep Dive</h2>',
                                          '<h2 id="8-quality-of-service-qos-deep-dive">8. Quality of Service (QoS) Deep Dive</h2>')
                content = content.replace('<h3 id="73-multi-pubsub-architecture">7.3 Multi-Topic Architecture: Single Node with Multiple Publishers & Subscribers</h3>',
                                          '<h3 id="83-multi-pubsub-architecture">8.3 Multi-Topic Architecture: Single Node with Multiple Publishers & Subscribers</h3>')
                content = content.replace('<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge: Autonomous Mobile Robot Square Patrol Controller</h2>',
                                          '<h2 id="9-hands-on-student-challenge">9. Hands-on Student Challenge: Autonomous Mobile Robot Square Patrol Controller</h2>')

                lesson['html_content'] = content

                lesson['subtopics'] = [
                    {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
                    {"id": "2-topic-communication-architecture", "title": "2. Topic Communication Architecture & DDS"},
                    {"id": "3-inspecting-topic-interfaces-cli-tools", "title": "3. Inspecting Topic Message Interfaces & Essential Topic CLI Tools"},
                    {"id": "4-writing-the-ultrasonic-sensor-publisher-node", "title": "4. Writing the Ultrasonic Sensor Rangefinder Publisher Node"},
                    {"id": "5-configuring-setuppy-building-testing-publisher", "title": "5. Configuring setup.py, Building & Testing the Publisher"},
                    {"id": "6-writing-the-subscriber-node", "title": "6. Writing the Collision Safety Monitor Subscriber Node"},
                    {"id": "7-developer-superpower-symlink-install", "title": "7. Developer Superpower: The --symlink-install Build Mode"},
                    {"id": "8-quality-of-service-qos-deep-dive", "title": "8. Quality of Service (QoS) Deep Dive"},
                    {"id": "83-multi-pubsub-architecture", "title": "8.3 Multi-Topic Architecture: Single Node with Multiple Publishers & Subscribers"},
                    {"id": "9-hands-on-student-challenge", "title": "9. Hands-on Student Challenge: Autonomous Mobile Robot Square Patrol Controller"}
                ]
                print("Lesson 05 updated successfully!")
            else:
                print("Could not find Lesson 05 target header!")

def update_lesson_10(data):
    for lesson in data['lessons']:
        if lesson.get('id') == 'lesson_10':
            content = lesson['html_content']

            section_3_text = r'''<hr class="divider">
<h2 id="3-inspecting-action-interfaces-cli-tools">3. Inspecting Action Interfaces &amp; Essential Action CLI Tools</h2>
<p>Unlike simple topics (one-way data) or services (one-time request/response), an <strong>Action</strong> represents a long-running, preemptible goal with three distinct operational phases: the initial <strong>Goal</strong>, continuous <strong>Feedback</strong>, and the ultimate <strong>Result</strong>. Before writing an Action Server or Client, you must inspect the <code class="inline-code">.action</code> interface file to understand all three data schemas.</p>

<h3 id="31-discovering-available-action-interfaces">3.1 Discovering Available Action Interfaces</h3>
<p>To inspect what action types are available across your ROS 2 environment:</p>

<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash"># List all action (.action) interfaces installed on your system:
ros2 interface list | grep action

# Query action interfaces in standard packages:
ros2 interface package action_tutorials_interfaces

# Query navigation actions in Nav2 and our AMR workspace:
ros2 interface package nav2_msgs
ros2 interface package nexus_amr_interfaces</code></pre>
</div>

<h3 id="32-inspecting-action-definitions-ros2-interface-show">3.2 Inspecting Action Definitions (<code class="inline-code">ros2 interface show</code>)</h3>
<p>In this lesson, our AMR will execute linear distance traversal using <code class="inline-code">nexus_amr_interfaces/action/NavigateDistance</code>. Let's inspect its complete definition:</p>

<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">ros2 interface show nexus_amr_interfaces/action/NavigateDistance</code></pre>
</div>

<p><strong>Expected Terminal Output:</strong></p>
<div class="code-container terminal-window" data-language="plaintext">
  <div class="terminal-header">
    <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="terminal-title">Terminal &mdash; Action Interface Tri-Partite Structure</span>
  </div>
  <pre><code class="language-plaintext"># 1. Goal: Target linear distance to traverse in meters and velocity limit
float32 target_distance_m
float32 max_speed_mps
---
# 2. Result: Final status upon completing or aborting the motion
bool reached_target
float32 actual_distance_travelled_m
string status_message
---
# 3. Feedback: Real-time progress emitted during the long-running motion
float32 distance_remaining_m
float32 current_speed_mps
float32 percent_complete</code></pre>
</div>

<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Understanding the Two Sets of Three Hyphens (<code>---</code>) Delimiters:</strong><br>
    Notice that while a <code class="inline-code">.srv</code> has one <code class="inline-code">---</code> separator, an <code class="inline-code">.action</code> definition has <strong>two</strong> <code class="inline-code">---</code> separators dividing the file into three distinct structures:<br><br>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><strong>Section 1 (Top &mdash; Goal):</strong> Fields supplied by the Action Client when requesting a task (e.g. <code class="inline-code">goal_handle.request.target_distance_m</code>, <code class="inline-code">goal_handle.request.max_speed_mps</code>).</li>
      <li><strong>Section 2 (Middle &mdash; Result):</strong> The final payload constructed and returned by the Action Server when the task finishes or is aborted (e.g. <code class="inline-code">result.reached_target</code>, <code class="inline-code">result.actual_distance_travelled_m</code>, <code class="inline-code">result.status_message</code>).</li>
      <li><strong>Section 3 (Bottom &mdash; Feedback):</strong> High-frequency periodic progress updates streamed by the server back to the client while the task is underway (e.g. <code class="inline-code">feedback_msg.distance_remaining_m</code>, <code class="inline-code">feedback_msg.percent_complete</code>).</li>
    </ul>
  </div>
</div>

<h3 id="33-essential-action-cli-commands">3.3 Essential Action CLI Developer Cheat Sheet</h3>
<p>Keep these CLI tools handy whenever developing, testing, and verifying Action Servers and Clients:</p>

<div style="overflow-x: auto; margin: 1.5rem 0;">
  <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
    <thead>
      <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
        <th style="padding: 0.6rem 0.8rem;">Command</th>
        <th style="padding: 0.6rem 0.8rem;">Purpose</th>
        <th style="padding: 0.6rem 0.8rem;">When to Use</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 interface show &lt;action_type&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Displays the Goal, Result, and Feedback fields of an action interface</td>
        <td style="padding: 0.6rem 0.8rem;"><strong>Before writing code</strong> to understand data contracts across all 3 phases</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 interface package &lt;pkg&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Lists all action interfaces packaged inside a ROS 2 package</td>
        <td style="padding: 0.6rem 0.8rem;">Discovering navigation capabilities in Nav2 / AMR packages</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 action list</code></td>
        <td style="padding: 0.6rem 0.8rem;">Lists all active action servers currently registered on the DDS bus</td>
        <td style="padding: 0.6rem 0.8rem;">Checking if your action server has started and advertised successfully</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 action info &lt;action_name&gt;</code></td>
        <td style="padding: 0.6rem 0.8rem;">Shows the action type, registered action servers, and active action clients</td>
        <td style="padding: 0.6rem 0.8rem;">Diagnosing connection issues between action clients and servers</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 action send_goal &lt;name&gt; &lt;type&gt; "&lt;yaml&gt;"</code></td>
        <td style="padding: 0.6rem 0.8rem;">Dispatches a goal directly from the terminal without writing a client</td>
        <td style="padding: 0.6rem 0.8rem;">Testing server execution, motion math, and completion results</td>
      </tr>
      <tr>
        <td style="padding: 0.6rem 0.8rem;"><code class="inline-code">ros2 action send_goal &lt;name&gt; &lt;type&gt; "&lt;yaml&gt;" --feedback</code></td>
        <td style="padding: 0.6rem 0.8rem;">Dispatches a goal and streams live progress feedback to the console</td>
        <td style="padding: 0.6rem 0.8rem;">Verifying telemetry rates, progress percentages, and trajectory calculations</td>
      </tr>
    </tbody>
  </table>
</div>
'''

            target_hdr = '<h2 id="3-building-the-linear-traversal-action-server">3. Building the Linear Traversal Action Server in Python</h2>'
            if target_hdr in content:
                content = content.replace(target_hdr, section_3_text + '\n<hr class="divider">\n<h2 id="4-building-the-linear-traversal-action-server">4. Building the Linear Traversal Action Server in Python</h2>')
                content = content.replace('<h2 id="4-building-the-asynchronous-navigation-action-client">4. Building the Asynchronous Navigation Action Client in Python</h2>',
                                          '<h2 id="5-building-the-asynchronous-navigation-action-client">5. Building the Asynchronous Navigation Action Client in Python</h2>')
                content = content.replace('<h2 id="5-verification-with-the-ros-2-action-cli">5. Verification with the ROS 2 Action CLI</h2>',
                                          '<h2 id="6-verification-with-the-ros-2-action-cli">6. Verification with the ROS 2 Action CLI</h2>')
                content = content.replace('<h2 id="6-from-navigatedistance-to-robotics-patrol">6. From NavigateDistance to Robotics: Waypoint Patrol & Navigation</h2>',
                                          '<h2 id="7-from-navigatedistance-to-robotics-patrol">7. From NavigateDistance to Robotics: Waypoint Patrol & Navigation</h2>')
                content = content.replace('<h2 id="7-hands-on-student-challenge">7. Hands-on Student Challenge: Long-Running NavigateDistance Action Server with Feedback</h2>',
                                          '<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge: Long-Running NavigateDistance Action Server with Feedback</h2>')

                lesson['html_content'] = content

                lesson['subtopics'] = [
                    {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
                    {"id": "2-action-communication-architecture", "title": "2. Action Communication Architecture"},
                    {"id": "3-inspecting-action-interfaces-cli-tools", "title": "3. Inspecting Action Interfaces & Essential Action CLI Tools"},
                    {"id": "4-building-the-linear-traversal-action-server", "title": "4. Building the Linear Traversal Action Server in Python"},
                    {"id": "5-building-the-asynchronous-navigation-action-client", "title": "5. Building the Asynchronous Navigation Action Client in Python"},
                    {"id": "6-verification-with-the-ros-2-action-cli", "title": "6. Verification with the ROS 2 Action CLI"},
                    {"id": "7-from-navigatedistance-to-robotics-patrol", "title": "7. From NavigateDistance to Robotics: Waypoint Patrol & Navigation"},
                    {"id": "8-hands-on-student-challenge", "title": "8. Hands-on Student Challenge: Long-Running NavigateDistance Action Server with Feedback"}
                ]
                print("Lesson 10 updated successfully!")
            else:
                print("Could not find Lesson 10 target header!")

with open('ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

update_lesson_07(data)
update_lesson_05(data)
update_lesson_10(data)

with open('ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("All lessons updated and saved to lessonsData.json!")
