import { todoItemTemplateHTML } from './Template.js';
  
export const renderTodoList = user => {
    const $todoappContainer = document.querySelector(`li.todoapp-container#${user._id}`);
    const $todoList = $todoappContainer.querySelector('ul.todo-list');

    if(!user.todoList){
        $todoList.innerHTML = ``;
        return;
    }
  
    if(user.todoList.length > 0){
        const tempTodoList = [];
        user.todoList.filter(item => item.priority === "FIRST").forEach(item => tempTodoList.push(item));
        user.todoList.filter(item => item.priority === "SECOND").forEach(item => tempTodoList.push(item));
        user.todoList.filter(item => item.priority === "NONE").forEach(item => tempTodoList.push(item));

        $todoList.innerHTML = tempTodoList.map(todoItemTemplateHTML).join('');
    }
}