const ID = 'sample-gassi'
Cypress.Commands.add('visitRoomTopPage', () => {
  cy.visit(`/${ID}`)
})

Cypress.Commands.add('visitRoomSearchResultPage', () => {
  cy.visit(`/${ID}/search?q=YOASOBI`)
})

Cypress.Commands.add('visitCoolTimePage', () => {
  cy.visit(`/${ID}/cooltime`)
})

Cypress.Commands.add('visitRequestedPage', () => {
  cy.visit(`/${ID}/requested`)
})
