window.LECTURE_5_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "en-GB",
  "block": {
    "id": "lecture-5",
    "title": "Lecture 5",
    "description": "Week 3, slides 2–21: sample means, laws of large numbers, the CLT and normal approximations",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "sources/week-3/index.html#/laws-of-large-numbers-and-normal-approximations",
    "featuredTopics": [
      "Samples and averages",
      "Finite-sample bounds",
      "Laws of large numbers",
      "Averages of functions",
      "Central limit theorem",
      "Normal approximations"
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
      "title": "Statistical Inference 2026 — Week 3 (reference snapshot)",
      "author": "Alexander Taveira Blomenhofer",
      "url": "sources/week-3/index.html",
      "slideRange": [
        2,
        21
      ],
      "checkedOn": "2026-09-25",
      "sourceFile": "slides-2026-week-3/index.qmd",
      "sourceSha256": "5ab1eeed957411a72bc0f80321ea75825ff91d3fae785a754d9664f37463e3da",
      "deckSha256": "d393c4919aceb0fb4f6a6e67f2e653e24301155b633a2df5e2e996e0dfa78e91",
      "renderedSourceFile": "slides-2026-week-3/_site/index.html"
    }
  },
  "exercises": [
    {
      "id": "lec05-001",
      "type": "multiple-choice",
      "topic": "Samples and averages",
      "difficulty": "intro",
      "prompt": "Which construction is a random sample of size \\(4\\) from a Bernoulli distribution with success probability \\(1/2\\)?",
      "options": [
        {
          "id": "a",
          "text": "Four independent Bernoulli\\((1/2)\\) variables."
        },
        {
          "id": "b",
          "text": "One Bernoulli\\((1/2)\\) variable \\(Y\\), recorded four times."
        },
        {
          "id": "c",
          "text": "Four independent Bernoulli variables with success probabilities \\(0.1,0.2,0.3,0.4\\)."
        },
        {
          "id": "d",
          "text": "The four variables \\(Y,1-Y,Y,1-Y\\), using one Bernoulli\\((1/2)\\) variable \\(Y\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A random sample consists of independent variables with the same distribution. Reusing one random draw creates dependence. Independent draws with different success probabilities are not identically distributed.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 3,
          "anchor": "random-samples-and-sample-means",
          "sourceKey": "stmt-random-sample"
        }
      ]
    },
    {
      "id": "lec05-002",
      "type": "numeric-input",
      "topic": "Samples and averages",
      "difficulty": "intro",
      "prompt": "The observed values are \\(4,6,8,10\\). What is their sample mean?",
      "correctAnswer": "7",
      "acceptedAnswers": [
        "7"
      ],
      "answerDisplay": "\\(7\\)",
      "explanation": "The sample mean is the sum divided by the number of observations: \\(\\bar x_4=(4+6+8+10)/4=7\\). This is a value computed from data, not an assumption about the population mean.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 3,
          "anchor": "random-samples-and-sample-means",
          "sourceKey": "stmt-random-sample"
        }
      ]
    },
    {
      "id": "lec05-003",
      "type": "multiple-choice",
      "topic": "Samples and averages",
      "difficulty": "intro",
      "prompt": "Nine i.i.d. measurements have population mean \\(12\\) and standard deviation \\(3\\). What is \\(\\mathbb E(\\bar X_9)\\)?",
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
      "explanation": "Linearity gives \\(\\mathbb E(\\bar X_9)=9^{-1}\\sum_{i=1}^9\\mathbb E(X_i)=12\\). Averaging changes the variability, not the expected value.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "mean-and-variance-of-the-sample-mean",
          "sourceKey": "stmt-sample-mean-moments"
        }
      ]
    },
    {
      "id": "lec05-004",
      "type": "numeric-input",
      "topic": "Samples and averages",
      "difficulty": "core",
      "prompt": "For \\(25\\) i.i.d. observations with variance \\(36\\), compute \\(\\mathbb V(\\bar X_{25})\\).",
      "correctAnswer": "36/25",
      "acceptedAnswers": [
        "36/25"
      ],
      "answerDisplay": "\\(\\frac{36}{25}\\)",
      "explanation": "Independence gives \\(\\mathbb V(\\bar X_n)=\\sigma^2/n\\). Thus the variance is \\(36/25=1.44\\). The standard deviation would be \\(6/5\\), a different quantity.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "mean-and-variance-of-the-sample-mean",
          "sourceKey": "stmt-sample-mean-moments"
        }
      ]
    },
    {
      "id": "lec05-005",
      "type": "multiple-choice",
      "topic": "Samples and averages",
      "difficulty": "core",
      "prompt": "For i.i.d. observations with fixed standard deviation \\(\\sigma>0\\), how must the sample size change to halve the standard deviation of the sample mean?",
      "options": [
        {
          "id": "a",
          "text": "Double it."
        },
        {
          "id": "b",
          "text": "Multiply it by four."
        },
        {
          "id": "c",
          "text": "Halve it."
        },
        {
          "id": "d",
          "text": "Multiply it by eight."
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
        "title": "Averaging reduces spread",
        "description": "Illustration for a population standard deviation of 6. Bar heights are standard deviations of sample means.",
        "caption": "Illustration for a population standard deviation of 6. Bar heights are standard deviations of sample means.",
        "xLabel": "Sample size",
        "yLabel": "Standard deviation"
      },
      "explanation": "The standard deviation is \\(\\sigma/\\sqrt n\\). Replacing \\(n\\) by \\(4n\\) divides it by \\(2\\). Doubling \\(n\\) only divides it by \\(\\sqrt2\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "mean-and-variance-of-the-sample-mean",
          "sourceKey": "stmt-sample-mean-moments"
        }
      ]
    },
    {
      "id": "lec05-006",
      "type": "numeric-input",
      "topic": "Finite-sample bounds",
      "difficulty": "intro",
      "prompt": "Let \\(X_i\\) be i.i.d. with mean \\(\\mu\\) and variance \\(9\\). What upper bound does Chebyshev give for \\(\\mathbb P(|\\bar X_{100}-\\mu|\\ge1)\\)?",
      "correctAnswer": "0.09",
      "acceptedAnswers": [
        "0.09"
      ],
      "answerDisplay": "\\(0.09\\)",
      "explanation": "The sample-mean variance is \\(9/100\\). Chebyshev gives \\(\\mathbb P(|\\bar X_{100}-\\mu|\\ge1)\\le9/(100\\cdot1^2)=0.09\\). This is a bound, not necessarily the exact probability.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "the-weak-law-of-large-numbers",
          "sourceKey": "stmt-weak-law"
        }
      ]
    },
    {
      "id": "lec05-007",
      "type": "numeric-input",
      "topic": "Finite-sample bounds",
      "difficulty": "challenge",
      "prompt": "I.i.d. measurements have mean \\(\\mu\\) and variance \\(4\\). Using Chebyshev, find the smallest integer \\(n\\) guaranteeing \\(\\mathbb P(|\\bar X_n-\\mu|\\ge0.5)\\le0.05\\).",
      "correctAnswer": "320",
      "acceptedAnswers": [
        "320"
      ],
      "answerDisplay": "\\(320\\)",
      "integerAnswer": true,
      "explanation": "The bound is \\(4/(n\\cdot0.5^2)=16/n\\). Requiring \\(16/n\\le0.05\\) gives \\(n\\ge320\\). This is the smallest sample size certified by this bound, not necessarily by the unknown exact distribution.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "the-weak-law-of-large-numbers",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "a-finite-sample-guarantee",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-008",
      "type": "multiple-choice",
      "topic": "Finite-sample bounds",
      "difficulty": "core",
      "prompt": "For i.i.d. Bernoulli\\((p)\\) observations, put \\(\\hat p_n=n^{-1}\\sum_{i=1}^nX_i\\). Which Chebyshev bound is valid for every unknown \\(p\\in[0,1]\\) and every \\(\\varepsilon>0\\)?",
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
          "text": "No bound is possible unless \\(p\\) is known."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Use \\(\\mathbb V(X_i)=p(1-p)\\le1/4\\). Chebyshev then gives the uniform bound. If the expression exceeds \\(1\\), it is still an upper bound, but the trivial probability bound \\(1\\) is sharper.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "a-finite-sample-guarantee",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-009",
      "type": "multiple-choice",
      "topic": "Finite-sample bounds",
      "difficulty": "intro",
      "prompt": "For \\(500\\) i.i.d. Bernoulli\\((p)\\) observations, the slides give \\(\\mathbb P(|\\hat p_{500}-p|<0.1)\\ge0.95\\). Which interpretation is justified?",
      "options": [
        {
          "id": "a",
          "text": "The probability equals \\(0.95\\) for every \\(p\\)."
        },
        {
          "id": "b",
          "text": "For every fixed \\(p\\), the success probability is at least \\(0.95\\)."
        },
        {
          "id": "c",
          "text": "Every sample has error below \\(0.1\\)."
        },
        {
          "id": "d",
          "text": "The guarantee requires normal observations."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "The inequality is a finite-sample lower bound that holds uniformly over \\(p\\). It is neither an equality nor a guarantee for every individual sample. No normal approximation was used.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "a-finite-sample-guarantee",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-010",
      "type": "multiple-choice",
      "topic": "Laws of large numbers",
      "difficulty": "intro",
      "prompt": "Which formula expresses the weak-law conclusion that the sample mean converges in probability to \\(\\mu\\)?",
      "options": [
        {
          "id": "a",
          "text": "For every \\(\\varepsilon>0\\), \\(\\mathbb P(|\\bar X_n-\\mu|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "b",
          "text": "For one sufficiently large \\(\\varepsilon\\), \\(\\mathbb P(|\\bar X_n-\\mu|>\\varepsilon)\\to0\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(\\bar X_n=\\mu)\\to1\\)."
        },
        {
          "id": "d",
          "text": "\\(\\bar X_n=\\mu\\) for every \\(n\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Convergence in probability tests every fixed positive tolerance. Exact equality to \\(\\mu\\) is not required, and the tolerance is fixed before \\(n\\) tends to infinity.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "the-weak-law-of-large-numbers",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 15,
          "anchor": "laws-of-large-numbers-and-the-clt",
          "sourceKey": "Laws of large numbers and the CLT"
        }
      ]
    },
    {
      "id": "lec05-011",
      "type": "multiple-choice",
      "topic": "Laws of large numbers",
      "difficulty": "core",
      "prompt": "What does the strong law say for i.i.d. integrable observations with mean \\(\\mu\\)?",
      "options": [
        {
          "id": "a",
          "text": "For almost every outcome \\(\\omega\\), the whole sequence \\(\\bar X_n(\\omega)\\) tends to \\(\\mu\\)."
        },
        {
          "id": "b",
          "text": "Every sample mean equals \\(\\mu\\) once \\(n\\ge100\\)."
        },
        {
          "id": "c",
          "text": "The error decreases strictly at every step, almost surely."
        },
        {
          "id": "d",
          "text": "Only the expectations converge, not the sample averages themselves."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "The strong law is a statement about entire sample paths outside a set of probability zero. It gives neither a universal finite cutoff nor monotone improvement along a path.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "the-strong-law-of-large-numbers",
          "sourceKey": "stmt-strong-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 8,
          "anchor": "sample-averages-along-individual-outcomes",
          "sourceKey": "Sample averages along individual outcomes"
        }
      ]
    },
    {
      "id": "lec05-012",
      "type": "proof-step",
      "topic": "Finite-sample bounds",
      "difficulty": "challenge",
      "prompt": "Which estimate completes the weak-law proof?",
      "context": [
        {
          "label": "Theorem",
          "text": "If \\(X_1,X_2,\\ldots\\) are i.i.d. with mean \\(\\mu\\) and finite variance \\(\\sigma^2\\), then \\(\\bar X_n=n^{-1}\\sum_{i=1}^nX_i\\) converges in probability to \\(\\mu\\)."
        },
        {
          "label": "Proof so far",
          "text": "Linearity and independence give \\(\\mathbb E(\\bar X_n)=\\mu\\) and \\(\\mathbb V(\\bar X_n)=\\sigma^2/n\\). Fix \\(\\varepsilon>0\\) and apply Chebyshev's inequality."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\le\\sigma^2/(n\\varepsilon^2)\\to0\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)=\\sigma^2/(n\\varepsilon^2)\\) for every \\(n\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\le n\\sigma^2/\\varepsilon^2\\to0\\)."
        },
        {
          "id": "d",
          "text": "\\(\\mathbb P(\\bar X_n=\\mu)=1\\) because \\(\\mathbb E(\\bar X_n)=\\mu\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Chebyshev bounds the probability by the variance divided by the squared tolerance. Here the variance is \\(\\sigma^2/n\\). The estimate works for every fixed \\(\\varepsilon>0\\), which proves convergence in probability.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "mean-and-variance-of-the-sample-mean",
          "sourceKey": "stmt-sample-mean-moments"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "the-weak-law-of-large-numbers",
          "sourceKey": "stmt-weak-law"
        }
      ]
    },
    {
      "id": "lec05-013",
      "type": "multiple-choice",
      "topic": "Laws of large numbers",
      "difficulty": "intro",
      "prompt": "For an i.i.d. sequence, which moment assumption is sufficient for the strong law stated in this lecture?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb E(|X_1|)<\\infty\\)."
        },
        {
          "id": "b",
          "text": "No moment assumption is needed."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb E(X_1^2)=\\infty\\) alone."
        },
        {
          "id": "d",
          "text": "The observations must all equal their common mean."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Absolute integrability suffices. Finite variance is not required by this strong-law statement. The common mean \\(\\mathbb E(X_1)\\) is then a finite real number.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "the-strong-law-of-large-numbers",
          "sourceKey": "stmt-strong-law"
        }
      ]
    },
    {
      "id": "lec05-014",
      "type": "multiple-select",
      "topic": "Laws of large numbers",
      "difficulty": "core",
      "prompt": "Let \\(X_i\\) be i.i.d. with mean \\(\\mu\\) and finite variance \\(\\sigma^2\\). Which conclusions about \\(\\bar X_n\\) are guaranteed? Select all that apply.",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n\\to\\mu\\) almost surely."
        },
        {
          "id": "b",
          "text": "\\(\\bar X_n\\to\\mu\\) in probability."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb E(|\\bar X_n-\\mu|^2)\\to0\\)."
        },
        {
          "id": "d",
          "text": "For some deterministic \\(N\\), \\(\\bar X_n=\\mu\\) almost surely for every \\(n\\ge N\\)."
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
      "explanation": "Finite variance implies integrability, so the strong and weak laws apply. Also \\(\\mathbb E(|\\bar X_n-\\mu|^2)=\\sigma^2/n\\to0\\). None of these claims requires eventual exact equality.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 4,
          "anchor": "mean-and-variance-of-the-sample-mean",
          "sourceKey": "stmt-sample-mean-moments"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "the-weak-law-of-large-numbers",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "the-strong-law-of-large-numbers",
          "sourceKey": "stmt-strong-law"
        }
      ]
    },
    {
      "id": "lec05-015",
      "type": "numeric-input",
      "topic": "Laws of large numbers",
      "difficulty": "core",
      "prompt": "Let \\(Y\\sim\\operatorname{Bernoulli}(1/2)\\) and set \\(X_i=Y\\) for every \\(i\\). For any sample size \\(n\\), compute \\(\\mathbb P(|\\bar X_n-1/2|>1/4)\\).",
      "correctAnswer": "1",
      "acceptedAnswers": [
        "1"
      ],
      "answerDisplay": "\\(1\\)",
      "explanation": "Here \\(\\bar X_n=Y\\), which is either \\(0\\) or \\(1\\). Its distance from \\(1/2\\) is always \\(1/2\\). The variables have identical distributions but are not independent, so averaging does not remove this randomness.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 12,
          "anchor": "why-independence-matters",
          "sourceKey": "stmt-dependent-average"
        }
      ]
    },
    {
      "id": "lec05-016",
      "type": "find-the-intruder",
      "topic": "Laws of large numbers",
      "difficulty": "core",
      "prompt": "Suppose the strong law gives \\(\\bar X_n\\to\\mu\\) almost surely. Which assertion is NOT guaranteed?",
      "options": [
        {
          "id": "a",
          "text": "Almost every path has limit \\(\\mu\\)."
        },
        {
          "id": "b",
          "text": "For each fixed \\(\\varepsilon>0\\), almost every path eventually stays within \\(\\varepsilon\\) of \\(\\mu\\)."
        },
        {
          "id": "c",
          "text": "The error \\(|\\bar X_n-\\mu|\\) must decrease at every sufficiently late step, almost surely."
        },
        {
          "id": "d",
          "text": "\\(\\bar X_n\\to\\mu\\) in probability."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Convergence is not monotonicity. Sample averages may move closer to and farther from \\(\\mu\\) while still tending to it. A finite plot can illustrate convergence but cannot prove an infinite-path assertion.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "the-strong-law-of-large-numbers",
          "sourceKey": "stmt-strong-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 8,
          "anchor": "sample-averages-along-individual-outcomes",
          "sourceKey": "Sample averages along individual outcomes"
        }
      ]
    },
    {
      "id": "lec05-017",
      "type": "numeric-input",
      "topic": "Averages of functions",
      "difficulty": "intro",
      "prompt": "Let \\(U_i\\) be i.i.d. uniform on \\((0,1)\\). What is the almost sure limit of the fraction of observations satisfying \\(U_i\\le0.3\\)?",
      "correctAnswer": "0.3",
      "acceptedAnswers": [
        "0.3"
      ],
      "answerDisplay": "\\(0.3\\)",
      "explanation": "The fraction is \\(n^{-1}\\sum_{i=1}^n\\mathbf1_{(0,\\,0.3]}(U_i)\\). Its summands are i.i.d. Bernoulli variables with mean \\(0.3\\). Their sample mean converges almost surely to \\(0.3\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 9,
          "anchor": "relative-frequencies",
          "sourceKey": "stmt-relative-frequencies"
        }
      ]
    },
    {
      "id": "lec05-018",
      "type": "proof-step",
      "topic": "Averages of functions",
      "difficulty": "core",
      "prompt": "Which step justifies applying the strong law to the indicators?",
      "context": [
        {
          "label": "Theorem",
          "text": "If \\(X_i\\) are i.i.d. and \\(B\\subseteq\\mathbb R\\) is Borel, then \\(n^{-1}\\sum_{i=1}^n\\mathbf1_B(X_i)\\to\\mathbb P(X_1\\in B)\\) almost surely."
        },
        {
          "label": "Proof so far",
          "text": "Put \\(Y_i=\\mathbf1_B(X_i)\\). The desired relative frequency is \\(n^{-1}\\sum_{i=1}^nY_i\\). To use the strong law, check independence, a common distribution and integrability."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "They are i.i.d., bounded by \\(1\\), and have common expectation \\(\\mathbb P(X_1\\in B)\\)."
        },
        {
          "id": "b",
          "text": "They are normally distributed."
        },
        {
          "id": "c",
          "text": "They are equal for every observation."
        },
        {
          "id": "d",
          "text": "They have zero variance for every Borel set \\(B\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Applying the same measurable indicator to independent, identically distributed observations preserves both properties. Boundedness supplies integrability. The strong law identifies the limit with the indicator's expectation.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 9,
          "anchor": "relative-frequencies",
          "sourceKey": "stmt-relative-frequencies"
        }
      ]
    },
    {
      "id": "lec05-019",
      "type": "find-the-intruder",
      "topic": "Averages of functions",
      "difficulty": "challenge",
      "prompt": "Let \\(U_i\\) be i.i.d. uniform on \\((0,1)\\). Each listed function is set equal to \\(0\\) outside \\((0,1)\\). Which fails the assumption \\(\\mathbb E(|g(U_1)|)<\\infty\\) needed for the lecture's finite-mean averaging theorem?",
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
      "explanation": "The integral \\(\\int_0^1u^{-1}\\,du\\) diverges. The other absolute integrals are \\(1/3,2,1/2\\). Failure of this assumption means the stated finite-mean theorem cannot be applied, not that every possible limit result has been disproved.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 10,
          "anchor": "averages-of-functions",
          "sourceKey": "stmt-transformed-averages"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 11,
          "anchor": "simulation-and-integration",
          "sourceKey": "stmt-monte-carlo"
        }
      ]
    },
    {
      "id": "lec05-020",
      "type": "multiple-choice",
      "topic": "Averages of functions",
      "difficulty": "challenge",
      "prompt": "For i.i.d. \\(U_i\\sim\\operatorname{Uniform}(0,1)\\), write \\(\\bar U_n=n^{-1}\\sum_{i=1}^nU_i\\). What are the almost sure limits of \\(\\bigl(n^{-1}\\sum_{i=1}^nU_i^2,\\;(\\bar U_n)^2\\bigr)\\), in that order?",
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
      "explanation": "Apply the strong law to \\(U_i^2\\) to get \\(\\mathbb E(U_1^2)=1/3\\). Separately \\(\\bar U_n\\to1/2\\) almost surely, and squaring this pathwise limit gives \\(1/4\\). Averaging squares and squaring an average are different operations.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 10,
          "anchor": "averages-of-functions",
          "sourceKey": "stmt-transformed-averages"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 11,
          "anchor": "simulation-and-integration",
          "sourceKey": "stmt-monte-carlo"
        }
      ]
    },
    {
      "id": "lec05-021",
      "type": "multiple-choice",
      "topic": "Central limit theorem",
      "difficulty": "intro",
      "prompt": "Let \\(X_i\\) be i.i.d. with mean \\(\\mu\\) and variance \\(0<\\sigma^2<\\infty\\). Which standardized sample mean converges in distribution to \\(N(0,1)\\) by the CLT?",
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
          "text": "\\(\\sqrt n(\\bar X_n-\\mu)/\\sigma^2\\), regardless of \\(\\sigma\\)."
        },
        {
          "id": "d",
          "text": "\\(\\sqrt n\\,\\bar X_n/\\sigma\\), regardless of \\(\\mu\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Subtract the mean and divide by the sample mean's standard deviation \\(\\sigma/\\sqrt n\\). This gives the first expression. The observations themselves need not be normally distributed.",
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
      "topic": "Central limit theorem",
      "difficulty": "core",
      "prompt": "Let \\(X_i\\) be i.i.d. exponential variables with rate \\(1\\). Thus each has mean \\(1\\) and variance \\(1\\). Which conclusion is supplied by the CLT?",
      "options": [
        {
          "id": "a",
          "text": "Each \\(X_i\\) has a normal distribution for large \\(i\\)."
        },
        {
          "id": "b",
          "text": "\\(\\sqrt n(\\bar X_n-1)\\) converges in distribution to \\(N(0,1)\\)."
        },
        {
          "id": "c",
          "text": "\\(\\bar X_n\\) converges in distribution to \\(N(0,1)\\)."
        },
        {
          "id": "d",
          "text": "\\(\\sqrt n(\\bar X_n-1)\\) is exactly \\(N(0,1)\\) for every \\(n\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "The CLT concerns the centered, rescaled average. Every individual observation remains exponential, and the finite-sample distribution need not equal its normal limit.",
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
          "anchor": "normal-approximation-exponential-samples",
          "sourceKey": "Normal approximation: exponential samples"
        }
      ]
    },
    {
      "id": "lec05-023",
      "type": "numeric-input",
      "topic": "Central limit theorem",
      "difficulty": "core",
      "prompt": "For i.i.d. observations with mean \\(\\mu\\) and variance \\(0<\\sigma^2<\\infty\\), set \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\). The standard normal probability \\(\\Phi(1)-\\Phi(-1)\\) is approximately \\(0.6827\\). Give \\(\\lim_{n\\to\\infty}\\mathbb P(-1<T_n\\le1)\\) to four decimal places.",
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
        "title": "The limiting normal area",
        "description": "The shaded interval is from −1 to 1 under a standard normal density.",
        "caption": "The shaded interval is from −1 to 1 under a standard normal density.",
        "xLabel": "Value"
      },
      "explanation": "The CLT and continuity of the normal probability distribution function give the limit \\(\\Phi(1)-\\Phi(-1)\\). The displayed decimal approximates this limiting probability; it is not an exact finite-sample claim.",
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
          "anchor": "normal-approximations-to-probabilities",
          "sourceKey": "stmt-clt-intervals"
        }
      ]
    },
    {
      "id": "lec05-024",
      "type": "numeric-input",
      "topic": "Normal approximations",
      "difficulty": "core",
      "prompt": "A total waiting time is \\(S_{64}=\\sum_{i=1}^{64}X_i\\), where the waiting times are independent and exponential with rate \\(1/3\\) per minute. Each has mean \\(3\\) minutes and variance \\(9\\) square minutes. What is the standard deviation of \\(S_{64}\\), in minutes?",
      "correctAnswer": "24",
      "acceptedAnswers": [
        "24"
      ],
      "answerDisplay": "\\(24\\)",
      "explanation": "Variances add under independence: \\(\\mathbb V(S_{64})=64\\cdot9=576\\). Its square root is \\(24\\). This is the spread of the sum, whereas the sample mean has standard deviation \\(3/8\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 18,
          "anchor": "a-total-waiting-time",
          "sourceKey": "stmt-waiting-time-example"
        }
      ]
    },
    {
      "id": "lec05-025",
      "type": "multiple-choice",
      "topic": "Central limit theorem",
      "difficulty": "intro",
      "prompt": "Which description belongs to the CLT rather than to the laws of large numbers?",
      "options": [
        {
          "id": "a",
          "text": "It identifies a normal limiting distribution for the rescaled sampling error."
        },
        {
          "id": "b",
          "text": "It says that the sample mean approaches the population mean almost surely."
        },
        {
          "id": "c",
          "text": "It says that every sufficiently large sample gives the exact population mean."
        },
        {
          "id": "d",
          "text": "It makes the observations themselves normally distributed."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "The laws of large numbers concern \\(\\bar X_n-\\mu\\to0\\). The CLT studies the nontrivial limiting distribution after multiplying this error by \\(\\sqrt n/\\sigma\\), under its finite positive variance assumptions.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 15,
          "anchor": "laws-of-large-numbers-and-the-clt",
          "sourceKey": "Laws of large numbers and the CLT"
        }
      ]
    },
    {
      "id": "lec05-026",
      "type": "proof-step",
      "topic": "CLT proof",
      "difficulty": "core",
      "prompt": "What value of \\(\\varphi''(0)\\) supplies the quadratic term in the proof?",
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(X_1,X_2,\\ldots\\) be i.i.d. with mean \\(\\mu\\) and variance \\(0<\\sigma^2<\\infty\\). Write \\(\\bar X_n=n^{-1}\\sum_{j=1}^nX_j\\). Then \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\) converges in distribution to \\(N(0,1)\\)."
        },
        {
          "label": "Proof so far",
          "text": "Put \\(Z_j=(X_j-\\mu)/\\sigma\\) and \\(\\varphi(t)=\\mathbb E(e^{itZ_1})\\), where \\(i^2=-1\\). Then \\(\\mathbb E(Z_1)=0\\), \\(\\mathbb E(Z_1^2)=1\\), \\(\\varphi(0)=1\\), and \\(\\varphi'(0)=0\\). The moment identity gives \\(\\varphi''(0)=-\\mathbb E(Z_1^2)\\)."
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
          "text": "\\(-\\sigma^2\\) regardless of standardization."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Since \\(\\varphi''(0)=-\\mathbb E(Z_1^2)\\), centering and standardizing give \\(-1\\). Taylor's quadratic coefficient is therefore \\(-1/2\\), not \\(-1\\).",
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
      "topic": "CLT proof",
      "difficulty": "core",
      "prompt": "Which expression is the characteristic function of \\(T_n\\)?",
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(X_1,X_2,\\ldots\\) be i.i.d. with mean \\(\\mu\\) and variance \\(0<\\sigma^2<\\infty\\). Write \\(\\bar X_n=n^{-1}\\sum_{j=1}^nX_j\\). Then \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\) converges in distribution to \\(N(0,1)\\)."
        },
        {
          "label": "Proof so far",
          "text": "Put \\(Z_j=(X_j-\\mu)/\\sigma\\) and let \\(\\varphi\\) be their common characteristic function. Then \\(T_n=n^{-1/2}\\sum_{j=1}^nZ_j\\), and the \\(Z_j\\) are independent. We now express the characteristic function of this sum before taking a limit."
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
      "explanation": "Scaling each summand replaces \\(t\\) by \\(t/\\sqrt n\\). Independence turns the characteristic function of a sum into a product. Identical distributions make the \\(n\\) factors equal.",
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
      "topic": "CLT proof",
      "difficulty": "challenge",
      "prompt": "For fixed real \\(t\\), what is the limit of the displayed characteristic function?",
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(X_1,X_2,\\ldots\\) be i.i.d. with mean \\(\\mu\\) and variance \\(0<\\sigma^2<\\infty\\). Write \\(\\bar X_n=n^{-1}\\sum_{j=1}^nX_j\\). Then \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\) converges in distribution to \\(N(0,1)\\)."
        },
        {
          "label": "Proof so far",
          "text": "For \\(Z_j=(X_j-\\mu)/\\sigma\\), Taylor's formula for their characteristic function is \\(\\varphi(u)=1-u^2/2+u^2r(u)\\), with \\(r(u)\\to0\\) as \\(u\\to0\\). Independence gives\n\\[\\begin{aligned}&\\varphi_{T_n}(t)\\\\&\\quad=\\left(1+\\frac{-t^2/2+t^2r(t/\\sqrt n)}{n}\\right)^n.\\end{aligned}\\]\nUse \\((1+a_n/n)^n\\to e^a\\) whenever \\(a_n\\to a\\), also for complex \\(a_n\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(e^{-t^2/2}\\)."
        },
        {
          "id": "b",
          "text": "\\(1\\) for every \\(t\\)."
        },
        {
          "id": "c",
          "text": "\\(e^{-t^2}\\)."
        },
        {
          "id": "d",
          "text": "\\(0\\) for every \\(t\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "For fixed \\(t\\), the numerator tends to \\(-t^2/2\\). The elementary power limit gives \\(e^{-t^2/2}\\), the characteristic function of \\(N(0,1)\\). It is continuous at zero, so Lévy's theorem finishes the proof.",
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
      "topic": "Central limit theorem",
      "difficulty": "challenge",
      "prompt": "Suppose \\(X_i=7\\) almost surely for every \\(i\\). What is correct about the sample means and the usual CLT standardization?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n=7\\) almost surely, but division by \\(\\sigma=0\\) is undefined, so the stated CLT formula is inapplicable."
        },
        {
          "id": "b",
          "text": "The standardized mean equals \\(0/0=0\\)."
        },
        {
          "id": "c",
          "text": "The strong law fails because the variance is zero."
        },
        {
          "id": "d",
          "text": "A sample of constant observations acquires a normal distribution as its size grows."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "The sample mean is already exactly \\(7\\). Constant variables satisfy the laws of large numbers. The displayed CLT requires strictly positive variance because its normalization divides by \\(\\sigma\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "the-strong-law-of-large-numbers",
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
      "topic": "Normal approximations",
      "difficulty": "core",
      "prompt": "Apple weights are i.i.d. with mean \\(170\\) g and standard deviation \\(24\\) g. For \\(36\\) apples, use a normal approximation to estimate \\(\\mathbb P(166<\\bar X_{36}\\le174)\\). Use \\(\\Phi(1)-\\Phi(-1)\\approx0.6827\\) and answer to four decimal places.",
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
        "title": "Normal approximation for the mean",
        "description": "The curve approximates the distribution of the sample mean, not of an individual apple weight.",
        "caption": "The curve approximates the distribution of the sample mean, not of an individual apple weight.",
        "xLabel": "Value"
      },
      "explanation": "The standard deviation of the mean is \\(24/\\sqrt{36}=4\\) g. The endpoints standardize to \\(-1\\) and \\(1\\), giving the stated normal area. Without a normal population model this is an approximation, not an exact probability.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 17,
          "anchor": "normal-approximations-to-probabilities",
          "sourceKey": "stmt-clt-intervals"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 21,
          "anchor": "practice-sample-means",
          "sourceKey": "stmt-worksheet2-ex5"
        }
      ]
    },
    {
      "id": "lec05-031",
      "type": "multiple-choice",
      "topic": "Finite-sample bounds",
      "difficulty": "core",
      "prompt": "For i.i.d. observations with fixed variance \\(\\sigma^2>0\\), Chebyshev bounds \\(\\mathbb P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\) by \\(\\sigma^2/(n\\varepsilon^2)\\). If the tolerance is halved, how must \\(n\\) change to keep this bound unchanged?",
      "options": [
        {
          "id": "a",
          "text": "Double it."
        },
        {
          "id": "b",
          "text": "Keep it unchanged."
        },
        {
          "id": "c",
          "text": "Multiply it by four."
        },
        {
          "id": "d",
          "text": "Divide it by four."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "With tolerance \\(\\varepsilon/2\\), the bound becomes \\(4\\sigma^2/(n'\\varepsilon^2)\\). Equality with the original bound requires \\(n'=4n\\). A twice-as-precise tolerance needs four times as many observations for this guarantee.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "the-weak-law-of-large-numbers",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 6,
          "anchor": "a-finite-sample-guarantee",
          "sourceKey": "stmt-bernoulli-guarantee"
        }
      ]
    },
    {
      "id": "lec05-032",
      "type": "multiple-choice",
      "topic": "Normal approximations",
      "difficulty": "core",
      "prompt": "I.i.d. measurements have mean \\(100\\) and unknown standard deviation \\(\\sigma>0\\). For \\(n=25\\), a normal approximation gives \\(\\mathbb P(\\bar X_{25}\\le104)\\approx0.975\\). Using \\(\\Phi(1.96)\\approx0.975\\), what value of \\(\\sigma\\) does this approximation suggest?",
      "options": [
        {
          "id": "a",
          "text": "About \\(2.04\\)."
        },
        {
          "id": "b",
          "text": "About \\(10.20\\)."
        },
        {
          "id": "c",
          "text": "About \\(0.80\\)."
        },
        {
          "id": "d",
          "text": "About \\(39.20\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Standardizing gives \\((104-100)/(\\sigma/5)\\approx1.96\\). Thus \\(\\sigma\\approx20/1.96\\approx10.20\\). The value \\(2.04\\) would be the standard deviation of the sample mean, not of an individual measurement.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 17,
          "anchor": "normal-approximations-to-probabilities",
          "sourceKey": "stmt-clt-intervals"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 21,
          "anchor": "practice-sample-means",
          "sourceKey": "stmt-worksheet2-ex5"
        }
      ]
    },
    {
      "id": "lec05-033",
      "type": "multiple-choice",
      "topic": "Normal approximations",
      "difficulty": "challenge",
      "prompt": "Let \\(S\\sim\\operatorname{Bin}(100,1/2)\\). Which normal area uses the continuity correction for \\(\\mathbb P(40\\le S\\le60)\\)? Here \\(Z\\sim N(0,1)\\).",
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
      "explanation": "The binomial mean is \\(50\\) and its standard deviation is \\(5\\). Replace the integer interval by \\([39.5,60.5]\\), then standardize to \\([-2.1,2.1]\\). Including the two endpoint bars requires expanding, not shrinking, the interval.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 19,
          "anchor": "binomial-approximation-and-continuity-correction",
          "sourceKey": "stmt-continuity-correction-definition"
        }
      ]
    },
    {
      "id": "lec05-034",
      "type": "multiple-choice",
      "topic": "Normal approximations",
      "difficulty": "core",
      "prompt": "You approximate the probability \\(\\mathbb P(S\\ge6)\\) for a binomial count \\(S\\) by the upper tail of a continuous normal variable with the same mean and variance. Before standardizing, which lower boundary applies the continuity correction?",
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
      "explanation": "The integer \\(6\\) is included. Its unit-width bar starts at \\(5.5\\), so the approximating continuous tail starts there. A boundary of \\(6.5\\) would instead approximate \\(\\mathbb P(S\\ge7)\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 19,
          "anchor": "binomial-approximation-and-continuity-correction",
          "sourceKey": "stmt-continuity-correction-definition"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 20,
          "anchor": "practice-binomial-probabilities",
          "sourceKey": "stmt-worksheet2-ex1"
        }
      ]
    },
    {
      "id": "lec05-035",
      "type": "multiple-choice",
      "topic": "Exact versus approximate",
      "difficulty": "challenge",
      "prompt": "Consider two models for two i.i.d. observations: (A) each observation is \\(N(0,1)\\); (B) each equals \\(-1\\) or \\(1\\), each with probability \\(1/2\\). Both populations have mean \\(0\\) and variance \\(1\\). What are the exact values of \\(\\mathbb P(\\bar X_2=0)\\) in models A and B, respectively?",
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
      "explanation": "In A, \\(\\bar X_2\\sim N(0,1/2)\\), so a single point has probability \\(0\\). In B, the mean is zero exactly when the signs differ, with probability \\(2(1/2)^2=1/2\\). A mean and variance do not determine exact finite-sample probabilities.",
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
          "anchor": "practice-sample-means",
          "sourceKey": "stmt-worksheet2-ex5"
        }
      ]
    },
    {
      "id": "lec05-036",
      "type": "numeric-input",
      "topic": "Exact versus approximate",
      "difficulty": "core",
      "prompt": "Four independent fair coin tosses give a head count \\(S\\sim\\operatorname{Bin}(4,1/2)\\). Compute the exact probability \\(\\mathbb P(S\\ge3)\\), without a normal approximation.",
      "correctAnswer": "5/16",
      "acceptedAnswers": [
        "5/16"
      ],
      "answerDisplay": "\\(\\frac{5}{16}\\)",
      "explanation": "Add the two binomial masses: \\(\\mathbb P(S\\ge3)=[\\binom43+\\binom44]/2^4=(4+1)/16=5/16\\). With this small sample, the exact calculation is short.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 20,
          "anchor": "practice-binomial-probabilities",
          "sourceKey": "stmt-worksheet2-ex1"
        }
      ]
    },
    {
      "id": "lec05-037",
      "type": "multiple-choice",
      "topic": "Exact versus approximate",
      "difficulty": "challenge",
      "prompt": "Let \\(X_i\\) be i.i.d. with mean \\(\\mu\\) and variance \\(0<\\sigma^2<\\infty\\). Put \\(T_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\). What does the CLT alone justify about \\(\\mathbb P(|T_n|\\le1.96)\\)?",
      "options": [
        {
          "id": "a",
          "text": "It equals \\(0.95\\) for every \\(n\\ge30\\)."
        },
        {
          "id": "b",
          "text": "It is at least \\(0.95\\) for every \\(n\\)."
        },
        {
          "id": "c",
          "text": "Its error from \\(0.95\\) is at most \\(1/n\\)."
        },
        {
          "id": "d",
          "text": "It tends to \\(\\Phi(1.96)-\\Phi(-1.96)\\), which is approximately \\(0.95\\)."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "The limiting normal distribution has no mass at either endpoint, so convergence in distribution gives this interval-probability limit. The stated CLT gives no universal cutoff, exact finite-sample coverage, or numerical error rate.",
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
          "anchor": "normal-approximations-to-probabilities",
          "sourceKey": "stmt-clt-intervals"
        }
      ]
    },
    {
      "id": "lec05-038",
      "type": "multiple-choice",
      "topic": "Laws of large numbers",
      "difficulty": "core",
      "prompt": "Suppose \\(X_i\\) are i.i.d., nonnegative, with \\(\\mathbb E(X_i)=3\\) and \\(\\mathbb E(X_i^2)=\\infty\\). Which conclusion is guaranteed by the laws of large numbers stated in the slides?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n\\to3\\) almost surely, and therefore in probability."
        },
        {
          "id": "b",
          "text": "The sample mean cannot converge because the variance is infinite."
        },
        {
          "id": "c",
          "text": "The finite-variance Chebyshev proof gives the bound \\(3/n\\)."
        },
        {
          "id": "d",
          "text": "\\(\\sqrt n(\\bar X_n-3)\\) must converge to \\(N(0,1)\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Nonnegativity gives \\(\\mathbb E|X_i|=3<\\infty\\), which suffices for the stated strong law. The finite-variance Chebyshev argument and the displayed CLT are not applicable, but this does not prevent the strong-law conclusion.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 5,
          "anchor": "the-weak-law-of-large-numbers",
          "sourceKey": "stmt-weak-law"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "the-strong-law-of-large-numbers",
          "sourceKey": "stmt-strong-law"
        }
      ]
    },
    {
      "id": "lec05-039",
      "type": "proof-step",
      "topic": "Averages of functions",
      "difficulty": "core",
      "prompt": "Which next step lets us apply the strong law?",
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(X_i\\) be i.i.d. real random variables and \\(g:\\mathbb R\\to\\mathbb R\\) Borel measurable with \\(\\mathbb E|g(X_1)|<\\infty\\). Then \\(n^{-1}\\sum_{i=1}^n g(X_i)\\to\\mathbb E(g(X_1))\\) almost surely."
        },
        {
          "label": "Proof so far",
          "text": "Set \\(Y_i=g(X_i)\\). Measurability of \\(g\\) ensures that each \\(Y_i\\) is a random variable. We want to apply the strong law to the sequence \\((Y_i)\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "The variables \\(Y_i\\) are i.i.d. and satisfy \\(\\mathbb E|Y_i|<\\infty\\)."
        },
        {
          "id": "b",
          "text": "The identity \\(g(\\bar X_n)=n^{-1}\\sum_i g(X_i)\\) holds for every \\(g\\)."
        },
        {
          "id": "c",
          "text": "Every measurable function \\(g\\) is bounded."
        },
        {
          "id": "d",
          "text": "The variables \\(Y_i\\) have finite variance because they are measurable."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Applying the same measurable function separately to independent, identically distributed variables preserves independence and the common distribution. The assumed integrability is exactly what the strong law needs; no finite second moment is required.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 10,
          "anchor": "averages-of-functions",
          "sourceKey": "stmt-transformed-averages"
        }
      ]
    },
    {
      "id": "lec05-040",
      "type": "multiple-select",
      "topic": "Central limit theorem",
      "difficulty": "challenge",
      "prompt": "Let \\(X_i\\) be independent, each taking \\(-1\\) and \\(1\\) with probability \\(1/2\\). Put \\(\\bar X_n=n^{-1}\\sum_{i=1}^n X_i\\) and \\(T_n=\\sqrt n\\,\\bar X_n\\). Select all true statements.",
      "options": [
        {
          "id": "a",
          "text": "\\(\\bar X_n\\to0\\) almost surely."
        },
        {
          "id": "b",
          "text": "\\(\\bar X_n\\to0\\) in probability."
        },
        {
          "id": "c",
          "text": "\\(T_n\\) converges in distribution to \\(N(0,1)\\)."
        },
        {
          "id": "d",
          "text": "\\(T_n\\to0\\) in probability."
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
      "explanation": "The mean is \\(0\\) and variance is \\(1\\). The strong law gives the first two conclusions, and the CLT gives the third. If \\(T_n\\) converged in probability to \\(0\\), its distributional limit would be the point mass at \\(0\\), contradicting the normal limit. Shrinking errors can still have nonvanishing fluctuations after rescaling.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 7,
          "anchor": "the-strong-law-of-large-numbers",
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
          "anchor": "laws-of-large-numbers-and-the-clt",
          "sourceKey": "Laws of large numbers and the CLT"
        }
      ]
    }
  ]
};
