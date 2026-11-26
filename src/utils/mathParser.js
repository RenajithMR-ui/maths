/**
 * Safe mathematical expression parser, evaluator, and symbolic differentiator.
 * Supports +, -, *, /, ^, parentheses, unary minus, and functions:
 * sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, exp, ln, log, sqrt, abs, floor, ceil
 * Constants: pi, e
 */

const FUNCTIONS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  exp: Math.exp,
  ln: Math.log,
  log: Math.log10,
  sqrt: Math.sqrt,
  abs: Math.abs,
  floor: Math.floor,
  ceil: Math.ceil,
};

const CONSTANTS = {
  pi: Math.PI,
  e: Math.E,
};

function tokenize(expr) {
  const tokens = [];
  let i = 0;
  const s = String(expr || '').replace(/\s+/g, '');
  if (!s) throw new Error('Empty expression');

  while (i < s.length) {
    const ch = s[i];

    if (/[0-9.]/.test(ch)) {
      let numStr = '';
      while (i < s.length && /[0-9.]/.test(s[i])) {
        numStr += s[i++];
      }
      const val = Number(numStr);
      if (Number.isNaN(val)) throw new Error(`Invalid number: ${numStr}`);
      tokens.push({ type: 'num', value: val });
      continue;
    }

    if (/[a-zA-Z]/.test(ch)) {
      let id = '';
      while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) {
        id += s[i++];
      }
      const lower = id.toLowerCase();
      if (lower === 'x') {
        tokens.push({ type: 'var' });
      } else if (lower in CONSTANTS) {
        tokens.push({ type: 'const', name: lower, value: CONSTANTS[lower] });
      } else if (lower in FUNCTIONS) {
        tokens.push({ type: 'fn', value: lower });
      } else {
        throw new Error(`Unknown symbol: ${id}`);
      }
      continue;
    }

    if ('+-*/^()'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }

    throw new Error(`Unexpected character: ${ch}`);
  }

  // Insert implicit multiplication
  const expanded = [];
  for (let idx = 0; idx < tokens.length; idx++) {
    const curr = tokens[idx];
    const prev = expanded[expanded.length - 1];
    if (prev) {
      const prevIsValue =
        prev.type === 'num' ||
        prev.type === 'const' ||
        prev.type === 'var' ||
        (prev.type === 'op' && prev.value === ')');
      const currStartsValue =
        curr.type === 'var' ||
        curr.type === 'const' ||
        curr.type === 'fn' ||
        curr.type === 'num' ||
        (curr.type === 'op' && curr.value === '(');
      if (prevIsValue && currStartsValue) {
        expanded.push({ type: 'op', value: '*' });
      }
    }
    expanded.push(curr);
  }
  return expanded;
}

