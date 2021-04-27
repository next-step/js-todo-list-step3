import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constant.js";
import { todoListView, addUserBtnView } from "../utils/templates.js";
import { getState } from "../redux/functions.js";
import TeamTitle from "./Kanban/TeamTitle.js";

class KanbanMain extends Component {
  constructor() {
    super();
    this.container = $(SELECTORS.todoList);
    this.render();
  }

  render() {
    const { isLoadingGetSingleTeam, teamInfo } = getState(this, "todo");
    new TeamTitle({
      isLoading: isLoadingGetSingleTeam,
      name: teamInfo ? teamInfo.name : "",
    });

    const memberViews =
      teamInfo && teamInfo.members.map((member) => todoListView(member));
    memberViews.push(addUserBtnView);

    this.container.innerHTML = memberViews.join("");
  }
}

export default KanbanMain;
