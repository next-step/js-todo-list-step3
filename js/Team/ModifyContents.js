import { API } from '../API.js';
import { teamID } from './Team.js';
import { loadTodoList } from './LoadTodoList.js';
import { renderTodoList } from './TodoList.js';

export const modifyContentsEvent = () => {
    document.addEventListener('dblclick', event => convertToEditMode(event));
    document.addEventListener('keyup', event => modifyContents(event));
}

const convertToEditMode = event => {
    const $labels = document.querySelectorAll('.label');
    const $item = Array.from($labels).find($label => $label.contains(event.target));
    if($item === undefined) return;
    
    const itemElement = $item.closest('li');
    itemElement.classList.add('editing');
}

const modifyContents = async event => {
    if(event.key !== 'Enter') return;

    const $edits = document.querySelectorAll('.edit');
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

    const userID = event.target.closest('.todoapp-container').id;
    const item = { _id : event.target.closest('.todo-list-item').id, contents : $item.value };

    try{
        await API.updateTodoItem(teamID, userID, item);
        const user = await loadTodoList(teamID, userID);
        renderTodoList(user);
    } catch(err){
        console.error(err);
    }
}