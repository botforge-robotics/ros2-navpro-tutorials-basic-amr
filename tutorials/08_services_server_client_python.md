# Lesson 08: Communication Mechanism II: Service Servers & Clients in Python

> **Focus:** Request-Response Communication, Deadlock Prevention & Asynchronous Client Design  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapters 14, 15 & 16)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

While Topics handle continuous high-frequency data streams (e.g. sensor feeds), **Services** implement the synchronous or asynchronous **Request-Response** pattern. A client node sends a request to a service server and waits for a response.

By the end of this lesson, you will:
1. Understand the Request-Response communication model and when to use Services vs Topics vs Actions.
2. Build an object-oriented Python **Service Server** that processes requests and returns structured responses.
3. Build an asynchronous Python **Service Client** using `call_async()` and `Future` objects.
4. Understand the critical **SingleThreadedExecutor Deadlock Bug** and how to avoid it.
5. Trigger and test service endpoints directly from the command line using `ros2 service call`.

---

## 2. Decision Matrix: Topics vs Services vs Actions

| Communication Pattern | Data Flow | Blocking? | Feedback During Execution? | Example Robotics Use Case |
|---|---|---|---|---|
| **Topic** | Publisher -> Subscriber (Unidirectional, Continuous) | No (Asynchronous) | No | Continuous LiDAR scans (`/scan`), Wheel velocities (`/cmd_vel`) |
| **Service** | Client <-> Server (Bidirectional, Request/Response) | Optional (Sync or Async) | No (Returns only once at completion) | Motor calibration, Camera trigger, Mode toggle (`/set_speed_mode`) |
| **Action** | Action Client <-> Action Server (Goal -> Feedback -> Result) | No (Asynchronous) | **Yes** (Continuous progress updates) | Navigate 10 meters to waypoint, Execute 30-second docking trajectory |

---

## 3. Building a Service Server in Python - Step-by-Step

We begin with the fundamental `AddTwoInts` service server (`m02_l08_01_service_member_function.py` / `add_two_ints_server`).

Create a new file in your code editor: `~/ros2_ws/src/navpro_basics/navpro_basics/add_two_ints_server.py` and implement the service server:

It uses the standard interface `example_interfaces/srv/AddTwoInts`:
```text
int64 a
int64 b
---
int64 sum
```

```python
#!/usr/bin/env python3
"""
NavPro Robotics: MinimalService
Implements a Python service server for AddTwoInts.
"""

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class MinimalService(Node):

    def __init__(self):
        super().__init__('minimal_service')
        # 1. Create Service Server:
        # - Service Type: AddTwoInts from example_interfaces.srv
        # - Service Name: 'add_two_ints'
        # - Callback: self.add_two_ints_callback
        self.srv = self.create_service(
            AddTwoInts,
            'add_two_ints',
            self.add_two_ints_callback
        )
        self.get_logger().info('MinimalService ready on "add_two_ints"...')

    def add_two_ints_callback(self, request, response):
        # 2. Callback receives request (with .a and .b) and response object
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request\na: {request.a} b: {request.b}')
        self.get_logger().info(f'Returning response: [{response.sum}]')
        # 3. MUST return the modified response object
        return response


def main():
    rclpy.init()
    minimal_service = MinimalService()

    try:
        rclpy.spin(minimal_service)
    except KeyboardInterrupt:
        pass
    finally:
        minimal_service.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: What We Are Trying to Achieve & Why
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)` | Expose remote procedure call (RPC) endpoint on DDS. | Binds the service type and name to our node. The DDS middleware registers the service server and dispatches incoming requests to `add_two_ints_callback`. |
| `def add_two_ints_callback(self, request, response)` | Dual-argument callback signature. | Unlike topic callbacks (which only take `msg`), service callbacks **always** take two arguments: `request` and `response` provided by middleware. |
| `response.sum = request.a + request.b`<br>`return response` | Compute result and return payload. | Populates the output field defined after `---` in the `.srv` file. You **must return the response object**; if omitted or returning `None`, the client hangs indefinitely. |
| `rclpy.spin(minimal_service)` | Process incoming client requests. | The executor thread monitors DDS sockets and triggers `add_two_ints_callback` whenever a client invokes the service. |

---

## 4. The Critical SingleThreadedExecutor Deadlock Bug

