import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const toggleTodoItemEvent = () => {
    document.addEventListener('click', event => toggleTodoItem(event));
}

const toggleTodoItem = async event => {
    if(!event.target.classList.contains('toggle')){
        return;
    }

    const $item = event.target;

    $item.checked = !$item.checked;

    const userID = event.target.closest('.todoapp-container').id;
    const item = { 
        _id : event.target.closest('.todo-list-item').id,
        isCompleted: $item.checked,
    };
    
    try{
        await API.toggleTodoItem(teamID, userID, item);
        const user = await loadTodoList(teamID, userID);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}