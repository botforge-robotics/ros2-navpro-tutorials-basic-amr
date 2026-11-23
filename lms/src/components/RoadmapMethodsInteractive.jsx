import React, { useState } from 'react';
import { Eye, Shield, Scissors, Grid, Sparkles, ChevronRight } from 'lucide-react';

const METHODS = [
  {
    id: 'visibility',
    name: '1. Visibility Graph',
    badge: 'Shortest Distance',
    color: '#38bdf8',
    icon: Eye,
    title: 'Visibility Graph: Interconnecting Visible Vertices',
    metricPath: 'Shortest (Optimal)',
    metricClearance: 'Minimal (Grazes Corners)',
    metricComplexity: 'O(V²)',
    points: [
      'Connects Start, Goal, and all obstacle polygon vertices with collision-free lines.',
      'Guarantees globally shortest Euclidean path from Start to Goal.',
      'Paths graze obstacle vertices closely; requires obstacle inflation in practice.'
    ],
    explanation: 'The Visibility Graph produces the mathematically shortest path. However, because it hugs obstacle corners with zero clearance, robots must inflate obstacles first!'
  },
  {
    id: 'voronoi',
    name: '2. Voronoi Diagram',
    badge: 'Maximum Clearance',
    color: '#10b981',
    icon: Shield,
    title: 'Voronoi Diagram: Free-Space Equidistant Bisectors',
    metricPath: 'Sub-Optimal (Longer)',
    metricClearance: 'Maximized (Equidistant)',
    metricComplexity: 'O(V log V)',
    points: [
      'Edges are lines and parabolas equidistant from the nearest two obstacle boundaries.',
      'Maximizes lateral safety clearance from walls and racking columns.',
      'Recommended for heavy warehouse AMRs carrying high-value fragile payloads.'
    ],
    explanation: 'Voronoi graphs prioritize robot safety over distance. Paths run down the dead center of warehouse aisles with maximum distance from obstacles on all sides.'
  },
  {
    id: 'exact_cell',
    name: '3. Exact Cell Decomp',
    badge: 'Convex Slices',
    color: '#f59e0b',
    icon: Scissors,
    title: 'Exact Cell Decomposition: Vertical Trapezoidal Slicing',
    metricPath: 'Piecewise Linear',
    metricClearance: 'Moderate',
    metricComplexity: 'O(V log V)',
    points: [
      'Extends vertical line segments from each vertex to partition space into convex trapezoids.',
      'Convexity Guarantee: Any two points inside the same cell can connect via a straight line.',
      'A dual adjacency graph is formed by connecting cell centroids through boundary portals.'
    ],
    explanation: 'Exact cell decomposition splits free space into non-overlapping convex polygons. Graph search quickly routes the robot through an ordered channel of adjacent cells.'
  },
  {
    id: 'approx_cell',
    name: '4. Approx Quadtree',
    badge: 'Hierarchical Mesh',
    color: '#a855f7',
    icon: Grid,
    title: 'Approximate Cell Decomposition: Recursive Quadtrees',
    metricPath: 'Grid Approximation',
    metricClearance: 'Tunable by Resolution',
    metricComplexity: 'Hierarchical O(log N)',
    points: [
      'Recursively partitions the 2D bounding box into 4 equal quadrants.',
      'Classifies cells into 3 states: Empty (Free), Full (Occupied), or Mixed (Boundary).',
      'Mixed cells are recursively subdivided until a free traversable corridor is unlocked.'
    ],
    explanation: 'Hierarchical quadtree decomposition adapts spatial resolution to obstacle density. It serves as the foundational model for multi-resolution 2D costmaps in Nav2!'
  }
];

