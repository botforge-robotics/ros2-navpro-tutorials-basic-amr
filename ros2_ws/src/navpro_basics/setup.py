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
            # Official ROS 2 Jazzy Beginner Tutorial Nodes
            'talker = navpro_basics.publisher_member_function:main',
            'listener = navpro_basics.subscriber_member_function:main',
            'publisher_member_function = navpro_basics.publisher_member_function:main',
            'subscriber_member_function = navpro_basics.subscriber_member_function:main',
            'add_two_ints_server = navpro_basics.service_member_function:main',
            'add_two_ints_client = navpro_basics.client_member_function:main',
            'service_member_function = navpro_basics.service_member_function:main',
            'client_member_function = navpro_basics.client_member_function:main',
            'minimal_param_node = navpro_basics.minimal_param_node:main',
            'fibonacci_action_server = navpro_basics.fibonacci_action_server:main',
            'fibonacci_action_client = navpro_basics.fibonacci_action_client:main',

            # Pedagogical Reference Nodes
            'publisher_explained = navpro_basics.publisher_explained:main',
            'subscriber_explained = navpro_basics.subscriber_explained:main',
            'service_server_explained = navpro_basics.service_server_explained:main',
            'param_node_explained = navpro_basics.param_node_explained:main',

            # Student Hands-On Tasks & Solutions
            'task_custom_pubsub = navpro_basics.task_custom_pubsub:main',
            'solution_custom_pubsub = navpro_basics.solution_custom_pubsub:main',
            'task_service_calculator = navpro_basics.task_service_calculator:main',
            'solution_service_calculator = navpro_basics.solution_service_calculator:main',
            'task_teleop_speed_limiter = navpro_basics.task_teleop_speed_limiter:main',
            'solution_teleop_speed_limiter = navpro_basics.solution_teleop_speed_limiter:main',
            'mock_telemetry_provider = navpro_basics.mock_telemetry_provider:main',
        ],
    },
)
