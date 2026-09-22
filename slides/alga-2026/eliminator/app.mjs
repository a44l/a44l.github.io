import {
  Fraction, matrixFrom, serializeMatrix, sameMatrix, applyOperation,
  rrefStatus, nextHint, generateExercise, LEVELS, MODES, systemSolution, contradictionRow,
  checkDependentVariables, checkSolution, solutionFieldKeys, operationDescription,
  checkCombination, combinationCoefficients
} from './math.mjs';
import {buildLecture} from './lecture.mjs';
import {renderLectureWorkspace} from './lecture-view.mjs';
import {solutionSetMarkup} from './solution-view.mjs';
import {buildCombinationLecture, renderCombinationLecture, updateCombinationIllustration} from './combination-lecture.mjs';

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const STORAGE_KEY = 'escalonar.exercicio.v2';
const systemGuideHTML = $('.guide-system-note').innerHTML;
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const rowSymbol = index => `L<sub>${index + 1}</sub>`;
const variableSymbol = index => `<span class="variable-symbol">${isCombination() ? 'α' : 'x'}<sub>${index + 1}</sub></span>`;
const vectorSymbol = index => `<span class="vector-symbol">u${index === undefined ? '' : `<sub>${index + 1}</sub>`}</span>`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
const operationNames = {add: 'Soma de linhas', scale: 'Multiplicação', swap: 'Troca de linhas'};
let operationType = 'add';
let rowSlot = 'target';
let hint = null;
let pendingSettings = null;
let selectedRows = {target: 1, source: 0};
let announcementTimer;
let demonstrationTimer = null;
let demonstrationPlaying = false;

function emptyQuiz() {
  return {selected: [], dependentChecked: false, kind: '', values: {}, complete: false, declaredImpossible: false, combinationChoice: '', coefficients: []};
}

function restoreQuiz(saved, matrix, mode, original) {
  const quiz = emptyQuiz();
  if (!saved) return quiz;
  if (mode === 'combination') {
    if (saved.combinationChoice === 'no' && saved.complete === true && contradictionRow(matrix) !== -1) {
      return {...quiz, combinationChoice: 'no', complete: true, declaredImpossible: true};
    }
    if (!rrefStatus(matrix).complete) return quiz;
    quiz.combinationChoice = ['yes', 'no'].includes(saved.combinationChoice) ? saved.combinationChoice : '';
    quiz.coefficients = Array.from({length: matrix[0].length - 1}, (_, i) => Array.isArray(saved.coefficients) && typeof saved.coefficients[i] === 'string' && saved.coefficients[i].length <= 64 ? saved.coefficients[i] : '0');
    quiz.complete = saved.complete === true && quiz.combinationChoice === 'yes' && checkCombination(original, quiz.coefficients).correct;
    return quiz;
  }
  if (saved.declaredImpossible === true) {
    if (saved.complete === true && contradictionRow(matrix) !== -1) return {...quiz, kind: 'none', complete: true, declaredImpossible: true};
    return quiz;
  }
  if (!rrefStatus(matrix).complete) return quiz;
  if (Array.isArray(saved.selected)) quiz.selected = [...new Set(saved.selected.filter(value => Number.isInteger(value) && value >= 0 && value < matrix[0].length - 1))];
  quiz.dependentChecked = saved.dependentChecked === true && checkDependentVariables(matrix, quiz.selected);
  if (['none', 'unique', 'infinite'].includes(saved.kind)) quiz.kind = saved.kind;
  if (saved.values && typeof saved.values === 'object') Object.keys(saved.values).forEach(key => {
    if (/^x\d\.(constant|t\d)$/.test(key) && typeof saved.values[key] === 'string' && saved.values[key].length <= 64) quiz.values[key] = saved.values[key];
  });
  quiz.complete = quiz.dependentChecked && saved.complete === true && checkSolution(matrix, quiz.kind, quiz.values).correct;
  return quiz;
}

function freshState(level = 'first', exerciseNumber = 1, mode = 'homogeneous') {
  const original = generateExercise(level, Math.random, {mode});
  return {level, mode, exerciseNumber, original, frames: [{matrix: original, operation: null}], cursor: 0, quiz: emptyQuiz()};
}

function deserializeState(saved) {
  try {
    if (!saved || ![1, 2].includes(saved.version) || !Object.keys(LEVELS).includes(saved.level)) return null;
    if (!Array.isArray(saved.original) || saved.original.length < 2 || saved.original.length > 8 || !Array.isArray(saved.original[0])) return null;
    let mode = saved.version === 1 ? 'matrix' : saved.mode;
    if (!Object.keys(MODES).includes(mode)) return null;
    const level = saved.version === 1 ? Object.keys(LEVELS).find(key => LEVELS[key].sizes.includes(saved.original.length)) : saved.level;
    if (!LEVELS[level].sizes.includes(saved.original.length)) return null;
    const columns = saved.original[0].length;
    if (mode === 'matrix' ? columns < 2 || columns > 8 : columns < 3 || columns > 9) return null;
    if (!saved.original.every(row => Array.isArray(row) && row.length === columns && row.every(value => typeof value === 'string' && /^-?\d$/.test(value)))) return null;
    if (!Array.isArray(saved.events) || saved.events.length > 2000 || !Number.isInteger(saved.cursor) || saved.cursor < 0 || saved.cursor > saved.events.length) return null;
    const original = matrixFrom(mode === 'matrix' ? saved.original.map(row => row.concat('0')) : saved.original);
    if (mode === 'matrix') mode = 'homogeneous';
    const frames = [{matrix: original, operation: null}];
    for (const event of saved.events) {
      if (!event || typeof event !== 'object') return null;
      if (event.type === 'reset') frames.push({matrix: original, operation: {type: 'reset'}});
      else {
        if (event.type !== 'swap' && (typeof event.factor !== 'string' || event.factor.length > 4096)) return null;
        const matrix = applyOperation(frames[frames.length - 1].matrix, event);
        frames.push({matrix, operation: event});
      }
    }
    return {level, mode, exerciseNumber: Number.isSafeInteger(saved.exerciseNumber) && saved.exerciseNumber > 0 ? saved.exerciseNumber : 1, original, frames, cursor: saved.cursor, quiz: restoreQuiz(saved.quiz, frames[saved.cursor].matrix, mode, original)};
  } catch (_) {
    return null;
  }
}

function restoreSessions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem('escalonar.exercicio.v1'));
    if (saved && [3, 4, 5].includes(saved.version)) {
      const practice = deserializeState(saved.practice) || freshState();
      let demonstration = deserializeState(saved.demonstration);
      // A versão anterior copiava o nível da prática para a demonstração.
      // Atualiza apenas uma demonstração inicial ainda sem progresso.
      if (saved.version === 3 && demonstration && demonstration.level === 'first' && demonstration.frames.length === 1 && !demonstration.quiz.complete && demonstration.quiz.selected.length === 0) {
        demonstration = freshState('standard', demonstration.exerciseNumber, demonstration.mode);
      }
      const combinationPractice = deserializeState(saved.combinationPractice);
      const combinationDemonstration = deserializeState(saved.combinationDemonstration);
      return {practice, demonstration,
        combinationPractice: combinationPractice && combinationPractice.mode === 'combination' ? combinationPractice : null,
        combinationDemonstration: combinationDemonstration && combinationDemonstration.mode === 'combination' ? combinationDemonstration : null,
        topic: saved.topic === 'combination' ? 'combination' : 'system',
        mode: saved.mode === 'demonstration' ? 'demonstration' : 'practice', demonstrationSource: saved.demonstrationSource, lecture: saved.lecture,
        combinationSource: saved.combinationSource, combinationLecture: saved.combinationLecture};
    }
    return {practice: deserializeState(saved) || freshState(), demonstration: null, mode: 'practice'};
  } catch (_) { return {practice: freshState(), demonstration: null, mode: 'practice'}; }
}
const sessions = restoreSessions();
let viewMode = sessions.mode;
let exerciseTopic = sessions.topic || 'system';
const sessionKey = (mode = viewMode, topic = exerciseTopic) => topic === 'combination' ? (mode === 'practice' ? 'combinationPractice' : 'combinationDemonstration') : mode;
let state = sessions[sessionKey()] || freshState(viewMode === 'practice' ? 'first' : 'standard', 1, exerciseTopic === 'combination' ? 'combination' : 'homogeneous');
function isCombination() { return exerciseTopic === 'combination'; }
const currentMatrix = () => state.frames[state.cursor].matrix;
const nextExerciseLevel = () => viewMode === 'practice' && state.quiz.complete && state.level === 'first' ? 'standard' : state.level;
let demonstrationSource = sessions.demonstrationSource === 'lecture' ? 'lecture' : 'random';
let lecture = buildLecture(sessions.lecture && sessions.lecture.example, sessions.lecture && sessions.lecture.caseId);
let lectureCursor = sessions.lecture && Number.isInteger(sessions.lecture.cursor) ? sessions.lecture.cursor : 0;
// A versão anterior acrescentava uma linha e um passo indevidos ao exemplo 3.
if (lecture.id === '3' && sessions.lecture && sessions.lecture.version !== 2 && lectureCursor > 1) lectureCursor--;
lectureCursor = Math.max(0, Math.min(lectureCursor, lecture.steps.length));
const isLectureDemo = () => !isCombination() && viewMode === 'demonstration' && demonstrationSource === 'lecture';
let combinationSource = sessions.combinationSource === 'lecture' ? 'lecture' : 'random';
const savedCombinationLecture = sessions.combinationLecture || {};
let combinationLecture = buildCombinationLecture(savedCombinationLecture.example);
let combinationLectureCursor = Number.isInteger(savedCombinationLecture.cursor) ? Math.max(0, Math.min(savedCombinationLecture.cursor, combinationLecture.steps.length)) : 0;
let combinationExploration = {};
const storedExploration = savedCombinationLecture.exploration || {};
if (Array.isArray(storedExploration.coefficients) && storedExploration.coefficients.length <= 3 && storedExploration.coefficients.every(v => Number.isFinite(v) && Math.abs(v) <= 4)) combinationExploration.coefficients = storedExploration.coefficients;
if (Array.isArray(storedExploration.target) && storedExploration.target.length === 2 && storedExploration.target.every(v => Number.isFinite(v) && Math.abs(v) <= 10)) combinationExploration.target = storedExploration.target;
if (Number.isFinite(storedExploration.parameter) && storedExploration.parameter >= -5 && storedExploration.parameter <= 3) combinationExploration.parameter = storedExploration.parameter;
const isCombinationLecture = () => isCombination() && viewMode === 'demonstration' && combinationSource === 'lecture';
const demonstrationComplete = () => isCombinationLecture() ? combinationLectureCursor === combinationLecture.steps.length : isLectureDemo() ? lectureCursor === lecture.steps.length : state.quiz.complete;

