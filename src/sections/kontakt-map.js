import "../styles/kontakt.css";
import { el, text } from "../lib/dom.js";
import { button } from "../components/button.js";
import { sectionHeading } from "../components/section-heading.js";
import { company } from "../data/company.js";

const CONSENT_KEY = "siqua.maps-consent";
const CONSENT_VALUE = "granted";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Langenharter%20Stra%C3%9Fe%208%2C%204300%20St.%20Valentin&output=embed";
const ROUTE_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Langenharter%20Stra%C3%9Fe%208%2C%204300%20St.%20Valentin";

function readConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === CONSENT_VALUE;
  } catch {
    return false;
  }
}

function storeConsent() {
  try {
    window.localStorage.setItem(CONSENT_KEY, CONSENT_VALUE);
  } catch {
    /* storage can be unavailable; the embed still works for this visit */
  }
}

function clearConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* nothing to clear */
  }
}

function mapIcon() {
  return el(
    "svg",
    {
      class: "map-placeholder__icon",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      fill: "none"
    },
    el("path", {
      d: "M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    el("circle", {
      cx: "12",
      cy: "10",
      r: "2.5",
      stroke: "currentColor",
      "stroke-width": "1.5"
    })
  );
}

function arrowIcon() {
  return el("span", { class: "icon-arrow", "aria-hidden": "true" });
}

function routeLink() {
  return el(
    "a",
    {
      class: "button button--ghost",
      href: ROUTE_URL,
      target: "_blank",
      rel: "noopener noreferrer"
    },
    text("Route planen"),
    arrowIcon()
  );
}

function mapNote() {
  return el(
    "aside",
    { class: "notice", "data-od-id": "kontakt-map-note" },
    el("strong", {}, text("Karte und Datenschutz:")),
    text(
      " Die Google-Maps-Karte wird erst nach Ihrer ausdrücklichen Zustimmung geladen. Bis dahin werden keine Daten an Google übertragen. Die Einwilligung kann jederzeit widerrufen werden. Mehr dazu in der "
    ),
    el("a", { href: "/datenschutz.html" }, text("Datenschutzerklärung")),
    text(".")
  );
}

function addressPanel() {
  return el(
    "aside",
    {
      class: "address-panel",
      "data-reveal": "",
      "data-od-id": "kontakt-address"
    },
    el("p", { class: "eyebrow eyebrow--light" }, text("Adresse")),
    el("h2", {}, text(company.name)),
    el(
      "address",
      {},
      text(company.street),
      el("br"),
      text(company.city),
      el("br"),
      text("Österreich")
    ),
    el(
      "div",
      { class: "address-panel__links" },
      el("a", { href: company.phoneHref }, text(`Tel.: ${company.phone}`)),
      el("a", { href: `mailto:${company.email}` }, text(company.email))
    )
  );
}

