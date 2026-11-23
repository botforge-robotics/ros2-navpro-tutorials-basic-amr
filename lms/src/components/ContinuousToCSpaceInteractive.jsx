import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const CSPACE_STEPS = [
  {
    step: 0,
    title: 'Continuous Space to Configuration Space (C-Space)',
    subtitle: 'From complex polygon collision checking to simple point-mass navigation in C_free.',
    points: [
      'Real-world workspace W is continuous with infinite resolution.',
      'AMRs have physical geometry, length, width, and non-zero footprints.',
      'C-Space transforms obstacles so the robot can be treated as a dimensionless point!'
    ],
    explanation: 'To avoid evaluating complex polygon-polygon intersection tests at every millisecond, path planning maps the robot footprint into Configuration Space.'
  },
  {
    step: 1,
    title: 'Step 1: Continuous 2D Plane & Goal Waypoint',
    subtitle: 'Defining the continuous Euclidean plane ℝ² and destination coordinates.',
    points: [
      'Workspace W ⊂ ℝ² contains continuous Cartesian coordinates (x, y).',
      'The robot must plan from Start pose q_s to Goal waypoint q_g.',
      'In pure continuous space without obstacles, any straight line is valid.'
    ],
    explanation: 'Before adding obstacles, the continuous plane has infinite potential paths between start and goal.'
  },
  {
    step: 2,
    title: 'Step 2: Obstacle Boundaries & Swept AMR Footprint',
    subtitle: 'The robot is not a point mass; it sweeps a continuous 2D area along its motion path.',
    points: [
      'Obstacles W_obs partition the continuous workspace into free and blocked zones.',
      'As the AMR translates, its rectangular chassis sweeps an area: Swept(τ) = ⋃_t A(q(t)).',
      'A path is only valid if Swept(τ) ∩ W_obs = ∅ throughout the entire trajectory.'
    ],
    explanation: 'A path whose centerline looks clear might still cause a collision if the AMR chassis perimeter intersects obstacles.'
  },
  {
    step: 3,
    title: 'Step 3: Clearance Failure & Chassis Collision',
    subtitle: 'Physical chassis corners collide when corridor width is narrower than AMR footprint.',
    points: [
      'Centerline Clearance: Center point (x, y) stays clear of obstacle.',
      'Chassis Collision: Outer edge touches obstacle boundary because lateral clearance < R.',
      'Real-World Result: Bumper sensor trip, emergency e-stop, or racking damage.'
    ],
    explanation: 'Collisions occur whenever the distance from path centerline to obstacle boundary is less than the robot chassis radius R.'
  },
  {
    step: 4,
    title: 'Step 4: Distance Clearance Condition (dist > R_robot)',
    subtitle: 'Enforcing safety clearance: every path point must maintain dist(p, ∂W_obs) > R.',
    points: [
      'Safety Corridor: Candidate path must maintain lateral clearance > R_robot at all points.',
      'Allowable Path: Paths passing through narrow gaps (< 2R) are strictly pruned.',
      'Evaluation Complexity: Computing distance from arbitrary curves to polygons is slow.'
    ],
    explanation: 'Checking distance to every obstacle polygon vertex along continuous curves is computationally expensive in real-time navigation.'
  },
  {
    step: 5,
    title: 'Step 5: Obstacle Inflation by Robot Radius (Minkowski Sum)',
    subtitle: 'Inflating all obstacle boundaries outward by robot circumscribed radius R.',
    points: [
      'Minkowski Sum: W_obs ⊕ A grows obstacles outward uniformly by robot radius R.',
      'AMR Point Transformation: The robot is shrunk to an infinitesimal 0-radius point!',
      'Fast Search: Pathfinding simplifies to finding a 1D line that avoids inflated boundaries.'
    ],
    explanation: 'By growing obstacles outward by R, the robot chassis collapses into a single 0-radius point particle! This is the mathematical breakthrough of Configuration Space.'
  },
  {
    step: 6,
    title: 'Step 6: Dimensionless Point AMR Navigating C_free vs. C_obs',
    subtitle: 'The complete C-Space manifold: C = C_free ∪ C_obs.',
    points: [
      'C_free: Set of all collision-free configurations where the point AMR can safely exist.',
      'C_obs: Forbidden inflated obstacle space where point AMR cannot enter.',
      'Nav2 Costmap: The 2D Costmap directly implements this C-Space model with inflation layers!'
    ],
    explanation: 'The point AMR can now safely navigate along any curve in C_free. Because obstacles were pre-inflated, the real physical robot is guaranteed never to collide!'
  }
];

