#!/usr/bin/env python3
"""
update_lesson14_navigation.py
Rearchitects buildLesson14Slides in slideParser.js according to user specifications:
1. Merges Slide 3 & 4 (Obstacle boundaries & swept AMR footprint trajectory).
2. Adds clean section_title ("title blank slides") before each major concept.
3. Improves UI and colors across all concept cards (centered, badges, accents).
4. Adds Path Planning Stack Architecture block diagram.
5. Covers complete path planning pipeline: continuous -> discretization -> graph search (A*) -> local planning (DWA).
6. Adds interactive step-by-step on-click animation for A* search explanation.
7. Adds practical hands-on steps: install packages, create package, setup launch & config files, AMCL + Nav2 tuning.
"""

import re
import os

SLIDE_PARSER_PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/utils/slideParser.js"

LESSON_14_CODE = '''function buildLesson14Slides(doc, lesson, slides) {
  // ==============================================================
  // PART I: CONTINUOUS REPRESENTATION & CONFIGURATION SPACE (C-SPACE)
  // ==============================================================

  // 1. Section Title: Part I
  slides.push({
    id: `${lesson.id}_sec_title_continuous`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part I: Continuous Space & C-Space',
    badge: '📐 Part I',
    title: 'Continuous Representation & C-Space',
    titleClass: 'text-navigation',
    titleColor: '#0284c7',
    description: 'Modeling real-world warehouse environments, robot geometry, clearance checks, and obstacle inflation into Configuration Space.'
  });

  // 2. Navigation Problem Formulation (Slide 146/147 in RSE)
  slides.push({
    id: `${lesson.id}_sec1_nav_problem`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. Navigation Problem Formulation',
    badge: '🧭 Problem Statement',
    title: 'Mobile Robot Navigation: Problem Formulation & Constraints',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏢</span><strong>Environment Geometry (&Wscr;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Physical warehouse racking columns, perimeter walls, and static obstacles define the 2D workspace boundaries &Wscr; &sub; &reals;<sup>2</sup>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Robot Geometry & Footprint (&Ascr;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Physical chassis dimensions (length, width, wheel baseline, and payload overhang) determine whether the AMR can physically traverse narrow warehouse aisles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Poses & Trajectory Feasibility</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Given Start Pose <code>q_s = (x_s, y_s, &theta;_s)</code> and Goal Pose <code>q_g = (x_g, y_g, &theta;_g)</code>, find a collision-free path that satisfies differential-drive kinematic limits.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.55rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>📌</span> Core Navigation Objectives
            </div>
            <ul style="font-size: 0.72rem; line-height: 1.45; margin: 0; padding-left: 1.1rem; color: var(--text-secondary);">
              <li><strong>Collision Avoidance:</strong> Distance to all obstacles strictly greater than 0 mm at all times.</li>
              <li><strong>Kinematic Feasibility:</strong> Path curvature must not exceed AMR turning radius capabilities.</li>
              <li><strong>Optimality:</strong> Minimize path length, travel duration, and sharp rotational heading reversals.</li>
            </ul>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.6rem; border-left: 3px solid #0284c7;">
            <strong>💡 Fundamental Rule:</strong> Navigation cannot be solved by simply treating the robot as a zero-radius point without collision checking.
          </div>
        </div>
      </div>
    `
  });

  // 3. Continuous Space Step 1: 2D Plane & Target Waypoint
  slides.push({
    id: `${lesson.id}_sec2_continuous_step1`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Continuous Space: 2D Plane',
    badge: '📐 Step 1',
    title: 'Continuous Space: 2D Plane & Target Waypoint',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌐</span><strong>The Continuous Workspace (&Wscr;)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The real world is continuous. Space is defined as &reals;<sup>2</sup> with infinite resolution, where coordinates <code>(x, y) &isin; &reals;<sup>2</sup></code> are represented by 64-bit floating point numbers.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Target Goal Poses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">A mission goal specifies position and orientation <code>(x_g, y_g, &theta;_g)</code>. The robot must plan a continuous parametric curve <code>q(t): [0, 1] &rarr; &Wscr;</code> reaching this target.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_step1.png" alt="Continuous Space 2D Plane" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Continuous 2D plane: Robot Start pose and Goal waypoint in empty free space
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 4. Continuous Space: Obstacle Boundaries & Swept AMR Trajectory (MERGED SLIDES 3 & 4!)
  slides.push({
    id: `${lesson.id}_sec3_continuous_merged_obstacles_swept`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Obstacles & Swept Trajectory',
    badge: '📦 Merged Step 2 & 3',
    title: 'Continuous Space: Obstacle Boundaries & Swept Trajectory',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧱</span><strong>Obstacle Boundaries (&Wscr;<sub>obs</sub>)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Physical warehouse racking columns, conveyor legs, and walls partition free space &Wscr;<sub>free</sub> from forbidden obstacle regions &Wscr;<sub>obs</sub>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>The Swept Footprint Volume</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">As the AMR moves along trajectory <code>q(t)</code>, it occupies a physical 2D area <code>&Ascr;(q(t))</code>. The swept volume is the union: <code>Swept(&tau;) = &cup;<sub>t</sub> &Ascr;(q(t))</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚠️</span><strong>Collision Condition</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">A trajectory is collision-free if and only if <code>Swept(&tau;) &cap; &Wscr;<sub>obs</sub> = &empty;</code> across the entire duration.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_step3.png" alt="Obstacle Boundaries and Swept Footprint Trajectory" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Swept AMR footprint volume passing between continuous obstacle boundaries
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 5. Continuous Space: Clearance Failure & Chassis Collision
  slides.push({
    id: `${lesson.id}_sec4_clearance_collision`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Clearance Failure & Collision',
    badge: '💥 Step 4',
    title: 'Continuous Space: Clearance Failure & Chassis Collision',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💥</span><strong>The Collision Boundary Failure</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">As the AMR advances along a candidate line, its physical chassis perimeter intersects obstacle boundaries because there is insufficient lateral clearance.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚫</span><strong>Point Trajectory vs. Robot Body</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Even though the robot center point <code>(x, y)</code> does not touch the obstacle, the chassis corners collide, causing real-world bumper trips and emergency stops.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_collision.png" alt="Clearance Failure and Chassis Collision" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: #ef4444; font-family: var(--font-sans); font-weight: bold;">
              Collision: Swept footprint intersects obstacle boundary (Clearance = 0 mm)
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 6. Continuous Space: Distance Clearance Condition (d > R)
  slides.push({
    id: `${lesson.id}_sec5_clearance_condition`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Clearance Condition',
    badge: '📏 Step 5',
    title: 'Continuous Space: Distance Clearance Condition (d > R)',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📏</span><strong>Distance to Obstacle Boundary</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">To guarantee safety, we enforce: <code>dist(p, &part;&Wscr;<sub>obs</sub>) &gt; R<sub>robot</sub></code> at every point <code>p</code> along the path, where <code>R<sub>robot</sub></code> is the circumscribed radius.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>✅</span><strong>Allowable Corridor Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Paths passing through corridors narrower than <code>2 &times; R<sub>robot</sub></code> are strictly pruned by the planning engine before motion execution begins.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_allowable_path.png" alt="Distance Clearance Condition d > R" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: #10b981; font-family: var(--font-sans); font-weight: bold;">
              Allowable Path: Safety clearance corridor dist > R_robot verified
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 7. Configuration Space: Obstacle Inflation by Robot Radius
  slides.push({
    id: `${lesson.id}_sec6_cspace_inflation`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Obstacle Inflation',
    badge: '🎈 Step 6',
    title: 'Configuration Space: Obstacle Inflation by Robot Radius',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎈</span><strong>Minkowski Sum Expansion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Instead of calculating complex polygon collisions at every timestep, we inflate every obstacle outward by the robot radius: <code>&Wscr;<sub>obs</sub> &oplus; &Ascr;</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>AMR Becomes an Infinitesimal Point</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">In Configuration Space, the robot collapses into a dimensionless 0-radius point particle! Path planning is reduced to finding a 1D curve that never crosses inflated boundaries.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_cspace_obstacle_inflation.png" alt="Obstacle Inflation by Robot Radius" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Obstacle boundaries inflated outward by AMR circumscribed radius R
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 8. Configuration Space: Point AMR in C_free vs C_obs
  slides.push({
    id: `${lesson.id}_sec7_cspace_free_obs`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. C_free vs C_obs',
    badge: '✨ Step 7',
    title: 'Configuration Space: Point AMR in C_free vs. C_obs',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🟢</span><strong>C_free Manifold</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The set of all configurations <code>q</code> where the robot does not collide: <code>C_free = {q &isin; C | &Ascr;(q) &cap; &Wscr;<sub>obs</sub> = &empty;}</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔴</span><strong>C_obs (Forbidden Manifold)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The set of forbidden configurations: <code>C_obs = C \\ C_free</code>. The robot point particle is strictly disallowed from entering <code>C_obs</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_cspace_cfree_cobs.png" alt="Point AMR in C_free vs C_obs" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Point AMR navigating safely through C_free between C_obs regions
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 9. Costmap 2D Architecture: The 3-Tier Layered Representation
  slides.push({
    id: `${lesson.id}_sec8_costmap_layers`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. Costmap 2D Layers',
    badge: '🗺️ Architecture',
    title: 'Costmap 2D Architecture: The 3-Tier Layered Representation',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗺️</span><strong>Layer 1: Static Layer</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Loaded from pre-built SLAM map via <code>map_server</code>. Represents permanent structural walls, fixed warehouse columns, and keep-out zones.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>Layer 2: Obstacle / Voxel Layer</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Subscribes to live 2D LiDAR <code>/scan</code> and 3D pointclouds. Dynamically inserts pallets, pedestrians, and moving forklifts with automatic ray-tracing clearing.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Layer 3: Inflation Layer</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Propagates obstacle costs outward using exponential decay curves, creating a smooth cost gradient that pushes global paths away from walls.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem;">
              Costmap Values (0 to 255)
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.71rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(239, 68, 68, 0.15); border-left: 3px solid #ef4444; border-radius: 4px;">
                <strong>254 (Lethal Obstacle):</strong> Physical collision point
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(245, 158, 11, 0.15); border-left: 3px solid #f59e0b; border-radius: 4px;">
                <strong>253 (Inscribed Obstacle):</strong> Center within robot radius
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(59, 130, 246, 0.15); border-left: 3px solid #3b82f6; border-radius: 4px;">
                <strong>1 to 252 (Decay Gradient):</strong> Exponential inflation buffer
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(16, 185, 129, 0.15); border-left: 3px solid #10b981; border-radius: 4px;">
                <strong>0 (Free Space):</strong> Safe, unimpeded traversal
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 10. Inflation Layer Mathematics: Exponential Cost Decay
  slides.push({
    id: `${lesson.id}_sec9_inflation_math`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '9. Inflation Mathematics',
    badge: '🧮 Formulation',
    title: 'Inflation Layer Mathematics: Exponential Cost Decay & Safety Radii',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Decay Equation</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">For distance <code>d</code> from obstacle: <code>Cost(d) = 253 &times; exp(-&alpha; &times; (d - r<sub>inscribed</sub>))</code>. Ensures smooth gradient descent for local trajectory generation.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>cost_scaling_factor (&alpha;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Higher &alpha; causes steeper cost dropoff (robot hugs obstacles closer in narrow aisles); lower &alpha; creates wider safety margins in open spaces.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem;">
              Geometric Radius Hierarchy
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.71rem;">
              <div style="padding: 0.3rem 0.5rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>Inscribed Radius (r<sub>inscribed</sub>):</strong> Radius of largest circle completely inside chassis (0.22 m for Nexus AMR).
              </div>
              <div style="padding: 0.3rem 0.5rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>Circumscribed Radius (r<sub>circum</sub>):</strong> Radius of smallest circle enclosing all corners (0.32 m for Nexus AMR).
              </div>
              <div style="padding: 0.3rem 0.5rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>Inflation Radius (r<sub>inflation</sub>):</strong> Maximum distance (e.g. 0.55 m) up to which cost values are propagated.
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // ==============================================================
  // PART II: DISCRETIZATION & ROADMAP METHODS
  // ==============================================================

  // 11. Section Title: Part II
  slides.push({
    id: `${lesson.id}_sec_title_discretization`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part II: Discretization & Roadmaps',
    badge: '🗺️ Part II',
    title: 'Discretization & Roadmaps',
    titleClass: 'text-mapping',
    titleColor: '#d97706',
    description: 'Transforming continuous Configuration Space into searchable topological graphs and discrete cell lattices.'
  });

  // 12. Path Planning Taxonomy: Continuous vs. Discretized Roadmaps (Slide 148 in RSE)
  slides.push({
    id: `${lesson.id}_sec10_roadmap_taxonomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '10. Path Planning Taxonomy',
    badge: '🗂️ Taxonomy',
    title: 'Path Planning Taxonomy: Continuous vs. Discretized Roadmaps',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>RoadMap Methods</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Construct a 1D network of navigable curves in C_free: Visibility Graphs (shortest path) and Voronoi Diagrams (maximum obstacle clearance).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧩</span><strong>Cell Decomposition</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Partition C_free into contiguous non-overlapping regions: Exact Cell Decomposition (trapezoidal slicing) and Approximate Cell Decomposition (quadtrees).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Graph Search Algorithms</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Once roadmaps or cells are formed, optimal pathfinding engines (A*, Dijkstra) evaluate node heuristics to produce the final trajectory.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_roadmap_taxonomy.png" alt="Path Planning Roadmap Taxonomy" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Algorithmic taxonomy from RSE.pptx: Roadmap vs. Cell Decomposition vs. A* Search
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 13. Visibility Graph Step 1: Interconnecting Visible Obstacle Vertices
  slides.push({
    id: `${lesson.id}_sec11_visibility_step1`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '11. Visibility Graph Step 1',
    badge: '👁️ Visibility Graph',
    title: 'Visibility Graph: Interconnecting Visible Obstacle Vertices',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>👁️</span><strong>Line-of-Sight Interconnection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The Visibility Graph connects the Start node, all polygon obstacle vertices, and the Goal node to each other wherever a direct straight line segment does not intersect obstacles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🕸️</span><strong>Roadmap Graph Structure</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Because every vertex is connected to all 'visible' peers, searching this graph guarantees finding the globally shortest Euclidean distance path.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_visibility_graph_step1.png" alt="Visibility Graph Interconnection" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Connecting all obstacle vertices visible from each other in C_free
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 14. Visibility Graph Step 2: Shortest Path Search
  slides.push({
    id: `${lesson.id}_sec12_visibility_step2`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '12. Visibility Graph Step 2',
    badge: '⚡ Shortest Path',
    title: 'Visibility Graph: Shortest Euclidean Path & Corner Grazing',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📏</span><strong>Optimal Euclidean Distance</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Running graph search on the visibility network computes the shortest possible trajectory from Start to Goal across 2D polygonal space.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚠️</span><strong>The Corner-Grazing Tradeoff</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Because paths pass directly through obstacle vertices, clearance is minimal (0 mm without inflation). Industrial AMRs require obstacle inflation to prevent chassis clipping.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_visibility_graph_step2.png" alt="Visibility Graph Shortest Path" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: #10b981; font-family: var(--font-sans); font-weight: bold;">
              Optimal shortest path computed through the visibility roadmap
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 15. Voronoi Diagram: Free-Space Bisectors & Maximum Clearance
  slides.push({
    id: `${lesson.id}_sec13_voronoi`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '13. Voronoi Diagram',
    badge: '🛡️ Maximum Clearance',
    title: 'Voronoi Diagram: Free-Space Bisectors & Maximum Clearance',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚖️</span><strong>Equidistant Bisectors</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">A Voronoi Diagram consists of edges that bisect free space between obstacles. Every point on an edge is strictly equidistant from the two nearest obstacle boundaries.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🛡️</span><strong>Maximized Safety Clearance</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Unlike visibility graphs which produce tight corner-grazing paths, Voronoi trajectories maximize distance from obstacles, providing maximum safety in busy industrial environments.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_voronoi_diagram.png" alt="Voronoi Diagram Bisectors" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Voronoi graph: edges bisect free space equidistant from obstacles
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 16. Exact Cell Decomposition: Trapezoidal & Triangular Slicing
  slides.push({
    id: `${lesson.id}_sec14_exact_cell_decomp`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '14. Exact Cell Decomposition',
    badge: '📐 Cell Slicing',
    title: 'Exact Cell Decomposition: Trapezoidal & Triangular Slicing',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>✂️</span><strong>Vertical Vertex Slicing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Exact cell decomposition divides free space into contiguous, non-overlapping convex trapezoids and triangles by extending vertical line segments from each obstacle vertex.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🕸️</span><strong>Adjacency Dual Graph</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Nodes are placed at cell centroids and boundary midpoints. Connecting adjacent cells creates a topological graph searched from start cell to goal cell.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_exact_cell_decomp_step1.png" alt="Exact Cell Decomposition" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Non-overlapping trapezoidal cells and resultant shortest path traversal
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 17. Approximate Cell Decomposition: Recursive Quadtree Subdivision
  slides.push({
    id: `${lesson.id}_sec15_approx_cell_decomp`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '15. Approx Cell Decomposition',
    badge: '🌳 Quadtrees',
    title: 'Approximate Cell Decomposition: Recursive Quadtree Subdivision',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔲</span><strong>Three-State Cell Classification</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">The workspace is recursively divided into 4 quadrants. Each cell is labeled: <code>Empty</code> (entirely free), <code>Full</code> (completely occupied), or <code>Mixed</code> (partially occupied).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Hierarchical Refinement</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">If no contiguous chain of Empty cells connects Start to Goal, Mixed cells are subdivided into 4 sub-quadrants. As resolution increases, narrow passages emerge!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_approx_cell_decomp_step2.png" alt="Approximate Cell Decomposition Quadtree" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Recursive quadtree subdivision revealing free corridor through mixed cells
            </div>
          </div>
        </div>
      </div>
    `
  });

  // ==============================================================
  // PART III: GRAPH SEARCH & PATH PLANNING ALGORITHMS
  // ==============================================================

  // 18. Section Title: Part III
  slides.push({
    id: `${lesson.id}_sec_title_graph_search`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part III: Graph Search & Planning',
    badge: '🔍 Part III',
    title: 'Graph Search & A* Algorithm',
    titleClass: 'text-slam',
    titleColor: '#7c3aed',
    description: 'Evaluating node frontiers with admissible heuristics to compute mathematically optimal global paths.'
  });

  // 19. The A* Search Engine: Formulation & Priority Queue (Slide 167 in RSE)
  slides.push({
    id: `${lesson.id}_sec16_astar_formulation`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '16. A* Search Formulation',
    badge: '⭐ Formulation',
    title: 'Graph Search: The A* Search Engine & Heuristic Function',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⭐</span><strong>Evaluation Function f(n) = g(n) + h(n)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;"><code>g(n)</code> = exact cumulative cost from start to node <code>n</code>.<br/><code>h(n)</code> = estimated cheapest cost from node <code>n</code> to goal (heuristic).<br/><code>f(n)</code> = total estimated path cost through node <code>n</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📋</span><strong>Priority Queue Frontier</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">A* orders candidate nodes in a min-heap priority queue by <code>f(n)</code>. At each iteration, the node with lowest <code>f(n)</code> is expanded, keeping paths short while driving toward the goal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #7c3aed; margin-bottom: 0.35rem;">
              Heuristic Admissibility & Consistency
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.71rem;">
              <div style="padding: 0.3rem 0.45rem; background: rgba(124, 58, 237, 0.1); border-left: 3px solid #7c3aed; border-radius: 4px;">
                <strong>Admissible (h(n) &le; h*(n)):</strong> The heuristic never overestimates the true remaining distance (e.g. Euclidean straight-line distance). Guarantees optimal path!
              </div>
              <div style="padding: 0.3rem 0.45rem; background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; border-radius: 4px;">
                <strong>Dijkstra Equivalence:</strong> When <code>h(n) = 0</code> everywhere, A* degenerates into uniform-cost Dijkstra search.
              </div>
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.6rem; border-left: 3px solid #7c3aed;">
            <strong>👉 Interactive Next:</strong> Click through the interactive state machine on the next slide to trace A* execution step-by-step!
          </div>
        </div>
      </div>
    `
  });

  // 20. Interactive Simulation: A* Search Step-by-Step On-Click Engine (Slide 168 in RSE)
  slides.push({
    id: `${lesson.id}_interactive_astar`,
    type: 'interactive',
    interactiveKey: 'astar',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '17. Interactive A* Search Engine',
    badge: '⚡ Interactive Simulation',
    title: 'A* Graph Search: Step-by-Step On-Click State Machine'
  });

  // ==============================================================
  // PART IV: LOCAL PLANNING & DYNAMIC WINDOW APPROACH (DWA)
  // ==============================================================

  // 21. Section Title: Part IV
  slides.push({
    id: `${lesson.id}_sec_title_local_planning`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part IV: Local Trajectory Planning',
    badge: '🏎️ Part IV',
    title: 'Local Planning: Dynamic Window Approach',
    titleClass: 'text-navigation',
    titleColor: '#e11d48',
    description: 'Real-time velocity generation, acceleration feasibility windows, and forward trajectory rollout scoring.'
  });

  // 22. Dynamic Window Approach (DWA): Velocity Space Sampling & Forward Simulation (Slide 169 in RSE)
  slides.push({
    id: `${lesson.id}_sec17_dwa_rollout`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '18. DWA Velocity Sampling',
    badge: '🏎️ DWA Rollout',
    title: 'Dynamic Window Approach (DWA): Velocity Sampling & Forward Rollout',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Dynamic Window Velocity Sampling</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Sample candidate velocity pairs <code>(v, &omega;)</code> reachable within one simulation timestep <code>dt</code> based on actuator limits and acceleration limits: <code>v &isin; [v - a<sub>max</sub>dt, v + a<sub>max</sub>dt]</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Forward Trajectory Simulation</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">For each sampled velocity pair, simulate the robot forward trajectory for <code>sim_time</code> (typically 1.5 to 2.5 seconds) using unicycle kinematics.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Collision Pruning & Best Pick</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Discard trajectories intersecting lethal obstacles. Evaluate remaining trajectories with scoring critics, pick the highest score, and stream <code>/cmd_vel</code> at 20 Hz!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_dwa_local_planner.png" alt="DWA Local Planner Rollout" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Velocity space sampling, forward rollout curves, and collision pruning
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 23. Nav2 DWB Controller: Critic Scoring Pipeline
  slides.push({
    id: `${lesson.id}_sec18_dwb_critics`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '19. DWB Critic Scoring',
    badge: '⚖️ Scoring Matrix',
    title: 'Nav2 DWB Controller: Multi-Objective Critic Scoring Matrix',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Objective Function G(v, &omega;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;"><code>G(v, &omega;) = &sum;<sub>i</sub> w<sub>i</sub> &times; Critic<sub>i</sub>(trajectory)</code>. Each critic inspects candidate rollouts on the local costmap and outputs a normalized scalar score.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>BaseObstacle Critic</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Evaluates robot footprint along the simulated curve against the local costmap. Any footprint crossing lethal cells (254) is instantly rejected with negative infinity.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.35rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #e11d48; margin-bottom: 0.3rem;">
              DWB Critic Weighting Hierarchy
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.7rem;">
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>PathAlign (scale: 32.0):</strong> Penalizes heading deviation from global plan.
              </div>
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>GoalAlign (scale: 24.0):</strong> Penalizes robot heading pointing away from goal.
              </div>
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>PathDist (scale: 32.0):</strong> Penalizes perpendicular distance from global line.
              </div>
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>GoalDist (scale: 24.0):</strong> Incentivizes forward progress toward target.
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // ==============================================================
  // PART V: NAV2 & PATH PLANNING STACK ARCHITECTURE
  // ==============================================================

  // 24. Section Title: Part V
  slides.push({
    id: `${lesson.id}_sec_title_nav2_arch`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part V: Nav2 Stack Architecture',
    badge: '🏗️ Part V',
    title: 'Nav2 Stack & Path Planning Architecture',
    titleClass: 'text-localization',
    titleColor: '#4f46e5',
    description: 'Modular ROS 2 navigation framework integrating behavior trees, planners, controllers, costmaps, and recovery behaviors.'
  });

  // 25. Path Planning Stack Architecture: Complete System Block Diagram
  slides.push({
    id: `${lesson.id}_sec19_stack_block_diagram`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '20. Nav2 Stack Block Diagram',
    badge: '🏗️ Architecture Block Diagram',
    title: 'Path Planning Stack Architecture: Complete System Block Diagram',
    htmlContent: `
      <div style="display: flex; flex-direction: column; gap: 0.45rem; width: 100%; height: 100%; justify-content: center;">
        {/* Responsive High-Contrast Architecture Block Diagram */}
        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(79, 70, 229, 0.35); border-radius: 10px; padding: 0.5rem 0.8rem; box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
          <div style="display: grid; grid-template-columns: 0.85fr 2fr 0.85fr; gap: 0.6rem; align-items: center;">
            
            {/* Left Inputs Column */}
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="font-size: 0.7rem; font-weight: bold; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.5px;">
                Sensor & State Inputs
              </div>
              <div style="background: rgba(6, 182, 212, 0.12); border: 1px solid #06b6d4; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.7rem;">
                <div style="font-weight: bold; color: #22d3ee;">2D LiDAR</div>
                <code style="font-size: 0.65rem;">/scan (50 Hz)</code>
              </div>
              <div style="background: rgba(6, 182, 212, 0.12); border: 1px solid #06b6d4; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.7rem;">
                <div style="font-weight: bold; color: #22d3ee;">Wheel Odometry</div>
                <code style="font-size: 0.65rem;">/odom &amp; /tf</code>
              </div>
              <div style="background: rgba(6, 182, 212, 0.12); border: 1px solid #06b6d4; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.7rem;">
                <div style="font-weight: bold; color: #22d3ee;">Map Server</div>
                <code style="font-size: 0.65rem;">/map (.yaml &amp; .pgm)</code>
              </div>
            </div>

            {/* Center Core Stack Column */}
            <div style="display: flex; flex-direction: column; gap: 0.45rem;">
              {/* BT Navigator */}
              <div style="background: rgba(139, 92, 246, 0.15); border: 1.5px solid #8b5cf6; border-radius: 6px; padding: 0.4rem 0.6rem; text-align: center;">
                <div style="font-weight: bold; font-size: 0.76rem; color: #c084fc;">
                  BT Navigator (<code>bt_navigator</code>)
                </div>
                <div style="font-size: 0.66rem; color: #e2e8f0;">
                  XML Behavior Tree Orchestrator: Dispatches goals, handles recovery &amp; replanning logic
                </div>
              </div>

              {/* Planners & Controllers Dual Block */}
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem;">
                {/* Global Planner */}
                <div style="background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; border-radius: 6px; padding: 0.35rem 0.5rem;">
                  <div style="font-weight: bold; font-size: 0.72rem; color: #60a5fa;">Global Planner</div>
                  <div style="font-size: 0.64rem; color: #cbd5e1;"><code>planner_server</code> (A* / Smac)</div>
                  <div style="font-size: 0.62rem; color: #94a3b8; margin-top: 0.2rem;">Over Global Costmap 2D</div>
                </div>
                {/* Local Controller */}
                <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 6px; padding: 0.35rem 0.5rem;">
                  <div style="font-weight: bold; font-size: 0.72rem; color: #34d399;">Local Controller</div>
                  <div style="font-size: 0.64rem; color: #cbd5e1;"><code>controller_server</code> (DWB / RPP)</div>
                  <div style="font-size: 0.62rem; color: #94a3b8; margin-top: 0.2rem;">Over Local Costmap (20 Hz)</div>
                </div>
              </div>

              {/* Recovery Behaviors Server */}
              <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 6px; padding: 0.3rem 0.6rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold; font-size: 0.7rem; color: #fbbf24;">Recovery Server (<code>behavior_server</code>)</span>
                <span style="font-size: 0.64rem; color: #fde68a;">Spin (360&deg;) &bull; BackUp (0.3m) &bull; Wait (2s)</span>
              </div>
            </div>

            {/* Right Actuators Output Column */}
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="font-size: 0.7rem; font-weight: bold; color: #10b981; text-transform: uppercase; letter-spacing: 0.5px;">
                Motion Actuation
              </div>
              <div style="background: rgba(16, 185, 129, 0.18); border: 1.5px solid #10b981; border-radius: 6px; padding: 0.55rem 0.5rem; text-align: center;">
                <div style="font-weight: bold; font-size: 0.74rem; color: #34d399;">Velocity Command</div>
                <code style="font-size: 0.68rem; font-weight: bold;">/cmd_vel</code>
                <div style="font-size: 0.62rem; color: #a7f3d0; margin-top: 0.2rem;">geometry_msgs/Twist</div>
              </div>
              <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid #475569; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.66rem; text-align: center; color: #94a3b8;">
                Diff-Drive Motor Base
              </div>
            </div>

          </div>
        </div>
        <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.65rem; border-left: 3px solid #4f46e5;">
          <strong>💡 Architecture Separation:</strong> High-level mission decisions (Behavior Trees) are decoupled from global routing (Planner) and reactive obstacle avoidance (Controller).
        </div>
      </div>
    `
  });

  // ==============================================================
  // PART VI: ROS 2 NAVIGATION PRACTICAL (HANDS-ON LAB)
  // ==============================================================

  // 26. Section Title: Part VI
  slides.push({
    id: `${lesson.id}_sec_title_practical_nav`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part VI: ROS 2 Navigation Practical',
    badge: '🛠️ Part VI',
    title: 'ROS 2 Navigation Practical',
    titleClass: 'text-slam',
    titleColor: '#059669',
    description: 'Hands-on workflow: package installation, workspace creation, launch & config files setup, and AMCL/Nav2 parameter tuning.'
  });

  // 27. Practical Step 1: Install Required Nav2 & Localization Packages
  slides.push({
    id: `${lesson.id}_sec20_step1_install_packages`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '21. Practical Step 1: Install Packages',
    badge: '📦 Practical Step 1',
    title: 'Practical Step 1: Install Required Nav2 & Localization Packages',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>navigation2 &amp; nav2_bringup</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Installs complete Nav2 metapackage: BT Navigator, Planner Server, Controller Server, Costmap 2D, and Map Server.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>nav2_amcl &amp; robot_localization</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Provides Monte Carlo Localization (AMCL) against static map and EKF state estimation fusing wheel encoders and IMU.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-terminal-window">
            <div class="ppt-term-header">
              <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="term-title">student@amr-dev: ~ (bash)</span>
            </div>
            <pre class="ppt-term-body" style="font-size: 0.71rem; line-height: 1.4; padding: 0.5rem;"><code class="language-bash"># Update APT index
sudo apt update

# Install Nav2 and bringup metapackages
sudo apt install -y \\
  ros-humble-navigation2 \\
  ros-humble-nav2-bringup \\
  ros-humble-robot-localization

# Verify Nav2 packages are registered
ros2 pkg list | grep nav2</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 28. Practical Step 2: Create Navigation Package in Workspace
  slides.push({
    id: `${lesson.id}_sec21_step2_create_package`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '22. Practical Step 2: Create Package',
    badge: '📁 Practical Step 2',
    title: 'Practical Step 2: Create Navigation Package in Workspace',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📁</span><strong>nexus_amr_navigation Package</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Dedicated deployment package holding robot-specific launch scripts, tuned costmap configurations, and warehouse maps.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗂️</span><strong>Clean Subdirectory Architecture</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Follows ROS 2 standard directory layout: <code>config/</code> for YAML parameters, <code>launch/</code> for Python launch scripts, and <code>maps/</code> for serialized grids.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-terminal-window">
            <div class="ppt-term-header">
              <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="term-title">student@amr-dev: ~/ros2_ws/src (bash)</span>
            </div>
            <pre class="ppt-term-body" style="font-size: 0.71rem; line-height: 1.4; padding: 0.5rem;"><code class="language-bash">cd ~/ros2_ws/src

# Create Python navigation package
ros2 pkg create --build-type ament_python nexus_amr_navigation \\
  --dependencies rclpy nav2_bringup geometry_msgs sensor_msgs

# Create structured asset subdirectories
cd nexus_amr_navigation
mkdir -p config launch maps rviz</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 29. Practical Step 3: Setup Configuration Files (nav2_params.yaml & amcl_params.yaml)
  slides.push({
    id: `${lesson.id}_sec22_step3_setup_config`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '23. Practical Step 3: Setup Config',
    badge: '⚙️ Practical Step 3',
    title: 'Practical Step 3: Setup Configuration Files (nav2_params.yaml)',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Centralized nav2_params.yaml</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Contains node namespaces for <code>amcl</code>, <code>bt_navigator</code>, <code>controller_server</code>, <code>planner_server</code>, and <code>global/local_costmap</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>AMCL &amp; Costmap Alignment</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Enforces robot footprint <code>[[-0.22, -0.16], [0.22, -0.16], [0.22, 0.16], [-0.22, 0.16]]</code> and laser scan topic matching.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-ide-window">
            <div class="ppt-ide-header">
              <div class="ide-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="ide-file-tab">config/nav2_params.yaml</span>
            </div>
            <pre class="ppt-ide-body" style="font-size: 0.68rem; line-height: 1.35; padding: 0.5rem;"><code class="language-yaml">amcl:
  ros__parameters:
    min_particles: 500
    max_particles: 2000
    laser_model_type: "likelihood_field"

planner_server:
  ros__parameters:
    planner_plugins: ["GridBased"]
    GridBased:
      plugin: "nav2_navfn_planner/NavfnPlanner"
      use_astar: true

controller_server:
  ros__parameters:
    controller_frequency: 20.0
    controller_plugins: ["FollowPath"]
    FollowPath:
      plugin: "dwb_core::DWBLocalPlanner"
      max_vel_x: 0.6
      acc_lim_x: 1.5</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 30. Practical Step 4: Setup Navigation Launch File (navigation.launch.py)
  slides.push({
    id: `${lesson.id}_sec23_step4_setup_launch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '24. Practical Step 4: Setup Launch',
    badge: '🚀 Practical Step 4',
    title: 'Practical Step 4: Setup Navigation Launch File (navigation.launch.py)',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>nav2_bringup Integration</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Rather than writing 10 individual node launchers, our launch file includes <code>bringup_launch.py</code> from <code>nav2_bringup</code>, passing customized map and parameter paths.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Lifecycle Autostart</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Setting <code>autostart: True</code> automatically transitions all Nav2 managed lifecycle nodes from <em>Unconfigured</em> to <em>Active</em>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-ide-window">
            <div class="ppt-ide-header">
              <div class="ide-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="ide-file-tab">launch/navigation.launch.py</span>
            </div>
            <pre class="ppt-ide-body" style="font-size: 0.68rem; line-height: 1.35; padding: 0.5rem;"><code class="language-python">from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch_ros.substitutions import FindPackageShare
from launch.substitutions import PathJoinSubstitution

def generate_launch_description():
    pkg_share = FindPackageShare('nexus_amr_navigation')
    nav2_bringup = FindPackageShare('nav2_bringup')
    
    return LaunchDescription([
        IncludeLaunchDescription(
            PythonLaunchDescriptionSource(
                PathJoinSubstitution([nav2_bringup, 'launch', 'bringup_launch.py'])
            ),
            launch_arguments={
                'map': PathJoinSubstitution([pkg_share, 'maps', 'warehouse_map.yaml']),
                'params_file': PathJoinSubstitution([pkg_share, 'config', 'nav2_params.yaml']),
                'use_sim_time': 'True',
                'autostart': 'True'
            }.items()
        )
    ])</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 31. Practical Step 5: Launching Navigation & Live RViz2 Mission Execution
  slides.push({
    id: `${lesson.id}_sec24_step5_launching_execution`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '25. Practical Step 5: Launch & RViz2',
    badge: '🎯 Practical Step 5',
    title: 'Practical Step 5: Launching Navigation & Live RViz2 Mission Execution',
    htmlContent: `
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>1. Set 2D Pose Estimate</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Click '2D Pose Estimate' in RViz2 and drag an arrow matching the robot physical start location to initialize AMCL particle cloud.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>2. Set 2D Goal Pose</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Click 'Nav2 Goal' in RViz2 toolbar. Watch global planner produce green line and local DWB controller execute motion commands!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-terminal-window">
            <div class="ppt-term-header">
              <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="term-title">student@amr-dev: ~ (bash)</span>
            </div>
            <pre class="ppt-term-body" style="font-size: 0.71rem; line-height: 1.4; padding: 0.5rem;"><code class="language-bash"># Build workspace
cd ~/ros2_ws && colcon build --symlink-install
source install/setup.bash

# Terminal 1: Launch simulation & robot state
ros2 launch nexus_amr_description gazebo.launch.py

# Terminal 2: Launch Nav2 autonomous navigation
ros2 launch nexus_amr_navigation navigation.launch.py

# Observe RViz2: Nav2 Goal trajectory active!</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 32. Practical Step 6: AMCL & Nav2 Parameter Tuning Guide
  slides.push({
    id: `${lesson.id}_sec25_step6_tuning_guide`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '26. Practical Step 6: Tuning Matrix',
    badge: '🎛️ Practical Step 6',
    title: 'Practical Step 6: AMCL & Nav2 Production Parameter Tuning Guide',
    htmlContent: `
      <div style="display: flex; flex-direction: column; gap: 0.4rem; justify-content: center; height: 100%;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.71rem; line-height: 1.35;">
            <thead>
              <tr style="background: rgba(15, 23, 42, 0.8); color: #60a5fa; text-align: left; border-bottom: 2px solid #3b82f6;">
                <th style="padding: 0.35rem 0.5rem;">Subsystem</th>
                <th style="padding: 0.35rem 0.5rem;">Parameter Name</th>
                <th style="padding: 0.35rem 0.5rem;">Nexus AMR Setting</th>
                <th style="padding: 0.35rem 0.5rem;">Production Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #a78bfa;">AMCL</td>
                <td style="padding: 0.35rem 0.5rem;"><code>min_particles / max_particles</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>500 / 2000</code></td>
                <td style="padding: 0.35rem 0.5rem;">Prevents particle deprivation during rapid turns while bounding CPU usage.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #38bdf8;">Costmap 2D</td>
                <td style="padding: 0.35rem 0.5rem;"><code>inflation_radius / cost_scaling_factor</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>0.55 m / 3.0</code></td>
                <td style="padding: 0.35rem 0.5rem;">Maintains smooth safety gradient without blocking narrow warehouse door passages.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #34d399;">DWB Controller</td>
                <td style="padding: 0.35rem 0.5rem;"><code>max_vel_x / acc_lim_x</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>0.6 m/s / 1.5 m/s&sup2;</code></td>
                <td style="padding: 0.35rem 0.5rem;">Limits linear acceleration to eliminate wheel slip and motor stall.</td>
              </tr>
              <tr>
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #fbbf24;">Critics</td>
                <td style="padding: 0.35rem 0.5rem;"><code>PathAlign.scale / PathDist.scale</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>32.0 / 32.0</code></td>
                <td style="padding: 0.35rem 0.5rem;">Prevents AMR from drifting away from global path or cutting blind corners.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
          <strong>🎯 Tuning Pro-Tip:</strong> Always tune AMCL localization first! If localization covariance is high, costmaps misalign and controllers produce erratic jerky motions.
        </div>
      </div>
    `
  });

  // ==============================================================
  // PART VII: ASSESSMENT & SUMMARY
  // ==============================================================

  // 33. Knowledge Check: Configuration Space & Costmap Inflation
  slides.push({
    id: `${lesson.id}_quiz_cspace_inflation`,
    type: 'quiz',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Assessment: C-Space',
    title: 'Configuration Space & Costmap Inflation',
    question: 'Why do path planning algorithms inflate obstacle boundaries by the robot radius R to form Configuration Space (C-Space)?',
    options: [
      'To increase 2D LiDAR detection range and improve laser scan reflectivity.',
      'To allow the physical robot to be treated as an infinitesimal 0-radius point particle.',
      'To speed up wheel encoder odometry integration rates from 50 Hz to 200 Hz.',
      'To convert differential-drive kinematic models into omnidirectional holonomic models.'
    ],
    answer: 1,
    explanation: 'Inflating obstacles by the robot radius R (Minkowski sum W_obs &oplus; A) transforms the robot into a single point particle in C-Space, vastly simplifying collision checking during graph search.'
  });

  // 34. Knowledge Check: A* Heuristics & DWA Trajectory Rollouts
  slides.push({
    id: `${lesson.id}_quiz_astar_heuristics`,
    type: 'quiz',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Assessment: A* & DWA',
    title: 'A* Heuristic Admissibility & Local Control',
    question: 'In the A* graph search evaluation function f(n) = g(n) + h(n), what mathematical property must heuristic h(n) satisfy to guarantee finding the shortest path?',
    options: [
      'h(n) must equal zero for all non-terminal nodes in the search tree.',
      'h(n) must be strictly greater than the actual remaining cost to force greedy expansion.',
      'h(n) must be admissible (it must never overestimate the true remaining cost to the goal).',
      'h(n) must be computed using Manhattan distance rather than Euclidean distance.'
    ],
    answer: 2,
    explanation: 'An admissible heuristic h(n) &le; h*(n) never overestimates the true cost to reach the goal. Admissibility mathematically guarantees that the first path popped to the goal is optimal.'
  });

  // 35. Lesson 14 Summary & Key Takeaways
  slides.push({
    id: `${lesson.id}_sec26_summary`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Summary & Key Takeaways',
    badge: '🎓 Lesson Summary',
    title: 'Lesson 14 Summary & Key Takeaways',
    htmlContent: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; height: 100%; align-items: stretch;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>📐</span> Continuous &amp; C-Space
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">Obstacle inflation by robot radius converts complex polygon collisions into simple 0-radius point pathfinding in C_free.</p>
          </div>
          <div style="font-size: 0.68rem; color: #0284c7; font-weight: bold;">
            Key: Swept volume clearance
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #7c3aed; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>⭐</span> Discretization &amp; A*
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">Roadmaps (Visibility, Voronoi, Cell Decomposition) discretize space. A* min-heap priority queue evaluates f(n) = g + h to guarantee optimal paths.</p>
          </div>
          <div style="font-size: 0.68rem; color: #7c3aed; font-weight: bold;">
            Key: Admissible heuristics
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #10b981; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>🏎️</span> DWA &amp; Nav2 Stack
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">DWA samples velocity space within acceleration limits. Nav2 stack decouples BT mission logic, global routing, and 20 Hz /cmd_vel execution.</p>
          </div>
          <div style="font-size: 0.68rem; color: #10b981; font-weight: bold;">
            Key: 20 Hz critic scoring
          </div>
        </div>
      </div>
    `
  });
}
'''

def update_slide_parser():
    with open(SLIDE_PARSER_PATH, 'r') as f:
        content = f.read()

    # Find buildLesson14Slides definition
    start_pattern = r'function buildLesson14Slides\(doc, lesson, slides\) \{'
    start_match = re.search(start_pattern, content)
    if not start_match:
        print("ERROR: Could not find function buildLesson14Slides")
        return False

    start_idx = start_match.start()
    next_fn_idx = content.find('function buildLesson15Slides', start_idx)
    if next_fn_idx == -1:
        print("ERROR: Could not find function buildLesson15Slides")
        return False

    # Replace buildLesson14Slides
    new_content = content[:start_idx] + LESSON_14_CODE + '\n\n' + content[next_fn_idx:]

    with open(SLIDE_PARSER_PATH, 'w') as f:
        f.write(new_content)

    print("Successfully updated buildLesson14Slides in slideParser.js!")
    return True

if __name__ == "__main__":
    update_slide_parser()
