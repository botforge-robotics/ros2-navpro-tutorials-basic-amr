import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Layers, Grid } from 'lucide-react';

const MAPPING_STEPS = [
  {
    step: 0,
    title: 'Occupancy Grid Mapping: The Discrete Matrix Model',
    subtitle: 'Transforming continuous physical warehouse terrain into a discrete probabilistic occupancy lattice.',
    points: [
      'The real physical world is continuous with infinite resolution.',
      'Robotics algorithms discretize space into a 2D grid matrix of cells.',
      'Each cell represents a patch of physical area with an occupancy probability.'
    ],
    explanation: 'Occupancy Grid Mapping (Elfes & Moravec) divides continuous 2D space into equal-sized spatial cells, where each cell stores the probability that an obstacle occupies it.'
  },
  {
    step: 1,
    title: 'Step 1: Continuous Space to 2D Grid Lattice Discretization',
    subtitle: 'Overlaying a uniform square grid mesh with resolution δ over the warehouse floor.',
    points: [
      'Discretization: Continuous plane ℝ² is sliced into cells of resolution δ (e.g. 0.05 m / 5 cm).',
      'Continuous metric pose (x, y) maps to integer cell index: i = ⌊x / δ⌋, j = ⌊y / δ⌋.',
      'Cell size controls the tradeoff between spatial accuracy and RAM/CPU usage.'
    ],
    explanation: 'A uniform Cartesian lattice is superimposed across the warehouse. Each cell covers a physical square of δ × δ meters (typically 5 cm per cell in standard Nav2 SLAM).'
  },
  {
    step: 2,
    title: 'Step 2: Binary States & Metric Quantization {0, 1}',
    subtitle: 'Every spatial cell is quantized into a binary state: Free or Occupied.',
    points: [
      'State 0 (Free Space): Traversable aisle space where AMR wheels and chassis can move.',
      'State 1 (Occupied Space): Solid physical obstacle (walls, racking legs, pallets).',
      'Unknown Space (-1 in ROS 2): Unexplored regions not yet penetrated by LiDAR rays.'
    ],
    explanation: 'In the idealized binary formulation, a cell m_i ∈ {0, 1} is either empty or occupied. Quantization eliminates continuous geometric equations in favor of fast matrix indexing.'
  },
  {
    step: 3,
    title: 'Step 3: The Full Warehouse Discretized Binary Matrix',
    subtitle: 'The entire facility is encoded as a high-density 2D matrix M ∈ {0, 1}^(W × H).',
    points: [
      'Matrix Dimensions: Width W = ⌊Warehouse_Length / δ⌋, Height H = ⌊Warehouse_Width / δ⌋.',
      'Memory Layout: Flattened into 1D row-major array: index = x_cell + (y_cell × W).',
      'OccupancyGrid ROS 2 message: nav_msgs/msg/OccupancyGrid published on topic /map.'
    ],
    explanation: 'The entire industrial facility becomes a 2D array of integers. This discrete grid is directly used by global A* search planners to find collision-free topological routes.'
  },
  {
    step: 4,
    title: 'Step 4: LiDAR Raycast Cone & Log-Odds Bayesian Updates',
    subtitle: 'Inverse sensor model updates cell probabilities using Bresenham line tracing.',
    points: [
      'Raycast Traversal: Cells traversed before reflection are updated as FREE (log-odds decrease).',
      'Impact Endpoint: Cell where the beam hits is updated as OCCUPIED (log-odds increase).',
      'Bayesian Log-Odds: l_t(m_i) = l_{t-1}(m_i) + inv_sensor(m_i, z_t) - l_0.'
    ],
    explanation: 'As LiDAR beams sweep outward, every ray marks traversed cells as free and endpoint cells as occupied. The recursive log-odds update filters out dynamic noise and transient sensor glitches!'
  }
];

