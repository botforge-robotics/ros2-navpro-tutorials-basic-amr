#!/usr/bin/env python3
"""
scripts/apply_step_by_step_file_guides.py

Upgrades file-editing explanations across lessons to the 3-Step Pedagogical Guide Standard:
  Step 1: Open Target File (explicit path)
  Step 2: Locate Insertion Point & Add Specific Lines (code snippet with comments)
  Step 3: Verify Complete File After Editing (collapsible dropdown with full file)
"""

import json
import html

JSON_PATH = "lms/src/data/lessonsData.json"


def generate_card(file_path, step1_desc, step2_locate_desc, step2_code, step2_lang, step3_summary_title, step3_full_code, step3_lang):
    escaped_step2_code = html.escape(step2_code.strip())
    escaped_step3_code = html.escape(step3_full_code.strip())

    return f"""<div class="file-edit-instruction-card">
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


def update_lesson_04(c):
    # Step 6.5 in Lesson 04
    start_tag = '<h3 id="step-65-configure-packagexml-and-setuppy">'
    end_tag = '<h3 id="step-66-build-and-test">'
    start_idx = c.find(start_tag)
    end_idx = c.find(end_tag)
    if start_idx == -1 or end_idx == -1:
        print("L04: could not find Step 6.5 anchor!")
        return c

    card_pkg = generate_card(
        file_path="~/ros2_ws/src/navpro_teleop_hub/package.xml",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_teleop_hub/package.xml</code> in your editor.",
        step2_locate_desc="Add package metadata and runtime dependencies inside the <code class=\"inline-code\">&lt;package&gt;</code> block:",
        step2_code="""  <depend>rclpy</depend>
  <depend>geometry_msgs</depend>
  <depend>std_msgs</depend>""",
        step2_lang="xml",
        step3_summary_title="View Complete package.xml After Editing",
        step3_full_code="""<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>navpro_teleop_hub</name>
  <version>1.0.0</version>
  <description>NavPro Teleoperation & Velocity Supervisory Hub</description>
  <maintainer email="student@botforge.io">NavPro Academy</maintainer>
  <license>Apache-2.0</license>

  <depend>rclpy</depend>
  <depend>geometry_msgs</depend>
  <depend>std_msgs</depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>""",
        step3_lang="xml"
    )

    card_setup = generate_card(
        file_path="~/ros2_ws/src/navpro_teleop_hub/setup.py",
        step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_teleop_hub/setup.py</code> in your editor.",
        step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, register the <code class=\"inline-code\">teleop_hub</code> CLI executable:",
        step2_code="""    entry_points={
        'console_scripts': [
            # >>> ADD THIS ENTRY POINT <<<
            'teleop_hub = navpro_teleop_hub.teleop_hub:main',
        ],
    },""",
        step2_lang="python",
        step3_summary_title="View Complete setup.py After Editing",
        step3_full_code="""from setuptools import find_packages, setup

package_name = 'navpro_teleop_hub'

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
    maintainer_email='student@botforge.io',
    description='NavPro Teleoperation & Velocity Supervisory Hub',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'teleop_hub = navpro_teleop_hub.teleop_hub:main',
        ],
    },
)""",
        step3_lang="python"
    )

    new_content = f"""<h3 id="step-65-configure-packagexml-and-setuppy">Step 6.5: Configure <code class="inline-code">package.xml</code> and <code class="inline-code">setup.py</code></h3>
