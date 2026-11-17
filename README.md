# CVerse.ai website

Static marketing site built with [Astro](https://astro.build) 7 and Tailwind CSS 4. Three visual
versions share one content file and one set of components.

| Route         | Version   | Typeface              | Notes                                        |
| ------------- | --------- | --------------------- | -------------------------------------------- |
| `/corporate/` | Corporate | Timeless Grotesk      | Blue / white. Font files supplied by client. |
| `/dark/`      | Dark      | Space Grotesk         | Dark mode, teal accent.                      |
| `/motion/`    | Motion    | Allo                  | Allo site palette, animated hero and CTAs.   |

`/` is a temporary chooser page (noindex). Each version also has `privacy/` and `terms/` pages.

## Commands

```sh
npm install
npm run dev        # local dev server
npm run build      # static build to dist/
npm run preview    # serve dist/ with Astro's preview server
npm test           # Playwright: links, console errors, fonts, a11y (axe), mobile menu, reduced motion
npm run spell      # cspell over source and built HTML
npm run og-image   # regenerate public/og-image.png
```

## Where things live

- `src/data/site.ts` – all copy, nav, contact details, social URLs. Edit text here, not in components.
- `src/components/` – page sections. `Landing.astro` composes the home page.
- `src/layouts/Base.astro` – `<head>`, meta/OG tags, JSON-LD. `*Shell.astro` pick the theme CSS.
- `src/styles/global.css` – Tailwind import, semantic design tokens, components, animations.
- `src/styles/theme-*.css` – per-version colours, radii, shadows and `@font-face` rules.
- `tests/` – Playwright suites. `playwright.config.ts` builds and serves `dist/` (via `scripts/serve.mjs`) automatically.

## Deployment

Live preview: https://labs.apnerve.com/cverse-website/ (repo: https://github.com/apnerve/cverse-website)

Pushes to `main` run `.github/workflows/deploy.yml`, which builds with `BASE_PATH=/<repo>/` and
`SITE_URL=https://<owner>.github.io` and publishes `dist/` to GitHub Pages (no Jekyll; `public/.nojekyll`
is included). For the production domain, build without those env vars (defaults: `/` and `https://cverse.ai`).

## Before go-live

1. **Social links.** Set `site.social.linkedin` and `site.social.x` in `src/data/site.ts`. Icons are hidden
   while a URL is empty, so no dead links ship.
2. **Timeless Grotesk.** Download from https://www.timeless.co/type and follow
   `public/fonts/timeless/README.md`. Until then the Corporate version falls back to Inter.
3. **Pick a version.** Move the chosen `src/pages/<version>/` files to `src/pages/`, change `base` to `/`,
   delete the other two folders and the chooser. Or keep the folders and add a redirect from `/`.
4. **Domain.** `astro.config.mjs` defaults to `https://cverse.ai` at `/` (overridable with `SITE_URL` and
   `BASE_PATH`); `site.url` in `src/data/site.ts` feeds canonical and Open Graph URLs. `robots.txt` references the sitemap.
5. **Legal pages** were drafted for review, not by a lawyer. Have them checked before publishing.
