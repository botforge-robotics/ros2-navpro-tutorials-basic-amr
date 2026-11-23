#!/usr/bin/env python3
import json
import os

PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json"

def update_lessons():
    with open(PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for l in data.get("lessons", []):
        lid = l.get("id")

        # =========================================================================
        # LESSON 13: 2D LiDAR SLAM Mapping with SLAM Toolbox
        # =========================================================================
        if lid == "lesson_13":
            html = l.get("html_content", "")
            if "2. Robot Localization Foundations" not in html:
                insert_marker = '<h2 id="2-graph-slam-architecture">5. The SLAM Dilemma'
                sec234_html = """
<h2 id="2-robot-localization-foundations-amcl">2. Robot Localization Foundations: AMCL &amp; Particle Filters</h2>
<p>To navigate autonomously through a warehouse, an Autonomous Mobile Robot (AMR) must solve the fundamental question: <em>"Where am I relative to the global reference frame?"</em> Adaptive Monte Carlo Localization (AMCL) solves this by maintaining a cloud of probability particles representing hypotheses of robot pose.</p>

<div class="steps-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 1: Global Uniform Distribution (Zero Prior)</h4>
    <img src="assets/images/amcl_step1_uniform_particles.png" alt="AMCL Step 1: Global Uniform Particle Distribution" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">When initialized without prior pose knowledge, particles (x, y, &theta;) are uniformly distributed across all traversable floor space in the map.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 2: Particle State Vector [X_p, Y_p, &Theta;_p, w]</h4>
    <img src="assets/images/amcl_step2_particle_state_vector.png" alt="AMCL Step 2: Particle State Vector" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Each particle models a distinct candidate pose with position coordinates, orientation heading, and importance weight: S_p = [X_p, Y_p, &Theta;_p, w_p].</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 3: Motion Prediction &amp; Measurement Likelihood Filtering</h4>
    <img src="assets/images/amcl_step3_weight_filtering.png" alt="AMCL Step 3: Measurement Weight Filtering" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">As the robot moves, wheel odometry propagates particles forward. Live 2D LiDAR scans compare expected wall ranges against actual ranges to assign weights w_p = p(z_t | x_t^{[m]}, m).</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 4: Importance Resampling &amp; Pose Convergence</h4>
    <img src="assets/images/amcl_step4_pose_convergence.png" alt="AMCL Step 4: Pose Convergence" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Low-weight particles are pruned; high-weight particles are duplicated with slight Gaussian perturbation. The particle cloud collapses tightly around the true robot pose.</p>
  </div>
</div>

<h2 id="3-localization-challenges">3. Localization Challenges: Position Tracking vs Kidnapped Robot Problem</h2>
<p>Mobile robot localization encounters two distinct operational scenarios with vastly different complexity levels:</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="challenge-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">Position Tracking (Local Problem)</h4>
    <img src="assets/images/localization_position_tracking.png" alt="Position Tracking Local Problem" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;"><strong>Continuous Pose Tracking:</strong> The robot’s initial pose is known (e.g. at a docking station). The algorithm compensates for accumulated wheel slippage and odometry drift using a tightly bound, localized unimodal particle cluster.</p>
  </div>
  <div class="challenge-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #f87171; margin-top: 0; font-size: 0.95rem;">Kidnapped Robot Problem (Global Relocalization)</h4>
    <img src="assets/images/localization_kidnapped_robot.png" alt="Kidnapped Robot Problem" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;"><strong>Global Disruption &amp; Recovery:</strong> The robot is picked up and transported to an unknown location without odometry feedback. When AMCL detects sudden sensor inconsistency, it injects random particles across the map to re-estimate global pose from scratch.</p>
  </div>
</div>

<h2 id="4-occupancy-grid-mapping">4. Occupancy Grid Mapping &amp; Log-Odds Bayesian Updates</h2>
<p>Given known or estimated robot poses, how does the system construct an accurate metric representation of the environment? Mobile robotics discretizes 2D space into an Occupancy Grid.</p>

<div class="steps-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Mapping Step 1: Discretizing Continuous 2D Space</h4>
    <img src="assets/images/occupancy_grid_step1_lattice.png" alt="Mapping Step 1: Continuous Discretization" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Continuous Cartesian coordinates (x, y) &isin; &real;&sup2; are converted into an indexed lattice grid of discrete square cells m_i governed by spatial resolution (e.g., 0.05 m/cell).</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Mapping Step 2: Binary Cell States (m_i &isin; {0, 1})</h4>
    <img src="assets/images/occupancy_grid_step2_cell_states.png" alt="Mapping Step 2: Binary Cell States" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Each cell represents a binary state: m_i = 0 (Free traversable floor) or m_i = 1 (Occupied obstacle/wall). Unknown unmapped cells start at probability p(m_i) = 0.5.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Mapping Step 3: Full Warehouse Binary Grid Matrix</h4>
    <img src="assets/images/occupancy_grid_step3_full_matrix.png" alt="Mapping Step 3: Full Warehouse Grid Matrix" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">The complete warehouse floorplan becomes a 2D matrix of cells: M = {m_1, m_2, ..., m_N}, with rows and columns corresponding directly to global world coordinates.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Mapping Step 4: LiDAR Raycasting Cone &amp; Log-Odds Updates</h4>
    <img src="assets/images/occupancy_grid_step4_raycast_cone.png" alt="Mapping Step 4: LiDAR Raycasting Cone" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Each laser beam casts a ray through space using Bresenham's algorithm. Cells traversed along the ray have log-odds occupancy decremented (free space), while the terminal cell where the beam reflects is incremented (occupied wall).</p>
  </div>
</div>
"""
                html = html.replace(insert_marker, sec234_html + "\n" + insert_marker)
                # Also insert slam dataflow image before pose graph
                html = html.replace(
                    '<p><img src="assets/images/slam_loop_closure_animation.svg"',
                    '<p><img src="assets/images/slam_dataflow_architecture.png" alt="Classical SLAM Dataflow Architecture" class="lesson-image" style="max-height: 320px; object-fit: contain; margin-bottom: 1.25rem;" loading="lazy" /></p>\n<p><img src="assets/images/slam_loop_closure_animation.svg"'
                )
                # And insert live rviz2 mapping image
                html = html.replace(
                    '<h3 id="step-43-drive-the-robot">Step 4.3: Drive the Robot</h3>',
                    '<h3 id="step-43-drive-the-robot">Step 4.3: Drive the Robot</h3>\n<p><img src="assets/images/rviz2_live_slam_mapping.png" alt="RViz2 Live SLAM Mapping Interface" class="lesson-image" style="max-height: 320px; object-fit: contain; margin-bottom: 1rem;" loading="lazy" /></p>'
                )
                l["html_content"] = html
                print("Updated Lesson 13 html_content with complete RSE step-by-step visual figures!")

        # =========================================================================
        # LESSON 14: Nav2 Stack Architecture & Costmap 2D Configuration
        # =========================================================================
        elif lid == "lesson_14":
            l["subtopics"] = [
                {"id": "1-overview-learning-objectives", "title": "1. Overview &amp; Learning Objectives"},
                {"id": "2-navigation-problem-formulation", "title": "2. Mobile Robot Navigation Problem Formulation &amp; Geometry"},
                {"id": "3-continuous-representation-collision", "title": "3. Continuous Workspace Representation &amp; Collision Dilemma (5-Step Breakdown)"},
                {"id": "4-cspace-obstacle-inflation", "title": "4. Configuration Space (C-Space) &amp; Obstacle Inflation Theory"},
                {"id": "5-costmap-2d-layers", "title": "5. Costmap 2D: The 3-Tier Layered Architecture"},
                {"id": "6-inflation-mathematics", "title": "6. Inflation Layer Mathematics: The Safety Buffer &amp; Decay Function"},
                {"id": "7-global-vs-local-costmaps", "title": "7. Global vs. Local Costmap Configuration &amp; Parameter Matrix"},
                {"id": "8-nav2-server-architecture", "title": "8. Nav2 System Architecture: Lifecycle Servers &amp; Recovery Pipeline"},
                {"id": "9-hands-on-student-challenge", "title": "9. Hands-on Student Challenge: Real-Time Costmap Inflation &amp; Clearance Auditor"}
            ]

            l14_html = """
<h2 id="1-overview-learning-objectives">1. Overview &amp; Learning Objectives</h2>
<div class="learning-objectives-banner">
  <div class="objectives-header">
    <span class="objectives-icon">🎯</span>
    <h3 class="objectives-main-title">Learning Objectives &amp; Core Outcomes</h3>
  </div>
  <ul class="objectives-list">
    <li><strong>Mathematical Foundations:</strong> Understand how continuous robot workspace geometry is transformed into discrete Configuration Space (C-Space) via obstacle inflation by robot radius.</li>
    <li><strong>Layered Costmaps:</strong> Master the 3-tier Costmap 2D architecture combining the Static map, live LiDAR/depth Obstacle layers, and exponential Inflation buffer.</li>
    <li><strong>Safety Buffer Decay:</strong> Calculate lethal obstacle boundaries, inscribed radii, and exponential cost decay curves to prevent AMR chassis collisions.</li>
    <li><strong>Nav2 Server Stack:</strong> Learn the separation of responsibilities between BT Navigator, Planner Server, Controller Server, and Recovery Server.</li>
    <li><strong>Production Configuration:</strong> Configure and tune <code class="inline-code">nav2_params.yaml</code> for industrial differential drive AMRs operating in dynamic logistics warehouses.</li>
  </ul>
</div>

<h2 id="2-navigation-problem-formulation">2. Mobile Robot Navigation Problem Formulation &amp; Geometry</h2>
<p>Autonomous mobile robot navigation is the science of computing and executing a safe, kinematically feasible trajectory from a current robot pose to a desired target goal without colliding with static warehouse infrastructure or dynamic obstacles.</p>

<div class="grid-card-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">1. Environment Geometry</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Physical boundaries, warehouse racking columns, walls, aisles, and restricted zones define the operational workspace <em>W &sub; &real;&sup2;</em>.</p>
  </div>
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">2. Robot Geometry</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">The physical chassis footprint (length, width, wheel baseline, caster placement, payload overhang) dictates whether the robot can physically fit through a corridor.</p>
  </div>
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">3. Poses &amp; Algorithm</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Given <em>Start Pose (x_s, y_s, &theta;_s)</em> and <em>Goal Pose (x_g, y_g, &theta;_g)</em>, the Path Planning Algorithm searches for a continuous collision-free route.</p>
  </div>
</div>

<h2 id="3-continuous-representation-collision">3. Continuous Workspace Representation &amp; Collision Dilemma (5-Step Breakdown)</h2>
<p>Before diving into algorithms, let us study how path planning operates in continuous space and why treating the robot as a simple point leads to catastrophic warehouse collisions:</p>

<div class="steps-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 1: Continuous 2D Workspace &amp; Goal</h4>
    <img src="assets/images/nav_continuous_rep_step1.png" alt="Continuous Space Step 1" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">The robot starts at an origin pose in continuous Cartesian space with an intended target waypoint across the warehouse floor.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 2: Workspace Obstacle Boundaries</h4>
    <img src="assets/images/nav_continuous_rep_step2.png" alt="Continuous Space Step 2" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Physical obstacles (pallets, pillars, machinery) introduce geometric keep-out zones in the workspace.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 3: Robot Trajectory Footprint Sweeping</h4>
    <img src="assets/images/nav_continuous_rep_step3.png" alt="Continuous Space Step 3" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">A candidate centerline path is traced between start and goal. However, the robot is not a dimensionless point—it has physical width and radius <em>r_robot</em>.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #f87171; margin-top: 0; font-size: 0.95rem;">Step 4: The Collision Dilemma (Clearance Failure)</h4>
    <img src="assets/images/nav_continuous_rep_collision.png" alt="Continuous Space Step 4: Collision" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">If the path passes closer to an obstacle than the robot radius (<em>distance &lt; r_robot</em>), the robot's physical chassis strikes the obstacle, resulting in severe hardware collision.</p>
  </div>
</div>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Step 5a: Distance Clearance Checking</h4>
    <img src="assets/images/nav_continuous_rep_clearance_check.png" alt="Clearance Check" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">To guarantee safety, every point along the path must satisfy the strict geometric constraint: <strong>Distance to nearest obstacle &gt; r_robot</strong>.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Step 5b: Allowable Collision-Free Path</h4>
    <img src="assets/images/nav_continuous_rep_allowable_path.png" alt="Allowable Path" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">The algorithm reroutes the path away from narrow gaps, finding a trajectory where the entire swept volume of the AMR clears all obstacles comfortably.</p>
  </div>
</div>

<h2 id="4-cspace-obstacle-inflation">4. Configuration Space (C-Space) &amp; Obstacle Inflation Theory</h2>
<p>Continuously checking complex polygon robot geometries against every obstacle in the workspace is computationally prohibitive. Mobile robotics solves this through a brilliant mathematical transformation: <strong>Configuration Space (C-Space)</strong>.</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #c084fc; margin-top: 0; font-size: 0.95rem;">Step 1: Inflating Obstacles by Robot Radius</h4>
    <img src="assets/images/nav_cspace_obstacle_inflation.png" alt="C-Space Obstacle Inflation" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Every obstacle in the workspace is expanded outward in all directions by the robot radius <em>r_robot</em> (Minkowski sum: <em>Obstacle &oplus; Robot_Footprint</em>).</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #c084fc; margin-top: 0; font-size: 0.95rem;">Step 2: Point Robot Representation &amp; C_free / C_obs</h4>
    <img src="assets/images/nav_cspace_cfree_cobs.png" alt="C-Space Free and Occupied" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">With obstacles inflated, the robot collapses into an infinitesimal single point mass. The workspace partitions strictly into <strong>C_free</strong> (admissible points) and <strong>C_obs</strong> (inadmissible points).</p>
  </div>
</div>

<h2 id="5-costmap-2d-layers">5. Costmap 2D: The 3-Tier Layered Architecture</h2>
<p>ROS 2 Nav2 implements C-Space inflation dynamically using the <strong>Costmap 2D</strong> plugin architecture. It stacks multiple independent 2D raster grids on top of each other:</p>

<div class="grid-card-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">1️⃣ Static Layer</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Subscribes to <code class="inline-code">/map</code> published by <code class="inline-code">map_server</code>. Represents permanent structural elements: walls, columns, racking. Cost values are 0 (free) or 254 (lethal).</p>
  </div>
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">2️⃣ Obstacle Layer</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Subscribes to live sensor streams (<code class="inline-code">/scan</code>). Raycasts through free space and dynamically inserts/clears unexpected obstacles (forklifts, crates, humans).</p>
  </div>
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">3️⃣ Inflation Layer</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Propagates obstacle costs outward through an exponential decay function, generating a continuous gradient potential field that repels the robot from hazards.</p>
  </div>
</div>

<h2 id="6-inflation-mathematics">6. Inflation Layer Mathematics: The Safety Buffer &amp; Decay Function</h2>
<p>Each cell in the Costmap 2D holds an unsigned 8-bit integer cost value <em>C &isin; [0, 255]</em>:</p>
<ul style="font-size: 0.9rem; line-height: 1.6; color: #94a3b8;">
  <li><strong>254 (Lethal Obstacle):</strong> The physical obstacle cell itself.</li>
  <li><strong>253 (Inscribed Obstacle Radius):</strong> Cells within the inscribed circle radius <em>r_inscribed</em>. Driving here guarantees collision.</li>
  <li><strong>1 &ndash; 252 (Decay Potential Zone):</strong> Cost smoothly drops exponentially with Euclidean distance <em>d</em>:
    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 6px; padding: 0.75rem; margin: 0.5rem 0; font-family: monospace; color: #fbbf24; text-align: center;">
      Cost(d) = 252 &times; exp( -&alpha; &times; (d - r_inscribed) )
    </div>
    where &alpha; is the inflation decay factor (<code class="inline-code">cost_scaling_factor</code>).
  </li>
  <li><strong>0 (Free Space):</strong> Completely clear traversable floor where navigation incurs zero obstacle penalty.</li>
  <li><strong>255 (Unknown Space):</strong> Unexplored regions outside the sensor horizon.</li>
</ul>

<h2 id="7-global-vs-local-costmaps">7. Global vs. Local Costmap Configuration &amp; Parameter Matrix</h2>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.85rem;">
  <thead>
    <tr style="background: rgba(30, 41, 59, 0.8); color: #e2e8f0; border-bottom: 2px solid #eab308;">
      <th style="padding: 0.6rem; text-align: left;">Feature</th>
      <th style="padding: 0.6rem; text-align: left;">Global Costmap</th>
      <th style="padding: 0.6rem; text-align: left;">Local Costmap</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.6rem; font-weight: bold;">Tracking Frame</td>
      <td style="padding: 0.6rem;"><code>map</code> (World Fixed)</td>
      <td style="padding: 0.6rem;"><code>odom</code> (Rolling Window Centered on AMR)</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.6rem; font-weight: bold;">Update Rate</td>
      <td style="padding: 0.6rem;">1.0 &ndash; 2.0 Hz (Macro Level)</td>
      <td style="padding: 0.6rem;">10.0 &ndash; 20.0 Hz (Micro Control Loop)</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.6rem; font-weight: bold;">Grid Dimensions</td>
      <td style="padding: 0.6rem;">Full warehouse map size (e.g. 50m &times; 50m)</td>
      <td style="padding: 0.6rem;">Rolling bounding box (e.g. 3.0m &times; 3.0m)</td>
    </tr>
    <tr>
      <td style="padding: 0.6rem; font-weight: bold;">Primary Client</td>
      <td style="padding: 0.6rem;">Planner Server (Global Path Finding)</td>
      <td style="padding: 0.6rem;">Controller Server (Local Dynamic Avoidance)</td>
    </tr>
  </tbody>
</table>

<h2 id="8-nav2-server-architecture">8. Nav2 System Architecture: Lifecycle Servers &amp; Recovery Pipeline</h2>
<p>Nav2 decouples autonomy into specialized ROS 2 nodes orchestrated by the Behavior Tree Navigator:</p>
<ul style="font-size: 0.9rem; line-height: 1.6; color: #94a3b8;">
  <li><strong>BT Navigator:</strong> Evaluates behavior trees to coordinate planning, path following, progress checks, and recoveries.</li>
  <li><strong>Planner Server:</strong> Calculates global routes from start to goal at 1 Hz using global costmap.</li>
  <li><strong>Controller Server:</strong> Computes instantaneous <code>/cmd_vel</code> twist commands at 20 Hz avoiding local obstacles.</li>
  <li><strong>Recoveries Server:</strong> Executes recovery behaviors (in-place spin, backup, costmap clearing) when stuck.</li>
  <li><strong>Lifecycle Manager:</strong> State machine controlling Unconfigured &rarr; Inactive &rarr; Active transitions across all servers.</li>
</ul>

<h2 id="9-hands-on-student-challenge">9. Hands-on Student Challenge: Real-Time Costmap Inflation &amp; Clearance Auditor</h2>
<p>In this lab exercise, students configure <code class="inline-code">nav2_params.yaml</code>, adjust <code class="inline-code">inflation_radius</code> and <code class="inline-code">cost_scaling_factor</code>, and verify safety clearance bands in RViz2 under real-time simulation.</p>
"""
            l["html_content"] = l14_html
            print("Updated Lesson 14 with full C-Space, obstacle inflation, and layered costmap curriculum!")

        # =========================================================================
        # LESSON 15: Nav2 Path Planners & Local Controller Tuning
        # =========================================================================
        elif lid == "lesson_15":
            l["subtopics"] = [
                {"id": "1-overview-learning-objectives", "title": "1. Overview &amp; Learning Objectives"},
                {"id": "2-path-planning-algorithm-roadmap", "title": "2. Path Planning Roadmap &amp; Algorithm Taxonomy"},
                {"id": "3-visibility-graph", "title": "3. Visibility Graph: Node Visibility &amp; Shortest Path Construction"},
                {"id": "4-voronoi-diagram", "title": "4. Voronoi Diagram: Free-Space Bisectors &amp; Maximum Obstacle Clearance"},
                {"id": "5-exact-cell-decomposition", "title": "5. Exact Cell Decomposition: Trapezoidal &amp; Triangular Partitioning"},
                {"id": "6-approx-cell-decomposition", "title": "6. Approximate Cell Decomposition (Quadtree): Recursive Subdivision"},
                {"id": "7-graph-search-astar", "title": "7. Graph Search: The A* Search Engine &amp; Heuristic Function"},
                {"id": "8-dwa-local-planner", "title": "8. Dynamic Window Approach (DWA): Velocity Sampling &amp; Forward Rollout"},
                {"id": "9-dwb-critics-scoring", "title": "9. Nav2 DWB Controller: Trajectory Scoring &amp; Critic Balancing"},
                {"id": "10-regulated-pure-pursuit", "title": "10. Regulated Pure Pursuit (RPP): Deterministic Industrial Path Tracking"},
                {"id": "11-production-controller-tuning", "title": "11. Production Controller Server Parameter Matrix &amp; Tuning Guide"},
                {"id": "12-hands-on-student-challenge", "title": "12. Hands-on Student Challenge: Trajectory Tracking Error &amp; Velocity Governor Monitor"}
            ]

            l15_html = """
<h2 id="1-overview-learning-objectives">1. Overview &amp; Learning Objectives</h2>
<div class="learning-objectives-banner">
  <div class="objectives-header">
    <span class="objectives-icon">🎯</span>
    <h3 class="objectives-main-title">Learning Objectives &amp; Core Outcomes</h3>
  </div>
  <ul class="objectives-list">
    <li><strong>Path Planning Taxonomy:</strong> Understand the spectrum of path planning algorithms: Continuous Roadmaps, Cell Decomposition, and Discrete Graph Search.</li>
    <li><strong>Visibility Graphs vs. Voronoi Diagrams:</strong> Analyze the fundamental trade-off between the shortest path (Visibility Graph hugging obstacles) versus maximum clearance (Voronoi Diagram).</li>
    <li><strong>Cell Decomposition Methods:</strong> Compare Exact trapezoidal decomposition against Approximate recursive Quadtree partitioning.</li>
    <li><strong>A* Heuristic Graph Search:</strong> Understand how <em>f(n) = g(n) + h(n)</em> guides the search engine to find the provably optimal route.</li>
    <li><strong>Local Controller Rollouts:</strong> Master Dynamic Window Approach (DWA/DWB) velocity sampling, forward trajectory rollout, and critic scoring.</li>
    <li><strong>Deterministic Tracking:</strong> Configure Regulated Pure Pursuit (RPP) for smooth, industrial-grade warehouse navigation without oscillatory wander.</li>
  </ul>
</div>

<h2 id="2-path-planning-algorithm-roadmap">2. Path Planning Roadmap &amp; Algorithm Taxonomy</h2>
<p>To safely pilot an AMR across a facility, navigation algorithms operate on two distinct levels: <strong>Global Macro-Planning</strong> (generating a waypoint path from start to goal across the full map) and <strong>Local Micro-Control</strong> (generating 20 Hz velocity commands avoiding dynamic obstacles).</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Algorithm Roadmap Hierarchy</h4>
    <img src="assets/images/nav_roadmap_hierarchy.png" alt="Path Planning Roadmap Hierarchy" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Path planning branches into continuous space Roadmaps, Cell Decomposition techniques, and discrete Graph Search formulations.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Path Planning Algorithms Matrix</h4>
    <img src="assets/images/nav_roadmap_algorithms.png" alt="Path Planning Algorithms Matrix" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Key canonical algorithms: Visibility Graph, Voronoi Diagram, Exact Cell Decomposition, Approximate Quadtree Decomposition, and A* Search.</p>
  </div>
</div>

<h2 id="3-visibility-graph">3. Visibility Graph: Node Visibility &amp; Shortest Path Construction</h2>
<p>The Visibility Graph connects the start node, all obstacle vertices, and the goal node to each other—excluding any connections that intersect obstacle bodies:</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">Step 1: Connecting Mutually Visible Vertices</h4>
    <img src="assets/images/nav_visibility_graph_construction.png" alt="Visibility Graph Construction" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Every node is linked by a line of sight to all other obstacle vertices that are directly visible without obstruction.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">Step 2: Shortest Path Search on Graph</h4>
    <img src="assets/images/nav_visibility_graph_shortest_path.png" alt="Shortest Path on Visibility Graph" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Running Dijkstra or A* on the visibility graph yields the <strong>mathematically shortest possible path</strong>. <em>Trade-off:</em> Paths graze sharply along obstacle corners, requiring tight inflation buffers.</p>
  </div>
</div>

<h2 id="4-voronoi-diagram">4. Voronoi Diagram: Free-Space Bisectors &amp; Maximum Obstacle Clearance</h2>
<p>In high-speed warehouse logistics, hugging obstacle corners is dangerous. The <strong>Voronoi Diagram</strong> offers the exact opposite philosophy:</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Voronoi Graph Construction</h4>
    <img src="assets/images/nav_voronoi_diagram_clearance.png" alt="Voronoi Diagram Clearance" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Voronoi edges bisect the free space midway between obstacles. Every edge lies strictly equidistant from each surrounding obstacle.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">Maximum Clearance Benefit</h4>
    <p style="font-size: 0.85rem; line-height: 1.5; color: #94a3b8;">Unlike Visibility Graphs which produce minimum distance routes, Voronoi Diagrams <strong>maximize clearance</strong> away from obstacles. The resulting trajectory keeps the AMR in the safest center lane of wide aisles, drastically reducing collision hazard.</p>
  </div>
</div>

<h2 id="5-exact-cell-decomposition">5. Exact Cell Decomposition: Trapezoidal &amp; Triangular Partitioning</h2>
<p>Exact cell decomposition partitions free space into non-overlapping geometric cells:</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #c084fc; margin-top: 0; font-size: 0.95rem;">Step 1: Non-Overlapping Cell Partitioning</h4>
    <img src="assets/images/nav_exact_cell_decomposition.png" alt="Exact Cell Decomposition" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Vertical line segments are extended from every obstacle vertex up and down until they hit boundaries, slicing free space into simple trapezoids and triangles.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #c084fc; margin-top: 0; font-size: 0.95rem;">Step 2: Adjacency Graph Search</h4>
    <img src="assets/images/nav_exact_cell_decomp_graph_search.png" alt="Adjacency Graph Search" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Nodes are placed at cell centers and shared segment midpoints. Searching this graph yields a channel of adjacent convex cells from start to goal.</p>
  </div>
</div>

<h2 id="6-approx-cell-decomposition">6. Approximate Cell Decomposition (Quadtree): Recursive Subdivision</h2>
<p>When obstacle boundaries are non-polygonal or irregular, <strong>Approximate Cell Decomposition</strong> recursively subdivides space using a Quadtree structure:</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 1: 4-Quadrant Classification</h4>
    <img src="assets/images/nav_approx_cell_decomposition_quadtree.png" alt="Quadtree 4-Quadrant Partition" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">The space is partitioned into four quadrants labeled <strong>Empty</strong> (free space), <strong>Full</strong> (occupied obstacle), or <strong>Mixed</strong> (contains both free space and obstacles).</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Step 2: Iterative Subdivision of Mixed Cells</h4>
    <img src="assets/images/nav_approx_cell_decomposition_iterations.png" alt="Quadtree Iterations" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">If an empty path cannot be connected from start to goal, mixed cells are recursively quartered. Finer free cells emerge until a connected navigable corridor is resolved.</p>
  </div>
</div>

<h2 id="7-graph-search-astar">7. Graph Search: The A* Search Engine &amp; Heuristic Function</h2>
<p>Once continuous space is converted into a graph or occupancy grid, the A* Search algorithm searches for the minimum-cost path:</p>
<div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 6px; padding: 0.75rem; margin: 1rem 0; font-family: monospace; color: #fbbf24; text-align: center; font-size: 1.1rem;">
  f(n) = g(n) + h(n)
</div>
<ul style="font-size: 0.9rem; line-height: 1.6; color: #94a3b8;">
  <li><strong>g(n):</strong> The exact accumulated cost to travel from the start node to the current node <em>n</em>.</li>
  <li><strong>h(n):</strong> The estimated heuristic cost from current node <em>n</em> to the goal destination. For 2D AMR navigation, Euclidean distance <em>h(n) = &radic;((x_g - x_n)&sup2; + (y_g - y_n)&sup2;)</em> is admissible, guaranteeing the mathematically optimal path.</li>
  <li><strong>f(n):</strong> Total estimated cost. The open priority queue always expands nodes with minimum <em>f(n)</em> first.</li>
</ul>

<h2 id="8-dwa-local-planner">8. Dynamic Window Approach (DWA): Velocity Sampling &amp; Forward Rollout</h2>
<p>While global planners generate static geometric paths at 1 Hz, local controllers execute at 20 Hz to avoid moving obstacles and command physical wheel speeds:</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">DWA Trajectory Rollout Simulation</h4>
    <img src="assets/images/nav_dwa_local_planner_rollout.png" alt="DWA Local Planner Rollout" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">DWA samples velocities (v, &omega;) in the dynamic window reachable within one control cycle. It performs forward numerical simulation from the robot's current pose to predict trajectories.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">The DWA 4-Step Cycle</h4>
    <ol style="font-size: 0.82rem; line-height: 1.4; color: #94a3b8; padding-left: 1.1rem; margin: 0;">
      <li><strong>Sample Velocities:</strong> Sample candidate linear (v) and angular (&omega;) speeds within motor acceleration limits.</li>
      <li><strong>Forward Simulation:</strong> Roll out trajectories over a short forward time horizon &Delta;t (e.g. 1.5 seconds).</li>
      <li><strong>Critic Scoring:</strong> Evaluate each trajectory against collision safety, path alignment, goal progress, and speed. Discard colliding trajectories.</li>
      <li><strong>Command &amp; Repeat:</strong> Dispatch the highest-scoring (v, &omega;) to the base motor drivers and repeat at 20 Hz.</li>
    </ol>
  </div>
</div>

<h2 id="9-dwb-critics-scoring">9. Nav2 DWB Controller: Trajectory Scoring &amp; Critic Balancing</h2>
<p>Nav2 implements DWA through the extensible <strong>DWB Controller</strong> plugin. It sums weighted scores across multiple modular critic functions:</p>
<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.85rem;">
  <thead>
    <tr style="background: rgba(30, 41, 59, 0.8); color: #e2e8f0; border-bottom: 2px solid #eab308;">
      <th style="padding: 0.5rem;">Critic Name</th>
      <th style="padding: 0.5rem;">Default Weight</th>
      <th style="padding: 0.5rem;">Behavioral Purpose</th>
      <th style="padding: 0.5rem;">Tuning Rule</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.5rem;"><code>BaseObstacle</code></td>
      <td style="padding: 0.5rem;">0.02</td>
      <td style="padding: 0.5rem;">Penalizes trajectories grazing close to obstacle cells.</td>
      <td style="padding: 0.5rem;">Increase if robot clips corners during sharp turns.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.5rem;"><code>PathAlign</code></td>
      <td style="padding: 0.5rem;">32.0</td>
      <td style="padding: 0.5rem;">Forces robot heading to point along the global path vector.</td>
      <td style="padding: 0.5rem;">High weight prevents wandering away from corridor centerlines.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.5rem;"><code>GoalAlign</code></td>
      <td style="padding: 0.5rem;">24.0</td>
      <td style="padding: 0.5rem;">Orients robot heading directly towards goal destination.</td>
      <td style="padding: 0.5rem;">Prevents robot from overshooting the final waypoint.</td>
    </tr>
    <tr>
      <td style="padding: 0.5rem;"><code>RotateToGoal</code></td>
      <td style="padding: 0.5rem;">32.0</td>
      <td style="padding: 0.5rem;">Enforces final in-place rotation when within XY tolerance.</td>
      <td style="padding: 0.5rem;">Crucial for docking into pallet stands and charging bays.</td>
    </tr>
  </tbody>
</table>

<h2 id="10-regulated-pure-pursuit">10. Regulated Pure Pursuit (RPP): Deterministic Industrial Path Tracking</h2>
<p>While DWB explores dynamic exploratory curves, <strong>Regulated Pure Pursuit (RPP)</strong> is the gold standard for predictable warehouse operations:</p>
<ul style="font-size: 0.9rem; line-height: 1.6; color: #94a3b8;">
  <li><strong>Lookahead Arc:</strong> Calculates geometric curvature arc towards a lookahead point on the global path at distance <em>L_lookahead</em>.</li>
  <li><strong>Curvature Deceleration:</strong> Automatically scales down linear velocity in tight bends proportional to path radius, preventing AMR chassis tipping or wheel skid.</li>
  <li><strong>Repeatable Industrial Paths:</strong> Eliminates erratic swerving, providing reliable train-track tracking down narrow warehouse aisles.</li>
</ul>

<h2 id="11-production-controller-tuning">11. Production Controller Server Parameter Matrix &amp; Tuning Guide</h2>
<p>Configure <code class="inline-code">nav2_params.yaml</code> under <code class="inline-code">controller_server</code> to set control frequencies, velocity bounds, and deceleration limits:</p>
<pre><code class="language-yaml">controller_server:
  ros__parameters:
    controller_frequency: 20.0
    min_x_velocity_threshold: 0.001
    min_theta_velocity_threshold: 0.001
    progress_checker_plugin: "progress_checker"
    goal_checker_plugins: ["general_goal_checker"]
    controller_plugins: ["FollowPath"]
    progress_checker:
      plugin: "nav2_controller::SimpleProgressChecker"
      required_movement_radius: 0.2
      movement_time_allowance: 10.0
    general_goal_checker:
      plugin: "nav2_controller::SimpleGoalChecker"
      xy_goal_tolerance: 0.15
      yaw_goal_tolerance: 0.10
      stateful: True</code></pre>

<h2 id="12-hands-on-student-challenge">12. Hands-on Student Challenge: Trajectory Tracking Error &amp; Velocity Governor Monitor</h2>
<p>Students implement a real-time ROS 2 node tracking cross-track distance error and velocity profiles, comparing DWB against RPP under simulated warehouse payload conditions.</p>
"""
            l["html_content"] = l15_html
            print("Updated Lesson 15 with full path planning roadmap, cell decomposition, A*, DWA, DWB, and RPP curriculum!")

    with open(PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("lessonsData.json successfully saved!")

if __name__ == "__main__":
    update_lessons()
