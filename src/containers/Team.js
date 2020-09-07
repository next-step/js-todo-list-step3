import {Component} from "../core/Component.js";
import {TeamList} from "../components/Team/TeamList.js";
import {FETCH_TEAMS, teamStore} from "../store/teamStore.js";
import {TeamAppendForm} from "../components/Team/TeamAppendForm.js";

export const Team = class extends Component {

  render ({ openedTeamAppendForm }) {
    return `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>Team</strong>'s Todo Lists</span>
      </h1>
      <div class="team-list-container"></div>
      <div id="team-append-form"></div>
    `;
  }

  componentDidMount () {
    const $teamListContainer = document.querySelector('.team-list-container');
    const $teamAppendForm = document.querySelector('#team-append-form');
    const teamList = new TeamList($teamListContainer);
    const teamAppendForm = new TeamAppendForm($teamAppendForm);
    teamStore.addObserve(teamList, teamAppendForm);
    teamStore.dispatch(FETCH_TEAMS);
  }
}