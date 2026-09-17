window.LECTURE_2_EXERCISE_BANK = {
  "schemaVersion": 1,
  "block": {
    "id": "lecture-2",
    "title": "Aula 2",
    "description": "Slides 42–70: distribuições conjuntas, condicionamento, independência, funções de probabilidade, densidades e fórmula de Bayes",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../../pt/index.html#/vetores-aleatórios-e-independência",
    "featuredTopics": [
      "FD conjuntas",
      "Probabilidade condicionada",
      "Independência",
      "Funções de probabilidade",
      "Densidades condicionadas",
      "Fórmula de Bayes"
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
    "lecture-2-slides": {
      "title": "Inferência Estatística 2026 — Semanas 1–2, Aula 2",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../../pt/index.html",
      "slideRange": [
        42,
        70
      ],
      "deckSha256": "def6d2253263b7deff21bf8dede330bfa2d37c363bd5ee2498f4ffc85673f15a",
      "sourceFile": "slides-2026-weeks-1-2/pt/index.qmd",
      "renderedSourceFile": "slides/si-2026/weeks-1-2/pt/index.html"
    }
  },
  "exercises": [
    {
      "id": "lec02-001",
      "type": "multiple-choice",
      "topic": "FD conjuntas",
      "difficulty": "intro",
      "prompt": "Para um vetor aleatório (X,Y), que expressão define a sua função de distribuição conjunta F(x,y)?",
      "options": [
        {
          "id": "a",
          "text": "P(X≤x ou Y≤y)"
        },
        {
          "id": "b",
          "text": "P(X=x e Y=y)"
        },
        {
          "id": "c",
          "text": "P(X≤x e Y≤y)"
        },
        {
          "id": "d",
          "text": "P(X≤x)P(Y≤y), sem qualquer hipótese de independência"
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Uma FD conjunta dá a probabilidade de todas as desigualdades nas coordenadas serem satisfeitas simultaneamente: F(x,y)=P((X,Y)∈(−∞,x]×(−∞,y]). A fatorização nas FD marginais para todos os x,y caracteriza a independência; não é a definição geral.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 43,
          "anchor": "vetores-aleatórios-e-funções-de-distribuição-conjuntas"
        }
      ]
    },
    {
      "id": "lec02-002",
      "type": "numeric-input",
      "topic": "FD conjuntas",
      "difficulty": "core",
      "prompt": "O vetor aleatório (X,Y) toma os valores (0,0), (0,2), (1,1) e (2,0), cada um com probabilidade 1/4. Calcule a sua FD conjunta F(1,1)=P(X≤1,Y≤1).",
      "acceptedAnswers": [
        "0.5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "0.5",
      "explanation": "Apenas (0,0) e (1,1) satisfazem ambas as desigualdades. A soma das suas probabilidades é 1/4+1/4=1/2. O ponto (0,2) não satisfaz a desigualdade em Y e (2,0) não satisfaz a desigualdade em X.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 43,
          "anchor": "vetores-aleatórios-e-funções-de-distribuição-conjuntas"
        }
      ]
    },
    {
      "id": "lec02-003",
      "type": "multiple-choice",
      "topic": "FD conjuntas",
      "difficulty": "core",
      "prompt": "Seja F a FD conjunta de (X,Y). Para x,y reais fixos e hₙ positivos decrescentes para zero, qual é o valor de limₙ F(x−hₙ,y−hₙ)? Não se assume continuidade.",
      "options": [
        {
          "id": "a",
          "text": "P(X≤x,Y≤y), sempre"
        },
        {
          "id": "b",
          "text": "P(X<x,Y<y)"
        },
        {
          "id": "c",
          "text": "P(X<x,Y≤y), sempre"
        },
        {
          "id": "d",
          "text": "P(X=x,Y=y)"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Os retângulos inferiores (−∞,x−hₙ]×(−∞,y−hₙ] crescem para (−∞,x)×(−∞,y). A continuidade da probabilidade para acontecimentos crescentes dá P(X<x,Y<y), com ambas as desigualdades estritas. A massa na fronteira pode impedir que este valor seja igual a F(x,y).",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 44,
          "anchor": "fd-conjuntas-limites-laterais"
        }
      ]
    },
    {
      "id": "lec02-004",
      "type": "proof-step",
      "topic": "FD conjuntas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja Z=(X,Y) um vetor aleatório com FD conjunta F. Fixe z=(x,y) e sejam S=(−∞,x]×(−∞,y] e S°=(−∞,x)×(−∞,y). Se P(Z∈S∖S°)=0, então F é contínua em z."
        },
        {
          "label": "Demonstração até aqui",
          "text": "A hipótese dá P(Z∈S°)=P(Z∈S)=F(x,y). O resultado sobre limites laterais dá, portanto, F(x−h,y−h)→F(x,y) e F(x+h,y+h)→F(x,y) quando h decresce para zero. Consideramos agora um (u,v) arbitrário com |u−x|<h e |v−y|<h; F é não decrescente em cada coordenada."
        }
      ],
      "prompt": "Que enquadramento completa a demonstração, colocando F(u,v) entre quantidades que convergem para F(x,y)?",
      "options": [
        {
          "id": "a",
          "text": "F(x−h,y−h)≤F(u,v)≤F(x+h,y+h)"
        },
        {
          "id": "b",
          "text": "F(x+h,y+h)≤F(u,v)≤F(x−h,y−h)"
        },
        {
          "id": "c",
          "text": "F(x−h,y+h)≤F(u,v)≤F(x+h,y−h)"
        },
        {
          "id": "d",
          "text": "F(u,v)=F(x,y) para todo o h>0 e todo o (u,v) nessas condições"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "As desigualdades x−h<u<x+h e y−h<v<y+h dão o primeiro enquadramento pela monotonia em cada coordenada. Ambos os extremos convergem para F(x,y), pelo que, para qualquer ε>0, h suficientemente pequeno faz com que todos esses F(u,v) distem menos de ε de F(x,y). Isto prova a continuidade em todas as direções, não apenas ao longo da diagonal.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 45,
          "anchor": "continuidade-de-uma-fd-conjunta"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 44,
          "anchor": "fd-conjuntas-limites-laterais"
        }
      ]
    },
    {
      "id": "lec02-005",
      "type": "multiple-choice",
      "topic": "Distribuições marginais",
      "difficulty": "intro",
      "prompt": "Seja F(x,y)=P(X≤x,Y≤y) uma FD conjunta. Como se pode obter a FD marginal F_X(x)=P(X≤x)?",
      "options": [
        {
          "id": "a",
          "text": "F_X(x)=F(x,0) para qualquer distribuição conjunta"
        },
        {
          "id": "b",
          "text": "F_X(x)=lim quando y→−∞ de F(x,y)"
        },
        {
          "id": "c",
          "text": "F_X(x)=F(x,x) para qualquer distribuição conjunta"
        },
        {
          "id": "d",
          "text": "F_X(x)=lim quando y→+∞ de F(x,y)"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Como Y toma valores reais, a união dos acontecimentos {Y≤n} sobre os inteiros positivos n é Ω. Assim, {X≤x,Y≤n} cresce para {X≤x}, e a continuidade da probabilidade dá o limite indicado. A monotonia estende o resultado a y→+∞. Fixar y em 0 ou em x pode continuar a excluir resultados.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 46,
          "anchor": "distribuições-marginais"
        }
      ]
    },
    {
      "id": "lec02-006",
      "type": "numeric-input",
      "topic": "Probabilidade condicionada",
      "difficulty": "intro",
      "prompt": "Os acontecimentos A e B satisfazem P(B)=0.4 e P(A∩B)=0.1. Qual é o valor de P(A|B)?",
      "acceptedAnswers": [
        "0.25",
        "1/4",
        "25%"
      ],
      "correctAnswer": "0.25",
      "explanation": "Como P(B)>0, a definição dá P(A|B)=P(A∩B)/P(B)=0.1/0.4=0.25. Não é necessária qualquer hipótese de independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 47,
          "anchor": "probabilidade-condicionada"
        }
      ]
    },
    {
      "id": "lec02-007",
      "type": "find-the-intruder",
      "topic": "Probabilidade condicionada",
      "difficulty": "core",
      "prompt": "Sejam A e B acontecimentos com P(A)>0 e P(B)>0. Que identidade NÃO é garantida pela definição de probabilidade condicionada? Aqui, Ω designa todo o espaço de resultados.",
      "options": [
        {
          "id": "a",
          "text": "P(B|B)=1"
        },
        {
          "id": "b",
          "text": "P(A|B)=P(B|A)"
        },
        {
          "id": "c",
          "text": "P(Ω|B)=1"
        },
        {
          "id": "d",
          "text": "P(A∩B)=P(A|B)P(B)"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "As duas probabilidades condicionadas dividem a mesma probabilidade da interseção por denominadores diferentes: P(B) e P(A). Por exemplo, se A⊂B, com P(A)=1/4 e P(B)=1/2, então P(A|B)=1/2, mas P(B|A)=1. As outras três identidades resultam diretamente da definição.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 47,
          "anchor": "probabilidade-condicionada"
        }
      ]
    },
    {
      "id": "lec02-008",
      "type": "multiple-choice",
      "topic": "Independência de acontecimentos",
      "difficulty": "intro",
      "prompt": "Se um acontecimento B satisfaz P(B)=0, que afirmação sobre B e um acontecimento arbitrário A é sempre verdadeira? Use a independência no sentido P(A∩B)=P(A)P(B).",
      "options": [
        {
          "id": "a",
          "text": "A e B são independentes apenas quando A∩B é vazio."
        },
        {
          "id": "b",
          "text": "A e B não podem ser independentes porque P(A|B) não está definida pela fórmula do quociente."
        },
        {
          "id": "c",
          "text": "A e B são independentes porque tanto P(A∩B) como P(A)P(B) são zero."
        },
        {
          "id": "d",
          "text": "A e B são independentes apenas quando P(A)=0."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Como A∩B⊆B, a sua probabilidade é zero. O produto P(A)P(B) também é zero, pelo que a igualdade da definição se verifica para todo o A. O quociente P(A∩B)/P(B) não está definido neste caso, mas a independência não exige esse quociente.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 48,
          "anchor": "acontecimentos-independentes"
        }
      ]
    },
    {
      "id": "lec02-009",
      "type": "numeric-input",
      "topic": "Independência de acontecimentos",
      "difficulty": "core",
      "prompt": "Os acontecimentos A e B são independentes, com P(A)=0.6 e P(B)=0.25. Calcule P(A∩B).",
      "acceptedAnswers": [
        "0.15",
        "3/20",
        "15%"
      ],
      "correctAnswer": "0.15",
      "explanation": "A independência significa P(A∩B)=P(A)P(B), pelo que a resposta é 0.6×0.25=0.15. Esta regra do produto não se deduziria apenas das duas probabilidades marginais.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 48,
          "anchor": "acontecimentos-independentes"
        }
      ]
    },
    {
      "id": "lec02-010",
      "type": "proof-step",
      "topic": "Independência de acontecimentos",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam A,B acontecimentos com 0<P(B)<1 e escreva Bᶜ=Ω∖B. Se P(A|B)=P(A|Bᶜ), então A e B são independentes, isto é, P(A∩B)=P(A)P(B)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Seja α=P(A|B)=P(A|Bᶜ). A decomposição disjunta A=(A∩B)∪(A∩Bᶜ) e a fórmula da probabilidade condicionada dão P(A)=αP(B)+αP(Bᶜ). Além disso, P(A∩B)=αP(B)."
        }
      ],
      "prompt": "Que passo seguinte prova a independência pretendida?",
      "options": [
        {
          "id": "a",
          "text": "P(B)+P(Bᶜ)=0, pelo que P(A)=0."
        },
        {
          "id": "b",
          "text": "B e Bᶜ são independentes porque são disjuntos."
        },
        {
          "id": "c",
          "text": "A igualdade das probabilidades condicionadas obriga a que P(B)=1/2."
        },
        {
          "id": "d",
          "text": "P(B)+P(Bᶜ)=1, pelo que P(A)=α e P(A∩B)=P(A)P(B)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "As probabilidades P(B) e P(Bᶜ) somam um. Logo, a soma ponderada apresentada é α, e substituir α=P(A) em P(A∩B)=αP(B) dá a independência. Ambas as probabilidades condicionadas estão definidas porque 0<P(B)<1.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 49,
          "anchor": "um-critério-de-independência"
        }
      ]
    },
    {
      "id": "lec02-011",
      "type": "numeric-input",
      "topic": "Probabilidade condicionada",
      "difficulty": "core",
      "prompt": "Lança-se um dado equilibrado de seis faces, com resultados {1,2,3,4,5,6}. Sejam A={2,4,6} e C={1,2,3}. Sabendo que C ocorreu, qual é a probabilidade de A?",
      "acceptedAnswers": [
        "1/3",
        "0.3333333333333333"
      ],
      "correctAnswer": "1/3",
      "explanation": "A∩C={2}, pelo que P(A∩C)=1/6 e P(C)=3/6. Consequentemente, P(A|C)=(1/6)/(3/6)=1/3. Apenas um dos três resultados equiprováveis restantes é par.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 50,
          "anchor": "um-dado-independência-e-dependência"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 47,
          "anchor": "probabilidade-condicionada"
        }
      ]
    },
    {
      "id": "lec02-012",
      "type": "find-the-intruder",
      "topic": "Independência de acontecimentos",
      "difficulty": "core",
      "prompt": "Lança-se um dado equilibrado de seis faces e define-se A={2,4,6}. Qual dos acontecimentos NÃO é independente de A?",
      "options": [
        {
          "id": "a",
          "text": "{1,2,3}"
        },
        {
          "id": "b",
          "text": "{1,2}"
        },
        {
          "id": "c",
          "text": "{3,4}"
        },
        {
          "id": "d",
          "text": "{5,6}"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Cada opção com dois elementos contém um resultado par: a sua interseção com A tem probabilidade 1/6=(1/2)(1/3), pelo que é independente de A. Para {1,2,3}, a interseção continua a ter probabilidade 1/6, mas o produto é (1/2)(1/2)=1/4, pelo que não há independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 50,
          "anchor": "um-dado-independência-e-dependência"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 48,
          "anchor": "acontecimentos-independentes"
        }
      ]
    },
    {
      "id": "lec02-013",
      "type": "numeric-input",
      "topic": "Independência de acontecimentos",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Enquadramento",
          "text": "Considere a medida de probabilidade uniforme em Ω=[0,1]: cada intervalo [a,b]⊆[0,1] tem probabilidade b−a. Sejam I=[0,1/3] e J=[1/8,b], com 1/3<b≤1. A independência significa P(I∩J)=P(I)P(J)."
        }
      ],
      "prompt": "Que valor de b torna I e J independentes?",
      "acceptedAnswers": [
        "0.75",
        "3/4",
        "75%"
      ],
      "correctAnswer": "0.75",
      "explanation": "A interseção tem comprimento 1/3−1/8=5/24. O produto das probabilidades dos acontecimentos é (1/3)(b−1/8). Igualando os dois valores, obtém-se b−1/8=5/8 e, portanto, b=3/4. Este valor satisfaz a condição 1/3<b≤1.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 51,
          "anchor": "independência-de-intervalos"
        }
      ]
    },
    {
      "id": "lec02-014",
      "type": "multiple-choice",
      "topic": "FD conjuntas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Enquadramento",
          "text": "O vetor aleatório (X,Y) é igual a (0,−1) com probabilidade 1/2 e a (1,1) com probabilidade 1/2. A sua FD conjunta é F(x,y)=P(X≤x,Y≤y). Observe que P((X,Y)=(0,0))=0."
        }
      ],
      "prompt": "F é contínua em (0,0)?",
      "options": [
        {
          "id": "a",
          "text": "Sim: probabilidade zero no ponto (0,0) garante a continuidade nesse ponto."
        },
        {
          "id": "b",
          "text": "Não: F(0,0)=1/2, enquanto F(−h,0)=0 para todo o h>0."
        },
        {
          "id": "c",
          "text": "Sim: qualquer FD conjunta é contínua nos pontos em que o seu valor está estritamente entre 0 e 1."
        },
        {
          "id": "d",
          "text": "Não: a descontinuidade exige P((X,Y)=(0,0))>0, e aqui essa probabilidade é 1/2."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "O átomo (0,−1) é incluído quando x=0,y=0, mas excluído sempre que x<0. Assim, F(−h,0)=0 não converge para F(0,0)=1/2 quando h decresce para zero. A fronteira relevante de (−∞,0]×(−∞,0] contém (0,−1); não se reduz ao ponto (0,0).",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 45,
          "anchor": "continuidade-de-uma-fd-conjunta"
        }
      ]
    },
    {
      "id": "lec02-015",
      "type": "multiple-choice",
      "topic": "Acontecimentos observados",
      "difficulty": "intro",
      "prompt": "Para uma variável aleatória real X num espaço de probabilidade (Ω,F,P), o que é σ(X)?",
      "options": [
        {
          "id": "a",
          "text": "A coleção de todos os subconjuntos da reta real"
        },
        {
          "id": "b",
          "text": "A menor σ-álgebra sobre Ω que torna X mensurável"
        },
        {
          "id": "c",
          "text": "O conjunto de todos os valores reais que X pode tomar"
        },
        {
          "id": "d",
          "text": "A coleção que contém apenas acontecimentos de probabilidade positiva"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "σ(X) é a σ-álgebra dos acontecimentos determinados pela observação de X. Os seus elementos são X⁻¹(B)={ω∈Ω:X(ω)∈B}, com B um subconjunto de Borel da reta real. É uma coleção de subconjuntos de Ω, não uma coleção de valores possíveis de X.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 52,
          "anchor": "a-sigma-álgebra-gerada-por-variáveis-aleatórias"
        }
      ]
    },
    {
      "id": "lec02-016",
      "type": "find-the-intruder",
      "topic": "Acontecimentos observados",
      "difficulty": "core",
      "context": [
        {
          "label": "Observação",
          "text": "Seja Ω=[0,1]. Defina X(ω)=1 para 0≤ω<1/2 e X(ω)=2 para 1/2≤ω≤1. Os acontecimentos de σ(X) são as imagens inversas X⁻¹(B), em que B é um subconjunto de Borel da reta real."
        }
      ],
      "prompt": "Qual dos acontecimentos NÃO pertence a σ(X)?",
      "options": [
        {
          "id": "a",
          "text": "[0,1/2)"
        },
        {
          "id": "b",
          "text": "[1/2,1]"
        },
        {
          "id": "c",
          "text": "{1/2}"
        },
        {
          "id": "d",
          "text": "[0,1]"
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Uma imagem inversa por X tem de incluir todos ou nenhum dos pontos de cada conjunto de nível [0,1/2) e [1/2,1]. O conjunto singular {1/2} corta o segundo conjunto de nível e não pode ser determinado a partir de X. Os quatro acontecimentos possíveis são ∅, os dois conjuntos de nível e Ω.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 53,
          "anchor": "exemplo-acontecimentos-determinados-por-uma-observação"
        }
      ]
    },
    {
      "id": "lec02-017",
      "type": "multiple-choice",
      "topic": "Critérios de independência",
      "difficulty": "intro",
      "context": [
        {
          "label": "Notação",
          "text": "Para variáveis aleatórias reais X₁,X₂,…, σ(Xᵢ) é a σ-álgebra gerada por Xᵢ. Um conjunto finito I de índices distintos seleciona uma subfamília finita destas variáveis."
        }
      ],
      "prompt": "Que condição define a independência de toda a sucessão X₁,X₂,…?",
      "options": [
        {
          "id": "a",
          "text": "Para todo o I finito não vazio e toda a escolha Aᵢ∈σ(Xᵢ), a probabilidade da interseção dos Aᵢ, i∈I, é igual ao produto das suas probabilidades."
        },
        {
          "id": "b",
          "text": "A mesma fatorização verifica-se apenas quando I tem exatamente dois índices."
        },
        {
          "id": "c",
          "text": "A mesma fatorização verifica-se para pelo menos uma escolha de acontecimentos para cada I."
        },
        {
          "id": "d",
          "text": "Todas as variáveis têm a mesma distribuição."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A independência exige a regra do produto para qualquer subfamília finita e qualquer escolha de um acontecimento de cada σ-álgebra correspondente. Testar apenas pares dá independência dois a dois, uma propriedade mais fraca. Distribuições iguais não implicam independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 54,
          "anchor": "independência-de-classes-e-sucessões"
        }
      ]
    },
    {
      "id": "lec02-018",
      "type": "proof-step",
      "topic": "Critérios de independência",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam X₁,…,Xₙ variáveis aleatórias reais independentes, com n≥2. Escreva F(x₁,…,xₙ)=P(X₁≤x₁,…,Xₙ≤xₙ) e Fᵢ(xᵢ)=P(Xᵢ≤xᵢ). Então F(x₁,…,xₙ)=∏ᵢ₌₁ⁿ Fᵢ(xᵢ) para quaisquer x₁,…,xₙ reais."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe x₁,…,xₙ reais e defina Aᵢ={Xᵢ≤xᵢ}. A semirreta (−∞,xᵢ] é de Borel, pelo que Aᵢ pertence a σ(Xᵢ). Pela definição da FD conjunta, F(x₁,…,xₙ)=P(A₁∩⋯∩Aₙ)."
        }
      ],
      "prompt": "Que passo seguinte completa a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "Os Aᵢ são disjuntos, pelo que P(A₁∩⋯∩Aₙ)=∑ᵢ₌₁ⁿ P(Aᵢ)."
        },
        {
          "id": "b",
          "text": "Todos os Aᵢ têm probabilidades iguais, pelo que a interseção tem essa probabilidade comum."
        },
        {
          "id": "c",
          "text": "A continuidade à direita de cada FD marginal torna a probabilidade de qualquer interseção num produto."
        },
        {
          "id": "d",
          "text": "A independência de σ(X₁),…,σ(Xₙ) dá P(A₁∩⋯∩Aₙ)=∏ᵢ₌₁ⁿ P(Aᵢ)=∏ᵢ₌₁ⁿ Fᵢ(xᵢ)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Cada Aᵢ pertence à σ-álgebra correspondente, pelo que a independência se aplica diretamente. Independência não significa disjunção nem igualdade das distribuições marginais; a continuidade à direita, por si só, não fornece uma regra do produto.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 55,
          "anchor": "independência-e-fd-conjuntas"
        }
      ]
    },
    {
      "id": "lec02-019",
      "type": "multiple-choice",
      "topic": "Critérios de independência",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Experiência",
          "text": "Lançam-se duas moedas equilibradas independentes. X e Y registam os resultados em {H,T}, sendo H cara e T coroa. Defina Z=H quando X=Y e Z=T quando X≠Y. Os quatro resultados HH, HT, TH, TT de (X,Y) têm probabilidade 1/4 cada um."
        }
      ],
      "prompt": "Que afirmação sobre X, Y e Z é correta?",
      "options": [
        {
          "id": "a",
          "text": "São mutuamente independentes porque cada par é independente."
        },
        {
          "id": "b",
          "text": "Cada par é independente, mas as três variáveis não são mutuamente independentes."
        },
        {
          "id": "c",
          "text": "X e Z são dependentes porque Z usa X na sua definição."
        },
        {
          "id": "d",
          "text": "Y e Z são dependentes porque P(Y=H,Z=H)=0."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Para cada par, os quatro pares de valores possíveis têm probabilidade 1/4, igual ao produto das marginais. Mas P(X=H,Y=H,Z=H)=1/4, enquanto P(X=H)P(Y=H)P(Z=H)=1/8. Assim, independência dois a dois não implica independência mútua.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 57,
          "anchor": "independência-dois-a-dois-e-mútua"
        }
      ]
    },
    {
      "id": "lec02-020",
      "type": "proof-step",
      "topic": "Critérios de independência",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam X₁,…,Xₙ variáveis aleatórias reais. Suponha que P(X₁∈B₁,…,Xₙ∈Bₙ)=∏ᵢ₌₁ⁿ P(Xᵢ∈Bᵢ) para quaisquer conjuntos de Borel B₁,…,Bₙ⊆ℝ. Então X₁,…,Xₙ são independentes: para todo o I⊆{1,…,n} não vazio e quaisquer Aᵢ∈σ(Xᵢ), i∈I, a probabilidade da interseção é igual ao produto das suas probabilidades."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Escolha I⊆{1,…,n} não vazio e acontecimentos Aᵢ∈σ(Xᵢ) para i∈I. Para cada um destes i, a descrição σ(Xᵢ)={Xᵢ⁻¹(B): B é de Borel} fornece um conjunto de Borel Bᵢ tal que Aᵢ={Xᵢ∈Bᵢ}. Queremos aplicar a fatorização assumida nas n coordenadas sem impor restrições adicionais aos índices fora de I."
        }
      ],
      "prompt": "Como devemos escolher Bᵢ para os índices omitidos i∉I?",
      "options": [
        {
          "id": "a",
          "text": "Tomar Bᵢ=∅, pois as coordenadas omitidas não devem contribuir com nada."
        },
        {
          "id": "b",
          "text": "Tomar Bᵢ={0}, pois uma coordenada fixa não altera uma interseção."
        },
        {
          "id": "c",
          "text": "Tomar Bᵢ=ℝ, pois {Xᵢ∈ℝ}=Ω e P(Xᵢ∈ℝ)=1."
        },
        {
          "id": "d",
          "text": "Tomar Bᵢ=(−∞,0], pois qualquer semirreta tem probabilidade um."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Usar ℝ mantém a interseção dos acontecimentos inalterada e contribui com um fator igual a um. A fatorização em retângulos assumida dá então a regra do produto para os acontecimentos escolhidos Aᵢ, i∈I. Como I e os acontecimentos eram arbitrários, obtém-se a independência das σ-álgebras geradas.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 55,
          "anchor": "independência-e-fd-conjuntas"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 52,
          "anchor": "a-sigma-álgebra-gerada-por-variáveis-aleatórias"
        }
      ]
    },
    {
      "id": "lec02-021",
      "type": "numeric-input",
      "topic": "Leis conjuntas discretas",
      "difficulty": "intro",
      "context": [
        {
          "label": "Função de probabilidade conjunta",
          "text": "X,Y tomam valores em {0,1}. A sua função de probabilidade conjunta p(x,y)=P(X=x,Y=y) é:\np(0,0)=0.10, p(0,1)=0.20,\np(1,0)=0.30, p(1,1)=0.40.\nTodos os restantes pares têm probabilidade zero."
        }
      ],
      "prompt": "Qual é o valor de P(X=Y)?",
      "acceptedAnswers": [
        "0.5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "0.5",
      "explanation": "O acontecimento {X=Y} é a união disjunta dos resultados (0,0) e (1,1). Some as suas massas: 0.10+0.40=0.50.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 58,
          "anchor": "funções-de-probabilidade-conjuntas"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 62,
          "anchor": "função-de-probabilidade-marginais-condicionamento-e-independência"
        }
      ]
    },
    {
      "id": "lec02-022",
      "type": "numeric-input",
      "topic": "Leis conjuntas discretas",
      "difficulty": "core",
      "context": [
        {
          "label": "Função de probabilidade conjunta",
          "text": "X,Y tomam valores em {0,1}. A sua função de probabilidade conjunta p(x,y)=P(X=x,Y=y) é:\np(0,0)=0.10, p(0,1)=0.20,\np(1,0)=0.30, p(1,1)=0.40.\nTodos os restantes pares têm probabilidade zero."
        }
      ],
      "prompt": "Calcule a probabilidade marginal p_Y(1)=P(Y=1).",
      "acceptedAnswers": [
        "0.6",
        "3/5",
        "60%"
      ],
      "correctAnswer": "0.6",
      "explanation": "Mantenha Y=1 fixo e some sobre todos os valores de X: p_Y(1)=p(0,1)+p(1,1)=0.20+0.40=0.60. Uma marginal usa todas as entradas da coluna correspondente, não apenas uma massa conjunta.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 59,
          "anchor": "funções-de-probabilidade-marginais"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 62,
          "anchor": "função-de-probabilidade-marginais-condicionamento-e-independência"
        }
      ]
    },
    {
      "id": "lec02-023",
      "type": "numeric-input",
      "topic": "Funções de probabilidade condicionadas",
      "difficulty": "core",
      "context": [
        {
          "label": "Função de probabilidade conjunta",
          "text": "X,Y tomam valores em {0,1}. A sua função de probabilidade conjunta p(x,y)=P(X=x,Y=y) é:\np(0,0)=0.10, p(0,1)=0.20,\np(1,0)=0.30, p(1,1)=0.40.\nTodos os restantes pares têm probabilidade zero."
        }
      ],
      "prompt": "Qual é o valor de P(X=1 | Y=0)?",
      "acceptedAnswers": [
        "0.75",
        "3/4",
        "75%"
      ],
      "correctAnswer": "0.75",
      "explanation": "O acontecimento em que se condiciona tem probabilidade P(Y=0)=0.10+0.30=0.40>0. Assim, P(X=1 | Y=0)=p(1,0)/P(Y=0)=0.30/0.40=0.75. O denominador tem de corresponder à variável em que se condiciona.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 60,
          "anchor": "funções-de-probabilidade-condicionadas"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 62,
          "anchor": "função-de-probabilidade-marginais-condicionamento-e-independência"
        }
      ]
    },
    {
      "id": "lec02-024",
      "type": "multiple-choice",
      "topic": "Funções de probabilidade condicionadas",
      "difficulty": "core",
      "context": [
        {
          "label": "Definição apresentada na aula",
          "text": "Para X,Y discretas e um valor x com p_X(x)>0, a função de probabilidade condicionada é p_{Y|X}(y|x)=p_{X,Y}(x,y)/p_X(x)."
        }
      ],
      "prompt": "Suponha que p_X(2)=0. O que diz esta definição por quociente sobre a função de probabilidade condicionada por X=2?",
      "options": [
        {
          "id": "a",
          "text": "É a função que vale zero em todo o y."
        },
        {
          "id": "b",
          "text": "Tem de ser igual à função de probabilidade não condicionada de Y."
        },
        {
          "id": "c",
          "text": "É a função que vale um em todo o y."
        },
        {
          "id": "d",
          "text": "A definição por quociente não a define, porque o denominador é zero."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "A fórmula da função de probabilidade condicionada discreta apresentada na aula exige uma probabilidade de condicionamento estritamente positiva. Quando p_X(2)=0, cada massa conjunta p_{X,Y}(2,y) também é zero, produzindo o quociente indefinido 0/0. Esta fórmula não determina aí uma função de probabilidade condicionada única.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 60,
          "anchor": "funções-de-probabilidade-condicionadas"
        }
      ]
    },
    {
      "id": "lec02-025",
      "type": "proof-step",
      "topic": "Leis conjuntas discretas",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam X,Y variáveis aleatórias reais tais que P(X∈D_X)=P(Y∈D_Y)=1 para conjuntos numeráveis D_X,D_Y. Defina p_X(x)=P(X=x) e p_{X,Y}(x,y)=P(X=x,Y=y). Então p_X(x)=∑_{y∈D_Y} p_{X,Y}(x,y) para todo o x∈D_X."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe x∈D_X. Para y∈D_Y, seja A_y={X=x,Y=y}. Estes acontecimentos são disjuntos dois a dois e a sua união é {X=x,Y∈D_Y}. A probabilidade desta união é p_X(x), pois P(Y∈D_Y)=1."
        }
      ],
      "prompt": "Que axioma da probabilidade dá a identidade marginal pretendida?",
      "options": [
        {
          "id": "a",
          "text": "Aditividade numerável: a probabilidade da união disjunta é ∑_{y∈D_Y} P(A_y)."
        },
        {
          "id": "b",
          "text": "Independência: a probabilidade da união é ∏_{y∈D_Y} P(A_y)."
        },
        {
          "id": "c",
          "text": "Complementação: P(X=x)=1−P(Y∈D_Y)."
        },
        {
          "id": "d",
          "text": "Normalização: cada massa conjunta P(A_y) tem de ser igual a um."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A aditividade numerável aplica-se porque D_Y é numerável e os acontecimentos A_y são disjuntos. Dá p_X(x)=∑_{y∈D_Y}P(X=x,Y=y), que é a fórmula da soma de uma linha da tabela. Não se usa qualquer hipótese de independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 59,
          "anchor": "funções-de-probabilidade-marginais"
        }
      ]
    },
    {
      "id": "lec02-026",
      "type": "multiple-choice",
      "topic": "Independência no caso discreto",
      "difficulty": "core",
      "context": [
        {
          "label": "Função de probabilidade conjunta",
          "text": "X,Y tomam valores em {0,1}. A sua função de probabilidade conjunta é p(0,0)=0.10, p(0,1)=0.20, p(1,0)=0.30 e p(1,1)=0.40, com massa zero nos restantes pares. As suas marginais satisfazem p_X(0)=0.30 e p_Y(0)=0.40."
        }
      ],
      "prompt": "Que argumento determina corretamente se X e Y são independentes?",
      "options": [
        {
          "id": "a",
          "text": "São independentes porque a soma das quatro massas é um."
        },
        {
          "id": "b",
          "text": "São independentes porque cada par de valores possíveis tem massa positiva."
        },
        {
          "id": "c",
          "text": "Não são independentes porque p(0,0)=0.10 é diferente de p_X(0)p_Y(0)=0.12."
        },
        {
          "id": "d",
          "text": "Não são independentes apenas porque p_X(0) é diferente de p_Y(0)."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "A independência exige p(x,y)=p_X(x)p_Y(y) em cada par. Basta uma igualdade falhar para a refutar. A normalização e a positividade das entradas não implicam independência; variáveis independentes não têm de ter a mesma distribuição marginal.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 61,
          "anchor": "independência-e-fatorização-da-função-de-probabilidade"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 62,
          "anchor": "função-de-probabilidade-marginais-condicionamento-e-independência"
        }
      ]
    },
    {
      "id": "lec02-027",
      "type": "proof-step",
      "topic": "Independência no caso discreto",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam X,Y variáveis aleatórias reais suportadas em conjuntos numeráveis D_X,D_Y, com função de probabilidade conjunta p_{X,Y} e funções de probabilidade marginais p_X,p_Y. Se p_{X,Y}(x,y)=p_X(x)p_Y(y) para todo o x∈D_X e y∈D_Y, então X e Y são independentes."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Escolha conjuntos de Borel A,B⊆ℝ arbitrários. A aditividade numerável e a fatorização assumida dão P(X∈A,Y∈B)=∑_{x∈A∩D_X}∑_{y∈B∩D_Y}p_X(x)p_Y(y). Os termos são não negativos; para cada x fixo, p_X(x) é constante na soma interior."
        }
      ],
      "prompt": "Que cálculo desta soma dupla prova o teorema?",
      "options": [
        {
          "id": "a",
          "text": "É igual a P(X∈A)+P(Y∈B), porque existem duas somas."
        },
        {
          "id": "b",
          "text": "É igual a (∑_{x∈A∩D_X}p_X(x))(∑_{y∈B∩D_Y}p_Y(y))=P(X∈A)P(Y∈B)."
        },
        {
          "id": "c",
          "text": "É igual a um para quaisquer A,B, porque a soma de toda a função de probabilidade conjunta é um."
        },
        {
          "id": "d",
          "text": "É igual a P(X∈A∩B), porque os dois conjuntos de índices podem ser substituídos pela sua interseção."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Coloque p_X(x) em evidência em cada soma interior e, depois, coloque em evidência a soma comum em y. As duas somas restantes são as probabilidades marginais de A e B. A igualdade com o produto verifica-se para quaisquer A,B de Borel, que é o critério dos retângulos para a independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 61,
          "anchor": "independência-e-fatorização-da-função-de-probabilidade"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 55,
          "anchor": "independência-e-fd-conjuntas"
        }
      ]
    },
    {
      "id": "lec02-028",
      "type": "multiple-choice",
      "topic": "Densidades conjuntas",
      "difficulty": "intro",
      "prompt": "Seja f(x,y)=4 no quadrado 0<x<1/2, 0<y<1/2 e f(x,y)=0 fora dele. O quadrado tem área 1/4. Pode f ser uma densidade de probabilidade conjunta?",
      "options": [
        {
          "id": "a",
          "text": "Não: uma densidade de probabilidade tem de ser no máximo 1 em cada ponto."
        },
        {
          "id": "b",
          "text": "Sim: f é mensurável, não negativa e o seu integral é 4×(1/4)=1."
        },
        {
          "id": "c",
          "text": "Não: qualquer densidade conjunta tem de ser positiva em todo o ℝ²."
        },
        {
          "id": "d",
          "text": "Sim: o seu valor 4 significa que cada ponto do quadrado tem probabilidade 4."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Uma densidade atribui probabilidades por integração sobre conjuntos, não pelo seu valor num ponto. Os seus valores podem exceder 1. Aqui, o integral total é 1, pelo que f define uma distribuição de probabilidade; cada ponto isolado continua a ter probabilidade zero.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 63,
          "anchor": "funções-de-densidade-conjuntas"
        }
      ]
    },
    {
      "id": "lec02-029",
      "type": "find-the-intruder",
      "topic": "Densidades conjuntas",
      "difficulty": "core",
      "prompt": "Cada função abaixo vale zero fora da região indicada. Qual delas NÃO é uma densidade de probabilidade conjunta? O triângulo 0<y<x<1 tem área 1/2.",
      "options": [
        {
          "id": "a",
          "text": "f=1 no quadrado unitário 0<x<1, 0<y<1."
        },
        {
          "id": "b",
          "text": "f=2 no retângulo 0<x<1/2, 0<y<1."
        },
        {
          "id": "c",
          "text": "f=2 no triângulo 0<y<x<1."
        },
        {
          "id": "d",
          "text": "f=1/2 no quadrado unitário 0<x<1, 0<y<1."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "As quatro funções são mensuráveis e não negativas. Os seus integrais totais são, respetivamente, 1, 1, 1 e 1/2. Apenas a última função não satisfaz a exigência de probabilidade total igual a 1.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 63,
          "anchor": "funções-de-densidade-conjuntas"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 68,
          "anchor": "exemplo-uma-densidade-num-triângulo"
        }
      ]
    },
    {
      "id": "lec02-030",
      "type": "proof-step",
      "topic": "Densidades conjuntas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja X uniforme em (0,1) e seja Y=X. Embora ambas as distribuições marginais tenham densidades, o par (X,Y) não tem densidade conjunta em relação à medida de Lebesgue bidimensional (área usual)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "X e Y são ambas uniformes em (0,1), pelo que as suas densidades marginais são 1 em (0,1) e 0 fora desse intervalo. Suponha, por redução ao absurdo, que (X,Y) tem densidade conjunta f. Seja D={(x,y)∈ℝ²:x=y}. A diagonal D tem área zero, enquanto P((X,Y)∈D)=1 porque Y=X. O integral de uma função mensurável não negativa sobre um conjunto de área zero é zero."
        }
      ],
      "prompt": "Que passo seguinte conduz à contradição?",
      "options": [
        {
          "id": "a",
          "text": "A fórmula da densidade dá 1=P((X,Y)∈D)=∬D f(x,y) dx dy=0."
        },
        {
          "id": "b",
          "text": "Como D tem área zero, tem de ser o conjunto vazio."
        },
        {
          "id": "c",
          "text": "Como X e Y têm densidades, P(X=Y)=0 mesmo quando Y=X."
        },
        {
          "id": "d",
          "text": "O integral da densidade marginal de X é 0 porque X=Y."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Uma densidade conjunta obrigaria a que todo o conjunto de Borel de área zero, incluindo D, tivesse probabilidade zero. Mas esta distribuição concentra toda a sua probabilidade em D. Marginais absolutamente contínuas não garantem, portanto, uma distribuição conjunta absolutamente contínua.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 63,
          "anchor": "funções-de-densidade-conjuntas"
        }
      ]
    },
    {
      "id": "lec02-031",
      "type": "multiple-choice",
      "topic": "Densidades marginais e condicionadas",
      "difficulty": "intro",
      "prompt": "O par (X,Y) tem densidade conjunta f(x,y). Que fórmula dá uma densidade marginal f_X de X, com igualdade quase em toda a parte (isto é, exceto possivelmente num conjunto de comprimento zero)?",
      "options": [
        {
          "id": "a",
          "text": "f_X(x)=f(x,x)."
        },
        {
          "id": "b",
          "text": "f_X(x)=∫ℝ f(x,y) dx, integrando em x."
        },
        {
          "id": "c",
          "text": "f_X(x)=∫ℝ f(x,y) dy, integrando em y."
        },
        {
          "id": "d",
          "text": "f_X(x)=P(X=x)."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Para manter a coordenada x, integre na outra coordenada, y. Integrar em x dá, pelo contrário, uma função de y, nomeadamente uma densidade marginal de Y. O valor de uma densidade não é uma probabilidade pontual.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 64,
          "anchor": "funções-de-densidade-marginais"
        }
      ]
    },
    {
      "id": "lec02-032",
      "type": "numeric-input",
      "topic": "Densidades marginais e condicionadas",
      "difficulty": "core",
      "prompt": "Seja f(x,y)=2 para 0<y<x<1 e 0 fora dessa região. Escolha a densidade marginal f_Y(y)=∫ℝ f(x,y) dx. Qual é o valor de f_Y(1/4)?",
      "acceptedAnswers": [
        "1.5",
        "3/2"
      ],
      "correctAnswer": "1.5",
      "explanation": "Para y=1/4, os valores admissíveis de x vão de 1/4 a 1. Assim, f_Y(1/4)=∫(de 1/4 a 1) 2 dx=2×(3/4)=3/2. Este é um valor de densidade, pelo que pode ser superior a 1.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 64,
          "anchor": "funções-de-densidade-marginais"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 68,
          "anchor": "exemplo-uma-densidade-num-triângulo"
        }
      ]
    },
    {
      "id": "lec02-033",
      "type": "multiple-choice",
      "topic": "Densidades marginais e condicionadas",
      "difficulty": "intro",
      "prompt": "Seja f uma densidade conjunta e escolha f_X(x)=∫ℝ f(x,y) dy. Fixe x com 0<f_X(x)<∞. Que fórmula define a versão da densidade condicionada de Y dado X=x usada na aula?",
      "options": [
        {
          "id": "a",
          "text": "f_{Y|X}(y|x)=P(X=x,Y=y)/P(X=x)."
        },
        {
          "id": "b",
          "text": "f_{Y|X}(y|x)=f(x,y)f_X(x)."
        },
        {
          "id": "c",
          "text": "f_{Y|X}(y|x)=f(x,y)/f_Y(y), sem qualquer condição sobre f_Y(y)."
        },
        {
          "id": "d",
          "text": "f_{Y|X}(y|x)=f(x,y)/f_X(x)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Dividir a densidade conjunta pela densidade marginal positiva e finita normaliza a secção em y, de modo a ter integral 1. Não se trata de dividir por P(X=x): essa probabilidade pontual é zero para uma distribuição marginal absolutamente contínua.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 65,
          "anchor": "funções-de-densidade-condicionadas"
        }
      ]
    },
    {
      "id": "lec02-034",
      "type": "numeric-input",
      "topic": "Densidades marginais e condicionadas",
      "difficulty": "core",
      "prompt": "Para a densidade conjunta f(x,y)=2 em 0<y<x<1 (zero fora dessa região), use a versão da densidade condicionada f_{Y|X}(y|x)=1/x em 0<y<x e zero fora desse intervalo. Que probabilidade atribui esta versão a Y<1/4 dado X=1/2?",
      "acceptedAnswers": [
        "0.5",
        "1/2"
      ],
      "correctAnswer": "0.5",
      "explanation": "Para x=1/2, a densidade condicionada indicada é 2 em (0,1/2). Integrá-la de 0 a 1/4 dá 2×(1/4)=1/2. Fixámos explicitamente uma versão porque o condicionamento num valor específico de uma variável contínua não é definido por quocientes elementares de probabilidades de acontecimentos.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 65,
          "anchor": "funções-de-densidade-condicionadas"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 68,
          "anchor": "exemplo-uma-densidade-num-triângulo"
        }
      ]
    },
    {
      "id": "lec02-035",
      "type": "proof-step",
      "topic": "Densidades marginais e condicionadas",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Seja f uma densidade conjunta de (X,Y), seja f_X(x)=∫ℝ f(x,y) dy e seja P_X a distribuição de X. Defina D={x:0<f_X(x)<∞}. Para x∈D, ponha q(y|x)=f(x,y)/f_X(x); fora de D, use uma única densidade de probabilidade fixa. Então, para quaisquer conjuntos de Borel A,B⊆ℝ, P(X∈A,Y∈B)=∫A [∫B q(y|x) dy] dP_X(x)."
        },
        {
          "label": "Demonstração até aqui",
          "text": "A densidade marginal f_X tem integral 1. O conjunto onde se anula tem probabilidade P_X zero. O conjunto onde é infinita tem comprimento zero pela integrabilidade e, portanto, também probabilidade P_X zero. Logo, P_X(D)=1. Em D, tem-se q(y|x)f_X(x)=f(x,y). Calculamos agora I=∫A [∫B q(y|x) dy] dP_X(x). Para h mensurável não negativa, a integração em relação à densidade marginal dá ∫h(x) dP_X(x)=∫h(x)f_X(x) dx."
        }
      ],
      "prompt": "Que expressão é igual a I e completa a substituição principal?",
      "options": [
        {
          "id": "a",
          "text": "I=∫(A∩D) ∫B f(x,y)f_X(x) dy dx."
        },
        {
          "id": "b",
          "text": "I=∫(A∩D) ∫B f(x,y) dy dx."
        },
        {
          "id": "c",
          "text": "I=P_X(A)P(Y∈B), sem qualquer hipótese de independência."
        },
        {
          "id": "d",
          "text": "I=∫(A∩D) ∫B f(x,y)/f_X(x) dy dx."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Restringimos a D porque o seu complementar tem probabilidade P_X zero. Substituir dP_X(x) por f_X(x) dx cancela então o denominador de q. A parte omitida de A fora de D tem probabilidade conjunta no máximo P_X(Dᶜ)=0, pelo que o integral resultante é igual a P(X∈A,Y∈B). Não é necessária independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 66,
          "anchor": "distribuições-condicionadas"
        }
      ]
    },
    {
      "id": "lec02-036",
      "type": "multiple-choice",
      "topic": "Fatorização de densidades e independência",
      "difficulty": "challenge",
      "prompt": "Seja f(x,y)=1 em (0,1)² e 0 fora desse quadrado, uma densidade conjunta de duas variáveis uniformes independentes. Defina g=f, exceto que g(1/2,1/2)=7. Um ponto isolado tem área zero. O que é correto acerca da distribuição de probabilidade definida por g? Aqui, «quase em toda a parte» significa fora de um conjunto de área zero.",
      "options": [
        {
          "id": "a",
          "text": "As suas coordenadas são dependentes porque a densidade deixou de se fatorizar em (1/2,1/2)."
        },
        {
          "id": "b",
          "text": "Não é uma distribuição de probabilidade porque a densidade excede 1."
        },
        {
          "id": "c",
          "text": "É a mesma distribuição que f e as suas coordenadas continuam independentes: a fatorização quase em toda a parte é suficiente."
        },
        {
          "id": "d",
          "text": "A sua probabilidade total é 7 porque g(1/2,1/2)=7."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Alterar uma densidade num conjunto de área zero não altera nenhum dos seus integrais sobre conjuntos de Borel. Assim, g define exatamente a mesma distribuição conjunta que f. A independência é uma propriedade dessa distribuição, e o critério de fatorização da densidade exige igualdade quase em toda a parte, não em cada ponto.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 67,
          "anchor": "independência-e-fatorização-da-densidade"
        }
      ]
    },
    {
      "id": "lec02-037",
      "type": "proof-step",
      "topic": "Fatorização de densidades e independência",
      "difficulty": "core",
      "context": [
        {
          "label": "Teorema",
          "text": "Se (X,Y) tem densidade conjunta f e densidades marginais f_X,f_Y que satisfazem f(x,y)=f_X(x)f_Y(y) fora de um conjunto de área zero, então X e Y são independentes. A independência significa P(X∈A,Y∈B)=P(X∈A)P(Y∈B) para quaisquer conjuntos de Borel A,B⊆ℝ."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Fixe conjuntos de Borel A,B arbitrários. A fórmula da densidade conjunta e a igualdade quase em toda a parte dão P(X∈A,Y∈B)=∫A∫B f_X(x)f_Y(y) dy dx. O teorema de Tonelli permite a integração iterada de uma função mensurável não negativa. No integral interior, f_X(x) é constante em relação a y."
        }
      ],
      "prompt": "Que linha seguinte estabelece a independência?",
      "options": [
        {
          "id": "a",
          "text": "P(X∈A,Y∈B)=(∫A f_X(x) dx)(∫B f_Y(y) dy)=P(X∈A)P(Y∈B)."
        },
        {
          "id": "b",
          "text": "P(X∈A,Y∈B)=∫(A∩B) f_X(x)f_Y(x) dx."
        },
        {
          "id": "c",
          "text": "P(X∈A,Y∈B)=P(X∈A)+P(Y∈B)."
        },
        {
          "id": "d",
          "text": "P(X∈A,Y∈B)=1 porque cada densidade marginal tem integral total 1."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Separe o integral do produto no produto dos dois integrais marginais. Cada integral marginal é a probabilidade do acontecimento correspondente. Como A e B eram arbitrários, verifica-se a condição que define a independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 67,
          "anchor": "independência-e-fatorização-da-densidade"
        }
      ]
    },
    {
      "id": "lec02-038",
      "type": "multiple-choice",
      "topic": "Fatorização de densidades e independência",
      "difficulty": "core",
      "prompt": "Seja f(x,y)=2 em 0<y<x<1 e 0 fora dessa região. As suas densidades marginais são f_X(x)=2x e f_Y(y)=2(1−y) em (0,1), e zero fora desse intervalo. Defina A={X<1/4} e B={Y>3/4}. Que argumento prova corretamente que X e Y não são independentes?",
      "options": [
        {
          "id": "a",
          "text": "São dependentes simplesmente porque as suas densidades marginais são diferentes."
        },
        {
          "id": "b",
          "text": "São dependentes porque uma densidade conjunta nunca pode representar variáveis independentes."
        },
        {
          "id": "c",
          "text": "A e B são disjuntos, pelo que as suas probabilidades individuais têm de ser ambas zero."
        },
        {
          "id": "d",
          "text": "P(A∩B)=0 porque Y<X quase certamente, mas P(A)>0 e P(B)>0, pelo que P(A∩B)≠P(A)P(B)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "As desigualdades X<1/4 e Y>3/4 não podem verificar-se simultaneamente onde y<x, pelo que a interseção tem probabilidade zero. As fórmulas marginais dão P(A)=∫(de 0 a 1/4) 2x dx=1/16 e P(B)=∫(de 3/4 a 1) 2(1−y) dy=1/16. O seu produto é positivo, o que contradiz a independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 67,
          "anchor": "independência-e-fatorização-da-densidade"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 68,
          "anchor": "exemplo-uma-densidade-num-triângulo"
        }
      ]
    },
    {
      "id": "lec02-039",
      "type": "numeric-input",
      "topic": "Fórmula de Bayes",
      "difficulty": "core",
      "prompt": "No modelo de probabilidade hipotético da ficha, H representa hipertensão e D consumo regular de álcool. Suponha que P(H)=0.05, P(D|H)=0.75 e P(D|Hᶜ)=0.50, sendo Hᶜ o complementar de H. Usando a probabilidade total dada P(D)=0.75×0.05+0.50×0.95=0.5125, calcule P(H|D). Pode introduzir uma fração.",
      "acceptedAnswers": [
        "3/41",
        "0.07317073170731707"
      ],
      "correctAnswer": "3/41",
      "explanation": "A fórmula de Bayes dá P(H|D)=P(D|H)P(H)/P(D)=(0.75×0.05)/0.5125=3/41, aproximadamente 0.07317. Inverter a condição não preserva a probabilidade condicionada. Estas são as probabilidades estipuladas na ficha, não uma afirmação médica empírica.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 69,
          "anchor": "fórmula-de-bayes"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 70,
          "anchor": "ficha-1"
        }
      ]
    },
    {
      "id": "lec02-040",
      "type": "proof-step",
      "topic": "Fórmula de Bayes",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Teorema",
          "text": "Sejam A,B acontecimentos com P(B)=p, em que 0<p<1. Escreva a=P(A|B) e b=P(A|Bᶜ), sendo Bᶜ o complementar de B. Se ap+b(1−p)>0, então P(B|A)=ap/[ap+b(1−p)]."
        },
        {
          "label": "Demonstração até aqui",
          "text": "Pela definição de probabilidade condicionada, P(A∩B)=ap e P(A∩Bᶜ)=b(1−p). Os acontecimentos A∩B e A∩Bᶜ são disjuntos e a sua união é A. Para usar P(B|A)=P(A∩B)/P(A), é necessário calcular P(A) e verificar que é positiva."
        }
      ],
      "prompt": "Que passo seguinte completa a demonstração?",
      "options": [
        {
          "id": "a",
          "text": "A independência dá P(A)=a, pelo que P(B|A)=p; a independência decorre das hipóteses."
        },
        {
          "id": "b",
          "text": "A aditividade dá P(A)=ap+b(1−p)>0; dividir P(A∩B)=ap por esta quantidade dá a fórmula."
        },
        {
          "id": "c",
          "text": "A aditividade dá P(A)=a+b, pelo que se divide ap por a+b."
        },
        {
          "id": "d",
          "text": "Como a=P(A|B), inverter a condição dá P(B|A)=a."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "A decomposição disjunta de A dá a sua probabilidade como a soma das probabilidades das duas interseções. A positividade estrita assumida torna legítimo o condicionamento em A. Dividir o numerador ap pelo total ap+b(1−p) dá a fórmula pretendida para a probabilidade condicionada com a condição invertida, sem qualquer hipótese de independência.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 69,
          "anchor": "fórmula-de-bayes"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 70,
          "anchor": "ficha-1"
        }
      ]
    }
  ],
  "locale": "pt-PT",
  "translationNotes": {
    "from": "exercises-lecture-2.js",
    "language": "pt-PT",
    "sourceSha256": "fa94677815d29271af3447da893e2beb2432824787fb2f6255c16fece7b01953",
    "englishQuestionCount": 40,
    "adaptations": "Mantiveram-se as hipóteses e as explicações matemáticas; a notação H/T das moedas é explicitada quando necessário."
  }
};
