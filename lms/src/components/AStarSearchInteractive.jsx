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
    title: 'Start Search at Start Node S',
    current: 'S',
    closed: [],
    frontier: [
      { path: 'S', targetNode: 'S', g: 0.0, h: 11.5, f: 11.5, status: 'Starting Point', isLowest: true }
    ],
    activeEdges: [],
    optimalPath: [],
    decisionFormula: 'Start at S: Traveled 0.0 + Est. to Goal 11.5 = Total 11.5',
    decisionNote: 'Add Start Node S to the open candidate list.',
    explanation: 'Search begins at Start Node S. Traveled distance is 0. Estimated straight-line distance to goal is 11.5. Total estimated trip starts at 11.5.'
  },
  {
    step: 1,
    chipLabel: '1: Expand S',
    title: 'Expand Node S: Test Paths to Neighbors A & D',
    current: 'S',
    closed: ['S'],
    frontier: [
      { path: 'S → A', targetNode: 'A', g: 3.0, h: 10.1, f: 13.1, status: '★ Lowest Estimate • Pick Next', isLowest: true },
      { path: 'S → D', targetNode: 'D', g: 4.0, h: 9.2, f: 13.2, status: 'Waiting in Queue', isLowest: false }
    ],
    activeEdges: ['S-A', 'S-D'],
    optimalPath: [],
    decisionFormula: 'Route via A (13.1 total) looks shorter than Route via D (13.2 total)',
    decisionNote: 'Choose S → A next because 13.1 is smaller than 13.2.',
    explanation: 'From Start S, we check neighbors A and D. Path to A has total estimate 13.1 (traveled 3 + remaining 10.1). Path to D has total estimate 13.2. A* picks the smaller estimate (A) to explore first.'
  },
  {
    step: 2,
    chipLabel: '2: Pop A',
    title: 'Expand Node A: Test Paths to B & D',
    current: 'A',
    closed: ['S', 'A'],
    frontier: [
      { path: 'S → A → B', targetNode: 'B', g: 7.0, h: 5.8, f: 12.8, status: '★ Lowest Estimate • Pick Next', isLowest: true },
      { path: 'S → D', targetNode: 'D', g: 4.0, h: 9.2, f: 13.2, status: 'Waiting in Queue', isLowest: false },
      { path: 'S → A → D', targetNode: 'D', g: 8.0, h: 9.2, f: 17.2, status: 'Too Long (cost 8 vs 4)', isLowest: false }
    ],
    activeEdges: ['S-A', 'A-B', 'A-D', 'S-D'],
    optimalPath: [],
    decisionFormula: 'Route S→A→B has lowest total estimate (12.8) in entire list!',
    decisionNote: 'Branch B is promising because estimated distance left to goal is only 5.8.',
    explanation: 'From A, we can reach B or D. Route S→A→B needs 7 traveled + 5.8 remaining = 12.8 total. This is currently the lowest estimate in the whole queue, so A* continues down this promising route!'
  },
  {
    step: 3,
    chipLabel: '3: Backtrack ↩',
    title: 'Expand B: Forward Paths Look Long → Smart Backtrack to D!',
    current: 'B',
    closed: ['S', 'A', 'B'],
    frontier: [
      { path: 'S → D', targetNode: 'D', g: 4.0, h: 9.2, f: 13.2, status: '★ Lowest Estimate • BACKTRACK ↩', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Waiting in Queue', isLowest: false },
      { path: 'S → A → D', targetNode: 'D', g: 8.0, h: 9.2, f: 17.2, status: 'Too Long', isLowest: false },
      { path: 'S → A → B → E', targetNode: 'E', g: 12.0, h: 7.1, f: 19.1, status: 'Too Long', isLowest: false }
    ],
    activeEdges: ['S-A', 'A-B', 'B-C', 'B-E', 'S-D'],
    optimalPath: [],
    decisionFormula: 'Route via D (13.2) is shorter than continuing via C (14.4) or E (19.1)',
    decisionNote: 'Smart Backtracking: Switches focus back to the waiting branch at D!',
    explanation: 'From B, continuing forward to C estimates 14.4 total, and to E estimates 19.1. Both are worse than the earlier waiting route S→D (13.2)! A* automatically backtracks to branch D, preventing wasted detours.'
  },
  {
    step: 4,
    chipLabel: '4: Pop D (Prune ✂)',
    title: 'Expand D to E: Cheaper Route Found → Cut Out Costly Path!',
    current: 'D',
    closed: ['S', 'A', 'B', 'D'],
    frontier: [
      { path: 'S → D → E', targetNode: 'E', g: 6.0, h: 7.1, f: 13.1, status: '★ Lowest Estimate • Pick Next', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Waiting in Queue', isLowest: false },
      { path: 'S → D → A', targetNode: 'A', g: 9.0, h: 10.1, f: 19.1, status: 'Too Long', isLowest: false },
      { path: 'S → A → B → E', targetNode: 'E', g: 12.0, h: 7.1, f: 19.1, status: '✂ PRUNED (cost 12 vs 6)', isLowest: false }
    ],
    activeEdges: ['S-D', 'D-E', 'S-A', 'A-B', 'B-C'],
    optimalPath: [],
    decisionFormula: 'Reaching E via D costs only 6.0 vs. 12.0 via B → Cut expensive route!',
    decisionNote: 'Reaching E via D is half the distance of reaching E via B.',
    explanation: 'From D, moving to E costs only 6.0 total distance traveled (estimate 13.1 total). This is much shorter than reaching E via B (cost 12.0). A* cuts the expensive detour and advances along S→D→E!'
  },
  {
    step: 5,
    chipLabel: '5: Expand E',
    title: 'Expand E: Advance Directly to Neighbor F',
    current: 'E',
    closed: ['S', 'A', 'B', 'D', 'E'],
    frontier: [
      { path: 'S → D → E → F', targetNode: 'F', g: 10.0, h: 3.5, f: 13.5, status: '★ Lowest Estimate • Pick Next', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Waiting in Queue', isLowest: false },
      { path: 'S → D → E → B', targetNode: 'B', g: 11.0, h: 5.8, f: 16.8, status: 'Closed (Already Visited)', isLowest: false }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F'],
    optimalPath: [],
    decisionFormula: 'Route S→D→E→F (13.5 total) is closest to Goal (only 3.5 units away)',
    decisionNote: 'Node F is right next to the Goal.',
    explanation: 'Expanding E leads to F: traveled distance is 10.0, and remaining guess to Goal is only 3.5, giving total estimate 13.5. This is the top candidate in the queue, heading straight for the Goal.'
  },
  {
    step: 6,
    chipLabel: '6: Reach G',
    title: 'From F: Reach Goal G! (Total Distance = 13.5)',
    current: 'F',
    closed: ['S', 'A', 'B', 'D', 'E', 'F'],
    frontier: [
      { path: 'S → D → E → F → G', targetNode: 'G', g: 13.5, h: 0.0, f: 13.5, status: '★ GOAL REACHED • Ready to Complete', isLowest: true },
      { path: 'S → A → B → C', targetNode: 'C', g: 11.0, h: 3.4, f: 14.4, status: 'Waiting in Queue', isLowest: false }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F', 'F-G'],
    optimalPath: ['S-D', 'D-E', 'E-F', 'F-G'],
    decisionFormula: 'Goal Reached: Traveled = 13.5, Remaining to Goal = 0.0 → Total = 13.5',
    decisionNote: 'The Goal route sits at the head of the list with zero distance left.',
    explanation: 'From F, edge to G (cost 3.5) arrives at the Goal! Distance traveled is 13.5 and remaining distance is 0.0. The complete route is placed at the top of the queue for final confirmation.'
  },
  {
    step: 7,
    chipLabel: '7: Goal Optimal ★',
    title: 'Confirm Goal G: Guaranteed Shortest Route Found!',
    current: 'G',
    closed: ['S', 'A', 'B', 'D', 'E', 'F', 'G'],
    frontier: [
      { path: 'S → D → E → F → G', targetNode: 'G', g: 13.5, h: 0.0, f: 13.5, status: '✓ GUARANTEED SHORTEST ROUTE', isLowest: true }
    ],
    activeEdges: ['S-D', 'D-E', 'E-F', 'F-G'],
    optimalPath: ['S-D', 'D-E', 'E-F', 'F-G'],
    decisionFormula: 'Shortest Route: S → D → E → F → G (Total Distance = 13.5)',
    decisionNote: 'Optimistic Guess Guarantee: No unexplored route can ever beat 13.5!',
    explanation: 'Goal node G confirmed! Because straight-line distance guesses are optimistic (never guessing longer than real physical paths), this first route reaching the goal is mathematically guaranteed to be the shortest path!'
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
              <strong>Graph Labels:</strong> Edge numbers = Travel Distance &bull; Badges = Est. Distance to Goal
            </span>
            <span style={{ color: '#1e293b' }}>
              Rule: <strong>Total Estimate = Distance Traveled + Distance to Goal</strong>
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
                  Candidate Routes Queue (Open List)
                </span>
              </div>
              <span style={{ fontSize: '0.66rem', color: '#64748b' }}>
                Sorted by Total Estimate (Lowest First)
              </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>Candidate Path</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>Traveled (g)</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>To Goal (h)</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700, color: '#b45309' }}>Total Est. (f)</th>
                    <th style={{ padding: '0.28rem 0.4rem', fontWeight: 700 }}>Search Status</th>
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
                            background: row.isLowest ? '#fef08a' : (row.status.includes('PRUNED') ? '#fee2e2' : (row.status.includes('OPTIMAL') || row.status.includes('SHORTEST') ? '#d1fae5' : '#f1f5f9')),
                            color: row.isLowest ? '#854d0e' : (row.status.includes('PRUNED') ? '#991b1b' : (row.status.includes('OPTIMAL') || row.status.includes('SHORTEST') ? '#065f46' : '#475569')),
                            border: row.isLowest ? '1px solid #fde047' : (row.status.includes('PRUNED') ? '1px solid #fca5a5' : (row.status.includes('OPTIMAL') || row.status.includes('SHORTEST') ? '1px solid #6ee7b7' : '1px solid #e2e8f0')),
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
                💡 Decision Logic:
              </span>
              <span style={{ color: '#1d4ed8', fontWeight: 700 }}>
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
