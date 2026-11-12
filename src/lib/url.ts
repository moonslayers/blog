function normalizeBase(base: string): string {
  const trimmed = base.trim();
  if (trimmed === "" || trimmed === "/") return "/";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export function joinBase(path: string, base: string): string {
  const normalizedBase = normalizeBase(base);
  const trimmedPath = (path ?? "").trim();
  if (trimmedPath === "" || trimmedPath === "/") return normalizedBase;
  if (/^https?:\/\//i.test(trimmedPath)) return trimmedPath;
  const withLeading = trimmedPath.startsWith("/")
    ? trimmedPath
    : `/${trimmedPath}`;
  if (normalizedBase !== "/") {
    const baseNoSlash = normalizedBase.slice(0, -1);
    if (withLeading === baseNoSlash || withLeading.startsWith(normalizedBase)) {
      return withLeading.replace(/\/{2,}/g, "/");
    }
  }
  const cleanPath = withLeading.replace(/^\/+/, "");
  if (cleanPath === "") return normalizedBase;
  return `${normalizedBase}${cleanPath}`.replace(/\/{2,}/g, "/");
}

export function toAbsolute(path: string, site: string, base: string): string {
  const joined = joinBase(path, base);
  if (/^https?:\/\//i.test(joined)) return joined;
  const origin = site.endsWith("/") ? site.slice(0, -1) : site;
  return new URL(joined, `${origin}/`).toString();
}

export function withBase(path: string): string {
  return joinBase(path, import.meta.env.BASE_URL);
}

export function absoluteUrl(path: string): string {
  const site = import.meta.env.SITE ?? "https://moonslayers.github.io";
  return toAbsolute(path, site, import.meta.env.BASE_URL);
}
