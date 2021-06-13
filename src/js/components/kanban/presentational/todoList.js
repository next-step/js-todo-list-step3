import todoItemContainer from './todoItem.js';

export default {
  template : (todoList) => `
  <ul class="todo-list">
  ${todoList ? todoList.map((todoItem, index) => todoItemContainer.template(todoItem, index)) : ''}
  <li class="todo-list-item editing">
    <div class="view">
      <input class="toggle" type="checkbox" checked />
      <label class="label">
        <div class="chip-container">
          <span class="chip primary">1순위</span>
          <select class="chip select hidden">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        </div>
        수정중인 아이템
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="수정중인 타이틀" />
  </li>
</ul>`
}