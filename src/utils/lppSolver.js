/**
 * 2-Variable Linear Programming Problem (LPP) Graphical Method Solver
 *
 * Solves:
 *   Maximize or Minimize Z = c1 * x + c2 * y
 *   Subject to:
 *     a_i * x + b_i * y  (<= | >= | =)  r_i
 *     and optional x >= 0, y >= 0
 */

const EPS = 1e-7;

export function satisfiesConstraint(x, y, c) {
  const lhs = c.a * x + c.b * y;
  if (c.op === '<=') return lhs <= c.rhs + EPS;
  if (c.op === '>=') return lhs >= c.rhs - EPS;
  return Math.abs(lhs - c.rhs) <= 1e-5;
}

function intersectLines(l1, l2) {
  const det = l1.a * l2.b - l2.a * l1.b;
  if (Math.abs(det) < EPS) return null;
  const x = (l1.rhs * l2.b - l2.rhs * l1.b) / det;
  const y = (l1.a * l2.rhs - l2.a * l1.rhs) / det;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}

function dedupePoints(points) {
  const out = [];
  for (const pt of points) {
    if (!out.some((q) => Math.hypot(q.x - pt.x, q.y - pt.y) < 1e-5)) {
      out.push({
        x: Math.abs(pt.x) < 1e-8 ? 0 : Number(pt.x.toFixed(6)),
        y: Math.abs(pt.y) < 1e-8 ? 0 : Number(pt.y.toFixed(6)),
      });
    }
  }
  return out;
}

function sortPolygonVertices(points) {
  if (points.length <= 2) return points;
  const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
  const cy = points.reduce((s, p) => s + p.y, 0) / points.length;
  return [...points].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)
  );
}

