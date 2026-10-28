import json
import re

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    data = json.load(f)

lessons = data['lessons']

keywords = ['create', 'touch', 'open', 'edit', 'add', 'modify', 'update', 'nano', 'vim', 'code ', 'save', 'file']

for l in lessons:
    num = l.get('num', l.get('id'))
    title = l.get('title', '')
    html = l['html_content']

    # Find paragraphs, list items, headings containing file-like references
    # Split by tags
    snippets = re.findall(r'<p>(.*?)</p>|<li[^>]*>(.*?)</li>|<div class="code-filename">(.*?)</div>|<h[2-4][^>]*>(.*?)</h[2-4]>', html, re.DOTALL)
    
    file_actions = []
    for s in snippets:
        text = ' '.join([x for x in s if x]).strip()
        # Clean html tags for inspection
        clean = re.sub(r'<[^>]+>', '', text).strip()
        # Look for file extensions
        if re.search(r'\b[\w-]+\.(?:py|xacro|urdf|yaml|xml|world|sh|launch\.py|txt)\b', clean):
            # check if any action verb is in clean
            if any(k in clean.lower() for k in keywords):
                file_actions.append(clean)

    print(f"\n=======================================================")
    print(f"LESSON {num}: {title}")
    print(f"Total file-related action snippets found: {len(file_actions)}")
    for a in file_actions[:8]:
        print(f"  * {a[:120]}...")
