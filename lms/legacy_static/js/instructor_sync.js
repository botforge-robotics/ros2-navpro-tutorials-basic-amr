// Botforge Student LMS - Instructor LAN Sync & Heartbeat Agent
// Connects student laptops to the instructor's host cockpit on port 9000 over the local Wi-Fi.

document.addEventListener('DOMContentLoaded', () => {
  initInstructorSync();
});

let currentGates = { allow_quizzes: 1, allow_assignments: 1, allow_feedback: 0, status: 'ACTIVE' };
let studentProfile = null;

function getHostUrl() {
  const host = studentProfile?.host_ip || `${window.location.hostname || 'localhost'}:9000`;
  const cleanHost = host.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return `http://${cleanHost}`;
}

async function initInstructorSync() {
  studentProfile = JSON.parse(localStorage.getItem('navpro_student_profile') || 'null');

  // Inject Registration Modal if not registered
  if (!studentProfile) {
    showRegistrationModal();
  } else {
    renderHeaderBadge();
    sendHeartbeat();
  }

  // Periodic heartbeat every 10 seconds
  setInterval(() => {
    if (studentProfile) sendHeartbeat();
  }, 10000);
}

function renderHeaderBadge() {
  const header = document.querySelector('.app-header');
  if (!header) return;

  let badge = document.getElementById('studentSessionBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'studentSessionBadge';
    badge.className = 'student-session-badge';
    badge.title = 'Click to edit profile or Instructor LAN IP';

    // Insert before theme toggle or at right of header
    const rightControls = header.querySelector('.right-controls') || header;
    rightControls.prepend(badge);

    badge.addEventListener('click', () => {
      showRegistrationModal(true);
    });
  }

  badge.innerHTML = `
    <span class="sync-status-dot connected" id="syncStatusDot"></span>
    <span>${studentProfile.name.split(' ')[0]} (${studentProfile.org || 'Botforge'})</span>
  `;
}

function showRegistrationModal(isEdit = false) {
  let modal = document.getElementById('studentRegModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'studentRegModal';
    modal.className = 'lms-modal-backdrop';
    document.body.appendChild(modal);
  }

  const defaultHost = studentProfile?.host_ip || `${window.location.hostname || 'localhost'}:9000`;
  const defaultName = studentProfile?.name || '';
  const defaultEmail = studentProfile?.email || '';
  const defaultOrg = studentProfile?.org || '';

  modal.innerHTML = `
    <div class="lms-modal-content">
      <div class="lms-modal-header">
        <div class="lms-modal-title">🎓 Botforge Robotics Workshop</div>
        <div class="lms-modal-desc">
          ${isEdit ? 'Update your student profile or Instructor Host connection settings.' : 'Welcome! Please register to sync your attendance, quizzes, and live progress with the instructor.'}
        </div>
      </div>

      <form id="studentRegForm">
        <div class="lms-form-group">
          <label class="lms-form-label">Full Name</label>
          <input type="text" id="regName" class="lms-form-input" placeholder="e.g. Rahul Sharma" value="${defaultName}" required>
        </div>

        <div class="lms-form-group">
          <label class="lms-form-label">Email or Roll Number</label>
          <input type="text" id="regEmail" class="lms-form-input" placeholder="e.g. rahul@college.edu" value="${defaultEmail}" required>
        </div>

        <div class="lms-form-group">
          <label class="lms-form-label">College / Organization</label>
          <input type="text" id="regOrg" class="lms-form-input" placeholder="e.g. IIT Delhi / Robotics Club" value="${defaultOrg}" required>
        </div>

        <div class="lms-form-group">
          <label class="lms-form-label">Instructor LAN Host Address</label>
          <input type="text" id="regHost" class="lms-form-input" placeholder="e.g. 192.168.1.50:9000 or localhost:9000" value="${defaultHost}" required>
        </div>

        <button type="submit" class="lms-submit-btn">
          ${isEdit ? 'Save Changes' : 'Join Workshop &amp; Start'}
        </button>
        ${isEdit ? '<button type="button" id="btnCancelReg" style="width:100%; margin-top:8px; background:none; border:none; color:#94a3b8; cursor:pointer;">Cancel</button>' : ''}
      </form>
    </div>
  `;

  modal.classList.add('show');

  const form = modal.querySelector('#studentRegForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = modal.querySelector('#regName').value.trim();
    const email = modal.querySelector('#regEmail').value.trim();
    const org = modal.querySelector('#regOrg').value.trim();
    const host_ip = modal.querySelector('#regHost').value.trim();

    const student_id = studentProfile?.student_id || `stu_${Math.random().toString(36).substring(2, 9)}`;
    const level = window.location.pathname.includes('/level2/') ? 'level2' : 'level1';

    studentProfile = { student_id, name, email, org, host_ip, level };
    localStorage.setItem('navpro_student_profile', JSON.stringify(studentProfile));

    modal.classList.remove('show');
    renderHeaderBadge();

    // Register with instructor host
    try {
      const res = await fetch(`${getHostUrl()}/api/sync/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id,
          name,
          email,
          organization: org,
          level
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.gates) applyGates(data.gates);
      }
    } catch (err) {
      console.warn('[Sync] Could not reach instructor host during registration. Working in offline mode:', err);
    }

    sendHeartbeat();
  });

  if (isEdit) {
    modal.querySelector('#btnCancelReg').addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }
}

async function sendHeartbeat() {
  if (!studentProfile) return;

  const match = window.location.pathname.match(/lesson_(\d+)\.html/);
  const active_lesson = match ? `lesson_${match[1]}` : 'index';

  // Calculate completed count and quiz score
  const progress = JSON.parse(localStorage.getItem('navpro_progress') || '{}');
  const completed_count = Object.keys(progress).length;

  const quizSubs = JSON.parse(localStorage.getItem('navpro_quiz_submissions') || '{}');
  let quiz_score = 0;
  Object.values(quizSubs).forEach(subMap => {
    Object.values(subMap).forEach(s => {
      if (s.is_correct) quiz_score++;
    });
  });

  try {
    const res = await fetch(`${getHostUrl()}/api/sync/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: studentProfile.student_id,
        active_lesson,
        completed_count,
        quiz_score
      })
    });

    if (res.ok) {
      const dot = document.getElementById('syncStatusDot');
      if (dot) {
        dot.className = 'sync-status-dot connected';
      }
      const data = await res.json();
      if (data.gates) applyGates(data.gates);
    }
  } catch (err) {
    const dot = document.getElementById('syncStatusDot');
    if (dot) dot.className = 'sync-status-dot offline';
  }
}

