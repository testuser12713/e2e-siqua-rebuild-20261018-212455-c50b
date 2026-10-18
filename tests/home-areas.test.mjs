import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("home sections module mounts the hero and the two service areas", async () => {
  const code = await source("src/sections/home-areas.js");

  assert.match(code, /export function mountHomeAreas\(root\)/);
  assert.match(code, /import "\.\.\/styles\/home\.css"/);
  assert.match(code, /from "\.\.\/data\/services\.js"/);
  assert.match(code, /from "\.\.\/components\/area-card\.js"/);
  assert.match(code, /from "\.\.\/components\/section-heading\.js"/);
  assert.match(code, /from "\.\.\/components\/button\.js"/);
});

test("home sections link each card to its service-area page", async () => {
  const code = await source("src/sections/home-areas.js");
  const { serviceAreas } = await import(new URL("src/data/services.js", root));

  assert.match(code, /href: area\.href/);
  assert.match(code, /area-card-\$\{area\.key\}/);
  assert.match(code, /serviceAreas\.map/);
  assert.deepEqual(
    serviceAreas.map((area) => area.href),
    ["/rauch-waermeabzugsanlage.html", "/ibak-servicestelle.html"]
  );
  assert.ok(serviceAreas.every((area) => area.services.length === 6));
});

test("home sections build the decorative schematic without markup injection", async () => {
  const code = await source("src/sections/home-areas.js");

  assert.match(code, /aria-hidden/);
  assert.match(code, /createElementNS/);
  assert.match(code, /flow-a/);
  assert.match(code, /flow-b/);
  assert.match(code, /vent-pulse/);
  assert.doesNotMatch(code, /innerHTML/);
  assert.doesNotMatch(code, /insertAdjacentHTML/);
  assert.doesNotMatch(code, /\beval\s*\(/);
});

test("home styles use design tokens and respect reduced motion", async () => {
  const css = await source("src/styles/home.css");

  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
  assert.doesNotMatch(css, /\b(rgb|rgba|hsl|hsla|oklch|oklab)\(/i);
  assert.match(css, /var\(--ease\)/);
  assert.match(css, /prefers-reduced-motion: no-preference/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
