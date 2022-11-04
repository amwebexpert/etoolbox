export const csvParserPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'CSV Parser' }),
  getCsvDataField: () => cy.findByRole('textbox', { name: 'CSV Source data' }),
  getCsvParserOptionsField: () => cy.findByRole('textbox', { name: 'Parser options' }),
  getExecuteAction: () => cy.findByRole('button', { name: 'Run' }),
  getDeleteAction: () => cy.findByTitle('Clear the content'),
  getFileSelectorInput: () => cy.findByTestId('icon-button-file'),
  getResultText: () => cy.findByTestId('parsed-result'),
});
