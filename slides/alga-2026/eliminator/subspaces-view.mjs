import {familySpace, coordinateLabels} from './independence-view.mjs';
import {complementSymbol, complementFamilyMarkup, complementAnswerMarkup} from './complement-view.mjs';
import {objectMarkup, expressionColumn} from './basis-view.mjs';

export function subspacesProblemMarkup(exercise, numberMarkup) {
  const {left, right, ambient} = exercise.subspacesExercise;
  return `<div class="card-heading"><h2 id="subspaces-problem-title">Determina a soma, a interseção e a suplementaridade.</h2><span class="dimension-tag">${familySpace(exercise)}</span></div><p class="dual-given-description">${exercise.subspacesAmbient === 'full' ? `E = ${familySpace(exercise)}.` : `E é o subespaço de ${familySpace(exercise)} com a seguinte base:`}</p>${exercise.subspacesAmbient === 'nested' ? complementFamilyMarkup(ambient, exercise, numberMarkup, 'e') : ''}<h3 class="complement-subheading">E₁ = G(${left.map((_, i) => complementSymbol('u', i)).join(', ')})</h3>${complementFamilyMarkup(left, exercise, numberMarkup, 'u')}<h3 class="complement-subheading">E₂ = G(${right.map((_, i) => complementSymbol('v', i)).join(', ')})</h3>${complementFamilyMarkup(right, exercise, numberMarkup, 'v')}<div class="combination-bridge"><p>Apresenta uma base de E₁ + E₂ e uma base de E₁ ∩ E₂. Depois decide se a soma é direta, se é igual a E e se os subespaços são suplementares em E.</p><details class="coordinate-help"><summary>Uma redução para os dois cálculos</summary><p>Colocamos os geradores nas colunas de M = [U | −V]. Para a soma, os pivôs selecionam geradores originais independentes; o sinal das colunas de V não muda essa seleção.</p><p>Para a interseção, resolve M(α, β) = 0, ou seja, Uα = Vβ. Cada solução fornece um elemento comum Uα. Se houver geradores redundantes, algumas soluções dão o elemento nulo ou repetem elementos já gerados; não entram na base da interseção.</p>${exercise.representation !== 'vectors' ? `<p>Ordem das coordenadas: ${coordinateLabels(exercise).join(', ')}${exercise.representation === 'matrices' ? ', lendo as entradas linha a linha' : ''}.</p>` : ''}</details></div>`;
}

