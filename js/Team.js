import { getTeams, addTeam } from './api/index.js';
import { teamItemTemplate, teamAddItemTemplate } from './template.js';

function Team() {
  this.teamList = [];

  const $teamList = document.querySelector('#team-list');

  this.inputTeamNameAndSend = async () => {
    const teamName = prompt('팀 이름을 입력해주세요');
    if (!teamName) return;
    const { error, errorMessage } = await this.addTeam(teamName);
    if (error) return alert(errorMessage);
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

  $teamList.addEventListener('click', (event) => {
    if (event.target.closest('#add-team-button')) {
      this.inputTeamNameAndSend();
    }
  });
}

const TeamList = new Team();
TeamList.init();