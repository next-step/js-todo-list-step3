import Component from '../../core/Component.js';
import { store } from "../../store/index.js";
import { kanbanAPI } from "../../api/kanban.js";
import { PRIORITY } from "../../constant/todo.js";

export default class TodoListItems extends Component {
  setEvent() {
    this.addEvent('click', 'toggle', async ({ target }) => {
      const { teamId, memberId, todoId } = this.getTodoData(target);
      await kanbanAPI.toggleTodoItem(teamId, memberId, todoId);
    });

    this.addEvent('click', 'delete', async({ target }) => {
      const { teamId, memberId, todoId } = this.getTodoData(target);
      await kanbanAPI.removeTodoItem(teamId, memberId, todoId);
    });

    this.addEvent('change', 'priority', async ({ target }) => {
      const { teamId, memberId, todoId } = this.getTodoData(target);
      const priority = PRIORITY[target.selectedIndex];
      await kanbanAPI.modifyTodoItemPriority(teamId, memberId, todoId, priority);
    });

    this.addEvent('dblclick', 'onEdit', async ({ target }) => {
      const todo = target.closest('[data-todo-id]');
      todo.classList.add('editing');
    });

    this.addEvent('keypress', 'edit', async ({ key, target }) => {
      if (key !== 'Enter' || !target.value) return;
      const { teamId, memberId, todoId } = this.getTodoData(target);
      await kanbanAPI.modifyTodoItemContents(teamId, memberId, todoId, target.value);
    });
  }

  template() {
    return `
      <ul class="todo-list">
        ${this.$props.todoList
          .map(
            ({ _id, contents, isCompleted, priority }) => `
        <li class="todo-list-item${isCompleted ? ' completed' : ''}" data-todo-id=${_id}>
          <div class="view">
            <input class="toggle" data-action="toggle" type="checkbox"${
              isCompleted ? ' checked' : ''
            }/>
            <label class="label" data-action="onEdit">
              <div class="chip-container">
                <select data-action="priority" class="chip select${
                  priority === 'FIRST'
                    ? ' primary'
                    : priority === 'SECOND'
                    ? ' secondary'
                    : ''
                }">
                  <option${priority === 'NONE' ? ' selected' : ''}>순위</option>
                  <option${priority === 'FIRST' ? ' selected' : ''}>1순위</option>
                  <option${priority === 'SECOND' ? ' selected' : ''}>2순위</option>
                </select>
              </div>
              ${contents}
            </label>
            <button class="destroy" data-action="delete"></button>
          </div>
          <input class="edit" data-action="edit" value="${contents}" />
        </li>
        `
          )
          .join('')}
      </ul>
    `;
  }

  getTodoData(target) {
    const { todoId } = target.closest('[data-todo-id]').dataset;
    const { memberId } = target.closest('[data-member-id]').dataset;
    const { id } = store.state;
    return { teamId: id, memberId, todoId };
  }
}
