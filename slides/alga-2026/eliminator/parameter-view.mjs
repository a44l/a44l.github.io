import {Fraction} from './math.mjs';
import {dualEquations} from './dual.mjs';
import {ParameterFraction, polynomial, parameterHint} from './parameter-math.mjs';
import {PARAMETER_TITLE, parameterCases, parameterQuestions, exceptionalReduction} from './parameter-exercises.mjs';

export const escapeParameter = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const wrap = content => `<math xmlns="http://www.w3.org/1998/Math/MathML">${content}</math>`;
function fractionBody(value) {
  value = Fraction.from(value);
  const negative = value.n < 0n;
  const numerator = negative ? -value.n : value.n;
  return `${negative ? '<mo>−</mo>' : ''}${value.d === 1n ? `<mn>${numerator}</mn>` : `<mfrac><mn>${numerator}</mn><mn>${value.d}</mn></mfrac>`}`;
}
export function polynomialBody(values) {
  const p = polynomial(values);
  let result = '';
  for (let i = p.length - 1; i >= 0; i--) {
    const value = p[i];
    if (value.isZero) continue;
    const negative = value.n < 0n;
    if (negative) result += '<mo>−</mo>'; else if (result) result += '<mo>+</mo>';
    const magnitude = negative ? value.neg() : value;
    if (!i || !magnitude.equals(1)) result += fractionBody(magnitude);
    if (i) result += i === 1 ? '<mi>a</mi>' : `<msup><mi>a</mi><mn>${i}</mn></msup>`;
  }
  return result || '<mn>0</mn>';
}
export const parameterPolynomialMarkup = p => wrap(`<mrow>${polynomialBody(p)}</mrow>`);
export function parameterBody(value) {
  const v = ParameterFraction.from(value);
  return v.d.length === 1 && v.d[0].equals(1) ? `<mrow>${polynomialBody(v.n)}</mrow>` : `<mfrac><mrow>${polynomialBody(v.n)}</mrow><mrow>${polynomialBody(v.d)}</mrow></mfrac>`;
}
export const parameterNumberMarkup = value => wrap(parameterBody(value));
export function parameterObjectMarkup(vector, exercise) {
  if (exercise.representation === 'polynomials') {
    const terms = [];
    vector.forEach((value, degree) => {
      const coefficient = ParameterFraction.from(value);
      if (coefficient.isZero) return;
      const term = degree ? `<mo>(</mo>${parameterBody(coefficient)}<mo>)</mo>${degree === 1 ? '<mi>X</mi>' : `<msup><mi>X</mi><mn>${degree}</mn></msup>`}` : parameterBody(coefficient);
      terms.push(term);
    });
    return wrap(`<mrow>${terms.join('<mo>+</mo>') || '<mn>0</mn>'}</mrow>`);
  }
  const rows = exercise.representation === 'matrices' ? [vector.slice(0, 2), vector.slice(2)] : vector.map(v => [v]);
  return `<span class="parameter-object-matrix" style="--parameter-object-columns: ${rows[0].length}">${rows.map(row => row.map(value => `<span>${parameterNumberMarkup(value)}</span>`).join('')).join('')}</span>`;
}
const family = (vectors, exercise, symbol) => `<div class="parameter-family">${vectors.map((vector, i) => `<div class="parameter-object"><span>${symbol}<sub>${i + 1}</sub> =</span>${parameterObjectMarkup(vector, exercise)}</div>`).join('')}</div>`;
export const parameterSpace = e => e.representation === 'matrices' ? 'M₂×₂(ℝ)' : e.representation === 'polynomials' ? `ℝ${e.n === 2 ? '₁' : '₂'}[X]` : `ℝ${e.n === 2 ? '²' : '³'}`;
export function parameterProblemMarkup(e) {
  const intro = {system: 'Estuda, em função de a ∈ ℝ, o número de soluções do sistema x₁u₁ + ⋯ + xₙuₙ = b.', combination: 'Para que valores reais de a é possível escrever u = α₁u₁ + ⋯ + αₙuₙ?', dual: 'Os elementos dados geram U. Estuda a dimensão de U e o número de equações lineares independentes necessárias para o definir.', independence: 'Para que valores reais de a é a família linearmente independente?', basis: 'Para que valores reais de a é b uma base de E? São precisamente os valores para os quais todos os elementos de E têm coordenadas únicas em b.', complement: 'Para que valores reais de a são F e H dois subespaços suplementares diferentes de E₁ em E?', subspaces: 'Estuda a soma, a interseção e a suplementaridade de E₁ e E₂ em função de a ∈ ℝ.'}[e.topic];
  let objects = '';
  if (e.topic === 'complement' || e.topic === 'subspaces') {
    objects = `<h3>E₁ = span{u₁, …, u<sub>${e.left.length}</sub>}</h3>${family(e.left, e, 'u')}<h3>${e.topic === 'complement' ? 'F' : 'E₂'} = span{v₁, …, v<sub>${e.right.length}</sub>}</h3>${family(e.right, e, 'v')}`;
    if (e.topic === 'complement') objects += `<h3>H = span{w₁, …, w<sub>${e.other.length}</sub>}</h3>${family(e.other, e, 'w')}`;
  } else objects = `${e.topic === 'basis' ? '<p>b = (b₁, …, bₙ), pela ordem indicada.</p>' : ''}${family(e.family, e, e.topic === 'basis' ? 'b' : 'u')}`;
  if (e.target) objects += `<div class="parameter-object parameter-target"><span>${e.topic === 'combination' ? 'u' : 'b'} =</span>${parameterObjectMarkup(e.target, e)}</div>${e.homogeneous ? '<p>Sistema homogéneo.</p>' : ''}`;
  return `<section class="card parameter-problem"><div class="card-heading"><h2>${PARAMETER_TITLE[e.topic]}</h2><span class="dimension-tag">E = ${parameterSpace(e)}</span></div><p>${intro}</p>${objects}<p class="solution-guidance">${e.representation === 'polynomials' ? 'X é a variável dos polinómios; a é um parâmetro real dos coeficientes. Usa a ordem 1, X, X² nas coordenadas.' : e.representation === 'matrices' ? 'Lê as quatro entradas de cada matriz linha a linha, sempre na mesma ordem.' : 'Cada vetor é apresentado em coordenadas canónicas.'}</p></section>`;
}
export function parameterMatrixMarkup(matrix, next, augmented) {
  return `<div class="parameter-matrix-scroll" tabindex="0" role="region" aria-label="Matriz da redução"><table class="parameter-matrix"><tbody>${matrix.map((row, i) => `<tr>${row.map((value, j) => `<td class="${augmented && j === row.length - 1 ? 'parameter-rhs ' : ''}${next && next.pivot && next.pivot.row === i && next.pivot.column === j ? 'cell-pivot ' : ''}${next && next.target && next.target.row === i && next.target.column === j ? 'cell-target' : ''}">${parameterNumberMarkup(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export function parameterOperationMarkup(operation) {
  if (!operation) return 'Matriz inicial';
  const target = `L<sub>${operation.target + 1}</sub>`, source = `L<sub>${operation.source + 1}</sub>`;
  if (operation.type === 'swap') return `${target} ↔ ${source}`;
  return `${target} ← ${operation.type === 'scale' ? '' : `${target} + `}(${parameterNumberMarkup(operation.factor)})${operation.type === 'scale' ? target : source}`;
}
export function parameterCaseLabel(e, item) {
  return item.id === 'general' ? `Caso geral: ${parameterPolynomialMarkup(e.p)} ≠ 0` : `a = ${item.value < 0 ? '−' + Math.abs(item.value) : item.value}`;
}
export function parameterCasesMarkup(e, answers, demonstration, complete) {
  const cases = parameterCases(e), questions = parameterQuestions(e);
  return `<div class="parameter-case-grid">${cases.map(item => `<section class="parameter-case" data-parameter-case="${item.id}"><h3>${parameterCaseLabel(e, item)}</h3>${questions.map(([key, label, options]) => {
    const value = demonstration || complete ? item.answer[key] : (answers[item.id] || {})[key];
    return `<fieldset class="parameter-property" data-property="${key}"><legend>${label}</legend>${demonstration || complete ? `<p class="parameter-correct">${options.find(option => option[0] === value)[1]}</p>` : `<div class="solution-types" role="group" aria-label="${escapeParameter(label)}">${options.map(([id, name]) => `<button type="button" data-parameter-answer="${item.id}" data-key="${key}" data-value="${id}" aria-pressed="${value === id}">${name}</button>`).join('')}</div>`}</fieldset>`;
  }).join('')}</section>`).join('')}</div>`;
}
function parameterValueSet(e, key, value) {
  const cases = parameterCases(e), general = cases[0].answer[key] === value;
  const roots = cases.slice(1).filter(item => (item.answer[key] === value) !== general).map(item => item.value < 0 ? '−' + Math.abs(item.value) : item.value);
  return general ? roots.length ? `ℝ ∖ {${roots.join('; ')}}` : 'ℝ' : roots.length ? `{${roots.join('; ')}}` : '∅';
}
export function parameterConclusionMarkup(e) {
  const properties = {system: [['kind', 'unique', 'Solução única'], ['kind', 'infinite', 'Infinitas soluções'], ['kind', 'none', 'Sem solução']], combination: [['exists', 'yes', 'Existe combinação linear']], independence: [['independent', 'yes', 'Família linearmente independente']], basis: [['basis', 'yes', 'b é uma base de E']], complement: [['valid', 'yes', 'F e H são dois suplementares diferentes']], subspaces: [['direct', 'yes', 'Soma direta'], ['spans', 'yes', 'Soma igual a E'], ['complementary', 'yes', 'Subespaços suplementares']]}[e.topic];
  if (properties) return `<div class="parameter-conclusion">${properties.map(([key, value, label]) => `<p><strong>${label}:</strong> a ∈ ${parameterValueSet(e, key, value)}.</p>`).join('')}</div>`;
  return `<p>No caso geral, U = E e não são necessárias equações.${e.roots.length ? ' Nos valores críticos, uma equação independente define U. As variáveis xᵢ representam coordenadas canónicas em E.' : ''}</p>${e.roots.map(root => {
    const matrix = exceptionalReduction(e, root).slice(-1)[0].matrix;
    const equations = dualEquations(matrix);
    return `<p><strong>a = ${root}:</strong> ${equations.map(row => wrap(`<mrow>${row.map((coefficient, i) => ({coefficient, i})).filter(term => !term.coefficient.isZero).map((term, j) => `${j ? '<mo>+</mo>' : ''}<mo>(</mo>${fractionBody(term.coefficient)}<mo>)</mo><msub><mi>x</mi><mn>${term.i + 1}</mn></msub>`).join('')}<mo>=</mo><mn>0</mn></mrow>`)).join('')}</p>`;
  }).join('')}`;
}
export function parameterProofMarkup(e, caseId, cursor, practice, rootsKnown) {
  const item = parameterCases(e).find(value => value.id === caseId) || parameterCases(e)[0];
  const general = item.id === 'general';
  const frames = general ? e.frames : exceptionalReduction(e, item.value);
  const index = Math.min(cursor, frames.length - 1);
  const frame = frames[index];
  const matrix = frame.matrix.map(row => row.map(ParameterFraction.from));
  const next = parameterHint(matrix);
  let context = e.topic === 'dual' ? 'Geradores nas linhas: Bc = 0. Cada solução c fornece uma equação válida em U.' : e.topic === 'subspaces' ? 'Geradores de E₁ e de E₂ nas colunas. O posto dá a dimensão da soma.' : e.topic === 'complement' ? 'Colunas constantes primeiro, seguidas do gerador de E₁ que depende de a. A ordem só facilita a redução.' : 'Um elemento por coluna. Todas as operações atuam sobre a linha inteira.';
  if (e.topic === 'subspaces' && e.pattern === 'only_roots') context = 'Geradores de E₂ nas colunas. O posto dá dim E₂. Neste exercício, E₁ + E₂ = E para todo a; usa a fórmula das dimensões para achar a interseção.';
  return `<section class="card parameter-proof"><div class="card-heading"><h2>${practice ? 'Redução guiada (opcional)' : 'Redução passo a passo'}</h2><span class="count-tag">${index} / ${frames.length - 1}</span></div><p class="solution-guidance">${context}</p>${rootsKnown ? `<div class="mode-options parameter-branches" role="group" aria-label="Caso da redução">${parameterCases(e).map(branch => `<button type="button" data-parameter-branch="${branch.id}" aria-pressed="${item.id === branch.id}">${branch.id === 'general' ? 'Caso geral' : `a = ${branch.value}`}</button>`).join('')}</div>` : ''}<h3>${parameterCaseLabel(e, item)}</h3><p class="parameter-assumption">${general ? 'Esta redução só vale sob a condição indicada. Os zeros do polinómio serão estudados a partir da matriz inicial.' : 'Substituição feita na matriz inicial, antes de qualquer divisão que envolva a.'}</p>${parameterMatrixMarkup(matrix, next, ['system', 'combination', 'dual'].includes(e.topic))}<p class="parameter-operation">${parameterOperationMarkup(frame.operation)}</p>${next ? `<p class="solution-guidance">Próxima operação: ${parameterOperationMarkup(next.operation)}</p>` : '<p class="solution-guidance">Redução concluída neste caso.</p>'}${practice ? `<div class="parameter-proof-actions"><button type="button" class="button button-outline" data-parameter-proof="back" ${index === 0 ? 'disabled' : ''}>Passo anterior</button><button type="button" class="button button-outline" data-parameter-proof="next" ${!next ? 'disabled' : ''}>Ver próximo passo</button></div>` : ''}</section>`;
}