<p>Configure both package configuration manifests step-by-step:</p>
{card_pkg}
{card_setup}
"""
    return c[:start_idx] + new_content + c[end_idx:]


def update_lesson_05(c):
    # 1. Section 4.1: Talker
    start_tag_41 = '<h3 id="41-registering-the-entry-point">'
    end_tag_41 = '<h3 id="42-building-and-sourcing">'
    s41 = c.find(start_tag_41)
    e41 = c.find(end_tag_41)
    if s41 != -1 and e41 != -1:
        card_41 = generate_card(
            file_path="~/ros2_ws/src/navpro_basics/setup.py",
            step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in VS Code or your text editor.",
            step2_locate_desc="Scroll down to the <code class=\"inline-code\">entry_points</code> dictionary near the bottom. Inside the <code class=\"inline-code\">'console_scripts': [ ... ]</code> array, add the following highlighted line:",
            step2_code="""    entry_points={
        'console_scripts': [
            # >>> ADD THIS ENTRY POINT TO REGISTER TALKER <<<
            'talker = navpro_basics.talker:main',
        ],
    },""",
            step2_lang="python",
            step3_summary_title="View Complete setup.py After Adding Talker (Click to Expand)",
            step3_full_code="""from setuptools import find_packages, setup

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
)""",
            step3_lang="python"
        )
        new_41 = f"""<h3 id="41-registering-the-entry-point">4.1 Registering the Talker Entry Point in <code class="inline-code">setup.py</code></h3>
<p>Before ROS 2 can execute your Python script via <code class="inline-code">ros2 run</code>, you must register it as a console script entry point in <code class="inline-code">setup.py</code>:</p>
{card_41}
"""
        c = c[:s41] + new_41 + c[e41:]
        print("L05: Sec 4.1 updated successfully!")
    else:
        print("L05: Sec 4.1 anchor not found!")

    # 2. Section 5.1: Listener
    start_tag_51 = '<h3 id="51-registering-subscriber-in-setuppy">'
    end_tag_51 = '<h3 id="52-compiling-and-running-both-nodes">'
    s51 = c.find(start_tag_51)
    e51 = c.find(end_tag_51)
    if s51 != -1 and e51 != -1:
        card_51 = generate_card(
            file_path="~/ros2_ws/src/navpro_basics/setup.py",
            step1_desc="Reopen <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
            step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, ensure a trailing comma follows <code class=\"inline-code\">'talker = ...',</code> and append the <code class=\"inline-code\">listener</code> entry point:",
            step2_code="""    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            # >>> ADD THIS ENTRY POINT TO REGISTER LISTENER (Don't forget the comma above!) <<<
            'listener = navpro_basics.listener:main',
        ],
    },""",
            step2_lang="python",
            step3_summary_title="View Complete setup.py After Adding Listener (Click to Expand)",
            step3_full_code="""from setuptools import find_packages, setup

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
)""",
            step3_lang="python"
        )
        new_51 = f"""<h3 id="51-registering-subscriber-in-setuppy">5.1 Registering Subscriber in <code class="inline-code">setup.py</code></h3>
<p>Register the subscriber node alongside the publisher:</p>
{card_51}
"""
        c = c[:s51] + new_51 + c[e51:]
        print("L05: Sec 5.1 updated successfully!")
    else:
        print("L05: Sec 5.1 anchor not found!")

    return c


def update_lesson_07(c):
    # 1. Section 5.1: package.xml
    start_tag_51 = '<h3 id="51-packagexml-configuration">'
    end_tag_51 = '<h3 id="52-cmakeliststxt-configuration">'
    s51 = c.find(start_tag_51)
    e51 = c.find(end_tag_51)
    if s51 != -1 and e51 != -1:
        card_51 = generate_card(
            file_path="~/ros2_ws/src/navpro_interfaces/package.xml",
            step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_interfaces/package.xml</code> in your editor.",
            step2_locate_desc="Inside the root <code class=\"inline-code\">&lt;package format=\"3\"&gt;</code> block, directly below <code class=\"inline-code\">&lt;buildtool_depend&gt;ament_cmake&lt;/buildtool_depend&gt;</code>, add the IDL generator tags:",
            step2_code="""  <!-- >>> ADD THESE 4 IDL CODE GENERATION TAGS <<< -->
  <buildtool_depend>rosidl_default_generators</buildtool_depend>
  <depend>geometry_msgs</depend>
  <exec_depend>rosidl_default_runtime</exec_depend>
  <member_of_group>rosidl_interface_packages</member_of_group>""",
            step2_lang="xml",
            step3_summary_title="View Complete navpro_interfaces/package.xml After Editing",
            step3_full_code="""<?xml version="1.0"?>
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
</package>""",
            step3_lang="xml"
        )
        new_51 = f"""<h3 id="51-packagexml-configuration">5.1 Configuring <code class="inline-code">package.xml</code> for IDL Generation</h3>
