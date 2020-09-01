import {
  TEAM_LIST_ID,
  ADD_TEAM_BTN_ID,
  TEAM_CARD_ID,
  ADD_TEAM_BTN_CONTAINER_ID,
} from "../../utils/data.js";
import { teamListTemplate, addTeamBtnTemplate } from "../../utils/template.js";

export default function TeamList({ $target, teamList, addTeam, getOneTeam }) {
  this.init = () => {
    this.state = {
      teamList,
    };
    this.addTeam = addTeam;
    this.getOneTeam = getOneTeam;
    this.$teamList = document.createElement("div");
    this.$teamList.classList.add(TEAM_LIST_ID);
    $target.appendChild(this.$teamList);
  };

  this.setState = (teams) => {
    this.state.teamList = teams;
    this.render();
  };

  this.render = () => {
    this.$teamList.innerHTML =
      this.state.teamList
        .map(
          ({ _id, name }) =>
            (this.$teamList.innerHTML = teamListTemplate(_id, name))
        )
        .join("") + addTeamBtnTemplate;
  };

  this.clickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.closest(`div`).className === ADD_TEAM_BTN_CONTAINER_ID) {
      const teamName = prompt("팀 이름을 입력해주세요");
      teamName && this.addTeam(teamName);
    } else {
      this.getOneTeam(evt.target.closest(`div.${TEAM_CARD_ID}`).dataset.id);
    }
  };

  this.bindEventListener = () => {
    this.$teamList.addEventListener("click", this.clickHandler);
  };

  this.init();
  this.render();
  this.bindEventListener();
}
