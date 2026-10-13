#!/usr/bin/env python3
"""
NavPro Learning Hub - Level 1: Day 1
Explanation: Dynamic Parameters and Declarations in ROS 2
"""
import rclpy
from rclpy.node import Node
from rcl_interfaces.msg import ParameterDescriptor, ParameterType, SetParametersResult


class ParamExplainedNode(Node):
    """
    Demonstrates parameter declaration, validation, and dynamic updates
    via the on_set_parameters callback.
    """

    def __init__(self):
        super().__init__('param_explained_node')

        # Parameter 1: Simple string parameter
        self.declare_parameter(
            'robot_id',
            'navpro_01',
            ParameterDescriptor(description='Unique serial ID of the mobile robot')
        )

        # Parameter 2: Bounded integer parameter
        self.declare_parameter(
            'control_rate_hz',
            20,
            ParameterDescriptor(description='Control loop frequency in Hertz (1 to 100)')
        )

        # Parameter 3: Float threshold parameter
        self.declare_parameter(
            'obstacle_distance_threshold',
            0.45,
            ParameterDescriptor(description='Distance threshold in meters for obstacle brake')
        )

        self.robot_id = self.get_parameter('robot_id').value
        self.rate_hz = self.get_parameter('control_rate_hz').value
        self.obstacle_thresh = self.get_parameter('obstacle_distance_threshold').value

        # Register callback for dynamic runtime parameter changes (e.g. from ros2 param set)
        self.add_on_set_parameters_callback(self.parameter_update_callback)

        self.get_logger().info(
            f"Param Node Loaded | ID: {self.robot_id} | Rate: {self.rate_hz}Hz | Brake Dist: {self.obstacle_thresh}m"
        )

        # Timer loop to print status
        self.timer = self.create_timer(1.0 / self.rate_hz, self.loop_callback)
        self.loop_ticks = 0

    def parameter_update_callback(self, params):
        """Validates incoming parameter changes before applying."""
        for param in params:
            if param.name == 'control_rate_hz':
                if param.type_ != ParameterType.PARAMETER_INTEGER or param.value < 1 or param.value > 100:
                    return SetParametersResult(successful=False, reason="control_rate_hz must be integer between 1 and 100")
                self.rate_hz = param.value
                self.get_logger().info(f"Updated control_rate_hz to {self.rate_hz} Hz")

            elif param.name == 'obstacle_distance_threshold':
                if param.value <= 0.05:
                    return SetParametersResult(successful=False, reason="threshold must be > 0.05m")
                self.obstacle_thresh = float(param.value)
                self.get_logger().info(f"Updated obstacle_distance_threshold to {self.obstacle_thresh} m")

            elif param.name == 'robot_id':
                self.robot_id = str(param.value)
                self.get_logger().info(f"Updated robot_id to {self.robot_id}")

        return SetParametersResult(successful=True, reason="Parameters updated successfully")

    def loop_callback(self):
        self.loop_ticks += 1
        if self.loop_ticks % (self.rate_hz * 5) == 0:  # Print every 5 seconds
            self.get_logger().info(
                f"[Heartbeat] {self.robot_id}: threshold={self.obstacle_thresh}m, rate={self.rate_hz}Hz"
            )


def main(args=None):
    rclpy.init(args=args)
    node = ParamExplainedNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