export function solveGraphicalLPP({
  sense = 'max',
  c1 = 3,
  c2 = 5,
  constraints = [],
  nonNegative = true,
}) {
  const allConstraints = [
    ...constraints.map((c, idx) => ({
      ...c,
      id: c.id || `C${idx + 1}`,
      isAxis: false,
    })),
  ];

  if (nonNegative) {
    allConstraints.push({ id: 'X0', a: 1, b: 0, op: '>=', rhs: 0, isAxis: true });
    allConstraints.push({ id: 'Y0', a: 0, b: 1, op: '>=', rhs: 0, isAxis: true });
  }

  // 1. Find all feasible corner points of the true feasible region
  const rawVertices = [];
  for (let i = 0; i < allConstraints.length; i++) {
    for (let j = i + 1; j < allConstraints.length; j++) {
      const pt = intersectLines(allConstraints[i], allConstraints[j]);
      if (!pt) continue;
      if (allConstraints.every((c) => satisfiesConstraint(pt.x, pt.y, c))) {
        rawVertices.push(pt);
      }
    }
  }

  const vertices = sortPolygonVertices(dedupePoints(rawVertices));

  // Determine a nice viewing bounding box
  let maxX = 10;
  let maxY = 10;
  let minX = nonNegative ? 0 : -10;
  let minY = nonNegative ? 0 : -10;

  for (const v of vertices) {
    maxX = Math.max(maxX, v.x * 1.25);
    maxY = Math.max(maxY, v.y * 1.25);
    minX = Math.min(minX, v.x < 0 ? v.x * 1.25 : minX);
    minY = Math.min(minY, v.y < 0 ? v.y * 1.25 : minY);
  }
  for (const c of constraints) {
    if (Math.abs(c.a) > EPS) {
      const xi = c.rhs / c.a;
      if (Number.isFinite(xi) && Math.abs(xi) < 500) {
        maxX = Math.max(maxX, xi * 1.15);
        minX = Math.min(minX, xi < 0 ? xi * 1.15 : minX);
      }
    }
    if (Math.abs(c.b) > EPS) {
      const yi = c.rhs / c.b;
      if (Number.isFinite(yi) && Math.abs(yi) < 500) {
        maxY = Math.max(maxY, yi * 1.15);
        minY = Math.min(minY, yi < 0 ? yi * 1.15 : minY);
      }
    }
  }

  const padX = Math.max(2, (maxX - minX) * 0.12);
  const padY = Math.max(2, (maxY - minY) * 0.12);
  const viewBox = {
    xMin: nonNegative ? -padX * 0.6 : Math.floor(minX - padX),
    xMax: Math.ceil(maxX + padX),
    yMin: nonNegative ? -padY * 0.6 : Math.floor(minY - padY),
    yMax: Math.ceil(maxY + padY),
  };

  // 2. Build clipped display polygon inside a large box to detect unboundedness & shade unbounded regions
  const M = Math.max(Math.abs(viewBox.xMax), Math.abs(viewBox.yMax), 100) * 8;
  const displayBox = {
    xMin: viewBox.xMin,
    xMax: viewBox.xMax,
    yMin: viewBox.yMin,
    yMax: viewBox.yMax,
  };

  const viewConstraints = [
    ...allConstraints,
    { id: 'BX1', a: 1, b: 0, op: '<=', rhs: displayBox.xMax },
    { id: 'BX2', a: 1, b: 0, op: '>=', rhs: displayBox.xMin },
    { id: 'BY1', a: 0, b: 1, op: '<=', rhs: displayBox.yMax },
    { id: 'BY2', a: 0, b: 1, op: '>=', rhs: displayBox.yMin },
  ];

  const clippedPts = [];
  for (let i = 0; i < viewConstraints.length; i++) {
    for (let j = i + 1; j < viewConstraints.length; j++) {
      const pt = intersectLines(viewConstraints[i], viewConstraints[j]);
      if (!pt) continue;
      if (viewConstraints.every((c) => satisfiesConstraint(pt.x, pt.y, c))) {
        clippedPts.push(pt);
      }
    }
  }
  const displayPolygon = sortPolygonVertices(dedupePoints(clippedPts));

  // Unboundedness check using huge bounding box M
  const hugeConstraints = [
    ...allConstraints,
    { id: 'HX1', a: 1, b: 0, op: '<=', rhs: M },
    { id: 'HX2', a: 1, b: 0, op: '>=', rhs: -M },
    { id: 'HY1', a: 0, b: 1, op: '<=', rhs: M },
    { id: 'HY2', a: 0, b: 1, op: '>=', rhs: -M },
  ];
  const hugePts = [];
  for (let i = 0; i < hugeConstraints.length; i++) {
    for (let j = i + 1; j < hugeConstraints.length; j++) {
      const pt = intersectLines(hugeConstraints[i], hugeConstraints[j]);
      if (!pt) continue;
      if (hugeConstraints.every((c) => satisfiesConstraint(pt.x, pt.y, c))) {
        hugePts.push(pt);
      }
    }
  }
  const hugeVertices = dedupePoints(hugePts);
  const touchesHugeBoundary = hugeVertices.some(
    (p) => Math.abs(Math.abs(p.x) - M) < 1 || Math.abs(Math.abs(p.y) - M) < 1
  );

  if (vertices.length === 0 && hugeVertices.length === 0) {
    return {
      status: 'infeasible',
      vertices: [],
      displayPolygon: [],
      optimalVertices: [],
      optimalZ: null,
      viewBox,
      message: 'No feasible region exists — the constraints cannot all be satisfied simultaneously.',
    };
  }

  // Evaluate Z at true corner vertices
  const scoredVertices = vertices.map((v) => ({
    ...v,
    z: Number((c1 * v.x + c2 * v.y).toFixed(6)),
  }));

  // Evaluate Z on huge box to test if Z is unbounded in the optimization direction
  const hugeScores = hugeVertices.map((v) => c1 * v.x + c2 * v.y);
  const bestTrueZ =
    scoredVertices.length > 0
      ? sense === 'max'
        ? Math.max(...scoredVertices.map((v) => v.z))
        : Math.min(...scoredVertices.map((v) => v.z))
      : null;

  const bestHugeZ =
    hugeScores.length > 0
      ? sense === 'max'
        ? Math.max(...hugeScores)
        : Math.min(...hugeScores)
      : null;

  const isObjectiveUnbounded =
    touchesHugeBoundary &&
    bestTrueZ !== null &&
    bestHugeZ !== null &&
    (sense === 'max' ? bestHugeZ > bestTrueZ + 1e-2 : bestHugeZ < bestTrueZ - 1e-2);

  if (isObjectiveUnbounded || (vertices.length === 0 && hugeVertices.length > 0)) {
    return {
      status: 'unbounded',
      vertices: scoredVertices,
      displayPolygon,
      optimalVertices: [],
      optimalZ: null,
      viewBox,
      message:
        sense === 'max'
          ? 'The feasible region is unbounded and Z can increase indefinitely (+∞).'
          : 'The feasible region is unbounded and Z can decrease indefinitely (-∞).',
    };
  }

  const optimalVertices = scoredVertices.filter((v) => Math.abs(v.z - bestTrueZ) < 1e-4);

  return {
    status: optimalVertices.length > 1 ? 'multiple' : 'optimal',
    vertices: scoredVertices,
    displayPolygon,
    optimalVertices,
    optimalZ: bestTrueZ,
    viewBox,
    message:
      optimalVertices.length > 1
        ? `Multiple (alternate) optimal solutions exist along the segment connecting ${optimalVertices
            .map((v) => `(${v.x}, ${v.y})`)
            .join(' and ')} with Z* = ${bestTrueZ}.`
        : `Unique optimal solution found at (${optimalVertices[0].x}, ${optimalVertices[0].y}) with Z* = ${bestTrueZ}.`,
  };
}

export const LPP_PRESETS = [
  {
    name: 'KTU Classic: Profit Maximization',
    sense: 'max',
    c1: 3,
    c2: 5,
    nonNegative: true,
    constraints: [
      { a: 1, b: 2, op: '<=', rhs: 20 },
      { a: 1, b: 1, op: '<=', rhs: 15 },
      { a: 0, b: 1, op: '<=', rhs: 8 },
    ],
  },
  {
    name: 'Cost Minimization (Mixed >= and <=)',
    sense: 'min',
    c1: 20,
    c2: 10,
    nonNegative: true,
    constraints: [
      { a: 1, b: 2, op: '<=', rhs: 40 },
      { a: 3, b: 1, op: '>=', rhs: 30 },
      { a: 4, b: 3, op: '>=', rhs: 60 },
    ],
  },
  {
    name: 'Alternate Optimal Solutions',
    sense: 'max',
    c1: 6,
    c2: 4,
    nonNegative: true,
    constraints: [
      { a: 3, b: 2, op: '<=', rhs: 18 },
      { a: 1, b: 0, op: '<=', rhs: 4 },
      { a: 0, b: 1, op: '<=', rhs: 6 },
    ],
  },
  {
    name: 'Unbounded Feasible Region',
    sense: 'max',
    c1: 4,
    c2: 3,
    nonNegative: true,
    constraints: [
      { a: 1, b: -1, op: '<=', rhs: 2 },
      { a: 2, b: 1, op: '>=', rhs: 4 },
    ],
  },
];
