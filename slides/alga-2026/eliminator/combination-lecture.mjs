import {matrixFrom, serializeMatrix, applyOperation} from './math.mjs';
import {lectureOperation} from './lecture.mjs';

export const COMBINATION_EXAMPLES = [
  {id: '1', page: 18, title: 'Uma combinação linear', vectors: [[1, 3], [2, -5]], target: [8, -9], coefficients: [2, 3], reasons: ['Multiplica o primeiro vetor por 2.', 'Multiplica o segundo vetor por 3.', 'Soma os dois vetores obtidos e compara com u.']},
  {id: '2', page: 19, title: 'Uma combinação impossível', vectors: [[1, 3], [-2, -6]], target: [2, 1], reasons: ['Subtrai três vezes a primeira linha à segunda. A contradição 0 = −5 é o ponto de paragem do exemplo.']},
  {id: '3', page: 20, title: 'Construção geométrica', vectors: [[2, 1], [1, 3], [-2, 2]], target: [6, 5], coefficients: [1, 2, -1], reasons: ['Começa pelo primeiro vetor, com α₁ = 1.', 'Acrescenta duas vezes o segundo vetor.', 'Subtrai o terceiro vetor para chegar ao vetor u.'], note: 'A figura do PDF não especifica coordenadas. Nesta construção ilustrativa usam-se u₁ = (2, 1), u₂ = (1, 3), u₃ = (−2, 2) e u = (6, 5). Os vetores u, v, w da figura são aqui designados por u₁, u₂, u₃.'},
  {id: '4', page: 21, title: 'Coeficientes não únicos', vectors: [[1, 1, 1], [1, 2, -1], [2, 3, 0]], target: [-3, -4, -1], representations: [[1, 2, -3], [-2, -1, 0], [2, 3, -4]], reasons: ['Primeira representação do texto: α₁ = 1, α₂ = 2 e α₃ = −3.', 'Segunda representação: α₁ = −2, α₂ = −1 e α₃ = 0.', 'Terceira representação: α₁ = 2, α₂ = 3 e α₃ = −4. O vetor obtido é o mesmo.']},
  {id: '5', page: 22, title: 'O plano das combinações lineares', vectors: [[1, 2, 1], [0, 1, 1]], target: ['x', 'y', 'z'], reasons: ['Subtrai duas vezes a primeira linha à segunda: α₂ = y − 2x.', 'Subtrai a primeira linha à terceira.', 'Subtrai a segunda linha à terceira e obtém a condição x − y + z = 0.'], note: 'Na primeira equivalência da página 22 aparece (1, 0, 1). É uma gralha: o segundo vetor é (0, 1, 1), como no enunciado e no restante cálculo.'},
  {id: '6', page: 23, title: 'Combinações de seno e cosseno', coefficients: [2, -1], reasons: ['Escolhe α₁ = 2 e observa a função 2 sen(t).', 'Escolhe α₂ = −1 para a função cosseno.', 'Soma as funções: u(t) = 2 sen(t) − cos(t). Varia os coeficientes para explorar outras combinações.'], note: 'O PDF apresenta controlos para variar os coeficientes, sem fixar valores numéricos. A demonstração começa com a escolha ilustrativa α₁ = 2 e α₂ = −1.'}
];

const alpha = i => `<span class="variable-symbol">α<sub>${i + 1}</sub></span>`;
const vector = i => `<span class="vector-symbol">u${i === undefined ? '' : `<sub>${i + 1}</sub>`}</span>`;
const display = value => String(value).replace(/-/g, '−');
const column = values => `<table class="solution-vector" aria-label="Vetor coluna"><tbody>${values.map(value => `<tr><td class="solution-component">${display(value)}</td></tr>`).join('')}</tbody></table>`;
const coefficientsMarkup = values => `<div class="coefficient-values">${values.map((value, i) => `<span>${alpha(i)} = ${display(value)}</span>`).join('')}</div>`;
export const combinationTotal = (vectors, values) => vectors[0].map((_, coordinate) => vectors.reduce((sum, v, i) => sum + v[coordinate] * values[i], 0));

