#!/usr/bin/env python3
"""
scripts/inject_robotics_code_deep_dive.py

Injects full production-grade robotics code implementations into lessonsData.json:
- Lesson 05: Ultrasonic Rangefinder Publisher (Float32, 10Hz, /sensor/ultrasonic_front)
             & Collision Safety Monitor (Threshold: 0.50m)
- Lesson 07: UltrasonicRange.msg Custom Message Publisher & Collision Warning Subscriber
- Lesson 08: TriggerEmergencyStop.srv Safety Service Server & Asynchronous Client
- Lesson 11: NavigateDistance.action Linear Traversal Action Server & Client
"""

import json
import html

DATA_FILE = "lms/src/data/lessonsData.json"

def get_code(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def run():
    print(f"Loading {DATA_FILE}...")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    lessons = data["lessons"]

    # =========================================================================
    # 1. LESSON 05: Ultrasonic Sensor & Collision Monitor
    # =========================================================================
    l05 = next(l for l in lessons if l["id"] == "lesson_05")
    c5 = l05["html_content"]

    l05_sec3 = """<h2 id="3-writing-the-ultrasonic-sensor-publisher-node">3. Writing the Ultrasonic Sensor Rangefinder Publisher Node</h2>
<p>In autonomous mobile robotics, distance sensors (ultrasonic transducers, LiDAR, infrared bumpers) continuously stream proximity telemetry over ROS 2 topics so collision supervisors can prevent accidents.</p>

<p>Create your ultrasonic rangefinder node script in your package source directory: <code class="inline-code">~/ros2_ws/src/navpro_basics/navpro_basics/ultrasonic_sensor_node.py</code>:</p>

<div class="code-container ide-code-window" data-language="python">
  <div class="code-header">
    <div class="code-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="code-filename">ultrasonic_sensor_node.py &mdash; AMR Proximity Rangefinder Publisher</span>
  </div>
  <pre><code class="language-python">import math
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32


class UltrasonicSensorPublisher(Node):
    \"\"\"
    Simulates an ultrasonic rangefinder broadcasting distance telemetry.
    \"\"\"

    def __init__(self):
        # 1. Initialize base Node with unique name 'ultrasonic_sensor_node'
        super().__init__('ultrasonic_sensor_node')

        # 2. Create Publisher:
        # - Message Type: Float32 (single 32-bit floating point distance in meters)
        # - Topic Name: '/sensor/ultrasonic_front'
        # - QoS History Depth: 10
        self.publisher_ = self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)

        # 3. Create non-blocking timer running at 10 Hz (0.1s interval)
        self.timer_period = 0.1
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        self.step_count = 0
        self.get_logger().info(
            'UltrasonicSensorPublisher initialized. Broadcasting to "/sensor/ultrasonic_front" at 10 Hz...'
        )

    def timer_callback(self):
        \"\"\"
        Invoked periodically at 10 Hz by the ROS 2 single-threaded executor.
        \"\"\"
        t = self.step_count * self.timer_period

        # Smooth sinusoidal distance profile between 0.30m and 2.70m
        distance = 1.5 + 1.2 * math.sin(0.5 * t)

        msg = Float32()
        msg.data = round(distance, 2)
        self.publisher_.publish(msg)

        if distance < 0.50:
            self.get_logger().warn(
                f'Ultrasonic reading: {msg.data:.2f} m -> [OBSTACLE WITHIN SAFETY BUFFER!]'
            )
        else:
            self.get_logger().info(
                f'Ultrasonic reading: {msg.data:.2f} m -> [PATH CLEAR]'
            )

        self.step_count += 1


def main(args=None):
    rclpy.init(args=args)
    node = UltrasonicSensorPublisher()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
</code></pre>
</div>
"""

    l05_sec4 = """<h2 id="4-configuring-setuppy-building-testing-publisher">4. Configuring setup.py, Building &amp; Testing the Publisher</h2>
<p>Before ROS 2 can execute your Python script via <code class="inline-code">ros2 run</code>, you must expose an entry point executable in <code class="inline-code">setup.py</code>.</p>

<div class="file-edit-instruction-card">
  <div class="file-edit-header">
    <span class="file-edit-badge">FILE CONFIGURATION GUIDE</span>
    <span class="file-edit-path">~/ros2_ws/src/navpro_basics/setup.py</span>
  </div>

  <div class="file-edit-step">
    <div class="step-num-pill">Step 1</div>
    <div class="step-instruction">
      <strong>Open the target file in VS Code or nano:</strong>
      <div class="code-container"><pre><code class="language-bash">code ~/ros2_ws/src/navpro_basics/setup.py</code></pre></div>
    </div>
  </div>

  <div class="file-edit-step">
    <div class="step-num-pill">Step 2</div>
    <div class="step-instruction">
      <strong>Locate the <code class="inline-code">entry_points</code> dictionary</strong> and register the publisher console script inside <code class="inline-code">'console_scripts'</code>:
      <div class="code-container ide-code-window"><pre><code class="language-python">    entry_points={
        'console_scripts': [
            # >>> ADD THIS ENTRY POINT <<<
            'ultrasonic_publisher = navpro_basics.ultrasonic_sensor_node:main',
            'talker = navpro_basics.ultrasonic_sensor_node:main',
        ],
    },</code></pre></div>
    </div>
  </div>

  <div class="file-edit-step">
    <div class="step-num-pill">Step 3</div>
    <div class="step-instruction">
      <strong>Verify complete file structure:</strong> Expand the reference below to ensure all syntax, brackets, and commas match:
      <details class="file-edit-dropdown">
        <summary class="file-edit-summary">📋 View Full Verified setup.py with Publisher Entry Points</summary>
        <div class="code-container ide-code-window"><pre><code class="language-python">from setuptools import find_packages, setup

package_name = 'navpro_basics'

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
    description='ROS 2 Sensor & Telemetry Fundamentals',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'ultrasonic_publisher = navpro_basics.ultrasonic_sensor_node:main',
            'talker = navpro_basics.ultrasonic_sensor_node:main',
        ],
    },
)</code></pre></div>
      </details>
    </div>
  </div>
</div>

<h3 id="42-build-and-run-with-ros2-cli">4.2 Build and Run with the ROS 2 CLI</h3>
<p>Compile your workspace with symlink installation and start the publisher:</p>

<div class="code-container"><pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
ros2 run navpro_basics ultrasonic_publisher</code></pre></div>

<p>In a <strong>second terminal</strong>, inspect the live ultrasonic telemetry:</p>
<div class="code-container"><pre><code class="language-bash">source /opt/ros/jazzy/setup.bash
ros2 topic list
ros2 topic echo /sensor/ultrasonic_front
ros2 topic hz /sensor/ultrasonic_front</code></pre></div>
"""

    l05_sec5 = """<h2 id="5-writing-the-subscriber-node">5. Writing the Collision Safety Monitor Subscriber Node</h2>
<p>Now create the receiving node: <code class="inline-code">~/ros2_ws/src/navpro_basics/navpro_basics/collision_monitor_node.py</code>. This node subscribes to <code class="inline-code">/sensor/ultrasonic_front</code> and enforces an emergency stop buffer:</p>

<div class="code-container ide-code-window" data-language="python">
  <div class="code-header">
    <div class="code-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="code-filename">collision_monitor_node.py &mdash; AMR Collision Supervisor</span>
  </div>
  <pre><code class="language-python">import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32


class CollisionSafetySubscriber(Node):
    \"\"\"
    AMR Collision Safety Supervisor Node.
    Monitors ultrasonic proximity telemetry and enforces safety buffer.
    \"\"\"

    def __init__(self):
        super().__init__('collision_monitor_node')

        self.safety_threshold_m = 0.50

        # Create Subscription to '/sensor/ultrasonic_front' with queue depth 10
        self.subscription = self.create_subscription(
            Float32,
            '/sensor/ultrasonic_front',
            self.distance_callback,
            10
        )

        self.get_logger().info(
            f'CollisionSafetySubscriber initialized. Monitoring "/sensor/ultrasonic_front" (Threshold: {self.safety_threshold_m} m)...'
        )

    def distance_callback(self, msg: Float32):
        distance = msg.data

        if distance < self.safety_threshold_m:
            self.get_logger().error(
                f'ALERT: Obstacle detected at {distance:.2f} m! Distance < {self.safety_threshold_m} m -> TRIGGERING EMERGENCY BRAKE!'
            )
        else:
            self.get_logger().info(
                f'STATUS: Distance {distance:.2f} m >= {self.safety_threshold_m} m -> Nominal path clearance confirmed.'
            )


def main(args=None):
    rclpy.init(args=args)
    node = CollisionSafetySubscriber()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
</code></pre>
</div>

<div class="file-edit-instruction-card">
  <div class="file-edit-header">
    <span class="file-edit-badge">FILE CONFIGURATION GUIDE</span>
    <span class="file-edit-path">~/ros2_ws/src/navpro_basics/setup.py</span>
  </div>
  <div class="file-edit-step">
    <div class="step-num-pill">Step 1</div>
    <div class="step-instruction">
      <strong>Open <code class="inline-code">~/ros2_ws/src/navpro_basics/setup.py</code></strong>
    </div>
  </div>
  <div class="file-edit-step">
    <div class="step-num-pill">Step 2</div>
    <div class="step-instruction">
      <strong>Add the subscriber entry point:</strong>
      <div class="code-container ide-code-window"><pre><code class="language-python">    entry_points={
        'console_scripts': [
            'ultrasonic_publisher = navpro_basics.ultrasonic_sensor_node:main',
            'collision_monitor = navpro_basics.collision_monitor_node:main',
            'talker = navpro_basics.ultrasonic_sensor_node:main',
            'listener = navpro_basics.collision_monitor_node:main',
        ],
    },</code></pre></div>
    </div>
  </div>
</div>
"""

    pos3 = c5.find('<h2 id="3-')
    pos4 = c5.find('<h2 id="4-')
    pos5 = c5.find('<h2 id="5-')
    pos6 = c5.find('<h2 id="6-')

    if pos3 != -1 and pos4 != -1 and pos5 != -1 and pos6 != -1:
        c5 = c5[:pos3] + l05_sec3 + l05_sec4 + l05_sec5 + c5[pos6:]
        l05["html_content"] = c5
        print("Updated Lesson 05 sections 3, 4, 5 successfully!")

    # =========================================================================
    # 2. LESSON 08: Emergency Stop Service Server & Client
    # =========================================================================
    l08 = next(l for l in lessons if l["id"] == "lesson_08")
    c8 = l08["html_content"]

    l08_sec3 = """<h2 id="3-building-the-emergency-stop-safety-service-server">3. Building the Emergency Stop Safety Service Server in Python</h2>
<p>Unlike continuous topic streaming, critical safety interventions require bidirectional acknowledgment. An Autonomous Mobile Robot must provide a reliable Service that locks drive actuators and responds with an authoritative confirmation receipt.</p>

<p>Create your safety service server script at <code class="inline-code">~/ros2_ws/src/navpro_basics/navpro_basics/emergency_stop_server.py</code>:</p>

<div class="code-container ide-code-window" data-language="python">
  <div class="code-header">
    <div class="code-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="code-filename">emergency_stop_server.py &mdash; AMR Emergency Stop Service Server</span>
  </div>
  <pre><code class="language-python">import rclpy
from rclpy.node import Node
from navpro_interfaces.srv import TriggerEmergencyStop


class EmergencyStopServer(Node):
    \"\"\"
    AMR Emergency Safety Brake Service Server Node.
    \"\"\"

    def __init__(self):
        super().__init__('emergency_stop_server')
        self.emergency_stop_active = False

        # Create ROS 2 Service Server
        # Interface: TriggerEmergencyStop
        # Service Name: '/robot/emergency_stop'
        self.srv = self.create_service(
            TriggerEmergencyStop,
            '/robot/emergency_stop',
            self.handle_emergency_stop
        )

        self.get_logger().info(
            'EmergencyStopServer initialized. Ready on "/robot/emergency_stop"...'
        )

    def handle_emergency_stop(self, request, response):
        timestamp_sec = self.get_clock().now().nanoseconds * 1e-9

        if request.emergency_stop_requested:
            self.emergency_stop_active = True
            response.success = True
            response.status_message = f'EMERGENCY BRAKE ENGAGED: Motors killed. Reason: \"{request.reason}\"'
            response.stop_timestamp = float(round(timestamp_sec, 3))
            self.get_logger().error(f'[SAFETY CRITICAL] Emergency Stop ACTIVATED! Reason: {request.reason}')
        else:
            self.emergency_stop_active = False
            response.success = True
            response.status_message = 'SAFETY RESET: Actuator power restored. Drive authorized.'
            response.stop_timestamp = float(round(timestamp_sec, 3))
            self.get_logger().info('[SAFETY STATUS] Emergency Stop CLEARED.')

        return response


def main(args=None):
    rclpy.init(args=args)
    node = EmergencyStopServer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
</code></pre>
</div>
"""

    l08_sec5 = """<h2 id="5-building-an-asynchronous-emergency-stop-client">5. Building an Asynchronous Emergency Stop Client in Python</h2>
<p>When an AMR detects an imminent hazard, it must invoke the emergency stop service <strong>without deadlocking</strong> the calling node. In ROS 2, always use <code class="inline-code">call_async()</code>:</p>

<div class="code-container ide-code-window" data-language="python">
  <div class="code-header">
    <div class="code-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="code-filename">emergency_stop_client.py &mdash; AMR Emergency Stop Client</span>
  </div>
  <pre><code class="language-python">import sys
import rclpy
from rclpy.node import Node
from navpro_interfaces.srv import TriggerEmergencyStop


class EmergencyStopClient(Node):
    \"\"\"
    AMR Emergency Safety Brake Service Client Node.
    \"\"\"

    def __init__(self):
        super().__init__('emergency_stop_client')
        self.client = self.create_client(TriggerEmergencyStop, '/robot/emergency_stop')

        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service "/robot/emergency_stop" unavailable, waiting...')

        self.get_logger().info('EmergencyStopClient connected to safety service.')

    def send_emergency_stop_request(self, stop_requested: bool, reason: str):
        request = TriggerEmergencyStop.Request()
        request.emergency_stop_requested = stop_requested
        request.reason = reason
        self.get_logger().info(f'Dispatching Emergency Stop: reason=\"{reason}\"')
        return self.client.call_async(request)


def main(args=None):
    rclpy.init(args=args)
    client_node = EmergencyStopClient()

    stop_reason = \"Obstacle detected within 0.35m critical safety zone\"
    if len(sys.argv) > 1:
        stop_reason = \" \".join(sys.argv[1:])

    future = client_node.send_emergency_stop_request(True, stop_reason)
    rclpy.spin_until_future_complete(client_node, future)

    if future.result() is not None:
        resp = future.result()
        client_node.get_logger().info(
            f'SAFETY RESPONSE RECEIVED: Success={resp.success} | Msg=\"{resp.status_message}\"'
        )
    else:
        client_node.get_logger().error(f'Service call failed: {future.exception()}')

    client_node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
</code></pre>
</div>
"""

    pos3_8 = c8.find('<h2 id="3-')
    pos4_8 = c8.find('<h2 id="4-')
    pos5_8 = c8.find('<h2 id="5-')
    pos6_8 = c8.find('<h2 id="6-')

    if pos3_8 != -1 and pos4_8 != -1 and pos5_8 != -1 and pos6_8 != -1:
        c8 = c8[:pos3_8] + l08_sec3 + c8[pos4_8:pos5_8] + l08_sec5 + c8[pos6_8:]
        l08["html_content"] = c8
        print("Updated Lesson 08 sections 3 and 5 successfully!")

    # =========================================================================
    # 3. LESSON 11: NavigateDistance Action Server & Client
    # =========================================================================
    l11 = next(l for l in lessons if l["id"] == "lesson_11")
    c11 = l11["html_content"]

    l11_sec3 = """<h2 id="3-building-the-linear-traversal-action-server">3. Building the Linear Traversal Action Server in Python</h2>
<p>Long-running robotic actions require continuous telemetry feedback and preemption handling. Let's build an action server that executes linear distance movements using <code class="inline-code">navpro_interfaces/action/NavigateDistance.action</code>.</p>

<p>Create your action server at <code class="inline-code">~/ros2_ws/src/navpro_basics/navpro_basics/navigate_distance_server.py</code>:</p>

<div class="code-container ide-code-window" data-language="python">
  <div class="code-header">
    <div class="code-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="code-filename">navigate_distance_server.py &mdash; AMR Distance Navigation Action Server</span>
  </div>
  <pre><code class="language-python">import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from navpro_interfaces.action import NavigateDistance


class NavigateDistanceActionServer(Node):
    \"\"\"
    AMR Linear Navigation Action Server Node.
    \"\"\"

    def __init__(self):
        super().__init__('navigate_distance_server')

        self._action_server = ActionServer(
            self,
            NavigateDistance,
            '/navigate_distance',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )
        self.get_logger().info('NavigateDistanceActionServer initialized on "/navigate_distance"...')

    def goal_callback(self, goal_request):
        if goal_request.target_distance_m <= 0.0 or goal_request.max_speed_mps <= 0.0:
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        self.get_logger().warn('Received cancel request for navigation traversal!')
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        target = goal_handle.request.target_distance_m
        speed = min(2.0, max(0.1, goal_handle.request.max_speed_mps))

        feedback_msg = NavigateDistance.Feedback()
        distance_travelled = 0.0
        dt = 0.1

        while distance_travelled < target:
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                result = NavigateDistance.Result()
                result.reached_target = False
                result.actual_distance_travelled_m = float(round(distance_travelled, 3))
                result.status_message = 'Navigation preempted by cancel request.'
                return result

            step = speed * dt
            distance_travelled = min(target, distance_travelled + step)

            feedback_msg.distance_remaining_m = float(round(target - distance_travelled, 3))
            feedback_msg.current_speed_mps = float(round(speed, 2))
            feedback_msg.percent_complete = float(round((distance_travelled / target) * 100.0, 1))

            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info(
                f'[TRAVERSAL FEEDBACK] Progress: {feedback_msg.percent_complete:5.1f}% | Rem: {feedback_msg.distance_remaining_m:5.2f} m'
            )
            time.sleep(dt)

        goal_handle.succeed()
        result = NavigateDistance.Result()
        result.reached_target = True
        result.actual_distance_travelled_m = float(round(distance_travelled, 3))
        result.status_message = f'Target distance of {target:.2f} m reached.'
        return result


def main(args=None):
    rclpy.init(args=args)
    node = NavigateDistanceActionServer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
</code></pre>
</div>
"""

    l11_sec4 = """<h2 id="4-building-the-asynchronous-navigation-action-client">4. Building the Asynchronous Navigation Action Client in Python</h2>
<p>Create the client node at <code class="inline-code">~/ros2_ws/src/navpro_basics/navpro_basics/navigate_distance_client.py</code>:</p>

<div class="code-container ide-code-window" data-language="python">
  <div class="code-header">
    <div class="code-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="code-filename">navigate_distance_client.py &mdash; AMR Distance Navigation Action Client</span>
  </div>
  <pre><code class="language-python">import sys
import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from navpro_interfaces.action import NavigateDistance


class NavigateDistanceActionClient(Node):

    def __init__(self):
        super().__init__('navigate_distance_client')
        self._action_client = ActionClient(self, NavigateDistance, '/navigate_distance')

    def send_goal(self, distance: float, speed: float):
        goal_msg = NavigateDistance.Goal()
        goal_msg.target_distance_m = float(distance)
        goal_msg.max_speed_mps = float(speed)

        self._action_client.wait_for_server()
        self.get_logger().info(f'Sending goal: {distance:.2f} m @ {speed:.2f} m/s')

        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().error('Goal REJECTED!')
            return
        self.get_logger().info('Goal ACCEPTED. Running...')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def feedback_callback(self, feedback_msg):
        fb = feedback_msg.feedback
        self.get_logger().info(
            f'[FEEDBACK] {fb.percent_complete:5.1f}% | Remaining: {fb.distance_remaining_m:5.2f} m'
        )

    def get_result_callback(self, future):
        res = future.result().result
        self.get_logger().info(f'[RESULT] Succeeded: {res.reached_target} | Message: {res.status_message}')
        rclpy.shutdown()


def main(args=None):
    rclpy.init(args=args)
    client = NavigateDistanceActionClient()
    dist = float(sys.argv[1]) if len(sys.argv) > 1 else 2.5
    speed = float(sys.argv[2]) if len(sys.argv) > 2 else 0.5
    client.send_goal(dist, speed)
    try:
        rclpy.spin(client)
    except (KeyboardInterrupt, SystemExit):
        pass


if __name__ == '__main__':
    main()
</code></pre>
</div>
"""

    pos3_11 = c11.find('<h2 id="3-')
    pos4_11 = c11.find('<h2 id="4-')
    pos5_11 = c11.find('<h2 id="5-')

    if pos3_11 != -1 and pos4_11 != -1 and pos5_11 != -1:
        c11 = c11[:pos3_11] + l11_sec3 + l11_sec4 + c11[pos5_11:]
        l11["html_content"] = c11
        print("Updated Lesson 11 sections 3 and 4 successfully!")

    print(f"Writing updated lessons to {DATA_FILE}...")
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Code injection complete!")

if __name__ == "__main__":
    run()