export function RoadmapMethodsInteractive() {
  const [activeMethodId, setActiveMethodId] = useState('visibility');

  const method = METHODS.find(m => m.id === activeMethodId) || METHODS[0];

  return (
    <div 
      className="roadmap-interactive-deck"
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
              background: method.color,
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
            {method.badge}
          </span>
          <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>
            {method.title}
          </strong>
        </div>

        {/* Method Switcher Tabs */}
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {METHODS.map(m => {
            const isSel = m.id === activeMethodId;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMethodId(m.id)}
                style={{
                  padding: '0.25rem 0.55rem',
                  borderRadius: '6px',
                  border: isSel ? `1.5px solid ${m.color}` : '1px solid #334155',
                  background: isSel ? 'rgba(15, 23, 42, 0.9)' : '#1e293b',
                  color: isSel ? m.color : '#94a3b8',
                  fontSize: '0.7rem',
                  fontWeight: isSel ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {m.name.split('.')[1].trim()}
              </button>
            );
          })}
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
        {/* Left Column: Properties & Metrics */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.35rem'
          }}
        >
          {/* Algorithmic Properties Card */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: `1px solid ${method.color}33`,
              borderRadius: '8px',
              padding: '0.45rem 0.6rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: method.color, marginBottom: '0.3rem' }}>
              Algorithmic Mechanics
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.71rem', lineHeight: 1.4, color: '#e2e8f0' }}>
              {method.points.map((pt, pidx) => (
                <li key={pidx}>{pt}</li>
              ))}
            </ul>
          </div>

          {/* Tradeoff Metrics Card */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '0.4rem 0.55rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.3rem',
              textAlign: 'center'
            }}
          >
            <div style={{ padding: '0.2rem', background: '#1e293b', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Path Length</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#38bdf8' }}>{method.metricPath}</div>
            </div>
            <div style={{ padding: '0.2rem', background: '#1e293b', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Safety Clearance</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#10b981' }}>{method.metricClearance}</div>
            </div>
            <div style={{ padding: '0.2rem', background: '#1e293b', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Complexity</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#f59e0b' }}>{method.metricComplexity}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Big SVG Roadmap Visual */}
        <div 
          style={{
            position: 'relative',
            background: 'rgba(2, 6, 23, 0.85)',
            border: `1px solid ${method.color}44`,
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <svg viewBox="0 0 520 280" style={{ width: '100%', height: '100%', maxHeight: '260px' }}>
            {/* Start and Goal Poses */}
            <circle cx="50" cy="140" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="50" y="144" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">S</text>

            <circle cx="470" cy="140" r="10" fill="#059669" stroke="#34d399" strokeWidth="2" />
            <text x="470" y="144" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">G</text>

            {/* Static Obstacles */}
            <polygon points="160,50 250,50 250,110 160,110" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <polygon points="280,160 380,160 380,230 280,230" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <polygon points="180,180 230,180 230,230 180,230" fill="#334155" stroke="#64748b" strokeWidth="2" />

            {/* METHOD 1: VISIBILITY GRAPH */}
            {activeMethodId === 'visibility' && (
              <g>
                {/* Visible edges */}
                <g stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" opacity="0.45">
                  <line x1="50" y1="140" x2="160" y2="50" />
                  <line x1="50" y1="140" x2="160" y2="110" />
                  <line x1="50" y1="140" x2="180" y2="180" />
                  <line x1="160" y1="50" x2="250" y2="50" />
                  <line x1="250" y1="50" x2="470" y2="140" />
                  <line x1="160" y1="110" x2="250" y2="110" />
                  <line x1="250" y1="110" x2="280" y2="160" />
                  <line x1="250" y1="110" x2="470" y2="140" />
                  <line x1="180" y1="180" x2="280" y2="160" />
                  <line x1="280" y1="160" x2="380" y2="160" />
                  <line x1="380" y1="160" x2="470" y2="140" />
                </g>
                {/* Shortest Path in Green */}
                <polyline points="50,140 160,110 250,110 470,140" fill="none" stroke="#10b981" strokeWidth="3" />
                <circle cx="160" cy="110" r="4" fill="#10b981" />
                <circle cx="250" cy="110" r="4" fill="#10b981" />
                <text x="250" y="130" fill="#34d399" fontSize="10" fontWeight="bold">Shortest Path (Grazes Vertices)</text>
              </g>
            )}

            {/* METHOD 2: VORONOI DIAGRAM */}
            {activeMethodId === 'voronoi' && (
              <g>
                {/* Bisector curves */}
                <path d="M 50 140 Q 110 140 150 150 Q 210 140 265 135 Q 320 120 400 120 L 470 140" fill="none" stroke="#10b981" strokeWidth="3" />
                {/* Extra bisector branches */}
                <path d="M 150 150 L 150 270 M 265 135 L 265 10 M 320 120 L 320 10 M 400 120 L 400 270" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.6" />
                <text x="260" y="155" fill="#34d399" fontSize="10" fontWeight="bold">Equidistant Central Bisector (Max Clearance)</text>
              </g>
            )}

            {/* METHOD 3: EXACT CELL DECOMPOSITION */}
            {activeMethodId === 'exact_cell' && (
              <g>
                {/* Vertical Slicing Lines */}
                <g stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4,3">
                  <line x1="160" y1="10" x2="160" y2="270" />
                  <line x1="250" y1="10" x2="250" y2="270" />
                  <line x1="280" y1="10" x2="280" y2="270" />
                  <line x1="380" y1="10" x2="380" y2="270" />
                  <line x1="180" y1="180" x2="180" y2="270" />
                  <line x1="230" y1="180" x2="230" y2="270" />
                </g>
                {/* Centroid Path */}
                <polyline points="50,140 105,140 160,145 205,145 250,135 265,135 280,135 330,135 380,135 425,135 470,140" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="260" y="155" fill="#fbbf24" fontSize="10" fontWeight="bold">Trapezoidal Centroid Trajectory</text>
              </g>
            )}

            {/* METHOD 4: APPROXIMATE CELL DECOMPOSITION (QUADTREES) */}
            {activeMethodId === 'approx_cell' && (
              <g>
                {/* Quadtree grid subdivision lines */}
                <g stroke="#a855f7" strokeWidth="1" opacity="0.65">
                  <line x1="260" y1="10" x2="260" y2="270" />
                  <line x1="10" y1="140" x2="510" y2="140" />
                  {/* Sub-quadrants around obstacles */}
                  <line x1="135" y1="10" x2="135" y2="140" />
                  <line x1="10" y1="75" x2="260" y2="75" />
                  <line x1="385" y1="140" x2="385" y2="270" />
                  <line x1="260" y1="205" x2="510" y2="205" />
                </g>
                {/* Colored cells: Free (Blue), Occupied (Red), Mixed (Amber) */}
                <rect x="160" y="50" width="90" height="60" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="1" />
                <rect x="280" y="160" width="100" height="70" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="1" />
                <rect x="135" y="75" width="25" height="65" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1" />
                {/* Path through free cells */}
                <polyline points="50,140 100,120 200,125 260,125 320,125 420,120 470,140" fill="none" stroke="#c084fc" strokeWidth="2.5" />
                <text x="260" y="112" fill="#d8b4fe" fontSize="10" fontWeight="bold">Hierarchical Quadtree Free Path</text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Bottom Explanation Banner */}
      <div 
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          borderLeft: `3px solid ${method.color}`,
          padding: '0.35rem 0.6rem',
          borderRadius: '4px',
          fontSize: '0.72rem',
          lineHeight: 1.35,
          color: '#e2e8f0'
        }}
      >
        <span style={{ color: method.color, fontWeight: 700, marginRight: '0.35rem' }}>
          💡 Strategy Insight:
        </span>
        {method.explanation}
      </div>
    </div>
  );
}

export default RoadmapMethodsInteractive;
