import React, { useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  CheckSquare, 
  Square, 
  Zap, 
  Clock, 
  BookOpen,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { QuizCard } from './QuizCard';

export function LessonView({ 
  lesson, 
  onSelectLesson, 
  onNavigateHub, 
  isCompleted, 
  onToggleComplete, 
  savedScore, 
  onRecordScore, 
  isQuizGateOpen,
  onOpenSyncModal
}) {
  const contentRef = useRef(null);

  // Scroll to top when changing lesson
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  // Attach interactive copy-to-clipboard behavior to all rendered code blocks
  useEffect(() => {
    if (!contentRef.current) return;

    const handleCopyClick = (e) => {
      const btn = e.target.closest('.copy-code-btn');
      if (!btn) return;

      const codeContainer = btn.closest('.code-container');
      const codeElement = codeContainer ? codeContainer.querySelector('code') : null;
      if (!codeElement) return;

      const codeText = codeElement.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2000);
      });
    };

    // Attach listener for internal links in HTML (e.g. data-lesson="02")
    const handleInternalLink = (e) => {
      const link = e.target.closest('.internal-lesson-link');
      if (!link) return;
      e.preventDefault();
      const numStr = link.getAttribute('data-lesson');
      if (numStr) {
        onSelectLesson(`lesson_${numStr}`);
      }
    };

    const container = contentRef.current;
    container.addEventListener('click', handleCopyClick);
    container.addEventListener('click', handleInternalLink);

    return () => {
      container.removeEventListener('click', handleCopyClick);
      container.removeEventListener('click', handleInternalLink);
    };
  }, [lesson.id, onSelectLesson]);

  return (
    <div className="lesson-view-container fade-in">
      {/* Top Breadcrumbs */}
      <nav className="lesson-breadcrumbs">
        <button onClick={onNavigateHub} className="breadcrumb-btn">
          Curriculum Hub
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-module">{lesson.module}</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">Lesson {lesson.num_str}</span>
      </nav>

      {/* Lesson Header Card */}
      <header className="lesson-main-header">
        <div className="lesson-header-meta">
          <span className="module-badge">{lesson.module}</span>
          <span className="duration-badge">
            <Clock size={13} />
            <span>{lesson.duration}</span>
          </span>
          <span className="level-badge">ROS 2 Jazzy</span>
        </div>

        <div className="lesson-title-action-row">
          <h1 className="lesson-main-title">
            <span className="title-num">Lesson {lesson.num_str}:</span> {lesson.title}
          </h1>

          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`lesson-complete-toggle-btn ${isCompleted ? 'completed' : ''}`}
            title={isCompleted ? "Lesson marked complete. Click to uncheck." : "Click to mark lesson complete"}
          >
            {isCompleted ? <CheckSquare size={18} /> : <Square size={18} />}
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>

        {lesson.focus && (
          <div className="lesson-focus-card">
            <strong>Focus:</strong> {lesson.focus}
          </div>
        )}
      </header>

      {/* Quick Concept Snapshot (if defined) */}
      {lesson.snapshot && lesson.snapshot.length > 0 && (
        <div className="concept-snapshot-card">
          <div className="snapshot-header">
            <Zap size={18} className="zap-icon" />
            <h3>⚡ Quick Concept Snapshot</h3>
          </div>
          <ul className="snapshot-list">
            {lesson.snapshot.map(([term, desc], idx) => (
              <li key={idx}>
                <strong>{term}:</strong> {desc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Educational Markdown Body */}
      <article 
        ref={contentRef} 
        className="markdown-body lesson-body-content"
        dangerouslySetInnerHTML={{ __html: lesson.html_content }}
      />

      {/* Embedded Interactive Quiz */}
      {lesson.has_quiz && (
        <section className="lesson-quiz-section">
          <QuizCard
            lessonId={lesson.id}
            quizzes={lesson.quizzes}
            savedScore={savedScore}
            onRecordScore={onRecordScore}
            isQuizGateOpen={isQuizGateOpen}
            onOpenSyncModal={onOpenSyncModal}
          />
        </section>
      )}

      {/* Lesson Navigation Footer */}
      <footer className="lesson-navigation-footer">
        {lesson.prev_id ? (
          <button 
            onClick={() => onSelectLesson(lesson.prev_id)}
            className="lesson-nav-btn prev"
          >
            <ArrowLeft size={16} />
            <span>Previous Lesson</span>
          </button>
        ) : (
          <div style={{ width: '130px' }} />
        )}

        <button 
          onClick={onNavigateHub}
          className="lesson-nav-btn hub"
        >
          <Compass size={16} />
          <span>Course Hub</span>
        </button>

        {lesson.next_id ? (
          <button 
            onClick={() => onSelectLesson(lesson.next_id)}
            className="lesson-nav-btn next"
          >
            <span>Next Lesson</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div style={{ width: '130px' }} />
        )}
      </footer>
    </div>
  );
}
