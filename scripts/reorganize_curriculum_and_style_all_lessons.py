#!/usr/bin/env python3
"""
Comprehensive Curriculum Reorganizer and Objectives Styler:
1. Moves Custom Interfaces after Action (so Lesson 07=Services, 08=Parameters, 09=Launch, 10=Actions, 11=Custom Interfaces).
2. Updates Service lesson: Server first -> setup.py -> build & test with CLI -> Client -> test end-to-end; embeds service-flow-root.
3. Updates Action lesson: Action Server first -> setup.py -> build & test with CLI -> Client -> test end-to-end; embeds action-flow-root.
4. Restores Lesson 03: Workspace tree SVG, Turtlesim CLI explanations, mounts turtlesim-teleop-flow-root.
5. Restores Lesson 04: Package tree SVG, mounts package-structure-flow-root, standardized 3-step file modification cards.
6. Converts Section 1 Learning Objectives in ALL 23 lessons into the standardized, sleek .learning-objectives-card UI.
"""

import json
import re
import os

LESSONS_JSON_PATH = "lms/src/data/lessonsData.json"

def format_objectives_card(items):
    count = len(items)
    items_html = []
    for idx, it in enumerate(items):
        clean_it = it.strip()
        items_html.append(f"""    <li class="learning-objective-item">
      <span class="objective-num-badge">{idx + 1}</span>
      <span class="objective-text">{clean_it}</span>
    </li>""")
    
    items_str = "\n".join(items_html)
    return f"""<div class="learning-objectives-card">
  <div class="learning-objectives-header">
    <div class="objectives-icon-badge">
      <span style="font-size: 1.15rem; line-height: 1;">🎯</span>
    </div>
    <div class="objectives-title-group">
      <h3 class="objectives-main-title">Learning Objectives &amp; Core Outcomes</h3>
      <span class="objectives-subtitle">By the end of this lesson, you will be able to:</span>
    </div>
    <span class="objectives-count-badge">{count} CORE OUTCOMES</span>
  </div>
  <ul class="learning-objectives-list">
{items_str}
  </ul>
</div>"""

def standardize_objectives_in_html(html, lid):
    # Check if already has .learning-objectives-card
    if 'class="learning-objectives-card"' in html:
        return html

    # Pattern 1: <p>By the end...</p><ol>...</ol> or <ul>
    m = re.search(r'(?:By the end of this[^<]*|Learning Objectives[^<]*|In this lesson, you will master[^<]*)</p>\s*<([ou]l)>(.*?)</\1>', html, re.DOTALL | re.IGNORECASE)
    if m:
        raw_items = re.findall(r'<li>(.*?)</li>', m.group(2), re.DOTALL)
        if raw_items:
            card = format_objectives_card(raw_items)
            return html.replace(m.group(0), card)

    # Pattern 2: Alert box (like lesson 05)
    m2 = re.search(r'<div class="alert alert-note">\s*<div class="alert-title">🎯 Key Learning Objectives</div>\s*<ul>(.*?)</ul>\s*</div>', html, re.DOTALL)
    if m2:
        raw_items = re.findall(r'<li>(.*?)</li>', m2.group(1), re.DOTALL)
        if raw_items:
            card = format_objectives_card(raw_items)
            return html.replace(m2.group(0), card)

    # Pattern 3: Alert-callout
    m3 = re.search(r'<div class="alert-callout alert-tip">.*?<div class="alert-title">🎯 Key Objectives</div>\s*<([ou]l)>(.*?)</\1>\s*</div>', html, re.DOTALL)
    if m3:
        raw_items = re.findall(r'<li>(.*?)</li>', m3.group(2), re.DOTALL)
        if raw_items:
            card = format_objectives_card(raw_items)
            return html.replace(m3.group(0), card)

    return html

