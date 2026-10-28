#!/usr/bin/env python3
"""
NavPro Learning Hub: Module 3 & Module 4 Continuity & Flow Integration
Injects end-to-end pedagogical bridges, asset handoff cards, and Lesson 14 blueprint.
Uses pure JSON load/dump to guarantee valid JSON formatting.
"""

import json
import re

JSON_PATH = 'ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'

with open(JSON_PATH, 'r') as f:
    data = json.load(f)

# Helper function to generate continuity bridge HTML
def make_continuity_bridge(step_tag, prev_lesson, incoming_asset, this_mission, next_lesson, next_connection):
    return f'''
<div class="curriculum-continuity-bridge" style="margin: 1.5rem 0; padding: 1.15rem 1.4rem; border-radius: 10px; background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%); border: 1px solid var(--border-color); border-left: 4px solid var(--accent-primary); box-shadow: var(--shadow-sm);">
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.1rem;">🔗</span>
      <strong style="font-size: 0.95rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.04em;">Curriculum Progression &amp; Pipeline Continuity</strong>
    </div>
    <span style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--accent-primary); background: rgba(14, 165, 233, 0.12); padding: 0.2rem 0.55rem; border-radius: 4px; font-weight: 600;">{step_tag}</span>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.85rem; font-size: 0.86rem; line-height: 1.55;">
    <div style="background: var(--bg-surface); padding: 0.75rem 0.95rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <div style="font-weight: 700; color: #0284c7; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.35rem;">
        <span>📥</span> Incoming Asset (from {prev_lesson})
      </div>
      <div style="color: var(--text-secondary);">{incoming_asset}</div>
    </div>
    <div style="background: var(--bg-surface); padding: 0.75rem 0.95rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <div style="font-weight: 700; color: #10b981; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.35rem;">
        <span>🎯</span> This Lesson's Engineering Mission
      </div>
      <div style="color: var(--text-secondary);">{this_mission}</div>
    </div>
    <div style="background: var(--bg-surface); padding: 0.75rem 0.95rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.35rem;">
        <span>🚀</span> Next Step Connection (to {next_lesson})
      </div>
      <div style="color: var(--text-secondary);">{next_connection}</div>
    </div>
  </div>
</div>
'''

# Helper function to generate asset handoff HTML
def make_asset_handoff(description, produced_file, ingested_by):
    return f'''
<div class="asset-handoff-card" style="margin: 1.75rem 0 1rem 0; padding: 1.15rem 1.4rem; border-radius: 10px; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.25); border-left: 4px solid #10b981;">
  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
    <span style="font-size: 1.1rem;">📦</span>
    <strong style="font-size: 0.95rem; color: #10b981; text-transform: uppercase; letter-spacing: 0.04em;">Asset Handoff &amp; Next Lesson Pipeline Bridge</strong>
  </div>
  <p style="margin: 0 0 0.65rem 0; font-size: 0.88rem; color: var(--text-primary); line-height: 1.6;">
    {description}
  </p>
  <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 0.82rem; font-family: var(--font-mono);">
    <span style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: 5px; color: var(--text-primary);">
      📁 <strong>Produced Artifact:</strong> <code>{produced_file}</code>
    </span>
    <span style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 0.25rem 0.6rem; border-radius: 5px; color: var(--text-primary);">
      ➡️ <strong>Ingested By:</strong> {ingested_by}
    </span>
  </div>
</div>
'''

# ==============================================================================
# 1. UPDATE LESSON 14 (URDF & Xacro)
# ==============================================================================
l14 = data['lessons'][13]
c14 = l14['html_content']

