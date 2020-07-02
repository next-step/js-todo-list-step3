import { KEY_NAME } from './util/constants.js';

export default class KanbanTodoInput {
  constructor({ teamId, $targetTodoAppListContainer, onKeyAddTodoItem }) {
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
      const { id } = e.target.closest('.todoapp-container').dataset;
      onKeyAddTodoItem(id, e.target.value);
      e.target.value = '';
    });
  }
}
