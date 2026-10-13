#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1
Explanation: Service Server & Parameter Management Node
"""
import rclpy
from rclpy.node import Node
from std_srvs.srv import SetBool, Trigger
from rcl_interfaces.msg import SetParametersResult


class ManagedRobotServiceNode(Node):

    def __init__(self):
        super().__init__('managed_robot_service_node')

        # Declare dynamic parameters
        self.declare_parameter('robot_name', 'NavPro-Mini')
        self.declare_parameter('max_speed', 0.5)
        self.declare_parameter('safety_margin', 0.35)

        # Retrieve parameters
        self.robot_name = self.get_parameter('robot_name').value
        self.max_speed = self.get_parameter('max_speed').value

        # Register parameter change callback
        self.add_on_set_parameters_callback(self.on_param_change)

        # Service servers
        self.toggle_srv = self.create_service(
            SetBool,
            '/robot/set_autonomous_mode',
            self.handle_set_mode
        )
        self.status_srv = self.create_service(
            Trigger,
            '/robot/get_status',
            self.handle_get_status
        )

        self.autonomous_active = False
        self.get_logger().info(f'Node initialized for {self.robot_name} with max_speed={self.max_speed}m/s')

    def on_param_change(self, params):
        for p in params:
            if p.name == 'max_speed':
                self.max_speed = p.value
                self.get_logger().info(f'Parameter max_speed updated to: {self.max_speed}')
        return SetParametersResult(successful=True)

    def handle_set_mode(self, request: SetBool.Request, response: SetBool.Response):
        self.autonomous_active = request.data
        response.success = True
        response.message = f"Autonomous mode {'ENABLED' if self.autonomous_active else 'DISABLED'}"
        self.get_logger().info(response.message)
        return response

    def handle_get_status(self, request: Trigger.Request, response: Trigger.Response):
        response.success = True
        response.message = f"Robot: {self.robot_name} | MaxSpeed: {self.max_speed} | Auto: {self.autonomous_active}"
        return response


def main(args=None):
    rclpy.init(args=args)
    node = ManagedRobotServiceNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
