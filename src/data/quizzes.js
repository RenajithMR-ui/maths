/**
 * ============================================================================
 * QUIZZES DATABASE
 * ============================================================================
 */

export const quizzesData = [
  {
    id: 'q-1',
    moduleId: 1,
    topicId: 'm1-limits',
    question: 'What is $\\lim_{x \\to 0} \\frac{\\sin(5x)}{2x}$?',
    options: ['$0$', '$\\frac{2}{5}$', '$\\frac{5}{2}$', 'Does not exist'],
    correctIndex: 2,
    explanation:
      'Rewrite as $\\frac{5}{2} \\cdot \\frac{\\sin(5x)}{5x}$. As $x \\to 0$, $\\frac{\\sin(5x)}{5x} \\to 1$, giving $\\frac{5}{2}$.',
  },
  {
    id: 'q-1b',
    moduleId: 1,
    topicId: 'm1-limits',
    question: 'Using L’Hôpital’s Rule, what is $\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}$?',
    options: ['$0$', '$\\frac{1}{2}$', '$1$', '$2$'],
    correctIndex: 1,
    explanation:
      'Applying L’Hôpital twice on $\\frac{0}{0}$ gives $\\lim_{x\\to 0}\\frac{e^x - 1}{2x} = \\lim_{x\\to 0}\\frac{e^x}{2} = \\frac{1}{2}$.',
  },
  {
    id: 'q-2',
    moduleId: 1,
    topicId: 'm1-derivatives',
    question: 'For $x^2 + y^2 = 25$, what is $\\frac{dy}{dx}$ at $(3, 4)$?',
    options: ['$-\\frac{3}{4}$', '$\\frac{3}{4}$', '$-\\frac{4}{3}$', '$\\frac{4}{3}$'],
    correctIndex: 0,
    explanation:
      'Implicitly differentiating gives $2x + 2y\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{x}{y} = -\\frac{3}{4}$.',
  },
  {
    id: 'q-3',
    moduleId: 1,
    topicId: 'm1-applications',
    question: 'The linearization $L(x)$ of $f(x) = e^{2x}$ at $a = 0$ is:',
    options: ['$1 + x$', '$1 + 2x$', '$2 + x$', '$1 + 2x^2$'],
    correctIndex: 1,
    explanation:
      '$f(0) = 1$ and $f\'(x) = 2e^{2x} \\implies f\'(0) = 2$. Hence $L(x) = f(0) + f\'(0)(x-0) = 1 + 2x$.',
  },
  {
    id: 'q-4',
    moduleId: 1,
    topicId: 'm1-applications',
    question: 'For $f(x) = x^3 - 6x^2 + 5$, where does an inflection point occur?',
    options: ['$x = 0$', '$x = 2$', '$x = 4$', '$x = -2$'],
    correctIndex: 1,
    explanation:
      '$f\'(x) = 3x^2 - 12x$ and $f\'\'(x) = 6x - 12 = 0 \\implies x = 2$, where $f\'\'$ changes sign from negative to positive.',
  },
  {
    id: 'q-5',
    moduleId: 2,
    topicId: 'm2-multivariable',
    question: 'What are the level curves of $f(x, y) = 2x + 3y$?',
    options: ['Concentric circles', 'Hyperbolas', 'Parallel straight lines', 'Parabolas'],
    correctIndex: 2,
    explanation:
      'Setting $2x + 3y = c$ produces a family of parallel lines with slope $-2/3$.',
  },
  {
    id: 'q-6',
    moduleId: 2,
    topicId: 'm2-limits-2v',
    question: 'Evaluate $\\lim_{(x,y) \\to (0,0)} \\frac{x^2 - y^2}{x^2 + y^2}$:',
    options: ['$0$', '$1$', '$-1$', 'Does not exist'],
    correctIndex: 3,
    explanation:
      'Along $y = 0$ the limit is $1$, whereas along $x = 0$ the limit is $-1$. Because paths disagree, the limit does not exist.',
  },
  {
    id: 'q-7',
    moduleId: 2,
    topicId: 'm2-partials',
    question: 'If $f(x, y) = x^3 y^2 + e^{xy}$, what is $f_{xy}$ equal to by Clairaut’s Theorem?',
    options: ['$f_{xx}$', '$f_{yx}$', '$f_{yy}$', '$-f_{yx}$'],
    correctIndex: 1,
    explanation:
      'Since $f$ has continuous partial derivatives everywhere, $f_{xy} = f_{yx}$ by Clairaut’s Mixed Derivative Theorem.',
  },
  {
    id: 'q-8',
    moduleId: 3,
    topicId: 'm3-gradient',
    question: 'What is the maximum rate of change of $f(x, y) = x^2 + y^2$ at $(3, 4)$?',
    options: ['$5$', '$7$', '$10$', '$25$'],
    correctIndex: 2,
    explanation:
      '$\\nabla f = \\langle 2x, 2y \\rangle = \\langle 6, 8 \\rangle$ at $(3,4)$. Maximum rate is $\\|\\nabla f\\| = \\sqrt{6^2 + 8^2} = 10$.',
  },
  {
    id: 'q-9',
    moduleId: 3,
    topicId: 'm3-local-extrema',
    question: 'At a critical point $(a, b)$, if $D = f_{xx}f_{yy} - f_{xy}^2 = -5$, the point is a:',
    options: ['Local minimum', 'Local maximum', 'Saddle point', 'Inconclusive'],
    correctIndex: 2,
    explanation: 'Whenever $D < 0$ at a critical point, $(a, b)$ is a saddle point.',
  },
  {
    id: 'q-10',
    moduleId: 3,
    topicId: 'm3-local-extrema',
    question: 'If $D = 12 > 0$ and $f_{xx} = -4 < 0$ at critical point $(a, b)$, then $(a, b)$ is a:',
    options: ['Local minimum', 'Local maximum', 'Saddle point', 'Inflection point'],
    correctIndex: 1,
    explanation: '$D > 0$ and $f_{xx} < 0$ means the surface opens downward in all directions $\\implies$ Local Maximum.',
  },
  {
    id: 'q-11',
    moduleId: 4,
    topicId: 'm4-lagrange',
    question: 'In Lagrange Multipliers with two constraints $g=0$ and $h=0$, the optimality condition is:',
    options: [
      '$\\nabla f = \\lambda \\nabla g$',
      '$\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$',
      '$\\nabla f \\cdot \\nabla g = 0$',
      '$\\nabla g = \\nabla h$',
    ],
    correctIndex: 1,
    explanation: 'Two equality constraints introduce two multipliers $\\lambda, \\mu$: $\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$.',
  },
  {
    id: 'q-12',
    moduleId: 4,
    topicId: 'm4-steepest-descent',
    question: 'In the Method of Steepest Descent, what is the update direction from $\\mathbf{x}_k$?',
    options: ['$+\\nabla f(\\mathbf{x}_k)$', '$-\\nabla f(\\mathbf{x}_k)$', '$\\nabla^2 f(\\mathbf{x}_k)$', 'Orthogonal to $\\nabla f$'],
    correctIndex: 1,
    explanation: 'To minimize $f$, move in $-\\nabla f(\\mathbf{x}_k)$, the direction of fastest decrease.',
  },
  {
    id: 'q-13',
    moduleId: 4,
    topicId: 'm4-lpp',
    question: 'In a graphical LPP, if two adjacent corner points produce the same maximum $Z^*$, then:',
    options: [
      'The problem is infeasible',
      'The problem is unbounded',
      'Every point on the line segment connecting them is also optimal',
      'Only the midpoint is optimal',
    ],
    correctIndex: 2,
    explanation:
      'Because $Z$ is linear, if two vertices share the optimal value $Z^*$, all convex combinations along the connecting boundary edge also achieve $Z^*$.',
  },
];
