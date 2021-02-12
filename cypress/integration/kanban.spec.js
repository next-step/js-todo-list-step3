describe('kanban-board', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/kanban.html');
  });

  it('자동차 이름 입력 시, 화면에 시도 횟수 입력창이 표시되는지 테스트 한다.', () => {
    typeCarNameAndClickToSubmitButton();
    cy.get('#racing-count-section').should('be.visible');
  });
});
