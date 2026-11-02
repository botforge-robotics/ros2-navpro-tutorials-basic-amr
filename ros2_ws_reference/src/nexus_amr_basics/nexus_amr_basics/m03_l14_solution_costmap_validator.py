#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 14 Solution
Package: nexus_amr_basics
Task:    m04_l19_02_solution_costmap_validator.py (alias: costmap_validator)
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from nav_msgs.msg import OccupancyGrid


class CostmapValidatorNode(Node):

    def __init__(self):
        super().__init__('costmap_validator_node')

        # Step 1: Subscribe to global costmap
        self.costmap_sub = self.create_subscription(
            OccupancyGrid,
            '/global_costmap/costmap',
            self.costmap_callback,
            10
        )
        self.get_logger().info('CostmapValidatorNode listening to /global_costmap/costmap...')

    def costmap_callback(self, msg: OccupancyGrid):
        # Step 2: Extract metadata
        w = msg.info.width
        h = msg.info.height
        res = msg.info.resolution
        total_cells = w * h

        # Step 3: Classify cells
        data = list(msg.data)
        free_cells = data.count(0)
        unknown_cells = data.count(-1)
        lethal_cells = sum(1 for c in data if c >= 100)
        inflation_cells = sum(1 for c in data if 0 < c < 100)

        # Step 4: Emit safety report
        pct_free = (free_cells / total_cells) * 100.0 if total_cells else 0.0
        pct_lethal = (lethal_cells / total_cells) * 100.0 if total_cells else 0.0

        self.get_logger().info(
            f'[COSTMAP AUDIT] Grid: {w}x{h} ({res:.3f}m/cell) | Free: {pct_free:.1f}% | '
            f'Lethal: {pct_lethal:.1f}% ({lethal_cells} cells) | Inflation Buffer: {inflation_cells} cells'
        )


def main(args=None):
    rclpy.init(args=args)
    node = CostmapValidatorNode()

    try:
        rclpy.spin(node)
    except (KeyboardInterrupt, ExternalShutdownException):
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