export function ContinuousToCSpaceInteractive() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = CSPACE_STEPS[currentStepIndex];

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < CSPACE_STEPS.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = (e) => {
    e && e.stopPropagation();
    if (currentStepIndex < CSPACE_STEPS.length - 1) {
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

  return (
    <div 
      className="cspace-interactive-deck"
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
              background: '#0284c7',
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
            Step {currentStepIndex} of {CSPACE_STEPS.length - 1}
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
              border: '1px solid #0284c7',
              background: isPlaying ? '#0369a1' : 'rgba(2, 132, 199, 0.2)',
              color: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === CSPACE_STEPS.length - 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.25rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #10b981',
              background: currentStepIndex === CSPACE_STEPS.length - 1 ? '#1e293b' : '#059669',
              color: currentStepIndex === CSPACE_STEPS.length - 1 ? '#64748b' : '#f8fafc',
              cursor: currentStepIndex === CSPACE_STEPS.length - 1 ? 'not-allowed' : 'pointer'
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
            {CSPACE_STEPS.map((s, idx) => {
              const isActive = currentStepIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    border: isActive ? '1px solid #0284c7' : '1px solid #334155',
                    background: isActive ? 'rgba(2, 132, 199, 0.18)' : 'rgba(15, 23, 42, 0.5)',
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
                      background: isActive ? '#0284c7' : '#334155',
                      color: isActive ? '#fff' : '#94a3b8',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {idx}
                  </span>
                  <span style={{ fontSize: '0.71rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#7dd3fc' : '#cbd5e1' }}>
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
              border: '1px solid rgba(2, 132, 199, 0.3)',
              borderRadius: '8px',
              padding: '0.45rem 0.6rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.3rem' }}>
              Mathematical Breakdown
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
            border: '1px solid rgba(2, 132, 199, 0.35)',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: currentStepIndex < CSPACE_STEPS.length - 1 ? 'pointer' : 'default'
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
            <span><strong style={{ color: '#0284c7' }}>●</strong> Start (q_s)</span>
            <span><strong style={{ color: '#10b981' }}>★</strong> Goal (q_g)</span>
            {currentStepIndex >= 5 && <span><strong style={{ color: '#f59e0b' }}>◌</strong> Inflated Boundary</span>}
          </div>

          <svg viewBox="0 0 520 280" style={{ width: '100%', height: '100%', maxHeight: '260px' }}>
            {/* Start and Goal Poses */}
            <circle cx="60" cy="140" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="144" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">S</text>

            <circle cx="460" cy="140" r="12" fill="#059669" stroke="#34d399" strokeWidth="2" />
            <text x="460" y="144" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">G</text>

            {/* Obstacles (Polygon / Box) */}
            {currentStepIndex >= 2 && (
              <g>
                {/* Upper Obstacle */}
                <rect x="200" y="40" width="110" height="70" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
                <text x="255" y="80" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">W_obs 1</text>

                {/* Lower Obstacle */}
                <rect x="200" y="170" width="110" height="70" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
                <text x="255" y="210" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">W_obs 2</text>

                {/* Inflated Boundary (Steps 5 & 6) */}
                {currentStepIndex >= 5 && (
                  <g stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" fill="rgba(245, 158, 11, 0.12)">
                    <rect x="180" y="20" width="150" height="110" rx="18" />
                    <rect x="180" y="150" width="150" height="110" rx="18" />
                  </g>
                )}
              </g>
            )}

            {/* Step 1: Straight line in continuous free space */}
            {currentStepIndex === 1 && (
              <line x1="72" y1="140" x2="448" y2="140" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,3" />
            )}

            {/* Step 2: Swept Footprint Trajectory */}
            {currentStepIndex === 2 && (
              <g>
                {/* Swept corridor volume */}
                <path d="M 60 120 L 255 120 L 460 120 L 460 160 L 255 160 L 60 160 Z" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                {/* AMR Rectangular Footprint moving */}
                <rect x="230" y="125" width="50" height="30" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="3" />
                <text x="255" y="144" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">AMR</text>
              </g>
            )}

            {/* Step 3: Chassis Collision */}
            {currentStepIndex === 3 && (
              <g>
                <path d="M 60 140 L 460 140" stroke="#ef4444" strokeWidth="2" />
                {/* AMR colliding with upper and lower obstacles */}
                <rect x="230" y="120" width="50" height="40" fill="#991b1b" stroke="#ef4444" strokeWidth="2" rx="3" />
                <circle cx="230" cy="120" r="8" fill="#ef4444" />
                <circle cx="280" cy="120" r="8" fill="#ef4444" />
                <circle cx="230" cy="160" r="8" fill="#ef4444" />
                <circle cx="280" cy="160" r="8" fill="#ef4444" />
                <text x="255" y="144" fill="#fee2e2" fontSize="9" fontWeight="bold" textAnchor="middle">COLLISION!</text>
              </g>
            )}

            {/* Step 4: Clearance Check Condition */}
            {currentStepIndex === 4 && (
              <g>
                <line x1="255" y1="110" x2="255" y2="140" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <text x="270" y="128" fill="#38bdf8" fontSize="10" fontWeight="bold">d &lt; R !</text>
                <line x1="255" y1="140" x2="255" y2="170" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="255" y="156" fill="#f87171" fontSize="9.5" fontWeight="bold" textAnchor="middle">Clearance Insufficient</text>
              </g>
            )}

            {/* Step 5 & 6: C-Space Point AMR and Clean Corridor */}
            {currentStepIndex >= 5 && (
              <g>
                {/* Point AMR trajectory */}
                <path d="M 72 140 L 160 140 Q 255 140 350 140 L 448 140" stroke="#10b981" strokeWidth="2.5" fill="none" />
                
                {/* Infinitesimal Point AMR (Radius = 0) */}
                <circle cx="255" cy="140" r="6" fill="#10b981" stroke="#a7f3d0" strokeWidth="2" />
                <circle cx="255" cy="140" r="14" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                <text x="255" y="130" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Point AMR in C_free</text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Bottom Explanation Banner */}
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderLeft: '3px solid #0284c7',
          padding: '0.35rem 0.6rem',
          borderRadius: '4px',
          fontSize: '0.72rem',
          lineHeight: 1.35,
          color: '#e2e8f0'
        }}
      >
        <span style={{ color: '#38bdf8', fontWeight: 700, marginRight: '0.35rem' }}>
          💡 Step Mechanics:
        </span>
        {step.explanation}
      </div>
    </div>
  );
}

export default ContinuousToCSpaceInteractive;
