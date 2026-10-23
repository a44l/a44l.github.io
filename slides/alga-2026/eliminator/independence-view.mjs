import {Fraction} from './math.mjs';
import {familyColumns} from './independence.mjs';

export const familySymbol = (representation, index) => `<span class="variable-symbol">${representation === 'polynomials' ? 'p' : representation === 'matrices' ? 'M' : 'u'}<sub>${index + 1}</sub></span>`;
export const alphaSymbol = index => `<span class="variable-symbol">α<sub>${index + 1}</sub></span>`;

function polynomial(values, numberMarkup) {
  const terms = [];
  for (let power = values.length - 1; power >= 0; power--) {
    const value = values[power];
    if (value.isZero) continue;
    const magnitude = value.n < 0n ? value.neg() : value;
    const sign = value.n < 0n ? '− ' : terms.length ? '+ ' : '';
    terms.push(`<span class="solution-term">${sign}${power && magnitude.equals(1) ? '' : numberMarkup(magnitude)}${power ? `X${power === 1 ? '' : `<sup>${power}</sup>`}` : ''}</span>`);
  }
  return terms.join(' ') || '0';
}

export function familySpace(exercise) {
  if (exercise.representation === 'matrices') return `M<sub>${exercise.shape[0]},${exercise.shape[1]}</sub>(ℝ)`;
  if (exercise.representation === 'polynomials') return `ℝ<sub>${exercise.original.length - 1}</sub>[X]`;
  return `ℝ<sup>${exercise.original.length}</sup>`;
}

export function coordinateLabels(exercise) {
  if (exercise.representation === 'polynomials') return Array.from({length: exercise.original.length}, (_, i) => i === 0 ? '1' : i === 1 ? 'X' : `X<sup>${i}</sup>`);
  if (exercise.representation === 'matrices') return Array.from({length: exercise.original.length}, (_, i) => `(${Math.floor(i / exercise.shape[1]) + 1}, ${i % exercise.shape[1] + 1})`);
  return Array.from({length: exercise.original.length}, (_, i) => `coordenada ${i + 1}`);
}

export function independenceProblemMarkup(exercise, {numberMarkup, columnVector}) {
  const count = familyColumns(exercise.original);
  const symbols = Array.from({length: count}, (_, i) => familySymbol(exercise.representation, i));
  const columns = Array.from({length: count}, (_, j) => exercise.original.map(row => row[j]));
  const objects = columns.map((values, j) => {
    let object;
    if (exercise.representation === 'polynomials') object = `<span class="polynomial">${polynomial(values, numberMarkup)}</span>`;
    else if (exercise.representation === 'matrices') object = `<table class="solution-vector given-matrix" aria-label="Matriz ${j + 1}, ${exercise.shape[0]} linhas e ${exercise.shape[1]} colunas"><tbody>${Array.from({length: exercise.shape[0]}, (_, row) => `<tr>${Array.from({length: exercise.shape[1]}, (_, col) => `<td class="solution-component">${numberMarkup(values[row * exercise.shape[1] + col])}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    else object = columnVector(values, `Vetor u ${j + 1}`);
    return `<div class="given-vector independence-object">${symbols[j]} = ${object}</div>`;
  }).join('');
  const coordinateHelp = exercise.representation === 'polynomials' ? `Cada coluna contém os coeficientes do polinómio pela ordem <span class="combination-formula">${coordinateLabels(exercise).join(', ')}</span>. Um termo ausente tem coeficiente zero.` : exercise.representation === 'matrices' ? `Cada coluna contém as entradas de uma matriz, lidas linha a linha: <span class="combination-formula">${coordinateLabels(exercise).join(', ')}</span>. Usa a mesma ordem em todas as matrizes.` : 'Colocamos os vetores nas colunas de A. Cada coluna corresponde a um elemento da família, mantendo a ordem apresentada.';
  const trivial = count === 1 ? `${alphaSymbol(0)} = 0` : `${alphaSymbol(0)} = ⋯ = ${alphaSymbol(count - 1)} = 0`;
  return `<div class="card-heading"><h2 id="independence-problem-title">A família é linearmente independente?</h2><span class="dimension-tag">${familySpace(exercise)}</span></div><p class="dual-given-description">${count} ${exercise.representation === 'polynomials' ? count === 1 ? 'polinómio' : 'polinómios' : exercise.representation === 'matrices' ? count === 1 ? 'matriz' : 'matrizes' : count === 1 ? 'vetor' : 'vetores'} com coeficientes reais.</p><div class="given-vectors">${objects}</div><div class="combination-bridge"><p>Procuramos as relações <span class="combination-formula">${symbols.map((symbol, i) => `<span class="solution-term">${i ? '+ ' : ''}${alphaSymbol(i)}${symbol}</span>`).join(' ')} = 0</span>. A família é independente se a única solução for ${trivial}.</p><details class="coordinate-help"><summary>Como se constrói a matriz?</summary><p>${coordinateHelp}</p></details><p>Reduz Aα = 0. Depois classifica a família e, se for dependente, apresenta uma relação com coeficientes não todos nulos.</p></div>`;
}

export function relationMarkup(exercise, coefficients, numberMarkup) {
  const terms = [];
  coefficients.forEach((entry, i) => {
    const value = Fraction.from(entry);
    if (value.isZero) return;
    const magnitude = value.n < 0n ? value.neg() : value;
    const sign = value.n < 0n ? '− ' : terms.length ? '+ ' : '';
    terms.push(`<span class="solution-term">${sign}${magnitude.equals(1) ? '' : `${numberMarkup(magnitude)} · `}${familySymbol(exercise.representation, i)}</span>`);
  });
  return `<p class="combination-formula">${terms.join(' ') || '0'} = 0</p>`;
}
