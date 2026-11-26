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
        title: 'Limits, Existence Condition, Limit Laws & Standard Forms',
        bullets: [
          '**One-Sided Limits**: $\\text{LHL} = \\lim_{x \\to a^-} f(x) = \\lim_{h \\to 0} f(a - h)$ and $\\text{RHL} = \\lim_{x \\to a^+} f(x) = \\lim_{h \\to 0} f(a + h)$. Limit exists iff $\\text{LHL} = \\text{RHL} = L$.',
          '**Basic Limits**: Identity $\\lim_{x\\to c} x = c$, Constant $\\lim_{x\\to c} k = k$, Infinity shortcut $\\frac{a}{\\infty} = 0$.',
          '**Standard Limits & L’Hôpital**: $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$, $\\lim_{x\\to 0}\\frac{\\log(1+x)}{x} = 1$, $\\lim_{x\\to 0}\\frac{e^x-1}{x} = 1$, $\\lim_{x\\to a}\\frac{x^n-a^n}{x-a} = n a^{n-1}$. For $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, differentiate numerator & denominator separately.',
          '**Factoring Identities**: $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ and $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.',
        ],
        formula:
          '\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L',
        table: {
          headers: ['Limit Law', 'Formula (given $\\lim f = L,\\; \\lim g = M$)'],
          rows: [
            ['Sum / Difference', '$\\lim_{x\\to c}[f(x) \\pm g(x)] = L \\pm M$'],
            ['Constant Multiple', '$\\lim_{x\\to c}[k\\,f(x)] = kL$'],
            ['Product / Quotient', '$\\lim_{x\\to c}[f(x)g(x)] = LM, \\quad \\lim_{x\\to c}\\frac{f(x)}{g(x)} = \\frac{L}{M}\\;(M \\ne 0)$'],
            ['Power / Root', '$\\lim_{x\\to c}[f(x)]^n = L^n, \\quad \\lim_{x\\to c}\\sqrt[n]{f(x)} = L^{1/n}$'],
          ],
        },
        keyIdea:
          'Piecewise functions at boundary points must always be tested using LHL and RHL separately.',
        workedExample: {
          problem:
            'Find the value of $k$ so that $f(x) = \\begin{cases} \\frac{\\sin(3x)}{x}, & x \\ne 0 \\\\ k - 1, & x = 0 \\end{cases}$ is continuous at $x = 0$.',
          steps: [
            'Compute $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = 3 \\lim_{x \\to 0} \\frac{\\sin(3x)}{3x} = 3$ (or by L’Hôpital: $\\frac{3\\cos(3x)}{1} \\to 3$).',
            'Equate limit to $f(0) = k - 1 \\implies 3 = k - 1 \\implies k = 4$.',
          ],
          answer: '$k = 4$.',
        },
      },
      {
        num: '02',
        title: 'Sandwich Theorem, Continuity Properties & IVT',
        bullets: [
          '**Sandwich (Squeeze) Theorem**: If $g(x) \\le f(x) \\le h(x)$ near $c$ and $\\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L$, then $\\lim_{x \\to c} f(x) = L$.',
          '**One-Sided Continuity**: Continuous from right if $\\lim_{x\\to a^+} f(x) = f(a)$; from left if $\\lim_{x\\to a^-} f(x) = f(a)$.',
          '**Continuous Function Properties**: Sums $(f\\pm g)$, scalar multiples $(cf)$, and compositions $(g\\circ f)$ preserve continuity. Polynomials, $e^x$, $\\sin x$, $\\cos x$ are continuous everywhere; $\\tan x$ is discontinuous at $\\cos x = 0$, i.e. $x = (2n+1)\\frac{\\pi}{2}$. Discontinuities occur where **denominator $= 0$**.',
          '**Intermediate Value Theorem (IVT)**: If $f$ is continuous on $[a, b]$ and $k$ lies between $f(a)$ and $f(b)$, there exists $c \\in [a, b]$ such that $f(c) = k$.',
        ],
        table: {
          headers: ['Discontinuity Type', 'Behavior at $x = c$', 'Example'],
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
        title: 'First Principle, Standard Derivatives & Differentiation Rules',
        bullets: [
          '**First Principle & Alternative Form**: $f\'(a) = \\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h} = \\lim_{z\\to a}\\frac{f(z)-f(a)}{z-a}$ (gives curve slope, tangent slope, and instantaneous rate of change at $x=a$).',
          '**Basic Rules**: Constant $\\frac{d}{dx}(c) = 0$; Identity $\\frac{d}{dx}(x) = 1$; Power $\\frac{d}{dx}(x^n) = nx^{n-1}$; Sum/Diff $(u\\pm v)\' = u\' \\pm v\'$; Scalar $(ku)\' = k u\'$.',
          '**Product & Quotient Rules**: $(uv)\' = u v\' + v u\'$; $\\left(\\frac{u}{v}\\right)\' = \\frac{v u\' - u v\'}{v^2}$ ($v \\ne 0$).',
          '**Chain Rule & Rectilinear Motion**: $\\frac{dy}{dx} = \\frac{dy}{dt}\\cdot\\frac{dt}{dx}$; velocity $v(t) = s\'(t)$ and acceleration $a(t) = s\'\'(t)$.',
        ],
        formula:
          'f\'(a) = \\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}, \\qquad \\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
        table: {
          headers: ['Function', 'Derivative', 'Trig Function', 'Derivative'],
          rows: [
            ['$x^n$', '$n x^{n-1}$', '$\\sin x$', '$\\cos x$'],
            ['$\\sqrt{x}$', '$\\frac{1}{2\\sqrt{x}}$', '$\\cos x$', '$-\\sin x$'],
            ['$e^x$', '$e^x$', '$\\tan x$', '$\\sec^2 x$'],
            ['$\\log x$', '$\\frac{1}{x}$', '$\\csc x$', '$-\\csc x \\cot x$'],
            ['$a^x$', '$a^x \\log a$', '$\\sec x$', '$\\sec x \\tan x$'],
            ['$c$ (constant)', '$0$', '$\\cot x$', '$-\\csc^2 x$'],
          ],
        },
      },
      {
        num: '02',
        title: 'Implicit & Logarithmic Differentiation',
        bullets: [
          '**Implicit Method**: Differentiate $F(x, y) = 0$ wrt $x$, multiplying any $y$-derivative by $\\frac{dy}{dx}$ (shortcut: $\\frac{dy}{dx} = -\\frac{F_x}{F_y}$).',
          '**Logarithmic Trick**: For $y = [u(x)]^{v(x)}$, take $\\ln y = v(x)\\ln u(x)$ before differentiating.',
        ],
        workedExample: {
          problem: 'Find $\\frac{dy}{dx}$ for the Folium of Descartes $x^3 + y^3 - 9xy = 0$ at $(2, 4)$.',
          steps: [
            'Differentiate wrt $x$: $3x^2 + 3y^2 \\frac{dy}{dx} - 9\\left(y + x\\frac{dy}{dx}\\right) = 0$.',
            'Isolate $\\frac{dy}{dx} = \\frac{3y - x^2}{y^2 - 3x}$; at $(2, 4)$, $\\frac{12 - 4}{16 - 6} = \\frac{4}{5}$.',
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
    title: 'Functions of Several Variables, Disks & Level Curves',
    summary:
      'Short notes on functions of two and n variables, domain & range rules, 3D surfaces, open/punctured disks D(P,r) & D*(P,r), and level curve contours.',
    subtopics: [
      'Functions of Two & n Variables',
      'Domain & Range Restrictions',
      'Open Disk D(P, r) & Punctured Disk D*(P, r)',
      'Level Curves f(x, y) = c',
    ],
    keyTakeaways: [
      'A real-valued function $w = f(x_1, \\dots, x_n)$ maps each $n$-tuple in $D \\subseteq \\mathbb{R}^n$ to a unique real number.',
      'Check domains using 3 rules: denominators $\\ne 0$, even roots $\\ge 0$, and logarithms $> 0$.',
      'Punctured disk $D^*(P, r)$ removes center $P$ from $D(P, r)$ so limits depend on nearby behavior, not $f(a,b)$.',
      'Level curves $f(x, y) = c$ for distinct $c_1 \\ne c_2$ never intersect; closely packed curves indicate steep slope.',
    ],
    sections: [
      {
        num: '01',
        title: 'Functions of Several Variables, Domain & Range',
        bullets: [
          '**General Definition**: For $D \\subseteq \\mathbb{R}^n$, $w = f(x_1, \\dots, x_n)$ has **independent variables** $x_1, \\dots, x_n$ and **dependent variable** $w$.',
          '**Two Variables**: $z = f(x, y)$ maps points $(x, y) \\in D \\subseteq \\mathbb{R}^2$ to heights $z$, forming a surface in $\\mathbb{R}^3$ (e.g. $z = e^{-(x^2+y^2)}$).',
          '**Quick Domain Checks**: Keep denominators non-zero, expressions inside $\\sqrt{\\cdot}$ non-negative, and $\\ln(\\cdot)$ arguments strictly positive.',
        ],
        workedExample: {
          problem: 'Find the domain and range of $f(x, y) = \\sqrt{9 - x^2 - y^2}$.',
          steps: [
            'Require $9 - x^2 - y^2 \\ge 0 \\implies x^2 + y^2 \\le 9$ (closed disk of radius $3$ centered at $(0, 0)$).',
            'Since $0 \\le 9 - x^2 - y^2 \\le 9$, taking square roots gives $0 \\le z \\le 3$.',
          ],
          answer: 'Domain: $\\{(x, y) \\in \\mathbb{R}^2 : x^2 + y^2 \\le 9\\}$; Range: $[0, 3]$.',
        },
      },
      {
        num: '02',
        title: 'Open Disks, Punctured Disks & Level Curves',
        paragraphs: [
          'To formalize 2D limits around $P = (a, b)$, use neighborhoods called the **open disk** $D(P, r)$ and **punctured disk** $D^*(P, r)$. Setting $f(x, y) = c$ produces 2D **level curves** (contours).',
        ],
        formula:
          'D(P, r) = \\{(x, y) \\in \\mathbb{R}^2 \\mid (x-a)^2 + (y-b)^2 < r^2\\}, \\qquad D^*(P, r) = \\{(x, y) \\in \\mathbb{R}^2 \\mid 0 < (x-a)^2 + (y-b)^2 < r^2\\}',
        keyIdea:
          'For $f(x, y) = x^2 + y^2$, level curves ($c > 0$) are concentric circles of radius $\\sqrt{c}$; for $f(x, y) = y^2 - x^2$, they are hyperbolas.',
      },
    ],
  },

  'm2-limits-2v': {
    id: 'm2-limits-2v',
    moduleId: 2,
    title: 'Limits & Continuity of Two Variables',
    summary:
      'Short notes on the ε-δ definition, Limit Laws (Theorem 1.1), Squeeze Theorem, Two-Path non-existence test, polar limits, and 2D continuity.',
    subtopics: [
      'ε-δ Definition of 2D Limit',
      'Limit Laws, Polynomial & Rational Rules',
      'Squeeze (Sandwich) Theorem',
      'Two-Path & Curved-Path Tests',
      'Continuity & Removable Extensions',
    ],
    keyTakeaways: [
      'Formal $\\epsilon$-$\delta$ limit: $\\lim_{(x,y)\\to(a,b)} f(x,y) = L$ iff $0 < \\sqrt{(x-a)^2 + (y-b)^2} < \\delta \\implies |f(x,y) - L| < \\epsilon$.',
      'All polynomials are continuous everywhere ($\\lim P(x,y) = P(a,b)$); rational functions $P/Q$ are continuous wherever $Q(a,b) \\ne 0$.',
      'Agreeing on all straight lines $y = mx$ does NOT prove existence — always check curved paths (e.g. $y = kx^2$) or prove with Squeeze Theorem / polar coordinates.',
    ],
    sections: [
      {
        num: '01',
        title: 'ε-δ Definition & Limit Evaluation Rules (Theorem 1.1)',
        formula:
          '0 < \\sqrt{(x - a)^2 + (y - b)^2} < \\delta \\implies |f(x, y) - L| < \\epsilon',
        table: {
          headers: ['Function Type', 'Quick Limit Rule', 'Short Example'],
          rows: [
            ['Polynomial $P(x,y)$', 'Direct substitution: $P(a, b)$', '$\\lim_{(1,2)} (3x^2y - 2xy^3) = -10$'],
            ['Rational $P(x,y)/Q(x,y)$', 'Substitute if $Q(a, b) \\ne 0$', '$\\lim_{(1,2)} \\frac{x^2+y}{x+y^2} = \\frac{3}{5}$'],
            ['Separable $g(x)h(y)$', '$\\lim_{x\\to a} g(x) \\cdot \\lim_{y\\to b} h(y)$', '$\\lim_{(0,0)} \\frac{\\sin x\\sin y}{xy} = 1 \\cdot 1 = 1$'],
            ['$0/0$ Form', 'Two-path test (DNE) or Squeeze / Polar', 'Check $y=mx$ and $y=kx^2$'],
          ],
        },
        workedExample: {
          problem: 'Prove $\\lim_{(x,y)\\to(a,b)} x = a$ using the $\\epsilon$-$\delta$ definition.',
          steps: [
            'Note $|f(x, y) - a| = |x - a| = \\sqrt{(x-a)^2} \\le \\sqrt{(x-a)^2 + (y-b)^2}$.',
            'Choose $\\delta = \\epsilon$: whenever $0 < \\sqrt{(x-a)^2 + (y-b)^2} < \\delta = \\epsilon$, we immediately get $|x - a| < \\epsilon$.',
          ],
          answer: 'Limit equals $a$ with $\\delta = \\epsilon$.',
        },
      },
      {
        num: '02',
        title: 'Two-Path Non-Existence Test & Squeeze Theorem',
        bullets: [
          '**Two-Path Test**: If $f(x, y)$ approaches $L_1 \\ne L_2$ along two different paths toward $(a, b)$, the limit **does not exist**.',
          '**Squeeze (Sandwich) Theorem**: If $g(x,y) \\le f(x,y) \\le h(x,y)$ near $(a,b)$ and both outer limits equal $L$, then $\\lim_{(x,y)\\to(a,b)} f(x,y) = L$.',
          '**Polar Trick**: Set $x = r\\cos\\theta, y = r\\sin\\theta$ as $r \\to 0^+$; if $|f(x,y)| \\le C r^k$ ($k > 0$), the limit is $0$.',
        ],
        workedExamples: [
          {
            problem: 'Test existence at $(0, 0)$ for (a) $f(x,y) = \\frac{xy}{x^2+y^2}$ and (b) $h(x,y) = \\frac{2x^2y}{x^4+y^2}$.',
            steps: [
              'For (a) along line $y = mx$: $f(x, mx) = \\frac{mx^2}{(1+m^2)x^2} = \\frac{m}{1+m^2}$, which depends on $m$.',
              'For (b) along parabolic path $y = kx^2$: $h(x, kx^2) = \\frac{2kx^4}{(1+k^2)x^4} = \\frac{2k}{1+k^2}$, which depends on $k$ (even though straight lines give $0$).',
            ],
            answer: 'Neither limit exists at $(0, 0)$.',
          },
          {
            problem: 'Evaluate $\\lim_{(x,y)\\to(0,0)} \\frac{x^2 y}{x^2 + y^2}$ using the Squeeze Theorem.',
            steps: [
              'Since $0 \\le \\frac{x^2}{x^2+y^2} \\le 1$, we get $0 \\le \\left|\\frac{x^2y}{x^2+y^2}\\right| \\le |y|$.',
              'Thus $-|y| \\le \\frac{x^2y}{x^2+y^2} \\le |y|$; as $(x,y)\\to(0,0)$, $\\pm|y| \\to 0$.',
            ],
            answer: 'By the Squeeze Theorem, the limit exists and equals $0$.',
          },
        ],
      },
      {
        num: '03',
        title: 'Continuity of f(x, y)',
        bullets: [
          '**3 Conditions at $(a,b)$**: (1) $f(a,b)$ is defined, (2) $\\lim_{(x,y)\\to(a,b)} f(x,y)$ exists, and (3) $\\lim_{(x,y)\\to(a,b)} f(x,y) = f(a,b)$.',
          '**Removable Discontinuity**: If $Q(a,b)=0$ in $P/Q$ but the limit $L$ exists, redefining $R(a,b)=L$ makes it continuous.',
        ],
        workedExample: {
          problem: 'Check continuity at $(0,0)$ for $f(x,y)=\\frac{xy}{x^2+y^2}$ and $g(x,y)=\\frac{x^2y}{x^2+y^2}$ (both defined as $0$ at $(0,0)$).',
          steps: [
            'Both are rational with non-zero denominator everywhere away from $(0,0)$, hence continuous for $(x,y)\\ne(0,0)$.',
            'At $(0,0)$: $\\lim f$ does not exist $\\implies f$ is discontinuous at $(0,0)$; whereas $\\lim g = 0 = g(0,0) \\implies g$ is continuous everywhere.',
          ],
          answer: '$f$ is discontinuous at $(0,0)$; $g$ is continuous everywhere.',
        },
      },
    ],
  },

  'm2-partials': {
    id: 'm2-partials',
    moduleId: 2,
    title: 'Partial Derivatives & Higher-Order Partials',
    summary:
      'Short notes on limit definitions of f_x and f_y, surface trace slope interpretation, piecewise origin partials, Clairaut’s theorem + counterexample, and Laplace PDE.',
    subtopics: [
      'Limit Definitions of f_x & f_y',
      'Slope of Trace Interpretation',
      'Piecewise Partials at Origin',
      'Clairaut’s Theorem & Counterexample',
      'Laplace Equation Verification',
    ],
    keyTakeaways: [
      'To compute $f_x(x,y)$, hold $y$ constant and differentiate wrt $x$; at singular/piecewise points like $(0,0)$, use the limit definition directly.',
      '$f_x(a,b)$ and $f_y(a,b)$ measure the **slope of the surface trace** in the $x$- and $y$-directions.',
      'Existence of $f_x, f_y$ does NOT guarantee continuity at $(a,b)$; continuous partial derivatives guarantee both differentiability and continuity.',
      'Clairaut’s Theorem: $f_{xy} = f_{yx}$ when mixed partials are continuous (fails if discontinuous, e.g. $\\frac{xy(x^2-y^2)}{x^2+y^2}$ at $(0,0)$).',
    ],
    sections: [
      {
        num: '01',
        title: 'First-Order Partials, Trace Slopes & Piecewise Points',
        formula:
          'f_x(a,b) = \\lim_{h\\to 0}\\frac{f(a+h,b)-f(a,b)}{h}, \\qquad f_y(a,b) = \\lim_{h\\to 0}\\frac{f(a,b+h)-f(a,b)}{h}',
        bullets: [
          '**Geometric Meaning**: Intersecting $z=f(x,y)$ with a vertical plane along $x$ (or $y$) yields a **trace curve** whose tangent slope at $(a,b)$ is $f_x(a,b)$ (or $f_y(a,b)$).',
          '**Important Exam Rule**: Never use the quotient rule at $(0,0)$ for piecewise functions with $x^2+y^2$ in the denominator — always evaluate $f_x(0,0) = \\lim_{x\\to 0}\\frac{f(x,0)-f(0,0)}{x}$.',
        ],
        workedExamples: [
          {
            problem: 'Find the slope of $z = 10 - 4x^2 - y^2$ at $(1, 2, 2)$ in the $x$- and $y$-directions.',
            steps: [
              '$\\frac{\\partial z}{\\partial x} = -8x \\implies \\left.\\frac{\\partial z}{\\partial x}\\right|_{(1,2,2)} = -8$ (slope in $x$-direction).',
              '$\\frac{\\partial z}{\\partial y} = -2y \\implies \\left.\\frac{\\partial z}{\\partial y}\\right|_{(1,2,2)} = -4$ (slope in $y$-direction).',
            ],
            answer: 'Slopes are $-8$ ($x$-direction) and $-4$ ($y$-direction).',
          },
          {
            problem: 'For $f(x,y) = \\frac{x^3-y^3}{x^2+y^2}$ ($(x,y)\\ne 0$), $f(0,0)=0$, find $f_x(0,0)$ and $f_y(0,0)$.',
            steps: [
              '$f_x(0,0) = \\lim_{x\\to 0} \\frac{f(x,0)-f(0,0)}{x-0} = \\lim_{x\\to 0} \\frac{x^3/x^2 - 0}{x} = 1$.',
              '$f_y(0,0) = \\lim_{y\\to 0} \\frac{f(0,y)-f(0,0)}{y-0} = \\lim_{y\\to 0} \\frac{-y^3/y^2 - 0}{y} = -1$.',
            ],
            answer: '$f_x(0,0) = 1$ and $f_y(0,0) = -1$.',
          },
        ],
      },
      {
        num: '02',
        title: 'Higher-Order Partials, Clairaut’s Theorem & Laplace PDE',
        formula:
          'f_{xy} = \\frac{\\partial^2 f}{\\partial y\\partial x}, \\quad f_{yx} = \\frac{\\partial^2 f}{\\partial x\\partial y}, \\qquad \\text{Clairaut/Schwarz: } f_{xy} = f_{yx}, \\qquad \\text{2D Laplace: } \\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2} = 0',
        bullets: [
          '**Continuity vs Existence**: $f(x,y) = \\frac{xy}{x^2+y^2}$ ($f(0,0)=0$) has $f_x(0,0)=f_y(0,0)=0$ yet is discontinuous at $(0,0)$.',
          '**Clairaut Counterexample**: For $f(x,y) = \\frac{xy(x^2-y^2)}{x^2+y^2}$ ($f(0,0)=0$), $f_y(x,0)=x$ and $f_x(0,y)=-y$, giving $f_{xy}(0,0)=1 \\ne -1=f_{yx}(0,0)$.',
        ],
        workedExample: {
          problem: 'If $u = (x^2 + y^2 + z^2)^{-1/2}$, prove Laplace’s equation $u_{xx} + u_{yy} + u_{zz} = 0$.',
          steps: [
            '$u_x = -\\frac{1}{2}(x^2+y^2+z^2)^{-3/2}(2x) = -x u^3$.',
            'Differentiate again wrt $x$: $u_{xx} = -3x u^2 u_x - u^3 = 3x^2 u^5 - u^3$.',
            'By symmetry, $u_{yy} = 3y^2 u^5 - u^3$ and $u_{zz} = 3z^2 u^5 - u^3$.',
            'Add all three: $u_{xx}+u_{yy}+u_{zz} = 3u^5(x^2+y^2+z^2) - 3u^3 = 3u^5 u^{-2} - 3u^3 = 0$.',
          ],
          answer: '$u_{xx} + u_{yy} + u_{zz} = 0$.',
        },
      },
    ],
  },

  'm2-chain-implicit': {
    id: 'm2-chain-implicit',
    moduleId: 2,
    title: 'Chain Rule & Implicit Differentiation',
    summary:
      'Short notes on multivariable chain rule (1 & 2 independent variables), total derivatives, wave PDE proof, and partial-derivative implicit shortcuts.',
    subtopics: [
      'Chain Rule (1 Parameter t)',
      'Chain Rule (2 Parameters u, v)',
      'Related Rates & Wave PDE',
      'Implicit Shortcut -F_x/F_y & -F_x/F_z',
    ],
    keyTakeaways: [
      '1 parameter $t$: $\\frac{dz}{dt} = z_x \\frac{dx}{dt} + z_y \\frac{dy}{dt}$ (known as the **total derivative**).',
      '2 parameters $u, v$: $\\frac{\\partial z}{\\partial u} = z_x x_u + z_y y_u$ and $\\frac{\\partial z}{\\partial v} = z_x x_v + z_y y_v$.',
      'Implicit 2D shortcut: $F(x,y)=0 \\implies \\frac{dy}{dx} = -\\frac{F_x}{F_y}$ ($F_y \\ne 0$).',
      'Implicit 3D shortcut: $F(x,y,z)=0 \\implies \\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}$ and $\\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z}$ ($F_z \\ne 0$).',
    ],
    sections: [
      {
        num: '01',
        title: 'Multivariable Chain Rule (1 & 2 Independent Variables)',
        formula:
          '\\frac{dw}{dt} = \\frac{\\partial w}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial w}{\\partial y}\\frac{dy}{dt} + \\frac{\\partial w}{\\partial z}\\frac{dz}{dt}, \\qquad \\frac{\\partial z}{\\partial u} = \\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial u} + \\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial u}',
        table: {
          headers: ['Case', 'Dependency', 'Derivative Formula'],
          rows: [
            ['1 parameter $t$', '$z = f(x(t), y(t))$', '$\\frac{dz}{dt} = f_x x\'(t) + f_y y\'(t)$'],
            ['2 parameters $u,v$', '$z = f(x(u,v), y(u,v))$', '$z_u = f_x x_u + f_y y_u,\\; z_v = f_x x_v + f_y y_v$'],
            ['Quotient variables', '$u = f(x/y, y/z, z/x)$', 'Always yields $x u_x + y u_y + z u_z = 0$'],
          ],
        },
        workedExamples: [
          {
            problem:
              'A cone has radius $x$ decreasing at $0.3\\text{ cm/s}$ and height $y$ increasing at $0.2\\text{ cm/s}$. Find $\\frac{dV}{dt}$ when $x = 10\\text{ cm}, y = 15\\text{ cm}$.',
            steps: [
              '$V = \\frac{1}{3}\\pi x^2 y \\implies V_x = \\frac{2}{3}\\pi x y$, $V_y = \\frac{1}{3}\\pi x^2$.',
              'By chain rule: $\\frac{dV}{dt} = \\frac{2}{3}\\pi x y \\frac{dx}{dt} + \\frac{1}{3}\\pi x^2 \\frac{dy}{dt} = \\frac{2}{3}\\pi(10)(15)(-0.3) + \\frac{1}{3}\\pi(100)(0.2)$.',
            ],
            answer: '$\\frac{dV}{dt} = -\\frac{70}{3}\\pi\\text{ cm}^3/\\text{s}$ (volume is decreasing).',
          },
          {
            problem: 'If $u = f(x - ct) + g(x + ct)$, prove the wave equation $\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\frac{\\partial^2 u}{\\partial x^2}$.',
            steps: [
              'Let $r = x - ct$ and $s = x + ct$, so $u = f(r) + g(s)$.',
              '$u_t = -c f\'(r) + c g\'(s) \\implies u_{tt} = c^2 f\'\'(r) + c^2 g\'\'(s)$.',
              '$u_x = f\'(r) + g\'(s) \\implies u_{xx} = f\'\'(r) + g\'\'(s)$.',
            ],
            answer: 'Comparing both gives $u_{tt} = c^2 u_{xx}$.',
          },
        ],
      },
      {
        num: '02',
        title: 'Implicit Differentiation via Partial Derivatives',
        paragraphs: [
          'Instead of differentiating implicitly term-by-term, move all terms into $F(x, y) = 0$ (or $F(x, y, z) = 0$) and divide partial derivatives directly.',
        ],
        formula:
          '\\frac{dy}{dx} = -\\frac{F_x}{F_y} \\;(F_y \\ne 0), \\qquad \\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}, \\quad \\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z} \\;(F_z \\ne 0)',
        workedExamples: [
          {
            problem: 'Find $\\frac{\\partial z}{\\partial x}$ and $\\frac{\\partial z}{\\partial y}$ if $x^3 + y^3 + z^3 + 6xyz = 1$.',
            steps: [
              'Let $F(x, y, z) = x^3 + y^3 + z^3 + 6xyz - 1 = 0$.',
              '$F_x = 3x^2 + 6yz$, $F_y = 3y^2 + 6xz$, $F_z = 3z^2 + 6xy$.',
              'Apply shortcut: $z_x = -\\frac{3x^2+6yz}{3z^2+6xy} = -\\frac{x^2+2yz}{z^2+2xy}$ and $z_y = -\\frac{y^2+2xz}{z^2+2xy}$.',
            ],
            answer: '$\\frac{\\partial z}{\\partial x} = -\\frac{x^2+2yz}{z^2+2xy}$ and $\\frac{\\partial z}{\\partial y} = -\\frac{y^2+2xz}{z^2+2xy}$.',
          },
          {
            problem: 'Find $\\frac{\\partial z}{\\partial x}$ and $\\frac{\\partial z}{\\partial y}$ for $\\log(2x^2 + y - z^3) = 2x$.',
            steps: [
              'Let $F(x,y,z) = \\log(2x^2+y-z^3) - 2x = 0$, or differentiate wrt $x$ and $y$ directly:',
              'Wrt $x$: $\\frac{4x - 3z^2 z_x}{2x^2+y-z^3} = 2 \\implies z_x = -\\frac{4x^2 + 2y - 2z^3 - 4x}{3z^2}$.',
              'Wrt $y$: $\\frac{1 - 3z^2 z_y}{2x^2+y-z^3} = 0 \\implies 1 - 3z^2 z_y = 0 \\implies z_y = \\frac{1}{3z^2}$.',
            ],
            answer: '$\\frac{\\partial z}{\\partial x} = -\\frac{4x^2+2y-2z^3-4x}{3z^2}$ and $\\frac{\\partial z}{\\partial y} = \\frac{1}{3z^2}$.',
          },
        ],
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
        title: '3-Variable Chain Rule, Directional Derivative & Gradient Properties',
        bullets: [
          '**3-Variable Chain Rule**: For $w = f(x(t), y(t), z(t))$, $\\frac{dw}{dt} = f_x \\frac{dx}{dt} + f_y \\frac{dy}{dt} + f_z \\frac{dz}{dt} = \\nabla f \\cdot \\mathbf{r}\'(t)$.',
          '**Directional Derivative (Limit & Gradient Forms)**: Along unit vector $\\hat{\\mathbf{u}} = a\\mathbf{i} + b\\mathbf{j}$ (normalize $\\hat{\\mathbf{u}} = \\frac{\\vec{\\mathbf{v}}}{\\|\\vec{\\mathbf{v}}\\|}$ if needed), $\\left(\\frac{df}{ds}\\right)_{P_0} = D_{\\mathbf{u}} f = \\lim_{h\\to 0} \\frac{f(x_0+ha, y_0+hb)-f(x_0,y_0)}{h} = \\nabla f \\cdot \\hat{\\mathbf{u}}$.',
          '**Extremal Rates**: Max rate of increase is $+\\|\\nabla f\\|$ along $+\\nabla f$; max rate of decrease is $-\\|\\nabla f\\|$ along $-\\nabla f$; zero change occurs orthogonal to $\\nabla f$.',
          '**Tangent Plane**: At $P_0(x_0, y_0, z_0)$ on $F(x,y,z)=c$: $F_x(P_0)(x-x_0) + F_y(P_0)(y-y_0) + F_z(P_0)(z-z_0) = 0$.',
        ],
        formula:
          '\\nabla f = \\frac{\\partial f}{\\partial x}\\mathbf{i} + \\frac{\\partial f}{\\partial y}\\mathbf{j}, \\qquad D_{\\mathbf{u}} f(P) = \\nabla f(P) \\cdot \\hat{\\mathbf{u}} = \\|\\nabla f(P)\\| \\cos\\theta',
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
        title: 'Critical Points, First & Second Derivative Tests',
        bullets: [
          '**Critical Point**: A point $(a, b)$ where $f_x(a,b) = 0$ and $f_y(a,b) = 0$ (or where $f_x, f_y$ fail to exist).',
          '**Relative Extrema & Saddle**: Local max if $f(a,b) \\ge f(x,y)$ nearby; local min if $f(a,b) \\le f(x,y)$ nearby; **saddle point** if critical point is neither max nor min.',
          '**1D First Derivative Test**: Check sign of $f\'(x)$ around critical points: $+ \\to -$ gives **local max**, $- \\to +$ gives **local min**, no sign change gives **inflection**.',
          '**2D Second Derivative Test**: Compute discriminant $D(a, b) = f_{xx}(a,b)f_{yy}(a,b) - [f_{xy}(a,b)]^2$:',
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
        title: 'Lagrange Multipliers (Lagrangian & One Constraint)',
        bullets: [
          '**Lagrangian Function (1 Constraint)**: Define $L(x, y, \\lambda) = f(x, y) + \\lambda g(x, y)$ and solve $\\frac{\\partial L}{\\partial x} = 0$, $\\frac{\\partial L}{\\partial y} = 0$, $\\frac{\\partial L}{\\partial \\lambda} = 0$ (equivalently $\\nabla f = \\lambda \\nabla g$, $g = 0$).',
          '**Closest Point to Origin Pattern**: Minimize squared distance $f(x, y, z) = x^2 + y^2 + z^2$ subject to given plane constraint(s).',
        ],
        formula:
          'L(x,y,\\lambda) = f(x,y) + \\lambda g(x,y), \\qquad \\nabla f = \\lambda \\nabla g, \\quad g = 0',
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
          'When optimizing $f(x, y, z)$ along the intersection of $g = 0$ and $h = 0$, form $L(x, y, z, \\lambda, \\mu) = f + \\lambda g + \\mu h$ and set $L_x = L_y = L_z = L_\\lambda = L_\\mu = 0$.',
        ],
        formula:
          'L = f + \\lambda g + \\mu h \\implies \\nabla f = \\lambda \\nabla g + \\mu \\nabla h, \\qquad g = 0, \\quad h = 0',
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
        bullets: [
          '**Direction of Steepest Descent**: $-\\nabla f(x, y)$ points in the fastest local decrease direction.',
          '**Iterative Update**: $(x_{k+1}, y_{k+1}) = (x_k, y_k) - \\alpha_k \\nabla f(x_k, y_k)$ using either exact line search ($\\phi\'(\\alpha) = 0$) or a small fixed step size (e.g. $\\alpha = 0.1$).',
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
        title: 'General LPP Structure & Key Definitions',
        bullets: [
          '**General Form**: Optimize $Z = c_1 x_1 + c_2 x_2 + \\dots + c_n x_n$ subject to linear constraints $a_{i1}x_1 + \\dots + a_{in}x_n \\le b_i$ and $x_1, \\dots, x_n \\ge 0$ (where $c_j$ = objective coefficients, $x_j$ = decision variables, $a_{ij}$ = constraint coefficients, $b_i$ = RHS constants).',
          '**Basic Feasible Solution**: Any $(x_1, \\dots, x_n)$ satisfying all constraints including non-negativity ($x_j \\ge 0$).',
          '**Word Problem Example**: Product A (₹3/unit) and Product B (₹5/unit); M1 has 20 hrs ($x + 2y \\le 20$), M2 has 15 hrs ($x + y \\le 15$), demand caps B ($y \\le 8$), maximize $Z = 3x + 5y$.',
        ],
      },
      {
        num: '02',
        title: 'Graphical Method: Bounded vs Unbounded Test',
        bullets: [
          '**Bounded Region**: Plot constraint lines, shade the common feasible region, evaluate $Z$ at every corner point (vertex), and pick the optimal value.',
          '**Unbounded Minimize Check**: Let $Z_{\\min}$ be the smallest value at visible corner points, then graph the open half-plane $Z < Z_{\\min}$. If it has **no common points** with the feasible region, $Z_{\\min}$ is the true minimum; if it overlaps, there is **no minimum solution**.',
          '**Unbounded Maximize Check**: Graph the open half-plane $Z > Z_{\\max}$. If **no common points** with the feasible region, $Z_{\\max}$ is the true maximum; if it overlaps, there is **no maximum solution**.',
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
