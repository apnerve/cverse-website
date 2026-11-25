import { test, expect } from '@playwright/test';

// Hard-coded because tests cannot import astro:content. Raise a count when a piece of that kind is published.
const expectedCounts: Record<string, number> = { 'case-study': 1, note: 0, guide: 0 };

for (const [kind, count] of Object.entries(expectedCounts)) {
  test(`/writing/kind/${kind}/ lists ${count} piece(s)`, async ({ page }) => {
    await page.goto(`/writing/kind/${kind}/`);
    await expect(page.locator('ul[aria-label="Writing"] > li')).toHaveCount(count);
    await expect(page.locator('nav[aria-label="Filter by kind"] a[aria-current="page"]')).toHaveCount(1);
  });
}

for (const old of ['/case-studies/', '/case-studies/open-weight-serving-poc/']) {
  test(`${old} redirects under /writing/`, async ({ request }) => {
    const res = await request.get(old);
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain('http-equiv="refresh"');
    expect(body).toContain(old.replace('/case-studies/', '/writing/'));
  });
}
