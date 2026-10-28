import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Copy, 
  Check, 
  Info, 
  Flame, 
  AlertTriangle, 
  Bug, 
  Radio
} from 'lucide-react';

const LOG_LEVELS = [
  {
    id: 'debug',
    name: 'DEBUG',
    num: 10,
    color: '#06b6d4', // Cyan
    bg: 'rgba(6, 182, 212, 0.08)',
    border: '#22d3ee',
    radius: 175,
    icon: Bug,
    desc: 'Fine-grained internal diagnostics (raw encoder counts, loop timings, math matrices).',
    purpose: 'Development & Bench Testing only. Never enabled in production fleets due to network/CPU flood.'
  },
  {
    id: 'info',
    name: 'INFO',
    num: 20,
    color: '#3b82f6', // Blue
    bg: 'rgba(59, 130, 246, 0.10)',
    border: '#60a5fa',
    radius: 140,
    icon: Info,
    desc: 'Standard operational milestones (node initialized, goal reached, state transitions).',
    purpose: 'ROS 2 Default Level. Recommended for day-to-day robot operations.'
  },
  {
    id: 'warn',
    name: 'WARN',
    num: 30,
    color: '#f59e0b', // Amber
    bg: 'rgba(245, 158, 11, 0.12)',
    border: '#fbbf24',
    radius: 105,
    icon: AlertTriangle,
    desc: 'Unexpected anomalies or degraded states that do not stop the robot from operating.',
    purpose: 'Recoverable conditions: Low battery alert (<20%), transient LiDAR packet drop, high CPU load.'
  },
  {
    id: 'error',
    name: 'ERROR',
    num: 40,
    color: '#f97316', // Orange
    bg: 'rgba(249, 115, 22, 0.15)',
    border: '#fb923c',
    radius: 70,
    icon: ShieldAlert,
    desc: 'Component failure or abort. The affected subsystem cannot continue its function.',
    purpose: 'Actionable failures: Sensor serial disconnected, path planner aborted, TF lookup failure.'
  },
  {
    id: 'fatal',
    name: 'FATAL',
    num: 50,
    color: '#ef4444', // Red
    bg: 'rgba(239, 68, 68, 0.22)',
    border: '#f87171',
    radius: 35,
    icon: Flame,
    desc: 'Critical catastrophic failure. The node or physical hardware must shut down immediately.',
    purpose: 'Safety hazards: Hardware E-Stop depressed, motor driver overcurrent, watch-dog bite.'
  }
];

const SAMPLE_LOGS = [
  {
    level: 'debug',
    levelNum: 10,
    badgeColor: '#06b6d4',
    tag: '[DEBUG]',
    source: '[nexus_amr_base]',
    msg: 'Encoder ticks L: 14209, R: 14212 | loop_dt: 19.8ms | wheel_slip: 0.01'
  },
  {
    level: 'info',
    levelNum: 20,
    badgeColor: '#3b82f6',
    tag: '[INFO] ',
    source: '[nexus_amr_base]',
    msg: 'State changed: IDLE -> NAVIGATING_TO_WAYPOINT (Goal: Waypoint_Station_2)'
  },
  {
    level: 'warn',
    levelNum: 30,
    badgeColor: '#f59e0b',
    tag: '[WARN] ',
    source: '[battery_monitor]',
    msg: 'Battery voltage at 19.8V (<20.0V threshold). Return-to-base timer initiated.'
  },
  {
    level: 'error',
    levelNum: 40,
    badgeColor: '#f97316',
    tag: '[ERROR]',
    source: '[lidar_driver]',
    msg: 'Packet header checksum failed on /dev/ttyUSB0! Skipping 1 scan frame.'
  },
  {
    level: 'fatal',
    levelNum: 50,
    badgeColor: '#ef4444',
    tag: '[FATAL]',
    source: '[safety_controller]',
    msg: 'HARDWARE E-STOP BUMPER TRIGGERED: EMERGENCY BRAKES ENGAGED! Node halting.'
  }
];

