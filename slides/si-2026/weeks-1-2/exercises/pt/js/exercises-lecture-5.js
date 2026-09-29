window.LECTURE_5_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "pt-PT",
  "block": {
    "id": "lecture-5",
    "title": "Aula 5",
    "description": "Semana 3, slides 2–21: médias amostrais, leis dos grandes números, TLC e aproximações normais",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../sources/week-3/pt/index.html#/leis-dos-grandes-números-e-aproximações-normais",
    "featuredTopics": [
      "Amostras e médias",
      "Limites para amostras finitas",
      "Leis dos grandes números",
      "Médias de funções",
      "Teorema do limite central",
      "Aproximações normais"
    ]
  },
  "implementationNotes": {
    "status": "Based on the Week 3 lecture material reviewed on 25 September 2026. Slides are not edited by this exercise project.",
    "scope": "Lecture 5 only: no hypothesis testing. The current Week 3 CLT and its proof are included; the strong law is used without asking for its unstated proof.",
    "rigor": "Each question is independent of previous questions. Bounds, exact quantities and approximations are distinguished; proofs contain the complete claim and preceding steps. No blanket notation blocks.",
    "selection": "8 distinct questions from this bank: 2 intro, 4 core, 2 challenge; at most 2 per topic and 4 numeric. Existing skip and grading behavior is unchanged.",
    "sourceMaintenance": "Run python3 scripts/check_week3_sources.py --slides-source /path/to/slides-2026-week-3. Review reported questions in BOTH languages before updating hashes and reference snapshots.",
    "diagrams": "Local SVGs generated from explicit data. Normal curves illustrate approximations, not exact finite-sample distributions. The question text contains all essential data.",
    "progress": "statistical-inference-2026-practice-lecture-5; separate from other banks and shared across English and Portuguese.",
    "mathematics": "Explicit inline and display LaTeX, rendered with local MathJax. Numeric grading uses plain values, with LaTeX answerDisplay for feedback."
  },
  "sourceCatalog": {
    "week-3-slides": {
      "title": "Inferência Estatística 2026 — Semana 3 (versão de referência)",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../sources/week-3/pt/index.html",
      "slideRange": [
        2,
        21
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
      "id": "lec05-001",
      "type": "multiple-choice",
      "topic": "Amostras e médias",
      "difficulty": "intro",
      "prompt": "Que construção é uma amostra aleatória de dimensão \\(4\\) de uma distribuição de Bernoulli com probabilidade de sucesso \\(1/2\\)?",
      "options": [
        {
          "id": "a",
          "text": "Quatro variáveis Bernoulli\\((1/2)\\) independentes."
        },
        {
          "id": "b",
          "text": "Uma variável \\(Y\\) Bernoulli\\((1/2)\\), registada quatro vezes."
        },
        {
          "id": "c",
          "text": "Quatro variáveis de Bernoulli independentes com probabilidades de sucesso \\(0.1,0.2,0.3,0.4\\)."
        },
        {
          "id": "d",
          "text": "As quatro variáveis \\(Y,1-Y,Y,1-Y\\), usando uma variável \\(Y\\) Bernoulli\\((1/2)\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Uma amostra aleatória consiste em variáveis independentes com a mesma distribuição. Reutilizar uma única observação aleatória cria dependência. Observações independentes com probabilidades de sucesso diferentes não têm a mesma distribuição.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 3,
          "anchor": "amostras-aleatórias-e-médias-amostrais",
          "sourceKey": "stmt-random-sample"
        }
      ]
    },
    {
      "id": "lec05-002",
      "type": "numeric-input",
      "topic": "Amostras e médias",
      "difficulty": "intro",
      "prompt": "Os valores observados são \\(4,6,8,10\\). Qual é a sua média amostral?",
      "correctAnswer": "7",
      "acceptedAnswers": [
        "7"
      ],
      "answerDisplay": "\\(7\\)",
      "explanation": "A média amostral é a soma dividida pelo número de observações: \\(\\bar x_4=(4+6+8+10)/4=7\\). É um valor calculado a partir dos dados, não uma hipótese sobre a média populacional.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 3,
          "anchor": "amostras-aleatórias-e-médias-amostrais",
          "sourceKey": "stmt-random-sample"
        }
      ]
    },
    {
      "id": "lec05-003",
      "type": "multiple-choice",
      "topic": "Amostras e médias",
      "difficulty": "intro",
      "prompt": "Nove medições i.i.d. têm média populacional \\(12\\) e desvio-padrão \\(3\\). Quanto vale \\(\\mathbb E(\\bar X_9)\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(12\\)"
        },
        {
          "id": "b",
          "text": "\\(12/9\\)"
        },
        {
          "id": "c",
          "text": "\\(3\\)"
        },
        {
          "id": "d",
          "text": "\\(108\\)"
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A linearidade dá \\(\\mathbb E(\\bar X_9)=9^{-1}\\sum_{i=1}^9\\mathbb E(X_i)=12\\). Calcular a média altera a variabilidade, não o valor esperado.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "valor-esperado-e-variância-da-média-amostral",
          "sourceKey": "stmt-sample-mean-moments"
        }
      ]
    },
    {
      "id": "lec05-004",
      "type": "numeric-input",
      "topic": "Amostras e médias",
      "difficulty": "core",
      "prompt": "Para \\(25\\) observações i.i.d. com variância \\(36\\), calcule \\(\\mathbb V(\\bar X_{25})\\).",
      "correctAnswer": "36/25",
      "acceptedAnswers": [
        "36/25"
      ],
      "answerDisplay": "\\(\\frac{36}{25}\\)",
      "explanation": "A independência dá \\(\\mathbb V(\\bar X_n)=\\sigma^2/n\\). Logo, a variância é \\(36/25=1.44\\). O desvio-padrão seria \\(6/5\\), que é uma quantidade diferente.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "valor-esperado-e-variância-da-média-amostral",
          "sourceKey": "stmt-sample-mean-moments"
        }
      ]
    },
    {
      "id": "lec05-005",
      "type": "multiple-choice",
      "topic": "Amostras e médias",
      "difficulty": "core",
      "prompt": "Para observações i.i.d. com desvio-padrão fixo \\(\\sigma>0\\), como deve mudar a dimensão da amostra para reduzir a metade o desvio-padrão da média amostral?",
      "options": [
        {
          "id": "a",
          "text": "Duplicá-la."
        },
        {
          "id": "b",
          "text": "Multiplicá-la por quatro."
        },
        {
          "id": "c",
          "text": "Reduzi-la a metade."
        },
        {
          "id": "d",
          "text": "Multiplicá-la por oito."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "visual": {
        "kind": "bars",
        "values": [
          6,
          3,
          1.5
        ],
        "labels": [
          "n=1",
          "n=4",
          "n=16"
        ],
        "title": "A média reduz a dispersão",
        "description": "Ilustração para um desvio-padrão populacional de 6. As alturas são desvios-padrão de médias amostrais.",
        "caption": "Ilustração para um desvio-padrão populacional de 6. As alturas são desvios-padrão de médias amostrais.",
        "xLabel": "Dimensão da amostra",
        "yLabel": "Desvio-padrão"
      },
      "explanation": "O desvio-padrão é \\(\\sigma/\\sqrt n\\). Substituir \\(n\\) por \\(4n\\) divide-o por \\(2\\). Duplicar \\(n\\) apenas o divide por \\(\\sqrt2\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "valor-esperado-e-variância-da-média-amostral",
          "sourceKey": "stmt-sample-mean-moments"
        }
      ]
    },
    {
      "id": "lec05-006",
      "type": "numeric-input",
      "topic": "Limites para amostras finitas",
      "difficulty": "intro",
      "prompt": "Sejam \\(X_i\\) i.i.d. com média \\(\\mu\\) e variância \\(9\\). Que limite superior dá Chebyshev para \\(\\mathbb P(|\\bar X_{100}-\\mu|\\ge1)\\)?",
      "correctAnswer": "0.09",
      "acceptedAnswers": [
        "0.09"
      ],
      "answerDisplay": "\\(0.09\\)",
      "explanation": "A variância da média amostral é \\(9/100\\). Chebyshev dá \\(\\mathbb P(|\\bar X_{100}-\\mu|\\ge1)\\le9/(100\\cdot1^2)=0.09\\). É uma majoração, não necessariamente a probabilidade exata.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "a-lei-fraca-dos-grandes-números",
          "sourceKey": "stmt-weak-law"
        }
      ]
    },
    {
      "id": "lec05-007",
      "type": "numeric-input",
      "topic": "Limites para amostras finitas",
      "difficulty": "challenge",
      "prompt": "Medições i.i.d. têm média \\(\\mu\\) e variância \\(4\\). Usando Chebyshev, determine o menor inteiro \\(n\\) que garante \\(\\mathbb P(|\\bar X_n-\\mu|\\ge0.5)\\le0.05\\).",
      "correctAnswer": "320",
      "acceptedAnswers": [
        "320"
      ],
      "answerDisplay": "\\(320\\)",
      "integerAnswer": true,
      "explanation": "A majoração é \\(4/(n\\cdot0.5^2)=16/n\\). Exigir \\(16/n\\le0.05\\) dá \\(n\\ge320\\). É a menor dimensão certificada por esta majoração, não necessariamente pela distribuição exata desconhecida.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "a-lei-fraca-dos-grandes-números",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "uma-garantia-para-amostras-finitas",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-008",
      "type": "multiple-choice",
      "topic": "Limites para amostras finitas",
      "difficulty": "core",
      "prompt": "Para observações i.i.d. Bernoulli\\((p)\\), defina \\(\\hat p_n=n^{-1}\\sum_{i=1}^nX_i\\). Que majoração de Chebyshev é válida para todo o \\(p\\in[0,1]\\) desconhecido e todo o \\(\\varepsilon>0\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(|\\hat p_n-p|\\ge\\varepsilon)\\le1/(4n\\varepsilon^2)\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(|\\hat p_n-p|\\ge\\varepsilon)\\le\\varepsilon^2/(4n)\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(|\\hat p_n-p|\\ge\\varepsilon)=1/(4n\\varepsilon^2)\\)."
        },
        {
          "id": "d",
          "text": "Não é possível obter uma majoração sem conhecer \\(p\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Usa-se \\(\\mathbb V(X_i)=p(1-p)\\le1/4\\). Chebyshev dá então a majoração uniforme. Se a expressão exceder \\(1\\), continua a ser uma majoração, mas o limite trivial \\(1\\) é mais preciso.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "uma-garantia-para-amostras-finitas",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-009",
      "type": "multiple-choice",
      "topic": "Limites para amostras finitas",
      "difficulty": "intro",
      "prompt": "Para \\(500\\) observações i.i.d. Bernoulli\\((p)\\), os slides dão \\(\\mathbb P(|\\hat p_{500}-p|<0.1)\\ge0.95\\). Que interpretação é justificada?",
      "options": [
        {
          "id": "a",
          "text": "A probabilidade é igual a \\(0.95\\) para todo o \\(p\\)."
        },
        {
          "id": "b",
          "text": "Para cada \\(p\\) fixo, a probabilidade de sucesso é pelo menos \\(0.95\\)."
        },
        {
          "id": "c",
          "text": "Todas as amostras têm erro inferior a \\(0.1\\)."
        },
        {
          "id": "d",
          "text": "A garantia exige observações normais."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "A desigualdade é um limite inferior para amostras finitas, válido uniformemente em \\(p\\). Não é uma igualdade nem uma garantia para cada amostra individual. Não foi usada uma aproximação normal.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "uma-garantia-para-amostras-finitas",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-010",
      "type": "multiple-choice",
      "topic": "Leis dos grandes números",
      "difficulty": "intro",
      "prompt": "Que fórmula exprime a conclusão da lei fraca de que a média amostral converge em probabilidade para \\(\\mu\\)?",
      "options": [
        {
          "id": "a",
          "text": "Para todo o \\(\\varepsilon>0\\), \\(\\mathbb P(|\\bar X_n-\\mu|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "b",
          "text": "Para um \\(\\varepsilon\\) suficientemente grande, \\(\\mathbb P(|\\bar X_n-\\mu|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(\\bar X_n=\\mu)\\to1\\)."
        },
        {
          "id": "d",
          "text": "\\(\\bar X_n=\\mu\\) para todo o \\(n\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A convergência em probabilidade exige considerar cada tolerância positiva fixa. Não exige igualdade exata a \\(\\mu\\), e a tolerância é fixada antes de fazer \\(n\\) tender para infinito.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "a-lei-fraca-dos-grandes-números",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 15,
          "anchor": "leis-dos-grandes-números-e-o-tlc",
          "sourceKey": "Leis dos grandes números e o TLC"
        }
      ]
    },
    {
      "id": "lec05-011",
      "type": "multiple-choice",
      "topic": "Leis dos grandes números",
      "difficulty": "core",
      "prompt": "O que afirma a lei forte para observações i.i.d. integráveis com média \\(\\mu\\)?",
      "options": [
        {
          "id": "a",
          "text": "Para quase todo o resultado \\(\\omega\\), a sucessão completa \\(\\bar X_n(\\omega)\\) tende para \\(\\mu\\)."
        },
        {
          "id": "b",
          "text": "Todas as médias amostrais são iguais a \\(\\mu\\) quando \\(n\\ge100\\)."
        },
        {
          "id": "c",
          "text": "O erro diminui estritamente em cada passo, quase certamente."
        },
        {
          "id": "d",
          "text": "Apenas os valores esperados convergem, não as próprias médias amostrais."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A lei forte é uma afirmação sobre trajetórias completas fora de um conjunto de probabilidade zero. Não fornece um limiar finito universal nem uma melhoria monótona ao longo de uma trajetória.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "a-lei-forte-dos-grandes-números",
          "sourceKey": "stmt-strong-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 8,
          "anchor": "médias-amostrais-ao-longo-de-resultados-individuais",
          "sourceKey": "Médias amostrais ao longo de resultados individuais"
        }
      ]
    },
    {
      "id": "lec05-012",
      "type": "proof-step",
      "topic": "Limites para amostras finitas",
      "difficulty": "challenge",
      "prompt": "Que estimativa completa a demonstração da lei fraca?",
      "context": [
        {
          "label": "Teorema",
          "text": "Se \\(X_1,X_2,\\ldots\\) são i.i.d. com média \\(\\mu\\) e variância finita \\(\\sigma^2\\), então \\(\\bar X_n=n^{-1}\\sum_{i=1}^nX_i\\) converge em probabilidade para \\(\\mu\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "A linearidade e a independência dão \\(\\mathbb E(\\bar X_n)=\\mu\\) e \\(\\mathbb V(\\bar X_n)=\\sigma^2/n\\). Fixe \\(\\varepsilon>0\\) e aplique a desigualdade de Chebyshev."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\le\\sigma^2/(n\\varepsilon^2)\\to0\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)=\\sigma^2/(n\\varepsilon^2)\\) para todo o \\(n\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\le n\\sigma^2/\\varepsilon^2\\to0\\)."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(\\bar X_n=\\mu)=1\\) porque \\(\\mathbb E(\\bar X_n)=\\mu\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Chebyshev majora a probabilidade pela variância dividida pelo quadrado da tolerância. Aqui a variância é \\(\\sigma^2/n\\). A estimativa vale para cada \\(\\varepsilon>0\\) fixo, provando a convergência em probabilidade.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "valor-esperado-e-variância-da-média-amostral",
          "sourceKey": "stmt-sample-mean-moments"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "a-lei-fraca-dos-grandes-números",
          "sourceKey": "stmt-weak-law"
        }
      ]
    },
    {
      "id": "lec05-013",
      "type": "multiple-choice",
      "topic": "Leis dos grandes números",
      "difficulty": "intro",
      "prompt": "Para uma sucessão i.i.d., que hipótese sobre momentos é suficiente para a lei forte enunciada nesta aula?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb E(|X_1|)<\\infty\\)."
        },
        {
          "id": "b",
          "text": "Não é necessária nenhuma hipótese sobre momentos."
        },
        {
          "id": "c",
          "text": "Apenas \\(\\mathbb E(X_1^2)=\\infty\\)."
        },
        {
          "id": "d",
          "text": "As observações têm de ser todas iguais à média comum."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Basta a integrabilidade absoluta. Este enunciado da lei forte não exige variância finita. A média comum \\(\\mathbb E(X_1)\\) é então um número real finito.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "a-lei-forte-dos-grandes-números",
          "sourceKey": "stmt-strong-law"
        }
      ]
    },
    {
      "id": "lec05-014",
      "type": "multiple-select",
      "topic": "Leis dos grandes números",
      "difficulty": "core",
      "prompt": "Sejam \\(X_i\\) i.i.d. com média \\(\\mu\\) e variância finita \\(\\sigma^2\\). Que conclusões sobre \\(\\bar X_n\\) são garantidas? Selecione todas as corretas.",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n\\to\\mu\\) quase certamente."
        },
        {
          "id": "b",
          "text": "\\(\\bar X_n\\to\\mu\\) em probabilidade."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb E(|\\bar X_n-\\mu|^2)\\to0\\)."
        },
        {
          "id": "d",
          "text": "Existe um \\(N\\) determinístico tal que \\(\\bar X_n=\\mu\\) quase certamente para todo o \\(n\\ge N\\)."
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
      "explanation": "A variância finita implica integrabilidade, pelo que se aplicam as leis forte e fraca. Além disso, \\(\\mathbb E(|\\bar X_n-\\mu|^2)=\\sigma^2/n\\to0\\). Nenhuma destas conclusões exige igualdade exata a partir de algum índice.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "valor-esperado-e-variância-da-média-amostral",
          "sourceKey": "stmt-sample-mean-moments"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "a-lei-fraca-dos-grandes-números",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "a-lei-forte-dos-grandes-números",
          "sourceKey": "stmt-strong-law"
        }
      ]
    },
    {
      "id": "lec05-015",
      "type": "numeric-input",
      "topic": "Leis dos grandes números",
      "difficulty": "core",
      "prompt": "Seja \\(Y\\sim\\operatorname{Bernoulli}(1/2)\\) e defina \\(X_i=Y\\) para todo o \\(i\\). Para qualquer dimensão amostral \\(n\\), calcule \\(\\mathbb P(|\\bar X_n-1/2|>1/4)\\).",
      "correctAnswer": "1",
      "acceptedAnswers": [
        "1"
      ],
      "answerDisplay": "\\(1\\)",
      "explanation": "Aqui \\(\\bar X_n=Y\\), que vale \\(0\\) ou \\(1\\). A distância a \\(1/2\\) é sempre \\(1/2\\). As variáveis têm distribuições idênticas, mas não são independentes, pelo que calcular a média não elimina esta aleatoriedade.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 12,
          "anchor": "a-importância-da-independência",
          "sourceKey": "stmt-dependent-average"
        }
      ]
    },
    {
      "id": "lec05-016",
      "type": "find-the-intruder",
      "topic": "Leis dos grandes números",
      "difficulty": "core",
      "prompt": "Suponha que a lei forte dá \\(\\bar X_n\\to\\mu\\) quase certamente. Que afirmação NÃO é garantida?",
      "options": [
        {
          "id": "a",
          "text": "Quase toda a trajetória tem limite \\(\\mu\\)."
        },
        {
          "id": "b",
          "text": "Para cada \\(\\varepsilon>0\\) fixo, quase toda a trajetória acaba por permanecer a uma distância inferior a \\(\\varepsilon\\) de \\(\\mu\\)."
        },
        {
          "id": "c",
          "text": "O erro \\(|\\bar X_n-\\mu|\\) tem de diminuir em cada passo a partir de algum índice, quase certamente."
        },
        {
          "id": "d",
          "text": "\\(\\bar X_n\\to\\mu\\) em probabilidade."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Convergência não é monotonia. As médias amostrais podem aproximar-se e afastar-se de \\(\\mu\\), continuando a tender para esse valor. Um gráfico finito pode ilustrar a convergência, mas não prova uma afirmação sobre uma trajetória infinita.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "a-lei-forte-dos-grandes-números",
          "sourceKey": "stmt-strong-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 8,
          "anchor": "médias-amostrais-ao-longo-de-resultados-individuais",
          "sourceKey": "Médias amostrais ao longo de resultados individuais"
        }
      ]
    },
    {
      "id": "lec05-017",
      "type": "numeric-input",
      "topic": "Médias de funções",
      "difficulty": "intro",
      "prompt": "Sejam \\(U_i\\) i.i.d. uniformes em \\((0,1)\\). Qual é o limite quase certo da proporção de observações que satisfazem \\(U_i\\le0.3\\)?",
      "correctAnswer": "0.3",
      "acceptedAnswers": [
        "0.3"
      ],
      "answerDisplay": "\\(0.3\\)",
      "explanation": "A proporção é \\(n^{-1}\\sum_{i=1}^n\\mathbf1_{(0,\\,0.3]}(U_i)\\). As parcelas são variáveis de Bernoulli i.i.d. com média \\(0.3\\). A sua média amostral converge quase certamente para \\(0.3\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 9,
          "anchor": "frequências-relativas",
          "sourceKey": "stmt-relative-frequencies"
        }
      ]
    },
    {
      "id": "lec05-018",
      "type": "proof-step",
      "topic": "Médias de funções",
      "difficulty": "core",
      "prompt": "Que passo justifica aplicar a lei forte às indicadoras?",
      "context": [
        {
          "label": "Teorema",
          "text": "Se \\(X_i\\) são i.i.d. e \\(B\\subseteq\\mathbb R\\) é de Borel, então \\(n^{-1}\\sum_{i=1}^n\\mathbf1_B(X_i)\\to\\mathbb P(X_1\\in B)\\) quase certamente."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina \\(Y_i=\\mathbf1_B(X_i)\\). A frequência relativa pretendida é \\(n^{-1}\\sum_{i=1}^nY_i\\). Para usar a lei forte, verifique independência, uma distribuição comum e integrabilidade."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "São i.i.d., limitadas por \\(1\\), e têm valor esperado comum \\(\\mathbb P(X_1\\in B)\\)."
        },
        {
          "id": "b",
          "text": "Têm distribuição normal."
        },
        {
          "id": "c",
          "text": "São iguais para todas as observações."
        },
        {
          "id": "d",
          "text": "Têm variância zero para todo o conjunto de Borel \\(B\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Aplicar a mesma indicadora mensurável a observações independentes e identicamente distribuídas preserva ambas as propriedades. A limitação garante integrabilidade. A lei forte identifica o limite com o valor esperado da indicadora.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 9,
          "anchor": "frequências-relativas",
          "sourceKey": "stmt-relative-frequencies"
        }
      ]
    },
    {
      "id": "lec05-019",
      "type": "find-the-intruder",
      "topic": "Médias de funções",
      "difficulty": "challenge",
      "prompt": "Sejam \\(U_i\\) i.i.d. uniformes em \\((0,1)\\). Cada função indicada vale \\(0\\) fora de \\((0,1)\\). Qual não satisfaz a hipótese \\(\\mathbb E(|g(U_1)|)<\\infty\\) necessária ao teorema da aula sobre médias com limite finito?",
      "options": [
        {
          "id": "a",
          "text": "\\(g(u)=u^2\\)."
        },
        {
          "id": "b",
          "text": "\\(g(u)=u^{-1/2}\\)."
        },
        {
          "id": "c",
          "text": "\\(g(u)=u^{-1}\\)."
        },
        {
          "id": "d",
          "text": "\\(g(u)=\\mathbf1_{(0,\\,1/2]}(u)\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "O integral \\(\\int_0^1u^{-1}\\,du\\) diverge. Os outros integrais absolutos são \\(1/3,2,1/2\\). A falha desta hipótese impede aplicar o teorema enunciado com média finita, mas não refuta todos os possíveis resultados sobre limites.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 10,
          "anchor": "médias-de-funções",
          "sourceKey": "stmt-transformed-averages"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 11,
          "anchor": "simulação-e-integração",
          "sourceKey": "stmt-monte-carlo"
        }
      ]
    },
    {
      "id": "lec05-020",
      "type": "multiple-choice",
      "topic": "Médias de funções",
      "difficulty": "challenge",
      "prompt": "Para \\(U_i\\sim\\operatorname{Uniform}(0,1)\\) i.i.d., escreva \\(\\bar U_n=n^{-1}\\sum_{i=1}^nU_i\\). Quais são os limites quase certos de \\(\\bigl(n^{-1}\\sum_{i=1}^nU_i^2,\\;(\\bar U_n)^2\\bigr)\\), por esta ordem?",
      "options": [
        {
          "id": "a",
          "text": "\\((1/4,1/4)\\)."
        },
        {
          "id": "b",
          "text": "\\((1/3,1/4)\\)."
        },
        {
          "id": "c",
          "text": "\\((1/4,1/3)\\)."
        },
        {
          "id": "d",
          "text": "\\((1/3,1/3)\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Aplique a lei forte a \\(U_i^2\\) para obter \\(\\mathbb E(U_1^2)=1/3\\). Separadamente, \\(\\bar U_n\\to1/2\\) quase certamente, e elevar esse limite pontual ao quadrado dá \\(1/4\\). A média dos quadrados e o quadrado da média são operações diferentes.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 10,
          "anchor": "médias-de-funções",
          "sourceKey": "stmt-transformed-averages"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 11,
          "anchor": "simulação-e-integração",
          "sourceKey": "stmt-monte-carlo"
        }
      ]
    },
    {
      "id": "lec05-021",
      "type": "multiple-choice",
      "topic": "Teorema do limite central",
      "difficulty": "intro",
      "prompt": "Sejam \\(X_i\\) i.i.d. com média \\(\\mu\\) e variância \\(0<\\sigma^2<\\infty\\). Que média amostral estandardizada converge em distribuição para \\(N(0,1)\\) pelo TLC?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\sqrt n(\\bar X_n-\\mu)/\\sigma\\)."
        },
        {
          "id": "b",
          "text": "\\((\\bar X_n-\\mu)/(\\sigma\\sqrt n)\\)."
        },
        {
          "id": "c",
          "text": "\\(\\sqrt n(\\bar X_n-\\mu)/\\sigma^2\\), qualquer que seja \\(\\sigma\\)."
        },
        {
          "id": "d",
          "text": "\\(\\sqrt n\\,\\bar X_n/\\sigma\\), qualquer que seja \\(\\mu\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Subtraia a média e divida pelo desvio-padrão da média amostral, \\(\\sigma/\\sqrt n\\). Obtém-se a primeira expressão. As próprias observações não precisam de ter distribuição normal.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 13,
          "anchor": "central-limit-theorem",
          "sourceKey": "central-limit-theorem"
        }
      ]
    },
    {
      "id": "lec05-022",
      "type": "multiple-choice",
      "topic": "Teorema do limite central",
      "difficulty": "core",
      "prompt": "Sejam \\(X_i\\) variáveis exponenciais i.i.d. com taxa \\(1\\). Cada uma tem média \\(1\\) e variância \\(1\\). Que conclusão fornece o TLC?",
      "options": [
        {
          "id": "a",
          "text": "Cada \\(X_i\\) tem distribuição normal para \\(i\\) grande."
        },
        {
          "id": "b",
          "text": "\\(\\sqrt n(\\bar X_n-1)\\) converge em distribuição para \\(N(0,1)\\)."
        },
        {
          "id": "c",
          "text": "\\(\\bar X_n\\) converge em distribuição para \\(N(0,1)\\)."
        },
        {
          "id": "d",
          "text": "\\(\\sqrt n(\\bar X_n-1)\\) tem exatamente distribuição \\(N(0,1)\\) para todo o \\(n\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "O TLC diz respeito à média centrada e reescalada. Cada observação individual continua a ser exponencial, e a distribuição para uma amostra finita não tem de coincidir com o limite normal.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 13,
          "anchor": "central-limit-theorem",
          "sourceKey": "central-limit-theorem"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 16,
          "anchor": "aproximação-normal-amostras-exponenciais",
          "sourceKey": "Aproximação normal: amostras exponenciais"
        }
      ]
    },
    {
      "id": "lec05-023",
      "type": "numeric-input",
      "topic": "Teorema do limite central",
      "difficulty": "core",
      "prompt": "Para observações i.i.d. com média \\(\\mu\\) e variância \\(0<\\sigma^2<\\infty\\), defina \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\). A probabilidade normal padrão \\(\\Phi(1)-\\Phi(-1)\\) é aproximadamente \\(0.6827\\). Dê \\(\\lim_{n\\to\\infty}\\mathbb P(-1<T_n\\le1)\\) com quatro casas decimais.",
      "correctAnswer": "0.6827",
      "acceptedAnswers": [
        "0.6827"
      ],
      "answerDisplay": "\\(0.6827\\)",
      "visual": {
        "kind": "normal",
        "mean": 0,
        "sd": 1,
        "shadeFrom": -1,
        "shadeTo": 1,
        "marks": [
          {
            "value": -1,
            "label": "-1"
          },
          {
            "value": 0,
            "label": "0"
          },
          {
            "value": 1,
            "label": "1"
          }
        ],
        "title": "A área normal limite",
        "description": "O intervalo sombreado vai de −1 a 1 sob uma densidade normal padrão.",
        "caption": "O intervalo sombreado vai de −1 a 1 sob uma densidade normal padrão.",
        "xLabel": "Valor"
      },
      "explanation": "O TLC e a continuidade da função de distribuição normal dão o limite \\(\\Phi(1)-\\Phi(-1)\\). O decimal apresentado aproxima essa probabilidade limite, não é uma afirmação exata para uma amostra finita.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 13,
          "anchor": "central-limit-theorem",
          "sourceKey": "central-limit-theorem"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 17,
          "anchor": "aproximações-normais-de-probabilidades",
          "sourceKey": "stmt-clt-intervals"
        }
      ]
    },
    {
      "id": "lec05-024",
      "type": "numeric-input",
      "topic": "Aproximações normais",
      "difficulty": "core",
      "prompt": "Um tempo total de espera é \\(S_{64}=\\sum_{i=1}^{64}X_i\\), com tempos independentes e exponenciais de taxa \\(1/3\\) por minuto. Cada um tem média \\(3\\) minutos e variância \\(9\\) minutos quadrados. Qual é o desvio-padrão de \\(S_{64}\\), em minutos?",
      "correctAnswer": "24",
      "acceptedAnswers": [
        "24"
      ],
      "answerDisplay": "\\(24\\)",
      "explanation": "As variâncias somam-se sob independência: \\(\\mathbb V(S_{64})=64\\cdot9=576\\). A raiz quadrada é \\(24\\). É a dispersão da soma, enquanto a média amostral tem desvio-padrão \\(3/8\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 18,
          "anchor": "um-tempo-total-de-espera",
          "sourceKey": "stmt-waiting-time-example"
        }
      ]
    },
    {
      "id": "lec05-025",
      "type": "multiple-choice",
      "topic": "Teorema do limite central",
      "difficulty": "intro",
      "prompt": "Que descrição corresponde ao TLC, e não às leis dos grandes números?",
      "options": [
        {
          "id": "a",
          "text": "Identifica uma distribuição limite normal para o erro amostral reescalado."
        },
        {
          "id": "b",
          "text": "Afirma que a média amostral se aproxima da média populacional quase certamente."
        },
        {
          "id": "c",
          "text": "Afirma que toda a amostra suficientemente grande dá a média populacional exata."
        },
        {
          "id": "d",
          "text": "Faz com que as próprias observações tenham distribuição normal."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "As leis dos grandes números tratam de \\(\\bar X_n-\\mu\\to0\\). O TLC estuda a distribuição limite não trivial após multiplicar o erro por \\(\\sqrt n/\\sigma\\), sob as suas hipóteses de variância finita e positiva.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 15,
          "anchor": "leis-dos-grandes-números-e-o-tlc",
          "sourceKey": "Leis dos grandes números e o TLC"
        }
      ]
    },
    {
      "id": "lec05-026",
      "type": "proof-step",
      "topic": "Demonstração do TLC",
      "difficulty": "core",
      "prompt": "Que valor de \\(\\varphi''(0)\\) fornece o termo quadrático na demonstração?",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam \\(X_1,X_2,\\ldots\\) i.i.d. com média \\(\\mu\\) e variância \\(0<\\sigma^2<\\infty\\). Escreva-se \\(\\bar X_n=n^{-1}\\sum_{j=1}^nX_j\\). Então \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\) converge em distribuição para \\(N(0,1)\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina \\(Z_j=(X_j-\\mu)/\\sigma\\) e \\(\\varphi(t)=\\mathbb E(e^{itZ_1})\\), com \\(i^2=-1\\). Então \\(\\mathbb E(Z_1)=0\\), \\(\\mathbb E(Z_1^2)=1\\), \\(\\varphi(0)=1\\) e \\(\\varphi'(0)=0\\). A identidade dos momentos dá \\(\\varphi''(0)=-\\mathbb E(Z_1^2)\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(1\\)"
        },
        {
          "id": "b",
          "text": "\\(0\\)"
        },
        {
          "id": "c",
          "text": "\\(-1\\)"
        },
        {
          "id": "d",
          "text": "\\(-\\sigma^2\\), independentemente da estandardização."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Como \\(\\varphi''(0)=-\\mathbb E(Z_1^2)\\), centrar e estandardizar dá \\(-1\\). O coeficiente quadrático de Taylor é, portanto, \\(-1/2\\), não \\(-1\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 14,
          "anchor": "central-limit-proof",
          "sourceKey": "central-limit-proof"
        }
      ]
    },
    {
      "id": "lec05-027",
      "type": "proof-step",
      "topic": "Demonstração do TLC",
      "difficulty": "core",
      "prompt": "Que expressão é a função característica de \\(T_n\\)?",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam \\(X_1,X_2,\\ldots\\) i.i.d. com média \\(\\mu\\) e variância \\(0<\\sigma^2<\\infty\\). Escreva-se \\(\\bar X_n=n^{-1}\\sum_{j=1}^nX_j\\). Então \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\) converge em distribuição para \\(N(0,1)\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina \\(Z_j=(X_j-\\mu)/\\sigma\\) e seja \\(\\varphi\\) a sua função característica comum. Então \\(T_n=n^{-1/2}\\sum_{j=1}^nZ_j\\), e os \\(Z_j\\) são independentes. Vamos exprimir a função característica desta soma antes de passar ao limite."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(n\\varphi(t/\\sqrt n)\\)."
        },
        {
          "id": "b",
          "text": "\\(\\varphi(t)^n/\\sqrt n\\)."
        },
        {
          "id": "c",
          "text": "\\(\\varphi(t/\\sqrt n)^n\\)."
        },
        {
          "id": "d",
          "text": "\\(\\varphi(nt)\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Reescalar cada parcela substitui \\(t\\) por \\(t/\\sqrt n\\). A independência transforma a função característica de uma soma num produto. As distribuições idênticas tornam iguais os \\(n\\) fatores.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 14,
          "anchor": "central-limit-proof",
          "sourceKey": "central-limit-proof"
        }
      ]
    },
    {
      "id": "lec05-028",
      "type": "proof-step",
      "topic": "Demonstração do TLC",
      "difficulty": "challenge",
      "prompt": "Para \\(t\\) real fixo, qual é o limite da função característica apresentada?",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam \\(X_1,X_2,\\ldots\\) i.i.d. com média \\(\\mu\\) e variância \\(0<\\sigma^2<\\infty\\). Escreva-se \\(\\bar X_n=n^{-1}\\sum_{j=1}^nX_j\\). Então \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\) converge em distribuição para \\(N(0,1)\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Para \\(Z_j=(X_j-\\mu)/\\sigma\\), a fórmula de Taylor da sua função característica é \\(\\varphi(u)=1-u^2/2+u^2r(u)\\), com \\(r(u)\\to0\\) quando \\(u\\to0\\). A independência dá\n\\[\\begin{aligned}&\\varphi_{T_n}(t)\\\\&\\quad=\\left(1+\\frac{-t^2/2+t^2r(t/\\sqrt n)}{n}\\right)^n.\\end{aligned}\\]\nUse \\((1+a_n/n)^n\\to e^a\\) sempre que \\(a_n\\to a\\), também para \\(a_n\\) complexos."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(e^{-t^2/2}\\)."
        },
        {
          "id": "b",
          "text": "\\(1\\) para todo o \\(t\\)."
        },
        {
          "id": "c",
          "text": "\\(e^{-t^2}\\)."
        },
        {
          "id": "d",
          "text": "\\(0\\) para todo o \\(t\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Para \\(t\\) fixo, o numerador tende para \\(-t^2/2\\). O limite elementar das potências dá \\(e^{-t^2/2}\\), a função característica de \\(N(0,1)\\). É contínua em zero, pelo que o teorema de Lévy conclui a demonstração.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 14,
          "anchor": "central-limit-proof",
          "sourceKey": "central-limit-proof"
        }
      ]
    },
    {
      "id": "lec05-029",
      "type": "multiple-choice",
      "topic": "Teorema do limite central",
      "difficulty": "challenge",
      "prompt": "Suponha que \\(X_i=7\\) quase certamente para todo o \\(i\\). O que é correto sobre as médias amostrais e a estandardização usual do TLC?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n=7\\) quase certamente, mas dividir por \\(\\sigma=0\\) não está definido, pelo que a fórmula enunciada do TLC não se aplica."
        },
        {
          "id": "b",
          "text": "A média estandardizada é \\(0/0=0\\)."
        },
        {
          "id": "c",
          "text": "A lei forte falha porque a variância é zero."
        },
        {
          "id": "d",
          "text": "Uma amostra de observações constantes adquire uma distribuição normal quando a dimensão aumenta."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A média amostral já é exatamente \\(7\\). As variáveis constantes satisfazem as leis dos grandes números. O TLC apresentado exige variância estritamente positiva porque a normalização divide por \\(\\sigma\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "a-lei-forte-dos-grandes-números",
          "sourceKey": "stmt-strong-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 13,
          "anchor": "central-limit-theorem",
          "sourceKey": "central-limit-theorem"
        }
      ]
    },
    {
      "id": "lec05-030",
      "type": "numeric-input",
      "topic": "Aproximações normais",
      "difficulty": "core",
      "prompt": "Os pesos de maçãs são i.i.d. com média \\(170\\) g e desvio-padrão \\(24\\) g. Para \\(36\\) maçãs, use uma aproximação normal para estimar \\(\\mathbb P(166<\\bar X_{36}\\le174)\\). Use \\(\\Phi(1)-\\Phi(-1)\\approx0.6827\\) e responda com quatro casas decimais.",
      "correctAnswer": "0.6827",
      "acceptedAnswers": [
        "0.6827"
      ],
      "answerDisplay": "\\(0.6827\\)",
      "visual": {
        "kind": "normal",
        "mean": 170,
        "sd": 4,
        "shadeFrom": 166,
        "shadeTo": 174,
        "marks": [
          {
            "value": 166,
            "label": "166"
          },
          {
            "value": 170,
            "label": "170"
          },
          {
            "value": 174,
            "label": "174"
          }
        ],
        "title": "Aproximação normal para a média",
        "description": "A curva aproxima a distribuição da média amostral, não a do peso de uma maçã individual.",
        "caption": "A curva aproxima a distribuição da média amostral, não a do peso de uma maçã individual.",
        "xLabel": "Valor"
      },
      "explanation": "O desvio-padrão da média é \\(24/\\sqrt{36}=4\\) g. Os extremos estandardizados são \\(-1\\) e \\(1\\), dando a área normal indicada. Sem um modelo populacional normal, trata-se de uma aproximação, não de uma probabilidade exata.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 17,
          "anchor": "aproximações-normais-de-probabilidades",
          "sourceKey": "stmt-clt-intervals"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 21,
          "anchor": "exercícios-médias-amostrais",
          "sourceKey": "stmt-worksheet2-ex5"
        }
      ]
    },
    {
      "id": "lec05-031",
      "type": "multiple-choice",
      "topic": "Limites para amostras finitas",
      "difficulty": "core",
      "prompt": "Para observações i.i.d. com variância fixa \\(\\sigma^2>0\\), Chebyshev majora \\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\) por \\(\\sigma^2/(n\\varepsilon^2)\\). Se a tolerância for reduzida a metade, como deve mudar \\(n\\) para manter esta majoração?",
      "options": [
        {
          "id": "a",
          "text": "Duplicá-lo."
        },
        {
          "id": "b",
          "text": "Mantê-lo."
        },
        {
          "id": "c",
          "text": "Multiplicá-lo por quatro."
        },
        {
          "id": "d",
          "text": "Dividi-lo por quatro."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Com tolerância \\(\\varepsilon/2\\), a majoração passa a \\(4\\sigma^2/(n'\\varepsilon^2)\\). Para ser igual à original, exige-se \\(n'=4n\\). Uma tolerância duas vezes mais precisa exige quatro vezes mais observações para esta garantia.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "a-lei-fraca-dos-grandes-números",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "uma-garantia-para-amostras-finitas",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-032",
      "type": "multiple-choice",
      "topic": "Aproximações normais",
      "difficulty": "core",
      "prompt": "Medições i.i.d. têm média \\(100\\) e desvio-padrão desconhecido \\(\\sigma>0\\). Para \\(n=25\\), uma aproximação normal dá \\(\\mathbb P(\\bar X_{25}\\le104)\\approx0.975\\). Usando \\(\\Phi(1.96)\\approx0.975\\), que valor de \\(\\sigma\\) sugere esta aproximação?",
      "options": [
        {
          "id": "a",
          "text": "Cerca de \\(2.04\\)."
        },
        {
          "id": "b",
          "text": "Cerca de \\(10.20\\)."
        },
        {
          "id": "c",
          "text": "Cerca de \\(0.80\\)."
        },
        {
          "id": "d",
          "text": "Cerca de \\(39.20\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "A estandardização dá \\((104-100)/(\\sigma/5)\\approx1.96\\). Logo, \\(\\sigma\\approx20/1.96\\approx10.20\\). O valor \\(2.04\\) seria o desvio-padrão da média amostral, não de uma medição individual.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 17,
          "anchor": "aproximações-normais-de-probabilidades",
          "sourceKey": "stmt-clt-intervals"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 21,
          "anchor": "exercícios-médias-amostrais",
          "sourceKey": "stmt-worksheet2-ex5"
        }
      ]
    },
    {
      "id": "lec05-033",
      "type": "multiple-choice",
      "topic": "Aproximações normais",
      "difficulty": "challenge",
      "prompt": "Seja \\(S\\sim\\operatorname{Bin}(100,1/2)\\). Que área normal usa a correção de continuidade para \\(\\mathbb P(40\\le S\\le60)\\)? Aqui \\(Z\\sim N(0,1)\\).",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(-2\\le Z\\le2)\\)"
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(-1.9\\le Z\\le1.9)\\)"
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(-2.1\\le Z\\le2.1)\\)"
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(-10.5\\le Z\\le10.5)\\)"
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "A média binomial é \\(50\\) e o desvio-padrão é \\(5\\). Substitui-se o intervalo de inteiros por \\([39.5,60.5]\\) e estandardiza-se para \\([-2.1,2.1]\\). Incluir as duas barras dos extremos exige alargar o intervalo, não encurtá-lo.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 19,
          "anchor": "aproximação-binomial-e-correção-de-continuidade",
          "sourceKey": "stmt-continuity-correction-definition"
        }
      ]
    },
    {
      "id": "lec05-034",
      "type": "multiple-choice",
      "topic": "Aproximações normais",
      "difficulty": "core",
      "prompt": "Aproxima a probabilidade \\(\\mathbb P(S\\ge6)\\) de uma contagem binomial \\(S\\) pela cauda superior de uma variável normal contínua com a mesma média e variância. Antes de estandardizar, que limite inferior aplica a correção de continuidade?",
      "options": [
        {
          "id": "a",
          "text": "\\(6.5\\)"
        },
        {
          "id": "b",
          "text": "\\(5.5\\)"
        },
        {
          "id": "c",
          "text": "\\(6\\)"
        },
        {
          "id": "d",
          "text": "\\(5\\)"
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "O inteiro \\(6\\) está incluído. A sua barra de largura unitária começa em \\(5.5\\), pelo que a cauda contínua aproximante começa aí. O limite \\(6.5\\) aproximaria antes \\(\\mathbb P(S\\ge7)\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 19,
          "anchor": "aproximação-binomial-e-correção-de-continuidade",
          "sourceKey": "stmt-continuity-correction-definition"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 20,
          "anchor": "exercícios-probabilidades-binomiais",
          "sourceKey": "stmt-worksheet2-ex1"
        }
      ]
    },
    {
      "id": "lec05-035",
      "type": "multiple-choice",
      "topic": "Exato e aproximado",
      "difficulty": "challenge",
      "prompt": "Considere dois modelos para duas observações i.i.d.: (A) cada observação tem distribuição \\(N(0,1)\\); (B) cada uma é igual a \\(-1\\) ou \\(1\\), cada valor com probabilidade \\(1/2\\). Ambas as populações têm média \\(0\\) e variância \\(1\\). Quais são os valores exatos de \\(\\mathbb P(\\bar X_2=0)\\) nos modelos A e B, respetivamente?",
      "options": [
        {
          "id": "a",
          "text": "\\(0,\\ 0\\)"
        },
        {
          "id": "b",
          "text": "\\(1/2,\\ 1/2\\)"
        },
        {
          "id": "c",
          "text": "\\(0,\\ 1/2\\)"
        },
        {
          "id": "d",
          "text": "\\(1,\\ 1/2\\)"
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Em A, \\(\\bar X_2\\sim N(0,1/2)\\), pelo que um ponto isolado tem probabilidade \\(0\\). Em B, a média é zero exatamente quando os sinais diferem, com probabilidade \\(2(1/2)^2=1/2\\). A média e a variância não determinam probabilidades exatas para amostras finitas.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 13,
          "anchor": "central-limit-theorem",
          "sourceKey": "central-limit-theorem"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 21,
          "anchor": "exercícios-médias-amostrais",
          "sourceKey": "stmt-worksheet2-ex5"
        }
      ]
    },
    {
      "id": "lec05-036",
      "type": "numeric-input",
      "topic": "Exato e aproximado",
      "difficulty": "core",
      "prompt": "Quatro lançamentos independentes de uma moeda equilibrada dão uma contagem de caras \\(S\\sim\\operatorname{Bin}(4,1/2)\\). Calcule a probabilidade exata \\(\\mathbb P(S\\ge3)\\), sem aproximação normal.",
      "correctAnswer": "5/16",
      "acceptedAnswers": [
        "5/16"
      ],
      "answerDisplay": "\\(\\frac{5}{16}\\)",
      "explanation": "Somam-se as duas massas binomiais: \\(\\mathbb P(S\\ge3)=[\\binom43+\\binom44]/2^4=(4+1)/16=5/16\\). Com esta amostra pequena, o cálculo exato é breve.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 20,
          "anchor": "exercícios-probabilidades-binomiais",
          "sourceKey": "stmt-worksheet2-ex1"
        }
      ]
    },
    {
      "id": "lec05-037",
      "type": "multiple-choice",
      "topic": "Exato e aproximado",
      "difficulty": "challenge",
      "prompt": "Sejam \\(X_i\\) i.i.d. com média \\(\\mu\\) e variância \\(0<\\sigma^2<\\infty\\). Defina \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\). O que permite concluir apenas o TLC sobre \\(\\mathbb P(|T_n|\\le1.96)\\)?",
      "options": [
        {
          "id": "a",
          "text": "É igual a \\(0.95\\) para todo o \\(n\\ge30\\)."
        },
        {
          "id": "b",
          "text": "É pelo menos \\(0.95\\) para todo o \\(n\\)."
        },
        {
          "id": "c",
          "text": "O seu erro relativamente a \\(0.95\\) é no máximo \\(1/n\\)."
        },
        {
          "id": "d",
          "text": "Tende para \\(\\Phi(1.96)-\\Phi(-1.96)\\), que é aproximadamente \\(0.95\\)."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "A distribuição normal limite não tem massa em nenhum dos extremos, pelo que a convergência em distribuição dá este limite da probabilidade do intervalo. O TLC enunciado não fornece um limiar universal, cobertura exata para amostras finitas nem uma taxa numérica de erro.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 13,
          "anchor": "central-limit-theorem",
          "sourceKey": "central-limit-theorem"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 17,
          "anchor": "aproximações-normais-de-probabilidades",
          "sourceKey": "stmt-clt-intervals"
        }
      ]
    },
    {
      "id": "lec05-038",
      "type": "multiple-choice",
      "topic": "Leis dos grandes números",
      "difficulty": "core",
      "prompt": "Suponha que \\(X_i\\) são i.i.d., não negativas, com \\(\\mathbb E(X_i)=3\\) e \\(\\mathbb E(X_i^2)=\\infty\\). Que conclusão é garantida pelas leis dos grandes números enunciadas nos slides?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n\\to3\\) quase certamente e, portanto, em probabilidade."
        },
        {
          "id": "b",
          "text": "A média amostral não pode convergir porque a variância é infinita."
        },
        {
          "id": "c",
          "text": "A demonstração por Chebyshev com variância finita dá a majoração \\(3/n\\)."
        },
        {
          "id": "d",
          "text": "\\(\\sqrt n(\\bar X_n-3)\\) tem de convergir para \\(N(0,1)\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A não negatividade dá \\(\\mathbb E|X_i|=3<\\infty\\), o que basta para a lei forte enunciada. O argumento de Chebyshev com variância finita e o TLC apresentado não se aplicam, mas isso não impede a conclusão da lei forte.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "a-lei-fraca-dos-grandes-números",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "a-lei-forte-dos-grandes-números",
          "sourceKey": "stmt-strong-law"
        }
      ]
    },
    {
      "id": "lec05-039",
      "type": "proof-step",
      "topic": "Médias de funções",
      "difficulty": "core",
      "prompt": "Que passo seguinte permite aplicar a lei forte?",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam \\(X_i\\) variáveis aleatórias reais i.i.d. e \\(g:\\mathbb R\\to\\mathbb R\\) mensurável de Borel, com \\(\\mathbb E|g(X_1)|<\\infty\\). Então \\(n^{-1}\\sum_{i=1}^n g(X_i)\\to\\mathbb E(g(X_1))\\) quase certamente."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina \\(Y_i=g(X_i)\\). A mensurabilidade de \\(g\\) garante que cada \\(Y_i\\) é uma variável aleatória. Pretendemos aplicar a lei forte à sucessão \\((Y_i)\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "As variáveis \\(Y_i\\) são i.i.d. e satisfazem \\(\\mathbb E|Y_i|<\\infty\\)."
        },
        {
          "id": "b",
          "text": "A identidade \\(g(\\bar X_n)=n^{-1}\\sum_i g(X_i)\\) vale para todo o \\(g\\)."
        },
        {
          "id": "c",
          "text": "Toda a função mensurável \\(g\\) é limitada."
        },
        {
          "id": "d",
          "text": "As variáveis \\(Y_i\\) têm variância finita por serem mensuráveis."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Aplicar separadamente a mesma função mensurável a variáveis independentes e identicamente distribuídas preserva a independência e a distribuição comum. A integrabilidade assumida é precisamente o que a lei forte exige; não é necessário um segundo momento finito.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 10,
          "anchor": "médias-de-funções",
          "sourceKey": "stmt-transformed-averages"
        }
      ]
    },
    {
      "id": "lec05-040",
      "type": "multiple-select",
      "topic": "Teorema do limite central",
      "difficulty": "challenge",
      "prompt": "Sejam \\(X_i\\) independentes, tomando cada uma \\(-1\\) e \\(1\\) com probabilidade \\(1/2\\). Defina \\(\\bar X_n=n^{-1}\\sum_{i=1}^n X_i\\) e \\(T_n=\\sqrt n\\,\\bar X_n\\). Selecione todas as afirmações verdadeiras.",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n\\to0\\) quase certamente."
        },
        {
          "id": "b",
          "text": "\\(\\bar X_n\\to0\\) em probabilidade."
        },
        {
          "id": "c",
          "text": "\\(T_n\\) converge em distribuição para \\(N(0,1)\\)."
        },
        {
          "id": "d",
          "text": "\\(T_n\\to0\\) em probabilidade."
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
      "explanation": "A média é \\(0\\) e a variância é \\(1\\). A lei forte dá as duas primeiras conclusões e o TLC dá a terceira. Se \\(T_n\\) convergisse em probabilidade para \\(0\\), o seu limite em distribuição seria a massa pontual em \\(0\\), contradizendo o limite normal. Erros que tendem para zero podem continuar a ter flutuações não nulas após reescalamento.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "a-lei-forte-dos-grandes-números",
          "sourceKey": "stmt-strong-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 13,
          "anchor": "central-limit-theorem",
          "sourceKey": "central-limit-theorem"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 15,
          "anchor": "leis-dos-grandes-números-e-o-tlc",
          "sourceKey": "Leis dos grandes números e o TLC"
        }
      ]
    }
  ]
};