<p>In interface packages, four specific tags instruct ROS 2 to invoke IDL code generators and register the package in the Ament Index:</p>
{card_51}
"""
        c = c[:s51] + new_51 + c[e51:]
        print("L07: Sec 5.1 updated successfully!")
    else:
        print("L07: Sec 5.1 anchor not found!")

    # 2. Section 5.2: CMakeLists.txt
    start_tag_52 = '<h3 id="52-cmakeliststxt-configuration">'
    end_tag_52 = '<hr class="divider">\n<h2 id="6-building-verifying-custom-interfaces-with-cli">'
    s52 = c.find(start_tag_52)
    e52 = c.find(end_tag_52)
    if s52 != -1 and e52 != -1:
        card_52 = generate_card(
            file_path="~/ros2_ws/src/navpro_interfaces/CMakeLists.txt",
            step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_interfaces/CMakeLists.txt</code> in your editor.",
            step2_locate_desc="Find <code class=\"inline-code\">find_package(ament_cmake REQUIRED)</code> and add dependencies, then invoke <code class=\"inline-code\">rosidl_generate_interfaces</code> directly before <code class=\"inline-code\">ament_package()</code>:",
            step2_code="""# >>> 1. ADD REQUIRED GENERATOR PACKAGES (After find_package(ament_cmake REQUIRED)) <<<
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

# >>> 2. COMPILE INTERFACE FILES (Add before ament_package()) <<<
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/Num.msg"
  "msg/Sphere.msg"
  "msg/RobotStatus.msg"
  "srv/AddThreeInts.srv"
  "action/Fibonacci.action"
  DEPENDENCIES geometry_msgs
)""",
            step2_lang="cmake",
            step3_summary_title="View Complete navpro_interfaces/CMakeLists.txt After Editing",
            step3_full_code="""cmake_minimum_required(VERSION 3.8)
project(navpro_interfaces)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/Num.msg"
  "msg/Sphere.msg"
  "msg/RobotStatus.msg"
  "srv/AddThreeInts.srv"
  "action/Fibonacci.action"
  DEPENDENCIES geometry_msgs
)

ament_package()""",
            step3_lang="cmake"
        )
        new_52 = f"""<h3 id="52-cmakeliststxt-configuration">5.2 Configuring <code class="inline-code">CMakeLists.txt</code> for Code Generation</h3>
<p>Configure CMake to discover the generator tools and compile each interface file into C++ and Python headers:</p>
{card_52}
"""
        c = c[:s52] + new_52 + c[e52:]
        print("L07: Sec 5.2 updated successfully!")
    else:
        print("L07: Sec 5.2 anchor not found!")

    # 3. Section 7: Add package.xml and setup.py guides for consumer package
    start_tag_7 = '<h2 id="7-using-custom-interfaces-in-python-nodes">'
    s7 = c.find(start_tag_7)
    if s7 != -1:
        # Find where the Python code begins
        py_start = c.find('<div class="code-container" data-language="python">', s7)
        if py_start != -1:
            card_dep = generate_card(
                file_path="~/ros2_ws/src/navpro_basics/package.xml",
                step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/package.xml</code> in your editor.",
                step2_locate_desc="Add your custom interface package as a dependency inside the <code class=\"inline-code\">&lt;package&gt;</code> block:",
                step2_code="""  <!-- >>> ADD DEPENDENCY ON CUSTOM INTERFACE PACKAGE <<< -->
  <depend>navpro_interfaces</depend>""",
                step2_lang="xml",
                step3_summary_title="View Complete navpro_basics/package.xml After Editing",
                step3_full_code="""<?xml version="1.0"?>
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
  <depend>navpro_interfaces</depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>""",
                step3_lang="xml"
            )

            card_entry = generate_card(
                file_path="~/ros2_ws/src/navpro_basics/setup.py",
                step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
                step2_locate_desc="Register the custom publisher node inside <code class=\"inline-code\">entry_points['console_scripts']</code>:",
                step2_code="""    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            # >>> ADD THIS ENTRY POINT TO REGISTER CUSTOM MESSAGE PUBLISHER <<<
            'custom_pub = navpro_basics.custom_pub:main',
        ],
    },""",
                step2_lang="python",
                step3_summary_title="View Complete setup.py After Adding Custom Node",
                step3_full_code="""from setuptools import find_packages, setup

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
            'custom_pub = navpro_basics.custom_pub:main',
        ],
    },
)""",
                step3_lang="python"
            )

            guide_html = f"""<h2 id="7-using-custom-interfaces-in-python-nodes">7. Using Custom Interfaces in Python Nodes</h2>
