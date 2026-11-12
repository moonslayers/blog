import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().max(160),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      cover: z
        .string()
        .refine(
          (value) =>
            value.startsWith("/images/posts/") || value.startsWith("https://"),
          "cover debe ser ruta local /images/posts/ o URL https://",
        )
        .optional(),
      coverAlt: z.string().optional(),
      author: z.string().default("Jorge Marquez"),
      draft: z.boolean().default(false),
      updated: z.coerce.date().optional(),
    })
    .refine(
      (data) => !data.cover || Boolean(data.coverAlt),
      "coverAlt es obligatorio si hay cover",
    ),
});

export const collections = { blog };
