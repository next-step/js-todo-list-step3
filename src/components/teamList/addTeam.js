import {API} from '../../api/api.js';
import {loadTeams} from '../teamList/loadTeams.js'

export const onAddTeam = async() => {
    const teamName = prompt(`새로운 팀 이름을 입력해주세요`); 
    if (!teamName) return;
    await API.addTeam(teamName);
    loadTeams();
};