import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constant.js";
import { getState } from "../redux/functions.js";
import { teamListView, loadingView } from "../utils/templates.js";

class TeamMain extends Component {
  constructor() {
    super();
    this.container = $(SELECTORS.teamList);
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    const $addTeamButton = $(SELECTORS.teamAddBtn);
    $addTeamButton.addEventListener("click", () => {
      const result = prompt("팀 이름을 입력해주세요");
    });
  }

  render() {
    const { isLoadingTeamLoad, teamList } = getState(this, "team");
    this.container.innerHTML = isLoadingTeamLoad
      ? loadingView
      : teamListView(teamList);
  }
}

export default TeamMain;
