# Lesson 20: Nav2 Path Planners & Local Controller Tuning

> **Focus:** Global Planners (Smac/NavFn), DWB Trajectory Rollouts, Critic Scoring & Pure Pursuit  
> **Course Track:** NavPro Learning Hub - Level 1  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

Autonomous navigation is a two-tier problem:
1. **Global Planning:** "How do I get from Warehouse Dock A to Packaging Shelf 4 across the whole building?" (Computed once at 1 Hz).
2. **Local Control:** "How do I turn my wheels right now at 20 Hz to follow that line while dodging a pallet jack that just entered my path?"

By the end of this lesson, you will:
1. Understand the difference between Global Path Planning (NavFn / Smac) and Local Trajectory Control (DWB / Regulated Pure Pursuit).
2. Master the **DWB Local Planner Critic Scoring Algorithm**.
3. Tune DWB critics (`PathAlign`, `GoalDist`, `BaseObstacle`, `RotateToGoal`) to control robot aggression and smoothness.
4. Set position (`xy_goal_tolerance`) and orientation (`yaw_goal_tolerance`) convergence thresholds.

---

## 2. Planners vs. Controllers: The Two-Tier Paradigm

```
                   GLOBAL PLANNER (Navfn / Smac)
                   Runs at 1-2 Hz. Computes static line
                   of waypoints from Start to Goal.
                               |
                               | Global Path: /plan
                               v
                  LOCAL CONTROLLER (DWB / RPP)
                  Runs at 20 Hz. Generates candidate
                  velocity arcs, avoids obstacles, outputs:
                               |
                               | Motor Commands: /cmd_vel
                               v
                     DIFFERENTIAL DRIVE ROBOT
```

---

## 3. DWB Local Planner: Trajectory Rollout & Critic Scoring

The **DWB Local Planner** evaluates dozens of potential velocity trajectories $(v_x, \omega_z)$ projected forward in time (`sim_time = 1.7s`):

```
                               DWB TRAJECTORY SCORING
                               
                                          Arc 1 (Too close to wall -> PENALTY)
                                       .-'
                         Robot       .'   Arc 2 (Follows path smoothly -> BEST SCORE)
                         [===] =====+
                                     `.   Arc 3 (Drifts away from path -> PENALTY)
                                       `-.
```

Every trajectory arc is scored against an ensemble of mathematical **Critics**:

$$\text{Total Score} = \sum_{i} \left( \text{weight}_i \times \text{critic\_cost}_i \right)$$

The trajectory with the lowest overall penalty cost is selected and published to `/cmd_vel`!

---

## 4. Key DWB Critics & Tuning Matrix

Open [`config/nav2_params.yaml`](file:///home/chaitu/Projects/navpro_learning_hub/level1/ros2_ws/src/navpro_navigation/config/nav2_params.yaml):

```yaml
controller_server:
  ros__parameters:
    FollowPath:
      plugin: "dwb_core::DWBLocalPlanner"
      max_vel_x: 0.5
      max_vel_theta: 1.0
      sim_time: 1.7
      vx_samples: 20
      vtheta_samples: 20
      critics: ["RotateToGoal", "BaseObstacle", "PathAlign", "GoalDist"]

      BaseObstacle.scale: 0.02
      PathAlign.scale: 32.0
      GoalDist.scale: 24.0
      RotateToGoal.scale: 32.0
```

| Critic Name | What it Rewards / Penalizes | If Weight is Too High | If Weight is Too Low |
|---|---|---|---|
| **`BaseObstacle`** | Heavy penalty if trajectory intersects costmap obstacles | Robot is overly timid, freezes near doorways | Robot clips corners and collides with racks |
| **`PathAlign`** | Rewards pointing the robot chassis along the global path vector | Robot strictly adheres to path, struggles to steer around dynamic obstacles | Robot cuts corners recklessly |
| **`GoalDist`** | Pulls the robot toward the final goal point | Robot ignores global path and tries to drive directly through obstacles | Robot crawls sluggishly near the goal |
| **`RotateToGoal`** | Rewards rotating in place to match the final heading | Robot slows down prematurely to rotate | Robot reaches coordinate but stops facing the wrong direction |

---

## 5. Regulated Pure Pursuit (RPP)

For industrial AMR and AGV applications where robots must strictly follow designated one-way warehouse lanes without cutting corners, Nav2 offers the **Regulated Pure Pursuit Controller**:

```yaml
FollowPath:
  plugin: "nav2_regulated_pure_pursuit_controller::RegulatedPurePursuitController"
  desired_linear_vel: 0.5
  lookahead_dist: 0.6
  min_lookahead_dist: 0.3
  max_lookahead_dist: 0.9
  use_regulated_linear_velocity_scaling: true
```

* Automatically scales speed down as path curvature increases (slows down smoothly for tight 90-degree turns).

---

## 6. Hands-on Student Challenge

**Task:**
1. In `nav2_params.yaml`, modify `general_goal_checker`:
   - Set `xy_goal_tolerance: 0.10` (10cm precision).
   - Set `yaw_goal_tolerance: 0.15` (~8.5 degrees precision).
2. Launch navigation:
   ```bash
   ros2 launch navpro_navigation navigation.launch.py
   ```
3. Use the RViz2 **2D Goal Pose** tool to command a goal. Observe how precisely the robot stops at the target pose!
