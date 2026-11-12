import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { withBase, absoluteUrl } from "./url";

export type BlogPost = CollectionEntry<"blog">;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const entries = await getCollection(
    "blog",
    ({ data }) => data.draft !== true,
  );
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.id === slug);
}

export async function getAdjacentPosts(slug: string): Promise<{
  previous: BlogPost | null;
  next: BlogPost | null;
}> {
  const posts = await getPublishedPosts();
  const index = posts.findIndex((post) => post.id === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }
  return {
    previous: index + 1 < posts.length ? posts[index + 1] : null,
    next: index - 1 >= 0 ? posts[index - 1] : null,
  };
}

export function readingTime(body?: string): number {
  const words = body ? body.trim().split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
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

export async function getAllTags(): Promise<
  { tag: string; slug: string; count: number }[]
> {
  const posts = await getPublishedPosts();
  const map = new Map<string, { tag: string; slug: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { tag, slug, count: 1 });
      }
    }
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "es"),
  );
}

export function postPath(slug: string): string {
  return withBase(`/articulos/${slug}/`);
}

export function coverFor(post: BlogPost): { src: string; absolute: string } {
  const cover = post.data.cover;
  if (cover && (cover.startsWith("http://") || cover.startsWith("https://"))) {
    return { src: cover, absolute: cover };
  }
  const path = cover && cover.startsWith("/") ? cover : "/og-default.png";
  return { src: withBase(path), absolute: absoluteUrl(path) };
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function searchIndexEntry(post: BlogPost): {
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: number;
  url: string;
  searchText: string;
} {
  return {
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    date: post.data.date.toISOString(),
    readingTime: readingTime(post.body),
    url: postPath(post.id),
    searchText: normalize(
      `${post.data.title} ${post.data.description} ${post.data.tags.join(" ")}`,
    ),
  };
}
