import json
import re

file_path = "/home/chaitu/Projects/navpro_learning_hub/ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Define tasks configuration per lesson
tasks_config = {
    "lesson_01": {
        "pattern": r"<p>Copy the starter script to your student workspace <code class=\"inline-code\">~/ros2_ws/scripts/</code>, grant execute permissions, and run:</p>",
        "cmd": "mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m01_l01_task_env_setup.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m01_l01_task_env_setup.sh",
        "file": "m01_l01_task_env_setup.sh"
    },
    "lesson_02": {
        "pattern": r"<p>Copy the starter script to your student workspace <code class=\"inline-code\">~/ros2_ws/scripts/</code>, grant execute permissions, and run:</p>",
        "cmd": "mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m01_l02_task_domain_isolation.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m01_l02_task_domain_isolation.sh",
        "file": "m01_l02_task_domain_isolation.sh"
    },
    "lesson_05": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m01_l05_06_task_turtle_square\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m01_l05_06_task_turtle_square\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m01_l05_06_task_turtle_square.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m01_l05_06_task_turtle_square.py"
    },
    "lesson_06": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m01_l06_03_task_battery_monitor_logger\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m01_l06_03_task_battery_monitor_logger\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m01_l06_03_task_battery_monitor_logger.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m01_l06_03_task_battery_monitor_logger.py"
    },
    "lesson_07": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l07_task_speed_mode_server\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m02_l07_task_speed_mode_server\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l07_task_speed_mode_server.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m02_l07_task_speed_mode_server.py"
    },
    "lesson_08": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l10_01_task_dynamic_safety_params\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m02_l10_01_task_dynamic_safety_params\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l10_01_task_dynamic_safety_params.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m02_l10_01_task_dynamic_safety_params.py"
    },
    "lesson_09": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/launch/m02_l11_01_task_fleet_launch\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/launch/m02_l11_01_task_fleet_launch\.py</code>:</p>",
        "cmd": "mkdir -p ~/ros2_ws/src/nexus_amr_basics/launch\ncp ~/ros2_ws_reference/src/nexus_amr_basics/launch/m02_l11_01_task_fleet_launch.py ~/ros2_ws/src/nexus_amr_basics/launch/",
        "file": "m02_l11_01_task_fleet_launch.py"
    },
    "lesson_10": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l12_01_task_navigate_distance_server\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m02_l12_01_task_navigate_distance_server\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l12_01_task_navigate_distance_server.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m02_l12_01_task_navigate_distance_server.py"
    },
    "lesson_11": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l07_01_task_status_publisher\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m02_l07_01_task_status_publisher\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l07_01_task_status_publisher.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m02_l07_01_task_status_publisher.py"
    },
    "lesson_12": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/scripts/m02_l12_task_bag_recorder\.sh</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/scripts/m02_l12_task_bag_recorder\.sh</code>:</p>",
        "cmd": "mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m02_l12_task_bag_recorder.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m02_l12_task_bag_recorder.sh",
        "file": "m02_l12_task_bag_recorder.sh"
    },
    "lesson_13": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/scripts/m02_l13_task_cli_audit\.sh</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/scripts/m02_l13_task_cli_audit\.sh</code>:</p>",
        "cmd": "mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m02_l13_task_cli_audit.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m02_l13_task_cli_audit.sh",
        "file": "m02_l13_task_cli_audit.sh"
    },
    "lesson_14": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_description/urdf/m03_l14_task_camera_sensor\.xacro</code> or edit <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_description/urdf/camera\.xacro</code> in your student workspace:</p>",
        "cmd": "mkdir -p ~/ros2_ws/src/nexus_amr_description/urdf\ncp ~/ros2_ws_reference/src/nexus_amr_description/urdf/m03_l14_task_camera_sensor.xacro ~/ros2_ws/src/nexus_amr_description/urdf/",
        "file": "m03_l14_task_camera_sensor.xacro"
    },
    "lesson_16": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m03_l16_01_task_diff_drive_telemetry\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m03_l16_01_task_diff_drive_telemetry\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m03_l16_01_task_diff_drive_telemetry.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m03_l16_01_task_diff_drive_telemetry.py"
    },
    "lesson_17": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/scripts/m03_l17_task_spawn_warehouse_obstacle\.sh</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/scripts/m03_l17_task_spawn_warehouse_obstacle\.sh</code>:</p>",
        "cmd": "mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m03_l17_task_spawn_warehouse_obstacle.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m03_l17_task_spawn_warehouse_obstacle.sh",
        "file": "m03_l17_task_spawn_warehouse_obstacle.sh"
    },
    "lesson_18": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/scripts/m04_l18_task_slam_mapping\.sh</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/scripts/m04_l18_task_slam_mapping\.sh</code>:</p>",
        "cmd": "mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m04_l18_task_slam_mapping.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m04_l18_task_slam_mapping.sh",
        "file": "m04_l18_task_slam_mapping.sh"
    },
    "lesson_19": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m04_l19_01_task_costmap_validator\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m04_l19_01_task_costmap_validator\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m04_l19_01_task_costmap_validator.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m04_l19_01_task_costmap_validator.py"
    },
    "lesson_20": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m04_l20_01_task_controller_tuner\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m04_l20_01_task_controller_tuner\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m04_l20_01_task_controller_tuner.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m04_l20_01_task_controller_tuner.py"
    },
    "lesson_21": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m04_l21_01_task_recovery_monitor\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/m04_l21_01_task_recovery_monitor\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m04_l21_01_task_recovery_monitor.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/",
        "file": "m04_l21_01_task_recovery_monitor.py"
    },
    "lesson_22": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/src/nexus_amr_navigation/nexus_amr_navigation/m04_l22_02_task_multi_waypoint_patrol\.py</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/src/nexus_amr_navigation/nexus_amr_navigation/m04_l22_02_task_multi_waypoint_patrol\.py</code>:</p>",
        "cmd": "cp ~/ros2_ws_reference/src/nexus_amr_navigation/nexus_amr_navigation/m04_l22_02_task_multi_waypoint_patrol.py ~/ros2_ws/src/nexus_amr_navigation/nexus_amr_navigation/",
        "file": "m04_l22_02_task_multi_waypoint_patrol.py"
    },
    "lesson_23": {
        "pattern": r"<p>Open <code class=\"inline-code\">~/ros2_ws_reference/scripts/m04_l23_task_hardware_check\.sh</code> or copy it to your student workspace <code class=\"inline-code\">~/ros2_ws/scripts/m04_l23_task_hardware_check\.sh</code>:</p>",
        "cmd": "mkdir -p ~/ros2_ws/scripts\ncp ~/ros2_ws_reference/scripts/m04_l23_task_hardware_check.sh ~/ros2_ws/scripts/\nchmod +x ~/ros2_ws/scripts/m04_l23_task_hardware_check.sh",
        "file": "m04_l23_task_hardware_check.sh"
    }
}

