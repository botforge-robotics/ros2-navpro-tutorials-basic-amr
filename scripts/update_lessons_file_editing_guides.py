#!/usr/bin/env python3
"""
update_lessons_file_editing_guides.py

Updates configuration file editing explanations across lessons (package.xml, setup.py, CMakeLists.txt)
to follow the pedagogical 3-Step File Modification Guide pattern:
  1. Open Target File (explicit path)
  2. Locate Insertion Point & Add Specific Lines (highlighted diff snippet with comments)
  3. Verify Full File After Editing (collapsible dropdown with complete file reference)
"""

import json
import re
import sys

LESSONS_JSON_PATH = "ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json"


def generate_card(file_path, step1_desc, step2_locate_desc, step2_code, step2_lang, step3_summary_title, step3_full_code, step3_lang):
    escaped_step2_code = (
        step2_code.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#x27;")
    )
    escaped_step3_code = (
        step3_full_code.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#x27;")
    )

    card_html = f"""<div class="file-edit-instruction-card">
  <div class="file-edit-header">
    <div class="file-edit-header-left">
      <span>📝 Step-by-Step File Modification Guide</span>
    </div>
    <span class="file-edit-badge">{file_path}</span>
  </div>
  <div class="file-edit-body">
    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 1</span>
        <span>Open the Target File</span>
      </div>
      <p class="step-description">{step1_desc}</p>
    </div>

    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 2</span>
        <span>Locate Insertion Point &amp; Add Lines</span>
      </div>
      <p class="step-description">{step2_locate_desc}</p>
      <div class="code-container" data-language="{step2_lang}">
        <div class="code-header"><span class="code-lang-tag">{step2_lang}</span><button class="copy-code-btn">📋 Copy</button></div>
        <pre><code class="language-{step2_lang}">{escaped_step2_code}</code></pre>
      </div>
    </div>

    <div class="file-edit-step">
      <div class="file-edit-step-title">
        <span class="step-num-pill">Step 3</span>
        <span>Verify the Full File After Editing</span>
      </div>
      <p class="step-description">Self-check your file against the complete reference below to confirm indentation, closing brackets, and commas:</p>
      <details class="file-edit-dropdown">
        <summary class="file-edit-summary">
          <span>📄 {step3_summary_title}</span>
          <span class="file-edit-toggle-icon">▶</span>
        </summary>
        <div class="file-edit-dropdown-content">
          <div class="code-container" data-language="{step3_lang}">
            <div class="code-header"><span class="code-lang-tag">{step3_lang}</span><button class="copy-code-btn">📋 Copy</button></div>
            <pre><code class="language-{step3_lang}">{escaped_step3_code}</code></pre>
          </div>
        </div>
      </details>
    </div>
  </div>
</div>"""
    return card_html


