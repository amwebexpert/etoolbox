import { appDrawer } from './pages/app.drawer';
import { homePage } from './pages/home.page';
import { urlParserPage } from './pages/url.parser.page';

describe('URL parser screen', () => {
  before(() => {
    // given
    homePage.visit();
    appDrawer.getMenuItemURLEncode().click();
    appDrawer.getToggleMenu().click();
  });

  describe('when we visit the "URL Parser & Encoder" screen', () => {
    it('should navigate to the "URL" route', () => {
      cy.url().should('include', '/URL');
      cy.title().should('eq', 'Web Toolbox - URL Parser');
    });

    it('should display heading', () => {
      urlParserPage.getHeading().should('exist');
    });
  });

  describe('when we provide an URL in the input field', () => {
    before(() => {
      const url =
        'https://amwebexpert.github.io/etoolbox/#/PokerPlanning/ws-poker-planning.herokuapp.com/81d7752226af/FuegoTeam';
      urlParserPage.getInputField().clear().type(url);
    });

    it('should parse the hostname', () => {
      cy.findByText('amwebexpert.github.io', { exact: true });
    });

    it('should parse the pathname', () => {
      cy.findByText('/etoolbox/', { exact: true });
    });

    it('should parse the origin', () => {
      cy.findByText('https://amwebexpert.github.io', { exact: true });
    });

    it('should parse the protocol', () => {
      cy.findByText('https:', { exact: true });
    });
  });
});
