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
  ArrowRight,
  X,
  ZoomIn
} from 'lucide-react';
import { QuizCard } from './QuizCard';
import { PermissionCalculator } from './PermissionCalculator';
import { TurtlesimTeleopFlow } from './TurtlesimTeleopFlow';
import { PackageStructureFlow } from './PackageStructureFlow';
import { Ros2ArchitectureInteractive } from './Ros2ArchitectureInteractive';
import { lessonRegistry } from '../lessons/registry';
import { PubSubFlow } from './PubSubFlow';
import { ServiceFlow } from './ServiceFlow';
import { ActionFlow } from './ActionFlow';
import { LogLevelsNestedCircle } from './LogLevelsNestedCircle';
import InertiaCalculator from './InertiaCalculator';
import UrdfViewer3D from './UrdfViewer3D';
import hljs from 'highlight.js';

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
  const [turtlesimPortalNode, setTurtlesimPortalNode] = useState(null);
  const [packagePortalNode, setPackagePortalNode] = useState(null);
  const [pubsubPortalNode, setPubsubPortalNode] = useState(null);
  const [servicePortalNode, setServicePortalNode] = useState(null);
  const [actionPortalNode, setActionPortalNode] = useState(null);
  const [logLevelsPortalNode, setLogLevelsPortalNode] = useState(null);
  const [inertiaPortalNode, setInertiaPortalNode] = useState(null);
  const [urdfViewerPortalNode, setUrdfViewerPortalNode] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null); // { src, alt, caption }

  // Global Lightbox Click & Key Handler: clicking on any diagram / photo opens it in zoom view
  useEffect(() => {
    const handleGlobalImageClick = (e) => {
      const img = e.target.closest('img');
      if (img) {
        // Exclude image inside the lightbox itself, tiny icons, logos, or avatars
        if (img.closest('.image-lightbox-overlay') || img.closest('.nav-logo') || img.closest('.status-icon') || img.closest('.user-avatar')) return;

        e.preventDefault();
        e.stopPropagation();
        setZoomedImage({
          src: img.currentSrc || img.src,
          alt: img.alt || 'High-Resolution Diagram View',
          caption: img.getAttribute('title') || img.alt || ''
        });
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomedImage(null);
      }
    };

    document.addEventListener('click', handleGlobalImageClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleGlobalImageClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when image lightbox is open
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomedImage]);

  // Hook portal roots for interactive widgets
  useEffect(() => {
    // Reset all portal nodes first
    setPermissionPortalNode(null);
    setTurtlesimPortalNode(null);
    setPackagePortalNode(null);
    setPubsubPortalNode(null);
    setServicePortalNode(null);
    setActionPortalNode(null);
    setLogLevelsPortalNode(null);
    setInertiaPortalNode(null);
    setUrdfViewerPortalNode(null);

    // Query elements based on current lesson
    if (lesson.id === 'lesson_01') {
      setPermissionPortalNode(document.getElementById('interactive-permission-calculator-root'));
    } else if (lesson.id === 'lesson_03') {
      setTurtlesimPortalNode(document.getElementById('turtlesim-teleop-flow-root'));
    } else if (lesson.id === 'lesson_04') {
      setPackagePortalNode(document.getElementById('package-structure-flow-root'));
    } else if (lesson.id === 'lesson_05') {
      setPubsubPortalNode(document.getElementById('pubsub-flow-root'));
    } else if (lesson.id === 'lesson_06') {
      setLogLevelsPortalNode(document.getElementById('log-levels-circle-root'));
    } else if (lesson.id === 'lesson_07') {
      setServicePortalNode(document.getElementById('service-flow-root'));
    } else if (lesson.id === 'lesson_10') {
      setActionPortalNode(document.getElementById('action-flow-root'));
    } else if (lesson.id === 'lesson_14') {
      setInertiaPortalNode(document.getElementById('interactive-inertia-calculator-root'));
      setUrdfViewerPortalNode(document.getElementById('interactive-urdf-viewer-root'));
    }
  }, [lesson.id, lesson.html_content]);

  // Scroll to top when changing lesson
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  // Process all code blocks with highlight.js and wrap into IDE chrome windows
  useEffect(() => {
    if (!contentRef.current) return;

    // Ensure all images in lesson body are centered horizontally and wrapped properly
    const imgs = contentRef.current.querySelectorAll('img');
    imgs.forEach((img) => {
      img.classList.add('lesson-image');
      const parent = img.parentElement;
      if (parent && parent.tagName.toLowerCase() === 'p') {
        parent.classList.add('lesson-image-wrapper');
      }
    });

    const pres = contentRef.current.querySelectorAll('pre');
    pres.forEach((pre) => {
      let code = pre.querySelector('code');
      if (!code) {
        // Automatically wrap bare pre content in <code>
        const newCode = document.createElement('code');
        newCode.innerHTML = pre.innerHTML;
        pre.innerHTML = '';
        pre.appendChild(newCode);
        code = newCode;
      }

      // Check if already wrapped in an ide-code-window
      let parentWindow = pre.closest('.ide-code-window');
      const existingContainer = pre.closest('.code-container');

      // Detect language from class (e.g. language-python, language-bash, language-filepath)
      let lang = 'code';
      code.classList.forEach((cls) => {
        if (cls.startsWith('language-')) {
          lang = cls.replace('language-', '').toLowerCase();
        }
      });
      if (lang === 'code' && existingContainer && existingContainer.getAttribute('data-language')) {
        lang = existingContainer.getAttribute('data-language').toLowerCase();
      }

      // Highlight with highlight.js if not already highlighted
      if (!code.classList.contains('hljs') && lang !== 'filepath' && lang !== 'text') {
        const rawCode = code.textContent || '';
        if (lang && hljs.getLanguage(lang)) {
          try {
            const res = hljs.highlight(rawCode, { language: lang, ignoreIllegals: true });
            code.innerHTML = res.value;
            code.classList.add('hljs');
          } catch (e) {
            hljs.highlightElement(code);
          }
        } else {
          hljs.highlightElement(code);
        }
      }

      if (!parentWindow) {
        if (existingContainer) {
          existingContainer.classList.add('ide-code-window');
          parentWindow = existingContainer;
        } else {
          const wrapper = document.createElement('div');
          wrapper.className = 'ide-code-window';
          pre.parentNode.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);
          parentWindow = wrapper;
        }
      }

      // Create or update IDE header with window dots and tab
      let header = parentWindow.querySelector('.ide-header, .code-header');
      if (!header) {
        header = document.createElement('div');
        header.className = 'ide-header';
        parentWindow.insertBefore(header, pre);
      } else {
        header.className = 'ide-header';
      }

      const langDisplay = lang === 'bash' ? 'bash — terminal' :
                          lang === 'filepath' ? 'filepath — workspace' :
                          lang === 'python' ? 'python — script' :
                          lang === 'json' ? 'json — config' :
                          lang === 'xml' ? 'xml / urdf' :
                          lang === 'yaml' ? 'yaml — config' :
                          lang === 'text' ? 'output / log' :
                          lang;

      const langIcon = lang === 'bash' ? '❯_' :
                       lang === 'filepath' ? '📁' :
                       lang === 'python' ? '🐍' :
                       lang === 'json' ? '{ }' :
                       lang === 'xml' ? '</>' :
                       lang === 'yaml' ? '⚙️' :
                       lang === 'text' ? '📋' : '📄';

      header.innerHTML = `
        <div class="ide-controls">
          <span class="ide-dot ide-dot-red"></span>
          <span class="ide-dot ide-dot-yellow"></span>
          <span class="ide-dot ide-dot-green"></span>
        </div>
        <div class="ide-tab">
          <span class="ide-tab-icon">${langIcon}</span>
          <span class="ide-tab-name">${langDisplay}</span>
        </div>
        <button class="copy-code-btn" title="Copy code snippet">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      `;
    });
  }, [lesson.id, lesson.html_content]);

  // Attach interactive copy-to-clipboard behavior to all rendered code blocks
  useEffect(() => {
    if (!contentRef.current) return;

    const handleCopyClick = (e) => {
      const btn = e.target.closest('.copy-code-btn, .copy-btn');
      if (!btn) return;

      const codeContainer = btn.closest('.ide-code-window') || btn.closest('.code-container') || btn.closest('pre');
      const codeElement = codeContainer ? codeContainer.querySelector('code') : null;
      if (!codeElement) return;

      const codeText = codeElement.textContent || codeElement.innerText;
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
            <h3>Quick Concept Snapshot</h3>
          </div>
          <ul className="snapshot-list">
            {lesson.snapshot.map((item, idx) => {
              if (Array.isArray(item)) {
                return (
                  <li key={idx}>
                    <strong>{item[0]}:</strong> {item[1]}
                  </li>
                );
              }
              return (
                <li key={idx}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Main Educational Content: Fully Interactive React Lesson Component, or Fallback to Markdown Body */}
      {(() => {
        const LessonComponent = lessonRegistry[lesson.id];
        if (LessonComponent) {
          return (
            <React.Suspense fallback={
              <div className="lesson-loading-spinner" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>Loading interactive lesson...</p>
              </div>
            }>
              <LessonComponent />
            </React.Suspense>
          );
        }
        return (
          <article 
            ref={contentRef} 
            className="markdown-body lesson-body-content"
            dangerouslySetInnerHTML={{ __html: lesson.html_content }}
          />
        );
      })()}

      {/* Interactive Permission Calculator for Lesson 01 */}
      {lesson.id === 'lesson_01' && !lessonRegistry['lesson_01'] && (
        permissionPortalNode ? ReactDOM.createPortal(<PermissionCalculator />, permissionPortalNode) : null
      )}

      {/* Interactive Turtlesim Teleop & Computational Graph Flow for Lesson 03 */}
      {lesson.id === 'lesson_03' && !lessonRegistry['lesson_03'] && (
        turtlesimPortalNode ? ReactDOM.createPortal(<TurtlesimTeleopFlow />, turtlesimPortalNode) : null
      )}

      {/* Interactive Package Anatomy & Filesystem Flow for Lesson 04 */}
      {lesson.id === 'lesson_04' && (
        packagePortalNode ? ReactDOM.createPortal(<PackageStructureFlow />, packagePortalNode) : null
      )}

      {/* Interactive Pub/Sub Architecture & Flow for Lesson 05 */}
      {lesson.id === 'lesson_05' && (
        pubsubPortalNode ? ReactDOM.createPortal(<PubSubFlow />, pubsubPortalNode) : null
      )}

      {/* Interactive Log Levels Nested Circle Diagram for Lesson 06 */}
      {lesson.id === 'lesson_06' && (
        logLevelsPortalNode ? ReactDOM.createPortal(<LogLevelsNestedCircle />, logLevelsPortalNode) : null
      )}

      {/* Interactive Service Server & Client RPC Flow for Lesson 07 */}
      {lesson.id === 'lesson_07' && (
        servicePortalNode ? ReactDOM.createPortal(<ServiceFlow />, servicePortalNode) : null
      )}

      {/* Interactive Action 3-Tier Long-Running Goal/Feedback/Result Flow for Lesson 10 */}
      {lesson.id === 'lesson_10' && (
        actionPortalNode ? ReactDOM.createPortal(<ActionFlow />, actionPortalNode) : null
      )}

      {/* Interactive URDF Inertia Tensor Calculator for Lesson 14 */}
      {lesson.id === 'lesson_14' && (
        inertiaPortalNode ? ReactDOM.createPortal(<InertiaCalculator />, inertiaPortalNode) : null
      )}

      {/* Interactive 3D URDF & TF Kinematics Visualizer for Lesson 14 */}
      {lesson.id === 'lesson_14' && (
        urdfViewerPortalNode ? ReactDOM.createPortal(<UrdfViewer3D />, urdfViewerPortalNode) : null
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

      {/* Global High-Resolution Image Zoom / Lightbox Modal rendered via Portal to avoid ancestor CSS transforms */}
      {zoomedImage && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div 
          className="image-lightbox-overlay" 
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="image-lightbox-backdrop" />
          <div className="image-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <div className="image-lightbox-header">
              <span className="image-lightbox-title">
                {zoomedImage.alt || 'High-Resolution Diagram Preview'}
              </span>
              <button 
                type="button" 
                className="image-lightbox-close-btn"
                onClick={() => setZoomedImage(null)}
                title="Close full-screen image preview (ESC)"
              >
                <X size={20} />
              </button>
            </div>
            <div className="image-lightbox-body">
              <img 
                src={zoomedImage.src} 
                alt={zoomedImage.alt} 
                className="image-lightbox-img" 
              />
            </div>
            {zoomedImage.caption && (
              <div className="image-lightbox-caption">
                {zoomedImage.caption}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
