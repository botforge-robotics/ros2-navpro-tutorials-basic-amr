import json
import re

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    data = json.load(f)

lessons = data['lessons']

print(f"Total lessons: {len(lessons)}")

file_registry = {} # filename -> created_in_lesson

for l in lessons:
    num = l.get('num', l.get('id'))
    title = l.get('title', '')
    html = l.get('html_content', '')
    
    # Check for unrendered latex
    latex_patterns = [
        r'\$\$.*?\$\$',
        r'\\frac\{',
        r'\\mathbf\{',
        r'\\text\{',
        r'\\sum',
        r'\\sigma',
        r'\\theta',
        r'\\alpha',
        r'\\beta',
        r'\\omega',
        r'\\Delta',
        r'\\pm'
    ]
    found_latex = []
    for pat in latex_patterns:
        m = re.findall(pat, html)
        if m:
            found_latex.append((pat, len(m)))
            
    # Check for file operations in text
    # e.g., "Create ... at `...`" or "Open `...`" or "Edit `...`"
    # Find all file paths ending in .py, .yaml, .xacro, .urdf, .xml, .world, .sh
    filepaths = set(re.findall(r'[\w/~.-]+\.(?:py|yaml|xacro|urdf|xml|world|sh|launch\.py)', html))
    # filter out non-paths
    cleaned_paths = [p for p in filepaths if '/' in p or p.endswith('.py') or p.endswith('.yaml') or p.endswith('.xacro') or p.endswith('.xml')]

    print(f"\n==================================================")
    print(f"Lesson {num}: {title}")
    if found_latex:
        print(f"  [!] Potential unrendered LaTeX found: {found_latex}")
    print(f"  Files referenced ({len(cleaned_paths)}):")
    for cp in sorted(cleaned_paths):
        print(f"    - {cp}")

