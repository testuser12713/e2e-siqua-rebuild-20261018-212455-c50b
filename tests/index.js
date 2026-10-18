import { readdir } from "node:fs/promises";

const directory = new URL("./", import.meta.url);
const entries = await readdir(directory);

for (const entry of entries.sort()) {
  if (entry.endsWith(".test.mjs")) {
    await import(new URL(entry, directory));
  }
}
