import { el } from "../lib/dom.js";
import { serviceAreas } from "../data/services.js";
import { contacts } from "../data/contacts.js";
import { pageHero } from "../components/page-hero.js";
import { sectionHeading } from "../components/section-heading.js";
import { featureTile } from "../components/feature-tile.js";
import { personCard } from "../components/person-card.js";
import { button } from "../components/button.js";

const descriptions = {
  "fehlersuche-instandsetzung":
    "Wenn eine IBAK Anlage ausfällt oder unzuverlässig arbeitet, grenzt die Servicestelle die Ursache ein und setzt die Anlage wieder instand. Diagnose und Reparatur erfolgen am konkreten System.",
  signaleinstellungen:
    "Für aussagekräftige Bilder und verlässliche Messdaten müssen die Signale der Kamera richtig eingestellt sein. SIQUA stimmt die Signaleinstellungen auf Anlage und Einsatzbereich ab.",
  "software-updates":
    "Die Servicestelle spielt aktuelle Softwarestände auf und prüft anschließend die Funktion der Anlage. Bedienung und Datenauswertung bleiben auf dem vereinbarten Stand.",
  leihgeraete:
    "Damit die Arbeit während einer Reparatur weiterläuft, stellt SIQUA Leihgeräte für den Reparaturzeitraum bereit. Die Servicestelle stimmt Bedarf und Rückgabe mit dem Kunden ab.",
  "jaehrliche-ueberpruefung":
    "Die jährliche Überprüfung umfasst die gesamte Anlage und kontrolliert, ob Komponenten, Signale und Software zusammenpassen. Festgestellte Abweichungen werden für die weitere Bearbeitung dokumentiert.",
  ersatzteile:
    "Ersatzteile für IBAK Anlagen sind über die Servicestelle erhältlich. Bei der Auswahl unterstützt SIQUA dabei, das passende Teil für die vorhandene Anlage zu finden."
};

const serviceIds = [
  "ibak-service-fehlersuche",
  "ibak-service-signale",
  "ibak-service-software",
  "ibak-service-leihgeraete",
  "ibak-service-ueberpruefung",
  "ibak-service-ersatzteile"
];

function serviceGrid(services) {
  return el(
    "div",
    { class: "services-grid" },
    services.map((service, index) => {
      const tile = featureTile({
        name: service.name,
        icon: service.icon,
        description: descriptions[service.slug],
        index: String(index + 1).padStart(2, "0"),
        revealDelay: index % 2 === 0 ? 40 : 80
      });

      tile.setAttribute("data-od-id", serviceIds[index]);
      return tile;
    })
  );
}

function contactBlock(person) {
  const card = personCard({
    name: person.name,
    role: person.role,
    email: person.email,
    phone: person.phone,
    phoneHref: person.phoneHref,
    photo: person.photo,
    more: false,
    revealDelay: 60
  });

  const action = el(
    "div",
    {},
    button({
      label: "Zur Kontaktseite",
      href: "/kontakt.html",
      variant: "primary",
      icon: true
    })
  );

  return el(
    "section",
    {
      class: "section",
      "aria-labelledby": "ibak-contact-title",
      "data-od-id": "ibak-contact"
    },
    el(
      "div",
      { class: "container" },
      sectionHeading({
        eyebrow: "Kontakt",
        title: "Ihr Ansprechpartner",
        intro: "Direkter Draht zu den Bereichsleitern – per E-Mail oder Mobiltelefon.",
        id: "ibak-contact-title"
      }),
      el("div", { class: "contact-grid" }, card, action)
    )
  );
}

export function mountIbakPage(root) {
  if (!root) return;

  const area = serviceAreas.find((entry) => entry.key === "ibak");

  if (!area) return;

  const shellHeader = root.querySelector(":scope > header.section");

  if (shellHeader) {
    shellHeader.remove();
  }

  const hero = pageHero({
    eyebrow: "Geschäftsbereich 02",
    title: "IBAK Servicestelle",
    intro:
      "Die IBAK Servicestelle betreut Kanalinspektionssysteme im täglichen Einsatz – von der Fehlersuche über Software und Signaleinstellungen bis zur jährlichen Überprüfung und Ersatzteilversorgung. Für Reparaturzeiten stehen Leihgeräte bereit."
  });

  hero.setAttribute("data-od-id", "ibak-hero");
  root.append(hero);

  root.append(
    el(
      "section",
      { class: "section", "aria-labelledby": "services-title" },
      el(
        "div",
        { class: "container" },
        sectionHeading({
          eyebrow: "Leistungen",
          title: "Sechs Leistungen im Überblick",
          intro:
            "Service rund um IBAK Kanalinspektionssysteme: Diagnose, Einstellungen, Software, Ersatz und die wiederkehrende Prüfung der gesamten Anlage.",
          id: "services-title"
        }),
        serviceGrid(area.services)
      )
    )
  );

  root.append(contactBlock(contacts.ibak));
}
