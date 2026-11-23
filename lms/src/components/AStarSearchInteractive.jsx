import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

const NODES = {
  S: { x: 70, y: 145, h: 11.5, label: 'S (Start)' },
  A: { x: 175, y: 70, h: 10.1, label: 'A' },
  D: { x: 185, y: 220, h: 9.2, label: 'D' },
  B: { x: 315, y: 70, h: 5.8, label: 'B' },
  E: { x: 315, y: 220, h: 7.1, label: 'E' },
  C: { x: 445, y: 70, h: 3.4, label: 'C' },
  F: { x: 435, y: 220, h: 3.5, label: 'F' },
  G: { x: 535, y: 145, h: 0.0, label: 'G (Goal)' }
};

const EDGES = [
  { from: 'S', to: 'A', cost: 3.0, midX: 120, midY: 95 },
  { from: 'S', to: 'D', cost: 4.0, midX: 125, midY: 195 },
  { from: 'A', to: 'B', cost: 4.0, midX: 245, midY: 55 },
  { from: 'A', to: 'D', cost: 5.0, midX: 195, midY: 145 },
  { from: 'D', to: 'E', cost: 2.0, midX: 250, midY: 235 },
  { from: 'B', to: 'C', cost: 4.0, midX: 380, midY: 55 },
  { from: 'B', to: 'E', cost: 5.0, midX: 300, midY: 145 },
  { from: 'E', to: 'F', cost: 4.0, midX: 375, midY: 235 },
  { from: 'F', to: 'G', cost: 3.5, midX: 495, midY: 195 }
];