<p>Before writing a Python node that imports from <code class="inline-code">navpro_interfaces.msg</code>, configure your client package with the required dependency and entry point:</p>

<h3 id="71-add-dependency-to-navpro-basics-packagexml">7.1 Add Dependency to <code class="inline-code">navpro_basics/package.xml</code></h3>
{card_dep}

<h3 id="72-create-python-node-using-custom-interface">7.2 Create Python Node Using Custom Interface</h3>
<p>Create file <code class="inline-code">~/ros2_ws/src/navpro_basics/navpro_basics/custom_pub.py</code> and import the generated class directly:</p>
"""
            # Also find where Python code ends to insert setup.py card
            py_end = c.find('</code></pre>\n</div>', py_start)
            if py_end != -1:
                py_end += len('</code></pre>\n</div>')
                post_py = f"""

<h3 id="73-register-custom-node-in-setuppy">7.3 Register Node in <code class="inline-code">setup.py</code></h3>
<p>Register the executable entry point so it can be run via <code class="inline-code">ros2 run</code>:</p>
{card_entry}
"""
                c = c[:s7] + guide_html + c[py_start:py_end] + post_py + c[py_end:]
                print("L07: Sec 7 updated with consumer guides!")
    return c


def update_lesson_08(c):
    start_tag = '<h3 id="51-configure-entry-points-build-navpro-basics">'
    end_tag = '<h2 id="6-verification-with-the-ros-2-cli">'
    s = c.find(start_tag)
    e = c.find(end_tag)
    if s != -1 and e != -1:
        card = generate_card(
            file_path="~/ros2_ws/src/navpro_basics/setup.py",
            step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
            step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, register both the service server and service client:",
            step2_code="""    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            # >>> ADD SERVICE SERVER & CLIENT ENTRY POINTS <<<
            'add_two_ints_server = navpro_basics.add_two_ints_server:main',
            'add_two_ints_client = navpro_basics.add_two_ints_client:main',
        ],
    },""",
            step2_lang="python",
            step3_summary_title="View Complete setup.py with Service Nodes Registered",
            step3_full_code="""from setuptools import find_packages, setup

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
            'add_two_ints_server = navpro_basics.add_two_ints_server:main',
            'add_two_ints_client = navpro_basics.add_two_ints_client:main',
        ],
    },
)""",
            step3_lang="python"
        )
        new_content = f"""<h3 id="51-configure-entry-points-build-navpro-basics">5.1 Configure Entry Points in <code class="inline-code">setup.py</code></h3>
<p>Before testing your service interaction via the CLI, register both executables:</p>
{card}
<p>Recompile your workspace to register the new console scripts: <code class="inline-code">colcon build --symlink-install --packages-select navpro_basics</code></p>
"""
        c = c[:s] + new_content + c[e:]
        print("L08: Sec 5.1 updated successfully!")
    else:
        print("L08: Sec 5.1 anchor not found!")
    return c


def update_lesson_10(c):
    # Add setup.py data_files guide before Section 6
    anchor = '<h2 id="6-execution-cli-overrides">'
    s = c.find(anchor)
    if s != -1:
        card = generate_card(
            file_path="~/ros2_ws/src/navpro_basics/setup.py",
            step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
            step2_locate_desc="Add <code class=\"inline-code\">import os</code> and <code class=\"inline-code\">from glob import glob</code> at the top, then install the <code class=\"inline-code\">launch/</code> and <code class=\"inline-code\">config/</code> directories inside <code class=\"inline-code\">data_files</code>:",
            step2_code="""# >>> 1. ADD REQUIRED PATH & GLOB IMPORTS AT TOP OF FILE <<<
