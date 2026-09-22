/* Small, accessible SVG diagrams; no chart library or external image requests.
 * Edit the `visual` data on each question, not the drawing coordinates here.
 * All essential data must also appear in the question's ordinary text.
 */
(() => {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const narrowScreen = window.matchMedia("(max-width: 767px)");
  let activeDiagram = null;
  let diagramCount = 0;
  narrowScreen.addEventListener("change", () => {
    if (activeDiagram && !activeDiagram.container.hidden) {
      window.renderExerciseVisual(activeDiagram.container, activeDiagram.data);
    }
  });
  const element = (tag, attributes = {}, text) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const number = (value) => {
    const rounded = Math.round(value * 1000) / 1000;
    const approximate = Math.abs(value - rounded) > 1e-10 ? "≈" : "";
    return approximate + rounded.toLocaleString(document.documentElement.lang, { maximumFractionDigits: 3 });
  };

  window.renderExerciseVisual = (container, data) => {
    container.replaceChildren();
    container.hidden = true;
    if (!data || !["bars", "points", "trials", "timeline", "normal"].includes(data.kind)) return;
    activeDiagram = { container, data };
    diagramCount += 1;
    const id = `exercise-diagram-${diagramCount}`;
    const width = narrowScreen.matches ? 480 : 640;
    const svg = element("svg", {
      viewBox: `0 0 ${width} 300`, role: "img",
      "aria-labelledby": `${id}-title ${id}-description`, focusable: "false",
    });
    svg.append(element("title", { id: `${id}-title` }, data.title));
    svg.append(element("desc", { id: `${id}-description` }, data.description));
    const draw = (tag, attributes, text) => {
      const node = element(tag, attributes, text);
      svg.append(node);
      return node;
    };
    const line = (x1, y1, x2, y2, style = "visual-axis") =>
      draw("line", { x1, y1, x2, y2, class: style });
    const label = (x, y, text, anchor = "middle") =>
      draw("text", { x, y, "text-anchor": anchor }, text);
    const left = 76, right = width - 34, top = 52, bottom = 220;

    if (data.kind === "bars") {
      const max = Math.max(...data.values, 0.001);
      const ceiling = max <= 1 ? 1 : Math.ceil(max);
      const y = (value) => bottom - value / ceiling * (bottom - top);
      [0, ceiling / 2, ceiling].forEach((tick) => {
        line(left, y(tick), right, y(tick), tick === 0 ? "visual-axis" : "visual-guide");
        label(left - 12, y(tick) + 6, number(tick), "end");
      });
      line(left, top, left, bottom);
      const step = (right - left) / data.values.length;
      data.values.forEach((value, index) => {
        const x = left + step * (index + 0.5);
        draw("rect", { x: x - step * 0.29, y: y(value), width: step * 0.58, height: bottom - y(value), rx: 4, class: "visual-fill" });
        label(x, y(value) - 10, number(value));
        label(x, bottom + 26, data.labels[index]);
      });
      label(left, 30, data.yLabel, "start");
      label((left + right) / 2, 281, data.xLabel);
    }

    if (data.kind === "points") {
      const xs = data.points.map((point) => point[0]);
      const ys = data.points.map((point) => point[1]);
      const minX = Math.min(...xs, 0) - 0.5, maxX = Math.max(...xs, 0) + 0.5;
      const minY = Math.min(...ys, 0) - 0.25, maxY = Math.max(...ys, 0) + 0.5;
      const x = (value) => left + (value - minX) / (maxX - minX) * (right - left);
      const y = (value) => bottom - (value - minY) / (maxY - minY) * (bottom - top);
      line(left, y(0), right, y(0));
      line(x(0), top, x(0), bottom);
      [...new Set(xs)].forEach((value) => {
        line(x(value), y(0) - 4, x(value), y(0) + 4);
        label(x(value), bottom + 25, number(value));
      });
      [...new Set(ys)].forEach((value) => {
        line(left, y(value), right, y(value), "visual-guide");
        label(left - 12, y(value) + 6, number(value), "end");
      });
      data.points.forEach(([px, py]) => {
        draw("circle", { cx: x(px), cy: y(py), r: 7, class: "visual-fill" });
        label(x(px), y(py) - 17, `(${number(px)}; ${number(py)})`);
      });
      label(left, 30, data.yLabel, "start");
      label((left + right) / 2, 281, data.xLabel);
    }

    if (data.kind === "trials") {
      // Each split column is a trial's probability model, NOT a realised outcome.
      const step = (right - left) / data.count;
      const height = bottom - top;
      for (let index = 0; index < data.count; index += 1) {
        const x = left + step * index + step * 0.12;
        const width = step * 0.76;
        draw("rect", { x, y: top, width, height, rx: 5, class: "visual-soft" });
        draw("rect", { x, y: bottom - height * data.p, width, height: height * data.p, class: "visual-fill" });
        label(x + width / 2, bottom + 28, String(index + 1));
      }
      label(left - 12, top + 6, "1", "end");
      label(left - 12, bottom + 6, "0", "end");
      line(left - 5, top, left - 5, bottom);
      line(left - 5, bottom - height * data.p, right, bottom - height * data.p, "visual-guide");
      label(left - 12, bottom - height * data.p + 6, number(data.p), "end");
    }

    if (data.kind === "timeline") {
      const x = (value) => left + (value - data.start) / (data.end - data.start) * (right - left);
      const y = 158;
      line(left, y, right, y);
      draw("path", { d: `M ${right - 10} ${y - 6} L ${right} ${y} L ${right - 10} ${y + 6}`, class: "visual-curve" });
      (data.segments || []).forEach((segment, index) => {
        const sy = 70 + index * 38;
        line(x(segment.from), sy, x(segment.to), sy, "visual-curve");
        line(x(segment.from), sy - 5, x(segment.from), sy + 5);
        line(x(segment.to), sy - 5, x(segment.to), sy + 5);
        label((x(segment.from) + x(segment.to)) / 2, sy - 12, segment.label);
      });
      (data.marks || []).forEach((mark) => {
        line(x(mark.value), y - 10, x(mark.value), y + 10);
        label(x(mark.value), y + 34, mark.label, mark.value === data.end ? "end" : "middle");
      });
      label((left + right) / 2, 248, data.xLabel);
    }

    if (data.kind === "normal") {
      const min = data.mean - 3.5 * data.sd, max = data.mean + 3.5 * data.sd;
      const x = (value) => left + (value - min) / (max - min) * (right - left);
      const density = (value) => Math.exp(-0.5 * ((value - data.mean) / data.sd) ** 2) / (data.sd * Math.sqrt(2 * Math.PI));
      const peak = density(data.mean);
      const y = (value) => bottom - density(value) / peak * (bottom - top);
      const curve = (from, to) => Array.from({ length: 141 }, (_, index) => {
        const value = from + (to - from) * index / 140;
        return `${index ? "L" : "M"} ${x(value)} ${y(value)}`;
      }).join(" ");
      if (data.shadeFrom !== undefined || data.shadeTo !== undefined) {
        const from = Math.max(min, data.shadeFrom === undefined ? min : data.shadeFrom);
        const to = Math.min(max, data.shadeTo === undefined ? max : data.shadeTo);
        if (from < to) draw("path", { d: `${curve(from, to)} L ${x(to)} ${bottom} L ${x(from)} ${bottom} Z`, class: "visual-soft" });
      }
      line(left, bottom, right, bottom);
      draw("path", { d: curve(min, max), class: "visual-curve" });
      (data.marks || []).forEach((mark) => {
        line(x(mark.value), y(mark.value), x(mark.value), bottom, "visual-guide");
        line(x(mark.value), bottom - 4, x(mark.value), bottom + 4);
        label(x(mark.value), bottom + 28, mark.label);
      });
      label((left + right) / 2, 281, data.xLabel);
    }

    container.append(svg);
    if (data.kind === "trials") {
      const key = document.createElement("p");
      key.className = "visual-key";
      key.textContent = `${data.labelSuccess}: ${number(data.p)} · ${data.labelFailure}: ${number(1 - data.p)}`;
      container.append(key);
    }
    const caption = document.createElement("figcaption");
    const title = document.createElement("strong");
    title.textContent = data.title;
    caption.append(title, document.createTextNode(data.caption));
    container.append(caption);
    container.hidden = false;
  };
})();
