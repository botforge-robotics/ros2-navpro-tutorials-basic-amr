#!/usr/bin/env python3
"""
Generates an ultra-crisp, mathematically exact REP 103 Right-Hand Rule and AMR
Spatial Coordinates Infographic SVG for NavPro Learning Hub Lesson 15.
"""

def generate_svg():
    width = 1280
    height = 720

    svg = []
    svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">')
    svg.append('''
  <defs>
    <!-- Dark slate background gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d" />
      <stop offset="50%" stop-color="#0e172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>

    <!-- Card Backgrounds -->
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#131d35" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#0c1322" stop-opacity="0.95" />
    </linearGradient>

    <!-- Hand Gradient -->
    <linearGradient id="handGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="50%" stop-color="#334155" />
      <stop offset="100%" stop-color="#475569" />
    </linearGradient>

    <!-- Axis Gradients -->
    <linearGradient id="xGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#f87171" />
    </linearGradient>
    <linearGradient id="yGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
    <linearGradient id="zGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>

    <!-- Robot Metallic Shading -->
    <linearGradient id="chassisTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#0891b2" />
    </linearGradient>
    <linearGradient id="chassisSide" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0e7490" />
      <stop offset="100%" stop-color="#155e75" />
    </linearGradient>
    <linearGradient id="chassisFront" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#164e63" />
      <stop offset="100%" stop-color="#083344" />
    </linearGradient>

    <!-- Drop Shadows & Glow Filters -->
    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6" />
    </filter>

    <!-- Markers for Arrows -->
    <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
    </marker>
    <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
    </marker>
    <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
    </marker>
  </defs>

  <!-- Background Base -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" />

  <!-- Subtle Perspective Grid Pattern -->
  <g opacity="0.10" stroke="#00e5ff" stroke-width="1">
    <line x1="0" y1="180" x2="1280" y2="180" />
    <line x1="0" y1="340" x2="1280" y2="340" />
    <line x1="0" y1="500" x2="1280" y2="500" />
    <line x1="0" y1="660" x2="1280" y2="660" />
    <line x1="200" y1="0" x2="200" y2="720" />
    <line x1="440" y1="0" x2="440" y2="720" />
    <line x1="640" y1="0" x2="640" y2="720" stroke-dasharray="6,6" stroke="#38bdf8" stroke-width="1.5" opacity="0.3" />
    <line x1="860" y1="0" x2="860" y2="720" />
    <line x1="1100" y1="0" x2="1100" y2="720" />
  </g>

  <!-- Header Banner -->
  <g transform="translate(640, 48)" text-anchor="middle">
    <rect x="-430" y="-30" width="860" height="60" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" filter="url(#cardShadow)" />
    <text y="-4" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" letter-spacing="0.03em">
      ROS 2 SPATIAL CONVENTIONS (REP 103 STANDARD)
    </text>
    <text y="18" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" letter-spacing="0.05em">
      RIGHT-HANDED ORTHOGONAL SYSTEM: RED = +X (FORWARD) | GREEN = +Y (LEFT) | BLUE = +Z (UP)
    </text>
  </g>

  <!-- ========================================================================= -->
  <!-- LEFT SIDE: THE RIGHT-HAND RULE INFOGRAPHIC -->
  <!-- ========================================================================= -->
  <g transform="translate(60, 105)">
    <!-- Container Card -->
    <rect width="530" height="575" rx="14" fill="url(#cardBg)" stroke="#1e293b" stroke-width="1.5" filter="url(#cardShadow)" />
    
    <!-- Title -->
    <rect x="25" y="18" width="180" height="26" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(6, 182, 212, 0.4)" stroke-width="1" />
    <text x="115" y="35" text-anchor="middle" fill="#06b6d4" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" letter-spacing="0.05em">
      PART 1: THE HUMAN HAND
    </text>
    <text x="25" y="70" fill="#ffffff" font-family="system-ui, sans-serif" font-size="19" font-weight="800">
      The Right-Hand Rule (REP 103)
    </text>
    <text x="25" y="90" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12.5">
      Hold out your right hand: Thumb = Forward (+X), Index = Left (+Y), Middle = Up (+Z).
    </text>

    <!-- Vector Hand Drawing -->
    <g transform="translate(245, 305)">
      <!-- Palm Silhouette / Base -->
      <path d="M -35 110 C -45 80, -40 45, -25 20 C -15 5, -5 -10, 0 -15 C 10 -10, 20 5, 30 20 C 40 45, 45 80, 35 110 Z" 
            fill="url(#handGrad)" stroke="#475569" stroke-width="2" opacity="0.9" />

      <!-- Curled Fingers (Ring and Pinky curled into palm) -->
      <path d="M -15 35 C -25 35, -30 50, -25 60 C -20 70, -10 65, -5 55" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
      <path d="M 0 35 C -8 35, -12 50, -8 60 C -4 70, 4 65, 8 55" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round" />

      <!-- Coordinate Center Point -->
      <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#38bdf8" stroke-width="3" />
      <text x="12" y="5" fill="#f8fafc" font-family="monospace" font-size="11.5" font-weight="bold">Origin (0,0,0)</text>

      <!-- Thumb: +X Forward (Pointing Up-Right at 30 deg, angle 330 or -30) -->
      <line x1="0" y1="0" x2="145" y2="-72" stroke="#ef4444" stroke-width="6" stroke-linecap="round" marker-end="url(#arrowRed)" filter="url(#glowRed)" />
      <!-- Roll orbital arrow around +X -->
      <path d="M 85 -60 A 16 16 0 1 1 75 -32" fill="none" stroke="#f87171" stroke-width="2" stroke-dasharray="3,3" />
      <polygon points="72,-35 80,-31 74,-27" fill="#f87171" />

      <!-- Index Finger: +Y Left (Pointing Up-Left at 150 deg, dx = -140, dy = -70) -->
      <line x1="0" y1="0" x2="-145" y2="-72" stroke="#10b981" stroke-width="6" stroke-linecap="round" marker-end="url(#arrowGreen)" filter="url(#glowGreen)" />
      <!-- Pitch orbital arrow around +Y -->
      <path d="M -85 -60 A 16 16 0 1 0 -75 -32" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="3,3" />
      <polygon points="-79,-31 -71,-35 -73,-27" fill="#34d399" />

      <!-- Middle Finger: +Z Up (Pointing Straight Up, dx = 0, dy = -145) -->
      <line x1="0" y1="0" x2="0" y2="-145" stroke="#3b82f6" stroke-width="6" stroke-linecap="round" marker-end="url(#arrowBlue)" filter="url(#glowBlue)" />
      <!-- Yaw orbital arrow around +Z -->
      <path d="M -20 -95 A 22 9 0 1 1 20 -95" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="3,3" />
      <polygon points="18,-100 24,-95 18,-90" fill="#60a5fa" />

      <!-- Labels on Axes -->
      <!-- +X Label -->
      <g transform="translate(160, -82)">
        <rect x="-10" y="-14" width="130" height="42" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" />
        <text x="0" y="2" fill="#ef4444" font-family="monospace" font-size="12.5" font-weight="900">THUMB: +X</text>
        <text x="0" y="18" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Forward / Roll (φ)</text>
      </g>

      <!-- +Y Label -->
      <g transform="translate(-230, -82)">
        <rect x="-10" y="-14" width="125" height="42" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
        <text x="0" y="2" fill="#10b981" font-family="monospace" font-size="12.5" font-weight="900">INDEX: +Y</text>
        <text x="0" y="18" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Left / Pitch (θ)</text>
      </g>

      <!-- +Z Label (Placed neatly above arrow tip, no overlap) -->
      <g transform="translate(-65, -195)">
        <rect x="-10" y="-12" width="145" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
        <text x="2" y="3" fill="#3b82f6" font-family="monospace" font-size="12.5" font-weight="900">MIDDLE: +Z</text>
        <text x="2" y="18" fill="#93c5fd" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Upward / Yaw (ψ)</text>
      </g>
    </g>

    <!-- Formula Footer Box -->
    <g transform="translate(25, 480)">
      <rect width="480" height="75" rx="8" fill="#090d16" stroke="#1e293b" stroke-width="1" />
      <text x="18" y="26" fill="#38bdf8" font-family="monospace" font-size="12.5" font-weight="bold">
        Right-Hand Cross Product: X × Y = Z
      </text>
      <text x="18" y="46" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11.5">
        Curl fingers from +X (Forward) to +Y (Left); your thumb points along +Z (Upward).
      </text>
      <text x="18" y="64" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">
        Positive rotation follows fingers curling counter-clockwise around the axis vector.
      </text>
    </g>
  </g>

  <!-- ========================================================================= -->
  <!-- RIGHT SIDE: THE AMR ROBOT SPATIAL FRAME -->
  <!-- ========================================================================= -->
  <g transform="translate(680, 105)">
    <!-- Container Card -->
    <rect width="540" height="575" rx="14" fill="url(#cardBg)" stroke="#1e293b" stroke-width="1.5" filter="url(#cardShadow)" />
    
    <!-- Title -->
    <rect x="25" y="18" width="175" height="26" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1" />
    <text x="112" y="35" text-anchor="middle" fill="#10b981" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" letter-spacing="0.05em">
      PART 2: THE MOBILE ROBOT
    </text>
    <text x="25" y="70" fill="#ffffff" font-family="system-ui, sans-serif" font-size="19" font-weight="800">
      AMR Coordinate Frame (base_link)
    </text>
    <text x="25" y="90" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12.5">
      Viewed from Rear-Port Quarter: Forward is Up-Right, Left is Up-Left.
    </text>

    <!-- Isometric 3D Robot Drawing -->
    <g transform="translate(250, 315)">
      
      <!-- Ground Shadow & Footprint Projection -->
      <polygon points="0,60 140,-10 0,-80 -140,-10" fill="#000000" opacity="0.45" />
      <!-- Dotted base_footprint circle at ground Z=0 -->
      <ellipse cx="0" cy="50" rx="42" ry="21" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,4" />
      <text x="48" y="55" fill="#06b6d4" font-family="monospace" font-size="10.5" font-weight="bold">base_footprint (Z=0)</text>

      <!-- Rear Caster Ball Wheel -->
      <circle cx="-65" cy="22" r="13" fill="#475569" stroke="#334155" stroke-width="2" />
      <circle cx="-65" cy="19" r="9" fill="#64748b" opacity="0.7" />

      <!-- Right Drive Wheel (Starboard - Far side) -->
      <g opacity="0.75">
        <ellipse cx="65" cy="-35" rx="12" ry="24" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      </g>

      <!-- Main Chassis Box (Isometric Perspective) -->
      <!-- Chassis Rear Face (facing Down-Left) -->
      <path d="M -75 0 L 0 38 L 0 -28 L -75 -66 Z" fill="url(#chassisSide)" stroke="#0e7490" stroke-width="1.5" />
      
      <!-- Chassis Right/Front Face (facing Down-Right) -->
      <path d="M 0 38 L 115 -20 L 115 -86 L 0 -28 Z" fill="url(#chassisFront)" stroke="#0e7490" stroke-width="1.5" />

      <!-- Chassis Top Plate -->
      <polygon points="0,-28 115,-86 40,-124 -75,-66" fill="url(#chassisTop)" stroke="#22d3ee" stroke-width="1.5" />
      <polygon points="8,-32 107,-82 38,-117 -62,-67" fill="#083344" opacity="0.45" />

      <!-- Top 2D LiDAR Puck (Cylinder at X=+10, Z=+18) -->
      <g transform="translate(42, -92)">
        <ellipse cx="0" cy="8" rx="22" ry="11" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
        <path d="M -22 8 L -22 -10 A 22 11 0 0 1 22 -10 L 22 8 Z" fill="#1e293b" />
        <ellipse cx="0" cy="-10" rx="22" ry="11" fill="#020617" stroke="#38bdf8" stroke-width="1.5" />
        <ellipse cx="0" cy="-10" rx="14" ry="7" fill="#06b6d4" opacity="0.5" />
        <!-- laser scan ray pulses -->
        <path d="M -35 -14 L -55 -18 M 35 -14 L 60 -18 M 28 -3 L 50 2" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8" />
      </g>

      <!-- Front Depth Camera (at Front Bumper X=+16, Z=+12) -->
      <g transform="translate(104, -58)">
        <polygon points="0,0 12,-6 12,-18 0,-12" fill="#0f172a" stroke="#0284c7" stroke-width="1.5" />
        <circle cx="6" cy="-9" r="3" fill="#38bdf8" />
      </g>

      <!-- Left Drive Wheel (Port side - Facing Viewer at Y=+0.16) -->
      <g transform="translate(-38, 18)">
        <ellipse cx="0" cy="0" rx="16" ry="32" fill="#090d16" stroke="#334155" stroke-width="2.5" />
        <ellipse cx="0" cy="0" rx="11" ry="22" fill="#1e293b" stroke="#0284c7" stroke-width="1.5" />
        <ellipse cx="0" cy="0" rx="5" ry="10" fill="#64748b" />
        <text x="-52" y="44" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Left Drive Wheel</text>
      </g>

      <!-- ===================================================================== -->
      <!-- ACTIVE TF TRIHEDRON AT base_link (0,0) -->
      <!-- ===================================================================== -->
      
      <!-- +Z Axis (Upward - STRAIGHT UP through LiDAR) -->
      <line x1="0" y1="0" x2="0" y2="-175" stroke="#3b82f6" stroke-width="6" stroke-linecap="round" marker-end="url(#arrowBlue)" filter="url(#glowBlue)" />

      <!-- +X Axis (Forward - UP-RIGHT through Front Bumper) -->
      <line x1="0" y1="0" x2="160" y2="-80" stroke="#ef4444" stroke-width="6" stroke-linecap="round" marker-end="url(#arrowRed)" filter="url(#glowRed)" />
      
      <!-- +Y Axis (Port-Side Left - UP-LEFT through Left Wheel Hub) -->
      <line x1="0" y1="0" x2="-145" y2="-72" stroke="#10b981" stroke-width="6" stroke-linecap="round" marker-end="url(#arrowGreen)" filter="url(#glowGreen)" />

      <!-- Coordinate Origin Core Sphere -->
      <circle cx="0" cy="0" r="9" fill="#ffffff" stroke="#0284c7" stroke-width="3" filter="url(#glowBlue)" />

      <!-- Labels & Velocity Metrics on Robot Axes -->
      <!-- +X Axis Label -->
      <g transform="translate(170, -95)">
        <rect x="-8" y="-12" width="140" height="46" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="1.5" />
        <text x="2" y="4" fill="#ef4444" font-family="monospace" font-size="12.5" font-weight="900">+X AXIS (Forward)</text>
        <text x="2" y="20" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Linear speed: vx (m/s)</text>
      </g>

      <!-- +Y Axis Label -->
      <g transform="translate(-235, -85)">
        <rect x="-8" y="-12" width="145" height="46" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
        <text x="2" y="4" fill="#10b981" font-family="monospace" font-size="12.5" font-weight="900">+Y AXIS (Port Left)</text>
        <text x="2" y="20" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="11" font-weight="600">vy = 0 (No Side Slip)</text>
      </g>

      <!-- +Z Axis Label (Neatly positioned at the top of +Z) -->
      <g transform="translate(15, -195)">
        <rect x="-8" y="-12" width="140" height="46" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5" />
        <text x="2" y="4" fill="#3b82f6" font-family="monospace" font-size="12.5" font-weight="900">+Z AXIS (Upward)</text>
        <text x="2" y="20" fill="#93c5fd" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Yaw Rate: ωz (rad/s)</text>
      </g>
    </g>

    <!-- Velocity Governance Card Footer -->
    <g transform="translate(25, 480)">
      <rect width="490" height="75" rx="8" fill="#090d16" stroke="#1e293b" stroke-width="1" />
      <text x="18" y="26" fill="#10b981" font-family="monospace" font-size="12.5" font-weight="bold">
        Differential Drive Non-Holonomic Kinematics:
      </text>
      <text x="18" y="46" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11.5">
        • Forward/Reverse: Commanded via linear velocity vx along +X.
      </text>
      <text x="18" y="64" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">
        • Turning/Steering: Commanded via angular velocity ωz rotating around +Z (Yaw).
      </text>
    </g>
  </g>
</svg>
''')
    return "".join(svg)

if __name__ == "__main__":
    out_svg = "ros2-navpro-tutorials-basic-amr/lms/public/assets/images/rviz_coordinate_axes.svg"
    out_dist = "ros2-navpro-tutorials-basic-amr/lms/dist/assets/images/rviz_coordinate_axes.svg"
    svg_code = generate_svg()
    with open(out_svg, "w") as f:
        f.write(svg_code)
    with open(out_dist, "w") as f:
        f.write(svg_code)
    print(f"Updated REP 103 infographic SVG: {out_svg} ({len(svg_code)} bytes)")
