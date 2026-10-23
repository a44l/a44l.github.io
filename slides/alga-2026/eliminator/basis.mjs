import {Fraction, matrixFrom, serializeMatrix, sameMatrix, applyOperation, nextHint, rrefStatus, LEVELS} from './math.mjs';
import {independenceShapes, validIndependenceShape} from './independence.mjs';

export const BASIS_MODE = {name: 'Bases e coordenadas'};
export const BASIS_TASKS = {find: 'Achar coordenadas', expand: 'Reconstruir o elemento', change: 'Mudar de base'};
export const BASIS_FORMATS = {numeric: 'Numérico', symbolic: 'Simbólico'};
export const identityMatrix = n => matrixFrom(Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => +(i === j))));
export const multiplyMatrices = (a, b) => a.map(row => b[0].map((_, j) => row.reduce((sum, value, k) => sum.add(value.mul(b[k][j])), Fraction.from(0))));
export const basisPart = matrix => matrix.map(row => row.slice(0, matrix.length));
export const basisStatus = matrix => rrefStatus(basisPart(matrix));
export const nextBasisHint = matrix => nextHint(basisPart(matrix));
export const rightPart = matrix => matrix.map(row => row.slice(matrix.length));

export function reduceBasisMatrix(matrix) {
  let current = matrix;
  for (let i = 0; i < 150; i++) {
    const hint = nextBasisHint(current);
    if (!hint) {
      if (!sameMatrix(basisPart(current), identityMatrix(matrix.length))) throw new Error('A família indicada não é uma base.');
      return current;
    }
    current = applyOperation(current, hint.operation);
  }
  throw new Error('A redução não terminou.');
}

export const inverseMatrix = matrix => rightPart(reduceBasisMatrix(matrix.map((row, i) => row.concat(identityMatrix(matrix.length)[i]))));

export function makeBasisExercise({representation = 'vectors', shape, task = 'find', format = 'numeric', basis, second = null, given}) {
  const n = basis.length;
  const b = matrixFrom(basis);
  const c = second && matrixFrom(second);
  const input = matrixFrom(given);
  const target = task === 'find' ? input : multiplyMatrices(b, input);
  const solveBasis = task === 'change' ? c : b;
  if (!solveBasis) throw new Error('Falta a base de chegada.');
  return {representation, shape: shape.slice(), basisTask: task, basisFormat: format, basisExercise: {basis: b, second: c, given: input}, original: solveBasis.map((row, i) => row.concat(target[i]))};
}

export function basisAnswer(exercise) {
  return exercise.basisTask === 'expand' ? multiplyMatrices(exercise.basisExercise.basis, exercise.basisExercise.given) : rightPart(reduceBasisMatrix(exercise.original));
}

export function checkBasisAnswer(exercise, entries, phase = 'answer') {
  const expected = phase === 'weights' ? exercise.basisExercise.given : basisAnswer(exercise);
  if (!Array.isArray(entries) || entries.length !== expected.length || entries.some((row, i) => !Array.isArray(row) || row.length !== expected[i].length)) return {correct: false, message: 'Preenche todas as componentes pedidas.'};
  const parsed = [];
  for (let i = 0; i < expected.length; i++) {
    const row = [];
    for (let j = 0; j < expected[i].length; j++) {
      try { row.push(Fraction.from(entries[i][j])); }
      catch (_) { return {correct: false, invalid: [{row: i, column: j}], message: 'Preenche os campos com inteiros ou frações. O denominador não pode ser zero.'}; }
    }
    parsed.push(row);
  }
  const invalid = [];
  parsed.forEach((row, i) => row.forEach((value, j) => { if (!value.equals(expected[i][j])) invalid.push({row: i, column: j}); }));
  if (!invalid.length) return {correct: true};
  const given = exercise.basisExercise.given;
  const message = phase === 'weights' ? 'Associa cada coordenada ao elemento da base que ocupa a mesma posição. Conserva a ordem indicada no enunciado.' : exercise.basisTask === 'change' && sameMatrix(parsed, given) ? 'Introduz as coordenadas na base c. Os valores que escreveste são os da base b.' : exercise.basisTask === 'expand' ? 'Revê os produtos e a soma das parcelas. O resultado pedido é o elemento escrito nas coordenadas canónicas.' : 'Revê a redução e os coeficientes. A ordem dos elementos da base determina a ordem das coordenadas.';
  return {correct: false, invalid, message};
}

export function expansionSum(exercise, count) {
  const {basis, given} = exercise.basisExercise;
  return basis.map(row => given[0].map((_, j) => row.reduce((sum, value, k) => k < count ? sum.add(value.mul(given[k][j])) : sum, Fraction.from(0))));
}

export function serializeBasisExercise(exercise) {
  const {basis, second, given} = exercise.basisExercise;
  return {basis: serializeMatrix(basis), second: second && serializeMatrix(second), given: serializeMatrix(given)};
}

