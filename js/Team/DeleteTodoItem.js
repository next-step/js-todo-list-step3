import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const deleteTodoItemEvent = () => {
    document.addEventListener('click', event => deleteTodoItem(event));
}

const deleteTodoItem = async event => {
    const $deleteItems = document.querySelectorAll('.destroy');
    const $item = Array.from($deleteItems).find($deleteItem => $deleteItem.contains(event.target));
    if($item === undefined) return;

    const userID = event.target.closest('.todoapp-container').id;
    const itemID = event.target.closest('.todo-list-item').id;
    
    try{
        await API.deleteTodoItem(teamID, userID, itemID);
        const user = await loadTodoList(teamID, userID);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}