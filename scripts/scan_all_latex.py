import json
import re

with open('/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json') as f:
    data = json.load(f)

print("Scanning all lessons for LaTeX characters...")
for l in data['lessons']:
    num = l.get('num', l.get('id'))
    title = l.get('title', '')
    html = l['html_content']
    
    # Check for backslash math tokens
    latex_tokens = re.findall(r'\\[a-zA-Z]+', html)
    suspicious = [t for t in latex_tokens if t in [
        '\\frac', '\\mathbf', '\\theta', '\\omega', '\\Delta', '\\alpha', '\\beta', 
        '\\sum', '\\sigma', '\\tau', '\\ominus', '\\in', '\\times', '\\quad', '\\cdot',
        '\\begin', '\\end', '\\bmatrix', '\\partial', '\\nabla', '\\sim', '\\wall'
    ]]
    if suspicious:
        print(f"Lesson {num}: {title} has {len(suspicious)} tokens: {set(suspicious)}")
