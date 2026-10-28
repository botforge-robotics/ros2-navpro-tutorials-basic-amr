import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Send,
  XOctagon,
  CheckCircle2,
  AlertTriangle,
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
  Check
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

    // Goal packet glides Client ➔ Server in 2.2s
    const t1 = setTimeout(() => {
      setGoalStatus('GOAL_ACCEPTED');

      // Server accepts goal and starts driving motors in 0.8s
      const t2 = setTimeout(() => {
        setGoalStatus('EXECUTING');
      }, 800);
      timeoutsRef.current.push(t2);
    }, 2200);
    timeoutsRef.current.push(t1);
  };

  // 2. Preempt / Cancel Goal: Client ➔ Server
  const handleCancelGoal = () => {
    if (goalStatus !== 'EXECUTING') return;

    clearAllTimers();
    setFeedbackPackets([]);
    setGoalStatus('SENDING_CANCEL');

    // Cancel packet glides Client ➔ Server in 1.6s
    const t1 = setTimeout(() => {
      setGoalStatus('CANCELED');
      setClientFeedback(prev => ({ ...prev, current_velocity: 0.0 }));
    }, 1600);
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
          }, 2400);
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
    // Each feedback packet glides across for 1.8s, creating a continuous rhythmic pipeline!
    feedbackTimerRef.current = setInterval(() => {
      setFeedbackCount(c => c + 1);
      const id = pulseIdRef.current++;
      const currentDist = distanceRemainingRef.current;
      setFeedbackPackets(prev => {
        const trimmed = prev.slice(-2); // keep at most 2 flowing packets concurrently so they never collide
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

  // Guided Steps Content (Clean ROS 2 Action Protocol Terminology)
  const guidedSteps = [
    {
      num: 1,
      title: "1. Goal Dispatch (Client ➔ Server)",
      desc: "The Action Client calls send_goal_async(NavigateDistance.Goal(target=10.0m)). The Goal request dispatches from Client to Server. The Server accepts the goal handle and returns UUID #0x82f1.",
      target: 'goal'
    },
    {
      num: 2,
      title: "2. Periodic Feedback Stream (Server ➔ Client)",
      desc: "While the AMR navigates, the Action Server publishes periodic feedback packets continuously back to the Client at 4 Hz. The Client's feedback_callback receives remaining distance and velocity without blocking.",
      target: 'feedback'
    },
    {
      num: 3,
      title: "3. Preemption & Cancellation Request (Client ➔ Server)",
      desc: "If an obstacle or user emergency occurs, the Client dispatches a Cancel Request packet. The Server halts the motor controllers immediately, accepts preemption, and stops the robot.",
      target: 'cancel'
    },
    {
      num: 4,
      title: "4. Final Result Resolution (Server ➔ Client)",
      desc: "Upon reaching 0.0m or canceling, the Server dispatches the Result packet back to the Client. The Client's get_result_async() resolves with the final status code (STATUS_SUCCEEDED or STATUS_CANCELED).",
      target: 'result'
    }
  ];

  return (
    <div className="pubsub-flow-container">
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
              onClick={() => {
                setActiveStep(s.num);
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

      {/* Main 3-Column Diagram Stage */}
      <div className="diagram-stage">
        {/* Left Column: Action Client */}
        <div 
          className={`diagram-card client-card ${
            goalStatus === 'EXECUTING' || goalStatus === 'SENDING_GOAL' ? 'pulse-border' : ''
          } ${activeStep === 1 || activeStep === 3 || activeStep === null ? 'focused' : 'dimmed'}`}
        >
          <div className="card-top">
            <div className="node-icon-wrapper pub-icon">
              <Compass size={18} />
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">ACTION CLIENT (Requester)</div>
              <h3 className="node-name" title="/patrol_action_client">patrol_action_client</h3>
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
                  fontSize: '0.70rem'
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
                <span className="fb-key">distance_rem:</span>
                <span className="fb-val text-emerald font-mono">
                  {goalStatus === 'EXECUTING' || goalStatus === 'SUCCEEDED' || goalStatus === 'CANCELED'
                    ? `${clientFeedback.distance_remaining.toFixed(1)} m`
                    : '--'}
                </span>
              </div>
              <div className="client-fb-stat">
                <span className="fb-key">current_vel:</span>
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

          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button 
              className="card-action-btn"
              onClick={handleStartGoal}
              disabled={goalStatus === 'EXECUTING' || goalStatus === 'SENDING_GOAL' || goalStatus === 'SENDING_RESULT'}
              title="Dispatch Action Goal to drive target distance"
              style={{ flex: 1 }}
            >
              <Send size={13} />
              <span>Send Goal ({targetDistance}m)</span>
            </button>

            {goalStatus === 'EXECUTING' && (
              <button 
                className="card-action-btn"
                onClick={handleCancelGoal}
                title="Preempt and cancel ongoing goal immediately"
                style={{ background: '#ef4444', borderColor: '#ef4444', color: '#fff' }}
              >
                <XOctagon size={13} />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Center Column: Dedicated Action Pipeline (Corridor Runway + 3 Action Channels) */}
        <div 
          className={`diagram-pipeline ${
            activeStep === 2 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'
          }`}
        >
          <div className="topic-badge">
            <Radio size={14} className="text-cyan animate-pulse" />
            <span className="topic-name">Action Bus: <strong>/navigate_distance</strong></span>
            <span className="topic-type">NavigateDistance.action</span>
          </div>

          {/* Top of Center Pipeline: Physical AMR Warehouse Corridor Trajectory Track */}
          <div className="action-channel-strip corridor-strip" style={{ marginBottom: '8px' }}>
            <div className="channel-header-row">
              <span className="channel-tag" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' }}>
                <Navigation size={11} /> Warehouse Navigation Corridor (Physical Trajectory)
              </span>
              <span className="channel-desc font-mono">
                {goalStatus === 'EXECUTING' ? `traversed: ${(targetDistance * (progressPct / 100)).toFixed(1)}m / ${targetDistance}.0m` :
                 goalStatus === 'SUCCEEDED' ? `Goal reached: ${targetDistance}.0m` :
                 goalStatus === 'CANCELED' ? 'Preempted / Motor Cut' : 'Standby at 0.0m'}
              </span>
            </div>

            <div className="amr-runway-track">
              <div className="runway-rail"></div>
              <div 
                className="runway-fill-progress" 
                style={{ 
                  width: `${progressPct}%`,
                  background: goalStatus === 'CANCELED' 
                    ? '#ef4444' 
                    : 'linear-gradient(90deg, #0284c7, #10b981)' 
                }}
              ></div>

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
              <div className="runway-ticks">
                <span>0m</span>
                <span>{(targetDistance * 0.25).toFixed(0)}m</span>
                <span>{(targetDistance * 0.5).toFixed(0)}m</span>
                <span>{(targetDistance * 0.75).toFixed(0)}m</span>
                <span>{targetDistance}m</span>
              </div>
            </div>
          </div>

          {/* Channel 1: Goal Service (Client ➔ Server · Single Dispatch) */}
          <div className="action-channel-strip goal-channel">
            <div className="channel-header-row">
              <span className="channel-tag goal-tag">
                <ArrowRight size={11} /> 1. GOAL SERVICE (Client ➔ Server · Single Dispatch)
              </span>
              <span className="channel-desc">target: {targetDistance}.0m</span>
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
                <div className="sliding-action-packet slide-c2s" style={{ animationDuration: '1.6s' }}>
                  <span className="action-packet-pill" style={{ background: '#7f1d1d', border: '1px solid #ef4444', color: '#fff' }}>
                    <XOctagon size={10} />
                    <span>CancelRequest(goal_id=0x82f1)</span>
                  </span>
                </div>
              )}
              {goalStatus === 'GOAL_ACCEPTED' && (
                <div className="channel-accepted-badge animate-fade-in">
                  <Check size={11} /> Goal Accepted by Server (UUID: #0x82f1)
                </div>
              )}
            </div>
          </div>

          {/* Channel 2: Real-Time Feedback Stream (Server ➔ Client · Continuous Stream @ 4 Hz) */}
          <div className="action-channel-strip feedback-channel">
            <div className="channel-header-row">
              <span className="channel-tag feedback-tag">
                <ArrowLeft size={11} /> 2. FEEDBACK STREAM (Server ➔ Client · Continuous Stream @ 4 Hz)
              </span>
              <span className="channel-desc">rem: {distanceRemaining.toFixed(1)}m</span>
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
                <ArrowLeft size={11} /> 3. RESULT SERVICE (Server ➔ Client · Single Resolution)
              </span>
              <span className="channel-desc">
                {goalStatus === 'SUCCEEDED' ? 'STATUS_SUCCEEDED' : goalStatus === 'CANCELED' ? 'STATUS_CANCELED' : 'Awaiting End'}
              </span>
            </div>
            <div className="channel-wire">
              <div className="wire-track">
                <div className="flow-chevrons flow-left">‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹</div>
              </div>
              {goalStatus === 'SENDING_RESULT' && (
                <div className="sliding-action-packet slide-s2c">
                  <span className="action-packet-pill" style={{ background: '#3b0764', border: '1px solid #a855f7', color: '#f3e8ff' }}>
                    <CheckCircle2 size={10} />
                    <span>Result: STATUS_SUCCEEDED (dist={targetDistance}m)</span>
                  </span>
                </div>
              )}
              {goalStatus === 'SUCCEEDED' && (
                <div className="channel-result-pill animate-fade-in">
                  <CheckCircle2 size={11} className="text-emerald" /> Result Delivered: STATUS_SUCCEEDED
                </div>
              )}
              {goalStatus === 'CANCELED' && (
                <div className="channel-result-pill animate-fade-in" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                  <XOctagon size={11} /> Goal Canceled: STATUS_CANCELED
                </div>
              )}
            </div>
          </div>

          {/* Action Architecture Footer Metadata */}
          <div className="qos-badge-strip" style={{ marginTop: '8px' }}>
            <span className="qos-chip">1. Goal: Client ➔ Server (RPC)</span>
            <span className="qos-chip">2. Feedback: Server ➔ Client (Stream)</span>
            <span className="qos-chip">3. Result: Server ➔ Client (RPC)</span>
          </div>
        </div>

        {/* Right Column: Action Server */}
        <div 
          className={`diagram-card server-card ${
            goalStatus === 'EXECUTING' || goalStatus === 'GOAL_ACCEPTED' ? 'pulse-border-green' : ''
          } ${activeStep === 1 || activeStep === 2 || activeStep === null ? 'focused' : 'dimmed'}`}
        >
          <div className="card-top">
            <div className="node-icon-wrapper sub-icon">
              <Cpu size={18} />
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">ACTION SERVER (Executor)</div>
              <h3 className="node-name" title="/nav_action_server">nav_action_server</h3>
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
                className="telemetry-val" 
                style={{ color: goalStatus === 'EXECUTING' ? '#10b981' : 'var(--text-muted)' }}
              >
                {goalStatus === 'EXECUTING' ? '1.4 m/s' : '0.0 m/s'}
              </span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Preemption</span>
              <span 
                className="telemetry-val" 
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

          <div className="card-terminal-log">
            <div className="log-header">
              <Activity size={12} className="text-green" />
              <span>Trajectory Execution Telemetry</span>
            </div>
            <div className="log-content-wrap">
              <span className={`log-level-pill ${goalStatus === 'CANCELED' ? 'log-level-error' : ''}`}>
                {goalStatus === 'EXECUTING' ? '[STATUS_EXECUTING]' : goalStatus === 'CANCELED' ? '[STATUS_CANCELED]' : '[STATUS_UNKNOWN]'}
              </span>
              <span className="log-text">
                {goalStatus === 'EXECUTING' 
                  ? `Active trajectory to ${targetDistance}m... Remaining: ${distanceRemaining.toFixed(1)}m` 
                  : goalStatus === 'CANCELED'
                    ? 'Preempt request accepted. Velocity cut to 0.0 m/s.'
                    : goalStatus === 'SUCCEEDED'
                      ? `Goal reached successfully! Dispatched ${feedbackCount} feedbacks.`
                      : 'Server ready. Awaiting navigation action goal.'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="pubsub-controls-bar" style={{ marginTop: '1.25rem' }}>
        <div className="controls-left">
          <button
            className={`control-btn play-btn ${goalStatus === 'EXECUTING' ? 'active-playing' : ''}`}
            onClick={handleStartGoal}
            disabled={goalStatus === 'EXECUTING' || goalStatus === 'SENDING_GOAL' || goalStatus === 'SENDING_RESULT'}
            title="Dispatch Navigation Action Goal"
          >
            <Send size={15} />
            <span>Send Goal ({targetDistance}m)</span>
          </button>

          <button
            className="control-btn"
            style={{ color: goalStatus === 'EXECUTING' ? '#ef4444' : 'var(--text-muted)' }}
            onClick={handleCancelGoal}
            disabled={goalStatus !== 'EXECUTING'}
            title="Preempt and cancel ongoing action goal"
          >
            <XOctagon size={15} />
            <span>Cancel Goal (Preempt)</span>
          </button>

          <button
            className="control-btn"
            onClick={handleReset}
            title="Reset action simulation"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
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
            <p>The client requests a long-running goal (drive 10m). The server accepts the goal handle and begins executing the drive trajectory.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon feedback-concept-icon">
            <Activity size={16} />
          </div>
          <div className="concept-text">
            <strong>2. Feedback Stream (Server ➔ Client)</strong>
            <p>While the robot drives, the server continuously publishes real-time telemetry (remaining distance, current velocity) back to the client at 4 Hz.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon cancel-concept-icon">
            <XOctagon size={16} />
          </div>
          <div className="concept-text">
            <strong>3. Mid-Flight Preemption (Client ➔ Server)</strong>
            <p>Unlike standard Services which cannot be interrupted, an Action allows the client to abort a goal mid-flight if an emergency stop or obstacle occurs.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon result-concept-icon">
            <CheckCircle2 size={16} />
          </div>
          <div className="concept-text">
            <strong>4. Result Service (Server ➔ Client)</strong>
            <p>When the robot reaches the target waypoint or finishes executing, the server returns the final outcome packet back to the client.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
