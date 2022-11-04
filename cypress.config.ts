import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Web Toolbox e2e tests report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, _config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'http://localhost:3000',
  },
});
