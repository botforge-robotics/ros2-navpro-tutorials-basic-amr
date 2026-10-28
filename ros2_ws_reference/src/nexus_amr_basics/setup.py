from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'nexus_amr_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.py')),
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Nexus AMR Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            # Module 1 / Lesson 04: Workspace & Package Scaffolding
            'amr_heartbeat = nexus_amr_basics.m01_l04_02_solution_package_scaffold:main',
            'task_package_scaffold = nexus_amr_basics.m01_l04_01_task_package_scaffold:main',
            'solution_package_scaffold = nexus_amr_basics.m01_l04_02_solution_package_scaffold:main',
            'm01_l04_01_task_package_scaffold = nexus_amr_basics.m01_l04_01_task_package_scaffold:main',
            'm01_l04_02_solution_package_scaffold = nexus_amr_basics.m01_l04_02_solution_package_scaffold:main',

            # Module 1 / Lesson 05: Pub/Sub & QoS
            'talker = nexus_amr_basics.m01_l05_01_publisher_member_function:main',
            'listener = nexus_amr_basics.m01_l05_02_subscriber_member_function:main',
            'ultrasonic_publisher = nexus_amr_basics.m01_l05_01_publisher_member_function:main',
            'ultrasonic_sensor = nexus_amr_basics.m01_l05_01_publisher_member_function:main',
            'collision_monitor = nexus_amr_basics.m01_l05_02_subscriber_member_function:main',
            'publisher_member_function = nexus_amr_basics.m01_l05_01_publisher_member_function:main',
            'subscriber_member_function = nexus_amr_basics.m01_l05_02_subscriber_member_function:main',
            'm01_l05_01_publisher_member_function = nexus_amr_basics.m01_l05_01_publisher_member_function:main',
            'm01_l05_02_subscriber_member_function = nexus_amr_basics.m01_l05_02_subscriber_member_function:main',
            'publisher_explained = nexus_amr_basics.m01_l05_03_publisher_explained:main',
            'subscriber_explained = nexus_amr_basics.m01_l05_04_subscriber_explained:main',
            'm01_l05_03_publisher_explained = nexus_amr_basics.m01_l05_03_publisher_explained:main',
            'm01_l05_04_subscriber_explained = nexus_amr_basics.m01_l05_04_subscriber_explained:main',
            'mock_telemetry_provider = nexus_amr_basics.m01_l05_05_mock_telemetry_provider:main',
            'm01_l05_05_mock_telemetry_provider = nexus_amr_basics.m01_l05_05_mock_telemetry_provider:main',
            'task_turtle_square = nexus_amr_basics.m01_l05_06_task_turtle_square:main',
            'solution_turtle_square = nexus_amr_basics.m01_l05_07_solution_turtle_square:main',
            'square_turtle = nexus_amr_basics.m01_l05_07_solution_turtle_square:main',
            'turtle_square_controller = nexus_amr_basics.m01_l05_07_solution_turtle_square:main',
            'm01_l05_06_task_turtle_square = nexus_amr_basics.m01_l05_06_task_turtle_square:main',
            'm01_l05_07_solution_turtle_square = nexus_amr_basics.m01_l05_07_solution_turtle_square:main',
            'task_custom_pubsub = nexus_amr_basics.m01_l05_task_custom_pubsub:main',
            'solution_custom_pubsub = nexus_amr_basics.m01_l05_solution_custom_pubsub:main',
            'm01_l05_task_custom_pubsub = nexus_amr_basics.m01_l05_task_custom_pubsub:main',
            'm01_l05_solution_custom_pubsub = nexus_amr_basics.m01_l05_solution_custom_pubsub:main',
            'task_teleop_speed_limiter = nexus_amr_basics.m01_l05_task_teleop_speed_limiter:main',
            'solution_teleop_speed_limiter = nexus_amr_basics.m01_l05_solution_teleop_speed_limiter:main',
            'm01_l05_task_teleop_speed_limiter = nexus_amr_basics.m01_l05_task_teleop_speed_limiter:main',
            'm01_l05_solution_teleop_speed_limiter = nexus_amr_basics.m01_l05_solution_teleop_speed_limiter:main',

            # Module 1 / Lesson 06: VS Code Tooling & ROS 2 Logging Framework
            'logging_node = nexus_amr_basics.m01_l06_01_logger_levels_demo:main',
            'logger_levels = nexus_amr_basics.m01_l06_01_logger_levels_demo:main',
            'm01_l06_01_logger_levels_demo = nexus_amr_basics.m01_l06_01_logger_levels_demo:main',
            'throttled_logger = nexus_amr_basics.m01_l06_02_throttled_logging_node:main',
            'm01_l06_02_throttled_logging_node = nexus_amr_basics.m01_l06_02_throttled_logging_node:main',
            'task_battery_logger = nexus_amr_basics.m01_l06_03_task_battery_monitor_logger:main',
            'm01_l06_03_task_battery_monitor_logger = nexus_amr_basics.m01_l06_03_task_battery_monitor_logger:main',
            'solution_battery_logger = nexus_amr_basics.m01_l06_04_solution_battery_monitor_logger:main',
            'm01_l06_04_solution_battery_monitor_logger = nexus_amr_basics.m01_l06_04_solution_battery_monitor_logger:main',

            # Module 2 / Lesson 07: Custom Messages
            'robot_status_publisher = nexus_amr_basics.m02_l07_02_solution_status_publisher:main',
            'task_status_publisher = nexus_amr_basics.m02_l07_01_task_status_publisher:main',
            'solution_status_publisher = nexus_amr_basics.m02_l07_02_solution_status_publisher:main',
            'ultrasonic_custom_publisher = nexus_amr_basics.m02_l07_03_ultrasonic_custom_publisher:main',
            'collision_custom_subscriber = nexus_amr_basics.m02_l07_04_collision_custom_subscriber:main',
            'm02_l07_01_task_status_publisher = nexus_amr_basics.m02_l07_01_task_status_publisher:main',
            'm02_l07_02_solution_status_publisher = nexus_amr_basics.m02_l07_02_solution_status_publisher:main',
            'm02_l07_03_ultrasonic_custom_publisher = nexus_amr_basics.m02_l07_03_ultrasonic_custom_publisher:main',
            'm02_l07_04_collision_custom_subscriber = nexus_amr_basics.m02_l07_04_collision_custom_subscriber:main',

            # Module 2 / Lesson 07: Services (Emergency Stop & Speed Mode Governor)
            'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
            'emergency_stop_client = nexus_amr_basics.emergency_stop_client:main',
            'service_member_function = nexus_amr_basics.m02_l08_01_service_member_function:main',
            'client_member_function = nexus_amr_basics.m02_l08_02_client_member_function:main',
            'm02_l08_01_service_member_function = nexus_amr_basics.m02_l08_01_service_member_function:main',
            'm02_l08_02_client_member_function = nexus_amr_basics.m02_l08_02_client_member_function:main',
            'service_server_explained = nexus_amr_basics.m02_l08_03_service_server_explained:main',
            'm02_l08_03_service_server_explained = nexus_amr_basics.m02_l08_03_service_server_explained:main',
            'speed_mode_server = nexus_amr_basics.m02_l07_solution_speed_mode_server:main',
            'task_speed_mode_server = nexus_amr_basics.m02_l07_task_speed_mode_server:main',
            'solution_speed_mode_server = nexus_amr_basics.m02_l07_solution_speed_mode_server:main',
            'm02_l07_task_speed_mode_server = nexus_amr_basics.m02_l07_task_speed_mode_server:main',
            'm02_l07_solution_speed_mode_server = nexus_amr_basics.m02_l07_solution_speed_mode_server:main',
            # Legacy aliases
            'task_service_calculator = nexus_amr_basics.m02_l07_task_speed_mode_server:main',
            'solution_service_calculator = nexus_amr_basics.m02_l07_solution_speed_mode_server:main',
            'm02_l08_task_service_calculator = nexus_amr_basics.m02_l07_task_speed_mode_server:main',
            'm02_l08_solution_service_calculator = nexus_amr_basics.m02_l07_solution_speed_mode_server:main',
            'm02_l09_03_task_speed_mode_server = nexus_amr_basics.m02_l07_task_speed_mode_server:main',
            'm02_l09_04_solution_speed_mode_server = nexus_amr_basics.m02_l07_solution_speed_mode_server:main',

            # Module 2 / Lesson 08: Dynamic Parameters & YAML Configuration
            'minimal_param_node = nexus_amr_basics.minimal_param_node:main',
            'param_node_explained = nexus_amr_basics.param_node_explained:main',
            'm02_l08_01_minimal_param_node = nexus_amr_basics.m02_l08_01_minimal_param_node:main',
            'm02_l08_02_param_node_explained = nexus_amr_basics.m02_l08_02_param_node_explained:main',
            # Legacy/Transition aliases
            'dynamic_safety_params = nexus_amr_basics.m02_l10_02_solution_dynamic_safety_params:main',
            'task_dynamic_safety_params = nexus_amr_basics.m02_l10_01_task_dynamic_safety_params:main',
            'solution_dynamic_safety_params = nexus_amr_basics.m02_l10_02_solution_dynamic_safety_params:main',
            'm02_l09_01_minimal_param_node = nexus_amr_basics.m02_l08_01_minimal_param_node:main',
            'm02_l09_02_param_node_explained = nexus_amr_basics.m02_l08_02_param_node_explained:main',

            # Module 2 / Lesson 11 & 12: Action Servers & Clients
            'navigate_distance_server = nexus_amr_basics.m02_l11_01_fibonacci_action_server:main',
            'navigate_distance_client = nexus_amr_basics.m02_l11_02_fibonacci_action_client:main',
            'fibonacci_action_server = nexus_amr_basics.m02_l11_01_fibonacci_action_server:main',
            'fibonacci_action_client = nexus_amr_basics.m02_l11_02_fibonacci_action_client:main',
            'task_navigate_action = nexus_amr_basics.m02_l12_01_task_fibonacci_action_server:main',
            'solution_navigate_action = nexus_amr_basics.m02_l12_02_solution_fibonacci_action_server:main',
            'task_fibonacci_action = nexus_amr_basics.m02_l12_01_task_fibonacci_action_server:main',
            'solution_fibonacci_action = nexus_amr_basics.m02_l12_02_solution_fibonacci_action_server:main',
            'm02_l11_01_fibonacci_action_server = nexus_amr_basics.m02_l11_01_fibonacci_action_server:main',
            'm02_l11_02_fibonacci_action_client = nexus_amr_basics.m02_l11_02_fibonacci_action_client:main',
            'm02_l12_01_task_fibonacci_action_server = nexus_amr_basics.m02_l12_01_task_fibonacci_action_server:main',
            'm02_l12_02_solution_fibonacci_action_server = nexus_amr_basics.m02_l12_02_solution_fibonacci_action_server:main',

            # Module 2 / Lesson 13: Custom Action Interfaces
            'patrol_action_server = nexus_amr_basics.m02_l13_02_solution_patrol_action_server:main',
            'task_patrol_action = nexus_amr_basics.m02_l13_01_task_patrol_action_server:main',
            'solution_patrol_action = nexus_amr_basics.m02_l13_02_solution_patrol_action_server:main',
            'm02_l13_01_task_patrol_action_server = nexus_amr_basics.m02_l13_01_task_patrol_action_server:main',
            'm02_l13_02_solution_patrol_action_server = nexus_amr_basics.m02_l13_02_solution_patrol_action_server:main',

            # Module 3 / Lesson 15: Static TF Broadcaster
            'static_tf_broadcaster = nexus_amr_basics.m03_l15_02_solution_static_tf_broadcaster:main',
            'task_static_tf = nexus_amr_basics.m03_l15_01_task_static_tf_broadcaster:main',
            'solution_static_tf = nexus_amr_basics.m03_l15_02_solution_static_tf_broadcaster:main',
            'm03_l15_01_task_static_tf_broadcaster = nexus_amr_basics.m03_l15_01_task_static_tf_broadcaster:main',
            'm03_l15_02_solution_static_tf_broadcaster = nexus_amr_basics.m03_l15_02_solution_static_tf_broadcaster:main',

            # Module 3 / Lesson 16: Diff Drive Kinematic Telemetry
            'diff_drive_telemetry = nexus_amr_basics.m03_l16_02_solution_diff_drive_telemetry:main',
            'task_diff_drive = nexus_amr_basics.m03_l16_01_task_diff_drive_telemetry:main',
            'solution_diff_drive = nexus_amr_basics.m03_l16_02_solution_diff_drive_telemetry:main',
            'm03_l16_01_task_diff_drive_telemetry = nexus_amr_basics.m03_l16_01_task_diff_drive_telemetry:main',
            'm03_l16_02_solution_diff_drive_telemetry = nexus_amr_basics.m03_l16_02_solution_diff_drive_telemetry:main',

            # Module 4 / Lesson 19: Costmap 2D Safety Validator
            'costmap_validator = nexus_amr_basics.m04_l19_02_solution_costmap_validator:main',
            'task_costmap_validator = nexus_amr_basics.m04_l19_01_task_costmap_validator:main',
            'solution_costmap_validator = nexus_amr_basics.m04_l19_02_solution_costmap_validator:main',
            'm04_l19_01_task_costmap_validator = nexus_amr_basics.m04_l19_01_task_costmap_validator:main',
            'm04_l19_02_solution_costmap_validator = nexus_amr_basics.m04_l19_02_solution_costmap_validator:main',

            # Module 4 / Lesson 20: Path Following Controller Tuner
            'controller_tuner = nexus_amr_basics.m04_l20_02_solution_controller_tuner:main',
            'task_controller_tuner = nexus_amr_basics.m04_l20_01_task_controller_tuner:main',
            'solution_controller_tuner = nexus_amr_basics.m04_l20_02_solution_controller_tuner:main',
            'm04_l20_01_task_controller_tuner = nexus_amr_basics.m04_l20_01_task_controller_tuner:main',
            'm04_l20_02_solution_controller_tuner = nexus_amr_basics.m04_l20_02_solution_controller_tuner:main',

            # Module 4 / Lesson 21: Nav2 Recovery Supervisor
            'recovery_monitor = nexus_amr_basics.m04_l21_02_solution_recovery_monitor:main',
            'task_recovery_monitor = nexus_amr_basics.m04_l21_01_task_recovery_monitor:main',
            'solution_recovery_monitor = nexus_amr_basics.m04_l21_02_solution_recovery_monitor:main',
            'm04_l21_01_task_recovery_monitor = nexus_amr_basics.m04_l21_01_task_recovery_monitor:main',
            'm04_l21_02_solution_recovery_monitor = nexus_amr_basics.m04_l21_02_solution_recovery_monitor:main',
        ],
    },
)
