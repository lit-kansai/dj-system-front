import { clearLocalStorage, setDefaultCooltime, setPreviousCooltime } from '@/utils'
describe('/[id]/index.vue', () => {
  it('ページにアクセスしたらTop50の楽曲が12曲表示されている', () => {
    cy.visitRoomTopPage()
    cy.wait(1000)
    cy.get('[data-test-id=music-card]').should('have.length', 12)
  })

  it('表示されている楽曲を選択するとモーダルが表示され、楽曲の情報が表示されている', () => {
  })

  it('モーダルの送信ボタンを押すとリクエストが送信され、requestedに遷移する。またLocalStorageにはクールダウンに関するデータが入ってる', () => {
  })

  it('localStorageにCooltimeが保存されている時にcooltimeに遷移する', () => {
    setDefaultCooltime()
    cy.visitRoomTopPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/cooltime')
    })
    cy.contains('次のリクエストまでちょっと待ってね！')
  })

  it('localStorageに過去の時間が保存されている時そのままページに残る', () => {
    setPreviousCooltime()
    cy.visitRoomTopPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi')
    })
  })

  it('localStorageに値が保存されていない時そのままページに残る', () => {
    cy.visitRoomTopPage()
    cy.wait(1000)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi')
    })
  })

  afterEach(() => {
    clearLocalStorage()
  })
})
