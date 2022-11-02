export {};

describe('Home page', () => {
  const appTitle = 'Web Toolbox';
  const appAboutButtonTitle = 'About this application…';
  const privacyPolicy = 'Privacy Policy';

  const url = 'http://localhost:3000';

  describe('when we visit the Home page of Web Toolbox', () => {
    before(() => {
      cy.visit(url);
    });

    it('should display the app logo', () => {
      // given

      // when

      // then
      cy.findAllByAltText(appTitle).should('exist');
      cy.findAllByAltText(appTitle).should('have.length', 1);
    });

    it('should display the application title', () => {
      // given

      // when

      // then
      cy.findAllByText(appTitle).should('exist');
      cy.findAllByText(appTitle).should('have.length', 2);
    });

    it('should display the about icon button', () => {
      // given

      // when

      // then
      cy.findAllByTitle(appAboutButtonTitle).should('exist');
    });
  });

  describe('when we press the About button', () => {
    beforeEach(() => {
      cy.visit(url);
    });

    it('should navigate to the About screen', () => {
      // given

      // when
      cy.findAllByTitle(appAboutButtonTitle).click();

      // then
      cy.findByText(privacyPolicy).should('exist');
    });
  });
});
