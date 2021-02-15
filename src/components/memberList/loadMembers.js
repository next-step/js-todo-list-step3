import {API} from '../../api/api.js';
import {loadTodos} from '../todoList/loadTodos.js';
import {addUserButtonTemplate} from '../memberList/memberTemplates.js';
import {todoAppContainerTemplate} from '../todoList/todoTemplates.js';
import {setTeamId} from '../../utils/localStorage.js';
const $todoAppList = document.getElementById(`todoapp-list`);

const setTeamName = (teamName) => {
    const $userTitleStrong = document.querySelector('#user-title strong');
    $userTitleStrong.innerHTML = teamName;
};

export const loadMembers = async (option = 'all') => {
    const teamId = location.search.slice(1);
    setTeamId(teamId);

    const team = await API.getTeam(teamId);
    const members = team.members;
    setTeamName(team.name);

    $todoAppList.innerHTML = '';
    await members.map(async (member) => {
        $todoAppList.insertAdjacentHTML('beforeend', todoAppContainerTemplate(member._id, member.name));
        loadTodos(teamId, member._id);
    });

    $todoAppList.insertAdjacentHTML('beforeend', addUserButtonTemplate());
};