function applyGates(gates) {
  currentGates = gates;

  // 1. Quizzes Gate
  const quizRoot = document.getElementById('quiz-root');
  if (quizRoot) {
    if (gates.allow_quizzes === 0) {
      quizRoot.style.display = 'none';
      let lockNotice = document.getElementById('quizLockNotice');
      if (!lockNotice) {
        lockNotice = document.createElement('div');
        lockNotice.id = 'quizLockNotice';
        lockNotice.className = 'gate-lock-banner';
        lockNotice.innerHTML = `
          <span style="font-size: 1.4rem;">🔒</span>
          <div>
            <strong>Quizzes Temporarily Locked by Instructor</strong>
            <div style="font-size: 0.85rem; color: #fde68a;">Please follow the live classroom lecture. The quiz will unlock automatically when the instructor activates it.</div>
          </div>
        `;
        quizRoot.parentNode.insertBefore(lockNotice, quizRoot);
      }
    } else {
      quizRoot.style.display = 'block';
      const lockNotice = document.getElementById('quizLockNotice');
      if (lockNotice) lockNotice.remove();
    }
  }

  // 2. Feedback Gate
  if (gates.allow_feedback === 1) {
    renderFeedbackButton();
  }
}

function renderFeedbackButton() {
  const header = document.querySelector('.app-header');
  if (!header || document.getElementById('btnOpenFeedbackModal')) return;

  const btn = document.createElement('button');
  btn.id = 'btnOpenFeedbackModal';
  btn.className = 'btn-feedback-trigger';
  btn.innerHTML = `⭐ <span>Rate Workshop</span>`;
  btn.title = 'The instructor has opened workshop feedback. Submit your review!';

  const rightControls = header.querySelector('.right-controls') || header;
  rightControls.prepend(btn);

  btn.addEventListener('click', showFeedbackModal);
}

function showFeedbackModal() {
  let modal = document.getElementById('feedbackModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'feedbackModal';
    modal.className = 'lms-modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="lms-modal-content">
      <div class="lms-modal-header">
        <div class="lms-modal-title">⭐ Workshop Feedback</div>
        <div class="lms-modal-desc">
          Your feedback helps us continuously elevate the Botforge Robotics workshop experience!
        </div>
      </div>

      <form id="feedbackForm">
        <div class="lms-form-group">
          <label class="lms-form-label">Overall Rating (1 to 5 Stars)</label>
          <select id="fbRating" class="lms-form-input">
            <option value="5">★★★★★ 5 Stars (Exceptional)</option>
            <option value="4">★★★★☆ 4 Stars (Very Good)</option>
            <option value="3">★★★☆☆ 3 Stars (Good)</option>
            <option value="2">★★☆☆☆ 2 Stars (Needs Improvement)</option>
            <option value="1">★☆☆☆☆ 1 Star (Poor)</option>
          </select>
        </div>

        <div class="lms-form-group">
          <label class="lms-form-label">Favorite Module or Simulator</label>
          <input type="text" id="fbFavorite" class="lms-form-input" placeholder="e.g. Nav2 Costmaps / MCP AI Agent">
        </div>

        <div class="lms-form-group">
          <label class="lms-form-label">Key Takeaway / Comments</label>
          <textarea id="fbComments" class="lms-form-input" style="height: 90px; resize: none;" placeholder="What did you learn? Any suggestions for future cohorts?" required></textarea>
        </div>

        <button type="submit" class="lms-submit-btn">Submit Feedback to Instructor</button>
        <button type="button" id="btnCancelFeedback" style="width:100%; margin-top:8px; background:none; border:none; color:#94a3b8; cursor:pointer;">Close</button>
      </form>
    </div>
  `;

  modal.classList.add('show');

  modal.querySelector('#btnCancelFeedback').addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.querySelector('#feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const rating = modal.querySelector('#fbRating').value;
    const favorite_module = modal.querySelector('#fbFavorite').value.trim();
    const feedback_text = modal.querySelector('#fbComments').value.trim();

    try {
      await fetch(`${getHostUrl()}/api/sync/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentProfile.student_id,
          student_name: studentProfile.name,
          rating,
          favorite_module,
          feedback_text
        })
      });
      alert('Thank you! Your feedback has been submitted directly to the instructor.');
      modal.classList.remove('show');
    } catch (err) {
      alert('Feedback saved locally! (Could not reach instructor host right now).');
      modal.classList.remove('show');
    }
  });
}

// Global hook for reporting assignment completion
window.reportAssignmentSubmission = async function(assignmentId, lessonId, status, logs) {
  if (!studentProfile) return;
  try {
    await fetch(`${getHostUrl()}/api/sync/assignment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: studentProfile.student_id,
        student_name: studentProfile.name,
        assignment_id: assignmentId,
        lesson_id: lessonId,
        status,
        logs
      })
    });
  } catch (e) {
    console.warn('Could not sync assignment to host:', e);
  }
};