l14_blueprint = '''
<div class="architecture-diagram-card" style="margin: 2rem 0; border: 1px solid var(--border-color); border-radius: 14px; overflow: hidden; background: var(--bg-card); box-shadow: var(--shadow-md);">
  <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.08) 100%); padding: 1.25rem 1.6rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
    <div>
      <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.35rem;">
        <span style="display: inline-block; padding: 0.25rem 0.65rem; background: rgba(6, 182, 212, 0.2); border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 6px; font-size: 0.75rem; font-weight: 700; color: #06b6d4; letter-spacing: 0.05em; text-transform: uppercase;">Blueprint &amp; End-State Architecture</span>
        <span style="font-size: 0.85rem; color: var(--text-secondary);">Module 3 Foundational Asset</span>
      </div>
      <h3 style="margin: 0; font-size: 1.35rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em;">What You Are Building: The Complete NavPro Mini AMR URDF &amp; Kinematics Model</h3>
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <span style="font-family: var(--font-mono); font-size: 0.82rem; padding: 0.3rem 0.75rem; border-radius: 6px; background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600;">navpro_robot.urdf.xacro</span>
    </div>
  </div>

  <div style="padding: 1.25rem 1.6rem 0.5rem 1.6rem; text-align: center;">
    <div style="border-radius: 10px; overflow: hidden; border: 1px solid var(--border-color); background: #0a0f1d; display: inline-block; width: 100%; max-width: 980px; position: relative;">
      <img src="assets/images/amr_urdf_tf_rviz2_blueprint.jpg" alt="NavPro Mini AMR 3D Kinematic Model with RViz2 TF Coordinate Frames" class="lesson-image" loading="lazy" style="width: 100%; height: auto; display: block; border-radius: 8px;" />
      <div style="position: absolute; bottom: 10px; right: 14px; background: rgba(10, 15, 29, 0.85); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; padding: 4px 10px; font-size: 0.75rem; color: #94a3b8; font-family: var(--font-mono);">
        🔍 Click to Zoom (High-Resolution 3D Blueprint)
      </div>
    </div>
    <p style="margin-top: 0.75rem; font-size: 0.88rem; color: var(--text-secondary); font-style: italic;">
      Figure 14.1: High-Fidelity 3D Architecture of the NavPro Mini AMR with active kinematic coordinate frames (TF) following ROS 2 REP 103 conventions (Red = +X Forward, Green = +Y Left, Blue = +Z Up).
    </p>
  </div>

  <div style="padding: 1rem 1.6rem 1.5rem 1.6rem;">
    <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0.5rem 0 0.85rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <span>📐</span> NavPro Mini Physical Kinematic Structure &amp; Coordinate Hierarchy
    </h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #06b6d4;">base_footprint</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Ground Datum (Z = 0.0 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Zero-thickness reference plane at the floor contact patch directly beneath the axle center. Used by Nav2 for 2D footprint projection and obstacle costmap inflation.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #06b6d4;">base_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Chassis Center (Z = +0.06 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          The primary 3D structural body (40 × 30 × 14 cm, 8 kg). Root origin for all attached wheel joints, sensor brackets, and inertial center of mass.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #10b981;">left / right_wheel_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Actuated Drive (r = 0.06 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Dual independent drive wheels (32 cm track separation). Continuous revolute joints driven by motor velocity controllers to enable differential drive steering.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #f59e0b;">laser_frame</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">2D LiDAR (X = +0.10 m, Z = +0.18 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Top-mounted planar LiDAR emitting 360&deg; laser range rays on <code class="inline-code">/scan</code>. Essential for SLAM mapping (L18) and real-time obstacle avoidance (L19).
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #8b5cf6;">camera_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Perception (X = +0.16 m, Z = +0.12 m)</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Forward-facing RGB-D depth camera providing point-cloud visual perception and optical obstacle detection ahead of the robot.
        </p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.85rem 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <code style="font-size: 0.88rem; font-weight: 700; color: #ec4899;">sonar_front_link</code>
          <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">Student Task Asset</span>
        </div>
        <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
          Ultrasonic rangefinder macro designed by the student in Section 6 to detect low-profile pallet edges that slip beneath LiDAR scan planes.
        </p>
      </div>
    </div>

    <div style="background: rgba(6, 182, 212, 0.08); border-left: 4px solid #06b6d4; border-radius: 8px; padding: 0.9rem 1.25rem;">
      <h5 style="margin: 0 0 0.4rem 0; font-size: 0.92rem; font-weight: 700; color: #06b6d4; display: flex; align-items: center; gap: 0.4rem;">
        <span>🔄</span> End-to-End Curriculum Flow: How This URDF Drives the Rest of Your Course
      </h5>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-primary); line-height: 1.6;">
        The robot model you build in this lesson is <strong>not a temporary exercise</strong>&mdash;it is the foundational physical artifact that carries across the entire robotics pipeline:
      </p>
      <ul style="margin: 0.5rem 0 0 1.25rem; padding: 0; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6;">
        <li><strong>Lesson 15 (RViz2)</strong> loads this URDF, tests <code class="inline-code">robot_state_publisher</code>, and verifies all kinematic coordinate frames.</li>
        <li><strong>Lesson 16 (Gazebo)</strong> adds physics inertia, wheel friction, and simulation plugins to this model so it drives and casts laser rays.</li>
        <li><strong>Lesson 17 &amp; 18 (Simulation &amp; SLAM)</strong> spawns this AMR into a custom warehouse world to map the building with <code class="inline-code">slam_toolbox</code>.</li>
        <li><strong>Lessons 19&ndash;21 (Nav2 Stack)</strong> uses this robot's footprint to configure safety costmaps, trajectory planners, and recovery behaviors.</li>
        <li><strong>Lesson 22 (Autonomous Mission)</strong> commands this robot to patrol the warehouse autonomously using Python Nav2 Simple Commander!</li>
      </ul>
    </div>
  </div>
</div>
'''

