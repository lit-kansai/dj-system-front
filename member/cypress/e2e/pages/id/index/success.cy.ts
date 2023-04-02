import { expect } from 'chai'
import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY } from '@/constants'
import { clearLocalStorage } from '@/utils'
describe('/[id]/index.vue', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it('ページにアクセスしたらTop50の楽曲が12曲表示されている', () => {
    cy.visitRoomTopPage()
    cy.wait(500)
    cy.get('[data-test-id=music-card]').should('have.length', 12)
  })

  it('表示されている楽曲を選択するとモーダルが表示され、楽曲の情報が表示されている', () => {
    cy.visitRoomTopPage()
    cy.wait(500)
    cy.get('[data-test-id=music-card]').eq(1).click()
    cy.get('[data-test-id=modal-container]').should('exist')
    cy.get('[data-test-id=modal-music-name]').should('not.have.text', '')
    cy.get('[data-test-id=modal-artist-name]').should('not.have.text', '')
    cy.get('[data-test-id=modal-album-url')
      .should('not.have.attr', 'src', '')
  })

  it('モーダルの送信ボタンを押すとリクエストが送信され、requestedに遷移する。またLocalStorageにはクールダウンに関するデータが入ってる', () => {
    cy.visitRoomTopPage()
    cy.wait(500)
    cy.get('[data-test-id=music-card]').eq(1).click()
    cy.get('[data-test-id=modal-submit-button]').click()
    cy.window().then((window) => {
      const cooltime = window.localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
      /* eslint-disable no-unused-expressions */
      expect(cooltime).to.exist
    })
    cy.wait(500)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sample-gassi/requested')
    })
  })

  afterEach(() => {
    clearLocalStorage()
  })
})
