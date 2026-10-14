import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Layers,
  Zap,
  Radio,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Compass,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  Sliders,
  Box,
  Monitor,
  Flame,
  AlertTriangle,
  ArrowRight,
  Code2
} from 'lucide-react';

export function Ros2ArchitectureInteractive() {
  // Motion Flow Simulator State
  const [simActive, setSimActive] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1); // 0.5, 1, 2
  const [activeStage, setActiveStage] = useState(0); // 0: Senses, 1: Nerves, 2: Brain, 3: Muscles
  const [obstacleActive, setObstacleActive] = useState(false);
  const [packetCounter, setPacketCounter] = useState(1);
  const [lastPacketLog, setLastPacketLog] = useState('DDS Bus Initialized: Discovery active on UDP multicast');

  // ROS 1 vs ROS 2 Sandbox State
  const [archMode, setArchMode] = useState('ros2'); // 'ros1' or 'ros2'
  const [roscoreCrashed, setRoscoreCrashed] = useState(false);
  const [ros2NodeCrashed, setRos2NodeCrashed] = useState(false);

  // Sourcing 3-Step Interactive State
  const [sourcingStep, setSourcingStep] = useState(1); // 1: Check, 2: Source & Check, 3: Permanent

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    // Direct bridge to container X11 clipboard
    fetch('/api/clipboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).catch(() => {});

    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Motion Flow Auto-stepper effect
  useEffect(() => {
    if (!simActive) return;
    const interval = setInterval(() => {
      setActiveStage(prev => {
        const next = (prev + 1) % 4;
        if (next === 0) {
          setPacketCounter(c => c + 1);
          setLastPacketLog(`[LiDAR] Emitted 360 rays -> topic /scan (packet #${packetCounter})`);
        } else if (next === 1) {
          setLastPacketLog(`[DDS Bus] FastDDS peer-to-peer multicast -> sub-millisecond zero-copy`);
        } else if (next === 2) {
          setLastPacketLog(
            obstacleActive
              ? `[Nav2 / SLAM] Obstacle detected at (x=1.2, y=0.4)! Recalculating path...`
              : `[Nav2 / SLAM] Pose: (x=1.85, y=0.62, θ=0.21 rad) -> Published /cmd_vel`
          );
        } else if (next === 3) {
          setLastPacketLog(
            obstacleActive
              ? `[Motor Controller] Braking linear speed to 0.15 m/s, turning angular.z=+0.6 rad/s`
              : `[Motor Controller] Wheel RPM: Left=142 RPM, Right=142 RPM (v=0.45 m/s)`
          );
        }
        return next;
      });
    }, 2000 / simSpeed);

    return () => clearInterval(interval);
  }, [simActive, simSpeed, packetCounter, obstacleActive]);

  return (
    <div className="ros2-interactive-studio" style={{ margin: '0 0 3rem' }}>
      {/* Visual Accent Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(37, 99, 235, 0.25)',
        borderRadius: '16px',
        padding: '1.75rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              background: 'var(--accent-primary)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Interactive Studio</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Module 1 &bull; Lesson 02 Core Theory
            </span>
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            ROS 2 Architectural Mastery &amp; The Living Robot
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Master the architecture of Robot Operating System 2. Explore why robotics is challenging, examine the 4 Pillars in a unified pictographical schema, and inspect the living data highway powering autonomous mobile robots.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="http://localhost:6080/vnc.html?autoconnect=true&resize=remote"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Monitor size={15} color="#0284c7" />
            <span>Desktop GUI (:6080)</span>
            <ExternalLink size={13} color="var(--text-muted)" />
          </a>
          <a
            href="http://localhost:8443/?folder=/home/student"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Terminal size={15} color="#10b981" />
            <span>VS Code (:8443)</span>
            <ExternalLink size={13} color="var(--text-muted)" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: THE CORE PROBLEM & THE MIDDLEWARE SOLUTION */}
      {/* ========================================================================= */}
      <section style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444'
          }}>
            <Flame size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              1. The Core Problem: Why Robotics is Hard &amp; The Middleware Solution
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              The three critical dilemmas every robotics engineering team faces and how ROS solves them.
            </span>
          </div>
        </div>

        {/* 3 Problem Cards: Hardware Chaos, Reinventing the Wheel, The Middleware Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.15rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
              <AlertTriangle size={16} />
              <span>Hardware Chaos &amp; Noise</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Robots exist in the physical world where friction is imperfect, LiDAR reflects off glossy surfaces, camera lighting fluctuates constantly, and motors encounter mechanical back-drivability.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.15rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
              <Flame size={16} />
              <span>The "Reinventing the Wheel" Trap</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Historically, every robotics company spent 80% of their engineering budget writing custom device drivers, coordinate conversions, and network message sockets from scratch instead of building their autonomous application.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.15rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
              <CheckCircle2 size={16} />
              <span>The Middleware Solution</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              ROS acts as the universal "Plumbing", turning the robot into a modular network of decoupled nodes communicating over standardized message schemas (<code style={{ color: '#10b981' }}>/cmd_vel</code>, <code style={{ color: '#10b981' }}>/scan</code>, <code style={{ color: '#10b981' }}>/odom</code>).
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE 4 FOUNDATIONAL PILLARS (PICTOGRAPHICAL ARCHITECTURE) */}
      {/* ========================================================================= */}
      <section style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(59, 130, 246, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}>
            <Layers size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              2. The 4 Pillars of ROS Architecture (Pictographical Overview)
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              The four foundational pillars that transform raw software into commercial autonomous robotics systems.
            </span>
          </div>
        </div>

        {/* 4 Pillars Pictographical Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {/* Pillar 1: The Plumbing */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #0284c7',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', background: 'rgba(2, 132, 199, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>PILLAR 1</span>
                <Radio size={18} color="#0284c7" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>1. The Plumbing</h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Peer-to-peer anonymous communications running over industrial DDS middleware.
              </p>

              {/* Pictogram Schematic */}
              <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', marginBottom: '10px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ color: '#38bdf8', marginBottom: '6px' }}>
                  <strong>[Topic]</strong> Continuous Stream<br />
                  <span style={{ color: '#94a3b8' }}>/scan (10 Hz) ──► Node</span>
                </div>
                <div style={{ color: '#818cf8', marginBottom: '6px' }}>
                  <strong>[Service]</strong> Sync Request/Reply<br />
                  <span style={{ color: '#94a3b8' }}>Client ◄────► Server</span>
                </div>
                <div style={{ color: '#c084fc' }}>
                  <strong>[Action]</strong> Preemptible Goal<br />
                  <span style={{ color: '#94a3b8' }}>Goal ──► Feedback ──► Result</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#0284c7', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              ⚡ Decoupled Pub/Sub • Zero Master Bottleneck
            </div>
          </div>

          {/* Pillar 2: The Tools */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #8b5cf6',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>PILLAR 2</span>
                <Sliders size={18} color="#8b5cf6" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>2. The Tools</h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Introspection, 3D visualization, and physics simulation to eliminate guesswork.
              </p>

              {/* Pictogram Schematic */}
              <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', marginBottom: '10px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ color: '#c084fc', marginBottom: '6px' }}>
                  <strong>[RViz2]</strong> 3D Sensor Visualizer<br />
                  <span style={{ color: '#94a3b8' }}>LiDAR Rays, Costmaps, TF</span>
                </div>
                <div style={{ color: '#38bdf8', marginBottom: '6px' }}>
                  <strong>[Gazebo]</strong> Physics Simulator<br />
                  <span style={{ color: '#94a3b8' }}>Collisions, Friction, Gravity</span>
                </div>
                <div style={{ color: '#34d399' }}>
                  <strong>[ros2 bag]</strong> Flight Recorder<br />
                  <span style={{ color: '#94a3b8' }}>Record &amp; replay MCAP logs</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#8b5cf6', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              🔍 Introspect Telemetry • Test Without Crash Risk
            </div>
          </div>

          {/* Pillar 3: The Capabilities */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #ec4899',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ec4899', background: 'rgba(236, 72, 153, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>PILLAR 3</span>
                <Cpu size={18} color="#ec4899" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>3. The Capabilities</h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Production-ready robotics algorithms ready to deploy without PhD-level rewrites.
              </p>

              {/* Pictogram Schematic */}
              <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', marginBottom: '10px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ color: '#ec4899', marginBottom: '6px' }}>
                  <strong>[Nav2]</strong> Autonomous Navigation<br />
                  <span style={{ color: '#94a3b8' }}>Smac/A* Planner, DWB Controller</span>
                </div>
                <div style={{ color: '#a855f7', marginBottom: '6px' }}>
                  <strong>[SLAM Toolbox]</strong> 2D Mapping<br />
                  <span style={{ color: '#94a3b8' }}>Graph SLAM mapping from /scan</span>
                </div>
                <div style={{ color: '#0284c7' }}>
                  <strong>[TF2]</strong> Coordinate Trees<br />
                  <span style={{ color: '#94a3b8' }}>map ──► odom ──► base_link</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#ec4899', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              🧠 Turnkey Autonomy • Battle-Tested Algorithms
            </div>
          </div>

          {/* Pillar 4: The Ecosystem */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid #10b981',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>PILLAR 4</span>
                <Compass size={18} color="#10b981" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>4. The Ecosystem</h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Open-source consortium standards backed by leading global robotics enterprises.
              </p>

              {/* Pictogram Schematic */}
              <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', marginBottom: '10px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ color: '#34d399', marginBottom: '6px' }}>
                  <strong>[Apache 2.0]</strong> Open Source<br />
                  <span style={{ color: '#94a3b8' }}>Royalty-free commercial AMRs</span>
                </div>
                <div style={{ color: '#10b981', marginBottom: '6px' }}>
                  <strong>[Vendor Drivers]</strong> Plug &amp; Play<br />
                  <span style={{ color: '#94a3b8' }}>SICK, RealSense, ODrive SDKs</span>
                </div>
                <div style={{ color: '#38bdf8' }}>
                  <strong>[OSRA Alliance]</strong> Community<br />
                  <span style={{ color: '#94a3b8' }}>Open Robotics consortium</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#10b981', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              🌐 Global Standard • Multi-Vendor Interoperability
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE LIVING ROBOT MOTION SIMULATOR */}
      {/* ========================================================================= */}
      <section style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981'
            }}>
              <Activity size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                3. The Living Robot: Data Highway &amp; Motion Flow Simulator
              </h3>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Clean, non-overlapping architectural layout showing live telemetry flowing from perception to brain to motors.
              </span>
            </div>
          </div>

          {/* Simulator Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSimActive(prev => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: simActive ? '#fef3c7' : '#dcfce7',
                color: simActive ? '#b45309' : '#15803d',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              {simActive ? <Pause size={14} /> : <Play size={14} />}
              <span>{simActive ? 'Pause Sim' : 'Play Sim'}</span>
            </button>

            <button
              onClick={() => setObstacleActive(prev => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: obstacleActive ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-primary)',
                color: obstacleActive ? '#ef4444' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <AlertTriangle size={14} />
              <span>{obstacleActive ? 'Remove Obstacle' : 'Inject Obstacle'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-primary)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Speed:</span>
              {[0.5, 1, 2].map(s => (
                <button
                  key={s}
                  onClick={() => setSimSpeed(s)}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: simSpeed === s ? 'var(--accent-primary)' : 'transparent',
                    color: simSpeed === s ? '#ffffff' : 'var(--text-secondary)',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Non-Overlapping Interactive SVG Canvas */}
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          background: '#090d16',
          marginBottom: '1rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
        }}>
          <img
            src="assets/images/ros2_motion_architecture.svg"
            alt="ROS 2 Motion Architecture and Data Highway"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* Live Telemetry Overlay Bar */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#e2e8f0',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
                display: 'inline-block'
              }} />
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>[DDS MONITOR]:</span>
              <span>{lastPacketLog}</span>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Packet #{packetCounter}</span>
          </div>
        </div>

        {/* 4 Stages Stepper Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px'
        }}>
          {[
            { stage: 0, title: '1. Senses (Perception)', desc: '/scan LaserScan @ 10 Hz', color: '#0284c7' },
            { stage: 1, title: '2. Nerves (DDS Highway)', desc: 'Peer-to-Peer UDP Multicast', color: '#818cf8' },
            { stage: 2, title: '3. Brain (Nav2/SLAM)', desc: 'Path & Trajectory Output', color: '#a855f7' },
            { stage: 3, title: '4. Muscles (Actuators)', desc: '/cmd_vel -> Wheel RPM', color: '#10b981' },
          ].map(item => {
            const isCurrent = activeStage === item.stage;
            return (
              <div
                key={item.stage}
                onClick={() => setActiveStage(item.stage)}
                style={{
                  background: isCurrent ? 'var(--bg-surface)' : 'var(--bg-primary)',
                  border: isCurrent ? `2px solid ${item.color}` : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isCurrent ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isCurrent ? item.color : 'var(--text-primary)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: ROS 1 VS ROS 2 ARCHITECTURAL SANDBOX & UNIFIED RCL CORE */}
      {/* ========================================================================= */}
      <section style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '8px',
              background: 'rgba(236, 72, 153, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ec4899'
            }}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                4. Architectural Comparison: ROS 1 vs. ROS 2 &amp; Unified RCL
              </h3>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Witness failure modes and understand how the unified C core (rcl) eliminated language inconsistencies.
              </span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => { setArchMode('ros1'); setRoscoreCrashed(false); }}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: archMode === 'ros1' ? '#ef4444' : 'transparent',
                color: archMode === 'ros1' ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              ROS 1 (Legacy Master)
            </button>
            <button
              onClick={() => { setArchMode('ros2'); setRos2NodeCrashed(false); }}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: archMode === 'ros2' ? '#10b981' : 'transparent',
                color: archMode === 'ros2' ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              ROS 2 Jazzy (DDS Mesh)
            </button>
          </div>
        </div>

        {/* Sandbox Simulation Window */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {archMode === 'ros1' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ef4444' }}>
                    ROS 1 Centralized Architecture: Single Point of Failure
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    All nodes register through the centralized <code>roscore</code> master process.
                  </span>
                </div>
                <button
                  onClick={() => setRoscoreCrashed(prev => !prev)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: roscoreCrashed ? '#10b981' : '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  {roscoreCrashed ? 'Restart roscore' : '💥 Crash roscore Master'}
                </button>
              </div>

              {/* ROS 1 Graph Display */}
              <div style={{
                background: roscoreCrashed ? '#450a0a' : 'var(--bg-code)',
                border: roscoreCrashed ? '2px solid #ef4444' : '1px solid #334155',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  background: roscoreCrashed ? '#7f1d1d' : '#ef4444',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  marginBottom: '1.25rem',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                }}>
                  {roscoreCrashed ? '❌ roscore DEAD (SIGSEGV / OOM)' : 'roscore Master (Port 11311)'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {['/camera_node', '/lidar_node', '/path_planner', '/motor_controller'].map(node => (
                    <div
                      key={node}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '6px',
                        background: roscoreCrashed ? '#7f1d1d' : '#1e293b',
                        color: roscoreCrashed ? '#fca5a5' : '#e2e8f0',
                        border: roscoreCrashed ? '1px dashed #ef4444' : '1px solid #475569',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {roscoreCrashed ? `💀 ${node} (FROZEN)` : `🟢 ${node}`}
                    </div>
                  ))}
                </div>

                {roscoreCrashed && (
                  <div style={{ marginTop: '1.25rem', color: '#fca5a5', fontSize: '0.88rem', fontWeight: 700 }}>
                    ⚠️ CRITICAL FAILURE: Central master died. Discovery halted! The entire autonomous robot has stalled.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#10b981' }}>
                    ROS 2 Jazzy: Decentralized DDS Peer-to-Peer Mesh
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    No master process exists. Nodes discover each other via DDS UDP multicast.
                  </span>
                </div>
                <button
                  onClick={() => setRos2NodeCrashed(prev => !prev)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: ros2NodeCrashed ? '#10b981' : '#f59e0b',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  {ros2NodeCrashed ? 'Restore Node' : 'Kill Camera Node'}
                </button>
              </div>

              {/* ROS 2 Graph Display */}
              <div style={{
                background: 'var(--bg-code)',
                border: '1px solid #10b981',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10b981',
                  color: '#34d399',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginBottom: '1.25rem'
                }}>
                  ⚡ FastDDS Global Data Space (Autonomous Peer Discovery)
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{
                    padding: '10px 16px',
                    borderRadius: '6px',
                    background: ros2NodeCrashed ? '#450a0a' : '#1e293b',
                    color: ros2NodeCrashed ? '#fca5a5' : '#38bdf8',
                    border: ros2NodeCrashed ? '1px dashed #ef4444' : '1px solid #0284c7',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {ros2NodeCrashed ? '💀 /camera_node (CRASHED)' : '🟢 /camera_node'}
                  </div>

                  <div style={{
                    padding: '10px 16px',
                    borderRadius: '6px',
                    background: '#1e293b',
                    color: '#34d399',
                    border: '1px solid #10b981',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    🟢 /lidar_node
                  </div>

                  <div style={{
                    padding: '10px 16px',
                    borderRadius: '6px',
                    background: '#1e293b',
                    color: '#c084fc',
                    border: '1px solid #8b5cf6',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    🟢 /path_planner
                  </div>

                  <div style={{
                    padding: '10px 16px',
                    borderRadius: '6px',
                    background: '#1e293b',
                    color: '#f59e0b',
                    border: '1px solid #d97706',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    🟢 /motor_controller
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', color: '#6ee7b7', fontSize: '0.88rem', fontWeight: 600 }}>
                  {ros2NodeCrashed
                    ? '✅ FAULT RESILIENT: Camera node failed, but LiDAR, Planner, and Motor Controller continue driving safely without interruption!'
                    : '✅ ALL PEERS CONNECTED: Real-time peer-to-peer data distribution across shared memory.'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Unified RCL Architecture Highlight: Eliminating Language Inconsistencies */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontWeight: 800, fontSize: '0.95rem', marginBottom: '8px' }}>
            <Code2 size={18} />
            <span>Eliminating Language Inconsistency: The Unified C Core (rcl)</span>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            In <strong>ROS 1</strong>, <code style={{ color: '#ef4444' }}>roscpp</code> and <code style={{ color: '#ef4444' }}>rospy</code> were two completely independent codebases written from scratch. Features added to C++ were often missing in Python, multithreading worked differently, and bugs fixed in one language lingered in the other for years.
          </p>
          <p style={{ margin: '0 0 12px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            In <strong>ROS 2</strong>, Open Robotics solved this by building a unified C core: <code style={{ color: '#10b981' }}>rcl</code> (ROS Client Library) and <code style={{ color: '#10b981' }}>rcutils</code>. Both <code style={{ color: '#0284c7' }}>rclcpp</code> (C++) and <code style={{ color: '#ec4899' }}>rclpy</code> (Python) are thin, lightweight wrappers on top of the exact same C codebase.
          </p>

          {/* Pictographical Language Stack Schema */}
          <div style={{
            background: 'var(--bg-code)',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid #334155',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '8px' }}>
              <div style={{ background: '#1e293b', border: '1px solid #0284c7', color: '#38bdf8', padding: '6px 14px', borderRadius: '6px' }}>
                <strong>rclcpp (C++ API)</strong>
              </div>
              <div style={{ background: '#1e293b', border: '1px solid #ec4899', color: '#f472b6', padding: '6px 14px', borderRadius: '6px' }}>
                <strong>rclpy (Python 3 API)</strong>
              </div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0' }}>▼ thin wrapper bindings ▼</div>
            <div style={{ background: 'rgba(99, 102, 241, 0.25)', border: '1px solid #6366f1', color: '#a5b4fc', padding: '8px 20px', borderRadius: '6px', display: 'inline-block', fontWeight: 800, marginBottom: '6px' }}>
              rcl (Unified Common ROS Client C Core) + rcutils
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '4px 0' }}>▼ standard middleware abstraction ▼</div>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', padding: '6px 20px', borderRadius: '6px', display: 'inline-block', fontWeight: 700 }}>
              rmw (ROS Middleware Interface) ──► FastDDS / CycloneDDS
            </div>
          </div>
          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
            ✅ Result: 100% behavioral parity, identical threading models, and synchronized updates across Python and C++!
          </div>
        </div>

        {/* Architectural Comparison Matrix */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-primary)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '10px 14px', color: 'var(--text-primary)', fontWeight: 800 }}>Feature Dimension</th>
                <th style={{ padding: '10px 14px', color: '#ef4444', fontWeight: 800 }}>ROS 1 (Legacy)</th>
                <th style={{ padding: '10px 14px', color: '#10b981', fontWeight: 800 }}>ROS 2 Jazzy (Industry Standard)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Discovery Protocol</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>Centralized <code>roscore</code> master registry</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Decentralized peer-to-peer DDS multicast</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Fault Tolerance</td>
                <td style={{ padding: '10px 14px', color: '#ef4444' }}>Single Point of Failure (Master crash halts robot)</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Fault Tolerant (Individual node isolation)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Language Libraries (C++ vs Python)</td>
                <td style={{ padding: '10px 14px', color: '#ef4444' }}><strong>High Inconsistency:</strong> Separate codebases (<code>roscpp</code> vs <code>rospy</code>) with feature disparities</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}><strong>100% Unified:</strong> Thin wrappers (<code>rclcpp</code>/<code>rclpy</code>) over shared C core (<code>rcl</code>)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Quality of Service (QoS)</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>TCP/UDP without delivery guarantees</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Configurable QoS (Best Effort vs. Reliable)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Multi-Robot Fleets</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>Complex bridging hacks (multimaster)</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Native multi-robot with <code>ROS_DOMAIN_ID</code></td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Python Stack</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>Legacy Python 2.7</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Modern Python 3.12+ (Asyncio &amp; OOP Node Lifecycle)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SOURCING THE ENVIRONMENT (STREAMLINED 3-STEP LAB) */}
      {/* ========================================================================= */}
      <section style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(2, 132, 199, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7'
          }}>
            <Terminal size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              5. Sourcing the ROS 2 Environment (3-Step Quick Lab)
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              1. Check without sourcing &rarr; 2. Source &amp; re-check &rarr; 3. Add permanently to <code>~/.bashrc</code>.
            </span>
          </div>
        </div>

        {/* 3 Step Interactive Workflow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          
          {/* Step 1: Check Unsourced */}
          <div style={{
            background: sourcingStep === 1 ? 'var(--bg-primary)' : 'var(--bg-surface)',
            border: sourcingStep === 1 ? '2px solid #ef4444' : '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} onClick={() => setSourcingStep(1)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', background: 'rgba(239, 68, 68, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                STEP 1: CHECK
              </span>
              <span style={{ fontSize: '0.74rem', color: '#ef4444', fontWeight: 700 }}>UNSOURCED</span>
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Run Command Before Sourcing
            </h4>
            <div style={{ background: 'var(--bg-code)', padding: '8px 10px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#f87171', marginBottom: '8px' }}>
              $ ros2<br />
              <span style={{ color: '#ef4444' }}>bash: ros2: command not found</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Linux doesn't know where ROS 2 is installed until its environment script is sourced.
            </p>
          </div>

          {/* Step 2: Source and Re-check */}
          <div style={{
            background: sourcingStep === 2 ? 'var(--bg-primary)' : 'var(--bg-surface)',
            border: sourcingStep === 2 ? '2px solid #0284c7' : '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} onClick={() => setSourcingStep(2)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', background: 'rgba(2, 132, 199, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                STEP 2: SOURCE &amp; VERIFY
              </span>
              <span style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 700 }}>SOURCED</span>
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Load the Underlay Environment
            </h4>
            <div style={{ background: 'var(--bg-code)', padding: '8px 10px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', marginBottom: '8px' }}>
              $ source /opt/ros/jazzy/setup.bash<br />
              $ ros2 --help<br />
              <span style={{ color: '#34d399' }}>usage: ros2 [-h] [command] ...</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Populates <code>$PATH</code> and <code>$PYTHONPATH</code> with ROS 2 binaries and libraries.
            </p>
          </div>

          {/* Step 3: Add Permanent */}
          <div style={{
            background: sourcingStep === 3 ? 'var(--bg-primary)' : 'var(--bg-surface)',
            border: sourcingStep === 3 ? '2px solid #10b981' : '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} onClick={() => setSourcingStep(3)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                STEP 3: MAKE PERMANENT
              </span>
              <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>~/.bashrc</span>
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Automate for All Future Terminals
            </h4>
            <div style={{
              background: 'var(--bg-code)',
              padding: '8px 10px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#34d399',
              marginBottom: '8px'
            }}>
              <span>echo "source /opt/ros/jazzy/setup.bash" &gt;&gt; ~/.bashrc</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy('echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc', 'bashrc_step');
                }}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px 4px' }}
                title="Copy command"
              >
                {copiedKey === 'bashrc_step' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              </button>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Adds automatic underlay sourcing to every new terminal pane automatically!
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PRACTICAL SMOKE TEST */}
      {/* ========================================================================= */}
      <section style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981'
          }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              6. Practical Smoke Test: Talker &amp; Listener
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Verify that DDS peer discovery is communicating across two independent terminal processes.
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {/* Terminal 1: Talker */}
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Terminal 1: Talker Publisher</span>
              <button
                onClick={() => handleCopy('source /opt/ros/jazzy/setup.bash\nros2 run demo_nodes_py talker', 'talker')}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)' }}
              >
                {copiedKey === 'talker' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>Copy</span>
              </button>
            </div>
            <div style={{ background: 'var(--bg-code)', color: '#38bdf8', padding: '10px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '8px' }}>
              ros2 run demo_nodes_py talker
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              [INFO] [talker]: Publishing: "Hello World: 1"<br />
              [INFO] [talker]: Publishing: "Hello World: 2"
            </div>
          </div>

          {/* Terminal 2: Listener */}
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Terminal 2: Listener Subscriber</span>
              <button
                onClick={() => handleCopy('source /opt/ros/jazzy/setup.bash\nros2 run demo_nodes_py listener', 'listener')}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)' }}
              >
                {copiedKey === 'listener' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>Copy</span>
              </button>
            </div>
            <div style={{ background: 'var(--bg-code)', color: '#38bdf8', padding: '10px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '8px' }}>
              ros2 run demo_nodes_py listener
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              [INFO] [listener]: I heard: [Hello World: 1]<br />
              [INFO] [listener]: I heard: [Hello World: 2]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
