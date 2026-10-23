import {
  Fraction, matrixFrom, serializeMatrix, sameMatrix, applyOperation,
  rrefStatus, nextHint, generateExercise, LEVELS, MODES, systemSolution, contradictionRow,
  checkDependentVariables, checkSolution, solutionFieldKeys, operationDescription,
  checkCombination, combinationCoefficients
} from './math.mjs';
import {buildLecture} from './lecture.mjs';
import {renderLectureWorkspace} from './lecture-view.mjs';
import {solutionSetMarkup, setBrace} from './solution-view.mjs';
import {buildCombinationLecture, renderCombinationLecture, updateCombinationIllustration} from './combination-lecture.mjs';
import {DUAL_MODE, generateDualExercise, coordinateCount, generatorCount, generatorPart, dualStatus, nextDualHint, dualEquations, checkDualEquations} from './dual.mjs';
import {INDEPENDENCE_MODE, REPRESENTATIONS, generateIndependenceExercise, validIndependenceShape, familyColumns, independenceEchelonStatus, independenceModel, dependenceRelation, checkIndependence} from './independence.mjs';
import {independenceProblemMarkup, relationMarkup, familySpace} from './independence-view.mjs';
import {BASIS_MODE, BASIS_TASKS, BASIS_FORMATS, generateBasisExercise, restoreBasisExercise, serializeBasisExercise, basisStatus, nextBasisHint, basisAnswer, checkBasisAnswer, basisPart} from './basis.mjs';
import {basisProblemMarkup, basisAnswerMarkup, basisInputMarkup, basisCombination, linearExpression, expansionMarkup} from './basis-view.mjs';
import {COMPLEMENT_MODE, COMPLEMENT_AMBIENTS, generateComplementExercise, restoreComplementExercise, serializeComplementExercise, complementModel, complementAnswers, checkComplementBasis} from './complement.mjs';
import {complementSymbol, complementProblemMarkup, complementInputMarkup, complementAnswerMarkup, complementProofMarkup, complementExtensionMarkup, complementMatrixMarkup, parseComplementEntries} from './complement-view.mjs';
import {SUBSPACES_MODE, generateSubspacesExercise, restoreSubspacesExercise, serializeSubspacesExercise, subspacesModel, checkSubspaceBasis, checkSubspacesClassification} from './subspaces.mjs';
import {subspacesProblemMarkup, subspacesMatrixMarkup, subspaceAnswerMarkup, subspacesClassificationMarkup, subspacesCalculationMarkup} from './subspaces-view.mjs';
import {createParameterController} from './parameter-controller.mjs';
import {systemEntryPlan, checkSystemEntry, freshSystemEntry, restoreSystemEntry} from './system-entry.mjs';
import {systemEntryMarkup, updateSystemEntryFeedback} from './system-entry-view.mjs';

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const STORAGE_KEY = 'escalonar.exercicio.v2';
const systemGuideHTML = $('.guide-system-note').innerHTML;
const exerciseModes = {...MODES, dual: DUAL_MODE, independence: INDEPENDENCE_MODE, basis: BASIS_MODE, complement: COMPLEMENT_MODE, subspaces: SUBSPACES_MODE};
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const rowSymbol = index => `L<sub>${index + 1}</sub>`;
const variableSymbol = index => `<span class="variable-symbol">${isBasis() ? 'λ' : isCombination() || isIndependence() ? 'α' : isDual() ? 'c' : 'x'}<sub>${index + 1}</sub></span>`;
const coordinateSymbol = index => `<span class="variable-symbol">x<sub>${index + 1}</sub></span>`;
const normalSymbol = index => `<span class="variable-symbol">c<sup>(${index + 1})</sup></span>`;
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
  return {selected: [], dependentChecked: false, kind: '', values: {}, complete: false, declaredImpossible: false, combinationChoice: '', coefficients: [], dualKind: 'equations', equations: [], dualBasisShown: false, independenceChoice: '', independenceEchelonAccepted: false, basisWeights: [], basisValues: [], basisWeightsChecked: false, complementBases: [[], []], complementFirstChecked: false, subspacesValues: [[], []], subspacesSumChecked: false, subspacesIntersectionChecked: false, subspacesIntersectionKind: 'basis', subspacesChoices: {}, subspacesRelationCursor: 0};
}

function restoreQuiz(saved, matrix, mode, original, exercise) {
  const quiz = emptyQuiz();
  if (!saved) return quiz;
  if (mode === 'subspaces') {
    if (!rrefStatus(matrix).complete) return quiz;
    const n = original.length;
    const valid = rows => Array.isArray(rows) && rows.length <= n && rows.every(row => Array.isArray(row) && row.length === n && row.every(value => typeof value === 'string' && value.length <= 64));
    if (Array.isArray(saved.subspacesValues) && saved.subspacesValues.length === 2) saved.subspacesValues.forEach((rows, i) => { if (valid(rows)) quiz.subspacesValues[i] = rows; });
    quiz.subspacesIntersectionKind = saved.subspacesIntersectionKind === 'zero' ? 'zero' : 'basis';
    quiz.subspacesSumChecked = saved.subspacesSumChecked === true && checkSubspaceBasis(exercise, quiz.subspacesValues[0], 'sum').correct;
    quiz.subspacesIntersectionChecked = quiz.subspacesSumChecked && saved.subspacesIntersectionChecked === true && checkSubspaceBasis(exercise, quiz.subspacesValues[1], 'intersection', quiz.subspacesIntersectionKind).correct;
    ['direct', 'spans', 'complementary'].forEach(key => { if (saved.subspacesChoices && ['yes', 'no'].includes(saved.subspacesChoices[key])) quiz.subspacesChoices[key] = saved.subspacesChoices[key]; });
    if (quiz.subspacesSumChecked && Number.isInteger(saved.subspacesRelationCursor)) quiz.subspacesRelationCursor = Math.max(0, Math.min(subspacesModel(exercise, matrix).relations.length, saved.subspacesRelationCursor));
    quiz.complete = saved.complete === true && quiz.subspacesIntersectionChecked && checkSubspacesClassification(exercise, quiz.subspacesChoices).correct;
    return quiz;
  }
  if (mode === 'complement') {
    if (!rrefStatus(matrix).complete) return quiz;
    const n = original.length;
    const valid = rows => Array.isArray(rows) && rows.length <= n && rows.every(row => Array.isArray(row) && row.length === n && row.every(value => typeof value === 'string' && value.length <= 64));
    if (Array.isArray(saved.complementBases) && saved.complementBases.length === 2) saved.complementBases.forEach((rows, i) => { if (valid(rows)) quiz.complementBases[i] = rows; });
    quiz.complementFirstChecked = saved.complementFirstChecked === true && checkComplementBasis(exercise, quiz.complementBases[0]).correct;
    quiz.complete = saved.complete === true && quiz.complementFirstChecked && checkComplementBasis(exercise, quiz.complementBases[1], quiz.complementBases[0]).correct;
    return quiz;
  }
  if (mode === 'basis') {
    if (exercise.basisTask !== 'expand' && !basisStatus(matrix).complete) return quiz;
    const n = original.length;
    const p = exercise.basisFormat === 'symbolic' ? n : 1;
    const valid = rows => Array.isArray(rows) && rows.length === n && rows.every(row => Array.isArray(row) && row.length === p && row.every(value => typeof value === 'string' && value.length <= 64));
    if (valid(saved.basisWeights)) quiz.basisWeights = saved.basisWeights;
    if (valid(saved.basisValues)) quiz.basisValues = saved.basisValues;
    quiz.basisWeightsChecked = saved.basisWeightsChecked === true && checkBasisAnswer(exercise, quiz.basisWeights, 'weights').correct;
    quiz.complete = saved.complete === true && (exercise.basisTask !== 'expand' || quiz.basisWeightsChecked) && checkBasisAnswer(exercise, quiz.basisValues).correct;
    return quiz;
  }
  if (mode === 'independence') {
    quiz.independenceEchelonAccepted = saved.independenceEchelonAccepted === true && independenceEchelonStatus(matrix).complete;
    if (!rrefStatus(matrix).complete && !quiz.independenceEchelonAccepted) return quiz;
    quiz.independenceChoice = ['independent', 'dependent'].includes(saved.independenceChoice) ? saved.independenceChoice : '';
    quiz.coefficients = Array.from({length: familyColumns(original)}, (_, i) => Array.isArray(saved.coefficients) && typeof saved.coefficients[i] === 'string' && saved.coefficients[i].length <= 64 ? saved.coefficients[i] : '0');
    quiz.complete = saved.complete === true && checkIndependence(original, quiz.independenceChoice, quiz.coefficients).correct;
    return quiz;
  }
  if (mode === 'dual') {
    if (!dualStatus(matrix).complete) return quiz;
    const n = coordinateCount(matrix);
    quiz.dualKind = saved.dualKind === 'whole' ? 'whole' : 'equations';
    if (Array.isArray(saved.equations) && saved.equations.length <= n && saved.equations.every(row => Array.isArray(row) && row.length === n && row.every(value => typeof value === 'string' && value.length <= 64))) quiz.equations = saved.equations;
    quiz.complete = saved.complete === true && checkDualEquations(original, quiz.dualKind === 'whole' ? [] : quiz.equations).correct;
    quiz.dualBasisShown = saved.dualBasisShown === true || quiz.complete;
    return quiz;
  }
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

function freshState(level = 'first', exerciseNumber = 1, mode = 'homogeneous', representation = 'vectors', basisTask = 'find', basisFormat = 'numeric', complementAmbient = 'full') {
  const exercise = mode === 'subspaces' ? generateSubspacesExercise(level, Math.random, {representation, ambientKind: complementAmbient}) : mode === 'complement' ? generateComplementExercise(level, Math.random, {representation, ambientKind: complementAmbient}) : mode === 'basis' ? generateBasisExercise(level, Math.random, {representation, task: basisTask, format: basisFormat}) : mode === 'independence' ? generateIndependenceExercise(level, Math.random, {representation}) : {original: mode === 'dual' ? generateDualExercise(level) : generateExercise(level, Math.random, {mode})};
  const result = {level, mode, exerciseNumber, ...exercise, frames: [{matrix: exercise.original, operation: null}], cursor: 0, basisCursor: 0, quiz: emptyQuiz()};
  result.systemEntry = freshSystemEntry(result);
  return result;
}

function deserializeState(saved) {
  try {
    if (!saved || ![1, 2, 3, 4, 5, 6, 7].includes(saved.version) || !Object.keys(LEVELS).includes(saved.level)) return null;
    if (!Array.isArray(saved.original) || saved.original.length < (saved.mode === 'dual' ? 1 : 2) || saved.original.length > 8 || !Array.isArray(saved.original[0])) return null;
    if (saved.mode === 'dual' && saved.version === 2) {
      const n = saved.original.length;
      const m = saved.original[0].length - n;
      if (!LEVELS[saved.level].sizes.includes(n) || m < 1 || m > 8 || !saved.original.every((row, i) => Array.isArray(row) && row.length === m + n && row.every(value => typeof value === 'string' && /^-?\d$/.test(value)) && row.slice(m).every((value, j) => value === (i === j ? '1' : '0')))) return null;
      // As antigas operações atuavam nas coordenadas. Conserva os geradores,
      // mas inicia um novo percurso com cada gerador numa linha de B.
      saved = {...saved, version: 3, original: Array.from({length: m}, (_, j) => saved.original.map(row => row[j]).concat('0')), events: [], cursor: 0, quiz: null, methodUpdated: true};
    }
    let mode = saved.version === 1 ? 'matrix' : saved.mode;
    if (!Object.keys(exerciseModes).includes(mode) || saved.version === 3 && mode !== 'dual' || saved.version === 4 && mode !== 'independence' || mode === 'independence' && saved.version !== 4 || saved.version === 5 && mode !== 'basis' || mode === 'basis' && saved.version !== 5 || saved.version === 6 && mode !== 'complement' || mode === 'complement' && saved.version !== 6 || saved.version === 7 && mode !== 'subspaces' || mode === 'subspaces' && saved.version !== 7) return null;
    const level = saved.version === 1 ? Object.keys(LEVELS).find(key => LEVELS[key].sizes.includes(saved.original.length)) : saved.level;
    const columns = saved.original[0].length;
    const basisExercise = mode === 'basis' ? restoreBasisExercise(saved) : null;
    const complementExercise = mode === 'complement' ? restoreComplementExercise(saved) : null;
    const subspacesExercise = mode === 'subspaces' ? restoreSubspacesExercise(saved) : null;
    if (['basis', 'complement', 'subspaces'].includes(mode)) {
      const exercise = basisExercise || complementExercise || subspacesExercise;
      if (!exercise || !sameMatrix(matrixFrom(saved.original), exercise.original)) return null;
    } else if (mode === 'independence') {
      if (!validIndependenceShape(level, saved.representation, saved.shape) || saved.shape.reduce((a, b) => a * b, 1) !== saved.original.length) return null;
    } else if (!LEVELS[level].sizes.includes(mode === 'dual' ? columns - 1 : saved.original.length)) return null;
    if (!['basis', 'complement', 'subspaces'].includes(mode) && (mode === 'matrix' ? columns < 2 || columns > 8 : mode === 'independence' ? columns < 2 || columns > 9 : columns < 3 || columns > 9)) return null;
    if (!saved.original.every(row => Array.isArray(row) && row.length === columns && row.every(value => typeof value === 'string' && (mode === 'basis' ? value.length <= 64 : /^-?\d$/.test(value))))) return null;
    if (['dual', 'independence'].includes(mode) && !saved.original.every(row => row[columns - 1] === '0')) return null;
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
    const basisCursor = mode === 'basis' && Number.isInteger(saved.basisCursor) ? Math.max(0, Math.min(original.length + 1, saved.basisCursor)) : 0;
    const quiz = restoreQuiz(saved.quiz, frames[saved.cursor].matrix, mode, original, basisExercise || complementExercise || subspacesExercise);
    const result = {level, mode, representation: saved.representation, shape: saved.shape, ...basisExercise, ...complementExercise, ...subspacesExercise, methodUpdated: saved.methodUpdated === true, exerciseNumber: Number.isSafeInteger(saved.exerciseNumber) && saved.exerciseNumber > 0 ? saved.exerciseNumber : 1, original, frames, cursor: saved.cursor, basisCursor: mode === 'basis' && basisExercise.basisTask === 'expand' && !quiz.complete ? Math.min(original.length, basisCursor) : basisCursor, quiz};
    result.systemEntry = restoreSystemEntry(result, saved.systemEntry);
    return result;
  } catch (_) {
    return null;
  }
}

function restoreSessions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem('escalonar.exercicio.v1'));
    if (saved && [3, 4, 5, 6, 7, 8, 9, 10, 11].includes(saved.version)) {
      const practice = deserializeState(saved.practice) || freshState();
      let demonstration = deserializeState(saved.demonstration);
      // A versão anterior copiava o nível da prática para a demonstração.
      // Atualiza apenas uma demonstração inicial ainda sem progresso.
      if (saved.version === 3 && demonstration && demonstration.level === 'first' && demonstration.frames.length === 1 && !demonstration.quiz.complete && demonstration.quiz.selected.length === 0) {
        demonstration = freshState('standard', demonstration.exerciseNumber, demonstration.mode);
      }
      const combinationPractice = deserializeState(saved.combinationPractice);
      const combinationDemonstration = deserializeState(saved.combinationDemonstration);
      const dualPractice = deserializeState(saved.dualPractice);
      const dualDemonstration = deserializeState(saved.dualDemonstration);
      const independencePractice = deserializeState(saved.independencePractice);
      const independenceDemonstration = deserializeState(saved.independenceDemonstration);
      const basisPractice = deserializeState(saved.basisPractice);
      const basisDemonstration = deserializeState(saved.basisDemonstration);
      const complementPractice = deserializeState(saved.complementPractice);
      const complementDemonstration = deserializeState(saved.complementDemonstration);
      const subspacesPractice = deserializeState(saved.subspacesPractice);
      const subspacesDemonstration = deserializeState(saved.subspacesDemonstration);
      return {practice, demonstration,
        combinationPractice: combinationPractice && combinationPractice.mode === 'combination' ? combinationPractice : null,
        combinationDemonstration: combinationDemonstration && combinationDemonstration.mode === 'combination' ? combinationDemonstration : null,
        dualPractice: dualPractice && dualPractice.mode === 'dual' ? dualPractice : null,
        dualDemonstration: dualDemonstration && dualDemonstration.mode === 'dual' ? dualDemonstration : null,
        independencePractice: independencePractice && independencePractice.mode === 'independence' ? independencePractice : null,
        independenceDemonstration: independenceDemonstration && independenceDemonstration.mode === 'independence' ? independenceDemonstration : null,
        basisPractice: basisPractice && basisPractice.mode === 'basis' ? basisPractice : null,
        basisDemonstration: basisDemonstration && basisDemonstration.mode === 'basis' ? basisDemonstration : null,
        complementPractice: complementPractice && complementPractice.mode === 'complement' ? complementPractice : null,
        complementDemonstration: complementDemonstration && complementDemonstration.mode === 'complement' ? complementDemonstration : null,
        subspacesPractice: subspacesPractice && subspacesPractice.mode === 'subspaces' ? subspacesPractice : null,
        subspacesDemonstration: subspacesDemonstration && subspacesDemonstration.mode === 'subspaces' ? subspacesDemonstration : null,
        topic: ['combination', 'dual', 'independence', 'basis', 'complement', 'subspaces'].includes(saved.topic) ? saved.topic : 'system',
        mode: saved.mode === 'demonstration' ? 'demonstration' : 'practice', demonstrationSource: saved.demonstrationSource, lecture: saved.lecture,
        combinationSource: saved.combinationSource, combinationLecture: saved.combinationLecture};
    }
    return {practice: deserializeState(saved) || freshState(), demonstration: null, mode: 'practice'};
  } catch (_) { return {practice: freshState(), demonstration: null, mode: 'practice'}; }
}
const sessions = restoreSessions();
let viewMode = sessions.mode;
let exerciseTopic = sessions.topic || 'system';
const sessionKey = (mode = viewMode, topic = exerciseTopic) => topic === 'system' ? mode : `${topic}${mode === 'practice' ? 'Practice' : 'Demonstration'}`;
const topicMode = () => exerciseTopic === 'system' ? 'homogeneous' : exerciseTopic;
let state = sessions[sessionKey()] || freshState(viewMode === 'practice' ? 'first' : 'standard', 1, topicMode());
const parameters = createParameterController({context: () => ({topic: exerciseTopic, mode: viewMode}), rerender: () => render(), announce});
function isCombination() { return exerciseTopic === 'combination'; }
function isDual() { return exerciseTopic === 'dual'; }
function isIndependence() { return exerciseTopic === 'independence'; }
function isBasis() { return exerciseTopic === 'basis'; }
function isComplement() { return exerciseTopic === 'complement'; }
function isSubspaces() { return exerciseTopic === 'subspaces'; }
function isExpansion() { return isBasis() && state.basisTask === 'expand'; }
const currentMatrix = () => state.frames[state.cursor].matrix;
const currentStatus = (matrix = currentMatrix()) => isBasis() ? basisStatus(matrix) : isDual() ? dualStatus(matrix) : rrefStatus(matrix);
const independenceReady = (matrix = currentMatrix()) => rrefStatus(matrix).complete || state.quiz.independenceEchelonAccepted && independenceEchelonStatus(matrix).complete;
const currentHint = () => isBasis() ? nextBasisHint(currentMatrix()) : isDual() ? nextDualHint(currentMatrix()) : nextHint(currentMatrix());
const nextExerciseLevel = () => viewMode === 'practice' && state.quiz.complete && state.level === 'first' ? 'standard' : state.level;
let demonstrationSource = sessions.demonstrationSource === 'lecture' ? 'lecture' : 'random';
let lecture = buildLecture(sessions.lecture && sessions.lecture.example, sessions.lecture && sessions.lecture.caseId);
let lectureCursor = sessions.lecture && Number.isInteger(sessions.lecture.cursor) ? sessions.lecture.cursor : 0;
// A versão anterior acrescentava uma linha e um passo indevidos ao exemplo 3.
if (lecture.id === '3' && sessions.lecture && sessions.lecture.version !== 2 && lectureCursor > 1) lectureCursor--;
lectureCursor = Math.max(0, Math.min(lectureCursor, lecture.steps.length));
const isLectureDemo = () => exerciseTopic === 'system' && viewMode === 'demonstration' && demonstrationSource === 'lecture';
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
    version: exercise.mode === 'subspaces' ? 7 : exercise.mode === 'complement' ? 6 : exercise.mode === 'basis' ? 5 : exercise.mode === 'independence' ? 4 : exercise.mode === 'dual' ? 3 : 2, level: exercise.level, mode: exercise.mode, exerciseNumber: exercise.exerciseNumber, methodUpdated: exercise.methodUpdated === true,
    representation: exercise.representation, shape: exercise.shape,
    basisTask: exercise.basisTask, basisFormat: exercise.basisFormat, basisExercise: exercise.mode === 'basis' ? serializeBasisExercise(exercise) : undefined, basisCursor: exercise.basisCursor,
    complementAmbient: exercise.complementAmbient, complementExercise: exercise.mode === 'complement' ? serializeComplementExercise(exercise) : undefined,
    subspacesAmbient: exercise.subspacesAmbient, subspacesExercise: exercise.mode === 'subspaces' ? serializeSubspacesExercise(exercise) : undefined,
    original: serializeMatrix(exercise.original),
    events: exercise.frames.slice(1).map(frame => frame.operation), cursor: exercise.cursor, quiz: exercise.quiz, systemEntry: exercise.systemEntry
  };
}

