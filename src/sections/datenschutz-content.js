import { el, text } from "../lib/dom.js";
import { company } from "../data/company.js";
import { legalBlock, legalData, toSupply } from "../components/legal-block.js";

function mailLink() {
  return el("a", { href: `mailto:${company.email}` }, text(company.email));
}

function phoneLink() {
  return el("a", { href: company.phoneHref }, text(company.phone));
}

function controllerBlock() {
  return [
    el("h2", {}, text("Verantwortlicher")),
    el(
      "address",
      {},
      el("strong", {}, text(company.name)),
      el("br"),
      text(company.street),
      el("br"),
      text(company.city),
      el("br"),
      text("Österreich")
    ),
    el(
      "p",
      {},
      text("Telefon: "),
      phoneLink(),
      el("br"),
      text("E-Mail: "),
      mailLink()
    )
  ];
}

function hostingBlock() {
  return [
    el("h2", {}, text("Hosting und Server-Logfiles")),
    el(
      "p",
      {},
      text(
        "Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten. Dazu können die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Datei, die übertragene Datenmenge, der Browsertyp und das Betriebssystem gehören. Die Verarbeitung dient dem sicheren und stabilen Betrieb der Website."
      )
    ),
    legalData([
      ["Zweck", text("Sicherer und stabiler Betrieb der Website, Auswertung technischer Störungen")],
      ["Rechtsgrundlage", text("Berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO")],
      ["Empfänger", [text("Hosting-Anbieter: "), toSupply()]],
      ["Speicherdauer", [text("Server-Logfiles: "), toSupply()]]
    ])
  ];
}

function mapsBlock() {
  return [
    el("h2", {}, text("Google Maps")),
    el(
      "p",
      {},
      text(
        "Auf der Kontaktseite ist eine Karte von Google eingebunden. Sie wird erst geladen, wenn Sie über die Schaltfläche „Karte laden“ ausdrücklich zustimmen. Vor der Zustimmung enthält die Seite kein Karten-iframe und stellt keine Anfrage an Google-Server. Ein Widerruf über die Schaltfläche „Einwilligung widerrufen“ entfernt das iframe wieder."
      )
    ),
    el(
      "p",
      {},
      text(
        "Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Laden der Karte können Daten an Google übertragen werden, insbesondere IP-Adresse, Standort- und Nutzungsdaten sowie Angaben zu Browser und Gerät. Empfänger sind Google Ireland Limited und die Google LLC in den USA."
      )
    ),
    legalData([
      ["Zweck", text("Darstellung des Standorts und Planung der Anfahrt")],
      ["Rechtsgrundlage", text("Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO")],
      ["Empfänger", text("Google Ireland Limited, Google LLC (USA)")],
      [
        "Drittlandübermittlung",
        text(
          "USA. Als Übermittlungsinstrument dienen die Standardvertragsklauseln der EU-Kommission und, soweit anwendbar, eine Zertifizierung nach dem EU-US Data Privacy Framework."
        )
      ],
      [
        "Speicherdauer",
        text(
          "Die Speicherdauer bei Google richtet sich nach den Vorgaben des Anbieters. Details enthält die Datenschutzerklärung von Google."
        )
      ],
      [
        "Widerruf",
        [
          text("Jederzeit über die Schaltfläche „Einwilligung widerrufen“ auf der "),
          el("a", { href: "/kontakt.html" }, text("Kontaktseite")),
          text("; die Karte wird dabei entfernt.")
        ]
      ]
    ])
  ];
}

function storageBlock() {
  return [
    el("h2", {}, text("Cookies und lokale Speicherung")),
    el(
      "p",
      {},
      text(
        "Diese Website setzt keine Cookies und verwendet keine Analyse- oder Trackingdienste. Es gibt keine Formulare, über die personenbezogene Daten eingegeben werden."
      )
    ),
    el(
      "p",
      {},
      text("Die einzige lokale Speicherung ist Ihre Einwilligung zur Google-Maps-Karte im localStorage unter dem Schlüssel "),
      el("span", { class: "mono" }, text("siqua.maps-consent")),
      text(" mit dem Wert "),
      el("span", { class: "mono" }, text("granted")),
      text(". Diese Angabe hat keinen Personenbezug. Sie können sie über die Schaltfläche auf der "),
      el("a", { href: "/kontakt.html" }, text("Kontaktseite")),
      text(" oder durch Löschen der Websitedaten im Browser entfernen.")
    )
  ];
}

function rightsBlock() {
  const rights = [
    "Recht auf Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)",
    "Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
    "Recht auf Löschung (Art. 17 DSGVO)",
    "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
    "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
    "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
    "Recht, eine erteilte Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO)"
  ];

  return [
    el("h2", {}, text("Ihre Rechte")),
    el("p", {}, text("Sie haben nach der DSGVO insbesondere folgende Rechte:")),
    el("ul", {}, rights.map((right) => el("li", {}, text(right)))),
    el(
      "p",
      {},
      text("Für die Ausübung Ihrer Rechte genügt eine Nachricht an "),
      mailLink(),
      text(".")
    )
  ];
}

function complaintBlock() {
  return [
    el("h2", {}, text("Beschwerderecht")),
    el(
      "p",
      {},
      text("Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren:")
    ),
    el(
      "address",
      {},
      text("Österreichische Datenschutzbehörde"),
      el("br"),
      text("Barichgasse 40–42"),
      el("br"),
      text("1030 Wien"),
      el("br"),
      text("E-Mail: "),
      el("a", { href: "mailto:dsb@dsb.gv.at" }, text("dsb@dsb.gv.at")),
      el("br"),
      text("Website: "),
      el(
        "a",
        { href: "https://www.dsb.gv.at/", target: "_blank", rel: "noopener noreferrer" },
        text("www.dsb.gv.at")
      )
    )
  ];
}

function contactBlock() {
  return [
    el("h2", {}, text("Kontakt in Datenschutzfragen")),
    el(
      "p",
      {},
      text("Bei Fragen zur Verarbeitung personenbezogener Daten erreichen Sie uns unter "),
      mailLink(),
      text(" oder "),
      phoneLink(),
      text(".")
    )
  ];
}

export function mountDatenschutz(root) {
  if (!root) return;

  const shellHeading = root.querySelector(":scope > header.section");

  if (shellHeading) {
    shellHeading.remove();
  }

  root.append(
    legalBlock(
      {
        eyebrow: "Rechtliches",
        title: "Datenschutz",
        intro: "Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 DSGVO.",
        id: "page-title"
      },
      controllerBlock(),
      hostingBlock(),
      mapsBlock(),
      storageBlock(),
      rightsBlock(),
      complaintBlock(),
      contactBlock()
    )
  );
}
