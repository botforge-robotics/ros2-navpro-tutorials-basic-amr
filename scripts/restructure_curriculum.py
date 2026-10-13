#!/usr/bin/env python3
import json
import os

repo_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
json_path = os.path.join(repo_dir, 'lms/src/data/lessonsData.json')

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

old_lessons = data['lessons']
kept_lessons = []

filename_map = {
    14: "14_3d_modeling_urdf_xacro.md",
    15: "15_rviz2_visualization_tf_inspection.md",
    16: "16_gazebo_physics_and_sensor_plugins.md",
    17: "17_building_simulation_worlds.md",
    18: "18_2d_slam_mapping_slam_toolbox.md",
    19: "19_nav2_architecture_and_costmaps.md",
    20: "20_nav2_planners_controllers_tuning.md",
    21: "21_nav2_behavior_trees_and_recoveries.md",
    22: "22_autonomous_patrol_nav2_simple_commander.md",
    23: "23_physical_robot_hardware_deployment.md",
}

for l in old_lessons:
    num = l['num']
    if num in [14, 15, 16]:
        continue
    elif num <= 13:
        kept_lessons.append(l)
    else:
        new_num = num - 3
        l['num'] = new_num
        l['num_str'] = f"{new_num:02d}"
        l['id'] = f"lesson_{new_num:02d}"
        l['filename'] = filename_map[new_num]
        l['slug'] = filename_map[new_num].replace(".md", "")
        if new_num <= 17:
            l['module_id'] = 3
            l['module'] = "Module 3: 3D Robot Modeling & Physics Simulation"
        else:
            l['module_id'] = 4
            l['module'] = "Module 4: Autonomous Navigation with Nav2"
        kept_lessons.append(l)

# Fix chaining
for i, l in enumerate(kept_lessons):
    l['prev_id'] = kept_lessons[i - 1]['id'] if i > 0 else None
    l['next_id'] = kept_lessons[i + 1]['id'] if i < len(kept_lessons) - 1 else None

data['lessons'] = kept_lessons
data['total_lessons'] = len(kept_lessons)

data['modules'] = [
    {
        "id": 1,
        "name": "Foundations & Core Middleware",
        "icon": "Cpu",
        "range": [1, 6],
        "lesson_count": 6,
        "lessons": [
            {"id": l["id"], "num_str": l["num_str"], "title": l["title"]}
            for l in kept_lessons if 1 <= l["num"] <= 6
        ]
    },
    {
        "id": 2,
        "name": "Advanced Communication Patterns",
        "icon": "Network",
        "range": [7, 13],
        "lesson_count": 7,
        "lessons": [
            {"id": l["id"], "num_str": l["num_str"], "title": l["title"]}
            for l in kept_lessons if 7 <= l["num"] <= 13
        ]
    },
    {
        "id": 3,
        "name": "3D Robot Modeling & Physics Simulation",
        "icon": "Box",
        "range": [14, 17],
        "lesson_count": 4,
        "lessons": [
            {"id": l["id"], "num_str": l["num_str"], "title": l["title"]}
            for l in kept_lessons if 14 <= l["num"] <= 17
        ]
    },
    {
        "id": 4,
        "name": "Autonomous Navigation with Nav2",
        "icon": "Compass",
        "range": [18, 23],
        "lesson_count": 6,
        "lessons": [
            {"id": l["id"], "num_str": l["num_str"], "title": l["title"]}
            for l in kept_lessons if 18 <= l["num"] <= 23
        ]
    }
]

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Updated {json_path}: {len(kept_lessons)} lessons, {len(data['modules'])} modules.")
