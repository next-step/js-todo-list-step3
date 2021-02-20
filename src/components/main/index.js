import { createElement } from "../../utils/createElement.js";
import $api from "../../api/index.js";

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
  const createBtnContainer = dom.querySelector(".add-team-button-container");

  const init = () => {
    createBtnContainer
      .querySelector("button")
      .addEventListener("click", createTeam);

    render();
  };

  const render = async () => {
    const teams = await $api.team.getAll();

    teamList.innerHTML = "";
    teams.forEach(renderEachTeam);
    teamList.appendChild(createBtnContainer);
  };

  const renderEachTeam = (team) => {
    const teamCard = new TeamCard({ team });
    teamList.appendChild(teamCard);
  };

  const createTeam = async () => {
    const name = prompt("팀 이름을 입력해주세요")?.trim();

    if (!name) return;
    if (name.length < 2) {
      alert("팀의 이름은 최소 2글자 이상이어야 합니다.");
      return;
    }

    try {
      await $api.team.create(name);
      await render();
    } catch (e) {
      console.error(e);
    }
  };

  init();

  return dom;
}
