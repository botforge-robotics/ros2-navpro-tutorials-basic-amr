import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY_STUDENT = 'navpro_student_info';

export function sanitizeHostIp(raw) {
  if (!raw) return 'localhost';
  let clean = String(raw).trim();
  // Strip protocol (http:// or https://)
  clean = clean.replace(/^https?:\/\//i, '');
  // Strip trailing path
  clean = clean.split('/')[0];
  // Strip port (e.g. :9000)
  clean = clean.split(':')[0];
  return clean || 'localhost';
}

export function detectLocalIp() {
  return new Promise((resolve) => {
    try {
      const host = window.location.hostname;
      if (host && host !== 'localhost' && host !== '127.0.0.1' && /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(host)) {
        return resolve(host);
      }
      const RTCPc = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      if (!RTCPc) return resolve(null);
      const pc = new RTCPc({ iceServers: [] });
      let done = false;
      pc.createDataChannel('');
      pc.createOffer().then((o) => pc.setLocalDescription(o)).catch(() => resolve(null));
      pc.onicecandidate = (evt) => {
        if (!evt || !evt.candidate || !evt.candidate.candidate) return;
        const line = evt.candidate.candidate;
        const match = line.match(/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/);
        if (match && !match[1].startsWith('127.') && !match[1].startsWith('0.')) {
          if (!done) {
            done = true;
            try { pc.close(); } catch {}
            return resolve(match[1]);
          }
        }
      };
      setTimeout(() => {
        if (!done) {
          done = true;
          try { pc.close(); } catch {}
          resolve(null);
        }
      }, 1200);
    } catch {
      resolve(null);
    }
  });
}

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
      workshop_id: null,
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

  // Chat & Raise Hand State
  const [chatMessages, setChatMessages] = useState([]);
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [heartbeatCount, setHeartbeatCount] = useState(0);

  const heartbeatRef = useRef(null);
  const chatPollRef = useRef(null);
  const lastChatIdRef = useRef(0);
  const isChatOpenRef = useRef(isChatOpen);
  isChatOpenRef.current = isChatOpen;

  // Determine base API URL
  const getApiBase = useCallback((ip) => {
    const host = sanitizeHostIp(ip || studentInfo.host_ip);
    return `http://${host}:9000`;
  }, [studentInfo.host_ip]);

  // Register student with host
  const registerStudent = useCallback(async (info) => {
    try {
      setConnectionStatus('connecting');
      const cleanIp = sanitizeHostIp(info.host_ip);
      const apiBase = getApiBase(cleanIp);
      const res = await fetch(`${apiBase}/api/sync/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: info.student_id || info.email_roll,
          name: info.name,
          email: info.email_roll,
          email_roll: info.email_roll,
          organization: info.org_college,
          org_college: info.org_college,
          client_ip: info.client_ip || undefined,
          level: 'level1'
        })
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      
      const updated = {
        ...info,
        host_ip: cleanIp,
        registered: true,
        workshop_id: data.workshop_id || null,
        student_id: data.student_id || info.email_roll
      };
      setStudentInfo(updated);
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));
      setConnectionStatus('connected');
      if (data.workshop_name) setWorkshopName(data.workshop_name);
      return { success: true };
    } catch (err) {
      console.warn('Workshop registration failed (host unreachable):', err.message);
      const cleanIp = sanitizeHostIp(info.host_ip);
      const updated = {
        ...info,
        host_ip: cleanIp,
        registered: false,
        student_id: null
      };
      setStudentInfo(updated);
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(updated));
      setConnectionStatus('offline');
      return { success: false, error: err.message };
    }
  }, [getApiBase]);

  // Immediate sync progress helper
  const syncProgressNow = useCallback(async (overrideCompleted, overrideQuizzes, overrideLesson) => {
    if (!studentInfo.registered || !studentInfo.student_id) return;

    const lessonsToSync = overrideCompleted !== undefined ? overrideCompleted : completedLessons;
    const quizzesToSync = overrideQuizzes !== undefined ? overrideQuizzes : quizScores;
    const lessonToSync = overrideLesson !== undefined ? overrideLesson : currentLessonId;

    try {
      const apiBase = getApiBase(studentInfo.host_ip);
      const res = await fetch(`${apiBase}/api/sync/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshop_id: studentInfo.workshop_id || undefined,
          student_id: studentInfo.student_id,
          name: studentInfo.name,
          email: studentInfo.email_roll,
          email_roll: studentInfo.email_roll,
          level: 'level1',
          client_ip: studentInfo.client_ip || undefined,
          active_lesson: lessonToSync || 'overview',
          completed_count: lessonsToSync.length,
          completed_lessons: lessonsToSync,
          quiz_scores: quizzesToSync
        })
      });

      if (res.ok) {
        const data = await res.json();
        setConnectionStatus('connected');
        setHeartbeatCount(prev => prev + 1);
        if (data.workshop_name) setWorkshopName(data.workshop_name);
        if (data.gates) setGates(data.gates);
        return true;
      }
    } catch (e) {
      // offline
    }
    return false;
  }, [studentInfo, completedLessons, quizScores, currentLessonId, getApiBase]);

  // Periodic heartbeat sync
  const sendHeartbeat = useCallback(async () => {
    return syncProgressNow();
  }, [syncProgressNow]);

  // Run heartbeat on interval (10 seconds)
  useEffect(() => {
    sendHeartbeat();
    heartbeatRef.current = setInterval(sendHeartbeat, 10000);
    return () => clearInterval(heartbeatRef.current);
  }, [sendHeartbeat]);

  // Chat & Raise Hand polling (every 3 seconds when connected)
  const pollChatAndHands = useCallback(async () => {
    if (!studentInfo.registered || !studentInfo.student_id) return;
    try {
      const apiBase = getApiBase(studentInfo.host_ip);
      const wsParam = studentInfo.workshop_id ? `?workshop_id=${studentInfo.workshop_id}` : '';
      
      // 1. Poll chat messages
      const chatRes = await fetch(`${apiBase}/api/sync/chat${wsParam}`);
      if (chatRes.ok) {
        const chatData = await chatRes.json();
        const msgs = chatData.messages || [];
        setChatMessages(msgs);

        // Compute unread messages if chat modal is closed
        if (msgs.length > 0) {
          const maxId = msgs[msgs.length - 1].id;
          if (!isChatOpenRef.current && lastChatIdRef.current > 0 && maxId > lastChatIdRef.current) {
            setUnreadChatCount(prev => prev + (maxId - lastChatIdRef.current));
          }
          lastChatIdRef.current = maxId;
        }
      }

      // 2. Poll raised hands to update local hand state
      const handsRes = await fetch(`${apiBase}/api/sync/raised_hands${wsParam}`);
      if (handsRes.ok) {
        const handsData = await handsRes.json();
        const activeHands = handsData.raised_hands || [];
        const myHand = activeHands.some(h => h.student_id === studentInfo.student_id);
        setIsHandRaised(myHand);
      }
    } catch (err) {
      // ignore transient polling errors
    }
  }, [studentInfo, getApiBase]);

  useEffect(() => {
    pollChatAndHands();
    chatPollRef.current = setInterval(pollChatAndHands, 3000);
    return () => clearInterval(chatPollRef.current);
  }, [pollChatAndHands]);

  // Send student chat message
  const sendChatMessage = useCallback(async (message, replyTo = null) => {
    if (!studentInfo.registered || !studentInfo.student_id) {
      setIsModalOpen(true);
      return { success: false, error: 'Please log in to chat.' };
    }
    if (!message || !message.trim()) return { success: false };

    try {
      const apiBase = getApiBase(studentInfo.host_ip);
      const res = await fetch(`${apiBase}/api/sync/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshop_id: studentInfo.workshop_id || undefined,
          sender_id: studentInfo.student_id,
          sender_name: studentInfo.name || 'Student',
          sender_role: 'student',
          sender_level: 'level1',
          message: message.trim(),
          reply_to_id: replyTo ? replyTo.id : null,
          reply_to_text: replyTo ? replyTo.message : null,
          reply_to_sender: replyTo ? replyTo.sender_name : null
        })
      });

      if (!res.ok) {
        const err = await res.json();
        return { success: false, error: err.error || 'Failed to send message' };
      }
      await pollChatAndHands();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }, [studentInfo, getApiBase, pollChatAndHands]);

  // Raise hand
  const raiseHand = useCallback(async (activeLesson) => {
    if (!studentInfo.registered || !studentInfo.student_id) {
      setIsModalOpen(true);
      return false;
    }
    try {
      const apiBase = getApiBase(studentInfo.host_ip);
      const res = await fetch(`${apiBase}/api/sync/raise_hand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshop_id: studentInfo.workshop_id || undefined,
          student_id: studentInfo.student_id,
          active_lesson: activeLesson || currentLessonId || 'lesson_01'
        })
      });
      if (res.ok) {
        setIsHandRaised(true);
        return true;
      }
    } catch (e) {
      console.warn('Failed to raise hand:', e);
    }
    return false;
  }, [studentInfo, currentLessonId, getApiBase]);

  // Lower hand
  const lowerHand = useCallback(async () => {
    if (!studentInfo.registered || !studentInfo.student_id) return false;
    try {
      const apiBase = getApiBase(studentInfo.host_ip);
      const res = await fetch(`${apiBase}/api/sync/lower_hand`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshop_id: studentInfo.workshop_id || undefined,
          student_id: studentInfo.student_id
        })
      });
      if (res.ok) {
        setIsHandRaised(false);
        return true;
      }
    } catch (e) {
      console.warn('Failed to lower hand:', e);
    }
    return false;
  }, [studentInfo, getApiBase]);

  // Clear unread count when opening chat
  const openChatModal = useCallback(() => {
    setIsChatOpen(true);
    setUnreadChatCount(0);
    if (chatMessages.length > 0) {
      lastChatIdRef.current = chatMessages[chatMessages.length - 1].id;
    }
  }, [chatMessages]);

  const closeChatModal = useCallback(() => {
    setIsChatOpen(false);
  }, []);

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
          workshop_id: studentInfo.workshop_id || undefined,
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
    sendHeartbeat,
    syncProgressNow,
    heartbeatCount,
    // Chat & Raise Hand exports
    chatMessages,
    unreadChatCount,
    isHandRaised,
    isChatOpen,
    openChatModal,
    closeChatModal,
    sendChatMessage,
    raiseHand,
    lowerHand
  };
}