obj_card_end = c14.find('</div>\n<hr class="divider">\n<h2 id="2-urdf-anatomy-links-vs-joints">')
if obj_card_end != -1:
    c14 = c14[:obj_card_end + 6] + l14_blueprint + c14[obj_card_end + 6:]
else:
    c14 = c14.replace('<h2 id="2-urdf-anatomy-links-vs-joints">', l14_blueprint + '<h2 id="2-urdf-anatomy-links-vs-joints">')

l14_handoff = make_asset_handoff(
    "You have now authored and verified the complete kinematic model of the NavPro Mini AMR. This URDF file defines the exact dimensions, wheel separation, and sensor mount positions that will be visualized in RViz2 and simulated in Gazebo.",
    "ros2_ws_reference/src/navpro_description/urdf/navpro_robot.urdf.xacro",
    "Lesson 15 (RViz2 Visualization & Kinematic TF Inspection)"
)
c14 += l14_handoff
l14['html_content'] = c14
print("Updated Lesson 14.")

# ==============================================================================
# 2. UPDATE LESSON 15 (RViz2 & TF)
# ==============================================================================
l15 = data['lessons'][14]
c15 = l15['html_content']

l15_bridge = make_continuity_bridge(
    "STEP 2 OF 10: VISUALIZATION & TF VALIDATION",
    "Lesson 14 (3D Robot Modeling with URDF & Xacro)",
    "<code>navpro_robot.urdf.xacro</code> containing full chassis geometry, wheel joints, and sensor mount coordinates.",
    "Bringing static URDF into the ROS 2 runtime via <code>robot_state_publisher</code>, rendering the 3D model in RViz2, verifying parent-to-child coordinate transformations on <code>/tf</code> and <code>/tf_static</code>, and mastering REP 103 conventions (Red=X Forward, Green=Y Left, Blue=Z Up).",
    "Lesson 16 (Gazebo Physics Simulation & Sensor Plugins)",
    "In Lesson 16, Gazebo physics simulation loads this verified kinematic tree, adding physical mass, wheel surface friction, and simulation plugins so the robot can drive and emit live sensor telemetry."
)

obj_card_end = c15.find('</div>\n<hr class="divider">\n<h2 id="2-rviz2-vs-gazebo-the-essential-distinction">')
if obj_card_end != -1:
    c15 = c15[:obj_card_end + 6] + l15_bridge + c15[obj_card_end + 6:]
