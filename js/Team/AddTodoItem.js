import { API } from '../API.js';
import { todoItemTemplate } from '../Template.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const addTodoItemEvent = () => {
    const $inputItems = document.querySelectorAll('.new-todo');
    $inputItems.forEach($inputItem => $inputItem.addEventListener('keyup', event => addTodoItem(event)));
}

const addTodoItem = async event => {
    if(event.key !== 'Enter') return;

    const userID = event.target.closest('.todoapp-container').id;
    const item = todoItemTemplate;
    item.contents = event.target.value;
    
    try{
        await API.addTodoItem(teamID, userID, item);
        const user = await loadTodoList(teamID, userID);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}