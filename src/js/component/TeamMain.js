import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constant.js";
import { getState } from "../redux/functions.js";
import { teamListView } from "../utils/templates.js";

class TeamMain extends Component {
  constructor() {
    super();
    this.container = $(SELECTORS.teamList);
    this.state = getState(this, "team", "teamList");
    this.render();
  }

  update() {
    this.state = getState(this, "team", "teamList");
    this.render();
  }
  render() {
    this.container.innerHTML = teamListView(this.state);
  }
}

export default TeamMain;
