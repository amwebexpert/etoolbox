/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = unknown> {
    /**
     * Custom command to navigate to the app home screen
     * @example cy.visitHomeScreen()
     */
    visitHomeScreen(): Chainable<null>;
  }
}
