import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const documents = [
  { file: "index.html", page: "home" },
  { file: "rauch-waermeabzugsanlage.html", page: "rwa" },
  { file: "ibak-servicestelle.html", page: "ibak" },
  { file: "kontakt.html", page: "kontakt" },
  { file: "impressum.html", page: "impressum" },
  { file: "datenschutz.html", page: "datenschutz" }
];

for (const { file, page } of documents) {
  test(`${file} is a standalone German document with page metadata`, async () => {
    const html = await readFile(new URL(`../${file}`, import.meta.url), "utf8");

    assert.match(html, /^<!doctype html>/i);
    assert.match(html, /<html lang="de">/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(html, /<link rel="canonical" href="https:\/\/siqua-components\.at\//);
    assert.match(html, /<meta property="og:title" content="[^"]+">/);
    assert.match(html, /<meta property="og:description" content="[^"]+">/);
    assert.match(html, /<meta property="og:image" content="[^"]+">/);
    assert.match(html, /<link rel="icon" href="\/assets\/cropped-logo-sicherheit-qualitaet-1-1\.jpg" type="image\/jpeg">/);
    assert.match(html, new RegExp(`<script type="module" src="/src/pages/${page}\\.js"></script>`));
    assert.match(html, /<div id="site-header"><\/div>/);
    assert.match(html, /<main id="page-content"><\/main>/);
    assert.match(html, /<div id="site-footer"><\/div>/);
  });
}
