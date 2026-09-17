window.BANK_0_EXERCISE_BANK = {
  "schemaVersion": 1,
  "block": {
    "id": "lecture-1",
    "bankNumber": 0,
    "title": "Aula 1",
    "description": "Slides 12–41: espaços de probabilidade, elementos aleatórios, funções de distribuição, quantis e tipos de distribuições",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../../pt/index.html#/espaços-de-probabilidade-e-distribuições-unidimensionais",
    "featuredTopics": [
      "Espaços de probabilidade",
      "Mensurabilidade",
      "Elementos aleatórios",
      "Funções de distribuição",
      "Quantis",
      "Tipos de distribuições"
    ]
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
    "lecture-1-slides": {
      "title": "Inferência Estatística 2026 — Semanas 1–2, Aula 1",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../../pt/index.html",
      "slideRange": [
        12,
        41
      ],
      "deckSha256": "def6d2253263b7deff21bf8dede330bfa2d37c363bd5ee2498f4ffc85673f15a",
      "sourceFile": "slides-2026-weeks-1-2/pt/index.qmd",
      "renderedSourceFile": "slides/si-2026/weeks-1-2/pt/index.html"
    }
  },
  "exercises": [
    {
      "id": "bank00-001",
      "type": "multiple-choice",
      "topic": "σ-álgebras",
      "difficulty": "intro",
      "prompt": "Uma σ-álgebra sobre Ω contém Ω e é fechada para complementares. Que outro axioma faz parte da sua definição?",
      "options": [
        {
          "id": "a",
          "text": "A união de qualquer família numerável dos seus elementos também lhe pertence"
        },
        {
          "id": "b",
          "text": "Qualquer subconjunto de cada um dos seus elementos também lhe pertence"
        },
        {
          "id": "c",
          "text": "Cada elemento é constituído por um número finito de pontos"
        },
        {
          "id": "d",
          "text": "Contém apenas um número finito de acontecimentos"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "O terceiro axioma é o fecho para uniões numeráveis. Uma σ-álgebra não tem de conter todos os subconjuntos dos seus elementos, e nem os seus elementos nem a própria coleção têm de ser finitos.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 14,
          "anchor": "sigma-álgebras"
        }
      ]
    },
    {
      "id": "bank00-002",
      "type": "find-the-intruder",
      "topic": "σ-álgebras",
      "difficulty": "core",
      "prompt": "Seja Ω={a,b,c}. Qual das coleções NÃO é uma σ-álgebra sobre Ω?",
      "options": [
        {
          "id": "a",
          "text": "{∅, Ω}"
        },
        {
          "id": "b",
          "text": "O conjunto das partes de Ω (todos os seus subconjuntos)"
        },
        {
          "id": "c",
          "text": "{∅, {a}, {b,c}, Ω}"
        },
        {
          "id": "d",
          "text": "{∅, {a}, Ω}"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "A última coleção contém {a}, mas não contém o seu complementar {b,c}. Logo, não é fechada para complementares. As outras três coleções satisfazem as condições de uma σ-álgebra.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 14,
          "anchor": "sigma-álgebras"
        }
      ]
    },
    {
      "id": "bank00-003",
      "type": "proof-step",
      "topic": "σ-álgebras",
      "difficulty": "intro",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja Ω um conjunto não vazio e seja F uma σ-álgebra sobre Ω. Então ∅ pertence a F."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Pela definição de σ-álgebra, Ω pertence a F. Além disso, sempre que A pertence a F, o seu complementar Aᶜ=Ω∖A também pertence a F."
        }
      ],
      "prompt": "Que aplicação destes factos completa a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "Aplicar o fecho para complementares a A=Ω: Ωᶜ=∅, pelo que ∅ pertence a F."
        },
        {
          "id": "b",
          "text": "Todos os subconjuntos de Ω pertencem a F, porque Ω pertence a F."
        },
        {
          "id": "c",
          "text": "O complementar de Ω é Ω, pelo que a passagem ao complementar acrescenta o conjunto vazio."
        },
        {
          "id": "d",
          "text": "Ω tem de ser igual a ∅, porque F é fechada para complementares."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "O complementar é tomado em relação a Ω, pelo que Ωᶜ=Ω∖Ω=∅. Aplicar o fecho para complementares ao elemento Ω prova a afirmação. Uma σ-álgebra não tem de conter todos os subconjuntos de Ω.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 14,
          "anchor": "sigma-álgebras"
        }
      ]
    },
    {
      "id": "bank00-004",
      "type": "numeric-input",
      "topic": "Regras da probabilidade",
      "difficulty": "intro",
      "prompt": "Um acontecimento A tem probabilidade 0.35. Qual é o valor de P(Aᶜ)?",
      "acceptedAnswers": [
        "0.65",
        ".65",
        "65%",
        "13/20"
      ],
      "correctAnswer": "0.65",
      "explanation": "A e o seu complementar formam uma partição de Ω, cuja probabilidade é um. Assim, P(Aᶜ)=1−0.35=0.65.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 16,
          "anchor": "consequências-dos-axiomas-de-kolmogorov"
        }
      ]
    },
    {
      "id": "bank00-005",
      "type": "numeric-input",
      "topic": "Regras da probabilidade",
      "difficulty": "core",
      "prompt": "Sejam A e B acontecimentos do mesmo espaço de probabilidade, com P(A)=0.60, P(B)=0.50 e P(A∩B)=0.20. Calcule P(A∪B).",
      "acceptedAnswers": [
        "0.9",
        "0.90",
        ".9",
        "90%",
        "9/10"
      ],
      "correctAnswer": "0.90",
      "explanation": "Subtrai-se a interseção, que foi contada duas vezes: P(A∪B)=0.60+0.50−0.20=0.90.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 16,
          "anchor": "consequências-dos-axiomas-de-kolmogorov"
        }
      ]
    },
    {
      "id": "bank00-006",
      "type": "multiple-choice",
      "topic": "Continuidade da probabilidade",
      "difficulty": "intro",
      "prompt": "A notação Aₙ↗A significa que Aₙ⊆Aₙ₊₁ para todo o n e que se verifica que outra condição?",
      "options": [
        {
          "id": "a",
          "text": "A é a união de todos os Aₙ"
        },
        {
          "id": "b",
          "text": "A é a interseção de todos os Aₙ"
        },
        {
          "id": "c",
          "text": "Os acontecimentos Aₙ são disjuntos dois a dois"
        },
        {
          "id": "d",
          "text": "Cada Aₙ tem probabilidade um"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma sucessão crescente aproxima-se da sua união. Uma sucessão decrescente, representada por Aₙ↘A, aproxima-se da sua interseção.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 17,
          "anchor": "sucessões-monótonas-de-acontecimentos"
        }
      ]
    },
    {
      "id": "bank00-007",
      "type": "numeric-input",
      "topic": "Continuidade da probabilidade",
      "difficulty": "core",
      "prompt": "Os acontecimentos Aₙ decrescem para B e P(Aₙ)=0.2+0.3/n. Qual é o valor de P(B)?",
      "acceptedAnswers": [
        "0.2",
        ".2",
        "20%",
        "1/5"
      ],
      "correctAnswer": "0.2",
      "explanation": "A continuidade da probabilidade para acontecimentos decrescentes dá P(B)=limₙP(Aₙ)=0.2, pois 0.3/n tende para zero.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 18,
          "anchor": "continuidade-da-probabilidade"
        }
      ]
    },
    {
      "id": "bank00-008",
      "type": "proof-step",
      "topic": "Continuidade da probabilidade",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja (Ω,F,P) um espaço de probabilidade e sejam A₁,A₂,… acontecimentos tais que Aₙ⊆Aₙ₊₁ para todo o n≥1. Se A é a união de todos os Aₙ, então P(Aₙ) cresce para P(A)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina A₀=∅ e Dₙ=Aₙ∖Aₙ₋₁ para n≥1. Cada Dₙ é um acontecimento, pois uma σ-álgebra é fechada para diferenças de conjuntos. Os acontecimentos Dₙ representam a parte nova acrescentada no passo n."
        }
      ],
      "prompt": "Que propriedade permite aplicar a aditividade numerável e concluir a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "Os Dₙ são disjuntos dois a dois, a sua união é A e a união de D₁,…,D_N é A_N para todo o N≥1."
        },
        {
          "id": "b",
          "text": "Cada Dₙ tem necessariamente probabilidade zero."
        },
        {
          "id": "c",
          "text": "Cada Dₙ é necessariamente igual a A."
        },
        {
          "id": "d",
          "text": "A sucessão Aₙ tem de se tornar constante ao fim de um número finito de passos."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Incrementos diferentes não se podem sobrepor, pois os Aₙ estão encaixados. A aditividade numerável dá P(A)=P(D₁)+P(D₂)+⋯. A soma dos primeiros N termos é P(A_N), e a soma infinita é o limite destas somas parciais. Logo, P(A_N) tende para P(A); a sucessão é não decrescente porque todos os termos da soma são não negativos.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 18,
          "anchor": "continuidade-da-probabilidade"
        }
      ]
    },
    {
      "id": "bank00-009",
      "type": "multiple-choice",
      "topic": "Conjuntos de Borel",
      "difficulty": "intro",
      "prompt": "O que é a σ-álgebra de Borel de um espaço métrico S?",
      "options": [
        {
          "id": "a",
          "text": "A menor σ-álgebra que contém todos os subconjuntos abertos de S"
        },
        {
          "id": "b",
          "text": "A coleção constituída apenas pelos subconjuntos abertos"
        },
        {
          "id": "c",
          "text": "A coleção constituída apenas pelos subconjuntos finitos"
        },
        {
          "id": "d",
          "text": "A coleção dos subconjuntos de probabilidade zero"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Os abertos geram a σ-álgebra de Borel: esta é a menor σ-álgebra que os contém. A definição depende da topologia, não da escolha de uma medida de probabilidade.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 18,
          "anchor": "continuidade-da-probabilidade"
        }
      ]
    },
    {
      "id": "bank00-010",
      "type": "multiple-choice",
      "topic": "Aplicações mensuráveis",
      "difficulty": "intro",
      "context": [
        {
          "label": "Enquadramento",
          "text": "Sejam (S,𝒮) e (T,𝒯) espaços mensuráveis e seja g:S→T uma aplicação. Para B⊆T, a sua imagem inversa é g⁻¹(B)={s∈S:g(s)∈B}."
        }
      ],
      "prompt": "Que condição define a mensurabilidade de g?",
      "options": [
        {
          "id": "a",
          "text": "Para todo o B∈𝒯, a imagem inversa g⁻¹(B) pertence a 𝒮"
        },
        {
          "id": "b",
          "text": "Para todo o A∈𝒮, a imagem g(A) pertence a 𝒯"
        },
        {
          "id": "c",
          "text": "Cada ponto de T é igual a g(s) para algum s∈S"
        },
        {
          "id": "d",
          "text": "Pontos distintos de S têm sempre imagens distintas por g"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A mensurabilidade é uma condição sobre imagens inversas: a imagem inversa de qualquer conjunto mensurável do espaço de chegada é mensurável no espaço de partida. As imagens de conjuntos mensuráveis não têm de ser mensuráveis, e g não tem de ser sobrejetiva nem injetiva.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 19,
          "anchor": "aplicações-mensuráveis"
        }
      ]
    },
    {
      "id": "bank00-011",
      "type": "proof-step",
      "topic": "Aplicações mensuráveis",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam (S,𝒮) e (T,𝒯) espaços mensuráveis e fixe t₀∈T. A aplicação constante g:S→T definida por g(s)=t₀ para todo o s∈S é mensurável."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe um B∈𝒯 arbitrário. Para provar a mensurabilidade, é necessário mostrar que g⁻¹(B)={s∈S:g(s)∈B} pertence a 𝒮. Sabemos que S e ∅ pertencem a 𝒮."
        }
      ],
      "prompt": "Que descrição de g⁻¹(B) completa a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "É S se t₀∈B e ∅ se t₀∉B."
        },
        {
          "id": "b",
          "text": "É ∅ se t₀∈B e S se t₀∉B."
        },
        {
          "id": "c",
          "text": "É S para todo o B∈𝒯."
        },
        {
          "id": "d",
          "text": "É ∅ para todo o B∈𝒯."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Todos os s têm imagem t₀. Assim, ou todos os s têm imagem em B, ou nenhum tem, consoante t₀ pertença ou não a B. Ambas as imagens inversas possíveis pertencem a 𝒮. Como B era arbitrário, g é mensurável.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 19,
          "anchor": "aplicações-mensuráveis"
        }
      ]
    },
    {
      "id": "bank00-012",
      "type": "multiple-choice",
      "topic": "Elementos aleatórios",
      "difficulty": "intro",
      "context": [
        {
          "label": "Enquadramento",
          "text": "Seja (Ω,ℱ,P) um espaço de probabilidade e seja (S,𝒮) um espaço mensurável."
        }
      ],
      "prompt": "Que descrição define um elemento aleatório X com valores em S?",
      "options": [
        {
          "id": "a",
          "text": "Uma aplicação mensurável X:(Ω,ℱ)→(S,𝒮)"
        },
        {
          "id": "b",
          "text": "Qualquer aplicação X:Ω→S que tome um número finito de valores, sem exigir mensurabilidade"
        },
        {
          "id": "c",
          "text": "A própria medida de probabilidade P:ℱ→[0,1]"
        },
        {
          "id": "d",
          "text": "Qualquer aplicação invertível X:Ω→S, sem exigir mensurabilidade"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Um elemento aleatório é uma aplicação mensurável do espaço de resultados para o espaço de estados. Para cada B∈𝒮, a imagem inversa {ω:X(ω)∈B} tem de pertencer a ℱ, para que P possa atribuir uma probabilidade a esse acontecimento.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 20,
          "anchor": "elementos-aleatórios"
        }
      ]
    },
    {
      "id": "bank00-013",
      "type": "multiple-choice",
      "topic": "Elementos aleatórios",
      "difficulty": "intro",
      "prompt": "Um elemento aleatório toma valores em ℝ³, pelo que cada resultado produz um triplo de números reais. Qual é a designação adequada?",
      "options": [
        {
          "id": "a",
          "text": "Vetor aleatório"
        },
        {
          "id": "b",
          "text": "Variável aleatória real"
        },
        {
          "id": "c",
          "text": "Função aleatória contínua em [0,1]"
        },
        {
          "id": "d",
          "text": "Função de probabilidade"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A terminologia depende do espaço de estados: ℝ corresponde a uma variável aleatória, ℝᵈ com d≥2 a um vetor aleatório e C([0,1]) a uma função aleatória.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 21,
          "anchor": "tipos-de-elementos-aleatórios"
        }
      ]
    },
    {
      "id": "bank00-014",
      "type": "proof-step",
      "topic": "Mensurabilidade das coordenadas",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja (Ω,F) um espaço mensurável, seja d≥1 um inteiro e considerem-se ℝ e ℝᵈ munidos das respetivas σ-álgebras de Borel. Se X=(X₁,…,X_d):Ω→ℝᵈ é mensurável, então cada coordenada Xⱼ:Ω→ℝ é mensurável."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe j∈{1,…,d}. A projeção na coordenada j, πⱼ:ℝᵈ→ℝ, é definida por πⱼ(x₁,…,x_d)=xⱼ. É contínua e, portanto, Borel mensurável. Fixe um conjunto de Borel B⊆ℝ; então πⱼ⁻¹(B) é um subconjunto de Borel de ℝᵈ."
        }
      ],
      "prompt": "Que identidade de imagens inversas prova agora que Xⱼ é mensurável?",
      "options": [
        {
          "id": "a",
          "text": "Xⱼ⁻¹(B)=X⁻¹(πⱼ⁻¹(B)), que pertence a F pela mensurabilidade de X."
        },
        {
          "id": "b",
          "text": "Xⱼ⁻¹(B)=Ω∖X⁻¹(πⱼ⁻¹(B)) para todo o B de Borel."
        },
        {
          "id": "c",
          "text": "Xⱼ⁻¹(B)=X⁻¹(ℝᵈ)=Ω para todo o B de Borel."
        },
        {
          "id": "d",
          "text": "Xⱼ⁻¹(B)=∅ para todo o B de Borel."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Para cada ω∈Ω, tem-se Xⱼ(ω)∈B se e só se X(ω)∈πⱼ⁻¹(B). Isto prova a identidade. O conjunto πⱼ⁻¹(B) é de Borel, pelo que a sua imagem inversa pela aplicação mensurável X pertence a F. Tanto B como j eram arbitrários.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 22,
          "anchor": "mensurabilidade-de-vetores-aleatórios"
        }
      ]
    },
    {
      "id": "bank00-015",
      "type": "proof-step",
      "topic": "Mensurabilidade das coordenadas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja (Ω,F) um espaço mensurável e seja d≥1 um inteiro. Se cada Xⱼ:Ω→ℝ é mensurável para a σ-álgebra de Borel de ℝ, então X=(X₁,…,X_d):Ω→ℝᵈ é mensurável para a σ-álgebra de Borel B(ℝᵈ)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Defina C={A⊆ℝᵈ:X⁻¹(A)∈F}. As imagens inversas preservam complementares e uniões numeráveis, e X⁻¹(ℝᵈ)=Ω; logo, C é uma σ-álgebra.\nPara uma caixa aberta R=I₁×⋯×I_d, em que cada Iⱼ=(aⱼ,bⱼ) tem extremos racionais aⱼ<bⱼ, tem-se X⁻¹(R)=X₁⁻¹(I₁)∩⋯∩X_d⁻¹(I_d)∈F. Portanto, cada uma destas caixas pertence a C."
        }
      ],
      "prompt": "Que facto implica B(ℝᵈ)⊆C e completa a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "Todo o aberto de ℝᵈ é uma união numerável destas caixas; logo, C contém todos os abertos e a σ-álgebra que geram."
        },
        {
          "id": "b",
          "text": "Todo o subconjunto de Borel de ℝᵈ é uma única caixa aberta com extremos racionais."
        },
        {
          "id": "c",
          "text": "Todo o subconjunto de ℝᵈ é uma união finita destas caixas."
        },
        {
          "id": "d",
          "text": "C contém automaticamente todos os subconjuntos de ℝᵈ por ser uma σ-álgebra."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "As caixas abertas com extremos racionais formam uma base numerável: qualquer aberto é a união de uma subcoleção destas caixas. Como C é uma σ-álgebra que contém as caixas, contém todos os abertos. A σ-álgebra de Borel é a menor σ-álgebra que contém todos os abertos, pelo que B(ℝᵈ)⊆C. Pela definição de C, todo o conjunto de Borel tem, portanto, imagem inversa mensurável por X.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 23,
          "anchor": "mensurabilidade-de-vetores-aleatórios-ii"
        }
      ]
    },
    {
      "id": "bank00-016",
      "type": "multiple-choice",
      "topic": "Distribuições e transformações",
      "difficulty": "core",
      "context": [
        {
          "label": "Enquadramento",
          "text": "Seja X:(Ω,ℱ,P)→(S,𝒮) um elemento aleatório. A sua distribuição P_X é uma medida de probabilidade em (S,𝒮)."
        }
      ],
      "prompt": "Que fórmula define P_X(B) para todo o B∈𝒮?",
      "options": [
        {
          "id": "a",
          "text": "P_X(B)=P(X⁻¹(B))=P(X∈B)"
        },
        {
          "id": "b",
          "text": "P_X(B)=P(X∈B)/2"
        },
        {
          "id": "c",
          "text": "P_X(B)=1 para todo o B não vazio e P_X(∅)=0"
        },
        {
          "id": "d",
          "text": "P_X(B)=P(X∉B)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A distribuição transfere probabilidades de acontecimentos em Ω para conjuntos mensuráveis de valores possíveis de X, através de imagens inversas: P_X(B)=P({ω:X(ω)∈B}).",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 24,
          "anchor": "distribuição-de-um-elemento-aleatório"
        }
      ]
    },
    {
      "id": "bank00-017",
      "type": "multiple-choice",
      "topic": "Distribuições e transformações",
      "difficulty": "core",
      "context": [
        {
          "label": "Enquadramento",
          "text": "Seja X:(Ω,ℱ,P)→(S,𝒮) um elemento aleatório e seja g:(S,𝒮)→(T,𝒯) uma aplicação mensurável. Defina Y=g∘X. Denotem-se por P_X e P_Y as respetivas distribuições."
        }
      ],
      "prompt": "Que fórmula dá P_Y(C) para todo o C∈𝒯?",
      "options": [
        {
          "id": "a",
          "text": "P_Y(C)=P_X(g⁻¹(C))"
        },
        {
          "id": "b",
          "text": "P_Y(C)=P_X(S∖g⁻¹(C))"
        },
        {
          "id": "c",
          "text": "P_Y(C)=P_X(g⁻¹(C))/2"
        },
        {
          "id": "d",
          "text": "P_Y(C)=P_X(S)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "O acontecimento {ω:g(X(ω))∈C} é exatamente {ω:X(ω)∈g⁻¹(C)}. Assim, P_Y(C)=P_X(g⁻¹(C)). A mensurabilidade de g garante que g⁻¹(C)∈𝒮, onde P_X está definida.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 25,
          "anchor": "transformações-mensuráveis"
        }
      ]
    },
    {
      "id": "bank00-018",
      "type": "numeric-input",
      "topic": "Exemplo das moedas",
      "difficulty": "intro",
      "prompt": "Os quatro resultados TT, HT, TH e HH têm probabilidade 1/4 cada um; H representa cara e T representa coroa. Se X conta o número de caras, qual é o valor de P(X=1)?",
      "acceptedAnswers": [
        "0.5",
        ".5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "1/2",
      "explanation": "O acontecimento X=1 tem imagem inversa {HT,TH}. Estes dois resultados têm probabilidade total 2/4=1/2.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 26,
          "anchor": "exemplo-lançamento-de-moedas"
        }
      ]
    },
    {
      "id": "bank00-019",
      "type": "numeric-input",
      "topic": "Exemplo das moedas",
      "difficulty": "core",
      "prompt": "O espaço de resultados é Ω={TT,HT,TH,HH}, com os quatro resultados equiprováveis; H representa cara e T representa coroa. Seja X o número de caras. Defina Y=1 se X≥1 e Y=0 caso contrário. Qual é o valor de P(Y=1)?",
      "acceptedAnswers": [
        "0.75",
        ".75",
        "3/4",
        "75%"
      ],
      "correctAnswer": "3/4",
      "explanation": "A variável Y vale um para HT, TH e HH, e zero para TT. Logo, P(Y=1)=P(X≥1)=3/4. Esta variável que toma apenas os valores zero e um também se escreve como a indicatriz 1{X≥1}.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 26,
          "anchor": "exemplo-lançamento-de-moedas"
        }
      ]
    },
    {
      "id": "bank00-020",
      "type": "multiple-choice",
      "topic": "Propriedades das FD",
      "difficulty": "intro",
      "prompt": "Seja X uma variável aleatória real e seja x∈ℝ. Que probabilidade define a sua função de distribuição F_X(x)?",
      "options": [
        {
          "id": "a",
          "text": "P(X≤x)"
        },
        {
          "id": "b",
          "text": "P(X=x)"
        },
        {
          "id": "c",
          "text": "P(X>x)"
        },
        {
          "id": "d",
          "text": "P(X≥x)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma função de distribuição acumula a probabilidade de todos os valores até x, incluindo x: F_X(x)=P(X≤x).",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 27,
          "anchor": "funções-de-distribuição"
        }
      ]
    },
    {
      "id": "bank00-021",
      "type": "find-the-intruder",
      "topic": "Propriedades das FD",
      "difficulty": "intro",
      "prompt": "Que propriedade NÃO é exigida a toda a função de distribuição (FD)?",
      "options": [
        {
          "id": "a",
          "text": "É não decrescente"
        },
        {
          "id": "b",
          "text": "É contínua à direita"
        },
        {
          "id": "c",
          "text": "Os seus limites em −∞ e +∞ são 0 e 1"
        },
        {
          "id": "d",
          "text": "É contínua em todos os números reais"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "As funções de distribuição podem ter saltos, como no exemplo das moedas. Exige-se continuidade à direita, mas não continuidade dos dois lados em todos os pontos.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 27,
          "anchor": "funções-de-distribuição"
        }
      ]
    },
    {
      "id": "bank00-022",
      "type": "proof-step",
      "topic": "Propriedades das FD",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja X uma variável aleatória real e seja F_X(x)=P(X≤x) a sua função de distribuição. Então F_X é contínua à direita: para todo o x real, F_X(x+h) tende para F_X(x) quando h positivo decresce para 0."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe x∈ℝ e uma sucessão arbitrária hₙ>0 decrescente para 0. Defina Aₙ={X≤x+hₙ}. A continuidade da probabilidade afirma que, se os acontecimentos Aₙ decrescem para um acontecimento B, isto é, Aₙ⊇Aₙ₊₁ e a interseção de todos os Aₙ é B, então P(Aₙ) decresce para P(B)."
        }
      ],
      "prompt": "Que relação entre acontecimentos permite aplicar este resultado?",
      "options": [
        {
          "id": "a",
          "text": "Os acontecimentos Aₙ decrescem para {X≤x}."
        },
        {
          "id": "b",
          "text": "Os acontecimentos Aₙ crescem para {X≤x}."
        },
        {
          "id": "c",
          "text": "Os acontecimentos Aₙ são disjuntos dois a dois e têm união {X≤x}."
        },
        {
          "id": "d",
          "text": "Os acontecimentos Aₙ decrescem para ∅ para todo o x real."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Os limiares x+hₙ decrescem. Um resultado pertence a todos os Aₙ se e só se X≤x: se X>x, a partir de certa ordem tem-se hₙ<X−x e esse resultado fica excluído. Assim, P(Aₙ)=F_X(x+hₙ) decresce para P(X≤x)=F_X(x). Como a sucessão positiva decrescente para 0 era arbitrária, fica provada a continuidade à direita.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 28,
          "anchor": "continuidade-à-direita-e-limites-nos-extremos"
        }
      ]
    },
    {
      "id": "bank00-023",
      "type": "multiple-choice",
      "topic": "Limites das FD e átomos",
      "difficulty": "intro",
      "prompt": "Seja X uma variável aleatória real com função de distribuição F_X. Para x∈ℝ, que probabilidade é sempre igual ao limite à esquerda F_X(x⁻)=lim(t↗x)F_X(t)?",
      "options": [
        {
          "id": "a",
          "text": "P(X<x)"
        },
        {
          "id": "b",
          "text": "P(X=x)"
        },
        {
          "id": "c",
          "text": "P(X>x)"
        },
        {
          "id": "d",
          "text": "P(X≤x), mesmo quando P(X=x)>0"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A aproximação a x pela esquerda inclui os valores estritamente inferiores a x, mas exclui a massa em x. Logo, F_X(x⁻)=P(X<x).",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 29,
          "anchor": "limites-à-esquerda-e-probabilidades-pontuais"
        }
      ]
    },
    {
      "id": "bank00-024",
      "type": "numeric-input",
      "topic": "Limites das FD e átomos",
      "difficulty": "core",
      "prompt": "Uma função de distribuição salta de F_X(3⁻)=0.40 para F_X(3)=0.65. Qual é o valor de P(X=3)?",
      "acceptedAnswers": [
        "0.25",
        ".25",
        "1/4",
        "25%"
      ],
      "correctAnswer": "0.25",
      "explanation": "A probabilidade de um átomo é a amplitude do salto: P(X=3)=F_X(3)−F_X(3⁻)=0.65−0.40=0.25.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 30,
          "anchor": "átomos-e-saltos-da-função-de-distribuição"
        }
      ]
    },
    {
      "id": "bank00-025",
      "type": "numeric-input",
      "topic": "Probabilidades de intervalos",
      "difficulty": "intro",
      "prompt": "F_X(2)=0.45 e F_X(5)=0.80. Calcule P(2<X≤5).",
      "acceptedAnswers": [
        "0.35",
        ".35",
        "7/20",
        "35%"
      ],
      "correctAnswer": "0.35",
      "explanation": "Subtraia a probabilidade dos valores até 2, incluindo 2, à probabilidade dos valores até 5: P(2<X≤5)=F_X(5)−F_X(2)=0.35.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 31,
          "anchor": "probabilidades-de-intervalos-a-partir-da-fd"
        }
      ]
    },
    {
      "id": "bank00-026",
      "type": "numeric-input",
      "topic": "Probabilidades de intervalos",
      "difficulty": "core",
      "prompt": "F_X(2⁻)=0.30, F_X(2)=0.45 e F_X(5)=0.80. Calcule P(2≤X≤5).",
      "acceptedAnswers": [
        "0.5",
        "0.50",
        ".5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "0.50",
      "explanation": "Desta vez, o intervalo inclui o átomo em 2. Use o limite à esquerda: P(2≤X≤5)=F_X(5)−F_X(2⁻)=0.80−0.30=0.50.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 31,
          "anchor": "probabilidades-de-intervalos-a-partir-da-fd"
        }
      ]
    },
    {
      "id": "bank00-027",
      "type": "proof-step",
      "topic": "Descontinuidades das FD",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Para qualquer variável aleatória real X, a sua função de distribuição F_X(x)=P(X≤x) tem no máximo um número numerável de descontinuidades. Aqui, «no máximo numerável» inclui tanto um conjunto finito como um conjunto infinito numerável."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Um átomo é um ponto x com P(X=x)>0. Já provámos que as descontinuidades da FD são exatamente os saltos nos átomos, com amplitude P(X=x).\nPara cada inteiro m≥1, seja Dₘ={x∈ℝ:P(X=x)≥1/m}. Dₘ tem no máximo m pontos: caso contrário, m+1 acontecimentos disjuntos {X=x} teriam probabilidade total de pelo menos (m+1)/m>1. Logo, cada Dₘ é finito."
        }
      ],
      "prompt": "Como é que o facto de os Dₘ serem finitos permite concluir a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "Cada átomo pertence a algum Dₘ; logo, o conjunto dos átomos é a união numerável D₁∪D₂∪⋯ de conjuntos finitos."
        },
        {
          "id": "b",
          "text": "Uma união crescente de conjuntos finitos é sempre finita, pelo que há apenas um número finito de átomos."
        },
        {
          "id": "c",
          "text": "Cada átomo pertence a D₁, pelo que existe no máximo um átomo."
        },
        {
          "id": "d",
          "text": "Cada átomo tem de ter probabilidade exatamente 1/m para algum inteiro m≥1."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Se um átomo tem probabilidade p>0, escolha um inteiro m≥1/p. Então 1/m≤p, pelo que o átomo pertence a Dₘ. Reciprocamente, cada ponto de qualquer Dₘ tem probabilidade positiva e é um átomo. Assim, os átomos formam exatamente D₁∪D₂∪⋯, conjunto no máximo numerável por ser uma união numerável de conjuntos finitos. As descontinuidades ocorrem exatamente nesses átomos.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 32,
          "anchor": "número-de-descontinuidades-da-fd"
        }
      ]
    },
    {
      "id": "bank00-028",
      "type": "multiple-choice",
      "topic": "Quantis",
      "difficulty": "intro",
      "prompt": "Para 0<u<1, que expressão define a inversa generalizada Q(u)=F⁻¹(u) de uma função de distribuição?",
      "options": [
        {
          "id": "a",
          "text": "inf{x∈ℝ : F(x)≥u}"
        },
        {
          "id": "b",
          "text": "1/F(u)"
        },
        {
          "id": "c",
          "text": "F(1/u)"
        },
        {
          "id": "d",
          "text": "A única solução de F(x)=u, que tem de existir sempre"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A inversa generalizada toma o ponto mais à esquerda em que a função de distribuição atinge ou ultrapassa u. Continua a fazer sentido quando a FD tem saltos ou patamares.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 33,
          "anchor": "a-inversa-generalizada"
        }
      ]
    },
    {
      "id": "bank00-029",
      "type": "numeric-input",
      "topic": "Quantis",
      "difficulty": "core",
      "prompt": "X tem massas 1/4 em 0, 1/2 em 1 e 1/4 em 2. Qual é o valor de Q(0.5)=inf{x:F_X(x)≥0.5}?",
      "acceptedAnswers": [
        "1",
        "1.0"
      ],
      "correctAnswer": "1",
      "explanation": "F_X(0)=1/4 é inferior a 0.5, enquanto F_X(1)=3/4 já atinge esse nível. O primeiro ponto em que esse nível é atingido ou ultrapassado é 1.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 36,
          "anchor": "saltos-da-fd-e-patamares-dos-quantis"
        }
      ]
    },
    {
      "id": "bank00-030",
      "type": "numeric-input",
      "topic": "Quantis",
      "difficulty": "core",
      "prompt": "X tem massas 1/4 em 0, 1/2 em 1 e 1/4 em 2. Qual é o valor de Q(1/4)? Tenha em atenção o símbolo ≥ na definição.",
      "acceptedAnswers": [
        "0",
        "0.0"
      ],
      "correctAnswer": "0",
      "explanation": "A função de distribuição já atinge 1/4 em x=0, pelo que Q(1/4)=0. O patamar seguinte de Q começa para u estritamente superior a 1/4.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 36,
          "anchor": "saltos-da-fd-e-patamares-dos-quantis"
        }
      ]
    },
    {
      "id": "bank00-031",
      "type": "proof-step",
      "topic": "Demonstrações sobre quantis",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja F:ℝ→[0,1] não decrescente e contínua à direita, com limites 0 em −∞ e 1 em +∞. Para 0<u<1, defina Q(u)=inf{x∈ℝ:F(x)≥u}, onde inf designa o ínfimo, isto é, o maior minorante. Então Q(u) é finito e F(Q(u))≥u."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe u∈(0,1) e seja E={x∈ℝ:F(x)≥u}. Os limites nos extremos garantem que E é não vazio e limitado inferiormente, pelo que q=inf E é finito.\nPara todo o n≥1, a definição de ínfimo fornece yₙ∈E com q≤yₙ<q+1/n. Como F é não decrescente, F(q+1/n)≥F(yₙ)≥u."
        }
      ],
      "prompt": "Que argumento prova a conclusão que falta, F(q)≥u?",
      "options": [
        {
          "id": "a",
          "text": "A continuidade à direita dá F(q)=limₙ F(q+1/n)≥u."
        },
        {
          "id": "b",
          "text": "A monotonia dá F(q)≥F(q+1/n)≥u porque q≤q+1/n."
        },
        {
          "id": "c",
          "text": "O limite de F em +∞ implica F(q)=1 para este q finito."
        },
        {
          "id": "d",
          "text": "A definição de ínfimo, por si só, implica F(q)=u para qualquer FD."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Os pontos q+1/n aproximam-se de q pela direita, e os seus valores de F são todos pelo menos u. A continuidade à direita dá, portanto, F(q)≥u. A monotonia, por si só, dá a desigualdade oposta, F(q)≤F(q+1/n). O nível não tem de ser atingido com igualdade: um salto pode dar F(q)>u.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 33,
          "anchor": "a-inversa-generalizada"
        }
      ]
    },
    {
      "id": "bank00-032",
      "type": "proof-step",
      "topic": "Demonstrações sobre quantis",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja F uma função de distribuição e seja Q(u)=inf{x∈ℝ:F(x)≥u} para 0<u<1. Então Q:(0,1)→ℝ é Borel mensurável. Se U toma valores em (0,1) e é uniforme nesse intervalo, isto é, P(U≤t)=t para todo o 0≤t≤1, então Q(U) tem função de distribuição F."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Sabemos que F(Q(u))≥u. Se Q(u)≤x, a monotonia dá F(x)≥F(Q(u))≥u. Reciprocamente, se u≤F(x), então x pertence ao conjunto cujo ínfimo define Q(u), pelo que Q(u)≤x. Assim, Q(u)≤x se e só se u≤F(x).\nSegue-se que Q⁻¹((−∞,x])=(0,1)∩(0,F(x)], um conjunto de Borel. Como estas semirretas geram a σ-álgebra de Borel de ℝ, Q é mensurável. Resta calcular a FD de Q(U)."
        }
      ],
      "prompt": "O que completa o cálculo P(Q(U)≤x)=… para um x real arbitrário?",
      "options": [
        {
          "id": "a",
          "text": "P(U≤F(x))=F(x)."
        },
        {
          "id": "b",
          "text": "P(U>F(x))=1−F(x)."
        },
        {
          "id": "c",
          "text": "P(U=F(x))=0."
        },
        {
          "id": "d",
          "text": "P(U≤F(x)/2)=F(x)/2."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Aplique a equivalência demonstrada com u=U: {Q(U)≤x}={U≤F(x)}. Como 0≤F(x)≤1, a fórmula que define a distribuição uniforme dá P(U≤F(x))=F(x), incluindo os valores extremos 0 e 1. Logo, a FD da variável aleatória mensurável Q(U) é F.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 34,
          "anchor": "construção-pela-transformação-inversa"
        }
      ]
    },
    {
      "id": "bank00-033",
      "type": "multiple-choice",
      "topic": "Quantis",
      "difficulty": "core",
      "prompt": "Seja F uma função de distribuição. Que propriedades tem sempre a sua inversa generalizada Q(u)=inf{x∈ℝ:F(x)≥u} para 0<u<1?",
      "options": [
        {
          "id": "a",
          "text": "É não decrescente e contínua à esquerda"
        },
        {
          "id": "b",
          "text": "É estritamente crescente e diferenciável em todos os pontos"
        },
        {
          "id": "c",
          "text": "É decrescente e contínua à direita"
        },
        {
          "id": "d",
          "text": "Tem de ser contínua dos dois lados em todos os pontos"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Aumentar o nível de probabilidade não pode deslocar para a esquerda o primeiro ponto que atinge esse nível. A inversa generalizada é contínua à esquerda; pode ter saltos à direita quando a FD tem patamares.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 35,
          "anchor": "continuidade-dos-quantis"
        }
      ]
    },
    {
      "id": "bank00-034",
      "type": "find-the-intruder",
      "topic": "Distribuições discretas",
      "difficulty": "intro",
      "prompt": "Que afirmação NÃO faz parte da definição de uma distribuição de probabilidade discreta?",
      "options": [
        {
          "id": "a",
          "text": "As suas massas são não negativas"
        },
        {
          "id": "b",
          "text": "A soma das suas massas é um"
        },
        {
          "id": "c",
          "text": "Toda a probabilidade está concentrada num conjunto finito ou numerável de pontos"
        },
        {
          "id": "d",
          "text": "A sua função de probabilidade tem de ser contínua em ℝ"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Uma distribuição discreta tem a forma Σⱼpⱼδₓⱼ, com massas não negativas cuja soma é um. Não se exige que a função de probabilidade seja contínua em ℝ.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 37,
          "anchor": "distribuições-discretas"
        }
      ]
    },
    {
      "id": "bank00-035",
      "type": "numeric-input",
      "topic": "Densidades",
      "difficulty": "intro",
      "prompt": "U é uniforme em (0,1/2), com densidade 2 em todo esse intervalo. Qual é o valor de P(U=1/4)?",
      "acceptedAnswers": [
        "0",
        "0.0",
        "0%"
      ],
      "correctAnswer": "0",
      "explanation": "Numa distribuição absolutamente contínua, um ponto isolado tem probabilidade zero. O valor 2 da densidade não é uma probabilidade pontual; as probabilidades obtêm-se por integração sobre conjuntos.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 39,
          "anchor": "derivadas-de-radonnikodym"
        }
      ]
    },
    {
      "id": "bank00-036",
      "type": "multiple-choice",
      "topic": "Densidades",
      "difficulty": "core",
      "context": [
        {
          "label": "Terminologia",
          "text": "Uma afirmação é válida para Lebesgue-quase todo o x se for válida fora de um conjunto que, para qualquer ε>0, pode ser coberto por uma família numerável de intervalos de comprimento total inferior a ε. Diz-se que esse conjunto excecional tem medida de Lebesgue zero."
        }
      ],
      "prompt": "Seja X uma variável com distribuição absolutamente contínua, densidade f_X e função de distribuição F_X. Que afirmação é garantida?",
      "options": [
        {
          "id": "a",
          "text": "F_X′(x)=f_X(x) para Lebesgue-quase todo o x"
        },
        {
          "id": "b",
          "text": "F_X′(x)=P(X=x) para todo o x"
        },
        {
          "id": "c",
          "text": "F_X(x)=f_X(x) para todo o x"
        },
        {
          "id": "d",
          "text": "f_X(x) tem de ser no máximo um em cada x"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Como F_X(x)=∫₋∞ˣf_X(t)dt, a sua derivada é igual a f_X quase em toda a parte, e também em cada ponto de continuidade de f_X. Uma densidade pode exceder um; por exemplo, a distribuição uniforme em (0,1/2) tem densidade 2 nesse intervalo.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 39,
          "anchor": "derivadas-de-radonnikodym"
        }
      ]
    },
    {
      "id": "bank00-037",
      "type": "numeric-input",
      "topic": "Distribuição uniforme",
      "difficulty": "intro",
      "prompt": "Uma densidade é dada por f_X(x)=c em [−2,2] e zero fora desse intervalo. Qual é o valor de c?",
      "acceptedAnswers": [
        "0.25",
        ".25",
        "1/4"
      ],
      "correctAnswer": "1/4",
      "explanation": "O intervalo tem comprimento 4. O integral da densidade tem de ser um, pelo que 4c=1 e c=1/4.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 40,
          "anchor": "ficha-1-distribuição-uniforme-em--22"
        }
      ]
    },
    {
      "id": "bank00-038",
      "type": "numeric-input",
      "topic": "Distribuição uniforme",
      "difficulty": "core",
      "prompt": "X é uniforme em [−2,2], com função de distribuição F_X(x)=0 para x<−2, F_X(x)=(x+2)/4 para −2≤x≤2 e F_X(x)=1 para x>2. Calcule o quantil de ordem 0.95, Q(0.95)=inf{x∈ℝ:F_X(x)≥0.95}.",
      "acceptedAnswers": [
        "1.8",
        "1.80",
        "9/5"
      ],
      "correctAnswer": "1.8",
      "explanation": "Resolva (x+2)/4=0.95: x=4·0.95−2=1.8. A FD é estritamente crescente em [−2,2], pelo que este é o primeiro ponto em que atinge 0.95.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 40,
          "anchor": "ficha-1-distribuição-uniforme-em--22"
        }
      ]
    },
    {
      "id": "bank00-039",
      "type": "numeric-input",
      "topic": "Distribuições mistas",
      "difficulty": "core",
      "context": [
        {
          "label": "Enquadramento",
          "text": "Seja μ a distribuição de probabilidade uniforme em (0,1): a sua densidade é 1 em (0,1) e 0 fora desse intervalo. Seja δ₀ a massa pontual em 0, pelo que δ₀(A)=1 se 0∈A e 0 caso contrário. A mistura P_X=0.3δ₀+0.7μ significa que P_X(A)=0.3δ₀(A)+0.7μ(A) para todo o conjunto de Borel A."
        }
      ],
      "prompt": "Para esta distribuição, qual é o valor da função de distribuição F_X(0.5)=P(X≤0.5)?",
      "acceptedAnswers": [
        "0.65",
        ".65",
        "13/20",
        "65%"
      ],
      "correctAnswer": "0.65",
      "explanation": "Inclua o átomo em 0 e metade da componente uniforme: F_X(0.5)=0.3+0.7·0.5=0.65.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 41,
          "anchor": "uma-distribuição-mista"
        }
      ]
    },
    {
      "id": "bank00-040",
      "type": "multiple-choice",
      "topic": "Distribuições mistas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Notação",
          "text": "δ₀ é a medida de probabilidade de Dirac em 0: δ₀(A)=1 se 0∈A e 0 caso contrário. U(0,1) designa a distribuição de probabilidade com densidade 1 em (0,1) e 0 fora desse intervalo. A mistura πδ₀+(1−π)U(0,1) atribui a um conjunto de Borel A a probabilidade πδ₀(A)+(1−π)U(0,1)(A)."
        }
      ],
      "prompt": "Para 0<π<1, como deve ser classificada a distribuição P_X=πδ₀+(1−π)U(0,1)?",
      "options": [
        {
          "id": "a",
          "text": "Nem discreta nem absolutamente contínua: tem um átomo e uma componente uniforme"
        },
        {
          "id": "b",
          "text": "Discreta, porque tem um átomo"
        },
        {
          "id": "c",
          "text": "Absolutamente contínua, porque parte dela é uniforme"
        },
        {
          "id": "d",
          "text": "Simultaneamente discreta e absolutamente contínua"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A massa positiva em 0 impede a continuidade absoluta. A componente uniforme atribui probabilidade zero a qualquer conjunto numerável, pelo que qualquer conjunto numerável tem probabilidade P_X no máximo π<1. Assim, a distribuição também não é discreta.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 41,
          "anchor": "uma-distribuição-mista"
        }
      ]
    }
  ],
  "editorialNotes": [
    "Reviewed in parallel for mathematical rigour against slides 12–41; assumptions, domains, inverse images, and distribution notation are explicit where needed.",
    "All 14 numerical exercises were checked independently; generalized-inverse questions use the infimum and ≥ convention from slide 33, including the boundary Q(1/4)=0 in the coin example.",
    "Additional short setup panels define notation already used in the lecture. Proof panels preserve the theorem and prior steps while leaving a short completion task."
  ],
  "locale": "pt-PT",
  "translationNotes": {
    "from": "exercises-bank-0.js",
    "language": "pt-PT",
    "sourceSha256": "4b01ea63b6c26bf2417d339818bf6bc11ccad15d71a1bedd50e263d9029f61d0",
    "englishQuestionCount": 40,
    "adaptations": "Mantiveram-se as hipóteses e as explicações matemáticas; a notação H/T das moedas é explicitada quando necessário."
  }
};
