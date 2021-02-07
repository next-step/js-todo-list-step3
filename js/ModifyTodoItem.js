import { API } from './API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const ModifyTodoItemEvent = () => {
    document.addEventListener('click', event => toggleTodoItem(event));
    document.addEventListener('dblclick', event => convertToEditMode(event));
    document.addEventListener('keyup', event => modifyContents(event));
}

const convertToEditMode = event => {
    const $labels = document.querySelectorAll('label.label');
    let found = false;
    let $item;
    $labels.forEach($label => {
        if($label.contains(event.target)){
            found = true;
            $item = $label;
        }
    })
    if(!found) return;
    
    const itemElement = $item.closest('li');
    itemElement.classList.add('editing');
}

const modifyContents = async event => {
    if(event.key !== 'Enter') return;

    const $edits = document.querySelectorAll('input.edit');
    let found = false;
    let $item;
    $edits.forEach($edit => {
        const itemElement = $edit.closest('li');
        if(itemElement.classList.contains('editing')){
            itemElement.classList.remove('editing');
            found = true;
            $item = $edit;
        }
    })

    const team = { _id : teamID };
    let user = { _id : event.target.closest('li.todoapp-container').id };
    const item = { _id : event.target.closest('li.todo-list-item').id,
        contents : $item.value };

    try{
        await API.updateTodoItem(team, user, item);
        user = await loadTodoList(team, user);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}

const toggleTodoItem = async event => {
    const $toggleItems = document.querySelectorAll('input.toggle');
    let found = false;
    let $item;
    $toggleItems.forEach($toggleItem => {
        if($toggleItem.contains(event.target)){
            found = true;
            $item = $toggleItem;
        }
    })
    if(!found) return;

    $item.checked = !$item.checked;

    const team = { _id : teamID };
    let user = { _id : event.target.closest('li.todoapp-container').id };
    const item = { _id : event.target.closest('li.todo-list-item').id };
    
    try{
        await API.toggleTodoItem(team, user, item);
        user = await loadTodoList(team, user);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}