export function restoreBasisExercise(saved) {
  try {
    const {level, representation, shape, basisTask: task, basisFormat: format, basisExercise: meta} = saved;
    if (!LEVELS[level] || !validIndependenceShape(level, representation, shape) || !BASIS_TASKS[task] || !BASIS_FORMATS[format] || !meta) return null;
    const n = shape.reduce((a, b) => a * b, 1);
    const p = format === 'numeric' ? 1 : n;
    const valid = (matrix, columns) => Array.isArray(matrix) && matrix.length === n && matrix.every(row => Array.isArray(row) && row.length === columns && row.every(value => typeof value === 'string' && value.length <= 64));
    if (!valid(meta.basis, n) || !valid(meta.given, p) || task === 'change' && !valid(meta.second, n)) return null;
    const exercise = makeBasisExercise({representation, shape, task, format, ...meta});
    const within = matrix => matrix.every(row => row.every(value => value.d === 1n && Math.abs(Number(value.n)) <= LEVELS[level].bound));
    if (!within(exercise.basisExercise.basis) || task === 'change' && !within(exercise.basisExercise.second)) return null;
    inverseMatrix(exercise.basisExercise.basis);
    if (task === 'change') inverseMatrix(exercise.basisExercise.second);
    return exercise;
  } catch (_) { return null; }
}

function randomUnimodular(n, bound, inverseBound, random) {
  let a = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => +(i === j)));
  let inv = a.map(row => row.slice());
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  for (let step = 0; step < 12 * n; step++) {
    const target = integer(0, n - 1);
    const source = (target + integer(1, n - 1)) % n;
    const factor = random() < 0.5 ? -1 : 1;
    const next = a.map(row => row.slice());
    const nextInverse = inv.map(row => row.slice());
    if (random() < 0.5) {
      next[target] = a[target].map((value, j) => value + factor * a[source][j]);
      nextInverse.forEach((row, i) => { row[source] = inv[i][source] - factor * inv[i][target]; });
    } else {
      next.forEach((row, i) => { row[target] = a[i][target] + factor * a[i][source]; });
      nextInverse[source] = inv[source].map((value, j) => value - factor * inv[target][j]);
    }
    if (next.every(row => row.every(value => Math.abs(value) <= bound)) && nextInverse.every(row => row.every(value => Math.abs(value) <= inverseBound))) { a = next; inv = nextInverse; }
  }
  return a;
}

function manageable(exercise, level) {
  const n = exercise.original.length;
  const entryBound = level === 'first' ? 48n : level === 'standard' ? 128n : 256n;
  const answerBound = level === 'first' ? 12n : level === 'standard' ? 24n : 48n;
  const initialBound = level === 'first' ? 12n : level === 'standard' ? 18n : 24n;
  const small = (matrix, bound) => matrix.every(row => row.every(value => (value.n < 0n ? -value.n : value.n) <= bound && value.d <= 24n));
  if (!small(rightPart(exercise.original), initialBound)) return false;
  if (!small(basisAnswer(exercise), answerBound)) return false;
  let matrix = exercise.original;
  for (let step = 0; step < n * (n + 2) + 1; step++) {
    if (!small(matrix, entryBound)) return false;
    const hint = nextBasisHint(matrix);
    if (!hint) return true;
    matrix = applyOperation(matrix, hint.operation);
  }
  return false;
}

