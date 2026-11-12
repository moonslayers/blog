export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function tagSlug(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function readingTime(body?: string | null): number {
  const words = body ? body.trim().split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

export function isExternalUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}
