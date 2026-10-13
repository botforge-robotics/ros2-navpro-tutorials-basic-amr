import React from 'react';
import { AlertOctagon, RotateCcw, Home, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[NavPro Level 1 ErrorBoundary caught an exception]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleResetCache = () => {
    try {
      localStorage.removeItem('navpro_current_lesson');
      localStorage.removeItem('navpro_completed_lessons');
      localStorage.removeItem('navpro_quiz_scores');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.reload();
  };

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-main, #0b0f19)',
          color: 'var(--text-main, #f8fafc)',
          padding: '2rem',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            background: 'var(--card-bg, #111827)',
            border: '1px solid var(--border-color, #1f2937)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              padding: '1rem',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              marginBottom: '1.5rem'
            }}>
              <AlertOctagon size={42} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
              Something went wrong
            </h2>
            <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
              The Learning Hub encountered an unexpected runtime error. Your robotics code in <code>ros2_ws/</code> is completely safe on your disk.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button 
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'var(--primary, #0ea5e9)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={16} />
                <span>Reload Page</span>
              </button>

              <button 
                onClick={this.handleResetState}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'var(--surface-color, #1e293b)',
                  color: 'var(--text-main, #f8fafc)',
                  border: '1px solid var(--border-color, #334155)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Home size={16} />
                <span>Return to Hub</span>
              </button>

              <button 
                onClick={this.handleResetCache}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={16} />
                <span>Clear Local Cache</span>
              </button>
            </div>

            {this.state.error && (
              <details style={{
                textAlign: 'left',
                marginTop: '1.5rem',
                background: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#ef4444',
                fontFamily: 'monospace'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--text-muted, #94a3b8)' }}>
                  Technical Error Diagnostics
                </summary>
                <pre style={{ marginTop: '0.75rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
