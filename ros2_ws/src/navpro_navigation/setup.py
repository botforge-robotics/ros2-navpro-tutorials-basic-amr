from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'navpro_navigation'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
        (os.path.join('share', package_name, 'maps'), glob('maps/*.*')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='NavPro SLAM Toolbox and Nav2 Navigation stack package',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'nav2_commander_explained = navpro_navigation.nav2_commander_explained:main',
            'task_multi_waypoint_patrol = navpro_navigation.task_multi_waypoint_patrol:main',
            'solution_multi_waypoint_patrol = navpro_navigation.solution_multi_waypoint_patrol:main',
        ],
    },
)
