import { appDrawer } from './pages/app.drawer';
import { urlEndoderPage } from './pages/url.encoder.page';

describe('URL encoder/decoder screen', () => {
  const data = 'The chief export of Chuck Norris is pain…';

  before(() => {
    // given
    cy.visit('/#/URL/URLEncoder');
    appDrawer.getToggleMenu().click();
  });

  describe('when we visit the "URL Encoder" screen', () => {
    before(() => {
      urlEndoderPage.getInputField().clear();
    });

    it('should navigate to the "URL" route', () => {
      cy.url().should('include', '/URL/URLEncoder');
      cy.title().should('eq', 'Web Toolbox - URL Encoder / decoder');
    });

    it('should display heading', () => {
      urlEndoderPage.getHeading().should('exist');
    });

    it('should have disabled action buttons', () => {
      urlEndoderPage.getSwitchContentAction().should('be.disabled');
      urlEndoderPage.getCopyToClipboardAction().should('be.disabled');
      urlEndoderPage.getEncodeAction().should('be.disabled');
      urlEndoderPage.getDecodeAction().should('be.disabled');
    });
  });

  describe('when we provide an content in the input field', () => {
    before(() => {
      urlEndoderPage.getInputField().clear().type(data);
    });

    it('should enable the endoding action buttons', () => {
      urlEndoderPage.getEncodeAction().should('be.enabled');
      urlEndoderPage.getDecodeAction().should('be.enabled');
    });
  });

  describe('when user presses the "Encode" action button', () => {
    before(() => {
      urlEndoderPage.getInputField().clear().type(data);
      urlEndoderPage.getEncodeAction().click();
    });

    it('should enable the "Copy to clipboard" action', () => {
      urlEndoderPage.getCopyToClipboardAction().should('be.enabled');
    });

    it('should show the encoded result', () => {
      urlEndoderPage
        .getResultText()
        .should('contain', 'The%20chief%20export%20of%20Chuck%20Norris%20is%20pain%E2%80%A6');
    });
  });
});
