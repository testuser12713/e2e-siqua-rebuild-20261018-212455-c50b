import { el, text } from "../lib/dom.js";
import { company } from "../data/company.js";

const pageLinks = [
  { label: "Startseite", href: "/" },
  { label: "Rauch- und Wärmeabzugsanlage", href: "/rauch-waermeabzugsanlage.html" },
  { label: "IBAK Servicestelle", href: "/ibak-servicestelle.html" },
  { label: "Kontakt", href: "/kontakt.html" }
];

const serviceLinks = [
  { label: "Kontakt & Anfahrt", href: "/kontakt.html" },
  { label: "Impressum", href: "/impressum.html" },
  { label: "Datenschutz", href: "/datenschutz.html" }
];

function currentFile() {
  const path = window.location.pathname;
  const file = path.slice(path.lastIndexOf("/") + 1);
  return file === "" ? "index.html" : file;
}

function footerLink(link) {
  const file = currentFile();
  const target = link.href === "/" ? "index.html" : link.href.replace(/^\//, "");
  const props = { href: link.href };

  if (target === file) {
    props["aria-current"] = "page";
  }

  return el("li", {}, el("a", props, text(link.label)));
}

function footerColumn(title, links) {
  return el(
    "div",
    { class: "footer-col" },
    el("h3", {}, text(title)),
    el("ul", {}, links.map(footerLink))
  );
}

function footerBrand() {
  return el(
    "div",
    { class: "footer-brand" },
    el("p", { class: "eyebrow eyebrow--light" }, text("Sicherheit und Qualität")),
    el("h2", {}, text(company.name)),
    el("p", {}, text("Rauch- und Wärmeabzugsanlagen und IBAK Servicestelle in St. Valentin.")),
    el(
      "div",
      { class: "footer-contact" },
      el("p", {}, text(company.street), el("br"), text(company.city)),
      el(
        "p",
        {},
        el("strong", {}, text("Tel.:")),
        text(" "),
        el("a", { href: company.phoneHref }, text(company.phone)),
        el("br"),
        el("strong", {}, text("E-Mail:")),
        text(" "),
        el("a", { href: `mailto:${company.email}` }, text(company.email))
      ),
      el(
        "p",
        {},
        el("strong", {}, text("UID:")),
        text(` ${company.uid}`),
        el("br"),
        el("strong", {}, text("FN:")),
        text(` ${company.fn}`)
      )
    )
  );
}

function siteFooter() {
  return el(
    "footer",
    { class: "site-footer" },
    el(
      "div",
      { class: "container" },
      el(
        "div",
        { class: "footer-grid" },
        footerBrand(),
        footerColumn("Seiten", pageLinks),
        footerColumn("Service", serviceLinks)
      ),
      el(
        "div",
        { class: "footer-bottom" },
        el("span", {}, text(`© ${new Date().getFullYear()} ${company.name}`)),
        el("span", {}, text(`${company.street} · ${company.city}`))
      )
    )
  );
}

export function mountFooter() {
  const root = document.querySelector("#site-footer");

  if (!root) return;

  root.replaceChildren(siteFooter());
}
