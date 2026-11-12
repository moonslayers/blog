# Espacio Latente

Blog personal de Jorge Marquez sobre inteligencia artificial, software y tecnología emergente. Se publica como GitHub Pages project page en `https://moonslayers.github.io/blog/`.

## Stack

- Astro 7.4.7 (output estático), TypeScript estricto
- Tailwind CSS 4 (vía `@tailwindcss/vite`)
- `@astrojs/sitemap`, `@astrojs/rss`
- Fuentes self-hosted: Fraunces, Inter, JetBrains Mono (`@fontsource/*`)

## Comandos

```sh
npm install          # o npm ci en CI
npm run dev          # servidor dev en localhost:4321
npm run build        # build a ./dist/
npm run preview      # preview del build
npm run check        # astro check (tipos)
npm test             # vitest
npm run check:output # valida dist/
npx prettier --check .  # verificación de formato
```

Node 22.23.4 (ver `.nvmrc`).

## Publicación

El despliegue se realiza mediante `.github/workflows/deploy.yml` (push a `main`, ejecución manual o cron diario a las 06:00 UTC). El artefacto se genera en `dist/` y se publica en GitHub Pages. Los posts con fecha futura se filtran en `getPublishedPosts` y aparecen en el siguiente build/cron. No commitear `dist/`.

## Paginación

El índice `/articulos/` pagina de 10 en 10 (`src/pages/articulos/[...page].astro`). La primera página es `/articulos/`; las siguientes `/articulos/2/`, etc. Muestra "Página X de Y" y enlaces anterior/siguiente.

## Búsqueda y noindex

`/buscar/` y `/404/` emiten `<meta name="robots" content="noindex, follow">` y se excluyen del sitemap. El SEO vive en `BaseLayout`/`PostLayout` (no existe `src/lib/seo.ts`).

## Estructura

```text
/
├── .github/workflows/deploy.yml
├── public/                        # Assets estáticos (favicon, .nojekyll, imágenes)
│   ├── images/posts/              # Portadas de artículos
│   └── og-default.png             # Imagen OG por defecto
├── src/
│   ├── components/                # Header, Footer, PostCard, SearchBox, etc.
│   ├── content/blog/              # Artículos en Markdown
│   ├── layouts/                   # BaseLayout, PostLayout
│   ├── lib/                       # posts.ts, url.ts
│   ├── pages/                     # Rutas del sitio
│   └── styles/                    # global.css
├── astro.config.mjs
├── package.json
└── .nvmrc
```

## Frontmatter de un artículo

Archivo en `src/content/blog/<slug>.md` (o `.mdx`). Campos:

| Campo         | Tipo              | Requerido                    | Descripción                                                        |
| ------------- | ----------------- | ---------------------------- | ------------------------------------------------------------------ |
| `title`       | string            | sí                           | Título del artículo (máx. ~80 caracteres).                         |
| `description` | string            | sí                           | Deck/resumen (máx. 160 caracteres).                                |
| `date`        | date (YYYY-MM-DD) | sí                           | Fecha de publicación.                                              |
| `tags`        | string[]          | no (default `[]`)            | Etiquetas; se normalizan a slugs sin acentos.                      |
| `cover`       | string            | no                           | Ruta local `/images/posts/...` o URL `https://...`.                |
| `coverAlt`    | string            | sí si hay `cover`            | Texto alternativo de la portada.                                   |
| `author`      | string            | no (default `Jorge Marquez`) | Autor del artículo.                                                |
| `draft`       | boolean           | no (default `false`)         | Si es `true`, no se publica ni aparece en RSS/sitemap/búsqueda.    |
| `updated`     | date (YYYY-MM-DD) | no                           | Fecha de última actualización (JSON-LD y `article:modified_time`). |

## Cómo añadir un artículo

1. Crear `src/content/blog/<slug>.md` con el frontmatter anterior y el cuerpo en Markdown.
2. Añadir la portada:
   - Local: guardar en `public/images/posts/<nombre>.jpg` (16:9, ≤ 200 KB) y usar `cover: /images/posts/<nombre>.jpg`.
   - Externa: usar `cover: https://...` (URL absoluta).
   - Si hay `cover`, `coverAlt` es obligatorio.
3. Ejecutar `npm run check` y `npm run build`.
4. Verificar en `dist/` la página generada y la imagen OG (1200×630).

## Tags

Cada tag genera una página en `/etiquetas/<slug>/` con los artículos que lo usan. El slug se normaliza (sin acentos, minúsculas, guiones). `/etiquetas/` lista todos los tags con su conteo.

## Búsqueda

`/buscar/` usa el índice estático `/buscar-index.json`, generado en build a partir de los artículos publicados. Incluye `title`, `description`, `tags`, `date`, `readingTime`, `url` y `searchText` normalizado. La búsqueda es local en el navegador (todos los términos deben coincidir).

## RSS y sitemap

- `/rss.xml`: feed RSS 2.0 con los artículos publicados, links absolutos, fechas y enclosure de portada.
- `/sitemap-index.xml` y `/sitemap-0.xml`: URLs públicas con prefijo `/blog/`. No incluyen drafts.
- `/robots.txt` apunta al sitemap.

## Drafts

Un artículo con `draft: true` se excluye de listados, tags, búsqueda, RSS y sitemap. Sigue generando su página si se accede por URL directa? No: `getPublishedPosts` filtra drafts, por lo que no se genera ruta.

## Base path

`astro.config.mjs`: `site: 'https://moonslayers.github.io'`, `base: '/blog/'`. No modificar. Usar `import.meta.env.BASE_URL` y los helpers de `src/lib/url.ts` (`withBase`, `absoluteUrl`) para rutas internas; nunca hardcodear `/blog/`.

## QA de imágenes y OG

- Portadas de artículo: 1200×630, JPEG/WebP ≤ 200 KB (portada) y ≤ 250 KB para JPEG de portada; OG ≤ 300 KB.
- `coverAlt` es obligatorio si hay `cover` (validado por el schema).
- Verificar dimensiones y peso: `file public/images/posts/*.jpg` e `identify`/`python PIL`.
- Verificar OG en el HTML generado: `grep -o 'og:image[^<]*' dist/.../index.html` y comprobar width/height 1200/630 y alt.
- Contraste: revisar en ambos modos (claro/oscuro) con Lighthouse o herramienta de contraste; texto principal ≥ 4.5:1.
