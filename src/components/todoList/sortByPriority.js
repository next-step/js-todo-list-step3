import {API} from '../../api/api.js';
import {todoListTemplate} from '../todoList/todoTemplates.js';

//우선 순위 정렬 보여주기 
export const sortByPriority = async (teamId, memberId) => {
    const priorityList = {
        FIRST : 1,
        SECOND : 2,
        NONE : 3,
    };

    const user = await API.getTodos(teamId, memberId);
    const todos = user.todoList;

    todos.sort(function (a,b){
        return priorityList[a.priority] - priorityList[b.priority]; 
    });

    const $todoList = document.getElementById(`${memberId}`).querySelector('.todo-list');
    $todoList.innerHTML = '';
    await todos.map(async (todo) => {
        $todoList.insertAdjacentHTML('beforeend', todoListTemplate(todo, memberId));
    });
};