function save() {
  sessions[sessionKey()] = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 11, mode: viewMode, topic: exerciseTopic, practice: serializeState(sessions.practice), demonstration: serializeState(sessions.demonstration),
      combinationPractice: serializeState(sessions.combinationPractice), combinationDemonstration: serializeState(sessions.combinationDemonstration),
      dualPractice: serializeState(sessions.dualPractice), dualDemonstration: serializeState(sessions.dualDemonstration),
      independencePractice: serializeState(sessions.independencePractice), independenceDemonstration: serializeState(sessions.independenceDemonstration),
      basisPractice: serializeState(sessions.basisPractice), basisDemonstration: serializeState(sessions.basisDemonstration),
      complementPractice: serializeState(sessions.complementPractice), complementDemonstration: serializeState(sessions.complementDemonstration),
      subspacesPractice: serializeState(sessions.subspacesPractice), subspacesDemonstration: serializeState(sessions.subspacesDemonstration),
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
  if (isSubspaces()) return subspacesMatrixMarkup(matrix, state, interactive, title, {numberMarkup, spokenNumber, rowSymbol});
  if (isComplement()) return complementMatrixMarkup(matrix, state, interactive, title, {numberMarkup, spokenNumber, rowSymbol});
  const augmented = state.mode !== 'matrix';
  const rows = isBasis() ? matrix.map(row => row.slice(0, matrix.length).concat(null)) : matrix;
  const lastColumn = rows[0].length - 1;
  const headings = augmented ? `<thead><tr>${rows[0].map((_, i) => `<th scope="col" class="${i === lastColumn ? 'rhs-cell' : ''}" aria-label="${i === lastColumn ? (isCombination() ? 'Termos independentes do vetor u' : 'Termos independentes') : `Coeficientes de ${isBasis() ? 'lambda' : isDual() ? 'c' : isCombination() || isIndependence() ? 'alfa' : 'x'} ${i + 1}`}">${i === lastColumn ? (isBasis() ? state.basisTask === 'change' ? 'B[u]<sub>b</sub>' : '[u]<sub>can</sub>' : isDual() || isIndependence() ? '0' : isCombination() ? 'u' : 'b') : variableSymbol(i)}</th>`).join('')}</tr></thead>` : '';
  const table = `<div class="bracketed"><table class="matrix-table"><caption class="sr-only">${title}: ${matrix.length} linhas e ${rows[0].length} colunas${augmented ? ', incluindo os termos independentes na última coluna' : ''}.</caption>${headings}<tbody>${rows.map((row, i) => `<tr data-matrix-row="${i}">${row.map((value, j) => `<td class="${augmented && j === lastColumn ? `rhs-cell${isBasis() && state.basisFormat === 'symbolic' ? ' basis-symbolic-rhs' : ''}` : ''}" aria-label="Linha ${i + 1}, ${augmented && j === lastColumn ? 'termo independente' : `coluna ${j + 1}`}: ${value === null ? basisExpressionText(matrix[i].slice(matrix.length)) : spokenNumber(value)}"><span aria-hidden="true">${value === null ? linearExpression(matrix[i].slice(matrix.length), state, numberMarkup) : numberMarkup(value)}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (!interactive) return table;
  return `<div class="matrix-display ${augmented ? 'has-headers' : ''} ${matrix.length >= 6 ? 'large-matrix' : ''}"><div class="row-pickers" role="group" aria-label="Selecionar linhas para a operação">${matrix.map((_, i) => `<div class="row-picker-slot"><button type="button" class="row-picker" data-pick-row="${i}" aria-label="Escolher linha ${i + 1}" aria-pressed="false">${rowSymbol(i)}</button></div>`).join('')}</div>${table}</div>`;
}

function basisExpressionText(row) {
  if (state.basisFormat === 'numeric') return spokenNumber(row[0]);
  return row.flatMap((value, i) => value.isZero ? [] : [`${spokenNumber(value)} vezes ${row.length <= 3 ? ['x', 'y', 'z'][i] : `x ${i + 1}`}`]).join(' mais ') || '0';
}

function populateRows() {
  selectedRows = {target: Math.min(1, state.original.length - 1), source: 0};
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
    $('#preview-result').innerHTML = affected.map(row => {
      const values = isBasis() ? previewMatrix[row].slice(0, previewMatrix.length) : previewMatrix[row];
      const right = isBasis() ? previewMatrix[row].slice(previewMatrix.length) : null;
      return `<div class="preview-row" aria-label="Resultado da linha ${row + 1}: ${values.map(spokenNumber).join(', ')}${right ? `; ${basisExpressionText(right)}` : ''}"><span class="preview-row-label" aria-hidden="true">${rowSymbol(row)}</span><div class="preview-row-values" aria-hidden="true">${values.map((value, i) => `<span class="${!isBasis() && !isComplement() && !isSubspaces() && state.mode !== 'matrix' && i === values.length - 1 ? 'rhs-value' : ''}">${numberMarkup(value)}</span>`).join('')}${right ? `<span class="rhs-value basis-symbolic-rhs">${linearExpression(right, state, numberMarkup)}</span>` : ''}</div></div>`;
    }).join('');
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
  if (state.original.length === 1) type = 'scale';
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

function expressionMarkup(constant, terms, symbol = variableSymbol) {
  const parts = constant.isZero ? [] : [numberMarkup(constant)];
  terms.forEach(({variable, coefficient}) => {
    if (coefficient.isZero) return;
    const magnitude = new Fraction(coefficient.n < 0n ? -coefficient.n : coefficient.n, coefficient.d);
    const sign = coefficient.n < 0n ? '− ' : parts.length ? '+ ' : '';
    parts.push(`${sign}${magnitude.equals(1) ? '' : `${numberMarkup(magnitude)} · `}${symbol(variable)}`);
  });
  return parts.map(part => `<span class="solution-term">${part}</span>`).join(' ') || '0';
}

function homogeneousExpression(coefficients) {
  return expressionMarkup(Fraction.from(0), coefficients.map((coefficient, variable) => ({coefficient: Fraction.from(coefficient), variable})), coordinateSymbol);
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
  $$('[data-solution-kind]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.solutionKind === kind)));
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
  $$('.exercise-stages li:not([hidden])').forEach((item, i) => {
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

function updateIndependencePreview() {
  $('#independence-preview').hidden = state.quiz.independenceChoice !== 'dependent';
  try { $('#independence-preview').innerHTML = relationMarkup(state, state.quiz.coefficients.map(Fraction.from), numberMarkup); }
  catch (_) { $('#independence-preview').innerHTML = '<p class="solution-placeholder">Preenche os coeficientes para ver a relação proposta.</p>'; }
}

function renderIndependenceFields() {
  const choice = state.quiz.independenceChoice;
  const count = familyColumns(state.original);
  for (let i = 0; i < count; i++) if (state.quiz.coefficients[i] === undefined) state.quiz.coefficients[i] = '0';
  $$('[data-independence-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.independenceChoice === choice)));
  $('#independence-fields').innerHTML = choice === 'dependent' ? state.quiz.coefficients.map((value, i) => `<label class="solution-equation">${variableSymbol(i)} = <input type="text" class="solution-input" data-independence-coefficient="${i}" value="${escapeHTML(value)}" maxlength="64" autocomplete="off" spellcheck="false" aria-label="Coeficiente alfa ${i + 1}" aria-describedby="independence-input-help independence-feedback"></label>`).join('') : '';
  $('#independence-input-help').textContent = choice === 'dependent' ? 'Introduz uma relação que dê o elemento nulo. Pelo menos um coeficiente tem de ser diferente de zero. São aceites quaisquer coeficientes válidos, incluindo frações e múltiplos de uma relação.' : 'Se cada coluna dos elementos tiver pivô, a única solução de Aα = 0 é α = 0 e a família é independente.';
  $('#check-independence').disabled = !choice;
  $('#independence-feedback').hidden = true;
  updateIndependencePreview();
}

function renderIndependenceLearning() {
  const reduced = independenceReady();
  const complete = state.quiz.complete;
  $('#success-panel').hidden = !reduced;
  $('#dependent-question').hidden = true;
  $('#solution-question').hidden = true;
  $('#combination-question').hidden = true;
  $('#dual-question').hidden = true;
  $('#demonstrated-variables').hidden = true;
  $('#independence-question').hidden = !reduced || complete || viewMode === 'demonstration';
  $('#exercise-complete').hidden = !complete;
  const stage = complete ? 2 : reduced ? 1 : 0;
  $$('.exercise-stages li:not([hidden])').forEach((item, i) => {
    item.classList.toggle('is-complete', i < stage);
    if (i === stage && i < 2) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  if (!reduced) return;
  $('#learning-step').textContent = complete ? viewMode === 'demonstration' ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'EXERCÍCIO CONCLUÍDO' : 'CLASSIFICAR A FAMÍLIA';
  $('#learning-title').textContent = complete ? state.quiz.independenceChoice === 'independent' ? 'Família linearmente independente' : 'Família linearmente dependente' : 'A família é independente ou dependente?';
  $('#learning-description').textContent = viewMode === 'demonstration' ? 'O próximo passo interpreta a redução e mostra uma justificação.' : 'Classifica a família. Para provar dependência, apresenta uma relação com coeficientes não todos nulos.';
  if (!complete) { if (viewMode === 'practice') renderIndependenceFields(); return; }
  const model = independenceModel(currentMatrix());
  const independent = state.quiz.independenceChoice === 'independent';
  $('#learning-description').textContent = independent ? `Há ${model.rank} ${model.rank === 1 ? 'pivô para 1 elemento' : `pivôs para ${model.count} elementos`}. A única relação tem todos os coeficientes iguais a zero.` : `Há ${model.rank} ${model.rank === 1 ? 'pivô' : 'pivôs'} para ${model.count} elementos. Existe uma relação não trivial, apresentada abaixo.`;
  $('#accepted-solution').innerHTML = independent ? `<p class="combination-formula">${Array.from({length: model.count}, (_, i) => variableSymbol(i)).join(' = ')} = 0</p><p class="solution-guidance">A família é linearmente independente.</p>` : `<div class="coefficient-values">${state.quiz.coefficients.map((value, i) => `<span>${variableSymbol(i)} = ${numberMarkup(value)}</span>`).join('')}</div>${relationMarkup(state, state.quiz.coefficients, numberMarkup)}<p class="solution-guidance">A soma é o elemento nulo e os coeficientes não são todos nulos. Esta relação prova a dependência.</p>`;
  if (viewMode === 'demonstration') {
    $('#demonstrated-variables').hidden = false;
    $('#demonstrated-variables').innerHTML = `<p class="solution-guidance">${independent ? 'Cada coluna dos elementos tem pivô. Não há coeficientes livres.' : 'Uma coluna sem pivô corresponde a um coeficiente livre. Escolhemos um valor não nulo para um coeficiente livre e zero para os restantes livres, depois simplificamos a relação para obter coeficientes inteiros.'}</p>`;
  }
  const promoted = nextExerciseLevel() !== state.level;
  const count = operationCount();
  $('#completion-description').textContent = `${count} ${count === 1 ? 'operação aplicada' : 'operações aplicadas'}.${promoted ? ' A próxima família será do nível Intermédio.' : ''}`;
  $('#next-exercise').textContent = promoted ? 'Próxima família · Intermédio' : 'Nova família';
}

function renderDualProblem() {
  const generators = generatorPart(state.original);
  const m = generatorCount(state.original);
  const n = coordinateCount(state.original);
  $('#dual-problem').innerHTML = `<div class="card-heading"><h2 id="dual-problem-title">Encontra equações que definam exatamente U</h2><span class="dimension-tag">U ⊆ ℝ<sup>${n}</sup></span></div><p class="dual-given-description">U é o subespaço gerado pelos seguintes vetores:</p><div class="given-vectors">${generators.map((row, i) => `<div class="given-vector">${vectorSymbol(i)} = ${columnVector(row, `Gerador u ${i + 1}`)}</div>`).join('')}</div><div class="combination-bridge"><p>Colocamos os ${m === 1 ? 'componentes do gerador numa linha' : 'geradores nas linhas'} de B e resolvemos <strong>Bc = 0</strong>. As incógnitas ${Array.from({length: n}, (_, i) => variableSymbol(i)).join(', ')} são os coeficientes de uma equação válida em U.</p><p>Cada solução c fornece <span class="combination-formula">${Array.from({length: n}, (_, i) => `<span class="solution-term">${i ? '+ ' : ''}${variableSymbol(i)}${coordinateSymbol(i)}</span>`).join(' ')} = 0</span>. Escolhe soluções independentes que gerem todas as soluções de Bc = 0; as equações correspondentes definem exatamente U.</p>${state.methodUpdated && state.cursor === 0 ? '<p class="dual-migration-note">O exercício guardado foi adaptado ao método com geradores nas linhas. Os geradores foram conservados e a redução recomeça.</p>' : ''}</div>`;
}

function dualSystemMarkup(equations) {
  const n = coordinateCount(state.original);
  if (!equations.length) return `<p class="combination-formula">U = ℝ<sup>${n}</sup></p><p class="solution-guidance">Não há restrições sobre as coordenadas. Um sistema equivalente é 0 = 0.</p>`;
  return `<div class="solution-set dual-set"><span class="solution-set-label">U =</span><div class="solution-set-builder">${setBrace()}<div class="solution-set-body"><table class="solution-vector" aria-label="Vetor genérico de U"><tbody>${Array.from({length: n}, (_, i) => `<tr><td class="solution-component">${coordinateSymbol(i)}</td></tr>`).join('')}</tbody></table><span>∈ ℝ<sup>${n}</sup> :</span><div class="dual-equation-list">${equations.map(row => `<p>${homogeneousExpression(row)} = 0</p>`).join('')}</div></div>${setBrace(true)}</div></div>`;
}

function updateDualPreview() {
  try {
    $('#dual-preview').innerHTML = dualSystemMarkup(state.quiz.dualKind === 'whole' ? [] : state.quiz.equations.map(row => row.map(Fraction.from)));
  } catch (_) { $('#dual-preview').innerHTML = '<p class="solution-placeholder">Preenche os coeficientes com inteiros ou frações para ver as equações.</p>'; }
}

function renderDualFields() {
  const n = coordinateCount(state.original);
  const whole = state.quiz.dualKind === 'whole';
  if (!state.quiz.equations.length) state.quiz.equations = [Array(n).fill('0')];
  $$('[data-dual-kind]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.dualKind === state.quiz.dualKind)));
  $('[data-dual-kind="whole"]').innerHTML = `Todo o espaço ℝ<sup>${n}</sup>`;
  $('#dual-equations').hidden = whole;
  $('#dual-add-equation').hidden = whole;
  $('#dual-add-equation').disabled = state.quiz.equations.length >= n;
  $('#dual-input-help').textContent = whole ? 'Se Bc = 0 só tem a solução c = 0, a única equação é 0 = 0 e U é todo o espaço ambiente.' : 'Em cada equação, os coeficientes que introduzires devem formar uma solução de Bc = 0. Usa soluções independentes suficientes para definir U. São aceites inteiros, frações e sistemas equivalentes. Mantém os zeros que estiverem corretos.';
  $('#dual-equations').innerHTML = state.quiz.equations.map((row, r) => `<fieldset class="dual-equation-entry"><legend>Equação ${r + 1}</legend><div class="dual-equation-terms">${row.map((value, c) => `<label>${c ? '<span aria-hidden="true">+</span>' : ''}<input type="text" class="solution-input" value="${escapeHTML(value)}" data-dual-row="${r}" data-dual-column="${c}" maxlength="64" autocomplete="off" spellcheck="false" aria-label="Coeficiente de x ${c + 1} na equação ${r + 1}" aria-describedby="dual-input-help dual-feedback">${coordinateSymbol(c)}</label>`).join('')}<span>= 0</span></div><button type="button" class="text-button" data-remove-dual-row="${r}" aria-label="Remover equação ${r + 1}" ${state.quiz.equations.length === 1 ? 'disabled' : ''}>Remover equação</button></fieldset>`).join('');
  $('#dual-feedback').hidden = true;
  updateDualPreview();
}

function renderDualKernel() {
  const model = systemSolution(currentMatrix());
  const basis = dualEquations(currentMatrix());
  const groups = `<div class="demo-variable-group"><span>Coeficientes dependentes</span><div>${model.pivots.map(i => `<span class="variable-chip">${variableSymbol(i)}</span>`).join('')}</div></div><div class="demo-variable-group"><span>Coeficientes livres</span><div>${model.free.map(i => `<span class="variable-chip independent">${variableSymbol(i)}</span>`).join('') || '<span class="no-free-variables">Não há coeficientes livres.</span>'}</div></div>`;
  if (!state.quiz.dualBasisShown) { $('#dual-kernel').innerHTML = groups; return; }
  const expressions = model.expressions.map(expression => expressionMarkup(expression.constant, expression.terms.map(term => ({variable: model.free[term.parameter], coefficient: term.coefficient}))));
  $('#dual-kernel').innerHTML = `${groups}<h3>Soluções de Bc = 0</h3><div class="solution-preview">${solutionSetMarkup(expressions, model.free.map(variableSymbol), 'ℝ', 'S<sub>c</sub>')}</div>${basis.length ? `<h3>Uma base das soluções</h3><p class="solution-guidance">Escolhemos sucessivamente um coeficiente livre igual a 1 e os restantes coeficientes livres iguais a 0.</p><div class="dual-basis-list">${basis.map((row, i) => `<div class="dual-basis-item"><p>${variableSymbol(model.free[i])} = 1${model.free.length > 1 ? '; restantes coeficientes livres iguais a 0' : ''}:</p><div class="dual-basis-vector">${normalSymbol(i)} = ${columnVector(row, `Vetor ${i + 1} da base das soluções de Bc igual a zero`)}${state.quiz.complete ? `<span class="dual-equation-link"><span aria-hidden="true">⇒</span><span class="sr-only">fornece a equação</span> ${homogeneousExpression(row)} = 0</span>` : ''}</div></div>`).join('')}</div>` : '<p class="solution-guidance">A única solução é c = 0. Não há vetores numa base do núcleo {0}; a única equação obtida é 0 = 0.</p>'}`;
}

function renderDualLearning() {
  const reduced = currentStatus().complete;
  const complete = state.quiz.complete;
  $('#success-panel').hidden = !reduced;
  $('#dependent-question').hidden = true;
  $('#solution-question').hidden = true;
  $('#combination-question').hidden = true;
  $('#demonstrated-variables').hidden = true;
  $('#dual-kernel').hidden = !reduced || viewMode !== 'demonstration';
  $('#dual-question').hidden = !reduced || complete || viewMode === 'demonstration';
  $('#exercise-complete').hidden = !complete;
  const stage = complete ? 2 : reduced ? 1 : 0;
  $$('.exercise-stages li:not([hidden])').forEach((item, i) => {
    item.classList.toggle('is-complete', i < stage);
    if (i === stage && i < 2) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  if (!reduced) return;
  $('#learning-step').textContent = complete ? viewMode === 'demonstration' ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'EXERCÍCIO CONCLUÍDO' : 'DAS SOLUÇÕES ÀS EQUAÇÕES';
  $('#learning-title').textContent = complete ? 'As equações definem exatamente U' : viewMode === 'demonstration' ? 'Resolver Bc = 0' : 'Que equações definem U?';
  $('#learning-description').textContent = viewMode === 'demonstration' ? state.quiz.dualBasisShown ? 'Os vetores abaixo formam uma base das soluções de Bc = 0. O próximo passo transforma cada vetor numa equação sobre x.' : 'A matriz está reduzida. Identificamos os coeficientes dependentes e livres; o próximo passo mostra as soluções e uma base.' : 'Resolve o sistema homogéneo Bc = 0. Cada solução c fornece os coeficientes de uma equação sobre x. Encontra soluções independentes que gerem o núcleo e escreve as equações correspondentes.';
  if (viewMode === 'demonstration') renderDualKernel();
  if (!complete) { if (viewMode === 'practice') renderDualFields(); return; }
  const n = coordinateCount(state.original);
  const codimension = systemSolution(currentMatrix()).free.length;
  const equations = state.quiz.dualKind === 'whole' ? [] : state.quiz.equations.map(row => row.map(Fraction.from));
  $('#learning-description').textContent = codimension ? `U tem dimensão ${n - codimension}. As equações são satisfeitas por todos os geradores e impõem ${codimension} ${codimension === 1 ? 'condição independente' : 'condições independentes'}. Por isso, o seu conjunto-solução é exatamente U.` : 'Os geradores geram todo o espaço ambiente. Não é necessária nenhuma restrição sobre x.';
  $('#accepted-solution').innerHTML = dualSystemMarkup(equations);
  const promoted = nextExerciseLevel() !== state.level;
  const count = operationCount();
  $('#completion-description').textContent = `${count} ${count === 1 ? 'operação aplicada' : 'operações aplicadas'}.${promoted ? ' O próximo exercício será do nível Intermédio.' : ''}`;
  $('#next-exercise').textContent = promoted ? 'Próximo exercício · Intermédio' : 'Novo exercício';
}

function basisPhase() { return isExpansion() && !state.quiz.basisWeightsChecked ? 'weights' : 'answer'; }

function basisInputValues() {
  const key = basisPhase() === 'weights' ? 'basisWeights' : 'basisValues';
  const n = state.original.length;
  const p = state.basisFormat === 'symbolic' ? n : 1;
  if (!state.quiz[key].length) state.quiz[key] = Array.from({length: n}, () => Array(p).fill('0'));
  return state.quiz[key];
}

function updateBasisPreview() {
  try { $('#basis-preview').innerHTML = basisAnswerMarkup(state, basisInputValues().map(row => row.map(Fraction.from)), numberMarkup, basisPhase()); }
  catch (_) { $('#basis-preview').innerHTML = '<p class="solution-placeholder">Preenche os coeficientes com inteiros ou frações para ver a resposta proposta.</p>'; }
}

function renderBasisLearning() {
  const complete = state.quiz.complete;
  const ready = isExpansion() || currentStatus().complete;
  const phase = basisPhase();
  const demo = viewMode === 'demonstration';
  $('#success-panel').hidden = !ready;
  $('#dependent-question').hidden = true;
  $('#solution-question').hidden = true;
  $('#combination-question').hidden = true;
  $('#independence-question').hidden = true;
  $('#dual-question').hidden = true;
  $('#demonstrated-variables').hidden = true;
  $('#basis-question').hidden = !ready || complete || demo;
  $('#exercise-complete').hidden = !complete;
  const stage = complete ? 2 : isExpansion() ? demo ? state.basisCursor > 0 ? 1 : 0 : phase === 'weights' ? 0 : 1 : ready ? 1 : 0;
  $$('.exercise-stages li:not([hidden])').forEach((item, i) => {
    item.classList.toggle('is-complete', i < stage);
    if (i === stage && i < 2) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  if (isExpansion()) {
    $('#basis-expansion').innerHTML = demo ? expansionMarkup(state, state.basisCursor, complete, numberMarkup) : `<div class="card-heading"><h2>Interpretar as coordenadas</h2></div><div class="basis-expansion-body"><p class="solution-guidance">A primeira coordenada multiplica b₁, a segunda multiplica b₂, e assim sucessivamente. Depois somam-se os resultados.</p>${state.quiz.basisWeightsChecked ? basisCombination(state, state.basisExercise.given, numberMarkup) : '<p class="solution-guidance">Escreve a combinação linear no painel de resposta para continuar.</p>'}</div>`;
    $$('#basis-problem .basis-element').forEach(card => card.classList.toggle('is-next', demo && !complete && card.dataset.basisObject === `b-${state.basisCursor}`));
  }
  if (!ready) return;
  $('#learning-step').textContent = complete ? demo ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'EXERCÍCIO CONCLUÍDO' : isExpansion() ? phase === 'weights' && !demo ? 'INTERPRETAR AS COORDENADAS' : 'CALCULAR O ELEMENTO' : 'COORDENADAS NA BASE PEDIDA';
  $('#learning-title').textContent = complete ? isExpansion() ? 'Combinação linear e elemento calculados' : 'Coordenadas corretas' : isExpansion() ? phase === 'weights' && !demo ? 'Quais são os coeficientes da combinação?' : 'Qual é o elemento u?' : `Quais são as coordenadas na base ${state.basisTask === 'change' ? 'c' : 'b'}?`;
  $('#learning-description').textContent = complete ? 'A igualdade foi verificada com aritmética exata. A posição de cada coordenada corresponde à posição do elemento da base.' : demo ? isExpansion() ? 'A demonstração multiplica cada elemento da base pela coordenada correspondente e soma as parcelas.' : 'A parte dos coeficientes está reduzida à identidade. O próximo passo apresenta as coordenadas.' : 'Conserva a ordem indicada no enunciado. São aceites inteiros e frações equivalentes.';
  if (!complete) {
    if (!demo) {
      const entries = basisInputValues();
      $('#basis-fields').innerHTML = basisInputMarkup(state, entries, numberMarkup, escapeHTML, phase);
      $('#basis-input-help').textContent = `${phase === 'weights' ? 'Introduz o coeficiente que multiplica cada elemento da base b.' : isExpansion() ? 'Calcula as componentes de u nas coordenadas canónicas.' : `Introduz as coordenadas de u na base ${state.basisTask === 'change' ? 'c' : 'b'}.`}${state.basisFormat === 'symbolic' ? ' Em cada expressão, preenche o coeficiente de cada parâmetro; mantém zero nos termos ausentes.' : ' Mantém os zeros que estiverem corretos.'}`;
      $('#basis-back-weights').hidden = !isExpansion() || phase !== 'answer';
      $('#check-basis').textContent = phase === 'weights' ? 'Verificar combinação linear' : 'Verificar resposta';
      $('#basis-feedback').hidden = true;
      updateBasisPreview();
    }
    return;
  }
  const answer = state.quiz.basisValues.map(row => row.map(Fraction.from));
  $('#accepted-solution').innerHTML = basisAnswerMarkup(state, answer, numberMarkup) + basisCombination(state, isExpansion() ? state.basisExercise.given : answer, numberMarkup, state.basisTask === 'change' ? 'c' : 'b');
  const count = operationCount();
  const promoted = nextExerciseLevel() !== state.level;
  $('#completion-description').textContent = `${isExpansion() ? 'Todas as parcelas foram verificadas.' : `${count} ${count === 1 ? 'operação aplicada' : 'operações aplicadas'}.`}${promoted ? ' O próximo exercício será do nível Intermédio.' : ''}`;
  $('#next-exercise').textContent = promoted ? 'Próximo exercício · Intermédio' : 'Novo exercício de bases';
}

function complementInputValues() {
  const phase = state.quiz.complementFirstChecked ? 1 : 0;
  if (!state.quiz.complementBases[phase].length) state.quiz.complementBases[phase] = phase ? state.quiz.complementBases[0].map(row => row.slice()) : [Array(state.original.length).fill('0')];
  return state.quiz.complementBases[phase];
}

function updateComplementPreview() {
  try { $('#complement-preview').innerHTML = complementAnswerMarkup(state, parseComplementEntries(complementInputValues()), numberMarkup, state.quiz.complementFirstChecked ? 'H' : 'F', state.quiz.complementFirstChecked ? 'w' : 'v'); }
  catch (_) { $('#complement-preview').innerHTML = '<p class="solution-placeholder">Preenche as entradas com inteiros ou frações para ver a base proposta.</p>'; }
}

function renderComplementLearning() {
  const ready = currentStatus().complete;
  const complete = state.quiz.complete;
  const firstChecked = state.quiz.complementFirstChecked;
  const demo = viewMode === 'demonstration';
  $('#success-panel').hidden = !ready;
  ['dependent-question', 'solution-question', 'combination-question', 'independence-question', 'dual-question', 'basis-question', 'demonstrated-variables'].forEach(id => { $(`#${id}`).hidden = true; });
  $('#complement-question').hidden = !ready || complete || demo;
  $('#exercise-complete').hidden = !complete;
  const stage = complete ? 3 : !ready ? 0 : firstChecked ? 2 : 1;
  $$('.exercise-stages li:not([hidden])').forEach((item, i) => {
    item.classList.toggle('is-complete', i < stage);
    if (i === stage && stage < 3) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  $('#complement-construction').innerHTML = `<div class="card-heading"><h2>Prolongar uma base de E₁</h2></div><div class="basis-expansion-body">${complementExtensionMarkup(state, currentMatrix(), numberMarkup, ready)}${ready && firstChecked ? `${demo ? complementAnswerMarkup(state, parseComplementEntries(state.quiz.complementBases[0]), numberMarkup) : ''}<h3>Construir outro suplementar</h3><p class="solution-guidance">Somar um vetor não nulo de E₁ a um dos elementos da base de F mantém a propriedade de suplementar e muda o subespaço gerado. Os restantes elementos podem ficar iguais.</p>${demo ? `<p class="combination-formula">${complementSymbol('w', 0)} = ${complementSymbol('v', 0)} + ${complementSymbol('u', complementModel(state, currentMatrix()).retained[0])}</p>` : ''}` : ''}</div>`;
  if (!ready) return;
  $('#learning-step').textContent = complete ? demo ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'EXERCÍCIO CONCLUÍDO' : firstChecked ? 'SEGUNDO SUPLEMENTAR' : 'PRIMEIRO SUPLEMENTAR';
  $('#learning-title').textContent = complete ? 'Dois suplementares diferentes' : firstChecked ? 'Uma base de outro suplementar H' : 'Uma base de um suplementar F';
  $('#learning-description').textContent = complete ? 'Ambos completam E₁ em E e geram subespaços diferentes.' : demo ? firstChecked ? 'O próximo passo altera um elemento da primeira base e apresenta o segundo suplementar.' : 'O próximo passo lê as colunas originais que prolongam a base de E₁.' : firstChecked ? 'A primeira base foi aceite. Altera-a para obter H ≠ F; outra base do mesmo subespaço não basta.' : 'Acrescenta os elementos da tua base. Qualquer escolha que satisfaça E = E₁ ⊕ F é aceite.';
  if (complete) {
    $('#accepted-solution').innerHTML = complementProofMarkup(state, parseComplementEntries(state.quiz.complementBases[0]), parseComplementEntries(state.quiz.complementBases[1]), numberMarkup);
    $('#completion-description').textContent = `As bases foram verificadas com frações exatas.${nextExerciseLevel() !== state.level ? ' O próximo exercício será do nível Intermédio.' : ''}`;
    $('#next-exercise').textContent = nextExerciseLevel() !== state.level ? 'Próximo exercício · Intermédio' : 'Novos subespaços';
  } else if (!demo) {
    $('#complement-first').hidden = !firstChecked;
    $('#complement-first').innerHTML = firstChecked ? `<h3>Primeiro suplementar aceite</h3>${complementAnswerMarkup(state, parseComplementEntries(state.quiz.complementBases[0]), numberMarkup)}` : '';
    $('#complement-input-help').textContent = `Cada cartão é um elemento da base ${firstChecked ? 'de H' : 'de F'}. Usa as coordenadas canónicas e mantém os zeros corretos. ${firstChecked ? 'Os campos começam com a tua primeira base para poderes alterá-la.' : 'Podes acrescentar ou remover elementos.'}`;
    $('#complement-fields').innerHTML = complementInputMarkup(state, complementInputValues(), escapeHTML);
    $('#complement-add').disabled = complementInputValues().length >= state.complementExercise.ambient.length;
    $('#complement-back').hidden = !firstChecked;
    $('#check-complement').textContent = firstChecked ? 'Verificar segundo suplementar' : 'Verificar primeiro suplementar';
    $('#complement-feedback').hidden = true;
    updateComplementPreview();
  }
}

function subspacesPhase() { return !state.quiz.subspacesSumChecked ? 0 : !state.quiz.subspacesIntersectionChecked ? 1 : 2; }

function subspacesInputValues() {
  const phase = subspacesPhase() === 0 ? 0 : 1;
  if (!state.quiz.subspacesValues[phase].length) state.quiz.subspacesValues[phase] = [Array(state.original.length).fill('0')];
  return state.quiz.subspacesValues[phase];
}

function updateSubspacesPreview() {
  const phase = subspacesPhase();
  try {
    const entries = phase === 1 && state.quiz.subspacesIntersectionKind === 'zero' ? [] : parseComplementEntries(subspacesInputValues());
    $('#subspaces-preview').innerHTML = subspaceAnswerMarkup(state, entries, numberMarkup, phase === 0 ? 'sum' : 'intersection');
  } catch (_) { $('#subspaces-preview').innerHTML = '<p class="solution-placeholder">Preenche as entradas com inteiros ou frações para ver a base proposta.</p>'; }
}

function renderSubspacesLearning() {
  const ready = currentStatus().complete;
  const complete = state.quiz.complete;
  const phase = subspacesPhase();
  const demo = viewMode === 'demonstration';
  $('#success-panel').hidden = !ready;
  ['dependent-question', 'solution-question', 'combination-question', 'independence-question', 'dual-question', 'basis-question', 'complement-question', 'demonstrated-variables'].forEach(id => { $(`#${id}`).hidden = true; });
  $('#subspaces-question').hidden = !ready || complete || demo;
  $('#exercise-complete').hidden = !complete;
  const stage = complete ? 4 : !ready ? 0 : phase + 1;
  $$('.exercise-stages li:not([hidden])').forEach((item, i) => {
    item.classList.toggle('is-complete', i < stage);
    if (i === stage && stage < 4) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  const model = ready ? subspacesModel(state, currentMatrix()) : null;
  $('#subspaces-calculation').innerHTML = `<div class="card-heading"><h2>Da redução aos subespaços</h2></div><div class="basis-expansion-body">${ready ? subspacesCalculationMarkup(state, model, state.quiz, demo, numberMarkup) : '<p class="solution-guidance">Reduz M = [U | −V]. Os pivôs permitem obter uma base da soma; as soluções de Uα = Vβ dão os elementos comuns.</p>'}</div>`;
  if (!ready) return;
  $('#learning-step').textContent = complete ? demo ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'EXERCÍCIO CONCLUÍDO' : ['BASE DA SOMA', 'BASE DA INTERSEÇÃO', 'SOMA DIRETA E SUPLEMENTARIDADE'][phase];
  $('#learning-title').textContent = complete ? 'Soma, interseção e suplementaridade' : ['Uma base de E₁ + E₂', 'Uma base de E₁ ∩ E₂', 'Como se relacionam os subespaços?'][phase];
  $('#learning-description').textContent = complete ? 'As bases e as três conclusões foram verificadas com aritmética exata.' : phase === 0 ? 'Usa geradores originais independentes ou qualquer outra base válida da soma.' : phase === 1 ? 'Introduz elementos do espaço E que pertençam aos dois subespaços. Os coeficientes α e β servem para os calcular.' : 'Uma soma direta pode ser menor do que E. Para haver suplementaridade, são necessárias as duas condições.';
  if (complete) {
    const sum = parseComplementEntries(state.quiz.subspacesValues[0]);
    const intersection = state.quiz.subspacesIntersectionKind === 'zero' ? [] : parseComplementEntries(state.quiz.subspacesValues[1]);
    $('#accepted-solution').innerHTML = subspaceAnswerMarkup(state, sum, numberMarkup, 'sum') + subspaceAnswerMarkup(state, intersection, numberMarkup, 'intersection') + subspacesClassificationMarkup(model);
    $('#completion-description').textContent = `Bases independentes que geram exatamente os subespaços pedidos.${nextExerciseLevel() !== state.level ? ' O próximo exercício será do nível Intermédio.' : ''}`;
    $('#next-exercise').textContent = nextExerciseLevel() !== state.level ? 'Próximo exercício · Intermédio' : 'Novos subespaços';
  } else if (!demo) {
    $('#subspaces-basis-editor').hidden = phase === 2;
    $('#subspaces-classification').hidden = phase !== 2;
    $('#subspaces-intersection-kind').hidden = phase !== 1;
    $('#subspaces-back').hidden = phase === 0;
    $('#subspaces-back').textContent = phase === 1 ? 'Rever a base da soma' : 'Rever a interseção';
    $('#check-subspaces').textContent = ['Verificar base da soma', 'Verificar interseção', 'Verificar conclusões'][phase];
    $('#subspaces-feedback').hidden = true;
    if (phase < 2) {
      const zero = phase === 1 && state.quiz.subspacesIntersectionKind === 'zero';
      $('#subspaces-fields').hidden = zero;
      $('#subspaces-add').hidden = zero;
      $('#subspaces-input-help').textContent = zero ? 'A base de {0} é a família vazia. Não se deve incluir o elemento nulo numa base.' : `Cada cartão é um elemento de uma base ${phase === 0 ? 'da soma' : 'da interseção'}. Acrescenta ou remove cartões. Usa as coordenadas canónicas e mantém os zeros corretos.`;
      $('#subspaces-fields').innerHTML = complementInputMarkup(state, subspacesInputValues(), escapeHTML, 'subspaces');
      $('#subspaces-add').disabled = subspacesInputValues().length >= state.original.length;
      $$('[data-subspaces-kind]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.subspacesKind === state.quiz.subspacesIntersectionKind)));
      updateSubspacesPreview();
    } else $$('[data-subspaces-property]').forEach(button => button.setAttribute('aria-pressed', String(state.quiz.subspacesChoices[button.dataset.subspacesProperty] === button.dataset.choice)));
  }
}

function renderLearning() {
  $('#subspaces-question').hidden = true;
  if (isSubspaces()) { renderSubspacesLearning(); return; }
  $('#complement-question').hidden = true;
  if (isComplement()) { renderComplementLearning(); return; }
  $('#basis-question').hidden = true;
  if (isBasis()) { renderBasisLearning(); return; }
  $('#independence-question').hidden = true;
  if (isIndependence()) { renderIndependenceLearning(); return; }
  if (isDual()) { renderDualLearning(); return; }
  $('#dual-question').hidden = true;
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
  $$('.exercise-stages li:not([hidden])').forEach((item, i) => {
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
  $('#system-entry-workspace').hidden = true;
  $('#subspaces-question').hidden = true;
  $('#complement-question').hidden = true;
  $$('[data-exercise-topic]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.exerciseTopic === exerciseTopic)));
  $('h1').textContent = isSubspaces() ? 'Soma e interseção de subespaços' : isComplement() ? 'Espaços suplementares' : isBasis() ? 'Bases e coordenadas' : isIndependence() ? 'Independência linear' : isDual() ? 'Dos geradores às equações' : isCombination() ? 'Combinações lineares' : 'Eliminação de Gauss';
  $('.guide-system-note').innerHTML = isCombination() ? 'Para decidir se u é combinação linear dos vetores dados, coloca esses vetores nas colunas de A e u na última coluna. As incógnitas são os coeficientes α₁, …, αₙ da equação Aα = u. Reduz a matriz e responde se a combinação existe. Se existir, indica uma escolha de coeficientes com inteiros ou frações; qualquer representação válida é aceite. Se obtiveres uma linha com todos os coeficientes nulos e termo independente diferente de zero, usa <strong>Não é combinação linear</strong> para concluir sem terminar a redução.' : systemGuideHTML;
  if (isDual()) $('.guide-system-note').innerHTML = 'No problema dual, coloca os geradores nas linhas de B e resolve Bc = 0. Cada solução c é ortogonal a todos os geradores e dá uma equação c₁x₁ + … + cₙxₙ = 0 válida em U. Escolhe uma base das soluções: toma, sucessivamente, um coeficiente livre igual a 1 e os restantes livres iguais a 0. Cada vetor dessa base fornece uma equação; juntas, definem exatamente U. Uma linha nula da matriz reduzida não fornece uma dessas equações: é preciso resolver Bc = 0. Se a única solução for c = 0, U é todo o espaço ambiente.';
  document.title = `${$('h1').textContent} · escalonar.`;
  $$('[data-view-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.viewMode === viewMode)));
  const lectureMode = isLectureDemo() || isCombinationLecture();
  $('#demo-source-controls').hidden = viewMode !== 'demonstration' || isDual() || isIndependence() || isBasis() || isComplement() || isSubspaces();
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
  $('#system-mode-options').hidden = exerciseTopic !== 'system';
  $('#representation-options').hidden = !isIndependence() && !isBasis() && !isComplement() && !isSubspaces();
  $('#subspaces-settings').hidden = !isSubspaces();
  $('#subspaces-problem').hidden = !isSubspaces();
  $('#subspaces-calculation').hidden = !isSubspaces();
  $$('[data-subspaces-ambient]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.subspacesAmbient === state.subspacesAmbient)));
  $('#complement-settings').hidden = !isComplement();
  $('#complement-problem').hidden = !isComplement();
  $('#complement-construction').hidden = !isComplement();
  $$('[data-complement-ambient]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.complementAmbient === state.complementAmbient)));
  $('#basis-settings').hidden = !isBasis();
  $('#basis-problem').hidden = !isBasis();
  $('#basis-expansion').hidden = !isExpansion();
  $('#workspace .matrix-card').hidden = isExpansion();
  $('#workspace .history-card').hidden = isExpansion();
  $('#workspace .rref-card').hidden = isExpansion();
  $$('[data-basis-task]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.basisTask === state.basisTask)));
  $$('[data-basis-format]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.basisFormat === state.basisFormat)));
  $$('[data-representation]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.representation === state.representation)));
  $('#independence-problem').hidden = !isIndependence();
  $('#combination-problem').hidden = !isCombination() || lectureMode;
  $('#dual-problem').hidden = !isDual();
  $('#dual-kernel').hidden = !isDual();
  $('#workspace').classList.toggle('dual-workspace', isDual());
  $('#workspace').hidden = lectureMode;
  $('#lecture-workspace').hidden = !isLectureDemo();
  $('#combination-lecture-workspace').hidden = !isCombinationLecture();
  $('.exercise-stages').hidden = isCombinationLecture() || !lectureMode && state.quiz.complete && state.quiz.declaredImpossible === true;
  $('#infeasibility-action').hidden = isSubspaces() || isComplement() || isBasis() || isDual() || isIndependence() || viewMode !== 'practice' || state.quiz.complete;
  $('#independence-echelon-action').hidden = !isIndependence() || viewMode !== 'practice' || independenceReady();
  $('#declare-impossible').textContent = isCombination() ? 'Não é combinação linear' : 'Declarar sistema impossível';
  $('#accepted-solution').setAttribute('aria-label', isDual() ? 'Equações que definem U' : isCombination() ? 'Conclusão e coeficientes da combinação linear' : 'Conjunto-solução correto');
  $('#new-exercise').innerHTML = `${icon('refresh')}${isDual() ? 'Novos geradores' : isCombination() ? 'Novos vetores' : 'Novo sistema'}`;
  const stageLabels = isSubspaces() ? ['Reduzir a matriz', 'Base da soma', 'Base da interseção', 'Suplementaridade'] : isComplement() ? ['Prolongar uma base', 'Primeiro suplementar', 'Outro suplementar'] : isBasis() ? isExpansion() ? ['Interpretar coordenadas', 'Calcular o elemento'] : ['Reduzir o sistema', 'Escrever coordenadas'] : isIndependence() ? ['Escalonar Aα = 0', 'Classificar e justificar'] : isDual() ? ['Reduzir Bc = 0', 'Das soluções às equações'] : isCombination() ? ['Reduzir a matriz', 'Decidir se é possível', 'Indicar coeficientes'] : ['Reduzir a matriz', 'Identificar variáveis', 'Dar o conjunto-solução'];
  $('.exercise-stages').classList.toggle('two-stages', isBasis() || isDual() || isIndependence());
  $('.exercise-stages').classList.toggle('four-stages', isSubspaces());
  $$('.exercise-stages li').forEach((item, i) => { item.hidden = i >= stageLabels.length; item.innerHTML = `<span>${i + 1}</span>${stageLabels[i] || ''}`; });
  $('.skip-link').href = isCombinationLecture() ? '#combination-lecture-workspace' : lectureMode ? '#lecture-workspace' : '#workspace';
  const level = nextExerciseLevel();
  const promoted = level !== state.level;
  $('#difficulty').value = level;
  $('.exercise-settings > label').textContent = promoted ? 'Próximo nível' : 'Nível';
  $$('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === state.mode)));
  const sizes = LEVELS[level].sizes.map(size => `${size} × ${size}`);
  $('#size-description').textContent = isDual() || isCombination() ? `${promoted ? 'Próximo exercício' : 'Vetores em ℝⁿ'}: n = ${LEVELS[level].sizes.join(', ')}.` : `${promoted ? 'Próximo sistema' : 'Coeficientes'}: ${sizes.slice(0, -1).join(', ')} ou ${sizes[sizes.length - 1]}.`;
  $('#exercise-instruction').innerHTML = isDual() ? 'Encontra um sistema de equações lineares cujo conjunto-solução seja exatamente o subespaço U gerado pelos vetores dados.' : isCombination() ? `Decide se ${vectorSymbol()} é combinação linear dos vetores dados e determina os coeficientes ${variableSymbol(0)}, …, <span class="variable-symbol">α<sub>n</sub></span>.` : 'Reduz a matriz, identifica as variáveis dependentes e determina o conjunto-solução.';
  $('#system-context').hidden = false;
  const rows = state.original.length;
  const variables = state.original[0].length - 1;
  $('#system-context').innerHTML = `<strong>${isCombination() ? 'Aα = u' : state.mode === 'homogeneous' ? 'Ax = 0' : 'Ax = b, b ≠ 0'}</strong><span>${rows} equações · ${variables} ${isCombination() ? 'coeficientes a determinar · última coluna: vetor u' : 'incógnitas · última coluna: termos independentes'}</span>`;
  $('#matrix-title').textContent = 'Matriz ampliada';
  if (isDual()) {
    $('#system-context').innerHTML = `<strong>Bc = 0</strong><span>${generatorCount(state.original)} ${generatorCount(state.original) === 1 ? 'gerador' : 'geradores'} em ℝ<sup>${coordinateCount(state.original)}</sup> · um gerador por linha inicial</span>`;
    $('#matrix-title').textContent = 'Geradores nas linhas';
    renderDualProblem();
  }
  $('#rref-rules .rref-content > p').textContent = 'A matriz está pronta quando cumpre estas quatro condições:';
  $('#rref-rules summary > span').innerHTML = `<span class="rule-icon" aria-hidden="true">?</span>${isIndependence() && viewMode === 'practice' ? 'Quando está em forma escalonada?' : 'Quando está na forma escalonada reduzida?'}`;
  if (isCombination() && !lectureMode) renderCombinationProblem();
  if (isIndependence()) {
    $('#new-exercise').innerHTML = `${icon('refresh')}Nova família`;
    $('#accepted-solution').setAttribute('aria-label', 'Classificação e justificação da família');
    $('#exercise-instruction').textContent = 'Escalona a matriz e classifica a família. Basta uma forma escalonada, mesmo sem ser reduzida. Se a família for dependente, encontra uma relação não trivial.';
    if (viewMode === 'practice') $('#rref-rules .rref-content > p').textContent = 'Para classificar a família, bastam estas duas condições. Os pivôs não precisam de ser 1 e podem existir entradas não nulas acima deles.';
    $('#size-description').innerHTML = `${REPRESENTATIONS[state.representation]} em ${familySpace(state)} · ${familyColumns(state.original)} ${familyColumns(state.original) === 1 ? 'elemento' : 'elementos'}.`;
    $('#system-context').innerHTML = `<strong>Aα = 0</strong><span>${rows} coordenadas · ${variables} coeficientes α · um elemento por coluna</span>`;
    $('#matrix-title').textContent = 'Matriz dos elementos';
    $('#independence-problem').innerHTML = independenceProblemMarkup(state, {numberMarkup, columnVector});
    $('.guide-system-note').innerHTML = 'Para testar a independência linear, resolve α₁u₁ + ⋯ + αₘuₘ = 0. Coloca os vetores nas colunas de A. Para polinómios, usa os coeficientes na ordem 1, X, X², …; para matrizes, lê as entradas linha a linha, sempre na mesma ordem. Basta obter uma forma escalonada de Aα = 0: não é preciso normalizar os pivôs nem anular as entradas acima deles. Usa «Usar esta forma escalonada» para passar à classificação. Se todas as colunas dos elementos tiverem pivô, a única solução é α = 0 e a família é independente. Uma coluna sem pivô permite obter uma relação não trivial por substituição de baixo para cima. Introduz uma relação válida; qualquer múltiplo não nulo também é aceite.';
  }
  if (isBasis()) {
    $('#new-exercise').innerHTML = `${icon('refresh')}Novo exercício`;
    $('#accepted-solution').setAttribute('aria-label', 'Coordenadas e combinação linear corretas');
    $('#exercise-instruction').textContent = 'Calcula coordenadas, interpreta a escrita numa base e converte entre bases ordenadas.';
    $('#size-description').innerHTML = `${REPRESENTATIONS[state.representation]} em ${familySpace(state)} · ${BASIS_FORMATS[state.basisFormat]}.`;
    $('#system-context').innerHTML = `<strong>${state.basisTask === 'change' ? 'Cλ = B[u]<sub>b</sub>' : 'Bλ = [u]<sub>can</sub>'}</strong><span>λ são as coordenadas na base ${state.basisTask === 'change' ? 'c' : 'b'} · última coluna: ${state.basisFormat === 'symbolic' ? 'expressões nos parâmetros' : 'termos independentes'}</span>`;
    $('#matrix-title').textContent = `Sistema para as coordenadas na base ${state.basisTask === 'change' ? 'c' : 'b'}`;
    $('#basis-problem').innerHTML = basisProblemMarkup(state, numberMarkup);
    $('#rref-rules .rref-content > p').textContent = 'Reduz a parte dos coeficientes à identidade. Aplica as mesmas operações à última coluna, incluindo as expressões simbólicas.';
    $('.guide-system-note').innerHTML = 'Uma base é ordenada: [u]<sub>b</sub> = (λ₁, …, λₙ) significa u = λ₁b₁ + ⋯ + λₙbₙ. Para achar coordenadas, coloca os elementos da base nas colunas de B e resolve Bλ = [u]<sub>can</sub>. Para mudar de b para c, resolve Cλ = B[u]<sub>b</sub>; a resposta é [u]<sub>c</sub>. Para reconstruir o elemento, multiplica e soma as parcelas, conservando a ordem. As bases geradas são válidas. Nos casos simbólicos, cada operação atua sobre toda a expressão em x, y, z ou x₁, …, xₙ.';
  }
  if (isComplement()) {
    $('#new-exercise').innerHTML = `${icon('refresh')}Novos subespaços`;
    $('#accepted-solution').setAttribute('aria-label', 'Bases de dois suplementares diferentes');
    $('#exercise-instruction').textContent = 'Constrói dois suplementares diferentes de E₁ em E e apresenta uma base de cada um.';
    $('#size-description').innerHTML = `${REPRESENTATIONS[state.representation]} em ${familySpace(state)} · ${COMPLEMENT_AMBIENTS[state.complementAmbient]}.`;
    $('#system-context').innerHTML = `<strong>Geradores de E₁ | Base de E</strong><span>Uma coluna por elemento · usa as colunas originais para formar as bases</span>`;
    $('#matrix-title').textContent = 'Matriz de prolongamento';
    $('#complement-problem').innerHTML = complementProblemMarkup(state, numberMarkup);
    $('#rref-rules .rref-content > p').textContent = 'Reduz a matriz inteira. A posição dos pivôs identifica as colunas originais que formam uma base de E.';
    $('.guide-system-note').innerHTML = 'Um suplementar F de E₁ em E satisfaz E = E₁ ⊕ F. Coloca nas primeiras colunas os geradores de E₁ e, à direita, uma base de E. Reduz a matriz inteira. Retém as colunas originais correspondentes aos pivôs: as do primeiro bloco dão uma base de E₁; as acrescentadas do segundo dão uma base de F. Não uses as colunas reduzidas como elementos da base original. Para construir H diferente de F, soma um vetor não nulo de E₁ a um elemento da base de F. Ambas as famílias devem estar em E, ser independentes e completar uma base de E₁. Trocar a ordem ou escalar elementos apenas muda a base de F, sem produzir outro suplementar.';
  }
  if (isSubspaces()) {
    $('#new-exercise').innerHTML = `${icon('refresh')}Novos subespaços`;
    $('#accepted-solution').setAttribute('aria-label', 'Bases da soma e da interseção e conclusões');
    $('#exercise-instruction').textContent = 'Encontra bases da soma e da interseção de dois subespaços e decide se são suplementares em E.';
    $('#size-description').innerHTML = `${REPRESENTATIONS[state.representation]} em ${familySpace(state)} · ${COMPLEMENT_AMBIENTS[state.subspacesAmbient]}.`;
    $('#system-context').innerHTML = '<strong>M = [U | −V]</strong><span>Uα = Vβ para a interseção · lê os geradores originais para a soma</span>';
    $('#matrix-title').textContent = 'Matriz dos dois subespaços';
    $('#subspaces-problem').innerHTML = subspacesProblemMarkup(state, numberMarkup);
    $('#rref-rules .rref-content > p').textContent = 'Reduz M = [U | −V]. Para a soma, conserva as posições dos pivôs; para a interseção, resolve o sistema homogéneo M(α, β) = 0.';
    $('.guide-system-note').innerHTML = 'Dados geradores nas colunas de U e V, reduz M = [U | −V]. Os pivôs selecionam geradores originais independentes para uma base da soma; o sinal das colunas de V não muda a independência. Para a interseção, resolve Uα = Vβ e transforma cada solução (α, β) no elemento comum Uα. Com geradores redundantes, algumas soluções dão 0 ou elementos dependentes: retira-os antes de formar a base da interseção. A base de {0} é a família vazia. A soma é direta quando a interseção é {0}. Os subespaços são suplementares em E quando, além disso, a soma é igual a E.';
  }
}

function clearHint() {
  hint = null;
  $('#hint-content').hidden = true;
  $('#hint-detail').hidden = true;
  $('#hint-button').hidden = false;
  $('#hint-button').setAttribute('aria-expanded', 'false');
  $('#reveal-hint').hidden = false;
  const complete = isIndependence() ? independenceReady() : currentStatus().complete;
  $('#hint-intro').textContent = complete ? isSubspaces() ? 'A matriz está reduzida. Usa os geradores originais para a soma e resolve Uα = Vβ para a interseção.' : isComplement() ? 'Usa as colunas originais correspondentes aos pivôs para prolongar uma base de E₁.' : isBasis() ? 'A parte dos coeficientes é a identidade. Escreve as coordenadas que obtiveste na última coluna.' : isIndependence() ? 'A forma escalonada já permite classificar a família. Justifica a tua resposta.' : isDual() ? 'A matriz está reduzida. Resolve Bc = 0 e transforma uma base das soluções em equações sobre x.' : 'A matriz está reduzida. Continua nas etapas de identificação das variáveis e do conjunto-solução.' : 'Obtém uma sugestão a partir da matriz atual.';
  $('#hint-button').disabled = complete;
}

function render(changedRows = []) {
  const matrix = currentMatrix();
  $('#infeasibility-feedback').hidden = true;
  $('#independence-echelon-feedback').hidden = true;
  renderSettings();
  parameters.render();
  if (parameters.active()) { save(); return; }
  if (systemEntryRequired()) {
    $('#workspace').hidden = true;
    $('#system-entry-workspace').hidden = false;
    $('.exercise-stages').hidden = true;
    $('#demo-controls').hidden = true;
    $('#exercise-number').textContent = String(state.exerciseNumber).padStart(2, '0');
    const plan = systemEntryPlan(state);
    $('#system-entry-workspace').innerHTML = systemEntryMarkup(plan, state.systemEntry);
    $('#exercise-instruction').textContent = plan.matrix ? 'Começa por escrever a matriz a partir dos geradores dados. Depois podes escaloná-la e resolver o exercício.' : 'Começa por escrever o sistema a partir dos dados. Depois podes escaloná-lo e resolver o exercício.';
    $('.skip-link').href = '#system-entry-workspace';
    $('.skip-link').textContent = plan.matrix ? 'Saltar para a matriz a completar' : 'Saltar para o sistema a completar';
    save();
    return;
  }
  $('.skip-link').textContent = 'Saltar para a matriz';
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
  if (isExpansion()) { renderBasisLearning(); syncDemonstration(); save(); return; }
  $('#dimensions').textContent = `${matrix.length} × ${isBasis() ? matrix.length + 1 : matrix[0].length}`;
  $('#matrix-container').innerHTML = matrixMarkup(matrix, true, 'Matriz atual');
  $('#original-matrix').innerHTML = matrixMarkup(state.original);
  $('#undo').disabled = state.cursor === 0;
  $('#redo').disabled = state.cursor === state.frames.length - 1;
  $('#reset').disabled = sameMatrix(matrix, state.original);
  const status = currentStatus(matrix);
  const impossible = state.quiz.complete && state.quiz.declaredImpossible;
  const acceptedEchelon = isIndependence() && state.quiz.independenceEchelonAccepted && independenceEchelonStatus(matrix).complete;
  $('#matrix-status').innerHTML = `<span></span>${impossible ? 'Impossível' : status.complete ? 'Reduzida' : acceptedEchelon ? 'Escalonada' : 'Em curso'}`;
  $('#matrix-status').classList.toggle('is-complete', status.complete || impossible || acceptedEchelon);
  renderLearning();
  const rules = [
    ['zeroRowsLast', 'As linhas nulas estão no fim.'],
    ['leadingOnes', 'O primeiro elemento não nulo de cada linha é 1.'],
    ['staircase', 'Cada pivô está à direita do pivô da linha anterior.'],
    ['clearColumns', 'As colunas com pivô têm zeros nas restantes posições.']
  ];
  const echelonPractice = isIndependence() && viewMode === 'practice';
  const displayedRules = echelonPractice ? rules.filter(([key]) => key === 'zeroRowsLast' || key === 'staircase') : rules;
  const checklistStatus = echelonPractice ? independenceEchelonStatus(matrix) : status;
  $('#rref-checklist').innerHTML = displayedRules.map(([key, text]) => `<li class="${checklistStatus[key] ? 'rule-met' : ''}"><span class="rule-state" aria-hidden="true">${checklistStatus[key] ? icon('check') : '·'}</span><span class="sr-only">${checklistStatus[key] ? 'Cumprida' : 'Por cumprir'}: </span><span>${text}</span></li>`).join('');
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
  if (systemEntryRequired()) return;
  const matrix = operation.type === 'reset' ? state.original : applyOperation(currentMatrix(), operation);
  if (sameMatrix(matrix, currentMatrix())) return;
  state.frames = state.frames.slice(0, state.cursor + 1);
  state.frames.push({matrix, operation});
  state.cursor++;
  state.quiz = emptyQuiz();
  const affected = operation.type === 'reset' ? matrix.map((_, i) => i) : operation.type === 'swap' ? [operation.target, operation.source] : [operation.target];
  render(affected);
  const action = operation.type === 'reset' ? 'Matriz inicial restaurada. Podes desfazer esta ação.' : `${operationDescription(operation)}. Operação aplicada.`;
  announce(`${action}${currentStatus(matrix).complete ? isSubspaces() ? ' A matriz está reduzida. Encontra bases da soma e da interseção.' : isComplement() ? ' A matriz está reduzida. Constrói agora dois suplementares diferentes usando as colunas originais.' : isBasis() ? ' A parte dos coeficientes é a identidade. Escreve as coordenadas na base pedida.' : isIndependence() ? ' A matriz está reduzida. Classifica agora a família e justifica a resposta.' : isDual() ? ' A matriz está reduzida. Resolve Bc igual a zero e transforma as soluções em equações que definem U.' : isCombination() ? ' A matriz está reduzida. Decide agora se u é combinação linear dos vetores dados.' : viewMode === 'practice' ? ' A matriz está reduzida. Identifica agora as variáveis dependentes.' : ' A matriz está reduzida. A demonstração apresenta agora as variáveis dependentes e livres.' : ''}`);
  if (currentStatus(matrix).complete && viewMode === 'practice') $('#learning-title').focus();
}

function createNew(level, mode = state.mode, representation = state.representation || 'vectors', basisTask = state.basisTask || 'find', basisFormat = state.basisFormat || 'numeric', complementAmbient = state.complementAmbient || state.subspacesAmbient || 'full') {
  pauseDemonstration();
  state = freshState(level, state.exerciseNumber + 1, mode, representation, basisTask, basisFormat, complementAmbient);
  populateRows();
  $('#factor').value = '1';
  $('#original-panel').hidden = true;
  $('#toggle-original').setAttribute('aria-expanded', 'false');
  $('#toggle-original').innerHTML = `${icon('eye')}Ver matriz inicial`;
  setOperationType('add');
  render();
  announce(isSubspaces() ? `Soma, interseção e suplementaridade. ${REPRESENTATIONS[representation]}, ${COMPLEMENT_AMBIENTS[complementAmbient]}. Nível ${LEVELS[level].name}.` : isComplement() ? `Dois suplementares diferentes. ${REPRESENTATIONS[representation]}, ${COMPLEMENT_AMBIENTS[complementAmbient]}. Nível ${LEVELS[level].name}.` : isDual() ? `Problema dual: ${generatorCount(state.original)} geradores, ${coordinateCount(state.original)} coordenadas. Nível ${LEVELS[level].name}.` : `${exerciseModes[mode].name}: ${state.original.length} equações e ${state.original[0].length - 1} incógnitas. Nível ${LEVELS[level].name}.`);
}

function requestNew(level, mode = state.mode, representation = state.representation || 'vectors', basisTask = state.basisTask || 'find', basisFormat = state.basisFormat || 'numeric', complementAmbient = state.complementAmbient || state.subspacesAmbient || 'full') {
  if (systemEntryRequired()) render(); else renderSettings();
  const basisInput = state.quiz.basisWeightsChecked || [state.quiz.basisWeights, state.quiz.basisValues].some(rows => rows.some(row => row.some(value => value !== '0')));
  const complementInput = state.quiz.complementFirstChecked || state.quiz.complementBases.some(rows => rows.some(row => row.some(value => value !== '0')));
  const subspacesInput = state.quiz.subspacesSumChecked || state.quiz.subspacesValues.some(rows => rows.some(row => row.some(value => value !== '0'))) || Object.keys(state.quiz.subspacesChoices).length > 0;
  if ((state.systemEntry.started || subspacesInput || complementInput || basisInput || state.frames.length > 1 || state.quiz.selected.length > 0 || state.quiz.combinationChoice || state.quiz.independenceChoice || state.quiz.independenceEchelonAccepted || state.quiz.equations.length > 0 || state.basisCursor > 0) && !state.quiz.complete) {
    pauseDemonstration();
    pendingSettings = {level, mode, representation, basisTask, basisFormat, complementAmbient};
    $('#new-level-name').textContent = LEVELS[level].name;
    $('#new-mode-name').textContent = `${exerciseModes[mode].name}${['independence', 'basis', 'complement', 'subspaces'].includes(mode) ? ` · ${REPRESENTATIONS[representation]}` : ''}${mode === 'basis' ? ` · ${BASIS_TASKS[basisTask]} · ${BASIS_FORMATS[basisFormat]}` : ''}${['complement', 'subspaces'].includes(mode) ? ` · ${COMPLEMENT_AMBIENTS[complementAmbient]}` : ''}`;
    $('#new-dialog').showModal();
  } else createNew(level, mode, representation, basisTask, basisFormat, complementAmbient);
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
  if (isSubspaces()) {
    if (next && viewMode === 'demonstration') {
      markCell(next.pivot, 'cell-pivot', 'pivô da próxima operação');
      markCell(next.target, 'cell-target', next.operation.type === 'swap' ? 'posição de destino do pivô' : 'elemento a anular');
    } else if (currentStatus().complete) {
      const model = subspacesModel(state, currentMatrix());
      const relation = viewMode === 'demonstration' && state.quiz.subspacesRelationCursor > 0 ? model.relations[state.quiz.subspacesRelationCursor - 1] : null;
      $$('#matrix-container tr, #original-matrix tr').forEach(row => Array.from(row.children).forEach((cell, column) => {
        if (model.pivots.includes(column)) { cell.classList.add('extension-retained'); cell.title = 'Gerador original selecionado para uma base da soma'; }
        if (relation && column === relation.freeColumn) { cell.classList.add('extension-added'); cell.title = 'Coeficiente livre escolhido igual a 1 na relação atual'; }
      }));
    }
    return;
  }
  if (isComplement()) {
    if (next && viewMode === 'demonstration') {
      markCell(next.pivot, 'cell-pivot', 'pivô da próxima operação');
      markCell(next.target, 'cell-target', next.operation.type === 'swap' ? 'posição de destino do pivô' : 'elemento a anular');
    } else if (currentStatus().complete) {
      const model = complementModel(state, currentMatrix());
      $$('#matrix-container tr, #original-matrix tr').forEach(row => Array.from(row.children).forEach((cell, column) => {
        if (model.retained.includes(column)) { cell.classList.add('extension-retained'); cell.title = 'Coluna original retida para uma base de E₁'; }
        if (model.added.includes(column)) { cell.classList.add('extension-added'); cell.title = 'Coluna original que prolonga a base de E₁'; }
      }));
    }
    return;
  }
  if (isBasis()) {
    if (viewMode === 'demonstration') {
      if (next) {
        markCell(next.pivot, 'cell-pivot', 'pivô da próxima operação');
        markCell(next.target, 'cell-target', next.operation.type === 'swap' ? 'posição de destino do pivô' : 'elemento a anular');
      } else currentMatrix().forEach((_, i) => markCell({row: i, column: i}, 'cell-pivot', 'pivô de uma coordenada na base pedida'));
    }
    return;
  }
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
        cell.title = model.pivots.includes(column) ? isDual() ? 'Coeficiente dependente' : 'Variável dependente' : isDual() ? 'Coeficiente livre' : 'Variável livre';
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
  if (isExpansion()) {
    $('#workspace .hint-card').hidden = true;
    $('#operation-form').closest('.operation-card').hidden = true;
    $('#workspace').classList.add('is-reduced');
    $('#demo-explanation').textContent = state.quiz.complete ? 'A soma das parcelas dá o elemento u. Os coeficientes usados são as coordenadas indicadas na base b.' : state.basisCursor < state.original.length ? `O próximo passo calcula e soma a parcela ${state.basisCursor + 1}, usando a coordenada da mesma posição.` : 'Todas as parcelas foram somadas. O próximo passo apresenta a resposta final.';
    $('#demo-legend').innerHTML = '<span><i class="target-key"></i>Próximo elemento da base a usar</span>';
    syncDemoTransport();
    return;
  }
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
  const reduced = currentStatus().complete;
  const finished = reduced || state.quiz.complete;
  const next = demo ? currentHint() : null;
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
  $$('.operation-tabs button, .row-choice').forEach(button => { button.disabled = demo || finished || state.original.length === 1 && button.dataset.operation && button.dataset.operation !== 'scale'; });
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
  if (isDual() && !next) {
    $('#demo-explanation').textContent = state.quiz.complete ? 'Cada vetor da base das soluções de Bc = 0 fornece os coeficientes de uma equação. O conjunto-solução dessas equações é U.' : state.quiz.dualBasisShown ? 'Já temos uma base das soluções de Bc = 0. O próximo passo transforma cada vetor numa equação em x.' : 'A matriz está reduzida. O próximo passo resolve Bc = 0 e constrói uma base das soluções.';
    $('#demo-legend').innerHTML = '<span><i class="pivot-key"></i>Coeficiente dependente</span><span><i class="free-key"></i>Coeficiente livre</span>';
  }
  if (isIndependence() && !next) {
    $('#demo-explanation').textContent = state.quiz.complete ? 'A classificação está justificada abaixo. Uma família dependente admite uma relação com coeficientes não todos nulos.' : 'A matriz está reduzida. O próximo passo verifica os pivôs e apresenta a classificação e uma justificação.';
    $('#demo-legend').innerHTML = '<span><i class="pivot-key"></i>Coluna com pivô</span><span><i class="free-key"></i>Coluna sem pivô</span>';
    if (demo && reduced) $('#row-legend').innerHTML = '<span><i class="legend-target"></i>Com pivô</span><span><i class="legend-source"></i>Sem pivô</span>';
  }
  if (isBasis() && !next) {
    $('#demo-explanation').textContent = state.quiz.complete ? 'As coordenadas na base pedida e a combinação linear correspondente estão apresentadas abaixo.' : 'A parte dos coeficientes é a identidade. O próximo passo lê as coordenadas na última coluna.';
    $('#demo-legend').innerHTML = '<span><i class="pivot-key"></i>Pivô de uma coordenada</span>';
    if (demo && reduced) $('#row-legend').innerHTML = '<span><i class="legend-target"></i>Pivôs das coordenadas</span>';
  }
  if (isComplement() && reduced) {
    $('#demo-explanation').textContent = state.quiz.complete ? 'Os dois subespaços completam E₁ em E e são diferentes.' : state.quiz.complementFirstChecked ? 'O próximo passo soma um vetor não nulo de E₁ a um elemento da primeira base. Assim obtemos um suplementar diferente.' : 'O próximo passo lê as colunas originais que prolongam a base de E₁ e apresenta o primeiro suplementar.';
    const legend = '<span><i class="pivot-key"></i>Base de E₁</span><span><i class="free-key"></i>Elementos acrescentados</span>';
    $('#demo-legend').innerHTML = legend;
    $('#row-legend').innerHTML = '<span><i class="legend-target"></i>Base de E₁</span><span><i class="legend-source"></i>Elementos acrescentados</span>';
    $('#row-legend').hidden = false;
  }
  if (isSubspaces() && reduced) {
    const phase = subspacesPhase();
    const model = subspacesModel(state, currentMatrix());
    $('#demo-explanation').textContent = state.quiz.complete ? 'As bases da soma e da interseção e as três conclusões estão apresentadas.' : phase === 0 ? 'O próximo passo lê os geradores originais selecionados pelos pivôs e apresenta uma base da soma.' : phase === 1 ? model.relations.length ? `O próximo passo transforma a relação ${Math.min(state.quiz.subspacesRelationCursor + 1, model.relations.length)} de Uα = Vβ num elemento comum. Imagens nulas ou dependentes não entram na base.` : 'O sistema dos coeficientes só tem a solução nula. O próximo passo apresenta a interseção {0}.' : 'O próximo passo compara as dimensões e decide se a soma é direta, igual a E e se há suplementaridade.';
    const relation = demo && state.quiz.subspacesRelationCursor > 0;
    $('#demo-legend').innerHTML = `<span><i class="pivot-key"></i>Geradores da base da soma</span>${relation ? '<span><i class="free-key"></i>Coeficiente livre atual</span>' : ''}`;
    $('#row-legend').innerHTML = `<span><i class="legend-target"></i>Geradores da base da soma</span>${relation ? '<span><i class="legend-source"></i>Coeficiente livre atual</span>' : ''}`;
    $('#row-legend').hidden = false;
  }
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
  if (isExpansion()) {
    state.basisCursor++;
    if (state.basisCursor > state.original.length) {
      state.quiz = {...emptyQuiz(), basisWeightsChecked: true, basisWeights: serializeMatrix(state.basisExercise.given), basisValues: serializeMatrix(basisAnswer(state)), complete: true};
      pauseDemonstration();
    }
    render();
    announce(state.quiz.complete ? 'Elemento reconstruído. A combinação linear e o resultado estão apresentados.' : `Parcela ${state.basisCursor} calculada e somada.`);
    return;
  }
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
  const next = currentHint();
  if (next) commit(next.operation);
  else if (isSubspaces()) {
    const model = subspacesModel(state, currentMatrix());
    const phase = subspacesPhase();
    if (phase === 0) {
      state.quiz.subspacesValues[0] = serializeMatrix(model.sumBasis);
      state.quiz.subspacesSumChecked = true;
    } else if (phase === 1) {
      if (state.quiz.subspacesRelationCursor < model.relations.length) state.quiz.subspacesRelationCursor++;
      if (state.quiz.subspacesRelationCursor === model.relations.length) {
        state.quiz.subspacesValues[1] = serializeMatrix(model.intersectionBasis);
        state.quiz.subspacesIntersectionKind = model.intersection ? 'basis' : 'zero';
        state.quiz.subspacesIntersectionChecked = true;
      }
    } else {
      state.quiz.subspacesChoices = {direct: model.direct ? 'yes' : 'no', spans: model.spans ? 'yes' : 'no', complementary: model.complementary ? 'yes' : 'no'};
      state.quiz.complete = true;
      pauseDemonstration();
    }
    render();
    announce(state.quiz.complete ? 'Soma, interseção e suplementaridade verificadas.' : phase === 0 ? 'Base da soma apresentada.' : 'Relação de coeficientes transformada num elemento comum.');
  }
  else if (isComplement()) {
    const answers = complementAnswers(state, currentMatrix());
    if (!state.quiz.complementFirstChecked) {
      state.quiz.complementBases[0] = serializeMatrix(answers[0]);
      state.quiz.complementFirstChecked = true;
    } else {
      state.quiz.complementBases[1] = serializeMatrix(answers[1]);
      state.quiz.complete = true;
      pauseDemonstration();
    }
    render();
    announce(state.quiz.complete ? 'Dois suplementares diferentes apresentados e verificados.' : 'Primeiro suplementar apresentado. O próximo passo constrói outro subespaço.');
  }
  else if (isBasis()) {
    state.quiz = {...emptyQuiz(), basisValues: serializeMatrix(basisAnswer(state)), complete: true};
    pauseDemonstration();
    render();
    announce('Coordenadas calculadas. A resposta e a combinação linear estão apresentadas.');
  }
  else if (isIndependence()) {
    const model = independenceModel(currentMatrix());
    const relation = dependenceRelation(currentMatrix());
    state.quiz = {...emptyQuiz(), independenceChoice: model.independent ? 'independent' : 'dependent', coefficients: relation ? relation.map(value => value.toString()) : [], complete: true};
    pauseDemonstration();
    render();
    announce('Demonstração de independência linear concluída. A classificação e a justificação estão apresentadas.');
  }
  else if (isDual()) {
    if (!state.quiz.dualBasisShown) {
      state.quiz.dualBasisShown = true;
      render();
      announce('Soluções de Bc igual a zero e base do núcleo apresentadas. O próximo passo dá as equações de U.');
      return;
    }
    const equations = dualEquations(currentMatrix());
    state.quiz = {...emptyQuiz(), dualBasisShown: true, equations: serializeMatrix(equations), dualKind: equations.length ? 'equations' : 'whole', complete: true};
    pauseDemonstration();
    render();
    announce('Demonstração concluída. As equações que definem U estão apresentadas.');
  }
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
    state.quiz = {...emptyQuiz(), selected: model.pivots.slice(), dependentChecked: true, kind: model.type, values, complete: true};
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
  parameters.pause();
  pauseDemonstration();
  sessions[sessionKey()] = state;
  if (!sessions[sessionKey(mode)]) sessions[sessionKey(mode)] = freshState(mode === 'demonstration' ? 'standard' : 'first', 1, state.mode, state.representation, state.basisTask, state.basisFormat, state.complementAmbient || state.subspacesAmbient);
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
  parameters.pause();
  pauseDemonstration();
  sessions[sessionKey()] = state;
  exerciseTopic = topic;
  state = sessions[sessionKey()] || freshState(viewMode === 'practice' ? 'first' : 'standard', 1, topicMode());
  populateRows();
  $('#factor').value = '1';
  setOperationType('add');
  render();
  announce(isSubspaces() ? 'Tema: soma e interseção. Determina as bases e decide se os subespaços são suplementares em E.' : isComplement() ? 'Tema: espaços suplementares. Constrói dois subespaços suplementares diferentes e apresenta uma base de cada um.' : isBasis() ? 'Tema: bases e coordenadas. Escolhe o objetivo, o tipo de elementos e valores numéricos ou simbólicos.' : isIndependence() ? 'Tema: independência linear. Classifica a família e encontra uma relação não trivial se for dependente.' : isDual() ? 'Tema: problema dual. Encontra equações para o subespaço gerado pelos vetores.' : isCombination() ? 'Tema: combinação linear. Os coeficientes são alfa 1, alfa 2, e assim sucessivamente.' : 'Tema: sistema linear. O teu progresso foi recuperado.');
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
  announce(`Ação refeita. A matriz foi atualizada.${currentStatus().complete ? isDual() ? ' A parte dos geradores está reduzida.' : ' A matriz está na forma escalonada reduzida.' : ''}`);
});
$('#reset').addEventListener('click', () => { if (viewMode === 'demonstration') pauseDemonstration(); commit({type: 'reset'}); });
$('#toggle-original').addEventListener('click', () => {
  const show = $('#original-panel').hidden;
  $('#original-panel').hidden = !show;
  $('#toggle-original').setAttribute('aria-expanded', String(show));
  $('#toggle-original').innerHTML = `${icon('eye')}${show ? 'Ocultar matriz inicial' : 'Ver matriz inicial'}`;
});

$('#new-exercise').addEventListener('click', () => { if (parameters.active()) parameters.requestNew(); else requestNew(nextExerciseLevel()); });
$('#next-exercise').addEventListener('click', () => {
  createNew(nextExerciseLevel());
  $('#workspace').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  $('#workspace').focus({preventScroll: true});
});
$('#difficulty').addEventListener('change', event => { if (parameters.active()) parameters.requestNew(event.target.value); else requestNew(event.target.value); });
$$('[data-mode]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.mode !== state.mode) requestNew(nextExerciseLevel(), button.dataset.mode);
}));
$('#confirm-new').addEventListener('click', () => {
  if (parameters.confirmNew()) { $('#new-dialog').close(); return; }
  if (pendingSettings) createNew(pendingSettings.level, pendingSettings.mode, pendingSettings.representation, pendingSettings.basisTask, pendingSettings.basisFormat, pendingSettings.complementAmbient);
  $('#new-dialog').close();
});
$('#new-dialog').addEventListener('close', () => {
  // Um evento de fecho anterior pode chegar depois de o diálogo reabrir.
  if (!$('#new-dialog').open) pendingSettings = null;
});

$$('[data-open-guide]').forEach(button => button.addEventListener('click', () => $('#guide-dialog').showModal()));
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
}));

$('#hint-button').addEventListener('click', () => {
  hint = currentHint();
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

$('#accept-independence-echelon').addEventListener('click', () => {
  if (!isIndependence() || viewMode !== 'practice' || parameters.active() || systemEntryRequired() || state.quiz.complete) return;
  const status = independenceEchelonStatus(currentMatrix());
  if (!status.complete) {
    $('#independence-echelon-feedback').textContent = !status.zeroRowsLast ? 'Coloca todas as linhas nulas no fim antes de concluir a redução.' : 'A matriz ainda não está em forma escalonada. O primeiro elemento não nulo de cada linha deve ficar estritamente à direita do da linha anterior.';
    $('#independence-echelon-feedback').hidden = false;
    return;
  }
  state.quiz.independenceEchelonAccepted = true;
  render();
  $('#learning-title').focus();
  announce('Forma escalonada aceite. Classifica a família e justifica a tua resposta.');
});

$('#declare-impossible').addEventListener('click', () => {
  if (isSubspaces() || isComplement() || isBasis() || isDual() || isIndependence() || viewMode !== 'practice' || state.quiz.complete) return;
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
  if (!isCombination() || viewMode !== 'practice' || systemEntryRequired() || state.quiz.complete || !rrefStatus(currentMatrix()).complete) return;
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

function canAnswerIndependence() {
  return isIndependence() && viewMode === 'practice' && !parameters.active() && !systemEntryRequired() && !state.quiz.complete && independenceReady();
}
function systemEntryRequired() {
  return viewMode === 'practice' && !parameters.active() && !state.systemEntry.complete;
}
function updateSystemEntryField(input, settled = false) {
  updateSystemEntryFeedback($('#system-entry-workspace'), systemEntryPlan(state), state.systemEntry, input, settled);
}
$('#system-entry-workspace').addEventListener('input', event => {
  const input = event.target.closest('[data-system-entry]');
  if (!input || !systemEntryRequired()) return;
  state.systemEntry.entries[input.dataset.systemEntry] = input.value;
  state.systemEntry.started = true;
  updateSystemEntryField(input);
  save();
});
$('#system-entry-workspace').addEventListener('focusout', event => {
  const input = event.target.closest('[data-system-entry]');
  if (input && systemEntryRequired() && input.value.trim()) updateSystemEntryField(input, true);
});
$('#system-entry-workspace').addEventListener('focusin', event => {
  const input = event.target.closest('[data-system-entry]');
  if (input && systemEntryRequired()) updateSystemEntryField(input);
});
$('#system-entry-workspace').addEventListener('submit', event => {
  event.preventDefault();
  if (!systemEntryRequired()) return;
  const result = checkSystemEntry(systemEntryPlan(state), state.systemEntry.entries);
  if (!result.correct) {
    result.incorrect.forEach(field => $(`#system-entry-workspace [data-system-entry="${field.key}"]`).setAttribute('aria-invalid', 'true'));
    const first = $(`#system-entry-workspace [data-system-entry="${result.incorrect[0].key}"]`);
    first.focus();
    updateSystemEntryField(first, true);
    return;
  }
  state.systemEntry.complete = true;
  render();
  $('#workspace').focus({preventScroll: true});
  $('#workspace').scrollIntoView({block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  announce('Correto. Os coeficientes correspondem aos dados. Podes começar a eliminação.');
});
function canAnswerBasis() {
  return isBasis() && viewMode === 'practice' && !systemEntryRequired() && !state.quiz.complete && (isExpansion() || currentStatus().complete);
}
function canAnswerComplement() {
  return isComplement() && viewMode === 'practice' && !systemEntryRequired() && !state.quiz.complete && currentStatus().complete;
}
function canAnswerSubspaces() {
  return isSubspaces() && viewMode === 'practice' && !systemEntryRequired() && !state.quiz.complete && currentStatus().complete;
}
function canEditSubspacesBasis() {
  return canAnswerSubspaces() && subspacesPhase() < 2 && !(subspacesPhase() === 1 && state.quiz.subspacesIntersectionKind === 'zero');
}
$$('[data-subspaces-ambient]').forEach(button => button.addEventListener('click', () => {
  if (isSubspaces() && button.dataset.subspacesAmbient !== state.subspacesAmbient) requestNew(nextExerciseLevel(), state.mode, state.representation, undefined, undefined, button.dataset.subspacesAmbient);
}));
$('#subspaces-fields').addEventListener('input', event => {
  const input = event.target.closest('[data-subspaces-column]');
  if (!input || !canEditSubspacesBasis()) return;
  subspacesInputValues()[Number(input.dataset.subspacesRow)][Number(input.dataset.subspacesColumn)] = input.value;
  input.removeAttribute('aria-invalid');
  $('#subspaces-feedback').hidden = true;
  updateSubspacesPreview();
  save();
});
$('#subspaces-add').addEventListener('click', () => {
  if (!canEditSubspacesBasis() || subspacesInputValues().length >= state.original.length) return;
  const entries = subspacesInputValues();
  entries.push(Array(state.original.length).fill('0'));
  render();
  $(`[data-subspaces-row="${entries.length - 1}"]`).focus();
});
$('#subspaces-fields').addEventListener('click', event => {
  const button = event.target.closest('[data-remove-subspaces]');
  if (!button || !canEditSubspacesBasis() || subspacesInputValues().length === 1) return;
  const index = Number(button.dataset.removeSubspaces);
  subspacesInputValues().splice(index, 1);
  render();
  $(`[data-subspaces-row="${Math.min(index, subspacesInputValues().length - 1)}"]`).focus();
});
$$('[data-subspaces-kind]').forEach(button => button.addEventListener('click', () => {
  if (!canAnswerSubspaces() || subspacesPhase() !== 1) return;
  state.quiz.subspacesIntersectionKind = button.dataset.subspacesKind;
  render();
}));
$$('[data-subspaces-property]').forEach(button => button.addEventListener('click', () => {
  if (!canAnswerSubspaces() || subspacesPhase() !== 2) return;
  state.quiz.subspacesChoices[button.dataset.subspacesProperty] = button.dataset.choice;
  $$('[data-subspaces-property]').forEach(item => item.setAttribute('aria-pressed', String(state.quiz.subspacesChoices[item.dataset.subspacesProperty] === item.dataset.choice)));
  $('#subspaces-feedback').hidden = true;
  save();
}));
$('#subspaces-question').addEventListener('submit', event => {
  event.preventDefault();
  if (!canAnswerSubspaces()) return;
  const phase = subspacesPhase();
  const result = phase < 2 ? checkSubspaceBasis(state, subspacesInputValues(), phase === 0 ? 'sum' : 'intersection', phase === 1 ? state.quiz.subspacesIntersectionKind : 'basis') : checkSubspacesClassification(state, state.quiz.subspacesChoices);
  $$('#subspaces-fields input').forEach(input => input.removeAttribute('aria-invalid'));
  if (!result.correct) {
    $('#subspaces-feedback').textContent = result.message;
    $('#subspaces-feedback').hidden = false;
    if (result.invalid) $(`[data-subspaces-row="${result.invalid.row}"][data-subspaces-column="${result.invalid.column}"]`).setAttribute('aria-invalid', 'true');
    if (result.invalidRow !== undefined) $$(`[data-subspaces-row="${result.invalidRow}"]`).forEach(input => input.setAttribute('aria-invalid', 'true'));
    return;
  }
  if (phase === 0) state.quiz.subspacesSumChecked = true;
  else if (phase === 1) state.quiz.subspacesIntersectionChecked = true;
  else state.quiz.complete = true;
  render();
  $('#learning-title').focus();
  announce(phase === 0 ? 'Base da soma correta. Determina agora a interseção.' : phase === 1 ? 'Interseção correta. Responde às três perguntas sobre os subespaços.' : 'Soma, interseção e suplementaridade corretas. Exercício concluído.');
});
$('#subspaces-back').addEventListener('click', () => {
  if (!canAnswerSubspaces() || subspacesPhase() === 0) return;
  if (subspacesPhase() === 1) state.quiz.subspacesSumChecked = false;
  state.quiz.subspacesIntersectionChecked = false;
  state.quiz.subspacesRelationCursor = 0;
  render();
  $('#learning-title').focus();
});
$$('[data-complement-ambient]').forEach(button => button.addEventListener('click', () => {
  if (isComplement() && button.dataset.complementAmbient !== state.complementAmbient) requestNew(nextExerciseLevel(), state.mode, state.representation, undefined, undefined, button.dataset.complementAmbient);
}));
$('#complement-fields').addEventListener('input', event => {
  const input = event.target.closest('[data-complement-column]');
  if (!input || !canAnswerComplement()) return;
  complementInputValues()[Number(input.dataset.complementRow)][Number(input.dataset.complementColumn)] = input.value;
  input.removeAttribute('aria-invalid');
  $('#complement-feedback').hidden = true;
  updateComplementPreview();
  save();
});
$('#complement-add').addEventListener('click', () => {
  if (!canAnswerComplement() || complementInputValues().length >= state.complementExercise.ambient.length) return;
  const entries = complementInputValues();
  entries.push(Array(state.original.length).fill('0'));
  render();
  $(`[data-complement-row="${entries.length - 1}"]`).focus();
});
$('#complement-fields').addEventListener('click', event => {
  const button = event.target.closest('[data-remove-complement]');
  if (!button || !canAnswerComplement() || complementInputValues().length === 1) return;
  const index = Number(button.dataset.removeComplement);
  complementInputValues().splice(index, 1);
  render();
  $(`[data-complement-row="${Math.min(index, complementInputValues().length - 1)}"]`).focus();
});
$('#complement-question').addEventListener('submit', event => {
  event.preventDefault();
  if (!canAnswerComplement()) return;
  const firstChecked = state.quiz.complementFirstChecked;
  const result = checkComplementBasis(state, complementInputValues(), firstChecked ? state.quiz.complementBases[0] : null);
  $$('#complement-fields input').forEach(input => input.removeAttribute('aria-invalid'));
  if (!result.correct) {
    $('#complement-feedback').textContent = result.message;
    $('#complement-feedback').hidden = false;
    if (result.invalid) $(`[data-complement-row="${result.invalid.row}"][data-complement-column="${result.invalid.column}"]`).setAttribute('aria-invalid', 'true');
    if (result.invalidRow !== undefined) $$(`[data-complement-row="${result.invalidRow}"]`).forEach(input => input.setAttribute('aria-invalid', 'true'));
    return;
  }
  if (firstChecked) state.quiz.complete = true;
  else state.quiz.complementFirstChecked = true;
  render();
  $('#learning-title').focus();
  announce(firstChecked ? 'Resposta correta. Dois suplementares diferentes construídos.' : 'Primeiro suplementar correto. Constrói agora outro subespaço suplementar.');
});
$('#complement-back').addEventListener('click', () => {
  if (!canAnswerComplement()) return;
  state.quiz.complementFirstChecked = false;
  render();
  $('#learning-title').focus();
});
$$('[data-basis-task]').forEach(button => button.addEventListener('click', () => {
  if (isBasis() && button.dataset.basisTask !== state.basisTask) requestNew(nextExerciseLevel(), state.mode, state.representation, button.dataset.basisTask);
}));
$$('[data-basis-format]').forEach(button => button.addEventListener('click', () => {
  if (isBasis() && button.dataset.basisFormat !== state.basisFormat) requestNew(nextExerciseLevel(), state.mode, state.representation, state.basisTask, button.dataset.basisFormat);
}));
$('#basis-fields').addEventListener('input', event => {
  const input = event.target.closest('[data-basis-column]');
  if (!input || !canAnswerBasis()) return;
  basisInputValues()[Number(input.dataset.basisRow)][Number(input.dataset.basisColumn)] = input.value;
  input.removeAttribute('aria-invalid');
  $('#basis-feedback').hidden = true;
  updateBasisPreview();
  save();
});
$('#basis-question').addEventListener('submit', event => {
  event.preventDefault();
  if (!canAnswerBasis()) return;
  const phase = basisPhase();
  const result = checkBasisAnswer(state, basisInputValues(), phase);
  $$('#basis-fields input').forEach(input => input.removeAttribute('aria-invalid'));
  if (!result.correct) {
    $('#basis-feedback').textContent = result.message;
    $('#basis-feedback').hidden = false;
    (result.invalid || []).forEach(({row, column}) => $(`[data-basis-row="${row}"][data-basis-column="${column}"]`).setAttribute('aria-invalid', 'true'));
    return;
  }
  if (phase === 'weights') state.quiz.basisWeightsChecked = true;
  else state.quiz.complete = true;
  render();
  $('#learning-title').focus();
  announce(phase === 'weights' ? 'Combinação linear correta. Calcula agora o elemento u.' : 'Resposta correta. Exercício de bases concluído.');
});
$('#basis-back-weights').addEventListener('click', () => {
  if (!canAnswerBasis() || !isExpansion()) return;
  state.quiz.basisWeightsChecked = false;
  render();
  $('#learning-title').focus();
});
$$('[data-representation]').forEach(button => button.addEventListener('click', () => {
  if ((isIndependence() || isBasis() || isComplement() || isSubspaces()) && button.dataset.representation !== state.representation) requestNew(nextExerciseLevel(), state.mode, button.dataset.representation);
}));
$$('[data-independence-choice]').forEach(button => button.addEventListener('click', () => {
  if (!canAnswerIndependence()) return;
  state.quiz.independenceChoice = button.dataset.independenceChoice;
  renderIndependenceFields();
  save();
}));
$('#independence-fields').addEventListener('input', event => {
  const input = event.target.closest('[data-independence-coefficient]');
  if (!input || !canAnswerIndependence()) return;
  state.quiz.coefficients[Number(input.dataset.independenceCoefficient)] = input.value;
  input.removeAttribute('aria-invalid');
  $('#independence-feedback').hidden = true;
  updateIndependencePreview();
  save();
});
$('#independence-question').addEventListener('submit', event => {
  event.preventDefault();
  if (!canAnswerIndependence()) return;
  const result = checkIndependence(state.original, state.quiz.independenceChoice, state.quiz.coefficients);
  $$('#independence-fields input').forEach(input => input.removeAttribute('aria-invalid'));
  if (!result.correct) {
    $('#independence-feedback').textContent = result.message;
    $('#independence-feedback').hidden = false;
    if (result.invalid !== undefined) $(`[data-independence-coefficient="${result.invalid}"]`).setAttribute('aria-invalid', 'true');
    return;
  }
  state.quiz.complete = true;
  render();
  $('#learning-title').focus();
  announce('Correto. A classificação e a justificação da família estão certas. Exercício concluído.');
});

function canAnswerDual() {
  return isDual() && viewMode === 'practice' && !systemEntryRequired() && !state.quiz.complete && currentStatus().complete;
}
$$('[data-dual-kind]').forEach(button => button.addEventListener('click', () => {
  if (!canAnswerDual()) return;
  state.quiz.dualKind = button.dataset.dualKind;
  renderDualFields();
  save();
}));
$('#dual-add-equation').addEventListener('click', () => {
  if (!canAnswerDual() || state.quiz.equations.length >= coordinateCount(state.original)) return;
  state.quiz.equations.push(Array(coordinateCount(state.original)).fill('0'));
  renderDualFields();
  save();
  $(`[data-dual-row="${state.quiz.equations.length - 1}"][data-dual-column="0"]`).focus();
});
$('#dual-equations').addEventListener('click', event => {
  const button = event.target.closest('[data-remove-dual-row]');
  if (!button || !canAnswerDual() || state.quiz.equations.length <= 1) return;
  const index = Number(button.dataset.removeDualRow);
  state.quiz.equations.splice(index, 1);
  renderDualFields();
  save();
  $(`[data-dual-row="${Math.min(index, state.quiz.equations.length - 1)}"][data-dual-column="0"]`).focus();
});
$('#dual-equations').addEventListener('input', event => {
  const input = event.target.closest('[data-dual-column]');
  if (!input || !canAnswerDual()) return;
  state.quiz.equations[Number(input.dataset.dualRow)][Number(input.dataset.dualColumn)] = input.value;
  input.removeAttribute('aria-invalid');
  $('#dual-feedback').hidden = true;
  updateDualPreview();
  save();
});
$('#dual-question').addEventListener('submit', event => {
  event.preventDefault();
  if (!canAnswerDual()) return;
  const equations = state.quiz.dualKind === 'whole' ? [] : state.quiz.equations;
  const result = checkDualEquations(state.original, equations);
  $$('#dual-equations input').forEach(input => input.removeAttribute('aria-invalid'));
  if (!result.correct) {
    $('#dual-feedback').textContent = result.message;
    $('#dual-feedback').hidden = false;
    if (result.invalid) $(`[data-dual-row="${result.invalid.row}"][data-dual-column="${result.invalid.column}"]`).setAttribute('aria-invalid', 'true');
    if (result.invalidRow !== undefined) $$(`[data-dual-row="${result.invalidRow}"]`).forEach(input => input.setAttribute('aria-invalid', 'true'));
    return;
  }
  state.quiz.complete = true;
  render();
  $('#learning-title').focus();
  announce('Correto. O conjunto-solução das equações é exatamente U. Exercício concluído.');
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
$$('[data-exercise-variant]').forEach(button => button.addEventListener('click', () => { pauseDemonstration(); parameters.setVariant(button.dataset.exerciseVariant === 'parameter'); render(); }));
$('#demo-play').addEventListener('click', () => { if (parameters.active()) { parameters.play(); return; } if (demonstrationPlaying) pauseDemonstration(); else playDemonstration(); });
$('#demo-step').addEventListener('click', () => { if (parameters.active()) { parameters.step(); return; } pauseDemonstration(); advanceDemonstration(); });
$('#demo-restart').addEventListener('click', () => {
  if (parameters.active()) { parameters.restart(); return; }
  pauseDemonstration();
  if (isCombinationLecture()) { combinationLectureCursor = 0; combinationExploration = {}; render(); return; }
  if (isLectureDemo()) { lectureCursor = 0; render(); return; }
  state.frames = [{matrix: state.original, operation: null}];
  state.cursor = 0;
  state.basisCursor = 0;
  state.quiz = emptyQuiz();
  render();
});
$('#demo-speed').addEventListener('change', () => { if (parameters.active()) parameters.speed(); else scheduleDemonstration(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) parameters.pause(); if (document.hidden && viewMode === 'demonstration') pauseDemonstration(); });

populateRows();
setOperationType('add');
render();
