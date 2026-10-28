import json
import re

file_path = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for lesson in data["lessons"]:
    if lesson["id"] == "lesson_07":
        html = lesson["html_content"]
        sections = re.split(r"(?=<h2 )", html)

        # Section 1: Overview & Learning Objectives
        s1 = sections[1]
        old_outcomes = """    <li class="learning-objective-item">
      <span class="objective-num-badge">4</span>
      <span class="objective-text">Understand the critical <strong>SingleThreadedExecutor Deadlock Bug</strong> and how to avoid it.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">5</span>
      <span class="objective-text">Trigger and test service endpoints directly from the command line using <code class="inline-code">ros2 service call</code>.</span>
    </li>"""
        new_outcomes = """    <li class="learning-objective-item">
      <span class="objective-num-badge">4</span>
      <span class="objective-text">Trigger and test service endpoints directly from the command line using <code class="inline-code">ros2 service call</code>.</span>
    </li>
    <li class="learning-objective-item">
      <span class="objective-num-badge">5</span>
      <span class="objective-text">Register executable entry points in <code class="inline-code">setup.py</code>, build with <code class="inline-code">colcon</code>, and execute the verified server-client pair.</span>
    </li>"""
        if old_outcomes in s1:
            s1 = s1.replace(old_outcomes, new_outcomes)
            print("Updated s1 outcomes successfully!")
        else:
            print("Warning: old_outcomes not matched in s1")

        # Section 2: Decision Matrix
        s2 = sections[2]

        # Section 3: Server
        s3 = sections[3]

        # Section 4: Server setup.py & CLI
        s4 = sections[4]
        # In Step 2 of Section 4, ensure it only registers the server:
        s4_old_step2 = """            # >>> REGISTER EMERGENCY STOP SAFETY SERVICE SERVER <<<
            'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
            'emergency_stop_client = nexus_amr_basics.emergency_stop_client:main',"""
        s4_new_step2 = """            # >>> REGISTER EMERGENCY STOP SAFETY SERVICE SERVER <<<
            'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',"""
        if s4_old_step2 in s4:
            s4 = s4.replace(s4_old_step2, s4_new_step2)
            print("Updated s4 step 2 entry point to server only!")

        # Section 5 from previous: (Deadlock bug) -> REMOVED completely!

        # Section 6 from previous: (Client script) -> becomes new Section 5
        s6 = sections[6]
        # Change header to 5. Building an Asynchronous Emergency Stop Client in Python
        s6 = re.sub(
            r'<h2 id="6-building-an-asynchronous-emergency-stop-client">6\. Building an Asynchronous Emergency Stop Client in Python</h2>',
            '<h2 id="5-building-an-asynchronous-emergency-stop-client">5. Building an Asynchronous Emergency Stop Client in Python</h2>',
            s6
        )

        # Add client script location and filename before the script like in server
        old_client_intro = '<p>When an AMR detects an imminent hazard, it must invoke the emergency stop service <strong>without deadlocking</strong> the calling node. In ROS 2, always use <code class="inline-code">call_async()</code>:</p>'
        new_client_intro = '<p>When an AMR detects an imminent hazard, it must invoke the emergency stop service <strong>without deadlocking</strong> the calling node. In ROS 2, always use <code class="inline-code">call_async()</code>.</p>\n\n<p>Create your safety service client script at <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/emergency_stop_client.py</code>:</p>'
        if old_client_intro in s6:
            s6 = s6.replace(old_client_intro, new_client_intro)
            print("Added client script location and filename before script!")
        else:
            print("Warning: old_client_intro not matched in s6")

        # Remove "Operational Note: The Offline Service Wait Drill"
        drill_pattern = r'<div class="alert-callout alert-info" style="margin: 1\.75rem 0;">\s*<div class="alert-icon">⏱️</div>\s*<div class="alert-body">\s*<strong>Operational Note: The Offline Service Wait Drill:</strong>.*?</div>\s*</div>\s*'
        s6_clean = re.sub(drill_pattern, '', s6, flags=re.DOTALL)
        if s6_clean != s6:
            print("Successfully removed Offline Service Wait Drill from client section!")
            s6 = s6_clean
        else:
            print("Warning: drill pattern not found in s6!")

        # New Section 6: Configuring setup.py & Verifying the Client-Server Pair
        new_s6 = '''<h2 id="6-configuring-setuppy-verifying-client-server-pair">6. Configuring setup.py &amp; Verifying the Client-Server Pair</h2>
<p>With both nodes coded, register the client executable in <code class="inline-code">setup.py</code>, recompile your package with <code class="inline-code">colcon</code>, and test the paired safety communication.</p>

<div class="file-edit-instruction-card">
  <div class="file-edit-header">
    <div class="file-edit-header-left">
      <span>📝 Step-by-Step File Modification Guide</span>
    </div>
    <span class="file-edit-badge">~/ros2_ws/src/nexus_amr_basics/setup.py</span>
  </div>
  <div class="file-edit-body">
    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 1</span>
        <span>Open the Target File</span>
      </div>
      <p class="step-description">Open <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/setup.py</code> in your editor.</p>
    </div>

    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 2</span>
        <span>Locate Insertion Point &amp; Add Client Executable</span>
      </div>
      <p class="step-description">Append the emergency stop client entry point right below the server in <code class="inline-code">'console_scripts'</code>:</p>
      <div class="code-container" data-language="python">
        <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
        <pre><code class="language-python">    entry_points={
        'console_scripts': [
            'ultrasonic_publisher = nexus_amr_basics.ultrasonic_sensor_node:main',
            'collision_monitor = nexus_amr_basics.collision_monitor_node:main',
            'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
            # >>> REGISTER EMERGENCY STOP SAFETY CLIENT <<<
            'emergency_stop_client = nexus_amr_basics.emergency_stop_client:main',
        ],
    },</code></pre>
      </div>
    </div>

    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 3</span>
        <span>Verify the Full File After Editing</span>
      </div>
      <p class="step-description">Self-check your file against the complete reference below to confirm indentation and closing brackets:</p>
      <details class="file-edit-dropdown">
        <summary class="file-edit-summary">
          <span>📄 View Complete setup.py with Server and Client Entry Points</span>
          <span class="file-edit-toggle-icon">▶</span>
        </summary>
        <div class="file-edit-dropdown-content">
          <div class="code-container" data-language="python">
            <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
            <pre><code class="language-python">from setuptools import find_packages, setup

package_name = 'nexus_amr_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Nexus AMR Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Sensor &amp; Telemetry Fundamentals',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'ultrasonic_publisher = nexus_amr_basics.ultrasonic_sensor_node:main',
            'collision_monitor = nexus_amr_basics.collision_monitor_node:main',
            'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
            'emergency_stop_client = nexus_amr_basics.emergency_stop_client:main',
        ],
    },
)</code></pre>
          </div>
        </div>
      </details>
    </div>
  </div>
</div>

<h3 id="62-build-and-run-paired-safety-nodes">6.2 Build and Run the Paired Safety Nodes</h3>
<p>Recompile your package with <code class="inline-code">colcon</code> so the new client executable is indexed:</p>
<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
</div>

<p>Deploy and test the paired safety communication across two terminal windows:</p>

<p><strong>Terminal 1: Start the Emergency Stop Safety Service Server</strong></p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">source /opt/ros/jazzy/setup.bash
source ~/ros2_ws/install/setup.bash
ros2 run nexus_amr_basics emergency_stop_server
# Expected Output:
# [INFO] [emergency_stop_server]: EmergencyStopServer initialized. Ready to receive safety commands on "/robot/emergency_stop"...</code></pre>
</div>

<p><strong>Terminal 2: Run the Asynchronous Emergency Stop Client</strong></p>
<div class="code-container" data-language="bash">
<div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-bash">source /opt/ros/jazzy/setup.bash
source ~/ros2_ws/install/setup.bash
ros2 run nexus_amr_basics emergency_stop_client "Obstacle detected within 0.35m critical safety envelope"
# Expected Output:
# [INFO] [emergency_stop_client]: EmergencyStopClient connected to safety service.
# [INFO] [emergency_stop_client]: Dispatching Emergency Stop Request: stop=True, reason="Obstacle detected within 0.35m critical safety envelope"
# [INFO] [emergency_stop_client]: SAFETY RESPONSE RECEIVED: Success: True | Status: EMERGENCY BRAKE ENGAGED: Actuators halted. Reason: "Obstacle detected within 0.35m critical safety envelope" | Time: 1729017234.120 s</code></pre>
</div>
<hr class="divider">
'''

        # Section 8 from previous: (Challenge) -> becomes new Section 7
        s8 = sections[8]
        s8 = re.sub(
            r'<h2 id="8-hands-on-student-challenge">8\. Hands-on Student Challenge: Autonomous Mobile Robot Operational Speed Mode &amp; Zone Governor Service Server</h2>',
            '<h2 id="7-hands-on-student-challenge">7. Hands-on Student Challenge: Autonomous Mobile Robot Operational Speed Mode &amp; Zone Governor Service Server</h2>',
            s8
        )
        s8 = re.sub(
            r'<h3 id="81-starter-template">8\.1 Starter Template: <code class="inline-code">m02_l07_task_speed_mode_server\.py</code></h3>',
            '<h3 id="71-starter-template">7.1 Starter Template: <code class="inline-code">m02_l07_task_speed_mode_server.py</code></h3>',
            s8
        )
        s8 = re.sub(
            r'<h3 id="82-verification-steps">8\.2 Verification Steps &amp; Expected Terminal Output</h3>',
            '<h3 id="72-verification-steps">7.2 Verification Steps &amp; Expected Terminal Output</h3>',
            s8
        )

        # Assemble new html_content:
        # s1 (Sec 1), s2 (Sec 2), s3 (Sec 3), s4 (Sec 4), s6 (New Sec 5), new_s6 (New Sec 6), s8 (New Sec 7)
        new_html = s1 + s2 + s3 + s4 + s6 + new_s6 + s8
        lesson["html_content"] = new_html

        # Update subtopics
        lesson["subtopics"] = [
            {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
            {"id": "2-decision-matrix-topics-vs-services-vs-actions", "title": "2. Decision Matrix: Topics vs Services vs Actions"},
            {"id": "3-building-the-emergency-stop-safety-service-server", "title": "3. Building the Emergency Stop Safety Service Server in Python"},
            {"id": "4-configuring-setuppy-building-testing-server-with-cli", "title": "4. Configuring setup.py, Building & Testing the Service Server with ROS 2 CLI"},
            {"id": "5-building-an-asynchronous-emergency-stop-client", "title": "5. Building an Asynchronous Emergency Stop Client in Python"},
            {"id": "6-configuring-setuppy-verifying-client-server-pair", "title": "6. Configuring setup.py & Verifying the Client-Server Pair"},
            {"id": "7-hands-on-student-challenge", "title": "7. Hands-on Student Challenge: Autonomous Mobile Robot Operational Speed Mode & Zone Governor Service Server"}
        ]
        print("Updated lesson_07 subtopics!")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print("File saved successfully!")
