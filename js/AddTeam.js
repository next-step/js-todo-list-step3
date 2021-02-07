import { teamTemplate } from './Template.js';
import { teamTemplateHTML } from './Template.js';
import { API } from './API.js';
import { loadTeamList } from './LoadTeamList.js';
import { getTeamList } from './TeamList.js';

const $addTeamButton = document.querySelector('#add-team-button');
const $addTeamButtonContainer = document.querySelector('div.add-team-button-container');

$addTeamButton.addEventListener('click', () => addTeam());

export const addTeam = async () => {
    const teamname = prompt('팀 이름을 입력해주세요');

    if(teamname.length < 2){
        alert('팀 이름이 너무 짧습니다.');
        return;
    }

    const team = teamTemplate;
    team._id = Math.random().toString(36).substr(2,10);
    team.name = teamname;

    try{
        await API.addTeam(team);
        getTeamList();
    } catch(err){
        console.error(err);
    }
}