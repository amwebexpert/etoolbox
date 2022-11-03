import { aboutPage } from '../pages/about.page';
import { appDrawer } from '../pages/app.drawer';
import { appToolbar } from '../pages/app.toolbar';
import { homePage } from '../pages/home.page';

describe('Home screen', () => {
  describe('when we visit the Root of Web Toolbox app', () => {
    before(() => {
      // given
      homePage.visit();
    });

    it('should navigate to the Home route', () => {
      cy.url().should('include', '/Home');
    });

    it('should display the webapp logo', () => {
      appDrawer.getAppLogo().should('exist');
    });

    it('should display the webapp title', () => {
      appToolbar.getAppTitles().should('exist');
    });

    it('should display the "Settings" action link', () => {
      appToolbar.getSettingsLink().should('exist');
    });

    it('should display the "About" action link', () => {
      appToolbar.getAboutLink().should('exist');
    });
  });

  describe('when we press the "About" action link', () => {
    before(() => {
      // given
      appToolbar.getAboutLink().click();
    });

    it('should navigate to the About screen', () => {
      cy.url().should('include', '/about');
    });

    it('should display author and privacy policy', () => {
      aboutPage.getPrivacyPolicyLink().should('exist');
      aboutPage.getAuthorLink().should('exist');
    });
  });
});
