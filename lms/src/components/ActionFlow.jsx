import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Send,
  XOctagon,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  ArrowRight,
  ArrowLeft,
  Activity,
  Terminal,
  Zap,
  Sliders,
  Cpu,
  Radio,
  Navigation,
  Check,
  Flag
} from 'lucide-react';

export function ActionFlow() {
  const [goalStatus, setGoalStatus] = useState('IDLE'); // 'IDLE' | 'SENDING_GOAL' | 'GOAL_ACCEPTED' | 'EXECUTING' | 'SENDING_RESULT' | 'SUCCEEDED' | 'SENDING_CANCEL' | 'CANCELED'
  const [progressPct, setProgressPct] = useState(0); // 0 to 100%
  const [targetDistance, setTargetDistance] = useState(10); // meters
  const [distanceRemaining, setDistanceRemaining] = useState(10.0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [activeStep, setActiveStep] = useState(null); // null = free run, 1..4 = guided steps
  const [feedbackPackets, setFeedbackPackets] = useState([]); // streaming packets from Server -> Client

  // Client-side received feedback state & pulse
  const [clientFeedback, setClientFeedback] = useState({
    distance_remaining: 10.0,
    current_velocity: 0.0,
    count: 0
  });
  const [isClientFeedbackPulsing, setIsClientFeedbackPulsing] = useState(false);

  const animTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const timeoutsRef = useRef([]);
  const pulseIdRef = useRef(1);
  const distanceRemainingRef = useRef(10.0);

  const clearAllTimers = () => {
    if (animTimerRef.current) clearInterval(animTimerRef.current);
    if (feedbackTimerRef.current) clearInterval(feedbackTimerRef.current);
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // 1. Dispatch Goal: Client ➔ Server
  const handleStartGoal = () => {
    if (goalStatus === 'EXECUTING' || goalStatus === 'SENDING_GOAL' || goalStatus === 'SENDING_RESULT') return;

    clearAllTimers();
    setProgressPct(0);
    setDistanceRemaining(targetDistance);
    distanceRemainingRef.current = targetDistance;
    setFeedbackCount(0);
    setFeedbackPackets([]);
    setClientFeedback({
      distance_remaining: targetDistance,
      current_velocity: 0.0,
      count: 0
    });
    setGoalStatus('SENDING_GOAL');

    // Goal packet glides Client ➔ Server in 2.0s
    const t1 = setTimeout(() => {
      setGoalStatus('GOAL_ACCEPTED');

      // Server accepts goal and starts driving motors in 0.7s
      const t2 = setTimeout(() => {
        setGoalStatus('EXECUTING');
      }, 700);
      timeoutsRef.current.push(t2);
    }, 2000);
    timeoutsRef.current.push(t1);
  };

  // 2. Preempt / Cancel Goal: Client ➔ Server
  const handleCancelGoal = () => {
    if (goalStatus !== 'EXECUTING') return;

    clearAllTimers();
    setFeedbackPackets([]);
    setGoalStatus('SENDING_CANCEL');

    // Cancel packet glides Client ➔ Server in 1.5s
    const t1 = setTimeout(() => {
      setGoalStatus('CANCELED');
      setClientFeedback(prev => ({ ...prev, current_velocity: 0.0 }));
    }, 1500);
    timeoutsRef.current.push(t1);
  };

  // Reset simulation
  const handleReset = () => {
    clearAllTimers();
    setGoalStatus('IDLE');
    setProgressPct(0);
    setDistanceRemaining(targetDistance);
    distanceRemainingRef.current = targetDistance;
    setFeedbackCount(0);
    setFeedbackPackets([]);
    setClientFeedback({
      distance_remaining: targetDistance,
      current_velocity: 0.0,
      count: 0
    });
    setActiveStep(null);
  };

  // Driving & Continuous Feedback Stream Loop
  useEffect(() => {
    if (goalStatus !== 'EXECUTING') {
      if (animTimerRef.current) clearInterval(animTimerRef.current);
      if (feedbackTimerRef.current) clearInterval(feedbackTimerRef.current);
      return;
    }

    // Drive duration: target distance at 1.4 m/s (e.g. 10m -> 7.14s)
    const totalDriveSec = targetDistance / 1.4;
    const tickIntervalMs = 60;
    const totalTicks = (totalDriveSec * 1000) / tickIntervalMs;
    const progressPerTick = 100 / totalTicks;

    // Drive AMR robot forward along corridor
    animTimerRef.current = setInterval(() => {
      setProgressPct(prev => {
        const next = prev + progressPerTick;
        if (next >= 100) {
          clearInterval(animTimerRef.current);
          clearInterval(feedbackTimerRef.current);
          setDistanceRemaining(0.0);
          distanceRemainingRef.current = 0.0;
          setFeedbackPackets([]);

          // Trigger Result Service: Server ➔ Client
          setGoalStatus('SENDING_RESULT');
          const tResult = setTimeout(() => {
            setGoalStatus('SUCCEEDED');
            setClientFeedback(prev => ({
              distance_remaining: 0.0,
              current_velocity: 0.0,
              count: prev.count
            }));
          }, 2200);
          timeoutsRef.current.push(tResult);

          return 100;
        }
        const rem = parseFloat((targetDistance * (1 - next / 100)).toFixed(1));
        setDistanceRemaining(rem);
        distanceRemainingRef.current = rem;
        return next;
      });
    }, tickIntervalMs);

    // CONTINUOUS FEEDBACK STREAM: Server ➔ Client at ~1.1 Hz
    feedbackTimerRef.current = setInterval(() => {
      setFeedbackCount(c => c + 1);
      const id = pulseIdRef.current++;
      const currentDist = distanceRemainingRef.current;
      setFeedbackPackets(prev => {
        const trimmed = prev.slice(-2);
        return [...trimmed, { id, dist: currentDist.toFixed(1) }];
      });
    }, 900);

    return () => {
      if (animTimerRef.current) clearInterval(animTimerRef.current);
      if (feedbackTimerRef.current) clearInterval(feedbackTimerRef.current);
    };
  }, [goalStatus, targetDistance]);

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // When a feedback packet completes flight and arrives at the Client node
  const handleFeedbackDelivered = (deliveredPkt) => {
    setClientFeedback({
      distance_remaining: parseFloat(deliveredPkt.dist),
      current_velocity: 1.4,
      count: deliveredPkt.id
    });
    setIsClientFeedbackPulsing(true);
    setTimeout(() => setIsClientFeedbackPulsing(false), 220);
    setFeedbackPackets(prev => prev.filter(p => p.id !== deliveredPkt.id));
  };

  // Guided Steps Content
  const guidedSteps = [
    {
      num: 1,
      title: "1. Goal Dispatch (Client ➔ Server)",
      desc: "The Action Client calls send_goal_async(NavigateDistance.Goal(target=10.0m)). The Goal request dispatches across the DDS network. The Server accepts the goal handle and returns UUID #0x82f1.",
      target: 'goal'
    },
    {
      num: 2,
      title: "2. Periodic Feedback Stream (Server ➔ Client)",
      desc: "While the AMR drives along the corridor, the Action Server streams feedback packets at 4 Hz. The Client's feedback_callback receives distance remaining and velocity asynchronously without blocking.",
      target: 'feedback'
    },
    {
      num: 3,
      title: "3. Preemption & Cancellation Request (Client ➔ Server)",
      desc: "If an emergency obstacle appears, the Client calls cancel_goal_async(). The Server immediately halts motor PWM, updates the goal state machine to STATUS_CANCELED, and stops navigation.",
      target: 'cancel'
    },
    {
      num: 4,
      title: "4. Final Result Resolution (Server ➔ Client)",
      desc: "Upon reaching 0.0m or completing cancellation, the Server sends the Result packet back. The Client's get_result_async() resolves with the terminal status (STATUS_SUCCEEDED or STATUS_CANCELED).",
      target: 'result'
    }
  ];

  return (
    <div className="pubsub-flow-container action-flow-root-container">
      {/* Header Bar */}
      <div className="pubsub-flow-header">
        <div className="header-title-row">
          <div className="badge-pill">
            <Radio size={14} className="text-cyan animate-pulse" />
            <span>Interactive 3-Tier Action Architecture: Goal ➔ Feedback ➔ Result</span>
          </div>
          <span className="ros-version-tag">nexus_amr_interfaces/action/NavigateDistance · Preemptible</span>
        </div>
        <p className="pubsub-flow-subtitle">
          ROS 2 Actions provide asynchronous, preemptible, long-running goal execution: The Action Client dispatches a Goal request, the Action Server publishes a continuous stream of real-time Feedback during execution, and returns the final Result when complete.
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
            onClick={() => { setActiveStep(null); }}
          >
            All Live
          </button>
          {guidedSteps.map((s) => (
            <button
              key={s.num}
              className={`walkthrough-step-btn ${activeStep === s.num ? 'active' : ''}`}
              onClick={() => { setActiveStep(s.num); }}
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

      {/* 1. Full-Width Physical AMR Warehouse Trajectory Runway */}
      <div className="action-physical-runway-card">
        <div className="runway-header-row">
          <div className="runway-header-left">
            <span className="runway-badge">
              <Navigation size={12} />
              <span>Physical AMR Trajectory Corridor</span>
            </span>
            <span className="runway-live-status font-mono">
              {goalStatus === 'EXECUTING' ? `Driving at 1.40 m/s · ${(targetDistance * (progressPct / 100)).toFixed(1)}m of ${targetDistance}.0m traversed` :
               goalStatus === 'GOAL_ACCEPTED' ? 'Goal Accepted · Initializing Motor Drive...' :
               goalStatus === 'SENDING_GOAL' ? 'Goal Dispatch In-Flight...' :
               goalStatus === 'SENDING_CANCEL' ? 'Preemption In-Flight · Decelerating Motors...' :
               goalStatus === 'SUCCEEDED' ? `Goal Reached! Target Waypoint Reached: ${targetDistance}.0m` :
               goalStatus === 'CANCELED' ? 'Preemption Accepted · Motors Safely Cut' :
               `Standby at 0.0m · Awaiting Action Goal (${targetDistance}m)`}
            </span>
          </div>

          <div className="runway-header-right font-mono">
            <span className="runway-speed-tag">
              Speed: <strong>{goalStatus === 'EXECUTING' ? '1.40 m/s' : '0.00 m/s'}</strong>
            </span>
          </div>
        </div>

        <div className="amr-full-runway-track">
          <div className="runway-track-rail"></div>
          <div 
            className="runway-track-fill" 
            style={{ 
              width: `${progressPct}%`,
              background: goalStatus === 'CANCELED' 
                ? '#ef4444' 
                : 'linear-gradient(90deg, #0284c7, #10b981)' 
            }}
          ></div>

          {/* Destination Waypoint Flag */}
          <div className="runway-destination-flag" title={`Target Waypoint: ${targetDistance}.0m`}>
            <Flag size={14} className={goalStatus === 'SUCCEEDED' ? 'text-emerald' : 'text-cyan'} />
            <span className="flag-label">{targetDistance}m</span>
          </div>

          {/* The Driving Robot Marker */}
          <div 
            className={`runway-amr-marker ${goalStatus === 'EXECUTING' ? 'driving' : ''}`}
            style={{ left: `calc(${progressPct}% - 14px)` }}
            title={`AMR Position: ${(targetDistance * (progressPct / 100)).toFixed(1)}m`}
          >
            <div className="amr-icon-box">
              <Navigation size={13} className="amr-compass-icon" />
            </div>
          </div>

          {/* Distance Ticks */}
          <div className="runway-distance-ticks">
            <span>0m (Origin)</span>
            <span>{(targetDistance * 0.25).toFixed(1)}m</span>
            <span>{(targetDistance * 0.50).toFixed(1)}m</span>
            <span>{(targetDistance * 0.75).toFixed(1)}m</span>
            <span>{targetDistance}.0m (Waypoint)</span>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column ROS 2 Action Architecture Diagram */}
      <div className="diagram-stage action-balanced-stage">
        {/* Left Column: Action Client Node */}
        <div 
          className={`diagram-card client-card action-node-card ${
            goalStatus === 'EXECUTING' || goalStatus === 'SENDING_GOAL' ? 'pulse-border' : ''
          } ${activeStep === 1 || activeStep === 3 || activeStep === null ? 'focused' : 'dimmed'}`}
        >
          <div className="card-top">
            <div className="node-icon-wrapper pub-icon">
              <Compass size={18} />
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">ACTION CLIENT (Caller)</div>
              <h3 className="node-name action-node-title" title="/patrol_action_client">patrol_action_client</h3>
              <div className="node-class">NavigateDistanceClient</div>
            </div>
            <div 
              className={`status-dot ${goalStatus === 'EXECUTING' ? 'online' : goalStatus === 'CANCELED' ? 'error' : 'paused'}`} 
              title={goalStatus} 
            />
          </div>

          <div className="card-code-snip">
            <span className="code-fn">client.send_goal_async</span>
            <span className="code-args">(NavigateDistance.Goal(target={targetDistance}m))</span>
          </div>

          {/* ROS 2 Standard Goal Status Telemetry */}
          <div className="card-telemetry pub-telemetry">
            <div className="telemetry-item">
              <span className="telemetry-label">Target</span>
              <span className="telemetry-val text-cyan">{targetDistance}.0 m</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Received</span>
              <span className="telemetry-val text-amber">#{clientFeedback.count}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Goal Status</span>
              <span 
                className="telemetry-val font-mono" 
                style={{
                  color: goalStatus === 'SUCCEEDED' ? '#10b981' :
                         goalStatus === 'CANCELED' ? '#ef4444' :
                         goalStatus === 'EXECUTING' ? '#38bdf8' :
                         goalStatus === 'GOAL_ACCEPTED' ? '#a855f7' :
                         goalStatus === 'SENDING_GOAL' ? '#38bdf8' :
                         goalStatus === 'SENDING_CANCEL' ? '#f59e0b' : 'var(--text-muted)',
                  fontSize: '0.68rem'
                }}
              >
                {goalStatus === 'EXECUTING' ? 'STATUS_EXECUTING' :
                 goalStatus === 'GOAL_ACCEPTED' ? 'STATUS_ACCEPTED' :
                 goalStatus === 'SENDING_GOAL' ? 'STATUS_ACCEPTED' :
                 goalStatus === 'SENDING_CANCEL' ? 'STATUS_CANCELING' :
                 goalStatus === 'SUCCEEDED' ? 'STATUS_SUCCEEDED' :
                 goalStatus === 'CANCELED' ? 'STATUS_CANCELED' : 'STATUS_UNKNOWN'}
              </span>
            </div>
          </div>

          {/* Live Action Client Feedback Callback Monitor */}
          <div className={`client-feedback-terminal ${isClientFeedbackPulsing ? 'cb-flash' : ''}`}>
            <div className="client-fb-header">
              <Activity size={12} className="text-emerald" />
              <span className="font-mono">def feedback_callback(self, msg):</span>
              {isClientFeedbackPulsing && <span className="cb-live-tag">LIVE MSG</span>}
            </div>
            <div className="client-fb-grid">
              <div className="client-fb-stat">
                <span className="fb-key">dist_rem:</span>
                <span className="fb-val text-emerald font-mono">
                  {goalStatus === 'EXECUTING' || goalStatus === 'SUCCEEDED' || goalStatus === 'CANCELED'
                    ? `${clientFeedback.distance_remaining.toFixed(1)} m`
                    : '--'}
                </span>
              </div>
              <div className="client-fb-stat">
                <span className="fb-key">velocity:</span>
                <span className="fb-val text-cyan font-mono">
                  {goalStatus === 'EXECUTING' ? '1.40 m/s' : '0.00 m/s'}
                </span>
              </div>
              <div className="client-fb-stat">
                <span className="fb-key">traversed:</span>
                <span className="fb-val text-purple font-mono">
                  {goalStatus === 'EXECUTING' || goalStatus === 'SUCCEEDED' || goalStatus === 'CANCELED'
                    ? `${Math.max(0, targetDistance - clientFeedback.distance_remaining).toFixed(1)} m`
                    : '0.0 m'}
                </span>
              </div>
            </div>
          </div>

          {/* Client Action Dispatch / Preempt Button */}
          <div className="client-card-action-wrap">
            {goalStatus === 'EXECUTING' ? (
              <button 
                className="card-action-btn cancel-action-btn"
                onClick={handleCancelGoal}
                title="Preempt and cancel ongoing goal immediately"
              >
                <XOctagon size={14} />
                <span>Preempt Goal (Emergency Cancel)</span>
              </button>
            ) : (
              <button 
                className="card-action-btn"
                onClick={handleStartGoal}
                disabled={goalStatus === 'SENDING_GOAL' || goalStatus === 'SENDING_RESULT'}
                title="Dispatch Action Goal to drive target distance"
              >
                <Send size={14} />
                <span>Send Goal ({targetDistance}m)</span>
              </button>
            )}
          </div>
        </div>

        {/* Center Column: Dedicated 3-Channel Action Pipeline */}
        <div 
          className={`diagram-pipeline action-pipeline-card ${
            activeStep === 2 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'
          }`}
        >
          <div className="topic-badge">
            <Radio size={14} className="text-cyan animate-pulse" />
            <span className="topic-name">Action Bus: <strong>/navigate_distance</strong></span>
            <span className="topic-type">NavigateDistance.action</span>
          </div>

          {/* Channel 1: Goal Service (Client ➔ Server · Single Dispatch) */}
          <div className="action-channel-strip goal-channel">
            <div className="channel-header-row">
              <span className="channel-tag goal-tag">
                <ArrowRight size={11} /> 1. GOAL SERVICE (Client ➔ Server)
              </span>
              <span className="channel-desc font-mono">target: {targetDistance}.0m</span>
            </div>
            <div className="channel-wire">
              <div className="wire-track">
                <div className="flow-chevrons flow-right">› › › › › › › › › › › › › › › › › › › ›</div>
              </div>
              {goalStatus === 'SENDING_GOAL' && (
                <div className="sliding-action-packet slide-c2s">
                  <span className="action-packet-pill goal-pill">
                    <Zap size={10} />
                    <span>Goal: NavigateDistance(target={targetDistance}m)</span>
                  </span>
                </div>
              )}
              {goalStatus === 'SENDING_CANCEL' && (
                <div className="sliding-action-packet slide-c2s" style={{ animationDuration: '1.5s' }}>
                  <span className="action-packet-pill cancel-pill">
                    <XOctagon size={10} />
                    <span>CancelRequest(goal_id=0x82f1)</span>
                  </span>
                </div>
              )}
              {goalStatus === 'GOAL_ACCEPTED' && (
                <div className="channel-accepted-badge animate-fade-in">
                  <Check size={11} /> Goal Accepted (UUID: #0x82f1)
                </div>
              )}
            </div>
          </div>

          {/* Channel 2: Real-Time Feedback Stream (Server ➔ Client · Continuous Stream @ 4 Hz) */}
          <div className="action-channel-strip feedback-channel">
            <div className="channel-header-row">
              <span className="channel-tag feedback-tag">
                <ArrowLeft size={11} /> 2. FEEDBACK STREAM (Server ➔ Client · 4 Hz)
              </span>
              <span className="channel-desc font-mono">rem: {distanceRemaining.toFixed(1)}m</span>
            </div>

            <div className="channel-wire">
              <div className="wire-track">
                <div className="flow-chevrons flow-left">‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹</div>
              </div>
              {feedbackPackets.map(p => (
                <div 
                  key={p.id} 
                  className="sliding-action-packet slide-feedback-stream"
                  onAnimationEnd={() => handleFeedbackDelivered(p)}
                >
                  <span className="action-packet-pill feedback-pill">
                    <Activity size={10} />
                    <span>rem: {p.dist}m | 1.4m/s</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Channel 3: Result Service (Server ➔ Client · Single Resolution upon Finish) */}
          <div className="action-channel-strip result-channel">
            <div className="channel-header-row">
              <span className="channel-tag result-tag">
                <ArrowLeft size={11} /> 3. RESULT SERVICE (Server ➔ Client)
              </span>
              <span className="channel-desc font-mono">
                {goalStatus === 'SUCCEEDED' ? 'STATUS_SUCCEEDED' : goalStatus === 'CANCELED' ? 'STATUS_CANCELED' : 'Awaiting Completion'}
              </span>
            </div>
            <div className="channel-wire">
              <div className="wire-track">
                <div className="flow-chevrons flow-left">‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹</div>
              </div>
              {goalStatus === 'SENDING_RESULT' && (
                <div className="sliding-action-packet slide-s2c">
                  <span className="action-packet-pill result-pill">
                    <CheckCircle2 size={10} />
                    <span>Result: STATUS_SUCCEEDED (dist={targetDistance}m)</span>
                  </span>
                </div>
              )}
              {goalStatus === 'SUCCEEDED' && (
                <div className="channel-result-pill result-success animate-fade-in">
                  <CheckCircle2 size={11} className="text-emerald" /> Result Delivered: STATUS_SUCCEEDED
                </div>
              )}
              {goalStatus === 'CANCELED' && (
                <div className="channel-result-pill result-canceled animate-fade-in">
                  <XOctagon size={11} /> Goal Preempted: STATUS_CANCELED
                </div>
              )}
            </div>
          </div>

          {/* Action Architecture Footer Metadata */}
          <div className="qos-badge-strip">
            <span className="qos-chip">1. Goal (RPC)</span>
            <span className="qos-chip">2. Feedback (Stream)</span>
            <span className="qos-chip">3. Result (RPC)</span>
          </div>
        </div>

        {/* Right Column: Action Server Node */}
        <div 
          className={`diagram-card server-card action-node-card ${
            goalStatus === 'EXECUTING' || goalStatus === 'GOAL_ACCEPTED' ? 'pulse-border-green' : ''
          } ${activeStep === 1 || activeStep === 2 || activeStep === null ? 'focused' : 'dimmed'}`}
        >
          <div className="card-top">
            <div className="node-icon-wrapper sub-icon">
              <Cpu size={18} />
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">ACTION SERVER (Executor)</div>
              <h3 className="node-name action-node-title" title="/nav_action_server">nav_action_server</h3>
              <div className="node-class">NavigateDistanceServer</div>
            </div>
            <div 
              className={`status-dot ${goalStatus === 'EXECUTING' ? 'online' : goalStatus === 'CANCELED' ? 'error' : 'active'}`} 
              title={goalStatus} 
            />
          </div>

          <div className="card-code-snip">
            <span className="code-fn">execute_callback</span>
            <span className="code-args">(goal_handle) ➔ publish_feedback()</span>
          </div>

          <div className="card-telemetry sub-telemetry">
            <div className="telemetry-item">
              <span className="telemetry-label">Motor Drive</span>
              <span 
                className="telemetry-val font-mono" 
                style={{ color: goalStatus === 'EXECUTING' ? '#10b981' : 'var(--text-muted)' }}
              >
                {goalStatus === 'EXECUTING' ? '1.40 m/s' : '0.00 m/s'}
              </span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Preemption</span>
              <span 
                className="telemetry-val font-mono" 
                style={{ color: goalStatus === 'CANCELED' ? '#ef4444' : '#10b981' }}
              >
                {goalStatus === 'CANCELED' ? 'PREEMPTED' : 'CLEAR'}
              </span>
            </div>
            <div className="telemetry-item cb-telemetry-item">
              <span className="telemetry-label">Goal Status</span>
              <span 
                className="telemetry-val font-mono"
                style={{
                  color: goalStatus === 'EXECUTING' ? '#10b981' :
                         goalStatus === 'SUCCEEDED' ? '#10b981' :
                         goalStatus === 'CANCELED' ? '#ef4444' : 'var(--text-muted)',
                  fontSize: '0.68rem'
                }}
              >
                {goalStatus === 'EXECUTING' ? 'STATUS_EXECUTING' :
                 goalStatus === 'SUCCEEDED' ? 'STATUS_SUCCEEDED' :
                 goalStatus === 'CANCELED' ? 'STATUS_CANCELED' : 'STATUS_UNKNOWN'}
              </span>
            </div>
          </div>

          {/* Active Server Goal Handler Execution Log */}
          <div className="card-terminal-log action-server-log">
            <div className="log-header">
              <Activity size={12} className="text-green" />
              <span>Execution Loop Telemetry (10 Hz)</span>
            </div>
            <div className="log-content-wrap">
              <span className={`log-level-pill ${goalStatus === 'CANCELED' ? 'log-level-error' : ''}`}>
                {goalStatus === 'EXECUTING' ? '[EXECUTING]' : goalStatus === 'CANCELED' ? '[CANCELED]' : goalStatus === 'SUCCEEDED' ? '[SUCCEEDED]' : '[STANDBY]'}
              </span>
              <span className="log-text">
                {goalStatus === 'EXECUTING' 
                  ? `Corridor trajectory active... Dist remaining: ${distanceRemaining.toFixed(1)}m` 
                  : goalStatus === 'CANCELED'
                    ? 'Preempt request accepted. Velocity cut to 0.0 m/s.'
                    : goalStatus === 'SUCCEEDED'
                      ? `Target reached! Dispatched ${feedbackCount} feedbacks.`
                      : 'Server listening on /navigate_distance. Ready for goal.'}
              </span>
            </div>
          </div>

          {/* Server Lifecycle State Pill */}
          <div className="server-status-footer-pill">
            <span className="status-indicator-tag">
              {goalStatus === 'EXECUTING' ? '🟢 Control Loop Active · Ticking at 10 Hz' :
               goalStatus === 'GOAL_ACCEPTED' ? '🟣 Goal Validated · Accepting Handle' :
               goalStatus === 'CANCELED' ? '🔴 Goal Aborted · Preempt Callback Resolved' :
               goalStatus === 'SUCCEEDED' ? '🟢 Goal Finalized · Result Published' :
               '⚪ Standby · Ready for Action Goal'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="pubsub-controls-bar action-controls-bar">
        <div className="controls-left">
          <button
            className="control-btn"
            onClick={handleReset}
            title="Reset action simulation"
          >
            <RotateCcw size={15} />
            <span>Reset Simulation</span>
          </button>
        </div>

        <div className="controls-right">
          <div className="rate-slider-group">
            <Sliders size={14} className="text-muted" />
            <label className="slider-label">Target Distance: <strong>{targetDistance} m</strong></label>
            <input
              type="range"
              min="5"
              max="20"
              step="1"
              value={targetDistance}
              disabled={goalStatus === 'EXECUTING' || goalStatus === 'SENDING_GOAL'}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setTargetDistance(val);
                setDistanceRemaining(val);
                distanceRemainingRef.current = val;
                setClientFeedback(prev => ({ ...prev, distance_remaining: val }));
              }}
              className="pubsub-slider"
            />
          </div>
        </div>
      </div>

      {/* Educational Concept Comparison Box */}
      <div className="service-concept-summary">
        <div className="concept-card">
          <div className="concept-icon goal-concept-icon">
            <Send size={16} />
          </div>
          <div className="concept-text">
            <strong>1. Goal Service (Client ➔ Server)</strong>
            <p>The client requests a long-running goal (drive {targetDistance}m). The server validates the goal parameters and returns an accepted handle.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon feedback-concept-icon">
            <Activity size={16} />
          </div>
          <div className="concept-text">
            <strong>2. Feedback Stream (Server ➔ Client)</strong>
            <p>While the robot drives, the server continuously publishes real-time telemetry (distance remaining, velocity) at 4 Hz.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon cancel-concept-icon">
            <XOctagon size={16} />
          </div>
          <div className="concept-text">
            <strong>3. Mid-Flight Preemption (Client ➔ Server)</strong>
            <p>Unlike standard Services, an Action allows the client to abort a goal mid-flight if an emergency stop or obstacle occurs.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon result-concept-icon">
            <CheckCircle2 size={16} />
          </div>
          <div className="concept-text">
            <strong>4. Result Service (Server ➔ Client)</strong>
            <p>When the robot reaches the target waypoint or aborts, the server returns the final status code and outcome packet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
