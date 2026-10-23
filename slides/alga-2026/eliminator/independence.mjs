import {Fraction, matrixFrom, applyOperation, nextHint, systemSolution, LEVELS} from './math.mjs';
import {reduceMatrix} from './dual.mjs';

export const INDEPENDENCE_MODE = {name: 'Independência linear'};
export const REPRESENTATIONS = {vectors: 'Vetores', polynomials: 'Polinómios', matrices: 'Matrizes'};
const SHAPES = {
  vectors: {first: [[2], [3]], standard: [[4], [5]], challenge: [[6], [7], [8]]},
  polynomials: {first: [[2], [3]], standard: [[3], [4], [5]], challenge: [[5], [6], [7], [8]]},
  matrices: {first: [[2, 2]], standard: [[2, 2], [2, 3], [3, 2]], challenge: [[2, 3], [3, 2], [2, 4], [4, 2]]}
};
const product = values => values.reduce((a, b) => a * b, 1);
export const familyColumns = matrix => matrix[0].length - 1;
// Para classificar uma família basta uma forma escalonada: os pivôs não
// precisam de ser 1 e podem existir entradas não nulas acima dos pivôs.
export function independenceEchelonStatus(matrix) {
  const pivotRows = matrix.map(row => row.slice(0, -1).findIndex(value => !value.isZero));
  let previous = -1, foundZero = false, zeroRowsLast = true, staircase = true;
  pivotRows.forEach(column => {
    if (column === -1) { foundZero = true; return; }
    if (foundZero) zeroRowsLast = false;
    if (column <= previous) staircase = false;
    previous = column;
  });
  const pivots = pivotRows.filter(column => column !== -1);
  const homogeneous = matrix.every(row => row[row.length - 1].isZero);
  return {complete: homogeneous && zeroRowsLast && staircase, zeroRowsLast, staircase, homogeneous, pivots, rank: pivots.length};
}
export const independenceShapes = (level, representation) => SHAPES[representation][level].map(shape => shape.slice());
export const validIndependenceShape = (level, representation, shape) => !!SHAPES[representation] && Array.isArray(shape) && SHAPES[representation][level].some(candidate => candidate.length === shape.length && candidate.every((value, i) => value === shape[i]));

function gcd(a, b) {
  a = a < 0n ? -a : a; b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
}

// Uma relação inteira primitiva é mais legível na demonstração. Não limita
// as respostas dos estudantes, que podem usar quaisquer frações exatas.
export function dependenceRelation(reduced) {
  const model = systemSolution(reduced);
  if (!model.free.length) return null;
  const values = model.expressions.map(expression => {
    const term = expression.terms.find(value => value.parameter === 0);
    return term ? term.coefficient : Fraction.from(0);
  });
  const denominator = values.reduce((lcm, value) => lcm / gcd(lcm, value.d) * value.d, 1n);
  let integers = values.map(value => value.n * (denominator / value.d));
  const divisor = integers.reduce(gcd, 0n);
  const sign = integers.find(value => value !== 0n) < 0n ? -1n : 1n;
  integers = integers.map(value => value / divisor * sign);
  return integers.map(value => new Fraction(value));
}

export function independenceModel(matrix) {
  const echelon = independenceEchelonStatus(matrix);
  if (echelon.complete) {
    const count = familyColumns(matrix);
    return {independent: echelon.rank === count, rank: echelon.rank, count, pivots: echelon.pivots, free: Array.from({length: count}, (_, i) => i).filter(i => !echelon.pivots.includes(i))};
  }
  const solution = systemSolution(reduceMatrix(matrix));
  return {independent: solution.rank === solution.variables, rank: solution.rank, count: solution.variables, pivots: solution.pivots, free: solution.free};
}

