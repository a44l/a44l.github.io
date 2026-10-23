import {Fraction} from './math.mjs';
import {familySpace, coordinateLabels} from './independence-view.mjs';
import {objectMarkup} from './basis-view.mjs';
import {complementModel} from './complement.mjs';
import {matrixRank} from './dual.mjs';

export const complementSymbol = (name, index) => `<span class="variable-symbol">${name}<sub>${index + 1}</sub></span>`;
const object = (vector, exercise, numberMarkup, label) => objectMarkup(vector.map(value => [value]), {...exercise, basisFormat: 'numeric'}, numberMarkup, label);

export function complementFamilyMarkup(vectors, exercise, numberMarkup, name = 'v', indices = null) {
  return `<div class="given-vectors complement-family">${vectors.map((vector, i) => `<div class="given-vector complement-object">${complementSymbol(name, indices ? indices[i] : i)} = ${object(vector, exercise, numberMarkup, `Elemento ${i + 1}`)}</div>`).join('')}</div>`;
}

export function complementProblemMarkup(exercise, numberMarkup) {
  const {subspace, ambient} = exercise.complementExercise;
  const labels = coordinateLabels(exercise);
  return `<div class="card-heading"><h2 id="complement-problem-title">Encontra dois suplementares diferentes de E₁ em E.</h2><span class="dimension-tag">${familySpace(exercise)}</span></div><p class="dual-given-description">${exercise.complementAmbient === 'full' ? `E = ${familySpace(exercise)}.` : `E é o subespaço de ${familySpace(exercise)} com a seguinte base:`}</p>${exercise.complementAmbient === 'nested' ? complementFamilyMarkup(ambient, exercise, numberMarkup, 'e') : ''}<h3 class="complement-subheading">Geradores de E₁</h3><p class="solution-guidance">E₁ = G(${subspace.map((_, i) => complementSymbol('u', i)).join(', ')}). Os geradores podem ser redundantes.</p>${complementFamilyMarkup(subspace, exercise, numberMarkup, 'u')}<div class="combination-bridge"><p>Procura bases de F e H tais que <strong>E = E₁ ⊕ F = E₁ ⊕ H</strong> e <strong>F ≠ H</strong>. Duas bases do mesmo subespaço não bastam.</p><details class="coordinate-help"><summary>Como se prepara a matriz de prolongamento?</summary><p>As primeiras colunas são os geradores de E₁. À direita, colocamos ${exercise.complementAmbient === 'full' ? 'os elementos da base canónica de E' : 'os elementos da base dada de E'}. Reduz a matriz inteira. Os pivôs identificam as colunas independentes, mas os elementos da base são lidos nas <strong>colunas originais</strong>.</p>${exercise.representation !== 'vectors' ? `<p>Usa sempre a ordem ${labels.join(', ')} ${exercise.representation === 'polynomials' ? 'dos coeficientes' : 'das entradas, lidas linha a linha'}.</p>` : ''}</details><p>Primeiro constrói uma base de F. Depois altera a tua escolha para obter um suplementar H diferente.</p></div>`;
}

export function complementInputMarkup(exercise, entries, escapeHTML, prefix = 'complement') {
  const labels = coordinateLabels(exercise);
  const gridClass = exercise.representation === 'matrices' ? ' complement-matrix-inputs' : '';
  return entries.map((vector, i) => `<fieldset class="complement-entry"><legend>Elemento ${i + 1}</legend><div class="complement-coordinates${gridClass}" ${exercise.representation === 'matrices' ? `style="--object-columns: ${exercise.shape[1]}"` : ''}>${vector.map((value, j) => `<label><span>${labels[j]}</span><input type="text" class="solution-input" data-${prefix}-row="${i}" data-${prefix}-column="${j}" value="${escapeHTML(value)}" maxlength="64" autocomplete="off" spellcheck="false" aria-label="Entrada ${j + 1} do elemento ${i + 1}" aria-describedby="${prefix}-input-help ${prefix}-feedback"></label>`).join('')}</div><button type="button" class="text-button" data-remove-${prefix}="${i}" ${entries.length === 1 ? 'disabled' : ''}>Remover elemento ${i + 1}</button></fieldset>`).join('');
}

