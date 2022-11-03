export const appToolbar = Object.freeze({
  getAppTitles: () => cy.findAllByText('Web Toolbox'),

  getSettingsLink: () => cy.findByRole('link', { name: 'Settings' }),

  getAboutLink: () => cy.findByRole('link', { name: 'About this application…' }),
});
