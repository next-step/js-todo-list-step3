import {loadMembers} from './components/memberList/loadMembers.js';
import {memberList} from './components/memberList/memberList.js';
import {todoList} from './components/todoList/todoList.js';

export const todoApp = async () => {
    await loadMembers();
    memberList(); //addmember
    todoList(); //addtodo, delete, completed
};

window.onload = () => {
    todoApp();
};
