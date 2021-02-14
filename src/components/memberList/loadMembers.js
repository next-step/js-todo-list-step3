import {API} from '../../api/api.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {addUserButtonTemplate} from '../memberList/memberTemplates.js';
import {setTeamId} from '../../utils/localStorage.js';

const setTeamName = (teamName) => {
    const $userTitleStrong = document.querySelector('#user-title strong');
    $userTitleStrong.innerHTML = teamName;
};

export const loadMembers = async (option ='all') => {
    const $todoAppList = document.getElementById(`todoapp-list`);
    const teamId = location.search.slice(1);
    setTeamId(teamId); 

    const team = await API.getTeam(teamId);
    const members = team.members; 

    const teamName = team.name;
    setTeamName(teamName);

    $todoAppList.innerHTML = '';
    await members.map(async (member) => loadTodos(teamId, member, option));

    $todoAppList.insertAdjacentHTML('beforeend', addUserButtonTemplate());
};