def update_lesson_05(html):
    # 1. Update talker entry point (Section 4.1)
    old_pattern_41 = r'<h3 id="41-registering-the-entry-point">4\.1 Registering the Entry Point</h3>\s*<p>Open <code class="inline-code">~/ros2_ws/src/navpro_basics/setup\.py</code> and add the <code class="inline-code">talker</code> executable to <code class="inline-code">entry_points\[\'console_scripts\'\]</code>:</p>\s*<div class="code-container" data-language="python">.*?</div>\s*</div>'
    
    step2_code_41 = """    entry_points={
        'console_scripts': [
            # >>> ADD THIS ENTRY POINT TO REGISTER TALKER <<<
            'talker = navpro_basics.talker:main',
        ],
    },"""

    full_code_41 = """from setuptools import find_packages, setup

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='student',
    maintainer_email='student@todo.todo',
    description='NavPro Robotics Core Basics Package',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
        ],
    },
)"""

    card_41 = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in VS Code or your editor.",
        step2_locate_desc="Scroll to the <code class=\"inline-code\">entry_points</code> dictionary near the bottom. Inside the <code class=\"inline-code\">'console_scripts': [ ... ]</code> array, add the highlighted line:",
        step2_code=step2_code_41,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> After Adding Talker (Click to Expand)",
        step3_full_code=full_code_41,
        step3_lang="python"
    )

    new_sec_41 = f'<h3 id="41-registering-the-entry-point">4.1 Registering the Talker Entry Point in <code class="inline-code">setup.py</code></h3>\n{card_41}'
    html, count_41 = re.subn(old_pattern_41, new_sec_41, html, flags=re.DOTALL)
    print(f"Lesson 05 - Sec 4.1 updated: {count_41}")

    # 2. Update listener entry point (Section 5.1)
    old_pattern_51 = r'<h3 id="51-registering-subscriber-in-setuppy">5\.1 Registering Subscriber in <code class="inline-code">setup\.py</code></h3>\s*<p>Open <code class="inline-code">~/ros2_ws/src/navpro_basics/setup\.py</code> and add <code class="inline-code">listener</code> to <code class="inline-code">console_scripts</code>:</p>\s*<div class="code-container" data-language="python">.*?</div>\s*</div>'

    step2_code_51 = """    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            # >>> ADD THIS ENTRY POINT TO REGISTER LISTENER (Don't forget the comma on line above!) <<<
            'listener = navpro_basics.listener:main',
        ],
    },"""

    full_code_51 = """from setuptools import find_packages, setup

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='student',
    maintainer_email='student@todo.todo',
    description='NavPro Robotics Core Basics Package',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
        ],
    },
)"""

    card_51 = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Reopen <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
        step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, ensure a trailing comma follows <code class=\"inline-code\">'talker = ...',</code> and append the <code class=\"inline-code\">listener</code> entry point:",
        step2_code=step2_code_51,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> After Adding Listener (Click to Expand)",
        step3_full_code=full_code_51,
        step3_lang="python"
    )

    new_sec_51 = f'<h3 id="51-registering-subscriber-in-setuppy">5.1 Registering Subscriber in <code class="inline-code">setup.py</code></h3>\n{card_51}'
    html, count_51 = re.subn(old_pattern_51, new_sec_51, html, flags=re.DOTALL)
    print(f"Lesson 05 - Sec 5.1 updated: {count_51}")

    return html


