import { API } from '../API.js';
import { teamID } from './Team.js';
import { clearRenderedTodoList, renderTodoList } from './TodoList.js';

export const deleteTodoItemAllEvent = () => {
    document.addEventListener('click', event => deleteTodoItemAll(event));
}

const deleteTodoItemAll = async event => {
    const $deleteItemAlls = document.querySelectorAll('.clear-completed');
    const $item = Array.from($deleteItemAlls).find($deleteItemAll => $deleteItemAll.contains(event.target));
    if($item === undefined) return;

    const userID = event.target.closest('.todoapp-container').id;
    
    try{
        await API.deleteAllItems(teamID, userID);
        clearRenderedTodoList(userID);
    } catch(err){
        console.error(err);
    }
}