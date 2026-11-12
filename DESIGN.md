# Sistema visual — Espacio Latente

> Fuente de verdad del estilo del blog. Gobierna toda decisión visual y editorial de `blog/`. `src/styles/global.css` (y los componentes Astro) deben reflejar los tokens y reglas de este archivo. Si el sistema se reutiliza en otro proyecto, puede promoverse a skill; por ahora es específico de este repo.

## 1. Propósito y principios

Blog personal de Jorge Marquez: IA, desarrollo, tecnologías emergentes, noticias y pruebas de herramientas/paradigmas, "más allá del hype". Debe sentirse parte del portafolio `https://moonslayers.github.io/new-portafolio/`, no un tema genérico. Solo español, estático, GitHub Pages en `https://moonslayers.github.io/blog/`.

Principios rectores:

1. **Lectura primero.** El artículo es el producto; la UI es el marco.
2. **Jerarquía tipográfica fuerte.** Tres familias, roles fijos, sin improvisación.
3. **Un solo acento.** Terracota para links/acciones; sage y mustard solo para estado/etiquetas.
4. **Mucho aire.** Espaciado generoso, sin densidad de cards.
5. **Dark mode de primera clase.** Diseñado en paralelo, no adaptado al final.
6. **Sin ornamentación.** Sin gradientes, glassmorphism, sombras dramáticas ni grids infinitos de cards.
7. **Editorial sereno.** Tono crítico y claro; la estética sirve al texto.

Tagline: "IA, software y tecnología emergente, antes del consenso."

## 2. Voz y tono editorial

- Primera persona, técnico pero claro, escéptico del hype, sin corporativismo.
- Títulos: afirmativos, concretos, sin clickbait ni signos de exclamación. Máx. ~80 caracteres.
- Deck: 1–2 frases que resumen la tesis; no repetir el título. Máx. ~160 caracteres.
- Cuerpo: párrafos cortos (3–5 líneas), frases directas, ejemplos verificables, sin porcentajes no medidos.
- Citas: en Fraunces italic, atribuidas.
- Evitar jerga de marketing, "revolucionario", "game-changer", emojis en títulos.

## 3. Tokens

### Colores

| Rol semántico     | Claro                  | Oscuro                          |
| ----------------- | ---------------------- | ------------------------------- |
| `bg`              | `#f7f5f0` (paper)      | `#141312`                       |
| `surface`         | `#ffffff`              | `#1c1b19`                       |
| `text`            | `#1c1b19` (ink)        | `#f2efe8`                       |
| `muted`           | `#6b6862` (secondary)  | `#a8a39a`                       |
| `border`          | `#e5e3db` (light)      | `#33302b`                       |
| `accent`          | `#c75b39` (terracotta) | `#d97757` (terracotta aclarado) |
| `accent-contrast` | `#ffffff`              | `#141312`                       |
| `focus`           | `#c75b39`              | `#d97757`                       |
| `code-bg`         | `#f0ede6`              | `#24221f`                       |
| `success`         | `#2e5a44` (sage)       | `#5a8a6e`                       |
| `warning`         | `#d9a05b` (mustard)    | `#e6b87a`                       |

### Tipografía

| Rol     | Familia        | Uso                            |
| ------- | -------------- | ------------------------------ |
| Display | Fraunces       | H1, títulos de post, hero      |
| Body    | Inter          | Párrafos, UI, botones          |
| Mono    | JetBrains Mono | fechas, tags, metadata, código |

### Escala fluida (rem)

| Token     | Valor                                     |
| --------- | ----------------------------------------- |
| `display` | `clamp(2.25rem, 1.5rem + 3vw, 3.5rem)`    |
| `h1`      | `clamp(1.875rem, 1.25rem + 2vw, 2.75rem)` |
| `h2`      | `clamp(1.375rem, 1rem + 1.2vw, 1.75rem)`  |
| `h3`      | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` |
| `body`    | `1rem` (16px)                             |
| `small`   | `0.875rem` (14px)                         |
| `mono`    | `0.875rem` (14px)                         |

Line-heights: display `1.05`, h1 `1.1`, h2 `1.2`, h3 `1.3`, body `1.65`, small `1.5`, mono `1.5`. Tracking: display `-0.02em`, h1/h2 `-0.01em`, body `0`, mono `0.02em`.

### Espaciado (base 4px)

`4, 8, 12, 16, 24, 32, 48, 64, 96` px (0.25rem increments: `0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6` rem).

### Radios

`4px` (chips, inputs), `8px` (botones, cards, code), `12px` (contenedores grandes). Hairlines `1px`.

### Sombras

Mínimas: `shadow-sm: 0 1px 2px rgba(0,0,0,0.04)`; `shadow-focus: 0 0 0 2px var(--bg), 0 0 0 4px var(--focus)`. Sin sombras dramáticas.

### Anchos máximos

- Artículo (prosa): `68ch`.
- Shell/índice: `1100px`.
- Columna de posts en home: `720px` centrada.

### Breakpoints

`640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl).

## 4. Reglas tipográficas

