export const csvParserPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'CSV Parser' }),
  getInputField: () => cy.findByRole('textbox', { name: 'CSV Source data' }),
});
