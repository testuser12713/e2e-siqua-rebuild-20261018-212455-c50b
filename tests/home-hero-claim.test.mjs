import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("the home hero claim wraps only between words", async () => {
  const css = await source("src/styles/home.css");
  const base = await source("src/styles/base.css");

  assert.match(base, /hyphens:\s*auto/);
  assert.match(css, /#home-title\s*\{[^}]*hyphens:\s*manual/);
  assert.match(css, /#home-title\s*\{[^}]*overflow-wrap:\s*normal/);
  assert.match(css, /#home-title\s*\{[^}]*word-break:\s*normal/);
});
