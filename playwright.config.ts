import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'tests/**/*.feature',
    steps: ['tests/**/steps.ts', 'tests/**/hooks.ts'],
    
  });

export default defineConfig({
  testDir: testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'deliverable-artifacts/reports/playwright', open: 'never' }],
    ['json', { outputFile: 'deliverable-artifacts/reports/playwright/index.json',  open: 'never'}],
    cucumberReporter('html', {
      outputFile: 'deliverable-artifacts/reports/cucumber/index.html',
    })
  ],
  outputDir: 'deliverable-artifacts/results',
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    testIdAttribute: "data-test",
    bypassCSP: true,
    launchOptions: {
      args: ['--disable-web-security'],
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});