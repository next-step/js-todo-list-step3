import { teamCardHTML, addTeamButtonHTML } from '../../utils/templates/team.js';
import { CLASS_NAME, MESSAGE, KANBAN_URL } from '../../utils/constants.js';
import { checkTarget } from '../../utils/validation.js';

function TeamList({ $target, teams, onAddTeam, onDeleteTeam }) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;
    this.teams = teams;

    this.TeamClassList = [CLASS_NAME.TEAM_CARD, CLASS_NAME.ADD_TEAM_BUTTON];

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    e.preventDefault();
    const $div = e.target.closest('div');
    if (
      !this.TeamClassList.some((className) =>
        $div.classList.contains(className),
      )
    ) {
      return;
    }

    if (e.target.classList.contains(CLASS_NAME.DELETE)) {
      if (confirm(MESSAGE.CONFIRM_DELETE)) {
        try {
          onDeleteTeam($div.id);
        } catch (err) {
          console.error(err);
        }
      }
      return;
    }

    if ($div.classList.contains(CLASS_NAME.ADD_TEAM_BUTTON)) {
      const name = prompt(MESSAGE.INPUT_TEAM_NAME);

      if (!name || !name.trim().length) {
        alert(MESSAGE.NO_TEAM_NAME);
        return;
      }

      try {
        onAddTeam(name);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    location.href = `${KANBAN_URL}?id=${$div.id}`;
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
