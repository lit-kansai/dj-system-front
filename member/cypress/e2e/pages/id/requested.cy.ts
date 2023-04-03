import { clearLocalStorage, setDefaultCooltime, setPreviousCooltime } from '@/utils'
describe('/[id]/requested.vue', () => {
  beforeEach(() => {
    cy.clock(new Date().getTime())
  })
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

  it('クールタイム終わったらトップページに画面遷移する', () => {
    cy.viewport(1920, 1080)
    cy.visitRoomTopPage()
    cy.get('[data-test-id=music-card]').eq(1).click()
    cy.get('[data-test-id=modal-submit-button]').click()
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/requested')
    })
    // 1分
    cy.tick(1000 * 60)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/cooltime')
    })
  })

  afterEach(() => {
    clearLocalStorage()
  })
})
