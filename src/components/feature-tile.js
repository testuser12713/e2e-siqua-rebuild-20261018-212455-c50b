import { el, text } from "../lib/dom.js";

function revealProps(delay) {
  const props = { "data-reveal": "" };

  if (delay != null) {
    const value = String(delay);
    props.style = `--reveal-delay: ${value.endsWith("ms") ? value : `${value}ms`}`;
  }

  return props;
}

export function featureTile({ name, icon, description, index, revealDelay } = {}) {
  const card = el("article", { class: "service-card", ...revealProps(revealDelay) });
  const top = el("div", { class: "service-card__top" });

  if (icon) {
    top.append(
      el("img", {
        class: "service-icon",
        src: icon,
        alt: `Icon: ${name}`,
        width: "298",
        height: "298",
        loading: "lazy"
      })
    );
  }

  if (index) {
    top.append(el("span", { class: "service-card__num", "aria-hidden": "true" }, text(index)));
  }

  card.append(top);

  if (name) {
    card.append(el("h3", {}, text(name)));
  }

  if (description) {
    card.append(el("p", {}, text(description)));
  }

  return card;
}