export function LogLevelsNestedCircle() {
  const [selectedLevelId, setSelectedLevelId] = useState('info'); // default is info
  const [copied, setCopied] = useState(false);
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const selectedLevel = LOG_LEVELS.find(l => l.id === selectedLevelId) || LOG_LEVELS[1];
  const activeLevelInfo = hoveredLevel ? LOG_LEVELS.find(l => l.id === hoveredLevel) : selectedLevel;

  // Count active vs suppressed logs
  const visibleCount = SAMPLE_LOGS.filter(l => l.levelNum >= selectedLevel.num).length;
  const suppressedCount = SAMPLE_LOGS.length - visibleCount;

  const cliCommand = `ros2 run nexus_amr_basics logger_levels --ros-args --log-level ${selectedLevelId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="log-circle-widget">
      {/* Header */}
      <div className="log-widget-header">
        <div className="header-badge-row">
          <div className="badge-pill-cyan">
            <Radio size={14} className="animate-pulse" />
            <span>Interactive Severity Hierarchy & Filtering</span>
          </div>
          <span className="ros-standard-badge">ROS 2 Logging Standard (rclpy)</span>
        </div>
        <h3 className="log-widget-title">The Nested Severity Hierarchy: What Level Logs What?</h3>
        <p className="log-widget-subtitle">
          ROS 2 loggers use a <strong>hierarchical threshold filter</strong>: when you set the logger to level <em>L</em>, all messages with severity <strong>&ge; L</strong> are emitted, while all messages below <em>L</em> are automatically suppressed without CPU overhead.
        </p>
      </div>

      {/* Threshold Selector Tabs */}
      <div className="level-selector-bar">
        <span className="selector-label">
          <Sliders size={14} /> Active Logger Threshold:
        </span>
        <div className="selector-buttons">
          {LOG_LEVELS.map((lvl) => {
            const isSelected = selectedLevelId === lvl.id;
            return (
              <button
                key={lvl.id}
                className={`level-choice-btn ${isSelected ? 'active' : ''}`}
                style={{
                  '--btn-accent': lvl.color,
                  borderColor: isSelected ? lvl.color : undefined,
                  boxShadow: isSelected ? `0 0 12px ${lvl.color}40` : undefined
                }}
                onClick={() => setSelectedLevelId(lvl.id)}
              >
                <span className="btn-dot" style={{ background: lvl.color }} />
                <span className="btn-name">{lvl.name}</span>
                {lvl.id === 'info' && <span className="default-pill">Default</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Main Body: Diagram & Simulator */}
      <div className="log-widget-body">
        {/* Left Side: Nested Concentric Circles Diagram */}
        <div className="nested-circle-stage">
          <div className="circle-stage-header">
            <span className="stage-title">Concentric Severity Inclusions</span>
            <span className="stage-hint">Hover or click any ring</span>
          </div>

          <div className="concentric-container">
            <svg viewBox="-200 -200 400 400" className="concentric-svg">
              <defs>
                {/* Diagonal striping pattern for suppressed layers */}
                <pattern id="suppressedHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                </pattern>
                {/* Glow filter */}
                <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render concentric circles from outside (DEBUG) to inside (FATAL) */}
              {LOG_LEVELS.map((lvl) => {
                const isIncluded = lvl.num >= selectedLevel.num;
                const isHovered = hoveredLevel === lvl.id;
                const isCurrentThreshold = selectedLevel.id === lvl.id;

                return (
                  <g 
                    key={lvl.id}
                    className={`circle-layer ${isIncluded ? 'layer-active' : 'layer-dimmed'}`}
                    onMouseEnter={() => setHoveredLevel(lvl.id)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    onClick={() => setSelectedLevelId(lvl.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Main circle disc */}
                    <circle
                      cx="0"
                      cy="0"
                      r={lvl.radius}
                      fill={isIncluded ? lvl.bg : 'rgba(15, 23, 42, 0.4)'}
                      stroke={lvl.color}
                      strokeWidth={isCurrentThreshold ? 3 : isHovered ? 2.5 : 1.5}
                      strokeDasharray={isIncluded ? 'none' : '4 4'}
                      opacity={isIncluded ? 1 : 0.25}
                      filter={isCurrentThreshold ? 'url(#activeGlow)' : undefined}
                      className="transition-all duration-300"
                    />

                    {/* Suppressed crosshatch overlay */}
                    {!isIncluded && (
                      <circle
                        cx="0"
                        cy="0"
                        r={lvl.radius}
                        fill="url(#suppressedHatch)"
                        opacity="0.8"
                      />
                    )}

                    {/* Layer Name Label near top perimeter */}
                    <text
                      x="0"
                      y={-lvl.radius + 16}
                      textAnchor="middle"
                      fill={isIncluded ? lvl.color : '#64748b'}
                      fontSize={lvl.id === 'fatal' ? 11 : 12}
                      fontWeight="700"
                      fontFamily="var(--font-mono, monospace)"
                      letterSpacing="0.5px"
                      opacity={isIncluded ? 1 : 0.4}
                    >
                      {lvl.name}
                    </text>
                  </g>
                );
              })}

              {/* Center Icon for FATAL core */}
              <circle cx="0" cy="0" r="14" fill="#ef4444" opacity={selectedLevel.num <= 50 ? 0.9 : 0.3} />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">⚡</text>
            </svg>

            {/* Quick Status Legend inside diagram */}
            <div className="diagram-status-legend">
              <div className="legend-tag active-legend">
                <CheckCircle2 size={12} className="text-green" />
                <span>Active: <strong>{visibleCount} Levels</strong></span>
              </div>
              {suppressedCount > 0 && (
                <div className="legend-tag suppressed-legend">
                  <XCircle size={12} className="text-red" />
                  <span>Suppressed: <strong>{suppressedCount} Levels</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Active Level Inspector Card */}
          <div className="active-level-inspector" style={{ borderColor: activeLevelInfo.color }}>
            <div className="inspector-head">
              <span className="inspector-badge" style={{ background: activeLevelInfo.color }}>
                {activeLevelInfo.name} (Severity {activeLevelInfo.num})
              </span>
              <span className="inspector-status">
                {activeLevelInfo.num >= selectedLevel.num ? (
                  <span className="text-green flex items-center gap-1">
                    <CheckCircle2 size={12} /> Logged & Visible
                  </span>
                ) : (
                  <span className="text-muted flex items-center gap-1">
                    <XCircle size={12} /> Filtered Out (Silent)
                  </span>
                )}
              </span>
            </div>
            <p className="inspector-desc">{activeLevelInfo.desc}</p>
            <div className="inspector-meta">
              <span className="meta-label">Guideline:</span> {activeLevelInfo.purpose}
            </div>
          </div>
        </div>

        {/* Right Side: Live Robot Terminal Simulator */}
        <div className="terminal-simulator-stage">
          <div className="simulator-header">
            <div className="simulator-title-group">
              <Terminal size={15} className="text-cyan" />
              <span className="simulator-title">Live Terminal Output Stream</span>
            </div>
            <span className="filter-mode-tag">
              Threshold: <strong style={{ color: selectedLevel.color }}>{selectedLevel.name}</strong>
            </span>
          </div>

          <div className="terminal-log-window">
            <div className="terminal-titlebar">
              <div className="term-dots">
                <span className="dot dot-r" />
                <span className="dot dot-y" />
                <span className="dot dot-g" />
              </div>
              <span className="term-filename">student@amr-cart: ~/ros2_ws (stdout)</span>
            </div>

            <div className="terminal-logs-list">
              {SAMPLE_LOGS.map((log) => {
                const isPassed = log.levelNum >= selectedLevel.num;
                return (
                  <div
                    key={log.level}
                    className={`terminal-log-line ${isPassed ? 'log-visible' : 'log-filtered'}`}
                  >
                    <div className="log-line-meta">
                      <span 
                        className="log-level-badge" 
                        style={{ 
                          color: isPassed ? log.badgeColor : '#475569',
                          borderColor: isPassed ? `${log.badgeColor}60` : '#334155'
                        }}
                      >
                        {log.tag}
                      </span>
                      <span className="log-source">{log.source}</span>
                    </div>

                    <div className="log-body">
                      <span className="log-message">{log.msg}</span>
                    </div>

                    <div className="log-filter-state">
                      {isPassed ? (
                        <span className="state-badge-passed" title="Emitted to console & /rosout">
                          <Check size={11} /> Printed
                        </span>
                      ) : (
                        <span className="state-badge-filtered" title="Suppressed by logger severity threshold">
                          <XCircle size={11} /> Filtered
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CLI Invocation Card */}
          <div className="cli-run-card">
            <div className="cli-card-label">Run Node with this Log Level:</div>
            <div className="cli-code-row">
              <code className="cli-code-text">{cliCommand}</code>
              <button 
                className="cli-copy-btn"
                onClick={handleCopy}
                title="Copy launch command to clipboard"
              >
                {copied ? <Check size={13} className="text-green" /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick Summary Tip */}
          <div className="log-takeaway-box">
            <div className="takeaway-icon">
              <Info size={16} className="text-cyan" />
            </div>
            <div className="takeaway-text">
              <strong>Key Rule:</strong> Setting <code className="inline-code">--log-level {selectedLevel.id}</code> emits all messages with severity <strong>&ge; {selectedLevel.num}</strong>. To silence spammy debug logs in production, keep the default at <code className="inline-code">info</code> or raise it to <code className="inline-code">warn</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
