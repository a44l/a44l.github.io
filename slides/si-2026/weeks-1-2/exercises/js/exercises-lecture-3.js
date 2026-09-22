window.LECTURE_3_EXERCISE_BANK = {
  "schemaVersion": 1,
  "locale": "en-GB",
  "block": {
    "id": "lecture-3",
    "title": "Lecture 3",
    "description": "Slides 72–114: expectation, covariance, standard distributions, moment-generating and characteristic functions",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../index.html#/expectation-standard-families-and-transforms",
    "featuredTopics": [
      "Expectation and moments",
      "Variance and covariance",
      "Random counts",
      "Waiting times",
      "Normal models",
      "Transforms"
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
      "title": "Statistical Inference 2026 — Weeks 1–2, Lecture 3",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../index.html",
      "slideRange": [
        72,
        114
      ],
      "deckSha256": "84721841adaa599091a7b2655b5a9e752e0bf846365101af8f8765f5fcbed314",
      "sourceFile": "slides-2026-weeks-1-2/index.qmd",
      "renderedSourceFile": "slides/si-2026/weeks-1-2/index.html",
      "checkedOn": "2026-09-22"
    }
  },
  "exercises": [
    {
      "id": "lec03-001",
      "type": "multiple-choice",
      "topic": "Expectation",
      "difficulty": "intro",
      "prompt": "Which condition is the definition of integrability for a real random variable X?",
      "options": [
        {
          "id": "a",
          "text": "E(|X|)<∞."
        },
        {
          "id": "b",
          "text": "E(X²)<∞ is required by the definition."
        },
        {
          "id": "c",
          "text": "X takes only finitely many values."
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
      "explanation": "Integrability means E(|X|)<∞, so the positive and negative parts both have finite integrals and E(X) is a finite real number. A finite second moment or a finite range is sufficient, but neither is required. A nonnegative variable may have infinite expectation.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 73,
          "anchor": "expected-value"
        }
      ]
    },
    {
      "id": "lec03-002",
      "type": "numeric-input",
      "topic": "Expectation",
      "difficulty": "intro",
      "prompt": "A café delivery contains X drinks, where P(X=0)=1/4, P(X=1)=1/2 and P(X=2)=1/4. The bill is C=1+3X euros, including a fixed €1 delivery fee even if X=0. What is E(C), in euros?",
      "acceptedAnswers": [
        "4"
      ],
      "correctAnswer": "4",
      "explanation": "E(X)=0·(1/4)+1·(1/2)+2·(1/4)=1. Linearity gives E(C)=1+3E(X)=4 euros. The fixed charge contributes exactly €1 to every bill, and therefore also to its expectation.",
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
        "xLabel": "Number of drinks X",
        "yLabel": "Probability",
        "title": "How many drinks?",
        "description": "Bars at X=0, 1 and 2 have probabilities 1/4, 1/2 and 1/4.",
        "caption": "The bill is €1 plus €3 for each drink; the same probabilities apply to the corresponding bills."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 74,
          "anchor": "expectations-of-functions-of-a-random-variable"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 75,
          "anchor": "properties-of-expectation"
        }
      ]
    },
    {
      "id": "lec03-003",
      "type": "numeric-input",
      "topic": "Moments and Lp",
      "difficulty": "core",
      "prompt": "A sensor's signed error X takes the values −1, 0 and 2, with probabilities 1/4, 1/2 and 1/4, respectively. Its squared error is X². What is the second moment E(X²)?",
      "acceptedAnswers": [
        "1.25",
        "5/4"
      ],
      "correctAnswer": "1.25",
      "explanation": "Apply the expectation formula to g(x)=x²: E(X²)=1·(1/4)+0·(1/2)+4·(1/4)=5/4. This is the second moment, not the variance: the variance additionally subtracts (E(X))². Squaring the mean would also give a different quantity.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 74,
          "anchor": "expectations-of-functions-of-a-random-variable"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 76,
          "anchor": "moments-and-lp-spaces"
        }
      ]
    },
    {
      "id": "lec03-004",
      "type": "multiple-choice",
      "topic": "Linearity",
      "difficulty": "intro",
      "prompt": "Two outdoor events may be cancelled on the same rainy day. Let A and B denote their cancellation events, with P(A)=1/4 and P(B)=1/2. Put N=1_A+1_B, where 1_A is 1 on A and 0 otherwise, and similarly for 1_B. Thus N counts cancellations. No independence is assumed. What is E(N)?",
      "options": [
        {
          "id": "a",
          "text": "1/8; multiply the two cancellation probabilities."
        },
        {
          "id": "b",
          "text": "3/4; expectation is additive even without independence."
        },
        {
          "id": "c",
          "text": "It cannot be determined without P(A∩B)."
        },
        {
          "id": "d",
          "text": "1; each indicator has expectation 1."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "The indicators are bounded, hence integrable, and E(1_A)=P(A). Linearity gives E(N)=P(A)+P(B)=3/4, regardless of dependence. Knowing P(A∩B) would matter for the probability of two cancellations, but not for their expected count.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 75,
          "anchor": "properties-of-expectation"
        }
      ]
    },
    {
      "id": "lec03-005",
      "type": "proof-step",
      "topic": "Moments and Lp",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "If X is a real random variable with E(|X|⁴)<∞, then E(X²)<∞ and (E(X²))^(1/2)≤(E(|X|⁴))^(1/4). This is the L²–L⁴ norm comparison on a probability space."
        },
        {
          "label": "Proof so far",
          "text": "Set Z=|X|⁴. Then Z≥0 and E(Z)<∞. The function g(t)=√t is concave on [0,∞), and g(Z)=X². Jensen's inequality for a concave function states E(g(Z))≤g(E(Z))."
        }
      ],
      "prompt": "Which inequality follows from Jensen and yields the theorem after taking square roots?",
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
          "text": "E(X²)=(E(|X|⁴))^(1/2) for every such X."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Substitute g(Z)=X² and g(E(Z))=√E(|X|⁴) into the stated concave version of Jensen. The finite right-hand side proves E(X²)<∞. Taking square roots gives (E(X²))^(1/2)≤(E(|X|⁴))^(1/4); equality is not automatic.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 77,
          "anchor": "comparison-of-lp-norms"
        }
      ]
    },
    {
      "id": "lec03-006",
      "type": "multiple-choice",
      "topic": "Variance",
      "difficulty": "intro",
      "prompt": "A measuring instrument reports Y=3X+7 instead of X. Assume E(X²)<∞. Which expression gives the variance of its new readings?",
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
      "explanation": "The shift by 7 changes the mean but not deviations from that mean. Multiplying by 3 multiplies each centred deviation by 3 and its square by 9. Thus V(3X+7)=3²V(X).",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 78,
          "anchor": "variance"
        }
      ]
    },
    {
      "id": "lec03-007",
      "type": "proof-step",
      "topic": "Variance",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "For a real random variable X with E(X²)<∞, its variance V(X)=E((X−E(X))²) satisfies V(X)=E(X²)−(E(X))²."
        },
        {
          "label": "Proof so far",
          "text": "Write m=E(X), which is finite because X has a finite second moment. Expanding the square gives (X−m)²=X²−2mX+m². All terms are integrable, so linearity gives V(X)=E(X²)−2mE(X)+E(m²)."
        }
      ],
      "prompt": "Which substitution completes the calculation?",
      "options": [
        {
          "id": "a",
          "text": "E(X)=m and E(m²)=m², so V(X)=E(X²)−m²."
        },
        {
          "id": "b",
          "text": "E(X)=m and E(m²)=0, so V(X)=E(X²)−2m²."
        },
        {
          "id": "c",
          "text": "E(X²)=m² for every X, so V(X)=0."
        },
        {
          "id": "d",
          "text": "E(X)=0 for every integrable X, so V(X)=E(X²)."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The mean m is a fixed real number, not another random observation. Its squared constant has expectation E(m²)=m². Hence −2mE(X)+E(m²)=−2m²+m²=−m². No assumption that X is centred or independent of anything is needed.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 78,
          "anchor": "variance"
        }
      ]
    },
    {
      "id": "lec03-008",
      "type": "numeric-input",
      "topic": "Covariance",
      "difficulty": "core",
      "prompt": "Two sensors have joint readings (X,Y) equal to (0,0), (0,1), (2,1) or (2,2), each with probability 1/4. Compute Cov(X,Y)=E(XY)−E(X)E(Y).",
      "acceptedAnswers": [
        "0.5",
        "1/2"
      ],
      "correctAnswer": "0.5",
      "explanation": "E(X)=1 and E(Y)=1, while E(XY)=(0+0+2+4)/4=3/2. Thus Cov(X,Y)=3/2−1·1=1/2. Equivalently, the four products of centred readings are 1, 0, 0 and 1, whose mean is 1/2.",
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
        "xLabel": "Reading X",
        "yLabel": "Reading Y",
        "title": "Paired sensor readings",
        "description": "The four possible pairs are (0,0), (0,1), (2,1) and (2,2), each with probability 1/4.",
        "caption": "Each dot represents one equally likely pair, not two separate independent draws."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 81,
          "anchor": "covariance"
        }
      ]
    },
    {
      "id": "lec03-009",
      "type": "numeric-input",
      "topic": "Covariance",
      "difficulty": "core",
      "prompt": "Two measurements X and Y have finite second moments and Cov(X,Y)=−2. New instruments report A=3X+7 and B=−2Y+1. What is Cov(A,B)?",
      "acceptedAnswers": [
        "12"
      ],
      "correctAnswer": "12",
      "explanation": "Cov(aX+b,cY+d)=ac Cov(X,Y). The shifts 7 and 1 do not contribute, so Cov(A,B)=3·(−2)·(−2)=12. Reversing the sign of one measurement reverses the covariance's sign; both scale factors also affect its size.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 81,
          "anchor": "covariance"
        }
      ]
    },
    {
      "id": "lec03-010",
      "type": "multiple-choice",
      "topic": "Independence and covariance",
      "difficulty": "challenge",
      "prompt": "A signed deviation X equals −1, 0 or 1, each with probability 1/3, and Y=X² records its squared size. Which statement correctly describes this pair? Here 'uncorrelated' means Cov(X,Y)=0.",
      "options": [
        {
          "id": "a",
          "text": "Independent and uncorrelated, because E(X)=0."
        },
        {
          "id": "b",
          "text": "Uncorrelated but not independent: Cov(X,Y)=0, whereas P(X=0,Y=0)=1/3≠1/9=P(X=0)P(Y=0)."
        },
        {
          "id": "c",
          "text": "Not uncorrelated: Cov(X,Y)=E(Y)=2/3."
        },
        {
          "id": "d",
          "text": "Independent, because Y never takes negative values."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Symmetry gives E(X)=0 and E(XY)=E(X³)=0, so the covariance is zero. But Y=0 occurs exactly when X=0, giving joint probability 1/3 instead of the product 1/9. Opposite signed contributions can cancel in covariance even when there is strong dependence.",
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
        "xLabel": "Signed deviation X",
        "yLabel": "Squared size Y",
        "title": "A signed deviation and its square",
        "description": "Three equally likely points: (−1,1), (0,0) and (1,1). The second coordinate is the square of the first.",
        "caption": "Each point has probability 1/3. Opposite signed deviations have the same squared size."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 88,
          "anchor": "uncorrelated-but-dependent-variables"
        }
      ]
    },
    {
      "id": "lec03-011",
      "type": "numeric-input",
      "topic": "Variance of sums",
      "difficulty": "core",
      "prompt": "Two stages of a delivery take random times X and Y, measured in minutes, with finite second moments. Suppose V(X)=4, V(Y)=9 and Cov(X,Y)=1, all in squared minutes. What is V(X+Y), in squared minutes? Do not assume independence.",
      "acceptedAnswers": [
        "15"
      ],
      "correctAnswer": "15",
      "explanation": "For two square-integrable variables, V(X+Y)=V(X)+V(Y)+2Cov(X,Y). Therefore the answer is 4+9+2·1=15. Adding just 4+9 would drop the positive covariance term and underestimate the variation in the total delivery time.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 84,
          "anchor": "variance-of-a-sum"
        }
      ]
    },
    {
      "id": "lec03-012",
      "type": "proof-step",
      "topic": "Independence and covariance",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X and Y have finite second moments. They are independent if and only if Cov(f(X),g(Y))=0 for every pair of bounded Borel-measurable functions f,g:ℝ→ℝ. For a Borel set A, 1_A(x) equals 1 if x∈A and 0 otherwise."
        },
        {
          "label": "Proof so far",
          "text": "For the forward implication, measurable functions of independent variables are independent. Boundedness makes them integrable, so E(f(X)g(Y))=E(f(X))E(g(Y)), giving zero covariance. For the reverse implication, suppose all the stated covariances vanish. Fix arbitrary Borel sets A,B⊆ℝ. Independence will follow if P(X∈A,Y∈B)=P(X∈A)P(Y∈B) for every such A,B."
        }
      ],
      "prompt": "Which admissible choice of f and g turns the covariance assumption into exactly the required probability identity?",
      "options": [
        {
          "id": "a",
          "text": "f(x)=x and g(y)=y; vanishing of this one covariance proves independence."
        },
        {
          "id": "b",
          "text": "f(x)=0 and g(y)=0; the identity 0=0 proves every probability factorization."
        },
        {
          "id": "c",
          "text": "f(x)=1_A(x) and g(y)=1_B(y)."
        },
        {
          "id": "d",
          "text": "f(x)=1_A(x) and g(y)=1; this compares both events A and B."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Indicators of Borel sets are bounded and Borel measurable. Their product is the indicator of {X∈A,Y∈B}, so zero covariance reads 0=P(X∈A,Y∈B)−P(X∈A)P(Y∈B). Since A and B were arbitrary, this is independence. The identity functions are not bounded, and a single zero covariance would not suffice anyway.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 86,
          "anchor": "uncorrelatedness-and-independence"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 87,
          "anchor": "proof-of-the-comparison"
        }
      ]
    },
    {
      "id": "lec03-013",
      "type": "numeric-input",
      "topic": "Tail formulas",
      "difficulty": "core",
      "prompt": "A library has at most three reserved books to collect today. Let X be the number ready for collection, so X∈{0,1,2,3}. The librarian reports P(X≥1)=0.8, P(X≥2)=0.5 and P(X≥3)=0.2. Use the tail-sum formula to find E(X).",
      "acceptedAnswers": [
        "1.5",
        "3/2"
      ],
      "correctAnswer": "1.5",
      "explanation": "For a nonnegative integer-valued variable, E(X)=Σₖ₌₁^∞P(X≥k). Here terms after k=3 are zero, so E(X)=0.8+0.5+0.2=1.5. Each additional ready book contributes one extra layer to the count; summing the probabilities of those layers gives its mean.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 90,
          "anchor": "tail-formulas-for-the-mean"
        }
      ]
    },
    {
      "id": "lec03-014",
      "type": "proof-step",
      "topic": "Quantile expectations",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X be an integrable real random variable with CDF F(x)=P(X≤x). Define its quantile function Q(u)=inf{x∈ℝ:F(x)≥u} for 0<u<1. Then E(X)=∫₀¹Q(u) du."
        },
        {
          "label": "Proof so far",
          "text": "On an auxiliary probability space, let U be uniform on (0,1), with density 1 there and 0 elsewhere. The quantile property Q(u)≤x ⇔ u≤F(x) gives P(Q(U)≤x)=P(U≤F(x))=F(x). Therefore Q(U) and X have the same distribution, and E(|Q(U)|)=E(|X|)<∞. The function Q is measurable."
        }
      ],
      "prompt": "Which final step justifies integrating the quantile function over (0,1)?",
      "options": [
        {
          "id": "a",
          "text": "Same distribution means Q(U)=X at every outcome, without further construction."
        },
        {
          "id": "b",
          "text": "Every integrable X satisfies E(X)=∫₀¹F(u) du."
        },
        {
          "id": "c",
          "text": "Q must have a derivative, so E(X)=∫₀¹Q′(u) du."
        },
        {
          "id": "d",
          "text": "LOTUS for U gives E(X)=E(Q(U))=∫₀¹Q(u)·1 du."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "The law of the unconscious statistician (LOTUS) computes E(Q(U)) by integrating Q against the distribution of U. Its density is 1 on (0,1). The preceding integrability check permits the signed integral, and equal distributions give equal expectations. Neither a density for X nor differentiability of Q is required.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 92,
          "anchor": "expectation-as-a-quantile-integral"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 74,
          "anchor": "expectations-of-functions-of-a-random-variable"
        }
      ]
    },
    {
      "id": "lec03-015",
      "type": "multiple-choice",
      "topic": "Binomial and Bernoulli",
      "difficulty": "intro",
      "prompt": "A sensor reports either ‘alarm’ or ‘no alarm’. The probability of an alarm on one reading is 0.08. Define X=1 for an alarm and X=0 otherwise. Which distribution does X have?",
      "options": [
        {
          "id": "a",
          "text": "Bernoulli(0.08), equivalently B(1,0.08)"
        },
        {
          "id": "b",
          "text": "Bernoulli(0.92)"
        },
        {
          "id": "c",
          "text": "Poisson(0.08)"
        },
        {
          "id": "d",
          "text": "B(8,0.01)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A Bernoulli(p) variable is 1 with probability p and 0 with probability 1−p. Here p=0.08. No independence assumption is needed for this single reading. Poisson(0.08) allows counts larger than 1, whereas X can only be 0 or 1.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 93,
          "anchor": "the-binomial-distribution"
        }
      ]
    },
    {
      "id": "lec03-016",
      "type": "numeric-input",
      "topic": "Binomial and Bernoulli",
      "difficulty": "core",
      "prompt": "Four visitors independently buy a museum postcard, each with probability 1/4. Let X count the buyers. What is P(X=2)? Give an exact fraction or decimal.",
      "acceptedAnswers": [
        "27/128",
        "0.2109375"
      ],
      "correctAnswer": "27/128",
      "explanation": "X∼B(4,1/4). There are 4 choose 2 = 6 possible pairs of buyers. Each has probability (1/4)²(3/4)², so P(X=2)=6·(1/16)·(9/16)=27/128. Independence and the same purchase probability for all four visitors justify the binomial model.",
      "visual": {
        "kind": "trials",
        "count": 4,
        "p": 0.25,
        "labelSuccess": "Buys a postcard",
        "labelFailure": "Does not buy",
        "title": "Four independent decisions",
        "description": "Four trials, each with purchase probability one quarter. No outcomes have been observed.",
        "caption": "The symbols represent visitors, not observed purchases. Each has purchase probability 1/4."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 93,
          "anchor": "the-binomial-distribution"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 94,
          "anchor": "counting-bernoulli-outcomes"
        }
      ]
    },
    {
      "id": "lec03-017",
      "type": "proof-step",
      "topic": "Binomial and Bernoulli",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let n≥1 be an integer and let X₁,…,Xₙ be independent Bernoulli(p) variables with 0<p<1. For S=X₁+⋯+Xₙ and k∈{0,…,n}, P(S=k)=(n choose k)pᵏ(1−p)ⁿ⁻ᵏ. Here (n choose k)=n!/[k!(n−k)!], with 0!=1."
        },
        {
          "label": "Proof so far",
          "text": "For each subset A⊆{1,…,n} with exactly k elements, let E_A be the event that Xⱼ=1 exactly at the positions j∈A. Independence gives P(E_A)=pᵏ(1−p)ⁿ⁻ᵏ. Distinct subsets give disjoint events, and their union is {S=k}."
        }
      ],
      "prompt": "Which next step correctly completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "There are n subsets A, so P(S=k)=npᵏ(1−p)ⁿ⁻ᵏ."
        },
        {
          "id": "b",
          "text": "The events E_A are independent, so their probabilities must be multiplied."
        },
        {
          "id": "c",
          "text": "There are (n choose k) subsets A; add their equal probabilities to obtain the stated formula."
        },
        {
          "id": "d",
          "text": "All 2ⁿ outcome sequences have equal probability for every p, so P(S=k)=(n choose k)/2ⁿ."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Choosing the k positions occupied by ones gives exactly (n choose k) subsets. Additivity applies because the corresponding events are disjoint. For fixed k, all sequences with k ones have equal probability. All 2ⁿ sequences are equally likely only when p=1/2.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 94,
          "anchor": "counting-bernoulli-outcomes"
        }
      ]
    },
    {
      "id": "lec03-018",
      "type": "find-the-intruder",
      "topic": "Multinomial counts",
      "difficulty": "intro",
      "prompt": "Six customers independently choose exactly one drink each: tea with probability 0.2, coffee with probability 0.3, or juice with probability 0.5. Let (T,C,J) count the three choices. Which triple has probability zero under this model?",
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
      "explanation": "Every customer contributes to exactly one count, so T+C+J=6. The triple (1,2,2) sums to 5 and is impossible. All other triples sum to 6 and have positive probability because all three category probabilities are positive.",
      "visual": {
        "kind": "bars",
        "labels": [
          "Tea",
          "Coffee",
          "Juice"
        ],
        "values": [
          0.2,
          0.3,
          0.5
        ],
        "xLabel": "Drink chosen by one customer",
        "yLabel": "Probability",
        "title": "One choice per customer",
        "description": "For each of six independent customers: tea has probability 0.2, coffee 0.3, and juice 0.5.",
        "caption": "These are probabilities for one customer, not the observed counts among the six customers."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 96,
          "anchor": "the-trinomial-distribution"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 97,
          "anchor": "the-multinomial-distribution"
        }
      ]
    },
    {
      "id": "lec03-019",
      "type": "numeric-input",
      "topic": "Multinomial counts",
      "difficulty": "core",
      "prompt": "Ten customers independently choose exactly one drink each, with probabilities 0.2 for tea, 0.3 for coffee, and 0.5 for juice. Let T and C be the tea and coffee counts. Find Cov(T,C).",
      "acceptedAnswers": [
        "-0.6",
        "-3/5"
      ],
      "correctAnswer": "-0.6",
      "explanation": "For multinomial counts from d trials, distinct category counts satisfy Cov(Xᵢ,Xⱼ)=−dpᵢpⱼ. Thus Cov(T,C)=−10·0.2·0.3=−0.6. Choices by different customers are independent, but the category totals are not: the total number of customers is fixed.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 98,
          "anchor": "multinomial-moments"
        }
      ]
    },
    {
      "id": "lec03-020",
      "type": "proof-step",
      "topic": "Multinomial counts",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let d≥1 and r≥2 be integers. On each of d independent trials, a category j∈{1,…,r} is chosen with probability pⱼ, where pⱼ≥0 and p₁+⋯+pᵣ=1. Let Xⱼ count category j. For i≠j, Cov(Xᵢ,Xⱼ)=−dpᵢpⱼ."
        },
        {
          "label": "Proof so far",
          "text": "Write Cℓ for the category chosen on trial ℓ, and 1{A} for 1 when event A occurs and 0 otherwise. Each Xᵢ is the sum of 1{Cℓ=i} over ℓ=1,…,d. Hence XᵢXⱼ is the sum of 1{Cℓ=i}1{Cₘ=j} over all ordered pairs (ℓ,m)∈{1,…,d}². Terms with ℓ=m vanish because one trial cannot have two different categories. For ℓ≠m, independence gives E[1{Cℓ=i}1{Cₘ=j}]=pᵢpⱼ. Also E(Xᵢ)=dpᵢ and E(Xⱼ)=dpⱼ."
        }
      ],
      "prompt": "Which computation supplies the remaining step?",
      "options": [
        {
          "id": "a",
          "text": "There are d² remaining ordered pairs, so Cov(Xᵢ,Xⱼ)=d²pᵢpⱼ−d²pᵢpⱼ=0."
        },
        {
          "id": "b",
          "text": "There are d(d−1)/2 remaining ordered pairs, so E(XᵢXⱼ)=d(d−1)pᵢpⱼ/2."
        },
        {
          "id": "c",
          "text": "The remaining terms are all zero because different trials cannot choose different categories."
        },
        {
          "id": "d",
          "text": "There are d(d−1) remaining ordered pairs, so Cov(Xᵢ,Xⱼ)=d(d−1)pᵢpⱼ−d²pᵢpⱼ=−dpᵢpⱼ."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Choose the first trial in d ways and a different second trial in d−1 ways. These pairs are ordered, so there is no factor 1/2. Linearity gives E(XᵢXⱼ)=d(d−1)pᵢpⱼ. Subtracting E(Xᵢ)E(Xⱼ)=d²pᵢpⱼ proves the covariance formula, including d=1.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 98,
          "anchor": "multinomial-moments"
        }
      ]
    },
    {
      "id": "lec03-021",
      "type": "multiple-choice",
      "topic": "Poisson counts",
      "difficulty": "intro",
      "prompt": "A helpdesk model assumes that N, the number of calls in one hour, has distribution Poisson(6), and that T, the waiting time for the first call measured in hours, has distribution Exp(6). Which statement correctly distinguishes these two variables?",
      "options": [
        {
          "id": "a",
          "text": "Both variables count calls and both have mean 6 calls."
        },
        {
          "id": "b",
          "text": "N takes nonnegative integer values with mean 6; T is nonnegative with mean 1/6 hour, or 10 minutes."
        },
        {
          "id": "c",
          "text": "N is a waiting time with mean 1/6 hour; T is an integer count with mean 6."
        },
        {
          "id": "d",
          "text": "Both N and T have mean 1/6 hour because the parameter is the same."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "A Poisson variable is a count and has mean equal to its parameter: E(N)=6. An exponential waiting time with rate 6 per hour has mean E(T)=1/6 hour=10 minutes. The equality of the two numerical parameters does not make their distributions, possible values, or units identical.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 99,
          "anchor": "the-poisson-distribution"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 100,
          "anchor": "the-exponential-distribution"
        }
      ]
    },
    {
      "id": "lec03-022",
      "type": "multiple-choice",
      "topic": "Poisson counts",
      "difficulty": "core",
      "prompt": "The numbers of printing errors in a day on two printers are independent: X∼Poisson(1) and Y∼Poisson(2). What is the probability that neither printer makes an error that day?",
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
      "explanation": "Independence gives P(X=0,Y=0)=e⁻¹e⁻²=e⁻³. Equivalently, X+Y∼Poisson(3), and the nonnegative counts are both zero exactly when their sum is zero. The sum of the means is 3 errors per day, not a guaranteed daily count.",
      "visual": {
        "kind": "bars",
        "labels": [
          "Printer A",
          "Printer B"
        ],
        "values": [
          1,
          2
        ],
        "xLabel": "Independent printers",
        "yLabel": "Expected errors in one day",
        "title": "Two independent sources of errors",
        "description": "Printer A has a Poisson count with mean 1 error in a day. Printer B has a Poisson count with mean 2. Their counts are independent.",
        "caption": "Bar heights are expected counts, not probabilities or observed error totals."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 99,
          "anchor": "the-poisson-distribution"
        }
      ]
    },
    {
      "id": "lec03-023",
      "type": "multiple-choice",
      "topic": "Exponential waiting times",
      "difficulty": "core",
      "prompt": "The waiting time T for a call has distribution Exp(3), with T measured in minutes: the rate is 3 per minute. What is P(T>20 seconds)?",
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
      "explanation": "Convert the threshold to the unit used by the rate: 20 seconds=1/3 minute. For an exponential variable, P(T>t)=exp(−λt). Therefore P(T>1/3)=exp(−3·(1/3))=e⁻¹. The exponent must use compatible time units; 1−e⁻¹ would be the probability of a call within 20 seconds.",
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
            "label": "Time threshold"
          }
        ],
        "xLabel": "Seconds since waiting began",
        "title": "Keep the units consistent",
        "description": "A time axis runs from 0 to 60 seconds, with a threshold at 20 seconds. The model rate is 3 calls per minute. No call arrival is shown.",
        "caption": "This is a time scale and a question threshold, not an observed call history."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 100,
          "anchor": "the-exponential-distribution"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 102,
          "anchor": "call-arrivals-waiting-times"
        }
      ]
    },
    {
      "id": "lec03-024",
      "type": "proof-step",
      "topic": "Exponential waiting times",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "If T∼Exp(λ) with λ>0, then for every s,t≥0, P(T>s+t | T>s)=P(T>t). This is the memorylessness property. The exponential survival formula is P(T>u)=exp(−λu) for u≥0."
        },
        {
          "label": "Proof so far",
          "text": "Since P(T>s)=exp(−λs)>0, the conditional probability is defined. As t≥0, {T>s+t}⊆{T>s}; therefore P(T>s+t | T>s)=P(T>s+t)/P(T>s)=exp(−λ(s+t))/exp(−λs)."
        }
      ],
      "prompt": "Which next step finishes the proof?",
      "options": [
        {
          "id": "a",
          "text": "The ratio equals exp(−λt)=P(T>t), independently of s."
        },
        {
          "id": "b",
          "text": "The ratio equals exp(−λ(s+t))=P(T>s+t), because the two events are independent."
        },
        {
          "id": "c",
          "text": "The ratio equals 1−exp(−λt)=P(T≤t)."
        },
        {
          "id": "d",
          "text": "The ratio equals exp(−λs)=P(T>s), independently of t."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Subtracting exponents gives −λ(s+t)+λs=−λt. Thus, conditional on already waiting more than s, the probability of having to wait more than a further t is the original survival probability at t. The nested events are not generally independent; the ratio formula, not independence, justifies the computation.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 103,
          "anchor": "memorylessness"
        }
      ]
    },
    {
      "id": "lec03-025",
      "type": "multiple-choice",
      "topic": "Normal models",
      "difficulty": "intro",
      "prompt": "The fill volume X of a bottle is modelled by N(500,4²), with X measured in millilitres. In the lecture's notation N(μ,σ²), what are its mean and standard deviation?",
      "options": [
        {
          "id": "a",
          "text": "Mean 500 mL; standard deviation 16 mL."
        },
        {
          "id": "b",
          "text": "Mean 4 mL; standard deviation 500 mL."
        },
        {
          "id": "c",
          "text": "Mean 500 mL; standard deviation 2 mL."
        },
        {
          "id": "d",
          "text": "Mean 500 mL; standard deviation 4 mL."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "In N(μ,σ²), the second parameter is the variance. Here μ=500 and σ²=4²=16, so σ=4. The mean and standard deviation are measured in mL; the variance is 16 mL². This is a stated normal model, not a claim that real fill volumes can be negative.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 105,
          "anchor": "the-normal-distribution"
        }
      ]
    },
    {
      "id": "lec03-026",
      "type": "multiple-choice",
      "topic": "Normal models",
      "difficulty": "core",
      "prompt": "A measurement X is modelled by N(100,2²). Set Z=(X−100)/2, so Z∼N(0,1). Which probability is exactly equal to P(98<X<104)?",
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
      "explanation": "Subtract 100 from all three parts of 98<X<104, then divide by the positive standard deviation 2. This gives −1<(X−100)/2<2. Because X is assumed normal, Z is exactly standard normal; no approximation is being used.",
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
        "xLabel": "Measurement X",
        "title": "Translate an interval to the standard normal scale",
        "description": "Normal density with mean 100 and standard deviation 2. The area between 98 and 104 is shaded, with ticks at 98, 100, and 104.",
        "caption": "The shaded area represents P(98<X<104). The curve is the assumed normal model."
      },
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 105,
          "anchor": "the-normal-distribution"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 107,
          "anchor": "worksheet-2-standardization"
        }
      ]
    },
    {
      "id": "lec03-027",
      "type": "multiple-choice",
      "topic": "Normal models",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Given theorem",
          "text": "For a fixed p with 0<p<1 and X_d∼B(d,p), set Z_d=(X_d−dp)/√(dp(1−p)). The De Moivre–Laplace theorem states that, for every real z, P(Z_d≤z) tends as d→∞ to Φ(z), where Φ is the CDF of N(0,1)."
        }
      ],
      "prompt": "What can we correctly conclude about Z₁₀₀ when p=1/2?",
      "options": [
        {
          "id": "a",
          "text": "Z₁₀₀ is exactly N(0,1), because its mean is 0 and its variance is 1."
        },
        {
          "id": "b",
          "text": "P(Z₁₀₀≤z)=Φ(z) for every real z; the theorem gives equality at d=100."
        },
        {
          "id": "c",
          "text": "Z₁₀₀ is still discrete, and the theorem concerns convergence of CDFs as d grows, not exact normality at d=100."
        },
        {
          "id": "d",
          "text": "The same formula applies unchanged at p=0 because the denominator is then 1."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "For d=100 and p=1/2, Z₁₀₀=(X₁₀₀−50)/5 takes only 101 possible values, so it cannot have a continuous normal distribution. Standardization gives mean 0 and variance 1, but these two moments do not determine normality. The stated theorem is a limiting CDF result, not an error bound or an equality at a finite d; at p=0 or 1 the displayed denominator vanishes.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 106,
          "anchor": "from-binomial-to-normal"
        }
      ]
    },
    {
      "id": "lec03-028",
      "type": "multiple-choice",
      "topic": "Gamma waiting times",
      "difficulty": "core",
      "prompt": "Three tasks are performed one after another. Their durations T₁,T₂,T₃, in hours, are independent Exp(2) variables, with rate 2 per hour. For the total duration S=T₁+T₂+T₃, which Gamma distribution and mean are correct? Use the lecture's shape–scale convention Γ(κ,θ).",
      "options": [
        {
          "id": "a",
          "text": "S∼Γ(3,1/2) and E(S)=3/2 hours."
        },
        {
          "id": "b",
          "text": "S∼Γ(3,2) and E(S)=6 hours."
        },
        {
          "id": "c",
          "text": "S∼Γ(1/2,3) and E(S)=3/2 hours."
        },
        {
          "id": "d",
          "text": "S∼Exp(6) and E(S)=1/6 hour."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A sum of m independent Exp(1/θ) variables has distribution Γ(m,θ). Here m=3 and 1/θ=2, so θ=1/2 hour and S∼Γ(3,1/2). Its mean is κθ=3/2 hours, also the sum of the three means. Rates cannot simply be added when adding exponential durations.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 108,
          "anchor": "the-gamma-distribution"
        }
      ]
    },
    {
      "id": "lec03-029",
      "type": "numeric-input",
      "topic": "Gamma waiting times",
      "difficulty": "core",
      "prompt": "A service duration X, measured in minutes, follows Γ(κ,θ) in the shape–scale convention, with κ>0 and θ>0. Its mean is 6 minutes and its variance is 12 minutes². Find its scale θ in minutes.",
      "acceptedAnswers": [
        "2"
      ],
      "correctAnswer": "2",
      "explanation": "The Gamma formulas give E(X)=κθ and V(X)=κθ². Since κθ>0, dividing the variance by the mean gives θ=12/6=2 minutes. Then κ=6/2=3. The units also agree: minutes² divided by minutes gives minutes.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 108,
          "anchor": "the-gamma-distribution"
        }
      ]
    },
    {
      "id": "lec03-030",
      "type": "numeric-input",
      "topic": "Poisson counts",
      "difficulty": "core",
      "prompt": "A garden's number N of new flowers in one day is modelled by Poisson(6). How many times as likely is exactly 3 new flowers as exactly 2? Find P(N=3)/P(N=2).",
      "acceptedAnswers": [
        "2"
      ],
      "correctAnswer": "2",
      "explanation": "By the Poisson formula, P(N=3)/P(N=2)=[e⁻⁶·6³/3!]/[e⁻⁶·6²/2!]=6/3=2. Both probabilities are positive. A ratio of 2 means ‘twice as likely’; it is not itself the probability of either event.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 99,
          "anchor": "the-poisson-distribution"
        }
      ]
    },
    {
      "id": "lec03-031",
      "type": "multiple-choice",
      "topic": "Characteristic functions",
      "difficulty": "intro",
      "prompt": "For a real random variable X, define its characteristic function by φ_X(t)=E(e^{itX}), where t is real and i²=−1. Why is this expectation defined and finite for every real t, even when E(|X|)=∞?",
      "options": [
        {
          "id": "a",
          "text": "Every real random variable has a finite second moment."
        },
        {
          "id": "b",
          "text": "The complex random variable e^{itX} has absolute value 1, so E(|e^{itX}|)=1."
        },
        {
          "id": "c",
          "text": "Multiplication by i makes X bounded."
        },
        {
          "id": "d",
          "text": "Every real random variable has a moment generating function finite near zero."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "For real x and t, e^{itx}=cos(tx)+i sin(tx) has absolute value 1. Thus the absolute value is integrable, regardless of the size of X. This guarantees a finite characteristic function, but does not guarantee finite moments or a finite moment generating function away from zero.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 110,
          "anchor": "characteristic-functions"
        }
      ]
    },
    {
      "id": "lec03-032",
      "type": "multiple-choice",
      "topic": "Moment generating functions",
      "difficulty": "intro",
      "prompt": "A parcel is marked X=1 if delivery is late and X=0 otherwise. Suppose P(X=1)=1/4 and P(X=0)=3/4. Which formula gives the moment generating function M_X(t)=E(e^{tX}) for every real t?",
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
      "explanation": "Average the two possible values of e^{tX}, using their probabilities: M_X(t)=(3/4)e^0+(1/4)e^t. The transform is finite for every real t because X has only two possible values. In general E(e^{tX}) is not e^{tE(X)}.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 109,
          "anchor": "moment-generating-functions"
        }
      ]
    },
    {
      "id": "lec03-033",
      "type": "numeric-input",
      "topic": "Moments from transforms",
      "difficulty": "core",
      "prompt": "A real random variable X has a moment generating function M_X(t)=E(e^{tX}) that is finite on an open interval containing 0. You are given M_X′(0)=2 and M_X″(0)=7. Find Var(X)=E[(X−E(X))²].",
      "acceptedAnswers": [
        "3"
      ],
      "correctAnswer": "3",
      "explanation": "Finiteness on an open interval around zero justifies moment extraction: E(X)=M_X′(0)=2 and E(X²)=M_X″(0)=7. Therefore Var(X)=E(X²)−[E(X)]²=7−4=3. The second derivative gives the second moment, not directly the variance.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 109,
          "anchor": "moment-generating-functions"
        }
      ]
    },
    {
      "id": "lec03-034",
      "type": "multiple-choice",
      "topic": "Transform rules",
      "difficulty": "core",
      "prompt": "A real random variable X has characteristic function φ_X(t)=E(e^{itX})=exp(−t²/2) for every real t, where i²=−1. A sensor reports Y=2X+3. Which expression is φ_Y(t)?",
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
      "explanation": "For real a,b, φ_{aX+b}(t)=e^{ibt}φ_X(at). Here φ_Y(t)=e^{3it}φ_X(2t)=exp(3it−(2t)²/2)=exp(3it−2t²). Scaling X by 2 multiplies the quadratic term by 4; the additive shift contributes e^{3it}.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 111,
          "anchor": "affine-linear-maps-and-independent-sums"
        }
      ]
    },
    {
      "id": "lec03-035",
      "type": "proof-step",
      "topic": "Characteristic functions",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "For any real random variable X, let φ_X(t)=E(e^{itX}) for real t, with i²=−1. Then φ_X(−t)=overline(φ_X(t)) for every real t. Here overline(z) denotes the complex conjugate of z: overline(a+ib)=a−ib for real a,b."
        },
        {
          "label": "Proof so far",
          "text": "Fix a real t. Both exponentials are integrable because |e^{itX}|=|e^{−itX}|=1. The identity e^{−itX}=overline(e^{itX}) gives φ_X(−t)=E(overline(e^{itX}))."
        }
      ],
      "prompt": "Which next step completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "Expectation commutes with complex conjugation, by linearity for the real and imaginary parts; hence E(overline(e^{itX}))=overline(E(e^{itX}))."
        },
        {
          "id": "b",
          "text": "Conjugation leaves every complex number unchanged, so φ_X(−t)=φ_X(t)."
        },
        {
          "id": "c",
          "text": "Since |e^{itX}|=1, its expectation must equal 1."
        },
        {
          "id": "d",
          "text": "The identity e^{−itX}=−e^{itX} gives φ_X(−t)=−φ_X(t)."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Write e^{itX}=cos(tX)+i sin(tX). Its real and imaginary parts are bounded and therefore integrable. Taking the expectation after conjugating gives E(cos(tX))−iE(sin(tX)), exactly the conjugate of φ_X(t). A characteristic function need not be real or even.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 110,
          "anchor": "characteristic-functions"
        }
      ]
    },
    {
      "id": "lec03-036",
      "type": "proof-step",
      "topic": "Transform rules",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X and Y be independent real random variables with Poisson distributions of parameters 2 and 3, respectively. Then X+Y has the Poisson distribution of parameter 5. For λ>0, a Poisson(λ) variable takes values k=0,1,2,… with probabilities e^{−λ}λ^k/k!, and has characteristic function exp(λ(e^{it}−1)) for every real t, where i²=−1."
        },
        {
          "label": "Proof so far",
          "text": "Fix any real t. Independence gives φ_{X+Y}(t)=φ_X(t)φ_Y(t). Substitution yields φ_{X+Y}(t)=exp(2(e^{it}−1))exp(3(e^{it}−1))=exp(5(e^{it}−1))."
        }
      ],
      "prompt": "Which final step rigorously identifies the distribution of the total count X+Y?",
      "options": [
        {
          "id": "a",
          "text": "Since φ_{X+Y}(0)=1, the total must have the Poisson(5) distribution."
        },
        {
          "id": "b",
          "text": "The parameter 5 means X+Y=5 with probability 1."
        },
        {
          "id": "c",
          "text": "The product identity would hold for any X and Y with these marginal distributions, so independence was unnecessary."
        },
        {
          "id": "d",
          "text": "The expression equals the characteristic function of Poisson(5) for every real t; uniqueness of characteristic functions gives equality of distributions."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "The characteristic functions agree for all real arguments, so the uniqueness theorem identifies the law of X+Y as Poisson(5). Agreement only at zero would say nothing: every characteristic function equals 1 there. Independence is essential to the product step; equality of distributions does not mean that the total is the constant 5.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 111,
          "anchor": "affine-linear-maps-and-independent-sums"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 113,
          "anchor": "characteristic-functions-of-common-distributions"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 114,
          "anchor": "uniqueness-of-characteristic-functions"
        }
      ]
    },
    {
      "id": "lec03-037",
      "type": "proof-step",
      "topic": "Moments from transforms",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X be a real random variable with E(X²)<∞. Its characteristic function φ_X(t)=E(e^{itX}), where t is real and i²=−1, is twice continuously differentiable, with φ_X″(0)=−E(X²)."
        },
        {
          "label": "Proof so far",
          "text": "Let P_X be the probability distribution of X. Write φ_X(t)=∫ e^{itx} dP_X(x). For j=1,2, the jth derivative of e^{itx} with respect to t is (ix)^j e^{itx}; its absolute value is |x|^j. To interchange differentiation and integration twice, we need a bound independent of t that dominates both derivative orders and is integrable with respect to P_X."
        }
      ],
      "prompt": "Which bound is guaranteed to supply that integrable domination under the stated hypothesis?",
      "options": [
        {
          "id": "a",
          "text": "Use g(x)=1, because every derivative of e^{itx} has absolute value 1."
        },
        {
          "id": "b",
          "text": "Use g(x)=1+x²: |x|^j≤1+x² for j=1,2, and E(1+X²)<∞."
        },
        {
          "id": "c",
          "text": "Use g(x)=|x|, because |x|²≤|x| for every real x."
        },
        {
          "id": "d",
          "text": "Use g(x)=1+x⁴, because E(X²)<∞ always implies E(X⁴)<∞."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "The single integrable bound 1+x² controls both |x| and x². Dominated differentiation therefore gives φ_X″(t)=E((iX)²e^{itX}); dominated convergence gives continuity of the derivatives. At t=0, i²=−1 yields φ_X″(0)=−E(X²). Finite second moments do not guarantee finite fourth moments.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 112,
          "anchor": "derivatives-of-characteristic-functions"
        }
      ]
    },
    {
      "id": "lec03-038",
      "type": "find-the-intruder",
      "topic": "Characteristic functions",
      "difficulty": "core",
      "prompt": "A characteristic function has the form φ_X(t)=E(e^{itX}) for a real random variable X, real t, and i²=−1. Exactly one of the following functions cannot be a characteristic function. Find it.",
      "options": [
        {
          "id": "a",
          "text": "f(t)=1 for every real t."
        },
        {
          "id": "b",
          "text": "f(t)=cos(t) for every real t."
        },
        {
          "id": "c",
          "text": "f(t)=1+t² for every real t."
        },
        {
          "id": "d",
          "text": "f(t)=exp(−t²/2) for every real t."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Every characteristic function satisfies |φ_X(t)|≤E(|e^{itX}|)=1, but 1+t²>1 when t≠0. The other functions are valid: the constant variable 0 gives 1; a variable taking −1 and 1 with probability 1/2 each gives cos(t); the standard normal distribution N(0,1) gives exp(−t²/2).",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 110,
          "anchor": "characteristic-functions"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 113,
          "anchor": "characteristic-functions-of-common-distributions"
        }
      ]
    },
    {
      "id": "lec03-039",
      "type": "multiple-choice",
      "topic": "Moment generating functions",
      "difficulty": "core",
      "prompt": "Real random variables X and Y are defined on the same probability space. Their moment generating functions M_X(t)=E(e^{tX}) and M_Y(t)=E(e^{tY}) are finite and equal for every t in an open interval containing 0. Which conclusion is guaranteed?",
      "options": [
        {
          "id": "a",
          "text": "X and Y have the same probability distribution."
        },
        {
          "id": "b",
          "text": "P(X=Y)=1."
        },
        {
          "id": "c",
          "text": "X and Y are independent."
        },
        {
          "id": "d",
          "text": "X and Y must both be constant random variables."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The MGF uniqueness theorem applies because both transforms are finite and equal on an open interval around zero. It determines the distribution, not the joint behaviour of X and Y. For example, if X takes 0 and 1 with equal probability and Y=1−X, their MGFs agree for all real t, yet P(X=Y)=0 and they are not independent.",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 109,
          "anchor": "moment-generating-functions"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 114,
          "anchor": "uniqueness-of-characteristic-functions"
        }
      ]
    },
    {
      "id": "lec03-040",
      "type": "numeric-input",
      "topic": "Moments from transforms",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Sensor model",
          "text": "Independent real random variables X and Y have finite second moments. Their characteristic functions are φ_X(t)=exp(it−2t²) and φ_Y(t)=exp(3it−t²/2), for every real t; here φ_V(t)=E(e^{itV}) and i²=−1. The combined reading is Z=2X−Y."
        },
        {
          "label": "Useful identities",
          "text": "Independence gives φ_Z(t)=φ_X(2t)φ_Y(−t). For any real V with E(V²)<∞, φ_V′(0)=iE(V) and φ_V″(0)=−E(V²)."
        }
      ],
      "prompt": "Find the second moment E(Z²) of the combined reading. (This is not the same as its variance.)",
      "acceptedAnswers": [
        "18"
      ],
      "correctAnswer": "18",
      "explanation": "φ_Z(t)=exp(2it−8t²)exp(−3it−t²/2)=exp(−it−17t²/2). Differentiating twice at zero gives φ_Z″(0)=(−i)²−17=−18, so E(Z²)=18. Equivalently, E(Z)=−1 and Var(Z)=17, hence E(Z²)=17+(−1)². The finite second moments of X and Y imply that of Z, since (2X−Y)²≤8X²+2Y².",
      "sources": [
        {
          "sourceId": "lecture-3-slides",
          "slide": 111,
          "anchor": "affine-linear-maps-and-independent-sums"
        },
        {
          "sourceId": "lecture-3-slides",
          "slide": 112,
          "anchor": "derivatives-of-characteristic-functions"
        }
      ]
    }
  ]
};
