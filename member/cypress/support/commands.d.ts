declare namespace Cypress {
  interface Chainable<Subject> {
    visitRoomTopPage(): Chainable<Subject>
    visitRoomSearchResultPage(): Chainable<Subject>
    visitCoolTimePage(): Chainable<Subject>
    visitRequestedPage(): Chainable<Subject>
  }
}