function serializeState(exercise) {
  if (!exercise) return null;
  return {
    version: 2, level: exercise.level, mode: exercise.mode, exerciseNumber: exercise.exerciseNumber,
    original: serializeMatrix(exercise.original),
    events: exercise.frames.slice(1).map(frame => frame.operation), cursor: exercise.cursor, quiz: exercise.quiz
  };
}

function save() {
  sessions[sessionKey()] = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 5, mode: viewMode, topic: exerciseTopic, practice: serializeState(sessions.practice), demonstration: serializeState(sessions.demonstration),
      combinationPractice: serializeState(sessions.combinationPractice), combinationDemonstration: serializeState(sessions.combinationDemonstration),
      demonstrationSource, lecture: {version: 2, example: lecture.id, caseId: lecture.selectedCase.id, cursor: lectureCursor},
      combinationSource, combinationLecture: {example: combinationLecture.id, cursor: combinationLectureCursor, exploration: combinationExploration}
    }));
    $('#storage-status').innerHTML = '<span class="save-dot"></span>O teu progresso fica guardado neste navegador.';
  } catch (_) {
    $('#storage-status').textContent = 'O navegador não permitiu guardar o progresso. Mantém esta página aberta.';
  }
}

function announce(message) {
  clearTimeout(announcementTimer);
  $('#live-status').textContent = '';
  announcementTimer = setTimeout(() => { $('#live-status').textContent = message; }, 40);
}

function numberMarkup(value) {
  const fraction = Fraction.from(value);
  if (fraction.d === 1n) return `<span class="${fraction.isZero ? 'zero' : 'integer'}">${String(fraction.n).replace('-', '−')}</span>`;
  return `${fraction.n < 0n ? '<span class="fraction-sign">−</span>' : ''}<span class="fraction"><span>${fraction.n < 0n ? -fraction.n : fraction.n}</span><span>${fraction.d}</span></span>`;
}

function spokenNumber(value) {
  return value.toString().replace('-', 'menos ').replace('/', ' sobre ');
}

function operationMarkup(operation) {
  const target = rowSymbol(operation.target);
  if (operation.type === 'swap') return `${target} <span class="math-arrow">↔</span> ${rowSymbol(operation.source)}`;
  const factor = Fraction.from(operation.factor);
  if (operation.type === 'scale') return `${target} ← ${factor.n < 0n ? '(' : ''}${numberMarkup(factor)}${factor.n < 0n ? ')' : ''} · ${target}`;
  const magnitude = new Fraction(factor.n < 0n ? -factor.n : factor.n, factor.d);
  return `${target} ← ${target} ${factor.n < 0n ? '−' : '+'} ${magnitude.equals(1) ? '' : `${numberMarkup(magnitude)} · `}${rowSymbol(operation.source)}`;
}

function matrixMarkup(matrix, interactive = false, title = 'Matriz inicial') {
  const augmented = state.mode !== 'matrix';
  const lastColumn = matrix[0].length - 1;
  const headings = augmented ? `<thead><tr>${matrix[0].map((_, i) => `<th scope="col" class="${i === lastColumn ? 'rhs-cell' : ''}" aria-label="${i === lastColumn ? (isCombination() ? 'Termos independentes do vetor u' : 'Termos independentes') : `Coeficientes de ${isCombination() ? 'alfa' : 'x'} ${i + 1}`}">${i === lastColumn ? (isCombination() ? 'u' : 'b') : variableSymbol(i)}</th>`).join('')}</tr></thead>` : '';
  const table = `<div class="bracketed"><table class="matrix-table"><caption class="sr-only">${title}: ${matrix.length} linhas e ${matrix[0].length} colunas${augmented ? ', incluindo os termos independentes na última coluna' : ''}.</caption>${headings}<tbody>${matrix.map((row, i) => `<tr data-matrix-row="${i}">${row.map((value, j) => `<td class="${augmented && j === lastColumn ? 'rhs-cell' : ''}" aria-label="Linha ${i + 1}, ${augmented && j === lastColumn ? 'termo independente' : `coluna ${j + 1}`}: ${spokenNumber(value)}"><span aria-hidden="true">${numberMarkup(value)}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (!interactive) return table;
  return `<div class="matrix-display ${augmented ? 'has-headers' : ''} ${matrix.length >= 6 ? 'large-matrix' : ''}"><div class="row-pickers" role="group" aria-label="Selecionar linhas para a operação">${matrix.map((_, i) => `<div class="row-picker-slot"><button type="button" class="row-picker" data-pick-row="${i}" aria-label="Escolher linha ${i + 1}" aria-pressed="false">${rowSymbol(i)}</button></div>`).join('')}</div>${table}</div>`;
}

function populateRows() {
  selectedRows = {target: 1, source: 0};
  ['target', 'source'].forEach(slot => {
    const group = $(`#${slot}-rows`);
    group.style.setProperty('--choice-columns', Math.min(state.original.length, 4));
    group.innerHTML = state.original.map((_, i) => `<button type="button" class="row-choice" role="radio" data-slot="${slot}" data-row="${i}" aria-label="Linha ${i + 1}" aria-checked="${i === selectedRows[slot]}" tabindex="${i === selectedRows[slot] ? 0 : -1}">${rowSymbol(i)}</button>`).join('');
  });
  $('#difficulty').value = state.level;
}

function formOperation() {
  const operation = {type: operationType, target: selectedRows.target};
  if (operationType !== 'scale') operation.source = selectedRows.source;
  if (operationType !== 'swap') operation.factor = Fraction.from($('#factor').value).toString();
  return operation;
}

