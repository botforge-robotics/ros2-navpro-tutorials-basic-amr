import React, { useState } from 'react';
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
  Layers
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

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
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
            const modLessons = lessons.filter(l => l.module_id === mod.id);
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
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
