import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("kontakt-map exports mountKontaktMap and loads its own stylesheet", async () => {
  const code = await source("src/sections/kontakt-map.js");

  assert.match(code, /export function mountKontaktMap\(root\)/);
  assert.match(code, /import "\.\.\/styles\/kontakt\.css"/);
  assert.doesNotMatch(code, /innerHTML|insertAdjacentHTML|\beval\s*\(/);
});

test("the map embed is keyless and only inserted after consent", async () => {
  const code = await source("src/sections/kontakt-map.js");

  assert.match(code, /https:\/\/www\.google\.com\/maps\?q=/);
  assert.doesNotMatch(code, /key=|api_key|AIza[0-9A-Za-z_-]+/);
  assert.doesNotMatch(code, /<link[^>]+preconnect/i);
  assert.match(code, /referrerpolicy: "no-referrer-when-downgrade"/);
  assert.match(code, /loading: "lazy"/);
  assert.match(code, /siqua\.maps-consent/);
  assert.match(code, /"granted"/);
  assert.match(code, /IntersectionObserver/);
});

test("the route link leaves the page safely", async () => {
  const code = await source("src/sections/kontakt-map.js");
  const routeLinks = code.match(/href: ROUTE_URL[\s\S]*?rel: "noopener noreferrer"/g) ?? [];

  assert.match(code, /const ROUTE_URL =[\s\S]*?google\.com\/maps\/dir/);
  assert.ok(routeLinks.length >= 2, "actions and hint both carry the route link");
});

test("kontakt styles use design tokens only", async () => {
  const css = await source("src/styles/kontakt.css");

  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
  assert.doesNotMatch(css, /\b(rgb|rgba|hsl|hsla|oklch|oklab)\(/i);
  for (const name of ["map-section", "map-layout", "map-card", "map-frame", "map-placeholder", "map-actions", "map-iframe"]) {
    assert.match(css, new RegExp(`\\.${name}(?![\\w-])`), `.${name} must be styled`);
  }
});
