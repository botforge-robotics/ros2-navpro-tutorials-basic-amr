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
  Sliders,
  Box,
  Monitor,
  Flame,
  AlertTriangle,
  Code2,
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
  ChevronRight,
  ChevronLeft
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

  const storySteps = [
    {
      stepNumber: 1,
      title: 'The Dream: Medicine Delivery Robot',
      subtitle: 'Engineer plans an autonomous hospital delivery robot',
      accent: '#38bdf8',
      image: 'assets/images/story_step1_dream.jpg',
      dialogue: '“I want to build an autonomous medicine delivery robot for hospitals!”',
      narrative: 'A student/engineer starts a new robotics project with high ambition: she wants to build an Autonomous Medicine Delivery Robot capable of navigating hospital corridors and delivering supplies safely to patients. Soon, she discovers that robotics is hard to learn and developing good software takes immense time.',
      impact: 'The Goal: Autonomous Medicine Delivery • Reality: Robotics is hard to learn'
    },
    {
      stepNumber: 2,
      title: 'The Plumbing Trap: Drivers & Sockets',
      subtitle: 'Months spent on LiDAR data, camera frames, and motor control',
      accent: '#f59e0b',
      image: 'assets/images/story_step2_plumbing.jpg',
      dialogue: '“How do I get data from LiDAR? How do I read camera images? How do I control motors and make all programs work together?”',
      narrative: 'Soon, all her time is consumed by low-level plumbing. Instead of writing autonomous navigation logic, she spends months trying to figure out how to get raw data from the LiDAR, how to read images from the camera, how to control the motors, and how to make all these separate programs communicate with each other.',
      impact: 'Time Killed: Trapped in device drivers and IPC plumbing rather than autonomous delivery'
    },
    {
      stepNumber: 3,
      title: 'Goal Abandoned: Just an RC Car',
      subtitle: 'Medicine delivery abandoned; only managed to move motors via remote control',
      accent: '#ef4444',
      image: 'assets/images/story_step3_burnout.jpg',
      dialogue: '“The deadline is here. The autonomous medicine delivery robot is abandoned—all I managed to make is an RC car with hacked code.”',
      narrative: 'The project deadline arrives (often a 2–3 year PhD timeframe). So much time was killed trying to write communication plumbing that the main goal—an autonomous medicine delivery robot—was completely abandoned. All she managed to do was make the motors move using a hacked remote control. The code is fragile, unmaintainable, and the robot sits dormant in the lab.',
      impact: 'Outcome: Autonomy abandoned • Only moved motors via remote control with hacked code'
    },
    {
      stepNumber: 4,
      title: 'Another Boy: Food Delivery Robot Loop',
      subtitle: 'Finds her motor & LiDAR code unusable, starts from scratch all over again',
      accent: '#a855f7',
      image: 'assets/images/story_step4_cycle.jpg',
      dialogue: '“I want to build a Food Delivery Robot! ...Wait, her motor and LiDAR code is tangled and unusable. I have to start from scratch!”',
      narrative: 'A few weeks later, another boy sets out to develop a Food Delivery Robot. Looking to save time, he finds her project online where she worked on controlling motors and getting LiDAR data. But because her code was written without any standard framework, it is completely hardcoded, fragile, and non-reusable. So, he has to start writing everything from scratch all over again!',
      impact: 'The Vicious Cycle: Everyone reinvents motor and LiDAR drivers from scratch instead of building applications'
    }
  ];

  // Motion Flow Simulator State
  const [simActive, setSimActive] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1); // 0.5, 1, 2
  const [activeStage, setActiveStage] = useState(0); // 0: Senses, 1: Nerves, 2: Brain, 3: Muscles
  const [obstacleActive, setObstacleActive] = useState(false);
  const [packetCounter, setPacketCounter] = useState(1);
  const [lastPacketLog, setLastPacketLog] = useState('DDS Bus Initialized: Discovery active on UDP multicast');

  // ROS 1 vs ROS 2 Sandbox State
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
    { id: 'sec-tragedy', num: '2', title: "Dev Tragedy", icon: AlertTriangle },
    { id: 'sec-mission', num: '3', title: 'ROS Mission', icon: Flame },
    { id: 'sec-metaphor', num: '4', title: 'What is ROS?', icon: Laptop },
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

        {/* Three Fundamental Ingredients Flow Pipeline (Side-by-Side Row) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.25rem',
          alignItems: 'stretch'
        }}>
          {/* Stage 1: Perception */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            borderLeft: '5px solid #0284c7',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0284c7', background: 'rgba(2, 132, 199, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                  STAGE 1 &bull; SENSES (EYES &amp; EARS)
                </span>
                <h4 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  1. Perception
                </h4>
              </div>
              <Eye size={22} color="#0284c7" />
            </div>
            <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              How the robot senses the world around it. It uses cameras to see, laser scanners to measure distances to walls, and GPS to know its position.
            </p>
            {/* Clean List Styling */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginTop: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>📷</span>
                <span><strong>Cameras (seeing):</strong> Capturing video frames, obstacle features, and visual objects</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>🔴</span>
                <span><strong>LiDAR (measuring distances):</strong> 360-degree laser beams measuring precise distances to obstacles and walls</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>🧭</span>
                <span><strong>GPS &amp; Compass (positioning):</strong> Tracking robot heading direction and global coordinates</span>
              </div>
            </div>
          </div>

          {/* Stage 2: Decision Making */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderLeft: '5px solid #8b5cf6',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                  STAGE 2 &bull; THE BRAIN (THINKING)
                </span>
                <h4 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  2. Decision Making
                </h4>
              </div>
              <Brain size={22} color="#8b5cf6" />
            </div>
            <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              How the robot thinks and plans. It takes the sensor information and decides what to do next—stopping before hitting obstacles or finding the best path to its goal.
            </p>
            {/* Clean List Styling */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginTop: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>🛑</span>
                <span><strong>Obstacle Avoidance:</strong> Stop or brake immediately if an unexpected obstacle or person is close</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>🗺️</span>
                <span><strong>Map Processing:</strong> Read the building layout and compute 2D costmaps with danger inflation zones</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>📍</span>
                <span><strong>Path Planning:</strong> Generate smooth, collision-free trajectories from current pose to the destination</span>
              </div>
            </div>
          </div>

          {/* Stage 3: Action */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderLeft: '5px solid #10b981',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                  STAGE 3 &bull; THE MUSCLES (MOVING)
                </span>
                <h4 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  3. Action
                </h4>
              </div>
              <Zap size={22} color="#10b981" />
            </div>
            <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              How the robot physically moves and acts. It turns the brain's decisions into real movement—spinning the drive wheels, moving an arm, or speaking alerts.
            </p>
            {/* Clean List Styling */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginTop: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>⚙️</span>
                <span><strong>Spin Drive Wheels:</strong> Send linear &amp; angular velocity commands to wheel motor controllers</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>🦾</span>
                <span><strong>Actuate Joints:</strong> Move robotic arm joints, grippers, or sensor tilt mechanisms</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.82rem',
                color: 'var(--text-primary)'
              }}>
                <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: '1px' }}>🔊</span>
                <span><strong>Audio &amp; Voice Alerts:</strong> Speak notifications or sound chimes to warn pedestrians</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 2: THE STORY OF A ROBOTICS DEVELOPER */}
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
              2. The Story of a Robotics Developer: Why We Need a Standard
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              The recurring cycle of abandoned projects and un-reusable code before the robotics revolution.
            </span>
          </div>
        </div>

        {/* Vertical Storyboard Sequence: Beat 1 -> Beat 2 -> Beat 3 -> Beat 4 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          {storySteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-primary)',
                border: `1px solid ${step.accent}35`,
                borderLeft: `5px solid ${step.accent}`,
                borderRadius: '12px',
                padding: '1.15rem 1.35rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Step Header: Badge + Title + Subtitle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    color: step.accent,
                    background: `${step.accent}18`,
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    BEAT {idx + 1} OF 4
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {step.title}
                  </h4>
                </div>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {step.subtitle}
                </span>
              </div>

              {/* 16:9 Cinematic Visual Frame */}
              <div style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: `1px solid ${step.accent}30`,
                background: '#0a0f1d',
                marginBottom: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
              }}>
                <img
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>

              {/* Character Dialogue Quote */}
              <div style={{
                background: `${step.accent}12`,
                borderLeft: `3px solid ${step.accent}`,
                padding: '6px 12px',
                borderRadius: '0 6px 6px 0',
                marginBottom: '6px',
                fontStyle: 'italic',
                color: step.accent,
                fontWeight: 700,
                fontSize: '0.88rem',
                lineHeight: 1.45
              }}>
                {step.dialogue}
              </div>

              {/* Narrative description */}
              <p style={{
                margin: '0 0 6px',
                fontSize: '0.88rem',
                color: 'var(--text-primary)',
                lineHeight: 1.55
              }}>
                {step.narrative}
              </p>

              {/* Impact Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.76rem',
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <AlertTriangle size={13} color={step.accent} />
                <span>{step.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Universal Tragedy Conclusion Callout */}
        <div style={{
          padding: '1.15rem 1.4rem',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.28)',
          borderRadius: '10px',
          color: 'var(--text-primary)',
          lineHeight: 1.6
        }}>
          <div style={{
            fontSize: '0.98rem',
            fontWeight: 800,
            color: '#f59e0b',
            marginBottom: '6px'
          }}>
            The Core Robotics Dilemma:
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
            &ldquo;And so on, and so forth. Many people who work in robot software development don’t actually develop robotics applications (such as medicine delivery or food delivery). They spend years building custom motor drivers and low-level frameworks that end up non-reusable, unsupported, not known, and quickly forgotten.&rdquo;
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            borderTop: '1px solid rgba(245, 158, 11, 0.18)',
            paddingTop: '8px'
          }}>
            <span style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171', padding: '3px 9px', borderRadius: '4px', fontWeight: 700 }}>
              🎓 Often happens for people doing a PhD (2–3 years timeframe)
            </span>
            <span style={{ background: 'rgba(14, 165, 233, 0.12)', color: '#38bdf8', padding: '3px 9px', borderRadius: '4px', fontWeight: 700 }}>
              🚀 ROS Solution: Standardized topics (/scan, /cmd_vel) let you build the real application on Day 1!
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* CHAPTER 3: STOP REINVENTING THE WHEEL & STANDARDIZING COMMUNICATION */}
      {/* ========================================================================= */}
      <section id="sec-mission" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
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
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              3. Stop Reinventing the Wheel &amp; Standardize Communication
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              How universal message standards and global community sharing solve the developer crisis and enable plug-and-play robotics.
            </span>
          </div>
        </div>

        {/* Reinventing the Wheel Classic Cartoon Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '1.25rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="assets/images/reinvent_the_wheel.jpg"
            alt="Reinventing the Wheel - No thanks! We are too busy!"
            style={{
              maxWidth: '650px',
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '8px'
            }}
          />
          <div style={{
            marginTop: '12px',
            fontSize: '0.9rem',
            color: '#334155',
            textAlign: 'center',
            fontWeight: 600,
            lineHeight: 1.5,
            maxWidth: '700px'
          }}>
            💡 If you are busy making everything from scratch and rebuilding parts that someone has already worked on, you cannot make every part of your robot perfect.
          </div>
        </div>

        {/* 3 High-Impact Presentation Statements */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {/* Card 1: Stop Reinventing the Wheel */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderTop: '4px solid #ef4444',
            borderRadius: '10px',
            padding: '1.1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ef4444', background: 'rgba(239, 68, 68, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                THE TRAP (BEFORE ROS)
              </span>
              <AlertTriangle size={16} color="#ef4444" />
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              1. Stop Reinventing the Wheel
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Developers spent 80% of project time writing custom motor drivers and serial protocols from scratch, only to abandon them when the project ended.
            </p>
          </div>

          {/* Card 2: Standardize Communication */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(14, 165, 233, 0.25)',
            borderTop: '4px solid #0ea5e9',
            borderRadius: '10px',
            padding: '1.1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0ea5e9', background: 'rgba(14, 165, 233, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                UNIVERSAL BUS STANDARD
              </span>
              <RadioTower size={16} color="#0ea5e9" />
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              2. Standardize Communication
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              ROS 2 defines universal message interfaces (<code style={{ color: '#38bdf8' }}>/scan</code>, <code style={{ color: '#38bdf8' }}>/cmd_vel</code>, <code style={{ color: '#38bdf8' }}>/odom</code>)—completely decoupling high-level software from hardware.
            </p>
          </div>

          {/* Card 3: Global Community Sharing */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderTop: '4px solid #10b981',
            borderRadius: '10px',
            padding: '1.1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                OPEN-SOURCE ECOSYSTEM
              </span>
              <Sparkles size={16} color="#10b981" />
            </div>
            <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              3. Global Community Sharing
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Because all robots speak the same standard, you instantly reuse community packages (<code style={{ color: '#34d399' }}>Nav2</code>, <code style={{ color: '#34d399' }}>SLAM Toolbox</code>, <code style={{ color: '#34d399' }}>MoveIt</code>) on any robot on Day 1.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 4: WHAT IS ROS? THE WINDOWS OS METAPHOR & FRAMEWORK ARCHITECTURE */}
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
              4. What is ROS? The Windows OS Metaphor
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Just as Windows abstracts printers from Google Chrome, ROS abstracts robot hardware from autonomous navigation.
            </span>
          </div>
        </div>

        {/* Visual Metaphor 1: Windows OS vs ROS Inside Robot */}
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #1e293b',
          background: '#0a0f1d',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
        }}>
          <img
            src="assets/images/ros_metaphor_pc_vs_robot.jpg"
            alt="The Operating System Metaphor: Windows OS vs ROS Inside a Robot"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Metaphor Detailed Description Card - High Contrast Theme-Safe */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid rgba(2, 132, 199, 0.3)',
          borderLeft: '4px solid #0284c7',
          borderRadius: '10px',
          padding: '1.15rem 1.4rem',
          marginTop: '1rem',
          marginBottom: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0284c7', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Laptop size={18} />
            <span>The Operating System Metaphor: Windows for PC ➔ ROS for Robots</span>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            Think about how your personal computer works: When you open <strong>Google Chrome</strong>, <strong>Microsoft Word</strong>, or <strong>Blender</strong>, you never have to write custom device drivers to talk to your mouse, keyboard, or printer. The operating system handles all the hardware communication behind the scenes through standardized interfaces.
          </p>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            <strong style={{ color: '#0284c7' }}>ROS does the exact same thing for robots:</strong> Instead of writing low-level code for every motor and camera, your high-level navigation, computer vision, and AI programs talk directly to ROS. If you switch from an expensive industrial laser scanner to a budget sensor, you don&apos;t rewrite your navigation software—ROS takes care of the hardware translation!
          </p>
        </div>

        {/* Visual Metaphor 2: Framework Running on Top of Operating System */}
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #1e293b',
          background: '#0a0f1d',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
        }}>
          <img
            src="assets/images/ros_framework_os_layers.jpg"
            alt="ROS 2 Framework Running on Top of Host Operating Systems - Ubuntu Highly Recommended"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Clean 1-2 Line Core Statement Callout */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%)',
          border: '1px solid rgba(234, 88, 12, 0.35)',
          borderRadius: '10px',
          padding: '1.15rem 1.5rem',
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <p style={{
            margin: '0 0 8px',
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.45
          }}>
            &quot;Robot Operating System, despite its name, is not an operating system; rather, it’s a framework that works on top of an existing operating system.&quot;
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(234, 88, 12, 0.18)',
            border: '1px solid rgba(234, 88, 12, 0.3)',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.86rem',
            color: '#fb923c',
            fontWeight: 700
          }}>
            <span>⭐⭐⭐ Ubuntu Linux is the official Tier-1, best-supported host platform</span>
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
              5. The 4 Pillars of ROS Architecture
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              The four foundational pillars that transform raw software into commercial autonomous robotics systems.
            </span>
          </div>
        </div>

        {/* 4 Pillars Modern Responsive Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Pillar 1: The Plumbing (Communication) */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            borderTop: '4px solid #0284c7',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0284c7', background: 'rgba(2, 132, 199, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                  PILLAR 1 &bull; MIDDLEWARE
                </span>
                <Radio size={20} color="#0284c7" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                1. The Plumbing (Communication)
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Peer-to-peer anonymous communications running over industrial DDS middleware with zero central master bottleneck.
              </p>

              {/* Schematic Card */}
              <div style={{
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '10px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ color: '#0284c7', marginBottom: '6px', fontWeight: 700 }}>
                  [Topic] Continuous Stream<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>/scan (10 Hz) ──► Nav2 / SLAM</span>
                </div>
                <div style={{ color: '#8b5cf6', marginBottom: '6px', fontWeight: 700 }}>
                  [Service] Sync Request/Reply<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Client ◄────► Server (/reset_odom)</span>
                </div>
                <div style={{ color: '#10b981', fontWeight: 700 }}>
                  [Action] Preemptible Goal<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Goal ──► Progress FB ──► Result</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              ⚡ Decoupled Pub/Sub &bull; Zero Master Bottleneck
            </div>
          </div>

          {/* Pillar 2: The Tools */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderTop: '4px solid #8b5cf6',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                  PILLAR 2 &bull; DEV TOOLING
                </span>
                <Sliders size={20} color="#8b5cf6" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                2. The Tools
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Introspection, 3D visualization, and physics simulation to eliminate guesswork and test without hardware risk.
              </p>

              {/* Schematic Card */}
              <div style={{
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '10px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ color: '#8b5cf6', marginBottom: '6px', fontWeight: 700 }}>
                  [RViz2] 3D Sensor Visualizer<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>LiDAR Laser Rays, Costmaps, TF</span>
                </div>
                <div style={{ color: '#0284c7', marginBottom: '6px', fontWeight: 700 }}>
                  [Gazebo] Physics Simulator<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Gravity, Friction, Obstacle Collisions</span>
                </div>
                <div style={{ color: '#10b981', fontWeight: 700 }}>
                  [ros2 bag] Flight Recorder<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Record &amp; replay MCAP telemetry</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#8b5cf6', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              🔍 Introspect Telemetry &bull; Test Without Crash Risk
            </div>
          </div>

          {/* Pillar 3: The Capabilities */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(236, 72, 153, 0.25)',
            borderTop: '4px solid #ec4899',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#ec4899', background: 'rgba(236, 72, 153, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                  PILLAR 3 &bull; AUTONOMY
                </span>
                <Cpu size={20} color="#ec4899" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                3. The Capabilities
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Production-ready robotics algorithms ready to deploy out-of-the-box without PhD-level rewrites.
              </p>

              {/* Schematic Card */}
              <div style={{
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '10px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ color: '#ec4899', marginBottom: '6px', fontWeight: 700 }}>
                  [Nav2] Autonomous Navigation<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Smac/A* Planner, DWB Controller</span>
                </div>
                <div style={{ color: '#8b5cf6', marginBottom: '6px', fontWeight: 700 }}>
                  [SLAM Toolbox] 2D Mapping<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Graph SLAM mapping from /scan</span>
                </div>
                <div style={{ color: '#0284c7', fontWeight: 700 }}>
                  [TF2] Coordinate Trees<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>map ──► odom ──► base_link</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#ec4899', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              🧠 Turnkey Autonomy &bull; Battle-Tested Algorithms
            </div>
          </div>

          {/* Pillar 4: The Ecosystem */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderTop: '4px solid #10b981',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                  PILLAR 4 &bull; ECOSYSTEM
                </span>
                <Compass size={20} color="#10b981" />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                4. The Ecosystem
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Open-source consortium standards backed by leading global robotics enterprises and hardware vendors.
              </p>

              {/* Schematic Card */}
              <div style={{
                background: 'var(--bg-card, var(--bg-surface))',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '10px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ color: '#10b981', marginBottom: '6px', fontWeight: 700 }}>
                  [Apache 2.0] Open Source<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Royalty-free commercial AMRs</span>
                </div>
                <div style={{ color: '#0284c7', marginBottom: '6px', fontWeight: 700 }}>
                  [Vendor Drivers] Plug &amp; Play<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>SICK, RealSense, ODrive SDKs</span>
                </div>
                <div style={{ color: '#8b5cf6', fontWeight: 700 }}>
                  [OSRA Alliance] Global Consortium<br />
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Open Robotics consortium</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              🌐 Global Standard &bull; Multi-Vendor Interoperability
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
            style={{ width: '100%', height: 'auto', aspectRatio: '1000 / 410', display: 'block' }}
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

        </div>

        {/* 3-Tier Layer Color Legend Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          padding: '10px 18px',
          background: 'var(--bg-primary)',
          borderRadius: '10px',
          border: '1px solid var(--border-color)',
          fontSize: '0.84rem',
          fontWeight: 700,
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#3b82f6', display: 'inline-block' }}></span>
            <span style={{ color: '#2563eb' }}>Layer 1: Application Layer</span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>&bull;</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#f59e0b', display: 'inline-block' }}></span>
            <span style={{ color: '#d97706' }}>Layer 2: Middleware Layer</span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>&bull;</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '3px', background: '#10b981', display: 'inline-block' }}></span>
            <span style={{ color: '#059669' }}>Layer 3: OS Layer</span>
          </div>
        </div>

        {/* Dual Side-by-Side Architectural Sandboxes (Side-by-Side for Direct Comparison) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem',
          alignItems: 'stretch'
        }}>
          {/* ARCHITECTURE 1: ROS 1 Centralized Master Architecture */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderTop: '4px solid #ef4444',
            borderRadius: '12px',
            padding: '1.35rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#ef4444', background: 'rgba(239, 68, 68, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                    LEGACY ARCHITECTURE
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#ef4444' }}>
                    1. ROS 1 Centralized Architecture: Single Point of Failure
                  </h4>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  All nodes register and resolve communication through the centralized <code>roscore</code> master process.
                </span>
              </div>
              <button
                onClick={() => setRoscoreCrashed(prev => !prev)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: roscoreCrashed ? '#10b981' : '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease'
                }}
              >
                {roscoreCrashed ? 'Restart roscore Master' : '💥 Crash roscore Master'}
              </button>
            </div>

            {/* ROS 1 3-Layer Stack Display */}
            <div style={{
              background: 'var(--bg-card, var(--bg-surface))',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '1.25rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flex: 1
            }}>
              {/* Layer 1: Application Layer (Blue Theme -> Crashed/Halted when roscore is killed) */}
              <div style={{
                background: roscoreCrashed ? 'rgba(239, 68, 68, 0.08)' : 'rgba(59, 130, 246, 0.05)',
                border: '1px solid ' + (roscoreCrashed ? 'rgba(239, 68, 68, 0.5)' : 'rgba(59, 130, 246, 0.35)'),
                borderLeft: '4px solid ' + (roscoreCrashed ? '#ef4444' : '#3b82f6'),
                borderRadius: '8px',
                padding: '10px 14px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: roscoreCrashed ? '#ef4444' : '#2563eb',
                    background: roscoreCrashed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid ' + (roscoreCrashed ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.35)'),
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {roscoreCrashed ? 'Layer 1: Application Layer (HALTED & SEVERED)' : 'Layer 1: Application Layer'}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: roscoreCrashed ? '#ef4444' : '#ef4444', fontWeight: 800 }}>
                    {roscoreCrashed ? '💥 Single Point of Failure Triggered' : '⚠️ Centralized Discovery Dependency'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {/* Master Oval */}
                  <div style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    background: roscoreCrashed ? '#dc2626' : '#ef4444',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    boxShadow: roscoreCrashed ? '0 0 12px rgba(239, 68, 68, 0.6)' : '0 2px 8px rgba(239, 68, 68, 0.4)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    {roscoreCrashed ? '❌ Master (PROCESS KILLED)' : 'Master (roscore)'}
                  </div>

                  {/* Application Nodes Box */}
                  <div style={{
                    flex: 1,
                    minWidth: '220px',
                    border: '1px dashed ' + (roscoreCrashed ? 'rgba(239, 68, 68, 0.6)' : 'rgba(59, 130, 246, 0.4)'),
                    borderRadius: '6px',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexWrap: 'wrap',
                    background: roscoreCrashed ? 'rgba(239, 68, 68, 0.05)' : 'rgba(59, 130, 246, 0.08)'
                  }}>
                    <span style={{ fontSize: '0.74rem', color: roscoreCrashed ? '#ef4444' : '#2563eb', fontWeight: 800, marginRight: '2px' }}>
                      {roscoreCrashed ? 'Disconnected Nodes:' : 'Nodes:'}
                    </span>
                    {['/camera_node', '/lidar_node', '/path_planner', '/motor_controller'].map(node => (
                      <div
                        key={node}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          background: roscoreCrashed ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-surface)',
                          color: roscoreCrashed ? '#f87171' : 'var(--text-primary)',
                          border: roscoreCrashed ? '1px dashed #ef4444' : '1px solid rgba(59, 130, 246, 0.3)',
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {roscoreCrashed ? `⚠️ ${node}` : node}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Layer 2: Middleware Layer (Amber Theme - Libraries in RAM, XML-RPC lookup unreachable) */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '8px',
                padding: '10px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#d97706',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Layer 2: Middleware Layer (ROS 1 Boundary)
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#334155', color: '#f8fafc', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                    ROS 1 Stack
                  </span>
                </div>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '6px',
                  padding: '8px',
                  textAlign: 'center',
                  marginBottom: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#d97706'
                }}>
                  Client Library (roscpp / rospy — Independent Codebases in Memory)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{
                    background: roscoreCrashed ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.15)',
                    border: roscoreCrashed ? '1px dashed #ef4444' : '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: '6px',
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: roscoreCrashed ? '#ef4444' : '#d97706'
                  }}>
                    {roscoreCrashed ? '❌ XML-RPC Lookup Severed (roscore Dead)' : 'TCPROS / UDPROS (Custom Protocol)'}
                  </div>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    borderRadius: '6px',
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)'
                  }}>
                    Nodelet API (C++ Shared Process)
                  </div>
                </div>
              </div>

              {/* Layer 3: OS Layer (Emerald Theme - 100% Alive & Running) */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderLeft: '4px solid #10b981',
                borderRadius: '8px',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#059669',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Layer 3: OS Layer
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Linux (Ubuntu Only &bull; No Native Windows/RTOS)</span>
                  <span style={{
                    fontSize: '0.72rem',
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#059669',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 800
                  }}>
                    {roscoreCrashed ? '🟢 Host OS 100% Operational' : 'Ubuntu 20.04/18.04'}
                  </span>
                </span>
              </div>

              {roscoreCrashed && (
                <div style={{
                  color: '#f87171',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  background: 'rgba(239, 68, 68, 0.1)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  lineHeight: 1.5
                }}>
                  <strong>⚠️ Master Failure Scope:</strong> Only the <strong>Application Layer</strong> and <strong>Master XML-RPC Lookup</strong> crash! The host <strong>Linux OS (Layer 3)</strong> and system kernel remain 100% operational. However, because ROS 1 requires the centralized Master process for node registration and topic handshake discovery, application nodes cannot find peers or register new topics &mdash; halting the robotics application.
                </div>
              )}
            </div>
          </div>

          {/* ARCHITECTURE 2: ROS 2 Jazzy Decentralized FastDDS Peer-to-Peer Mesh */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderTop: '4px solid #10b981',
            borderRadius: '12px',
            padding: '1.35rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                    MODERN INDUSTRY BENCHMARK
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
                    2. ROS 2 Jazzy: Decentralized DDS Peer-to-Peer Mesh
                  </h4>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  No master process exists! Nodes discover each other automatically via standard DDS UDP multicast.
                </span>
              </div>
              <button
                onClick={() => setRos2NodeCrashed(prev => !prev)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: ros2NodeCrashed ? '#10b981' : '#f59e0b',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease'
                }}
              >
                {ros2NodeCrashed ? 'Restore Camera Node' : '💥 Kill Camera Node'}
              </button>
            </div>

            {/* ROS 2 3-Layer Stack Display */}
            <div style={{
              background: 'var(--bg-card, var(--bg-surface))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flex: 1
            }}>
              {/* Layer 1: Application Layer (Blue Theme) */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                borderLeft: '4px solid #3b82f6',
                borderRadius: '8px',
                padding: '10px 14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#2563eb',
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.35)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Layer 1: Application Layer (Masterless Peer-to-Peer)
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 800 }}>
                    ⭐ Zero Master Node
                  </span>
                </div>
                <div style={{
                  border: '1px dashed rgba(59, 130, 246, 0.4)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexWrap: 'wrap',
                  background: 'rgba(59, 130, 246, 0.08)'
                }}>
                  <span style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: 800, marginRight: '4px' }}>
                    Application:
                  </span>
                  <div style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    background: ros2NodeCrashed ? '#450a0a' : 'rgba(2, 132, 199, 0.15)',
                    color: ros2NodeCrashed ? '#fca5a5' : '#0284c7',
                    border: ros2NodeCrashed ? '1px dashed #ef4444' : '1px solid rgba(2, 132, 199, 0.3)',
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {ros2NodeCrashed ? '💀 Node: /camera_node (CRASHED)' : 'Node: /camera_node'}
                  </div>

                  {['/lidar_node', '/path_planner', '/motor_controller'].map(node => (
                    <div
                      key={node}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '16px',
                        background: 'rgba(59, 130, 246, 0.12)',
                        color: '#2563eb',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        fontSize: '0.76rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      Node: {node}
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 2: Middleware Layer (Amber Theme - ROS 2 Boundary) */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '8px',
                padding: '10px 14px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#d97706',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Layer 2: Middleware Layer (ROS 2 Boundary)
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#eab308', color: '#000000', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                    ROS 2 Core
                  </span>
                </div>
                {/* Client Library */}
                <div style={{
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '6px',
                  padding: '8px',
                  textAlign: 'center',
                  marginBottom: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#d97706'
                }}>
                  Client Library (rclcpp / rclpy / unified C rcl)
                </div>
                {/* Abstract DDS Layer */}
                <div style={{
                  background: 'rgba(245, 158, 11, 0.18)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  borderRadius: '6px',
                  padding: '8px',
                  textAlign: 'center',
                  marginBottom: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: '#b45309'
                }}>
                  Abstract DDS Layer (rmw — ROS Middleware Interface)
                </div>
                {/* Split Row: DDS (Standard) & Intra-process API */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '6px',
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#d97706'
                  }}>
                    DDS (OMG Standard &bull; FastDDS / CycloneDDS)
                  </div>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '6px',
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#d97706'
                  }}>
                    Intra-process API (Zero-Copy)
                  </div>
                </div>
              </div>

              {/* Layer 3: OS Layer (Emerald Theme) */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderLeft: '4px solid #10b981',
                borderRadius: '8px',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#059669',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Layer 3: OS Layer
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#059669' }}>
                  Linux / Windows / macOS / RTOS (Real-Time OS: FreeRTOS, Zephyr, QNX)
                </span>
              </div>

              <div style={{
                color: ros2NodeCrashed ? '#10b981' : 'var(--text-secondary)',
                fontSize: '0.86rem',
                fontWeight: 600,
                background: ros2NodeCrashed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                padding: '8px 12px',
                borderRadius: '6px',
                border: ros2NodeCrashed ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid var(--border-color)'
              }}>
                {ros2NodeCrashed
                  ? '✅ FAULT RESILIENT: Camera node crashed, but because DDS uses decentralized participant announcements and the Abstract DDS Layer handles discovery, the LiDAR, Planner, and Motor Controller continue operating safely!'
                  : '✅ DECENTRALIZED MESH: Nodes discover peers dynamically over DDS multicast. No central master required.'}
              </div>
            </div>
          </div>
        </div>

        {/* Component Architecture Breakdown: 1-Sentence Summary per Component */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.35rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏛️</span>
            <span>Architectural Breakdown: 1-Sentence Explanation per Component</span>
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '1.25rem'
          }}>
            {/* ROS 1 Column */}
            <div style={{
              background: 'var(--bg-card, var(--bg-surface))',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderTop: '3px solid #ef4444',
              borderRadius: '10px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>ROS 1 Components (Legacy Centralized)</span>
              </div>

              {/* Layer 1 Items */}
              <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2563eb', marginBottom: '2px' }}>
                  • Master (roscore)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Centralized XML-RPC naming and lookup service that all nodes must query to discover peers and establish topic connections.
                </div>
              </div>

              <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2563eb', marginBottom: '2px' }}>
                  • Application Nodes
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  User robotics algorithms that depend entirely on the Master for connection lookup and freeze if it fails.
                </div>
              </div>

              {/* Layer 2 Items */}
              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '2px' }}>
                  • Client Library (roscpp / rospy)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Two independently written language codebases that suffered from feature disparities and differing threading behaviors.
                </div>
              </div>

              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '2px' }}>
                  • TCPROS / UDPROS
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Custom socket transport lacking native QoS policies, data encryption, and lossy wireless support.
                </div>
              </div>

              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '2px' }}>
                  • Nodelet API (C++)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Specialized C++ mechanism sharing memory inside one process to bypass network serialization.
                </div>
              </div>

              {/* Layer 3 Items */}
              <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', marginBottom: '2px' }}>
                  • OS Layer
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Strictly bound to Linux distributions with no native support for Windows, macOS, or microcontrollers.
                </div>
              </div>
            </div>

            {/* ROS 2 Column */}
            <div style={{
              background: 'var(--bg-card, var(--bg-surface))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderTop: '3px solid #10b981',
              borderRadius: '10px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>ROS 2 Components (Modern Decentralized)</span>
              </div>

              {/* Layer 1 Items */}
              <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2563eb', marginBottom: '2px' }}>
                  • Application Nodes (Masterless)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Autonomous nodes that dynamically discover peers via DDS UDP multicast with zero single point of failure.
                </div>
              </div>

              {/* Layer 2 Items */}
              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '2px' }}>
                  • Client Library (rclcpp / rclpy / rcl)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Thin language wrappers built upon a shared C core (rcl), ensuring 100% behavioral and threading parity.
                </div>
              </div>

              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '2px' }}>
                  • Abstract DDS Layer (rmw)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Standard middleware interface that decouples ROS 2 from specific DDS vendors, enabling zero-code vendor switching.
                </div>
              </div>

              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '2px' }}>
                  • DDS (FastDDS / CycloneDDS)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  OMG industrial standard handling peer discovery, data encryption, and configurable Quality of Service (QoS).
                </div>
              </div>

              <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', marginBottom: '2px' }}>
                  • Intra-process API (Zero-Copy)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Passes direct memory pointers between co-located nodes to achieve ultra-low microsecond latency.
                </div>
              </div>

              {/* Layer 3 Items */}
              <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '10px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', marginBottom: '2px' }}>
                  • OS Layer (Multi-Platform &amp; RTOS)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Universal multi-platform support spanning developer workstations, cloud servers, and real-time embedded microcontrollers (FreeRTOS/Zephyr).
                </div>
              </div>
            </div>
          </div>
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

        {/* 3 Step Interactive Workflow (Stacked Vertically in Column Flow) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
          
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
