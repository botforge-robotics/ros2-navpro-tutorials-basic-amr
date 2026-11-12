import React, { useState } from 'react';
import {
  Package,
  FileCode,
  FileText,
  FolderTree,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Copy,
  Check,
  ChevronRight
} from 'lucide-react';

export function PackageStructureFlow() {
  const [selectedFile, setSelectedFile] = useState('setup_py');
  const [activeExecTrace, setActiveExecTrace] = useState(0); // 0: Idle, 1: Ament Index, 2: setup.cfg path, 3: setup.py entry_point, 4: motor_driver.py execution
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTraceNext = () => {
    setActiveExecTrace((prev) => (prev >= 4 ? 0 : prev + 1));
  };

  const packageFiles = [
    {
      id: 'package_xml',
      name: 'package.xml',
      path: 'nexus_amr_controller/package.xml',
      title: 'Package Manifest & Dependency Declarations',
      badge: 'Format 3 XML',
      badgeColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      borderAccent: '#f59e0b',
      icon: FileCode,
      summary: 'Declares package name, version, licensing, and all runtime & build dependencies.',
      purpose: 'Parsed by colcon, rosdep, and package indexing tools to resolve dependency graphs.',
      commonPitfall: 'Forgetting to add an <exec_depend> (e.g. geometry_msgs) will cause your node to crash at runtime with "ModuleNotFoundError" on other machines.',
      code: `<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>nexus_amr_controller</name>
  <version>0.1.0</version>
  <description>Autonomous Mobile Robot Motor Controller</description>
  <maintainer email="student@botforge.io">Nexus AMR Engineer</maintainer>
  <license>Apache-2.0</license>

  <!-- Build Tool Dependency: Required for Python packages -->
  <buildtool_depend>ament_python</buildtool_depend>

  <!-- Runtime Execution Dependencies -->
  <exec_depend>rclpy</exec_depend>
  <exec_depend>geometry_msgs</exec_depend>

  <!-- Test Dependencies -->
  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>`,
      codeLang: 'xml'
    },
    {
      id: 'setup_py',
      name: 'setup.py',
      path: 'nexus_amr_controller/setup.py',
      title: 'Python Build Script & Console Scripts',
      badge: 'Build Engine',
      badgeColor: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.12)',
      borderAccent: '#38bdf8',
      icon: Cpu,
      summary: 'Configures setuptools distribution and maps CLI command names to Python entry points.',
      purpose: 'The entry_points dictionary generates the executable binary placed in install/lib/nexus_amr_controller/.',
      commonPitfall: 'Typo in entry_points ("node_name = pkg.module:main") produces "Package doesn\'t have the executable" error when running ros2 run.',
      code: `from setuptools import find_packages, setup

package_name = 'nexus_amr_controller'

setup(
    name=package_name,
    version='0.1.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        # Registers package with the Ament Index
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        # Installs package.xml to share/nexus_amr_controller/
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Nexus AMR Engineer',
    maintainer_email='student@botforge.io',
    description='Autonomous Mobile Robot Motor Controller',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            # CLI Command Name = Python Module Path : Function
            'motor_driver = nexus_amr_controller.motor_driver:main',
        ],
    },
)`,
      codeLang: 'python'
    },
    {
      id: 'setup_cfg',
      name: 'setup.cfg',
      path: 'nexus_amr_controller/setup.cfg',
      title: 'Script Destination Configuration',
      badge: 'Executable Routing',
      badgeColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      borderAccent: '#10b981',
      icon: Layers,
      summary: 'Forces setuptools to install executables into lib/nexus_amr_controller/ rather than global bin/.',
      purpose: 'Enforces ROS 2 package isolation, preventing script name collisions between different packages.',
      commonPitfall: 'Removing or corrupting setup.cfg causes colcon to install binaries into standard bin/, which breaks ros2 run resolution.',
      code: `[develop]
script_dir=$base/lib/nexus_amr_controller
[install]
install_scripts=$base/lib/nexus_amr_controller`,
      codeLang: 'ini'
    },
    {
      id: 'resource',
      name: 'resource/nexus_amr_controller',
      path: 'nexus_amr_controller/resource/nexus_amr_controller',
      title: 'Ament Index Discovery Marker',
      badge: 'Discovery Marker',
      badgeColor: '#c084fc',
      badgeBg: 'rgba(192, 132, 252, 0.12)',
      borderAccent: '#c084fc',
      icon: Sparkles,
      summary: 'An empty marker file matching the exact package name.',
      purpose: 'Provides the token required by the Ament Index. Without it, ros2 pkg list and ros2 run will fail to discover the package.',
      commonPitfall: 'Deleting the resource/ folder makes the package invisible to the ROS 2 ecosystem even after a successful colcon build!',
      code: `# An empty marker file placed inside the resource/ directory.
# Filename MUST match the package name exactly:
# resource/nexus_amr_controller

# When built, colcon installs this file into:
# install/share/ament_index/resource_index/packages/nexus_amr_controller
# This allows ROS 2 CLI commands to discover the package instantly!`,
      codeLang: 'bash'
    },
    {
      id: 'module_dir',
      name: 'nexus_amr_controller/',
      path: 'nexus_amr_controller/nexus_amr_controller/',
      title: 'Python Package Module & Node Scripts',
      badge: 'Node Code',
      badgeColor: '#0ea5e9',
      badgeBg: 'rgba(14, 165, 233, 0.12)',
      borderAccent: '#0ea5e9',
      icon: FolderTree,
      summary: 'The importable Python module containing __init__.py and your custom ROS 2 Node classes.',
      purpose: 'Where the actual robotics behavior, publisher callbacks, and subscriber logic are implemented.',
      commonPitfall: 'Forgetting __init__.py prevents Python from recognizing this folder as a module, breaking module imports.',
      code: `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class MotorDriverNode(Node):
    def __init__(self):
        super().__init__('motor_driver_node')
        self.subscription = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_vel_callback,
            10
        )
        self.get_logger().info('Nexus AMR Motor Driver node initialized!')

    def cmd_vel_callback(self, msg):
        self.get_logger().info(f'Linear: {msg.linear.x}, Angular: {msg.angular.z}')

def main(args=None):
    rclpy.init(args=args)
    node = MotorDriverNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
      codeLang: 'python'
    }
  ];

  const currentFile = packageFiles.find((f) => f.id === selectedFile) || packageFiles[0];

  const traceSteps = [
    {
      num: 1,
      targetFile: 'resource',
      title: '1. Ament Index Query',
      desc: 'ros2 run queries resource_index/packages to verify nexus_amr_controller is installed.'
    },
    {
      num: 2,
      targetFile: 'setup_cfg',
      title: '2. Path Resolution via setup.cfg',
      desc: 'Checks setup.cfg to locate the package executable prefix in install/lib/nexus_amr_controller/.'
    },
    {
      num: 3,
      targetFile: 'setup_py',
      title: '3. Entry Point Mapping in setup.py',
      desc: 'Matches "motor_driver" to nexus_amr_controller.motor_driver:main in console_scripts.'
    },
    {
      num: 4,
      targetFile: 'module_dir',
      title: '4. Module Execution in Python',
      desc: 'Imports MotorDriverNode, initializes rclpy, spins the node, and connects to the ROS graph!'
    }
  ];

  return (
    <div className="package-structure-infographic" style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '0.85rem 1.15rem',
      margin: '0',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header with Title and Execution Tracer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '0.75rem',
        paddingBottom: '0.65rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(56, 189, 248, 0.15) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b'
          }}>
            <Package size={18} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Anatomy of an <code style={{ color: '#38bdf8' }}>ament_python</code> Package
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              The 5 essential components that transform a directory into a functional ROS 2 package
            </span>
          </div>
        </div>

        {/* Execution Tracer Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleTraceNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeExecTrace > 0 ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'var(--bg-card, #0f172a)',
              color: activeExecTrace > 0 ? '#ffffff' : 'var(--text-primary)',
              border: activeExecTrace > 0 ? '1px solid #38bdf8' : '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '5px 11px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeExecTrace > 0 ? '0 2px 8px rgba(2, 132, 199, 0.35)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Play size={12} fill={activeExecTrace > 0 ? 'currentColor' : 'none'} />
            <span>
              {activeExecTrace === 0 ? 'Trace ros2 run Execution' : `Execution Step ${activeExecTrace}/4 (Next &rarr;)`}
            </span>
          </button>

          {activeExecTrace > 0 && (
            <button
              onClick={() => setActiveExecTrace(0)}
              title="Reset Trace"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                background: 'var(--bg-primary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Execution Trace Live Step Banner */}
      {activeExecTrace > 0 && (
        <div style={{
          background: 'rgba(2, 132, 199, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Sparkles size={20} color="#38bdf8" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8', marginBottom: '2px' }}>
              {traceSteps[activeExecTrace - 1].title}: <code style={{ color: '#ffffff' }}>ros2 run nexus_amr_controller motor_driver</code>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {traceSteps[activeExecTrace - 1].desc}
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Layout: Left Tree Structure & Right Code Inspector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.4fr)',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Interactive File Tree Navigator */}
        <div style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>
              Package Hierarchy
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Click to inspect
            </span>
          </div>

          {/* Root Package Name */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '0.75rem',
            paddingLeft: '4px'
          }}>
            <Package size={16} color="#38bdf8" />
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
              nexus_amr_controller/
            </strong>
          </div>

          {/* File Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {packageFiles.map((file) => {
              const isSelected = selectedFile === file.id;
              const isTraced = activeExecTrace > 0 && traceSteps[activeExecTrace - 1].targetFile === file.id;
              const Icon = file.icon;

              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: isSelected
                      ? 'rgba(56, 189, 248, 0.1)'
                      : isTraced
                      ? 'rgba(245, 158, 11, 0.15)'
                      : 'transparent',
                    border: isSelected
                      ? '1px solid #38bdf8'
                      : isTraced
                      ? '1px solid #f59e0b'
                      : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={14} color={isSelected ? file.borderAccent : 'var(--text-muted)'} />
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? file.borderAccent : 'var(--text-primary)'
                    }}>
                      {file.name}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    padding: '2px 5px',
                    borderRadius: '4px',
                    background: file.badgeBg,
                    color: file.badgeColor
                  }}>
                    {file.badge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Golden Rule Summary Card */}
          <div style={{
            marginTop: '0.65rem',
            padding: '7px 10px',
            borderRadius: '8px',
            background: 'var(--bg-canvas, rgba(16, 185, 129, 0.08))',
            border: '1px solid var(--border-color)',
            fontSize: '0.76rem',
            color: 'var(--text-primary)',
            lineHeight: 1.4
          }}>
            <strong style={{ color: '#10b981' }}>The Minimum Package Requirement:</strong>
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>
              A ROS 2 Python package requires at least a <code style={{ color: '#f59e0b', fontWeight: 600 }}>package.xml</code> and a <code style={{ color: '#38bdf8', fontWeight: 600 }}>setup.py</code> file to be buildable by colcon.
            </span>
          </div>
        </div>

        {/* Right Column: Deep-Dive Code Inspector & Documentation */}
        <div style={{
          background: '#090d16',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {/* File Header Bar */}
          <div style={{
            padding: '0.65rem 1rem',
            background: 'rgba(15, 23, 42, 0.8)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.84rem',
                fontWeight: 800,
                color: currentFile.borderAccent
              }}>
                {currentFile.path}
              </span>
            </div>

            <button
              onClick={() => handleCopy(currentFile.code, currentFile.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '3px 7px',
                fontSize: '0.7rem',
                color: copiedId === currentFile.id ? '#10b981' : '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              {copiedId === currentFile.id ? <Check size={12} /> : <Copy size={12} />}
              <span>{copiedId === currentFile.id ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Description & Purpose Banner */}
          <div style={{
            padding: '0.65rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 23, 42, 0.6)'
          }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', marginBottom: '3px' }}>
              {currentFile.title}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '6px', lineHeight: 1.45 }}>
              {currentFile.purpose}
            </div>

            {/* Common Pitfall Alert */}
            <div style={{
              display: 'flex',
              alignItems: 'start',
              gap: '6px',
              padding: '6px 8px',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              fontSize: '0.74rem',
              color: '#fecaca',
              lineHeight: 1.4
            }}>
              <AlertTriangle size={14} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#f87171' }}>Common Pitfall:</strong> {currentFile.commonPitfall}
              </div>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div style={{
            padding: '0.75rem 1rem',
            overflowX: 'auto',
            maxHeight: '185px'
          }}>
            <pre style={{
              margin: 0,
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              color: '#e2e8f0'
            }}>
              <code>{currentFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