> [!CAUTION]
> **Never use blocking `client.call(request)` inside a callback!**  
> If you call a service synchronously using `client.call()` from within a timer callback or subscriber callback, the single-threaded executor blocks waiting for the response. But because the thread is blocked, the same executor cannot process the incoming response from the server!  
> **Result:** The node freezes forever in an unrecoverable deadlock.  
> **Solution:** Always use asynchronous client calls: `client.call_async(request)`.

---

## 5. Building an Asynchronous Service Client in Python - Step-by-Step

Here is the asynchronous Python Service Client (`m02_l08_02_client_member_function.py` / `add_two_ints_client`).

Create a new file in your code editor: `~/ros2_ws/src/navpro_basics/navpro_basics/add_two_ints_client.py` and implement the client:

```python
#!/usr/bin/env python3
"""
NavPro Robotics: MinimalClientAsync
Implements a non-blocking asynchronous Python service client for AddTwoInts.
"""

import sys
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class MinimalClientAsync(Node):

    def __init__(self):
        super().__init__('minimal_client_async')
        # 1. Create client for 'add_two_ints' service
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')

        # 2. Wait until the service server is online
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        # 3. Call service asynchronously (returns Future immediately)
        return self.cli.call_async(self.req)


def main():
    rclpy.init()

    # Read numbers from terminal arguments (e.g. $ ros2 run py_srvcli client 2 3)
    a = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    b = int(sys.argv[2]) if len(sys.argv) > 2 else 3

    minimal_client = MinimalClientAsync()
    future = minimal_client.send_request(a, b)

    # 4. Spin executor until future resolves
    rclpy.spin_until_future_complete(minimal_client, future)

    response = future.result()
    minimal_client.get_logger().info(
        f'Result of add_two_ints: {a} + {b} = {response.sum}'
    )

    minimal_client.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: What We Are Trying to Achieve & Why
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Why & Underlying Mechanism |
|---|---|---|
| `self.create_client(AddTwoInts, 'add_two_ints')` | Create outbound RPC client socket. | Establishes DDS transport handles to send request packets and listen for matched responses. |
| `while not self.cli.wait_for_service(timeout_sec=1.0):` | Defend against race conditions at startup. | If a client attempts to send requests before the server has finished booting, the request is dropped. `wait_for_service` polls DDS discovery with a non-zero timeout. |
| `future = self.cli.call_async(self.req)` | **Deadlock-Free Dispatch**: Send request without halting the calling thread. | `call_async` queues the request packet into DDS buffers and immediately returns a Python `Future` object, leaving the thread free. |
| `rclpy.spin_until_future_complete(minimal_client, future)` | Block only the outer script, not the middleware. | The executor spins specifically until this future is fulfilled, allowing the incoming response packet to be unmarshaled. |
| `response = future.result()` | Safely unpack the server payload. | Retrieves the resolved `AddTwoInts.Response` containing `response.sum`. |

---

### 5.1 Configure Entry Points & Build `navpro_basics`
Open `~/ros2_ws/src/navpro_basics/setup.py` and ensure your service nodes are registered inside `entry_points -> console_scripts`:

```python
    entry_points={
        'console_scripts': [
            'talker = navpro_basics.talker:main',
            'listener = navpro_basics.listener:main',
            'task_custom_pubsub = navpro_basics.m01_l05_task_custom_pubsub:main',
            'task_teleop_speed_limiter = navpro_basics.m01_l05_task_teleop_speed_limiter:main',
            'add_two_ints_server = navpro_basics.add_two_ints_server:main',
            'add_two_ints_client = navpro_basics.add_two_ints_client:main',
            'task_service_calculator = navpro_basics.m02_l08_task_service_calculator:main',
            'solution_service_calculator = navpro_basics.m02_l08_solution_service_calculator:main',
        ],
    },
```

Make your scripts executable and build your workspace:
```bash
chmod +x ~/ros2_ws/src/navpro_basics/navpro_basics/add_two_ints_server.py
chmod +x ~/ros2_ws/src/navpro_basics/navpro_basics/add_two_ints_client.py
cd ~/ros2_ws
colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
```

---

## 6. Verification with the ROS 2 CLI

Start the server node in Terminal 1:
```bash
ros2 run navpro_basics add_two_ints_server
# Output:
# [INFO] [minimal_service]: MinimalService ready on "add_two_ints"...
```

In Terminal 2, run the client node:
```bash
ros2 run navpro_basics add_two_ints_client 41 59
# Output:
# [INFO] [minimal_client_async]: Result of add_two_ints: 41 + 59 = 100
```

In Terminal 3, you can also trigger the service directly from the command line:

```bash
# 1. List all active services
ros2 service list