export function parseMathAST(expr) {
  const tokens = tokenize(expr);

  function parseExpression(pos) {
    let [left, p] = parseTerm(pos);
    while (p < tokens.length && tokens[p].type === 'op' && (tokens[p].value === '+' || tokens[p].value === '-')) {
      const op = tokens[p].value;
      const [right, nextP] = parseTerm(p + 1);
      left = { type: op === '+' ? 'add' : 'sub', left, right };
      p = nextP;
    }
    return [left, p];
  }

  function parseTerm(pos) {
    let [left, p] = parseUnary(pos);
    while (p < tokens.length && tokens[p].type === 'op' && (tokens[p].value === '*' || tokens[p].value === '/')) {
      const op = tokens[p].value;
      const [right, nextP] = parseUnary(p + 1);
      left = { type: op === '*' ? 'mul' : 'div', left, right };
      p = nextP;
    }
    return [left, p];
  }

  function parseUnary(pos) {
    if (pos < tokens.length && tokens[pos].type === 'op' && tokens[pos].value === '-') {
      const [inner, nextP] = parseUnary(pos + 1);
      return [{ type: 'neg', arg: inner }, nextP];
    }
    if (pos < tokens.length && tokens[pos].type === 'op' && tokens[pos].value === '+') {
      return parseUnary(pos + 1);
    }
    return parsePower(pos);
  }

  function parsePower(pos) {
    let [base, p] = parsePrimary(pos);
    if (p < tokens.length && tokens[p].type === 'op' && tokens[p].value === '^') {
      const [exp, nextP] = parseUnary(p + 1);
      return [{ type: 'pow', base, exp }, nextP];
    }
    return [base, p];
  }

  function parsePrimary(pos) {
    if (pos >= tokens.length) throw new Error('Unexpected end of expression');
    const tok = tokens[pos];

    if (tok.type === 'num') return [{ type: 'num', value: tok.value }, pos + 1];
    if (tok.type === 'const') return [{ type: 'const', name: tok.name, value: tok.value }, pos + 1];
    if (tok.type === 'var') return [{ type: 'var' }, pos + 1];
    if (tok.type === 'fn') {
      if (pos + 1 >= tokens.length || tokens[pos + 1].value !== '(') {
        throw new Error(`Expected '(' after ${tok.value}`);
      }
      const [arg, nextP] = parseExpression(pos + 2);
      if (nextP >= tokens.length || tokens[nextP].value !== ')') {
        throw new Error(`Expected ')' after ${tok.value}(...)`);
      }
      return [{ type: 'fn', name: tok.value, arg }, nextP + 1];
    }
    if (tok.type === 'op' && tok.value === '(') {
      const [inner, nextP] = parseExpression(pos + 1);
      if (nextP >= tokens.length || tokens[nextP].value !== ')') {
        throw new Error("Missing closing ')'");
      }
      return [inner, nextP + 1];
    }
    throw new Error('Invalid syntax');
  }

  const [ast, endPos] = parseExpression(0);
  if (endPos < tokens.length) throw new Error('Unexpected trailing tokens');
  return ast;
}

function evalAST(node) {
  switch (node.type) {
    case 'num':
      return () => node.value;
    case 'const':
      return () => node.value;
    case 'var':
      return (x) => x;
    case 'neg': {
      const a = evalAST(node.arg);
      return (x) => -a(x);
    }
    case 'add': {
      const l = evalAST(node.left);
      const r = evalAST(node.right);
      return (x) => l(x) + r(x);
    }
    case 'sub': {
      const l = evalAST(node.left);
      const r = evalAST(node.right);
      return (x) => l(x) - r(x);
    }
    case 'mul': {
      const l = evalAST(node.left);
      const r = evalAST(node.right);
      return (x) => l(x) * r(x);
    }
    case 'div': {
      const l = evalAST(node.left);
      const r = evalAST(node.right);
      return (x) => l(x) / r(x);
    }
    case 'pow': {
      const b = evalAST(node.base);
      const e = evalAST(node.exp);
      return (x) => Math.pow(b(x), e(x));
    }
    case 'fn': {
      const fn = FUNCTIONS[node.name];
      const a = evalAST(node.arg);
      return (x) => fn(a(x));
    }
    default:
      throw new Error('Unsupported AST node');
  }
}

export function compileMathExpression(expr) {
  const ast = parseMathAST(expr);
  return evalAST(ast);
}

// ---------- Symbolic Differentiation & Algebraic Simplification ----------

const isZero = (n) => n.type === 'num' && Math.abs(n.value) < 1e-12;
const isOne = (n) => n.type === 'num' && Math.abs(n.value - 1) < 1e-12;
const numNode = (v) => ({ type: 'num', value: Number(v.toFixed(6)) });

