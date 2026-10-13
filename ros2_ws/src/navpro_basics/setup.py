from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'navpro_basics'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='ROS 2 Day 1: Topics, Services, Parameters, and Launch Files',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            # Module 1 / Lesson 05: Pub/Sub & QoS
            'talker = navpro_basics.m01_l05_01_publisher_member_function:main',
            'listener = navpro_basics.m01_l05_02_subscriber_member_function:main',
            'publisher_member_function = navpro_basics.m01_l05_01_publisher_member_function:main',
            'subscriber_member_function = navpro_basics.m01_l05_02_subscriber_member_function:main',
            'm01_l05_01_publisher_member_function = navpro_basics.m01_l05_01_publisher_member_function:main',
            'm01_l05_02_subscriber_member_function = navpro_basics.m01_l05_02_subscriber_member_function:main',
            'publisher_explained = navpro_basics.m01_l05_03_publisher_explained:main',
            'subscriber_explained = navpro_basics.m01_l05_04_subscriber_explained:main',
            'm01_l05_03_publisher_explained = navpro_basics.m01_l05_03_publisher_explained:main',
            'm01_l05_04_subscriber_explained = navpro_basics.m01_l05_04_subscriber_explained:main',
            'mock_telemetry_provider = navpro_basics.m01_l05_05_mock_telemetry_provider:main',
            'm01_l05_05_mock_telemetry_provider = navpro_basics.m01_l05_05_mock_telemetry_provider:main',
            'task_custom_pubsub = navpro_basics.m01_l05_task_custom_pubsub:main',
            'solution_custom_pubsub = navpro_basics.m01_l05_solution_custom_pubsub:main',
            'm01_l05_task_custom_pubsub = navpro_basics.m01_l05_task_custom_pubsub:main',
            'm01_l05_solution_custom_pubsub = navpro_basics.m01_l05_solution_custom_pubsub:main',
            'task_teleop_speed_limiter = navpro_basics.m01_l05_task_teleop_speed_limiter:main',
            'solution_teleop_speed_limiter = navpro_basics.m01_l05_solution_teleop_speed_limiter:main',
            'm01_l05_task_teleop_speed_limiter = navpro_basics.m01_l05_task_teleop_speed_limiter:main',
            'm01_l05_solution_teleop_speed_limiter = navpro_basics.m01_l05_solution_teleop_speed_limiter:main',

            # Module 2 / Lesson 08: Services
            'add_two_ints_server = navpro_basics.m02_l08_01_service_member_function:main',
            'add_two_ints_client = navpro_basics.m02_l08_02_client_member_function:main',
            'service_member_function = navpro_basics.m02_l08_01_service_member_function:main',
            'client_member_function = navpro_basics.m02_l08_02_client_member_function:main',
            'm02_l08_01_service_member_function = navpro_basics.m02_l08_01_service_member_function:main',
            'm02_l08_02_client_member_function = navpro_basics.m02_l08_02_client_member_function:main',
            'service_server_explained = navpro_basics.m02_l08_03_service_server_explained:main',
            'm02_l08_03_service_server_explained = navpro_basics.m02_l08_03_service_server_explained:main',
            'task_service_calculator = navpro_basics.m02_l08_task_service_calculator:main',
            'solution_service_calculator = navpro_basics.m02_l08_solution_service_calculator:main',
            'm02_l08_task_service_calculator = navpro_basics.m02_l08_task_service_calculator:main',
            'm02_l08_solution_service_calculator = navpro_basics.m02_l08_solution_service_calculator:main',

            # Module 2 / Lesson 09: Parameters
            'minimal_param_node = navpro_basics.m02_l09_01_minimal_param_node:main',
            'param_node_explained = navpro_basics.m02_l09_02_param_node_explained:main',
            'm02_l09_01_minimal_param_node = navpro_basics.m02_l09_01_minimal_param_node:main',
            'm02_l09_02_param_node_explained = navpro_basics.m02_l09_02_param_node_explained:main',

            # Module 2 / Lesson 11: Actions
            'fibonacci_action_server = navpro_basics.m02_l11_01_fibonacci_action_server:main',
            'fibonacci_action_client = navpro_basics.m02_l11_02_fibonacci_action_client:main',
            'm02_l11_01_fibonacci_action_server = navpro_basics.m02_l11_01_fibonacci_action_server:main',
            'm02_l11_02_fibonacci_action_client = navpro_basics.m02_l11_02_fibonacci_action_client:main',
        ],
    },
)
