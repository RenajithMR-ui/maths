/**
 * ============================================================================
 * FLASHCARDS DATABASE
 * ============================================================================
 */

export const flashcardsData = [
  {
    id: 'fc-1',
    moduleId: 1,
    topicId: 'm1-limits',
    front: 'What are the 3 conditions for $f(x)$ to be continuous at $x = c$?',
    back: '1) $f(c)$ is defined. 2) $\\lim_{x \\to c} f(x)$ exists ($\\text{LHL} = \\text{RHL}$). 3) $\\lim_{x \\to c} f(x) = f(c)$.',
  },
  {
    id: 'fc-2',
    moduleId: 1,
    topicId: 'm1-limits',
    front: 'When can L’Hôpital’s Rule be applied to $\\lim_{x\\to c} \\frac{f(x)}{g(x)}$?',
    back: 'Only when direct substitution produces an indeterminate form $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ (and $f, g$ are differentiable near $c$).',
  },
  {
    id: 'fc-3',
    moduleId: 1,
    topicId: 'm1-derivatives',
    front: 'Implicit differentiation shortcut for $F(x, y) = 0$?',
    back: '$$\\frac{dy}{dx} = -\\frac{F_x}{F_y} \\quad (F_y \\ne 0)$$',
  },
  {
    id: 'fc-4',
    moduleId: 1,
    topicId: 'm1-applications',
    front: 'Write the formula for the linearization $L(x)$ of $f(x)$ at $x = a$.',
    back: '$$L(x) = f(a) + f\'(a)(x - a)$$',
  },
  {
    id: 'fc-5',
    moduleId: 1,
    topicId: 'm1-applications',
    front: 'How does $f\'\'(x)$ indicate concavity and inflection points?',
    back: '$f\'\'(x) > 0$ is concave up; $f\'\'(x) < 0$ is concave down. An inflection point occurs where $f$ is continuous and $f\'\'(x)$ changes sign.',
  },
  {
    id: 'fc-6',
    moduleId: 2,
    topicId: 'm2-multivariable',
    front: 'What is a level curve of $f(x, y)$?',
    back: 'The set of all points $(x, y)$ in the domain where $f(x, y) = c$ for a constant $c$ (a 2D contour slice at height $c$).',
  },
  {
    id: 'fc-7',
    moduleId: 2,
    topicId: 'm2-limits-2v',
    front: 'How do you prove $\\lim_{(x,y)\\to(0,0)} f(x,y)$ does NOT exist?',
    back: 'Show that $f(x, y)$ approaches two different values along two different paths to $(0, 0)$ (e.g. $y = mx$ vs $x = y^2$).',
  },
  {
    id: 'fc-8',
    moduleId: 2,
    topicId: 'm2-partials',
    front: 'Does existence of $f_x(0,0)$ and $f_y(0,0)$ guarantee continuity at $(0,0)$?',
    back: 'No! Continuous partial derivatives guarantee differentiability and continuity, but mere existence of $f_x, f_y$ does not.',
  },
  {
    id: 'fc-9',
    moduleId: 2,
    topicId: 'm2-partials',
    front: 'State Clairaut’s Mixed Derivative Theorem.',
    back: 'If $f, f_x, f_y, f_{xy}, f_{yx}$ are continuous on an open disk, then $f_{xy}(a, b) = f_{yx}(a, b)$.',
  },
  {
    id: 'fc-9b',
    moduleId: 2,
    topicId: 'm2-chain-implicit',
    front: 'Implicit partial derivative formulas for $F(x, y, z) = 0$?',
    back: '$$\\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}, \\qquad \\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z} \\quad (F_z \\ne 0)$$',
  },
  {
    id: 'fc-10',
    moduleId: 3,
    topicId: 'm3-gradient',
    front: 'Formula for the directional derivative $D_{\\mathbf{u}} f$ and key requirement on $\\mathbf{u}$?',
    back: '$D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$, where $\\mathbf{u}$ MUST be a **unit vector** ($\\|\\mathbf{u}\\| = 1$).',
  },
  {
    id: 'fc-11',
    moduleId: 3,
    topicId: 'm3-gradient',
    front: 'In which direction is $\\nabla f$ oriented relative to a level curve $f(x,y) = c$?',
    back: '$\\nabla f$ is always **orthogonal (perpendicular)** to the level curve, pointing in the direction of steepest ascent ($\\|\\nabla f\\|$).',
  },
  {
    id: 'fc-12',
    moduleId: 3,
    topicId: 'm3-local-extrema',
    front: 'Second Derivative Test discriminant $D$ for 2-variable extrema?',
    back: '$D = f_{xx}f_{yy} - f_{xy}^2$. $D > 0, f_{xx} > 0 \\implies$ Min; $D > 0, f_{xx} < 0 \\implies$ Max; $D < 0 \\implies$ Saddle.',
  },
  {
    id: 'fc-13',
    moduleId: 3,
    topicId: 'm3-absolute-extrema',
    front: 'Where can absolute extrema occur on a closed bounded region $R$?',
    back: 'At interior critical points ($\\nabla f = \\mathbf{0}$) OR along the boundary curves and corner vertices of $R$.',
  },
  {
    id: 'fc-14',
    moduleId: 4,
    topicId: 'm4-lagrange',
    front: 'Lagrange Multipliers equation for 1 constraint vs 2 constraints?',
    back: '1 constraint: $\\nabla f = \\lambda \\nabla g$. 2 constraints: $\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$.',
  },
  {
    id: 'fc-15',
    moduleId: 4,
    topicId: 'm4-steepest-descent',
    front: 'What is the angle between consecutive gradient directions in exact Steepest Descent?',
    back: 'They are **orthogonal**: $\\nabla f(\\mathbf{x}_{k+1}) \\cdot \\nabla f(\\mathbf{x}_k) = 0$.',
  },
  {
    id: 'fc-16',
    moduleId: 4,
    topicId: 'm4-lpp',
    front: 'What does the Fundamental Theorem of LPP state for the Graphical Method?',
    back: 'If a bounded LPP has an optimal solution, at least one optimal solution occurs at a corner point (vertex) of the feasible region.',
  },
];
