import { appDrawer } from './pages/app.drawer';
import { cURLConvertPage } from './pages/cur.convert.page';

describe('cURL Converter screen', () => {
  const data = `curl 'http://en.wikipedia.org/'
    -H 'Accept-Encoding: gzip, deflate, sdch'
    -H 'Accept-Language: en-US,en;q=0.8'
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    -H 'Referer: http://www.wikipedia.org/'
    -H 'Connection: keep-alive' --compressed`;

  before(() => {
    // given
    cy.visit('/#/URL/CURLConverter');
    appDrawer.getToggleMenu().click();
  });

  describe('when we visit the "cURL Converter" screen', () => {
    before(() => {
      cURLConvertPage.getInputField().clear();
    });

    it('should navigate to the "URL" route', () => {
      cy.url().should('include', '/URL/CURLConverter');
      cy.title().should('eq', 'Web Toolbox - cURL Converter');
    });

    it('should display heading', () => {
      cURLConvertPage.getHeading().should('exist');
    });
  });

  describe('when user clears the input field content', () => {
    before(() => {
      cURLConvertPage.getInputField().clear();
    });

    it('should have disabled action buttons', () => {
      cURLConvertPage.getConvertAction().should('be.disabled');
      cURLConvertPage.getCopyToClipboardAction().should('be.disabled');
      cURLConvertPage.getInputFieldTargetLanguage().then(button => expect(button.is('not.enabled')));
    });
  });

  describe('when we provide an content in the input field', () => {
    before(() => {
      cURLConvertPage.getInputField().clear().type(data, { delay: 1 });
    });

    it('should enable the action buttons', () => {
      cURLConvertPage.getConvertAction().should('be.enabled');
      cURLConvertPage.getCopyToClipboardAction().should('be.disabled');
      cURLConvertPage.getInputFieldTargetLanguage().then(button => expect(button.is('enabled')));
    });

    describe('when user presses the "Convert" action button', () => {
      before(() => {
        cURLConvertPage.getConvertAction().click();
      });

      it('should display the default JavaScript "fetch()" code snippet', () => {
        cURLConvertPage.getResultText().should('contain', "fetch('http://en.wikipedia.org/'");
        cURLConvertPage.getResultText().should('contain', "'Accept-Encoding': 'gzip, deflate, sdch',");
      });
    });

    describe('when user changes the "Target language" to "Node"', () => {
      before(() => {
        cURLConvertPage.getInputFieldTargetLanguage().click();
        cy.findByRole('option', { name: 'Node' }).click();
      });

      it('should display the "Node fetch" code snippet', () => {
        cURLConvertPage.getResultText().should('contain', "import fetch from 'node-fetch';");
        cURLConvertPage.getResultText().should('contain', "fetch('http://en.wikipedia.org/'");
        cURLConvertPage.getResultText().should('contain', "'Accept-Encoding': 'gzip, deflate, sdch',");
      });
    });

    describe('when user changes the "Target language" to "Dart"', () => {
      before(() => {
        cURLConvertPage.getInputFieldTargetLanguage().click();
        cy.findByRole('option', { name: 'Dart' }).click();
      });

      it('should display the "Dart" code snippet', () => {
        cURLConvertPage.getResultText().should('contain', "import 'package:http/http.dart' as http;");
        cURLConvertPage.getResultText().should('contain', 'var res = await http.get(url, headers: headers);');
      });
    });
  });
});
