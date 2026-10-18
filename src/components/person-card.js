import { el, text } from "../lib/dom.js";

function revealProps(delay) {
  const props = { "data-reveal": "" };

  if (delay != null) {
    const value = String(delay);
    props.style = `--reveal-delay: ${value.endsWith("ms") ? value : `${value}ms`}`;
  }

  return props;
}

function contactEntry(label, href, value) {
  return el(
    "li",
    {},
    el("span", { class: "contact-label" }, text(label)),
    el("a", { href }, text(value))
  );
}

export function personCard({
  name,
  role,
  email,
  phone,
  phoneHref,
  photo,
  moreHref = "/kontakt.html",
  moreLabel = "Kontaktdaten ansehen",
  more,
  revealDelay
} = {}) {
  const card = el("article", { class: "person-card", ...revealProps(revealDelay) });
  const body = el("div", { class: "person-card__body" });
  const alt = [name, role].filter(Boolean).join(", ");

  if (photo) {
    card.append(
      el("img", {
        class: "person-card__photo",
        src: photo,
        alt,
        width: "600",
        height: "600",
        loading: "lazy"
      })
    );
  }

  if (name) {
    body.append(el("h3", {}, text(name)));
  }

  if (role) {
    body.append(el("p", { class: "person-card__role" }, text(role)));
  }

  const entries = [];

  if (email) {
    entries.push(contactEntry("E-Mail", `mailto:${email}`, email));
  }

  if (phone) {
    entries.push(contactEntry("Mobil", phoneHref ?? `tel:${phone.replace(/[^\d+]/g, "")}`, phone));
  }

  if (entries.length) {
    body.append(el("ul", { class: "contact-list" }, entries));
  }

  const resolvedMore = more ?? (moreHref === false ? null : { href: moreHref, label: moreLabel });

  if (resolvedMore && resolvedMore.href) {
    body.append(
      el(
        "p",
        { class: "person-card__more" },
        el("a", { class: "text-link", href: resolvedMore.href }, text(resolvedMore.label ?? moreLabel))
      )
    );
  }

  card.append(body);
  return card;
}
