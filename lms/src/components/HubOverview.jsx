import React from "react";
import {
  Rocket,
  Monitor,
  Code2,
  CheckCircle2,
  BookOpen,
  Layers,
  Cpu,
  Compass,
  Bot,
  Radio,
  FileCode2,
  ArrowRight,
  ShieldCheck,
  Eye,
  Box,
  Network,
} from "lucide-react";
import { StudentFeedbackForm } from "./StudentFeedbackForm";

const MODULE_ICONS = {
  1: Cpu,
  2: Network,
  3: Eye,
  4: Box,
  5: Compass,
};

export function HubOverview({
  modules,
  lessons,
  onSelectLesson,
  completedLessons,
  progressPercent,
  completedCount,
  totalLessons,
  studentInfo,
  onSubmitFeedback,
}) {
  return (
    <div className="hub-overview-container fade-in">
      {/* Hero Welcome Banner */}
      <section className="hub-hero-banner">
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="badge-pill">
              Industrial AMR Systems Engineering
            </span>
            <span className="badge-pill jazzy">ROS 2 Jazzy LTS</span>
            <span className="badge-pill success">Ubuntu 24.04</span>
          </div>

          <h1 className="hero-title">
            Level 1: Zero-to-Autonomous AMR Engineer
          </h1>

          <p className="hero-description">
            Complete mastery over core ROS 2 Jazzy robotics mechanics. Learn
            Linux command-line engineering, peer-to-peer DDS bus architectures,
            differential drive kinematics, URDF digital twins, and autonomous 2D
            SLAM &amp; Nav2 navigation in Gazebo Harmonic simulation.
          </p>

          <div className="hero-actions-row">
            <button
              onClick={() => onSelectLesson("lesson_01")}
              className="hero-primary-btn"
            >
              <Rocket size={17} />
              <span>Start Lesson 01: Linux Basics</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="http://localhost:6080/vnc.html?autoconnect=true&resize=remote"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-secondary-btn"
            >
              <Monitor size={17} />
              <span>Launch Desktop GUI (:6080)</span>
            </a>

            <a
              href="http://localhost:8443/?folder=/home/student/ros2_ws"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-secondary-btn"
            >
              <Code2 size={17} />
              <span>Open VS Code (:8443)</span>
            </a>
          </div>
        </div>

        <div className="hero-graphic">
          <img
            src="assets/images/ros2_logo.svg"
            alt="ROS 2 Architecture"
            className="hero-ros2-logo"
          />
        </div>
      </section>

      {/* KPI Stats Ribbon */}
      <section className="hub-stats-ribbon">
        <div className="stat-card">
          <div className="stat-number">26</div>
          <div className="stat-label">Hands-On Lessons</div>
          <div className="stat-sub">Step-by-step guides</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5</div>
          <div className="stat-label">Core Modules</div>
          <div className="stat-sub">Middleware to Nav2</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4</div>
          <div className="stat-label">Capstone Projects</div>
          <div className="stat-sub">Physical &amp; Sim AMRs</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-number">{progressPercent}%</div>
          <div className="stat-label">Your Progress</div>
          <div className="stat-sub">
            {completedCount} of {totalLessons} Completed
          </div>
        </div>
      </section>

      {/* Modules Roadmap Grid */}
      <section className="hub-modules-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              Curriculum Modules &amp; Learning Track
            </h2>
            <p className="section-subtitle">
              Follow the pedagogical sequence or jump directly into specialized
              robotics domains:
            </p>
          </div>
        </div>

        <div className="modules-grid">
          {modules.map((mod) => {
            const modLessons = lessons.filter((l) => l.module_id === mod.id);
            const modCompleted = modLessons.filter((l) =>
              completedLessons.includes(l.id),
            ).length;
            const isCompleted =
              modCompleted === modLessons.length && modLessons.length > 0;
            const ModIcon = MODULE_ICONS[mod.id] || Layers;

            return (
              <div
                key={mod.id}
                className={`module-card ${isCompleted ? "completed" : ""}`}
              >
                <div className="module-card-header">
                  <div className="module-icon-wrap">
                    <ModIcon size={20} />
                  </div>
                  <div className="module-title-wrap">
                    <span className="module-meta">
                      Module {mod.id} &bull; Lessons{" "}
                      {String(mod.range[0]).padStart(2, "0")}-
                      {String(mod.range[1]).padStart(2, "0")}
                    </span>
                    <h3 className="module-heading">{mod.name}</h3>
                  </div>
                  <span
                    className={`module-status-tag ${isCompleted ? "done" : ""}`}
                  >
                    {modCompleted}/{modLessons.length}
                  </span>
                </div>

                <ul className="module-lessons-list">
                  {modLessons.map((l) => {
                    const isLessonDone = completedLessons.includes(l.id);
                    return (
                      <li key={l.id}>
                        <button
                          className={`module-lesson-link ${isLessonDone ? "done" : ""}`}
                          onClick={() => onSelectLesson(l.id)}
                        >
                          <span className="lesson-num-pill">{l.num_str}</span>
                          <span className="lesson-title-text">{l.title}</span>
                          {isLessonDone && (
                            <CheckCircle2
                              size={14}
                              className="lesson-done-check"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Student Hands-On Projects & Starter Templates Table */}
      <section className="hub-assignments-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              💻 Hands-On Projects &amp; Reference Solutions
            </h2>
            <p className="section-subtitle">
              Starter templates with <code># TODO</code> exercises are mounted
              in your VS Code workspace (<code>~/ros2_ws/src/</code>):
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="assignments-table">
            <thead>
              <tr>
                <th>Project / Milestone</th>
                <th>Focus Domain</th>
                <th>Student Task Template (To Fill In)</th>
                <th>Reference Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Day 1: Teleop Velocity Scaler</strong>
                </td>
                <td>Publishers, Subscribers &amp; QoS</td>
                <td>
                  <code>navpro_basics/task_teleop_speed_limiter.py</code>
                </td>
                <td>
                  <code>navpro_basics/solution_teleop_speed_limiter.py</code>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Day 2: Forward Kinematics TF2</strong>
                </td>
                <td>TF2 Tree, Odometry &amp; Coordinate Frames</td>
                <td>
                  <code>navpro_description/task_custom_odometry_tf.py</code>
                </td>
                <td>
                  <code>navpro_description/solution_custom_odometry_tf.py</code>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Day 3: Nav2 Patrol Mission</strong>
                </td>
                <td>Autonomous Navigation &amp; Simple Commander</td>
                <td>
                  <code>navpro_navigation/task_multi_waypoint_patrol.py</code>
                </td>
                <td>
                  <code>
                    navpro_navigation/solution_multi_waypoint_patrol.py
                  </code>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Project 3: OpenCV Optical Inspection</strong>
                </td>
                <td>cv_bridge &amp; Edge Detection Pipeline</td>
                <td>
                  <code>navpro_vision/task_opencv_inspection.py</code>
                </td>
                <td>
                  <code>navpro_vision/solution_opencv_inspection.py</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mock Telemetry Callout */}
        <div className="mock-callout-card">
          <div className="mock-callout-header">
            <Radio size={20} className="mock-icon" />
            <h4>Companion Mock Data Simulator Node</h4>
          </div>
          <p>
            When completing assignments, test your node logic immediately
            without waiting for heavy Gazebo simulations. Run the companion mock
            telemetry publisher in any terminal:
          </p>
          <div className="code-container" style={{ margin: "0.75rem 0" }}>
            <div className="code-header">
              <span className="code-lang-tag">BASH</span>
            </div>
            <pre>
              <code>ros2 run navpro_basics mock_telemetry_provider</code>
            </pre>
          </div>
          <span className="mock-detail">
            Simulates <code>/battery_voltage</code>,{" "}
            <code>/battery_status</code>, <code>/obstacle_distance</code>, and{" "}
            <code>/wheel_speeds</code>.
          </span>
        </div>
      </section>

      {/* Capstone Course Feedback & Rating Form */}
      {onSubmitFeedback && (
        <section className="hub-feedback-section" style={{ marginTop: "2.5rem" }}>
          <StudentFeedbackForm
            studentInfo={studentInfo || {}}
            onSubmitFeedback={onSubmitFeedback}
          />
        </section>
      )}
    </div>
  );
}
