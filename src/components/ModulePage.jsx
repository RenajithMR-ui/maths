import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
  FileText,
  LineChart,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { modulesData } from '../data/modules';
import { topicsData } from '../data/topics';
import { flashcardsData } from '../data/flashcards';
import { useCourse } from '../context/CourseContext';
import { GraphLppLab } from './GraphLppLab';
import { MathText } from './MathText';

export function ModulePage({ moduleId }) {
  const { navigate, completedTopics, toggleTopicComplete, masteredCards } = useCourse();
  const idNum = Number(moduleId);
  const mod = modulesData.find((m) => m.id === idNum) || modulesData[0];
  const modCards = flashcardsData.filter((f) => f.moduleId === mod.id);
  const masteredCount = modCards.filter((f) => masteredCards.has(f.id)).length;

  // Mini-navbar tab inside Modules 2 & 4 ('topics' | 'lpp' | 'functions')
  const [subView, setSubView] = useState('topics');

  useEffect(() => {
    setSubView('topics');
  }, [mod.id]);

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      {/* Module Switcher Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {modulesData.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`nav-pill ${m.id === mod.id ? 'active' : ''}`}
            style={{ border: '1px solid var(--border-subtle)' }}
            onClick={() => navigate(`/module/${m.id}`)}
          >
            {m.code}: {m.title}
          </button>
        ))}
      </div>

      {/* Module Header Card */}
      <div
        className="module-bento-card"
        style={{
          marginBottom: 20,
          backgroundImage: `radial-gradient(circle at top right, ${mod.accent}1f, transparent 60%)`,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className="module-numeral" style={{ color: mod.accent }}>
                0{mod.id}
              </span>
              <span className="badge" style={{ color: mod.accent }}>
                {mod.code} · {mod.hours}
              </span>
            </div>
            <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>{mod.title}</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{mod.summary}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 210 }}>
            {mod.videoPlaylistUrl && (
              <a href={mod.videoPlaylistUrl} target="_blank" rel="noreferrer" className="btn btn-sm">
                <PlayCircle size={15} />
                <span>SAC Video Playlist</span>
                <ExternalLink size={13} />
              </a>
            )}
            {mod.formulaPdfUrl && (
              <a href={mod.formulaPdfUrl} target="_blank" rel="noreferrer" className="btn btn-sm">
                <FileText size={15} />
                <span>SAC Formula Sheet PDF</span>
                <ExternalLink size={13} />
              </a>
            )}
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4 }}>
              Flashcards mastered: {masteredCount}/{modCards.length}
            </div>
          </div>
        </div>
      </div>

      {/* Mini Navbar for Module 2 (Function & f'(x) Grapher) and Module 4 (LPP & Graphs) */}
      {(mod.id === 2 || mod.id === 4) && (
        <div className="mini-navbar" role="navigation" aria-label={`${mod.code} Interactive Tools`}>
          <button
            type="button"
            className={`mini-nav-btn ${subView === 'topics' ? 'active' : ''}`}
            onClick={() => setSubView('topics')}
          >
            <BookOpen size={15} />
            <span>Topics &amp; Notes ({mod.topicIds.length})</span>
          </button>

          {mod.id === 4 && (
            <button
              type="button"
              className={`mini-nav-btn ${subView === 'lpp' ? 'active' : ''}`}
              onClick={() => setSubView('lpp')}
            >
              <LineChart size={15} />
              <span>LPP Graphical Method Solver</span>
            </button>
          )}

          <button
            type="button"
            className={`mini-nav-btn ${subView === 'functions' ? 'active' : ''}`}
            onClick={() => setSubView('functions')}
          >
            <Sparkles size={15} />
            <span>Function &amp; f&apos;(x) Graph Drawer</span>
          </button>
        </div>
      )}

      {/* Embedded LPP or Function Grapher inside Module 2 / Module 4 */}
      {mod.id === 4 && subView === 'lpp' && <GraphLppLab embedded initialMode="lpp" />}
      {(mod.id === 2 || mod.id === 4) && subView === 'functions' && (
        <GraphLppLab embedded initialMode="functions" />
      )}

      {/* Topic List */}
      {subView === 'topics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mod.topicIds.map((tid, idx) => {
            const topic = topicsData[tid];
            if (!topic) return null;
            const isDone = completedTopics.has(tid);

            return (
              <div
                key={tid}
                className="module-bento-card"
                style={{ cursor: 'pointer', padding: 20 }}
                onClick={() => navigate(`/topic/${tid}`)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: '1 1 520px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span className="section-num-badge">Topic 0{idx + 1}</span>
                      <h2 style={{ margin: 0, fontSize: 19 }}>{topic.title}</h2>
                    </div>
                    <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--text-secondary)' }}>
                      <MathText text={topic.summary} />
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {topic.subtopics.map((sub) => (
                        <span key={sub} className="badge badge-muted" style={{ fontSize: 11.5, fontWeight: 500 }}>
                          <MathText text={sub} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => toggleTopicComplete(tid)}
                      title={isDone ? 'Mark as unread' : 'Mark topic completed'}
                    >
                      {isDone ? (
                        <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                      ) : (
                        <Circle size={16} style={{ color: 'var(--text-muted)' }} />
                      )}
                      <span>{isDone ? 'Completed' : 'Mark Read'}</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/topic/${tid}`)}
                    >
                      <span>Study</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className="callout callout-green"
            style={{
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: 14.5 }}>
                  End of {mod.code} Topics ({mod.topicIds.length}/{mod.topicIds.length}) ✓
                </strong>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                  {mod.topicIds.every((tid) => completedTopics.has(tid))
                    ? `All topics in ${mod.code} marked completed.`
                    : `Shift through Topics 01–0${mod.topicIds.length} within ${mod.code}.`}
                </div>
              </div>
            </div>
            <span className="badge" style={{ color: 'var(--success)', borderColor: 'rgba(52, 211, 153, 0.35)', background: 'var(--bg-callout-green)' }}>
              <CheckCircle2 size={13} />
              <span>{mod.code} Complete Boundary</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
