import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const deleteTodoItemEvent = () => {
    document.addEventListener('click', event => deleteTodoItem(event));
}

const deleteTodoItem = async event => {
    const $deleteItems = document.querySelectorAll('button.destroy');
    let found = false;
    $deleteItems.forEach($deleteItem => {
        if($deleteItem.contains(event.target)){
            found = true;
        }
    })
    if(!found) return;

    const team = { _id : teamID };
    let user = { _id : event.target.closest('li.todoapp-container').id };
    const item = { _id : event.target.closest('li.todo-list-item').id };
    
    try{
        await API.deleteTodoItem(team, user, item);
        user = await loadTodoList(team, user);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}