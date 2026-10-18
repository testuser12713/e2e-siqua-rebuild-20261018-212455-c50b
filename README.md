# SIQUA GmbH – Firmenwebseite

Die Website der SIQUA GmbH aus St. Valentin stellt die beiden Geschäftsbereiche des Unternehmens vor: Rauch- und Wärmeabzugsanlagen sowie die IBAK Servicestelle für Kanalinspektionssysteme. Besucher finden auf der Startseite einen Überblick über beide Bereiche mit allen zwölf Leistungen, auf den Bereichsseiten die sechs Leistungen mit den Original-Icons und Beschreibungen und auf der Kontaktseite beide Ansprechpartner, die vollständigen Firmendaten sowie eine Anfahrt mit einwilligungsbasierter Google-Maps-Karte. Impressum und Datenschutzerklärung sind eigenständige Seiten und von jeder Seite aus verlinkt.

## Technik

- HTML5 und CSS3
- Vanilla JavaScript als ES-Module, ohne Framework und ohne UI-Bibliothek
- Vite als einzige Build-Abhängigkeit mit einem Mehrseiten-Build für sechs HTML-Dokumente
- Lokal ausgelieferte Schriftarten (Bitter, Inter, JetBrains Mono) und Originalbilder aus dem Firmenbestand

## Installation

Voraussetzung ist Node.js ab Version 22.12 (oder 20.19 und neuer). Im Projektverzeichnis:

```bash
npm ci
```

Für eine lokale Entwicklungsumgebung ohne Lockfile kann alternativ `npm install` verwendet werden.

## Entwicklung

```bash
npm run dev
```

Der Entwicklungsserver startet unter `http://localhost:5173`. Die Startseite ist unter `/` erreichbar, die weiteren Seiten unter ihren jeweiligen Dateinamen.

## Produktions-Build

```bash
npm run build
```

Der Befehl erzeugt die vollständige statische Website im Verzeichnis `dist/`. Jede Seite liegt dort als eigenes HTML-Dokument vor:

- `dist/index.html`
- `dist/rauch-waermeabzugsanlage.html`
- `dist/ibak-servicestelle.html`
- `dist/kontakt.html`
- `dist/impressum.html`
- `dist/datenschutz.html`

Das Verzeichnis `dist/` kann unverändert von einem beliebigen statischen Webserver ausgeliefert werden; es wird kein Anwendungsserver benötigt. Zum Prüfen des Builds dient:

```bash
npm run preview
```

## Seiten und Bedienung

- **Startseite (`/`)** – Claim „Wir bieten Ihnen Sicherheit und Qualität“, zwei Bereichskarten mit je sechs Leistungen und Icons sowie die beiden Ansprechpartner.
- **Rauch- und Wärmeabzugsanlage (`/rauch-waermeabzugsanlage.html`)** – sechs Leistungen des Bereichs mit Icon und Beschreibung sowie der direkte Kontakt zum Bereichsleiter.
- **IBAK Servicestelle (`/ibak-servicestelle.html`)** – sechs Leistungen rund um IBAK Kanalinspektionssysteme mit Icon und Beschreibung sowie der direkte Kontakt zum Bereichsleiter.
- **Kontakt (`/kontakt.html`)** – beide Ansprechpartner mit Foto, E-Mail- und Mobil-Link, die Firmendaten, eine Karte mit Zustimmungsabfrage und der Link „Route planen“.
- **Impressum (`/impressum.html`)** – Offenlegung und Unternehmensangaben nach § 25 MedienG.
- **Datenschutz (`/datenschutz.html`)** – Informationen zur Datenverarbeitung nach Art. 13 DSGVO.

Die Kopfzeile führt auf jeder Seite zu den vier Hauptseiten und hebt die aktuell geöffnete Seite hervor; das Logo führt zur Startseite. Bei schmalen Bildschirmen ersetzt eine Menüschaltfläche die Navigation. Der Fußbereich enthält Anschrift, Telefon, E-Mail, UID und FN sowie die Links zu Impressum und Datenschutz.

E-Mail-Adressen öffnen das Mailprogramm, Telefon- und Mobilnummern die Telefonie. Die Google-Maps-Karte wird erst nach ausdrücklicher Zustimmung geladen und kann jederzeit widerrufen werden; vorher stellt die Seite keine Anfrage an Google-Server. Die Zustimmung wird ohne Personenbezug im lokalen Speicher des Browsers abgelegt (`siqua.maps-consent`). Es werden keine Cookies gesetzt.

## Funktionen

- Sechs eigenständige, direkt aufrufbare Seiten mit eigenem Titel, eigener Meta-Beschreibung, Open-Graph-Angaben und Favicon aus dem Logo
- Einheitliche Farbwelt aus Dunkelrot- und Grautönen über zentrale CSS-Variablen, kontrastgeprüfte Textfarben
- Responsives Layout ohne horizontalen Scroll mit bedienbarem Burger-Menü
- Zwölf Original-Leistungsicons, zwei Original-Ansprechpartnerfotos und das Firmenlogo
- Weiches Einblenden der Abschnitte beim Scrollen und flüssige Hover-Übergänge; bei `prefers-reduced-motion` ohne Bewegung
- Schlüssellose Google-Maps-Einbettung mit Einwilligung, Widerruf und Routen-Link
- Keine Formulare, keine Cookies und keine personenbezogenen Speicherungen

## Tests

```bash
npm test
```

Die Tests prüfen, dass alle sechs Dokumente als eigenständige Seiten mit deutscher Sprachauszeichnung, Titel, Meta-Beschreibung, Open-Graph-Angaben, Favicon und ihrem jeweiligen Seitenmodul vorliegen.
