import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const deleteTodoItemAllEvent = () => {
    document.addEventListener('click', event => deleteTodoItemAll(event));
}

const deleteTodoItemAll = async event => {
    const $deleteItemAlls = document.querySelectorAll('button.clear-completed');
    let found = false;
    $deleteItemAlls.forEach($deleteItemAll => {
        if($deleteItemAll.contains(event.target)){
            found = true;
        }
    })
    if(!found) return;

    const team = { _id : teamID };
    let user = { _id : event.target.closest('li.todoapp-container').id };
    
    try{
        await API.deleteAllItems(team, user);
        console.log(team, user);
        user = await loadTodoList(team, user);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}