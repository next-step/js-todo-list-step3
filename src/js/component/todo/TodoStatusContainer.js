import { Action } from '../../action/Action.js';
import { $, $$ } from '../../util/domSelection.js';

const _getMemberId = (target) => {
  const $todoList = target.closest('li.todoapp-container');
  return $todoList.dataset.memberid;
};

export class TodoStatusContainer {
  static FILTER_STATE = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    PRIORITY: 'priority',
  }

  constructor() {
    const $app = $('ul.todoapp-list-container');
    const teamId = $app.dataset.teamid;

    $app.addEventListener('click', async ({ target }) => {
      if (!target) return;
      if (target.classList.contains('clear-completed')) {
        Action.deleteItemAll(teamId, _getMemberId(target));
      }
    });
    $app.addEventListener('click', async (e) => {
      e.preventDefault();
      const target = e.target;

      if (!target.closest('ul.filters')) return;
      if (!target.nodeName == 'A') return;

      const memberId = _getMemberId(target);
      if (target.classList.contains(TodoStatusContainer.FILTER_STATE.ALL)) {
        Action.changeFilterState(teamId, memberId, TodoStatusContainer.FILTER_STATE.ALL);
      } else if (target.classList.contains(TodoStatusContainer.FILTER_STATE.ACTIVE)) {
        Action.changeFilterState(teamId, memberId, TodoStatusContainer.FILTER_STATE.ACTIVE);
      } else if (target.classList.contains(TodoStatusContainer.FILTER_STATE.COMPLETED)) {
        Action.changeFilterState(teamId, memberId, TodoStatusContainer.FILTER_STATE.COMPLETED);
      } else if (target.classList.contains(TodoStatusContainer.FILTER_STATE.PRIORITY)) {
        Action.changeFilterState(teamId, memberId, TodoStatusContainer.FILTER_STATE.PRIORITY);
      }
    });
  }

  getItemCount($todoAppContainer) {
    let count = 0;
    $$('.todo-list li', $todoAppContainer).forEach((li) => {
      if (li.style.display != 'none') count = count + 1;
    });
    return count;
  }

  render(filterState, $todoAppContainer) {
    //필터 적용
    const todos = $$('ul.todo-list li', $todoAppContainer);
    switch (filterState) {
      case TodoStatusContainer.FILTER_STATE.ACTIVE:
      case TodoStatusContainer.FILTER_STATE.COMPLETED:
        todos.forEach((todo) => {
          if (!todo.classList.contains(filterState)) {
            todo.style.display = 'none';
          }
        });
        break;
    }

    const [countContainer] = $$('div.count-container', $todoAppContainer);
    const count = this.getItemCount($todoAppContainer);
    const countContainerInnerHTML = `<span class="todo-count">총 <strong>${count}</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="#all" class="${TodoStatusContainer.FILTER_STATE.ALL} ${filterState == TodoStatusContainer.FILTER_STATE.ALL ? 'selected' : ''}">전체보기</a>
          </li>
          <li>
            <a href="#priority" class="${TodoStatusContainer.FILTER_STATE.PRIORITY} ${filterState == TodoStatusContainer.FILTER_STATE.PRIORITY ? 'selected' : ''}">우선 순위</a>
          </li>
          <li>
            <a href="#active" class="${TodoStatusContainer.FILTER_STATE.ACTIVE} ${filterState == TodoStatusContainer.FILTER_STATE.ACTIVE ? 'selected' : ''}">해야할 일</a>
          </li>
          <li>
            <a href="#completed" class="${TodoStatusContainer.FILTER_STATE.COMPLETED} ${filterState == TodoStatusContainer.FILTER_STATE.COMPLETED ? 'selected' : ''}">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>`;
    countContainer.innerHTML = countContainerInnerHTML;
  }
}
