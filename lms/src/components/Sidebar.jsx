import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  CheckSquare, 
  Square,
  Award,
  Layers,
  MessageSquare
} from 'lucide-react';

export function Sidebar({ 
  modules, 
  lessons, 
  currentLessonId, 
  onSelectLesson, 
  onNavigateHub, 
  completedLessons, 
  onToggleComplete, 
  quizScores,
  progressPercent,
  completedCount,
  totalLessons,
  onResetProgress,
  isOpenMobile,
  onCloseMobile
}) {
  // Expand the active lesson's module by default
  const activeLesson = lessons.find(l => l.id === currentLessonId);
  const activeModuleId = activeLesson ? activeLesson.module_id : 1;

  const [expandedModules, setExpandedModules] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });

  // Exclusive accordion: only ONE lesson can have its subtopics expanded at a time
  const [expandedLessonId, setExpandedLessonId] = useState(currentLessonId);

  // Automatically expand subtopics for the newly selected active lesson and close any other
  useEffect(() => {
    if (currentLessonId) {
      setExpandedLessonId(currentLessonId);
    }
  }, [currentLessonId]);

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const toggleSubtopics = (e, lessonId) => {
    e.stopPropagation();
    // If clicking the currently open lesson, close it; otherwise open this one and close any others
    setExpandedLessonId(prev => (prev === lessonId ? null : lessonId));
  };

  const handleSubtopicClick = (e, lessonId, subtopicId) => {
    e.preventDefault();
    e.stopPropagation();
    if (lessonId !== currentLessonId) {
      onSelectLesson(lessonId);
      setTimeout(() => {
        const el = document.getElementById(subtopicId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    } else {
      const el = document.getElementById(subtopicId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (isOpenMobile) onCloseMobile();
  };

  return (
    <>
      {isOpenMobile && (
        <div 
          className="sidebar-backdrop" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      
      <aside className={`app-sidebar ${isOpenMobile ? 'open-mobile' : ''}`}>
        {/* Progress Card */}
        <div className="sidebar-progress-card">
          <div className="progress-card-top">
            <div className="progress-title-row">
              <span className="progress-label">Curriculum Progress</span>
              <span className="progress-badge">{progressPercent}%</span>
            </div>
            <span className="progress-count">{completedCount} of {totalLessons} completed</span>
          </div>

          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button 
            onClick={onResetProgress} 
            className="reset-progress-btn"
            title="Reset curriculum checklist"
          >
            <RotateCcw size={12} />
            <span>Reset Checklist</span>
          </button>
        </div>

        {/* Course Hub Quick Button */}
        <button 
          onClick={() => {
            onNavigateHub();
            if (isOpenMobile) onCloseMobile();
          }}
          className={`sidebar-hub-nav-btn ${!currentLessonId ? 'active' : ''}`}
        >
          <BookOpen size={16} />
          <span>Curriculum Hub Overview</span>
        </button>

        {/* Modules Accordion */}
        <div className="sidebar-modules-list">
          {modules.map((mod) => {
            const isExpanded = expandedModules[mod.id];
            const modLessons = lessons.filter(l => l.module_id === mod.id || Number(String(l.module_id).replace(/\D/g, '')) === mod.id);
            const modCompletedCount = modLessons.filter(l => completedLessons.includes(l.id)).length;
            const isModComplete = modCompletedCount === modLessons.length && modLessons.length > 0;

            return (
              <div key={mod.id} className="sidebar-module-section">
                <button 
                  className={`module-header-btn ${isModComplete ? 'completed-module' : ''}`}
                  onClick={() => toggleModule(mod.id)}
                >
                  <div className="module-header-left">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span className="module-name">
                      {mod.name}
                    </span>
                  </div>
                  <span className="module-count-badge">
                    {modCompletedCount}/{modLessons.length}
                  </span>
                </button>

                {isExpanded && (
                  <ul className="sidebar-lesson-items">
                    {modLessons.map((l) => {
                      const isActive = l.id === currentLessonId;
                      const isCompleted = completedLessons.includes(l.id);
                      const quizInfo = quizScores[l.id];

                      return (
                        <li key={l.id}>
                          <div 
                            className={`sidebar-lesson-row ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                            onClick={() => {
                              onSelectLesson(l.id);
                              if (isOpenMobile) onCloseMobile();
                            }}
                          >
                            <button
                              type="button"
                              className="lesson-checkbox-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleComplete(l.id);
                              }}
                              title={isCompleted ? "Mark incomplete" : "Mark completed"}
                              aria-label={`Toggle completed for ${l.title}`}
                            >
                              {isCompleted ? (
                                <CheckSquare size={16} className="checked-icon" />
                              ) : (
                                <Square size={16} className="unchecked-icon" />
                              )}
                            </button>

                            <span className="lesson-row-num">{l.num_str}</span>

                            <span className="lesson-row-title" title={l.title}>
                              {l.title}
                            </span>

                            {quizInfo && quizInfo.passed && (
                              <span className="quiz-passed-star" title={`Quiz Passed: ${quizInfo.score}/${quizInfo.total}`}>
                                ⭐
                              </span>
                            )}

                            {l.subtopics && l.subtopics.length > 0 && (
                              <button
                                type="button"
                                className="subtopic-toggle-btn"
                                onClick={(e) => toggleSubtopics(e, l.id)}
                                title={expandedLessonId === l.id ? "Collapse subtopics" : "Expand subtopics"}
                                aria-label="Toggle subtopics"
                              >
                                {expandedLessonId === l.id ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                              </button>
                            )}
                          </div>

                          {/* Collapsible Subtopics Under Lesson */}
                          {expandedLessonId === l.id && l.subtopics && l.subtopics.length > 0 && (
                            <ul className="sidebar-subtopics-list">
                              {l.subtopics.map((st) => (
                                <li key={st.id} className="sidebar-subtopic-item">
                                  <a
                                    href={`#${st.id}`}
                                    className="sidebar-subtopic-link"
                                    onClick={(e) => handleSubtopicClick(e, l.id, st.id)}
                                    title={st.title}
                                  >
                                    <span className="subtopic-bullet" />
                                    <span className="subtopic-text">{st.title}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Capstone Course Feedback & Survey */}
        <div className="sidebar-feedback-nav-section" style={{ marginTop: '1.25rem', paddingBottom: '1.5rem' }}>
          <button 
            onClick={() => {
              onSelectLesson('feedback');
              if (isOpenMobile) onCloseMobile();
            }}
            className={`sidebar-feedback-nav-btn ${currentLessonId === 'feedback' ? 'active' : ''}`}
            title="Course Feedback & Survey"
          >
            <MessageSquare size={16} className="feedback-nav-icon" />
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span className="feedback-nav-title">Course Feedback &amp; Survey</span>
              <span className="feedback-nav-sub" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Share your learning experience
              </span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
