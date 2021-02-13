import { BASE_URL } from '../../src/utils/constant';

describe('team-board', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('팀 불러오기 요청시, 팀이 화면에 정상적으로 표시되는지 확인한다.', () => {
    cy.request(`${BASE_URL}/api/teams`).then((res) => {
      expect(res.status).to.equal(200);
      cy.get('.team-card-container')
        .its('length')
        .should('eq', res.body.length);
    });
  });

  it('팀 추가 버튼 클릭 시, 팀 이름을 입력하고 팀을 추가할 수 있는지 확인한다.', () => {
    cy.window().then(($window) => {
      cy.stub($window, 'prompt').returns('WoooWa');
      cy.contains('확인').click();
    });
    expect(cy.get('.team-card-container').contains('WooWa')).to.exist;
  });

  it('팀 삭제 버튼 클릭 시, 팀이 삭제되는지 확인한다.', () => {
    //
  });
});
