import { appCommonPage } from './app.common.page';

export const cURLConvertPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'cURL Converter' }),
  getInputField: () => cy.findByRole('textbox', { name: 'cURL command' }),
  getInputFieldTargetLanguage: () => cy.findByRole('button', { name: /^Target language/ }),

  getConvertAction: () => cy.findByRole('button', { name: 'Convert' }),
  getCopyToClipboardAction: appCommonPage.getCopyToClipboardAction,

  getResultText: () => cy.findByTestId('parsed-result'),
});
