export const appDrawer = Object.freeze({
  getAppLogo: () => cy.findByAltText('Web Toolbox'),

  getMenuItemHome: () => cy.findByRole('link', { name: 'Home' }),

  getMenuItemURLEncode: () => cy.findByRole('link', { name: /^URL parsing/i }),

  getToggleMenu: () => cy.findByRole('button', { name: 'Toggle sidebar menu' }),
});
