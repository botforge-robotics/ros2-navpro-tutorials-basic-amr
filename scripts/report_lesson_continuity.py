import json
import re

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    data = json.load(f)

lessons = data['lessons']

print("="*80)
print("LESSON-BY-LESSON FILE CONTINUITY AUDIT")
print("="*80)

for l in lessons:
    num = l.get('num', l.get('id'))
    title = l.get('title', '')
    html = l['html_content']
    
    # Extract file creation mentions: "Create ... <path>"
    creates = re.findall(r'[Cc]reate\s+.*?(?:at|file|directory)?\s*:?\s*<code>(.*?)</code>', html)
    creates += re.findall(r'[Cc]reate\s+.*?(?:at|file|directory)?\s*:?\s*<code class="inline-code">(.*?)</code>', html)
    
    # Extract file open/edit mentions: "Open ... <path>"
    opens = re.findall(r'[Oo]pen\s+.*?(?:file)?\s*:?\s*<code>(.*?)</code>', html)
    opens += re.findall(r'[Oo]pen\s+.*?(?:file)?\s*:?\s*<code class="inline-code">(.*?)</code>', html)

    # Extract starter task and reference solution
    tasks = re.findall(r'(?:Starter Template|task):\s*<code[^>]*>(.*?)</code>', html, re.IGNORECASE)
    solutions = re.findall(r'(?:Reference Solution|solution):\s*<code[^>]*>(.*?)</code>', html, re.IGNORECASE)
    
    # Deduplicate
    creates = list(dict.fromkeys([c.strip() for c in creates if '.' in c]))
    opens = list(dict.fromkeys([o.strip() for o in opens if '.' in o]))
    tasks = list(dict.fromkeys([t.strip() for t in tasks if '.' in t]))
    solutions = list(dict.fromkeys([s.strip() for s in solutions if '.' in s]))

    print(f"\n[Lesson {num:02d}] {title}")
    if creates:
        print(f"  CREATES ({len(creates)}):")
        for c in creates:
            print(f"    + {c}")
    if opens:
        print(f"  OPENS/EDITS ({len(opens)}):")
        for o in opens:
            print(f"    ~ {o}")
    if tasks:
        print(f"  CHALLENGE TASK: {tasks[0]}")
    if solutions:
        print(f"  CHALLENGE SOLUTION: {solutions[0]}")