else:
    c15 = c15.replace('<h2 id="2-rviz2-vs-gazebo-the-essential-distinction">', l15_bridge + '<h2 id="2-rviz2-vs-gazebo-the-essential-distinction">')

# Replace unrendered raw math formula in Lesson 15 with stylish REP 103 badges
rep103_badges = '''
<div style="display: flex; gap: 0.85rem; flex-wrap: wrap; margin: 1.1rem 0 1.4rem 0;">
  <span style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35); color: #ef4444; padding: 0.45rem 0.95rem; border-radius: 8px; font-weight: 700; font-family: var(--font-mono); font-size: 0.88rem; display: flex; align-items: center; gap: 0.4rem;">
    <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
    <strong>R = X</strong> (Red: Forward / Longitudinal)
  </span>
  <span style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.35); color: #10b981; padding: 0.45rem 0.95rem; border-radius: 8px; font-weight: 700; font-family: var(--font-mono); font-size: 0.88rem; display: flex; align-items: center; gap: 0.4rem;">
    <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
    <strong>G = Y</strong> (Green: Port-Side Left / Lateral)
  </span>
  <span style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.35); color: #3b82f6; padding: 0.45rem 0.95rem; border-radius: 8px; font-weight: 700; font-family: var(--font-mono); font-size: 0.88rem; display: flex; align-items: center; gap: 0.4rem;">
    <span style="width: 10px; height: 10px; border-radius: 50%; background: #3b82f6; display: inline-block;"></span>
    <strong>B = Z</strong> (Blue: Upward / Vertical)
  </span>
</div>
'''

c15 = re.sub(
    r'<p>\$\$\\mathbf\{R\} = \\mathbf\{X\}[^<]+</p>',
    rep103_badges,
    c15
)

l15_handoff = make_asset_handoff(
    "Your static transform broadcaster and RViz2 display profiles establish the verified spatial ground truth for all robot perception frames.",
    "ros2_ws_reference/src/navpro_basics/navpro_basics/m03_l15_01_task_static_tf_broadcaster.py",
    "Lesson 16 (Gazebo Physics Simulation & Sensor Plugins)"
)
c15 += l15_handoff
l15['html_content'] = c15
print("Updated Lesson 15.")

# ==============================================================================
# 3. UPDATE LESSON 16 (Gazebo Physics & Plugins)
# ==============================================================================
l16 = data['lessons'][15]
c16 = l16['html_content']

l16_bridge = make_continuity_bridge(
    "STEP 3 OF 10: GAZEBO PHYSICS & SENSORS",
    "Lessons 14 & 15 (URDF Kinematics & RViz2 TF)",
    "Verified kinematic URDF and calibrated sensor coordinate frames on <code>/tf</code> and <code>/tf_static</code>.",
    "Breathing physical life into the AMR inside Gazebo: configuring <code>&lt;inertial&gt;</code> mass matrices, wheel surface friction (<code>&lt;mu1&gt;</code>, <code>&lt;mu2&gt;</code>), differential drive controller plugin, and 2D LiDAR ray plugin.",
    "Lesson 17 (Building Custom Simulation Worlds in Gazebo)",
    "With a physics-enabled robot capable of driving on <code>/cmd_vel</code> and scanning on <code>/scan</code>, Lesson 17 constructs the realistic logistics warehouse environment where the AMR will operate."
)

obj_card_end = c16.find('</div>\n<hr class="divider">\n<h2 id="2-gazebo-architecture">')
if obj_card_end != -1:
    c16 = c16[:obj_card_end + 6] + l16_bridge + c16[obj_card_end + 6:]
else:
    c16 = c16.replace('<h2 id="2-gazebo-architecture">', l16_bridge + '<h2 id="2-gazebo-architecture">')

