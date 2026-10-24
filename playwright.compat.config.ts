import { defineConfig } from '@playwright/test'
import base from './playwright.config'

export default defineConfig({
  ...base,
  reporter: [['list'], ['json', { outputFile: 'playwright-report/compatibility.json' }]],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'chrome', use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'edge', use: { browserName: 'chromium', channel: 'msedge' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
})
