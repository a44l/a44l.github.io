# Weeks 1–2 live exercises

A standalone practice page for the Statistical Inference course, hosted at
`/slides/si-2026/weeks-1-2/exercises/` and linked from `teaching.md`.
`ensino.md` links to the European Portuguese version at
`/slides/si-2026/weeks-1-2/exercises/pt/`. Both versions offer all five banks.

## Edit

- `index.html`: page wording, course navigation, and screen layout.
- `js/exercises-bank-0.js`: the 40 Lecture 1 questions, restricted to slides 12–41.
- `js/exercises-lecture-2.js`: the 40 Lecture 2 questions, answer keys, explanations, and slide references.
- `js/exercises-lecture-3.js`: the 40 Lecture 3 questions (slides 72–114), with diagram data, explanations and slide references.
- `js/exercises-lecture-4.js`: the 40 Lecture 4 questions (slides 115–140), including multiple-answer convergence classifications.
- `js/exercises-week-1-2.js`: the original 40-question full Weeks 1–2 review.
- `js/exercise-visuals.js`: accessible SVG diagrams generated locally from each question's `visual` field.
- `js/math-rendering.js`: safe, local rendering of explicitly delimited LaTeX in question text, context, choices, and feedback.
- `js/live-exercises.js`: session selection, answer checking, scoring, and browser storage.
- `css/styles.css`: typography, colours, spacing, and mobile layout.
- `pt/index.html`: Portuguese page text, navigation, and screen layout.
- `pt/js/exercises-bank-0.js`: all 40 Lecture 1 questions in Portuguese.
- `pt/js/exercises-lecture-2.js`: all 40 Lecture 2 questions in Portuguese.
- `pt/js/exercises-lecture-3.js`: all 40 Lecture 3 questions and diagram labels in Portuguese.
- `pt/js/exercises-lecture-4.js`: all 40 Lecture 4 questions and diagram labels in Portuguese.
- `pt/js/exercises-week-1-2.js`: all 40 full-review questions in Portuguese.
- `pt/js/interface-pt.js`: Portuguese messages, input labels, and feedback.

The Portuguese banks are complete, editable JavaScript files, not an automatic
translation service. They retain the English IDs, answer keys, accepted numerical
answers, difficulty levels, and question types. Edit the matching files when
changing a question in both languages. The pages share the same engine, CSS,
fonts, and icons; no translation API or network connection is needed to play.
Decimal commas and decimal points are both accepted by the shared answer checker.

Portuguese proof exercises include the full theorem and preceding steps. The
three older full-review proof exercises received explicit context in Portuguese;
the probability space in question 001 and the joint table in question 013 were
also made explicit, without changing the answers. English questions are untouched.

Every Portuguese question links to a supporting slide in the local Portuguese
deck. Original external references in the full-review bank are retained as
bibliographic metadata; those source documents have not themselves been translated.
The Portuguese Lecture 2 selector uses slides 42–70, matching the current deck
with its additional proof slide. Its questions are translations of the same
40 English Lecture 2 exercises, not an expanded or mixed bank.

The first choice, **Lecture 1 (Bank 0)**, covers the mathematical content of
slides 12–41 of the neighbouring lecture deck. The title is counted as slide 1;
Lecture 2 starts at slide 42. Every new question has a slide number and a stable
slide anchor in its source record, and its explanation links to that slide in a
new tab. The source record also includes a hash of the deck used when authoring.
Proof-completion questions include a `context` array with the theorem and the
preceding proof steps; the page displays these above the missing-step question.
Other questions can use the same field for a short setup. Each context entry has
a `label` and `text` (newlines are preserved; mathematical expressions can use
the LaTeX delimiters described below).

The second choice, **Lecture 2**, covers slides 42–69 of the current neighbouring
deck (slide 42 is the section title). It covers joint CDFs, marginals, conditional
probability, event and random-variable independence, generated σ-algebras, joint
and conditional PMFs and densities, and the optional Bayes/Worksheet 1 recap.
It does not include expectation, covariance, or transforms from later lectures.
Its proof questions also state the theorem, assumptions, and preceding proof
steps. Every question has an explanation and links to its supporting slide(s).
Slide numbers describe the deck used during authoring; stable anchors keep links
working if earlier slides are added. Check the ranges if the deck is reorganised.

The third choice, **Lecture 3**, covers slides 72–114 of the deck checked on
22 September 2026. Topics include expectation, moments, variance, covariance,
tail and quantile formulas, binomial/multinomial/Poisson/exponential/normal/gamma
models, moment-generating functions and characteristic functions. Word problems
state their modelling assumptions; gamma parameters are explicitly shape and
scale. Proof exercises include the theorem and the preceding argument. The bank
does not assume material from Lecture 4.

