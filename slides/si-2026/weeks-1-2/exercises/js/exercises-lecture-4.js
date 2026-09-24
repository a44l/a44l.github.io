window.LECTURE_4_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "en-GB",
  "block": {
    "id": "lecture-4",
    "title": "Lecture 4",
    "description": "Slides 115–140: modes of convergence, concrete sequences, Markov’s inequality and transformations of limits",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../index.html#/modes-of-convergence",
    "featuredTopics": [
      "Classify convergence",
      "Rare spikes",
      "Typewriter sequence",
      "Markov and Chebyshev",
      "Dominated convergence",
      "Distributional limits"
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
      "title": "Statistical Inference 2026 — Lecture 4",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../index.html",
      "slideRange": [
        115,
        140
      ],
      "deckSha256": "68453fbca59d260e077456574b3d6cd774560abe2b912c84018fd750058ec363",
      "renderedSourceFile": "slides/si-2026/weeks-1-2/index.html",
      "sourceFile": "slides-2026-weeks-1-2/index.qmd",
      "checkedOn": "2026-09-24"
    }
  },
  "exercises": [
    {
      "id": "lec04-001",
      "type": "multiple-choice",
      "topic": "Definitions and implications",
      "difficulty": "intro",
      "prompt": "Which statement is the definition of \\(X_n\\) converging to \\(X\\) in probability?",
      "options": [
        {
          "id": "a",
          "text": "For every fixed \\(\\varepsilon>0\\), \\(\\mathbb P(|X_n-X|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(X_n=X)\\to1\\) is required."
        },
        {
          "id": "c",
          "text": "There is one \\(\\varepsilon>0\\) for which \\(\\mathbb P(|X_n-X|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb E[X_n]\\to\\mathbb E[X]\\) is required and sufficient."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "The condition must hold for every positive fixed tolerance, not just one. Exact equality is unnecessary: \\(X_n=\\frac1n\\) converges to 0 although \\(\\mathbb P(X_n=0)=0\\). Expectations need not exist or converge.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 122,
          "anchor": "convergence-in-probability"
        }
      ]
    },
    {
      "id": "lec04-002",
      "type": "multiple-select",
      "topic": "Bounded errors",
      "difficulty": "intro",
      "prompt": "A calibration error is \\(X_n=\\frac Un\\), using the same \\(U\\sim\\operatorname{Unif}(0,1)\\) for every \\(n\\). In which of the listed senses does \\(X_n\\) converge to 0?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "Almost surely \\(|X_n|\\le\\frac1n\\), and \\(\\lVert X_n\\rVert_\\infty=\\frac1n\\to0\\). Hence all six modes hold. Directly, \\(\\mathbb E|X_n|=\\frac1{2n}\\) and \\(\\mathbb E[X_n^2]=\\frac1{3n^2}\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "linfty-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "the-implication-structure"
        }
      ]
    },
    {
      "id": "lec04-003",
      "type": "multiple-select",
      "topic": "Bounded errors",
      "difficulty": "intro",
      "prompt": "Let \\(U\\sim\\operatorname{Unif}(0,1)\\) be fixed across \\(n\\) and \\(X_n=\\mathbf1_{\\{U\\le1/n\\}}\\). Which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "For each \\(u>0\\) the indicator is eventually zero, so convergence is almost sure. For any finite \\(p\\ge1\\), \\(\\mathbb E|X_n|^p=\\frac1n\\to0\\). Thus \\(L^1\\), \\(L^2\\), probability and distribution convergence hold. But \\(\\lVert X_n\\rVert_\\infty=1\\) for every \\(n\\): a set of positive, though shrinking, probability still has error 1.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "linfty-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "dominated-convergence-in-lp"
        }
      ]
    },
    {
      "id": "lec04-004",
      "type": "multiple-select",
      "topic": "Rare spikes",
      "difficulty": "core",
      "prompt": "A rare payout is \\(X_n=n\\mathbf1_{\\{U\\le1/n\\}}\\), with the same \\(U\\sim\\operatorname{Unif}(0,1)\\) for every \\(n\\). Which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "For each \\(u>0\\) the payout eventually vanishes. Thus \\(X_n\\to0\\) almost surely, in probability and in distribution. Nevertheless \\(\\mathbb E|X_n|=1\\), \\(\\mathbb E[X_n^2]=n\\), and \\(\\lVert X_n\\rVert_\\infty=n\\). None of the three listed norm convergences holds: the increasingly rare payouts also get larger.",
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
        "title": "Narrower intervals, taller spikes",
        "description": "Graphs of u ↦ n^1 1{0<u≤1/n^1} for n=2,4,8 on common axes.",
        "caption": "These are functions of the same uniform U, not probability densities. The formula in the question specifies the entire sequence."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "almost-sure-convergence-without-l1-convergence"
        }
      ]
    },
    {
      "id": "lec04-005",
      "type": "multiple-select",
      "topic": "Rare spikes",
      "difficulty": "core",
      "prompt": "Let \\(X_n=\\sqrt n\\,\\mathbf1_{\\{U\\le1/n\\}}\\), using one \\(U\\sim\\operatorname{Unif}(0,1)\\). Which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "Every \\(u>0\\) eventually leaves the shrinking interval, so almost sure convergence holds. \\(\\mathbb E|X_n|=\\frac1{\\sqrt n}\\to0\\), but \\(\\mathbb E[X_n^2]=1\\) and \\(\\lVert X_n\\rVert_\\infty=\\sqrt n\\). Thus \\(L^1\\) holds but \\(L^2\\) and \\(L^\\infty\\) do not. Probability and distribution convergence follow.",
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
        "title": "Narrower intervals, taller spikes",
        "description": "Graphs of u ↦ n^0.5 1{0<u≤1/n^1} for n=2,4,8 on common axes.",
        "caption": "These are functions of the same uniform U, not probability densities. The formula in the question specifies the entire sequence."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "almost-sure-convergence-without-l1-convergence"
        }
      ]
    },
    {
      "id": "lec04-006",
      "type": "multiple-select",
      "topic": "Rare spikes",
      "difficulty": "core",
      "prompt": "Let \\(X_n=n\\mathbf1_{\\{U\\le1/n^3\\}}\\), with one \\(U\\sim\\operatorname{Unif}(0,1)\\). Which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "The shrinking support gives almost sure convergence. \\(\\mathbb E|X_n|=\\frac1{n^2}\\) and \\(\\mathbb E[X_n^2]=\\frac1n\\) both vanish. Hence \\(L^1\\), \\(L^2\\), probability and distribution convergence hold. The essential supremum is still \\(n\\), so \\(L^\\infty\\) convergence fails. A rising spike does not by itself rule out convergence in finite moments.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "almost-sure-convergence-without-l1-convergence"
        }
      ]
    },
    {
      "id": "lec04-007",
      "type": "multiple-choice",
      "topic": "Moment convergence",
      "difficulty": "challenge",
      "prompt": "Fix \\(\\alpha>0\\), \\(\\beta>0\\) and \\(1\\le p<\\infty\\). For the same \\(U\\sim\\operatorname{Unif}(0,1)\\), put \\(X_n=n^\\alpha\\mathbf1_{\\{U\\le n^{-\\beta}\\}}\\). Exactly when does \\(X_n\\) converge to 0 in \\(L^p\\)?",
      "options": [
        {
          "id": "a",
          "text": "Exactly when \\(\\alpha p>\\beta\\)."
        },
        {
          "id": "b",
          "text": "For every \\(\\alpha,\\beta>0\\) because the event becomes rare."
        },
        {
          "id": "c",
          "text": "Exactly when \\(\\alpha p<\\beta\\)."
        },
        {
          "id": "d",
          "text": "Exactly when \\(\\alpha p\\le\\beta\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "\\(\\mathbb E|X_n|^p=n^{\\alpha p}\\mathbb P(U\\le n^{-\\beta})=n^{\\alpha p-\\beta}\\). This tends to zero exactly when the exponent is negative. At the boundary \\(\\alpha p=\\beta\\) the moment stays equal to 1, so the inequality must be strict.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "almost-sure-convergence-without-l1-convergence"
        }
      ]
    },
    {
      "id": "lec04-008",
      "type": "numeric-input",
      "topic": "Moment convergence",
      "difficulty": "intro",
      "prompt": "Let \\(X_n=n\\mathbf1_{\\{U\\le1/n^2\\}}\\), with \\(U\\sim\\operatorname{Unif}(0,1)\\). What is \\(\\mathbb E|X_{20}|\\)?",
      "acceptedAnswers": [
        "0.05",
        "1/20"
      ],
      "correctAnswer": "0.05",
      "explanation": "\\(\\mathbb E|X_n|=n\\frac1{n^2}=\\frac1n\\). At \\(n=20\\) this is \\(\\frac1{20}=0.05\\). In contrast \\(\\mathbb E[X_n^2]=1\\), illustrating \\(L^1\\) convergence without \\(L^2\\) convergence.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "almost-sure-convergence-without-l1-convergence"
        }
      ],
      "answerDisplay": "\\(0.05\\)"
    },
    {
      "id": "lec04-009",
      "type": "multiple-select",
      "topic": "Bounded errors",
      "difficulty": "core",
      "prompt": "Let \\(U\\sim\\operatorname{Unif}(0,1)\\) and \\(X_n=U^n\\), using the same \\(U\\) throughout. Which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "For every \\(0<u<1\\), \\(u^n\\to0\\). Also \\(\\mathbb E|X_n|^p=\\int_0^1u^{np}\\,du=\\frac1{np+1}\\to0\\) for every finite \\(p\\ge1\\). But for any \\(a<1\\), \\(\\mathbb P(U^n>a)>0\\) when \\(0\\le a<1\\), so \\(\\lVert X_n\\rVert_\\infty=1\\) for every \\(n\\). Pointwise decay need not be uniform in \\(u\\), even after null sets are ignored.",
      "visual": {
        "kind": "powers",
        "ns": [
          1,
          4,
          16
        ],
        "title": "Powers of the same input",
        "description": "Graphs of u, u⁴ and u¹⁶ on [0,1], with shared axes. U takes values strictly between 0 and 1 almost surely.",
        "caption": "The endpoint u=1 has probability zero, but every interval immediately to its left has positive probability.",
        "xLabel": "u",
        "yLabel": "uⁿ"
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "linfty-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "dominated-convergence-in-lp"
        }
      ]
    },
    {
      "id": "lec04-010",
      "type": "multiple-select",
      "topic": "Moment convergence",
      "difficulty": "core",
      "prompt": "Let \\(Z\\sim\\mathcal N(0,1)\\) and \\(X_n=\\frac Zn\\), using the same \\(Z\\) for all \\(n\\). Which listed modes of convergence to 0 hold? Recall that convergence in \\(L^\\infty\\) requires the variables to belong to \\(L^\\infty\\).",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "\\(Z\\) is finite almost surely, so \\(Z/n\\to0\\) almost surely. \\(\\mathbb E[X_n^2]=\\frac1{n^2}\\to0\\), hence also \\(L^1\\) convergence. Probability and distribution convergence follow. A normal variable is not essentially bounded: for every finite \\(a\\), \\(\\mathbb P(|Z|>a)>0\\). Thus \\(Z/n\\) is not in \\(L^\\infty\\), and \\(L^\\infty\\) convergence does not apply.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 120,
          "anchor": "the-space-linftymathbb-p"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 123,
          "anchor": "convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "the-implication-structure"
        }
      ]
    },
    {
      "id": "lec04-011",
      "type": "multiple-choice",
      "topic": "Dependence and limits",
      "difficulty": "intro",
      "prompt": "For the deterministic sequence \\(X_n=(-1)^n\\), which statement about convergence to 0 is correct?",
      "options": [
        {
          "id": "a",
          "text": "Convergence in probability holds because the positive and negative values cancel."
        },
        {
          "id": "b",
          "text": "All six modes hold because the sequence is bounded."
        },
        {
          "id": "c",
          "text": "None of almost sure, probability, \\(L^1\\), \\(L^2\\), \\(L^\\infty\\) or distribution convergence to 0 holds."
        },
        {
          "id": "d",
          "text": "Only convergence in distribution to 0 holds."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "The absolute error is always 1. Thus probabilities of errors exceeding \\(\\frac12\\) and all listed error norms stay equal to 1. Distribution convergence to the constant 0 would imply probability convergence, so it also fails. Boundedness does not imply convergence.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 135,
          "anchor": "probability-and-distributional-convergence"
        }
      ]
    },
    {
      "id": "lec04-012",
      "type": "multiple-select",
      "topic": "Dependence and limits",
      "difficulty": "core",
      "prompt": "Let \\(R\\) take \\(-1\\) and 1 with probability \\(\\frac12\\) each, and set \\(X_n=(-1)^nR\\). Which listed modes of convergence to the specific random variable \\(R\\) hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "dist"
      ],
      "acceptedAnswers": [
        "dist"
      ],
      "correctAnswer": "dist",
      "explanation": "Each \\(X_n\\) has the same distribution as \\(R\\), so distribution convergence holds. On odd \\(n\\), \\(|X_n-R|=2\\) surely; on even \\(n\\) it is zero. Thus the error does not tend to zero almost surely, in probability, or in any listed norm. Equal marginal distributions do not specify pathwise closeness.",
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
        "title": "Two possible trajectories",
        "description": "For R=1 the values alternate −1,1; for R=−1 they alternate 1,−1. Each entire trajectory has probability 1/2.",
        "caption": "Dots represent integer indices. The connecting lines only guide the eye; no new random draw is made at each n.",
        "xLabel": "n",
        "yLabel": "Xₙ"
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 136,
          "anchor": "equal-distributions-without-probability-convergence"
        }
      ]
    },
    {
      "id": "lec04-013",
      "type": "multiple-select",
      "topic": "Dependence and limits",
      "difficulty": "core",
      "prompt": "Let \\(R\\) take the values \\(-1\\) and \\(1\\) with equal probability. Let \\(R_1,R_2,\\ldots\\) be independent copies, also independent of \\(R\\). Which listed modes of convergence of \\(R_n\\) to \\(R\\) hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
        }
      ],
      "correctAnswers": [
        "dist"
      ],
      "acceptedAnswers": [
        "dist"
      ],
      "correctAnswer": "dist",
      "explanation": "The distributions are identical. But independence gives \\(\\mathbb P(|R_n-R|>1)=\\mathbb P(R_n\\ne R)=\\frac12\\) for every \\(n\\). Hence probability convergence fails, and so do almost sure and all listed norm convergences, which would imply it. No theorem about infinitely many independent events is needed.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 136,
          "anchor": "equal-distributions-without-probability-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "the-implication-structure"
        }
      ]
    },
    {
      "id": "lec04-014",
      "type": "multiple-select",
      "topic": "Bounded errors",
      "difficulty": "core",
      "prompt": "Let \\(R\\) take \\(-1\\) and 1 with probability \\(\\frac12\\) each. Set \\(X_n=R+\\frac1n\\). Which listed modes of convergence to \\(R\\) hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "The target is \\(R\\), not 0. The error \\(X_n-R\\) is the deterministic number \\(\\frac1n\\), so its essential supremum tends to zero. All six modes follow even though the limit remains random.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "linfty-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "the-implication-structure"
        }
      ]
    },
    {
      "id": "lec04-015",
      "type": "multiple-select",
      "topic": "Typewriter sequence",
      "difficulty": "core",
      "prompt": "For the typewriter sequence \\(T_n\\) defined above, which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
          "label": "Construction",
          "text": "On \\([0,1)\\) with uniform probability, define\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nwhere \\(m\\ge0\\) and \\(k\\in\\{0,\\ldots,2^m-1\\}\\) are integers. Read each row \\(m\\) from left to right over \\(k\\), then move to the next row."
        }
      ],
      "explanation": "At level \\(m\\), \\(\\mathbb E|T_n|^p=2^{-m}\\) for every finite \\(p\\ge1\\), and \\(m\\to\\infty\\) as \\(n\\to\\infty\\). Hence \\(L^1\\), \\(L^2\\), probability and distribution convergence hold. Each \\(u\\) belongs to one interval in every row and is outside others, so its values include infinitely many ones and zeros: no almost sure convergence. The essential supremum remains 1.",
      "visual": {
        "kind": "typewriter",
        "levels": 4,
        "xLabel": "u",
        "yLabel": "Row m",
        "title": "A moving interval",
        "description": "Rows m=0,1,2,3 split [0,1) into 1,2,4,8 half-open intervals. The cells in each row are separate consecutive terms, not one combined event.",
        "caption": "Read each row from left to right, then move down. Each cell is the support of one indicator and is labelled by its index n. All endpoints on the right are excluded."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "the-typewriter-sequence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "typewriter-l_p-convergence-without-almost-sure-convergence"
        }
      ]
    },
    {
      "id": "lec04-016",
      "type": "proof-step",
      "topic": "Typewriter sequence",
      "difficulty": "challenge",
      "prompt": "What completes the argument that the typewriter sequence does not converge almost surely?",
      "options": [
        {
          "id": "a",
          "text": "Since each term has expectation tending to zero, every trajectory must tend to zero."
        },
        {
          "id": "b",
          "text": "Disjoint cells in the same row mean all terms of the entire sequence are independent."
        },
        {
          "id": "c",
          "text": "Each \\(u\\) appears in just one row, so it eventually has value zero."
        },
        {
          "id": "d",
          "text": "Every \\(u\\) has infinitely many ones and infinitely many zeros along the sequence, so it has no pointwise limit."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "context": [
        {
          "label": "Theorem",
          "text": "On \\([0,1)\\) with uniform probability, define\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nwhere \\(m\\ge0\\) and \\(k\\in\\{0,\\ldots,2^m-1\\}\\) are integers. Read each row \\(m\\) from left to right over \\(k\\), then move to the next row. The sequence \\((T_n)\\) does not converge almost surely."
        },
        {
          "label": "Proof so far",
          "text": "Fix \\(u\\in[0,1)\\). In each row \\(m\\ge1\\), exactly one interval contains \\(u\\), and at least one interval does not. The terms are read row by row."
        }
      ],
      "explanation": "For every row \\(m\\ge1\\) there is a term equal to 1 and at least one other term equal to 0 at the chosen \\(u\\). There are infinitely many rows, so neither value disappears. In fact the sequence fails to converge at every point, a stronger conclusion than merely failing almost surely.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "the-typewriter-sequence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "typewriter-l_p-convergence-without-almost-sure-convergence"
        }
      ]
    },
    {
      "id": "lec04-017",
      "type": "numeric-input",
      "topic": "Typewriter sequence",
      "difficulty": "intro",
      "prompt": "For the typewriter sequence above, compute \\(\\mathbb P(T_{12}>\\tfrac12)\\).",
      "acceptedAnswers": [
        "1/8",
        "0.125"
      ],
      "correctAnswer": "1/8",
      "context": [
        {
          "label": "Construction",
          "text": "On \\([0,1)\\) with uniform probability, define\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nwhere \\(m\\ge0\\) and \\(k\\in\\{0,\\ldots,2^m-1\\}\\) are integers. Read each row \\(m\\) from left to right over \\(k\\), then move to the next row."
        }
      ],
      "explanation": "\\(12=2^3+4\\), so this is row \\(m=3\\) and cell \\(k=4\\), namely \\([\\tfrac12,\\tfrac58)\\). The indicator exceeds \\(\\frac12\\) exactly on that interval, whose length is \\(\\frac18\\).",
      "visual": {
        "kind": "typewriter",
        "levels": 4,
        "xLabel": "u",
        "yLabel": "Row m",
        "title": "A moving interval",
        "description": "Rows m=0,1,2,3 split [0,1) into 1,2,4,8 half-open intervals. The cells in each row are separate consecutive terms, not one combined event.",
        "caption": "Read each row from left to right, then move down. Each cell is the support of one indicator and is labelled by its index n. All endpoints on the right are excluded."
      },
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "the-typewriter-sequence"
        }
      ],
      "answerDisplay": "\\(\\frac{1}{8}\\)"
    },
    {
      "id": "lec04-018",
      "type": "multiple-select",
      "topic": "Typewriter sequence",
      "difficulty": "challenge",
      "prompt": "Modify the typewriter sequence by setting \\(Y_n=\\frac{T_n}{m+1}\\) when \\(n=2^m+k\\). Which listed modes of convergence of \\(Y_n\\) to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
          "label": "Construction",
          "text": "On \\([0,1)\\) with uniform probability, define\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nwhere \\(m\\ge0\\) and \\(k\\in\\{0,\\ldots,2^m-1\\}\\) are integers. Read each row \\(m\\) from left to right over \\(k\\), then move to the next row."
        }
      ],
      "explanation": "Although the supports still move, the largest possible height is \\(\\frac1{m+1}\\to0\\). Thus \\(\\lVert Y_n\\rVert_\\infty\\to0\\) and all six modes hold. Repeated visits to each point do not obstruct convergence when their amplitudes vanish.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "linfty-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 127,
          "anchor": "the-typewriter-sequence"
        }
      ]
    },
    {
      "id": "lec04-019",
      "type": "proof-step",
      "topic": "Definitions and implications",
      "difficulty": "challenge",
      "prompt": "Which step produces one exceptional set outside which convergence is pointwise?",
      "options": [
        {
          "id": "a",
          "text": "A union of uncountably many null sets always has probability zero."
        },
        {
          "id": "b",
          "text": "Each \\(A_n\\) must be empty because its probability is zero."
        },
        {
          "id": "c",
          "text": "Set \\(A=\\bigcup_{n\\ge1}A_n\\). Countable subadditivity gives \\(\\mathbb P(A)=0\\); outside \\(A\\) all the bounds hold, so \\(|X_n-X|\\to0\\)."
        },
        {
          "id": "d",
          "text": "Set \\(A=\\bigcap_{n\\ge1}A_n\\); outside this intersection every bound necessarily holds."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(X,X_1,X_2,\\ldots\\in L^\\infty\\) on one probability space. If \\(\\lVert X_n-X\\rVert_\\infty\\to0\\), then \\(X_n\\to X\\) almost surely."
        },
        {
          "label": "Proof so far",
          "text": "For each \\(n\\), choose a null set \\(A_n\\) such that\n\\[|X_n-X|\\le\\lVert X_n-X\\rVert_\\infty\\quad\\text{outside }A_n.\\]\nThe bound tends to zero, but the exceptional set depends on \\(n\\)."
        }
      ],
      "explanation": "A single countable union removes all exceptional sets at once. Outside it, \\(|X_n-X|\\le\\lVert X_n-X\\rVert_\\infty\\) for every \\(n\\), and the right side tends to zero. Probability zero is not the same as being empty.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "linfty-convergence"
        }
      ]
    },
    {
      "id": "lec04-020",
      "type": "multiple-select",
      "topic": "Definitions and implications",
      "difficulty": "core",
      "prompt": "On \\([0,1]\\) with uniform probability and its Borel sets, put \\(X_n(u)=n\\) if \\(u=\\frac1n\\), and \\(X_n(u)=0\\) otherwise. Which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "Each singleton \\(\\{1/n\\}\\) has probability zero, so \\(X_n=0\\) almost surely for each \\(n\\) and every error norm, including the essential supremum, is zero. Each fixed \\(u\\) is exceptional for at most one \\(n\\), so even pointwise convergence holds everywhere. The ordinary supremum is \\(n\\), but \\(L^\\infty\\) uses the essential supremum.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 117,
          "anchor": "almost-sure-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 120,
          "anchor": "the-space-linftymathbb-p"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 121,
          "anchor": "linfty-convergence"
        }
      ]
    },
    {
      "id": "lec04-021",
      "type": "numeric-input",
      "topic": "Markov bounds",
      "difficulty": "intro",
      "prompt": "A nonnegative waiting time \\(W\\) has \\(\\mathbb E[W]=3\\) minutes. What upper bound does Markov give for \\(\\mathbb P(W\\ge12\\text{ minutes})\\)? Enter the bound as a probability.",
      "acceptedAnswers": [
        "0.25",
        "1/4",
        "25%"
      ],
      "correctAnswer": "0.25",
      "explanation": "Markov gives \\(\\mathbb P(W\\ge12)\\le\\frac{\\mathbb E[W]}{12}=\\frac3{12}=\\frac14\\). This is a guaranteed upper bound, not a claim that the probability is exactly \\(\\frac14\\). No exponential waiting-time model is assumed.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "markovs-inequality"
        }
      ],
      "answerDisplay": "\\(0.25\\)"
    },
    {
      "id": "lec04-022",
      "type": "numeric-input",
      "topic": "Deviation bounds",
      "difficulty": "core",
      "prompt": "A measurement \\(X\\) has \\(\\mathbb E[X]=100\\) and \\(\\operatorname{Var}(X)=4\\). Apply Markov to \\(Z=(X-100)^2\\) to bound \\(\\mathbb P(|X-100|\\ge6)\\). What bound do you get? Give an exact fraction.",
      "acceptedAnswers": [
        "1/9"
      ],
      "correctAnswer": "1/9",
      "explanation": "The event is \\(\\{Z\\ge36\\}\\); \\(Z\\ge0\\) and \\(\\mathbb E[Z]=4\\). Markov yields \\(\\frac4{36}=\\frac19\\). This application to a squared centred error is Chebyshev’s inequality. It uses only the stated finite mean and variance, not a normal model.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "markovs-inequality"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 125,
          "anchor": "chebyshevs-inequality"
        }
      ],
      "answerDisplay": "\\(\\frac{1}{9}\\)"
    },
    {
      "id": "lec04-023",
      "type": "find-the-intruder",
      "topic": "Markov bounds",
      "difficulty": "core",
      "prompt": "Let \\(Z\\ge0\\) be integrable and let \\(X\\) be any real variable with \\(\\mathbb E[X^2]<\\infty\\). Find the one assertion that is NOT valid in general.",
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
          "text": "\\(\\mathbb P(X\\ge2)\\le\\frac{\\mathbb E[X]}2\\), even if \\(X\\) can be negative."
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
      "explanation": "Markov requires a nonnegative variable. With \\(X\\equiv-1\\), the claimed bound for \\(X\\) would read \\(0\\le-\\frac12\\), which is false. The other bounds apply Markov to \\(Z\\), \\(|X|\\) and \\(X^2\\). A finite second moment ensures \\(\\mathbb E|X|<\\infty\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "markovs-inequality"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 126,
          "anchor": "lp-and-probability-convergence"
        }
      ]
    },
    {
      "id": "lec04-024",
      "type": "proof-step",
      "topic": "Markov bounds",
      "difficulty": "core",
      "prompt": "Which pointwise inequality supplies the missing step?",
      "options": [
        {
          "id": "a",
          "text": "\\(Z\\le a\\mathbf1_{\\{Z\\ge a\\}}\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbf1_{\\{Z\\ge a\\}}=\\frac Za\\) for every outcome."
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
          "label": "Theorem",
          "text": "For a nonnegative integrable random variable \\(Z\\) and \\(a>0\\),\n\\[\\mathbb P(Z\\ge a)\\le\\frac{\\mathbb E[Z]}{a}.\\]"
        },
        {
          "label": "Proof so far",
          "text": "Let \\(I=\\mathbf1_{\\{Z\\ge a\\}}\\), so \\(\\mathbb E[I]=\\mathbb P(Z\\ge a)\\). We need a pointwise comparison whose expectation gives \\(a\\mathbb E[I]\\le\\mathbb E[Z]\\)."
        }
      ],
      "explanation": "On \\(\\{Z\\ge a\\}\\), the left side is \\(a\\le Z\\); off that event it is \\(0\\le Z\\). Taking expectations gives \\(a\\mathbb P(Z\\ge a)\\le\\mathbb E[Z]\\); division by \\(a>0\\) completes Markov’s inequality.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "markovs-inequality"
        }
      ]
    },
    {
      "id": "lec04-025",
      "type": "numeric-input",
      "topic": "Markov bounds",
      "difficulty": "core",
      "prompt": "A nonnegative payout \\(Z\\) takes only 0 and 10 euros and has \\(\\mathbb E[Z]=2\\) euros. Find \\(\\mathbb P(Z\\ge10)\\). This example tests whether Markov’s bound can be attained.",
      "acceptedAnswers": [
        "0.2",
        "1/5",
        "20%"
      ],
      "correctAnswer": "0.2",
      "explanation": "If \\(q=\\mathbb P(Z=10)\\), then \\(\\mathbb E[Z]=10q=2\\), so \\(q=\\frac15\\). The event \\(Z\\ge10\\) is exactly \\(Z=10\\). Markov also gives \\(\\frac{\\mathbb E[Z]}{10}=\\frac15\\), so equality is attained. Replacing \\(\\ge\\) by \\(>\\) would change the event: \\(\\mathbb P(Z>10)=0\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "markovs-inequality"
        }
      ],
      "answerDisplay": "\\(0.2\\)"
    },
    {
      "id": "lec04-026",
      "type": "numeric-input",
      "topic": "Deviation bounds",
      "difficulty": "core",
      "prompt": "An error \\(E_n\\) satisfies \\(\\mathbb E[E_n^2]\\le\\frac9n\\) for every positive integer \\(n\\). Using Markov on \\(E_n^2\\), what is the smallest integer \\(n\\) for which this bound guarantees \\(\\mathbb P(|E_n|\\ge0.3)\\le0.01\\)?",
      "integerAnswer": true,
      "acceptedAnswers": [
        "10000"
      ],
      "correctAnswer": "10000",
      "explanation": "Markov gives \\(\\mathbb P(|E_n|\\ge0.3)\\le\\frac{9/n}{0.3^2}=\\frac{100}n\\). Requiring \\(\\frac{100}n\\le0.01\\) gives \\(n\\ge10000\\). This is the smallest \\(n\\) certified by this bound, not necessarily the smallest \\(n\\) for the actual unknown error distribution.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 124,
          "anchor": "markovs-inequality"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 126,
          "anchor": "lp-and-probability-convergence"
        }
      ],
      "answerDisplay": "\\(10000\\)"
    },
    {
      "id": "lec04-027",
      "type": "proof-step",
      "topic": "Moment convergence",
      "difficulty": "challenge",
      "prompt": "Which estimate completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(|X_n-X|>\\varepsilon)\\ge\\frac{\\mathbb E|X_n-X|^p}{\\varepsilon^p}\\), which proves the result."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(X_n=X)\\ge1-\\mathbb E|X_n-X|^p\\), so exact equality is eventually certain."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(|X_n-X|>\\varepsilon)\\le\\frac{\\mathbb E|X_n-X|^p}{\\varepsilon^p}\\to0\\)."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(|X_n-X|>\\varepsilon)=\\mathbb E|X_n-X|^p\\) for every \\(\\varepsilon\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(1\\le p<\\infty\\) and let \\(X,X_1,X_2,\\ldots\\in L^p\\) on one probability space. If \\(\\mathbb E|X_n-X|^p\\to0\\), then \\(X_n\\to X\\) in probability."
        },
        {
          "label": "Proof so far",
          "text": "Fix \\(\\varepsilon>0\\) and set \\(Z_n=|X_n-X|^p\\). This variable is nonnegative and integrable. Apply Markov's inequality with threshold \\(\\varepsilon^p>0\\)."
        }
      ],
      "explanation": "The event \\(\\{|X_n-X|>\\varepsilon\\}\\) is contained in \\(\\{Z_n\\ge\\varepsilon^p\\}\\). Markov gives the upper bound. For each fixed \\(\\varepsilon>0\\) its denominator is positive and constant while its numerator tends to zero. No independence is needed.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 126,
          "anchor": "lp-and-probability-convergence"
        }
      ]
    },
    {
      "id": "lec04-028",
      "type": "multiple-choice",
      "topic": "Definitions and implications",
      "difficulty": "intro",
      "prompt": "A student checks only that \\(\\mathbb P(|X_n|>1)\\to0\\) and concludes \\(X_n\\to0\\) in probability. Which deterministic sequence disproves that reasoning?",
      "options": [
        {
          "id": "a",
          "text": "\\(X_n\\equiv0\\) for every \\(n\\)."
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
          "text": "\\(X_n\\equiv\\frac12\\) for every \\(n\\)."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "For the constant error \\(\\frac12\\), \\(\\mathbb P(|X_n|>1)=0\\) but \\(\\mathbb P(|X_n|>\\tfrac14)=1\\) for every \\(n\\). The definition tests every fixed \\(\\varepsilon>0\\). The other three sequences really do converge to zero.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 122,
          "anchor": "convergence-in-probability"
        }
      ]
    },
    {
      "id": "lec04-029",
      "type": "multiple-choice",
      "topic": "Bounded errors",
      "difficulty": "challenge",
      "prompt": "Let \\(X_n=\\frac Un\\) with one \\(U\\sim\\operatorname{Unif}(0,1)\\). Although \\(\\mathbb P\\bigl(|X_n|>\\tfrac1{2n}\\bigr)=\\frac12\\) for every \\(n\\), does \\(X_n\\) converge to 0 in probability?",
      "options": [
        {
          "id": "a",
          "text": "Yes: for each fixed \\(\\varepsilon>0\\), \\(|X_n|\\le\\frac1n<\\varepsilon\\) eventually. The displayed threshold depends on \\(n\\)."
        },
        {
          "id": "b",
          "text": "No: every positive threshold sequence must have exceedance probability tending to zero."
        },
        {
          "id": "c",
          "text": "No: a probability equal to \\(\\frac12\\) rules out every mode of convergence."
        },
        {
          "id": "d",
          "text": "Yes, because \\(\\mathbb P(X_n=0)=1\\) for large \\(n\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "The definition fixes \\(\\varepsilon\\) before taking \\(n\\to\\infty\\). A tolerance that shrinks as \\(\\frac1{2n}\\) can reveal the scale of an error even while the error itself vanishes. In fact \\(\\lVert X_n\\rVert_\\infty=\\frac1n\\to0\\), whereas \\(\\mathbb P(X_n=0)=0\\) for all \\(n\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 122,
          "anchor": "convergence-in-probability"
        }
      ]
    },
    {
      "id": "lec04-030",
      "type": "multiple-select",
      "topic": "Dominated convergence",
      "difficulty": "core",
      "prompt": "Suppose \\(0\\le X_n\\le1\\) almost surely for every \\(n\\) and \\(X_n\\to0\\) in probability. Which listed modes of convergence to 0 MUST follow from these assumptions?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
      "explanation": "The dominating variable \\(Y\\equiv1\\) belongs to every finite \\(L^p\\) space. Dominated convergence in \\(L^p\\) therefore gives \\(L^1\\) and \\(L^2\\) convergence from probability convergence; distribution convergence also follows. Almost sure convergence is not guaranteed: the typewriter sequence is a counterexample. Its essential supremum 1 also disproves a guaranteed \\(L^\\infty\\) conclusion.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "dominated-convergence-in-lp"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "typewriter-l_p-convergence-without-almost-sure-convergence"
        }
      ]
    },
    {
      "id": "lec04-031",
      "type": "multiple-choice",
      "topic": "CDFs and weak convergence",
      "difficulty": "intro",
      "prompt": "Let \\(X_n\\equiv\\frac1n\\) and \\(X\\equiv0\\). Their CDFs satisfy \\(F_n(0)=0\\) and \\(F(0)=1\\). Which conclusion is correct?",
      "options": [
        {
          "id": "a",
          "text": "\\(F\\) is not a valid CDF because it has a jump."
        },
        {
          "id": "b",
          "text": "\\(X_n\\) converges only in \\(L^1\\), not in distribution."
        },
        {
          "id": "c",
          "text": "\\(X_n\\) converges in distribution to \\(X\\): \\(x=0\\) is a discontinuity of \\(F\\), where CDF convergence is not required."
        },
        {
          "id": "d",
          "text": "Distribution convergence fails because CDFs must converge at every real \\(x\\)."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "For \\(x<0\\), both CDFs are zero. For each fixed \\(x>0\\), eventually \\(\\frac1n\\le x\\), so \\(F_n(x)=F(x)=1\\). These are all continuity points of \\(F\\). No condition is imposed at its jump \\(x=0\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 133,
          "anchor": "convergence-in-distribution-the-cdf-criterion"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 134,
          "anchor": "a-set-with-positive-boundary-probability"
        }
      ]
    },
    {
      "id": "lec04-032",
      "type": "multiple-choice",
      "topic": "CDFs and weak convergence",
      "difficulty": "core",
      "prompt": "Real random variables \\(X_n\\) on one probability space converge in distribution to the constant 3. What additional conclusion is guaranteed, without any moment assumptions?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb E|X_n-3|\\to0\\)."
        },
        {
          "id": "b",
          "text": "\\(X_n\\) converges to 3 almost surely."
        },
        {
          "id": "c",
          "text": "\\(X_n=3\\) almost surely for all sufficiently large \\(n\\)."
        },
        {
          "id": "d",
          "text": "\\(X_n\\) converges to 3 in probability."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Distribution convergence to a constant is equivalent to probability convergence. It need not give \\(L^1\\) convergence: \\(3+n\\mathbf1_{\\{U\\le1/n\\}}\\), with a single \\(U\\sim\\operatorname{Unif}(0,1)\\), converges in distribution to 3 but its mean absolute error stays 1. The shifted typewriter sequence \\(3+T_n\\) rules out a guaranteed almost sure conclusion.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 135,
          "anchor": "probability-and-distributional-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "almost-sure-convergence-without-l1-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "typewriter-l_p-convergence-without-almost-sure-convergence"
        }
      ]
    },
    {
      "id": "lec04-033",
      "type": "find-the-intruder",
      "topic": "CDFs and weak convergence",
      "difficulty": "challenge",
      "prompt": "Let \\(X_n\\equiv\\frac1n\\) and \\(X\\equiv0\\). A continuity set for the law of \\(X\\) is a Borel set \\(A\\) with \\(\\mathbb P(X\\in\\partial A)=0\\), where \\(\\partial A\\) is its boundary in \\(\\mathbb R\\). Which set is NOT a continuity set?",
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
      "explanation": "The boundary of \\(\\{0\\}\\) is \\(\\{0\\}\\), with limit probability 1. Its probabilities are \\(\\mathbb P(X_n\\in\\{0\\})=0\\) and \\(\\mathbb P(X\\in\\{0\\})=1\\). The other boundaries are \\(\\{-1,1\\}\\), \\(\\{2,3\\}\\) and \\(\\{-1\\}\\); all have zero limit probability. Portmanteau guarantees set-probability convergence only for continuity sets.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 132,
          "anchor": "the-portmanteau-theorem"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 134,
          "anchor": "a-set-with-positive-boundary-probability"
        }
      ]
    },
    {
      "id": "lec04-034",
      "type": "multiple-choice",
      "topic": "Transforming limits",
      "difficulty": "core",
      "prompt": "Let \\(X_n\\equiv\\frac1n\\), \\(X\\equiv0\\) and \\(g(x)=\\mathbf1_{\\{x>0\\}}\\). Then \\(X_n\\to X\\) in every listed convergence mode. What happens after applying \\(g\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(g(X_n)\\equiv0\\) because \\(X_n\\) becomes very small."
        },
        {
          "id": "b",
          "text": "\\(g(X_n)\\equiv1\\) does not converge in distribution to \\(g(X)\\equiv0\\); \\(g\\) is discontinuous at the limit point 0."
        },
        {
          "id": "c",
          "text": "\\(g(X_n)\\to g(X)\\) almost surely because every measurable map preserves convergence."
        },
        {
          "id": "d",
          "text": "\\(g\\) is continuous at 0 because it is bounded."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Every \\(\\frac1n\\) is strictly positive, so \\(g(X_n)=1\\) for all \\(n\\), but \\(g(0)=0\\). Measurability and boundedness alone do not suffice for the continuous mapping theorem. Here the entire limit mass sits at a discontinuity of \\(g\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 138,
          "anchor": "continuous-mapping-theorem"
        }
      ]
    },
    {
      "id": "lec04-035",
      "type": "multiple-choice",
      "topic": "Transforming limits",
      "difficulty": "core",
      "prompt": "Suppose \\(X_n\\) converges in distribution to \\(X\\sim\\operatorname{Unif}(-1,1)\\). Set \\(g(x)=\\mathbf1_{\\{x>0\\}}\\). Which conclusion follows from the continuous mapping theorem?",
      "options": [
        {
          "id": "a",
          "text": "\\(g(X_n)\\) converges almost surely to \\(\\frac12\\)."
        },
        {
          "id": "b",
          "text": "\\(g(X_n)\\) converges in probability to \\(g(X)\\) without any further assumptions."
        },
        {
          "id": "c",
          "text": "\\(g(X_n)\\) converges in distribution to a \\(\\operatorname{Bernoulli}(\\tfrac12)\\) variable, since \\(\\mathbb P(X=0)=0\\)."
        },
        {
          "id": "d",
          "text": "The theorem is unusable whenever \\(g\\) has any discontinuity anywhere."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "The only discontinuity of \\(g\\) is at 0, and the uniform limit puts zero probability there. The theorem gives distribution convergence to \\(g(X)\\). This indicator is 1 with probability \\(\\mathbb P(X>0)=\\frac12\\) and 0 otherwise. It gives a law, not a coupling-based probability or almost sure limit.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 138,
          "anchor": "continuous-mapping-theorem"
        }
      ]
    },
    {
      "id": "lec04-036",
      "type": "multiple-choice",
      "topic": "Characteristic functions and limits",
      "difficulty": "core",
      "prompt": "Real random variables \\(X_n\\) have characteristic functions \\(\\varphi_n(t)=\\exp\\!\\left(-\\frac{t^2}{2n}\\right)\\) for every real \\(t\\). Which distributional limit is identified by Lévy’s theorem? Here a characteristic function is \\(\\mathbb E[e^{itX}]\\), with \\(i^2=-1\\).",
      "options": [
        {
          "id": "a",
          "text": "The constant 1, whose characteristic function is identically 1."
        },
        {
          "id": "b",
          "text": "\\(\\mathcal N(0,1)\\), whose characteristic function is \\(e^{-t^2/2}\\)."
        },
        {
          "id": "c",
          "text": "No limit, because the variables can be on different probability spaces."
        },
        {
          "id": "d",
          "text": "The constant 0, whose characteristic function is identically 1."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "For each fixed real \\(t\\), \\(\\varphi_n(t)\\to1\\). The function \\(\\varphi(t)=1\\) is continuous at 0 and equals \\(\\mathbb E[e^{it\\cdot0}]\\). Lévy’s theorem therefore gives convergence in distribution to 0. The constant 1 instead has characteristic function \\(e^{it}\\).",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 137,
          "anchor": "lévys-continuity-theorem"
        }
      ]
    },
    {
      "id": "lec04-037",
      "type": "multiple-choice",
      "topic": "Characteristic functions and limits",
      "difficulty": "challenge",
      "prompt": "Let \\(X_n\\sim\\mathcal N(0,n)\\), so \\(\\varphi_n(t)=e^{-nt^2/2}\\). The pointwise limit equals 1 at \\(t=0\\) and 0 at every \\(t\\ne0\\). What can we conclude about a distributional limit on \\(\\mathbb R\\)?",
      "options": [
        {
          "id": "a",
          "text": "There is no probability distribution limit on \\(\\mathbb R\\): the pointwise limit is discontinuous at 0 and cannot be a characteristic function."
        },
        {
          "id": "b",
          "text": "The limit is the constant 0 because \\(\\varphi_n(t)\\to0\\) for \\(t\\ne0\\)."
        },
        {
          "id": "c",
          "text": "The limit is a uniform probability distribution over all of \\(\\mathbb R\\)."
        },
        {
          "id": "d",
          "text": "A pointwise limit always defines a characteristic function, regardless of continuity."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Every characteristic function is continuous at 0. If a distributional limit existed, the converse direction of Lévy’s theorem would force its characteristic function to equal this pointwise limit, which is impossible. Merely noting that a sufficient hypothesis fails would not alone prove nonconvergence; the converse gives the contradiction.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 137,
          "anchor": "lévys-continuity-theorem"
        }
      ]
    },
    {
      "id": "lec04-038",
      "type": "proof-step",
      "topic": "Dominated convergence",
      "difficulty": "challenge",
      "prompt": "Which integrable bound lets dominated convergence finish the proof?",
      "options": [
        {
          "id": "a",
          "text": "Almost sure convergence by itself guarantees convergence of every moment."
        },
        {
          "id": "b",
          "text": "\\(|X_n-X|^p\\le(2Y)^p\\) and \\(\\mathbb E[(2Y)^p]=2^p\\mathbb E[Y^p]<\\infty\\)."
        },
        {
          "id": "c",
          "text": "\\(|X_n-X|^p\\le Y\\) always, without any restriction on \\(p\\) or \\(Y\\)."
        },
        {
          "id": "d",
          "text": "Use the bound \\(n^p\\); a bound depending on \\(n\\) is automatically sufficient."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "context": [
        {
          "label": "Theorem",
          "text": "Fix \\(1\\le p<\\infty\\). Suppose \\(X_n\\to X\\) almost surely and \\(|X_n|\\le Y\\) almost surely for every \\(n\\), where \\(Y\\ge0\\) and \\(\\mathbb E[Y^p]<\\infty\\). Then \\(X\\in L^p\\) and \\(X_n\\to X\\) in \\(L^p\\)."
        },
        {
          "label": "Proof so far",
          "text": "Outside one null set, all bounds and pointwise convergence hold. Taking the limit gives \\(|X|\\le Y\\), hence \\(X\\in L^p\\). Also \\(|X_n-X|^p\\to0\\) almost surely. To pass to expectations we still need a common integrable bound."
        }
      ],
      "explanation": "The triangle inequality gives \\(|X_n-X|\\le|X_n|+|X|\\le2Y\\) almost surely. Raising to \\(p\\) yields a single integrable bound, independent of \\(n\\). Dominated convergence gives \\(\\mathbb E|X_n-X|^p\\to0\\). The same \\(Y\\) for every \\(n\\) is essential to this argument.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 130,
          "anchor": "dominated-convergence-in-lp"
        }
      ]
    },
    {
      "id": "lec04-039",
      "type": "find-the-intruder",
      "topic": "Definitions and implications",
      "difficulty": "intro",
      "prompt": "For real random variables on a probability space, find the implication that is NOT valid in general. Each norm-convergence claim assumes membership in that space.",
      "options": [
        {
          "id": "a",
          "text": "Almost sure convergence implies convergence in probability."
        },
        {
          "id": "b",
          "text": "Convergence in probability implies convergence in distribution."
        },
        {
          "id": "c",
          "text": "\\(L^1\\) convergence implies almost sure convergence."
        },
        {
          "id": "d",
          "text": "\\(L^2\\) convergence implies \\(L^1\\) convergence."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "The typewriter sequence converges in \\(L^1\\) to 0 but fails to converge almost surely. The other implications are valid on a probability space. In particular \\(\\lVert V\\rVert_1\\le\\lVert V\\rVert_2\\) for \\(V\\in L^2\\) gives the norm comparison.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "typewriter-l_p-convergence-without-almost-sure-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 139,
          "anchor": "the-implication-structure"
        }
      ]
    },
    {
      "id": "lec04-040",
      "type": "multiple-select",
      "topic": "Typewriter sequence",
      "difficulty": "challenge",
      "prompt": "On the same uniform space \\([0,1)\\), add a shrinking-support spike to the typewriter sequence: \\(X_n(u)=T_n(u)+n\\mathbf1_{\\{0<u\\le1/n^2\\}}\\). Which listed modes of convergence to 0 hold?",
      "options": [
        {
          "id": "as",
          "text": "Almost surely"
        },
        {
          "id": "prob",
          "text": "In probability"
        },
        {
          "id": "dist",
          "text": "In distribution"
        },
        {
          "id": "l1",
          "text": "In \\(L^1\\)"
        },
        {
          "id": "l2",
          "text": "In \\(L^2\\)"
        },
        {
          "id": "linf",
          "text": "In \\(L^\\infty\\)"
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
          "label": "Construction",
          "text": "On \\([0,1)\\) with uniform probability, define\n\\[T_{2^m+k}(u)=\\mathbf1_{[k2^{-m},\\,(k+1)2^{-m})}(u),\\]\nwhere \\(m\\ge0\\) and \\(k\\in\\{0,\\ldots,2^m-1\\}\\) are integers. Read each row \\(m\\) from left to right over \\(k\\), then move to the next row."
        }
      ],
      "explanation": "For \\(n=2^m+k\\), nonnegativity gives \\(\\mathbb E|X_n|=2^{-m}+\\frac1n\\to0\\), so \\(L^1\\), probability and distribution convergence hold. But \\(\\mathbb E[X_n^2]\\ge n^2\\frac1{n^2}=1\\), and \\(\\lVert X_n\\rVert_\\infty\\ge n\\), so neither \\(L^2\\) nor \\(L^\\infty\\) holds. For every \\(u>0\\) the spike eventually vanishes; the remaining typewriter values still oscillate between 0 and 1 infinitely often. Almost sure convergence fails.",
      "sources": [
        {
          "sourceId": "lecture-4-slides",
          "slide": 128,
          "anchor": "typewriter-l_p-convergence-without-almost-sure-convergence"
        },
        {
          "sourceId": "lecture-4-slides",
          "slide": 129,
          "anchor": "almost-sure-convergence-without-l1-convergence"
        }
      ]
    }
  ]
};
