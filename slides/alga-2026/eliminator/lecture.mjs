import {matrixFrom, serializeMatrix, applyOperation, systemSolution} from './math.mjs';

// Percursos transcritos das páginas 8 a 11. Não usam nextHint: a ordem e o
// ponto de paragem dos exemplos são preservados, incluindo as contradições.
export const LECTURE_EXAMPLES = [
  {id: '1', page: 8, variables: 3, cases: [{id: 'default', label: 'Exemplo completo'}], notes: []},
  {id: '2', page: 8, variables: 3, cases: [{id: 'default', label: 'Exemplo completo'}], notes: [
    'Na matriz impressa após L₂ ← −½L₂, a primeira linha deve continuar (1, 1, −1 | 1) e o termo independente da segunda linha deve ser −½. A demonstração calcula esses valores a partir das operações indicadas.'
  ]},
  {id: '3', page: 9, variables: 5, cases: [{id: 'default', label: 'Exemplo completo'}], notes: []},
  {id: '4', page: 9, variables: 3, cases: [{id: 'default', label: 'Exemplo completo'}], notes: [
    'O exemplo termina ao encontrar 0 = 2. Conserva-se esse ponto de paragem, sem normalizar o 2 nem anular os outros elementos da coluna b.'
  ]},
  {id: '5', page: 10, variables: 3, cases: [
    {id: 'general', label: 'a ≠ 2 e a ≠ −2', condition: 'a ∈ ℝ; a ≠ 2 e a ≠ −2'},
    {id: 'positive', label: 'a = 2', condition: 'a = 2'},
    {id: 'negative', label: 'a = −2', condition: 'a = −2'}
  ], notes: ['No caso a = −2, o texto termina em 0 = 8. A demonstração também para nessa contradição.']},
  {id: '6', page: 11, variables: 3, cases: [
    {id: 'general', label: 'a ≠ 1 ± i', condition: 'a ∈ ℂ; a ≠ 1 + i e a ≠ 1 − i'},
    {id: 'minus', label: 'a = 1 − i', condition: 'a = 1 − i'},
    {id: 'plus', label: 'a = 1 + i', condition: 'a = 1 + i'}
  ], notes: [
    'Após L₃ ← L₃ − iL₁, o termo y da terceira equação impressa é um lapso: o coeficiente de y é zero, como mostra a matriz ao lado.',
    'No caso geral, após normalizar L₃, a equação impressa usa 1/(a − 1 + i). O valor correto é 1/(a − 1 − i), de acordo com a matriz e a solução final do próprio texto.',
    'No caso a = 1 + i, o texto termina em 0 = 2i. A demonstração conserva esse ponto de paragem.'
  ]}
];

export function parseExpression(source) {
  const text = String(source).replace(/−/g, '-');
  const tokens = text.match(/x\d+|\d+|[ai()+\-*/^]/g) || [];
  if (tokens.join('') !== text.replace(/\s/g, '')) throw new Error('Expressão da aula inválida.');
  let position = 0;
  const take = () => tokens[position++];
  function atom() {
    const token = take();
    if (token === '(') {
      const value = sum();
      if (take() !== ')') throw new Error('Parênteses em falta.');
      return {type: 'group', value};
    }
    if (!token || !/^(\d+|a|i|x\d+)$/.test(token)) throw new Error('Termo da aula inválido.');
    return {type: 'atom', value: token};
  }
  function power() {
    let value = atom();
    if (tokens[position] === '^') { take(); value = {type: 'binary', operator: '^', left: value, right: unary()}; }
    return value;
  }
  function unary() {
    if (tokens[position] === '-' || tokens[position] === '+') return {type: 'unary', operator: take(), value: unary()};
    return power();
  }
  function product() {
    let value = unary();
    while (tokens[position] === '*' || tokens[position] === '/') value = {type: 'binary', operator: take(), left: value, right: unary()};
    return value;
  }
  function sum() {
    let value = product();
    while (tokens[position] === '+' || tokens[position] === '-') value = {type: 'binary', operator: take(), left: value, right: product()};
    return value;
  }
  const result = sum();
  if (position !== tokens.length) throw new Error('Expressão da aula incompleta.');
  return result;
}

