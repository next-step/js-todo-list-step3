import { TodoCountTemplate } from './util/templates.js'

export default class KanbanTodoCount {
  constructor({ memberId, filteredTodoList, $targetTodoAppListContainer }) {
    this.memberId = memberId;
    this.filteredTodoList = filteredTodoList;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;
  }

  setState(newFilteredTodoList) {
    this.filteredTodoList = newFilteredTodoList;
    this.render();
  }
  render() {
    this.memberId = location.hash.substring(1).split('/')[0];

    if (!this.filteredTodoList) return;
    const $targetTodoCount = document
    .querySelector(`[data-member-id='${this.memberId}']`)
    .querySelector('.todo-count');
    $targetTodoCount.innerHTML = TodoCountTemplate(this.filteredTodoList.length)
  }
}
