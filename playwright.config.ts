import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

// Reuse an already-downloaded Chromium when one is present (saves a 200 MB download).
const cached = [
  join(homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'),
].find((p) => existsSync(p));
const launchOptions = cached ? { executablePath: cached } : {};

const PORT = Number(process.env.PORT ?? 4321); // set PORT when a dev server already holds 4321

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run build && node scripts/serve.mjs ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], launchOptions } },
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions } },
  ],
});
