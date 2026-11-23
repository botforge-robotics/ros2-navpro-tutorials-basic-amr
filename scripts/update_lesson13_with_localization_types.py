#!/usr/bin/env python3
import json
import re

SLIDE_PARSER_PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/utils/slideParser.js"
LESSONS_DATA_PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json"

NEW_LESSON_13_SLIDES = """function buildLesson13Slides(doc, lesson, slides) {
  // Part I Section Break: Localization (Blank / Dark Title Slide)
  slides.push({
    id: `${lesson.id}_sec_title_localization`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Localization',
    badge: '📍 Section Break',
    title: 'Localization',
    htmlContent: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 380px; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.4); padding: 0.35rem 0.9rem; border-radius: 9999px; margin-bottom: 1.25rem;">
          <span style="font-size: 1.1rem;">📍</span>
          <span style="font-size: 0.82rem; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.1em;">Part I &bull; Theory &amp; Foundations</span>
        </div>
        <h1 style="font-size: 3.4rem; font-weight: 800; color: #f8fafc; margin: 0 0 1rem 0; letter-spacing: -0.02em; background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Localization
        </h1>
        <p style="font-size: 1.05rem; color: #94a3b8; max-width: 620px; line-height: 1.6; margin: 0;">
          Estimating the pose of an Autonomous Mobile Robot (AMR) in a known environmental map given sensor observations and motion control inputs.
        </p>
      </div>
    `
  });

  // Localization Definition & Problem Statement (Slide 119)
  slides.push({
    id: `${lesson.id}_sec_localization_definition`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Localization Definition',
    badge: '📍 Core Definition',
    title: 'Mobile Robot Localization: Definition & Problem Statement',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>❓</span><strong>The Fundamental Question</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><em>"Where is the robot relative to the world coordinate frame?"</em> Given a static environment map <code>m</code> and sensor readings <code>z_{1:t}</code>, compute pose <code>(x, y, &theta;) &isin; SE(2)</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Odometry vs. Perception Fusion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Wheel encoders measure motion rapidly at 50 Hz but suffer from cumulative integration drift. Exteroceptive sensors (2D LiDAR) correct this drift against pre-mapped walls.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Belief Probability Distribution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Because sensors and actuators contain physical noise, the robot maintains a belief distribution <code>bel(x_t) = p(x_t | z_{1:t}, u_{1:t})</code> rather than a single deterministic coordinate.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/localization_concept_pose_estimation.png" alt="Robot Localization in Given Map" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Localization: Estimate the pose of robot in the given map of environment
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Ground Truth:</strong> Without accurate localization, all downstream Nav2 costmap alignment and trajectory rollouts immediately fail.
          </div>
        </div>
      </div>
    `
  });

  // Different Types of Localization Algorithms (Slide 125)
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
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Extended Kalman Filter (EKF Localization)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Represents pose as a unimodal Gaussian belief <code>N(&mu;, &Sigma;)</code>. Linearizes non-linear motion models using Taylor Jacobians. Fast &amp; efficient, but fails under multimodal ambiguity.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Markov Localization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Discretizes continuous state space into a 3D probabilistic lattice grid <code>(x, y, &theta;)</code>. Evaluates recursive Bayesian updates across all grid cells. Capable of global localization.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Grid Localization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">A variant of Markov localization storing probabilities in spatial histogram cells. High resolution demands extreme memory; coarse resolution introduces significant discretization errors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #34d399;"><span>4️⃣</span><strong>Monte Carlo Localization (MCL / Particle Filter)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Represents arbitrary multimodal probability distributions using a cloud of discrete particles. <strong>AMCL</strong> dynamically adapts particle count (KLD sampling) to balance accuracy and CPU load.</p>
          </div>
        </div>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
        <strong>🏆 Industry Standard:</strong> ROS 2 Nav2 standardizes on <strong>AMCL</strong> (Adaptive Monte Carlo Localization) for robust 2D LiDAR warehouse localization.
      </div>
    `
  });

  // AMCL Measurement Representation (Slide 129)
  slides.push({
    id: `${lesson.id}_sec_amcl_measurement_rep`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'AMCL Measurement Representation',
    badge: '📡 Measurement Model',
    title: 'AMCL Measurement Representation: Beam Model & Raycasting',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>LiDAR Raycast Simulation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">For each candidate particle pose, AMCL simulates laser range returns <code>z_t^{k*}</code> by casting virtual rays through the occupancy grid map until hitting occupied cells.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚖️</span><strong>Likelihood Weighting p(z_t | x_t, m)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">AMCL compares the actual physical range <code>z_t^k</code> against expected range <code>z_t^{k*}</code> using a Gaussian likelihood function. Particles aligning with real walls get high weights.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Sensor Noise Robustness</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The measurement model accounts for four noise phenomena: Gaussian beam error, unexpected dynamic obstacles (humans), max-range specular dropouts, and random sensor noise.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/amcl_measurement_representation.png" alt="AMCL Measurement Representation" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              AMCL Measurement Representation: Virtual beam raycast matching map walls to evaluate likelihood
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Likelihood Match:</strong> When physical laser ranges match simulated raycasts across all 360 degrees, particle importance weight reaches its maximum value!
          </div>
        </div>
      </div>
    `
  });

  // 1. AMCL Step 1: Global Uniform Particle Distribution
  slides.push({
    id: `${lesson.id}_sec1_amcl_step1_uniform`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. AMCL Step 1: Global Uniform Particle Distribution',
    badge: '📍 AMCL Step 1 / 4',
    title: '1. AMCL Step 1: Global Uniform Particle Distribution (Zero Prior Pose)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>Global Pose Uncertainty</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">When the robot starts with zero prior pose knowledge, AMCL initializes particles uniformly across all reachable free space in the map.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧭</span><strong>Random Heading Hypotheses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Each particle is assigned random coordinates <code>(x, y)</code> and a random heading <code>&theta; &isin; [-&pi;, +&pi;]</code>, modeling equal initial likelihood everywhere.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎲</span><strong>Monte Carlo Sampling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Instead of tracking complex non-linear probability equations analytically, AMCL uses discrete particle samples to approximate arbitrary multimodal distributions.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/amcl_step1_uniform_particles.png" alt="AMCL Step 1: Uniform Particle Distribution" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              AMCL Initial State: Red particles with orientation arrows uniformly scattered across the apartment
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Initial State:</strong> Every particle carries an equal initial weight: <code>w_0 = 1 / N_particles</code>.
          </div>
        </div>
      </div>
    `
  });

  // 2. AMCL Step 2: Anatomy of the Particle State Vector
  slides.push({
    id: `${lesson.id}_sec1_amcl_step2_state_vector`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. AMCL Step 2: Particle State Vector',
    badge: '📍 AMCL Step 2 / 4',
    title: '2. AMCL Step 2: Anatomy of the Particle State Vector [X, Y, θ, Weight]',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>State Vector Representation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Each particle <code>p</code> is an independent pose hypothesis carrying four discrete state parameters: <code>S_p = [X_p, Y_p, &Theta;_p, w_p]</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧭</span><strong>Position & Heading Orientation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>X_p, Y_p</code> define 2D Cartesian spatial coordinates in meters; <code>&Theta;_p</code> defines heading angle orientation in radians.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚖️</span><strong>Importance Weight (w_p)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>w_p &isin; [0.0, 1.0]</code> represents the probability likelihood that particle <code>p</code> accurately matches real laser observations.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/amcl_step2_particle_state_vector.png" alt="AMCL Step 2: Particle State Vector" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Particle Anatomy: Visualizing a discrete particle with spatial position X, Y and heading angle &Theta;
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Cloud Representation:</strong> A cloud of <code>N = 2,000</code> particles forms a non-parametric representation of the robot's belief <code>bel(x_t)</code>.
          </div>
        </div>
      </div>
    `
  });

  // 3. AMCL Step 3: Motion Prediction & Measurement Likelihood Weighting
  slides.push({
    id: `${lesson.id}_sec1_amcl_step3_weight_filtering`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. AMCL Step 3: Motion Prediction & Weighting',
    badge: '📍 AMCL Step 3 / 4',
    title: '3. AMCL Step 3: Motion Prediction & Measurement Likelihood Weighting',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Odometry Motion Update</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">When the robot drives, wheel odometry propagates every particle forward according to differential kinematics plus Gaussian motion noise.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>Measurement Likelihood Evaluation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Live 2D LiDAR scans (green rays) are evaluated against each particle. Simulated expected ranges are compared to physical laser returns.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚖️</span><strong>Weight Scaling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Particles whose expected laser ranges match real sensor returns receive high weights (<code>w_p &uarr;</code>); mismatched particles get near-zero weights.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/amcl_step3_weight_filtering.png" alt="AMCL Step 3: Weight Filtering" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Weight Filtering: Particles matching LiDAR observations (green beams) gain higher weights
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Likelihood Formula:</strong> <code>w_p = p(z_t | x_t^{[p]}, m) = &prod; p(z_t^k | x_t^{[p]}, m)</code>.
          </div>
        </div>
      </div>
    `
  });

  // 4. AMCL Step 4: Importance Resampling & Pose Convergence
  slides.push({
    id: `${lesson.id}_sec1_amcl_step4_convergence`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. AMCL Step 4: Importance Resampling',
    badge: '📍 AMCL Step 4 / 4',
    title: '4. AMCL Step 4: Importance Resampling & Pose Convergence',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎰</span><strong>Roulette-Wheel Resampling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Particles are drawn with probability proportional to their weights: <code>P(sample = p) &prop; w_p</code>. Highly weighted hypotheses survive.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Pose Convergence</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Low-weight particles die off. Surviving particles duplicate with small Gaussian dispersion, collapsing tightly into a sharp unimodal cluster.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📉</span><strong>KLD Adaptive Downscaling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Once the particle cloud clusters tightly around true pose, AMCL dynamically drops the particle count from 2,000 down to 500, slashing CPU usage.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/amcl_step4_pose_convergence.png" alt="AMCL Step 4: Pose Convergence" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Pose Convergence: Particles tightly clustered around the true robot pose with high confidence
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Result:</strong> The weighted mean of the collapsed cluster is published as <code>/amcl_pose</code> and broadcast via TF (<code>map &rarr; odom</code>).
          </div>
        </div>
      </div>
    `
  });

  // 5. Localization Challenges: Position Tracking
  slides.push({
    id: `${lesson.id}_sec2_position_tracking`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Localization Challenges: Position Tracking',
    badge: '🎯 Local Tracking',
    title: '5. Localization Challenges: Position Tracking (Local Problem)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>Known Initial Robot Pose</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The robot starts with an initial pose estimate (e.g. at a docking charger). Pose uncertainty is small and tightly bounded.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📈</span><strong>Continuous Odometry Drift Correction</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">As the AMR travels across warehouse floors, wheel slippage causes odometry drift. The particle filter continuously applies LiDAR updates to correct error.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Unimodal Tracking Efficiency</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Because the pose is known locally, particles form a single unimodal Gaussian-like cluster, requiring minimal CPU computation.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/localization_position_tracking.png" alt="Position Tracking" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Position Tracking: Compensating for local wheel slip drift around a known trajectory
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 Nominal State:</strong> 99% of normal industrial AMR operation runs in position tracking mode.
          </div>
        </div>
      </div>
    `
  });

  // 6. Localization Challenges: The Kidnapped Robot Problem
  slides.push({
    id: `${lesson.id}_sec2_kidnapped_robot`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Localization Challenges: Kidnapped Robot',
    badge: '🚨 Global Relocalization',
    title: '6. Localization Challenges: The Kidnapped Robot Problem (Global Relocalization)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #ef4444;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #f87171;"><span>🚷</span><strong>Sudden Global Dislocation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The robot is physically picked up and moved to an unknown location without odometry feedback, leaving the old particle cluster completely invalid.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📉</span><strong>Measurement Inconsistency Detection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">AMCL monitors long-term vs. short-term average likelihood weights (<code>w_slow</code> vs <code>w_fast</code>). A sudden divergence indicates catastrophic kidnapping.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #34d399;"><span>✨</span><strong>Random Particle Injection Recovery</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">AMCL automatically injects random particles across all free map space. As the robot spins, particles at the true new location gain weight, reconverging rapidly.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/localization_kidnapped_robot.png" alt="Kidnapped Robot Problem" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Kidnapped Robot: Robot transported to an unknown pose requiring global particle relocalization
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #ef4444;">
            <strong>💡 Recovery Parameters:</strong> Governed by <code>recovery_alpha_slow: 0.001</code> and <code>recovery_alpha_fast: 0.1</code> in <code>amcl.yaml</code>.
          </div>
        </div>
      </div>
    `
  });

  // Part II Section Break: Mapping (Blank / Dark Title Slide)
  slides.push({
    id: `${lesson.id}_sec_title_mapping`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Mapping',
    badge: '🗺️ Section Break',
    title: 'Mapping',
    htmlContent: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 380px; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); padding: 0.35rem 0.9rem; border-radius: 9999px; margin-bottom: 1.25rem;">
          <span style="font-size: 1.1rem;">🗺️</span>
          <span style="font-size: 0.82rem; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.1em;">Part II &bull; Spatial Representation</span>
        </div>
        <h1 style="font-size: 3.4rem; font-weight: 800; color: #f8fafc; margin: 0 0 1rem 0; letter-spacing: -0.02em; background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Mapping
        </h1>
        <p style="font-size: 1.05rem; color: #94a3b8; max-width: 620px; line-height: 1.6; margin: 0;">
          Produce an accurate metric occupancy grid map of the operational environment given the robot pose(s) and range sensor observations.
        </p>
      </div>
    `
  });

  // 7. Mapping Step 1: Discretizing Continuous Space into a 2D Grid Lattice
  slides.push({
    id: `${lesson.id}_sec3_mapping_step1_lattice`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '7. Mapping Step 1: 2D Grid Lattice',
    badge: '🗺️ Mapping Step 1 / 4',
    title: '7. Mapping Step 1: Discretizing Continuous Space into a 2D Grid Lattice',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Continuous Space Discretization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Continuous Cartesian coordinates <code>(x, y) &isin; &real;&sup2;</code> are partitioned into a discrete regular matrix of square cells.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📏</span><strong>Map Resolution Parameter</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Spatial fidelity is controlled by resolution (e.g. <code>resolution: 0.05</code> = 5 cm per cell). Smaller cells yield crisper walls but consume more memory.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔢</span><strong>Discrete Cell Indexing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Every physical location maps to integer indices <code>[mx, my]</code>: <code>mx = floor((x - origin_x) / resolution)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/occupancy_grid_step1_lattice.png" alt="Mapping Step 1: Lattice" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Discretization: Continuous 2D plane divided into discrete grid lattice cells
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Foundation:</strong> All ROS 2 <code>nav_msgs/msg/OccupancyGrid</code> representations build on this spatial lattice.
          </div>
        </div>
      </div>
    `
  });

  // 8. Mapping Step 2: Binary Cell States
  slides.push({
    id: `${lesson.id}_sec3_mapping_step2_cell_states`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '8. Mapping Step 2: Binary Cell States',
    badge: '🗺️ Mapping Step 2 / 4',
    title: '8. Mapping Step 2: Binary Cell States (m_i = 0 Free vs m_i = 1 Obstacle)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>0️⃣</span><strong>Free Space (m_i = 0)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Traversable warehouse floor where LiDAR beams pass freely without obstruction. Represents completely clear navigable zones.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Occupied Space (m_i = 1)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Solid physical infrastructure (concrete columns, warehouse walls, metal racks) where laser beams reflect back.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>❓</span><strong>Unknown Space (-1)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Unobserved regions outside sensor range or behind walls. Initialized with uniform prior probability: <code>p(m_i) = 0.5</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/occupancy_grid_step2_cell_states.png" alt="Mapping Step 2: Cell States" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Cell State Definition: Free floor (0) vs solid obstacle barrier (1)
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 ROS Encoding:</strong> <code>OccupancyGrid.data</code> encodes Free as <code>0</code>, Occupied as <code>100</code>, and Unknown as <code>-1</code>.
          </div>
        </div>
      </div>
    `
  });

  // 9. Mapping Step 3: Full Warehouse Discretized Binary Matrix
  slides.push({
    id: `${lesson.id}_sec3_mapping_step3_full_matrix`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '9. Mapping Step 3: Full Binary Matrix',
    badge: '🗺️ Mapping Step 3 / 4',
    title: '9. Mapping Step 3: The Full Warehouse Discretized Binary Matrix',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏢</span><strong>Facility-Wide Grid Matrix</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The entire warehouse floorplan is represented as a contiguous 2D binary matrix: <code>M = {m_1, m_2, ..., m_N}</code> spanning width &times; height.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>💾</span><strong>Memory Allocation & Sizing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">A 100m &times; 100m warehouse at 5cm resolution requires <code>2,000 &times; 2,000 = 4,000,000</code> cells (~4 MB uncompressed), easily cacheable in RAM.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Origin & Transformation Alignment</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The grid matrix is anchored to the global world frame via origin coordinates <code>(origin_x, origin_y, origin_theta)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/occupancy_grid_step3_full_matrix.png" alt="Mapping Step 3: Full Matrix" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Global Matrix: Full apartment floorplan mapped into discrete binary cells
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Serialization:</strong> When saved via <code>nav2_map_server</code>, this binary matrix is exported directly to an image (.pgm).
          </div>
        </div>
      </div>
    `
  });

  // 10. Mapping Step 4: The LiDAR Measurement Cone & Log-Odds Bayesian Updates
  slides.push({
    id: `${lesson.id}_sec3_mapping_step4_raycast_cone`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '10. Mapping Step 4: Raycasting Cone & Log-Odds',
    badge: '🗺️ Mapping Step 4 / 4',
    title: '10. Mapping Step 4: The LiDAR Measurement Cone & Log-Odds Bayesian Updates',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔦</span><strong>Bresenham Raycasting</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Each LiDAR beam traverses a straight line from robot origin to range return. Cells along the ray are cleared as free space.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>💥</span><strong>Obstacle Hit Cell</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The endpoint cell where the laser beam reflects is incremented as an occupied obstacle barrier.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>➕</span><strong>Log-Odds Numerical Stability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Instead of multiplying probabilities (underflow risk), occupancy uses log-odds addition: <code>l_{t,i} = l_{t-1,i} + log_odds(z_t)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/occupancy_grid_step4_raycast_cone.png" alt="Mapping Step 4: Raycast Cone" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              LiDAR Raycast Cone: Sweeping laser beams updating log-odds occupancy across cells
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Update Logic:</strong> <code>l_free = log(0.35/0.65) = -0.62</code> | <code>l_occ = log(0.85/0.15) = +1.73</code>.
          </div>
        </div>
      </div>
    `
  });

  // 11. The Fundamental SLAM Dilemma & Classical Dataflow Architecture
  slides.push({
    id: `${lesson.id}_sec4_slam_dilemma`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '11. The SLAM Dilemma',
    badge: '🔄 The Chicken-Egg Problem',
    title: '11. The Fundamental SLAM Dilemma & Classical Dataflow Architecture',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗺️</span><strong>To Build a Map, We Need Robot Pose</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Accurately placing laser scan points into global coordinates requires knowing the exact robot pose <code>(x, y, &theta;)</code> where the scan was taken.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>To Localize, We Need a Map</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">To determine robot pose from laser range scans, we need an existing reference map to match observations against.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Joint Estimation Solution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">SLAM solves both problems simultaneously: estimating trajectory <code>x_{0:t}</code> and map <code>m</code> concurrently from sensor history.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/slam_dataflow_architecture.png" alt="SLAM Dataflow Architecture" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Classical SLAM Loop: Laser Scans + Odometry fed to Joint Localization & Mapping estimator
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Modern Solution:</strong> Modern systems use <strong>Pose Graph SLAM</strong> to decouple front-end scan matching from back-end nonlinear optimization.
          </div>
        </div>
      </div>
    `
  });

  // 12. Modern Graph SLAM Architecture: Pose Graphs & Ceres Loop Closure
  slides.push({
    id: `${lesson.id}_sec4_graph_slam`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '12. Modern Graph SLAM Architecture',
    badge: '🕸️ Graph SLAM',
    title: '12. Modern Graph SLAM Architecture: Pose Graphs & Ceres Loop Closure',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⭕</span><strong>Pose Graph Nodes & Spatial Edges</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Nodes represent historical robot poses <code>x_i</code> where laser scans were captured. Directed edges represent relative odometry constraints <code>&Delta;x_{ij}</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Correlative Scan Matching (Front-End)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">When the robot revisits a previously mapped corridor, scan matching recognizes overlapping geometry and proposes a loop closure edge.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Ceres Non-Linear Optimizer (Back-End)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">SLAM Toolbox runs Ceres Solver to adjust the entire historical trajectory simultaneously, instantly eliminating all accumulated drift!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/slam_loop_closure_animation.svg" alt="Pose Graph SLAM Loop Closure" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Pose Graph Optimization: Loop closure spring relaxation snapping walls into perfect alignment
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Benchmark:</strong> SLAM Toolbox outperforms older Gmapping by dynamically serializing submaps and optimizing multi-thousand-node pose graphs.
          </div>
        </div>
      </div>
    `
  });

  // 13. Production Tuning: config/slam_toolbox.yaml Parameter Matrix
  slides.push({
    id: `${lesson.id}_sec5_slam_toolbox_yaml`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '13. Production Tuning: SLAM Toolbox YAML',
    badge: '⚙️ SLAM Configuration',
    title: '13. Production Tuning: config/slam_toolbox.yaml Parameter Matrix',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>resolution: 0.05</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">5 cm/cell provides optimal balance between detecting thin pallet rack legs and keeping CPU usage below 15% on edge computers.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>max_laser_range & minimum_time_interval</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Set <code>max_laser_range: 20.0m</code> to discard noisy far returns. <code>minimum_time_interval: 0.5s</code> throttles keyframe creation during stops.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>loop_search_maximum_distance: 3.0</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Restricts loop closure candidates to within 3.0 meters of estimated pose, preventing false positive matches across symmetrical warehouse aisles.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">slam_toolbox.yaml</span><strong>Core Parameter Block</strong></div>
            <pre><code class="language-yaml">slam_toolbox:
  ros__parameters:
    mode: mapping
    solver_plugin: solver_plugins::CeresSolver
    ceres_linear_solver: SPARSE_NORMAL_CHOLESKY
    map_frame: map
    odom_frame: odom
    base_frame: base_footprint
    scan_topic: /scan
    resolution: 0.05
    max_laser_range: 20.0
    minimum_travel_distance: 0.2
    minimum_travel_heading: 0.2
    do_loop_closing: true
    loop_search_maximum_distance: 3.0</code></pre>
          </div>
        </div>
      </div>
    `
  });

  // 14. Online SLAM Mapping Workflow: Teleop Discipline & RViz2 Execution
  slides.push({
    id: `${lesson.id}_sec6_mapping_workflow`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '14. Online SLAM Mapping Workflow',
    badge: '🎮 Live Execution',
    title: '14. Online SLAM Mapping Workflow: Teleop Discipline & RViz2 Execution',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Step 1: Launch Sim & SLAM Node</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Launch Gazebo simulation world, robot state publisher, and <code>async_slam_toolbox_node</code> with custom configuration.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐢</span><strong>Step 2: Slow Driving Discipline (&le; 0.3 m/s)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Drive smoothly using teleop keyboard. Never spin rapidly in place; give scan matchers sufficient temporal overlap between frames.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Step 3: Perimeter Loop Closure First</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Drive the full perimeter loop of the building first and return to the starting pose to trigger global loop closure before filling interior corridors.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/rviz2_live_slam_mapping.png" alt="RViz2 Live SLAM Mapping" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              RViz2 Mapping: Real-time occupancy grid growth, LaserScan returns, and TF tree links
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Visual Verification:</strong> Ensure wall lines remain crisp and thin. Double walls indicate scan matching slip or missed loop closures!
          </div>
        </div>
      </div>
    `
  });

  // 15. Map Serialization & Occupancy Grid Storage (.yaml & .pgm)
  slides.push({
    id: `${lesson.id}_sec7_map_saver`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '15. Map Serialization & Storage',
    badge: '💾 Map Storage',
    title: '15. Map Serialization & Occupancy Grid Storage (.yaml & .pgm)',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🖼️</span><strong>warehouse_map.pgm (Raster Grayscale Image)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Portable Graymap containing 8-bit pixels: <code>254</code> (White = Free Space), <code>0</code> (Black = Occupied Walls), <code>205</code> (Gray = Unknown).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📄</span><strong>warehouse_map.yaml (Spatial Metadata Manifest)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Defines spatial resolution (<code>0.05 m/cell</code>), global origin coordinates <code>[-10.0, -10.0, 0.0]</code>, and occupancy classification thresholds.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>nav2_map_server CLI Invocation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Save live SLAM maps instantly to disk using: <code>ros2 run nav2_map_server map_saver_cli -f ~/ros2_ws/src/nexus_amr_navigation/maps/warehouse_map</code>.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse_map.yaml</span><strong>Metadata Manifest Format</strong></div>
            <pre><code class="language-yaml">image: warehouse_map.pgm
mode: trinary
resolution: 0.05
origin: [-10.0, -10.0, 0.0]
negate: 0
occupied_thresh: 0.65
free_thresh: 0.25</code></pre>
          </div>
        </div>
      </div>
    `
  });
}
"""

