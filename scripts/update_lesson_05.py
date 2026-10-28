#!/usr/bin/env python3
import json

with open('scripts/lesson_05_content.html', 'r') as f:
    html_content = f.read().strip()

quizzes = [
  {
    "id": "q_l1_05_1",
    "prompt": "What happens if a publisher offers BEST_EFFORT reliability on a topic, but a subscriber requests RELIABLE?",
    "options": [
      "DDS automatically converts BEST_EFFORT packets into reliable packets",
      "DDS rejects the connection and NO data is delivered (silent failure)",
      "The subscriber crashes with a segmentation fault",
      "The ROS 2 executor forces the publisher to restart"
    ],
    "correct": 1,
    "explanation": "Under DDS QoS compatibility rules, a subscriber cannot request stricter QoS guarantees than a publisher provides (Rx <= Tx). A RELIABLE subscriber connecting to a BEST_EFFORT publisher results in a silent connection rejection."
  },
  {
    "id": "q_l1_05_2",
    "prompt": "Why is the --symlink-install flag critical when developing Python ROS 2 packages with colcon?",
    "options": [
      "It compiles Python byte-code into binary machine code",
      "It symlinks source files from src/ to install/, allowing instant Python code editing without rebuilding",
      "It reduces RAM consumption of DDS participants",
      "It automatically formats Python scripts with Black and Flake8"
    ],
    "correct": 1,
    "explanation": "--symlink-install creates direct symbolic links to your Python source scripts in src/, enabling rapid prototyping without running colcon build after every edit."
  },
  {
    "id": "q_l1_05_3",
    "prompt": "Which ROS 2 CLI command allows you to monitor the live publishing rate and frequency statistics of a topic?",
    "options": [
      "ros2 topic hz <topic_name>",
      "ros2 topic count <topic_name>",
      "ros2 topic rate <topic_name>",
      "ros2 node ping <topic_name>"
    ],
    "correct": 0,
    "explanation": "'ros2 topic hz <topic_name>' subscribes to the topic and calculates rolling average frequency, min/max intervals, and standard deviation."
  },
  {
    "id": "q_l1_05_4",
    "prompt": "When commanding mobile robot locomotion (including Turtlesim), which standard ROS 2 message interface is published to /cmd_vel?",
    "options": [
      "sensor_msgs/msg/LaserScan",
      "std_msgs/msg/String",
      "geometry_msgs/msg/Twist",
      "nav_msgs/msg/Odometry"
    ],
    "correct": 2,
    "explanation": "geometry_msgs/msg/Twist is the universal ROS 2 interface for linear velocity (m/s) and angular velocity (rad/s) ground vehicle control."
  }
]

with open('lms/src/data/lessonsData.json', 'r') as f:
    data = json.load(f)

l5 = data['lessons'][4]
l5['title'] = "Publishers, Subscribers & Quality of Service (QoS)"
l5['focus'] = "Object-Oriented Node Lifecycle, Pub/Sub Patterns, CLI Introspection, Symlink Builds & Autonomous Turtlesim Control"
l5['snapshot'] = [
    ["Pub/Sub Decoupling", "Publishers and subscribers communicate anonymously over strongly-typed DDS topics without direct IP address pairing."],
    ["Live Introspection", "CLI tools (ros2 topic list, info, echo, hz) allow instant inspection and performance measurement of running data streams."],
    ["Symlink Superpower", "--symlink-install links source files directly to install/, enabling instant Python code updates without rebuilding."],
    ["QoS Compatibility Rule", "Rx <= Tx: A subscriber's QoS requirements must be less restrictive than or equal to the publisher's offering."]
]
l5['html_content'] = html_content
l5['quizzes'] = quizzes

with open('lms/src/data/lessonsData.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Successfully updated Lesson 05 in lessonsData.json!")
