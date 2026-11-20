
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Test execution
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 90000,
  expect: { timeout: 15000 },

  // HTML + Allure dutoi report hobe
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],

  // Shared browser settings
  use: {
    trace: 'on-first-retry',
    screenshot: 'on',   // report e screenshot attach howar jonno
    video: 'retain-on-failure',
    actionTimeout: 20000,
  },

  // Browser configuration
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
