import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  HelpCircle,
  Layers,
  LineChart,
  Sparkles,
} from 'lucide-react';
import { modulesData } from '../data/modules';
import { topicsData } from '../data/topics';
import { flashcardsData } from '../data/flashcards';
import { quizzesData } from '../data/quizzes';
import { useCourse } from '../context/CourseContext';
import { GraphLppLab } from './GraphLppLab';
import { MathText } from './MathText';

export function TopicPage({ topicId }) {
  const {
    navigate,
    completedTopics,
    toggleTopicComplete,
    masteredCards,
    toggleMastered,
    openGraphLab,
  } = useCourse();

  const [activeTab, setActiveTab] = useState('notes');
  const [m4LabMode, setM4LabMode] = useState('lpp');
  const [flippedIds, setFlippedIds] = useState(() => new Set());

  useEffect(() => {
    setActiveTab('notes');
  }, [topicId]);

  const topic = topicsData[topicId];

  if (!topic) {
    return (
      <div className="container" style={{ paddingTop: 32 }}>
        <div className="card">
          <h2>Topic not found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            No topic exists for ID <code>{topicId}</code>. Check <code>src/data/topics.js</code>.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  const mod = modulesData.find((m) => m.id === topic.moduleId);
  const modTopicIds = mod?.topicIds || [];
  const topicCards = flashcardsData.filter((fc) => fc.topicId === topic.id);
  const topicQuizzes = quizzesData.filter((q) => q.topicId === topic.id);
  const isDone = completedTopics.has(topic.id);

  // Stay strictly within the current module's topic list (do not cross to next module)
  const currentIdx = modTopicIds.indexOf(topic.id);
  const prevTopicId = currentIdx > 0 ? modTopicIds[currentIdx - 1] : null;
  const nextTopicId =
    currentIdx >= 0 && currentIdx + 1 < modTopicIds.length ? modTopicIds[currentIdx + 1] : null;
  const prevTopic = prevTopicId ? topicsData[prevTopicId] : null;
  const nextTopic = nextTopicId ? topicsData[nextTopicId] : null;

  const toggleFlip = (id) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
          marginBottom: 16,
        }}
      >
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => navigate(`/module/${topic.moduleId}`)}
        >
          <ArrowLeft size={14} />
          <span>
            {mod?.code} · {mod?.title}
          </span>
        </button>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-sm" onClick={() => toggleTopicComplete(topic.id)}>
            {isDone ? (
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
            ) : (
              <Circle size={15} style={{ color: 'var(--text-muted)' }} />
            )}
            <span>{isDone ? 'Completed' : 'Mark Topic Read'}</span>
          </button>

          {topic.lppPresetIndex !== undefined && (
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => {
                if (topic.id === 'm4-lpp') {
                  setM4LabMode('lpp');
                  setActiveTab('lpp');
                } else {
                  openGraphLab({ mode: 'lpp', lppPresetIndex: topic.lppPresetIndex });
                }
              }}
            >
              <LineChart size={15} />
              <span>{topic.id === 'm4-lpp' ? 'Open LPP Solver Tab' : 'Solve in LPP Graph Lab'}</span>
            </button>
          )}

          {topic.graphPreset && (
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => openGraphLab({ mode: 'functions', expr: topic.graphPreset.expr })}
            >
              <LineChart size={15} />
              <span>{topic.graphPreset.label}</span>
            </button>
          )}
        </div>
      </div>

      {/* In-Module Topic Shifting Bar (confined to current module) */}
      <div className="mini-navbar" aria-label={`${mod?.code} Topic Switcher`}>
        {modTopicIds.map((tid, idx) => {
          const item = topicsData[tid];
          if (!item) return null;
          const isCurrent = tid === topic.id;
          const itemDone = completedTopics.has(tid);
          return (
            <button
              key={tid}
              type="button"
              className={`mini-nav-btn ${isCurrent ? 'active' : ''}`}
              onClick={() => navigate(`/topic/${tid}`)}
            >
              {itemDone && (
                <CheckCircle2
                  size={14}
                  style={{ color: isCurrent ? '#ffffff' : 'var(--success)', flexShrink: 0 }}
                />
              )}
              <span>
                0{idx + 1}. {item.title}
              </span>
            </button>
          );
        })}
        <span
          className="badge"
          style={{
            background: 'var(--bg-callout-green)',
            color: 'var(--success)',
            borderColor: 'rgba(52, 211, 153, 0.38)',
            marginLeft: 2,
          }}
          title={`End of ${mod?.code}`}
        >
          <CheckCircle2 size={14} />
          <span>End of {mod?.code}</span>
        </span>
      </div>

      {/* Hero Header */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>{topic.title}</h1>
        <p style={{ margin: '0 0 14px', color: 'var(--text-secondary)', fontSize: 15 }}>
          <MathText text={topic.summary} />
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {topic.subtopics.map((sub) => (
            <span key={sub} className="badge badge-muted" style={{ fontSize: 12, fontWeight: 500 }}>
              <MathText text={sub} />
            </span>
          ))}
        </div>
      </div>

      {/* Workspace Mode Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        <button
          type="button"
          className={`btn btn-sm ${activeTab === 'notes' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          <BookOpen size={15} />
          <span>Study Notes ({topic.sections.length})</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm ${activeTab === 'flashcards' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          <Layers size={15} />
          <span>Quick Flashcards ({topicCards.length})</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm ${activeTab === 'practice' ? 'btn-primary' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <HelpCircle size={15} />
          <span>Topic Quiz ({topicQuizzes.length})</span>
        </button>

        {topic.id === 'm4-lpp' && (
          <>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'lpp' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('lpp')}
            >
              <LineChart size={15} />
              <span>LPP Graphical Solver</span>
            </button>

            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'functions' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('functions')}
            >
              <Sparkles size={15} />
              <span>f(x) &amp; f&apos;(x) Graph Drawer</span>
            </button>
          </>
        )}
      </div>

      {/* Tab 1: Study Notes */}
      {activeTab === 'notes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Key Takeaways */}
          <div className="callout callout-green" style={{ margin: 0 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={17} style={{ color: 'var(--success)' }} />
              <span>Key Takeaways</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {topic.keyTakeaways.map((item, i) => (
                <li key={i} style={{ fontSize: 14.5 }}>
                  <MathText text={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Numbered Sections */}
          {topic.sections.map((sec) => {
            const examples = sec.workedExamples || (sec.workedExample ? [sec.workedExample] : []);
            return (
              <div key={sec.num} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span className="section-num-badge">{sec.num}</span>
                  <h2 style={{ margin: 0, fontSize: 20 }}>{sec.title}</h2>
                </div>

                {sec.paragraphs?.map((p, idx) => (
                  <p key={idx} style={{ margin: '0 0 10px', color: 'var(--text-secondary)', fontSize: 15 }}>
                    <MathText text={p} />
                  </p>
                ))}

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul
                    style={{
                      margin: '8px 0 12px',
                      paddingLeft: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 7,
                      color: 'var(--text-secondary)',
                      fontSize: 14.5,
                    }}
                  >
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        <MathText text={b} />
                      </li>
                    ))}
                  </ul>
                )}

                {sec.formula && <MathText text={`$$${sec.formula}$$`} />}

                {sec.keyIdea && (
                  <div className="callout">
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent)', marginBottom: 4 }}>
                      KEY IDEA
                    </div>
                    <div style={{ fontSize: 14.5 }}>
                      <MathText text={sec.keyIdea} />
                    </div>
                  </div>
                )}

                {sec.table && (
                  <div className="data-table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          {sec.table.headers.map((h) => (
                            <th key={h}>
                              <MathText text={h} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>
                                <MathText text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="callout callout-purple"
                    style={{ marginBottom: exIdx === examples.length - 1 ? 0 : 12 }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--purple)', marginBottom: 6 }}>
                      {examples.length > 1 ? `WORKED EXAMPLE ${exIdx + 1}` : 'WORKED EXAMPLE'}
                    </div>
                    <div style={{ fontWeight: 600, marginBottom: 10 }}>
                      <MathText text={ex.problem} />
                    </div>
                    <ol style={{ margin: '0 0 10px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {ex.steps.map((st, sIdx) => (
                        <li key={sIdx} style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                          <MathText text={st} />
                        </li>
                      ))}
                    </ol>
                    <div
                      style={{
                        paddingTop: 8,
                        borderTop: '1px solid var(--border-subtle)',
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Result: <MathText text={ex.answer} />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Embedded Interactive Graph & LPP Platform inside Module 4 Topic 3 */}
          {topic.id === 'm4-lpp' && (
            <div className="card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div>
                  <span className="badge" style={{ marginBottom: 6 }}>
                    Interactive Platform · Module 4 Topic 3
                  </span>
                  <h2 style={{ margin: '2px 0 0', fontSize: 21 }}>
                    Graph &amp; LPP Interactive Solver
                  </h2>
                </div>

                <div className="mini-navbar" style={{ marginBottom: 0 }}>
                  <button
                    type="button"
                    className={`mini-nav-btn ${m4LabMode === 'lpp' ? 'active' : ''}`}
                    onClick={() => setM4LabMode('lpp')}
                  >
                    <LineChart size={15} />
                    <span>LPP Graphical Solver</span>
                  </button>
                  <button
                    type="button"
                    className={`mini-nav-btn ${m4LabMode === 'functions' ? 'active' : ''}`}
                    onClick={() => setM4LabMode('functions')}
                  >
                    <Sparkles size={15} />
                    <span>Function &amp; f&apos;(x) Graph Drawer</span>
                  </button>
                </div>
              </div>

              <GraphLppLab embedded initialMode={m4LabMode} />
            </div>
          )}
        </div>
      )}

      {/* Dedicated Embedded Graph & LPP Tabs inside Module 4 Topic 3 */}
      {topic.id === 'm4-lpp' && activeTab === 'lpp' && (
        <GraphLppLab embedded initialMode="lpp" />
      )}
      {topic.id === 'm4-lpp' && activeTab === 'functions' && (
        <GraphLppLab embedded initialMode="functions" />
      )}

      {/* Tab 2: Quick Flashcards */}
      {activeTab === 'flashcards' && (
        <div>
          {topicCards.length === 0 ? (
            <div className="card">No flashcards mapped to this topic yet.</div>
          ) : (
            <div className="grid-2">
              {topicCards.map((fc) => {
                const flipped = flippedIds.has(fc.id);
                const mastered = masteredCards.has(fc.id);
                return (
                  <div key={fc.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="flashcard-scene" onClick={() => toggleFlip(fc.id)}>
                      <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
                        <div className="flashcard-face">
                          <span className="badge badge-muted" style={{ alignSelf: 'flex-start' }}>
                            Question · Tap to flip
                          </span>
                          <div style={{ fontSize: 16, fontWeight: 600 }}>
                            <MathText text={fc.front} />
                          </div>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                            Topic: {topic.title}
                          </span>
                        </div>
                        <div className="flashcard-face flashcard-back">
                          <span className="badge" style={{ alignSelf: 'flex-start' }}>
                            Answer
                          </span>
                          <div style={{ fontSize: 15 }}>
                            <MathText text={fc.back} />
                          </div>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                            Tap to flip back
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`btn btn-sm ${mastered ? 'btn-primary' : ''}`}
                      onClick={() => toggleMastered(fc.id)}
                    >
                      <CheckCircle2 size={15} />
                      <span>{mastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Topic Quiz */}
      {activeTab === 'practice' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
            <div>
              <h3 style={{ margin: 0 }}>Quick Check Questions ({topicQuizzes.length})</h3>
              <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--text-secondary)' }}>
                Launch the interactive Quiz Runner filtered to Module {topic.moduleId}.
              </p>
            </div>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/quiz')}>
              <Sparkles size={15} />
              <span>Open Full Quiz Mode</span>
            </button>
          </div>

          {topicQuizzes.map((q, idx) => (
            <div key={q.id} className="callout" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                Q{idx + 1}. <MathText text={q.question} />
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                Answer: <MathText text={q.options[q.correctIndex]} /> —{' '}
                <MathText text={q.explanation} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* In-Module Topic Shifting Section (never crosses to next module) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 26 }}>
        {prevTopic && (
          <div
            className="card card-interactive"
            style={{
              flex: '1 1 260px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
            onClick={() => navigate(`/topic/${prevTopic.id}`)}
          >
            <ArrowLeft size={20} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
            <div style={{ textAlign: 'right', flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                PREVIOUS IN {mod?.code?.toUpperCase()}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{prevTopic.title}</div>
            </div>
          </div>
        )}

        {nextTopic ? (
          <div
            className="card card-interactive"
            style={{
              flex: '1 1 260px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
            onClick={() => navigate(`/topic/${nextTopic.id}`)}
          >
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                NEXT TOPIC IN {mod?.code?.toUpperCase()}
              </div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{nextTopic.title}</div>
            </div>
            <ArrowRight size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          </div>
        ) : (
          <div
            className="callout callout-green"
            style={{
              flex: '1 1 280px',
              margin: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle2 size={26} style={{ color: 'var(--success)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700 }}>
                  {mod?.code?.toUpperCase()} TOPICS FINISHED
                </div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>
                  You&apos;ve reached the end of {mod?.code}: {mod?.title} ✓
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => navigate(`/module/${mod?.id}`)}
            >
              <ArrowLeft size={14} />
              <span>Back to {mod?.code}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