l16_handoff = make_asset_handoff(
    "The AMR is now an active dynamic agent in Gazebo physics, publishing measured <code>/odom</code> and live <code>/scan</code> while responding to velocity commands on <code>/cmd_vel</code>.",
    "ros2_ws_reference/src/navpro_description/urdf/navpro_robot.urdf.xacro & m03_l16_01_task_diff_drive_telemetry.py",
    "Lesson 17 (Custom Simulation Worlds) & Lesson 18 (2D LiDAR SLAM)"
)
c16 += l16_handoff
l16['html_content'] = c16
print("Updated Lesson 16.")

# ==============================================================================
# 4. UPDATE LESSON 17 (Custom Simulation Worlds)
# ==============================================================================
l17 = data['lessons'][16]
c17 = l17['html_content']

l17_bridge = make_continuity_bridge(
    "STEP 4 OF 10: WAREHOUSE SIMULATION WORLD",
    "Lesson 16 (Gazebo Physics Simulation & Sensor Plugins)",
    "Physics-enabled AMR emitting <code>/odom</code> and <code>/scan</code> in Gazebo.",
    "Constructing the production logistics facility world (<code>warehouse_obstacle_world.world</code>): perimeter walls, high-bay storage racks, pallets, and obstacles that provide rich geometric features for LiDAR scan-matching.",
    "Lesson 18 (2D LiDAR SLAM Mapping with SLAM Toolbox)",
    "In Lesson 18, we drive our AMR through this warehouse environment using <code>slam_toolbox</code> to generate the 2D occupancy grid map."
)

obj_card_end = c17.find('</div>\n<hr class="divider">\n<h2 id="2-anatomy-of-an-sdf-world-file">')
if obj_card_end != -1:
    c17 = c17[:obj_card_end + 6] + l17_bridge + c17[obj_card_end + 6:]
else:
    c17 = c17.replace('<h2 id="2-anatomy-of-an-sdf-world-file">', l17_bridge + '<h2 id="2-anatomy-of-an-sdf-world-file">')

l17_handoff = make_asset_handoff(
    "The custom warehouse environment provides the physical arena filled with structural walls, aisles, and pallets required for LiDAR laser bounce and SLAM feature extraction.",
    "ros2_ws_reference/src/navpro_gazebo/worlds/warehouse_obstacle_world.world & scripts/m03_l17_task_spawn_warehouse_obstacle.sh",
    "Lesson 18 (2D LiDAR SLAM Mapping with SLAM Toolbox)"
)
c17 += l17_handoff
l17['html_content'] = c17
print("Updated Lesson 17.")

# ==============================================================================
# 5. UPDATE LESSON 18 (2D LiDAR SLAM)
# ==============================================================================
l18 = data['lessons'][17]
c18 = l18['html_content']

l18_bridge = make_continuity_bridge(
    "STEP 5 OF 10: 2D LIDAR SLAM MAPPING",
    "Lessons 16 & 17 (Driving AMR & Warehouse World)",
    "The physics-enabled AMR operating inside the Gazebo logistics warehouse world.",
    "Solving Simultaneous Localization and Mapping (SLAM). Driving the AMR through warehouse aisles, performing Graph SLAM with Loop Closure using <code>slam_toolbox</code>, and serializing the map.",
    "Lesson 19 (Nav2 Stack Architecture & Costmap 2D Configuration)",
    "The serialized map (<code>warehouse_map.yaml</code> and <code>warehouse_map.pgm</code>) is the foundational environment blueprint required by Nav2 for global path planning."
)

obj_card_end = c18.find('</div>\n<hr class="divider">\n<h2 id="2-graph-slam-architecture">')
if obj_card_end != -1:
    c18 = c18[:obj_card_end + 6] + l18_bridge + c18[obj_card_end + 6:]
else:
    c18 = c18.replace('<h2 id="2-graph-slam-architecture">', l18_bridge + '<h2 id="2-graph-slam-architecture">')

