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
  S: { x: 65, y: 145, h: 11.5, label: 'S', fullLabel: 'Start (S)', badgePos: 'top' },
  A: { x: 185, y: 85, h: 10.1, label: 'A', fullLabel: 'Node A', badgePos: 'top' },
  D: { x: 185, y: 205, h: 9.2, label: 'D', fullLabel: 'Node D', badgePos: 'bottom' },
  B: { x: 330, y: 85, h: 5.8, label: 'B', fullLabel: 'Node B', badgePos: 'top' },
  E: { x: 330, y: 205, h: 7.1, label: 'E', fullLabel: 'Node E', badgePos: 'bottom' },
  C: { x: 470, y: 85, h: 3.4, label: 'C', fullLabel: 'Node C', badgePos: 'top' },
  F: { x: 470, y: 205, h: 3.5, label: 'F', fullLabel: 'Node F', badgePos: 'bottom' },
  G: { x: 555, y: 145, h: 0.0, label: 'G', fullLabel: 'Goal (G)', badgePos: 'top' }
};

const EDGES = [
  { from: 'S', to: 'A', cost: 3.0, midX: 125, midY: 115 },
  { from: 'S', to: 'D', cost: 4.0, midX: 125, midY: 175 },
  { from: 'A', to: 'B', cost: 4.0, midX: 257, midY: 85 },
  { from: 'A', to: 'D', cost: 5.0, midX: 185, midY: 145 },
  { from: 'D', to: 'E', cost: 2.0, midX: 257, midY: 205 },
  { from: 'B', to: 'C', cost: 4.0, midX: 400, midY: 85 },
  { from: 'B', to: 'E', cost: 5.0, midX: 330, midY: 145 },
  { from: 'E', to: 'F', cost: 4.0, midX: 400, midY: 205 },
  { from: 'F', to: 'G', cost: 3.5, midX: 512, midY: 175 }
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
        @keyframes astarSolidHalo {
          0%, 100% {
            opacity: 0.95;
            stroke-width: 2;
          }
          50% {
            opacity: 0.4;
            stroke-width: 3.2;
          }
        }
        @keyframes astarEdgeGlow {
          0%, 100% {
            stroke-opacity: 1;
          }
          50% {
            stroke-opacity: 0.6;
          }
        }
        @keyframes astarGlowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(5, 150, 105, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(5, 150, 105, 0.8));
          }
        }
        .astar-edge-active {
          stroke: #d97706 !important;
          stroke-width: 3.5 !important;
          stroke-dasharray: none !important;
          animation: astarEdgeGlow 1.8s ease-in-out infinite !important;
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
        {/* Left Side: SVG Graph Stage (Card with Dedicated Header Legend + Canvas + Footer Key) */}
        <div 
          onClick={handleNext}
          title="Click anywhere inside graph to advance to next step"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: currentStepIndex < STEPS.length - 1 ? 'pointer' : 'default',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}
        >
          {/* Dedicated Header Legend Toolbar (Outside & Above SVG Canvas) */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.35rem 0.65rem',
              background: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              fontSize: '0.68rem',
              color: '#334155'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#f59e0b', border: '1.5px solid #d97706', display: 'inline-block' }} />
                <span>Active</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#38bdf8', border: '1.5px solid #0284c7', display: 'inline-block' }} />
                <span>Frontier</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#f1f5f9', border: '1.5px solid #94a3b8', display: 'inline-block' }} />
                <span>Closed</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#34d399', border: '1.5px solid #059669', display: 'inline-block' }} />
                <span>Optimal</span>
              </span>
            </div>
            {currentStepIndex < STEPS.length - 1 ? (
              <span style={{ color: '#4f46e5', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.67rem' }}>
                <MousePointerClick size={12} /> Click to step
              </span>
            ) : (
              <span style={{ color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.67rem' }}>
                <CheckCircle2 size={12} /> Optimal Solved
              </span>
            )}
          </div>

          {/* SVG Canvas Area */}
          <div style={{ flex: 1, position: 'relative', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
            <svg 
              viewBox="0 0 620 290" 
              style={{ width: '100%', height: '100%', maxHeight: '330px' }}
            >
              <defs>
                <pattern id="astarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                </pattern>
              </defs>

              {/* Background Blueprint Grid */}
              <rect width="620" height="290" fill="url(#astarGrid)" />

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

                if (isOptimal) {
                  edgeClass = 'astar-edge-optimal';
                  stroke = '#059669';
                  strokeWidth = 4.5;
                } else if (isActive) {
                  edgeClass = 'astar-edge-active';
                  stroke = '#d97706';
                  strokeWidth = 3.5;
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
                      className={edgeClass}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    {/* Cost Badge */}
                    <rect
                      x={edge.midX - 14}
                      y={edge.midY - 9}
                      width={28}
                      height={18}
                      rx={4}
                      fill="#ffffff"
                      stroke={isOptimal ? '#059669' : (isActive ? '#d97706' : '#cbd5e1')}
                      strokeWidth={isActive || isOptimal ? 1.8 : 1.2}
                    />
                    <text
                      x={edge.midX}
                      y={edge.midY + 4}
                      fill={isOptimal ? '#059669' : (isActive ? '#b45309' : '#475569')}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
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
                let badgeStroke = '#e2e8f0';
                let badgeFill = '#ffffff';
                let badgeText = '#64748b';

                if (isOptimal && currentStepIndex === 7) {
                  fill = '#d1fae5';
                  stroke = '#059669';
                  textColor = '#065f46';
                  badgeStroke = '#059669';
                  badgeFill = '#ecfdf5';
                  badgeText = '#047857';
                } else if (isCurrent) {
                  fill = '#fef3c7';
                  stroke = '#d97706';
                  textColor = '#92400e';
                  badgeStroke = '#d97706';
                  badgeFill = '#fffbeb';
                  badgeText = '#b45309';
                } else if (isInFrontier) {
                  fill = '#e0f2fe';
                  stroke = '#0284c7';
                  textColor = '#0369a1';
                  badgeStroke = '#0284c7';
                  badgeFill = '#f0f9ff';
                  badgeText = '#0284c7';
                } else if (isClosed) {
                  fill = '#f1f5f9';
                  stroke = '#94a3b8';
                  textColor = '#475569';
                  badgeStroke = '#cbd5e1';
                  badgeFill = '#ffffff';
                  badgeText = '#64748b';
                } else if (isStart) {
                  fill = '#eff6ff';
                  stroke = '#2563eb';
                  textColor = '#1d4ed8';
                  badgeStroke = '#2563eb';
                  badgeFill = '#eff6ff';
                  badgeText = '#1d4ed8';
                } else if (isGoal) {
                  fill = '#fef2f2';
                  stroke = '#dc2626';
                  textColor = '#b91c1c';
                  badgeStroke = '#dc2626';
                  badgeFill = '#fef2f2';
                  badgeText = '#b91c1c';
                }

                const isTopBadge = node.badgePos === 'top';
                const badgeY = isTopBadge ? node.y - 32 : node.y + 32;

                return (
                  <g key={id} style={{ transition: 'all 0.3s ease' }}>
                    {/* Active/Popped Node Solid Halo (NO Dashes / NO Swarming Dots) */}
                    {isCurrent && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={25}
                        fill="rgba(245, 158, 11, 0.15)"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        style={{ animation: 'astarSolidHalo 2s ease-in-out infinite' }}
                      />
                    )}

                    {/* Optimal Path Outer Halo */}
                    {isOptimal && currentStepIndex === 7 && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={24}
                        fill="rgba(5, 150, 105, 0.12)"
                        stroke="#059669"
                        strokeWidth={2}
                      />
                    )}

                    {/* Main Node Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={18}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isCurrent || isOptimal ? 3 : 2}
                    />

                    {/* Node Identifier Label */}
                    <text
                      x={node.x}
                      y={node.y + 4.5}
                      fill={textColor}
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                      {id}
                    </text>

                    {/* Start / Goal Sub-labels */}
                    {isStart && (
                      <text
                        x={node.x}
                        y={node.y + 30}
                        fill="#2563eb"
                        fontSize="9.5"
                        fontWeight="bold"
                        textAnchor="middle"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        START
                      </text>
                    )}
                    {isGoal && (
                      <text
                        x={node.x}
                        y={node.y + 30}
                        fill="#dc2626"
                        fontSize="9.5"
                        fontWeight="bold"
                        textAnchor="middle"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        GOAL
                      </text>
                    )}

                    {/* Heuristic Pill (Admissible Estimate to Goal) */}
                    <rect
                      x={node.x - 21}
                      y={badgeY - 9}
                      width={42}
                      height={18}
                      rx={4}
                      fill={badgeFill}
                      stroke={badgeStroke}
                      strokeWidth={isCurrent || isInFrontier || (isOptimal && currentStepIndex === 7) ? 1.5 : 1}
                    />
                    <text
                      x={node.x}
                      y={badgeY + 4}
                      fill={badgeText}
                      fontSize="9.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                      h={node.h.toFixed(1)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Educational Graph Key / Formula Strip at Bottom of Left Stage */}
          <div 
            style={{
              padding: '0.28rem 0.65rem',
              background: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              fontSize: '0.66rem',
              color: '#475569',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>
              <strong>Graph Labels:</strong> Edge numbers = Cost <em>g(u,v)</em> &bull; Pills = Heuristic <em>h(n)</em>
            </span>
            <span style={{ color: '#1e293b' }}>
              Formula: <strong>f(n) = g(n) + h(n)</strong>
            </span>
          </div>
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
