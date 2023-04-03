import { clearLocalStorage, setDefaultCooltime, setPreviousCooltime } from '@/utils'
describe('/[id]/cooltime.vue', () => {
  it('localStorageにCooltimeが保存されている時にそのままページに残る', () => {
    setDefaultCooltime()
    cy.visitCoolTimePage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/cooltime')
    })
    cy.contains('次のリクエストまでちょっと待ってね！')
  })

  it('localStorageに過去の時間が保存されている時ルームのトップページに遷移する', () => {
    setPreviousCooltime()
    cy.visitCoolTimePage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi')
    })
  })

  it('localStorageに値が保存されていない時ルームのトップページに遷移する', () => {
    cy.visitCoolTimePage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi')
    })
  })

  it('クールタイム終わったらトップページに画面遷移する', () => {
    setDefaultCooltime()
    cy.visitCoolTimePage()
    // 5分
    cy.clock(new Date().getTime())
    cy.tick(1000 * 60 * 5)
    cy.wait(500)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi')
    })
  })

  afterEach(() => {
    clearLocalStorage()
  })
})
