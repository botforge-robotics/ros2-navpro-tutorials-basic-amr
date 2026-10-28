import json
import re

with open('/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json') as f:
    data = json.load(f)

for l in data['lessons']:
    num = l.get('num', l.get('id'))
    if num in [14, 16, 18, 19, 20]:
        html = l['html_content']
        matches = re.findall(r'.{0,40}(?:\\frac|\\mathbf|\\theta|\\omega|\\Delta|\\alpha|\\sum|\$\$).{0,40}', html)
        print(f'=== Lesson {num} === ({len(matches)} matches)')
        for m in matches:
            print('  ', repr(m))