function simplifyAST(node) {
  switch (node.type) {
    case 'num':
    case 'const':
    case 'var':
      return node;
    case 'neg': {
      const arg = simplifyAST(node.arg);
      if (isZero(arg)) return numNode(0);
      if (arg.type === 'num') return numNode(-arg.value);
      if (arg.type === 'neg') return arg.arg;
      return { type: 'neg', arg };
    }
    case 'add': {
      const left = simplifyAST(node.left);
      const right = simplifyAST(node.right);
      if (isZero(left)) return right;
      if (isZero(right)) return left;
      if (left.type === 'num' && right.type === 'num') return numNode(left.value + right.value);
      if (right.type === 'neg') return simplifyAST({ type: 'sub', left, right: right.arg });
      return { type: 'add', left, right };
    }
    case 'sub': {
      const left = simplifyAST(node.left);
      const right = simplifyAST(node.right);
      if (isZero(right)) return left;
      if (isZero(left)) return simplifyAST({ type: 'neg', arg: right });
      if (left.type === 'num' && right.type === 'num') return numNode(left.value - right.value);
      return { type: 'sub', left, right };
    }
    case 'mul': {
      const left = simplifyAST(node.left);
      const right = simplifyAST(node.right);
      if (isZero(left) || isZero(right)) return numNode(0);
      if (isOne(left)) return right;
      if (isOne(right)) return left;
      if (left.type === 'neg') return simplifyAST({ type: 'neg', arg: { type: 'mul', left: left.arg, right } });
      if (right.type === 'neg') return simplifyAST({ type: 'neg', arg: { type: 'mul', left, right: right.arg } });
      if (left.type === 'num' && right.type === 'num') return numNode(left.value * right.value);
      if (left.type === 'num' && left.value === -1) return simplifyAST({ type: 'neg', arg: right });
      if (right.type === 'num' && right.value === -1) return simplifyAST({ type: 'neg', arg: left });
      // Fold nested scalar: c1 * (c2 * u) -> (c1*c2) * u
      if (left.type === 'num' && right.type === 'mul' && right.left.type === 'num') {
        return simplifyAST({ type: 'mul', left: numNode(left.value * right.left.value), right: right.right });
      }
      if (right.type === 'num' && left.type !== 'num') {
        return simplifyAST({ type: 'mul', left: right, right: left });
      }
      // Simplify (a / c1) * c2 or c2 * (a / c1) when c1, c2 are numbers
      if (left.type === 'div' && left.right.type === 'num' && right.type === 'num') {
        return simplifyAST({ type: 'mul', left: numNode(right.value / left.right.value), right: left.left });
      }
      if (right.type === 'div' && right.right.type === 'num' && left.type === 'num') {
        return simplifyAST({ type: 'mul', left: numNode(left.value / right.right.value), right: right.left });
      }
      return { type: 'mul', left, right };
    }
    case 'div': {
      const left = simplifyAST(node.left);
      const right = simplifyAST(node.right);
      if (isZero(left)) return numNode(0);
      if (isOne(right)) return left;
      if (left.type === 'neg') return simplifyAST({ type: 'neg', arg: { type: 'div', left: left.arg, right } });
      if (left.type === 'num' && right.type === 'num' && !isZero(right)) {
        return numNode(left.value / right.value);
      }
      if (left.type === 'mul' && left.left.type === 'num' && right.type === 'num' && !isZero(right)) {
        return simplifyAST({ type: 'mul', left: numNode(left.left.value / right.value), right: left.right });
      }
      return { type: 'div', left, right };
    }
    case 'pow': {
      const base = simplifyAST(node.base);
      const exp = simplifyAST(node.exp);
      if (isZero(exp)) return numNode(1);
      if (isOne(exp)) return base;
      if (isZero(base)) return numNode(0);
      if (base.type === 'num' && exp.type === 'num') return numNode(Math.pow(base.value, exp.value));
      return { type: 'pow', base, exp };
    }
    case 'fn':
      return { type: 'fn', name: node.name, arg: simplifyAST(node.arg) };
    default:
      return node;
  }
}

