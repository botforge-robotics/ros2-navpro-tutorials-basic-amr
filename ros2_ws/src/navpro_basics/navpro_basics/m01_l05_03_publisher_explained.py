#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Foundations of ROS 2
Package: navpro_basics
Node:    publisher_explained.py
================================================================================

WHAT THIS NODE DOES:
--------------------
This is an educational reference implementation of a standard ROS 2 Velocity
Publisher. It periodically creates and publishes velocity setpoint messages
(`geometry_msgs/msg/Twist`) to the standard robot velocity topic (`/cmd_vel`).

ROBOTICS CONCEPTS TAUGHT HERE:
------------------------------
1. Node Inheritance: Creating a custom class inheriting from `rclpy.node.Node`.
2. ROS 2 Timer Loops: Scheduling non-blocking periodic callbacks using timers
   instead of blocking Python `time.sleep()`.
3. Standard Geometry Messages: Constructing a `Twist` message representing 3D
   linear velocity (m/s) and angular velocity (rad/s). For ground differential
   drive robots, only `linear.x` (forward/backward) and `angular.z` (yaw rotation)
   are non-zero.
4. Clean Lifecycle: Graceful shutdown and signal handling (SIGINT / Ctrl+C).
================================================================================
"""

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist


class SimpleVelocityPublisher(Node):
    """
    Publishes simulated motion commands to the `/cmd_vel` topic at a fixed rate of 10 Hz.
    """

    def __init__(self):
        # Initialize the base class with the unique ROS 2 node name.
        # This name will appear when running `ros2 node list`.
        super().__init__('simple_velocity_publisher')

        # ----------------------------------------------------------------------
        # 1. CREATE PUBLISHER
        # ----------------------------------------------------------------------
        # create_publisher(MessageType, TopicName, QoS_Depth_or_Profile)
        # - MessageType: geometry_msgs.msg.Twist (linear & angular 3D vectors)
        # - TopicName: '/cmd_vel' (the standard ROS 2 topic for robot base locomotion)
        # - QoS Depth: 10 (maintains a queue of up to 10 unread messages in memory)
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)

        # ----------------------------------------------------------------------
        # 2. CREATE PERIODIC TIMER
        # ----------------------------------------------------------------------
        # In ROS 2, NEVER use `while True: time.sleep()` because it freezes the
        # thread and prevents DDS event callbacks from processing.
        # Instead, create_timer runs asynchronously within the ROS 2 executor loop.
        # Period = 0.1 seconds -> 1.0 / 0.1 = 10 Hz publishing frequency.
        timer_period = 0.1  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

        # Heartbeat tick counter used to throttle console logs
        self.count = 0

        # ROS 2 Logger: prints timestamped, node-tagged status messages to stdout
        self.get_logger().info('Velocity publisher node initialized. Streaming /cmd_vel at 10 Hz...')

    def timer_callback(self):
        """
        Executed automatically every 100 milliseconds by the ROS 2 single-threaded executor.
        Constructs a Twist message, populates the motion setpoints, and publishes it.
        """
        # Create an empty Twist message instance
        msg = Twist()

        # ----------------------------------------------------------------------
        # DIFFERENTIAL DRIVE KINEMATIC SETPOINTS:
        # ----------------------------------------------------------------------
        # linear.x: Forward (+) or Backward (-) translation along the robot X-axis (m/s)
        msg.linear.x = 0.2     # Move forward at 0.20 meters/second

        # linear.y: Lateral translation (strafing). differential drive AMRs cannot strafe (0.0)
        msg.linear.y = 0.0

        # linear.z: Vertical translation (flying/subsea). Ground robots do not fly (0.0)
        msg.linear.z = 0.0

        # angular.x & angular.y: Roll & Pitch rotations. Ground AMRs stay on the floor (0.0)
        msg.angular.x = 0.0
        msg.angular.y = 0.0

        # angular.z: Yaw rotation around Z-axis in radians/sec (+ = Counter-Clockwise, - = Clockwise)
        msg.angular.z = 0.1    # Curve gently CCW at 0.10 radians/second

        # Push the serialized message onto the DDS middleware bus
        self.publisher_.publish(msg)

        # Increment tick count and log every 20 ticks (every 2.0 seconds) to avoid console clutter
        self.count += 1
        if self.count % 20 == 0:
            self.get_logger().info(
                f'Published /cmd_vel -> Linear: {msg.linear.x:.2f} m/s | Angular: {msg.angular.z:.2f} rad/s'
            )


def main(args=None):
    """
    Standard ROS 2 Python entry point.
    Handles middleware initialization, executor spinning, and safe cleanup.
    """
    # 1. Initialize the ROS 2 communications middleware for this process
    rclpy.init(args=args)

    # 2. Instantiate our custom Node subclass
    node = SimpleVelocityPublisher()

    # 3. Enter the blocking spin loop:
    # `spin()` checks DDS queues, fires timer callbacks, and handles incoming events
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        # Gracefully catch Ctrl+C pressed by the user in the terminal
        node.get_logger().info('KeyboardInterrupt received. Shutting down node cleanly...')
    finally:
        # 4. Clean destruction of node resources and middleware context
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
