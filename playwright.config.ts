import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';



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
    ['html', { outputFolder: 'deliverable-artifacts/reports', open: 'never' }],
  ],
  outputDir: 'deliverable-artifacts/results',
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    testIdAttribute: "data-test"
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});