import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_COMPLETED = 'navpro_l1_completed_lessons';
const STORAGE_KEY_QUIZZES = 'navpro_l1_quiz_scores';
const STORAGE_KEY_CURRENT = 'navpro_l1_current_lesson';

export function useProgress(totalLessons = 26) {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizScores, setQuizScores] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUIZZES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentLessonId, setCurrentLessonId] = useState(() => {
    try {
      // Check URL hash first (e.g. #/lesson/01)
      const hash = window.location.hash;
      const match = hash.match(/#\/lesson\/(\d+)/);
      if (match) {
        return `lesson_${match[1].padStart(2, '0')}`;
      }
      return localStorage.getItem(STORAGE_KEY_CURRENT) || null;
    } catch {
      return null;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedLessons));
    } catch (e) {
      console.error('Failed to save completed lessons', e);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(quizScores));
    } catch (e) {
      console.error('Failed to save quiz scores', e);
    }
  }, [quizScores]);

  useEffect(() => {
    try {
      if (currentLessonId) {
        localStorage.setItem(STORAGE_KEY_CURRENT, currentLessonId);
        window.location.hash = `#/lesson/${currentLessonId.replace('lesson_', '')}`;
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT);
        window.location.hash = '#/';
      }
    } catch (e) {
      console.error('Failed to save current lesson', e);
    }
  }, [currentLessonId]);

  // Listen for hash change in browser
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/' || hash === '#') {
        setCurrentLessonId(null);
      } else {
        const match = hash.match(/#\/lesson\/(\d+)/);
        if (match) {
          setCurrentLessonId(`lesson_${match[1].padStart(2, '0')}`);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleLessonComplete = useCallback((lessonId) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) {
        return prev.filter(id => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  }, []);

  const markLessonComplete = useCallback((lessonId) => {
    setCompletedLessons(prev => {
      if (!prev.includes(lessonId)) {
        return [...prev, lessonId];
      }
      return prev;
    });
  }, []);

  const recordQuizScore = useCallback((lessonId, score, total) => {
    const passed = score === total;
    setQuizScores(prev => ({
      ...prev,
      [lessonId]: { score, total, passed, timestamp: Date.now() }
    }));
    if (passed) {
      markLessonComplete(lessonId);
    }
  }, [markLessonComplete]);

  const resetProgress = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all curriculum progress and quiz scores?')) {
      setCompletedLessons([]);
      setQuizScores({});
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem(STORAGE_KEY_QUIZZES);
    }
  }, []);

  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  return {
    completedLessons,
    quizScores,
    currentLessonId,
    setCurrentLessonId,
    toggleLessonComplete,
    markLessonComplete,
    recordQuizScore,
    resetProgress,
    progressPercent,
    completedCount: completedLessons.length,
    totalLessons
  };
}