l18_handoff = make_asset_handoff(
    "The occupancy grid map captures every warehouse obstacle, aisle boundary, and free corridor, giving the robot a metric coordinate system for navigation.",
    "ros2_ws_reference/src/navpro_navigation/maps/warehouse_map.yaml & warehouse_map.pgm",
    "Lesson 19 (Nav2 Stack Architecture & Costmap 2D Configuration)"
)
c18 += l18_handoff
l18['html_content'] = c18
print("Updated Lesson 18.")

# ==============================================================================
# 6. UPDATE LESSON 19 (Nav2 Costmaps)
# ==============================================================================
l19 = data['lessons'][18]
c19 = l19['html_content']

l19_bridge = make_continuity_bridge(
    "STEP 6 OF 10: NAV2 COSTMAPS & SAFETY BUFFERS",
    "Lessons 14 & 18 (Robot Footprint & Warehouse Map)",
    "Serialized warehouse map (<code>warehouse_map.yaml</code>) and AMR circular footprint dimensions (radius = 0.22 m).",
    "Deploying the Nav2 Costmap 2D subsystem. Layering the static map, live LiDAR raycast obstacle layer, and mathematical inflation safety zones (inscribed vs. circumscribed radius) to keep the chassis safe from collisions.",
    "Lesson 20 (Nav2 Path Planners & Local Controller Tuning)",
    "Path planners and trajectory controllers in Lesson 20 evaluate this safety cost field to compute collision-free routes."
)

obj_card_end = c19.find('</div>\n<hr class="divider">\n<h2 id="2-the-nav2-server-architecture">')
if obj_card_end != -1:
    c19 = c19[:obj_card_end + 6] + l19_bridge + c19[obj_card_end + 6:]
else:
    c19 = c19.replace('<h2 id="2-the-nav2-server-architecture">', l19_bridge + '<h2 id="2-the-nav2-server-architecture">')

l19_handoff = make_asset_handoff(
    "The tuned Costmap 2D configuration transforms raw geometry into a multi-tier safety risk field that prevents the AMR from scratching its chassis against walls and pallets.",
    "ros2_ws_reference/src/navpro_navigation/config/nav2_params.yaml & m04_l19_01_task_costmap_validator.py",
    "Lesson 20 (Nav2 Path Planners & Local Controller Tuning)"
)
c19 += l19_handoff
l19['html_content'] = c19
print("Updated Lesson 19.")

# ==============================================================================
# 7. UPDATE LESSON 20 (Planners & Controllers)
# ==============================================================================
l20 = data['lessons'][19]
c20 = l20['html_content']

l20_bridge = make_continuity_bridge(
    "STEP 7 OF 10: PATH PLANNERS & LOCAL CONTROLLERS",
    "Lessons 16 & 19 (Differential Drive Kinematics & Safety Costmaps)",
    "Validated 2D Costmaps and AMR differential drive velocity limits.",
    "Configuring the two-tier motion system: Global Planner (NavFn Dijkstra/A*) to find topological routes, and Local Controller (DWB / Regulated Pure Pursuit) to generate smooth <code>/cmd_vel</code> motor commands with trajectory rollout critics.",
    "Lesson 21 (Behavior Trees, Recovery Behaviors & Lifecycle Management)",
    "In Lesson 21, we wrap these planners and controllers with Behavior Trees and Recovery Behaviors to handle unexpected warehouse blockages."
)

obj_card_end = c20.find('</div>\n<hr class="divider">\n<h2 id="2-planners-vs-controllers-the-two-tier-paradigm">')
if obj_card_end != -1:
    c20 = c20[:obj_card_end + 6] + l20_bridge + c20[obj_card_end + 6:]
else:
    c20 = c20.replace('<h2 id="2-planners-vs-controllers-the-two-tier-paradigm">', l20_bridge + '<h2 id="2-planners-vs-controllers-the-two-tier-paradigm">')

l20_handoff = make_asset_handoff(
    "The tuned planner and controller parameters provide optimal balance between path adherence, obstacle clearance, and smooth velocity profile generation.",
    "ros2_ws_reference/src/navpro_navigation/config/nav2_params.yaml & m04_l20_01_task_controller_tuner.py",
    "Lesson 21 (Behavior Trees & Lifecycle Management)"
)
c20 += l20_handoff
l20['html_content'] = c20
print("Updated Lesson 20.")