function diffAST(node) {
  switch (node.type) {
    case 'num':
    case 'const':
      return numNode(0);
    case 'var':
      return numNode(1);
    case 'neg':
      return { type: 'neg', arg: diffAST(node.arg) };
    case 'add':
      return { type: 'add', left: diffAST(node.left), right: diffAST(node.right) };
    case 'sub':
      return { type: 'sub', left: diffAST(node.left), right: diffAST(node.right) };
    case 'mul':
      return {
        type: 'add',
        left: { type: 'mul', left: diffAST(node.left), right: node.right },
        right: { type: 'mul', left: node.left, right: diffAST(node.right) },
      };
    case 'div':
      return {
        type: 'div',
        left: {
          type: 'sub',
          left: { type: 'mul', left: diffAST(node.left), right: node.right },
          right: { type: 'mul', left: node.left, right: diffAST(node.right) },
        },
        right: { type: 'pow', base: node.right, exp: numNode(2) },
      };
    case 'pow': {
      const u = node.base;
      const v = node.exp;
      const du = diffAST(u);
      // Constant exponent: v * u^(v-1) * u'
      if (v.type === 'num' || v.type === 'const' || (v.type === 'neg' && (v.arg.type === 'num' || v.arg.type === 'const'))) {
        return {
          type: 'mul',
          left: {
            type: 'mul',
            left: v,
            right: { type: 'pow', base: u, exp: { type: 'sub', left: v, right: numNode(1) } },
          },
          right: du,
        };
      }
      // Constant base e^v or a^v: a^v * ln(a) * v'
      if (u.type === 'const' && u.name === 'e') {
        return { type: 'mul', left: node, right: diffAST(v) };
      }
      if (u.type === 'num' || u.type === 'const') {
        return {
          type: 'mul',
          left: { type: 'mul', left: node, right: { type: 'fn', name: 'ln', arg: u } },
          right: diffAST(v),
        };
      }
      // General u(x)^v(x)
      return {
        type: 'mul',
        left: node,
        right: {
          type: 'add',
          left: { type: 'mul', left: diffAST(v), right: { type: 'fn', name: 'ln', arg: u } },
          right: { type: 'mul', left: v, right: { type: 'div', left: du, right: u } },
        },
      };
    }
    case 'fn': {
      const u = node.arg;
      const du = diffAST(u);
      let outer;
      switch (node.name) {
        case 'sin':
          outer = { type: 'fn', name: 'cos', arg: u };
          break;
        case 'cos':
          outer = { type: 'neg', arg: { type: 'fn', name: 'sin', arg: u } };
          break;
        case 'tan':
          outer = { type: 'div', left: numNode(1), right: { type: 'pow', base: { type: 'fn', name: 'cos', arg: u }, exp: numNode(2) } };
          break;
        case 'exp':
          outer = { type: 'fn', name: 'exp', arg: u };
          break;
        case 'ln':
          outer = { type: 'div', left: numNode(1), right: u };
          break;
        case 'log':
          outer = { type: 'div', left: numNode(1), right: { type: 'mul', left: u, right: { type: 'fn', name: 'ln', arg: numNode(10) } } };
          break;
        case 'sqrt':
          outer = { type: 'div', left: numNode(1), right: { type: 'mul', left: numNode(2), right: { type: 'fn', name: 'sqrt', arg: u } } };
          break;
        case 'asin':
          outer = { type: 'div', left: numNode(1), right: { type: 'fn', name: 'sqrt', arg: { type: 'sub', left: numNode(1), right: { type: 'pow', base: u, exp: numNode(2) } } } };
          break;
        case 'acos':
          outer = { type: 'div', left: numNode(-1), right: { type: 'fn', name: 'sqrt', arg: { type: 'sub', left: numNode(1), right: { type: 'pow', base: u, exp: numNode(2) } } } };
          break;
        case 'atan':
          outer = { type: 'div', left: numNode(1), right: { type: 'add', left: numNode(1), right: { type: 'pow', base: u, exp: numNode(2) } } };
          break;
        case 'sinh':
          outer = { type: 'fn', name: 'cosh', arg: u };
          break;
        case 'cosh':
          outer = { type: 'fn', name: 'sinh', arg: u };
          break;
        case 'tanh':
          outer = { type: 'div', left: numNode(1), right: { type: 'pow', base: { type: 'fn', name: 'cosh', arg: u }, exp: numNode(2) } };
          break;
        default:
          throw new Error(`Symbolic derivative not available for ${node.name}`);
      }
      return { type: 'mul', left: outer, right: du };
    }
    default:
      throw new Error('Cannot differentiate expression');
  }
}

