import { ERROR_TYPE } from './util/constants.js';

export default class KanbanTodoList {
  constructor({
    teamId,
    $targetTodoAppListContainer,
    onToggleTodoItem,
    onDeleteTodoItem,
  }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const { className } = e.target;
      // if (className !== 'toggle') return;
      const { memberId } = e.target.closest('.todoapp-container').dataset;
      const { itemId } = e.target.closest('.todo-list-item').dataset;

      const selectAction = {
        toggle: () => onToggleTodoItem(memberId, itemId),
        destroy: () => onDeleteTodoItem(memberId, itemId),
      };
      selectAction[className]
        ? selectAction[className]()
        : console.error(ERROR_TYPE.NO_MATCH_CLASS);
    });
  }
}
