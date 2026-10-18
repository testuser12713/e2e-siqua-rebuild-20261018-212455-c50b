import { el, text } from "../lib/dom.js";

export function button({ label = "", href, variant = "primary", type = "button", icon = false } = {}) {
  const props = { class: `button button--${variant}` };
  const children = [text(label)];

  if (icon) {
    children.push(el("span", { class: "icon-arrow", "aria-hidden": "true" }));
  }

  if (href) {
    props.href = href;
    return el("a", props, ...children);
  }

  props.type = type;
  return el("button", props, ...children);
}
