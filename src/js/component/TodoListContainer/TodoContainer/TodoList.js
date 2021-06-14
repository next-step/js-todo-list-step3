
function TodoList(parent, {onDelete, onToggle, onEdit}) {
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

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems ?? [];
    this.setDom();
    this.render(this.todoItems);
  }

  this.render = (items) => {
    const template = items.map(item => this.template(item)).join('');
    this.$todoContainer.innerHTML = template;
    this.setEvent();
  }

  this.template = item => {
    console.log(item);
    return `
      <li class="todo-list-item ${item.isCompleted ? "completed" : ''}"  id=${item._id}>
        <div class="view">
          <input class="toggle" type="checkbox" id=${item._id} data-complete=${item.isCompleted}  ${item.isCompleted ? "checked" : null} />
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
        <input class="edit" value="${item.contents}" />
      </li>`
  }
  
  this.setEvent = () => {
    const $destroyBtns = document.querySelectorAll('.destroy');
    const $toggleBtns = document.querySelectorAll('.toggle');
    const $todoLabel = document.querySelectorAll('.label');
    const $inputEdit = document.querySelectorAll('.edit');
    [...$destroyBtns].forEach(btn => btn.addEventListener('click', event => this.deleteTodoItem(event)));
    [...$toggleBtns].forEach(btn => btn.addEventListener('click', event => this.toggleTodo(event)));
    [...$todoLabel].forEach(label => label.addEventListener('click', event => this.activeEdit(event)));
    [...$inputEdit].forEach(input => input.addEventListener('keyup', event => this.endEdit(event)));
    
  }

  this.deleteTodoItem = ({target}) => {
    if (!target.matches('.destroy')) return;
    const $li = target.closest('li');
    onDelete($li.id);
  }

  this.toggleTodo = ({target}) => {
    if (!target.matches('.toggle')) return;
    const $li = target.closest('li');
    onToggle($li.id, target.dataset.complete);
  }
  
  this.activeEdit = ({target}) => {
    if (!target.matches('.label')) return;
    const $li = target.closest('li');
    $li.classList.toggle('editing');
  }

  this.endEdit = ({key, target}) => {
    const $li = target.closest('li'); 
    if (!target.matches('.edit')) return;
  
    if (key === 'Escape' || key === 'Esc') {
      $li.classList.toggle('editing');
    }

    if (key === 'Enter') {
      onEdit(target.value.trim(), $li.id);
      $li.classList.toggle('editing');
    }
  }

}

export default TodoList;
