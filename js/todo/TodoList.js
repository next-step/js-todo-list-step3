import { ERROR_TYPE_MESSAGE, MEANING } from '../utils/constants.js';
import * as functions from '../utils/functions.js';
import { todoListTemplate } from '../utils/templates.js';

export default class TodoList {
  constructor({
    data,
    filteredData,
    $targetTodoList,
    onToggleTodoItem,
    onDeleteTodoItem,
    onUpdateTodoItem,
    onPriorityTodoItem,
  }) {
    this.data = data;
    this.filteredData = filteredData;
    this.$targetTodoList = $targetTodoList;

    this.$targetTodoList.addEventListener('click', (e) => {
      const { className } = e.target;
      if (className !== 'toggle' && className !== 'destroy') return;
      const { itemId } = e.target.closest('.todo-list-item').dataset;
      const selectAction = {
        toggle: () => onToggleTodoItem(itemId),
        destroy: () => onDeleteTodoItem(itemId),
      };
      selectAction[className]
        ? selectAction[className]()
        : console.error(ERROR_TYPE_MESSAGE.NO_MATCH_CLASS);
    });

    this.$targetTodoList.addEventListener('dblclick', (e) => {
      const { className } = e.target;
      if (className !== 'label') return;
      const $targetLi = e.target.closest('.todo-list-item');
      $targetLi.className = 'todo-list-item editing';
      $targetLi.querySelector('.edit').focus();
    });

    this.$targetTodoList.addEventListener('focusout', (e) => {
      const { className } = e.target;
      if (className !== 'edit') return;
      const $targetLi = e.target.closest('.todo-list-item');
      functions.backToOriginalToggle($targetLi);
    });

    this.$targetTodoList.addEventListener('keyup', (e) => {
      const { className } = e.target;
      if (className !== 'edit') return;
      const $targetLi = e.target.closest('.todo-list-item');
      const selectAction = {
        Escape: () => {
          e.target.value = '';
          functions.backToOriginalToggle($targetLi);
        },
        Enter: () => {
          const { itemId } = $targetLi.dataset;
          const contents = e.target.value;
          contents && onUpdateTodoItem(itemId, contents);
          functions.backToOriginalToggle($targetLi);
        },
      };
      selectAction[e.key]
        ? selectAction[e.key]()
        : console.error(ERROR_TYPE_MESSAGE.NO_MATCH_KEY);
    });

    this.$targetTodoList.addEventListener('change', (e) => {
      const { className } = e.target;
      if (className !== 'chip select') return;
      const { itemId } = e.target.closest('.todo-list-item').dataset;
      onPriorityTodoItem(itemId, e.target.value);
    });

    this.$targetTodoList.addEventListener('click', (e) => {
      const $target = e.target;
      const targetClassList = $target.classList;
      if (
        targetClassList.contains('primary') ||
        targetClassList.contains('secondary')
      ) {
        const { itemId } = e.target.closest('.todo-list-item').dataset;
        const $chipSelect = $target
          .closest('.chip-container')
          .querySelector('select');
        $target.classList.add('hidden');
        $chipSelect.classList.remove('hidden');
        onPriorityTodoItem(itemId, MEANING.NOTHING);
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const hash = location.hash.substring(1);
    this.filteredData = functions.filteringTodoList(this.data, hash);
    this.$targetTodoList.innerHTML = todoListTemplate(this.filteredData);
  }
}
