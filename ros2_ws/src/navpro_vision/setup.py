from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'navpro_vision'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Academy',
    maintainer_email='instructor@botforge.io',
    description='OpenCV integration package for NavPro AMR',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [
            'camera_streamer = navpro_vision.camera_streamer:main',
            'vision_processor_node = navpro_vision.vision_processor_node:main',
            'task_opencv_inspection = navpro_vision.task_opencv_inspection:main',
            'solution_opencv_inspection = navpro_vision.solution_opencv_inspection:main',
        ],
    },
)
