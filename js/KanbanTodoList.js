export default class KanbanTodoList {
  constructor({ teamId, $targetTodoAppListContainer }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      
    })
  }
}