export function buildCombinationLecture(id = '1') {
  const item = COMBINATION_EXAMPLES.find(example => example.id === String(id)) || COMBINATION_EXAMPLES[0];
  const steps = item.reasons.map(reason => ({reason}));
  let matrices;
  if (item.id === '2') {
    const original = matrixFrom([[1, -2, 2], [3, -6, 1]]);
    steps[0] = {...steps[0], operation: {type: 'add', target: 1, source: 0, factor: '-3'}, pivot: {row: 0, column: 0}, target: {row: 1, column: 0}};
    matrices = [serializeMatrix(original), serializeMatrix(applyOperation(original, steps[0].operation))];
  }
  if (item.id === '5') {
    matrices = [
      [['1', '0', 'x'], ['2', '1', 'y'], ['1', '1', 'z']],
      [['1', '0', 'x'], ['0', '1', 'y − 2x'], ['1', '1', 'z']],
      [['1', '0', 'x'], ['0', '1', 'y − 2x'], ['0', '1', 'z − x']],
      [['1', '0', 'x'], ['0', '1', 'y − 2x'], ['0', '0', 'x − y + z']]
    ];
    [[1, 0, '-2', 0], [2, 0, '-1', 0], [2, 1, '-1', 1]].forEach(([target, source, factor, column], i) => {
      steps[i] = {...steps[i], operation: {type: 'add', target, source, factor}, pivot: {row: source, column}, target: {row: target, column}};
    });
  }
  return {...item, steps, matrices};
}

function activeCoefficients(lesson, cursor, exploration) {
  if (lesson.id === '4') {
    if (Number.isFinite(exploration.parameter)) return [-2 - exploration.parameter, -1 - exploration.parameter, exploration.parameter];
    return lesson.representations[Math.max(0, cursor - 1)];
  }
  return lesson.coefficients.map((value, i) => exploration.coefficients && Number.isFinite(exploration.coefficients[i]) ? exploration.coefficients[i] : cursor > i ? value : 0);
}

