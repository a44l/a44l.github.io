import {checkSystemEntryValue} from './system-entry.mjs';

const escape = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const termMarkup = term => term ? `<span class="variable-symbol">${term.symbol}${term.index === null ? '' : `<sub>${term.index}</sub>`}</span>` : '';
export function systemEntryMarkup(plan, state, checkValue = checkSystemEntryValue, prefix = 'system-entry') {
  const fieldMarkup = field => {
    const value = state.entries[field.key];
    const result = checkValue(value, field.expected);
    return `<span class="system-entry-term"><input type="text" class="system-entry-input${result.status === 'correct' ? ' is-correct' : ''}" data-system-entry="${field.key}" maxlength="${plan.parameter ? 128 : 64}" autocomplete="off" spellcheck="false" value="${escape(value)}" placeholder="?" aria-label="${escape(`${plan.rows[field.row].label}, ${field.side === 'left' ? 'primeiro' : 'segundo'} membro, coeficiente ${field.column + 1}`)}" aria-describedby="${prefix}-help ${prefix}-feedback" ${['wrong', 'invalid'].includes(result.status) ? 'aria-invalid="true"' : ''}>${plan.matrix ? '' : termMarkup(field.term)}</span>`;
  };
  const equations = plan.rows.map(row => `<div class="system-entry-row"><span class="system-entry-coordinate">${escape(row.label)}</span><div class="system-entry-equation">${row.left.map(fieldMarkup).join('<span class="entry-sign">+</span>')}<span class="entry-sign">=</span>${row.right.map(fieldMarkup).join('<span class="entry-sign">+</span>')}</div></div>`).join('');
  const matrix = plan.matrix ? `<table class="system-entry-table"><thead><tr><th scope="col">Coordenada</th>${plan.headings.map(heading => `<th scope="col">${termMarkup(heading)}</th>`).join('')}</tr></thead><tbody>${plan.rows.map(row => `<tr><th scope="row">${escape(row.label)}</th>${row.left.map(field => `<td>${fieldMarkup(field)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
  const count = plan.fields.filter(field => checkValue(state.entries[field.key], field.expected).status === 'correct').length;
  const help = plan.parameter ? 'Usa expressões em a, por exemplo a-1, a² ou (a-1)(a+1). São aceites expressões equivalentes e divisões por constantes não nulas. Inclui todos os zeros.' : 'Preenche os campos com inteiros ou frações. Os valores são verificados à medida que escreves. Inclui todos os zeros.';
  return `<section class="card system-entry-card"><div class="card-heading"><div><span class="eyebrow">ANTES DE ESCALONAR</span><h2 id="${prefix}-title">${plan.title}</h2></div></div><p>${plan.description}</p><p id="${prefix}-help" class="solution-guidance">${help}</p><form id="${prefix}-form" novalidate><div class="system-entry-scroll" tabindex="0" role="region" aria-label="${plan.matrix ? 'Matriz a completar' : 'Sistema a completar'}">${plan.matrix ? matrix : `<div class="system-entry-system"><svg class="system-entry-brace" viewBox="0 0 20 100" preserveAspectRatio="none" aria-hidden="true"><path d="M18 1C8 1 8 8 8 18V38C8 47 3 48 1 50C3 52 8 53 8 62V82C8 92 8 99 18 99" fill="none" stroke="currentColor" vector-effect="non-scaling-stroke"/></svg><div>${equations}</div></div>`}</div><p class="system-entry-scroll-note">Se necessário, desliza horizontalmente para ver a equação completa.</p><p id="${prefix}-progress" class="solution-guidance">${count} de ${plan.fields.length} valores corretos.</p><p id="${prefix}-feedback" class="answer-feedback" role="status" hidden></p><button class="button button-primary" type="submit">Verificar ${plan.matrix ? 'matriz' : 'sistema'} e começar</button></form></section>`;
}

export function updateSystemEntryFeedback(root, plan, state, input, settled = false, checkValue = checkSystemEntryValue, prefix = 'system-entry') {
  const field = plan.fields.find(item => item.key === input.dataset.systemEntry);
  const result = checkValue(input.value, field.expected, settled);
  input.classList.toggle('is-correct', result.status === 'correct');
  input.setAttribute('aria-invalid', String(['wrong', 'invalid', 'missing'].includes(result.status)));
  const count = plan.fields.filter(item => checkValue(state.entries[item.key], item.expected).status === 'correct').length;
  root.querySelector(`#${prefix}-progress`).textContent = `${count} de ${plan.fields.length} valores corretos.`;
  const feedback = root.querySelector(`#${prefix}-feedback`);
  feedback.hidden = ['correct', 'empty'].includes(result.status);
  feedback.textContent = result.status === 'wrong' ? field.context : result.message;
}
