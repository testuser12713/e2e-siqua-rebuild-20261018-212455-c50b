import { el, text } from "../lib/dom.js";
import { company as defaultCompany } from "../data/company.js";
import { button } from "./button.js";

function fact(label, ...value) {
  return el(
    "div",
    {},
    el("dt", {}, text(label)),
    el("dd", {}, ...value)
  );
}

export function companyBand({
  company = defaultCompany,
  eyebrow = "Firmendaten",
  title = `${company.name} in St. Valentin`,
  intro = "Zwei Geschäftsbereiche unter einem Dach. Alle Kontaktdaten, Ansprechpartner und die Anfahrt finden Sie auf der Kontaktseite.",
  ctaLabel = "Kontakt & Anfahrt",
  ctaHref = "/kontakt.html"
} = {}) {
  const facts = el(
    "dl",
    { class: "company-facts", "data-reveal": "", style: "--reveal-delay: 100ms" },
    fact("Anschrift", text(company.street), el("br"), text(company.city)),
    fact("Telefon", el("a", { href: company.phoneHref }, text(company.phone))),
    fact("E-Mail", el("a", { href: `mailto:${company.email}` }, text(company.email))),
    fact("UID / FN", text(company.uid), el("br"), text(`FN ${company.fn}`))
  );

  return el(
    "section",
    {
      class: "company-band",
      "aria-labelledby": "company-title",
      "data-od-id": "home-company"
    },
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
      facts
    )
  );
}
