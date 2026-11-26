import React, { useMemo, useState } from 'react';
import { BookOpen, FileText, Layers, Search, X } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { topicsData } from '../data/topics';
import { formulasData } from '../data/formulas';
import { flashcardsData } from '../data/flashcards';

export function SearchModal() {
  const { searchOpen, setSearchOpen, navigate } = useCourse();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const topics = Object.values(topicsData);
    if (!q) {
      return {
        topics: topics.slice(0, 5),
        formulas: formulasData.slice(0, 4),
        flashcards: [],
      };
    }

    return {
      topics: topics.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.subtopics.some((s) => s.toLowerCase().includes(q))
      ),
      formulas: formulasData.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.note.toLowerCase().includes(q)
      ),
      flashcards: flashcardsData
        .filter((fc) => fc.front.toLowerCase().includes(q) || fc.back.toLowerCase().includes(q))
        .slice(0, 5),
    };
  }, [query]);

  if (!searchOpen) return null;

  const go = (route) => {
    setSearchOpen(false);
    setQuery('');
    navigate(route);
  };

  return (
    <div className="modal-backdrop" onClick={() => setSearchOpen(false)}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Search size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <input
            autoFocus
            type="text"
            className="input"
            placeholder="Search topics, theorems, LPP, Lagrange, gradients, flashcards..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="icon-btn" onClick={() => setSearchOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {results.topics.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                TOPICS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {results.topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="btn"
                    style={{ justifyContent: 'space-between', textAlign: 'left', padding: '10px 12px' }}
                    onClick={() => go(`/topic/${t.id}`)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <BookOpen size={15} style={{ color: 'var(--accent)' }} />
                      <span>{t.title}</span>
                    </span>
                    <span className="badge badge-muted">Module {t.moduleId}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.formulas.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                FORMULAS & THEOREMS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {results.formulas.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className="btn"
                    style={{ justifyContent: 'space-between', textAlign: 'left', padding: '10px 12px' }}
                    onClick={() => go('/formulas')}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FileText size={15} style={{ color: 'var(--purple)' }} />
                      <span>{f.title}</span>
                    </span>
                    <span className="badge badge-muted">Module {f.moduleId}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.flashcards.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
                FLASHCARDS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {results.flashcards.map((fc) => (
                  <button
                    key={fc.id}
                    type="button"
                    className="btn"
                    style={{ justifyContent: 'space-between', textAlign: 'left', padding: '10px 12px' }}
                    onClick={() => go('/flashcards')}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Layers size={15} style={{ color: 'var(--success)' }} />
                      <span>{fc.front.slice(0, 72)}{fc.front.length > 72 ? '…' : ''}</span>
                    </span>
                    <span className="badge badge-muted">M{fc.moduleId}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.topics.length === 0 &&
            results.formulas.length === 0 &&
            results.flashcards.length === 0 && (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-secondary)' }}>
                No matching study items found for "{query}".
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
