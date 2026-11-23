import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Navigation } from 'lucide-react';

const DWA_STEPS = [
  {
    step: 0,
    title: 'Dynamic Window Approach (DWA): Overview',
    subtitle: 'Real-time velocity generation and forward trajectory rollout within acceleration limits.',
    points: [
      'AMRs cannot instantly change speeds due to motor inertia and wheel slip.',
      'DWA samples achievable velocities within a dynamic acceleration window.',
      'Simulates forward trajectories, rejects collisions, and scores the best candidate.'
    ],
    explanation: 'DWA operates directly in the velocity space (v, ω). It guarantees kinematic feasibility by constraining search to velocities reachable within one timestep.'
  },
  {
    step: 1,
    title: 'Step 1: Velocity Space Sampling & Dynamic Window',
    subtitle: 'Sampling candidate pairs (v, ω) bounded by physical motor limits and acceleration.',
    points: [
      'Physical Limits: v ∈ [0, v_max], ω ∈ [-ω_max, ω_max].',
      'Dynamic Window: v ∈ [v_curr - a_max·dt, v_curr + a_max·dt].',
      'Search Lattice: Discretizes window into N_v × N_ω velocity candidate pairs.'
    ],
    explanation: 'The Dynamic Window restricts search to velocities the robot can physically achieve within the next control interval dt (e.g. 50 ms at 20 Hz).'
  },
  {
    step: 2,
    title: 'Step 2: Forward Numerical Trajectory Simulation',
    subtitle: 'Predicting where the AMR will travel for sim_time (1.5 - 2.5s) for each candidate (v, ω).',
    points: [
      'Numerical Integration: Trajectories form circular arcs in 2D space.',
      'Temporal Horizon: Simulates robot footprint motion over sim_time = 2.0 s.',
      'Footprint Collision Check: Swept footprint checked against Local Costmap 2D.'
    ],
    explanation: 'For every candidate velocity pair, the controller rolls out an arc. Any candidate whose swept footprint intersects a lethal obstacle cell is instantly discarded!'
  },
  {
    step: 3,
    title: 'Step 3: Multi-Objective Critic Scoring & Execution',
    subtitle: 'Objective Function: G(v, ω) = α·heading + β·dist + γ·velocity.',
    points: [
      'Heading Critic (α): Rewards trajectories whose endpoint points toward global plan.',
      'Clearance Critic (β): Rewards distance from obstacles on local costmap.',
      'Velocity Critic (γ): Rewards forward speed to maintain warehouse throughput.',
      'Execution: Highest scoring pair (v*, ω*) is published to /cmd_vel at 20 Hz!'
    ],
    explanation: 'The trajectory with the highest composite score is selected. Nav2 streams the winning velocity command to motor controllers, repeating the cycle every 50 milliseconds!'
  }
];

