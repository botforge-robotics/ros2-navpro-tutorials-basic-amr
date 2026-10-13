// NavPro Learning Hub - Interactive Quiz & Assessment Engine
// Zero-backend required: runs 100% client-side inside Docker via localStorage persistence

document.addEventListener('DOMContentLoaded', () => {
  initQuizEngine();
});

async function initQuizEngine() {
  const currentPath = window.location.pathname;
  const match = currentPath.match(/lesson_(\d+)\.html/);
  if (!match) return; // Only run on lesson pages

  const lessonNum = match[1];
  const lessonId = `lesson_${lessonNum}`;

  // Find target insertion point
  const navContainer = document.querySelector('.lesson-nav, .lesson-footer');
  const mainContent = document.querySelector('.lesson-content') || document.body;

  const quizRoot = document.createElement('div');
  quizRoot.id = 'quiz-root';
  quizRoot.className = 'quiz-container';

  if (navContainer) {
    navContainer.parentNode.insertBefore(quizRoot, navContainer);
  } else {
    mainContent.appendChild(quizRoot);
  }

  // Load questions from local JSON bank
  let questions = [];
  try {
    const res = await fetch('../assets/data/quizzes.json');
    if (res.ok) {
      const fullBank = await res.json();
      questions = fullBank[lessonId] || [];
    }
  } catch (err) {
    console.warn('[Quiz Engine] Could not load quiz data:', err);
    return;
  }

  if (!questions || questions.length === 0) {
    return; // No quiz defined for this lesson
  }

  // Load past submissions from localStorage
  const allSubmissions = JSON.parse(localStorage.getItem('navpro_quiz_submissions') || '{}');
  const lessonSubmissions = allSubmissions[lessonId] || {};

  renderQuizUI(quizRoot, lessonId, questions, lessonSubmissions, allSubmissions);

  // Render Capstone Assignment Card
  const isCapstone = ['lesson_05', 'lesson_08', 'lesson_10', 'lesson_16', 'lesson_24', 'lesson_26'].includes(lessonId);
  if (isCapstone) {
    renderAssignmentCard(quizRoot, lessonId);
  }
}

