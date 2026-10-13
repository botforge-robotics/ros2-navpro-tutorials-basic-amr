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

## 3. Step-by-Step: Writing an Action Server in Python

Let's implement a patrol action server that moves through waypoints, publishes feedback, and handles cancel requests.

Create file `patrol_action_server.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 11
Action Server: Executes autonomous multi-checkpoint patrol with progress streaming.
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from navpro_interfaces.action import Patrol


class PatrolActionServer(Node):

    def __init__(self):
        super().__init__('patrol_action_server')

        # Create Action Server
        self.action_server_ = ActionServer(
            self,
            Patrol,
            'patrol_robot',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )

        self.get_logger().info('Patrol Action Server active on action name: "patrol_robot"')

    def goal_callback(self, goal_request):
        """Validates incoming goals before accepting."""
        self.get_logger().info(f'Received patrol goal request with {len(goal_request.waypoints)} checkpoints.')
        if len(goal_request.waypoints) == 0:
            self.get_logger().warn('Rejecting goal: Waypoint list cannot be empty!')
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        """Handles client requests to cancel an in-progress patrol."""
        self.get_logger().warn('Received client request to cancel patrol!')
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        """Executes the long-running patrol loop in background thread."""
        self.get_logger().info('Executing patrol mission...')
        feedback_msg = Patrol.Feedback()
        total_waypoints = len(goal_handle.request.waypoints)
        battery = 98.0

        for i in range(total_waypoints):
            # Check if the client requested cancellation!
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().warn('Patrol mission canceled by client request.')
                result = Patrol.Result()
                result.success = False
                result.completed_waypoints = i
                return result

            # Simulate traveling to waypoint i
            time.sleep(1.5)
            battery -= 2.5

            # Stream feedback to the client
            feedback_msg.current_waypoint_index = i + 1
            feedback_msg.distance_to_next_waypoint = round(max(0.0, 5.0 - (i * 1.2)), 2)
            feedback_msg.battery_remaining_pct = round(battery, 1)

            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info(
                f'Checkpoint [{feedback_msg.current_waypoint_index}/{total_waypoints}] reached. Batt: {battery}%'
            )

        # Mark goal as successfully completed
        goal_handle.succeed()
        result = Patrol.Result()
        result.success = True
        result.completed_waypoints = total_waypoints
        result.total_distance_traveled = 24.8
        self.get_logger().info('Patrol mission completed successfully!')
        return result


def main():
    rclpy.init()
    server = PatrolActionServer()
    try:
        rclpy.spin(server)
    except KeyboardInterrupt:
        pass
    finally:
        server.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

## 4. Step-by-Step: Writing an Asynchronous Action Client in Python

Now let's build the client that dispatches the patrol goal and monitors real-time feedback:

Create file `patrol_action_client.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 11
Action Client: Dispatches patrol goal, prints real-time feedback, and awaits result.
"""

import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from geometry_msgs.msg import PoseStamped
from navpro_interfaces.action import Patrol


class PatrolActionClient(Node):

    def __init__(self):
        super().__init__('patrol_action_client')
        self.client_ = ActionClient(self, Patrol, 'patrol_robot')

    def send_patrol_goal(self):
        self.get_logger().info('Waiting for patrol action server to start...')
        self.client_.wait_for_server()

        goal_msg = Patrol.Goal()
        goal_msg.loop_count = 1

        # Populate 3 dummy waypoints
        for i in range(3):
            pose = PoseStamped()
            pose.pose.position.x = float(i * 2.0)
            goal_msg.waypoints.append(pose)

        self.get_logger().info('Dispatching patrol goal...')
        # Send goal asynchronously with feedback callback
        send_goal_future = self.client_.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().error('Patrol goal was rejected by the server!')
            return

        self.get_logger().info('Patrol goal accepted! Awaiting mission progress...')
        result_future = goal_handle.get_result_async()
        result_future.add_done_callback(self.result_callback)

    def feedback_callback(self, feedback_msg):
        fb = feedback_msg.feedback
        self.get_logger().info(
            f'[FEEDBACK] Checkpoint: {fb.current_waypoint_index} | Dist remaining: {fb.distance_to_next_waypoint}m | Battery: {fb.battery_remaining_pct}%'
        )

    def result_callback(self, future):
        result = future.result().result
        status = future.result().status
        self.get_logger().info(f'[RESULT] Status: {status} | Completed: {result.completed_waypoints} waypoints | Dist: {result.total_distance_traveled}m')


def main():
    rclpy.init()
    client = PatrolActionClient()
    client.send_patrol_goal()
    try:
        rclpy.spin(client)
    except KeyboardInterrupt:
        pass
    finally:
        client.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

---

## 5. Verification with the ROS 2 Action CLI

With the server running in Terminal 1, open Terminal 2:

```bash
# 1. List active action servers
ros2 action list

# 2. View action type and endpoints
ros2 action info /patrol_robot

# 3. Send goal from command line and watch real-time feedback streaming!
ros2 action send_goal /patrol_robot navpro_interfaces/action/Patrol "{loop_count: 1, waypoints: [{pose: {position: {x: 1.0}}}, {pose: {position: {x: 2.0}}}]}" --feedback
```

---

## 6. Hands-on Student Challenge

**Task:**
1. In `patrol_action_client.py`, set up a timer that triggers after 2.0 seconds.
2. In the timer callback, call `goal_handle.cancel_goal_async()`.
3. Verify that the server receives the cancellation request, safely breaks its loop, and returns `goal_handle.canceled()`.
