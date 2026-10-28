import json

with open('/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json') as f:
    data = json.load(f)

for l in data['lessons']:
    num = l.get('num', l.get('id'))
    if num in [2, 14, 16, 18, 19, 20]:
        lines = l['html_content'].split('\n')
        print(f"\n================ Lesson {num} ================")
        for i, line in enumerate(lines):
            if any(k in line for k in ['\\frac', '\\mathbf', '\\theta', '\\omega', '\\Delta', '\\alpha', '\\sum', '$$', '\\begin{bmatrix}']):
                print(f"L{num} line {i+1}: {repr(line)}")