function highlightSelection() {
  const {target, source} = selectedRows;
  $$('.row-choice').forEach(button => {
    const selected = Number(button.dataset.row) === selectedRows[button.dataset.slot];
    button.setAttribute('aria-checked', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  $$('#matrix-container tr[data-matrix-row], #matrix-container [data-pick-row]').forEach(element => {
    const index = Number(element.dataset.matrixRow === undefined ? element.dataset.pickRow : element.dataset.matrixRow);
    const isTarget = index === target;
    const isSource = operationType !== 'scale' && index === source;
    element.classList.toggle('is-target', isTarget);
    element.classList.toggle('is-source', isSource && !isTarget);
    if (element.matches('button')) {
      const role = operationType === 'swap' ? (isTarget ? ', primeira linha a trocar' : isSource ? ', segunda linha a trocar' : '') : (isTarget ? ', destino' : isSource ? ', origem' : '');
      element.setAttribute('aria-label', `Escolher linha ${index + 1}${role}`);
      element.setAttribute('aria-pressed', String(isTarget || isSource));
    }
  });
  const firstLabel = operationType === 'swap' ? 'Primeira linha' : operationType === 'scale' ? 'Linha selecionada' : 'Destino';
  $('#row-legend').innerHTML = `<span><i class="legend-target"></i>${firstLabel}</span>${operationType === 'scale' ? '' : `<span><i class="legend-source"></i>${operationType === 'swap' ? 'Segunda linha' : 'Origem'}</span>`}`;
}

function setRowSlot(slot, showInstruction = false) {
  rowSlot = operationType === 'scale' ? 'target' : slot;
  if (showInstruction) {
    const description = operationType === 'swap' ? (rowSlot === 'target' ? 'primeira linha a trocar' : 'segunda linha a trocar') : (rowSlot === 'target' ? 'linha de destino' : 'linha de origem');
    $('#selection-note').textContent = `Clica numa linha da matriz para escolher a ${description}.`;
  }
}

function updatePreview() {
  highlightSelection();
  const error = $('#operation-error');
  error.hidden = true;
  $('#factor').removeAttribute('aria-invalid');
  try {
    const operation = formOperation();
    const previewMatrix = applyOperation(currentMatrix(), operation);
    const affected = operationType === 'swap' ? [operation.target, operation.source] : [operation.target];
    $('#preview-tag').textContent = affected.length === 2 ? `Linhas ${affected[0] + 1} e ${affected[1] + 1}` : `Linha ${affected[0] + 1}`;
    $('#operation-notation').innerHTML = operationMarkup(operation);
    $('#operation-notation').setAttribute('aria-label', operationDescription(operation));
    $('#preview-result').innerHTML = affected.map(row => `<div class="preview-row" aria-label="Resultado da linha ${row + 1}: ${previewMatrix[row].map(spokenNumber).join(', ')}"><span class="preview-row-label" aria-hidden="true">${rowSymbol(row)}</span><div class="preview-row-values" aria-hidden="true">${previewMatrix[row].map((value, i) => `<span class="${state.mode !== 'matrix' && i === previewMatrix[row].length - 1 ? 'rhs-value' : ''}">${numberMarkup(value)}</span>`).join('')}</div></div>`).join('');
    const unchanged = sameMatrix(currentMatrix(), previewMatrix);
    $('#apply-operation').disabled = unchanged;
    if (unchanged) {
      error.textContent = 'Esta operação não altera a matriz. Escolhe outra operação ou outro multiplicador.';
      error.hidden = false;
    }
  } catch (problem) {
    error.textContent = problem.message;
    error.hidden = false;
    $('#apply-operation').disabled = true;
    $('#preview-tag').textContent = 'Por completar';
    $('#operation-notation').textContent = 'A tua próxima operação';
    $('#operation-notation').removeAttribute('aria-label');
    $('#preview-result').innerHTML = '<p class="preview-disabled">Preenche os campos para ver o resultado.</p>';
    if (operationType !== 'swap') $('#factor').setAttribute('aria-invalid', 'true');
  }
}

function setOperationType(type, focus = false) {
  operationType = type;
  $$('.operation-tabs button').forEach(button => {
    const active = button.dataset.operation === type;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focus) button.focus();
  });
  $('#operation-fields').setAttribute('aria-labelledby', `tab-${type}`);
  $('#source-field').hidden = type === 'scale';
  $('#factor-field').hidden = type === 'swap';
  $('#factor').disabled = type === 'swap';
  $('#target-label').innerHTML = `<i class="legend-target"></i>${type === 'swap' ? 'Primeira linha' : type === 'scale' ? 'Linha a multiplicar' : 'Linha de destino'}`;
  $('#source-label').innerHTML = `<i class="legend-source"></i>${type === 'swap' ? 'Segunda linha' : 'Linha de origem'}`;
  $('#operation-help').textContent = {
    add: 'Soma um múltiplo de uma linha a outra.',
    scale: 'Multiplica todos os elementos de uma linha.',
    swap: 'Troca a posição de duas linhas da matriz.'
  }[type];
  $('#factor-help').textContent = type === 'scale' ? 'Um inteiro ou uma fração, diferente de zero.' : 'Um inteiro ou uma fração: −2, 3, 1/2…';
  $('#selection-note').textContent = type === 'scale' ? 'Também podes escolher a linha na matriz.' : 'Também podes escolher as linhas na matriz.';
  if (type !== 'scale' && selectedRows.target === selectedRows.source) selectedRows.source = (selectedRows.target + 1) % state.original.length;
  setRowSlot('target');
  updatePreview();
}

function operationCount() {
  let count = 0;
  for (let i = state.cursor; i > 0; i--) {
    if (state.frames[i].operation.type === 'reset') break;
    count++;
  }
  return count;
}

function renderHistory() {
  const count = operationCount();
  $('#step-count').textContent = `${count} ${count === 1 ? 'operação' : 'operações'}`;
  $('#history-empty').hidden = state.frames.length > 1;
  $('#history-list').hidden = state.frames.length === 1;
  $('#history-list').innerHTML = state.frames.slice(1).map((frame, i) => {
    const index = i + 1;
    const reset = frame.operation.type === 'reset';
    const label = reset ? 'Regresso à matriz inicial' : operationDescription(frame.operation);
    return `<li class="${index > state.cursor ? 'future' : index === state.cursor ? 'current' : ''}" aria-label="Passo ${index}: ${label}${index > state.cursor ? ', desfeito' : ''}"><span class="history-index" aria-hidden="true">${String(index).padStart(2, '0')}</span><span class="history-equation ${reset ? 'history-reset' : ''}" aria-hidden="true">${reset ? 'Regresso à matriz inicial' : operationMarkup(frame.operation)}</span><span class="history-kind" aria-hidden="true">${index > state.cursor ? 'Desfeito' : reset ? 'Recomeçar' : operationNames[frame.operation.type]}</span></li>`;
  }).join('');
  if (state.cursor === state.frames.length - 1) $('#history-list').scrollTop = $('#history-list').scrollHeight;
}

function expressionMarkup(constant, terms) {
  const parts = constant.isZero ? [] : [numberMarkup(constant)];
  terms.forEach(({variable, coefficient}) => {
    if (coefficient.isZero) return;
    const magnitude = new Fraction(coefficient.n < 0n ? -coefficient.n : coefficient.n, coefficient.d);
    const sign = coefficient.n < 0n ? '− ' : parts.length ? '+ ' : '';
    parts.push(`${sign}${magnitude.equals(1) ? '' : `${numberMarkup(magnitude)} · `}${variableSymbol(variable)}`);
  });
  return parts.map(part => `<span class="solution-term">${part}</span>`).join(' ') || '0';
}

function proposedSolutionMarkup() {
  const {kind, values} = state.quiz;
  if (kind === 'none') return solutionSetMarkup([]);
  if (!kind) return '';
  const model = systemSolution(currentMatrix());
  const expressions = Array.from({length: model.variables}, (_, variable) => {
    if (kind === 'infinite' && model.free.includes(variable)) return variableSymbol(variable);
    const constant = Fraction.from(values[`x${variable}.constant`] || '');
    const terms = kind === 'infinite' ? model.free.map((freeVariable, i) => ({variable: freeVariable, coefficient: Fraction.from(values[`x${variable}.t${i}`] || '')})) : [];
    return expressionMarkup(constant, terms);
  });
  const parameters = kind === 'infinite' ? model.free.map(variableSymbol) : [];
  return solutionSetMarkup(expressions, parameters);
}

function updateSolutionPreview() {
  const preview = $('#solution-preview');
  preview.hidden = !state.quiz.kind;
  try { preview.innerHTML = proposedSolutionMarkup(); }
  catch (_) { preview.innerHTML = '<span class="solution-placeholder">Preenche os campos com inteiros ou frações para pré-visualizar o conjunto-solução.</span>'; }
}

function solutionInput(key, label) {
  return `<input type="text" class="solution-input" data-solution-field="${key}" value="${escapeHTML(state.quiz.values[key])}" maxlength="64" autocomplete="off" spellcheck="false" aria-label="${label}" aria-describedby="solution-input-help solution-feedback">`;
}

function renderSolutionFields() {
  const model = systemSolution(currentMatrix());
  const kind = state.quiz.kind;
  solutionFieldKeys(model, kind).forEach(key => {
    if (state.quiz.values[key] === undefined) state.quiz.values[key] = '0';
  });
  const fields = $('#solution-fields');
  fields.innerHTML = '';
  $$('.solution-types button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.solutionKind === kind)));
  $('#check-solution').disabled = !kind;
  $('#solution-feedback').hidden = true;
  if (kind === 'none') fields.innerHTML = '<p class="solution-guidance">O conjunto-solução proposto é o conjunto vazio.</p>';
  if (kind === 'unique') {
    fields.innerHTML = `<p class="solution-guidance" id="solution-input-help">Introduz o valor de cada variável como inteiro ou fração.</p><div class="unique-values">${Array.from({length: model.variables}, (_, variable) => `<label class="solution-equation">${variableSymbol(variable)} = ${solutionInput(`x${variable}.constant`, `Valor de x ${variable + 1}`)}</label>`).join('')}</div>`;
  }
  if (kind === 'infinite') {
    const freeVariables = model.free.map(variableSymbol).join(', ');
    fields.innerHTML = `<p class="parameter-mapping">${model.free.length ? `Variáveis livres: ${freeVariables}.<br>Podem assumir qualquer valor real.` : 'Não há variáveis livres na matriz dos coeficientes. Revê o tipo de solução.'}</p><p class="solution-guidance" id="solution-input-help">Preenche a constante e os coeficientes de cada expressão. Mantém 0 quando o termo não aparece; são aceites inteiros e frações.</p><div class="parameter-equations">${model.pivots.map(variable => `<div class="solution-equation"><span class="equation-variable">${variableSymbol(variable)} =</span>${solutionInput(`x${variable}.constant`, `Constante na expressão de x ${variable + 1}`)}${model.free.map((freeVariable, parameter) => `<span class="parameter-term"><span aria-hidden="true">+</span>${solutionInput(`x${variable}.t${parameter}`, `Coeficiente de x ${freeVariable + 1} na expressão de x ${variable + 1}`)}${variableSymbol(freeVariable)}</span>`).join('')}</div>`).join('')}</div>`;
  }
  updateSolutionPreview();
}

function renderCompletion() {
  const count = operationCount();
  const promoted = nextExerciseLevel() !== state.level;
  $('#completion-description').textContent = `${count} ${count === 1 ? 'operação aplicada' : 'operações aplicadas'}.${promoted ? ' O próximo sistema será do nível Intermédio.' : ''}`;
  $('#next-exercise').textContent = promoted ? 'Próximo sistema · Intermédio' : 'Novo exercício';
  $('#accepted-solution').innerHTML = proposedSolutionMarkup();
}

function columnVector(values, label) {
  return `<table class="solution-vector" aria-label="${label}"><tbody>${values.map(value => `<tr><td class="solution-component">${numberMarkup(value)}</td></tr>`).join('')}</tbody></table>`;
}

function renderCombinationProblem() {
  const matrix = state.original;
  const count = matrix[0].length - 1;
  $('#combination-problem').innerHTML = `<div class="card-heading"><h2 id="combination-problem-title">O vetor ${vectorSymbol()} é combinação linear dos vetores dados?</h2><span class="dimension-tag">ℝ<sup>${matrix.length}</sup></span></div><div class="given-vectors"><div class="given-vector target-vector">${vectorSymbol()} = ${columnVector(matrix.map(row => row[count]), 'Vetor u')}</div>${Array.from({length: count}, (_, i) => `<div class="given-vector">${vectorSymbol(i)} = ${columnVector(matrix.map(row => row[i]), `Vetor u ${i + 1}`)}</div>`).join('')}</div><div class="combination-bridge"><p>Procuramos coeficientes reais tais que <span class="combination-formula">${vectorSymbol()} = ${Array.from({length: count}, (_, i) => `<span class="solution-term">${i ? '+ ' : ''}${variableSymbol(i)}${vectorSymbol(i)}</span>`).join(' ')}</span>.</p><p>Colocamos os vetores dados nas colunas de A e o vetor u na última coluna. Reduz Aα = u e verifica se há solução. Os vetores apresentados acima mantêm os seus valores originais.</p></div>`;
}

function renderCombinationFields() {
  const {combinationChoice: choice, coefficients} = state.quiz;
  const count = state.original[0].length - 1;
  for (let i = 0; i < count; i++) if (coefficients[i] === undefined) coefficients[i] = '0';
  $$('[data-combination-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.combinationChoice === choice)));
  $('#combination-fields').innerHTML = choice === 'yes' ? Array.from({length: count}, (_, i) => `<label class="solution-equation">${variableSymbol(i)} = <input type="text" class="solution-input" data-combination-coefficient="${i}" value="${escapeHTML(coefficients[i])}" maxlength="64" autocomplete="off" spellcheck="false" aria-label="Coeficiente alfa ${i + 1}" aria-describedby="combination-input-help combination-feedback"></label>`).join('') : '';
  $('#combination-input-help').textContent = choice === 'no' ? 'Para responder não, deve existir uma linha com todos os coeficientes nulos e termo independente diferente de zero.' : 'Indica uma escolha de coeficientes, com inteiros ou frações. Basta uma representação válida, mesmo que existam outras. Mantém os zeros que estiverem corretos.';
  $('#combination-feedback').hidden = true;
  $('#check-combination').disabled = !choice;
  $('#check-combination').textContent = choice === 'yes' ? 'Verificar coeficientes' : 'Verificar resposta';
}

function renderCombinationLearning() {
  const reduced = rrefStatus(currentMatrix()).complete;
  const complete = state.quiz.complete;
  $('#success-panel').hidden = !reduced && !complete;
  $('#dependent-question').hidden = true;
  $('#solution-question').hidden = true;
  $('#combination-question').hidden = !reduced || complete || viewMode === 'demonstration';
  $('#exercise-complete').hidden = !complete;
  $('#demonstrated-variables').hidden = true;
  const stage = complete ? 3 : !reduced ? 0 : state.quiz.combinationChoice === 'yes' ? 2 : 1;
  $$('.exercise-stages li').forEach((item, i) => {
    item.classList.toggle('is-complete', i < stage);
    if (i === stage) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  if (!reduced && !complete) return;
  $('#learning-step').textContent = complete ? viewMode === 'demonstration' ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'EXERCÍCIO CONCLUÍDO' : 'INTERPRETAR A REDUÇÃO';
  $('#learning-title').textContent = complete ? state.quiz.combinationChoice === 'no' ? 'Não é combinação linear' : 'É uma combinação linear' : 'É possível obter o vetor u?';
  $('#learning-description').textContent = complete ? '' : viewMode === 'demonstration' ? 'A matriz está reduzida. O próximo passo interpreta o sistema Aα = u e apresenta a conclusão.' : 'Decide se u é combinação linear dos vetores dados. Se for, indica os coeficientes.';
  if (!complete) {
    if (viewMode === 'practice') renderCombinationFields();
    return;
  }
  if (state.quiz.combinationChoice === 'no') {
    const row = contradictionRow(currentMatrix());
    const value = currentMatrix()[row][currentMatrix()[row].length - 1].toString().replace('-', '−');
    $('#learning-description').textContent = `A linha ${row + 1} representa 0 = ${value}. Esta contradição mostra que nenhum conjunto de coeficientes permite obter u.`;
    $('#accepted-solution').innerHTML = `<p>Não existem ${Array.from({length: state.original[0].length - 1}, (_, i) => variableSymbol(i)).join(', ')} que satisfaçam Aα = u.</p>`;
  } else {
    const values = state.quiz.coefficients.map(Fraction.from);
    const terms = values.flatMap((value, i) => value.isZero ? [] : [`<span class="solution-term">${value.n < 0n ? '− ' : values.slice(0, i).some(v => !v.isZero) ? '+ ' : ''}${numberMarkup(value.n < 0n ? value.neg() : value)} · ${vectorSymbol(i)}</span>`]);
    $('#learning-description').textContent = 'Estes coeficientes reproduzem exatamente o vetor u.';
    $('#accepted-solution').innerHTML = `<div class="coefficient-values">${values.map((value, i) => `<span>${variableSymbol(i)} = ${numberMarkup(value)}</span>`).join('')}</div><p class="combination-formula">${vectorSymbol()} = ${terms.join(' ') || '0'}</p>`;
    if (viewMode === 'demonstration') {
      const model = systemSolution(currentMatrix());
      $('#demonstrated-variables').hidden = false;
      $('#demonstrated-variables').innerHTML = `<div class="demo-variable-group"><span>Coeficientes dependentes</span><div>${model.pivots.map(i => `<span class="variable-chip dependent">${variableSymbol(i)}</span>`).join('')}</div></div><div class="demo-variable-group"><span>Coeficientes livres</span><div>${model.free.map(i => `<span class="variable-chip independent">${variableSymbol(i)}</span>`).join('') || '<span class="no-free-variables">Não há coeficientes livres.</span>'}</div></div><p class="solution-guidance">${model.free.length ? 'Há várias representações. Escolhemos zero para os coeficientes livres e obtemos uma delas.' : 'A representação é única.'}</p>`;
    }
  }
  const promoted = nextExerciseLevel() !== state.level;
  const count = operationCount();
  $('#completion-description').textContent = `${count} ${count === 1 ? 'operação aplicada' : 'operações aplicadas'}.${promoted ? ' O próximo exercício será do nível Intermédio.' : ''}`;
  $('#next-exercise').textContent = promoted ? 'Próximo exercício · Intermédio' : 'Novo exercício';
}

function renderLearning() {
  if (isCombination()) { renderCombinationLearning(); return; }
  $('#combination-question').hidden = true;
  if (state.quiz.complete && state.quiz.declaredImpossible) {
    const row = contradictionRow(currentMatrix());
    const value = currentMatrix()[row][currentMatrix()[row].length - 1].toString().replace('-', '−');
    $('#success-panel').hidden = false;
    $('#exercise-complete').hidden = false;
    $('#dependent-question').hidden = true;
    $('#solution-question').hidden = true;
    $('#demonstrated-variables').hidden = true;
    $('#learning-step').textContent = 'EXERCÍCIO CONCLUÍDO';
    $('#learning-title').textContent = 'Correto. Sistema impossível';
    $('#learning-description').textContent = `A linha ${row + 1} representa 0 = ${value}, uma contradição. O sistema não tem solução. Não é necessário continuar a redução.`;
    renderCompletion();
    return;
  }
  const reduced = rrefStatus(currentMatrix()).complete;
  const stage = !reduced ? 0 : !state.quiz.dependentChecked ? 1 : !state.quiz.complete ? 2 : 3;
  $$('.exercise-stages li').forEach((item, i) => {
    item.classList.toggle('is-complete', i < stage);
    if (i === stage) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  $('#success-panel').hidden = !reduced;
  $('#exercise-complete').hidden = !reduced || !state.quiz.complete;
  if (!reduced) return;
  const model = systemSolution(currentMatrix());
  $('#demonstrated-variables').hidden = viewMode !== 'demonstration';
  $('#dependent-question').hidden = stage !== 1;
  $('#solution-question').hidden = stage !== 2;
  $('#exercise-complete').hidden = stage !== 3;
  $('#dependent-feedback').hidden = true;
  $('#learning-step').textContent = stage === 3 ? 'TRÊS ETAPAS CONCLUÍDAS' : `ETAPA ${stage + 1} DE 3`;
  $('#learning-title').textContent = stage === 1 ? 'Quais são as variáveis dependentes?' : stage === 2 ? 'Qual é o conjunto-solução?' : 'Exercício concluído';
  $('#learning-description').textContent = stage === 1 ? 'Assinala todas as variáveis cujas colunas têm pivô na matriz dos coeficientes. A coluna b não representa uma variável.' : stage === 2 ? 'Classifica o sistema e introduz a solução. As respostas são verificadas com frações exatas.' : 'A redução, as variáveis dependentes e o conjunto-solução estão corretos.';
  if (stage === 1) $('#dependent-choices').innerHTML = Array.from({length: model.variables}, (_, variable) => `<button type="button" data-dependent-variable="${variable}" aria-pressed="${state.quiz.selected.includes(variable)}" aria-label="x ${variable + 1}">${variableSymbol(variable)}</button>`).join('');
  if (stage === 2) {
    $('#identified-variables').innerHTML = `${icon('check')}<span>Variáveis dependentes: ${model.pivots.map(variableSymbol).join(', ')}.</span>`;
    renderSolutionFields();
  }
  if (stage === 3) renderCompletion();
  if (viewMode === 'demonstration') {
    $('#dependent-question').hidden = true;
    $('#solution-question').hidden = true;
    $('#learning-step').textContent = state.quiz.complete ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'ETAPA 2 DE 3';
    $('#learning-title').textContent = state.quiz.complete ? 'Variáveis e conjunto-solução' : 'Variáveis dependentes e livres';
    $('#learning-description').textContent = 'As variáveis dependentes correspondem às colunas com pivô nos coeficientes. As restantes variáveis são livres.';
    $('#demonstrated-variables').innerHTML = `<div class="demo-variable-group"><span>Dependentes</span><div>${model.pivots.map(variable => `<span class="variable-chip dependent">${variableSymbol(variable)}</span>`).join('')}</div></div><div class="demo-variable-group"><span>Livres</span><div>${model.free.length ? model.free.map(variable => `<span class="variable-chip independent">${variableSymbol(variable)}</span>`).join('') : '<span class="no-free-variables">Não há variáveis livres.</span>'}</div></div>${state.quiz.complete ? `<p class="solution-guidance">${model.type === 'none' ? 'Existe uma linha 0 = 1: o sistema não tem solução.' : model.type === 'unique' ? 'Há um pivô para cada variável e não há contradições: a solução é única.' : 'O sistema é possível e tem variáveis livres: há infinitas soluções.'}</p>` : ''}`;
  }
}

function renderSettings() {
  $$('[data-exercise-topic]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.exerciseTopic === exerciseTopic)));
  $('h1').textContent = isCombination() ? 'Combinações lineares' : 'Eliminação de Gauss';
  $('.guide-system-note').innerHTML = isCombination() ? 'Para decidir se u é combinação linear dos vetores dados, coloca esses vetores nas colunas de A e u na última coluna. As incógnitas são os coeficientes α₁, …, αₙ da equação Aα = u. Reduz a matriz e responde se a combinação existe. Se existir, indica uma escolha de coeficientes com inteiros ou frações; qualquer representação válida é aceite. Se obtiveres uma linha com todos os coeficientes nulos e termo independente diferente de zero, usa <strong>Não é combinação linear</strong> para concluir sem terminar a redução.' : systemGuideHTML;
  document.title = `${isCombination() ? 'Combinações lineares' : 'Eliminação de Gauss'} · escalonar.`;
  $$('[data-view-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.viewMode === viewMode)));
  const lectureMode = isLectureDemo() || isCombinationLecture();
  $('#demo-source-controls').hidden = viewMode !== 'demonstration';
  $$('[data-demo-source]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.demoSource === (isCombination() ? combinationSource : demonstrationSource))));
  $('[data-demo-source="random"]').textContent = isCombination() ? 'Exemplos aleatórios' : 'Sistemas aleatórios';
  $('#lecture-settings').hidden = !isLectureDemo();
  $('#combination-lecture-settings').hidden = !isCombinationLecture();
  $('#combination-lecture-example').value = combinationLecture.id;
  $('#lecture-example').value = lecture.id;
  $('#lecture-cases').hidden = lecture.cases.length === 1;
  $('#lecture-case-buttons').innerHTML = lecture.cases.map(item => `<button type="button" data-lecture-case="${item.id}" aria-pressed="${item.id === lecture.selectedCase.id}">${item.label}</button>`).join('');
  $('.exercise-toolbar').hidden = lectureMode;
  $('.exercise-options').hidden = lectureMode;
  $('#system-mode-options').hidden = isCombination();
  $('#combination-problem').hidden = !isCombination() || lectureMode;
  $('#workspace').hidden = lectureMode;
  $('#lecture-workspace').hidden = !isLectureDemo();
  $('#combination-lecture-workspace').hidden = !isCombinationLecture();
  $('.exercise-stages').hidden = isCombinationLecture() || !lectureMode && state.quiz.complete && state.quiz.declaredImpossible === true;
  $('#infeasibility-action').hidden = viewMode !== 'practice' || state.quiz.complete;
  $('#declare-impossible').textContent = isCombination() ? 'Não é combinação linear' : 'Declarar sistema impossível';
  $('#accepted-solution').setAttribute('aria-label', isCombination() ? 'Conclusão e coeficientes da combinação linear' : 'Conjunto-solução correto');
  $('#new-exercise').innerHTML = `${icon('refresh')}${isCombination() ? 'Novos vetores' : 'Novo sistema'}`;
  const stageLabels = isCombination() ? ['Reduzir a matriz', 'Decidir se é possível', 'Indicar coeficientes'] : ['Reduzir a matriz', 'Identificar variáveis', 'Dar o conjunto-solução'];
  $$('.exercise-stages li').forEach((item, i) => { item.innerHTML = `<span>${i + 1}</span>${stageLabels[i]}`; });
  $('.skip-link').href = isCombinationLecture() ? '#combination-lecture-workspace' : lectureMode ? '#lecture-workspace' : '#workspace';
  const level = nextExerciseLevel();
  const promoted = level !== state.level;
  $('#difficulty').value = level;
  $('.exercise-settings > label').textContent = promoted ? 'Próximo nível' : 'Nível';
  $$('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode)));
  const sizes = LEVELS[level].sizes.map(size => `${size} × ${size}`);
  $('#size-description').textContent = isCombination() ? `${promoted ? 'Próximo exercício' : 'Vetores em ℝⁿ'}: n = ${LEVELS[level].sizes.join(', ')}.` : `${promoted ? 'Próximo sistema' : 'Coeficientes'}: ${sizes.slice(0, -1).join(', ')} ou ${sizes[sizes.length - 1]}.`;
  $('#exercise-instruction').innerHTML = isCombination() ? `Decide se ${vectorSymbol()} é combinação linear dos vetores dados e determina os coeficientes ${variableSymbol(0)}, …, <span class="variable-symbol">α<sub>n</sub></span>.` : 'Reduz a matriz, identifica as variáveis dependentes e determina o conjunto-solução.';
  $('#system-context').hidden = false;
  const rows = state.original.length;
  const variables = state.original[0].length - 1;
  $('#system-context').innerHTML = `<strong>${isCombination() ? 'Aα = u' : state.mode === 'homogeneous' ? 'Ax = 0' : 'Ax = b, b ≠ 0'}</strong><span>${rows} equações · ${variables} ${isCombination() ? 'coeficientes a determinar · última coluna: vetor u' : 'incógnitas · última coluna: termos independentes'}</span>`;
  $('#matrix-title').textContent = 'Matriz ampliada';
  if (isCombination() && !lectureMode) renderCombinationProblem();
}

function clearHint() {
  hint = null;
  $('#hint-content').hidden = true;
  $('#hint-detail').hidden = true;
  $('#hint-button').hidden = false;
  $('#hint-button').setAttribute('aria-expanded', 'false');
  $('#reveal-hint').hidden = false;
  const complete = rrefStatus(currentMatrix()).complete;
  $('#hint-intro').textContent = complete ? 'A matriz está reduzida. Continua nas etapas de identificação das variáveis e do conjunto-solução.' : 'Obtém uma sugestão a partir da matriz atual.';
  $('#hint-button').disabled = complete;
}

function render(changedRows = []) {
  const matrix = currentMatrix();
  $('#infeasibility-feedback').hidden = true;
  renderSettings();
  if (isCombinationLecture()) {
    renderCombinationLecture(combinationLecture, combinationLectureCursor, combinationExploration);
    syncDemonstration();
    save();
    return;
  }
  if (isLectureDemo()) {
    renderLectureWorkspace(lecture, lectureCursor);
    syncDemonstration();
    save();
    return;
  }
  $('#exercise-number').textContent = String(state.exerciseNumber).padStart(2, '0');
  $('#dimensions').textContent = `${matrix.length} × ${matrix[0].length}`;
  $('#matrix-container').innerHTML = matrixMarkup(matrix, true, 'Matriz atual');
  $('#original-matrix').innerHTML = matrixMarkup(state.original);
  $('#undo').disabled = state.cursor === 0;
  $('#redo').disabled = state.cursor === state.frames.length - 1;
  $('#reset').disabled = sameMatrix(matrix, state.original);
  const status = rrefStatus(matrix);
  const impossible = state.quiz.complete && state.quiz.declaredImpossible;
  $('#matrix-status').innerHTML = `<span></span>${impossible ? 'Impossível' : status.complete ? 'Reduzida' : 'Em curso'}`;
  $('#matrix-status').classList.toggle('is-complete', status.complete || impossible);
  renderLearning();
  const rules = [
    ['zeroRowsLast', 'As linhas nulas estão no fim.'],
    ['leadingOnes', 'O primeiro elemento não nulo de cada linha é 1.'],
    ['staircase', 'Cada pivô está à direita do pivô da linha anterior.'],
    ['clearColumns', 'As colunas com pivô têm zeros nas restantes posições.']
  ];
  $('#rref-checklist').innerHTML = rules.map(([key, text]) => `<li class="${status[key] ? 'rule-met' : ''}"><span class="rule-state" aria-hidden="true">${status[key] ? icon('check') : '·'}</span><span class="sr-only">${status[key] ? 'Cumprida' : 'Por cumprir'}: </span><span>${text}</span></li>`).join('');
  renderHistory();
  clearHint();
  updatePreview();
  syncDemonstration();
  changedRows.forEach(row => {
    const element = $(`#matrix-container tr[data-matrix-row="${row}"]`);
    if (element) element.classList.add('just-changed');
  });
  requestAnimationFrame(updateScrollNotice);
  save();
}

function commit(operation) {
  const matrix = operation.type === 'reset' ? state.original : applyOperation(currentMatrix(), operation);
  if (sameMatrix(matrix, currentMatrix())) return;
  state.frames = state.frames.slice(0, state.cursor + 1);
  state.frames.push({matrix, operation});
  state.cursor++;
  state.quiz = emptyQuiz();
  const affected = operation.type === 'reset' ? matrix.map((_, i) => i) : operation.type === 'swap' ? [operation.target, operation.source] : [operation.target];
  render(affected);
  const action = operation.type === 'reset' ? 'Matriz inicial restaurada. Podes desfazer esta ação.' : `${operationDescription(operation)}. Operação aplicada.`;
  announce(`${action}${rrefStatus(matrix).complete ? isCombination() ? ' A matriz está reduzida. Decide agora se u é combinação linear dos vetores dados.' : viewMode === 'practice' ? ' A matriz está reduzida. Identifica agora as variáveis dependentes.' : ' A matriz está reduzida. A demonstração apresenta agora as variáveis dependentes e livres.' : ''}`);
  if (rrefStatus(matrix).complete && viewMode === 'practice') $('#learning-title').focus();
}

function createNew(level, mode = state.mode) {
  pauseDemonstration();
  state = freshState(level, state.exerciseNumber + 1, mode);
  populateRows();
  $('#factor').value = '1';
  $('#original-panel').hidden = true;
  $('#toggle-original').setAttribute('aria-expanded', 'false');
  $('#toggle-original').innerHTML = `${icon('eye')}Ver matriz inicial`;
  setOperationType('add');
  render();
  announce(`${MODES[mode].name}: ${state.original.length} equações e ${state.original[0].length - 1} incógnitas. Nível ${LEVELS[level].name}.`);
}

function requestNew(level, mode = state.mode) {
  renderSettings();
  if ((state.frames.length > 1 || state.quiz.selected.length > 0 || state.quiz.combinationChoice) && !state.quiz.complete) {
    pauseDemonstration();
    pendingSettings = {level, mode};
    $('#new-level-name').textContent = LEVELS[level].name;
    $('#new-mode-name').textContent = MODES[mode].name;
    $('#new-dialog').showModal();
  } else createNew(level, mode);
}

function markCell(position, className, description) {
  if (!position) return;
  const row = $$('#matrix-container tbody tr')[position.row];
  const cell = row && row.children[position.column];
  if (!cell) return;
  cell.dataset.baseLabel = cell.dataset.baseLabel || cell.getAttribute('aria-label');
  cell.classList.add(className);
  cell.setAttribute('aria-label', `${cell.dataset.baseLabel}, ${description}`);
  cell.title = description;
}

function highlightDemonstration(next) {
  $$('#matrix-container tr').forEach(row => row.classList.remove('is-contradiction'));
  $$('#matrix-container td, #matrix-container th').forEach(cell => {
    cell.classList.remove('cell-pivot', 'cell-target', 'variable-dependent', 'variable-independent');
    if (cell.dataset.baseLabel) cell.setAttribute('aria-label', cell.dataset.baseLabel);
    cell.removeAttribute('title');
  });
  if (state.quiz.complete && state.quiz.declaredImpossible) {
    const row = contradictionRow(currentMatrix());
    const column = currentMatrix()[row].length - 1;
    $$('#matrix-container tbody tr')[row].classList.add('is-contradiction');
    markCell({row, column}, 'cell-target', `contradição: 0 = ${spokenNumber(currentMatrix()[row][column])}`);
    return;
  }
  if (viewMode !== 'demonstration') return;
  if (next) {
    markCell(next.pivot, 'cell-pivot', 'pivô da próxima operação');
    markCell(next.target, 'cell-target', next.operation.type === 'swap' ? 'posição de destino do pivô' : 'elemento a anular');
  } else {
    const model = systemSolution(currentMatrix());
    $$('#matrix-container tr, #matrix-container [data-pick-row]').forEach(element => element.classList.remove('is-target', 'is-source'));
    $$('#matrix-container tr').forEach(row => Array.from(row.children).forEach((cell, column) => {
      if (column < model.variables) {
        cell.classList.add(model.pivots.includes(column) ? 'variable-dependent' : 'variable-independent');
        cell.title = model.pivots.includes(column) ? 'Variável dependente' : 'Variável livre';
      }
    }));
    currentMatrix().forEach((row, index) => {
      const column = row.findIndex(value => !value.isZero);
      if (column >= 0) markCell({row: index, column}, column === model.variables ? 'cell-target' : 'cell-pivot', column === model.variables ? 'contradição: 0 = 1' : 'pivô de uma variável dependente');
    });
  }
}

function syncDemoTransport() {
  $('#demo-play').textContent = demonstrationPlaying ? 'Pausar reprodução automática' : 'Iniciar reprodução automática';
  $('#demo-play').setAttribute('aria-pressed', String(demonstrationPlaying));
  $('#demo-play').disabled = demonstrationComplete();
  $('#demo-step').disabled = demonstrationComplete();
}

function syncDemonstration() {
  const demo = viewMode === 'demonstration';
  $('#demo-controls').hidden = !demo;
  document.body.classList.toggle('demonstration-mode', demo);
  if (isCombinationLecture()) {
    const next = combinationLecture.steps[combinationLectureCursor];
    $('#demo-explanation').textContent = next ? next.reason : 'O exemplo está concluído. A conclusão e a interpretação da combinação linear aparecem abaixo.';
    $('#demo-legend').innerHTML = next && next.operation ? '<span><i class="pivot-key"></i>Pivô</span><span><i class="target-key"></i>Elemento a anular</span>' : '';
    syncDemoTransport();
    return;
  }
  if (isLectureDemo()) {
    const next = lecture.steps[lectureCursor];
    $('#demo-explanation').textContent = next ? next.reason : 'O exemplo está concluído no ponto de paragem do texto. As variáveis e o conjunto-solução estão apresentados abaixo.';
    $('#demo-legend').innerHTML = next ? `<span><i class="pivot-key"></i>Pivô</span>${next.target ? `<span><i class="target-key"></i>${next.operation.type === 'swap' ? 'Destino do pivô' : 'Próximo elemento a anular'}</span>` : ''}` : '<span><i class="pivot-key"></i>Coluna de variável dependente</span><span><i class="free-key"></i>Coluna de variável livre</span>';
    syncDemoTransport();
    return;
  }
  const reduced = rrefStatus(currentMatrix()).complete;
  const finished = reduced || state.quiz.complete;
  const next = demo ? nextHint(currentMatrix()) : null;
  $('.hint-card').hidden = demo || finished;
  $('#operation-form').closest('.operation-card').hidden = finished;
  $('#workspace').classList.toggle('is-reduced', finished);
  $('#row-legend').hidden = !demo && finished;
  $('#operation-title').textContent = demo ? 'Próxima operação' : 'Operações sobre linhas';
  if (next) {
    setOperationType(next.operation.type);
    selectedRows.target = next.operation.target;
    if (next.operation.type !== 'scale') selectedRows.source = next.operation.source;
    if (next.operation.type !== 'swap') $('#factor').value = next.operation.factor;
    updatePreview();
  }
  $$('.operation-tabs button, .row-choice').forEach(button => { button.disabled = demo || finished; });
  $$('#matrix-container [data-pick-row]').forEach(button => { button.disabled = demo || finished; });
  if (finished) $$('#matrix-container tr, #matrix-container [data-pick-row]').forEach(element => {
    element.classList.remove('is-target', 'is-source');
    if (element.matches('button')) element.setAttribute('aria-pressed', 'false');
  });
  $('#factor').disabled = demo || finished || operationType === 'swap';
  $('#apply-operation').hidden = demo;
  $('#demo-explanation').textContent = next ? next.reason : isCombination() ? state.quiz.complete ? 'A demonstração está concluída. A conclusão e a sua justificação aparecem abaixo.' : 'A matriz está reduzida. O próximo passo mostra se u é combinação linear e, quando possível, apresenta os coeficientes.' : state.quiz.complete ? 'O sistema está resolvido. As colunas dependentes e livres estão assinaladas na matriz; o conjunto-solução aparece abaixo.' : 'A matriz está reduzida. As colunas com pivô identificam as variáveis dependentes; o próximo passo apresenta o conjunto-solução.';
  $('#demo-legend').innerHTML = next ? `<span><i class="pivot-key"></i>Pivô</span>${next.target ? `<span><i class="target-key"></i>${next.operation.type === 'swap' ? 'Destino do pivô' : 'Próximo elemento a anular'}</span>` : ''}` : '<span><i class="pivot-key"></i>Coluna de variável dependente</span><span><i class="free-key"></i>Coluna de variável livre</span>';
  if (demo && reduced) $('#row-legend').innerHTML = '<span><i class="legend-target"></i>Dependentes</span><span><i class="legend-source"></i>Livres</span>';
  highlightDemonstration(next);
  syncDemoTransport();
}

function pauseDemonstration() {
  clearTimeout(demonstrationTimer);
  demonstrationTimer = null;
  demonstrationPlaying = false;
  syncDemoTransport();
}

function advanceDemonstration() {
  if (viewMode !== 'demonstration' || demonstrationComplete()) return;
  if (isCombinationLecture()) {
    combinationLectureCursor++;
    combinationExploration = {};
    if (demonstrationComplete()) pauseDemonstration();
    render();
    announce(demonstrationComplete() ? 'Exemplo de combinação linear concluído.' : `Passo ${combinationLectureCursor} apresentado.`);
    return;
  }
  if (isLectureDemo()) {
    lectureCursor++;
    if (demonstrationComplete()) pauseDemonstration();
    render();
    announce(demonstrationComplete() ? 'Exemplo da aula concluído.' : `Passo ${lectureCursor} do exemplo ${lecture.id} apresentado.`);
    return;
  }
  const next = nextHint(currentMatrix());
  if (next) commit(next.operation);
  else if (isCombination()) {
    const coefficients = combinationCoefficients(currentMatrix());
    state.quiz = {...emptyQuiz(), combinationChoice: coefficients ? 'yes' : 'no', coefficients: coefficients || [], declaredImpossible: !coefficients, complete: true};
    pauseDemonstration();
    render();
    announce('Demonstração concluída. A conclusão sobre a combinação linear está apresentada.');
  }
  else {
    const model = systemSolution(currentMatrix());
    const values = {};
    model.expressions.forEach(expression => {
      if (model.free.includes(expression.variable)) return;
      values[`x${expression.variable}.constant`] = expression.constant.toString();
      model.free.forEach((_, parameter) => {
        const term = expression.terms.find(item => item.parameter === parameter);
        values[`x${expression.variable}.t${parameter}`] = term ? term.coefficient.toString() : '0';
      });
    });
    state.quiz = {selected: model.pivots.slice(), dependentChecked: true, kind: model.type, values, complete: true};
    pauseDemonstration();
    render();
    announce('Demonstração concluída. As variáveis e o conjunto-solução estão apresentados.');
  }
}

function scheduleDemonstration() {
  clearTimeout(demonstrationTimer);
  if (!demonstrationPlaying || viewMode !== 'demonstration' || demonstrationComplete()) return;
  demonstrationTimer = setTimeout(() => {
    advanceDemonstration();
    scheduleDemonstration();
  }, Number($('#demo-speed').value));
}

function playDemonstration() {
  if (viewMode !== 'demonstration' || demonstrationComplete()) return;
  demonstrationPlaying = true;
  syncDemoTransport();
  scheduleDemonstration();
}

function switchViewMode(mode) {
  if (mode === viewMode) return;
  pauseDemonstration();
  sessions[sessionKey()] = state;
  if (!sessions[sessionKey(mode)]) sessions[sessionKey(mode)] = freshState(mode === 'demonstration' ? 'standard' : 'first', 1, state.mode);
  viewMode = mode;
  state = sessions[sessionKey()];
  populateRows();
  $('#factor').value = '1';
  setOperationType('add');
  render();
  announce(mode === 'demonstration' ? 'Modo de demonstração. Avança um passo ou inicia a reprodução automática.' : 'Modo de prática. O teu exercício e as tuas respostas foram recuperados.');
}

function switchTopic(topic) {
  if (topic === exerciseTopic) return;
  pauseDemonstration();
  sessions[sessionKey()] = state;
  exerciseTopic = topic;
  state = sessions[sessionKey()] || freshState(viewMode === 'practice' ? 'first' : 'standard', 1, isCombination() ? 'combination' : 'homogeneous');
  populateRows();
  $('#factor').value = '1';
  setOperationType('add');
  render();
  announce(isCombination() ? 'Tema: combinação linear. Os coeficientes são alfa 1, alfa 2, e assim sucessivamente.' : 'Tema: sistema linear. O teu progresso foi recuperado.');
}

function selectLecture(example, caseId) {
  pauseDemonstration();
  lecture = buildLecture(example, caseId);
  lectureCursor = 0;
  render();
  announce(`Exemplo ${lecture.id}, página ${lecture.page}. ${lecture.selectedCase.condition || 'Avança um passo para começar.'}`);
}

$$('[data-demo-source]').forEach(button => button.addEventListener('click', () => {
  pauseDemonstration();
  if (isCombination()) combinationSource = button.dataset.demoSource;
  else demonstrationSource = button.dataset.demoSource;
  render();
}));
function selectCombinationLecture(id) {
  pauseDemonstration();
  combinationLecture = buildCombinationLecture(id);
  combinationLectureCursor = 0;
  combinationExploration = {};
  render();
  announce(`Exemplo ${combinationLecture.id}, página ${combinationLecture.page}. Avança um passo para começar.`);
}
$('#combination-lecture-example').addEventListener('change', event => selectCombinationLecture(event.target.value));
$('#combination-lecture-workspace').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  pauseDemonstration();
  if (button.id === 'combination-lecture-back') { combinationLectureCursor = Math.max(0, combinationLectureCursor - 1); combinationExploration = {}; render(); }
  if (button.id === 'combination-lecture-forward') advanceDemonstration();
  if (button.id === 'combination-lecture-next') selectCombinationLecture(String(Number(combinationLecture.id) % 6 + 1));
});
$('#combination-lecture-workspace').addEventListener('input', event => {
  const input = event.target;
  if (!input.matches('[data-plot-coefficient], [data-plot-parameter], [data-plot-target]')) return;
  const value = Number(input.value);
  if (!Number.isFinite(value) || input.value.trim() === '' || value < Number(input.min) || value > Number(input.max)) return;
  pauseDemonstration();
  if (input.matches('[data-plot-coefficient]')) combinationExploration.coefficients = $$('[data-plot-coefficient]').map(field => Number(field.value));
  if (input.matches('[data-plot-parameter]')) combinationExploration.parameter = value;
  if (input.matches('[data-plot-target]')) {
    combinationExploration.target = combinationExploration.target || combinationLecture.target.slice();
    combinationExploration.target[Number(input.dataset.plotTarget)] = value;
  }
  updateCombinationIllustration(combinationLecture, combinationLectureCursor, combinationExploration);
  save();
});
$('#lecture-example').addEventListener('change', event => selectLecture(event.target.value));
$('#lecture-case-buttons').addEventListener('click', event => {
  const button = event.target.closest('[data-lecture-case]');
  if (button) selectLecture(lecture.id, button.dataset.lectureCase);
});
$('#lecture-workspace').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  pauseDemonstration();
  if (button.id === 'lecture-back') { lectureCursor = Math.max(0, lectureCursor - 1); render(); }
  if (button.id === 'lecture-forward') advanceDemonstration();
  if (button.id === 'lecture-next-example') selectLecture(String(Number(lecture.id) % 6 + 1));
});

$('#operation-form').addEventListener('submit', event => {
  event.preventDefault();
  if (viewMode === 'demonstration' || state.quiz.complete || $('#apply-operation').disabled) return;
  try { commit(formOperation()); } catch (problem) { announce(problem.message); }
});

$$('.operation-tabs button').forEach((button, index, buttons) => {
  button.addEventListener('click', () => setOperationType(button.dataset.operation));
  button.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % buttons.length;
    if (event.key === 'ArrowLeft') target = (index + buttons.length - 1) % buttons.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = buttons.length - 1;
    if (target !== undefined) {
      event.preventDefault();
      setOperationType(buttons[target].dataset.operation, true);
    }
  });
});

function chooseRow(slot, picked) {
  const other = slot === 'target' ? 'source' : 'target';
  if (operationType !== 'scale' && selectedRows[other] === picked) selectedRows[other] = selectedRows[slot];
  selectedRows[slot] = picked;
  setRowSlot(slot, true);
  updatePreview();
}

['target', 'source'].forEach(slot => {
  const group = $(`#${slot}-rows`);
  group.addEventListener('focusin', () => setRowSlot(slot, true));
  group.addEventListener('click', event => {
    const button = event.target.closest('[data-row]');
    if (button) chooseRow(slot, Number(button.dataset.row));
  });
  group.addEventListener('keydown', event => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const count = state.original.length;
    const current = selectedRows[slot];
    const picked = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (current + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : count - 1)) % count;
    chooseRow(slot, picked);
    group.querySelector(`[data-row="${picked}"]`).focus();
  });
});
$('#factor').addEventListener('input', updatePreview);
$('#matrix-container').addEventListener('click', event => {
  const button = event.target.closest('[data-pick-row]');
  if (!button) return;
  const picked = Number(button.dataset.pickRow);
  const filledSlot = rowSlot;
  chooseRow(rowSlot, picked);
  setRowSlot(operationType === 'scale' ? 'target' : rowSlot === 'target' ? 'source' : 'target', true);
  announce(`Linha ${picked + 1} selecionada${operationType === 'add' ? filledSlot === 'target' ? ' como destino' : ' como origem' : ''}.`);
});

$('#undo').addEventListener('click', () => {
  if (viewMode === 'demonstration') pauseDemonstration();
  if (state.cursor === 0) return;
  state.cursor--;
  state.quiz = emptyQuiz();
  render();
  announce('Última ação desfeita. A matriz foi atualizada.');
});
$('#redo').addEventListener('click', () => {
  if (viewMode === 'demonstration') pauseDemonstration();
  if (state.cursor >= state.frames.length - 1) return;
  state.cursor++;
  state.quiz = emptyQuiz();
  render();
  announce(`Ação refeita. A matriz foi atualizada.${rrefStatus(currentMatrix()).complete ? ' A matriz está na forma escalonada reduzida.' : ''}`);
});
$('#reset').addEventListener('click', () => { if (viewMode === 'demonstration') pauseDemonstration(); commit({type: 'reset'}); });
$('#toggle-original').addEventListener('click', () => {
  const show = $('#original-panel').hidden;
  $('#original-panel').hidden = !show;
  $('#toggle-original').setAttribute('aria-expanded', String(show));
  $('#toggle-original').innerHTML = `${icon('eye')}${show ? 'Ocultar matriz inicial' : 'Ver matriz inicial'}`;
});

$('#new-exercise').addEventListener('click', () => requestNew(nextExerciseLevel()));
$('#next-exercise').addEventListener('click', () => {
  createNew(nextExerciseLevel());
  $('#workspace').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  $('#workspace').focus({preventScroll: true});
});
$('#difficulty').addEventListener('change', event => requestNew(event.target.value));
$$('[data-mode]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.mode !== state.mode) requestNew(nextExerciseLevel(), button.dataset.mode);
}));
$('#confirm-new').addEventListener('click', () => {
  if (pendingSettings) createNew(pendingSettings.level, pendingSettings.mode);
  $('#new-dialog').close();
});
$('#new-dialog').addEventListener('close', () => { pendingSettings = null; });

$$('[data-open-guide]').forEach(button => button.addEventListener('click', () => $('#guide-dialog').showModal()));
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
}));

