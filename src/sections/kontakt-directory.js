import { el } from "../lib/dom.js";
import { contacts } from "../data/contacts.js";
import { pageHero } from "../components/page-hero.js";
import { sectionHeading } from "../components/section-heading.js";
import { personCard } from "../components/person-card.js";
import { companyPanel, contactDetails } from "../components/company-panel.js";

function contactPerson(person, revealDelay, odId) {
  const card = personCard({
    ...person,
    moreHref: person.areaHref,
    moreLabel: "Zum Geschäftsbereich",
    revealDelay
  });

  card.setAttribute("data-od-id", odId);

  return card;
}

export function mountKontaktDirectory(root) {
  if (!root) return;

  const hero = pageHero({
    eyebrow: "Kontakt",
    intro:
      "Ihre Ansprechpartner für Rauch- und Wärmeabzugsanlagen und IBAK Kanalinspektionssysteme. Dazu die vollständigen Firmendaten und die Anfahrt nach St. Valentin.",
    variant: "contact"
  });
  hero.setAttribute("data-od-id", "kontakt-hero");

  const heading = sectionHeading({
    eyebrow: "Ansprechpartner",
    title: "Zwei Bereiche, zwei Ansprechpartner",
    intro: "Direkter Draht zu den Bereichsleitern – per E-Mail oder Mobiltelefon.",
    id: "contacts-title"
  });

  const grid = el(
    "div",
    { class: "contact-grid" },
    contactPerson(contacts.rwa, 60, "kontakt-christian"),
    contactPerson(contacts.ibak, 140, "kontakt-andreas")
  );

  const company = companyPanel();
  company.setAttribute("data-od-id", "kontakt-company");

  const details = contactDetails(company);
  details.setAttribute("data-reveal", "");
  details.style.marginTop = "var(--space-6)";

  const section = el(
    "section",
    { class: "section", "aria-labelledby": "contacts-title" },
    el("div", { class: "container" }, heading, grid, details)
  );

  root.append(hero, section);
}
