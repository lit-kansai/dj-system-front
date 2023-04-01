import { clearLocalStorage, setDefaultCooltime, setPreviousCooltime } from '@/utils'
describe('/[id]/requested.vue', () => {
  it('localStorageにCooltimeが保存されている時にcooltimeに遷移する', () => {
    setDefaultCooltime()
    cy.visitRequestedPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/cooltime')
    })
    cy.contains('次のリクエストまでちょっと待ってね！')
  })

  it('localStorageに過去の時間が保存されている時ルームのトップページに遷移する', () => {
    setPreviousCooltime()
    cy.visitRequestedPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi')
    })
  })

  it('localStorageに値が保存されていない時ルームのトップページに遷移する', () => {
    cy.visit('/')
    cy.visitRequestedPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi')
    })
  })

  afterEach(() => {
    clearLocalStorage()
  })
})
