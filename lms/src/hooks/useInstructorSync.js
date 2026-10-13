import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY_STUDENT = 'navpro_student_info';

export function useInstructorSync(completedLessons, quizScores, currentLessonId) {
  const [studentInfo, setStudentInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: '',
      email_roll: '',
      org_college: '',
      host_ip: window.location.hostname || 'localhost',
      registered: false,
      student_id: null
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('offline'); // 'connected' | 'connecting' | 'offline'
  const [workshopName, setWorkshopName] = useState('Local Study Mode');
  const [gates, setGates] = useState({
    gate_quizzes_open: true,
    gate_assignments_open: true,
    gate_feedback_open: false
  });

  const heartbeatRef = useRef(null);

  // Determine base API URL
  const getApiBase = useCallback((ip) => {
    const host = ip || studentInfo.host_ip || 'localhost';
    const port = 9000;
    return `http://${host}:${port}`;
  }, [studentInfo.host_ip]);

  // Register student with host
  const registerStudent = useCallback(async (info) => {
    try {
      setConnectionStatus('connecting');
      const apiBase = getApiBase(info.host_ip);
      const res = await fetch(`${apiBase}/api/sync/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: info.name,
          email_roll: info.email_roll,
          org_college: info.org_college,
          level: 'Level 1: ROS 2 Foundations'
        })
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      
      const updated = {
        ...info,
        registered: true,
        student_id: data.student_id || info.email_roll
      };
      setStudentInfo(updated);
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));
      setConnectionStatus('connected');
      if (data.workshop_name) setWorkshopName(data.workshop_name);
      return { success: true };
    } catch (err) {
      console.warn('Workshop registration failed (continuing in offline mode):', err.message);
      // Still save locally so student isn't blocked
      const updated = {
        ...info,
        registered: true,
        student_id: info.email_roll || `local_${Date.now()}`
      };
      setStudentInfo(updated);
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));
      setConnectionStatus('offline');
      return { success: false, error: err.message };
    }
  }, [getApiBase]);

  // Periodic heartbeat sync
  const sendHeartbeat = useCallback(async () => {
    if (!studentInfo.registered || !studentInfo.student_id) return;

    try {
      const apiBase = getApiBase(studentInfo.host_ip);
      const res = await fetch(`${apiBase}/api/sync/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentInfo.student_id,
          level: 'Level 1: ROS 2 Foundations',
          active_lesson: currentLessonId || 'overview',
          completed_count: completedLessons.length,
          completed_lessons: completedLessons,
          quiz_scores: quizScores
        })
      });

      if (res.ok) {
        const data = await res.json();
        setConnectionStatus('connected');
        if (data.workshop_name) setWorkshopName(data.workshop_name);
        if (data.gates) setGates(data.gates);
      } else {
        setConnectionStatus('offline');
      }
    } catch (e) {
      setConnectionStatus('offline');
    }
  }, [studentInfo, completedLessons, quizScores, currentLessonId, getApiBase]);

  // Run heartbeat on interval (12 seconds)
  useEffect(() => {
    sendHeartbeat();
    heartbeatRef.current = setInterval(sendHeartbeat, 12000);
    return () => clearInterval(heartbeatRef.current);
  }, [sendHeartbeat]);

  // Check if first-time visitor needs registration
  useEffect(() => {
    if (!studentInfo.registered) {
      const timer = setTimeout(() => setIsModalOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [studentInfo.registered]);

  // Submit feedback
  const submitFeedback = useCallback(async (rating, comments) => {
    try {
      const apiBase = getApiBase(studentInfo.host_ip);
      const res = await fetch(`${apiBase}/api/sync/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentInfo.student_id,
          rating,
          comments
        })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }, [getApiBase, studentInfo]);

  return {
    studentInfo,
    isModalOpen,
    setIsModalOpen,
    connectionStatus,
    workshopName,
    gates,
    registerStudent,
    submitFeedback,
    sendHeartbeat
  };
}
