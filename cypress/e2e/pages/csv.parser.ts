export const csvParserPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'CSV Parser' }),
  getTextareaField: () => cy.findByRole('textbox', { name: 'CSV Source data' }),
  getFileSelectorInput: () => cy.findByTestId('icon-button-file'),
});