export function DwaLocalPlannerInteractive() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = DWA_STEPS[currentStepIndex];

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < DWA_STEPS.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = (e) => {
    e && e.stopPropagation();
    if (currentStepIndex < DWA_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = (e) => {
    e && e.stopPropagation();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = (e) => {
    e && e.stopPropagation();
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const togglePlay = (e) => {
    e && e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  const rx = 100;
  const ry = 180;

  return (
    <div 
      className="dwa-interactive-deck"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '0.45rem 0.65rem',
        boxSizing: 'border-box',
        gap: '0.4rem',
        background: 'var(--bg-card, #0f172a)',
        borderRadius: '10px',
        border: '1px solid var(--border-color, #334155)',
        color: 'var(--text-primary, #f8fafc)'
      }}
    >
      {/* Top Header */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.4rem',
          borderBottom: '1px solid var(--border-color, #334155)',
          paddingBottom: '0.35rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span 
            style={{
              background: '#e11d48',
              color: '#fff',
              padding: '0.2rem 0.55rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Sparkles size={13} />
            Step {currentStepIndex} of {DWA_STEPS.length - 1}
          </span>
          <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>
            {step.title}
          </strong>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.25rem 0.55rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #475569',
              background: currentStepIndex === 0 ? '#1e293b' : '#334155',
              color: currentStepIndex === 0 ? '#64748b' : '#f8fafc',
              cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft size={14} /> Prev
          </button>

          <button
            onClick={togglePlay}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #e11d48',
              background: isPlaying ? '#be123c' : 'rgba(225, 29, 72, 0.2)',
              color: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === DWA_STEPS.length - 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.25rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #10b981',
              background: currentStepIndex === DWA_STEPS.length - 1 ? '#1e293b' : '#059669',
              color: currentStepIndex === DWA_STEPS.length - 1 ? '#64748b' : '#f8fafc',
              cursor: currentStepIndex === DWA_STEPS.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Next Step <ChevronRight size={14} />
          </button>

          <button
            onClick={handleReset}
            title="Reset to Step 0"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem 0.4rem',
              fontSize: '0.72rem',
              borderRadius: '6px',
              border: '1px solid #475569',
              background: '#1e293b',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main Dual Stage */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '0.95fr 1.45fr',
          gap: '0.55rem',
          flex: 1,
          minHeight: 0
        }}
      >
        {/* Left Column: Interactive Step Selector */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.35rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {DWA_STEPS.map((s, idx) => {
              const isActive = currentStepIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  style={{
                    padding: '0.28rem 0.5rem',
                    borderRadius: '6px',
                    border: isActive ? '1px solid #e11d48' : '1px solid #334155',
                    background: isActive ? 'rgba(225, 29, 72, 0.18)' : 'rgba(15, 23, 42, 0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span 
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: isActive ? '#e11d48' : '#334155',
                      color: '#fff',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {idx}
                  </span>
                  <span style={{ fontSize: '0.71rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#fda4af' : '#cbd5e1' }}>
                    {s.title.replace(/^Step \d+: /, '')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Points Card */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(225, 29, 72, 0.3)',
              borderRadius: '8px',
              padding: '0.45rem 0.6rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#fb7185', marginBottom: '0.3rem' }}>
              Execution Pipeline
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.71rem', lineHeight: 1.4, color: '#e2e8f0' }}>
              {step.points.map((pt, pidx) => (
                <li key={pidx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Big Animated Canvas View */}
        <div 
          onClick={handleNext}
          title="Click canvas to advance step"
          style={{
            position: 'relative',
            background: 'rgba(2, 6, 23, 0.85)',
            border: '1px solid rgba(225, 29, 72, 0.35)',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: currentStepIndex < DWA_STEPS.length - 1 ? 'pointer' : 'default'
          }}
        >
          {/* Status Overlay */}
          <div 
            style={{
              position: 'absolute',
              top: '8px',
              left: '10px',
              fontSize: '0.68rem',
              color: '#94a3b8',
              display: 'flex',
              gap: '0.8rem',
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid #334155'
            }}
          >
            <span><strong style={{ color: '#10b981' }}>―</strong> Winning Rollout</span>
            <span><strong style={{ color: '#f59e0b' }}>―</strong> Evaluated Candidate</span>
            <span><strong style={{ color: '#ef4444' }}>✕</strong> Collision Pruned</span>
          </div>

          <svg viewBox="0 0 520 280" style={{ width: '100%', height: '100%', maxHeight: '260px' }}>
            {/* Warehouse Obstacle Ahead */}
            <rect x="270" y="70" width="70" height="90" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
            <text x="305" y="119" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Pallet</text>

            {/* Global Plan Line (Green Dashed) */}
            <path d="M 100 180 Q 220 180 340 190 Q 420 190 490 170" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
            <text x="450" y="160" fill="#38bdf8" fontSize="9" fontWeight="bold">Global Plan</text>

            {/* Step 1: Dynamic Window Velocity Lattice Box */}
            {currentStepIndex === 1 && (
              <g>
                <rect x="250" y="160" width="220" height="95" fill="rgba(15, 23, 42, 0.95)" stroke="#e11d48" strokeWidth="1.5" rx="6" />
                <text x="265" y="182" fill="#fb7185" fontSize="10.5" fontWeight="bold">Dynamic Window V_d [v, ω]</text>
                <text x="265" y="202" fill="#e2e8f0" fontSize="9.5" fontFamily="monospace">v ∈ [v_k - a·dt, v_k + a·dt]</text>
                <text x="265" y="220" fill="#e2e8f0" fontSize="9.5" fontFamily="monospace">ω ∈ [ω_k - α·dt, ω_k + α·dt]</text>
                <text x="265" y="238" fill="#34d399" fontSize="9.5" fontWeight="bold" fontFamily="monospace">Sample Grid: 20 × 40 = 800 pairs</text>
              </g>
            )}

            {/* Step 2 & 3: Forward Simulated Trajectory Arcs */}
            {currentStepIndex >= 2 && (
              <g>
                {/* Colliding Arcs (Red) */}
                <path d="M 100 180 Q 180 180 270 120" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="270" cy="120" r="5" fill="#ef4444" />
                <path d="M 100 180 Q 200 170 275 140" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                <circle cx="275" cy="140" r="5" fill="#ef4444" />

                {/* Sub-optimal Valid Arcs (Yellow/Amber) */}
                <path d="M 100 180 Q 160 210 240 240 Q 320 260 400 250" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6" />
                <path d="M 100 180 Q 180 200 270 210 Q 350 215 430 205" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6" />
                <path d="M 100 180 Q 190 120 230 60 Q 280 30 350 40" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6" />

                {/* Optimal Winning Trajectory (Bright Green) */}
                <path d="M 100 180 Q 190 185 280 195 Q 360 200 450 185" fill="none" stroke="#10b981" strokeWidth="3.5" />
                <circle cx="450" cy="185" r="5" fill="#10b981" stroke="#a7f3d0" strokeWidth="1.5" />

                {/* Winner Score Card in Step 3 */}
                {currentStepIndex === 3 && (
                  <g>
                    <rect x="290" y="10" width="210" height="80" fill="rgba(15, 23, 42, 0.95)" stroke="#10b981" strokeWidth="1.5" rx="6" />
                    <text x="305" y="30" fill="#34d399" fontSize="10.5" fontWeight="bold">Best Candidate (v*, ω*)</text>
                    <text x="305" y="48" fill="#e2e8f0" fontSize="9" fontFamily="monospace">v* = 0.52 m/s, ω* = -0.14 rad/s</text>
                    <text x="305" y="64" fill="#fbbf24" fontSize="9" fontFamily="monospace">Score G(v, ω) = 94.6 (Max)</text>
                    <text x="305" y="78" fill="#38bdf8" fontSize="8.5" fontWeight="bold">Published: /cmd_vel @ 20 Hz</text>
                  </g>
                )}
              </g>
            )}

            {/* AMR Robot Base */}
            <g transform={`translate(${rx}, ${ry})`}>
              <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
              <polygon points="0,-11 5,5 -5,5" fill="#f8fafc" />
              <circle cx="0" cy="0" r="3" fill="#ef4444" />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Explanation Banner */}
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderLeft: '3px solid #e11d48',
          padding: '0.35rem 0.6rem',
          borderRadius: '4px',
          fontSize: '0.72rem',
          lineHeight: 1.35,
          color: '#e2e8f0'
        }}
      >
        <span style={{ color: '#fb7185', fontWeight: 700, marginRight: '0.35rem' }}>
          💡 Step Mechanics:
        </span>
        {step.explanation}
      </div>
    </div>
  );
}

export default DwaLocalPlannerInteractive;
