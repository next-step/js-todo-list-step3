import CreateElement from '../../../lib/CreateElement.js';

const PRIORITY = {
  NONE: { ko: '순위', style: '' },
  FIRST: { ko: '1순위', style: 'primary' },
  SECOND: { ko: '2순위', style: 'secondary' },
};

const isChecked = (isCompleted) => isCompleted ? 'checked' : '';

const liStyle = (isCompleted, editId) => `
    ${isCompleted ? ' completed ' : ''}
    ${editId ? ' editing ' : ''}
  `;

const chipStyle = (priority) => PRIORITY[priority].style;

const TodoList = ({ todoList }) => {
  const editId = undefined;

  const dom = CreateElement('section', { className: 'main' });

  const render = () => {
    dom.innerHTML = `
    <ul class="todo-list">
    ${todoList?.map(({ _id, contents, priority, isCompleted }) => {
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
