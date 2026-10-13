# Lesson 11: Communication Mechanism IV: Action Servers & Clients in Python

> **Focus:** Goal-Feedback-Result Communication, Preemption & Asynchronous Action Clients  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapter 17.1)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Services are ideal for instant requests (e.g. "turn on light" or "reset encoder"). However, for long-running robotic tasks that take seconds or minutes to complete (e.g., navigating across a warehouse or executing a 360-degree LiDAR calibration sweep), Services fail because they provide no progress feedback and cannot be canceled midway.

ROS 2 **Actions** solve this by implementing the **Goal - Feedback - Result** protocol with native preemption and cancellation support.

By the end of this lesson, you will:
1. Master the 3-part Action lifecycle: Goal submission, Real-time Feedback streaming, and Final Result delivery.
2. Build an object-oriented Python **Action Server** using `rclpy.action.ActionServer`.
3. Handle goal acceptance, goal rejection, feedback broadcasting, and client cancellation requests.
4. Build an asynchronous Python **Action Client** using `rclpy.action.ActionClient`.
5. Interact with, trigger, and cancel active actions via the CLI using `ros2 action send_goal --feedback`.

---

## 2. Action Communication Architecture

Under the hood, every ROS 2 Action is implemented as a coordinated set of DDS topics and services:

```
                            ACTION LIFECYCLE
                            
   [Action Client]                                    [Action Server]
          |                                                  |
          | ----- 1. Send Goal (Service: send_goal) -------> |
          | <---- 2. Goal Accepted (GoalResponse.ACCEPT) --- |
          |                                                  |
          | <==== 3. Periodic Progress (Topic: feedback) === |
          | <====    (e.g., Distance remaining: 1.4m)   ==== |
          |                                                  |
          | ----- 4. (Optional) Cancel Goal ---------------> |
          | <----    Cancel Accepted ----------------------- |
          |                                                  |
          | <---- 5. Final Outcome (Service: get_result) --- |
          |          (SUCCEEDED / CANCELED / ABORTED)        |
```

* **Goal:** Initiated by the client (e.g. target pose coordinates).
* **Feedback:** Periodic updates published by the server while executing the goal (e.g. current progress, distance remaining).
* **Result:** Final response sent when the task completes, fails, or is canceled.

---

## 3. Official ROS 2 Fibonacci Action Server (Python) - Step-by-Step

