import { MESSAGE, FILTER_NAME } from '../util/constants.js';
import { TodoListTemplate } from '../util/templates.js';

export default class TodoFilter {
  constructor({
    teamId,
    memberId,
    filteredTodoList,
    $targetTodoAppListContainer,
    onDeleteAllTodoItems,
    onSelectFilter,
  }) {
    this.teamId = teamId;
    this.memberId = memberId;
    this.filteredTodoList = filteredTodoList;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const { className, tagName } = e.target;
      if (className === FILTER_NAME.CLEAR_ALL) {
        this.memberId = e.target.closest('.todoapp-container').dataset.memberId;
        const deleteAllConfirm = confirm(MESSAGE.CONFIRM);
        deleteAllConfirm && onDeleteAllTodoItems(this.memberId);
        return;
      }
      if (tagName === 'A') {
        const $targetFilters = e.target
          .closest('.filters')
          .querySelectorAll('a');
        $targetFilters.forEach((node) => node.classList.remove('selected'));
        e.target.classList.add('selected');
        return;
      }
    });

    window.addEventListener('hashchange', async () => {
      this.memberId = location.hash.substring(1).split('/')[0];
      const hash = location.hash.substring(1).split('/')[1];
      onSelectFilter(this.memberId, hash);
    });
  }
  setState(newFilteredTodoList) {
    this.filteredTodoList = newFilteredTodoList;
    this.render();
  }

  render() {
    if (!this.filteredTodoList) return;
    const $targetTodoList = document
      .querySelector(`[data-member-id='${this.memberId}']`)
      .querySelector('.todo-list');
    $targetTodoList.innerHTML = TodoListTemplate(this.filteredTodoList);
  }
}