$('#hint-button').addEventListener('click', () => {
  hint = nextHint(currentMatrix());
  if (!hint) return;
  $('#hint-content').hidden = false;
  $('#hint-button').hidden = true;
  $('#hint-button').setAttribute('aria-expanded', 'true');
  $('#hint-reason').textContent = hint.reason;
  $('#reveal-hint').focus({preventScroll: true});
  announce(hint.reason);
});
$('#reveal-hint').addEventListener('click', () => {
  if (!hint) return;
  $('#hint-detail').hidden = false;
  $('#reveal-hint').hidden = true;
  $('#hint-notation').innerHTML = operationMarkup(hint.operation);
  $('#hint-notation').setAttribute('aria-label', operationDescription(hint.operation));
  $('#prepare-hint').focus({preventScroll: true});
});
$('#prepare-hint').addEventListener('click', () => {
  if (!hint) return;
  const operation = hint.operation;
  setOperationType(operation.type);
  selectedRows.target = operation.target;
  if (operation.type !== 'scale') selectedRows.source = operation.source;
  if (operation.type !== 'swap') $('#factor').value = operation.factor;
  updatePreview();
  $('#apply-operation').focus();
  announce('Operação sugerida preparada. Confirma a pré-visualização antes de a aplicar.');
});

$('#declare-impossible').addEventListener('click', () => {
  if (viewMode !== 'practice' || state.quiz.complete) return;
  if (contradictionRow(currentMatrix()) === -1) {
    $('#infeasibility-feedback').textContent = 'Ainda não há uma linha com todos os coeficientes nulos e termo independente diferente de zero. Continua a redução para justificar a declaração.';
    $('#infeasibility-feedback').hidden = false;
    return;
  }
  state.quiz = {...emptyQuiz(), kind: 'none', combinationChoice: isCombination() ? 'no' : '', complete: true, declaredImpossible: true};
  render();
  $('#learning-title').focus();
  announce(isCombination() ? 'Correto. A linha assinalada prova que u não é combinação linear dos vetores dados. Exercício concluído.' : 'Correto. A linha assinalada prova que o sistema é impossível. O conjunto-solução é vazio. Exercício concluído.');
});