function renderQuizUI(container, lessonId, questions, lessonSubmissions, allSubmissions) {
  const letters = ['A', 'B', 'C', 'D'];
  const total = questions.length;
  let score = 0;

  questions.forEach(q => {
    const sub = lessonSubmissions[q.id];
    if (sub && sub.is_correct) score++;
  });

  const header = document.createElement('div');
  header.className = 'quiz-header';
  header.innerHTML = `
    <div class="quiz-title">
      <span>🧠 Knowledge Verification Quiz</span>
    </div>
    <div class="quiz-score-badge" id="quizScoreBadge">
      Score: ${score}/${total} (${Math.round((score / total) * 100)}%)
    </div>
  `;
  container.appendChild(header);

  questions.forEach((q, qIdx) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.id = `card_${q.id}`;

    const pastSub = lessonSubmissions[q.id];
    if (pastSub) {
      card.classList.add(pastSub.is_correct ? 'is-correct' : 'is-incorrect');
    }

    card.innerHTML = `
      <div class="quiz-question-number">Question ${qIdx + 1} of ${total}</div>
      <div class="quiz-prompt">${q.prompt}</div>
      <div class="quiz-options" id="opts_${q.id}"></div>
      <div class="quiz-actions">
        <button class="quiz-submit-btn" id="btn_${q.id}" ${pastSub ? 'disabled' : ''}>
          ${pastSub ? 'Submitted' : 'Submit Answer'}
        </button>
      </div>
      <div id="exp_${q.id}"></div>
    `;

    const optsContainer = card.querySelector(`#opts_${q.id}`);
    let selectedOptionIdx = pastSub ? pastSub.selected_idx : null;

    q.options.forEach((optText, optIdx) => {
      const optEl = document.createElement('div');
      optEl.className = 'quiz-option';
      if (selectedOptionIdx === optIdx) optEl.classList.add('selected');

      if (pastSub) {
        optEl.classList.add('locked');
        if (optIdx === q.correct) {
          optEl.classList.add('correct-choice');
        } else if (optIdx === selectedOptionIdx && !pastSub.is_correct) {
          optEl.classList.add('wrong-choice');
        }
      }

      optEl.innerHTML = `
        <span class="quiz-option-letter">${letters[optIdx]}</span>
        <span>${optText}</span>
      `;

      if (!pastSub) {
        optEl.addEventListener('click', () => {
          optsContainer.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          optEl.classList.add('selected');
          selectedOptionIdx = optIdx;
        });
      }

      optsContainer.appendChild(optEl);
    });

    const submitBtn = card.querySelector(`#btn_${q.id}`);
    const expContainer = card.querySelector(`#exp_${q.id}`);

    if (pastSub && q.explanation) {
      expContainer.className = `quiz-explanation ${pastSub.is_correct ? 'correct' : 'incorrect'}`;
      expContainer.innerHTML = pastSub.is_correct
        ? `<strong>✅ Correct!</strong> ${q.explanation}`
        : `<strong>❌ Incorrect.</strong> ${q.explanation}`;
    }

    submitBtn.addEventListener('click', () => {
      if (selectedOptionIdx === null) {
        alert('Please select an option before submitting!');
        return;
      }

      const isCorrect = (selectedOptionIdx === q.correct);

      // Lock options and show visual feedback
      optsContainer.querySelectorAll('.quiz-option').forEach((optEl, idx) => {
        optEl.classList.add('locked');
        if (idx === q.correct) {
          optEl.classList.add('correct-choice');
        } else if (idx === selectedOptionIdx && !isCorrect) {
          optEl.classList.add('wrong-choice');
        }
      });

      card.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
      expContainer.className = `quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}`;
      expContainer.innerHTML = isCorrect
        ? `<strong>✅ Correct!</strong> ${q.explanation}`
        : `<strong>❌ Incorrect.</strong> ${q.explanation}`;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitted';

      // Persist submission to localStorage
      lessonSubmissions[q.id] = {
        selected_idx: selectedOptionIdx,
        is_correct: isCorrect,
        timestamp: Date.now()
      };
      allSubmissions[lessonId] = lessonSubmissions;
      localStorage.setItem('navpro_quiz_submissions', JSON.stringify(allSubmissions));

      // Update score badge
      if (isCorrect) score++;
      const badge = document.getElementById('quizScoreBadge');
      if (badge) {
        badge.textContent = `Score: ${score}/${total} (${Math.round((score / total) * 100)}%)`;
      }

      // Automatically check lesson progress if passed
      if (score === total) {
        const progress = JSON.parse(localStorage.getItem('navpro_progress') || '{}');
        progress[lessonId] = true;
        localStorage.setItem('navpro_progress', JSON.stringify(progress));
        const chk = document.querySelector(`.lesson-checkbox[data-lesson-id="${lessonId}"]`);
        if (chk) chk.checked = true;
      }
    });

    container.appendChild(card);
  });
}

function renderAssignmentCard(container, lessonId) {
  const verifierCard = document.createElement('div');
  verifierCard.className = 'assignment-verifier-card';
  verifierCard.innerHTML = `
    <div class="assignment-header">
      <div class="assignment-title">
        <span>⚡ Hands-On Code Verification</span>
      </div>
      <span class="quiz-score-badge" style="border-color: #10b981; color: #10b981;">Docker Workspace Active</span>
    </div>
    <div style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin-bottom: 12px;">
      Execute the verification command directly in your in-browser <strong>VS Code terminal (port 8443)</strong> or desktop shell:
    </div>
    <div class="terminal-console"># Verify ROS 2 workspace build and package health:
cd ~/ros2_ws && colcon build --symlink-install
source install/setup.bash

# Run automated smoke test:
python3 scripts/reset_workspace.sh</div>
  `;

  container.appendChild(verifierCard);
}
