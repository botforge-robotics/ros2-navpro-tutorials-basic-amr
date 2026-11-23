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
        width: '100%',
        margin: '0 auto',
        padding: '0.55rem 0.85rem',
        boxSizing: 'border-box',
        gap: '0.45rem',
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        color: '#0f172a',
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
            filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.9));
          }
        }
        .astar-edge-active {
          stroke: #d97706 !important;
          stroke-width: 3.2 !important;
          stroke-dasharray: 6 4 !important;
          animation: astarMarch 0.7s linear infinite !important;
        }
        .astar-edge-optimal {
          stroke: #059669 !important;
          stroke-width: 4.5 !important;
          stroke-dasharray: none !important;
          animation: astarGlowPulse 1.8s ease-in-out infinite !important;
        }
        .astar-step-chip {
          padding: 0.22rem 0.5rem;
          font-size: 0.67rem;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .astar-step-chip:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #94a3b8;
        }
        .astar-step-chip.active {
          background: #4f46e5;
          border-color: #4338ca;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
        }
        .astar-step-chip.completed {
          border-color: #a7f3d0;
          color: #059669;
          background: #ecfdf5;
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
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '0.4rem'
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
              border: '1px solid #cbd5e1',
              background: currentStepIndex === 0 ? '#f1f5f9' : '#ffffff',
              color: currentStepIndex === 0 ? '#94a3b8' : '#334155',
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
              border: isPlaying ? '1px solid #4338ca' : '1px solid #c7d2fe',
              background: isPlaying ? '#4f46e5' : '#eef2ff',
              color: isPlaying ? '#ffffff' : '#4338ca',
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
              border: '1px solid #047857',
              background: currentStepIndex === STEPS.length - 1 ? '#f1f5f9' : '#059669',
              color: currentStepIndex === STEPS.length - 1 ? '#94a3b8' : '#ffffff',
              cursor: currentStepIndex === STEPS.length - 1 ? 'not-allowed' : 'pointer',
              boxShadow: currentStepIndex < STEPS.length - 1 ? '0 2px 8px rgba(5, 150, 105, 0.3)' : 'none'
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
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main Dual Stage: SVG Graph on Left (56%), Priority Queue Table on Right (44%) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '0.65rem',
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
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: currentStepIndex < STEPS.length - 1 ? 'pointer' : 'default',
            padding: '0.35rem'
          }}
        >
          {/* Legend and Click Hint */}
          <div 
            style={{
              position: 'absolute',
              top: '8px',
              left: '10px',
              right: '10px',
              fontSize: '0.66rem',
              color: '#64748b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', fontWeight: 600 }}>
              <span><strong style={{ color: '#d97706' }}>●</strong> Active / Popped</span>
              <span><strong style={{ color: '#0284c7' }}>●</strong> Open Frontier</span>
              <span><strong style={{ color: '#64748b' }}>●</strong> Closed</span>
              <span><strong style={{ color: '#059669' }}>●</strong> Optimal Path</span>
            </div>
            {currentStepIndex < STEPS.length - 1 && (
              <span style={{ color: '#4f46e5', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <MousePointerClick size={12} /> Click graph to step
              </span>
            )}
          </div>

          <svg 
            viewBox="0 0 600 280" 
            style={{ width: '100%', height: '100%', minHeight: '260px', maxHeight: '340px' }}
          >
            <defs>
              <pattern id="astarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
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
              let stroke = '#cbd5e1';
              let strokeWidth = 2;
              let strokeDash = 'none';

              if (isOptimal) {
                edgeClass = 'astar-edge-optimal';
                stroke = '#059669';
                strokeWidth = 4.5;
              } else if (isActive) {
                edgeClass = 'astar-edge-active';
                stroke = '#d97706';
                strokeWidth = 3.2;
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
                    x={edge.midX - 12}
                    y={edge.midY - 8}
                    width={24}
                    height={16}
                    rx={4}
                    fill="#ffffff"
                    stroke={isOptimal ? '#059669' : (isActive ? '#d97706' : '#cbd5e1')}
                    strokeWidth={1.2}
                  />
                  <text
                    x={edge.midX}
                    y={edge.midY + 4}
                    fill={isOptimal ? '#059669' : (isActive ? '#b45309' : '#475569')}
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

              let fill = '#ffffff';
              let stroke = '#94a3b8';
              let textColor = '#0f172a';

              if (isOptimal && currentStepIndex === 7) {
                fill = '#d1fae5';
                stroke = '#059669';
                textColor = '#065f46';
              } else if (isCurrent) {
                fill = '#fef3c7';
                stroke = '#d97706';
                textColor = '#92400e';
              } else if (isInFrontier) {
                fill = '#e0f2fe';
                stroke = '#0284c7';
                textColor = '#0369a1';
              } else if (isClosed) {
                fill = '#f1f5f9';
                stroke = '#64748b';
                textColor = '#475569';
              } else if (isStart) {
                fill = '#eff6ff';
                stroke = '#2563eb';
                textColor = '#1d4ed8';
              } else if (isGoal) {
                fill = '#fef2f2';
                stroke = '#dc2626';
                textColor = '#b91c1c';
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
                      stroke="#d97706"
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
                      stroke="#059669"
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
                    x={node.x - 18}
                    y={node.y - 31}
                    width={36}
                    height={15}
                    rx={4}
                    fill="#ffffff"
                    stroke={isCurrent ? '#d97706' : (isInFrontier ? '#0284c7' : '#cbd5e1')}
                    strokeWidth={1}
                  />
                  <text
                    x={node.x}
                    y={node.y - 20}
                    fill={isCurrent ? '#b45309' : (isInFrontier ? '#0369a1' : '#64748b')}
                    fontSize="9"
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
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '0.55rem 0.7rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.4rem',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '0.3rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4338ca' }}>
                  Min-Heap Priority Queue (Open List)
                </span>
              </div>
              <span style={{ fontSize: '0.66rem', color: '#64748b' }}>
                Sorted by f(n) = g + h
              </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>Candidate Path</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>g(n)</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>h(n)</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700, color: '#b45309' }}>f(n)</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>Frontier Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stepData.frontier.map((row, idx) => (
                    <tr 
                      key={idx}
                      style={{
                        background: row.isLowest ? '#fefce8' : 'transparent',
                        borderBottom: '1px solid #f1f5f9',
                        color: row.isLowest ? '#854d0e' : '#334155'
                      }}
                    >
                      <td style={{ padding: '0.3rem 0.4rem', fontFamily: 'monospace', fontWeight: 700 }}>
                        {row.path}
                      </td>
                      <td style={{ padding: '0.3rem 0.4rem' }}>{row.g.toFixed(1)}</td>
                      <td style={{ padding: '0.3rem 0.4rem' }}>{row.h.toFixed(1)}</td>
                      <td style={{ padding: '0.3rem 0.4rem', fontWeight: 800, color: row.isLowest ? '#b45309' : '#0f172a' }}>
                        {row.f.toFixed(1)}
                      </td>
                      <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.65rem' }}>
                        <span 
                          style={{
                            padding: '0.12rem 0.4rem',
                            borderRadius: '4px',
                            background: row.isLowest ? '#fef08a' : (row.status.includes('PRUNED') ? '#fee2e2' : (row.status.includes('OPTIMAL') ? '#d1fae5' : '#f1f5f9')),
                            color: row.isLowest ? '#854d0e' : (row.status.includes('PRUNED') ? '#991b1b' : (row.status.includes('OPTIMAL') ? '#065f46' : '#475569')),
                            border: row.isLowest ? '1px solid #fde047' : (row.status.includes('PRUNED') ? '1px solid #fca5a5' : (row.status.includes('OPTIMAL') ? '1px solid #6ee7b7' : '1px solid #e2e8f0')),
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
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid #0284c7',
              borderRadius: '6px',
              padding: '0.4rem 0.65rem',
              fontSize: '0.7rem',
              marginTop: '0.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#0284c7', fontWeight: 700 }}>
                🧮 Math Evaluation:
              </span>
              <span style={{ color: '#1d4ed8', fontFamily: 'monospace', fontWeight: 700 }}>
                {stepData.decisionFormula}
              </span>
            </div>
            <div style={{ color: '#475569', fontSize: '0.67rem' }}>
              {stepData.decisionNote}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Step Explanation Banner */}
      <div 
        style={{
          background: '#faf5ff',
          border: '1px solid #e9d5ff',
          borderLeft: '4px solid #7c3aed',
          padding: '0.45rem 0.8rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          lineHeight: 1.4,
          color: '#334155',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}
      >
        <div 
          style={{
            background: '#7c3aed',
            color: '#fff',
            padding: '0.18rem 0.5rem',
            borderRadius: '5px',
            fontSize: '0.67rem',
            fontWeight: 800,
            whiteSpace: 'nowrap'
          }}
        >
          Step {currentStepIndex} of {STEPS.length - 1}
        </div>
        <div>
          <strong style={{ color: '#6d28d9', marginRight: '0.35rem' }}>
            {stepData.title}:
          </strong>
          <span>{stepData.explanation}</span>
        </div>
      </div>
    </div>
  );
}

export default AStarSearchInteractive;