$$('[data-combination-choice]').forEach(button => button.addEventListener('click', () => {
  if (!isCombination() || viewMode !== 'practice' || state.quiz.complete) return;
  state.quiz.combinationChoice = button.dataset.combinationChoice;
  renderCombinationLearning();
  save();
}));
$('#combination-fields').addEventListener('input', event => {
  const input = event.target.closest('[data-combination-coefficient]');
  if (!input) return;
  state.quiz.coefficients[Number(input.dataset.combinationCoefficient)] = input.value;
  input.removeAttribute('aria-invalid');
  $('#combination-feedback').hidden = true;
  save();
});
$('#combination-question').addEventListener('submit', event => {
  event.preventDefault();
  if (!isCombination() || viewMode !== 'practice' || state.quiz.complete || !rrefStatus(currentMatrix()).complete) return;
  const choice = state.quiz.combinationChoice;
  const result = choice === 'yes' ? checkCombination(state.original, state.quiz.coefficients) : {correct: choice === 'no' && contradictionRow(currentMatrix()) !== -1, message: 'Não há uma linha contraditória. Revê a resposta e verifica se existem coeficientes que reproduzem u.'};
  if (!result.correct) {
    $('#combination-feedback').textContent = result.message;
    $('#combination-feedback').hidden = false;
    (result.invalid || []).forEach(i => $(`[data-combination-coefficient="${i}"]`).setAttribute('aria-invalid', 'true'));
    return;
  }
  state.quiz.complete = true;
  state.quiz.declaredImpossible = choice === 'no';
  render();
  $('#learning-title').focus();
  announce('Resposta correta. Exercício de combinação linear concluído.');
});

