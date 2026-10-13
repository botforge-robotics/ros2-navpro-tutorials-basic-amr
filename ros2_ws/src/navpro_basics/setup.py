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
            'publisher_explained = navpro_basics.publisher_explained:main',
            'subscriber_explained = navpro_basics.subscriber_explained:main',
            'service_server_explained = navpro_basics.service_server_explained:main',
            'param_node_explained = navpro_basics.param_node_explained:main',
            'task_teleop_speed_limiter = navpro_basics.task_teleop_speed_limiter:main',
            'solution_teleop_speed_limiter = navpro_basics.solution_teleop_speed_limiter:main',
            'mock_telemetry_provider = navpro_basics.mock_telemetry_provider:main',
        ],
    },
)
