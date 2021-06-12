function TodoInput({ onAdd }) {
  this.$todoInput = document.querySelector('.new-todo');

  this.$todoInput.addEventListener('keyup', event => this.addTodoItem(event));

  this.addTodoItem = ({target}) => {
    if (!target.matches('.new-todo')) return;
    onAdd(target.value.trim());
    target.value = "";
  }
}