$('#dependent-choices').addEventListener('click', event => {
  const button = event.target.closest('[data-dependent-variable]');
  if (!button) return;
  const variable = Number(button.dataset.dependentVariable);
  if (state.quiz.selected.includes(variable)) state.quiz.selected = state.quiz.selected.filter(value => value !== variable);
  else state.quiz.selected.push(variable);
  button.setAttribute('aria-pressed', String(state.quiz.selected.includes(variable)));
  $('#dependent-feedback').hidden = true;
  save();
});
$('#check-dependent').addEventListener('click', () => {
  if (!rrefStatus(currentMatrix()).complete) return;
  if (!checkDependentVariables(currentMatrix(), state.quiz.selected)) {
    $('#dependent-feedback').textContent = 'A seleção ainda não está correta. Seleciona todas as colunas com pivô nos coeficientes; a coluna dos termos independentes não conta.';
    $('#dependent-feedback').hidden = false;
    return;
  }
  state.quiz.dependentChecked = true;
  renderLearning();
  save();
  $('#learning-title').focus();
  announce('Variáveis dependentes corretas. Introduz agora o conjunto-solução.');
});
$$('[data-solution-kind]').forEach(button => button.addEventListener('click', () => {
  state.quiz.kind = button.dataset.solutionKind;
  renderSolutionFields();
  save();
}));
$('#solution-fields').addEventListener('input', event => {
  const input = event.target.closest('[data-solution-field]');
  if (!input) return;
  state.quiz.values[input.dataset.solutionField] = input.value;
  input.removeAttribute('aria-invalid');
  $('#solution-feedback').hidden = true;
  updateSolutionPreview();
  save();
});
$('#solution-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!state.quiz.dependentChecked || !rrefStatus(currentMatrix()).complete) return;
  const result = checkSolution(currentMatrix(), state.quiz.kind, state.quiz.values);
  if (!result.correct) {
    $('#solution-feedback').textContent = result.message;
    $('#solution-feedback').hidden = false;
    (result.invalid || []).forEach(key => {
      const input = $(`[data-solution-field="${key}"]`);
      if (input) input.setAttribute('aria-invalid', 'true');
    });
    return;
  }
  state.quiz.complete = true;
  renderSettings();
  renderLearning();
  save();
  $('#learning-title').focus();
  announce('O conjunto-solução está correto. Exercício concluído.');
});

