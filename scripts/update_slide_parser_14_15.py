#!/usr/bin/env python3
import re

SLIDE_PARSER_PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/utils/slideParser.js"

NEW_LESSON_14_CODE = """function buildLesson14Slides(doc, lesson, slides) {
  // 1. Navigation Problem Formulation
  slides.push({
    id: `${lesson.id}_sec1_nav_problem`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. Navigation Problem Formulation',
    badge: '🧭 Problem Statement',
    title: '1. Mobile Robot Navigation: Problem Formulation & Constraints',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏢</span><strong>Environment Geometry (W)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Physical warehouse racking columns, perimeter walls, and keep-out restricted zones define the 2D workspace boundaries.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Robot Geometry & Footprint</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Physical chassis length, width, wheel baseline, and payload overhang determine whether the robot can physically traverse an aisle.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Poses & Trajectory Algorithm</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Given Start Pose <code>(x_s, y_s, &theta;_s)</code> and Goal Pose <code>(x_g, y_g, &theta;_g)</code>, find a collision-free path that satisfies non-holonomic kinematic limits.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <div style="font-size: 0.78rem; font-weight: bold; color: #60a5fa; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>📌</span> Core Navigation Objectives
            </div>
            <ul style="font-size: 0.73rem; line-height: 1.45; color: #cbd5e1; margin: 0; padding-left: 1.1rem;">
              <li><strong>Collision Avoidance:</strong> Never strike static warehouse infrastructure or dynamic human co-workers.</li>
              <li><strong>Kinematic Feasibility:</strong> Respect differential-drive turning radius and acceleration limits.</li>
              <li><strong>Path Optimality:</strong> Minimize travel duration, energy expenditure, and sudden acceleration jerks.</li>
            </ul>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 Fundamental Paradigm:</strong> Global planning calculates the static macro route, while local controllers execute dynamic obstacle avoidance at 20 Hz.
          </div>
        </div>
      </div>
    `
  });

  // 2. Continuous Space Step 1: 2D Plane & Target Waypoint
  slides.push({
    id: `${lesson.id}_sec2_continuous_step1`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Continuous Space Step 1: 2D Plane & Goal',
    badge: '📐 Continuous Step 1 / 5',
    title: '2. Continuous Space Step 1: 2D Plane & Target Waypoint',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>Continuous Cartesian Coordinates</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The robot operates in continuous real-world space <code>(x, y) &isin; &real;&sup2;</code> with smooth infinite resolution rather than discrete grid cells.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏁</span><strong>Start and Goal Poses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The mission specifies an origin pose <code>Start (x_s, y_s)</code> and a target destination <code>Goal (x_g, y_g)</code> across the open floor.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📏</span><strong>Euclidean Vector Line</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In an empty obstacle-free universe, the optimal trajectory is simply a straight Euclidean line connecting start directly to goal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_continuous_rep_step1.png" alt="Continuous Space Step 1: Start and Goal" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Continuous Representation: Initial Cartesian 2D plane with Start and Goal waypoints
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Reality Check:</strong> Real warehouse environments are heavily populated with physical obstacles that invalidate straight-line paths.
          </div>
        </div>
      </div>
    `
  });

  // 3. Continuous Space Step 2: Obstacle Boundaries in Free Space
  slides.push({
    id: `${lesson.id}_sec3_continuous_step2`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Continuous Space Step 2: Obstacle Boundaries',
    badge: '📐 Continuous Step 2 / 5',
    title: '3. Continuous Space Step 2: Obstacle Boundaries in Free Space',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Geometric Obstacle Polygons</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pallets, shelving columns, and equipment are represented as geometric boundaries or polygons blocking portions of the 2D workspace.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚧</span><strong>Keep-Out Inadmissible Zones</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The workspace is bifurcated into free space <code>W_free</code> (where travel is permitted) and obstacle space <code>W_obs</code> (where robot entry is physically impossible).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Circumnavigation Necessity</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The path planning algorithm must now find a continuous curve that circumnavigates around all obstacle bodies without cutting through them.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_continuous_rep_step2.png" alt="Continuous Space Step 2: Obstacles" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Continuous Representation: Obstacle geometric bodies introduced between Start and Goal
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Challenge:</strong> A candidate 1D line path might navigate between obstacles, but what happens when we consider the robot's physical size?
          </div>
        </div>
      </div>
    `
  });

  // 4. Continuous Space Step 3: Robot Chassis Footprint Swept Volume
  slides.push({
    id: `${lesson.id}_sec4_continuous_step3`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Continuous Space Step 3: Swept Footprint',
    badge: '📐 Continuous Step 3 / 5',
    title: '4. Continuous Space Step 3: Swept Footprint Trajectory',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🤖</span><strong>Physical Robot Dimensions</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Robots are not infinitesimal points. An industrial AMR has width, length, and a circular circumscribed radius <code>r_robot</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Swept Footprint Volume</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">As the AMR drives forward along a path, its chassis sweeps out a continuous 2D ribbon corridor across the floor.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Centerline Fallacy</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Even if the robot's mathematical center point stays outside an obstacle, the outer corners of its physical bumper can easily strike nearby walls.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_continuous_rep_step3.png" alt="Continuous Space Step 3: Swept Volume" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Continuous Representation: Tracing robot physical chassis geometry along candidate path
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Critical Observation:</strong> Notice how the robot footprint sweeps perilously close to obstacle boundaries along narrow corridor segments.
          </div>
        </div>
      </div>
    `
  });

  // 5. Continuous Space Step 4: Clearance Failure & Chassis Collision
  slides.push({
    id: `${lesson.id}_sec5_continuous_step4`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Continuous Space Step 4: Chassis Collision',
    badge: '⚠️ Collision Dilemma',
    title: '5. Continuous Space Step 4: Clearance Failure & Chassis Collision',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #ef4444;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #f87171;"><span>💥</span><strong>Chassis Collision Inevitability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">As the robot moves forward, it strikes the obstacle because there is insufficient physical clearance between the path centerline and obstacle boundary.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚫</span><strong>Zero Lateral Clearance</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">When the distance from path centerline to obstacle is strictly less than <code>r_robot</code>, hardware collision is mathematically guaranteed.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Emergency Stop Triggered</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In physical deployments, collision triggers hardware E-Stops, damages cargo pallets, and halts warehouse logistics pipelines.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_continuous_rep_collision.png" alt="Continuous Space Step 4: Collision" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #fca5a5; text-align: center; font-family: monospace;">
              Collision Event: As AMR moves forward, insufficient clearance causes chassis collision
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #ef4444;">
            <strong>⚠️ The Root Cause:</strong> The path planner ignored the physical spatial radius of the AMR during geometric route calculation.
          </div>
        </div>
      </div>
    `
  });

  // 6. Continuous Space Step 5: Distance Clearance Condition
  slides.push({
    id: `${lesson.id}_sec6_continuous_step5`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Continuous Space Step 5: Clearance Condition',
    badge: '✅ Allowable Path',
    title: '6. Continuous Space Step 5: Distance Clearance Condition',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #34d399;"><span>📏</span><strong>Distance Clearance Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">To guarantee collision-free travel, the planner must enforce: <code>Distance(Path, Obstacle) &gt; r_robot</code> everywhere along the trajectory.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Allowable Path Rerouting</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The trajectory is diverted through wider passages where lateral clearance comfortably accommodates the full chassis swept envelope.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>Computational Burden</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Continuously calculating distance checks between a moving polygon footprint and static obstacles at every point is computationally prohibitive.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_continuous_rep_allowable_path.png" alt="Continuous Space Step 5: Allowable Path" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #86efac; text-align: center; font-family: monospace;">
              Allowable Path: Verifying distance around path &gt; robot radius finds safe allowable route
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 The Next Step:</strong> How can we mathematically eliminate complex polygon checks? By inflating the obstacles into Configuration Space!
          </div>
        </div>
      </div>
    `
  });

  // 7. Configuration Space Step 1: Obstacle Inflation by Robot Radius
  slides.push({
    id: `${lesson.id}_sec7_cspace_step1`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. C-Space Step 1: Obstacle Inflation',
    badge: '🔄 C-Space Step 1 / 2',
    title: '7. Configuration Space Step 1: Obstacle Inflation by Robot Radius',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎈</span><strong>Minkowski Sum Expansion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Every physical obstacle in the workspace is inflated outward by the robot radius <code>r_robot</code> in all directions: <code>C_obs = Obstacle &oplus; Robot_Footprint</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Geometric Buffer Creation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The inflation boundary acts as an impenetrable safety cushion around racking pillars, pallets, and walls, accounting for AMR physical dimensions.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>✨</span><strong>Algorithmic Simplification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">By transferring the robot's physical size directly into the obstacles, path planning algorithms no longer need to check chassis polygon collisions!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_cspace_obstacle_inflation.png" alt="C-Space Step 1: Obstacle Inflation" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #d8b4fe; text-align: center; font-family: monospace;">
              Configuration Space: Inflating around workspace obstacles with radius of robot
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #a855f7;">
            <strong>💡 The Core Insight:</strong> In C-space, the robot can now be treated as a single dimensionless point mass!
          </div>
        </div>
      </div>
    `
  });

  // 8. Configuration Space Step 2: Point AMR in C_free vs C_obs
  slides.push({
    id: `${lesson.id}_sec8_cspace_step2`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. C-Space Step 2: Point AMR in C_free vs C_obs',
    badge: '🔄 C-Space Step 2 / 2',
    title: '8. Configuration Space Step 2: Point AMR in C_free vs C_obs',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>Point Mass Representation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">With obstacles inflated by <code>r_robot</code>, the robot shrinks to an infinitesimal point. Any path the point can traverse is guaranteed collision-free for the physical AMR.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🟩</span><strong>C_free (Admissible Set)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The set of all robot poses where the AMR does not collide with obstacles: <code>C_free = C \\ C_obs</code>. All valid trajectory waypoints reside here.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #ef4444;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #f87171;"><span>🟥</span><strong>C_obs (Inadmissible Set)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The set of poses where the robot intersects an obstacle. The planner treats <code>C_obs</code> as an impenetrable geometric barrier.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_cspace_cfree_cobs.png" alt="C-Space Step 2: C_free and C_obs" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #d8b4fe; text-align: center; font-family: monospace;">
              C-Space Partition: Workspace partitioned into point-traversable C_free and obstacle C_obs
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #a855f7;">
            <strong>💡 Modern Implementation:</strong> In ROS 2 Nav2, C-space obstacle inflation is implemented dynamically via Costmap 2D!
          </div>
        </div>
      </div>
    `
  });

  // 9. Costmap 2D Architecture: The 3-Tier Layered Representation
  slides.push({
    id: `${lesson.id}_sec9_costmap_layers`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '9. Costmap 2D Architecture',
    badge: '🧱 Layered Grid',
    title: '9. Costmap 2D Architecture: The 3-Tier Layered Representation',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Static Layer (SLAM Map Baseline)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Ingests pre-computed SLAM <code>warehouse_map.yaml</code>. Provides permanent static walls, columns, and corridors. Remains fixed during runtime.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Obstacle Layer (Live Sensor Streams)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Subscribes to live <code>/scan</code> (2D LiDAR). Uses raycasting to dynamically mark unexpected obstacles (forklifts, crates) and clear free space.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Inflation Layer (Safety Clearance Buffer)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Propagates obstacle costs outward through an exponential decay function, generating a continuous potential field that repels the robot from hazards.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #fbbf24; margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>🥞</span> Costmap Plugin Layer Stacking
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem;">
              <div style="background: rgba(168, 85, 247, 0.2); border: 1px solid #a855f7; border-radius: 4px; padding: 0.3rem 0.5rem; font-size: 0.72rem; color: #e9d5ff;">
                <strong>Top:</strong> Inflation Layer (Cost gradient field [1 &ndash; 253])
              </div>
              <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; border-radius: 4px; padding: 0.3rem 0.5rem; font-size: 0.72rem; color: #fecaca;">
                <strong>Middle:</strong> Obstacle Layer (Live dynamic raycasting [254])
              </div>
              <div style="background: rgba(59, 130, 246, 0.2); border: 1px solid #3b82f6; border-radius: 4px; padding: 0.3rem 0.5rem; font-size: 0.72rem; color: #bfdbfe;">
                <strong>Bottom:</strong> Static Map Layer (SLAM .yaml / .pgm [0 or 254])
              </div>
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Layer Combination:</strong> Nav2 uses the <em>Maximum Cost Master</em> update mode—the resulting cost of a cell is the maximum cost across all active layers!
          </div>
        </div>
      </div>
    `
  });

  // 10. Inflation Layer Mathematics: Exponential Cost Decay & Safety Radii
  slides.push({
    id: `${lesson.id}_sec10_inflation_math`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '10. Inflation Layer Mathematics',
    badge: '📐 Inflation Math',
    title: '10. Inflation Layer Mathematics: Exponential Cost Decay & Safety Radii',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔴</span><strong>Lethal Cost (254) & Inscribed (253)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Cells inside the physical obstacle are lethal (254). Cells within <code>r_inscribed</code> are assigned cost 253—guaranteeing collision if entered.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📉</span><strong>Exponential Cost Decay Zone [1 &ndash; 252]</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Beyond <code>r_inscribed</code> up to <code>inflation_radius</code>, cost drops exponentially: <code>Cost(d) = 252 &middot; e^(-&alpha;(d - r_inscribed))</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🟢</span><strong>Free Space (0)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Outside <code>inflation_radius</code>, cost drops to zero. Planners strongly prefer zero-cost corridors away from walls.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <div style="font-family: monospace; font-size: 0.74rem; color: #fbbf24; text-align: center; margin-bottom: 0.3rem;">
              Cost(d) = 252 &times; exp( -&alpha; &times; (d - r_inscribed) )
            </div>
            <div style="font-size: 0.71rem; line-height: 1.4; color: #94a3b8;">
              &bull; <code>&alpha;</code> = <code>cost_scaling_factor</code> (higher = steeper cliff drop)<br>
              &bull; <code>d</code> = Euclidean distance from cell center to nearest obstacle<br>
              &bull; <code>r_inscribed</code> = Inscribed circle radius of AMR chassis (e.g. 0.22 m)
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>⚖️ Tuning Rule:</strong> In narrow 1.0 m warehouse aisles, set <code>cost_scaling_factor: 3.0</code> to allow passage through doors without clipping racks!
          </div>
        </div>
      </div>
    `
  });

  // 11. Global vs. Local Costmap Configuration: Comparative Matrix
  slides.push({
    id: `${lesson.id}_sec11_costmap_comparison`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '11. Global vs. Local Costmap',
    badge: '⚖️ Costmap Matrix',
    title: '11. Global vs. Local Costmap Configuration: Comparative Matrix',
    htmlContent: `
      <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
        <table class="l03-table" style="width: 100%; border-collapse: collapse; font-size: 0.72rem;">
          <thead>
            <tr style="background: rgba(30, 41, 59, 0.8); color: #fbbf24; border-bottom: 2px solid #eab308;">
              <th style="padding: 0.3rem 0.5rem; text-align: left;">Architectural Dimension</th>
              <th style="padding: 0.3rem 0.5rem; text-align: left;">Global Costmap (Macro Planner)</th>
              <th style="padding: 0.3rem 0.5rem; text-align: left;">Local Costmap (Micro Controller)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.3rem 0.5rem; font-weight: bold; color: #f8fafc;">Tracking Global Frame</td>
              <td style="padding: 0.3rem 0.5rem;"><code>map</code> (World Fixed Coordinate System)</td>
              <td style="padding: 0.3rem 0.5rem;"><code>odom</code> (Continuous Smooth Odometry)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.3rem 0.5rem; font-weight: bold; color: #f8fafc;">Grid Footprint Dimensions</td>
              <td style="padding: 0.3rem 0.5rem;">Full warehouse map bounding box (e.g., 50m &times; 50m)</td>
              <td style="padding: 0.3rem 0.5rem;">Rolling window centered on robot (e.g., 3.0m &times; 3.0m)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.3rem 0.5rem; font-weight: bold; color: #f8fafc;">Update / Publish Rate</td>
              <td style="padding: 0.3rem 0.5rem;">1.0 &ndash; 2.0 Hz (Low frequency compute savings)</td>
              <td style="padding: 0.3rem 0.5rem;">10.0 &ndash; 20.0 Hz (High frequency reflex reaction)</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.3rem 0.5rem; font-weight: bold; color: #f8fafc;">Primary Subscribing Client</td>
              <td style="padding: 0.3rem 0.5rem;"><strong>Planner Server</strong> (A* / NavFn global path)</td>
              <td style="padding: 0.3rem 0.5rem;"><strong>Controller Server</strong> (DWB / RPP cmd_vel output)</td>
            </tr>
            <tr>
              <td style="padding: 0.3rem 0.5rem; font-weight: bold; color: #f8fafc;">Storage Representation</td>
              <td style="padding: 0.3rem 0.5rem;">Static 2D Grid with pre-baked wall boundaries</td>
              <td style="padding: 0.3rem 0.5rem;">Dynamic Ring Buffer cleared and refreshed live</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
        <strong>💡 Key Insight:</strong> The local costmap operates in <code>odom</code> to prevent discrete AMCL localization jumps from corrupting high-speed velocity commands!
      </div>
    `
  });

  // 12. Nav2 System Architecture: Separation of Planning, Control & Recovery
  slides.push({
    id: `${lesson.id}_sec12_nav2_arch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '12. Nav2 Server Architecture',
    badge: '🧠 Nav2 Architecture',
    title: '12. Nav2 System Architecture: Separation of Planning, Control & Recovery',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌳</span><strong>BT Navigator (Master Orchestrator)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Evaluates behavior tree XML scripts to coordinate planning, trajectory following, progress monitoring, and cascading recovery actions.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗺️</span><strong>Planner Server (Global Route Search)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Runs A* or NavFn on global costmap to compute collision-free routes from current pose to goal destination at low frequency (1 Hz).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Controller Server (Local Path Tracking)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Runs DWB or RPP on rolling local costmap at 20 Hz to output physical velocity commands (<code>/cmd_vel</code>) avoiding dynamic obstacles.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Recoveries Server (Fault Recovery Pipeline)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Executes emergency recovery behaviors when stuck: costmap clearing, in-place rotation (spin), backing up, or waiting for dynamic obstacles to clear.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Managed Lifecycle Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">All Nav2 servers are ROS 2 Lifecycle Nodes orchestrated by <code>lifecycle_manager</code>. They transition systematically: Unconfigured &rarr; Inactive &rarr; Active.</p>
          </div>
          <div class="l05-banner-intro" style="font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 Modularity:</strong> Decoupled client-server action architecture allows hot-swapping global planners or local controllers without restarting the robot.
          </div>
        </div>
      </div>
    `
  });

  // 13. Production Tuning: nav2_params.yaml Costmap Parameters
  slides.push({
    id: `${lesson.id}_sec13_costmap_yaml`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '13. Production Tuning: Costmap YAML',
    badge: '⚙️ Costmap Tuning',
    title: '13. Production Tuning: nav2_params.yaml Costmap Parameters',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>robot_radius vs footprint</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Use <code>robot_radius: 0.22</code> for circular bases. For rectangular AMRs, define polygon vertices: <code>[[-0.25, -0.2], [0.25, -0.2], [0.25, 0.2], [-0.25, 0.2]]</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>inflation_radius & scaling_factor</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>inflation_radius: 0.55</code> defines the outer limit of decay. <code>cost_scaling_factor: 3.0</code> controls how steeply cost drops away from obstacles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>raytrace_min_range & max_range</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Set <code>raytrace_max_range: 3.0</code> to prevent stale outdoor laser returns from corrupting local indoor costmaps.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nav2_params.yaml</span><strong>Costmap Layer Configuration</strong></div>
            <pre><code class="language-yaml">local_costmap:
  local_costmap:
    ros__parameters:
      update_frequency: 10.0
      publish_frequency: 5.0
      global_frame: odom
      robot_base_frame: base_footprint
      rolling_window: true
      width: 3
      height: 3
      resolution: 0.05
      robot_radius: 0.22
      plugins: ["obstacle_layer", "inflation_layer"]
      inflation_layer:
        plugin: "nav2_costmap_2d::InflationLayer"
        cost_scaling_factor: 3.0
        inflation_radius: 0.55</code></pre>
          </div>
        </div>
      </div>
    `
  });
}
"""

