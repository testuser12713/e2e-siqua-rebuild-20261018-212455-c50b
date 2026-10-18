import { el, text } from "../lib/dom.js";
import { company } from "../data/company.js";
import {
  legalData,
  legalHeader,
  legalPage,
  notice,
  prose,
  toSupply
} from "../components/legal-block.js";

function phoneLink() {
  return el("a", { href: company.phoneHref }, text(company.phone));
}

function mailLink() {
  return el("a", { href: `mailto:${company.email}` }, text(company.email));
}

function providerAddress() {
  return el(
    "address",
    {},
    el("strong", {}, text(company.name)),
    el("br"),
    text(company.street),
    el("br"),
    text(company.city),
    el("br"),
    text("Österreich")
  );
}

function contactParagraph() {
  return el(
    "p",
    {},
    text("Telefon: "),
    phoneLink(),
    el("br"),
    text("E-Mail: "),
    mailLink()
  );
}

function registerParagraph() {
  return el(
    "p",
    {},
    text(`UID: ${company.uid}`),
    el("br"),
    text(`FN: ${company.fn}`)
  );
}

function companyData() {
  return legalData([
    ["Sitz", text("St. Valentin, Österreich")],
    ["Anschrift", text(`${company.street}, ${company.city}`)],
    ["Telefon", phoneLink()],
    ["E-Mail", mailLink()],
    ["UID", text(company.uid)],
    ["FN", text(company.fn)],
    ["Firmenbuchgericht", toSupply()],
    ["Gewerbe / Geschäftszweig", toSupply()],
    ["Zuständige Kammer", toSupply()],
    ["Aufsichtsbehörde", toSupply()]
  ]);
}

function mediaData() {
  return legalData([
    ["Unternehmensgegenstand", toSupply()],
    [
      "Grundlegende Richtung",
      text(
        "Die Website informiert über die Leistungen der SIQUA GmbH in den Bereichen Rauch- und Wärmeabzugsanlagen sowie IBAK Servicestelle."
      )
    ]
  ]);
}

export function mountImpressum(root) {
  if (!root) return;

  const shellHeading = root.querySelector(":scope > header.section");

  if (shellHeading) {
    shellHeading.remove();
  }

  const page = legalPage(
    legalHeader({
      eyebrow: "Rechtliches",
      title: "Impressum",
      intro: "Offenlegung nach § 25 MedienG und Angaben zum Diensteanbieter.",
      id: "page-title"
    }),
    prose(
      notice(
        el("strong", {}, text("Hinweis:")),
        text(
          " Angaben, die weder die Spezifikation noch die bestehende Website nennen, sind auf dieser Seite sichtbar als "
        ),
        toSupply(),
        text(" gekennzeichnet und nicht erfunden.")
      ),
      el("h2", {}, text("Medieninhaber und Diensteanbieter")),
      providerAddress(),
      contactParagraph(),
      registerParagraph(),
      el("h2", {}, text("Unternehmensangaben")),
      companyData(),
      el("h2", {}, text("Grundangaben nach § 25 MedienG")),
      el(
        "p",
        {},
        text(
          `Medieninhaber ist die ${company.name} mit Sitz in St. Valentin und der Anschrift ${company.street}, ${company.city}.`
        )
      ),
      mediaData(),
      el("h2", {}, text("Kontakt")),
      el(
        "p",
        {},
        text("Für Fragen zu den Inhalten dieser Website erreichen Sie uns unter "),
        mailLink(),
        text(" oder "),
        phoneLink(),
        text(
          ". Die Ansprechpartner der beiden Geschäftsbereiche finden Sie auf der "
        ),
        el("a", { href: "/kontakt.html" }, text("Kontaktseite")),
        text(".")
      )
    )
  );

  root.append(page);
}
