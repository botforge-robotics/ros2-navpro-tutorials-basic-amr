import json

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    data = json.load(f)

for l in data['lessons']:
    num = l.get('num', l.get('id'))
    html = l['html_content']

    if num == 2:
        html = html.replace(
            '$(x, y, \\theta)$',
            '<code class="inline-code">(x, y, θ)</code>'
        )
        html = html.replace(
            '$$v_left = \\frac{v_x - \\omega_z \\cdot \\frac{L}{2}}{R}, \\quad v_right = \\frac{v_x + \\omega_z \\cdot \\frac{L}{2}}{R}$$',
            '<code class="inline-code">v_left = (v_x - ω_z · (L / 2)) / R</code> and <code class="inline-code">v_right = (v_x + ω_z · (L / 2)) / R</code>'
        )
    elif num == 14:
        html = html.replace(
            '$$\\mathbf{I} = \\begin{bmatrix} I_{xx} &amp; I_{xy} &amp; I_{xz} \\ I_{yx} &amp; I_{yy} &amp; I_{yz} \\ I_{zx} &amp; I_{zy} &amp; I_{zz} \\end{bmatrix}$$',
            '<div class="math-matrix-box" style="display: inline-block; padding: 0.5rem 1rem; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 6px; font-family: var(--font-mono); font-size: 0.9rem; margin: 0.5rem 0;"><strong>I</strong> = [ [I<sub>xx</sub>, I<sub>xy</sub>, I<sub>xz</sub>], [I<sub>yx</sub>, I<sub>yy</sub>, I<sub>yz</sub>], [I<sub>zx</sub>, I<sub>zy</sub>, I<sub>zz</sub>] ]</div>'
        )
        html = html.replace(
            '$$I_{xx} = \\frac{m}{12}(h^2 + d^2), \\quad I_{yy} = \\frac{m}{12}(w^2 + d^2), \\quad I_{zz} = \\frac{m}{12}(w^2 + h^2)$$',
            '<code class="inline-code">I<sub>xx</sub> = (m/12)·(h² + d²)</code>, <code class="inline-code">I<sub>yy</sub> = (m/12)·(w² + d²)</code>, <code class="inline-code">I<sub>zz</sub> = (m/12)·(w² + h²)</code>'
        )
        html = html.replace(
            '$$I_{xx} = I_{yy} = \\frac{m}{12}(3r^2 + h^2), \\quad I_{zz} = \\frac{m}{2}r^2$$',
            '<code class="inline-code">I<sub>xx</sub> = I<sub>yy</sub> = (m/12)·(3r² + h²)</code>, <code class="inline-code">I<sub>zz</sub> = (m/2)·r²</code>'
        )
        html = html.replace(
            '$$I_{xx} = I_{yy} = I_{zz} = \\frac{2}{5}m r^2$$',
            '<code class="inline-code">I<sub>xx</sub> = I<sub>yy</sub> = I<sub>zz</sub> = (2/5)·m·r²</code>'
        )
    elif num == 16:
        # RTF line
        html = html.replace(
            '$\\tRTF = \\Delta t_{\\tsim} / \\Delta t_{\\twall}$',
            '<code class="inline-code">RTF = Δt_sim / Δt_wall</code>'
        )
        # odom line
        html = html.replace(
            "$(x, y, \\theta)$ and its instantaneous linear and angular twist velocities $(v_x, v_y, \\omega_z)$",
            "<code class=\"inline-code\">(x, y, θ)</code> and its instantaneous linear and angular twist velocities <code class=\"inline-code\">(v_x, v_y, ω_z)</code>"
        )
        # kinematics breakdown
        html = html.replace(
            'linear velocity $v$ and angular velocity $\\omega$ over time $\\Delta t$: $\\Delta x = v \\cos(\\theta) \\Delta t$, $\\Delta y = v \\sin(\\theta) \\Delta t$, $\\Delta \\theta = \\omega \\Delta t$',
            'linear velocity <code class="inline-code">v</code> and angular velocity <code class="inline-code">ω</code> over time interval <code class="inline-code">Δt</code>: <code class="inline-code">Δx = v · cos(θ) · Δt</code>, <code class="inline-code">Δy = v · sin(θ) · Δt</code>, and <code class="inline-code">Δθ = ω · Δt</code>'
        )
    elif num == 18:
        html = html.replace(
            '$\\mathbf{x}_i = [x_i, y_i, \theta_i]^T \\in SE(2)$',
            '<code class="inline-code">x<sub>i</sub> = [x<sub>i</sub>, y<sub>i</sub>, θ<sub>i</sub>]<sup>T</sup> ∈ SE(2)</code>'
        )
        html = html.replace(
            'odometry edges $\\mathbf{z}_{i, i+1}$ with covariance information matrices $\\mathbf{\\Omega}_{i, i+1}$',
            'odometry edges <code class="inline-code">z<sub>i, i+1</sub></code> with covariance information matrices <code class="inline-code">Ω<sub>i, i+1</sub></code>'
        )
        html = html.replace(
            'current pose $\\mathbf{x}_j$ and past pose $\\mathbf{x}_i$',
            'current pose <code class="inline-code">x<sub>j</sub></code> and past pose <code class="inline-code">x<sub>i</sub></code>'
        )
        html = html.replace(
            '<br><code class="inline-code">\\mathbf{e}_{ij}(\\mathbf{x}_i, \\mathbf{x}_j) = \\mathbf{z}_{ij} \\ominus (\\mathbf{x}_j \\ominus \\mathbf{x}_i)</code>',
            '<br><code class="inline-code">e<sub>ij</sub>(x<sub>i</sub>, x<sub>j</sub>) = z<sub>ij</sub> ⊖ (x<sub>j</sub> ⊖ x<sub>i</sub>)</code>'
        )
    elif num == 19:
        html = html.replace(
            '$\\tcost = 253 \\cdot e^{-\\alpha \\cdot (d - r_{\\tinscribed})}$. Cells with cost $\\ge 253$',
            '<code class="inline-code">Cost(d) = 253 · exp(-α · (d - r_inscribed))</code>. Cells with cost <code class="inline-code">≥ 253</code>'
        )
    elif num == 20:
        html = html.replace(
            '<code class="inline-code">(v_x, \\omega_z)</code>',
            '<code class="inline-code">(v_x, ω_z)</code>'
        )
        html = html.replace(
            '<code class="inline-code">\tScore(\\tau) = \\sum_{c \\in \tCritics} w_c \\cdot S_c(\\tau)</code>',
            '<code class="inline-code">Score(τ) = Σ [ w<sub>c</sub> · S<sub>c</sub>(τ) ]</code> for all critics <code class="inline-code">c ∈ Critics</code>'
        )

    l['html_content'] = html

with open(json_path, 'w') as f:
    json.dump(data, f, indent=2)

print("Successfully replaced all raw LaTeX equations across Lessons 2, 14, 16, 18, 19, 20!")
