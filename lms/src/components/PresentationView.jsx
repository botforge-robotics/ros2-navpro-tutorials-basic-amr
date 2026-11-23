import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  Sun,
  Moon,
  X,
  Copy,
  Check,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Code2,
  BookOpen,
  ArrowRight,
  Compass,
  Sliders,
  Layers,
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';
import hljs from 'highlight.js';
import { parseLessonIntoSlides } from '../utils/slideParser';

// Interactive Components
import { PermissionCalculator } from './PermissionCalculator';
import { TurtlesimTeleopFlow } from './TurtlesimTeleopFlow';
import { PackageStructureFlow } from './PackageStructureFlow';
import { PubSubFlow } from './PubSubFlow';
import { ServiceFlow } from './ServiceFlow';
import { ActionFlow } from './ActionFlow';
import { LogLevelsNestedCircle } from './LogLevelsNestedCircle';
import InertiaCalculator from './InertiaCalculator';
import UrdfViewer3D from './UrdfViewer3D';
import AStarSearchInteractive from './AStarSearchInteractive';
import AmclParticleFilterInteractive from './AmclParticleFilterInteractive';
import OccupancyGridMappingInteractive from './OccupancyGridMappingInteractive';
import ContinuousToCSpaceInteractive from './ContinuousToCSpaceInteractive';
import RoadmapMethodsInteractive from './RoadmapMethodsInteractive';
import DwaLocalPlannerInteractive from './DwaLocalPlannerInteractive';

// High-Contrast Terminal & IDE Syntax Highlighter for PPT Slides
export function highlightCodeForDisplay(rawCode, lang = 'bash') {
  if (!rawCode) return '';
  let html = '';
  try {
    html = hljs.highlight(rawCode, { language: lang || 'bash', ignoreIllegals: true }).value;
  } catch {
    try {
      html = hljs.highlightAuto(rawCode).value;
    } catch {
      html = rawCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }

  // If bash / shell script, enrich tokens for rich IDE styling
  if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
    const comments = [];
    html = html.replace(/<span class="hljs-comment">[\s\S]*?<\/span>/g, match => {
      comments.push(match);
      return `___COMMENT_${comments.length - 1}___`;
    });

    // 1. Command flags: e.g. -p, -rf, -lah, -la, -i, -n, -v, --help, +x
    html = html.replace(/(?<=\s|^)(--?[a-zA-Z0-9_\-]+|\+[xrwst]+)(?=\s|$)/g, (m, g1) => `<span class="hljs-flag">${g1}</span>`);

    // 2. Paths, config files, and scripts
    html = html.replace(/(?<=\s|^)(~?\/[a-zA-Z0-9_.\-\/]+|\b[a-zA-Z0-9_\-]+\.(?:py|yaml|yml|sh|bash|xml|launch\.py|txt|log|urdf|xacro|srv|msg|action)\b)/g, (m, g1) => `<span class="hljs-path">${g1}</span>`);

    // 3. Operators: |, &&, ||, ;, >>, >
    html = html.replace(/(?<=\s|^)(\|{1,2}|&&|>>|>|;)(?=\s|$)/g, (m, g1) => `<span class="hljs-operator">${g1}</span>`);

    // Restore comments
    html = html.replace(/___COMMENT_(\d+)___/g, (_, idx) => comments[idx]);
  }

  return html;
}

