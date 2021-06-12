
function TodoList(parent) {
  this.$parent = parent;
  this.todoItems = [];  
  this.dom = {};
  this.$todoContainer = {};

  this.setDom = () => {
    this.dom = document.createElement('section');
    this.$todoContainer = document.createElement('ul');
    this.dom.className = 'main';
    this.$todoContainer.className = 'todo-list';
    this.$parent.append(this.dom);
    this.dom.prepend(this.$todoContainer);
  }

  this.$todoList = document.querySelector('.todo-list');
  this.todoItems = {};

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.setDom();
    this.render(this.todoItems);
  }

  this.render = items => {
    const template = items.map(item => this.template(item)).join('');
    this.$todoContainer.innerHTML = template

  }

  this.template = item => {
    console.log(item);
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
            ${item.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>`
  }
}

export default TodoList;
