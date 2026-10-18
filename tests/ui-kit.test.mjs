import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

const exportsByFile = {
  "src/components/button.js": ["button"],
  "src/components/section-heading.js": ["sectionHeading"],
  "src/components/area-card.js": ["areaCard"],
  "src/components/feature-tile.js": ["featureTile"],
  "src/components/person-card.js": ["personCard"],
  "src/components/page-hero.js": ["pageHero"],
  "src/components/company-panel.js": ["companyPanel", "contactDetails", "companyFacts", "companyBand"],
  "src/components/legal-block.js": ["legalHeader", "legalPage", "prose", "legalData", "notice", "toSupply", "legalBlock"]
};

for (const [file, names] of Object.entries(exportsByFile)) {
  test(`${file} exports its presentational components`, async () => {
    const module = await import(new URL(file, root));

    for (const name of names) {
      assert.equal(typeof module[name], "function", `${name} must be exported as a function`);
    }
  });
}

test("header renders the logo, all four primary pages and the burger control", async () => {
  const header = await source("src/layout/header.js");

  assert.match(header, /\/assets\/cropped-logo-sicherheit-qualitaet-1-1\.jpg/);
  assert.match(header, /alt: "SIQUA GmbH – Sicherheit und Qualität"/);
  assert.match(header, /href: "\/rauch-waermeabzugsanlage\.html"/);
  assert.match(header, /href: "\/ibak-servicestelle\.html"/);
  assert.match(header, /href: "\/kontakt\.html"/);
  assert.match(header, /aria-current/);
  assert.match(header, /nav-toggle/);
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls": "primary-navigation"/);
  assert.match(header, /skip-link/);
});

test("footer renders company data and links the legal pages", async () => {
  const footer = await source("src/layout/footer.js");

  assert.match(footer, /from "\.\.\/data\/company\.js"/);
  assert.match(footer, /company\.phoneHref/);
  assert.match(footer, /company\.email/);
  assert.match(footer, /company\.uid/);
  assert.match(footer, /company\.fn/);
  assert.match(footer, /\/impressum\.html/);
  assert.match(footer, /\/datenschutz\.html/);
  assert.match(footer, /aria-current/);
});

test("mobile navigation toggles, closes on Escape and returns focus", async () => {
  const nav = await source("src/js/nav.js");

  assert.match(nav, /aria-expanded/);
  assert.match(nav, /is-open/);
  assert.match(nav, /"Escape"/);
  assert.match(nav, /\.focus\(\)/);
  assert.match(nav, /closest\("a"\)/);
});

test("dynamic DOM content never goes through innerHTML, insertAdjacentHTML or eval", async () => {
  const files = [
    "src/layout/header.js",
    "src/layout/footer.js",
    "src/js/nav.js",
    ...Object.keys(exportsByFile)
  ];

  for (const file of files) {
    const code = await source(file);

    assert.doesNotMatch(code, /innerHTML/, `${file} must not use innerHTML`);
    assert.doesNotMatch(code, /insertAdjacentHTML/, `${file} must not use insertAdjacentHTML`);
    assert.doesNotMatch(code, /\beval\s*\(/, `${file} must not use eval`);
  }
});

test("the stylesheet covers chrome, kit and legal component classes", async () => {
  const css = await source("src/styles/components.css");
  const classes = [
    "site-header",
    "header-inner",
    "brand",
    "site-nav",
    "nav-toggle",
    "site-footer",
    "footer-grid",
    "footer-brand",
    "footer-contact",
    "footer-col",
    "footer-bottom",
    "button",
    "text-link",
    "area-grid",
    "area-card",
    "service-list",
    "services-grid",
    "service-card",
    "service-icon",
    "contact-grid",
    "person-card",
    "contact-list",
    "contact-label",
    "page-hero",
    "contact-hero",
    "contact-details",
    "company-panel",
    "legal-page",
    "legal-header",
    "prose",
    "legal-data",
    "to-supply",
    "notice"
  ];

  for (const name of classes) {
    assert.match(css, new RegExp(`\\.${name}(?![\\w-])`), `.${name} must be styled`);
  }
});

test("component colours and spacing come from the design tokens", async () => {
  const css = await source("src/styles/components.css");

  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
  assert.doesNotMatch(css, /\b(rgb|rgba|hsl|hsla|oklch|oklab)\(/i);
  assert.match(css, /var\(--red-700\)/);
  assert.match(css, /var\(--grey-950\)/);
  assert.match(css, /var\(--space-5\)/);
});

test("all original image assets are referenced from the public assets folder", async () => {
  const modules = ["src/layout/header.js", "src/components/area-card.js", "src/components/feature-tile.js", "src/components/person-card.js"];

  for (const file of modules) {
    const code = await source(file);

    assert.doesNotMatch(code, /\.\.\/design\//, `${file} must not reference design sources`);
    assert.match(code, /alt/, `${file} must provide alt text`);
  }

  const assets = await readdir(new URL("public/assets", root));
  assert.ok(assets.includes("cropped-logo-sicherheit-qualitaet-1-1.jpg"));
  assert.ok(assets.includes("christian.jpg"));
  assert.ok(assets.includes("andreas.jpg"));
});
