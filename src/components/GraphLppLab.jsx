import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Plus, RotateCcw, Sparkles, Trash2 } from 'lucide-react';
import { LPP_PRESETS, solveGraphicalLPP } from '../utils/lppSolver';
import {
  analyzeFunctionExpression,
  numericalSecondDerivative,
} from '../utils/mathParser';
import { useCourse } from '../context/CourseContext';
import { MathText } from './MathText';

const LINE_COLORS = ['#2dd4bf', '#a5b4fc', '#34d399', '#fbbf24', '#fb7185', '#f97316'];

const FUNCTION_PRESETS = [
  {
    name: 'Cubic & Derivative f(x) = x^3 - 3x',
    fns: [{ expr: 'x^3 - 3*x', color: '#2dd4bf', enabled: true }],
    window: { xMin: -4, xMax: 4, yMin: -6, yMax: 6 },
    tangentX: 1.3,
  },
  {
    name: 'Trigonometric Decay sin(2x) + 0.5*x^2',
    fns: [{ expr: 'sin(2*x) + 0.5*x^2', color: '#2dd4bf', enabled: true }],
    window: { xMin: -5, xMax: 5, yMin: -3, yMax: 10 },
    tangentX: 1.0,
  },
  {
    name: 'Concavity & Inflection x^4 - 4*x^3',
    fns: [{ expr: 'x^4 - 4*x^3', color: '#34d399', enabled: true }],
    window: { xMin: -2, xMax: 5, yMin: -30, yMax: 20 },
    tangentX: 2.0,
  },
  {
    name: 'Gaussian Bell Curve exp(-x^2/2)',
    fns: [{ expr: 'exp(-x^2/2)', color: '#fbbf24', enabled: true }],
    window: { xMin: -5, xMax: 5, yMin: -1, yMax: 1.4 },
    tangentX: 1.0,
  },
];

function niceStep(span) {
  const raw = Math.max(span, 0.001) / 8;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const mult = raw / pow;
  if (mult <= 1.5) return pow;
  if (mult <= 3.5) return 2 * pow;
  if (mult <= 7) return 5 * pow;
  return 10 * pow;
}

