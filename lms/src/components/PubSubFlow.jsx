import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  Radio, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  Cpu, 
  Terminal,
  Activity,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Check
} from 'lucide-react';

export function PubSubFlow() {
  // Animation & simulation state
  const [isPlaying, setIsPlaying] = useState(true);
  const [publishRate, setPublishRate] = useState(2); // Hz
  const [msgCount, setMsgCount] = useState(1);
  const [recvCount, setRecvCount] = useState(1);
  
  // Simulated sensor values
  const [lastReceivedVal, setLastReceivedVal] = useState(1.82); // in meters
  const [manualDistance, setManualDistance] = useState(null); // null = auto sine wave, number = manual override
  
  // Pulse effects
  const [isPublisherPulsing, setIsPublisherPulsing] = useState(false);
  const [isSubscriberPulsing, setIsSubscriberPulsing] = useState(false);
  const [isLogFlashing, setIsLogFlashing] = useState(false);
  
  // Guided reveal navigation
  const [activeStep, setActiveStep] = useState(null); // null = free run, 1..4 = guided steps
  const [selectedElement, setSelectedElement] = useState(null); // 'pub' | 'topic' | 'dds' | 'sub'
  const [qosProfile, setQosProfile] = useState('default'); // 'default' | 'sensor_data'

  // Packets in flight across the DDS topic bus
  const [packets, setPackets] = useState([
    { id: 1, val: 1.81, text: '1.81 m', isHazard: false, speedSec: 1.3 }
  ]);
  const packetIdRef = useRef(2);
  const deliveredIdsRef = useRef(new Set([1]));
  const timeoutsRef = useRef([]);

  // Physical simulation time tracking (in real wall-clock seconds)
  // Guarantees that the physical obstacle distance oscillates at a constant real-world speed (10.0s period)
  // regardless of whether publishing rate is 0.5 Hz, 1 Hz, 2 Hz, or 4 Hz!
  const simTimeRef = useRef(0.5);
  const lastTimestampRef = useRef(null);

  // Safety threshold defined in Lesson 05
  const SAFETY_THRESHOLD = 0.50; // meters

  // Generate simulated ultrasonic distance (oscillates between 0.30m and 2.60m)
  // Constant physical oscillation period: 10.0 seconds in real time (omega = 2*PI / 10.0 rad/s)
  const getSimulatedDistance = useCallback((timeSec) => {
    if (manualDistance !== null) {
      return manualDistance;
    }
    const omega = (2 * Math.PI) / 10.0;
    const d = 1.45 + 1.15 * Math.sin(omega * timeSec);
    return Math.max(0.20, parseFloat(d.toFixed(2)));
  }, [manualDistance]);

  // Handle packet reaching the subscriber node callback
  const handlePacketDelivered = useCallback((pkt) => {
    if (deliveredIdsRef.current.has(pkt.id)) {
      return; // prevent duplicate callback triggers
    }
    deliveredIdsRef.current.add(pkt.id);

    // Update subscriber node state
    setLastReceivedVal(pkt.val);
    setRecvCount(c => c + 1);
    
    // Trigger pulse and log flash
    setIsSubscriberPulsing(true);
    setIsLogFlashing(true);
    setTimeout(() => setIsSubscriberPulsing(false), 280);
    setTimeout(() => setIsLogFlashing(false), 380);

    // Remove delivered packet from DOM
    setPackets(prev => prev.filter(p => p.id !== pkt.id));
  }, []);

  // Dispatch a single packet across the topic bus
  const dispatchPacket = useCallback((customVal = null) => {
    const id = packetIdRef.current++;

    // Advance physical simulation time based on real wall-clock elapsed time
    const now = performance.now();
    if (lastTimestampRef.current !== null && isPlaying) {
      const dt = Math.max(0, Math.min((now - lastTimestampRef.current) / 1000, 3.0));
      simTimeRef.current += dt;
      lastTimestampRef.current = now;
    } else {
      // Manual step while paused or initial dispatch: advance by one sampling period (1 / publishRate)
      simTimeRef.current += (1.0 / publishRate);
      if (isPlaying) {
        lastTimestampRef.current = now;
      }
    }

    const val = customVal !== null ? customVal : getSimulatedDistance(simTimeRef.current);
    const isHazard = val < SAFETY_THRESHOLD;
    const text = `${val.toFixed(2)} m`;
    const speedSec = 1.3;

    // Flash publisher node
    setMsgCount(id);
    setIsPublisherPulsing(true);
    setTimeout(() => setIsPublisherPulsing(false), 180);

    const newPkt = { id, val, text, isHazard, speedSec };

    setPackets(prev => [...prev, newPkt]);

    // Guaranteed delivery timer in case animation event is dropped
    const timer = setTimeout(() => {
      handlePacketDelivered(newPkt);
    }, speedSec * 1000);
    timeoutsRef.current.push(timer);
  }, [isPlaying, publishRate, getSimulatedDistance, handlePacketDelivered]);

  // Manual trigger button
  const triggerSingleMessage = () => {
    dispatchPacket();
  };

  // Quick hazard injection (< 0.50m)
  const injectHazard = () => {
    setManualDistance(0.35);
    dispatchPacket(0.35);
  };

  // Quick safe path injection (2.10m)
  const injectSafe = () => {
    setManualDistance(2.10);
    dispatchPacket(2.10);
  };

  // Reset simulation
  const handleReset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    deliveredIdsRef.current = new Set([1]);
    packetIdRef.current = 2;
    simTimeRef.current = 0.5;
    lastTimestampRef.current = null;
    setMsgCount(1);
    setRecvCount(1);
    setLastReceivedVal(1.81);
    setManualDistance(null);
    setPackets([{ id: 1, val: 1.81, text: '1.81 m', isHazard: false, speedSec: 1.3 }]);
    setIsPlaying(false);
    setActiveStep(null);
    setSelectedElement(null);
  };

  // Sync simulation clock reference when play/pause toggles
  useEffect(() => {
    if (isPlaying) {
      lastTimestampRef.current = performance.now();
    } else {
      lastTimestampRef.current = null;
    }
  }, [isPlaying]);

  // Periodic publisher timer (runs at publishRate Hz)
  useEffect(() => {
    if (!isPlaying || activeStep !== null) return;

    lastTimestampRef.current = performance.now();
    const intervalMs = Math.max(100, Math.round(1000 / publishRate));
    const timer = setInterval(() => {
      dispatchPacket();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, publishRate, activeStep, dispatchPacket]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Compute subscriber reaction state
  const isEmergencyStop = lastReceivedVal < SAFETY_THRESHOLD;
  const clearancePct = Math.min(100, Math.max(5, (lastReceivedVal / 3.0) * 100));

  // Guided Steps Content
  const guidedSteps = [
    {
      num: 1,
      title: "1. Ultrasonic Sensor Publisher Node",
      desc: "Node inherits from rclpy.node.Node and calls self.create_publisher(Float32, '/sensor/ultrasonic_front', 10). A non-blocking wall timer periodically reads hardware and broadcasts distance telemetry.",
      target: 'pub'
    },
    {
      num: 2,
      title: "2. The Sensor Topic Bus & DDS Layer",
      desc: "Topic '/sensor/ultrasonic_front' acts as an anonymous, strongly-typed range bus. Underneath, DDS middleware handles peer discovery and transport contracts without hardcoding IP addresses.",
      target: 'topic'
    },
    {
      num: 3,
      title: "3. Collision Safety Supervisor & Callback",
      desc: "Node creates a subscription with self.create_subscription(Float32, '/sensor/ultrasonic_front', callback, 10). The executor immediately runs the callback to evaluate obstacle distance against the 0.50m threshold.",
      target: 'sub'
    },
    {
      num: 4,
      title: "4. Live Telemetry & Active Collision Avoidance",
      desc: "Distance telemetry streams continuously across nodes. If an obstacle breaches the 0.50m buffer, the safety monitor immediately detects the hazard and triggers simulated emergency braking.",
      target: 'all'
    }
  ];

  return (
    <div className="pubsub-flow-container">
      {/* Header & Mode Switcher */}
      <div className="pubsub-flow-header">
        <div className="header-title-row">
          <div className="badge-pill">
            <Radio size={14} className="text-cyan animate-pulse" />
            <span>Interactive Architecture & Data Flow</span>
          </div>
          <span className="ros-version-tag">ROS 2 Jazzy · DDS Architecture</span>
        </div>
        <p className="pubsub-flow-subtitle">
          Observe how the Ultrasonic Rangefinder and Collision Safety Supervisor exchange real-time distance telemetry across the <code className="inline-code">/sensor/ultrasonic_front</code> topic.
        </p>
      </div>

      {/* Guided Walkthrough Steps Navigation */}
      <div className="walkthrough-bar">
        <span className="walkthrough-label">
          <Layers size={14} /> Guided Reveal:
        </span>
        <div className="walkthrough-buttons">
          <button 
            className={`walkthrough-step-btn ${activeStep === null ? 'active' : ''}`}
            onClick={() => { setActiveStep(null); setSelectedElement(null); setIsPlaying(true); }}
          >
            All Live
          </button>
          {guidedSteps.map((s) => (
            <button
              key={s.num}
              className={`walkthrough-step-btn ${activeStep === s.num ? 'active' : ''}`}
              onClick={() => {
                setActiveStep(s.num);
                setSelectedElement(s.target === 'all' ? null : s.target);
                setIsPlaying(s.num === 4);
              }}
            >
              Step {s.num}
            </button>
          ))}
        </div>
      </div>

      {/* Active Guided Step Banner */}
      {activeStep !== null && (
        <div className="active-step-banner animate-fade-in">
          <div className="banner-badge">Step {activeStep} of 4</div>
          <div className="banner-content">
            <h4>{guidedSteps[activeStep - 1].title}</h4>
            <p>{guidedSteps[activeStep - 1].desc}</p>
          </div>
        </div>
      )}

      {/* Main Diagram Canvas */}
      <div className="diagram-stage">
        {/* PUBLISHER NODE CARD */}
        <div 
          className={`diagram-card publisher-card ${
            isPublisherPulsing ? 'pulse-border' : ''
          } ${selectedElement === 'pub' || activeStep === 1 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'}`}
          onClick={() => setSelectedElement('pub')}
        >
          <div className="card-top">
            <div className="node-icon-wrapper pub-icon">
              <Cpu size={18} />
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">PUBLISHER NODE</div>
              <h3 className="node-name" title="ultrasonic_sensor_node">ultrasonic_sensor_node</h3>
              <div className="node-class">UltrasonicSensorPublisher</div>
            </div>
            <div className={`status-dot ${isPlaying ? 'online' : 'paused'}`} title={isPlaying ? "Publishing Active" : "Paused"} />
          </div>

          <div className="card-code-snip">
            <span className="code-fn">create_publisher</span>
            <span className="code-args">(Float32, '/sensor/ultrasonic_front', 10)</span>
          </div>

          <div className="card-telemetry pub-telemetry">
            <div className="telemetry-item">
              <span className="telemetry-label">Rate</span>
              <span className="telemetry-val text-cyan">{publishRate} Hz</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Sent</span>
              <span className="telemetry-val text-amber">#{msgCount}</span>
            </div>
            <div className="telemetry-item cb-telemetry-item">
              <span className="telemetry-label">Callback</span>
              <span className="telemetry-val text-green cb-name" title="timer_callback">timer_cb</span>
            </div>
          </div>

          <button 
            className="card-action-btn"
            onClick={(e) => { e.stopPropagation(); triggerSingleMessage(); }}
            title="Publish one distance measurement immediately"
          >
            <Send size={13} />
            <span>Publish 1 Measurement</span>
          </button>
        </div>

        {/* CENTER TOPIC BUS & DDS PIPELINE */}
        <div 
          className={`diagram-pipeline ${
            selectedElement === 'topic' || selectedElement === 'dds' || activeStep === 2 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'
          }`}
          onClick={() => setSelectedElement('topic')}
        >
          {/* Top Topic Metadata */}
          <div className="topic-badge">
            <Radio size={14} className="text-cyan animate-pulse" />
            <span className="topic-name">Topic: <strong>/sensor/ultrasonic_front</strong></span>
            <span className="topic-type">Float32</span>
          </div>

          {/* SVG Connector & Traveling Packets */}
          <div className="pipe-svg-wrapper">
            <svg viewBox="0 0 360 48" className="pipe-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Path Track */}
              <line 
                x1="10" y1="24" x2="350" y2="24" 
                stroke="#1e293b" 
                strokeWidth="6" 
                strokeLinecap="round" 
              />

              {/* Flowing Animated Path */}
              <line 
                x1="10" y1="24" x2="350" y2="24" 
                stroke="url(#pipeGrad)" 
                strokeWidth="3.5" 
                strokeDasharray="8 8" 
                strokeLinecap="round"
                className={`pipeline-dash ${isPlaying ? 'flowing' : ''}`}
              />

              {/* Arrow Head at Destination */}
              <polygon points="346,18 358,24 346,30" fill="#22c55e" />
            </svg>

            {/* Traveling Message Packets (Hardware Accelerated CSS Animations) */}
            <div className={`packet-track ${!isPlaying ? 'paused' : ''}`}>
              {packets.map((pkt) => (
                <div 
                  key={pkt.id} 
                  className={`sliding-packet ${!isPlaying ? 'paused' : ''}`}
                  style={{ animationDuration: `${pkt.speedSec || 1.3}s` }}
                  onAnimationEnd={() => handlePacketDelivered(pkt)}
                >
                  <span className={`packet-pill ${pkt.isHazard ? 'hazard-packet' : ''}`}>
                    <Zap size={11} className="packet-spark" />
                    <span>{pkt.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DDS Middleware Layer Info Bar */}
          <div 
            className="dds-layer-box"
            onClick={(e) => { e.stopPropagation(); setSelectedElement('dds'); }}
          >
            <div className="dds-title-row">
              <span className="dds-title">DDS Layer</span>
              <span className="qos-badge">
                <ShieldCheck size={12} /> QoS: {qosProfile === 'default' ? 'RELIABLE' : 'BEST_EFFORT'}
              </span>
            </div>
            <div className="dds-metrics">
              <span>Depth: 10</span>
              <span>·</span>
              <span>RTPS Multicast</span>
              <span>·</span>
              <span>CycloneDDS</span>
            </div>
          </div>
        </div>

        {/* SUBSCRIBER NODE CARD (COLLISION SAFETY SUPERVISOR) */}
        <div 
          className={`diagram-card subscriber-card ${
            isEmergencyStop ? 'hazard-active-card' : ''
          } ${
            isSubscriberPulsing 
              ? (isEmergencyStop ? 'pulse-border-hazard' : 'pulse-border-green') 
              : ''
          } ${selectedElement === 'sub' || activeStep === 3 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'}`}
          onClick={() => setSelectedElement('sub')}
        >
          <div className="card-top">
            <div className={`node-icon-wrapper ${isEmergencyStop ? 'hazard-icon' : 'sub-icon'}`}>
              {isEmergencyStop ? <AlertTriangle size={18} className="text-red animate-bounce" /> : <Terminal size={18} />}
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">SUBSCRIBER NODE</div>
              <h3 className="node-name" title="collision_monitor_node">collision_monitor_node</h3>
              <div className="node-class">CollisionSafetySubscriber</div>
            </div>
            <div 
              className={`status-dot ${isEmergencyStop ? 'alert' : (isPlaying ? 'online' : 'paused')}`} 
              title={isEmergencyStop ? "EMERGENCY BRAKE ACTIVE" : "Monitoring Active"} 
            />
          </div>

          <div className="card-code-snip sub-snip">
            <span className="code-fn">create_subscription</span>
            <span className="code-args">(Float32, '/sensor/ultrasonic_front', cb, 10)</span>
          </div>

          {/* 3-Column Telemetry Row (Live Dynamic Reaction) */}
          <div className="card-telemetry sub-telemetry">
            <div className="telemetry-item">
              <span className="telemetry-label">Recv</span>
              <span className="telemetry-val text-amber">#{recvCount}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Range</span>
              <span className={`telemetry-val ${isEmergencyStop ? 'text-red font-bold' : 'text-cyan'}`}>
                {lastReceivedVal.toFixed(2)} m
              </span>
            </div>
            <div className="telemetry-item cb-telemetry-item">
              <span className="telemetry-label">Action</span>
              <span className={`telemetry-val cb-name ${isEmergencyStop ? 'text-red font-bold animate-pulse' : 'text-green'}`}>
                {isEmergencyStop ? '🛑 BRAKE' : '🟢 CLEAR'}
              </span>
            </div>
          </div>

          {/* Safety Proximity Distance Gauge */}
          <div className="proximity-gauge-wrap">
            <div className="gauge-labels">
              <span>Proximity: <strong>{lastReceivedVal.toFixed(2)}m</strong></span>
              <span className="threshold-tag">Threshold: {SAFETY_THRESHOLD.toFixed(2)}m</span>
            </div>
            <div className="gauge-track">
              {/* Threshold mark at 0.50m */}
              <div className="gauge-threshold-line" title="0.50m Safety Threshold" />
              {/* Clearance fill bar */}
              <div 
                className={`gauge-fill ${isEmergencyStop ? 'hazard' : 'safe'}`}
                style={{ width: `${clearancePct}%` }}
              />
            </div>
          </div>

          {/* Real-time ROS 2 Executor Callback Terminal Log */}
          <div className="card-terminal-log">
            <div className="log-header">
              <Activity size={12} className={isEmergencyStop ? "text-red animate-pulse" : "text-green"} />
              <span>Safety Supervisory Telemetry</span>
            </div>
            <div className={`log-content-wrap ${isEmergencyStop ? 'hazard-alert' : ''} ${isLogFlashing ? 'pulse-log' : ''}`}>
              <span className={`log-level-pill ${isEmergencyStop ? 'log-level-error' : ''}`}>
                {isEmergencyStop ? '[WARN]' : '[INFO]'}
              </span>
              <span className={`log-text ${isEmergencyStop ? 'hazard-text' : ''}`}>
                {isEmergencyStop 
                  ? `[distance_callback] Obstacle at ${lastReceivedVal.toFixed(2)}m < 0.50m! Commanded EMERGENCY STOP (/cmd_vel -> 0.0)`
                  : `[distance_callback] Clearance: ${lastReceivedVal.toFixed(2)}m (> 0.50m threshold). Path clear, cruising.`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="pubsub-controls-bar">
        <div className="controls-left">
          <button 
            className={`control-btn play-btn ${isPlaying ? 'active-playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause stream" : "Start stream"}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? 'Pause Stream' : 'Play Stream'}</span>
          </button>

          <button 
            className="control-btn"
            onClick={triggerSingleMessage}
            title="Step one message"
          >
            <Send size={15} />
            <span>Step (1 Msg)</span>
          </button>

          <button 
            className="control-btn"
            onClick={handleReset}
            title="Reset simulation counter"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

          {/* Quick Sensor Scenario Testing Buttons */}
          <button 
            className="sensor-quick-btn hazard"
            onClick={injectHazard}
            title="Inject an obstacle below the 0.50m safety threshold to trigger emergency stop"
          >
            <AlertTriangle size={13} />
            <span>Simulate Obstacle (0.35m)</span>
          </button>

          <button 
            className="sensor-quick-btn safe"
            onClick={injectSafe}
            title="Simulate a clear pathway at 2.10m"
          >
            <Check size={13} />
            <span>Clear Path (2.10m)</span>
          </button>

          {manualDistance !== null && (
            <button 
              className="sensor-quick-btn auto"
              onClick={() => {
                setManualDistance(null);
                lastTimestampRef.current = performance.now();
              }}
              title="Resume automatic sinusoidal obstacle oscillation at constant physical speed"
            >
              <RotateCcw size={13} />
              <span>Resume Auto Wave</span>
            </button>
          )}
        </div>

        <div className="controls-right">
          <div className="rate-slider-group">
            <Sliders size={14} className="text-muted" />
            <label 
              className="slider-label"
              title="Publisher timer frequency: controls how many messages are published per second across DDS. The physical obstacle oscillates at a constant real-time speed."
            >
              Timer Rate: <strong>{publishRate} Hz</strong> <span className="rate-subtext">({publishRate} msg/s)</span>
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="4" 
              step="0.5" 
              value={publishRate} 
              onChange={(e) => setPublishRate(parseFloat(e.target.value))}
              className="pubsub-slider"
            />
          </div>

          <div className="qos-toggle-group">
            <span className="qos-label">QoS Policy:</span>
            <button
              className={`qos-choice-btn ${qosProfile === 'default' ? 'active' : ''}`}
              onClick={() => setQosProfile('default')}
            >
              Reliable
            </button>
            <button
              className={`qos-choice-btn ${qosProfile === 'sensor_data' ? 'active' : ''}`}
              onClick={() => setQosProfile('sensor_data')}
            >
              Best Effort
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Detail Inspector Panel */}
      {selectedElement && (
        <div className="pubsub-inspector animate-fade-in">
          <div className="inspector-header">
            <div className="inspector-title">
              <Info size={16} className="text-cyan" />
              <span>
                {selectedElement === 'pub' && 'Inspecting: Publisher Node (ultrasonic_sensor_node)'}
                {selectedElement === 'topic' && 'Inspecting: Topic Bus (/sensor/ultrasonic_front)'}
                {selectedElement === 'dds' && 'Inspecting: DDS Middleware & QoS Transport'}
                {selectedElement === 'sub' && 'Inspecting: Subscriber Node (collision_monitor_node)'}
              </span>
            </div>
            <button className="inspector-close" onClick={() => setSelectedElement(null)}>✕</button>
          </div>

          <div className="inspector-body">
            {selectedElement === 'pub' && (
              <div className="inspector-grid">
                <div>
                  <strong>Role:</strong> Data Originator / Sensor Publisher.
                  <p>Calls <code className="inline-code">self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)</code>. The node publishes sensor telemetry anonymously without needing to know which subscriber nodes are listening.</p>
                </div>
                <div className="cli-hint">
                  <strong>CLI Inspection Command:</strong>
                  <code>ros2 node info /ultrasonic_sensor_node</code>
                </div>
              </div>
            )}
            {selectedElement === 'topic' && (
              <div className="inspector-grid">
                <div>
                  <strong>Role:</strong> Decoupled Named Message Bus.
                  <p>In ROS 2, topics are strictly typed (<code className="inline-code">example_interfaces/msg/Float32</code>). Any publisher sending mismatched types is rejected by DDS compile-time and runtime checks.</p>
                </div>
                <div className="cli-hint">
                  <strong>CLI Inspection Commands:</strong>
                  <code>ros2 topic list</code>
                  <code>ros2 topic info /sensor/ultrasonic_front</code>
                  <code>ros2 topic echo /sensor/ultrasonic_front</code>
                  <code>ros2 topic hz /sensor/ultrasonic_front</code>
                </div>
              </div>
            )}
            {selectedElement === 'dds' && (
              <div className="inspector-grid">
                <div>
                  <strong>Role:</strong> Data Distribution Service (DDS / RTPS).
                  <p>ROS 2 replaces ROS 1's custom master with industry-standard DDS (Object Management Group). Nodes automatically discover each other via multicast peer-to-peer handshakes without a central broker.</p>
                </div>
                <div className="cli-hint">
                  <strong>Active Profile:</strong>
                  <code>{qosProfile === 'default' ? 'Reliability: RELIABLE, Durability: VOLATILE, Depth: 10' : 'Reliability: BEST_EFFORT, Durability: VOLATILE, Depth: 5 (Sensor Data)'}</code>
                </div>
              </div>
            )}
            {selectedElement === 'sub' && (
              <div className="inspector-grid">
                <div>
                  <strong>Role:</strong> Event-Driven Consumer & Safety Supervisor.
                  <p>Registers a callback method with <code className="inline-code">self.create_subscription(Float32, '/sensor/ultrasonic_front', self.distance_callback, 10)</code>. The ROS 2 Executor sits in an event loop (<code className="inline-code">rclpy.spin()</code>) and calls the callback whenever new distance data lands in the queue.</p>
                  <p style={{ marginTop: '6px', color: '#94a3b8' }}>
                    Current Reaction: <strong>{isEmergencyStop ? '🚨 COLLISION HAZARD (< 0.50m) -> EMERGENCY STOP ACTIVE' : '✅ SAFE CLEARANCE (>= 0.50m) -> NORMAL MOTION'}</strong>
                  </p>
                </div>
                <div className="cli-hint">
                  <strong>CLI Verification:</strong>
                  <code>ros2 node info /collision_monitor_node</code>
                  <code>ros2 topic echo /sensor/ultrasonic_front</code>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
