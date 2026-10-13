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

## 3. Official ROS 2 Minimal Service Server (Python) - Step-by-Step

Following the canonical [Official ROS 2 Jazzy Beginner Service Tutorial](https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Service-And-Client.html), we begin with the fundamental `AddTwoInts` service server (`service_member_function.py` / `add_two_ints_server`).

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
Official ROS 2 Jazzy Tutorial: MinimalService
Reference: https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Service-And-Client.html
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

## 5. Official ROS 2 Minimal Client Async (Python) - Step-by-Step

Here is the canonical asynchronous Python Service Client (`client_member_function.py` / `add_two_ints_client`):

```python
#!/usr/bin/env python3
"""
Official ROS 2 Jazzy Tutorial: MinimalClientAsync
Reference: https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Service-And-Client.html
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

### Task 1 (Beginner Foundation): `task_service_calculator.py`
Located in `~/ros2_ws/src/navpro_basics/navpro_basics/task_service_calculator.py`.
- **Goal:** Implement a service server on `/calculate_sum` using `AddTwoInts`.
- **Run your node:**
  ```bash
  ros2 run navpro_basics task_service_calculator
  ```
- **Test with CLI:**
  ```bash
  ros2 service call /calculate_sum example_interfaces/srv/AddTwoInts "{a: 10, b: 20}"
  ```
- **Reference Solution:** `ros2 run navpro_basics solution_service_calculator`

### Task 2 (Robotics Capstone): `task_teleop_speed_limiter.py`
Located in `~/ros2_ws/src/navpro_basics/navpro_basics/task_teleop_speed_limiter.py`.
- **Goal:** Add `/set_speed_mode` (`std_srvs/srv/SetBool`) to toggle Turbo mode on the robot!
- **Run your node:**
  ```bash
  ros2 run navpro_basics task_teleop_speed_limiter
  ```

