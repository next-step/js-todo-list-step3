import { ERROR_TYPE } from './util/constants.js';
import * as functions from './util/functions.js';
import rootApi from './api/apiHandler.js';
import { TodoListTemplate } from './util/templates.js';

export default class KanbanTodoList {
  constructor({
    teamId,
    memberId,
    $targetTodoAppListContainer,
    onToggleTodoItem,
    onDeleteTodoItem,
    onUpdateTodoItem,
    onPriorityTodoItem,
  }) {
    this.teamId = teamId;
    this.memberId = memberId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const { className } = e.target;
      if (className !== 'toggle' && className !== 'destroy') return;
      this.memberId = e.target.closest('.todoapp-container').dataset.memberId;
      const { itemId } = e.target.closest('.todo-list-item').dataset;
      const selectAction = {
        toggle: () => onToggleTodoItem(this.memberId, itemId),
        destroy: () => onDeleteTodoItem(this.memberId, itemId),
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
      this.memberId = e.target.closest('.todoapp-container').dataset.memberId;
      const $targetLi = e.target.closest('.todo-list-item');
      const selectAction = {
        Escape: () => {
          e.target.value = '';
          functions.backToOriginalToggle($targetLi);
        },
        Enter: () => {
          const { itemId } = $targetLi.dataset;
          const todo = e.target.value;
          todo && onUpdateTodoItem(this.memberId, itemId, todo);
          functions.backToOriginalToggle($targetLi);
        },
      };
      selectAction[e.key]
        ? selectAction[e.key]()
        : console.error(ERROR_TYPE.NO_MATCH_KEY);
    });

    this.$targetTodoAppListContainer.addEventListener('change', (e) => {
      const { className } = e.target;
      if (className !== 'chip select') return;
      this.memberId = e.target.closest('.todoapp-container').dataset.memberId;
      const { itemId } = e.target.closest('.todo-list-item').dataset;
      onPriorityTodoItem(this.memberId, itemId, e.target.value);
    });

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const $target = e.target;
      const targetClassList = $target.classList;
      if (targetClassList.contains('chip')) {
        const $chipSelect = $target
          .closest('.chip-container')
          .querySelector('select');
        $target.classList.add('hidden');
        $chipSelect.classList.remove('hidden');
      }
    });
    // this.render();
  }

  setState(currentMemberId) {
    this.memberId = currentMemberId;
    this.render();
  }

  async render() {
    if (!this.memberId) return;
    try {
      const response = await rootApi.fetchMemberTodoList(
        this.teamId,
        this.memberId,
      );
      const { todoList } = response;
      const $targetTodoList = document
        .querySelector(`[data-member-id='${this.memberId}']`)
        .querySelector('.todo-list');
      $targetTodoList.innerHTML = TodoListTemplate(todoList);
    } catch (e) {
      const $targetTodoList = document
      .querySelector(`[data-member-id='${this.memberId}']`)
      .querySelector('.todo-list');
      $targetTodoList.innerHTML = '';
      console.error(ERROR_TYPE.CAN_NOT_LOAD);
    }
  }
}
