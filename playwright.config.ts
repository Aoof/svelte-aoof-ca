import { defineConfig } from '@playwright/test';

// Tests run against the production build: `npm run build` first, then `npm test`.
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'node build/index.js',
    env: { PORT: '4173' },
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI
  }
});
