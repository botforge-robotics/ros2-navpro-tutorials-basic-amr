import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Radio,
  Sliders,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export function TurtlesimTeleopFlow() {
  const canvasRef = useRef(null);

  // Mode: 'auto' | 'manual'
  const [mode, setMode] = useState('auto');
  const [isPlaying, setIsPlaying] = useState(true);

  // Telemetry state
  const [linearVel, setLinearVel] = useState(2.0);
  const [angularVel, setAngularVel] = useState(1.8);
  const [activeKey, setActiveKey] = useState(null);
  const [packetCount, setPacketCount] = useState(42);
  const [lastAction, setLastAction] = useState('CIRCULAR_DRIVE');

  // Simulated Turtle State on 360x240 canvas
  const turtleRef = useRef({
    x: 180,
    y: 120,
    theta: 0,
    trail: []
  });

  // Reset or clear canvas
  const handleResetTurtle = () => {
    turtleRef.current = {
      x: 180,
      y: 120,
      theta: 0,
      trail: []
    };
    setLinearVel(0.0);
    setAngularVel(0.0);
    setLastAction('POSE_RESET');
  };

  const handleClearInk = () => {
    turtleRef.current.trail = [];
    setLastAction('INK_CLEARED');
  };

  // Keyboard navigation listener for manual control
  useEffect(() => {
    const handleKeyDown = (e) => {
      let key = null;
      let lin = 0;
      let ang = 0;

      if (e.key === 'ArrowUp') {
        key = 'UP';
        lin = 2.0;
        ang = 0.0;
      } else if (e.key === 'ArrowDown') {
        key = 'DOWN';
        lin = -2.0;
        ang = 0.0;
      } else if (e.key === 'ArrowLeft') {
        key = 'LEFT';
        lin = 0.0;
        ang = 2.2;
      } else if (e.key === 'ArrowRight') {
        key = 'RIGHT';
        lin = 0.0;
        ang = -2.2;
      }

      if (key) {
        // Prevent page scroll when using arrow keys inside interactive component
        e.preventDefault();
        setMode('manual');
        setActiveKey(key);
        setLinearVel(lin);
        setAngularVel(ang);
        setPacketCount((p) => p + 1);
        setLastAction(`KEY_${key}`);

        // Update turtle position
        const t = turtleRef.current;
        const dt = 0.18;
        t.theta += ang * dt;
        t.x += lin * Math.cos(t.theta) * 12;
        t.y += lin * Math.sin(t.theta) * 12;

        // Keep inside bounds
        t.x = Math.max(20, Math.min(340, t.x));
        t.y = Math.max(20, Math.min(220, t.y));

        t.trail.push({ x: t.x, y: t.y });
        if (t.trail.length > 300) t.trail.shift();
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setActiveKey(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Drive button click handler for touch / mouse
  const handleDrivePress = (dir) => {
    setMode('manual');
    let lin = 0;
    let ang = 0;

    if (dir === 'UP') {
      lin = 2.0;
      ang = 0.0;
    } else if (dir === 'DOWN') {
      lin = -2.0;
      ang = 0.0;
    } else if (dir === 'LEFT') {
      lin = 0.0;
      ang = 2.2;
    } else if (dir === 'RIGHT') {
      lin = 0.0;
      ang = -2.2;
    }

    setActiveKey(dir);
    setLinearVel(lin);
    setAngularVel(ang);
    setPacketCount((p) => p + 1);
    setLastAction(`BUTTON_${dir}`);

    const t = turtleRef.current;
    const dt = 0.22;
    t.theta += ang * dt;
    t.x += lin * Math.cos(t.theta) * 14;
    t.y += lin * Math.sin(t.theta) * 14;

    t.x = Math.max(20, Math.min(340, t.x));
    t.y = Math.max(20, Math.min(220, t.y));

    t.trail.push({ x: t.x, y: t.y });
    if (t.trail.length > 300) t.trail.shift();

    setTimeout(() => setActiveKey(null), 250);
  };

  // Main Animation Loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const render = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // In Auto mode, drive in a continuous smooth smooth figure-8 / loop
      if (mode === 'auto' && isPlaying) {
        const t = turtleRef.current;
        const autoLin = 1.6;
        const autoAng = Math.sin(now * 0.0018) * 2.2;

        setLinearVel(autoLin);
        setAngularVel(Number(autoAng.toFixed(2)));
        setLastAction('AUTO_PATROL');

        t.theta += autoAng * dt;
        t.x += autoLin * Math.cos(t.theta) * 35 * dt;
        t.y += autoLin * Math.sin(t.theta) * 35 * dt;

        // Wrap around boundaries smoothly
        if (t.x < 15) t.x = 345;
        if (t.x > 345) t.x = 15;
        if (t.y < 15) t.y = 225;
        if (t.y > 225) t.y = 15;

        t.trail.push({ x: t.x, y: t.y });
        if (t.trail.length > 250) t.trail.shift();

        if (Math.random() < 0.2) {
          setPacketCount((p) => p + 1);
        }
      }

      // Render Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Background canvas grid
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);

        // Grid lines (turtlesim grid style)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        const t = turtleRef.current;

        // Draw Ink Trail
        if (t.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(t.trail[0].x, t.trail[0].y);
          for (let i = 1; i < t.trail.length; i++) {
            ctx.lineTo(t.trail[i].x, t.trail[i].y);
          }
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw Turtle Robot Sprite
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.theta);

        // Outer glow
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.fill();

        // Turtle Body / Shell
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 10, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Shell pattern
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.stroke();

        // Turtle Head (pointing in theta direction = positive X)
        ctx.beginPath();
        ctx.arc(12, 0, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.fill();

        // Direction Eye / Sensor Beam
        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(24, 0);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Flippers / Wheels
        ctx.fillStyle = '#059669';
        // Front left
        ctx.fillRect(4, -13, 6, 4);
        // Front right
        ctx.fillRect(4, 9, 6, 4);
        // Rear left
        ctx.fillRect(-10, -12, 5, 3);
        // Rear right
        ctx.fillRect(-10, 9, 5, 3);

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [mode, isPlaying]);

  return (
    <div className="turtlesim-flow-container">
      {/* Component Header Bar */}
      <div className="turtlesim-flow-header">
        <div className="flow-header-left">
          <div className="flow-status-pill">
            <span className="flow-pulse-dot"></span>
            <strong>LIVE COMPUTATIONAL GRAPH</strong>
          </div>
          <h3 className="flow-title">ROS 2 Peer-to-Peer DDS Runtime Pipeline</h3>
          <p className="flow-subtitle">
            Observe velocity packets emitted from <code className="inline-code">turtle_teleop_key</code> to <code className="inline-code">turtlesim_node</code> over <code className="inline-code">/turtle1/cmd_vel</code>.
          </p>
        </div>

        {/* Controls */}
        <div className="flow-header-controls">
          <button
            onClick={() => setMode(mode === 'auto' ? 'manual' : 'auto')}
            className={`flow-ctrl-btn ${mode === 'auto' ? 'active-auto' : ''}`}
            title="Toggle between Auto-Pilot Demo and Interactive Keyboard Mode"
          >
            <Sliders size={14} />
            <span>{mode === 'auto' ? 'Auto Demo Active' : 'Manual Mode'}</span>
          </button>

          {mode === 'auto' && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flow-ctrl-btn"
              title={isPlaying ? "Pause auto demo" : "Resume auto demo"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          )}

          <button
            onClick={handleClearInk}
            className="flow-ctrl-btn"
            title="Clear canvas ink trail (ros2 service call /clear)"
          >
            <Trash2 size={14} />
            <span>Clear Ink</span>
          </button>

          <button
            onClick={handleResetTurtle}
            className="flow-ctrl-btn"
            title="Reset turtle pose (ros2 service call /reset)"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 3-Stage Diagram Grid */}
      <div className="turtlesim-diagram-grid">
        {/* =================================================================== */}
        {/* STAGE 1: PUBLISHER NODE (teleop_turtle) */}
        {/* =================================================================== */}
        <div className="flow-node-card publisher-card">
          <div className="node-card-badge publisher-badge">
            <Terminal size={14} />
            <span>PUBLISHER NODE</span>
          </div>
          <h4 className="node-name">/teleop_turtle</h4>
          <span className="node-exec-label">ros2 run turtlesim turtle_teleop_key</span>

          <div className="teleop-arrow-pad-container">
            <div className="teleop-pad-label">Arrow Keys Input Teleoperation:</div>
            <div className="teleop-pad-grid">
              <div></div>
              <button
                className={`pad-btn ${activeKey === 'UP' ? 'active' : ''}`}
                onClick={() => handleDrivePress('UP')}
                title="Forward (+Linear X)"
              >
                <ArrowUp size={16} />
              </button>
              <div></div>
              <button
                className={`pad-btn ${activeKey === 'LEFT' ? 'active' : ''}`}
                onClick={() => handleDrivePress('LEFT')}
                title="Turn Left (+Angular Z)"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                className={`pad-btn ${activeKey === 'DOWN' ? 'active' : ''}`}
                onClick={() => handleDrivePress('DOWN')}
                title="Backward (-Linear X)"
              >
                <ArrowDown size={16} />
              </button>
              <button
                className={`pad-btn ${activeKey === 'RIGHT' ? 'active' : ''}`}
                onClick={() => handleDrivePress('RIGHT')}
                title="Turn Right (-Angular Z)"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="key-hint">💡 Use onscreen buttons or your physical arrow keys</div>
          </div>

          <div className="node-status-row">
            <span className="status-indicator publishing"></span>
            <span>Publishing <strong style={{ color: '#c084fc' }}>geometry_msgs/msg/Twist</strong></span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* STAGE 2: TOPIC HIGHWAY & PACKET STREAM (/turtle1/cmd_vel) */}
        {/* =================================================================== */}
        <div className="flow-topic-connector">
          <div className="topic-header-pill">
            <Radio size={13} className="radio-pulse-icon" />
            <span>ROS 2 TOPIC</span>
          </div>

          <div className="topic-pipe-container">
            <div className="topic-pipe-track">
              {/* Traveling Packet Particles */}
              <div className="pipe-packet packet-1">
                <span>Twist</span>
              </div>
              <div className="pipe-packet packet-2">
                <span>Twist</span>
              </div>
              <div className="pipe-packet packet-3">
                <span>Twist</span>
              </div>
            </div>
          </div>

          <div className="topic-metadata-card">
            <div className="topic-name-row">
              <strong className="topic-name">/turtle1/cmd_vel</strong>
              <span className="topic-type-tag">Twist</span>
            </div>

            <div className="topic-telemetry-box">
              <div className="telemetry-line">
                <span className="telemetry-label">linear.x:</span>
                <span className="telemetry-val linear">{linearVel > 0 ? `+${linearVel.toFixed(1)}` : linearVel.toFixed(1)} m/s</span>
              </div>
              <div className="telemetry-line">
                <span className="telemetry-label">angular.z:</span>
                <span className="telemetry-val angular">{angularVel > 0 ? `+${angularVel.toFixed(1)}` : angularVel.toFixed(1)} rad/s</span>
              </div>
              <div className="telemetry-line sub-line">
                <span className="telemetry-label">rate:</span>
                <span className="telemetry-rate">~10.0 Hz</span>
              </div>
            </div>

            <div className="topic-packet-counter">
              <span>Transmitted: <strong>{packetCount}</strong> msgs</span>
              <span className="status-live">DDS OK</span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* STAGE 3: SUBSCRIBER NODE (turtlesim_node & Canvas) */}
        {/* =================================================================== */}
        <div className="flow-node-card subscriber-card">
          <div className="node-card-badge subscriber-badge">
            <CheckCircle2 size={14} />
            <span>SUBSCRIBER &amp; SIMULATOR</span>
          </div>
          <h4 className="node-name">/turtlesim</h4>
          <span className="node-exec-label">ros2 run turtlesim turtlesim_node</span>

          <div className="turtlesim-canvas-wrapper">
            <canvas
              ref={canvasRef}
              width={360}
              height={220}
              className="turtlesim-canvas"
            />
            <div className="canvas-watermark">Qt5 Canvas • /turtle1/pose</div>
          </div>

          <div className="canvas-pose-telemetry">
            <span>x: <strong>{(turtleRef.current.x / 32).toFixed(2)}</strong></span>
            <span>y: <strong>{(turtleRef.current.y / 32).toFixed(2)}</strong></span>
            <span>theta: <strong>{turtleRef.current.theta.toFixed(2)} rad</strong></span>
          </div>
        </div>
      </div>

      {/* Introspection CLI Bar */}
      <div className="flow-cli-introspection-bar">
        <span className="cli-badge">CLI VERIFICATION:</span>
        <code className="cli-command">ros2 node info /turtlesim</code>
        <span className="cli-sep">→</span>
        <span className="cli-result">Subscribers: <strong style={{ color: '#38bdf8' }}>/turtle1/cmd_vel [geometry_msgs/msg/Twist]</strong></span>
      </div>
    </div>
  );
}
