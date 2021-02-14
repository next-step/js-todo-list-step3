import {teamList} from './components/teamList/teamList.js';
import {loadTeams} from './components/teamList/loadTeams.js';

export const todoApp = async() => {
    await loadTeams();
    teamList();
};

window.onload = () => {
    todoApp();
};