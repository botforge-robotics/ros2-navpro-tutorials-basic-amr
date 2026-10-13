# Lesson 25: Autonomous Navigation Scripting with Nav2 Simple Commander

> **Focus:** Python Mission Scripting, `BasicNavigator` API, Multi-Waypoint Patrols & Timeout Guards  
> **Course Track:** NavPro Learning Hub - Level 1 (Day 3 Capstone)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Up to this point, you commanded goals manually by clicking buttons in RViz2. In commercial warehouse robotics, an AMR receives autonomous mission assignments from an ERP or warehouse execution system (WES): **"Pick up pallet at Station Alpha -> Deliver to Packing Bay Bravo -> Return to Charger."**

The **Nav2 Simple Commander API (`BasicNavigator`)** is the official Python programmatic SDK for orchestrating autonomous navigation tasks.

By the end of this lesson, you will:
1. Initialize the navigation stack programmatically using `BasicNavigator.waitUntilNav2Active()`.
2. Seed initial localization estimates using `setInitialPose()`.
3. Dispatch asynchronous navigation goals with `goToPose()` and multi-point missions with `followWaypoints()`.
4. Monitor non-blocking real-time feedback (distance remaining, estimated time of arrival).
5. Implement safety watchdog timeout loops and goal cancellation.
6. Build and execute an autonomous multi-waypoint inspection patrol loop.

---

## 2. The Simple Commander Python API Architecture

![Nav2 Simple Commander Architecture](../assets/images/nav2_simple_commander.svg)

---

## 3. Core `BasicNavigator` Methods

| Method | Return Type | Description |
|---|---|---|
| `setInitialPose(pose)` | `None` | Publishes 2D pose to `/initialpose` for AMCL particle filter convergence. |
| `waitUntilNav2Active()` | `None` | Blocks script until all Nav2 lifecycle nodes report `Active` state. |
| `goToPose(goal_pose)` | `None` | Asynchronously dispatches a navigation goal (non-blocking). |
| `followWaypoints(poses)`| `None` | Dispatches a sequential list of waypoints. |
| `isTaskComplete()` | `bool` | Returns `True` when navigation has terminated (succeeded, canceled, or failed). |
| `getFeedback()` | `NavigationFeedback` | Returns real-time metrics: `distance_remaining`, `navigation_time`. |
| `cancelTask()` | `None` | Immediately aborts the in-progress navigation goal. |
| `getResult()` | `TaskResult` | Returns final outcome enum (`SUCCEEDED`, `CANCELED`, `FAILED`). |

---

## 4. Complete Autonomous Patrol Script Walkthrough

Open [`ros2_ws/src/navpro_navigation/navpro_navigation/solution_multi_waypoint_patrol.py`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_navigation/navpro_navigation/solution_multi_waypoint_patrol.py):