def update_lesson_07(html):
    # 1. Update Section 5.1 (navpro_interfaces/package.xml)
    old_pattern_51 = r'<h3 id="51-packagexml">5\.1 <code class="inline-code">package\.xml</code></h3>\s*<p>Open <code class="inline-code">~/ros2_ws/src/navpro_interfaces/package\.xml</code> and add the IDL generation dependencies:</p>\s*<p><div class="code-container" data-language="xml">.*?</div>\s*</p>'

    step2_code_51 = """  <!-- >>> ADD THESE IDL GENERATOR & RUNTIME DEPENDENCIES <<< -->
  <buildtool_depend>rosidl_default_generators</buildtool_depend>
  <depend>geometry_msgs</depend>
  <exec_depend>rosidl_default_runtime</exec_depend>
  <member_of_group>rosidl_interface_packages</member_of_group>"""

    full_code_51 = """<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>navpro_interfaces</name>
  <version>1.0.0</version>
  <description>Custom ROS 2 message, service, and action interfaces for NavPro AMR</description>
  <maintainer email="instructor@botforge.io">NavPro Academy</maintainer>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_cmake</buildtool_depend>
  <buildtool_depend>rosidl_default_generators</buildtool_depend>

  <depend>geometry_msgs</depend>

  <exec_depend>rosidl_default_runtime</exec_depend>
  <member_of_group>rosidl_interface_packages</member_of_group>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>"""

    card_51 = generate_card(
        file_path="~/ros2_ws/src/navpro_interfaces/package.xml",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_interfaces/package.xml</code> in your editor.",
        step2_locate_desc="Inside the root <code class=\"inline-code\">&lt;package format=\"3\"&gt;</code> block, directly below the <code class=\"inline-code\">&lt;buildtool_depend&gt;ament_cmake&lt;/buildtool_depend&gt;</code> line, add the IDL generator tags:",
        step2_code=step2_code_51,
        step2_lang="xml",
        step3_summary_title="View Complete <code class=\"inline-code\">navpro_interfaces/package.xml</code> After Editing",
        step3_full_code=full_code_51,
        step3_lang="xml"
    )

    new_sec_51 = f'<h3 id="51-packagexml">5.1 Configuring <code class="inline-code">package.xml</code> for IDL Generation</h3>\n{card_51}'
    html, count_51 = re.subn(old_pattern_51, new_sec_51, html, flags=re.DOTALL)
    print(f"Lesson 07 - Sec 5.1 updated: {count_51}")

    # 2. Update Section 5.2 (navpro_interfaces/CMakeLists.txt)
    old_pattern_52 = r'<h3 id="52-cmakeliststxt">5\.2 <code class="inline-code">CMakeLists\.txt</code></h3>\s*<p>Open <code class="inline-code">~/ros2_ws/src/navpro_interfaces/CMakeLists\.txt</code> and configure code generation:</p>\s*<p><div class="code-container" data-language="cmake">.*?</div>\s*</p>'

    step2_code_52 = """# >>> 1. ADD REQUIRED GENERATOR DEPENDENCIES (Below find_package(ament_cmake REQUIRED)) <<<
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

# >>> 2. ADD INTERFACE COMPILATION BLOCK (Before ament_package()) <<<
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/RobotStatus.msg"
  DEPENDENCIES geometry_msgs
)"""

    full_code_52 = """cmake_minimum_required(VERSION 3.8)
project(navpro_interfaces)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/RobotStatus.msg"
  DEPENDENCIES geometry_msgs
)

ament_package()"""

    card_52 = generate_card(
        file_path="~/ros2_ws/src/navpro_interfaces/CMakeLists.txt",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_interfaces/CMakeLists.txt</code> in your editor.",
        step2_locate_desc="Locate <code class=\"inline-code\">find_package(ament_cmake REQUIRED)</code> and add dependencies, then invoke <code class=\"inline-code\">rosidl_generate_interfaces</code> directly before <code class=\"inline-code\">ament_package()</code>:",
        step2_code=step2_code_52,
        step2_lang="cmake",
        step3_summary_title="View Complete <code class=\"inline-code\">navpro_interfaces/CMakeLists.txt</code> After Editing",
        step3_full_code=full_code_52,
        step3_lang="cmake"
    )

    new_sec_52 = f'<h3 id="52-cmakeliststxt">5.2 Configuring <code class="inline-code">CMakeLists.txt</code> for Code Generation</h3>\n{card_52}'
    html, count_52 = re.subn(old_pattern_52, new_sec_52, html, flags=re.DOTALL)
    print(f"Lesson 07 - Sec 5.2 updated: {count_52}")

    # 3. Update Step 7.1 (navpro_basics/package.xml dependency)
    old_pattern_71 = r'<h3 id="step-71-add-dependency-to-navpro-basicspackagexml">Step 7\.1: Add Dependency to <code class="inline-code">navpro_basics/package\.xml</code></h3>\s*<p>In <code class="inline-code">~/ros2_ws/src/navpro_basics/package\.xml</code>, add:</p>\s*<p><div class="code-container" data-language="xml">.*?</div>\s*</p>'

    step2_code_71 = """  <!-- >>> ADD YOUR CUSTOM INTERFACES PACKAGE DEPENDENCY <<< -->
  <depend>navpro_interfaces</depend>"""

    full_code_71 = """<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>navpro_basics</name>
  <version>1.0.0</version>
  <description>ROS 2 Day 1: Topics, Services, Parameters, and Launch Files</description>
  <maintainer email="instructor@botforge.io">NavPro Academy</maintainer>
  <license>Apache-2.0</license>

  <depend>rclpy</depend>
  <depend>geometry_msgs</depend>
  <depend>std_msgs</depend>
  <depend>std_srvs</depend>
  <depend>example_interfaces</depend>
  <depend>action_tutorials_interfaces</depend>
  <depend>navpro_interfaces</depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>"""

    card_71 = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/package.xml",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/package.xml</code> in your editor.",
        step2_locate_desc="Inside the dependencies block (after <code class=\"inline-code\">&lt;depend&gt;std_msgs&lt;/depend&gt;</code>), add the new custom interface package dependency:",
        step2_code=step2_code_71,
        step2_lang="xml",
        step3_summary_title="View Complete <code class=\"inline-code\">navpro_basics/package.xml</code> After Editing",
        step3_full_code=full_code_71,
        step3_lang="xml"
    )

    new_sec_71 = f'<h3 id="step-71-add-dependency-to-navpro-basicspackagexml">Step 7.1: Add Dependency to <code class="inline-code">navpro_basics/package.xml</code></h3>\n{card_71}'
    html, count_71 = re.subn(old_pattern_71, new_sec_71, html, flags=re.DOTALL)
    print(f"Lesson 07 - Step 7.1 updated: {count_71}")

    # 4. Update Step 7.3 (status_publisher setup.py entry point)
    old_pattern_73 = r'<p>Register <code class="inline-code">status_publisher</code> in <code class="inline-code">navpro_basics/setup\.py</code>, build with <code class="inline-code">colcon build --symlink-install</code>, and run:</p>'

    step2_code_73 = """    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            # >>> ADD THIS ENTRY POINT TO REGISTER STATUS PUBLISHER <<<
            'status_publisher = navpro_basics.status_publisher:main',
        ],
    },"""

    full_code_73 = """from setuptools import find_packages, setup

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'status_publisher = navpro_basics.status_publisher:main',
        ],
    },
)"""

    card_73 = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
        step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, register the new <code class=\"inline-code\">status_publisher</code> CLI command:",
        step2_code=step2_code_73,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> After Adding Status Publisher",
        step3_full_code=full_code_73,
        step3_lang="python"
    )

    new_sec_73 = f'<h3 id="step-73-register-status-publisher-in-setuppy">Step 7.3: Register Status Publisher in <code class="inline-code">setup.py</code></h3>\n{card_73}\n<p>Now build the updated package with <code class="inline-code">colcon build --symlink-install</code> and execute:</p>'
    html, count_73 = re.subn(old_pattern_73, new_sec_73, html)
    print(f"Lesson 07 - Step 7.3 updated: {count_73}")

    return html