export function generateBasisExercise(level = 'first', random = Math.random, options = {}) {
  const {representation = 'vectors', task = 'find', format = 'numeric'} = options;
  if (!LEVELS[level] || !BASIS_TASKS[task] || !BASIS_FORMATS[format]) throw new Error('A configuração do exercício não é válida.');
  const pick = list => list[Math.floor(random() * list.length)];
  const integer = (min, max) => min + Math.floor(random() * (max - min + 1));
  const shape = options.shape || pick(independenceShapes(level, representation));
  if (!validIndependenceShape(level, representation, shape)) throw new Error('A forma não pertence ao nível escolhido.');
  const n = shape.reduce((a, b) => a * b, 1);
  // Estas escolhas permanecem fixas durante as rejeições: a dimensão e o tipo
  // de pergunta não são condicionados pela facilidade de construir um exemplo.
  const kind = format === 'symbolic' ? 'symbolic' : options.kind || pick(['zero', 'fractional', 'fractional', 'fractional', 'dense', 'dense', 'dense', 'dense', 'dense', 'sparse']);
  if (!['zero', 'fractional', 'dense', 'sparse', 'symbolic'].includes(kind)) throw new Error('O tipo de valores não é válido.');
  const permutationOnly = task === 'change' && (options.permutationOnly === undefined ? random() < 0.25 : options.permutationOnly);
  const bound = LEVELS[level].bound;
  const order = Array.from({length: n}, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = integer(0, i); [order[i], order[j]] = [order[j], order[i]]; }
  const targetOrder = Array.from({length: n}, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = integer(0, i); [targetOrder[i], targetOrder[j]] = [targetOrder[j], targetOrder[i]]; }
  if (targetOrder.every((value, i) => value === i)) targetOrder.push(targetOrder.shift());
  const symbolicGiven = () => identityMatrix(n).map((_, i) => Array.from({length: n}, (_, j) => Fraction.from(+(order[i] === j))));
  const coefficients = () => {
    const entries = Array.from({length: n}, () => kind === 'zero' || kind === 'sparse' ? 0 : integer(-2, 2));
    if (kind === 'sparse') entries[integer(0, n - 1)] = pick([-2, -1, 1, 2]);
    if (kind !== 'zero' && entries.every(value => value === 0)) entries[0] = 1;
    return entries;
  };
  const finish = (basis, second, given) => makeBasisExercise({representation, shape, task, format, basis, second, given});
  for (let attempt = 0; attempt < 40; attempt++) {
    const q = randomUnimodular(n, Math.max(1, Math.floor(bound / 2)), level === 'first' ? 3 : 5, random);
    if (q.every(row => row.filter(value => value !== 0).length === 1)) continue;
    const scales = Array.from({length: n}, () => random() < 0.25 && kind !== 'zero' ? 2 : 1);
    if (kind === 'fractional' && task === 'find') scales[0] = 2;
    const basis = q.map(row => row.map((value, i) => value * scales[i]));
    let second = null;
    if (task === 'change') {
      second = basis.map(row => targetOrder.map(i => row[i]));
      if (!permutationOnly) {
        let mixed = false;
        for (let step = 0; step < 4 * n; step++) {
          const target = integer(0, n - 1);
          const source = (target + integer(1, n - 1)) % n;
          const factor = random() < 0.5 ? -1 : 1;
          const candidate = second.map(row => row.map((value, i) => i === target ? value + factor * row[source] : value));
          if (candidate.every(row => row.every(value => Math.abs(value) <= bound))) { second = candidate; mixed = true; }
        }
        if (!mixed || second.every((row, i) => row.every((value, j) => value === basis[i][j]))) continue;
        if (kind === 'fractional') {
          const column = Array.from({length: n}, (_, i) => i).find(j => second.every(row => Math.abs(row[j] * 2) <= bound));
          if (column === undefined) continue;
          second = second.map(row => row.map((value, i) => value * (i === column ? 2 : 1)));
        }
      }
    }
    let given;
    if (format === 'symbolic') given = symbolicGiven();
    else {
      const values = coefficients();
      if (task === 'find') {
        if (kind === 'fractional') values[0] = pick([-1, 1]);
        given = multiplyMatrices(matrixFrom(q), matrixFrom(values.map(value => [value])));
      } else {
        given = matrixFrom(values.map(value => [value]));
        if (task === 'expand' && kind === 'fractional') given[0][0] = Fraction.from('1/2');
        if (task === 'change' && permutationOnly && kind === 'fractional') given[0][0] = Fraction.from('1/2');
      }
    }
    const exercise = finish(basis, second, given);
    if (kind === 'fractional' && task !== 'expand' && !permutationOnly && basisAnswer(exercise).every(row => row.every(value => value.d === 1n))) continue;
    if (!manageable(exercise, level)) continue;
    return exercise;
  }
  // Construção de segurança: triangular unimodular, inversa pequena e uma
  // mudança de base explícita. Conserva tarefa, forma, dimensão e tipo sorteados.
  const q = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => +(i === j || i === j + 1)));
  const basis = q.map(row => row.map((value, i) => value * (kind === 'fractional' && task === 'find' && i === 0 ? 2 : 1)));
  let second = null;
  if (task === 'change') {
    if (permutationOnly) second = basis.map(row => targetOrder.map(i => row[i]));
    else second = basis.map(row => row.map((value, j) => j === 1 ? (value + row[0]) * (kind === 'fractional' ? 2 : 1) : value));
  }
  const simple = Array.from({length: n}, (_, i) => [kind === 'zero' ? 0 : kind === 'sparse' ? +(i === 0) : 1]);
  let given = format === 'symbolic' ? symbolicGiven() : matrixFrom(simple);
  if (format === 'numeric' && task === 'find') given = multiplyMatrices(matrixFrom(q), given);
  if (format === 'numeric' && task === 'expand' && kind === 'fractional') given[0][0] = Fraction.from('1/2');
  if (format === 'numeric' && task === 'change' && permutationOnly && kind === 'fractional') given[0][0] = Fraction.from('1/2');
  if (format === 'numeric' && task === 'change' && kind === 'fractional' && !permutationOnly) given = matrixFrom(Array.from({length: n}, (_, i) => [+(i === 1)]));
  return finish(basis, second, given);
}