```python
#!/usr/bin/env python3
"""
Autonomous Multi-Waypoint Warehouse Patrol Script
Uses Nav2 Simple Commander API with non-blocking feedback and timeout guards.
"""

import time
import math
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult


def create_pose(navigator, x, y, yaw):
    """Helper creating a PoseStamped in map frame."""
    pose = PoseStamped()
    pose.header.frame_id = 'map'
    pose.header.stamp = navigator.get_clock().now().to_msg()
    pose.pose.position.x = float(x)
    pose.pose.position.y = float(y)
    pose.pose.orientation.z = math.sin(yaw / 2.0)
    pose.pose.orientation.w = math.cos(yaw / 2.0)
    return pose


def main():
    rclpy.init()
    navigator = BasicNavigator()

    # 1. Wait until Nav2 lifecycle nodes are Active
    navigator.get_logger().info('Waiting for Nav2 to activate...')
    navigator.waitUntilNav2Active()

    # 2. Define patrol checkpoints: (Name, X, Y, Yaw)
    checkpoints = [
        ("Station Alpha", 1.5, 0.5, 0.0),
        ("Storage Bay Bravo", 2.0, 2.0, 1.57),
        ("Inspection Point Charlie", 0.5, 1.8, 3.14),
    ]

    # 3. Execute sequential patrol loop
    for name, x, y, yaw in checkpoints:
        goal = create_pose(navigator, x, y, yaw)
        navigator.get_logger().info(f'Navigating to {name} ({x}, {y})...')
        navigator.goToPose(goal)

        start_time = time.time()
        while not navigator.isTaskComplete():
            fb = navigator.getFeedback()
            if fb:
                navigator.get_logger().info(
                    f'[{name}] Remaining distance: {fb.distance_remaining:.2f}m',
                    throttle_duration_sec=2.0
                )

            # Safety Watchdog Timeout: cancel if travel exceeds 45 seconds!
            if time.time() - start_time > 45.0:
                navigator.get_logger().warn(f'Timeout at {name}! Canceling...')
                navigator.cancelTask()
                break

            time.sleep(1.0)

        # Process outcome
        if navigator.getResult() == TaskResult.SUCCEEDED:
            navigator.get_logger().info(f'Reached {name}! Dwell inspection pause (2s)...')
            time.sleep(2.0)
        else:
            navigator.get_logger().error(f'Failed to reach {name}! Aborting mission.')
            break

    # 4. Return to home dock
    navigator.get_logger().info('Patrol complete! Returning to dock...')
    dock = create_pose(navigator, 0.0, 0.0, 0.0)
    navigator.goToPose(dock)
    while not navigator.isTaskComplete():
        time.sleep(1.0)

    navigator.get_logger().info('Safely docked.')
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Core Logic Breakdown: What We Are Trying to Achieve & Why
| Code Segment | What We Are Trying to Achieve | Why It Is Written This Way & Underlying Mechanism |
|---|---|---|
| `navigator = BasicNavigator()` | Instantiate high-level mission commander. | Wraps Nav2 Action Clients (`NavigateToPose`, `FollowWaypoints`, `ComputePathToPose`) inside a simplified, blocking/non-blocking Python API. |
| `navigator.waitUntilNav2Active()` | Synchronize with Nav2 lifecycle state machines. | In ROS 2, Nav2 nodes (costmap servers, planners, controllers) start in an `Unconfigured` or `Inactive` state. Attempting to navigate before nodes reach `Active` causes immediate rejected goals. |
| `pose.header.frame_id = 'map'` | Define target coordinates in global reference frame. | In robotics navigation, target waypoints must be referenced to the static global origin (`map` frame), not the moving chassis (`base_link`) or local odometry (`odom` which drifts over time). |
| `navigator.goToPose(goal)` | Asynchronous action goal dispatch. | Sends the goal to the Nav2 Behavior Tree Navigator action server without blocking execution. |
| `while not navigator.isTaskComplete():` | Non-blocking execution polling loop. | Allows the control script to remain responsive: monitoring remaining distance, checking sensor safety stops, updating dashboards, or checking timeouts while the robot drives. |
| `fb = navigator.getFeedback()`<br>`dist = fb.distance_remaining` | Query real-time feedback metrics. | Nav2 streams continuous feedback from the controller server indicating Euclidean path distance remaining and estimated travel time. |
| `if time.time() - start_time > 45.0:`<br>`navigator.cancelTask()` | **Autonomous Safety Watchdog**: Prevent infinite deadlocks. | If an aisle is blocked by an unmapped obstacle, the robot might attempt repeated recovery spins. The watchdog timer detects lack of progress and cancels the goal cleanly so the mission script can take corrective action or retreat. |
| `navigator.getResult() == TaskResult.SUCCEEDED` | Validate physical mission completion. | Evaluates whether the Nav2 Behavior Tree terminated with success, or whether it failed/was canceled. |

---


## 5. Execution & Verification

With simulation and navigation active:
```bash
ros2 run navpro_navigation task_multi_waypoint_patrol
```

Watch the robot sequentially drive through every warehouse aisle, halt for inspection scans, and automatically return to the home docking station!

---

## 6. Student Task & Reference Solution

* **Your Assignment File:** [`task_multi_waypoint_patrol.py`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_navigation/navpro_navigation/task_multi_waypoint_patrol.py)
* **Instructor Reference Answer:** [`solution_multi_waypoint_patrol.py`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_navigation/navpro_navigation/solution_multi_waypoint_patrol.py)