def update_lesson_08(html):
    # Section 5.1: Configure Entry Points & Build navpro_basics
    old_pattern = r'<h3 id="51-configure-entry-points-build-navpro-basics">5\.1 Configure Entry Points &amp; Build <code class="inline-code">navpro_basics</code></h3>\s*<p>Open <code class="inline-code">~/ros2_ws/src/navpro_basics/setup\.py</code> and ensure your service nodes are registered inside <code class="inline-code">entry_points -&gt; console_scripts</code>:</p>\s*<p><div class="code-container" data-language="python">.*?</div>\s*</p>'

    step2_code = """    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'status_publisher = navpro_basics.status_publisher:main',
            # >>> ADD THESE SERVICE SERVER AND CLIENT ENTRY POINTS <<<
            'add_two_ints_server = navpro_basics.add_two_ints_server:main',
            'add_two_ints_client = navpro_basics.add_two_ints_client:main',
        ],
    },"""

    full_code = """from setuptools import find_packages, setup

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'status_publisher = navpro_basics.status_publisher:main',
            'add_two_ints_server = navpro_basics.add_two_ints_server:main',
            'add_two_ints_client = navpro_basics.add_two_ints_client:main',
        ],
    },
)"""

    card = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
        step2_locate_desc="Locate <code class=\"inline-code\">entry_points['console_scripts']</code> and add the server and client entry points:",
        step2_code=step2_code,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> with Service Nodes Registered",
        step3_full_code=full_code,
        step3_lang="python"
    )

    new_sec = f'<h3 id="51-configure-entry-points-build-navpro-basics">5.1 Configure Entry Points &amp; Build <code class="inline-code">navpro_basics</code></h3>\n{card}'
    html, count = re.subn(old_pattern, new_sec, html, flags=re.DOTALL)
    print(f"Lesson 08 - Sec 5.1 updated: {count}")
    return html


