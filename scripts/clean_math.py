import json

json_path = 'ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'
with open(json_path, 'r') as f:
    text = f.read()

bs = chr(92)

subs = [
    ('Chassis Center ($Z=+0.06' + bs + 'text{m}$)', 'Chassis Center (Z = +0.06 m)'),
    ('Ground Datum ($Z=0$)', 'Ground Datum (Z = 0.0 m)'),
    ('The primary 3D structural body ($40' + bs + 'times30' + bs + 'times14' + bs + 'text{ cm}$, $8' + bs + 'text{ kg}$)', 'The primary 3D structural body (40 × 30 × 14 cm, 8 kg)'),
    ('Actuated Drive ($r=0.06' + bs + 'text{m}$)', 'Actuated Drive (r = 0.06 m)'),
    ('Dual independent drive wheels ($32' + bs + 'text{ cm}$ track separation)', 'Dual independent drive wheels (32 cm track separation)'),
    ('2D LiDAR ($X=+0.10, Z=+0.18' + bs + 'text{m}$)', '2D LiDAR (X = +0.10 m, Z = +0.18 m)'),
    ('Perception ($X=+0.16, Z=+0.12' + bs + 'text{m}$)', 'Perception (X = +0.16 m, Z = +0.12 m)'),
    ('footprint dimensions ($r=0.22' + bs + 'text{m}$)', 'footprint dimensions (r = 0.22 m)'),
    ('footprint radius ($r=0.22' + bs + 'text{m}$)', 'footprint radius (r = 0.22 m)'),
    ('($r=0.22' + bs + '\\text{m}$)', '(r = 0.22 m)')
]

for old, new in subs:
    found = text.count(old)
    print(f'Replacing {old} -> {new}: count={found}')
    text = text.replace(old, new)

with open(json_path, 'w') as f:
    f.write(text)

print('Success from clean_math.py!')
