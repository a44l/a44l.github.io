(() => {
  "use strict";

  const app = document.querySelector("[data-practice-app]");
  if (!app) return;

  const banks = [
    window.BANK_0_EXERCISE_BANK,
    window.LECTURE_2_EXERCISE_BANK,
    window.WEEK_1_2_EXERCISE_BANK,
  ].filter(
    (candidate) => candidate && candidate.block &&
      Array.isArray(candidate.exercises) && candidate.exercises.length === 40,
  );
  const banksById = new Map(banks.map((candidate) => [candidate.block.id, candidate]));
  let bank = banks[0];

  const SESSION_SIZE = 8;
  const STORAGE_KEY = "statistical-inference-2026-practice";
  const screens = Object.fromEntries(
    [...app.querySelectorAll("[data-practice-screen]")].map((screen) => [
      screen.dataset.practiceScreen,
      screen,
    ]),
  );
  const startButtons = [...app.querySelectorAll("[data-start-session]")];
  const welcomeStartButton = screens.welcome.querySelector("[data-start-session]");
  const bankButtons = [...app.querySelectorAll("[data-select-bank]")];
  const selectedBankLabel = app.querySelector("[data-selected-bank]");
  const bestScore = app.querySelector("[data-best-score]");
  const bankSize = app.querySelector("[data-bank-size]");
  const topicsList = app.querySelector("[data-practice-topics]");
  const counter = app.querySelector("[data-question-counter]");
  const topic = app.querySelector("[data-question-topic]");
  const type = app.querySelector("[data-question-type]");
  const prompt = app.querySelector("[data-question-prompt]");
  const questionContext = app.querySelector("[data-question-context]");
  const instruction = app.querySelector("[data-question-instruction]");
  const answerArea = app.querySelector("[data-answer-area]");
  const checkButton = app.querySelector("[data-check-answer]");
  const nextButton = app.querySelector("[data-next-question]");
  const endButton = app.querySelector("[data-end-session]");
  const score = app.querySelector("[data-score]");
  const streak = app.querySelector("[data-streak]");
  const progress = app.querySelector("[data-progress]");
  const progressFill = app.querySelector("[data-progress-fill]");
  const feedback = app.querySelector("[data-feedback]");
  const feedbackTitle = app.querySelector("[data-feedback-title]");
  const feedbackExplanation = app.querySelector("[data-feedback-explanation]");
  const questionSource = app.querySelector("[data-question-source]");
  const finalScore = app.querySelector("[data-final-score]");
  const finalPoints = app.querySelector("[data-final-points]");
  const finalBestStreak = app.querySelector("[data-final-best-streak]");
  const totalSessions = app.querySelector("[data-total-sessions]");
  const resultMessage = app.querySelector("[data-result-message]");
  const resultBlock = app.querySelector("[data-result-block]");
  const reviewButton = app.querySelector("[data-review-block]");
  const sourceBlock = document.querySelector("[data-source-block]");
  const sourceReview = document.querySelector("[data-source-review]");

  let state = null;

  const typeCopy = {
    "multiple-choice": {
      label: "Choose one",
      instruction: "Select the best answer.",
    },
    "find-the-intruder": {
      label: "Find the intruder",
      instruction: "Select the one statement that does not meet the definition.",
    },
    "proof-step": {
      label: "Proof idea",
      instruction: "Choose the step that completes the argument.",
    },
    "numeric-input": {
      label: "Quick calculation",
      instruction: "Enter a concise numerical answer. Decimals, fractions, and percentages are accepted when appropriate.",
    },
  };

  // Keep the established Weeks 1–2 key so existing scores remain available.
  const storageKeyFor = (activeBank) => activeBank.block.id === "weeks-1-2"
    ? STORAGE_KEY : `${STORAGE_KEY}-${activeBank.block.id}`;

  const readProgress = (activeBank = bank) => {
    try {
      const value = JSON.parse(window.localStorage.getItem(storageKeyFor(activeBank)));
      return {
        best: value && Number.isInteger(value.best) ? value.best : 0,
        sessions: value && Number.isInteger(value.sessions) ? value.sessions : 0,
      };
    } catch {
      return { best: 0, sessions: 0 };
    }
  };

  const writeProgress = (activeBank, value) => {
    try {
      window.localStorage.setItem(storageKeyFor(activeBank), JSON.stringify(value));
    } catch {
      // The exercise still works when storage is blocked or unavailable.
    }
  };

  const updateBestScore = () => {
    const saved = readProgress();
    bestScore.textContent = saved.sessions ? `${saved.best}/8` : "—";
  };

  const updateBankDetails = () => {
    bankButtons.forEach((button) => {
      const selected = button.dataset.selectBank === bank.block.id;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    selectedBankLabel.textContent = bank.block.title;
    bankSize.textContent = String(bank.exercises.length);
    welcomeStartButton.textContent = `Start ${bank.block.title} session`;
    resultBlock.textContent = bank.block.title;
    reviewButton.textContent = "Review lecture slides";
    reviewButton.href = bank.block.reviewHref || "../index.html";
    sourceReview.href = reviewButton.href;

    topicsList.replaceChildren();
    const featuredTopics = Array.isArray(bank.block.featuredTopics)
      ? bank.block.featuredTopics
      : [...new Set(bank.exercises.map((exercise) => exercise.topic))].slice(0, 6);
    featuredTopics.forEach((topicName) => {
      const chip = document.createElement("span");
      chip.textContent = topicName;
      topicsList.append(chip);
    });

    sourceBlock.textContent = `${bank.block.title} — ${bank.block.description}.`;
    updateBestScore();
  };

  const randomIndex = (maximum) => {
    if (window.crypto && window.crypto.getRandomValues) {
      const range = 0x100000000;
      const cutoff = range - (range % maximum);
      const values = new Uint32Array(1);
      do window.crypto.getRandomValues(values);
      while (values[0] >= cutoff);
      return values[0] % maximum;
    }
    return Math.floor(Math.random() * maximum);
  };

  const shuffle = (items) => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const other = randomIndex(index + 1);
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  };

  const chooseSession = (exercises) => {
    const targets = { intro: 2, core: 4, challenge: 2 };
    const chosen = [];
    const topicCounts = new Map();
    let numericCount = 0;

    const canAdd = (exercise) =>
      !chosen.some((item) => item.id === exercise.id) &&
      (topicCounts.get(exercise.topic) || 0) < 2 &&
      (exercise.type !== "numeric-input" || numericCount < 4);

    const add = (exercise) => {
      chosen.push(exercise);
      topicCounts.set(exercise.topic, (topicCounts.get(exercise.topic) || 0) + 1);
      if (exercise.type === "numeric-input") numericCount += 1;
    };

    const removeLast = () => {
      const exercise = chosen.pop();
      const remainingForTopic = (topicCounts.get(exercise.topic) || 1) - 1;
      if (remainingForTopic) topicCounts.set(exercise.topic, remainingForTopic);
      else topicCounts.delete(exercise.topic);
      if (exercise.type === "numeric-input") numericCount -= 1;
    };

    const difficultySlots = shuffle(
      Object.entries(targets).flatMap(([difficulty, count]) =>
        Array.from({ length: count }, () => difficulty),
      ),
    );
    const fillBalancedSession = (slotIndex = 0) => {
      if (slotIndex === difficultySlots.length) return true;
      const difficulty = difficultySlots[slotIndex];
      const candidates = shuffle(
        exercises.filter(
          (exercise) => exercise.difficulty === difficulty && canAdd(exercise),
        ),
      );

      for (const exercise of candidates) {
        add(exercise);
        if (fillBalancedSession(slotIndex + 1)) return true;
        removeLast();
      }
      return false;
    };

    if (fillBalancedSession()) return shuffle(chosen);

    // Defensive fallback for an incomplete or unusually constrained future bank.
    for (const exercise of shuffle(exercises)) {
      if (chosen.length >= SESSION_SIZE) break;
      if (canAdd(exercise)) add(exercise);
    }

    for (const exercise of shuffle(exercises)) {
      if (chosen.length >= SESSION_SIZE) break;
      if (!chosen.some((item) => item.id === exercise.id)) add(exercise);
    }

    return shuffle(chosen);
  };

  const showScreen = (name) => {
    Object.entries(screens).forEach(([key, screen]) => {
      screen.hidden = key !== name;
    });
  };

  const normalizeAnswer = (value) =>
    value
      .trim()
      .toLocaleLowerCase()
      .replace(/−/g, "-")
      .replace(/–/g, "-")
      .replace(/,/g, ".")
      .replace(/\s+/g, "");

  const parseNumericAnswer = (value) => {
    const superscriptDigits = {
      "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
      "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
    };
    let normalized = normalizeAnswer(value)
      .replace(/⁻/g, "-")
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (digit) => superscriptDigits[digit]);
    let scale = 1;

    if (normalized.endsWith("%")) {
      normalized = normalized.slice(0, -1);
      scale = 0.01;
    }

    const fraction = normalized.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\/([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/);
    if (fraction) {
      const denominator = Number(fraction[2]);
      return denominator === 0 ? null : (Number(fraction[1]) / denominator) * scale;
    }

    if (normalized === "1/e") return (1 / Math.E) * scale;
    const exponential = normalized.match(/^e\^\(?([+-]?(?:\d+(?:\.\d*)?|\.\d+))\)?$/);
    if (exponential) return Math.exp(Number(exponential[1])) * scale;

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed * scale : null;
  };

  const numericallyEqual = (left, right) => {
    if (left === null || right === null) return false;
    const tolerance = 1e-6 * Math.max(1, Math.abs(left), Math.abs(right));
    return Math.abs(left - right) <= tolerance;
  };

  const renderOptions = (exercise) => {
    const optionType = exercise.type === "numeric-input" ? null : "radio";
    if (!optionType) {
      const wrap = document.createElement("div");
      wrap.className = "exercise-number-wrap";

      const input = document.createElement("input");
      input.className = "exercise-number";
      input.type = "text";
      input.inputMode = "decimal";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.placeholder = "Your answer";
      input.setAttribute("aria-label", "Your numerical answer");
      input.addEventListener("input", () => {
        checkButton.disabled = input.value.trim() === "";
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !checkButton.disabled) checkButton.click();
      });

      const unit = document.createElement("span");
      unit.className = "exercise-number-unit";
      unit.textContent = "number";
      wrap.append(input, unit);
      answerArea.append(wrap);
      window.requestAnimationFrame(() => input.focus({ preventScroll: true }));
      return;
    }

    shuffle(exercise.options).forEach((option, index) => {
      const label = document.createElement("label");
      label.className = "exercise-option";
      label.dataset.optionId = option.id;

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "exercise-answer";
      input.value = option.id;
      input.addEventListener("change", () => {
        answerArea.querySelectorAll(".exercise-option").forEach((item) => {
          item.classList.toggle("is-selected", item.querySelector("input").checked);
        });
        checkButton.disabled = false;
      });

      const marker = document.createElement("span");
      marker.className = "exercise-option-marker";
      marker.textContent = String.fromCharCode(65 + index);

      const text = document.createElement("span");
      text.className = "exercise-option-text";
      text.textContent = option.text;
      label.append(input, marker, text);
      answerArea.append(label);
    });
    const firstOption = answerArea.querySelector('input[type="radio"]');
    window.requestAnimationFrame(() => firstOption.focus({ preventScroll: true }));
  };

  const updateSessionDisplay = () => {
    score.textContent = String(state.points);
    streak.textContent = String(state.streak);
    const completed = state.index;
    progress.setAttribute("aria-valuenow", String(completed));
    progressFill.style.width = `${(completed / SESSION_SIZE) * 100}%`;
  };

  const renderQuestion = () => {
    const exercise = state.questions[state.index];
    const copy = typeCopy[exercise.type] || typeCopy["multiple-choice"];
    state.locked = false;

    counter.textContent = `Exercise ${state.index + 1} of ${SESSION_SIZE}`;
    topic.textContent = `${exercise.topic} · ${exercise.difficulty}`;
    type.textContent = copy.label;
    prompt.textContent = exercise.prompt;
    questionContext.replaceChildren();
    (exercise.context || []).forEach((entry) => {
      const block = document.createElement("div");
      const label = document.createElement("strong");
      label.textContent = entry.label;
      const text = document.createElement("p");
      text.textContent = entry.text;
      block.append(label, text);
      questionContext.append(block);
    });
    questionContext.hidden = !questionContext.childNodes.length;
    instruction.textContent = copy.instruction;
    answerArea.replaceChildren();
    feedback.hidden = true;
    feedback.classList.remove("is-incorrect");
    questionSource.replaceChildren();
    questionSource.hidden = true;
    nextButton.hidden = true;
    checkButton.hidden = false;
    checkButton.disabled = true;
    updateSessionDisplay();
    renderOptions(exercise);
  };

  const selectedAnswer = (exercise) => {
    if (exercise.type === "numeric-input") {
      const input = answerArea.querySelector("input");
      return input ? input.value : "";
    }
    const input = answerArea.querySelector("input:checked");
    return input ? input.value : "";
  };

  const isCorrect = (exercise, answer) => {
    if (exercise.type !== "numeric-input") return answer === exercise.correctAnswer;
    const normalized = normalizeAnswer(answer);
    if (exercise.acceptedAnswers.some((accepted) => normalizeAnswer(accepted) === normalized)) return true;

    const parsed = parseNumericAnswer(answer);
    return exercise.acceptedAnswers.some((accepted) =>
      numericallyEqual(parsed, parseNumericAnswer(accepted)),
    );
  };

  const revealOptionAnswer = (exercise, answer) => {
    answerArea.querySelectorAll(".exercise-option").forEach((option) => {
      const input = option.querySelector("input");
      input.disabled = true;
      option.classList.remove("is-selected");
      option.classList.toggle("is-correct", option.dataset.optionId === exercise.correctAnswer);
      option.classList.toggle(
        "is-incorrect",
        option.dataset.optionId === answer && answer !== exercise.correctAnswer,
      );
    });
  };

  const checkAnswer = () => {
    if (!state || state.locked) return;
    const exercise = state.questions[state.index];
    const answer = selectedAnswer(exercise);
    if (!answer.trim()) return;
    state.locked = true;

    const correct = isCorrect(exercise, answer);
    if (correct) {
      state.correct += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      state.points += 100 + Math.min(state.streak - 1, 4) * 20;
    } else {
      state.streak = 0;
    }

    if (exercise.type === "numeric-input") {
      answerArea.querySelector("input").disabled = true;
    } else {
      revealOptionAnswer(exercise, answer);
    }

    const displayAnswer = exercise.type === "numeric-input"
      ? exercise.correctAnswer
      : exercise.options.find((option) => option.id === exercise.correctAnswer).text;
    feedbackTitle.textContent = correct ? "Correct — keep going!" : `Not quite. Answer: ${displayAnswer}`;
    feedbackExplanation.textContent = exercise.explanation;
    (exercise.sources || []).forEach((source) => {
      const reference = state.bank.sourceCatalog[source.sourceId];
      if (!reference || !Number.isInteger(source.slide) || !source.anchor) return;
      const link = document.createElement("a");
      const url = new URL(reference.url, document.baseURI);
      url.hash = `/${source.anchor}`;
      link.href = url.href;
      link.textContent = `Review slide ${source.slide}`;
      link.target = "_blank";
      link.rel = "noopener";
      if (questionSource.childNodes.length) questionSource.append(" · ");
      questionSource.append(link);
      questionSource.hidden = false;
    });
    feedback.classList.toggle("is-incorrect", !correct);
    feedback.hidden = false;
    checkButton.hidden = true;
    nextButton.hidden = false;
    nextButton.textContent = state.index === SESSION_SIZE - 1 ? "See results" : "Continue";

    score.textContent = String(state.points);
    streak.textContent = String(state.streak);
    progress.setAttribute("aria-valuenow", String(state.index + 1));
    progressFill.style.width = `${((state.index + 1) / SESSION_SIZE) * 100}%`;
    feedback.focus({ preventScroll: true });
  };

  const finishSession = () => {
    const saved = readProgress(state.bank);
    const updated = {
      best: Math.max(saved.best, state.correct),
      sessions: saved.sessions + 1,
    };
    writeProgress(state.bank, updated);

    finalScore.textContent = String(state.correct);
    finalPoints.textContent = String(state.points);
    finalBestStreak.textContent = String(state.bestStreak);
    totalSessions.textContent = String(updated.sessions);
    if (state.correct === 8) {
      resultMessage.textContent = "Perfect session. You connected every idea in this set.";
    } else if (state.correct >= 6) {
      resultMessage.textContent = "Strong session. The foundations are settling into place.";
    } else if (state.correct >= 4) {
      resultMessage.textContent = "Good progress. Read the explanations once more and try a fresh set.";
    } else {
      resultMessage.textContent = "This is how fluency starts: small attempts, immediate feedback, and another round.";
    }
    updateBestScore();
    showScreen("results");
    const resultsHeading = screens.results.querySelector("h2");
    if (resultsHeading && typeof resultsHeading.focus === "function") resultsHeading.focus();
    window.scrollTo({ top: screens.results.offsetTop - 80, behavior: "smooth" });
  };

  const nextQuestion = () => {
    if (state.index >= SESSION_SIZE - 1) {
      finishSession();
      return;
    }
    state.index += 1;
    renderQuestion();
    window.scrollTo({ top: screens.question.offsetTop - 80, behavior: "smooth" });
  };

  const startSession = () => {
    if (!bank || !Array.isArray(bank.exercises) || bank.exercises.length < SESSION_SIZE) return;
    state = {
      bank,
      questions: chooseSession(bank.exercises),
      index: 0,
      correct: 0,
      points: 0,
      streak: 0,
      bestStreak: 0,
      locked: false,
    };
    showScreen("question");
    renderQuestion();
    window.scrollTo({ top: screens.question.offsetTop - 80, behavior: "smooth" });
  };

  const exitSession = () => {
    state = null;
    showScreen("welcome");
    updateBestScore();
    welcomeStartButton.focus();
  };

  bankButtons.forEach((button) => {
    button.disabled = !banksById.has(button.dataset.selectBank);
    button.addEventListener("click", () => {
      if (screens.welcome.hidden || button.disabled) return;
      bank = banksById.get(button.dataset.selectBank);
      updateBankDetails();
    });
  });

  if (!bank) {
    const lead = app.querySelector(".practice-lead");
    lead.textContent = "The exercises could not be loaded. Please reload this page and try again.";
    startButtons.forEach((button) => {
      button.disabled = true;
    });
    return;
  }

  startButtons.forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", startSession);
  });
  checkButton.addEventListener("click", checkAnswer);
  nextButton.addEventListener("click", nextQuestion);
  endButton.addEventListener("click", exitSession);
  app.querySelector("[data-choose-practice]").addEventListener("click", exitSession);
  updateBankDetails();
})();
