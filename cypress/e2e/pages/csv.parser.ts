export const csvParserPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'CSV Parser' }),
  getTextareaField: () => cy.findByRole('textbox', { name: 'CSV Source data' }),
  getExecuteAction: () => cy.findByRole('button', { name: 'Run' }),
  getFileSelectorInput: () => cy.findByTestId('icon-button-file'),
  getResultText: () => cy.findByTestId('parsed-result'),
});
