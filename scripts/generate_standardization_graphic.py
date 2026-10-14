import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Stop Reinventing the Wheel & Standardize Communication</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1920px;
      height: 1080px;
      background: radial-gradient(circle at 50% 15%, #0f172a 0%, #070c17 65%, #02050b 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif;
      color: #f8fafc;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    /* Background subtle grid */
    .bg-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
    }

    /* Ambient glow orbs */
    .glow-orb-red {
      position: absolute;
      top: 220px;
      left: 120px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%);
      filter: blur(50px);
      pointer-events: none;
    }
    .glow-orb-blue {
      position: absolute;
      top: 180px;
      right: 180px;
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 75%);
      filter: blur(60px);
      pointer-events: none;
    }

    /* Header Section */
    .header {
      padding: 44px 80px 20px;
      text-align: center;
      position: relative;
      z-index: 10;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(14, 165, 233, 0.14);
      border: 1px solid rgba(14, 165, 233, 0.35);
      padding: 6px 20px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #38bdf8;
      margin-bottom: 12px;
      box-shadow: 0 0 20px rgba(14, 165, 233, 0.2);
    }
    .title {
      font-size: 44px;
      font-weight: 900;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 19px;
      color: #94a3b8;
      max-width: 960px;
      margin: 0 auto;
      line-height: 1.4;
    }

    /* Main Comparison Container */
    .main-container {
      flex: 1;
      display: grid;
      grid-template-columns: 530px 90px 1fr;
      padding: 8px 80px 45px;
      gap: 26px;
      align-items: center;
      position: relative;
      z-index: 10;
    }

    /* Left Card: The Reinvention Trap */
    .left-panel {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(239, 68, 68, 0.35);
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 32px 30px;
      display: flex;
      flex-direction: column;
      height: 690px;
      position: relative;
    }
    .panel-badge-red {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(239, 68, 68, 0.16);
      border: 1px solid rgba(239, 68, 68, 0.45);
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 800;
      color: #f87171;
      width: fit-content;
      margin-bottom: 14px;
      letter-spacing: 0.5px;
    }
    .panel-title {
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .panel-desc {
      font-size: 14px;
      color: #94a3b8;
      line-height: 1.45;
      margin-bottom: 18px;
    }

    /* Visual: The Square Wheel & Tangled Mess */
    .square-wheel-box {
      flex: 1;
      background: rgba(0, 0, 0, 0.45);
      border: 1px dashed rgba(239, 68, 68, 0.4);
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      margin-bottom: 16px;
    }

    /* Center Transition Arrow */
    .arrow-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    .arrow-circle {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 35px rgba(14, 165, 233, 0.7);
    }
    .arrow-text {
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #38bdf8;
      text-align: center;
    }

    /* Right Card: Standardized ROS 2 & Global Sharing */
    .right-panel {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(14, 165, 233, 0.4);
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      padding: 32px 34px;
      display: flex;
      flex-direction: column;
      height: 690px;
      position: relative;
    }
    .panel-badge-blue {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(14, 165, 233, 0.16);
      border: 1px solid rgba(14, 165, 233, 0.45);
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 800;
      color: #38bdf8;
      width: fit-content;
      margin-bottom: 14px;
      letter-spacing: 0.5px;
    }

    /* Hub inside Right Panel */
    .bus-hub-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Top: Global Community Cloud Layer */
    .community-cloud-bar {
      background: linear-gradient(90deg, rgba(99, 102, 241, 0.22), rgba(14, 165, 233, 0.22));
      border: 1px solid rgba(14, 165, 233, 0.45);
      border-radius: 14px;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .community-cloud-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      font-weight: 800;
      color: #f1f5f9;
    }
    .community-tag-list {
      display: flex;
      gap: 8px;
    }
    .cloud-pill {
      background: rgba(14, 165, 233, 0.28);
      border: 1px solid rgba(14, 165, 233, 0.55);
      color: #bae6fd;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 800;
      font-family: monospace;
    }

    /* Middle: Universal Standard Data Bus */
    .data-bus-ribbon {
      background: #090e1a;
      border: 2px solid #0ea5e9;
      border-radius: 16px;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      position: relative;
      box-shadow: 0 0 30px rgba(14, 165, 233, 0.3), inset 0 0 15px rgba(14, 165, 233, 0.1);
    }
    .bus-label {
      position: absolute;
      top: -12px;
      left: 24px;
      background: #0ea5e9;
      color: #04070d;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 1.5px;
      padding: 3px 12px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .standard-topic-box {
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 12px;
      padding: 12px 18px;
      text-align: center;
      min-width: 175px;
    }
    .topic-name {
      font-size: 16px;
      font-weight: 800;
      color: #38bdf8;
      font-family: monospace;
      margin-bottom: 3px;
    }
    .topic-desc {
      font-size: 12px;
      color: #94a3b8;
    }

    /* Bottom: The Diverse Multi-Robot Fleet */
    .robot-fleet-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 4px;
    }
    .robot-card {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .robot-icon-wrap {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: rgba(14, 165, 233, 0.14);
      border: 1px solid rgba(14, 165, 233, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      margin-bottom: 10px;
    }
    .robot-name {
      font-size: 15px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .robot-shared-feature {
      font-size: 12px;
      color: #34d399;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.14);
      padding: 4px 10px;
      border-radius: 6px;
      margin-top: 6px;
    }

    /* Bottom Key Takeaway Bar */
    .takeaway-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 12px;
      padding: 14px 22px;
      margin-top: 14px;
      font-size: 13.5px;
      color: #f1f5f9;
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="glow-orb-red"></div>
  <div class="glow-orb-blue"></div>

  <!-- Header -->
  <div class="header">
    <div class="eyebrow">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      The Robotics Paradigm Shift
    </div>
    <h1 class="title">Stop Reinventing the Wheel &amp; Standardize Communication</h1>
    <p class="subtitle">From custom isolated plumbing that gets abandoned, to an open-source global community where every robot speaks standard interfaces.</p>
  </div>

  <!-- Main Comparison Area -->
  <div class="main-container">

    <!-- LEFT PANEL: The Trap -->
    <div class="left-panel">
      <div class="panel-badge-red">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        THE REINVENTION TRAP (BEFORE ROS)
      </div>
      <h2 class="panel-title">Isolated Square Wheels</h2>
      <p class="panel-desc">Every developer spends 80% of project time writing low-level serial drivers, socket math, and custom messaging formats that cannot be reused.</p>

      <!-- Visual Graphic: Robot on Square Wheels with Red Warning & Tangled Wires -->
      <div class="square-wheel-box">
        <svg width="340" height="210" viewBox="0 0 340 210" fill="none">
          <!-- Ground line with friction sparks -->
          <line x1="20" y1="185" x2="320" y2="185" stroke="#475569" stroke-width="2" stroke-dasharray="8 6"/>
          
          <!-- Friction sparks under front wheel -->
          <path d="M85 185 L75 195 M95 185 L105 193 M88 185 L85 198" stroke="#ef4444" stroke-width="2"/>
          <path d="M235 185 L225 195 M245 185 L255 193 M238 185 L235 198" stroke="#ef4444" stroke-width="2"/>

          <!-- Robot Chassis (Tilted struggling) -->
          <rect x="60" y="70" width="200" height="60" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="2" transform="rotate(-3 160 100)"/>
          
          <!-- Tangled Spaghetti Wires over chassis -->
          <path d="M40 100 Q80 40 110 90 T180 50 T250 110 T300 75" stroke="#f59e0b" stroke-width="3" fill="none"/>
          <path d="M50 115 Q100 135 150 75 T230 130 T280 85" stroke="#ef4444" stroke-width="2.5" fill="none"/>
          <path d="M70 65 Q130 110 180 60 T260 85" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4" fill="none"/>

          <!-- Disconnected sensor blinking red -->
          <circle cx="160" cy="55" r="14" fill="#0f172a" stroke="#ef4444" stroke-width="2.5"/>
          <circle cx="160" cy="55" r="5" fill="#ef4444"/>
          <text x="160" y="32" fill="#f87171" font-size="10" font-weight="800" text-anchor="middle">CUSTOM SENSOR</text>

          <!-- FRONT SQUARE WHEEL -->
          <g transform="rotate(18 90 155)">
            <rect x="62" y="127" width="56" height="56" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
            <circle cx="90" cy="155" r="8" fill="#ef4444"/>
            <line x1="90" y1="127" x2="90" y2="183" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
            <line x1="62" y1="155" x2="118" y2="155" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
          </g>

          <!-- REAR SQUARE WHEEL -->
          <g transform="rotate(-12 230 155)">
            <rect x="202" y="127" width="56" height="56" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
            <circle cx="230" cy="155" r="8" fill="#ef4444"/>
            <line x1="230" y1="127" x2="230" y2="183" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
            <line x1="202" y1="155" x2="258" y2="155" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
          </g>

          <!-- Red Alert Pill Floating Above -->
          <rect x="90" y="8" width="140" height="24" rx="6" fill="#ef4444"/>
          <text x="160" y="24" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1">PROPRIETARY SILO</text>
        </svg>

        <div style="margin-top: 10px; text-align: center;">
          <div style="font-size: 14px; font-weight: 800; color: #f87171; margin-bottom: 2px;">Friction, Breakdowns &amp; Code Abandonment</div>
          <div style="font-size: 12px; color: #94a3b8;">Custom binary protocols &bull; Incompatible drivers &bull; Abandoned code</div>
        </div>
      </div>

      <!-- Cost Summary Pills -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); padding: 8px 14px; border-radius: 8px; font-size: 12px;">
          <span style="color: #fca5a5; font-weight: 800;">80% Wasted Plumbing:</span>
          <span style="color: #cbd5e1;">Writing custom UART, USB, TCP sockets</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); padding: 8px 14px; border-radius: 8px; font-size: 12px;">
          <span style="color: #fca5a5; font-weight: 800;">0% Community Reusability:</span>
          <span style="color: #cbd5e1;">Next engineer is forced to start from scratch</span>
        </div>
      </div>
    </div>

    <!-- CENTER ARROW -->
    <div class="arrow-divider">
      <div class="arrow-circle">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
      <div class="arrow-text">
        TRANSFORM<br>TO ROS 2
      </div>
    </div>

    <!-- RIGHT PANEL: Standardized Ecosystem -->
    <div class="right-panel">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="panel-badge-blue">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            THE ROS 2 STANDARD (MODULAR &amp; SHARED)
          </div>
          <h2 class="panel-title">Universal Communication Hub</h2>
        </div>
        <div style="text-align: right;">
          <span style="background: rgba(16, 185, 129, 0.18); color: #34d399; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.45); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);">
            90% Real Robotics Autonomy
          </span>
        </div>
      </div>
      <p class="panel-desc">Standardized message definitions (Topics, Services, Actions) create a universal software bus. Any node can plug in, listen, and control hardware seamlessly.</p>

      <div class="bus-hub-container">
        
        <!-- 1. Global Community Cloud Node -->
        <div class="community-cloud-bar">
          <div class="community-cloud-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
            <span>Global Open-Source Community Ecosystem</span>
          </div>
          <div class="community-tag-list">
            <span class="cloud-pill">Nav2</span>
            <span class="cloud-pill">SLAM Toolbox</span>
            <span class="cloud-pill">MoveIt 2</span>
            <span class="cloud-pill">TF2 Transform</span>
            <span class="cloud-pill">RViz2</span>
          </div>
        </div>

        <!-- 2. Universal Data Highway (DDS Bus) -->
        <div class="data-bus-ribbon">
          <div class="bus-label">Universal ROS 2 DDS Bus Standard</div>
          
          <div class="standard-topic-box">
            <div class="topic-name">/scan</div>
            <div class="topic-desc">sensor_msgs/LaserScan<br><strong style="color: #38bdf8;">Standard 2D/3D Obstacles</strong></div>
          </div>

          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2.5"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></svg>

          <div class="standard-topic-box" style="border-color: rgba(139, 92, 246, 0.5);">
            <div class="topic-name" style="color: #c084fc;">/cmd_vel</div>
            <div class="topic-desc">geometry_msgs/Twist<br><strong style="color: #c084fc;">Universal Velocity (v, &omega;)</strong></div>
          </div>

          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2.5"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></svg>

          <div class="standard-topic-box" style="border-color: rgba(16, 185, 129, 0.5);">
            <div class="topic-name" style="color: #34d399;">/odom &amp; /tf</div>
            <div class="topic-desc">nav_msgs/Odometry<br><strong style="color: #34d399;">Global Frame Localization</strong></div>
          </div>
        </div>

        <!-- 3. Multi-Robot Compatibility (Community Sharing in Action) -->
        <div class="robot-fleet-grid">
          
          <!-- Robot 1: Warehouse AMR -->
          <div class="robot-card">
            <div class="robot-icon-wrap" style="color: #38bdf8;">🤖</div>
            <div class="robot-name">Autonomous Mobile Robot (AMR)</div>
            <div style="font-size: 11.5px; color: #94a3b8;">Differential drive warehouse cart</div>
            <div class="robot-shared-feature">Uses Nav2 + SLAM Toolbox</div>
          </div>

          <!-- Robot 2: Robotic Arm -->
          <div class="robot-card">
            <div class="robot-icon-wrap" style="color: #c084fc;">🦾</div>
            <div class="robot-name">6-DOF Robotic Manipulator</div>
            <div style="font-size: 11.5px; color: #94a3b8;">Factory assembly &amp; picking arm</div>
            <div class="robot-shared-feature" style="color: #c084fc; background: rgba(192, 132, 252, 0.14);">Uses MoveIt 2 Trajectories</div>
          </div>

          <!-- Robot 3: Delivery Rover -->
          <div class="robot-card">
            <div class="robot-icon-wrap" style="color: #34d399;">🚗</div>
            <div class="robot-name">Last-Mile Delivery Rover</div>
            <div style="font-size: 11.5px; color: #94a3b8;">Ackermann steering sidewalk robot</div>
            <div class="robot-shared-feature" style="color: #38bdf8; background: rgba(56, 189, 248, 0.14);">Same /cmd_vel &amp; /scan API</div>
          </div>

        </div>

        <!-- Takeaway bar -->
        <div class="takeaway-bar">
          <div style="display: flex; align-items: center; gap: 10px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
            <div><strong>The Breakthrough:</strong> Write your application code once; run it on ANY robot equipped with standard ROS drivers!</div>
          </div>
          <span style="font-weight: 800; color: #34d399; font-size: 12px; letter-spacing: 0.5px;">PLUG-AND-PLAY ECOSYSTEM</span>
        </div>

      </div>
    </div>

  </div>
</body>
</html>
"""

html_path = "/tmp/standardized_hub_graphic.html"
with open(html_path, "w") as f:
    f.write(html_content)

print("Updated HTML mockup at", html_path)
