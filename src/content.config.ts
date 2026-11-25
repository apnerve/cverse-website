/**
 * Content collections. Case studies are Markdown files in src/content/case-studies/,
 * one per engagement; the frontmatter holds the structured parts (facts, outcomes)
 * and the body holds the narrative. See README "Adding a case study".
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    /** One-paragraph lead, shown under the title and on cards. */
    summary: z.string(),
    /** Anonymised descriptor, e.g. "A global consumer-hardware and creative-software company". */
    client: z.string(),
    industry: z.string(),
    /** e.g. "Proof of concept", "Production build". */
    engagement: z.string(),
    /** Written out, e.g. "One week". */
    duration: z.string(),
    /** Labels from execServices where they fit. */
    services: z.array(z.string()).min(1),
    stack: z.array(z.string()).min(1),
    /** Key outcomes: short headline plus a one-line caption. Qualitative unless a figure is confirmed. */
    outcomes: z.array(z.object({ headline: z.string(), caption: z.string() })).min(1).max(4),
    quotes: z.array(z.object({ text: z.string(), name: z.string(), role: z.string() })).optional(),
    publishedAt: z.coerce.date(),
    /** Drafts are not built, linked, or listed in the sitemap. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { 'case-studies': caseStudies };
