window.BANK_0_EXERCISE_BANK = {
  "schemaVersion": 1,
  "block": {
    "id": "lecture-1",
    "bankNumber": 0,
    "title": "Lecture 1",
    "description": "Slides 12–41: probability spaces, random elements, CDFs, quantiles and types of distributions",
    "exerciseCount": 40,
    "sessionSize": 8,
    "reviewHref": "../index.html#/probability-spaces-and-scalar-distributions",
    "featuredTopics": [
      "Probability spaces",
      "Measurability",
      "Random elements",
      "CDFs",
      "Quantiles",
      "Types of distributions"
    ]
  },
  "implementationNotes": {
    "sessionSelection": "Select eight unique questions from this bank only, with 2 intro, 4 core and 2 challenge items; at most 4 numerical questions and 2 questions per topic.",
    "scope": "Bank 0 uses only the visible content of slides 12 through 41 of the current 2026 Weeks 1–2 deck. Slide numbers count the title as slide 1. Lecture 2 begins on slide 42. The scope is the mathematical content of Lecture 1, not the historical timeline.",
    "sourceLinks": "Slide anchors are relative to the live-exercise page beside the lecture deck. Each question cites its supporting slide(s).",
    "separation": "Keep this file separate from the full Weeks 1–2 question bank. Save its progress under its own storage key.",
    "proofQuestions": "Every proof-step question includes a theorem statement with assumptions and the preceding proof steps in context. The player selects the next step; the explanation completes the argument."
  },
  "sourceCatalog": {
    "lecture-1-slides": {
      "title": "Statistical Inference 2026 — Weeks 1–2, Lecture 1",
      "author": "Alexander Taveira Blomenhofer",
      "url": "../index.html",
      "slideRange": [
        12,
        41
      ],
      "deckSha256": "4a18c6c5ebaf1ca76726466a7ff93431cb41fa63df2e5547e3b6af244f7ecb91",
      "sourceFile": "slides-2026-weeks-1-2/index.qmd"
    }
  },
  "exercises": [
    {
      "id": "bank00-001",
      "type": "multiple-choice",
      "topic": "Sigma-algebras",
      "difficulty": "intro",
      "prompt": "A σ-algebra on Ω contains Ω and is closed under complements. Which additional axiom appears in its definition?",
      "options": [
        {
          "id": "a",
          "text": "The union of every countable family of its members also belongs to it"
        },
        {
          "id": "b",
          "text": "Every subset of each of its members also belongs to it"
        },
        {
          "id": "c",
          "text": "Every member consists of finitely many points"
        },
        {
          "id": "d",
          "text": "It contains only finitely many events"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The third axiom is closure under countable unions. A σ-algebra need not contain every subset of its members, and neither its members nor the collection itself have to be finite.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 14,
          "anchor": "sigma-algebrae"
        }
      ]
    },
    {
      "id": "bank00-002",
      "type": "find-the-intruder",
      "topic": "Sigma-algebras",
      "difficulty": "core",
      "prompt": "Let Ω={a,b,c}. Which collection is NOT a σ-algebra on Ω?",
      "options": [
        {
          "id": "a",
          "text": "{∅, Ω}"
        },
        {
          "id": "b",
          "text": "The power set of Ω (all its subsets)"
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
      "explanation": "The last collection contains {a} but not its complement {b,c}. It therefore fails closure under complements. The other three collections satisfy the σ-algebra conditions.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 14,
          "anchor": "sigma-algebrae"
        }
      ]
    },
    {
      "id": "bank00-003",
      "type": "proof-step",
      "topic": "Sigma-algebras",
      "difficulty": "intro",
      "context": [
        {
          "label": "Theorem",
          "text": "Let Ω be a nonempty set and let F be a σ-algebra on Ω. Then ∅ belongs to F."
        },
        {
          "label": "Proof so far",
          "text": "By the definition of a σ-algebra, Ω belongs to F. Also, whenever A belongs to F, its complement Aᶜ=Ω∖A belongs to F."
        }
      ],
      "prompt": "Which application of these facts completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "Apply complement closure to A=Ω: Ωᶜ=∅, so ∅ belongs to F."
        },
        {
          "id": "b",
          "text": "Every subset of Ω belongs to F, because Ω belongs to F."
        },
        {
          "id": "c",
          "text": "The complement of Ω is Ω, so taking complements adds the empty set."
        },
        {
          "id": "d",
          "text": "Ω must equal ∅, because F is closed under complements."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The complement is taken relative to Ω, so Ωᶜ=Ω∖Ω=∅. Complement closure applied to the known member Ω proves the claim. A σ-algebra need not contain every subset of Ω.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 14,
          "anchor": "sigma-algebrae"
        }
      ]
    },
    {
      "id": "bank00-004",
      "type": "numeric-input",
      "topic": "Probability rules",
      "difficulty": "intro",
      "prompt": "An event A has probability 0.35. What is P(Aᶜ)?",
      "acceptedAnswers": [
        "0.65",
        ".65",
        "65%",
        "13/20"
      ],
      "correctAnswer": "0.65",
      "explanation": "A and its complement partition Ω, whose probability is one. Thus P(Aᶜ)=1−0.35=0.65.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 16,
          "anchor": "consequences-of-kolmogorovs-axioms"
        }
      ]
    },
    {
      "id": "bank00-005",
      "type": "numeric-input",
      "topic": "Probability rules",
      "difficulty": "core",
      "prompt": "Let A and B be events in the same probability space, with P(A)=0.60, P(B)=0.50 and P(A∩B)=0.20. Find P(A∪B).",
      "acceptedAnswers": [
        "0.9",
        "0.90",
        ".9",
        "90%",
        "9/10"
      ],
      "correctAnswer": "0.90",
      "explanation": "Subtract the overlap that was counted twice: P(A∪B)=0.60+0.50−0.20=0.90.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 16,
          "anchor": "consequences-of-kolmogorovs-axioms"
        }
      ]
    },
    {
      "id": "bank00-006",
      "type": "multiple-choice",
      "topic": "Continuity of probability",
      "difficulty": "intro",
      "prompt": "The notation Aₙ↗A means Aₙ⊆Aₙ₊₁ for every n and which additional condition?",
      "options": [
        {
          "id": "a",
          "text": "A is the union of all Aₙ"
        },
        {
          "id": "b",
          "text": "A is the intersection of all Aₙ"
        },
        {
          "id": "c",
          "text": "The events Aₙ are pairwise disjoint"
        },
        {
          "id": "d",
          "text": "Each Aₙ has probability one"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "An increasing sequence approaches its union. A decreasing sequence, written Aₙ↘A, approaches its intersection.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 17,
          "anchor": "monotone-sequences-of-events"
        }
      ]
    },
    {
      "id": "bank00-007",
      "type": "numeric-input",
      "topic": "Continuity of probability",
      "difficulty": "core",
      "prompt": "Events Aₙ decrease to B and P(Aₙ)=0.2+0.3/n. What is P(B)?",
      "acceptedAnswers": [
        "0.2",
        ".2",
        "20%",
        "1/5"
      ],
      "correctAnswer": "0.2",
      "explanation": "Continuity of probability for decreasing events gives P(B)=limₙP(Aₙ)=0.2, since 0.3/n tends to zero.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 18,
          "anchor": "continuity-of-probability"
        }
      ]
    },
    {
      "id": "bank00-008",
      "type": "proof-step",
      "topic": "Continuity of probability",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let (Ω,F,P) be a probability space and let A₁,A₂,… be events with Aₙ⊆Aₙ₊₁ for every n≥1. If A is the union of all Aₙ, then P(Aₙ) increases to P(A)."
        },
        {
          "label": "Proof so far",
          "text": "Set A₀=∅ and Dₙ=Aₙ∖Aₙ₋₁ for n≥1. Each Dₙ is an event, since a σ-algebra is closed under set differences. The events Dₙ represent the new part added at step n."
        }
      ],
      "prompt": "Which property lets us apply countable additivity and finish the proof?",
      "options": [
        {
          "id": "a",
          "text": "The Dₙ are pairwise disjoint, their union is A, and the union of D₁,…,D_N is A_N for every N≥1."
        },
        {
          "id": "b",
          "text": "Every Dₙ necessarily has probability zero."
        },
        {
          "id": "c",
          "text": "Each Dₙ necessarily equals A."
        },
        {
          "id": "d",
          "text": "The sequence Aₙ must become constant after finitely many steps."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Different increments cannot overlap because the Aₙ are nested. Countable additivity gives P(A)=P(D₁)+P(D₂)+⋯. The sum of the first N terms equals P(A_N), and the infinite sum is the limit of these partial sums. Thus P(A_N) tends to P(A); it is nondecreasing because all terms are nonnegative.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 18,
          "anchor": "continuity-of-probability"
        }
      ]
    },
    {
      "id": "bank00-009",
      "type": "multiple-choice",
      "topic": "Borel sets",
      "difficulty": "intro",
      "prompt": "What is the Borel σ-algebra of a metric space S?",
      "options": [
        {
          "id": "a",
          "text": "The smallest σ-algebra containing every open subset of S"
        },
        {
          "id": "b",
          "text": "The collection of open subsets alone"
        },
        {
          "id": "c",
          "text": "The collection of finite subsets alone"
        },
        {
          "id": "d",
          "text": "The collection of subsets with probability zero"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Open sets generate the Borel σ-algebra: it is the smallest σ-algebra containing them. The definition depends on the topology, not on a choice of probability measure.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 18,
          "anchor": "continuity-of-probability"
        }
      ]
    },
    {
      "id": "bank00-010",
      "type": "multiple-choice",
      "topic": "Measurable maps",
      "difficulty": "intro",
      "context": [
        {
          "label": "Setup",
          "text": "Let (S,𝒮) and (T,𝒯) be measurable spaces, and let g:S→T be a map. For B⊆T, its inverse image is g⁻¹(B)={s∈S:g(s)∈B}."
        }
      ],
      "prompt": "Which condition defines measurability of g?",
      "options": [
        {
          "id": "a",
          "text": "For every B∈𝒯, the inverse image g⁻¹(B) belongs to 𝒮"
        },
        {
          "id": "b",
          "text": "For every A∈𝒮, the image g(A) belongs to 𝒯"
        },
        {
          "id": "c",
          "text": "Every point of T equals g(s) for some s∈S"
        },
        {
          "id": "d",
          "text": "Distinct points of S always have distinct images under g"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Measurability is an inverse-image condition: every measurable target set pulls back to a measurable source set. Images of measurable sets need not be measurable, and g need not be onto or one-to-one.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 19,
          "anchor": "measurable-maps"
        }
      ]
    },
    {
      "id": "bank00-011",
      "type": "proof-step",
      "topic": "Measurable maps",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "Let (S,𝒮) and (T,𝒯) be measurable spaces and fix t₀∈T. The constant map g:S→T defined by g(s)=t₀ for every s∈S is measurable."
        },
        {
          "label": "Proof so far",
          "text": "Fix any B∈𝒯. To prove measurability, we must show that g⁻¹(B)={s∈S:g(s)∈B} belongs to 𝒮. We know that S and ∅ both belong to 𝒮."
        }
      ],
      "prompt": "Which description of g⁻¹(B) completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "It is S if t₀∈B, and ∅ if t₀∉B."
        },
        {
          "id": "b",
          "text": "It is ∅ if t₀∈B, and S if t₀∉B."
        },
        {
          "id": "c",
          "text": "It is S for every B∈𝒯."
        },
        {
          "id": "d",
          "text": "It is ∅ for every B∈𝒯."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Every s has image t₀. Thus either every s maps into B, or none does, according to whether t₀ belongs to B. Both possible inverse images are in 𝒮, and B was arbitrary, so g is measurable.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 19,
          "anchor": "measurable-maps"
        }
      ]
    },
    {
      "id": "bank00-012",
      "type": "multiple-choice",
      "topic": "Random elements",
      "difficulty": "intro",
      "context": [
        {
          "label": "Setup",
          "text": "Let (Ω,ℱ,P) be a probability space and (S,𝒮) a measurable space."
        }
      ],
      "prompt": "Which description defines a random element X with values in S?",
      "options": [
        {
          "id": "a",
          "text": "A measurable map X:(Ω,ℱ)→(S,𝒮)"
        },
        {
          "id": "b",
          "text": "Any map X:Ω→S taking finitely many values, without a measurability requirement"
        },
        {
          "id": "c",
          "text": "The probability measure P:ℱ→[0,1] itself"
        },
        {
          "id": "d",
          "text": "Any invertible map X:Ω→S, without a measurability requirement"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "A random element is a measurable map from the underlying sample space into the state space. For each B∈𝒮, its inverse image {ω:X(ω)∈B} must belong to ℱ, so P can assign that event a probability.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 20,
          "anchor": "random-elements"
        }
      ]
    },
    {
      "id": "bank00-013",
      "type": "multiple-choice",
      "topic": "Random elements",
      "difficulty": "intro",
      "prompt": "A random element takes values in ℝ³, so each outcome produces a triple of real numbers. Which term fits?",
      "options": [
        {
          "id": "a",
          "text": "Random vector"
        },
        {
          "id": "b",
          "text": "Real-valued random variable"
        },
        {
          "id": "c",
          "text": "Random continuous function on [0,1]"
        },
        {
          "id": "d",
          "text": "Probability mass function"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The terminology follows the state space: ℝ gives a random variable, ℝᵈ with d≥2 a random vector, and C([0,1]) a random function.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 21,
          "anchor": "types-of-random-elements"
        }
      ]
    },
    {
      "id": "bank00-014",
      "type": "proof-step",
      "topic": "Coordinate measurability",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "Let (Ω,F) be a measurable space, let d≥1 be an integer, and equip ℝ and ℝᵈ with their Borel σ-algebras. If X=(X₁,…,X_d):Ω→ℝᵈ is measurable, then every coordinate Xⱼ:Ω→ℝ is measurable."
        },
        {
          "label": "Proof so far",
          "text": "Fix j∈{1,…,d}. The coordinate projection πⱼ:ℝᵈ→ℝ is defined by πⱼ(x₁,…,x_d)=xⱼ. It is continuous and therefore Borel measurable. Fix a Borel set B⊆ℝ; then πⱼ⁻¹(B) is a Borel subset of ℝᵈ."
        }
      ],
      "prompt": "Which inverse-image identity now proves that Xⱼ is measurable?",
      "options": [
        {
          "id": "a",
          "text": "Xⱼ⁻¹(B)=X⁻¹(πⱼ⁻¹(B)), which belongs to F by measurability of X."
        },
        {
          "id": "b",
          "text": "Xⱼ⁻¹(B)=Ω∖X⁻¹(πⱼ⁻¹(B)) for every Borel B."
        },
        {
          "id": "c",
          "text": "Xⱼ⁻¹(B)=X⁻¹(ℝᵈ)=Ω for every Borel B."
        },
        {
          "id": "d",
          "text": "Xⱼ⁻¹(B)=∅ for every Borel B."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "For each ω∈Ω, Xⱼ(ω)∈B exactly when X(ω)∈πⱼ⁻¹(B). This proves the identity. The set πⱼ⁻¹(B) is Borel, so its inverse image under the measurable map X is in F. Both B and j were arbitrary.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 22,
          "anchor": "measurability-of-random-vectors"
        }
      ]
    },
    {
      "id": "bank00-015",
      "type": "proof-step",
      "topic": "Coordinate measurability",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let (Ω,F) be a measurable space and let d≥1 be an integer. If each Xⱼ:Ω→ℝ is measurable for the Borel σ-algebra on ℝ, then X=(X₁,…,X_d):Ω→ℝᵈ is measurable for the Borel σ-algebra B(ℝᵈ)."
        },
        {
          "label": "Proof so far",
          "text": "Define C={A⊆ℝᵈ:X⁻¹(A)∈F}. Inverse images preserve complements and countable unions, and X⁻¹(ℝᵈ)=Ω; thus C is a σ-algebra.\nFor an open box R=I₁×⋯×I_d, where each Iⱼ=(aⱼ,bⱼ) has rational endpoints aⱼ<bⱼ, we have X⁻¹(R)=X₁⁻¹(I₁)∩⋯∩X_d⁻¹(I_d)∈F. Hence every such box belongs to C."
        }
      ],
      "prompt": "Which fact implies B(ℝᵈ)⊆C and completes the proof?",
      "options": [
        {
          "id": "a",
          "text": "Every open subset of ℝᵈ is a countable union of these boxes, so C contains all open sets and the σ-algebra they generate."
        },
        {
          "id": "b",
          "text": "Every Borel subset of ℝᵈ is a single open box with rational endpoints."
        },
        {
          "id": "c",
          "text": "Every subset of ℝᵈ is a finite union of these boxes."
        },
        {
          "id": "d",
          "text": "C automatically contains every subset of ℝᵈ because it is a σ-algebra."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Rational open boxes form a countable basis: every open set is a union of a subcollection of these countably many boxes. Since C is a σ-algebra containing the boxes, it contains all open sets. The Borel σ-algebra is the smallest σ-algebra containing all open sets, so B(ℝᵈ)⊆C. By the definition of C, every Borel set therefore has a measurable inverse image under X.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 23,
          "anchor": "measurability-of-random-vectors-ii"
        }
      ]
    },
    {
      "id": "bank00-016",
      "type": "multiple-choice",
      "topic": "Distributions and transformations",
      "difficulty": "core",
      "context": [
        {
          "label": "Setup",
          "text": "Let X:(Ω,ℱ,P)→(S,𝒮) be a random element. Its distribution P_X is a probability measure on (S,𝒮)."
        }
      ],
      "prompt": "Which formula defines P_X(B) for every B∈𝒮?",
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
          "text": "P_X(B)=1 for every nonempty B and P_X(∅)=0"
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
      "explanation": "The distribution transfers probabilities from events in Ω to measurable sets of possible values of X, by taking inverse images: P_X(B)=P({ω:X(ω)∈B}).",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 24,
          "anchor": "the-distribution-of-a-random-element"
        }
      ]
    },
    {
      "id": "bank00-017",
      "type": "multiple-choice",
      "topic": "Distributions and transformations",
      "difficulty": "core",
      "context": [
        {
          "label": "Setup",
          "text": "Let X:(Ω,ℱ,P)→(S,𝒮) be a random element and g:(S,𝒮)→(T,𝒯) a measurable map. Define Y=g∘X. Write P_X and P_Y for their distributions."
        }
      ],
      "prompt": "Which formula gives P_Y(C) for every C∈𝒯?",
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
      "explanation": "The event {ω:g(X(ω))∈C} is exactly {ω:X(ω)∈g⁻¹(C)}. Thus P_Y(C)=P_X(g⁻¹(C)). Measurability of g ensures that g⁻¹(C)∈𝒮, where P_X is defined.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 25,
          "anchor": "measurable-transformations"
        }
      ]
    },
    {
      "id": "bank00-018",
      "type": "numeric-input",
      "topic": "Coin example",
      "difficulty": "intro",
      "prompt": "The four outcomes TT, HT, TH and HH each have probability 1/4. If X counts heads, what is P(X=1)?",
      "acceptedAnswers": [
        "0.5",
        ".5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "1/2",
      "explanation": "X=1 has inverse image {HT,TH}. These two outcomes have total probability 2/4=1/2.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 26,
          "anchor": "example-tossing-a-coin"
        }
      ]
    },
    {
      "id": "bank00-019",
      "type": "numeric-input",
      "topic": "Coin example",
      "difficulty": "core",
      "prompt": "The sample space is Ω={TT,HT,TH,HH}, with all four outcomes equally likely; H means heads and T means tails. Let X count heads. Define Y=1 if X≥1, and Y=0 otherwise. What is P(Y=1)?",
      "acceptedAnswers": [
        "0.75",
        ".75",
        "3/4",
        "75%"
      ],
      "correctAnswer": "3/4",
      "explanation": "The variable Y equals one for HT, TH and HH, and zero for TT. Thus P(Y=1)=P(X≥1)=3/4. This zero-or-one variable is also written as the indicator 1{X≥1}.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 26,
          "anchor": "example-tossing-a-coin"
        }
      ]
    },
    {
      "id": "bank00-020",
      "type": "multiple-choice",
      "topic": "CDF properties",
      "difficulty": "intro",
      "prompt": "Let X be a real random variable and x∈ℝ. Which probability defines its cumulative distribution function F_X(x)?",
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
      "explanation": "A CDF accumulates the probability at all values up to and including x: F_X(x)=P(X≤x).",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 27,
          "anchor": "cumulative-distribution-functions"
        }
      ]
    },
    {
      "id": "bank00-021",
      "type": "find-the-intruder",
      "topic": "CDF properties",
      "difficulty": "intro",
      "prompt": "Which property is NOT required of every CDF?",
      "options": [
        {
          "id": "a",
          "text": "It is nondecreasing"
        },
        {
          "id": "b",
          "text": "It is right-continuous"
        },
        {
          "id": "c",
          "text": "Its limits at −∞ and +∞ are 0 and 1"
        },
        {
          "id": "d",
          "text": "It is continuous at every real number"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "CDFs may have jumps, as in the coin example. Right-continuity is required, but continuity from both sides at every point is not.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 27,
          "anchor": "cumulative-distribution-functions"
        }
      ]
    },
    {
      "id": "bank00-022",
      "type": "proof-step",
      "topic": "CDF properties",
      "difficulty": "core",
      "context": [
        {
          "label": "Theorem",
          "text": "Let X be a real random variable and let F_X(x)=P(X≤x) be its cumulative distribution function. Then F_X is right-continuous: for every real x, F_X(x+h) tends to F_X(x) as positive h decreases to 0."
        },
        {
          "label": "Proof so far",
          "text": "Fix x∈ℝ and any sequence hₙ>0 decreasing to 0. Put Aₙ={X≤x+hₙ}. Continuity of probability says that if events Aₙ decrease to an event B, meaning Aₙ⊇Aₙ₊₁ and the intersection of all Aₙ is B, then P(Aₙ) decreases to P(B)."
        }
      ],
      "prompt": "Which event relation lets us apply this result?",
      "options": [
        {
          "id": "a",
          "text": "The events Aₙ decrease to {X≤x}."
        },
        {
          "id": "b",
          "text": "The events Aₙ increase to {X≤x}."
        },
        {
          "id": "c",
          "text": "The events Aₙ are pairwise disjoint and have union {X≤x}."
        },
        {
          "id": "d",
          "text": "The events Aₙ decrease to ∅ for every real x."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The thresholds x+hₙ decrease. An outcome belongs to all Aₙ exactly when X≤x: if X>x, eventually hₙ<X−x and that outcome is excluded. Thus P(Aₙ)=F_X(x+hₙ) decreases to P(X≤x)=F_X(x). Since the positive sequence decreasing to 0 was arbitrary, this is right-continuity.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 28,
          "anchor": "right-continuity-and-the-endpoint-limits"
        }
      ]
    },
    {
      "id": "bank00-023",
      "type": "multiple-choice",
      "topic": "CDF limits and atoms",
      "difficulty": "intro",
      "prompt": "Let X be a real random variable with CDF F_X. For x∈ℝ, which probability always equals the left limit F_X(x⁻)=lim(t↗x)F_X(t)?",
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
          "text": "P(X≤x), even when P(X=x)>0"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Approaching x from below includes values strictly below x but excludes the mass at x. Hence F_X(x⁻)=P(X<x).",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 29,
          "anchor": "left-limits-and-point-probabilities"
        }
      ]
    },
    {
      "id": "bank00-024",
      "type": "numeric-input",
      "topic": "CDF limits and atoms",
      "difficulty": "core",
      "prompt": "A CDF jumps from F_X(3⁻)=0.40 to F_X(3)=0.65. What is P(X=3)?",
      "acceptedAnswers": [
        "0.25",
        ".25",
        "1/4",
        "25%"
      ],
      "correctAnswer": "0.25",
      "explanation": "The probability of an atom is the jump size: P(X=3)=F_X(3)−F_X(3⁻)=0.65−0.40=0.25.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 30,
          "anchor": "atoms-and-cdf-jumps"
        }
      ]
    },
    {
      "id": "bank00-025",
      "type": "numeric-input",
      "topic": "Interval probabilities",
      "difficulty": "intro",
      "prompt": "F_X(2)=0.45 and F_X(5)=0.80. Find P(2<X≤5).",
      "acceptedAnswers": [
        "0.35",
        ".35",
        "7/20",
        "35%"
      ],
      "correctAnswer": "0.35",
      "explanation": "Subtract the probability at or below 2 from the probability at or below 5: P(2<X≤5)=F_X(5)−F_X(2)=0.35.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 31,
          "anchor": "interval-probabilities-from-the-cdf"
        }
      ]
    },
    {
      "id": "bank00-026",
      "type": "numeric-input",
      "topic": "Interval probabilities",
      "difficulty": "core",
      "prompt": "F_X(2⁻)=0.30, F_X(2)=0.45 and F_X(5)=0.80. Find P(2≤X≤5).",
      "acceptedAnswers": [
        "0.5",
        "0.50",
        ".5",
        "1/2",
        "50%"
      ],
      "correctAnswer": "0.50",
      "explanation": "This time the interval includes the atom at 2. Use the left limit: P(2≤X≤5)=F_X(5)−F_X(2⁻)=0.80−0.30=0.50.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 31,
          "anchor": "interval-probabilities-from-the-cdf"
        }
      ]
    },
    {
      "id": "bank00-027",
      "type": "proof-step",
      "topic": "CDF discontinuities",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "For any real random variable X, its cumulative distribution function F_X(x)=P(X≤x) has at most countably many discontinuities. Here ‘at most countably many’ allows a finite set as well as a countably infinite set."
        },
        {
          "label": "Proof so far",
          "text": "An atom is a point x with P(X=x)>0. We have already proved that CDF discontinuities are exactly the jumps at atoms, with jump size P(X=x).\nFor each integer m≥1, let Dₘ={x∈ℝ:P(X=x)≥1/m}. There are at most m points in Dₘ: otherwise m+1 disjoint events {X=x} would have total probability at least (m+1)/m>1. Thus each Dₘ is finite."
        }
      ],
      "prompt": "How does finiteness of the Dₘ finish the proof?",
      "options": [
        {
          "id": "a",
          "text": "Every atom belongs to some Dₘ, so the set of atoms is the countable union D₁∪D₂∪⋯ of finite sets."
        },
        {
          "id": "b",
          "text": "An increasing union of finite sets is always finite, so there are only finitely many atoms."
        },
        {
          "id": "c",
          "text": "Every atom belongs to D₁, so there is at most one atom."
        },
        {
          "id": "d",
          "text": "Every atom must have probability exactly 1/m for some integer m≥1."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "If an atom has probability p>0, choose an integer m≥1/p. Then 1/m≤p, so the atom belongs to Dₘ. Conversely, each point in any Dₘ has positive probability and is an atom. The atoms are therefore exactly D₁∪D₂∪⋯, which is at most countable because it is a countable union of finite sets. Discontinuities occur exactly at these atoms.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 32,
          "anchor": "countability-of-cdf-discontinuities"
        }
      ]
    },
    {
      "id": "bank00-028",
      "type": "multiple-choice",
      "topic": "Quantiles",
      "difficulty": "intro",
      "prompt": "For 0<u<1, which expression defines the generalized inverse Q(u)=F⁻¹(u) of a CDF?",
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
          "text": "The unique solution of F(x)=u, which must always exist"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The generalized inverse takes the leftmost point where the CDF reaches or exceeds u. It remains meaningful when the CDF has jumps or flat portions.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 33,
          "anchor": "the-generalized-inverse"
        }
      ]
    },
    {
      "id": "bank00-029",
      "type": "numeric-input",
      "topic": "Quantiles",
      "difficulty": "core",
      "prompt": "X has masses 1/4 at 0, 1/2 at 1 and 1/4 at 2. What is Q(0.5)=inf{x:F_X(x)≥0.5}?",
      "acceptedAnswers": [
        "1",
        "1.0"
      ],
      "correctAnswer": "1",
      "explanation": "F_X(0)=1/4 is below 0.5, while F_X(1)=3/4 reaches it. The first point reaching that level is 1.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 36,
          "anchor": "cdf-jumps-and-quantile-plateaus"
        }
      ]
    },
    {
      "id": "bank00-030",
      "type": "numeric-input",
      "topic": "Quantiles",
      "difficulty": "core",
      "prompt": "X has masses 1/4 at 0, 1/2 at 1 and 1/4 at 2. What is Q(1/4)? Pay attention to the ≥ in the definition.",
      "acceptedAnswers": [
        "0",
        "0.0"
      ],
      "correctAnswer": "0",
      "explanation": "The CDF already reaches 1/4 at x=0, so Q(1/4)=0. The next plateau of Q begins for u strictly greater than 1/4.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 36,
          "anchor": "cdf-jumps-and-quantile-plateaus"
        }
      ]
    },
    {
      "id": "bank00-031",
      "type": "proof-step",
      "topic": "Quantile proofs",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let F:ℝ→[0,1] be nondecreasing and right-continuous, with limits 0 at −∞ and 1 at +∞. For 0<u<1 define Q(u)=inf{x∈ℝ:F(x)≥u}, where inf denotes the greatest lower bound. Then Q(u) is finite and F(Q(u))≥u."
        },
        {
          "label": "Proof so far",
          "text": "Fix u∈(0,1) and let E={x∈ℝ:F(x)≥u}. The endpoint limits make E nonempty and bounded below, so q=inf E is finite.\nFor every n≥1, the definition of infimum gives yₙ∈E with q≤yₙ<q+1/n. Since F is nondecreasing, F(q+1/n)≥F(yₙ)≥u."
        }
      ],
      "prompt": "Which argument proves the remaining conclusion F(q)≥u?",
      "options": [
        {
          "id": "a",
          "text": "Right-continuity gives F(q)=limₙ F(q+1/n)≥u."
        },
        {
          "id": "b",
          "text": "Monotonicity gives F(q)≥F(q+1/n)≥u because q≤q+1/n."
        },
        {
          "id": "c",
          "text": "The limit of F at +∞ implies F(q)=1 for this finite q."
        },
        {
          "id": "d",
          "text": "The definition of an infimum alone implies F(q)=u for every CDF."
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The points q+1/n approach q from the right, and their F-values are all at least u. Right-continuity therefore gives F(q)≥u. Monotonicity alone has the opposite inequality F(q)≤F(q+1/n). The level need not be attained with equality: a jump can give F(q)>u.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 33,
          "anchor": "the-generalized-inverse"
        }
      ]
    },
    {
      "id": "bank00-032",
      "type": "proof-step",
      "topic": "Quantile proofs",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Theorem",
          "text": "Let F be a cumulative distribution function and let Q(u)=inf{x∈ℝ:F(x)≥u} for 0<u<1. Then Q:(0,1)→ℝ is Borel measurable. If U takes values in (0,1) and is uniform there, meaning P(U≤t)=t for every 0≤t≤1, then Q(U) has CDF F."
        },
        {
          "label": "Proof so far",
          "text": "We know F(Q(u))≥u. If Q(u)≤x, monotonicity gives F(x)≥F(Q(u))≥u. Conversely, if u≤F(x), then x is in the set whose infimum defines Q(u), so Q(u)≤x. Thus Q(u)≤x exactly when u≤F(x).\nIt follows that Q⁻¹((−∞,x])=(0,1)∩(0,F(x)], a Borel set. Since these half-lines generate the Borel σ-algebra of ℝ, Q is measurable. It remains to compute the CDF of Q(U)."
        }
      ],
      "prompt": "What completes the calculation P(Q(U)≤x)=… for an arbitrary real x?",
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
      "explanation": "Apply the proved equivalence with u=U: {Q(U)≤x}={U≤F(x)}. Since 0≤F(x)≤1, the defining uniform probability formula gives P(U≤F(x))=F(x), including the endpoint values 0 and 1. Hence the CDF of the measurable random variable Q(U) is F.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 34,
          "anchor": "the-inverse-transform-construction"
        }
      ]
    },
    {
      "id": "bank00-033",
      "type": "multiple-choice",
      "topic": "Quantiles",
      "difficulty": "core",
      "prompt": "Let F be a CDF. Which properties does its generalized inverse Q(u)=inf{x∈ℝ:F(x)≥u} always have for 0<u<1?",
      "options": [
        {
          "id": "a",
          "text": "It is nondecreasing and left-continuous"
        },
        {
          "id": "b",
          "text": "It is strictly increasing and differentiable everywhere"
        },
        {
          "id": "c",
          "text": "It is decreasing and right-continuous"
        },
        {
          "id": "d",
          "text": "It must be continuous from both sides everywhere"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Increasing the probability level cannot move the first point reaching that level to the left. The generalized inverse is left-continuous; it can have right jumps when the CDF has flat portions.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 35,
          "anchor": "continuity-of-quantiles"
        }
      ]
    },
    {
      "id": "bank00-034",
      "type": "find-the-intruder",
      "topic": "Discrete distributions",
      "difficulty": "intro",
      "prompt": "Which statement does NOT belong to the definition of a discrete probability distribution?",
      "options": [
        {
          "id": "a",
          "text": "Its masses are nonnegative"
        },
        {
          "id": "b",
          "text": "Its masses sum to one"
        },
        {
          "id": "c",
          "text": "All probability is carried by a finite or countable set of points"
        },
        {
          "id": "d",
          "text": "Its probability mass function must be continuous on ℝ"
        }
      ],
      "acceptedAnswers": [
        "d"
      ],
      "correctAnswer": "d",
      "explanation": "A discrete distribution has the form Σⱼpⱼδₓⱼ with nonnegative masses summing to one. Continuity of the mass function on ℝ is not a requirement.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 37,
          "anchor": "discrete-distributions"
        }
      ]
    },
    {
      "id": "bank00-035",
      "type": "numeric-input",
      "topic": "Densities",
      "difficulty": "intro",
      "prompt": "U is uniform on (0,1/2), with density 2 throughout that interval. What is P(U=1/4)?",
      "acceptedAnswers": [
        "0",
        "0.0",
        "0%"
      ],
      "correctAnswer": "0",
      "explanation": "For an absolutely continuous distribution, a single point has probability zero. The density value 2 is not a point probability; probabilities are integrals over sets.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 39,
          "anchor": "radonnikodym-derivatives"
        }
      ]
    },
    {
      "id": "bank00-036",
      "type": "multiple-choice",
      "topic": "Densities",
      "difficulty": "core",
      "context": [
        {
          "label": "Terminology",
          "text": "A statement holds for Lebesgue-almost every x if it holds outside a set that, for every ε>0, can be covered by countably many intervals whose total length is less than ε. Such an exceptional set is said to have Lebesgue measure zero."
        }
      ],
      "prompt": "Let X have an absolutely continuous distribution with density f_X and CDF F_X. Which statement is guaranteed?",
      "options": [
        {
          "id": "a",
          "text": "F_X′(x)=f_X(x) for Lebesgue-almost every x"
        },
        {
          "id": "b",
          "text": "F_X′(x)=P(X=x) for every x"
        },
        {
          "id": "c",
          "text": "F_X(x)=f_X(x) for every x"
        },
        {
          "id": "d",
          "text": "f_X(x) must be at most one at every x"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "Since F_X(x)=∫₋∞ˣf_X(t)dt, its derivative equals f_X almost everywhere, and also at every continuity point of f_X. A density may exceed one; for example, the uniform distribution on (0,1/2) has density 2 there.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 39,
          "anchor": "radonnikodym-derivatives"
        }
      ]
    },
    {
      "id": "bank00-037",
      "type": "numeric-input",
      "topic": "Uniform distribution",
      "difficulty": "intro",
      "prompt": "A density is f_X(x)=c on [−2,2] and zero elsewhere. What is c?",
      "acceptedAnswers": [
        "0.25",
        ".25",
        "1/4"
      ],
      "correctAnswer": "1/4",
      "explanation": "The interval has length 4. The integral of the density must be one, so 4c=1 and c=1/4.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 40,
          "anchor": "worksheet-1-uniform-distribution-on--22"
        }
      ]
    },
    {
      "id": "bank00-038",
      "type": "numeric-input",
      "topic": "Uniform distribution",
      "difficulty": "core",
      "prompt": "X is uniform on [−2,2], with CDF F_X(x)=0 for x<−2, F_X(x)=(x+2)/4 for −2≤x≤2, and F_X(x)=1 for x>2. Find its 0.95-quantile Q(0.95)=inf{x∈ℝ:F_X(x)≥0.95}.",
      "acceptedAnswers": [
        "1.8",
        "1.80",
        "9/5"
      ],
      "correctAnswer": "1.8",
      "explanation": "Solve (x+2)/4=0.95: x=4·0.95−2=1.8. The CDF is strictly increasing on [−2,2], so this is the first point at which it reaches 0.95.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 40,
          "anchor": "worksheet-1-uniform-distribution-on--22"
        }
      ]
    },
    {
      "id": "bank00-039",
      "type": "numeric-input",
      "topic": "Mixed distributions",
      "difficulty": "core",
      "context": [
        {
          "label": "Setup",
          "text": "Let μ be the uniform probability distribution on (0,1): its density is 1 on (0,1) and 0 elsewhere. Let δ₀ be the point mass at 0, so δ₀(A)=1 if 0∈A and 0 otherwise. The mixture P_X=0.3δ₀+0.7μ means P_X(A)=0.3δ₀(A)+0.7μ(A) for every Borel set A."
        }
      ],
      "prompt": "For this distribution, what is the CDF value F_X(0.5)=P(X≤0.5)?",
      "acceptedAnswers": [
        "0.65",
        ".65",
        "13/20",
        "65%"
      ],
      "correctAnswer": "0.65",
      "explanation": "Include the atom at 0 and half of the uniform component: F_X(0.5)=0.3+0.7·0.5=0.65.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 41,
          "anchor": "a-mixed-distribution"
        }
      ]
    },
    {
      "id": "bank00-040",
      "type": "multiple-choice",
      "topic": "Mixed distributions",
      "difficulty": "challenge",
      "context": [
        {
          "label": "Notation",
          "text": "δ₀ is the Dirac probability measure at 0: δ₀(A)=1 if 0∈A and 0 otherwise. U(0,1) denotes the probability distribution with density 1 on (0,1) and 0 elsewhere. A mixture πδ₀+(1−π)U(0,1) assigns a Borel set A the probability πδ₀(A)+(1−π)U(0,1)(A)."
        }
      ],
      "prompt": "For 0<π<1, how should P_X=πδ₀+(1−π)U(0,1) be classified?",
      "options": [
        {
          "id": "a",
          "text": "Neither discrete nor absolutely continuous: it has both an atom and a uniform component"
        },
        {
          "id": "b",
          "text": "Discrete, because it has an atom"
        },
        {
          "id": "c",
          "text": "Absolutely continuous, because part of it is uniform"
        },
        {
          "id": "d",
          "text": "Both discrete and absolutely continuous"
        }
      ],
      "acceptedAnswers": [
        "a"
      ],
      "correctAnswer": "a",
      "explanation": "The positive mass at 0 prevents absolute continuity. The uniform component assigns probability zero to every countable set, so any countable set has P_X-probability at most π<1. Thus the distribution is not discrete either.",
      "sources": [
        {
          "sourceId": "lecture-1-slides",
          "slide": 41,
          "anchor": "a-mixed-distribution"
        }
      ]
    }
  ],
  "editorialNotes": [
    "Reviewed in parallel for mathematical rigour against slides 12–41; assumptions, domains, inverse images, and distribution notation are explicit where needed.",
    "All 14 numerical exercises were checked independently; generalized-inverse questions use the infimum and ≥ convention from slide 33, including the boundary Q(1/4)=0 in the coin example.",
    "Additional short setup panels define notation already used in the lecture. Proof panels preserve the theorem and prior steps while leaving a short completion task."
  ]
};