export function complementAnswerMarkup(exercise, vectors, numberMarkup, name = 'F', symbol = 'v') {
  return `<div class="complement-answer"><p class="combination-formula">${name} = G(${vectors.map((_, i) => complementSymbol(symbol, i)).join(', ')})</p>${complementFamilyMarkup(vectors, exercise, numberMarkup, symbol)}</div>`;
}

export function complementProofMarkup(exercise, first, second, numberMarkup) {
  const model = complementModel(exercise);
  return `${complementAnswerMarkup(exercise, first, numberMarkup, 'F', 'v')}${complementAnswerMarkup(exercise, second, numberMarkup, 'H', 'w')}<p class="solution-guidance">dim E = ${model.dimension}, dim E₁ = ${model.subspaceDimension}, dim F = dim H = ${model.complementDimension}. Ambas as bases estão em E e, juntas com uma base de E₁, formam uma base de E. Assim, E = E₁ ⊕ F = E₁ ⊕ H.</p><p class="solution-guidance">F ≠ H: dim(F + H) = ${matrixRank(first.concat(second))} &gt; ${model.complementDimension} = dim F.</p>`;
}

export function complementExtensionMarkup(exercise, matrix, numberMarkup, reveal = false) {
  const model = complementModel(exercise, matrix);
  if (!reveal) return '<p class="solution-guidance">Reduz a matriz de prolongamento. Depois escolhe elementos de E que completem uma base de E₁.</p>';
  return `<h3>Uma base de E₁</h3><p class="solution-guidance">Retemos os geradores das colunas originais ${model.retained.map(i => i + 1).join(', ')}. As colunas restantes desse bloco são redundantes.</p>${complementFamilyMarkup(model.subspaceBasis, exercise, numberMarkup, 'u', model.retained)}<p class="solution-guidance">dim E₁ = ${model.subspaceDimension} e dim E = ${model.dimension}. Precisamos de ${model.complementDimension} ${model.complementDimension === 1 ? 'elemento adicional' : 'elementos adicionais'}. Os pivôs do bloco da direita selecionam elementos que prolongam esta base.</p>`;
}

export function complementMatrixMarkup(matrix, exercise, interactive, title, {numberMarkup, spokenNumber, rowSymbol}) {
  const split = exercise.complementExercise.subspace.length;
  const headings = matrix[0].map((_, i) => `<th scope="col" class="${i === split ? 'extension-start' : ''}">${complementSymbol(i < split ? 'u' : 'e', i < split ? i : i - split)}</th>`).join('');
  const table = `<div class="bracketed"><table class="matrix-table complement-matrix"><caption class="sr-only">${title}: ${matrix.length} linhas e ${matrix[0].length} colunas. Primeiro os geradores de E₁, depois uma base de E.</caption><thead><tr>${headings}</tr></thead><tbody>${matrix.map((row, i) => `<tr data-matrix-row="${i}">${row.map((value, j) => `<td class="${j === split ? 'extension-start' : ''}" aria-label="Linha ${i + 1}, coluna ${j + 1}: ${spokenNumber(value)}"><span aria-hidden="true">${numberMarkup(value)}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (!interactive) return table;
  return `<div class="matrix-display has-headers ${matrix.length >= 6 ? 'large-matrix' : ''}"><div class="row-pickers" role="group" aria-label="Selecionar linhas para a operação">${matrix.map((_, i) => `<div class="row-picker-slot"><button type="button" class="row-picker" data-pick-row="${i}" aria-label="Escolher linha ${i + 1}" aria-pressed="false">${rowSymbol(i)}</button></div>`).join('')}</div>${table}</div>`;
}

export function parseComplementEntries(entries) {
  return entries.map(vector => vector.map(Fraction.from));
}
