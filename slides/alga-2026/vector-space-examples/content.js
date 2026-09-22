/* Exercise definitions. Abstract addition is #, as in the lecture notes. */
const VectorLab = (() => {
  'use strict';
  const detail = typeof module !== 'undefined' && module.exports ? require('./proofs.js') : VectorProofs;
  const axioms = [
  {
    "name": "Associatividade da adição",
    "formula": "(u # v) # w = u # (v # w)",
    "help": "Mudar os parênteses não altera a soma."
  },
  {
    "name": "Existência de elemento neutro",
    "formula": "∃ 0<sub>E</sub> ∈ E: u # 0<sub>E</sub> = 0<sub>E</sub> # u = u",
    "help": "Há um único elemento que deixa qualquer vetor inalterado, de ambos os lados."
  },
  {
    "name": "Existência de simétricos",
    "formula": "∀ u ∈ E, ∃ u′ ∈ E: u # u′ = u′ # u = 0<sub>E</sub>",
    "help": "Cada vetor tem um simétrico para a adição, relativamente ao neutro de A2."
  },
  {
    "name": "Comutatividade da adição",
    "formula": "u # v = v # u",
    "help": "Trocar a ordem dos vetores não altera a soma."
  },
  {
    "name": "Distributividade sobre os vetores",
    "formula": "α ⊙ (u # v) = (α ⊙ u) # (α ⊙ v)",
    "help": "Multiplicar uma soma equivale a multiplicar cada parcela."
  },
  {
    "name": "Distributividade sobre os escalares",
    "formula": "(α + β) ⊙ u = (α ⊙ u) # (β ⊙ u)",
    "help": "Somar os escalares antes de multiplicar dá o mesmo resultado."
  },
  {
    "name": "Associatividade mista",
    "formula": "(αβ) ⊙ u = α ⊙ (β ⊙ u)",
    "help": "Duas multiplicações sucessivas equivalem a uma pelo produto dos escalares."
  },
  {
    "name": "Identidade escalar",
    "formula": "1 ⊙ u = u",
    "help": "Multiplicar pelo escalar 1 deixa o vetor inalterado."
  }
];
  const closureQuestions = [
  {
    "name": "Fecho para a adição",
    "formula": "u, v ∈ E ⇒ u # v ∈ E"
  },
  {
    "name": "Fecho para os escalares",
    "formula": "α ∈ 𝕂, u ∈ E ⇒ α ⊙ u ∈ E"
  }
];
  const cases = [
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Notas da aula · p. 15",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "r2",
    "title": "O plano real",
    "subtitle": "Pares de números, com as operações que já conheces.",
    "icon": "ℝ²",
    "tag": "VETORES E COORDENADAS",
    "diagram": "plane",
    "definition": "E = ℝ²",
    "sum": "(x, y) # (s, t) = (x + s, y + t)",
    "scalar": "α ⊙ (x, y) = (αx, αy)",
    "closure": "Somar dois pares reais ou multiplicar um par por um real produz outro par real.",
    "hint": "Experimenta os candidatos (0, 0) para neutro e (−x, −y) para simétrico de (x, y). Depois usa as propriedades dos números reais.",
    "conclusion": "É um espaço vetorial sobre ℝ. Os oito axiomas resultam das propriedades dos números reais em cada coordenada."
  },
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Notas da aula · p. 15",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "matrices",
    "title": "Matrizes de 2 × 2",
    "subtitle": "Uma matriz também pode ser um vetor. Repara nas operações.",
    "icon": "[ ]",
    "tag": "PARA ALÉM DAS SETAS",
    "diagram": "matrix",
    "definition": "E = M₂,₂(ℝ)",
    "sum": "(A # B)<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub>",
    "scalar": "(α ⊙ A)<sub>ij</sub> = αa<sub>ij</sub>",
    "closure": "A soma e o produto por um real continuam a ser matrizes reais de 2 × 2.",
    "hint": "O neutro da adição é a matriz com as quatro entradas iguais a zero. Verifica a soma em cada uma das quatro posições.",
    "conclusion": "É um espaço vetorial real. Uma matriz de 2 × 2 comporta-se, nestas operações, como uma lista de quatro números."
  },
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Inspirado nas notas · p. 15",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "polynomials",
    "title": "Polinómios até grau 2",
    "subtitle": "O grau pode ser menor do que 2. O polinómio nulo também está incluído.",
    "icon": "x²",
    "tag": "OS COEFICIENTES COMO COORDENADAS",
    "diagram": "polynomial",
    "definition": "E = {a + bx + cx² : a, b, c ∈ ℝ}",
    "sum": "(p # q)(x) = p(x) + q(x)",
    "scalar": "(α ⊙ p)(x) = αp(x)",
    "closure": "Somar ou multiplicar por um real não cria termos de grau superior a 2.",
    "hint": "Escreve p(x) = a + bx + cx². O que acontece aos três coeficientes quando somas ou multiplicas por um real?",
    "conclusion": "É um espaço vetorial real. A correspondência a + bx + cx² ↦ (a, b, c) transforma as operações nas operações usuais de ℝ³."
  },
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Notas da aula · p. 15",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "functions",
    "title": "Funções reais",
    "subtitle": "Todas as funções de ℝ em ℝ, sem exigir continuidade ou uma fórmula particular.",
    "icon": "f(x)",
    "tag": "SOMAR PONTO A PONTO",
    "diagram": "functions",
    "definition": "E = F(ℝ, ℝ)",
    "sum": "(f # g)(x) = f(x) + g(x)",
    "scalar": "(α ⊙ f)(x) = αf(x)",
    "closure": "Estas regras atribuem um número real a cada x real: definem de novo funções de ℝ em ℝ.",
    "hint": "Duas funções são iguais se têm o mesmo valor para todos os x. Verifica cada identidade num ponto x arbitrário.",
    "conclusion": "É um espaço vetorial real. Cada identidade é uma igualdade de números reais, válida em todos os pontos x."
  },
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Notas da aula · pp. 15–17",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "sequences",
    "title": "Sucessões reais",
    "subtitle": "Listas infinitas de números. Não se exige que convirjam.",
    "icon": "aₙ",
    "tag": "INFINITAS COORDENADAS",
    "diagram": "sequence",
    "definition": "E = {(aₙ)<sub>n≥1</sub> : aₙ ∈ ℝ}",
    "sum": "(aₙ) # (bₙ) = (aₙ + bₙ)",
    "scalar": "α ⊙ (aₙ) = (αaₙ)",
    "closure": "Cada termo da nova sucessão continua a ser real, para todo o índice n.",
    "hint": "O número de termos não muda a verificação. Escolhe um índice n arbitrário e aplica as propriedades dos reais ao n-ésimo termo.",
    "conclusion": "É um espaço vetorial real, mesmo tendo infinitas coordenadas. Não é preciso somar a série dos termos nem supor convergência."
  },
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Notas da aula · p. 16",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "complex-real",
    "title": "Complexos, escalares reais",
    "subtitle": "Os vetores são complexos. Os escalares, neste exemplo, são apenas reais.",
    "icon": "ℂ",
    "tag": "O CORPO DE ESCALARES CONTA",
    "diagram": "complex",
    "definition": "E = ℂ, sobre ℝ",
    "sum": "z # w = z + w",
    "scalar": "α ⊙ z = αz, com α ∈ ℝ",
    "closure": "A soma de complexos e o produto de um complexo por um real são complexos.",
    "hint": "Escreve z = x + iy. Multiplicar por um real α dá αx + iαy. Compara com os pares (x, y).",
    "conclusion": "É um espaço vetorial sobre ℝ. Como espaço real, ℂ tem duas coordenadas: a parte real e a parte imaginária."
  },
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Notas da aula · p. 23",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "waves",
    "title": "Seno e cosseno",
    "subtitle": "Uma família de ondas construída com dois ingredientes.",
    "icon": "∿",
    "tag": "COMBINAÇÕES LINEARES",
    "diagram": "waves",
    "definition": "E = {a sen x + b cos x : a, b ∈ ℝ}",
    "sum": "(f # g)(x) = f(x) + g(x)",
    "scalar": "(α ⊙ f)(x) = αf(x)",
    "closure": "Os novos coeficientes são a + c, b + d na soma, e αa, αb no produto por um escalar.",
    "hint": "Soma a sen x + b cos x a c sen x + d cos x. Consegues escrever o resultado usando só sen x e cos x?",
    "conclusion": "É um espaço vetorial real. Somar ondas desta família ou multiplicá-las por um real mantém a forma a sen x + b cos x."
  },
  {
    "mode": "explore",
    "level": "Primeiros passos",
    "field": "ℝ",
    "source": "Notas da aula · p. 22",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "plane-equation",
    "title": "Um plano pela origem",
    "subtitle": "Um único vínculo entre três coordenadas.",
    "icon": "Π",
    "tag": "DAS EQUAÇÕES AOS ESPAÇOS",
    "diagram": "subspace",
    "definition": "E = {(x, y, z) ∈ ℝ³ : x − y + z = 0}",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = αu",
    "closure": "Se x − y + z = 0 para dois vetores, também vale para a soma e para qualquer múltiplo real.",
    "hint": "Se x − y + z = 0, então −x + y − z também é zero. Testa da mesma forma a soma de dois vetores do plano.",
    "conclusion": "É um espaço vetorial real. É precisamente o conjunto das combinações lineares de (1, 2, 1) e (0, 1, 1), como no exemplo das notas."
  },
  {
    "mode": "explore",
    "level": "Um passo além",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "positive",
    "title": "Positivos com outra soma",
    "subtitle": "Aqui «somar» significa multiplicar. Lê as operações antes de decidir.",
    "icon": "ℝ₊",
    "tag": "MUDAR AS REGRAS DO JOGO",
    "diagram": "positive",
    "definition": "E = ℝ<sub>&gt;0</sub>",
    "sum": "u # v = uv",
    "scalar": "α ⊙ u = u<sup>α</sup>",
    "closure": "O produto de positivos é positivo. Se u > 0, então uᵅ > 0 para qualquer α real, incluindo α = 0 ou α < 0.",
    "hint": "O neutro não tem de ser o número 0. Qual é o positivo e tal que ue = u para todos os positivos u?",
    "conclusion": "É um espaço vetorial real! O logaritmo explica porquê: ln(uv) = ln u + ln v e ln(uᵅ) = α ln u. O «vetor nulo» é 1 e o «simétrico» é o recíproco."
  },
  {
    "mode": "explore",
    "level": "Um passo além",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "id": "shifted",
    "title": "Uma nova origem",
    "subtitle": "O número 3 ocupa um lugar especial nestas duas operações.",
    "icon": "↦",
    "tag": "AS OPERAÇÕES DEFINEM O ESPAÇO",
    "diagram": "shifted",
    "definition": "E = ℝ",
    "sum": "u # v = u + v − 3",
    "scalar": "α ⊙ u = 3 + α(u − 3)",
    "closure": "As duas expressões são reais sempre que os dados são reais.",
    "hint": "Aplica a mudança de coordenada T(u) = u − 3. O que acontece a T(u # v) e a T(α ⊙ u)?",
    "conclusion": "É um espaço vetorial real. A coordenada T(u) = u − 3 transforma as duas operações nas operações usuais de ℝ. O neutro é 3, não 0."
  },
  {
    "mode": "explore",
    "level": "Um passo além",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true
    ],
    "genuine": false,
    "id": "mismatch",
    "title": "Uma soma com um extra",
    "subtitle": "Alterámos a adição, mas mantivemos a multiplicação usual por escalares.",
    "icon": "+1",
    "tag": "DUAS OPERAÇÕES EM DIÁLOGO",
    "diagram": "mismatch",
    "definition": "E = ℝ",
    "sum": "u # v = u + v + 1",
    "scalar": "α ⊙ u = αu",
    "closure": "A soma modificada e a multiplicação usual têm sempre resultado real.",
    "hint": "Depois de encontrar o neutro, testa as duas distributividades com escalares iguais a 0. Usa a soma modificada no lado direito.",
    "conclusion": "Não é um espaço vetorial: falham A5 e A6. Alterar uma das operações pode exigir uma alteração correspondente na outra."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": true,
    "tag": "AXIOMAS À PROVA",
    "id": "a1",
    "title": "Uma soma que se dobra",
    "subtitle": "Compara dois produtos de coordenadas para escolher a regra da soma.",
    "icon": "A1",
    "target": 1,
    "diagram": "bent",
    "definition": "E = ℝ²",
    "sum": "u # v = u + v se u₁v₂ = u₂v₁;<br>u # v = 2(u + v) caso contrário",
    "scalar": "α ⊙ u = αu",
    "operationNote": "Se u=(u₁,u₂) e v=(v₁,v₂), calcula u₁v₂ e u₂v₁. Escolhe o ramo comparando esses dois números.",
    "closure": "Ambas as regras da soma e todos os produtos por escalares dão pares reais.",
    "hint": "Usa u=(1,0) e v=w=(0,1). Em cada soma, volta a comparar o produto da primeira coordenada do primeiro vetor pela segunda do outro com o produto na ordem inversa.",
    "conclusion": "Falha apenas A1. A associatividade da adição não é garantida pelos outros sete axiomas."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": false,
    "tag": "AXIOMAS À PROVA",
    "id": "a2",
    "title": "Somar é escolher o maior",
    "subtitle": "Uma operação simples, mas será que tem um neutro em ℝ?",
    "icon": "A2",
    "target": 2,
    "diagram": "maximum",
    "definition": "E = ℝ",
    "sum": "u # v = máx{u, v}",
    "scalar": "α ⊙ u = u, para todo o α ∈ ℝ",
    "closure": "O maior de dois reais é real; o produto por um escalar devolve o próprio vetor.",
    "hint": "Se propuseres um neutro e, testa o real e − 1. Depois lê com cuidado a referência de A3 ao neutro de A2.",
    "conclusion": "Falham A2 e A3. Este é um caso de dependência entre enunciados, não um quase-exemplo de um só axioma."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true
    ],
    "genuine": true,
    "tag": "AXIOMAS À PROVA",
    "id": "a3",
    "title": "Só dois vetores",
    "subtitle": "Um conjunto pequeno, escalares reais e uma operação de máximo.",
    "icon": "A3",
    "target": 3,
    "diagram": "binary",
    "definition": "E = {0, 1}",
    "sum": "u # v = máx{u, v}",
    "scalar": "α ⊙ u = u, para todo o α ∈ ℝ",
    "closure": "O máximo de dois elementos de {0, 1} está em {0, 1}; a operação escalar devolve o próprio elemento.",
    "hint": "Constrói a tabela com as quatro somas possíveis. Que elemento é neutro? O vetor 1 consegue somar-se a algum elemento para dar esse neutro?",
    "conclusion": "Falha apenas A3. Aqui 0 ⊙ 1 = 1, não 0: a identidade 0 ⊙ u = 0_E é uma consequência dos axiomas completos, não uma regra que se possa impor de antemão."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℂ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true
    ],
    "genuine": true,
    "tag": "AXIOMAS À PROVA",
    "id": "a5",
    "title": "Escalares com duas regras",
    "subtitle": "O segundo componente decide se usamos o escalar ou o seu conjugado.",
    "icon": "A5",
    "target": 5,
    "diagram": "complex-rules",
    "definition": "E = ℂ², sobre ℂ",
    "sum": "(z, w) # (s, t) = (z + s, w + t)",
    "scalar": "α ⊙ (z, w) = (αz, αw) se w = 0;<br>α ⊙ (z, w) = (ᾱz, ᾱw) se w ≠ 0",
    "operationNote": "Se α = a + bi, então ᾱ = a − bi. Por exemplo, o conjugado de i é −i.",
    "closure": "Ambas as regras produzem pares complexos, e a soma também.",
    "hint": "Usa o escalar i e os vetores (1, 0) e (0, 1). A soma dos vetores fica no mesmo ramo da definição que cada parcela?",
    "conclusion": "Falha apenas A5. A escolha do corpo ℂ é essencial para este exemplo: se só permitíssemos escalares reais, ᾱ = α e a operação seria a usual."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true
    ],
    "genuine": true,
    "tag": "AXIOMAS À PROVA",
    "id": "a6",
    "title": "O escalar ao quadrado",
    "subtitle": "A soma é familiar. A multiplicação por escalares tem uma surpresa.",
    "icon": "A6",
    "target": 6,
    "diagram": "square",
    "definition": "E = ℝ",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = α²u",
    "closure": "A soma de reais e α²u são sempre reais.",
    "hint": "Compara (1 + 1) ⊙ 1 com (1 ⊙ 1) # (1 ⊙ 1). Na definição, eleva o escalar ao quadrado antes de multiplicar.",
    "conclusion": "Falha apenas A6. A identidade (αβ)² = α²β² funciona, mas (α + β)² = α² + β² não vale em geral."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℂ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true
    ],
    "genuine": true,
    "tag": "AXIOMAS À PROVA",
    "id": "a7",
    "title": "Só a parte real",
    "subtitle": "Os escalares são complexos, mas a operação ignora a parte imaginária.",
    "icon": "A7",
    "target": 7,
    "diagram": "realpart",
    "definition": "E = ℂ, sobre ℂ",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = Re(α)u",
    "operationNote": "Se α = a + bi, então Re(α) = a. Em particular, Re(i) = 0.",
    "closure": "A soma é complexa; Re(α)u também é um número complexo.",
    "hint": "Tenta α = β = i. Recorda que i² = −1, mas Re(i) = 0.",
    "conclusion": "Falha apenas A7. A parte real preserva somas, mas não produtos de complexos."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false
    ],
    "genuine": true,
    "tag": "AXIOMAS À PROVA",
    "id": "a8",
    "title": "Todos os escalares apagam",
    "subtitle": "Qualquer escalar envia qualquer vetor para zero.",
    "icon": "A8",
    "target": 8,
    "diagram": "zero",
    "definition": "E = ℝ",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = 0, para todo o α, u ∈ ℝ",
    "closure": "A soma é real e a multiplicação por escalares dá 0 ∈ ℝ.",
    "hint": "Mesmo o escalar 1 usa a regra α ⊙ u = 0. Testa-o num vetor não nulo.",
    "conclusion": "Falha apenas A8. As duas distributividades e a associatividade mista não obrigam o escalar 1 a atuar como identidade."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true
    ],
    "genuine": true,
    "tag": "VARIAÇÃO DE UM DESAFIO",
    "id": "absolute",
    "title": "Escalares sem sinal",
    "subtitle": "Um segundo modo de alterar a ação dos números negativos.",
    "icon": "|α|",
    "target": 6,
    "diagram": "absolute",
    "definition": "E = ℝ",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = |α|u",
    "closure": "As duas operações continuam a ter resultados reais.",
    "hint": "Tenta somar os escalares 1 e −1 antes e depois de aplicá-los ao vetor 1.",
    "conclusion": "Falha apenas A6. Este é o sétimo quase-exemplo genuíno da coleção, uma variação do desafio sobre distributividade nos escalares."
  },
  {
    "mode": "axioms",
    "level": "Desafio",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false
    ],
    "genuine": true,
    "tag": "VARIAÇÃO DE UM DESAFIO",
    "id": "projection",
    "title": "Uma coordenada desaparece",
    "subtitle": "A multiplicação por escalares esquece sempre a segunda coordenada.",
    "icon": "P",
    "target": 8,
    "diagram": "projection",
    "definition": "E = ℝ²",
    "sum": "(x, y) # (s, t) = (x + s, y + t)",
    "scalar": "α ⊙ (x, y) = (αx, 0)",
    "closure": "Os resultados são sempre pares reais. A imagem da operação escalar está no eixo horizontal.",
    "hint": "Experimenta multiplicar (0, 1) por 1. Para A7, repara que apagar a segunda coordenada duas vezes é igual a apagá-la uma vez.",
    "conclusion": "Falha apenas A8. É o oitavo quase-exemplo genuíno da coleção. A operação escalar pode até ter valores não nulos e, mesmo assim, falhar a identidade escalar."
  },
  {
    "mode": "closure",
    "level": "Testar o fecho",
    "field": "ℝ",
    "source": "Notas da aula · p. 23",
    "answers": [
      true,
      false
    ],
    "genuine": false,
    "tag": "ANTES DOS OITO AXIOMAS",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = αu",
    "id": "halfplane",
    "title": "O semiplano superior",
    "subtitle": "Só são permitidos vetores cuja segunda coordenada é não negativa.",
    "icon": "y≥0",
    "diagram": "halfplane",
    "definition": "E = {(x, y) ∈ ℝ² : y ≥ 0}",
    "hint": "Para a soma, somam-se duas coordenadas não negativas. Para o produto por um escalar, não te esqueças dos negativos.",
    "conclusion": "Não é um espaço vetorial real com estas operações. Falha o fecho para os escalares; a operação ℝ × E → E exigida pela definição nem sequer está bem definida."
  },
  {
    "mode": "closure",
    "level": "Testar o fecho",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      false,
      false
    ],
    "genuine": false,
    "tag": "ANTES DOS OITO AXIOMAS",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = αu",
    "id": "circle",
    "title": "A circunferência unitária",
    "subtitle": "Todos os vetores têm comprimento 1. Será que as operações preservam essa condição?",
    "icon": "○",
    "diagram": "circle",
    "definition": "E = {(x, y) ∈ ℝ² : x² + y² = 1}",
    "hint": "Testa somar (1, 0) a si próprio. Depois testa o escalar 0.",
    "conclusion": "Não é um espaço vetorial. Falham os dois fechos; além disso, o vetor nulo usual não está na circunferência."
  },
  {
    "mode": "closure",
    "level": "Testar o fecho",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      true,
      false
    ],
    "genuine": false,
    "tag": "ANTES DOS OITO AXIOMAS",
    "sum": "u # v = u + v",
    "scalar": "α ⊙ u = αu",
    "id": "integers",
    "title": "Uma grelha de inteiros",
    "subtitle": "Pares de inteiros, mas com todos os reais disponíveis como escalares.",
    "icon": "ℤ²",
    "diagram": "lattice",
    "definition": "E = ℤ², sobre ℝ",
    "hint": "Somar inteiros preserva as coordenadas inteiras. E multiplicar (1, 0) por 1/2?",
    "conclusion": "Não é um espaço vetorial sobre ℝ. Ter neutro, simétricos e uma boa adição não basta: falta fecho para todos os escalares do corpo."
  },
  {
    "mode": "closure",
    "level": "Testar o fecho",
    "field": "ℝ",
    "source": "Exemplo original",
    "answers": [
      false,
      false
    ],
    "genuine": false,
    "tag": "ANTES DOS OITO AXIOMAS",
    "sum": "(p # q)(x) = p(x) + q(x)",
    "scalar": "(α ⊙ p)(x) = αp(x)",
    "id": "exact-quadratics",
    "title": "Polinómios de grau exato 2",
    "subtitle": "Desta vez, o coeficiente de x² não pode ser zero.",
    "icon": "=2",
    "diagram": "polynomial",
    "definition": "E = {a + bx + cx² : a, b, c ∈ ℝ, c ≠ 0}",
    "hint": "Compara «grau até 2» com «grau exatamente 2». O que acontece ao somar x² e −x²?",
    "conclusion": "Não é um espaço vetorial: falham os dois fechos. A família de grau até 2, incluindo o polinómio nulo, é um espaço vetorial; esta família mais restrita não é."
  }
];
  cases.forEach(example => detail.attach(example));
  function grade(example, selected) {
    const wrong=[], unanswered=[];
    let correct=0;
    example.answers.forEach((expected,i) => {
      if (typeof selected[i] !== 'boolean') unanswered.push(i);
      else if (selected[i] === expected) correct++;
      else wrong.push(i);
    });
    return {correct,total:example.answers.length,answered:example.answers.length-unanswered.length,wrong,unanswered,complete:!wrong.length&&!unanswered.length,isSpace:example.mode!=='closure'&&example.answers.every(Boolean)};
  }
  function restoreProgress(saved) {
    const state={version:2,current:'r2',work:{}};
    if (!saved || ![1,2].includes(saved.version) || !saved.work || typeof saved.work!=='object') return state;
    if (cases.some(c=>c.id===saved.current)) state.current=saved.current;
    cases.forEach(example=>{
      const old=saved.work[example.id];
      if(!old || !Array.isArray(old.selected) || old.selected.length!==example.answers.length)return;
      const confirmed=saved.version===2 || !!old.checked || !!old.revealed;
      const selected=old.selected.map(value=>typeof value==='boolean'&&(confirmed||value===true)?value:null);
      const revealed=!!old.revealed;
      state.work[example.id]={selected,hint:!!old.hint,revealed,solved:revealed?!!old.solved:grade(example,selected).complete};
    });
    return state;
  }
  return {axioms,closureQuestions,cases,grade,restoreProgress};
})();
if (typeof module !== 'undefined' && module.exports) module.exports = VectorLab;
