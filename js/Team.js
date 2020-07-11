import { getTeams, addTeam } from './api/index.js';
import { teamItemTemplate, teamAddItemTemplate } from './template.js';

function Team() {
  this.teamList = [];

  this.inputTeamNameAndSend = async (event) => {
    if (event.target.id !== 'add-team-button') return;
    const teamName = prompt('팀 이름을 입력해주세요');
    await this.addTeam(teamName);
    this.getTeams();
  }

  this.addTeam = async teamName => {
    const { result, error, errorMessage } = await addTeam(teamName);
    if (error) return alert(errorMessage);
    return result;
  }

  this.getTeams = async () => {
    const { result, error, errorMessage } = await getTeams();
    if (error) return alert(errorMessage);
    this.setState(result);
  }

  this.setState = list => {
    this.teamList = list;
    this.render();
  }

  this.render = () => {
    $teamList.innerHTML = this.teamList.map(item => teamItemTemplate(item)).join('') + teamAddItemTemplate();
  }

  this.init = async () => {
    this.getTeams();
  }

  const $teamList = document.querySelector('#team-list');

  $teamList.addEventListener('click', this.inputTeamNameAndSend);
}

const TeamList = new Team();
TeamList.init();