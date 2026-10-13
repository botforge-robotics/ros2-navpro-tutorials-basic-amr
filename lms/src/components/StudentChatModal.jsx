import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MessageSquare, 
  Hand, 
  Send, 
  CornerUpLeft, 
  CheckCircle, 
  Clock, 
  User, 
  Check, 
  HelpCircle,
  AlertCircle,
  Lock
} from 'lucide-react';

export function StudentChatModal({
  isOpen,
  onClose,
  studentInfo,
  connectionStatus,
  chatMessages = [],
  isHandRaised = false,
  activeLessonId,
  onSendMessage,
  onRaiseHand,
  onLowerHand,
  onOpenSyncModal
}) {
  const [inputText, setInputText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isOpen]);

  if (!isOpen) return null;

  const isRegisteredAndSynced = studentInfo?.registered && connectionStatus === 'connected';

  const handleOpenLogin = () => {
    onClose?.();
    onOpenSyncModal?.();
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isSubmitting) return;

    if (!isRegisteredAndSynced) {
      handleOpenLogin();
      return;
    }

    setIsSubmitting(true);
    await onSendMessage(inputText.trim(), replyTo);
    setInputText('');
    setReplyTo(null);
    setIsSubmitting(false);
  };

  return (
    <div 
      className="student-chat-docked-panel fade-in"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '420px',
        maxWidth: 'calc(100vw - 32px)',
        height: '600px',
        maxHeight: 'calc(100vh - 40px)',
        zIndex: 1500,
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        background: 'var(--bg-surface)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden'
      }}
    >
        {/* Header */}
        <div className="modal-header" style={{ padding: '1.1rem 1.4rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
          <div className="modal-title-wrap">
            <MessageSquare size={20} className="modal-title-icon" style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Workshop Group Chat &amp; Doubts</h3>
              <span className="modal-subtitle" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {isRegisteredAndSynced 
                  ? `Joined as ${studentInfo?.name || 'Student'} • Live LAN Channel` 
                  : 'Attendance Sync Required to Chat'}
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Raise Hand Quick Action Banner */}
        <div style={{
          padding: '0.75rem 1.4rem',
          background: isHandRaised ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-sidebar)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10
        }}>
          {isHandRaised ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.2rem', animation: 'bounce 1s infinite' }}>✋</span>
              <div>
                <strong style={{ fontSize: '0.86rem', color: 'var(--warning-dark, #b45309)', display: 'block' }}>
                  Hand Raised! (Instructor Notified)
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  The instructor sees an alert on the host dashboard and will attend to your seat.
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.1rem' }}>🙋</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Stuck on a robot node or code bug?
              </span>
            </div>
          )}

          {isHandRaised ? (
            <button
              onClick={onLowerHand}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                padding: '0.35rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              Lower Hand (Resolved)
            </button>
          ) : (
            <button
              onClick={() => onRaiseHand(activeLessonId)}
              disabled={!isRegisteredAndSynced}
              style={{
                background: isRegisteredAndSynced ? '#d97706' : 'var(--text-muted)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.4rem 0.9rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                cursor: isRegisteredAndSynced ? 'pointer' : 'not-allowed',
                boxShadow: isRegisteredAndSynced ? '0 2px 6px rgba(217, 119, 6, 0.3)' : 'none'
              }}
            >
              <Hand size={14} />
              <span>Raise Hand for Instructor</span>
            </button>
          )}
        </div>

        {/* Lock Warning if not synced */}
        {!isRegisteredAndSynced && (
          <div style={{
            padding: '0.75rem 1.4rem',
            background: 'var(--warning-bg)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
              <Lock size={15} style={{ color: 'var(--warning)' }} />
              <span>Only registered and synced students can send messages and raise hand.</span>
            </div>
            <button
              onClick={handleOpenLogin}
              style={{
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Login / Sync Now
            </button>
          </div>
        )}

        {/* Chat Messages Stream */}
        <div 
          ref={chatScrollRef}
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '1.25rem 1.4rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem',
            background: 'var(--bg-body, var(--bg-sidebar))'
          }}
        >
          {chatMessages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
              <h4 style={{ margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>Welcome to the Workshop Group!</h4>
              <p style={{ margin: 0, fontSize: '0.88rem' }}>
                All students and the instructor share this group. Ask questions, post tips, and reply to fellow roboticists.
              </p>
            </div>
          ) : (
            chatMessages.map((msg) => {
              const isInstructor = msg.sender_role === 'instructor';
              const isMe = msg.sender_id === studentInfo?.student_id;

              return (
                <div 
                  key={msg.id}
                  style={{
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  {/* Sender title */}
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 2, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ 
                      fontWeight: 700, 
                      color: isInstructor ? 'var(--accent-primary)' : isMe ? 'var(--success)' : 'var(--text-primary)' 
                    }}>
                      {isInstructor ? '👨‍🏫 Instructor' : isMe ? 'You' : `🎓 ${msg.sender_name || 'Student'}`}
                    </span>
                    <span>&bull;</span>
                    <span>{msg.created_at ? msg.created_at.split(' ')[1] : ''}</span>
                  </div>

                  {/* Message bubble */}
                  <div
                    style={{
                      background: isMe 
                        ? 'var(--accent-primary)' 
                        : isInstructor 
                          ? 'var(--primary-soft, rgba(37,99,235,0.12))' 
                          : 'var(--bg-surface)',
                      color: isMe 
                        ? '#ffffff' 
                        : isInstructor 
                          ? 'var(--text-primary)' 
                          : 'var(--text-primary)',
                      border: isInstructor 
                        ? '1px solid rgba(37,99,235,0.3)' 
                        : isMe 
                          ? 'none' 
                          : '1px solid var(--border-color)',
                      borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      padding: '0.65rem 0.95rem',
                      boxShadow: 'var(--shadow-sm)',
                      fontSize: '0.9rem',
                      lineHeight: 1.45
                    }}
                  >
                    {/* Reply quote banner */}
                    {msg.reply_to_text && (
                      <div 
                        style={{
                          borderLeft: isMe ? '3px solid rgba(255,255,255,0.7)' : '3px solid var(--accent-primary)',
                          background: isMe ? 'rgba(0,0,0,0.15)' : 'var(--bg-sidebar)',
                          padding: '0.3rem 0.6rem',
                          borderRadius: 4,
                          marginBottom: '0.45rem',
                          fontSize: '0.8rem',
                          color: isMe ? '#f1f5f9' : 'var(--text-secondary)'
                        }}
                      >
                        <span style={{ fontWeight: 700, display: 'block', fontSize: '0.74rem' }}>
                          Replying to {msg.reply_to_sender || 'student'}:
                        </span>
                        <span style={{ fontStyle: 'italic', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 280 }}>
                          "{msg.reply_to_text}"
                        </span>
                      </div>
                    )}

                    <div>{msg.message}</div>
                  </div>

                  {/* Reply button */}
                  {!isMe && isRegisteredAndSynced && (
                    <button
                      onClick={() => setReplyTo(msg)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--accent-primary)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        marginTop: 2,
                        padding: '2px 4px'
                      }}
                    >
                      <CornerUpLeft size={11} /> Reply
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Replying banner */}
        {replyTo && (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.4rem 1.4rem',
              background: 'rgba(37,99,235,0.08)',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.8rem',
              color: 'var(--accent-primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CornerUpLeft size={13} />
              <span>Replying to <strong>{replyTo.sender_name}</strong>: "{replyTo.message.substring(0, 45)}..."</span>
            </div>
            <button 
              onClick={() => setReplyTo(null)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 700 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Message Input Box */}
        <form 
          onSubmit={handleSend}
          style={{
            display: 'flex',
            gap: 8,
            padding: '0.85rem 1.4rem',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-surface)'
          }}
        >
          <input
            type="text"
            disabled={!isRegisteredAndSynced}
            placeholder={
              !isRegisteredAndSynced 
                ? "Login and sync attendance to participate in group chat..." 
                : replyTo 
                  ? `Reply to ${replyTo.sender_name}...` 
                  : "Ask a doubt or reply to solve doubts..."
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              padding: '0.65rem 0.95rem',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!isRegisteredAndSynced || !inputText.trim() || isSubmitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.65rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: isRegisteredAndSynced && inputText.trim() && !isSubmitting ? 'pointer' : 'not-allowed',
              opacity: isRegisteredAndSynced && inputText.trim() && !isSubmitting ? 1 : 0.5
            }}
          >
            <Send size={15} />
            <span>Send</span>
          </button>
        </form>
      </div>
  );
}
