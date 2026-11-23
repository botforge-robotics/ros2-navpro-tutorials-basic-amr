#!/usr/bin/env python3
import re
import sys

SLIDE_PARSER_PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/utils/slideParser.js"

with open(SLIDE_PARSER_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Build updated buildLesson13Slides
new_build_lesson_13 = '''function buildLesson13Slides(doc, lesson, slides) {
  // 1. Part I Section Break: Localization (Clean Title Slide)
  slides.push({
    id: `${lesson.id}_sec_title_localization`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part I',
    badge: '📍 Part I',
    title: 'Localization',
    titleClass: 'text-localization',
    description: 'Estimating the robot pose relative to a known environmental map using sensor observations and wheel odometry.'
  });

  // 2. Localization Definition & Problem Statement (Slide 119)
  slides.push({
    id: `${lesson.id}_sec_localization_definition`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Localization Definition',
    badge: '📍 Core Definition',
    title: 'Mobile Robot Localization: Problem Statement',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>❓</span><strong>The Fundamental Question</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;"><em>"Where is the robot relative to the world coordinate frame?"</em> Given a static environment map <code>m</code> and sensor readings <code>z_{1:t}</code>, compute pose <code>(x, y, &theta;) &isin; SE(2)</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔄</span><strong>Odometry vs. Perception Fusion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Wheel encoders measure motion rapidly at 50 Hz but suffer from cumulative integration drift. Exteroceptive sensors (2D LiDAR) correct this drift against pre-mapped walls.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Belief Probability Distribution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Because sensors and actuators contain physical noise, the robot maintains a belief distribution <code>bel(x_t) = p(x_t | z_{1:t}, u_{1:t})</code> rather than a single deterministic coordinate.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/localization_concept_pose_estimation.png" alt="Robot Localization in Given Map" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Localization: Estimate robot pose (x, y, &theta;) in the pre-mapped environment
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Ground Truth:</strong> Without accurate localization, all downstream Nav2 costmap alignment and trajectory rollouts immediately fail.
          </div>
        </div>
      </div>
    `
  });

  // 3. Different Types of Localization Algorithms (Slide 125)
  slides.push({
    id: `${lesson.id}_sec_localization_algorithms`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Localization Algorithms',
    badge: '🤖 Localization Paradigms',
    title: 'Different Types of Localization Algorithms',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>1️⃣</span><strong>Extended Kalman Filter (EKF Localization)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Represents pose as a unimodal Gaussian belief <code>N(&mu;, &Sigma;)</code>. Linearizes non-linear motion models using Taylor Jacobians. Fast &amp; efficient, but fails under multimodal ambiguity.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>2️⃣</span><strong>Markov Localization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Discretizes continuous state space into a 3D probabilistic lattice grid <code>(x, y, &theta;)</code>. Evaluates recursive Bayesian updates across all grid cells. Capable of global localization.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>3️⃣</span><strong>Grid Localization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">A variant of Markov localization storing probabilities in spatial histogram cells. High resolution demands extreme memory; coarse resolution introduces significant discretization errors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.8rem; color: #10b981;"><span>4️⃣</span><strong>Monte Carlo Localization (MCL / Particle Filter)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Represents arbitrary multimodal probability distributions using a cloud of discrete particles. <strong>AMCL</strong> dynamically adapts particle count (KLD sampling) to balance accuracy and CPU load.</p>
          </div>
        </div>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.45rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
        <strong>🏆 Industry Standard:</strong> ROS 2 Nav2 standardizes on <strong>AMCL</strong> (Adaptive Monte Carlo Localization) for robust 2D LiDAR warehouse localization.
      </div>
    `
  });

  // 4. AMCL Measurement Representation (Slide 129)
  slides.push({
    id: `${lesson.id}_sec_amcl_measurement_rep`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'AMCL Measurement Model',
    badge: '📡 Measurement Model',
    title: 'Measurement Representation: LiDAR Beam Model & Raycasting',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📡</span><strong>LiDAR Raycast Simulation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">For each candidate particle pose, AMCL simulates laser range returns <code>z_t^{k*}</code> by casting virtual rays through the occupancy grid map until hitting occupied cells.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚖️</span><strong>Likelihood Weighting p(z_t | x_t, m)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">AMCL compares the actual physical range <code>z_t^k</code> against expected range <code>z_t^{k*}</code> using a Gaussian likelihood function. Particles aligning with real walls get high weights.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🛡️</span><strong>Sensor Noise Robustness</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The measurement model accounts for four noise phenomena: Gaussian beam error, unexpected dynamic obstacles (humans), max-range specular dropouts, and random sensor noise.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_measurement_representation.png" alt="AMCL Measurement Representation" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              AMCL Measurement Representation: Virtual beam raycast matching map walls to evaluate likelihood
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Likelihood Match:</strong> When physical laser ranges match simulated raycasts across all 360 degrees, particle importance weight reaches its maximum value!
          </div>
        </div>
      </div>
    `
  });

  // 5. AMCL Step 1: Global Uniform Particle Distribution
  slides.push({
    id: `${lesson.id}_sec1_amcl_step1_uniform`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'AMCL Step 1',
    badge: '🎲 AMCL Step 1 / 4',
    title: 'AMCL Step 1: Global Uniform Particle Distribution (Zero Prior Pose)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌐</span><strong>Global Pose Uncertainty</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">When the robot starts with zero prior pose knowledge, AMCL initializes particles uniformly across all reachable free space in the map.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🧭</span><strong>Random Heading Hypotheses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Each particle is assigned random coordinates <code>(x, y)</code> and a random heading <code>&theta; &isin; [-&pi;, +&pi;]</code>, modeling equal initial likelihood everywhere.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎲</span><strong>Monte Carlo Sampling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Instead of tracking complex non-linear probability equations analytically, AMCL uses discrete particle samples to approximate arbitrary multimodal distributions.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step1_uniform_particles.png" alt="AMCL Step 1: Uniform Particle Distribution" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              AMCL Initial State: Red particles with orientation arrows uniformly scattered across the apartment
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Initial State:</strong> Every particle carries an equal initial weight: <code>w_0 = 1 / N_particles</code>.
          </div>
        </div>
      </div>
    `
  });

  // 6. AMCL Step 2: Anatomy of the Particle State Vector
  slides.push({
    id: `${lesson.id}_sec1_amcl_step2_state_vector`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'AMCL Step 2',
    badge: '📐 AMCL Step 2 / 4',
    title: 'AMCL Step 2: Anatomy of the Particle State Vector',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📐</span><strong>Mathematical Formulation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Each particle <code>i</code> represents a discrete hypothesis of robot pose: <code>S_t^{[i]} = &lang; x^{[i]}, y^{[i]}, &theta;^{[i]}, w^{[i]} &rang;</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚖️</span><strong>Importance Weight (w)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Weight <code>w^{[i]}</code> is proportional to likelihood that the actual sensor scan matches what would be observed if robot were at that pose: <code>w^{[i]} &prop; p(z_t | x_t^{[i]}, m)</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚡</span><strong>Normalizing Property</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Across all particles in the filter cloud, total weight sums to unity: <code>&sum;_{i=1}^{N} w^{[i]} = 1</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step2_particle_anatomy.png" alt="AMCL Step 2: Particle Anatomy" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Particle State Vector: Hypothesized (x, y) coordinate, heading &theta;, and importance weight w
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Odometry Frame:</strong> Particle coordinates reside in the global <code>map</code> frame, eliminating dead-reckoning drift.
          </div>
        </div>
      </div>
    `
  });

  // 7. AMCL Step 3: Motion Prediction & Measurement Weight Filtering
  slides.push({
    id: `${lesson.id}_sec1_amcl_step3_motion_sensor`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'AMCL Step 3',
    badge: '⚖️ AMCL Step 3 / 4',
    title: 'AMCL Step 3: Motion Prediction & Measurement Weight Filtering',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚀</span><strong>Phase A: Motion Model Prediction</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">When the robot drives forward, each particle is moved according to the odometry displacement plus calibrated Gaussian noise: <code>x_t^{[i]} ~ p(x_t | u_t, x_{t-1}^{[i]})</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔍</span><strong>Phase B: Sensor Model Correction</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">For each particle, a simulated LiDAR scan is compared against the actual physical laser scan. Particles that match real wall contours receive high weights.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🗑️</span><strong>Eliminating Infeasible Poses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Particles predicting walls inside open corridors receive weights near zero (faded/eliminated).</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step3_motion_and_sensor_update.png" alt="AMCL Step 3: Motion and Sensor Update" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Measurement Update: Particles aligned with walls turn green (high weight); mismatched particles fade away
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Convergence Indicator:</strong> As the robot travels through corridors, particle cloud spread shrinks rapidly!
          </div>
        </div>
      </div>
    `
  });

  // 8. AMCL Step 4: Resampling & Pose Convergence
  slides.push({
    id: `${lesson.id}_sec1_amcl_step4_resampling`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'AMCL Step 4',
    badge: '🎯 AMCL Step 4 / 4',
    title: 'AMCL Step 4: Resampling & Pose Convergence',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎡</span><strong>Roulette Wheel Resampling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Particles are drawn with replacement proportional to their weights. High-weight particles multiply into identical copies; low-weight particles die off.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Tight Particle Cluster</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">After 2-3 motion cycles, the entire particle population collapses into a tight, dense cluster centered on true robot position.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📉</span><strong>KLD-Sampling Efficiency</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">AMCL reduces active particle count from 2,000 down to 200 once converged, slashing CPU overhead to &lt; 5% on typical embedded ARM processors.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step4_resampling_convergence.png" alt="AMCL Step 4: Resampling and Convergence" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Pose Convergence: Particles tightly grouped at actual robot location with orientation aligned
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Estimated Pose Output:</strong> The published <code>/amcl_pose</code> is the weighted spatial mean of this tight particle cluster.
          </div>
        </div>
      </div>
    `
  });

  // 9. Localization Challenge: Position Tracking
  slides.push({
    id: `${lesson.id}_sec2_challenge_tracking`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Challenge: Position Tracking',
    badge: '⚠️ Localization Challenge 1',
    title: 'Localization Challenges: Position Tracking in Cluttered Warehouses',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📍</span><strong>Local Tracking Condition</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The initial robot pose is known with reasonable certainty (e.g., undocked from charging station). Uncertainty remains local and bounded.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌀</span><strong>Wheel Slip & Inertial Drift</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Sudden acceleration on dusty warehouse floors causes wheel slippage. Odometry drifts quickly unless LiDAR range updates correct pose continuously.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Compact Particle Maintenance</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Particles only need to cover a small Gaussian region around current pose estimate, allowing high frequency (20 Hz) execution.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/localization_position_tracking.png" alt="Position Tracking Challenge" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Position Tracking: Bounded uncertainty ellipse tracking robot trajectory through corridors
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Tuning Key:</strong> Set <code>update_min_d: 0.1</code> and <code>update_min_a: 0.1</code> in <code>amcl.yaml</code> to trigger filter updates during movement.
          </div>
        </div>
      </div>
    `
  });

  // 10. Localization Challenge: Kidnapped Robot Problem
  slides.push({
    id: `${lesson.id}_sec2_challenge_kidnapped`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Challenge: Kidnapped Robot',
    badge: '🚨 Localization Challenge 2',
    title: 'Localization Challenges: The Kidnapped Robot Problem & Global Recovery',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚨</span><strong>Disastrous State Divergence</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The robot is manually lifted, shoved, or teleported to an arbitrary location without odometry registering movement.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📉</span><strong>Measurement Likelihood Collapse</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Real laser scans completely contradict map expectations at old believed pose. Average particle weight plunges below threshold.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔄</span><strong>Augmented MCL Recovery</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">AMCL automatically injects random particles across all free map space. As robot moves, particles at the true new location gain weight, reconverging rapidly.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/localization_kidnapped_robot.png" alt="Kidnapped Robot Problem" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Kidnapped Robot: Robot transported to an unknown pose requiring global particle relocalization
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #ef4444;">
            <strong>💡 Recovery Parameters:</strong> Governed by <code>recovery_alpha_slow: 0.001</code> and <code>recovery_alpha_fast: 0.1</code> in <code>amcl.yaml</code>.
          </div>
        </div>
      </div>
    `
  });

  // 11. Part II Section Break: Mapping (Clean Title Slide)
  slides.push({
    id: `${lesson.id}_sec_title_mapping`,
    type: 'section_title',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part II',
    badge: '🗺️ Part II',
    title: 'Mapping',
    titleClass: 'text-mapping',
    description: 'Constructing an accurate 2D metric occupancy grid map of an unknown environment from laser scan observations.'
  });

  // 12. Mapping Step 1: Discretizing Continuous Space into a 2D Grid Lattice
  slides.push({
    id: `${lesson.id}_sec3_mapping_step1_lattice`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Mapping Step 1',
    badge: '🗺️ Mapping Step 1 / 4',
    title: 'Mapping Step 1: Discretizing Continuous Space into a 2D Grid Lattice',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌐</span><strong>Infinite Continuous Reality</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The physical world has continuous real-valued coordinates <code>(x, y) &isin; R^2</code>. Computers cannot store infinite precision boundaries directly.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📐</span><strong>Lattice Grid Discretization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">We superimpose a uniform matrix of square cells over the floorplan. Each cell spans width <code>&Delta;x</code> and height <code>&Delta;y</code> (resolution).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚙️</span><strong>Coordinate Discretization Math</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Continuous coordinate <code>(x, y)</code> maps to discrete cell indices via: <code>i = floor((x - origin_x) / resolution)</code>, <code>j = floor((y - origin_y) / resolution)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step1_discretization.png" alt="Mapping Step 1: Discretization" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Spatial Discretization: Overlaying a uniform 2D grid matrix across continuous floorplan geometry
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #0284c7;">
            <strong>💡 Standard AMR Resolution:</strong> Warehouse AMRs typically use <strong>0.05m (5 cm)</strong> grid resolution to resolve pallet edges.
          </div>
        </div>
      </div>
    `
  });

  // 13. Mapping Step 2: Binary States & Metric Quantization
  slides.push({
    id: `${lesson.id}_sec3_mapping_step2_binary_states`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Mapping Step 2',
    badge: '🗺️ Mapping Step 2 / 4',
    title: 'Mapping Step 2: Binary States & Metric Quantization',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⬜</span><strong>Free Space State (Cell = 0)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Traversable open floor cleared by laser beams without detecting obstacles. AMRs can safely plan paths through these cells.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⬛</span><strong>Occupied Obstacle State (Cell = 100)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Impassable structures (walls, pillars, racks). Laser pulses bounce back from surfaces inside these cell boundaries.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔘</span><strong>Unknown State (Cell = -1)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Unexplored areas beyond walls or shadowed by obstacles. Nav2 planners treat unknown areas as potentially lethal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step2_binary_cells.png" alt="Mapping Step 2: Binary Cells" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Binary Grid Classification: White = Free (0), Black = Obstacle (100), Gray = Unknown (-1)
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #0284c7;">
            <strong>💡 ROS 2 Message Standard:</strong> Published on <code>/map</code> topic as <code>nav_msgs/msg/OccupancyGrid</code> with <code>int8[] data</code>.
          </div>
        </div>
      </div>
    `
  });

  // 14. Mapping Step 3: Full Warehouse Binary Matrix
  slides.push({
    id: `${lesson.id}_sec3_mapping_step3_full_matrix`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Mapping Step 3',
    badge: '🗺️ Mapping Step 3 / 4',
    title: 'Mapping Step 3: The Full Warehouse Discretized Binary Matrix',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🏢</span><strong>Facility-Wide Grid Matrix</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The entire warehouse floorplan is represented as a contiguous 2D binary matrix: <code>M = {m_1, m_2, ..., m_N}</code> spanning width &times; height.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💾</span><strong>Memory Allocation & Sizing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">A 100m &times; 100m warehouse at 5cm resolution requires <code>2,000 &times; 2,000 = 4,000,000</code> cells (~4 MB uncompressed), easily cacheable in RAM.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Origin & Transformation Alignment</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The grid matrix is anchored to the global world frame via origin coordinates <code>(origin_x, origin_y, origin_theta)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step3_full_matrix.png" alt="Mapping Step 3: Full Matrix" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Global Matrix: Full apartment floorplan mapped into discrete binary cells
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Serialization:</strong> When saved via <code>nav2_map_server</code>, this binary matrix is exported directly to an image (.pgm).
          </div>
        </div>
      </div>
    `
  });

  // 15. Mapping Step 4: The LiDAR Measurement Cone & Log-Odds Bayesian Updates
  slides.push({
    id: `${lesson.id}_sec3_mapping_step4_raycast_cone`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Mapping Step 4',
    badge: '🗺️ Mapping Step 4 / 4',
    title: 'Mapping Step 4: The LiDAR Measurement Cone & Log-Odds Bayesian Updates',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔦</span><strong>Bresenham Raycasting</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Each LiDAR beam traverses a straight line from robot origin to range return. Cells along the ray are cleared as free space.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💥</span><strong>Obstacle Hit Cell</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The endpoint cell where the laser beam reflects is incremented as an occupied obstacle barrier.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>➕</span><strong>Log-Odds Numerical Stability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Instead of multiplying probabilities (underflow risk), occupancy uses log-odds addition: <code>l_{t,i} = l_{t-1,i} + log_odds(z_t)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step4_raycast_cone.png" alt="Mapping Step 4: Raycast Cone" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              LiDAR Raycast Cone: Sweeping laser beams updating log-odds occupancy across cells
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Update Logic:</strong> <code>l_free = log(0.35/0.65) = -0.62</code> | <code>l_occ = log(0.85/0.15) = +1.73</code>.
          </div>
        </div>
      </div>
    `
  });

  // 16. The Fundamental SLAM Dilemma & Classical Dataflow Architecture
  slides.push({
    id: `${lesson.id}_sec4_slam_dilemma`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'SLAM Dilemma',
    badge: '🔄 SLAM Dilemma',
    title: 'The Fundamental SLAM Dilemma & Classical Dataflow Architecture',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🗺️</span><strong>To Build a Map, We Need Robot Pose</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Accurately placing laser scan points into global coordinates requires knowing the exact robot pose <code>(x, y, &theta;)</code> where the scan was taken.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📍</span><strong>To Localize, We Need a Map</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">To determine robot pose from laser range scans, we need an existing reference map to match observations against.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔄</span><strong>Joint Estimation Solution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">SLAM solves both problems simultaneously: estimating trajectory <code>x_{0:t}</code> and map <code>m</code> concurrently from sensor history.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/slam_dilemma_classical_architecture.png" alt="SLAM Dilemma Architecture" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              SLAM Dilemma: Continuous interdependency between unknown pose estimation and unknown map building
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #0284c7;">
            <strong>💡 Modern Solution:</strong> Pose Graph SLAM (SLAM Toolbox) decouples scan matching front-end from Ceres graph back-end.
          </div>
        </div>
      </div>
    `
  });

  // 17. Practical Step 1: Install Required ROS 2 Packages
  slides.push({
    id: `${lesson.id}_sec5_step1_install_packages`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Step 1: Install Packages',
    badge: '📦 Practical Step 1 / 6',
    title: 'Practical Step 1: Install Required ROS 2 Packages',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📦</span><strong>slam_toolbox</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The industry-standard 2D Graph SLAM package for ROS 2. Includes Karto SLAM scan matching front-end and Ceres non-linear least-squares optimization back-end.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🧭</span><strong>navigation2 &amp; nav2_bringup</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Provides map server utilities (<code>nav2_map_server</code>), map saver command line tools, and launch orchestration actions needed for life-cycle management.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash terminal</span><strong>APT Installation Command</strong></div>
            <pre><code class="language-bash">sudo apt update && sudo apt install -y \\
  ros-humble-slam-toolbox \\
  ros-humble-navigation2 \\
  ros-humble-nav2-bringup</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>✅ Verification:</strong> Test installation with <code>ros2 pkg list | grep slam_toolbox</code>. Both <code>slam_toolbox</code> and <code>nav2_map_server</code> must be visible.
          </div>
        </div>
      </div>
    `
  });

  // 18. Practical Step 2: Create Mapping Package in Workspace
  slides.push({
    id: `${lesson.id}_sec5_step2_create_package`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Step 2: Create Package',
    badge: '📁 Practical Step 2 / 6',
    title: 'Practical Step 2: Create Mapping Package in Workspace',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🏗️</span><strong>nexus_amr_mapping Package</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Create a dedicated Python ROS 2 package housing configuration files, launch scripts, and output map directories for the warehouse AMR.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📁</span><strong>Subdirectory Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;"><code>config/</code> for YAML tuning, <code>launch/</code> for Python launch orchestrations, and <code>maps/</code> for storing serialized occupancy grids.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📦</span><strong>setup.py Data Files Export</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Register <code>config/*.yaml</code> and <code>launch/*.launch.py</code> in <code>setup.py</code> so <code>colcon build</code> installs them to <code>install/nexus_amr_mapping/share/</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash terminal</span><strong>Package Creation & Directory Setup</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python nexus_amr_mapping \\
  --dependencies rclpy slam_toolbox nav2_map_server

cd nexus_amr_mapping
mkdir -p config launch maps rviz</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 Clean Workspace Rule:</strong> Keeping mapping decoupled from simulation packages guarantees modular deployment on physical AMR hardware.
          </div>
        </div>
      </div>
    `
  });

  // 19. Practical Step 3: Add Config & Launch Files
  slides.push({
    id: `${lesson.id}_sec5_step3_config_launch`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Step 3: Config & Launch',
    badge: '⚙️ Practical Step 3 / 6',
    title: 'Practical Step 3: Add SLAM Configuration & Launch Files',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📄</span><strong>config/slam_toolbox.yaml</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Specifies <code>async_slam_toolbox_node</code> parameters: tracking frames (<code>map</code>, <code>odom</code>, <code>base_footprint</code>), <code>/scan</code> topic, and Ceres solver settings.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚀</span><strong>launch/online_async_slam.launch.py</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Defines launch arguments (<code>use_sim_time</code>), declares the SLAM Toolbox node, and launches RViz2 with pre-configured laser visualization.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⏱️</span><strong>Async Execution Mode</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The asynchronous mode processes sensor scans in a dedicated worker thread, preventing robot velocity pauses if Ceres optimization takes &gt; 50ms.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">online_async_slam.launch.py</span><strong>Launch File Snippet</strong></div>
            <pre><code class="language-python">from launch import LaunchDescription
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    pkg_share = get_package_share_directory('nexus_amr_mapping')
    config = os.path.join(pkg_share, 'config', 'slam_toolbox.yaml')
    return LaunchDescription([
        Node(package='slam_toolbox', executable='async_slam_toolbox_node',
             name='slam_toolbox', output='screen',
             parameters=[config, {'use_sim_time': True}])
    ])</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 20. Practical Step 4: Tuning SLAM Configuration Parameters
  slides.push({
    id: `${lesson.id}_sec5_step4_tuning_config`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Step 4: Parameter Tuning',
    badge: '🎛️ Practical Step 4 / 6',
    title: 'Practical Step 4: SLAM Configuration Parameter Tuning Matrix',
    htmlContent: `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
        <table class="l03-table" style="width: 100%; border-collapse: collapse; font-size: 0.72rem;">
          <thead>
            <tr style="background: var(--bg-card); color: var(--text-primary); border-bottom: 2px solid var(--accent-primary);">
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 22%;">YAML Parameter</th>
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 14%;">Value</th>
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 38%;">Engineering Purpose</th>
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 26%;">Tuning Guidance</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>resolution</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>0.05</code></td>
              <td style="padding: 0.3rem 0.55rem;">Grid cell size (5 cm). Captures rack legs crisply.</td>
              <td style="padding: 0.3rem 0.55rem;">Lower to <code>0.03</code> for tight spaces; <code>0.05</code> for large hubs.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>max_laser_range</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>20.0</code></td>
              <td style="padding: 0.3rem 0.55rem;">Discards returns beyond 20 meters.</td>
              <td style="padding: 0.3rem 0.55rem;">Set to match physical LiDAR reliable range.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>minimum_travel_distance</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>0.20</code></td>
              <td style="padding: 0.3rem 0.55rem;">Requires 20 cm linear travel before new node.</td>
              <td style="padding: 0.3rem 0.55rem;">Prevents redundant pose nodes when stopped.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>minimum_travel_heading</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>0.20</code></td>
              <td style="padding: 0.3rem 0.55rem;">Requires ~11.5&deg; rotation before new node.</td>
              <td style="padding: 0.3rem 0.55rem;">Ensures angular scans during in-place turns.</td>
            </tr>
            <tr>
              <td style="padding: 0.3rem 0.55rem;"><code>loop_search_maximum_distance</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>3.0</code></td>
              <td style="padding: 0.3rem 0.55rem;">Radius for finding loop closure candidates.</td>
              <td style="padding: 0.3rem 0.55rem;">Keep &le; 3m to prevent false loop matches.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.45rem; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
        <strong>⚖️ Tuning Golden Rule:</strong> Never set <code>minimum_travel_distance: 0.0</code>! It causes rapid pose graph bloat and exhausts RAM within minutes.
      </div>
    `
  });

  // 21. Practical Step 5: Running Launch File & Teleop (Live Mapping in RViz2)
  slides.push({
    id: `${lesson.id}_sec5_step5_running_teleop`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Step 5: Run Launch & Teleop',
    badge: '🎮 Practical Step 5 / 6',
    title: 'Practical Step 5: Running Launch File & Teleop (Live Mapping in RViz2)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚀</span><strong>Terminal 1: Execute SLAM Launch</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 launch nexus_amr_mapping online_async_slam.launch.py</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🕹️</span><strong>Terminal 2: Launch Teleop Controller</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🐢</span><strong>Driving Discipline (&le; 0.3 m/s)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Drive slowly. Drive perimeter walls first to close loops; then fill aisles. Avoid rapid in-place spins to ensure clean scan overlap.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/rviz2_live_slam_mapping.png" alt="RViz2 Live SLAM Mapping Interface" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Live RViz2 SLAM Mapping: Real-time OccupancyGrid growth, LaserScan, and TF tree links
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Visual Verification:</strong> Ensure walls are crisp and continuous. Double lines indicate scan matching slip or odometry wheel spin!
          </div>
        </div>
      </div>
    `
  });

  // 22. Practical Step 6: Map Serialization & Saving Map Files
  slides.push({
    id: `${lesson.id}_sec5_step6_saving_maps`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Step 6: Save Maps',
    badge: '💾 Practical Step 6 / 6',
    title: 'Practical Step 6: Map Serialization & Saving Map Files (.yaml & .pgm)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💾</span><strong>Map Saver CLI Command</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 run nav2_map_server map_saver_cli \\
  -f ~/ros2_ws/src/nexus_amr_mapping/maps/warehouse_map</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🖼️</span><strong>warehouse_map.pgm (Image)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">2D grayscale portable graymap image where each pixel matches a grid cell (254 = free space, 0 = occupied obstacle, 205 = unknown).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📋</span><strong>warehouse_map.yaml (Metadata)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Contains crucial spatial anchors: <code>resolution: 0.05</code>, <code>origin: [-10.0, -10.0, 0.0]</code>, and occupancy evaluation mode.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse_map.yaml</span><strong>Generated Map Metadata</strong></div>
            <pre><code class="language-yaml">image: warehouse_map.pgm
mode: trinary
resolution: 0.05
origin: [-10.0, -10.0, 0.0]
negate: 0
occupied_thresh: 0.65
free_thresh: 0.25</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>🚀 Milestone Achieved:</strong> This saved map directly feeds into Nav2 AMCL localization and costmap generation in Lessons 14 & 15!
          </div>
        </div>
      </div>
    `
  });

  // 23. Interactive Knowledge Assessment Quiz
  slides.push({
    id: `${lesson.id}_quiz_amcl_resampling`,
    type: 'quiz',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Knowledge Check: AMCL & Mapping',
    badge: '🧠 Interactive Quiz',
    title: 'Knowledge Check: AMCL Particle Filter Weighting',
    question: 'In AMCL, when a simulated LiDAR raycast from a candidate particle pose perfectly matches the distance measured by the physical robot laser scanner, what happens to that particle during measurement correction?',
    options: [
      'The particle importance weight w increases, making it much more likely to survive and duplicate during resampling',
      'The particle is deleted immediately because deterministic certainty is not allowed in stochastic filters',
      'The particle heading angle theta is forcefully inverted by 180 degrees to search for alternative solutions',
      'The particle is frozen in memory and excluded from all future motion model prediction updates'
    ],
    answer: 0,
    explanation: 'Correct! AMCL evaluates candidate poses by comparing actual laser measurements against expected raycasts through the map. Particles whose predictions closely match real-world observations receive high importance weights and multiply into clusters during the roulette wheel resampling phase.'
  });

  // 24. Lesson 13 Summary & Key Takeaways
  slides.push({
    id: `${lesson.id}_summary_takeaways`,
    type: 'summary',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Lesson Summary',
    badge: '🎯 Key Takeaways',
    title: 'Lesson 13 Summary & Production Takeaways',
    summaryCards: [
      {
        icon: '📍',
        title: 'AMCL Localization',
        text: 'AMCL uses adaptive particle filtering to maintain a multimodal belief distribution across SE(2). Raycasting matches physical LiDAR scans against pre-mapped walls to converge on true pose.'
      },
      {
        icon: '🗺️',
        title: 'Occupancy Grid Mapping',
        text: 'Continuous 2D space is quantized into discrete cells (typically 5cm). Log-odds Bayesian updating stably aggregates sensor hits and misses into free (0), occupied (100), and unknown (-1) states.'
      },
      {
        icon: '🔄',
        title: 'SLAM Toolbox Graph Optimization',
        text: 'Decouples high-frequency scan matching from Ceres non-linear least-squares pose graph relaxation, yielding closed loops and zero-drift metric warehouse maps.'
      },
      {
        icon: '💾',
        title: 'Production Map Delivery',
        text: 'Map serialization outputs warehouse_map.pgm and warehouse_map.yaml. These serialized assets become the operational foundation for Nav2 costmaps and trajectory planners.'
      }
    ]
  });
}'''

# Replace function in slideParser.js
pattern = r"function buildLesson13Slides\(doc, lesson, slides\) \{[\s\S]*?\n\}"
match = re.search(pattern, content)
if not match:
    print("Could not find buildLesson13Slides in slideParser.js!")
    sys.exit(1)

content = content[:match.start()] + new_build_lesson_13 + content[match.end():]

with open(SLIDE_PARSER_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully updated buildLesson13Slides in slideParser.js with centered layouts, cleaned titles, and responsive badges!")
