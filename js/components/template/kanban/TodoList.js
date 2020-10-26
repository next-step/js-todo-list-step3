import CreateElement from '../../../lib/CreateElement.js';

const PRIORITY = {
  NONE: { ko: '순위', style: '' },
  FIRST: { ko: '1순위', style: 'primary' },
  SECOND: { ko: '2순위', style: 'secondary' },
};

const isChecked = (isCompleted) => isCompleted ? 'checked' : '';

const liStyle = (isCompleted, editID) => `
    ${isCompleted ? ' completed ' : ''}
    ${editID ? ' editing ' : ''}
  `;

const chipStyle = (priority) => PRIORITY[priority].style;

const TodoList = ({ todoList }) => {
  const editID = undefined;

  const dom = CreateElement('section', { className: 'main ' });

  const render = () => {
    dom.innerHTML = `
    <ul class="todo-list">
    ${todoList?.map(({ _id, contents, priority, isCompleted }) => {
      return `
      <li class="todo-list-item ${liStyle(isCompleted, editID)}" data-component="todoListItem" data-key="${_id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${isChecked(isCompleted)}/>
          <label class="label">
            <select class="chip select ${chipStyle(priority)}">
              ${Object.entries(PRIORITY).map(([key, { ko, style }]) => (
        `<option value="${key}" ${priority === key ? 'selected' : ''}>${ko}</option>`
      ))}
            </select>
            ${contents}
          </label>
          <button class="destroy" data-component="destroyButton"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>
      `}).join('') || ''}
    </ul>`;
  };
  render();

  return dom;
};

export default TodoList;
