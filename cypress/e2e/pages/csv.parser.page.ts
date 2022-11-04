export const csvParserPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'CSV Parser' }),
  getCsvDataField: () => cy.findByRole('textbox', { name: 'CSV Source data' }),
  getCsvParserOptionsField: () => cy.findByRole('textbox', { name: 'Parser options' }),
  getExecuteAction: () => cy.findByRole('button', { name: 'Run' }),
  getSaveAsAction: () => cy.findByRole('button', { name: 'Save…' }),
  getDeleteAction: () => cy.findByTitle('Clear the content'),
  getCopyToClipboardAction: () => cy.get('[data-testid="copy-to-clipboard"]'),
  getFileSelectorInput: () => cy.findByTestId('files-selector-action'),
  getResultText: () => cy.findByTestId('parsed-result'),
});
