#!/usr/bin/env python3
import json
import re

SLIDE_PARSER_PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/utils/slideParser.js"
LESSONS_DATA_PATH = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json"

NEW_LESSON_13_SLIDES = """function buildLesson13Slides(doc, lesson, slides) {
  // 1. Part I Section Break: Localization (Vivid, High-Contrast Title Slide)
  slides.push({
    id: `${lesson.id}_sec_title_localization`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part I: Localization',
    badge: '📍 Part I',
    title: 'Part I: Robot Localization Foundations',
    htmlContent: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 380px; text-align: center;">
        <div style="background: #0f172a; border: 2px solid #eab308; border-radius: 16px; padding: 2.2rem 2.8rem; box-shadow: 0 12px 36px rgba(0,0,0,0.6); max-width: 720px; width: 100%;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(234, 179, 8, 0.2); border: 1px solid #eab308; padding: 0.35rem 1rem; border-radius: 9999px; margin-bottom: 1.2rem;">
            <span style="font-size: 1.1rem;">📍</span>
            <span style="font-size: 0.85rem; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.12em;">Part I &bull; Theory &amp; Foundations</span>
          </div>
          <h1 style="font-size: 3.5rem; font-weight: 900; color: #fbbf24; margin: 0 0 0.85rem 0; letter-spacing: -0.02em; text-shadow: 0 4px 20px rgba(234, 179, 8, 0.35);">
            Localization
          </h1>
          <p style="font-size: 1.05rem; color: #f8fafc; line-height: 1.6; margin: 0; font-weight: 500;">
            Estimating the pose of an Autonomous Mobile Robot (AMR) <code style="color: #fbbf24; background: rgba(255,255,255,0.1); padding: 0.15rem 0.4rem; border-radius: 4px;">(x, y, &theta;) &isin; SE(2)</code> in a known environmental map given sensor observations and motion control inputs.
          </p>
        </div>
      </div>
    `
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

  // 4. AMCL Measurement Representation (Slide 129)
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

  // 5. AMCL Step 1: Global Uniform Particle Distribution
  slides.push({
    id: `${lesson.id}_sec1_amcl_step1_uniform`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '1. AMCL Step 1: Uniform Particles',
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

  // 6. AMCL Step 2: Anatomy of the Particle State Vector
  slides.push({
    id: `${lesson.id}_sec1_amcl_step2_state_vector`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '2. AMCL Step 2: State Vector',
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

  // 7. AMCL Step 3: Motion Prediction & Measurement Likelihood Weighting
  slides.push({
    id: `${lesson.id}_sec1_amcl_step3_weight_filtering`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '3. AMCL Step 3: Motion & Weighting',
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

  // 8. AMCL Step 4: Importance Resampling & Pose Convergence
  slides.push({
    id: `${lesson.id}_sec1_amcl_step4_convergence`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '4. AMCL Step 4: Resampling & Convergence',
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

  // 9. Localization Challenges: Position Tracking
  slides.push({
    id: `${lesson.id}_sec2_position_tracking`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '5. Challenges: Position Tracking',
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

  // 10. Localization Challenges: The Kidnapped Robot Problem
  slides.push({
    id: `${lesson.id}_sec2_kidnapped_robot`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: '6. Challenges: Kidnapped Robot',
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

  // 11. Part II Section Break: Mapping (Vivid, High-Contrast Title Slide)
  slides.push({
    id: `${lesson.id}_sec_title_mapping`,
    type: 'concept',
    lessonNum: lesson.num_str,
    lessonId: lesson.id,
    module: lesson.module,
    sectionTitle: 'Part II: Mapping',
    badge: '🗺️ Part II',
    title: 'Part II: Occupancy Grid Mapping & Discretization',
    htmlContent: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 380px; text-align: center;">
        <div style="background: #0f172a; border: 2px solid #38bdf8; border-radius: 16px; padding: 2.2rem 2.8rem; box-shadow: 0 12px 36px rgba(0,0,0,0.6); max-width: 720px; width: 100%;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(56, 189, 248, 0.2); border: 1px solid #38bdf8; padding: 0.35rem 1rem; border-radius: 9999px; margin-bottom: 1.2rem;">
            <span style="font-size: 1.1rem;">🗺️</span>
            <span style="font-size: 0.85rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.12em;">Part II &bull; Spatial Representation</span>
          </div>
          <h1 style="font-size: 3.5rem; font-weight: 900; color: #38bdf8; margin: 0 0 0.85rem 0; letter-spacing: -0.02em; text-shadow: 0 4px 20px rgba(56, 189, 248, 0.35);">
            Mapping
          </h1>
          <p style="font-size: 1.05rem; color: #f8fafc; line-height: 1.6; margin: 0; font-weight: 500;">
            Produce an accurate metric occupancy grid map of the operational warehouse environment given the robot pose(s) and laser rangefinder observations.
          </p>
        </div>
      </div>
    `
  });

  // 12. Mapping Step 1: Discretizing Continuous Space into a 2D Grid Lattice
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

  // 13. Mapping Step 2: Binary Cell States
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

  // 14. Mapping Step 3: Full Warehouse Discretized Binary Matrix
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

  // 15. Mapping Step 4: The LiDAR Measurement Cone & Log-Odds Bayesian Updates
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

  // 16. The Fundamental SLAM Dilemma & Classical Dataflow Architecture
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
            <strong>💡 Transition to Practice:</strong> Now let us implement the complete step-by-step ROS 2 SLAM Toolbox practical pipeline!
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
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>slam_toolbox Package</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The official, industry-standard 2D LiDAR SLAM framework for ROS 2. Provides pose graph optimization and lifelong mapping capabilities.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧭</span><strong>navigation2 & nav2_bringup</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Provides the complete Nav2 autonomy stack, lifecycle management nodes, and the essential <code>nav2_map_server</code> map serialization CLI.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Binary Distribution via APT</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pre-compiled binaries ensure exact shared-library linking against Ubuntu 22.04 LTS and ROS 2 Humble without lengthy C++ compilation times.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash terminal</span><strong>APT Installation Command</strong></div>
            <pre><code class="language-bash">sudo apt update
sudo apt install -y \\
  ros-humble-slam-toolbox \\
  ros-humble-navigation2 \\
  ros-humble-nav2-bringup</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
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
    sectionTitle: 'Step 2: Create Mapping Package',
    badge: '📁 Practical Step 2 / 6',
    title: 'Practical Step 2: Create Mapping Package in Workspace',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏗️</span><strong>nexus_amr_mapping Package</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Create a dedicated Python ROS 2 package housing configuration files, launch scripts, and output map directories for the warehouse AMR.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📁</span><strong>Subdirectory Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>config/</code> for YAML tuning, <code>launch/</code> for Python launch orchestrations, and <code>maps/</code> for storing serialized occupancy grids.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>setup.py Data Files Export</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Register <code>config/*.yaml</code> and <code>launch/*.launch.py</code> in <code>setup.py</code> so <code>colcon build</code> installs them to <code>install/nexus_amr_mapping/share/</code>.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash terminal</span><strong>Package Creation & Directory Setup</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python nexus_amr_mapping \\
  --dependencies rclpy slam_toolbox nav2_map_server

cd nexus_amr_mapping
mkdir -p config launch maps rviz</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
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
    sectionTitle: 'Step 3: Add Config & Launch Files',
    badge: '⚙️ Practical Step 3 / 6',
    title: 'Practical Step 3: Add SLAM Configuration & Launch Files',
    htmlContent: `
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📄</span><strong>config/slam_toolbox.yaml</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Specifies <code>async_slam_toolbox_node</code> parameters: tracking frames (<code>map</code>, <code>odom</code>, <code>base_footprint</code>), <code>/scan</code> topic, and Ceres solver settings.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>launch/online_async_slam.launch.py</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Defines launch arguments (<code>use_sim_time</code>), declares the SLAM Toolbox node, and launches RViz2 with pre-configured laser visualization.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>Async Execution Mode</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The asynchronous mode processes sensor scans in a dedicated worker thread, preventing robot velocity pauses if Ceres optimization takes > 50ms.</p>
          </div>
        </div>
        <div class="l03-content-col">
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
    sectionTitle: 'Step 4: Tuning SLAM Configuration',
    badge: '🎛️ Practical Step 4 / 6',
    title: 'Practical Step 4: SLAM Configuration Parameter Tuning Matrix',
    htmlContent: `
      <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
        <table class="l03-table" style="width: 100%; border-collapse: collapse; font-size: 0.72rem;">
          <thead>
            <tr style="background: rgba(30, 41, 59, 0.8); color: #fbbf24; border-bottom: 2px solid #eab308;">
              <th style="padding: 0.3rem 0.5rem; text-align: left; width: 22%;">YAML Parameter</th>
              <th style="padding: 0.3rem 0.5rem; text-align: left; width: 14%;">Value</th>
              <th style="padding: 0.3rem 0.5rem; text-align: left; width: 38%;">Engineering Purpose</th>
              <th style="padding: 0.3rem 0.5rem; text-align: left; width: 26%;">Tuning Guidance</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.5rem;"><code>resolution</code></td>
              <td style="padding: 0.25rem 0.5rem;"><code>0.05</code></td>
              <td style="padding: 0.25rem 0.5rem;">Grid cell size (5 cm). Captures rack legs crisply.</td>
              <td style="padding: 0.25rem 0.5rem;">Lower to <code>0.03</code> for tight spaces; <code>0.05</code> for large hubs.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.5rem;"><code>max_laser_range</code></td>
              <td style="padding: 0.25rem 0.5rem;"><code>20.0</code></td>
              <td style="padding: 0.25rem 0.5rem;">Discards returns beyond 20 meters.</td>
              <td style="padding: 0.25rem 0.5rem;">Set to match physical LiDAR reliable range.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.5rem;"><code>minimum_travel_distance</code></td>
              <td style="padding: 0.25rem 0.5rem;"><code>0.20</code></td>
              <td style="padding: 0.25rem 0.5rem;">Requires 20 cm linear travel before new node.</td>
              <td style="padding: 0.25rem 0.5rem;">Prevents redundant pose nodes when stopped.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.5rem;"><code>minimum_travel_heading</code></td>
              <td style="padding: 0.25rem 0.5rem;"><code>0.20</code></td>
              <td style="padding: 0.25rem 0.5rem;">Requires ~11.5&deg; rotation before new node.</td>
              <td style="padding: 0.25rem 0.5rem;">Ensures angular scans during in-place turns.</td>
            </tr>
            <tr>
              <td style="padding: 0.25rem 0.5rem;"><code>loop_search_maximum_distance</code></td>
              <td style="padding: 0.25rem 0.5rem;"><code>3.0</code></td>
              <td style="padding: 0.25rem 0.5rem;">Radius for finding loop closure candidates.</td>
              <td style="padding: 0.25rem 0.5rem;">Keep &le; 3m to prevent false loop matches.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
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
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Terminal 1: Execute SLAM Launch</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 launch nexus_amr_mapping online_async_slam.launch.py</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🕹️</span><strong>Terminal 2: Launch Teleop Controller</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐢</span><strong>Driving Discipline (&le; 0.3 m/s)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Drive slowly. Drive perimeter walls first to close loops; then fill aisles. Avoid rapid in-place spins to ensure clean scan overlap.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/rviz2_live_slam_mapping.png" alt="RViz2 Live SLAM Mapping Interface" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Live RViz2 SLAM Mapping: Real-time OccupancyGrid growth, LaserScan, and TF tree links
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
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
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Execute map_saver_cli</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">While simulation and SLAM Toolbox are still active, invoke the map saver CLI in a new terminal to freeze the occupancy grid to disk:</p>
            <pre style="margin: 0.2rem 0; font-size: 0.68rem;"><code class="language-bash">ros2 run nav2_map_server map_saver_cli \\
  -f ~/ros2_ws/src/nexus_amr_mapping/maps/warehouse_map</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🖼️</span><strong>warehouse_map.pgm</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">8-bit grayscale image. <code>254</code> (White = Free floor), <code>0</code> (Black = Occupied obstacles/walls), <code>205</code> (Gray = Unknown space).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📄</span><strong>warehouse_map.yaml</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Metadata manifest defining <code>resolution: 0.05</code>, <code>origin: [-10.0, -10.0, 0.0]</code>, and occupancy thresholds for Nav2 costmaps.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse_map.yaml</span><strong>Saved Map Metadata Manifest</strong></div>
            <pre><code class="language-yaml">image: warehouse_map.pgm
mode: trinary
resolution: 0.05
origin: [-10.000000, -10.000000, 0.000000]
negate: 0
occupied_thresh: 0.65
free_thresh: 0.25</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>✅ Final Deliverable:</strong> These two map files are directly loaded by Nav2 <code>map_server</code> in Lesson 14 for autonomous warehouse navigation!
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
    print("Successfully replaced buildLesson13Slides with 6 practical steps and high-contrast title slides in slideParser.js!")

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
                {"id": "8-slam-dilemma-dataflow", "title": "8. The SLAM Dilemma &amp; Classical Dataflow Architecture"},
                {"id": "9-step1-install-packages", "title": "9. Step 1: Install Required ROS 2 Packages (slam_toolbox &amp; nav2)"},
                {"id": "10-step2-create-mapping-package", "title": "10. Step 2: Create Mapping Package in Workspace (nexus_amr_mapping)"},
                {"id": "11-step3-add-config-launch", "title": "11. Step 3: Add SLAM Configuration &amp; Launch Files"},
                {"id": "12-step4-tuning-config", "title": "12. Step 4: SLAM Configuration Parameter Tuning Matrix"},
                {"id": "13-step5-running-launch-teleop", "title": "13. Step 5: Running Launch File &amp; Teleop (Live Mapping in RViz2)"},
                {"id": "14-step6-saving-map-files", "title": "14. Step 6: Map Serialization &amp; Saving Map Files (.yaml &amp; .pgm)"},
                {"id": "15-hands-on-student-challenge", "title": "15. Hands-on Student Challenge: Online SLAM Mapping &amp; Relocalization Verification"}
            ]

            html = l.get("html_content", "")
            # Update the Practical Steps headers to match the 6-step breakdown
            # Replace old section 5/6/7/8 headers
            html = re.sub(
                r'<h2 id="2-graph-slam-architecture">5\. The SLAM Dilemma[\s\S]*?<\/div>\s*<\/div>',
                '''<h2 id="8-slam-dilemma-dataflow">8. The Fundamental SLAM Dilemma &amp; Classical Dataflow Architecture</h2>
<p><img src="assets/images/slam_dataflow_architecture.png" alt="Classical SLAM Dataflow Architecture" class="lesson-image" style="max-height: 320px; object-fit: contain; margin-bottom: 1.25rem;" loading="lazy" /></p>
<div class="alert-callout alert-tip" style="margin: 1.5rem 0;">
  <div class="alert-icon">💡</div>
  <div class="alert-body">
    <strong>The Chicken-or-Egg Problem:</strong> To build an accurate map, the robot must know its precise pose. To determine its pose, the robot needs an accurate map. SLAM solves this by jointly optimizing trajectory and spatial occupancy over time.
  </div>
</div>''',
                html
            )

            # Update practical steps in html_content
            practical_html = """
