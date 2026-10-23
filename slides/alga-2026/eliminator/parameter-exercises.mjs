import {Fraction, nextHint, applyOperation, systemSolution} from './math.mjs';
import {matrixRank} from './dual.mjs';
import {ParameterFraction as P, polynomial, multiplyPolynomial, parameterReduction} from './parameter-math.mjs';

export const PARAMETER_TOPICS = ['system', 'combination', 'dual', 'independence', 'basis', 'complement', 'subspaces'];
export const PARAMETER_TITLE = {system: 'Sistemas com parâmetro', combination: 'Combinações com parâmetro', dual: 'Geradores com parâmetro', independence: 'Independência com parâmetro', basis: 'Bases com parâmetro', complement: 'Suplementares com parâmetro', subspaces: 'Soma e interseção com parâmetro'};
const transpose = matrix => matrix[0].map((_, j) => matrix.map(row => row[j]));
const choose = (random, list) => list[Math.floor(random() * list.length)];
export function seededRandom(seed) {
  let value = seed >>> 0;
  return () => { value += 0x6D2B79F5; let t = value; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const numeric = (vectors, a) => vectors.map(vector => vector.map(value => value.evaluate(a)));
const zeros = n => Array.from({length: n}, () => P.from(0));
const yes = value => value ? 'yes' : 'no';

// Construção por blocos, em vez de aceitar matrizes simbólicas ao acaso:
// só um pivô pode depender de a, e o seu polinómio tem grau no máximo 2.
// Uma transformação constante invertível disfarça o bloco sem mudar os casos.
export function generateParameterExercise(topic = 'independence', level = 'first', seed = Math.floor(Math.random() * 4294967296), options = {}) {
  if (!PARAMETER_TOPICS.includes(topic)) throw new Error('Tema inválido.');
  if (!['first', 'standard', 'challenge'].includes(level)) throw new Error('Nível inválido.');
  const random = seededRandom(seed);
  const representation = options.representation || choose(random, ['vectors', 'polynomials', 'matrices']);
  if (!['vectors', 'polynomials', 'matrices'].includes(representation)) throw new Error('Representação inválida.');
  const n = representation === 'matrices' ? 4 : level === 'first' ? 2 : 3;
  const kind = options.kind || (level === 'first' ? 'linear' : choose(random, level === 'challenge' ? ['distinct', 'distinct', 'repeated', 'positive'] : ['linear', 'distinct', 'distinct', 'repeated', 'positive']));
  const r1 = choose(random, [-2, -1, 0, 1, 2]);
  let roots = kind === 'positive' ? [] : kind === 'distinct' ? [r1, choose(random, [-2, -1, 0, 1, 2].filter(v => v !== r1))].sort((a, b) => a - b) : [r1];
  let p = kind === 'positive' ? polynomial([choose(random, [1, 2, 4]), 0, 1]) : polynomial([-r1, 1]);
  if (kind === 'distinct') p = multiplyPolynomial(polynomial([-roots[0], 1]), polynomial([-roots[1], 1]));
  if (kind === 'repeated') p = multiplyPolynomial(p, p);
  const scalar = P.from(p);
  const transform = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => P.from(i === j ? choose(random, [-1, 1]) : i > j ? choose(random, [-2, -1, 1, 2]) : 0)));
  const axes = transpose(transform);
  const map = vector => transform.map(row => row.reduce((sum, entry, j) => sum.add(entry.mul(vector[j])), P.from(0)));
  const basic = Array.from({length: n}, (_, i) => {
    const vector = zeros(n); vector[i] = i === n - 1 ? scalar : P.from(1);
    if (i === n - 1) for (let j = 0; j < n - 1; j++) vector[j] = P.from(choose(random, [-1, 0, 1]));
    return map(vector);
  });
  const exercise = {topic, level, seed: seed >>> 0, representation, n, kind, roots, p, family: basic, homogeneous: topic === 'system' && (options.homogeneous === undefined ? random() < .5 : options.homogeneous)};
  if (topic === 'system' || topic === 'combination') {
    const rhs = zeros(n);
    if (!exercise.homogeneous) {
      rhs[0] = P.from(choose(random, [-2, -1, 1, 2]));
      const compatibility = options.compatibility || choose(random, ['never', 'always', 'mixed']);
      rhs[n - 1] = compatibility === 'always' ? P.from(0) : compatibility === 'mixed' && roots.length ? new P([-roots[0], 1]) : P.from(1);
    }
    exercise.target = map(rhs);
  }
  if (topic === 'complement') {
    const split = choose(random, Array.from({length: n - 1}, (_, i) => i + 1));
    exercise.left = axes.slice(0, split).map((vector, i) => i === split - 1 ? vector.map(value => value.mul(scalar)) : vector);
    exercise.right = axes.slice(split);
    exercise.other = exercise.right.map((vector, i) => i === 0 ? vector.map((value, j) => value.add(exercise.left[split - 1][j])) : vector);
    exercise.family = exercise.left.concat(exercise.right);
    // Constantes antes da coluna dependente do parâmetro.
    exercise.proof = transpose(exercise.left.slice(0, -1).concat(exercise.right, [exercise.left[split - 1]]));
  }
  if (topic === 'subspaces') {
    const split = choose(random, Array.from({length: n - 1}, (_, i) => i + 1));
    const pattern = options.pattern || choose(random, ['meet', 'collapse', 'only_roots']);
    exercise.pattern = pattern;
    exercise.left = axes.slice(0, split);
    const moving = (pattern === 'only_roots' ? axes[split - 1] : axes[split]).map(value => value.mul(scalar));
    if (pattern === 'meet') moving.forEach((value, j) => { moving[j] = value.add(axes[split - 1][j]); });
    exercise.right = pattern === 'only_roots' ? axes.slice(split).concat([moving]) : [moving].concat(axes.slice(split + 1));
    exercise.family = exercise.left.concat(exercise.right);
    exercise.proof = transpose(pattern === 'only_roots' ? exercise.right : exercise.family);
  }
  if (!exercise.proof) exercise.proof = topic === 'dual' ? basic.map(vector => vector.concat(P.from(0))) : transpose(basic).map((row, i) => ['system', 'combination'].includes(topic) ? row.concat(exercise.target[i]) : row);
  exercise.frames = parameterReduction(exercise.proof);
  return exercise;
}

