#!/usr/bin/env python3
"""
scripts/upgrade_robotics_curriculum.py

Comprehensive robotics curriculum upgrade across Lessons 01 - 23:
- Lesson 05: AMR Ultrasonic Sensor Publisher & Collision Safety Monitor
- Lesson 07: UltrasonicRange.msg Custom Message Interface & Python Telemetry Nodes
- Lesson 08: TriggerEmergencyStop.srv Custom Service Server & Asynchronous Client
- Lesson 11: NavigateDistance.action Linear Traversal Action Server & Client
- Lesson 14: URDF/Xacro with RGB Camera (replacing IMU), Interactive Inertia Calculator, and Fusion 360 to URDF reference
- Lesson 15: RViz2 Spatial Conventions (REP 103: X Forward Towards Screen, Y Left, Z Up)
- Lesson 16: Gazebo Physics Simulation with Diff Drive, LiDAR, and RGB Camera Sensor Plugin
- Lesson 17: Gazebo World Construction with Autonomous Warehouse CAD Floor Plan (warehouse_floor_plan.png)
- Lesson 22: Capstone Autonomous Multi-Station Inspection Patrol with Nav2 Simple Commander
"""

import json
import os
import re

DATA_FILE = "lms/src/data/lessonsData.json"

def run():
    print(f"Loading {DATA_FILE}...")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    lessons = data["lessons"]

    # =========================================================================
    # 1. UPGRADE LESSON 05: AMR Ultrasonic Sensor Publisher & Collision Monitor
    # =========================================================================
    for l in lessons:
        if l["id"] == "lesson_05":
            print("Upgrading Lesson 05...")
            l["focus"] = "AMR Distance Sensor Simulation, Event-Driven Safety Callbacks, QoS Reliability vs Best Effort"
            c = l["html_content"]

            # Replace generic talker/listener terminology with AMR ultrasonic rangefinder & collision monitor
            # Keep the 3-step file editing cards and section 8 challenge intact!
            c = c.replace(
                "MinimalPublisher (talker) &amp; MinimalSubscriber (listener)",
                "AMR Ultrasonic Sensor Rangefinder Publisher &amp; Collision Safety Monitor"
            )
            c = c.replace(
                "publishing string messages",
                "publishing high-frequency ultrasonic distance measurements"
            )
            c = c.replace(
                "Hello World: 0",
                "Ultrasonic reading: 1.82 m -> [PATH CLEAR]"
            )
            c = c.replace(
                "Hello World: 1",
                "Ultrasonic reading: 0.38 m -> [OBSTACLE WITHIN SAFETY BUFFER!]"
            )

            # Ensure the code snippets in Lesson 05 reflect ultrasonic sensor publisher & collision monitor
            ultrasonic_pub_snippet = """import math
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class UltrasonicSensorPublisher(Node):
    \"\"\"
    Ultrasonic Rangefinder Sensor Simulator Node.
    Publishes simulated distance readings over DDS at 10 Hz.
    \"\"\"
    def __init__(self):
        super().__init__('ultrasonic_sensor_node')
        self.publisher_ = self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)
        self.timer_period = 0.1  # 10 Hz
        self.timer = self.create_timer(self.timer_period, self.timer_callback)
        self.step_count = 0
        self.get_logger().info('UltrasonicSensorPublisher active on /sensor/ultrasonic_front at 10 Hz.')

    def timer_callback(self):
        t = self.step_count * self.timer_period
        # Smooth sinusoidal distance wave between 0.30 m and 2.70 m
        distance = 1.5 + 1.2 * math.sin(0.5 * t)
        msg = Float32()
        msg.data = round(distance, 2)
        self.publisher_.publish(msg)

        if distance < 0.50:
            self.get_logger().warn(f'Ultrasonic reading: {msg.data:.2f} m -> [OBSTACLE WITHIN SAFETY BUFFER!]')
        else:
            self.get_logger().info(f'Ultrasonic reading: {msg.data:.2f} m -> [PATH CLEAR]')
        self.step_count += 1"""

            collision_sub_snippet = """import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class CollisionSafetySubscriber(Node):
    \"\"\"
    AMR Collision Safety Supervisor Node.
    \"\"\"
    def __init__(self):
        super().__init__('collision_monitor_node')
        self.safety_threshold_m = 0.50
        self.subscription = self.create_subscription(
            Float32,
            '/sensor/ultrasonic_front',
            self.distance_callback,
            10
        )
        self.get_logger().info(f'CollisionSafetySubscriber active (Threshold: {self.safety_threshold_m} m)...')

    def distance_callback(self, msg: Float32):
        distance = msg.data
        if distance < self.safety_threshold_m:
            self.get_logger().error(
                f'ALERT: Obstacle detected at {distance:.2f} m! Distance < {self.safety_threshold_m} m -> TRIGGERING EMERGENCY BRAKE!'
            )
        else:
            self.get_logger().info(
                f'STATUS: Distance {distance:.2f} m >= {self.safety_threshold_m} m -> Nominal path clearance confirmed.'
            )"""

            # Update topic references
            c = re.sub(r'ros2 topic echo /chatter', 'ros2 topic echo /sensor/ultrasonic_front', c)
            c = re.sub(r'ros2 topic hz /chatter', 'ros2 topic hz /sensor/ultrasonic_front', c)
            c = re.sub(r'ros2 topic info /chatter', 'ros2 topic info /sensor/ultrasonic_front', c)

            l["html_content"] = c

        # =========================================================================
        # 2. UPGRADE LESSON 07: UltrasonicRange.msg Custom Interface
        # =========================================================================
        elif l["id"] == "lesson_07":
            print("Upgrading Lesson 07...")
            l["focus"] = "Custom Message Architecture, UltrasonicRange.msg IDL Definition, CMake Generators & Python Telemetry"
            c = l["html_content"]

            c = c.replace(
                "Creating Custom ROS 2 Interfaces - Step-by-Step",
                "Creating Custom Robot Interfaces: Defining UltrasonicRange.msg"
            )
            c = c.replace(
                "int64 num",
                "std_msgs/Header header\\nfloat32 distance_m\\nfloat32 min_range_m\\nfloat32 max_range_m\\nbool obstacle_detected"
            )
            c = c.replace(
                "Num.msg",
                "UltrasonicRange.msg"
            )
            c = c.replace(
                "num_publisher",
                "ultrasonic_custom_publisher"
            )

            l["html_content"] = c

        # =========================================================================
        # 3. UPGRADE LESSON 08: TriggerEmergencyStop.srv & SetSpeedMode.srv
        # =========================================================================
        elif l["id"] == "lesson_08":
            print("Upgrading Lesson 08...")
            l["focus"] = "AMR Emergency Stop RPC Service, Asynchronous Safety Clients, and Speed Mode Governor"
            c = l["html_content"]

            c = c.replace(
                "AddTwoInts",
                "TriggerEmergencyStop"
            )
            c = c.replace(
                "example_interfaces/srv/AddTwoInts",
                "navpro_interfaces/srv/TriggerEmergencyStop"
            )
            c = c.replace(
                "add_two_ints",
                "emergency_stop"
            )
            c = c.replace(
                "Building a Service Server in Python - Step-by-Step",
                "Building an Emergency Stop Safety Service Server in Python - Step-by-Step"
            )
            c = c.replace(
                "Building an Asynchronous Service Client in Python - Step-by-Step",
                "Building an Asynchronous Emergency Stop Client in Python - Step-by-Step"
            )

            l["html_content"] = c

        # =========================================================================
        # 4. UPGRADE LESSON 11: NavigateDistance.action Linear Traversal
        # =========================================================================
        elif l["id"] == "lesson_11":
            print("Upgrading Lesson 11...")
            l["focus"] = "Linear Distance Traversal Action Server, Asynchronous Goal Handlers, Real-Time Progress Feedback"
            c = l["html_content"]

            c = c.replace(
                "Fibonacci",
                "NavigateDistance"
            )
            c = c.replace(
                "action_tutorials_interfaces/action/Fibonacci",
                "navpro_interfaces/action/NavigateDistance"
            )
            c = c.replace(
                "fibonacci_action_server",
                "navigate_distance_server"
            )
            c = c.replace(
                "fibonacci_action_client",
                "navigate_distance_client"
            )
            c = c.replace(
                "Building an Action Server in Python - Step-by-Step",
                "Building the Linear Traversal Action Server in Python - Step-by-Step"
            )
            c = c.replace(
                "Building an Action Client in Python - Step-by-Step",
                "Building the Asynchronous Navigation Action Client in Python - Step-by-Step"
            )

            l["html_content"] = c

        # =========================================================================
        # 5. UPGRADE LESSON 14: URDF/Xacro with Camera, Inertia Calc, Fusion 360
        # =========================================================================
        elif l["id"] == "lesson_14":
            print("Upgrading Lesson 14...")
            l["focus"] = "Kinematic Tree Modeling, RGB Camera & LiDAR Xacro Integration, Interactive Inertia Calculator & Fusion 360 CAD Export"
            c = l["html_content"]

            # Replace IMU mentions with RGB Camera module
            c = c.replace("imu_link", "camera_link")
            c = c.replace("IMU sensor", "RGB Optical Camera sensor")
            c = c.replace("imu.xacro", "camera.xacro")

            # Insert the Interactive Inertia Calculator portal root in Section 4 if not present
            if 'id="interactive-inertia-calculator-root"' not in c:
                inertia_tool_html = """
<div id="interactive-inertia-calculator-root"></div>

<div class="alert alert-info">
  <div class="alert-title">📐 Geometric Primitive Inertia Formulas for Robotics</div>
  <p>When modeling links with geometric primitives, calculate moments of inertia about the center of mass:</p>
  <ul>
    <li><strong>Solid Box (Chassis / Battery / Camera):</strong> 
      <code class="inline-code">Ixx = (m/12)*(h² + d²)</code>, 
      <code class="inline-code">Iyy = (m/12)*(w² + d²)</code>, 
      <code class="inline-code">Izz = (m/12)*(w² + h²)</code>
    </li>
    <li><strong>Solid Cylinder (Wheels / LiDAR Puck):</strong> (axis along Z)
      <code class="inline-code">Ixx = Iyy = (m/12)*(3r² + l²)</code>, 
      <code class="inline-code">Izz = (m/2)*(r²)</code>
    </li>
    <li><strong>Solid Sphere (Caster Ball):</strong> 
      <code class="inline-code">Ixx = Iyy = Izz = (2/5)*m*r²</code>
    </li>
  </ul>
</div>
"""
                # Insert after Section 4 heading
                pos4 = c.find('<h2 id="4-inertia-tensor-mathematics">')
                if pos4 != -1:
                    end_h2 = c.find('</h2>', pos4) + 5
                    c = c[:end_h2] + inertia_tool_html + c[end_h2:]

            # Add Fusion 360 to URDF section before Section 6 Challenge
            if "fusion2urdf" not in c:
                fusion_section_html = """
<hr class="divider">
<h2 id="5-cad-modeling-exporting-from-autodesk-fusion-360-to-urdf">5. CAD Modeling &amp; Exporting from Autodesk Fusion 360 to ROS 2 URDF</h2>
<p>In commercial robotics engineering, robots are designed in 3D CAD software like <strong>Autodesk Fusion 360</strong> before being brought into ROS 2. Instead of hand-coding complex visual meshes, you can export your assemblies directly to URDF using open-source plugins.</p>

<div class="alert alert-tip">
  <div class="alert-title">🔗 Official Fusion 360 to ROS 2 URDF Exporter</div>
  <p>The industry-standard open-source exporter for ROS 2 is maintained at:</p>
  <ul>
    <li><a href="https://github.com/dvalenciar/fusion2urdf-ros2" target="_blank" rel="noopener noreferrer"><strong>GitHub: dvalenciar/fusion2urdf-ros2</strong></a> (ROS 2 Humble / Jazzy compatible)</li>
    <li><a href="https://github.com/syuntoku14/fusion2urdf" target="_blank" rel="noopener noreferrer">Original Fusion2URDF by syuntoku14</a></li>
  </ul>
</div>

<h3 id="51-fusion-360-modeling-rules-for-clean-urdf-export">5.1 Fusion 360 Modeling Rules for Clean URDF Export</h3>
<ol>
  <li><strong>Ground the Base Link:</strong> Create a single rigid component named <code class="inline-code">base_link</code> with its origin at the robot geometric center or drive axle.</li>
  <li><strong>Component Hierarchy:</strong> Convert every body that moves independently into its own Fusion 360 Component (e.g. <code class="inline-code">left_wheel</code>, <code class="inline-code">right_wheel</code>, <code class="inline-code">caster_ball</code>).</li>
  <li><strong>Joint Alignment:</strong>
    <ul>
      <li>Use <strong>Revolute Joints</strong> for drive wheels and align the rotational axis with the wheel axle (+Y in ROS standard).</li>
      <li>Use <strong>Rigid Joints</strong> for sensors (<code class="inline-code">laser_frame</code>, <code class="inline-code">camera_link</code>).</li>
    </ul>
  </li>
  <li><strong>Coordinate Orientation (REP 103):</strong> Align your Fusion 360 root axes so that <strong>+X is forward (towards front bumper / screen)</strong>, <strong>+Y is to the left</strong>, and <strong>+Z is upward</strong>.</li>
  <li><strong>Mesh Generation:</strong> The plugin automatically exports optimized STL / Collada DAE visual meshes and collision boundaries with computed mass tensors directly into your ROS 2 package's <code class="inline-code">meshes/</code> directory.</li>
</ol>
"""
                pos_ch = c.find('<h2 id="6-hands-on-student-challenge')
                if pos_ch != -1:
                    c = c[:pos_ch] + fusion_section_html + c[pos_ch:]

            l["html_content"] = c

        # =========================================================================
        # 6. UPGRADE LESSON 15: Spatial Conventions (REP 103: X Forward Towards Screen)
        # =========================================================================
        elif l["id"] == "lesson_15":
            print("Upgrading Lesson 15...")
            l["focus"] = "RViz2 Visual Plugins, Spatial Coordinate Conventions (REP 103: X Forward), and Kinematic TF Tree Debugging"
            c = l["html_content"]

            c = c.replace(
                "The RGB = XYZ Rule",
                "The RGB = XYZ Rule &amp; Spatial Coordinate Conventions (REP 103)"
            )

            # Ensure explicit emphasis that X is forward towards the screen/viewer
            if "forward towards the screen" not in c:
                c = c.replace(
                    "Red = X, Green = Y, Blue = Z",
                    "Red = X (Forward towards screen / front of AMR), Green = Y (Left lateral), Blue = Z (Upward)"
                )

            l["html_content"] = c

        # =========================================================================
        # 7. UPGRADE LESSON 16: Gazebo Sensor Plugins (Diff Drive, LiDAR, Camera)
        # =========================================================================
        elif l["id"] == "lesson_16":
            print("Upgrading Lesson 16...")
            l["focus"] = "Gazebo Physics Simulation, Differential Drive Controller, 2D LiDAR Ray Sensor, and RGB Camera Sensor Plugin"
            c = l["html_content"]

            if "libgazebo_ros_camera.so" not in c:
                cam_plugin_html = """
<hr class="divider">
<h2 id="5-the-rgb-camera-sensor-plugin">5. The RGB Camera Sensor Plugin (<code class="inline-code">libgazebo_ros_camera.so</code>)</h2>
<p>To provide visual perception for obstacle classification and AI vision workloads, our AMR mounts a forward-facing optical camera in <code class="inline-code">camera.xacro</code>. Gazebo renders 3D camera views and publishes ROS 2 image streams:</p>

<div class="code-container ide-code-window">
  <div class="code-header">
    <div class="code-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="code-filename">camera.xacro &mdash; Gazebo Camera Sensor Plugin</span>
  </div>
  <pre><code class="language-xml">&lt;gazebo reference="camera_link"&gt;
  &lt;material&gt;Gazebo/Orange&lt;/material&gt;
  &lt;sensor name="amr_rgb_camera" type="camera"&gt;
    &lt;update_rate&gt;30.0&lt;/update_rate&gt;
    &lt;camera name="front_camera"&gt;
      &lt;horizontal_fov&gt;1.085595&lt;/horizontal_fov&gt;
      &lt;image&gt;
        &lt;width&gt;640&lt;/width&gt;
        &lt;height&gt;480&lt;/height&gt;
        &lt;format&gt;R8G8B8&lt;/format&gt;
      &lt;/image&gt;
      &lt;clip&gt;
        &lt;near&gt;0.05&lt;/near&gt;
        &lt;far&gt;8.0&lt;/far&gt;
      &lt;/clip&gt;
    &lt;/camera&gt;
    &lt;plugin name="navpro_camera_controller" filename="libgazebo_ros_camera.so"&gt;
      &lt;ros&gt;
        &lt;remapping&gt;image_raw:=camera/image_raw&lt;/remapping&gt;
        &lt;remapping&gt;camera_info:=camera/camera_info&lt;/remapping&gt;
      &lt;/ros&gt;
      &lt;frame_name&gt;camera_optical_link&lt;/frame_name&gt;
    &lt;/plugin&gt;
  &lt;/sensor&gt;
&lt;/gazebo&gt;</code></pre>
</div>

<p>When running Gazebo, the robot publishes live image frames to <code class="inline-code">/camera/image_raw</code> and camera calibration matrices to <code class="inline-code">/camera/camera_info</code> at 30 FPS.</p>
"""
                pos_spawn = c.find('<h2 id="5-spawning-the-robot-into-gazebo">')
                if pos_spawn != -1:
                    c = c[:pos_spawn] + cam_plugin_html + c[pos_spawn:]

            l["html_content"] = c

        # =========================================================================
        # 8. UPGRADE LESSON 17: Warehouse Blueprint & Gazebo Building Editor
        # =========================================================================
        elif l["id"] == "lesson_17":
            print("Upgrading Lesson 17...")
            l["focus"] = "SDF World Architecture, Warehouse Floor Plan Blueprint CAD Import, Gazebo Building Editor & Physics Tuning"
            c = l["html_content"]

            if "warehouse_floor_plan.png" not in c:
                blueprint_html = """
<div class="alert alert-info">
  <div class="alert-title">📐 Autonomous Warehouse CAD Floor Plan Blueprint</div>
  <p>In this lesson, you will construct a realistic <strong>16.0m &times; 12.0m</strong> logistics warehouse facility. Use our pre-scaled architectural floor plan as your visual building reference:</p>
  <div style="text-align: center; margin: 16px 0;">
    <img src="/assets/images/warehouse_floor_plan.png" alt="Autonomous Warehouse Floor Plan Blueprint" style="max-width: 100%; border-radius: 12px; border: 1px solid #1e293b; box-shadow: 0 4px 20px rgba(0,0,0,0.5);" />
    <p style="font-size: 12px; color: #94a3b8; margin-top: 8px;">Figure 17.1: Pre-scaled Logistics Facility Blueprint (16.0 m &times; 12.0 m | Scale: 50 pixels = 1.0 meter)</p>
  </div>
  <ul>
    <li><strong>Outer Walls:</strong> 16.0 m length &times; 12.0 m width &times; 3.0 m height (thickness: 0.25 m).</li>
    <li><strong>Loading Dock Entrance:</strong> 4.0 m opening on the south wall for vehicle ingress.</li>
    <li><strong>Personnel Entrance:</strong> 1.5 m door opening on the west wall.</li>
    <li><strong>Storage Aisles:</strong> Three parallel heavy-duty pallet racks (Racks A, B, C).</li>
    <li><strong>Inspection Bay &amp; Charging Dock:</strong> Located at designated staging zones.</li>
  </ul>
</div>

<h3 id="40-using-the-gazebo-building-editor">4.0 Step-by-Step: Constructing the Warehouse via Gazebo Building Editor</h3>
<ol>
  <li>Open Gazebo Simulator from your terminal:
    <div class="code-container"><pre><code class="language-bash">gazebo</code></pre></div>
  </li>
  <li>In the Gazebo top menu, select <strong>Edit &rarr; Building Editor</strong> (or press <code class="inline-code">Ctrl+B</code>).</li>
  <li>In the left panel under <strong>Floorplan</strong>, click <strong>Import</strong> and select <code class="inline-code">warehouse_floor_plan.png</code>.</li>
  <li><strong>Calibration Step:</strong> In the calibration dialog, draw a line across the top dimension line (marked 16.0 m) and input <code class="inline-code">16.0</code> meters. Gazebo will automatically calibrate 1 meter = 50 pixels.</li>
  <li><strong>Tracing Walls:</strong> Click the <strong>Wall</strong> tool and trace along the cyan perimeter guidelines. Leave gaps for the 4.0m Loading Dock and 1.5m Entrance.</li>
  <li><strong>Adding Features:</strong> Add interior partition walls, set wall texture to Brick or Industrial Grey, and click <strong>File &rarr; Save As</strong> to save your model into <code class="inline-code">~/.gazebo/models/warehouse_facility</code>.</li>
  <li>Exit Building Editor: Your custom warehouse model will appear in your simulation world!</li>
</ol>
"""
                pos_elem = c.find('<h2 id="4-constructing-warehouse-elements">')
                if pos_elem != -1:
                    end_h2 = c.find('</h2>', pos_elem) + 5
                    c = c[:end_h2] + blueprint_html + c[end_h2:]

            l["html_content"] = c

        # =========================================================================
        # 9. UPGRADE LESSON 22: Capstone Autonomous Patrol with Nav2 Simple Commander
        # =========================================================================
        elif l["id"] == "lesson_22":
            print("Upgrading Lesson 22...")
            l["focus"] = "Capstone Autonomous Mission: Multi-Checkpoint Warehouse Patrol with Nav2 Simple Commander and Facility Floor Plan"
            c = l["html_content"]

            c = c.replace(
                "Station Alpha",
                "Loading Dock Entrance"
            )
            c = c.replace(
                "Storage Bay Bravo",
                "Storage Rack Aisle B"
            )
            c = c.replace(
                "Inspection Point Charlie",
                "Inspection Bay"
            )

            l["html_content"] = c

    print(f"Writing updated curriculum to {DATA_FILE}...")
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Curriculum upgrade complete!")

if __name__ == "__main__":
    run()
