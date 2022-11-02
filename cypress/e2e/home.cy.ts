export {};

describe('Home page', () => {
  it('should display the home page', () => {
    // given
    const appTitle = 'Web Toolbox';

    // when
    cy.visit('http://localhost:3000');

    // then

    // the app Logo should display the app's title alternate text
    cy.findAllByAltText(appTitle).should('exist');
    cy.findAllByAltText(appTitle).should('have.length', 1);

    // the app title should be visible
    cy.findAllByText(appTitle).should('exist');
    cy.findAllByText(appTitle).should('have.length', 2);
  });
});