export function parameterCase(exercise, a) {
  const {topic, n} = exercise;
  const family = numeric(exercise.family, a);
  const rank = matrixRank(family);
  if (topic === 'system') {
    const augmented = transpose(family).map((row, i) => row.concat(exercise.target[i].evaluate(a)));
    const model = systemSolution(reduceNumeric(augmented).slice(-1)[0].matrix);
    return {kind: model.type};
  }
  if (topic === 'combination') return {exists: yes(matrixRank(family.concat([exercise.target.map(value => value.evaluate(a))])) === rank)};
  if (topic === 'independence') return {independent: yes(rank === family.length)};
  if (topic === 'basis') return {basis: yes(rank === n)};
  if (topic === 'dual') return {dimension: String(rank), equations: String(n - rank)};
  const left = numeric(exercise.left, a), right = numeric(exercise.right, a);
  const leftRank = matrixRank(left), rightRank = matrixRank(right), sum = matrixRank(left.concat(right));
  if (topic === 'complement') {
    const other = numeric(exercise.other, a);
    const valid = leftRank + rightRank === n && sum === n && matrixRank(other) + leftRank === n && matrixRank(left.concat(other)) === n && matrixRank(right.concat(other)) > rightRank;
    return {valid: yes(valid)};
  }
  const intersection = leftRank + rightRank - sum;
  return {sum: String(sum), intersection: String(intersection), direct: yes(intersection === 0), spans: yes(sum === n), complementary: yes(intersection === 0 && sum === n)};
}
export function generalParameterValue(exercise) { let a = 0; while (exercise.roots.includes(a)) a++; return a; }
export function parameterCases(exercise) {
  return [{id: 'general', value: null, answer: parameterCase(exercise, generalParameterValue(exercise))}].concat(exercise.roots.map((value, i) => ({id: `root${i}`, value, answer: parameterCase(exercise, value)})));
}
export function reduceNumeric(matrix) {
  const frames = [{matrix, operation: null}];
  for (let i = 0; i < 150; i++) {
    const hint = nextHint(matrix);
    if (!hint) return frames;
    matrix = applyOperation(matrix, hint.operation);
    frames.push({matrix, operation: hint.operation});
  }
  throw new Error('Redução demasiado longa.');
}
export function exceptionalReduction(exercise, a) { return reduceNumeric(numeric(exercise.proof, a)); }
export function checkParameterRoots(exercise, text, none = false) {
  if (none) return {correct: exercise.roots.length === 0, message: 'O polinómio tem pelo menos uma raiz real. Indica os valores críticos.'};
  if (typeof text !== 'string' || !text.trim()) return {correct: false, message: 'Indica as raízes ou escolhe «Não há raízes reais».'};
  try {
    const entries = text.split(/[;,\s]+/).filter(Boolean).map(Fraction.from);
    const unique = entries.filter((value, i) => entries.findIndex(v => v.equals(value)) === i);
    return {correct: unique.length === exercise.roots.length && exercise.roots.every(root => unique.some(value => value.equals(root))), message: 'Revê as raízes reais do polinómio. Escreve cada valor uma só vez; a ordem não importa.'};
  } catch (_) { return {correct: false, message: 'Usa inteiros ou frações, separados por ponto e vírgula. Exemplo: −1; 2.'}; }
}
export function checkParameterCases(exercise, answers) {
  for (const item of parameterCases(exercise)) for (const key of Object.keys(item.answer)) {
    if (!answers[item.id] || answers[item.id][key] !== item.answer[key]) return {correct: false, caseId: item.id, key, message: !answers[item.id] || answers[item.id][key] === undefined ? 'Responde a todas as perguntas em cada caso.' : 'Revê este caso. Substitui o valor na matriz inicial; não uses uma divisão por zero da redução geral.'};
  }
  return {correct: true};
}
export const parameterQuestions = exercise => {
  const binary = [['yes', 'Sim'], ['no', 'Não']];
  const dimension = Array.from({length: exercise.n + 1}, (_, i) => [String(i), String(i)]);
  return ({system: [['kind', 'Quantas soluções tem o sistema?', [['unique', 'Uma'], ['infinite', 'Infinitas'], ['none', 'Nenhuma']]]], combination: [['exists', 'u é combinação linear da família?', binary]], independence: [['independent', 'A família é linearmente independente?', binary]], basis: [['basis', 'A família é uma base de E?', binary]], dual: [['dimension', 'Qual é a dimensão de U?', dimension], ['equations', 'Quantas equações independentes definem U?', dimension]], complement: [['valid', 'F e H são dois suplementares diferentes de E₁ em E?', binary]], subspaces: [['sum', 'dim(E₁ + E₂)', dimension], ['intersection', 'dim(E₁ ∩ E₂)', dimension], ['direct', 'A soma é direta?', binary], ['spans', 'A soma é igual a E?', binary], ['complementary', 'E₁ e E₂ são suplementares em E?', binary]]})[exercise.topic];
};