export function subspacesMatrixMarkup(matrix, exercise, interactive, title, {numberMarkup, spokenNumber, rowSymbol}) {
  const split = exercise.subspacesExercise.left.length;
  const table = `<div class="bracketed"><table class="matrix-table complement-matrix"><caption class="sr-only">${title}: ${matrix.length} linhas e ${matrix[0].length} colunas. Geradores de E₁ e negativos dos geradores de E₂.</caption><thead><tr>${matrix[0].map((_, i) => `<th scope="col" class="${i === split ? 'extension-start' : ''}">${i < split ? complementSymbol('u', i) : `−${complementSymbol('v', i - split)}`}</th>`).join('')}</tr></thead><tbody>${matrix.map((row, i) => `<tr data-matrix-row="${i}">${row.map((value, j) => `<td class="${j === split ? 'extension-start' : ''}" aria-label="Linha ${i + 1}, coluna ${j + 1}: ${spokenNumber(value)}"><span aria-hidden="true">${numberMarkup(value)}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (!interactive) return table;
  return `<div class="matrix-display has-headers ${matrix.length >= 6 ? 'large-matrix' : ''}"><div class="row-pickers" role="group" aria-label="Selecionar linhas para a operação">${matrix.map((_, i) => `<div class="row-picker-slot"><button type="button" class="row-picker" data-pick-row="${i}" aria-label="Escolher linha ${i + 1}" aria-pressed="false">${rowSymbol(i)}</button></div>`).join('')}</div>${table}</div>`;
}

export function subspaceAnswerMarkup(exercise, vectors, numberMarkup, target) {
  const name = target === 'sum' ? 'E₁ + E₂' : 'E₁ ∩ E₂';
  if (!vectors.length) return `<div class="subspaces-zero"><p class="combination-formula">${name} = {0}</p><p class="solution-guidance">A base é a família vazia. A dimensão é 0.</p></div>`;
  return complementAnswerMarkup(exercise, vectors, numberMarkup, name, target === 'sum' ? 'b' : 'c');
}

export function subspacesClassificationMarkup(model) {
  return `<div class="subspaces-facts"><p>dim E₁ = ${model.left}, dim E₂ = ${model.right}, dim E = ${model.ambient}.</p><p>dim(E₁ + E₂) = ${model.sum} e dim(E₁ ∩ E₂) = ${model.intersection}.</p><p class="combination-formula">${model.left} + ${model.right} = ${model.sum} + ${model.intersection}</p><ul><li>Soma direta: <strong>${model.direct ? 'sim' : 'não'}</strong>, porque ${model.direct ? 'a interseção é {0}' : 'a interseção tem dimensão positiva'}.</li><li>E₁ + E₂ = E: <strong>${model.spans ? 'sim' : 'não'}</strong>, porque ${model.spans ? 'a soma tem a dimensão de E' : 'a dimensão da soma é menor do que a de E'}.</li><li>Suplementares em E: <strong>${model.complementary ? 'sim' : 'não'}</strong>. ${model.complementary ? 'Verificam-se as duas condições: soma direta e igual a E.' : model.direct ? 'A soma é direta, mas não preenche E.' : model.spans ? 'A soma preenche E, mas não é direta.' : 'A soma não é direta e não preenche E.'}</li></ul></div>`;
}

export function subspacesCalculationMarkup(exercise, model, quiz, demo, numberMarkup) {
  const sum = quiz.subspacesSumChecked;
  const intersection = quiz.subspacesIntersectionChecked;
  let html = `<p class="solution-guidance">Os pivôs das colunas ${model.pivots.map(i => i + 1).join(', ')} identificam geradores originais independentes para a soma. As colunas reduzidas servem para identificar a independência; as bases usam os elementos originais.</p>`;
  if (demo && sum) html += `<h3>Uma base da soma</h3>${subspaceAnswerMarkup(exercise, model.sumBasis, numberMarkup, 'sum')}`;
  if (!sum) return html;
  html += '<h3>Elementos comuns aos dois subespaços</h3><p class="solution-guidance">Resolvemos Uα = Vβ. As soluções (α, β) são listas de coeficientes; os elementos da interseção são Uα, no espaço E.</p>';
  if (demo && quiz.subspacesRelationCursor > 0) {
    const i = quiz.subspacesRelationCursor - 1;
    const relation = model.relations[i];
    const numeric = {...exercise, basisFormat: 'numeric'};
    const split = exercise.subspacesExercise.left.length;
    const variable = complementSymbol(relation.freeColumn < split ? 'α' : 'β', relation.freeColumn < split ? relation.freeColumn : relation.freeColumn - split);
    html += `<p class="count-tag">Relação ${i + 1} de ${model.relations.length}</p><p class="solution-guidance">Tomamos ${variable} = 1 e os restantes coeficientes livres iguais a 0. A matriz reduzida determina os coeficientes dependentes.</p><div class="subspaces-coefficients"><div>α = ${expressionColumn(relation.alpha.map(v => [v]), numeric, numberMarkup, 'Coeficientes alfa')}</div><div>β = ${expressionColumn(relation.beta.map(v => [v]), numeric, numberMarkup, 'Coeficientes beta')}</div></div><div class="basis-given"><span>Uα = Vβ =</span>${objectMarkup(relation.image.map(v => [v]), numeric, numberMarkup, 'Elemento comum')}</div><p class="solution-guidance">${relation.kept ? 'Este elemento acrescenta uma direção independente à interseção.' : relation.image.every(value => value.isZero) ? 'Esta relação dá o elemento nulo. Não acrescenta um elemento à base da interseção.' : 'Este elemento já é gerado pelos anteriores. Não acrescenta uma direção à interseção.'}</p>`;
    const images = model.relations.slice(0, quiz.subspacesRelationCursor).filter(value => value.kept).map(value => value.image);
    if (!intersection) html += `<h3>Elementos independentes obtidos até agora</h3>${images.length ? complementFamilyMarkup(images, exercise, numberMarkup, 'c') : '<p class="solution-guidance">Ainda não foi obtido um elemento não nulo.</p>'}`;
  } else if (demo && !model.relations.length) html += '<p class="solution-guidance">Não há coeficientes livres. A única solução é (α, β) = 0, logo a interseção é {0}.</p>';
  if (demo && intersection) html += `<h3>Uma base da interseção</h3>${subspaceAnswerMarkup(exercise, model.intersectionBasis, numberMarkup, 'intersection')}`;
  return html;
}
