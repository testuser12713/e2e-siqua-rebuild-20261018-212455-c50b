import { el, text } from "./lib/dom.js";
import { mountFooter } from "./layout/footer.js";
import { mountHeader } from "./layout/header.js";
import { initMobileNav } from "./js/nav.js";
import { initReveal } from "./js/reveal.js";

const pageHeadings = {
  home: {
    id: "home-title",
    text: "Wir bieten Ihnen ",
    accent: "Sicherheit und Qualität"
  },
  rwa: {
    id: "page-title",
    text: "Rauch- und Wärmeabzugsanlage"
  },
  ibak: {
    id: "page-title",
    text: "IBAK Servicestelle"
  },
  kontakt: {
    id: "page-title",
    text: "Kontakt"
  },
  impressum: {
    id: "page-title",
    text: "Impressum"
  },
  datenschutz: {
    id: "page-title",
    text: "Datenschutz"
  }
};

function pageHeading({ id, text: label, accent }) {
  const h1 = el("h1", { id, "data-reveal": "" });

  h1.append(text(label));

  if (accent) {
    h1.append(el("span", { class: "accent" }, text(accent)));
  }

  return h1;
}

export function mountShell({ activePage } = {}) {
  const root = document.querySelector("#page-content");
  const heading = pageHeadings[activePage] ?? pageHeadings.home;

  mountHeader({ activePage });
  mountFooter();

  if (root) {
    root.append(el("header", { class: "section" }, el("div", { class: "container" }, pageHeading(heading))));
  }

  initMobileNav();
  initReveal();
}
