import {Fraction} from './math.mjs';
import {coordinateLabels, familySpace} from './independence-view.mjs';
import {expansionSum} from './basis.mjs';

export const basisSymbol = (name, index) => `<span class="variable-symbol">${name}<sub>${index + 1}</sub></span>`;
export const parameterSymbol = (i, n) => n <= 3 ? `<span class="variable-symbol">${['x', 'y', 'z'][i]}</span>` : `<span class="variable-symbol">x<sub>${i + 1}</sub></span>`;

export function linearExpression(row, exercise, numberMarkup) {
  if (exercise.basisFormat === 'numeric') return numberMarkup(Fraction.from(row[0]));
  const parts = [];
  row.forEach((entry, i) => {
    const value = Fraction.from(entry);
    if (value.isZero) return;
    const magnitude = value.n < 0n ? value.neg() : value;
    const sign = value.n < 0n ? '− ' : parts.length ? '+ ' : '';
    parts.push(`<span class="solution-term">${sign}${magnitude.equals(1) ? '' : `${numberMarkup(magnitude)} · `}${parameterSymbol(i, row.length)}</span>`);
  });
  return parts.join(' ') || '0';
}

export function expressionColumn(entries, exercise, numberMarkup, label = 'Vetor coluna') {
  return `<table class="solution-vector" aria-label="${label}"><tbody>${entries.map(row => `<tr><td class="solution-component">${linearExpression(row, exercise, numberMarkup)}</td></tr>`).join('')}</tbody></table>`;
}