def update_slide_parser():
    with open(SLIDE_PARSER_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    pattern13 = r"function buildLesson13Slides\(doc, lesson, slides\) \{[\s\S]*?\n\}"
    if not re.search(pattern13, content):
        print("ERROR: could not find buildLesson13Slides")
        return
    content = re.sub(pattern13, NEW_LESSON_13_SLIDES.strip(), content, count=1)

    with open(SLIDE_PARSER_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully updated buildLesson13Slides in slideParser.js!")

def update_lessons_data():
    with open(LESSONS_DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for l in data.get("lessons", []):
        if l.get("id") == "lesson_13":
            l["subtopics"] = [
                {"id": "1-overview-learning-objectives", "title": "1. Overview &amp; Learning Objectives"},
                {"id": "2-localization-definition", "title": "2. Mobile Robot Localization: Problem Formulation &amp; Pose Estimation"},
                {"id": "3-localization-algorithms-taxonomy", "title": "3. Different Types of Localization Algorithms (EKF, Markov, Grid, Monte Carlo)"},
                {"id": "4-amcl-measurement-representation", "title": "4. AMCL Measurement Representation: Beam Model &amp; Raycasting (Slide 129)"},
                {"id": "5-amcl-step-by-step", "title": "5. Adaptive Monte Carlo Localization (AMCL) Step-by-Step (4 Steps)"},
                {"id": "6-localization-challenges", "title": "6. Localization Challenges: Position Tracking vs. Kidnapped Robot Problem"},
                {"id": "7-mapping-grid-discretization", "title": "7. Occupancy Grid Mapping &amp; Log-Odds Bayesian Updates (4 Steps)"},
                {"id": "8-slam-dilemma-graph-slam", "title": "8. The SLAM Dilemma &amp; Modern Graph SLAM Architecture"},
                {"id": "9-deep-dive-config-slam-toolbox-yaml", "title": "9. Deep Dive: config/slam_toolbox.yaml Parameter Matrix"},
                {"id": "10-step-by-step-mapping-workflow", "title": "10. Step-by-Step Online SLAM Mapping Workflow &amp; Loop Closure Strategy"},
                {"id": "11-saving-the-map", "title": "11. Map Serialization &amp; Occupancy Grid Storage (.yaml &amp; .pgm)"},
                {"id": "12-hands-on-student-challenge", "title": "12. Hands-on Student Challenge: Online SLAM Mapping &amp; Relocalization Verification"}
            ]

            html = l.get("html_content", "")
            # Insert localization types section if not present
            if "3. Different Types of Localization Algorithms" not in html:
                insert_marker = '<h2 id="2-robot-localization-foundations-amcl">'
                new_sec_html = """
<h2 id="2-localization-definition">2. Mobile Robot Localization: Problem Formulation &amp; Pose Estimation</h2>
<p>To navigate autonomously through a warehouse, an Autonomous Mobile Robot (AMR) must solve the fundamental question: <em>"Where am I relative to the global reference frame?"</em> Mobile robot localization is the process of estimating robot pose <code>(x, y, &theta;) &isin; SE(2)</code> within a given environmental map using exteroceptive sensors (LiDAR) and proprioceptive sensors (wheel odometry).</p>

<p><img src="assets/images/localization_concept_pose_estimation.png" alt="Robot Pose Estimation in Known Map" class="lesson-image" style="max-height: 300px; object-fit: contain; margin: 1rem 0;" loading="lazy" /></p>

<h2 id="3-localization-algorithms-taxonomy">3. Different Types of Localization Algorithms</h2>
<p>Over decades of mobile robotics research, four canonical localization paradigms have emerged:</p>

<div class="grid-card-container" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">1. Extended Kalman Filter (EKF Localization)</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Represents belief as a unimodal Gaussian distribution <em>N(&mu;, &Sigma;)</em>. Linearizes non-linear kinematic and measurement models using first-order Taylor series Jacobians. Highly computationally efficient for local position tracking, but fails catastrophically under global ambiguity or kidnapping.</p>
  </div>
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #60a5fa; margin-top: 0; font-size: 0.95rem;">2. Markov Localization</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">Discretizes the entire 3D continuous configuration space <em>(x, y, &theta;)</em> into a volumetric histogram grid. Maintains explicit probability values across all cells using full recursive Bayesian filtering. Solves global relocalization, but suffers from severe exponential memory scaling.</p>
  </div>
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #c084fc; margin-top: 0; font-size: 0.95rem;">3. Grid Localization</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">A practical piecewise-constant discretization of Markov localization. Coarse spatial resolution allows faster evaluation but introduces quantization error; high spatial resolution demands significant processing time during each motion update.</p>
  </div>
  <div class="golden-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #34d399; margin-top: 0; font-size: 0.95rem;">4. Monte Carlo Localization (MCL / AMCL)</h4>
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">A non-parametric particle filter that represents arbitrary, non-Gaussian, multimodal probability densities via discrete hypothesis samples. <strong>AMCL (Adaptive MCL)</strong> introduces KLD sampling to dynamically adjust the sample size based on localization uncertainty.</p>
  </div>
</div>

<h2 id="4-amcl-measurement-representation">4. AMCL Measurement Representation: Beam Model &amp; Raycasting (Slide 129)</h2>
<p>To evaluate how well a candidate particle represents the robot's true pose, AMCL employs an explicit <strong>Range Finder Measurement Model</strong>:</p>

<div class="two-col-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0;">
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Virtual Raycasting Geometry</h4>
    <img src="assets/images/amcl_measurement_representation.png" alt="AMCL Measurement Representation Beam Model" class="lesson-image" style="width: 100%; border-radius: 6px; margin: 0.5rem 0;" />
    <p style="font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">For each hypothetical pose, raycasting traces virtual laser beams into the occupancy grid until encountering occupied cells, generating an expected range measurement <em>z_t^{k*}</em>.</p>
  </div>
  <div class="step-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
    <h4 style="color: #eab308; margin-top: 0; font-size: 0.95rem;">Likelihood Weight Formulation</h4>
    <p style="font-size: 0.85rem; line-height: 1.5; color: #94a3b8;">The physical measurement <em>z_t^k</em> is matched against <em>z_t^{k*}</em> across four probabilistic noise terms:</p>
    <ul style="font-size: 0.82rem; line-height: 1.5; color: #cbd5e1; margin: 0.3rem 0; padding-left: 1.1rem;">
      <li><strong>Gaussian Beam Noise:</strong> Measurement error modeled around expected range.</li>
      <li><strong>Unexpected Dynamic Obstacles:</strong> Unmapped pedestrians or forklifts blocking beams.</li>
      <li><strong>Maximum Range Dropouts:</strong> Specular reflections failing to return.</li>
      <li><strong>Random Noise:</strong> Sensor crosstalk and false echoes.</li>
    </ul>
    <p style="font-size: 0.82rem; line-height: 1.4; color: #94a3b8; margin-top: 0.4rem;">Particles whose simulated raycasts closely match actual LiDAR readings across all 360 degrees receive high importance weights.</p>
  </div>
</div>
"""
                html = html.replace(insert_marker, new_sec_html + "\n" + insert_marker)
                l["html_content"] = html
                print("Successfully updated lesson_13 html_content with Localization types and Slide 129 measurement representation!")

    with open(LESSONS_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Successfully updated lessonsData.json!")

if __name__ == "__main__":
    update_slide_parser()
    update_lessons_data()
