import {Fraction, matrixFrom, serializeMatrix, sameMatrix, LEVELS, nextHint, applyOperation, systemSolution} from './math.mjs';
import {matrixRank, reduceMatrix} from './dual.mjs';
import {generateBasisExercise, identityMatrix} from './basis.mjs';
import {independenceShapes, validIndependenceShape} from './independence.mjs';

export const SUBSPACES_MODE = {name: 'Soma e interseção'};
export const SUBSPACES_CASES = ['complementary', 'direct_proper', 'overlap_full', 'overlap_proper'];
const transpose = vectors => vectors[0].map((_, i) => vectors.map(vector => vector[i]));

export function makeSubspacesExercise({representation = 'vectors', shape, left, right, ambient, ambientKind = 'full'}) {
  const u = matrixFrom(left);
  const v = matrixFrom(right);
  const e = matrixFrom(ambient);
  return {representation, shape: shape.slice(), subspacesAmbient: ambientKind, subspacesExercise: {left: u, right: v, ambient: e}, original: transpose(u.concat(v.map(vector => vector.map(value => value.neg()))))};
}

export function subspacesDimensions(exercise) {
  const {left, right, ambient} = exercise.subspacesExercise;
  const first = matrixRank(left);
  const second = matrixRank(right);
  const sum = matrixRank(left.concat(right));
  const intersection = first + second - sum;
  return {ambient: ambient.length, left: first, right: second, sum, intersection, direct: intersection === 0, spans: sum === ambient.length, complementary: intersection === 0 && sum === ambient.length};
}

export function subspacesModel(exercise, reduced = null) {
  const {left, right} = exercise.subspacesExercise;
  const matrix = reduced || reduceMatrix(exercise.original);
  const pivots = matrix.map(row => row.findIndex(value => !value.isZero)).filter(index => index >= 0);
  const original = left.concat(right);
  const sumBasis = pivots.map(column => original[column]);
  const kernel = systemSolution(matrix.map(row => row.concat(Fraction.from(0))));
  const intersectionBasis = [];
  const relations = kernel.free.map((_, parameter) => {
    const coefficients = kernel.expressions.map(expression => {
      const term = expression.terms.find(value => value.parameter === parameter);
      return term ? term.coefficient : Fraction.from(0);
    });
    const alpha = coefficients.slice(0, left.length);
    const beta = coefficients.slice(left.length);
    const image = exercise.original.map((_, i) => alpha.reduce((value, coefficient, j) => value.add(coefficient.mul(left[j][i])), Fraction.from(0)));
    const kept = matrixRank(intersectionBasis.concat([image])) > intersectionBasis.length;
    if (kept) intersectionBasis.push(image);
    return {alpha, beta, image, kept, freeColumn: kernel.free[parameter]};
  });
  return {pivots, freeColumns: kernel.free, sumBasis, intersectionBasis, relations, ...subspacesDimensions(exercise)};
}

export function checkSubspaceBasis(exercise, entries, target = 'sum', kind = 'basis') {
  if (!['sum', 'intersection'].includes(target)) return {correct: false, message: 'Escolhe a soma ou a interseção.'};
  const dimensions = subspacesDimensions(exercise);
  const expected = dimensions[target];
  if (kind === 'zero') return {correct: expected === 0, message: expected === 0 ? '' : 'Este subespaço não se reduz ao elemento nulo. Procura uma base não vazia.'};
  const n = exercise.original.length;
  if (kind !== 'basis' || !Array.isArray(entries) || entries.length > n || entries.some(row => !Array.isArray(row) || row.length !== n)) return {correct: false, message: 'Cada elemento da base deve ter todas as entradas.'};
  const vectors = [];
  for (let i = 0; i < entries.length; i++) {
    const vector = [];
    for (let j = 0; j < n; j++) {
      try { vector.push(Fraction.from(entries[i][j])); }
      catch (_) { return {correct: false, invalid: {row: i, column: j}, message: 'Preenche todas as entradas com inteiros ou frações. O denominador não pode ser zero.'}; }
    }
    vectors.push(vector);
  }
  if (!expected) return vectors.length === 0 ? {correct: true} : {correct: false, message: 'A interseção é {0}. A sua base é a família vazia, não uma família que contém o elemento nulo. Escolhe «Interseção = {0}».'};
  if (vectors.length !== expected) return {correct: false, message: `A ${target === 'sum' ? 'soma' : 'interseção'} tem dimensão ${expected}. Uma base deve ter ${expected} ${expected === 1 ? 'elemento' : 'elementos'}.`};
  const {left, right} = exercise.subspacesExercise;
  const families = target === 'sum' ? [[left.concat(right), dimensions.sum, 'à soma E₁ + E₂']] : [[left, dimensions.left, 'a E₁'], [right, dimensions.right, 'a E₂']];
  for (let i = 0; i < vectors.length; i++) for (const [family, rank, name] of families) {
    if (matrixRank(family.concat([vectors[i]])) > rank) return {correct: false, invalidRow: i, message: `O elemento ${i + 1} não pertence ${name}. ${target === 'intersection' ? 'Cada elemento da interseção tem de pertencer aos dois subespaços.' : 'Revê a combinação dos geradores originais.'}`};
  }
  if (matrixRank(vectors) !== expected) return {correct: false, message: 'A família indicada é linearmente dependente. Remove o elemento nulo e os elementos redundantes; o número certo de elementos não basta para formar uma base.'};
  return {correct: true};
}

