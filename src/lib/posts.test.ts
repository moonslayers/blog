import { describe, it, expect } from "vitest";

import { selectHomePosts } from "./home-posts";
import type { BlogPost } from "./posts";

function makePost(id: string, featured?: boolean): BlogPost {
  return {
    id,
    collection: "blog",
    data: {
      title: id,
      description: `Descripción de ${id}`,
      date: new Date("2026-01-01"),
      tags: [],
      author: "Jorge Marquez",
      draft: false,
      ...(featured === undefined ? {} : { featured }),
    },
  } as unknown as BlogPost;
}

describe("selectHomePosts", () => {
  it("elige el post con featured true aunque esté en medio", () => {
    const posts = [makePost("a"), makePost("b", true), makePost("c")];
    const { featured, rest } = selectHomePosts(posts);
    expect(featured?.id).toBe("b");
    expect(rest.map((post) => post.id)).toEqual(["a", "c"]);
  });

  it("sin flag elige el primero de la lista", () => {
    const posts = [makePost("a"), makePost("b"), makePost("c")];
    const { featured, rest } = selectHomePosts(posts);
    expect(featured?.id).toBe("a");
    expect(rest.map((post) => post.id)).toEqual(["b", "c"]);
  });

  it("el destacado no aparece en rest y se mantiene el orden", () => {
    const posts = [makePost("a"), makePost("b"), makePost("c", true)];
    const { featured, rest } = selectHomePosts(posts);
    expect(featured?.id).toBe("c");
    expect(rest.map((post) => post.id)).toEqual(["a", "b"]);
    expect(rest).not.toContain(featured);
  });

  it("lista vacía devuelve featured null y rest vacío", () => {
    expect(selectHomePosts([])).toEqual({ featured: null, rest: [] });
  });

  it("un solo post lo devuelve como featured con rest vacío", () => {
    const posts = [makePost("a")];
    const { featured, rest } = selectHomePosts(posts);
    expect(featured?.id).toBe("a");
    expect(rest).toEqual([]);
  });

  it("con dos posts destacados gana el primero y el segundo queda en rest", () => {
    const posts = [makePost("a", true), makePost("b", true)];
    const { featured, rest } = selectHomePosts(posts);
    expect(featured?.id).toBe("a");
    expect(rest.map((post) => post.id)).toEqual(["b"]);
  });
});
