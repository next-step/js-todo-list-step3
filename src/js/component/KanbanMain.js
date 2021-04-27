import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS, POPUP_MESSAGES } from "../utils/constant.js";
import { todoListView, addUserBtnView } from "../utils/templates.js";
import { isAvailableUserName } from "../utils/validators.js";
import { ERROR_HANDLER } from "../utils/errors.js";
import { dispatch, getState } from "../redux/functions.js";
import { ACTIONS } from "../actions/todo.js";
import TeamTitle from "./Kanban/TeamTitle.js";
import TodoInput from "./Kanban/TodoInput.js";

class KanbanMain extends Component {
  constructor() {
    super();
    this.container = $(SELECTORS.TODO_LIST);
    this.render();
  }

  bindEvent() {
    $(SELECTORS.USER_ADD_BTN).addEventListener("click", (e) =>
      this.onClickAddUser(e)
    );
  }

  onClickAddUser() {
    try {
      const userName = prompt(POPUP_MESSAGES.TYPE_USER_NAME);
      if (!userName) return;
      isAvailableUserName(userName);
      const { teamInfo } = getState(this, "todo");
      dispatch(
        ACTIONS.AddUserReqAction({ teamId: teamInfo._id, name: userName })
      );
    } catch (error) {
      const handler = ERROR_HANDLER[error];
      return handler && handler();
    }
  }

  render() {
    const { isLoadingGetSingleTeam, teamInfo } = getState(this, "todo");
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
    this.bindEvent();
  }
}

export default KanbanMain;
