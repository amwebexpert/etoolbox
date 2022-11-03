export const urlParserPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'URL Parser' }),
  getInputField: () => cy.findByRole('textbox', { name: 'URL' }),
});
