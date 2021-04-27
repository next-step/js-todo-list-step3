import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constant.js";
import { getState } from "../redux/functions.js";
import TeamTitle from "./Kanban/TeamTitle.js";
import Member from "./Kanban/Member.js";
// TODO : 유저 타이틀 붙여주고 ( props로 넘겨줌 )
// TODO : 유저 리스트에 따라서 투두 반복 (props로 넘겨줌 )

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
    this.container.innerHTML =
      teamInfo &&
      teamInfo.members
        .map((member) => new Member({ member }).render())
        .join("");
  }
}

export default KanbanMain;
