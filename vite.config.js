import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        rwa: resolve(import.meta.dirname, "rauch-waermeabzugsanlage.html"),
        ibak: resolve(import.meta.dirname, "ibak-servicestelle.html"),
        kontakt: resolve(import.meta.dirname, "kontakt.html"),
        impressum: resolve(import.meta.dirname, "impressum.html"),
        datenschutz: resolve(import.meta.dirname, "datenschutz.html"),
      },
    },
  },
});
