import { el, text } from "../lib/dom.js";

export function pageHero({ title, intro, eyebrow, id = "page-title", contact = false, variant } = {}) {
  const classes = ["page-hero"];

  if (contact || variant === "contact" || variant === "contact-hero") {
    classes.push("contact-hero");
  }

  const inner = el("div", { class: "page-hero__inner" });

  if (eyebrow) {
    inner.append(el("p", { class: "eyebrow" }, text(eyebrow)));
  }

  if (title) {
    inner.append(el("h1", { id }, text(title)));
  }

  if (intro) {
    inner.append(el("p", { class: "lead" }, text(intro)));
  }

  return el(
    "section",
    { class: classes.join(" "), "aria-labelledby": id },
    el("div", { class: "container" }, inner)
  );
}