function expressionMathML(node, ungroup = false) {
  if (node.type === 'atom') {
    if (/^x\d+$/.test(node.value)) return `<msub><mi>x</mi><mn>${node.value.slice(1)}</mn></msub>`;
    return /^\d+$/.test(node.value) ? `<mn>${node.value}</mn>` : `<mi>${node.value}</mi>`;
  }
  if (node.type === 'group') return ungroup ? expressionMathML(node.value) : `<mrow><mo>(</mo>${expressionMathML(node.value)}<mo>)</mo></mrow>`;
  if (node.type === 'unary') return `<mrow><mo>${node.operator === '-' ? '−' : '+'}</mo>${expressionMathML(node.value)}</mrow>`;
  if (node.operator === '/') return `<mfrac>${expressionMathML(node.left, true)}${expressionMathML(node.right, true)}</mfrac>`;
  if (node.operator === '^') return `<msup>${expressionMathML(node.left)}${expressionMathML(node.right)}</msup>`;
  return `<mrow>${expressionMathML(node.left)}<mo>${node.operator === '*' ? '·' : node.operator === '-' ? '−' : '+'}</mo>${expressionMathML(node.right)}</mrow>`;
}

export function lectureMath(source) {
  return `<math class="lecture-math" xmlns="http://www.w3.org/1998/Math/MathML">${expressionMathML(parseExpression(source))}</math>`;
}

const add = (target, source, factor, column) => ({type: 'add', target, source, factor, column});
const scale = (target, factor, column) => ({type: 'scale', target, factor, column});
const swap = (target, source, column) => ({type: 'swap', target, source, column});

function stepDescription(operation) {
  if (operation.type === 'swap') return `Troca as linhas ${operation.target + 1} e ${operation.source + 1}, como no exemplo.`;
  if (operation.type === 'scale') return `Normaliza o pivô da linha ${operation.target + 1}, coluna ${operation.column + 1}.`;
  return `Anula o elemento na linha ${operation.target + 1}, coluna ${operation.column + 1}, usando a linha ${operation.source + 1}. Segue-se a ordem impressa no exemplo.`;
}

function timeline(initial) {
  const matrices = [initial.map(row => row.map(String))];
  const steps = [];
  return {
    matrices, steps,
    append(operation, replacement) {
      const previous = matrices[matrices.length - 1];
      let next;
      if (replacement) {
        next = previous.map((row, index) => index === operation.target ? replacement.map(String) : row.slice());
      } else next = serializeMatrix(applyOperation(matrixFrom(previous), operation));
      steps.push({
        operation,
        pivot: {row: operation.type === 'scale' ? operation.target : operation.source, column: operation.column},
        target: operation.type === 'scale' ? null : {row: operation.target, column: operation.column},
        reason: stepDescription(operation)
      });
      matrices.push(next);
    }
  };
}

function numericSolution(rows) {
  const matrix = matrixFrom(rows);
  const variables = rows[0].length - 1;
  const pivots = matrix.map(row => row.slice(0, variables).findIndex(value => !value.isZero)).filter(column => column >= 0);
  const free = Array.from({length: variables}, (_, index) => index).filter(index => !pivots.includes(index));
  if (matrix.some(row => row.slice(0, variables).every(value => value.isZero) && !row[variables].isZero)) return {type: 'none', pivots, free, expressions: []};
  const model = systemSolution(matrix);
  return {...model, expressions: model.expressions.map(expression => {
    let value = expression.constant.isZero ? '' : expression.constant.toString();
    expression.terms.forEach(({parameter, coefficient}) => {
      const negative = coefficient.n < 0n;
      const magnitude = negative ? coefficient.neg() : coefficient;
      value += negative ? '-' : value ? '+' : '';
      value += `${magnitude.equals(1) ? '' : `${magnitude}*`}x${model.free[parameter] + 1}`;
    });
    return value || '0';
  })};
}

