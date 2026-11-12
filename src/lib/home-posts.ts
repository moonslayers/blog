import type { BlogPost } from "./posts";

export type HomePosts = {
  featured: BlogPost | null;
  rest: BlogPost[];
};

export function selectHomePosts(posts: BlogPost[]): HomePosts {
  if (posts.length === 0) {
    return { featured: null, rest: [] };
  }
  const featured =
    posts.find((post) => post.data.featured === true) ?? posts[0];
  return { featured, rest: posts.filter((post) => post !== featured) };
}