def update_lesson_09(html):
    # 1. Section 4: Updating CMakeLists.txt in navpro_interfaces
    old_pattern_4 = r'<h2 id="4-updating-cmakeliststxt-in-navpro-interfaces">4\. Updating <code class="inline-code">CMakeLists\.txt</code> in <code class="inline-code">navpro_interfaces</code></h2>\s*<p>Open <code class="inline-code">~/ros2_ws/src/navpro_interfaces/CMakeLists\.txt</code> and register the new <code class="inline-code">\.srv</code> files inside <code class="inline-code">rosidl_generate_interfaces</code>:</p>\s*<p><div class="code-container" data-language="cmake">.*?</div>\s*</p>'

    step2_code_4 = """rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/RobotStatus.msg"
  # >>> ADD THIS CUSTOM SERVICE INTERFACE FILE <<<
  "srv/SetSpeedMode.srv"
  DEPENDENCIES geometry_msgs
)"""

    full_code_4 = """cmake_minimum_required(VERSION 3.8)
project(navpro_interfaces)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/RobotStatus.msg"
  "srv/SetSpeedMode.srv"
  DEPENDENCIES geometry_msgs
)

ament_package()"""

    card_4 = generate_card(
        file_path="~/ros2_ws/src/navpro_interfaces/CMakeLists.txt",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_interfaces/CMakeLists.txt</code> in your editor.",
        step2_locate_desc="Find the <code class=\"inline-code\">rosidl_generate_interfaces</code> block and add <code class=\"inline-code\">\"srv/SetSpeedMode.srv\"</code> directly below <code class=\"inline-code\">\"msg/RobotStatus.msg\"</code>:",
        step2_code=step2_code_4,
        step2_lang="cmake",
        step3_summary_title="View Complete <code class=\"inline-code\">navpro_interfaces/CMakeLists.txt</code> After Adding Service",
        step3_full_code=full_code_4,
        step3_lang="cmake"
    )

    new_sec_4 = f'<h2 id="4-updating-cmakeliststxt-in-navpro-interfaces">4. Updating <code class="inline-code">CMakeLists.txt</code> in <code class="inline-code">navpro_interfaces</code></h2>\n{card_4}'
    html, count_4 = re.subn(old_pattern_4, new_sec_4, html, flags=re.DOTALL)
    print(f"Lesson 09 - Sec 4 updated: {count_4}")

    # 2. Section 8.1: Register in navpro_basics/setup.py
    old_pattern_81 = r'<h3 id="81-register-in-navpro-basicssetuppy">8\.1 Register in <code class="inline-code">navpro_basics/setup\.py</code></h3>\s*<p><div class="code-container" data-language="python">.*?</div>\s*</p>'

    step2_code_81 = """    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'status_publisher = navpro_basics.status_publisher:main',
            # >>> ADD THIS ENTRY POINT TO REGISTER SPEED MODE SERVICE SERVER <<<
            'speed_mode_server = navpro_basics.speed_mode_server:main',
        ],
    },"""

    full_code_81 = """from setuptools import find_packages, setup

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'status_publisher = navpro_basics.status_publisher:main',
            'speed_mode_server = navpro_basics.speed_mode_server:main',
        ],
    },
)"""

    card_81 = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
        step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, register the <code class=\"inline-code\">speed_mode_server</code> console script:",
        step2_code=step2_code_81,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> with Speed Mode Server Registered",
        step3_full_code=full_code_81,
        step3_lang="python"
    )

    new_sec_81 = f'<h3 id="81-register-in-navpro-basicssetuppy">8.1 Register in <code class="inline-code">navpro_basics/setup.py</code></h3>\n{card_81}'
    html, count_81 = re.subn(old_pattern_81, new_sec_81, html, flags=re.DOTALL)
    print(f"Lesson 09 - Sec 8.1 updated: {count_81}")

    return html


