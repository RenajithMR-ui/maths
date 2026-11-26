import React, { useMemo, useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, ExternalLink, Flame, LineChart } from 'lucide-react';
import { pyqData } from '../data/pyq';
import { courseConfig } from '../data/courseConfig';
import { useCourse } from '../context/CourseContext';
import { MathText } from './MathText';

export function PyqPage() {
  const { openGraphLab } = useCourse();
  const [batchFilter, setBatchFilter] = useState('2024-28');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [openHints, setOpenHints] = useState(() => new Set());

  const toggleHint = (id) => {
    setOpenHints((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const papers = useMemo(() => {
    return pyqData.questionPapers.filter((p) => p.batch === batchFilter);
  }, [batchFilter]);

  const questions =
    moduleFilter === 'all'
      ? pyqData.sampleQuestions
      : pyqData.sampleQuestions.filter((q) => q.moduleId === Number(moduleFilter));

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <span className="badge" style={{ marginBottom: 6 }}>
          {pyqData.summary.examFormat}
        </span>
        <h1 style={{ margin: '4px 0 6px', fontSize: 28 }}>
          University Question Papers &amp; PYQ Analyzer
        </h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Year-wise SAC KSU CET question papers (outside the 4 modules), topic weightage heatmap,
          and model practice problems.
        </p>
      </div>

      {/* Question Papers Archive */}
      <div className="card" style={{ marginBottom: 22 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 14,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 19 }}>Official Question Papers by Year &amp; Batch</h2>
          <div className="mini-navbar" style={{ marginBottom: 0 }}>
            <button
              type="button"
              className={`mini-nav-btn ${batchFilter === '2024-28' ? 'active' : ''}`}
              onClick={() => setBatchFilter('2024-28')}
            >
              2024–28 · 2024 (5)
            </button>
            <button
              type="button"
              className={`mini-nav-btn ${batchFilter === '2025-29' ? 'active' : ''}`}
              onClick={() => setBatchFilter('2025-29')}
            >
              2025–29 · 2025 (5)
            </button>
          </div>
        </div>

        <div className="grid-3">
          {papers.map((qp) => (
            <div key={qp.id} className="qp-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
                  <span className="badge">
                    <Calendar size={12} />
                    <span>Year {qp.year} · {qp.batch}</span>
                  </span>
                  <span className="badge badge-muted" style={{ fontSize: 11 }}>
                    {qp.examType}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 3 }}>{qp.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{qp.scope}</div>
              </div>

              <a href={qp.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                <span>Open PDF</span>
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Frequency Heatmap */}
      <div className="card" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 19 }}>High-Yield Topic Heatmap</h2>
        </div>
        <div className="data-table-wrap" style={{ margin: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Topic / Pattern</th>
                <th>Exam Part</th>
                <th>Avg Marks</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {pyqData.topicHeatmap.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <span className="badge badge-muted">Module {row.moduleId}</span>
                  </td>
                  <td>{row.topic}</td>
                  <td>{row.part}</td>
                  <td>{row.avgMarks}</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        color: row.heat === 'high' ? 'var(--warning)' : 'var(--accent)',
                      }}
                    >
                      <Flame size={12} />
                      <span>{row.heat === 'high' ? 'Very High' : 'Medium'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sample Practice Questions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Model &amp; PYQ Practice Set</h2>
        <select
          className="select"
          style={{ width: 200 }}
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
        >
          <option value="all">All 4 Modules</option>
          <option value="1">Module 1</option>
          <option value="2">Module 2</option>
          <option value="3">Module 3</option>
          <option value="4">Module 4</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {questions.map((q) => {
          const isOpen = openHints.has(q.id);
          return (
            <div key={q.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="badge">Module {q.moduleId}</span>
                  <span className="badge badge-muted">
                    {q.part} · {q.marks} Marks
                  </span>
                </div>

                {q.id === 'pyq-8' && (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => openGraphLab({ mode: 'lpp', lppPresetIndex: 0 })}
                  >
                    <LineChart size={14} />
                    <span>Solve in LPP Graph Lab</span>
                  </button>
                )}
              </div>

              <div style={{ fontSize: 15.5, fontWeight: 500, marginBottom: 10 }}>
                <MathText text={q.question} />
              </div>

              <button type="button" className="btn btn-sm" onClick={() => toggleHint(q.id)}>
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{isOpen ? 'Hide Solution Hint' : 'Show Solution Hint'}</span>
              </button>

              {isOpen && (
                <div className="callout callout-green" style={{ marginBottom: 0 }}>
                  <MathText text={q.hint} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
