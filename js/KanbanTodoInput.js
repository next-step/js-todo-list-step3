import { KEY_NAME } from './util/constants.js';

export default class KanbanTodoInput {
  constructor({ teamId, $targetTodoAppListContainer, onAddTodoItem }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const { className } = e.target;
      if (className !== 'new-todo') return;
      e.target.value = '';
    });

    this.$targetTodoAppListContainer.addEventListener('keyup', (e) => {
      const { className } = e.target;
      if (className !== 'new-todo') return;
      if (e.key !== KEY_NAME.ENTER || e.target.value === '') return;
      const { memberId } = e.target.closest('.todoapp-container').dataset;
      onAddTodoItem(memberId, e.target.value);
      e.target.value = '';
    });
  }
}
