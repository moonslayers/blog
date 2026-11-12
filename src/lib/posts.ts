import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { withBase, absoluteUrl } from "./url";
import { normalizeText, tagSlug, readingTime, isExternalUrl } from "./text";
import { selectHomePosts } from "./home-posts";
import type { HomePosts } from "./home-posts";

export type BlogPost = CollectionEntry<"blog">;

export type { HomePosts } from "./home-posts";
export { selectHomePosts } from "./home-posts";

export type SearchEntry = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: number;
  url: string;
  searchText: string;
};

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const today = new Date();
  const entries = await getCollection("blog", ({ data }) => {
    return data.draft !== true && data.date <= today;
  });
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getHomePosts(): Promise<HomePosts> {
  const posts = await getPublishedPosts();
  return selectHomePosts(posts);
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.id === slug);
}

export async function getAdjacentPosts(
  slug: string,
  posts?: BlogPost[],
): Promise<{
  previous: BlogPost | null;
  next: BlogPost | null;
}> {
  const resolved = posts ?? (await getPublishedPosts());
  const index = resolved.findIndex((post) => post.id === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }
  return {
    previous: index + 1 < resolved.length ? resolved[index + 1] : null,
    next: index - 1 >= 0 ? resolved[index - 1] : null,
  };
}

export {
  normalizeText,
  tagSlug,
  readingTime,
  formatDate,
  isExternalUrl,
} from "./text";

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
  if (cover && isExternalUrl(cover)) {
    return { src: cover, absolute: cover };
  }
  const path = cover && cover.startsWith("/") ? cover : "/og-default.png";
  return { src: withBase(path), absolute: absoluteUrl(path) };
}

export function searchIndexEntry(post: BlogPost): SearchEntry {
  return {
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    date: post.data.date.toISOString(),
    readingTime: readingTime(post.body),
    url: postPath(post.id),
    searchText: normalizeText(
      `${post.data.title} ${post.data.description} ${post.data.tags.join(" ")}`,
    ),
  };
}
