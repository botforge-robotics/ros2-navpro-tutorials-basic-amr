import React from 'react';
import { 
  X, 
  HelpCircle, 
  HardDrive, 
  RotateCcw, 
  Container, 
  Network, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div className="modal-card help-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <HelpCircle size={22} className="modal-title-icon" />
            <div>
              <h3>Help &bull; Persistence, Resets &amp; Troubleshooting</h3>
              <span className="modal-subtitle">
                Guide to local workspace storage, progress resets, and Docker lifecycle
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close help">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body help-modal-body">
          {/* Section 1: Data Persistence */}
          <div className="help-section">
            <div className="help-section-title">
              <HardDrive size={18} className="help-section-icon" />
              <h4>1. How Data &amp; Workspace Storage Persist</h4>
            </div>
            <p>
              Your progress and code are engineered to <strong>survive PC reboots, browser restarts, and container restarts</strong> without cloud reliance:
            </p>
            <ul className="help-bullets">
              <li>
                <strong>Student Attendance &amp; Profile:</strong> Stored permanently in your browser's <code>localStorage</code>. Opening the LMS tomorrow will remember your name and organization.
              </li>
              <li>
                <strong>Curriculum Checklist &amp; Quizzes:</strong> Every lesson checkbox and quiz score is saved in <code>localStorage</code>.
              </li>
              <li>
                <strong>Robotics Code in VS Code:</strong> The <code>ros2_ws/</code> folder is mounted directly from your host filesystem. Your custom Python nodes and launch files persist on your physical hard drive.
              </li>
            </ul>
          </div>

          {/* Section 2: Resetting Progress */}
          <div className="help-section">
            <div className="help-section-title">
              <RotateCcw size={18} className="help-section-icon" />
              <h4>2. How to Reset Curriculum Progress</h4>
            </div>
            <p>
              If you want to practice again from a fresh slate:
            </p>
            <div className="help-step-box">
              <strong>Option A: One-Click UI Reset</strong>
              <p>Click the <code>↺ Reset Checklist</code> button at the top of the left sidebar. It will clear all completed lesson marks and quiz scores after confirmation.</p>
            </div>
            <div className="help-step-box">
              <strong>Option B: Edit Profile or Instructor IP</strong>
              <p>Click your student badge (e.g. <code>👤 Student Login / Profile</code>) in the top navbar anytime to update your registration details or change the instructor's IP address.</p>
            </div>
            <div className="help-step-box">
              <strong>Option C: Hard Browser Reset</strong>
              <p>Open Browser DevTools (<code>F12</code>) &rarr; Console &rarr; run <code>localStorage.clear()</code> &rarr; refresh the page.</p>
            </div>
          </div>

          {/* Section 3: Resetting Docker */}
          <div className="help-section">
            <div className="help-section-title">
              <Container size={18} className="help-section-icon" />
              <h4>3. How to Restart &amp; Reset Docker</h4>
            </div>
            <p>
              If a simulation crashes, a port locks, or you need a clean container environment:
            </p>
            
            <div className="help-code-group">
              <span className="help-code-label">Quick Restart (Fast):</span>
              <pre className="help-pre"><code>cd level1/docker && docker compose restart</code></pre>
            </div>

            <div className="help-code-group">
              <span className="help-code-label">Full Container Recreate (Clean Runtime State):</span>
              <pre className="help-pre"><code>cd level1/docker && docker compose down && docker compose up -d</code></pre>
              <span className="help-note">
                (Note: Your code files in <code>ros2_ws/</code> will NOT be deleted; they remain safe on your host disk).
              </span>
            </div>

            <div className="help-code-group">
              <span className="help-code-label">Clean Build Artifacts in ROS 2:</span>
              <pre className="help-pre"><code>rm -rf level1/ros2_ws/build level1/ros2_ws/install level1/ros2_ws/log</code></pre>
            </div>
          </div>

          {/* Section 4: Port Directory */}
          <div className="help-section">
            <div className="help-section-title">
              <Network size={18} className="help-section-icon" />
              <h4>4. Environment Access &amp; Port Directory</h4>
            </div>
            <div className="help-ports-grid">
              <div className="help-port-card">
                <span className="port-badge">Port 8000</span>
                <strong>LMS Learning Web Platform</strong>
                <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">http://localhost:8000</a>
              </div>
              <div className="help-port-card">
                <span className="port-badge">Port 6080</span>
                <strong>Desktop GUI (noVNC)</strong>
                <a href="http://localhost:6080/vnc.html" target="_blank" rel="noopener noreferrer">http://localhost:6080/vnc.html</a>
                <span className="port-pass">Password: <code>password</code></span>
              </div>
              <div className="help-port-card">
                <span className="port-badge">Port 8443</span>
                <strong>In-Browser VS Code</strong>
                <a href="http://localhost:8443/?folder=/home/student/ros2_ws" target="_blank" rel="noopener noreferrer">http://localhost:8443</a>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button type="button" className="btn-submit" onClick={onClose} style={{ marginLeft: 'auto' }}>
            <span>Got It</span>
          </button>
        </div>
      </div>
    </div>
  );
}
