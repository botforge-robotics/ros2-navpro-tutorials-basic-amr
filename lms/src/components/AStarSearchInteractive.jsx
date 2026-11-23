import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  CheckCircle2,
  Zap,
  Award,
  CornerDownRight,
  MousePointerClick
} from 'lucide-react';

const NODES = {
  S: { x: 65, y: 140, h: 11.5, label: 'S (Start)' },
  A: { x: 175, y: 65, h: 10.1, label: 'A' },
  D: { x: 185, y: 215, h: 9.2, label: 'D' },
  B: { x: 315, y: 65, h: 5.8, label: 'B' },
  E: { x: 315, y: 215, h: 7.1, label: 'E' },
  C: { x: 445, y: 65, h: 3.4, label: 'C' },
  F: { x: 435, y: 215, h: 3.5, label: 'F' },
  G: { x: 535, y: 140, h: 0.0, label: 'G (Goal)' }
};

const EDGES = [
  { from: 'S', to: 'A', cost: 3.0, midX: 115, midY: 92 },
  { from: 'S', to: 'D', cost: 4.0, midX: 120, midY: 188 },
  { from: 'A', to: 'B', cost: 4.0, midX: 245, midY: 53 },
  { from: 'A', to: 'D', cost: 5.0, midX: 190, midY: 140 },
  { from: 'D', to: 'E', cost: 2.0, midX: 250, midY: 226 },
  { from: 'B', to: 'C', cost: 4.0, midX: 380, midY: 53 },
  { from: 'B', to: 'E', cost: 5.0, midX: 300, midY: 140 },
  { from: 'E', to: 'F', cost: 4.0, midX: 375, midY: 226 },
  { from: 'F', to: 'G', cost: 3.5, midX: 490, midY: 188 }
];

