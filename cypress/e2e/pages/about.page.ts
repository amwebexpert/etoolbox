export const aboutPage = Object.freeze({
  getPrivacyPolicyLink: () => cy.findByRole('link', { name: 'Privacy Policy' }),
  getAuthorLink: () => cy.findByRole('link', { name: 'André Masson' }),
});
