export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  if (normalizedPath === "") return normalizedBase;
  return `${normalizedBase}${normalizedPath}`;
}

export function absoluteUrl(path: string): string {
  const site = import.meta.env.SITE ?? "https://moonslayers.github.io";
  const origin = site.endsWith("/") ? site.slice(0, -1) : site;
  return new URL(withBase(path), origin).toString();
}
