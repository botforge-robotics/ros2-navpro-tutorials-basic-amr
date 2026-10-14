# Lesson 05: Communication Mechanism I: Publishers, Subscribers & QoS

> **Focus:** Asynchronous Topic Communication, Quality of Service (QoS) & Python Implementation  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapters 5.2, 8.2 & Project 1.2)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

The **Publish-Subscribe (Pub/Sub)** pattern is the primary asynchronous communication backbone of ROS 2. Nodes communicate via named buses called **Topics** without needing to know which specific nodes are producing or consuming the data.

By the end of this lesson, you will:
1. Understand the anonymous, asynchronous nature of ROS 2 Topics.
2. Build an object-oriented Python **Publisher** sending velocity setpoints (`geometry_msgs/msg/Twist`).
3. Build an object-oriented Python **Subscriber** processing incoming sensor data with custom callbacks.
4. Master **Quality of Service (QoS)** policies: Reliability, Durability, and History.
5. Prevent the #1 common ROS 2 networking bug: **QoS Incompatibility**.
6. Build **Project 1.2**: An autonomous differential drive velocity supervisor and obstacle filter.

---

## 2. Topic Communication Architecture

In ROS 2, topics are unidirectional, many-to-many data streams:

![ROS 2 Publish-Subscribe Computational Graph](../assets/images/ros2_pubsub_pipeline.svg)

* **Publishers:** Produce structured messages and push them onto a topic.
* **Subscribers:** Register interest in a topic and invoke a designated callback function whenever a new message arrives.
* **Anonymous & Decoupled:** A publisher does not know or care how many subscribers exist, or even if any exist at all.

---

## 3. Deep Dive: Quality of Service (QoS) Policies

Unlike ROS 1 (which used TCP/UDP sockets with hardcoded parameters), ROS 2 allows developers to fine-tune network transport behavior per topic using DDS **QoS Profiles**.

| QoS Policy | Setting | Behavior & Characteristics |
|---|---|---|
| **Reliability** | `RELIABLE` | Guarantees message delivery via packet ACKs and retransmissions. Ideal for commands and state flags. |
| **Reliability** | `BEST_EFFORT` | Fire-and-forget. Drops lost packets immediately without retransmission. Lowest latency for high-rate sensors (LiDAR, Cameras). |
| **Durability** | `VOLATILE` | Default. Late-joining subscribers only receive messages published after connection. |
| **Durability** | `TRANSIENT_LOCAL` | Publisher retains the last $N$ messages in memory. Late subscribers receive recent history upon connection. |
| **History** | `KEEP_LAST` | Retains up to $N$ messages in the queue (depth configurable). Oldest messages dropped when full. |
| **History** | `KEEP_ALL` | Buffers all incoming messages until consumed. Risk of out-of-memory if subscribers process slowly. |

### 3.1 The QoS Compatibility Rule
> [!WARNING]
> **A subscriber's QoS requirements must be LESS restrictive than or equal to the publisher's QoS offering.**  
> If a publisher offers `BEST_EFFORT`, but a subscriber requests `RELIABLE`, **DDS will reject the connection and NO DATA will be received!**

| Publisher Offers | Subscriber Requests | Compatible? | Result |
|---|---|---|---|
| `RELIABLE` | `RELIABLE` | ✅ YES | Reliable delivery with ACKs |
| `RELIABLE` | `BEST_EFFORT` | ✅ YES | Subscriber tolerates drops, Publisher guarantees delivery |
| `BEST_EFFORT` | `BEST_EFFORT` | ✅ YES | Fast best-effort streaming (ideal for LiDAR / Cameras) |
| `BEST_EFFORT` | `RELIABLE` | ❌ **NO** | **SILENT FAILURE: No messages delivered!** |

---

---

## 4. Building a Minimal Publisher Node (Python) - Step-by-Step

We begin with the foundational publisher node (`talker`).

### Step 4.1: Scaffold the `navpro_basics` Package
In your terminal, navigate to your workspace source folder and create the `navpro_basics` package:
```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python --node-name talker navpro_basics
```

### Step 4.2: Write the Publisher Node (`talker.py`)
Open `~/ros2_ws/src/navpro_basics/navpro_basics/talker.py` in your editor and implement the production `MinimalPublisher` class:

