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

## 3. Step-by-Step: Writing a Service Server in Python

Let's write a service server that dynamically sets the robot speed mode (ECO vs TURBO) using `std_srvs/srv/SetBool`.

Create file `speed_mode_server.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 08
Service Server: Manages robot drive mode transitions.
"""

import rclpy
from rclpy.node import Node
from std_srvs.srv import SetBool


class SpeedModeServer(Node):

    def __init__(self):
        super().__init__('speed_mode_server')

        # Internal state
        self.turbo_enabled_ = False
        self.max_speed_ = 0.5  # m/s

        # Create Service Server: type=SetBool, name='/robot/set_turbo_mode', callback=self.handle_set_turbo
        self.srv_ = self.create_service(
            SetBool,
            '/robot/set_turbo_mode',
            self.handle_set_turbo
        )

        self.get_logger().info('Speed Mode Service Server ready on /robot/set_turbo_mode')

    def handle_set_turbo(self, request: SetBool.Request, response: SetBool.Response) -> SetBool.Response:
        """
        Callback triggered whenever a client calls /robot/set_turbo_mode.
        Receives request: request.data (bool)
        Must return response: response.success (bool), response.message (str)
        """
        self.turbo_enabled_ = request.data

        if self.turbo_enabled_:
            self.max_speed_ = 1.2
            response.success = True
            response.message = f'TURBO MODE ENGAGED: Max speed increased to {self.max_speed_} m/s.'
            self.get_logger().warn(response.message)
        else:
            self.max_speed_ = 0.5
            response.success = True
            response.message = f'ECO MODE ENGAGED: Max speed restricted to {self.max_speed_} m/s.'
            self.get_logger().info(response.message)

        return response


def main():
    rclpy.init()
    node = SpeedModeServer()
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

---

## 4. The Critical SingleThreadedExecutor Deadlock Bug

> [!CAUTION]
> **Never use blocking `client.call(request)` inside a callback!**  
> If you call a service synchronously using `client.call()` from within a timer callback or subscriber callback, the single-threaded executor blocks waiting for the response. But because the thread is blocked, the same executor cannot process the incoming response from the server!  
> **Result:** The node freezes forever in an unrecoverable deadlock.  
> **Solution:** Always use asynchronous client calls: `client.call_async(request)`.

---

## 5. Step-by-Step: Writing an Asynchronous Service Client in Python

Here is the correct, non-blocking asynchronous Python Service Client using `call_async()` and a future callback:

Create file `speed_mode_client.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 08
Service Client: Calls /robot/set_turbo_mode asynchronously without deadlocks.
"""

import sys
import rclpy
from rclpy.node import Node
from std_srvs.srv import SetBool


class SpeedModeClient(Node):

    def __init__(self):
        super().__init__('speed_mode_client')

        # 1. Create client: type=SetBool, name='/robot/set_turbo_mode'
        self.client_ = self.create_client(SetBool, '/robot/set_turbo_mode')

        # 2. Wait until the server node is online
        while not self.client_.wait_for_service(timeout_sec=1.0):
            self.get_logger().warn('Service /robot/set_turbo_mode not available, waiting...')

        self.get_logger().info('Connected to Service Server successfully.')

    def send_request(self, enable_turbo: bool):
        """Asynchronously dispatches the service request."""
        request = SetBool.Request()
        request.data = enable_turbo

        self.get_logger().info(f'Sending request: enable_turbo = {enable_turbo}')
        
        # call_async returns a Future object immediately without blocking!
        future = self.client_.call_async(request)
        
        # Attach callback triggered when the server responds
        future.add_done_callback(self.response_callback)

    def response_callback(self, future):
        """Executed automatically when the server finishes and returns a response."""
        try:
            response = future.result()
            self.get_logger().info(f'Response Received -> Success: {response.success} | Message: "{response.message}"')
        except Exception as e:
            self.get_logger().error(f'Service call failed: {e}')


def main():
    rclpy.init()
    client_node = SpeedModeClient()

    # Send request to activate Turbo Mode
    client_node.send_request(enable_turbo=True)

    try:
        # Spin keeps the client node alive until the response arrives
        rclpy.spin(client_node)
    except KeyboardInterrupt:
        pass
    finally:
        client_node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

## 6. Verification with the ROS 2 CLI

Start the server node in Terminal 1:
```bash
ros2 run navpro_basics service_server_explained
```

In Terminal 2, inspect and call the service using the command line:

```bash
# 1. List all active service endpoints
ros2 service list

# 2. Find the message type of the service
ros2 service type /robot/set_autonomous_mode

# 3. Call the service directly from terminal with JSON-style payload
ros2 service call /robot/set_autonomous_mode std_srvs/srv/SetBool "{data: true}"
```

*Expected Output in Terminal 2:*
```
requester: making request: std_srvs.srv.SetBool_Request(data=True)

response:
std_srvs.srv.SetBool_Response(success=True, message='Autonomous mode ENABLED')
```

---

## 7. Hands-on Student Challenge

**Task:**
1. Create a service server named `battery_health_server`.
2. Use `std_srvs/srv/Trigger` (`---` `bool success`, `string message`).
3. When called, the service checks simulated battery voltage. If voltage > 24.0V, it returns `success=True` with message `"Battery healthy: 24.8V"`. Otherwise, it returns `success=False` with `"Warning: Battery under-voltage: 21.2V"`.
4. Test calling the service using `ros2 service call /check_battery std_srvs/srv/Trigger`.
