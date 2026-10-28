#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 1 / Lesson 05 Task 1
Package: nexus_amr_basics
Task:    m01_l05_task_custom_pubsub.py (alias: task_custom_pubsub)
================================================================================

EXERCISE OVERVIEW:
------------------
Your goal is to build your very first ROS 2 Publisher and Subscriber node
using the standard ROS 2 `std_msgs/msg/String` message type.

OBJECTIVES:
-----------
1. Initialize the node with name 'beginner_pubsub_task'.
2. Create a Publisher on topic '/chatter' with queue depth 10.
3. Create a periodic timer running every 1.0 second (1 Hz).
4. In the timer callback:
   - Increment self.count by 1
   - Create a String message: "Robot ping: <count>"
   - Publish the message to '/chatter'
   - Log the message using self.get_logger().info(...)
5. Create a Subscription to '/chatter' that listens for incoming String messages.
6. In the subscriber listener callback:
   - Log 'Received ping: "<msg.data>"'
================================================================================
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class BeginnerPubSubNode(Node):
    """
    Student Starter Template: Beginner Publisher & Subscriber
    """

    def __init__(self):
        super().__init__('beginner_pubsub_task')
        self.get_logger().info('Initializing BeginnerPubSubNode...')

        # Internal message counter
        self.count = 0

        # ----------------------------------------------------------------------
        # TODO 1: Create a Publisher on topic '/chatter'
        # Message Type: String
        # Queue Depth:  10
        # Hint: Call self.create_publisher() with message type, topic name, and QoS depth.
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        self.publisher_ = None

        # ----------------------------------------------------------------------
        # TODO 2: Create a periodic 1.0 second timer
        # Callback: self.timer_callback
        # Hint: Call self.create_timer() specifying period and timer callback.
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        self.timer_ = None

        # ----------------------------------------------------------------------
        # TODO 3: Create a Subscription to topic '/chatter'
        # Message Type: String
        # Callback:     self.listener_callback
        # Queue Depth:  10
        # Hint: Call self.create_subscription() specifying message type, topic name, callback, and QoS depth.
        # ----------------------------------------------------------------------
        # TODO: STUDENT CODE HERE
        self.subscription_ = None

    def timer_callback(self):
        """
        TODO 4: Timer Publishing Callback
        ---------------------------------
        1. Increment self.count by 1
        2. Create an instance of String()
        3. Assign formatted text containing the ping count to msg.data
        4. Call publish() on your publisher handle
        5. Log message content via self.get_logger().info()
        """
        # TODO: STUDENT CODE HERE
        pass

    def listener_callback(self, msg: String):
        """
        TODO 5: Subscription Listener Callback
        --------------------------------------
        1. Log the incoming message to console:
           self.get_logger().info(f'Received ping: "{msg.data}"')
        """
        # TODO: STUDENT CODE HERE
        pass


def main(args=None):
    rclpy.init(args=args)
    node = BeginnerPubSubNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