function vectorPlot(lesson, values, target = lesson.target) {
  const total = combinationTotal(lesson.vectors, values);
  const points = [[0, 0], target, total, ...lesson.vectors];
  let partial = [0, 0];
  const segments = lesson.vectors.map((v, i) => {
    const from = partial;
    partial = partial.map((value, j) => value + values[i] * v[j]);
    points.push(partial);
    return [from, partial];
  });
  const extent = Math.max(8, ...points.flat().map(Math.abs)) + 2;
  const scale = 155 / extent;
  const p = v => [220 + v[0] * scale, 185 - v[1] * scale];
  const line = (from, to, color, marker, width = 2) => { const a = p(from), b = p(to); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${color}" stroke-width="${width}" marker-end="url(#cl-${marker})"/>`; };
  const colors = ['#416aa3', '#795497', '#338179'];
  return `<svg class="combination-plot" viewBox="0 0 440 380" role="img" aria-label="Vetores dados, soma dos múltiplos e vetor u"><defs>${[['base', '#416aa3'], ['sum', '#c2651f'], ['target', '#263b2d'], ['path', '#879183']].map(([name, color]) => `<marker id="cl-${name}" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="${color}"/></marker>`).join('')}</defs><path d="M20 185 H420 M220 20 V355" stroke="#c7cec0" fill="none"/><text x="420" y="201">x</text><text x="226" y="24">y</text><text x="225" y="201">0</text>${lesson.id === '2' ? line([-extent / 3, -extent], [extent / 3, extent], '#ccd5df', 'path', 1) : ''}${segments.map(([from, to]) => line(from, to, '#879183', 'path', 1.5)).join('')}${lesson.vectors.map((v, i) => `${line([0, 0], v, colors[i], 'base')}<text x="${p(v)[0] + 7}" y="${p(v)[1] - 8}" fill="${colors[i]}">u<tspan baseline-shift="sub" font-size="10">${i + 1}</tspan></text>`).join('')}${line([0, 0], target, '#263b2d', 'target', 4)}${line([0, 0], total, '#c2651f', 'sum', 2.5)}<circle cx="${p(target)[0]}" cy="${p(target)[1]}" r="4" fill="#263b2d"/><text x="${p(target)[0] + 8}" y="${p(target)[1] + 15}">u</text></svg>`;
}

function functionPlot(values) {
  const maxY = Math.max(3, Math.abs(values[0]) + Math.abs(values[1]) + 1);
  const path = fn => Array.from({length: 241}, (_, i) => {
    const t = -2 * Math.PI + 4 * Math.PI * i / 240;
    return `${i ? 'L' : 'M'}${(20 + i * 400 / 240).toFixed(2)},${(170 - fn(t) * 140 / maxY).toFixed(2)}`;
  }).join(' ');
  return `<svg class="combination-plot" viewBox="0 0 440 340" role="img" aria-label="Gráficos de alfa 1 vezes seno, alfa 2 vezes cosseno e da sua soma"><path d="M20 170 H420 M220 20 V320" fill="none" stroke="#c7cec0"/><text x="18" y="190">−2π</text><text x="398" y="190">2π</text><text x="226" y="32">${maxY}</text><text x="226" y="190">0</text><text x="425" y="166">t</text><path d="${path(t => values[0] * Math.sin(t))}" fill="none" stroke="#416aa3" stroke-width="2"/><path d="${path(t => values[1] * Math.cos(t))}" fill="none" stroke="#795497" stroke-width="2"/><path d="${path(t => values[0] * Math.sin(t) + values[1] * Math.cos(t))}" fill="none" stroke="#c2651f" stroke-width="3"/></svg>`;
}

function illustration(lesson, cursor, exploration) {
  if (lesson.id === '5') return '';
  if (lesson.id === '2') return vectorPlot(lesson, [1, 1]);
  const values = activeCoefficients(lesson, cursor, exploration);
  if (lesson.id === '4') return `<p class="combination-formula">${vector(2)} = ${vector(0)} + ${vector(1)}</p><p>Podemos variar ${alpha(2)} e compensar nos outros dois coeficientes:</p><p class="combination-formula">${alpha(0)} = −2 − ${alpha(2)}, ${alpha(1)} = −1 − ${alpha(2)}.</p>${coefficientsMarkup(values)}<div class="given-vector">${vector()} = ${column(combinationTotal(lesson.vectors, values))}</div>`;
  return lesson.id === '6' ? functionPlot(values) : vectorPlot(lesson, values, exploration.target || lesson.target);
}

function explorationSummary(lesson, cursor, exploration) {
  const values = activeCoefficients(lesson, cursor, exploration);
  if (lesson.id === '6') return `${coefficientsMarkup(values)}<p class="combination-formula">u(t) = (${display(values[0])}) sen(t) + (${display(values[1])}) cos(t)</p>`;
  if (lesson.id === '3') {
    const total = combinationTotal(lesson.vectors, values);
    const target = exploration.target || lesson.target;
    return `${coefficientsMarkup(values)}<p>Soma obtida: (${total.map(display).join(', ')}). Vetor u: (${target.map(display).join(', ')}). ${total.every((v, i) => Math.abs(v - target[i]) < 1e-9) ? 'A soma coincide com u.' : 'Ajusta os coeficientes para obter u.'}</p>`;
  }
  return '';
}

function decompositionMarkup(lesson, cursor, exploration) {
  const values = activeCoefficients(lesson, cursor, exploration);
  return lesson.vectors.slice(0, Math.min(cursor, lesson.vectors.length)).map((v, i) => `<div class="given-vector">${alpha(i)}${vector(i)} = ${column(v.map(value => value * values[i]))}</div>`).join('');
}

function matrixMarkup(lesson, cursor) {
  const rows = lesson.matrices[cursor];
  const next = lesson.steps[cursor];
  const finished = cursor === lesson.steps.length;
  return `<div class="bracketed"><table class="matrix-table"><caption class="sr-only">Matriz ampliada do exemplo da aula</caption><thead><tr>${rows[0].map((_, c) => `<th scope="col" class="${c === rows[0].length - 1 ? 'rhs-cell' : ''}">${c === rows[0].length - 1 ? 'u' : alpha(c)}</th>`).join('')}</tr></thead><tbody>${rows.map((row, r) => `<tr>${row.map((value, c) => {
    const pivot = next && next.pivot && next.pivot.row === r && next.pivot.column === c;
    const target = next && next.target && next.target.row === r && next.target.column === c;
    return `<td data-value="${display(value)}" class="${c === row.length - 1 ? 'rhs-cell' : ''} ${pivot ? 'cell-pivot' : ''} ${target || finished && r === rows.length - 1 && c === row.length - 1 ? 'cell-target' : ''}" aria-label="Linha ${r + 1}, coluna ${c + 1}: ${display(value)}${pivot ? ', pivô' : target ? ', elemento a anular' : ''}">${display(value)}</td>`;
  }).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function conclusion(lesson) {
  if (lesson.id === '2') return '<p>A segunda linha representa 0 = −5. Portanto, u não é combinação linear de u₁ e u₂.</p>';
  if (lesson.id === '5') return `<p>O sistema é possível se e só se x − y + z = 0. Nesse caso, ${alpha(0)} = x e ${alpha(1)} = y − 2x.</p><div class="combination-span"><span>S = {</span>${column(['x', 'y', 'z'])}<span>∈ ℝ³ : x − y + z = 0}</span></div><p>As combinações lineares destes dois vetores formam um plano que passa pela origem.</p>`;
  if (lesson.id === '6') return '<p>As funções também são vetores. Cada escolha de α₁ e α₂ dá uma função u(t) = α₁ sen(t) + α₂ cos(t).</p>';
  if (lesson.id === '3') return '<p>O vetor u foi obtido somando múltiplos dos três vetores. Explora outras escolhas de coeficientes e outras posições do vetor u.</p>';
  if (lesson.id === '4') return '<p>As três representações do texto produzem o mesmo vetor u. Os coeficientes não são únicos porque u₃ = u₁ + u₂.</p>';
  return `<p>Sim. A soma é o vetor u.</p>${coefficientsMarkup(lesson.coefficients)}<div class="given-vector">${vector()} = ${column([8, -9])} = 2 ${vector(0)} + 3 ${vector(1)}</div>`;
}

export function renderCombinationLecture(lesson, cursor, exploration = {}) {
  const finished = cursor === lesson.steps.length;
  const next = lesson.steps[cursor];
  const values = (lesson.coefficients || lesson.id === '4') ? activeCoefficients(lesson, cursor, exploration) : [];
  const controls = ['3', '6'].includes(lesson.id) ? values.map((value, i) => `<label class="plot-slider">${alpha(i)}<input type="range" data-plot-coefficient="${i}" min="-4" max="4" step="0.5" value="${value}" aria-label="Coeficiente alfa ${i + 1}"><output id="plot-value-${i}">${display(value)}</output></label>`).join('') : lesson.id === '4' && finished ? `<label class="plot-slider">${alpha(2)}<input type="range" data-plot-parameter min="-5" max="3" step="0.5" value="${values[2]}" aria-label="Coeficiente livre alfa 3"><output id="plot-value-2">${display(values[2])}</output></label>` : '';
  const givens = lesson.vectors ? `<div class="given-vectors"><div id="combination-lecture-target" class="given-vector target-vector">${vector()} = ${column(exploration.target || lesson.target)}</div>${lesson.vectors.map((v, i) => `<div class="given-vector">${vector(i)} = ${column(v)}</div>`).join('')}</div>` : `<p class="combination-formula">u₁(t) = sen(t), u₂(t) = cos(t)</p>`;
  const representations = lesson.id === '4' ? lesson.representations.slice(0, cursor).map((values, i) => `<div class="lecture-representation"><span>Representação ${i + 1}</span>${coefficientsMarkup(values)}<p>${vector()} = ${values.map((value, j) => `<span class="solution-term">${j ? '+ ' : ''}(${display(value)}) ${vector(j)}</span>`).join(' ')}</p></div>`).join('') : '';
  const decomposition = lesson.id === '1' || lesson.id === '3' ? `<div id="combination-decomposition" class="combination-decomposition">${decompositionMarkup(lesson, cursor, exploration)}</div>` : '';
  document.querySelector('#combination-lecture-workspace').innerHTML = `<section class="card combination-lesson" aria-labelledby="combination-lecture-title"><div class="card-heading"><h2 id="combination-lecture-title">Exemplo ${lesson.id}: ${lesson.title}</h2><span class="dimension-tag">Página ${lesson.page}</span></div>${givens}<div class="combination-lesson-body">${lesson.note ? `<p class="lecture-source-note">${lesson.note}</p>` : ''}<div class="combination-lesson-grid"><div>${lesson.matrices ? `<div class="matrix-canvas"><div class="matrix-scroll" tabindex="0" role="region" aria-label="Matriz do exemplo de combinação linear">${matrixMarkup(lesson, cursor)}</div></div>` : ''}${decomposition}${representations}<div id="combination-illustration">${illustration(lesson, cursor, exploration)}</div>${!['4', '5'].includes(lesson.id) ? `<p class="plot-legend">${lesson.id === '6' ? '<span class="plot-first">α₁ sen(t)</span><span class="plot-second">α₂ cos(t)</span><span class="plot-sum">Soma</span>' : '<span class="plot-first">Vetores dados</span><span class="plot-sum">Soma obtida</span><span>Vetor u em preto</span>'}</p>` : ''}${controls ? `<div class="plot-controls">${controls}</div>` : ''}${lesson.id === '3' ? `<div class="plot-target-controls"><span>Posição do vetor u</span>${(exploration.target || lesson.target).map((v, i) => `<label>Coordenada ${i + 1}<input type="number" data-plot-target="${i}" min="-10" max="10" step="0.5" value="${v}"></label>`).join('')}</div>` : ''}<div id="combination-exploration-summary">${['3', '6'].includes(lesson.id) ? explorationSummary(lesson, cursor, exploration) : ''}</div></div><aside class="combination-lesson-explanation">${finished ? `<div id="combination-lecture-complete"><span class="eyebrow">EXEMPLO CONCLUÍDO</span><h2>${lesson.id === '2' ? 'Não é combinação linear' : 'Conclusão'}</h2>${conclusion(lesson)}</div>` : `<span class="eyebrow">PASSO ${cursor + 1} DE ${lesson.steps.length}</span><h2>${next.operation ? 'Próxima operação' : 'Próximo passo'}</h2><p>${next.reason}</p>${next.operation ? `<div class="operation-notation">${lectureOperation(next.operation)}</div>` : ''}`}<p class="solution-guidance">${lesson.id === '1' || lesson.id === '4' ? 'Este exemplo verifica diretamente as combinações do texto, sem acrescentar uma redução por linhas.' : lesson.id === '5' ? 'A redução mostra a condição de existência para um vetor genérico u = (x, y, z).' : ''}</p></aside></div></div><div class="matrix-action-bar"><button id="combination-lecture-back" class="button button-small" ${cursor ? '' : 'disabled'}>Passo anterior</button><span class="count-tag">Passo ${cursor} de ${lesson.steps.length}</span><button id="combination-lecture-forward" class="button button-small" ${finished ? 'disabled' : ''}>Passo seguinte</button></div>${finished ? '<div class="combination-lesson-next"><button id="combination-lecture-next" class="button button-primary">Exemplo seguinte</button></div>' : ''}</section>`;
}

export function updateCombinationIllustration(lesson, cursor, exploration) {
  document.querySelector('#combination-illustration').innerHTML = illustration(lesson, cursor, exploration);
  if (lesson.id === '3') {
    document.querySelector('#combination-lecture-target').innerHTML = `${vector()} = ${column(exploration.target || lesson.target)}`;
    document.querySelector('#combination-decomposition').innerHTML = decompositionMarkup(lesson, cursor, exploration);
  }
  if (['3', '6'].includes(lesson.id)) document.querySelector('#combination-exploration-summary').innerHTML = explorationSummary(lesson, cursor, exploration);
  const values = activeCoefficients(lesson, cursor, exploration);
  values.forEach((value, i) => { const output = document.querySelector(`#plot-value-${i}`); if (output) output.textContent = display(value); });
}
