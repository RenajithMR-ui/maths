/**
 * ============================================================================
 * MODULES DEFINITION (4 MODULES)
 * ============================================================================
 * Each module references topic IDs defined in `src/data/topics.js`.
 * To add/rename modules or topics, update this array and match the `id` in topics.js.
 */

export const modulesData = [
  {
    id: 1,
    code: 'Module 1',
    title: 'Differential Calculus',
    hours: '9 Hours',
    accent: '#38bdf8',
    summary:
      'Limits, continuity, rates of change, chain rule, implicit differentiation, tangents & normals, linearization, and concavity.',
    videoPlaylistUrl:
      'https://youtube.com/playlist?list=PL7lBkW4pLsILrjwF7LXZE1DNGkXJLy_Lb&si=V8D0TOrgm5q0O_xF',
    topicIds: ['m1-limits', 'm1-derivatives', 'm1-applications'],
  },
  {
    id: 2,
    code: 'Module 2',
    title: 'Functions of Several Variables',
    hours: '9 Hours',
    accent: '#818cf8',
    summary:
      'Domains, open/punctured disks, level curves, 2-variable limits & continuity, Squeeze Theorem, partial derivatives, Clairaut’s theorem, chain rule, and implicit differentiation.',
    videoPlaylistUrl:
      'https://youtube.com/playlist?list=PL7lBkW4pLsILuQqIRtEimnvUGElUbm7If&si=w-RAHkvwRUnvAbJ3',
    topicIds: ['m2-multivariable', 'm2-limits-2v', 'm2-partials', 'm2-chain-implicit'],
  },
  {
    id: 3,
    code: 'Module 3',
    title: 'Directional Derivatives & Extrema',
    hours: '9 Hours',
    accent: '#34d399',
    summary:
      'Chain rule for 3 variables, directional derivatives, gradient vectors, critical & saddle points, second derivative test, and absolute extrema.',
    videoPlaylistUrl:
      'https://youtube.com/playlist?list=PL7lBkW4pLsIKp0D3dtM-dF_f6sR6aCL-w&si=8JeyuGrQuJ38cu0j',
    topicIds: ['m3-gradient', 'm3-local-extrema', 'm3-absolute-extrema'],
  },
  {
    id: 4,
    code: 'Module 4',
    title: 'Optimization & Linear Programming',
    hours: '9 Hours',
    accent: '#fbbf24',
    summary:
      'Constrained maxima/minima, Lagrange multipliers (1 & 2 constraints), steepest descent (2 variables), LPP formulation & graphical method.',
    videoPlaylistUrl:
      'https://youtube.com/playlist?list=PL7lBkW4pLsIKqIdaNS3EqKACUkzp4ZM8M&si=w20jIufiCeplRR7r',
    topicIds: ['m4-lagrange', 'm4-steepest-descent', 'm4-lpp'],
  },
];
