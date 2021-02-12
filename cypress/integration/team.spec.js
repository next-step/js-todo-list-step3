describe('team-board', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('팀 추가 버튼 클릭 시, 팀 이름을 입력하고 팀을 추가할 수 있는지 확인한다.', () => {
    cy.window().then(($window) => {
      cy.stub($window, 'prompt').returns('WoooWa');
      cy.contains('확인').click();
    });
    cy.get('team-card-container').contains('WooWa');
  });

  it('pro', () => {
    //
  });
});
