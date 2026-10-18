import "../styles/home.css";
import { el, text } from "../lib/dom.js";
import { areaCard } from "../components/area-card.js";
import { button } from "../components/button.js";
import { sectionHeading } from "../components/section-heading.js";
import { serviceAreas } from "../data/services.js";

const SVG_NS = "http://www.w3.org/2000/svg";

function svg(tag, props = {}, ...children) {
  const node = document.createElementNS(SVG_NS, tag);

  for (const [name, value] of Object.entries(props)) {
    if (value == null || value === false) continue;
    node.setAttribute(name, value === true ? "" : String(value));
  }

  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : text(child));
  }

  return node;
}

function schematic() {
  const drawing = svg(
    "svg",
    {
      class: "schematic__svg",
      viewBox: "0 0 520 620",
      preserveAspectRatio: "xMidYMid slice"
    },
    svg(
      "g",
      {
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      },
      svg("path", { class: "fine", d: "M34 88h452M34 548h452", "stroke-dasharray": "2 7" }),
      svg("path", { class: "heavy", d: "M62 470V330l118-86 118 86v140" }),
      svg("path", { d: "M62 470h236M88 470V350h164v120M88 390h164M88 430h164" }),
      svg("path", { class: "heavy", d: "M146 254v-42h68v42" }),
      svg("path", { d: "M140 212h80M140 254h80M132 262h96" }),
      svg("path", { class: "accent", d: "M154 212v-15h52v15" }),
      svg("path", { d: "M156 212l14-27M204 212l-14-27" }),
      svg("path", {
        class: "accent flow-a",
        d: "M180 188c-14-28 8-48-2-76M214 190c16-26-4-50 8-78M246 238c20-30 6-54 18-84"
      }),
      svg("path", { class: "accent flow-b", d: "M128 210c-16-24 2-44-8-68" }),
      svg("path", { class: "fine", d: "M62 500h236M62 490v20M298 490v20" }),
      svg("path", {
        class: "heavy",
        d: "M382 338a92 92 0 1 0 0 184 92 92 0 1 0 0-184Z"
      }),
      svg("path", {
        class: "fine",
        d: "M382 356a74 74 0 1 0 0 148 74 74 0 1 0 0-148Z"
      }),
      svg("path", {
        class: "fine",
        d: "M382 376a54 54 0 1 0 0 108 54 54 0 1 0 0-108Z"
      }),
      svg("path", { d: "M382 338v184M290 430h184" }),
      svg("rect", { class: "heavy", x: "392", y: "412", width: "72", height: "36", rx: "2" }),
      svg("circle", { cx: "406", cy: "430", r: "10" }),
      svg("path", { d: "M464 430h40M504 430h16" }),
      svg("path", { class: "accent scan", d: "M470 404v52M486 398v64" }),
      svg("path", { class: "fine", d: "M382 310v-18h60M352 470v18h60" }),
      svg("path", { class: "fine", d: "M34 330h28M34 470h28M480 88v26M480 548v-26" })
    ),
    svg(
      "g",
      { fill: "currentColor" },
      svg("circle", { class: "vent-pulse", cx: "180", cy: "196", r: "3.5" }),
      svg("circle", { class: "vent-pulse", cx: "214", cy: "196", r: "3.5" })
    )
  );

  return el(
    "div",
    { class: "schematic", "aria-hidden": "true", "data-od-id": "home-schematic" },
    el(
      "div",
      { class: "schematic__top" },
      el("span", {}, text("Systemübersicht")),
      el("span", {}, text("RWA / IBAK"))
    ),
    drawing,
    el(
      "div",
      { class: "schematic__bottom" },
      el("span", {}, text("Rauchabzug · Kanalinspektion")),
      el("span", {}, text("Prinzipskizze"))
    )
  );
}

function hero() {
  return el(
    "section",
    { class: "hero", "aria-labelledby": "home-title", "data-od-id": "home-hero" },
    el(
      "div",
      { class: "container hero__grid" },
      el(
        "div",
        { class: "hero__copy" },
        el("p", { class: "eyebrow" }, text("SIQUA GmbH · St. Valentin")),
        el(
          "p",
          { class: "lead" },
          text(
            "Zwei Geschäftsbereiche, ein Anspruch: SIQUA plant, prüft und wartet Rauch- und Wärmeabzugsanlagen und betreibt die IBAK Servicestelle. Für sichere Gebäude und zuverlässige Kanalinspektion."
          )
        ),
        el(
          "div",
          { class: "hero__actions" },
          button({
            label: "Bereiche entdecken",
            href: "#bereiche",
            variant: "primary",
            icon: true
          }),
          button({
            label: "Kontakt aufnehmen",
            href: "/kontakt.html",
            variant: "ghost"
          })
        ),
        el(
          "ul",
          { class: "hero__meta" },
          el("li", {}, text("Rauch- und Wärmeabzugsanlagen")),
          el("li", {}, text("IBAK Servicestelle")),
          el("li", {}, text("Langenharter Straße 8"))
        )
      ),
      schematic()
    )
  );
}

function areaCards() {
  const descriptions = {
    rwa: "Planung, Berechnung und Betreuung von Rauch- und Wärmeabzugsanlagen – von der Lichtkuppel bis zur Absturzsicherung.",
    ibak: "Fehlersuche, Software und Ersatzteile für IBAK Kanalinspektionssysteme – mit Leihgeräten für die Zeit der Reparatur."
  };

  return serviceAreas.map((area, index) => {
    const card = areaCard({
      eyebrow: `Geschäftsbereich ${String(index + 1).padStart(2, "0")}`,
      title: area.title,
      intro: descriptions[area.key],
      services: area.services,
      href: area.href,
      ctaLabel: `Zur ${area.title}`,
      index: String(index + 1).padStart(2, "0"),
      revealDelay: index === 0 ? 60 : 140
    });

    card.setAttribute("data-od-id", `area-card-${area.key}`);

    return card;
  });
}

export function mountHomeAreas(root) {
  if (!root) return;

  const areas = el(
    "section",
    { class: "section", id: "bereiche", "aria-labelledby": "areas-title" },
    el(
      "div",
      { class: "container" },
      sectionHeading({
        eyebrow: "Leistungen",
        title: "Zwei Geschäftsbereiche",
        intro:
          "Rauch- und Wärmeabzugsanlagen für Gebäude und die Servicestelle für IBAK Kanalinspektionssysteme. Beide Bereiche mit sechs Leistungen und direktem Kontakt zur Bereichsleitung.",
        id: "areas-title",
        link: { href: "/kontakt.html", label: "Ansprechpartner finden" },
        variant: "split"
      }),
      el("div", { class: "area-grid" }, areaCards())
    )
  );

  root.append(hero(), areas);
}