def main():
    with open(LESSONS_JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    lessons = data["lessons"]
    print(f"Loaded {len(lessons)} lessons.")

    # 1. Identify key lessons
    l_interfaces = next(l for l in lessons if "Interfaces & Custom" in l["title"])
    l_services = next(l for l in lessons if "Service Servers & Clients" in l["title"])
    l_params = next(l for l in lessons if "Dynamic Parameters" in l["title"])
    l_launch = next(l for l in lessons if "Python Launch Files" in l["title"])
    l_actions = next(l for l in lessons if "Action Servers & Clients" in l["title"])

    # 2. Reorder: Services(7) -> Parameters(8) -> Launch(9) -> Actions(10) -> Custom Interfaces(11)
    reordered_sublist = [l_services, l_params, l_launch, l_actions, l_interfaces]

    # Reassign IDs, nums, filenames, and links
    new_configs = [
        {
            "id": "lesson_07", "num": 7, "num_str": "07",
            "title": "Communication Mechanism II: Service Servers & Clients in Python",
            "slug": "services-server-client-python",
            "filename": "07_services_server_client_python.md",
            "prev_id": "lesson_06", "next_id": "lesson_08"
        },
        {
            "id": "lesson_08", "num": 8, "num_str": "08",
            "title": "Communication Mechanism III: Dynamic Parameters & YAML Configuration",
            "slug": "dynamic-parameters-and-yaml",
            "filename": "08_dynamic_parameters_and_yaml.md",
            "prev_id": "lesson_07", "next_id": "lesson_09"
        },
        {
            "id": "lesson_09", "num": 9, "num_str": "09",
            "title": "Runtime Management & Python Launch Files",
            "slug": "launch-files-and-runtime-management",
            "filename": "09_launch_files_and_runtime_management.md",
            "prev_id": "lesson_08", "next_id": "lesson_10"
        },
        {
            "id": "lesson_10", "num": 10, "num_str": "10",
            "title": "Communication Mechanism IV: Action Servers & Clients in Python",
            "slug": "ros2-actions-server-and-client",
            "filename": "10_ros2_actions_server_and_client.md",
            "prev_id": "lesson_09", "next_id": "lesson_11"
        },
        {
            "id": "lesson_11", "num": 11, "num_str": "11",
            "title": "ROS 2 Interfaces & Custom Messages, Services & Actions (.msg, .srv, .action)",
            "slug": "interfaces-and-custom-messages",
            "filename": "11_interfaces_and_custom_messages.md",
            "prev_id": "lesson_10", "next_id": "lesson_12"
        }
    ]

    for item, cfg in zip(reordered_sublist, new_configs):
        item.update(cfg)

    # Put back into lessons list at index 6..10
    lessons[6:11] = reordered_sublist

    # Update lesson 06 next_id and lesson 12 prev_id
    lessons[5]["next_id"] = "lesson_07"
    lessons[11]["prev_id"] = "lesson_11"

    # Update Module 2 definition
    for m in data.get("modules", []):
        if m.get("id") == 2:
            m["lessons"] = [
                {"id": l["id"], "num_str": l["num_str"], "title": l["title"]}
                for l in lessons[6:13]
            ]

    # 3. Update Lesson 03: Workspace tree SVG, Turtlesim CLI, and portal root
    l03 = lessons[2]
    html03 = l03["html_content"]
    
    # Ensure SVG image is in Section 3
    if "ros2_workspace_tree.svg" not in html03:
        svg_embed_03 = """<div class="diagram-interactive-wrapper" style="text-align: center; margin: 1.5rem 0;">
  <img src="/assets/images/ros2_workspace_tree.svg" alt="ROS 2 Workspace Filesystem Hierarchy" class="lesson-image" style="max-width: 880px; width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: 1px solid var(--border-color);" />
  <p class="image-caption" style="margin-top: 8px; font-size: 0.82rem; color: var(--text-muted); text-align: center;">Figure 3.1: Standard Colcon 4-Directory Workspace Filesystem Layout (~/ros2_ws)</p>
</div>"""
        html03 = re.sub(r'(<h2 id="3-the-ros-2-workspace-architecture">.*?</h2>)', r'\1\n' + svg_embed_03, html03)

    # Ensure Turtlesim CLI & Interactive Flow are present
    if "turtlesim-teleop-flow-root" not in html03:
        turtlesim_interactive_section = """<h2 id="32-turtlesim-simulation-teleoperation-graph">3.2 Turtlesim Simulation, CLI Introspection &amp; Graph Flow</h2>
<p>To inspect active nodes and topics in real-time, launch the built-in ROS 2 Turtlesim physics simulator alongside keyboard teleoperation:</p>

<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash"># Terminal 1: Launch the Turtlesim Canvas Simulator Node
ros2 run turtlesim turtlesim_node

# Terminal 2: Launch the Keyboard Teleoperation Driver Node
ros2 run turtlesim turtle_teleop_key

# Terminal 3: Introspect the Active Computational Graph
ros2 node list
ros2 topic list
ros2 topic echo /turtle1/cmd_vel
ros2 topic info /turtle1/cmd_vel</code></pre>
</div>

<p>Interact with the live animated teleoperation simulator below to visualize how keystrokes translate into continuous <code class="inline-code">geometry_msgs/msg/Twist</code> velocity vectors over the computational graph:</p>

<!-- Interactive Turtlesim Teleop Simulation Portal -->
<div id="turtlesim-teleop-flow-root" style="margin: 1.75rem 0;"></div>
"""
        # Insert before Section 4
        html03 = re.sub(r'(<h2 id="4-step-by-step-creating-a-workspace)', turtlesim_interactive_section + r'\n\1', html03)

    l03["html_content"] = html03

    # 4. Update Lesson 04: Package tree SVG, PackageStructureFlow portal root
    l04 = lessons[3]
    html04 = l04["html_content"]

    if "ros2_package_tree.svg" not in html04:
        svg_embed_04 = """<div class="diagram-interactive-wrapper" style="text-align: center; margin: 1.5rem 0;">
  <img src="/assets/images/ros2_package_tree.svg" alt="ROS 2 Package Filesystem Hierarchy" class="lesson-image" style="max-width: 880px; width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: 1px solid var(--border-color);" />
  <p class="image-caption" style="margin-top: 8px; font-size: 0.82rem; color: var(--text-muted); text-align: center;">Figure 4.1: ROS 2 Python Package File Layout &amp; Configuration Manifests</p>
</div>"""
        html04 = re.sub(r'(<h2 id="2-package-anatomy-what-makes-a-folder-a-ros-2-package">.*?</h2>)', r'\1\n' + svg_embed_04, html04)

    if "package-structure-flow-root" not in html04:
        pkg_portal_embed = """<p>Explore each essential file in a production ROS 2 Python package using the interactive filesystem explorer below:</p>
<div id="package-structure-flow-root" style="margin: 1.75rem 0;"></div>
"""
        html04 = re.sub(r'(<h2 id="3-deep-dive-packagexml-schema-format-3">)', pkg_portal_embed + r'\n\1', html04)

    l04["html_content"] = html04

    # 5. Update Lesson 07 (Services): Add service-flow-root, Server first -> setup.py -> CLI test -> Client -> test
    l07 = lessons[6] # new lesson 07 (Services)
    html07 = l07["html_content"]

    # Embed ServiceFlow interactive engine in Section 2
    if "service-flow-root" not in html07:
        service_flow_embed = """<div id="service-flow-root" style="margin: 1.75rem 0;"></div>"""
        html07 = re.sub(r'(<h2 id="2-decision-matrix-topics-vs-services-vs-actions">.*?</h2>)', r'\1\n' + service_flow_embed, html07)

    # Restructure Server -> setup.py -> CLI test -> Client -> setup.py
    # Check if CLI test comes before Client
    server_first_guide = """<h2 id="4-configuring-setuppy-building-testing-server-with-cli">4. Configuring setup.py, Building &amp; Testing the Service Server with ROS 2 CLI</h2>
<p>Before writing the client node, you must configure your package entry points, compile with symlink installation, and <strong>verify the service server directly using the ROS 2 CLI</strong>.</p>

<div class="file-edit-instruction-card">
  <div class="file-edit-header">
    <div class="file-edit-header-left">
      <span>📝 Step-by-Step File Modification Guide</span>
    </div>
    <span class="file-edit-badge">~/ros2_ws/src/navpro_basics/setup.py</span>
  </div>
  <div class="file-edit-body">
    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 1</span>
        <span>Open the Target File</span>
      </div>
      <p class="step-description">Open <code class="inline-code">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.</p>
    </div>

    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 2</span>
        <span>Locate Insertion Point &amp; Add Lines</span>
      </div>
      <p class="step-description">Register the emergency stop service server executable in <code class="inline-code">'console_scripts'</code>:</p>
      <div class="code-container" data-language="python">
        <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
        <pre><code class="language-python">    entry_points={
        'console_scripts': [
            'ultrasonic_publisher = navpro_basics.ultrasonic_sensor_node:main',
            'collision_monitor = navpro_basics.collision_monitor_node:main',
            # >>> REGISTER EMERGENCY STOP SAFETY SERVICE SERVER <<<
            'emergency_stop_server = navpro_basics.m02_l08_01_service_member_function:main',
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
          <span>📄 View Complete setup.py with Service Server Entry Point</span>
          <span class="file-edit-toggle-icon">▶</span>
        </summary>
        <div class="file-edit-dropdown-content">
          <div class="code-container" data-language="python">
            <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
            <pre><code class="language-python">from setuptools import find_packages, setup

package_name = &#x27;navpro_basics&#x27;

setup(
    name=package_name,
    version=&#x27;1.0.0&#x27;,
    packages=find_packages(exclude=[&#x27;test&#x27;]),
    data_files=[
        (&#x27;share/ament_index/resource_index/packages&#x27;, [&#x27;resource/&#x27; + package_name]),
        (&#x27;share/&#x27; + package_name, [&#x27;package.xml&#x27;]),
    ],
    install_requires=[&#x27;setuptools&#x27;],
    zip_safe=True,
    maintainer=&#x27;NavPro Academy&#x27;,
    maintainer_email=&#x27;instructor@botforge.io&#x27;,
    description=&#x27;ROS 2 Sensor &amp; Telemetry Fundamentals&#x27;,
    license=&#x27;Apache-2.0&#x27;,
    tests_require=[&#x27;pytest&#x27;],
    entry_points={
        &#x27;console_scripts&#x27;: [
            &#x27;ultrasonic_publisher = navpro_basics.ultrasonic_sensor_node:main&#x27;,
            &#x27;collision_monitor = navpro_basics.collision_monitor_node:main&#x27;,
            &#x27;emergency_stop_server = navpro_basics.m02_l08_01_service_member_function:main&#x27;,
        ],
    },
)</code></pre>
          </div>
        </div>
      </details>
    </div>
  </div>
</div>

<h3 id="42-build-and-test-server-with-cli">4.2 Build and Introspect the Service Server with ROS 2 CLI</h3>
<p>Compile the workspace and start the service server in Terminal 1:</p>
<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
ros2 run navpro_basics emergency_stop_server</code></pre>
</div>

<p>In <strong>Terminal 2</strong>, test and verify the service endpoint using the command-line interface:</p>
<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">source /opt/ros/jazzy/setup.bash

# 1. Verify the service is listed
ros2 service list | grep emergency_stop

# 2. Check the service interface type
ros2 service type /navpro/emergency_stop

# 3. Call the service directly from terminal!
ros2 service call /navpro/emergency_stop std_srvs/srv/SetBool "{data: true}"</code></pre>
</div>
<p>You will see the server respond with <code class="inline-code">response: std_srvs.srv.SetBool_Response(success=True, message='AMR Emergency Stop Activated')</code>. <strong>The server is now verified functional!</strong> Next, write the client node to call this programmatically from Python.</p>
"""
    # Replace Section 4 if needed
    if "4. Configuring setup.py, Building &amp; Testing the Service Server" not in html07:
        html07 = re.sub(r'<h2 id="4-the-critical-singlethreadedexecutor-deadlock-bug">.*?</h2>', server_first_guide + '\n<h2 id="5-the-critical-singlethreadedexecutor-deadlock-bug">5. The Critical SingleThreadedExecutor Deadlock Bug</h2>', html07)

    l07["html_content"] = html07

    # 6. Update Lesson 10 (Actions): Add action-flow-root, Action Server first -> setup.py -> CLI test -> Action Client -> test
    l10 = lessons[9] # new lesson 10 (Actions)
    html10 = l10["html_content"]

    # Embed ActionFlow interactive engine in Section 2
    if "action-flow-root" not in html10:
        action_flow_embed = """<div id="action-flow-root" style="margin: 1.75rem 0;"></div>"""
        html10 = re.sub(r'(<h2 id="2-action-communication-architecture">.*?</h2>)', r'\1\n' + action_flow_embed, html10)

    # Server first CLI test before client
    action_server_first_guide = """<h2 id="4-configuring-setuppy-building-testing-action-server-with-cli">4. Configuring setup.py, Building &amp; Testing the Action Server with ROS 2 CLI</h2>
<p>Before implementing the Python client, expose the action server entry point in <code class="inline-code">setup.py</code> and verify it using the ROS 2 Action CLI:</p>

<div class="file-edit-instruction-card">
  <div class="file-edit-header">
    <div class="file-edit-header-left">
      <span>📝 Step-by-Step File Modification Guide</span>
    </div>
    <span class="file-edit-badge">~/ros2_ws/src/navpro_basics/setup.py</span>
  </div>
  <div class="file-edit-body">
    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 1</span>
        <span>Open the Target File</span>
      </div>
      <p class="step-description">Open <code class="inline-code">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.</p>
    </div>

    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 2</span>
        <span>Locate Insertion Point &amp; Add Lines</span>
      </div>
      <p class="step-description">Register the action server console script inside <code class="inline-code">'console_scripts'</code>:</p>
      <div class="code-container" data-language="python">
        <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
        <pre><code class="language-python">    entry_points={
        'console_scripts': [
            'ultrasonic_publisher = navpro_basics.ultrasonic_sensor_node:main',
            'collision_monitor = navpro_basics.collision_monitor_node:main',
            'emergency_stop_server = navpro_basics.m02_l08_01_service_member_function:main',
            # >>> REGISTER NAVIGATION / FIBONACCI ACTION SERVER <<<
            'action_server = navpro_basics.m02_l11_01_fibonacci_action_server:main',
        ],
    },</code></pre>
      </div>
    </div>

    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 3</span>
        <span>Verify the Full File After Editing</span>
      </div>
      <p class="step-description">Self-check your file against the complete reference below:</p>
      <details class="file-edit-dropdown">
        <summary class="file-edit-summary">
          <span>📄 View Complete setup.py with Action Server</span>
          <span class="file-edit-toggle-icon">▶</span>
        </summary>
        <div class="file-edit-dropdown-content">
          <div class="code-container" data-language="python">
            <div class="code-header"><span class="code-lang-tag">python</span><button class="copy-code-btn">📋 Copy</button></div>
            <pre><code class="language-python">from setuptools import find_packages, setup

package_name = &#x27;navpro_basics&#x27;

setup(
    name=package_name,
    version=&#x27;1.0.0&#x27;,
    packages=find_packages(exclude=[&#x27;test&#x27;]),
    data_files=[
        (&#x27;share/ament_index/resource_index/packages&#x27;, [&#x27;resource/&#x27; + package_name]),
        (&#x27;share/&#x27; + package_name, [&#x27;package.xml&#x27;]),
    ],
    install_requires=[&#x27;setuptools&#x27;],
    zip_safe=True,
    maintainer=&#x27;NavPro Academy&#x27;,
    maintainer_email=&#x27;instructor@botforge.io&#x27;,
    description=&#x27;ROS 2 Sensor &amp; Telemetry Fundamentals&#x27;,
    license=&#x27;Apache-2.0&#x27;,
    tests_require=[&#x27;pytest&#x27;],
    entry_points={
        &#x27;console_scripts&#x27;: [
            &#x27;ultrasonic_publisher = navpro_basics.ultrasonic_sensor_node:main&#x27;,
            &#x27;collision_monitor = navpro_basics.collision_monitor_node:main&#x27;,
            &#x27;emergency_stop_server = navpro_basics.m02_l08_01_service_member_function:main&#x27;,
            &#x27;action_server = navpro_basics.m02_l11_01_fibonacci_action_server:main&#x27;,
        ],
    },
)</code></pre>
          </div>
        </div>
      </details>
    </div>
  </div>
</div>

<h3 id="42-build-and-test-action-server-with-cli">4.2 Build and Introspect the Action Server with ROS 2 CLI</h3>
<p>Compile and start the action server in Terminal 1:</p>
<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
ros2 run navpro_basics action_server</code></pre>
</div>

<p>In <strong>Terminal 2</strong>, test the server directly with the CLI, including live feedback streaming:</p>
<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">source /opt/ros/jazzy/setup.bash

# 1. List active action servers
ros2 action list

# 2. Inspect the action interface type
ros2 action info /fibonacci

# 3. Send goal with --feedback flag to observe streaming progress!
ros2 action send_goal /fibonacci example_interfaces/action/Fibonacci "{order: 5}" --feedback</code></pre>
</div>
<p>You will observe continuous periodic feedback streaming to your terminal until the goal reaches 100% completion and returns the final result. <strong>The action server is now verified functional!</strong> Next, write the client node to send goals and process feedback in Python.</p>
"""
    if "4. Configuring setup.py, Building &amp; Testing the Action Server" not in html10:
        html10 = re.sub(r'(<h2 id="4-building-the-asynchronous-navigation-action-client-in-python">)', action_server_first_guide + '\n' + r'<h2 id="5-building-the-asynchronous-navigation-action-client-in-python">5. Building the Asynchronous Navigation Action Client in Python</h2>', html10)

    l10["html_content"] = html10

    # 7. Apply Universal Objectives Card to ALL 23 lessons!
    for idx, l in enumerate(lessons):
        old_html = l["html_content"]
        new_html = standardize_objectives_in_html(old_html, l["id"])
        l["html_content"] = new_html
        print(f"Updated objectives styling for {l['id']} ({l['title']})")

    # 8. Save updated lessonsData.json
    data["lessons"] = lessons
    with open(LESSONS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print("Successfully wrote updated lessonsData.json!")

if __name__ == "__main__":
    main()
