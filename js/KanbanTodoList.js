import { ERROR_TYPE } from './util/constants.js';
import * as functions from './util/functions.js';

export default class KanbanTodoList {
  constructor({
    teamId,
    $targetTodoAppListContainer,
    onToggleTodoItem,
    onDeleteTodoItem,
    onUpdateTodoItem,
  }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const { className } = e.target;
      if (className !== 'toggle' && className !== 'destroy') return;
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

    this.$targetTodoAppListContainer.addEventListener('dblclick', (e) => {
      const { className } = e.target;
      if (className !== 'label') return;
      const $targetLi = e.target.closest('.todo-list-item');
      $targetLi.className = 'todo-list-item editing';
      $targetLi.querySelector('.edit').focus();
    });

    this.$targetTodoAppListContainer.addEventListener('focusout', (e) => {
      const { className } = e.target;
      if (className === 'edit') {
        const $targetLi = e.target.closest('.todo-list-item');
        functions.backToOriginalToggle($targetLi);
      }
    });

    this.$targetTodoAppListContainer.addEventListener('keyup', (e) => {
      const { className } = e.target;
      if (className !== 'edit') return;
      const { memberId } = e.target.closest('.todoapp-container').dataset;
      const $targetLi = e.target.closest('.todo-list-item');
      const selectAction = {
        Escape: () => {
          e.target.value = '';
          functions.backToOriginalToggle($targetLi);
        },
        Enter: () => {
          const { itemId } = $targetLi.dataset;
          const todo = e.target.value;
          todo && onUpdateTodoItem(memberId, itemId, todo);
          functions.backToOriginalToggle($targetLi);
        },
      };
      selectAction[e.key]
        ? selectAction[e.key]()
        : console.error(ERROR_TYPE.NO_MATCH_KEY);
    });
  }
}
