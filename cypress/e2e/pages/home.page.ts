const url = 'http://localhost:3000';

export const homePage = Object.freeze({
  visit: () => {
    cy.visit(url);
  },
});