<h2 id="9-step1-install-packages">9. Step 1: Install Required ROS 2 Packages</h2>
<p>Install the official ROS 2 SLAM Toolbox and Navigation2 packages via APT:</p>
<pre><code class="language-bash">sudo apt update
sudo apt install -y \\
  ros-humble-slam-toolbox \\
  ros-humble-navigation2 \\
  ros-humble-nav2-bringup</code></pre>

<h2 id="10-step2-create-mapping-package">10. Step 2: Create Mapping Package in Workspace</h2>
<p>Create a dedicated package <code class="inline-code">nexus_amr_mapping</code> inside your workspace <code class="inline-code">~/ros2_ws/src</code>:</p>
<pre><code class="language-bash">cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python nexus_amr_mapping \\
  --dependencies rclpy slam_toolbox nav2_map_server

cd nexus_amr_mapping
mkdir -p config launch maps rviz</code></pre>

<h2 id="11-step3-add-config-launch">11. Step 3: Add SLAM Configuration &amp; Launch Files</h2>
<p>Create <code class="inline-code">config/slam_toolbox.yaml</code> to configure tracking frames, laser ranges, and loop closure. Then create <code class="inline-code">launch/online_async_slam.launch.py</code> to launch the node with simulation time.</p>

<h2 id="12-step4-tuning-config">12. Step 4: SLAM Configuration Parameter Tuning Matrix</h2>
<table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.85rem;">
  <thead>
    <tr style="background: rgba(30, 41, 59, 0.8); color: #fbbf24; border-bottom: 2px solid #eab308;">
      <th style="padding: 0.6rem; text-align: left;">Parameter</th>
      <th style="padding: 0.6rem; text-align: left;">Default</th>
      <th style="padding: 0.6rem; text-align: left;">Description</th>
      <th style="padding: 0.6rem; text-align: left;">Tuning Recommendation</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.6rem;"><code>resolution</code></td>
      <td style="padding: 0.6rem;"><code>0.05</code></td>
      <td style="padding: 0.6rem;">Map resolution in meters/cell (5 cm).</td>
      <td style="padding: 0.6rem;">Lower to 0.03 for tight spaces; 0.05 for warehouse floors.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.6rem;"><code>max_laser_range</code></td>
      <td style="padding: 0.6rem;"><code>20.0</code></td>
      <td style="padding: 0.6rem;">Maximum valid LiDAR range in meters.</td>
      <td style="padding: 0.6rem;">Matches physical sensor range to discard distant noise.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.6rem;"><code>minimum_travel_distance</code></td>
      <td style="padding: 0.6rem;"><code>0.20</code></td>
      <td style="padding: 0.6rem;">Linear distance before adding new pose graph node.</td>
      <td style="padding: 0.6rem;">Prevents redundant pose nodes when AMR is stationary.</td>
    </tr>
    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <td style="padding: 0.6rem;"><code>loop_search_maximum_distance</code></td>
      <td style="padding: 0.6rem;"><code>3.0</code></td>
      <td style="padding: 0.6rem;">Radius for finding loop closure candidates.</td>
      <td style="padding: 0.6rem;">Restricts search to &le; 3.0m to prevent false matches.</td>
    </tr>
  </tbody>
