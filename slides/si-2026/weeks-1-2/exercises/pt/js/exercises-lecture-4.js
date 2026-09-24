window.LECTURE_4_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "pt-PT",
  "block": {
    "id": "lecture-4",
    "title": "Aula 4",
    "description": "Slides 115–140: modos de convergência, sucessões concretas, desigualdade de Markov e transformações de limites",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../../pt/index.html#/modos-de-convergência",
    "featuredTopics": [
      "Classificar convergências",
      "Picos raros",
      "Máquina de escrever",
      "Markov e Chebyshev",
      "Convergência dominada",
      "Limites em distribuição"
    ]
  },
  "implementationNotes": {
    "scope": "Lecture 4 only: current rendered slides 115–140, checked 2026-09-24. No laws of large numbers, central limit theorem, or Borel–Cantelli assumptions. Chebyshev is explicitly derived as an application of Markov to a squared centred error.",
    "models": "Every sequence and target is explicit. Reused uniform variables specify the coupling; independent copies are stated as such. All variables share a probability space where a coupling-based mode is asked.",
    "multipleSelect": "Select exactly all true listed modes. correctAnswers contains stable option IDs. Scored as one question, with no partial credit. The engine shuffles the display order.",
    "proofs": "Proof exercises contain only the theorem and preceding argument. Construction context is included only where needed; no blanket notation or index preamble.",
    "diagrams": "Illustrations show selected finite terms of analytically defined infinite sequences. They are illustrative, not evidence of convergence by themselves.",
    "selection": "Eight questions from this bank only: 2 intro, 4 core, 2 challenge; max 2 per topic and 4 numeric. Skip moves an unanswered question to the end without scoring it.",
    "progress": "Separate key statistical-inference-2026-practice-lecture-4; shared between English and European Portuguese. Old banks unchanged.",
    "mathematics": "Visible mathematical text is authored in TeX with explicit inline \\(…\\) and display \\[...\\] delimiters and rendered by the locally vendored MathJax. Answer IDs and accepted numerical input stay unchanged."
  },
  "sourceCatalog": {
    "lecture-4-slides": {
      "title": "Inferência Estatística 2026 — Aula 4",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../../pt/index.html",
      "slideRange": [
        115,
        140
      ],
      "deckSha256": "4d9323a884e044409a14addd374a63cf03a3b435d20e43da0907fe1eeef92e8e",
      "renderedSourceFile": "slides/si-2026/weeks-1-2/pt/index.html",
      "sourceFile": "slides-2026-weeks-1-2/pt/index.qmd",
      "checkedOn": "2026-09-24"
    }
  },
  "exercises": [
    {
      "id": "lec04-001",
      "type": "multiple-choice",
      "topic": "Definições e implicações",
      "difficulty": "intro",
      "prompt": "Qual das afirmações define a convergência de \\(X_n\\) para \\(X\\) em probabilidade?",
      "options": [
        {
          "id": "a",
          "text": "Para todo o \\(\\varepsilon>0\\) fixo, \\(\\mathbb P(|X_n-X|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "b",
          "text": "É necessário que \\(\\mathbb P(X_n=X)\\to1\\)."
        },
        {
          "id": "c",
          "text": "Existe um \\(\\varepsilon>0\\) para o qual \\(\\mathbb P(|X_n-X|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb E[X_n]\\to\\mathbb E[X]\\) é necessário e suficiente."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A condição tem de valer para toda a tolerância positiva fixa, não apenas para uma. A igualdade exata é dispensável: \\(X_n=\\frac1n\\) converge para 0, embora \\(\\mathbb P(X_n=0)=0\\). Os valores esperados podem não existir ou não convergir.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 122,
          "anchor": "convergência-em-probabilidade"
        }
      ]
    },
    {
      "id": "lec04-002",
      "type": "multiple-select",
      "topic": "Erros limitados",
      "difficulty": "intro",
      "prompt": "Um erro de calibração é \\(X_n=\\frac Un\\), usando a mesma \\(U\\sim\\operatorname{Unif}(0,1)\\) para todo o \\(n\\). Em quais dos sentidos indicados converge \\(X_n\\) para 0?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2",
        "linf"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,linf,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,linf,prob",
      "explanation": "Quase certamente \\(|X_n|\\le\\frac1n\\) e \\(\\lVert X_n\\rVert_\\infty=\\frac1n\\to0\\). Logo, verificam-se os seis modos. Diretamente, \\(\\mathbb E|X_n|=\\frac1{2n}\\) e \\(\\mathbb E[X_n^2]=\\frac1{3n^2}\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "convergência-em-linfty"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "relações-de-implicação"
        }
      ]
    },
    {
      "id": "lec04-003",
      "type": "multiple-select",
      "topic": "Erros limitados",
      "difficulty": "intro",
      "prompt": "Seja \\(U\\sim\\operatorname{Unif}(0,1)\\), a mesma para todos os \\(n\\), e \\(X_n=\\mathbf1_{\\{U\\le1/n\\}}\\). Que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,prob",
      "explanation": "Para cada \\(u>0\\) a indicadora acaba por ser zero, pelo que há convergência quase certa. Para todo o \\(p\\ge1\\) finito, \\(\\mathbb E|X_n|^p=\\frac1n\\to0\\). Há, portanto, convergência em \\(L^1\\), \\(L^2\\), probabilidade e distribuição. Mas \\(\\lVert X_n\\rVert_\\infty=1\\) para todo o \\(n\\): ainda existe um conjunto de probabilidade positiva, embora decrescente, com erro 1.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "convergência-em-linfty"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "convergência-dominada-em-lp"
        }
      ]
    },
    {
      "id": "lec04-004",
      "type": "multiple-select",
      "topic": "Picos raros",
      "difficulty": "core",
      "prompt": "Um pagamento raro é \\(X_n=n\\mathbf1_{\\{U\\le1/n\\}}\\), com a mesma \\(U\\sim\\operatorname{Unif}(0,1)\\) para todo o \\(n\\). Que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist"
      ],
      "acceptedAnswers": [
        "as,dist,prob"
      ],
      "correctAnswer": "as,dist,prob",
      "explanation": "Para cada \\(u>0\\) o pagamento acaba por desaparecer. Assim, \\(X_n\\to0\\) quase certamente, em probabilidade e em distribuição. Contudo, \\(\\mathbb E|X_n|=1\\), \\(\\mathbb E[X_n^2]=n\\) e \\(\\lVert X_n\\rVert_\\infty=n\\). Nenhuma das três convergências em norma indicadas se verifica: os pagamentos tornam-se mais raros, mas também maiores.",
      "visual": {
        "kind": "spikes",
        "ns": [
          2,
          4,
          8
        ],
        "power": 1,
        "widthPower": 1,
        "xLabel": "u",
        "yLabel": "Xₙ(u)",
        "title": "Intervalos mais estreitos, picos mais altos",
        "description": "Gráficos de u ↦ n^1 1{0<u≤1/n^1} para n=2,4,8, nos mesmos eixos.",
        "caption": "São funções da mesma variável uniforme U, não densidades de probabilidade. A fórmula do enunciado especifica toda a sucessão."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "convergência-quase-certa-sem-convergência-em-l1"
        }
      ]
    },
    {
      "id": "lec04-005",
      "type": "multiple-select",
      "topic": "Picos raros",
      "difficulty": "core",
      "prompt": "Seja \\(X_n=\\sqrt n\\,\\mathbf1_{\\{U\\le1/n\\}}\\), usando uma única \\(U\\sim\\operatorname{Unif}(0,1)\\). Que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1"
      ],
      "acceptedAnswers": [
        "as,dist,l1,prob"
      ],
      "correctAnswer": "as,dist,l1,prob",
      "explanation": "Cada \\(u>0\\) acaba por sair do intervalo decrescente, logo há convergência quase certa. \\(\\mathbb E|X_n|=\\frac1{\\sqrt n}\\to0\\), mas \\(\\mathbb E[X_n^2]=1\\) e \\(\\lVert X_n\\rVert_\\infty=\\sqrt n\\). Há convergência em \\(L^1\\), mas não em \\(L^2\\) nem em \\(L^\\infty\\). Seguem-se as convergências em probabilidade e distribuição.",
      "visual": {
        "kind": "spikes",
        "ns": [
          2,
          4,
          8
        ],
        "power": 0.5,
        "widthPower": 1,
        "xLabel": "u",
        "yLabel": "Xₙ(u)",
        "title": "Intervalos mais estreitos, picos mais altos",
        "description": "Gráficos de u ↦ n^0.5 1{0<u≤1/n^1} para n=2,4,8, nos mesmos eixos.",
        "caption": "São funções da mesma variável uniforme U, não densidades de probabilidade. A fórmula do enunciado especifica toda a sucessão."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "convergência-quase-certa-sem-convergência-em-l1"
        }
      ]
    },
    {
      "id": "lec04-006",
      "type": "multiple-select",
      "topic": "Picos raros",
      "difficulty": "core",
      "prompt": "Seja \\(X_n=n\\mathbf1_{\\{U\\le1/n^3\\}}\\), com uma única \\(U\\sim\\operatorname{Unif}(0,1)\\). Que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,prob",
      "explanation": "O suporte decrescente dá convergência quase certa. \\(\\mathbb E|X_n|=\\frac1{n^2}\\) e \\(\\mathbb E[X_n^2]=\\frac1n\\) tendem ambas para zero. Há convergência em \\(L^1\\), \\(L^2\\), probabilidade e distribuição. O supremo essencial continua a ser \\(n\\), pelo que falha a convergência em \\(L^\\infty\\). Um pico crescente não impede, por si só, a convergência em momentos finitos.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "convergência-quase-certa-sem-convergência-em-l1"
        }
      ]
    },
    {
      "id": "lec04-007",
      "type": "multiple-choice",
      "topic": "Convergência em momentos",
      "difficulty": "challenge",
      "prompt": "Fixe \\(\\alpha>0\\), \\(\\beta>0\\) e \\(1\\le p<\\infty\\). Para a mesma \\(U\\sim\\operatorname{Unif}(0,1)\\), defina \\(X_n=n^\\alpha\\mathbf1_{\\{U\\le n^{-\\beta}\\}}\\). Quando é que \\(X_n\\) converge para 0 em \\(L^p\\)?",
      "options": [
        {
          "id": "a",
          "text": "Exatamente quando \\(\\alpha p>\\beta\\)."
        },
        {
          "id": "b",
          "text": "Para quaisquer \\(\\alpha,\\beta>0\\), pois o acontecimento torna-se raro."
        },
        {
          "id": "c",
          "text": "Exatamente quando \\(\\alpha p<\\beta\\)."
        },
        {
          "id": "d",
          "text": "Exatamente quando \\(\\alpha p\\le\\beta\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "\\(\\mathbb E|X_n|^p=n^{\\alpha p}\\mathbb P(U\\le n^{-\\beta})=n^{\\alpha p-\\beta}\\). Isto tende para zero exatamente quando o expoente é negativo. Na fronteira \\(\\alpha p=\\beta\\) o momento permanece igual a 1, pelo que a desigualdade tem de ser estrita.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "convergência-quase-certa-sem-convergência-em-l1"
        }
      ]
    },
    {
      "id": "lec04-008",
      "type": "numeric-input",
      "topic": "Convergência em momentos",
      "difficulty": "intro",
      "prompt": "Seja \\(X_n=n\\mathbf1_{\\{U\\le1/n^2\\}}\\), com \\(U\\sim\\operatorname{Unif}(0,1)\\). Quanto vale \\(\\mathbb E|X_{20}|\\)?",
      "acceptedAnswers": [
        "0.05",
        "1/20"
      ],
      "correctAnswer": "0.05",
      "explanation": "\\(\\mathbb E|X_n|=n\\frac1{n^2}=\\frac1n\\). Para \\(n=20\\), obtém-se \\(\\frac1{20}=0{,}05\\). Em contraste, \\(\\mathbb E[X_n^2]=1\\), o que ilustra convergência em \\(L^1\\) sem convergência em \\(L^2\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "convergência-quase-certa-sem-convergência-em-l1"
        }
      ],
      "answerDisplay": "\\(0{,}05\\)"
    },
    {
      "id": "lec04-009",
      "type": "multiple-select",
      "topic": "Erros limitados",
      "difficulty": "core",
      "prompt": "Seja \\(U\\sim\\operatorname{Unif}(0,1)\\) e \\(X_n=U^n\\), usando sempre a mesma \\(U\\). Que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,prob",
      "explanation": "Para todo o \\(0<u<1\\), \\(u^n\\to0\\). Além disso, \\(\\mathbb E|X_n|^p=\\int_0^1u^{np}\\,du=\\frac1{np+1}\\to0\\) para todo o \\(p\\ge1\\) finito. Mas \\(\\mathbb P(U^n>a)>0\\) para \\(0\\le a<1\\), pelo que \\(\\lVert X_n\\rVert_\\infty=1\\) para todo o \\(n\\). O decaimento pontual não tem de ser uniforme em \\(u\\), mesmo ignorando conjuntos nulos.",
      "visual": {
        "kind": "powers",
        "ns": [
          1,
          4,
          16
        ],
        "title": "Potências do mesmo valor",
        "description": "Gráficos de u, u⁴ e u¹⁶ em [0,1], nos mesmos eixos. U está estritamente entre 0 e 1 quase certamente.",
        "caption": "O extremo u=1 tem probabilidade zero, mas qualquer intervalo imediatamente à sua esquerda tem probabilidade positiva.",
        "xLabel": "u",
        "yLabel": "uⁿ"
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "convergência-em-linfty"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "convergência-dominada-em-lp"
        }
      ]
    },
    {
      "id": "lec04-010",
      "type": "multiple-select",
      "topic": "Convergência em momentos",
      "difficulty": "core",
      "prompt": "Seja \\(Z\\sim\\mathcal N(0,1)\\) e \\(X_n=\\frac Zn\\), usando a mesma \\(Z\\) para todos os \\(n\\). Que modos de convergência para 0 se verificam? Recorde que a convergência em \\(L^\\infty\\) exige que as variáveis pertençam a \\(L^\\infty\\).",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,prob",
      "explanation": "\\(Z\\) é finita quase certamente, pelo que \\(Z/n\\to0\\) quase certamente. \\(\\mathbb E[X_n^2]=\\frac1{n^2}\\to0\\), logo há também convergência em \\(L^1\\). Seguem-se as convergências em probabilidade e distribuição. Uma variável normal não é essencialmente limitada: para todo o \\(a\\) finito, \\(\\mathbb P(|Z|>a)>0\\). Assim, \\(Z/n\\) não pertence a \\(L^\\infty\\) e não se verifica convergência nesse espaço.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 120,
          "anchor": "o-espaço-linftymathbb-p"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergência-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "relações-de-implicação"
        }
      ]
    },
    {
      "id": "lec04-011",
      "type": "multiple-choice",
      "topic": "Dependência e limites",
      "difficulty": "intro",
      "prompt": "Para a sucessão determinística \\(X_n=(-1)^n\\), qual das afirmações sobre a convergência para 0 está correta?",
      "options": [
        {
          "id": "a",
          "text": "Há convergência em probabilidade porque os valores positivos e negativos se cancelam."
        },
        {
          "id": "b",
          "text": "Os seis modos verificam-se porque a sucessão é limitada."
        },
        {
          "id": "c",
          "text": "Não há convergência para 0 quase certa, em probabilidade, \\(L^1\\), \\(L^2\\), \\(L^\\infty\\) ou distribuição."
        },
        {
          "id": "d",
          "text": "Só há convergência em distribuição para 0."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "O erro absoluto é sempre 1. Logo, a probabilidade de erro superior a \\(\\frac12\\) e todas as normas indicadas permanecem iguais a 1. A convergência em distribuição para a constante 0 implicaria convergência em probabilidade, pelo que também falha. Ser limitada não implica ser convergente.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 135,
          "anchor": "convergência-em-probabilidade-e-em-distribuição"
        }
      ]
    },
    {
      "id": "lec04-012",
      "type": "multiple-select",
      "topic": "Dependência e limites",
      "difficulty": "core",
      "prompt": "Seja \\(R\\) igual a \\(-1\\) ou 1, cada um com probabilidade \\(\\frac12\\), e defina \\(X_n=(-1)^nR\\). Que modos de convergência para a variável aleatória específica \\(R\\) se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "dist"
      ],
      "acceptedAnswers": [
        "dist"
      ],
      "correctAnswer": "dist",
      "explanation": "Cada \\(X_n\\) tem a mesma distribuição que \\(R\\), pelo que há convergência em distribuição. Para \\(n\\) ímpar, \\(|X_n-R|=2\\) certamente; para \\(n\\) par, é zero. Logo, o erro não tende para zero quase certamente, em probabilidade ou em qualquer das normas indicadas. Distribuições marginais iguais não garantem proximidade ponto a ponto.",
      "visual": {
        "kind": "paths",
        "xs": [
          1,
          2,
          3,
          4,
          5,
          6
        ],
        "series": [
          {
            "label": "R=1",
            "ys": [
              -1,
              1,
              -1,
              1,
              -1,
              1
            ]
          },
          {
            "label": "R=−1",
            "ys": [
              1,
              -1,
              1,
              -1,
              1,
              -1
            ]
          }
        ],
        "title": "Duas trajetórias possíveis",
        "description": "Para R=1 os valores alternam entre −1 e 1; para R=−1, entre 1 e −1. Cada trajetória completa tem probabilidade 1/2.",
        "caption": "Os pontos representam índices inteiros. As linhas apenas ajudam a leitura; não se realiza um novo sorteio em cada n.",
        "xLabel": "n",
        "yLabel": "Xₙ"
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 136,
          "anchor": "distribuições-iguais-sem-convergência-em-probabilidade"
        }
      ]
    },
    {
      "id": "lec04-013",
      "type": "multiple-select",
      "topic": "Dependência e limites",
      "difficulty": "core",
      "prompt": "Seja \\(R\\) uma variável aleatória que toma os valores \\(-1\\) e \\(1\\) com igual probabilidade. Sejam \\(R_1,R_2,\\ldots\\) cópias independentes, também independentes de \\(R\\). Que modos de convergência de \\(R_n\\) para \\(R\\) se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "dist"
      ],
      "acceptedAnswers": [
        "dist"
      ],
      "correctAnswer": "dist",
      "explanation": "As distribuições são idênticas. Mas a independência dá \\(\\mathbb P(|R_n-R|>1)=\\mathbb P(R_n\\ne R)=\\frac12\\) para todo o \\(n\\). Falha, portanto, a convergência em probabilidade, bem como a convergência quase certa e todas as convergências em norma indicadas, que a implicariam. Não é necessário nenhum teorema sobre infinitos acontecimentos independentes.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 136,
          "anchor": "distribuições-iguais-sem-convergência-em-probabilidade"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "relações-de-implicação"
        }
      ]
    },
    {
      "id": "lec04-014",
      "type": "multiple-select",
      "topic": "Erros limitados",
      "difficulty": "core",
      "prompt": "Seja \\(R\\) igual a \\(-1\\) ou 1, cada um com probabilidade \\(\\frac12\\). Defina \\(X_n=R+\\frac1n\\). Que modos de convergência para \\(R\\) se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2",
        "linf"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,linf,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,linf,prob",
      "explanation": "O limite proposto é \\(R\\), não 0. O erro \\(X_n-R\\) é o número determinístico \\(\\frac1n\\), pelo que o seu supremo essencial tende para zero. Seguem-se os seis modos, apesar de o limite continuar a ser aleatório.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "convergência-em-linfty"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "relações-de-implicação"
        }
      ]
    },
    {
      "id": "lec04-015",
      "type": "multiple-select",
      "topic": "Sucessão da máquina de escrever",
      "difficulty": "core",
      "prompt": "Para a sucessão da máquina de escrever \\(T_n\\) definida acima, que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "prob",
        "dist",
        "l1",
        "l2"
      ],
      "acceptedAnswers": [
        "dist,l1,l2,prob"
      ],
      "correctAnswer": "dist,l1,l2,prob",
      "context": [
        {
          "label": "Construção",
          "text": "Em \\([0,1)\\), com probabilidade uniforme, defina\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nonde \\(m\\ge0\\) e \\(k\\in\\{0,\\ldots,2^m-1\\}\\) são inteiros. Percorra cada linha \\(m\\) da esquerda para a direita em \\(k\\) e avance depois para a linha seguinte."
        }
      ],
      "explanation": "No nível \\(m\\), \\(\\mathbb E|T_n|^p=2^{-m}\\) para todo o \\(p\\ge1\\) finito, e \\(m\\to\\infty\\) quando \\(n\\to\\infty\\). Há convergência em \\(L^1\\), \\(L^2\\), probabilidade e distribuição. Cada \\(u\\) pertence a um intervalo de cada linha e fica fora de outros; os seus valores incluem infinitos uns e zeros, logo não há convergência quase certa. O supremo essencial mantém-se igual a 1.",
      "visual": {
        "kind": "typewriter",
        "levels": 4,
        "xLabel": "u",
        "yLabel": "Linha m",
        "title": "Um intervalo em movimento",
        "description": "As linhas m=0,1,2,3 dividem [0,1) em 1,2,4,8 intervalos semiabertos. As células de cada linha são termos consecutivos distintos, não um único acontecimento.",
        "caption": "Leia cada linha da esquerda para a direita e depois avance para a seguinte. Cada célula é o suporte de uma indicadora e está identificada pelo índice n. Os extremos direitos são excluídos."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "a-sucessão-da-máquina-de-escrever"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "máquina-de-escrever-convergência-em-l_p-sem-convergência-quase-certa"
        }
      ]
    },
    {
      "id": "lec04-016",
      "type": "proof-step",
      "topic": "Sucessão da máquina de escrever",
      "difficulty": "challenge",
      "prompt": "O que completa o argumento de que a sucessão da máquina de escrever não converge quase certamente?",
      "options": [
        {
          "id": "a",
          "text": "Como os valores esperados tendem para zero, todas as trajetórias têm de tender para zero."
        },
        {
          "id": "b",
          "text": "Células disjuntas na mesma linha significam que todos os termos da sucessão são independentes."
        },
        {
          "id": "c",
          "text": "Cada \\(u\\) aparece em apenas uma linha, pelo que acaba por ter valor zero."
        },
        {
          "id": "d",
          "text": "Para cada \\(u\\) ocorrem infinitos uns e infinitos zeros ao longo da sucessão, pelo que não existe limite pontual."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Em \\([0,1)\\), com probabilidade uniforme, defina\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nonde \\(m\\ge0\\) e \\(k\\in\\{0,\\ldots,2^m-1\\}\\) são inteiros. Percorra cada linha \\(m\\) da esquerda para a direita em \\(k\\) e avance depois para a linha seguinte. A sucessão \\((T_n)\\) não converge quase certamente."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe \\(u\\in[0,1)\\). Em cada linha \\(m\\ge1\\), exatamente um intervalo contém \\(u\\) e pelo menos um não o contém. Os termos são lidos linha a linha."
        }
      ],
      "explanation": "Em cada linha \\(m\\ge1\\) há um termo igual a 1 e pelo menos outro igual a 0 no \\(u\\) escolhido. Existem infinitas linhas, pelo que nenhum dos valores desaparece. A sucessão não converge em ponto algum, uma conclusão mais forte do que apenas não convergir quase certamente.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "a-sucessão-da-máquina-de-escrever"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "máquina-de-escrever-convergência-em-l_p-sem-convergência-quase-certa"
        }
      ]
    },
    {
      "id": "lec04-017",
      "type": "numeric-input",
      "topic": "Sucessão da máquina de escrever",
      "difficulty": "intro",
      "prompt": "Para a sucessão da máquina de escrever acima, calcule \\(\\mathbb P(T_{12}>\\tfrac12)\\).",
      "acceptedAnswers": [
        "1/8",
        "0.125"
      ],
      "correctAnswer": "1/8",
      "context": [
        {
          "label": "Construção",
          "text": "Em \\([0,1)\\), com probabilidade uniforme, defina\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nonde \\(m\\ge0\\) e \\(k\\in\\{0,\\ldots,2^m-1\\}\\) são inteiros. Percorra cada linha \\(m\\) da esquerda para a direita em \\(k\\) e avance depois para a linha seguinte."
        }
      ],
      "explanation": "\\(12=2^3+4\\), pelo que estamos na linha \\(m=3\\) e célula \\(k=4\\), isto é, \\([\\tfrac12,\\tfrac58)\\). A indicadora excede \\(\\frac12\\) exatamente nesse intervalo, cujo comprimento é \\(\\frac18\\).",
      "visual": {
        "kind": "typewriter",
        "levels": 4,
        "xLabel": "u",
        "yLabel": "Linha m",
        "title": "Um intervalo em movimento",
        "description": "As linhas m=0,1,2,3 dividem [0,1) em 1,2,4,8 intervalos semiabertos. As células de cada linha são termos consecutivos distintos, não um único acontecimento.",
        "caption": "Leia cada linha da esquerda para a direita e depois avance para a seguinte. Cada célula é o suporte de uma indicadora e está identificada pelo índice n. Os extremos direitos são excluídos."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "a-sucessão-da-máquina-de-escrever"
        }
      ],
      "answerDisplay": "\\(\\frac{1}{8}\\)"
    },
    {
      "id": "lec04-018",
      "type": "multiple-select",
      "topic": "Sucessão da máquina de escrever",
      "difficulty": "challenge",
      "prompt": "Modifique a sucessão da máquina de escrever, definindo \\(Y_n=\\frac{T_n}{m+1}\\) quando \\(n=2^m+k\\). Que modos de convergência de \\(Y_n\\) para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2",
        "linf"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,linf,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,linf,prob",
      "context": [
        {
          "label": "Construção",
          "text": "Em \\([0,1)\\), com probabilidade uniforme, defina\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nonde \\(m\\ge0\\) e \\(k\\in\\{0,\\ldots,2^m-1\\}\\) são inteiros. Percorra cada linha \\(m\\) da esquerda para a direita em \\(k\\) e avance depois para a linha seguinte."
        }
      ],
      "explanation": "Embora os suportes continuem a mover-se, a maior altura possível é \\(\\frac1{m+1}\\to0\\). Assim, \\(\\lVert Y_n\\rVert_\\infty\\to0\\) e verificam-se os seis modos. Visitas repetidas a cada ponto não impedem a convergência quando as amplitudes tendem para zero.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "convergência-em-linfty"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "a-sucessão-da-máquina-de-escrever"
        }
      ]
    },
    {
      "id": "lec04-019",
      "type": "proof-step",
      "topic": "Definições e implicações",
      "difficulty": "challenge",
      "prompt": "Que passo produz um único conjunto excecional fora do qual a convergência é pontual?",
      "options": [
        {
          "id": "a",
          "text": "Uma união não numerável de conjuntos nulos tem sempre probabilidade zero."
        },
        {
          "id": "b",
          "text": "Cada \\(A_n\\) tem de ser vazio porque a sua probabilidade é zero."
        },
        {
          "id": "c",
          "text": "Defina \\(A=\\bigcup_{n\\ge1}A_n\\). A subaditividade numerável dá \\(\\mathbb P(A)=0\\); fora de \\(A\\) todas as estimativas valem, logo \\(|X_n-X|\\to0\\)."
        },
        {
          "id": "d",
          "text": "Defina \\(A=\\bigcap_{n\\ge1}A_n\\); fora desta interseção todas as estimativas valem necessariamente."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam \\(X,X_1,X_2,\\ldots\\in L^\\infty\\) num mesmo espaço de probabilidade. Se \\(\\lVert X_n-X\\rVert_\\infty\\to0\\), então \\(X_n\\to X\\) quase certamente."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Para cada \\(n\\), escolha um conjunto nulo \\(A_n\\) tal que\n\\[|X_n-X|\\le\\lVert X_n-X\\rVert_\\infty\\quad\\text{fora de }A_n.\\]\nA estimativa tende para zero, mas o conjunto excecional depende de \\(n\\)."
        }
      ],
      "explanation": "Uma única união numerável remove todos os conjuntos excecionais simultaneamente. Fora dela, \\(|X_n-X|\\le\\lVert X_n-X\\rVert_\\infty\\) para todo o \\(n\\), e o segundo membro tende para zero. Ter probabilidade zero não é o mesmo que ser vazio.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "convergência-em-linfty"
        }
      ]
    },
    {
      "id": "lec04-020",
      "type": "multiple-select",
      "topic": "Definições e implicações",
      "difficulty": "core",
      "prompt": "Em \\([0,1]\\), com probabilidade uniforme e os conjuntos de Borel, defina \\(X_n(u)=n\\) se \\(u=\\frac1n\\) e \\(X_n(u)=0\\) caso contrário. Que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "as",
        "prob",
        "dist",
        "l1",
        "l2",
        "linf"
      ],
      "acceptedAnswers": [
        "as,dist,l1,l2,linf,prob"
      ],
      "correctAnswer": "as,dist,l1,l2,linf,prob",
      "explanation": "Cada conjunto singular \\(\\{1/n\\}\\) tem probabilidade zero, pelo que \\(X_n=0\\) quase certamente para cada \\(n\\) e todas as normas do erro, incluindo o supremo essencial, são zero. Cada \\(u\\) fixo é excecional para, no máximo, um \\(n\\), logo há até convergência pontual em toda a parte. O supremo usual é \\(n\\), mas \\(L^\\infty\\) usa o supremo essencial.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 117,
          "anchor": "convergência-quase-certa"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 120,
          "anchor": "o-espaço-linftymathbb-p"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "convergência-em-linfty"
        }
      ]
    },
    {
      "id": "lec04-021",
      "type": "numeric-input",
      "topic": "Limites de Markov",
      "difficulty": "intro",
      "prompt": "Um tempo de espera \\(W\\) não negativo tem \\(\\mathbb E[W]=3\\) minutos. Que limite superior dá Markov para \\(\\mathbb P(W\\ge12\\text{ minutos})\\)? Introduza o limite como probabilidade.",
      "acceptedAnswers": [
        "0.25",
        "1/4",
        "25%"
      ],
      "correctAnswer": "0.25",
      "explanation": "Markov dá \\(\\mathbb P(W\\ge12)\\le\\frac{\\mathbb E[W]}{12}=\\frac3{12}=\\frac14\\). É um limite superior garantido, não uma afirmação de que a probabilidade é exatamente \\(\\frac14\\). Não se supõe nenhum modelo exponencial para a espera.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "desigualdade-de-markov"
        }
      ],
      "answerDisplay": "\\(0{,}25\\)"
    },
    {
      "id": "lec04-022",
      "type": "numeric-input",
      "topic": "Limites para desvios",
      "difficulty": "core",
      "prompt": "Uma medição \\(X\\) tem \\(\\mathbb E[X]=100\\) e \\(\\operatorname{Var}(X)=4\\). Aplique Markov a \\(Z=(X-100)^2\\) para limitar \\(\\mathbb P(|X-100|\\ge6)\\). Que limite obtém? Dê uma fração exata.",
      "acceptedAnswers": [
        "1/9"
      ],
      "correctAnswer": "1/9",
      "explanation": "O acontecimento é \\(\\{Z\\ge36\\}\\); \\(Z\\ge0\\) e \\(\\mathbb E[Z]=4\\). Markov dá \\(\\frac4{36}=\\frac19\\). Esta aplicação ao quadrado de um erro centrado é a desigualdade de Chebyshev. Usa apenas a média e variância finitas indicadas, não um modelo normal.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "desigualdade-de-markov"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 125,
          "anchor": "desigualdade-de-chebyshev"
        }
      ],
      "answerDisplay": "\\(\\frac{1}{9}\\)"
    },
    {
      "id": "lec04-023",
      "type": "find-the-intruder",
      "topic": "Limites de Markov",
      "difficulty": "core",
      "prompt": "Seja \\(Z\\ge0\\) integrável e seja \\(X\\) uma variável real com \\(\\mathbb E[X^2]<\\infty\\). Encontre a única afirmação que NÃO é válida em geral.",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(|X|\\ge2)\\le\\frac{\\mathbb E|X|}2\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(|X|\\ge2)\\le\\frac{\\mathbb E[X^2]}4\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(X\\ge2)\\le\\frac{\\mathbb E[X]}2\\), mesmo que \\(X\\) possa ser negativa."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(Z\\ge2)\\le\\frac{\\mathbb E[Z]}2\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Markov exige uma variável não negativa. Para \\(X\\equiv-1\\), a estimativa proposta para \\(X\\) daria \\(0\\le-\\frac12\\), o que é falso. As outras aplicam Markov a \\(Z\\), \\(|X|\\) e \\(X^2\\). Um segundo momento finito garante \\(\\mathbb E|X|<\\infty\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "desigualdade-de-markov"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 126,
          "anchor": "convergência-em-lp-e-em-probabilidade"
        }
      ]
    },
    {
      "id": "lec04-024",
      "type": "proof-step",
      "topic": "Limites de Markov",
      "difficulty": "core",
      "prompt": "Que desigualdade pontual fornece o passo em falta?",
      "options": [
        {
          "id": "a",
          "text": "\\(Z\\le a\\mathbf1_{\\{Z\\ge a\\}}\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbf1_{\\{Z\\ge a\\}}=\\frac Za\\) para todos os resultados."
        },
        {
          "id": "c",
          "text": "\\(a\\mathbf1_{\\{Z\\ge a\\}}\\le-Z\\)."
        },
        {
          "id": "d",
          "text": "\\(a\\mathbf1_{\\{Z\\ge a\\}}\\le Z\\)."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Para uma variável aleatória \\(Z\\) não negativa e integrável e \\(a>0\\),\n\\[\\mathbb P(Z\\ge a)\\le\\frac{\\mathbb E[Z]}{a}.\\]"
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina \\(I=\\mathbf1_{\\{Z\\ge a\\}}\\), pelo que \\(\\mathbb E[I]=\\mathbb P(Z\\ge a)\\). Precisamos de uma comparação pontual cujo valor esperado dê \\(a\\mathbb E[I]\\le\\mathbb E[Z]\\)."
        }
      ],
      "explanation": "Em \\(\\{Z\\ge a\\}\\), o primeiro membro é \\(a\\le Z\\); fora desse acontecimento, é \\(0\\le Z\\). Tomando valores esperados, obtém-se \\(a\\mathbb P(Z\\ge a)\\le\\mathbb E[Z]\\); dividir por \\(a>0\\) completa a desigualdade de Markov.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "desigualdade-de-markov"
        }
      ]
    },
    {
      "id": "lec04-025",
      "type": "numeric-input",
      "topic": "Limites de Markov",
      "difficulty": "core",
      "prompt": "Um pagamento \\(Z\\) não negativo toma apenas os valores 0 e 10 euros e tem \\(\\mathbb E[Z]=2\\) euros. Calcule \\(\\mathbb P(Z\\ge10)\\). Este exemplo testa se o limite de Markov pode ser atingido.",
      "acceptedAnswers": [
        "0.2",
        "1/5",
        "20%"
      ],
      "correctAnswer": "0.2",
      "explanation": "Se \\(q=\\mathbb P(Z=10)\\), então \\(\\mathbb E[Z]=10q=2\\), logo \\(q=\\frac15\\). O acontecimento \\(Z\\ge10\\) é exatamente \\(Z=10\\). Markov também dá \\(\\frac{\\mathbb E[Z]}{10}=\\frac15\\), pelo que se atinge a igualdade. Substituir \\(\\ge\\) por \\(>\\) mudaria o acontecimento: \\(\\mathbb P(Z>10)=0\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "desigualdade-de-markov"
        }
      ],
      "answerDisplay": "\\(0{,}2\\)"
    },
    {
      "id": "lec04-026",
      "type": "numeric-input",
      "topic": "Limites para desvios",
      "difficulty": "core",
      "prompt": "Um erro \\(E_n\\) satisfaz \\(\\mathbb E[E_n^2]\\le\\frac9n\\) para todo o inteiro positivo \\(n\\). Usando Markov em \\(E_n^2\\), qual é o menor inteiro \\(n\\) para o qual esta estimativa garante \\(\\mathbb P(|E_n|\\ge0{,}3)\\le0{,}01\\)?",
      "integerAnswer": true,
      "acceptedAnswers": [
        "10000"
      ],
      "correctAnswer": "10000",
      "explanation": "Markov dá \\(\\mathbb P(|E_n|\\ge0{,}3)\\le\\frac{9/n}{0{,}3^2}=\\frac{100}n\\). Exigir \\(\\frac{100}n\\le0{,}01\\) dá \\(n\\ge10000\\). Este é o menor \\(n\\) certificado por esta estimativa, não necessariamente o menor \\(n\\) para a verdadeira distribuição desconhecida do erro.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "desigualdade-de-markov"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 126,
          "anchor": "convergência-em-lp-e-em-probabilidade"
        }
      ],
      "answerDisplay": "\\(10000\\)"
    },
    {
      "id": "lec04-027",
      "type": "proof-step",
      "topic": "Convergência em momentos",
      "difficulty": "challenge",
      "prompt": "Que estimativa completa a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(|X_n-X|>\\varepsilon)\\ge\\frac{\\mathbb E|X_n-X|^p}{\\varepsilon^p}\\), o que prova o resultado."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(X_n=X)\\ge1-\\mathbb E|X_n-X|^p\\), logo a igualdade exata acaba por ser certa."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(|X_n-X|>\\varepsilon)\\le\\frac{\\mathbb E|X_n-X|^p}{\\varepsilon^p}\\to0\\)."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(|X_n-X|>\\varepsilon)=\\mathbb E|X_n-X|^p\\) para todo o \\(\\varepsilon\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam \\(1\\le p<\\infty\\) e \\(X,X_1,X_2,\\ldots\\in L^p\\) num mesmo espaço de probabilidade. Se \\(\\mathbb E|X_n-X|^p\\to0\\), então \\(X_n\\to X\\) em probabilidade."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe \\(\\varepsilon>0\\) e defina \\(Z_n=|X_n-X|^p\\). Esta variável é não negativa e integrável. Aplique a desigualdade de Markov com limiar \\(\\varepsilon^p>0\\)."
        }
      ],
      "explanation": "O acontecimento \\(\\{|X_n-X|>\\varepsilon\\}\\) está contido em \\(\\{Z_n\\ge\\varepsilon^p\\}\\). Markov fornece o limite superior. Para cada \\(\\varepsilon>0\\) fixo, o denominador é positivo e constante, enquanto o numerador tende para zero. Não é necessária independência.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 126,
          "anchor": "convergência-em-lp-e-em-probabilidade"
        }
      ]
    },
    {
      "id": "lec04-028",
      "type": "multiple-choice",
      "topic": "Definições e implicações",
      "difficulty": "intro",
      "prompt": "Um estudante verifica apenas que \\(\\mathbb P(|X_n|>1)\\to0\\) e conclui \\(X_n\\to0\\) em probabilidade. Que sucessão determinística refuta esse raciocínio?",
      "options": [
        {
          "id": "a",
          "text": "\\(X_n\\equiv0\\) para todo o \\(n\\)."
        },
        {
          "id": "b",
          "text": "\\(X_n=\\frac1n\\)."
        },
        {
          "id": "c",
          "text": "\\(X_n=-\\frac1n\\)."
        },
        {
          "id": "d",
          "text": "\\(X_n\\equiv\\frac12\\) para todo o \\(n\\)."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Para o erro constante \\(\\frac12\\), \\(\\mathbb P(|X_n|>1)=0\\), mas \\(\\mathbb P(|X_n|>\\tfrac14)=1\\) para todo o \\(n\\). A definição exige testar todo o \\(\\varepsilon>0\\) fixo. As outras três sucessões convergem efetivamente para zero.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 122,
          "anchor": "convergência-em-probabilidade"
        }
      ]
    },
    {
      "id": "lec04-029",
      "type": "multiple-choice",
      "topic": "Erros limitados",
      "difficulty": "challenge",
      "prompt": "Seja \\(X_n=\\frac Un\\) com uma única \\(U\\sim\\operatorname{Unif}(0,1)\\). Embora \\(\\mathbb P\\bigl(|X_n|>\\tfrac1{2n}\\bigr)=\\frac12\\) para todo o \\(n\\), converge \\(X_n\\) para 0 em probabilidade?",
      "options": [
        {
          "id": "a",
          "text": "Sim: para cada \\(\\varepsilon>0\\) fixo, acaba por se ter \\(|X_n|\\le\\frac1n<\\varepsilon\\). O limiar apresentado depende de \\(n\\)."
        },
        {
          "id": "b",
          "text": "Não: qualquer sucessão de limiares positivos tem de ter probabilidade de excedência a tender para zero."
        },
        {
          "id": "c",
          "text": "Não: uma probabilidade igual a \\(\\frac12\\) exclui todos os modos de convergência."
        },
        {
          "id": "d",
          "text": "Sim, porque \\(\\mathbb P(X_n=0)=1\\) para \\(n\\) grande."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A definição fixa \\(\\varepsilon\\) antes de fazer \\(n\\to\\infty\\). Uma tolerância que diminui como \\(\\frac1{2n}\\) pode revelar a escala de um erro mesmo quando o próprio erro tende para zero. De facto, \\(\\lVert X_n\\rVert_\\infty=\\frac1n\\to0\\), enquanto \\(\\mathbb P(X_n=0)=0\\) para todos os \\(n\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 122,
          "anchor": "convergência-em-probabilidade"
        }
      ]
    },
    {
      "id": "lec04-030",
      "type": "multiple-select",
      "topic": "Convergência dominada",
      "difficulty": "core",
      "prompt": "Suponha que \\(0\\le X_n\\le1\\) quase certamente para todo o \\(n\\) e que \\(X_n\\to0\\) em probabilidade. Que modos de convergência para 0 TÊM de resultar destas hipóteses?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "prob",
        "dist",
        "l1",
        "l2"
      ],
      "acceptedAnswers": [
        "dist,l1,l2,prob"
      ],
      "correctAnswer": "dist,l1,l2,prob",
      "explanation": "A variável dominante \\(Y\\equiv1\\) pertence a todos os espaços \\(L^p\\) com \\(p\\) finito. O teorema da convergência dominada em \\(L^p\\) dá, portanto, convergência em \\(L^1\\) e \\(L^2\\) a partir da convergência em probabilidade; segue-se também convergência em distribuição. A convergência quase certa não é garantida: a máquina de escrever é um contraexemplo. O seu supremo essencial 1 também refuta uma conclusão garantida em \\(L^\\infty\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "convergência-dominada-em-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "máquina-de-escrever-convergência-em-l_p-sem-convergência-quase-certa"
        }
      ]
    },
    {
      "id": "lec04-031",
      "type": "multiple-choice",
      "topic": "FD e convergência fraca",
      "difficulty": "intro",
      "prompt": "Sejam \\(X_n\\equiv\\frac1n\\) e \\(X\\equiv0\\). As suas FD satisfazem \\(F_n(0)=0\\) e \\(F(0)=1\\). Qual é a conclusão correta?",
      "options": [
        {
          "id": "a",
          "text": "\\(F\\) não é uma FD válida porque tem um salto."
        },
        {
          "id": "b",
          "text": "\\(X_n\\) converge apenas em \\(L^1\\), não em distribuição."
        },
        {
          "id": "c",
          "text": "\\(X_n\\) converge em distribuição para \\(X\\): \\(x=0\\) é uma descontinuidade de \\(F\\), onde não se exige convergência das FD."
        },
        {
          "id": "d",
          "text": "A convergência em distribuição falha porque as FD têm de convergir em todo o \\(x\\) real."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Para \\(x<0\\), ambas as FD são zero. Para cada \\(x>0\\) fixo, acaba por se ter \\(\\frac1n\\le x\\), logo \\(F_n(x)=F(x)=1\\). Estes são todos os pontos de continuidade de \\(F\\). Não se impõe nenhuma condição no seu salto \\(x=0\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 133,
          "anchor": "convergência-em-distribuição-critério-das-fd"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 134,
          "anchor": "um-conjunto-com-fronteira-de-probabilidade-positiva"
        }
      ]
    },
    {
      "id": "lec04-032",
      "type": "multiple-choice",
      "topic": "FD e convergência fraca",
      "difficulty": "core",
      "prompt": "Variáveis aleatórias reais \\(X_n\\) num mesmo espaço de probabilidade convergem em distribuição para a constante 3. Que conclusão adicional é garantida sem hipóteses sobre momentos?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb E|X_n-3|\\to0\\)."
        },
        {
          "id": "b",
          "text": "\\(X_n\\) converge para 3 quase certamente."
        },
        {
          "id": "c",
          "text": "\\(X_n=3\\) quase certamente para todos os \\(n\\) suficientemente grandes."
        },
        {
          "id": "d",
          "text": "\\(X_n\\) converge para 3 em probabilidade."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "A convergência em distribuição para uma constante equivale à convergência em probabilidade. Não tem de dar convergência em \\(L^1\\): \\(3+n\\mathbf1_{\\{U\\le1/n\\}}\\), com uma única \\(U\\sim\\operatorname{Unif}(0,1)\\), converge em distribuição para 3, mas o erro absoluto médio mantém-se igual a 1. A sucessão da máquina de escrever transladada \\(3+T_n\\) refuta uma conclusão garantida de convergência quase certa.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 135,
          "anchor": "convergência-em-probabilidade-e-em-distribuição"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "convergência-quase-certa-sem-convergência-em-l1"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "máquina-de-escrever-convergência-em-l_p-sem-convergência-quase-certa"
        }
      ]
    },
    {
      "id": "lec04-033",
      "type": "find-the-intruder",
      "topic": "FD e convergência fraca",
      "difficulty": "challenge",
      "prompt": "Sejam \\(X_n\\equiv\\frac1n\\) e \\(X\\equiv0\\). Um conjunto de continuidade para a lei de \\(X\\) é um conjunto de Borel \\(A\\) com \\(\\mathbb P(X\\in\\partial A)=0\\), onde \\(\\partial A\\) é a sua fronteira em \\(\\mathbb R\\). Qual NÃO é um conjunto de continuidade?",
      "options": [
        {
          "id": "a",
          "text": "\\(A=\\{0\\}\\)."
        },
        {
          "id": "b",
          "text": "\\(A=(-1,1)\\)."
        },
        {
          "id": "c",
          "text": "\\(A=[2,3]\\)."
        },
        {
          "id": "d",
          "text": "\\(A=(-\\infty,-1]\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A fronteira de \\(\\{0\\}\\) é \\(\\{0\\}\\), com probabilidade limite 1. As probabilidades são \\(\\mathbb P(X_n\\in\\{0\\})=0\\) e \\(\\mathbb P(X\\in\\{0\\})=1\\). As outras fronteiras são \\(\\{-1,1\\}\\), \\(\\{2,3\\}\\) e \\(\\{-1\\}\\); todas têm probabilidade limite zero. Portmanteau garante a convergência das probabilidades dos conjuntos apenas para conjuntos de continuidade.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 132,
          "anchor": "teorema-de-portmanteau"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 134,
          "anchor": "um-conjunto-com-fronteira-de-probabilidade-positiva"
        }
      ]
    },
    {
      "id": "lec04-034",
      "type": "multiple-choice",
      "topic": "Transformações de limites",
      "difficulty": "core",
      "prompt": "Sejam \\(X_n\\equiv\\frac1n\\), \\(X\\equiv0\\) e \\(g(x)=\\mathbf1_{\\{x>0\\}}\\). Então \\(X_n\\to X\\) em todos os modos de convergência estudados. O que acontece após aplicar \\(g\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(g(X_n)\\equiv0\\) porque \\(X_n\\) fica muito pequena."
        },
        {
          "id": "b",
          "text": "\\(g(X_n)\\equiv1\\) não converge em distribuição para \\(g(X)\\equiv0\\); \\(g\\) é descontínua no ponto limite 0."
        },
        {
          "id": "c",
          "text": "\\(g(X_n)\\to g(X)\\) quase certamente porque qualquer aplicação mensurável preserva a convergência."
        },
        {
          "id": "d",
          "text": "\\(g\\) é contínua em 0 porque é limitada."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Cada \\(\\frac1n\\) é estritamente positivo, logo \\(g(X_n)=1\\) para todo o \\(n\\), mas \\(g(0)=0\\). Mensurabilidade e limitação, por si só, não bastam para o teorema da aplicação contínua. Aqui toda a massa limite está numa descontinuidade de \\(g\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 138,
          "anchor": "teorema-da-aplicação-contínua"
        }
      ]
    },
    {
      "id": "lec04-035",
      "type": "multiple-choice",
      "topic": "Transformações de limites",
      "difficulty": "core",
      "prompt": "Suponha que \\(X_n\\) converge em distribuição para \\(X\\sim\\operatorname{Unif}(-1,1)\\). Defina \\(g(x)=\\mathbf1_{\\{x>0\\}}\\). Que conclusão decorre do teorema da aplicação contínua?",
      "options": [
        {
          "id": "a",
          "text": "\\(g(X_n)\\) converge quase certamente para \\(\\frac12\\)."
        },
        {
          "id": "b",
          "text": "\\(g(X_n)\\) converge em probabilidade para \\(g(X)\\) sem quaisquer hipóteses adicionais."
        },
        {
          "id": "c",
          "text": "\\(g(X_n)\\) converge em distribuição para uma variável \\(\\operatorname{Bernoulli}(\\tfrac12)\\), pois \\(\\mathbb P(X=0)=0\\)."
        },
        {
          "id": "d",
          "text": "O teorema é inaplicável sempre que \\(g\\) tem alguma descontinuidade."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "A única descontinuidade de \\(g\\) está em 0 e o limite uniforme atribui probabilidade zero a esse ponto. O teorema dá convergência em distribuição para \\(g(X)\\). Esta indicadora vale 1 com probabilidade \\(\\mathbb P(X>0)=\\frac12\\) e 0 caso contrário. Obtém-se uma lei, não uma conclusão de convergência em probabilidade ou quase certa relativamente a uma construção conjunta.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 138,
          "anchor": "teorema-da-aplicação-contínua"
        }
      ]
    },
    {
      "id": "lec04-036",
      "type": "multiple-choice",
      "topic": "Funções características e limites",
      "difficulty": "core",
      "prompt": "Variáveis aleatórias reais \\(X_n\\) têm funções características \\(\\varphi_n(t)=\\exp\\!\\left(-\\frac{t^2}{2n}\\right)\\) para todo o \\(t\\) real. Que limite em distribuição é identificado pelo teorema de Lévy? Uma função característica é \\(\\mathbb E[e^{itX}]\\), com \\(i^2=-1\\).",
      "options": [
        {
          "id": "a",
          "text": "A constante 1, cuja função característica é identicamente 1."
        },
        {
          "id": "b",
          "text": "\\(\\mathcal N(0,1)\\), cuja função característica é \\(e^{-t^2/2}\\)."
        },
        {
          "id": "c",
          "text": "Nenhum limite, porque as variáveis podem estar em espaços de probabilidade diferentes."
        },
        {
          "id": "d",
          "text": "A constante 0, cuja função característica é identicamente 1."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Para cada \\(t\\) real fixo, \\(\\varphi_n(t)\\to1\\). A função \\(\\varphi(t)=1\\) é contínua em 0 e é igual a \\(\\mathbb E[e^{it\\cdot0}]\\). O teorema de Lévy dá, portanto, convergência em distribuição para 0. A constante 1 tem, em vez disso, função característica \\(e^{it}\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 137,
          "anchor": "teorema-de-continuidade-de-lévy"
        }
      ]
    },
    {
      "id": "lec04-037",
      "type": "multiple-choice",
      "topic": "Funções características e limites",
      "difficulty": "challenge",
      "prompt": "Seja \\(X_n\\sim\\mathcal N(0,n)\\), pelo que \\(\\varphi_n(t)=e^{-nt^2/2}\\). O limite pontual é 1 em \\(t=0\\) e 0 em todo o \\(t\\ne0\\). O que se pode concluir sobre um limite em distribuição em \\(\\mathbb R\\)?",
      "options": [
        {
          "id": "a",
          "text": "Não existe limite que seja uma distribuição de probabilidade em \\(\\mathbb R\\): o limite pontual é descontínuo em 0 e não pode ser uma função característica."
        },
        {
          "id": "b",
          "text": "O limite é a constante 0 porque \\(\\varphi_n(t)\\to0\\) para \\(t\\ne0\\)."
        },
        {
          "id": "c",
          "text": "O limite é uma distribuição de probabilidade uniforme em toda a reta \\(\\mathbb R\\)."
        },
        {
          "id": "d",
          "text": "Um limite pontual define sempre uma função característica, independentemente da continuidade."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Todas as funções características são contínuas em 0. Se existisse um limite em distribuição, a recíproca do teorema de Lévy obrigaria a sua função característica a coincidir com este limite pontual, o que é impossível. Notar apenas que falha uma hipótese suficiente não provaria a não convergência; é a recíproca que dá a contradição.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 137,
          "anchor": "teorema-de-continuidade-de-lévy"
        }
      ]
    },
    {
      "id": "lec04-038",
      "type": "proof-step",
      "topic": "Convergência dominada",
      "difficulty": "challenge",
      "prompt": "Que majorante integrável permite concluir a demonstração por convergência dominada?",
      "options": [
        {
          "id": "a",
          "text": "A convergência quase certa, por si só, garante a convergência de todos os momentos."
        },
        {
          "id": "b",
          "text": "\\(|X_n-X|^p\\le(2Y)^p\\) e \\(\\mathbb E[(2Y)^p]=2^p\\mathbb E[Y^p]<\\infty\\)."
        },
        {
          "id": "c",
          "text": "\\(|X_n-X|^p\\le Y\\) sempre, sem restrições sobre \\(p\\) ou \\(Y\\)."
        },
        {
          "id": "d",
          "text": "Use o majorante \\(n^p\\); um majorante que depende de \\(n\\) é automaticamente suficiente."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "context": [
        {
          "label": "Teorema",
          "text": "Fixe \\(1\\le p<\\infty\\). Suponha que \\(X_n\\to X\\) quase certamente e que \\(|X_n|\\le Y\\) quase certamente para todo o \\(n\\), com \\(Y\\ge0\\) e \\(\\mathbb E[Y^p]<\\infty\\). Então \\(X\\in L^p\\) e \\(X_n\\to X\\) em \\(L^p\\)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fora de um único conjunto nulo, valem todas as estimativas e a convergência pontual. Passando ao limite, obtém-se \\(|X|\\le Y\\), logo \\(X\\in L^p\\). Além disso, \\(|X_n-X|^p\\to0\\) quase certamente. Para passar aos valores esperados falta um majorante integrável comum."
        }
      ],
      "explanation": "A desigualdade triangular dá \\(|X_n-X|\\le|X_n|+|X|\\le2Y\\) quase certamente. Elevando a \\(p\\) obtém-se um único majorante integrável, independente de \\(n\\). A convergência dominada dá \\(\\mathbb E|X_n-X|^p\\to0\\). Usar a mesma \\(Y\\) para todo o \\(n\\) é essencial neste argumento.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "convergência-dominada-em-lp"
        }
      ]
    },
    {
      "id": "lec04-039",
      "type": "find-the-intruder",
      "topic": "Definições e implicações",
      "difficulty": "intro",
      "prompt": "Para variáveis aleatórias reais num espaço de probabilidade, encontre a implicação que NÃO é válida em geral. Cada afirmação de convergência em norma pressupõe pertença ao respetivo espaço.",
      "options": [
        {
          "id": "a",
          "text": "Convergência quase certa implica convergência em probabilidade."
        },
        {
          "id": "b",
          "text": "Convergência em probabilidade implica convergência em distribuição."
        },
        {
          "id": "c",
          "text": "Convergência em \\(L^1\\) implica convergência quase certa."
        },
        {
          "id": "d",
          "text": "Convergência em \\(L^2\\) implica convergência em \\(L^1\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "A sucessão da máquina de escrever converge em \\(L^1\\) para 0, mas não converge quase certamente. As outras implicações são válidas num espaço de probabilidade. Em particular, \\(\\lVert V\\rVert_1\\le\\lVert V\\rVert_2\\) para \\(V\\in L^2\\) dá a comparação de normas.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "máquina-de-escrever-convergência-em-l_p-sem-convergência-quase-certa"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "relações-de-implicação"
        }
      ]
    },
    {
      "id": "lec04-040",
      "type": "multiple-select",
      "topic": "Sucessão da máquina de escrever",
      "difficulty": "challenge",
      "prompt": "No mesmo espaço uniforme \\([0,1)\\), acrescente à máquina de escrever um pico de suporte decrescente: \\(X_n(u)=T_n(u)+n\\mathbf1_{\\{0<u\\le1/n^2\\}}\\). Que modos de convergência para 0 se verificam?",
      "options": [
        {
          "id": "as",
          "text": "Quase certamente"
        },
        {
          "id": "prob",
          "text": "Em probabilidade"
        },
        {
          "id": "dist",
          "text": "Em distribuição"
        },
        {
          "id": "l1",
          "text": "Em \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "Em \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "Em \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "prob",
        "dist",
        "l1"
      ],
      "acceptedAnswers": [
        "dist,l1,prob"
      ],
      "correctAnswer": "dist,l1,prob",
      "context": [
        {
          "label": "Construção",
          "text": "Em \\([0,1)\\), com probabilidade uniforme, defina\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nonde \\(m\\ge0\\) e \\(k\\in\\{0,\\ldots,2^m-1\\}\\) são inteiros. Percorra cada linha \\(m\\) da esquerda para a direita em \\(k\\) e avance depois para a linha seguinte."
        }
      ],
      "explanation": "Para \\(n=2^m+k\\), a não negatividade dá \\(\\mathbb E|X_n|=2^{-m}+\\frac1n\\to0\\), logo há convergência em \\(L^1\\), probabilidade e distribuição. Mas \\(\\mathbb E[X_n^2]\\ge n^2\\frac1{n^2}=1\\) e \\(\\lVert X_n\\rVert_\\infty\\ge n\\), pelo que não há convergência em \\(L^2\\) nem em \\(L^\\infty\\). Para cada \\(u>0\\) o pico acaba por desaparecer; os valores restantes da máquina de escrever continuam a alternar entre 0 e 1 infinitas vezes. Falha a convergência quase certa.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "máquina-de-escrever-convergência-em-l_p-sem-convergência-quase-certa"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "convergência-quase-certa-sem-convergência-em-l1"
        }
      ]
    }
  ]
};
