# Lesson 04: ROS 2 Package Architecture & Configuration Deep Dive

> **Focus:** Python Package Internals (`ament_python`), `package.xml`, and `setup.py`  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

In ROS 2, code cannot exist in isolation. All executable nodes, launch configurations, URDF models, and YAML parameters must reside inside a **Package**.

By the end of this lesson, you will:
1. Understand the anatomy and filesystem structure of an `ament_python` package.
2. Master `package.xml` (Format 3 schema), understanding dependency resolution tags (`<depend>`, `<exec_depend>`).
3. Master `setup.py`, including `data_files` installation to `share/` and `entry_points` console script mappings.
4. Understand how the **Ament Index** (`resource/` marker file) enables `ros2 run` and `ros2 pkg` discovery.
5. Manually configure a production robotics package from scratch without relying on boilerplate generators.

---

## 2. Package Anatomy: What Makes a Folder a ROS 2 Package?

A pure Python package in ROS 2 follows the standard Python `setuptools` packaging structure augmented with ROS 2 metadata:

```
navpro_controller/
├── package.xml                 # 1. Package metadata & dependency declarations (XML)
├── setup.py                    # 2. Python build script & executable entry points
├── setup.cfg                   # 3. Target script installation directory configuration
├── resource/                   # 4. Ament Index marker folder
│   └── navpro_controller       #    Empty file matching package name (Discovery token)
├── navpro_controller/          # 5. Actual Python module directory
│   ├── __init__.py             #    Makes directory an importable Python module
│   ├── motor_driver.py         #    Custom node implementation
│   └── safety_supervisor.py    #    Custom node implementation
├── launch/                     # 6. Runtime launch files
│   └── controller.launch.py
└── config/                     # 7. YAML parameters and tuning files
    └── controller_params.yaml
```

---

## 3. Deep Dive: `package.xml` (Schema Format 3)

The `package.xml` file is parsed by `colcon`, `rosdep`, and the Debian packaging tools to determine dependencies and build order.

Here is a complete, production-grade `package.xml` for a Python package:

```xml
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>navpro_controller</name>
  <version>1.0.0</version>
  <description>Differential drive motor controller and safety supervisor for NavPro AMR</description>
  
  <maintainer email="engineer@navpro.io">NavPro Robotics Team</maintainer>
  <license>Apache-2.0</license>
  
  <author email="dev@navpro.io">Lead Robotics Architect</author>

  <!-- Build Tool Dependencies -->
  <!-- Python packages require setuptools to build and install -->
  <buildtool_depend>ament_python</buildtool_depend>
  <buildtool_depend>python3-setuptools</buildtool_depend>

  <!-- Runtime / Execution Dependencies -->
  <!-- Packages your Python code imports at runtime -->
  <depend>rclpy</depend>
  <depend>geometry_msgs</depend>
  <depend>sensor_msgs</depend>
  <depend>std_msgs</depend>
  <depend>nav_msgs</depend>

  <!-- Testing Dependencies -->
  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <!-- Export Declaration -->
  <!-- Informs colcon this package is built with ament_python -->
  <export>
    <build_type>ament_python</build_type>
  </export>
</package>
```

### Dependency Tags Explained:
* `<buildtool_depend>`: Tools required to *build* the package (e.g. `ament_python`).
* `<depend>`: Declares that the package needs this dependency at **both build-time and runtime** (equivalent to specifying both `<build_depend>` and `<exec_depend>`).
* `<exec_depend>`: Required *only* at runtime when the node executes.
* `<test_depend>`: Required only when running unit tests via `colcon test`.

---

## 4. Deep Dive: `setup.py` & Console Scripts

The `setup.py` script directs Python's `setuptools` on how to install code, configuration files, and create CLI binaries.

```python
from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'navpro_controller'

setup(
    name=package_name,
    version='1.0.0',
    # Automatically locate python subpackages inside navpro_controller/
    packages=find_packages(exclude=['test']),
    
    # data_files installs non-Python assets into the install/share/<pkg> directory
    data_files=[
        # 1. Ament Index Marker: Registers package with ROS 2 discovery
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        
        # 2. package.xml: Installs package manifest into share/
        ('share/' + package_name, ['package.xml']),
        
        # 3. Launch files: Installs all *.launch.py into share/<pkg>/launch
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
        
        # 4. Config files: Installs all *.yaml into share/<pkg>/config
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='NavPro Robotics Team',
    maintainer_email='engineer@navpro.io',
    description='Differential drive motor controller package',
    license='Apache-2.0',
    
    # entry_points generates executable binaries inside install/<pkg>/lib/<pkg>/
    entry_points={
        'console_scripts': [
            # Syntax: 'executable_name = package_dir.python_file:entry_function'
            'motor_driver = navpro_controller.motor_driver:main',
            'safety_supervisor = navpro_controller.safety_supervisor:main',
        ],
    },
)
```

