#!/usr/bin/env python3
"""
================================================================================
Nexus AMR Learning Hub - Level 1: Module 3 / Lesson 14 Task
Package: nexus_amr_basics
Task:    m04_l19_01_task_costmap_validator.py (alias: task_costmap_validator)
================================================================================

EXERCISE OVERVIEW:
------------------
Your mission is to construct a Costmap 2D Safety & Inflation Validator node that
subscribes to `/global_costmap/costmap` and audits free space vs inflation buffer.

OBJECTIVES:
-----------
1. TODO 1: Create a subscription to `/global_costmap/costmap` (nav_msgs/msg/OccupancyGrid).
2. TODO 2: In callback, parse metadata: width, height, resolution, and total cell count.
3. TODO 3: Count cell classifications:
   - Free cells: cost == 0
   - Lethal obstacle cells: cost >= 100
   - Inflation danger cells: 0 < cost < 100
4. TODO 4: Log safety metrics and obstacle occupancy percentage.
================================================================================
"""

import rclpy
from rclpy.node import Node
from rclpy.executors import ExternalShutdownException
from nav_msgs.msg import OccupancyGrid


class CostmapValidatorNode(Node):

    def __init__(self):
        super().__init__('costmap_validator_node')

        # ======================================================================
        # TODO 1: Subscribe to '/global_costmap/costmap'
        # - Hint: Call self.create_subscription() for OccupancyGrid messages from '/global_costmap/costmap'.
        # ======================================================================
        # ---> YOUR CODE HERE <---

        self.get_logger().info('CostmapValidatorNode listening to /global_costmap/costmap...')

    def costmap_callback(self, msg: OccupancyGrid):
        # ======================================================================
        # TODO 2: Extract grid dimensions
        # - Hint: Read the grid's metadata attributes from msg.info (width, height, and resolution).
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 3: Compute free vs lethal vs inflation count
        # - Hint: Inspect cell values in msg.data: count free cells (0), lethal obstacles (>= 100), and inflated cost zones (between 1 and 99).
        # ======================================================================
        # ---> YOUR CODE HERE <---

        # ======================================================================
        # TODO 4: Log metrics
        # ======================================================================
        # ---> YOUR CODE HERE <---
        pass


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
