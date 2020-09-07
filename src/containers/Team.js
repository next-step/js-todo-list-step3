import {Component} from "../core/Component.js";
import {TeamList} from "../components/Team/TeamList.js";

export const Team = class extends Component {

  render () {
    return `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>Team</strong>'s Todo Lists</span>
      </h1>
      <div class="team-list-container"></div>
    `;
  }

  componentDidMount () {
    const $teamListContainer = document.querySelector('.team-list-container');
    new TeamList($teamListContainer);
  }
}