export function checkSubspacesClassification(exercise, choices) {
  const model = subspacesDimensions(exercise);
  const questions = ['direct', 'spans', 'complementary'];
  if (!choices || questions.some(key => !['yes', 'no'].includes(choices[key]))) return {correct: false, message: 'Responde às três perguntas.'};
  if ((choices.direct === 'yes') !== model.direct) return {correct: false, question: 'direct', message: `A soma é direta se e só se E₁ ∩ E₂ = {0}. Neste exercício, dim(E₁ ∩ E₂) = ${model.intersection}.`};
  if ((choices.spans === 'yes') !== model.spans) return {correct: false, question: 'spans', message: `Compara dim(E₁ + E₂) = ${model.sum} com dim E = ${model.ambient}.`};
  if ((choices.complementary === 'yes') !== model.complementary) return {correct: false, question: 'complementary', message: 'São suplementares em E quando a soma é direta e também igual a E. É preciso verificar as duas condições.'};
  return {correct: true};
}

export function serializeSubspacesExercise(exercise) {
  const {left, right, ambient} = exercise.subspacesExercise;
  return {left: serializeMatrix(left), right: serializeMatrix(right), ambient: serializeMatrix(ambient)};
}

export function restoreSubspacesExercise(saved) {
  try {
    const {level, representation, shape, subspacesAmbient: ambientKind, subspacesExercise: meta} = saved;
    if (!LEVELS[level] || !validIndependenceShape(level, representation, shape) || !['full', 'nested'].includes(ambientKind) || !meta) return null;
    const n = shape.reduce((a, b) => a * b, 1);
    const valid = rows => Array.isArray(rows) && rows.length >= 1 && rows.length <= n && rows.every(row => Array.isArray(row) && row.length === n && row.every(value => typeof value === 'string' && /^-?\d$/.test(value)));
    if (!valid(meta.left) || !valid(meta.right) || !valid(meta.ambient)) return null;
    const exercise = makeSubspacesExercise({representation, shape, ambientKind, ...meta});
    const {left, right, ambient} = exercise.subspacesExercise;
    if (left.concat(right, ambient).some(row => row.some(value => Math.abs(Number(value.n)) > LEVELS[level].bound))) return null;
    const d = matrixRank(ambient);
    if (d !== ambient.length || d < 2 || matrixRank(ambient.concat(left, right)) !== d || matrixRank(left.concat(right)) < 1) return null;
    if (ambientKind === 'full' ? !sameMatrix(ambient, identityMatrix(n)) : d >= n) return null;
    return exercise;
  } catch (_) { return null; }
}

function buildFromBasis(basis, plan, random = null) {
  const {representation, shape, ambientKind, dimension: d, intersectionDimension: k, leftDimension: r1, sumDimension: s, redundant, bound} = plan;
  const n = basis.length;
  const columns = transpose(basis);
  const first = columns.slice(0, r1).map(row => row.slice());
  const second = columns.slice(0, k).concat(columns.slice(r1, s)).map(row => row.slice());
  const ambient = ambientKind === 'full' ? identityMatrix(n) : columns.slice(0, d).map(row => row.slice());
  const families = [first, second];
  for (let family = 0; family < 3; family++) {
    const vectors = family < 2 ? families[family] : ambient;
    if (random && (family < 2 || ambientKind === 'nested')) {
      for (let step = 0; vectors.length > 1 && step < vectors.length * 5; step++) {
        const target = Math.floor(random() * vectors.length);
        const source = (target + 1 + Math.floor(random() * (vectors.length - 1))) % vectors.length;
        const factor = Fraction.from(random() < 0.5 ? -1 : 1);
        const candidate = vectors[target].map((value, i) => value.add(factor.mul(vectors[source][i])));
        if (candidate.every(value => Math.abs(Number(value.n)) <= bound)) vectors[target] = candidate;
      }
    }
    if (family < 2) {
      if (!vectors.length) vectors.push(Array.from({length: n}, () => Fraction.from(0)));
      else if (redundant[family]) {
        let extra = vectors[0].map((value, i) => vectors.length > 1 ? value.add(vectors[1][i]) : value.neg());
        if (extra.some(value => Math.abs(Number(value.n)) > bound)) extra = vectors[0].map(value => value.neg());
        vectors.push(extra);
      }
      if (random) for (let i = vectors.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [vectors[i], vectors[j]] = [vectors[j], vectors[i]]; }
    }
  }
  return makeSubspacesExercise({representation, shape, left: first, right: second, ambient, ambientKind});
}

