import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS, POPUP_MESSAGES } from "../utils/constant.js";
import { isAvailableTeamName } from "../utils/validators.js";
import { ERROR_HANDLER } from "../utils/errors.js";
import { getState, dispatch } from "../redux/functions.js";
import { teamListView, loadingView } from "../utils/templates.js";
import { ACTIONS } from "../actions/team/index.js";

class TeamMain extends Component {
  constructor() {
    super();
    this.container = $(SELECTORS.TEAM_LIST);
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    const $addTeamButton = $(SELECTORS.TEAM_ADD_BTN);
    $addTeamButton.addEventListener("click", (e) => this.onClickAddButton(e));
  }

  onClickAddButton() {
    try {
      const teamName = prompt(POPUP_MESSAGES.TYPE_TEAM_NAME);
      if (!teamName) return;
      isAvailableTeamName(teamName);
      dispatch(ACTIONS.AddTeamReqAction(teamName));
    } catch (error) {
      const handler = ERROR_HANDLER[error];
      return handler && handler();
    }
  }

  render() {
    const { isLoadingTeamLoad, teamList } = getState(this, "team");
    this.container.innerHTML = isLoadingTeamLoad
      ? loadingView
      : teamListView(teamList);
  }
}

export default TeamMain;
