# Lesson 12: Data Recording & Playback with ROS 2 Bags

> **Focus:** Robotic Dataset Recording, MCAP Storage Plugin & Python `rosbag2_py` Reader  
> **Course Track:** NavPro Learning Hub - Level 1 (Chapter 18)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

In physical robotics engineering, reproducing a bug that occurred 10 minutes ago in an aisle of a warehouse is impossible without recording the robot's sensor data. A **ROS 2 Bag** acts as the robot's "flight data recorder," logging exact binary message frames with microsecond timestamps.

By the end of this lesson, you will:
1. Understand ROS 2 bag storage backends: legacy **SQLite3** vs. modern **MCAP**.
2. Record selective topic subsets (`/cmd_vel`, `/odom`, `/scan`) and split logs by size/duration.
3. Inspect bag metadata and topic statistics using `ros2 bag info`.
4. Replay datasets into the computational graph at varied rates (`--rate 2.0`, `--loop`).
5. Write a Python script using the `rosbag2_py` API to parse and analyze recorded messages offline.

---

## 2. Storage Plugins: SQLite3 vs. MCAP

In ROS 2 Jazzy, two primary storage plugins exist:

| Feature | SQLite3 (`sqlite3`) | MCAP (`mcap` - Industry Standard) |
|---|---|---|
| **Default Storage** | Legacy Default (ROS 2 Humble) | **Native Default in ROS 2 Jazzy** |
| **Crash Resilience** | Uncommitted transactions can corrupt file on unexpected power cuts | Append-only index ensures data is recoverable after hard power loss |
| **Write Throughput** | ~150 MB/s (bottleneck for 4K video or 3D LiDAR) | **400+ MB/s** (zero-copy serialization) |
| **Visualization** | Requires conversion | Direct drag-and-drop into **Foxglove Studio** and PlotJuggler |

Install MCAP storage plugin:
```bash
sudo apt install -y ros-jazzy-rosbag2-storage-mcap
```

---

## 3. Step-by-Step: Recording Data via the CLI

### 3.1 Record Selective Topics
To prevent filling up disk space with unnecessary diagnostic streams, record only essential navigation topics:

```bash
# Record velocity, odometry, and laser scans into a timestamped folder
ros2 bag record -o warehouse_trial_01 /cmd_vel /odom /scan
```

### 3.2 Record with MCAP Format and Duration Split
```bash
# Record with MCAP storage, splitting into new files every 120 seconds
ros2 bag record -s mcap -d 120 -o patrol_run_mcap /cmd_vel /scan
```

### 3.3 Useful Recording Flags:
* `-a` or `--all`: Record every topic active on the DDS bus.
* `-e '<regex>'`: Record topics matching regular expressions (e.g. `-e '/navpro/.*'`).
* `--max-bag-size <bytes>`: Split into a new bag file when current reaches size limit (e.g. `1073741824` for 1GB).

---

## 4. Inspecting Bag Metadata

Inspect what was recorded using `ros2 bag info`:

```bash
ros2 bag info warehouse_trial_01
```

*Expected Output:*
```
Files:             warehouse_trial_01/warehouse_trial_01_0.mcap
Bag size:          14.2 MiB
Storage id:        mcap
Duration:          45.123s
Start:             Oct 13 2026 10:15:02.102 (1718204102.102)
End:               Oct 13 2026 10:15:47.225 (1718204147.225)
Messages:          2255
Topic information: 
  Topic: /cmd_vel | Type: geometry_msgs/msg/Twist | Count: 450 | Serialization: cdr
  Topic: /odom    | Type: nav_msgs/msg/Odometry   | Count: 902 | Serialization: cdr
  Topic: /scan    | Type: sensor_msgs/msg/LaserScan | Count: 903 | Serialization: cdr
```

---

## 5. Playback: Simulating the Physical Robot Offline

Playing back a bag file re-publishes the recorded messages onto the DDS bus with original timing, allowing you to test localization and navigation algorithms without needing the physical robot turned on!

```bash
# Standard playback
ros2 bag play warehouse_trial_01

# Fast playback at 2x speed
ros2 bag play warehouse_trial_01 --rate 2.0

# Slow motion at 0.5x speed (useful for debugging obstacle avoidance)
ros2 bag play warehouse_trial_01 --rate 0.5

# Continuous loop playback
ros2 bag play warehouse_trial_01 --loop

# Remap topic during playback to avoid collisions with active hardware
ros2 bag play warehouse_trial_01 --remap /cmd_vel:=/recorded_cmd_vel
```

---

## 6. Offline Python Analysis using `rosbag2_py`

You can write Python scripts to parse bags for post-mission telemetry analytics (e.g., maximum speed, total distance traveled):

Create file `analyze_bag.py`:
```python
#!/usr/bin/env python3
"""
NavPro Learning Hub - Lesson 12
Offline Bag Reader: Iterates through recorded messages and computes total distance traveled.
"""

import sys
import math
from rclpy.serialization import deserialize_message
from rosidl_runtime_py.utilities import get_message
import rosbag2_py


def analyze_odometry_bag(bag_path: str):
    reader = rosbag2_py.SequentialReader()
    storage_options = rosbag2_py.StorageOptions(uri=bag_path)
    converter_options = rosbag2_py.ConverterOptions(
        input_serialization_format='cdr',
        output_serialization_format='cdr'
    )
    reader.open(storage_options, converter_options)

    topic_types = reader.get_all_topics_and_types()
    type_map = {topic.name: topic.type for topic in topic_types}

    total_distance = 0.0
    last_x, last_y = None, None
    msg_count = 0

    print(f"Reading bag file: {bag_path} ...")

    while reader.has_next():
        topic_name, serialized_data, timestamp = reader.read_next()
        if topic_name == '/odom':
            msg_type = get_message(type_map[topic_name])
            msg = deserialize_message(serialized_data, msg_type)

            x = msg.pose.pose.position.x
            y = msg.pose.pose.position.y

            if last_x is not None:
                dx = x - last_x
                dy = y - last_y
                step_dist = math.sqrt(dx*dx + dy*dy)
                total_distance += step_dist

            last_x, last_y = x, y
            msg_count += 1

    print("\n--- Analytics Report ---")
    print(f"Total Odometry Frames: {msg_count}")
    print(f"Total Distance Traveled: {total_distance:.2f} meters")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 analyze_bag.py <path_to_bag>")
        sys.exit(1)
    analyze_odometry_bag(sys.argv[1])
```

---

## 7. Hands-on Student Challenge

**Task:**
1. Start `publisher_explained` from `navpro_basics`.
2. Record 15 seconds of `/cmd_vel` into a bag named `my_vel_bag`.
3. Stop the publisher.
4. Play back `my_vel_bag` while monitoring with `ros2 topic echo /cmd_vel`.
5. Verify that the echoed output matches the original published stream!
