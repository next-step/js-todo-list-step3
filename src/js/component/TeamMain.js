import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constant.js";
import { getState } from "../redux/functions.js";
import { teamListView, loadingView } from "../utils/templates.js";

class TeamMain extends Component {
  constructor() {
    super();
    this.container = $(SELECTORS.teamList);
    this.state = getState(this, "team");
    this.render();
  }

  update() {
    this.state = getState(this, "team");
    this.render();
  }
  render() {
    this.container.innerHTML = this.state.isLoadingTeamLoad
      ? loadingView
      : teamListView(this.state.teamList);
  }
}

export default TeamMain;
