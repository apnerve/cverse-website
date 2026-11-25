/**
 * Content collections. `writing` holds every dated piece on the site: case studies, notes and guides, one
 * Markdown file each in src/content/writing/. The frontmatter holds the structured parts (kind, tags, and for
 * case studies the facts and outcomes); the body holds the prose. See README "Adding a piece of writing".
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const KINDS = ['case-study', 'note', 'guide'] as const;

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z
    .object({
      kind: z.enum(KINDS),
      title: z.string(),
      /** One-paragraph lead, shown under the title and on cards. */
      summary: z.string(),
      publishedAt: z.coerce.date(),
      /** Drafts are not built, linked, or listed in the sitemap. */
      draft: z.boolean().default(false),
      /** Plain labels, shown as chips. Not linked until there are enough pieces to filter. */
      tags: z.array(z.string()).default([]),

      // Case studies only. Required for kind "case-study" (checked below), ignored otherwise.
      /** Anonymised descriptor, e.g. "A global consumer-hardware and creative-software company". */
      client: z.string().optional(),
      industry: z.string().optional(),
      /** e.g. "Proof of concept", "Production build", "Team augmentation". */
      engagement: z.string().optional(),
      /** Written out, e.g. "One week". */
      duration: z.string().optional(),
      /** Labels from execServices where they fit. */
      services: z.array(z.string()).optional(),
      stack: z.array(z.string()).optional(),
      /** Key outcomes: short headline plus a one-line caption. Qualitative unless a figure is confirmed. */
      outcomes: z.array(z.object({ headline: z.string(), caption: z.string() })).min(1).max(3).optional(),
      quotes: z.array(z.object({ text: z.string(), name: z.string(), role: z.string() })).optional(),
    })
    .superRefine((d, ctx) => {
      if (d.kind !== 'case-study') return;
      for (const f of ['client', 'industry', 'engagement', 'duration', 'outcomes'] as const) {
        if (!d[f]) ctx.addIssue({ code: 'custom', path: [f], message: `${f} is required for kind "case-study"` });
      }
    }),
});

export const collections = { writing };
