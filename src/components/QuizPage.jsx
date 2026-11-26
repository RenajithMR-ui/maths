import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, Flame, RotateCcw, XCircle } from 'lucide-react';
import { quizzesData } from '../data/quizzes';
import { modulesData } from '../data/modules';
import { MathText } from './MathText';

export function QuizPage() {
  const [moduleFilter, setModuleFilter] = useState('all');
  const [countLimit, setCountLimit] = useState('all');
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    const filtered =
      moduleFilter === 'all'
        ? quizzesData
        : quizzesData.filter((q) => q.moduleId === Number(moduleFilter));
    if (countLimit === 'all') return filtered;
    return filtered.slice(0, Number(countLimit));
  }, [moduleFilter, countLimit]);

  const startQuiz = () => {
    setStarted(true);
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setFinished(false);
  };

  const handleAnswer = (optIdx) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const current = questions[qIndex];
    if (optIdx === current.correctIndex) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
    }
  };

  if (!started) {
    return (
      <div className="container" style={{ paddingTop: 24, maxWidth: 760 }}>
        <div className="card">
          <span className="badge" style={{ marginBottom: 8 }}>
            Self Assessment · Instant Explanations
          </span>
          <h1 style={{ margin: '4px 0 8px', fontSize: 28 }}>Mathematics Practice Quiz</h1>
          <p style={{ margin: '0 0 18px', color: 'var(--text-secondary)' }}>
            Test concepts from Differential Calculus, Multivariable Calculus, Extrema, Lagrange
            Multipliers, and LPP.
          </p>

          <div className="grid-2" style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13.5, fontWeight: 600 }}>
              Filter by Module
              <select
                className="select"
                style={{ marginTop: 6 }}
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
              >
                <option value="all">All 4 Modules ({quizzesData.length} questions)</option>
                {modulesData.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.code}: {m.title}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ fontSize: 13.5, fontWeight: 600 }}>
              Question Count
              <select
                className="select"
                style={{ marginTop: 6 }}
                value={countLimit}
                onChange={(e) => setCountLimit(e.target.value)}
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="all">All Available ({questions.length})</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            disabled={questions.length === 0}
            onClick={startQuiz}
          >
            Start Quiz ({questions.length} Questions)
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="container" style={{ paddingTop: 24, maxWidth: 680 }}>
        <div className="card" style={{ textAlign: 'center', padding: 34 }}>
          <Award size={44} style={{ color: 'var(--accent)', marginBottom: 10 }} />
          <h1 style={{ margin: '0 0 8px' }}>Quiz Complete!</h1>
          <p style={{ fontSize: 18, margin: '0 0 18px' }}>
            Score: <strong>{score}</strong> / {questions.length} ({pct}%)
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <button type="button" className="btn btn-primary" onClick={startQuiz}>
              <RotateCcw size={15} />
              <span>Retry Quiz</span>
            </button>
            <button type="button" className="btn" onClick={() => setStarted(false)}>
              Change Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[qIndex];

  return (
    <div className="container" style={{ paddingTop: 24, maxWidth: 780 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span className="badge">
          Question {qIndex + 1} of {questions.length} · Module {current.moduleId}
        </span>
        <span className="badge badge-muted">
          <Flame size={14} style={{ color: 'var(--warning)' }} />
          <span>Streak: {streak}</span>
        </span>
      </div>

      <div className="progress-track" style={{ marginBottom: 18 }}>
        <div
          className="progress-fill"
          style={{ width: `${((qIndex + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="card">
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 18 }}>
          <MathText text={current.question} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {current.options.map((opt, idx) => {
            const isPicked = selected === idx;
            const isCorrect = idx === current.correctIndex;
            let borderColor = 'var(--border-subtle)';
            let bg = 'var(--bg-surface)';

            if (selected !== null) {
              if (isCorrect) {
                borderColor = 'var(--success)';
                bg = 'var(--bg-callout-green)';
              } else if (isPicked) {
                borderColor = 'var(--danger)';
                bg = 'rgba(248, 113, 113, 0.12)';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                className="btn"
                style={{
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  padding: '13px 16px',
                  borderColor,
                  background: bg,
                }}
                onClick={() => handleAnswer(idx)}
              >
                <span>
                  <MathText text={opt} />
                </span>
                {selected !== null && isCorrect && (
                  <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
                )}
                {selected !== null && isPicked && !isCorrect && (
                  <XCircle size={18} style={{ color: 'var(--danger)' }} />
                )}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="callout" style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Explanation</div>
            <div style={{ fontSize: 14.5 }}>
              <MathText text={current.explanation} />
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-primary btn-sm" onClick={nextQuestion}>
                {qIndex + 1 >= questions.length ? 'Finish Quiz' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
