import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  timeout: 30000,
  expect: { timeout: 6000 },
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5174', browserName: 'chromium', viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:5174', reuseExistingServer: true },
})