export function PresentationView({
  lessons = [],
  modules = [],
  initialLessonId = null,
  theme = 'light',
  onToggleTheme,
  onExitPresentation
}) {
  // Determine starting lesson ID
  const [selectedLessonId, setSelectedLessonId] = useState(() => {
    if (initialLessonId && lessons.some(l => l.id === initialLessonId)) {
      return initialLessonId;
    }
    // Check URL hash if available (e.g. #/presentation/01 or #/presentation/lesson_01)
    if (typeof window !== 'undefined') {
      const match = window.location.hash.match(/#\/(?:presentation|slides)\/(\d+)/);
      if (match) {
        const found = lessons.find(l => l.num_str === match[1].padStart(2, '0'));
        if (found) return found.id;
      }
    }
    return lessons[0]?.id || 'lesson_01';
  });

  // Current slide index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
      const slideParam = parseInt(params.get('slide'), 10);
      return !isNaN(slideParam) && slideParam >= 0 ? slideParam : 0;
    }
    return 0;
  });

  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFsControls, setShowFsControls] = useState(true);
  const fsControlsTimeoutRef = useRef(null);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);

  const cardRef = useRef(null);

  // Active lesson object from original lesson source
  const activeLesson = useMemo(() => {
    return lessons.find(l => l.id === selectedLessonId) || lessons[0];
  }, [lessons, selectedLessonId]);

  // Dynamically parse the original lesson into concept slides
  const slides = useMemo(() => {
    if (!activeLesson) return [];
    return parseLessonIntoSlides(activeLesson);
  }, [activeLesson]);

  // Ensure current slide is within bounds
  const currentSlide = slides[currentSlideIndex] || slides[0] || null;

  // Reset quiz states when moving between slides
  useEffect(() => {
    setShowQuizAnswer(false);
    setSelectedQuizOption(null);
    setCopiedCode(false);
  }, [currentSlideIndex, selectedLessonId]);

  // Update hash when slide or lesson changes
  useEffect(() => {
    if (activeLesson && typeof window !== 'undefined') {
      const lessonNum = activeLesson.num_str;
      const targetHash = `#/presentation/${lessonNum}?slide=${currentSlideIndex}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    }
  }, [activeLesson, currentSlideIndex]);

  // Listen for hash changes from external links or browser navigation
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      const match = hash.match(/#\/(?:presentation|slides)\/(\d+)/);
      if (match) {
        const found = lessons.find(l => l.num_str === match[1].padStart(2, '0'));
        if (found && found.id !== selectedLessonId) {
          setSelectedLessonId(found.id);
        }
      }
      const params = new URLSearchParams(hash.split('?')[1] || '');
      const slideParam = parseInt(params.get('slide'), 10);
      if (!isNaN(slideParam) && slideParam >= 0) {
        setCurrentSlideIndex(slideParam);
      }
    };

    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [lessons, selectedLessonId]);

  // Navigation handlers
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      // Advance to next lesson if available
      const currentIdx = lessons.findIndex(l => l.id === selectedLessonId);
      if (currentIdx !== -1 && currentIdx < lessons.length - 1) {
        setSelectedLessonId(lessons[currentIdx + 1].id);
        setCurrentSlideIndex(0);
      }
    }
  }, [currentSlideIndex, slides.length, lessons, selectedLessonId]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    } else {
      // Step back to previous lesson's last slide
      const currentIdx = lessons.findIndex(l => l.id === selectedLessonId);
      if (currentIdx > 0) {
        const prevLesson = lessons[currentIdx - 1];
        const prevSlides = parseLessonIntoSlides(prevLesson);
        setSelectedLessonId(prevLesson.id);
        setCurrentSlideIndex(Math.max(0, prevSlides.length - 1));
      }
    }
  }, [currentSlideIndex, lessons, selectedLessonId]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
      setIsGridOpen(false);
    }
  }, [slides.length]);

  const handleLessonChange = (e) => {
    setSelectedLessonId(e.target.value);
    setCurrentSlideIndex(0);
    setIsGridOpen(false);
  };

  // Fullscreen toggler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && !isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide floating HUD in fullscreen mode
  useEffect(() => {
    if (!isFullscreen) {
      setShowFsControls(true);
      return;
    }

    setShowFsControls(true);

    const handleMouseMove = () => {
      setShowFsControls(true);
      if (fsControlsTimeoutRef.current) {
        clearTimeout(fsControlsTimeoutRef.current);
      }
      fsControlsTimeoutRef.current = setTimeout(() => {
        setShowFsControls(false);
      }, 2500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (fsControlsTimeoutRef.current) {
        clearTimeout(fsControlsTimeoutRef.current);
      }
    };
  }, [isFullscreen]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is inside a select or input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlideIndex(slides.length - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        setIsGridOpen(prev => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        onToggleTheme && onToggleTheme();
      } else if (e.key === 'Escape') {
        if (isGridOpen) {
          setIsGridOpen(false);
        } else if (isFullscreen) {
          toggleFullscreen();
        } else if (onExitPresentation) {
          onExitPresentation();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, isGridOpen, onExitPresentation, onToggleTheme, slides.length]);

  // Highlight embedded HTML code blocks when concept/challenge slide updates
  useEffect(() => {
    if (!cardRef.current) return;
    const codeBlocks = cardRef.current.querySelectorAll('.concept-html-body pre code, .challenge-body pre code');
    codeBlocks.forEach(code => {
      hljs.highlightElement(code);
    });
  }, [currentSlideIndex, currentSlide?.id]);

  // Code copy helper
  const handleCopyCode = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }).catch(() => {});
  };

  // Helper to render interactive component based on interactiveKey
  const renderInteractiveComponent = (key) => {
    switch (key) {
      case 'permission':
        return <PermissionCalculator />;
      case 'turtlesim':
        return <TurtlesimTeleopFlow />;
      case 'package':
        return <PackageStructureFlow />;
      case 'pubsub':
        return <PubSubFlow />;
      case 'service':
        return <ServiceFlow />;
      case 'action':
        return <ActionFlow />;
      case 'urdf':
        return <UrdfViewer3D />;
      case 'inertia':
        return <InertiaCalculator />;
      case 'loglevels':
        return <LogLevelsNestedCircle />;
      case 'astar':
        return <AStarSearchInteractive />;
      case 'amcl':
        return <AmclParticleFilterInteractive />;
      case 'occupancy':
        return <OccupancyGridMappingInteractive />;
      case 'cspace':
        return <ContinuousToCSpaceInteractive />;
      case 'roadmap':
        return <RoadmapMethodsInteractive />;
      case 'dwa':
        return <DwaLocalPlannerInteractive />;
      default:
        return null;
    }
  };

  if (!activeLesson || !currentSlide) {
    return (
      <div className="presentation-loading">
        <p>Loading workshop presentation...</p>
      </div>
    );
  }

  // Calculate overall presentation progress
  const progressPercent = slides.length > 0 ? ((currentSlideIndex + 1) / slides.length) * 100 : 0;

  return (
    <div className={`presentation-viewport ${theme === 'dark' ? 'dark-theme' : 'light-theme'} ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {/* Top Deck Toolbar */}
      {!isFullscreen && (
        <header className="ppt-header">
          <div className="ppt-header-left">
            <button 
              className="ppt-brand-btn" 
              onClick={onExitPresentation}
              title="Exit Presentation & Return to Web LMS"
            >
              <img src="assets/images/ros2_logo.svg" alt="ROS 2" className="ppt-logo" />
              <span className="ppt-brand-label">Level 1 • AMR Instructor PPT</span>
            </button>

            <div className="ppt-header-divider"></div>

            {/* Lesson Selector Dropdown */}
            <div className="ppt-lesson-selector-wrap">
              <select 
                value={selectedLessonId} 
                onChange={handleLessonChange}
                className="ppt-lesson-select"
                title="Switch Lesson Deck"
              >
                {lessons.map(l => (
                  <option key={l.id} value={l.id}>
                    Lesson {l.num_str}: {l.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center: Slide Counter & Scrubber Badge */}
          <div className="ppt-header-center">
            <button 
              className="ppt-slide-counter-btn"
              onClick={() => setIsGridOpen(prev => !prev)}
              title="Open Slide Grid (Press G)"
            >
              <span className="slide-curr-num">Slide {currentSlideIndex + 1}</span>
              <span className="slide-sep">/</span>
              <span className="slide-total-num">{slides.length}</span>
              <Grid size={14} className="counter-icon" />
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="ppt-header-right">
            <button 
              onClick={() => setIsGridOpen(true)}
              className="ppt-tool-btn" 
              title="Slide Grid Overview (Press G)"
            >
              <Grid size={17} />
              <span className="btn-hotkey">G</span>
            </button>

            <button 
              onClick={toggleFullscreen}
              className="ppt-tool-btn" 
              title={isFullscreen ? "Exit Fullscreen (Press F)" : "Fullscreen Mode (Press F)"}
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
              <span className="btn-hotkey">F</span>
            </button>

            <button 
              onClick={onToggleTheme}
              className="ppt-tool-btn" 
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode (Press T)`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              <span className="btn-hotkey">T</span>
            </button>

            <button 
              onClick={onExitPresentation}
              className="ppt-tool-btn ppt-exit-btn" 
              title="Exit Presentation Mode (Press Esc)"
            >
              <X size={18} />
              <span className="exit-label">Exit</span>
            </button>
          </div>
        </header>
      )}

      {/* Progress Line */}
      {!isFullscreen && (
        <div className="ppt-progress-track">
          <div 
            className="ppt-progress-bar" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Central Presentation Canvas Area */}
      <main className="ppt-main-stage">
        <div className={`ppt-card-container ppt-type-${currentSlide.type}`} ref={cardRef}>
          {/* Card Top Category & Section Bar */}
          {!isFullscreen && (
            <div className="ppt-card-top-bar">
              <div className="ppt-card-meta">
                <span className="ppt-module-tag">{activeLesson.module}</span>
                <span className="ppt-lesson-tag">Lesson {activeLesson.num_str}</span>
                {currentSlide.badge && (
                  <span className="ppt-concept-badge">{currentSlide.badge}</span>
                )}
              </div>

              {currentSlide.sectionTitle && (
                <span className="ppt-section-path">{currentSlide.sectionTitle}</span>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 1: UNIFIED LESSON LAUNCHPAD (Hero + Outcomes + Snapshot) */}
          {/* ============================================================== */}
          {currentSlide.type === 'title' && (
            <div className="ppt-slide-content ppt-slide-title-view">
              <div className="title-view-hero">
                <span className="hero-day-pill">{activeLesson.module}</span>
                <h1 className="hero-lesson-title">
                  <span className="title-accent">Lesson {activeLesson.num_str}:</span> {activeLesson.title}
                </h1>
                
                <div className="hero-meta-row">
                  <span className="hero-meta-badge">
                    <Clock size={15} />
                    <span>{activeLesson.duration || '90 Mins'}</span>
                  </span>
                  <span className="hero-meta-badge">
                    <Sparkles size={15} />
                    <span>ROS 2 Jazzy • Level 1</span>
                  </span>
                  <span className="hero-meta-badge">
                    <Layers size={15} />
                    <span>{slides.length} Concept Slides</span>
                  </span>
                </div>

                {activeLesson.focus && (
                  <div className="hero-focus-box">
                    <strong>Core Focus:</strong> {activeLesson.focus}
                  </div>
                )}
              </div>

              {/* Lower Deck: Learning Outcomes & Concept Snapshot */}
              <div className="launchpad-lower-deck">
                {currentSlide.outcomes && currentSlide.outcomes.length > 0 && (
                  <div className="launchpad-panel outcomes-panel">
                    <div className="panel-header">
                      <BookOpen size={17} className="panel-header-icon" />
                      <h3>Core Learning Objectives</h3>
                    </div>
                    <div className="launchpad-outcomes-list">
                      {currentSlide.outcomes.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="launchpad-outcome-item">
                          <span className="outcome-check">✓</span>
                          <span 
                            className="outcome-item-text"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                        </div>
                      ))}
                      {currentSlide.outcomes.length > 4 && (
                        <div className="launchpad-outcomes-more">
                          <span>+{currentSlide.outcomes.length - 4} additional objectives detailed in web LMS</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeLesson.snapshot && activeLesson.snapshot.length > 0 && (
                  <div className="launchpad-panel snapshot-panel">
                    <div className="panel-header">
                      <Zap size={17} className="panel-header-icon zap" />
                      <h3>Key Technical Concepts</h3>
                    </div>
                    <div className="launchpad-snapshot-list">
                      {activeLesson.snapshot.map((item, idx) => (
                        <div key={idx} className="launchpad-snap-item">
                          <span className="snap-bullet">{idx + 1}</span>
                          <div className="snap-item-text">
                            {Array.isArray(item) ? (
                              <><strong>{item[0]}:</strong> {item[1]}</>
                            ) : (
                              item
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 2: ATOMIC COMMAND SLIDE (mkdir, cd, ls, chmod, etc.) */}
          {/* ============================================================== */}
          {currentSlide.type === 'command' && (
            <div className="ppt-slide-content ppt-slide-command-view">
              <div className="cmd-slide-header">
                <div className="cmd-badge-large">
                  {currentSlide.baseBadge || currentSlide.badge}
                </div>
                <div className="cmd-title-group">
                  <div className="cmd-title-row">
                    <h2 className="cmd-slide-title">{currentSlide.title}</h2>
                    {currentSlide.totalUsageSteps > 1 && (
                      <span className="cmd-usage-pill">
                        Usage {currentSlide.usageStep} of {currentSlide.totalUsageSteps}
                      </span>
                    )}
                  </div>
                  {currentSlide.syntax && (
                    <div className="cmd-syntax-strip">
                      <span className="syntax-label">Syntax:</span>
                      <code className="syntax-code">{currentSlide.syntax}</code>
                    </div>
                  )}
                </div>
              </div>

              {currentSlide.desc && (
                <div 
                  className="cmd-slide-desc" 
                  dangerouslySetInnerHTML={{ __html: currentSlide.desc }} 
                />
              )}

              {/* Terminal Code Presentation Window with High-Contrast Syntax Highlighting */}
              {currentSlide.code && (
                <div className="ppt-terminal-window" key={currentSlide.id}>
                  <div className="ppt-term-header">
                    <div className="term-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <div className="term-title-wrapper">
                      <Terminal size={14} className="term-title-icon" />
                      <span className="term-title">student@amr-dev-container:~ (bash)</span>
                    </div>
                    <button 
                      onClick={() => handleCopyCode(currentSlide.code)}
                      className="term-copy-btn"
                      title="Copy Terminal Command"
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="ppt-term-body">
                    <code 
                      className={`hljs language-${currentSlide.lang || 'bash'}`}
                      dangerouslySetInnerHTML={{ __html: highlightCodeForDisplay(currentSlide.code, currentSlide.lang || 'bash') }}
                    />
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 4: CODE STEP WALKTHROUGH                            */}
          {/* ============================================================== */}
          {currentSlide.type === 'code_step' && (
            <div className="ppt-slide-content ppt-slide-code-step-view">
              <div className="step-slide-header">
                <span className="step-badge-pill">{currentSlide.badge}</span>
                <h2 className="step-slide-title">{currentSlide.title}</h2>
              </div>

              {currentSlide.desc && (
                <div 
                  className="step-slide-desc" 
                  dangerouslySetInnerHTML={{ __html: currentSlide.desc }} 
                />
              )}

              {currentSlide.code && (
                <div className="ppt-ide-window" key={currentSlide.id}>
                  <div className="ppt-ide-header">
                    <div className="ide-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <span className="ide-file-tab">
                      <Code2 size={14} />
                      <span>{currentSlide.title}</span>
                    </span>
                    <button 
                      onClick={() => handleCopyCode(currentSlide.code)}
                      className="ide-copy-btn"
                      title="Copy Source Code"
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="ppt-ide-body">
                    <code 
                      className={`hljs language-${currentSlide.lang || 'python'}`}
                      dangerouslySetInnerHTML={{ __html: highlightCodeForDisplay(currentSlide.code, currentSlide.lang || 'python') }}
                    />
                  </pre>
                </div>
              )}

              {currentSlide.breakdown && (
                <div 
                  className="step-breakdown-wrapper"
                  dangerouslySetInnerHTML={{ __html: currentSlide.breakdown }}
                />
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE: CODE STEP ARCHITECTURE BREAKDOWN                  */}
          {/* ============================================================== */}
          {currentSlide.type === 'step_breakdown' && (
            <div className="ppt-slide-content ppt-slide-breakdown-view">
              <div className="step-slide-header">
                <span className="step-badge-pill breakdown-pill">{currentSlide.badge}</span>
                <h2 className="step-slide-title">{currentSlide.title}</h2>
              </div>
              <div 
                className="step-breakdown-wrapper ppt-breakdown-deck"
                dangerouslySetInnerHTML={{ __html: currentSlide.htmlContent }}
              />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 5: INTERACTIVE LIVE COMPONENT SLIDE                  */}
          {/* ============================================================== */}
          {currentSlide.type === 'interactive' && (
            <div className="ppt-slide-content ppt-slide-interactive-view">
              <div className="interactive-stage-container">
                {renderInteractiveComponent(currentSlide.interactiveKey)}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE: SECTION TITLE / TOPIC DIVIDER                      */}
          {/* ============================================================== */}
          {currentSlide.type === 'section_title' && (
            <div className="ppt-slide-content ppt-slide-section-title-view">
              <div className="section-title-hero">
                <h1 className={`section-title-text ${currentSlide.titleClass || ''}`} style={currentSlide.titleColor ? { color: currentSlide.titleColor } : {}}>
                  {currentSlide.title}
                </h1>
                {currentSlide.description && (
                  <p className="section-title-desc">
                    {currentSlide.description}
                  </p>
                )}
                {currentSlide.htmlContent && (
                  <div dangerouslySetInnerHTML={{ __html: currentSlide.htmlContent }} />
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 6: SUBTOPIC / CONCEPT EXPLANATION SLIDE             */}
          {/* ============================================================== */}
          {(currentSlide.type === 'concept' || currentSlide.type === 'subtopic') && (
            <div className="ppt-slide-content ppt-slide-concept-view">
              {currentSlide.title && (
                <div className="concept-slide-header">
                  <div className="concept-title-row">
                    {currentSlide.badge && (
                      <span className="concept-badge-tag">{currentSlide.badge}</span>
                    )}
                    <h2 className="concept-main-title">{currentSlide.title}</h2>
                  </div>
                  <div className="concept-header-divider" />
                </div>
              )}

              <div 
                className="concept-html-body markdown-body"
                dangerouslySetInnerHTML={{ __html: currentSlide.htmlContent }}
              />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 7: HANDS-ON STUDENT CHALLENGE SLIDE                  */}
          {/* ============================================================== */}
          {currentSlide.type === 'challenge' && (
            <div className="ppt-slide-content ppt-slide-challenge-view">
              <div className="challenge-banner">
                <Sparkles size={24} className="banner-icon" />
                <div>
                  <span className="banner-sub">Hands-On Practical Lab</span>
                  <h2 className="banner-title">{currentSlide.title}</h2>
                </div>
              </div>

              <div 
                className="challenge-content-body ppt-challenge-briefing"
                dangerouslySetInnerHTML={{ __html: currentSlide.htmlContent }}
              />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 8: INTERACTIVE QUIZ QUESTION SLIDE                   */}
          {/* ============================================================== */}
          {currentSlide.type === 'quiz' && (
            <div className="ppt-slide-content ppt-slide-quiz-view">
              <div className="quiz-slide-header">
                <span className="quiz-badge-pill">
                  <HelpCircle size={15} />
                  <span>Concept Assessment • {currentSlide.title}</span>
                </span>
                <h2 className="quiz-question-text">{currentSlide.question}</h2>
              </div>

              {/* Quiz Options */}
              <div className="quiz-options-deck">
                {currentSlide.options.map((option, optIdx) => {
                  const isCorrect = optIdx === currentSlide.answer;
                  const isSelected = selectedQuizOption === optIdx;
                  
                  let optionClass = 'quiz-option-card';
                  if (showQuizAnswer) {
                    if (isCorrect) optionClass += ' answer-correct';
                    else if (isSelected) optionClass += ' answer-wrong';
                  } else if (isSelected) {
                    optionClass += ' option-selected';
                  }

                  return (
                    <button
                      key={optIdx}
                      className={optionClass}
                      onClick={() => setSelectedQuizOption(optIdx)}
                    >
                      <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                      <span className="opt-label">{option}</span>
                      {showQuizAnswer && isCorrect && (
                        <CheckCircle2 size={20} className="status-mark correct" />
                      )}
                      {showQuizAnswer && isSelected && !isCorrect && (
                        <AlertCircle size={20} className="status-mark wrong" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instructor Answer Reveal Controls */}
              <div className="quiz-instructor-bar">
                <button
                  className={`reveal-answer-btn ${showQuizAnswer ? 'revealed' : ''}`}
                  onClick={() => setShowQuizAnswer(prev => !prev)}
                >
                  <Sparkles size={16} />
                  <span>{showQuizAnswer ? 'Hide Explanation' : 'Reveal Answer & Pedagogical Breakdown'}</span>
                </button>

                {showQuizAnswer && (
                  <div className="quiz-explanation-box fade-in">
                    <div className="exp-header">
                      <CheckCircle2 size={18} className="exp-icon" />
                      <strong>Correct Answer: Option {String.fromCharCode(65 + currentSlide.answer)}</strong>
                    </div>
                    <p className="exp-text">{currentSlide.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE TYPE 9: LESSON WRAP-UP & SUMMARY SLIDE                    */}
          {/* ============================================================== */}
          {currentSlide.type === 'summary' && (
            <div className="ppt-slide-content ppt-slide-summary-view">
              <div className="summary-hero">
                <CheckCircle2 size={48} className="summary-success-icon" />
                <h2 className="summary-title">{currentSlide.title}</h2>
                <p className="summary-desc">
                  Congratulations! You have completed all lecture topics, code walkthroughs, and hands-on exercises for Lesson {activeLesson.num_str}.
                </p>
              </div>

              <div className="summary-action-card">
                <h3>What's Next in the 3-Day Autonomous AMR Workshop?</h3>
                {activeLesson.next_id ? (
                  <button 
                    onClick={goToNextSlide} 
                    className="summary-next-btn"
                  >
                    <span>Advance to Next Lesson</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <p className="workshop-complete-note">
                    🎉 You have reached the end of the foundational robotics curriculum!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Deck Navigation Dock (Standard Card Mode) */}
      {!isFullscreen && (
        <footer className="ppt-footer">
          <div className="ppt-footer-left">
            <button 
              onClick={goToPrevSlide} 
              className="ppt-nav-btn prev-btn"
              disabled={currentSlideIndex === 0 && lessons.findIndex(l => l.id === selectedLessonId) === 0}
              title="Previous Slide (Press Left Arrow)"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
              <span className="key-hint">←</span>
            </button>
          </div>

          {/* Center: Slide Dots / Mini Scrubber */}
          <div className="ppt-footer-center">
            <div className="ppt-dots-container">
              {slides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  onClick={() => goToSlide(idx)}
                  className={`ppt-dot ${idx === currentSlideIndex ? 'active' : ''} type-${s.type}`}
                  title={`Jump to Slide ${idx + 1}: ${s.title}`}
                />
              ))}
            </div>
          </div>

          <div className="ppt-footer-right">
            <button 
              onClick={goToNextSlide} 
              className="ppt-nav-btn next-btn"
              title="Next Slide (Press Right Arrow or Space)"
            >
              <span>Next</span>
              <span className="key-hint">→</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      )}

      {/* Floating Presentation HUD in Fullscreen Mode */}
      {isFullscreen && (
        <>
          {/* Company Brand Logo on Top Left in Fullscreen */}
          <div className="ppt-fs-company-brand" title="Botforge Robotics">
            <img 
              src={theme === 'dark' ? 'assets/images/botforge_white.png' : 'assets/images/botforge_black.png'} 
              alt="Botforge Robotics" 
              className="ppt-fs-company-logo" 
            />
          </div>

          {/* Subtle top-right exit button */}
          <button 
            className={`ppt-fs-top-exit-btn ${showFsControls ? 'visible' : ''}`}
            onClick={toggleFullscreen}
            title="Exit Fullscreen (Press Esc or F)"
          >
            <Minimize2 size={18} />
          </button>

          {/* Floating presentation controller dock at bottom center */}
          <div className={`ppt-fs-hud-dock ${showFsControls ? 'visible' : ''}`}>
            <button 
              onClick={goToPrevSlide} 
              className="fs-hud-btn"
              disabled={currentSlideIndex === 0 && lessons.findIndex(l => l.id === selectedLessonId) === 0}
              title="Previous Slide (←)"
            >
              <ChevronLeft size={18} />
            </button>

            <button 
              onClick={() => setIsGridOpen(true)}
              className="fs-hud-counter-btn"
              title="Slide Overview (Press G)"
            >
              <span className="fs-curr-num">{currentSlideIndex + 1}</span>
              <span className="fs-sep">/</span>
              <span className="fs-total-num">{slides.length}</span>
              <Grid size={13} className="fs-grid-icon" />
            </button>

            <button 
              onClick={goToNextSlide} 
              className="fs-hud-btn"
              title="Next Slide (→ or Space)"
            >
              <ChevronRight size={18} />
            </button>

            <div className="fs-hud-divider"></div>

            <button 
              onClick={onToggleTheme}
              className="fs-hud-btn"
              title={`Switch Theme (T)`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button 
              onClick={toggleFullscreen}
              className="fs-hud-btn fs-hud-exit-btn"
              title="Exit Fullscreen (Esc or F)"
            >
              <Minimize2 size={16} />
              <span className="fs-exit-text">Exit</span>
            </button>
          </div>
        </>
      )}

      {/* Slide Grid / Overview Drawer Modal (Triggered by G or click on counter) */}
      {isGridOpen && (
        <div className="ppt-grid-modal-overlay fade-in" onClick={() => setIsGridOpen(false)}>
          <div className="ppt-grid-modal-card" onClick={e => e.stopPropagation()}>
            <div className="grid-modal-header">
              <div className="grid-modal-title">
                <Grid size={20} />
                <h3>Slide Deck Overview • Lesson {activeLesson.num_str} ({slides.length} Slides)</h3>
              </div>
              <button 
                className="grid-modal-close-btn" 
                onClick={() => setIsGridOpen(false)}
                title="Close Overview (Press Esc)"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid-cards-scroller">
              {slides.map((slide, idx) => (
                <div 
                  key={slide.id || idx}
                  className={`grid-slide-thumb ${idx === currentSlideIndex ? 'current-active' : ''}`}
                  onClick={() => goToSlide(idx)}
                >
                  <div className="thumb-top">
                    <span className="thumb-index">#{idx + 1}</span>
                    <span className={`thumb-type-tag type-${slide.type}`}>{slide.type}</span>
                  </div>
                  <h4 className="thumb-title">{slide.title}</h4>
                  {slide.badge && <span className="thumb-badge">{slide.badge}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PresentationView;
