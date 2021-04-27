import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constant.js";
import { todoListView, addUserBtnView } from "../utils/templates.js";
import { getState } from "../redux/functions.js";
import TeamTitle from "./Kanban/TeamTitle.js";
import TodoInput from "./Kanban/TodoInput.js";

class KanbanMain extends Component {
  constructor() {
    super();
    this.container = $(SELECTORS.todoList);
    this.render();
  }

  render() {
    const { isLoadingGetSingleTeam, teamInfo } = getState(this, "todo");

    console.log(teamInfo);
    let memberViews =
      teamInfo && teamInfo.members.map((member) => todoListView(member));
    if (memberViews) {
      memberViews.push(addUserBtnView);
      memberViews = memberViews.join("");
    } else {
      memberViews = addUserBtnView;
    }
    this.container.innerHTML = memberViews;

    new TeamTitle({
      isLoading: isLoadingGetSingleTeam,
      name: teamInfo ? teamInfo.name : "",
    });

    new TodoInput();
  }
}

export default KanbanMain;
