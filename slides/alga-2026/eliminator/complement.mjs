import {Fraction, matrixFrom, serializeMatrix, sameMatrix, LEVELS, nextHint, applyOperation} from './math.mjs';
import {matrixRank, reduceMatrix} from './dual.mjs';
import {generateBasisExercise, identityMatrix} from './basis.mjs';
import {independenceShapes, validIndependenceShape} from './independence.mjs';

export const COMPLEMENT_MODE = {name: 'Espaços suplementares'};
export const COMPLEMENT_AMBIENTS = {full: 'Espaço todo', nested: 'Dentro de um subespaço'};
const transpose = vectors => vectors[0].map((_, i) => vectors.map(vector => vector[i]));

export function makeComplementExercise({representation = 'vectors', shape, subspace, ambient, ambientKind = 'full'}) {
  const u = matrixFrom(subspace);
  const e = matrixFrom(ambient);
  return {representation, shape: shape.slice(), complementAmbient: ambientKind, complementExercise: {subspace: u, ambient: e}, original: transpose(u.concat(e))};
}

export function complementModel(exercise, reduced = null) {
  const {subspace, ambient} = exercise.complementExercise;
  const matrix = reduced || reduceMatrix(exercise.original);
  const pivots = matrix.map(row => row.findIndex(value => !value.isZero)).filter(index => index >= 0);
  const retained = pivots.filter(index => index < subspace.length);
  const added = pivots.filter(index => index >= subspace.length);
  return {dimension: ambient.length, subspaceDimension: retained.length, complementDimension: added.length, retained, added, subspaceBasis: retained.map(index => subspace[index]), first: added.map(index => ambient[index - subspace.length])};
}

export function complementAnswers(exercise, reduced = null) {
  const model = complementModel(exercise, reduced);
  const second = model.first.map(vector => vector.slice());
  // Mudar um representante pela soma com um vetor não nulo de E₁ mantém
  // a independência módulo E₁, mas altera o subespaço suplementar.
  second[0] = second[0].map((value, i) => value.add(model.subspaceBasis[0][i]));
  return [model.first, second];
}

export function checkComplementBasis(exercise, entries, first = null) {
  const {subspace, ambient} = exercise.complementExercise;
  const n = exercise.original.length;
  const r = matrixRank(subspace);
  const d = ambient.length;
  const k = d - r;
  if (!Array.isArray(entries) || entries.length > n || entries.some(row => !Array.isArray(row) || row.length !== n)) return {correct: false, message: 'Cada elemento da base deve ter todas as suas coordenadas.'};
  const vectors = [];
  for (let i = 0; i < entries.length; i++) {
    const vector = [];
    for (let j = 0; j < n; j++) {
      try { vector.push(Fraction.from(entries[i][j])); }
      catch (_) { return {correct: false, invalid: {row: i, column: j}, message: 'Preenche todas as entradas com inteiros ou frações. O denominador não pode ser zero.'}; }
    }
    vectors.push(vector);
  }
  if (vectors.length !== k) return {correct: false, message: `Um suplementar de E₁ em E tem dimensão ${d} − ${r} = ${k}. A sua base deve ter ${k} ${k === 1 ? 'elemento' : 'elementos'}.`};
  for (let i = 0; i < vectors.length; i++) {
    if (matrixRank(ambient.concat([vectors[i]])) > d) return {correct: false, invalidRow: i, message: `O elemento ${i + 1} não pertence a E. O suplementar procurado tem de estar contido em E.`};
  }
  if (matrixRank(vectors) !== k) return {correct: false, message: 'Os elementos indicados são linearmente dependentes. Uma base não pode conter o elemento nulo nem elementos redundantes.'};
  if (matrixRank(subspace.concat(vectors)) !== d) return {correct: false, message: 'O subespaço gerado tem interseção não nula com E₁. Estas bases não completam E: é necessário E = E₁ ⊕ F.'};
  if (first) {
    const previous = matrixFrom(first);
    if (matrixRank(previous.concat(vectors)) === k) return {correct: false, message: 'Esta é outra base do mesmo suplementar. Procura um subespaço diferente; trocar a ordem ou multiplicar elementos por escalares não muda o subespaço gerado. Podes somar um vetor não nulo de E₁ a um dos elementos da primeira base.'};
  }
  return {correct: true, dimension: d, subspaceDimension: r, complementDimension: k};
}

export function serializeComplementExercise(exercise) {
  return {subspace: serializeMatrix(exercise.complementExercise.subspace), ambient: serializeMatrix(exercise.complementExercise.ambient)};
}

