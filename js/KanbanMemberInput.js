export default class KanbanMemberInput {
  constructor({ teamId, $targetTodoAppListContainer, onAddMember }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', ({ target }) => {
      const $targetAddButton = target.closest('#add-user-button');
      if (!$targetAddButton) return;
      const { id } = $targetAddButton;
      if (id !== 'add-user-button') return;
      const addMember = prompt('새로운 팀원 이름을 입력해주세요');
      addMember && onAddMember(addMember);
    });
  }
}
