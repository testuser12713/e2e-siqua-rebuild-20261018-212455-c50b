import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("src/sections/impressum-content.js", root), "utf8");

test("impressum section builds its legal header through the kit", async () => {
  const module = await import(new URL("src/sections/impressum-content.js", root));

  assert.equal(typeof module.mountImpressum, "function");
  assert.match(source, /from "\.\.\/components\/legal-block\.js"/);
  assert.match(source, /legalHeader\(\{/);
  assert.match(source, /legalPage\(/);
});

test("impressum legal header carries eyebrow, title and lead", () => {
  const header = source.slice(source.indexOf("legalHeader("), source.indexOf("prose("));
  const eyebrow = header.indexOf("eyebrow:");
  const title = header.indexOf("title:");
  const intro = header.indexOf("intro:");

  assert.ok(eyebrow >= 0, "missing eyebrow");
  assert.ok(title >= 0, "missing title");
  assert.ok(intro >= 0, "missing intro");
  assert.ok(eyebrow < title, "eyebrow must precede the heading");
  assert.ok(title < intro, "heading must precede the lead");
  assert.match(header, /title: "Impressum"/);
  assert.match(header, /id: "page-title"/);
});

test("impressum section leaves exactly one page heading to the legal header", () => {
  assert.match(source, /root\.querySelector\(":scope > header\.section"\)/);
  assert.match(source, /shellHeading\.remove\(\)/);
});

test("impressum section keeps the supplied-value markings", () => {
  assert.match(source, /toSupply\(\)/);
  assert.match(source, /Firmenbuchgericht/);
  assert.match(source, /Zuständige Kammer/);
  assert.match(source, /Aufsichtsbehörde/);
});
