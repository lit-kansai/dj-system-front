import { clearLocalStorage, setDefaultCooltime, setPreviousCooltime } from '@/utils'
describe('/[id]/search.vue', () => {
  it('localStorageにCooltimeが保存されている時にcooltimeに遷移する', () => {
    setDefaultCooltime()
    cy.visitRoomSearchResultPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/cooltime')
    })
    cy.contains('次のリクエストまでちょっと待ってね！')
  })

  it('localStorageに過去の時間が保存されている時そのままページに残る', () => {
    setPreviousCooltime()
    cy.visitRoomSearchResultPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/search')
    })
  })

  it('localStorageに値が保存されていない時そのままページに残る', () => {
    cy.visit('/')
    cy.visitRoomSearchResultPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/search')
    })
  })

  afterEach(() => {
    clearLocalStorage()
  })
})

