import { API } from './API.js';
import { todoItemTemplate } from './Template.js';
import { teamID } from './Team.js';
import { getTodoList } from './TodoList.js';

// const $todoappContainer = document.querySelector(`li.todoapp-container#${user._id}`);

export const addTodoItemEvent = () => {
    const $inputItems = document.querySelectorAll('input.new-todo');
    console.log($inputItems)
    
    $inputItems.forEach($inputItem => $inputItem.addEventListener('keyup', event => addTodoItem(event)));
}

const addTodoItem = async event => {
    if(event.key != 'Enter') return;

    console.log(event.target)

    const team = { _id : teamID }; //_id : event.target.closest('div.team-card-container').id };
    const user = { _id : event.target.closest('li.todoapp-container').id };
    const item = todoItemTemplate;
    console.log(event.target.value)
    item.contents = event.target.value;
    
    try{
        await API.addTodoItem(team, user, item);
        getTodoList(user);
    } catch(err){
        console.error(err);
    }
}