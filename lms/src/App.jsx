import React, { useState, useEffect, useCallback } from 'react';
import lessonsData from './data/lessonsData.json';
import { useProgress } from './hooks/useProgress';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HubOverview } from './components/HubOverview';
import { LessonView } from './components/LessonView';
import { FeedbackView } from './components/FeedbackView';
import { HelpModal } from './components/HelpModal';
import { PageScrollNav } from './components/PageScrollNav';
import { PresentationView } from './components/PresentationView';
import './App.css';

export function App() {
  const {
    completedLessons,
    quizScores,
    currentLessonId,
    setCurrentLessonId,
    toggleLessonComplete,
    recordQuizScore,
    resetProgress,
    progressPercent,
    completedCount,
    totalLessons
  } = useProgress(lessonsData.total_lessons);

  const handleToggleComplete = useCallback((lessonId) => {
    toggleLessonComplete(lessonId);
  }, [toggleLessonComplete]);

  const handleRecordScore = useCallback((lessonId, score, total) => {
    recordQuizScore(lessonId, score, total);
  }, [recordQuizScore]);

  // Help modal state
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Theme management
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('navpro_l1_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Presentation Mode Route Handling (#/presentation or #/slides)
  const [isPresentationMode, setIsPresentationMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash.startsWith('#/presentation') || window.location.hash.startsWith('#/slides');
  });

  useEffect(() => {
    const handleHashCheck = () => {
      setIsPresentationMode(
        window.location.hash.startsWith('#/presentation') || window.location.hash.startsWith('#/slides')
      );
    };
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('navpro_l1_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Global clipboard synchronizer to container X11 / VNC desktop
  useEffect(() => {
    const handleCopy = () => {
      setTimeout(async () => {
        try {
          const selectedText = window.getSelection()?.toString();
          if (selectedText && selectedText.trim()) {
            fetch('/api/clipboard', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: selectedText.trim() })
            }).catch(() => {});
          }
        } catch {}
      }, 50);
    };

    window.addEventListener('copy', handleCopy);
    return () => window.removeEventListener('copy', handleCopy);
  }, []);

  // Active lesson object
  const activeLesson = lessonsData.lessons.find(l => l.id === currentLessonId) || null;

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === '[' || e.key === 'p') {
        if (currentLessonId === 'feedback') {
          setCurrentLessonId('lesson_22');
        } else if (activeLesson && activeLesson.prev_id) {
          setCurrentLessonId(activeLesson.prev_id);
        }
      } else if (e.key === ']' || e.key === 'n') {
        if (activeLesson && activeLesson.next_id) {
          setCurrentLessonId(activeLesson.next_id);
        }
      } else if (e.key === 'h') {
        setCurrentLessonId(null);
      } else if (e.key === 'm') {
        setIsSidebarOpenMobile(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLesson, currentLessonId, setCurrentLessonId]);

  // Fullscreen Presentation Mode ("PPT") View
  if (isPresentationMode) {
    return (
      <PresentationView
        lessons={lessonsData.lessons}
        modules={lessonsData.modules}
        initialLessonId={currentLessonId}
        theme={theme}
        onToggleTheme={toggleTheme}
        onExitPresentation={() => {
          setIsPresentationMode(false);
          window.location.hash = currentLessonId ? `#/lesson/${currentLessonId.replace('lesson_', '')}` : '#/';
        }}
      />
    );
  }

  return (
    <div className="app-root">
      {/* Top Navbar */}
      <Navbar
        onNavigateHub={() => setCurrentLessonId(null)}
        onSelectLesson={(id) => setCurrentLessonId(id)}
        lessons={lessonsData.lessons}
        currentLessonId={currentLessonId}
        onOpenHelpModal={() => setIsHelpModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleSidebarMobile={() => setIsSidebarOpenMobile(prev => !prev)}
      />

      <div className="app-main-layout">
        {/* Left Sidebar */}
        <Sidebar
          modules={lessonsData.modules}
          lessons={lessonsData.lessons}
          currentLessonId={currentLessonId}
          onSelectLesson={(id) => setCurrentLessonId(id)}
          onNavigateHub={() => setCurrentLessonId(null)}
          completedLessons={completedLessons}
          onToggleComplete={handleToggleComplete}
          quizScores={quizScores}
          progressPercent={progressPercent}
          completedCount={completedCount}
          totalLessons={totalLessons}
          onResetProgress={resetProgress}
          isOpenMobile={isSidebarOpenMobile}
          onCloseMobile={() => setIsSidebarOpenMobile(false)}
        />

        {/* Central Content Area */}
        <main className="app-content-container">
          {activeLesson ? (
            <LessonView
              lesson={activeLesson}
              onSelectLesson={(id) => setCurrentLessonId(id)}
              onNavigateHub={() => setCurrentLessonId(null)}
              isCompleted={completedLessons.includes(activeLesson.id)}
              onToggleComplete={handleToggleComplete}
              savedScore={quizScores[activeLesson.id]}
              onRecordScore={handleRecordScore}
            />
          ) : currentLessonId === 'feedback' ? (
            <FeedbackView
              onNavigateHub={() => setCurrentLessonId(null)}
              onSelectLesson={(id) => setCurrentLessonId(id)}
              completedCount={completedCount}
              totalLessons={totalLessons}
            />
          ) : (
            <HubOverview
              modules={lessonsData.modules}
              lessons={lessonsData.lessons}
              onSelectLesson={(id) => setCurrentLessonId(id)}
              completedLessons={completedLessons}
              progressPercent={progressPercent}
              completedCount={completedCount}
              totalLessons={totalLessons}
            />
          )}
        </main>
      </div>

      {/* Floating Page Up / Page Down Direct Scroll Arrows */}
      <PageScrollNav />

      {/* Persistence, Docker & Reset Help Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}

export default App;