Its optional `visual` objects support `bars`, `points`, `trials`, `timeline` and
`normal` diagrams. Edit their numerical data and translated labels in the bank
files; the shared renderer handles layout. Each diagram has a descriptive SVG
title and description plus a visible caption. Essential data are also in the
question text. Trial columns show probabilities, not sampled outcomes; normal
curves are drawn from the specified mean and standard deviation. No external
image service, chart package or network request is used.

The fourth choice, **Lecture 4**, follows the rendered deck's slides 115–140
checked on 24 September 2026. It emphasises explicit sequences: shrinking errors,
rare spikes, powers of a uniform variable, alternating trajectories, independent
copies, the typewriter sequence and modifications. It also covers Markov bounds
(including Chebyshev as an explicitly derived corollary), dominated convergence,
CDFs, continuity sets, continuous mapping and Lévy's theorem. It does not assume
Borel–Cantelli, laws of large numbers or the central limit theorem.

Its `multiple-select` questions use checkboxes. All and only the IDs listed in
`correctAnswers` must be selected; each question still counts as one answer.
Question text specifies the target and whether conclusions actually hold or are
merely guaranteed by given assumptions. Diagrams additionally support `spikes`,
`powers`, `paths` and `typewriter`; selected finite terms illustrate a formula,
but are never treated as proof of an infinite sequence's behaviour.

Lecture 4 uses rendered LaTeX in both languages. Use `\(...\)` for inline
mathematics and `\[...\]` for a displayed formula. In JavaScript string literals,
escape each backslash, for example `"Compute \\(\\mathbb E[X]\\)."`.
The shared renderer inserts ordinary text safely and renders only explicitly
delimited mathematics; HTML in bank strings is not interpreted. MathJax is
already vendored in the neighbouring deck at
`../assets/vendor/mathjax/tex-svg-full.js`; nothing is fetched from a CDN.
The Lecture 4 questions have no blanket notation cards. Only necessary
construction context and the theorem/preceding argument for proof exercises
are retained. Grading still uses stable option IDs and plain numeric answers;
`answerDisplay` optionally gives a LaTeX version of a numeric answer for feedback.
Older banks' question content is unchanged by this formatting update.

The fifth choice, **Weeks 1–2**, retains the original 40 questions for a wider
review, including material from later lectures. Each session contains eight
unique questions from the selected bank only, balancing topics and difficulties.
Lecture 1 is the default. Use “Change practice set” after a session to switch.

Answers and progress stay in the browser; no server API or accounts are required.
The existing Weeks 1–2 best score and session count retain the
`statistical-inference-2026-practice` localStorage key. Lecture 1 uses the separate
`statistical-inference-2026-practice-lecture-1` key; Lecture 2 uses
`statistical-inference-2026-practice-lecture-2`; Lecture 3 uses
`statistical-inference-2026-practice-lecture-3`; Lecture 4 uses
`statistical-inference-2026-practice-lecture-4`. Selecting a lecture never mixes
in questions or scores from the other banks. Progress is specific to the browser
and website origin.

Changing language shares the selected bank's existing best score and session
count; changing banks keeps their progress separate. An unfinished session is
not saved when navigating to another page or language.

**Skip for now / Responder mais tarde** works in every bank. It moves the current
unanswered question to the end of the same eight-question session. Draft input
and checkbox selections are restored when it returns. Skipping does not change
points, streaks, completed-question progress or the session's question set. A
graded question cannot be skipped, and the last unanswered question's skip button
is disabled (it is already at the end). Completing a session still requires all
eight questions to be answered; repeated skips never count as completion.

## Preview and publish

The HTML has no Jekyll front matter and is copied as a static file by the normal
site build. It needs no additional gems, npm packages, or configuration changes.
Build the website normally with `bundle exec jekyll build`, then serve `_site`
with a local HTTP server to test the Teaching links as well as the exercises:

```bash
python3 -m http.server 8767 --bind 127.0.0.1 --directory _site
```

Open `http://127.0.0.1:8767/slides/si-2026/weeks-1-2/exercises/`.
For Portuguese, open
`http://127.0.0.1:8767/slides/si-2026/weeks-1-2/exercises/pt/`.
The exercises also work by opening this directory's `index.html` directly.
The link back to Teaching requires the built `teaching.html` in that case.
Publish with the website's usual GitHub Pages workflow.

All exercise scripts, styles, fonts, and icons are local. The source notes in the
question-bank file retain reference URLs; those documents are not fetched while
playing. The lecture link points to the neighbouring Weeks 1–2 slide deck.
