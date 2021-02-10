import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const toggleTodoItemEvent = () => {
    document.addEventListener('click', event => toggleTodoItem(event));
}

const toggleTodoItem = async event => {
    const $toggleItems = document.querySelectorAll('.toggle');
    const $item = Array.from($toggleItems).find($toggleItem => $toggleItem.contains(event.target));
    if($item === undefined) return;

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