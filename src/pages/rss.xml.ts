import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts, postPath, coverFor } from "../lib/posts";
import { SITE_DESCRIPTION } from "../consts";
import { statSync } from "node:fs";
import { join } from "node:path";

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).slice(0, 20);
  const siteBase = new URL(import.meta.env.BASE_URL, context.site!).toString();
  return rss({
    title: "Espacio Latente",
    description: SITE_DESCRIPTION,
    site: siteBase,
    customData: "<language>es</language>",
    items: posts.map((post) => {
      const cover = coverFor(post);
      const coverPath = post.data.cover;
      const isExternal = Boolean(
        coverPath &&
        (coverPath.startsWith("http://") || coverPath.startsWith("https://")),
      );
      let enclosure: { url: string; length: number; type: string } | undefined;
      if (!isExternal) {
        const localPath = join(
          process.cwd(),
          "public",
          coverPath && coverPath.startsWith("/")
            ? coverPath
            : "/og-default.png",
        );
        let length = 0;
        try {
          length = statSync(localPath).size;
        } catch {
          length = 0;
        }
        const resolvedPath =
          coverPath && coverPath.startsWith("/")
            ? coverPath
            : "/og-default.png";
        const enclosureType = resolvedPath.endsWith(".png")
          ? "image/png"
          : resolvedPath.endsWith(".webp")
            ? "image/webp"
            : "image/jpeg";
        if (length > 0) {
          enclosure = { url: cover.absolute, length, type: enclosureType };
        }
      }
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: new URL(postPath(post.id), context.site!).href,
        categories: post.data.tags,
        ...(enclosure ? { enclosure } : {}),
      };
    }),
  });
}
