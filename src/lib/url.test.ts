import { describe, it, expect } from "vitest";
import { joinBase, toAbsolute } from "./url";

describe("joinBase", () => {
  it("base /blog/, path with slash", () => {
    expect(joinBase("/articulos/foo/", "/blog/")).toBe("/blog/articulos/foo/");
  });
  it("path without slash", () => {
    expect(joinBase("articulos/foo/", "/blog/")).toBe("/blog/articulos/foo/");
  });
  it("already includes base", () => {
    expect(joinBase("/blog/articulos/foo/", "/blog/")).toBe(
      "/blog/articulos/foo/",
    );
  });
  it("base without trailing slash", () => {
    expect(joinBase("/articulos/foo/", "/blog")).toBe("/blog/articulos/foo/");
  });
});

describe("toAbsolute", () => {
  it("builds absolute url", () => {
    expect(toAbsolute("/articulos/foo/", "https://example.com", "/blog/")).toBe(
      "https://example.com/blog/articulos/foo/",
    );
  });
  it("keeps absolute url", () => {
    expect(
      toAbsolute("https://cdn/x.png", "https://example.com", "/blog/"),
    ).toBe("https://cdn/x.png");
  });
});
