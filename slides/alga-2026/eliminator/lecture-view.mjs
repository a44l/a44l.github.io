import {lectureMath, lectureOperation} from './lecture.mjs';
import {solutionSetMarkup} from './solution-view.mjs';

const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
const variable = index => `<span class="variable-symbol">x<sub>${index + 1}</sub></span>`;
const rowName = index => `<span class="variable-symbol">L<sub>${index + 1}</sub></span>`;
const equalPosition = (position, row, column) => position && position.row === row && position.column === column;

function matrixMarkup(matrix, lesson, next, finished, caption) {
  const variableClass = column => !finished || column === lesson.variables ? '' : lesson.solution.pivots.includes(column) ? 'variable-dependent' : 'variable-independent';
  return `<div class="bracketed"><table class="matrix-table lecture-matrix"><caption class="sr-only">${caption}</caption><thead><tr><th scope="col"><span class="sr-only">Linha</span></th>${matrix[0].map((_, column) => `<th scope="col" class="${column === lesson.variables ? 'rhs-cell' : variableClass(column)}">${column === lesson.variables ? 'b' : variable(column)}</th>`).join('')}</tr></thead><tbody>${matrix.map((row, index) => `<tr><th scope="row" class="lecture-row-label">${rowName(index)}</th>${row.map((value, column) => {
    const pivot = equalPosition(next && next.pivot, index, column);
    const target = equalPosition(next && next.target, index, column);
    const contradiction = finished && lesson.solution.type === 'none' && column === lesson.variables && row.slice(0, -1).every(item => item === '0') && value !== '0';
    const label = `${pivot ? ', pivô da próxima operação' : ''}${target ? ', posição a alterar' : ''}${contradiction ? ', contradição' : ''}`;
    return `<td data-row="${index}" data-column="${column}" data-value="${escapeHTML(value)}" class="${column === lesson.variables ? 'rhs-cell' : variableClass(column)} ${pivot ? 'cell-pivot' : ''} ${target || contradiction ? 'cell-target' : ''}" aria-label="Linha ${index + 1}, coluna ${column + 1}: ${escapeHTML(value)}${label}">${lectureMath(value)}</td>`;
  }).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function solutionMarkup(lesson) {
  const model = lesson.solution;
  if (model.type === 'none') return solutionSetMarkup([]);
  return solutionSetMarkup(model.expressions.map(lectureMath), model.free.map(variable), lesson.domain);
}

export function renderLectureWorkspace(lesson, cursor) {
  const focusedId = document.activeElement && document.activeElement.id;
  const originalOpen = $('#lecture-original') && $('#lecture-original').open;
  const notesOpen = $('#lecture-notes') && $('#lecture-notes').open;
  const finished = cursor === lesson.steps.length;
  const matrix = lesson.matrices[cursor];
  const next = lesson.steps[cursor];
  const labels = ['x', 'y', 'z', 't', 'w'].slice(0, lesson.variables);
  const classification = {unique: 'Sistema possível e determinado', infinite: 'Sistema possível e indeterminado', none: 'Sistema impossível'};
  const chips = variables => variables.map(index => `<span class="variable-chip ${lesson.solution.free.includes(index) ? 'independent' : 'dependent'}">${variable(index)}</span>`).join('');
  const notes = lesson.notes.length ? `<details id="lecture-notes" class="lecture-notes" ${notesOpen ? 'open' : ''}><summary>Notas sobre o texto da aula (${lesson.notes.length})</summary>${lesson.notes.map(note => `<p>${escapeHTML(note)}</p>`).join('')}</details>` : '';
  $('#lecture-workspace').classList.toggle('is-reduced', finished);
  $('#lecture-workspace').innerHTML = `<div class="main-column">
    <section class="matrix-card card" aria-labelledby="lecture-title">
      <div class="card-heading"><div class="matrix-title-group"><h2 id="lecture-title">Exemplo ${lesson.id} da aula</h2><span class="dimension-tag">${matrix.length} × ${matrix[0].length}</span></div><span class="status-tag ${finished ? 'is-complete' : ''}"><span></span>${finished ? lesson.solution.type === 'none' ? 'Impossível' : 'Concluído' : 'Em curso'}</span></div>
      <div class="system-context"><strong>Página ${lesson.page}${lesson.selectedCase.condition ? ` · ${escapeHTML(lesson.selectedCase.condition)}` : ''}</strong><span>Correspondência com o texto: ${labels.map((name, index) => `${name} = ${variable(index)}`).join(', ')}.${lesson.domain === 'ℂ' ? ' Coeficientes complexos; i² = −1.' : ''}</span></div>
      <div class="matrix-canvas"><div id="lecture-matrix" class="matrix-scroll" tabindex="0" role="region" aria-label="Matriz do exemplo ${lesson.id}">${matrixMarkup(matrix, lesson, next, finished, 'Matriz atual do exemplo da aula')}</div></div>
      <p class="matrix-scroll-note" id="lecture-scroll-note" hidden>Desliza horizontalmente para ver todas as colunas.</p>
      <details id="lecture-original" class="lecture-original" ${originalOpen ? 'open' : ''}><summary>Ver matriz inicial</summary><div class="matrix-scroll" tabindex="0" role="region" aria-label="Matriz inicial do exemplo">${matrixMarkup(lesson.matrices[0], lesson, null, false, 'Matriz inicial do exemplo da aula')}</div></details>
      <div class="matrix-action-bar"><button id="lecture-back" class="button button-small" ${cursor === 0 ? 'disabled' : ''}>Passo anterior</button><span class="count-tag">Passo ${cursor} de ${lesson.steps.length}</span><button id="lecture-forward" class="button button-small" ${finished ? 'disabled' : ''}>Passo seguinte</button></div>
    </section>
    <section class="history-card card" aria-labelledby="lecture-history-title"><div class="card-heading"><h2 id="lecture-history-title">Operações do exemplo</h2><span class="count-tag">${cursor} de ${lesson.steps.length}</span></div>${cursor ? `<ol id="lecture-history" class="history-list">${lesson.steps.slice(0, cursor).map((step, index) => `<li class="${index === cursor - 1 ? 'current' : ''}"><span class="history-index">${index + 1}</span><span class="history-equation">${lectureOperation(step.operation)}</span></li>`).join('')}</ol>` : '<p class="lecture-history-empty">Avança um passo ou inicia a reprodução automática.</p>'}</section>
  </div><aside class="side-column" aria-label="Explicação do exemplo">
    ${finished ? `<section id="lecture-complete" class="learning-card card"><div class="learning-heading"><span class="eyebrow">EXEMPLO CONCLUÍDO</span><h2>Variáveis e conjunto-solução</h2><p>${classification[lesson.solution.type]}</p></div><div class="demo-variable-group"><span>Dependentes</span><div>${chips(lesson.solution.pivots)}</div></div><div class="demo-variable-group"><span>Livres</span><div>${lesson.solution.free.length ? chips(lesson.solution.free) : '<span class="no-free-variables">Não há variáveis livres.</span>'}</div></div><div id="lecture-solution" class="solution-preview" tabindex="0" role="region" aria-label="Conjunto-solução do exemplo">${solutionMarkup(lesson)}</div><button id="lecture-next-example" class="button button-primary">${lesson.id === '6' ? 'Voltar ao exemplo 1' : 'Exemplo seguinte'}</button></section>` : `<section class="operation-card card" aria-labelledby="lecture-operation-title"><div class="operation-heading"><span class="eyebrow">PASSO ${cursor + 1} DE ${lesson.steps.length}</span><h2 id="lecture-operation-title">Próxima operação</h2><p>${next.reason}</p></div><div id="lecture-operation" class="operation-notation">${lectureOperation(next.operation)}</div><div class="preview"><div class="preview-heading"><span class="eyebrow">RESULTADO DO PRÓXIMO PASSO</span></div><div class="preview-result matrix-scroll" tabindex="0" role="region" aria-label="Linhas após a operação">${(next.operation.type === 'swap' ? [next.operation.target, next.operation.source] : [next.operation.target]).map(index => `<div class="lecture-preview-row">${rowName(index)}<span class="lecture-preview-values">${lesson.matrices[cursor + 1][index].map(lectureMath).join(' &nbsp; ')}</span></div>`).join('')}</div></div></section>`}
    <section class="card lecture-source-note"><p>Segue as operações impressas na página ${lesson.page}, apresentando uma operação de cada vez. Os sistemas impossíveis terminam na contradição indicada no texto.</p>${notes}</section>
  </aside>`;
  if ($('#lecture-history')) $('#lecture-history').scrollTop = $('#lecture-history').scrollHeight;
  if (['lecture-back', 'lecture-forward', 'lecture-next-example'].includes(focusedId)) {
    const replacement = document.getElementById(focusedId);
    (replacement && !replacement.disabled ? replacement : $('#demo-restart')).focus({preventScroll: true});
  }
  document.querySelectorAll('.exercise-stages li').forEach((item, index) => {
    item.classList.toggle('is-complete', finished);
    if (!finished && index === 0) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  requestAnimationFrame(() => {
    const region = $('#lecture-matrix');
    if (region) $('#lecture-scroll-note').hidden = region.scrollWidth <= region.clientWidth + 1;
  });
}
