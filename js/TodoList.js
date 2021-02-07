import { todoItemTemplateHTML } from './Template.js';
  
export const renderTodoList = user => {
    const $todoappContainer = document.querySelector(`li.todoapp-container#${user._id}`);
    const $todoList = $todoappContainer.querySelector('ul.todo-list');

    if(!user.todoList){
        $todoList.innerHTML = ``;
        return;
    }
  
    if(user.todoList.length > 0){
        $todoList.innerHTML = user.todoList.map(todoItemTemplateHTML).join('');
    }
}