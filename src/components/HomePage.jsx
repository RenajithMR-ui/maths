import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  GitBranch,
  HelpCircle,
  Layers,
  LineChart,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { courseConfig } from '../data/courseConfig';
import { modulesData } from '../data/modules';
import { topicsData } from '../data/topics';
import { formulasData } from '../data/formulas';
import { flashcardsData } from '../data/flashcards';
import { quizzesData } from '../data/quizzes';
import { pyqData } from '../data/pyq';
import { useCourse } from '../context/CourseContext';
import { MathText } from './MathText';

export function HomePage() {
  const { navigate, masteredCards, completedTopics } = useCourse();
  const totalTopics = Object.keys(topicsData).length;

  const [batchFilter, setBatchFilter] = useState('2024-28');

  const filteredPapers = useMemo(() => {
    return pyqData.questionPapers.filter((p) => p.batch === batchFilter);
  }, [batchFilter]);

  return (
    <div className="container">
      {/* SAC LEARN Heading Hero */}
      <section className="bento-hero">
        <div className="hero-main-panel">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span className="badge">
                <Sparkles size={13} />
                <span>{courseConfig.heroBadge}</span>
              </span>
              <span className="badge badge-muted">
                {courseConfig.courseCode} · {courseConfig.credits} Credits
              </span>
            </div>

            <h1 className="hero-title">
              Master Mathematics for{' '}
              <span className="hero-title-accent">Information Science.</span>
            </h1>

            <p className="hero-desc">{courseConfig.heroDescription}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button type="button" className="btn btn-primary" onClick={() => navigate('/module/1')}>
                <BookOpen size={16} />
                <span>Start Module 1</span>
                <ArrowRight size={15} />
              </button>

              <button type="button" className="btn" onClick={() => navigate('/graph-lab')}>
                <LineChart size={16} style={{ color: 'var(--accent)' }} />
                <span>Graph &amp; LPP Lab</span>
              </button>

              <a href={courseConfig.referenceBanner.url} target="_blank" rel="noreferrer" className="btn">
                <ExternalLink size={15} />
                <span>SAC Notes</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Course Overview">
        <div className="stat-box">
          <div className="stat-value">{modulesData.length}</div>
          <div className="stat-label">Syllabus Modules</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalTopics}</div>
          <div className="stat-label">GAMAT101 Topics</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{pyqData.questionPapers.length}</div>
          <div className="stat-label">SAC Question Papers</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{formulasData.length}</div>
          <div className="stat-label">KaTeX Formulas</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{flashcardsData.length + quizzesData.length}</div>
          <div className="stat-label">Cards &amp; Quiz Items</div>
        </div>
      </section>

      {/* 4 Modules Bento Track */}
      <div className="section-heading">
        <div>
          <h2>4-Module Learning Track</h2>
          <p>Structured KTU 2024 GAMAT101 notes with embedded graph tools inside Modules 2 &amp; 4.</p>
        </div>
        <button type="button" className="btn btn-sm" onClick={() => navigate('/about')}>
          <Sparkles size={14} />
          <span>Customize Base Model</span>
        </button>
      </div>

      <section className="bento-modules">
        {modulesData.map((mod) => {
          const modFlashcards = flashcardsData.filter((f) => f.moduleId === mod.id);
          const masteredCount = modFlashcards.filter((f) => masteredCards.has(f.id)).length;
          const cardPct = modFlashcards.length
            ? Math.round((masteredCount / modFlashcards.length) * 100)
            : 0;
          const doneTopics = mod.topicIds.filter((tid) => completedTopics.has(tid)).length;

          return (
            <div
              key={mod.id}
              className="module-bento-card"
              style={{
                cursor: 'pointer',
                backgroundImage: `radial-gradient(circle at top right, ${mod.accent}18, transparent 58%)`,
              }}
              onClick={() => navigate(`/module/${mod.id}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="module-numeral" style={{ color: mod.accent }}>
                    0{mod.id}
                  </span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: mod.accent }}>
                      {mod.code} · {mod.hours}
                    </div>
                    <h3 style={{ margin: '2px 0 0', fontSize: 19 }}>{mod.title}</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  {mod.id === 2 && (
                    <span className="badge" style={{ fontSize: 11 }}>
                      f(x) &amp; f&apos;(x) Grapher
                    </span>
                  )}
                  {mod.id === 4 && (
                    <span className="badge" style={{ fontSize: 11 }}>
                      LPP &amp; Graph Solver
                    </span>
                  )}
                  <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                    {doneTopics}/{mod.topicIds.length} topics read
                  </span>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>{mod.summary}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {mod.topicIds.map((tid) => {
                  const topic = topicsData[tid];
                  if (!topic) return null;
                  return (
                    <span
                      key={tid}
                      className="badge badge-muted"
                      style={{ fontSize: 11, fontWeight: 500 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/topic/${tid}`);
                      }}
                    >
                      {topic.title}
                    </span>
                  );
                })}
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    marginBottom: 6,
                  }}
                >
                  <span>Flashcard mastery</span>
                  <span>
                    {masteredCount}/{modFlashcards.length} ({cardPct}%)
                  </span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${cardPct}%` }} />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                  paddingTop: 10,
                  borderTop: '1px solid var(--border-subtle)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {mod.videoPlaylistUrl && (
                    <a href={mod.videoPlaylistUrl} target="_blank" rel="noreferrer" className="btn btn-sm">
                      <PlayCircle size={14} />
                      <span>SAC Videos</span>
                    </a>
                  )}
                  {mod.formulaPdfUrl && (
                    <a href={mod.formulaPdfUrl} target="_blank" rel="noreferrer" className="btn btn-sm">
                      <FileText size={14} />
                      <span>SAC PDF</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/module/${mod.id}`)}
                >
                  <span>Open Module</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* OUTER OF MODULES: University Question Papers with Year & Batch Details */}
      <div className="section-heading">
        <div>
          <h2>University Question Papers &amp; Year Archive</h2>
          <p>
            Official SAC KSU CET Mathematics question papers organized by batch &amp; exam year (outside
            the 4 modules).
          </p>
        </div>

        <div className="mini-navbar" style={{ marginBottom: 0 }}>
          <button
            type="button"
            className={`mini-nav-btn ${batchFilter === '2024-28' ? 'active' : ''}`}
            onClick={() => setBatchFilter('2024-28')}
          >
            2024–28 · Year 2024 (5)
          </button>
          <button
            type="button"
            className={`mini-nav-btn ${batchFilter === '2025-29' ? 'active' : ''}`}
            onClick={() => setBatchFilter('2025-29')}
          >
            2025–29 · Year 2025 (5)
          </button>
        </div>
      </div>

      <section className="grid-3">
        {filteredPapers.map((qp) => (
          <div key={qp.id} className="qp-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span className="badge">
                  <Calendar size={12} />
                  <span>Year {qp.year} · {qp.batch}</span>
                </span>
                <span className="badge badge-muted" style={{ fontSize: 11 }}>
                  {qp.examType}
                </span>
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 16.5 }}>{qp.title}</h3>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{qp.scope}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>PDF · SAC Archive</span>
              <a href={qp.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                <span>Open Paper</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Selective Notes Highlights from ASC SFI CET (GAMAT101) */}
      <div className="section-heading">
        <div>
          <h2>Selective Exam Highlights (ASC SFI CET Reference)</h2>
          <p>Curated high-yield takeaways distilled from GAMAT101 important topics &amp; practice sets.</p>
        </div>
        <a href={courseConfig.ascPortalUrl} target="_blank" rel="noreferrer" className="btn btn-sm">
          <span>Open ASC GAMAT101 Portal</span>
          <ExternalLink size={13} />
        </a>
      </div>

      <section className="grid-2">
        {pyqData.ascSelectiveNotes.map((item) => (
          <div
            key={item.title}
            className="callout"
            style={{ margin: 0, cursor: 'pointer' }}
            onClick={() => navigate(`/module/${item.moduleId}`)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span className="badge" style={{ fontSize: 11 }}>{item.tag}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Module {item.moduleId} →</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
              <MathText text={item.note} />
            </div>
          </div>
        ))}
      </section>

      {/* Study Tools Quick Bento */}
      <div className="section-heading">
        <div>
          <h2>Revision Tools &amp; Practice Suite</h2>
          <p>Everything needed for Part A conceptual checks and Part B problem solving.</p>
        </div>
      </div>

      <section className="grid-4">
        <div className="card card-interactive" style={{ cursor: 'pointer' }} onClick={() => navigate('/formulas')}>
          <FileText size={22} style={{ color: 'var(--accent)', marginBottom: 10 }} />
          <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>Formula Cheat Sheet</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
            Pin must-know theorems &amp; copy LaTeX expressions in one click.
          </p>
        </div>

        <div className="card card-interactive" style={{ cursor: 'pointer' }} onClick={() => navigate('/mindmap')}>
          <GitBranch size={22} style={{ color: 'var(--purple)', marginBottom: 10 }} />
          <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>Syllabus Mind Map</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
            Visual hierarchy linking all 4 modules and 12 topics.
          </p>
        </div>

        <div className="card card-interactive" style={{ cursor: 'pointer' }} onClick={() => navigate('/flashcards')}>
          <Layers size={22} style={{ color: 'var(--success)', marginBottom: 10 }} />
          <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>LaTeX Flashcards</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
            Active-recall flip cards with persistent mastery tracking.
          </p>
        </div>

        <div className="card card-interactive" style={{ cursor: 'pointer' }} onClick={() => navigate('/quiz')}>
          <HelpCircle size={22} style={{ color: 'var(--warning)', marginBottom: 10 }} />
          <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>Topic &amp; Module Quiz</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
            MCQ drills with step-by-step KaTeX explanations &amp; streaks.
          </p>
        </div>
      </section>

      {/* Exam Pattern & Course Outcomes */}
      <div className="section-heading">
        <div>
          <h2>KTU Exam Blueprint &amp; Course Outcomes</h2>
          <p>Assessment weightage and reference textbooks for {courseConfig.courseCode}.</p>
        </div>
      </div>

      <section className="grid-2">
        <div className="card">
          <h3 style={{ margin: '0 0 12px', fontSize: 17 }}>
            End Semester Exam ({courseConfig.examPattern.endSem.totalMarks} Marks ·{' '}
            {courseConfig.examPattern.endSem.duration})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {courseConfig.examPattern.endSem.parts.map((p) => (
              <div key={p.name} className="callout" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>{p.name}</span>
                  <span style={{ color: 'var(--accent)' }}>{p.marks} Marks</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{p.detail}</div>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '0 0 10px', fontSize: 15 }}>
            Internal Evaluation ({courseConfig.examPattern.internal.totalMarks} Marks)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {courseConfig.examPattern.internal.breakdown.map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>{item.label}</span>
                  <strong>{item.marks} Marks</strong>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${(item.marks / courseConfig.examPattern.internal.totalMarks) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ margin: '0 0 12px', fontSize: 17 }}>Course Outcomes &amp; Textbooks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {courseConfig.courseOutcomes.map((co) => (
              <div
                key={co.code}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  paddingBottom: 10,
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span className="badge" style={{ flexShrink: 0 }}>
                  {co.code} · {co.level}
                </span>
                <span style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>{co.text}</span>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '0 0 8px', fontSize: 15 }}>Prescribed Textbooks</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {courseConfig.textbooks.map((tb) => (
              <div key={tb.title} className="callout callout-green" style={{ margin: 0, padding: '10px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{tb.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                  {tb.authors} — {tb.scope}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
