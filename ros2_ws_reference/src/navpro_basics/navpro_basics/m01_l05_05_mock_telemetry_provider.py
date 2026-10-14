#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Companion Simulator Node
Package: navpro_basics
Module:  mock_telemetry_provider.py
================================================================================

PURPOSE & DESIGN:
-----------------
This companion simulator node provides simulated real-time robot hardware telemetry
and services. Students can test their subscribers, service clients, and supervisors
immediately without needing physical AMR hardware or heavy 3D Gazebo simulation.

TOPICS PUBLISHED:
-----------------
1. `/battery_voltage`     (std_msgs/msg/Float32)         at 1 Hz   (Discharge curve: 95% -> 5%)
2. `/battery_status`      (sensor_msgs/msg/BatteryState) at 1 Hz   (Full standard battery telemetry)
3. `/obstacle_distance`   (std_msgs/msg/Float32)         at 5 Hz   (Simulates sonar/lidar range 0.2m..3.5m)
4. `/wheel_speeds`        (geometry_msgs/msg/Vector3)    at 20 Hz  (x=left rad/s, y=right rad/s)

SERVICES PROVIDED:
------------------
1. `/set_speed_mode`        (std_srvs/srv/SetBool) : Toggles Turbo / Eco power profile
2. `/emergency_stop_reset`  (std_srvs/srv/Trigger) : Clears safety e-stop latches
================================================================================
"""

import math
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
from geometry_msgs.msg import Vector3
from sensor_msgs.msg import BatteryState
from std_srvs.srv import SetBool, Trigger


class MockTelemetryProvider(Node):
    """
    Simulates physical AMR sensors and actuators for software-in-the-loop (SIL) testing.
    """

    def __init__(self):
        super().__init__('mock_telemetry_provider')

        # ----------------------------------------------------------------------
        # 1. PUBLISHERS FOR SENSOR FEEDS
        # ----------------------------------------------------------------------
        # Battery percentage (simple Float32 for beginner exercises)
        self.battery_volt_pub_ = self.create_publisher(Float32, '/battery_voltage', 10)

        # Full ROS 2 Standard Battery State (with voltage, status, health flags)
        self.battery_state_pub_ = self.create_publisher(BatteryState, '/battery_status', 10)

        # Simulated ultrasonic/laser distance sensor to nearest obstacle
        self.obstacle_pub_ = self.create_publisher(Float32, '/obstacle_distance', 10)

        # Wheel angular velocity feedback from motor encoders (rad/s)
        self.wheel_pub_ = self.create_publisher(Vector3, '/wheel_speeds', 10)

        # ----------------------------------------------------------------------
        # 2. SERVICES FOR HARDWARE CONTROL
        # ----------------------------------------------------------------------
        # Toggles power profile between Eco and Turbo mode
        self.speed_mode_srv_ = self.create_service(
            SetBool,
            '/set_speed_mode',
            self.handle_speed_mode
        )

        # Clears hardware emergency stop latches
        self.estop_reset_srv_ = self.create_service(
            Trigger,
            '/emergency_stop_reset',
            self.handle_estop_reset
        )

        # ----------------------------------------------------------------------
        # 3. INTERNAL SIMULATION STATE VARIABLES
        # ----------------------------------------------------------------------
        self.sim_battery_pct = 95.0      # Starts at 95% state-of-charge
        self.sim_voltage = 25.2          # 6S LiPo nominal pack voltage (25.2V max)
        self.tick_count = 0              # Time index for waveform generation
        self.turbo_active = False        # False = ECO (reduced speed), True = TURBO

        # ----------------------------------------------------------------------
        # 4. TIMERS MATCHING REALISTIC HARDWARE REFRESH RATES
        # ----------------------------------------------------------------------
        # Battery monitoring is slow: 1.0 s period = 1 Hz
        self.create_timer(1.0, self.publish_battery)

        # Proximity sensor updates medium rate: 0.2 s period = 5 Hz
        self.create_timer(0.2, self.publish_obstacle)

        # Motor encoder feedback runs fast: 0.05 s period = 20 Hz
        self.create_timer(0.05, self.publish_wheel_speeds)

        self.get_logger().info('====================================================')
        self.get_logger().info('  NavPro Mock Telemetry Provider is ACTIVE!        ')
        self.get_logger().info('  Streaming: /battery_voltage, /obstacle_distance  ')
        self.get_logger().info('  Services:  /set_speed_mode, /emergency_stop_reset')
        self.get_logger().info('====================================================')

    def publish_battery(self):
        """
        Simulates battery discharge over time and publishes both Float32 and BatteryState.
        """
        # Gradually discharge battery by 0.05% every second (clamps at 5%)
        self.sim_battery_pct = max(5.0, self.sim_battery_pct - 0.05)
        # Calculate terminal voltage: 20.0V (flat) to 25.2V (fully charged)
        self.sim_voltage = 20.0 + (self.sim_battery_pct / 100.0) * 5.2

        # 1. Publish simple Float32 percentage
        v_msg = Float32()
        v_msg.data = round(self.sim_battery_pct, 1)
        self.battery_volt_pub_.publish(v_msg)

        # 2. Publish standard ROS 2 BatteryState message
        b_msg = BatteryState()
        b_msg.header.stamp = self.get_clock().now().to_msg()
        b_msg.voltage = float(self.sim_voltage)
        b_msg.percentage = float(self.sim_battery_pct / 100.0)
        b_msg.power_supply_status = BatteryState.POWER_SUPPLY_STATUS_DISCHARGING
        self.battery_state_pub_.publish(b_msg)

    def publish_obstacle(self):
        """
        Simulates dynamic obstacle distance using a continuous sinusoidal oscillation.
        """
        self.tick_count += 1
        # Oscillate distance between 0.20m and 3.4m using sin(0.15 * t)
        dist = 1.8 + 1.6 * math.sin(self.tick_count * 0.15)
        dist_msg = Float32()
        dist_msg.data = round(max(0.15, dist), 2)
        self.obstacle_pub_.publish(dist_msg)

    def publish_wheel_speeds(self):
        """
        Simulates left and right wheel encoder angular velocities in radians/second.
        """
        w_msg = Vector3()
        # Turbo mode spins wheels faster
        base_speed = 3.5 if self.turbo_active else 2.0
        # Add slight natural motor ripple
        w_msg.x = base_speed + 0.1 * math.sin(self.tick_count * 0.2)   # Left wheel speed (rad/s)
        w_msg.y = base_speed - 0.1 * math.cos(self.tick_count * 0.2)   # Right wheel speed (rad/s)
        w_msg.z = 0.0                                                  # Unused (planar motion)
        self.wheel_pub_.publish(w_msg)

    def handle_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        """
        Enables or disables simulated Turbo mode based on request.data.
        """
        self.turbo_active = request.data
        response.success = True
        mode_str = "TURBO (100% duty cycle)" if self.turbo_active else "ECO (50% duty cycle)"
        response.message = f"Simulated speed mode set to: {mode_str}"
        self.get_logger().info(f"[Service Call] {response.message}")
        return response

    def handle_estop_reset(self, request: Trigger.Request, response: Trigger.Response):
        """
        Clears emergency stop status.
        """
        response.success = True
        response.message = "Emergency stop latches cleared. Motors re-engaged."
        self.get_logger().info(f"[Service Call] {response.message}")
        return response


def main(args=None):
    """
    Node lifecycle entry point.
    """
    rclpy.init(args=args)
    node = MockTelemetryProvider()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('KeyboardInterrupt received. Shutting down telemetry provider...')
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
