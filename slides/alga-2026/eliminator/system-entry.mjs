import {Fraction} from './math.mjs';
import {ParameterFraction, parseParameterPolynomial} from './parameter-math.mjs';

const supported = ['combination', 'dual', 'independence', 'basis', 'complement', 'subspaces'];
const variable = (symbol, index) => ({symbol, index: index + 1});
function coordinate(exercise, row) {
  if (exercise.representation === 'polynomials') return row ? `coeficiente de X${row > 1 ? `^${row}` : ''}` : 'termo constante';
  if (exercise.representation === 'matrices') return `entrada (${Math.floor(row / exercise.shape[1]) + 1}, ${row % exercise.shape[1] + 1})`;
  return `coordenada ${row + 1}`;
}

// A mesma ordem do enunciado determina a posição de cada campo. No problema
// dual os objetos são linhas; no teste de independência são colunas.
export function systemEntryPlan(exercise) {
  if (!supported.includes(exercise.mode) || exercise.mode === 'basis' && exercise.basisTask === 'expand') return null;
  const matrix = exercise.original;
  const n = matrix.length, columns = matrix[0].length;
  const fields = [];
  function field(i, j, term, side, negate = false) {
    const key = `${i}:${j}`;
    const value = {key, row: i, column: j, term, side, expected: negate ? matrix[i][j].neg() : matrix[i][j]};
    const coord = coordinate(exercise, exercise.mode === 'dual' ? j : i);
    value.context = exercise.mode === 'dual' ? `Revê, no gerador u${i + 1}, o valor correspondente a «${coord}». Cada gerador fornece uma equação.` : exercise.mode === 'subspaces' && negate ? `Revê, em v${j - exercise.subspacesExercise.left.length + 1}, o valor correspondente a «${coord}». Nesta equação, os geradores de E₂ estão no segundo membro.` : side === 'right' && exercise.mode !== 'subspaces' ? `Revê o segundo membro da equação correspondente a «${coord}».` : `Revê o valor correspondente a «${coord}» no elemento associado a este coeficiente. Conserva a ordem dos elementos do enunciado.`;
    fields.push(value);
    return value;
  }
  const rows = matrix.map((row, i) => {
    let split = columns - 1, symbol = exercise.mode === 'dual' ? 'c' : exercise.mode === 'basis' ? 'λ' : 'α';
    if (exercise.mode === 'basis') split = n;
    if (exercise.mode === 'subspaces') split = exercise.subspacesExercise.left.length;
    if (exercise.mode === 'complement') split = columns;
    const left = row.slice(0, split).map((_, j) => field(i, j, variable(symbol, j), 'left'));
    const right = row.slice(split).map((_, k) => {
      const term = exercise.mode === 'subspaces' ? variable('β', k) : exercise.mode === 'basis' && exercise.basisFormat === 'symbolic' ? {symbol: n <= 3 ? ['x', 'y', 'z'][k] : 'x', index: n <= 3 ? null : k + 1} : null;
      return field(i, split + k, term, 'right', exercise.mode === 'subspaces');
    });
    return {label: exercise.mode === 'dual' ? `Gerador u${i + 1}` : coordinate(exercise, i), left, right};
  });
  const objectSymbol = exercise.representation === 'polynomials' ? 'p' : exercise.representation === 'matrices' ? 'M' : 'u';
  const descriptions = {
    combination: 'Escreve α₁u₁ + ⋯ + αₙuₙ = u em coordenadas. Cada elemento dado fornece uma coluna de coeficientes; u fornece o segundo membro.',
    independence: `Escreve α₁${objectSymbol}₁ + ⋯ + αₘ${objectSymbol}ₘ = 0 em coordenadas. Conserva a ordem dos elementos e inclui os coeficientes nulos.`,
    dual: 'Escreve uma equação por gerador: o produto das suas coordenadas pelos coeficientes c₁, …, cₙ deve ser zero. Os geradores ficam nas linhas.',
    basis: exercise.basisTask === 'change' ? 'Escreve o elemento usando os dados na base b e iguala-o à combinação dos elementos da base c. As incógnitas λ são as coordenadas na base c.' : 'Iguala a combinação dos elementos da base b ao elemento dado. As incógnitas λ são as coordenadas na base b.',
    complement: 'Completa a matriz de prolongamento: primeiro os geradores de E₁, depois os elementos da base de E. Cada elemento ocupa uma coluna.',
    subspaces: 'Para encontrar elementos comuns, escreve Uα = Vβ. Os geradores de E₁ ficam no primeiro membro e os de E₂ no segundo. Na matriz de eliminação, passamos os termos de V para o primeiro membro.'
  };
  const headings = exercise.mode === 'complement' ? Array.from({length: columns}, (_, j) => j < exercise.complementExercise.subspace.length ? variable('u', j) : variable('e', j - exercise.complementExercise.subspace.length)) : [];
  return {matrix: exercise.mode === 'complement', rows, fields, headings, title: exercise.mode === 'complement' ? 'Completa a matriz a partir dos geradores' : 'Escreve o sistema a partir dos dados', description: descriptions[exercise.mode]};
}

