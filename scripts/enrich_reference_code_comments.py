#!/usr/bin/env python3
"""
Enrich Python reference and solution files in ros2_ws_reference with
comprehensive educational comments and robotics mission context.
"""

import os

BASE_DIR = 'ros2-navpro-tutorials-basic-amr/ros2_ws_reference/src/navpro_basics/navpro_basics'

FILES_TO_ENRICH = {
    'm01_l05_01_publisher_member_function.py': '''#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 1 / Lesson 05
Package: navpro_basics
Node:    UltrasonicSensorPublisher (talker / ultrasonic_sensor_node)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Simulates an Autonomous Mobile Robot (AMR) front ultrasonic proximity rangefinder.
In warehouse logistics, floor hazards (pallet corners, low-profile obstacles)
frequently sit below the 20 cm horizontal scanning plane of 2D LiDARs.
Ultrasonic sonar transducers mounted on the lower bumper emit high-frequency
acoustic pulses to detect obstacles directly in the wheel path.

This node publishes simulated distance telemetry (in meters) to topic:
    Topic: '/sensor/ultrasonic_front'
    Type:  std_msgs/msg/Float32
    Rate:  10 Hz (every 100 ms)

A smooth sinusoidal waveform simulates an obstacle approaching and receding:
    distance(t) = 1.5 + 1.2 * sin(0.5 * t)  -> ranges from 0.30 m to 2.70 m.
================================================================================
"""

import math
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32


class UltrasonicSensorPublisher(Node):
    """
    Ultrasonic Rangefinder Sensor Publisher Node.
    Broadcasts distance measurements periodically over the DDS middleware.
    """

    def __init__(self):
        # Step 1: Initialize base Node with unique name 'ultrasonic_sensor_node'
        # This identifier registers the node in the ROS 2 computational graph.
        super().__init__('ultrasonic_sensor_node')

        # Step 2: Create a Publisher endpoint
        # - Float32: The ROS 2 message type (single-precision 32-bit float)
        # - '/sensor/ultrasonic_front': The DDS topic name
        # - 10: QoS History Depth (buffers up to 10 samples during network stalls)
        self.publisher_ = self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)

        # Step 3: Configure a non-blocking software timer running at 10 Hz
        # 10 Hz = 0.100s period. Non-blocking timers allow rclpy to execute
        # other callbacks concurrently without freezing the thread.
        self.timer_period = 0.1  # seconds
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        # Step 4: Internal telemetry state tracking
        self.step_count = 0
        self.get_logger().info(
            'UltrasonicSensorPublisher initialized. Broadcasting distance telemetry to "/sensor/ultrasonic_front" at 10 Hz...'
        )

    def timer_callback(self):
        """
        Invoked periodically at 10 Hz by the ROS 2 SingleThreadedExecutor.
        Computes the current sensor reading, encapsulates it into Float32, and publishes.
        """
        # Calculate simulation time elapsed
        time_elapsed = self.step_count * self.timer_period

        # Compute smooth sinusoidal distance profile between 0.30 m and 2.70 m
        distance = 1.5 + 1.2 * math.sin(0.5 * time_elapsed)

        # Instantiate strongly-typed ROS 2 message
        msg = Float32()
        msg.data = round(distance, 2)

        # Serialize and broadcast over DDS transport
        self.publisher_.publish(msg)

        # Log operational warnings if obstacle enters critical safety buffer (< 0.50 m)
        if distance < 0.50:
            self.get_logger().warn(
                f'Ultrasonic reading: {msg.data:.2f} m -> [OBSTACLE WITHIN SAFETY BUFFER!]'
            )
        else:
            self.get_logger().info(
                f'Ultrasonic reading: {msg.data:.2f} m -> [PATH CLEAR]'
            )

        self.step_count += 1


def main(args=None):
    # Initialize the rclpy client library and underlying DDS transport layer
    rclpy.init(args=args)

    # Instantiate the node
    node = UltrasonicSensorPublisher()

    try:
        # Enter the event loop; blocks here dispatching timer callbacks
        rclpy.spin(node)
    except KeyboardInterrupt:
        # Graceful exit on Ctrl+C from terminal
        pass
    finally:
        # Destroy the node and unregister publisher from the DDS domain
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
''',

    'm01_l05_02_subscriber_member_function.py': '''#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 1 / Lesson 05
Package: navpro_basics
Node:    CollisionSafetySubscriber (listener / collision_monitor_node)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Acts as an onboard Autonomous Mobile Robot (AMR) Collision Safety Monitor.
Industrial safety directives (ISO 3691-4) require continuous evaluation of
proximity sensor telemetry to prevent collisions with humans or infrastructure.

This node subscribes to '/sensor/ultrasonic_front' carrying std_msgs/msg/Float32.
Upon receiving distance readings asynchronously via event-driven DDS callbacks:
- If distance < 0.50 m: Triggers high-priority safety alert (Emergency Deceleration).
- Else: Confirms nominal path clearance and authorizes continued transit.
================================================================================
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32


class CollisionSafetySubscriber(Node):
    """
    AMR Collision Safety Supervisor Node.
    Monitors ultrasonic proximity telemetry and enforces safety buffer.
    """

    def __init__(self):
        # Step 1: Initialize base Node with unique name 'collision_monitor_node'
        super().__init__('collision_monitor_node')

        # Step 2: Establish the physical safety threshold in meters
        # Obstacles closer than 50 cm trigger protective safety measures.
        self.safety_threshold_m = 0.50

        # Step 3: Create DDS Subscription
        # - Float32: Expected message schema
        # - '/sensor/ultrasonic_front': Target topic
        # - self.distance_callback: Bound method called when new packet arrives
        # - 10: QoS History depth
        self.subscription = self.create_subscription(
            Float32,
            '/sensor/ultrasonic_front',
            self.distance_callback,
            10
        )

        self.get_logger().info(
            f'CollisionSafetySubscriber initialized. Monitoring "/sensor/ultrasonic_front" (Threshold: {self.safety_threshold_m} m)...'
        )

    def distance_callback(self, msg: Float32):
        """
        Invoked asynchronously by the ROS 2 executor whenever a distance measurement
        packet arrives at the DDS DataReader socket.
        """
        distance = msg.data

        # Evaluate physical safety invariant
        if distance < self.safety_threshold_m:
            # Critical hazard: obstacle within safety envelope!
            self.get_logger().error(
                f'ALERT: Obstacle detected at {distance:.2f} m! Distance < {self.safety_threshold_m} m -> TRIGGERING EMERGENCY BRAKE!'
            )
        else:
            # Nominal path clearance: safe for autonomous locomotion
            self.get_logger().info(
                f'STATUS: Distance {distance:.2f} m >= {self.safety_threshold_m} m -> Nominal path clearance confirmed.'
            )


def main(args=None):
    # Initialize ROS 2 communications
    rclpy.init(args=args)

    # Instantiate the subscriber node
    node = CollisionSafetySubscriber()

    try:
        # Blocks in single-threaded event loop waiting for incoming DDS messages
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        # Clean teardown: unregister subscription endpoint from network graph
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
''',

    'm02_l08_01_service_member_function.py': '''#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 2 / Lesson 08
Package: navpro_basics
Node:    EmergencyStopServer (emergency_stop_server)
Service: /robot/emergency_stop (navpro_interfaces/srv/TriggerEmergencyStop)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Provides a mission-critical safety service for Autonomous Mobile Robots (AMRs).
Unlike fire-and-forget UDP topic messages, an emergency braking command requires
deterministic, guaranteed bidirectional acknowledgment before a supervisor can
declare the robot in a safe state (ISO 3691-4 industrial safety compliance).

When a supervisor or safety monitor requests an emergency stop:
1. It validates the safety request and diagnostic reason string.
2. It latches internal emergency stop state and cuts motor torque.
3. It replies with a confirmed status receipt and microsecond audit timestamp.
================================================================================
"""

import rclpy
from rclpy.node import Node
from navpro_interfaces.srv import TriggerEmergencyStop


class EmergencyStopServer(Node):
    """
    AMR Emergency Safety Brake Service Server Node.
    """

    def __init__(self):
        # Step 1: Initialize node identity
        super().__init__('emergency_stop_server')

        # Step 2: Internal hardware safety state machine
        # Latching ensures that once engaged, motion cannot resume without an explicit reset.
        self.emergency_stop_active = False

        # Step 3: Create ROS 2 Service Server
        # - TriggerEmergencyStop: Custom interface (.srv)
        # - '/robot/emergency_stop': Service name advertised over DDS
        # - self.handle_emergency_stop: Member callback handling client requests
        self.srv = self.create_service(
            TriggerEmergencyStop,
            '/robot/emergency_stop',
            self.handle_emergency_stop
        )

        self.get_logger().info(
            'EmergencyStopServer initialized. Ready to receive safety commands on "/robot/emergency_stop"...'
        )

    def handle_emergency_stop(self, request, response):
        """
        Executed synchronously by the ROS 2 executor whenever a client invokes this service.
        Arguments:
        - request: Input payload (contains request.emergency_stop_requested, request.reason)
        - response: Output payload to populate and return
        """
        # Capture precise epoch timestamp in seconds
        timestamp_sec = self.get_clock().now().nanoseconds * 1e-9

        if request.emergency_stop_requested:
            # ENGAGE EMERGENCY BRAKES
            self.emergency_stop_active = True
            response.success = True
            response.status_message = (
                f'EMERGENCY BRAKE ENGAGED: Actuators halted. Reason: "{request.reason}"'
            )
            response.stop_timestamp = float(round(timestamp_sec, 3))

            self.get_logger().error(
                f'[CRITICAL SAFETY EVENT] Emergency Stop ACTIVATED! Reason: {request.reason}'
            )
        else:
            # RESET SAFETY SYSTEM
            self.emergency_stop_active = False
            response.success = True
            response.status_message = 'SAFETY RESET: Actuator power restored. Drive authorized.'
            response.stop_timestamp = float(round(timestamp_sec, 3))

            self.get_logger().info(
                '[SAFETY STATUS] Emergency Stop CLEARED. Drive systems ready.'
            )

        # In ROS 2 service callbacks, ALWAYS return the populated response object
        return response


def main(args=None):
    rclpy.init(args=args)
    node = EmergencyStopServer()

    try:
        # Blocks in event loop, awaiting RPC service calls over DDS
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
''',

    'm02_l08_02_client_member_function.py': '''#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 2 / Lesson 08
Package: navpro_basics
Node:    EmergencyStopClient (emergency_stop_client)
Service: /robot/emergency_stop (navpro_interfaces/srv/TriggerEmergencyStop)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Demonstrates an asynchronous, non-blocking ROS 2 Service Client.
In real-time robotics, making a synchronous blocking service call (client.call())
inside a timer callback or subscriber callback causes an executor deadlock:
the thread freezes waiting for the response, which prevents the executor from
processing incoming sensor data or servicing other callbacks!

This client uses call_async() to dispatch the emergency stop request non-blockingly,
yielding control back to the event loop via Python Futures.
================================================================================
"""

import sys
import rclpy
from rclpy.node import Node
from navpro_interfaces.srv import TriggerEmergencyStop


class EmergencyStopClient(Node):
    """
    AMR Emergency Safety Brake Service Client Node.
    """

    def __init__(self):
        super().__init__('emergency_stop_client')

        # Step 1: Create Service Client for '/robot/emergency_stop'
        self.client = self.create_client(
            TriggerEmergencyStop,
            '/robot/emergency_stop'
        )

        # Step 2: Liveness verification with timeout
        # Polls DDS discovery every 1.0s to confirm server node is alive
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service "/robot/emergency_stop" not available, waiting...')

        self.get_logger().info('EmergencyStopClient connected to safety service.')

    def send_emergency_stop_request(self, stop_requested: bool, reason: str):
        """
        Dispatches a non-blocking asynchronous service request.
        Returns a rclpy.task.Future object.
        """
        # Step 3: Instantiate and populate strongly-typed request struct
        request = TriggerEmergencyStop.Request()
        request.emergency_stop_requested = stop_requested
        request.reason = reason

        self.get_logger().info(
            f'Dispatching Emergency Stop Request: stop={stop_requested}, reason="{reason}"'
        )

        # Step 4: Asynchronous dispatch over DDS (returns immediately)
        self.future = self.client.call_async(request)
        return self.future


def main(args=None):
    rclpy.init(args=args)
    client_node = EmergencyStopClient()

    # Determine reason from CLI arguments or use standard default
    stop_reason = "Obstacle detected within 0.35m critical safety envelope"
    if len(sys.argv) > 1:
        stop_reason = " ".join(sys.argv[1:])

    # Dispatch asynchronous request
    future = client_node.send_emergency_stop_request(True, stop_reason)

    # Step 5: Spin the executor until the response future completes
    rclpy.spin_until_future_complete(client_node, future)

    # Step 6: Validate result
    if future.result() is not None:
        response = future.result()
        client_node.get_logger().info(
            f'SAFETY RESPONSE RECEIVED:\n'
            f'  Success: {response.success}\n'
            f'  Status:  {response.status_message}\n'
            f'  Time:    {response.stop_timestamp:.3f} s'
        )
    else:
        client_node.get_logger().error(f'Service call failed: {future.exception()}')

    client_node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
''',

    'm02_l08_solution_service_calculator.py': '''#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 2 / Lesson 08 Solution
Package: navpro_basics
Task:    m02_l08_solution_service_calculator.py (alias: solution_speed_mode_server)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Reference Solution: AMR Operational Speed Mode & Zone Dispatch Service Server.
Autonomous Mobile Robots operate at variable velocity profiles depending on zone:
- 'TURBO'  -> 1.00 (100% speed, high-clearance express transit corridors)
- 'NORMAL' -> 0.70 (70% speed, standard production aisles)
- 'ECO'    -> 0.35 (35% speed, high-pedestrian or battery conservation zones)
- 'CUSTOM' -> User-specified floating-point scale clamped between [0.10, 1.00]

This server validates incoming requests defensively and replies with confirmed scale.
================================================================================
"""

import rclpy
from rclpy.node import Node
from navpro_interfaces.srv import SetSpeedMode


class SpeedModeSolutionServer(Node):
    """
    Reference Solution: AMR Speed Mode Configuration Server
    """

    def __init__(self):
        super().__init__('speed_mode_server')

        # Internal state machine: defaults to 70% normal operation
        self.current_scale = 0.70
        self.active_mode = 'NORMAL'

        # Create Service Server on '/amr/set_speed_mode'
        self.srv = self.create_service(
            SetSpeedMode,
            '/amr/set_speed_mode',
            self.handle_speed_mode
        )

        self.get_logger().info('SpeedModeSolutionServer active on /amr/set_speed_mode.')

    def handle_speed_mode(self, request, response):
        """
        Processes zone dispatch requests and adjusts vehicle speed governors.
        """
        # Sanitize incoming string: uppercase and strip whitespace
        mode = request.mode_name.upper().strip()

        # Evaluate requested mode against permitted envelopes
        if mode == 'TURBO':
            scale = 1.00
        elif mode == 'NORMAL':
            scale = 0.70
        elif mode == 'ECO':
            scale = 0.35
        elif mode == 'CUSTOM':
            # Defensively clamp custom scale between 10% and 100%
            scale = max(0.10, min(1.00, float(request.custom_scale)))
        else:
            # Reject invalid mode without crashing the node
            response.success = False
            response.effective_scale = self.current_scale
            response.message = f"Invalid mode '{mode}'. Permitted: TURBO, NORMAL, ECO, CUSTOM"
            self.get_logger().warn(f'[REJECTED] {response.message}')
            return response

        # Latch validated speed state
        self.current_scale = scale
        self.active_mode = mode

        # Formulate confirmed response
        response.success = True
        response.effective_scale = float(scale)
        response.message = f"Speed mode '{mode}' applied successfully (scale: {scale * 100:.0f}%)."

        self.get_logger().info(f'[SPEED MODE] {response.message}')
        return response


def main(args=None):
    rclpy.init(args=args)
    node = SpeedModeSolutionServer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
''',

    'm02_l12_02_solution_navigate_distance_server.py': '''#!/usr/bin/env python3
"""
================================================================================
NavPro Learning Hub - Level 1: Module 2 / Lesson 11 Solution
Package: navpro_basics
Task:    m02_l12_02_solution_fibonacci_action_server.py (alias: solution_navigate_action)
================================================================================

ROBOTICS OPERATIONAL MISSION:
-----------------------------
Reference Solution: AMR Linear Traversal Navigation Action Server.
Handles long-running distance navigation goals with continuous feedback streaming
and preemption/cancelation support using `navpro_interfaces/action/NavigateDistance`.

3-Part Action Lifecycle Implemented:
1. Goal Validation: Rejects non-positive distances or speeds.
2. Cancelation Audit: Honors client abort commands instantly during execution.
3. Iterative Feedback: Streams progress percentage and distance remaining at 10 Hz.
================================================================================
"""

import time
import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from navpro_interfaces.action import NavigateDistance


class NavigateDistanceSolutionServer(Node):
    """
    Reference Solution: AMR Linear Navigation Action Server
    """

    def __init__(self):
        super().__init__('navigate_distance_server')

        # Initialize the Action Server with 3 lifecycle callbacks
        self._action_server = ActionServer(
            self,
            NavigateDistance,
            '/navigate_distance',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )

        self.get_logger().info('NavigateDistanceSolutionServer active on /navigate_distance.')

    def goal_callback(self, goal_request):
        """
        Step 1: Goal Acceptance Policy.
        Validates target parameters before allocating execution resources.
        """
        if goal_request.target_distance_m <= 0.0 or goal_request.max_speed_mps <= 0.0:
            self.get_logger().warn(
                f'Rejecting goal: target_distance={goal_request.target_distance_m}, speed={goal_request.max_speed_mps}'
            )
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        """
        Step 2: Preemption & Cancelation Policy.
        Allows clients or fleet supervisors to abort the navigation traversal midway.
        """
        self.get_logger().warn('Received client request to CANCEL active navigation traversal.')
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        """
        Step 3: Execution Loop.
        Iteratively simulates motion, streams feedback, audits cancelation, and returns result.
        """
        target = goal_handle.request.target_distance_m
        speed = min(2.0, max(0.1, goal_handle.request.max_speed_mps))

        feedback_msg = NavigateDistance.Feedback()
        distance_travelled = 0.0
        dt = 0.1  # 10 Hz feedback loop

        while distance_travelled < target:
            # Check for client cancelation request
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                result = NavigateDistance.Result()
                result.reached_target = False
                result.actual_distance_travelled_m = float(round(distance_travelled, 3))
                result.status_message = 'Navigation preempted by cancel request.'
                self.get_logger().warn(f'[ABORTED] {result.status_message}')
                return result

            # Simulate incremental linear travel step
            step = speed * dt
            distance_travelled = min(target, distance_travelled + step)

            # Populate feedback telemetry
            feedback_msg.distance_remaining_m = float(round(target - distance_travelled, 3))
            feedback_msg.current_speed_mps = float(round(speed, 2))
            feedback_msg.percent_complete = float(round((distance_travelled / target) * 100.0, 1))

            # Stream feedback packet over DDS
            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info(
                f'[TRAVERSAL FEEDBACK] Progress: {feedback_msg.percent_complete:5.1f}% | Rem: {feedback_msg.distance_remaining_m:5.2f} m'
            )

            time.sleep(dt)

        # Transition goal state machine to STATUS_SUCCEEDED
        goal_handle.succeed()

        # Return terminal result payload
        result = NavigateDistance.Result()
        result.reached_target = True
        result.actual_distance_travelled_m = float(round(distance_travelled, 3))
        result.status_message = f'Target distance of {target:.2f} m reached successfully.'
        self.get_logger().info(f'[SUCCEEDED] {result.status_message}')
        return result


def main(args=None):
    rclpy.init(args=args)
    node = NavigateDistanceSolutionServer()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
'''
}

def main():
    for filename, content in FILES_TO_ENRICH.items():
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated reference file: {filename}")
        else:
            print(f"File not found: {filepath}")

if __name__ == '__main__':
    main()