Following the canonical [Official ROS 2 Jazzy Action Server Tutorial](https://docs.ros.org/en/jazzy/Tutorials/Intermediate/Writing-an-action-server-client/Python.html), we begin with `fibonacci_action_server.py`.

It uses the standard interface `Fibonacci.action`:
```text
# Goal
int32 order
---
# Result
int32[] sequence
---
# Feedback
int32[] partial_sequence
```

```python
#!/usr/bin/env python3
"""
Official ROS 2 Jazzy Tutorial: Fibonacci Action Server
Reference: https://docs.ros.org/en/jazzy/Tutorials/Intermediate/Writing-an-action-server-client/Python.html
"""

import time
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node

try:
    from action_tutorials_interfaces.action import Fibonacci
except ImportError:
    from navpro_interfaces.action import Fibonacci


class FibonacciActionServer(Node):

    def __init__(self):
        super().__init__('fibonacci_action_server')

        # Create Action Server:
        # - Node: self
        # - Action Type: Fibonacci
        # - Action Name: 'fibonacci'
        # - Execute Callback: self.execute_callback
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback
        )
        self.get_logger().info('Fibonacci Action Server initialized and waiting for goals...')

    def execute_callback(self, goal_handle):
        """
        Executed in a separate worker thread when a goal arrives.
        Computes Fibonacci sequence while streaming feedback.
        """
        self.get_logger().info(f'Executing goal for order: {goal_handle.request.order}...')

        feedback_msg = Fibonacci.Feedback()
        feedback_msg.partial_sequence = [0, 1]

        # Calculate Fibonacci sequence one step at a time
        for i in range(1, goal_handle.request.order):
            # Check if the client requested cancellation
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().info('Goal canceled by client request!')
                result = Fibonacci.Result()
                result.sequence = feedback_msg.partial_sequence
                return result

            # Compute next number
            next_num = feedback_msg.partial_sequence[i] + feedback_msg.partial_sequence[i - 1]
            feedback_msg.partial_sequence.append(next_num)

            # Publish partial progress feedback to client
            self.get_logger().info(f'Feedback: {feedback_msg.partial_sequence}')
            goal_handle.publish_feedback(feedback_msg)

            # Delay 1 second to simulate long-running robotic task
            time.sleep(1.0)

        # Mark goal as successfully completed
        goal_handle.succeed()

        result = Fibonacci.Result()
        result.sequence = feedback_msg.partial_sequence
        self.get_logger().info(f'Returning result sequence: {result.sequence}')
        return result


def main(args=None):
    rclpy.init(args=args)
    fibonacci_action_server = FibonacciActionServer()
    try:
        rclpy.spin(fibonacci_action_server)
    except KeyboardInterrupt:
        pass
    finally:
        fibonacci_action_server.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: What We Are Trying to Achieve & Why
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `ActionServer(self, Fibonacci, 'fibonacci', self.execute_callback)` | Initialize Action endpoint. | Coordinates underlying DDS topics and services for goal negotiation, feedback publishing, and result retrieval. |
| `def execute_callback(self, goal_handle)` | Long-running task thread. | Unlike service callbacks, action execution callbacks run in dedicated threads so long computations don't block executor timers. |
| `goal_handle.publish_feedback(feedback_msg)` | Continuous progress telemetry. | Streams the accumulating `partial_sequence` back to the client while computation is ongoing. |
| `if goal_handle.is_cancel_requested:`<br>`goal_handle.canceled()` | Preemption and clean abort. | Allows the client to safely cancel midway (e.g. user pressed abort button) without crashing or hanging the server. |
| `goal_handle.succeed()`<br>`return result` | Final result delivery. | Transitions state machine to SUCCEEDED and delivers the final `sequence` list to the client. |

---

## 4. Official ROS 2 Fibonacci Action Client (Python) - Step-by-Step

Now let's build `fibonacci_action_client.py` to send goals and track live feedback:

```python
#!/usr/bin/env python3
"""
Official ROS 2 Jazzy Tutorial: Fibonacci Action Client
Reference: https://docs.ros.org/en/jazzy/Tutorials/Intermediate/Writing-an-action-server-client/Python.html
"""

import sys
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node

try:
    from action_tutorials_interfaces.action import Fibonacci
except ImportError:
    from navpro_interfaces.action import Fibonacci


class FibonacciActionClient(Node):

    def __init__(self):
        super().__init__('fibonacci_action_client')
        self._action_client = ActionClient(self, Fibonacci, 'fibonacci')

    def send_goal(self, order):
        self.get_logger().info('Waiting for action server to start...')
        self._action_client.wait_for_server()

        goal_msg = Fibonacci.Goal()
        goal_msg.order = order

        self.get_logger().info(f'Sending goal request for Fibonacci order {order}...')

        # Send goal asynchronously with feedback callback registered
        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().warn('Goal was rejected by server :(')
            return

        self.get_logger().info('Goal accepted! Awaiting result...')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info(f'Received feedback sequence: {feedback.partial_sequence}')

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info(f'Final Result: {result.sequence}')
        rclpy.shutdown()


def main(args=None):
    rclpy.init(args=args)

    order = int(sys.argv[1]) if len(sys.argv) > 1 else 10
    action_client = FibonacciActionClient()
    action_client.send_goal(order)

    rclpy.spin(action_client)


if __name__ == '__main__':
    main()
```

---

## 5. Verification with the ROS 2 Action CLI

Start the action server in Terminal 1:
```bash
ros2 run navpro_basics fibonacci_action_server
```

In Terminal 2, run the action client:
```bash
ros2 run navpro_basics fibonacci_action_client 8
# Output:
# [INFO] [fibonacci_action_client]: Sending goal request for Fibonacci order 8...
# [INFO] [fibonacci_action_client]: Goal accepted! Awaiting result...
# [INFO] [fibonacci_action_client]: Received feedback sequence: array('i', [0, 1, 1])
# [INFO] [fibonacci_action_client]: Received feedback sequence: array('i', [0, 1, 1, 2])
# ...
# [INFO] [fibonacci_action_client]: Final Result: array('i', [0, 1, 1, 2, 3, 5, 8, 13, 21])
```

In Terminal 3, you can inspect and trigger the action using the ROS 2 Action CLI:

```bash
# 1. List active action servers
ros2 action list
# Output: /fibonacci

# 2. Inspect action type
ros2 action info /fibonacci

# 3. Send goal directly from the command line with live feedback streaming!
ros2 action send_goal /fibonacci action_tutorials_interfaces/action/Fibonacci "{order: 6}" --feedback
```

---

## 6. From Fibonacci to Robotics: Waypoint Patrol & Navigation

The exact same Action protocol is what powers autonomous navigation in Nav2!
- Instead of computing numbers, the server navigates the robot through waypoints.
- Instead of `partial_sequence`, feedback streams `distance_remaining` and `current_speed`.
- When an obstacle blocks the path, the client can cancel or preempt the goal cleanly!

