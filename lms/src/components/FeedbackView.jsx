import React, { useEffect } from 'react';
import { 
  Award, 
  ArrowLeft, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Layers, 
  Box, 
  Navigation
} from 'lucide-react';
import { StudentFeedbackForm } from './StudentFeedbackForm';

export function FeedbackView({
  onNavigateHub,
  onSelectLesson,
  studentInfo,
  onSubmitFeedback,
  completedCount = 23,
  totalLessons = 23
}) {
  // Scroll to top when view is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="lesson-view-container feedback-view-container fade-in">
      {/* Top Breadcrumbs */}
      <nav className="lesson-breadcrumbs">
        <button onClick={onNavigateHub} className="breadcrumb-btn">
          Curriculum Hub
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-module">Capstone Milestones</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">Course Feedback &amp; Survey</span>
      </nav>

      {/* Graduation Milestone Celebration Card */}
      <section className="feedback-milestone-hero" style={{
        margin: '1.5rem 0 2rem',
        padding: '2rem 2.25rem',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.35)',
            flexShrink: 0
          }}>
            <Award size={32} />
          </div>

          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                background: '#dbeafe',
                color: '#1d4ed8',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Curriculum Capstone
              </span>
              <span style={{
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '6px'
              }}>
                {completedCount} / {totalLessons} Lessons Completed
              </span>
            </div>

            <h1 style={{
              margin: '0 0 8px',
              fontSize: '1.65rem',
              fontWeight: 850,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              Level 1: Zero-to-Autonomous AMR Engineer
            </h1>

            <p style={{
              margin: 0,
              fontSize: '0.94rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}>
              Congratulations on completing the curriculum! You have developed real engineering competency across
              Linux systems, ROS 2 Jazzy DDS communication, custom interfaces, URDF 3D simulation, SLAM Toolbox,
              Nav2 autonomous navigation, and physical AMR deployment. Your feedback helps shape upcoming robotics courses.
            </p>
          </div>
        </div>

        {/* Milestone Pillars Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1.75rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={18} style={{ color: '#2563eb' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>Module 1</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Linux &amp; ROS 2 Middleware</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={18} style={{ color: '#0ea5e9' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>Module 2</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Actions, Services &amp; Bags</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box size={18} style={{ color: '#8b5cf6' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>Module 3</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>URDF &amp; Gazebo Simulation</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Navigation size={18} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>Module 4</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Nav2 &amp; Physical Deployment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Student Feedback Form Component */}
      <section className="feedback-form-section">
        <StudentFeedbackForm
          studentInfo={studentInfo || {}}
          onSubmitFeedback={onSubmitFeedback}
        />
      </section>

      {/* Navigation Footer */}
      <footer className="lesson-navigation-footer" style={{ marginTop: '3rem' }}>
        <button 
          onClick={() => onSelectLesson('lesson_23')}
          className="lesson-nav-btn prev"
        >
          <ArrowLeft size={16} />
          <span>← Lesson 23: Physical Robot Hardware Deployment</span>
        </button>

        <button 
          onClick={onNavigateHub}
          className="lesson-nav-btn hub"
        >
          <Compass size={16} />
          <span>Curriculum Hub Overview</span>
        </button>
      </footer>
    </div>
  );
}

export default FeedbackView;
