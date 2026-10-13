// NavPro Learning Hub - Master Web Application & High-Tech Robotics Simulators

document.addEventListener('DOMContentLoaded', () => {
  initSimulators();
  initProgressTracker();
  initSidebarScroll();
  initSearch();
  initCopyButtons();
  initVisualizerTabs();
  initTheme();
});

// =============================================================================
// 1. INTERACTIVE ROBOTICS GRAPHICS & SIMULATORS
// =============================================================================

function initSimulators() {
  initDiffDriveSim();
  initPubSubSim();
  initLidarSim();
  initSlamLoopSim();
  initNav2PlannerSim();
  initCostmapSim();
  initPermissionsSim();
  initBehaviorTreeSim();
}

// --- 1.1 DIFFERENTIAL DRIVE KINEMATICS SIMULATOR ---
function initDiffDriveSim() {
  const canvas = document.getElementById('diffDriveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const vSlider = document.getElementById('simVLinear');
  const wSlider = document.getElementById('simWAngular');
  const vVal = document.getElementById('simVLinearVal');
  const wVal = document.getElementById('simWAngularVal');
  const resetBtn = document.getElementById('simResetBtn');
  
  const hudVl = document.getElementById('hudVl');
  const hudVr = document.getElementById('hudVr');
  const hudPose = document.getElementById('hudPose');

  const L = 0.28; // track width (m)
  const scale = 80;

  let robot = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    theta: -Math.PI / 2,
    trail: []
  };

  function resetRobot() {
    robot.x = canvas.width / 2;
    robot.y = canvas.height / 2;
    robot.theta = -Math.PI / 2;
    robot.trail = [];
    if (vSlider) vSlider.value = 0.2;
    if (wSlider) wSlider.value = 0.4;
    updateLabels();
  }

  if (resetBtn) resetBtn.addEventListener('click', resetRobot);

  function updateLabels() {
    if (vVal && vSlider) vVal.textContent = parseFloat(vSlider.value).toFixed(2) + ' m/s';
    if (wVal && wSlider) wVal.textContent = parseFloat(wSlider.value).toFixed(2) + ' rad/s';
  }

  if (vSlider) vSlider.addEventListener('input', updateLabels);
  if (wSlider) wSlider.addEventListener('input', updateLabels);
  updateLabels();

  let lastTime = performance.now();

  function animate(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    const v = vSlider ? parseFloat(vSlider.value) : 0;
    const w = wSlider ? parseFloat(wSlider.value) : 0;

    const vL = v - (w * L) / 2.0;
    const vR = v + (w * L) / 2.0;

    robot.x += v * Math.cos(robot.theta) * dt * scale;
    robot.y += v * Math.sin(robot.theta) * dt * scale;
    robot.theta += w * dt;

    if (robot.x < 30) robot.x = canvas.width - 30;
    if (robot.x > canvas.width - 30) robot.x = 30;
    if (robot.y < 30) robot.y = canvas.height - 30;
    if (robot.y > canvas.height - 30) robot.y = 30;

    robot.trail.push({ x: robot.x, y: robot.y });
    if (robot.trail.length > 200) robot.trail.shift();

    if (hudVl) hudVl.textContent = vL.toFixed(3) + ' m/s';
    if (hudVr) hudVr.textContent = vR.toFixed(3) + ' m/s';
    if (hudPose) {
      const realX = ((robot.x - canvas.width / 2) / scale).toFixed(2);
      const realY = (-(robot.y - canvas.height / 2) / scale).toFixed(2);
      const deg = (((robot.theta * 180) / Math.PI) % 360).toFixed(1);
      hudPose.textContent = `x=${realX}m, y=${realY}m, θ=${deg}°`;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid (Subtle light grid)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 35) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 35) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Trajectory (Cobalt blue trail)
    if (robot.trail.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.45)';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < robot.trail.length; i++) {
        const pt = robot.trail[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    // Robot Body
    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.rotate(robot.theta + Math.PI / 2);

    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(-18, -24, 36, 48, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(-5, -10);
    ctx.lineTo(5, -10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-24, -6, 6, 18);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(18, -6, 6, 18);

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -6, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// --- 1.2 DDS PUB/SUB LIVE PARTICLE STREAMER ---
function initPubSubSim() {
  const canvas = document.getElementById('ddsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const rateSlider = document.getElementById('ddsRateSlider');
  const rateVal = document.getElementById('ddsRateVal');
  const qosSelect = document.getElementById('ddsQosSelect');
  const statsSpan = document.getElementById('ddsStats');

  let packets = [];
  let sentCount = 0;
  let recvCount = 0;
  let lastSpawn = 0;

  function updateRate() {
    if (rateVal && rateSlider) rateVal.textContent = rateSlider.value + ' Hz';
  }
  if (rateSlider) rateSlider.addEventListener('input', updateRate);
  updateRate();

  function animate(now) {
    const rate = rateSlider ? parseInt(rateSlider.value) : 8;
    const interval = 1000 / rate;

    if (now - lastSpawn > interval) {
      lastSpawn = now;
      sentCount++;
      const isReliable = qosSelect ? qosSelect.value === 'reliable' : true;
      const willDrop = !isReliable && Math.random() < 0.28;

      packets.push({
        x: 140,
        progress: 0,
        dropped: willDrop
      });
    }

    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += 0.016;
      p.x = 140 + p.progress * (canvas.width - 280);

      if (p.dropped && p.progress > 0.5) {
        packets.splice(i, 1);
        continue;
      }

      if (p.progress >= 1.0) {
        recvCount++;
        packets.splice(i, 1);
      }
    }

    if (statsSpan) {
      const loss = sentCount > 0 ? (((sentCount - recvCount) / sentCount) * 100).toFixed(0) : 0;
      statsSpan.textContent = `Sent: ${sentCount} | Received: ${recvCount} | Packet Loss: ${loss}%`;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = canvas.height / 2;

    // Pipe
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(140, centerY);
    ctx.lineTo(canvas.width - 140, centerY);
    ctx.stroke();

    // Node Box: Talker
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(20, centerY - 38, 120, 76, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Publisher Node', 80, centerY - 14);
    ctx.fillStyle = '#0284c7';
    ctx.font = '10px monospace';
    ctx.fillText('/talker_node', 80, centerY + 5);
    ctx.fillStyle = '#64748b';
    ctx.fillText('pub.publish(msg)', 80, centerY + 22);

    // Topic Marker (Center)
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, centerY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('DDS', canvas.width / 2, centerY + 3);

    ctx.fillStyle = '#6b21a8';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('/cmd_vel (Twist)', canvas.width / 2, centerY - 20);

    // Node Box: Listener
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(canvas.width - 140, centerY - 38, 120, 76, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px system-ui';
    ctx.fillText('Subscriber Node', canvas.width - 80, centerY - 14);
    ctx.fillStyle = '#059669';
    ctx.font = '10px monospace';
    ctx.fillText('/listener_node', canvas.width - 80, centerY + 5);
    ctx.fillStyle = '#64748b';
    ctx.fillText('callback(msg)', canvas.width - 80, centerY + 22);

    // Render Packets
    for (const p of packets) {
      ctx.fillStyle = p.dropped ? '#ef4444' : '#0284c7';
      ctx.beginPath();
      ctx.arc(p.x, centerY, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// --- 1.3 2D LIDAR 360-DEGREE RAY-TRACING VISUALIZER ---
function initLidarSim() {
  const canvas = document.getElementById('lidarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let angle = 0;
  const obstacles = [
    { x: 120, y: 80, w: 60, h: 60 },
    { x: 420, y: 60, w: 80, h: 50 },
    { x: 260, y: 180, w: 70, h: 70 },
    { x: 500, y: 190, w: 60, h: 60 }
  ];

  function animate() {
    angle += 0.035;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Draw Room Walls
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 20, canvas.width - 60, canvas.height - 40);

    // Draw Obstacles
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    obstacles.forEach(o => {
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    });

    // Cast 72 LiDAR Rays
    const numRays = 72;
    ctx.lineWidth = 1;
    for (let i = 0; i < numRays; i++) {
      const rayAngle = angle + (i * Math.PI * 2) / numRays;
      const maxDist = 260;
      let hitDist = maxDist;

      // Simple ray check against obstacles
      for (let d = 10; d < maxDist; d += 6) {
        const rx = cx + Math.cos(rayAngle) * d;
        const ry = cy + Math.sin(rayAngle) * d;

        // Wall check
        if (rx < 30 || rx > canvas.width - 30 || ry < 20 || ry > canvas.height - 20) {
          hitDist = d;
          break;
        }

        // Obstacle check
        let hit = false;
        for (const o of obstacles) {
          if (rx >= o.x && rx <= o.x + o.w && ry >= o.y && ry <= o.y + o.h) {
            hitDist = d;
            hit = true;
            break;
          }
        }
        if (hit) break;
      }

      const endX = cx + Math.cos(rayAngle) * hitDist;
      const endY = cy + Math.sin(rayAngle) * hitDist;

      // Laser beam (Cobalt blue ray)
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.18)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Laser Return Point (LaserScan range reading)
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(endX, endY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Robot Chassis at Center
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // LiDAR Puck
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// --- 1.4 SLAM POSE GRAPH & LOOP CLOSURE SIMULATOR ---
function initSlamLoopSim() {
  const canvas = document.getElementById('slamCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const snapBtn = document.getElementById('slamSnapBtn');
  const statusSpan = document.getElementById('slamStatus');

  let snapped = false;
  let progress = 0;

  if (snapBtn) {
    snapBtn.addEventListener('click', () => {
      snapped = !snapped;
      snapBtn.textContent = snapped ? '↺ Introduce Odometry Drift' : '✨ Trigger Loop Closure';
      if (statusSpan) {
        statusSpan.innerHTML = snapped 
          ? '<span style="color:#10b981; font-weight:bold;">Loop Closure Active: Ceres solver mathematically straightened accumulated drift!</span>'
          : '<span style="color:#f59e0b;">Drifting: Wheel slippage causing pose graph to bend away from ground truth.</span>';
      }
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Ground Truth Rectangular Aisle
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 150, cy - 80, 300, 160);

    // Drifting Pose Nodes (Loop of 16 nodes)
    const driftOffset = snapped ? 0 : 35;
    const nodes = [
      { x: cx - 150, y: cy - 80 },
      { x: cx - 50,  y: cy - 80 },
      { x: cx + 50,  y: cy - 80 },
      { x: cx + 150, y: cy - 80 + driftOffset * 0.2 },
      { x: cx + 150 + driftOffset * 0.4, y: cy },
      { x: cx + 150 + driftOffset * 0.7, y: cy + 80 + driftOffset * 0.5 },
      { x: cx + 50 + driftOffset * 0.8,  y: cy + 80 + driftOffset * 0.7 },
      { x: cx - 50 + driftOffset * 0.6,  y: cy + 80 + driftOffset * 0.9 },
      { x: cx - 150 + driftOffset * 0.4, y: cy + 80 + driftOffset * 1.0 },
      { x: cx - 150 + driftOffset * 0.2, y: cy },
      { x: cx - 150, y: cy - 80 }
    ];

    // Draw Pose Graph Edges
    ctx.strokeStyle = snapped ? '#059669' : '#d97706';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    nodes.forEach((n, idx) => {
      if (idx === 0) ctx.moveTo(n.x, n.y);
      else ctx.lineTo(n.x, n.y);
    });
    ctx.stroke();

    // Draw Nodes
    nodes.forEach(n => {
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // If snapped, draw Loop Closure Constraint Line
    if (snapped) {
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[nodes.length - 2].x, nodes[nodes.length - 2].y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#059669';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('LOOP CONSTRAINT', cx - 140, cy + 30);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// --- 1.5 NAV2 PATH PLANNER & LOCAL CONTROLLER SIMULATOR ---
function initNav2PlannerSim() {
  const canvas = document.getElementById('nav2Canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const infoSpan = document.getElementById('nav2GoalInfo');

  let goal = { x: 500, y: 100 };
  let robot = { x: 80, y: 220, theta: 0 };
  const obstacles = [
    { x: 220, y: 70, w: 80, h: 120 },
    { x: 380, y: 150, w: 80, h: 120 }
  ];

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    goal.x = e.clientX - rect.left;
    goal.y = e.clientY - rect.top;
    if (infoSpan) infoSpan.textContent = `2D Nav Goal Set: (${goal.x.toFixed(0)}, ${goal.y.toFixed(0)})`;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obstacles (Clean alert fill)
    ctx.fillStyle = '#fef2f2';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    obstacles.forEach(o => {
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    });

    // Draw Planned Global Path (Smac Planner Waypoints avoiding obstacles)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(robot.x, robot.y);
    ctx.lineTo(200, 240);
    ctx.lineTo(340, 100);
    ctx.lineTo(goal.x, goal.y);
    ctx.stroke();

    // Goal Marker
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GOAL', goal.x, goal.y - 12);

    // Robot pursues towards waypoint
    const targetX = 200;
    const targetY = 240;
    const dx = targetX - robot.x;
    const dy = targetY - robot.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 5) {
      robot.x += (dx / dist) * 0.8;
      robot.y += (dy / dist) * 0.8;
    }

    // Robot
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(robot.x, robot.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.stroke();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// --- 1.6 COSTMAP 2D INFLATION EXPLORER ---
function initCostmapSim() {
  const canvas = document.getElementById('costmapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const alphaSlider = document.getElementById('costmapAlphaSlider');
  const alphaVal = document.getElementById('costmapAlphaVal');
  const infoSpan = document.getElementById('costmapInfo');

  function update() {
    if (!alphaSlider) return;
    const alpha = parseFloat(alphaSlider.value);
    if (alphaVal) alphaVal.textContent = alpha.toFixed(1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const rLethal = 22;
    const rInscribed = 48;
    const rMax = 115;

    for (let r = rMax; r >= rInscribed; r -= 2) {
      const dist = (r - rInscribed) / (rMax - rInscribed);
      const cost = Math.exp(-alpha * dist);
      ctx.fillStyle = `rgba(0, 242, 254, ${cost * 0.35})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, rInscribed, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(centerX - rLethal, centerY - rLethal, rLethal * 2, rLethal * 2);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LETHAL (254)', centerX, centerY + 3);

    if (infoSpan) {
      infoSpan.textContent = `Cost at Inscribed Radius: 253 | Cost at Edge (r=1.2m): ${(253 * Math.exp(-alpha)).toFixed(0)}`;
    }
  }

  if (alphaSlider) alphaSlider.addEventListener('input', update);
  update();
}

// --- 1.7 LINUX PERMISSIONS CALCULATOR ---
function initPermissionsSim() {
  const checkboxes = document.querySelectorAll('.perm-chk');
  const octalOut = document.getElementById('permOctal');
  const symOut = document.getElementById('permSymbolic');
  const dialoutBtn = document.getElementById('permDialoutBtn');
  const dialoutStatus = document.getElementById('permDialoutStatus');

  function update() {
    if (!octalOut || !symOut) return;
    let octal = '';
    let sym = '-';

    ['u', 'g', 'o'].forEach(target => {
      let sum = 0;
      const r = document.getElementById(`perm_${target}_r`)?.checked;
      const w = document.getElementById(`perm_${target}_w`)?.checked;
      const x = document.getElementById(`perm_${target}_x`)?.checked;

      if (r) { sum += 4; sym += 'r'; } else sym += '-';
      if (w) { sum += 2; sym += 'w'; } else sym += '-';
      if (x) { sum += 1; sym += 'x'; } else sym += '-';

      octal += sum;
    });

    octalOut.textContent = `chmod ${octal} node.py`;
    symOut.textContent = sym;
  }

  checkboxes.forEach(c => c.addEventListener('change', update));
  update();

  if (dialoutBtn) {
    dialoutBtn.addEventListener('click', () => {
      if (dialoutStatus) {
        dialoutStatus.innerHTML = `
          <span style="color:#10b981; font-weight:bold;">✓ Executed: sudo usermod -a -G dialout $USER</span><br>
          <span style="color:#94a3b8; font-size:11px;">Permissions granted to /dev/ttyUSB0 and /dev/ttyACM0! LiDAR &amp; Micro-ROS nodes will now open port without errors.</span>
        `;
      }
    });
  }
}

// --- 1.8 BEHAVIOR TREE STEP RUNNER ---
function initBehaviorTreeSim() {
  const tickBtn = document.getElementById('btTickBtn');
  const resetBtn = document.getElementById('btResetBtn');
  const nodes = [
    document.getElementById('btNode_plan'),
    document.getElementById('btNode_follow'),
    document.getElementById('btNode_recover')
  ];
  let step = 0;

  function renderStep() {
    nodes.forEach(n => {
      if (!n) return;
      n.className = 'visualizer-tab-btn';
      n.style.borderColor = 'rgba(56, 189, 248, 0.15)';
    });

    if (step === 1 && nodes[0]) {
      nodes[0].className = 'visualizer-tab-btn bt-running';
      nodes[0].style.borderColor = '#10b981';
      nodes[0].textContent = 'ComputePath: SUCCESS';
    } else if (step === 2 && nodes[1]) {
      nodes[0].textContent = 'ComputePath: SUCCESS';
      nodes[1].className = 'visualizer-tab-btn bt-running';
      nodes[1].style.borderColor = '#f59e0b';
      nodes[1].textContent = 'FollowPath: RUNNING';
    } else if (step === 3 && nodes[1] && nodes[2]) {
      nodes[1].className = 'visualizer-tab-btn';
      nodes[1].style.borderColor = '#ef4444';
      nodes[1].textContent = 'FollowPath: FAILURE (Obstacle)';
      nodes[2].className = 'visualizer-tab-btn bt-running';
      nodes[2].style.borderColor = '#00f2fe';
      nodes[2].textContent = 'BackUp Recovery: EXECUTING';
    } else if (step >= 4) {
      nodes[2].textContent = 'BackUp: SUCCESS -> Replanning';
      step = 0;
    }
  }

  if (tickBtn) {
    tickBtn.addEventListener('click', () => {
      step++;
      renderStep();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      step = 0;
      if (nodes[0]) nodes[0].textContent = 'ComputePathToPose';
      if (nodes[1]) nodes[1].textContent = 'FollowPath';
      if (nodes[2]) nodes[2].textContent = 'RecoveryFallback';
      renderStep();
    });
  }
}

// =============================================================================
// 2. PROGRESS TRACKER & TWO-WAY FILE PERSISTENCE
// =============================================================================

function initProgressTracker() {
  const checkboxes = document.querySelectorAll('.lesson-checkbox');
  const progressBar = document.getElementById('overallProgressBar');
  const progressText = document.getElementById('overallProgressText');
  const resetProgressBtn = document.getElementById('resetProgressBtn');

  // Load local state
  let saved = JSON.parse(localStorage.getItem('navpro_progress') || '{}');
  let localLastReset = parseInt(localStorage.getItem('navpro_last_reset') || '0');

  // Check server / file state
  const isSubfolder = window.location.pathname.includes('/lessons/');
  const statePath = isSubfolder ? '../progress_state.json' : 'progress_state.json';
  fetch(statePath + '?t=' + Date.now())
    .then(r => r.json())
    .then(data => {
      if (data.last_reset && data.last_reset > localLastReset) {
        // Reset was triggered via reset_workspace.sh!
        console.log('[NavPro] Reset detected from workspace script. Clearing progress.');
        saved = {};
        localStorage.setItem('navpro_progress', '{}');
        localStorage.setItem('navpro_last_reset', data.last_reset.toString());
      } else if (data.completed_lessons && Array.isArray(data.completed_lessons)) {
        // Merge file-based completed lessons with local storage
        data.completed_lessons.forEach(id => { saved[id] = true; });
        localStorage.setItem('navpro_progress', JSON.stringify(saved));
      }
      applyCheckboxes();
    })
    .catch(() => {
      // Offline fallback: rely on localStorage
      applyCheckboxes();
    });

  function applyCheckboxes() {
    checkboxes.forEach(chk => {
      const id = chk.dataset.lessonId;
      chk.checked = !!saved[id];
    });
    updateProgressDisplay();
  }

  checkboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      const id = chk.dataset.lessonId;
      saved[id] = chk.checked;
      localStorage.setItem('navpro_progress', JSON.stringify(saved));
      updateProgressDisplay();

      // Post update to local python server if running
      const completedList = Object.keys(saved).filter(k => saved[k]);
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ last_reset: localLastReset, completed_lessons: completedList })
      }).catch(() => {});
    });
  });

  function updateProgressDisplay() {
    let checkedCount = 0;
    checkboxes.forEach(chk => {
      if (chk.checked) checkedCount++;
    });
    const pct = checkboxes.length > 0 ? Math.round((checkedCount / checkboxes.length) * 100) : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    if (progressText) progressText.textContent = `${pct}% Complete (${checkedCount}/${checkboxes.length})`;
  }

  // Explicit UI Reset Button
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
      if (confirm('Reset all lesson progress to 0%?')) {
        saved = {};
        const now = Math.floor(Date.now() / 1000);
        localStorage.setItem('navpro_progress', '{}');
        localStorage.setItem('navpro_last_reset', now.toString());
        checkboxes.forEach(c => c.checked = false);
        updateProgressDisplay();
        showToast('Lesson progress reset to 0%!');

        fetch('/api/reset', { method: 'POST' }).catch(() => {});
      }
    });
  }
}

// =============================================================================
// 3. UI UTILITIES: SIDEBAR SCROLL, SEARCH, COPY, TABS, THEME
// =============================================================================

function initSidebarScroll() {
  const sidebar = document.querySelector('.app-sidebar');
  if (!sidebar) return;

  const STORAGE_KEY = 'navpro_sidebar_scroll_pos';
  const activeItem = sidebar.querySelector('.lesson-item.active');
  const savedScroll = sessionStorage.getItem(STORAGE_KEY);

  // If a saved scroll position exists, restore it immediately
  if (savedScroll !== null) {
    sidebar.scrollTop = parseInt(savedScroll, 10);
  } else if (activeItem) {
    // Fresh navigation: ensure the active lesson is centered in view
    activeItem.scrollIntoView({ block: 'center', behavior: 'instant' });
  }

  // Double check visibility: if active item is outside visible bounds, bring it into center
  if (activeItem) {
    setTimeout(() => {
      const sidebarRect = sidebar.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();
      if (activeRect.top < sidebarRect.top + 30 || activeRect.bottom > sidebarRect.bottom - 30) {
        activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }, 60);
  }

  // Record scroll position before navigating to another lesson
  sidebar.querySelectorAll('.lesson-item').forEach(link => {
    link.addEventListener('click', () => {
      sessionStorage.setItem(STORAGE_KEY, sidebar.scrollTop.toString());
    });
  });

  // Continuously record scroll position on user scroll
  sidebar.addEventListener('scroll', () => {
    sessionStorage.setItem(STORAGE_KEY, sidebar.scrollTop.toString());
  }, { passive: true });

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem(STORAGE_KEY, sidebar.scrollTop.toString());
  });
}

function initSearch() {
  const searchInput = document.getElementById('lessonSearchInput');
  const lessonItems = document.querySelectorAll('.lesson-item');

  if (!searchInput) return;

  searchInput.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    lessonItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

function initCopyButtons() {
  document.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('copy-btn')) {
      const pre = e.target.closest('pre');
      const code = pre ? pre.querySelector('code')?.innerText : '';
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          showToast('Code copied to clipboard!');
        });
      }
    }
  });
}

function showToast(msg) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function initVisualizerTabs() {
  const tabs = document.querySelectorAll('.visualizer-tab-btn');
  const panels = document.querySelectorAll('.visualizer-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

function initTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('navpro_theme', 'light');
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.textContent = '☀️ Light Theme';
  }
}
