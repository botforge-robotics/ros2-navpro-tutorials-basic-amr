#!/usr/bin/env python3
"""
Generate a mathematically precise, presentation-grade SVG for ROS 2 coordinate frames
and the REP 103 right-handed convention, fixing the TF arrow issues.
"""

import math

def get_arrowhead(x1, y1, x2, y2, h=16, w=7):
    dx = x2 - x1
    dy = y2 - y1
    length = math.hypot(dx, dy)
    ux = dx / length
    uy = dy / length
    nx = -uy
    ny = ux
    bx = x2 - h * ux
    by = y2 - h * uy
    p1 = f"{x2:.1f},{y2:.1f}"
    p2 = f"{bx + w * nx:.1f},{by + w * ny:.1f}"
    p3 = f"{bx - w * nx:.1f},{by - w * ny:.1f}"
    return f"{p1} {p2} {p3}"

def generate_svg():
    # Width: 1040, Height: 440
    # Origin at (240, 240)
    ox, oy = 240, 240
    axis_len = 115
    
    # +Z: Upward
    zx, zy = ox, oy - axis_len
    z_arrow = get_arrowhead(ox, oy, zx, zy, 16, 7)
    
    # +X: Forward (down-left, 30 deg below horizontal)
    xx = ox - axis_len * math.cos(math.radians(30))
    xy = oy + axis_len * math.sin(math.radians(30))
    x_arrow = get_arrowhead(ox, oy, xx, xy, 16, 7)
    
    # +Y: Left (down-right, 30 deg below horizontal)
    yx = ox + axis_len * math.cos(math.radians(30))
    yy = oy + axis_len * math.sin(math.radians(30))
    y_arrow = get_arrowhead(ox, oy, yx, yy, 16, 7)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 440" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1120"/>
      <stop offset="50%" stop-color="#070c18"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="redAxis" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <linearGradient id="greenAxis" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="blueAxis" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <filter id="glowRed" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#ef4444" flood-opacity="0.8"/>
    </filter>
    <filter id="glowGreen" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#10b981" flood-opacity="0.8"/>
    </filter>
    <filter id="glowBlue" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#3b82f6" flood-opacity="0.8"/>
    </filter>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1040" height="440" rx="16" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Header Banner -->
  <g transform="translate(520, 30)">
    <text x="0" y="0" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" text-anchor="middle" letter-spacing="1.5">ROS 2 SPATIAL CONVENTION (REP 103): RIGHT-HANDED COORDINATE FRAME</text>
    <text x="0" y="18" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="11" text-anchor="middle">Orthogonal Reference Trihedron: Red = X (Forward), Green = Y (Left), Blue = Z (Up)</text>
  </g>

  <!-- Left: 3D Coordinate Trihedron with AMR Ghost Overlay -->
  <g id="trihedron_viewport">
    <!-- Ground Grid Isometric Lattice -->
    <path d="M {ox - 160:.1f},{oy - 160 * math.sin(math.radians(30)):.1f} L {ox:.1f},{oy:.1f} L {ox + 160:.1f},{oy - 160 * math.sin(math.radians(30)):.1f}" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>
    <path d="M {ox - 130:.1f},{oy + 130 * math.sin(math.radians(30)):.1f} L {ox:.1f},{oy:.1f} L {ox + 130:.1f},{oy + 130 * math.sin(math.radians(30)):.1f}" stroke="#334155" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

    <!-- Subtle Ghost AMR Base Projection at Origin -->
    <g opacity="0.45" stroke="#06b6d4" stroke-width="1.5" fill="#083344" fill-opacity="0.3">
      <polygon points="{ox - 55 * math.cos(math.radians(30)) - 35 * math.cos(math.radians(30)):.1f},{oy + 55 * math.sin(math.radians(30)) - 35 * math.sin(math.radians(30)):.1f}
                      {ox + 55 * math.cos(math.radians(30)) - 35 * math.cos(math.radians(30)):.1f},{oy - 55 * math.sin(math.radians(30)) - 35 * math.sin(math.radians(30)):.1f}
                      {ox + 55 * math.cos(math.radians(30)) + 35 * math.cos(math.radians(30)):.1f},{oy - 55 * math.sin(math.radians(30)) + 35 * math.sin(math.radians(30)):.1f}
                      {ox - 55 * math.cos(math.radians(30)) + 35 * math.cos(math.radians(30)):.1f},{oy + 55 * math.sin(math.radians(30)) + 35 * math.sin(math.radians(30)):.1f}"/>
      <text x="{ox - 70 * math.cos(math.radians(30)):.1f}" y="{oy + 70 * math.sin(math.radians(30)) + 14:.1f}" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">AMR Front</text>
    </g>

    <!-- +Z AXIS (BLUE - VERTICAL UPWARD) -->
    <line x1="{ox}" y1="{oy}" x2="{zx:.1f}" y2="{zy:.1f}" stroke="url(#blueAxis)" stroke-width="6" stroke-linecap="round" filter="url(#glowBlue)"/>
    <polygon points="{z_arrow}" fill="#60a5fa"/>
    <g transform="translate({zx}, {zy - 18})">
      <rect x="-60" y="-12" width="120" height="22" rx="5" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="0" y="3" fill="#60a5fa" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">+Z Axis (Up)</text>
    </g>

    <!-- +Y AXIS (GREEN - PORT / LEFT LATERAL) -->
    <line x1="{ox}" y1="{oy}" x2="{yx:.1f}" y2="{yy:.1f}" stroke="url(#greenAxis)" stroke-width="6" stroke-linecap="round" filter="url(#glowGreen)"/>
    <polygon points="{y_arrow}" fill="#34d399"/>
    <g transform="translate({yx + 14:.1f}, {yy + 14:.1f})">
      <rect x="-10" y="-12" width="115" height="22" rx="5" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
      <text x="47" y="3" fill="#34d399" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">+Y Axis (Left)</text>
    </g>

    <!-- +X AXIS (RED - FORWARD LONGITUDINAL) -->
    <line x1="{ox}" y1="{oy}" x2="{xx:.1f}" y2="{xy:.1f}" stroke="url(#redAxis)" stroke-width="6" stroke-linecap="round" filter="url(#glowRed)"/>
    <polygon points="{x_arrow}" fill="#f87171"/>
    <g transform="translate({xx - 14:.1f}, {xy + 14:.1f})">
      <rect x="-125" y="-12" width="125" height="22" rx="5" fill="#0f172a" stroke="#ef4444" stroke-width="1.5"/>
      <text x="-62" y="3" fill="#f87171" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">+X Axis (Forward)</text>
    </g>

    <!-- Center Origin Sphere (0,0,0) -->
    <circle cx="{ox}" cy="{oy}" r="9" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="{ox}" cy="{oy}" r="4" fill="#00e5ff"/>
    <rect x="{ox - 55}" y="{oy + 14}" width="110" height="20" rx="4" fill="#090d16" stroke="#475569" stroke-width="1"/>
    <text x="{ox}" y="{oy + 28}" fill="#94a3b8" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">base_link (0,0,0)</text>
  </g>

  <!-- Right: REP 103 Right-Hand Rule & Standard Explanation Panels -->
  <g transform="translate(490, 75)">
    <!-- Right-Hand Rule Visual Card -->
    <g transform="translate(0, 0)" filter="url(#cardShadow)">
      <rect width="510" height="76" rx="8" fill="url(#cardGrad)" stroke="#38bdf8" stroke-width="1.5"/>
      <rect width="6" height="76" rx="3" fill="#38bdf8"/>
      <text x="22" y="24" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">🖐️ THE RIGHT-HAND RULE (REP 103 CONVENTION)</text>
      <text x="22" y="44" fill="#f1f5f9" font-family="system-ui, sans-serif" font-size="11.5">Extend thumb, index, and middle finger of your right hand at 90° right angles:</text>
      <text x="22" y="63" fill="#cbd5e1" font-family="monospace" font-size="11">
        <tspan fill="#f87171" font-weight="bold">Thumb = +X (Forward)</tspan>  |  
        <tspan fill="#34d399" font-weight="bold">Index = +Y (Left)</tspan>  |  
        <tspan fill="#60a5fa" font-weight="bold">Middle = +Z (Up)</tspan>
      </text>
    </g>

    <!-- Red: X Axis Card -->
    <g transform="translate(0, 86)" filter="url(#cardShadow)">
      <rect width="510" height="70" rx="8" fill="url(#cardGrad)" stroke="#ef4444" stroke-width="1.2"/>
      <rect width="6" height="70" rx="3" fill="#ef4444"/>
      <circle cx="28" cy="24" r="10" fill="#ef4444" fill-opacity="0.2"/>
      <text x="28" y="28" fill="#f87171" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">X</text>
      <text x="48" y="24" fill="#f87171" font-family="monospace" font-size="13" font-weight="bold">RED = X AXIS (LONGITUDINAL / FORWARD)</text>
      <text x="48" y="43" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">Points Forward towards the front bumper / driving trajectory.</text>
      <text x="48" y="58" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Linear velocity: <tspan fill="#f87171" font-family="monospace">v_x (m/s)</tspan>  |  Rotation around X: Roll (tilt)</text>
    </g>

    <!-- Green: Y Axis Card -->
    <g transform="translate(0, 166)" filter="url(#cardShadow)">
      <rect width="510" height="70" rx="8" fill="url(#cardGrad)" stroke="#10b981" stroke-width="1.2"/>
      <rect width="6" height="70" rx="3" fill="#10b981"/>
      <circle cx="28" cy="24" r="10" fill="#10b981" fill-opacity="0.2"/>
      <text x="28" y="28" fill="#34d399" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">Y</text>
      <text x="48" y="24" fill="#34d399" font-family="monospace" font-size="13" font-weight="bold">GREEN = Y AXIS (LATERAL / PORT-SIDE LEFT)</text>
      <text x="48" y="43" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">Points Left across the wheel separation track (+Y = Left Wheel, -Y = Right Wheel).</text>
      <text x="48" y="58" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Linear velocity: <tspan fill="#34d399" font-family="monospace">v_y = 0</tspan> (non-holonomic constraint)  |  Rotation around Y: Pitch</text>
    </g>

    <!-- Blue: Z Axis Card -->
    <g transform="translate(0, 246)" filter="url(#cardShadow)">
      <rect width="510" height="70" rx="8" fill="url(#cardGrad)" stroke="#3b82f6" stroke-width="1.2"/>
      <rect width="6" height="70" rx="3" fill="#3b82f6"/>
      <circle cx="28" cy="24" r="10" fill="#3b82f6" fill-opacity="0.2"/>
      <text x="28" y="28" fill="#60a5fa" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">Z</text>
      <text x="48" y="24" fill="#60a5fa" font-family="monospace" font-size="13" font-weight="bold">BLUE = Z AXIS (VERTICAL / UPWARD)</text>
      <text x="48" y="43" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">Points Upward orthogonal to the floor ground plane.</text>
      <text x="48" y="58" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Linear velocity: <tspan fill="#60a5fa" font-family="monospace">v_z = 0</tspan>  |  Rotation around Z: Yaw steering (<tspan fill="#60a5fa" font-family="monospace">w_z rad/s</tspan>)</text>
    </g>
  </g>
</svg>"""
    return svg

def main():
    svg_content = generate_svg()
    paths = [
        'ros2-navpro-tutorials-basic-amr/lms/public/assets/images/rviz_coordinate_axes.svg',
        'ros2-navpro-tutorials-basic-amr/lms/dist/assets/images/rviz_coordinate_axes.svg'
    ]
    for p in paths:
        with open(p, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print("Updated:", p)

if __name__ == '__main__':
    main()