export function GraphLppLab({ embedded = false, initialMode = null }) {
  const { graphLabLaunch } = useCourse();
  const [labMode, setLabMode] = useState(initialMode || 'lpp');

  // --- LPP State ---
  const [sense, setSense] = useState(LPP_PRESETS[0].sense);
  const [c1, setC1] = useState(LPP_PRESETS[0].c1);
  const [c2, setC2] = useState(LPP_PRESETS[0].c2);
  const [nonNegative, setNonNegative] = useState(LPP_PRESETS[0].nonNegative);
  const [constraints, setConstraints] = useState(LPP_PRESETS[0].constraints);
  const [isoZ, setIsoZ] = useState(null);

  // --- Function Grapher State ---
  const [fnList, setFnList] = useState(FUNCTION_PRESETS[0].fns);
  const [win, setWin] = useState(FUNCTION_PRESETS[0].window);
  const [showDerivative, setShowDerivative] = useState(true);
  const [showTangent, setShowTangent] = useState(true);
  const [tangentX, setTangentX] = useState(FUNCTION_PRESETS[0].tangentX);
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    if (initialMode) {
      setLabMode(initialMode);
    }
  }, [initialMode]);

  // Respect navigation launch presets from Topic pages
  useEffect(() => {
    if (!graphLabLaunch || embedded) return;
    if (graphLabLaunch.mode === 'lpp') {
      setLabMode('lpp');
      if (typeof graphLabLaunch.lppPresetIndex === 'number') {
        loadLppPreset(graphLabLaunch.lppPresetIndex);
      }
    } else if (graphLabLaunch.mode === 'functions') {
      setLabMode('functions');
      if (graphLabLaunch.expr) {
        setFnList([{ expr: graphLabLaunch.expr, color: '#2dd4bf', enabled: true }]);
      }
    }
  }, [graphLabLaunch, embedded]);

  function loadLppPreset(idx) {
    const p = LPP_PRESETS[idx] || LPP_PRESETS[0];
    setSense(p.sense);
    setC1(p.c1);
    setC2(p.c2);
    setNonNegative(p.nonNegative);
    setConstraints(p.constraints.map((c) => ({ ...c })));
    setIsoZ(null);
  }

  const lppSolution = useMemo(() => {
    return solveGraphicalLPP({
      sense,
      c1: Number(c1) || 0,
      c2: Number(c2) || 0,
      constraints: constraints.map((c) => ({
        a: Number(c.a) || 0,
        b: Number(c.b) || 0,
        op: c.op,
        rhs: Number(c.rhs) || 0,
      })),
      nonNegative,
    });
  }, [sense, c1, c2, constraints, nonNegative]);

  const zRange = useMemo(() => {
    if (lppSolution.vertices.length === 0) return { min: 0, max: 100 };
    const vals = lppSolution.vertices.map((v) => v.z);
    const min = Math.min(...vals, 0);
    const max = Math.max(...vals, 10);
    return { min: Math.floor(min), max: Math.ceil(max * 1.1) };
  }, [lppSolution]);

  const activeIsoZ =
    isoZ !== null ? isoZ : lppSolution.optimalZ !== null ? lppSolution.optimalZ : zRange.max / 2;

  const content =
    labMode === 'lpp' ? (
      <LppSolverView
        sense={sense}
        setSense={setSense}
        c1={c1}
        setC1={setC1}
        c2={c2}
        setC2={setC2}
        nonNegative={nonNegative}
        setNonNegative={setNonNegative}
        constraints={constraints}
        setConstraints={setConstraints}
        loadLppPreset={loadLppPreset}
        lppSolution={lppSolution}
        zRange={zRange}
        activeIsoZ={activeIsoZ}
        setIsoZ={setIsoZ}
      />
    ) : (
      <FunctionPlotterView
        fnList={fnList}
        setFnList={setFnList}
        win={win}
        setWin={setWin}
        showDerivative={showDerivative}
        setShowDerivative={setShowDerivative}
        showTangent={showTangent}
        setShowTangent={setShowTangent}
        tangentX={tangentX}
        setTangentX={setTangentX}
        hoverInfo={hoverInfo}
        setHoverInfo={setHoverInfo}
      />
    );

  if (embedded) {
    return <div>{content}</div>;
  }

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
            Interactive Math Studio · Modules 1, 2 &amp; 4
          </span>
          <h1 style={{ margin: '4px 0 4px', fontSize: 28 }}>
            Function &amp; f&apos;(x) Plotter + LPP Graphical Solver
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14.5 }}>
            Enter any $f(x)$ to compute and plot $f&apos;(x)$, or solve 2-variable Linear
            Programming Problems visually.
          </p>
        </div>

        <div className="mini-navbar" style={{ marginBottom: 0 }}>
          <button
            type="button"
            className={`mini-nav-btn ${labMode === 'lpp' ? 'active' : ''}`}
            onClick={() => setLabMode('lpp')}
          >
            <LineChart size={15} />
            <span>LPP Graphical Solver</span>
          </button>
          <button
            type="button"
            className={`mini-nav-btn ${labMode === 'functions' ? 'active' : ''}`}
            onClick={() => setLabMode('functions')}
          >
            <Sparkles size={15} />
            <span>f(x) &amp; f&apos;(x) Grapher</span>
          </button>
        </div>
      </div>

      {content}
    </div>
  );
}