# ==============================================================================
# 8. UPDATE LESSON 21 (Behavior Trees & Recoveries)
# ==============================================================================
l21 = data['lessons'][20]
c21 = l21['html_content']

l21_bridge = make_continuity_bridge(
    "STEP 8 OF 10: BEHAVIOR TREES & RECOVERIES",
    "Lesson 20 (Nav2 Path Planners & Local Controller Tuning)",
    "Tuned global path planners and local trajectory controllers.",
    "Engineering autonomous fault tolerance! Configuring Nav2 Behavior Trees (BTs), self-healing recovery actions (Recovery Spin, BackUp, Wait), and managing the ROS 2 Lifecycle State Machine (<code>unconfigured -> inactive -> active</code>).",
    "Lesson 22 (Autonomous Navigation Scripting with Nav2 Simple Commander)",
    "With all robotics subsystems fully assembled, Lesson 22 is the Grand Capstone Mission!"
)

obj_card_end = c21.find('</div>\n<hr class="divider">\n<h2 id="2-why-behavior-trees-over-state-machines">')
if obj_card_end != -1:
    c21 = c21[:obj_card_end + 6] + l21_bridge + c21[obj_card_end + 6:]
else:
    c21 = c21.replace('<h2 id="2-why-behavior-trees-over-state-machines">', l21_bridge + '<h2 id="2-why-behavior-trees-over-state-machines">')

l21_handoff = make_asset_handoff(
    "The self-healing recovery behavior tree prevents mission aborts when obstacles or personnel temporarily obstruct warehouse corridors.",
    "ros2_ws_reference/src/navpro_navigation/config/nav2_params.yaml & m04_l21_01_task_recovery_monitor.py",
    "Lesson 22 (Capstone Autonomous Navigation Mission)"
)
c21 += l21_handoff
l21['html_content'] = c21
print("Updated Lesson 21.")

# ==============================================================================
# 9. UPDATE LESSON 22 (Capstone Autonomous Mission)
# ==============================================================================
l22 = data['lessons'][21]
c22 = l22['html_content']

l22_convergence = '''
<div class="curriculum-continuity-bridge" style="margin: 1.5rem 0; padding: 1.25rem 1.5rem; border-radius: 12px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%); border: 1px solid var(--border-color); border-left: 4px solid #10b981; box-shadow: var(--shadow-md);">
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.2rem;">🏛️</span>
      <strong style="font-size: 1.05rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.04em;">The Grand Capstone Convergence (Modules 3 &amp; 4)</strong>
    </div>
    <span style="font-size: 0.8rem; font-family: var(--font-mono); color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 0.25rem 0.65rem; border-radius: 4px; font-weight: 700;">STEP 9 OF 10: CAPSTONE MISSION</span>
  </div>
  <p style="margin: 0 0 0.85rem 0; font-size: 0.9rem; color: var(--text-primary); line-height: 1.6;">
    Everything you engineered from Lesson 14 through Lesson 21 now converges into one autonomous logistics system:
  </p>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.65rem; font-size: 0.8rem; margin-bottom: 1rem;">
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #06b6d4;">1. L14 URDF Model:</strong> AMR dimensions, chassis &amp; sensor brackets
    </div>
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #06b6d4;">2. L15 TF Tree:</strong> Calibrated spatial transforms (REP 103)
    </div>
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #10b981;">3. L16 Gazebo Physics:</strong> Diff drive motors &amp; 2D LiDAR raycasts
    </div>
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #10b981;">4. L17 Warehouse World:</strong> Industrial aisles, pallet racks &amp; docks
    </div>
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #f59e0b;">5. L18 SLAM Map:</strong> Serialized occupancy grid (<code>warehouse_map.yaml</code>)
    </div>
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #f59e0b;">6. L19 Costmaps:</strong> Inflation safety zones &amp; obstacle clearings
    </div>
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #8b5cf6;">7. L20 Planners &amp; DWB:</strong> Global routes &amp; velocity rollouts
    </div>
    <div style="background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--border-color);">
      <strong style="color: #ec4899;">8. L21 Recovery BTs:</strong> Self-healing Spin, BackUp &amp; Wait routines
    </div>
  </div>
  <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; padding: 0.65rem 0.95rem; border-radius: 4px; font-size: 0.85rem; color: var(--text-primary);">
    <strong>🎯 Your Capstone Mission:</strong> Write the production Python automation script using Nav2 Simple Commander (<code>BasicNavigator</code>). Command the AMR to depart Home Base, patrol Storage Bay A, Pallet Inspection Bay B, Staging Bay C, and return autonomously to the Home Base Station!
  </div>
</div>
'''

