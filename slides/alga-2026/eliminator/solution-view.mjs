function setBrace(closing = false) {
  return `<span class="solution-brace${closing ? ' solution-brace-closing' : ''}"><span class="sr-only">${closing ? '}' : '{'}</span><svg viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M 11 1 C 5 1 5 5 5 10 L 5 40 C 5 47 2 50 1 50 C 2 50 5 53 5 60 L 5 90 C 5 95 5 99 11 99"/></svg></span>`;
}

// Recebe expressões já formatadas pelos renderizadores de frações ou MathML.
export function solutionSetMarkup(expressions, parameters = [], domain = 'ℝ') {
  if (!expressions.length) return '<span class="solution-set">S = ∅</span>';
  const vector = `<table class="solution-vector" aria-label="Vetor coluna da solução"><tbody>${expressions.map(expression => `<tr><td class="solution-component">${expression}</td></tr>`).join('')}</tbody></table>`;
  const condition = parameters.map((variable, index) => `<span class="solution-term">${variable}${index < parameters.length - 1 ? ',' : ` ∈ ${domain}`}</span>`).join(' ');
  return `<div class="solution-set"><span class="solution-set-label">S =</span><div class="solution-set-builder">${setBrace()}<div class="solution-set-body">${vector}${condition ? `<span class="solution-condition">: ${condition}</span>` : ''}</div>${setBrace(true)}</div></div>`;
}
