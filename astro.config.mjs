// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Production domain and base path. The GitHub Pages workflow overrides both via env
// so the same code deploys at https://<user>.github.io/<repo>/ and at the root of cverse.ai.
const site = process.env.SITE_URL ?? 'https://cverse.ai';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