function updateScrollNotice() {
  [['#matrix-container', '#matrix-scroll-note'], ['#lecture-matrix', '#lecture-scroll-note']].forEach(([matrixSelector, noteSelector]) => {
    const region = $(matrixSelector);
    if (region) $(noteSelector).hidden = region.scrollWidth <= region.clientWidth + 1;
  });
}
window.addEventListener('resize', updateScrollNotice);
if ('ResizeObserver' in window) new ResizeObserver(updateScrollNotice).observe($('#matrix-container'));

$$('[data-view-mode]').forEach(button => button.addEventListener('click', () => switchViewMode(button.dataset.viewMode)));
$$('[data-exercise-topic]').forEach(button => button.addEventListener('click', () => switchTopic(button.dataset.exerciseTopic)));
$('#demo-play').addEventListener('click', () => { if (demonstrationPlaying) pauseDemonstration(); else playDemonstration(); });
$('#demo-step').addEventListener('click', () => { pauseDemonstration(); advanceDemonstration(); });
$('#demo-restart').addEventListener('click', () => {
  pauseDemonstration();
  if (isCombinationLecture()) { combinationLectureCursor = 0; combinationExploration = {}; render(); return; }
  if (isLectureDemo()) { lectureCursor = 0; render(); return; }
  state.frames = [{matrix: state.original, operation: null}];
  state.cursor = 0;
  state.quiz = emptyQuiz();
  render();
});
$('#demo-speed').addEventListener('change', scheduleDemonstration);
document.addEventListener('visibilitychange', () => { if (document.hidden && viewMode === 'demonstration') pauseDemonstration(); });

populateRows();
setOperationType('add');
render();
