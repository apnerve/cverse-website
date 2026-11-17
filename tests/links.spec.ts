import { test, expect, type Page } from '@playwright/test';
import { allPages } from './pages';

/**
 * Every link on every page must resolve:
 *  - "#id" anchors point at an element that exists on the page
 *  - internal URLs return 2xx
 *  - mailto: links are well formed
 *  - external URLs respond with a non-error status
 */
const externalCache = new Map<string, Promise<number>>();

async function statusOf(page: Page, url: string): Promise<number> {
  if (!externalCache.has(url)) {
    externalCache.set(
      url,
      page.request
        .get(url, { maxRedirects: 5, timeout: 15_000, failOnStatusCode: false })
        .then((r) => r.status())
        .catch(() => 0),
    );
  }
  return externalCache.get(url)!;
}

for (const path of allPages) {
  test(`all links resolve on ${path}`, async ({ page, baseURL }) => {
    test.skip(test.info().project.name === 'mobile', 'Link graph is identical on mobile');
    await page.goto(path);
    const links = await page.locator('a[href]').evaluateAll((as) =>
      as.map((a) => ({ href: a.getAttribute('href')!, text: (a.textContent || a.getAttribute('aria-label') || '').trim() })),
    );
    expect(links.length).toBeGreaterThan(path === '/' ? 2 : 5);

    const problems: string[] = [];
    for (const { href, text } of links) {
      if (href === '#' || href === '') {
        problems.push(`dead link "${text}" -> "${href}"`);
        continue;
      }
      if (href.startsWith('mailto:')) {
        if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(href)) problems.push(`bad mailto "${href}"`);
        continue;
      }
      const url = new URL(href, baseURL + path);
      const internal = url.origin === new URL(baseURL!).origin;

      if (internal) {
        const samePage = url.pathname === new URL(baseURL + path).pathname;
        if (url.hash && samePage) {
          const count = await page.locator(`[id="${url.hash.slice(1)}"]`).count();
          if (count !== 1) problems.push(`anchor "${text}" -> ${href}: target id "${url.hash.slice(1)}" found ${count} times`);
          continue;
        }
        const status = await statusOf(page, url.href.split('#')[0]);
        if (status < 200 || status >= 400) problems.push(`internal "${text}" -> ${href}: HTTP ${status}`);
        if (url.hash) {
          // Cross-page anchor: the target page must contain the id.
          const res = await page.request.get(url.href.split('#')[0]);
          const html = await res.text();
          if (!html.includes(`id="${url.hash.slice(1)}"`)) problems.push(`cross-page anchor "${text}" -> ${href}: id missing on target`);
        }
      } else {
        const status = await statusOf(page, url.href);
        if (status < 200 || status >= 400) problems.push(`external "${text}" -> ${href}: HTTP ${status}`);
      }
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });
}
