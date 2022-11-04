export const appToolbar = Object.freeze({
  getAppTitle: () => cy.get('.MuiToolbar-root').findByText('Web Toolbox'),

  getSettingsLink: () => cy.findByRole('link', { name: 'Settings' }),

  getAboutLink: () => cy.findByRole('link', { name: 'About this application…' }),
});
