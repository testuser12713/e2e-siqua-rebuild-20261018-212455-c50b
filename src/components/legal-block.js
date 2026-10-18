import { el, text } from "../lib/dom.js";

export function legalHeader({ eyebrow = "Rechtliches", title, intro, id } = {}) {
  const header = el("header", { class: "legal-header", "data-reveal": "" });

  if (eyebrow) {
    header.append(el("p", { class: "eyebrow" }, text(eyebrow)));
  }

  if (title) {
    header.append(el("h1", id ? { id } : {}, text(title)));
  }

  if (intro) {
    header.append(el("p", { class: "lead" }, text(intro)));
  }

  return header;
}

export function legalPage(...children) {
  return el("div", { class: "container legal-page" }, ...children);
}

export function prose(...children) {
  return el("div", { class: "prose", "data-reveal": "" }, ...children);
}

export function legalData(rows = []) {
  return el(
    "dl",
    { class: "legal-data" },
    rows.map((entry) => {
      const term = Array.isArray(entry) ? entry[0] : entry.label ?? entry.term ?? "";
      const value = Array.isArray(entry) ? entry[1] : entry.value ?? entry.description ?? "";

      return el("div", {}, el("dt", {}, text(term)), el("dd", {}, value));
    })
  );
}

export function notice(...children) {
  return el("div", { class: "notice" }, ...children);
}

export function toSupply(label = "vom Kunden zu liefern") {
  return el("span", { class: "to-supply" }, text(label));
}

export function legalBlock({ eyebrow, title, intro, id, content } = {}, ...children) {
  const items = [
    ...(content == null ? [] : Array.isArray(content) ? content : [content]),
    ...children
  ];

  return legalPage(
    legalHeader({ eyebrow, title, intro, id }),
    prose(...items)
  );
}
