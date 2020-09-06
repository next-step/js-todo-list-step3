import { TEAM_LIST, ADD_TEAM_BTN_CONTAINER } from "../../utils/data.js";
import {
  teamListTemplate,
  addTeamBtnTemplate,
  errorCallTemplate,
} from "../../utils/template.js";

export default function TeamList({ $target, teamList, addTeam, getOneTeam }) {
  this.init = () => {
    if (!(this instanceof TeamList)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      teamList,
    };
    this.addTeam = addTeam;
    this.getOneTeam = getOneTeam;
    this.$teamList = document.createElement("div");
    this.$teamList.classList.add(TEAM_LIST);
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

  this.clickHandler = ({ target }) => {
    if (target.closest(`div`).className === ADD_TEAM_BTN_CONTAINER) {
      const teamName = prompt("팀 이름을 입력해주세요");
      teamName && this.addTeam(teamName);
    }
  };

  this.bindEventListener = () => {
    this.$teamList.addEventListener("click", this.clickHandler);
  };

  this.init();
  this.render();
  this.bindEventListener();
}
