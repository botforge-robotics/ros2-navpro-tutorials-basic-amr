import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Lock, 
  Award, 
  RotateCcw,
  Send
} from 'lucide-react';

export function QuizCard({ 
  lessonId, 
  quizzes, 
  savedScore, 
  onRecordScore, 
  isQuizGateOpen,
  onOpenSyncModal
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  // Initialize or restore state
  useEffect(() => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(savedScore || null);
  }, [lessonId, savedScore]);

  if (!quizzes || quizzes.length === 0) {
    return null;
  }

  // If instructor has gated/locked quizzes
  if (!isQuizGateOpen) {
    return (
      <div className="quiz-locked-card">
        <Lock size={28} className="lock-icon" />
        <div className="locked-text">
          <h3>Interactive Quiz Paused</h3>
          <p>
            The instructor has temporarily gated quizzes for this workshop phase. 
            Review the code exercises and instructions while the gate remains closed.
          </p>
        </div>
      </div>
    );
  }

  const handleSelect = (questionIndex, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    let correctCount = 0;
    quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount += 1;
      }
    });

    const result = {
      score: correctCount,
      total: quizzes.length,
      passed: correctCount === quizzes.length,
      timestamp: Date.now()
    };

    setIsSubmitted(true);
    setScoreResult(result);
    onRecordScore(lessonId, correctCount, quizzes.length);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  };

  const allAnswered = quizzes.length > 0 && 
    Object.keys(selectedAnswers).length === quizzes.length;

  return (
    <div className="quiz-container-card">
      <div className="quiz-header">
        <div className="quiz-header-title">
          <HelpCircle size={22} className="quiz-badge-icon" />
          <div>
            <h3>Knowledge Check &bull; Quick Quiz</h3>
            <span className="quiz-subtitle">
              Verify your understanding of this lesson's core concepts ({quizzes.length} questions)
            </span>
          </div>
        </div>

        {scoreResult && (
          <div className={`quiz-score-badge ${scoreResult.passed ? 'passed' : 'review'}`}>
            <Award size={16} />
            <span>{scoreResult.score} / {scoreResult.total} ({Math.round((scoreResult.score / scoreResult.total) * 100)}%)</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="quiz-form">
        {quizzes.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isQuestionCorrect = isSubmitted && userChoice === q.correct;

          return (
            <div key={q.id || qIdx} className={`quiz-question-block ${isSubmitted ? (isQuestionCorrect ? 'correct-block' : 'incorrect-block') : ''}`}>
              <div className="question-prompt">
                <span className="q-number">Q{qIdx + 1}.</span>
                <span className="q-text">{q.prompt}</span>
              </div>

              <div className="question-options">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let optionClass = 'quiz-option-label';

                  if (isSubmitted) {
                    if (optIdx === q.correct) {
                      optionClass += ' correct-option';
                    } else if (isSelected && optIdx !== q.correct) {
                      optionClass += ' wrong-option';
                    }
                  } else if (isSelected) {
                    optionClass += ' selected-option';
                  }

                  return (
                    <label key={optIdx} className={optionClass}>
                      <input
                        type="radio"
                        name={`question_${qIdx}`}
                        checked={isSelected}
                        onChange={() => handleSelect(qIdx, optIdx)}
                        disabled={isSubmitted}
                      />
                      <span className="option-text">{opt}</span>
                      {isSubmitted && optIdx === q.correct && (
                        <CheckCircle size={16} className="state-icon green" />
                      )}
                      {isSubmitted && isSelected && optIdx !== q.correct && (
                        <XCircle size={16} className="state-icon red" />
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Reveal Explanation after Submit */}
              {isSubmitted && (
                <div className={`quiz-explanation-box ${isQuestionCorrect ? 'exp-correct' : 'exp-wrong'}`}>
                  <strong>{isQuestionCorrect ? '✅ Correct Explanation:' : '💡 Key Concept:'}</strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        <div className="quiz-actions-footer">
          {!isSubmitted ? (
            <button
              type="submit"
              disabled={!allAnswered}
              className={`quiz-submit-btn ${!allAnswered ? 'disabled' : ''}`}
            >
              <Send size={15} />
              <span>{allAnswered ? 'Submit Quiz Answers' : `Answer All Questions (${Object.keys(selectedAnswers).length}/${quizzes.length})`}</span>
            </button>
          ) : (
            <div className="quiz-result-row">
              <span className="result-text">
                {scoreResult?.passed 
                  ? '🎉 Outstanding! You passed this lesson check.' 
                  : 'Review the explanations above and retry to solidify your knowledge.'}
              </span>
              <button
                type="button"
                onClick={handleRetake}
                className="quiz-retry-btn"
              >
                <RotateCcw size={14} />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