function mountMapCard() {
  const frame = el("div", { class: "map-frame", id: "map-frame" });

  const heading = el("h3", {}, text("Karte erst nach Ihrer Zustimmung"));
  const intro = el(
    "p",
    {},
    text(
      "Zum Schutz Ihrer Daten wird die Karte von Google erst geladen, wenn Sie ausdrücklich zustimmen. Dabei werden Daten an Google übertragen."
    )
  );

  const consentButton = button({ label: "Karte laden", variant: "primary" });
  consentButton.id = "map-consent";
  consentButton.type = "button";
  consentButton.setAttribute("aria-describedby", "map-consent-note");

  const legal = el(
    "p",
    { class: "map-placeholder__legal", id: "map-consent-note" },
    text(
      "Mit „Karte laden“ stimmen Sie der Einbindung von Google Maps zu. Die Einwilligung kann jederzeit widerrufen werden. Details in der "
    ),
    el("a", { href: "/datenschutz.html" }, text("Datenschutzerklärung")),
    text(".")
  );

  const placeholder = el(
    "div",
    { class: "map-placeholder", id: "map-placeholder" },
    mapIcon(),
    heading,
    intro,
    consentButton,
    legal
  );

  frame.append(placeholder);

  const revokeButton = button({ label: "Einwilligung widerrufen", variant: "quiet" });
  revokeButton.id = "map-revoke";
  revokeButton.type = "button";
  revokeButton.hidden = true;

  const status = el("p", {
    class: "map-status",
    id: "map-status",
    role: "status",
    "aria-live": "polite"
  });

  const hint = el(
    "p",
    { class: "map-hint" },
    text("Falls die Karte blockiert wird oder nicht lädt, planen Sie die Route direkt über "),
    el(
      "a",
      {
        href: ROUTE_URL,
        target: "_blank",
        rel: "noopener noreferrer"
      },
      text("Route planen")
    ),
    text(".")
  );

  const actions = el(
    "div",
    { class: "map-actions" },
    routeLink(),
    revokeButton
  );

  const card = el(
    "div",
    { class: "map-card", "data-reveal": "" },
    frame,
    actions,
    hint,
    status
  );

  let observer = null;

  function insertMap() {
    if (frame.querySelector("iframe")) return;

    frame.append(
      el("iframe", {
        class: "map-iframe",
        src: MAP_EMBED_URL,
        title: "Google Maps – Langenharter Straße 8, 4300 St. Valentin",
        referrerpolicy: "no-referrer-when-downgrade",
        loading: "lazy",
        allowfullscreen: ""
      })
    );
    placeholder.hidden = true;
    revokeButton.hidden = false;
    status.textContent = "Die Karte wurde geladen.";
  }

  function showPendingState() {
    heading.textContent = "Karte wird geladen";
    intro.textContent =
      "Die Karte wird geladen, sobald dieser Abschnitt sichtbar wird.";
    consentButton.hidden = true;
    legal.hidden = true;
  }

  function showInitialState() {
    heading.textContent = "Karte erst nach Ihrer Zustimmung";
    intro.textContent =
      "Zum Schutz Ihrer Daten wird die Karte von Google erst geladen, wenn Sie ausdrücklich zustimmen. Dabei werden Daten an Google übertragen.";
    consentButton.hidden = false;
    legal.hidden = false;
    placeholder.hidden = false;
  }

  function disconnectObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function observeSection(section) {
    if (typeof window.IntersectionObserver !== "function") {
      insertMap();
      return;
    }

    observer = new window.IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        disconnectObserver();
        insertMap();
      },
      { threshold: 0.01 }
    );
    observer.observe(section);
  }

  consentButton.addEventListener("click", () => {
    storeConsent();
    disconnectObserver();
    insertMap();
  });

  revokeButton.addEventListener("click", () => {
    disconnectObserver();
    const iframe = frame.querySelector("iframe");
    if (iframe) iframe.remove();
    clearConsent();
    showInitialState();
    revokeButton.hidden = true;
    status.textContent = "Einwilligung widerrufen. Die Karte wurde entfernt.";
  });

  return {
    card,
    applyStoredConsent(section) {
      if (!readConsent()) return;
      showPendingState();
      revokeButton.hidden = false;
      observeSection(section);
    }
  };
}

function mountNote(root) {
  if (root.querySelector('[data-od-id="kontakt-map-note"]')) return;

  const note = mapNote();
  const details = root.querySelector(".contact-details");

  if (details) {
    details.append(note);
  } else {
    root.append(el("div", { class: "container" }, note));
  }
}

export function mountKontaktMap(root) {
  if (!root) return;

  mountNote(root);

  const map = mountMapCard();
  const section = el(
    "section",
    {
      class: "section map-section",
      id: "anfahrt",
      "aria-labelledby": "map-title",
      "data-od-id": "kontakt-map-section"
    },
    el(
      "div",
      { class: "container" },
      sectionHeading({
        eyebrow: "Anfahrt",
        title: "So finden Sie uns",
        intro:
          "Langenharter Straße 8, 4300 St. Valentin. Die Karte wird erst nach Ihrer Zustimmung geladen.",
        id: "map-title"
      }),
      el("div", { class: "map-layout" }, map.card, addressPanel())
    )
  );

  root.append(section);
  map.applyStoredConsent(section);
}
