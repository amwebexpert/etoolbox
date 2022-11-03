export const appDrawer = Object.freeze({
  getAppLogo: () => cy.findByAltText('Web Toolbox'),

  getMenuItemHome: () => cy.findByRole('link', { name: 'Home' }),

  getToggleMenu: () => cy.findByRole('button', { name: 'Toggle sidebar menu' }),
});
