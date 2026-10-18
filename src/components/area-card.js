import { el, text } from "../lib/dom.js";

function revealProps(delay) {
  const props = { "data-reveal": "" };

  if (delay != null) {
    const value = String(delay);
    props.style = `--reveal-delay: ${value.endsWith("ms") ? value : `${value}ms`}`;
  }

  return props;
}

function serviceItem(service) {
  return el(
    "li",
    {},
    el("img", {
      src: service.icon,
      alt: `Icon: ${service.name}`,
      width: "298",
      height: "298",
      loading: "lazy"
    }),
    el("span", {}, text(service.name))
  );
}

export function areaCard({ title, services = [], href, ctaLabel, intro, eyebrow, index, revealDelay } = {}) {
  const card = el("article", { class: "area-card", ...revealProps(revealDelay) });
  const head = el("div", { class: "area-card__head" });
  const copy = el("div");

  if (eyebrow) {
    copy.append(el("p", { class: "eyebrow" }, text(eyebrow)));
  }

  if (title) {
    copy.append(el("h3", {}, text(title)));
  }

  if (intro) {
    copy.append(el("p", { class: "area-card__intro" }, text(intro)));
  }

  head.append(copy);

  if (index) {
    head.append(el("span", { class: "area-card__index", "aria-hidden": "true" }, text(index)));
  }

  card.append(head);
  card.append(el("ul", { class: "service-list" }, services.map(serviceItem)));

  if (href) {
    card.append(
      el("a", { class: "text-link area-card__cta", href }, text(ctaLabel ?? "Mehr erfahren"))
    );
  }

  return card;
}
