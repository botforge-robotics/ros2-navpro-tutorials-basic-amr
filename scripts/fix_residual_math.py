import json

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    data = json.load(f)

for l in data['lessons']:
    num = l.get('num', l.get('id'))
    html = l['html_content']

    if num == 16:
        # Replace the RTF calculation line
        old_rtf = 'calculates the <strong>Real-Time Factor (RTF)</strong>: $\tRTF = \\Delta t_{\tsim} / \\Delta t_{\twall}$.'
        new_rtf = 'calculates the <strong>Real-Time Factor (RTF)</strong>: <code class="inline-code">RTF = Δt_sim / Δt_wall</code>.'
        if old_rtf in html:
            html = html.replace(old_rtf, new_rtf)
            print("Fixed L16 RTF!")
        else:
            # Fallback search
            import re
            html = re.sub(r'calculates the <strong>Real-Time Factor \(RTF\)</strong>:.*?lockstep with wall-clock time!',
                          'calculates the <strong>Real-Time Factor (RTF)</strong>: <code class="inline-code">RTF = Δt_sim / Δt_wall</code>. When RTF = 1.00x, simulation time advances exactly in lockstep with wall-clock time!',
                          html)
            print("Fixed L16 RTF via regex!")

    elif num == 19:
        # Line 66 cost equation
        import re
        html = re.sub(r'<br><code class="inline-code">.*?cost\(d\).*?<\/code>',
                      '<br><code class="inline-code">Cost(d) = exp(-β · (d - r_inscribed)) · (LETHAL_COST - 1)</code>',
                      html)
        print("Fixed L19 cost equation!")

    elif num == 20:
        # Line 78 DWB score
        import re
        html = re.sub(r'<br><code class="inline-code">.*?Score.*?Critics.*?<\/code>',
                      '<br><code class="inline-code">Score(τ) = Σ [ w_c · S_c(τ) ] (for all critics c ∈ Critics)</code>',
                      html)
        print("Fixed L20 Score equation!")

    l['html_content'] = html

with open(json_path, 'w') as f:
    json.dump(data, f, indent=2)

print("Done fixing residual math lines!")
