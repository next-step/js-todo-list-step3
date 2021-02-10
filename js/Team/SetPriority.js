import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const setPriorityEvent = () => {
    document.addEventListener('change', event => setPriority(event));
}

const setPriority = async event => {
    const $selects = document.querySelectorAll('select');
    const $item = Array.from($selects).find($select => $select.contains(event.target));
    if($item === undefined) return;

    const $options = $item.querySelectorAll('option');
    let $prevSelected, $newSelected;
    $options.forEach($option => {
        if($option.selected){
            $prevSelected = $option;
        }
        if($option.value === $item.value){
            $newSelected = $option;
        }
    });

    const userID =  event.target.closest('.todoapp-container').id;
    const todoItem = { _id : event.target.closest('.todo-list-item').id, priority : ""};

    $item.classList.remove('primary');
    $item.classList.remove('secondary');

    if($item.value === "0"){
        todoItem.priority = "NONE";
    }
    else if($item.value === "1"){
        todoItem.priority = "FIRST";
        $item.classList.add('primary');
    }
    else if($item.value === "2"){
        todoItem.priority = "SECOND";
        $item.classList.add('secondary');
    }

    try{
        await API.updatePriority(teamID, userID, todoItem);
        const user = await loadTodoList(teamID, userID);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }

    $prevSelected.selected = false;
    $newSelected.selected = true;
    
}