for lesson in data["lessons"]:
    lid = lesson["id"]
    if lid in tasks_config:
        cfg = tasks_config[lid]
        html = lesson["html_content"]
        
        # Build the replacement block:
        # 1. Clear instruction telling the student to copy
        # 2. Command container with copyable code
        # 3. Followed by opening the file to complete TODOs
        rep = f'''<p>Copy the starter template from the reference workspace into your active student workspace:</p>
<div class="code-container" data-language="bash">
  <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
  <pre><code class="language-bash">{cfg["cmd"]}</code></pre>
</div>
<p>Open the copied file in your editor and complete the marked <code class="inline-code">TODO</code> targets:</p>'''

        new_html, count = re.subn(cfg["pattern"], rep, html)
        if count == 1:
            lesson["html_content"] = new_html
            print(f"[{lid}] Successfully updated starter template copy instruction!")
        else:
            print(f"[{lid}] Pattern matched {count} times (Expected 1)!")

    # Check verification steps for scripts running from ros2_ws_reference
    html = lesson["html_content"]
    # Fix verification steps referencing ros2_ws_reference for scripts
    v_fixes = [
        ("~/ros2_ws_reference/scripts/m03_l17_task_spawn_warehouse_obstacle.sh", "~/ros2_ws/scripts/m03_l17_task_spawn_warehouse_obstacle.sh"),
        ("~/ros2_ws_reference/scripts/m04_l18_task_slam_mapping.sh", "~/ros2_ws/scripts/m04_l18_task_slam_mapping.sh"),
        ("~/ros2_ws_reference/scripts/m04_l23_task_hardware_check.sh", "~/ros2_ws/scripts/m04_l23_task_hardware_check.sh"),
        ("cp ~/ros2_ws_reference/src/nexus_amr_basics/nexus_amr_basics/m02_l12_02_solution_navigate_distance_server.py ~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/\ncd ~/ros2_ws\ncolcon build --symlink-install --packages-select nexus_amr_basics\nsource install/setup.bash",
         "cd ~/ros2_ws\ncolcon build --symlink-install --packages-select nexus_amr_basics\nsource install/setup.bash")
    ]
    for old_s, new_s in v_fixes:
        if old_s in html:
            lesson["html_content"] = html.replace(old_s, new_s)
            print(f"[{lid}] Fixed verification step running reference path: {old_s[:40]}...")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved lessonsData.json successfully!")