</table>

<h2 id="13-step5-running-launch-teleop">13. Step 5: Running Launch File &amp; Teleop (Live Mapping in RViz2)</h2>
<p>Launch simulation and SLAM Toolbox, then drive the robot smoothly using teleop:</p>
<pre><code class="language-bash"># Terminal 1: Launch SLAM Toolbox
ros2 launch nexus_amr_mapping online_async_slam.launch.py

# Terminal 2: Launch Keyboard Teleop
ros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre>
<p><img src="assets/images/rviz2_live_slam_mapping.png" alt="Live RViz2 SLAM Mapping Interface" class="lesson-image" style="max-height: 320px; object-fit: contain; margin: 1rem 0;" loading="lazy" /></p>

<h2 id="14-step6-saving-map-files">14. Step 6: Map Serialization &amp; Saving Map Files (.yaml &amp; .pgm)</h2>
<p>Freeze the completed SLAM occupancy grid to disk using the <code class="inline-code">map_saver_cli</code>:</p>
<pre><code class="language-bash">ros2 run nav2_map_server map_saver_cli \\
  -f ~/ros2_ws/src/nexus_amr_mapping/maps/warehouse_map</code></pre>
<p>This outputs two files: <code>warehouse_map.pgm</code> (the 8-bit occupancy grid raster) and <code>warehouse_map.yaml</code> (metadata containing resolution, origin, and thresholds).</p>
"""
            # Replace older sections 6, 7, 8 in html
            old_sec_pattern = r'<h2 id="6-deep-dive-config-slam-toolbox-yaml">[\s\S]*?(?=<h2 id="9-hands-on-student-challenge">|<h2 id="15-hands-on-student-challenge">)'
            if re.search(old_sec_pattern, html):
                html = re.sub(old_sec_pattern, practical_html + '\n', html)
            l["html_content"] = html
            print("Successfully updated lesson_13 html_content with practical 6-step workflow!")

    with open(LESSONS_DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Successfully updated lessonsData.json!")

if __name__ == "__main__":
    update_slide_parser()
    update_lessons_data()
