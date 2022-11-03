export const homePage = Object.freeze({
  visit: () => {
    cy.visitHomeScreen();
  },

  getChangeLogsHeader: () => cy.findByRole('heading', { name: 'Change Logs' }),

  getLastBuild: () => cy.findByText(/^Last build:/i),
});
