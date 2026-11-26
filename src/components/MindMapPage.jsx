import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, GitBranch } from 'lucide-react';
import { modulesData } from '../data/modules';
import { topicsData } from '../data/topics';
import { courseConfig } from '../data/courseConfig';
import { useCourse } from '../context/CourseContext';
import { MathText } from './MathText';

export function MindMapPage() {
  const { navigate } = useCourse();
  const [expanded, setExpanded] = useState(() => new Set([1, 2, 3, 4]));

  const toggleModule = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div>
          <span className="badge" style={{ marginBottom: 6 }}>
            Visual Syllabus Hierarchy
          </span>
          <h1 style={{ margin: '4px 0 6px', fontSize: 28 }}>Course Mind Map</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Explore how every topic and subtopic fits into {courseConfig.courseTitle}.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setExpanded(new Set(modulesData.map((m) => m.id)))}
          >
            Expand All
          </button>
          <button type="button" className="btn btn-sm" onClick={() => setExpanded(new Set())}>
            Collapse All
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20, borderColor: 'var(--border-strong)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <GitBranch size={20} style={{ color: 'var(--accent)' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>
              {courseConfig.courseCode}: {courseConfig.courseTitle}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              4 Modules · {Object.keys(topicsData).length} Topics
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {modulesData.map((mod) => {
          const isOpen = expanded.has(mod.id);
          return (
            <div key={mod.id} className="card">
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  <span className="badge" style={{ color: mod.accent }}>
                    {mod.code}
                  </span>
                  <strong style={{ fontSize: 18 }}>{mod.title}</strong>
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {mod.topicIds.length} topics
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    marginTop: 14,
                    paddingLeft: 18,
                    borderLeft: `2px solid ${mod.accent}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {mod.topicIds.map((tid) => {
                    const topic = topicsData[tid];
                    if (!topic) return null;
                    return (
                      <div
                        key={tid}
                        className="callout"
                        style={{
                          margin: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 12,
                          flexWrap: 'wrap',
                        }}
                        onClick={() => navigate(`/topic/${tid}`)}
                      >
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: 6 }}>{topic.title}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {topic.subtopics.map((sub) => (
                              <span
                                key={sub}
                                className="badge badge-muted"
                                style={{ fontSize: 11.5, fontWeight: 500 }}
                              >
                                <MathText text={sub} />
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="btn btn-sm btn-primary">
                          <span>Open</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
