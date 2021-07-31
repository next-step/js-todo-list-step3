import Component from '../../core/Component.js';

export default class TodoListItems extends Component {
  template() {
    return `
      <ul class="todo-list">
        ${this.$props.todoList
          .map(
            ({ _id, contents, isCompleted, priority }) => `
        <li class="todo-list-item${isCompleted ? ' completed' : ''}" data-todo-id=${_id}>
          <div class="view">
            <input class="toggle" type="checkbox"${isCompleted ? ' checked' : ''}/>
            <label class="label">
              <div class="chip-container">
                <select class="chip select${
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
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${contents}" />
        </li>
        `
          )
          .join('')}
      </ul>
    `;
  }
}