export function checkIndependence(original, choice, values = []) {
  if (!['independent', 'dependent'].includes(choice)) return {correct: false, message: 'Escolhe se a família é linearmente independente ou dependente.'};
  if (choice === 'independent') {
    const model = independenceModel(original);
    return model.independent ? {correct: true} : {correct: false, message: 'Há uma relação com coeficientes não todos nulos. Revê as colunas sem pivô e a tua classificação.'};
  }
  const coefficients = [];
  for (let i = 0; i < familyColumns(original); i++) {
    try { coefficients.push(Fraction.from(values[i] === undefined ? '' : values[i])); }
    catch (_) { return {correct: false, invalid: i, message: 'Preenche todos os coeficientes com inteiros ou frações. O denominador não pode ser zero.'}; }
  }
  if (coefficients.every(value => value.isZero)) return {correct: false, message: 'A relação trivial existe em qualquer família. Para provar dependência, pelo menos um coeficiente tem de ser diferente de zero.'};
  if (original.some(row => !row.slice(0, -1).reduce((sum, value, i) => sum.add(value.mul(coefficients[i])), Fraction.from(0)).isZero)) {
    return {correct: false, message: 'Estes coeficientes não dão o elemento nulo. Revê os sinais e os valores da relação.'};
  }
  return {correct: true};
}

function smallReduction(matrix, level) {
  let current = matrix;
  const limit = level === 'first' ? 32n : level === 'standard' ? 96n : 192n;
  for (let step = 0; step < 150; step++) {
    if (current.some(row => row.some(value => (value.n < 0n ? -value.n : value.n) > limit || value.d > 24n))) return false;
    const hint = nextHint(current);
    if (!hint) {
      const relation = dependenceRelation(current);
      const relationLimit = level === 'first' ? 12n : level === 'standard' ? 20n : 32n;
      return !relation || relation.every(value => (value.n < 0n ? -value.n : value.n) <= relationLimit);
    }
    current = applyOperation(current, hint.operation);
  }
  return false;
}

function proportional(a, b) {
  const first = a.findIndex(value => !value.isZero);
  if (first < 0) return true;
  return a.every((value, i) => value.mul(b[first]).equals(b[i].mul(a[first])));
}

