import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Navigation } from 'lucide-react';

const AMCL_STEPS = [
  {
    step: 0,
    title: 'AMCL Overview: Particle Cloud Pose Estimation',
    subtitle: 'Monte Carlo Localization represents robot belief bel(x_t) as a probability distribution of particles.',
    points: [
      'Each particle is a complete pose hypothesis: (x, y, θ).',
      'The robot has an unknown initial location in the pre-mapped warehouse.',
      'Fusion of wheel odometry (motion) and 2D LiDAR (perception).'
    ],
    explanation: 'AMCL uses a recursive Bayes filter on a sample set of particles to estimate pose relative to a known 2D occupancy grid map.',
    particlesState: 'uniform'
  },
  {
    step: 1,
    title: 'Step 1: Global Uniform Particle Distribution',
    subtitle: 'Zero prior knowledge: particles are scattered uniformly across all valid free space.',
    points: [
      'Initial belief bel(x_0) has maximum entropy (infinite uncertainty).',
      'Thousands of particles cover the entire warehouse map uniformly.',
      'Every particle begins with equal normalized weight: w_i = 1 / N.'
    ],
    explanation: 'When starting with no initial pose estimate, particles cover all reachable corridors with random heading angles θ ∈ [0, 2π).',
    particlesState: 'uniform'
  },
  {
    step: 2,
    title: 'Step 2: Anatomy of the Particle State Vector',
    subtitle: 'Each individual particle represents an exact coordinate and likelihood weight.',
    points: [
      'State Vector: X_i = [x_i, y_i, θ_i]ᵀ in global map frame.',
      'Weight w_i: Represents confidence that particle matches sensor observations.',
      'Sum of all particle weights is strictly normalized: ∑ w_i = 1.0.'
    ],
    explanation: 'A particle is not just a point; it carries orientation and a scalar weight representing how well its simulated LiDAR rays match the actual LiDAR scan.',
    particlesState: 'anatomy'
  },
  {
    step: 3,
    title: 'Step 3: Motion Prediction & Sensor Measurement Update',
    subtitle: 'Odometry propagates particles forward; LiDAR raycasts calculate observation likelihood.',
    points: [
      'Prediction: Particles move by odometry Δx, Δy, Δθ plus Gaussian noise.',
      'Perception: Simulated LiDAR rays raycast from each particle against map.',
      'Weight Update: w_i ∝ p(z_t | x_i, m). Matching particles get high weight!'
    ],
    explanation: 'As the AMR drives, particles whose simulated wall distances match real LiDAR ranges receive high weights (glowing gold). Mismatched particles get near-zero weight.',
    particlesState: 'update'
  },
  {
    step: 4,
    title: 'Step 4: Importance Resampling & Pose Convergence',
    subtitle: 'Survival of the fittest: low-weight particles die; high-weight particles duplicate.',
    points: [
      'Resampling: Low-weight particles are eliminated (culled).',
      'High-weight particles are duplicated in proportion to their weight w_i.',
      'Convergence: Cloud collapses into a tight cluster around true robot pose!'
    ],
    explanation: 'Through successive motion and observation cycles, particle variance shrinks. The weighted mean of the cluster yields the final localization pose (x, y, θ) for Nav2!',
    particlesState: 'converged'
  }
];

// Generate deterministic particle sets
const GENERATED_UNIFORM = [
  { x: 50, y: 50, a: 30, w: 0.2 }, { x: 80, y: 70, a: 90, w: 0.2 }, { x: 120, y: 50, a: 180, w: 0.2 },
  { x: 160, y: 80, a: 240, w: 0.2 }, { x: 200, y: 55, a: 45, w: 0.2 }, { x: 250, y: 65, a: 110, w: 0.2 },
  { x: 300, y: 50, a: 0, w: 0.2 }, { x: 350, y: 75, a: 300, w: 0.2 }, { x: 400, y: 60, a: 135, w: 0.2 },
  { x: 450, y: 70, a: 210, w: 0.2 }, { x: 60, y: 150, a: 80, w: 0.2 }, { x: 100, y: 170, a: 15, w: 0.2 },
  { x: 150, y: 140, a: 270, w: 0.2 }, { x: 210, y: 165, a: 190, w: 0.2 }, { x: 270, y: 150, a: 40, w: 0.2 },
  { x: 320, y: 160, a: 320, w: 0.2 }, { x: 380, y: 145, a: 120, w: 0.2 }, { x: 440, y: 165, a: 90, w: 0.2 },
  { x: 50, y: 220, a: 330, w: 0.2 }, { x: 110, y: 235, a: 60, w: 0.2 }, { x: 180, y: 215, a: 150, w: 0.2 },
  { x: 240, y: 230, a: 220, w: 0.2 }, { x: 300, y: 225, a: 45, w: 0.2 }, { x: 360, y: 220, a: 180, w: 0.2 },
  { x: 420, y: 235, a: 290, w: 0.2 }, { x: 460, y: 210, a: 75, w: 0.2 }
];

