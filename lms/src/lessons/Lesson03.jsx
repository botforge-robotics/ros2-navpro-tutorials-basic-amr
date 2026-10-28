import React from 'react';
import {
  TerminalBlock,
  OutputBlock,
  Callout,
  Section,
  SubSection,
  LearningObjectives,
  SummaryTable
} from '../components/lesson-blocks';
import { TurtlesimTeleopFlow } from '../components/TurtlesimTeleopFlow';

export function Lesson03() {
  const learningOutcomes = [
    <>Launch and interact with simulated robotic nodes using <code className="inline-code">ros2 run</code>.</>,
    <>Visualize the live peer-to-peer DDS computational graph with <code className="inline-code">rqt_graph</code>.</>,
    <>Inspect active nodes in the computation graph using <code className="inline-code">ros2 node list</code> and <code className="inline-code">ros2 node info</code>.</>,
    <>Monitor data streams using <code className="inline-code">ros2 topic list</code>, <code className="inline-code">ros2 topic echo</code>, and <code className="inline-code">ros2 topic hz</code>.</>,
    <>Deconstruct interface definitions with <code className="inline-code">ros2 topic type</code> and <code className="inline-code">ros2 interface show</code>.</>,
    <>Manually steer the robot by injecting velocity commands with <code className="inline-code">ros2 topic pub</code>.</>,
    <>Perform runtime parameter tuning, dynamic pen configuration, and emergency braking.</>
  ];

  return (
    <article className="markdown-body lesson-body-content lesson-03-react">
      {/* Learning Objectives Card */}
      <LearningObjectives outcomes={learningOutcomes} />

      {/* Section 1: Overview */}
      <Section id="1-overview-learning-objectives" title="1. Overview & Learning Objectives">
        <p>
          Before writing code from scratch, professional robotics engineers first master live runtime introspection tools. 
          In this lesson, you will interact with <strong>Turtlesim</strong>—the canonical robotics simulation sandbox built into ROS 2—and drive a simulated robot purely from the terminal while introspecting its underlying computational graph.
        </p>
      </Section>

      {/* Section 2: Launching Turtlesim */}
      <Section id="2-launching-turtlesim-the-simulation-playground" title="2. Launching Turtlesim: The Simulation Playground">
        <p>
          Turtlesim provides a visual 2D simulation canvas representing a differential-drive robot (<code className="inline-code">/turtle1</code>). 
          It exposes topics for velocity control, pose telemetry, color sensor feeds, and services for resets and pen drawing.
        </p>
        
        <p><strong>Terminal 1: Launch Turtlesim Simulation Canvas Node</strong></p>
        <TerminalBlock terminal="Terminal 1" language="bash">
          ros2 run turtlesim turtlesim_node
        </TerminalBlock>

        <p>
          A blue graphic window will appear displaying a small turtle sitting at the center of a coordinate grid (x = 5.54, y = 5.54, &theta; = 0.0 rad).
        </p>

        <p className="lesson-image-wrapper">
          <img 
            src="assets/images/turtlesim_simulation_canvas.png" 
            alt="Turtlesim 2D Graphic Simulation Canvas" 
            title="Turtlesim Simulation Window with live turtle graphic (/turtle1)" 
            className="lesson-image" 
            loading="lazy" 
            style={{ maxHeight: '380px', objectFit: 'contain' }}
          />
        </p>

        <p><strong>Terminal 2: Launch Keyboard Teleoperation Node</strong></p>
        <TerminalBlock terminal="Terminal 2" language="bash">
          ros2 run turtlesim turtle_teleop_key
        </TerminalBlock>

        <p>
          With the second terminal focused, press the arrow keys. You will see the turtle drive, turn, and draw an ink trail across the canvas.
        </p>

        <p className="lesson-image-wrapper">
          <img 
            src="assets/images/turtle_teleop_key_running.png" 
            alt="Turtle Teleop Key Running in Terminal" 
            title="Keyboard Teleoperation Node (turtle_teleop_key) reading arrow keys" 
            className="lesson-image" 
            loading="lazy" 
            style={{ maxHeight: '320px', objectFit: 'contain' }}
          />
        </p>

        {/* First-class Native React Animation - NO PORTALS! */}
        <TurtlesimTeleopFlow />
      </Section>

      {/* Section 3: Visualizing rqt_graph */}
      <Section id="3-visualizing-the-computational-graph-rqt_graph" title="3. Visualizing the Computational Graph (rqt_graph)">
        <p>
          Now that you have seen the conceptual peer-to-peer data flow in the simulation above, let's verify it in real time! 
          ROS 2 provides an interactive GUI tool called <code className="inline-code">rqt_graph</code> that introspects the active DDS middleware network and renders the live computational graph.
        </p>
        <p>In a new terminal window, launch <code className="inline-code">rqt_graph</code> (you can run either command):</p>

        <p><strong>Terminal 3: Launch Computational Graph Visualizer</strong></p>
        <TerminalBlock terminal="Terminal 3" language="bash">
          rqt_graph
        </TerminalBlock>

        <Callout type="note" title="ROS 2 Command Tip:">
          In ROS 2, you can launch GUI tools either directly by executable name (<code className="inline-code">rqt_graph</code>) or through the ROS 2 package runner (<code className="inline-code">ros2 run rqt_graph rqt_graph</code>). If a terminal ever reports command not found, ensure ROS 2 is sourced with <code className="inline-code">source /opt/ros/jazzy/setup.bash</code>.
        </Callout>

        <p className="lesson-image-wrapper">
          <img 
            src="assets/images/turtlesim_rqt_graph.png" 
            alt="rqt_graph Computational Graph Visualization" 
            title="rqt_graph live visualization showing node /teleop_turtle publishing /turtle1/cmd_vel to /turtlesim node" 
            className="lesson-image" 
            loading="lazy" 
            style={{ maxHeight: '420px', objectFit: 'contain' }}
          />
        </p>

        <p>The GUI visualizer will display the exact communication topology between your two active processes:</p>
        <OutputBlock language="text">
          {`   [ /teleop_turtle ] --------(/turtle1/cmd_vel)--------> [ /turtlesim ]`}
        </OutputBlock>

        <ul>
          <li><strong>Ovals</strong> represent active <strong>Nodes</strong> (executable processes like <code className="inline-code">/teleop_turtle</code> and <code className="inline-code">/turtlesim</code>).</li>
          <li><strong>Rectangles / Arrows</strong> represent active <strong>Topics</strong> routing data packets (<code className="inline-code">/turtle1/cmd_vel</code>) between publishers and subscribers.</li>
          <li>If a node is not connected to a topic arrow, it indicates an interface mismatch or a topic name typo.</li>
        </ul>
        <p>
          Keep this mental model in mind as we now explore the command-line introspection tools to inspect each node, topic, and message interface individually.
        </p>
      </Section>

      {/* Section 4: Node Introspection */}
      <Section id="4-core-concept-1-node-introspection-ros2-node" title="4. Core Concept 1: Node Introspection (ros2 node)">
        <p>
          In ROS 2, every distinct robotic software function (perception, planning, motor control) runs as an isolated process called a <strong>Node</strong>.
        </p>
        <p>Open a third terminal and query all currently active nodes:</p>
        
        <TerminalBlock terminal="Terminal 3" language="bash">
          ros2 node list
        </TerminalBlock>

        <p><strong>Output:</strong></p>
        <OutputBlock language="text">
{`/teleop_turtle
/turtlesim`}
        </OutputBlock>

        <p>To inspect everything a node produces, consumes, or exposes, use <code className="inline-code">ros2 node info</code>:</p>
        <TerminalBlock terminal="Terminal 3" language="bash">
          ros2 node info /turtlesim
        </TerminalBlock>

        <p><strong>Output Breakdown:</strong></p>
        <OutputBlock language="yaml">
{`/turtlesim
  Subscribers:
    /turtle1/cmd_vel: geometry_msgs/msg/Twist    <-- Receives velocity commands
  Publishers:
    /parameter_events: rcl_interfaces/msg/ParameterEvent
    /rosout: rcl_interfaces/msg/Log
    /turtle1/color_sensor: turtlesim/msg/Color  <-- Emits background color under turtle
    /turtle1/pose: turtlesim/msg/Pose          <-- Emits (x, y, theta, linear_velocity)
  Service Servers:
    /clear: std_srvs/srv/Empty                  <-- Clears screen ink trails
    /reset: std_srvs/srv/Empty                  <-- Resets turtle to origin
    /spawn: turtlesim/srv/Spawn                <-- Spawns a second turtle
    /turtle1/set_pen: turtlesim/srv/SetPen      <-- Changes ink color & thickness`}
        </OutputBlock>

        <Callout type="tip" title="Production Takeaway:">
          Whenever an autonomous robot fails to respond to movement commands, your first diagnostic step in production is running <code className="inline-code">ros2 node list</code> and <code className="inline-code">ros2 node info &lt;node&gt;</code> to confirm the motor driver node is alive and subscribing to the correct topic.
        </Callout>
      </Section>

      {/* Section 5: Topic Introspection */}
      <Section id="5-core-concept-2-topic-introspection-ros2-topic" title="5. Core Concept 2: Topic Introspection (ros2 topic)">
        <p>
          Nodes do not talk directly to one another. Instead, they publish and subscribe to named message buses called <strong>Topics</strong>.
        </p>

        <SubSection id="51-listing-topics" title="5.1 Listing Topics">
          <TerminalBlock terminal="Terminal 3" language="bash">
            ros2 topic list
          </TerminalBlock>

          <p>To see both the topic names and their message data types simultaneously, add the <code className="inline-code">-t</code> flag:</p>
          <TerminalBlock terminal="Terminal 3" language="bash">
            ros2 topic list -t
          </TerminalBlock>

          <p><strong>Output:</strong></p>
          <OutputBlock language="text">
{`/parameter_events [rcl_interfaces/msg/ParameterEvent]
/rosout [rcl_interfaces/msg/Log]
/turtle1/cmd_vel [geometry_msgs/msg/Twist]
/turtle1/color_sensor [turtlesim/msg/Color]
/turtle1/pose [turtlesim/msg/Pose]`}
          </OutputBlock>
        </SubSection>

        <SubSection id="52-echoing-live-data-ros2-topic-echo" title="5.2 Echoing Live Data (ros2 topic echo)">
          <p>To listen in real-time to the pose updates emitted by the simulated robot, run:</p>
          <TerminalBlock terminal="Terminal 3" language="bash">
            ros2 topic echo /turtle1/pose
          </TerminalBlock>

          <p>Now drive the turtle using the teleop keys. You will see coordinates stream in real time:</p>
          <OutputBlock language="yaml">
{`x: 5.820444583892822
y: 5.544444561004639
theta: 0.0
linear_velocity: 0.0
angular_velocity: 0.0
---`}
          </OutputBlock>
        </SubSection>

        <SubSection id="53-measuring-topic-publishing-frequency-ros2-topic-hz" title="5.3 Measuring Topic Publishing Frequency (ros2 topic hz)">
          <p>Robotics control loops require deterministic frequencies. You can audit how frequently a sensor is publishing:</p>
          <TerminalBlock terminal="Terminal 3" language="bash">
            ros2 topic hz /turtle1/pose
          </TerminalBlock>

          <p><strong>Output:</strong></p>
          <OutputBlock language="text">
{`average rate: 62.503
	min: 0.015s max: 0.017s std dev: 0.00049s window: 64`}
          </OutputBlock>
          <p><em>Turtlesim publishes pose updates at ~62.5 Hz.</em></p>
        </SubSection>
      </Section>

      {/* Section 6: Topic Interface Types */}
      <Section id="6-core-concept-3-topic-interface-types-ros2-interface" title="6. Core Concept 3: Topic Interface Types (ros2 interface)">
        <p>Every topic requires a strictly typed contract defined in ROS 2 IDL (Interface Definition Language).</p>
        <p>Notice that <code className="inline-code">/turtle1/cmd_vel</code> uses the type <code className="inline-code">geometry_msgs/msg/Twist</code>. What fields does that message actually contain?</p>
        <p>Query the interface definition directly:</p>

        <TerminalBlock terminal="Terminal 3" language="bash">
          ros2 interface show geometry_msgs/msg/Twist
        </TerminalBlock>

        <p><strong>Output:</strong></p>
        <OutputBlock language="text">
{`# This expresses velocity in free space broken into its linear and angular parts.

Vector3  linear
	float64 x
	float64 y
	float64 z
Vector3  angular
	float64 x
	float64 y
	float64 z`}
        </OutputBlock>
        <p>
          For a ground robot (differential drive AMR or Turtle), <code className="inline-code">linear.x</code> moves forward/backward, and <code className="inline-code">angular.z</code> steers left/right.
        </p>
      </Section>

      {/* Section 7: Moving Robot via CLI */}
      <Section id="7-moving-the-robot-hands-on-via-cli-ros2-topic-pub" title="7. Moving the Robot Hands-On via CLI (ros2 topic pub)">
        <p>You do not need a teleop node or a Python script to command a robot. You can inject messages directly onto any topic using <code className="inline-code">ros2 topic pub</code>.</p>

        <SubSection id="71-move-forward-once-once" title="7.1 Move Forward Once (--once)">
          <p>Command the robot to move forward at 2.0 m/s for one single timestep:</p>
          <TerminalBlock terminal="Terminal 3" language="bash">
            {`ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}"`}
          </TerminalBlock>
          <p>Notice the turtle surges forward and then comes to a stop.</p>
        </SubSection>

        <SubSection id="72-drive-in-a-continuous-circle-r-10" title="7.2 Drive in a Continuous Circle (-r 10)">
          <p>To command the robot to drive in a continuous circle, publish velocity commands at a steady rate of 10 Hz (<code className="inline-code">-r 10</code>):</p>
          <TerminalBlock terminal="Terminal 3" language="bash">
            {`ros2 topic pub -r 10 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"`}
          </TerminalBlock>
          <p>The turtle will drive in a circular loop, drawing an ink circle. Press <kbd>Ctrl + C</kbd> in the terminal to stop publishing.</p>
        </SubSection>
      </Section>

      {/* Section 8: Summary Comparison Table */}
      <Section id="8-summary-comparison-table-of-essential-cli-tools" title="8. Summary Comparison Table of Essential CLI Tools">
        <SummaryTable headers={['Command', 'Purpose', 'Production Use Case']}>
          <tr>
            <td><code className="inline-code">rqt_graph</code></td>
            <td>Visualizes computational graph nodes and topic wiring</td>
            <td>Auditing network communication topology and detecting disconnected nodes</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 run &lt;pkg&gt; &lt;executable&gt;</code></td>
            <td>Launches a specific executable node from a package</td>
            <td>Starting drivers, simulators, or single test scripts</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 node list</code></td>
            <td>Lists all active nodes across the network</td>
            <td>Auditing if all expected subsystem nodes are alive</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 node info &lt;node&gt;</code></td>
            <td>Details subscribers, publishers, services, and actions</td>
            <td>Verifying interface names and endpoint wiring</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 topic list -t</code></td>
            <td>Lists all active topics with their message types</td>
            <td>Discovering sensor and telemetry buses</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 topic echo &lt;topic&gt;</code></td>
            <td>Prints incoming message payloads to the console</td>
            <td>Live debugging of sensor values or trajectory points</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 topic hz &lt;topic&gt;</code></td>
            <td>Measures publish rate in Hertz</td>
            <td>Verifying camera / LiDAR sensor update rates</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 interface show &lt;type&gt;</code></td>
            <td>Shows message fields and structural types</td>
            <td>Inspecting data format before writing Python code</td>
          </tr>
          <tr>
            <td><code className="inline-code">ros2 topic pub &lt;topic&gt; &lt;type&gt; &lt;yaml&gt;</code></td>
            <td>Injects messages onto a topic from the CLI</td>
            <td>Testing actuators or emergency stop commands</td>
          </tr>
        </SummaryTable>
      </Section>

      {/* Section 9: Hands-On Student Lab */}
      <Section id="9-hands-on-student-challenge-turtlesim-operations" title="9. Hands-On Student Lab: The Turtlesim Operations Mission">
        <Callout type="note" title="Robotics Flight Operations Mission Briefing">
          <p>
            As an autonomous robotics software engineer, you rarely touch physical buttons on a robot. Instead, you orchestrate sensors, motors, and runtime graphs entirely through the command-line interface.
          </p>
          <p>
            In this comprehensive student lab, you will apply the complete suite of ROS 2 CLI tools (<strong>ros2 run</strong>, <strong>ros2 node</strong>, <strong>ros2 topic</strong>, <strong>ros2 service</strong>, and <strong>ros2 param</strong>) to dynamically reconfigure the simulation environment, inspect parameter servers, and customize robot properties at runtime!
          </p>
        </Callout>

        <SubSection id="environment-calibration-dynamic-reconfiguration" title="Environment Calibration & Dynamic Reconfiguration">
          <p>Professional robotics testbeds allow engineers to adjust simulation parameters on the fly without recompiling or restarting nodes. First, calibrate your simulation canvas and robot pen:</p>

          <ol>
            <li>Launch Turtlesim in your desktop simulation window (if not already running):</li>
          </ol>
          <TerminalBlock terminal="Terminal 1" language="bash">
            ros2 run turtlesim turtlesim_node
          </TerminalBlock>

          <ol start={2}>
            <li>In your terminal, list all parameters exposed by the <code className="inline-code">/turtlesim</code> node:</li>
          </ol>
          <TerminalBlock terminal="Terminal 2" language="bash">
            ros2 param list /turtlesim
          </TerminalBlock>

          <ol start={3}>
            <li>Switch the canvas from default blue to a professional <strong>Night-Ops Dark Navy</strong> theme (<code className="inline-code">#0f172a</code> &rarr; RGB: 15, 23, 42):</li>
          </ol>
          <TerminalBlock terminal="Terminal 2" language="bash">
{`ros2 param set /turtlesim background_r 15
ros2 param set /turtlesim background_g 23
ros2 param set /turtlesim background_b 42`}
          </TerminalBlock>

          <ol start={4}>
            <li>Parameters update internal state, but Turtlesim requires a background clear request to re-render. Invoke the <code className="inline-code">/clear</code> service:</li>
          </ol>
          <TerminalBlock terminal="Terminal 2" language="bash">
            ros2 service call /clear std_srvs/srv/Empty
          </TerminalBlock>
          <p>Observe the simulation canvas instantly transform into a sleek dark background!</p>

          <ol start={5}>
            <li>Reconfigure <code className="inline-code">turtle1</code>'s pen to draw high-visibility neon electric cyan ink with a crisp <strong>4 px</strong> line width:</li>
          </ol>
          <TerminalBlock terminal="Terminal 2" language="bash">
            {`ros2 service call /turtle1/set_pen turtlesim/srv/SetPen "{r: 56, g: 189, b: 248, width: 4, 'off': 0}"`}
          </TerminalBlock>

          <Callout type="tip" title="Mission Complete: Key Competencies Mastered" className="mt-4">
            <p>Congratulations! You have verified the essential CLI command families that make up daily ROS 2 engineering practice:</p>
            <ul>
              <li><strong>Node Control:</strong> Inspected active graph participants (<code className="inline-code">ros2 node list/info</code>).</li>
              <li><strong>Topic Telemetry:</strong> Listened to sensor streams and validated frequency clocks (<code className="inline-code">ros2 topic echo/hz</code>).</li>
              <li><strong>Actuator Commands:</strong> Broadcast streaming velocity vectors (<code className="inline-code">ros2 topic pub -r 10</code>) and executed emergency braking (<code className="inline-code">Twist "{}"</code>).</li>
              <li><strong>Service Invocations:</strong> Called discrete request-response triggers (<code className="inline-code">/set_pen</code>, <code className="inline-code">/clear</code>).</li>
              <li><strong>Dynamic Parameters:</strong> Reconfigured node parameters on the fly without restarting (<code className="inline-code">ros2 param set</code>).</li>
            </ul>
            <p>You are now prepared to progress to Lesson 04 to architect your first <strong>ROS 2 Workspace</strong> and build production packages!</p>
          </Callout>
        </SubSection>

        <div className="asset-handoff-card" style={{
          margin: '1.75rem 0 1rem 0',
          padding: '1.15rem 1.4rem',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.06)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📦</span>
            <strong style={{ fontSize: '0.95rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Asset Handoff &amp; Next Lesson Pipeline Bridge
            </strong>
          </div>
          <p style={{ margin: '0 0 0.65rem 0', fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            You have interacted with live ROS 2 computational graphs, mapped node-to-topic data flows, and inspected velocity command streams (/turtle1/cmd_vel) driving the Turtlesim graphics simulator.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.25rem 0.6rem', borderRadius: '5px', color: 'var(--text-primary)' }}>
              📁 <strong>Produced Artifact:</strong> Introspected computational graph flow (<code>ros2 node list</code>, <code>ros2 topic echo /turtle1/cmd_vel</code>)
            </span>
            <span style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.25rem 0.6rem', borderRadius: '5px', color: 'var(--text-primary)' }}>
              ➡️ <strong>Ingested By:</strong> Lesson 04 (Package Creation &amp; Anatomy)
            </span>
          </div>
        </div>
      </Section>
    </article>
  );
}

export default Lesson03;