function astToLatex(node, parentPrec = 0) {
  const wrap = (str, myPrec) => (myPrec < parentPrec ? `\\left(${str}\\right)` : str);

  switch (node.type) {
    case 'num':
      return String(Number(node.value.toFixed(4)));
    case 'const':
      return node.name === 'pi' ? '\\pi' : 'e';
    case 'var':
      return 'x';
    case 'neg':
      return wrap(`-${astToLatex(node.arg, 3)}`, 3);
    case 'add':
      return wrap(`${astToLatex(node.left, 1)} + ${astToLatex(node.right, 1)}`, 1);
    case 'sub':
      return wrap(`${astToLatex(node.left, 1)} - ${astToLatex(node.right, 2)}`, 1);
    case 'mul': {
      const l = astToLatex(node.left, 2);
      const r = astToLatex(node.right, 2);
      const needsDot =
        (node.left.type === 'num' && node.right.type === 'num') ||
        (node.left.type !== 'num' && node.right.type === 'num');
      return wrap(needsDot ? `${l} \\cdot ${r}` : `${l}${r}`, 2);
    }
    case 'div':
      return `\\frac{${astToLatex(node.left, 0)}}{${astToLatex(node.right, 0)}}`;
    case 'pow': {
      const baseStr =
        node.base.type === 'var' || node.base.type === 'num' || node.base.type === 'const'
          ? astToLatex(node.base, 4)
          : `\\left(${astToLatex(node.base, 0)}\\right)`;
      return `${baseStr}^{${astToLatex(node.exp, 0)}}`;
    }
    case 'fn': {
      if (node.name === 'sqrt') return `\\sqrt{${astToLatex(node.arg, 0)}}`;
      if (node.name === 'exp') return `e^{${astToLatex(node.arg, 0)}}`;
      return `\\${node.name}\\left(${astToLatex(node.arg, 0)}\\right)`;
    }
    default:
      return '';
  }
}

function astToText(node, parentPrec = 0) {
  const wrap = (str, myPrec) => (myPrec < parentPrec ? `(${str})` : str);

  switch (node.type) {
    case 'num':
      return String(Number(node.value.toFixed(4)));
    case 'const':
      return node.name;
    case 'var':
      return 'x';
    case 'neg':
      return wrap(`-${astToText(node.arg, 3)}`, 3);
    case 'add':
      return wrap(`${astToText(node.left, 1)} + ${astToText(node.right, 1)}`, 1);
    case 'sub':
      return wrap(`${astToText(node.left, 1)} - ${astToText(node.right, 2)}`, 1);
    case 'mul':
      return wrap(`${astToText(node.left, 2)}*${astToText(node.right, 2)}`, 2);
    case 'div':
      return wrap(`${astToText(node.left, 2)}/${astToText(node.right, 3)}`, 2);
    case 'pow':
      return wrap(`${astToText(node.base, 4)}^${astToText(node.exp, 4)}`, 4);
    case 'fn':
      return `${node.name}(${astToText(node.arg, 0)})`;
    default:
      return '';
  }
}

/**
 * Given an expression string like "x^3 - 3*x", returns:
 * { fn, derivFn, latex, derivLatex, derivExpr, symbolic: true|false }
 */
export function analyzeFunctionExpression(expr) {
  const ast = simplifyAST(parseMathAST(expr));
  const fn = evalAST(ast);
  const latex = astToLatex(ast);

  try {
    const dAst = simplifyAST(diffAST(ast));
    return {
      fn,
      derivFn: evalAST(dAst),
      latex,
      derivLatex: astToLatex(dAst),
      derivExpr: astToText(dAst),
      symbolic: true,
    };
  } catch {
    return {
      fn,
      derivFn: (x) => numericalDerivative(fn, x),
      latex,
      derivLatex: '\\frac{d}{dx}\\left[' + latex + '\\right] \\text{ (numerical)}',
      derivExpr: `d/dx(${expr})`,
      symbolic: false,
    };
  }
}

export function numericalDerivative(fn, x, h = 1e-5) {
  return (fn(x + h) - fn(x - h)) / (2 * h);
}

export function numericalSecondDerivative(fn, x, h = 1e-4) {
  return (fn(x + h) - 2 * fn(x) + fn(x - h)) / (h * h);
}