### How `entry_points` Works:
When you execute `ros2 run navpro_controller motor_driver`:
1. ROS 2 queries the Ament Index for `navpro_controller`.
2. It looks inside `install/navpro_controller/lib/navpro_controller/motor_driver`.
3. Setuptools generates a wrapper script that automatically imports `navpro_controller.motor_driver` and invokes `main()`.

---

## 5. Supporting Files: `setup.cfg` and `resource/`

### 5.1 `setup.cfg`
Tells setuptools where to place the generated executable binaries:
```ini
[develop]
script_dir=$base/lib/navpro_controller
[install]
install_scripts=$base/lib/navpro_controller
```
Without this file, executables would be placed directly in `/bin` or `/lib`, breaking ROS 2's package namespacing.

### 5.2 `resource/<package_name>`
An empty file whose filename **must exactly match** `package_name`. When installed into `share/ament_index/resource_index/packages`, it acts as a marker. Commands like `ros2 pkg list` simply read the directory listings of this resource folder.

---

## 6. Step-by-Step: Creating a Modular Package Manually

Let's create a real package called `navpro_teleop_hub` step-by-step.

### Step 6.1: Create Directory Tree
```bash
cd ~/ros2_ws/src
mkdir -p navpro_teleop_hub/navpro_teleop_hub
mkdir -p navpro_teleop_hub/resource
mkdir -p navpro_teleop_hub/launch
mkdir -p navpro_teleop_hub/config
```

### Step 6.2: Create Module and Resource Markers
```bash
touch navpro_teleop_hub/navpro_teleop_hub/__init__.py
touch navpro_teleop_hub/resource/navpro_teleop_hub
```

### Step 6.3: Create `setup.cfg`
```bash
cat << 'EOF' > navpro_teleop_hub/setup.cfg
[develop]
script_dir=$base/lib/navpro_teleop_hub
[install]
install_scripts=$base/lib/navpro_teleop_hub
EOF
```

### Step 6.4: Write the Node File (`teleop_hub.py`)
```bash
cat << 'EOF' > navpro_teleop_hub/navpro_teleop_hub/teleop_hub.py
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node

class TeleopHub(Node):
    def __init__(self):
        super().__init__('teleop_hub')
        self.get_logger().info('Teleop Hub Node initialized successfully!')

def main():
    rclpy.init()
    node = TeleopHub()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
EOF
chmod +x navpro_teleop_hub/navpro_teleop_hub/teleop_hub.py
```

### Step 6.5: Configure `package.xml` and `setup.py`
Add the standard `package.xml` and `setup.py` templates detailed in Sections 3 and 4 with entry point:
`'teleop_hub = navpro_teleop_hub.teleop_hub:main'`

### Step 6.6: Build and Test
```bash
cd ~/ros2_ws
colcon build --symlink-install --packages-select navpro_teleop_hub
source install/setup.bash
ros2 run navpro_teleop_hub teleop_hub
```

---

## 7. Common Package Debugging & Error Resolution

| Symptom / Error | Root Cause | Solution |
|---|---|---|
| `Package 'xyz' not found` | Workspace not sourced, or missing resource marker file | Run `source install/setup.bash`. Check if `resource/xyz` exists and is installed in `setup.py`. |
| `No executable found` | Missing entry point in `setup.py`, or `setup.cfg` missing | Check `entry_points['console_scripts']` for typos. Rebuild with `colcon build`. |
| `ModuleNotFoundError: No module named 'xyz'` | Package name mismatch or missing `__init__.py` in python subfolder | Ensure directory name matches package name and contains `__init__.py`. |
| Changes in `.py` file not updating | Built without `--symlink-install` | Rebuild using `colcon build --symlink-install`. |

---

## 8. Hands-on Student Challenge

**Task:**
In your newly created package `navpro_teleop_hub`:
1. Create a second node file: `navpro_teleop_hub/battery_monitor.py`.
2. Register it as a second executable in `setup.py` entry points under the binary name `battery_monitor`.
3. Re-run `colcon build --symlink-install --packages-select navpro_teleop_hub`.
4. Verify you can run both nodes independently via `ros2 run navpro_teleop_hub teleop_hub` and `ros2 run navpro_teleop_hub battery_monitor`.
