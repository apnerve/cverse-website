import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { allPages, landingPages, expectedFont } from './pages';

const REMOVED_SENTENCE = /CVerse\.ai is a premium AI\s*Native Services company/i;

for (const path of allPages) {
  test(`${path} loads cleanly`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on('console', (m) => {
      if (m.type() !== 'error') return;
      if (m.location()?.url?.includes('/fonts/timeless/')) return; // client-supplied font, see public/fonts/timeless/README.md
      consoleErrors.push(`${m.text()} (${m.location()?.url ?? ''})`);
    });
    page.on('pageerror', (e) => consoleErrors.push(e.message));
    page.on('response', (r) => { if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`); });

    const res = await page.goto(path, { waitUntil: 'networkidle' });
    expect(res?.status()).toBe(200);

    // Timeless Grotesk files are supplied by the client; tolerate only those 404s.
    const unexpected = failedRequests.filter((u) => !u.includes('/fonts/timeless/'));
    expect(unexpected, unexpected.join('\n')).toEqual([]);
    expect(consoleErrors, consoleErrors.join('\n')).toEqual([]);

    // Exactly one h1, a title and a meta description.
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.title()).toMatch(/cverse/i);
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc && desc.length).toBeGreaterThan(40);

    // The removed sentence must not appear anywhere (visible text or meta).
    const html = await page.content();
    expect(html).not.toMatch(REMOVED_SENTENCE);
    expect(html).not.toMatch(/premium/i);

    // No horizontal overflow.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    // Let entrance animations finish so axe measures final colours, not mid-fade blends.
    await page.evaluate(() =>
      Promise.all(document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity).map((a) => a.finished)),
    );
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'best-practice']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(
      serious,
      serious.map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`).join('\n'),
    ).toEqual([]);
  });
}

test(`/ uses ${expectedFont}`, async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const family = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontFamily);
  expect(family).toContain(expectedFont);
  const loaded = await page.evaluate((f) => document.fonts.check(`600 16px "${f}"`), expectedFont);
  expect(loaded, `${expectedFont} should be loaded`).toBe(true);
  // Body falls back to Inter until the Timeless Grotesk files are added to /public/fonts/timeless/.
  const body = await page.evaluate(() => document.fonts.check('400 16px "Timeless Grotesk"'));
  test.info().annotations.push({ type: 'note', description: `Timeless Grotesk (body) loaded: ${body}` });
});

for (const path of landingPages) {
  const nav = { servicesLink: 'Services', aboutLink: 'About', aboutTitle: 'About cverse' };
  test(`${path} navigation and mobile menu work`, async ({ page, isMobile }) => {
    await page.goto(path);
    if (isMobile) {
      const toggle = page.getByRole('button', { name: 'Open menu' });
      await toggle.click();
      await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible();
      const menu = page.locator('#mobile-menu');
      await expect(menu).toBeVisible();
      await menu.getByRole('link', { name: nav.servicesLink }).click();
      await expect(menu).toBeHidden();
    } else {
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: nav.aboutLink }).click();
    }
    await expect(page).toHaveURL(/#(services|about)$/);
    await expect(page.locator('#about h2')).toHaveText(nav.aboutTitle);
  });
}

test('floating call to action yields to the hero and contact buttons', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  // Desktop: the header button. Mobile: a bar fixed to the bottom of the viewport.
  const floating = page.locator(isMobile ? '#mobile-cta' : '#header-cta');
  const other = page.locator(isMobile ? '#header-cta' : '#mobile-cta');
  await expect(other).toBeHidden();
  // At the top the hero button is on screen, so the floating one is faded out.
  await expect(floating).toBeHidden();
  await expect(floating).toHaveAttribute('data-hidden', '');
  // Mid-page neither button is on screen: it fades in.
  await page.locator('#how-we-work').scrollIntoViewIfNeeded();
  await expect(floating).toBeVisible();
  if (isMobile) {
    // The open menu has its own button, so the bar steps aside until the menu closes.
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(floating).toBeHidden();
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(floating).toBeVisible();
  }
  // At the contact section its button is on screen: faded out again.
  await page.locator('#contact [data-cta]').scrollIntoViewIfNeeded();
  await expect(floating).toBeHidden();
  // The faded button is not reachable by keyboard.
  const focusable = await floating.locator('a').evaluate((el) => { (el as HTMLElement).focus(); return document.activeElement === el; });
  expect(focusable).toBe(false);
});

test('reduced motion disables the hero animation', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  const anim = await page.locator('.hero-blob-a').evaluate((el) => getComputedStyle(el).animationName);
  expect(anim).toBe('none');
  await ctx.close();
});
