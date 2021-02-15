import {API} from '../../api/api.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {addUserButtonTemplate} from '../memberList/memberTemplates.js';
import {todoAppContainerTemplate} from '../todoList/todoTemplates.js';
import {setTeamId} from '../../utils/localStorage.js';

const setTeamName = (teamName) => {
    const $userTitleStrong = document.querySelector('#user-title strong');
    $userTitleStrong.innerHTML = teamName;
};

const renderTodoAppContainer = (memberId, memberName) => {
    const $todoAppList = document.getElementById(`todoapp-list`);
    $todoAppList.insertAdjacentHTML('beforeend', todoAppContainerTemplate(memberId, memberName));
};

export const loadMembers = async (option ='all') => {
    const $todoAppList = document.getElementById(`todoapp-list`);

    const teamId = location.search.slice(1);
    setTeamId(teamId); 

    const team = await API.getTeam(teamId);
    const members = team.members; 
    setTeamName(team.name);

    $todoAppList.innerHTML = '';
    await members.map(async (member) => {
        renderTodoAppContainer(member._id, member.name);
        loadTodos(teamId, member._id);
    });

    $todoAppList.insertAdjacentHTML('beforeend', addUserButtonTemplate());
};