import {Fraction, generateExercise, LEVELS, rrefStatus, nextHint, applyOperation, systemSolution} from './math.mjs';

export const DUAL_MODE = {name: 'Problema dual', description: 'Encontra equações homogéneas cujo conjunto-solução seja o subespaço gerado pelos vetores dados.'};

export function reduceMatrix(matrix) {
  let result = matrix.map(row => row.slice());
  for (;;) {
    const hint = nextHint(result);
    if (!hint) return result;
    result = applyOperation(result, hint.operation);
  }
}

export const matrixRank = matrix => matrix.length ? reduceMatrix(matrix).filter(row => row.some(value => !value.isZero)).length : 0;

// Cada gerador é uma linha de B. As soluções de Bc = 0 são os vetores
// de coeficientes das equações c₁x₁ + … + cₙxₙ = 0 válidas em U.
export const dualMatrix = generators => generators.map(row => row.map(Fraction.from).concat(Fraction.from(0)));
export const coordinateCount = augmented => augmented[0].length - 1;
export const generatorCount = augmented => augmented.length;
export const generatorPart = augmented => augmented.map(row => row.slice(0, -1));
export const dualStatus = augmented => rrefStatus(generatorPart(augmented));
export const nextDualHint = augmented => nextHint(generatorPart(augmented));

export function dualEquations(augmented) {
  if (!dualStatus(augmented).complete) throw new Error('Reduz primeiro a matriz dos geradores.');
  const model = systemSolution(augmented);
  // Para cada coeficiente livre: 1 nessa posição e 0 nos restantes livres.
  // Cada vetor da base do núcleo será uma linha do sistema que define U.
  return model.free.map((_, parameter) => model.expressions.map(expression => {
    const term = expression.terms.find(value => value.parameter === parameter);
    return term ? term.coefficient : Fraction.from(0);
  }));
}

export function generateDualExercise(level = 'first', random = Math.random, options = {}) {
  // O gerador existente escolhe n e o posto uniformemente, sem posto zero.
  const square = generateExercise(level, random, {...options, mode: 'matrix'});
  const n = square.length;
  const reduced = reduceMatrix(square);
  const pivots = reduced.map(row => row.findIndex(value => !value.isZero)).filter(index => index >= 0);
  const maximum = Math.min(8, n + 1);
  const m = pivots.length + Math.floor(random() * (maximum - pivots.length + 1));
  const columns = pivots.slice();
  const remaining = Array.from({length: n}, (_, i) => i).filter(i => !columns.includes(i));
  while (columns.length < Math.min(n, m)) columns.push(remaining.splice(Math.floor(random() * remaining.length), 1)[0]);
  let generators = square.map(row => columns.map(i => row[i]));
  if (m > n) {
    const first = Math.floor(random() * n);
    const second = (first + 1 + Math.floor(random() * (n - 1))) % n;
    let extra = square.map(row => row[first].add(row[second].neg()));
    if (extra.every(value => value.isZero) || extra.some(value => Math.abs(Number(value.n)) > LEVELS[level].bound)) extra = square.map(row => row[first].neg());
    generators = generators.map((row, i) => row.concat(extra[i]));
  }
  for (let i = m - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    generators.forEach(row => { [row[i], row[j]] = [row[j], row[i]]; });
  }
  return dualMatrix(Array.from({length: m}, (_, column) => generators.map(row => row[column])));
}

// C define exatamente U quando BCᵀ = 0 e posto(C) = n − posto(B).
// A segunda condição impede aceitar equações que apenas contêm U.
export function checkDualEquations(original, entries) {
  const n = coordinateCount(original);
  if (!Array.isArray(entries) || entries.length > n || entries.some(row => !Array.isArray(row) || row.length !== n)) {
    return {correct: false, message: 'Cada equação deve ter um coeficiente para cada coordenada de x.'};
  }
  const equations = [];
  for (let i = 0; i < entries.length; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      try { row.push(Fraction.from(entries[i][j])); }
      catch (_) { return {correct: false, invalid: {row: i, column: j}, message: 'Preenche todos os coeficientes com inteiros ou frações. O denominador não pode ser zero.'}; }
    }
    equations.push(row);
  }
  const generators = generatorPart(original);
  const m = generatorCount(original);
  for (let i = 0; i < equations.length; i++) for (let j = 0; j < m; j++) {
    const value = equations[i].reduce((sum, coefficient, k) => sum.add(coefficient.mul(generators[j][k])), Fraction.from(0));
    if (!value.isZero) return {correct: false, invalidRow: i, message: `A equação ${i + 1} não é satisfeita pelo gerador u${j + 1}. Revê os coeficientes e os sinais.`};
  }
  const dimension = matrixRank(generators);
  if (matrixRank(equations) !== n - dimension) return {correct: false, message: 'Estas equações ainda admitem vetores fora de U. Falta uma condição independente; repetir uma equação não acrescenta uma condição.'};
  return {correct: true, dimension, codimension: n - dimension, message: 'Correto. O conjunto-solução destas equações é exatamente U.'};
}
