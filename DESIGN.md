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
- Home: composición de `960px` centrada en el shell `1100px`, sin rail lateral; hero alineado a la composición con intro limitado a `68ch`; lista a ancho completo de la composición y banda inferior en 2 columnas; en `<=1024px` la banda colapsa a 1 columna.
- Grid de post cards (archivo, etiqueta): a ancho del shell `1100px`, 2 columnas con `repeat(auto-fit, minmax(min(100%, 340px), 1fr))`; con 1 solo post se limita a `minmax(0, 640px)` centrado; en `<=700px` 1 columna.

### Breakpoints

`640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl).

## 4. Reglas tipográficas

- Medidas: body 16px; display hasta 56px. El texto de lectura no baja de 14px; la metadata mono auxiliar (footer, captions) puede usar 0.75rem con tracking positivo leve.
- Line-height body 1.65; headings 1.05–1.3.
- Tracking negativo solo en display/headings; mono con tracking positivo leve.
- Serif (Fraunces) para headings, títulos de post, citas y pull quotes. Sans (Inter) para cuerpo y UI. Mono para metadata, fechas, tags, código.
- Máximo 3 niveles de heading en un artículo (h1 título, h2, h3). No h4+.
- Blockquotes: Fraunces italic, borde izquierdo 2px accent, padding-left 16px, color muted para atribución.
- Pull quotes: Fraunces italic, tamaño h2, centrado, máx. 2 por artículo.
- Drop caps: no.
- Numeración de secciones: no en artículos; solo en listas ordenadas cuando aporte.

## 5. Componentes

- **Header:** sticky, borde inferior hairline, sin sombras; logo "Espacio Latente" en Fraunces; una sola nav con 5 enlaces (Inicio, Etiquetas, Buscar, RSS, Portafolio — externo en pestaña nueva); control de tema cíclico (44×44px); altura 64px en desktop. En `<=768px` el header es una sola fila compacta de 60px (marca con ellipsis + tema + hamburguesa de 44×44px, sin wrap) y la nav vive en un único panel superpuesto bajo el header (no empuja el contenido): botón con `aria-expanded`/`aria-controls` y etiqueta abrir/cerrar, cierre con Escape, clic/tap fuera y al pasar a desktop, retorno de foco al botón y navegación por teclado; sin JS la hamburguesa queda oculta y la nav se muestra en flujo como dos filas.
- **Footer:** copyright, enlaces (RSS, GitHub, portfolio), mono small.
- **Home hero:** kicker mono con tagline + H1-tesis "Orquestando ideas, delegando propósitos" en Fraunces display; el nombre del blog vive solo en el header y el `<title>`; sin intro largo ni quicknav (la nav está en el header); hero max `960px` centrado.
- **Featured post:** layout split texto + portada 16:9; eyebrow mono "Destacado" en mayúsculas; h2 serif con link; deck; meta mono (fecha, tiempo de lectura); en móvil portada arriba.
- **Post row:** fila con texto a la izquierda + miniatura 16:9 de 200px a la derecha (132px en `<=768px`, 112px en `<=480px`); fecha mono + título serif h3 con link + meta mono (tiempo de lectura); sin deck; hairline superior; se apila en móvil; no hay rail lateral, la fila usa todo el ancho de la composición (960px).
- **Topic strip:** franja de temas con h2 "Temas" y lista de chips con conteo; curada a 6 visibles.
- **Post card:** cover 16:9 arriba, fecha (mono), título (serif), deck, meta (tiempo de lectura, tags), tags chips. Se usa en archivo y listados por etiqueta, no en la home.
- **Tag chip:** estilo compartido en `global.css` (`.tag-chip`, `.tag-chip__count`); mono small, borde 1px, radius 4px, padding 2px 8px; hover accent.
- **Botón/link:** links color accent con underline en hover; botones radius 8px, padding 8px 16px, bg accent, texto accent-contrast.
- **Prosa:** max 68ch, Inter, párrafos con margin-bottom 16px, listas con indent 24px.
- **Bloque de código:** JetBrains Mono, code-bg, borde 1px, radius 8px, padding 16px, scroll horizontal, sin sombras.
- **Tabla:** hairlines 1px, header bold, padding 8px 12px, sin zebra.
- **Figura + caption:** imagen (16:9 o natural), caption small muted, centrado debajo.
- **Share row:** cinco acciones en este orden (WhatsApp, X, LinkedIn, Facebook, Copiar enlace); cada acción es un chip con icono + etiqueta corta en mono small; separación mediante `gap` y `flex-wrap`, sin separadores `·` ni `|`; altura mínima de target 44px, radio 4px, borde hairline; hover: texto a `--ink-primary` y borde/icono a `--accent-terracotta` (no usar terracota como color de texto por contraste); los enlaces abren la app/web correspondiente en pestaña nueva con `rel="noopener noreferrer"`.
- **Buscador:** input con borde 1px, radius 4px, padding 8px 12px; resultados como lista de post cards compactas; estado vacío con mensaje y sugerencias.
- **Paginación:** en archivo, 10 posts por página con enlaces anterior/siguiente.
- **404:** mensaje claro + enlace a inicio.

## 6. Layouts

- **Home:** hero `960px` centrado (kicker + H1-tesis) → destacado full-width split (`960px` centrado) → lista "Últimos artículos" a ancho completo (`960px`, hasta 2 filas + CTA al archivo) → banda inferior `960px` con separador superior (`Temas`, hasta 6 chips, + "Sobre este blog") en grid de 2 columnas `1.5fr / 1fr`; sin rail lateral ni bloque "Explorar"; casos: sin posts solo hero + mensaje vacío (sin lista ni banda si no hay tags); 1 post destacado + banda sin lista; en `<=1024px` la banda colapsa a 1 columna; footer.
- **Artículo:** header; cover 16:9 opcional; título + deck + meta; prosa 68ch centrada; tags; share row; footer.
- **Archivo:** título "Artículos"; grid de post cards a ancho completo del shell (2 columnas, auto-fit con mínimo 340px); con 1 solo post se limita a `minmax(0, 640px)` centrado; paginación.
- **Índice de etiquetas:** lista de tags con conteo, envueltos en chips; shell 1100px.
- **Tag:** título "Etiqueta: X"; grid de post cards filtrados a ancho completo del shell (2 columnas, auto-fit con mínimo 340px); con 1 solo post se limita a `minmax(0, 640px)` centrado.
- **Búsqueda:** input destacado + resultados + estado vacío.

## 7. Dark mode

- Tres estados: claro, oscuro y sistema. Precedencia: elección explícita del usuario > `prefers-color-scheme`.
- Persistencia en `localStorage` con clave `blog:theme`, valores `"light" | "dark" | "system"` (ausente = sistema).
- El modo se aplica con `data-theme="light" | "dark"` en `<html>`; en modo sistema no se escribe el atributo y manda el SO.
- Resolución antes del primer paint con un script inline en `<head>` para evitar flash.
- Tokens de color declarados una sola vez con `light-dark(claro, oscuro)` y `color-scheme`; sin bloque `@media (prefers-color-scheme: dark)`.
- Control: botón cíclico en el header (claro → oscuro → sistema), 44×44px, con iconos `Sun`, `Moon`, `Monitor` de `@lucide/astro` (trazo 1.5, `currentColor`).
- Bloques de código: Shiki con temas duales claro/oscuro y fondo con el token `--code-bg`.
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
- Navegación por teclado completa; targets mínimos 44×44px (en móvil, chips de etiqueta y enlaces del footer alcanzan 44px efectivos mediante área táctil extendida invisible, sin cambiar su densidad visual).
- Anclas y skip link con compensación de scroll bajo el header sticky (`scroll-padding-top`); safe areas (`viewport-fit=cover`, `env()`) y gutter móvil del shell de 16px.
- Idioma `lang="es"`.

## 10. Imágenes y OG

- Portadas de post: recorte 16:9 para cards.
- OG image: 1200×630, safe area (título máx. 2 líneas, margen 80px).
- Fallback: `og-default.png`.
- Tratamiento: portadas locales (optimizadas) y externas (proxy/cache si aplica); siempre con alt.
- Presupuesto de peso: portada ≤ 200 KB (WebP/AVIF), OG ≤ 300 KB, avatar ≤ 50 KB.

## 11. Anti-patrones

Visuales: gradientes, glassmorphism, sombras dramáticas, grids infinitos de cards sin curación (una franja de temas curada o un único destacado no son grids infinitos), más de un acento para links, drop caps, animaciones decorativas, parallax.

Editoriales: clickbait, emojis en títulos, "revolucionario/game-changer", porcentajes no medidos, afirmaciones sin fuente, corporativismo, más de 3 niveles de heading.

## 12. Checklist de implementación

- [ ] Tokens definidos en `global.css` con nombres exactos.
- [ ] Tema en tres estados (claro, oscuro, sistema) con persistencia en `blog:theme`.
- [ ] Sin flash al recargar en oscuro (resolución antes del primer paint).
- [ ] El modo sistema responde al cambio del SO.
- [ ] Bloques de código legibles en ambos modos.
- [ ] Prosa max 68ch, shell max 1100px.
- [ ] Tres familias tipográficas con roles correctos.
- [ ] Un solo acento (terracotta) para links/acciones.
- [ ] Sin gradientes/glassmorphism/sombras dramáticas.
- [ ] Foco visible, skip link, landmarks.
- [ ] Portadas 16:9, OG 1200×630, fallback.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Contraste AA verificado en ambos modos.
- [ ] Share row con cinco acciones (WhatsApp, X, LinkedIn, Facebook, Copiar enlace), iconos + etiquetas, `gap`/`flex-wrap`, target 44px.
- [ ] `npm run check:output` verifica cinco acciones por artículo y URLs compartidas absolutas con slash final.
