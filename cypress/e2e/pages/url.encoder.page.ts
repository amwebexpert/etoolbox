import { appCommonPage } from './app.common.page';

export const urlEncoderPage = Object.freeze({
  getHeading: () => cy.findByRole('heading', { name: 'URL Encoder / decoder' }),
  getInputField: () => cy.findByRole('textbox', { name: 'Content to encode/decode' }),
  getResultText: () => cy.findByTestId('parsed-result'),

  getEncodeAction: () => cy.findByRole('button', { name: 'Enc.' }),
  getDecodeAction: () => cy.findByRole('button', { name: 'Dec.' }),
  getCopyToClipboardAction: appCommonPage.getCopyToClipboardAction,
  getSwitchContentAction: () => cy.get('[data-testid="copy-to-clipboard"]'),
});
