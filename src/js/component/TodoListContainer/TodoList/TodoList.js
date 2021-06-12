
function TodoList() {
  this.$todoList = document.querySelector('.todo-list');
  this.todoItems = {};

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  }

  this.render = items => {
    const template = items.map(item => this.template(item)).join('');
    this.$todoList.innerHTML = template

  }

  this.template = item => {
    return `
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
            ${item.todo}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>`
  }
}

export default TodoList;
