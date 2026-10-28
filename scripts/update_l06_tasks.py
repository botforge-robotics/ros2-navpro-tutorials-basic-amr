import json

new_section_2 = r'''<h2 id="2-vs-code-ide-configuration-for-ros-2-python">2. VS Code IDE Configuration for ROS 2 Python</h2>
<p>To enable code autocompletion, real-time syntax checking, and one-click build automation in VS Code, we configure configuration files inside the <code class="inline-code">.vscode/</code> directory. In our container workstation, VS Code opens the user home directory (<code class="inline-code">/home/student</code>) by default so you can inspect both your active development workspace (<code class="inline-code">~/ros2_ws</code>) and reference code (<code class="inline-code">~/ros2_ws_reference</code>) simultaneously.</p>

<div class="alert-callout alert-info" style="margin: 1.25rem 0;">
  <div class="alert-icon">💡</div>
  <div class="alert-body">
    <strong>Understanding the VS Code Workspace Root:</strong><br>
    When VS Code is launched with <code class="inline-code">/home/student</code> as its folder, the internal variable <code class="inline-code">${workspaceFolder}</code> evaluates to <code class="inline-code">/home/student</code>. Therefore, VS Code reads its task and setting configurations from <code class="inline-code">/home/student/.vscode/</code>. Both <code class="inline-code">settings.json</code> and <code class="inline-code">tasks.json</code> explicitly point to your ROS 2 workspace at <code class="inline-code">~/ros2_ws</code>.
  </div>
</div>

<h3 id="21-workspace-settings-vscodesettingsjson">2.1 Workspace Settings (<code class="inline-code">.vscode/settings.json</code>)</h3>
<p>This configuration informs the Python Language Server (Pylance/Pyright) where to discover compiled ROS 2 Jazzy Python modules and your newly built <code class="inline-code">nexus_amr_basics</code> package, preventing false-positive <code class="inline-code">Import &quot;rclpy&quot; could not be resolved</code> warnings:</p>
<div class="code-container" data-language="json">
<div class="code-header"><span class="code-lang-tag">json</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-json">{
  &quot;python.defaultInterpreterPath&quot;: &quot;/usr/bin/python3&quot;,
  &quot;python.autoComplete.extraPaths&quot;: [
    &quot;/opt/ros/jazzy/lib/python3.12/site-packages&quot;,
    &quot;${workspaceFolder}/ros2_ws/install/nexus_amr_basics/lib/python3.12/site-packages&quot;
  ],
  &quot;python.analysis.extraPaths&quot;: [
    &quot;/opt/ros/jazzy/lib/python3.12/site-packages&quot;,
    &quot;${workspaceFolder}/ros2_ws/install/nexus_amr_basics/lib/python3.12/site-packages&quot;
  ],
  &quot;python.analysis.autoSearchPaths&quot;: true,
  &quot;python.analysis.diagnosticMode&quot;: &quot;openFilesOnly&quot;
}
</code></pre>
</div>

<h3 id="22-colcon-build-tasks-vscodetasksjson">2.2 Colcon Build Tasks (<code class="inline-code">.vscode/tasks.json</code>)</h3>
<p>VS Code build tasks allow you to trigger compilation instantly using the keyboard shortcut <code class="inline-code">Ctrl + Shift + B</code> or via the top menu (<strong>Terminal &rarr; Run Build Task...</strong>):</p>
<div class="code-container" data-language="json">
<div class="code-header"><span class="code-lang-tag">json</span><button class="copy-code-btn">📋 Copy</button></div>
<pre><code class="language-json">{
  &quot;version&quot;: &quot;2.0.0&quot;,
  &quot;tasks&quot;: [
    {
      &quot;label&quot;: &quot;colcon: build (symlink-install)&quot;,
      &quot;type&quot;: &quot;shell&quot;,
      &quot;command&quot;: &quot;cd ~/ros2_ws &amp;&amp; colcon build --symlink-install&quot;,
      &quot;group&quot;: {
        &quot;kind&quot;: &quot;build&quot;,
        &quot;isDefault&quot;: true
      },
      &quot;problemMatcher&quot;: [],
      &quot;presentation&quot;: {
        &quot;echo&quot;: true,
        &quot;reveal&quot;: &quot;always&quot;,
        &quot;focus&quot;: false,
        &quot;panel&quot;: &quot;shared&quot;
      }
    },
    {
      &quot;label&quot;: &quot;colcon: build selected package&quot;,
      &quot;type&quot;: &quot;shell&quot;,
      &quot;command&quot;: &quot;cd ~/ros2_ws &amp;&amp; colcon build --symlink-install --packages-select ${input:packageName}&quot;,
      &quot;problemMatcher&quot;: [],
      &quot;presentation&quot;: {
        &quot;echo&quot;: true,
        &quot;reveal&quot;: &quot;always&quot;,
        &quot;focus&quot;: false,
        &quot;panel&quot;: &quot;shared&quot;
      }
    },
    {
      &quot;label&quot;: &quot;colcon: clean build artifacts&quot;,
      &quot;type&quot;: &quot;shell&quot;,
      &quot;command&quot;: &quot;cd ~/ros2_ws &amp;&amp; rm -rf build install log&quot;,
      &quot;problemMatcher&quot;: []
    }
  ],
  &quot;inputs&quot;: [
    {
      &quot;id&quot;: &quot;packageName&quot;,
      &quot;type&quot;: &quot;promptString&quot;,
      &quot;description&quot;: &quot;Enter ROS 2 package name to build (e.g. nexus_amr_basics):&quot;,
      &quot;default&quot;: &quot;nexus_amr_basics&quot;
    }
  ]
}
</code></pre>
</div>

<div class="alert-callout alert-warning" style="margin: 1.5rem 0;">
  <div class="alert-icon">⚠️</div>
  <div class="alert-body">
    <strong>Architectural Safeguard: Why <code>cd ~/ros2_ws &amp;&amp;</code> is Essential:</strong><br>
    Notice how each task command begins with <code class="inline-code">cd ~/ros2_ws &amp;&amp;</code>. This prevents a critical workspace corruption issue:<br><br>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><strong>The Root Cause:</strong> When VS Code opens your user environment (<code class="inline-code">/home/student</code>), the variable <code class="inline-code">${workspaceFolder}</code> points to <code class="inline-code">/home/student</code>.</li>
      <li><strong>The Risk of a Bare Command:</strong> If you run a plain <code class="inline-code">colcon build --symlink-install</code> without specifying the directory, <code class="inline-code">colcon</code> treats the entire user home folder as a workspace. It creates stray <code class="inline-code">~/build</code>, <code class="inline-code">~/install</code>, and <code class="inline-code">~/log</code> directories directly inside <code class="inline-code">/home/student</code>, and crashes with a <em>Duplicate package names</em> conflict (because it crawls both <code class="inline-code">ros2_ws</code> and <code class="inline-code">ros2_ws_reference</code>).</li>
      <li><strong>The Guarantee:</strong> Prefixing the command with <code class="inline-code">cd ~/ros2_ws &amp;&amp;</code> guarantees that build and clean tasks always execute strictly inside the genuine ROS 2 workspace root (<code class="inline-code">/home/student/ros2_ws</code>), regardless of what file or folder is currently focused in VS Code.</li>
    </ul>
  </div>
</div>

<div class="code-breakdown-card" style="margin: 1.5rem 0;">
  <h4 class="code-breakdown-title">⚙️ Task Execution Workflow</h4>
  <p class="code-breakdown-intro">How to leverage these automated tasks during development:</p>
  <ul class="code-breakdown-list">
    <li class="code-breakdown-item"><strong>One-Key Full Build:</strong> Press <code class="inline-code">Ctrl + Shift + B</code>. It runs the default build task, compiling all packages in <code class="inline-code">~/ros2_ws</code> with symlinked Python scripts.</li>
    <li class="code-breakdown-item"><strong>Targeted Package Build:</strong> Open the Command Palette (<code class="inline-code">Ctrl + Shift + P</code>), type <strong>Tasks: Run Task</strong>, and choose <strong>colcon: build selected package</strong>. A prompt appears allowing you to type the package name (<code class="inline-code">nexus_amr_basics</code>) to save build time.</li>
    <li class="code-breakdown-item"><strong>Clean Workspace:</strong> When cleaning corrupt build caches or doing a fresh recompile, run <strong>Tasks: Run Task &rarr; colcon: clean build artifacts</strong>. It cleanly wipes <code class="inline-code">build/</code>, <code class="inline-code">install/</code>, and <code class="inline-code">log/</code> from <code class="inline-code">~/ros2_ws</code> without touching your source code.</li>
  </ul>
</div>
<hr class="divider">
'''

with open('ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for lesson in data['lessons']:
    if lesson.get('id') == 'lesson_06':
        content = lesson['html_content']
        idx_start = content.find('<h2 id="2-vs-code-ide-configuration-for-ros-2-python">')
        idx_end = content.find('<h2 id="3-the-ros-2-logging-framework">')
        if idx_start != -1 and idx_end != -1:
            lesson['html_content'] = content[:idx_start] + new_section_2 + content[idx_end:]
            print('Successfully updated Section 2 in lesson_06')
        else:
            print('Could not find start/end indices!', idx_start, idx_end)

with open('ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print('Updated lessonsData.json written!')
