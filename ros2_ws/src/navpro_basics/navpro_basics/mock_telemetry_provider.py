#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Companion Simulator Node
Package: navpro_basics
Module: mock_telemetry_provider.py

PURPOSE:
Provides simulated real-time robot hardware data for students testing their
subscribers, service clients, and controllers without needing the physical robot or Gazebo running.

TOPICS PUBLISHED:
- /battery_voltage    (std_msgs/msg/Float32)       at 1 Hz
- /battery_status     (sensor_msgs/msg/BatteryState) at 1 Hz
- /obstacle_distance  (std_msgs/msg/Float32)       at 5 Hz (oscillates 0.2m - 3.5m)
- /wheel_speeds       (geometry_msgs/msg/Vector3)  at 20 Hz (x=left, y=right, z=0)

SERVICES PROVIDED:
- /set_speed_mode         (std_srvs/srv/SetBool)
- /emergency_stop_reset   (std_srvs/srv/Trigger)
"""

import math
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
from geometry_msgs.msg import Vector3
from sensor_msgs.msg import BatteryState
from std_srvs.srv import SetBool, Trigger


class MockTelemetryProvider(Node):

    def __init__(self):
        super().__init__('mock_telemetry_provider')

        # 1. Publishers
        self.battery_volt_pub_ = self.create_publisher(Float32, '/battery_voltage', 10)
        self.battery_state_pub_ = self.create_publisher(BatteryState, '/battery_status', 10)
        self.obstacle_pub_ = self.create_publisher(Float32, '/obstacle_distance', 10)
        self.wheel_pub_ = self.create_publisher(Vector3, '/wheel_speeds', 10)

        # 2. Services
        self.speed_mode_srv_ = self.create_service(
            SetBool,
            '/set_speed_mode',
            self.handle_speed_mode
        )
        self.estop_reset_srv_ = self.create_service(
            Trigger,
            '/emergency_stop_reset',
            self.handle_estop_reset
        )

        # Simulation state
        self.sim_battery_pct = 95.0
        self.sim_voltage = 25.2
        self.tick_count = 0
        self.turbo_active = False

        # Timers
        self.create_timer(1.0, self.publish_battery)       # 1 Hz battery
        self.create_timer(0.2, self.publish_obstacle)      # 5 Hz obstacle sensor
        self.create_timer(0.05, self.publish_wheel_speeds) # 20 Hz wheel kinematics

        self.get_logger().info('====================================================')
        self.get_logger().info('  NavPro Mock Telemetry Provider is ACTIVE!        ')
        self.get_logger().info('  Streaming: /battery_voltage, /obstacle_distance  ')
        self.get_logger().info('  Services:  /set_speed_mode, /emergency_stop_reset')
        self.get_logger().info('====================================================')

    def publish_battery(self):
        # Slowly discharge battery
        self.sim_battery_pct = max(5.0, self.sim_battery_pct - 0.05)
        self.sim_voltage = 20.0 + (self.sim_battery_pct / 100.0) * 5.5

        # Float32 message
        v_msg = Float32()
        v_msg.data = round(self.sim_battery_pct, 1)
        self.battery_volt_pub_.publish(v_msg)

        # Full BatteryState message
        b_msg = BatteryState()
        b_msg.header.stamp = self.get_clock().now().to_msg()
        b_msg.voltage = float(self.sim_voltage)
        b_msg.percentage = float(self.sim_battery_pct / 100.0)
        b_msg.power_supply_status = BatteryState.POWER_SUPPLY_STATUS_DISCHARGING
        self.battery_state_pub_.publish(b_msg)

    def publish_obstacle(self):
        self.tick_count += 1
        # Oscillate obstacle distance between 0.25m and 3.5m using sine wave
        dist = 1.8 + 1.6 * math.sin(self.tick_count * 0.15)
        dist_msg = Float32()
        dist_msg.data = round(max(0.15, dist), 2)
        self.obstacle_pub_.publish(dist_msg)

    def publish_wheel_speeds(self):
        # Simulated left and right wheel encoder angular velocities
        w_msg = Vector3()
        base_speed = 3.5 if self.turbo_active else 2.0
        w_msg.x = base_speed + 0.1 * math.sin(self.tick_count * 0.2)   # left wheel rad/s
        w_msg.y = base_speed - 0.1 * math.cos(self.tick_count * 0.2)   # right wheel rad/s
        w_msg.z = 0.0
        self.wheel_pub_.publish(w_msg)

    def handle_speed_mode(self, request: SetBool.Request, response: SetBool.Response):
        self.turbo_active = request.data
        response.success = True
        mode_str = "TURBO (100% duty cycle)" if self.turbo_active else "ECO (50% duty cycle)"
        response.message = f"Simulated speed mode set to: {mode_str}"
        self.get_logger().info(f"[Service] {response.message}")
        return response

    def handle_estop_reset(self, request: Trigger.Request, response: Trigger.Response):
        response.success = True
        response.message = "Emergency stop latches cleared. Motors re-engaged."
        self.get_logger().info(f"[Service] {response.message}")
        return response


def main(args=None):
    rclpy.init(args=args)
    node = MockTelemetryProvider()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
