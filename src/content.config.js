import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "*.md{,x}", base: "./src/data/blog-posts" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		publishDate: z.union([z.string(), z.date()]),
		description: z.string(),
		thumbnailUrl: image(),
	}),
});

export const collections = { posts };