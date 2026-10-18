import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const path = "src/sections/ibak-page.js";
const source = () => readFile(new URL(path, root), "utf8");

test("ibak page exposes the mount function", async () => {
  const module = await import(new URL(path, root));

  assert.equal(typeof module.mountIbakPage, "function");
});

test("ibak contact section carries heading, intro, person card and kontakt link", async () => {
  const code = await source();

  assert.match(code, /sectionHeading\(/);
  assert.match(code, /personCard\(/);
  assert.match(code, /button\(/);
  assert.match(code, /contacts\.ibak/);
  assert.match(code, /ibak-contact-title/);
  assert.match(code, /"data-od-id": "ibak-contact"/);
  assert.match(code, /"\/kontakt\.html"/);
});

test("ibak page keeps all six services with their original icons", async () => {
  const code = await source();
  const { serviceAreas } = await import(new URL("src/data/services.js", root));
  const area = serviceAreas.find((entry) => entry.key === "ibak");

  assert.ok(area);
  assert.equal(area.services.length, 6);

  for (const service of area.services) {
    assert.match(code, /serviceAreas\.find/);
    assert.match(code, /featureTile\(/);
    assert.ok(service.icon.startsWith("/assets/"));
  }
});

test("ibak page keeps dynamic DOM free of HTML injection", async () => {
  const code = await source();

  assert.doesNotMatch(code, /innerHTML/);
  assert.doesNotMatch(code, /insertAdjacentHTML/);
  assert.doesNotMatch(code, /\beval\s*\(/);
});
