import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function PageScrollNav() {
  const [scrollState, setScrollState] = useState({
    isTop: true,
    isBottom: false,
    percent: 0,
    hasScrolled: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      const isTop = scrollTop < 80;
      const isBottom = scrollHeight <= 0 || scrollTop >= scrollHeight - 80;
      const percent = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;
      
      setScrollState({
        isTop,
        isBottom,
        percent,
        hasScrolled: scrollTop > 100
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight || document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className="page-scroll-nav-cluster"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 980,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '3px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.14)',
        backdropFilter: 'blur(10px)',
        transition: 'bottom 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, opacity 0.2s ease'
      }}
      aria-label="Page scroll shortcuts"
    >
      {/* Scroll to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        className="page-scroll-btn scroll-to-top-btn"
        title="Scroll directly to top (Page Top)"
        aria-label="Scroll to top"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: 'none',
          background: 'transparent',
          color: scrollState.isTop ? 'var(--text-muted)' : 'var(--text-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
          opacity: scrollState.isTop ? 0.6 : 1
        }}
      >
        <ArrowUp size={18} strokeWidth={2.4} />
      </button>

      {/* Subtle Separator */}
      <div
        style={{
          width: '20px',
          height: '1px',
          background: 'var(--border-color)',
          margin: '2px 0'
        }}
      />

      {/* Scroll to Bottom / End */}
      <button
        type="button"
        onClick={scrollToBottom}
        className="page-scroll-btn scroll-to-end-btn"
        title="Scroll directly to end (Page End)"
        aria-label="Scroll to end"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: 'none',
          background: 'transparent',
          color: scrollState.isBottom ? 'var(--text-muted)' : 'var(--text-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
          opacity: scrollState.isBottom ? 0.6 : 1
        }}
      >
        <ArrowDown size={18} strokeWidth={2.4} />
      </button>
    </div>
  );
}
