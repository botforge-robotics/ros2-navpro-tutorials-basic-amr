import React, { useState, useEffect, useCallback } from 'react';
import lessonsData from './data/lessonsData.json';
import { useProgress } from './hooks/useProgress';
import { useInstructorSync } from './hooks/useInstructorSync';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HubOverview } from './components/HubOverview';
import { LessonView } from './components/LessonView';
import { RegistrationModal } from './components/RegistrationModal';
import { HelpModal } from './components/HelpModal';
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

  const {
    studentInfo,
    isModalOpen,
    setIsModalOpen,
    connectionStatus,
    workshopName,
    gates,
    registerStudent,
    submitFeedback
  } = useInstructorSync(completedLessons, quizScores, currentLessonId);

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('navpro_l1_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Active lesson object
  const activeLesson = lessonsData.lessons.find(l => l.id === currentLessonId) || null;

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === '[' || e.key === 'p') {
        if (activeLesson && activeLesson.prev_id) {
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
  }, [activeLesson, setCurrentLessonId]);

  return (
    <div className="app-root">
      {/* Top Navbar */}
      <Navbar
        onNavigateHub={() => setCurrentLessonId(null)}
        onSelectLesson={(id) => setCurrentLessonId(id)}
        lessons={lessonsData.lessons}
        studentInfo={studentInfo}
        connectionStatus={connectionStatus}
        workshopName={workshopName}
        onOpenSyncModal={() => setIsModalOpen(true)}
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
          onToggleComplete={toggleLessonComplete}
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
              onToggleComplete={toggleLessonComplete}
              savedScore={quizScores[activeLesson.id]}
              onRecordScore={recordQuizScore}
              isQuizGateOpen={gates.gate_quizzes_open}
              onOpenSyncModal={() => setIsModalOpen(true)}
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

      {/* Workshop Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studentInfo={studentInfo}
        onRegister={registerStudent}
        connectionStatus={connectionStatus}
        workshopName={workshopName}
        gates={gates}
        onSubmitFeedback={submitFeedback}
      />

      {/* Persistence, Docker & Reset Help Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}

export default App;
