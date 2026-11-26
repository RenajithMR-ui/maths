/**
 * ============================================================================
 * TOPIC NOTES DATABASE (MODULES 1–4 · KTU 2024 GAMAT101)
 * ============================================================================
 * Compiled from Thomas' Calculus (14th/15th Ed.), Erwin Kreyszig, and KTU
 * GAMAT101 study notes. Supports inline LaTeX ($...$) and block LaTeX ($$...$$).
 */

export const topicsData = {
  'm1-limits': {
    id: 'm1-limits',
    moduleId: 1,
    title: 'Limits & Continuity',
    summary:
      'Evaluating limits via algebraic laws, L’Hôpital’s Rule, Squeeze Theorem, continuity at a point, and the Intermediate Value Theorem (IVT).',
    subtopics: [
      'Limit Laws & One-Sided Limits',
      'Indeterminate Forms & L’Hôpital’s Rule',
      'Sandwich (Squeeze) Theorem',
      'Continuity at a Point',
      'Types of Discontinuity',
      'Intermediate Value Theorem (IVT)',
    ],
    keyTakeaways: [
      'A limit $\\lim_{x \\to c} f(x) = L$ exists if and only if both LHL and RHL exist and equal $L$.',
      'For $0/0$ or $\\infty/\\infty$ forms, apply factoring, rationalization, standard limits, or L’Hôpital’s Rule.',
      'Continuity at $x = c$ requires: (1) $f(c)$ defined, (2) $\\lim_{x \\to c} f(x)$ exists, (3) $\\lim_{x \\to c} f(x) = f(c)$.',
      'By the Intermediate Value Theorem, if $f$ is continuous on $[a,b]$ and $f(a), f(b)$ have opposite signs, there is at least one root $c \\in (a,b)$.',
    ],
    sections: [
      {
        num: '01',
        title: 'Limits, Existence Condition & L’Hôpital’s Rule',
        paragraphs: [
          'The limit $\\lim_{x \\to c} f(x) = L$ describes the value $f(x)$ approaches as $x \\to c$ from both left and right sides.',
          'When direct substitution yields $\\frac{0}{0}$ or $\\frac{\\pm\\infty}{\\pm\\infty}$ and $f, g$ are differentiable near $c$, **L’Hôpital’s Rule** states that $\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)}$ (provided the right-hand limit exists or is $\\pm\\infty$).',
        ],
        formula:
          '\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L',
        keyIdea:
          'Piecewise functions at boundary points must always be tested using Left-Hand Limit (LHL) and Right-Hand Limit (RHL) separately.',
        workedExample: {
          problem:
            'Find the value of $k$ so that $f(x) = \\begin{cases} \\frac{\\sin(3x)}{x}, & x \\ne 0 \\\\ k - 1, & x = 0 \\end{cases}$ is continuous at $x = 0$.',
          steps: [
            'Compute the limit as $x \\to 0$: $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = 3 \\lim_{x \\to 0} \\frac{\\sin(3x)}{3x} = 3(1) = 3$ (or by L’Hôpital’s Rule: $\\lim_{x \\to 0} \\frac{3\\cos(3x)}{1} = 3$).',
            'At the point: $f(0) = k - 1$.',
            'For continuity at $x = 0$, set $\\lim_{x \\to 0} f(x) = f(0) \\implies 3 = k - 1 \\implies k = 4$.',
          ],
          answer: '$k = 4$.',
        },
      },
      {
        num: '02',
        title: 'Sandwich Theorem, Discontinuities & IVT',
        paragraphs: [
          'If $g(x) \\le f(x) \\le h(x)$ near $c$ and $\\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L$, then $\\lim_{x \\to c} f(x) = L$.',
          '**Intermediate Value Theorem (IVT)**: If $f$ is continuous on $[a, b]$ and $k$ lies between $f(a)$ and $f(b)$, there exists $c \\in [a, b]$ such that $f(c) = k$.',
        ],
        table: {
          headers: ['Discontinuity Type', 'Behavior at x = c', 'Example'],
          rows: [
            ['Removable', 'Limit exists, but $\\lim_{x\\to c} f(x) \\ne f(c)$', '$\\frac{\\sin x}{x}$ undefined at $x=0$'],
            ['Jump', 'LHL and RHL both exist, but $\\text{LHL} \\ne \\text{RHL}$', 'Step function $\\lfloor x \\rfloor$ at integers'],
            ['Infinite', 'One or both one-sided limits diverge to $\\pm\\infty$', '$1/(x-1)$ at $x=1$'],
          ],
        },
      },
    ],
    graphPreset: {
      label: 'Plot f(x) = sin(x)/x near 0',
      expr: 'sin(x)/x',
    },
  },

  'm1-derivatives': {
    id: 'm1-derivatives',
    moduleId: 1,
    title: 'Derivatives, Chain Rule & Implicit Differentiation',
    summary:
      'Instantaneous rates of change, derivative as a function, higher-order derivatives, composite differentiation via the Chain Rule, and differentiating implicit curves.',
    subtopics: [
      'Derivative Definition & Rates of Change',
      'Higher-Order Derivatives',
      'Chain Rule',
      'Implicit Differentiation',
      'Logarithmic Differentiation',
    ],
    keyTakeaways: [
      'The derivative $f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$ gives both the instantaneous rate of change and tangent slope.',
      'Chain rule: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$ differentiates outside-in.',
      'In implicit differentiation of $F(x, y) = c$, apply $\\frac{d}{dx}[g(y)] = g\'(y)\\frac{dy}{dx}$ and isolate $\\frac{dy}{dx}$.',
    ],
    sections: [
      {
        num: '01',
        title: 'Rates of Change, Higher-Order Derivatives & Chain Rule',
        paragraphs: [
          'The average rate of change over $[x_0, x_0+h]$ is $\\frac{f(x_0+h)-f(x_0)}{h}$, while the instantaneous rate of change at $x_0$ is $f\'(x_0)$.',
          'Taking successive derivatives gives $f\'\'(x) = \\frac{d^2y}{dx^2}$, $f\'\'\'(x)$, etc. In rectilinear motion, $s\'(t) = v(t)$ (velocity) and $s\'\'(t) = a(t)$ (acceleration).',
        ],
        formula:
          '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      },
      {
        num: '02',
        title: 'Implicit Differentiation',
        paragraphs: [
          'When an equation relates $x$ and $y$ implicitly (such as $x^3 + y^3 = 9xy$), differentiate both sides with respect to $x$ treating $y$ as a differentiable function of $x$.',
        ],
        workedExample: {
          problem: 'Find $\\frac{dy}{dx}$ for the Folium of Descartes $x^3 + y^3 - 9xy = 0$ at $(2, 4)$.',
          steps: [
            'Differentiate term-by-term wrt $x$: $3x^2 + 3y^2 \\frac{dy}{dx} - 9\\left(y + x\\frac{dy}{dx}\\right) = 0$.',
            'Group $\\frac{dy}{dx}$ terms: $(3y^2 - 9x)\\frac{dy}{dx} = 9y - 3x^2$.',
            'Solve: $\\frac{dy}{dx} = \\frac{3y - x^2}{y^2 - 3x}$.',
            'Evaluate at $(2, 4)$: $\\frac{dy}{dx} = \\frac{12 - 4}{16 - 6} = \\frac{8}{10} = \\frac{4}{5}$.',
          ],
          answer: '$\\frac{dy}{dx} = \\frac{3y - x^2}{y^2 - 3x}$, and at $(2,4)$ the slope is $\\frac{4}{5}$.',
        },
      },
    ],
    graphPreset: {
      label: 'Explore f(x) = x^3 - 3*x and f\'(x)',
      expr: 'x^3 - 3*x',
    },
  },

  'm1-applications': {
    id: 'm1-applications',
    moduleId: 1,
    title: 'Tangents, Normals, Linearization & Concavity',
    summary:
      'Constructing tangent and normal lines, approximating nonlinear functions using linearization and differentials, and analyzing curve shapes with concavity.',
    subtopics: [
      'Tangent & Normal Equations',
      'Linearization L(x) & Differentials',
      'Concavity (Up / Down)',
      'Second Derivative Test & Inflection Points',
    ],
    keyTakeaways: [
      'Tangent slope at $(a, f(a))$ is $m = f\'(a)$; normal slope is $-1/f\'(a)$ (for $f\'(a) \\ne 0$).',
      'Linearization $L(x) = f(a) + f\'(a)(x - a)$ gives rapid accurate estimates near $x = a$.',
      '$f\'\'(x) > 0$ implies concave up ($\\smile$); $f\'\'(x) < 0$ implies concave down ($\\frown$).',
    ],
    sections: [
      {
        num: '01',
        title: 'Tangents, Normals & Linearization',
        paragraphs: [
          'The tangent line to $y = f(x)$ at $(a, f(a))$ is the best linear approximation to the curve near $a$. The differential $dy = f\'(x)\\,dx$ estimates the change $\\Delta y \\approx dy$ for small $dx = \\Delta x$.',
        ],
        formula:
          '\\text{Tangent: } y - f(a) = f\'(a)(x - a), \\qquad \\text{Normal: } y - f(a) = -\\frac{1}{f\'(a)}(x - a)',
        workedExample: {
          problem: 'Find the linearization of $f(x) = \\sqrt{1 + x}$ at $a = 0$ and approximate $\\sqrt{1.06}$.',
          steps: [
            '$f(0) = \\sqrt{1} = 1$.',
            '$f\'(x) = \\frac{1}{2\\sqrt{1+x}}$, so $f\'(0) = \\frac{1}{2}$.',
            'Linearization: $L(x) = 1 + \\frac{1}{2}x$.',
            'At $x = 0.06$: $\\sqrt{1.06} \\approx L(0.06) = 1 + 0.5(0.06) = 1.03$.',
          ],
          answer: '$L(x) = 1 + \\frac{x}{2}$, and $\\sqrt{1.06} \\approx 1.03$.',
        },
      },
      {
        num: '02',
        title: 'Concavity & Points of Inflection',
        paragraphs: [
          'Concavity describes how the derivative $f\'(x)$ changes. A point where $f$ is continuous and changes concavity (from up to down or vice versa) is a **point of inflection**.',
        ],
        keyIdea:
          'Solve $f\'\'(x) = 0$ (or where $f\'\'$ fails to exist) and verify that $f\'\'(x)$ changes sign across the point before calling it an inflection point.',
        workedExample: {
          problem: 'Find intervals of concavity and inflection points of $f(x) = x^4 - 4x^3 + 10$.',
          steps: [
            '$f\'(x) = 4x^3 - 12x^2$, and $f\'\'(x) = 12x^2 - 24x = 12x(x - 2)$.',
            'Set $f\'\'(x) = 0 \\implies x = 0, 2$.',
            'Test signs: on $(-\\infty, 0)$, $f\'\' > 0$ (concave up); on $(0, 2)$, $f\'\' < 0$ (concave down); on $(2, \\infty)$, $f\'\' > 0$ (concave up).',
          ],
          answer: 'Concave up on $(-\\infty, 0) \\cup (2, \\infty)$; concave down on $(0, 2)$; inflection points at $(0, 10)$ and $(2, -6)$.',
        },
      },
    ],
    graphPreset: {
      label: 'Visualize concavity on x^4 - 4*x^3',
      expr: 'x^4 - 4*x^3',
    },
  },

  'm2-multivariable': {
    id: 'm2-multivariable',
    moduleId: 2,
    title: 'Domains, Ranges & Level Curves',
    summary:
      'Extending functions to multiple independent variables, finding valid 2D domains, sketching level curves (contours), and interpreting level surfaces.',
    subtopics: [
      'Functions of Two & More Variables',
      'Domain & Range Restrictions',
      'Level Curves f(x, y) = c',
      'Level Surfaces f(x, y, z) = c',
    ],
    keyTakeaways: [
      'Domain restrictions arise from denominators ($\\ne 0$), even roots ($\\ge 0$), and logarithms ($> 0$).',
      'A level curve $f(x, y) = c$ is the 2D projection of the slice where surface height $z = c$.',
      'Closely spaced level curves signify steep terrain; widely spaced curves signify gentle slope.',
    ],
    sections: [
      {
        num: '01',
        title: 'Domains & Ranges of f(x, y)',
        paragraphs: [
          'A function of two variables maps ordered pairs $(x, y) \\in D \\subseteq \\mathbb{R}^2$ to a unique real number $z = f(x, y)$.',
        ],
        workedExample: {
          problem: 'Find the domain and range of $f(x, y) = \\sqrt{9 - x^2 - y^2}$.',
          steps: [
            'Inside the square root must be non-negative: $9 - x^2 - y^2 \\ge 0 \\implies x^2 + y^2 \\le 9$.',
            'Geometrically, the domain is the closed disk of radius $3$ centered at $(0, 0)$.',
            'Since $0 \\le 9 - x^2 - y^2 \\le 9$, taking the square root yields $0 \\le z \\le 3$.',
          ],
          answer: 'Domain: $\\{(x, y) : x^2 + y^2 \\le 9\\}$; Range: $[0, 3]$.',
        },
      },
      {
        num: '02',
        title: 'Level Curves & Contour Maps',
        paragraphs: [
          'Setting $f(x, y) = c$ for constants $c$ yields planar contour curves. For $f(x, y) = x^2 + y^2$, the level curves for $c > 0$ are concentric circles of radius $\\sqrt{c}$. For $f(x, y) = y^2 - x^2$ (hyperbolic paraboloid), level curves are hyperbolas.',
        ],
        keyIdea:
          'Level curves for distinct constants $c_1 \\ne c_2$ never intersect because $f(x, y)$ is single-valued.',
      },
    ],
  },

  'm2-limits-2v': {
    id: 'm2-limits-2v',
    moduleId: 2,
    title: 'Limits & Continuity of Two Variables',
    summary:
      'Evaluating limits in 2D space, proving non-existence using the two-path test, proving existence via polar coordinates, and verifying 2D continuity.',
    subtopics: [
      '2D Neighborhood Limits',
      'Two-Path Test for Non-Existence',
      'Polar Coordinate Method (r, θ)',
      'Continuity of f(x, y)',
    ],
    keyTakeaways: [
      'A 2D limit exists only if $f(x, y)$ approaches the SAME value along EVERY possible path to $(x_0, y_0)$.',
      'To prove a limit does NOT exist, find two paths (e.g. $y = mx$, $x = my^2$) yielding different limits.',
      'Polar coordinates ($x = r\\cos\\theta, y = r\\sin\\theta$) convert $(x,y) \\to (0,0)$ into $r \\to 0^+$: if bounded in $\\theta$ times $r^k$ ($k > 0$), the limit is $0$.',
    ],
    sections: [
      {
        num: '01',
        title: 'Two-Path Test for Non-Existence',
        paragraphs: [
          'If $f(x, y) \\to L_1$ along path $C_1$ and $f(x, y) \\to L_2$ along path $C_2$ with $L_1 \\ne L_2$, then $\\lim_{(x,y) \\to (x_0, y_0)} f(x, y)$ does not exist.',
        ],
        workedExample: {
          problem: 'Test the existence of $\\lim_{(x,y) \\to (0,0)} \\frac{xy^2}{x^2 + y^4}$.',
          steps: [
            'Along straight lines $y = mx$: $\\lim_{x \\to 0} \\frac{m^2 x^3}{x^2 + m^4 x^4} = \\lim_{x \\to 0} \\frac{m^2 x}{1 + m^4 x^2} = 0$.',
            'Along parabolic path $x = y^2$: $\\lim_{y \\to 0} \\frac{y^2 \\cdot y^2}{(y^2)^2 + y^4} = \\lim_{y \\to 0} \\frac{y^4}{2y^4} = \\frac{1}{2}$.',
            'Since $0 \\ne \\frac{1}{2}$, the limit does not exist!',
          ],
          answer: 'The limit does not exist (paths $y = mx$ and $x = y^2$ disagree).',
        },
      },
      {
        num: '02',
        title: 'Proving Existence via Polar Coordinates',
        paragraphs: [
          'Agreement along straight lines is never enough to prove a limit exists. Use algebraic bounds or substitute $x = r\\cos\\theta, y = r\\sin\\theta$ with $r \\to 0^+$.',
        ],
        workedExample: {
          problem: 'Show that $\\lim_{(x,y) \\to (0,0)} \\frac{3x^2 y}{x^2 + y^2} = 0$.',
          steps: [
            'Substitute $x = r\\cos\\theta$, $y = r\\sin\\theta$, $x^2 + y^2 = r^2$.',
            'Expression becomes $\\frac{3r^3 \\cos^2\\theta \\sin\\theta}{r^2} = 3r\\cos^2\\theta\\sin\\theta$.',
            'Since $|\\cos^2\\theta \\sin\\theta| \\le 1$, we have $0 \\le |f(x,y)| \\le 3r \\to 0$ as $r \\to 0^+$.',
          ],
          answer: 'By the Sandwich Theorem, the limit exists and equals $0$.',
        },
      },
    ],
  },

  'm2-partials': {
    id: 'm2-partials',
    moduleId: 2,
    title: 'Partial Derivatives, Clairaut’s Theorem & Chain Rule',
    summary:
      'Computing first- and second-order partial derivatives, partial derivatives vs continuity, Clairaut’s mixed derivative theorem, and the 2-variable Chain Rule.',
    subtopics: [
      'First-Order Partial Derivatives',
      'Partial Derivatives & Continuity',
      'Second-Order Partial Derivatives',
      'Mixed Derivative Theorem (Clairaut)',
      'Chain Rule (1 & 2 Independent Parameters)',
    ],
    keyTakeaways: [
      'To compute $f_x$, treat $y$ (and other variables) as constants and differentiate wrt $x$.',
      'Existence of $f_x$ and $f_y$ at $(a, b)$ does NOT guarantee continuity at $(a, b)$; however, continuous partial derivatives guarantee differentiability and continuity.',
      'Clairaut’s Theorem: $f_{xy} = f_{yx}$ whenever the mixed partials are continuous.',
    ],
    sections: [
      {
        num: '01',
        title: 'Partial Derivatives & Continuity Counterexample',
        paragraphs: [
          'Unlike 1D calculus where differentiability implies continuity, a 2-variable function can possess both $f_x(0,0)$ and $f_y(0,0)$ while still being **discontinuous** at $(0,0)$!',
          'Classic KTU exam example: $f(x, y) = \\frac{xy}{x^2+y^2}$ for $(x,y) \\ne (0,0)$ and $f(0,0) = 0$. Here $f_x(0,0) = 0$ and $f_y(0,0) = 0$ (since $f(x,0)=0$ and $f(0,y)=0$), yet along $y = x$, $f(x,x) = \\frac{1}{2} \\ne 0$, so $f$ is NOT continuous at $(0,0)$.',
        ],
        formula:
          '\\text{Clairaut\'s Theorem: } \\quad f_{xy}(a, b) = f_{yx}(a, b)',
      },
      {
        num: '02',
        title: 'Chain Rule for Functions of Two Variables',
        paragraphs: [
          'Case 1 (one parameter $t$): $\\frac{dw}{dt} = \\frac{\\partial f}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial f}{\\partial y}\\frac{dy}{dt}$.',
          'Case 2 (two independent parameters $u, v$): $\\frac{\\partial w}{\\partial u} = \\frac{\\partial w}{\\partial x}\\frac{\\partial x}{\\partial u} + \\frac{\\partial w}{\\partial y}\\frac{\\partial y}{\\partial u}$ and $\\frac{\\partial w}{\\partial v} = \\frac{\\partial w}{\\partial x}\\frac{\\partial x}{\\partial v} + \\frac{\\partial w}{\\partial y}\\frac{\\partial y}{\\partial v}$.',
        ],
        workedExample: {
          problem: 'If $w = x^2 + y^2$ where $x = r - s$ and $y = r + s$, find $\\frac{\\partial w}{\\partial r}$ and $\\frac{\\partial w}{\\partial s}$.',
          steps: [
            '$\\frac{\\partial w}{\\partial x} = 2x$, $\\frac{\\partial w}{\\partial y} = 2y$.',
            '$\\frac{\\partial x}{\\partial r} = 1, \\; \\frac{\\partial y}{\\partial r} = 1 \\implies \\frac{\\partial w}{\\partial r} = 2x(1) + 2y(1) = 2(r-s) + 2(r+s) = 4r$.',
            '$\\frac{\\partial x}{\\partial s} = -1, \\; \\frac{\\partial y}{\\partial s} = 1 \\implies \\frac{\\partial w}{\\partial s} = 2x(-1) + 2y(1) = -2(r-s) + 2(r+s) = 4s$.',
          ],
          answer: '$\\frac{\\partial w}{\\partial r} = 4r$ and $\\frac{\\partial w}{\\partial s} = 4s$.',
        },
      },
    ],
  },

  'm3-gradient': {
    id: 'm3-gradient',
    moduleId: 3,
    title: 'Chain Rule (3 Variables), Directional Derivatives & Gradient',
    summary:
      'Extending the chain rule to 3D space, computing rates of change in arbitrary directions using $\\nabla f$, tangent planes, and gradient orthogonality.',
    subtopics: [
      'Chain Rule (3 Variables)',
      'Directional Derivative D_u f',
      'Gradient Vector ∇f & Properties',
      'Tangent Plane & Normal Line',
    ],
    keyTakeaways: [
      'Always normalize direction $\\mathbf{v}$ into a unit vector $\\mathbf{u} = \\mathbf{v}/\\|\\mathbf{v}\\|$ before computing $D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$.',
      'Maximum rate of increase is $\\|\\nabla f\\|$ along $\\nabla f$; maximum decrease is $-\\|\\nabla f\\|$ along $-\\nabla f$.',
      '$\\nabla f$ is always orthogonal (normal) to the level curve $f(x,y)=c$ or level surface $F(x,y,z)=c$.',
    ],
    sections: [
      {
        num: '01',
        title: '3-Variable Chain Rule & Gradient Properties',
        paragraphs: [
          'For $w = f(x, y, z)$ with $x(t), y(t), z(t)$: $\\frac{dw}{dt} = f_x \\frac{dx}{dt} + f_y \\frac{dy}{dt} + f_z \\frac{dz}{dt} = \\nabla f \\cdot \\mathbf{r}\'(t)$.',
          'At a point $P_0(x_0, y_0, z_0)$ on the level surface $F(x,y,z)=c$, the tangent plane equation is $F_x(P_0)(x-x_0) + F_y(P_0)(y-y_0) + F_z(P_0)(z-z_0) = 0$.',
        ],
        formula:
          'D_{\\mathbf{u}} f(P) = \\nabla f(P) \\cdot \\mathbf{u} = \\|\\nabla f(P)\\| \\cos\\theta',
        workedExample: {
          problem:
            'Find the directional derivative of $f(x, y) = x^2 y^3 - 4y$ at $(2, -1)$ in the direction of $\\mathbf{v} = 2\\mathbf{i} + 5\\mathbf{j}$, and the direction of zero change.',
          steps: [
            'Compute gradient: $\\nabla f = \\langle 2xy^3, \\; 3x^2 y^2 - 4 \\rangle$.',
            'At $(2, -1)$: $\\nabla f(2, -1) = \\langle -4, 8 \\rangle$.',
            'Unit vector: $\\mathbf{u} = \\frac{1}{\\sqrt{29}}\\langle 2, 5 \\rangle$.',
            '$D_{\\mathbf{u}} f = \\frac{-8 + 40}{\\sqrt{29}} = \\frac{32}{\\sqrt{29}}$.',
            'Zero change occurs perpendicular to $\\nabla f = \\langle -4, 8 \\rangle$, i.e., along $\\pm\\langle 8, 4 \\rangle$ (or unit vectors $\\pm\\frac{1}{\\sqrt{5}}\\langle 2, 1 \\rangle$).',
          ],
          answer: '$D_{\\mathbf{u}} f = \\frac{32}{\\sqrt{29}}$; max rate $= 4\\sqrt{5}$; zero change along $\\pm\\langle 2, 1 \\rangle$.',
        },
      },
    ],
  },

  'm3-local-extrema': {
    id: 'm3-local-extrema',
    moduleId: 3,
    title: 'Local Extrema, Critical Points & Saddle Points',
    summary:
      'Locating stationary points via first partial derivatives and classifying local maxima, local minima, and saddle points with the Second Derivative Test.',
    subtopics: [
      'First Derivative Theorem',
      'Critical Points',
      'Saddle Points',
      'Second Derivative Test (Discriminant D)',
    ],
    keyTakeaways: [
      'Interior critical points satisfy $f_x(a, b) = 0$ and $f_y(a, b) = 0$ simultaneously.',
      'Compute the discriminant $D = f_{xx} f_{yy} - (f_{xy})^2$ at each critical point.',
      'A saddle point behaves like a minimum along one curve and a maximum along another ($D < 0$).',
    ],
    sections: [
      {
        num: '01',
        title: 'Second Derivative Test Classification',
        paragraphs: [
          'Let $(a, b)$ be a critical point where $f_x(a,b) = f_y(a,b) = 0$, and let $D(a, b) = f_{xx}(a,b)f_{yy}(a,b) - [f_{xy}(a,b)]^2$.',
        ],
        table: {
          headers: ['Condition on D', 'Condition on f_xx', 'Conclusion at (a, b)'],
          rows: [
            ['$D > 0$', '$f_{xx} > 0$', 'Local Minimum'],
            ['$D > 0$', '$f_{xx} < 0$', 'Local Maximum'],
            ['$D < 0$', 'Any', 'Saddle Point'],
            ['$D = 0$', 'Any', 'Test is Inconclusive (check directly)'],
          ],
        },
        workedExample: {
          problem: 'Classify the critical points of $f(x, y) = x^3 + y^3 - 3xy$.',
          steps: [
            '$f_x = 3x^2 - 3y = 0 \\implies y = x^2$.',
            '$f_y = 3y^2 - 3x = 0 \\implies x^4 - x = 0 \\implies x(x^3 - 1) = 0 \\implies x = 0, 1$.',
            'Critical points: $(0, 0)$ and $(1, 1)$.',
            '$f_{xx} = 6x, \\; f_{yy} = 6y, \\; f_{xy} = -3 \\implies D = 36xy - 9$.',
            'At $(0, 0)$: $D = -9 < 0 \\implies$ Saddle Point.',
            'At $(1, 1)$: $D = 27 > 0$ and $f_{xx} = 6 > 0 \\implies$ Local Minimum with $f(1,1) = -1$.',
          ],
          answer: '$(0,0)$ is a Saddle Point; $(1,1)$ is a Local Minimum ($f = -1$).',
        },
      },
    ],
  },

  'm3-absolute-extrema': {
    id: 'm3-absolute-extrema',
    moduleId: 3,
    title: 'Absolute Extrema on Closed Bounded Regions',
    summary:
      'Finding global maximum and minimum values of continuous functions on compact domains (rectangles, triangles, disks) by checking interior and boundary points.',
    subtopics: [
      'Extreme Value Theorem',
      'Interior Critical Points',
      'Boundary Parameterization',
      'Global Comparison',
    ],
    keyTakeaways: [
      'Any continuous function on a closed, bounded region $R$ attains both an absolute maximum and an absolute minimum.',
      'Step 1: Find critical points strictly INSIDE $R$ using $f_x = 0, f_y = 0$.',
      'Step 2: Reduce $f(x, y)$ to 1D along each boundary edge/curve and check corner endpoints.',
      'Step 3: Compare all candidate $f$-values — largest is absolute max, smallest is absolute min.',
    ],
    sections: [
      {
        num: '01',
        title: 'Closed Bounded Region Procedure',
        paragraphs: [
          'Absolute extrema often occur along boundary edges or corner vertices of $R$, even when $\\nabla f \\ne \\mathbf{0}$ there.',
        ],
        workedExample: {
          problem:
            'Find absolute extrema of $f(x, y) = 2 + 2x + 2y - x^2 - y^2$ on the triangle bounded by $x = 0$, $y = 0$, and $x + y = 9$.',
          steps: [
            'Interior: $f_x = 2 - 2x = 0 \\implies x=1$; $f_y = 2 - 2y = 0 \\implies y=1$. Since $1 + 1 < 9$, $(1, 1)$ is inside with $f(1,1) = 4$.',
            'Edge $y = 0$ ($0 \\le x \\le 9$): $g(x) = 2 + 2x - x^2$, max at $x=1 \\implies f(1,0)=3$; corners $(0,0)\\to 2$, $(9,0)\\to -61$.',
            'Edge $x = 0$ ($0 \\le y \\le 9$): symmetric, $f(0,1)=3$, $(0,9)\\to -61$.',
            'Edge $y = 9 - x$ ($0 \\le x \\le 9$): $h(x) = 20 - x^2 - (9-x)^2$, $h\'(x) = 18 - 4x = 0 \\implies x = 4.5, y = 4.5$, giving $f(4.5, 4.5) = -20.5$.',
          ],
          answer: 'Absolute Max $= 4$ at $(1, 1)$; Absolute Min $= -61$ at $(9, 0)$ and $(0, 9)$.',
        },
      },
    ],
  },

  'm4-lagrange': {
    id: 'm4-lagrange',
    moduleId: 4,
    title: 'Method of Lagrange Multipliers',
    summary:
      'Optimizing objective functions subject to one or two equality constraints using gradient alignment ($\\nabla f = \\lambda \\nabla g$ and $\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$).',
    subtopics: [
      'Constrained Extrema Concept',
      'One Constraint (∇f = λ∇g)',
      'Two Constraints (∇f = λ∇g + μ∇h)',
    ],
    keyTakeaways: [
      'At a constrained extremum, level surfaces of $f$ and $g$ are tangent, so $\\nabla f = \\lambda \\nabla g$.',
      'For one constraint $g(x,y,z) = 0$, solve the 4 equations: $f_x = \\lambda g_x$, $f_y = \\lambda g_y$, $f_z = \\lambda g_z$, $g = 0$.',
      'For two constraints $g = 0$ and $h = 0$, solve $\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$ together with $g = 0$ and $h = 0$.',
    ],
    sections: [
      {
        num: '01',
        title: 'Lagrange Multipliers with One Constraint',
        paragraphs: [
          'To maximize or minimize $f(x, y, z)$ subject to $g(x, y, z) = 0$ (assuming $\\nabla g \\ne \\mathbf{0}$), solve $\\nabla f = \\lambda \\nabla g$ together with $g = 0$.',
        ],
        formula:
          '\\nabla f(x,y,z) = \\lambda \\nabla g(x,y,z), \\qquad g(x,y,z) = 0',
        workedExample: {
          problem: 'Find the maximum and minimum values of $f(x, y) = xy$ on the ellipse $\\frac{x^2}{8} + \\frac{y^2}{2} = 1$.',
          steps: [
            'Let $g(x, y) = \\frac{x^2}{8} + \\frac{y^2}{2} - 1 = 0$.',
            '$\\nabla f = \\lambda \\nabla g \\implies y = \\lambda \\frac{x}{4}$ and $x = \\lambda y$.',
            'Substitute $x = \\lambda y$: $y = \\frac{\\lambda^2}{4} y \\implies y(\\lambda^2 - 4) = 0$.',
            'Since $y = 0 \\implies x = 0$ (violates $g=0$), we must have $\\lambda = \\pm 2 \\implies x = \\pm 2y$.',
            'Plug into $g = 0$: $\\frac{4y^2}{8} + \\frac{y^2}{2} = 1 \\implies y = \\pm 1, x = \\pm 2$.',
          ],
          answer: 'Maximum $f = 2$ at $(2,1), (-2,-1)$; Minimum $f = -2$ at $(2,-1), (-2,1)$.',
        },
      },
      {
        num: '02',
        title: 'Two-Constraint Optimization',
        paragraphs: [
          'When optimizing $f(x, y, z)$ along the intersection curve of two surfaces $g(x, y, z) = 0$ and $h(x, y, z) = 0$, introduce two multipliers $\\lambda$ and $\\mu$.',
        ],
        formula:
          '\\nabla f = \\lambda \\nabla g + \\mu \\nabla h, \\qquad g = 0, \\quad h = 0',
        workedExample: {
          problem:
            'Minimize $f(x, y, z) = x^2 + y^2 + z^2$ subject to $x + 2y + 3z = 6$ and $x - y + z = 2$ (or maximize $f(x,y,z) = x + 2y + 3z$ on $x - y + z = 1$ and $x^2 + y^2 = 1$).',
          steps: [
            'Take $f(x, y, z) = x + 2y + 3z$, $g(x, y, z) = x - y + z - 1 = 0$, $h(x, y, z) = x^2 + y^2 - 1 = 0$.',
            'Gradients: $\\nabla f = \\langle 1, 2, 3 \\rangle$, $\\nabla g = \\langle 1, -1, 1 \\rangle$, $\\nabla h = \\langle 2x, 2y, 0 \\rangle$.',
            '$z$-component gives $3 = \\lambda(1) + \\mu(0) \\implies \\lambda = 3$.',
            '$x$ and $y$ components: $1 = 3 + 2\\mu x \\implies \\mu x = -1$; $2 = -3 + 2\\mu y \\implies \\mu y = \\frac{5}{2}$.',
            'Divide or plug into $x^2 + y^2 = 1$: $\\frac{1}{\\mu^2} + \\frac{25}{4\\mu^2} = 1 \\implies \\mu^2 = \\frac{29}{4} \\implies \\mu = \\pm\\frac{\\sqrt{29}}{2}$.',
            'Thus $(x, y) = \\mp\\left(\\frac{2}{\\sqrt{29}}, -\\frac{5}{\\sqrt{29}}\\right)$ and $z = 1 - x + y$.',
          ],
          answer: 'Maximum $= 3 + \\sqrt{29}$ and Minimum $= 3 - \\sqrt{29}$.',
        },
      },
    ],
  },

  'm4-steepest-descent': {
    id: 'm4-steepest-descent',
    moduleId: 4,
    title: 'Method of Steepest Descent (2 Variables)',
    summary:
      'Iterative gradient-based optimization for unconstrained minimization of 2-variable functions by stepping along $-\\nabla f$ with exact line search.',
    subtopics: [
      'Descent Direction -∇f',
      'Exact Line Search φ(α)',
      'Iterative Update $x_{k+1}$',
      'Orthogonality of Successive Steps',
    ],
    keyTakeaways: [
      'Since $\\nabla f$ points in the direction of steepest ascent, $-\\nabla f$ points in the direction of steepest local decrease.',
      'Each step finds optimal step size $\\alpha_k > 0$ by minimizing $\\phi(\\alpha) = f(\\mathbf{x}_k - \\alpha \\nabla f(\\mathbf{x}_k))$ via $\\phi\'(\\alpha) = 0$.',
      'Consecutive steepest descent steps are orthogonal: $\\nabla f(\\mathbf{x}_{k+1}) \\cdot \\nabla f(\\mathbf{x}_k) = 0$.',
    ],
    sections: [
      {
        num: '01',
        title: 'Algorithm Steps (Two Variables)',
        paragraphs: [
          'Starting from an initial guess $\\mathbf{x}_0 = (x_0, y_0)$, perform iterations until $\\|\\nabla f(\\mathbf{x}_k)\\|$ is sufficiently small.',
        ],
        formula:
          '\\mathbf{x}_{k+1} = \\mathbf{x}_k - \\alpha_k \\nabla f(\\mathbf{x}_k), \\qquad \\alpha_k = \\arg\\min_{\\alpha > 0} f(\\mathbf{x}_k - \\alpha \\nabla f(\\mathbf{x}_k))',
        workedExample: {
          problem:
            'Perform two iterations of steepest descent for $f(x, y) = x^2 + 2y^2$ starting at $\\mathbf{x}_0 = (2, 1)$.',
          steps: [
            'Iteration 1: $\\nabla f(2,1) = \\langle 4, 4 \\rangle$. Let $\\mathbf{x}(\\alpha) = (2 - 4\\alpha, \\; 1 - 4\\alpha)$.',
            '$\\phi(\\alpha) = (2 - 4\\alpha)^2 + 2(1 - 4\\alpha)^2 \\implies \\phi\'(\\alpha) = -32 + 96\\alpha = 0 \\implies \\alpha_0 = \\frac{1}{3}$.',
            '$\\mathbf{x}_1 = \\left(\\frac{2}{3}, -\\frac{1}{3}\\right)$ where $f(\\mathbf{x}_1) = \\frac{2}{3}$.',
            'Iteration 2: $\\nabla f\\left(\\frac{2}{3}, -\\frac{1}{3}\\right) = \\left\\langle \\frac{4}{3}, -\\frac{4}{3} \\right\\rangle$. Note $\\nabla f(\\mathbf{x}_1) \\cdot \\nabla f(\\mathbf{x}_0) = 0$!',
            'Minimizing $f\\left(\\frac{2}{3}-\\frac{4}{3}\\alpha, -\\frac{1}{3}+\\frac{4}{3}\\alpha\\right)$ gives $\\alpha_1 = \\frac{1}{3}$ and $\\mathbf{x}_2 = \\left(\\frac{2}{9}, \\frac{1}{9}\\right)$ with $f(\\mathbf{x}_2) = \\frac{2}{27}$.',
          ],
          answer: '$\\mathbf{x}_1 = \\left(\\frac{2}{3}, -\\frac{1}{3}\\right)$, $\\mathbf{x}_2 = \\left(\\frac{2}{9}, \\frac{1}{9}\\right)$, rapidly converging toward $(0, 0)$.',
        },
      },
    ],
  },

  'm4-lpp': {
    id: 'm4-lpp',
    moduleId: 4,
    title: 'LPP Formulation & Graphical Method',
    summary:
      'Formulating real-world resource allocation models into Linear Programming Problems and solving 2-variable LPPs visually using feasible regions and corner points.',
    subtopics: [
      'Formulation from Word Problems',
      'Linear Constraints & Non-Negativity',
      'Feasible Region & Corner Points',
      'Special Cases (Multiple Optima, Unbounded, Infeasible)',
    ],
    keyTakeaways: [
      'Every LPP consists of: Decision Variables ($x, y$), Linear Objective Function ($Z = c_1 x + c_2 y$), and Linear Constraints + Non-negativity ($x, y \\ge 0$).',
      'Plot each constraint line using its intercepts and test $(0,0)$ to shade the valid half-plane.',
      'Fundamental Theorem of LPP: if a bounded optimal solution exists, at least one optimal point occurs at a **corner point (vertex)** of the feasible region.',
    ],
    sections: [
      {
        num: '01',
        title: 'Formulating an LPP from a Word Problem',
        paragraphs: [
          'Suppose a company makes Product A (profit ₹3/unit) and Product B (profit ₹5/unit). Machine M1 has 20 hrs (A needs 1 hr, B needs 2 hrs); Machine M2 has 15 hrs (each needs 1 hr); market demand caps B at 8 units.',
          'Define decision variables $x = $ units of A, $y = $ units of B. Objective: Maximize $Z = 3x + 5y$ subject to $x + 2y \\le 20$, $x + y \\le 15$, $y \\le 8$, $x, y \\ge 0$.',
        ],
      },
      {
        num: '02',
        title: 'Step-by-Step Graphical Method & Special Cases',
        paragraphs: [
          '1. Convert each inequality into a line $a_i x + b_i y = r_i$ and plot using intercepts.',
          '2. Shade the common **feasible region** satisfying every constraint.',
          '3. Solve intersecting line pairs to find coordinates of every **corner point (vertex)** and evaluate $Z = c_1 x + c_2 y$.',
        ],
        table: {
          headers: ['Graphical Case', 'Visual Signature', 'Interpretation'],
          rows: [
            ['Unique Optimal', 'One vertex yields strictly best $Z^*$', 'Single optimal solution $(x^*, y^*)$'],
            ['Alternate Optima', 'Two adjacent vertices tie for best $Z^*$', 'Infinitely many optimal solutions on the edge between them'],
            ['Unbounded', 'Feasible region is open in optimization direction', '$Z$ can reach $+\\infty$ (max) or $-\\infty$ (min)'],
            ['Infeasible', 'Constraints have no common overlapping region', 'No solution satisfies all constraints'],
          ],
        },
        workedExample: {
          problem:
            'Maximize $Z = 3x + 5y$ subject to $x + 2y \\le 20$, $x + y \\le 15$, $y \\le 8$, $x, y \\ge 0$.',
          steps: [
            'Plot $L_1: x + 2y = 20$ through $(20,0), (0,10)$; $L_2: x + y = 15$ through $(15,0), (0,15)$; $L_3: y = 8$.',
            'Corner points: $O(0,0)$, $A(15,0)$, $B(10,5)$ (from $L_1 \\cap L_2$), $C(4,8)$ (from $L_1 \\cap L_3$), and $D(0,8)$.',
            'Evaluate $Z$: $Z(O)=0$, $Z(A)=45$, $Z(B)=3(10)+5(5)=55$, $Z(C)=3(4)+5(8)=52$, $Z(D)=40$.',
          ],
          answer: 'Maximum $Z^* = 55$ at $(x, y) = (10, 5)$. Try it interactively inside Module 4’s LPP Solver!',
        },
      },
    ],
    lppPresetIndex: 0,
  },
};
