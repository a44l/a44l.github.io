// Toda a aritmética usa inteiros de precisão arbitrária e frações reduzidas.
const abs = value => value < 0n ? -value : value;

function gcd(a, b) {
  a = abs(a);
  b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

export class Fraction {
  constructor(numerator, denominator = 1n) {
    let n = BigInt(numerator);
    let d = BigInt(denominator);
    if (d === 0n) throw new Error('O denominador não pode ser zero.');
    if (d < 0n) { n = -n; d = -d; }
    const divisor = gcd(n, d);
    this.n = n / divisor;
    this.d = d / divisor;
    Object.freeze(this);
  }

  static from(value) {
    if (value instanceof Fraction) return value;
    if (typeof value === 'bigint' || typeof value === 'number') return new Fraction(value);
    const match = String(value).trim().replace(/−/g, '-').match(/^([+-]?\d+)(?:\s*\/\s*([+-]?\d+))?$/);
    if (!match) throw new Error('Escreve um inteiro ou uma fração, por exemplo −2 ou 1/3.');
    return new Fraction(match[1], match[2] === undefined ? 1n : match[2]);
  }

  add(value) { const b = Fraction.from(value); return new Fraction(this.n * b.d + b.n * this.d, this.d * b.d); }
  mul(value) { const b = Fraction.from(value); return new Fraction(this.n * b.n, this.d * b.d); }
  neg() { return new Fraction(-this.n, this.d); }
  inverse() { return new Fraction(this.d, this.n); }
  equals(value) { const b = Fraction.from(value); return this.n === b.n && this.d === b.d; }
  get isZero() { return this.n === 0n; }
  toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
  toJSON() { return this.toString(); }
}

export const matrixFrom = rows => rows.map(row => row.map(value => Fraction.from(value)));
export const serializeMatrix = matrix => matrix.map(row => row.map(value => value.toString()));
export const sameMatrix = (a, b) => a.length === b.length && a.every((row, i) => row.length === b[i].length && row.every((value, j) => value.equals(b[i][j])));

export function applyOperation(matrix, operation) {
  const {type, target, source} = operation;
  const validRow = index => Number.isInteger(index) && index >= 0 && index < matrix.length;
  if (!validRow(target)) throw new Error('Escolhe uma linha válida.');
  if (type !== 'add' && type !== 'scale' && type !== 'swap') throw new Error('Escolhe uma operação válida.');
  if (type !== 'scale' && (!validRow(source) || target === source)) throw new Error('Escolhe duas linhas diferentes.');
  const result = matrix.map(row => row.slice());
  if (type === 'swap') {
    [result[target], result[source]] = [result[source], result[target]];
  } else {
    const factor = Fraction.from(operation.factor);
    if (type === 'scale' && factor.isZero) throw new Error('O multiplicador não pode ser zero: a operação tem de ser reversível.');
    result[target] = matrix[target].map((value, column) => type === 'scale'
      ? value.mul(factor)
      : value.add(matrix[source][column].mul(factor)));
  }
  return result;
}

export function rrefStatus(matrix) {
  const pivots = matrix.map(row => row.findIndex(value => !value.isZero));
  let foundZero = false;
  let previousPivot = -1;
  let zeroRowsLast = true;
  let staircase = true;
  let leadingOnes = true;
  let clearColumns = true;
  pivots.forEach((column, row) => {
    if (column === -1) { foundZero = true; return; }
    if (foundZero) zeroRowsLast = false;
    if (column <= previousPivot) staircase = false;
    previousPivot = column;
    if (!matrix[row][column].equals(1)) leadingOnes = false;
    if (!matrix.every((values, index) => index === row || values[column].isZero)) clearColumns = false;
  });
  return {zeroRowsLast, leadingOnes, staircase, clearColumns, complete: zeroRowsLast && leadingOnes && staircase && clearColumns};
}

export function nextHint(matrix) {
  let row = 0;
  for (let column = 0; column < matrix[0].length && row < matrix.length; column++) {
    let pivot = row;
    while (pivot < matrix.length && matrix[pivot][column].isZero) pivot++;
    if (pivot === matrix.length) continue;
    if (pivot !== row) return {
      operation: {type: 'swap', target: row, source: pivot},
      pivot: {row: pivot, column}, target: {row, column},
      reason: `Coloca um elemento não nulo na linha ${row + 1}, coluna ${column + 1}, para o usar como pivô.`
    };
    if (!matrix[row][column].equals(1)) return {
      operation: {type: 'scale', target: row, factor: matrix[row][column].inverse().toString()},
      pivot: {row, column}, target: null,
      reason: `Transforma o primeiro elemento não nulo da linha ${row + 1} em 1.`
    };
    // Diagrama da página 7: concluir a coluna antes de avançar o pivô.
    // Como nos exemplos da aula, percorrer as linhas de cima para baixo.
    for (let other = 0; other < matrix.length; other++) {
      if (other !== row && !matrix[other][column].isZero) return {
        operation: {type: 'add', target: other, source: row, factor: matrix[other][column].neg().toString()},
        pivot: {row, column}, target: {row: other, column},
        reason: `Usa a linha ${row + 1} para anular o elemento ${other > row ? 'abaixo' : 'acima'} do pivô, na linha ${other + 1}, coluna ${column + 1}.`
      };
    }
    row++;
  }
  return null;
}

export const LEVELS = {
  first: {name: 'Primeiros passos', sizes: [2, 3], bound: 4, scramble: 6},
  standard: {name: 'Intermédio', sizes: [4, 5], bound: 5, scramble: 10},
  challenge: {name: 'Desafio', sizes: [6, 7, 8], bound: 6, scramble: 14}
};

export const MODES = {
  matrix: {name: 'Matriz', description: 'Transforma a matriz na forma escalonada reduzida por linhas.'},
  homogeneous: {name: 'Sistema homogéneo', description: 'Reduz a matriz ampliada [A | 0] e determina as soluções de Ax = 0.'},
  inhomogeneous: {name: 'Sistema não homogéneo', description: 'Reduz a matriz ampliada [A | b] e determina as soluções de Ax = b, com b ≠ 0.'}
};

function manageable(matrix, level) {
  let current = matrix;
  const maxSteps = matrix.length * (matrix.length + 2);
  for (let step = 0; step <= maxSteps; step++) {
    if (current.some(row => row.some(value => abs(value.n) > (level === 'first' ? 32n : 96n) || value.d > 16n))) return false;
    const hint = nextHint(current);
    if (!hint) return step > 0;
    current = applyOperation(current, hint.operation);
  }
  return false;
}

export function generateExercise(level = 'first', random = Math.random, options = {}) {
  const config = LEVELS[level];
  if (!Object.keys(LEVELS).includes(level)) throw new Error('O nível de dificuldade não é válido.');
  const mode = options.mode || 'matrix';
  if (!Object.keys(MODES).includes(mode)) throw new Error('O tipo de exercício não é válido.');
  const pick = list => list[Math.floor(random() * list.length)];
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  const size = options.size === undefined ? pick(config.sizes) : options.size;
  if (!config.sizes.includes(size)) throw new Error('O tamanho não pertence ao nível escolhido.');
  // Sorteia uma única vez. Rejeições e alternativas mantêm este tamanho e posto,
  // preservando a distribuição uniforme em {1, …, n}, inclusive nos sistemas.
  const rank = integer(1, size);
  const inconsistent = mode === 'inhomogeneous' && rank < size && random() < 0.5;
  const augmented = mode !== 'matrix';
  const scrambleSteps = config.scramble * (2 * size - rank);
  const withinBounds = matrix => matrix.every(row => row.every(value => value.d === 1n && abs(value.n) <= BigInt(config.bound)));
  const sufficientlyMixed = matrix => {
    const nonzeroPerRow = matrix.map(row => row.slice(0, size).filter(value => !value.isZero).length);
    return nonzeroPerRow.every(count => count > 0) && nonzeroPerRow.reduce((sum, count) => sum + count, 0) >= Math.ceil(size * size * 0.6);
  };
  for (let attempt = 0; attempt < 60; attempt++) {
    const available = Array.from({length: size}, (_, index) => index);
    while (available.length > rank) available.splice(integer(0, available.length - 1), 1);
    const seed = Array.from({length: size}, (_, row) => Array.from({length: size}, (_, column) => {
      if (row >= rank) return 0;
      if (column === available[row]) return pick(level === 'first' ? [1, 1, 2] : [1, 1, 2, 3]);
      if (available.includes(column)) return 0;
      return integer(-2, 2);
    }));
    // Operações de linhas não preenchem uma coluna nula. Mantém cada coluna
    // livre presente na base, sem alterar as colunas que garantem o posto.
    for (let column = 0; column < size; column++) {
      if (seed.every(row => row[column] === 0)) seed[integer(0, rank - 1)][column] = pick([-2, -1, 1, 2]);
    }
    if (augmented) {
      const rhs = Array.from({length: size}, (_, row) => mode === 'inhomogeneous' && row < rank ? integer(-2, 2) : 0);
      if (mode === 'inhomogeneous' && rhs.every(value => value === 0)) rhs[integer(0, rank - 1)] = pick([-2, -1, 1, 2]);
      if (inconsistent) rhs[integer(rank, size - 1)] = pick([-2, -1, 1, 2]);
      seed.forEach((row, i) => row.push(rhs[i]));
    }
    let matrix = matrixFrom(seed);
    for (let step = 0; step < scrambleSteps; step++) {
      const target = integer(0, size - 1);
      const source = (target + integer(1, size - 1)) % size;
      const type = pick(['add', 'add', 'add', 'swap', 'scale']);
      const candidate = applyOperation(matrix, {type, target, source, factor: pick([-2, -1, 1, 2])});
      if (withinBounds(candidate)) matrix = candidate;
    }
    if (sufficientlyMixed(matrix) && manageable(matrix, level)) return matrix;
  }
  // Base densa de posto r: as primeiras r colunas formam I + J nas r
  // primeiras linhas; as restantes linhas repetem essas linhas independentes.
  const fallback = Array.from({length: size}, (_, row) => Array.from({length: size}, (_, column) => 1 + (column === row % rank ? 1 : 0)));
  if (augmented) fallback.forEach((row, i) => row.push(mode === 'inhomogeneous' ? row[0] + (inconsistent && i === rank ? 1 : 0) : 0));
  return matrixFrom(fallback);
}

export function systemSolution(matrix) {
  if (!rrefStatus(matrix).complete) throw new Error('Reduz primeiro a matriz ampliada.');
  const variables = matrix[0].length - 1;
  const pivotRows = matrix.map(row => row.slice(0, variables).findIndex(value => !value.isZero));
  const pivots = pivotRows.filter(column => column !== -1);
  const rank = pivots.length;
  const free = Array.from({length: variables}, (_, i) => i).filter(i => !pivotRows.includes(i));
  if (matrix.some((row, i) => pivotRows[i] === -1 && !row[variables].isZero)) return {type: 'none', rank, variables, pivots, free, expressions: []};
  const expressions = Array.from({length: variables}, (_, variable) => {
    const parameter = free.indexOf(variable);
    if (parameter !== -1) return {variable, constant: Fraction.from(0), terms: [{parameter, coefficient: Fraction.from(1)}]};
    const row = matrix[pivotRows.indexOf(variable)];
    return {variable, constant: row[variables], terms: free.map((column, i) => ({parameter: i, coefficient: row[column].neg()})).filter(term => !term.coefficient.isZero)};
  });
  return {type: free.length ? 'infinite' : 'unique', rank, variables, pivots, free, expressions};
}

export function checkDependentVariables(matrix, selected) {
  const expected = systemSolution(matrix).pivots;
  return Array.isArray(selected) && selected.length === expected.length && new Set(selected).size === selected.length && expected.every(variable => selected.includes(variable));
}

export function solutionFieldKeys(solution, kind) {
  if (kind === 'unique') return Array.from({length: solution.variables}, (_, variable) => `x${variable}.constant`);
  if (kind === 'infinite') return solution.pivots.reduce((keys, variable) => keys.concat(
    `x${variable}.constant`, solution.free.map((_, parameter) => `x${variable}.t${parameter}`)
  ), []);
  return [];
}

export function checkSolution(matrix, kind, values) {
  const solution = systemSolution(matrix);
  if (!['none', 'unique', 'infinite'].includes(kind)) return {correct: false, message: 'Escolhe primeiro o tipo de conjunto-solução.'};
  if (kind !== solution.type) return {correct: false, message: 'Revê o tipo de solução: verifica as linhas nulas, os termos independentes e as variáveis livres.'};
  if (kind === 'none') return {correct: true, message: 'Correto. O sistema não tem solução.'};
  const expected = {};
  solution.expressions.forEach(expression => {
    if (kind === 'infinite' && solution.free.includes(expression.variable)) return;
    expected[`x${expression.variable}.constant`] = expression.constant;
    if (kind === 'infinite') solution.free.forEach((_, parameter) => {
      const term = expression.terms.find(item => item.parameter === parameter);
      expected[`x${expression.variable}.t${parameter}`] = term ? term.coefficient : Fraction.from(0);
    });
  });
  const incorrect = [];
  for (const key of Object.keys(expected)) {
    try {
      if (!Fraction.from(values[key] === undefined ? '' : values[key]).equals(expected[key])) incorrect.push(key);
    } catch (_) {
      return {correct: false, message: 'Preenche todos os campos com inteiros ou frações. O denominador não pode ser zero.', invalid: [key]};
    }
  }
  return incorrect.length ? {correct: false, message: 'Há valores incorretos. Isola cada variável dependente e verifica os sinais dos coeficientes.', invalid: incorrect}
    : {correct: true, message: 'O conjunto-solução está correto.'};
}

export function operationText(operation) {
  const target = `L${operation.target + 1}`;
  const source = `L${operation.source + 1}`;
  if (operation.type === 'swap') return `${target} ↔ ${source}`;
  const factor = Fraction.from(operation.factor);
  const number = factor.toString().replace('-', '−');
  if (operation.type === 'scale') return `${target} ← (${number}) × ${target}`;
  const magnitude = new Fraction(abs(factor.n), factor.d);
  const multiple = magnitude.equals(1) ? '' : `${magnitude.toString()} × `;
  return `${target} ← ${target} ${factor.n < 0n ? '−' : '+'} ${multiple}${source}`;
}

export function operationDescription(operation) {
  if (operation.type === 'swap') return `Trocar as linhas ${operation.target + 1} e ${operation.source + 1}`;
  if (operation.type === 'scale') return `Multiplicar a linha ${operation.target + 1} por ${operation.factor}`;
  return `Somar ${operation.factor} vezes a linha ${operation.source + 1} à linha ${operation.target + 1}`;
}