def update_lesson_11(html):
    # Add Section 3.2: Registering Launch & Config Files in setup.py
    target_anchor = '<h2 id="4-modular-launch-design-including-other-launch-files">'
    if target_anchor not in html:
        print("Lesson 11 - anchor not found!")
        return html

    step2_code = """# >>> 1. ADD REQUIRED PATH & GLOB IMPORTS AT TOP OF FILE <<<
import os
from glob import glob

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        # >>> 2. INSTALL ALL LAUNCH FILES TO share/navpro_basics/launch <<<
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        # >>> 3. INSTALL ALL CONFIG YAML FILES TO share/navpro_basics/config <<<
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    ...
)"""

    full_code = """from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
        ],
    },
)"""

    card = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
        step2_locate_desc="Add <code class=\"inline-code\">import os</code> and <code class=\"inline-code\">from glob import glob</code> at top, then configure <code class=\"inline-code\">data_files</code> so ROS 2 installs your launch and config files into the workspace <code class=\"inline-code\">share/</code> directory:",
        step2_code=step2_code,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> with Launch & Config Data Files Configured",
        step3_full_code=full_code,
        step3_lang="python"
    )

    injection = f"""<h3 id="32-registering-launch-config-files-in-setuppy">3.2 Installing Launch Files via <code class="inline-code">setup.py</code> <code class="inline-code">data_files</code></h3>
<p>In ROS 2 Python packages, launch files stored in <code class="inline-code">launch/</code> will <strong>not</strong> be found by <code class="inline-code">ros2 launch &lt;pkg&gt; &lt;file&gt;</code> unless they are registered in the <code class="inline-code">data_files</code> manifest of <code class="inline-code">setup.py</code>:</p>
{card}

"""
    html = html.replace(target_anchor, injection + target_anchor)
    print("Lesson 11 - Sec 3.2 added successfully!")
    return html


def update_lesson_12(html):
    # Section 5: Registering in setup.py & Testing with ROS 2 Action CLI
    old_pattern = r'<h2 id="5-testing-with-the-ros-2-action-cli">5\. Testing with the ROS 2 Action CLI</h2>\s*<p>Register both executables in <code class="inline-code">navpro_basics/setup\.py</code>, build, and test:</p>'

    step2_code = """    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            # >>> ADD ACTION SERVER & CLIENT ENTRY POINTS <<<
            'fibonacci_action_server = navpro_basics.fibonacci_action_server:main',
            'fibonacci_action_client = navpro_basics.fibonacci_action_client:main',
        ],
    },"""

    full_code = """from setuptools import find_packages, setup

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'fibonacci_action_server = navpro_basics.fibonacci_action_server:main',
            'fibonacci_action_client = navpro_basics.fibonacci_action_client:main',
        ],
    },
)"""

    card = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
        step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, register both the action server and action client:",
        step2_code=step2_code,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> with Action Nodes Registered",
        step3_full_code=full_code,
        step3_lang="python"
    )

    new_sec = f"""<h2 id="5-testing-with-the-ros-2-action-cli">5. Registering in <code class="inline-code">setup.py</code> &amp; Testing with the Action CLI</h2>
<p>Before launching your action nodes with <code class="inline-code">ros2 run</code>, register their entry points in <code class="inline-code">setup.py</code>:</p>
{card}
<p>Compile the updated package with <code class="inline-code">colcon build --symlink-install --packages-select navpro_basics</code> and launch the nodes:</p>"""

    html, count = re.subn(old_pattern, new_sec, html)
    print(f"Lesson 12 - Sec 5 updated: {count}")
    return html