import os
from glob import glob

setup(
    ...
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        # >>> 2. INSTALL ALL LAUNCH FILES TO share/navpro_basics/launch <<<
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        # >>> 3. INSTALL ALL CONFIG YAML FILES TO share/navpro_basics/config <<<
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    ...
)""",
            step2_lang="python",
            step3_summary_title="View Complete setup.py with Launch Files Configured",
            step3_full_code="""from setuptools import find_packages, setup
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
)""",
            step3_lang="python"
        )
        injection = f"""<h3 id="51-registering-launch-files-in-setuppy">5.1 Registering Launch Files in <code class="inline-code">setup.py</code></h3>
<p>In ROS 2 Python packages, launch files stored in <code class="inline-code">launch/</code> will <strong>not</strong> be found by <code class="inline-code">ros2 launch &lt;pkg&gt; &lt;file&gt;</code> unless they are registered in the <code class="inline-code">data_files</code> manifest of <code class="inline-code">setup.py</code>:</p>
{card}

"""
        c = c[:s] + injection + c[s:]
        print("L10: Added setup.py data_files guide successfully!")
    else:
        print("L10: Anchor not found!")
    return c


def update_lesson_11(c):
    # Add setup.py entry point guide before Section 5
    anchor = '<h2 id="5-verification-with-the-ros-2-action-cli">'
    s = c.find(anchor)
    if s != -1:
        card = generate_card(
            file_path="~/ros2_ws/src/navpro_basics/setup.py",
            step1_desc="Open <code class=\"inline-code\">~/ros2_ws/src/navpro_basics/setup.py</code> in your editor.",
            step2_locate_desc="In <code class=\"inline-code\">entry_points['console_scripts']</code>, register both the action server and client executables:",
            step2_code="""    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            # >>> ADD ACTION SERVER & CLIENT ENTRY POINTS <<<
            'fibonacci_action_server = navpro_basics.fibonacci_action_server:main',
            'fibonacci_action_client = navpro_basics.fibonacci_action_client:main',
        ],
    },""",
            step2_lang="python",
            step3_summary_title="View Complete setup.py with Action Nodes Registered",
            step3_full_code="""from setuptools import find_packages, setup

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
)""",
            step3_lang="python"
        )
        injection = f"""<h3 id="41-registering-action-nodes-in-setuppy">4.1 Registering Action Nodes in <code class="inline-code">setup.py</code></h3>
<p>Before launching your action nodes with <code class="inline-code">ros2 run</code>, register their entry points in <code class="inline-code">setup.py</code>:</p>
{card}

"""
        c = c[:s] + injection + c[s:]
        print("L11: Added setup.py action entry points guide successfully!")
    else:
        print("L11: Anchor not found!")
    return c


def main():
    print(f"Loading {JSON_PATH}...")
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    lessons = data.get("lessons", [])

    for lesson in lessons:
        num = lesson.get("num_str")
        c = lesson.get("html_content", "")

        if num == "04":
            lesson["html_content"] = update_lesson_04(c)
        elif num == "05":
            lesson["html_content"] = update_lesson_05(c)
        elif num == "07":
            lesson["html_content"] = update_lesson_07(c)
        elif num == "08":
            lesson["html_content"] = update_lesson_08(c)
        elif num == "10":
            lesson["html_content"] = update_lesson_10(c)
        elif num == "11":
            lesson["html_content"] = update_lesson_11(c)

    print(f"Saving updated {JSON_PATH}...")
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("All file-editing pedagogical guides successfully applied!")


if __name__ == "__main__":
    main()
