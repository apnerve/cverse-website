// Renders public/og-image.png (1200x630) with Playwright. Run: node scripts/og-image.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const inter = path.join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const html = `<!doctype html><html><head><style>
@font-face{font-family:Inter;src:url(file://${inter}) format('woff2');font-weight:100 900}
html,body{margin:0;width:1200px;height:630px;background:#0b1324;font-family:Inter,sans-serif;color:#fff}
.wrap{position:relative;height:100%;padding:72px 80px;box-sizing:border-box;background:
 linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px) 0 0/56px 56px,
 linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px) 0 0/56px 56px}
.logo{display:flex;align-items:center;gap:14px;font-weight:700;font-size:28px}
.logo span{display:inline-flex;width:44px;height:44px;border-radius:9px;background:#fff;color:#0b1324;align-items:center;justify-content:center;font-size:24px}
h1{margin:120px 0 0;font-size:72px;line-height:1.05;letter-spacing:-.03em;font-weight:700;max-width:900px}
h1 em{font-style:normal;color:#8fb3ff}
p{margin:28px 0 0;font-size:28px;color:#a7b3c6;max-width:860px;line-height:1.4}
.eyebrow{position:absolute;bottom:72px;left:80px;font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:#7fa6ee;font-weight:600}
</style></head><body><div class="wrap">
<div class="logo"><span>C</span>CVerse.ai</div>
<h1>Architecting AI Systems <em>at Enterprise Scale</em></h1>
<p>LLMOps, custom agentic workflows and custom LLM development for large organizations.</p>
<div class="eyebrow">AI-Native Services</div>
</div></body></html>`;

import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
const cached = path.join(homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const browser = await chromium.launch(existsSync(cached) ? { executablePath: cached } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'public/og-image.png'), type: 'png' });
await browser.close();
console.log('wrote public/og-image.png');
