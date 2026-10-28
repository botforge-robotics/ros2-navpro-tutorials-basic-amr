import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Folder,
  FileCode,
  Layers,
  Cpu,
  FileText,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Terminal,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

export function WorkspaceStructureFlow() {
  const [selectedDir, setSelectedDir] = useState('src');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0); // 0: Idle, 1: Reading src, 2: Compiling build, 3: Deploying install, 4: Logging, 5: Done
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Simulation timer
  useEffect(() => {
    let timer = null;
    if (isSimulating) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 4) {
            setIsSimulating(false);
            return 4; // Complete state
          }
          const next = prev + 1;
          // Auto-select corresponding directory during simulation
          if (next === 1) setSelectedDir('src');
          if (next === 2) setSelectedDir('build');
          if (next === 3) setSelectedDir('install');
          if (next === 4) setSelectedDir('log');
          return next;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const handleStartSim = () => {
    setSimStep(1);
    setSelectedDir('src');
    setIsSimulating(true);
  };

  const handleResetSim = () => {
    setIsSimulating(false);
    setSimStep(0);
    setSelectedDir('src');
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const directories = [
    {
      id: 'src',
      name: 'src/',
      title: 'Source Code Directory',
      badge: 'Developer Workspace',
      badgeColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      borderAccent: '#10b981',
      icon: FileCode,
      summary: 'The ONLY directory where you create packages, clone repositories, and write code.',
      permission: 'Full Read / Write / Edit (Developer Owned)',
      safety: 'Safe to modify, commit to git, and structure.',
      command: 'ros2 pkg create --build-type ament_python my_robot_pkg',
      commandDesc: 'Generate a new package inside src/',
      details: [
        'Place all custom packages, Python scripts, launch files, and URDF models here.',
        'Never write code directly in the root ~/ros2_ws; colcon only searches inside src/.',
        'Can contain multiple subdirectories or git submodules; colcon recursively discovers all packages with a package.xml.'
      ],
      treeItems: [
        { name: 'nexus_amr_controller/', type: 'package', note: 'Python AMR Package' },
        { name: 'nexus_amr_navigation/', type: 'package', note: 'Nav2 Config Package' },
        { name: 'nexus_amr_description/', type: 'package', note: 'URDF & Mesh Assets' }
      ]
    },
    {
      id: 'build',
      name: 'build/',
      title: 'Build Cache & Object Files',
      badge: 'Auto-Generated Cache',
      badgeColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      borderAccent: '#f59e0b',
      icon: Cpu,
      summary: 'Contains intermediate compilation artifacts, setuptools cache, and CMake build objects.',
      permission: 'Managed by colcon (Read-Only for Humans)',
      safety: 'NEVER edit manually. Safe to delete completely (rm -rf build/) for a clean build.',
      command: 'colcon build --symlink-install',
      commandDesc: 'Compile and populate build cache',
      details: [
        'Created automatically on the first invocation of colcon build.',
        'Each package receives an isolated subfolder inside build/ to avoid cross-compilation contamination.',
        'If build errors persist after renaming files or classes, delete build/ and rebuild from scratch.'
      ],
      treeItems: [
        { name: 'nexus_amr_controller/', type: 'folder', note: 'Setuptools build cache' },
        { name: '  build.ninja', type: 'file', note: 'Compilation graph' },
        { name: '  COLCON_IGNORE', type: 'file', note: 'Colcon discovery barrier' }
      ]
    },
    {
      id: 'install',
      name: 'install/',
      title: 'Runtime Overlay & Executables',
      badge: 'Execution Engine',
      badgeColor: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.12)',
      borderAccent: '#38bdf8',
      icon: Layers,
      summary: 'The deployed runtime environment where binaries, launch files, and setup.bash reside.',
      permission: 'Runtime Sourcing Zone',
      safety: 'ROS 2 executes exclusively from here. Must be sourced to use your custom packages.',
      command: 'source ~/ros2_ws/install/setup.bash',
      commandDesc: 'Source overlay into terminal session',
      details: [
        'Contains the critical setup.bash script that extends your AMENT_PREFIX_PATH and PYTHONPATH.',
        'When you invoke ros2 run <pkg> <executable>, ROS 2 loads the binary located in install/lib/<pkg>/!',
        'With --symlink-install, Python files in install/ link directly to src/, enabling instant code updates without rebuilding.'
      ],
      treeItems: [
        { name: 'setup.bash', type: 'script', note: 'Primary overlay sourcing hook' },
        { name: 'local_setup.bash', type: 'script', note: 'Workspace-only overlay hook' },
        { name: 'nexus_amr_controller/lib/', type: 'binary', note: 'Executable console scripts' },
        { name: 'nexus_amr_controller/share/', type: 'asset', note: 'Installed launch & config files' }
      ]
    },
    {
      id: 'log',
      name: 'log/',
      title: 'Execution Telemetry & Build Logs',
      badge: 'Diagnostic Telemetry',
      badgeColor: '#a855f7',
      badgeBg: 'rgba(168, 85, 247, 0.12)',
      borderAccent: '#a855f7',
      icon: FileText,
      summary: 'Historical and timestamped records of every build operation and stdout/stderr stream.',
      permission: 'Diagnostics Archive',
      safety: 'Safe to inspect or delete. Essential for troubleshooting compiler crashes and broken dependencies.',
      command: 'cat ~/ros2_ws/log/latest_build/logger_all.log',
      commandDesc: 'Inspect stdout/stderr from most recent build',
      details: [
        'Stores separated stdout and stderr streams for every package built in the workspace.',
        'Creates a symlink latest_build/ that always points to the most recent colcon build timestamp.',
        'Whenever colcon warns "Stderr output present" or fails, look here first for line-numbered traceback errors.'
      ],
      treeItems: [
        { name: 'latest_build/', type: 'symlink', note: 'Points to most recent run' },
        { name: 'build_2026-10-14_21-00-00/', type: 'folder', note: 'Timestamped build run' },
        { name: '  events.log', type: 'file', note: 'Build timeline events' },
        { name: '  logger_all.log', type: 'file', note: 'Full stdout & stderr stream' }
      ]
    }
  ];

  const currentDir = directories.find((d) => d.id === selectedDir) || directories[0];

  const simStepsDesc = [
    { num: 1, title: 'Idle Workspace', desc: 'Ready to build. Packages structured inside ~/ros2_ws/src/.' },
    { num: 2, title: '1. Reading src/', desc: 'colcon scans src/ recursively and parses all package.xml dependencies.' },
    { num: 3, title: '2. Compiling build/', desc: 'Generates build/ cache, runs setuptools/CMake, and compiles bytecode.' },
    { num: 4, title: '3. Populating install/', desc: 'Installs executables, links Python scripts, and generates setup.bash.' },
    { num: 5, title: '4. Logging Telemetry', desc: 'Writes stdout/stderr streams to log/latest_build/ and finishes with 0 errors.' }
  ];

  return (
    <div className="workspace-structure-infographic" style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '1.75rem',
      margin: '2rem 0',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header with Title and Simulation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '1.5rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(16, 185, 129, 0.15) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8'
          }}>
            <FolderTree size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Interactive ROS 2 Workspace Architecture
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              The 4 Core Pillars of <code style={{ color: '#38bdf8', fontWeight: 700 }}>~/ros2_ws</code> &amp; the colcon Build Lifecycle
            </span>
          </div>
        </div>

        {/* Simulation Interactive Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isSimulating ? (
            <button
              onClick={handleStartSim}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.35)',
                transition: 'all 0.2s'
              }}
            >
              <Play size={14} fill="currentColor" />
              <span>Simulate colcon build</span>
            </button>
          ) : (
            <button
              onClick={() => setIsSimulating(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Pause size={14} />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleResetSim}
            title="Reset Simulation"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 34,
              height: 34,
              background: 'var(--bg-primary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* colcon build Pipeline Progress Ribbon (Shows during active simulation or completion) */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '0.75rem 1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color={isSimulating ? '#38bdf8' : '#10b981'} />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Pipeline Status:
          </span>
          <span style={{
            fontSize: '0.82rem',
            color: simStep === 4 ? '#10b981' : simStep > 0 ? '#38bdf8' : 'var(--text-muted)',
            fontWeight: simStep > 0 ? 700 : 500
          }}>
            {simStepsDesc[simStep].title} &mdash; {simStepsDesc[simStep].desc}
          </span>
        </div>

        {/* Step Indicator Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { id: 1, label: 'src/' },
            { id: 2, label: 'build/' },
            { id: 3, label: 'install/' },
            { id: 4, label: 'log/' }
          ].map((s) => {
            const isPassed = simStep >= s.id;
            const isCurrent = simStep === s.id;
            return (
              <span
                key={s.id}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: isCurrent ? '#0284c7' : isPassed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: isCurrent ? '#ffffff' : isPassed ? '#10b981' : 'var(--text-muted)',
                  border: isCurrent ? '1px solid #38bdf8' : isPassed ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                  transition: 'all 0.3s'
                }}
              >
                {s.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* 4 Directory Cards (Horizontal Architecture Grid) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {directories.map((dir, idx) => {
          const isSelected = selectedDir === dir.id;
          const Icon = dir.icon;
          const isPulseStep = (simStep === 1 && dir.id === 'src') ||
                              (simStep === 2 && dir.id === 'build') ||
                              (simStep === 3 && dir.id === 'install') ||
                              (simStep === 4 && dir.id === 'log');

          return (
            <div
              key={dir.id}
              onClick={() => setSelectedDir(dir.id)}
              style={{
                background: isSelected ? 'var(--bg-primary)' : 'rgba(15, 23, 42, 0.4)',
                border: isSelected
                  ? `2px solid ${dir.borderAccent}`
                  : isPulseStep
                  ? `2px dashed ${dir.borderAccent}`
                  : '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem 1rem',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isSelected ? `0 4px 20px -2px ${dir.badgeBg}` : 'none',
                transform: isSelected ? 'translateY(-2px)' : 'none'
              }}
            >
              {/* Top Row: Icon + Name + Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    background: dir.badgeBg,
                    color: dir.borderAccent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={18} />
                  </div>
                  <strong style={{ fontSize: '1.05rem', color: dir.borderAccent, fontFamily: 'monospace' }}>
                    {dir.name}
                  </strong>
                </div>

                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '6px',
                  background: dir.badgeBg,
                  color: dir.badgeColor,
                  border: `1px solid ${dir.borderAccent}40`
                }}>
                  {dir.badge}
                </span>
              </div>

              {/* Title & One-line Summary */}
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {dir.title}
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {dir.summary}
              </p>

              {/* Active Indicator Bar */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: isSelected ? dir.borderAccent : 'transparent',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                transition: 'all 0.2s'
              }} />
            </div>
          );
        })}
      </div>

      {/* Selected Directory Detailed Deep-Dive Inspector */}
      <div style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Rules & Engineering Significance */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: currentDir.borderAccent
            }}>
              Directory Inspector
            </span>
            <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
              ~/ros2_ws/{currentDir.name}
            </span>
          </div>

          <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            {currentDir.title}
          </h4>

          {/* Safety & Developer Permission Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: currentDir.id === 'src' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
            border: `1px solid ${currentDir.borderAccent}35`,
            borderRadius: '8px',
            padding: '8px 12px',
            marginBottom: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-primary)'
          }}>
            {currentDir.id === 'src' ? (
              <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0 }} />
            ) : (
              <ShieldAlert size={18} color={currentDir.borderAccent} style={{ flexShrink: 0 }} />
            )}
            <div>
              <strong>Rule:</strong> {currentDir.safety}
            </div>
          </div>

          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {currentDir.details.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Right Column: Typical Structure & Key CLI Command */}
        <div>
          {/* File Tree Preview */}
          <div style={{
            background: '#090d16',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.8rem'
          }}>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
              Typical Contents in ~/ros2_ws/{currentDir.name}
            </div>
            {currentDir.treeItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '3px 0' }}>
                <span style={{ color: item.type === 'package' ? '#10b981' : item.type === 'script' ? '#38bdf8' : '#e2e8f0' }}>
                  {item.name}
                </span>
                <span style={{ color: '#64748b', fontSize: '0.72rem' }}>
                  {item.note}
                </span>
              </div>
            ))}
          </div>

          {/* Key Terminal Action */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '0.85rem 1rem'
          }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <strong>Key Command:</strong> {currentDir.commandDesc}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#090d16',
              padding: '6px 10px',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              color: '#38bdf8'
            }}>
              <span>{currentDir.command}</span>
              <button
                onClick={() => handleCopy(currentDir.command, currentDir.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copiedCmd === currentDir.id ? '#10b981' : '#94a3b8',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.72rem'
                }}
              >
                {copiedCmd === currentDir.id ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedCmd === currentDir.id ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
