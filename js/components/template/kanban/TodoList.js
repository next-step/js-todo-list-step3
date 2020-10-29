import CreateElement from '../../../lib/CreateElement.js';
import PRIORITY from '../../../constant/PRIORITY.js';
import SortTodoListByPriority from '../../../lib/SortTodoListByPriority.js';

const isChecked = (isCompleted) => isCompleted ? 'checked' : '';

const liStyle = (isCompleted, editId) => `
    ${isCompleted ? ' completed ' : ''}
    ${editId ? ' editing ' : ''}
  `;

const chipStyle = (priority) => PRIORITY[priority].style;

const TodoList = ({ todoList, memberId, todoClass }) => {
  const editId = undefined;

  const dom = CreateElement('section', { className: 'main' });
  let newTodoList = todoList
  const render = () => {
    const filter = todoClass(render);
    if (filter === 'priority') {
      newTodoList = SortTodoListByPriority(memberId);
    }

    dom.innerHTML = `
    <ul class="todo-list">
    ${newTodoList?.map(({ _id, contents, priority, isCompleted }) => {
      return `
      <li class="todo-list-item ${liStyle(isCompleted, editId)}" data-component="todoItem" data-key="${_id}">
        <div class="view" data-component="todoView">
          <input class="toggle" type="checkbox" ${isChecked(isCompleted)} data-component="todoItemToggleComplete"/>
          <label class="label" data-component="todoInfo">
            <select class="chip select ${chipStyle(priority)}" data-component="todoPriority">
              ${Object.entries(PRIORITY).map(([key, { ko, style }]) => (
        `<option value="${key}" ${priority === key ? 'selected' : ''}>${ko}</option>`
      ))}
            </select>
            <span data-component="todoContents">${contents}</span>
          </label>
          <button class="destroy" data-component="destroyButton"></button>
        </div>
        <input class="edit" value="${contents}" data-component="todoEdit"/>
      </li>
      `;
    }).join('') || ''}
    </ul>`;
  };
  render();

  return dom;
};

export default TodoList;
