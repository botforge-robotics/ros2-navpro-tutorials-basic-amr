import json

json_path = '/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    text = f.read()

count = text.count('(yaw)')
print(f'Replacing {count} occurrences of "(yaw)" with "$"')
text = text.replace('(yaw)', '$')

# In Lesson 22, let's fix the specific breakdown card line where $(yaw)$ was:
# "orientation quaternion derived from target heading (yaw)"
text = text.replace('orientation quaternion $()$', 'orientation quaternion derived from target yaw')
text = text.replace('orientation quaternion derived from target heading (yaw)', 'orientation quaternion derived from target heading (yaw)')

with open(json_path, 'w') as f:
    f.write(text)

print('Done fixing dollars!')
