import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
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
import { PermissionCalculator } from './PermissionCalculator';

export function LessonView({ 
  lesson, 
  onSelectLesson, 
  onNavigateHub, 
  isCompleted, 
  onToggleComplete, 
  savedScore, 
  onRecordScore, 
  isQuizGateOpen,
  onOpenSyncModal,
  studentInfo,
  onSubmitFeedback
}) {
  const contentRef = useRef(null);
  const [permissionPortalNode, setPermissionPortalNode] = useState(null);

  // Hook portal root for interactive permission calculator in Lesson 01
  useEffect(() => {
    if (lesson.id === 'lesson_01') {
      const el = document.getElementById('interactive-permission-calculator-root');
      setPermissionPortalNode(el);
    } else {
      setPermissionPortalNode(null);
    }
  }, [lesson.id, lesson.html_content]);

  // Scroll to top when changing lesson
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  // Attach interactive copy-to-clipboard behavior to all rendered code blocks
  useEffect(() => {
    if (!contentRef.current) return;

    const handleCopyClick = (e) => {
      const btn = e.target.closest('.copy-code-btn, .copy-btn');
      if (!btn) return;

      const codeContainer = btn.closest('.code-container') || btn.closest('pre');
      const codeElement = codeContainer ? codeContainer.querySelector('code') : null;
      if (!codeElement) return;

      const codeText = codeElement.innerText;
      // 1. Copy to browser clipboard
      navigator.clipboard.writeText(codeText).catch(() => {});

      // 2. Bridge directly to container X11/VNC clipboard
      fetch('/api/clipboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: codeText })
      }).catch(() => {});

      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('copied');
      }, 2000);
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

      {/* Interactive Permission Calculator for Lesson 01 (Portaled into Section 4.1 or inline fallback) */}
      {lesson.id === 'lesson_01' && (
        permissionPortalNode ? (
          ReactDOM.createPortal(<PermissionCalculator />, permissionPortalNode)
        ) : (
          <section className="lesson-interactive-tool-section" style={{ margin: '2rem 0' }}>
            <PermissionCalculator />
          </section>
        )
      )}

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

      {/* Bottom Completion Action Bar */}
      <section className="lesson-bottom-completion-card" style={{
        margin: '2.5rem 0 1rem',
        padding: '1.5rem 1.75rem',
        borderRadius: '14px',
        background: isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface)',
        border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '10px',
            background: isCompleted ? 'var(--success)' : 'var(--bg-sidebar)',
            color: isCompleted ? '#fff' : 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {isCompleted ? <CheckSquare size={22} /> : <BookOpen size={22} />}
          </div>
          <div>
            <h4 style={{ margin: '0 0 3px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {isCompleted ? '✓ Lesson Completed' : 'Completed this Lesson?'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              {isCompleted 
                ? 'Your completion is marked and synced in real-time with the instructor dashboard.'
                : 'Click below to mark complete and automatically advance to the next module.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isCompleted ? (
            <>
              <button
                onClick={() => onToggleComplete(lesson.id)}
                className="lesson-complete-toggle-btn completed"
                title="Click to unmark as complete"
                style={{ padding: '0.65rem 1.1rem', borderRadius: '8px' }}
              >
                <CheckSquare size={17} />
                <span>Marked Complete (Click to Undo)</span>
              </button>

              {lesson.next_id && (
                <button
                  onClick={() => onSelectLesson(lesson.next_id)}
                  className="lesson-nav-btn next"
                  style={{ padding: '0.65rem 1.25rem' }}
                >
                  <span>{lesson.next_id === 'feedback' ? 'Course Feedback & Survey' : 'Next Lesson'}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => {
                onToggleComplete(lesson.id);
                if (lesson.next_id) {
                  onSelectLesson(lesson.next_id);
                } else {
                  onNavigateHub();
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--success)',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.15s ease'
              }}
              className="btn-complete-and-advance"
            >
              <CheckSquare size={18} />
              <span>
                {lesson.next_id === 'feedback' 
                  ? 'Mark Complete & Course Feedback' 
                  : lesson.next_id 
                    ? 'Mark as Complete & Next Module' 
                    : 'Mark as Complete & Finish'}
              </span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </section>

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
            <span>{lesson.next_id === 'feedback' ? 'Course Feedback' : 'Next Lesson'}</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div style={{ width: '130px' }} />
        )}
      </footer>
    </div>
  );
}
