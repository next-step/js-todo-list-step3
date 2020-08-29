import { teamCardHTML, addTeamButtonHTML } from '../../utils/templates/team.js';

function TeamList({ $target, teams }) {
  this.init = () => {
    this.$target = $target;

    this.teams = teams;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    e.preventDefault();
    const $div = e.target.closest('div');
    const TeamClassList = ['team-card-container', 'add-team-button-container'];
    if (
      !TeamClassList.some((className) => $div.classList.contains(className))
    ) {
      return;
    }

    if (e.target.classList.contains('delete')) {
      // 팀 삭제하기
      console.log($div.id);
      return;
    }

    if ($div.classList.contains('add-team-button-container')) {
      // 팀 추가하기
      const name = prompt('추가할 팀 이름을 입력하세요 !');
      if (!name || !name.trim().length) {
        alert('팀 이름을 다시 입력해주세요 !');
        return;
      }
      console.log(name);

      return;
    }

    location.href = `./kanban.html?id=${$div.id}`;
  };

  this.setState = (nextState) => {
    this.teams = nextState;

    this.render();
  };

  this.createTeamListHTML = (teams) => {
    return (
      teams.reduce((html, team) => {
        html += teamCardHTML(team);
        return html;
      }, '') + addTeamButtonHTML()
    );
  };

  this.render = () => {
    this.$target.innerHTML = this.createTeamListHTML(this.teams);
  };

  this.init();
}

export default TeamList;