# 2. Inspect service interface type
ros2 service type /add_two_ints
# Output: example_interfaces/srv/AddTwoInts

# 3. Call the service manually with arguments:
ros2 service call /add_two_ints example_interfaces/srv/AddTwoInts "{a: 10, b: 25}"
# Output:
# response:
# example_interfaces.srv.AddTwoInts_Response(sum=35)
```

---

## 7. Student Hands-On Tasks & Assignments

### Task 1 (Beginner Foundation): Service Calculator Node (`task_service_calculator`)
Create a new file in your code editor: `~/ros2_ws/src/navpro_basics/navpro_basics/m02_l08_task_service_calculator.py` and implement the service server:

```python
#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 2 / Lesson 08 Task
Package: navpro_basics
Task:    m02_l08_task_service_calculator.py (alias: task_service_calculator)
================================================================================

EXERCISE OVERVIEW:
------------------
Your goal is to build your very first ROS 2 Service Server using the standard
`example_interfaces/srv/AddTwoInts` interface.

OBJECTIVES:
-----------
1. Initialize node with name 'service_calculator_task'.
2. Create Service on 'calculate_sum' using interface `AddTwoInts`.
3. In the callback `compute_sum(self, request, response)`:
   - Compute the sum: response.sum = request.a + request.b
   - Log: f'Computing {request.a} + {request.b} = {response.sum}'
   - Return response
4. Test your running service with the ROS 2 CLI:
   $ ros2 service call /calculate_sum example_interfaces/srv/AddTwoInts "{a: 15, b: 27}"
================================================================================
"""

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class ServiceCalculatorNode(Node):
    """
    Student Starter Template: Beginner Service Server
    """

    def __init__(self):
        super().__init__('service_calculator_task')
        self.get_logger().info('Initializing ServiceCalculatorNode...')

        # ----------------------------------------------------------------------
        # TODO 1: Create a Service Server on 'calculate_sum'
        # Interface Type:    AddTwoInts
        # Service Name:      'calculate_sum'
        # Callback Function: self.compute_sum
        # Hint: self.srv = self.create_service(AddTwoInts, 'calculate_sum', self.compute_sum)
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        self.srv = None

    def compute_sum(self, request, response):
        """
        TODO 2: Service Request Callback
        --------------------------------
        1. Calculate: response.sum = request.a + request.b
        2. Log calculation: self.get_logger().info(...)
        3. Return response
        """
        # TODO: STUDENT CODE HERE
        return response


def main(args=None):
    rclpy.init(args=args)
    node = ServiceCalculatorNode()
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

#### Make Executable & Build:
```bash
chmod +x ~/ros2_ws/src/navpro_basics/navpro_basics/m02_l08_task_service_calculator.py
cd ~/ros2_ws && colcon build --symlink-install --packages-select navpro_basics
source install/setup.bash
```

#### Run Your Node:
```bash
ros2 run navpro_basics task_service_calculator
```

#### Test With CLI in a Second Terminal:
```bash
ros2 service call /calculate_sum example_interfaces/srv/AddTwoInts "{a: 15, b: 27}"
# Expected Output:
# response:
# example_interfaces.srv.AddTwoInts_Response(sum=42)
```

<details>
<summary><b>Click to View Reference Solution (m02_l08_solution_service_calculator.py)</b></summary>

```python
#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Beginner Task 2 Reference Solution
Package: navpro_basics
Task:    solution_service_calculator.py
================================================================================
"""

from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node


