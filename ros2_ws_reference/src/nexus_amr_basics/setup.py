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
    description='ROS 2 AMR Workshop: Topics, Services, Parameters, Launch, Actions & Navigation Helpers',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            # =========================================================================
            # MODULE 1 (DAY 1): ROS 2 Foundations & Core Middleware
            # =========================================================================
            # Lesson 04: Workspace & Package Scaffolding
            'amr_heartbeat = nexus_amr_basics.m01_l04_02_solution_package_scaffold:main',
            'task_package_scaffold = nexus_amr_basics.m01_l04_01_task_package_scaffold:main',
            'solution_package_scaffold = nexus_amr_basics.m01_l04_02_solution_package_scaffold:main',
            'm01_l04_01_task_package_scaffold = nexus_amr_basics.m01_l04_01_task_package_scaffold:main',
            'm01_l04_02_solution_package_scaffold = nexus_amr_basics.m01_l04_02_solution_package_scaffold:main',

            # Lesson 05: Pub/Sub & Quality of Service (QoS)
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

            # Lesson 06: Service Servers & Clients in Python
            'service_server = nexus_amr_basics.emergency_stop_server:main',
            'service_client = nexus_amr_basics.emergency_stop_client:main',
            'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
            'emergency_stop_client = nexus_amr_basics.emergency_stop_client:main',
            'speed_mode_server = nexus_amr_basics.m01_l06_solution_speed_mode_server:main',
            'task_speed_mode_server = nexus_amr_basics.m01_l06_task_speed_mode_server:main',
            'solution_speed_mode_server = nexus_amr_basics.m01_l06_solution_speed_mode_server:main',
            'm01_l06_task_speed_mode_server = nexus_amr_basics.m01_l06_task_speed_mode_server:main',
            'm01_l06_solution_speed_mode_server = nexus_amr_basics.m01_l06_solution_speed_mode_server:main',
            'm02_l07_task_speed_mode_server = nexus_amr_basics.m01_l06_task_speed_mode_server:main',
            'm02_l07_solution_speed_mode_server = nexus_amr_basics.m01_l06_solution_speed_mode_server:main',
            'm02_l09_03_task_speed_mode_server = nexus_amr_basics.m01_l06_task_speed_mode_server:main',
            'm02_l09_04_solution_speed_mode_server = nexus_amr_basics.m01_l06_solution_speed_mode_server:main',

            # Lesson 07: Dynamic Parameters & YAML Configuration
            'param_node = nexus_amr_basics.m01_l07_02_param_node_explained:main',
            'param_node_explained = nexus_amr_basics.m01_l07_02_param_node_explained:main',
            'minimal_param_node = nexus_amr_basics.m01_l07_01_minimal_param_node:main',
            'parameter_explained = nexus_amr_basics.m01_l07_02_param_node_explained:main',
            'dynamic_safety_params = nexus_amr_basics.m01_l07_02_param_node_explained:main',
            'm01_l07_01_minimal_param_node = nexus_amr_basics.m01_l07_01_minimal_param_node:main',
            'm01_l07_02_param_node_explained = nexus_amr_basics.m01_l07_02_param_node_explained:main',
            'm02_l08_01_minimal_param_node = nexus_amr_basics.m01_l07_01_minimal_param_node:main',
            'm02_l08_02_param_node_explained = nexus_amr_basics.m01_l07_02_param_node_explained:main',
            'm02_l09_01_minimal_param_node = nexus_amr_basics.m01_l07_01_minimal_param_node:main',
            'm02_l09_02_param_node_explained = nexus_amr_basics.m01_l07_02_param_node_explained:main',

            # Lesson 09: Action Servers & Clients in Python
            'navigate_action_server = nexus_amr_basics.m01_l09_solution_navigate_distance_server:main',
            'task_navigate_action = nexus_amr_basics.m01_l09_task_navigate_distance_server:main',
            'solution_navigate_action = nexus_amr_basics.m01_l09_solution_navigate_distance_server:main',
            'm01_l09_task_navigate_distance_server = nexus_amr_basics.m01_l09_task_navigate_distance_server:main',
            'm01_l09_solution_navigate_distance_server = nexus_amr_basics.m01_l09_solution_navigate_distance_server:main',
            'fibonacci_action_server = nexus_amr_basics.m02_l11_01_fibonacci_action_server:main',
            'fibonacci_action_client = nexus_amr_basics.m02_l11_02_fibonacci_action_client:main',
            'task_fibonacci_action = nexus_amr_basics.m02_l12_01_task_fibonacci_action_server:main',
            'solution_fibonacci_action = nexus_amr_basics.m02_l12_02_solution_fibonacci_action_server:main',
            'm02_l12_01_task_navigate_distance_server = nexus_amr_basics.m01_l09_task_navigate_distance_server:main',
            'm02_l12_02_solution_navigate_distance_server = nexus_amr_basics.m01_l09_solution_navigate_distance_server:main',

            # =========================================================================
            # MODULE 2 (DAY 2): 3D Robot Modeling & Physics Simulation
            # =========================================================================
            # Lesson 11: RViz2 Visualization & Kinematic TF Inspection
            'static_tf_broadcaster = nexus_amr_basics.m02_l11_solution_static_tf_broadcaster:main',
            'task_static_tf = nexus_amr_basics.m02_l11_task_static_tf_broadcaster:main',
            'solution_static_tf = nexus_amr_basics.m02_l11_solution_static_tf_broadcaster:main',
            'm02_l11_task_static_tf_broadcaster = nexus_amr_basics.m02_l11_task_static_tf_broadcaster:main',
            'm02_l11_solution_static_tf_broadcaster = nexus_amr_basics.m02_l11_solution_static_tf_broadcaster:main',
            'm03_l15_01_task_static_tf_broadcaster = nexus_amr_basics.m02_l11_task_static_tf_broadcaster:main',
            'm03_l15_02_solution_static_tf_broadcaster = nexus_amr_basics.m02_l11_solution_static_tf_broadcaster:main',

            # Lesson 12: Gazebo Physics Simulation & Sensor Plugins
            'diff_drive_telemetry = nexus_amr_basics.m02_l12_solution_diff_drive_telemetry:main',
            'task_diff_drive = nexus_amr_basics.m02_l12_task_diff_drive_telemetry:main',
            'solution_diff_drive = nexus_amr_basics.m02_l12_solution_diff_drive_telemetry:main',
            'm02_l12_task_diff_drive_telemetry = nexus_amr_basics.m02_l12_task_diff_drive_telemetry:main',
            'm02_l12_solution_diff_drive_telemetry = nexus_amr_basics.m02_l12_solution_diff_drive_telemetry:main',
            'm03_l16_01_task_diff_drive_telemetry = nexus_amr_basics.m02_l12_task_diff_drive_telemetry:main',
            'm03_l16_02_solution_diff_drive_telemetry = nexus_amr_basics.m02_l12_solution_diff_drive_telemetry:main',

            # =========================================================================
            # MODULE 3 (DAY 3): Autonomous SLAM & Nav2 Navigation
            # =========================================================================
            # Lesson 15: Nav2 Costmap 2D Configuration
            'costmap_validator = nexus_amr_basics.m03_l15_solution_costmap_validator:main',
            'task_costmap_validator = nexus_amr_basics.m03_l15_task_costmap_validator:main',
            'solution_costmap_validator = nexus_amr_basics.m03_l15_solution_costmap_validator:main',
            'm03_l15_task_costmap_validator = nexus_amr_basics.m03_l15_task_costmap_validator:main',
            'm03_l15_solution_costmap_validator = nexus_amr_basics.m03_l15_solution_costmap_validator:main',
            'm04_l19_01_task_costmap_validator = nexus_amr_basics.m03_l15_task_costmap_validator:main',
            'm04_l19_02_solution_costmap_validator = nexus_amr_basics.m03_l15_solution_costmap_validator:main',

            # Lesson 16: Nav2 Path Planners & Local Controller Tuning
            'controller_tuner = nexus_amr_basics.m03_l16_solution_controller_tuner:main',
            'task_controller_tuner = nexus_amr_basics.m03_l16_task_controller_tuner:main',
            'solution_controller_tuner = nexus_amr_basics.m03_l16_solution_controller_tuner:main',
            'm03_l16_task_controller_tuner = nexus_amr_basics.m03_l16_task_controller_tuner:main',
            'm03_l16_solution_controller_tuner = nexus_amr_basics.m03_l16_solution_controller_tuner:main',
            'm04_l20_01_task_controller_tuner = nexus_amr_basics.m03_l16_task_controller_tuner:main',
            'm04_l20_02_solution_controller_tuner = nexus_amr_basics.m03_l16_solution_controller_tuner:main',

            # =========================================================================
            # MODULE 4 (BONUS): Advanced Masterclasses & Electives
            # =========================================================================
            # Lesson 18: VS Code IDE Tooling & ROS 2 Logging Framework
            'logging_node = nexus_amr_basics.m01_l06_01_logger_levels_demo:main',
            'logger_levels = nexus_amr_basics.m01_l06_01_logger_levels_demo:main',
            'throttled_logger = nexus_amr_basics.m01_l06_02_throttled_logging_node:main',
            'task_battery_logger = nexus_amr_basics.m04_l18_task_battery_monitor_logger:main',
            'solution_battery_logger = nexus_amr_basics.m04_l18_solution_battery_monitor_logger:main',
            'battery_monitor = nexus_amr_basics.m04_l18_solution_battery_monitor_logger:main',
            'm01_l06_01_logger_levels_demo = nexus_amr_basics.m01_l06_01_logger_levels_demo:main',
            'm01_l06_02_throttled_logging_node = nexus_amr_basics.m01_l06_02_throttled_logging_node:main',
            'm01_l06_03_task_battery_monitor_logger = nexus_amr_basics.m04_l18_task_battery_monitor_logger:main',
            'm01_l06_04_solution_battery_monitor_logger = nexus_amr_basics.m04_l18_solution_battery_monitor_logger:main',
            'm04_l18_task_battery_monitor_logger = nexus_amr_basics.m04_l18_task_battery_monitor_logger:main',
            'm04_l18_solution_battery_monitor_logger = nexus_amr_basics.m04_l18_solution_battery_monitor_logger:main',

            # Lesson 19: Custom Interfaces (.msg, .srv, .action)
            'robot_status_publisher = nexus_amr_basics.m04_l19_solution_status_publisher:main',
            'task_status_publisher = nexus_amr_basics.m04_l19_task_status_publisher:main',
            'solution_status_publisher = nexus_amr_basics.m04_l19_solution_status_publisher:main',
            'm04_l19_task_status_publisher = nexus_amr_basics.m04_l19_task_status_publisher:main',
            'm04_l19_solution_status_publisher = nexus_amr_basics.m04_l19_solution_status_publisher:main',
            'm02_l07_01_task_status_publisher = nexus_amr_basics.m04_l19_task_status_publisher:main',
            'm02_l07_02_solution_status_publisher = nexus_amr_basics.m04_l19_solution_status_publisher:main',
            'ultrasonic_custom_publisher = nexus_amr_basics.m02_l07_03_ultrasonic_custom_publisher:main',
            'collision_custom_subscriber = nexus_amr_basics.m02_l07_04_collision_custom_subscriber:main',
            'patrol_action_server = nexus_amr_basics.m02_l13_02_solution_patrol_action_server:main',
            'task_patrol_action = nexus_amr_basics.m02_l13_01_task_patrol_action_server:main',
            'solution_patrol_action = nexus_amr_basics.m02_l13_02_solution_patrol_action_server:main',
            'm02_l13_01_task_patrol_action_server = nexus_amr_basics.m02_l13_01_task_patrol_action_server:main',
            'm02_l13_02_solution_patrol_action_server = nexus_amr_basics.m02_l13_02_solution_patrol_action_server:main',

            # Lesson 22: Behavior Trees & Lifecycle Management
            'recovery_monitor = nexus_amr_basics.m04_l22_solution_recovery_monitor:main',
            'task_recovery_monitor = nexus_amr_basics.m04_l22_task_recovery_monitor:main',
            'solution_recovery_monitor = nexus_amr_basics.m04_l22_solution_recovery_monitor:main',
            'm04_l22_task_recovery_monitor = nexus_amr_basics.m04_l22_task_recovery_monitor:main',
            'm04_l22_solution_recovery_monitor = nexus_amr_basics.m04_l22_solution_recovery_monitor:main',
            'm04_l21_01_task_recovery_monitor = nexus_amr_basics.m04_l22_task_recovery_monitor:main',
            'm04_l21_02_solution_recovery_monitor = nexus_amr_basics.m04_l22_solution_recovery_monitor:main',
        ],
    },
)
