import { appDrawer } from './pages/app.drawer';
import { urlEncoderPage } from './pages/url.encoder.page';

describe('URL encoder/decoder screen', () => {
  const data = 'The chief export of Chuck Norris is pain…';

  before(() => {
    // given
    cy.visit('/#/URL/URLEncoder');
    appDrawer.getToggleMenu().click();
  });

  describe('when we visit the "URL Encoder" screen', () => {
    before(() => {
      urlEncoderPage.getInputField().clear();
    });

    it('should navigate to the "URL" route', () => {
      cy.url().should('include', '/URL/URLEncoder');
      cy.title().should('eq', 'Web Toolbox - URL Encoder / decoder');
    });

    it('should display heading', () => {
      urlEncoderPage.getHeading().should('exist');
    });

    it('should have disabled action buttons', () => {
      urlEncoderPage.getSwitchContentAction().should('be.disabled');
      urlEncoderPage.getCopyToClipboardAction().should('be.disabled');
      urlEncoderPage.getEncodeAction().should('be.disabled');
      urlEncoderPage.getDecodeAction().should('be.disabled');
    });
  });

  describe('when we provide an content in the input field', () => {
    before(() => {
      urlEncoderPage.getInputField().clear().type(data);
    });

    it('should enable the endoding action buttons', () => {
      urlEncoderPage.getEncodeAction().should('be.enabled');
      urlEncoderPage.getDecodeAction().should('be.enabled');
    });

    it('should disable the "Copy to clipboard" action', () => {
      urlEncoderPage.getCopyToClipboardAction().should('be.disabled');
    });

    it('should disable the "Switch content" action', () => {
      urlEncoderPage.getSwitchContentAction().should('be.disabled');
    });
  });

  describe('when user presses the "Encode" action button', () => {
    before(() => {
      urlEncoderPage.getInputField().clear().type(data);
      urlEncoderPage.getEncodeAction().click();
    });

    it('should enable the "Copy to clipboard" action', () => {
      urlEncoderPage.getCopyToClipboardAction().should('be.enabled');
    });

    it('should enable the "Switch content" action', () => {
      urlEncoderPage.getSwitchContentAction().should('be.enabled');
    });

    it('should show the encoded result', () => {
      urlEncoderPage
        .getResultText()
        .should('contain', 'The%20chief%20export%20of%20Chuck%20Norris%20is%20pain%E2%80%A6');
    });
  });
});
