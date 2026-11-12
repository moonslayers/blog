import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const errors = [];
function fail(msg) {
  errors.push(msg);
}
function exists(rel) {
  return fs.existsSync(path.join(dist, rel));
}
function read(rel) {
  return fs.readFileSync(path.join(dist, rel), "utf8");
}

const requiredFiles = [
  "index.html",
  "articulos/index.html",
  "articulos/memoria-vectorial-alucinaciones/index.html",
  "articulos/skill-bloat-100k-tokens/index.html",
  "buscar/index.html",
  "buscar-index.json",
  "rss.xml",
  "sitemap-index.xml",
  "robots.txt",
];
for (const f of requiredFiles) {
  if (!exists(f)) fail(`Falta archivo: ${f}`);
}

// articles
const articles = [
  "articulos/memoria-vectorial-alucinaciones/index.html",
  "articulos/skill-bloat-100k-tokens/index.html",
];
for (const a of articles) {
  if (!exists(a)) continue;
  const html = read(a);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (
    !canonical ||
    !/^https?:\/\//.test(canonical) ||
    !canonical.includes("/blog/")
  ) {
    fail(`${a}: canonical inválido o sin /blog/`);
  }
  const ogType = html.match(/<meta property="og:type" content="([^"]+)"/)?.[1];
  if (ogType !== "article") fail(`${a}: og:type no es article`);
  const ogImage = html.match(
    /<meta property="og:image" content="([^"]+)"/,
  )?.[1];
  if (
    !ogImage ||
    !/^https?:\/\//.test(ogImage) ||
    !ogImage.includes("/blog/images/posts/")
  ) {
    fail(`${a}: og:image inválida o sin /blog/images/posts/`);
  }
  const w = html.match(
    /<meta property="og:image:width" content="([^"]+)"/,
  )?.[1];
  const h = html.match(
    /<meta property="og:image:height" content="([^"]+)"/,
  )?.[1];
  if (w !== "1200" || h !== "630") fail(`${a}: dimensiones OG no son 1200/630`);
}

// buscar-index.json
if (exists("buscar-index.json")) {
  let data;
  try {
    data = JSON.parse(read("buscar-index.json"));
  } catch (e) {
    fail("buscar-index.json no es JSON válido");
    data = null;
  }
  if (Array.isArray(data)) {
    if (data.length !== 2)
      fail(`buscar-index.json tiene ${data.length} entradas (esperadas 2)`);
    for (const entry of data) {
      if (!entry.url || !String(entry.url).includes("/blog/articulos/")) {
        fail("buscar-index.json: URL no contiene /blog/articulos/");
      }
    }
  } else if (data !== null) {
    fail("buscar-index.json no es un array");
  }
}

// rss.xml
if (exists("rss.xml")) {
  const rss = read("rss.xml");
  const items = rss.match(/<item>/g) || [];
  if (items.length !== 2)
    fail(`rss.xml tiene ${items.length} items (esperados 2)`);
  // rss @astrojs/rss uses <link> inside item; count may include channel link. Check item links absolute.
  const itemBlocks = rss.split("<item>").slice(1);
  for (const block of itemBlocks) {
    const link = block.match(/<link>([^<]+)<\/link>/)?.[1];
    if (!link || !/^https?:\/\//.test(link) || !link.includes("/blog/")) {
      fail("rss.xml: link de item no es absoluto o sin /blog/");
    }
  }
  if (rss.includes("<author>Jorge Marquez</author>")) {
    fail("rss.xml contiene <author>Jorge Marquez</author> inválido");
  }
}

// sitemap
const sitemapFiles = ["sitemap-index.xml", "sitemap-0.xml"];
let sitemapContent = "";
for (const f of sitemapFiles) {
  if (exists(f)) sitemapContent += "\n" + read(f);
}
// also any sitemap-*.xml
for (const f of fs.readdirSync(dist)) {
  if (/^sitemap.*\.xml$/.test(f) && !sitemapFiles.includes(f)) {
    sitemapContent += "\n" + read(f);
  }
}
const mustInclude = ["/blog/", "/blog/articulos/"];
for (const u of mustInclude) {
  if (!sitemapContent.includes(u)) fail(`sitemap no incluye ${u}`);
}
// articles
if (!sitemapContent.includes("memoria-vectorial-alucinaciones"))
  fail("sitemap no incluye artículo memoria-vectorial");
if (!sitemapContent.includes("skill-bloat-100k-tokens"))
  fail("sitemap no incluye artículo skill-bloat");
// tags: discover
const tagsDir = path.join(dist, "etiquetas");
if (fs.existsSync(tagsDir)) {
  for (const name of fs.readdirSync(tagsDir)) {
    const full = path.join(tagsDir, name);
    if (fs.statSync(full).isDirectory()) {
      if (!sitemapContent.includes(`/blog/etiquetas/${name}/`)) {
        fail(`sitemap no incluye tag ${name}`);
      }
    }
  }
}
if (sitemapContent.includes("/buscar/")) fail("sitemap incluye /buscar/");
if (sitemapContent.includes("/404")) fail("sitemap incluye /404");

// images dimensions
function readDims(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    // PNG
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // JPEG
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0xd9) {
      i += 2;
      continue;
    }
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      const h = buf.readUInt16BE(i + 5);
      const w = buf.readUInt16BE(i + 7);
      return { w, h };
    }
    const segLen = buf.readUInt16BE(i + 2);
    i += 2 + segLen;
  }
  return null;
}

const images = [
  "images/posts/memoria-vectorial.jpg",
  "images/posts/skill-bloat.jpg",
  "og-default.png",
];
for (const img of images) {
  const full = path.join(dist, img);
  if (!fs.existsSync(full)) {
    fail(`Falta imagen: ${img}`);
    continue;
  }
  const dims = readDims(full);
  if (!dims || dims.w !== 1200 || dims.h !== 630) {
    fail(
      `Imagen ${img} no es 1200x630 (got ${dims ? dims.w + "x" + dims.h : "unknown"})`,
    );
  }
}

if (errors.length > 0) {
  console.error("check:output FAILED:");
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}
console.log("check:output OK");
