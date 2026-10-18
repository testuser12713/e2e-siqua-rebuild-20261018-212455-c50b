import { el, text } from "../lib/dom.js";

export function sectionHeading({ eyebrow, title, intro, id, link, variant } = {}) {
  const head = el("div", {
    class: variant === "split" ? "section-head section-head--split" : "section-head",
    "data-reveal": ""
  });
  const copy = el("div");

  if (eyebrow) {
    copy.append(el("p", { class: "eyebrow" }, text(eyebrow)));
  }

  if (title) {
    copy.append(el("h2", id ? { id } : {}, text(title)));
  }

  if (intro) {
    copy.append(el("p", {}, text(intro)));
  }

  head.append(copy);

  if (link && link.href && link.label) {
    head.append(el("a", { class: "text-link", href: link.href }, text(link.label)));
  }

  return head;
}
