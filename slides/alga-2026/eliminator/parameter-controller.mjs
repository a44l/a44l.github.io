import {PARAMETER_TOPICS, PARAMETER_TITLE, generateParameterExercise, parameterCases, checkParameterRoots, checkParameterCases, exceptionalReduction} from './parameter-exercises.mjs';
import {escapeParameter, parameterPolynomialMarkup, parameterProblemMarkup, parameterProofMarkup, parameterCasesMarkup, parameterConclusionMarkup} from './parameter-view.mjs';
import {parameterSystemEntryPlan, checkParameterSystemEntryValue, checkSystemEntry, freshSystemEntry, restoreSystemEntry} from './system-entry.mjs';
import {systemEntryMarkup, updateSystemEntryFeedback} from './system-entry-view.mjs';

export const PARAMETER_STORAGE_KEY = 'escalonar.parametros.v1';
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

export function createParameterController({context, rerender, announce}) {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(PARAMETER_STORAGE_KEY)) || {}; } catch (_) { /* sem armazenamento */ }
  const variants = {}, states = {}, exercises = {};
  let timer = null, playing = false, feedback = '', pending = null;
  PARAMETER_TOPICS.forEach(topic => { variants[topic] = !!(saved.variants && saved.variants[topic] === true); });
  function persist() {
    try { localStorage.setItem(PARAMETER_STORAGE_KEY, JSON.stringify({version: 1, variants, states: Object.assign({}, saved.states || {}, states)})); }
    catch (_) { $('#storage-status').textContent = 'O navegador não permitiu guardar o progresso. Mantém esta página aberta.'; }
  }
  function key() { const c = context(); return `${c.topic}:${c.mode}`; }
  function active() { return variants[context().topic] === true; }
  function exercise() { return exercises[key()]; }
  function current() {
    const k = key();
    if (states[k]) return states[k];
    const prior = saved.states && saved.states[k];
    const valid = prior && ['first', 'standard', 'challenge'].includes(prior.level) && Number.isInteger(prior.seed) && prior.seed >= 0 && prior.seed <= 4294967295;
    const state = valid ? {seed: prior.seed, level: prior.level, number: Number.isInteger(prior.number) && prior.number > 0 && prior.number < 100000 ? prior.number : 1, roots: typeof prior.roots === 'string' ? prior.roots.slice(0, 128) : '', none: prior.none === true, rootsChecked: false, answers: {}, complete: false, cursor: 0, proofCase: 'general', proofCursors: {general: 0}} : fresh(context().mode === 'demonstration' ? 'standard' : 'first', 1);
    const e = generateParameterExercise(context().topic, state.level, state.seed);
    const entryPlan = parameterSystemEntryPlan(e);
    state.systemEntry = valid ? restoreSystemEntry(e, prior.systemEntry, entryPlan, checkParameterSystemEntryValue) : freshSystemEntry(e, false, entryPlan);
    if (valid) {
      state.rootsChecked = prior.rootsChecked === true && checkParameterRoots(e, state.roots, state.none).correct;
      parameterCases(e).forEach(item => { state.answers[item.id] = {}; Object.keys(item.answer).forEach(name => { const value = prior.answers && prior.answers[item.id] && prior.answers[item.id][name]; if (typeof value === 'string' && value.length < 16) state.answers[item.id][name] = value; }); });
      state.complete = prior.complete === true && state.rootsChecked && checkParameterCases(e, state.answers).correct;
      state.cursor = Number.isInteger(prior.cursor) ? Math.max(0, Math.min(prior.cursor, timeline(e).length - 1)) : 0;
      state.proofCase = state.rootsChecked && e.roots.some((_, i) => prior.proofCase === `root${i}`) ? prior.proofCase : 'general';
      parameterCases(e).forEach(item => { const value = prior.proofCursors && prior.proofCursors[item.id]; const max = item.id === 'general' ? e.frames.length - 1 : exceptionalReduction(e, item.value).length - 1; state.proofCursors[item.id] = Number.isInteger(value) ? Math.max(0, Math.min(max, value)) : 0; });
    }
    states[k] = state; exercises[k] = e;
    return state;
  }
  function fresh(level, number) { return {seed: Math.floor(Math.random() * 4294967296), level, number, roots: '', none: false, rootsChecked: false, answers: {}, complete: false, cursor: 0, proofCase: 'general', proofCursors: {general: 0}}; }
  function timeline(e) {
    const steps = e.frames.map((_, i) => ({caseId: 'general', frame: i, known: false, text: 'Caso geral. Identifica os pivôs e acompanha a redução sob a condição de o polinómio crítico não se anular.'}));
    steps.push({caseId: 'general', frame: e.frames.length - 1, known: true, text: e.roots.length ? 'Resolve o polinómio crítico igual a zero. Estes valores precisam de ser estudados separadamente.' : 'O polinómio crítico não tem raízes reais. O caso geral vale para todo a ∈ ℝ.'});
    e.roots.forEach((root, i) => exceptionalReduction(e, root).forEach((_, frame) => steps.push({caseId: `root${i}`, frame, known: true, text: `Caso a = ${root}. Substitui na matriz inicial e reduz de novo. Uma divisão válida no caso geral pode não ser válida aqui.`})));
    steps.push({caseId: e.roots.length ? `root${e.roots.length - 1}` : 'general', frame: e.roots.length ? exceptionalReduction(e, e.roots[e.roots.length - 1]).length - 1 : e.frames.length - 1, known: true, done: true, text: 'Demonstração concluída. Compara as conclusões do caso geral e de cada valor crítico.'});
    return steps;
  }
  const demo = () => context().mode === 'demonstration';
  function pause() {
    clearTimeout(timer); timer = null; playing = false;
    if (active() && context().mode === 'demonstration') { $('#demo-play').textContent = 'Iniciar reprodução automática'; $('#demo-play').setAttribute('aria-pressed', 'false'); }
  }
  function syncTransport() {
    const state = current(), steps = timeline(exercise()), done = state.cursor === steps.length - 1;
    $('#demo-play').textContent = playing ? 'Pausar reprodução automática' : 'Iniciar reprodução automática';
    $('#demo-play').setAttribute('aria-pressed', String(playing));
    $('#demo-play').disabled = done;
    $('#demo-step').disabled = done;
  }
  function render() {
    $$('[data-exercise-variant]').forEach(button => button.setAttribute('aria-pressed', String((button.dataset.exerciseVariant === 'parameter') === active())));
    $('#parameter-workspace').hidden = !active();
    if (!active()) return;
    const state = current(), e = exercise(), demonstration = demo(), steps = demonstration ? timeline(e) : null;
    const step = demonstration ? steps[state.cursor] : {caseId: state.proofCase, frame: state.proofCursors[state.proofCase] || 0, known: state.rootsChecked};
    const done = demonstration ? !!step.done : state.complete;
    ['#workspace', '#lecture-workspace', '#combination-lecture-workspace', '#combination-problem', '#dual-problem', '#independence-problem', '#basis-problem', '#complement-problem', '#subspaces-problem', '#basis-settings', '#complement-settings', '#subspaces-settings', '#demo-source-controls', '.exercise-options', '.exercise-stages'].forEach(selector => { $(selector).hidden = true; });
    $('.exercise-toolbar').hidden = false;
    $('#demo-controls').hidden = !demonstration;
    $('#page-title').textContent = PARAMETER_TITLE[e.topic];
    document.title = `${PARAMETER_TITLE[e.topic]} · escalonar.`;
    $('#exercise-instruction').textContent = 'Encontra os valores críticos de a e distingue o caso geral dos casos excecionais. Os polinómios críticos têm grau 1 ou 2.';
    $('#exercise-number').textContent = String(state.number).padStart(2, '0');
    $('#new-exercise').textContent = 'Novo exercício com a';
    $('#difficulty').value = !demonstration && done && state.level === 'first' ? 'standard' : state.level;
    $('.exercise-settings > label').textContent = !demonstration && done && state.level === 'first' ? 'Próximo nível' : 'Nível';
    $('.skip-link').href = '#parameter-workspace';
    $('.skip-link').textContent = 'Saltar para o exercício';
    $('.guide-system-note').textContent = 'Na variante com parâmetro, começa por encontrar as raízes reais do polinómio crítico. Fora desses valores, a redução geral é válida. Para cada raiz, substitui a na matriz inicial e reduz novamente: não substituas numa expressão que divide por zero. A redução guiada é opcional em Praticar. As raízes repetidas só precisam de ser indicadas uma vez. Vetores, polinómios e matrizes são escolhidos aleatoriamente.';
    if (!demonstration && !state.systemEntry.complete) {
      const plan = parameterSystemEntryPlan(e);
      $('#exercise-instruction').textContent = 'Começa por escrever os coeficientes a partir dos objetos dados. Expressões polinomiais equivalentes são aceites.';
      $('#parameter-workspace').innerHTML = parameterProblemMarkup(e) + systemEntryMarkup(plan, state.systemEntry, checkParameterSystemEntryValue, 'parameter-entry');
      persist();
      return;
    }
    const known = demonstration ? step.known : state.rootsChecked;
    const roots = `<section class="card parameter-roots"><h2>1. Valores críticos</h2><p>O pivô que pode anular-se é um múltiplo não nulo de p(a) = ${parameterPolynomialMarkup(e.p)}.</p><p>Quais são as raízes reais de p(a)? São os valores a estudar separadamente, mesmo quando o exercício continua a ser possível nesses casos.</p>${known ? `<p class="parameter-root-result">${e.roots.length ? `Valores críticos: ${e.roots.map(value => value < 0 ? '−' + Math.abs(value) : value).join('; ')}.` : 'Não há raízes reais. O caso geral vale para todo a ∈ ℝ.'}</p>` : demonstration ? '<p>Avança na demonstração para resolver a equação p(a) = 0.</p>' : `<form id="parameter-roots-form"><label for="parameter-roots-input">Raízes de p(a), separadas por ponto e vírgula</label><input id="parameter-roots-input" type="text" inputmode="text" autocomplete="off" placeholder="Por exemplo: −1; 2" value="${escapeParameter(state.roots)}" ${state.none ? 'disabled' : ''}><label class="parameter-none"><input id="parameter-no-roots" type="checkbox" ${state.none ? 'checked' : ''}>Não há raízes reais</label><button class="button button-primary" type="submit">Verificar valores críticos</button></form>`}</section>`;
    const classification = known ? `<section class="card parameter-classification"><h2>2. Conclusões em cada caso</h2>${e.topic === 'subspaces' ? '<p>Usa dim(E₁ ∩ E₂) = dim E₁ + dim E₂ − dim(E₁ + E₂). Para serem suplementares, a interseção tem de ser {0} e a soma tem de ser E.</p>' : ''}${demonstration && !done ? '<p>Estuda as matrizes dos casos excecionais. As conclusões serão apresentadas no fim.</p>' : parameterCasesMarkup(e, state.answers, demonstration, done)}${!demonstration && !done ? '<button class="button button-primary" id="parameter-check-cases">Verificar conclusões</button>' : ''}</section>` : '';
    $('#parameter-workspace').innerHTML = `${parameterProblemMarkup(e)}<div class="parameter-layout"><div>${parameterProofMarkup(e, step.caseId, step.frame, !demonstration, known)}</div><div class="parameter-answer-column">${roots}${classification}<p id="parameter-feedback" class="answer-feedback" role="status" ${feedback ? '' : 'hidden'}>${escapeParameter(feedback)}</p>${done ? `<section class="card parameter-success" role="status"><h2>Exercício concluído</h2><p>Todos os valores reais de a foram estudados.</p>${parameterConclusionMarkup(e)}<button class="button button-primary" data-parameter-new>Próximo exercício</button></section>` : ''}</div></div>`;
    if (demonstration) { $('#demo-explanation').textContent = step.text; $('#demo-legend').hidden = false; syncTransport(); }
    persist();
  }
  function startNew(level) {
    pause(); feedback = '';
    const state = current();
    states[key()] = fresh(level, state.number + 1);
    exercises[key()] = generateParameterExercise(context().topic, level, states[key()].seed);
    states[key()].systemEntry = freshSystemEntry(exercises[key()], false, parameterSystemEntryPlan(exercises[key()]));
    persist(); rerender(); announce('Novo exercício com parâmetro a.');
  }
  function requestNew(level) {
    pause(); const state = current();
    const chosen = level || (!demo() && state.complete && state.level === 'first' ? 'standard' : state.level);
    if (!demo() && !state.complete && (state.systemEntry.started || state.roots.trim() || state.none || state.rootsChecked || Object.keys(state.answers).some(id => Object.keys(state.answers[id]).length))) {
      pending = chosen; $('#new-level-name').textContent = {first: 'Primeiros passos', standard: 'Intermédio', challenge: 'Desafio'}[chosen]; $('#new-mode-name').textContent = PARAMETER_TITLE[context().topic]; $('#new-dialog').showModal();
    } else startNew(chosen);
  }
  function advance() { if (!active() || !demo()) return; const state = current(); state.cursor = Math.min(state.cursor + 1, timeline(exercise()).length - 1); if (state.cursor === timeline(exercise()).length - 1) pause(); rerender(); }
  function schedule() { clearTimeout(timer); if (playing && active() && demo()) timer = setTimeout(() => { advance(); schedule(); }, Number($('#demo-speed').value)); }
  $('#parameter-workspace').addEventListener('input', event => {
    const state = current();
    if (event.target.matches('[data-system-entry]') && !demo() && !state.systemEntry.complete) {
      state.systemEntry.entries[event.target.dataset.systemEntry] = event.target.value;
      state.systemEntry.started = true;
      updateSystemEntryFeedback($('#parameter-workspace'), parameterSystemEntryPlan(exercise()), state.systemEntry, event.target, false, checkParameterSystemEntryValue, 'parameter-entry');
      persist(); return;
    }
    if (event.target.id === 'parameter-roots-input') { state.roots = event.target.value.slice(0, 128); feedback = ''; $('#parameter-feedback').hidden = true; persist(); }
  });
  $('#parameter-workspace').addEventListener('change', event => {
    if (event.target.id !== 'parameter-no-roots') return;
    current().none = event.target.checked; feedback = ''; rerender();
  });
  $('#parameter-workspace').addEventListener('submit', event => {
    if (event.target.id === 'parameter-entry-form') {
      event.preventDefault();
      const state = current();
      if (demo() || state.systemEntry.complete) return;
      const plan = parameterSystemEntryPlan(exercise()), result = checkSystemEntry(plan, state.systemEntry.entries, checkParameterSystemEntryValue);
      if (!result.correct) {
        result.incorrect.forEach(field => $(`#parameter-workspace [data-system-entry="${field.key}"]`).setAttribute('aria-invalid', 'true'));
        const input = $(`#parameter-workspace [data-system-entry="${result.incorrect[0].key}"]`);
        input.focus(); updateSystemEntryFeedback($('#parameter-workspace'), plan, state.systemEntry, input, true, checkParameterSystemEntryValue, 'parameter-entry');
        return;
      }
      state.systemEntry.complete = true; rerender(); announce('Correto. Os coeficientes correspondem aos dados. Estuda agora os valores do parâmetro a.');
      $('#parameter-workspace').focus({preventScroll: true});
      return;
    }
    if (event.target.id !== 'parameter-roots-form') return;
    event.preventDefault();
    const state = current(), result = checkParameterRoots(exercise(), state.roots, state.none);
    state.rootsChecked = result.correct; feedback = result.correct ? '' : result.message;
    rerender();
    if (result.correct) { announce('Valores críticos corretos. Estuda agora cada caso.'); $('#parameter-check-cases').focus({preventScroll: true}); }
    else $('#parameter-roots-input').setAttribute('aria-invalid', 'true');
  });
  ['focusin', 'focusout'].forEach(type => $('#parameter-workspace').addEventListener(type, event => {
    const input = event.target.closest('[data-system-entry]');
    if (input && !demo() && !current().systemEntry.complete && (type === 'focusin' || input.value.trim())) updateSystemEntryFeedback($('#parameter-workspace'), parameterSystemEntryPlan(exercise()), current().systemEntry, input, type === 'focusout', checkParameterSystemEntryValue, 'parameter-entry');
  }));
  $('#parameter-workspace').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button || button.disabled) return;
    const state = current();
    if (button.dataset.parameterAnswer) { const id = button.dataset.parameterAnswer; if (!state.answers[id]) state.answers[id] = {}; state.answers[id][button.dataset.key] = button.dataset.value; feedback = ''; rerender(); $(`[data-parameter-answer="${id}"][data-key="${button.dataset.key}"][data-value="${button.dataset.value}"]`).focus({preventScroll: true}); }
    if (button.dataset.parameterBranch) { state.proofCase = button.dataset.parameterBranch; rerender(); $(`[data-parameter-branch="${state.proofCase}"]`).focus({preventScroll: true}); }
    if (button.dataset.parameterProof) { const id = state.proofCase; const max = id === 'general' ? exercise().frames.length - 1 : exceptionalReduction(exercise(), parameterCases(exercise()).find(item => item.id === id).value).length - 1; state.proofCursors[id] = Math.max(0, Math.min(max, (state.proofCursors[id] || 0) + (button.dataset.parameterProof === 'next' ? 1 : -1))); rerender(); const control = $(`[data-parameter-proof="${button.dataset.parameterProof}"]`); if (!control.disabled) control.focus({preventScroll: true}); }
    if (button.id === 'parameter-check-cases') {
      const result = checkParameterCases(exercise(), state.answers); state.complete = result.correct; feedback = result.correct ? '' : result.message; rerender();
      if (result.correct) announce('Correto. Exercício com parâmetro concluído.');
      else { const element = $(`[data-parameter-case="${result.caseId}"] [data-property="${result.key}"]`); element.classList.add('parameter-error'); element.scrollIntoView({block: 'nearest', behavior: 'smooth'}); const choice = element.querySelector('button'); if (choice) choice.focus({preventScroll: true}); }
    }
    if (button.hasAttribute('data-parameter-new')) requestNew();
  });
  $('#new-dialog').addEventListener('close', () => { if (!$('#new-dialog').open && pending) { pending = null; if (active()) rerender(); } });
  return {active, render, pause, requestNew, confirmNew: () => { if (pending) { const level = pending; pending = null; startNew(level); return true; } return false; }, setVariant: value => { pause(); feedback = ''; variants[context().topic] = value; persist(); }, play: () => { if (playing) pause(); else { playing = true; schedule(); } syncTransport(); }, step: () => { pause(); advance(); }, restart: () => { pause(); current().cursor = 0; rerender(); }, speed: schedule};
}
