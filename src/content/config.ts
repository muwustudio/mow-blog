import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    project: z.string(),
    type: z.string(),
    tech: z.array(z.string()).default([]),
    difficulty: z.string().default('基础'),
    tags: z.array(z.string()).default([]),
    description: z.string().default(''),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};
