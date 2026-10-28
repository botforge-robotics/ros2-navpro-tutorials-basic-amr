import json

with open('/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json') as f:
    data = json.load(f)

for l in data['lessons']:
    if l.get('num') == 2:
        lines = l['html_content'].split('\n')
        for i, line in enumerate(lines):
            if any(k in line for k in ['\\omega', '\\cdot', '\\frac', '\\quad', '\\theta']):
                print(f"L2 line {i+1}: {repr(line)}")