- Medidas: body 16px; display hasta 56px. No texto por debajo de 14px.
- Line-height body 1.65; headings 1.05–1.3.
- Tracking negativo solo en display/headings; mono con tracking positivo leve.
- Serif (Fraunces) para headings, títulos de post, citas y pull quotes. Sans (Inter) para cuerpo y UI. Mono para metadata, fechas, tags, código.
- Máximo 3 niveles de heading en un artículo (h1 título, h2, h3). No h4+.
- Blockquotes: Fraunces italic, borde izquierdo 2px accent, padding-left 16px, color muted para atribución.
- Pull quotes: Fraunces italic, tamaño h2, centrado, máx. 2 por artículo.
- Drop caps: no.
- Numeración de secciones: no en artículos; solo en listas ordenadas cuando aporte.

## 5. Componentes

- **Header:** logo "Espacio Latente" en Fraunces; nav (Inicio, Etiquetas, Búsqueda, Sobre mí); altura 64px; borde inferior hairline; sticky.
- **Footer:** copyright, enlaces (RSS, GitHub, portfolio), mono small.
- **Home hero:** H1 "Espacio Latente" + tagline + deck corto; max 68ch.
- **Post card:** cover 16:9 arriba, fecha (mono), título (serif), deck, meta (tiempo de lectura, tags), tags chips. Lista vertical, no grid infinito.
- **Tag chip:** mono small, borde 1px, radius 4px, padding 2px 8px; hover accent.
- **Botón/link:** links color accent con underline en hover; botones radius 8px, padding 8px 16px, bg accent, texto accent-contrast.
- **Prosa:** max 68ch, Inter, párrafos con margin-bottom 16px, listas con indent 24px.
- **Bloque de código:** JetBrains Mono, code-bg, borde 1px, radius 8px, padding 16px, scroll horizontal, sin sombras.
- **Tabla:** hairlines 1px, header bold, padding 8px 12px, sin zebra.
- **Figura + caption:** imagen (16:9 o natural), caption small muted, centrado debajo.
- **Share row:** enlaces (X, LinkedIn, copiar enlace) en mono small, separados por `·`? Usar comas o `|`; no usar `·` (renderiza mal en T1). Aquí web: usar `·` está bien en HTML, pero preferir `|`.
- **Buscador:** input con borde 1px, radius 4px, padding 8px 12px; resultados como lista de post cards compactas; estado vacío con mensaje y sugerencias.
- **Paginación:** no en MVP.
- **404:** mensaje claro + enlace a inicio.

## 6. Layouts

- **Home:** shell 1100px; hero max 68ch; lista vertical de post cards max 720px centrada; footer.
- **Artículo:** header; cover 16:9 opcional; título + deck + meta; prosa 68ch centrada; tags; share row; footer.
- **Índice de etiquetas:** lista de tags con conteo, envueltos en chips; shell 1100px.
- **Tag:** título "Etiqueta: X"; lista de posts filtrados.
- **Búsqueda:** input destacado + resultados + estado vacío.

## 7. Dark mode

- Activación automática vía `prefers-color-scheme: dark`. Sin toggle manual en MVP.
- Cambia: bg, surface, text, muted, border, accent (aclarado), code-bg, success/warning.
- No cambia: tipografía, espaciado, radios, anchos, jerarquía, layout.
- Contraste: texto principal ≥ 4.5:1; texto grande ≥ 3:1; accent sobre bg ≥ 4.5:1 en ambos modos.

## 8. Motion

- Duraciones: `120ms` (micro), `200ms` (estándar), `300ms` (transiciones de página).
- Easings: `ease-out` para entradas, `ease-in-out` para hover, `cubic-bezier(0.2, 0, 0, 1)` para view transitions.
- Hover: cambio de color/borde en 120ms; sin transformaciones grandes.
- View transitions (Astro): permitidas, fade 200–300ms.
- `prefers-reduced-motion: reduce`: desactivar animaciones y transiciones (duración 0ms).

## 9. Accesibilidad

- Contraste AA (4.5:1 cuerpo, 3:1 texto grande).
- Foco visible: ring 2px (shadow-focus) en todos los interactivos.
- Skip link al contenido principal.
- Landmarks: `header`, `main`, `footer`, `nav`.
- Alt text descriptivo en imágenes; decorativas con `alt=""`.
- Navegación por teclado completa; targets mínimos 44×44px.
- Idioma `lang="es"`.

## 10. Imágenes y OG

- Portadas de post: recorte 16:9 para cards.
- OG image: 1200×630, safe area (título máx. 2 líneas, margen 80px).
- Fallback: `og-default.png`.
- Tratamiento: portadas locales (optimizadas) y externas (proxy/cache si aplica); siempre con alt.
- Presupuesto de peso: portada ≤ 200 KB (WebP/AVIF), OG ≤ 300 KB, avatar ≤ 50 KB.

## 11. Anti-patrones

Visuales: gradientes, glassmorphism, sombras dramáticas, grids infinitos de cards, más de un acento para links, drop caps, animaciones decorativas, parallax.

Editoriales: clickbait, emojis en títulos, "revolucionario/game-changer", porcentajes no medidos, afirmaciones sin fuente, corporativismo, más de 3 niveles de heading.

## 12. Checklist de implementación

- [ ] Tokens definidos en `global.css` con nombres exactos.
- [ ] Dark mode vía `prefers-color-scheme`, sin toggle.
- [ ] Prosa max 68ch, shell max 1100px.
- [ ] Tres familias tipográficas con roles correctos.
- [ ] Un solo acento (terracotta) para links/acciones.
- [ ] Sin gradientes/glassmorphism/sombras dramáticas.
- [ ] Foco visible, skip link, landmarks.
- [ ] Portadas 16:9, OG 1200×630, fallback.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Contraste AA verificado en ambos modos.
