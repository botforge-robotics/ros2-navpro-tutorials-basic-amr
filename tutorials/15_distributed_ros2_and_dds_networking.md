# Lesson 15: Distributed ROS 2, Multi-Robot Fleets & DDS Networking

> **Focus:** DDS Discovery Protocols, `ROS_DOMAIN_ID` Isolation, CycloneDDS vs FastDDS & Fleet Architecture  
> **Course Track:** NavPro Learning Hub - Level 1 (Lecture 07)  
> **Target Environment:** ROS 2 Jazzy Jalisco  

---

## 1. Overview & Learning Objectives

One of the greatest superpowers of ROS 2 is native distributed computing. Two physical computers, a Raspberry Pi on a robot chassis, an edge AI compute box, and a ground control station PC connected to the same local network can communicate seamlessly without running a central server (`roscore`).

However, without proper network configuration, **every student in a classroom or every AMR in a warehouse will discover and steer each other's robots!**

By the end of this lesson, you will:
1. Understand the DDS Simple Participant Discovery Protocol (SPDP) over UDP multicast.
2. Master network segmentation using the `ROS_DOMAIN_ID` environment variable.
3. Understand the mathematical UDP port assignment schema used by DDS vendors.
4. Compare and switch RMW middleware implementations: **eProsima FastDDS** vs. **Eclipse CycloneDDS**.
5. Configure a **Discovery Server** for large fleets operating on restricted enterprise Wi-Fi networks.

---

## 2. How DDS Discovers Nodes: Multicast Protocol

When a ROS 2 node boots up:
1. It sends periodic **UDP Multicast** announcement packets to standard IP address `239.255.0.1`.
2. Any other ROS 2 node listening on the same subnet receives the packet and extracts the node's topics, types, and QoS profiles.
3. The nodes establish direct **peer-to-peer unicast UDP connections** for high-speed message transfer.

![DDS Multicast Discovery Bus & Domain Isolation](../assets/images/dds_discovery_domains.svg)

---

## 3. Network Isolation with `ROS_DOMAIN_ID`

To isolate your robot from other robots on the same Wi-Fi network, set a unique integer ID between `0` and `101`:

```bash
export ROS_DOMAIN_ID=42
```

### The DDS UDP Port Assignment Formula:
DDS calculates its operating UDP network ports deterministically from the Domain ID:

$$\text{Multicast Port} = 7400 + (250 \times \text{Domain ID})$$
$$\text{Unicast Port} = 7410 + (250 \times \text{Domain ID}) + (2 \times \text{Participant ID})$$

*For `ROS_DOMAIN_ID = 0`: Multicast Port = 7400.*  
*For `ROS_DOMAIN_ID = 42`: Multicast Port = $7400 + (250 \times 42) = 17900$.*

Because the operating system routes network traffic by port number, nodes on `DOMAIN_ID=42` can never hear or interfere with nodes on `DOMAIN_ID=0`.

---

## 4. Middleware Selection: FastDDS vs. CycloneDDS

ROS 2 communicates via an abstraction layer called **RMW (ROS Middleware)**. You can change the underlying DDS implementation without modifying a single line of your Python code!

| Feature | eProsima FastDDS (Default) | Eclipse CycloneDDS |
|---|---|---|
| **Default in ROS 2** | Yes | No (requires package install) |
| **Wi-Fi Loss Resilience** | Moderate (tuned for high throughput) | **Superior** (highly robust in noisy/lossy wireless networks) |
| **Discovery Mechanism** | Multicast or Discovery Server | Multicast or Peered Unicast |
| **Configuration** | Complex XML profiles | Clean, lightweight XML (`cyclonedds.xml`) |

### Switching to CycloneDDS:
Install the RMW package:
```bash
sudo apt install -y ros-jazzy-rmw-cyclonedds-cpp
```

Set the environment variable in your terminal or `~/.bashrc`:
```bash
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
```

Verify which middleware is currently active:
```bash
echo $RMW_IMPLEMENTATION
```

---

## 5. Enterprise Fleets: The FastDDS Discovery Server

In enterprise warehouses with 50+ AMRs, UDP multicast can flood and crash corporate Wi-Fi access points. To solve this, ROS 2 supports a **Discovery Server** where nodes connect directly to a designated static IP address using unicast.

![FastDDS Discovery Server Architecture](../assets/images/fastdds_discovery_server.svg)

### Starting a Discovery Server:
```bash
fastdds discovery -i 0 -l 192.168.1.100 -p 11811
```

### Directing Nodes to Use the Discovery Server:
```bash
export ROS_DISCOVERY_SERVER="192.168.1.100:11811"
ros2 run navpro_basics publisher_explained
```

---

## 6. Multi-Robot Collaboration via Namespacing

When running multiple robots that share a fleet coordinator on the same `ROS_DOMAIN_ID`, wrap each robot in a unique **Namespace**:

### Robot Alpha Launch:
```bash
ros2 launch navpro_gazebo sim_world.launch.py robot_ns:=amr_01
```
*Creates topics:* `/amr_01/cmd_vel`, `/amr_01/odom`, `/amr_01/scan`.

### Robot Bravo Launch:
```bash
ros2 launch navpro_gazebo sim_world.launch.py robot_ns:=amr_02
```
*Creates topics:* `/amr_02/cmd_vel`, `/amr_02/odom`, `/amr_02/scan`.

The central fleet server subscribes to `/amr_01/odom` and `/amr_02/odom` simultaneously without topic collision!

---

## 7. Hands-on Student Challenge

**Task:**
1. Open two terminals.
2. In Terminal 1, set `export ROS_DOMAIN_ID=10` and start `publisher_explained`.
3. In Terminal 2, set `export ROS_DOMAIN_ID=20` and run `ros2 topic list`.
4. Verify that Terminal 2 cannot see `/cmd_vel`!
5. In Terminal 2, change to `export ROS_DOMAIN_ID=10` and verify that `/cmd_vel` appears immediately.
