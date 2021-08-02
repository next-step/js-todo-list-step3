import team from '../../store/team.js';

function TeamList() {
  this.teams = [];
  this.$app = document.querySelector('#app');
  this.$teamListContainer = document.createElement('div');
  this.$teamListContainer.setAttribute('class', 'team-list-container');
  
  this.$app.insertAdjacentElement('beforeend', this.$teamListContainer);

  this.setState = async () => {
    this.teams = await team.getList();
    this.render();
    this.create();
  }

  this.render = () => {
    const teamCard = this.teams.map(team => this.teamTemplate(team)).join('');
    this.$teamListContainer.innerHTML = teamCard + this.addBtnTemplate;
  }

  this.teamTemplate = (team) => {
    return `
      <div class="team-card-container">
        <a href="/kanban.html?id=${team._id}" class="card">
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
    $addTeamButton.addEventListener('click', (event) => onAddTeamHandler(event))
  }

  this.delete = async () => {
    const nameDeletedTeam = prompt('제거할 팀의 이름을 입력해주세요');
    const deleteTeam = this.teams.find(team => team.name === nameDeletedTeam);
    await team.deleteTeam(deleteTeam._id);
  }

  const onAddTeamHandler = async (event) => {
    const nameNewTeam = prompt('팀 이름을 입력해주세요');
    const index = this.teams.findIndex(team => team.name === nameNewTeam);
    
    if (index !== -1) {
      alert('이미 사용중인 팀 이름입니다.');
      return;
    }

    await team.create(nameNewTeam);
    this.teams = await team.getList();
    await this.render();
  };
}
const teamList = new TeamList
teamList.setState();

export default TeamList;

