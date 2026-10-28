from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'nexus_amr_gazebo'

setup(
    name=package_name,
    version='1.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        (os.path.join('share', package_name, 'worlds'), glob('worlds/*.world')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Nexus AMR Academy',
    maintainer_email='instructor@botforge.io',
    description='Gazebo simulation package for Nexus AMR AMR',
    license='Apache-2.0',
    entry_points={
        'console_scripts': [],
    },
)
