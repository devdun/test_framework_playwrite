import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 30000, // Maximum time for each test to run
  retries: 2, // Number of retries for a test in case it fails
  testDir: './tests', // Directory where test files are located
  use: {
    headless: false, // Run tests in headless mode by default
    viewport: { width: 1280, height: 720 }, // Default viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'retain-on-failure', // Capture video on failure
    screenshot: 'only-on-failure', // Capture screenshots on failure
  },
  projects: [
    {
      name: 'chromium', // Project name for Chromium browser
      use: { browserName: 'chromium' }, // Configuration for Chromium
    },
    {
      name: 'firefox', // Project name for Firefox browser
      use: { browserName: 'firefox' }, // Configuration for Firefox
    },
    {
      name: 'webkit', // Project name for WebKit (Safari) browser
      use: { browserName: 'webkit' }, // Configuration for WebKit
    },
  ],
  outputDir: 'test-results/', // Directory to save test results
  reporter: [['html', { open: 'never' }]], // Generate HTML report after tests
};

export default config;
