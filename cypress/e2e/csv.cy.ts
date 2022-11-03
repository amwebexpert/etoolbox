import { appDrawer } from './pages/app.drawer';
import { csvParserPage } from './pages/csv.parser';
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
      csvParserPage.getTextareaField().should('exist').should('be.empty');
    });
  });

  describe('when we select the "addresses.csv" file', () => {
    beforeEach(() => {
      csvParserPage.getTextareaField().clear();
    });

    it('should load textual content into the input textarea', () => {
      // given
      const fileInput = csvParserPage.getFileSelectorInput();
      csvParserPage.getTextareaField().should('exist').should('be.empty');

      // when
      fileInput.attachFile('addresses.csv');

      // then
      csvParserPage.getTextareaField().should('not.be.empty').should('contain', 'John,Doe');
    });
  });
});
