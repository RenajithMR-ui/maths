/**
 * ============================================================================
 * COURSE CONFIGURATION (BASE MODEL)
 * ============================================================================
 * Edit this file to customize the subject name, code, credits, branding,
 * exam structure, Course Outcomes (COs), and external resource links.
 */

export const courseConfig = {
  brandName: 'SAC LEARN',
  brandSubtitle: 'Student Assist Cell · CET',
  heroBadge: 'KSU CET Academic Excellence Initiative',
  institutionTag: 'KTU 2024 Scheme · B.Tech Sem 1 (Group A)',
  courseCode: 'GAMAT101',
  courseTitle: 'Mathematics for Information Science – I',
  credits: 3,
  contactHours: '3-0-0-0 (L:T:P:R)',
  heroDescription:
    'Master Differential Calculus, Multivariable Systems, Gradients, and Linear Programming through interactive KaTeX notes, automatic f(x) → f\'(x) graphing, graphical LPP solvers, and curated KTU university question papers.',
  referenceBanner: {
    label: 'SAC KSU CET Portal (CSE S1 Mathematics)',
    url: 'https://sac.ksucet.in/notes-and-videos?dept=cse&sem=1&subject=Mathematics',
  },
  ascPortalUrl: 'https://asc.sficet.in/academics?dept=cse&sem=s1&sub=GAMAT101',
  textbooks: [
    {
      title: "Thomas' Calculus (14th / 15th Edition)",
      authors: 'Joel Hass, Christopher Heil, Maurice D. Weir',
      scope: 'Modules 1, 2, 3 & Lagrange Multipliers in Module 4',
    },
    {
      title: 'Advanced Engineering Mathematics (10th Edition)',
      authors: 'Erwin Kreyszig',
      scope: 'Module 4 (Steepest Descent & Linear Programming Graphical Method)',
    },
  ],
  examPattern: {
    endSem: {
      totalMarks: 60,
      duration: '2 hrs 30 min',
      parts: [
        {
          name: 'Part A (Short Answer)',
          marks: 24,
          detail: '8 compulsory questions × 3 marks (2 from each module)',
        },
        {
          name: 'Part B (Essay / Problem Solving)',
          marks: 36,
          detail: '4 modules × 9 marks (choose 1 of 2 questions per module)',
        },
      ],
    },
    internal: {
      totalMarks: 40,
      breakdown: [
        { label: 'Attendance', marks: 5 },
        { label: 'Continuous Assessment / Assignments & Micro-project', marks: 15 },
        { label: 'Internal Exam 1 (Modules 1 & 2)', marks: 10 },
        { label: 'Internal Exam 2 (Modules 3 & 4)', marks: 10 },
      ],
    },
  },
  courseOutcomes: [
    {
      code: 'CO1',
      level: 'K3',
      text: 'Apply limits, continuity, differentiation rules, linearization, and concavity tests to analyze single-variable functions.',
    },
    {
      code: 'CO2',
      level: 'K3',
      text: 'Evaluate limits, continuity, partial derivatives, mixed derivatives, and multivariable chain rules for functions of several variables.',
    },
    {
      code: 'CO3',
      level: 'K3',
      text: 'Compute directional derivatives, gradients, and classify local and absolute extrema of two-variable functions.',
    },
    {
      code: 'CO4',
      level: 'K3',
      text: 'Solve constrained and unconstrained optimization problems using Lagrange multipliers, steepest descent, and graphical LPP.',
    },
  ],
  footer: {
    copyright: '© 2026 SAC LEARN · Mathematics for Information Science (GAMAT101)',
    note: 'Edit files in src/data/ to customize modules, notes, question papers, formulas, and quizzes.',
  },
};