function LppSolverView({
  sense,
  setSense,
  c1,
  setC1,
  c2,
  setC2,
  nonNegative,
  setNonNegative,
  constraints,
  setConstraints,
  loadLppPreset,
  lppSolution,
  zRange,
  activeIsoZ,
  setIsoZ,
}) {
  const W = 640;
  const H = 480;
  const PAD = 48;
  const { xMin, xMax, yMin, yMax } = lppSolution.viewBox;

  const toSvgX = (x) => PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD);
  const toSvgY = (y) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - 2 * PAD);

  const updateConstraint = (idx, field, val) => {
    setConstraints((prev) => prev.map((c, i) => (i === idx ? { ...c, [field]: val } : c)));
  };

  const addConstraint = () => {
    setConstraints((prev) => [...prev, { a: 1, b: 1, op: '<=', rhs: 10 }]);
  };

  const removeConstraint = (idx) => {
    setConstraints((prev) => prev.filter((_, i) => i !== idx));
  };

  const getClippedLine = (a, b, rhs) => {
    const pts = [];
    if (Math.abs(b) > 1e-7) {
      const yAtMin = (rhs - a * xMin) / b;
      const yAtMax = (rhs - a * xMax) / b;
      if (yAtMin >= yMin - 1e-5 && yAtMin <= yMax + 1e-5) pts.push({ x: xMin, y: yAtMin });
      if (yAtMax >= yMin - 1e-5 && yAtMax <= yMax + 1e-5) pts.push({ x: xMax, y: yAtMax });
    }
    if (Math.abs(a) > 1e-7) {
      const xAtMin = (rhs - b * yMin) / a;
      const xAtMax = (rhs - b * yMax) / a;
      if (xAtMin > xMin + 1e-5 && xAtMin < xMax - 1e-5) pts.push({ x: xAtMin, y: yMin });
      if (xAtMax > xMin + 1e-5 && xAtMax < xMax - 1e-5) pts.push({ x: xAtMax, y: yMax });
    }
    if (pts.length < 2) return null;
    return [pts[0], pts[1]];
  };

  const stepX = niceStep(xMax - xMin);
  const stepY = niceStep(yMax - yMin);
  const xTicks = [];
  for (let x = Math.ceil(xMin / stepX) * stepX; x <= xMax; x += stepX) {
    xTicks.push(Number(x.toFixed(4)));
  }
  const yTicks = [];
  for (let y = Math.ceil(yMin / stepY) * stepY; y <= yMax; y += stepY) {
    yTicks.push(Number(y.toFixed(4)));
  }

  const polygonPoints = lppSolution.displayPolygon
    .map((p) => `${toSvgX(p.x).toFixed(1)},${toSvgY(p.y).toFixed(1)}`)
    .join(' ');

  const isoSegment = getClippedLine(Number(c1) || 0, Number(c2) || 0, activeIsoZ);

  return (
    <div className="lab-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(310px, 400px) 1fr', gap: 18, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Load Exam Preset</div>
          <select
            className="select"
            onChange={(e) => loadLppPreset(Number(e.target.value))}
            defaultValue="0"
          >
            {LPP_PRESETS.map((p, idx) => (
              <option key={p.name} value={idx}>
                {p.name}
              </option>
            ))}
          </select>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '14px 0' }} />

          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>1. Objective Function</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <select className="select" style={{ width: 120 }} value={sense} onChange={(e) => setSense(e.target.value)}>
              <option value="max">Maximize</option>
              <option value="min">Minimize</option>
            </select>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Z =</span>
            <input
              type="number"
              className="input"
              style={{ width: 72 }}
              value={c1}
              onChange={(e) => setC1(e.target.value)}
            />
            <span>x +</span>
            <input
              type="number"
              className="input"
              style={{ width: 72 }}
              value={c2}
              onChange={(e) => setC2(e.target.value)}
            />
            <span>y</span>
          </div>

          <div style={{ fontWeight: 700, margin: '14px 0 8px', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>2. Subject to Constraints</span>
            <button type="button" className="btn btn-sm" onClick={addConstraint}>
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {constraints.map((c, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '6px 8px',
                  borderRadius: 7,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 99,
                    background: LINE_COLORS[idx % LINE_COLORS.length],
                    flexShrink: 0,
                  }}
                />
                <input
                  type="number"
                  className="input"
                  style={{ padding: '5px 6px', width: 56 }}
                  value={c.a}
                  onChange={(e) => updateConstraint(idx, 'a', e.target.value)}
                />
                <span style={{ fontSize: 13 }}>x +</span>
                <input
                  type="number"
                  className="input"
                  style={{ padding: '5px 6px', width: 56 }}
                  value={c.b}
                  onChange={(e) => updateConstraint(idx, 'b', e.target.value)}
                />
                <span style={{ fontSize: 13 }}>y</span>
                <select
                  className="select"
                  style={{ padding: '5px 4px', width: 62 }}
                  value={c.op}
                  onChange={(e) => updateConstraint(idx, 'op', e.target.value)}
                >
                  <option value="<=">&le;</option>
                  <option value=">=">&ge;</option>
                  <option value="=">=</option>
                </select>
                <input
                  type="number"
                  className="input"
                  style={{ padding: '5px 6px', width: 64 }}
                  value={c.rhs}
                  onChange={(e) => updateConstraint(idx, 'rhs', e.target.value)}
                />
                {constraints.length > 1 && (
                  <button
                    type="button"
                    className="icon-btn"
                    style={{ padding: 5 }}
                    onClick={() => removeConstraint(idx)}
                    title="Remove constraint"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13.5, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={nonNegative}
              onChange={(e) => setNonNegative(e.target.checked)}
            />
            <span>Non-negativity constraints (x &ge; 0, y &ge; 0)</span>
          </label>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 6 }}>
            <strong>Iso-Objective Line (Z)</strong>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
              Z = {Number(activeIsoZ).toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={zRange.min}
            max={zRange.max}
            step={0.5}
            value={activeIsoZ}
            onChange={(e) => setIsoZ(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Slide Z = {c1}x + {c2}y across feasible region
            </span>
            {lppSolution.optimalZ !== null && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setIsoZ(lppSolution.optimalZ)}
              >
                Snap Z*
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="graph-panel">
          <svg viewBox={`0 0 ${W} ${H}`} className="graph-svg" role="img" aria-label="LPP Graphical Solution Plot">
            <defs>
              <clipPath id="lpp-plot-clip">
                <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} />
              </clipPath>
            </defs>

            {xTicks.map((tx) => (
              <g key={`gx-${tx}`}>
                <line
                  x1={toSvgX(tx)}
                  y1={PAD}
                  x2={toSvgX(tx)}
                  y2={H - PAD}
                  stroke="rgba(148, 163, 184, 0.14)"
                  strokeWidth="1"
                />
                <text x={toSvgX(tx)} y={H - PAD + 16} textAnchor="middle" fontSize="11" fill="var(--text-muted)">
                  {tx}
                </text>
              </g>
            ))}

            {yTicks.map((ty) => (
              <g key={`gy-${ty}`}>
                <line
                  x1={PAD}
                  y1={toSvgY(ty)}
                  x2={W - PAD}
                  y2={toSvgY(ty)}
                  stroke="rgba(148, 163, 184, 0.14)"
                  strokeWidth="1"
                />
                <text x={PAD - 8} y={toSvgY(ty) + 4} textAnchor="end" fontSize="11" fill="var(--text-muted)">
                  {ty}
                </text>
              </g>
            ))}

            <g clipPath="url(#lpp-plot-clip)">
              <line x1={PAD} y1={toSvgY(0)} x2={W - PAD} y2={toSvgY(0)} stroke="var(--text-secondary)" strokeWidth="1.5" />
              <line x1={toSvgX(0)} y1={PAD} x2={toSvgX(0)} y2={H - PAD} stroke="var(--text-secondary)" strokeWidth="1.5" />

              {lppSolution.displayPolygon.length >= 3 && (
                <polygon
                  points={polygonPoints}
                  fill="rgba(45, 212, 191, 0.22)"
                  stroke="rgba(45, 212, 191, 0.78)"
                  strokeWidth="2"
                />
              )}

              {constraints.map((c, idx) => {
                const seg = getClippedLine(Number(c.a) || 0, Number(c.b) || 0, Number(c.rhs) || 0);
                if (!seg) return null;
                const color = LINE_COLORS[idx % LINE_COLORS.length];
                const tPos = 0.16 + (idx % 3) * 0.08;
                const labelX = toSvgX(seg[0].x) * (1 - tPos) + toSvgX(seg[1].x) * tPos;
                const labelY = toSvgY(seg[0].y) * (1 - tPos) + toSvgY(seg[1].y) * tPos;
                return (
                  <g key={`line-${idx}`}>
                    <line
                      x1={toSvgX(seg[0].x)}
                      y1={toSvgY(seg[0].y)}
                      x2={toSvgX(seg[1].x)}
                      y2={toSvgY(seg[1].y)}
                      stroke={color}
                      strokeWidth="2.2"
                    />
                    <text x={labelX + 6} y={labelY - 8} fontSize="11.5" fontWeight="700" fill={color}>
                      L{idx + 1}
                    </text>
                  </g>
                );
              })}

              {isoSegment && (
                <line
                  x1={toSvgX(isoSegment[0].x)}
                  y1={toSvgY(isoSegment[0].y)}
                  x2={toSvgX(isoSegment[1].x)}
                  y2={toSvgY(isoSegment[1].y)}
                  stroke="#fbbf24"
                  strokeWidth="2.2"
                  strokeDasharray="6 5"
                />
              )}

              {lppSolution.vertices.map((v, i) => {
                const isOpt = lppSolution.optimalVertices.some(
                  (ov) => Math.hypot(ov.x - v.x, ov.y - v.y) < 1e-4
                );
                const cx = toSvgX(v.x);
                const cy = toSvgY(v.y);
                return (
                  <g key={`v-${i}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isOpt ? 7 : 5}
                      fill={isOpt ? '#34d399' : '#f8fafc'}
                      stroke={isOpt ? '#064e3b' : '#0f172a'}
                      strokeWidth="2"
                    />
                    <text x={cx + 8} y={cy - 8} fontSize="11.5" fontWeight="700" fill={isOpt ? '#34d399' : 'var(--text-primary)'}>
                      ({v.x}, {v.y})
                    </text>
                  </g>
                );
              })}
            </g>

            <text x={W - PAD + 10} y={toSvgY(0) + 4} fontSize="12" fontWeight="700" fill="var(--text-primary)">
              x
            </text>
            <text x={toSvgX(0) - 4} y={PAD - 12} fontSize="12" fontWeight="700" fill="var(--text-primary)">
              y
            </text>
          </svg>
        </div>

        <div
          className={`callout ${
            lppSolution.status === 'infeasible' || lppSolution.status === 'unbounded'
              ? 'callout-amber'
              : 'callout-green'
          }`}
          style={{ margin: 0 }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            Solution Status: {lppSolution.status.toUpperCase()}
          </div>
          <div style={{ fontSize: 14 }}>{lppSolution.message}</div>
        </div>

        <div className="grid-2">
          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 15 }}>Step 1: Constraint Intercepts</h3>
            <div className="data-table-wrap" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Line</th>
                    <th>x-int (y=0)</th>
                    <th>y-int (x=0)</th>
                  </tr>
                </thead>
                <tbody>
                  {constraints.map((c, idx) => {
                    const a = Number(c.a) || 0;
                    const b = Number(c.b) || 0;
                    const r = Number(c.rhs) || 0;
                    return (
                      <tr key={idx}>
                        <td>
                          <strong style={{ color: LINE_COLORS[idx % LINE_COLORS.length] }}>
                            L{idx + 1}
                          </strong>
                          : {a}x + {b}y = {r}
                        </td>
                        <td>{Math.abs(a) > 1e-7 ? `(${(r / a).toFixed(2)}, 0)` : 'Parallel to x'}</td>
                        <td>{Math.abs(b) > 1e-7 ? `(0, ${(r / b).toFixed(2)})` : 'Parallel to y'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 15 }}>Step 2: Corner Point Evaluation</h3>
            <div className="data-table-wrap" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vertex (x, y)</th>
                    <th>Z = {c1}x + {c2}y</th>
                    <th>Optimal?</th>
                  </tr>
                </thead>
                <tbody>
                  {lppSolution.vertices.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ color: 'var(--text-muted)' }}>
                        No feasible corner points.
                      </td>
                    </tr>
                  ) : (
                    lppSolution.vertices.map((v, i) => {
                      const isOpt = lppSolution.optimalVertices.some(
                        (ov) => Math.hypot(ov.x - v.x, ov.y - v.y) < 1e-4
                      );
                      return (
                        <tr key={i} style={isOpt ? { background: 'var(--bg-callout-green)' } : undefined}>
                          <td>({v.x}, {v.y})</td>
                          <td><strong>{v.z}</strong></td>
                          <td>{isOpt ? '★ Optimal' : '—'}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FunctionPlotterView({
  fnList,
  setFnList,
  win,
  setWin,
  showDerivative,
  setShowDerivative,
  showTangent,
  setShowTangent,
  tangentX,
  setTangentX,
  hoverInfo,
  setHoverInfo,
}) {
  const W = 680;
  const H = 460;
  const PAD = 48;

  const toSvgX = (x) => PAD + ((x - win.xMin) / (win.xMax - win.xMin)) * (W - 2 * PAD);
  const toSvgY = (y) => H - PAD - ((y - win.yMin) / (win.yMax - win.yMin)) * (H - 2 * PAD);

  const compiled = useMemo(() => {
    return fnList.map((item) => {
      try {
        const analysis = analyzeFunctionExpression(item.expr);
        return { ...item, ...analysis, error: null };
      } catch (err) {
        return { ...item, fn: null, derivFn: null, latex: '', derivLatex: '', error: err.message };
      }
    });
  }, [fnList]);

  const buildPath = (fn) => {
    if (!fn) return '';
    const steps = 280;
    let d = '';
    let drawing = false;
    let prevY = null;
    for (let i = 0; i <= steps; i++) {
      const x = win.xMin + (i / steps) * (win.xMax - win.xMin);
      let y;
      try {
        y = fn(x);
      } catch {
        y = NaN;
      }
      if (!Number.isFinite(y) || Math.abs(y) > (win.yMax - win.yMin) * 8) {
        drawing = false;
        prevY = null;
        continue;
      }
      if (prevY !== null && Math.abs(y - prevY) > (win.yMax - win.yMin) * 1.8) {
        drawing = false;
      }
      const sx = toSvgX(x).toFixed(1);
      const sy = toSvgY(y).toFixed(1);
      d += `${drawing ? 'L' : 'M'}${sx},${sy} `;
      drawing = true;
      prevY = y;
    }
    return d;
  };

  const primary = compiled[0];
  const tangentInfo = useMemo(() => {
    if (!primary?.fn || !primary?.derivFn) return null;
    const y0 = primary.fn(tangentX);
    const slope = primary.derivFn(tangentX);
    const d2 = numericalSecondDerivative(primary.fn, tangentX);
    if (!Number.isFinite(y0) || !Number.isFinite(slope)) return null;
    return { x0: tangentX, y0, slope, d2 };
  }, [primary, tangentX]);

  // Approximate stationary points where f'(x) crosses 0 inside [xMin, xMax]
  const criticalPoints = useMemo(() => {
    if (!primary?.fn || !primary?.derivFn) return [];
    const pts = [];
    const N = 160;
    let prevX = win.xMin;
    let prevD = primary.derivFn(prevX);
    for (let i = 1; i <= N; i++) {
      const x = win.xMin + (i / N) * (win.xMax - win.xMin);
      const d = primary.derivFn(x);
      if (Number.isFinite(prevD) && Number.isFinite(d) && prevD * d <= 0 && Math.abs(d - prevD) < 50) {
        const root = Math.abs(d - prevD) > 1e-9 ? prevX - (prevD * (x - prevX)) / (d - prevD) : x;
        const y = primary.fn(root);
        if (Number.isFinite(y)) {
          if (!pts.some((p) => Math.abs(p.x - root) < 0.1)) {
            pts.push({ x: Number(root.toFixed(2)), y: Number(y.toFixed(2)) });
          }
        }
      }
      prevX = x;
      prevD = d;
    }
    return pts.slice(0, 6);
  }, [primary, win]);

  const stepX = niceStep(win.xMax - win.xMin);
  const stepY = niceStep(win.yMax - win.yMin);
  const xTicks = [];
  for (let x = Math.ceil(win.xMin / stepX) * stepX; x <= win.xMax; x += stepX) {
    xTicks.push(Number(x.toFixed(4)));
  }
  const yTicks = [];
  for (let y = Math.ceil(win.yMin / stepY) * stepY; y <= win.yMax; y += stepY) {
    yTicks.push(Number(y.toFixed(4)));
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    if (px < PAD || px > W - PAD || py < PAD || py > H - PAD) {
      setHoverInfo(null);
      return;
    }
    const x = win.xMin + ((px - PAD) / (W - 2 * PAD)) * (win.xMax - win.xMin);
    const y = primary?.fn ? primary.fn(x) : null;
    const dy = primary?.derivFn ? primary.derivFn(x) : null;
    setHoverInfo({
      x: x.toFixed(3),
      y: y !== null && Number.isFinite(y) ? y.toFixed(3) : 'undef',
      dy: dy !== null && Number.isFinite(dy) ? dy.toFixed(3) : 'undef',
    });
  };

  return (
    <div className="lab-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(310px, 400px) 1fr', gap: 18, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>Calculus Presets</div>
          <select
            className="select"
            onChange={(e) => {
              const p = FUNCTION_PRESETS[Number(e.target.value)];
              setFnList(p.fns.map((f) => ({ ...f })));
              setWin({ ...p.window });
              setTangentX(p.tangentX);
            }}
          >
            {FUNCTION_PRESETS.map((p, idx) => (
              <option key={p.name} value={idx}>
                {p.name}
              </option>
            ))}
          </select>

          <div style={{ fontWeight: 700, margin: '14px 0 8px', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Input f(x)</span>
            {fnList.length < 4 && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() =>
                  setFnList((prev) => [
                    ...prev,
                    { expr: '2*x', color: LINE_COLORS[prev.length % LINE_COLORS.length], enabled: true },
                  ])
                }
              >
                <Plus size={14} />
                <span>Add f(x)</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {compiled.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={(e) =>
                      setFnList((prev) =>
                        prev.map((f, i) => (i === idx ? { ...f, enabled: e.target.checked } : f))
                      )
                    }
                  />
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: item.color, flexShrink: 0 }} />
                  <input
                    type="text"
                    className="input"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
                    value={item.expr}
                    onChange={(e) =>
                      setFnList((prev) =>
                        prev.map((f, i) => (i === idx ? { ...f, expr: e.target.value } : f))
                      )
                    }
                    placeholder="e.g. x^3 - 3*x"
                  />
                  {fnList.length > 1 && (
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setFnList((prev) => prev.filter((_, i) => i !== idx))}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                {item.error && (
                  <div style={{ fontSize: 12, color: 'var(--danger)', marginTop: 3 }}>
                    {item.error}
                  </div>
                )}

                {!item.error && idx === 0 && (
                  <div className="callout callout-purple" style={{ margin: '10px 0 0', padding: '10px 12px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)', marginBottom: 4 }}>
                      AUTOMATIC DERIVATIVE f&apos;(x)
                    </div>
                    <div style={{ fontSize: 14, overflowX: 'auto' }}>
                      <MathText text={`$f(x) = ${item.latex}$`} />
                    </div>
                    <div style={{ fontSize: 14, marginTop: 4, overflowX: 'auto' }}>
                      <MathText text={`$f'(x) = ${item.derivLatex}$`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
            Supports <code>+ - * / ^</code>, <code>sin, cos, tan, exp, ln, log, sqrt, abs, pi, e</code>
          </div>
        </div>

        {/* Calculus Inspector */}
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>
            Derivative &amp; Tangent Controls (f₁)
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, marginBottom: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showDerivative}
              onChange={(e) => setShowDerivative(e.target.checked)}
            />
            <span style={{ color: '#f472b6', fontWeight: 600 }}>Plot f₁&apos;(x) curve (dashed)</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, marginBottom: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showTangent}
              onChange={(e) => setShowTangent(e.target.checked)}
            />
            <span style={{ color: '#fbbf24', fontWeight: 600 }}>Show tangent line at x = a</span>
          </label>

          {showTangent && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>Point a:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{tangentX.toFixed(2)}</strong>
              </div>
              <input
                type="range"
                min={win.xMin}
                max={win.xMax}
                step={(win.xMax - win.xMin) / 100}
                value={tangentX}
                onChange={(e) => setTangentX(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              {tangentInfo && (
                <div className="callout" style={{ margin: '8px 0 0', fontSize: 13 }}>
                  <div>
                    f({tangentInfo.x0.toFixed(2)}) = <strong>{tangentInfo.y0.toFixed(3)}</strong>
                  </div>
                  <div>
                    f&apos;({tangentInfo.x0.toFixed(2)}) = <strong>{tangentInfo.slope.toFixed(3)}</strong>
                  </div>
                  <div>
                    Concavity f&apos;&apos; = <strong>{tangentInfo.d2.toFixed(2)}</strong> (
                    {tangentInfo.d2 > 0.05
                      ? 'Concave Up'
                      : tangentInfo.d2 < -0.05
                      ? 'Concave Down'
                      : 'Near Inflection'}
                    )
                  </div>
                </div>
              )}
            </div>
          )}

          {criticalPoints.length > 0 && (
            <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--text-secondary)' }}>
              <strong>Approx. stationary points (f&apos;(x)=0):</strong>{' '}
              {criticalPoints.map((p) => `(${p.x}, ${p.y})`).join(', ')}
            </div>
          )}
        </div>

        {/* Viewport Bounds */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ fontSize: 14 }}>Axes Window</strong>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setWin({ xMin: -5, xMax: 5, yMin: -6, yMax: 6 })}
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <label style={{ fontSize: 12 }}>
              xMin
              <input type="number" className="input" value={win.xMin} onChange={(e) => setWin((w) => ({ ...w, xMin: Number(e.target.value) }))} />
            </label>
            <label style={{ fontSize: 12 }}>
              xMax
              <input type="number" className="input" value={win.xMax} onChange={(e) => setWin((w) => ({ ...w, xMax: Number(e.target.value) }))} />
            </label>
            <label style={{ fontSize: 12 }}>
              yMin
              <input type="number" className="input" value={win.yMin} onChange={(e) => setWin((w) => ({ ...w, yMin: Number(e.target.value) }))} />
            </label>
            <label style={{ fontSize: 12 }}>
              yMax
              <input type="number" className="input" value={win.yMax} onChange={(e) => setWin((w) => ({ ...w, yMax: Number(e.target.value) }))} />
            </label>
          </div>
        </div>
      </div>

      <div className="graph-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
          <span>
            <strong style={{ color: primary?.color || '#2dd4bf' }}>— f(x)</strong> &nbsp;|&nbsp;{' '}
            <strong style={{ color: '#f472b6' }}>-- f&apos;(x)</strong> &nbsp;|&nbsp;{' '}
            <strong style={{ color: '#fbbf24' }}>— Tangent</strong>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            {hoverInfo ? `x=${hoverInfo.x}, f(x)=${hoverInfo.y}, f'(x)=${hoverInfo.dy}` : 'Hover plot to trace'}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="graph-svg"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverInfo(null)}
        >
          <defs>
            <clipPath id="fn-plot-clip">
              <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} />
            </clipPath>
          </defs>

          {xTicks.map((tx) => (
            <g key={`fx-${tx}`}>
              <line x1={toSvgX(tx)} y1={PAD} x2={toSvgX(tx)} y2={H - PAD} stroke="rgba(148, 163, 184, 0.14)" strokeWidth="1" />
              <text x={toSvgX(tx)} y={H - PAD + 16} textAnchor="middle" fontSize="11" fill="var(--text-muted)">
                {tx}
              </text>
            </g>
          ))}

          {yTicks.map((ty) => (
            <g key={`fy-${ty}`}>
              <line x1={PAD} y1={toSvgY(ty)} x2={W - PAD} y2={toSvgY(ty)} stroke="rgba(148, 163, 184, 0.14)" strokeWidth="1" />
              <text x={PAD - 8} y={toSvgY(ty) + 4} textAnchor="end" fontSize="11" fill="var(--text-muted)">
                {ty}
              </text>
            </g>
          ))}

          <g clipPath="url(#fn-plot-clip)">
            <line x1={PAD} y1={toSvgY(0)} x2={W - PAD} y2={toSvgY(0)} stroke="var(--text-secondary)" strokeWidth="1.4" />
            <line x1={toSvgX(0)} y1={PAD} x2={toSvgX(0)} y2={H - PAD} stroke="var(--text-secondary)" strokeWidth="1.4" />

            {compiled.map(
              (item, idx) =>
                item.enabled &&
                item.fn && (
                  <path key={idx} d={buildPath(item.fn)} fill="none" stroke={item.color} strokeWidth="2.6" />
                )
            )}

            {showDerivative && primary?.derivFn && (
              <path
                d={buildPath(primary.derivFn)}
                fill="none"
                stroke="#f472b6"
                strokeWidth="2.1"
                strokeDasharray="6 5"
              />
            )}

            {showTangent && tangentInfo && (
              <g>
                <line
                  x1={toSvgX(win.xMin)}
                  y1={toSvgY(tangentInfo.y0 + tangentInfo.slope * (win.xMin - tangentInfo.x0))}
                  x2={toSvgX(win.xMax)}
                  y2={toSvgY(tangentInfo.y0 + tangentInfo.slope * (win.xMax - tangentInfo.x0))}
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
                <circle
                  cx={toSvgX(tangentInfo.x0)}
                  cy={toSvgY(tangentInfo.y0)}
                  r="5.5"
                  fill="#fbbf24"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
