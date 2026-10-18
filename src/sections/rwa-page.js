import { el } from "../lib/dom.js";
import { serviceAreas } from "../data/services.js";
import { contacts } from "../data/contacts.js";
import { pageHero } from "../components/page-hero.js";
import { sectionHeading } from "../components/section-heading.js";
import { featureTile } from "../components/feature-tile.js";
import { personCard } from "../components/person-card.js";
import { button } from "../components/button.js";

const serviceDescriptions = {
  "rauch-waermeabzugsanlagen":
    "Rauch- und Wärmeabzugsanlagen öffnen im Brandfall definierte Entrauchungsflächen, damit Rauch und Wärme kontrolliert aus dem Gebäude abgeführt werden. SIQUA plant und betreut die Anlage passend zum Gebäudekonzept.",
  "lichtkuppeln-lichtbaender":
    "Lichtkuppeln und Lichtbänder bringen Tageslicht in das Gebäude und lassen sich als Entrauchungs- oder Lüftungsöffnung nutzen. SIQUA plant die Ausführung und die Einbindung in die RWA-Steuerung.",
  "inspektion-wartung":
    "Regelmäßige Inspektion und Wartung sorgen dafür, dass die Anlage im Ernstfall zuverlässig funktioniert. SIQUA prüft die Komponenten, dokumentiert den Zustand und führt die notwendigen Instandhaltungsarbeiten aus.",
  "planung-berechnung-rwa":
    "Die Planung beginnt mit der Berechnung der erforderlichen Entrauchungsflächen und der Abstimmung auf das Gebäudekonzept. SIQUA erstellt die Grundlagen für Ausführung und Steuerung der Anlage.",
  steuerungsoptimierung:
    "Eine abgestimmte Steuerung verbindet die RWA mit Lüftung und weiteren Gebäudefunktionen. SIQUA prüft die vorhandene Steuerung, passt Parameter an und optimiert die Abläufe für den sicheren Betrieb.",
  absturzsicherungen:
    "Absturzsicherungen schützen Menschen bei Arbeiten auf dem Dach und an Öffnungen. SIQUA ergänzt RWA-Anlagen um geeignete Sicherungslösungen und berücksichtigt dabei die Zugänglichkeit der Komponenten."
};

const serviceNodeIds = [
  "rwa-service-anlagen",
  "rwa-service-lichtkuppeln",
  "rwa-service-inspektion",
  "rwa-service-planung",
  "rwa-service-steuerung",
  "rwa-service-absturz"
];

function mountHero(root) {
  const hero = pageHero({
    eyebrow: "Geschäftsbereich 01",
    intro:
      "Rauch- und Wärmeabzugsanlagen halten Fluchtwege frei und schützen Gebäude im Brandfall. SIQUA plant, berechnet, prüft und wartet die Anlagen und optimiert ihre Steuerung. Lichtkuppeln, Lichtbänder und Absturzsicherungen ergänzen den Bereich."
  });

  hero.setAttribute("data-od-id", "rwa-hero");
  root.append(hero);
}

function mountServices(root, area) {
  const section = el("section", {
    class: "section",
    "aria-labelledby": "services-title"
  });
  const container = el("div", { class: "container" });

  container.append(
    sectionHeading({
      eyebrow: "Leistungen",
      title: "Sechs Leistungen im Überblick",
      intro:
        "Jede Leistung als eigener Baustein: von der ersten Berechnung über die Steuerung bis zur wiederkehrenden Prüfung.",
      id: "services-title"
    })
  );

  const grid = el("div", { class: "services-grid" });

  area.services.forEach((service, index) => {
    const tile = featureTile({
      name: service.name,
      icon: service.icon,
      description: serviceDescriptions[service.slug],
      index: String(index + 1).padStart(2, "0"),
      revealDelay: index % 2 === 0 ? 40 : 80
    });

    tile.setAttribute("data-od-id", serviceNodeIds[index] ?? `rwa-service-${service.slug}`);
    grid.append(tile);
  });

  container.append(grid);
  section.append(container);
  root.append(section);
}

function mountContact(root) {
  const person = contacts.rwa;

  const section = el("section", {
    class: "section",
    "aria-labelledby": "rwa-contact-title",
    "data-od-id": "rwa-contact"
  });
  const container = el("div", { class: "container" });

  container.append(
    sectionHeading({
      eyebrow: "Kontakt",
      title: "Ihr Ansprechpartner",
      id: "rwa-contact-title"
    })
  );

  const grid = el("div", { class: "contact-grid" });

  grid.append(
    personCard({
      name: person.name,
      role: person.role,
      email: person.email,
      phone: person.phone,
      phoneHref: person.phoneHref,
      photo: person.photo,
      more: false,
      revealDelay: 60
    })
  );

  grid.append(
    el(
      "div",
      {},
      button({
        label: "Zur Kontaktseite",
        href: "/kontakt.html",
        variant: "primary",
        icon: true
      })
    )
  );

  container.append(grid);
  section.append(container);
  root.append(section);
}

export function mountRwaPage(root) {
  if (!root) return;

  const area = serviceAreas.find((entry) => entry.key === "rwa");

  if (!area) return;

  mountHero(root);
  mountServices(root, area);
  mountContact(root);
}
