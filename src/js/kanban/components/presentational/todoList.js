import todoItemContainer from './todoItem.js';

export default {
  template : (todoList) => `
  <ul class="todo-list">
    ${todoList ? todoList.map((todoItem, index) => todoItemContainer.template(todoItem, index)) : ''}
  </ul>`
}