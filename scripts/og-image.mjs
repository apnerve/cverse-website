// Renders public/og-image.png (1200x630) with Playwright. Run: node scripts/og-image.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const plex = 'data:font/woff2;base64,' + readFileSync(path.join(root, 'node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2')).toString('base64');
const wordmark = readFileSync(path.join(root, 'src/assets/wordmark.svg'), 'utf8').replace(/ width="\d+" height="176"/, ' height="96"');
const html = `<!doctype html><html><head><style>
@font-face{font-family:Plex;src:url(${plex}) format('woff2');font-weight:100 900}
html,body{margin:0;width:1200px;height:630px;background:#0F172A;font-family:Plex,sans-serif;color:#FFFFFF}
.wrap{position:relative;height:100%;padding:72px 80px;box-sizing:border-box;background:
 linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px) 0 0/56px 56px,
 linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px) 0 0/56px 56px}
.logo svg{display:block}
h1{margin:108px 0 0;font-size:66px;line-height:1.05;letter-spacing:-.025em;font-weight:600;max-width:900px}
h1 em{font-style:normal}
.logo{--t-mark:#34D399}
p{margin:26px 0 0;font-size:27px;color:#94A3B8;max-width:860px;line-height:1.5;font-weight:400}
</style></head><body><div class="wrap">
<div class="logo">${wordmark}</div>
<h1>AI systems that <em>run in production.</em></h1>
<p>LLM, agent, and forecasting systems for enterprises, built and run in your own cloud.</p>
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
