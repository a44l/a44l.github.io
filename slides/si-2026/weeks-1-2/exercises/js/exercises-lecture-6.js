window.LECTURE_6_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "en-GB",
  "block": {
    "id": "lecture-6",
    "title": "Lecture 6",
    "description": "Week 3, slides 22–49: statistical tests, power, p-values and paired sign tests",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "sources/week-3/index.html#/hypothesis-testing-and-the-sign-test",
    "featuredTopics": [
      "Models and hypotheses",
      "Decisions and errors",
      "Power and level",
      "Valid p-values",
      "Sign tests",
      "Zero differences"
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
      "title": "Statistical Inference 2026 — Week 3 (reference snapshot)",
      "author": "Alexander Taveira Blomenhofer",
      "url": "sources/week-3/index.html",
      "slideRange": [
        22,
        49
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
      "id": "lec06-001",
      "type": "multiple-choice",
      "topic": "Models and hypotheses",
      "difficulty": "intro",
      "prompt": "A model describes five independent Bernoulli observations \\(X_1,\\ldots,X_5\\) with a common unknown success probability \\(\\theta\\in[0,1]\\). Which quantity is the model parameter?",
      "options": [
        {
          "id": "a",
          "text": "The observed success count \\(\\sum_i x_i\\)."
        },
        {
          "id": "b",
          "text": "The unknown, fixed probability \\(\\theta\\)."
        },
        {
          "id": "c",
          "text": "The random sample \\(X=(X_1,\\ldots,X_5)\\)."
        },
        {
          "id": "d",
          "text": "The first observed value \\(x_1\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "The parameter \\(\\theta\\) indexes the possible data distributions. In this model it is fixed but unknown; the sample is random, and its observed values are data.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 23,
          "anchor": "statistical-models",
          "sourceKey": "stmt-statistical-model"
        }
      ]
    },
    {
      "id": "lec06-002",
      "type": "multiple-choice",
      "topic": "Models and hypotheses",
      "difficulty": "intro",
      "prompt": "For i.i.d. Bernoulli\\((\\theta)\\) data, compare \\(H_0:\\theta=1/2\\) and \\(H'_0:\\theta\\le1/2\\). How are these null hypotheses classified?",
      "options": [
        {
          "id": "a",
          "text": "Both are simple."
        },
        {
          "id": "b",
          "text": "The first is composite; the second is simple."
        },
        {
          "id": "c",
          "text": "The first is simple; the second is composite."
        },
        {
          "id": "d",
          "text": "Both are composite."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "A simple hypothesis specifies one data distribution. Fixing \\(\\theta=1/2\\) does so. Allowing every \\(\\theta\\in[0,1/2]\\) leaves multiple distributions and therefore gives a composite hypothesis.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 24,
          "anchor": "null-and-alternative-hypotheses",
          "sourceKey": "stmt-hypotheses"
        }
      ]
    },
    {
      "id": "lec06-003",
      "type": "find-the-intruder",
      "topic": "Models and hypotheses",
      "difficulty": "core",
      "prompt": "Let \\(X_1,\\ldots,X_n\\) be i.i.d. Bernoulli\\((\\theta)\\), where \\(\\theta\\) is unknown, and \\(\\bar X_n=n^{-1}\\sum_{i=1}^nX_i\\). Which expression is not a statistic computable from the observed data alone?",
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
      "explanation": "A statistic is a specified measurable function of the sample that does not involve the unknown parameter. The last expression requires knowing \\(\\theta\\). By contrast, subtracting a specified null value such as \\(1/2\\) would be allowed.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 26,
          "anchor": "test-statistics",
          "sourceKey": "stmt-test-statistic"
        }
      ]
    },
    {
      "id": "lec06-004",
      "type": "numeric-input",
      "topic": "Decisions and errors",
      "difficulty": "intro",
      "prompt": "A test sets \\(\\delta(x)=1\\) (reject) when \\(\\sum_{i=1}^5x_i\\ge4\\), and \\(\\delta(x)=0\\) otherwise. The observed data are \\((1,1,0,1,1)\\). What is \\(\\delta(x)\\)?",
      "correctAnswer": "1",
      "acceptedAnswers": [
        "1"
      ],
      "answerDisplay": "\\(1\\)",
      "integerAnswer": true,
      "explanation": "There are \\(4\\) successes, so the observation lies in the rejection region and \\(\\delta(x)=1\\). The test decision is not itself a statement that the null hypothesis has probability zero.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 25,
          "anchor": "tests-and-rejection-regions",
          "sourceKey": "stmt-test"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 26,
          "anchor": "test-statistics",
          "sourceKey": "stmt-test-statistic"
        }
      ]
    },
    {
      "id": "lec06-005",
      "type": "multiple-choice",
      "topic": "Decisions and errors",
      "difficulty": "intro",
      "prompt": "A quality-control test rejects the null hypothesis even though the true parameter belongs to the null set. What kind of error occurred?",
      "options": [
        {
          "id": "a",
          "text": "A Type II error."
        },
        {
          "id": "b",
          "text": "No error: every rejection is correct."
        },
        {
          "id": "c",
          "text": "A Type I error."
        },
        {
          "id": "d",
          "text": "A numerical rounding error, necessarily."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "A Type I error is rejection when \\(H_0\\) is true. Its probability depends on the true null parameter and is controlled uniformly by the test's significance level.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 27,
          "anchor": "type-i-and-type-ii-errors",
          "sourceKey": "stmt-testing-errors"
        }
      ]
    },
    {
      "id": "lec06-006",
      "type": "multiple-choice",
      "topic": "Decisions and errors",
      "difficulty": "intro",
      "prompt": "The true parameter belongs to the alternative set, but the test does not reject \\(H_0\\). What kind of error is this?",
      "options": [
        {
          "id": "a",
          "text": "A Type II error."
        },
        {
          "id": "b",
          "text": "A Type I error."
        },
        {
          "id": "c",
          "text": "The significance level itself."
        },
        {
          "id": "d",
          "text": "No error, because non-rejection proves the null."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "A Type II error is non-rejection at an alternative parameter. If the power there is \\(\\beta(\\theta)=\\mathbb P_\\theta(\\text{reject})\\), its probability is \\(1-\\beta(\\theta)\\). Non-rejection is not proof of \\(H_0\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 27,
          "anchor": "type-i-and-type-ii-errors",
          "sourceKey": "stmt-testing-errors"
        }
      ]
    },
    {
      "id": "lec06-007",
      "type": "numeric-input",
      "topic": "Power and level",
      "difficulty": "core",
      "prompt": "For four independent Bernoulli\\((\\theta)\\) trials, a test rejects only when all four are successes. Compute the value of its power function \\(\\beta(\\theta)=\\mathbb P_\\theta(\\text{reject})\\) at \\(\\theta=1/2\\).",
      "correctAnswer": "1/16",
      "acceptedAnswers": [
        "1/16"
      ],
      "answerDisplay": "\\(\\frac{1}{16}\\)",
      "explanation": "Independence gives \\(\\beta(\\theta)=\\theta^4\\), so \\(\\beta(1/2)=1/16\\). The power function is defined at every parameter, including null parameters, where it is the Type I error probability.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "the-power-function",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 30,
          "anchor": "a-binomial-test",
          "sourceKey": "stmt-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-008",
      "type": "numeric-input",
      "topic": "Power and level",
      "difficulty": "core",
      "prompt": "Let \\(T\\sim\\operatorname{Bin}(2,\\theta)\\). For \\(H_0:\\theta\\le1/2\\) against \\(H_1:\\theta>1/2\\), reject only when \\(T=2\\). What is the Type II error probability when the true parameter is \\(\\theta=3/4\\)?",
      "correctAnswer": "7/16",
      "acceptedAnswers": [
        "7/16"
      ],
      "answerDisplay": "\\(\\frac{7}{16}\\)",
      "explanation": "The rejection probability is \\((3/4)^2=9/16\\). At this alternative parameter, the Type II error is non-rejection, with probability \\(1-9/16=7/16\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 27,
          "anchor": "type-i-and-type-ii-errors",
          "sourceKey": "stmt-testing-errors"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "the-power-function",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 30,
          "anchor": "a-binomial-test",
          "sourceKey": "stmt-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-009",
      "type": "numeric-input",
      "topic": "Power and level",
      "difficulty": "intro",
      "prompt": "A null set contains exactly three parameters \\(\\theta_a,\\theta_b,\\theta_c\\). Their rejection probabilities are \\(0.01,0.03,0.02\\), respectively. What is the size of this test?",
      "correctAnswer": "0.03",
      "acceptedAnswers": [
        "0.03"
      ],
      "answerDisplay": "\\(0.03\\)",
      "explanation": "The size is \\(\\sup_{\\theta\\in\\Theta_0}\\beta(\\theta)\\). For this finite null set it is the maximum, \\(0.03\\), not the average of the three probabilities.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "size-and-significance-level",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-010",
      "type": "multiple-choice",
      "topic": "Power and level",
      "difficulty": "intro",
      "prompt": "A test has size \\(0.03\\). Which statement correctly uses the definition of significance level?",
      "options": [
        {
          "id": "a",
          "text": "It is a level-\\(0.05\\) test, but its size is still \\(0.03\\)."
        },
        {
          "id": "b",
          "text": "Calling it level \\(0.05\\) changes its size to \\(0.05\\)."
        },
        {
          "id": "c",
          "text": "It cannot be called level \\(0.05\\), since the size is not equal to \\(0.05\\)."
        },
        {
          "id": "d",
          "text": "It is automatically level \\(0.01\\)."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "Level \\(\\alpha\\) means size at most \\(\\alpha\\), not necessarily equal to it. Since \\(0.03\\le0.05\\), the test has level \\(0.05\\), but not level \\(0.01\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "size-and-significance-level",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-011",
      "type": "numeric-input",
      "topic": "Power and level",
      "difficulty": "core",
      "prompt": "For \\(T\\sim\\operatorname{Bin}(5,\\theta)\\), test \\(H_0:\\theta\\le1/2\\) by rejecting exactly when \\(T=5\\). Compute the test's size.",
      "correctAnswer": "1/32",
      "acceptedAnswers": [
        "1/32"
      ],
      "answerDisplay": "\\(\\frac{1}{32}\\)",
      "explanation": "The power is \\(\\beta(\\theta)=\\theta^5\\), which is increasing on \\([0,1]\\). The largest null rejection probability is at \\(\\theta=1/2\\), giving size \\((1/2)^5=1/32\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "size-and-significance-level",
          "sourceKey": "stmt-size-level"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 30,
          "anchor": "a-binomial-test",
          "sourceKey": "stmt-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-012",
      "type": "multiple-select",
      "topic": "Rejection regions",
      "difficulty": "core",
      "prompt": "Two tests of the same hypotheses have rejection regions \\(R_1\\subseteq R_2\\). What is guaranteed when replacing \\(R_1\\) by \\(R_2\\)? Select all correct statements.",
      "options": [
        {
          "id": "a",
          "text": "The rejection probability cannot decrease at any parameter."
        },
        {
          "id": "b",
          "text": "The Type I error probability cannot decrease at any null parameter."
        },
        {
          "id": "c",
          "text": "The Type II error probability cannot increase at any alternative parameter."
        },
        {
          "id": "d",
          "text": "The size must strictly decrease."
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
      "explanation": "For every \\(\\theta\\), event inclusion gives \\(\\mathbb P_\\theta(X\\in R_1)\\le\\mathbb P_\\theta(X\\in R_2)\\). Thus power and null rejection probabilities cannot decrease; alternative non-rejection probabilities cannot increase. The inequalities need not be strict.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 32,
          "anchor": "power-and-the-rejection-region",
          "sourceKey": "stmt-region-inclusion"
        }
      ]
    },
    {
      "id": "lec06-013",
      "type": "proof-step",
      "topic": "Tail probabilities",
      "difficulty": "core",
      "prompt": "Which pointwise comparison completes the upper-tail monotonicity proof?",
      "context": [
        {
          "label": "Theorem",
          "text": "For a fixed positive integer \\(n\\) and real threshold \\(c\\), the upper-tail probability of \\(\\operatorname{Bin}(n,\\theta)\\) is nondecreasing in \\(\\theta\\in[0,1]\\)."
        },
        {
          "label": "Proof so far",
          "text": "Fix \\(0\\le p\\le q\\le1\\). On one probability space, take independent \\(U_1,\\ldots,U_n\\sim\\operatorname{Uniform}(0,1)\\). Using the same uniforms for both counts, define \\(T_p=\\sum_{i=1}^n\\mathbf1_{\\{U_i\\le p\\}}\\) and \\(T_q=\\sum_{i=1}^n\\mathbf1_{\\{U_i\\le q\\}}\\). Their respective distributions are \\(\\operatorname{Bin}(n,p)\\) and \\(\\operatorname{Bin}(n,q)\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "\\(T_p(\\omega)\\ge T_q(\\omega)\\) for every outcome \\(\\omega\\)."
        },
        {
          "id": "b",
          "text": "\\(T_p(\\omega)\\le T_q(\\omega)\\) for every outcome \\(\\omega\\)."
        },
        {
          "id": "c",
          "text": "\\(T_p=T_q\\) because both counts use the same uniforms."
        },
        {
          "id": "d",
          "text": "The two counts must be independent."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "If \\(U_i\\le p\\), then \\(U_i\\le q\\). Each indicator for \\(p\\) is therefore at most the corresponding indicator for \\(q\\). Summing gives \\(T_p\\le T_q\\), hence \\(\\{T_p\\ge c\\}\\subseteq\\{T_q\\ge c\\}\\). Taking probabilities proves the claim.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 41,
          "anchor": "binomial-tail-probabilities",
          "sourceKey": "stmt-binomial-tail-monotonicity"
        }
      ]
    },
    {
      "id": "lec06-014",
      "type": "multiple-choice",
      "topic": "Power and level",
      "difficulty": "challenge",
      "prompt": "A model has exactly three parameters: \\(\\Theta_0=\\{\\theta_a,\\theta_b\\}\\) and \\(\\Theta_1=\\{\\theta_c\\}\\). A test has \\(\\beta(\\theta_a)=0.02\\), \\(\\beta(\\theta_b)=0.04\\), and \\(\\beta(\\theta_c)=0.90\\). Which pair gives its size and its Type II error probability at \\(\\theta_c\\)?",
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
        "title": "Rejection probabilities across the model",
        "description": "Parameters a and b are null parameters; c is an alternative parameter.",
        "caption": "Parameters a and b are null parameters; c is an alternative parameter.",
        "xLabel": "Parameter",
        "yLabel": "Rejection probability"
      },
      "explanation": "Size takes the supremum only over the null set: \\(\\max(0.02,0.04)=0.04\\). At the alternative parameter \\(\\theta_c\\), the Type II error probability is \\(1-\\beta(\\theta_c)=0.10\\). The high alternative rejection probability is desirable power, not size.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "the-power-function",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "size-and-significance-level",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-015",
      "type": "multiple-choice",
      "topic": "Rejection regions",
      "difficulty": "core",
      "prompt": "For \\(T\\sim\\operatorname{Bin}(5,\\theta)\\), test \\(H_0:\\theta\\le1/2\\) by rejecting when \\(T\\ge3\\). The rejection probability is increasing in \\(\\theta\\). Is this a level-\\(0.05\\) test?",
      "options": [
        {
          "id": "a",
          "text": "Yes: a majority of successes is always significant."
        },
        {
          "id": "b",
          "text": "No: its size is \\(1/2\\)."
        },
        {
          "id": "c",
          "text": "Yes: its size is \\(1/32\\)."
        },
        {
          "id": "d",
          "text": "No: its size is \\(1\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "The worst null parameter is \\(1/2\\). There, symmetry gives \\(\\mathbb P(T\\ge3)=1/2\\), since no integer equals the centre \\(2.5\\). Thus the size is \\(0.5>0.05\\); a majority alone is not strong evidence with five trials.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 31,
          "anchor": "a-larger-rejection-region",
          "sourceKey": "stmt-larger-binomial-test"
        }
      ]
    },
    {
      "id": "lec06-016",
      "type": "multiple-select",
      "topic": "Rejection regions",
      "difficulty": "core",
      "prompt": "A test has empty rejection region \\(R=\\varnothing\\). Assume both the null and alternative sets are nonempty. Select all true statements.",
      "options": [
        {
          "id": "a",
          "text": "Its size is \\(0\\)."
        },
        {
          "id": "b",
          "text": "Its power is \\(0\\) at every parameter."
        },
        {
          "id": "c",
          "text": "Its Type II error probability is \\(1\\) at every alternative parameter."
        },
        {
          "id": "d",
          "text": "Controlling Type I error makes this test useful for detecting every alternative."
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
      "explanation": "An empty region means never rejecting. Hence \\(\\beta(\\theta)=0\\) everywhere, size is \\(0\\), and \\(1-\\beta(\\theta)=1\\) under every alternative. Type I error control alone does not guarantee useful power.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 25,
          "anchor": "tests-and-rejection-regions",
          "sourceKey": "stmt-test"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 28,
          "anchor": "the-power-function",
          "sourceKey": "stmt-power"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 29,
          "anchor": "size-and-significance-level",
          "sourceKey": "stmt-size-level"
        }
      ]
    },
    {
      "id": "lec06-017",
      "type": "multiple-choice",
      "topic": "Valid p-values",
      "difficulty": "intro",
      "prompt": "A statistic \\(p(X)\\) takes values in \\([0,1]\\). Which condition makes it a valid p-value for a null set \\(\\Theta_0\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\mathbb P_\\theta(p(X)\\le\\alpha)\\ge\\alpha\\) for every null \\(\\theta\\) and every \\(\\alpha\\in[0,1]\\)."
        },
        {
          "id": "b",
          "text": "\\(\\mathbb P_\\theta(p(X)\\le\\alpha)\\le\\alpha\\) for every null \\(\\theta\\) and every \\(\\alpha\\in[0,1]\\)."
        },
        {
          "id": "c",
          "text": "\\(\\mathbb E_\\theta(p(X))=0\\) under the null."
        },
        {
          "id": "d",
          "text": "\\(p(X)\\) equals the probability that \\(H_0\\) is true."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Validity means that rejecting when \\(p(X)\\le\\alpha\\) gives a level-\\(\\alpha\\) test for every threshold. Equality is not required; discrete p-values often give strict inequalities.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 33,
          "anchor": "valid-p-values",
          "sourceKey": "stmt-pvalue"
        }
      ]
    },
    {
      "id": "lec06-018",
      "type": "multiple-choice",
      "topic": "Valid p-values",
      "difficulty": "intro",
      "prompt": "An observed valid p-value is \\(0.04\\), and the prespecified significance level is \\(0.05\\). Which interpretation is correct?",
      "options": [
        {
          "id": "a",
          "text": "The probability that \\(H_0\\) is true is \\(0.04\\)."
        },
        {
          "id": "b",
          "text": "The alternative has probability \\(0.96\\)."
        },
        {
          "id": "c",
          "text": "Reject the null at the chosen level; this does not assign a probability to the null hypothesis."
        },
        {
          "id": "d",
          "text": "The effect must be practically large."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "Since \\(0.04\\le0.05\\), the decision rule rejects. A p-value measures incompatibility with the null through a specified test; it is not a posterior probability of either hypothesis and does not measure effect magnitude.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 36,
          "anchor": "interpreting-a-p-value",
          "sourceKey": "Interpreting a $p$-value"
        }
      ]
    },
    {
      "id": "lec06-019",
      "type": "multiple-choice",
      "topic": "Decisions and errors",
      "difficulty": "intro",
      "prompt": "A test uses the rule “reject if \\(p\\le0.05\\)”. The observed p-value is \\(0.07\\). What should be reported?",
      "options": [
        {
          "id": "a",
          "text": "The null hypothesis has been proved."
        },
        {
          "id": "b",
          "text": "Do not reject at level \\(0.05\\); this does not establish that the null is true."
        },
        {
          "id": "c",
          "text": "Reject because \\(0.07\\) is close to \\(0.05\\)."
        },
        {
          "id": "d",
          "text": "There is a \\(93\\%\\) probability of no effect."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "The prescribed cutoff has not been crossed. Non-rejection can occur both under the null and under alternatives with insufficient power, so it is not proof of the null.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 25,
          "anchor": "tests-and-rejection-regions",
          "sourceKey": "stmt-test"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 36,
          "anchor": "interpreting-a-p-value",
          "sourceKey": "Interpreting a $p$-value"
        }
      ]
    },
    {
      "id": "lec06-020",
      "type": "numeric-input",
      "topic": "Tail probabilities",
      "difficulty": "core",
      "prompt": "For \\(T\\sim\\operatorname{Bin}(5,\\theta)\\), test \\(H_0:\\theta\\le1/2\\) against \\(\\theta>1/2\\), using large counts as evidence. Observe \\(t=4\\). The upper-tail p-value is attained at \\(\\theta=1/2\\). Compute it exactly.",
      "correctAnswer": "3/16",
      "acceptedAnswers": [
        "3/16"
      ],
      "answerDisplay": "\\(\\frac{3}{16}\\)",
      "explanation": "The tail includes the observed count: \\(\\mathbb P_{1/2}(T\\ge4)=[\\binom54+\\binom55]/2^5=6/32=3/16\\). Using only \\(\\mathbb P(T=4)\\) would omit more extreme data.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 34,
          "anchor": "p-values-from-upper-tails",
          "sourceKey": "stmt-tail-pvalue"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 35,
          "anchor": "an-observed-binomial-p-value",
          "sourceKey": "stmt-binomial-pvalue"
        }
      ]
    },
    {
      "id": "lec06-021",
      "type": "multiple-choice",
      "topic": "Tail probabilities",
      "difficulty": "core",
      "prompt": "For five independent Bernoulli\\((\\theta)\\) trials, test \\(H_0:\\theta\\le1/2\\) against \\(\\theta>1/2\\) using the upper tail. All five trials succeed, giving the exact p-value \\(1/32\\). At which of the levels \\(0.05\\) and \\(0.01\\) does the rule \\(p\\le\\alpha\\) reject?",
      "options": [
        {
          "id": "a",
          "text": "At both levels."
        },
        {
          "id": "b",
          "text": "Only at \\(0.01\\)."
        },
        {
          "id": "c",
          "text": "At neither level."
        },
        {
          "id": "d",
          "text": "Only at \\(0.05\\)."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Since \\(1/32=0.03125\\), it is below \\(0.05\\) but above \\(0.01\\). A smaller significance level makes rejection harder for fixed data and a fixed p-value.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 35,
          "anchor": "an-observed-binomial-p-value",
          "sourceKey": "stmt-binomial-pvalue"
        }
      ]
    },
    {
      "id": "lec06-022",
      "type": "proof-step",
      "topic": "Valid p-values",
      "difficulty": "challenge",
      "prompt": "Which event inclusion completes the validity proof?",
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(T(X)\\) be a statistic with finite range and let the null set \\(\\Theta_0\\) be nonempty. Define \\(q_\\theta(t)=\\mathbb P_\\theta(T(X)\\ge t)\\) and \\(p(X)=\\sup_{\\vartheta\\in\\Theta_0}q_\\vartheta(T(X))\\). Then \\(p\\) is valid: \\(\\mathbb P_\\theta(p(X)\\le\\alpha)\\le\\alpha\\) for all \\(\\theta\\in\\Theta_0\\) and \\(\\alpha\\in[0,1]\\)."
        },
        {
          "label": "Proof so far",
          "text": "Fix \\(\\theta\\in\\Theta_0\\) and \\(\\alpha\\in[0,1]\\). Since \\(q_\\theta\\) is nonincreasing on the finite range, the set of values with \\(q_\\theta(t)\\le\\alpha\\) is empty or has a smallest value \\(t_*\\). In the latter case, \\(\\mathbb P_\\theta(q_\\theta(T)\\le\\alpha)=\\mathbb P_\\theta(T\\ge t_*)=q_\\theta(t_*)\\le\\alpha\\); in the empty case it is zero. Also \\(q_\\theta(T)\\le p\\)."
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
      "explanation": "The supremum gives \\(q_\\theta(T)\\le p\\) at every null parameter. Thus \\(p\\le\\alpha\\) implies \\(q_\\theta(T)\\le\\alpha\\), and \\(\\mathbb P_\\theta(p\\le\\alpha)\\le\\alpha\\). Taking the supremum over the null makes the p-value no smaller than each fixed-null tail.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 34,
          "anchor": "p-values-from-upper-tails",
          "sourceKey": "stmt-tail-pvalue"
        }
      ]
    },
    {
      "id": "lec06-023",
      "type": "multiple-choice",
      "topic": "Valid p-values",
      "difficulty": "challenge",
      "prompt": "Under a simple null, \\(X\\) equals \\(0\\) or \\(1\\), each with probability \\(1/2\\). Define \\(p(0)=1\\) and \\(p(1)=1/2\\). Is \\(p(X)\\) a valid p-value?",
      "options": [
        {
          "id": "a",
          "text": "No: a valid p-value must be continuously uniform."
        },
        {
          "id": "b",
          "text": "Yes: it is valid, but not uniformly distributed on the interval."
        },
        {
          "id": "c",
          "text": "No: a p-value may never equal one."
        },
        {
          "id": "d",
          "text": "Yes, because \\(\\mathbb P(p\\le\\alpha)=\\alpha\\) for every \\(\\alpha\\)."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "For \\(0\\le\\alpha<1/2\\), the probability is \\(0\\); for \\(1/2\\le\\alpha<1\\), it is \\(1/2\\); at \\(\\alpha=1\\), it is \\(1\\). Each is at most \\(\\alpha\\). Validity is an inequality and permits discrete p-values.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 33,
          "anchor": "valid-p-values",
          "sourceKey": "stmt-pvalue"
        }
      ]
    },
    {
      "id": "lec06-024",
      "type": "multiple-choice",
      "topic": "Paired data and medians",
      "difficulty": "core",
      "prompt": "A before-and-after study assumes the pairs \\((X_i,Y_i)\\) are i.i.d. across participants, and uses differences \\(Z_i=Y_i-X_i\\). Which statement is correct?",
      "options": [
        {
          "id": "a",
          "text": "Before and after measurements within each participant must be independent."
        },
        {
          "id": "b",
          "text": "The differences are i.i.d.; dependence within each pair is allowed."
        },
        {
          "id": "c",
          "text": "Differences from different participants must be equal."
        },
        {
          "id": "d",
          "text": "Pairing guarantees that the differences have a normal distribution."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "Each difference applies the same measurable map \\((x,y)\\mapsto y-x\\) to one pair. Independence across pairs and their common distribution therefore give i.i.d. differences. Within-pair dependence is compatible with this setup.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 38,
          "anchor": "paired-observations",
          "sourceKey": "stmt-paired-data"
        }
      ]
    },
    {
      "id": "lec06-025",
      "type": "multiple-choice",
      "topic": "Models and hypotheses",
      "difficulty": "core",
      "prompt": "A sign test allows the common distribution of the i.i.d. differences \\(Z_i\\) to be unknown, requiring under the null that \\(\\mathbb P(Z_i>0)=\\mathbb P(Z_i<0)=1/2\\). Why is the use of a binomial null distribution consistent with a nonparametric model for the differences?",
      "options": [
        {
          "id": "a",
          "text": "The differences themselves must be binomial."
        },
        {
          "id": "b",
          "text": "Nonparametric means no probability assumptions are made."
        },
        {
          "id": "c",
          "text": "The binomial law describes the count of positive signs, not the full distribution of the differences."
        },
        {
          "id": "d",
          "text": "The differences are secretly assumed to be normal."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "The indicators \\(\\mathbf1_{\\{Z_i>0\\}}\\) are i.i.d. Bernoulli\\((1/2)\\), so their sum is binomial. This does not specify the magnitudes or shape of the distribution of \\(Z_i\\). Nonparametric models still have explicit assumptions.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 37,
          "anchor": "parametric-and-nonparametric-models",
          "sourceKey": "stmt-model-types"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "the-null-distribution-of-the-sign-statistic",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-026",
      "type": "numeric-input",
      "topic": "Paired data and medians",
      "difficulty": "core",
      "prompt": "The observed before/after pairs are \\((2,5),(4,3),(1,7),(8,10)\\). Define each difference as after minus before, and let \\(T\\) count strictly positive differences. What is \\(T\\)?",
      "correctAnswer": "3",
      "acceptedAnswers": [
        "3"
      ],
      "answerDisplay": "\\(3\\)",
      "integerAnswer": true,
      "explanation": "The differences are \\(3,-1,6,2\\). Three are positive, so \\(T=3\\). The sign statistic counts positives; it does not sum the differences or their absolute values.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 38,
          "anchor": "paired-observations",
          "sourceKey": "stmt-paired-data"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "the-null-distribution-of-the-sign-statistic",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-027",
      "type": "multiple-choice",
      "topic": "Sign tests",
      "difficulty": "core",
      "prompt": "Let \\(Z_1,\\ldots,Z_{12}\\) be i.i.d., with \\(\\mathbb P(Z_i=0)=0\\) and median \\(0\\). Set \\(T=\\sum_{i=1}^{12}\\mathbf1_{\\{Z_i>0\\}}\\). What is its null distribution?",
      "options": [
        {
          "id": "a",
          "text": "\\(N(0,1)\\), exactly."
        },
        {
          "id": "b",
          "text": "\\(\\operatorname{Bin}(12,1/2)\\)."
        },
        {
          "id": "c",
          "text": "Uniform on \\(\\{0,\\ldots,12\\}\\)."
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
      "explanation": "With no mass at zero, median zero gives \\(\\mathbb P(Z_i>0)=1/2\\). The independent indicators are Bernoulli\\((1/2)\\), so their sum is exactly binomial. A normal distribution would only provide an approximation.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medians-and-signs",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "the-null-distribution-of-the-sign-statistic",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-028",
      "type": "find-the-intruder",
      "topic": "Sign tests",
      "difficulty": "core",
      "prompt": "For the sign-test null with i.i.d. differences, median \\(0\\), and no mass at \\(0\\), which claimed requirement is unnecessary?",
      "options": [
        {
          "id": "a",
          "text": "The differences have a common distribution."
        },
        {
          "id": "b",
          "text": "The differences are independent across participants."
        },
        {
          "id": "c",
          "text": "The positive and negative signs each have probability one half."
        },
        {
          "id": "d",
          "text": "The full distribution of each difference is symmetric about zero."
        }
      ],
      "correctAnswer": "d",
      "acceptedAnswers": [
        "d"
      ],
      "explanation": "Equal sign probabilities do not require symmetric magnitudes. For example, a variable taking \\(-1\\) and \\(2\\), each with probability \\(1/2\\), has median \\(0\\), no mass at \\(0\\), and balanced signs without symmetry about \\(0\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medians-and-signs",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 40,
          "anchor": "the-null-distribution-of-the-sign-statistic",
          "sourceKey": "stmt-sign-distribution"
        }
      ]
    },
    {
      "id": "lec06-029",
      "type": "proof-step",
      "topic": "Paired data and medians",
      "difficulty": "challenge",
      "prompt": "What finishes the forward implication?",
      "context": [
        {
          "label": "Theorem",
          "text": "A real random variable \\(Z\\) satisfies \\(\\mathbb P(Z=0)=0\\). Then \\(0\\) is a median, meaning \\(\\mathbb P(Z\\le0)\\ge1/2\\) and \\(\\mathbb P(Z\\ge0)\\ge1/2\\), if and only if \\(\\mathbb P(Z>0)=1/2\\)."
        },
        {
          "label": "Proof so far",
          "text": "For the reverse implication, equal positive and negative sign probabilities immediately give the median inequalities. For the forward implication, suppose \\(0\\) is a median. Removing the zero-probability event \\(\\{Z=0\\}\\) gives \\(\\mathbb P(Z<0)\\ge1/2\\) and \\(\\mathbb P(Z>0)\\ge1/2\\)."
        }
      ],
      "options": [
        {
          "id": "a",
          "text": "Both probabilities must equal \\(1/2\\), since they sum to \\(1\\)."
        },
        {
          "id": "b",
          "text": "The distribution of \\(Z\\) must be symmetric."
        },
        {
          "id": "c",
          "text": "The expectation \\(\\mathbb E(Z)\\) must equal \\(0\\)."
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
      "explanation": "The two disjoint events \\(Z<0\\) and \\(Z>0\\) have total probability \\(1\\) when there is no mass at zero. If both probabilities are at least \\(1/2\\), each must equal \\(1/2\\). Neither symmetry nor existence of an expectation is needed.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medians-and-signs",
          "sourceKey": "stmt-median"
        }
      ]
    },
    {
      "id": "lec06-030",
      "type": "numeric-input",
      "topic": "Tail probabilities",
      "difficulty": "core",
      "prompt": "Four i.i.d. differences have no mass at zero. To test \\(H_0:\\mathbb P(Z_i>0)=1/2\\) against a larger positive-sign probability, use the upper-tail sign test. All four observed differences are positive. Compute the exact one-sided p-value.",
      "correctAnswer": "1/16",
      "acceptedAnswers": [
        "1/16"
      ],
      "answerDisplay": "\\(\\frac{1}{16}\\)",
      "explanation": "Under the null, \\(B\\sim\\operatorname{Bin}(4,1/2)\\). The upper-tail p-value at \\(t=4\\) is \\(\\mathbb P(B\\ge4)=1/16\\). Even four positives out of four do not cross a \\(0.05\\) cutoff.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "one-sided-and-two-sided-sign-tests",
          "sourceKey": "stmt-sign-pvalues"
        }
      ]
    },
    {
      "id": "lec06-031",
      "type": "numeric-input",
      "topic": "Tail probabilities",
      "difficulty": "core",
      "prompt": "For six i.i.d. nonzero differences, the sign-test null gives \\(B\\sim\\operatorname{Bin}(6,1/2)\\). Observe \\(t=5\\) positive differences. Using extremeness \\(|B-3|\\), compute the exact two-sided p-value \\(\\mathbb P(|B-3|\\ge|5-3|)\\).",
      "correctAnswer": "7/32",
      "acceptedAnswers": [
        "7/32"
      ],
      "answerDisplay": "\\(\\frac{7}{32}\\)",
      "explanation": "At least this far from \\(3\\) means \\(B\\in\\{0,1,5,6\\}\\). The total mass is \\((1+6+6+1)/2^6=14/64=7/32\\). Both tails, including the equally extreme counts, belong in this two-sided p-value.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "one-sided-and-two-sided-sign-tests",
          "sourceKey": "stmt-sign-pvalues"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 44,
          "anchor": "the-exact-two-sided-calculation",
          "sourceKey": "The exact two-sided calculation"
        }
      ]
    },
    {
      "id": "lec06-032",
      "type": "numeric-input",
      "topic": "Sign tests",
      "difficulty": "core",
      "prompt": "In a two-sided sign test with six nonzero differences, observe three positive and three negative signs. Under the null \\(B\\sim\\operatorname{Bin}(6,1/2)\\), the p-value is \\(\\mathbb P(|B-3|\\ge|3-3|)\\). What is it?",
      "correctAnswer": "1",
      "acceptedAnswers": [
        "1"
      ],
      "answerDisplay": "\\(1\\)",
      "explanation": "Every possible count has distance at least zero from \\(3\\). Therefore the event is certain and the p-value is \\(1\\), not the single mass \\(\\mathbb P(B=3)\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "one-sided-and-two-sided-sign-tests",
          "sourceKey": "stmt-sign-pvalues"
        }
      ]
    },
    {
      "id": "lec06-033",
      "type": "multiple-choice",
      "topic": "Sign tests",
      "difficulty": "core",
      "prompt": "Before seeing data, a researcher wants to detect either an increase or a decrease in paired differences. Which choice follows the sign-test setup in the slides?",
      "options": [
        {
          "id": "a",
          "text": "Use a two-sided sign test chosen before looking at the data."
        },
        {
          "id": "b",
          "text": "After seeing the signs, choose the smaller one-sided p-value and treat it as a prespecified one-sided test."
        },
        {
          "id": "c",
          "text": "Always use an upper-tail test, including for negative changes."
        },
        {
          "id": "d",
          "text": "Choose the significance level just above the observed p-value."
        }
      ],
      "correctAnswer": "a",
      "acceptedAnswers": [
        "a"
      ],
      "explanation": "An alternative allowing either direction calls for a two-sided extremeness rule. Choosing the favourable one-sided direction after seeing data does not preserve the original one-sided error guarantee. Hypotheses and the decision rule must be specified in advance.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 42,
          "anchor": "one-sided-and-two-sided-sign-tests",
          "sourceKey": "stmt-sign-pvalues"
        }
      ]
    },
    {
      "id": "lec06-034",
      "type": "multiple-choice",
      "topic": "Paired data and medians",
      "difficulty": "challenge",
      "prompt": "Assume paired differences are i.i.d. and have no mass at zero. Ten observed differences are nine values of \\(+1\\) and one value of \\(-100\\). The two-sided sign-test p-value for median zero is \\(22/1024\\approx0.0215\\). At level \\(0.05\\), what is justified?",
      "options": [
        {
          "id": "a",
          "text": "The population mean is necessarily positive."
        },
        {
          "id": "b",
          "text": "Do not reject median zero because the sample mean is negative."
        },
        {
          "id": "c",
          "text": "Reject median zero; this test does not establish a positive population mean."
        },
        {
          "id": "d",
          "text": "The outlier must be removed before applying any sign test."
        }
      ],
      "correctAnswer": "c",
      "acceptedAnswers": [
        "c"
      ],
      "explanation": "The statistic uses nine positive signs, not their magnitudes. Its p-value is below \\(0.05\\), so the median-zero null is rejected. The sample mean is \\(-9.1\\), illustrating why evidence about signs or a median is not a conclusion about the population mean.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medians-and-signs",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 43,
          "anchor": "a-paired-example",
          "sourceKey": "stmt-paired-example"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 44,
          "anchor": "the-exact-two-sided-calculation",
          "sourceKey": "The exact two-sided calculation"
        }
      ]
    },
    {
      "id": "lec06-035",
      "type": "multiple-choice",
      "topic": "Zero differences",
      "difficulty": "core",
      "prompt": "Observed i.i.d. differences are \\(0,2,-1,0,3,4,0,-2\\). Under the conditional-sign null, \\(\\mathbb P(Z_i>0\\mid Z_i\\ne0)=1/2\\). After conditioning on the number \\(M\\) of nonzero differences, which null distribution should be used for their positive count \\(T\\)?",
      "options": [
        {
          "id": "a",
          "text": "\\(\\operatorname{Bin}(8,1/2)\\), with observed \\(T=3\\)."
        },
        {
          "id": "b",
          "text": "\\(\\operatorname{Bin}(5,1/2)\\), with observed \\(T=3\\)."
        },
        {
          "id": "c",
          "text": "\\(\\operatorname{Bin}(3,1/2)\\), with observed \\(T=5\\)."
        },
        {
          "id": "d",
          "text": "\\(N(0,1)\\), exactly."
        }
      ],
      "correctAnswer": "b",
      "acceptedAnswers": [
        "b"
      ],
      "explanation": "There are \\(M=5\\) nonzero observations and \\(T=3\\) positives. Under conditional sign balance, \\(T\\mid M=5\\sim\\operatorname{Bin}(5,1/2)\\). Zero differences do not count as negative signs or as retained trials.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 45,
          "anchor": "zero-differences",
          "sourceKey": "stmt-sign-ties"
        }
      ]
    },
    {
      "id": "lec06-036",
      "type": "multiple-choice",
      "topic": "Zero differences",
      "difficulty": "challenge",
      "prompt": "A difference \\(Z\\) has \\(\\mathbb P(Z=0)=0.6\\), \\(\\mathbb P(Z=1)=0.3\\), and \\(\\mathbb P(Z=-1)=0.1\\). Recall that \\(0\\) is a median when \\(\\mathbb P(Z\\le0)\\ge1/2\\) and \\(\\mathbb P(Z\\ge0)\\ge1/2\\). Which statement is correct?",
      "options": [
        {
          "id": "a",
          "text": "Zero is not a median."
        },
        {
          "id": "b",
          "text": "Zero is a median and \\(\\mathbb P(Z>0\\mid Z\\ne0)=1/2\\)."
        },
        {
          "id": "c",
          "text": "Zero is a median, but \\(\\mathbb P(Z>0\\mid Z\\ne0)=3/4\\)."
        },
        {
          "id": "d",
          "text": "Zero is a median, but \\(\\mathbb P(Z>0\\mid Z\\ne0)=0.3\\)."
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
        "title": "Mass at zero can hide unbalanced signs",
        "description": "The positive and negative masses need not match even when zero is a median.",
        "caption": "The positive and negative masses need not match even when zero is a median.",
        "xLabel": "Difference",
        "yLabel": "Probability"
      },
      "explanation": "The median inequalities are \\(0.7\\ge1/2\\) and \\(0.9\\ge1/2\\). However, conditioning on nonzero gives \\(0.3/(0.3+0.1)=3/4\\). When there is mass at zero, median zero alone does not justify discarding ties and using fair-sign binomial probabilities.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 39,
          "anchor": "medians-and-signs",
          "sourceKey": "stmt-median"
        },
        {
          "sourceId": "week-3-slides",
          "slide": 45,
          "anchor": "zero-differences",
          "sourceKey": "stmt-sign-ties"
        }
      ]
    },
    {
      "id": "lec06-037",
      "type": "proof-step",
      "topic": "Zero differences",
      "difficulty": "challenge",
      "prompt": "Divide the displayed joint probability by the marginal probability. Which conditional mass results?",
      "context": [
        {
          "label": "Theorem",
          "text": "Let \\(Z_1,\\ldots,Z_n\\) be i.i.d., \\(q=\\mathbb P(Z_i\\ne0)>0\\), and \\(\\mathbb P(Z_i>0\\mid Z_i\\ne0)=1/2\\). Let \\(M=\\sum_i\\mathbf1_{\\{Z_i\\ne0\\}}\\) and \\(T=\\sum_i\\mathbf1_{\\{Z_i>0\\}}\\). For every \\(m\\) with \\(\\mathbb P(M=m)>0\\), \\(T\\mid M=m\\sim\\operatorname{Bin}(m,1/2)\\)."
        },
        {
          "label": "Proof so far",
          "text": "If \\(q=1\\), then \\(M=n\\) surely and the result is the usual binomial law for the independent signs. Now take \\(0<q<1\\). The probabilities of a positive, negative, and zero difference are \\(q/2,q/2,1-q\\). Counting their arrangements, for \\(0\\le t\\le m\\le n\\), \\[\\begin{aligned}&\\mathbb P(T=t,M=m)\\\\&\\quad=\\frac{n!}{t!(m-t)!(n-m)!}\\\\&\\qquad{}\\cdot(q/2)^m(1-q)^{n-m}.\\end{aligned}\\] Also \\[\\mathbb P(M=m)=\\binom nm q^m(1-q)^{n-m}>0.\\]"
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
      "explanation": "The factors \\(q^m(1-q)^{n-m}\\) cancel. Dividing the factorial coefficient by \\(\\binom nm\\) leaves \\(m!/[t!(m-t)!]=\\binom mt\\), together with \\(2^{-m}\\). The answer does not depend on the unknown nonzero probability \\(q\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 46,
          "anchor": "zero-differences-proof",
          "sourceKey": "Zero differences: proof"
        }
      ]
    },
    {
      "id": "lec06-038",
      "type": "numeric-input",
      "topic": "Sign tests",
      "difficulty": "challenge",
      "prompt": "In a two-sided sign test with \\(100\\) i.i.d. nonzero differences, observe \\(t=60\\) positives. Under the null \\(B\\sim\\operatorname{Bin}(100,1/2)\\). Use the continuity-corrected approximation \\(p\\approx2\\Phi((k+0.5-50)/5)\\), where \\(k=\\min(t,100-t)\\) and \\(\\Phi\\) is the standard normal CDF. Given \\(\\Phi(-1.9)\\approx0.0287\\), give the approximate p-value to four decimal places.",
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
        "title": "One of the two approximating tails",
        "description": "Only the lower tail is shaded; double its area for the two-sided approximation. The drawing truncates the infinite tail.",
        "caption": "Only the lower tail is shaded; double its area for the two-sided approximation. The drawing truncates the infinite tail.",
        "xLabel": "Value"
      },
      "explanation": "Here \\(k=40\\), so the corrected lower-tail endpoint is \\(40.5\\) and the standardized value is \\(-1.9\\). Doubling the tail gives \\(2(0.0287)=0.0574\\). This is an approximation, not the exact binomial p-value; it would not reject at level \\(0.05\\).",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 47,
          "anchor": "a-normal-approximation-for-the-sign-test",
          "sourceKey": "A normal approximation for the sign test"
        }
      ]
    },
    {
      "id": "lec06-039",
      "type": "find-the-intruder",
      "topic": "Valid p-values",
      "difficulty": "challenge",
      "prompt": "Under a simple null, outcomes \\(a\\) and \\(b\\) each have probability \\(1/2\\). Which proposed pair \\((p(a),p(b))\\) fails the validity condition \\(\\mathbb P(p\\le\\alpha)\\le\\alpha\\) for every \\(\\alpha\\in[0,1]\\)?",
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
      "explanation": "For the last pair, \\(\\mathbb P(p\\le1/4)=1/2>1/4\\), so it is invalid. For each other pair, checking the jump points of the finite distribution gives probabilities at most the corresponding threshold.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 33,
          "anchor": "valid-p-values",
          "sourceKey": "stmt-pvalue"
        }
      ]
    },
    {
      "id": "lec06-040",
      "type": "numeric-input",
      "topic": "Tail probabilities",
      "difficulty": "challenge",
      "prompt": "A statistic \\(T\\) takes values \\(0,1,2\\). The null consists of two distributions: under A their probabilities are \\((0.80,0.18,0.02)\\); under B they are \\((0.70,0.18,0.12)\\), in that order. Large \\(T\\) is evidence against the null. For observed \\(t=2\\), compute the upper-tail p-value defined as the supremum over the null distributions.",
      "correctAnswer": "0.12",
      "acceptedAnswers": [
        "0.12"
      ],
      "answerDisplay": "\\(0.12\\)",
      "explanation": "The two upper tails at \\(2\\) are \\(0.02\\) and \\(0.12\\). Their supremum is \\(0.12\\), not their minimum or average. Using \\(0.02\\) would fail to protect the Type I error under null distribution B.",
      "sources": [
        {
          "sourceId": "week-3-slides",
          "slide": 34,
          "anchor": "p-values-from-upper-tails",
          "sourceKey": "stmt-tail-pvalue"
        }
      ]
    }
  ]
};