export function objectMarkup(entries, exercise, numberMarkup, label) {
  if (exercise.representation === 'vectors') return expressionColumn(entries, exercise, numberMarkup, label);
  if (exercise.representation === 'matrices') return `<table class="solution-vector given-matrix" aria-label="${label}"><tbody>${Array.from({length: exercise.shape[0]}, (_, i) => `<tr>${Array.from({length: exercise.shape[1]}, (_, j) => `<td class="solution-component">${linearExpression(entries[i * exercise.shape[1] + j], exercise, numberMarkup)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const parts = [];
  for (let power = entries.length - 1; power >= 0; power--) {
    const row = entries[power].map(Fraction.from);
    if (row.every(value => value.isZero)) continue;
    const monomial = power ? `X${power === 1 ? '' : `<sup>${power}</sup>`}` : '';
    if (exercise.basisFormat === 'symbolic') parts.push(`<span class="solution-term">${parts.length ? '+ ' : ''}${power ? '(' : ''}${linearExpression(row, exercise, numberMarkup)}${power ? ')' : ''}${monomial}</span>`);
    else {
      const value = row[0];
      const magnitude = value.n < 0n ? value.neg() : value;
      parts.push(`<span class="solution-term">${value.n < 0n ? '− ' : parts.length ? '+ ' : ''}${power && magnitude.equals(1) ? '' : numberMarkup(magnitude)}${monomial}</span>`);
    }
  }
  return `<span class="polynomial">${parts.join(' ') || '0'}</span>`;
}

export function basisCombination(exercise, entries, numberMarkup, name = 'b') {
  const parts = entries.flatMap((row, i) => row.every(value => Fraction.from(value).isZero) ? [] : [`<span class="solution-term">${i && entries.slice(0, i).some(previous => previous.some(value => !Fraction.from(value).isZero)) ? '+ ' : ''}(${linearExpression(row, exercise, numberMarkup)}) · ${basisSymbol(name, i)}</span>`]);
  return `<div class="basis-combination combination-formula">u = ${parts.join(' ') || '0'}</div>`;
}

export function basisProblemMarkup(exercise, numberMarkup) {
  const {basis, second, given} = exercise.basisExercise;
  const n = basis.length;
  const source = name => `<div class="basis-ordered-heading"><strong>${name} = (${Array.from({length: n}, (_, i) => basisSymbol(name, i)).join(', ')})</strong><span>Base ordenada</span></div>`;
  const cards = (matrix, name) => `<div class="given-vectors basis-elements">${Array.from({length: n}, (_, i) => `<div class="given-vector basis-element" data-basis-object="${name}-${i}">${basisSymbol(name, i)} = ${objectMarkup(matrix.map(row => [row[i]]), {...exercise, basisFormat: 'numeric'}, numberMarkup, `Elemento ${i + 1} da base ${name}`)}</div>`).join('')}</div>`;
  const task = exercise.basisTask;
  const question = task === 'find' ? 'Determina as coordenadas de u na base b.' : task === 'change' ? 'Determina as coordenadas de u na base c.' : 'Escreve u como combinação linear dos elementos de b e determina u.';
  const givenMarkup = task === 'find' ? `<div class="basis-given"><strong>u =</strong>${objectMarkup(given, exercise, numberMarkup, 'Elemento u nas coordenadas canónicas')}</div>` : `<div class="basis-given"><strong>[u]<sub>b</sub> =</strong>${expressionColumn(given, exercise, numberMarkup, 'Coordenadas de u na base b')}</div>`;
  const tuple = task === 'find' ? '' : `<div class="basis-coordinate-tuple combination-formula">u = (${given.map(row => linearExpression(row, exercise, numberMarkup)).join(', ')})<sub>b</sub></div>`;
  const labels = coordinateLabels(exercise);
  return `<div class="card-heading"><h2 id="basis-problem-title">${question}</h2><span class="dimension-tag">${familySpace(exercise)}</span></div>${source('b')}${cards(basis, 'b')}${second ? `${source('c')}${cards(second, 'c')}` : ''}${givenMarkup}${tuple}<div class="combination-bridge"><p>As bases indicadas são bases do espaço todo. Cada coordenada corresponde ao elemento da base que ocupa a mesma posição.</p><p>${task === 'find' ? 'Coloca os elementos de b nas colunas de B e resolve B[u]<sub>b</sub> = [u]<sub>can</sub>.' : task === 'change' ? 'As colunas de B e C são os elementos de b e c. Resolve C[u]<sub>c</sub> = B[u]<sub>b</sub>. A ordem das coordenadas pedidas é a da base c.' : 'Se [u]<sub>b</sub> = (λ₁, …, λₙ), então u = λ₁b₁ + ⋯ + λₙbₙ. Multiplica cada elemento da base pela coordenada da mesma posição e soma as parcelas.'}</p>${exercise.representation !== 'vectors' ? `<details class="coordinate-help"><summary>Ordem das coordenadas canónicas</summary><p>${exercise.representation === 'polynomials' ? 'Coeficientes pela ordem' : 'Entradas lidas linha a linha, pela ordem'} ${labels.join(', ')}.</p></details>` : ''}</div>`;
}

export function basisAnswerMarkup(exercise, entries, numberMarkup, phase = 'answer') {
  if (phase === 'weights') return basisCombination(exercise, entries, numberMarkup);
  if (exercise.basisTask === 'expand') return `<div class="basis-given"><strong>u =</strong>${objectMarkup(entries, exercise, numberMarkup, 'Elemento u')}</div>`;
  return `<div class="basis-given"><strong>[u]<sub>${exercise.basisTask === 'change' ? 'c' : 'b'}</sub> =</strong>${expressionColumn(entries, exercise, numberMarkup, 'Coordenadas de u na base pedida')}</div>`;
}

export function basisInputMarkup(exercise, entries, numberMarkup, escapeHTML, phase) {
  const n = exercise.original.length;
  const labels = coordinateLabels(exercise);
  const input = (i, j) => `<input type="text" class="solution-input" data-basis-row="${i}" data-basis-column="${j}" value="${escapeHTML(entries[i][j])}" maxlength="64" autocomplete="off" spellcheck="false" aria-label="${exercise.basisFormat === 'symbolic' ? `Coeficiente do parâmetro ${j + 1} na componente ${i + 1}` : `Componente ${i + 1}`}" aria-describedby="basis-input-help basis-feedback">`;
  return `<div class="basis-inputs">${entries.map((row, i) => `<div class="basis-input-row"><span class="basis-input-label">${phase === 'weights' ? `Coeficiente de ${basisSymbol('b', i)}` : exercise.basisTask !== 'expand' ? `Coordenada ${i + 1}` : exercise.representation === 'polynomials' ? `Coeficiente de ${labels[i]}` : labels[i]} =</span><div class="basis-input-terms">${row.map((_, j) => `<label>${j ? '<span aria-hidden="true">+</span>' : ''}${input(i, j)}${exercise.basisFormat === 'symbolic' ? parameterSymbol(j, n) : ''}</label>`).join('')}</div></div>`).join('')}</div>`;
}

export function expansionMarkup(exercise, cursor, complete, numberMarkup) {
  const n = exercise.original.length;
  const active = Math.min(cursor, n);
  const {basis, given} = exercise.basisExercise;
  const nextProduct = cursor < n ? basis.map(row => given[cursor].map(value => row[cursor].mul(value))) : null;
  return `<div class="card-heading"><h2>Combinação linear na base b</h2><span class="count-tag">${active} de ${n} parcelas</span></div><div class="basis-expansion-body">${basisCombination(exercise, given, numberMarkup)}${nextProduct && !complete ? `<h3>Próxima parcela</h3><div class="basis-given"><span>(${linearExpression(given[cursor], exercise, numberMarkup)}) · ${basisSymbol('b', cursor)} =</span>${objectMarkup(nextProduct, exercise, numberMarkup, 'Próxima parcela da combinação linear')}</div>` : ''}<h3>${complete ? 'Soma final' : 'Soma acumulada'}</h3><div class="basis-given">${objectMarkup(expansionSum(exercise, active), exercise, numberMarkup, 'Soma das parcelas já calculadas')}</div></div>`;
}
