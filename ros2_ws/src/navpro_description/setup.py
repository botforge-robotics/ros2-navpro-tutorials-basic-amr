from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'navpro_description'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        (os.path.join('share', package_name, 'urdf'), glob('urdf/*.xacro') + glob('urdf/*.urdf')),
        (os.path.join('share', package_name, 'rviz'), glob('rviz/*.rviz')),
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='NavPro Robot URDF and TF2 packages',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'tf_broadcaster_explained = navpro_description.tf_broadcaster_explained:main',
            'task_custom_odometry_tf = navpro_description.task_custom_odometry_tf:main',
            'solution_custom_odometry_tf = navpro_description.solution_custom_odometry_tf:main',
        ],
    },
)
