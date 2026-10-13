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
import { StudentChatModal } from './components/StudentChatModal';
import { MessageSquare, Hand } from 'lucide-react';
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
    submitFeedback,
    syncProgressNow,
    chatMessages,
    unreadChatCount,
    isHandRaised,
    isChatOpen,
    openChatModal,
    closeChatModal,
    sendChatMessage,
    raiseHand,
    lowerHand
  } = useInstructorSync(completedLessons, quizScores, currentLessonId);

  // Immediate sync wrapper for marking lessons completed
  const handleToggleComplete = useCallback((lessonId) => {
    let nextCompleted;
    if (completedLessons.includes(lessonId)) {
      nextCompleted = completedLessons.filter(id => id !== lessonId);
    } else {
      nextCompleted = [...completedLessons, lessonId];
    }
    toggleLessonComplete(lessonId);
    syncProgressNow(nextCompleted, quizScores, currentLessonId);
  }, [completedLessons, toggleLessonComplete, syncProgressNow, quizScores, currentLessonId]);

  // Immediate sync wrapper for quiz scoring
  const handleRecordScore = useCallback((lessonId, score, total) => {
    recordQuizScore(lessonId, score, total);
    const passed = score === total;
    const nextCompleted = (passed && !completedLessons.includes(lessonId)) 
      ? [...completedLessons, lessonId] 
      : completedLessons;
    const nextQuizzes = {
      ...quizScores,
      [lessonId]: { score, total, passed, timestamp: Date.now() }
    };
    syncProgressNow(nextCompleted, nextQuizzes, currentLessonId);
  }, [recordQuizScore, completedLessons, quizScores, currentLessonId, syncProgressNow]);

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
        onOpenChatModal={openChatModal}
        unreadChatCount={unreadChatCount}
        isHandRaised={isHandRaised}
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

      {/* Floating Quick Action Button for Group Chat & Raise Hand */}
      <button
        onClick={openChatModal}
        className={`floating-chat-trigger ${isHandRaised ? 'hand-raised' : ''}`}
        title="Open Live Workshop Group Chat & Doubts"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.75rem 1.15rem',
          borderRadius: '30px',
          background: isHandRaised ? '#d97706' : 'var(--accent-primary)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.88rem'
        }}
      >
        {isHandRaised ? <Hand size={18} /> : <MessageSquare size={18} />}
        <span>{isHandRaised ? 'Hand Raised' : 'Group Chat'}</span>
        {unreadChatCount > 0 && !isHandRaised && (
          <span style={{
            background: '#ef4444',
            color: '#fff',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '0.72rem',
            fontWeight: 800
          }}>
            {unreadChatCount}
          </span>
        )}
      </button>

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

      {/* Live Group Chat & Raise Hand Modal */}
      <StudentChatModal
        isOpen={isChatOpen}
        onClose={closeChatModal}
        studentInfo={studentInfo}
        connectionStatus={connectionStatus}
        chatMessages={chatMessages}
        isHandRaised={isHandRaised}
        activeLessonId={currentLessonId}
        onSendMessage={sendChatMessage}
        onRaiseHand={raiseHand}
        onLowerHand={lowerHand}
        onOpenSyncModal={() => setIsModalOpen(true)}
      />
    </div>
  );
}

export default App;
