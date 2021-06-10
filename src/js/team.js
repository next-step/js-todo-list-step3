import api from './api/index.js';

function TeamList() {
  this.teams = [];
  this.teamListContainer = document.querySelector('.team-list-container');

  this.setState = async () => {
    this.teams = await api.team.getList();
    await this.render();
    this.create();
  }

  this.render = () => {
    const teamCard = this.teams.map(team => this.teamTemplate(team)).join('');
    this.teamListContainer.innerHTML = teamCard + this.addBtnTemplate;
  }

  this.teamTemplate = (team) => {
    return `
      <div class="team-card-container">
        <a href="/kanban.html" class="card">
          <div class="card-title">
            ${team.name}
          </div>
        </a>
      </div>
    `
  }

  this.addBtnTemplate = `
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </div>
  `
  
  this.create = () => {
    const $addTeamButton = document.querySelector('#add-team-button');
    $addTeamButton.addEventListener('click', async () => {
      const name = prompt('팀 이름을 입력해주세요');
      await api.team.add({ name });
      this.teams = await api.team.getList();
      await this.render();
    })
  }

  this.delete = async () => {
    const nameDeletedTeam = prompt('제거할 팀의 이름을 입력해주세요');
    const deleteTeam = this.teams.find(team => team.name === nameDeletedTeam);
    console.log(deleteTeam);
    await api.team.delete(deleteTeam._id);
  }

}

const teamList = new TeamList
teamList.setState();



