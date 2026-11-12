// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://moonslayers.github.io",
  base: "/blog/",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (path.includes("/buscar/")) return false;
        if (path.includes("/404")) return false;
        return true;
      },
    }),
  ],
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
