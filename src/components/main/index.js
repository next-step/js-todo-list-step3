import { createElement } from "../../utils/createElement.js";

import TeamCard from "./TeamCard.js";

const template = `
  <div>      
    <h1>
      <strong>Team</strong>'s Todo Lists
    </h1>
    <div class="team-list-container">
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    </div>
  </div>
`;

export default function Main() {
  const dom = createElement(template);
  const teamList = dom.querySelector(".team-list-container");
  const createBtn = dom.querySelector(".add-team-button-container");

  const init = () => {
    render();
  };

  const render = () => {
    const teams = [{ _id: 0, name: "Black Coffee" }];

    teamList.innerHTML = "";
    teams.forEach(renderEachTeam);
    teamList.appendChild(createBtn);
  };

  const renderEachTeam = (team) => {
    const teamCard = new TeamCard({ team });
    teamList.appendChild(teamCard);
  };

  init();

  return dom;
}
