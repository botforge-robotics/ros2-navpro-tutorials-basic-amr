import json
import re

with open('lms/src/data/lessonsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# -----------------------------------------------------------------------------
# LESSON 05
# -----------------------------------------------------------------------------
def process_lesson_05(lesson):
    c = lesson['html_content']

    # 1. Remove inserted Section 3
    s3_start = c.find('<section class="lesson-section">\n<hr class="divider">\n<h2 id="3-inspecting-topic-interfaces-cli-tools">')
    if s3_start == -1:
        s3_start = c.find('<hr class="divider">\n<h2 id="3-inspecting-topic-interfaces-cli-tools">')
    
    s4_start = c.find('<h2 id="4-writing-the-ultrasonic-sensor-publisher-node">')
    if s4_start != -1 and s3_start != -1:
        # Find preceding boundary
        cut_start = s3_start
        # Find the <hr class="divider"> right before s4_start
        cut_end = c.rfind('<hr class="divider">', s3_start, s4_start)
        if cut_end == -1:
            cut_end = s4_start
        c = c[:cut_start] + c[cut_end:]
        print("Lesson 05: Removed inserted Section 3.")

    # 2. Restore Section 3 Header
    c = c.replace('<h2 id="4-writing-the-ultrasonic-sensor-publisher-node">4. Writing the Ultrasonic Sensor Rangefinder Publisher Node</h2>',
                  '<h2 id="3-writing-the-ultrasonic-sensor-publisher-node">3. Writing the Ultrasonic Sensor Rangefinder Publisher Node</h2>')

    # 3. Update publisher mission briefing text
    c = c.replace('serializes the measurements into <code>std_msgs/msg/Float32</code>, and broadcasts them over DDS.',
                  'serializes the measurements into <code>sensor_msgs/msg/Range</code>, and broadcasts them over DDS.')

    # 4. Insert Publisher Interface Discovery Note below briefing
    pub_note = '''
<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Best Practice: Discovering &amp; Inspecting Message Interfaces Before Writing Code</strong><br>
    In production robotics, you should never write publisher or subscriber nodes blindly. Always inspect the exact data schema of the message to understand what fields and data types exist:
    <br><br>
    <strong>1. Discover the message interface using <code class="inline-code">ros2 interface list</code> or <code class="inline-code">package</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Search across all available ROS 2 interfaces for range/sonar messages:
ros2 interface list | grep -i range

# Or list all standard sensor message interfaces:
ros2 interface package sensor_msgs</code></pre>
    </div>
    <strong>2. Inspect the fields and datatypes using <code class="inline-code">ros2 interface show</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">ros2 interface show sensor_msgs/msg/Range</code></pre>
    </div>
    <strong>Expected Output &amp; Schema Breakdown:</strong>
    <div class="code-container terminal-window" data-language="plaintext" style="margin: 0.6rem 0;">
      <div class="terminal-header">
        <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        <span class="terminal-title">Terminal &mdash; ros2 interface show sensor_msgs/msg/Range</span>
      </div>
      <pre><code class="language-plaintext">std_msgs/Header header
    builtin_interfaces/Time stamp
        int32 sec
        uint32 nanosec
    string frame_id
uint8 ULTRASOUND=0
uint8 INFRARED=1
uint8 radiation_type
float32 field_of_view
float32 min_range
float32 max_range
float32 range
float32 variance</code></pre>
    </div>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><code class="inline-code">header.frame_id</code>: Coordinate frame where the sensor is mounted (e.g., <code class="inline-code">'ultrasound_front_link'</code>).</li>
      <li><code class="inline-code">radiation_type</code>: Transducer technology constant (<code class="inline-code">Range.ULTRASOUND = 0</code>).</li>
      <li><code class="inline-code">field_of_view</code>: Detection cone spread in radians (e.g. <code class="inline-code">0.5236</code> rad &approx; 30&deg;).</li>
      <li><code class="inline-code">min_range</code> / <code class="inline-code">max_range</code>: Sensor detection envelope in meters (<code class="inline-code">0.02</code> m to <code class="inline-code">3.0</code> m).</li>
      <li><code class="inline-code">range</code>: The actual measured obstacle distance in meters &mdash; this is the primary telemetry value you populate in the publisher and read in the subscriber.</li>
    </ul>
  </div>
</div>
'''
    # Insert right before "<p>Create your ultrasonic rangefinder node script"
    target_p = '<p>Create your ultrasonic rangefinder node script in your package source directory: <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/ultrasonic_sensor_node.py</code>:</p>'
    if target_p in c and 'Best Practice: Discovering &amp; Inspecting Message Interfaces Before Writing Code' not in c:
        c = c.replace(target_p, pub_note + '\n' + target_p)
        print("Lesson 05: Added Publisher Interface Discovery Note.")

    # 5. Update publisher Python code to use Range
    old_pub_code = '''import math
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32


class UltrasonicSensorPublisher(Node):
    &quot;&quot;&quot;
    Ultrasonic Rangefinder Sensor Publisher Node.
    Broadcasts distance measurements periodically over the DDS middleware.
    &quot;&quot;&quot;

    def __init__(self):
        # Step 1: Initialize base Node with unique name &#x27;ultrasonic_sensor_node&#x27;
        # This identifier registers the node in the ROS 2 computational graph.
        super().__init__(&#x27;ultrasonic_sensor_node&#x27;)

        # Step 2: Create a Publisher endpoint with Quality of Service (QoS)
        # Parameters:
        #   - Float32: The ROS 2 message schema (single-precision 32-bit float)
        #   - &#x27;/sensor/ultrasonic_front&#x27;: The DDS topic name
        #   - 10: QoS Profile configuration.
        #     Passing an integer (10) tells ROS 2 to use the DEFAULT QoS Profile:
        #       * Reliability: RELIABLE (guarantees packet delivery via ACKs)
        #       * Durability:  VOLATILE (messages are not saved for late joiners)
        #       * History:     KEEP_LAST with Depth=10 (buffers up to 10 samples)
        #     (Shorthand for: QoSProfile(depth=10, reliability=RELIABLE, durability=VOLATILE))
        self.publisher_ = self.create_publisher(Float32, &#x27;/sensor/ultrasonic_front&#x27;, 10)

        # Step 3: Configure a non-blocking software timer running at 10 Hz
        # 10 Hz = 0.100s period. Non-blocking timers allow rclpy to execute
        # other callbacks concurrently without freezing the thread.
        self.timer_period = 0.1  # seconds
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        # Step 4: Internal telemetry state tracking
        self.step_count = 0
        self.get_logger().info(
            &#x27;UltrasonicSensorPublisher initialized. Broadcasting distance telemetry to &quot;/sensor/ultrasonic_front&quot; at 10 Hz...&#x27;
        )

    def timer_callback(self):
        &quot;&quot;&quot;
        Invoked periodically at 10 Hz by the ROS 2 SingleThreadedExecutor.
        Computes the current sensor reading, encapsulates it into Float32, and publishes.
        &quot;&quot;&quot;
        # Calculate simulation time elapsed
        time_elapsed = self.step_count * self.timer_period

        # Compute smooth sinusoidal distance profile between 0.30 m and 2.70 m
        distance = 1.5 + 1.2 * math.sin(0.5 * time_elapsed)

        # Instantiate strongly-typed ROS 2 message
        msg = Float32()
        msg.data = round(distance, 2)

        # Serialize and broadcast over DDS transport
        self.publisher_.publish(msg)

        # Log operational warnings if obstacle enters critical safety buffer (&lt; 0.50 m)
        if distance &lt; 0.50:
            self.get_logger().warn(
                f&#x27;Ultrasonic reading: {msg.data:.2f} m -&gt; [OBSTACLE WITHIN SAFETY BUFFER!]&#x27;
            )
        else:
            self.get_logger().info(
                f&#x27;Ultrasonic reading: {msg.data:.2f} m -&gt; [PATH CLEAR]&#x27;
            )

        self.step_count += 1'''

    new_pub_code = '''import math
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range


class UltrasonicSensorPublisher(Node):
    &quot;&quot;&quot;
    Ultrasonic Rangefinder Sensor Publisher Node.
    Broadcasts Range measurements periodically over the DDS middleware.
    &quot;&quot;&quot;

    def __init__(self):
        # Step 1: Initialize base Node with unique name &#x27;ultrasonic_sensor_node&#x27;
        # This identifier registers the node in the ROS 2 computational graph.
        super().__init__(&#x27;ultrasonic_sensor_node&#x27;)

        # Step 2: Create a Publisher endpoint with Quality of Service (QoS)
        # Parameters:
        #   - Range: The ROS 2 sensor message schema (sensor_msgs/msg/Range)
        #   - &#x27;/sensor/ultrasonic_front&#x27;: The DDS topic name
        #   - 10: QoS Profile configuration.
        #     Passing an integer (10) tells ROS 2 to use the DEFAULT QoS Profile:
        #       * Reliability: RELIABLE (guarantees packet delivery via ACKs)
        #       * Durability:  VOLATILE (messages are not saved for late joiners)
        #       * History:     KEEP_LAST with Depth=10 (buffers up to 10 samples)
        #     (Shorthand for: QoSProfile(depth=10, reliability=RELIABLE, durability=VOLATILE))
        self.publisher_ = self.create_publisher(Range, &#x27;/sensor/ultrasonic_front&#x27;, 10)

        # Step 3: Configure a non-blocking software timer running at 10 Hz
        # 10 Hz = 0.100s period. Non-blocking timers allow rclpy to execute
        # other callbacks concurrently without freezing the thread.
        self.timer_period = 0.1  # seconds
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        # Step 4: Internal telemetry state tracking
        self.step_count = 0
        self.get_logger().info(
            &#x27;UltrasonicSensorPublisher initialized. Broadcasting Range telemetry to &quot;/sensor/ultrasonic_front&quot; at 10 Hz...&#x27;
        )

    def timer_callback(self):
        &quot;&quot;&quot;
        Invoked periodically at 10 Hz by the ROS 2 SingleThreadedExecutor.
        Computes the current sensor reading, encapsulates it into Range, and publishes.
        &quot;&quot;&quot;
        # Calculate simulation time elapsed
        time_elapsed = self.step_count * self.timer_period

        # Compute smooth sinusoidal distance profile between 0.30 m and 2.70 m
        distance = 1.5 + 1.2 * math.sin(0.5 * time_elapsed)

        # Instantiate strongly-typed ROS 2 sensor message
        msg = Range()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = &#x27;ultrasound_front_link&#x27;
        msg.radiation_type = Range.ULTRASOUND
        msg.field_of_view = 0.5236  # ~30 degrees beam spread in radians
        msg.min_range = 0.02        # 2 cm minimum range
        msg.max_range = 3.0         # 3.0 m maximum range
        msg.range = round(distance, 2)

        # Serialize and broadcast over DDS transport
        self.publisher_.publish(msg)

        # Log operational warnings if obstacle enters critical safety buffer (&lt; 0.50 m)
        if distance &lt; 0.50:
            self.get_logger().warn(
                f&#x27;Ultrasonic range: {msg.range:.2f} m -&gt; [OBSTACLE WITHIN SAFETY BUFFER!]&#x27;
            )
        else:
            self.get_logger().info(
                f&#x27;Ultrasonic range: {msg.range:.2f} m -&gt; [PATH CLEAR]&#x27;
            )

        self.step_count += 1'''

    if old_pub_code in c:
        c = c.replace(old_pub_code, new_pub_code)
        print("Lesson 05: Replaced publisher Python code with Range.")

    # 6. Update Default QoS note references to Range
    c = c.replace("self.create_publisher(Float32, &#x27;/sensor/ultrasonic_front&#x27;, 10)",
                  "self.create_publisher(Range, &#x27;/sensor/ultrasonic_front&#x27;, 10)")
    c = c.replace("self.create_publisher(Float32, &#x27;/sensor/ultrasonic_front&#x27;, default_qos)",
                  "self.create_publisher(Range, &#x27;/sensor/ultrasonic_front&#x27;, default_qos)")

    # 7. Update UltrasonicSensorPublisher Mechanics card
    c = c.replace("self.publisher_ = self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)",
                  "self.publisher_ = self.create_publisher(Range, '/sensor/ultrasonic_front', 10)")
    c = c.replace("<code>msg = Float32(); msg.data = round(distance, 2)</code> populates the strongly-typed message container.",
                  "<code>msg = Range(); msg.header.frame_id = 'ultrasound_front_link'; msg.radiation_type = Range.ULTRASOUND; msg.range = round(distance, 2)</code> populates the standard robotics sensor message.")

    # 8. Restore Section 5 Header
    c = c.replace('<h2 id="6-writing-the-subscriber-node">6. Writing the Collision Safety Monitor Subscriber Node</h2>',
                  '<h2 id="5-writing-the-subscriber-node">5. Writing the Collision Safety Monitor Subscriber Node</h2>')

    # 9. Update subscriber briefing
    c = c.replace('unpacks incoming <code>Float32</code> messages, evaluates distance against a 0.50 m safety threshold',
                  'unpacks incoming <code>Range</code> messages, evaluates distance against a 0.50 m safety threshold')

    # 10. Insert Subscriber Interface Discovery Note below briefing
    sub_note = '''
<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Best Practice: Inspecting Topic &amp; Interface Schema Before Subscribing</strong><br>
    When implementing a subscriber, discover the active topic's message type and inspect its schema before writing your callback logic:
    <br><br>
    <strong>1. Query the message type advertised on the topic:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">ros2 topic type /sensor/ultrasonic_front
# Output: sensor_msgs/msg/Range</code></pre>
    </div>
    <strong>2. Inspect the fields to determine what attributes your callback must extract:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">ros2 interface show sensor_msgs/msg/Range</code></pre>
    </div>
    <p style="margin: 0.5rem 0 0 0; line-height: 1.6;">
      By checking <code class="inline-code">ros2 interface show</code>, you immediately know that the distance reading is stored in <code class="inline-code">msg.range</code> (not <code class="inline-code">msg.data</code>). Inside your subscriber callback, you simply read <code class="inline-code">distance = msg.range</code>.
    </p>
  </div>
</div>
'''
    target_sub_p = '<p>Now create the receiving node: <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/collision_monitor_node.py</code>. This node subscribes to <code class="inline-code">/sensor/ultrasonic_front</code> and enforces an emergency stop buffer:</p>'
    if target_sub_p in c and 'Best Practice: Inspecting Topic &amp; Interface Schema Before Subscribing' not in c:
        c = c.replace(target_sub_p, sub_note + '\n' + target_sub_p)
        print("Lesson 05: Added Subscriber Interface Discovery Note.")

    # 11. Update subscriber Python code to use Range
    old_sub_code = '''import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32


class CollisionSafetySubscriber(Node):
    &quot;&quot;&quot;
    AMR Collision Safety Supervisor Node.
    Monitors ultrasonic proximity telemetry and enforces safety buffer.
    &quot;&quot;&quot;

    def __init__(self):
        # Step 1: Initialize base Node with unique name &#x27;collision_monitor_node&#x27;
        super().__init__(&#x27;collision_monitor_node&#x27;)

        # Step 2: Establish the physical safety threshold in meters
        # Obstacles closer than 50 cm trigger protective safety measures.
        self.safety_threshold_m = 0.50

        # Step 3: Create DDS Subscription with compatible Default QoS
        # - Float32: Expected message schema
        # - &#x27;/sensor/ultrasonic_front&#x27;: Target topic
        # - self.distance_callback: Bound method called when new packet arrives
        # - 10: QoS History depth (Uses Default QoS: RELIABLE + VOLATILE, matching the publisher)
        self.subscription = self.create_subscription(
            Float32,
            &#x27;/sensor/ultrasonic_front&#x27;,
            self.distance_callback,
            10
        )

        self.get_logger().info(
            f&#x27;CollisionSafetySubscriber initialized. Monitoring &quot;/sensor/ultrasonic_front&quot; (Threshold: {self.safety_threshold_m} m)...&#x27;
        )

    def distance_callback(self, msg: Float32):
        &quot;&quot;&quot;
        Invoked asynchronously by the ROS 2 executor whenever a distance measurement
        packet arrives at the DDS DataReader socket.
        &quot;&quot;&quot;
        distance = msg.data

        # Evaluate physical safety invariant
        if distance &lt; self.safety_threshold_m:
            # Critical hazard: obstacle within safety envelope!
            self.get_logger().error(
                f&#x27;ALERT: Obstacle detected at {distance:.2f} m! Distance &lt; {self.safety_threshold_m} m -&gt; TRIGGERING EMERGENCY BRAKE!&#x27;
            )
        else:
            # Nominal path clearance: safe for autonomous locomotion
            self.get_logger().info(
                f&#x27;STATUS: Distance {distance:.2f} m &gt;= {self.safety_threshold_m} m -&gt; Nominal path clearance confirmed.&#x27;
            )'''

    new_sub_code = '''import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range


class CollisionSafetySubscriber(Node):
    &quot;&quot;&quot;
    AMR Collision Safety Supervisor Node.
    Monitors ultrasonic proximity telemetry and enforces safety buffer.
    &quot;&quot;&quot;

    def __init__(self):
        # Step 1: Initialize base Node with unique name &#x27;collision_monitor_node&#x27;
        super().__init__(&#x27;collision_monitor_node&#x27;)

        # Step 2: Establish the physical safety threshold in meters
        # Obstacles closer than 50 cm trigger protective safety measures.
        self.safety_threshold_m = 0.50

        # Step 3: Create DDS Subscription with compatible Default QoS
        # - Range: Expected message schema (sensor_msgs/msg/Range)
        # - &#x27;/sensor/ultrasonic_front&#x27;: Target topic
        # - self.distance_callback: Bound method called when new packet arrives
        # - 10: QoS History depth (Uses Default QoS: RELIABLE + VOLATILE, matching the publisher)
        self.subscription = self.create_subscription(
            Range,
            &#x27;/sensor/ultrasonic_front&#x27;,
            self.distance_callback,
            10
        )

        self.get_logger().info(
            f&#x27;CollisionSafetySubscriber initialized. Monitoring &quot;/sensor/ultrasonic_front&quot; (Threshold: {self.safety_threshold_m} m)...&#x27;
        )

    def distance_callback(self, msg: Range):
        &quot;&quot;&quot;
        Invoked asynchronously by the ROS 2 executor whenever a distance measurement
        packet arrives at the DDS DataReader socket.
        &quot;&quot;&quot;
        # Extract distance in meters from the Range message field
        distance = msg.range

        # Evaluate physical safety invariant
        if distance &lt; self.safety_threshold_m:
            # Critical hazard: obstacle within safety envelope!
            self.get_logger().error(
                f&#x27;ALERT: Obstacle detected at {distance:.2f} m! Distance &lt; {self.safety_threshold_m} m -&gt; TRIGGERING EMERGENCY BRAKE!&#x27;
            )
        else:
            # Nominal path clearance: safe for autonomous locomotion
            self.get_logger().info(
                f&#x27;STATUS: Distance {distance:.2f} m &gt;= {self.safety_threshold_m} m -&gt; Nominal path clearance confirmed.&#x27;
            )'''

    if old_sub_code in c:
        c = c.replace(old_sub_code, new_sub_code)
        print("Lesson 05: Replaced subscriber Python code with Range.")

    # 12. Update CollisionSafetySubscriber Mechanics card
    c = c.replace("<code>self.create_subscription(Float32, '/sensor/ultrasonic_front', self.distance_callback, 10)</code>",
                  "<code>self.create_subscription(Range, '/sensor/ultrasonic_front', self.distance_callback, 10)</code>")
    c = c.replace("<code>def distance_callback(self, msg: Float32):</code>",
                  "<code>def distance_callback(self, msg: Range):</code>")

    # 13. Update Terminal 3 in Section 6
    c = c.replace("Type: std_msgs/msg/Float32", "Type: sensor_msgs/msg/Range")

    # 14. Restore Section 7 and Section 8 headers
    c = c.replace('<h2 id="8-quality-of-service-qos-deep-dive">8. Quality of Service (QoS) Deep Dive</h2>',
                  '<h2 id="7-quality-of-service-qos-deep-dive">7. Quality of Service (QoS) Deep Dive</h2>')
    c = c.replace('<h2 id="9-hands-on-student-challenge">9. Hands-on Student Challenge: Autonomous Mobile Robot Square Patrol Controller</h2>',
                  '<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge: Autonomous Mobile Robot Square Patrol Controller</h2>')

    # 15. Update multi-topic supervisor code & diagram in Section 7
    c = c.replace('from std_msgs.msg import Float32, String', 'from sensor_msgs.msg import Range\nfrom std_msgs.msg import String')
    c = c.replace("Float32, '/sensor/ultrasonic_front', self.range_callback, 10", "Range, '/sensor/ultrasonic_front', self.range_callback, 10")
    c = c.replace("def range_callback(self, msg: Float32):", "def range_callback(self, msg: Range):")
    c = c.replace("self.front_clearance = msg.data", "self.front_clearance = msg.range")
    c = c.replace("std_msgs/Float32 · 10 Hz", "sensor_msgs/Range · 10 Hz")

    lesson['html_content'] = c
    lesson['subtopics'] = [
        {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
        {"id": "2-topic-communication-architecture", "title": "2. Topic Communication Architecture & DDS"},
        {"id": "3-writing-the-ultrasonic-sensor-publisher-node", "title": "3. Writing the Ultrasonic Sensor Rangefinder Publisher Node"},
        {"id": "4-configuring-setuppy-building-testing-publisher", "title": "4. Configuring setup.py, Building & Testing the Publisher"},
        {"id": "5-writing-the-subscriber-node", "title": "5. Writing the Collision Safety Monitor Subscriber Node"},
        {"id": "6-dual-node-communication-drill", "title": "6. Dual-Node Communication & Verification Drill"},
        {"id": "7-quality-of-service-qos-deep-dive", "title": "7. Quality of Service (QoS) Deep Dive"},
        {"id": "8-hands-on-student-challenge", "title": "8. Hands-on Student Challenge: Autonomous Mobile Robot Square Patrol Controller"}
    ]
    print("Lesson 05 processed successfully!")


# -----------------------------------------------------------------------------
# LESSON 07
# -----------------------------------------------------------------------------
def process_lesson_07(lesson):
    c = lesson['html_content']

    # 1. Remove inserted Section 3
    s3_start = c.find('<h2 id="3-inspecting-service-interfaces-cli-tools">')
    s4_start = c.find('<h2 id="4-building-the-emergency-stop-safety-service-server">')
    if s3_start != -1 and s4_start != -1:
        cut_start = c.rfind('<hr class="divider">', 0, s3_start)
        # Find preceding <hr> before cut_start if duplicated
        prev_hr = c.rfind('<hr class="divider">', 0, cut_start)
        if prev_hr != -1 and prev_hr > cut_start - 30:
            cut_start = prev_hr
        cut_end = c.rfind('<hr class="divider">', s3_start, s4_start)
        if cut_end == -1:
            cut_end = s4_start
        c = c[:cut_start] + c[cut_end:]
        print("Lesson 07: Removed inserted Section 3.")

    # 2. Restore Section 3 Header
    c = c.replace('<h2 id="4-building-the-emergency-stop-safety-service-server">4. Building the Emergency Stop Safety Service Server in Python</h2>',
                  '<h2 id="3-building-the-emergency-stop-safety-service-server">3. Building the Emergency Stop Safety Service Server in Python</h2>')

    # 3. Insert Service Interface Discovery Note below briefing
    srv_note = '''
<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Best Practice: Discovering &amp; Inspecting Service Interfaces Before Writing Code</strong><br>
    Before implementing a ROS 2 Service Server or Client, always inspect the service definition (<code class="inline-code">.srv</code>) to understand both the <strong>Request</strong> and <strong>Response</strong> contracts:
    <br><br>
    <strong>1. Discover available service interfaces using <code class="inline-code">ros2 interface list</code> or <code class="inline-code">package</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Search for emergency or stop service types:
ros2 interface list | grep srv | grep -i emergency

# Or list all service interfaces defined in our AMR workspace package:
ros2 interface package nexus_amr_interfaces</code></pre>
    </div>
    <strong>2. Inspect the exact Request and Response fields using <code class="inline-code">ros2 interface show</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">ros2 interface show nexus_amr_interfaces/srv/TriggerEmergencyStop</code></pre>
    </div>
    <strong>Expected Output &amp; The Three Hyphens (<code class="inline-code">---</code>) Delimiter:</strong>
    <div class="code-container terminal-window" data-language="plaintext" style="margin: 0.6rem 0;">
      <div class="terminal-header">
        <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        <span class="terminal-title">Terminal &mdash; ros2 interface show nexus_amr_interfaces/srv/TriggerEmergencyStop</span>
      </div>
      <pre><code class="language-plaintext"># Request (Input payload sent by the Client)
bool emergency_stop_requested
string reason
---
# Response (Output payload populated and returned by the Server)
bool success
string status_message
float32 stop_timestamp</code></pre>
    </div>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><strong>Top Half (Request):</strong> Accessed on the <code class="inline-code">request</code> argument in your callback (<code class="inline-code">request.emergency_stop_requested</code>, <code class="inline-code">request.reason</code>).</li>
      <li><strong>Bottom Half (Response):</strong> Assigned on the <code class="inline-code">response</code> object that your callback returns (<code class="inline-code">response.success</code>, <code class="inline-code">response.status_message</code>, <code class="inline-code">response.stop_timestamp</code>).</li>
      <li><strong>Essential CLI Verification Tools:</strong> Check active services with <code class="inline-code">ros2 service list</code>, verify interface types with <code class="inline-code">ros2 service type &lt;service&gt;</code>, and test your server directly from terminal using <code class="inline-code">ros2 service call</code> without writing a client first!</li>
    </ul>
  </div>
</div>
'''
    target_srv_p = '<p>Create the service server script: <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/emergency_stop_server_node.py</code>. This node advertises <code class="inline-code">/emergency_stop</code> and handles safety state transitions:</p>'
    if target_srv_p in c and 'Best Practice: Discovering &amp; Inspecting Service Interfaces Before Writing Code' not in c:
        c = c.replace(target_srv_p, srv_note + '\n' + target_srv_p)
        print("Lesson 07: Added Service Interface Discovery Note.")

    # 4. Renumber remaining section headers in Lesson 07
    c = c.replace('<h2 id="4-configuring-setuppy-building-testing-server-with-cli">4. Configuring setup.py, Building &amp; Testing the Service Server with ROS 2 CLI</h2>',
                  '<h2 id="4-configuring-setuppy-building-testing-server-with-cli">4. Configuring setup.py, Building &amp; Testing the Service Server with ROS 2 CLI</h2>')
    c = c.replace('<h2 id="5-configuring-setuppy-building-testing-server-with-cli">5. Configuring setup.py, Building &amp; Testing the Service Server with ROS 2 CLI</h2>',
                  '<h2 id="4-configuring-setuppy-building-testing-server-with-cli">4. Configuring setup.py, Building &amp; Testing the Service Server with ROS 2 CLI</h2>')
    c = c.replace('<h2 id="6-the-critical-singlethreadedexecutor-deadlock-bug">6. The Critical SingleThreadedExecutor Deadlock Bug</h2>',
                  '<h2 id="5-the-critical-singlethreadedexecutor-deadlock-bug">5. The Critical SingleThreadedExecutor Deadlock Bug</h2>')
    c = c.replace('<h2 id="7-building-an-asynchronous-emergency-stop-client">7. Building an Asynchronous Emergency Stop Client in Python</h2>',
                  '<h2 id="6-building-an-asynchronous-emergency-stop-client">6. Building an Asynchronous Emergency Stop Client in Python</h2>')
    c = c.replace('<h2 id="8-verification-with-the-ros-2-cli">8. Verification with the ROS 2 CLI</h2>',
                  '<h2 id="7-verification-with-the-ros-2-cli">7. Verification with the ROS 2 CLI</h2>')
    c = c.replace('<h2 id="9-hands-on-student-challenge">9. Hands-on Student Challenge: AMR Operational Speed Mode &amp; Zone Governor Service Server</h2>',
                  '<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge: Autonomous Mobile Robot Operational Speed Mode &amp; Zone Governor Service Server</h2>')

    lesson['html_content'] = c
    lesson['subtopics'] = [
        {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
        {"id": "2-decision-matrix-topics-vs-services-vs-actions", "title": "2. Decision Matrix: Topics vs Services vs Actions"},
        {"id": "3-building-the-emergency-stop-safety-service-server", "title": "3. Building the Emergency Stop Safety Service Server in Python"},
        {"id": "4-configuring-setuppy-building-testing-server-with-cli", "title": "4. Configuring setup.py, Building & Testing the Service Server with ROS 2 CLI"},
        {"id": "5-the-critical-singlethreadedexecutor-deadlock-bug", "title": "5. The Critical SingleThreadedExecutor Deadlock Bug"},
        {"id": "6-building-an-asynchronous-emergency-stop-client", "title": "6. Building an Asynchronous Emergency Stop Client in Python"},
        {"id": "7-verification-with-the-ros-2-cli", "title": "7. Verification with the ROS 2 CLI"},
        {"id": "8-hands-on-student-challenge", "title": "8. Hands-on Student Challenge: Autonomous Mobile Robot Operational Speed Mode & Zone Governor Service Server"}
    ]
    print("Lesson 07 processed successfully!")


# -----------------------------------------------------------------------------
# LESSON 10
# -----------------------------------------------------------------------------
def process_lesson_10(lesson):
    c = lesson['html_content']

    # 1. Remove inserted Section 3
    s3_start = c.find('<h2 id="3-inspecting-action-interfaces-cli-tools">')
    s4_start = c.find('<h2 id="4-building-the-linear-traversal-action-server">')
    if s3_start != -1 and s4_start != -1:
        cut_start = c.rfind('<hr class="divider">', 0, s3_start)
        prev_hr = c.rfind('<hr class="divider">', 0, cut_start)
        if prev_hr != -1 and prev_hr > cut_start - 30:
            cut_start = prev_hr
        cut_end = c.rfind('<hr class="divider">', s3_start, s4_start)
        if cut_end == -1:
            cut_end = s4_start
        c = c[:cut_start] + c[cut_end:]
        print("Lesson 10: Removed inserted Section 3.")

    # 2. Restore Section 3 Header
    c = c.replace('<h2 id="4-building-the-linear-traversal-action-server">4. Building the Linear Traversal Action Server in Python</h2>',
                  '<h2 id="3-building-the-linear-traversal-action-server">3. Building the Linear Traversal Action Server in Python</h2>')

    # 3. Insert Action Interface Discovery Note below briefing
    act_note = '''
<div class="alert-callout alert-info" style="margin: 1.5rem 0;">
  <div class="alert-icon">🔍</div>
  <div class="alert-body">
    <strong>Best Practice: Discovering &amp; Inspecting Action Interfaces Before Writing Code</strong><br>
    Actions represent complex, long-running behaviors. An action definition (<code class="inline-code">.action</code>) has three distinct sections separated by two sets of three hyphens (<code class="inline-code">---</code>). Always inspect this contract before writing server or client code:
    <br><br>
    <strong>1. Discover available action interfaces using <code class="inline-code">ros2 interface list</code> or <code class="inline-code">package</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash"># Search for distance or navigation action types:
ros2 interface list | grep action | grep -i distance

# Or list all actions defined in our AMR workspace package:
ros2 interface package nexus_amr_interfaces</code></pre>
    </div>
    <strong>2. Inspect the Goal, Result, and Feedback schemas using <code class="inline-code">ros2 interface show</code>:</strong>
    <div class="code-container" data-language="bash" style="margin: 0.6rem 0;">
      <div class="code-header"><span class="code-lang-tag">bash</span><button class="copy-code-btn">📋 Copy</button></div>
      <pre><code class="language-bash">ros2 interface show nexus_amr_interfaces/action/NavigateDistance</code></pre>
    </div>
    <strong>Expected Output &amp; Tri-Partite Action Contract:</strong>
    <div class="code-container terminal-window" data-language="plaintext" style="margin: 0.6rem 0;">
      <div class="terminal-header">
        <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        <span class="terminal-title">Terminal &mdash; ros2 interface show nexus_amr_interfaces/action/NavigateDistance</span>
      </div>
      <pre><code class="language-plaintext"># Section 1: Goal (Client target parameters)
float32 target_distance_m
float32 max_speed_mps
---
# Section 2: Result (Final outcome upon completion or cancellation)
bool reached_target
float32 actual_distance_travelled_m
string status_message
---
# Section 3: Feedback (Periodic progress updates streamed during execution)
float32 distance_remaining_m
float32 current_speed_mps
float32 percent_complete</code></pre>
    </div>
    <ul style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
      <li><strong>Goal:</strong> Read via <code class="inline-code">goal_handle.request.target_distance_m</code> and <code class="inline-code">goal_handle.request.max_speed_mps</code>.</li>
      <li><strong>Feedback:</strong> Streamed back to client using <code class="inline-code">feedback_msg = NavigateDistance.Feedback()</code> and <code class="inline-code">goal_handle.publish_feedback(feedback_msg)</code>.</li>
      <li><strong>Result:</strong> Returned upon goal completion via <code class="inline-code">result = NavigateDistance.Result()</code>, marked via <code class="inline-code">goal_handle.succeed()</code>, and returned.</li>
      <li><strong>Essential CLI Verification Tools:</strong> Check active action servers with <code class="inline-code">ros2 action list</code>, inspect client/server endpoints with <code class="inline-code">ros2 action info &lt;action&gt;</code>, and test server execution directly using <code class="inline-code">ros2 action send_goal &lt;name&gt; &lt;type&gt; "&lt;yaml&gt;" --feedback</code>!</li>
    </ul>
  </div>
</div>
'''
    target_act_p = '<p>Create your linear traversal action server script: <code class="inline-code">~/ros2_ws/src/nexus_amr_basics/nexus_amr_basics/linear_traversal_action_server.py</code>:</p>'
    if target_act_p in c and 'Best Practice: Discovering &amp; Inspecting Action Interfaces Before Writing Code' not in c:
        c = c.replace(target_act_p, act_note + '\n' + target_act_p)
        print("Lesson 10: Added Action Interface Discovery Note.")

    # 4. Renumber remaining section headers in Lesson 10
    c = c.replace('<h2 id="5-building-the-asynchronous-navigation-action-client">5. Building the Asynchronous Navigation Action Client in Python</h2>',
                  '<h2 id="4-building-the-asynchronous-navigation-action-client">4. Building the Asynchronous Navigation Action Client in Python</h2>')
    c = c.replace('<h2 id="6-verification-with-the-ros-2-action-cli">6. Verification with the ROS 2 Action CLI</h2>',
                  '<h2 id="5-verification-with-the-ros-2-action-cli">5. Verification with the ROS 2 Action CLI</h2>')
    c = c.replace('<h2 id="7-from-navigatedistance-to-robotics-patrol">7. From NavigateDistance to Robotics: Waypoint Patrol &amp; Navigation</h2>',
                  '<h2 id="6-from-navigatedistance-to-robotics-patrol">6. From NavigateDistance to Robotics: Waypoint Patrol &amp; Navigation</h2>')
    c = c.replace('<h2 id="6-from-fibonacci-to-robotics-waypoint-patrol-navigation">6. From NavigateDistance to Robotics: Waypoint Patrol &amp; Navigation</h2>',
                  '<h2 id="6-from-navigatedistance-to-robotics-patrol">6. From NavigateDistance to Robotics: Waypoint Patrol &amp; Navigation</h2>')
    c = c.replace('<h2 id="8-hands-on-student-challenge">8. Hands-on Student Challenge: Long-Running NavigateDistance Action Server with Feedback</h2>',
                  '<h2 id="7-hands-on-student-challenge">7. Hands-on Student Challenge: Long-Running NavigateDistance Action Server with Feedback</h2>')

    lesson['html_content'] = c
    lesson['subtopics'] = [
        {"id": "1-overview-learning-objectives", "title": "1. Overview & Learning Objectives"},
        {"id": "2-action-communication-architecture", "title": "2. Action Communication Architecture"},
        {"id": "3-building-the-linear-traversal-action-server", "title": "3. Building the Linear Traversal Action Server in Python"},
        {"id": "4-building-the-asynchronous-navigation-action-client", "title": "4. Building the Asynchronous Navigation Action Client in Python"},
        {"id": "5-verification-with-the-ros-2-action-cli", "title": "5. Verification with the ROS 2 Action CLI"},
        {"id": "6-from-navigatedistance-to-robotics-patrol", "title": "6. From NavigateDistance to Robotics: Waypoint Patrol & Navigation"},
        {"id": "7-hands-on-student-challenge", "title": "7. Hands-on Student Challenge: Long-Running NavigateDistance Action Server with Feedback"}
    ]
    print("Lesson 10 processed successfully!")


for lesson in data['lessons']:
    if lesson.get('id') == 'lesson_05':
        process_lesson_05(lesson)
    elif lesson.get('id') == 'lesson_07':
        process_lesson_07(lesson)
    elif lesson.get('id') == 'lesson_10':
        process_lesson_10(lesson)

with open('lms/src/data/lessonsData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved all updates to lessonsData.json!")
