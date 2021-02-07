import { todoItemTemplateHTML } from './Template.js';

export const getTodoList = async user => {
    console.log(user)
    // user = await loadTodoList(team, user);
    renderTodoList(user);
}
  
export const renderTodoList = user => {
    const $todoappContainer = document.querySelector(`li.todoapp-container#${user._id}`);
    const $todoList = $todoappContainer.querySelector('ul.todo-list');

    console.log(user.todoList)
  
    if(user.todoList.length > 0){
        $todoList.innerHTML = user.todoList.map(todoItemTemplateHTML).join('');
    }
}