export function checkSystemEntryValue(value, expected, settled = false) {
  if (typeof value !== 'string' || !value.trim()) return {status: settled ? 'missing' : 'empty', message: 'Falta preencher este coeficiente, mesmo que seja zero.'};
  if (!settled && /^[+-]?(?:\d+\s*\/\s*[+-]?)?$/.test(value.trim().replace(/−/g, '-'))) return {status: 'pending', message: 'Completa o número ou a fração.'};
  try { return Fraction.from(value).equals(expected) ? {status: 'correct', message: 'Coeficiente correto.'} : {status: 'wrong', message: 'Este coeficiente não corresponde aos dados do enunciado.'}; }
  catch (_) { return {status: 'invalid', message: 'Usa um inteiro ou uma fração com denominador diferente de zero.'}; }
}
export function checkSystemEntry(plan, entries, checkValue = checkSystemEntryValue) {
  const incorrect = plan.fields.filter(field => checkValue(entries[field.key], field.expected, true).status !== 'correct');
  return {correct: incorrect.length === 0, incorrect};
}
export function freshSystemEntry(exercise, legacy = false, plan = systemEntryPlan(exercise)) {
  return {complete: !plan || legacy, started: false, entries: plan ? Object.fromEntries(plan.fields.map(field => [field.key, legacy ? field.expected.toString() : ''])) : {}};
}
export function restoreSystemEntry(exercise, saved, plan = systemEntryPlan(exercise), checkValue = checkSystemEntryValue) {
  if (saved === undefined) return freshSystemEntry(exercise, true, plan);
  const state = freshSystemEntry(exercise, false, plan);
  if (!plan) return state;
  plan.fields.forEach(field => {
    const value = saved && saved.entries && saved.entries[field.key];
    if (typeof value === 'string' && value.length <= (plan.parameter ? 128 : 64)) state.entries[field.key] = value;
  });
  state.complete = !!saved && saved.complete === true && checkSystemEntry(plan, state.entries, checkValue).correct;
  state.started = !!saved && saved.started === true || !state.complete && Object.values(state.entries).some(value => value !== '');
  return state;
}

export function parameterSystemEntryPlan(exercise) {
  const {topic, proof} = exercise;
  const shape = exercise.representation === 'matrices' ? [2, 2] : [exercise.n];
  const adapter = {...exercise, shape, mode: topic, original: proof};
  if (['independence', 'basis'].includes(topic)) { adapter.mode = 'independence'; adapter.original = proof.map(row => row.concat(ParameterFraction.from(0))); }
  if (topic === 'system') adapter.mode = 'combination';
  if (['complement', 'subspaces'].includes(topic)) { adapter.mode = 'complement'; adapter.complementExercise = {subspace: exercise.left}; }
  const plan = systemEntryPlan(adapter);
  plan.parameter = true;
  if (topic === 'independence') plan.description = 'Escreve α₁u₁ + ⋯ + αₘuₘ = 0 em coordenadas. Conserva a ordem dos elementos e inclui os coeficientes nulos.';
  if (topic === 'system' || topic === 'basis') plan.rows.forEach(row => row.left.forEach(field => { field.term.symbol = topic === 'system' ? 'x' : 'λ'; }));
  if (topic === 'basis') plan.description = 'Para verificar se b é uma base de E, estuda a relação λ₁b₁ + ⋯ + λₙbₙ = 0. Completa o sistema dos coeficientes, mantendo a ordem dos elementos.';
  if (topic === 'system') plan.description = 'Escreve x₁u₁ + ⋯ + xₙuₙ = b em coordenadas. Os coeficientes podem ser polinómios em a.';
  if (topic === 'complement') {
    const r = exercise.left.length;
    plan.headings = exercise.left.slice(0, -1).map((_, i) => variable('u', i)).concat(exercise.right.map((_, i) => variable('v', i)), [variable('u', r - 1)]);
    plan.description = 'Completa a matriz indicada pelos cabeçalhos. Colocamos as colunas constantes primeiro e o gerador de E₁ que depende de a no fim; a ordem só facilita a redução.';
  }
  if (topic === 'subspaces') {
    plan.title = 'Completa a matriz dos geradores';
    plan.headings = (exercise.pattern === 'only_roots' ? [] : exercise.left.map((_, i) => variable('u', i))).concat(exercise.right.map((_, i) => variable('v', i)));
    plan.description = exercise.pattern === 'only_roots' ? 'Neste exercício, E₁ + E₂ = E para todo a. Completa a matriz dos geradores de E₂ para estudar a sua dimensão e, pela fórmula das dimensões, a interseção.' : 'Completa a matriz com os geradores de E₁ e E₂ nas colunas. O posto permite estudar a dimensão da soma e, pela fórmula das dimensões, a interseção.';
  }
  return plan;
}
export function checkParameterSystemEntryValue(value, expected, settled = false) {
  if (typeof value !== 'string' || !value.trim()) return {status: settled ? 'missing' : 'empty', message: 'Falta preencher este coeficiente, mesmo que seja zero.'};
  try { return parseParameterPolynomial(value).equals(expected) ? {status: 'correct', message: 'Coeficiente correto.'} : {status: 'wrong', message: 'Esta expressão não corresponde ao coeficiente indicado pelos dados.'}; }
  catch (error) { return {status: error.incomplete && !settled ? 'pending' : 'invalid', message: error.message}; }
}