```python
#!/usr/bin/env python3
"""
NavPro Robotics: MinimalPublisher
Publishes standard string messages to a topic at a fixed 2 Hz rate.
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        # 1. Create Publisher: Message type String, Topic name 'topic', QoS depth 10
        self.publisher_ = self.create_publisher(String, 'topic', 10)

        # 2. Create periodic timer running at 2 Hz (period = 0.5 seconds)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        # 3. Create message, assign data, publish and log
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1


def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()

    try:
        rclpy.spin(minimal_publisher)
    except KeyboardInterrupt:
        pass
    finally:
        minimal_publisher.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: What We Are Trying to Achieve & Why
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `super().__init__('minimal_publisher')` | Register node identity on the computational graph. | Initializes the base `rclpy.node.Node` class; `'minimal_publisher'` is the unique identifier visible in `ros2 node list`. |
| `self.create_publisher(String, 'topic', 10)` | Establish DDS publisher endpoint. | Binds data output to topic `'topic'`. `10` is the QoS queue depth (retaining up to 10 unread messages in memory buffer). |
| `self.create_timer(0.5, self.timer_callback)` | Schedule non-blocking periodic publishing. | Fires every 0.5 seconds (2 Hz). `create_timer()` allows the ROS 2 executor to process callbacks asynchronously without blocking sleep calls (`time.sleep()`). |
| `msg = String()`<br>`msg.data = f'Hello World: {self.i}'` | Construct and populate message payload. | Instantiates a standard ROS 2 message container. Standard string messages encapsulate textual data in the `.data` attribute. |
| `self.publisher_.publish(msg)` | Push message onto the DDS middleware bus. | Serializes the Python object into CDR binary packets and broadcasts it to all discovered subscribers on the network. |
| `rclpy.spin(minimal_publisher)` | Enter executor event loop. | Keeps the process alive, monitoring timers and event queues to dispatch callbacks deterministically. |

---

## 5. Building a Minimal Subscriber Node (Python) - Step-by-Step

Now let's build the consumer node (`listener`).

### Step 5.1: Write the Subscriber Node (`listener.py`)
Create the file `~/ros2_ws/src/navpro_basics/navpro_basics/listener.py` in your code editor and implement `MinimalSubscriber`:

```python
#!/usr/bin/env python3
"""
NavPro Robotics: MinimalSubscriber
Subscribes to standard string messages from a topic and logs them.
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        # 1. Create Subscription: Message type String, Topic 'topic', Callback listener_callback, Queue depth 10
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10
        )
        self.subscription  # Prevent unused variable warning

    def listener_callback(self, msg):
        # 2. Callback triggered automatically whenever a new message arrives
        self.get_logger().info(f'I heard: "{msg.data}"')


def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()

    try:
        rclpy.spin(minimal_subscriber)
    except KeyboardInterrupt:
        pass
    finally:
        minimal_subscriber.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: What We Are Trying to Achieve & Why
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `self.create_subscription(String, 'topic', self.listener_callback, 10)` | Register consumer interest in a topic. | Tells DDS middleware that this node wants messages from `'topic'`. Whenever a message arrives, DDS automatically unmarshals it and invokes `listener_callback`. |
| `def listener_callback(self, msg)` | Process incoming message event. | Topic subscriber callbacks always accept exactly one argument: `msg`, containing the received message object. |
| `self.get_logger().info(f'I heard: "{msg.data}"')` | Log received message text. | Thread-safe, timestamped logging to standard output. |

---

## 6. From Hello World to Robotics: Publishing `/cmd_vel` & QoS Profiles

Notice the elegance of ROS 2: **The exact same Publisher and Subscriber mechanics are used whether sending strings or driving a real physical robot!**

To drive a robot base:
1. Change message type from `std_msgs/msg/String` to `geometry_msgs/msg/Twist`.
2. Change topic name from `'topic'` to `'/cmd_vel'`.
3. Set motion setpoints: `msg.linear.x = 0.2` (m/s) and `msg.angular.z = 0.1` (rad/s).

```python
# The exact same pattern applied to Mobile Robot Motion (/cmd_vel):
from geometry_msgs.msg import Twist

class VelocityPublisher(Node):
    def __init__(self):
        super().__init__('velocity_publisher')
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        self.timer = self.create_timer(0.1, self.publish_velocity)  # 10 Hz

    def publish_velocity(self):
        msg = Twist()
        msg.linear.x = 0.2   # Move forward at 0.2 m/s
        msg.angular.z = 0.1  # Rotate CCW at 0.1 rad/s
        self.publisher_.publish(msg)
```

---

### 6.1 Configure Entry Points & Build `navpro_basics`
Open `~/ros2_ws/src/navpro_basics/setup.py` and register your node executables in `console_scripts`:

```python
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'task_custom_pubsub = navpro_basics.m01_l05_task_custom_pubsub:main',
            'task_teleop_speed_limiter = navpro_basics.m01_l05_task_teleop_speed_limiter:main',
        ],
    },
```

Now compile your package from the workspace root:
```bash
cd ~/ros2_ws
colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
```

---

## 7. Verification with the ROS 2 Command Line Interface (CLI)

Open two terminal panes and run the minimal pub/sub nodes:

**Terminal 1 (Publisher / Talker):**
```bash
source ~/ros2_ws/install/setup.bash
ros2 run navpro_basics talker
# Output:
# [INFO] [minimal_publisher]: Publishing: "Hello World: 0"
# [INFO] [minimal_publisher]: Publishing: "Hello World: 1"
# [INFO] [minimal_publisher]: Publishing: "Hello World: 2"
```

**Terminal 2 (Subscriber / Listener):**
```bash
source ~/ros2_ws/install/setup.bash
ros2 run navpro_basics listener
# Output:
# [INFO] [minimal_subscriber]: I heard: "Hello World: 0"
# [INFO] [minimal_subscriber]: I heard: "Hello World: 1"
# [INFO] [minimal_subscriber]: I heard: "Hello World: 2"
```

In a third terminal pane, inspect the live DDS topic communication:

```bash
# 1. List all active topics on the DDS bus
ros2 topic list
# Output includes: /parameter_events, /rosout, /topic

# 2. Inspect topic message type and active endpoint count
ros2 topic info /topic
# Type: std_msgs/msg/String | Publisher count: 1 | Subscription count: 1

# 3. Echo live messages passing through the DDS bus
ros2 topic echo /topic

# 4. Measure message publishing frequency (Hz)
ros2 topic hz /topic
# Average rate: 2.000 Hz

# 5. Publish a one-shot message manually from the terminal
ros2 topic pub --once /topic std_msgs/msg/String "{data: 'Hello from Student Terminal!'}"
```

---

## 8. Student Hands-On Tasks & Assignments

Now it is your turn to create the practice nodes with your own hands!

### Task 1 (Beginner Foundation): `m01_l05_task_custom_pubsub.py`

Create a new file in your editor: `~/ros2_ws/src/navpro_basics/navpro_basics/m01_l05_task_custom_pubsub.py` and write your combined publisher/subscriber node:

```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Module 1 / Lesson 05 Task 1
Package: navpro_basics
Task:    m01_l05_task_custom_pubsub.py (alias: task_custom_pubsub)
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class BeginnerPubSubNode(Node):
    """
    Student Starter Template: Beginner Publisher & Subscriber
    """

    def __init__(self):
        super().__init__('beginner_pubsub_task')
        self.get_logger().info('Initializing BeginnerPubSubNode...')

        # Internal message counter
        self.count = 0

        # TODO 1: Create a Publisher on topic '/chatter' (String, queue depth 10)
        self.publisher_ = self.create_publisher(String, '/chatter', 10)

        # TODO 2: Create a periodic 1.0 second timer triggering self.timer_callback
        self.timer_ = self.create_timer(1.0, self.timer_callback)

        # TODO 3: Create a Subscription to topic '/chatter'
        self.subscription_ = self.create_subscription(
            String, '/chatter', self.listener_callback, 10)

    def timer_callback(self):
        self.count += 1
        msg = String()
        msg.data = f'Robot ping: {self.count}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')

    def listener_callback(self, msg: String):
        self.get_logger().info(f'Received ping: "{msg.data}"')


def main(args=None):
    rclpy.init(args=args)
    node = BeginnerPubSubNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

Make it executable, build, and test:
```bash
chmod +x ~/ros2_ws/src/navpro_basics/navpro_basics/m01_l05_task_custom_pubsub.py
cd ~/ros2_ws && colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
ros2 run navpro_basics task_custom_pubsub
```

---

### Task 2 (Robotics Capstone): `m01_l05_task_teleop_speed_limiter.py`

Create a new file in your editor: `~/ros2_ws/src/navpro_basics/navpro_basics/m01_l05_task_teleop_speed_limiter.py` and implement the velocity safety supervisor:

```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Module 1 / Lesson 05 Capstone
Teleop Speed Limiter & Battery Supervisor Node
Task: m01_l05_task_teleop_speed_limiter.py (alias: task_teleop_speed_limiter)
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32


class TeleopSpeedLimiter(Node):

    def __init__(self):
        super().__init__('teleop_speed_limiter')
        self.get_logger().info('Initializing TeleopSpeedLimiter task node...')

        # 1. Scaling factors
        self.scale_factor = 0.8
        self.low_bat_thresh = 20.0
        self.current_battery_pct = 100.0

        # 2. Publisher to real /cmd_vel
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        # 3. Subscriptions to user joystick input and battery sensor
        self.cmd_vel_sub = self.create_subscription(Twist, '/input/cmd_vel', self.on_cmd_vel, 10)
        self.battery_sub = self.create_subscription(Float32, '/battery_voltage', self.on_battery, 10)

    def on_battery(self, msg: Float32):
        self.current_battery_pct = msg.data
        if self.current_battery_pct < self.low_bat_thresh:
            self.get_logger().warn(f'Low Battery Warning: {self.current_battery_pct:.1f}%! Limiting speed by 50%.')

    def on_cmd_vel(self, msg: Twist):
        out_msg = Twist()
        effective_scale = self.scale_factor
        if self.current_battery_pct < self.low_bat_thresh:
            effective_scale *= 0.5

        out_msg.linear.x = msg.linear.x * effective_scale
        out_msg.angular.z = msg.angular.z * effective_scale
        self.cmd_vel_pub.publish(out_msg)


def main(args=None):
    rclpy.init(args=args)
    node = TeleopSpeedLimiter()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

Make it executable, build, and test:
```bash
chmod +x ~/ros2_ws/src/navpro_basics/navpro_basics/m01_l05_task_teleop_speed_limiter.py
cd ~/ros2_ws && colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
ros2 run navpro_basics task_teleop_speed_limiter
```

> [!NOTE]
> Reference implementations for all tasks are archived in `/opt/navpro_level1/ros2_ws_reference/` for instructor reference and comparison.

