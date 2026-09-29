window.LECTURE_6_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "pt-PT",
  "block": {
    "id": "lecture-6",
    "title": "Aula 6",
    "description": "Semana 3, slides 22–49: testes estatísticos, potência, valores-p e testes dos sinais emparelhados",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../sources/week-3/pt/index.html#/testes-de-hipóteses-e-teste-dos-sinais",
    "featuredTopics": [
      "Modelos e hipóteses",
      "Decisões e erros",
      "Potência e nível",
      "Valores-p válidos",
      "Testes dos sinais",
      "Diferenças nulas"
    ]
  },
  "implementationNotes": {
    "status": "Based on the Week 3 lecture material reviewed on 25 September 2026. Slides are not edited by this exercise project.",
    "scope": "Lecture 6 only: testing, size, power, valid p-values and sign tests. No t-tests, Wilcoxon tests, confidence intervals, or asymptotic theory beyond the stated sign-test approximation.",
    "rigor": "Each question is independent of previous questions. Bounds, exact quantities and approximations are distinguished; proofs contain the complete claim and preceding steps. No blanket notation blocks.",
    "selection": "8 distinct questions from this bank: 2 intro, 4 core, 2 challenge; at most 2 per topic and 4 numeric. Existing skip and grading behavior is unchanged.",
    "sourceMaintenance": "Run python3 scripts/check_week3_sources.py --slides-source /path/to/slides-2026-week-3. Review reported questions in BOTH languages before updating hashes and reference snapshots.",
    "diagrams": "Local SVGs generated from explicit data. Normal curves illustrate approximations, not exact finite-sample distributions. The question text contains all essential data.",
    "progress": "statistical-inference-2026-practice-lecture-6; separate from other banks and shared across English and Portuguese.",
    "mathematics": "Explicit inline and display LaTeX, rendered with local MathJax. Numeric grading uses plain values, with LaTeX answerDisplay for feedback."
  },
  "sourceCatalog": {
    "week-3-slides": {
      "title": "Inferência Estatística 2026 — Semana 3 (versão de referência)",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../sources/week-3/pt/index.html",
      "slideRange": [
        22,
        49
      ],
      "checkedOn": "2026-09-25",
      "sourceFile": "slides-2026-week-3/pt/index.qmd",
      "sourceSha256": "33e0701eacd2e7c2a8b3fc87266afd69c7d47052bfa21a79ba019c096e303148",
      "deckSha256": "cb3c2e5fd474cc5d558e0df7ae1b02799baa301919648e6d2ece61275a738351",
      "renderedSourceFile": "slides-2026-week-3/_site/pt/index.html"
    }
  },
  "exercises": [
    {
      "id": "lec06-001",
      "type": "multiple-choice",
      "topic": "Modelos e hipóteses",
      "difficulty": "intro",
      "prompt": "Um modelo descreve cinco observações de Bernoulli independentes \\(X_1,\\ldots,X_5\\), com probabilidade de sucesso comum desconhecida \\(\\theta\\in[0,1]\\). Que quantidade é o parâmetro do modelo?",
      "options": [
        {
          "id": "a",
          "text": "A contagem observada de sucessos \\(\\sum_i x_i\\)."
        },
        {
          "id": "b",
          "text": "A probabilidade desconhecida e fixa \\(\\theta\\)."
        },
        {
          "id": "c",
          "text": "A amostra aleatória \\(X=(X_1,\\ldots,X_5)\\)."
        },
        {
          "id": "d",
          "text": "O primeiro valor observado \\(x_1\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "O parâmetro \\(\\theta\\) indexa as distribuições possíveis dos dados. Neste modelo é fixo mas desconhecido; a amostra é aleatória e os seus valores observados são dados.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 23,
          "anchor": "modelos-estatísticos",
          "sourceKey": "stmt-statistical-model"
        }
      ]
    },
    {
      "id": "lec06-002",
      "type": "multiple-choice",
      "topic": "Modelos e hipóteses",
      "difficulty": "intro",
      "prompt": "Para dados i.i.d. Bernoulli\\((\\theta)\\), compare \\(H_0:\\theta=1/2\\) e \\(H'_0:\\theta\\le1/2\\). Como se classificam estas hipóteses nulas?",
      "options": [
        {
          "id": "a",
          "text": "Ambas são simples."
        },
        {
          "id": "b",
          "text": "A primeira é composta; a segunda é simples."
        },
        {
          "id": "c",
          "text": "A primeira é simples; a segunda é composta."
        },
        {
          "id": "d",
          "text": "Ambas são compostas."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Uma hipótese simples especifica uma única distribuição dos dados. Fixar \\(\\theta=1/2\\) faz isso. Permitir todos os \\(\\theta\\in[0,1/2]\\) deixa várias distribuições possíveis e dá, portanto, uma hipótese composta.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 24,
          "anchor": "hipóteses-nula-e-alternativa",
          "sourceKey": "stmt-hypotheses"
        }
      ]
    },
    {
      "id": "lec06-003",
      "type": "find-the-intruder",
      "topic": "Modelos e hipóteses",
      "difficulty": "core",
      "prompt": "Sejam \\(X_1,\\ldots,X_n\\) i.i.d. Bernoulli\\((\\theta)\\), com \\(\\theta\\) desconhecido, e \\(\\bar X_n=n^{-1}\\sum_{i=1}^nX_i\\). Que expressão não é uma estatística calculável apenas a partir dos dados observados?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\sum_{i=1}^nX_i\\)"
        },
        {
          "id": "b",
          "text": "\\(\\bar X_n\\)"
        },
        {
          "id": "c",
          "text": "\\(\\max_{1\\le i\\le n}X_i\\)"
        },
        {
          "id": "d",
          "text": "\\(\\bar X_n-\\theta\\)"
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Uma estatística é uma função mensurável especificada da amostra que não envolve o parâmetro desconhecido. A última expressão exige conhecer \\(\\theta\\). Em contrapartida, seria permitido subtrair um valor nulo especificado, como \\(1/2\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 26,
          "anchor": "estatísticas-de-teste",
          "sourceKey": "stmt-test-statistic"
        }
      ]
    },
    {
      "id": "lec06-004",
      "type": "numeric-input",
      "topic": "Decisões e erros",
      "difficulty": "intro",
      "prompt": "Um teste define \\(\\delta(x)=1\\) (rejeitar) quando \\(\\sum_{i=1}^5x_i\\ge4\\) e \\(\\delta(x)=0\\) caso contrário. Os dados observados são \\((1,1,0,1,1)\\). Quanto vale \\(\\delta(x)\\)?",
      "correctAnswer": "1",
      "acceptedAnswers": [
        "1"
      ],
      "answerDisplay": "\\(1\\)",
      "integerAnswer": true,
      "explanation": "Há \\(4\\) sucessos, pelo que a observação pertence à região de rejeição e \\(\\delta(x)=1\\). A decisão do teste não é, por si só, uma afirmação de que a hipótese nula tem probabilidade zero.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 25,
          "anchor": "testes-e-regiões-de-rejeição",
          "sourceKey": "stmt-test"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 26,
          "anchor": "estatísticas-de-teste",
          "sourceKey": "stmt-test-statistic"
        }
      ]
    },
    {
      "id": "lec06-005",
      "type": "multiple-choice",
      "topic": "Decisões e erros",
      "difficulty": "intro",
      "prompt": "Um teste de controlo de qualidade rejeita a hipótese nula, embora o verdadeiro parâmetro pertença ao conjunto nulo. Que tipo de erro ocorreu?",
      "options": [
        {
          "id": "a",
          "text": "Um erro de tipo II."
        },
        {
          "id": "b",
          "text": "Nenhum erro: todas as rejeições são corretas."
        },
        {
          "id": "c",
          "text": "Um erro de tipo I."
        },
        {
          "id": "d",
          "text": "Necessariamente, um erro de arredondamento numérico."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Um erro de tipo I é a rejeição quando \\(H_0\\) é verdadeira. A sua probabilidade depende do verdadeiro parâmetro nulo e é controlada uniformemente pelo nível de significância do teste.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 27,
          "anchor": "erros-de-tipo-i-e-de-tipo-ii",
          "sourceKey": "stmt-testing-errors"
        }
      ]
    },
    {
      "id": "lec06-006",
      "type": "multiple-choice",
      "topic": "Decisões e erros",
      "difficulty": "intro",
      "prompt": "O verdadeiro parâmetro pertence ao conjunto alternativo, mas o teste não rejeita \\(H_0\\). Que tipo de erro é este?",
      "options": [
        {
          "id": "a",
          "text": "Um erro de tipo II."
        },
        {
          "id": "b",
          "text": "Um erro de tipo I."
        },
        {
          "id": "c",
          "text": "O próprio nível de significância."
        },
        {
          "id": "d",
          "text": "Nenhum erro, porque a não rejeição prova a hipótese nula."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Um erro de tipo II é a não rejeição num parâmetro alternativo. Se a potência nesse parâmetro é \\(\\beta(\\theta)=\\mathbb P_\\theta(\\text{rejeitar})\\), a sua probabilidade é \\(1-\\beta(\\theta)\\). A não rejeição não prova \\(H_0\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 27,
          "anchor": "erros-de-tipo-i-e-de-tipo-ii",
          "sourceKey": "stmt-testing-errors"
        }
      ]
    },
    {
      "id": "lec06-007",
      "type": "numeric-input",
      "topic": "Potência e nível",
      "difficulty": "core",
      "prompt": "Para quatro ensaios Bernoulli\\((\\theta)\\) independentes, um teste rejeita apenas quando os quatro são sucessos. Calcule o valor da função potência \\(\\beta(\\theta)=\\mathbb P_\\theta(\\text{rejeitar})\\) em \\(\\theta=1/2\\).",
      "correctAnswer": "1/16",
      "acceptedAnswers": [
        "1/16"
      ],
      "answerDisplay": "\\(\\frac{1}{16}\\)",
      "explanation": "A independência dá \\(\\beta(\\theta)=\\theta^4\\), logo \\(\\beta(1/2)=1/16\\). A função potência está definida em todos os parâmetros, incluindo os nulos, onde é a probabilidade de erro de tipo I.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "a-função-potência",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 30,
          "anchor": "um-teste-binomial",
          "sourceKey": "stmt-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-008",
      "type": "numeric-input",
      "topic": "Potência e nível",
      "difficulty": "core",
      "prompt": "Seja \\(T\\sim\\operatorname{Bin}(2,\\theta)\\). Para \\(H_0:\\theta\\le1/2\\) contra \\(H_1:\\theta>1/2\\), rejeita-se apenas quando \\(T=2\\). Qual é a probabilidade de erro de tipo II quando o verdadeiro parâmetro é \\(\\theta=3/4\\)?",
      "correctAnswer": "7/16",
      "acceptedAnswers": [
        "7/16"
      ],
      "answerDisplay": "\\(\\frac{7}{16}\\)",
      "explanation": "A probabilidade de rejeição é \\((3/4)^2=9/16\\). Neste parâmetro alternativo, o erro de tipo II é a não rejeição, com probabilidade \\(1-9/16=7/16\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 27,
          "anchor": "erros-de-tipo-i-e-de-tipo-ii",
          "sourceKey": "stmt-testing-errors"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "a-função-potência",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 30,
          "anchor": "um-teste-binomial",
          "sourceKey": "stmt-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-009",
      "type": "numeric-input",
      "topic": "Potência e nível",
      "difficulty": "intro",
      "prompt": "Um conjunto nulo contém exatamente três parâmetros \\(\\theta_a,\\theta_b,\\theta_c\\). As suas probabilidades de rejeição são, respetivamente, \\(0.01,0.03,0.02\\). Qual é a dimensão deste teste?",
      "correctAnswer": "0.03",
      "acceptedAnswers": [
        "0.03"
      ],
      "answerDisplay": "\\(0.03\\)",
      "explanation": "A dimensão é \\(\\sup_{\\theta\\in\\Theta_0}\\beta(\\theta)\\). Para este conjunto nulo finito é o máximo, \\(0.03\\), não a média das três probabilidades.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "dimensão-e-nível-de-significância",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-010",
      "type": "multiple-choice",
      "topic": "Potência e nível",
      "difficulty": "intro",
      "prompt": "Um teste tem dimensão \\(0.03\\). Que afirmação usa corretamente a definição de nível de significância?",
      "options": [
        {
          "id": "a",
          "text": "É um teste de nível \\(0.05\\), mas a sua dimensão continua a ser \\(0.03\\)."
        },
        {
          "id": "b",
          "text": "Dizer que tem nível \\(0.05\\) muda a sua dimensão para \\(0.05\\)."
        },
        {
          "id": "c",
          "text": "Não se pode dizer que tem nível \\(0.05\\), porque a dimensão não é igual a \\(0.05\\)."
        },
        {
          "id": "d",
          "text": "É automaticamente de nível \\(0.01\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Ter nível \\(\\alpha\\) significa ter dimensão no máximo \\(\\alpha\\), não necessariamente igual. Como \\(0.03\\le0.05\\), o teste tem nível \\(0.05\\), mas não nível \\(0.01\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "dimensão-e-nível-de-significância",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-011",
      "type": "numeric-input",
      "topic": "Potência e nível",
      "difficulty": "core",
      "prompt": "Para \\(T\\sim\\operatorname{Bin}(5,\\theta)\\), teste \\(H_0:\\theta\\le1/2\\), rejeitando exatamente quando \\(T=5\\). Calcule a dimensão do teste.",
      "correctAnswer": "1/32",
      "acceptedAnswers": [
        "1/32"
      ],
      "answerDisplay": "\\(\\frac{1}{32}\\)",
      "explanation": "A potência é \\(\\beta(\\theta)=\\theta^5\\), crescente em \\([0,1]\\). A maior probabilidade de rejeição sob a hipótese nula ocorre em \\(\\theta=1/2\\), dando dimensão \\((1/2)^5=1/32\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "dimensão-e-nível-de-significância",
          "sourceKey": "stmt-size-level"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 30,
          "anchor": "um-teste-binomial",
          "sourceKey": "stmt-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-012",
      "type": "multiple-select",
      "topic": "Regiões de rejeição",
      "difficulty": "core",
      "prompt": "Dois testes das mesmas hipóteses têm regiões de rejeição \\(R_1\\subseteq R_2\\). O que é garantido ao substituir \\(R_1\\) por \\(R_2\\)? Selecione todas as afirmações corretas.",
      "options": [
        {
          "id": "a",
          "text": "A probabilidade de rejeição não pode diminuir em nenhum parâmetro."
        },
        {
          "id": "b",
          "text": "A probabilidade de erro de tipo I não pode diminuir em nenhum parâmetro nulo."
        },
        {
          "id": "c",
          "text": "A probabilidade de erro de tipo II não pode aumentar em nenhum parâmetro alternativo."
        },
        {
          "id": "d",
          "text": "A dimensão tem de diminuir estritamente."
        }
      ],
      "correctAnswers": [
        "a",
        "b",
        "c"
      ],
      "correctAnswer": "a,b,c",
      "acceptedAnswers": [
        "a,b,c"
      ],
      "explanation": "Para todo o \\(\\theta\\), a inclusão de acontecimentos dá \\(\\mathbb P_\\theta(X\\in R_1)\\le\\mathbb P_\\theta(X\\in R_2)\\). Assim, a potência e as probabilidades de rejeição sob a hipótese nula não podem diminuir; as probabilidades de não rejeição sob a alternativa não podem aumentar. As desigualdades não têm de ser estritas.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 32,
          "anchor": "potência-e-região-de-rejeição",
          "sourceKey": "stmt-region-inclusion"
        }
      ]
    },
    {
      "id": "lec06-013",
      "type": "proof-step",
      "topic": "Probabilidades de cauda",
      "difficulty": "core",
      "prompt": "Que comparação pontual completa a demonstração da monotonia das caudas superiores?",
      "context": [
        {
          "label": "Teorema",
          "text": "Para um inteiro positivo fixo \\(n\\) e um limiar real \\(c\\), a probabilidade de cauda superior de \\(\\operatorname{Bin}(n,\\theta)\\) é não decrescente em \\(\\theta\\in[0,1]\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe \\(0\\le p\\le q\\le1\\). Num mesmo espaço de probabilidade, tome \\(U_1,\\ldots,U_n\\sim\\operatorname{Uniform}(0,1)\\) independentes. Usando as mesmas variáveis uniformes nas duas contagens, defina \\(T_p=\\sum_{i=1}^n\\mathbf1_{\\{U_i\\le p\\}}\\) e \\(T_q=\\sum_{i=1}^n\\mathbf1_{\\{U_i\\le q\\}}\\). As distribuições respetivas são \\(\\operatorname{Bin}(n,p)\\) e \\(\\operatorname{Bin}(n,q)\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(T_p(\\omega)\\ge T_q(\\omega)\\) para todo o resultado \\(\\omega\\)."
        },
        {
          "id": "b",
          "text": "\\(T_p(\\omega)\\le T_q(\\omega)\\) para todo o resultado \\(\\omega\\)."
        },
        {
          "id": "c",
          "text": "\\(T_p=T_q\\) porque ambas as contagens usam as mesmas variáveis uniformes."
        },
        {
          "id": "d",
          "text": "As duas contagens têm de ser independentes."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Se \\(U_i\\le p\\), então \\(U_i\\le q\\). Cada indicador para \\(p\\) é, portanto, no máximo o indicador correspondente para \\(q\\). Somar dá \\(T_p\\le T_q\\), logo \\(\\{T_p\\ge c\\}\\subseteq\\{T_q\\ge c\\}\\). Tomar probabilidades prova a afirmação.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 41,
          "anchor": "probabilidades-de-cauda-binomiais",
          "sourceKey": "stmt-binomial-tail-monotonicity"
        }
      ]
    },
    {
      "id": "lec06-014",
      "type": "multiple-choice",
      "topic": "Potência e nível",
      "difficulty": "challenge",
      "prompt": "Um modelo tem exatamente três parâmetros: \\(\\Theta_0=\\{\\theta_a,\\theta_b\\}\\) e \\(\\Theta_1=\\{\\theta_c\\}\\). Um teste tem \\(\\beta(\\theta_a)=0.02\\), \\(\\beta(\\theta_b)=0.04\\) e \\(\\beta(\\theta_c)=0.90\\). Que par dá a sua dimensão e a sua probabilidade de erro de tipo II em \\(\\theta_c\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(0.90,\\ 0.10\\)"
        },
        {
          "id": "b",
          "text": "\\(0.04,\\ 0.90\\)"
        },
        {
          "id": "c",
          "text": "\\(0.04,\\ 0.10\\)"
        },
        {
          "id": "d",
          "text": "\\(0.03,\\ 0.10\\)"
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "visual": {
        "kind": "bars",
        "values": [
          0.02,
          0.04,
          0.9
        ],
        "labels": [
          "a",
          "b",
          "c"
        ],
        "title": "Probabilidades de rejeição no modelo",
        "description": "Os parâmetros a e b são nulos; c é um parâmetro alternativo.",
        "caption": "Os parâmetros a e b são nulos; c é um parâmetro alternativo.",
        "xLabel": "Parâmetro",
        "yLabel": "Probabilidade de rejeição"
      },
      "explanation": "A dimensão toma o supremo apenas no conjunto nulo: \\(\\max(0.02,0.04)=0.04\\). No parâmetro alternativo \\(\\theta_c\\), a probabilidade de erro de tipo II é \\(1-\\beta(\\theta_c)=0.10\\). A elevada probabilidade de rejeição sob a alternativa é potência desejável, não dimensão.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "a-função-potência",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "dimensão-e-nível-de-significância",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-015",
      "type": "multiple-choice",
      "topic": "Regiões de rejeição",
      "difficulty": "core",
      "prompt": "Para \\(T\\sim\\operatorname{Bin}(5,\\theta)\\), teste \\(H_0:\\theta\\le1/2\\), rejeitando quando \\(T\\ge3\\). A probabilidade de rejeição é crescente em \\(\\theta\\). É um teste de nível \\(0.05\\)?",
      "options": [
        {
          "id": "a",
          "text": "Sim: uma maioria de sucessos é sempre significativa."
        },
        {
          "id": "b",
          "text": "Não: a sua dimensão é \\(1/2\\)."
        },
        {
          "id": "c",
          "text": "Sim: a sua dimensão é \\(1/32\\)."
        },
        {
          "id": "d",
          "text": "Não: a sua dimensão é \\(1\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "O pior parâmetro nulo é \\(1/2\\). Aí, por simetria, \\(\\mathbb P(T\\ge3)=1/2\\), pois nenhum inteiro é igual ao centro \\(2.5\\). Logo, a dimensão é \\(0.5>0.05\\); uma maioria, por si só, não é evidência forte com cinco ensaios.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 31,
          "anchor": "uma-região-de-rejeição-maior",
          "sourceKey": "stmt-larger-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-016",
      "type": "multiple-select",
      "topic": "Regiões de rejeição",
      "difficulty": "core",
      "prompt": "Um teste tem região de rejeição vazia \\(R=\\varnothing\\). Suponha que os conjuntos nulo e alternativo são ambos não vazios. Selecione todas as afirmações verdadeiras.",
      "options": [
        {
          "id": "a",
          "text": "A sua dimensão é \\(0\\)."
        },
        {
          "id": "b",
          "text": "A sua potência é \\(0\\) em todos os parâmetros."
        },
        {
          "id": "c",
          "text": "A sua probabilidade de erro de tipo II é \\(1\\) em todos os parâmetros alternativos."
        },
        {
          "id": "d",
          "text": "Controlar o erro de tipo I torna este teste útil para detetar todas as alternativas."
        }
      ],
      "correctAnswers": [
        "a",
        "b",
        "c"
      ],
      "correctAnswer": "a,b,c",
      "acceptedAnswers": [
        "a,b,c"
      ],
      "explanation": "Uma região vazia significa nunca rejeitar. Portanto, \\(\\beta(\\theta)=0\\) em todo o modelo, a dimensão é \\(0\\) e \\(1-\\beta(\\theta)=1\\) sob todas as alternativas. Controlar apenas o erro de tipo I não garante potência útil.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 25,
          "anchor": "testes-e-regiões-de-rejeição",
          "sourceKey": "stmt-test"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "a-função-potência",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "dimensão-e-nível-de-significância",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-017",
      "type": "multiple-choice",
      "topic": "Valores-p válidos",
      "difficulty": "intro",
      "prompt": "Uma estatística \\(p(X)\\) toma valores em \\([0,1]\\). Que condição a torna um valor-p válido para um conjunto nulo \\(\\Theta_0\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P_\\theta(p(X)\\le\\alpha)\\ge\\alpha\\) para todo o \\(\\theta\\) nulo e todo o \\(\\alpha\\in[0,1]\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P_\\theta(p(X)\\le\\alpha)\\le\\alpha\\) para todo o \\(\\theta\\) nulo e todo o \\(\\alpha\\in[0,1]\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb E_\\theta(p(X))=0\\) sob a hipótese nula."
        },
        {
          "id": "d",
          "text": "\\(p(X)\\) é igual à probabilidade de \\(H_0\\) ser verdadeira."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Validade significa que rejeitar quando \\(p(X)\\le\\alpha\\) dá um teste de nível \\(\\alpha\\) para cada limiar. Não é exigida igualdade; os valores-p discretos dão frequentemente desigualdades estritas.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 33,
          "anchor": "valores-p-válidos",
          "sourceKey": "stmt-pvalue"
        }
      ]
    },
    {
      "id": "lec06-018",
      "type": "multiple-choice",
      "topic": "Valores-p válidos",
      "difficulty": "intro",
      "prompt": "Um valor-p válido observado é \\(0.04\\), e o nível de significância previamente fixado é \\(0.05\\). Que interpretação é correta?",
      "options": [
        {
          "id": "a",
          "text": "A probabilidade de \\(H_0\\) ser verdadeira é \\(0.04\\)."
        },
        {
          "id": "b",
          "text": "A alternativa tem probabilidade \\(0.96\\)."
        },
        {
          "id": "c",
          "text": "Rejeita-se a hipótese nula ao nível escolhido; isto não atribui uma probabilidade à hipótese nula."
        },
        {
          "id": "d",
          "text": "O efeito tem necessariamente grande importância prática."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Como \\(0.04\\le0.05\\), a regra de decisão rejeita. Um valor-p mede a incompatibilidade com a hipótese nula através de um teste especificado; não é uma probabilidade posterior de nenhuma das hipóteses nem mede a magnitude do efeito.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 36,
          "anchor": "interpretação-de-um-valor-p",
          "sourceKey": "Interpretação de um valor-$p$"
        }
      ]
    },
    {
      "id": "lec06-019",
      "type": "multiple-choice",
      "topic": "Decisões e erros",
      "difficulty": "intro",
      "prompt": "Um teste usa a regra «rejeitar se \\(p\\le0.05\\)». O valor-p observado é \\(0.07\\). O que se deve comunicar?",
      "options": [
        {
          "id": "a",
          "text": "A hipótese nula foi demonstrada."
        },
        {
          "id": "b",
          "text": "Não se rejeita ao nível \\(0.05\\); isto não estabelece que a hipótese nula é verdadeira."
        },
        {
          "id": "c",
          "text": "Rejeita-se porque \\(0.07\\) está perto de \\(0.05\\)."
        },
        {
          "id": "d",
          "text": "Há uma probabilidade de \\(93\\%\\) de não existir efeito."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "O limiar prescrito não foi atingido. A não rejeição pode ocorrer tanto sob a hipótese nula como sob alternativas com potência insuficiente, pelo que não prova a hipótese nula.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 25,
          "anchor": "testes-e-regiões-de-rejeição",
          "sourceKey": "stmt-test"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 36,
          "anchor": "interpretação-de-um-valor-p",
          "sourceKey": "Interpretação de um valor-$p$"
        }
      ]
    },
    {
      "id": "lec06-020",
      "type": "numeric-input",
      "topic": "Probabilidades de cauda",
      "difficulty": "core",
      "prompt": "Para \\(T\\sim\\operatorname{Bin}(5,\\theta)\\), teste \\(H_0:\\theta\\le1/2\\) contra \\(\\theta>1/2\\), usando contagens grandes como evidência. Observa-se \\(t=4\\). O valor-p de cauda superior é atingido em \\(\\theta=1/2\\). Calcule-o exatamente.",
      "correctAnswer": "3/16",
      "acceptedAnswers": [
        "3/16"
      ],
      "answerDisplay": "\\(\\frac{3}{16}\\)",
      "explanation": "A cauda inclui a contagem observada: \\(\\mathbb P_{1/2}(T\\ge4)=[\\binom54+\\binom55]/2^5=6/32=3/16\\). Usar apenas \\(\\mathbb P(T=4)\\) omitiria dados mais extremos.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 34,
          "anchor": "valores-p-a-partir-de-caudas-superiores",
          "sourceKey": "stmt-tail-pvalue"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 35,
          "anchor": "um-valor-p-binomial-observado",
          "sourceKey": "stmt-binomial-pvalue"
        }
      ]
    },
    {
      "id": "lec06-021",
      "type": "multiple-choice",
      "topic": "Probabilidades de cauda",
      "difficulty": "core",
      "prompt": "Para cinco ensaios Bernoulli\\((\\theta)\\) independentes, teste \\(H_0:\\theta\\le1/2\\) contra \\(\\theta>1/2\\) usando a cauda superior. Os cinco ensaios são sucessos, dando o valor-p exato \\(1/32\\). Em quais dos níveis \\(0.05\\) e \\(0.01\\) rejeita a regra \\(p\\le\\alpha\\)?",
      "options": [
        {
          "id": "a",
          "text": "Em ambos os níveis."
        },
        {
          "id": "b",
          "text": "Apenas em \\(0.01\\)."
        },
        {
          "id": "c",
          "text": "Em nenhum dos níveis."
        },
        {
          "id": "d",
          "text": "Apenas em \\(0.05\\)."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Como \\(1/32=0.03125\\), fica abaixo de \\(0.05\\) mas acima de \\(0.01\\). Um nível de significância menor torna a rejeição mais difícil para dados e valor-p fixos.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 35,
          "anchor": "um-valor-p-binomial-observado",
          "sourceKey": "stmt-binomial-pvalue"
        }
      ]
    },
    {
      "id": "lec06-022",
      "type": "proof-step",
      "topic": "Valores-p válidos",
      "difficulty": "challenge",
      "prompt": "Que inclusão de acontecimentos completa a demonstração da validade?",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja \\(T(X)\\) uma estatística com imagem finita e seja \\(\\Theta_0\\) um conjunto nulo não vazio. Defina \\(q_\\theta(t)=\\mathbb P_\\theta(T(X)\\ge t)\\) e \\(p(X)=\\sup_{\\vartheta\\in\\Theta_0}q_\\vartheta(T(X))\\). Então \\(p\\) é válido: \\(\\mathbb P_\\theta(p(X)\\le\\alpha)\\le\\alpha\\) para todos os \\(\\theta\\in\\Theta_0\\) e \\(\\alpha\\in[0,1]\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe \\(\\theta\\in\\Theta_0\\) e \\(\\alpha\\in[0,1]\\). Como \\(q_\\theta\\) é não crescente na imagem finita, o conjunto de valores com \\(q_\\theta(t)\\le\\alpha\\) é vazio ou tem um menor valor \\(t_*\\). No segundo caso, \\(\\mathbb P_\\theta(q_\\theta(T)\\le\\alpha)=\\mathbb P_\\theta(T\\ge t_*)=q_\\theta(t_*)\\le\\alpha\\); no caso vazio, é zero. Além disso, \\(q_\\theta(T)\\le p\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(\\{q_\\theta(T)\\le\\alpha\\}\\subseteq\\{p\\le\\alpha\\}\\)"
        },
        {
          "id": "b",
          "text": "\\(\\{p\\le\\alpha\\}\\subseteq\\{q_\\theta(T)\\le\\alpha\\}\\)"
        },
        {
          "id": "c",
          "text": "\\(\\{p\\le\\alpha\\}=\\{T=0\\}\\)"
        },
        {
          "id": "d",
          "text": "\\(\\{p\\le\\alpha\\}=\\{q_\\theta(T)\\ge\\alpha\\}\\)"
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "O supremo dá \\(q_\\theta(T)\\le p\\) em cada parâmetro nulo. Assim, \\(p\\le\\alpha\\) implica \\(q_\\theta(T)\\le\\alpha\\), e \\(\\mathbb P_\\theta(p\\le\\alpha)\\le\\alpha\\). Tomar o supremo no conjunto nulo torna o valor-p não inferior a cada cauda com parâmetro nulo fixo.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 34,
          "anchor": "valores-p-a-partir-de-caudas-superiores",
          "sourceKey": "stmt-tail-pvalue"
        }
      ]
    },
    {
      "id": "lec06-023",
      "type": "multiple-choice",
      "topic": "Valores-p válidos",
      "difficulty": "challenge",
      "prompt": "Sob uma hipótese nula simples, \\(X\\) é igual a \\(0\\) ou \\(1\\), cada um com probabilidade \\(1/2\\). Defina \\(p(0)=1\\) e \\(p(1)=1/2\\). É \\(p(X)\\) um valor-p válido?",
      "options": [
        {
          "id": "a",
          "text": "Não: um valor-p válido tem de ser uniformemente distribuído num intervalo contínuo."
        },
        {
          "id": "b",
          "text": "Sim: é válido, mas não tem distribuição uniforme no intervalo."
        },
        {
          "id": "c",
          "text": "Não: um valor-p nunca pode ser igual a um."
        },
        {
          "id": "d",
          "text": "Sim, porque \\(\\mathbb P(p\\le\\alpha)=\\alpha\\) para todo o \\(\\alpha\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Para \\(0\\le\\alpha<1/2\\), a probabilidade é \\(0\\); para \\(1/2\\le\\alpha<1\\), é \\(1/2\\); em \\(\\alpha=1\\), é \\(1\\). Cada valor é no máximo \\(\\alpha\\). A validade é uma desigualdade e permite valores-p discretos.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 33,
          "anchor": "valores-p-válidos",
          "sourceKey": "stmt-pvalue"
        }
      ]
    },
    {
      "id": "lec06-024",
      "type": "multiple-choice",
      "topic": "Dados emparelhados e medianas",
      "difficulty": "core",
      "prompt": "Um estudo antes/depois assume que os pares \\((X_i,Y_i)\\) são i.i.d. entre participantes e usa diferenças \\(Z_i=Y_i-X_i\\). Que afirmação é correta?",
      "options": [
        {
          "id": "a",
          "text": "As medições antes e depois em cada participante têm de ser independentes."
        },
        {
          "id": "b",
          "text": "As diferenças são i.i.d.; é permitida dependência dentro de cada par."
        },
        {
          "id": "c",
          "text": "As diferenças de participantes distintos têm de ser iguais."
        },
        {
          "id": "d",
          "text": "O emparelhamento garante que as diferenças têm distribuição normal."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Cada diferença aplica a mesma função mensurável \\((x,y)\\mapsto y-x\\) a um par. A independência entre pares e a sua distribuição comum dão, portanto, diferenças i.i.d. A dependência dentro de cada par é compatível com este enquadramento.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 38,
          "anchor": "observações-emparelhadas",
          "sourceKey": "stmt-paired-data"
        }
      ]
    },
    {
      "id": "lec06-025",
      "type": "multiple-choice",
      "topic": "Modelos e hipóteses",
      "difficulty": "core",
      "prompt": "Um teste dos sinais permite que a distribuição comum das diferenças i.i.d. \\(Z_i\\) seja desconhecida, exigindo sob a hipótese nula que \\(\\mathbb P(Z_i>0)=\\mathbb P(Z_i<0)=1/2\\). Porque é compatível usar uma distribuição nula binomial com um modelo não paramétrico para as diferenças?",
      "options": [
        {
          "id": "a",
          "text": "As próprias diferenças têm de ser binomiais."
        },
        {
          "id": "b",
          "text": "Não paramétrico significa que não há hipóteses probabilísticas."
        },
        {
          "id": "c",
          "text": "A lei binomial descreve a contagem dos sinais positivos, não a distribuição completa das diferenças."
        },
        {
          "id": "d",
          "text": "Assume-se implicitamente que as diferenças são normais."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Os indicadores \\(\\mathbf1_{\\{Z_i>0\\}}\\) são i.i.d. Bernoulli\\((1/2)\\), pelo que a sua soma é binomial. Isto não especifica as magnitudes nem a forma da distribuição de \\(Z_i\\). Os modelos não paramétricos continuam a ter hipóteses explícitas.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 37,
          "anchor": "modelos-paramétricos-e-não-paramétricos",
          "sourceKey": "stmt-model-types"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "distribuição-da-estatística-dos-sinais-sob-a-hipótese-nula",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-026",
      "type": "numeric-input",
      "topic": "Dados emparelhados e medianas",
      "difficulty": "core",
      "prompt": "Os pares observados antes/depois são \\((2,5),(4,3),(1,7),(8,10)\\). Defina cada diferença como depois menos antes e seja \\(T\\) a contagem das diferenças estritamente positivas. Quanto vale \\(T\\)?",
      "correctAnswer": "3",
      "acceptedAnswers": [
        "3"
      ],
      "answerDisplay": "\\(3\\)",
      "integerAnswer": true,
      "explanation": "As diferenças são \\(3,-1,6,2\\). Três são positivas, logo \\(T=3\\). A estatística dos sinais conta as positivas; não soma as diferenças nem os seus valores absolutos.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 38,
          "anchor": "observações-emparelhadas",
          "sourceKey": "stmt-paired-data"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "distribuição-da-estatística-dos-sinais-sob-a-hipótese-nula",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-027",
      "type": "multiple-choice",
      "topic": "Testes dos sinais",
      "difficulty": "core",
      "prompt": "Sejam \\(Z_1,\\ldots,Z_{12}\\) i.i.d., com \\(\\mathbb P(Z_i=0)=0\\) e mediana \\(0\\). Defina \\(T=\\sum_{i=1}^{12}\\mathbf1_{\\{Z_i>0\\}}\\). Qual é a sua distribuição sob a hipótese nula?",
      "options": [
        {
          "id": "a",
          "text": "\\(N(0,1)\\), exatamente."
        },
        {
          "id": "b",
          "text": "\\(\\operatorname{Bin}(12,1/2)\\)."
        },
        {
          "id": "c",
          "text": "Uniforme em \\(\\{0,\\ldots,12\\}\\)."
        },
        {
          "id": "d",
          "text": "\\(\\operatorname{Bin}(6,1/2)\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Sem massa em zero, ter mediana zero dá \\(\\mathbb P(Z_i>0)=1/2\\). Os indicadores independentes são Bernoulli\\((1/2)\\), pelo que a sua soma é exatamente binomial. Uma distribuição normal daria apenas uma aproximação.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medianas-e-sinais",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "distribuição-da-estatística-dos-sinais-sob-a-hipótese-nula",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-028",
      "type": "find-the-intruder",
      "topic": "Testes dos sinais",
      "difficulty": "core",
      "prompt": "Para a hipótese nula do teste dos sinais com diferenças i.i.d., mediana \\(0\\) e sem massa em \\(0\\), que alegado requisito é desnecessário?",
      "options": [
        {
          "id": "a",
          "text": "As diferenças têm uma distribuição comum."
        },
        {
          "id": "b",
          "text": "As diferenças são independentes entre participantes."
        },
        {
          "id": "c",
          "text": "Os sinais positivos e negativos têm, cada um, probabilidade um meio."
        },
        {
          "id": "d",
          "text": "A distribuição completa de cada diferença é simétrica em torno de zero."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Probabilidades de sinal iguais não exigem magnitudes simétricas. Por exemplo, uma variável que toma \\(-1\\) e \\(2\\), cada um com probabilidade \\(1/2\\), tem mediana \\(0\\), não tem massa em \\(0\\) e tem sinais equilibrados sem simetria em torno de \\(0\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medianas-e-sinais",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "distribuição-da-estatística-dos-sinais-sob-a-hipótese-nula",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-029",
      "type": "proof-step",
      "topic": "Dados emparelhados e medianas",
      "difficulty": "challenge",
      "prompt": "O que conclui a implicação direta?",
      "context": [
        {
          "label": "Teorema",
          "text": "Uma variável aleatória real \\(Z\\) satisfaz \\(\\mathbb P(Z=0)=0\\). Então \\(0\\) é uma mediana, isto é, \\(\\mathbb P(Z\\le0)\\ge1/2\\) e \\(\\mathbb P(Z\\ge0)\\ge1/2\\), se e só se \\(\\mathbb P(Z>0)=1/2\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Na implicação inversa, probabilidades iguais de sinais positivos e negativos dão imediatamente as desigualdades da mediana. Na implicação direta, suponha que \\(0\\) é uma mediana. Retirar o acontecimento de probabilidade zero \\(\\{Z=0\\}\\) dá \\(\\mathbb P(Z<0)\\ge1/2\\) e \\(\\mathbb P(Z>0)\\ge1/2\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "Ambas as probabilidades têm de ser \\(1/2\\), pois a sua soma é \\(1\\)."
        },
        {
          "id": "b",
          "text": "A distribuição de \\(Z\\) tem de ser simétrica."
        },
        {
          "id": "c",
          "text": "O valor esperado \\(\\mathbb E(Z)\\) tem de ser \\(0\\)."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(Z>0)=1\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Os dois acontecimentos disjuntos \\(Z<0\\) e \\(Z>0\\) têm probabilidade total \\(1\\) quando não há massa em zero. Se ambas as probabilidades são pelo menos \\(1/2\\), cada uma tem de ser \\(1/2\\). Não é necessária simetria nem a existência de valor esperado.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medianas-e-sinais",
          "sourceKey": "stmt-median"
        }
      ]
    },
    {
      "id": "lec06-030",
      "type": "numeric-input",
      "topic": "Probabilidades de cauda",
      "difficulty": "core",
      "prompt": "Quatro diferenças i.i.d. não têm massa em zero. Para testar \\(H_0:\\mathbb P(Z_i>0)=1/2\\) contra uma probabilidade maior de sinal positivo, use o teste dos sinais de cauda superior. As quatro diferenças observadas são positivas. Calcule o valor-p unilateral exato.",
      "correctAnswer": "1/16",
      "acceptedAnswers": [
        "1/16"
      ],
      "answerDisplay": "\\(\\frac{1}{16}\\)",
      "explanation": "Sob a hipótese nula, \\(B\\sim\\operatorname{Bin}(4,1/2)\\). O valor-p de cauda superior em \\(t=4\\) é \\(\\mathbb P(B\\ge4)=1/16\\). Mesmo quatro sinais positivos em quatro não ultrapassam um limiar de \\(0.05\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "testes-dos-sinais-unilaterais-e-bilaterais",
          "sourceKey": "stmt-sign-pvalues"
        }
      ]
    },
    {
      "id": "lec06-031",
      "type": "numeric-input",
      "topic": "Probabilidades de cauda",
      "difficulty": "core",
      "prompt": "Para seis diferenças i.i.d. não nulas, a hipótese nula do teste dos sinais dá \\(B\\sim\\operatorname{Bin}(6,1/2)\\). Observam-se \\(t=5\\) diferenças positivas. Usando \\(|B-3|\\) como medida de extremidade, calcule o valor-p bilateral exato \\(\\mathbb P(|B-3|\\ge|5-3|)\\).",
      "correctAnswer": "7/32",
      "acceptedAnswers": [
        "7/32"
      ],
      "answerDisplay": "\\(\\frac{7}{32}\\)",
      "explanation": "Estar pelo menos a esta distância de \\(3\\) significa \\(B\\in\\{0,1,5,6\\}\\). A massa total é \\((1+6+6+1)/2^6=14/64=7/32\\). Ambas as caudas, incluindo as contagens igualmente extremas, entram neste valor-p bilateral.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "testes-dos-sinais-unilaterais-e-bilaterais",
          "sourceKey": "stmt-sign-pvalues"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 44,
          "anchor": "o-cálculo-bilateral-exato",
          "sourceKey": "O cálculo bilateral exato"
        }
      ]
    },
    {
      "id": "lec06-032",
      "type": "numeric-input",
      "topic": "Testes dos sinais",
      "difficulty": "core",
      "prompt": "Num teste dos sinais bilateral com seis diferenças não nulas, observam-se três sinais positivos e três negativos. Sob a hipótese nula, \\(B\\sim\\operatorname{Bin}(6,1/2)\\), e o valor-p é \\(\\mathbb P(|B-3|\\ge|3-3|)\\). Quanto vale?",
      "correctAnswer": "1",
      "acceptedAnswers": [
        "1"
      ],
      "answerDisplay": "\\(1\\)",
      "explanation": "Todas as contagens possíveis estão a uma distância de \\(3\\) pelo menos igual a zero. O acontecimento é, portanto, certo e o valor-p é \\(1\\), não a massa isolada \\(\\mathbb P(B=3)\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "testes-dos-sinais-unilaterais-e-bilaterais",
          "sourceKey": "stmt-sign-pvalues"
        }
      ]
    },
    {
      "id": "lec06-033",
      "type": "multiple-choice",
      "topic": "Testes dos sinais",
      "difficulty": "core",
      "prompt": "Antes de observar os dados, um investigador pretende detetar tanto um aumento como uma diminuição nas diferenças emparelhadas. Que escolha segue o enquadramento do teste dos sinais nos slides?",
      "options": [
        {
          "id": "a",
          "text": "Usar um teste dos sinais bilateral escolhido antes de observar os dados."
        },
        {
          "id": "b",
          "text": "Depois de observar os sinais, escolher o menor valor-p unilateral e tratá-lo como um teste unilateral previamente especificado."
        },
        {
          "id": "c",
          "text": "Usar sempre um teste de cauda superior, mesmo para alterações negativas."
        },
        {
          "id": "d",
          "text": "Escolher o nível de significância imediatamente acima do valor-p observado."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Uma alternativa que permite ambas as direções exige uma regra bilateral de extremidade. Escolher a direção unilateral favorável depois de observar os dados não preserva a garantia de erro unilateral original. As hipóteses e a regra de decisão devem ser especificadas previamente.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "testes-dos-sinais-unilaterais-e-bilaterais",
          "sourceKey": "stmt-sign-pvalues"
        }
      ]
    },
    {
      "id": "lec06-034",
      "type": "multiple-choice",
      "topic": "Dados emparelhados e medianas",
      "difficulty": "challenge",
      "prompt": "Suponha que as diferenças emparelhadas são i.i.d. e não têm massa em zero. Dez diferenças observadas são nove valores \\(+1\\) e um valor \\(-100\\). O valor-p bilateral do teste dos sinais para mediana zero é \\(22/1024\\approx0.0215\\). Ao nível \\(0.05\\), o que é justificado?",
      "options": [
        {
          "id": "a",
          "text": "A média populacional é necessariamente positiva."
        },
        {
          "id": "b",
          "text": "Não se rejeita mediana zero porque a média amostral é negativa."
        },
        {
          "id": "c",
          "text": "Rejeita-se mediana zero; este teste não estabelece uma média populacional positiva."
        },
        {
          "id": "d",
          "text": "É obrigatório retirar o valor extremo antes de aplicar qualquer teste dos sinais."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "A estatística usa nove sinais positivos, não as suas magnitudes. O valor-p é inferior a \\(0.05\\), pelo que se rejeita a hipótese de mediana zero. A média amostral é \\(-9.1\\), ilustrando por que motivo a evidência sobre sinais ou uma mediana não é uma conclusão sobre a média populacional.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medianas-e-sinais",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 43,
          "anchor": "um-exemplo-emparelhado",
          "sourceKey": "stmt-paired-example"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 44,
          "anchor": "o-cálculo-bilateral-exato",
          "sourceKey": "O cálculo bilateral exato"
        }
      ]
    },
    {
      "id": "lec06-035",
      "type": "multiple-choice",
      "topic": "Diferenças nulas",
      "difficulty": "core",
      "prompt": "As diferenças i.i.d. observadas são \\(0,2,-1,0,3,4,0,-2\\). Sob a hipótese nula dos sinais condicionais, \\(\\mathbb P(Z_i>0\\mid Z_i\\ne0)=1/2\\). Depois de condicionar no número \\(M\\) de diferenças não nulas, que distribuição nula se deve usar para a sua contagem positiva \\(T\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\operatorname{Bin}(8,1/2)\\), com \\(T=3\\) observado."
        },
        {
          "id": "b",
          "text": "\\(\\operatorname{Bin}(5,1/2)\\), com \\(T=3\\) observado."
        },
        {
          "id": "c",
          "text": "\\(\\operatorname{Bin}(3,1/2)\\), com \\(T=5\\) observado."
        },
        {
          "id": "d",
          "text": "\\(N(0,1)\\), exatamente."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Há \\(M=5\\) observações não nulas e \\(T=3\\) positivas. Sob equilíbrio condicional dos sinais, \\(T\\mid M=5\\sim\\operatorname{Bin}(5,1/2)\\). As diferenças nulas não contam como sinais negativos nem como ensaios retidos.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 45,
          "anchor": "diferenças-nulas",
          "sourceKey": "stmt-sign-ties"
        }
      ]
    },
    {
      "id": "lec06-036",
      "type": "multiple-choice",
      "topic": "Diferenças nulas",
      "difficulty": "challenge",
      "prompt": "Uma diferença \\(Z\\) tem \\(\\mathbb P(Z=0)=0.6\\), \\(\\mathbb P(Z=1)=0.3\\) e \\(\\mathbb P(Z=-1)=0.1\\). Recorde que \\(0\\) é uma mediana quando \\(\\mathbb P(Z\\le0)\\ge1/2\\) e \\(\\mathbb P(Z\\ge0)\\ge1/2\\). Que afirmação é correta?",
      "options": [
        {
          "id": "a",
          "text": "Zero não é uma mediana."
        },
        {
          "id": "b",
          "text": "Zero é uma mediana e \\(\\mathbb P(Z>0\\mid Z\\ne0)=1/2\\)."
        },
        {
          "id": "c",
          "text": "Zero é uma mediana, mas \\(\\mathbb P(Z>0\\mid Z\\ne0)=3/4\\)."
        },
        {
          "id": "d",
          "text": "Zero é uma mediana, mas \\(\\mathbb P(Z>0\\mid Z\\ne0)=0.3\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "visual": {
        "kind": "bars",
        "values": [
          0.1,
          0.6,
          0.3
        ],
        "labels": [
          "−1",
          "0",
          "1"
        ],
        "title": "A massa em zero pode ocultar sinais desequilibrados",
        "description": "As massas positiva e negativa podem diferir mesmo quando zero é uma mediana.",
        "caption": "As massas positiva e negativa podem diferir mesmo quando zero é uma mediana.",
        "xLabel": "Diferença",
        "yLabel": "Probabilidade"
      },
      "explanation": "As desigualdades da mediana são \\(0.7\\ge1/2\\) e \\(0.9\\ge1/2\\). Contudo, condicionar em não ser zero dá \\(0.3/(0.3+0.1)=3/4\\). Quando há massa em zero, ter mediana zero, por si só, não justifica descartar empates e usar probabilidades binomiais com sinais equiprováveis.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medianas-e-sinais",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 45,
          "anchor": "diferenças-nulas",
          "sourceKey": "stmt-sign-ties"
        }
      ]
    },
    {
      "id": "lec06-037",
      "type": "proof-step",
      "topic": "Diferenças nulas",
      "difficulty": "challenge",
      "prompt": "Divida a probabilidade conjunta apresentada pela probabilidade marginal. Que massa condicional resulta?",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam \\(Z_1,\\ldots,Z_n\\) i.i.d., \\(q=\\mathbb P(Z_i\\ne0)>0\\) e \\(\\mathbb P(Z_i>0\\mid Z_i\\ne0)=1/2\\). Sejam \\(M=\\sum_i\\mathbf1_{\\{Z_i\\ne0\\}}\\) e \\(T=\\sum_i\\mathbf1_{\\{Z_i>0\\}}\\). Para cada \\(m\\) com \\(\\mathbb P(M=m)>0\\), tem-se \\(T\\mid M=m\\sim\\operatorname{Bin}(m,1/2)\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Se \\(q=1\\), então \\(M=n\\) certamente e o resultado é a lei binomial habitual dos sinais independentes. Considere agora \\(0<q<1\\). As probabilidades de diferença positiva, negativa e nula são \\(q/2,q/2,1-q\\). Contando as suas disposições, para \\(0\\le t\\le m\\le n\\), \\[\\begin{aligned}&\\mathbb P(T=t,M=m)\\\\&\\quad=\\frac{n!}{t!(m-t)!(n-m)!}\\\\&\\qquad{}\\cdot(q/2)^m(1-q)^{n-m}.\\end{aligned}\\] Além disso, \\[\\mathbb P(M=m)=\\binom nm q^m(1-q)^{n-m}>0.\\]"
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(T=t\\mid M=m)=\\binom mt2^{-m}\\)"
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(T=t\\mid M=m)=\\binom nt2^{-n}\\)"
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(T=t\\mid M=m)=q^t(1-q)^{m-t}\\)"
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(T=t\\mid M=m)=1/(m+1)\\)"
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Os fatores \\(q^m(1-q)^{n-m}\\) cancelam-se. Dividir o coeficiente fatorial por \\(\\binom nm\\) deixa \\(m!/[t!(m-t)!]=\\binom mt\\), juntamente com \\(2^{-m}\\). O resultado não depende da probabilidade desconhecida \\(q\\) de não ser zero.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 46,
          "anchor": "diferenças-nulas-demonstração",
          "sourceKey": "Diferenças nulas: demonstração"
        }
      ]
    },
    {
      "id": "lec06-038",
      "type": "numeric-input",
      "topic": "Testes dos sinais",
      "difficulty": "challenge",
      "prompt": "Num teste dos sinais bilateral com \\(100\\) diferenças i.i.d. não nulas, observam-se \\(t=60\\) sinais positivos. Sob a hipótese nula, \\(B\\sim\\operatorname{Bin}(100,1/2)\\). Use a aproximação com correção de continuidade \\(p\\approx2\\Phi((k+0.5-50)/5)\\), onde \\(k=\\min(t,100-t)\\) e \\(\\Phi\\) é a função de distribuição normal padrão. Dado \\(\\Phi(-1.9)\\approx0.0287\\), indique o valor-p aproximado com quatro casas decimais.",
      "correctAnswer": "0.0574",
      "acceptedAnswers": [
        "0.0574"
      ],
      "answerDisplay": "\\(0.0574\\)",
      "visual": {
        "kind": "normal",
        "mean": 50,
        "sd": 5,
        "shadeFrom": 32.5,
        "shadeTo": 40.5,
        "marks": [
          {
            "value": 40.5,
            "label": "40.5"
          },
          {
            "value": 50,
            "label": "50"
          },
          {
            "value": 60,
            "label": "60"
          }
        ],
        "title": "Uma das duas caudas aproximantes",
        "description": "Apenas a cauda inferior está sombreada; duplica-se a sua área na aproximação bilateral. O desenho trunca a cauda infinita.",
        "caption": "Apenas a cauda inferior está sombreada; duplica-se a sua área na aproximação bilateral. O desenho trunca a cauda infinita.",
        "xLabel": "Valor"
      },
      "explanation": "Aqui \\(k=40\\), pelo que o extremo corrigido da cauda inferior é \\(40.5\\) e o valor estandardizado é \\(-1.9\\). Duplicar a cauda dá \\(2(0.0287)=0.0574\\). É uma aproximação, não o valor-p binomial exato; não rejeitaria ao nível \\(0.05\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 47,
          "anchor": "aproximação-normal-para-o-teste-dos-sinais",
          "sourceKey": "Aproximação normal para o teste dos sinais"
        }
      ]
    },
    {
      "id": "lec06-039",
      "type": "find-the-intruder",
      "topic": "Valores-p válidos",
      "difficulty": "challenge",
      "prompt": "Sob uma hipótese nula simples, os resultados \\(a\\) e \\(b\\) têm, cada um, probabilidade \\(1/2\\). Que par proposto \\((p(a),p(b))\\) não satisfaz a condição de validade \\(\\mathbb P(p\\le\\alpha)\\le\\alpha\\) para todo o \\(\\alpha\\in[0,1]\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\((1,1)\\)"
        },
        {
          "id": "b",
          "text": "\\((1/2,1)\\)"
        },
        {
          "id": "c",
          "text": "\\((1,1/2)\\)"
        },
        {
          "id": "d",
          "text": "\\((1/4,1)\\)"
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Para o último par, \\(\\mathbb P(p\\le1/4)=1/2>1/4\\), pelo que é inválido. Para cada um dos outros pares, verificar os pontos de salto da distribuição finita dá probabilidades no máximo iguais ao limiar correspondente.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 33,
          "anchor": "valores-p-válidos",
          "sourceKey": "stmt-pvalue"
        }
      ]
    },
    {
      "id": "lec06-040",
      "type": "numeric-input",
      "topic": "Probabilidades de cauda",
      "difficulty": "challenge",
      "prompt": "Uma estatística \\(T\\) toma valores \\(0,1,2\\). A hipótese nula consiste em duas distribuições: sob A, as probabilidades são \\((0.80,0.18,0.02)\\); sob B, são \\((0.70,0.18,0.12)\\), por esta ordem. Valores grandes de \\(T\\) são evidência contra a hipótese nula. Para \\(t=2\\) observado, calcule o valor-p de cauda superior definido como o supremo nas distribuições nulas.",
      "correctAnswer": "0.12",
      "acceptedAnswers": [
        "0.12"
      ],
      "answerDisplay": "\\(0.12\\)",
      "explanation": "As duas caudas superiores em \\(2\\) são \\(0.02\\) e \\(0.12\\). O seu supremo é \\(0.12\\), não o mínimo nem a média. Usar \\(0.02\\) não protegeria o erro de tipo I sob a distribuição nula B.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 34,
          "anchor": "valores-p-a-partir-de-caudas-superiores",
          "sourceKey": "stmt-tail-pvalue"
        }
      ]
    }
  ]
};
