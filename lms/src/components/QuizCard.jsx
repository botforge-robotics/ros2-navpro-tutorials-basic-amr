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

const STORAGE_KEY_QUIZ_ANSWERS = 'navpro_l1_quiz_answers';

const getStoredQuizAnswers = (lid) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUIZ_ANSWERS);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed[lid] || {};
  } catch {
    return {};
  }
};

const setStoredQuizAnswers = (lid, answers) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUIZ_ANSWERS);
    const parsed = raw ? JSON.parse(raw) : {};
    if (answers && Object.keys(answers).length > 0) {
      parsed[lid] = answers;
    } else {
      delete parsed[lid];
    }
    localStorage.setItem(STORAGE_KEY_QUIZ_ANSWERS, JSON.stringify(parsed));
  } catch (err) {
    console.error('Failed to save quiz answers', err);
  }
};

export function QuizCard({ 
  lessonId, 
  quizzes, 
  savedScore, 
  onRecordScore, 
  isQuizGateOpen,
  onOpenSyncModal
}) {
  const [selectedAnswers, setSelectedAnswers] = useState(() => getStoredQuizAnswers(lessonId));
  const [isSubmitted, setIsSubmitted] = useState(() => {
    const stored = getStoredQuizAnswers(lessonId);
    return Boolean(savedScore && Object.keys(stored).length > 0);
  });
  const [scoreResult, setScoreResult] = useState(savedScore || null);

  // Restore state when switching lessons
  useEffect(() => {
    const stored = getStoredQuizAnswers(lessonId);
    setSelectedAnswers(stored);
    const hasStored = Object.keys(stored).length > 0;
    setIsSubmitted(Boolean(savedScore && hasStored));
    setScoreResult(savedScore || null);
  }, [lessonId]);

  // Sync external score update without wiping selected answers
  useEffect(() => {
    if (savedScore) {
      setScoreResult(savedScore);
    }
  }, [savedScore]);

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
    setSelectedAnswers(prev => {
      const next = {
        ...prev,
        [questionIndex]: optionIndex
      };
      setStoredQuizAnswers(lessonId, next);
      return next;
    });
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
    setStoredQuizAnswers(lessonId, selectedAnswers);
    onRecordScore(lessonId, correctCount, quizzes.length);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
    setStoredQuizAnswers(lessonId, null);
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
          const hasUserChoice = userChoice !== undefined && userChoice !== null;
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
                  const isCorrectOption = optIdx === q.correct;
                  let optionClass = 'quiz-option-label';

                  if (isSubmitted) {
                    optionClass += ' submitted';
                    if (isCorrectOption) {
                      optionClass += ' correct-option';
                      if (isSelected) {
                        optionClass += ' user-selected';
                      }
                    } else if (isSelected) {
                      optionClass += ' wrong-option user-selected';
                    } else {
                      optionClass += ' unselected-dimmed';
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

                      {/* Explicit Result Badges When Submitted */}
                      {isSubmitted && (
                        <>
                          {isCorrectOption && isSelected && (
                            <span className="quiz-choice-badge correct">
                              <CheckCircle size={14} /> Your Answer &bull; Correct
                            </span>
                          )}
                          {isCorrectOption && !isSelected && (
                            <span className="quiz-choice-badge correct-answer">
                              <CheckCircle size={14} /> Correct Answer
                            </span>
                          )}
                          {!isCorrectOption && isSelected && (
                            <span className="quiz-choice-badge wrong">
                              <XCircle size={14} /> Your Answer &bull; Incorrect
                            </span>
                          )}
                        </>
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
