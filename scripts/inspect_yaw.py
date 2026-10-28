import json
import re

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    text = f.read()

matches = list(re.finditer(r'.{0,30}\(yaw\).{0,30}', text))
print(f'Total (yaw) matches: {len(matches)}')
print('\nFirst 20 examples:')
for i, m in enumerate(matches[:20]):
    print(f'{i+1}: {repr(m.group(0))}')

print('\nCheck if any (yaw) was intended to be the literal word yaw:')
for i, m in enumerate(matches):
    ctx = m.group(0)
    # Check if context suggests it was heading / angle yaw
    if any(k in ctx.lower() for k in ['pitch', 'roll', 'angle', 'heading', 'quaternion', 'euler', 'orientation']):
        print(f'Yaw-like context [{i}]: {repr(ctx)}')
