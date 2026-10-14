import React, { useState, useEffect } from 'react';
import {
  Bot,
  Eye,
  Brain,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Layers,
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
  Code2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  HardDrive,
  Laptop,
  Workflow,
  RefreshCw,
  SlidersHorizontal,
  Gauge,
  Cable,
  RadioTower,
  ChevronRight
} from 'lucide-react';

export function Ros2ArchitectureInteractive() {
  // Story Chapter / Active Tab State
  const [activeStoryChapter, setActiveStoryChapter] = useState('sec-anatomy');

  // Chapter 1: Selected Robotic Ingredient & Interactive Demo
  const [selectedIngredient, setSelectedIngredient] = useState(0); // 0: Perception, 1: Decision, 2: Action
  const [obstacleDistance, setObstacleDistance] = useState(75); // cm, for decision-making demo

  // Chapter 2: Hardware Hot-Swap Simulator State
  const [selectedLidar, setSelectedLidar] = useState('sick'); // 'sick', 'rplidar', 'velodyne'
  const [isSwappingLidar, setIsSwappingLidar] = useState(false);

  // Chapter 3: Developer Story Beat
  const [activeStoryBeat, setActiveStoryBeat] = useState(0); // 0: Person X, 1: Burnout, 2: Person Y, 3: The Loop

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

  const storyChapters = [
    { id: 'sec-anatomy', num: '1', title: 'Robot Anatomy', icon: Bot },
    { id: 'sec-metaphor', num: '2', title: 'OS Metaphor', icon: Laptop },
    { id: 'sec-tragedy', num: '3', title: "Dev Tragedy", icon: AlertTriangle },
    { id: 'sec-mission', num: '4', title: 'ROS Mission', icon: Flame },
    { id: 'sec-pillars', num: '5', title: '4 Pillars', icon: Layers },
    { id: 'sec-simulator', num: '6', title: 'Living Robot Sim', icon: Activity },
    { id: 'sec-architecture', num: '7', title: 'ROS 1 vs 2', icon: ShieldCheck },
    { id: 'sec-lab', num: '8', title: 'Hands-on Lab', icon: Terminal }
  ];

  const scrollToChapter = (chapterId) => {
    setActiveStoryChapter(chapterId);
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLidarSwap = (lidarType) => {
    if (lidarType === selectedLidar) return;
    setIsSwappingLidar(true);
    setSelectedLidar(lidarType);
    setTimeout(() => setIsSwappingLidar(false), 450);
  };

  return (
    <div className="ros2-interactive-studio" style={{ margin: '0 0 3rem' }}>
      {/* Dynamic Keyframes for Animation Disciplines */}
      <style>{`
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes flowBeam {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes spinTach {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* STORY CHAPTERS NAVIGATION TIMELINE */}
      {/* ========================================================================= */}
      <nav aria-label="Story Chapters" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '0.75rem 1rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
        gap: '8px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {storyChapters.map((ch) => {
          const IconComponent = ch.icon;
          const isActive = activeStoryChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isActive ? 'var(--accent-primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <IconComponent size={15} />
              <span>{ch.num}. {ch.title}</span>
            </button>
          );
        })}
      </nav>

      {/* ========================================================================= */}
      {/* CHAPTER 1: WHAT IS A ROBOT? & THE 3 ROBOTIC INGREDIENTS */}
      {/* ========================================================================= */}
      <section id="sec-anatomy" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(37, 99, 235, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}>
            <Bot size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              1. What is a Robot? &amp; The Three Core Ingredients
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              The universal definition and tripartite anatomy of all autonomous machines.
            </span>
          </div>
        </div>

        {/* Definition Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '1rem',
          color: 'var(--text-primary)',
          lineHeight: 1.55,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Sparkles size={20} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>Definition:</strong>{' '}
            A <strong>robot</strong> is a machine capable of carrying out a complex series of actions automatically, especially one programmable by a computer.
          </div>
        </div>

        {/* Hero Visual: AMR Cutaway Graphic */}
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          background: '#0a0f1d',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          position: 'relative'
        }}>
          <img
            src="assets/images/robot_anatomy_ingredients.png"
            alt="AMR Anatomy Cutaway - Senses, Brain, and Actuation"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(10, 15, 29, 0.85)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.74rem',
            color: '#94a3b8'
          }}>
            Autonomous Mobile Robot (AMR) Tripartite Subsystem Blueprint
          </div>
        </div>

        {/* Interactive 3-Ingredient Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '1.25rem'
        }}>
          <button
            onClick={() => setSelectedIngredient(0)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: selectedIngredient === 0 ? '2px solid #0284c7' : '1px solid var(--border-color)',
              background: selectedIngredient === 0 ? 'rgba(2, 132, 199, 0.12)' : 'var(--bg-primary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 800, fontSize: '0.95rem' }}>
              <Eye size={18} />
              <span>1. Perception</span>
            </div>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>The Senses (Telemetry)</span>
          </button>

          <button
            onClick={() => setSelectedIngredient(1)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: selectedIngredient === 1 ? '2px solid #8b5cf6' : '1px solid var(--border-color)',
              background: selectedIngredient === 1 ? 'rgba(139, 92, 246, 0.12)' : 'var(--bg-primary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b5cf6', fontWeight: 800, fontSize: '0.95rem' }}>
              <Brain size={18} />
              <span>2. Decision Making</span>
            </div>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>The Brain (Cognition)</span>
          </button>

          <button
            onClick={() => setSelectedIngredient(2)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: selectedIngredient === 2 ? '2px solid #10b981' : '1px solid var(--border-color)',
              background: selectedIngredient === 2 ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-primary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 800, fontSize: '0.95rem' }}>
              <Zap size={18} />
              <span>3. Action</span>
            </div>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>The Muscles (Actuation)</span>
          </button>
        </div>

        {/* Active Ingredient Interactive Sandbox */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '1.25rem'
        }}>
          {selectedIngredient === 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: 800, fontSize: '1rem' }}>
                  <Eye size={18} />
                  <span>Perception &bull; Ingesting Environmental Signals</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  Active Stream: 10 Hz / 360 rays
                </span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                The robot converts physical photons, acoustic reflections, and magnetic fields into digital arrays.
              </p>
              {/* Pictographical Sensor Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '12px' }}>
                <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>🔴</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>2D/3D LiDAR</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Distance &amp; Obstacles</div>
                </div>
                <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>📷</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>RGB-D Camera</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Visual 3D Pointcloud</div>
                </div>
                <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>⚖️</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>IMU Sensor</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Acceleration &amp; Yaw Rate</div>
                </div>
                <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>🧭</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>GPS &amp; Compass</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Global Geolocation</div>
                </div>
              </div>
            </div>
          )}

          {selectedIngredient === 1 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', fontWeight: 800, fontSize: '1rem' }}>
                  <Brain size={18} />
                  <span>Decision Making &bull; Interactive Logic Simulator</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  Drag Slider to Test Reflexes
                </span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Synthesizes perception data into actionable safety decisions and navigation trajectories.
              </p>

              {/* Interactive Obstacle Distance Slider */}
              <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Simulate Proximity to Nearest Obstacle:</span>
                  <strong style={{ color: obstacleDistance <= 30 ? '#ef4444' : obstacleDistance <= 80 ? '#f59e0b' : '#10b981' }}>
                    {obstacleDistance} cm
                  </strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={obstacleDistance}
                  onChange={(e) => setObstacleDistance(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#8b5cf6' }}
                />

                <div style={{ marginTop: '10px', padding: '8px 12px', borderRadius: '6px', background: obstacleDistance <= 30 ? 'rgba(239, 68, 68, 0.2)' : obstacleDistance <= 80 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)', border: `1px solid ${obstacleDistance <= 30 ? '#ef4444' : obstacleDistance <= 80 ? '#f59e0b' : '#10b981'}` }}>
                  {obstacleDistance <= 30 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>
                      <AlertTriangle size={16} />
                      <span>Binary Safety Logic: Obstacle &le; 30cm &rarr; EMERGENCY STOP! Command: /cmd_vel linear.x = 0.0</span>
                    </div>
                  ) : obstacleDistance <= 80 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem' }}>
                      <Workflow size={16} />
                      <span>Costmap Inflation: Local Avoidance activated. Steering yaw angular.z = +0.5 rad/s</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                      <CheckCircle2 size={16} />
                      <span>Nominal Path Following: Global Nav2 spline active. Cruising velocity linear.x = 0.50 m/s</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedIngredient === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 800, fontSize: '1rem' }}>
                  <Zap size={18} />
                  <span>Action &bull; Mechanical Actuation &amp; Expression</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  Output: /cmd_vel &rarr; Wheel CAN
                </span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Translates mathematical velocity curves into motor torques, physical work, and human audio communication.
              </p>

              {/* Pictographical Actuator Telemetry */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ animation: 'spinTach 2s linear infinite', color: '#10b981' }}>
                    <RotateCcw size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Left Hub Motor</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>142 RPM (CAN)</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ animation: 'spinTach 2s linear infinite', color: '#10b981' }}>
                    <RotateCcw size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Right Hub Motor</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>142 RPM (CAN)</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: '#38bdf8' }}>
                    <Gauge size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Linear Ground Speed</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>0.45 m/s</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 2: WHAT IS ROS? THE WINDOWS OS METAPHOR */}
      {/* ========================================================================= */}
      <section id="sec-metaphor" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(14, 165, 233, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0ea5e9'
          }}>
            <Laptop size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              2. What is ROS? The Windows OS Metaphor
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Just as Windows abstracts printers from Google Chrome, ROS abstracts robot hardware from autonomous navigation.
            </span>
          </div>
        </div>

        {/* Interactive Hardware Hot-Swap Simulator */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '1.25rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Interactive Test: Swap the Robot's Sensor Hardware
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => handleLidarSwap('sick')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: selectedLidar === 'sick' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                  background: selectedLidar === 'sick' ? 'rgba(2, 132, 199, 0.2)' : 'var(--bg-code)',
                  color: selectedLidar === 'sick' ? '#38bdf8' : 'var(--text-secondary)'
                }}
              >
                SICK TiM571 (Industrial)
              </button>
              <button
                onClick={() => handleLidarSwap('rplidar')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: selectedLidar === 'rplidar' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                  background: selectedLidar === 'rplidar' ? 'rgba(2, 132, 199, 0.2)' : 'var(--bg-code)',
                  color: selectedLidar === 'rplidar' ? '#38bdf8' : 'var(--text-secondary)'
                }}
              >
                RPLiDAR A3 (Budget)
              </button>
              <button
                onClick={() => handleLidarSwap('velodyne')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: selectedLidar === 'velodyne' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                  background: selectedLidar === 'velodyne' ? 'rgba(2, 132, 199, 0.2)' : 'var(--bg-code)',
                  color: selectedLidar === 'velodyne' ? '#38bdf8' : 'var(--text-secondary)'
                }}
              >
                Velodyne Puck (3D)
              </button>
            </div>
          </div>

          {/* Side-by-Side Metaphor Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {/* Desktop PC Box */}
            <div style={{ background: 'var(--bg-code)', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                <Monitor size={16} />
                <span>Personal Computer (Windows OS)</span>
              </div>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', marginBottom: '6px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Applications:</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>MS Word &bull; Google Chrome &bull; Blender</div>
              </div>
              <div style={{ textAlign: 'center', color: '#0ea5e9', fontSize: '0.78rem', fontWeight: 800, margin: '4px 0' }}>
                &darr; Windows Print Spooler &amp; USB APIs &darr;
              </div>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Hardware:</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#38bdf8' }}>HP, Epson, or Canon Printer &bull; USB Mouse</div>
              </div>
            </div>

            {/* Autonomous Robot Box */}
            <div style={{
              background: 'var(--bg-code)',
              border: isSwappingLidar ? '1px solid #10b981' : '1px solid #334155',
              borderRadius: '8px',
              padding: '12px',
              transition: 'border 0.3s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                <Bot size={16} />
                <span>Autonomous Mobile Robot (ROS 2)</span>
              </div>
              <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', marginBottom: '6px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Autonomy Apps:</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#34d399' }}>Nav2 Path Planner &bull; SLAM Toolbox</div>
              </div>
              <div style={{ textAlign: 'center', color: '#10b981', fontSize: '0.78rem', fontWeight: 800, margin: '4px 0' }}>
                &darr; ROS 2 Standard Topic /scan (DDS) &darr;
              </div>
              <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed #10b981', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Active Hardware:</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399' }}>
                  {selectedLidar === 'sick' && 'SICK TiM571 (Ethernet driver -> ROS 2 standard /scan)'}
                  {selectedLidar === 'rplidar' && 'RPLiDAR A3 (UART/USB driver -> ROS 2 standard /scan)'}
                  {selectedLidar === 'velodyne' && 'Velodyne Puck (UDP driver -> PointCloud2 -> ROS 2 /scan)'}
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '12px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '0.82rem',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            <span><strong>Zero Code Changes in Nav2!</strong> Swapping sensors only switches the lightweight driver node. Nav2 navigation never knows or cares about the hardware brand!</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 3: THE STORY OF A ROBOTICS DEVELOPER */}
      {/* ========================================================================= */}
      <section id="sec-tragedy" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b'
          }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              3. The Story of a Robotics Developer: Why We Need a Standard
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              The recurring cycle of abandoned projects and un-reusable code before the robotics revolution.
            </span>
          </div>
        </div>

        {/* Story Diagram Image Card */}
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          background: '#090d16',
          marginBottom: '1.25rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
        }}>
          <img
            src="assets/images/story_of_robotics_developer.png"
            alt="Story of a Robotics Developer - The Cycle of Rewriting Frameworks"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* 4-Beat Storyboard Stepper */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '10px',
          marginBottom: '1rem'
        }}>
          <div
            onClick={() => setActiveStoryBeat(0)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: activeStoryBeat === 0 ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-primary)',
              border: activeStoryBeat === 0 ? '2px solid #f59e0b' : '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', marginBottom: '4px' }}>BEAT 1: PERSON X STARTS</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>Writes Custom Sockets</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Spends 8 weeks debugging serial UART and TCP packet protocols.</div>
          </div>

          <div
            onClick={() => setActiveStoryBeat(1)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: activeStoryBeat === 1 ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-primary)',
              border: activeStoryBeat === 1 ? '2px solid #ef4444' : '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', marginBottom: '4px' }}>BEAT 2: THE BURNOUT</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>Project Abandoned</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Runs out of time and energy before ever building autonomous features.</div>
          </div>

          <div
            onClick={() => setActiveStoryBeat(2)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: activeStoryBeat === 2 ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-primary)',
              border: activeStoryBeat === 2 ? '2px solid #3b82f6' : '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', marginBottom: '4px' }}>BEAT 3: PERSON Y'S QUEST</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>Searches For Code</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Finds Person X's code completely undocumented, brittle, and incompatible.</div>
          </div>

          <div
            onClick={() => setActiveStoryBeat(3)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: activeStoryBeat === 3 ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-primary)',
              border: activeStoryBeat === 3 ? '2px solid #a855f7' : '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a855f7', marginBottom: '4px' }}>BEAT 4: THE GROUNDHOG LOOP</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>Rewrites from Scratch!</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Starts yet another custom framework that will also be forgotten.</div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '8px 12px',
          background: 'rgba(245, 158, 11, 0.08)',
          borderRadius: '6px',
          fontSize: '0.85rem',
          color: 'var(--text-primary)',
          fontStyle: 'italic',
          fontWeight: 600
        }}>
          &ldquo;They develop a robotics framework that ends up being non-reusable, not supported, and quickly forgotten.&rdquo;
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 4: THE ROS GOAL: STOP REINVENTING THE WHEEL */}
      {/* ========================================================================= */}
      <section id="sec-mission" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
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
              4. The ROS Goal: Stop Reinventing the Wheel!
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              A universal foundation so you can build real robotics intelligence instead of plumbing.
            </span>
          </div>
        </div>

        {/* Visual Efficiency Ratio Comparison Bar */}
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Engineering Time Allocation: Before vs. After ROS
          </div>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '4px' }}>
              <span>WITHOUT ROS STANDARD (Square Wheels)</span>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>80% Wasted Plumbing &bull; 20% Autonomy</span>
            </div>
            <div style={{ display: 'flex', height: '14px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '80%', background: '#ef4444' }} title="Writing custom drivers, sockets, math" />
              <div style={{ width: '20%', background: '#475569' }} title="Actual robot features" />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '4px' }}>
              <span>WITH ROS 2 STANDARD (Round Wheels)</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>10% Setup &bull; 90% Real Robotics Autonomy</span>
            </div>
            <div style={{ display: 'flex', height: '14px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '10%', background: '#0284c7' }} title="Configure standard ROS nodes" />
              <div style={{ width: '90%', background: '#10b981' }} title="Build navigation, computer vision, AI tasks" />
            </div>
          </div>
        </div>

        {/* Reinventing the Wheel Cartoon Image Card & Mission Statement */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          alignItems: 'center',
          marginBottom: '1.25rem'
        }}>
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
          }}>
            <img
              src="assets/images/reinventing_wheel_cartoon.jpg"
              alt="Reinventing the Wheel - Too busy pulling square wheels"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid var(--accent-primary)',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              THE ROS MISSION MANIFESTO
            </div>
            <blockquote style={{ margin: '0 0 10px', fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.55 }}>
              &ldquo;The ROS goal is to provide a standard for robotics software development, that you can use on any robot. Whether you are programming a mobile robot, robotic arm, drone, boat, vending machine&hellip; etc.&rdquo;
            </blockquote>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              This standard allows you to <strong>focus on the key features of your application</strong>, using an existing battle-tested foundation, instead of trying to do everything yourself.
            </p>
          </div>
        </div>

        {/* 3 Dilemmas Resolved by ROS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
              <AlertTriangle size={15} />
              <span>Hardware Chaos &amp; Noise</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Standardized message schemas (<code style={{ color: '#f59e0b' }}>/scan</code>, <code style={{ color: '#f59e0b' }}>/odom</code>) isolate physical sensor quirks from your code.
            </p>
          </div>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
              <Flame size={15} />
              <span>The &ldquo;Square Wheel&rdquo; Trap</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Instead of spending 80% of budget writing serial sockets, use battle-tested open-source packages.
            </p>
          </div>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
              <CheckCircle2 size={15} />
              <span>Modular Middleware Solution</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Decoupled peer-to-peer nodes communicate via industrial DDS with zero single point of failure.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: THE 4 FOUNDATIONAL PILLARS (PICTOGRAPHICAL ARCHITECTURE) */}
      {/* ========================================================================= */}
      <section id="sec-pillars" style={{
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
              5. The 4 Pillars of ROS Architecture (Pictographical Overview)
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
                  <span style={{ color: '#94a3b8' }}>Goal ──► FB ──► Result</span>
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
      {/* SECTION 6: THE LIVING ROBOT MOTION SIMULATOR */}
      {/* ========================================================================= */}
      <section id="sec-simulator" style={{
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
                6. The Living Robot: Data Highway &amp; Motion Flow Simulator
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
      {/* SECTION 7: ROS 1 VS ROS 2 ARCHITECTURAL SANDBOX & UNIFIED RCL CORE */}
      {/* ========================================================================= */}
      <section id="sec-architecture" style={{
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
                7. Architectural Comparison: ROS 1 vs. ROS 2 &amp; Unified RCL
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
      {/* SECTION 8: SOURCING THE ENVIRONMENT (STREAMLINED 3-STEP LAB) */}
      {/* ========================================================================= */}
      <section id="sec-lab" style={{
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
              8. Sourcing the ROS 2 Environment (3-Step Quick Lab)
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
      {/* SECTION 9: PRACTICAL SMOKE TEST */}
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
              9. Practical Smoke Test: Talker &amp; Listener
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
