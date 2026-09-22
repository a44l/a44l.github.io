window.LECTURE_3_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "pt-PT",
  "block": {
    "id": "lecture-3",
    "title": "Aula 3",
    "description": "Slides 72–114: valor esperado, covariância, distribuições usuais, funções geradoras de momentos e funções características",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../../pt/index.html#/valor-esperado-famílias-usuais-e-transformadas",
    "featuredTopics": [
      "Valor esperado e momentos",
      "Variância e covariância",
      "Contagens aleatórias",
      "Tempos de espera",
      "Modelo normal",
      "Transformadas"
    ]
  },
  "implementationNotes": {
    "scope": "Lecture 3 only, slides 72–114 of the rendered local deck checked on 2026-09-22. Title counts as slide 1. Lecture 4 starts at 115.",
    "sessionSelection": "Eight unique questions from this bank only: 2 intro, 4 core, 2 challenge; at most 4 numeric and 2 per topic.",
    "separation": "Independent of Lecture 1, Lecture 2 and the full-review bank. Progress key: statistical-inference-2026-practice-lecture-3. English and Portuguese share this bank key.",
    "proofQuestions": "Full assumptions, theorem and preceding proof steps in the context array. No unstated independence or moment assumptions.",
    "diagrams": "Local, accessible SVG from each visual object. All essential data also occur in ordinary question text. No external assets or chart libraries.",
    "conventions": "Exponential parameters are rates; Gamma parameters are shape and scale. Numerical time units are explicit. Finite-sample standardization is distinguished from limiting normality.",
    "translations": "English and European Portuguese have identical IDs, answer keys, numeric values, types and difficulties. Diagram text and source links are localized.",
    "sourceLinks": "Stable slide anchors in each language; numeric slide labels and deck hash describe this authoring snapshot. Recheck after slide insertions."
  },
  "sourceCatalog": {
    "lecture-3-slides": {
      "title": "Inferência Estatística 2026 — Semanas 1–2, Aula 3",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../../pt/index.html",
      "slideRange": [
        72,
        114
      ],
      "deckSha256": "0d043898a3646fe1c2186c0172a56985b9d28f4aa9ea3375eb9bf7951e0d75d4",
      "sourceFile": "slides-2026-weeks-1-2/pt/index.qmd",
      "renderedSourceFile": "slides/si-2026/weeks-1-2/pt/index.html",
      "checkedOn": "2026-09-22"
    }
  },
  "exercises": [
    {
      "id": "lec03-001",
      "type": "multiple-choice",
      "topic": "Valor esperado",
      "difficulty": "intro",
      "prompt": "Qual é a condição que define a integrabilidade de uma variável aleatória real X?",
      "options": [
        {
          "id": "a",
          "text": "E(|X|)<∞."
        },
        {
          "id": "b",
          "text": "E(X²)<∞ é exigido pela definição."
        },
        {
          "id": "c",
          "text": "X toma apenas um número finito de valores."
        },
        {
          "id": "d",
          "text": "P(X≥0)=1."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A integrabilidade significa E(|X|)<∞. Assim, as partes positiva e negativa têm integrais finitos e E(X) é um número real finito. Ter segundo momento finito ou tomar apenas um número finito de valores é suficiente, mas nenhuma destas condições é necessária. Uma variável não negativa pode ter valor esperado infinito.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 73,
          "anchor": "valor-esperado"
        }
      ]
    },
    {
      "id": "lec03-002",
      "type": "numeric-input",
      "topic": "Valor esperado",
      "difficulty": "intro",
      "prompt": "Uma entrega de um café contém X bebidas, com P(X=0)=1/4, P(X=1)=1/2 e P(X=2)=1/4. A conta é C=1+3X euros, incluindo uma taxa fixa de entrega de 1 € mesmo quando X=0. Qual é E(C), em euros?",
      "acceptedAnswers": [
        "4"
      ],
      "correctAnswer": "4",
      "explanation": "E(X)=0·(1/4)+1·(1/2)+2·(1/4)=1. Pela linearidade, E(C)=1+3E(X)=4 euros. A taxa fixa contribui exatamente com 1 € para todas as contas e, por isso, também para o seu valor esperado.",
      "visual": {
        "kind": "bars",
        "labels": [
          "0",
          "1",
          "2"
        ],
        "values": [
          0.25,
          0.5,
          0.25
        ],
        "xLabel": "Número de bebidas X",
        "yLabel": "Probabilidade",
        "title": "Quantas bebidas?",
        "description": "As barras em X=0, 1 e 2 têm probabilidades 1/4, 1/2 e 1/4.",
        "caption": "A conta é de 1 € mais 3 € por bebida; as mesmas probabilidades aplicam-se às contas correspondentes."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 74,
          "anchor": "valor-esperado-de-funções-de-uma-variável-aleatória"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 75,
          "anchor": "propriedades-do-valor-esperado"
        }
      ]
    },
    {
      "id": "lec03-003",
      "type": "numeric-input",
      "topic": "Momentos e espaços Lp",
      "difficulty": "core",
      "prompt": "O erro com sinal X de um sensor toma os valores −1, 0 e 2, com probabilidades 1/4, 1/2 e 1/4, respetivamente. O erro quadrático é X². Qual é o segundo momento E(X²)?",
      "acceptedAnswers": [
        "1.25",
        "5/4"
      ],
      "correctAnswer": "1.25",
      "explanation": "Aplique a fórmula do valor esperado a g(x)=x²: E(X²)=1·(1/4)+0·(1/2)+4·(1/4)=5/4. Este é o segundo momento, não a variância: para obter a variância, subtrai-se ainda (E(X))². Elevar a média ao quadrado também daria uma quantidade diferente.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 74,
          "anchor": "valor-esperado-de-funções-de-uma-variável-aleatória"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 76,
          "anchor": "momentos-e-espaços-lp"
        }
      ]
    },
    {
      "id": "lec03-004",
      "type": "multiple-choice",
      "topic": "Linearidade",
      "difficulty": "intro",
      "prompt": "Dois eventos ao ar livre podem ser cancelados no mesmo dia de chuva. Sejam A e B os acontecimentos de cancelamento, com P(A)=1/4 e P(B)=1/2. Defina N=1_A+1_B, onde 1_A vale 1 em A e 0 fora de A, e analogamente para 1_B. Assim, N conta os cancelamentos. Não se supõe independência. Qual é E(N)?",
      "options": [
        {
          "id": "a",
          "text": "1/8; multiplicam-se as duas probabilidades de cancelamento."
        },
        {
          "id": "b",
          "text": "3/4; o valor esperado é aditivo mesmo sem independência."
        },
        {
          "id": "c",
          "text": "Não é possível determiná-lo sem conhecer P(A∩B)."
        },
        {
          "id": "d",
          "text": "1; cada indicadora tem valor esperado 1."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "As indicadoras são limitadas, logo integráveis, e E(1_A)=P(A). Pela linearidade, E(N)=P(A)+P(B)=3/4, independentemente da dependência entre os acontecimentos. Conhecer P(A∩B) seria relevante para a probabilidade de dois cancelamentos, mas não para o número esperado de cancelamentos.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 75,
          "anchor": "propriedades-do-valor-esperado"
        }
      ]
    },
    {
      "id": "lec03-005",
      "type": "proof-step",
      "topic": "Momentos e espaços Lp",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Se X é uma variável aleatória real com E(|X|⁴)<∞, então E(X²)<∞ e (E(X²))^(1/2)≤(E(|X|⁴))^(1/4). Esta é a comparação das normas L² e L⁴ num espaço de probabilidade."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina Z=|X|⁴. Então Z≥0 e E(Z)<∞. A função g(t)=√t é côncava em [0,∞) e g(Z)=X². A desigualdade de Jensen para uma função côncava afirma que E(g(Z))≤g(E(Z))."
        }
      ],
      "prompt": "Que desigualdade resulta de Jensen e permite obter o teorema tomando raízes quadradas?",
      "options": [
        {
          "id": "a",
          "text": "E(X²)≥(E(|X|⁴))^(1/2)."
        },
        {
          "id": "b",
          "text": "E(X²)≤(E(|X|⁴))²."
        },
        {
          "id": "c",
          "text": "E(X²)≤(E(|X|⁴))^(1/2)<∞."
        },
        {
          "id": "d",
          "text": "E(X²)=(E(|X|⁴))^(1/2) para qualquer X nestas condições."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Substitua g(Z)=X² e g(E(Z))=√E(|X|⁴) na versão de Jensen para funções côncavas. O segundo membro finito prova que E(X²)<∞. Tomando raízes quadradas, obtém-se (E(X²))^(1/2)≤(E(|X|⁴))^(1/4); a igualdade não é automática.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 77,
          "anchor": "comparação-de-normas-lp"
        }
      ]
    },
    {
      "id": "lec03-006",
      "type": "multiple-choice",
      "topic": "Variância",
      "difficulty": "intro",
      "prompt": "Um instrumento de medição apresenta Y=3X+7 em vez de X. Suponha que E(X²)<∞. Que expressão dá a variância das novas leituras?",
      "options": [
        {
          "id": "a",
          "text": "V(Y)=3V(X)+7."
        },
        {
          "id": "b",
          "text": "V(Y)=9V(X)+49."
        },
        {
          "id": "c",
          "text": "V(Y)=3V(X)."
        },
        {
          "id": "d",
          "text": "V(Y)=9V(X)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Somar 7 altera a média, mas não os desvios em relação à média. Multiplicar por 3 multiplica cada desvio centrado por 3 e o seu quadrado por 9. Logo, V(3X+7)=3²V(X).",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 78,
          "anchor": "variância"
        }
      ]
    },
    {
      "id": "lec03-007",
      "type": "proof-step",
      "topic": "Variância",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Para uma variável aleatória real X com E(X²)<∞, a variância V(X)=E((X−E(X))²) satisfaz V(X)=E(X²)−(E(X))²."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Escreva m=E(X), que é finito porque X tem segundo momento finito. Desenvolvendo o quadrado, obtém-se (X−m)²=X²−2mX+m². Todos os termos são integráveis, pelo que a linearidade dá V(X)=E(X²)−2mE(X)+E(m²)."
        }
      ],
      "prompt": "Que substituição completa o cálculo?",
      "options": [
        {
          "id": "a",
          "text": "E(X)=m e E(m²)=m², pelo que V(X)=E(X²)−m²."
        },
        {
          "id": "b",
          "text": "E(X)=m e E(m²)=0, pelo que V(X)=E(X²)−2m²."
        },
        {
          "id": "c",
          "text": "E(X²)=m² para qualquer X, pelo que V(X)=0."
        },
        {
          "id": "d",
          "text": "E(X)=0 para qualquer X integrável, pelo que V(X)=E(X²)."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A média m é um número real fixo, não outra observação aleatória. O quadrado dessa constante tem valor esperado E(m²)=m². Assim, −2mE(X)+E(m²)=−2m²+m²=−m². Não é necessário supor que X é centrada ou independente de outra variável.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 78,
          "anchor": "variância"
        }
      ]
    },
    {
      "id": "lec03-008",
      "type": "numeric-input",
      "topic": "Covariância",
      "difficulty": "core",
      "prompt": "As leituras conjuntas (X,Y) de dois sensores são (0,0), (0,1), (2,1) ou (2,2), cada par com probabilidade 1/4. Calcule Cov(X,Y)=E(XY)−E(X)E(Y).",
      "acceptedAnswers": [
        "0.5",
        "1/2"
      ],
      "correctAnswer": "0.5",
      "explanation": "E(X)=1 e E(Y)=1, enquanto E(XY)=(0+0+2+4)/4=3/2. Logo, Cov(X,Y)=3/2−1·1=1/2. Equivalentemente, os quatro produtos das leituras centradas são 1, 0, 0 e 1, cuja média é 1/2.",
      "visual": {
        "kind": "points",
        "points": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            2,
            1
          ],
          [
            2,
            2
          ]
        ],
        "xLabel": "Leitura X",
        "yLabel": "Leitura Y",
        "title": "Pares de leituras dos sensores",
        "description": "Os quatro pares possíveis são (0,0), (0,1), (2,1) e (2,2), cada um com probabilidade 1/4.",
        "caption": "Cada ponto representa um par equiprovável, não duas observações independentes."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 81,
          "anchor": "covariância"
        }
      ]
    },
    {
      "id": "lec03-009",
      "type": "numeric-input",
      "topic": "Covariância",
      "difficulty": "core",
      "prompt": "Duas medições X e Y têm segundos momentos finitos e Cov(X,Y)=−2. Novos instrumentos apresentam A=3X+7 e B=−2Y+1. Qual é Cov(A,B)?",
      "acceptedAnswers": [
        "12"
      ],
      "correctAnswer": "12",
      "explanation": "Cov(aX+b,cY+d)=ac Cov(X,Y). As constantes adicionadas 7 e 1 não contribuem, pelo que Cov(A,B)=3·(−2)·(−2)=12. Inverter o sinal de uma das medições inverte o sinal da covariância; os dois fatores de escala também alteram o seu valor absoluto.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 81,
          "anchor": "covariância"
        }
      ]
    },
    {
      "id": "lec03-010",
      "type": "multiple-choice",
      "topic": "Independência e covariância",
      "difficulty": "challenge",
      "prompt": "Um desvio com sinal X é igual a −1, 0 ou 1, cada valor com probabilidade 1/3, e Y=X² regista o seu quadrado. Que afirmação descreve corretamente este par? Aqui, «não correlacionadas» significa Cov(X,Y)=0.",
      "options": [
        {
          "id": "a",
          "text": "São independentes e não correlacionadas, porque E(X)=0."
        },
        {
          "id": "b",
          "text": "São não correlacionadas, mas não independentes: Cov(X,Y)=0, enquanto P(X=0,Y=0)=1/3≠1/9=P(X=0)P(Y=0)."
        },
        {
          "id": "c",
          "text": "Não são não correlacionadas: Cov(X,Y)=E(Y)=2/3."
        },
        {
          "id": "d",
          "text": "São independentes, porque Y nunca toma valores negativos."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Por simetria, E(X)=0 e E(XY)=E(X³)=0, pelo que a covariância é zero. Mas Y=0 ocorre exatamente quando X=0, dando probabilidade conjunta 1/3 em vez do produto 1/9. Contribuições de sinais opostos podem cancelar-se na covariância mesmo quando existe uma forte dependência.",
      "visual": {
        "kind": "points",
        "points": [
          [
            -1,
            1
          ],
          [
            0,
            0
          ],
          [
            1,
            1
          ]
        ],
        "xLabel": "Desvio com sinal X",
        "yLabel": "Quadrado Y",
        "title": "Um desvio com sinal e o seu quadrado",
        "description": "Três pontos equiprováveis: (−1,1), (0,0) e (1,1). A segunda coordenada é o quadrado da primeira.",
        "caption": "Cada ponto tem probabilidade 1/3. Desvios com sinais opostos têm o mesmo quadrado."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 88,
          "anchor": "variáveis-não-correlacionadas-mas-dependentes"
        }
      ]
    },
    {
      "id": "lec03-011",
      "type": "numeric-input",
      "topic": "Variância de somas",
      "difficulty": "core",
      "prompt": "Duas etapas de uma entrega demoram tempos aleatórios X e Y, medidos em minutos, com segundos momentos finitos. Suponha que V(X)=4, V(Y)=9 e Cov(X,Y)=1, todos em minutos ao quadrado. Qual é V(X+Y), em minutos ao quadrado? Não suponha independência.",
      "acceptedAnswers": [
        "15"
      ],
      "correctAnswer": "15",
      "explanation": "Para duas variáveis com segundos momentos finitos, V(X+Y)=V(X)+V(Y)+2Cov(X,Y). Portanto, a resposta é 4+9+2·1=15. Somar apenas 4+9 omitiria o termo de covariância positiva e subestimaria a variabilidade do tempo total de entrega.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 84,
          "anchor": "variância-de-uma-soma"
        }
      ]
    },
    {
      "id": "lec03-012",
      "type": "proof-step",
      "topic": "Independência e covariância",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam X e Y variáveis com segundos momentos finitos. São independentes se e só se Cov(f(X),g(Y))=0 para qualquer par de funções limitadas e Borel-mensuráveis f,g:ℝ→ℝ. Para um conjunto de Borel A, 1_A(x) vale 1 se x∈A e 0 caso contrário."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Na implicação direta, funções mensuráveis de variáveis independentes são independentes. Como são limitadas, são integráveis, pelo que E(f(X)g(Y))=E(f(X))E(g(Y)), dando covariância nula. Para a implicação recíproca, suponha que todas as covariâncias indicadas se anulam. Fixe conjuntos de Borel arbitrários A,B⊆ℝ. A independência resultará se P(X∈A,Y∈B)=P(X∈A)P(Y∈B) para todos estes A,B."
        }
      ],
      "prompt": "Que escolha admissível de f e g transforma a hipótese sobre a covariância exatamente na identidade de probabilidades pretendida?",
      "options": [
        {
          "id": "a",
          "text": "f(x)=x e g(y)=y; a anulação desta única covariância prova a independência."
        },
        {
          "id": "b",
          "text": "f(x)=0 e g(y)=0; a identidade 0=0 prova todas as fatorizações de probabilidades."
        },
        {
          "id": "c",
          "text": "f(x)=1_A(x) e g(y)=1_B(y)."
        },
        {
          "id": "d",
          "text": "f(x)=1_A(x) e g(y)=1; esta escolha compara os dois acontecimentos A e B."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "As indicadoras de conjuntos de Borel são limitadas e Borel-mensuráveis. O seu produto é a indicadora de {X∈A,Y∈B}, pelo que a covariância nula dá 0=P(X∈A,Y∈B)−P(X∈A)P(Y∈B). Como A e B são arbitrários, isto é a independência. As funções identidade não são limitadas e, de qualquer modo, uma única covariância nula não bastaria.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 86,
          "anchor": "não-correlação-e-independência"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 87,
          "anchor": "demonstração-da-comparação"
        }
      ]
    },
    {
      "id": "lec03-013",
      "type": "numeric-input",
      "topic": "Fórmulas de cauda",
      "difficulty": "core",
      "prompt": "Uma biblioteca tem, no máximo, três livros reservados para levantar hoje. Seja X o número de livros prontos para levantamento, de modo que X∈{0,1,2,3}. A bibliotecária informa que P(X≥1)=0,8, P(X≥2)=0,5 e P(X≥3)=0,2. Use a fórmula da soma das caudas para determinar E(X).",
      "acceptedAnswers": [
        "1.5",
        "3/2"
      ],
      "correctAnswer": "1.5",
      "explanation": "Para uma variável com valores inteiros não negativos, E(X)=Σₖ₌₁^∞P(X≥k). Aqui, os termos com k>3 são nulos, pelo que E(X)=0,8+0,5+0,2=1,5. Cada livro adicional pronto acrescenta uma unidade à contagem; somar as probabilidades de atingir cada nível dá a média.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 90,
          "anchor": "fórmulas-de-cauda-para-a-média"
        }
      ]
    },
    {
      "id": "lec03-014",
      "type": "proof-step",
      "topic": "Valor esperado e quantis",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja X uma variável aleatória real integrável com função de distribuição F(x)=P(X≤x). Defina a sua função quantil Q(u)=inf{x∈ℝ:F(x)≥u} para 0<u<1. Então E(X)=∫₀¹Q(u) du."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Num espaço de probabilidade auxiliar, seja U uniforme em (0,1), com densidade 1 nesse intervalo e 0 fora dele. A propriedade dos quantis Q(u)≤x ⇔ u≤F(x) dá P(Q(U)≤x)=P(U≤F(x))=F(x). Logo, Q(U) e X têm a mesma distribuição e E(|Q(U)|)=E(|X|)<∞. A função Q é mensurável."
        }
      ],
      "prompt": "Que passo final justifica a integração da função quantil em (0,1)?",
      "options": [
        {
          "id": "a",
          "text": "Ter a mesma distribuição significa Q(U)=X em todos os resultados, sem qualquer construção adicional."
        },
        {
          "id": "b",
          "text": "Qualquer X integrável satisfaz E(X)=∫₀¹F(u) du."
        },
        {
          "id": "c",
          "text": "Q tem de ser derivável, pelo que E(X)=∫₀¹Q′(u) du."
        },
        {
          "id": "d",
          "text": "LOTUS aplicado a U dá E(X)=E(Q(U))=∫₀¹Q(u)·1 du."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "A fórmula LOTUS calcula E(Q(U)) integrando Q relativamente à distribuição de U. A densidade de U é 1 em (0,1). A verificação anterior da integrabilidade permite o integral com sinal, e distribuições iguais dão valores esperados iguais. Não é necessário que X tenha densidade nem que Q seja derivável.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 92,
          "anchor": "valor-esperado-como-integral-de-quantis"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 74,
          "anchor": "valor-esperado-de-funções-de-uma-variável-aleatória"
        }
      ]
    },
    {
      "id": "lec03-015",
      "type": "multiple-choice",
      "topic": "Binomial e Bernoulli",
      "difficulty": "intro",
      "prompt": "Um sensor indica ‘alarme’ ou ‘sem alarme’. A probabilidade de alarme numa leitura é 0,08. Define-se X=1 quando há alarme e X=0 caso contrário. Qual é a distribuição de X?",
      "options": [
        {
          "id": "a",
          "text": "Bernoulli(0,08), equivalentemente B(1; 0,08)"
        },
        {
          "id": "b",
          "text": "Bernoulli(0,92)"
        },
        {
          "id": "c",
          "text": "Poisson(0,08)"
        },
        {
          "id": "d",
          "text": "B(8; 0,01)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma variável Bernoulli(p) vale 1 com probabilidade p e 0 com probabilidade 1−p. Aqui, p=0,08. Não é necessária uma hipótese de independência para esta única leitura. A distribuição Poisson(0,08) permite contagens superiores a 1, mas X só pode valer 0 ou 1.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 93,
          "anchor": "a-distribuição-binomial"
        }
      ]
    },
    {
      "id": "lec03-016",
      "type": "numeric-input",
      "topic": "Binomial e Bernoulli",
      "difficulty": "core",
      "prompt": "Quatro visitantes compram, independentemente, um postal num museu, cada um com probabilidade 1/4. Seja X o número de compradores. Qual é P(X=2)? Dê uma fração exata ou um número decimal.",
      "acceptedAnswers": [
        "27/128",
        "0.2109375"
      ],
      "correctAnswer": "27/128",
      "explanation": "Temos X∼B(4; 1/4). Há 4 escolher 2 = 6 pares possíveis de compradores. Cada par tem probabilidade (1/4)²(3/4)², logo P(X=2)=6·(1/16)·(9/16)=27/128. A independência e a mesma probabilidade de compra para os quatro visitantes justificam o modelo binomial.",
      "visual": {
        "kind": "trials",
        "count": 4,
        "p": 0.25,
        "labelSuccess": "Compra um postal",
        "labelFailure": "Não compra",
        "title": "Quatro decisões independentes",
        "description": "Quatro ensaios, cada um com probabilidade de compra igual a um quarto. Não foram observados resultados.",
        "caption": "Os símbolos representam visitantes, não compras observadas. Cada visitante tem probabilidade de compra 1/4."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 93,
          "anchor": "a-distribuição-binomial"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 94,
          "anchor": "contagem-dos-resultados-de-bernoulli"
        }
      ]
    },
    {
      "id": "lec03-017",
      "type": "proof-step",
      "topic": "Binomial e Bernoulli",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja n≥1 um inteiro e sejam X₁,…,Xₙ variáveis Bernoulli(p) independentes, com 0<p<1. Para S=X₁+⋯+Xₙ e k∈{0,…,n}, P(S=k)=(n escolher k)pᵏ(1−p)ⁿ⁻ᵏ. Aqui, (n escolher k)=n!/[k!(n−k)!], com 0!=1."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Para cada subconjunto A⊆{1,…,n} com exatamente k elementos, seja E_A o acontecimento em que Xⱼ=1 precisamente nas posições j∈A. Pela independência, P(E_A)=pᵏ(1−p)ⁿ⁻ᵏ. Subconjuntos distintos dão acontecimentos disjuntos, e a sua união é {S=k}."
        }
      ],
      "prompt": "Qual dos passos seguintes completa corretamente a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "Há n subconjuntos A, pelo que P(S=k)=npᵏ(1−p)ⁿ⁻ᵏ."
        },
        {
          "id": "b",
          "text": "Os acontecimentos E_A são independentes, pelo que se devem multiplicar as suas probabilidades."
        },
        {
          "id": "c",
          "text": "Há (n escolher k) subconjuntos A; somam-se as suas probabilidades iguais para obter a fórmula enunciada."
        },
        {
          "id": "d",
          "text": "As 2ⁿ sequências de resultados têm a mesma probabilidade para qualquer p, pelo que P(S=k)=(n escolher k)/2ⁿ."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Escolher as k posições ocupadas por uns dá exatamente (n escolher k) subconjuntos. Aplica-se a aditividade porque os acontecimentos correspondentes são disjuntos. Para k fixo, todas as sequências com k uns têm a mesma probabilidade. As 2ⁿ sequências só são todas equiprováveis quando p=1/2.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 94,
          "anchor": "contagem-dos-resultados-de-bernoulli"
        }
      ]
    },
    {
      "id": "lec03-018",
      "type": "find-the-intruder",
      "topic": "Contagens multinomiais",
      "difficulty": "intro",
      "prompt": "Seis clientes escolhem, independentemente, exatamente uma bebida cada: chá com probabilidade 0,2, café com probabilidade 0,3 ou sumo com probabilidade 0,5. Sejam T, C e J as contagens de chá, café e sumo, respetivamente. Qual dos triplos tem probabilidade zero neste modelo?",
      "options": [
        {
          "id": "a",
          "text": "(T,C,J)=(0,0,6)"
        },
        {
          "id": "b",
          "text": "(T,C,J)=(1,2,2)"
        },
        {
          "id": "c",
          "text": "(T,C,J)=(2,1,3)"
        },
        {
          "id": "d",
          "text": "(T,C,J)=(6,0,0)"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Cada cliente contribui para exatamente uma contagem, pelo que T+C+J=6. O triplo (1,2,2) soma 5 e é impossível. Todos os outros triplos somam 6 e têm probabilidade positiva, pois as probabilidades das três categorias são positivas.",
      "visual": {
        "kind": "bars",
        "labels": [
          "Chá",
          "Café",
          "Sumo"
        ],
        "values": [
          0.2,
          0.3,
          0.5
        ],
        "xLabel": "Bebida escolhida por um cliente",
        "yLabel": "Probabilidade",
        "title": "Uma escolha por cliente",
        "description": "Para cada um dos seis clientes independentes: chá tem probabilidade 0,2, café 0,3 e sumo 0,5.",
        "caption": "São probabilidades para um cliente, não as contagens observadas entre os seis clientes."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 96,
          "anchor": "a-distribuição-trinomial"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 97,
          "anchor": "a-distribuição-multinomial"
        }
      ]
    },
    {
      "id": "lec03-019",
      "type": "numeric-input",
      "topic": "Contagens multinomiais",
      "difficulty": "core",
      "prompt": "Dez clientes escolhem, independentemente, exatamente uma bebida cada, com probabilidades 0,2 para chá, 0,3 para café e 0,5 para sumo. Sejam T e C as contagens de chá e café. Calcule Cov(T,C).",
      "acceptedAnswers": [
        "-0.6",
        "-3/5"
      ],
      "correctAnswer": "-0.6",
      "explanation": "Para contagens multinomiais obtidas em d ensaios, as contagens de categorias distintas satisfazem Cov(Xᵢ,Xⱼ)=−dpᵢpⱼ. Assim, Cov(T,C)=−10·0,2·0,3=−0,6. As escolhas de clientes diferentes são independentes, mas os totais por categoria não o são: o número total de clientes é fixo.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 98,
          "anchor": "momentos-da-distribuição-multinomial"
        }
      ]
    },
    {
      "id": "lec03-020",
      "type": "proof-step",
      "topic": "Contagens multinomiais",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam d≥1 e r≥2 inteiros. Em cada um de d ensaios independentes, escolhe-se uma categoria j∈{1,…,r} com probabilidade pⱼ, onde pⱼ≥0 e p₁+⋯+pᵣ=1. Seja Xⱼ a contagem da categoria j. Para i≠j, Cov(Xᵢ,Xⱼ)=−dpᵢpⱼ."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Designe-se por Cℓ a categoria escolhida no ensaio ℓ e por 1{A} o valor 1 quando o acontecimento A ocorre e 0 caso contrário. Cada Xᵢ é a soma de 1{Cℓ=i} para ℓ=1,…,d. Logo, XᵢXⱼ é a soma de 1{Cℓ=i}1{Cₘ=j} sobre todos os pares ordenados (ℓ,m)∈{1,…,d}². Os termos com ℓ=m anulam-se, porque um ensaio não pode ter duas categorias diferentes. Para ℓ≠m, a independência dá E[1{Cℓ=i}1{Cₘ=j}]=pᵢpⱼ. Além disso, E(Xᵢ)=dpᵢ e E(Xⱼ)=dpⱼ."
        }
      ],
      "prompt": "Qual dos cálculos fornece o passo que falta?",
      "options": [
        {
          "id": "a",
          "text": "Restam d² pares ordenados, logo Cov(Xᵢ,Xⱼ)=d²pᵢpⱼ−d²pᵢpⱼ=0."
        },
        {
          "id": "b",
          "text": "Restam d(d−1)/2 pares ordenados, logo E(XᵢXⱼ)=d(d−1)pᵢpⱼ/2."
        },
        {
          "id": "c",
          "text": "Todos os termos restantes são zero, porque ensaios diferentes não podem escolher categorias diferentes."
        },
        {
          "id": "d",
          "text": "Restam d(d−1) pares ordenados, logo Cov(Xᵢ,Xⱼ)=d(d−1)pᵢpⱼ−d²pᵢpⱼ=−dpᵢpⱼ."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Escolhe-se o primeiro ensaio de d maneiras e um segundo ensaio diferente de d−1 maneiras. Os pares são ordenados, pelo que não há fator 1/2. Pela linearidade, E(XᵢXⱼ)=d(d−1)pᵢpⱼ. Subtrair E(Xᵢ)E(Xⱼ)=d²pᵢpⱼ prova a fórmula da covariância, incluindo o caso d=1.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 98,
          "anchor": "momentos-da-distribuição-multinomial"
        }
      ]
    },
    {
      "id": "lec03-021",
      "type": "multiple-choice",
      "topic": "Contagens de Poisson",
      "difficulty": "intro",
      "prompt": "Um modelo de atendimento telefónico supõe que N, o número de chamadas numa hora, tem distribuição Poisson(6), e que T, o tempo de espera pela primeira chamada medido em horas, tem distribuição Exp(6). Qual afirmação distingue corretamente as duas variáveis?",
      "options": [
        {
          "id": "a",
          "text": "Ambas contam chamadas e ambas têm média de 6 chamadas."
        },
        {
          "id": "b",
          "text": "N toma valores inteiros não negativos e tem média 6; T é não negativa e tem média de 1/6 de hora, ou 10 minutos."
        },
        {
          "id": "c",
          "text": "N é um tempo de espera com média de 1/6 de hora; T é uma contagem inteira com média 6."
        },
        {
          "id": "d",
          "text": "N e T têm ambas média de 1/6 de hora, porque o parâmetro é o mesmo."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Uma variável de Poisson é uma contagem e tem média igual ao seu parâmetro: E(N)=6. Um tempo de espera exponencial com taxa de 6 por hora tem média E(T)=1/6 de hora=10 minutos. A igualdade dos valores numéricos dos parâmetros não torna idênticas as distribuições, os valores possíveis ou as unidades.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 99,
          "anchor": "a-distribuição-de-poisson"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 100,
          "anchor": "a-distribuição-exponencial"
        }
      ]
    },
    {
      "id": "lec03-022",
      "type": "multiple-choice",
      "topic": "Contagens de Poisson",
      "difficulty": "core",
      "prompt": "Os números de erros de impressão num dia em duas impressoras são independentes: X∼Poisson(1) e Y∼Poisson(2). Qual é a probabilidade de nenhuma das impressoras produzir erros nesse dia?",
      "options": [
        {
          "id": "a",
          "text": "e⁻³"
        },
        {
          "id": "b",
          "text": "1−e⁻³"
        },
        {
          "id": "c",
          "text": "e⁻¹+e⁻²"
        },
        {
          "id": "d",
          "text": "e⁻²"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A independência dá P(X=0,Y=0)=e⁻¹e⁻²=e⁻³. Equivalentemente, X+Y∼Poisson(3), e as duas contagens não negativas são zero exatamente quando a sua soma é zero. A soma das médias é 3 erros por dia, não um número de erros garantido em cada dia.",
      "visual": {
        "kind": "bars",
        "labels": [
          "Impressora A",
          "Impressora B"
        ],
        "values": [
          1,
          2
        ],
        "xLabel": "Impressoras independentes",
        "yLabel": "Número esperado de erros num dia",
        "title": "Duas fontes independentes de erros",
        "description": "A impressora A tem uma contagem de Poisson com média de 1 erro num dia. A impressora B tem uma contagem de Poisson com média de 2. As contagens são independentes.",
        "caption": "As alturas das barras são contagens esperadas, não probabilidades nem totais de erros observados."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 99,
          "anchor": "a-distribuição-de-poisson"
        }
      ]
    },
    {
      "id": "lec03-023",
      "type": "multiple-choice",
      "topic": "Tempos de espera exponenciais",
      "difficulty": "core",
      "prompt": "O tempo de espera T por uma chamada tem distribuição Exp(3), com T medido em minutos: a taxa é de 3 por minuto. Qual é P(T>20 segundos)?",
      "options": [
        {
          "id": "a",
          "text": "e⁻⁶⁰"
        },
        {
          "id": "b",
          "text": "1−e⁻¹"
        },
        {
          "id": "c",
          "text": "e⁻¹"
        },
        {
          "id": "d",
          "text": "e⁻²⁰"
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Converta o limiar para a unidade usada na taxa: 20 segundos=1/3 de minuto. Para uma variável exponencial, P(T>t)=exp(−λt). Portanto, P(T>1/3)=exp(−3·(1/3))=e⁻¹. O expoente deve usar unidades de tempo compatíveis; 1−e⁻¹ seria a probabilidade de uma chamada nos primeiros 20 segundos.",
      "visual": {
        "kind": "timeline",
        "start": 0,
        "end": 60,
        "marks": [
          {
            "value": 0,
            "label": "0 s"
          },
          {
            "value": 20,
            "label": "20 s"
          },
          {
            "value": 60,
            "label": "60 s = 1 min"
          }
        ],
        "segments": [
          {
            "from": 0,
            "to": 20,
            "label": "Limiar temporal"
          }
        ],
        "xLabel": "Segundos desde o início da espera",
        "title": "Use unidades compatíveis",
        "description": "Um eixo temporal vai de 0 a 60 segundos, com um limiar aos 20 segundos. A taxa do modelo é de 3 chamadas por minuto. Não se representa nenhuma chegada de chamada.",
        "caption": "A figura mostra uma escala temporal e o limiar da pergunta, não um histórico observado de chamadas."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 100,
          "anchor": "a-distribuição-exponencial"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 102,
          "anchor": "chegadas-de-chamadas-tempo-de-espera"
        }
      ]
    },
    {
      "id": "lec03-024",
      "type": "proof-step",
      "topic": "Tempos de espera exponenciais",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Se T∼Exp(λ), com λ>0, então, para quaisquer s,t≥0, P(T>s+t | T>s)=P(T>t). Esta é a propriedade de ausência de memória. A fórmula de sobrevivência exponencial é P(T>u)=exp(−λu) para u≥0."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Como P(T>s)=exp(−λs)>0, a probabilidade condicional está definida. Como t≥0, {T>s+t}⊆{T>s}; portanto, P(T>s+t | T>s)=P(T>s+t)/P(T>s)=exp(−λ(s+t))/exp(−λs)."
        }
      ],
      "prompt": "Qual dos passos seguintes conclui a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "O quociente é exp(−λt)=P(T>t), independentemente de s."
        },
        {
          "id": "b",
          "text": "O quociente é exp(−λ(s+t))=P(T>s+t), porque os dois acontecimentos são independentes."
        },
        {
          "id": "c",
          "text": "O quociente é 1−exp(−λt)=P(T≤t)."
        },
        {
          "id": "d",
          "text": "O quociente é exp(−λs)=P(T>s), independentemente de t."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Subtrair os expoentes dá −λ(s+t)+λs=−λt. Assim, sabendo que já se esperou mais de s, a probabilidade de esperar mais do que t unidades de tempo adicionais é a probabilidade de sobrevivência original em t. Os acontecimentos encaixados não são, em geral, independentes; é a fórmula do quociente, e não a independência, que justifica o cálculo.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 103,
          "anchor": "ausência-de-memória"
        }
      ]
    },
    {
      "id": "lec03-025",
      "type": "multiple-choice",
      "topic": "Modelos normais",
      "difficulty": "intro",
      "prompt": "O volume X numa garrafa é modelado por N(500,4²), com X medido em mililitros. Na notação N(μ,σ²) da aula, quais são a média e o desvio-padrão?",
      "options": [
        {
          "id": "a",
          "text": "Média 500 mL; desvio-padrão 16 mL."
        },
        {
          "id": "b",
          "text": "Média 4 mL; desvio-padrão 500 mL."
        },
        {
          "id": "c",
          "text": "Média 500 mL; desvio-padrão 2 mL."
        },
        {
          "id": "d",
          "text": "Média 500 mL; desvio-padrão 4 mL."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Em N(μ,σ²), o segundo parâmetro é a variância. Aqui, μ=500 e σ²=4²=16, pelo que σ=4. A média e o desvio-padrão medem-se em mL; a variância é 16 mL². Trata-se de um modelo normal assumido, não de uma afirmação de que volumes reais podem ser negativos.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 105,
          "anchor": "a-distribuição-normal"
        }
      ]
    },
    {
      "id": "lec03-026",
      "type": "multiple-choice",
      "topic": "Modelos normais",
      "difficulty": "core",
      "prompt": "Uma medição X é modelada por N(100,2²). Defina Z=(X−100)/2, pelo que Z∼N(0,1). Qual probabilidade é exatamente igual a P(98<X<104)?",
      "options": [
        {
          "id": "a",
          "text": "P(−2<Z<4)"
        },
        {
          "id": "b",
          "text": "P(−1<Z<2)"
        },
        {
          "id": "c",
          "text": "P(−1/2<Z<1)"
        },
        {
          "id": "d",
          "text": "P(49<Z<52)"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Subtraia 100 aos três membros de 98<X<104 e divida pelo desvio-padrão positivo 2. Obtém-se −1<(X−100)/2<2. Como se assume que X é normal, Z é exatamente normal padrão; não se usa nenhuma aproximação.",
      "visual": {
        "kind": "normal",
        "mean": 100,
        "sd": 2,
        "marks": [
          {
            "value": 98,
            "label": "98"
          },
          {
            "value": 100,
            "label": "100"
          },
          {
            "value": 104,
            "label": "104"
          }
        ],
        "shadeFrom": 98,
        "shadeTo": 104,
        "xLabel": "Medição X",
        "title": "Passe um intervalo para a escala normal padrão",
        "description": "Densidade normal com média 100 e desvio-padrão 2. A área entre 98 e 104 está sombreada, com marcas em 98, 100 e 104.",
        "caption": "A área sombreada representa P(98<X<104). A curva corresponde ao modelo normal assumido."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 105,
          "anchor": "a-distribuição-normal"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 107,
          "anchor": "ficha-2-estandardização"
        }
      ]
    },
    {
      "id": "lec03-027",
      "type": "multiple-choice",
      "topic": "Modelos normais",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema dado",
          "text": "Para p fixo com 0<p<1 e X_d∼B(d,p), defina Z_d=(X_d−dp)/√(dp(1−p)). O teorema de De Moivre–Laplace afirma que, para qualquer z real, P(Z_d≤z) tende, quando d→∞, para Φ(z), onde Φ é a função de distribuição de N(0,1)."
        }
      ],
      "prompt": "O que podemos concluir corretamente acerca de Z₁₀₀ quando p=1/2?",
      "options": [
        {
          "id": "a",
          "text": "Z₁₀₀ tem exatamente distribuição N(0,1), porque a sua média é 0 e a sua variância é 1."
        },
        {
          "id": "b",
          "text": "P(Z₁₀₀≤z)=Φ(z) para qualquer z real; o teorema dá igualdade para d=100."
        },
        {
          "id": "c",
          "text": "Z₁₀₀ continua a ser discreta, e o teorema trata da convergência das funções de distribuição quando d cresce, não da normalidade exata para d=100."
        },
        {
          "id": "d",
          "text": "A mesma fórmula aplica-se sem alterações quando p=0, porque o denominador é então 1."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Para d=100 e p=1/2, Z₁₀₀=(X₁₀₀−50)/5 só pode tomar 101 valores, pelo que não pode ter uma distribuição normal contínua. A estandardização dá média 0 e variância 1, mas estes dois momentos não determinam a normalidade. O teorema enunciado é um resultado limite para funções de distribuição, não uma estimativa do erro nem uma igualdade para d finito; em p=0 ou p=1, o denominador apresentado anula-se.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 106,
          "anchor": "da-binomial-à-normal"
        }
      ]
    },
    {
      "id": "lec03-028",
      "type": "multiple-choice",
      "topic": "Tempos de espera gama",
      "difficulty": "core",
      "prompt": "Três tarefas são realizadas uma após outra. As suas durações T₁,T₂,T₃, em horas, são variáveis Exp(2) independentes, com taxa de 2 por hora. Para a duração total S=T₁+T₂+T₃, quais são a distribuição gama e a média corretas? Use a convenção forma–escala Γ(κ,θ) da aula.",
      "options": [
        {
          "id": "a",
          "text": "S∼Γ(3; 1/2) e E(S)=3/2 horas."
        },
        {
          "id": "b",
          "text": "S∼Γ(3,2) e E(S)=6 horas."
        },
        {
          "id": "c",
          "text": "S∼Γ(1/2; 3) e E(S)=3/2 horas."
        },
        {
          "id": "d",
          "text": "S∼Exp(6) e E(S)=1/6 de hora."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma soma de m variáveis Exp(1/θ) independentes tem distribuição Γ(m,θ). Aqui, m=3 e 1/θ=2, logo θ=1/2 hora e S∼Γ(3; 1/2). A sua média é κθ=3/2 horas, também a soma das três médias. Não se podem simplesmente somar as taxas quando se somam durações exponenciais.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 108,
          "anchor": "a-distribuição-gama"
        }
      ]
    },
    {
      "id": "lec03-029",
      "type": "numeric-input",
      "topic": "Tempos de espera gama",
      "difficulty": "core",
      "prompt": "Uma duração de atendimento X, medida em minutos, segue Γ(κ,θ) na convenção forma–escala, com κ>0 e θ>0. A sua média é 6 minutos e a sua variância é 12 minutos². Determine a escala θ em minutos.",
      "acceptedAnswers": [
        "2"
      ],
      "correctAnswer": "2",
      "explanation": "As fórmulas da distribuição gama dão E(X)=κθ e V(X)=κθ². Como κθ>0, dividir a variância pela média dá θ=12/6=2 minutos. Depois, κ=6/2=3. As unidades também são coerentes: minutos² divididos por minutos dão minutos.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 108,
          "anchor": "a-distribuição-gama"
        }
      ]
    },
    {
      "id": "lec03-030",
      "type": "numeric-input",
      "topic": "Contagens de Poisson",
      "difficulty": "core",
      "prompt": "O número N de novas flores que surgem num jardim num dia é modelado por Poisson(6). Quantas vezes é mais provável surgirem exatamente 3 flores do que exatamente 2? Calcule P(N=3)/P(N=2).",
      "acceptedAnswers": [
        "2"
      ],
      "correctAnswer": "2",
      "explanation": "Pela fórmula de Poisson, P(N=3)/P(N=2)=[e⁻⁶·6³/3!]/[e⁻⁶·6²/2!]=6/3=2. Ambas as probabilidades são positivas. Um quociente de 2 significa ‘duas vezes mais provável’; não é, por si só, a probabilidade de nenhum dos acontecimentos.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 99,
          "anchor": "a-distribuição-de-poisson"
        }
      ]
    },
    {
      "id": "lec03-031",
      "type": "multiple-choice",
      "topic": "Funções características",
      "difficulty": "intro",
      "prompt": "Para uma variável aleatória real X, define-se a sua função característica por φ_X(t)=E(e^{itX}), com t real e i²=−1. Porque é que esta esperança está definida e é finita para todo o t real, mesmo quando E(|X|)=∞?",
      "options": [
        {
          "id": "a",
          "text": "Todas as variáveis aleatórias reais têm segundo momento finito."
        },
        {
          "id": "b",
          "text": "A variável aleatória complexa e^{itX} tem módulo 1, pelo que E(|e^{itX}|)=1."
        },
        {
          "id": "c",
          "text": "Multiplicar X por i torna-a limitada."
        },
        {
          "id": "d",
          "text": "Todas as variáveis aleatórias reais têm uma função geradora de momentos finita numa vizinhança de zero."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Para x e t reais, e^{itx}=cos(tx)+i sin(tx) tem módulo 1. Assim, o módulo é integrável, independentemente dos valores que X possa assumir. Isto garante uma função característica finita, mas não garante momentos finitos nem uma função geradora de momentos finita fora de zero.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 110,
          "anchor": "funções-características"
        }
      ]
    },
    {
      "id": "lec03-032",
      "type": "multiple-choice",
      "topic": "Funções geradoras de momentos",
      "difficulty": "intro",
      "prompt": "A uma encomenda atribui-se X=1 se a entrega chegar atrasada e X=0 caso contrário. Suponha que P(X=1)=1/4 e P(X=0)=3/4. Qual é a fórmula da função geradora de momentos M_X(t)=E(e^{tX}) para todo o t real?",
      "options": [
        {
          "id": "a",
          "text": "M_X(t)=e^{t/4}"
        },
        {
          "id": "b",
          "text": "M_X(t)=3/4+(1/4)t"
        },
        {
          "id": "c",
          "text": "M_X(t)=1/4+(3/4)e^t"
        },
        {
          "id": "d",
          "text": "M_X(t)=3/4+(1/4)e^t"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Calculamos a média dos dois valores possíveis de e^{tX}, ponderados pelas respetivas probabilidades: M_X(t)=(3/4)e^0+(1/4)e^t. A transformada é finita para todo o t real porque X só assume dois valores. Em geral, E(e^{tX}) não é igual a e^{tE(X)}.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 109,
          "anchor": "funções-geradoras-de-momentos"
        }
      ]
    },
    {
      "id": "lec03-033",
      "type": "numeric-input",
      "topic": "Momentos a partir de transformadas",
      "difficulty": "core",
      "prompt": "Uma variável aleatória real X tem função geradora de momentos M_X(t)=E(e^{tX}) finita num intervalo aberto que contém 0. Sabe-se que M_X′(0)=2 e M_X″(0)=7. Calcule Var(X)=E[(X−E(X))²].",
      "acceptedAnswers": [
        "3"
      ],
      "correctAnswer": "3",
      "explanation": "A finitude num intervalo aberto em torno de zero permite obter os momentos pelas derivadas: E(X)=M_X′(0)=2 e E(X²)=M_X″(0)=7. Logo, Var(X)=E(X²)−[E(X)]²=7−4=3. A segunda derivada dá o segundo momento, não diretamente a variância.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 109,
          "anchor": "funções-geradoras-de-momentos"
        }
      ]
    },
    {
      "id": "lec03-034",
      "type": "multiple-choice",
      "topic": "Regras para transformadas",
      "difficulty": "core",
      "prompt": "Uma variável aleatória real X tem função característica φ_X(t)=E(e^{itX})=exp(−t²/2) para todo o t real, com i²=−1. Um sensor apresenta a leitura Y=2X+3. Qual é a expressão de φ_Y(t)?",
      "options": [
        {
          "id": "a",
          "text": "exp(3it−t²/2)"
        },
        {
          "id": "b",
          "text": "exp(3it−t²)"
        },
        {
          "id": "c",
          "text": "exp(3it−2t²)"
        },
        {
          "id": "d",
          "text": "exp(3t−2t²)"
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Para a,b reais, φ_{aX+b}(t)=e^{ibt}φ_X(at). Neste caso, φ_Y(t)=e^{3it}φ_X(2t)=exp(3it−(2t)²/2)=exp(3it−2t²). Multiplicar X por 2 multiplica o termo quadrático por 4; a translação aditiva contribui com o fator e^{3it}.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 111,
          "anchor": "aplicações-afins-e-somas-independentes"
        }
      ]
    },
    {
      "id": "lec03-035",
      "type": "proof-step",
      "topic": "Funções características",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Para qualquer variável aleatória real X, seja φ_X(t)=E(e^{itX}) para t real, com i²=−1. Então φ_X(−t)=overline(φ_X(t)) para todo o t real. Aqui overline(z) designa o conjugado complexo de z: overline(a+ib)=a−ib para a,b reais."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe t real. Ambas as exponenciais são integráveis porque |e^{itX}|=|e^{−itX}|=1. A identidade e^{−itX}=overline(e^{itX}) dá φ_X(−t)=E(overline(e^{itX}))."
        }
      ],
      "prompt": "Que passo seguinte completa a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "A esperança comuta com a conjugação complexa, por linearidade nas partes real e imaginária; logo E(overline(e^{itX}))=overline(E(e^{itX}))."
        },
        {
          "id": "b",
          "text": "A conjugação não altera nenhum número complexo, pelo que φ_X(−t)=φ_X(t)."
        },
        {
          "id": "c",
          "text": "Como |e^{itX}|=1, a sua esperança tem de ser igual a 1."
        },
        {
          "id": "d",
          "text": "A identidade e^{−itX}=−e^{itX} dá φ_X(−t)=−φ_X(t)."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Escreva e^{itX}=cos(tX)+i sin(tX). As partes real e imaginária são limitadas e, por isso, integráveis. Tomar a esperança após a conjugação dá E(cos(tX))−iE(sin(tX)), exatamente o conjugado de φ_X(t). Uma função característica não tem de ser real nem par.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 110,
          "anchor": "funções-características"
        }
      ]
    },
    {
      "id": "lec03-036",
      "type": "proof-step",
      "topic": "Regras para transformadas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam X e Y variáveis aleatórias reais independentes com distribuições de Poisson de parâmetros 2 e 3, respetivamente. Então X+Y tem distribuição de Poisson de parâmetro 5. Para λ>0, uma variável Poisson(λ) assume valores k=0,1,2,… com probabilidades e^{−λ}λ^k/k!, e tem função característica exp(λ(e^{it}−1)) para todo o t real, com i²=−1."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe um t real arbitrário. Pela independência, φ_{X+Y}(t)=φ_X(t)φ_Y(t). Substituindo, obtemos φ_{X+Y}(t)=exp(2(e^{it}−1))exp(3(e^{it}−1))=exp(5(e^{it}−1))."
        }
      ],
      "prompt": "Que passo final identifica rigorosamente a distribuição da contagem total X+Y?",
      "options": [
        {
          "id": "a",
          "text": "Como φ_{X+Y}(0)=1, o total tem de ter distribuição Poisson(5)."
        },
        {
          "id": "b",
          "text": "O parâmetro 5 significa que X+Y=5 com probabilidade 1."
        },
        {
          "id": "c",
          "text": "A identidade do produto seria válida para quaisquer X e Y com estas distribuições marginais, pelo que a independência era desnecessária."
        },
        {
          "id": "d",
          "text": "A expressão coincide com a função característica de Poisson(5) para todo o t real; a unicidade das funções características dá a igualdade das distribuições."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "As funções características coincidem para todos os argumentos reais, pelo que o teorema de unicidade identifica a lei de X+Y como Poisson(5). A coincidência apenas em zero nada diria: todas as funções características valem 1 nesse ponto. A independência é essencial no passo do produto; a igualdade de distribuições não significa que o total seja a constante 5.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 111,
          "anchor": "aplicações-afins-e-somas-independentes"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 113,
          "anchor": "funções-características-de-distribuições-usuais"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 114,
          "anchor": "unicidade-das-funções-características"
        }
      ]
    },
    {
      "id": "lec03-037",
      "type": "proof-step",
      "topic": "Momentos a partir de transformadas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja X uma variável aleatória real com E(X²)<∞. A sua função característica φ_X(t)=E(e^{itX}), com t real e i²=−1, é duas vezes continuamente diferenciável e satisfaz φ_X″(0)=−E(X²)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Seja P_X a distribuição de probabilidade de X. Escreva φ_X(t)=∫ e^{itx} dP_X(x). Para j=1,2, a derivada de ordem j de e^{itx} em relação a t é (ix)^j e^{itx}; o seu módulo é |x|^j. Para trocar duas vezes a ordem da derivação e da integração, precisamos de uma função independente de t que domine ambas as ordens de derivação e seja integrável em relação a P_X."
        }
      ],
      "prompt": "Qual das seguintes majorações garante essa dominação integrável sob a hipótese enunciada?",
      "options": [
        {
          "id": "a",
          "text": "Usar g(x)=1, porque todas as derivadas de e^{itx} têm módulo 1."
        },
        {
          "id": "b",
          "text": "Usar g(x)=1+x²: |x|^j≤1+x² para j=1,2 e E(1+X²)<∞."
        },
        {
          "id": "c",
          "text": "Usar g(x)=|x|, porque |x|²≤|x| para todo o x real."
        },
        {
          "id": "d",
          "text": "Usar g(x)=1+x⁴, porque E(X²)<∞ implica sempre E(X⁴)<∞."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "A função integrável 1+x² domina simultaneamente |x| e x². A derivação sob o sinal de integral por dominação dá então φ_X″(t)=E((iX)²e^{itX}); a convergência dominada dá a continuidade das derivadas. Em t=0, a identidade i²=−1 implica φ_X″(0)=−E(X²). Um segundo momento finito não garante um quarto momento finito.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 112,
          "anchor": "derivadas-de-funções-características"
        }
      ]
    },
    {
      "id": "lec03-038",
      "type": "find-the-intruder",
      "topic": "Funções características",
      "difficulty": "core",
      "prompt": "Uma função característica tem a forma φ_X(t)=E(e^{itX}), para uma variável aleatória real X, t real e i²=−1. Exatamente uma das seguintes funções não pode ser uma função característica. Identifique-a.",
      "options": [
        {
          "id": "a",
          "text": "f(t)=1 para todo o t real."
        },
        {
          "id": "b",
          "text": "f(t)=cos(t) para todo o t real."
        },
        {
          "id": "c",
          "text": "f(t)=1+t² para todo o t real."
        },
        {
          "id": "d",
          "text": "f(t)=exp(−t²/2) para todo o t real."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Qualquer função característica satisfaz |φ_X(t)|≤E(|e^{itX}|)=1, mas 1+t²>1 quando t≠0. As outras funções são válidas: a variável constante 0 dá 1; uma variável que assume −1 e 1 com probabilidade 1/2 cada dá cos(t); a distribuição normal padrão N(0,1) dá exp(−t²/2).",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 110,
          "anchor": "funções-características"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 113,
          "anchor": "funções-características-de-distribuições-usuais"
        }
      ]
    },
    {
      "id": "lec03-039",
      "type": "multiple-choice",
      "topic": "Funções geradoras de momentos",
      "difficulty": "core",
      "prompt": "As variáveis aleatórias reais X e Y estão definidas no mesmo espaço de probabilidade. As suas funções geradoras de momentos M_X(t)=E(e^{tX}) e M_Y(t)=E(e^{tY}) são finitas e iguais para todo o t num intervalo aberto que contém 0. Qual das conclusões é garantida?",
      "options": [
        {
          "id": "a",
          "text": "X e Y têm a mesma distribuição de probabilidade."
        },
        {
          "id": "b",
          "text": "P(X=Y)=1."
        },
        {
          "id": "c",
          "text": "X e Y são independentes."
        },
        {
          "id": "d",
          "text": "X e Y têm de ser ambas variáveis aleatórias constantes."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Aplica-se o teorema de unicidade da função geradora de momentos, pois ambas as transformadas são finitas e iguais num intervalo aberto em torno de zero. Este teorema determina a distribuição, não o comportamento conjunto de X e Y. Por exemplo, se X assume 0 e 1 com igual probabilidade e Y=1−X, as suas funções geradoras de momentos coincidem para todo o t real, mas P(X=Y)=0 e as variáveis não são independentes.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 109,
          "anchor": "funções-geradoras-de-momentos"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 114,
          "anchor": "unicidade-das-funções-características"
        }
      ]
    },
    {
      "id": "lec03-040",
      "type": "numeric-input",
      "topic": "Momentos a partir de transformadas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Modelo dos sensores",
          "text": "As variáveis aleatórias reais X e Y são independentes e têm segundos momentos finitos. As suas funções características são φ_X(t)=exp(it−2t²) e φ_Y(t)=exp(3it−t²/2), para todo o t real; aqui φ_V(t)=E(e^{itV}) e i²=−1. A leitura combinada é Z=2X−Y."
        },
        {
          "label": "Identidades úteis",
          "text": "A independência dá φ_Z(t)=φ_X(2t)φ_Y(−t). Para qualquer variável real V com E(V²)<∞, tem-se φ_V′(0)=iE(V) e φ_V″(0)=−E(V²)."
        }
      ],
      "prompt": "Calcule o segundo momento E(Z²) da leitura combinada. (Não é o mesmo que a sua variância.)",
      "acceptedAnswers": [
        "18"
      ],
      "correctAnswer": "18",
      "explanation": "φ_Z(t)=exp(2it−8t²)exp(−3it−t²/2)=exp(−it−17t²/2). Derivando duas vezes e avaliando em zero, obtemos φ_Z″(0)=(−i)²−17=−18, pelo que E(Z²)=18. Equivalentemente, E(Z)=−1 e Var(Z)=17, logo E(Z²)=17+(−1)². Os segundos momentos finitos de X e Y implicam o de Z, pois (2X−Y)²≤8X²+2Y².",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 111,
          "anchor": "aplicações-afins-e-somas-independentes"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 112,
          "anchor": "derivadas-de-funções-características"
        }
      ]
    }
  ]
};
