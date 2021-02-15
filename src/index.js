import {teamList} from './components/teamList/teamList.js';
import {loadTeams} from './components/teamList/loadTeams.js';

export const todoApp = async () => {
    await loadTeams();
    teamList(); // team 관련 함수들을 모아놓은 js파일
};

window.onload = () => {
    todoApp();
};
