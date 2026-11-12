import type { APIRoute } from "astro";
import { getPublishedPosts, searchIndexEntry } from "../lib/posts";

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const body = JSON.stringify(posts.map(searchIndexEntry));
  return new Response(body, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
