// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("setStorage", (key, value) => {
  cy.window()
    .its('localStorage')
    .then(localStorage => {
      console.log('bello')
      localStorage.setItem(key, JSON.stringify(value))
    });
})
