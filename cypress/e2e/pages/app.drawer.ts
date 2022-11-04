export const appDrawer = Object.freeze({
  getAppLogo: () => cy.findByAltText('Web Toolbox'),

  getMenuItemHome: () => cy.findByRole('link', { name: 'Home' }),

  getMenuItemURLEncode: () => cy.findByRole('link', { name: /^URL parsing/i }),

  getMenuItemCSVUtilities: () => cy.findByRole('link', { name: /^CSV utilities/i }),

  getToggleMenu: () => cy.findByRole('button', { name: 'Toggle sidebar menu' }),
});
