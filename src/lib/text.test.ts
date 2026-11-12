import { describe, it, expect } from "vitest";
import {
  normalizeText,
  tagSlug,
  readingTime,
  formatDate,
  isExternalUrl,
} from "./text";

describe("normalizeText", () => {
  it("lowercases and strips accents", () => {
    expect(normalizeText("Hólá MUndo")).toBe("hola mundo");
  });
  it("collapses whitespace", () => {
    expect(normalizeText("a   b\t\nc")).toBe("a b c");
  });
});

describe("tagSlug", () => {
  it("handles spaces, accents and hyphens", () => {
    expect(tagSlug("  Hola  Mundo  ")).toBe("hola-mundo");
    expect(tagSlug("Café---Té")).toBe("cafe-te");
    expect(tagSlug("--a--b--")).toBe("a-b");
  });
});

describe("readingTime", () => {
  it("empty -> 1", () => expect(readingTime("")).toBe(1));
  it("undefined -> 1", () => expect(readingTime(undefined)).toBe(1));
  it("null -> 1", () => expect(readingTime(null)).toBe(1));
  it("1 word -> 1", () => expect(readingTime("hola")).toBe(1));
  it("200 words -> 1", () =>
    expect(readingTime(Array(200).fill("a").join(" "))).toBe(1));
  it("201 words -> 2", () =>
    expect(readingTime(Array(201).fill("a").join(" "))).toBe(2));
  it("1000 words -> 5", () =>
    expect(readingTime(Array(1000).fill("a").join(" "))).toBe(5));
});

describe("formatDate", () => {
  it("keeps 31 oct 2026 in UTC", () => {
    const d = new Date(Date.UTC(2026, 9, 31));
    const out = formatDate(d);
    expect(out).toContain("31");
    expect(out.toLowerCase()).toContain("octubre");
  });
});

describe("isExternalUrl", () => {
  it("true for http/https", () => {
    expect(isExternalUrl("http://example.com")).toBe(true);
    expect(isExternalUrl("https://example.com")).toBe(true);
  });
  it("false otherwise", () => {
    expect(isExternalUrl("/foo")).toBe(false);
    expect(isExternalUrl("ftp://x")).toBe(false);
  });
});
