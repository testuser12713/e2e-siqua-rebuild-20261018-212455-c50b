import { el, text } from "../lib/dom.js";
import { company } from "../data/company.js";

export const primaryNav = [
  { key: "home", label: "Startseite", href: "/" },
  { key: "rwa", label: "Rauch- und Wärmeabzugsanlage", href: "/rauch-waermeabzugsanlage.html" },
  { key: "ibak", label: "IBAK Servicestelle", href: "/ibak-servicestelle.html" },
  { key: "kontakt", label: "Kontakt", href: "/kontakt.html" }
];

const logo = {
  src: "/assets/cropped-logo-sicherheit-qualitaet-1-1.jpg",
  alt: "SIQUA GmbH – Sicherheit und Qualität",
  width: "941",
  height: "305"
};

function navLink(item, activePage) {
  const props = { href: item.href };

  if (item.key === activePage) {
    props["aria-current"] = "page";
  }

  return el("li", {}, el("a", props, text(item.label)));
}

function skipLink() {
  return el("a", { class: "skip-link", href: "#page-content" }, text("Zum Inhalt springen"));
}

function navToggle() {
  return el(
    "button",
    {
      class: "nav-toggle",
      type: "button",
      "aria-expanded": "false",
      "aria-controls": "primary-navigation"
    },
    el(
      "span",
      { class: "nav-toggle__bars", "aria-hidden": "true" },
      el("span"),
      el("span"),
      el("span")
    ),
    el("span", { class: "nav-toggle__label" }, text("Menü"))
  );
}

function primaryNavigation(activePage) {
  return el(
    "nav",
    { class: "site-nav", id: "primary-navigation", "aria-label": "Hauptnavigation" },
    el("ul", {}, primaryNav.map((item) => navLink(item, activePage)))
  );
}

function siteHeader(activePage) {
  return el(
    "header",
    { class: "site-header" },
    el(
      "div",
      { class: "container header-inner" },
      el(
        "a",
        { class: "brand", href: "/", "aria-label": `${company.name} – zur Startseite` },
        el("img", {
          src: logo.src,
          alt: logo.alt,
          width: logo.width,
          height: logo.height
        })
      ),
      navToggle(),
      primaryNavigation(activePage)
    )
  );
}

export function mountHeader({ activePage } = {}) {
  const root = document.querySelector("#site-header");

  if (!root) return;

  delete root.dataset.navReady;
  root.replaceChildren(skipLink(), siteHeader(activePage));
}
