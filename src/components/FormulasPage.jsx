import React, { useMemo, useState } from 'react';
import { Check, Copy, Pin, Search } from 'lucide-react';
import { formulasData } from '../data/formulas';
import { modulesData } from '../data/modules';
import { useCourse } from '../context/CourseContext';
import { MathText } from './MathText';

export function FormulasPage() {
  const { pinnedFormulas, togglePinFormula } = useCourse();
  const [moduleFilter, setModuleFilter] = useState('all');
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return formulasData.filter((f) => {
      if (moduleFilter !== 'all' && f.moduleId !== Number(moduleFilter)) return false;
      if (onlyPinned && !pinnedFormulas.has(f.id)) return false;
      if (
        q &&
        !f.title.toLowerCase().includes(q) &&
        !f.category.toLowerCase().includes(q) &&
        !f.note.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [moduleFilter, onlyPinned, query, pinnedFormulas]);

  const copyTex = async (id, tex) => {
    try {
      await navigator.clipboard.writeText(tex);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <span className="badge" style={{ marginBottom: 6 }}>
          Quick Revision · KaTeX Rendered
        </span>
        <h1 style={{ margin: '4px 0 6px', fontSize: 28 }}>Formula & Theorem Cheat Sheet</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Pin must-know equations for last-minute exam revision or copy LaTeX expressions directly.
        </p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 18, padding: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <Search
              size={15}
              style={{ position: 'absolute', left: 11, top: 12, color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              className="input"
              style={{ paddingLeft: 34 }}
              placeholder="Filter formulas or theorems..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="select"
            style={{ width: 210 }}
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
          >
            <option value="all">All 4 Modules</option>
            {modulesData.map((m) => (
              <option key={m.id} value={m.id}>
                {m.code}: {m.title}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={`btn btn-sm ${onlyPinned ? 'btn-primary' : ''}`}
            onClick={() => setOnlyPinned((v) => !v)}
          >
            <Pin size={14} />
            <span>Pinned ({pinnedFormulas.size})</span>
          </button>
        </div>
      </div>

      <div className="grid-2">
        {filtered.map((f) => {
          const isPinned = pinnedFormulas.has(f.id);
          return (
            <div key={f.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span className="badge">Module {f.moduleId}</span>
                  <span className="badge badge-muted">{f.category}</span>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    className="icon-btn"
                    title="Copy LaTeX"
                    onClick={() => copyTex(f.id, f.latex)}
                  >
                    {copiedId === f.id ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    style={isPinned ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}
                    title="Pin formula"
                    onClick={() => togglePinFormula(f.id)}
                  >
                    <Pin size={14} />
                  </button>
                </div>
              </div>

              <h3 style={{ margin: 0, fontSize: 17 }}>{f.title}</h3>
              <MathText text={`$$${f.latex}$$`} />
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)' }}>{f.note}</p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          No formulas match the selected filter.
        </div>
      )}
    </div>
  );
}