export function buildLecture(exampleId = '1', caseId) {
  const example = LECTURE_EXAMPLES.find(item => item.id === String(exampleId)) || LECTURE_EXAMPLES[0];
  const selectedCase = example.cases.find(item => item.id === caseId) || example.cases[0];
  let path;
  let solution;
  if (example.id === '1') {
    path = timeline([[1, -1, 1, 1], [2, 0, -1, 3], [-1, 3, 0, 1]]);
    [add(1, 0, '-2', 0), add(2, 0, '1', 0), scale(1, '1/2', 1), add(0, 1, '1', 1), add(2, 1, '-2', 1), scale(2, '1/4', 2), add(0, 2, '1/2', 2), add(1, 2, '3/2', 2)].forEach(operation => path.append(operation));
  } else if (example.id === '2') {
    path = timeline([[1, 1, -1, 1], [2, 0, 1, 3], [1, -1, 2, 2]]);
    [add(1, 0, '-2', 0), add(2, 0, '-1', 0), scale(1, '-1/2', 1), add(0, 1, '-1', 1), add(2, 1, '2', 1)].forEach(operation => path.append(operation));
  } else if (example.id === '3') {
    path = timeline([[3, -6, 3, -3, 9, 18], [0, 0, 0, 1, -1, -2], [1, -2, 3, -1, 7, 8], [2, -4, 3, -1, 7, 11]]);
    [scale(0, '1/3', 0), add(2, 0, '-1', 0), add(3, 0, '-2', 0), swap(1, 2, 2), scale(1, '1/2', 2), add(0, 1, '-1', 2), add(3, 1, '-1', 2), add(0, 2, '1', 3), add(3, 2, '-1', 3)].forEach(operation => path.append(operation));
  } else if (example.id === '4') {
    path = timeline([[1, 1, 1, 1], [0, 1, -1, 2], [2, 0, 4, 0]]);
    [add(2, 0, '-2', 0), add(0, 1, '-1', 1), add(2, 1, '2', 1)].forEach(operation => path.append(operation));
  } else if (example.id === '5') {
    if (selectedCase.id !== 'general') {
      const a = selectedCase.id === 'positive' ? 2 : -2;
      path = timeline([[1, 1, 1, 2 * a], [1, 0, 2, 3], [0, 1, a * a - 5, 1]]);
      [add(1, 0, '-1', 0), scale(1, '-1', 1), add(0, 1, '-1', 1), add(2, 1, '-1', 1)].forEach(operation => path.append(operation));
    } else {
      path = timeline([[1, 1, 1, '2*a'], [1, 0, 2, 3], [0, 1, 'a^2-5', 1]]);
      path.append(add(1, 0, '-1', 0), [0, -1, 1, '3-2*a']);
      path.append(scale(1, '-1', 1), [0, 1, -1, '2*a-3']);
      path.append(add(0, 1, '-1', 1), [1, 0, 2, 3]);
      path.append(add(2, 1, '-1', 1), [0, 0, 'a^2-4', '4-2*a']);
      path.append(scale(2, '1/(a^2-4)', 2), [0, 0, 1, '-2/(a+2)']);
      path.append(add(0, 2, '-2', 2), [1, 0, 0, '(3*a+10)/(a+2)']);
      path.append(add(1, 2, '1', 2), [0, 1, 0, '(2*a^2+a-8)/(a+2)']);
      solution = {type: 'unique', pivots: [0, 1, 2], free: [], expressions: ['(3*a+10)/(a+2)', '(2*a^2+a-8)/(a+2)', '-2/(a+2)']};
    }
  } else {
    const general = selectedCase.id === 'general';
    const impossible = selectedCase.id === 'plus';
    path = timeline([[1, '-1+i', '3+2*i', 1], [0, 'i', 2, 0], ['i', '-1-i', general ? 'a^2-2*a+3*i' : '-2+3*i', general ? 'a-1+2*i' : impossible ? '3*i' : 'i']]);
    path.append(add(2, 0, '-i', 0), [0, 0, general ? 'a^2-2*a+2' : 0, general ? 'a-1+i' : impossible ? '2*i' : 0]);
    path.append(scale(1, '1/i', 1), [0, 1, '-2*i', 0]);
    path.append(add(0, 1, '-(-1+i)', 1), [1, 0, 1, 1]);
    if (general) {
      path.append(scale(2, '1/(a^2-2*a+2)', 2), [0, 0, 1, '1/(a-1-i)']);
      path.append(add(0, 2, '-1', 2), [1, 0, 0, '(a-2-i)/(a-1-i)']);
      path.append(add(1, 2, '2*i', 2), [0, 1, 0, '(2*i)/(a-1-i)']);
      solution = {type: 'unique', pivots: [0, 1, 2], free: [], expressions: ['(a-2-i)/(a-1-i)', '(2*i)/(a-1-i)', '1/(a-1-i)']};
    } else solution = {type: impossible ? 'none' : 'infinite', pivots: [0, 1], free: [2], expressions: impossible ? [] : ['1-x3', '2*i*x3', 'x3']};
  }
  return {...example, selectedCase, domain: example.id === '6' ? 'ℂ' : 'ℝ', matrices: path.matrices, steps: path.steps, solution: solution || numericSolution(path.matrices[path.matrices.length - 1])};
}

export function lectureOperation(operation) {
  const row = index => `<span class="variable-symbol">L<sub>${index + 1}</sub></span>`;
  const target = row(operation.target);
  if (operation.type === 'swap') return `${target} ↔ ${row(operation.source)}`;
  if (operation.type === 'scale') return `${target} ← ${lectureMath(operation.factor)} · ${target}`;
  const negative = operation.factor.startsWith('-');
  const magnitude = negative ? operation.factor.slice(1) : operation.factor;
  return `${target} ← ${target} ${negative ? '−' : '+'} ${magnitude === '1' ? '' : `${lectureMath(magnitude)} · `}${row(operation.source)}`;
}
