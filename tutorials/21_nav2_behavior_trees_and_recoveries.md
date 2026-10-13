# Lesson 21: Behavior Trees, Recovery Behaviors & Lifecycle Management

> **Focus:** BT Navigator Engine, Recovery Plugins (Spin, BackUp, Wait) & Lifecycle State Machines  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

What happens when an autonomous robot gets stuck? A pallet jack is parked in its path, a worker stands in the doorway, or localization loses confidence?

In legacy robotics, state machines became unmaintainable "spaghetti state diagrams." In Nav2, decision-making is governed by **Behavior Trees (BT)** and managed by **Lifecycle Nodes**.

By the end of this lesson, you will:
1. Understand why Behavior Trees replaced Finite State Machines in modern autonomous systems.
2. Master the core BT node primitives: Action, Condition, Sequence, and Fallback.
3. Configure the **Recovery Behavior Server** (Spin, BackUp, Wait, and Costmap Clearing).
4. Master ROS 2 **Lifecycle Management** (`Unconfigured -> Inactive -> Active`).
5. Visualize and audit behavior trees in real time.

---

## 2. Why Behavior Trees Over State Machines?

| Finite State Machine (FSM) | Behavior Tree (BT) |
|---|---|
| $N^2$ possible transition arrows | Highly modular sub-trees |
| High risk of unhandled edge cases | Composable and readable |
| Difficult to add new behaviors | Reactive tick-based execution |

A Behavior Tree executes by sending periodic **Ticks** from the root downward. Each node returns one of three statuses:
* `SUCCESS`: The action completed successfully.
* `FAILURE`: The action failed (e.g. planner found no path).
* `RUNNING`: The action is currently in progress (e.g. robot is moving).

---

## 3. The Recovery Sub-Tree Pipeline

When the robot encounters an obstacle that blocks its planned path:

![Nav2 Behavior Tree Recovery Pipeline](../assets/images/nav2_bt_pipeline.svg)

1. **Clear Entire Costmap:** Strips out transient sensor noise or dynamic obstacles that may have already moved.
2. **BackUp Recovery:** Reverses 30cm to create maneuvering clearance.
3. **Spin Recovery:** Rotates 360 degrees to scan the perimeter and find open exits.
4. **Wait Recovery:** Pauses for 2-5 seconds allowing walking humans to clear the lane.

---

## 4. The ROS 2 Lifecycle State Machine

Every major node in Nav2 (Planner, Controller, Recoveries, Costmaps) is a **Managed Lifecycle Node**:

![ROS 2 Managed Lifecycle Node](../assets/images/lifecycle_state_machine.svg)

### Why Lifecycle Nodes are Crucial:
In ROS 1, nodes started operating immediately on launch. If a path planner launched before the map server was finished loading, the robot would crash.  
In ROS 2, the **`lifecycle_manager`** guarantees that all nodes are configured, memory is allocated, and topics are connected before any node enters the `Active` state!

---

## 5. Inspecting Lifecycle States with the CLI

```bash
# 1. List all managed lifecycle nodes
ros2 lifecycle nodes

# 2. Query the lifecycle state of the controller server
ros2 lifecycle get /controller_server
# Output: active [3]

# 3. Manually transition a node state for diagnostics
ros2 lifecycle set /controller_server deactivate
ros2 lifecycle set /controller_server activate
```

---

## 6. Hands-on Student Challenge

**Task:**
1. Start Nav2 navigation: `ros2 launch navpro_navigation navigation.launch.py`.
2. Send a navigation goal into a dead-end corridor in the warehouse.
3. In Gazebo, place a static box directly in front of the robot while it is driving.
4. Watch the robot stop, trigger the Recovery Pipeline: observe it backup 0.3m, spin, recompute a global detour around the obstacle, and proceed!