obj_card_end = c22.find('</div>\n<hr class="divider">\n<h2 id="2-the-simple-commander-python-api-architecture">')
if obj_card_end != -1:
    c22 = c22[:obj_card_end + 6] + l22_convergence + c22[obj_card_end + 6:]
else:
    c22 = c22.replace('<h2 id="2-the-simple-commander-python-api-architecture">', l22_convergence + '<h2 id="2-the-simple-commander-python-api-architecture">')

l22_handoff = make_asset_handoff(
    "Your master mission script represents the culmination of Level 1 AMR engineering, executing complete multi-station warehouse logistics missions autonomously.",
    "ros2_ws_reference/src/navpro_navigation/navpro_navigation/m04_l22_02_task_multi_waypoint_patrol.py",
    "Lesson 23 (Physical Robot Hardware Deployment - Sim-to-Real)"
)
c22 += l22_handoff
l22['html_content'] = c22
print("Updated Lesson 22.")

# ==============================================================================
# 10. UPDATE LESSON 23 (Sim-to-Real Hardware)
# ==============================================================================
l23 = data['lessons'][22]
c23 = l23['html_content']

l23_bridge = make_continuity_bridge(
    "STEP 10 OF 10: PHYSICAL DEPLOYMENT & GRADUATION",
    "Lesson 22 (Autonomous Navigation Scripting with Nav2 Simple Commander)",
    "The complete tested autonomous navigation software stack and multi-checkpoint patrol mission script.",
    "Sim-to-Real hardware bringup! Swapping Gazebo simulation plugins for physical hardware drivers (micro-ROS motor controller, physical RP-LiDAR, depth camera), localizing on the real warehouse floor via AMCL, and running the autonomous patrol script on physical hardware!",
    "Course Graduation & Engineering Certification",
    "Completing this lesson certifies you as a Level 1 Autonomous Mobile Robotics Engineer capable of building complete AMR software stacks from bare URDF math to physical warehouse deployment."
)

obj_card_end = c23.find('</div>\n<hr class="divider">\n<h2 id="2-sim-to-real-architecture-mapping">')
if obj_card_end != -1:
    c23 = c23[:obj_card_end + 6] + l23_bridge + c23[obj_card_end + 6:]
else:
    c23 = c23.replace('<h2 id="2-sim-to-real-architecture-mapping">', l23_bridge + '<h2 id="2-sim-to-real-architecture-mapping">')

l23_handoff = make_asset_handoff(
    "Your physical hardware readiness audit confirms serial bus integrity, micro-ROS agent handshake, sensor driver data streams, and hardware emergency stop safety compliance.",
    "ros2_ws_reference/scripts/m04_l23_task_hardware_check.sh",
    "NavPro Robotics Level 1 Engineering Certification"
)
c23 += l23_handoff
l23['html_content'] = c23
print("Updated Lesson 23.")

# Write back to file with proper JSON serialization
with open(JSON_PATH, 'w') as f:
    json.dump(data, f, indent=2)

print("\nSuccessfully updated all lessons (14-23) in lessonsData.json!")
