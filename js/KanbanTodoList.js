export default class KanbanTodoList {
  constructor({ teamId, $targetTodoAppListContainer, onToggleTodoItem }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const { className } = e.target;
      if (className !== 'toggle') return;
      const { memberId } = e.target.closest('.todoapp-container').dataset;
      const { itemId } = e.target.closest('.todo-list-item').dataset;
      onToggleTodoItem(memberId, itemId);
    });
  }
}