const STEPS = [
  {
    step: 0,
    title: 'Initialize Search at Start Node S',
    current: 'S',
    closed: [],
    frontier: [
      { path: 'S', g: 0.0, h: 11.5, f: 11.5, status: 'Selected Next' }
    ],
    activeEdges: [],
    optimalPath: [],
    explanation: 'Begin search at start node S. Compute heuristic h(S) = 11.5. Priority queue initializes with f(S) = g(0) + h(11.5) = 11.5.'
  },
  {
    step: 1,
    title: 'Expand Start Node S: Evaluate Neighbors A & D',
    current: 'S',
    closed: ['S'],
    frontier: [
      { path: 'S → A', g: 3.0, h: 10.1, f: 13.1, status: 'Lowest f(n) • Selected' },
      { path: 'S → D', g: 4.0, h: 9.2, f: 13.2, status: 'Queued in Frontier' }
    ],
    activeEdges: ['S-A', 'S-D'],
    optimalPath: [],
    explanation: 'Pop S. Expand neighbors: S→A has f = 3 + 10.1 = 13.1; S→D has f = 4 + 9.2 = 13.2. S→A is selected because 13.1 < 13.2.'
  },
  {
    step: 2,
    title: 'Pop S → A (f=13.1): Expand Node A to B & D',
    current: 'A',
    closed: ['S', 'A'],
    frontier: [
      { path: 'S → A → B', g: 7.0, h: 5.8, f: 12.8, status: 'Lowest f(n) • Selected' },
      { path: 'S → D', g: 4.0, h: 9.2, f: 13.2, status: 'Queued in Frontier' },
      { path: 'S → A → D', g: 8.0, h: 9.2, f: 17.2, status: 'Sub-optimal Branch' }
    ],
    activeEdges: ['S-A', 'A-B', 'A-D', 'S-D'],
    optimalPath: [],
    explanation: 'Pop S→A (f=13.1). Expand A: generated S→A→B (g=7, h=5.8, f=12.8) and S→A→D (g=8, h=9.2, f=17.2). S→A→B has lowest f=12.8!'
  },
  {
    step: 3,
    title: 'Pop S → A → B (f=12.8): Expand Node B to C & E',
    current: 'B',
    closed: ['S', 'A', 'B'],
    frontier: [
      { path: 'S → D', g: 4.0, h: 9.2, f: 13.2, status: 'Lowest f(n) • Backtrack' },
      { path: 'S → A → B → C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Frontier' },
      { path: 'S → A → D', g: 8.0, h: 9.2, f: 17.2, status: 'Sub-optimal' },
      { path: 'S → A → B → E', g: 12.0, h: 7.1, f: 19.1, status: 'Sub-optimal' }
    ],
    activeEdges: ['S-A', 'A-B', 'B-C', 'B-E', 'S-D'],
    optimalPath: [],
    explanation: 'Pop S→A→B (f=12.8). Generated S→A→B→C (f=14.4) and S→A→B→E (f=19.1). The lowest f-score in the queue is now S→D (13.2)! Algorithm backtracks to branch D.'
  },
  {
    step: 4,
    title: 'Pop S → D (f=13.2): Expand Node D to E',
    current: 'D',
    closed: ['S', 'A', 'B', 'D'],
    frontier: [
      { path: 'S → D → E', g: 6.0, h: 7.1, f: 13.1, status: 'Lowest f(n) • Selected' },
      { path: 'S → A → B → C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Frontier' },
      { path: 'S → D → A', g: 9.0, h: 10.1, f: 19.1, status: 'Sub-optimal' },
      { path: 'S → A → B → E', g: 12.0, h: 7.1, f: 19.1, status: 'Pruned (Costlier)' }
    ],
    activeEdges: ['S-D', 'D-E', 'S-A', 'A-B', 'B-C'],
    optimalPath: [],
    explanation: 'Pop S→D (f=13.2). Expand D to E: path S→D→E has g=6, h=7.1, f=13.1. This is much cheaper than reaching E via B (f=19.1)! S→D→E becomes top candidate.'
  },
  {
    step: 5,
    title: 'Pop S → D → E (f=13.1): Expand Node E to F',
    current: 'E',
    closed: ['S', 'A', 'B', 'D', 'E'],
    frontier: [
      { path: 'S → D → E → F', g: 10.0, h: 3.5, f: 13.5, status: 'Lowest f(n) • Selected' },
      { path: 'S → A → B → C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Frontier' },
      { path: 'S → D → E → B', g: 11.0, h: 5.8, f: 16.8, status: 'Sub-optimal' }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F'],
    optimalPath: [],
    explanation: 'Pop S→D→E (f=13.1). Expand E to F: generated S→D→E→F (g=10, h=3.5, f=13.5). S→D→E→F holds lowest f-score and advances toward Goal.'
  },
  {
    step: 6,
    title: 'Pop S → D → E → F (f=13.5): Reach Goal G!',
    current: 'F',
    closed: ['S', 'A', 'B', 'D', 'E', 'F'],
    frontier: [
      { path: 'S → D → E → F → G', g: 13.5, h: 0.0, f: 13.5, status: 'Goal Found • Ready to Pop' },
      { path: 'S → A → B → C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Frontier' }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F', 'F-G'],
    optimalPath: ['S-D', 'D-E', 'E-F', 'F-G'],
    explanation: 'Pop S→D→E→F (f=13.5). Expand F to Goal G: total path cost g = 13.5, h = 0, f = 13.5! Target path is queued with lowest cost.'
  },
  {
    step: 7,
    title: 'Goal G Popped: Optimal Path Guaranteed (Cost = 13.5)',
    current: 'G',
    closed: ['S', 'A', 'B', 'D', 'E', 'F', 'G'],
    frontier: [
      { path: 'S → D → E → F → G', g: 13.5, h: 0.0, f: 13.5, status: '✓ OPTIMAL PATH FOUND' }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F', 'F-G'],
    optimalPath: ['S-D', 'D-E', 'E-F', 'F-G'],
    explanation: 'Goal node G popped from frontier! Because the heuristic h(n) is admissible (never overestimates true cost), S → D → E → F → G is provably optimal!'
  }
];

export function AStarSearchInteractive() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepData = STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < STEPS.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = (e) => {
    e && e.stopPropagation();
    if (currentStepIndex < STEPS.length - 1) {
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
      className="astar-interactive-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '0.4rem 0.6rem',
        boxSizing: 'border-box',
        gap: '0.4rem',
        background: 'var(--bg-card, #0f172a)',
        borderRadius: '10px',
        border: '1px solid var(--border-color, #334155)',
        color: 'var(--text-primary, #f8fafc)'
      }}
    >
      {/* Top Header & Interactive Stepper Controls */}
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
              background: '#8b5cf6',
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
            Step {currentStepIndex} of {STEPS.length - 1}
          </span>
          <strong style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
            {stepData.title}
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
              border: '1px solid #8b5cf6',
              background: isPlaying ? '#7c3aed' : 'rgba(139, 92, 246, 0.2)',
              color: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === STEPS.length - 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.25rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: '1px solid #10b981',
              background: currentStepIndex === STEPS.length - 1 ? '#1e293b' : '#059669',
              color: currentStepIndex === STEPS.length - 1 ? '#64748b' : '#f8fafc',
              cursor: currentStepIndex === STEPS.length - 1 ? 'not-allowed' : 'pointer'
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

      {/* Main Dual Stage: SVG Graph on Left, Priority Queue Table on Right */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          gap: '0.5rem',
          flex: 1,
          minHeight: 0
        }}
      >
        {/* SVG Graph Canvas */}
        <div 
          onClick={handleNext}
          title="Click to advance to next step"
          style={{
            position: 'relative',
            background: 'rgba(2, 6, 23, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: currentStepIndex < STEPS.length - 1 ? 'pointer' : 'default'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: '6px',
              left: '8px',
              fontSize: '0.66rem',
              color: '#94a3b8',
              display: 'flex',
              gap: '0.7rem'
            }}
          >
            <span><strong style={{ color: '#eab308' }}>●</strong> Active / Current</span>
            <span><strong style={{ color: '#38bdf8' }}>●</strong> In Frontier</span>
            <span><strong style={{ color: '#10b981' }}>●</strong> Optimal Path</span>
          </div>

          <svg 
            viewBox="0 0 600 290" 
            style={{ width: '100%', height: '100%', maxHeight: '250px' }}
          >
            {/* Draw Edges */}
            {EDGES.map(edge => {
              const fromN = NODES[edge.from];
              const toN = NODES[edge.to];
              const edgeKey = `${edge.from}-${edge.to}`;
              const isOptimal = stepData.optimalPath.includes(edgeKey);
              const isActive = stepData.activeEdges.includes(edgeKey);

              let stroke = '#334155';
              let strokeWidth = 2;
              let strokeDash = 'none';

              if (isOptimal) {
                stroke = '#10b981';
                strokeWidth = 4;
              } else if (isActive) {
                stroke = '#f59e0b';
                strokeWidth = 2.5;
                strokeDash = '4,3';
              }

              return (
                <g key={edgeKey}>
                  <line
                    x1={fromN.x}
                    y1={fromN.y}
                    x2={toN.x}
                    y2={toN.y}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDash}
                  />
                  {/* Cost Label */}
                  <rect
                    x={edge.midX - 11}
                    y={edge.midY - 8}
                    width={22}
                    height={16}
                    rx={3}
                    fill="#0f172a"
                    stroke={isOptimal ? '#10b981' : (isActive ? '#f59e0b' : '#334155')}
                    strokeWidth={1}
                  />
                  <text
                    x={edge.midX}
                    y={edge.midY + 4}
                    fill={isOptimal ? '#34d399' : (isActive ? '#fbbf24' : '#94a3b8')}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {edge.cost}
                  </text>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {Object.entries(NODES).map(([id, node]) => {
              const isCurrent = stepData.current === id;
              const isClosed = stepData.closed.includes(id);
              const isGoal = id === 'G';
              const isStart = id === 'S';
              const isInFrontier = stepData.frontier.some(f => f.next === id);
              const isOptimal = currentStepIndex >= 6 && ['S', 'D', 'E', 'F', 'G'].includes(id);

              let fill = '#1e293b';
              let stroke = '#475569';
              let textColor = '#f8fafc';

              if (isOptimal && currentStepIndex === 7) {
                fill = '#065f46';
                stroke = '#10b981';
                textColor = '#6ee7b7';
              } else if (isCurrent) {
                fill = '#78350f';
                stroke = '#f59e0b';
                textColor = '#fef08a';
              } else if (isInFrontier) {
                fill = '#0c4a6e';
                stroke = '#0284c7';
                textColor = '#7dd3fc';
              } else if (isClosed) {
                fill = '#312e81';
                stroke = '#6366f1';
                textColor = '#c7d2fe';
              }

              return (
                <g key={id}>
                  {/* Node Circle */}
                  <circle
                    cx={node.x}
                    y={node.y}
                    r={18}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isCurrent || isOptimal ? 3 : 2}
                  />
                  {/* Node Name */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    fill={textColor}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {id}
                  </text>
                  {/* Heuristic Pill */}
                  <rect
                    x={node.x - 17}
                    y={node.y - 30}
                    width={34}
                    height={14}
                    rx={3}
                    fill="rgba(15, 23, 42, 0.9)"
                    stroke="#475569"
                    strokeWidth={0.8}
                  />
                  <text
                    x={node.x}
                    y={node.y - 19}
                    fill="#cbd5e1"
                    fontSize="8.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    h={node.h}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Priority Queue (Frontier) Table */}
        <div 
          style={{
            background: 'rgba(2, 6, 23, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
            padding: '0.45rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}
        >
          <div>
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.35rem',
                borderBottom: '1px solid #334155',
                paddingBottom: '0.25rem'
              }}
            >
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a78bfa' }}>
                Priority Queue Frontier (Ordered by f(n) = g + h)
              </span>
              <span style={{ fontSize: '0.64rem', color: '#94a3b8' }}>
                Queue Size: {stepData.frontier.length}
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                    <th style={{ padding: '0.2rem 0.35rem' }}>Candidate Path</th>
                    <th style={{ padding: '0.2rem 0.35rem' }}>g(n)</th>
                    <th style={{ padding: '0.2rem 0.35rem' }}>h(n)</th>
                    <th style={{ padding: '0.2rem 0.35rem', color: '#eab308' }}>f(n)</th>
                    <th style={{ padding: '0.2rem 0.35rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stepData.frontier.map((row, idx) => (
                    <tr 
                      key={idx}
                      style={{
                        background: idx === 0 ? 'rgba(234, 179, 8, 0.12)' : 'transparent',
                        borderBottom: '1px solid #1e293b',
                        color: idx === 0 ? '#fef08a' : '#cbd5e1'
                      }}
                    >
                      <td style={{ padding: '0.22rem 0.35rem', fontFamily: 'monospace', fontWeight: 600 }}>
                        {row.path}
                      </td>
                      <td style={{ padding: '0.22rem 0.35rem' }}>{row.g.toFixed(1)}</td>
                      <td style={{ padding: '0.22rem 0.35rem' }}>{row.h.toFixed(1)}</td>
                      <td style={{ padding: '0.22rem 0.35rem', fontWeight: 700, color: idx === 0 ? '#fbbf24' : '#f8fafc' }}>
                        {row.f.toFixed(1)}
                      </td>
                      <td style={{ padding: '0.22rem 0.35rem', fontSize: '0.62rem' }}>
                        <span 
                          style={{
                            padding: '0.1rem 0.35rem',
                            borderRadius: '4px',
                            background: idx === 0 ? '#854d0e' : '#334155',
                            color: idx === 0 ? '#fef08a' : '#94a3b8'
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mathematical Formula Footnote */}
          <div 
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '0.3rem 0.45rem',
              fontSize: '0.66rem',
              color: '#94a3b8',
              marginTop: '0.35rem'
            }}
          >
            <strong style={{ color: '#38bdf8' }}>f(n) = g(n) + h(n):</strong> g(n) is exact cost from Start; h(n) is admissible heuristic distance to Goal.
          </div>
        </div>
      </div>

      {/* Bottom Step Explanation Banner */}
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderLeft: '3px solid #8b5cf6',
          padding: '0.35rem 0.6rem',
          borderRadius: '4px',
          fontSize: '0.72rem',
          lineHeight: 1.35,
          color: '#e2e8f0'
        }}
      >
        <span style={{ color: '#a78bfa', fontWeight: 700, marginRight: '0.35rem' }}>
          💡 Step Mechanics:
        </span>
        {stepData.explanation}
      </div>
    </div>
  );
}
export default AStarSearchInteractive;