function manageable(exercise, level) {
  const bound = level === 'first' ? 48n : level === 'standard' ? 128n : 256n;
  let matrix = exercise.original;
  for (let step = 0; step < 150; step++) {
    if (matrix.some(row => row.some(value => (value.n < 0n ? -value.n : value.n) > bound || value.d > 24n))) return false;
    const hint = nextHint(matrix);
    if (!hint) {
      const answerBound = level === 'first' ? 12n : level === 'standard' ? 24n : 48n;
      return subspacesModel(exercise, matrix).intersectionBasis.every(row => row.every(value => (value.n < 0n ? -value.n : value.n) <= answerBound && value.d <= 24n));
    }
    matrix = applyOperation(matrix, hint.operation);
  }
  return false;
}

export function generateSubspacesExercise(level = 'first', random = Math.random, options = {}) {
  const {representation = 'vectors', ambientKind = 'full'} = options;
  if (!LEVELS[level] || !['full', 'nested'].includes(ambientKind) || !['vectors', 'polynomials', 'matrices'].includes(representation)) throw new Error('A configuração do exercício não é válida.');
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  const shapes = independenceShapes(level, representation).filter(shape => ambientKind === 'full' || shape.reduce((a, b) => a * b, 1) >= 3);
  const shape = options.shape || shapes[integer(0, shapes.length - 1)];
  if (!validIndependenceShape(level, representation, shape)) throw new Error('A forma não pertence ao nível escolhido.');
  const n = shape.reduce((a, b) => a * b, 1);
  if (ambientKind === 'nested' && n < 3) throw new Error('São necessárias pelo menos três coordenadas.');
  const d = ambientKind === 'full' ? n : options.dimension === undefined ? integer(2, n - 1) : options.dimension;
  const kind = options.kind || SUBSPACES_CASES[integer(0, 3)];
  if (!SUBSPACES_CASES.includes(kind) || !Number.isInteger(d) || d < 2 || d > n || ambientKind === 'nested' && d >= n) throw new Error('As dimensões ou o tipo de par não são válidos.');
  // Quatro casos equiprováveis, escolhidos antes das rejeições. As escolhas
  // de dimensão, interseção e redundância também permanecem fixas.
  const full = kind === 'complementary' || kind === 'overlap_full';
  const direct = kind === 'complementary' || kind === 'direct_proper';
  const s = full ? d : direct && d > 2 ? integer(2, d - 1) : integer(1, d - 1);
  const k = direct ? 0 : integer(1, s);
  const r1 = k + (direct && s > 1 ? integer(1, s - 1) : integer(0, s - k));
  const r2 = s + k - r1;
  const redundant = [r1, r2].map(rank => rank > 0 && rank < n && (options.redundant === undefined ? random() < 0.3 : !!options.redundant));
  const plan = {representation, shape, ambientKind, dimension: d, sumDimension: s, intersectionDimension: k, leftDimension: r1, redundant, bound: LEVELS[level].bound};
  for (let attempt = 0; attempt < 24; attempt++) {
    const basis = generateBasisExercise(level, random, {representation, shape, kind: 'dense'}).basisExercise.basis;
    const exercise = buildFromBasis(basis, plan, random);
    if (manageable(exercise, level)) return exercise;
  }
  return makeSubspacesFallback(plan);
}

export function makeSubspacesFallback(plan) {
  const n = plan.shape.reduce((a, b) => a * b, 1);
  // Base densa, unimodular e limitada: subtrair a primeira linha às demais
  // dá uma matriz triangular com diagonal unitária. Mesmo em dimensão 1,
  // os subespaços construídos têm geradores densos.
  const basis = matrixFrom(Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => 1 + +(i === j && i > 0))));
  return buildFromBasis(basis, plan);
}
