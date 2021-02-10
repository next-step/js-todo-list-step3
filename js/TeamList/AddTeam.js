import { teamTemplate } from '../Template.js';
import { API } from '../API.js';
import { getTeamList } from './TeamList.js';

const $teamListContainer = document.querySelector('.team-list-container');
const $addTeamButton = document.querySelector('#add-team-button');

$teamListContainer.addEventListener('click', event => addTeam(event));

export const addTeam = async event => {
    if(!$addTeamButton === event.target){
        return;
    }

    const teamname = prompt('팀 이름을 입력해주세요');
    if(teamname === null){
        return;
    }
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