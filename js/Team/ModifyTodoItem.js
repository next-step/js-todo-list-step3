import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const ModifyTodoItemEvent = () => {
    document.addEventListener('click', event => toggleTodoItem(event));
    document.addEventListener('dblclick', event => convertToEditMode(event));
    document.addEventListener('keyup', event => modifyContents(event));
    document.addEventListener('change', event => setPriority(event));
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
    if(!found) return;

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

const setPriority = async event => {
    const $selects = document.querySelectorAll('select');
    let found = false;
    let $item;
    $selects.forEach($select => {
        if($select.contains(event.target)){
            found = true;
            $item = $select;
        }
    });
    if(!found) return;

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

    const team = { _id : teamID };
    let user = { _id : event.target.closest('li.todoapp-container').id };
    const todoItem = { _id : event.target.closest('li.todo-list-item').id, priority : ""};

    if($item.value === "0"){
        todoItem.priority = "NONE";
        if($item.classList.contains('primary')){
            $item.classList.remove('primary');
        }
        if($item.classList.contains('secondary')){
            $item.classList.remove('secondary');
        }
    }
    else if($item.value === "1"){
        todoItem.priority = "FIRST";
        if($item.classList.contains('secondary')){
            $item.classList.remove('secondary');
        }
        $item.classList.add('primary');
    }
    else if($item.value === "2"){
        todoItem.priority = "SECOND";
        if($item.classList.contains('primary')){
            $item.classList.remove('primary');
        }
        $item.classList.add('secondary');
    }

    try{
        await API.updatePriority(team, user, todoItem);
        user = await loadTodoList(team, user);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }

    $prevSelected.selected = false;
    $newSelected.selected = true;
    
}