NEW_LESSON_15_CODE = """function buildLesson15Slides(doc, lesson, slides) {
  // 1. Path Planning Taxonomy & Roadmap Hierarchy
  slides.push({
    id: `${lesson.id}_sec1_roadmap_taxonomy`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. Path Planning Roadmap Taxonomy',
    badge: '🗺️ Algorithm Hierarchy',
    title: '1. Path Planning Roadmap: Algorithmic Taxonomy & Hierarchy',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>Continuous Roadmaps</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Construct connected line networks in continuous space. Key approaches: <strong>Visibility Graphs</strong> (shortest path) and <strong>Voronoi Diagrams</strong> (maximum clearance).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔲</span><strong>Cell Decomposition</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Discretize space into polygons: <strong>Exact Cell Decomposition</strong> (trapezoids/triangles) and <strong>Approximate Cell Decomposition</strong> (Quadtree recursive subdivision).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⭐</span><strong>Discrete Graph Search</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Once roadmaps or grids are formed, <strong>A* Search</strong> and Dijkstra traverse connectivity graphs to find optimal routes.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_roadmap_algorithms.png" alt="Path Planning Roadmap Taxonomy" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Path Planning Algorithms: Roadmaps (Visibility/Voronoi), Cell Decomposition & A* Search
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Pedagogical Progression:</strong> We study each algorithm's geometric construction, trade-offs, and industrial application.
          </div>
        </div>
      </div>
    `
  });

  // 2. Visibility Graph Step 1: Interconnecting Visible Obstacle Vertices
  slides.push({
    id: `${lesson.id}_sec2_visibility_step1`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. Visibility Graph Step 1: Vertex Connection',
    badge: '👁️ Visibility Step 1 / 2',
    title: '2. Visibility Graph Step 1: Interconnecting Visible Obstacle Vertices',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>👁️</span><strong>Line-of-Sight Visibility</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The Visibility Graph links the Start node, all obstacle polygon vertices, and the Goal node to each other wherever a straight unobstructed line exists.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚫</span><strong>Collision Occlusion Pruning</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Any connection that passes through an obstacle interior or intersects an obstacle edge is discarded as an invalid connection.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🕸️</span><strong>Roadmap Graph Formation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The resulting network connects every node to all other nodes visible from its physical coordinates, forming an undirected roadmap graph.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_visibility_graph_construction.png" alt="Visibility Graph Construction" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Visibility Graph: Connecting start, goal, and all mutually visible obstacle vertices
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 Construction Rule:</strong> An edge exists between vertex A and vertex B if and only if segment AB lies entirely within free space.
          </div>
        </div>
      </div>
    `
  });

  // 3. Visibility Graph Step 2: Shortest Path Graph Search
  slides.push({
    id: `${lesson.id}_sec3_visibility_step2`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. Visibility Graph Step 2: Shortest Path',
    badge: '👁️ Visibility Step 2 / 2',
    title: '3. Visibility Graph Step 2: Shortest Path Graph Search',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #34d399;"><span>🏆</span><strong>Mathematically Shortest Path</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Running A* or Dijkstra search on the visibility graph finds the <strong>shortest possible route</strong> in continuous 2D Euclidean space from start to goal.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #f59e0b;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #fbbf24;"><span>⚠️</span><strong>The Corner-Grazing Trade-off</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Because the shortest path connects obstacle vertices directly, it grazes dangerously close to obstacle corners with zero clearance margin.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Industrial Implication</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Requires significant obstacle inflation buffers before running search to prevent high-speed AMR wheels from scraping warehouse pallet corners.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_visibility_graph_shortest_path.png" alt="Shortest Path in Visibility Graph" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #86efac; text-align: center; font-family: monospace;">
              Shortest Path: Graph search identifies the shortest Euclidean path hugging obstacle corners
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Alternative Philosophy:</strong> What if we want maximum clearance instead of minimum distance? We use Voronoi Diagrams!
          </div>
        </div>
      </div>
    `
  });

  // 4. Voronoi Diagram: Free-Space Bisectors & Maximum Obstacle Clearance
  slides.push({
    id: `${lesson.id}_sec4_voronoi`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. Voronoi Diagram: Maximum Clearance',
    badge: '🛡️ Maximum Clearance',
    title: '4. Voronoi Diagram: Free-Space Bisectors & Maximum Obstacle Clearance',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚖️</span><strong>Equidistant Free-Space Bisectors</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">A Voronoi Diagram is a graph whose edges bisect the free space midway between obstacles. Every edge lies strictly equidistant from surrounding hazards.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #34d399;"><span>🛡️</span><strong>Maximum Clearance Guarantee</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Unlike visibility graphs that hug walls, Voronoi diagrams <strong>maximize clearance</strong>, guiding the robot down the safest center aisle of warehouse corridors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📈</span><strong>Sub-optimal Path Length</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The path is longer than the visibility graph route, but it provides the largest margin of safety against sensor noise and dynamic obstacles.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_voronoi_diagram_clearance.png" alt="Voronoi Diagram Clearance" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #86efac; text-align: center; font-family: monospace;">
              Voronoi Diagram: Edges lie equidistant from obstacles with greatest possible clearance
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Modern Use:</strong> Nav2's Smac Planner uses Voronoi fields in its heuristic to pull paths naturally toward corridor centerlines!
          </div>
        </div>
      </div>
    `
  });

  // 5. Exact Cell Decomposition: Trapezoidal & Triangular Slicing
  slides.push({
    id: `${lesson.id}_sec5_exact_cell_decomp`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Exact Cell Decomposition',
    badge: '📐 Exact Decomposition',
    title: '5. Exact Cell Decomposition: Trapezoidal & Triangular Slicing',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>✂️</span><strong>Vertical Line Segment Projection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Exact cell decomposition divides free space into non-overlapping cells by projecting vertical line segments up and down from every obstacle vertex.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Convex Polygon Partitioning</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Slices free space into simple trapezoids and triangles. Because each cell is convex, moving between any two points inside a cell is guaranteed collision-free!</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔗</span><strong>Adjacency Channel Graph</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Nodes are placed at cell centroids and boundary midpoints. Searching this graph yields an ordered sequence of channel portals from start to goal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_exact_cell_decomposition.png" alt="Exact Cell Decomposition" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #d8b4fe; text-align: center; font-family: monospace;">
              Exact Cell Decomposition: Vertical lines at obstacle vertices partition space into trapezoids
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #a855f7;">
            <strong>💡 Completeness:</strong> Exact cell decomposition is mathematically complete—if a valid path exists in free space, it is guaranteed to be found.
          </div>
        </div>
      </div>
    `
  });

  // 6. Approximate Cell Decomposition: Recursive Quadtree Subdivision
  slides.push({
    id: `${lesson.id}_sec6_approx_cell_decomp`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Approximate Cell Decomposition',
    badge: '🔲 Quadtree Decomposition',
    title: '6. Approximate Cell Decomposition: Recursive Quadtree Subdivision',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>4️⃣</span><strong>Four Quadrant Decomposition</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Decomposes space recursively into four quadrants. Each quadrant is classified into one of three states: <strong>Empty</strong>, <strong>Full</strong>, or <strong>Mixed</strong>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔀</span><strong>The "Mixed" Cell Label</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Represents cells that contain both obstacle portions and free space. If an all-empty path cannot be found, mixed cells are quartered again.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌲</span><strong>Hierarchical Quadtree Storage</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Large open warehouse areas remain as single large cells, while fine detail is allocated only around tight rack corners—saving massive memory.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_approx_cell_decomposition_iterations.png" alt="Approx Cell Decomposition Quadtree" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Approximate Cell Decomposition: Iterative recursive quadtree refinement revealing free channels
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Convergence:</strong> Through successive iterations, more free cells emerge until a connected sequence links Start to Goal.
          </div>
        </div>
      </div>
    `
  });

  // 7. Graph Search: The A* Search Engine & Heuristic Function
  slides.push({
    id: `${lesson.id}_sec7_astar_search`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. Graph Search: A* Algorithm',
    badge: '⭐ A* Search Engine',
    title: '7. Graph Search: The A* Search Engine & Heuristic Function',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>The Evaluation Function f(n)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>f(n) = g(n) + h(n)</code> balances the known past cost against estimated future progress toward the goal destination.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📏</span><strong>g(n): Exact Path Cost</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The exact accumulated travel cost from Start to the current node <code>n</code>, factoring in traversal distance and costmap obstacle inflation penalties.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>h(n): Admissible Heuristic</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Estimated distance from node <code>n</code> to Goal. If <code>h(n) &le; true cost</code> (e.g. straight Euclidean distance), A* is mathematically guaranteed optimal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <div style="font-family: monospace; font-size: 0.82rem; color: #fbbf24; text-align: center; margin-bottom: 0.3rem;">
              f(n) = g(n) + h(n)
            </div>
            <div style="font-size: 0.71rem; line-height: 1.45; color: #cbd5e1;">
              <strong>1. Open Priority Queue:</strong> Nodes sorted by lowest <code>f(n)</code>.<br>
              <strong>2. Directed Expansion:</strong> Heuristic pulls search directly toward target, avoiding blind radial flood fill.<br>
              <strong>3. Nav2 Implementations:</strong> <code>NavFn</code> (Dijkstra / A*) and <code>SmacPlanner2D</code> (highly optimized modern A*).
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Global vs Local:</strong> A* solves the global path at 1 Hz. But to follow it at 20 Hz without hitting dynamic obstacles, we need local planners!
          </div>
        </div>
      </div>
    `
  });

  // 8. Dynamic Window Approach (DWA): Velocity Sampling & Forward Rollout
  slides.push({
    id: `${lesson.id}_sec8_dwa_rollout`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. DWA Local Planner Mechanics',
    badge: '⏱️ 20 Hz Local Controller',
    title: '8. Dynamic Window Approach (DWA): Velocity Sampling & Forward Rollout',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Sample Velocities (v, &omega;)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Discretely samples candidate linear velocities <code>v</code> and angular velocities <code>&omega;</code> reachable within the dynamic acceleration window.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Forward Simulation Rollout</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Numerically rolls out candidate trajectories forward over a short time horizon (e.g. 1.5s) to predict future poses assuming velocity is held constant.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Score Trajectories & Execute</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Discards colliding trajectories. Evaluates remaining arcs with critics, picks the highest-scoring <code>(v, &omega;)</code>, sends to motors, and repeats at 20 Hz.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_dwa_local_planner_rollout.png" alt="DWA Local Planner Rollout" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              DWA Rollout: Forward simulation trajectories evaluated against dynamic obstacles
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 The DWA Loop:</strong> Sample &rarr; Forward Rollout &rarr; Evaluate Critics &rarr; Send Highest Score Velocity &rarr; Repeat at 20 Hz.
          </div>
        </div>
      </div>
    `
  });

  // 9. Nav2 DWB Controller: Forward Simulation & Critic Scoring Matrix
  slides.push({
    id: `${lesson.id}_sec9_dwb_critics`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '9. Nav2 DWB Controller',
    badge: '🎯 DWB Trajectory Scoring',
    title: '9. Nav2 DWB Controller: Forward Simulation & Critic Scoring Matrix',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Modular Critic Plugins</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">DWB modernizes ROS 1 DWA by breaking trajectory evaluation into modular, independently weighted critic plugins in <code>nav2_params.yaml</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>Linear Weighted Sum</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>Total Score = &Sigma; (Weight_i &times; Score_i)</code>. Any trajectory that touches an obstacle cell in the local costmap receives an immediate score of &infin; (illegal).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Non-Holonomic Feasibility</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Rollout trajectories obey differential drive kinematic limits: <code>v_y = 0</code> (no sideways crab crawl) and respect maximum wheel acceleration limits.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #fbbf24; margin-bottom: 0.3rem;">
              Critical DWB Critic Components
            </div>
            <ul style="font-size: 0.71rem; line-height: 1.4; color: #cbd5e1; margin: 0; padding-left: 1.1rem;">
              <li><code>BaseObstacle</code>: Penalizes proximity to obstacles (clearance).</li>
              <li><code>PathAlign</code>: Heading alignment with global path tangent.</li>
              <li><code>GoalAlign</code>: Heading alignment directly toward goal.</li>
              <li><code>PathDist</code>: Cross-track distance away from global path.</li>
              <li><code>RotateToGoal</code>: Enforces in-place rotation at destination.</li>
            </ul>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Tuning Balance:</strong> If <code>PathDist</code> is too high, the robot refuses to steer around dynamic obstacles. If too low, it wanders off path!
          </div>
        </div>
      </div>
    `
  });

  // 10. DWB Critic Scoring Matrix: Balancing Clearance, Speed & Goal Accuracy
  slides.push({
    id: `${lesson.id}_sec10_dwb_tuning_matrix`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '10. DWB Critic Matrix',
    badge: '⚖️ DWB Critic Matrix',
    title: '10. DWB Critic Scoring Matrix: Balancing Clearance, Speed & Goal Accuracy',
    htmlContent: `
      <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
        <table class="l03-table" style="width: 100%; border-collapse: collapse; font-size: 0.71rem;">
          <thead>
            <tr style="background: rgba(30, 41, 59, 0.8); color: #fbbf24; border-bottom: 2px solid #eab308;">
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 18%;">Critic Plugin</th>
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 12%;">Default</th>
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 40%;">Behavioral Metric</th>
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 30%;">Tuning Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>BaseObstacle</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>0.02</code></td>
              <td style="padding: 0.25rem 0.4rem;">Penalizes trajectories grazing close to costmap obstacles.</td>
              <td style="padding: 0.25rem 0.4rem;">Increase if robot clips rack corners in turns.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>PathAlign</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>32.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Keeps robot heading aligned with global path direction.</td>
              <td style="padding: 0.25rem 0.4rem;">High weight ensures straight aisle travel.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>GoalAlign</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>24.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Orients robot heading directly towards goal destination.</td>
              <td style="padding: 0.25rem 0.4rem;">Prevents overshooting the target waypoint.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>PathDist</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>32.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Penalizes cross-track distance away from global path.</td>
              <td style="padding: 0.25rem 0.4rem;">Keeps robot glued to corridor centerlines.</td>
            </tr>
            <tr>
              <td style="padding: 0.25rem 0.4rem;"><code>RotateToGoal</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>32.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Enforces final in-place rotation when within XY tolerance.</td>
              <td style="padding: 0.25rem 0.4rem;">Crucial for docking into pallet stands.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
        <strong>⚖️ Golden Rule:</strong> Never change multiple critic weights simultaneously! Adjust one weight by 2x, test trajectory smoothness, and verify oscillation stability.
      </div>
    `
  });

  // 11. Regulated Pure Pursuit (RPP): Deterministic Industrial Path Tracking
  slides.push({
    id: `${lesson.id}_sec11_rpp_controller`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '11. Regulated Pure Pursuit (RPP)',
    badge: '📐 Pure Pursuit',
    title: '11. Regulated Pure Pursuit (RPP): Deterministic Industrial Path Tracking',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Geometric Lookahead Arc</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">RPP projects an imaginary anchor point along the global path at distance <code>L_lookahead</code>. It calculates the exact geometric curvature arc required to steer toward it.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📉</span><strong>Automatic Curvature Deceleration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Slows down automatically in sharp corners proportional to path curvature radius, preventing AMR chassis tipping or wheel skid under load.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Industrial Predictability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">DWB can exhibit exploratory swerves. RPP produces perfectly predictable, repeatable train-track paths preferred in commercial logistics.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nav2_params.yaml</span><strong>RPP Configuration Snippet</strong></div>
            <pre><code class="language-yaml">controller_server:
  ros__parameters:
    FollowPath:
      plugin: "nav2_regulated_pure_pursuit_controller::RegulatedPurePursuitController"
      desired_linear_vel: 0.5
      lookahead_dist: 0.6
      min_lookahead_dist: 0.3
      max_lookahead_dist: 0.9
      lookahead_time: 1.5
      use_velocity_scaled_lookahead_dist: true
      use_regulated_linear_velocity_scaling: true
      regulated_linear_scaling_min_radius: 0.9
      use_cost_regulated_linear_velocity_scaling: true</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 12. Production Tuning: Controller Server nav2_params.yaml Parameter Matrix
  slides.push({
    id: `${lesson.id}_sec12_controller_params`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '12. Controller Server Matrix',
    badge: '⚙️ Controller Tuning',
    title: '12. Production Tuning: Controller Server nav2_params.yaml Matrix',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>controller_frequency: 20.0 Hz</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Controls the frequency of the velocity loop. 20 Hz provides rapid reactive collision avoidance while maintaining low CPU load.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Goal Checker Tolerances</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>xy_goal_tolerance: 0.15</code> (15cm) and <code>yaw_goal_tolerance: 0.10</code> (~5.7&deg;) define acceptable destination completion bounds.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Progress Checker Timeouts</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>required_movement_radius: 0.2m</code> within <code>movement_time_allowance: 10.0s</code> triggers recovery behaviors if the robot gets trapped.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nav2_params.yaml</span><strong>Controller Server Core Parameters</strong></div>
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
      yaw_goal_tolerance: 0.10</code></pre>
          </div>
        </div>
      </div>
    `
  });
}
"""

def replace_functions():
    with open(SLIDE_PARSER_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace buildLesson14Slides
    pattern14 = r"function buildLesson14Slides\(doc, lesson, slides\) \{[\s\S]*?\n\}"
    if not re.search(pattern14, content):
        print("ERROR: could not find buildLesson14Slides")
        return
    content = re.sub(pattern14, NEW_LESSON_14_CODE.strip(), content, count=1)

    # Replace buildLesson15Slides
    pattern15 = r"function buildLesson15Slides\(doc, lesson, slides\) \{[\s\S]*?\n\}"
    if not re.search(pattern15, content):
        print("ERROR: could not find buildLesson15Slides")
        return
    content = re.sub(pattern15, NEW_LESSON_15_CODE.strip(), content, count=1)

    with open(SLIDE_PARSER_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully replaced buildLesson14Slides and buildLesson15Slides in slideParser.js!")

if __name__ == "__main__":
    replace_functions()
