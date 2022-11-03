const url = 'http://localhost:3000';

export const homePage = Object.freeze({
  visit: () => {
    cy.visit(url);
  },

  getChangeLogsHeader: () => cy.findByRole('heading', { name: 'Change Logs' }),

  getLastBuild: () => cy.findByText(/^Last build:/i),
});
