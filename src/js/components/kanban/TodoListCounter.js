import Component from '../../core/Component.js';
import { store } from "../../store/index.js";
import { kanbanAPI } from "../../api/kanban.js";

export default class TodoListCounter extends Component {
  setEvent() {
    this.addEvent('click', 'clearAll', async ({ target }) => {
      const { memberId } = target.closest('[data-member-id]').dataset;
      const { id } = store.state;
      await kanbanAPI.removeTodoItems(id, memberId);
    });

    this.$target.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.dataset.action !== 'filter') return;
      const { type } = e.target.closest('[data-type]').dataset;
      this.$props[`${type}Todos`]();
    });
  }

  template() {
    return `
      <span class="todo-count">총 <strong>${this.$props.count}</strong> 개</span>
      <ul class="filters">
        <li data-type="all">
          <a data-action="filter" href="#all"${
            this.$props.show === 'ALL' ? ' class="selected"' : ''
          }>전체보기</a>
        </li>
        <li data-type="priority">
          <a data-action="filter" href="#priority"${
            this.$props.show === 'PRIORITY' ? ' class="selected"' : ''
          }>우선 순위</a>
        </li>
        <li data-type="active">
          <a data-action="filter" href="#active"${
            this.$props.show === 'ACTIVE' ? ' class="selected"' : ''
          }>해야할 일</a>
        </li>
        <li data-type="completed">
          <a data-action="filter" href="#completed"${
            this.$props.show === 'COMPLETED' ? ' class="selected"' : ''
          }>완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed" data-action="clearAll">모두 삭제</button>
    `;
  }
}