export function generateIndependenceExercise(level = 'first', random = Math.random, options = {}) {
  if (!LEVELS[level]) throw new Error('O nível não é válido.');
  const representation = options.representation || 'vectors';
  if (!REPRESENTATIONS[representation]) throw new Error('Escolhe vetores, polinómios ou matrizes.');
  const pick = list => list[Math.floor(random() * list.length)];
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  // O resultado é escolhido primeiro: nenhuma tentativa ou alternativa o muda.
  const independent = options.independent === undefined ? random() < 0.5 : options.independent;
  if (typeof independent !== 'boolean') throw new Error('A classificação pedida não é válida.');
  const shape = options.shape || pick(SHAPES[representation][level]);
  if (!validIndependenceShape(level, representation, shape)) throw new Error('A forma não pertence ao nível escolhido.');
  const dimension = product(shape);
  const maximum = Math.min(8, dimension, level === 'first' ? 3 : level === 'standard' ? 5 : 8);
  let count = options.count;
  if (count === undefined) {
    // Casos por dimensão são uma minoria dos dependentes. Os restantes têm
    // dimensões idênticas às dos casos independentes e exigem análise efetiva.
    count = !independent && dimension < 8 && dimension + 1 <= (level === 'first' ? 3 : level === 'standard' ? 5 : 8) && random() < 0.2 ? dimension + 1 : integer(2, maximum);
    if (independent && level === 'first' && random() < 0.12) count = 1;
  }
  if (!Number.isInteger(count) || count < 1 || count > (level === 'first' ? 3 : level === 'standard' ? 5 : 8) || independent && count > dimension || !independent && count < 2) throw new Error('O número de elementos não é válido.');
  const style = independent ? 'general' : options.style || pick(['general', 'general', 'general', 'general', 'general', 'general', 'proportional', 'zero']);
  if (!['general', 'zero', 'proportional'].includes(style)) throw new Error('O tipo de família não é válido.');
  const maximumRank = Math.min(dimension, count - 1);
  const minimumRank = style === 'general' && maximumRank >= 2 ? 2 : 1;
  const rank = independent ? count : options.rank === undefined ? random() < 0.65 ? maximumRank : integer(minimumRank, maximumRank) : options.rank;
  if (!Number.isInteger(rank) || rank < 1 || rank > Math.min(dimension, count) || !independent && rank >= count) throw new Error('O posto não é válido.');
  const bound = LEVELS[level].bound;
  const withinBounds = matrix => matrix.every(row => row.every(value => value.d === 1n && (value.n < 0n ? -value.n : value.n) <= BigInt(bound)));
  const finish = matrix => {
    // A ordem dos objetos e das coordenadas não denuncia as colunas da base.
    const order = Array.from({length: count}, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = integer(0, i); [order[i], order[j]] = [order[j], order[i]];
    }
    return {original: matrix.map(row => order.map(i => row[i]).concat(Fraction.from(0))), representation, shape: shape.slice()};
  };
  for (let attempt = 0; attempt < 50; attempt++) {
    const seed = Array.from({length: dimension}, (_, row) => Array.from({length: count}, (_, column) => {
      if (row >= rank) return 0;
      if (column < rank) return row === column ? pick([1, 1, 2]) : 0;
      return integer(-2, 2);
    }));
    for (let column = rank; column < count; column++) if (seed.every(row => row[column] === 0)) seed[integer(0, rank - 1)][column] = 1;
    if (style === 'zero') seed.forEach(row => { row[count - 1] = 0; });
    if (style === 'proportional') seed.forEach(row => { row[count - 1] = -row[0]; });
    let matrix = matrixFrom(seed);
    const steps = (level === 'first' ? 8 : 12) * (dimension + count - rank);
    for (let step = 0; step < steps; step++) {
      const target = integer(0, dimension - 1);
      const source = (target + integer(1, dimension - 1)) % dimension;
      const candidate = applyOperation(matrix, {type: pick(['add', 'add', 'swap', 'scale']), target, source, factor: pick([-2, -1, 1, 2])});
      if (withinBounds(candidate)) matrix = candidate;
    }
    const columns = Array.from({length: count}, (_, i) => matrix.map(row => row[i]));
    if (columns.some((column, i) => column.every(value => value.isZero) && !(style === 'zero' && i === count - 1))) continue;
    if (matrix.some(row => row.every(value => value.isZero))) continue;
    const nonzero = matrix.reduce((sum, row) => sum + row.filter(value => !value.isZero).length, 0);
    if (nonzero < Math.ceil(dimension * (count - (style === 'zero' ? 1 : 0)) * 0.55)) continue;
    if (style === 'general' && rank >= 2 && columns.some((a, i) => columns.some((b, j) => j > i && proportional(a, b)))) continue;
    const exercise = finish(matrix);
    if (!smallReduction(exercise.original, level)) continue;
    return exercise;
  }
  // Alternativa limitada e do MESMO posto, tamanho, tipo e resultado sorteados.
  const combinations = [[1, 1], [1, -1], [1, 2], [2, 1], [1, -2], [2, -1]];
  const fallback = Array.from({length: dimension}, (_, row) => Array.from({length: count}, (_, column) => {
    const basis = i => 1 + (row % rank === i ? 1 : 0);
    if (column < rank) return basis(column);
    if (style === 'zero' && column === count - 1) return 0;
    if (style === 'proportional' && column === count - 1) return -basis(0);
    if (rank === 1) return (column % 2 ? -1 : 1) * basis(0);
    const coefficients = combinations[column - rank];
    return coefficients[0] * basis(0) + coefficients[1] * basis(1);
  }));
  return finish(matrixFrom(fallback));
}
