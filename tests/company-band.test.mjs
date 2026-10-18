import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

class FakeNode {}

class FakeText extends FakeNode {
  constructor(value) {
    super();
    this.nodeValue = String(value);
  }
}

class FakeElement extends FakeNode {
  constructor(tag) {
    super();
    this.tagName = tag.toUpperCase();
    this.attributes = {};
    this.childNodes = [];
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return Object.hasOwn(this.attributes, name) ? this.attributes[name] : null;
  }

  addEventListener() {}

  append(...nodes) {
    this.childNodes.push(...nodes);
  }

  set textContent(value) {
    this.childNodes = [new FakeText(value)];
  }
}

function textOf(node) {
  if (node instanceof FakeText) return node.nodeValue;
  return node.childNodes.map(textOf).join("");
}

function findAll(node, predicate, found = []) {
  if (!(node instanceof FakeElement)) return found;
  if (predicate(node)) found.push(node);
  for (const child of node.childNodes) findAll(child, predicate, found);
  return found;
}

test("companyBand renders the dark company band from the passed company data", async () => {
  globalThis.Node = FakeNode;
  globalThis.document = {
    createElement: (tag) => new FakeElement(tag),
    createTextNode: (value) => new FakeText(value)
  };

  const { companyBand } = await import(new URL("src/components/company-band.js", root));
  const { company } = await import(new URL("src/data/company.js", root));

  const band = companyBand({ company });

  assert.equal(band.tagName, "SECTION");
  assert.equal(band.getAttribute("class"), "company-band");
  assert.equal(band.getAttribute("aria-labelledby"), "company-title");

  const heading = findAll(band, (node) => node.tagName === "H2")[0];
  assert.equal(textOf(heading), "SIQUA GmbH in St. Valentin");
  assert.equal(heading.getAttribute("id"), "company-title");

  const facts = findAll(band, (node) => node.getAttribute("class") === "company-facts")[0];
  assert.ok(facts, "the band must render the company facts list");

  const content = textOf(band);
  for (const value of [company.street, company.city, company.phone, company.email, company.uid, company.fn]) {
    assert.ok(content.includes(value), `the band must show ${value}`);
  }

  const links = findAll(band, (node) => node.tagName === "A");
  const hrefs = links.map((node) => node.getAttribute("href"));
  assert.ok(hrefs.includes(company.phoneHref));
  assert.ok(hrefs.includes(`mailto:${company.email}`));
  assert.ok(hrefs.includes("/kontakt.html"));
});

test("companyBand works with the shared company module by default", async () => {
  const { companyBand } = await import(new URL("src/components/company-band.js", root));
  const { company } = await import(new URL("src/data/company.js", root));

  const band = companyBand();

  assert.ok(textOf(band).includes(company.name));
});

test("company band markup is built through the DOM helpers, never innerHTML", async () => {
  const code = await readFile(new URL("src/components/company-band.js", root), "utf8");

  assert.match(code, /from "\.\.\/lib\/dom\.js"/);
  assert.match(code, /from "\.\.\/data\/company\.js"/);
  assert.doesNotMatch(code, /innerHTML/);
  assert.doesNotMatch(code, /insertAdjacentHTML/);
  assert.doesNotMatch(code, /\beval\s*\(/);
});

test("components.css styles the dark band and its fact grid from the design tokens", async () => {
  const css = await readFile(new URL("src/styles/components.css", root), "utf8");

  for (const name of ["company-band", "company-band__grid", "company-facts"]) {
    assert.match(css, new RegExp(`\\.${name}(?![\\w-])`), `.${name} must be styled`);
  }

  assert.match(css, /\.company-band\s*\{[^}]*background:\s*var\(--grey-950\)/s);
  assert.match(css, /\.company-band\s*\{[^}]*color:\s*var\(--white\)/s);
  assert.match(css, /\.company-facts dd a\s*\{[^}]*min-height:\s*44px/s);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
});
