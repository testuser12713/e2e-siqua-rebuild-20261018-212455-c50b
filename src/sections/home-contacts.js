import { el } from "../lib/dom.js";
import { personCard } from "../components/person-card.js";
import { sectionHeading } from "../components/section-heading.js";
import { companyBand } from "../components/company-panel.js";
import { contacts } from "../data/contacts.js";

export function mountHomeContacts(root) {
  if (!root) return;

  const contactsSection = el("section", {
    class: "section section--tint",
    id: "ansprechpartner",
    "aria-labelledby": "contacts-title"
  });

  const contactsContainer = el("div", { class: "container" });

  contactsContainer.append(
    sectionHeading({
      eyebrow: "Direkter Kontakt",
      title: "Ihre Ansprechpartner",
      intro:
        "Die Bereichsleiter begleiten Rauch- und Wärmeabzugsanlagen sowie die IBAK Servicestelle persönlich.",
      id: "contacts-title",
      link: { href: "/kontakt.html", label: "Zur Kontaktseite" },
      variant: "split"
    })
  );

  const christian = personCard({
    name: contacts.rwa.name,
    role: contacts.rwa.role,
    email: contacts.rwa.email,
    phone: contacts.rwa.phone,
    phoneHref: contacts.rwa.phoneHref,
    photo: contacts.rwa.photo,
    revealDelay: 60
  });
  christian.setAttribute("data-od-id", "contact-card-christian");

  const andreas = personCard({
    name: contacts.ibak.name,
    role: contacts.ibak.role,
    email: contacts.ibak.email,
    phone: contacts.ibak.phone,
    phoneHref: contacts.ibak.phoneHref,
    photo: contacts.ibak.photo,
    revealDelay: 140
  });
  andreas.setAttribute("data-od-id", "contact-card-andreas");

  contactsContainer.append(el("div", { class: "contact-grid" }, christian, andreas));
  contactsSection.append(contactsContainer);

  const company = companyBand();
  company.setAttribute("data-od-id", "home-company");

  root.append(contactsSection, company);
}
