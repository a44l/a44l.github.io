(() => {
  'use strict';
  const {cases, axioms, closureQuestions, grade, restoreProgress} = VectorLab;
  const $ = selector => document.querySelector(selector);
  const on = (selector, event, handler) => { const element = $(selector); if (element) element.addEventListener(event, handler); };
  const KEY = 'vetor.practice.v2';
  const modes = {explore:'DO FAMILIAR AO INESPERADO',axioms:'UMA PROPRIEDADE DE CADA VEZ',closure:'AS OPERAÇÕES FICAM NO CONJUNTO?'};
  let state = restoreProgress(null);
  let storageAvailable = true;
  try {
    state = restoreProgress(JSON.parse(localStorage.getItem(KEY) || localStorage.getItem('vetor.practice.v1') || 'null'));
  } catch (_) { storageAvailable = false; }
  const hashId = location.hash.slice(1);
  if (cases.some(item => item.id === hashId)) state.current = hashId;
  let mode = current().mode;
  let query = '';
  let onlyUnsolved = false;

  function current() { return cases.find(item => item.id === state.current); }
  function work() {
    if (!state.work[state.current]) state.work[state.current] = {selected:current().answers.map(() => null),hint:false,revealed:false,solved:false};
    return state.work[state.current];
  }
  function save() {
    try { localStorage.setItem(KEY,JSON.stringify(state)); storageAvailable = true; }
    catch (_) { storageAvailable = false; }
    $('#save-status').textContent = storageAvailable ? 'O progresso fica neste navegador.' : 'O progresso mantém-se só enquanto esta página estiver aberta.';
  }
  function announce(text) { $('#announcer').textContent = text; }
  function normalize(text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
  function visibleCases() {
    return cases.filter(item => item.mode === mode && (!onlyUnsolved || !(state.work[item.id] || {}).solved) && normalize(`${item.title} ${item.tag} ${item.definition} ${item.target ? 'axioma '+item.target : ''}`).includes(normalize(query)));
  }
  function updateProgress() {
    const completed = cases.filter(item => (state.work[item.id] || {}).solved).length;
    $('#progress-count').textContent = `${completed} / ${cases.length}`;
    $('#progress-fill').style.width = `${completed / cases.length * 100}%`;
    $('.progress-track').setAttribute('aria-valuenow',completed);
  }
  function renderCatalogue() {
    const catalogueScroll=$('#example-list').scrollLeft;
    const items = visibleCases();
    $('#catalogue-label').textContent = modes[mode];
    $('#unsolved').setAttribute('aria-pressed',onlyUnsolved);
    $('#empty-search').hidden = items.length > 0;
    $('#example-list').innerHTML = items.map(item => {
      const entry = state.work[item.id] || {};
      const status = entry.solved ? 'Resolvido' : entry.revealed ? 'Resolução consultada' : 'Por resolver';
      const label = item.mode === 'axioms' ? (item.tag === 'VARIAÇÃO DE UM DESAFIO' ? `Variação · axioma ${item.target}` : `Desafio do axioma ${item.target}`) : item.level;
      return `<button class="example-item" data-case="${item.id}" aria-current="${item.id === state.current}" aria-label="${item.title}. ${status}"><span class="example-icon" aria-hidden="true">${item.icon}</span><span class="example-info"><span class="example-name">${item.title}</span><span class="example-category">${label}</span></span><span class="example-status" aria-hidden="true">${entry.solved ? '✓' : entry.revealed ? '◌' : item.id === state.current ? '›' : ''}</span></button>`;
    }).join('');
    $('#example-list').scrollLeft=catalogueScroll;
    document.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed',button.dataset.mode === mode));
    updateProgress();
  }

  const svgDefs = `<defs><pattern id="case-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" stroke="#dce3d5" stroke-width=".65" fill="none"/></pattern><marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="#2a7259"/></marker><marker id="arrow-gold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="#af8a3f"/></marker></defs>`;
  const grid = '<rect x="20" y="10" width="240" height="160" fill="url(#case-grid)"/>';
  const axes = '<path d="M20 130H263M80 174V8" stroke="#b2c0ac" stroke-width="1"/><text x="264" y="134" class="small">x</text><text x="69" y="14" class="small">y</text><text x="68" y="145" class="small">0</text>';
  function line(x1,y1,x2,y2,color='green',dash=false) { return `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color === 'green' ? '#2a7259' : '#af8a3f'}" stroke-width="2" ${dash ? 'stroke-dasharray="4 4"' : `marker-end="url(#arrow-${color})"`}/>`; }
  function plot(fn,color) { let d='';for(let x=20;x<=260;x+=2)d+=`${x===20?'M':'L'}${x} ${(95-fn((x-140)/32)*27).toFixed(2)} `;return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.1"/>`; }
  function diagram(example) {
    let drawing=''; let caption='Uma representação para explorar.';
    switch(example.diagram) {
      case 'plane':
        drawing=grid+axes+'<path d="M80 130 140 110 180 50 120 70Z" fill="#dfebc6" opacity=".55"/>'+line(80,130,140,110)+line(80,130,120,70,'gold')+line(140,110,180,50,'gold',true)+line(120,70,180,50,'green',true)+line(80,130,180,50)+'<text x="148" y="122">u</text><text x="107" y="64">v</text><text x="185" y="46">u # v</text>';caption='A regra do paralelogramo.';break;
      case 'matrix':
        drawing='<text x="140" y="28" text-anchor="middle" class="small">UMA MATRIZ, QUATRO COORDENADAS</text><path d="M82 51H69V146H82M198 51H211V146H198" stroke="#749271" stroke-width="1.8" fill="none"/><rect x="82" y="59" width="49" height="36" rx="6" fill="#e4ecd6"/><rect x="149" y="105" width="49" height="36" rx="6" fill="#e9eddd"/><g style="font-size:24px;font-style:normal"><text x="99" y="85">2</text><text x="162" y="85">1</text><text x="99" y="132">0</text><text x="158" y="132">−3</text></g>';caption='A soma e o produto por um escalar atuam entrada a entrada.';break;
      case 'polynomial':
        drawing=grid+'<path d="M20 133H261M140 171V10" stroke="#b2c0ac"/>'+plot(x=>.23*x*x-.9,'#36775c')+'<text x="181" y="48">p(x)</text><circle cx="140" cy="119" r="3" fill="#af8a3f"/>';caption='Os coeficientes determinam o polinómio.';break;
      case 'functions':case 'waves':
        drawing=grid+'<path d="M20 95H261M140 174V8" stroke="#b2c0ac"/>'+plot(x=>Math.sin(x),'#8ba074')+plot(x=>Math.cos(x),'#b9a163')+`<g id="wave-sum">${plot(x=>Math.sin(x)+Math.cos(x),'#216650')}</g><text x="202" y="38">f # g</text>`;caption='Duas funções e a sua soma, ponto a ponto.';break;
      case 'sequence':
        drawing=grid+'<path d="M20 143H262" stroke="#b2c0ac"/>'+[36,55,77,94,108,114,123,127,133].map((y,i)=>`<path d="M${40+i*25} 143V${y}" stroke="#cad6b8" stroke-width="2"/><circle cx="${40+i*25}" cy="${y}" r="4" fill="#467454"/>`).join('')+'<text x="29" y="163" class="small">1</text><text x="57" y="163" class="small">2</text><text x="82" y="163" class="small">3</text><text x="247" y="163">n</text>';caption='Cada índice dá uma coordenada da sucessão.';break;
      case 'complex':
        drawing=grid+'<path d="M20 130H262M80 174V8" stroke="#b2c0ac"/>'+line(80,130,191,59)+'<path d="M191 59V130H80" stroke="#a6b399" stroke-dasharray="4 4" fill="none"/><text x="197" y="51">x + iy</text><text x="215" y="148" class="small">Re</text><text x="61" y="19" class="small">Im</text>';caption='Um complexo tem duas coordenadas reais.';break;
      case 'subspace':
        drawing='<path d="M140 95 230 143M140 95 51 151M140 95V12" stroke="#a6b69d"/><path d="m39 102 91-64 116 35-100 74Z" fill="#e1ebcf" stroke="#a8bd93"/><path d="M140 95 187 69M140 95 112 60" stroke="#357358" stroke-width="2" marker-end="url(#arrow-green)"/><circle cx="140" cy="95" r="3" fill="#357358"/><text x="133" y="115" class="small">0</text><text x="158" y="157">x − y + z = 0</text>';caption='O plano das combinações lineares nas notas.';break;
      case 'positive':
        drawing='<path d="M25 65H258M25 136H258" stroke="#b4c3a6"/><g class="small"><text x="24" y="45">POSITIVOS</text><text x="24" y="119">LOGARITMOS</text></g><path d="M69 71V125M140 71V125M211 71V125" stroke="#a9b79b" stroke-dasharray="3 4"/><g fill="#477754"><circle cx="69" cy="65" r="4"/><circle cx="140" cy="65" r="4"/><circle cx="211" cy="65" r="4"/><circle cx="69" cy="136" r="4"/><circle cx="140" cy="136" r="4"/><circle cx="211" cy="136" r="4"/></g><g text-anchor="middle"><text x="69" y="57">e⁻¹</text><text x="140" y="57">1</text><text x="211" y="57">e</text><text x="69" y="157">−1</text><text x="140" y="157">0</text><text x="211" y="157">1</text></g><text x="235" y="99">ln</text>';caption='O logaritmo dá uma nova forma de ver as operações.';break;
      case 'shifted':case 'mismatch':
        drawing=grid+'<path d="M23 109H258" stroke="#b4c3a6"/>'+[0,1,2,3,4,5,6].map((n)=>`<path d="M${39+n*32} 104v10" stroke="#9bad89"/><text x="${39+n*32}" y="134" text-anchor="middle" class="small">${n}</text>`).join('')+`<circle cx="${example.diagram==='shifted'?135:71}" cy="109" r="6" fill="#af8a3f"/><path d="M72 84Q103 45 135 84" fill="none" stroke="#397654" marker-end="url(#arrow-green)"/><text x="121" y="48">novas operações</text>`;caption='Lê as operações; não pressuponhas o neutro.';break;
      case 'bent':
        drawing=grid+axes+line(80,130,120,130)+line(80,130,80,90,'gold')+line(80,130,160,50)+'<circle cx="120" cy="90" r="3" fill="#a9b792"/><path d="M120 90 160 50" stroke="#a6b39b" stroke-dasharray="3 4"/><text x="166" y="44">u # v</text><text x="129" y="106">u + v</text>';caption='Se u₁v₂ ≠ u₂v₁, duplicamos a soma usual.';break;
      case 'maximum':case 'binary':
        drawing='<text x="140" y="36" text-anchor="middle" class="small">A OPERAÇÃO MÁXIMO</text><circle cx="70" cy="90" r="27" fill="#e6edda"/><circle cx="207" cy="90" r="27" fill="#d7e5c6"/><text x="70" y="98" text-anchor="middle" style="font-size:25px;font-style:normal">0</text><text x="207" y="98" text-anchor="middle" style="font-size:25px;font-style:normal">1</text><path d="M107 90H168" stroke="#397654" stroke-width="1.5" marker-end="url(#arrow-green)"/><text x="140" y="145" text-anchor="middle">0 # 1 = 1</text>';caption='O resultado é o maior dos dois elementos.';break;
      case 'complex-rules':
        drawing='<text x="140" y="29" text-anchor="middle" class="small">DUAS REGRAS PARA UM ESCALAR</text><path d="M140 52 73 91M140 52 208 91" stroke="#a2b78b"/><text x="140" y="46" text-anchor="middle" style="font-size:22px">α</text><rect x="24" y="92" width="101" height="55" rx="6" fill="#e3ecd5"/><rect x="157" y="92" width="101" height="55" rx="6" fill="#f0ead6"/><text x="74" y="115" text-anchor="middle">αu</text><text x="208" y="115" text-anchor="middle"><tspan style="text-decoration:overline">α</tspan>u</text><text x="74" y="135" text-anchor="middle" class="small">se w = 0</text><text x="208" y="135" text-anchor="middle" class="small">se w ≠ 0</text>';caption='O vetor decide qual dos ramos usamos.';break;
      case 'square':case 'absolute':case 'realpart':case 'zero':
        {const maps={square:['α','α²'],absolute:['α','|α|'],realpart:['a + bi','a'],zero:['α, u','0']};const [from,to]=maps[example.diagram];drawing=`<text x="140" y="34" text-anchor="middle" class="small">A REGRA DO PRODUTO ESCALAR</text><rect x="24" y="67" width="81" height="67" rx="9" fill="#e7eddc"/><rect x="176" y="67" width="81" height="67" rx="9" fill="#dfebca"/><text x="64" y="108" text-anchor="middle" style="font-size:23px">${from}</text><text x="217" y="108" text-anchor="middle" style="font-size:25px">${to}</text><path d="M120 100H160" stroke="#397654" stroke-width="1.8" marker-end="url(#arrow-green)"/>`;caption='Segue a definição, incluindo para 0 e para 1.';}break;
      case 'projection':
        drawing=grid+axes+line(80,130,180,50)+line(80,130,180,130,'gold')+'<path d="M180 50V130" stroke="#91a47e" stroke-dasharray="4 4"/><text x="186" y="46">(x, y)</text><text x="184" y="151">(x, 0)</text>';caption='A segunda coordenada é sempre apagada.';break;
      case 'halfplane':
        drawing='<rect x="20" y="10" width="240" height="120" fill="#e1eccf"/>'+grid+axes+line(80,130,155,64)+'<text x="181" y="52">y ≥ 0</text>';caption='A fronteira y = 0 também pertence ao conjunto.';break;
      case 'circle':
        drawing=grid+'<path d="M20 95H263M140 175V10" stroke="#b2c0ac"/><circle cx="140" cy="95" r="65" fill="none" stroke="#4a7954" stroke-width="2"/><circle cx="205" cy="95" r="4" fill="#af8a3f"/><text x="210" y="83">(1, 0)</text><text x="123" y="113" class="small">0</text>';caption='Apenas a circunferência, sem o seu interior.';break;
      case 'lattice':
        drawing=grid+axes+Array.from({length:7},(_,x)=>Array.from({length:5},(_,y)=>`<circle cx="${40+x*32}" cy="${30+y*30}" r="3" fill="#6d8c5b"/>`).join('')).join('');caption='Só os pontos com duas coordenadas inteiras.';break;
    }
    if(example.diagram==='waves') { drawing=drawing.replace('<text x="202" y="38">f # g</text>','<text x="140" y="20" text-anchor="middle">a sen x + cos x</text>'); caption='A verde escuro: a sen x + cos x.'; }
    let controls='';
    if(example.diagram==='waves') controls='<div class="wave-control"><label for="wave-amplitude">Coeficiente a <output id="wave-value">1</output></label><input id="wave-amplitude" type="range" min="-2" max="2" step="0.5" value="1" aria-label="Coeficiente de seno na soma a sen x + cos x"></div>';
    return `<svg viewBox="0 0 280 180" role="img" aria-label="${caption}">${svgDefs}${drawing}</svg><p class="diagram-caption">${caption}</p>${controls}`;
  }
  function feedbackRow(example, entry, i) {
    if(typeof entry.selected[i] !== 'boolean') return '';
    const correct=entry.selected[i]===example.answers[i];
    const answer=example.answers[i]?'Sim':'Não';
    const verdict=example.answers[i]?'Esta propriedade é satisfeita.':'Esta propriedade não é satisfeita.';
    const title=entry.revealed?`Resposta: ${answer}. ${verdict}`:correct?`Correto. ${verdict}`:`Ainda não. A resposta é «${answer}». ${verdict}`;
    return `<p class="answer-verdict" id="verdict-${i}"><span aria-hidden="true">${entry.revealed?'↳':correct?'✓':'×'}</span><strong>${title}</strong></p><details class="row-details" open><summary>Explicação passo a passo</summary><div class="row-proof">${example.explanations[i]}</div></details>`;
  }
  function questionRow(example,entry,question,i) {
    const answered=typeof entry.selected[i]==='boolean';
    const correct=answered&&entry.selected[i]===example.answers[i];
    return `<article class="axiom-card ${answered?'has-answer '+(correct?'is-correct':'is-wrong'):''}" data-row="${i}"><div class="claim-header"><div class="axiom-text"><h4 class="axiom-name" id="claim-title-${i}"><span class="axiom-number">${example.mode==='closure'?'F'+(i+1):String(i+1).padStart(2,'0')}</span>${question.name}</h4><span class="axiom-equation" id="claim-equation-${i}">${question.formula}</span></div><div class="claim-choices" role="group" aria-labelledby="claim-title-${i}" aria-describedby="claim-equation-${i}">${[true,false].map(value=>`<button type="button" class="claim-choice" id="claim-${i}-${value?'yes':'no'}" data-claim="${i}" data-answer="${value}" aria-pressed="${entry.selected[i]===value}" aria-label="${question.name}: ${value?'Sim':'Não'}" aria-controls="feedback-${i}" ${entry.revealed?'disabled':''}>${value?'Sim':'Não'}</button>`).join('')}</div></div><div id="feedback-${i}" class="row-feedback" ${answered?'':'hidden'}>${feedbackRow(example,entry,i)}</div></article>`;
  }
  function summary(example,entry,result) {
    if(entry.revealed)return '<h3>Resolução consultada</h3><p>As respostas e todas as explicações estão visíveis. Podes voltar a tentar sem a resolução. Consultar não conta como resolver.</p>';
    if(result.complete)return `<h3>Todas as ${result.total} respostas estão corretas.</h3><p>${example.mode==='closure'?'Identificaste os dois fechos corretamente.':'Completaste a análise dos oito axiomas.'} As explicações mostram todos os passos de cada verificação.</p>`;
    const labels=result.wrong.map(i=>`${example.mode==='closure'?'F':'A'}${i+1}`).join(', ');
    return `<h3>${result.correct} de ${result.total} respostas corretas.</h3><p>Revê ${labels}. A explicação está junto de cada resposta; podes escolher «Sim» ou «Não» novamente.</p>`;
  }
  function solutionMarkup(example,entry,result) {
    return `<h3>${example.mode==='closure'?'O que podemos concluir?':result.isSpace?'Sim, é um espaço vetorial.':'Não é um espaço vetorial.'}</h3><p>${example.conclusion}</p>${example.mode==='closure'?'<div class="closure-stop"><strong>O teste termina aqui.</strong> Pelo menos uma operação não toma sempre valores em E. Por isso não avaliamos os oito axiomas como propriedades de operações em E. Uma igualdade válida no espaço ambiente não garante que os resultados pertençam ao conjunto.</div>':''}${example.extra?`<details class="proof-detail"><summary>Perceber a dependência entre axiomas, passo a passo</summary>${example.extra}</details>`:''}<div class="solution-actions">${entry.revealed?'<button data-try-again class="text-button">Tentar sem a resolução</button>':'<span class="resolved-note">✓ Exercício resolvido</span>'}<button class="next-link" data-next-unresolved>Continuar a explorar <span aria-hidden="true">→</span></button></div>`;
  }
  function renderAssessment() {
    const example=current(),entry=work(),result=grade(example,entry.selected);
    $('#claim-progress').textContent=`${result.answered} de ${result.total} respondidas`;
    $('#correct-count').textContent=entry.revealed?'Resolução consultada':`${result.correct} ${result.correct===1?'correta':'corretas'}`;
    const showSummary=entry.revealed||result.answered===result.total;
    const panel=$('#feedback-summary');
    panel.hidden=!showSummary;
    panel.classList.toggle('error',showSummary&&!result.complete);
    panel.innerHTML=showSummary?summary(example,entry,result):'';
    $('#solution-panel').hidden=!result.complete;
    $('#solution-panel').innerHTML=result.complete?solutionMarkup(example,entry,result):'';
  }
  function renderExercise() {
    const example=current(),entry=work();
    const collection=cases.filter(item=>item.mode===mode);
    const number=collection.indexOf(example)+1;
    const questions=example.mode==='closure'?closureQuestions:axioms;
    const nonempty={halfplane:'(0,0) pertence a E, pois 0 ≥ 0.',circle:'(1,0) pertence a E, pois 1² + 0² = 1.',integers:'(0,0) pertence a E, pois ambas as coordenadas são inteiras.','exact-quadratics':'O polinómio x² pertence a E, pois o seu coeficiente quadrático é 1 ≠ 0.'};
    const note=example.mode==='closure'?`<strong>E é não vazio.</strong> ${nonempty[example.id]} Verifica agora se as operações usuais permanecem em E.`:`<details><summary>E é não vazio e as operações são fechadas em E. <span>Ver a demonstração</span></summary><div class="closure-proof">${example.closureProof}</div></details>`;
    $('#exercise').innerHTML=`
      <div class="exercise-topline"><span class="exercise-position">EXEMPLO ${String(number).padStart(2,'0')} <span class="position-divider">/</span> ${String(collection.length).padStart(2,'0')}</span><div class="exercise-nav"><span class="level-pill">${example.level}</span><button data-prev aria-label="Exemplo anterior" ${number===1?'disabled':''}>←</button><button data-next aria-label="Exemplo seguinte" ${number===collection.length?'disabled':''}>→</button></div></div>
      <article class="case-card"><div class="case-main"><div class="case-copy"><span class="case-tag">${example.tag}</span><h2 id="exercise-title">${example.title}</h2><p class="case-description">${example.subtitle}</p><div class="set-definition">${example.definition}</div><div class="field-label">Corpo de escalares <strong>${example.field}</strong></div></div><div class="diagram-panel">${diagram(example)}</div></div><div class="operations"><div class="operation"><span class="operation-label">ADIÇÃO DE VETORES</span><div class="math">${example.sum}</div></div><div class="operation"><span class="operation-label">MULTIPLICAÇÃO POR ESCALARES</span><div class="math">${example.scalar}</div>${example.operationNote?`<p class="operation-note">${example.operationNote}</p>`:''}</div></div><div class="case-footnote">${note}</div></article>
      ${mode==='axioms'?'<details class="dependency-note route-note"><summary>Sobre os nove desafios deste percurso</summary><p>Há oito quase-exemplos que falham exatamente um axioma, cobrindo A1, A3, A5, A6, A7 e A8. O desafio de A2 explora a ligação entre o neutro e os simétricos, por isso não é uma falha isolada. A dependência de A4 é demonstrada na referência dos axiomas.</p></details>':''}
      <section id="claims-section" aria-labelledby="claims-title"><div class="checklist-heading"><div><h3 id="claims-title" tabindex="-1">${mode==='closure'?'As operações ficam em E?':'Quais os axiomas satisfeitos?'}</h3><p>Escolhe «Sim» ou «Não». Recebes logo a explicação.</p></div><div class="claim-score"><span id="claim-progress"></span><span id="correct-count"></span></div></div>
      <div class="axiom-grid">${questions.map((q,i)=>questionRow(example,entry,q,i)).join('')}</div>
      <p class="checklist-note"><span></span>${mode==='closure'?'Os oito axiomas pressupõem operações com valores em E.':'Cada identidade tem de valer para todos os vetores e todos os escalares permitidos.'}</p></section>
      <div class="action-bar"><button class="hint-button" type="button" id="hint" aria-expanded="${entry.hint}" aria-controls="hint-box"><span aria-hidden="true">☼</span> ${entry.hint?'Ocultar pista':'Uma pista'}</button><button class="reset-button" type="button" id="reset">Recomeçar este exemplo</button></div>
      <div class="hint-box" id="hint-box" ${entry.hint?'':'hidden'}><strong>Pista.</strong> ${example.hint}</div>
      <section id="feedback-summary" class="feedback-summary" tabindex="-1" hidden></section>
      <section id="solution-panel" class="solution-panel" hidden></section>
      <div class="exercise-bottom"><span class="source">${example.source}</span><button class="text-button" id="reveal" ${entry.revealed?'disabled':''}>${entry.revealed?'Resolução consultada':'Ver resolução completa'} <span aria-hidden="true">↗</span></button></div>`;
    renderAssessment();bindExercise();
  }
  function nextUnresolved() {
    const ordered=cases.filter(item=>item.mode===mode),at=ordered.findIndex(item=>item.id===state.current);
    const cyclic=ordered.slice(at+1).concat(ordered.slice(0,at));
    const next=cyclic.find(item=>!(state.work[item.id]||{}).solved)||cases.find(item=>item.id!==state.current&&!(state.work[item.id]||{}).solved)||cyclic[0];
    if(next)choose(next.id,true);
  }
  function chooseAnswer(button) {
    const example=current(),entry=work();if(entry.revealed)return;
    const index=Number(button.dataset.claim),value=button.dataset.answer==='true';
    entry.selected[index]=value;
    const result=grade(example,entry.selected),correct=value===example.answers[index];
    entry.solved=result.complete;
    const row=button.closest('.axiom-card');
    row.classList.add('has-answer');row.classList.toggle('is-correct',correct);row.classList.toggle('is-wrong',!correct);
    row.querySelectorAll('[data-answer]').forEach(choice=>choice.setAttribute('aria-pressed',(choice.dataset.answer==='true')===value));
    const feedback=$('#feedback-'+index);feedback.innerHTML=feedbackRow(example,entry,index);feedback.hidden=false;
    save();renderCatalogue();renderAssessment();
    const question=(example.mode==='closure'?closureQuestions:axioms)[index];
    announce(`${question.name}. ${correct?'Correto.':'A resposta não está correta.'} A propriedade ${example.answers[index]?'é':'não é'} satisfeita. A explicação passo a passo está abaixo dos botões.${result.complete?' Todas as respostas estão corretas; exercício resolvido.':''}`);
  }
  function bindExercise() {
    $('#claims-section').addEventListener('click',event=>{const button=event.target.closest('[data-claim]');if(button)chooseAnswer(button);});
    $('#hint').addEventListener('click',()=>{const entry=work();entry.hint=!entry.hint;$('#hint-box').hidden=!entry.hint;$('#hint').setAttribute('aria-expanded',entry.hint);$('#hint').innerHTML=`<span aria-hidden="true">☼</span> ${entry.hint?'Ocultar pista':'Uma pista'}`;if(entry.hint)announce('Pista: '+$('#hint-box').textContent.replace('Pista.',''));save();});
    $('#reset').addEventListener('click',resetCurrent);
    $('#reveal').addEventListener('click',()=>{const entry=work();entry.selected=current().answers.slice();entry.revealed=true;save();renderCatalogue();renderExercise();$('#claims-title').focus({preventScroll:true});$('#claims-title').scrollIntoView({block:'start'});announce('Resolução consultada. Todas as respostas e explicações estão visíveis. Consultar não conta como resolver.');});
    $('#solution-panel').addEventListener('click',event=>{if(event.target.closest('[data-try-again]'))resetCurrent();if(event.target.closest('[data-next-unresolved]'))nextUnresolved();});
    on('[data-prev]','click',()=>step(-1));on('[data-next]','click',()=>step(1));
    on('#wave-amplitude','input',event=>{const a=Number(event.target.value);$('#wave-sum').innerHTML=plot(x=>a*Math.sin(x)+Math.cos(x),'#216650');$('#wave-value').textContent=a.toLocaleString('pt-PT');$('.diagram-caption').textContent=`${a.toLocaleString('pt-PT')} sen x + cos x, a verde escuro.`;});
  }
  function resetCurrent() {delete state.work[state.current];work();save();renderCatalogue();renderExercise();$('#claim-0-yes').focus({preventScroll:true});announce('Exercício reiniciado. Todas as propriedades estão por responder.');}
  function step(direction) { const ordered=cases.filter(item=>item.mode===mode);const index=ordered.findIndex(item=>item.id===state.current);if(ordered[index+direction])choose(ordered[index+direction].id,true); }
  function choose(id,focus=false) {
    const example=cases.find(item=>item.id===id);if(!example)return;
    state.current=id;mode=example.mode;
    try{history.replaceState(null,'','#'+id);}catch(_){}
    save();renderCatalogue();renderExercise();
    if(focus){$('#exercise').focus({preventScroll:true});$('#exercise').scrollIntoView({block:'start',behavior:'auto'});}
    announce(`${example.title}. ${example.mode === 'closure' ? 'Decide quais os fechos satisfeitos.' : 'Decide quais os oito axiomas satisfeitos.'}`);
  }
  $('#example-list').addEventListener('click',event=>{const button=event.target.closest('[data-case]');if(button)choose(button.dataset.case,window.innerWidth<841);});
  document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
    if(button.dataset.mode===mode)return;mode=button.dataset.mode;query='';$('#search').value='';onlyUnsolved=false;
    choose(cases.find(item=>item.mode===mode).id);
  }));
  $('#search').addEventListener('input',event=>{query=event.target.value;renderCatalogue();});
  $('#unsolved').addEventListener('click',()=>{onlyUnsolved=!onlyUnsolved;renderCatalogue();});
  window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(cases.some(item=>item.id===id)){query='';$('#search').value='';onlyUnsolved=false;choose(id);}});
  $('#reference-axioms').innerHTML=axioms.map((axiom,i)=>`<div class="reference-row"><span>${String(i+1).padStart(2,'0')}</span><div><strong>${axiom.name}</strong><span class="math">${axiom.formula}</span><p>${axiom.help}</p></div></div>`).join('');
  $('#commutativity-proof').innerHTML=VectorProofs.dependence;
  const openDialog=(id,trigger)=>{const dialog=$(id);dialog.addEventListener('close',()=>trigger.focus({preventScroll:true}),{once:true});dialog.showModal();};
  $('#guide-open').addEventListener('click',event=>openDialog('#guide-dialog',event.currentTarget));
  $('#axioms-open').addEventListener('click',event=>openDialog('#axioms-dialog',event.currentTarget));
  document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}}));
  renderCatalogue();renderExercise();save();
})();
