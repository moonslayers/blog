// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://moonslayers.github.io",
  base: "/blog/",
  output: "static",
  integrations: [sitemap()],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