def update_lesson_13(html):
    # 1. Section 4.1: Update CMakeLists.txt
    old_pattern_41 = r'<h3 id="41-update-cmakeliststxt">4\.1 Update <code class="inline-code">CMakeLists\.txt</code></h3>\s*<p>Open <code class="inline-code">~/ros2_ws/src/navpro_interfaces/CMakeLists\.txt</code> and register <code class="inline-code">action/Patrol\.action</code>:</p>\s*<p><div class="code-container" data-language="cmake">.*?</div>\s*</p>'

    step2_code_41 = """rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/RobotStatus.msg"
  "srv/SetSpeedMode.srv"
  # >>> ADD THIS CUSTOM ACTION INTERFACE FILE <<<
  "action/Patrol.action"
  DEPENDENCIES geometry_msgs
)"""

    full_code_41 = """cmake_minimum_required(VERSION 3.8)
project(navpro_interfaces)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/RobotStatus.msg"
  "srv/SetSpeedMode.srv"
  "action/Patrol.action"
  DEPENDENCIES geometry_msgs
)

ament_package()"""

    card_41 = generate_card(
        file_path="~/ros2_ws/src/navpro_interfaces/CMakeLists.txt",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_interfaces/CMakeLists.txt</code> in your editor.",
        step2_locate_desc="In <code class=\"inline-code\">rosidl_generate_interfaces</code>, append <code class=\"inline-code\">\"action/Patrol.action\"</code> to the list of compiled IDL interfaces:",
        step2_code=step2_code_41,
        step2_lang="cmake",
        step3_summary_title="View Complete <code class=\"inline-code\">navpro_interfaces/CMakeLists.txt</code> After Adding Action Interface",
        step3_full_code=full_code_41,
        step3_lang="cmake"
    )

    new_sec_41 = f'<h3 id="41-update-cmakeliststxt">4.1 Update <code class="inline-code">CMakeLists.txt</code></h3>\n{card_41}'
    html, count_41 = re.subn(old_pattern_41, new_sec_41, html, flags=re.DOTALL)
    print(f"Lesson 13 - Sec 4.1 updated: {count_41}")

    # 2. Section 7: Registering & Testing in setup.py
    old_pattern_7 = r'<h2 id="7-registering-testing">7\. Registering &amp; Testing</h2>\s*<p>Add <code class="inline-code">patrol_action_server</code> and <code class="inline-code">patrol_action_client</code> to <code class="inline-code">navpro_basics/setup\.py</code>, build with <code class="inline-code">colcon build --symlink-install</code>, and run:</p>'

    step2_code_7 = """    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            # >>> ADD PATROL ACTION SERVER & CLIENT ENTRY POINTS <<<
            'patrol_action_server = navpro_basics.patrol_action_server:main',
            'patrol_action_client = navpro_basics.patrol_action_client:main',
        ],
    },"""

    full_code_7 = """from setuptools import find_packages, setup

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'patrol_action_server = navpro_basics.patrol_action_server:main',
            'patrol_action_client = navpro_basics.patrol_action_client:main',
        ],
    },
)"""

    card_7 = generate_card(
        file_path="~/ros2_ws/src/navpro_basics/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
        step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, register the patrol action server and client:",
        step2_code=step2_code_7,
        step2_lang="python",
        step3_summary_title="View Complete <code class=\"inline-code\">setup.py</code> with Patrol Action Nodes",
        step3_full_code=full_code_7,
        step3_lang="python"
    )

    new_sec_7 = f"""<h2 id="7-registering-testing">7. Registering in <code class="inline-code">setup.py</code> &amp; Multi-Terminal Testing</h2>
<p>Register both patrol executables in <code class="inline-code">navpro_basics/setup.py</code>:</p>
{card_7}
<p>Build your workspace with <code class="inline-code">colcon build --symlink-install --packages-select navpro_basics</code>, source <code class="inline-code">install/setup.bash</code>, and run:</p>"""

    html, count_7 = re.subn(old_pattern_7, new_sec_7, html)
    print(f"Lesson 13 - Sec 7 updated: {count_7}")

    return html


def main():
    print(f"Loading {LESSONS_JSON_PATH}...")
    with open(LESSONS_JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    lessons = data.get("lessons", [])

    for lesson in lessons:
        num = lesson.get("num_str")
        content = lesson.get("html_content", "")

        if num == "05":
            lesson["html_content"] = update_lesson_05(content)
        elif num == "07":
            lesson["html_content"] = update_lesson_07(content)
        elif num == "08":
            lesson["html_content"] = update_lesson_08(content)
        elif num == "09":
            lesson["html_content"] = update_lesson_09(content)
        elif num == "11":
            lesson["html_content"] = update_lesson_11(content)
        elif num == "12":
            lesson["html_content"] = update_lesson_12(content)
        elif num == "13":
            lesson["html_content"] = update_lesson_13(content)

    print(f"Saving updated {LESSONS_JSON_PATH}...")
    with open(LESSONS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("Successfully updated file-editing pedagogical guides across all target lessons!")


if __name__ == "__main__":
    main()