const STEPS = [
  {
    step: 0,
    chipLabel: '0: Init S',
    title: 'Initialize Min-Heap Frontier at Start Node S',
    current: 'S',
    closed: [],
    frontier: [
      { path: 'S', targetNode: 'S', g: 0.0, h: 11.5, f: 11.5, status: 'Root Initialized', isLowest: true }
    ],
    activeEdges: [],
    optimalPath: [],
    decisionFormula: 'f(S) = g(0.0) + h(11.5) = 11.5',
    decisionNote: 'Push start node S into Open List min-heap.',
    explanation: 'Search begins at Start Node S. True path cost from start g(S) = 0. Admissible heuristic estimate to goal h(S) = 11.5. Priority queue initializes with root f(S) = 11.5.'
  },
  {
    step: 1,
    chipLabel: '1: Expand S',
    title: 'Pop Node S: Expand Neighbors A & D',
    current: 'S',
    closed: ['S'],
    frontier: [
      { path: 'S → A', targetNode: 'A', g: 3.0, h: 10.1, f: 13.1, status: '★ Lowest f(n) • Selected', isLowest: true },
      { path: 'S → D', targetNode: 'D', g: 4.0, h: 9.2, f: 13.2, status: 'Queued in Min-Heap', isLowest: false }
    ],
    activeEdges: ['S-A', 'S-D'],
    optimalPath: [],
    decisionFormula: 'f(S→A) = 3.0 + 10.1 = 13.1  <  f(S→D) = 4.0 + 9.2 = 13.2',
    decisionNote: 'Select S → A next (13.1 is strictly smaller than 13.2).',
    explanation: 'Pop S from min-heap. Evaluate outgoing edges: edge (S,A) cost 3 gives f=13.1; edge (S,D) cost 4 gives f=13.2. Candidate S→A holds lowest f-score and is chosen next for expansion.'
  },
  {
    step: 2,
    chipLabel: '2: Pop A',
    title: 'Pop S → A (f=13.1): Expand Node A to B & D',
    current: 'A',
    closed: ['S', 'A'],
    frontier: [
      { path: 'S → A → B', targetNode: 'B', g: 7.0, h: 5.8, f: 12.8, status: '★ Lowest f(n) • Selected', isLowest: true },
      { path: 'S → D', targetNode: 'D', g: 4.0, h: 9.2, f: 13.2, status: 'Queued in Min-Heap', isLowest: false },
      { path: 'S → A → D', targetNode: 'D', g: 8.0, h: 9.2, f: 17.2, status: 'Sub-optimal (g=8 > g=4)', isLowest: false }
    ],
    activeEdges: ['S-A', 'A-B', 'A-D', 'S-D'],
    optimalPath: [],
    decisionFormula: 'f(S→A→B) = 7.0 + 5.8 = 12.8 (Lowest in entire Min-Heap!)',
    decisionNote: 'Branch B is very promising due to low heuristic h(B)=5.8.',
    explanation: 'Pop S→A (f=13.1). Expanding A generates path to B (g=7, h=5.8, f=12.8) and path to D (g=8, h=9.2, f=17.2). Candidate S→A→B now holds the lowest f-score in the entire queue!'
  },
  {
    step: 3,
    chipLabel: '3: Backtrack ↩',
    title: 'Pop S → A → B (f=12.8): Expand B → A* Backtracks to D!',
    current: 'B',
    closed: ['S', 'A', 'B'],
    frontier: [
      { path: 'S → D', targetNode: 'D', g: 4.0, h: 9.2, f: 13.2, status: '★ Lowest f(n) • BACKTRACK ↩', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Min-Heap', isLowest: false },
      { path: 'S → A → D', targetNode: 'D', g: 8.0, h: 9.2, f: 17.2, status: 'Sub-optimal', isLowest: false },
      { path: 'S → A → B → E', targetNode: 'E', g: 12.0, h: 7.1, f: 19.1, status: 'Sub-optimal', isLowest: false }
    ],
    activeEdges: ['S-A', 'A-B', 'B-C', 'B-E', 'S-D'],
    optimalPath: [],
    decisionFormula: 'f(S→D) = 13.2  <  f(S→A→B→C) = 14.4  <  f(S→A→B→E) = 19.1',
    decisionNote: 'Intelligent A* Backtracking: Switches focus back to branch D!',
    explanation: 'Pop S→A→B. Evaluating B generates C (f=14.4) and E (f=19.1). Both are worse than the waiting candidate S→D (f=13.2)! A* automatically backtracks to branch D, preventing wasted exploration!'
  },
  {
    step: 4,
    chipLabel: '4: Pop D (Prune ✂)',
    title: 'Pop S → D (f=13.2): Expand D to E → Prune Costly Paths!',
    current: 'D',
    closed: ['S', 'A', 'B', 'D'],
    frontier: [
      { path: 'S → D → E', targetNode: 'E', g: 6.0, h: 7.1, f: 13.1, status: '★ Lowest f(n) • Selected', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Min-Heap', isLowest: false },
      { path: 'S → D → A', targetNode: 'A', g: 9.0, h: 10.1, f: 19.1, status: 'Sub-optimal', isLowest: false },
      { path: 'S → A → B → E', targetNode: 'E', g: 12.0, h: 7.1, f: 19.1, status: '✂ PRUNED (g=12 > g=6)', isLowest: false }
    ],
    activeEdges: ['S-D', 'D-E', 'S-A', 'A-B', 'B-C'],
    optimalPath: [],
    decisionFormula: 'g(S→D→E) = 6.0  vs  g(S→A→B→E) = 12.0 → Pruned!',
    decisionNote: 'Reaching E via D is half the cost of reaching E via B.',
    explanation: 'Pop S→D (f=13.2). Edge (D,E) cost 2 reaches E with g=6.0, f=13.1. This is far cheaper than the earlier route via B (g=12.0). A* prunes the costly branch and selects S→D→E!'
  },
  {
    step: 5,
    chipLabel: '5: Expand E',
    title: 'Pop S → D → E (f=13.1): Expand E to F',
    current: 'E',
    closed: ['S', 'A', 'B', 'D', 'E'],
    frontier: [
      { path: 'S → D → E → F', targetNode: 'F', g: 10.0, h: 3.5, f: 13.5, status: '★ Lowest f(n) • Selected', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Min-Heap', isLowest: false },
      { path: 'S → D → E → B', targetNode: 'B', g: 11.0, h: 5.8, f: 16.8, status: 'Sub-optimal (Closed)', isLowest: false }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F'],
    optimalPath: [],
    decisionFormula: 'f(S→D→E→F) = 10.0 + 3.5 = 13.5',
    decisionNote: 'Node F is only 3.5 units estimated distance from Goal.',
    explanation: 'Pop S→D→E (f=13.1). Expand E: edge (E,F) cost 4 gives g=10.0, h=3.5, f=13.5. Path S→D→E→F holds the lowest f-score in the queue and advances directly toward the Goal.'
  },
  {
    step: 6,
    chipLabel: '6: Reach G',
    title: 'Pop S → D → E → F (f=13.5): Reach Goal G!',
    current: 'F',
    closed: ['S', 'A', 'B', 'D', 'E', 'F'],
    frontier: [
      { path: 'S → D → E → F → G', targetNode: 'G', g: 13.5, h: 0.0, f: 13.5, status: '★ GOAL FOUND • Ready to Pop', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Queued in Min-Heap', isLowest: false }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F', 'F-G'],
    optimalPath: ['S-D', 'D-E', 'E-F', 'F-G'],
    decisionFormula: 'f(Goal) = g(13.5) + h(0.0) = 13.5',
    decisionNote: 'Goal node queued at head of min-heap. Ready for final pop.',
    explanation: 'Pop S→D→E→F (f=13.5). Edge (F,G) cost 3.5 reaches Goal G! Path cost g = 13.5, h(G) = 0, f = 13.5. Candidate path is placed at top of priority queue.'
  },
  {
    step: 7,
    chipLabel: '7: Goal Optimal ★',
    title: 'Pop Goal G: Optimal Path Guaranteed (Cost = 13.5)',
    current: 'G',
    closed: ['S', 'A', 'B', 'D', 'E', 'F', 'G'],
    frontier: [
      { path: 'S → D → E → F → G', targetNode: 'G', g: 13.5, h: 0.0, f: 13.5, status: '✓ MATHEMATICALLY OPTIMAL PATH', isLowest: true }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F', 'F-G'],
    optimalPath: ['S-D', 'D-E', 'E-F', 'F-G'],
    decisionFormula: 'Optimal Path: S → D → E → F → G (Total Cost g* = 13.5)',
    decisionNote: 'Admissible Heuristic Guarantee: No other path can be shorter.',
    explanation: 'Goal node G popped from min-heap! Because the heuristic h(n) is admissible (h(n) ≤ h*(n) everywhere), the first path popped to the goal is provably optimal. Search halts with guaranteed shortest trajectory.'
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
      }, 2000);
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

  const handleJumpToStep = (idx, e) => {
    e && e.stopPropagation();
    setCurrentStepIndex(idx);
  };

  return (
    <div 
      className="astar-interactive-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '520px',
        width: '100%',
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0.45rem 0.75rem',
        boxSizing: 'border-box',
        gap: '0.45rem',
        background: 'linear-gradient(180deg, #0b1120 0%, #060913 100%)',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <style>{`
        @keyframes astarMarch {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes astarPulseRing {
          0% {
            r: 18;
            opacity: 0.95;
            stroke-width: 2.5;
          }
          50% {
            r: 25;
            opacity: 0.45;
            stroke-width: 3.5;
          }
          100% {
            r: 31;
            opacity: 0;
            stroke-width: 1;
          }
        }
        @keyframes astarGlowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.7));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.95));
          }
        }
        .astar-edge-active {
          stroke: #f59e0b !important;
          stroke-width: 3 !important;
          stroke-dasharray: 6 4 !important;
          animation: astarMarch 0.7s linear infinite !important;
        }
        .astar-edge-optimal {
          stroke: #10b981 !important;
          stroke-width: 4.5 !important;
          stroke-dasharray: none !important;
          animation: astarGlowPulse 1.8s ease-in-out infinite !important;
        }
        .astar-step-chip {
          padding: 0.2rem 0.45rem;
          font-size: 0.65rem;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #334155;
          background: #1e293b;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .astar-step-chip:hover {
          background: #334155;
          color: #f8fafc;
          border-color: #64748b;
        }
        .astar-step-chip.active {
          background: #7c3aed;
          border-color: #a78bfa;
          color: #ffffff;
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
        }
        .astar-step-chip.completed {
          border-color: #065f46;
          color: #34d399;
          background: rgba(6, 95, 70, 0.25);
        }
      `}</style>

      {/* Top Header & Interactive Stepper Controls */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.4rem',
          borderBottom: '1px solid #1e293b',
          paddingBottom: '0.35rem'
        }}
      >
        {/* Step Chips (Clickable to jump directly to any step) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', overflowX: 'auto', maxWidth: '68%' }}>
          {STEPS.map((s, idx) => (
            <button
              key={idx}
              onClick={(e) => handleJumpToStep(idx, e)}
              className={`astar-step-chip ${idx === currentStepIndex ? 'active' : (idx < currentStepIndex ? 'completed' : '')}`}
              title={`Jump to step ${idx}: ${s.title}`}
            >
              {s.chipLabel}
            </button>
          ))}
        </div>

        {/* Action Controls */}
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
              background: isPlaying ? '#7c3aed' : 'rgba(139, 92, 246, 0.25)',
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
              gap: '0.25rem',
              padding: '0.25rem 0.75rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              borderRadius: '6px',
              border: '1px solid #10b981',
              background: currentStepIndex === STEPS.length - 1 ? '#1e293b' : '#059669',
              color: currentStepIndex === STEPS.length - 1 ? '#64748b' : '#ffffff',
              cursor: currentStepIndex === STEPS.length - 1 ? 'not-allowed' : 'pointer',
              boxShadow: currentStepIndex < STEPS.length - 1 ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
            }}
          >
            <MousePointerClick size={14} />
            Next Step <ChevronRight size={14} />
          </button>

          <button
            onClick={handleReset}
            title="Reset to Step 0"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem 0.45rem',
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

      {/* Main Dual Stage: SVG Graph on Left (60%), Priority Queue Table on Right (40%) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          gap: '0.55rem',
          flex: 1,
          minHeight: 0
        }}
      >
        {/* SVG Graph Canvas */}
        <div 
          onClick={handleNext}
          title="Click anywhere inside graph to advance to next step"
          style={{
            position: 'relative',
            background: 'radial-gradient(ellipse at 40% 50%, #0f172a 0%, #020617 100%)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: currentStepIndex < STEPS.length - 1 ? 'pointer' : 'default',
            padding: '0.25rem'
          }}
        >
          {/* Legend and Click Hint */}
          <div 
            style={{
              position: 'absolute',
              top: '6px',
              left: '8px',
              right: '8px',
              fontSize: '0.64rem',
              color: '#94a3b8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          >
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <span><strong style={{ color: '#f59e0b' }}>●</strong> Active / Popped</span>
              <span><strong style={{ color: '#38bdf8' }}>●</strong> Open Frontier</span>
              <span><strong style={{ color: '#818cf8' }}>●</strong> Closed</span>
              <span><strong style={{ color: '#10b981' }}>●</strong> Optimal Path</span>
            </div>
            {currentStepIndex < STEPS.length - 1 && (
              <span style={{ color: '#a78bfa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <MousePointerClick size={12} /> Click graph to step
              </span>
            )}
          </div>

          <svg 
            viewBox="0 0 600 280" 
            style={{ width: '100%', height: '100%', maxHeight: '250px' }}
          >
            <defs>
              <pattern id="astarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>

            {/* Background Blueprint Grid */}
            <rect width="600" height="280" fill="url(#astarGrid)" />

            {/* Draw Edges */}
            {EDGES.map(edge => {
              const fromN = NODES[edge.from];
              const toN = NODES[edge.to];
              const edgeKey = `${edge.from}-${edge.to}`;
              const isOptimal = stepData.optimalPath.includes(edgeKey);
              const isActive = stepData.activeEdges.includes(edgeKey);

              let edgeClass = '';
              let stroke = '#334155';
              let strokeWidth = 2;
              let strokeDash = 'none';

              if (isOptimal) {
                edgeClass = 'astar-edge-optimal';
                stroke = '#10b981';
                strokeWidth = 4.5;
              } else if (isActive) {
                edgeClass = 'astar-edge-active';
                stroke = '#f59e0b';
                strokeWidth = 3;
                strokeDash = '6 4';
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
                    className={edgeClass}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  {/* Cost Badge */}
                  <rect
                    x={edge.midX - 11}
                    y={edge.midY - 8}
                    width={22}
                    height={16}
                    rx={3}
                    fill="#020617"
                    stroke={isOptimal ? '#10b981' : (isActive ? '#f59e0b' : '#334155')}
                    strokeWidth={1.2}
                  />
                  <text
                    x={edge.midX}
                    y={edge.midY + 4}
                    fill={isOptimal ? '#34d399' : (isActive ? '#fbbf24' : '#94a3b8')}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {edge.cost.toFixed(1)}
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
              const isInFrontier = stepData.frontier.some(f => f.targetNode === id);
              const isOptimal = currentStepIndex >= 6 && ['S', 'D', 'E', 'F', 'G'].includes(id);

              let fill = '#1e293b';
              let stroke = '#475569';
              let textColor = '#f8fafc';

              if (isOptimal && currentStepIndex === 7) {
                fill = '#064e3b';
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
                <g key={id} style={{ transition: 'all 0.3s ease' }}>
                  {/* Animated Pulsing Ring around Active/Popped Node */}
                  {isCurrent && (
                    <circle
                      cx={node.x}
                      y={node.y}
                      r={24}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="4 3"
                      style={{ animation: 'astarPulseRing 1.5s ease-out infinite' }}
                    />
                  )}

                  {/* Optimal Path Outer Halo */}
                  {isOptimal && currentStepIndex === 7 && (
                    <circle
                      cx={node.x}
                      y={node.y}
                      r={22}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeOpacity={0.6}
                    />
                  )}

                  {/* Main Node Body */}
                  <circle
                    cx={node.x}
                    y={node.y}
                    r={18}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isCurrent || isOptimal ? 3 : 2}
                  />

                  {/* Node Label */}
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

                  {/* Heuristic Pill (Admissible Estimate to Goal) */}
                  <rect
                    x={node.x - 17}
                    y={node.y - 30}
                    width={34}
                    height={14}
                    rx={3}
                    fill="#020617"
                    stroke={isCurrent ? '#f59e0b' : (isInFrontier ? '#0284c7' : '#334155')}
                    strokeWidth={0.9}
                  />
                  <text
                    x={node.x}
                    y={node.y - 20}
                    fill={isCurrent ? '#fef08a' : (isInFrontier ? '#38bdf8' : '#94a3b8')}
                    fontSize="8.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    h={node.h.toFixed(1)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Priority Queue (Frontier) Live Table */}
        <div 
          style={{
            background: 'rgba(2, 6, 23, 0.85)',
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
                borderBottom: '1px solid #1e293b',
                paddingBottom: '0.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#a78bfa' }}>
                  Min-Heap Priority Queue (Open List)
                </span>
              </div>
              <span style={{ fontSize: '0.64rem', color: '#94a3b8' }}>
                Sorted by f(n) = g + h
              </span>
            </div>

            <div style={{ overflowX: 'auto', maxHeight: '185px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem' }}>
                <thead>
                  <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left' }}>
                    <th style={{ padding: '0.22rem 0.35rem' }}>Candidate Path</th>
                    <th style={{ padding: '0.22rem 0.35rem' }}>g(n)</th>
                    <th style={{ padding: '0.22rem 0.35rem' }}>h(n)</th>
                    <th style={{ padding: '0.22rem 0.35rem', color: '#eab308' }}>f(n)</th>
                    <th style={{ padding: '0.22rem 0.35rem' }}>Frontier Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stepData.frontier.map((row, idx) => (
                    <tr 
                      key={idx}
                      style={{
                        background: row.isLowest ? 'rgba(234, 179, 8, 0.14)' : 'transparent',
                        borderBottom: '1px solid #1e293b',
                        color: row.isLowest ? '#fef08a' : '#cbd5e1'
                      }}
                    >
                      <td style={{ padding: '0.22rem 0.35rem', fontFamily: 'monospace', fontWeight: 700 }}>
                        {row.path}
                      </td>
                      <td style={{ padding: '0.22rem 0.35rem' }}>{row.g.toFixed(1)}</td>
                      <td style={{ padding: '0.22rem 0.35rem' }}>{row.h.toFixed(1)}</td>
                      <td style={{ padding: '0.22rem 0.35rem', fontWeight: 800, color: row.isLowest ? '#fbbf24' : '#f8fafc' }}>
                        {row.f.toFixed(1)}
                      </td>
                      <td style={{ padding: '0.22rem 0.35rem', fontSize: '0.62rem' }}>
                        <span 
                          style={{
                            padding: '0.12rem 0.35rem',
                            borderRadius: '4px',
                            background: row.isLowest ? '#854d0e' : (row.status.includes('PRUNED') ? '#7f1d1d' : '#1e293b'),
                            color: row.isLowest ? '#fef08a' : (row.status.includes('PRUNED') ? '#fca5a5' : '#94a3b8'),
                            fontWeight: 600
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

          {/* Mathematical Decision Box */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '0.35rem 0.5rem',
              fontSize: '0.68rem',
              marginTop: '0.35rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                🧮 Math Evaluation:
              </span>
              <span style={{ color: '#fbbf24', fontFamily: 'monospace', fontWeight: 700 }}>
                {stepData.decisionFormula}
              </span>
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.64rem' }}>
              {stepData.decisionNote}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Step Explanation Banner */}
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          borderLeft: '4px solid #8b5cf6',
          padding: '0.4rem 0.65rem',
          borderRadius: '4px',
          fontSize: '0.73rem',
          lineHeight: 1.35,
          color: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <div 
          style={{
            background: '#7c3aed',
            color: '#fff',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            fontSize: '0.65rem',
            fontWeight: 800,
            whiteSpace: 'nowrap'
          }}
        >
          Step {currentStepIndex} of {STEPS.length - 1}
        </div>
        <div>
          <strong style={{ color: '#a78bfa', marginRight: '0.35rem' }}>
            {stepData.title}:
          </strong>
          <span>{stepData.explanation}</span>
        </div>
      </div>
    </div>
  );
}

export default AStarSearchInteractive;
