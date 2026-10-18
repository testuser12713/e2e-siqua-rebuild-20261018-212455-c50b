import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const path = "src/sections/kontakt-directory.js";
const source = () => readFile(new URL(path, root), "utf8");

test("kontakt directory exposes the mount function", async () => {
  const module = await import(new URL(path, root));

  assert.equal(typeof module.mountKontaktDirectory, "function");
});

test("kontakt directory renders both contact persons and the company data", async () => {
  const code = await source();

  assert.match(code, /from "\.\.\/data\/contacts\.js"/);
  assert.match(code, /contacts\.rwa/);
  assert.match(code, /contacts\.ibak/);
  assert.match(code, /personCard\(/);
  assert.match(code, /companyPanel\(/);
  assert.match(code, /contactDetails\(/);
  assert.match(code, /kontakt-christian/);
  assert.match(code, /kontakt-andreas/);
});

test("kontakt directory keeps dynamic DOM free of HTML injection", async () => {
  const code = await source();

  assert.doesNotMatch(code, /innerHTML/);
  assert.doesNotMatch(code, /insertAdjacentHTML/);
  assert.doesNotMatch(code, /\beval\s*\(/);
});
