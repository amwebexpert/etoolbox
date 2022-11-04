import { appDrawer } from './pages/app.drawer';
import { csvParserPage } from './pages/csv.parser.page';
import { homePage } from './pages/home.page';

describe('CSV Parser screen', () => {
  before(() => {
    // given
    homePage.visit();
    appDrawer.getMenuItemCSVUtilities().click();
    appDrawer.getToggleMenu().click();
  });

  describe('when we visit the "CSV Utilities" screen', () => {
    it('should navigate to the "CSV" route', () => {
      cy.url().should('include', '/CSVParser');
      cy.title().should('eq', 'Web Toolbox - CSV Parser');
    });

    it('should display heading', () => {
      csvParserPage.getHeading().should('exist');
    });

    it('should have an empty textarea content', () => {
      csvParserPage.getCsvDataField().should('exist').should('be.empty');
    });
  });

  describe('when user selects a CSV file from current device', () => {
    before(() => {
      csvParserPage.getCsvDataField().clear();
      csvParserPage.getCsvParserOptionsField().clear();
    });

    it('should load textual content into the input textarea', () => {
      // given
      csvParserPage.getCsvDataField().should('exist').should('be.empty');

      // when
      csvParserPage.getFileSelectorInput().attachFile('addresses.csv');

      // then
      csvParserPage.getCsvDataField().should('contain', 'John,Doe');
    });
  });

  describe('when the content of the CSV data field is empty', () => {
    before(() => {
      csvParserPage.getCsvDataField().clear();
    });

    it('should disable the action buttons', () => {
      csvParserPage.getExecuteAction().should('be.disabled');
      csvParserPage.getDeleteAction().should('be.disabled');
    });
  });

  describe('when the content of the CSV data field is populated', () => {
    before(() => {
      csvParserPage.getFileSelectorInput().attachFile('addresses.csv');
    });

    it('should enable the action buttons', () => {
      csvParserPage.getExecuteAction().should('be.enabled');
      csvParserPage.getDeleteAction().should('be.enabled');
    });
  });

  describe('when user presses the "Parse CSV" button', () => {
    before(() => {
      // given
      csvParserPage.getCsvParserOptionsField().clear();
      csvParserPage.getFileSelectorInput().attachFile('addresses.csv');
      csvParserPage.getCopyToClipboardAction().should('be.disabled');

      // when
      csvParserPage.getExecuteAction().click();
    });

    it('should enable the "Copy to clipboard" action', () => {
      csvParserPage.getCopyToClipboardAction().should('be.enabled');
    });

    it('should enable the "Save As…" action', () => {
      csvParserPage.getSaveAsAction().should('be.enabled');
    });

    it('should display the parsed JSON result', () => {
      csvParserPage.getResultText().should('contain', '"First": "John"');
      csvParserPage.getResultText().should('contain', '"Last": "Doe"');
    });
  });

  describe('when user presses the "Clear" button', () => {
    before(() => {
      // given
      csvParserPage.getCsvParserOptionsField().clear();
      csvParserPage.getFileSelectorInput().attachFile('addresses.csv');
      csvParserPage.getExecuteAction().click();

      // when
      csvParserPage.getDeleteAction().click();
    });

    it('should disable the action buttons', () => {
      csvParserPage.getExecuteAction().should('be.disabled');
      csvParserPage.getDeleteAction().should('be.disabled');
      csvParserPage.getCopyToClipboardAction().should('be.disabled');
      csvParserPage.getSaveAsAction().should('be.disabled');
    });

    it('should clear the parsed JSON result', () => {
      csvParserPage.getResultText().should('not.exist');
    });
  });
});
