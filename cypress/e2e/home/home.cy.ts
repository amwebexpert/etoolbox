export {};

describe('Home page', () => {
  const appTitle = 'Web Toolbox';
  const url = 'http://localhost:3000';

  describe('When we visit the Home page of Web Toolbox', () => {
    it('should display the app logo', () => {
      // given

      // when
      cy.visit(url);

      // then
      cy.findAllByAltText(appTitle).should('exist');
      cy.findAllByAltText(appTitle).should('have.length', 1);
    });

    it('should display the application title', () => {
      // given

      // when
      cy.visit(url);

      // then
      cy.findAllByText(appTitle).should('exist');
      cy.findAllByText(appTitle).should('have.length', 2);
    });
  });
});
