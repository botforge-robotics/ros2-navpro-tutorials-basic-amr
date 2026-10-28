import React from 'react';

export function LearningObjectives({ 
  title = "Learning Objectives & Core Outcomes",
  subtitle = "By the end of this lesson, you will be able to:",
  outcomes = [],
  className = ""
}) {
  return (
    <section className={`lesson-section ${className}`}>
      <div className="learning-objectives-card">
        <div className="learning-objectives-header">
          <div className="objectives-icon-badge">
            <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>🎯</span>
          </div>
          <div className="objectives-title-group">
            <h3 className="objectives-main-title">{title}</h3>
            <span className="objectives-subtitle">{subtitle}</span>
          </div>
          <span className="objectives-count-badge">
            {outcomes.length} CORE OUTCOMES
          </span>
        </div>
        <ul className="learning-objectives-list">
          {outcomes.map((item, index) => (
            <li key={index} className="learning-objective-item">
              <span className="objective-num-badge">{index + 1}</span>
              <span className="objective-text">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LearningObjectives;
