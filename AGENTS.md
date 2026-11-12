# AGENTS.md — blog (Espacio Latente)

## Proyecto

Blog personal en español de Jorge Marquez, publicado como GitHub Pages project page en `https://moonslayers.github.io/blog/`. Astro 7.4.x (manda `package.json`), output estático, sin backend, CMS, i18n ni comentarios.

## Convenciones

- Node 22.23.4 (`.nvmrc`, `engines.node >=22.23.4`). Usar `npm ci` en CI, `npm install` local.
- Indentación: 2 espacios (`.editorconfig`). Formato con Prettier + `prettier-plugin-astro`.
- TypeScript estricto (`tsconfig.json`). Ejecutar `npm run check` antes de publicar.
- No agregar comentarios en código salvo que se pida.
- No hacer commits salvo que se pidan.
- No añadir frameworks de UI adicionales (React, Vue, Svelte, etc.).
- No usar hash routing.
- Iconos: `@lucide/astro` para acciones genéricas (trazo 1.5, `currentColor`, en build sin JS de cliente). Lucide v1 no incluye marcas: X, WhatsApp, LinkedIn y Facebook se dibujan con SVG inline monocromo de Simple Icons; LinkedIn ya no está en Simple Icons, así que se usa el path de la última versión que lo incluía.
- Tema: clave `blog:theme` en `localStorage` (`"light" | "dark" | "system"`, ausente = sistema); se aplica con `data-theme="light" | "dark"` en `<html>` (sin atributo en modo sistema).

## Base path

- `astro.config.mjs`: `site: 'https://moonslayers.github.io'`, `base: '/blog/'`. No modificar.
- Usar `import.meta.env.BASE_URL` para prefijar rutas internas; nunca hardcodear `/blog/`.
- Helpers en `src/lib/url.ts` (`withBase`, `absoluteUrl`) para rutas internas y URLs absolutas.

## Diseño

El diseño está gobernado por `DESIGN.md`.

## Comandos

```bash
npm ci
npm run check
npm test
npm run build
npm run check:output
npx prettier --check .
npm run preview
```

- Los posts con fecha futura se filtran en `getPublishedPosts` (`src/lib/posts.ts`) y no aparecen hasta el siguiente build (cron diario 06:00 UTC).
- No commitear `dist/` ni `.astro/` (están en `.gitignore`).

## Rutas

- Índice de artículos: `/articulos/` (lista todos los publicados).
- Artículos individuales: `/articulos/<slug>/`.

## Deploy

- Workflow: `.github/workflows/deploy.yml` (push a `main` o manual).
- No commitear `dist/` ni `.astro/` (están en `.gitignore`).
