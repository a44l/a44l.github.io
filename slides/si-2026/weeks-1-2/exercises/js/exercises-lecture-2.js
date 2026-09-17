window.LECTURE_2_EXERCISE_BANK = {
  "schemaVersion": 1,
  "block": {
    "id": "lecture-2",
    "title": "Lecture 2",
    "description": "Slides 42–69: joint distributions, conditioning, independence, PMFs, densities and Bayes' formula",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../index.html#/random-vectors-and-independence",
    "featuredTopics": [
      "Joint CDFs",
      "Conditional probability",
      "Independence",
      "Joint and conditional PMFs",
      "Joint and conditional densities",
      "Bayes' formula"
    ]
  },
  "implementationNotes": {
    "scope": "Only Lecture 2 of the local website's 2026 Weeks 1–2 deck: section title on slide 42, mathematical content on slides 43–69, including the optional Bayes/Worksheet 1 recap. Title counts as slide 1. No expectation, covariance or transforms.",
    "sessionSelection": "Eight unique questions from this bank only: 2 intro, 4 core, 2 challenge; at most 4 numeric questions and 2 questions per topic.",
    "separation": "Keep separate from Lecture 1 (Bank 0) and the full Weeks 1–2 review. Progress key: statistical-inference-2026-practice-lecture-2.",
    "proofQuestions": "Each proof-step has context entries labelled Theorem and Proof so far, including assumptions, notation, and preceding steps before the requested step.",
    "sourceLinks": "Relative slide anchors resolve against the neighbouring deck. Numeric slide references describe the authoring snapshot; verify them after rebuilding or reorganising the deck.",
    "mathematics": "Density questions distinguish densities from point probabilities, specify versions for numerical singleton conditioning, and state almost-everywhere qualifications where needed. Numerical exercises are self-contained; no R is required."
  },
  "sourceCatalog": {
    "lecture-2-slides": {
      "title": "Statistical Inference 2026 — Weeks 1–2, Lecture 2",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../index.html",
      "slideRange": [
        42,
        69
      ],
      "deckSha256": "c5feb4923e0912add52dd3f1d43f7551877fadbe5711672fc800d7660a60d48e",
      "sourceFile": "slides-2026-weeks-1-2/index.qmd",
      "renderedSourceFile": "slides/si-2026/weeks-1-2/index.html",
      "note": "References and scope follow the rendered website snapshot, not the newer source-only slide insertions.",
      "checkedOn": "2026-09-17"
    }
  },
  "exercises": [
    {
      "id": "lec02-001",
      "type": "multiple-choice",
      "topic": "Joint CDFs",
      "difficulty": "intro",
      "prompt": "For a random vector (X,Y), which expression defines its joint cumulative distribution function F(x,y)?",
      "options": [
        {
          "id": "a",
          "text": "P(X≤x or Y≤y)"
        },
        {
          "id": "b",
          "text": "P(X=x and Y=y)"
        },
        {
          "id": "c",
          "text": "P(X≤x and Y≤y)"
        },
        {
          "id": "d",
          "text": "P(X≤x)P(Y≤y), without any assumption of independence"
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "A joint CDF gives the probability that all coordinate inequalities hold simultaneously: F(x,y)=P((X,Y)∈(−∞,x]×(−∞,y]). Factorization into the marginal CDFs for every x,y characterizes independence; it is not the general definition.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 43,
          "anchor": "random-vectors-and-their-joint-cdfs"
        }
      ]
    },
    {
      "id": "lec02-002",
      "type": "numeric-input",
      "topic": "Joint CDFs",
      "difficulty": "core",
      "prompt": "The random vector (X,Y) takes the values (0,0), (0,2), (1,1) and (2,0), each with probability 1/4. Find its joint CDF F(1,1)=P(X≤1,Y≤1).",
      "acceptedAnswers": [
        "0.5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "0.5",
      "explanation": "Exactly (0,0) and (1,1) satisfy both inequalities. Their probabilities add to 1/4+1/4=1/2. The point (0,2) fails the Y inequality and (2,0) fails the X inequality.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 43,
          "anchor": "random-vectors-and-their-joint-cdfs"
        }
      ]
    },
    {
      "id": "lec02-003",
      "type": "multiple-choice",
      "topic": "Joint CDFs",
      "difficulty": "core",
      "prompt": "Let F be the joint CDF of (X,Y). For fixed real numbers x,y and positive hₙ decreasing to zero, what is limₙ F(x−hₙ,y−hₙ)? No continuity assumption is made.",
      "options": [
        {
          "id": "a",
          "text": "P(X≤x,Y≤y), always"
        },
        {
          "id": "b",
          "text": "P(X<x,Y<y)"
        },
        {
          "id": "c",
          "text": "P(X<x,Y≤y), always"
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
      "explanation": "The lower rectangles (−∞,x−hₙ]×(−∞,y−hₙ] increase to (−∞,x)×(−∞,y). Continuity of probability for increasing events gives P(X<x,Y<y), with both inequalities strict. Boundary mass can prevent this from equalling F(x,y).",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 44,
          "anchor": "joint-cdfs-one-sided-limits"
        }
      ]
    },
    {
      "id": "lec02-004",
      "type": "proof-step",
      "topic": "Joint CDFs",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let Z=(X,Y) be a random vector with joint CDF F. Fix z=(x,y), and let S=(−∞,x]×(−∞,y] and S°=(−∞,x)×(−∞,y). If P(Z∈S∖S°)=0, then F is continuous at z."
        },
        {
          "label": "Proof so far",
          "text": "The assumption gives P(Z∈S°)=P(Z∈S)=F(x,y). The one-sided-limit result therefore gives F(x−h,y−h)→F(x,y) and F(x+h,y+h)→F(x,y) as h decreases to zero. We now consider arbitrary (u,v) with |u−x|<h and |v−y|<h; F is nondecreasing in each coordinate."
        }
      ],
      "prompt": "Which bound completes the proof by squeezing F(u,v) between quantities converging to F(x,y)?",
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
          "text": "F(u,v)=F(x,y) for every h>0 and every such (u,v)"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The coordinate inequalities x−h<u<x+h and y−h<v<y+h give the first bound by coordinatewise monotonicity. Both endpoints converge to F(x,y), so for every ε>0 sufficiently small h makes all such F(u,v) lie within ε of F(x,y). This proves continuity in every direction, not just along the diagonal.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 45,
          "anchor": "continuity-of-a-joint-cdf"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 44,
          "anchor": "joint-cdfs-one-sided-limits"
        }
      ]
    },
    {
      "id": "lec02-005",
      "type": "multiple-choice",
      "topic": "Marginal distributions",
      "difficulty": "intro",
      "prompt": "Let F(x,y)=P(X≤x,Y≤y) be a joint CDF. How can the marginal CDF F_X(x)=P(X≤x) be recovered?",
      "options": [
        {
          "id": "a",
          "text": "F_X(x)=F(x,0) for every joint distribution"
        },
        {
          "id": "b",
          "text": "F_X(x)=lim as y→−∞ of F(x,y)"
        },
        {
          "id": "c",
          "text": "F_X(x)=F(x,x) for every joint distribution"
        },
        {
          "id": "d",
          "text": "F_X(x)=lim as y→+∞ of F(x,y)"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Because Y is real-valued, the union of the events {Y≤n} over positive integers n is Ω. Thus {X≤x,Y≤n} increases to {X≤x}, and continuity of probability gives the stated limit. Monotonicity extends this to y→+∞. Fixing y at 0 or x can still exclude outcomes.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 46,
          "anchor": "marginal-distributions"
        }
      ]
    },
    {
      "id": "lec02-006",
      "type": "numeric-input",
      "topic": "Conditional probability",
      "difficulty": "intro",
      "prompt": "Events A and B satisfy P(B)=0.4 and P(A∩B)=0.1. What is P(A|B)?",
      "acceptedAnswers": [
        "0.25",
        "1/4",
        "25%"
      ],
      "correctAnswer": "0.25",
      "explanation": "Since P(B)>0, the definition gives P(A|B)=P(A∩B)/P(B)=0.1/0.4=0.25. No independence assumption is needed.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 47,
          "anchor": "conditional-probability"
        }
      ]
    },
    {
      "id": "lec02-007",
      "type": "find-the-intruder",
      "topic": "Conditional probability",
      "difficulty": "core",
      "prompt": "Let A and B be events with P(A)>0 and P(B)>0. Which identity is NOT guaranteed by the definition of conditional probability? Here Ω denotes the entire sample space.",
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
      "explanation": "The two conditional probabilities divide the same intersection probability by different denominators: P(B) and P(A). For example, if A⊂B with P(A)=1/4 and P(B)=1/2, then P(A|B)=1/2 but P(B|A)=1. The other three identities follow directly from the definition.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 47,
          "anchor": "conditional-probability"
        }
      ]
    },
    {
      "id": "lec02-008",
      "type": "multiple-choice",
      "topic": "Event independence",
      "difficulty": "intro",
      "prompt": "If an event B has P(B)=0, which statement about B and an arbitrary event A is always true? Use independence in the sense P(A∩B)=P(A)P(B).",
      "options": [
        {
          "id": "a",
          "text": "A and B are independent only when A∩B is empty."
        },
        {
          "id": "b",
          "text": "A and B cannot be independent because P(A|B) is undefined by the ratio formula."
        },
        {
          "id": "c",
          "text": "A and B are independent because both P(A∩B) and P(A)P(B) equal zero."
        },
        {
          "id": "d",
          "text": "A and B are independent only when P(A)=0."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Since A∩B⊆B, its probability is zero. The product P(A)P(B) is also zero, so the defining equality holds for every A. The ratio P(A∩B)/P(B) is undefined here, but independence does not require that ratio.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 48,
          "anchor": "independent-events"
        }
      ]
    },
    {
      "id": "lec02-009",
      "type": "numeric-input",
      "topic": "Event independence",
      "difficulty": "core",
      "prompt": "Events A and B are independent, with P(A)=0.6 and P(B)=0.25. Find P(A∩B).",
      "acceptedAnswers": [
        "0.15",
        "3/20",
        "15%"
      ],
      "correctAnswer": "0.15",
      "explanation": "Independence means P(A∩B)=P(A)P(B), so the answer is 0.6×0.25=0.15. This multiplication rule would not follow from the two marginal probabilities alone.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 48,
          "anchor": "independent-events"
        }
      ]
    },
    {
      "id": "lec02-010",
      "type": "proof-step",
      "topic": "Event independence",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "Let A,B be events with 0<P(B)<1, and write Bᶜ=Ω∖B. If P(A|B)=P(A|Bᶜ), then A and B are independent, meaning P(A∩B)=P(A)P(B)."
        },
        {
          "label": "Proof so far",
          "text": "Let α=P(A|B)=P(A|Bᶜ). The disjoint decomposition A=(A∩B)∪(A∩Bᶜ) and the conditional-probability formula give P(A)=αP(B)+αP(Bᶜ). Also P(A∩B)=αP(B)."
        }
      ],
      "prompt": "Which next step proves the desired independence?",
      "options": [
        {
          "id": "a",
          "text": "P(B)+P(Bᶜ)=0, so P(A)=0."
        },
        {
          "id": "b",
          "text": "B and Bᶜ are independent because they are disjoint."
        },
        {
          "id": "c",
          "text": "The equality of conditional probabilities forces P(B)=1/2."
        },
        {
          "id": "d",
          "text": "P(B)+P(Bᶜ)=1, so P(A)=α and P(A∩B)=P(A)P(B)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "The two probabilities P(B) and P(Bᶜ) sum to one. Therefore the displayed weighted sum is α, and substituting α=P(A) into P(A∩B)=αP(B) gives independence. Both conditional probabilities are defined because 0<P(B)<1.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 49,
          "anchor": "an-independence-criterion"
        }
      ]
    },
    {
      "id": "lec02-011",
      "type": "numeric-input",
      "topic": "Conditional probability",
      "difficulty": "core",
      "prompt": "Roll one fair six-sided die with outcomes {1,2,3,4,5,6}. Let A={2,4,6} and C={1,2,3}. Given that C occurred, what is the probability of A?",
      "acceptedAnswers": [
        "1/3",
        "0.3333333333333333"
      ],
      "correctAnswer": "1/3",
      "explanation": "A∩C={2}, so P(A∩C)=1/6 and P(C)=3/6. Consequently P(A|C)=(1/6)/(3/6)=1/3. Only one of the three equally likely remaining outcomes is even.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 50,
          "anchor": "a-die-independence-and-dependence"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 47,
          "anchor": "conditional-probability"
        }
      ]
    },
    {
      "id": "lec02-012",
      "type": "find-the-intruder",
      "topic": "Event independence",
      "difficulty": "core",
      "prompt": "Roll one fair six-sided die and let A={2,4,6}. Which event is NOT independent of A?",
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
      "explanation": "Each two-element option contains one even outcome: its intersection with A has probability 1/6=(1/2)(1/3), so it is independent of A. For {1,2,3}, the intersection still has probability 1/6, but the product is (1/2)(1/2)=1/4, so independence fails.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 50,
          "anchor": "a-die-independence-and-dependence"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 48,
          "anchor": "independent-events"
        }
      ]
    },
    {
      "id": "lec02-013",
      "type": "numeric-input",
      "topic": "Event independence",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Setup",
          "text": "Use the uniform probability measure on Ω=[0,1]: every interval [a,b] has probability b−a. Let I=[0,1/3] and J=[1/8,b], where 1/3<b≤1. Independence means P(I∩J)=P(I)P(J)."
        }
      ],
      "prompt": "What value of b makes I and J independent?",
      "acceptedAnswers": [
        "0.75",
        "3/4",
        "75%"
      ],
      "correctAnswer": "0.75",
      "explanation": "The overlap has length 1/3−1/8=5/24. The product of the event probabilities is (1/3)(b−1/8). Equating them gives b−1/8=5/8, hence b=3/4. This value satisfies the required range 1/3<b≤1.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 51,
          "anchor": "independence-of-intervals"
        }
      ]
    },
    {
      "id": "lec02-014",
      "type": "multiple-choice",
      "topic": "Joint CDFs",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Setup",
          "text": "The random vector (X,Y) equals (0,−1) with probability 1/2 and (1,1) with probability 1/2. Its joint CDF is F(x,y)=P(X≤x,Y≤y). Notice that P((X,Y)=(0,0))=0."
        }
      ],
      "prompt": "Is F continuous at (0,0)?",
      "options": [
        {
          "id": "a",
          "text": "Yes: zero probability at the single point (0,0) guarantees continuity there."
        },
        {
          "id": "b",
          "text": "No: F(0,0)=1/2, whereas F(−h,0)=0 for every h>0."
        },
        {
          "id": "c",
          "text": "Yes: any joint CDF is continuous at points where its value is strictly between 0 and 1."
        },
        {
          "id": "d",
          "text": "No: discontinuity requires P((X,Y)=(0,0))>0, and here that probability is 1/2."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "The atom (0,−1) is included when x=0,y=0, but excluded whenever x<0. Thus F(−h,0)=0 does not converge to F(0,0)=1/2 as h decreases to zero. The relevant boundary of (−∞,0]×(−∞,0] contains (0,−1); it is not merely the single point (0,0).",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 45,
          "anchor": "continuity-of-a-joint-cdf"
        }
      ]
    },
    {
      "id": "lec02-015",
      "type": "multiple-choice",
      "topic": "Observed events",
      "difficulty": "intro",
      "prompt": "For a real random variable X on a probability space (Ω,F,P), what is σ(X)?",
      "options": [
        {
          "id": "a",
          "text": "The collection of all subsets of the real line"
        },
        {
          "id": "b",
          "text": "The smallest σ-algebra on Ω making X measurable"
        },
        {
          "id": "c",
          "text": "The set of all real values that X can take"
        },
        {
          "id": "d",
          "text": "The collection containing only events of positive probability"
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "σ(X) is the σ-algebra of events determined by observing X. Its members are X⁻¹(B)={ω∈Ω:X(ω)∈B}, with B a Borel subset of the real line. It is a collection of subsets of Ω, not a collection of possible values of X.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 52,
          "anchor": "the-sigma-algebra-generated-by-random-variables"
        }
      ]
    },
    {
      "id": "lec02-016",
      "type": "find-the-intruder",
      "topic": "Observed events",
      "difficulty": "core",
      "context": [
        {
          "label": "Observation",
          "text": "Let Ω=[0,1]. Define X(ω)=1 for 0≤ω<1/2 and X(ω)=2 for 1/2≤ω≤1. The events in σ(X) are the inverse images X⁻¹(B), where B is a Borel subset of the real line."
        }
      ],
      "prompt": "Which event does NOT belong to σ(X)?",
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
      "explanation": "An inverse image under X must include either all or none of each level set [0,1/2) and [1/2,1]. The singleton {1/2} cuts the second level set and cannot be determined from X. The four possible events are ∅, the two level sets, and Ω.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 53,
          "anchor": "example-the-events-determined-by-an-observation"
        }
      ]
    },
    {
      "id": "lec02-017",
      "type": "multiple-choice",
      "topic": "Independence criteria",
      "difficulty": "intro",
      "context": [
        {
          "label": "Notation",
          "text": "For real random variables X₁,X₂,…, σ(Xᵢ) is the σ-algebra generated by Xᵢ. A finite set I of distinct indices picks a finite subfamily of these variables."
        }
      ],
      "prompt": "Which requirement defines independence of the entire sequence X₁,X₂,…?",
      "options": [
        {
          "id": "a",
          "text": "For every finite nonempty I and every choice Aᵢ∈σ(Xᵢ), the probability of the intersection of the Aᵢ, i∈I, equals the product of their probabilities."
        },
        {
          "id": "b",
          "text": "The same factorization holds only when I has exactly two indices."
        },
        {
          "id": "c",
          "text": "The same factorization holds for at least one choice of events for each I."
        },
        {
          "id": "d",
          "text": "Every variable has the same distribution."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Independence requires the product rule for every finite subfamily and every choice of one event from each corresponding σ-algebra. Testing only pairs gives pairwise independence, a weaker property. Equal distributions do not imply independence.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 54,
          "anchor": "independence-of-classes-and-sequences"
        }
      ]
    },
    {
      "id": "lec02-018",
      "type": "proof-step",
      "topic": "Independence criteria",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X₁,…,Xₙ be independent real random variables, with n≥2. Write F(x₁,…,xₙ)=P(X₁≤x₁,…,Xₙ≤xₙ) and Fᵢ(xᵢ)=P(Xᵢ≤xᵢ). Then F(x₁,…,xₙ)=∏ᵢ₌₁ⁿ Fᵢ(xᵢ) for every real x₁,…,xₙ."
        },
        {
          "label": "Proof so far",
          "text": "Fix real x₁,…,xₙ and set Aᵢ={Xᵢ≤xᵢ}. The half-line (−∞,xᵢ] is Borel, so Aᵢ belongs to σ(Xᵢ). By the definition of the joint CDF, F(x₁,…,xₙ)=P(A₁∩⋯∩Aₙ)."
        }
      ],
      "prompt": "Which next step completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "The Aᵢ are disjoint, so P(A₁∩⋯∩Aₙ)=∑ᵢ₌₁ⁿ P(Aᵢ)."
        },
        {
          "id": "b",
          "text": "All Aᵢ have equal probabilities, so the intersection has that common probability."
        },
        {
          "id": "c",
          "text": "Right-continuity of each marginal CDF makes the probability of every intersection a product."
        },
        {
          "id": "d",
          "text": "Independence of σ(X₁),…,σ(Xₙ) gives P(A₁∩⋯∩Aₙ)=∏ᵢ₌₁ⁿ P(Aᵢ)=∏ᵢ₌₁ⁿ Fᵢ(xᵢ)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "Each Aᵢ comes from its corresponding σ-algebra, so independence applies directly. Independence does not mean disjointness or equal marginal distributions; right-continuity alone gives no product rule.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 55,
          "anchor": "independence-and-joint-cdfs"
        }
      ]
    },
    {
      "id": "lec02-019",
      "type": "multiple-choice",
      "topic": "Independence criteria",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Experiment",
          "text": "Toss two independent fair coins. Let X and Y record their outcomes in {H,T}. Define Z=H when X=Y and Z=T when X≠Y. The four outcomes HH, HT, TH, TT for (X,Y) each have probability 1/4."
        }
      ],
      "prompt": "Which statement about X, Y and Z is correct?",
      "options": [
        {
          "id": "a",
          "text": "They are mutually independent because every pair is independent."
        },
        {
          "id": "b",
          "text": "Every pair is independent, but the three variables are not mutually independent."
        },
        {
          "id": "c",
          "text": "X and Z are dependent because Z uses X in its definition."
        },
        {
          "id": "d",
          "text": "Y and Z are dependent because P(Y=H,Z=H)=0."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "For each pair, all four possible pairs of values have probability 1/4, equal to the product of the marginals. But P(X=H,Y=H,Z=H)=1/4, whereas P(X=H)P(Y=H)P(Z=H)=1/8. Thus pairwise independence does not imply mutual independence.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 56,
          "anchor": "pairwise-and-mutual-independence"
        }
      ]
    },
    {
      "id": "lec02-020",
      "type": "proof-step",
      "topic": "Independence criteria",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X₁,…,Xₙ be real random variables. Suppose that P(X₁∈B₁,…,Xₙ∈Bₙ)=∏ᵢ₌₁ⁿ P(Xᵢ∈Bᵢ) for all Borel sets B₁,…,Bₙ⊆ℝ. Then X₁,…,Xₙ are independent: for every nonempty I⊆{1,…,n} and all Aᵢ∈σ(Xᵢ), i∈I, the probability of their intersection equals the product of their probabilities."
        },
        {
          "label": "Proof so far",
          "text": "Choose a nonempty I⊆{1,…,n} and events Aᵢ∈σ(Xᵢ) for i∈I. For each such i, the description σ(Xᵢ)={Xᵢ⁻¹(B): B is Borel} gives a Borel set Bᵢ with Aᵢ={Xᵢ∈Bᵢ}. We want to apply the assumed n-coordinate factorization without placing extra restrictions on indices outside I."
        }
      ],
      "prompt": "How should we choose Bᵢ for the omitted indices i∉I?",
      "options": [
        {
          "id": "a",
          "text": "Take Bᵢ=∅, since omitted coordinates should contribute nothing."
        },
        {
          "id": "b",
          "text": "Take Bᵢ={0}, since a fixed coordinate does not change an intersection."
        },
        {
          "id": "c",
          "text": "Take Bᵢ=ℝ, since {Xᵢ∈ℝ}=Ω and P(Xᵢ∈ℝ)=1."
        },
        {
          "id": "d",
          "text": "Take Bᵢ=(−∞,0], since any half-line has probability one."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Using ℝ leaves the event intersection unchanged and contributes a factor of one. The assumed rectangle factorization then gives the product rule for the chosen events Aᵢ, i∈I. Since I and the events were arbitrary, this is independence of the generated σ-algebras.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 55,
          "anchor": "independence-and-joint-cdfs"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 52,
          "anchor": "the-sigma-algebra-generated-by-random-variables"
        }
      ]
    },
    {
      "id": "lec02-021",
      "type": "numeric-input",
      "topic": "Discrete joint laws",
      "difficulty": "intro",
      "context": [
        {
          "label": "Joint PMF",
          "text": "X,Y take values in {0,1}. Their joint probability mass function p(x,y)=P(X=x,Y=y) is:\np(0,0)=0.10, p(0,1)=0.20,\np(1,0)=0.30, p(1,1)=0.40.\nAll other pairs have probability zero."
        }
      ],
      "prompt": "What is P(X=Y)?",
      "acceptedAnswers": [
        "0.5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "0.5",
      "explanation": "The event {X=Y} is the disjoint union of the outcomes (0,0) and (1,1). Add their masses: 0.10+0.40=0.50.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 57,
          "anchor": "joint-probability-mass-functions"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 61,
          "anchor": "one-joint-pmf-marginals-conditioning-independence"
        }
      ]
    },
    {
      "id": "lec02-022",
      "type": "numeric-input",
      "topic": "Discrete joint laws",
      "difficulty": "core",
      "context": [
        {
          "label": "Joint PMF",
          "text": "X,Y take values in {0,1}. Their joint probability mass function p(x,y)=P(X=x,Y=y) is:\np(0,0)=0.10, p(0,1)=0.20,\np(1,0)=0.30, p(1,1)=0.40.\nAll other pairs have probability zero."
        }
      ],
      "prompt": "Find the marginal probability p_Y(1)=P(Y=1).",
      "acceptedAnswers": [
        "0.6",
        "3/5",
        "60%"
      ],
      "correctAnswer": "0.6",
      "explanation": "Keep Y=1 fixed and sum over all values of X: p_Y(1)=p(0,1)+p(1,1)=0.20+0.40=0.60. A marginal uses all entries in the relevant column, not a single joint mass.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 58,
          "anchor": "marginal-probability-mass-functions"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 61,
          "anchor": "one-joint-pmf-marginals-conditioning-independence"
        }
      ]
    },
    {
      "id": "lec02-023",
      "type": "numeric-input",
      "topic": "Conditional PMFs",
      "difficulty": "core",
      "context": [
        {
          "label": "Joint PMF",
          "text": "X,Y take values in {0,1}. Their joint probability mass function p(x,y)=P(X=x,Y=y) is:\np(0,0)=0.10, p(0,1)=0.20,\np(1,0)=0.30, p(1,1)=0.40.\nAll other pairs have probability zero."
        }
      ],
      "prompt": "What is P(X=1 | Y=0)?",
      "acceptedAnswers": [
        "0.75",
        "3/4",
        "75%"
      ],
      "correctAnswer": "0.75",
      "explanation": "The conditioning event has probability P(Y=0)=0.10+0.30=0.40>0. Thus P(X=1 | Y=0)=p(1,0)/P(Y=0)=0.30/0.40=0.75. The denominator must correspond to the variable being conditioned on.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 59,
          "anchor": "conditional-probability-mass-functions"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 61,
          "anchor": "one-joint-pmf-marginals-conditioning-independence"
        }
      ]
    },
    {
      "id": "lec02-024",
      "type": "multiple-choice",
      "topic": "Conditional PMFs",
      "difficulty": "core",
      "context": [
        {
          "label": "Definition in the lecture",
          "text": "For discrete X,Y and a value x with p_X(x)>0, the conditional PMF is p_{Y|X}(y|x)=p_{X,Y}(x,y)/p_X(x)."
        }
      ],
      "prompt": "Suppose p_X(2)=0. What does this ratio definition tell us about the conditional PMF given X=2?",
      "options": [
        {
          "id": "a",
          "text": "It is the function that is zero at every y."
        },
        {
          "id": "b",
          "text": "It must equal the unconditional PMF of Y."
        },
        {
          "id": "c",
          "text": "It is the function that is one at every y."
        },
        {
          "id": "d",
          "text": "The ratio definition does not define it, because its denominator is zero."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "The lecture's discrete conditional-PMF formula requires a strictly positive conditioning probability. When p_X(2)=0, every joint mass p_{X,Y}(2,y) is also zero, producing the undefined ratio 0/0. This formula gives no uniquely determined conditional PMF there.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 59,
          "anchor": "conditional-probability-mass-functions"
        }
      ]
    },
    {
      "id": "lec02-025",
      "type": "proof-step",
      "topic": "Discrete joint laws",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X,Y be real random variables with P(X∈D_X)=P(Y∈D_Y)=1 for countable sets D_X,D_Y. Define p_X(x)=P(X=x) and p_{X,Y}(x,y)=P(X=x,Y=y). Then p_X(x)=∑_{y∈D_Y} p_{X,Y}(x,y) for every x∈D_X."
        },
        {
          "label": "Proof so far",
          "text": "Fix x∈D_X. For y∈D_Y, let A_y={X=x,Y=y}. These events are pairwise disjoint, and their union is {X=x,Y∈D_Y}. Its probability is p_X(x), since P(Y∈D_Y)=1."
        }
      ],
      "prompt": "Which probability axiom yields the required marginal identity?",
      "options": [
        {
          "id": "a",
          "text": "Countable additivity: the probability of the disjoint union is ∑_{y∈D_Y} P(A_y)."
        },
        {
          "id": "b",
          "text": "Independence: the probability of the union is ∏_{y∈D_Y} P(A_y)."
        },
        {
          "id": "c",
          "text": "Complementation: P(X=x)=1−P(Y∈D_Y)."
        },
        {
          "id": "d",
          "text": "Normalization: every joint mass P(A_y) must equal one."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Countable additivity applies because D_Y is countable and the events A_y are disjoint. It gives p_X(x)=∑_{y∈D_Y}P(X=x,Y=y), which is the row-sum formula. No independence assumption is used.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 58,
          "anchor": "marginal-probability-mass-functions"
        }
      ]
    },
    {
      "id": "lec02-026",
      "type": "multiple-choice",
      "topic": "Discrete independence",
      "difficulty": "core",
      "context": [
        {
          "label": "Joint PMF",
          "text": "X,Y take values in {0,1}. Their joint probability mass function is p(0,0)=0.10, p(0,1)=0.20, p(1,0)=0.30 and p(1,1)=0.40, with zero mass elsewhere. Its marginals satisfy p_X(0)=0.30 and p_Y(0)=0.40."
        }
      ],
      "prompt": "Which argument correctly determines whether X and Y are independent?",
      "options": [
        {
          "id": "a",
          "text": "They are independent because the four masses sum to one."
        },
        {
          "id": "b",
          "text": "They are independent because every pair of possible values has positive mass."
        },
        {
          "id": "c",
          "text": "They are not independent because p(0,0)=0.10 differs from p_X(0)p_Y(0)=0.12."
        },
        {
          "id": "d",
          "text": "They are not independent merely because p_X(0) differs from p_Y(0)."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Independence requires p(x,y)=p_X(x)p_Y(y) at every pair. One failed equality suffices to disprove it. Normalization and positive entries do not imply independence; independent variables need not have the same marginal distribution.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 60,
          "anchor": "independence-and-pmf-factorization"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 61,
          "anchor": "one-joint-pmf-marginals-conditioning-independence"
        }
      ]
    },
    {
      "id": "lec02-027",
      "type": "proof-step",
      "topic": "Discrete independence",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X,Y be real random variables supported on countable sets D_X,D_Y, with joint PMF p_{X,Y} and marginal PMFs p_X,p_Y. If p_{X,Y}(x,y)=p_X(x)p_Y(y) for every x∈D_X and y∈D_Y, then X and Y are independent."
        },
        {
          "label": "Proof so far",
          "text": "Choose arbitrary Borel sets A,B⊆ℝ. Countable additivity and the assumed factorization give P(X∈A,Y∈B)=∑_{x∈A∩D_X}∑_{y∈B∩D_Y}p_X(x)p_Y(y). The terms are nonnegative; for each fixed x, p_X(x) is constant in the inner sum."
        }
      ],
      "prompt": "Which evaluation of this double sum proves the theorem?",
      "options": [
        {
          "id": "a",
          "text": "It equals P(X∈A)+P(Y∈B), because there are two sums."
        },
        {
          "id": "b",
          "text": "It equals (∑_{x∈A∩D_X}p_X(x))(∑_{y∈B∩D_Y}p_Y(y))=P(X∈A)P(Y∈B)."
        },
        {
          "id": "c",
          "text": "It equals one for all A,B, because the full joint PMF sums to one."
        },
        {
          "id": "d",
          "text": "It equals P(X∈A∩B), because the two index sets can be replaced by their intersection."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "Pull p_X(x) out of each inner sum, then factor out the common sum over y. The two remaining sums are the marginal probabilities of A and B. The resulting product equality holds for all Borel A,B, which is the rectangle criterion for independence.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 60,
          "anchor": "independence-and-pmf-factorization"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 55,
          "anchor": "independence-and-joint-cdfs"
        }
      ]
    },
    {
      "id": "lec02-028",
      "type": "multiple-choice",
      "topic": "Joint densities",
      "difficulty": "intro",
      "prompt": "Let f(x,y)=4 on the square 0<x<1/2, 0<y<1/2, and f(x,y)=0 elsewhere. The square has area 1/4. Can f be a joint probability density?",
      "options": [
        {
          "id": "a",
          "text": "No: a probability density must be at most 1 at every point."
        },
        {
          "id": "b",
          "text": "Yes: f is measurable, nonnegative, and its integral is 4×(1/4)=1."
        },
        {
          "id": "c",
          "text": "No: every joint density must be positive on all of ℝ²."
        },
        {
          "id": "d",
          "text": "Yes: its value 4 means that every point of the square has probability 4."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "A density assigns probabilities by integration over sets, not by its value at a point. Its values may exceed 1. Here the total integral is 1, so f defines a probability distribution; every singleton still has probability zero.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 62,
          "anchor": "joint-probability-density-functions"
        }
      ]
    },
    {
      "id": "lec02-029",
      "type": "find-the-intruder",
      "topic": "Joint densities",
      "difficulty": "core",
      "prompt": "Each function below is zero outside its stated region. Which one is NOT a joint probability density? The triangle 0<y<x<1 has area 1/2.",
      "options": [
        {
          "id": "a",
          "text": "f=1 on the unit square 0<x<1, 0<y<1."
        },
        {
          "id": "b",
          "text": "f=2 on the rectangle 0<x<1/2, 0<y<1."
        },
        {
          "id": "c",
          "text": "f=2 on the triangle 0<y<x<1."
        },
        {
          "id": "d",
          "text": "f=1/2 on the unit square 0<x<1, 0<y<1."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "All four functions are measurable and nonnegative. Their total integrals are respectively 1, 1, 1 and 1/2. Only the last function fails the requirement that the total probability equal 1.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 62,
          "anchor": "joint-probability-density-functions"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 67,
          "anchor": "example-a-density-on-a-triangle"
        }
      ]
    },
    {
      "id": "lec02-030",
      "type": "proof-step",
      "topic": "Joint densities",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X be uniform on (0,1) and let Y=X. Although both marginal distributions have densities, the pair (X,Y) has no joint density with respect to two-dimensional Lebesgue measure (ordinary area)."
        },
        {
          "label": "Proof so far",
          "text": "Both X and Y are uniform on (0,1), so their marginal densities are 1 on (0,1) and 0 elsewhere. Suppose, for a contradiction, that (X,Y) has a joint density f. Let D={(x,y)∈ℝ²:x=y}. The diagonal D has area zero, while P((X,Y)∈D)=1 because Y=X. The integral of a nonnegative measurable function over an area-zero set is zero."
        }
      ],
      "prompt": "Which next step gives the contradiction?",
      "options": [
        {
          "id": "a",
          "text": "The density formula gives 1=P((X,Y)∈D)=∬D f(x,y) dx dy=0."
        },
        {
          "id": "b",
          "text": "Since D has area zero, it must be the empty set."
        },
        {
          "id": "c",
          "text": "Since X and Y have densities, P(X=Y)=0 even when Y=X."
        },
        {
          "id": "d",
          "text": "The marginal density of X integrates to 0 because X=Y."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A joint density would force every area-zero Borel set, including D, to have probability zero. But this distribution places all its probability on D. Absolutely continuous marginals therefore do not guarantee an absolutely continuous joint distribution.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 62,
          "anchor": "joint-probability-density-functions"
        }
      ]
    },
    {
      "id": "lec02-031",
      "type": "multiple-choice",
      "topic": "Marginal and conditional densities",
      "difficulty": "intro",
      "prompt": "A pair (X,Y) has joint density f(x,y). Which formula gives a marginal density f_X of X, with equality almost everywhere (that is, except possibly on a set of length zero)?",
      "options": [
        {
          "id": "a",
          "text": "f_X(x)=f(x,x)."
        },
        {
          "id": "b",
          "text": "f_X(x)=∫ℝ f(x,y) dx, integrating out x."
        },
        {
          "id": "c",
          "text": "f_X(x)=∫ℝ f(x,y) dy, integrating out y."
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
      "explanation": "To retain the coordinate x, integrate over the other coordinate y. The integral over x instead gives a function of y, namely a marginal density of Y. A density value is not a singleton probability.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 63,
          "anchor": "marginal-probability-density-functions"
        }
      ]
    },
    {
      "id": "lec02-032",
      "type": "numeric-input",
      "topic": "Marginal and conditional densities",
      "difficulty": "core",
      "prompt": "Let f(x,y)=2 for 0<y<x<1 and 0 elsewhere. Choose the marginal density f_Y(y)=∫ℝ f(x,y) dx. What is f_Y(1/4)?",
      "acceptedAnswers": [
        "1.5",
        "3/2"
      ],
      "correctAnswer": "1.5",
      "explanation": "At y=1/4, the allowed x-values run from 1/4 to 1. Thus f_Y(1/4)=∫(1/4 to 1) 2 dx=2×(3/4)=3/2. This is a density value, so being greater than 1 is allowed.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 63,
          "anchor": "marginal-probability-density-functions"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 67,
          "anchor": "example-a-density-on-a-triangle"
        }
      ]
    },
    {
      "id": "lec02-033",
      "type": "multiple-choice",
      "topic": "Marginal and conditional densities",
      "difficulty": "intro",
      "prompt": "Let f be a joint density and choose f_X(x)=∫ℝ f(x,y) dy. Fix x with 0<f_X(x)<∞. Which formula defines the lecture's version of the conditional density of Y given X=x?",
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
          "text": "f_{Y|X}(y|x)=f(x,y)/f_Y(y), with no condition on f_Y(y)."
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
      "explanation": "Dividing the joint density by the positive finite marginal density normalizes the y-section to have integral 1. This is not division by P(X=x): that singleton probability is zero for an absolutely continuous marginal distribution.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 64,
          "anchor": "conditional-probability-density-functions"
        }
      ]
    },
    {
      "id": "lec02-034",
      "type": "numeric-input",
      "topic": "Marginal and conditional densities",
      "difficulty": "core",
      "prompt": "For the joint density f(x,y)=2 on 0<y<x<1 (zero elsewhere), use the conditional-density version f_{Y|X}(y|x)=1/x on 0<y<x and zero elsewhere. What probability does this version assign to Y<1/4 given X=1/2?",
      "acceptedAnswers": [
        "0.5",
        "1/2"
      ],
      "correctAnswer": "0.5",
      "explanation": "At x=1/2 the stated conditional density is 2 on (0,1/2). Integrating it from 0 to 1/4 gives 2×(1/4)=1/2. We explicitly fixed a version because conditioning on a particular point of a continuous variable is not defined by elementary event-probability ratios.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 64,
          "anchor": "conditional-probability-density-functions"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 67,
          "anchor": "example-a-density-on-a-triangle"
        }
      ]
    },
    {
      "id": "lec02-035",
      "type": "proof-step",
      "topic": "Marginal and conditional densities",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let f be a joint density of (X,Y), let f_X(x)=∫ℝ f(x,y) dy, and let P_X be the distribution of X. Set D={x:0<f_X(x)<∞}. For x∈D put q(y|x)=f(x,y)/f_X(x); outside D use any one fixed probability density. Then, for all Borel sets A,B⊆ℝ, P(X∈A,Y∈B)=∫A [∫B q(y|x) dy] dP_X(x)."
        },
        {
          "label": "Proof so far",
          "text": "The marginal density f_X has integral 1. Its zero set has P_X-probability zero. Its infinite set has length zero by integrability and therefore also P_X-probability zero. Hence P_X(D)=1. On D we have q(y|x)f_X(x)=f(x,y). We now evaluate I=∫A [∫B q(y|x) dy] dP_X(x). For a nonnegative measurable h, integration against the marginal density gives ∫h(x) dP_X(x)=∫h(x)f_X(x) dx."
        }
      ],
      "prompt": "Which expression equals I and completes the main substitution?",
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
          "text": "I=P_X(A)P(Y∈B), without any independence assumption."
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
      "explanation": "Restrict to D because its complement has P_X-probability zero. Replacing dP_X(x) by f_X(x) dx then cancels the denominator in q. The omitted part of A outside D has joint probability at most P_X(Dᶜ)=0, so the resulting integral equals P(X∈A,Y∈B). No independence is required.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 65,
          "anchor": "conditional-distributions-from-densities"
        }
      ]
    },
    {
      "id": "lec02-036",
      "type": "multiple-choice",
      "topic": "Density factorization and independence",
      "difficulty": "challenge",
      "prompt": "Let f(x,y)=1 on (0,1)² and 0 elsewhere, a joint density of two independent uniform variables. Define g=f except that g(1/2,1/2)=7. A singleton has area zero. What is correct about the probability distribution defined by g? Here 'almost everywhere' means outside a set of area zero.",
      "options": [
        {
          "id": "a",
          "text": "Its coordinates are dependent because the density no longer factorizes at (1/2,1/2)."
        },
        {
          "id": "b",
          "text": "It is not a probability distribution because the density exceeds 1."
        },
        {
          "id": "c",
          "text": "It is the same distribution as f, and its coordinates remain independent: almost-everywhere factorization is sufficient."
        },
        {
          "id": "d",
          "text": "Its total probability is 7 because g(1/2,1/2)=7."
        }
      ],
      "acceptedAnswers": [
        "c"
      ],
      "correctAnswer": "c",
      "explanation": "Changing a density on an area-zero set changes none of its integrals over Borel sets. Thus g defines exactly the same joint distribution as f. Independence is a property of that distribution, and the density-factorization criterion requires equality almost everywhere, not at every point.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 66,
          "anchor": "independence-and-density-factorization"
        }
      ]
    },
    {
      "id": "lec02-037",
      "type": "proof-step",
      "topic": "Density factorization and independence",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "If (X,Y) has a joint density f and marginal densities f_X,f_Y satisfying f(x,y)=f_X(x)f_Y(y) outside a set of area zero, then X and Y are independent. Independence means P(X∈A,Y∈B)=P(X∈A)P(Y∈B) for every pair of Borel sets A,B⊆ℝ."
        },
        {
          "label": "Proof so far",
          "text": "Fix arbitrary Borel sets A,B. The joint-density formula and almost-everywhere equality give P(X∈A,Y∈B)=∫A∫B f_X(x)f_Y(y) dy dx. Tonelli's theorem permits iterated integration of a nonnegative measurable function. In the inner integral, f_X(x) is constant with respect to y."
        }
      ],
      "prompt": "Which next line establishes independence?",
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
          "text": "P(X∈A,Y∈B)=1 because each marginal density has total integral 1."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Separate the integral of the product into the product of the two marginal integrals. Each marginal integral is the corresponding event probability. Since A and B were arbitrary, the defining condition for independence holds.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 66,
          "anchor": "independence-and-density-factorization"
        }
      ]
    },
    {
      "id": "lec02-038",
      "type": "multiple-choice",
      "topic": "Density factorization and independence",
      "difficulty": "core",
      "prompt": "Let f(x,y)=2 on 0<y<x<1 and 0 elsewhere. Its marginal densities are f_X(x)=2x and f_Y(y)=2(1−y) on (0,1), zero elsewhere. Put A={X<1/4} and B={Y>3/4}. Which argument correctly proves that X and Y are not independent?",
      "options": [
        {
          "id": "a",
          "text": "They are dependent simply because their marginal densities differ."
        },
        {
          "id": "b",
          "text": "They are dependent because a joint density can never represent independent variables."
        },
        {
          "id": "c",
          "text": "A and B are disjoint, so their individual probabilities must both be zero."
        },
        {
          "id": "d",
          "text": "P(A∩B)=0 since Y<X almost surely, but P(A)>0 and P(B)>0, so P(A∩B)≠P(A)P(B)."
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "The inequalities X<1/4 and Y>3/4 cannot both hold where y<x, so the intersection has probability zero. The marginal formulas give P(A)=∫(0 to 1/4) 2x dx=1/16 and P(B)=∫(3/4 to 1) 2(1−y) dy=1/16. Their product is positive, contradicting independence.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 66,
          "anchor": "independence-and-density-factorization"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 67,
          "anchor": "example-a-density-on-a-triangle"
        }
      ]
    },
    {
      "id": "lec02-039",
      "type": "numeric-input",
      "topic": "Bayes' formula",
      "difficulty": "core",
      "prompt": "In the worksheet's hypothetical probability model, H means hypertension and D means regular alcohol consumption. Suppose P(H)=0.05, P(D|H)=0.75 and P(D|Hᶜ)=0.50, where Hᶜ is the complement of H. Using the given total probability P(D)=0.75×0.05+0.50×0.95=0.5125, find P(H|D). You may enter a fraction.",
      "acceptedAnswers": [
        "3/41",
        "0.07317073170731707"
      ],
      "correctAnswer": "3/41",
      "explanation": "Bayes' formula gives P(H|D)=P(D|H)P(H)/P(D)=(0.75×0.05)/0.5125=3/41, about 0.07317. Reversing the condition does not preserve the conditional probability. These are the worksheet's stipulated probabilities, not an empirical medical claim.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 68,
          "anchor": "bayes-formula"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 69,
          "anchor": "worksheet-1"
        }
      ]
    },
    {
      "id": "lec02-040",
      "type": "proof-step",
      "topic": "Bayes' formula",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let A,B be events with P(B)=p, where 0<p<1. Write a=P(A|B) and b=P(A|Bᶜ), where Bᶜ is the complement of B. If ap+b(1−p)>0, then P(B|A)=ap/[ap+b(1−p)]."
        },
        {
          "label": "Proof so far",
          "text": "By the definition of conditional probability, P(A∩B)=ap and P(A∩Bᶜ)=b(1−p). The events A∩B and A∩Bᶜ are disjoint and their union is A. To use P(B|A)=P(A∩B)/P(A), we must compute P(A) and check that it is positive."
        }
      ],
      "prompt": "Which next step completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "Independence gives P(A)=a, so P(B|A)=p; independence follows from the hypotheses."
        },
        {
          "id": "b",
          "text": "Additivity gives P(A)=ap+b(1−p)>0; dividing P(A∩B)=ap by this quantity gives the formula."
        },
        {
          "id": "c",
          "text": "Additivity gives P(A)=a+b, so divide ap by a+b."
        },
        {
          "id": "d",
          "text": "Since a=P(A|B), reversing the condition gives P(B|A)=a."
        }
      ],
      "acceptedAnswers": [
        "b"
      ],
      "correctAnswer": "b",
      "explanation": "The disjoint decomposition of A supplies its probability as the sum of the two intersection probabilities. The assumed strict positivity makes conditioning on A legitimate. Dividing the numerator ap by the total ap+b(1−p) yields the claimed reversed conditional probability, with no independence assumption.",
      "sources": [
        {
          "sourceId": "lecture-2-slides",
          "slide": 68,
          "anchor": "bayes-formula"
        },
        {
          "sourceId": "lecture-2-slides",
          "slide": 69,
          "anchor": "worksheet-1"
        }
      ]
    }
  ]
};
