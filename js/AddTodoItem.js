import { API } from './API.js';
import { todoItemTemplate } from './Template.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const addTodoItemEvent = () => {
    const $inputItems = document.querySelectorAll('input.new-todo');    
    $inputItems.forEach($inputItem => $inputItem.addEventListener('keyup', event => addTodoItem(event)));
}

const addTodoItem = async event => {
    if(event.key != 'Enter') return;

    const team = { _id : teamID };
    let user = { _id : event.target.closest('li.todoapp-container').id };
    const item = todoItemTemplate;
    item.contents = event.target.value;
    
    try{
        await API.addTodoItem(team, user, item);
        user = await loadTodoList(team, user);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}