export function AmclParticleFilterInteractive() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = AMCL_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < AMCL_STEPS.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = (e) => {
    e && e.stopPropagation();
    if (currentStepIndex < AMCL_STEPS.length - 1) {
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

  // Robot true location
  const robotX = 320;
  const robotY = 160;
  const robotHeading = 35; // degrees

  return (
    <div 
      className="amcl-interactive-deck"
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
      {/* Top Controls Bar */}
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
              background: '#eab308',
              color: '#000',
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
            Step {currentStepIndex} of {AMCL_STEPS.length - 1}
          </span>
          <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>
            {step.title}
          </strong>
        </div>

        {/* Action Buttons */}
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
              border: '1px solid #eab308',
              background: isPlaying ? '#ca8a04' : 'rgba(234, 179, 8, 0.2)',
              color: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === AMCL_STEPS.length - 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.25rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #10b981',
              background: currentStepIndex === AMCL_STEPS.length - 1 ? '#1e293b' : '#059669',
              color: currentStepIndex === AMCL_STEPS.length - 1 ? '#64748b' : '#f8fafc',
              cursor: currentStepIndex === AMCL_STEPS.length - 1 ? 'not-allowed' : 'pointer'
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

      {/* Main Dual Stage: Step Points on Left, Big Visual Canvas on Right */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '0.95fr 1.45fr',
          gap: '0.55rem',
          flex: 1,
          minHeight: 0
        }}
      >
        {/* Left Column: Interactive Step Selector & Bullet Points */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.35rem'
          }}
        >
          {/* Step Selector List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {AMCL_STEPS.map((s, idx) => {
              const isActive = currentStepIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  style={{
                    padding: '0.3rem 0.5rem',
                    borderRadius: '6px',
                    border: isActive ? '1px solid #eab308' : '1px solid #334155',
                    background: isActive ? 'rgba(234, 179, 8, 0.15)' : 'rgba(15, 23, 42, 0.5)',
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
                      background: isActive ? '#eab308' : '#334155',
                      color: isActive ? '#000' : '#94a3b8',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {idx}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#fef08a' : '#cbd5e1' }}>
                    {s.title.replace(/^Step \d+: /, '')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Current Step Active Points Card */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              borderRadius: '8px',
              padding: '0.45rem 0.6rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#facc15', marginBottom: '0.3rem' }}>
              Mechanics &amp; Math
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.71rem', lineHeight: 1.4, color: '#e2e8f0' }}>
              {step.points.map((pt, pidx) => (
                <li key={pidx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Big Animated SVG Canvas View */}
        <div 
          onClick={handleNext}
          title="Click canvas to advance step"
          style={{
            position: 'relative',
            background: 'rgba(2, 6, 23, 0.85)',
            border: '1px solid rgba(234, 179, 8, 0.35)',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: currentStepIndex < AMCL_STEPS.length - 1 ? 'pointer' : 'default'
          }}
        >
          {/* Status Overlay Badge */}
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
            <span><strong style={{ color: '#06b6d4' }}>●</strong> AMR Real Pose</span>
            <span><strong style={{ color: '#eab308' }}>▲</strong> Particles (x, y, θ)</span>
            <span><strong style={{ color: '#10b981' }}>―</strong> LiDAR Beams</span>
          </div>

          <svg viewBox="0 0 520 280" style={{ width: '100%', height: '100%', maxHeight: '260px' }}>
            {/* Outer Warehouse Walls */}
            <rect x="20" y="20" width="480" height="240" fill="none" stroke="#475569" strokeWidth="4" rx="6" />

            {/* Warehouse Racking Obstacles */}
            <rect x="80" y="90" width="80" height="40" fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="4" />
            <text x="120" y="114" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Rack A</text>

            <rect x="220" y="80" width="50" height="60" fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="4" />
            <text x="245" y="114" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Rack B</text>

            <rect x="360" y="90" width="80" height="40" fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="4" />
            <text x="400" y="114" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Rack C</text>

            {/* Step 2 Anatomy Zoom Box */}
            {step.particlesState === 'anatomy' && (
              <g>
                <rect x="60" y="145" width="220" height="100" fill="rgba(15, 23, 42, 0.95)" stroke="#eab308" strokeWidth="2" rx="8" />
                <text x="75" y="168" fill="#facc15" fontSize="11" fontWeight="bold">Particle State Vector: X_i</text>
                <text x="75" y="190" fill="#f8fafc" fontSize="10" fontFamily="monospace">x_i : 318.4 mm</text>
                <text x="75" y="206" fill="#f8fafc" fontSize="10" fontFamily="monospace">y_i : 158.2 mm</text>
                <text x="75" y="222" fill="#f8fafc" fontSize="10" fontFamily="monospace">θ_i : 34.8°  (Heading)</text>
                <text x="75" y="238" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">w_i : 0.892 (Likelihood)</text>

                <circle cx="230" cy="195" r="14" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                <line x1="230" y1="195" x2="242" y2="185" stroke="#fef08a" strokeWidth="3" markerEnd="url(#arrow)" />
              </g>
            )}

            {/* LiDAR Raycast Beams from Robot in Update Step */}
            {(step.particlesState === 'update' || step.particlesState === 'converged') && (
              <g stroke="#10b981" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.65">
                <line x1={robotX} y1={robotY} x2={robotX + 160} y2={robotY - 80} />
                <line x1={robotX} y1={robotY} x2={robotX + 160} y2={robotY} />
                <line x1={robotX} y1={robotY} x2={robotX} y2={robotY + 100} />
                <line x1={robotX} y1={robotY} x2={robotX - 100} y2={robotY} />
                <line x1={robotX} y1={robotY} x2={robotX} y2={robotY - 140} />
              </g>
            )}

            {/* Particles Rendering based on State */}
            {step.particlesState === 'uniform' && (
              GENERATED_UNIFORM.map((p, idx) => (
                <g key={idx} transform={`translate(${p.x}, ${p.y}) rotate(${p.a})`}>
                  <polygon points="0,-7 5,7 -5,7" fill="#eab308" opacity="0.85" />
                </g>
              ))
            )}

            {step.particlesState === 'update' && (
              GENERATED_UNIFORM.map((p, idx) => {
                const distToReal = Math.hypot(p.x - robotX, p.y - robotY);
                const isHighWeight = distToReal < 90;
                return (
                  <g key={idx} transform={`translate(${p.x}, ${p.y}) rotate(${p.a})`}>
                    <polygon 
                      points="0,-8 6,8 -6,8" 
                      fill={isHighWeight ? '#22c55e' : '#eab308'} 
                      opacity={isHighWeight ? 1.0 : 0.25} 
                    />
                    {isHighWeight && <circle cx="0" cy="0" r="10" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />}
                  </g>
                );
              })
            )}

            {step.particlesState === 'converged' && (
              <g>
                {/* 30 tightly clustered particles around true pose */}
                {Array.from({ length: 28 }).map((_, idx) => {
                  const angle = idx * (360 / 28);
                  const radius = (idx % 4) * 4 + 2;
                  const px = robotX + Math.cos(angle * Math.PI / 180) * radius;
                  const py = robotY + Math.sin(angle * Math.PI / 180) * radius;
                  return (
                    <g key={idx} transform={`translate(${px}, ${py}) rotate(${robotHeading + (idx % 5 - 2) * 2})`}>
                      <polygon points="0,-7 4,7 -4,7" fill="#10b981" opacity="0.9" />
                    </g>
                  );
                })}
                <ellipse cx={robotX} cy={robotY} rx="22" ry="16" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x={robotX} y={robotY + 36} fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Converged Cloud: σ &lt; 0.02 m
                </text>
              </g>
            )}

            {/* True Robot AMR Position */}
            <g transform={`translate(${robotX}, ${robotY}) rotate(${robotHeading})`}>
              <circle cx="0" cy="0" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
              <polygon points="0,-12 6,6 -6,6" fill="#f8fafc" />
              <circle cx="0" cy="0" r="3" fill="#ef4444" />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Step Explanation Banner */}
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderLeft: '3px solid #eab308',
          padding: '0.35rem 0.6rem',
          borderRadius: '4px',
          fontSize: '0.72rem',
          lineHeight: 1.35,
          color: '#e2e8f0'
        }}
      >
        <span style={{ color: '#facc15', fontWeight: 700, marginRight: '0.35rem' }}>
          💡 Step Mechanics:
        </span>
        {step.explanation}
      </div>
    </div>
  );
}

export default AmclParticleFilterInteractive;
