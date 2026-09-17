window.WEEK_1_2_EXERCISE_BANK = {
  "schemaVersion": 1,
  "block": {
    "id": "weeks-1-2",
    "title": "Semanas 1–2",
    "description": "Elementos aleatórios, distribuições de probabilidade, momentos e transformadas",
    "exerciseCount": 40,
    "sessionSize": 8,
    "featuredTopics": [
      "Variáveis aleatórias",
      "Probabilidade",
      "Valor esperado",
      "Distribuições",
      "Covariância",
      "Ideias de demonstração"
    ],
    "reviewHref": "../../pt/index.html#/espaços-de-probabilidade-e-distribuições-unidimensionais"
  },
  "implementationNotes": {
    "sessionSelection": "Oito perguntas distintas deste banco: 2 de introdução, 4 de consolidação e 2 de desafio; no máximo 4 perguntas numéricas e 2 do mesmo tema.",
    "translation": "Tradução em português europeu. Os identificadores, as opções corretas, os valores numéricos e as dificuldades são preservados da versão inglesa.",
    "answerNormalization": "Aceitam-se vírgula ou ponto decimal, frações e percentagens. A lógica de correção é partilhada com a versão inglesa.",
    "proofQuestions": "Cada exercício de demonstração apresenta o teorema, as hipóteses e os passos anteriores. Os três exercícios de demonstração do banco original das semanas 1–2 receberam este enquadramento explícito.",
    "sourceLinks": "As referências visíveis apontam para os slides portugueses locais. A numeração foi verificada nesta versão dos slides; as âncoras são estáveis.",
    "progress": "Cada banco mantém a sua pontuação e número de sessões. As versões portuguesa e inglesa partilham o progresso do mesmo banco neste navegador e origem."
  },
  "sourceCatalog": {
    "course-slides-w1-2": {
      "title": "Statistical Inference — Week 1 and 2 slides",
      "author": "Jorge Milhazes Freitas",
      "url": "https://drive.google.com/file/d/19OF-2yvRMaCyc1dOLgDCIR6iAGFMsvNP/view?usp=share_link",
      "notes": "The linked 59-page PDF covers random elements, distribution functions, random vectors, conditional probability and independence, types of random variables and vectors, expectation, variance, covariance, common distributions, and characteristic functions. PDF-page locators below refer to the downloaded PDF page, not the smaller slide counter printed in its footer."
    },
    "course-worksheet-1": {
      "title": "Statistical Inference — Worksheet 1",
      "url": "https://drive.google.com/file/d/19vH7VEJUvoxPdVlWXLpZwo3mJqJ18WvA/view?usp=share_link"
    },
    "course-worksheet-2": {
      "title": "Statistical Inference — Worksheet 2",
      "url": "https://drive.google.com/file/d/19jm4iXkruFuZBA1crgQRho11rS9VJg6M/view?usp=share_link"
    },
    "course-solutions-w1-2": {
      "title": "Statistical Inference — Solutions of Worksheets 1 and 2",
      "url": "https://drive.google.com/file/d/19vngGT5hZAh2DAf05LI7TxzzBvXxic78/view?usp=share_link"
    },
    "psu-independent-events": {
      "title": "Penn State STAT 414 — Independent Events",
      "url": "https://online.stat.psu.edu/stat414/Lesson05"
    },
    "psu-covariance": {
      "title": "Penn State STAT 414 — The Correlation Coefficient",
      "url": "https://online.stat.psu.edu/stat414/Lesson18",
      "notes": "Used to verify that independence implies zero covariance, while zero covariance does not imply independence in general."
    },
    "nist-binomial": {
      "title": "NIST/SEMATECH e-Handbook — Binomial Distribution",
      "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm"
    },
    "nist-poisson": {
      "title": "NIST/SEMATECH e-Handbook — Poisson Distribution",
      "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda366j.htm"
    },
    "nist-normal": {
      "title": "NIST/SEMATECH e-Handbook — What do we mean by Normal data?",
      "url": "https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc51.htm"
    },
    "nist-exponential": {
      "title": "NIST/SEMATECH e-Handbook — Exponential Distribution",
      "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda3667.htm"
    },
    "nist-gamma": {
      "title": "NIST/SEMATECH e-Handbook — Gamma",
      "url": "https://www.itl.nist.gov/div898/handbook/apr/section1/apr165.htm"
    },
    "mit-characteristic-functions": {
      "title": "MIT OpenCourseWare 18.175 — Lecture 8: Characteristic functions",
      "url": "https://ocw.mit.edu/courses/18-175-theory-of-probability-spring-2014/887e96172e82a615dac16fb26702d88b_MIT18_175S14_Lecture8.pdf"
    },
    "portuguese-slides": {
      "title": "Inferência Estatística 2026 — Slides em português",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../../pt/index.html",
      "deckSha256": "def6d2253263b7deff21bf8dede330bfa2d37c363bd5ee2498f4ffc85673f15a",
      "slideRange": [
        12,
        105
      ]
    }
  },
  "editorialNotes": [
    "Mantêm-se as fontes bibliográficas originais, algumas em inglês. As ligações apresentadas após cada resposta remetem para os slides locais em português.",
    "Na página 5 do PDF original, o segundo limite da FD tem de ser x→+∞, com valor 1.",
    "Na página 34 do PDF original, a independência implica covariância nula; a recíproca não é válida em geral. A pergunta 025 usa a implicação correta.",
    "Na página 43 do PDF original, a identidade correta é φ^(k)(0)=i^k E(X^k), supondo a existência do momento absoluto correspondente.",
    "Os exercícios usam a parametrização geral N(μ,σ²); o texto da página 38 do PDF original contém uma gralha sobre σ²."
  ],
  "exercises": [
    {
      "id": "wk01-02-001",
      "type": "multiple-choice",
      "topic": "Elementos aleatórios",
      "difficulty": "intro",
      "prompt": "Que condição torna uma aplicação X: Ω → S num elemento aleatório, quando S está munido da sua σ-álgebra de Borel?",
      "options": [
        {
          "id": "a",
          "text": "X tem de ser injetiva."
        },
        {
          "id": "b",
          "text": "Para todo o conjunto de Borel B em S, X⁻¹(B) tem de pertencer a F."
        },
        {
          "id": "c",
          "text": "S tem de ser um conjunto finito."
        },
        {
          "id": "d",
          "text": "X tem de tomar todos os valores de S."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Um elemento aleatório é uma aplicação mensurável. A mensurabilidade significa que a imagem inversa de qualquer conjunto de Borel de S é um acontecimento de F.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 20,
          "anchor": "elementos-aleatórios"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 4, Random elements"
        }
      ],
      "context": [
        {
          "label": "Enquadramento",
          "text": "Considere o espaço de probabilidade (Ω,F,P)."
        }
      ]
    },
    {
      "id": "wk01-02-002",
      "type": "multiple-choice",
      "topic": "Elementos aleatórios",
      "difficulty": "intro",
      "prompt": "Qual é a designação mais adequada para uma aplicação mensurável X: Ω → ℝ⁴?",
      "options": [
        {
          "id": "a",
          "text": "Uma variável aleatória"
        },
        {
          "id": "b",
          "text": "Um vetor aleatório"
        },
        {
          "id": "c",
          "text": "Uma medida de probabilidade"
        },
        {
          "id": "d",
          "text": "Uma função aleatória em C([0,1])"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Um elemento aleatório com valores reais é uma variável aleatória; um elemento com valores em ℝᵈ, com d ≥ 2, é um vetor aleatório.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 21,
          "anchor": "tipos-de-elementos-aleatórios"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 4, Random elements"
        }
      ]
    },
    {
      "id": "wk01-02-003",
      "type": "multiple-choice",
      "topic": "Elementos aleatórios",
      "difficulty": "core",
      "prompt": "Para uma variável aleatória X e um conjunto de Borel A, que fórmula define a lei P_X de X?",
      "options": [
        {
          "id": "a",
          "text": "P_X(A) = P(A) / P(X)"
        },
        {
          "id": "b",
          "text": "P_X(A) = P(X ∈ A) = P(X⁻¹(A))"
        },
        {
          "id": "c",
          "text": "P_X(A) = X(P(A))"
        },
        {
          "id": "d",
          "text": "P_X(A) = 1 − P(A)"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "A distribuição de X é a medida imagem de P por X: atribui a A a probabilidade do acontecimento em que o valor de X pertence a A.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 24,
          "anchor": "distribuição-de-um-elemento-aleatório"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 4, law/distribution of X"
        }
      ]
    },
    {
      "id": "wk01-02-004",
      "type": "find-the-intruder",
      "topic": "Funções de distribuição",
      "difficulty": "intro",
      "prompt": "Três afirmações são verdadeiras para qualquer função de distribuição F. Identifique a intrusa.",
      "options": [
        {
          "id": "a",
          "text": "F é não decrescente."
        },
        {
          "id": "b",
          "text": "F é contínua à direita."
        },
        {
          "id": "c",
          "text": "F(x) tende para 0 quando x→−∞ e para 1 quando x→+∞."
        },
        {
          "id": "d",
          "text": "F é contínua em todos os números reais."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Uma função de distribuição pode ter saltos nos átomos, pelo que não tem de ser contínua em todos os pontos. É sempre não decrescente e contínua à direita, com os limites nos extremos indicados.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 27,
          "anchor": "funções-de-distribuição"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 5, Distribution function; corrected +∞ endpoint noted in editorialNotes"
        }
      ]
    },
    {
      "id": "wk01-02-005",
      "type": "numeric-input",
      "topic": "Funções de distribuição",
      "difficulty": "intro",
      "prompt": "Uma função de distribuição satisfaz F(2⁻)=0.55 e F(2)=0.70. Qual é o valor de P(X=2)?",
      "options": [],
      "acceptedAnswers": [
        "0.15",
        ".15",
        "15%",
        "3/20"
      ],
      "correctAnswer": "0.15",
      "explanation": "A probabilidade de um átomo é o salto da FD: P(X=2)=F(2)−F(2⁻)=0.70−0.55=0.15.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 29,
          "anchor": "limites-à-esquerda-e-probabilidades-pontuais"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 5, jump/saltus formula"
        }
      ]
    },
    {
      "id": "wk01-02-006",
      "type": "multiple-choice",
      "topic": "Funções de distribuição",
      "difficulty": "core",
      "prompt": "Sejam P(X=0)=0.25, P(X=2)=0.50 e P(X=5)=0.25. Usando F⁻¹(u)=inf{x:F(x)≥u}, qual é o valor de F⁻¹(0.60)?",
      "options": [
        {
          "id": "a",
          "text": "0"
        },
        {
          "id": "b",
          "text": "2"
        },
        {
          "id": "c",
          "text": "5"
        },
        {
          "id": "d",
          "text": "0.60"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "F vale 0.25 desde 0 até antes de 2 e atinge 0.75 em 2. O primeiro x para o qual F(x)≥0.60 é, portanto, 2.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 33,
          "anchor": "a-inversa-generalizada"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF pages 6–7, generalized inverse distribution function"
        }
      ]
    },
    {
      "id": "wk01-02-007",
      "type": "proof-step",
      "topic": "Funções de distribuição",
      "difficulty": "core",
      "prompt": "Que princípio da probabilidade permite concluir a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "A desigualdade da união"
        },
        {
          "id": "b",
          "text": "A continuidade da probabilidade para sucessões decrescentes"
        },
        {
          "id": "c",
          "text": "O teorema de Bayes"
        },
        {
          "id": "d",
          "text": "A regra do produto para acontecimentos independentes"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Como A_n↓{X≤x}, a continuidade para sucessões decrescentes dá P(A_n)→P(X≤x), ou seja, F(x+1/n)→F(x). Pela monotonia de F, os valores com x<t≤x+1/n ficam entre F(x) e F(x+1/n); segue-se a continuidade à direita.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 28,
          "anchor": "continuidade-à-direita-e-limites-nos-extremos"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 5, proof of right-continuity"
        }
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Seja X uma variável aleatória real com função de distribuição F(x)=P(X≤x). Então F é contínua à direita em todo o x∈ℝ."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe x∈ℝ e defina A_n={X≤x+1/n}. Os acontecimentos A_n decrescem para {X≤x}: estão encaixados e a sua interseção é {X≤x}. Além disso, P(A_n)=F(x+1/n)."
        }
      ]
    },
    {
      "id": "wk01-02-008",
      "type": "numeric-input",
      "topic": "Vetores aleatórios",
      "difficulty": "core",
      "prompt": "O par (X,Y) tem massas 0.10 em (0,0), 0.20 em (0,2), 0.30 em (2,0) e 0.40 em (2,2). Calcule o valor da função de distribuição conjunta F(1,2)=P(X≤1,Y≤2).",
      "options": [],
      "acceptedAnswers": [
        "0.3",
        "0.30",
        ".3",
        "3/10",
        "30%"
      ],
      "correctAnswer": "0.30",
      "explanation": "O retângulo definido por X≤1,Y≤2 contém (0,0) e (0,2), pelo que a probabilidade é 0.10+0.20=0.30.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 43,
          "anchor": "vetores-aleatórios-e-funções-de-distribuição-conjuntas"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 9, joint distribution function and southwest sets"
        }
      ]
    },
    {
      "id": "wk01-02-009",
      "type": "multiple-choice",
      "topic": "Tipos de variáveis aleatórias",
      "difficulty": "intro",
      "prompt": "Qual destas variáveis aleatórias é discreta?",
      "options": [
        {
          "id": "a",
          "text": "O tempo de espera exato até ao próximo autocarro"
        },
        {
          "id": "b",
          "text": "A temperatura exata ao meio-dia"
        },
        {
          "id": "c",
          "text": "O número de mensagens de correio eletrónico recebidas hoje"
        },
        {
          "id": "d",
          "text": "Um ponto escolhido uniformemente em [0,1]"
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Uma contagem toma valores num conjunto numerável. Os restantes exemplos são habitualmente modelados com distribuições contínuas.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 37,
          "anchor": "distribuições-discretas"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF pages 18–20, discrete random variables and PMFs"
        }
      ]
    },
    {
      "id": "wk01-02-010",
      "type": "numeric-input",
      "topic": "Variáveis aleatórias contínuas",
      "difficulty": "core",
      "prompt": "Propõe-se a densidade f(x)=c·x para 0<x<2 e 0 fora desse intervalo. Qual tem de ser o valor de c?",
      "options": [],
      "acceptedAnswers": [
        "0.5",
        ".5",
        "1/2"
      ],
      "correctAnswer": "1/2",
      "explanation": "O integral de uma densidade é 1. Neste caso, ∫₀² c x dx = 2c, pelo que c=1/2.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 38,
          "anchor": "distribuições-absolutamente-contínuas"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 21, absolutely continuous random variables"
        }
      ]
    },
    {
      "id": "wk01-02-011",
      "type": "multiple-choice",
      "topic": "Variáveis aleatórias contínuas",
      "difficulty": "intro",
      "prompt": "Se X tem distribuição absolutamente contínua, qual é o valor de P(X=1)?",
      "options": [
        {
          "id": "a",
          "text": "0"
        },
        {
          "id": "b",
          "text": "f(1)"
        },
        {
          "id": "c",
          "text": "F(1)"
        },
        {
          "id": "d",
          "text": "É sempre 1/2"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Um ponto isolado tem medida de Lebesgue zero, pelo que integrar uma densidade sobre {1} dá probabilidade 0. O valor de uma densidade não é, por si só, uma probabilidade pontual.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 38,
          "anchor": "distribuições-absolutamente-contínuas"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF pages 21–22, density representation"
        }
      ]
    },
    {
      "id": "wk01-02-012",
      "type": "numeric-input",
      "topic": "Vetores aleatórios",
      "difficulty": "core",
      "prompt": "Uma função de probabilidade conjunta é dada por f(0,0)=0.10, f(0,1)=0.20, f(1,0)=0.30 e f(1,1)=0.40. Qual é a probabilidade marginal f_X(0)?",
      "options": [],
      "acceptedAnswers": [
        "0.3",
        "0.30",
        ".3",
        "3/10",
        "30%"
      ],
      "correctAnswer": "0.30",
      "explanation": "Some a função de probabilidade conjunta sobre todos os valores possíveis de y: f_X(0)=f(0,0)+f(0,1)=0.10+0.20=0.30.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 59,
          "anchor": "funções-de-probabilidade-marginais"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF pages 23–24, joint and marginal PMFs"
        }
      ]
    },
    {
      "id": "wk01-02-013",
      "type": "numeric-input",
      "topic": "Vetores aleatórios",
      "difficulty": "core",
      "prompt": "Usando f(0,0)=0.10 e f(0,1)=0.20, calcule P(Y=1 | X=0).",
      "options": [],
      "acceptedAnswers": [
        "0.6667",
        ".6667",
        "0.667",
        ".667",
        "2/3",
        "66.67%",
        "66.7%"
      ],
      "correctAnswer": "2/3",
      "explanation": "P(Y=1|X=0)=f(0,1)/f_X(0)=0.20/(0.10+0.20)=2/3.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 60,
          "anchor": "funções-de-probabilidade-condicionadas"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 25, conditional PMF"
        }
      ],
      "context": [
        {
          "label": "Enquadramento",
          "text": "X e Y tomam valores em {0,1}. A sua função de probabilidade conjunta f(x,y)=P(X=x,Y=y) é dada por f(0,0)=0.10, f(0,1)=0.20, f(1,0)=0.30 e f(1,1)=0.40, com massa zero nos restantes pares."
        }
      ]
    },
    {
      "id": "wk01-02-014",
      "type": "multiple-choice",
      "topic": "Probabilidade condicionada e independência",
      "difficulty": "intro",
      "prompt": "Suponha que P(A)=0.40, P(B)=0.50 e P(A∩B)=0.20. O que pode concluir?",
      "options": [
        {
          "id": "a",
          "text": "A e B são independentes."
        },
        {
          "id": "b",
          "text": "A e B são incompatíveis (disjuntos)."
        },
        {
          "id": "c",
          "text": "P(A|B)=0.20."
        },
        {
          "id": "d",
          "text": "A informação é insuficiente."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "P(A)P(B)=0.40·0.50=0.20=P(A∩B), que é precisamente o critério de independência.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 48,
          "anchor": "acontecimentos-independentes"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF pages 11–12, Definitions 1.5 and 1.7"
        },
        {
          "sourceId": "psu-independent-events",
          "locator": "Definitions 5.1–5.2"
        }
      ]
    },
    {
      "id": "wk01-02-015",
      "type": "multiple-choice",
      "topic": "Probabilidade condicionada e independência",
      "difficulty": "core",
      "prompt": "Lança-se um dado equilibrado. Sejam A={2,4,6} e B={1,2}. A e B são independentes?",
      "options": [
        {
          "id": "a",
          "text": "Sim, porque P(A∩B)=1/6=P(A)P(B)."
        },
        {
          "id": "b",
          "text": "Não, porque A e B têm interseção não vazia."
        },
        {
          "id": "c",
          "text": "Não, porque as suas probabilidades são diferentes."
        },
        {
          "id": "d",
          "text": "Sim, porque todos os acontecimentos de um lançamento de dado são independentes."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A∩B={2}, pelo que P(A∩B)=1/6. Além disso, P(A)P(B)=(1/2)(1/3)=1/6. Uma interseção não vazia não impede a independência.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 50,
          "anchor": "um-dado-independência-e-dependência"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 13, Example 1.10"
        }
      ]
    },
    {
      "id": "wk01-02-016",
      "type": "numeric-input",
      "topic": "Probabilidade condicionada e independência",
      "difficulty": "challenge",
      "prompt": "Num modelo hipotético de uma população, 5% das pessoas têm hipertensão. Dessas pessoas, 75% consomem álcool; entre as pessoas sem hipertensão, 50% consomem álcool. Sabendo que uma pessoa escolhida ao acaso consome álcool, qual é a probabilidade de ter hipertensão? Apresente uma percentagem com duas casas decimais.",
      "options": [],
      "acceptedAnswers": [
        "7.32%",
        "7.32",
        "0.0732",
        ".0732",
        "7.317%",
        "0.07317"
      ],
      "correctAnswer": "7.32%",
      "explanation": "A fórmula de Bayes dá 0.05·0.75 / (0.05·0.75 + 0.95·0.50) = 0.0375/0.5125 ≈ 0.07317, ou 7.32%. Estas probabilidades são as hipóteses do exercício, não uma afirmação médica empírica.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 70,
          "anchor": "ficha-1"
        },
        {
          "sourceId": "course-worksheet-1",
          "locator": "PDF page 1, Exercise 5"
        },
        {
          "sourceId": "course-solutions-w1-2",
          "locator": "PDF page 1, Worksheet 1 solution 5"
        }
      ]
    },
    {
      "id": "wk01-02-017",
      "type": "proof-step",
      "topic": "Probabilidade condicionada e independência",
      "difficulty": "core",
      "prompt": "Porque é que A e B não podem ser independentes?",
      "options": [
        {
          "id": "a",
          "text": "A disjunção dá P(A∩B)=0, mas a positividade dá P(A)P(B)>0."
        },
        {
          "id": "b",
          "text": "Acontecimentos independentes têm de ter a mesma probabilidade."
        },
        {
          "id": "c",
          "text": "Acontecimentos disjuntos têm sempre probabilidade 0."
        },
        {
          "id": "d",
          "text": "A independência exige A∪B=Ω."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A independência exigiria P(A∩B)=P(A)P(B). O membro esquerdo é 0 e o direito é estritamente positivo, uma contradição.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 48,
          "anchor": "acontecimentos-independentes"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 12, addition and multiplication laws"
        },
        {
          "sourceId": "psu-independent-events",
          "locator": "Definition 5.2"
        }
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam A e B acontecimentos disjuntos com P(A)>0 e P(B)>0. Então A e B não são independentes."
        },
        {
          "label": "Demonstração até aqui",
          "text": "A independência exigiria P(A∩B)=P(A)P(B). Vamos comparar os dois membros usando a disjunção e a positividade das probabilidades."
        }
      ]
    },
    {
      "id": "wk01-02-018",
      "type": "multiple-choice",
      "topic": "Vetores aleatórios",
      "difficulty": "core",
      "prompt": "Para variáveis aleatórias discretas X e Y, que condição, válida para todos os x e y, é equivalente à independência?",
      "options": [
        {
          "id": "a",
          "text": "f_X,Y(x,y)=f_X(x)+f_Y(y)"
        },
        {
          "id": "b",
          "text": "f_X,Y(x,y)=f_X(x)f_Y(y)"
        },
        {
          "id": "c",
          "text": "f_X(x)=f_Y(y)"
        },
        {
          "id": "d",
          "text": "f_X,Y(x,y)=0 sempre que x≠y"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Para variáveis aleatórias discretas independentes, cada probabilidade pontual conjunta é o produto das duas probabilidades marginais.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 61,
          "anchor": "independência-e-fatorização-da-função-de-probabilidade"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 24, Remark 1.26"
        }
      ]
    },
    {
      "id": "wk01-02-019",
      "type": "numeric-input",
      "topic": "Valor esperado",
      "difficulty": "core",
      "prompt": "X vale −2 com probabilidade 1/3, 3 com probabilidade 1/2 e 1 com probabilidade 1/6. Calcule E(X).",
      "options": [],
      "acceptedAnswers": [
        "1",
        "1.0"
      ],
      "correctAnswer": "1",
      "explanation": "E(X)=−2(1/3)+3(1/2)+1(1/6)=−4/6+9/6+1/6=1.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 78,
          "anchor": "ficha-1-média-e-variância"
        },
        {
          "sourceId": "course-worksheet-1",
          "locator": "PDF page 2, Exercise 8"
        },
        {
          "sourceId": "course-solutions-w1-2",
          "locator": "PDF page 1, Worksheet 1 solution 8"
        }
      ]
    },
    {
      "id": "wk01-02-020",
      "type": "numeric-input",
      "topic": "Valor esperado",
      "difficulty": "intro",
      "prompt": "Se E(X)=1, qual é o valor de E(2X+5)?",
      "options": [],
      "acceptedAnswers": [
        "7",
        "7.0"
      ],
      "correctAnswer": "7",
      "explanation": "A linearidade dá E(2X+5)=2E(X)+5=2·1+5=7. A linearidade não exige independência.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 74,
          "anchor": "propriedades-do-valor-esperado"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 28, Theorem 2.2"
        },
        {
          "sourceId": "course-worksheet-1",
          "locator": "PDF page 2, Exercise 8(b)"
        }
      ]
    },
    {
      "id": "wk01-02-021",
      "type": "numeric-input",
      "topic": "Valor esperado",
      "difficulty": "core",
      "prompt": "Uma variável aleatória contínua tem densidade f(x)=2x para 0<x<1 e 0 fora desse intervalo. Calcule E(X).",
      "options": [],
      "acceptedAnswers": [
        "0.6667",
        ".6667",
        "0.667",
        ".667",
        "2/3"
      ],
      "correctAnswer": "2/3",
      "explanation": "E(X)=∫₀¹ x·2x dx=2∫₀¹x²dx=2/3.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 73,
          "anchor": "valor-esperado-de-funções-de-uma-variável-aleatória"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 28, expectation for an absolutely continuous random variable"
        }
      ]
    },
    {
      "id": "wk01-02-022",
      "type": "numeric-input",
      "topic": "Variância",
      "difficulty": "core",
      "prompt": "Suponha que E(X)=1 e E(X²)=6. Calcule Var(X).",
      "options": [],
      "acceptedAnswers": [
        "5",
        "5.0"
      ],
      "correctAnswer": "5",
      "explanation": "Var(X)=E(X²)−[E(X)]²=6−1²=5.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 77,
          "anchor": "variância"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 30, Remark 2.6"
        },
        {
          "sourceId": "course-solutions-w1-2",
          "locator": "PDF page 1, Worksheet 1 solution 8"
        }
      ]
    },
    {
      "id": "wk01-02-023",
      "type": "numeric-input",
      "topic": "Variância",
      "difficulty": "intro",
      "prompt": "Se Var(X)=5, qual é o valor de Var(2X+5)?",
      "options": [],
      "acceptedAnswers": [
        "20",
        "20.0"
      ],
      "correctAnswer": "20",
      "explanation": "Somar uma constante não altera a variância, enquanto multiplicar por 2 multiplica a variância por 2². Assim, Var(2X+5)=4·5=20.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 77,
          "anchor": "variância"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 30, Exercise 2.7"
        },
        {
          "sourceId": "course-solutions-w1-2",
          "locator": "PDF page 1, Worksheet 1 solution 8"
        }
      ]
    },
    {
      "id": "wk01-02-024",
      "type": "numeric-input",
      "topic": "Covariância",
      "difficulty": "core",
      "prompt": "Sabendo que E(X)=2, E(Y)=−1 e E(XY)=1.5, calcule Cov(X,Y).",
      "options": [],
      "acceptedAnswers": [
        "3.5",
        "3.50",
        "7/2"
      ],
      "correctAnswer": "3.5",
      "explanation": "Cov(X,Y)=E(XY)−E(X)E(Y)=1.5−2(−1)=3.5.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 80,
          "anchor": "covariância"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 31, Definition 2.8 and Remark 2.9"
        }
      ]
    },
    {
      "id": "wk01-02-025",
      "type": "proof-step",
      "topic": "Covariância e independência",
      "difficulty": "challenge",
      "prompt": "Seja X uniforme em {−1,0,1} e defina Y=X². Tem-se Cov(X,Y)=0. Que conclusão é correta?",
      "options": [
        {
          "id": "a",
          "text": "X e Y são independentes porque a sua covariância é nula."
        },
        {
          "id": "b",
          "text": "X e Y são dependentes: neste exemplo, Y é determinado por X, apesar de a covariância ser nula."
        },
        {
          "id": "c",
          "text": "Y tem de ser constante."
        },
        {
          "id": "d",
          "text": "A covariância não pode ser nula."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "A simetria dá E(X)=E(X³)=0, logo Cov(X,X²)=0. Mas conhecer X determina Y e, por exemplo, P(Y=0|X=0)=1, enquanto P(Y=0)=1/3. Em geral, covariância nula não implica independência.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 84,
          "anchor": "variáveis-não-correlacionadas-mas-dependentes"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 34, expectation and independence; the displayed converse is corrected"
        },
        {
          "sourceId": "psu-covariance",
          "locator": "Lesson 18.3, zero covariance does not imply independence"
        }
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Covariância nula não implica independência. Um contraexemplo é X uniforme em {−1,0,1} e Y=X²: estas variáveis têm covariância nula, mas são dependentes."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Cada um dos três valores de X tem probabilidade 1/3. Pela simetria, E(X)=E(X³)=0, pelo que Cov(X,Y)=E(X³)−E(X)E(X²)=0. Resta verificar se a condição de independência é satisfeita."
        }
      ]
    },
    {
      "id": "wk01-02-026",
      "type": "numeric-input",
      "topic": "Variância e independência",
      "difficulty": "core",
      "prompt": "X e Y são independentes, com Var(X)=4 e Var(Y)=9. Calcule Var(X+Y).",
      "options": [],
      "acceptedAnswers": [
        "13",
        "13.0"
      ],
      "correctAnswer": "13",
      "explanation": "A independência implica Cov(X,Y)=0, pelo que Var(X+Y)=Var(X)+Var(Y)=4+9=13.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 82,
          "anchor": "variância-de-uma-soma"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 34, Proposition 2.16"
        },
        {
          "sourceId": "psu-covariance",
          "locator": "Lesson 18.3, independence implies zero covariance"
        }
      ]
    },
    {
      "id": "wk01-02-027",
      "type": "numeric-input",
      "topic": "Valor esperado",
      "difficulty": "challenge",
      "prompt": "Uma variável X com valores inteiros positivos satisfaz P(X≥1)=1, P(X≥2)=0.4, P(X≥3)=0.1 e P(X≥4)=0. Use a fórmula da soma das probabilidades de cauda para calcular E(X).",
      "options": [],
      "acceptedAnswers": [
        "1.5",
        "1.50",
        "3/2"
      ],
      "correctAnswer": "1.5",
      "explanation": "Para uma variável com valores inteiros positivos, E(X)=Σᵢ≥1 P(X≥i). Neste caso, a soma é 1+0.4+0.1=1.5.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 86,
          "anchor": "fórmulas-de-cauda-para-a-média"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 32, Corollary 2.12"
        }
      ]
    },
    {
      "id": "wk01-02-028",
      "type": "multiple-choice",
      "topic": "Distribuição binomial",
      "difficulty": "intro",
      "prompt": "Dez ensaios independentes têm todos a mesma probabilidade de sucesso p, e X conta os sucessos. Que modelo se adequa a X?",
      "options": [
        {
          "id": "a",
          "text": "Binomial(10,p)"
        },
        {
          "id": "b",
          "text": "Poisson(p)"
        },
        {
          "id": "c",
          "text": "Normal(10,p)"
        },
        {
          "id": "d",
          "text": "Exponencial(p)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma variável binomial conta os sucessos num número fixo de ensaios independentes, com dois resultados possíveis e probabilidade de sucesso constante.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 89,
          "anchor": "a-distribuição-binomial"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 35, Binomial distribution"
        },
        {
          "sourceId": "nist-binomial",
          "locator": "definition and PMF"
        }
      ]
    },
    {
      "id": "wk01-02-029",
      "type": "numeric-input",
      "topic": "Distribuição binomial",
      "difficulty": "core",
      "prompt": "Se X∼Binomial(4,0.5), qual é o valor de P(X=2)?",
      "options": [],
      "acceptedAnswers": [
        "0.375",
        ".375",
        "3/8",
        "37.5%"
      ],
      "correctAnswer": "0.375",
      "explanation": "P(X=2)=C(4,2)(0.5)²(0.5)²=6/16=3/8=0.375.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 89,
          "anchor": "a-distribuição-binomial"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 35, Binomial PMF"
        },
        {
          "sourceId": "nist-binomial",
          "locator": "probability mass function"
        }
      ]
    },
    {
      "id": "wk01-02-030",
      "type": "multiple-choice",
      "topic": "Distribuição binomial",
      "difficulty": "core",
      "prompt": "Para X∼Binomial(20,0.3), que par representa (E(X), Var(X))?",
      "options": [
        {
          "id": "a",
          "text": "(6, 4.2)"
        },
        {
          "id": "b",
          "text": "(6, 6)"
        },
        {
          "id": "c",
          "text": "(14, 4.2)"
        },
        {
          "id": "d",
          "text": "(0.3, 0.21)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma variável Binomial(n,p) tem valor esperado np e variância np(1−p). Assim, 20·0.3=6 e 20·0.3·0.7=4.2.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 89,
          "anchor": "a-distribuição-binomial"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 35, binomial mean and variance"
        },
        {
          "sourceId": "nist-binomial",
          "locator": "common statistics"
        }
      ]
    },
    {
      "id": "wk01-02-031",
      "type": "multiple-choice",
      "topic": "Distribuição de Poisson",
      "difficulty": "intro",
      "prompt": "Chegam clientes a uma taxa média de 3 por hora. X conta as chegadas na próxima hora, segundo um modelo de processo de Poisson de taxa constante. Qual é a distribuição adequada?",
      "options": [
        {
          "id": "a",
          "text": "Poisson(3)"
        },
        {
          "id": "b",
          "text": "Binomial(3,1/2)"
        },
        {
          "id": "c",
          "text": "Exponencial(3)"
        },
        {
          "id": "d",
          "text": "Normal(0,1)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma distribuição de Poisson modela uma contagem de ocorrências num intervalo fixo, sendo λ o número médio de ocorrências nesse intervalo.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 91,
          "anchor": "a-distribuição-de-poisson"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 36, Poisson distribution"
        },
        {
          "sourceId": "nist-poisson",
          "locator": "definition, PMF, and interpretation of λ"
        }
      ]
    },
    {
      "id": "wk01-02-032",
      "type": "numeric-input",
      "topic": "Distribuição de Poisson",
      "difficulty": "core",
      "prompt": "Se X∼Poisson(2), calcule P(X=0). Apresente quatro casas decimais.",
      "options": [],
      "acceptedAnswers": [
        "0.1353",
        ".1353",
        "e^-2",
        "e⁻²",
        "13.53%"
      ],
      "correctAnswer": "e⁻² ≈ 0.1353",
      "explanation": "A função de probabilidade de Poisson dá P(X=0)=e⁻²·2⁰/0!=e⁻²≈0.1353.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 91,
          "anchor": "a-distribuição-de-poisson"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 36, Poisson PMF"
        },
        {
          "sourceId": "nist-poisson",
          "locator": "probability mass function"
        }
      ]
    },
    {
      "id": "wk01-02-033",
      "type": "numeric-input",
      "topic": "Distribuição multinomial",
      "difficulty": "core",
      "prompt": "Para (X₁,X₂,X₃)∼Multinomial(n=10; p₁=0.2,p₂=0.3,p₃=0.5), calcule Cov(X₁,X₂).",
      "options": [],
      "acceptedAnswers": [
        "-0.6",
        "-.6",
        "−0.6",
        "-3/5"
      ],
      "correctAnswer": "−0.6",
      "explanation": "As contagens de categorias diferentes competem pelos mesmos n ensaios, pelo que Cov(Xᵢ,Xⱼ)=−npᵢpⱼ. Neste caso, −10·0.2·0.3=−0.6.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 94,
          "anchor": "momentos-da-distribuição-multinomial"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 37, Multinomial distribution"
        }
      ]
    },
    {
      "id": "wk01-02-034",
      "type": "multiple-choice",
      "topic": "Distribuição normal",
      "difficulty": "intro",
      "prompt": "Se X tem distribuição normal, qual é o valor exato de P(X=60)?",
      "options": [
        {
          "id": "a",
          "text": "0"
        },
        {
          "id": "b",
          "text": "0.5"
        },
        {
          "id": "c",
          "text": "1"
        },
        {
          "id": "d",
          "text": "É igual à densidade f(60)."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A distribuição normal é absolutamente contínua, pelo que qualquer ponto isolado tem probabilidade zero, mesmo que seja o valor esperado.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 95,
          "anchor": "família-normal-localização-e-escala"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 38, Gaussian distribution"
        },
        {
          "sourceId": "course-worksheet-2",
          "locator": "PDF page 1, Exercise 4(a.1)"
        },
        {
          "sourceId": "nist-normal",
          "locator": "normal probability density and cumulative distribution"
        }
      ]
    },
    {
      "id": "wk01-02-035",
      "type": "numeric-input",
      "topic": "Distribuição normal",
      "difficulty": "intro",
      "prompt": "Seja X∼N(60,12²). Que valor estandardizado z corresponde a x=72?",
      "options": [],
      "acceptedAnswers": [
        "1",
        "1.0",
        "+1"
      ],
      "correctAnswer": "1",
      "explanation": "Estandardize usando z=(x−μ)/σ=(72−60)/12=1.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 96,
          "anchor": "ficha-2-estandardização"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 38, Gaussian distribution"
        },
        {
          "sourceId": "course-worksheet-2",
          "locator": "PDF page 1, Exercise 4"
        },
        {
          "sourceId": "nist-normal",
          "locator": "parameters and standardized distance"
        }
      ]
    },
    {
      "id": "wk01-02-036",
      "type": "numeric-input",
      "topic": "Distribuição exponencial",
      "difficulty": "core",
      "prompt": "Um tempo de espera X tem distribuição exponencial com taxa λ=0.5. Calcule P(X>2). Apresente quatro casas decimais.",
      "options": [],
      "acceptedAnswers": [
        "0.3679",
        ".3679",
        "e^-1",
        "e⁻¹",
        "1/e",
        "36.79%"
      ],
      "correctAnswer": "e⁻¹ ≈ 0.3679",
      "explanation": "Para uma distribuição exponencial com taxa λ, P(X>t)=e^(−λt). Com t=2 e λ=0.5, obtém-se e⁻¹≈0.3679.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 97,
          "anchor": "a-distribuição-exponencial"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 39, Exponential distribution"
        },
        {
          "sourceId": "nist-exponential",
          "locator": "PDF/CDF formulas; NIST uses scale β=1/λ"
        }
      ]
    },
    {
      "id": "wk01-02-037",
      "type": "multiple-choice",
      "topic": "Distribuição gama",
      "difficulty": "core",
      "prompt": "Se X∼Gamma(forma κ=3, escala θ=2), que par representa (E(X), Var(X))?",
      "options": [
        {
          "id": "a",
          "text": "(6, 12)"
        },
        {
          "id": "b",
          "text": "(1.5, 0.75)"
        },
        {
          "id": "c",
          "text": "(6, 6)"
        },
        {
          "id": "d",
          "text": "(3, 4)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Na parametrização forma–escala, E(X)=κθ=6 e Var(X)=κθ²=3·4=12. Para κ=1 obtém-se uma distribuição exponencial com taxa 1/θ.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 99,
          "anchor": "família-gama-forma-e-escala"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 40, Gamma distribution"
        },
        {
          "sourceId": "nist-gamma",
          "locator": "shape-scale PDF, mean, variance, and exponential special case"
        }
      ]
    },
    {
      "id": "wk01-02-038",
      "type": "multiple-choice",
      "topic": "Funções características",
      "difficulty": "intro",
      "prompt": "Que fórmula define a função característica de uma variável aleatória real X?",
      "options": [
        {
          "id": "a",
          "text": "φ_X(t)=E[e^(itX)]"
        },
        {
          "id": "b",
          "text": "φ_X(t)=P(X=t)"
        },
        {
          "id": "c",
          "text": "φ_X(t)=E[tX]"
        },
        {
          "id": "d",
          "text": "φ_X(t)=F_X(t)²"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A função característica é φ_X(t)=E[e^(itX)]=E[cos(tX)]+iE[sin(tX)]. Existe para todo o t real porque |e^(itX)|=1.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 101,
          "anchor": "funções-características"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 41, Definition 4.1"
        },
        {
          "sourceId": "mit-characteristic-functions",
          "locator": "Lecture slide 22 in the PDF"
        }
      ]
    },
    {
      "id": "wk01-02-039",
      "type": "multiple-choice",
      "topic": "Funções características",
      "difficulty": "challenge",
      "prompt": "X e Y são independentes e têm funções características φ_X e φ_Y. Qual é a função característica de Z=2X+Y+3?",
      "options": [
        {
          "id": "a",
          "text": "φ_Z(t)=e^(i3t) φ_X(2t) φ_Y(t)"
        },
        {
          "id": "b",
          "text": "φ_Z(t)=3+2φ_X(t)+φ_Y(t)"
        },
        {
          "id": "c",
          "text": "φ_Z(t)=e^(i3t)[φ_X(2t)+φ_Y(t)]"
        },
        {
          "id": "d",
          "text": "φ_Z(t)=φ_X(t)²φ_Y(t)³"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma transformação afim dá φ_(aX+b)(t)=e^(ibt)φ_X(at), e a independência transforma a soma num produto de funções características. Combinando as duas propriedades, obtém-se e^(i3t)φ_X(2t)φ_Y(t).",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 102,
          "anchor": "aplicações-afins-e-somas"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF pages 42–43, affine transforms and independent sums"
        },
        {
          "sourceId": "mit-characteristic-functions",
          "locator": "Lecture slide 22 in the PDF"
        }
      ]
    },
    {
      "id": "wk01-02-040",
      "type": "numeric-input",
      "topic": "Funções características",
      "difficulty": "challenge",
      "prompt": "Suponha que E(X²)<∞ e que a função característica satisfaz φ_X''(0)=−8. Qual é o valor de E(X²)?",
      "options": [],
      "acceptedAnswers": [
        "8",
        "8.0"
      ],
      "correctAnswer": "8",
      "explanation": "Derivar φ_X(t)=E[e^(itX)] duas vezes em 0 dá φ_X''(0)=i²E(X²)=−E(X²). Portanto, E(X²)=8.",
      "sources": [
        {
          "sourceId": "portuguese-slides",
          "slide": 103,
          "anchor": "derivadas-da-função-característica"
        },
        {
          "sourceId": "course-slides-w1-2",
          "locator": "PDF page 43, moments from derivatives; corrected identity described in editorialNotes"
        },
        {
          "sourceId": "mit-characteristic-functions",
          "locator": "Lecture slide 22 in the PDF, moment derivative identity"
        }
      ]
    }
  ],
  "locale": "pt-PT",
  "translationNotes": {
    "from": "exercises-week-1-2.js",
    "language": "pt-PT",
    "sourceSha256": "80362d00dcc16b4418651d3d3b6d946902f767e06d2fabc83d3dab7df126cc20",
    "englishQuestionCount": 40,
    "adaptations": "Foram explicitados o espaço de probabilidade da pergunta 001, o quadro da pergunta 013 e o contexto das demonstrações 007, 017 e 025; as respostas não mudaram. O exemplo de saúde é apresentado como modelo hipotético."
  }
};