export function restoreComplementExercise(saved) {
  try {
    const {level, representation, shape, complementAmbient: ambientKind, complementExercise: meta} = saved;
    if (!LEVELS[level] || !validIndependenceShape(level, representation, shape) || !COMPLEMENT_AMBIENTS[ambientKind] || !meta) return null;
    const n = shape.reduce((a, b) => a * b, 1);
    const valid = rows => Array.isArray(rows) && rows.length >= 1 && rows.length <= n && rows.every(row => Array.isArray(row) && row.length === n && row.every(value => typeof value === 'string' && /^-?\d$/.test(value)));
    if (!valid(meta.subspace) || !valid(meta.ambient)) return null;
    const exercise = makeComplementExercise({representation, shape, ambientKind, ...meta});
    const {subspace, ambient} = exercise.complementExercise;
    if (subspace.concat(ambient).some(row => row.some(value => Math.abs(Number(value.n)) > LEVELS[level].bound))) return null;
    const d = matrixRank(ambient);
    const r = matrixRank(subspace);
    if (d !== ambient.length || r < 1 || r >= d || matrixRank(ambient.concat(subspace)) !== d) return null;
    if (ambientKind === 'full' ? !sameMatrix(ambient, identityMatrix(n)) : d < 2 || d >= n) return null;
    return exercise;
  } catch (_) { return null; }
}

function manageable(exercise, level) {
  const bound = level === 'first' ? 48n : level === 'standard' ? 128n : 256n;
  let matrix = exercise.original;
  for (let step = 0; step < 150; step++) {
    if (matrix.some(row => row.some(value => (value.n < 0n ? -value.n : value.n) > bound || value.d > 24n))) return false;
    const hint = nextHint(matrix);
    if (!hint) return true;
    matrix = applyOperation(matrix, hint.operation);
  }
  return false;
}

export function generateComplementExercise(level = 'first', random = Math.random, options = {}) {
  const {representation = 'vectors', ambientKind = 'full'} = options;
  if (!LEVELS[level] || !COMPLEMENT_AMBIENTS[ambientKind] || !['vectors', 'polynomials', 'matrices'].includes(representation)) throw new Error('A configuração do exercício não é válida.');
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  const shapes = independenceShapes(level, representation).filter(shape => ambientKind === 'full' || shape.reduce((a, b) => a * b, 1) >= 3);
  const shape = options.shape || shapes[integer(0, shapes.length - 1)];
  if (!validIndependenceShape(level, representation, shape)) throw new Error('A forma não pertence ao nível escolhido.');
  const n = shape.reduce((a, b) => a * b, 1);
  if (ambientKind === 'nested' && n < 3) throw new Error('São necessárias pelo menos três coordenadas para este exercício.');
  const d = ambientKind === 'full' ? n : options.dimension === undefined ? integer(2, n - 1) : options.dimension;
  const r = options.rank === undefined ? integer(1, d - 1) : options.rank;
  if (!Number.isInteger(d) || !Number.isInteger(r) || d < 2 || d > n || ambientKind === 'nested' && d >= n || r < 1 || r >= d) throw new Error('As dimensões não são válidas.');
  // Dimensões e redundância são sorteadas antes dos filtros e conservadas
  // mesmo quando é necessário usar a construção de segurança.
  const redundant = options.redundant === undefined ? random() < 0.3 : options.redundant;
  const bound = LEVELS[level].bound;
  const build = basis => {
    const columns = transpose(basis);
    let subspace = columns.slice(0, r).map(row => row.slice());
    let ambient = ambientKind === 'full' ? identityMatrix(n) : columns.slice(0, d).map(row => row.slice());
    if (ambientKind === 'nested') {
      // Misturar a base de E evita apresentar os geradores de E₁ como um
      // simples subconjunto visível dessa base.
      for (let step = 0; step < 3 * d; step++) {
        const target = integer(0, d - 1);
        const source = (target + integer(1, d - 1)) % d;
        const factor = Fraction.from(random() < 0.5 ? -1 : 1);
        const candidate = ambient[target].map((value, i) => value.add(factor.mul(ambient[source][i])));
        if (candidate.every(value => Math.abs(Number(value.n)) <= bound)) ambient[target] = candidate;
      }
    }
    if (redundant) {
      let extra = subspace[0].map((value, i) => r > 1 ? value.add(subspace[1][i]) : value.neg());
      if (extra.some(value => Math.abs(Number(value.n)) > bound)) extra = subspace[0].map(value => value.neg());
      subspace.push(extra);
    }
    for (let i = subspace.length - 1; i > 0; i--) { const j = integer(0, i); [subspace[i], subspace[j]] = [subspace[j], subspace[i]]; }
    return makeComplementExercise({representation, shape, subspace, ambient, ambientKind});
  };
  for (let attempt = 0; attempt < 24; attempt++) {
    const base = generateBasisExercise(level, random, {representation, shape, kind: 'dense'}).basisExercise.basis;
    const exercise = build(base);
    if (manageable(exercise, level)) return exercise;
  }
  return makeComplementFallback({representation, shape, ambientKind, dimension: d, rank: r, redundant});
}

export function makeComplementFallback({representation, shape, ambientKind, dimension: d, rank: r, redundant}) {
  const n = shape.reduce((a, b) => a * b, 1);
  const basis = matrixFrom(Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => +(i === j || i === j + 1))));
  // Não volta a misturar a alternativa: garante também limites nas etapas.
  const columns = transpose(basis);
  const subspace = columns.slice(0, r);
  if (redundant) subspace.push(subspace[0].map(value => value.neg()));
  const ambient = ambientKind === 'full' ? identityMatrix(n) : columns.slice(0, d);
  return makeComplementExercise({representation, shape, subspace, ambient, ambientKind});
}
