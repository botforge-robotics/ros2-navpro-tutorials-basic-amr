import json

with open('lms/src/data/lessonsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for lesson in data['lessons']:
    if lesson['id'] == 'lesson_07':
        c = lesson['html_content']

        # 1. Locate the note in Section 3
        idx = c.find('Operational Note: The Offline Service Wait Drill')
        if idx != -1:
            start_div = c.rfind('<div class="alert-callout alert-info"', 0, idx)
            end_div = c.find('</div>\n</div>', idx) + len('</div>\n</div>')

            # Clean trailing newlines
            while c[end_div:end_div+1] in ['\n', ' ']:
                end_div += 1

            c = c[:start_div] + c[end_div:]
            print('Removed note from Section 3.')
        else:
            print('Note not found in Section 3 (maybe already moved).')

        # 2. Formulate updated note matching Lesson 07 Emergency Stop executables
        updated_note = '''
<div class="alert-callout alert-info" style="margin: 1.75rem 0;">
  <div class="alert-icon">⏱️</div>
  <div class="alert-body">
    <strong>Operational Note: The Offline Service Wait Drill:</strong><br>
    In distributed robotics, a service client must never assume the server is already online. Test this resiliency pattern:<br>
    <div class="code-container" data-language="bash" style="margin: 0.5rem 0 0.3rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># In Terminal 1: Run the client while server is stopped
ros2 run nexus_amr_basics emergency_stop_client
# Expected Output: [INFO] [emergency_stop_client]: Emergency Stop Service not available, waiting...

# In Terminal 2: Launch the service server
ros2 run nexus_amr_basics emergency_stop_server
# Observe: Terminal 1 unblocks instantly and logs:
# [INFO] [emergency_stop_client]: Dispatching Emergency Stop Request: stop=True...
# [INFO] [emergency_stop_client]: SAFETY RESPONSE RECEIVED: Success: True, Status: Emergency Stop LATCHED...</code></pre>
    </div>
  </div>
</div>
'''

        # 3. Insert after client code block in Section 6
        target = '''if __name__ == &#x27;__main__&#x27;:
    main()
</code></pre>
</div>'''

        idx_target = c.find(target)
        if idx_target != -1:
            insertion_point = idx_target + len(target)
            c = c[:insertion_point] + '\n' + updated_note + '\n' + c[insertion_point:]
            print('Inserted note after client code in Section 6.')
        else:
            print('Could not find target client code block end!')

        lesson['html_content'] = c

with open('lms/src/data/lessonsData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print('Updated lessonsData.json successfully!')
