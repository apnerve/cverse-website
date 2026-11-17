// Renders public/og-image.png (1200x630) with Playwright. Run: node scripts/og-image.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const inter = path.join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const wordmark = readFileSync(path.join(root, 'brand/wordmark.svg'), 'utf8').replace(' width="978" height="176"', ' height="96"');
const html = `<!doctype html><html><head><style>
@font-face{font-family:Allo;src:url(file://${path.join(root, 'node_modules/allo-font/fonts/webfonts/AlloVariableFriendly.woff2')}) format('woff2');font-weight:100 900}
html,body{margin:0;width:1200px;height:630px;background:#09090B;font-family:Allo,sans-serif;color:#F8FAFC}
.wrap{position:relative;height:100%;padding:72px 80px;box-sizing:border-box;background:
 linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px) 0 0/56px 56px,
 linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px) 0 0/56px 56px}
.logo svg{display:block}
h1{margin:108px 0 0;font-size:66px;line-height:1.05;letter-spacing:-.03em;font-weight:640;max-width:900px}
h1 em{font-style:normal;color:#3B82F6}
p{margin:26px 0 0;font-size:27px;color:#A1A1AA;max-width:860px;line-height:1.4;font-weight:420}
.eyebrow{position:absolute;bottom:72px;left:80px;font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:#A1A1AA;font-weight:500;font-family:ui-monospace,Menlo,monospace}
</style></head><body><div class="wrap">
<div class="logo">${wordmark}</div>
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
