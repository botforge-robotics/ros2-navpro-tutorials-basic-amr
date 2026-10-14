import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reinventing The Wheel - Robotics Edition</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1920px;
      height: 1080px;
      background: radial-gradient(circle at 50% 20%, #0f172a 0%, #070c18 60%, #02050b 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif;
      color: #f8fafc;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Ambient background grid */
    .bg-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }

    /* Ambient soft glow orbs */
    .glow-amber {
      position: absolute;
      top: 250px;
      right: 250px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
      filter: blur(60px);
      pointer-events: none;
    }
    .glow-cyan {
      position: absolute;
      top: 200px;
      left: 150px;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 70%);
      filter: blur(50px);
      pointer-events: none;
    }

    /* Header */
    .header {
      padding: 36px 80px 10px;
      text-align: center;
      position: relative;
      z-index: 10;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(239, 68, 68, 0.14);
      border: 1px solid rgba(239, 68, 68, 0.35);
      padding: 6px 18px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #f87171;
      margin-bottom: 10px;
    }
    .title {
      font-size: 42px;
      font-weight: 900;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 18px;
      color: #94a3b8;
      max-width: 950px;
      margin: 0 auto;
    }

    /* Main Scene Area */
    .scene-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 80px 30px;
      position: relative;
      z-index: 10;
    }

    .canvas-card {
      width: 1760px;
      height: 800px;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 28px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Speech Bubble Styling */
    .speech-bubble {
      position: absolute;
      background: #ffffff;
      color: #0f172a;
      border-radius: 20px;
      padding: 16px 24px;
      font-weight: 800;
      line-height: 1.35;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
      z-index: 30;
    }
    .speech-bubble::after {
      content: '';
      position: absolute;
      border-style: solid;
    }

    /* Bubble 1: "No thanks!" */
    .bubble-no-thanks {
      top: 110px;
      left: 770px;
      border: 3.5px solid #ef4444;
      color: #b91c1c;
      font-size: 26px;
      font-weight: 900;
    }
    .bubble-no-thanks::after {
      bottom: -18px;
      left: 50px;
      border-width: 18px 14px 0 0;
      border-color: #ffffff transparent transparent transparent;
    }

    /* Bubble 2: "We are too busy..." */
    .bubble-too-busy {
      top: 90px;
      right: 140px;
      border: 3.5px solid #f59e0b;
      color: #0f172a;
      max-width: 460px;
      font-size: 20px;
    }
    .bubble-too-busy::after {
      bottom: -18px;
      left: 70px;
      border-width: 18px 16px 0 0;
      border-color: #ffffff transparent transparent transparent;
    }

    /* Bubble 3: Friendly ROS offering */
    .bubble-offer {
      top: 105px;
      left: 170px;
      border: 3.5px solid #0ea5e9;
      color: #0369a1;
      max-width: 420px;
      font-size: 18px;
    }
    .bubble-offer::after {
      bottom: -18px;
      left: 90px;
      border-width: 18px 0 0 14px;
      border-color: #ffffff transparent transparent transparent;
    }

    /* Ground track line */
    .ground-line {
      position: absolute;
      bottom: 155px;
      left: 50px;
      right: 50px;
      height: 4px;
      background: linear-gradient(90deg, #334155, #64748b, #334155);
      border-radius: 2px;
    }

    /* Bottom footer pill */
    .bottom-tag {
      position: absolute;
      bottom: 25px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 12px 28px;
      border-radius: 9999px;
      font-size: 15px;
      color: #e2e8f0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    .highlight-red { color: #f87171; font-weight: 800; }
    .highlight-green { color: #34d399; font-weight: 800; }
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="glow-amber"></div>
  <div class="glow-cyan"></div>

  <!-- Header -->
  <div class="header">
    <div class="eyebrow">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      The Classic Robotics Dilemma
    </div>
    <h1 class="title">Stop Reinventing the Wheel!</h1>
    <p class="subtitle">Why robotics developers spend years building custom plumbing instead of using existing battle-tested standards.</p>
  </div>

  <!-- Scene Canvas -->
  <div class="scene-container">
    <div class="canvas-card">

      <!-- Speech Bubble: Friendly Offering -->
      <div class="speech-bubble bubble-offer">
        👋 &ldquo;Hey! Take these round wheels! ROS 2 gives you drivers, SLAM &amp; Nav2 out of the box!&rdquo;
      </div>

      <!-- Speech Bubble: "No thanks!" -->
      <div class="speech-bubble bubble-no-thanks">
        ✋ &ldquo;No thanks!&rdquo;
      </div>

      <!-- Speech Bubble: "We are too busy" -->
      <div class="speech-bubble bubble-too-busy">
        😰 &ldquo;We are too busy writing our own serial motor drivers and socket math!&rdquo;
      </div>

      <!-- Ground line -->
      <div class="ground-line"></div>

      <!-- SVG Main Characters & Robotics Cart -->
      <svg width="1760" height="800" viewBox="0 0 1760 800" fill="none" style="position: absolute; inset: 0;">
        
        <!-- ======================================================== -->
        <!-- LEFT: THE HELPFUL ENGINEER OFFERING ROUND ROS 2 WHEELS  -->
        <!-- ======================================================== -->
        <g id="helpful-engineer" transform="translate(190, 180)">
          <!-- Glowing aura around wheels -->
          <circle cx="170" cy="300" r="120" fill="url(#cyanGlow)" opacity="0.6"/>
          
          <!-- Round Wheel 1 (Upper held wheel) -->
          <g transform="translate(170, 220)">
            <circle cx="0" cy="0" r="75" fill="#0f172a" stroke="#0ea5e9" stroke-width="8"/>
            <circle cx="0" cy="0" r="45" fill="#1e293b" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 4"/>
            <circle cx="0" cy="0" r="16" fill="#38bdf8"/>
            <!-- Spokes -->
            <line x1="0" y1="-75" x2="0" y2="75" stroke="#38bdf8" stroke-width="3"/>
            <line x1="-75" y1="0" x2="75" y2="0" stroke="#38bdf8" stroke-width="3"/>
            <line x1="-53" y1="-53" x2="53" y2="53" stroke="#38bdf8" stroke-width="3"/>
            <line x1="-53" y1="53" x2="53" y2="-53" stroke="#38bdf8" stroke-width="3"/>
            <!-- Text Badge -->
            <rect x="-48" y="-14" width="96" height="28" rx="6" fill="#0284c7"/>
            <text x="0" y="5" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="1">ROS 2</text>
          </g>

          <!-- Round Wheel 2 (Lower held wheel resting on ground) -->
          <g transform="translate(110, 395)">
            <circle cx="0" cy="0" r="68" fill="#0f172a" stroke="#10b981" stroke-width="8"/>
            <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#34d399" stroke-width="3" stroke-dasharray="6 4"/>
            <circle cx="0" cy="0" r="15" fill="#34d399"/>
            <!-- Spokes -->
            <line x1="0" y1="-68" x2="0" y2="68" stroke="#34d399" stroke-width="3"/>
            <line x1="-68" y1="0" x2="68" y2="0" stroke="#34d399" stroke-width="3"/>
            <!-- Text Badge -->
            <rect x="-46" y="-13" width="92" height="26" rx="5" fill="#059669"/>
            <text x="0" y="5" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle" letter-spacing="0.5">Nav2 / SLAM</text>
          </g>

          <!-- Engineer Body (Smiling, friendly, upright) -->
          <!-- Legs -->
          <path d="M40 340 L35 460 M65 340 L75 460" stroke="#64748b" stroke-width="12" stroke-linecap="round"/>
          <path d="M25 460 L50 460 M65 460 L92 460" stroke="#0ea5e9" stroke-width="14" stroke-linecap="round"/>
          <!-- Torso -->
          <rect x="25" y="210" width="60" height="135" rx="16" fill="#0ea5e9"/>
          <!-- Left Arm holding lower wheel -->
          <path d="M30 240 Q40 340 100 385" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" fill="none"/>
          <!-- Right Arm presenting upper wheel -->
          <path d="M75 240 Q120 250 160 225" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" fill="none"/>
          <!-- Head & Face -->
          <circle cx="55" cy="165" r="34" fill="#fed7aa"/>
          <!-- Friendly Hair -->
          <path d="M24 165 Q55 120 86 165 Q75 135 45 138 Z" fill="#475569"/>
          <!-- Big Smile -->
          <path d="M48 178 Q58 192 70 178" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <!-- Cheerful Eyes -->
          <circle cx="50" cy="160" r="4.5" fill="#0f172a"/>
          <circle cx="68" cy="160" r="4.5" fill="#0f172a"/>

          <!-- Label below helpful engineer -->
          <text x="55" y="495" fill="#38bdf8" font-size="15" font-weight="800" text-anchor="middle">ROS Community</text>
        </g>


        <!-- ======================================================== -->
        <!-- CENTER & RIGHT: THE STRUGGLING DEVELOPERS & SQUARE CART  -->
        <!-- ======================================================== -->

        <!-- The Heavy Robot Cart with Clumsy SQUARE Wheels -->
        <g id="robot-cart" transform="translate(850, 310)">
          
          <!-- Friction scratch marks on ground under wheels -->
          <path d="M30 330 L0 337 M45 330 L15 339 M60 330 L35 341" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M350 330 L320 337 M365 330 L335 339 M380 330 L355 341" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Red sparks -->
          <path d="M20 325 L10 315 M25 330 L12 330 M30 333 L18 343" stroke="#f59e0b" stroke-width="2.5"/>
          <path d="M340 325 L330 315 M345 330 L332 330 M350 333 L338 343" stroke="#f59e0b" stroke-width="2.5"/>

          <!-- Cart Main Heavy Chassis Box -->
          <rect x="20" y="80" width="380" height="160" rx="14" fill="#1e293b" stroke="#f59e0b" stroke-width="5"/>
          <rect x="35" y="95" width="350" height="130" rx="8" fill="#0f172a" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

          <!-- Tangled messy wires spilling over cart -->
          <path d="M-10 100 Q60 50 120 110 T240 70 T320 130 T410 80" stroke="#ef4444" stroke-width="4.5" fill="none"/>
          <path d="M10 120 Q90 160 180 90 T280 150 T390 110" stroke="#f59e0b" stroke-width="4" fill="none"/>
          <path d="M40 70 Q120 130 200 80 T310 140 T420 90" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6 4" fill="none"/>
          <path d="M80 170 Q140 220 220 160 T360 190" stroke="#a855f7" stroke-width="3" fill="none"/>

          <!-- Junk on cart: custom circuit boards, breadboards -->
          <rect x="55" y="110" width="90" height="55" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
          <text x="100" y="134" fill="#86efac" font-size="10" font-weight="900" text-anchor="middle">CUSTOM UART</text>
          <text x="100" y="150" fill="#f87171" font-size="10" font-weight="800" text-anchor="middle">⚠️ COM ERROR</text>

          <rect x="160" y="105" width="105" height="65" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="2"/>
          <text x="212" y="130" fill="#fca5a5" font-size="10" font-weight="900" text-anchor="middle">PROPRIETARY</text>
          <text x="212" y="146" fill="#f87171" font-size="10" font-weight="800" text-anchor="middle">MOTOR PROTOCOL</text>
          <text x="212" y="160" fill="#ef4444" font-size="9" font-weight="700" text-anchor="middle">❌ Non-Reusable</text>

          <!-- Oscilloscope showing erratic broken spikes -->
          <rect x="280" y="110" width="95" height="55" rx="6" fill="#022c22" stroke="#10b981" stroke-width="2"/>
          <path d="M290 138 L300 138 L307 120 L315 155 L323 130 L330 145 L337 138 L365 138" stroke="#34d399" stroke-width="2" fill="none"/>

          <!-- Big Warning Banner on Cart -->
          <rect x="60" y="180" width="300" height="32" rx="6" fill="#b91c1c"/>
          <text x="210" y="201" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="1">
            ⚠️ 80% WASTED LOW-LEVEL PLUMBING
          </text>

          <!-- FRONT SQUARE WHEEL (Tilted stubbornly) -->
          <g transform="translate(60, 260) rotate(16)">
            <rect x="-44" y="-44" width="88" height="88" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="8"/>
            <circle cx="0" cy="0" r="14" fill="#ef4444"/>
            <!-- Spokes on square wheel -->
            <line x1="0" y1="-44" x2="0" y2="44" stroke="#ef4444" stroke-width="3" stroke-dasharray="4 4"/>
            <line x1="-44" y1="0" x2="44" y2="0" stroke="#ef4444" stroke-width="3" stroke-dasharray="4 4"/>
            <!-- Warning text on square wheel -->
            <rect x="-30" y="-10" width="60" height="20" rx="4" fill="#ef4444"/>
            <text x="0" y="4" fill="#ffffff" font-size="9" font-weight="900" text-anchor="middle">SQUARE</text>
          </g>

          <!-- REAR SQUARE WHEEL (Tilted backward stubbornly) -->
          <g transform="translate(360, 260) rotate(-14)">
            <rect x="-44" y="-44" width="88" height="88" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="8"/>
            <circle cx="0" cy="0" r="14" fill="#ef4444"/>
            <!-- Spokes on square wheel -->
            <line x1="0" y1="-44" x2="0" y2="44" stroke="#ef4444" stroke-width="3" stroke-dasharray="4 4"/>
            <line x1="-44" y1="0" x2="44" y2="0" stroke="#ef4444" stroke-width="3" stroke-dasharray="4 4"/>
            <!-- Warning text on square wheel -->
            <rect x="-30" y="-10" width="60" height="20" rx="4" fill="#ef4444"/>
            <text x="0" y="4" fill="#ffffff" font-size="9" font-weight="900" text-anchor="middle">SQUARE</text>
          </g>
        </g>


        <!-- ENGINEER 2: Pushing the cart & waving dismissive hand (Behind Cart, Left side of Cart) -->
        <g id="engineer-pushing" transform="translate(730, 230)">
          <!-- Legs straining forward -->
          <path d="M60 300 L30 410 M85 300 L105 410" stroke="#475569" stroke-width="12" stroke-linecap="round"/>
          <path d="M15 410 L40 410 M95 410 L120 410" stroke="#f59e0b" stroke-width="14" stroke-linecap="round"/>
          <!-- Torso tilted forward into cart -->
          <path d="M40 170 L100 200 L85 310 L25 290 Z" fill="#f59e0b"/>
          
          <!-- Left Arm Pushing Cart -->
          <path d="M80 200 L135 230 L160 210" stroke="#fed7aa" stroke-width="12" stroke-linecap="round" fill="none"/>
          
          <!-- Right Arm Waving Dismissively backwards toward Helpful Engineer -->
          <path d="M45 190 L-10 160 L-25 110" stroke="#fed7aa" stroke-width="12" stroke-linecap="round" fill="none"/>
          <!-- Open hand waving 'No thanks!' -->
          <circle cx="-25" cy="105" r="14" fill="#fed7aa"/>
          <path d="M-35 100 L-40 85 M-28 95 L-30 75 M-20 95 L-18 75 M-14 100 L-8 85" stroke="#fed7aa" stroke-width="4" stroke-linecap="round"/>

          <!-- Head (Sweating, irritated, looking back) -->
          <circle cx="50" cy="130" r="32" fill="#fed7aa"/>
          <path d="M25 130 Q45 90 75 115 Q70 100 35 105 Z" fill="#78350f"/>
          <!-- Annoyed Eye -->
          <circle cx="42" cy="125" r="4" fill="#0f172a"/>
          <line x1="34" y1="116" x2="52" y2="122" stroke="#0f172a" stroke-width="3"/>
          <!-- Frowning mouth -->
          <path d="M38 145 Q45 138 55 142" stroke="#0f172a" stroke-width="3" fill="none"/>
          <!-- Sweat Drop flying -->
          <path d="M72 120 Q78 110 84 120 Q84 128 78 128 Q72 128 72 120 Z" fill="#38bdf8"/>

          <text x="65" y="440" fill="#f59e0b" font-size="14" font-weight="800" text-anchor="middle">Engineer A (Pushing)</text>
        </g>


        <!-- ENGINEER 1: In front, straining and pulling heavy rope (Right of Cart) -->
        <g id="engineer-pulling" transform="translate(1330, 220)">
          <!-- Rope connecting cart to pulling engineer -->
          <path d="M-100 290 Q-20 310 60 250" stroke="#f59e0b" stroke-width="8" fill="none" stroke-linecap="round"/>

          <!-- Legs strained in extreme pulling stance (one leg far forward, one back) -->
          <path d="M60 310 L15 420 M90 310 L160 415" stroke="#475569" stroke-width="14" stroke-linecap="round"/>
          <path d="M0 420 L30 420 M145 415 L175 415" stroke="#ef4444" stroke-width="15" stroke-linecap="round"/>
          
          <!-- Torso strained leaning far forward -->
          <path d="M40 170 L115 185 L95 320 L30 300 Z" fill="#ef4444"/>

          <!-- Both Arms gripping the heavy rope tightly -->
          <path d="M85 190 L40 215 L10 220" stroke="#fed7aa" stroke-width="13" stroke-linecap="round" fill="none"/>
          <circle cx="15" cy="220" r="12" fill="#fed7aa"/>

          <!-- Head (Exhausted, sweating profusely, gritting teeth) -->
          <circle cx="125" cy="130" r="33" fill="#fed7aa"/>
          <path d="M100 130 Q130 85 155 115 Q145 100 110 105 Z" fill="#1e293b"/>
          <!-- Strained closed eye (squinting in effort) -->
          <path d="M120 125 L135 122 M120 122 L135 126" stroke="#0f172a" stroke-width="3"/>
          <path d="M140 127 L152 125 M140 124 L152 129" stroke="#0f172a" stroke-width="3"/>
          <!-- Gritted Teeth -->
          <rect x="125" y="142" width="24" height="10" rx="3" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
          <line x1="131" y1="142" x2="131" y2="152" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="137" y1="142" x2="137" y2="152" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="143" y1="142" x2="143" y2="152" stroke="#0f172a" stroke-width="1.5"/>
          <!-- Multiple Sweat Drops flying off head -->
          <path d="M165 110 Q170 100 176 110 Q176 117 170 117 Q165 117 165 110 Z" fill="#38bdf8"/>
          <path d="M155 85 Q160 75 165 85 Q165 91 160 91 Q155 91 155 85 Z" fill="#38bdf8"/>
          <path d="M100 100 Q105 90 110 100 Q110 106 105 106 Q100 106 100 100 Z" fill="#38bdf8"/>

          <text x="100" y="450" fill="#f87171" font-size="14" font-weight="800" text-anchor="middle">Engineer B (Pulling with rope)</text>
        </g>

        <!-- SVG Gradients -->
        <defs>
          <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
          </radialGradient>
        </defs>

      </svg>

      <!-- Bottom Tag Comparison -->
      <div class="bottom-tag">
        <span class="highlight-red">❌ The Reinvention Trap:</span>
        <span>Stuck dragging square wheels (custom serial drivers, private sockets, broken IPC)</span>
        <span style="opacity: 0.4;">&bull;</span>
        <span class="highlight-green">✨ The ROS 2 Way:</span>
        <span>Plug in round wheels (DDS standard bus, Nav2, SLAM Toolbox, modular packages)</span>
      </div>

    </div>
  </div>
</body>
</html>
"""

html_path = "/tmp/reinvent_wheel_robotics.html"
with open(html_path, "w") as f:
    f.write(html_content)

print("Saved adjusted cartoon template to", html_path)
