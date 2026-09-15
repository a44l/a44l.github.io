# Weeks 1–2 live exercises

A standalone practice page for the Statistical Inference course, hosted at
`/slides/si-2026/weeks-1-2/exercises/` and linked from `teaching.md` and `ensino.md`.

## Edit

- `index.html`: page wording, course navigation, and screen layout.
- `js/exercises-bank-0.js`: the 40 Lecture 1 questions, restricted to slides 12–41.
- `js/exercises-week-1-2.js`: the 40 questions, answer keys, explanations, and source notes.
- `js/live-exercises.js`: session selection, answer checking, scoring, and browser storage.
- `css/styles.css`: typography, colours, spacing, and mobile layout.

The first choice, **Lecture 1 (Bank 0)**, covers the mathematical content of
slides 12–41 of the neighbouring lecture deck. The title is counted as slide 1;
Lecture 2 starts at slide 42. Every new question has a slide number and a stable
slide anchor in its source record, and its explanation links to that slide in a
new tab. The source record also includes a hash of the deck used when authoring.
Proof-completion questions include a `context` array with the theorem and the
preceding proof steps; the page displays these above the missing-step question.
Other questions can use the same field for a short setup. Each context entry has
a `label` and plain-text `text` (newlines are preserved).

The second choice, **Weeks 1–2**, retains the original 40 questions for a wider
review, including material from later lectures. Each session contains eight
unique questions from the selected bank only, balancing topics and difficulties.
Lecture 1 is the default. Use “Change practice set” after a session to switch.

Answers and progress stay in the browser; no server API or accounts are required.
The existing Weeks 1–2 best score and session count retain the
`statistical-inference-2026-practice` localStorage key. Lecture 1 uses the separate
`statistical-inference-2026-practice-lecture-1` key. Progress is specific to the
browser and website origin.

## Preview and publish

The HTML has no Jekyll front matter and is copied as a static file by the normal
site build. It needs no additional gems, npm packages, or configuration changes.
Build the website normally with `bundle exec jekyll build`, then serve `_site`
with a local HTTP server to test the Teaching links as well as the exercises:

```bash
python3 -m http.server 8767 --bind 127.0.0.1 --directory _site
```

Open `http://127.0.0.1:8767/slides/si-2026/weeks-1-2/exercises/`.
The exercises also work by opening this directory's `index.html` directly.
The link back to Teaching requires the built `teaching.html` in that case.
Publish with the website's usual GitHub Pages workflow.

All exercise scripts, styles, fonts, and icons are local. The source notes in the
question-bank file retain reference URLs; those documents are not fetched while
playing. The lecture link points to the neighbouring Weeks 1–2 slide deck.