class ServiceCalculatorSolution(Node):
    """
    Reference Solution: Beginner Service Server
    """

    def __init__(self):
        super().__init__('service_calculator_solution')
        self.get_logger().info('Initializing ServiceCalculatorSolution...')

        self.srv = self.create_service(
            AddTwoInts,
            'calculate_sum',
            self.compute_sum
        )

    def compute_sum(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Computing {request.a} + {request.b} = {response.sum}')
        return response


def main(args=None):
    rclpy.init(args=args)
    node = ServiceCalculatorSolution()
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
</details>

---

### Task 2 (Robotics Capstone): Speed Mode Switching Service (`task_teleop_speed_limiter`)

In Lesson 05, you created `~/ros2_ws/src/navpro_basics/navpro_basics/m01_l05_task_teleop_speed_limiter.py`. Now open this file to add a ROS 2 service server on `/set_speed_mode` (`std_srvs/srv/SetBool`) to switch between ECO (scaled speed) and TURBO (100% speed) modes!

#### Step 1: Import `SetBool`
At the top of `m01_l05_task_teleop_speed_limiter.py`, add:
```python
from std_srvs.srv import SetBool
```

#### Step 2: Create the Service Server in `__init__`
In the constructor, register the service:
```python
self.mode_service = self.create_service(
    SetBool,
    '/set_speed_mode',
    self.on_set_speed_mode
)
```

#### Step 3: Implement the Service Callback
```python
def on_set_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
    self.turbo_mode = request.data
    response.success = True
    mode_str = "TURBO (100% power)" if self.turbo_mode else f"ECO ({self.scale_factor * 100:.0f}% power)"
    response.message = f"Speed mode successfully set to: {mode_str}"
    self.get_logger().info(f'[Service Call] {response.message}')
    return response
```

#### Step 4: Test Mode Switching with the CLI
Run the speed limiter node:
```bash
ros2 run navpro_basics task_teleop_speed_limiter
```

In a second terminal, trigger Turbo mode:
```bash
ros2 service call /set_speed_mode std_srvs/srv/SetBool "{data: true}"
# Output:
# response:
# std_srvs.srv.SetBool_Response(success=True, message='Speed mode successfully set to: TURBO (100% power)')
```

And switch back to Eco mode:
```bash
ros2 service call /set_speed_mode std_srvs/srv/SetBool "{data: false}"
# Output:
# response:
# std_srvs.srv.SetBool_Response(success=True, message='Speed mode successfully set to: ECO (80% power)')
```

<details>
<summary><b>Click to View Complete Reference Implementation (solution_teleop_speed_limiter.py)</b></summary>

```python
#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Day 1 Reference Solution
Package: navpro_basics
Node:    solution_teleop_speed_limiter.py
================================================================================
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32
from std_srvs.srv import SetBool


class SolutionTeleopSpeedLimiter(Node):

    def __init__(self):
        super().__init__('teleop_speed_limiter')
        self.get_logger().info('Initializing SolutionTeleopSpeedLimiter reference node...')

        self.declare_parameter('speed_scale_factor', 0.8)
        self.declare_parameter('low_battery_threshold', 20.0)

        self.scale_factor = self.get_parameter('speed_scale_factor').value
        self.low_bat_thresh = self.get_parameter('low_battery_threshold').value

        self.current_battery_pct = 100.0
        self.turbo_mode = False

        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        self.cmd_vel_sub = self.create_subscription(
            Twist,
            '/input/cmd_vel',
            self.on_cmd_vel,
            10
        )

        self.battery_sub = self.create_subscription(
            Float32,
            '/battery_voltage',
            self.on_battery,
            10
        )

        self.mode_service = self.create_service(
            SetBool,
            '/set_speed_mode',
            self.on_set_speed_mode
        )

        self.get_logger().info(
            f'SolutionTeleopSpeedLimiter active! [Scale: {self.scale_factor * 100:.0f}%, '
            f'LowBat Threshold: {self.low_bat_thresh:.1f}%]'
        )

    def on_battery(self, msg: Float32):
        self.current_battery_pct = msg.data
        if self.current_battery_pct < self.low_bat_thresh:
            self.get_logger().warn(
                f'LOW BATTERY WARNING: Battery at {self.current_battery_pct:.1f}% '
                f'(below threshold {self.low_bat_thresh:.1f}%). Speed reduced by 50%!',
                throttle_duration_sec=3.0
            )

    def on_cmd_vel(self, msg: Twist):
        multiplier = 1.0 if self.turbo_mode else self.scale_factor
        if self.current_battery_pct < self.low_bat_thresh:
            multiplier *= 0.5

        out_msg = Twist()
        out_msg.linear.x = msg.linear.x * multiplier
        out_msg.linear.y = msg.linear.y * multiplier
        out_msg.linear.z = 0.0

        out_msg.angular.x = 0.0
        out_msg.angular.y = 0.0
        out_msg.angular.z = msg.angular.z * multiplier

        self.cmd_vel_pub.publish(out_msg)

    def on_set_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        self.turbo_mode = request.data
        response.success = True
        mode_str = "TURBO (100% power)" if self.turbo_mode else f"ECO ({self.scale_factor * 100:.0f}% power)"
        response.message = f"Speed mode successfully set to: {mode_str}"
        self.get_logger().info(f'[Service Call] {response.message}')
        return response


def main(args=None):
    rclpy.init(args=args)
    node = SolutionTeleopSpeedLimiter()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('Shutting down SolutionTeleopSpeedLimiter...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```
</details>


