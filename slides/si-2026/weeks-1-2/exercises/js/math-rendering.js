/* Local MathJax; explicit TeX delimiters only. Plain text is never HTML. */
window.MathJax = {
  startup: { typeset: false },
  tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] },
  svg: { fontCache: "none" },
  options: { enableMenu: false },
};
(() => {
  "use strict";
  let pending = Promise.resolve();
  const formulaPattern = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  const set = (element, value) => {
    element.replaceChildren();
    const text = String(value);
    const pattern = new RegExp(formulaPattern.source, "g");
    let offset = 0;
    for (const match of text.matchAll(pattern)) {
      element.append(document.createTextNode(text.slice(offset, match.index)));
      const formula = document.createElement("span");
      const display = match[2] !== undefined;
      const tex = display ? match[2] : match[1];
      formula.className = "exercise-math";
      formula.dataset.display = String(display);
      formula.dataset.tex = tex;
      formula.setAttribute("aria-busy", "true");
      formula.textContent = match[0];
      element.append(formula);
      // Jobs own their spans: rapid skips cannot put an old formula in a new question.
      pending = pending.then(async () => {
        const math = window.MathJax;
        if (math.startup && math.startup.promise) await math.startup.promise;
        if (!formula.isConnected) return;
        const rendered = await math.tex2svgPromise(tex, { display });
        // Conversion alone does not install the SVG/assistive-MathML stylesheet.
        // Keep MathML available to screen readers without displaying it twice.
        math.startup.document.addStyleSheet();
        if (formula.isConnected) {
          formula.replaceChildren(rendered);
          formula.removeAttribute("aria-busy");
        }
      }).catch((error) => {
        formula.removeAttribute("aria-busy");
        formula.dataset.mathError = "true";
        console.error("Exercise formula could not be rendered", error);
      });
      offset = match.index + match[0].length;
    }
    element.append(document.createTextNode(text.slice(offset)));
  };
  window.ExerciseMath = { set, ready: () => pending };
})();
