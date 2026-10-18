import { el, text } from "../lib/dom.js";
import { company } from "../data/company.js";
import { button } from "./button.js";

function address() {
  return el(
    "address",
    {},
    text(company.street),
    el("br"),
    text(company.city),
    el("br"),
    text("Österreich")
  );
}

function row(label, value, mono = false) {
  return el(
    "div",
    { class: "company-panel__row" },
    el("dt", {}, text(label)),
    el("dd", mono ? { class: "mono" } : {}, value)
  );
}

export function companyPanel({ eyebrow = "Firmendaten", title = company.name } = {}) {
  const rows = el(
    "dl",
    { class: "company-panel__rows" },
    row("Telefon", el("a", { href: company.phoneHref }, text(company.phone))),
    row("E-Mail", el("a", { href: `mailto:${company.email}` }, text(company.email))),
    row("UID", text(company.uid), true),
    row("FN", text(company.fn), true)
  );

  return el(
    "div",
    { class: "company-panel" },
    el("p", { class: "eyebrow" }, text(eyebrow)),
    el("h2", {}, text(title)),
    address(),
    rows
  );
}

export function contactDetails(...children) {
  return el("div", { class: "contact-details" }, ...children);
}

export function companyFacts() {
  return el(
    "dl",
    { class: "company-facts" },
    el(
      "div",
      {},
      el("dt", {}, text("Anschrift")),
      el("dd", {}, text(company.street), el("br"), text(company.city))
    ),
    el(
      "div",
      {},
      el("dt", {}, text("Telefon")),
      el("dd", {}, el("a", { href: company.phoneHref }, text(company.phone)))
    ),
    el(
      "div",
      {},
      el("dt", {}, text("E-Mail")),
      el("dd", {}, el("a", { href: `mailto:${company.email}` }, text(company.email)))
    ),
    el(
      "div",
      {},
      el("dt", {}, text("UID / FN")),
      el("dd", {}, text(company.uid), el("br"), text(`FN ${company.fn}`))
    )
  );
}

export function companyBand({
  eyebrow = "Firmendaten",
  title = `${company.name} in St. Valentin`,
  intro = "Zwei Geschäftsbereiche unter einem Dach. Alle Kontaktdaten, Ansprechpartner und die Anfahrt finden Sie auf der Kontaktseite.",
  ctaLabel = "Kontakt & Anfahrt",
  ctaHref = "/kontakt.html"
} = {}) {
  return el(
    "section",
    { class: "company-band", "aria-labelledby": "company-title" },
    el(
      "div",
      { class: "container company-band__grid" },
      el(
        "div",
        { "data-reveal": "" },
        el("p", { class: "eyebrow eyebrow--light" }, text(eyebrow)),
        el("h2", { id: "company-title" }, text(title)),
        el("p", {}, text(intro)),
        el("p", {}, button({ label: ctaLabel, href: ctaHref, variant: "light" }))
      ),
      el("div", { "data-reveal": "" }, companyFacts())
    )
  );
}
