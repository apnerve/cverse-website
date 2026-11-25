# CVerse.ai website

Static marketing site built with [Astro](https://astro.build) 7 and Tailwind CSS 4. One page, a
writing section (case studies, notes and guides), and a short privacy policy. The copy is written for the person who picks an AI services vendor (CTO, VP
Engineering, CEO): plain statements, checkable commitments, no claims the page cannot back.

| Route       | Page                                                   |
| ----------- | ------------------------------------------------------ |
| `/`         | Landing page: services, stack, how we work, deliverables, FAQ, about, contact |
| `/writing/` | Everything dated: case studies, notes and guides, newest first, with a kind filter. |
| `/writing/<slug>/` | One piece (Markdown from `src/content/writing/`). Case studies add the facts and key outcomes. |
| `/writing/kind/<kind>/` | The pieces of one kind: `case-study`, `note` or `guide`. Built even when empty. |
| `/case-studies/*` | Redirects for the two URLs that existed before the move to `/writing/`. |
| `/privacy/` | Privacy policy (short, plain language). No terms page: there are no accounts, forms, or analytics, and engagements are governed by signed contracts. |
| `/exec/`    | Redirects to `/` (the page was previewed there before it became the only version). |
| `/brand/`   | Wordmark one-pager: the three versions of the logo side by side, for review (noindex, not linked). |

## Commands

```sh
npm install
npm run dev        # local dev server
npm run build      # static build to dist/
npm run preview    # serve dist/ with Astro's preview server
npm test           # Playwright: links, console errors, fonts, a11y (axe), mobile menu, floating CTA, reduced motion
npm run spell      # cspell over source and built HTML
npm run og-image   # regenerate public/og-image.png
```

If a dev server already holds port 4321, run the tests on another port: `PORT=4398 npm test`.

## Where things live

- `src/data/exec.ts` – all page copy. Edit text here, not in components. Lines marked `CONFIRM` state
  facts about how cverse works and must be checked before go-live; `SLOT` marks where a publishable fact
  (team size, founding year, client outcomes) can be added later.
- `src/data/site.ts` – company name, email, address, social URLs, default title and description.
- `src/content/writing/*.md` – one file per piece (kind in the frontmatter); `src/content.config.ts` holds the schema and
  `src/lib/writing.ts` the shared ordering, draft filter, labels and URL helpers. See "Adding a piece of writing".
- `src/components/` – page sections. `Landing.astro` composes the home page; `LegalPage.astro` wraps the privacy policy;
  `ArticlePage.astro` wraps a piece of writing; `WritingList.astro` is the index and kind pages. Building blocks shared by the sections: `Section` (band + heading, optional
  split layout), `FeatureCard` (icon card), `ChipList` (tags), `CtaButton` (primary/secondary link), `StatList` (key
  outcomes), `Quote` (attributed quotation) and `ArticleCard`. All are props-only; no component holds state.
- `src/components/Header.astro` and `MobileCta.astro` – the floating call to action. The header button
  (desktop) and the bottom bar (mobile) show only while no other call-to-action button is on screen.
- `src/layouts/Base.astro` – `<head>`, meta/OG tags, JSON-LD. `Shell.astro` adds the theme CSS (tokens and the IBM Plex fonts).
- `src/styles/global.css` – Tailwind import, semantic design tokens, components, animations.
- `src/styles/theme.css` – colours, radii, shadows, typefaces.
- `tests/` – Playwright suites. `playwright.config.ts` builds and serves `dist/` (via `scripts/serve.mjs`) automatically.

## Adding a piece of writing

1. Add a Markdown file to `src/content/writing/`; the file name becomes the URL slug. Set `kind` to `case-study`,
   `note` or `guide`, and give it `title`, `summary`, `publishedAt`, `tags`. For a case study copy
   `open-weight-serving-poc.md`.
2. A case study also needs `client` (a descriptor, not a name), `industry`, `engagement`, `duration`, `services`,
   `stack`, one to three `outcomes`, and optional `quotes`. Set `draft: true` until the client has approved it;
   drafts are not built or listed.
3. A case-study body is 300 to 500 words in three `##` sections: The challenge, What we built, The outcome, about
   100 words each. Notes and guides use whatever headings they need. Make the client the grammatical subject,
   give every number its baseline and date, and include at least one thing that went wrong or was cut. The
   `case-study` skill (`~/.claude/skills/case-study`) holds the full writing guide and the fact-finding interview.
   Publish no figure that the client has not confirmed; keep `CONFIRM` notes as YAML comments in the frontmatter,
   not as HTML comments in the body (those end up in the built HTML).
4. When it is published, add the route to `writingPages` in `tests/pages.ts`, raise the kind's count in
   `tests/writing.spec.ts`, and add any new proper nouns to `cspell.json`.

## Deployment

Live preview: https://labs.apnerve.com/cverse-website/ (repo: https://github.com/apnerve/cverse-website)

Pushes to `main` run `.github/workflows/deploy.yml`, which builds with `BASE_PATH=/<repo>/` and
`SITE_URL=https://<owner>.github.io` and publishes `dist/` to GitHub Pages (no Jekyll; `public/.nojekyll`
is included). For the production domain, build without those env vars (defaults: `/` and `https://cverse.ai`).

## Before go-live

1. **Confirm the facts.** Review every `CONFIRM` line in `src/data/exec.ts`: fixed pricing, discovery length,
   release cadence, support period, SOC 2 status, reply time, and references. Fill or delete the `SLOT` comments.
   Review the `CONFIRM` list in the frontmatter of each file in `src/content/writing/` and the intro in
   `execWritingSection`.
2. **Social links.** Set `site.social.linkedin` and `site.social.x` in `src/data/site.ts`. Icons are hidden
   while a URL is empty, so no dead links ship.
3. **Domain.** `astro.config.mjs` defaults to `https://cverse.ai` at `/` (overridable with `SITE_URL` and
   `BASE_PATH`); `site.url` in `src/data/site.ts` feeds canonical and Open Graph URLs. `robots.txt` references the sitemap.
4. **Privacy policy** was drafted for review, not by a lawyer. Have it checked before publishing.
