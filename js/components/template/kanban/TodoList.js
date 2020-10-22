import CreateElement from '../../../lib/CreateElement.js';

const TodoList = () => {
  const dom = CreateElement('section', { className: 'main ' });

  // todo-list-item : completed, editing
  //  <span class="chip primary">1순위</span> secondary
  const render = () => {
    dom.innerHTML = `
    <ul class="todo-list">
      <li class="todo-list-item">
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label">
            <div class="chip-container">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            해야할 아이템
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>
    </ul>
    `
  };
  render();

  return dom;
};

export default TodoList;
