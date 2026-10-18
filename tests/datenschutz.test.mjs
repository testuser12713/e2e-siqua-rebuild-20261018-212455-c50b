import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("src/sections/datenschutz-content.js", root), "utf8");

test("datenschutz section mounts the legal page", async () => {
  const module = await import(new URL("src/sections/datenschutz-content.js", root));

  assert.equal(typeof module.mountDatenschutz, "function");
  assert.match(source, /legalBlock\(/);
  assert.match(source, /from "\.\.\/components\/legal-block\.js"/);
  assert.match(source, /from "\.\.\/data\/company\.js"/);
});

test("datenschutz section names controller, purposes, recipients and rights", () => {
  for (const phrase of [
    "Verantwortlicher",
    "Hosting und Server-Logfiles",
    "Google Maps",
    "Drittlandübermittlung",
    "Ihre Rechte",
    "Beschwerderecht",
    "Art. 15 DSGVO",
    "Art. 16 DSGVO",
    "Art. 17 DSGVO",
    "Art. 18 DSGVO",
    "Art. 20 DSGVO",
    "Art. 21 DSGVO"
  ]) {
    assert.ok(source.includes(phrase), `missing legal phrase: ${phrase}`);
  }

  assert.match(source, /company\.name/);
  assert.match(source, /company\.street/);
  assert.match(source, /company\.city/);
  assert.match(source, /company\.email/);
  assert.match(source, /company\.phoneHref/);
});

test("datenschutz section marks unknown hosting values as to be supplied", () => {
  assert.match(source, /toSupply\(\)/);
  assert.match(source, /Hosting-Anbieter: /);
  assert.match(source, /Server-Logfiles: /);
  assert.match(source, /siqua\.maps-consent/);
  assert.match(source, /granted/);
});
