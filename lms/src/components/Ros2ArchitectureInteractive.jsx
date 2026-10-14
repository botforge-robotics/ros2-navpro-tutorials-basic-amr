import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Cpu,
  Layers,
  Zap,
  Radio,
  Server,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Compass,
  Eye,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  Sliders,
  Box,
  Monitor,
  Video,
  ChevronRight,
  Flame,
  AlertTriangle,
  Info
} from 'lucide-react';

export function Ros2ArchitectureInteractive() {
  // Video player chapter state
  const [activeVideoChapter, setActiveVideoChapter] = useState(0);

  // 4 Pillars Active Tab
  const [activePillarTab, setActivePillarTab] = useState('plumbing');

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
  const [qosPolicy, setQosPolicy] = useState('best_effort'); // 'best_effort' or 'reliable'

  // Interactive Terminal Simulator State
  const [isSourced, setIsSourced] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([
    { text: 'student@navpro-workshop:~$ ', type: 'prompt' }
  ]);

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

  // Terminal simulator commands
  const runTerminalCommand = (cmd) => {
    if (cmd === 'ros2_uncheck') {
      setIsSourced(false);
      setTerminalOutput([
        { text: 'student@navpro-workshop:~$ ros2 node list', type: 'cmd' },
        { text: 'bash: ros2: command not found', type: 'error' },
        { text: '⚠️ [Notice] The ROS 2 environment has not been sourced into this shell session!', type: 'warn' },
        { text: 'student@navpro-workshop:~$ ', type: 'prompt' }
      ]);
    } else if (cmd === 'source') {
      setIsSourced(true);
      setTerminalOutput([
        { text: 'student@navpro-workshop:~$ source /opt/ros/jazzy/setup.bash', type: 'cmd' },
        { text: '✅ Environment sourced: AMENT_PREFIX_PATH=/opt/ros/jazzy', type: 'success' },
        { text: '✅ Python library path configured: PYTHONPATH=/opt/ros/jazzy/lib/python3.12/site-packages', type: 'success' },
        { text: 'student@navpro-workshop:~$ ros2 --help', type: 'cmd' },
        { text: 'usage: ros2 [-h] Call `ros2 <command> -h` for more detailed usage.', type: 'info' },
        { text: 'Commands: action, bag, component, daemon, launch, lifecycle, msg, node, param, pkg, run, service, topic, wtf', type: 'info' },
        { text: 'student@navpro-workshop:~$ ', type: 'prompt' }
      ]);
    }
  };

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
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '680px', lineHeight: 1.5 }}>
            Master the foundational principles of the Robot Operating System. Explore why robotics is challenging, experience the 4 Pillars of ROS, and manipulate a live interactive simulation of data pulsing through the robot's nervous system.
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
      {/* SECTION 1: OFFICIAL VIDEO THEATER */}
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
            <Video size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              1. The Foundation: Official Open Robotics Introduction
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Watch the 3-minute executive briefing by Open Robotics (ros.org) on why ROS was born.
            </span>
          </div>
        </div>

        {/* Video Player */}
        <div style={{
          position: 'relative',
          paddingBottom: '52%',
          height: 0,
          overflow: 'hidden',
          borderRadius: '12px',
          background: '#090d16',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.25rem'
        }}>
          <iframe
            src="https://player.vimeo.com/video/639236696?h=740f412ce5&title=0&byline=0&portrait=0"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="ROS Introduction by Open Robotics"
          />
        </div>

        {/* Why Robotics is Hard: 3 Problem Cards */}
        <h4 style={{ margin: '1.25rem 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Why is Robotics Hard? The Three Critical Dilemmas Addressed by ROS:
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
              <AlertTriangle size={16} />
              <span>Hardware Chaos &amp; Noise</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Robots exist in the physical world where friction is imperfect, LiDAR reflects off mirrors, camera lighting changes constantly, and motors encounter mechanical back-drivability.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
              <Flame size={16} />
              <span>The "Reinventing the Wheel" Trap</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Before ROS, every robotics team spent years rewriting basic motor drivers, coordinate transformations, and network message sockets instead of building real autonomous products.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
              <CheckCircle2 size={16} />
              <span>The Middleware Solution</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              ROS acts as the universal "Plumbing", turning the robot into a modular network of decoupled nodes that communicate over standardized message interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE 4 FOUNDATIONAL PILLARS (INTERACTIVE EXPLORER) */}
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
              2. The 4 Pillars of ROS Architecture
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Click each pillar below to inspect its mechanics, code representation, and impact.
            </span>
          </div>
        </div>

        {/* Pillar Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginBottom: '1.25rem'
        }}>
          {[
            { id: 'plumbing', label: '1. The Plumbing', icon: Radio, color: '#0284c7' },
            { id: 'tools', label: '2. The Tools', icon: Sliders, color: '#8b5cf6' },
            { id: 'capabilities', label: '3. Capabilities', icon: Cpu, color: '#ec4899' },
            { id: 'ecosystem', label: '4. Ecosystem', icon: Compass, color: '#10b981' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activePillarTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePillarTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: isActive ? tab.color : 'var(--bg-primary)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? `1px solid ${tab.color}` : '1px solid var(--border-color)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Content Card */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          {activePillarTab === 'plumbing' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Pillar 1</span>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  The Plumbing: Inter-Process Communication (IPC) via DDS
                </h4>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                In robotics, software is split into small, modular, independent executables called <strong>Nodes</strong>. The "Plumbing" connects these nodes anonymously over the local network using DDS (Data Distribution Service). A camera node doesn't care who receives its images—it simply publishes to <code>/camera/image_raw</code>.
              </p>

              {/* Three IPC Mechanisms */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <Radio size={15} />
                    <span>Topics (Pub/Sub)</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Continuous, asynchronous many-to-many data streaming. Used for sensor telemetry and motor drive commands.
                  </p>
                  <code style={{ fontSize: '0.78rem', background: 'var(--bg-code)', color: '#38bdf8', padding: '3px 6px', borderRadius: '4px', display: 'block' }}>
                    self.create_publisher(LaserScan, '/scan', 10)
                  </code>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b5cf6', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <Activity size={15} />
                    <span>Services (RPC 2-Way)</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Synchronous/asynchronous Request-and-Response. Used for state queries or one-shot configuration toggles.
                  </p>
                  <code style={{ fontSize: '0.78rem', background: 'var(--bg-code)', color: '#c084fc', padding: '3px 6px', borderRadius: '4px', display: 'block' }}>
                    self.create_service(SetBool, '/set_turbo', callback)
                  </code>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <Compass size={15} />
                    <span>Actions (Long Tasks)</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Goal negotiation with continuous progress feedback and clean preemption (cancellation). Used for autonomous navigation.
                  </p>
                  <code style={{ fontSize: '0.78rem', background: 'var(--bg-code)', color: '#34d399', padding: '3px 6px', borderRadius: '4px', display: 'block' }}>
                    ActionClient(self, NavigateToPose, 'navigate_to_pose')
                  </code>
                </div>
              </div>
            </div>
          )}

          {activePillarTab === 'tools' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Pillar 2</span>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  The Tools: Developer Superpowers &amp; Simulation
                </h4>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Robots produce thousands of numeric parameters every second. Without visualization and physics simulation, debugging an AMR is impossible. ROS 2 provides an industry-standard developer suite:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b5cf6', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <Eye size={16} />
                    <span>RViz2 (3D Visualizer)</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Renders 3D coordinate frames (TF), point clouds, costmaps, and robot meshes in real time.
                  </p>
                  <code style={{ fontSize: '0.78rem', background: 'var(--bg-code)', color: '#a78bfa', padding: '3px 6px', borderRadius: '4px', display: 'block' }}>
                    $ rviz2
                  </code>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <Box size={16} />
                    <span>Gazebo Harmonic (Simulator)</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Simulates Newtonian physics, wheel slip, laser bouncing, and inertia before touching physical hardware.
                  </p>
                  <code style={{ fontSize: '0.78rem', background: 'var(--bg-code)', color: '#38bdf8', padding: '3px 6px', borderRadius: '4px', display: 'block' }}>
                    $ gz sim warehouse.world
                  </code>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <RotateCcw size={16} />
                    <span>ros2 bag (Flight Recorder)</span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Records live warehouse sensor streams to high-speed MCAP files to replay and debug algorithms offline.
                  </p>
                  <code style={{ fontSize: '0.78rem', background: 'var(--bg-code)', color: '#34d399', padding: '3px 6px', borderRadius: '4px', display: 'block' }}>
                    $ ros2 bag record -a
                  </code>
                </div>
              </div>
            </div>
          )}

          {activePillarTab === 'capabilities' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Pillar 3</span>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  The Capabilities: Ready-to-Deploy Robotics Algorithms
                </h4>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Instead of coding mapping and trajectory algorithms from scratch, ROS 2 provides battle-tested production frameworks that power commercial mobile robots worldwide:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 800, color: '#ec4899' }}>Nav2 (Navigation Stack)</h5>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    Complete autonomous mission execution: Global Planners (Smac/A*), Local Controllers (DWB), Costmaps, Recovery Behaviors, and Behavior Trees.
                  </p>
                </div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 800, color: '#8b5cf6' }}>SLAM Toolbox</h5>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    2D graph-based Simultaneous Localization and Mapping. Generates high-accuracy floor maps while tracking dynamic robot pose.
                  </p>
                </div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 800, color: '#0284c7' }}>TF2 (Coordinate Geometry)</h5>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    Manages spatial relationships over time across coordinate frames: <code>map &rarr; odom &rarr; base_link &rarr; laser_frame</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePillarTab === 'ecosystem' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Pillar 4</span>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  The Ecosystem: Worldwide Community &amp; Commercial Standards
                </h4>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                ROS 2 is supported by the <strong>Open Robotics / Open Source Robotics Alliance (OSRA)</strong> and an international consortium of Fortune 500 robotics leaders (Amazon Robotics, Bosch, Toyota, Intel, Sony).
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <li><strong>Permissive Open Source:</strong> Apache 2.0 license means you can build proprietary, commercial AMRs without legal royalties.</li>
                <li><strong>Hardware Vendor Drivers:</strong> Buy any LiDAR, IMU, or motor driver—the manufacturer provides plug-and-play ROS 2 drivers.</li>
                <li><strong>Massive Talent Pool:</strong> Standardized conventions allow new robotics engineers to read and maintain robot code instantly.</li>
              </ul>
            </div>
          )}
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
                Watch live telemetry flow from perception to brain to motors across the DDS nervous system.
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

        {/* Dynamic Interactive SVG Canvas */}
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
          gridTemplateColumns: 'repeat(4, 1fr)',
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
      {/* SECTION 4: ROS 1 VS ROS 2 ARCHITECTURAL SANDBOX */}
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
                4. Architectural Evolution Sandbox: ROS 1 vs. ROS 2
              </h3>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Simulate failure modes to witness why the world transitioned from centralized master to DDS.
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
          marginBottom: '1rem'
        }}>
          {archMode === 'ros1' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
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

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#10b981' }}>
                    ROS 2 Jazzy: Decentralized DDS Peer-to-Peer Mesh
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    No master process exists. Nodes discover each other via DDS multicast.
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

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
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

        {/* Architectural Comparison Matrix */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-primary)', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '10px 14px', color: 'var(--text-primary)', fontWeight: 800 }}>Feature</th>
                <th style={{ padding: '10px 14px', color: '#ef4444', fontWeight: 800 }}>ROS 1 (Legacy)</th>
                <th style={{ padding: '10px 14px', color: '#10b981', fontWeight: 800 }}>ROS 2 Jazzy (Industry Standard)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Discovery</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>Centralized <code>roscore</code> master registry</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Decentralized peer-to-peer DDS multicast</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Fault Tolerance</td>
                <td style={{ padding: '10px 14px', color: '#ef4444' }}>Single Point of Failure (Crash stops robot)</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Fault Tolerant (Individual node isolation)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Quality of Service</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>TCP/UDP without delivery guarantees</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Configurable QoS (Best Effort vs. Reliable)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Multi-Robot Fleets</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>Complex bridging hacks</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Native multi-robot with <code>ROS_DOMAIN_ID</code></td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>Python Stack</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>Legacy Python 2.7</td>
                <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: 600 }}>Modern Python 3.12+ (asyncio &amp; executors)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INTERACTIVE SHELL SOURCING PRACTICE */}
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
              5. Sourcing the ROS 2 Environment (Interactive Terminal Lab)
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Understand why <code>source /opt/ros/jazzy/setup.bash</code> is required before running any ROS 2 command.
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          {/* Interactive Shell Output Box */}
          <div style={{
            background: 'var(--bg-code)',
            border: '1px solid #334155',
            borderRadius: '10px',
            padding: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: '#f8fafc',
            minHeight: '190px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '6px', marginBottom: '10px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>bash terminal simulator</span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: isSourced ? '#065f46' : '#7f1d1d',
                  color: '#fff'
                }}>
                  {isSourced ? 'SOURCED' : 'UNSOURCED'}
                </span>
              </div>
              {terminalOutput.map((line, idx) => (
                <div key={idx} style={{
                  margin: '3px 0',
                  color: line.type === 'error' ? '#ef4444' :
                         line.type === 'warn' ? '#f59e0b' :
                         line.type === 'success' ? '#10b981' :
                         line.type === 'info' ? '#94a3b8' :
                         line.type === 'cmd' ? '#38bdf8' : '#f8fafc'
                }}>
                  {line.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                onClick={() => runTerminalCommand('ros2_uncheck')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: '#334155',
                  color: '#f8fafc',
                  border: 'none',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                1. Test Without Sourcing
              </button>
              <button
                onClick={() => runTerminalCommand('source')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                2. Execute source /opt/ros/...
              </button>
            </div>
          </div>

          {/* Sourcing Best Practices Card */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Permanent Shell Automation (~/.bashrc)
              </h4>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Instead of typing <code>source /opt/ros/jazzy/setup.bash</code> in every single new terminal tab, add it to your user's shell startup file:
              </p>
              <div style={{
                background: 'var(--bg-code)',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#38bdf8',
                marginBottom: '10px'
              }}>
                <span>echo "source /opt/ros/jazzy/setup.bash" &gt;&gt; ~/.bashrc</span>
                <button
                  onClick={() => handleCopy('echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc', 'bashrc')}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  title="Copy command"
                >
                  {copiedKey === 'bashrc' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              💡 <strong>Underlay vs. Overlay:</strong> Sourcing <code>/opt/ros/jazzy</code> is the Underlay. In Lesson 03, you will create and source your custom <code>~/ros2_ws</code> Overlay!
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: VERIFICATION & SMOKE TEST */}
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
