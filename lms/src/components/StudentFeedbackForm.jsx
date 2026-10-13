import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Send, 
  CheckCircle2, 
  Heart, 
  Award, 
  Sparkles, 
  MessageSquare, 
  ThumbsUp,
  RefreshCw
} from 'lucide-react';

const STORAGE_KEY_FEEDBACK = 'navpro_l1_submitted_feedback';

export function StudentFeedbackForm({ studentInfo, onSubmitFeedback }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [favoriteModule, setFavoriteModule] = useState('Module 6: Autonomous Navigation (Nav2 & BT)');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Restore existing submission from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FEEDBACK);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSubmittedData(parsed);
        setIsSubmitted(true);
        if (parsed.rating) setRating(parsed.rating);
        if (parsed.favorite_module) setFavoriteModule(parsed.favorite_module);
        if (parsed.feedback_text) setFeedbackText(parsed.feedback_text);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const ratingLabels = {
    1: 'Needs Improvement',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Outstanding / Excellent! 🚀'
  };

  const modules = [
    'Module 1: Linux Fundamentals & ROS 2 Architecture',
    'Module 2: Communication Mechanics (Topics, Services, Parameters)',
    'Module 3: Kinematics, TF2 Spatial Transforms & URDF/Xacro',
    'Module 4: 3D Simulation (Gazebo) & Sensor Raytracing',
    'Module 5: 2D SLAM Mapping & Loop Closures',
    'Module 6: Autonomous Navigation (Nav2, Planners & Simple Commander)',
    'Module 7: Computer Vision & OpenCV Integration',
    'Module 8: Physical AMR Hardware Deployment'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);
    const success = await onSubmitFeedback(rating, favoriteModule, feedbackText);
    setIsSubmitting(false);

    const submission = {
      student_id: studentInfo.student_id || studentInfo.email_roll,
      student_name: studentInfo.name || 'Student',
      rating,
      favorite_module: favoriteModule,
      feedback_text: feedbackText,
      timestamp: Date.now()
    };

    localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(submission));
    setSubmittedData(submission);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="feedback-form-card">
      <div className="feedback-form-header">
        <div className="header-icon-wrap">
          <Award size={26} className="award-icon" />
        </div>
        <div className="header-text-wrap">
          <div className="header-badge-row">
            <span className="badge-capstone">Capstone Survey</span>
            <span className="badge-live">Synced to Instructor</span>
          </div>
          <h3 className="feedback-main-title">Workshop Experience &amp; Student Feedback</h3>
          <p className="feedback-main-subtitle">
            Congratulations on reaching the final stage of Level 1! Your feedback helps us fine-tune 
            hands-on robotics exercises and improve future workshop tracks.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="feedback-success-banner fade-in">
          <div className="success-banner-content">
            <div className="success-icon-badge">
              <CheckCircle2 size={36} color="#10b981" />
            </div>
            <div className="success-copy">
              <h4>Thank you, {submittedData?.student_name || 'Robotics Engineer'}!</h4>
              <p>Your feedback and ratings have been saved and transmitted to the instructor central server.</p>
              
              <div className="submitted-summary-box">
                <div className="summary-rating">
                  <span className="summary-label">Your Rating:</span>
                  <div className="star-row">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        size={18} 
                        fill={s <= (submittedData?.rating || rating) ? '#f59e0b' : 'none'} 
                        color="#f59e0b" 
                      />
                    ))}
                    <span className="rating-tag">({submittedData?.rating || rating} / 5)</span>
                  </div>
                </div>

                <div className="summary-module">
                  <span className="summary-label">Favorite Module:</span>
                  <span className="summary-val">{submittedData?.favorite_module || favoriteModule}</span>
                </div>

                {submittedData?.feedback_text && (
                  <div className="summary-quote">
                    "{submittedData.feedback_text}"
                  </div>
                )}
              </div>

              <button 
                type="button" 
                onClick={handleEdit} 
                className="btn-edit-feedback"
              >
                <RefreshCw size={14} />
                <span>Update or Edit Response</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form-body">
          {/* Star Rating Section */}
          <div className="feedback-section-row">
            <label className="section-label">
              <Star size={16} className="label-icon" />
              <span>Overall Workshop Rating</span>
            </label>
            <div className="star-picker-container">
              <div className="star-picker-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-choice-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star 
                      size={32} 
                      fill={star <= (hoverRating || rating) ? '#f59e0b' : 'none'} 
                      color="#f59e0b"
                      className="star-svg" 
                    />
                  </button>
                ))}
              </div>
              <span className="star-score-indicator">
                {ratingLabels[hoverRating || rating]}
              </span>
            </div>
          </div>

          {/* Favorite Module Dropdown */}
          <div className="feedback-section-row">
            <label className="section-label">
              <Sparkles size={16} className="label-icon" />
              <span>Which module was your favorite or most valuable?</span>
            </label>
            <select
              value={favoriteModule}
              onChange={(e) => setFavoriteModule(e.target.value)}
              className="feedback-select-input"
            >
              {modules.map((m, idx) => (
                <option key={idx} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Feedback & Comments Text Area */}
          <div className="feedback-section-row">
            <label className="section-label">
              <MessageSquare size={16} className="label-icon" />
              <span>What did you enjoy most? Any suggestions for the instructor?</span>
            </label>
            <textarea
              required
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="e.g., The hands-on autonomous navigation patrol with Nav2 Simple Commander was awesome! The line-by-line code breakdowns really helped me understand how ROS 2 lifecycle states work under the hood..."
              className="feedback-textarea-input"
            />
          </div>

          {/* Submit Action */}
          <div className="feedback-submit-row">
            <div className="feedback-privacy-note">
              <span>🔒 Submissions are delivered to the instructor dashboard with your student ID.</span>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting || !feedbackText.trim()} 
              className="btn-submit-feedback"
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback to Instructor'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
