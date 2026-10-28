import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Send,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Cpu,
  Layers,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Activity,
  Terminal,
  Radio,
  HelpCircle,
  Check
} from 'lucide-react';

export function ServiceFlow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [callCount, setCallCount] = useState(1);
  const [clientState, setClientState] = useState('IDLE'); // 'IDLE' | 'SENDING' | 'WAITING' | 'RESOLVED'
  const [serverState, setServerState] = useState('LISTENING'); // 'LISTENING' | 'PROCESSING' | 'REPLYING'
  const [eStopEngaged, setEStopEngaged] = useState(true);
  const [activeStep, setActiveStep] = useState(null); // null = free run, 1..4 = guided steps
  const [currentPktStage, setCurrentPktStage] = useState('idle'); // 'idle' | 'req_in_flight' | 'server_computing' | 'res_in_flight' | 'completed'

  const callTimerRef = useRef(null);
  const timeoutsRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Trigger one full 2-way Service transaction with slow, readable animations
  const triggerServiceCall = () => {
    if (currentPktStage !== 'idle' && currentPktStage !== 'completed') return;

    clearAllTimeouts();
    setCallCount(prev => prev + 1);
    setClientState('SENDING');
    setCurrentPktStage('req_in_flight');

    // 1. Request packet glides slowly from Client (Left) -> Server (Right) (2.4s)
    const t1 = setTimeout(() => {
      setClientState('WAITING');
      setServerState('PROCESSING');
      setCurrentPktStage('server_computing');

      // 2. Server processes callback: locks/unlocks motor relays (1.6s)
      const t2 = setTimeout(() => {
        setServerState('REPLYING');
        setEStopEngaged(prev => !prev);
        setCurrentPktStage('res_in_flight');

        // 3. Response packet glides slowly from Server (Right) -> Client (Left) (2.4s)
        const t3 = setTimeout(() => {
          setClientState('RESOLVED');
          setServerState('LISTENING');
          setCurrentPktStage('completed');

          // 4. Settle back to ready state
          const t4 = setTimeout(() => {
            setClientState('IDLE');
            setCurrentPktStage('idle');
          }, 1500);
          timeoutsRef.current.push(t4);
        }, 2400);
        timeoutsRef.current.push(t3);
      }, 1600);
      timeoutsRef.current.push(t2);
    }, 2400);
    timeoutsRef.current.push(t1);
  };

  // Reset simulation
  const handleReset = () => {
    clearAllTimeouts();
    if (callTimerRef.current) clearInterval(callTimerRef.current);
    setIsPlaying(false);
    setActiveStep(null);
    setCallCount(1);
    setClientState('IDLE');
    setServerState('LISTENING');
    setEStopEngaged(true);
    setCurrentPktStage('idle');
  };

  // Auto demonstration loop (cycles every 8.5 seconds)
  useEffect(() => {
    if (isPlaying && activeStep === null) {
      callTimerRef.current = setInterval(() => {
        triggerServiceCall();
      }, 8500);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [isPlaying, activeStep, currentPktStage]);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // Guided Steps Content
  const guidedSteps = [
    {
      num: 1,
      title: "1. Client Initiates Request (Client ➔ Server)",
      desc: "The Client node invokes client.call_async(SetBool.Request(data=True)). A blue request packet departs the Client and travels across the DDS bus. The Client creates a non-blocking Future object and waits.",
      target: 'client'
    },
    {
      num: 2,
      title: "2. DDS Direct 1-to-1 Point-to-Point Transport",
      desc: "Unlike Topics which broadcast anonymously to any number of subscribers, Services use point-to-point unicast addressing directly to the single server registered for '/amr/emergency_stop'.",
      target: 'pipeline'
    },
    {
      num: 3,
      title: "3. Server Executes Callback (cb_emergency_stop)",
      desc: "The Server receives (request, response). It executes hardware actuation (toggling physical motor brake relays) and assigns the response payload: response.success = True and response.message = 'Brakes Engaged'.",
      target: 'server'
    },
    {
      num: 4,
      title: "4. Response Returned & Future Resolved (Server ➔ Client)",
      desc: "The Server dispatches the green response packet back to the Client. When the Client receives the response, its Future is marked resolved and triggers the done_callback.",
      target: 'all'
    }
  ];

  return (
    <div className="pubsub-flow-container">
      {/* Header Bar */}
      <div className="pubsub-flow-header">
        <div className="header-title-row">
          <div className="badge-pill">
            <Radio size={14} className="text-cyan animate-pulse" />
            <span>Interactive Service Architecture: 2-Way Request ➔ Response (RPC)</span>
          </div>
          <span className="ros-version-tag">std_srvs/srv/SetBool · 1-to-1 Unicast</span>
        </div>
        <p className="pubsub-flow-subtitle">
          Watch the slow-motion bidirectional packet flight: <strong>Request</strong> glides from Client to Server, the Server processes the callback, and the <strong>Response</strong> glides from Server back to Client.
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
            onClick={() => { setActiveStep(null); setIsPlaying(false); setCurrentPktStage('idle'); }}
          >
            All Live
          </button>
          {guidedSteps.map((s) => (
            <button
              key={s.num}
              className={`walkthrough-step-btn ${activeStep === s.num ? 'active' : ''}`}
              onClick={() => {
                setActiveStep(s.num);
                setIsPlaying(false);
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
        {/* Left Column: Service Client Node */}
        <div 
          className={`diagram-card client-card ${
            clientState === 'SENDING' || clientState === 'WAITING' ? 'pulse-border' : ''
          } ${activeStep === 1 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'}`}
        >
          <div className="card-top">
            <div className="node-icon-wrapper pub-icon">
              <Terminal size={18} />
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">SERVICE CLIENT (Caller)</div>
              <h3 className="node-name" title="/teleop_safety_client">teleop_safety_client</h3>
              <div className="node-class">EmergencyStopClient</div>
            </div>
            <div className={`status-dot ${clientState !== 'IDLE' ? 'online' : 'paused'}`} title={clientState} />
          </div>

          <div className="card-code-snip">
            <span className="code-fn">future = client.call_async</span>
            <span className="code-args">(SetBool.Request(data=True))</span>
          </div>

          <div className="card-telemetry pub-telemetry">
            <div className="telemetry-item">
              <span className="telemetry-label">Calls</span>
              <span className="telemetry-val text-cyan">#{callCount}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Client Future</span>
              <span className={`telemetry-val ${clientState === 'WAITING' ? 'text-amber animate-pulse' : clientState === 'RESOLVED' ? 'text-green' : 'text-muted'}`}>
                {clientState === 'WAITING' ? '⏳ PENDING' : clientState === 'RESOLVED' ? '✅ RESOLVED' : 'IDLE'}
              </span>
            </div>
            <div className="telemetry-item cb-telemetry-item">
              <span className="telemetry-label">Callback</span>
              <span className="telemetry-val text-purple cb-name">done_cb</span>
            </div>
          </div>

          <button 
            className="card-action-btn"
            onClick={triggerServiceCall}
            disabled={currentPktStage !== 'idle' && currentPktStage !== 'completed'}
            title="Dispatch 1 Service Request to Server"
          >
            <Send size={13} />
            <span>Send Request (data={eStopEngaged ? 'False' : 'True'})</span>
          </button>
        </div>

        {/* Center Column: 2-Way DDS Service Pipeline */}
        <div 
          className={`diagram-pipeline ${
            activeStep === 2 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'
          }`}
        >
          <div className="topic-badge">
            <Radio size={14} className="text-cyan animate-pulse" />
            <span className="topic-name">Service Bus: <strong>/amr/emergency_stop</strong></span>
            <span className="topic-type">SetBool.srv</span>
          </div>

          {/* Lane 1: Client ➔ Server REQUEST Flight Track (Left to Right) */}
          <div className="service-lane request-lane">
            <div className="lane-header-row">
              <span className="lane-dir-badge req-badge">
                <ArrowRight size={12} /> 1. REQUEST (Client ➔ Server)
              </span>
              <span className="lane-payload-preview">data: {eStopEngaged ? 'False' : 'True'}</span>
            </div>
            <div className="service-flight-track">
              <div className="track-rail">
                <div className="flow-chevrons flow-right">› › › › › › › › › › › › › › › › › › › ›</div>
              </div>
              {currentPktStage === 'req_in_flight' && (
                <div className="sliding-service-packet slide-c2s">
                  <span className="service-packet-pill req-pill">
                    <Zap size={11} className="text-amber" />
                    <span>SetBool_Request(data={eStopEngaged ? 'False' : 'True'})</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Center Server Execution & Processing Box */}
          <div className={`service-execution-box ${currentPktStage === 'server_computing' ? 'active-processing' : ''}`}>
            <div className="exec-box-content">
              {currentPktStage === 'server_computing' ? (
                <>
                  <Cpu size={16} className="text-cyan animate-spin" />
                  <span className="exec-text text-cyan">
                    Server Executing: <code>cb_emergency_stop()</code> ➔ Toggling Motor Relays & Populating Response...
                  </span>
                </>
              ) : currentPktStage === 'completed' ? (
                <>
                  <CheckCircle2 size={16} className="text-green" />
                  <span className="exec-text text-green">
                    RPC Completed Successfully · Response Delivered & Future Resolved
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} className="text-muted" />
                  <span className="exec-text text-muted">
                    1-to-1 Bidirectional RPC Channel Ready · Awaiting Request
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Lane 2: Server ➔ Client RESPONSE Flight Track (Right to Left) */}
          <div className="service-lane response-lane">
            <div className="lane-header-row">
              <span className="lane-dir-badge res-badge">
                <ArrowLeft size={12} /> 2. RESPONSE (Server ➔ Client)
              </span>
              <span className="lane-payload-preview">success: True</span>
            </div>
            <div className="service-flight-track">
              <div className="track-rail">
                <div className="flow-chevrons flow-left">‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹</div>
              </div>
              {currentPktStage === 'res_in_flight' && (
                <div className="sliding-service-packet slide-s2c">
                  <span className="service-packet-pill res-pill">
                    <CheckCircle2 size={11} className="text-green" />
                    <span>SetBool_Response(success=True, msg="{eStopEngaged ? 'Brakes Engaged' : 'Motors Ready'}")</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* DDS Metadata Strip */}
          <div className="qos-badge-strip">
            <span className="qos-chip">Interface: std_srvs/srv/SetBool</span>
            <span className="qos-chip">Type: 1-to-1 Unicast RPC</span>
            <span className="qos-chip">Flight Speed: 2.4s (Readable Mode)</span>
          </div>
        </div>

        {/* Right Column: Service Server Node */}
        <div 
          className={`diagram-card server-card ${
            serverState === 'PROCESSING' ? 'pulse-border' : ''
          } ${activeStep === 3 || activeStep === 4 || activeStep === null ? 'focused' : 'dimmed'}`}
        >
          <div className="card-top">
            <div className="node-icon-wrapper sub-icon">
              <Cpu size={18} />
            </div>
            <div className="node-title-group">
              <div className="node-role-tag">SERVICE SERVER (Provider)</div>
              <h3 className="node-name" title="/emergency_stop_server">emergency_stop_server</h3>
              <div className="node-class">EmergencyStopServer</div>
            </div>
            <div className={`status-dot ${serverState !== 'LISTENING' ? 'online' : 'active'}`} title={serverState} />
          </div>

          <div className="card-code-snip">
            <span className="code-fn">def cb_emergency_stop</span>
            <span className="code-args">(self, request, response):</span>
          </div>

          <div className="card-telemetry sub-telemetry">
            <div className="telemetry-item">
              <span className="telemetry-label">Hardware State</span>
              <span className="telemetry-val" style={{ color: eStopEngaged ? '#ef4444' : '#10b981' }}>
                {eStopEngaged ? '🛑 ENGAGED' : '⚡ ARMED'}
              </span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Server State</span>
              <span className={`telemetry-val ${serverState === 'PROCESSING' ? 'text-amber animate-pulse' : 'text-green'}`}>
                {serverState}
              </span>
            </div>
            <div className="telemetry-item cb-telemetry-item">
              <span className="telemetry-label">Handler</span>
              <span className="telemetry-val text-cyan cb-name">cb_e_stop</span>
            </div>
          </div>

          <div className="card-terminal-log">
            <div className="log-header">
              <Activity size={12} className="text-green" />
              <span>Actuator Hardware Relay Status</span>
            </div>
            <div className="log-content-wrap">
              <span className={`log-level-pill ${eStopEngaged ? 'log-level-error' : ''}`}>
                {eStopEngaged ? '[LOCKED]' : '[ARMED]'}
              </span>
              <span className="log-text">
                {eStopEngaged 
                  ? 'Brakes Locked (PWM 0%). AMR Stopped.' 
                  : 'Differential Drive Motors Enabled (PWM Active).'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="pubsub-controls-bar" style={{ marginTop: '1.25rem' }}>
        <div className="controls-left">
          <button
            className={`control-btn play-btn ${isPlaying ? 'active-playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause auto RPC demonstration' : 'Start auto RPC demonstration'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? 'Pause Auto Demo' : 'Auto Demo (Every 8s)'}</span>
          </button>

          <button
            className="control-btn"
            onClick={triggerServiceCall}
            disabled={currentPktStage !== 'idle' && currentPktStage !== 'completed'}
            title="Execute one isolated Request-Response transaction"
          >
            <Send size={15} />
            <span>Call Service (1 RPC)</span>
          </button>

          <button
            className="control-btn"
            onClick={handleReset}
            title="Reset simulation state"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Educational Concept Comparison Box */}
      <div className="service-concept-summary">
        <div className="concept-card">
          <div className="concept-icon req-icon">
            <Send size={16} />
          </div>
          <div className="concept-text">
            <strong>1. Request & Client Future (Client ➔ Server)</strong>
            <p>The client creates a Request and calls <code className="inline-code">call_async()</code>. The packet dispatches to the server. The client holds a Future object and never freezes its main event loop.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon srv-icon">
            <Cpu size={16} />
          </div>
          <div className="concept-text">
            <strong>2. Server Callback Execution (Provider)</strong>
            <p>The server receives <code className="inline-code">(request, response)</code>, toggles hardware relays, and fills in <code className="inline-code">response.success = True</code> before sending the response back.</p>
          </div>
        </div>

        <div className="concept-card">
          <div className="concept-icon res-icon">
            <CheckCircle2 size={16} />
          </div>
          <div className="concept-text">
            <strong>3. Response Delivery (Server ➔ Client)</strong>
            <p>The response returns back to the calling client. The client's Future resolves, unlocking any dependent robot state machines or logging.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
