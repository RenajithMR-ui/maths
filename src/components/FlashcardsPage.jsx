import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCw } from 'lucide-react';
import { flashcardsData } from '../data/flashcards';
import { modulesData } from '../data/modules';
import { topicsData } from '../data/topics';
import { useCourse } from '../context/CourseContext';
import { MathText } from './MathText';

export function FlashcardsPage() {
  const { masteredCards, toggleMastered } = useCourse();
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => {
    return flashcardsData.filter((fc) => {
      if (moduleFilter !== 'all' && fc.moduleId !== Number(moduleFilter)) return false;
      if (statusFilter === 'mastered' && !masteredCards.has(fc.id)) return false;
      if (statusFilter === 'unmastered' && masteredCards.has(fc.id)) return false;
      return true;
    });
  }, [moduleFilter, statusFilter, masteredCards]);

  const safeIndex = deck.length > 0 ? Math.min(index, deck.length - 1) : 0;
  const current = deck[safeIndex];
  const masteredPct = Math.round((masteredCards.size / flashcardsData.length) * 100);

  const go = (delta) => {
    setFlipped(false);
    setIndex((prev) => (prev + delta + deck.length) % deck.length);
  };

  return (
    <div className="container" style={{ paddingTop: 24, maxWidth: 880 }}>
      <div style={{ marginBottom: 18 }}>
        <span className="badge" style={{ marginBottom: 6 }}>
          Active Recall · {masteredCards.size}/{flashcardsData.length} Mastered ({masteredPct}%)
        </span>
        <h1 style={{ margin: '4px 0 6px', fontSize: 28 }}>Mathematics Flashcards</h1>
        <div className="progress-track" style={{ marginTop: 10 }}>
          <div className="progress-fill" style={{ width: `${masteredPct}%` }} />
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 14, marginBottom: 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <select
            className="select"
            style={{ width: 240 }}
            value={moduleFilter}
            onChange={(e) => {
              setModuleFilter(e.target.value);
              setIndex(0);
              setFlipped(false);
            }}
          >
            <option value="all">All 4 Modules</option>
            {modulesData.map((m) => (
              <option key={m.id} value={m.id}>
                {m.code}: {m.title}
              </option>
            ))}
          </select>

          <select
            className="select"
            style={{ width: 180 }}
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setIndex(0);
              setFlipped(false);
            }}
          >
            <option value="all">All Cards</option>
            <option value="unmastered">Needs Review</option>
            <option value="mastered">Mastered Only</option>
          </select>
        </div>
      </div>

      {!current ? (
        <div className="card" style={{ textAlign: 'center', padding: 36 }}>
          <p style={{ color: 'var(--text-secondary)' }}>No flashcards match this filter.</p>
        </div>
      ) : (
        <div>
          <div className="flashcard-scene" onClick={() => setFlipped((f) => !f)}>
            <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`} style={{ minHeight: 270 }}>
              <div className="flashcard-face">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-muted">
                    Module {current.moduleId} · {topicsData[current.topicId]?.title}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Card {safeIndex + 1} / {deck.length}
                  </span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', padding: '14px 8px' }}>
                  <MathText text={current.front} />
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center' }}>
                  Click card to reveal answer
                </div>
              </div>

              <div className="flashcard-face flashcard-back">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge">Answer</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Card {safeIndex + 1} / {deck.length}
                  </span>
                </div>
                <div style={{ fontSize: 17, textAlign: 'center', padding: '14px 8px' }}>
                  <MathText text={current.back} />
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center' }}>
                  Click card to flip back
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 16,
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn" onClick={() => go(-1)}>
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>
              <button type="button" className="btn" onClick={() => setFlipped((f) => !f)}>
                <RotateCw size={16} />
                <span>Flip</span>
              </button>
              <button type="button" className="btn" onClick={() => go(1)}>
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <button
              type="button"
              className={`btn ${masteredCards.has(current.id) ? 'btn-primary' : ''}`}
              onClick={() => toggleMastered(current.id)}
            >
              <CheckCircle2 size={16} />
              <span>{masteredCards.has(current.id) ? 'Mastered ✓' : 'Mark as Mastered'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