export function OccupancyGridMappingInteractive() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = MAPPING_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < MAPPING_STEPS.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = (e) => {
    e && e.stopPropagation();
    if (currentStepIndex < MAPPING_STEPS.length - 1) {
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

  // Robot origin in SVG
  const rx = 160;
  const ry = 180;

  return (
    <div 
      className="occupancy-interactive-deck"
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
              background: '#38bdf8',
              color: '#0f172a',
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
            Step {currentStepIndex} of {MAPPING_STEPS.length - 1}
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
              border: '1px solid #38bdf8',
              background: isPlaying ? '#0284c7' : 'rgba(56, 189, 248, 0.2)',
              color: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === MAPPING_STEPS.length - 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.25rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #10b981',
              background: currentStepIndex === MAPPING_STEPS.length - 1 ? '#1e293b' : '#059669',
              color: currentStepIndex === MAPPING_STEPS.length - 1 ? '#64748b' : '#f8fafc',
              cursor: currentStepIndex === MAPPING_STEPS.length - 1 ? 'not-allowed' : 'pointer'
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
            {MAPPING_STEPS.map((s, idx) => {
              const isActive = currentStepIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  style={{
                    padding: '0.3rem 0.5rem',
                    borderRadius: '6px',
                    border: isActive ? '1px solid #38bdf8' : '1px solid #334155',
                    background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.5)',
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
                      background: isActive ? '#38bdf8' : '#334155',
                      color: isActive ? '#0f172a' : '#94a3b8',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {idx}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#e0f2fe' : '#cbd5e1' }}>
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
              border: '1px solid rgba(56, 189, 248, 0.3)',
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

        {/* Right Column: Big Animated SVG Canvas View */}
        <div 
          onClick={handleNext}
          title="Click canvas to advance step"
          style={{
            position: 'relative',
            background: 'rgba(2, 6, 23, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: currentStepIndex < MAPPING_STEPS.length - 1 ? 'pointer' : 'default'
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
            <span><strong style={{ color: '#0284c7' }}>■</strong> Free Cell (0)</span>
            <span><strong style={{ color: '#ef4444' }}>■</strong> Occupied (1)</span>
            <span><strong style={{ color: '#10b981' }}>―</strong> LiDAR Raycast</span>
          </div>

          <svg viewBox="0 0 520 280" style={{ width: '100%', height: '100%', maxHeight: '260px' }}>
            <defs>
              {/* Pattern for Grid Discretization */}
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="0.8" />
              </pattern>
            </defs>

            {/* Warehouse Boundaries */}
            <rect x="20" y="20" width="480" height="240" fill="none" stroke="#475569" strokeWidth="4" rx="6" />

            {/* Grid Overlay for Discretization (Steps 1, 2, 3, 4) */}
            {currentStepIndex >= 1 && (
              <rect x="20" y="20" width="480" height="240" fill="url(#gridPattern)" />
            )}

            {/* Obstacles (Racks/Walls) */}
            <rect x="80" y="60" width="80" height="40" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
            <text x="120" y="84" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Obstacle A</text>

            <rect x="340" y="70" width="100" height="50" fill="#334155" stroke="#64748b" strokeWidth="2" rx="4" />
            <text x="390" y="99" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Obstacle B</text>

            {/* Step 2 Binary Quantization Highlight */}
            {currentStepIndex === 2 && (
              <g>
                <rect x="280" y="140" width="200" height="100" fill="rgba(15, 23, 42, 0.95)" stroke="#38bdf8" strokeWidth="2" rx="6" />
                <text x="295" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">Metric Quantization: m_i</text>
                
                <rect x="295" y="178" width="18" height="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="320" y="192" fill="#e2e8f0" fontSize="10">Cell State 0: Free (p=0.0)</text>

                <rect x="295" y="205" width="18" height="18" fill="#ef4444" stroke="#f87171" strokeWidth="1" />
                <text x="320" y="219" fill="#fca5a5" fontSize="10">Cell State 1: Occupied (p=1.0)</text>
              </g>
            )}

            {/* Step 3 Full Matrix Cells Visualization */}
            {currentStepIndex === 3 && (
              <g>
                {/* Visual matrix snippet */}
                <g opacity="0.85">
                  <rect x="80" y="60" width="80" height="40" fill="#ef4444" opacity="0.75" />
                  <rect x="340" y="70" width="100" height="50" fill="#ef4444" opacity="0.75" />
                </g>
                <rect x="60" y="130" width="240" height="110" fill="rgba(15, 23, 42, 0.95)" stroke="#06b6d4" strokeWidth="1.5" rx="6" />
                <text x="75" y="152" fill="#22d3ee" fontSize="10.5" fontWeight="bold">Warehouse 2D Matrix M [W × H]</text>
                <text x="75" y="172" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">M[0..W] = [0, 0, 1, 1, 0, 0, 0, 1...]</text>
                <text x="75" y="190" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Resolution δ = 0.05 m (5 cm / cell)</text>
                <text x="75" y="208" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Map Size: 400 × 300 = 120,000 cells</text>
                <text x="75" y="226" fill="#34d399" fontSize="9.5" fontWeight="bold" fontFamily="monospace">Published: /map (nav_msgs/OccupancyGrid)</text>
              </g>
            )}

            {/* Step 4: LiDAR Raycast Cone & Log-Odds Updates */}
            {currentStepIndex === 4 && (
              <g>
                {/* 11 Fan Raycasts */}
                {Array.from({ length: 11 }).map((_, idx) => {
                  const angleDeg = -50 + idx * 10;
                  const angleRad = angleDeg * Math.PI / 180;
                  const dist = (idx >= 3 && idx <= 7) ? 140 : 180;
                  const targetX = rx + Math.cos(angleRad) * dist;
                  const targetY = ry - Math.sin(angleRad) * dist;
                  return (
                    <g key={idx}>
                      {/* Traversed Free Line */}
                      <line x1={rx} y1={ry} x2={targetX} y2={targetY} stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
                      {/* Endpoint Hit Cell (Occupied) */}
                      <circle cx={targetX} cy={targetY} r="4" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
                    </g>
                  );
                })}
                {/* Measurement Cone Label */}
                <path d={`M ${rx} ${ry} L ${rx + 115} ${ry - 138} A 180 180 0 0 1 ${rx + 115} ${ry - 14} Z`} fill="rgba(56, 189, 248, 0.12)" />
                <rect x="290" y="160" width="200" height="85" fill="rgba(15, 23, 42, 0.95)" stroke="#10b981" strokeWidth="1.5" rx="6" />
                <text x="305" y="182" fill="#34d399" fontSize="10.5" fontWeight="bold">Bayesian Log-Odds Update</text>
                <text x="305" y="202" fill="#e2e8f0" fontSize="9.5" fontFamily="monospace">l_t(m) = l_{t-1} + inv_sensor - l_0</text>
                <text x="305" y="220" fill="#38bdf8" fontSize="9">Traversed Cells: l &lt; 0 (Free evidence)</text>
                <text x="305" y="234" fill="#f87171" fontSize="9">Impact Cells: l &gt; 0 (Occupied hit)</text>
              </g>
            )}

            {/* AMR Robot Pose */}
            <g transform={`translate(${rx}, ${ry})`}>
              <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
              <polygon points="0,-11 5,5 -5,5" fill="#f8fafc" />
              <circle cx="0" cy="0" r="3" fill="#ef4444" />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Step Explanation Banner */}
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderLeft: '3px solid #38bdf8',
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

export default OccupancyGridMappingInteractive;
