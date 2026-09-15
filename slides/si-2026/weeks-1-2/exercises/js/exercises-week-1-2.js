window.WEEK_1_2_EXERCISE_BANK = {
  "schemaVersion": 1,
  "block": {
    "id": "weeks-1-2",
    "title": "Weeks 1–2",
    "description": "Random elements, probability distributions, moments and transforms",
    "exerciseCount": 40,
    "sessionSize": 8,
    "featuredTopics": [
      "Random variables",
      "Probability",
      "Expectation",
      "Distributions",
      "Covariance",
      "Proof ideas"
    ]
  },
  "implementationNotes": {
    "sessionSelection": "Choose eight unique exercise IDs without replacement for each new session. To keep sessions varied while remaining random, shuffle within pools and target 2 intro, 4 core, and 2 challenge items, with no more than 4 numeric-input items and no more than 2 items from the same topic.",
    "answerNormalization": "For numeric-input items: trim whitespace; normalize Unicode minus to '-'; accept either decimal comma or decimal point; accept a trailing percent sign where listed; and compare parsed decimal values with a small tolerance after first checking the explicit acceptedAnswers strings.",
    "optionShuffling": "Shuffle displayed options on every attempt but grade by stable option id, never by display position.",
    "futureBlocks": "Keep the block id on the bank and prefix every exercise id by block. Additional weekly banks can use the same schema and register as separate blocks."
  },
  "sourceCatalog": {
    "course-slides-w1-2": {
      "title": "Statistical Inference — Week 1 and 2 slides",
      "author": "Jorge Milhazes Freitas",
      "url": "https://drive.google.com/file/d/19OF-2yvRMaCyc1dOLgDCIR6iAGFMsvNP/view?usp=share_link",
      "notes": "The linked 59-page PDF covers random elements, distribution functions, random vectors, conditional probability and independence, types of random variables and vectors, expectation, variance, covariance, common distributions, and characteristic functions. PDF-page locators below refer to the downloaded PDF page, not the smaller slide counter printed in its footer."
    },
    "course-worksheet-1": {
      "title": "Statistical Inference — Worksheet 1",
      "url": "https://drive.google.com/file/d/19vH7VEJUvoxPdVlWXLpZwo3mJqJ18WvA/view?usp=share_link"
    },
    "course-worksheet-2": {
      "title": "Statistical Inference — Worksheet 2",
      "url": "https://drive.google.com/file/d/19jm4iXkruFuZBA1crgQRho11rS9VJg6M/view?usp=share_link"
    },
    "course-solutions-w1-2": {
      "title": "Statistical Inference — Solutions of Worksheets 1 and 2",
      "url": "https://drive.google.com/file/d/19vngGT5hZAh2DAf05LI7TxzzBvXxic78/view?usp=share_link"
    },
    "psu-independent-events": {
      "title": "Penn State STAT 414 — Independent Events",
      "url": "https://online.stat.psu.edu/stat414/Lesson05"
    },
    "psu-covariance": {
      "title": "Penn State STAT 414 — The Correlation Coefficient",
      "url": "https://online.stat.psu.edu/stat414/Lesson18",
      "notes": "Used to verify that independence implies zero covariance, while zero covariance does not imply independence in general."
    },
    "nist-binomial": {
      "title": "NIST/SEMATECH e-Handbook — Binomial Distribution",
      "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm"
    },
    "nist-poisson": {
      "title": "NIST/SEMATECH e-Handbook — Poisson Distribution",
      "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda366j.htm"
    },
    "nist-normal": {
      "title": "NIST/SEMATECH e-Handbook — What do we mean by Normal data?",
      "url": "https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc51.htm"
    },
    "nist-exponential": {
      "title": "NIST/SEMATECH e-Handbook — Exponential Distribution",
      "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda3667.htm"
    },
    "nist-gamma": {
      "title": "NIST/SEMATECH e-Handbook — Gamma",
      "url": "https://www.itl.nist.gov/div898/handbook/apr/section1/apr165.htm"
    },
    "mit-characteristic-functions": {
      "title": "MIT OpenCourseWare 18.175 — Lecture 8: Characteristic functions",
      "url": "https://ocw.mit.edu/courses/18-175-theory-of-probability-spring-2014/887e96172e82a615dac16fb26702d88b_MIT18_175S14_Lecture8.pdf"
    }
  },
  "editorialNotes": [
    "The Week 1–2 slide on PDF page 5 prints x→−∞ twice. The second CDF limit is correctly x→+∞, giving 1.",
    "The Week 1–2 slide on PDF page 34 displays E(XY)=E(X)E(Y) ⇔ Cov(X,Y)=0 under an independence heading. In general independence implies these equalities, but zero covariance does not imply independence. Exercise wk01-02-025 explicitly teaches the correct one-way implication, verified against Penn State STAT 414 Lesson 18.",
    "The Week 1–2 slide on PDF page 43 appears to print φ^(k)(0)=i^k E(|X|^k). The derivative identity is φ^(k)(0)=i^k E(X^k), assuming the relevant absolute moment exists. Exercise wk01-02-040 uses the corrected identity, verified against MIT OCW 18.175 Lecture 8.",
    "The slide on PDF page 38 has a wording typo suggesting σ²=1 while showing the general N(μ,σ²) density. The exercises use the standard general parameterization."
  ],
  "exercises": [
    {
      "id": "wk01-02-001",
      "type": "multiple-choice",
      "topic": "Random elements",
      "difficulty": "intro",
      "prompt": "Which condition makes a map X: Ω → S a random element when S carries its Borel σ-algebra?",
      "options": [
        {"id": "a", "text": "X must be one-to-one."},
        {"id": "b", "text": "For every Borel set B in S, X⁻¹(B) must belong to F."},
        {"id": "c", "text": "S must be a finite set."},
        {"id": "d", "text": "X must take every value in S."}
      ],
      "acceptedAnswers": ["b"],
      "correctAnswer": "b",
      "explanation": "A random element is a measurable map. Measurability means that the inverse image of every Borel set in S is an event in F.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 4, Random elements"}]
    },
    {
      "id": "wk01-02-002",
      "type": "multiple-choice",
      "topic": "Random elements",
      "difficulty": "intro",
      "prompt": "A measurable map X: Ω → ℝ⁴ is best described as what?",
      "options": [
        {"id": "a", "text": "A random variable"},
        {"id": "b", "text": "A random vector"},
        {"id": "c", "text": "A probability measure"},
        {"id": "d", "text": "A random function in C([0,1])"}
      ],
      "acceptedAnswers": ["b"],
      "correctAnswer": "b",
      "explanation": "A real-valued random element is a random variable; one taking values in ℝᵈ with d ≥ 2 is a random vector.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 4, Random elements"}]
    },
    {
      "id": "wk01-02-003",
      "type": "multiple-choice",
      "topic": "Random elements",
      "difficulty": "core",
      "prompt": "For a random variable X and a Borel set A, which formula defines the law P_X of X?",
      "options": [
        {"id": "a", "text": "P_X(A) = P(A) / P(X)"},
        {"id": "b", "text": "P_X(A) = P(X ∈ A) = P(X⁻¹(A))"},
        {"id": "c", "text": "P_X(A) = X(P(A))"},
        {"id": "d", "text": "P_X(A) = 1 − P(A)"}
      ],
      "acceptedAnswers": ["b"],
      "correctAnswer": "b",
      "explanation": "The distribution of X is the pushforward of P through X: it assigns A the probability of the event whose X-value lies in A.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 4, law/distribution of X"}]
    },
    {
      "id": "wk01-02-004",
      "type": "find-the-intruder",
      "topic": "Distribution functions",
      "difficulty": "intro",
      "prompt": "Three statements are true for every cumulative distribution function F. Find the intruder.",
      "options": [
        {"id": "a", "text": "F is non-decreasing."},
        {"id": "b", "text": "F is right-continuous."},
        {"id": "c", "text": "F(x) tends to 0 as x→−∞ and to 1 as x→+∞."},
        {"id": "d", "text": "F is continuous at every real number."}
      ],
      "acceptedAnswers": ["d"],
      "correctAnswer": "d",
      "explanation": "A CDF may jump at atoms, so it need not be continuous everywhere. It is always non-decreasing and right-continuous, with the stated endpoint limits.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 5, Distribution function; corrected +∞ endpoint noted in editorialNotes"}]
    },
    {
      "id": "wk01-02-005",
      "type": "numeric-input",
      "topic": "Distribution functions",
      "difficulty": "intro",
      "prompt": "A CDF has F(2⁻)=0.55 and F(2)=0.70. What is P(X=2)?",
      "options": [],
      "acceptedAnswers": ["0.15", ".15", "15%", "3/20"],
      "correctAnswer": "0.15",
      "explanation": "The probability at an atom is the jump of the CDF: P(X=2)=F(2)−F(2⁻)=0.70−0.55=0.15.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 5, jump/saltus formula"}]
    },
    {
      "id": "wk01-02-006",
      "type": "multiple-choice",
      "topic": "Distribution functions",
      "difficulty": "core",
      "prompt": "Let P(X=0)=0.25, P(X=2)=0.50, and P(X=5)=0.25. Using F⁻¹(u)=inf{x:F(x)≥u}, what is F⁻¹(0.60)?",
      "options": [
        {"id": "a", "text": "0"},
        {"id": "b", "text": "2"},
        {"id": "c", "text": "5"},
        {"id": "d", "text": "0.60"}
      ],
      "acceptedAnswers": ["b"],
      "correctAnswer": "b",
      "explanation": "F is 0.25 from 0 up to 2 and reaches 0.75 at 2. The first x for which F(x)≥0.60 is therefore 2.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF pages 6–7, generalized inverse distribution function"}]
    },
    {
      "id": "wk01-02-007",
      "type": "proof-step",
      "topic": "Distribution functions",
      "difficulty": "core",
      "prompt": "To prove that F is right-continuous at x, observe that A_n=(−∞,x+1/n] decreases to (−∞,x]. Which probability principle finishes the proof?",
      "options": [
        {"id": "a", "text": "The union bound"},
        {"id": "b", "text": "Continuity of probability from above"},
        {"id": "c", "text": "Bayes' theorem"},
        {"id": "d", "text": "The multiplication rule for independent events"}
      ],
      "acceptedAnswers": ["b"],
      "correctAnswer": "b",
      "explanation": "Since A_n↓(−∞,x], continuity from above gives P(A_n)→P((−∞,x]), i.e. F(x+1/n)→F(x).",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 5, proof of right-continuity"}]
    },
    {
      "id": "wk01-02-008",
      "type": "numeric-input",
      "topic": "Random vectors",
      "difficulty": "core",
      "prompt": "A pair (X,Y) has masses 0.10 at (0,0), 0.20 at (0,2), 0.30 at (2,0), and 0.40 at (2,2). Find the joint CDF value F(1,2)=P(X≤1,Y≤2).",
      "options": [],
      "acceptedAnswers": ["0.3", "0.30", ".3", "3/10", "30%"],
      "correctAnswer": "0.30",
      "explanation": "The southwest rectangle X≤1,Y≤2 contains (0,0) and (0,2), so the probability is 0.10+0.20=0.30.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 9, joint distribution function and southwest sets"}]
    },
    {
      "id": "wk01-02-009",
      "type": "multiple-choice",
      "topic": "Types of random variables",
      "difficulty": "intro",
      "prompt": "Which random variable is discrete?",
      "options": [
        {"id": "a", "text": "The exact waiting time for the next bus"},
        {"id": "b", "text": "The exact temperature at noon"},
        {"id": "c", "text": "The number of emails received today"},
        {"id": "d", "text": "A uniformly chosen point in [0,1]"}
      ],
      "acceptedAnswers": ["c"],
      "correctAnswer": "c",
      "explanation": "A count takes values in a countable set. The other examples are ordinarily modeled with continuous state spaces.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF pages 18–20, discrete random variables and PMFs"}]
    },
    {
      "id": "wk01-02-010",
      "type": "numeric-input",
      "topic": "Continuous random variables",
      "difficulty": "core",
      "prompt": "A proposed density is f(x)=c·x for 0<x<2 and 0 otherwise. What must c equal?",
      "options": [],
      "acceptedAnswers": ["0.5", ".5", "1/2"],
      "correctAnswer": "1/2",
      "explanation": "A density integrates to 1. Here ∫₀² c x dx = 2c, so c=1/2.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 21, absolutely continuous random variables"}]
    },
    {
      "id": "wk01-02-011",
      "type": "multiple-choice",
      "topic": "Continuous random variables",
      "difficulty": "intro",
      "prompt": "If X has an absolutely continuous distribution, what is P(X=1)?",
      "options": [
        {"id": "a", "text": "0"},
        {"id": "b", "text": "f(1)"},
        {"id": "c", "text": "F(1)"},
        {"id": "d", "text": "It is always 1/2"}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "An individual point has Lebesgue measure zero, so integrating a density over {1} gives probability 0. A density value is not itself a point probability.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF pages 21–22, density representation"}]
    },
    {
      "id": "wk01-02-012",
      "type": "numeric-input",
      "topic": "Random vectors",
      "difficulty": "core",
      "prompt": "For a joint PMF, f(0,0)=0.10, f(0,1)=0.20, f(1,0)=0.30, f(1,1)=0.40. What is the marginal probability f_X(0)?",
      "options": [],
      "acceptedAnswers": ["0.3", "0.30", ".3", "3/10", "30%"],
      "correctAnswer": "0.30",
      "explanation": "Sum the joint PMF over every possible y: f_X(0)=f(0,0)+f(0,1)=0.10+0.20=0.30.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF pages 23–24, joint and marginal PMFs"}]
    },
    {
      "id": "wk01-02-013",
      "type": "numeric-input",
      "topic": "Random vectors",
      "difficulty": "core",
      "prompt": "Using f(0,0)=0.10 and f(0,1)=0.20, compute P(Y=1 | X=0).",
      "options": [],
      "acceptedAnswers": ["0.6667", ".6667", "0.667", ".667", "2/3", "66.67%", "66.7%"],
      "correctAnswer": "2/3",
      "explanation": "P(Y=1|X=0)=f(0,1)/f_X(0)=0.20/(0.10+0.20)=2/3.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 25, conditional PMF"}]
    },
    {
      "id": "wk01-02-014",
      "type": "multiple-choice",
      "topic": "Conditional probability and independence",
      "difficulty": "intro",
      "prompt": "Suppose P(A)=0.40, P(B)=0.50, and P(A∩B)=0.20. What can you conclude?",
      "options": [
        {"id": "a", "text": "A and B are independent."},
        {"id": "b", "text": "A and B are mutually exclusive."},
        {"id": "c", "text": "P(A|B)=0.20."},
        {"id": "d", "text": "There is not enough information."}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "P(A)P(B)=0.40·0.50=0.20=P(A∩B), which is exactly the independence criterion.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF pages 11–12, Definitions 1.5 and 1.7"},
        {"sourceId": "psu-independent-events", "locator": "Definitions 5.1–5.2"}
      ]
    },
    {
      "id": "wk01-02-015",
      "type": "multiple-choice",
      "topic": "Conditional probability and independence",
      "difficulty": "core",
      "prompt": "Roll a fair die. Let A={2,4,6} and B={1,2}. Are A and B independent?",
      "options": [
        {"id": "a", "text": "Yes, because P(A∩B)=1/6=P(A)P(B)."},
        {"id": "b", "text": "No, because A and B overlap."},
        {"id": "c", "text": "No, because their probabilities are unequal."},
        {"id": "d", "text": "Yes, because all die events are independent."}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "A∩B={2}, so P(A∩B)=1/6. Also P(A)P(B)=(1/2)(1/3)=1/6. Overlap does not prevent independence.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 13, Example 1.10"}]
    },
    {
      "id": "wk01-02-016",
      "type": "numeric-input",
      "topic": "Conditional probability and independence",
      "difficulty": "challenge",
      "prompt": "In a population, 5% have hypertension. Of those people, 75% drink alcohol; among people without hypertension, 50% drink alcohol. Given that a randomly chosen person drinks alcohol, what is the probability they have hypertension? Give a percentage to two decimals.",
      "options": [],
      "acceptedAnswers": ["7.32%", "7.32", "0.0732", ".0732", "7.317%", "0.07317"],
      "correctAnswer": "7.32%",
      "explanation": "Bayes' rule gives 0.05·0.75 / (0.05·0.75 + 0.95·0.50) = 0.0375/0.5125 ≈ 0.07317, or 7.32%.",
      "sources": [
        {"sourceId": "course-worksheet-1", "locator": "PDF page 1, Exercise 5"},
        {"sourceId": "course-solutions-w1-2", "locator": "PDF page 1, Worksheet 1 solution 5"}
      ]
    },
    {
      "id": "wk01-02-017",
      "type": "proof-step",
      "topic": "Conditional probability and independence",
      "difficulty": "core",
      "prompt": "A and B are disjoint and both have positive probability. Why can they not be independent?",
      "options": [
        {"id": "a", "text": "Disjointness gives P(A∩B)=0, but positivity gives P(A)P(B)>0."},
        {"id": "b", "text": "Independent events must have the same probability."},
        {"id": "c", "text": "Disjoint events always have probability 0."},
        {"id": "d", "text": "Independence requires A∪B=Ω."}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "Independence would require P(A∩B)=P(A)P(B). The left side is 0 while the right side is strictly positive, a contradiction.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 12, addition and multiplication laws"},
        {"sourceId": "psu-independent-events", "locator": "Definition 5.2"}
      ]
    },
    {
      "id": "wk01-02-018",
      "type": "multiple-choice",
      "topic": "Random vectors",
      "difficulty": "core",
      "prompt": "For discrete random variables X and Y, which condition for all x and y is equivalent to independence?",
      "options": [
        {"id": "a", "text": "f_X,Y(x,y)=f_X(x)+f_Y(y)"},
        {"id": "b", "text": "f_X,Y(x,y)=f_X(x)f_Y(y)"},
        {"id": "c", "text": "f_X(x)=f_Y(y)"},
        {"id": "d", "text": "f_X,Y(x,y)=0 whenever x≠y"}
      ],
      "acceptedAnswers": ["b"],
      "correctAnswer": "b",
      "explanation": "For independent discrete random variables, every joint point probability factors into the product of its two marginal probabilities.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 24, Remark 1.26"}]
    },
    {
      "id": "wk01-02-019",
      "type": "numeric-input",
      "topic": "Expectation",
      "difficulty": "core",
      "prompt": "X equals −2 with probability 1/3, 3 with probability 1/2, and 1 with probability 1/6. Find E(X).",
      "options": [],
      "acceptedAnswers": ["1", "1.0"],
      "correctAnswer": "1",
      "explanation": "E(X)=−2(1/3)+3(1/2)+1(1/6)=−4/6+9/6+1/6=1.",
      "sources": [
        {"sourceId": "course-worksheet-1", "locator": "PDF page 2, Exercise 8"},
        {"sourceId": "course-solutions-w1-2", "locator": "PDF page 1, Worksheet 1 solution 8"}
      ]
    },
    {
      "id": "wk01-02-020",
      "type": "numeric-input",
      "topic": "Expectation",
      "difficulty": "intro",
      "prompt": "If E(X)=1, what is E(2X+5)?",
      "options": [],
      "acceptedAnswers": ["7", "7.0"],
      "correctAnswer": "7",
      "explanation": "Linearity gives E(2X+5)=2E(X)+5=2·1+5=7. Independence is not needed for linearity.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 28, Theorem 2.2"},
        {"sourceId": "course-worksheet-1", "locator": "PDF page 2, Exercise 8(b)"}
      ]
    },
    {
      "id": "wk01-02-021",
      "type": "numeric-input",
      "topic": "Expectation",
      "difficulty": "core",
      "prompt": "A continuous random variable has density f(x)=2x for 0<x<1 and 0 otherwise. Find E(X).",
      "options": [],
      "acceptedAnswers": ["0.6667", ".6667", "0.667", ".667", "2/3"],
      "correctAnswer": "2/3",
      "explanation": "E(X)=∫₀¹ x·2x dx=2∫₀¹x²dx=2/3.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 28, expectation for an absolutely continuous random variable"}]
    },
    {
      "id": "wk01-02-022",
      "type": "numeric-input",
      "topic": "Variance",
      "difficulty": "core",
      "prompt": "Suppose E(X)=1 and E(X²)=6. Find Var(X).",
      "options": [],
      "acceptedAnswers": ["5", "5.0"],
      "correctAnswer": "5",
      "explanation": "Var(X)=E(X²)−[E(X)]²=6−1²=5.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 30, Remark 2.6"},
        {"sourceId": "course-solutions-w1-2", "locator": "PDF page 1, Worksheet 1 solution 8"}
      ]
    },
    {
      "id": "wk01-02-023",
      "type": "numeric-input",
      "topic": "Variance",
      "difficulty": "intro",
      "prompt": "If Var(X)=5, what is Var(2X+5)?",
      "options": [],
      "acceptedAnswers": ["20", "20.0"],
      "correctAnswer": "20",
      "explanation": "Adding a constant does not change variance, while multiplying by 2 multiplies variance by 2². Thus Var(2X+5)=4·5=20.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 30, Exercise 2.7"},
        {"sourceId": "course-solutions-w1-2", "locator": "PDF page 1, Worksheet 1 solution 8"}
      ]
    },
    {
      "id": "wk01-02-024",
      "type": "numeric-input",
      "topic": "Covariance",
      "difficulty": "core",
      "prompt": "Given E(X)=2, E(Y)=−1, and E(XY)=1.5, calculate Cov(X,Y).",
      "options": [],
      "acceptedAnswers": ["3.5", "3.50", "7/2"],
      "correctAnswer": "3.5",
      "explanation": "Cov(X,Y)=E(XY)−E(X)E(Y)=1.5−2(−1)=3.5.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 31, Definition 2.8 and Remark 2.9"}]
    },
    {
      "id": "wk01-02-025",
      "type": "proof-step",
      "topic": "Covariance and independence",
      "difficulty": "challenge",
      "prompt": "Let X be uniform on {−1,0,1} and set Y=X². Cov(X,Y)=0. Which conclusion is correct?",
      "options": [
        {"id": "a", "text": "X and Y are independent because their covariance is zero."},
        {"id": "b", "text": "X and Y are dependent because Y is determined by X, despite zero covariance."},
        {"id": "c", "text": "Y must be constant."},
        {"id": "d", "text": "The covariance cannot be zero."}
      ],
      "acceptedAnswers": ["b"],
      "correctAnswer": "b",
      "explanation": "Symmetry gives E(X)=E(X³)=0, hence Cov(X,X²)=0. But knowing X determines Y, and for example P(Y=0|X=0)=1 whereas P(Y=0)=1/3. Zero covariance does not imply independence in general.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 34, expectation and independence; the displayed converse is corrected"},
        {"sourceId": "psu-covariance", "locator": "Lesson 18.3, zero covariance does not imply independence"}
      ]
    },
    {
      "id": "wk01-02-026",
      "type": "numeric-input",
      "topic": "Variance and independence",
      "difficulty": "core",
      "prompt": "X and Y are independent with Var(X)=4 and Var(Y)=9. Find Var(X+Y).",
      "options": [],
      "acceptedAnswers": ["13", "13.0"],
      "correctAnswer": "13",
      "explanation": "Independence makes Cov(X,Y)=0, so Var(X+Y)=Var(X)+Var(Y)=4+9=13.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 34, Proposition 2.16"},
        {"sourceId": "psu-covariance", "locator": "Lesson 18.3, independence implies zero covariance"}
      ]
    },
    {
      "id": "wk01-02-027",
      "type": "numeric-input",
      "topic": "Expectation",
      "difficulty": "challenge",
      "prompt": "A positive integer-valued X satisfies P(X≥1)=1, P(X≥2)=0.4, P(X≥3)=0.1, and P(X≥4)=0. Use the tail-sum formula to find E(X).",
      "options": [],
      "acceptedAnswers": ["1.5", "1.50", "3/2"],
      "correctAnswer": "1.5",
      "explanation": "For a positive integer-valued variable, E(X)=Σᵢ≥1 P(X≥i). Here that is 1+0.4+0.1=1.5.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 32, Corollary 2.12"}]
    },
    {
      "id": "wk01-02-028",
      "type": "multiple-choice",
      "topic": "Binomial distribution",
      "difficulty": "intro",
      "prompt": "Ten independent trials each have the same success probability p, and X counts successes. Which model fits X?",
      "options": [
        {"id": "a", "text": "Binomial(10,p)"},
        {"id": "b", "text": "Poisson(p)"},
        {"id": "c", "text": "Normal(10,p)"},
        {"id": "d", "text": "Exponential(p)"}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "A binomial variable counts successes in a fixed number of independent two-outcome trials with constant success probability.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 35, Binomial distribution"},
        {"sourceId": "nist-binomial", "locator": "definition and PMF"}
      ]
    },
    {
      "id": "wk01-02-029",
      "type": "numeric-input",
      "topic": "Binomial distribution",
      "difficulty": "core",
      "prompt": "If X∼Binomial(4,0.5), what is P(X=2)?",
      "options": [],
      "acceptedAnswers": ["0.375", ".375", "3/8", "37.5%"],
      "correctAnswer": "0.375",
      "explanation": "P(X=2)=C(4,2)(0.5)²(0.5)²=6/16=3/8=0.375.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 35, Binomial PMF"},
        {"sourceId": "nist-binomial", "locator": "probability mass function"}
      ]
    },
    {
      "id": "wk01-02-030",
      "type": "multiple-choice",
      "topic": "Binomial distribution",
      "difficulty": "core",
      "prompt": "For X∼Binomial(20,0.3), which pair gives (E(X), Var(X))?",
      "options": [
        {"id": "a", "text": "(6, 4.2)"},
        {"id": "b", "text": "(6, 6)"},
        {"id": "c", "text": "(14, 4.2)"},
        {"id": "d", "text": "(0.3, 0.21)"}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "A Binomial(n,p) variable has mean np and variance np(1−p). Thus 20·0.3=6 and 20·0.3·0.7=4.2.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 35, binomial mean and variance"},
        {"sourceId": "nist-binomial", "locator": "common statistics"}
      ]
    },
    {
      "id": "wk01-02-031",
      "type": "multiple-choice",
      "topic": "Poisson distribution",
      "difficulty": "intro",
      "prompt": "Customers arrive at an average rate of 3 per hour. X counts arrivals in the next hour under a constant-rate Poisson-process model. Which distribution fits?",
      "options": [
        {"id": "a", "text": "Poisson(3)"},
        {"id": "b", "text": "Binomial(3,1/2)"},
        {"id": "c", "text": "Exponential(3)"},
        {"id": "d", "text": "Normal(0,1)"}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "A Poisson distribution models a count of events in a fixed interval when λ is the average count for that interval.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 36, Poisson distribution"},
        {"sourceId": "nist-poisson", "locator": "definition, PMF, and interpretation of λ"}
      ]
    },
    {
      "id": "wk01-02-032",
      "type": "numeric-input",
      "topic": "Poisson distribution",
      "difficulty": "core",
      "prompt": "If X∼Poisson(2), find P(X=0). Give four decimal places.",
      "options": [],
      "acceptedAnswers": ["0.1353", ".1353", "e^-2", "e⁻²", "13.53%"],
      "correctAnswer": "e⁻² ≈ 0.1353",
      "explanation": "The Poisson PMF gives P(X=0)=e⁻²·2⁰/0!=e⁻²≈0.1353.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 36, Poisson PMF"},
        {"sourceId": "nist-poisson", "locator": "probability mass function"}
      ]
    },
    {
      "id": "wk01-02-033",
      "type": "numeric-input",
      "topic": "Multinomial distribution",
      "difficulty": "core",
      "prompt": "For (X₁,X₂,X₃)∼Multinomial(n=10; p₁=0.2,p₂=0.3,p₃=0.5), find Cov(X₁,X₂).",
      "options": [],
      "acceptedAnswers": ["-0.6", "-.6", "−0.6", "-3/5"],
      "correctAnswer": "−0.6",
      "explanation": "Different category counts compete within the same n trials, so Cov(Xᵢ,Xⱼ)=−npᵢpⱼ. Here −10·0.2·0.3=−0.6.",
      "sources": [{"sourceId": "course-slides-w1-2", "locator": "PDF page 37, Multinomial distribution"}]
    },
    {
      "id": "wk01-02-034",
      "type": "multiple-choice",
      "topic": "Normal distribution",
      "difficulty": "intro",
      "prompt": "If X has a normal distribution, what is P(X=60) exactly?",
      "options": [
        {"id": "a", "text": "0"},
        {"id": "b", "text": "0.5"},
        {"id": "c", "text": "1"},
        {"id": "d", "text": "It equals the density f(60)."}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "The normal distribution is absolutely continuous, so every single point has probability zero, even when the point is the mean.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 38, Gaussian distribution"},
        {"sourceId": "course-worksheet-2", "locator": "PDF page 1, Exercise 4(a.1)"},
        {"sourceId": "nist-normal", "locator": "normal probability density and cumulative distribution"}
      ]
    },
    {
      "id": "wk01-02-035",
      "type": "numeric-input",
      "topic": "Normal distribution",
      "difficulty": "intro",
      "prompt": "Let X∼N(60,12²). What z-score corresponds to x=72?",
      "options": [],
      "acceptedAnswers": ["1", "1.0", "+1"],
      "correctAnswer": "1",
      "explanation": "Standardize with z=(x−μ)/σ=(72−60)/12=1.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 38, Gaussian distribution"},
        {"sourceId": "course-worksheet-2", "locator": "PDF page 1, Exercise 4"},
        {"sourceId": "nist-normal", "locator": "parameters and standardized distance"}
      ]
    },
    {
      "id": "wk01-02-036",
      "type": "numeric-input",
      "topic": "Exponential distribution",
      "difficulty": "core",
      "prompt": "A waiting time X has an exponential distribution with rate λ=0.5. Find P(X>2). Give four decimal places.",
      "options": [],
      "acceptedAnswers": ["0.3679", ".3679", "e^-1", "e⁻¹", "1/e", "36.79%"],
      "correctAnswer": "e⁻¹ ≈ 0.3679",
      "explanation": "For an exponential rate λ, P(X>t)=e^(−λt). At t=2 and λ=0.5 this is e⁻¹≈0.3679.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 39, Exponential distribution"},
        {"sourceId": "nist-exponential", "locator": "PDF/CDF formulas; NIST uses scale β=1/λ"}
      ]
    },
    {
      "id": "wk01-02-037",
      "type": "multiple-choice",
      "topic": "Gamma distribution",
      "difficulty": "core",
      "prompt": "If X∼Gamma(shape κ=3, scale θ=2), which pair is (E(X), Var(X))?",
      "options": [
        {"id": "a", "text": "(6, 12)"},
        {"id": "b", "text": "(1.5, 0.75)"},
        {"id": "c", "text": "(6, 6)"},
        {"id": "d", "text": "(3, 4)"}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "With shape-scale parameterization, E(X)=κθ=6 and Var(X)=κθ²=3·4=12. Setting κ=1 gives an exponential distribution with rate 1/θ.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 40, Gamma distribution"},
        {"sourceId": "nist-gamma", "locator": "shape-scale PDF, mean, variance, and exponential special case"}
      ]
    },
    {
      "id": "wk01-02-038",
      "type": "multiple-choice",
      "topic": "Characteristic functions",
      "difficulty": "intro",
      "prompt": "Which formula defines the characteristic function of a real-valued random variable X?",
      "options": [
        {"id": "a", "text": "φ_X(t)=E[e^(itX)]"},
        {"id": "b", "text": "φ_X(t)=P(X=t)"},
        {"id": "c", "text": "φ_X(t)=E[tX]"},
        {"id": "d", "text": "φ_X(t)=F_X(t)²"}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "The characteristic function is φ_X(t)=E[e^(itX)]=E[cos(tX)]+iE[sin(tX)]. It exists for every real t because |e^(itX)|=1.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 41, Definition 4.1"},
        {"sourceId": "mit-characteristic-functions", "locator": "Lecture slide 22 in the PDF"}
      ]
    },
    {
      "id": "wk01-02-039",
      "type": "multiple-choice",
      "topic": "Characteristic functions",
      "difficulty": "challenge",
      "prompt": "X and Y are independent with characteristic functions φ_X and φ_Y. What is the characteristic function of Z=2X+Y+3?",
      "options": [
        {"id": "a", "text": "φ_Z(t)=e^(i3t) φ_X(2t) φ_Y(t)"},
        {"id": "b", "text": "φ_Z(t)=3+2φ_X(t)+φ_Y(t)"},
        {"id": "c", "text": "φ_Z(t)=e^(i3t)[φ_X(2t)+φ_Y(t)]"},
        {"id": "d", "text": "φ_Z(t)=φ_X(t)²φ_Y(t)³"}
      ],
      "acceptedAnswers": ["a"],
      "correctAnswer": "a",
      "explanation": "An affine change gives φ_(aX+b)(t)=e^(ibt)φ_X(at), and independence turns a sum into a product. Combining both yields e^(i3t)φ_X(2t)φ_Y(t).",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF pages 42–43, affine transforms and independent sums"},
        {"sourceId": "mit-characteristic-functions", "locator": "Lecture slide 22 in the PDF"}
      ]
    },
    {
      "id": "wk01-02-040",
      "type": "numeric-input",
      "topic": "Characteristic functions",
      "difficulty": "challenge",
      "prompt": "Assume E(X²)<∞ and the characteristic function satisfies φ_X''(0)=−8. What is E(X²)?",
      "options": [],
      "acceptedAnswers": ["8", "8.0"],
      "correctAnswer": "8",
      "explanation": "Differentiating φ_X(t)=E[e^(itX)] twice at 0 gives φ_X''(0)=i²E(X²)=−E(X²). Therefore E(X²)=8.",
      "sources": [
        {"sourceId": "course-slides-w1-2", "locator": "PDF page 43, moments from derivatives; corrected identity described in editorialNotes"},
        {"sourceId": "mit-characteristic-functions", "locator": "Lecture slide 22 in the PDF, moment derivative identity"}
      ]
    }
  ]
};
