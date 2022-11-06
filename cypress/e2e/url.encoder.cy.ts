import { appDrawer } from './pages/app.drawer';
import { urlEncoderPage } from './pages/url.encoder.page';

describe('URL encoder/decoder screen', () => {
  const data = 'The chief export of Chuck Norris is pain…';
  const dataEncoded = 'The%20chief%20export%20of%20Chuck%20Norris%20is%20pain%E2%80%A6';

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
      urlEncoderPage.getEncodeAction().should('be.disabled');
      urlEncoderPage.getDecodeAction().should('be.disabled');
      urlEncoderPage.getCopyToClipboardAction().should('be.disabled');

      // TODO button is found but we are getting a timeout when verifying it's enable attribute
      urlEncoderPage.getSwitchContentAction().then(button => expect(button.is('not.enabled')));
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
      // TODO button is found but we are getting a timeout when verifying it's enable attribute
      urlEncoderPage.getSwitchContentAction().then(button => expect(button.is('not.enabled')));
    });
  });

  describe('when user presses the "Switch content" action button', () => {
    before(() => {
      urlEncoderPage.getInputField().clear().type(data);
      urlEncoderPage.getEncodeAction().click();
      urlEncoderPage.getSwitchContentAction().click();
    });

    it('should transfer the result into the input field', () => {
      urlEncoderPage.getInputField().should('contain', dataEncoded);
      urlEncoderPage.getResultText().should('not.contain', dataEncoded);
    });
  });

  describe('when user presses the "Decode" action button', () => {
    before(() => {
      urlEncoderPage.getInputField().clear().type(dataEncoded);
      urlEncoderPage.getDecodeAction().click();
    });

    it('should display the decoded result', () => {
      urlEncoderPage.getResultText().should('contain', data);
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
      // TODO button is found but we are getting a timeout when verifying it's enable attribute
      urlEncoderPage.getSwitchContentAction().then(button => expect(button.is('enabled')));
    });

    it('should show the encoded result', () => {
      urlEncoderPage.getResultText().should('contain', dataEncoded);
    });
  });
});
